"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taxSchema = new mongoose.Schema({
    langs: [{
        _id: false,
        name: { type: String, default: '' },
        label: { type: String, default: '' } // On bill PDF
    }],
    code: { type: String, require: true, unique: true },
    isFixValue: { type: Boolean, default: false }, // For ecotaxe it's true
    rate: { type: Number, default: 0 }, // On percent
    sequence: { type: Number, default: 0 },
    country: { type: String, default: 'FR' },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    sellAccount: { type: String, set: MODULE('utils').setAccount, trim: true, default: null },
    buyAccount: { type: String, set: MODULE('utils').setAccount, trim: true, default: null },
    isOnPaid: { type: Boolean, default: false }
}, {
    collection: 'taxes',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

taxSchema.virtual('name').get(function() {
    if (this.langs && this.langs.length)
        return this.langs[0].name;
});

exports.Schema = mongoose.model('taxes', taxSchema);
exports.name = "taxes";