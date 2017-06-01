"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesSchema = new mongoose.Schema({
    imageSrc: { type: String, unique: true },
    size: {
        width: Number,
        height: Number
    },
    langs: [{
        _id: false,
        linker: { type: String, default: '' },
        name: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
}, {
    collection: 'Images',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

exports.Schema = mongoose.model('Images', ImagesSchema);
exports.name = 'Images';