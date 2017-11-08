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

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

const round = MODULE('utils').round;

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var linesSchema = new Schema({
    _id: false,
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    bills: [{
        _id: false,
        invoice: {
            type: Schema.Types.ObjectId,
            ref: 'invoice'
        },
        amount: Number
    }],
    //bill: { type: Schema.Types.ObjectId, ref: 'bill' },
    dater: {
        type: Date,
        set: setDate
    }, // date de règlement
    amount: {
        type: Number,
        default: 0,
        set: setPrice
    },
    journalId: {
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    }, // Id transactions for accounting 
    Status: String, // NotUsed
    isRejected: Boolean,
    memo: String // Reason reject
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});


var paymentSchema = new Schema({
    ref: String, //ref with SEQ
    seq: Number,
    datec: {
        type: Date,
        default: Date.now,
        set: setDate
    },
    dater: {
        type: Date,
        set: setDate
    }, // Date de valeur in bank
    lines: [linesSchema],
    Status: {
        type: String,
        default: 'DRAFT'
    },
    total_amount: Number,
    mode_reglement: {
        type: String,
        default: null
    },
    bank_reglement: {
        type: Schema.Types.ObjectId,
        ref: 'bank'
    },
    journalId: [Schema.Types.ObjectId], // Id transactions for accounting
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    history: [{
        date: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        mode: String, //email, order, alert, new, ...
        Status: String,
        msg: String
    }]
}, {
    collection: "Payment",
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

paymentSchema.plugin(timestamps);

paymentSchema.pre('save', function(next) {
    var self = this;
    var SeqModel = MODEL('Sequence').Schema;

    this.total_amount = _.sum(this.lines, function(elem) {
        return elem.amount;
    });

    if (this.isNew)
        SeqModel.inc(this.mode_reglement.toUpperCase(), self.datec, function(seq, idx) {
            //console.log(seq);
            self.ref = self.mode_reglement.toUpperCase() + seq;
            self.seq = idx;

            next();
        });
    else
        next();
});

paymentSchema.virtual('status')
    .get(function() {
        return MODULE('utils').Status(this.Status, exports.Status);
    });

paymentSchema.statics.getById = function(id, callback) {
    // Read an offer
    var self = this;

    //TODO Check ACL here
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var query = {};

    if (checkForHexRegExp.test(id))
        query = {
            _id: id
        };
    else
        query = {
            ref: id
        };

    //console.log(query);

    this.findOne(query)
        .populate({
            path: "lines.supplier",
            select: "_id name iban salesPurchases"
        })
        .populate({
            path: 'lines.bills.invoice',
            select: '_id ref total_ttc total_tva total_paid supplier journalId'
        })
        .populate("bank_reglement", "name_bank ref account_number code_bank journalId code_counter compta_bank")
        .exec(callback);
};

/*
 * bills or bills_supplier : [{
 *  _id,
 *  ref,
 *  payment // amount
 * }]
 */

paymentSchema.statics.addPayment = function(options, user, callback) {

    var SocieteModel = MODEL('Customers').Schema;
    var BillModel = MODEL('invoice').Schema;

    var SeqModel = MODEL('Sequence').Schema; // Pour le numero de piece automatique

    console.log("payment options", options);

    _.map(options.bills, function(elem) {
        console.log(elem);
    });
    var body = options;
    var Book = INCLUDE('accounting').Book;
    var myBook = new Book();

    // for Taxes
    //var myBookOD = new Book();

    if (body.mode === "Receipt" && body.mode_reglement_code == 'CHQ') // Receive a CHQ
        body.bank = {
            journalId: "RG"
        }; // Reglement

    if (!body.bank.journalId)
        return callback('Journal de banque absent. Voir la configuration de la banque');

    myBook.setName(body.bank.journalId);
    //myBook.setEntity(body.bank.entity);

    //myBookOD.setName('OD');
    //myBookOD.setEntity(body.bank.entity);

    // Ecriture du reglement
    var entry = myBook.entry(body.libelleAccounting, body.datec, user._id);
    //var entryOD = myBookOD.entry(body.libelleAccounting, body.datec, user._id);

    SeqModel.incCpt("PAY", function(seq) {
        //console.log(seq);
        entry.setSeq(seq);
        //entryOD.setSeq(seq);

        var bills = [];
        //var bills_supplier = [];

        if (body.bills)
            for (var i = 0, len = body.bills.length; i < len; i++)
                if (body.bills[i].payment != null)
                    bills.push({
                        invoice: body.bills[i]._id,
                        amount: body.bills[i].payment
                    });

        if (body.bills_supplier)
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

        async.parallel([
                function(pCb) {
                    //Options
                    if (!body.penality)
                        return pCb();

                    entry.credit('763100', Math.abs(body.penality), "PENALITY", {
                        type: body.mode_reglement_code,
                        supplier: body.supplier
                    });

                    pCb();
                },
                function(pCb) {
                    if (!body.differential)
                        return pCb();

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

                    pCb();
                },
                function(pCb) {
                    // client
                    if (!body.bills)
                        return pCb();

                    async.forEach(body.bills, function(bill, aCb) {
                        if (bill.payment == null)
                            return aCb();

                        //return console.log(bill);

                        if (!bill.supplier)
                            return aCb('Societe inconnue !');

                        let supplierId = bill.supplier;
                        if (supplierId._id)
                            supplierId = supplierId._id;

                        //return console.log(bill);

                        SocieteModel.findById(supplierId, "name salesPurchases", function(err, societe) {
                            if (err)
                                return aCb(err);

                            if (!societe)
                                return aCb('Societe inconnue !');

                            if (bill.payment > 0)
                                entry.credit(societe.salesPurchases.customerAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    bills: [{
                                        invoice: bill._id,
                                        amount: bill.payment
                                    }],
                                    supplier: body.supplier
                                });
                            else
                                entry.debit(societe.salesPurchases.customerAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    bills: [{
                                        invoice: bill._id,
                                        amount: bill.payment
                                    }],
                                    supplier: body.supplier
                                });


                            //Migrate TVA to final account
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                for (var j = 0, len2 = bill.total_taxes.length; j < len2; j++) {

                                    // No TVA
                                    if (bill.total_taxes[j].value == 0)
                                        continue;

                                    // TVA on payment
                                    if (bill.total_taxes[j].taxeId.isOnPaid !== true)
                                        continue;

                                    if (bill.total_taxes[j].value > 0) {
                                        entry.debit("445740", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                        entry.credit(bill.total_taxes[j].taxeId.sellAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                    } else {
                                        // Si avoir
                                        entry.credit("445740", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                        entry.debit(bill.total_taxes[j].taxeId.sellAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                    }
                                }

                            aCb();
                        });
                    }, pCb);
                },
                function(pCb) {
                    // fournisseur

                    if (!body.bills_supplier)
                        return pCb();

                    async.forEach(body.bills_supplier, function(bill, aCb) {
                        if (bill.payment == null)
                            return aCb();

                        if (!bill.supplier)
                            return aCb('Societe inconnue !');

                        let supplierId = bill.supplier;
                        if (supplierId._id)
                            supplierId = supplierId._id;

                        //return console.log(bill);

                        SocieteModel.findById(supplierId, "name salesPurchases", function(err, societe) {
                            if (err)
                                return aCb(err);

                            if (!societe)
                                return aCb('Societe inconnue !');

                            if (bill.payment > 0)
                                entry.debit(societe.salesPurchases.supplierAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    bills: [{
                                        invoice: bill._id,
                                        amount: bill.payment
                                    }],
                                    supplier: body.supplier
                                });
                            else
                                entry.credit(societe.salesPurchases.supplierAccount, Math.abs(bill.payment), null, {
                                    type: body.mode_reglement_code,
                                    bills: [{
                                        invoice: bill._id,
                                        amount: bill.payment
                                    }],
                                    supplier: body.supplier
                                });

                            //Migrate TVA to final account
                            if (round(bill.payment + bill.total_paid, 2) >= round(bill.total_ttc, 2)) // Full paid
                                for (var j = 0, len2 = bill.total_taxes.length; j < len2; j++) {

                                    if (bill.total_taxes[j].value == 0)
                                        continue;

                                    //console.log(bill.total_taxes[j]);

                                    // TVA on payment
                                    if (bill.total_taxes[j].taxeId.isOnPaid !== true)
                                        continue;

                                    // TVA on payment
                                    if (bill.total_taxes[j].value > 0) {
                                        entry.credit("445640", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                        entry.debit(bill.total_taxes[j].taxeId.buyAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                    } else {
                                        // Si avoir
                                        entry.debit("445640", Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                        entry.credit(bill.total_taxes[j].taxeId.buyAccount, Math.abs(bill.total_taxes[j].value), bill.total_taxes[j].taxeId.code, {
                                            type: body.mode_reglement_code,
                                            supplier: body.supplier,
                                            bills: [{
                                                invoice: bill._id,
                                                amount: bill.total_taxes[j].value
                                            }],
                                            tax: bill.total_taxes[j].taxeId._id
                                        });
                                    }
                                }

                            aCb();
                        });
                    }, pCb);
                }
            ],
            function(err) {
                if (err)
                    return callback(err);

                async.waterfall([
                    // save transaction
                    function(wCb) {
                        var journal_id = [];

                        entry.commit().then(function(journal) {
                            //console.log(journal);
                            journal_id.push(journal);

                            // ADD TVA lines
                            /*if (entryOD.transactions.length)
                                return entryOD.commit().then(function(journal) {
                                    journal_id.push(journal);
                                    return wCb(null, journal_id);
                                }, function(err) {
                                    console.log(err);
                                    return wCb(null, journal_id);
                                });*/

                            return wCb(null, journal_id);
                        }, function(err) {
                            console.log(err);
                            wCb(err.message);
                        });
                    },
                    // update bills
                    function(journal, wCb) {

                        //change status bills PAID
                        if (!body.bills)
                            return wCb(null, journal);

                        async.forEach(body.bills, function(invoice, cb) {
                            //console.log("bill", invoice);

                            if (invoice && invoice._id) {
                                F.emit('invoice:recalculateStatus', {
                                    userId: user._id.toString(),
                                    invoice: {
                                        _id: invoice._id.toString()
                                    }
                                });
                                return cb();
                            }

                            return cb();

                        }, function(err) {
                            return wCb(err, journal);
                        });

                    },
                    function(journal, wCb) {

                        //change status bills PAID
                        if (!body.bills_supplier)
                            return wCb(null, journal);

                        async.forEach(body.bills_supplier, function(invoice, cb) {
                            //console.log("bill supplier", invoice);

                            if (invoice && invoice._id) {
                                F.emit('invoice:recalculateStatus', {
                                    userId: user._id.toString(),
                                    invoice: {
                                        _id: invoice._id.toString()
                                    }
                                });
                                return cb();
                            }

                            return cb();

                        }, function(err) {
                            return wCb(err, journal);
                        });
                    }
                ], callback);
            });
    });
};


exports.Status = {
    _id: 'fk_status',
    lang: 'bank',
    default: 'DRAFT',
    values: {
        CANCELED: {
            cssClass: 'label-info',
            label: 'StatusRejected',
            enable: true
        },
        PAID: {
            cssClass: 'label-success',
            label: 'StatusCredited',
            enable: true
        },
        VALIDATE: {
            cssClass: 'label-warning',
            label: 'StatusWaiting',
            enable: true
        },
        DRAFT: {
            cssClass: 'label-default',
            label: 'StatusDraft',
            enable: true
        }
    }
};

exports.Schema = mongoose.model('payment', paymentSchema);
exports.name = "payment";