"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        async = require('async'),
        _ = require('lodash');

var Dict = INCLUDE('dict');
var round = MODULE('utils').round;

/**
 * Bank Schema
 */
var bankSchema = new Schema({
    ref: {type: String, unique: true},
    account_type: String,
    country: String,
    name_bank: String,
    code_bank: Number,
    number_bank: Number,
    code_counter: String,
    account_number: String,
    iban: String,
    bic: String,
    rib: String,
    currency: String,
    status: String,
    reconciled: Boolean,
    min_balance_allowed: Number,
    min_balance_required: Number,
    web: String,
    address: String,
    zip: String,
    town: String,
    comment: String,
    entity: {type: String, trim: true},
    owner: {
        name: String,
        address: String,
        zip: String,
        town: String
    },
    author: {
        id: {type: String, ref: 'User'},
        name: String
    },
    journalId: {type: String, unique: true}, // BQ1
    compta_bank: {type: String, unique: true} // 512xxxx
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

var statusList = {};

Dict.dict({dictName: "fk_account_status", object: true}, function (err, docs) {
    statusList = docs;
});

bankSchema.virtual('acc_status').get(function () {
    var acc_status = {};

    var status = this.status;

    if (status && statusList.values[status] && statusList.values[status].label) {
        acc_status.id = status;
        acc_status.name = statusList.values[status].label;
        acc_status.css = statusList.values[status].cssClass;
    } else { // By default
        acc_status.id = status;
        acc_status.name = status;
        acc_status.css = "";
    }
    return acc_status;
});

bankSchema.virtual('name').get(function () {
    return this.journalId + " (" + this.name_bank + " " + this.account_number + ")";
});

var typeList = {};

Dict.dict({dictName: "fk_account_type", object: true}, function (err, docs) {

    typeList = docs;
});

bankSchema.virtual('acc_type').get(function () {

    var acc_type = {};
    var account_type = this.account_type;

    if (account_type && typeList.values[account_type] && typeList.values[account_type].label) {
        acc_type.id = account_type;
        acc_type.name = typeList.values[account_type].label;
        acc_type.css = typeList.values[account_type].cssClass;
    } else { // By default
        acc_type.id = account_type;
        acc_type.name = account_type;
        acc_type.css = "";
    }

    return acc_type;
});

var countryList = {};

Dict.dict({dictName: "fk_country", object: true}, function (err, docs) {

    countryList = docs;
});

bankSchema.virtual('acc_country').get(function () {

    var acc_country = "";
    var account_country = this.country;

    if (account_country)
        acc_country = countryList.values[account_country].label;

    return acc_country;
});

/*bankSchema.virtual('balance').get(function () {
 
 var balance;
 var id = this._id;
 
 if (transactionList) {
 for (var i = 0; i < transactionList.length; i++) {
 if (id.equals(transactionList[i]._id)) {
 balance = transactionList[i].sumC - transactionList[i].sumD;
 return balance;
 }
 }
 }
 
 return 0;
 });*/

/*
 * bills_client or bills_supplier : [{
 *  _id,
 *  ref,
 *  payment // amount
 * }]
 */

bankSchema.methods.addPayment = function (options, user, callback) {
    var self = this;
    //var SocieteModel = MODEL('societe').Schema;
    var BillModel = MODEL('bill').Schema;
    var BillSupplierModel = MODEL('billSupplier').Schema;

    //console.log(options);
    //return;

    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

    //return console.log(this.body);
    var Book = INCLUDE('accounting').Book;
    var myBook = new Book();

    // for VTA
    var myBookOD = new Book();

    if (!self.journalId)
        return callback('Journal de banque absent. Voir la configuration de la banque');

    myBook.setName(self.journalId);
    //myBook.setEntity(body.bank.entity);

    myBookOD.setName('OD');
    //myBookOD.setEntity(body.bank.entity);

    // Ecriture du reglement
    var entry = myBook.entry(options.label, options.datec, user);
    var entryOD = myBookOD.entry(options.label, options.datec, user);

    SeqModel.incCpt("PAY", function (seq) {
        //console.log(seq);
        entry.setSeq(seq);
        entryOD.setSeq(seq);

        var bills = [];
        for (var i = 0, len = options.bills.length; i < len; i++)
            if (options.bills[i].payment != null)
                bills.push({
                    billId: options.bills[i]._id.toString(),
                    billRef: options.bills[i].ref,
                    amount: options.bills[i].payment
                });

        var billsSupplier = [];
        for (var i = 0, len = options.bills_supplier.length; i < len; i++)
            if (options.bills_supplier[i].payment != null)
                billsSupplier.push({
                    billSupplierId: options.bills_supplier[i]._id.toString(),
                    billSupplierRef: options.bills_supplier[i].ref,
                    amount: options.bills_supplier[i].payment
                });


        if (options.mode === "Receipt")
            entry.debit(self.compta_bank, options.amount, {
                type: options.mode_reglement_code,
                pieceAccounting: options.pieceAccounting,
                bills: bills, // Liste des factures
                billsSupplier: billsSupplier
            });
        else
            entry.credit(self.compta_bank, options.amount, {
                type: options.mode_reglement_code,
                pieceAccounting: options.pieceAccounting,
                bills: bills, // Liste des factures
                billsSupplier: billsSupplier
            });
        // Get entity for TVA_MODE

        async.waterfall([
            // get entity
            function (callback) {
                return mongoose.connection.db.collection('Mysoc', function (err, collection) {
                    if (err)
                        callback(err);

                    //console.log(collection);

                    collection.findOne({
                        _id: user.entity
                    }, {tva_mode: 1}, function (err, entity) {
                        //console.log(entity);
                        callback(err, entity);
                    });
                });
                //var entity = {
                //    tva_mode: 'payment'
                //};

                //callback(null, entity);
            },
            // load tva_dict
            function (entity, callback) {
                var tva = {
                    tva_code_colle: [],
                    tva_code_deduc: [],
                    tva_code_colle_paid: [],
                    tva_code_deduc_paid: []
                };

                if (entity.tva_mode !== 'payment')
                    return callback(null, entity, tva);

                Dict.dict({dictName: "fk_tva", object: true}, function (err, docs) {
                    for (var i = 0; i < docs.values.length; i++) {
                        if (docs.values[i].pays_code === 'FR' && docs.values[i].enable) {
                            tva.tva_code_colle[docs.values[i].value] = docs.values[i].code_compta_colle;
                            tva.tva_code_deduc[docs.values[i].value] = docs.values[i].code_compta_deduc;
                            tva.tva_code_colle_paid[docs.values[i].value] = docs.values[i].code_compta_colle_paid;
                            tva.tva_code_deduc_paid[docs.values[i].value] = docs.values[i].code_compta_deduc_paid;
                            //console.log(docs.values[i]);
                        }
                    }
                    callback(err, entity, tva);
                });

            },
            // apply entry
            function (entity, tva, callback) {
                // client
                for (var i = 0, len = options.bills.length; i < len; i++) {
                    var bill = options.bills[i];


                    if (bill.payment != null) {
                        if (bill.payment > 0)
                            entry.credit(bill.client.id.code_compta, Math.abs(bill.payment), {
                                billId: bill._id.toString(),
                                billRef: bill.ref,
                                societeId: bill.client.id._id.toString(),
                                societeName: bill.client.name
                            });
                        else
                            entry.debit(bill.client.id.code_compta, Math.abs(bill.payment), {
                                billId: bill._id.toString(),
                                billRef: bill.ref,
                                societeId: bill.client.id._id.toString(),
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
                                        entryOD.debit(tva.tva_code_colle[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billId: bill._id.toString(),
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.credit(tva.tva_code_colle_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billId: bill._id.toString(),
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    } else {
                                        // Si avoir
                                        entryOD.credit(tva.tva_code_colle[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billId: bill._id.toString(),
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.debit(tva.tva_code_colle_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billId: bill._id.toString(),
                                            billRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    }
                                }
                    }
                }

                for (var i = 0, len = options.bills_supplier.length; i < len; i++) {
                    var bill = options.bills_supplier[i];

                    if (bill.payment != null) {
                        if (bill.payment > 0)
                            entry.debit(bill.supplier.id.code_compta_fournisseur, Math.abs(bill.payment), {
                                billSupplierId: bill._id.toString(),
                                billSupplierRef: bill.ref,
                                societeId: bill.supplier.id._id.toString(),
                                societeName: bill.supplier.name
                            });
                        else
                            entry.credit(bill.supplier.id.code_compta_fournisseur, Math.abs(bill.payment), {
                                billSupplierId: bill._id.toString(),
                                billSupplierRef: bill.ref,
                                societeId: bill.supplier.id._id.toString(),
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
                                        entryOD.credit(tva.tva_code_deduc[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billSupplierId: bill._id.toString(),
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.debit(tva.tva_code_deduc_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billSupplierId: bill._id.toString(),
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                    } else {
                                        // Si avoir
                                        entryOD.debit(tva.tva_code_deduc[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billSupplierId: bill._id.toString(),
                                            billSupplierRef: bill.ref,
                                            tva_tx: bill.total_tva[j].tva_tx
                                        });
                                        entryOD.credit(tva.tva_code_deduc_paid[bill.total_tva[j].tva_tx], Math.abs(bill.total_tva[j].total), {
                                            billSupplierId: bill._id.toString(),
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
            function (callback) {
                var journal_id = [];

                entry.commit().then(function (journal) {
                    //console.log(journal);
                    journal_id.push(journal);

                    // ADD TVA lines
                    if (entryOD.transactions.length)
                        return entryOD.commit().then(function (journal) {
                            journal_id.push(journal);
                            return callback(null, journal_id);
                        }, function (err) {
                            console.log(err);
                            return callback(null, journal_id);
                        });

                    return callback(null, journal_id);
                }, function (err) {
                    callback(err.message);
                });
            },
            // update bills
            function (journal, callback) {
                
                var journalId = _.map(journal, function (item) {
                    return item._id;
                });

                //change status bills PAID
                for (var i = 0, len = options.bills.length; i < len; i++) {
                    var bill = options.bills[i];
                    if (bill.payment != null) {
                        //console.log(bill);
                        var status = "STARTED";
                        if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                            status = "PAID";
                        
                        if (round(bill.payment + bill.total_paid, 2) == 0)
                            status = 'NOT_PAID';

                        BillModel.update({_id: bill._id}, {$set: {Status: status, updatedAt: new Date()}, $inc: {total_paid: bill.payment}, $addToSet: {journalId: {$each: journalId}}}, function (err, doc) {
                            if (err)
                                console.log(err);
                            //console.log(doc);
                        });
                    } 
                }
                
                 for (var i = 0, len = options.bills_supplier.length; i < len; i++) {
                    var bill = options.bills_supplier[i];
                    if (bill.payment != null) {
                        //console.log(bill);
                        var status = "STARTED";
                        if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2))
                            status = "PAID";
                        BillSupplierModel.update({_id: bill._id}, {$set: {Status: status, updatedAt: new Date()}, $inc: {total_paid: bill.payment}, $addToSet: {journalId: {$each: journalId}}}, function (err, doc) {
                            if (err)
                                console.log(err);
                            //console.log(doc);
                        });
                    }
                }
                callback(null, journal);
            }], callback);
    });
};

exports.Schema = mongoose.model('bank', bankSchema, 'Bank');
exports.name = 'bank';
