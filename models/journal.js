"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        Q = require('q');

var setPrice = function (value) {
    return MODULE('utils').setPrice(value);
};

/**
 * Article Schema
 */
var JournalSchema = new Schema({
    datetime: Date,
    memo: {
        type: String,
        "default": '',
        uppercase: true
    },
    _transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'transaction'
        }
    ],
    book: String,
    entity: {type: String, required: true},
    voided: {
        type: Boolean,
        "default": false
    },
    void_reason: String,
    approved: {
        type: Boolean,
        "default": true
    },
    exported: Date, // Date of export
    seq: {type: String}, // Numero de piece comptable
    reconcilliation: Date, // Dte of rapprochement bank (date de valeur)
    author: {id: String, name: String}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

JournalSchema.methods["void"] = function (book, reason) {
    var deferred, trans_id, voidTransaction, voids, _i, _len, _ref,
            _this = this;
    deferred = Q.defer();
    if (this.voided === true) {
        deferred.reject(new Error('Journal already voided'));
    }
    this.voided = true;
    if (reason == null) {
        this.void_reason = '';
    } else {
        this.void_reason = reason;
    }
    voidTransaction = function (trans_id) {
        var d;
        var TransactionModel = MODEL('transaction').Schema;
        d = Q.defer();
        TransactionModel.findByIdAndUpdate(trans_id, {
            voided: true,
            void_reason: _this.void_reason
        }, function (err, trans) {
            if (err) {
                console.error('Failed to void transaction:', err);
                return d.reject(err);
            } else {
                return d.resolve(trans);
            }
        });
        return d.promise;
    };
    voids = [];
    _ref = this._transactions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        trans_id = _ref[_i];
        voids.push(voidTransaction(trans_id));
    }
    Q.all(voids).then(function (transactions) {
        var key, meta, newMemo, trans, val, valid_fields, _j, _len1;
        if (_this.void_reason) {
            newMemo = _this.void_reason;
        } else {
            if (_this.memo.substr(0, 6) === '[VOID]') {
                newMemo = _this.memo.replace('[VOID]', '[UNVOID]');
            } else if (_this.memo.substr(0, 8) === '[UNVOID]') {
                newMemo = _this.memo.replace('[UNVOID]', '[REVOID]');
            } else if (_this.memo.substr(0, 8) === '[REVOID]') {
                newMemo = _this.memo.replace('[REVOID]', '[UNVOID]');
            } else {
                newMemo = '[VOID] ' + _this.memo;
            }
        }

        /*var entry = book.entry(newMemo, null, _this._id);
         valid_fields = ['credit', 'debit', 'account_path', 'accounts', 'datetime', 'book', 'memo', 'timestamp', 'voided', 'void_reason', '_original_journal'];
         for (_j = 0, _len1 = transactions.length; _j < _len1; _j++) {
         trans = transactions[_j];
         trans = trans.toObject();
         meta = {};
         for (key in trans) {
         val = trans[key];
         if (key === '_id' || key === '_journal') {
         continue;
         }
         if (valid_fields.indexOf(key) === -1) {
         meta[key] = val;
         }
         }
         if (trans.credit) {
         entry.debit(trans.account_path, trans.credit, meta);
         }
         if (trans.debit) {
         entry.credit(trans.account_path, trans.debit, meta);
         }
         }
         return entry.commit().then(function (entry) {
         console.log(entry);
         return deferred.resolve(entry);
         }, function (err) {
         return deferred.reject(err);
         });*/

        return _this.save(function (err, entry) {
            if (err)
                return deferred.reject(err);
            return deferred.resolve(entry);
        });


    }, function (err) {
        return deferred.reject(err);
    });
    return deferred.promise;
};

JournalSchema.methods.setExported = function (book, date) {
    var deferred, trans_id, voidTransaction, voids, _i, _len, _ref,
            _this = this;
    deferred = Q.defer();
    if (this.exported != null) {
        deferred.reject(new Error('JournalId already exported'));
    }

    if (date == null) {
        this.exported = new Date();
    } else {
        this.exported = date;
    }

    voidTransaction = function (trans_id) {
        var d;
        var TransactionModel = MODEL('transaction').Schema;
        d = Q.defer();
        TransactionModel.findByIdAndUpdate(trans_id, {
            exported: _this.exported
        }, function (err, trans) {
            if (err) {
                console.error('Failed to export transaction:', err);
                return d.reject(err);
            } else {
                return d.resolve(trans);
            }
        });
        return d.promise;
    };
    voids = [];
    _ref = this._transactions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        trans_id = _ref[_i];
        voids.push(voidTransaction(trans_id));
    }

    Q.all(voids).then(function (transactions) {
        var key, meta, newMemo, trans, val, valid_fields, _j, _len1;

        return _this.save(function (err, entry) {
            if (err)
                return deferred.reject(err);
            return deferred.resolve(entry);
        });
    }, function (err) {
        return deferred.reject(err);
    });
    return deferred.promise;
};


JournalSchema.methods.setReconcilliation = function (book, date) {
    var deferred, trans_id, voidTransaction, voids, _i, _len, _ref,
            _this = this;
    deferred = Q.defer();

    this.reconcilliation = date;

    voidTransaction = function (trans_id) {
        var d;
        var TransactionModel = MODEL('transaction').Schema;
        d = Q.defer();
        TransactionModel.findByIdAndUpdate(trans_id, {
            reconcilliation: _this.reconcilliation
        }, function (err, trans) {
            if (err) {
                console.error('Failed to export transaction:', err);
                return d.reject(err);
            } else {
                return d.resolve(trans);
            }
        });
        return d.promise;
    };
    voids = [];
    _ref = this._transactions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        trans_id = _ref[_i];
        voids.push(voidTransaction(trans_id));
    }

    Q.all(voids).then(function (transactions) {
        var key, meta, newMemo, trans, val, valid_fields, _j, _len1;

        return _this.save(function (err, entry) {
            if (err)
                return deferred.reject(err);
            return deferred.resolve(entry);
        });
    }, function (err) {
        return deferred.reject(err);
    });
    return deferred.promise;
};

JournalSchema.pre('save', function (next) {
    var promises;
    var TransactionModel = MODEL('transaction').Schema;
    if (this.isModified('approved') && this.approved === true) {
        promises = [];
        return TransactionModel.find({
            _journal: this._id
        }, function (err, transactions) {
            var transaction, _i, _len;
            for (_i = 0, _len = transactions.length; _i < _len; _i++) {
                transaction = transactions[_i];
                transaction.approved = true;
                promises.push(transaction.save());
            }
            return Q.all(promises).then(function () {
                return next();
            });
        });
    } else {
        return next();
    }
});

exports.Schema = mongoose.model('Journal', JournalSchema, 'Journal');
exports.name = 'journal';
