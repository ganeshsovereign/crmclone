"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp');

/**
 * Cart Schema
 */

var jobPositionSchema = new Schema({
    name: { type: String, default: '' },
    expectedRecruitment: { type: Number, default: 0 },

    interviewForm: {
        id: String,
        name: String
    },

    department: { type: ObjectId, ref: 'Department' },
    description: String,
    requirements: String,
    workflow: { type: ObjectId, ref: 'workflows', default: null },
    whoCanRW: { type: String, enum: ['owner', 'group', 'everyOne'], default: 'everyOne' },

    groups: {
        owner: { type: ObjectId, ref: 'Users', default: null },
        users: [{ type: ObjectId, ref: 'Users', default: null }],
        group: [{ type: ObjectId, ref: 'Department', default: null }]
    },

    numberOfEmployees: { type: Number, default: 0 },
    totalForecastedEmployees: { type: Number, default: 0 },

    createdBy: { type: ObjectId, ref: 'Users', default: null },

    editedBy: { type: ObjectId, ref: 'Users', default: null },

    externalId: { type: String, default: null },
    ID: Number
}, { collection: 'JobPosition' });

jobPositionSchema.plugin(timestamps);

exports.Schema = mongoose.model('JobPosition', jobPositionSchema);
exports.name = 'JobPosition';