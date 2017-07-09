"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var priceListsSchema = new Schema({
    priceListCode: { type: String, uppercase: true, unique: true, require: true, set: MODULE('utils').set_Space },
    name: { type: 'String', default: null },
    currency: { type: String, ref: 'currency' },
    cost: { type: Boolean, default: false }, //true if supplier price
    isCoef: { type: Boolean, default: false }, //Price was calculated from a coefficient
    isFixed: { type: Boolean, default: false }, //Special customer price

    isGlobalDiscount: { type: Boolean, default: false }, // PriceList is discount from an other
    discount: { type: Number, default: 0 }, //Global discount need a parent priceList
    parent: { type: Schema.Types.ObjectId, ref: 'priceList' },
    dateExpiration: { type: Date, default: null }, //Expiration date for Fixed Price

    defaultPriceList: { type: Boolean }, //Only one true
    removable: { type: Boolean, default: true }
});

exports.Schema = mongoose.model('priceList', priceListsSchema, 'PriceList');
exports.name = "priceList";