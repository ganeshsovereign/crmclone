"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productTypesSchema = new Schema({
    name: String,
    options: [{ type: Schema.Types.ObjectId, ref: 'productOptions' }],
    inventory: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('productTypes', productTypesSchema, 'productTypes');
exports.name = "productTypes";