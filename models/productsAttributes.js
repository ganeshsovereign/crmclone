"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductAttributesSchema = new Schema({
    langs: [{
        _id: false,
        lang: { type: String, default: "fr" },
        name: String
    }],
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('productAttributes', ProductAttributesSchema, 'ProductAttributes');
exports.name = "productAttributes";