"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var channelLinksSchema = new Schema({
    type: { type: String, default: '' }, // product, image, order, customer, ...
    image: { type: ObjectId, ref: 'Images', index: true },
    product: { type: ObjectId, ref: 'product', index: true },
    linkId: { type: String, default: null }, // id for external object
    channel: { type: ObjectId, ref: 'integrations' },
    isActive: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('channelLinks', channelLinksSchema, 'channelLinks');
exports.name = "channelLinks";