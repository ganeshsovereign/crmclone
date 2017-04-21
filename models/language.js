"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emailing Schema
 */
var LanguageSchema = mongoose.Schema({
    name: String,
    code: { type: String, unique: true },
    idx: { type: Number, default: 0, unique: true },
}, { collection: 'languages' });


exports.Schema = mongoose.model('languages', LanguageSchema);
exports.name = "languages";