"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var logisticMethodSchema = new Schema({
    isremoved: { type: Boolean, default: false },
    name: { type: String, default: '' },
    code: { type: String, default: '' },
    price: { type: Number, default: 0 },
    weight: { type: Number, default: 0 }, //Weight emballage
    countries: [String],
    breaks: [Number],
    breakType: { type: String, default: '' },
    account: { type: ObjectId, ref: 'chartOfAccount', default: null }
}, { collection: 'logisticMethod' });

logisticMethodSchema.plugin(timestamps);

exports.Schema = mongoose.model('logisticMethod', logisticMethodSchema);
exports.name = 'logisticMethod';