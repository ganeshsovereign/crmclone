"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var locationsSchema = new Schema({
    name: { type: String, default: '' },
    groupingA: { type: String, default: '' },
    groupingB: { type: String, default: '' },
    groupingC: { type: String, default: '' },
    groupingD: { type: String, default: '' },
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },
    zone: { type: ObjectId, ref: 'zone', default: null },
    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

}, { collection: 'locations' });

locationsSchema.plugin(timestamps);

exports.Schema = mongoose.model('location', locationsSchema);
exports.name = "location";