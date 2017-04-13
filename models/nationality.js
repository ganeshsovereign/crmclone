"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emailing Schema
 */
var nationalitySchema = new Schema({
    _id: String,
    langs: [{
        _id: false,
        lang: { type: String, default: 'fr' },
        name: { type: String, default: '' }
    }],
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'nationality'
});

nationalitySchema.virtual('name')
    .get(function() {
        return this.langs[0].name;
    });


exports.Schema = mongoose.model('nationality', nationalitySchema);
exports.name = "nationality";