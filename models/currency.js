"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emailing Schema
 */
var currencySchema = new Schema({
    _id: { type: 'String' },
    name: { type: String, default: '' },
    symbol: { type: String, default: '' },
    decPlace: { type: Number, default: 2 },
    sequence: { type: Number },
    active: { type: Boolean, default: false }
});

exports.Schema = mongoose.model('currency', currencySchema, 'currency');
exports.name = "currency";