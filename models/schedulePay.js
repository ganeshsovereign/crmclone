"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */

var scheduledPaySchema = new Schema({
    name: { type: String, default: '' }
}, { collection: 'scheduledPays' });

exports.Schema = mongoose.model('scheduledPay', scheduledPaySchema);
exports.name = 'scheduledPay';