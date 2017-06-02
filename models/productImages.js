"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Schema = mongoose.Schema;

var ProductImagesSchema = new mongoose.Schema({
    image: { type: ObjectId, ref: 'Images', index: true },
    product: { type: ObjectId, ref: 'product', index: true },
    channels: [{
        _id: false,
        id: { type: ObjectId, ref: 'integrations' },
        integrationId: { type: String, default: '' }
    }]
}, {
    collection: 'ProductImages',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

exports.Schema = mongoose.model('productImages', ProductImagesSchema);
exports.name = 'productImages';