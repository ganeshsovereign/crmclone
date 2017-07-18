"use strict";

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async'),
    mongoose = require('mongoose');


var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var object = new Object();
    F.route('/erp/api/payment', object.read, ['authorize']);
    //F.route('/erp/api/payment/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/payment', object.create, ['post', 'json', 'authorize'], 1024); //512k
};

function Object() {}

Object.prototype = {
    read: function() {
        var self = this;
        var TransactionModel = MODEL('transaction').Schema;
        var query;

        if (self.query.find)
            query = JSON.parse(self.query.find);

        //console.log(query);

        TransactionModel.find(query, function(err, doc) {
            //console.log(doc);
            if (err)
                return self.throw500(err);



            self.json(doc);
        });
    },
    create: function() {
        var self = this;
        var SocieteModel = MODEL('societe').Schema;
        var BillModel = MODEL('invoice').Schema;
        var BillSupplierModel = MODEL('billSupplier').Schema;

        var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

        //return console.log(this.body);
        var body = this.body;
        var Book = INCLUDE('accounting').Book;
        var myBook = new Book();

        // for VTA
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
        var entry = myBook.entry(body.libelleAccounting, body.datec, { id: self.user._id, name: self.user.name });
        var entryOD = myBookOD.entry(body.libelleAccounting, body.datec, { id: self.user._id, name: self.user.name });

        SeqModel.incCpt("PAY", function(seq) {
            //console.log(seq);
            entry.setSeq(seq);
            entryOD.setSeq(seq);

            var bills = [];
            for (var i = 0, len = body.bills.length; i < len; i++)
                if (body.bills[i].payment != null)
                    bills.push({
                        billId: body.bills[i]._id,
                        billRef: body.bills[i].ref,
                        amount: body.bills[i].payment
                    });

            var billsSupplier = [];
            for (var i = 0, len = body.bills_supplier.length; i < len; i++)
                if (body.bills_supplier[i].payment != null)
                    billsSupplier.push({
                        billSupplierId: body.bills_supplier[i]._id,
                        billSupplierRef: body.bills_supplier[i].ref,
                        amount: body.bills_supplier[i].payment
                    });

            if (body.mode === "Receipt")
                entry.debit(body.bank.compta_bank, body.amount, null, {
                    type: body.mode_reglement_code,
                    pieceAccounting: body.pieceAccounting,
                    societeId: body.societe.id,
                    societeName: body.societe.name,
                    bills: bills, // Liste des factures
                    billsSupplier: billsSupplier
                });
            else
                entry.credit(body.bank.compta_bank, body.amount, null, {
                    type: body.mode_reglement_code,
                    pieceAccounting: body.pieceAccounting,
                    societeId: body.societe.id,
                    societeName: body.societe.name,
                    bills: bills, // Liste des factures
                    billsSupplier: billsSupplier
                });
            // Get entity for TVA_MODE

            async.waterfall([
                // get entity
                function(callback) {
                    // TODO NE FONCTIONNE PAS collection is null !!!!!

                    return mongoose.connection.db.collection('Mysoc', function(err, collection) {
                        if (err)
                            callback(err);

                        //console.log(collection);

                        collection.findOne({
                            _id: self.user.entity
                        }, { tva_mode: 1 }, function(err, entity) {
                            //console.log(entity);
                            callback(err, entity);
                        });
                    });
                    //var entity = {
                    //    tva_mode: 'payment'
                    //};

                    //callback(null, entity);
                },
                // get societe for accounting
                function(entity, callback) {
                    //console.log(body);
                    SocieteModel.findOne({ _id: body.societe.id }, "name code_compta code_compta_fournisseur", function(err, societe) {
                        if (err)
                            return callback(err);
                        if (!societe)
                            return callback('Societe inconnue !');

                        callback(err, entity, societe);
                    });
                },
                // load tva_dict
                function(entity, societe, callback) {
                    var tva = {
                        tva_code_colle: [],
                        tva_code_deduc: [],
                        tva_code_colle_paid: [],
                        tva_code_deduc_paid: []
                    };

                    if (entity.tva_mode !== 'payment')
                        return callback(null, entity, societe, tva);

                    Dict.dict({ dictName: "fk_tva", object: true }, function(err, docs) {
                        for (var i = 0; i < docs.values.length; i++) {
                            if (docs.values[i].pays_code === 'FR' && docs.values[i].enable) {
                                tva.tva_code_colle[docs.values[i].value] = docs.values[i].code_compta_colle;
                                tva.tva_code_deduc[docs.values[i].value] = docs.values[i].code_compta_deduc;
                                tva.tva_code_colle_paid[docs.values[i].value] = docs.values[i].code_compta_colle_paid;
                                tva.tva_code_deduc_paid[docs.values[i].value] = docs.values[i].code_compta_deduc_paid;
                                //console.log(docs.values[i]);
                            }
                        }
                        callback(err, entity, societe, tva);
                    });

                },
                // apply entry
                function(entity, societe, tva, callback) {

                    //Options
                    if (body.penality !== 0)
                        entry.credit('763100', Math.abs(body.penality), null, {});

                    if (body.differential !== 0) {
                        if (body.differential > 0)
                            entry.credit('758000', Math.abs(body.differential), null, {});
                        else
                            entry.debit('658000', Math.abs(body.differential), null, {});
                    }

                    // client
                    for (var i = 0, len = body.bills.length; i < len; i++) {
                        var bill = body.bills[i];

                        if (bill.payment != null) {
                            if (bill.payment > 0)
                                entry.credit(societe.code_compta, Math.abs(bill.payment), null, {
                                    billId: bill._id,
                                    billRef: bill.ref,
                                    societeId: bill.client.id,
                                    societeName: bill.client.name
                                });
                            else
                                entry.debit(societe.code_compta, Math.abs(bill.payment), null, {
                                    billId: bill._id,
                                    billRef: bill.ref,
                                    societeId: bill.client.id,
                                    societeName: bill.client.name
                                });


                            //Migrate TVA to final account
                            if (entity.tva_mode === 'payment') // TVA sur encaissement
                                if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                    for (var j = 0, len2 = bill.total_tva.length; j < len2; j++) {
                                    // No TVA
                                    if (bill.total_tva[j].total == 0)
                                        continue;

                                    // TVA on payment
                                    if (bill.total_tva[j].total > 0) {
                                        entryOD.debit(tva.tva_code_colle[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billId: bill._id,
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.credit(tva.tva_code_colle_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billId: bill._id,
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    } else {
                                        // Si avoir
                                        entryOD.credit(tva.tva_code_colle[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billId: bill._id,
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.debit(tva.tva_code_colle_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billId: bill._id,
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    }
                                }
                        }
                    }

                    // fournisseur
                    for (var i = 0, len = body.bills_supplier.length; i < len; i++) {
                        var bill = body.bills_supplier[i];
                        if (bill.payment != null) {
                            if (bill.payment > 0)
                                entry.debit(societe.code_compta_fournisseur, Math.abs(bill.payment), null, {
                                    billSupplierId: bill._id,
                                    billSupplierRef: bill.ref,
                                    societeId: bill.supplier.id,
                                    societeName: bill.supplier.name
                                });
                            else
                                entry.credit(societe.code_compta_fournisseur, Math.abs(bill.payment), null, {
                                    billSupplierId: bill._id,
                                    billSupplierRef: bill.ref,
                                    societeId: bill.supplier.id,
                                    societeName: bill.supplier.name
                                });

                            //Migrate TVA to final account
                            if (entity.tva_mode === 'payment') // TVA sur encaissement
                                if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                    for (var j = 0, len2 = bill.total_tva.length; j < len2; j++) {

                                    if (bill.total_tva[j].total == 0)
                                        continue;

                                    // TVA on payment
                                    if (bill.total_tva[j].total > 0) {
                                        entryOD.credit(tva.tva_code_deduc[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billSupplierId: bill._id,
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.debit(tva.tva_code_deduc_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billSupplierId: bill._id,
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    } else {
                                        // Si avoir
                                        entryOD.debit(tva.tva_code_deduc[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billSupplierId: bill._id,
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.credit(tva.tva_code_deduc_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), null, {
                                            billSupplierId: bill._id,
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    }
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
                        if (bill.payment != null) {
                            //console.log(bill);
                            var status = "STARTED";
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                                status = "PAID";

                            BillModel.update({ _id: bill._id }, { $set: { Status: status, updatedAt: new Date() }, $inc: { total_paid: bill.payment }, $addToSet: { journalId: { $each: journalId } } }, function(err, doc) {
                                if (err)
                                    console.log(err);
                                //console.log(doc);
                            });
                        }

                        cb();
                    }, function(err) {});
                    async.each(body.bills_supplier, function(bill, cb) {
                        if (bill.payment != null) {
                            //console.log(bill);
                            var status = "STARTED";
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                                status = "PAID";
                            BillSupplierModel.update({ _id: bill._id }, { $set: { Status: status, updatedAt: new Date() }, $inc: { total_paid: bill.payment }, $addToSet: { journalId: { $each: journalId } } }, function(err, doc) {
                                if (err)
                                    console.log(err);
                                //console.log(doc);
                            });
                        }
                        cb();
                    }, function(err) {});

                    callback(null, journal);
                }
            ], function(err, journal) {

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