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
        channel: { type: Schema.Types.ObjectId, ref: 'integrations' },
        integrationId: String
    }],
}, {
    collection: 'ProductImages',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

exports.Schema = mongoose.model('productImages', ProductImagesSchema);
exports.name = 'productImages';