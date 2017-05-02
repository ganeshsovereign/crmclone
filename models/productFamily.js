"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productFamiliesSchema = new Schema({
    langs: [{
        _id: false,
        name: String
    }],

    entity: [String],
    coef: { type: Boolean, default: false }, //Price was calculated from a coefficient
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isCost: { type: Boolean, default: false },
    sequence: { type: Number, default: 0 }, // sort list

    options: [{ type: Schema.Types.ObjectId, ref: 'productAttributes' }], //attributes

    accounts: [{
        _id: false,
        code: String,
        sell: { type: String, set: MODULE('utils').setAccount, trim: true },
        cost: { type: String, set: MODULE('utils').setAccount, trim: true }
    }]
}, {
    collection: 'productFamily',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

productFamiliesSchema.virtual('name').get(function() {
    return this.langs[0].name;
});


exports.Schema = mongoose.model('productFamily', productFamiliesSchema);
exports.name = "productFamily";