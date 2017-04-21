"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupAttributesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        name: String
    }],
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('groupAttributes', GroupAttributesSchema, 'groupAttributes');
exports.name = "groupAttributes";