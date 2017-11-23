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

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async');


var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var payment = new Payment();
    var bank = new Bank();

    //get list of bank account
    F.route('/erp/api/bank', bank.read, ['authorize']);
    //create a new bank account
    F.route('/erp/api/bank', bank.create, ['post', 'json', 'authorize']);
    //get bank account
    F.route('/erp/api/bank/{id}', bank.show, ['authorize']);
    //verifie si la ref du nouveau compte bancaire exite ou pas
    F.route('/api/createBankAccount/uniqRef', bank.uniqRef, ['authorize']);
    //verifie si le libelle du nouveau compte bancaire exite ou pas
    F.route('/erp/api/createBankAccount/uniqLibelle', bank.uniqLibelle, ['authorize']);
    //update an account bank
    F.route('/erp/api/bank/{id}', bank.update, ['put', 'json', 'authorize']);


    F.route('/erp/api/bank/payment', payment.read, ['authorize']);
    //F.route('/erp/api/payment/dt', payment.readDT, ['post', 'authorize']);
    F.route('/erp/api/bank/payment', payment.create, ['post', 'json', 'authorize'], 1024);
    F.route('/erp/api/bank/payment/bills', payment.getAllWaitingBills, ['authorize']);

    F.route('/erp/api/bank/payment/{type}', payment.getGroupPayment, ['authorize']); //Chq
    F.route('/erp/api/bank/payment/{type}/dt', payment.readGroupDT, ['post', 'authorize']);
    F.route('/erp/api/bank/payment/{type}/bills', payment.getAllWaitingChq, ['authorize']);
    F.route('/erp/api/bank/payment/{type}/reject/{id}', payment.rejectPayment, ['post', 'json', 'authorize']);
    F.route('/erp/api/bank/payment/{type}/{id}', payment.getPaymentGroupDetails, ['authorize']);
    F.route('/erp/api/bank/payment/{type}', payment.createPaymentGroup, ['post', 'json', 'authorize'], 1024);
    F.route('/erp/api/bank/payment/{type}/accounting', payment.exportAccountingPaymentGroup, ['put', 'json', 'authorize']); // Put PAID
    F.route('/erp/api/bank/payment/{type}/{id}', payment.updatePaymentGroup, ['put', 'json', 'authorize'], 1024);
    F.route('/erp/api/bank/payment/{type}/{id}', payment.cancelPaymentGroup, ['delete', 'authorize']);
};

function Bank() {}

Bank.prototype = {
    read: function() {
        var self = this;
        var BankModel = MODEL('bank').Schema;

        //console.log(self.query.entity);

        var balances = [];

        var query = {};

        //if(self.query.entity)
        //    query.entity = self.query.entity;

        BankModel.find(query, "", {
            sort: {
                journalId: 1
            }
        }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);
            self.json(doc);
        });

    },
    create: function() {
        console.log(this.body);
    }
};

function Payment() {}

Payment.prototype = {
    read: function() {
        var self = this;
        var TransactionModel = MODEL('transaction').Schema;
        var query;

        if (self.query.find)
            query = JSON.parse(self.query.find);

        console.log('payment read:', self.query.find);

        TransactionModel.find(query)
            .populate({
                path: "meta.supplier",
                select: "name"
            })
            .populate({
                path: "meta.invoice",
                select: "ref forSales"
            })
            .populate({
                path: "meta.bills.invoice",
                select: "ref forSales"
            })
            .populate({
                path: "meta.product",
                select: "info"
            })
            .populate({
                path: "meta.tax",
                select: "code"
            })
            .exec(function(err, doc) {
                console.log(doc);
                if (err)
                    return self.throw500(err);

                self.json(doc);
            });
    },
    create: function() {
        var self = this;

        const PaymentModel = MODEL('payment').Schema;

        PaymentModel.addPayment(self.body, self.user, function(err, journal) {
            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        message: err
                    }
                });
            }

            self.json({
                successNotify: {
                    title: "Paiement enregistre",
                    message: "Piece comptable : " + journal[0].seq
                }
            });
        });
    },
    getAllWaitingBills: function() {
        var BillModel = MODEL('invoice').Schema;
        var self = this;

        var query = {};
        if (self.query) {
            for (var i in self.query) {
                switch (i) {
                    case "query":
                        if (self.query.query == "WAIT") // For payment
                            query.Status = {
                                "$nin": ["PAID", "CANCELED", "DRAFT"]
                            };
                        break;
                    case "dater":
                        query.dater = JSON.parse(self.query.dater);
                        break;
                    case "journalId":
                        query.journalId = JSON.parse(self.query.journalId);
                        break;
                    default:
                        query[i] = self.query[i];
                        break;
                }
            }
        }

        // console.log(self.query);
        //console.log(query);

        BillModel.find(query, "-history -files -latex")
            .populate("supplier", "name")
            .populate({
                path: "total_taxes.taxeId"
            })
            .sort({
                ID: 1
            })
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                    self.json({
                        notify: {
                            type: "error",
                            message: err
                        }
                    });
                    return;
                }

                //console.log(doc);

                self.json(doc);
            });
    },
    getGroupPayment: function(type) {
        var PaymentModel = MODEL('payment').Schema;
        var self = this;

        var query = {
            mode_reglement: type.toUpperCase()
        };

        if (self.query) {
            for (var i in self.query) {
                if (i == "query") {
                    switch (self.query.query) {
                        case "WAIT":
                            query.Status = {
                                "$nin": ["CREDITED", "REJECTED"]
                            };
                            break;
                        default:
                            break;
                    }
                } else
                    query[i] = self.query[i];
            }
        }

        //console.log(self.query);

        PaymentModel.find(query, "-history -files", function(err, doc) {
            if (err) {
                console.log(err);
                self.json({
                    notify: {
                        type: "error",
                        message: err
                    }
                });
                return;
            }

            //console.log(doc);

            self.json(doc);
        });
    },
    getPaymentGroupDetails: function(type, id) {
        var self = this;
        var PaymentModel = MODEL('payment').Schema;

        PaymentModel.getById(id, function(err, payment) {
            if (err)
                return console.log(err);

            self.json(payment);
        });
    },
    getAllWaitingChq: function(type) {
        var TransactionModel = MODEL('transaction').Schema;
        var self = this;

        var query = {
            voided: false,
            'meta.isWaiting': true,
            'meta.type': type.toUpperCase()
        };

        //console.log(query);

        TransactionModel.find(query)
            .populate({
                path: "meta.supplier",
                select: "name ID",
                model: "Customers"
            })
            .populate({
                path: "meta.bills.invoice",
                select: "ref forSales",
                model: "invoice"
            })
            .exec(function(err, doc) {
                console.log(doc);

                if (err)
                    return self.throw500(err);

                var total = _.sum(doc, function(elem) {
                    return elem.debit;
                });

                //console.log(doc, total);
                self.json({
                    count: doc.length,
                    items: doc,
                    total: total
                });
            });
    },
    createPaymentGroup: function(type) {
        var PaymentModel = MODEL('payment').Schema;
        var self = this;

        var payment = {};

        payment = new PaymentModel(self.body);
        payment.createdBy = self.user._id;
        payment.mode_reglement = type.toUpperCase();

        //return console.log(self.body);

        payment.save(function(err, doc) {
            if (err)
                return console.log(err);

            self.json(doc);
        });
    },
    updatePaymentGroup: function(type, id) {
        var PaymentModel = MODEL('payment').Schema;
        //console.log("update");
        var self = this;

        self.body.lines = _.filter(self.body.lines, function(elem) {
            return elem.isDeleted != true;
        });

        self.body.total_amount = _.sum(self.body.lines, function(elem) {
            return elem.amount;
        });

        PaymentModel.findByIdAndUpdate(id, self.body, function(err, doc) {
            //console.log(bill);
            //console.log(req.body);
            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }


            doc = doc.toObject();
            doc.successNotify = {
                title: "Success",
                message: "Paiement enregistre"
            };
            self.json(doc);
        });
    },
    cancelPaymentGroup: function(type, id) {
        var PaymentModel = MODEL('payment').Schema;
        var self = this;

        PaymentModel.findByIdAndUpdate(id, {
            isremoved: true,
            Status: 'CANCELED',
            total_amount: 0
        }, function(err) {
            if (err)
                return self.throw500(err);
            self.json({});
        });
    },
    exportAccountingPaymentGroup: function(type) {
        //console.log("update");
        var self = this;
        var PaymentModel = MODEL('payment').Schema;
        var TransactionModel = MODEL('transaction').Schema;
        var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        //console.log(self.query);

        var id = self.body.id;
        if (!id)
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: "No Id"
                }
            });

        PaymentModel.getById(id, function(err, payment) {

            console.log(payment);

            var Book = INCLUDE('accounting').Book;
            var myBook = new Book();

            myBook.setName(payment.bank_reglement.journalId);

            var entry = myBook.entry(payment.ref, payment.dater, self.user._id);
            SeqModel.incCpt("PAY", function(seq) {
                entry.setSeq(seq);

                var bills = [];
                for (var i = 0, len = payment.lines.length; i < len; i++) {
                    _.map(payment.lines[i].bills, function(elem) {
                        bills.push({
                            invoice: elem.invoice._id,
                            amount: elem.amount
                        });
                    });
                }

                entry.debit(payment.bank_reglement.compta_bank, payment.total_amount, null, {
                    type: payment.mode_reglement,
                    bank: payment.bank_reglement._id,
                    bills: bills
                });


                entry.credit("5800000", payment.total_amount, null, {
                    bills: bills,
                    type: payment.mode_reglement
                });

                entry.commit().then(function(journal) {
                        //console.log(journal);

                        async.parallel([
                                function(pCb) {
                                    payment.Status = "PAID";
                                    payment.journalId.push(journal);
                                    pCb(null, payment);
                                },
                                function(pCb) {
                                    async.forEach(payment.lines, function(line, aCb) {
                                        //console.log(line);
                                        TransactionModel.update({
                                            'meta.isWaiting': true,
                                            _journal: line.journalId
                                        }, {
                                            $set: {
                                                'meta.isWaiting': false
                                            }
                                        }, aCb);
                                    }, pCb);
                                }
                            ],
                            function(err, result) {
                                payment.save(function(err, doc) {
                                    self.json({
                                        successNotify: {
                                            title: "Paiement enregistre",
                                            message: "Piece comptable : " + journal.seq
                                        }
                                    });
                                });

                            });



                    },
                    function(err) {
                        return self.json({
                            errorNotify: {
                                message: err.message
                            }
                        });
                    });

                return console.log(entry);
            });
        });
    },
    rejectPayment: function(type, id) {
        var self = this;
        var PaymentModel = MODEL('payment').Schema;

        console.log(self.body);
        if (!id)
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: "No Id"
                }
            });

        PaymentModel.getById(id, function(err, payment) {
            //console.log(payment);

            let journalResult;
            async.forEachSeries(payment.lines, function(line, aCb) {

                if (line.supplier._id.toString() != self.body.supplier)
                    return aCb();

                //return console.log(line);

                var options = {
                    //entity: null,
                    // mode = payment -> It was rejected
                    libelleAccounting: payment.ref + ' ' + self.body.reason,
                    datec: new Date(),
                    amount: line.amount,
                    bank: payment.bank_reglement,
                    mode_reglement_code: payment.mode_reglement,
                    pieceAccounting: "",
                    bills: [],
                    supplier: line.supplier
                };

                for (var i = 0; i < line.bills.length; i++) {
                    options.bills[i] = line.bills[i].invoice.toObject();
                    options.bills[i].payment = line.bills[i].amount * -1;
                }

                //console.log(options);
                //return;

                PaymentModel.addPayment(options, self.user, function(err, journal) {
                    if (err)
                        return aCb(err);

                    journalResult = journal;
                    aCb();


                });
            }, function(err) {

                if (err) {
                    console.log(err);
                    return self.json({
                        errorNotify: {
                            message: err
                        }
                    });
                }

                payment.lines[self.body.idx].isRejected = true;
                payment.lines[self.body.idx].memo = self.body.reason;

                payment.save(function(err, doc) {
                    if (err)
                        return console.log(err);

                    console.log("end", doc);

                    self.json({
                        successNotify: {
                            title: "Paiement rejete",
                            message: "Piece comptable : " + journalResult[0].seq
                        }
                    });
                });
            });
        });
    },
    readGroupDT: function(type) {
        var self = this;
        var PaymentModel = MODEL('payment').Schema;

        var query = JSON.parse(self.req.body.query);

        var Status;

        //console.log(self.query);

        var conditions = {
            mode_reglement: type.toUpperCase(),
            //Status: {$ne: "PAID"},
            isremoved: {
                $ne: true
            }
            //entity: self.query.entity
        };

        if (!query.search.value) {
            if (self.query.status_id) {
                if (self.query.status_id === 'CREDITED' || self.query.status_id === 'WAITING') {
                    Status = self.query.status_id;
                    conditions.Status = 'WAITING';
                    if (Status === 'CREDITED')
                        conditions.dater = {
                            $gt: new Date()
                        };
                    else
                        conditions.dater = {
                            $lte: new Date()
                        };
                } else
                    conditions.Status = self.query.status_id;
            }
        } else
            delete conditions.Status;




        var options = {
            conditions: conditions
            // select: ""
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                cb(null, MODEL('payment').Status);
            },
            datatable: function(cb) {
                PaymentModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                return self.throw500(err);

            if (!res.datatable.data.length)
                return self.json(res.datatable);

            var BankModel = MODEL('bank').Schema;

            BankModel.findOne({
                _id: res.datatable.data[0].bank_reglement
            }, "name_bank ref account_number code_bank journalId code_counter", function(err, bank) {

                for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                    var row = res.datatable.data[i];

                    // Add checkbox
                    res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';

                    // Add id
                    res.datatable.data[i].DT_RowId = row._id.toString();

                    // Convert Status
                    if (row.Status == 'WAITING' && row.dater > new Date()) // Check if to late
                        row.Status = 'VALIDATE';

                    res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);

                    // Action
                    res.datatable.data[i].action = '<a href="#!/bank/payment/' + type + '/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/bank/payment/' + type + '/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-money"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].total_amount = self.module('utils').round(res.datatable.data[i].total_amount, 2);

                    res.datatable.data[i].bank_reglement = bank.name_bank + " " + bank.ref;
                }

                //console.log(res.datatable);

                self.json(res.datatable);
            });
        });
    }
};