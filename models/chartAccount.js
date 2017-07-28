"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var chartAccountSchema = new Schema({
    isremoved: { type: Boolean, default: false },
    code: { type: Number },
    account: { type: String, default: '' },
    name: { type: String, default: '' },
    subAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },
    category: { type: ObjectId, ref: 'accountsCategory', default: null },
    budgeted: { type: Boolean, default: false },

    payMethod: { type: ObjectId, ref: 'PaymentMethod', default: null },

    editedBy: { type: ObjectId, ref: 'Users' },
    createdBy: { type: ObjectId, ref: 'Users' }
}, { collection: 'chartOfAccount' });

chartAccountSchema.plugin(timestamps);

exports.Schema = mongoose.model('chartOfAccount', chartAccountSchema);
exports.name = 'chartOfAccount';