"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OptionsSchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('productOptions', OptionsSchema, 'ProductOptions');
exports.name = "productOptions";