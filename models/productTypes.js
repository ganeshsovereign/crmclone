"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productTypesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        name: String
    }],
    options: [{ type: Schema.Types.ObjectId, ref: 'productOptions' }], //variants
    attributes: [{ type: Schema.Types.ObjectId, ref: 'productAttributes' }],
    inventory: { type: Boolean, default: true },
    coef: { type: Boolean, default: false }, //Price was calculated from a coefficient
    createdAt: { type: Date, default: Date.now },

    /*accountsBuy: [{
        _id: false,
        code: String,
        account: { type: String, set: MODULE('utils').setAccount, trim: true }
    }],

    accountsSell: [{
        _id: false,
        code: String,
        account: { type: String, set: MODULE('utils').setAccount, trim: true }
    }]*/


});

exports.Schema = mongoose.model('productTypes', productTypesSchema, 'productTypes');
exports.name = "productTypes";