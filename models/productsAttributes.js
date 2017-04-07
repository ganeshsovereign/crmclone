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
        lang: { type: String, default: "fr" },
        name: String
    }],
    allowedExtension: [String], //png,pdf...
    dateMin: {type: Date},
    dateMin: {type: Date},
    steps: { type: Number, default: 1 },
    metricUnit: String, //See dict.units
    group: { type: Schema.Types.ObjectId, ref: 'groupAttribues', default: null },
    maxCharacters: Number,
    minCharacters: Number,
    maxNumber: Number,
    minNumber: Number,
    sort: Number,
    mode: { type: String, enum: ['text', 'number', 'metric', 'textarea', 'boolean', 'simpleselect', 'multiselect', 'date', 'file', 'image'] },
    wysiwyg: Boolean,
    createdAt: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('productAttributes', ProductAttributesSchema, 'ProductAttributes');
exports.name = "productAttributes";