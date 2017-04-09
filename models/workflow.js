"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */

var workflowSchema = new Schema({
    wId: String,
    wName: String,
    status: String,
    name: String,
    sequence: Number,
    visible: { type: Boolean, default: true }
}, { collection: 'workflows' });

exports.Schema = mongoose.model('workflows', workflowSchema);
exports.name = 'workflows';