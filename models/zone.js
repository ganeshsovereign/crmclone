"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var zonesSchema = new Schema({
    name: { type: String, default: '' },
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },
    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

}, { collection: 'zones' });

zonesSchema.plugin(timestamps);

exports.Schema = mongoose.model('zones', zonesSchema);
exports.name = "zones";