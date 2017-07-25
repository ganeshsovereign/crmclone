"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

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
    supplier: { type: Schema.Types.ObjectId, ref: 'Customers' },
    bills: [{
        _id: false,
        invoice: { type: Schema.Types.ObjectId, ref: 'invoice' },
        amount: Number
    }],
    //bill: { type: Schema.Types.ObjectId, ref: 'bill' },
    dater: { type: Date, set: setDate }, // date de règlement
    amount: { type: Number, default: 0, set: setPrice },
    journalId: { type: Schema.Types.ObjectId, ref: 'Journal' }, // Id transactions for accounting 
    Status: String, // NotUsed
    isRejected: Boolean,
    memo: String // Reason reject
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


var paymentSchema = new Schema({
    ref: String, //ref with SEQ
    seq: Number,
    datec: { type: Date, default: Date.now, set: setDate },
    dater: { type: Date, set: setDate }, // Date de valeur in bank
    lines: [linesSchema],
    Status: { type: String, default: 'DRAFT' },
    total_amount: Number,
    mode_reglement: { type: String, default: null },
    bank_reglement: { type: Schema.Types.ObjectId, ref: 'bank' },
    journalId: [Schema.Types.ObjectId], // Id transactions for accounting
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    editedBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    history: [{
        date: { type: Date, default: Date.now },
        createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
        mode: String, //email, order, alert, new, ...
        Status: String,
        msg: String
    }]
}, {
    collection: "Payment",
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

paymentSchema.plugin(timestamps);

paymentSchema.pre('save', function(next) {
    var self = this;
    var SeqModel = MODEL('Sequence').Schema;

    this.total_amount = _.sum(this.lines, function(elem) {
        return elem.amount;
    });

    if (this.isNew)
        SeqModel.inc(this.type.toUpperCase(), self.datec, function(seq, idx) {
            //console.log(seq);
            self.ref = self.type.toUpperCase() + seq;
            self.seq = idx;

            next();
        });
    else
        next();
});

paymentSchema.virtual('status')
    .get(function() {
        var res_status = {};

        var status = this.Status;

        if (status && exports.Status.values[status] && exports.Status.values[status].label) {
            //console.log(this);
            res_status.id = status;
            res_status.name = i18n.t(exports.Status.lang + ":" + exports.Status.values[status].label);
            //res_status.name = statusList.values[status].label;
            res_status.css = exports.Status.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "";
        }
        return res_status;

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
        .populate({ path: "lines.supplier", select: "_id name iban salesPurchases" })
        .populate({ path: 'lines.bills.invoice', select: '_id ref total_ttc total_tva total_paid supplier journalId' })
        .populate("bank_reglement", "name_bank ref account_number code_bank journalId code_counter compta_bank")
        .exec(callback);
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