"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var priceListsSchema = new Schema({
    priceListCode: { type: String, uppercase: true, unique: true, require: true, set: MODULE('utils').set_Space },
    name: { type: 'String', default: null },
    currency: { type: String, ref: 'currency', default: null },
    cost: { type: Boolean, default: false }, //true if supplier price
    defaultPriceList: { type: Boolean }, //truue
    removable: { type: Boolean, default: true }
});

exports.Schema = mongoose.model('priceList', priceListsSchema, 'PriceList');
exports.name = "priceList";