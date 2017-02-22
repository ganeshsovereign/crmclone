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

var setAccount = function (account) {
    if (account) {
        account = account.replace(/ /g, "");
        account = account.substring(0, CONFIG('accounting.length') || 10); //limit a 10 character
    }

    return account;
};

/**
 * Article Schema
 */
var TransationSchema = new Schema({
    credit: Number,
    debit: Number,
    meta: Schema.Types.Mixed,
    datetime: {type: Date, set: setDate},
    account_path: [String],
    accounts: {type: String, set: setAccount},
    book: String,
    //entity: {type: String, required: true},
    memo: {type: String, uppercase: true},
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
    seq: {type: String} /*Numero de piece*/
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

/**
 * Pre-save hook
 */
TransationSchema.pre('save', function (next) {
    /*var SeqModel = MODEL('Sequence').Schema;
     var EntityModel = MODEL('entity').Schema;
     
     var self = this;
     if (!this.ref && this.isNew) {
     SeqModel.inc("PROV", function (seq) {
     //console.log(seq);
     self.ref = "PROV" + seq;
     next();
     });
     } else {
     if (this.Status != "DRAFT" && this.total_ht != 0 && this.ref.substr(0, 4) == "PROV") {
     EntityModel.findOne({_id: self.entity}, "cptRef", function (err, entity) {
     if (err)
     console.log(err);
     
     if (entity && entity.cptRef) {
     SeqModel.inc("FA" + entity.cptRef, self.datec, function (seq) {
     //console.log(seq);
     self.ref = "FA" + entity.cptRef + seq;
     next();
     });
     } else {
     SeqModel.inc("FA", self.datec, function (seq) {
     //console.log(seq);
     self.ref = "FA" + seq;
     next();
     });
     }
     });
     } else {*/
    next();
    //}
    //}
});


exports.Schema = mongoose.model('Transaction', TransationSchema, 'Transaction');
exports.name = 'transaction';
