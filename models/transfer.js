/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var transferSchema = new Schema({
    date: Date,
    status: {
        type: String,
        enum: ['hired', 'fired', 'updated', 'transfer'],
        default: 'updated'
    },
    department: {
        type: ObjectId,
        ref: 'Department',
        default: null
    },
    jobPosition: {
        type: ObjectId,
        ref: 'JobPosition',
        default: null
    },
    manager: {
        type: ObjectId,
        ref: 'Employees',
        default: null
    },
    weeklyScheduler: {
        type: ObjectId,
        ref: 'weeklyScheduler',
        default: null
    },
    jobType: {
        type: String,
        default: ''
    },
    salary: {
        type: Number,
        default: 0
    },
    info: {
        type: String,
        default: ''
    },
    employee: {
        type: ObjectId,
        ref: 'Employees'
    },
    scheduledPay: {
        type: ObjectId,
        ref: 'scheduledPays',
        default: null
    },
    payrollStructureType: {
        type: ObjectId,
        ref: 'payrollStructureTypes',
        default: null
    },
    transferKey: {
        type: Number
    }
}, {
    collection: 'transfers'
});

exports.Schema = mongoose.model('transfers', transferSchema);
exports.name = "transfers";