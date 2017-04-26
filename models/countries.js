"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emailing Schema
 */
var countriesSchema = new Schema({
    _id: { type: String, default: '' },
    langs: [{
        _id: false,
        name: { type: String, default: '' }
    }],
    fiscalZone: { type: String, default: null }, //null (no internal country), EUROP (Import/Export in EUROPE), INTER (Import/Export international) 
    isVAT: { type: Boolean, default: true }, //disable Taxes
    code: { type: String, default: '' }
}, {
    collection: 'countries',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

countriesSchema.virtual('name').get(function() {
    return this.langs[0].name;
});

exports.Schema = mongoose.model('countries', countriesSchema);
exports.name = "countries";