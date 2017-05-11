"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var currencySchema = new Schema({
    _id: { type: 'String' },
    name: { type: String, default: '' },
    symbol: { type: String, default: '' },
    decPlace: { type: Number, default: 2 },
    sequence: { type: Number },
    active: { type: Boolean, default: false }
}, { collection: 'currency' });

exports.Schema = mongoose.model('currency', currencySchema);
exports.name = "currency";