"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OptionsValuesSchema = new Schema({
    value: { type: String, default: 'default' },
    optionId: { type: Schema.Types.ObjectId, ref: 'productsOptions', default: null }
});

exports.Schema = mongoose.model('productOptionsValues', OptionsValuesSchema, 'ProductOptionsValues');
exports.name = "productOptionsValues";