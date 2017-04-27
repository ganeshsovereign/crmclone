"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taxSchema = new mongoose.Schema({
    langs: [{
        _id: false,
        name: { type: String, default: '' }
    }],
    code: { type: String, default: '' },
    rate: { type: Number, default: 0 },
    sequence: { type: Number, default: 0 },
    country: { type: String, default: 'FR' },
    isDefault: { type: Boolean, default: false }
}, {
    collection: 'taxes',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

taxSchema.virtual('name').get(function() {
    return this.langs[0].name;
});

exports.Schema = mongoose.model('taxes', taxSchema);
exports.name = "taxes";