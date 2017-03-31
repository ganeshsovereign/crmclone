"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OptionsValuesSchema = new Schema({
    value: { type: String, default: 'default' }, // TODO remove
    code: String,
    langs: [{
        _id: false,
        lang: { type: String, default: "fr" },
        value: String
    }],
    sort: Number,
    optionId: { type: Schema.Types.ObjectId, ref: 'productsOptions', default: null }, //optionId or attributeId
    attributeId: { type: Schema.Types.ObjectId, ref: 'productsAttributes', default: null },
});

exports.Schema = mongoose.model('productOptionsValues', OptionsValuesSchema, 'ProductOptionsValues');
exports.name = "productOptionsValues";