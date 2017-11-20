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
var async = require("async");
var moment = require('moment'),
    csv = require('csv'),
    fs = require('fs'),
    _ = require("lodash");

var Dict = INCLUDE('dict');
var round = MODULE('utils').round;

exports.install = function() {
    var object = new Object();

    F.route('/erp/api/accounting', object.test, ['authorize']);
    F.route('/erp/api/accounting/journal', object.journal, ['authorize']);
    F.route('/erp/api/accounting/journal/{journal}', object.updateJournal, ['put', 'json', 'authorize']);
    F.route('/erp/api/accounting/balance', object.balance, ['authorize']);
    F.route('/erp/api/accounting/balance', object.createAN, ['post', 'json', 'authorize']);
    F.route('/erp/api/accounting/transfer', object.createBankTransfer, ['post', 'json', 'authorize']);
    F.route('/erp/api/accounting/balance/{account}', object.balance, ['authorize']);
    F.route('/erp/api/accounting/entries', object.entries, ['authorize']);
    F.route('/erp/api/accounting/entries/{idTransaction}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/accounting/entries/{journal}', object.entries, ['authorize']);
    F.route('/erp/api/accounting/download/{journal}', object.downloadEntries, ['authorize']);
    F.route('/erp/api/accounting/account/{journal}', object.autocompleteAccount, ['authorize']);
    //F.route('/erp/api/accounting/download/list', object.donaloadAccount, [ 'authorize']);
    F.route('/erp/api/accounting/exported/{journal}', object.exported, ['post', 'json', 'authorize']);
    F.route('/erp/api/accounting/import', object.importcsv, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/import1', object.importcsv1, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/import2', object.importcsv2, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/import3', object.importcsv3, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/import4', object.importcsv4, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/importsalary', object.importsalary, ['upload'], 1024); //1MB
    F.route('/erp/api/accounting/{journal}', object.add, ['post', 'json', 'authorize']);
    F.route('/erp/api/accounting/transaction/{transactionId}', object.update, ['put', 'json', 'authorize']);
};

function Object() {}

Object.prototype = {
    test: function() {
        var self = this;

        // The first argument is the book name, which is used to determine which book the transactions and journals are queried from.
        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        myBook.setName('VTE');


        // You can specify a Date object as the second argument in the book.entry() method if you want the transaction to be for a different date than today
        /*myBook.entry('FA-123456', moment().subtract(3, 'days').toDate()).setSeq(2).debit('401:Cash', 2000).credit('601:Income', 2000, {
         client: 'Joe Blow',
         bill: "1233444444"
         }).commit().then(function (journal) {
         console.log(journal);
         self.json(journal);
         }, function (err) {
         console.log(err);
         });
         return;*/
        console.log('Getting balance...');
        return myBook.balance({
            account: ['411', '445'],
            perPage: 100
            //societeName: 'ADHOC STOCK'
        }).then(function(data) {
            self.json(data);
        });

        /* myBook.void("123456", "I made a mistake").then(function() {
         // Do something after voiding
         });*/

        return myBook.ledger({
            account: '4114802'
        }).then(function(res) {
            self.json(res);
        });

        myBook.ledger({
            societeName: 'ADHOC STOCK'
        }).then(function(res) {
            self.json(res);
        });
    },
    add: function(journal) {
        var self = this;

        //console.log(self.body);
        var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName(journal);

        var entry = myBook.entry(self.body.libelleAccounting.toUpperCase(), self.body.datec, self.user._id);

        SeqModel.incCpt("PAY", function(seq) {
            //console.log(seq);
            entry.setSeq(seq);

            //if (self.body.pieceAccounting)
            //    entry.setSeq(self.body.pieceAccounting);

            for (var i = 0, len = self.body.lines.length; i < len; i++) {
                var line = self.body.lines[i];

                if (line.debit > 0)
                    entry.debit(line.account, round(line.debit, 2), null, {
                        manual: true
                    });
                else if (line.credit > 0)
                    entry.credit(line.account, round(line.credit, 2), null, {
                        manual: true
                    });

            }

            entry.commit().then(function(journal) {
                //console.log(journal);
                var doc = {};
                doc.successNotify = {
                    title: "Success",
                    message: "Ecriture enregistree"
                };

                self.json(doc);
            }, function(err) {
                console.log(err);
                self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err.message
                    }
                });
            });
        });
    },
    journal: function() {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);

        myBook.listJournal().then(function(res) {
            self.json(res);
        });
    },
    balance: function(account) {
        var self = this;

        let csv;
        csv = self.query.export;

        delete self.query.export;

        var Stream = require('stream');
        var stream = new Stream();

        var dateStart = moment(self.query.start_date).startOf('day').toDate();
        var extension = 'csv';

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);

        //console.log('Getting Accounting Balance ...');
        myBook.balance(self.query).then(function(data) {
            if (!csv)
                return self.json(data);

            //console.log(data);

            /*let account401Debi = 0;
            let account401Cred = 0;
            let account411Debi = 0;
            let account411Cred = 0;*/

            /*data.data = _.filter(data.data, function(elem) {
                if (elem._id.substr(0, 3) === '401') {
                    account401Debi += elem.debit;
                    account401Cred += elem.credit;
                    return false;
                }
                return true;
            });

            data.data = _.filter(data.data, function(elem) {
                if (elem._id.substr(0, 3) === '411') {
                    account411Debi += elem.debit;
                    account411Cred += elem.credit;
                    return false;
                }
                return true;
            });

            data.data.push({
                _id: '4010000000',
                credit: account401Cred,
                debit: account401Debi,
                balance: account401Cred - account401Debi
            });

            data.data.push({
                _id: '4110000000',
                credit: account411Cred,
                debit: account411Debi,
                balance: account411Cred - account411Debi
            });*/

            data.data = _.sortBy(data.data, '_id');

            //console.log(account401Debi, account401Debi);

            //entete
            let out = "NUMCP;LIBELLE;MTDEB;MTCRE;SOLDDEB;SOLDCRED\n";
            stream.emit('data', out);

            var decimal = 2;

            var debit = 0;
            var credit = 0;

            var len = 0;

            async.each(data.data, function(entry, cb) {
                let out = "";
                out += entry._id;
                out += ";";
                out += ";" + round(entry.debit, decimal).toString().replace(".", ",");
                out += ";" + round(entry.credit, decimal).toString().replace(".", ",");
                if (entry.balance == 0) {
                    out += ";" + 0;
                    out += ";" + 0;
                } else if (entry.balance > 0) {
                    out += ";" + 0;
                    out += ";" + round(entry.balance, decimal).toString().replace(".", ",");
                } else {
                    out += ";" + round(Math.abs(entry.balance), decimal).toString().replace(".", ",");
                    out += ";" + 0;
                }

                out += '\n';
                stream.emit('data', out);

                debit += round(entry.debit, decimal);
                credit += round(entry.credit, decimal);

                cb();

            }, function(err) {
                if (err)
                    return console.log(err);

                console.log("Debit : " + debit);
                console.log("Credit : " + credit);

                stream.emit('end');
            });
        });

        if (csv)
            self.stream('application/text', stream, 'balance_' + dateStart.getFullYear().toString() + "_" + (dateStart.getMonth() + 1).toString() + "." + extension);
    },
    entries: function(journal) {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName(journal);

        var query = self.query;

        if (query.start_date)
            query.start_date = moment(query.start_date).startOf('day').toDate();
        if (query.end_date)
            query.end_date = moment(query.end_date).endOf('day').toDate();

        var bank = false;

        //console.log(query);

        if (query.bank === '1') {
            bank = true;

            //delete query.account;
        }

        delete query.bank;

        async.parallel([
            function(callback) {
                var query = _.clone(self.query);
                var sort = false;

                if (query.reconcilliation === 'noreconcilliation') { // All entries not rapprochement
                    delete query.start_date;
                    delete query.end_date;
                }


                if (query.reconcilliation && query.reconcilliation !== 'noreconcilliation') {
                    query.dateParam = 'reconcilliation';
                    sort = true;
                    delete query.reconcilliation;
                }

                //console.log("date", query);

                myBook.ledger(query).then(function(res) {
                    // self.json(res);
                    //console.log(res);

                    if (sort)
                        res.results = _.sortByOrder(res.results, 'reconcilliation', function(a) {
                            return a.reconcilliation.getTime();
                        }, 'desc');

                    callback(null, res);
                });
            },
            function(callback) {
                // Solde futur operation
                var query = _.clone(self.query);

                //console.log(query);

                if (bank) { // balance from start for banks
                    delete query.start_date;
                    delete query.end_date;
                    //if (query.reconcilliation !== 'noreconcilliation')
                    //    query.dateParam = 'reconcilliation';

                    delete query.reconcilliation;
                }

                myBook.balance(query).then(function(data) {
                    //console.log(data);
                    callback(null, data);
                });
            },
            function(callback) {
                // Solde of bank reel account
                if (!bank)
                    return callback(null, {});

                var query = _.clone(self.query);
                delete query.start_date;

                //if (query.reconcilliation !== 'noreconcilliation')
                query.dateParam = 'reconcilliation';
                delete query.reconcilliation;

                if (bank)
                    myBook.name = null;

                //console.log(myBook);

                //query.reconcilliation = true;

                //console.log("query", query);

                myBook.balance(query).then(function(data) {
                    //console.log(data);
                    callback(null, {
                        bankSolde: data.balance,
                        bankQty: data.notes
                    });
                });
            },
            function(callback) {
                // Count unconcilliation operation
                if (!bank)
                    return callback(null, {});

                var query = _.clone(self.query);

                //console.log(query);

                if (bank) { // balance from start for banks
                    delete query.start_date;
                    delete query.end_date;
                    //if (query.reconcilliation !== 'noreconcilliation')
                    //    query.dateParam = 'reconcilliation';

                    query.reconcilliation = null;
                }

                myBook.balance(query).then(function(data) {
                    //console.log(data);
                    callback(null, {
                        waitingSolde: data.balance,
                        waitingQty: data.notes
                    });
                });

            }
        ], function(err, results) {
            //console.log(results);
            var res = _.extend(results[0], results[1]);
            res = _.extend(res, results[2]);
            res = _.extend(res, results[3]);

            res.totalExport = 0;

            for (var i = 0, len = res.results.length; i < len; i++) {
                if (!res.results[i].exported && res.results[i].credit) {
                    res.totalExport += res.results[i].credit;
                }
            }
            //console.log(res);
            self.json(res);
        });
    },
    entriesDt: function() {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName('VTE');

        var query = JSON.parse(self.req.body.query);

        var conditions = {
            //account: '4114802'
        };

        return myBook.ledgerDt(query, conditions).then(function(res) {
            self.json(res);
        });
    },
    createBankTransfer: function() {
        const self = this;
        const Book = INCLUDE('accounting').Book;
        const SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        //console.log(self.body);

        if (!self.body.accountDebit || !self.body.accountCredit)
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: 'Compte manquant'
                }
            });

        let libelleAccounting = "VIR INT. " + self.body.accountDebit.journalId + "-" + self.body.accountCredit.journalId;

        async.parallel([
            //Debit
            function(pCb) {
                let myBook = new Book();
                myBook.setName(self.body.accountDebit.journalId);
                let entry = myBook.entry(libelleAccounting.toUpperCase(), self.body.datec, self.user._id);

                SeqModel.incCpt("PAY", function(seq) {
                    //console.log(seq);
                    entry.setSeq(seq);



                    entry.debit("5800000", round(self.body.amount, 2), null, {
                        manual: true
                    });
                    entry.credit(self.body.accountDebit.compta_bank, round(self.body.amount, 2), null, {
                        manual: true
                    });

                    entry.commit().then(journal => pCb(null, journal), err => pCb(err));
                });
            },
            //Credit
            function(pCb) {
                let myBook = new Book();
                myBook.setName(self.body.accountCredit.journalId);

                let entry = myBook.entry(libelleAccounting.toUpperCase(), self.body.datec, self.user._id);

                SeqModel.incCpt("PAY", function(seq) {
                    //console.log(seq);
                    entry.setSeq(seq);

                    entry.debit(self.body.accountCredit.compta_bank, round(self.body.amount, 2), null, {
                        manual: true
                    });
                    entry.credit("5800000", round(self.body.amount, 2), null, {
                        manual: true
                    });

                    entry.commit().then(journal => pCb(null, journal), err => pCb(err));
                });
            }
        ], function(err, result) {
            if (err) {
                console.log(err);
                self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err.message
                    }
                });
            }

            var doc = {};
            doc.successNotify = {
                title: "Success",
                message: "Ecriture enregistree"
            };

            self.json(doc);
        });
    },
    destroy: function(idTransaction) {
        var self = this;
        console.log(idTransaction);

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);

        myBook.void(idTransaction, "Manual suppress : " + self.user.name).then(function() {
            // Do something after voiding
            self.json({
                ok: true,
                successNotify: {
                    title: "Success",
                    message: "Transaction supprimee"
                }
            });
        }, function(err) {
            console.log(err);
        });
    },
    downloadEntries: function(journal) {
        var self = this;

        var fixedWidthString = require('fixed-width-string');
        var BillModel = MODEL('invoice').Schema;

        const setLabel = MODULE('utils').setLabel;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName(journal);

        //console.log(self.query);

        var query = self.query;

        var Stream = require('stream');
        var stream = new Stream();

        var dateStart = moment(query.start_date).startOf('day').toDate();

        var mode = 'csv';
        var extension = 'csv';

        if (self.query.mode) {
            mode = self.query.mode;
            delete self.query.mode;
        }

        if (mode === 'quadratus')
            extension = 'txt';


        myBook.ledger(query).then(function(res) {
            // console.log(res);

            var out = "";

            if (mode === 'csv') {
                //entete
                out += "DTOPE;NUMJL;NUMCP;NPIEC;LIBEC;MTDEB;MTCRE;MONNAIE_IDENT;LETRA;DATECH;PERIDEB;PERIFIN;RAPPRO\n";
                stream.emit('data', out);
            }

            if (mode === 'kpmg') {
                //entete
                out += "Journal;Date;Numero;Libelle;Compte comptable;Client;Debit;Credit;Date echeance;Famille de produit\n";
                stream.emit('data', out);
            }

            var debit = 0;
            var credit = 0;

            BillModel.populate(res.results, {
                path: "meta.bills.invoice",
                select: "_id ref dater dateOf dateTo"
            }, function(err, res) {
                if (err)
                    return console.log(err);

                for (var i = 0, len = res.length; i < len; i++) {
                    let entry = res[i];

                    if (entry.exported)
                        continue; //Already exported

                    if (entry.debit == 0 && entry.credit == 0)
                        continue; //Empty line

                    let result = {
                        dater: "",
                        dateOf: "",
                        dateTo: ""
                    };

                    if (entry.meta.bills && entry.meta.bills.length && entry.meta.bills[0].invoice) {
                        if (entry.meta.bills[0].invoice.dater)
                            result.dater = entry.meta.bills[0].invoice.dater;
                        if (entry.meta.bills[0].invoice.dateOf)
                            result.dater = entry.meta.bills[0].invoice.dateOf;
                        if (entry.meta.bills[0].invoice.dateTo)
                            result.dater = entry.meta.bills[0].invoice.dateTo;
                    }

                    var out = "";

                    if (mode === 'csv') {
                        out += moment(entry.datetime).format(CONFIG('dateformatShort'));
                        out += ";" + (CONFIG('accounting.' + entry.book) || entry.book);
                        out += ";" + entry.accounts;
                        if (entry.seq) {
                            out += ";" + entry.seq;
                            if (entry.reconcilliation)
                                out += "-R" + moment(entry.reconcilliation).format("MMYY");
                        } else
                            out += ";";

                        if (entry.memo)
                            out += ";" + setLabel(entry.memo);
                        else
                            out += ";";

                        out += ";" + round(entry.debit, 2).toString().replace(".", ",");
                        out += ";" + round(entry.credit, 2).toString().replace(".", ",");
                        out += ";" + "E";
                        out += ";" + ""; // lettrage
                        out += ";" + "";
                        if (journal == 'VTE' || journal == 'ACH')
                            out += (result.dater ? moment(result.dater).format(CONFIG('dateformatShort')) : ""); //date echeance
                        out += ";" + "";
                        if (journal == 'VTE' || journal == 'ACH')
                            out += (result.dateOf ? moment(result.dateOf).format(CONFIG('dateformatShort')) : ""); //date debut periode
                        out += ";" + "";
                        if (journal == 'VTE' || journal == 'ACH')
                            out += (result.dateTo ? moment(result.dateTo).format(CONFIG('dateformatShort')) : ""); //date fin periode

                        if (entry.reconcilliation)
                            out += ";R" + moment(entry.reconcilliation).format("MMYY");
                        else
                            out += ";";


                        debit += round(entry.debit, 2);
                        credit += round(entry.credit, 2);
                    }

                    if (mode === 'kpmg') {
                        if (!entry.meta.type)
                            out += (CONFIG('accounting.' + entry.book) || entry.book);
                        else
                            out += "RG_C";

                        out += ";" + moment(entry.datetime).format("DD/MM/YYYY");

                        if (journal == 'VTE' || journal == 'ACH') {
                            if (entry.meta.invoice) {
                                out += ";" + entry.meta.invoice.ref;
                                //if (entry.reconcilliation)
                                //    out += "-R" + moment(entry.reconcilliation).format("MMYY");
                            } else
                                out += ";";
                        } else {
                            if (entry.seq) {
                                out += ";" + entry.seq;
                                //if (entry.reconcilliation)
                                //    out += "-R" + moment(entry.reconcilliation).format("MMYY");
                            } else
                                out += ";";
                        }

                        if (entry.memo)
                            out += ";" + setLabel(entry.memo);
                        else
                            out += ";";

                        if (!entry.meta.bank)
                            if (entry.accounts.substr(0, 3) == '401' || entry.accounts.substr(0, 3) == '411') {
                                out += ";" + entry.accounts.substr(0, 3) + "00000";
                                out += ";" + entry.meta.supplier.ID;
                            } else
                                out += ";" + entry.accounts + ";";
                        else {
                            switch (entry.meta.type) {
                                case 'CHQ':
                                    out += ";582500";
                                    break;
                                case 'VIR':
                                    out += ";582200";
                                    break;
                                case 'CB':
                                    out += ";582100";
                                    break;
                                case 'PRELV':
                                    out += ";582300";
                                    break;
                                case 'AFF': //Affacturage
                                    out += ";582400";
                                    break;
                                default:
                                    return console.log("Mode de reglement inconnu {0} : code comptable manquant".format(entry));
                            }
                            out += ";";
                        }



                        out += ";" + round(entry.debit, 2).toString().replace(".", ",");
                        out += ";" + round(entry.credit, 2).toString().replace(".", ",");

                        if (journal == 'VTE' || journal == 'ACH')
                            out += ";" + (result.dater ? moment(result.dater).format("DD/MM/YYYY") : ""); //date echeance
                        out += ";" + "";

                        if (entry.meta.product) {
                            if (journal == 'VTE')
                                out += entry.meta.product.sellFamily.name;
                            if (journal == 'ACH')
                                out += entry.meta.product.costFamily.name;
                        }

                        debit += round(entry.debit, 2);
                        credit += round(entry.credit, 2);
                    }

                    if (mode === 'quadratus') {
                        out += 'M';

                        // rename accounts
                        entry.accounts = entry.accounts.replace(/^401/, "0");
                        entry.accounts = entry.accounts.replace(/^411/, "9");

                        var account = fixedWidthString(entry.accounts, 9, {
                            ellipsis: '.'
                        });
                        out += account.substr(0, 8);
                        //if ((CONFIG('accounting.' + entry.book) || entry.book).length > 2)
                        //    return cb('accounting journal length > 2!');

                        out += fixedWidthString(CONFIG('accounting.' + entry.book) || entry.book.substr(0, 2), 2);
                        out += '000'; //Folio
                        out += moment(entry.datetime).format('DDMMYY');
                        out += " "; //Filler
                        out += fixedWidthString(setLabel(entry.memo), 20, {
                            ellipsis: '.'
                        });
                        if (entry.credit) {
                            out += 'C';
                            out += "+"; //signe + ou -
                            out += fixedWidthString(round(entry.credit * 100, 0), 12, {
                                padding: '0',
                                align: 'right'
                            });
                        } else {
                            out += 'D';
                            out += "+"; //signe + ou -
                            out += fixedWidthString(round(entry.debit * 100, 0), 12, {
                                padding: '0',
                                align: 'right'
                            });
                        }
                        //if (entry.reconcilliation)
                        //    out += fixedWidthString("R" + moment(entry.reconcilliation).format("MMYY"), 8);
                        //else
                        out += fixedWidthString("", 8); //contrepartie
                        if (journal == 'VTE' || journal == 'ACH')
                            out += (result.dater ? moment(result.dater).format('DDMMYY') : fixedWidthString("", 6)); //date echeance
                        else
                            out += fixedWidthString("", 6);
                        out += fixedWidthString("", 5); // Lettrage
                        out += fixedWidthString("", 5); // Numero de piece UNUSED
                        out += fixedWidthString("", 19); //Filler

                        /* Add reconcilliation in seq */
                        if (entry.reconcilliation)
                            entry.seq = (entry.seq ? entry.seq : "") + "-" + moment(entry.reconcilliation).format("MM");

                        out += fixedWidthString((entry.seq ? entry.seq : ""), 8, {
                            align: 'right'
                        }); // Numero de piece
                        out += " "; //Filler
                        out += "EUR";
                        out += fixedWidthString("", 3); // UNUSED
                        out += fixedWidthString("", 3); //Filler
                        out += fixedWidthString(setLabel(entry.memo), 32, {
                            ellipsis: '.'
                        });
                        out += fixedWidthString((entry.seq ? entry.seq : ""), 10); // Numero de piece
                        out += fixedWidthString("", 73); //Filler

                        if (journal == 'VTE' || journal == 'ACH')
                            if (result.dateOf || result.dateTo) {
                                out += "\n";
                                out += "Y;";
                                if (result.dateOf) {
                                    out += "PeriodiciteDebut=";
                                    out += moment(result.dateOf).format(CONFIG('dateformatShort')); //date debut periode
                                    out += ";";
                                }
                                if (result.dateTo) {
                                    out += "PeriodiciteFin=";
                                    out += moment(result.dateTo).format(CONFIG('dateformatShort')); //date fin periode
                                    out += ";";
                                }
                            }


                        debit += round(entry.debit, 2);
                        credit += round(entry.credit, 2);
                    }

                    out += "\n";

                    stream.emit('data', out);

                }


                console.log("Debit : " + debit);
                console.log("Credit : " + credit);

                stream.emit('end');


                /*} else if (req.query.imported)
                 BillModel.update({_id: {$in: need_imported}}, {$set: {imported: true}}, {multi: true}, function (err, result) {
                 if (err)
                 console.log(err);

                 console.log(result);
                 });*/
            });
        });

        self.stream('application/text', stream, journal + '_' + dateStart.getFullYear().toString() + "_" + (dateStart.getMonth() + 1).toString() + "." + extension);

    },
    exported: function(journal) {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName(journal);

        //console.log(self.query);

        async.each(self.body._journal, function(entry, cb) {
            myBook.setExported(entry, new Date()).then(function() {
                //console.log("ok");
                cb(null);
            }, function(err) {
                return cb(err);
            });
        }, function(err) {
            if (err)
                return console.log(err);

            self.json({
                ok: true
            });
        });
    },
    autocompleteAccount: function(journal) {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        async.parallel([
            function(cb) {
                SocieteModel.find({
                        code_compta: new RegExp(self.query.val, "gi")
                    })
                    .distinct('code_compta', cb);
            },
            function(cb) {
                SocieteModel.find({
                        code_compta_fournisseur: new RegExp(self.query.val, "gi")
                    })
                    .distinct('code_compta_fournisseur', cb);
            },
            function(cb) {
                var Book = INCLUDE('accounting').Book;
                var myBook = new Book();
                //myBook.setEntity(self.query.entity);
                myBook.setName(journal);

                //console.log(self.query.val);
                myBook.listAccounts(self.query.val).then(function(accounts) {
                    //console.log(accounts);

                    cb(null, accounts);
                });
            }
        ], function(err, results) {
            if (err)
                console.log(err);

            results = results.reduce(function(a, b) {
                return a.concat(b);
            });

            results = results.sort();
            results = results.slice(0, 10);

            //console.log(results);

            self.json(results);
        });
    },
    update: function(transactionId) {
        var self = this;

        var TransactionModel = MODEL('transaction').Schema;

        var set = {};
        set[self.body.field] = self.body.data;

        TransactionModel.update({
            _id: transactionId
        }, {
            $set: set
        }, {
            upsert: false
        }, function(err, doc) {
            if (err)
                return console.log(err);

            self.json({
                successNotify: {
                    title: "Success",
                    message: "Entree modifiee"
                }
            });
        });
    },
    updateJournal: function(journal) {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();
        //myBook.setEntity(self.query.entity);
        myBook.setName(journal);
        console.log(self.body);

        myBook[self.body.method](self.body.id, self.body.data).then(function() {
            //console.log("ok");
            self.json({
                successNotify: {
                    title: "Success",
                    message: "Entree modifiee"
                }
            });
        }, function(err) {
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: err
                }
            });
        });
    },
    /*
     * 0  1          2            3                4                5                 6     7      8                9        10
     * JL;Date pièce;Numéro pièce;Libellé écriture;Numéro de compte;Libellé mouvement;Débit;Crédit;Date de pointage;Lettrage;transaction
     * EX;31/12/2015;            ;acomptes        ;40910000        ;                 ;969,8;0     ;                ;        ;1
     * IV;31/01/2015;0           ;TVA 01.2016     ;44551000        ;0                ;1965 ;      ;                ;AAI     ;5
     *
     */
    importcsv: function() {
        var self = this;
        var fixedWidthString = require('fixed-width-string');

        //if (!self.query.entity)
        //    return self.plain("need entity in query");

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (self.files.length > 0) {
            //console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];

            csv()
                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    if (index === 0) {
                        tab = row; // Save header line
                        return callback();
                    }
                    //console.log(tab);
                    //console.log(row);

                    //console.log(row[0]);
                    if (!transactions[row[10]])
                        transactions[row[10]] = {
                            id: row[10],
                            journal: row[0].trim(),
                            datec: moment(row[1], 'DD/MM/YYYY').hour(12).toDate(),
                            libelleAccounting: row[3].trim(),
                            lines: [],
                            total: 0
                        };

                    // Add a lines account
                    var debit = parseFloat(row[6].replace(",", ".")),
                        credit = parseFloat(row[7].replace(",", "."));

                    if (Number.isNaN(debit))
                        debit = 0;
                    if (Number.isNaN(credit))
                        credit = 0;

                    var account = row[4];

                    // ADD 0 for fix length account if general account
                    if (account.substr(0, 3) !== '401' && account.substr(0, 3) !== '411') {
                        account = parseInt(account);
                        account = fixedWidthString(account, 10, {
                            padding: '0',
                            align: 'left'
                        });
                    }

                    transactions[row[10]].lines.push({
                        account: account,
                        debit: debit,
                        credit: credit
                    });

                    //Refresh total
                    transactions[row[10]].total += credit;
                    transactions[row[10]].total -= debit;

                    callback();

                    //return row;
                })
                .on("end", function(count) {
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /* Coala Balance
     * 0        1           2           3           4                   5           6
     * Date;    Journal;    Libelle;    Compte; 	Libelle compte; 	debit;  	credit
     * 30/09/2012;	AN;	A NOUVEAU;	1010000000;	CAPITAL;            	0;	121500
     *
     */
    importcsv1: function() {
        var self = this;
        var fixedWidthString = require('fixed-width-string');

        //if (!self.query.entity)
        //    return self.plain("need entity in query");

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (self.files.length > 0) {
            //console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];
            var seq = 0;

            csv()
                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    if (index === 0) {
                        tab = row; // Save header line
                        return callback();
                    }
                    //console.log(tab);
                    //console.log(row);

                    //console.log(row[0]);
                    if (!transactions[seq])
                        transactions[seq] = {
                            id: seq,
                            journal: row[1].trim(),
                            datec: moment(row[0], 'DD/MM/YYYY').hour(12).toDate(),
                            libelleAccounting: row[2].trim(),
                            lines: [],
                            total: 0
                        };

                    // Add a lines account
                    var debit = parseFloat(row[5].replace(" ", "").replace(",", ".")),
                        credit = parseFloat(row[6].replace(" ", "").replace(",", "."));

                    var account = row[3];

                    // ADD 0 for fix length account if general account
                    if (account.substr(0, 3) !== '401' && account.substr(0, 3) !== '411') {
                        account = parseInt(account);
                        account = fixedWidthString(account, 10, {
                            padding: '0',
                            align: 'left'
                        });
                    }

                    transactions[seq].lines.push({
                        account: account,
                        debit: debit,
                        credit: credit
                    });

                    //Refresh total
                    transactions[seq].total += credit;
                    transactions[seq].total -= debit;

                    callback();

                    //return row;
                })
                .on("end", function(count) {
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /* Coala
     * 0               1            2                3               4              5               6       7
     * date DD/MM/YYYY;code journal;numéro de compte;numéro de pièce;libellé       ;débit ou crédit;montant;E (pour symbole monétaire euro)
     * 03/10/2011     ;AC          ;6263000000      ;1              ;WIMIFI 10/2011;D              ;460    ;E
     *
     */
    importcsv2: function() {
        var self = this;

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (self.files.length > 0) {
            console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];
            var seq = 0;

            csv()

                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    /* if (index === 0) {
                     tab = row; // Save header line
                     return callback();
                     }*/
                    //console.log(tab);
                    //console.log(row);


                    //console.log(row[0]);
                    if (!transactions[seq])
                        transactions[seq] = {
                            id: seq,
                            journal: row[1].trim(),
                            datec: moment(row[0], 'DD/MM/YYYY').hour(12).toDate(),
                            libelleAccounting: row[4].trim(),
                            lines: [],
                            total: 0
                        };

                    // Add a lines account
                    var debit = 0;
                    var credit = 0;

                    if (row[5] == "D")
                        debit = parseFloat(row[6].replace(",", "."));
                    else
                        credit = parseFloat(row[6].replace(",", "."));

                    transactions[seq].lines.push({
                        account: row[2],
                        debit: debit,
                        credit: credit
                    });

                    //Refresh total
                    transactions[seq].total += credit;
                    transactions[seq].total -= debit;
                    if (round(transactions[seq].total, 3) == 0)
                        seq++;
                    console.log(seq);
                    callback();

                    //return row;
                }, {
                    parallel: 1
                })
                .on("end", function(count) {
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /* Oxygene
     * Date;Saisie;N° pièce;N° compte;Libellé opération;Débit;Crédit;Montant saisi;TVA;Imputé
     * 10/10/2012;1;1;411CM2L;M2L 3988;956,8;;; ;N
     *  ;  ;;7060000000;M2L 3988;;800;; ;N
     *  ;  ;;4457100000;M2L 3988;;156,8;; ;N
     *  ;  ;;411CADHAP92B;ADHAP92B 3991;145,65;;; ;N
     *  ;  ;;7060000000;ADHAP92B 3991;;121,78;; ;N
     *  ;  ;;4457100000;ADHAP92B 3991;;23,87;; ;N
     *  ;  ;;411CAUVERGNEA;AUVERGNE ACTIVE 3992;297,21;;; ;N
     * 10/11/2012;1;1;411CM2L;M2L 3988;956,8;;; ;N
     *  ;  ;;7060000000;AUVERGNE ACTIVE 3992;;248,5;; ;N
     *  ;  ;;4457100000;AUVERGNE ACTIVE 3992;;48,71;; ;N
     *  ;  ;;411CBIOCORP;BIOCORP 3993;95,68;;; ;N
     *  ;  ;;7060000000;BIOCORP 3993;;80;; ;N
     */
    importcsv3: function() {
        var self = this;

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (!self.query.journal)
            return self.throw401("Empty journal!");


        if (self.files.length > 0) {
            console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];
            var seq = 0;

            var date;

            csv()
                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    if (index === 0) {
                        tab = row; // Save header line
                        return callback();
                    }
                    //console.log(tab);
                    //console.log(row);

                    if (!row[3]) // Empty line
                        return callback();

                    if (row[0]) // new date on line
                        date = moment(row[0], 'DD/MM/YYYY').hours(14).toDate();

                    //console.log(row[0]);
                    if (!transactions[seq])
                        //console.log(row);
                        transactions[seq] = {
                            id: seq,
                            journal: self.query.journal.toUpperCase().trim(),
                            datec: date,
                            libelleAccounting: row[4].trim(),
                            lines: [],
                            total: 0
                        };

                    // Add a lines account
                    var debit = parseFloat(row[5].replace(" ", "").replace(",", "."));
                    var credit = parseFloat(row[6].replace(" ", "").replace(",", "."));

                    if (Number.isNaN(debit))
                        debit = 0;
                    if (Number.isNaN(credit))
                        credit = 0;

                    transactions[seq].lines.push({
                        account: row[3],
                        debit: debit,
                        credit: credit
                    });

                    //Refresh total
                    transactions[seq].total += credit;
                    transactions[seq].total -= debit;

                    if (round(transactions[seq].total, 3) == 0)
                        seq++;

                    console.log(seq);
                    callback();

                    //return row;
                }, {
                    parallel: 1
                })
                .on("end", function(count) {
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /* Quadratus
     * 0  1          2                3           4                5
     * JL;Date pièce;Numéro de compte;Cle d'appel;Libellé écriture;solde (inverse)
     * EX;31/12/2015;10130000;CAPSOU;CAPITAL APPELE VERSE;-34100
     * EX;31/12/2015;10611000;RESERVE;RESERVE LEGALE;-3410,82
     * EX;31/12/2015;10680000;AUTRES;AUTRES RESERVES;-99960,91
     */
    importcsv4: function() {
        var self = this;
        var fixedWidthString = require('fixed-width-string');

        //if (!self.query.entity)
        //    return self.plain("need entity in query");

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (self.files.length > 0) {
            //console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];
            var seq = 0;

            csv()
                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    if (index === 0) {
                        tab = row; // Save header line
                        return callback();
                    }
                    //console.log(tab);
                    //console.log(row);

                    //console.log(row[0]);
                    if (!transactions[seq])
                        transactions[seq] = {
                            id: seq,
                            journal: row[0].trim(),
                            datec: moment(row[1], 'DD/MM/YYYY').hour(12).toDate(),
                            libelleAccounting: row[4].trim(),
                            lines: [],
                            total: 0
                        };

                    // Add a lines account
                    var solde = parseFloat(row[5].replace(",", ".")),
                        debit = 0,
                        credit = 0;

                    if (solde > 0)
                        debit = Math.abs(solde);
                    else
                        credit = Math.abs(solde);

                    var account = row[2];

                    // Convert 0->401, 9->411
                    if (account[0] == '0')
                        account = '401' + account.substr(1);

                    else if (account[0] == '9')
                        account = '411' + account.substr(1);


                    // ADD 0 for fix length account if general account
                    if (account.substr(0, 3) !== '401' && account.substr(0, 3) !== '411') {
                        account = parseInt(account);
                        account = fixedWidthString(account, 10, {
                            padding: '0',
                            align: 'left'
                        });
                    }

                    transactions[seq].lines.push({
                        account: account,
                        debit: debit,
                        credit: credit
                    });

                    //Refresh total
                    transactions[seq].total += credit;
                    transactions[seq].total -= debit;

                    callback();

                    //return row;
                })
                .on("end", function(count) {
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /* Sage PAIE
     * 0  3          9  10               24 39               77 83  84    104  138
     * JL;Date pièce;OD;Numéro de compte;X; Libellé écriture;S; D/C;Solde;N;   EUR
     * SA 310117OD421000       X             PAIE 1/2017  PERS.REM DUES            S      C            71265,19N                                 EUR
     */
    importsalary: function() {
        var self = this;
        var fixedWidthString = require('fixed-width-string');
        var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        //if (!self.query.entity)
        //    return self.plain("need entity in query");

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        if (self.files.length > 0) {
            //console.log(self.files[0].filename);

            var tab = [];
            var transactions = [];
            var seq = 0;

            var readStream = fs.createReadStream(self.files[0].path, 'utf8');
            readStream
                .on('data', function(data) {
                    //console.log(data);

                    data = data.split("\n");

                    var Book = INCLUDE('accounting').Book;
                    var myBook = new Book();
                    //myBook.setEntity(self.query.entity);
                    myBook.setName('SA');

                    var entry;

                    SeqModel.incCpt("PAY", function(seq) {
                        async.eachOfSeries(data, function(row, index, callback) {
                                if (index == 0)
                                    return callback();

                                var obj = {};
                                obj.journal = row.substr(0, 3).trim();

                                if (obj.journal !== 'SA')
                                    return callback();

                                obj.datec = new moment().year(parseInt(row.substr(7, 2)) + 2000).month(parseInt(row.substr(5, 2)) - 1).date(row.substr(3, 2)).toDate();
                                obj.account = row.substr(11, 6);
                                obj.account = fixedWidthString(obj.account, 10, {
                                    padding: '0',
                                    align: 'left'
                                });
                                obj.libelleAccounting = row.substr(38, 38).trim();

                                if (row.substr(83, 1) == "D")
                                    obj.total = parseFloat(row.substr(84, 20).trim().replace(",", "."));
                                else
                                    obj.total = parseFloat(row.substr(84, 20).trim().replace(",", "."));

                                if (index == 1) {
                                    entry = myBook.entry(obj.libelleAccounting.toUpperCase(), obj.datec, {
                                        name: 'Imported'
                                    });
                                    entry.setSeq(seq);
                                }

                                if (row.substr(83, 1) == "D" && obj.total > 0)
                                    entry.debit(obj.account, round(obj.total, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (obj.total > 0)
                                    entry.credit(obj.account, round(obj.total, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });


                                //console.log(obj);

                                callback();
                            },
                            function(err) {
                                if (err)
                                    return console.log(err);

                                entry.commit().then(function(journal) {
                                    self.plain("Ok imported salary");
                                }, function(err) {
                                    self.throw500(err);
                                });
                            });
                    });

                    function test(row, index, callback) {
                        if (index === 0) {
                            tab = row; // Save header line
                            return callback();
                        }
                        //console.log(tab);
                        //console.log(row);

                        //console.log(row[0]);
                        if (!transactions[seq])
                            transactions[seq] = {
                                id: seq,
                                journal: row[0].trim(),
                                datec: moment(row[1], 'DD/MM/YYYY').hour(12).toDate(),
                                libelleAccounting: row[4].trim(),
                                lines: [],
                                total: 0
                            };

                        // Add a lines account
                        var solde = parseFloat(row[5].replace(",", ".")),
                            debit = 0,
                            credit = 0;

                        if (solde > 0)
                            debit = Math.abs(solde);
                        else
                            credit = Math.abs(solde);

                        var account = row[2];

                        // Convert 0->401, 9->411
                        if (account[0] == '0')
                            account = '401' + account.substr(1);

                        else if (account[0] == '9')
                            account = '411' + account.substr(1);


                        // ADD 0 for fix length account if general account
                        if (account.substr(0, 3) !== '401' && account.substr(0, 3) !== '411') {
                            account = parseInt(account);
                            account = fixedWidthString(account, 10, {
                                padding: '0',
                                align: 'left'
                            });
                        }

                        transactions[seq].lines.push({
                            account: account,
                            debit: debit,
                            credit: credit
                        });

                        //Refresh total
                        transactions[seq].total += credit;
                        transactions[seq].total -= debit;

                        callback();

                        //return row;
                    };
                })
                .on('end', function() {
                    console.log("end");

                    return;
                    //console.log(transactions);
                    console.log('Number of lines: ' + count);

                    //Test if all lines are equilibre -> 0
                    for (var i = 0, len = transactions.length; i < len; i++) {
                        if (!transactions[i])
                            continue;

                        if (round(transactions[i].total, 3) !== 0)
                            return self.json({
                                err: 'Total transaction is not = 0 !',
                                id: transactions[i].id,
                                transaction: transactions[i],
                                total: transactions[i].total
                            });
                    }


                    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

                    async.each(transactions, function(transaction, cb) {

                        // First row of transactions was empty
                        if (!transaction || !transaction.journal)
                            return cb();

                        var Book = INCLUDE('accounting').Book;
                        var myBook = new Book();
                        //myBook.setEntity(self.query.entity);
                        myBook.setName(transaction.journal);

                        var entry = myBook.entry(transaction.libelleAccounting.toUpperCase(), transaction.datec, {
                            name: 'Imported'
                        });

                        SeqModel.incCpt("PAY", function(seq) {
                            //console.log(seq);
                            entry.setSeq(seq);

                            //if (self.body.pieceAccounting)
                            //    entry.setSeq(self.body.pieceAccounting);

                            for (var i = 0, len = transaction.lines.length; i < len; i++) {
                                var line = transaction.lines[i];

                                if (line.debit > 0)
                                    entry.debit(line.account, round(line.debit, 2), {
                                        imported: true,
                                        datec: new Date() //Date de l'import
                                    });
                                else if (line.credit > 0)
                                    entry.credit(line.account, round(line.credit, 2), {
                                        imported: true,
                                        datec: new Date()
                                    });

                            }

                            entry.commit().then(function(journal) {
                                cb();
                            }, function(err) {
                                cb(err);
                            });
                        });

                    }, function(err) {
                        if (err)
                            return self.throw500(err);

                        return self.json({
                            count: count
                        });
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    },
    /*
     * Create new accounting year
     * Closed all entries from old year
     * Create AN journal with balance
     */
    createAN: function() {
        var self = this;

        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();

        var BookAN = new Book();

        BookAN.setName('AN');

        // You can specify a Date object as the second argument in the book.entry() method if you want the transaction to be for a different date than today
        var entry = BookAN.entry("A NOUVEAU", moment(self.body.end_date).endOf('day').add(1, 'days').hour(12).toDate(), self.user._id) // libelle, date
            .setSeq(0); // numero de piece

        //console.log('Getting Accounting Balance ...');
        return myBook.balance(self.body).then(function(data) {
            //console.log(data);
            var result = 0;
            async.each(data.data, function(elem, cb) {

                if (round(elem.balance, 3) === 0)
                    return cb();

                // remove class 6 or class 7
                if (elem._id.trim()[0] == '6' || elem._id.trim()[0] == '7') {
                    //console.log(elem._id);
                    result += elem.balance;
                    return cb();
                }

                // Add amount to client account
                if (elem.balance < 0)
                    entry.debit(elem._id, Math.abs(elem.balance), null, {
                        type: 'AN',
                        datec: new Date()
                    });
                else
                    entry.credit(elem._id, elem.balance, null, {
                        type: 'AN',
                        datec: new Date()
                    });

                cb();
            }, function(err) {
                //console.log(result);

                if (result < 0) // Benefice
                    entry.debit("12900000", Math.abs(result), null, {
                        type: 'AN',
                        datec: new Date()
                    });
                else // Perte
                    entry.credit("12000000", result, null, {
                        type: 'AN',
                        datec: new Date()
                    });

                entry.commit()
                    .then(function(journal) {
                        var doc = {};
                        doc.successNotify = {
                            title: "Success",
                            message: "Annee cloturee"
                        };
                        self.json(doc);
                    }, function(err) {
                        console.log(err);
                        return self.json({
                            errorNotify: {
                                title: 'Erreur',
                                message: err
                            }
                        });
                    });
            });
        });


    }
};