"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var channelLinksSchema = new Schema({
    product: { type: ObjectId, ref: 'product', default: null },
    linkId: { type: String, default: null },
    channel: { type: ObjectId, ref: 'integrations', default: null },
    priceList: { type: ObjectId, ref: 'priceList', default: null },
    creationDate: { type: Date, default: Date.now }
});

exports.Schema = mongoose.model('channelLinks', channelLinksSchema, 'channelLinks');
exports.name = "channelLinks";