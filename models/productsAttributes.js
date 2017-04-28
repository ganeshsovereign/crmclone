"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductAttributesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        name: String
    }],
    isVariant: { type: Boolean, default: false },
    allowedExtension: [String], //png,pdf...
    dateMin: { type: Date },
    dateMin: { type: Date },
    steps: { type: Number, default: 1 }, // steps for number 0.01
    metricUnit: String, //See dict.units
    group: { type: Schema.Types.ObjectId, ref: 'groupAttributes', default: null },
    maxCharacters: Number,
    minCharacters: Number,
    maxNumber: Number,
    minNumber: Number,
    sort: Number, // Order idx
    mode: { type: String, enum: ['text', 'number', 'metric', 'textarea', 'boolean', 'select', 'date', 'file', 'image'] },
    isWysiwyg: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('productAttributes', ProductAttributesSchema, 'ProductAttributes');
exports.name = "productAttributes";