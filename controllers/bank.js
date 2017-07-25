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

        if (body.mode === "Receipt" && body.mode_reglement_code == 'CHQ') // Receive a CHQ
            body.bank = { journalId: "RG" }; // Reglement

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

            if (body.mode === "Receipt" && body.mode_reglement_code == 'CHQ') { // Receive a CHQ
                entry.debit("5800000", body.amount, null, {
                    isWaiting: true, // Waiting bank transfert
                    type: body.mode_reglement_code,
                    pieceAccounting: body.pieceAccounting,
                    supplier: body.supplier,
                    bills: bills // Liste des factures
                });
            } else {
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
            }

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
    },
    getGroupPayment: function(type) {
        var PaymentModel = MODEL('payment').Schema;
        var self = this;

        var query = {
            type: type
        };

        if (self.query) {
            for (var i in self.query) {
                if (i == "query") {
                    switch (self.query.query) {
                        case "WAIT":
                            query.Status = { "$nin": ["CREDITED", "REJECTED"] };
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
            .populate({ path: "meta.supplier", select: "name ID", model: "Customers" })
            .populate({ path: "meta.bills.invoice", select: "ref forSales", model: "invoice" })
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

        payment.type = type;
        payment.createdBy = self.user._id;
        payment.mode_reglement = type.toUpperCase();

        //console.log(self.body);

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

        PaymentModel.findByIdAndUpdate(id, { isremoved: true, Status: 'CANCELED', total_amount: 0 }, function(err) {
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
                            let journalIds = _.map(payment.lines, function(elem) {
                                console.log(elem);
                                return elem.journalId;
                            });

                            TransactionModel.update({ 'meta.isWaiting': true, _journal: { $in: journalIds } }, { $set: { 'meta.isWaiting': false, 'meta.journalId': journal._id } }, pCb);

                        }
                    ], function(err, result) {
                        payment.save(function(err, doc) {
                            self.json({
                                successNotify: {
                                    title: "Paiement enregistre",
                                    message: "Piece comptable : " + journal.seq
                                }
                            });
                        });

                    });



                }, function(err) {
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

        return console.log(self.body);
        if (!id)
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: "No Id"
                }
            });

        PaymentModel.getById(id, function(err, payment) {
            //console.log(payment);

            if (payment.lines[self.body.idx].bill._id.toString() != self.body.id) // checked good bill._id
                return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: "Le numero de la facture ne correspond pas"
                }
            });

            var options = {
                label: payment.lines[self.body.idx].bill.ref + ' ' + self.body.reason,
                datec: new Date(),
                amount: payment.lines[self.body.idx].amount,
                mode_reglement_code: "LCR",
                pieceAccounting: "",
                bills: [],
                bills_supplier: []
            };

            options.bills[0] = payment.lines[self.body.idx].bill.toObject();
            options.bills[0].payment = payment.lines[self.body.idx].amount * -1;

            //console.log(options);
            //return;

            payment.bank_reglement.addPayment(options, self.user, function(err, journal) {

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

                    self.json({
                        successNotify: {
                            title: "Paiement rejete",
                            message: "Piece comptable : " + journal[0].seq
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
            //Status: {$ne: "PAID"},
            isremoved: { $ne: true }
            //entity: self.query.entity
        };

        if (!query.search.value) {
            if (self.query.status_id) {
                if (self.query.status_id === 'CREDITED' || self.query.status_id === 'WAITING') {
                    Status = self.query.status_id;
                    conditions.Status = 'WAITING';
                    if (Status === 'CREDITED')
                        conditions.dater = { $gt: new Date() };
                    else
                        conditions.dater = { $lte: new Date() };
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

            BankModel.findOne({ _id: res.datatable.data[0].bank_reglement }, "name_bank ref account_number code_bank journalId code_counter", function(err, bank) {

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
                    res.datatable.data[i].action = '<a href="#!/bank/payment/chq/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/bank/payment/chq/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-money"></span> ' + row.ref + '</a>';
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