/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



"use strict";

//https://github.com/jraede/medici

var _ = require('lodash'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    util = require('util'),
    Q = require('q');

function Entry(book, memo, date, author, original_journal) {
    var journalModel;
    this.book = book;

    journalModel = this.book.journalModel;
    this.journal = new journalModel();
    this.journal.memo = memo;
    if (original_journal) {
        this.journal._original_journal = original_journal;
    }

    if (!date) {
        date = new Date();
    }
    this.journal.datetime = date;
    this.journal.book = this.book.name;
    //this.journal.entity = this.book.entity;
    this.transactions = [];
    this.transactionModels = [];
    this.journal.approved = true;
    this.journal.author = author;
}

Entry.prototype.setApproved = function(bool) {
    this.journal.approved = bool;
    return this;
};

Entry.prototype.setSeq = function(seq) {
    this.journal.seq = seq;
    return this;
};

Entry.prototype.credit = function(account_path, amount, memo, extra) {
    var key, keys, meta, transaction, val;

    if (extra == null) {
        extra = null;
    }

    if (!account_path)
        account_path = "";

    if (typeof account_path === 'string') {
        account_path = account_path.split(':');
    }
    if (account_path.length > 3) {
        throw "Account path is too deep (maximum 3)";
    }
    if (account_path.length === 1) { // No segmentation
        account_path[1] = account_path[0].substr(3);
        account_path[0] = account_path[0].substr(0, 3);
    }
    transaction = {
        account_path: account_path,
        accounts: account_path.join(''),
        credit: amount,
        debit: 0.0,
        book: this.book.name,
        //entity: this.book.entity,
        memo: memo || this.journal.memo,
        _journal: this.journal._id,
        datetime: this.journal.datetime,
        _original_journal: this.journal._original_journal,
        timestamp: new Date()
    };
    keys = _.keys(this.book.transactionModel.schema.paths);
    meta = {};
    for (key in extra) {
        val = extra[key];
        if (keys.indexOf(key) >= 0) {
            transaction[key] = val;
        } else {
            meta[key] = val;
        }
    }
    transaction.meta = meta;
    this.transactions.push(transaction);
    return this;
};

Entry.prototype.debit = function(account_path, amount, memo, extra) {
    var key, keys, meta, transaction, val;
    if (extra == null) {
        extra = null;
    }

    if (!account_path)
        account_path = ""

    if (typeof account_path === 'string') {
        account_path = account_path.split(':');
    }
    if (account_path.length > 3) {
        throw "Account path is too deep (maximum 3)";
    }
    if (account_path.length === 1) { // No segmentation
        account_path[1] = account_path[0].substr(3);
        account_path[0] = account_path[0].substr(0, 3);
    }
    transaction = {
        account_path: account_path,
        accounts: account_path.join(''),
        credit: 0.0,
        debit: amount,
        _journal: this.journal._id,
        book: this.book.name,
        //entity: this.book.entity,
        memo: memo || this.journal.memo,
        datetime: this.journal.datetime,
        _original_journal: this.journal._original_journal
    };
    keys = _.keys(this.book.transactionModel.schema.paths);
    meta = {};
    for (key in extra) {
        val = extra[key];
        if (keys.indexOf(key) >= 0) {
            transaction[key] = val;
        } else {
            meta[key] = val;
        }
    }
    this.transactions.push(transaction);
    transaction.meta = meta;
    return this;
};

Entry.prototype.saveTransaction = function(transaction) {
    var d, model, modelClass;
    d = Q.defer();
    modelClass = this.book.transactionModel;
    model = new modelClass(transaction);
    this.journal._transactions.push(model._id);
    model.save(function(err, res) {
        if (err) {
            return d.reject(err);
        } else {
            return d.resolve(res);
        }
    });
    return d.promise;
};

Entry.prototype.commit = function(success) {
    var deferred, err, saves, total, trans, transaction, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2,
        _this = this;
    deferred = Q.defer();
    _ref = this.transactions;

    /*if (!this.journal.entity) {
        err = new Error("INVALID_ENTITY");
        err.code = 400;
        err.message = 'Entite inconnue';
        //console.error('Journal is invalid. Total is:', total);
        deferred.reject(err);
        return deferred.promise;
    }*/

    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        transaction = _ref[_i];
        transaction.approved = this.journal.approved;
        transaction.seq = this.journal.seq;

        if (transaction.accounts == "") {
            err = new Error("INVALID_JOURNAL");
            err.code = 400;
            err.message = 'Compte comptable manquant : ' + MODULE('utils').round(transaction.credit, 2) + '/' + MODULE('utils').round(transaction.debit, 2);
            //console.error('Journal is invalid. Total is:', total);
            deferred.reject(err);
            return deferred.promise;
        }
    }
    this.transactionsSaved = 0;
    total = 0.0;
    _ref1 = this.transactions;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        transaction = _ref1[_j];
        total += transaction.credit;
        total -= transaction.debit;
    }

    total = MODULE('utils').round(total, 2);

    if (total > 0 || total < 0) {
        err = new Error("INVALID_JOURNAL");
        err.code = 400;
        err.message = 'Journal is invalid. Total is:' + total;
        //console.error('Journal is invalid. Total is:', total);
        deferred.reject(err);
    } else {
        saves = [];
        _ref2 = this.transactions;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            trans = _ref2[_k];
            saves.push(this.saveTransaction(trans));
        }
        Q.all(saves).then(function() {
            return _this.journal.save(function(err, result) {
                if (err) {
                    _this.book.transactionModel.remove({
                        _journal: _this.journal._id
                    });
                    console.log(err);
                    return deferred.reject(new Error('Failure to save journal'));
                } else {
                    deferred.resolve(_this.journal);

                    // Void old transaction if exist
                    if (_this.journal._original_journal) {
                        //console.log("Void old transaction");
                        _this.book.transactionModel.remove({
                            _journal: _this.journal._original_journal
                        }, function(err, doc) {});
                        _this.book.journalModel.remove({
                            _id: _this.journal._original_journal
                        }, function(err, doc) {});
                        //console.log(_this.journal._original_journal);
                    }
                    //             book.void(original_journal).then(function(){
                    // console.log("Void old");
                    //});

                    if (success != null) {
                        return success(_this.journal);
                    }
                }
            });
        }, function(err) {
            return deferred.reject(err);
        });
    }
    return deferred.promise;
};

/*
 * Transaction book
 */

exports.Book = function(name) {
    this.name = name;
    this.transactionModel = MODEL('transaction').Schema;
    this.journalModel = MODEL('journal').Schema;
}

exports.Book.prototype.setName = function(name) {
    this.name = name;
};

/*exports.Book.prototype.setEntity = function (entity) {
    this.entity = entity;
};*/


exports.Book.prototype.entry = function(memo, date, author, original_journal) {

    if (date == null) {
        date = null;
    }
    if (original_journal == null) {
        original_journal = null;
    }

    return new Entry(this, memo, date, author, original_journal);
};

exports.Book.prototype.parseQuery = function(query) {
    query = _.clone(query);
    var dateParam = 'datetime';


    var $or, a, account, accounts, acct, end_date, i, key, keys, match, parsed, start_date, val, _i, _j, _k, _len, _len1, _len2;
    parsed = {};

    delete query.entity;

    //Specify the field on date_start/date_end
    if (query.dateParam) {
        dateParam = query.dateParam;
        delete query.dateParam;
    }

    if (query.exported === 'false') {
        delete query.start_date;
    }

    if ((account = query.account)) {
        if (account instanceof Array) {
            $or = [];
            for (_i = 0, _len = account.length; _i < _len; _i++) {
                acct = account[_i];
                accounts = acct.split(':');
                // If no segmentation : seg 3
                if (accounts.length === 1 && acct.length > 3) {
                    accounts[0] = acct.substr(0, 3);
                    accounts[1] = acct.substr(3);
                }
                match = {};
                for (i = _j = 0, _len1 = accounts.length; _j < _len1; i = ++_j) {
                    a = accounts[i];
                    match['account_path.' + i] = a;
                }
                $or.push(match);
            }
            parsed['$or'] = $or;
        } else {
            accounts = account.split(':');
            // If no segmentation : seg 3
            if (accounts.length === 1 && account.length > 3) {
                accounts[0] = account.substr(0, 3);
                accounts[1] = account.substr(3);
            }
            for (i = _k = 0, _len2 = accounts.length; _k < _len2; i = ++_k) {
                acct = accounts[i];
                parsed['account_path.' + i] = acct;
            }
        }
        delete query.account;
    }
    if (query._journal) {
        parsed['_journal'] = query._journal;
    }
    if ((query.start_date != null) && (query.end_date != null)) {
        //console.log(moment(query.start_date).startOf('day').toDate());
        //console.log(moment(query.end_date).endOf('day').toDate());
        start_date = moment(query.start_date).startOf('day').toDate();
        end_date = moment(query.end_date).endOf('day').toDate();
        parsed[dateParam] = {
            $gte: start_date,
            $lte: end_date
        };
        delete query.start_date;
        delete query.end_date;
    } else if (query.start_date != null) {
        parsed[dateParam] = {
            $gte: moment(query.start_date).startOf('day').toDate()
        };
        delete query.start_date;
    } else if (query.end_date != null) {
        parsed[dateParam] = {
            $lte: moment(query.end_date).endOf('day').toDate()
        };
        delete query.end_date;
    }
    keys = _.keys(this.transactionModel.schema.paths);
    for (key in query) {
        val = query[key];
        if (keys.indexOf(key) >= 0) {
            if (key.substr(0, 1) === '_' && val instanceof String) {
                val = mongoose.Types.ObjectId(val);
            }
            parsed[key] = val;
        } else {
            if (key.indexOf('_id') > 0) {
                val = mongoose.Types.ObjectId(val);
            }
            parsed['meta.' + key] = val;
        }
    }
    if (this.name)
        parsed.book = this.name;

    if (query.voided === 'true')
        delete parsed.voided;
    else
        parsed.voided = false;

    if (query.exported === 'false')
        parsed.exported = null;

    //if (query.reconcilliation === true) // filter in entries (see controller accounting)
    //    parsed.reconcilliation = {$ne: null};

    if (query.reconcilliation === 'noreconcilliation') //filter form angular
        parsed.reconcilliation = null;

    //if (query.reconcilliation === 'all') //filter form angular
    //    parsed.reconcilliation == null;

    //if (this.entity)
    //    parsed.entity = this.entity;

    parsed.approved = true;
    //console.log(parsed);

    return parsed;
};

exports.Book.prototype.balance = function(query) {
    var deferred, group, match, pagination, project, skip, sort;
    deferred = Q.defer();
    if (query.perPage) {
        pagination = {
            perPage: query.perPage,
            page: query.page ? query.page : 1
        };
        delete query.perPage;
        delete query.page;
    }

    var groupByAccounts = query.groupByAccounts;
    delete query.groupByAccounts;

    query = this.parseQuery(query);

    var fixedWidthString = require('fixed-width-string');

    if (!this.name) //No book - balance on all
        delete query.book;

    match = {
        $match: query
    };
    project = {
        $project: {
            debit: '$debit',
            credit: '$credit',
            datetime: '$datetime',
            timestamp: '$timestamp',
            accounts: '$accounts'
        }
    };
    group = {
        $group: {
            _id: (groupByAccounts ? '$accounts' : null),
            credit: {
                $sum: '$credit'
            },
            debit: {
                $sum: '$debit'
            },
            notes: {
                $sum: 1
            }
        }
    };

    if (pagination) {
        skip = {
            $skip: (pagination.page - 1) * pagination.perPage
        };
        sort = {
            $sort: {
                'datetime': -1,
                'timestamp': -1
            }
        };
        this.transactionModel.aggregate(match, project, sort, skip, group, function(err, result) {
            //console.log(result);
            var total;
            if (err) {
                return deferred.reject(err);
            } else {
                result = result.shift();
                if (result == null) {
                    return deferred.resolve({
                        balance: 0,
                        notes: 0,
                        result: 0
                    });
                }
                total = result.credit - result.debit;

                return deferred.resolve({
                    balance: total,
                    notes: result.count,
                    result: 0
                });
            }
        });
    } else {
        sort = {
            $sort: {
                '_id': 1
            }
        };
        this.transactionModel.aggregate(match, project, group, sort, function(err, result) {
            var total;
            if (err) {
                return deferred.reject(err);
            } else {
                //console.log(result);

                if (!groupByAccounts) {
                    result = result.shift();

                    if (result == null) {
                        return deferred.resolve({
                            balance: 0,
                            notes: 0,
                            result: 0
                        });
                    }
                    total = result.credit - result.debit;
                    return deferred.resolve({
                        balance: total,
                        notes: result.notes,
                        result: 0
                    });
                } else {

                    // reduce duplicate account
                    function isNormalInteger(str) {
                        var n = Math.floor(Number(str));
                        return String(n) === str && n >= 0;
                    }

                    var idx = {}; // index result[i] and _id
                    var reduce = [];

                    _.map(result, function(elem) {
                        //console.log(elem);

                        if (isNormalInteger(elem._id))
                            while (elem._id[elem._id.length - 1] == '0') {
                                elem._id = elem._id.substring(0, elem._id.length - 1);
                            }
                        else { // Group 401 and 411
                            if (elem._id.substring(0, 3) == "411")
                                elem._id = "411";
                            else if (elem._id.substring(0, 3) == "401")
                                elem._id = "401";
                        }

                        if (!idx[elem._id]) {
                            reduce.push(elem);
                            idx[elem._id] = reduce.length - 1;
                        } else {
                            reduce[idx[elem._id]].credit += elem.credit;
                            reduce[idx[elem._id]].debit += elem.debit;
                            reduce[idx[elem._id]].notes += elem.notes;
                        }

                        return;
                    });

                    result = reduce;

                    var credit = 0,
                        debit = 0,
                        solde = 0; //Benefice or perte
                    for (var i = 0, len = result.length; i < len; i++) {
                        if (!result[i].credit)
                            result[i].credit = 0;
                        if (!result[i].debit)
                            result[i].debit = 0;

                        debit += result[i].debit;
                        credit += result[i].credit;

                        if (result[i]._id.trim()[0] == '6' || result[i]._id.trim()[0] == '7') {
                            //console.log(result[i]._id);
                            solde += result[i].credit;
                            solde -= result[i].debit;
                        }

                        result[i].balance = MODULE('utils').round(result[i].credit - result[i].debit, 2);
                        result[i].credit = MODULE('utils').round(result[i].credit, 2);
                        result[i].debit = MODULE('utils').round(result[i].debit, 2);

                        if (isNormalInteger(result[i]._id))
                            result[i]._id = fixedWidthString(result[i]._id, 10, {
                                padding: '0',
                                align: 'left'
                            });

                        delete result[i].notes;
                    }

                    return deferred.resolve({
                        balance: credit - debit,
                        credit: credit,
                        debit: debit,
                        notes: result.length,
                        data: result,
                        result: solde
                    });
                }
            }
        });
    }
    return deferred.promise;
};

exports.Book.prototype.ledger = function(query, populate) {
    var deferred, pagination, pop, q, _i, _len,
        _this = this;
    if (populate == null) {
        populate = null;
    }
    deferred = Q.defer();
    if (query.perPage) {
        pagination = {
            perPage: query.perPage,
            page: query.page ? query.page : 1
        };
        delete query.perPage;
        delete query.page;
    }
    query = this.parseQuery(query);
    q = this.transactionModel.find(query)
        .populate({
            path: "meta.supplier",
            select: "name ID",
            model: "Customers"
        })
        .populate({
            path: "meta.invoice",
            select: "ref forSales",
            model: "invoice"
        })
        .populate({
            path: "meta.bills.invoice",
            select: "ref forSales",
            model: "invoice"
        })
        .populate({
            path: "meta.product",
            select: "info sellFamily costFamily",
            model: "product",
            populate: {
                path: "sellFamily costFamily"
            }
        })
        .populate({
            path: "meta.tax",
            select: "code",
            model: "taxes"
        });

    //console.log(query);
    if (pagination) {
        this.transactionModel.count(query, function(err, count) {
            var pop, _i, _len;
            q.skip((pagination.page - 1) * pagination.perPage).limit(pagination.perPage);
            q.sort({
                datetime: -1,
                timestamp: -1
            });
            if (populate) {
                for (_i = 0, _len = populate.length; _i < _len; _i++) {
                    pop = populate[_i];
                    q.populate(pop);
                }
            }
            return q.exec(function(err, results) {
                if (err) {
                    return deferred.reject(err);
                } else {
                    return deferred.resolve({
                        results: results,
                        total: count
                    });
                }
            });
        });
    } else {
        q.sort({
            datetime: -1,
            timestamp: -1
        });
        if (populate) {
            for (_i = 0, _len = populate.length; _i < _len; _i++) {
                pop = populate[_i];
                q.populate(pop);
            }
        }
        q.exec(function(err, results) {
            var returnVal;
            //console.log(results);
            if (err) {
                return deferred.reject(err);
            } else {
                var credit = _.sum(results, function(object) {
                    return object.credit;
                });
                var debit = _.sum(results, function(object) {
                    return object.debit;
                });

                returnVal = {
                    results: results,
                    total: results.length,
                    credit: credit,
                    debit: debit
                };
                return deferred.resolve(returnVal);
            }
        });
    }
    return deferred.promise;
};

/* With plugin datatable */
exports.Book.prototype.ledgerDt = function(query, conditions) {
    var deferred, pagination, pop, q, _i, _len,
        _this = this;

    if (conditions == null)
        conditions = {};

    deferred = Q.defer();
    if (query.perPage) {
        pagination = {
            perPage: query.perPage,
            page: query.page ? query.page : 1
        };
        delete query.perPage;
        delete query.page;
    }
    conditions = this.parseQuery(conditions);

    var options = {
        conditions: conditions
    };

    this.transactionModel.dataTable(query, {} /*options*/ , function(err, results) {
        if (err) {
            return deferred.reject(err);
        } else {
            console.log(results);
            for (var i = 0, len = results.data.length; i < len; i++) {
                var row = results.data[i];

                // Add checkbox
                results.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';

                // Add id
                results.data[i].DT_RowId = row._id.toString();

            }
            return deferred.resolve(results);
        }
    });

    return deferred.promise;
};

exports.Book.prototype["void"] = function(journal_id, reason) {
    var deferred,
        _this = this;
    deferred = Q.defer();
    this.journalModel.findById(journal_id, function(err, journal) {
        if (err) {
            return deferred.reject(err);
        } else if (!journal) {
            return deferred.reject("Journal not found");
        } else {
            return journal["void"](_this, reason).then(function() {
                return deferred.resolve();
            }, function(err) {
                return deferred.reject(err);
            });
        }
    });
    return deferred.promise;
};

/* Set true if entry export to external accounting*/
exports.Book.prototype.setExported = function(journal_id, date) {
    var deferred,
        _this = this;

    if (!date)
        date = new Date();

    deferred = Q.defer();
    this.journalModel.findById(journal_id, function(err, journal) {
        if (err) {
            return deferred.reject(err);
        } else if (!journal) {
            return deferred.reject("JournalId not found");
        } else if (journal.exported != null)
            return deferred.reject("JournalId already exported");
        else {
            return journal.setExported(_this, date).then(function() {
                return deferred.resolve();
            }, function(err) {
                return deferred.reject(err);
            });
        }
    });
    return deferred.promise;
};

/* Set date of concilliation*/
exports.Book.prototype.setReconcilliation = function(journal_id, date) {
    var deferred,
        _this = this;

    if (!date)
        date = null;

    deferred = Q.defer();
    this.journalModel.findById(journal_id, function(err, journal) {
        if (err)
            return deferred.reject(err);
        else if (!journal)
            return deferred.reject("JournalId not found");
        else {
            return journal.setReconcilliation(_this, date).then(function() {
                return deferred.resolve();
            }, function(err) {
                return deferred.reject(err);
            });
        }
    });
    return deferred.promise;
};

exports.Book.prototype.listJournal = function() {
    var deferred;
    deferred = Q.defer();
    this.transactionModel.find({
        //entity: this.entity
    }).distinct('book', function(err, results) {
        if (err) {
            console.error(err);
            return deferred.reject(err);
        } else {
            return deferred.resolve(_.uniq(results));
        }
    });
    return deferred.promise;
};

exports.Book.prototype.listAccounts = function(val) {
    var deferred;
    deferred = Q.defer();

    var query = {
        //entity: this.entity
    };

    if (this.name)
        query.book = this.name;

    if (val)
        query.accounts = new RegExp(val, "gi");

    this.transactionModel.find(query).distinct('accounts', function(err, results) {
        var acct, final, paths, prev, result, _i, _j, _len, _len1;
        if (err) {
            console.error(err);
            return deferred.reject(err);
        } else {
            final = [];
            for (_i = 0, _len = results.length; _i < _len; _i++) {
                result = results[_i];
                paths = result.split(':');
                prev = [];
                for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
                    acct = paths[_j];
                    prev.push(acct);
                    final.push(prev.join(':'));
                }
            }
            return deferred.resolve(_.uniq(final));
        }
    });
    return deferred.promise;
};