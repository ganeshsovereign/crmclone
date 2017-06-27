"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupCategoriesSchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    channels: [{
        _id: false,
        channel: { type: Schema.Types.ObjectId, ref: 'integrations', default: null },
        integrationId: String
    }]
}, { collection: 'groupCategory' });

exports.Schema = mongoose.model('groupCategory', GroupCategoriesSchema);
exports.name = "groupCategory";