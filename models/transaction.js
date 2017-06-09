"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;
var setAccount = MODULE('utils').setAccount;

/**
 * Article Schema
 */
var TransationSchema = new Schema({
    credit: Number,
    debit: Number,
    meta: Schema.Types.Mixed,
    /*
     meta : {
        billsSupplier: [
            {
                amount: Number,
                billSupplierRef: String,
                billSupplierId: String
            }
        ],
        bills: [
            {
                amount: Number,
                billRef: String,
                billId: String
            }
        ],
        productRef : String,
        productId:String,
        societeName: String,
        societeId: String,
        pieceAccounting : String,
        type: String,
        tva_tx : Number
    }
     */


    datetime: { type: Date, set: setDate },
    account_path: [String],
    accounts: { type: String, set: setAccount },
    book: String,
    //entity: {type: String, required: true},
    memo: { type: String, uppercase: true },
    _journal: {
        type: Schema.Types.ObjectId,
        ref: 'Medici_Journal'
    },
    timestamp: {
        type: Date,
        "default": Date.now
    },
    voided: {
        type: Boolean,
        "default": false
    },
    void_reason: String,
    _original_journal: Schema.Types.ObjectId,
    approved: {
        type: Boolean,
        default: true
    },
    exported: Date, // Date of export
    reconcilliation: Date, //Only for rapprochement in bank
    seq: { type: String } /*Numero de piece*/
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

exports.Schema = mongoose.model('Transaction', TransationSchema, 'Transaction');
exports.name = 'transaction';