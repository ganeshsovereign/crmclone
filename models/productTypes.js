"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productTypesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        name: String,
        label: { type: String, default: '' } // On select in product
    }],
    //options: [{ type: Schema.Types.ObjectId, ref: 'productOptions' }], //variants
    //attributes: [{ type: Schema.Types.ObjectId, ref: 'productAttributes' }],
    inventory: { type: Boolean, default: true },
    isService: { type: Boolean, default: false }, //Product or Service

    isBundle: { type: Boolean, default: false }, //Pack promo
    isPackaging: { type: Boolean, default: false }, //Packaging of a product
    isDynamic: { type: Boolean, default: false }, //Dynamic forms
    dynamic: {
        name: { type: String, default: "" }, //Schema name for v0.1
        forms: String, //Schema for v1.0
        url: String // Schema for v1.0
    },

    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    sequence: { type: Number, default: 0 } // sort list
});

exports.Schema = mongoose.model('productTypes', productTypesSchema, 'productTypes');
exports.name = "productTypes";