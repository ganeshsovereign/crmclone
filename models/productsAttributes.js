"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductAttributesSchema = new Schema({
    code: { type: String, unique: true },
    langs: [{
        _id: false,
        name: String
    }],
    //isVariant: { type: Boolean, default: false }, //TODO remove
    allowedExtension: [String], //png,pdf...
    step: { type: Number, default: 1 }, // steps for number 0.01
    metricUnit: String, //See dict.units
    group: { type: Schema.Types.ObjectId, ref: 'groupAttributes', default: null },
    maxCharacters: Number,
    minCharacters: Number,
    maxDate: { type: Date },
    minDate: { type: Date },
    maxNumber: Number,
    minNumber: Number,
    sequence: { type: Number, default: 1 }, // Order idx
    mode: { type: String, enum: ['text', 'number', 'metric', 'textarea', 'boolean', 'select', 'date', 'file', 'image'] },
    isWysiwyg: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    channels: [{
        _id: false,
        channel: { type: Schema.Types.ObjectId, ref: 'integrations', default: null },
        integrationId: String
    }]
});

exports.Schema = mongoose.model('productAttributes', ProductAttributesSchema, 'ProductAttributes');
exports.name = "productAttributes";