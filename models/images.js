"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesSchema = new mongoose.Schema({
    imageSrc: { type: String, unique: true },
    size: { type: Number },
    langs: [{
        _id: false,
        linker: { type: String, default: '' },
        title: { type: String, default: '' },
        descritpion: { type: String, default: '' }
    }],
}, {
    collection: 'Images',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

exports.Schema = mongoose.model('Images', ImagesSchema);
exports.name = 'Images';