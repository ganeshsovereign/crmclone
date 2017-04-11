"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var DepartmentSchema = new Schema({
    name: { type: String, default: 'emptyDepartment' },
    parentDepartment: { type: ObjectId, ref: 'Department', default: null },
    departmentManager: { type: ObjectId, ref: 'Employees', default: null },
    isDevelopment: Boolean,
    isSales: Boolean, // commercial
    users: [{ type: ObjectId, ref: 'Users', default: null }], // ????

    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

    nestingLevel: { type: Number, default: 0 },
    sequence: { type: Number, default: 0 },
    ID: Number,

    externalId: { type: String, default: null }
});

exports.Schema = mongoose.model('Department', DepartmentSchema, 'Department');
exports.name = "Department";