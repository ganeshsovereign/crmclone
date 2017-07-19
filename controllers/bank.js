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

        BankModel.find(query, "", { sort: { journalId: 1 } }, function(err, doc) {
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

        //console.log(query);

        TransactionModel.find(query)
            .populate({ path: "meta.supplier", select: "name", model: "Customers" })
            .populate({ path: "meta.invoice", select: "ref forSales", model: "invoice" })
            .populate({ path: "meta.bills.invoice", select: "ref forSales", model: "invoice" })
            .populate({ path: "meta.product", select: "info", model: "product" })
            .populate({ path: "meta.tax", select: "code", model: "taxes" })
            .exec(function(err, doc) {
                //console.log(doc);
                if (err)
                    return self.throw500(err);



                self.json(doc);
            });
    },
    create: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;
        var BillModel = MODEL('invoice').Schema;

        var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        console.log(this.body);
        var body = this.body;
        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();

        // for Taxes
        var myBookOD = new Book();

        if (!body.bank.journalId)
            return self.json({
                errorNotify: {
                    message: 'Journal de banque absent. Voir la configuration de la banque'
                }
            });
        myBook.setName(body.bank.journalId);
        //myBook.setEntity(body.bank.entity);

        myBookOD.setName('OD');
        //myBookOD.setEntity(body.bank.entity);

        // Ecriture du reglement
        var entry = myBook.entry(body.libelleAccounting, body.datec, self.user._id);
        var entryOD = myBookOD.entry(body.libelleAccounting, body.datec, self.user._id);

        SeqModel.incCpt("PAY", function(seq) {
            //console.log(seq);
            entry.setSeq(seq);
            entryOD.setSeq(seq);

            var bills = [];

            for (var i = 0, len = body.bills.length; i < len; i++)
                if (body.bills[i].payment != null)
                    bills.push({
                        invoice: body.bills[i]._id,
                        amount: body.bills[i].payment
                    });

            for (var i = 0, len = body.bills_supplier.length; i < len; i++)
                if (body.bills_supplier[i].payment != null)
                    bills.push({
                        invoice: body.bills_supplier[i]._id,
                        amount: body.bills_supplier[i].payment
                    });

            if (body.mode === "Receipt")
                entry.debit(body.bank.compta_bank, body.amount, null, {
                    type: body.mode_reglement_code,
                    bank: body.bank._id,
                    pieceAccounting: body.pieceAccounting,
                    supplier: body.supplier,
                    bills: bills // Liste des factures
                });
            else
                entry.credit(body.bank.compta_bank, body.amount, null, {
                    bank: body.bank._id,
                    type: body.mode_reglement_code,
                    pieceAccounting: body.pieceAccounting,
                    supplier: body.supplier,
                    bills: bills // Liste des factures
                });

            // Get entity for TVA_MODE
            async.waterfall([
                    // get societe for accounting
                    function(callback) {
                        //console.log(body);
                        SocieteModel.findById(body.supplier, "name salesPurchases", function(err, societe) {
                            if (err)
                                return callback(err);
                            if (!societe)
                                return callback('Societe inconnue !');

                            console.log(societe);

                            callback(err, societe);
                        });
                    },
                    // apply entry
                    function(societe, callback) {

                        //Options
                        if (body.penality !== 0)
                            entry.credit('763100', Math.abs(body.penality), "PENALITY", {
                                type: body.mode_reglement_code,
                                supplier: body.supplier
                            });

                        if (body.differential !== 0) {
                            if (body.differential > 0)
                                entry.credit('758000', Math.abs(body.differential), "CORRECTION", {
                                    type: body.mode_reglement_code,
                                    supplier: body.supplier
                                });
                            else
                                entry.debit('658000', Math.abs(body.differential), "CORRECTION", {
                                    type: body.mode_reglement_code,
                                    supplier: body.supplier
                                });
                        }

                        // client
                        for (var i = 0, len = body.bills.length; i < len; i++) {
                            var bill = body.bills[i];

                            if (bill.payment == null)
                                continue;

                            //console.log(bill);

                            if (bill.payment > 0)
                                entry.credit(societe.salesPurchases.customerAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    invoice: bill._id,
                                    supplier: bill.supplier._id
                                });
                            else
                                entry.debit(societe.salesPurchases.customerAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    invoice: bill._id,
                                    supplier: bill.supplier._id
                                });


                            //Migrate TVA to final account
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                for (var j = 0, len2 = bill.total_taxes.length; j < len2; j++) {
                                // No TVA
                                if (bill.total_taxes[j].value == 0)
                                    continue;

                                // TVA on payment
                                if (bill.total_taxes[j].taxeId.isOnPaid == false)
                                    continue;

                                if (bill.total_taxes[j].value > 0) {
                                    entryOD.debit("445740", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                    entryOD.credit(bill.total_taxes[j].taxeId.sellAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                } else {
                                    // Si avoir
                                    entryOD.credit("445740", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                    entryOD.debit(bill.total_taxes[j].taxeId.sellAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                }
                            }
                        }

                        // fournisseur
                        for (var i = 0, len = body.bills_supplier.length; i < len; i++) {
                            var bill = body.bills_supplier[i];
                            if (bill.payment == null)
                                continue;

                            if (bill.payment > 0)
                                entry.debit(societe.salesPurchases.supplierAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    invoice: bill._id,
                                    supplier: bill.supplier._id
                                });
                            else
                                entry.credit(societe.salesPurchases.supplierAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    invoice: bill._id,
                                    supplier: bill.supplier._id
                                });

                            //Migrate TVA to final account
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                for (var j = 0, len2 = bill.total_taxes.length; j < len2; j++) {

                                if (bill.total_taxes[j].value == 0)
                                    continue;

                                //console.log(bill.total_taxes[j]);

                                // TVA on payment
                                if (bill.total_taxes[j].taxeId.isOnPaid == false)
                                    continue;

                                // TVA on payment
                                if (bill.total_taxes[j].value > 0) {
                                    entryOD.credit("445640", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                    entryOD.debit(bill.total_taxes[j].taxeId.buyAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                } else {
                                    // Si avoir
                                    entryOD.debit("445640", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                    entryOD.credit(bill.total_taxes[j].taxeId.buyAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                        type: body.mode_reglement_code,
                                        supplier: bill.supplier._id,
                                        invoice: bill._id,
                                        tax: bill.total_taxes[j].taxeId._id
                                    });
                                }
                            }
                        }

                        //console.log(entry);
                        callback(null);
                    },
                    // save transaction
                    function(callback) {
                        var journal_id = [];

                        entry.commit().then(function(journal) {
                            //console.log(journal);
                            journal_id.push(journal);

                            // ADD TVA lines
                            if (entryOD.transactions.length)
                                return entryOD.commit().then(function(journal) {
                                    journal_id.push(journal);
                                    return callback(null, journal_id);
                                }, function(err) {
                                    console.log(err);
                                    return callback(null, journal_id);
                                });

                            return callback(null, journal_id);
                        }, function(err) {
                            callback(err.message);
                        });
                    },
                    // update bills
                    function(journal, callback) {

                        var journalId = _.map(journal, function(item) {
                            return item._id;
                        });

                        //change status bills PAID
                        async.each(body.bills, function(bill, cb) {
                            if (bill.payment == null)
                                return cb();

                            //console.log(bill);
                            var status = "STARTED";
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                                status = "PAID";

                            BillModel.update({ _id: bill._id }, { $set: { Status: status, updatedAt: new Date() }, $inc: { total_paid: bill.payment }, $addToSet: { journalId: { $each: journalId } } }, cb);
                        }, function(err) {});
                        async.each(body.bills_supplier, function(bill, cb) {
                            if (bill.payment == null)
                                return cb();
                            //console.log(bill);
                            var status = "STARTED";
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                                status = "PAID";
                            BillModel.update({ _id: bill._id }, { $set: { Status: status, updatedAt: new Date() }, $inc: { total_paid: bill.payment }, $addToSet: { journalId: { $each: journalId } } }, cb);
                        }, function(err) {});

                        callback(null, journal);
                    }
                ],
                function(err, journal) {

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
        });
    }
};