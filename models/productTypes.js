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

    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    sequence: { type: Number, default: 0 } // sort list
});

exports.Schema = mongoose.model('productTypes', productTypesSchema, 'productTypes');
exports.name = "productTypes";