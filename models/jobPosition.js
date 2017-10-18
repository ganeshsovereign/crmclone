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
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp');

/**
 * Cart Schema
 */

var jobPositionSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    expectedRecruitment: {
        type: Number,
        default: 0
    },

    interviewForm: {
        id: String,
        name: String
    },

    department: {
        type: ObjectId,
        ref: 'Department'
    },
    description: String,
    requirements: String,
    workflow: {
        type: ObjectId,
        ref: 'workflows',
        default: null
    },
    whoCanRW: {
        type: String,
        enum: ['owner', 'group', 'everyOne'],
        default: 'everyOne'
    },

    groups: {
        owner: {
            type: ObjectId,
            ref: 'Users',
            default: null
        },
        users: [{
            type: ObjectId,
            ref: 'Users',
            default: null
        }],
        group: [{
            type: ObjectId,
            ref: 'Department',
            default: null
        }]
    },

    numberOfEmployees: {
        type: Number,
        default: 0
    },
    totalForecastedEmployees: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: ObjectId,
        ref: 'Users',
        default: null
    },

    editedBy: {
        type: ObjectId,
        ref: 'Users',
        default: null
    },

    externalId: {
        type: String,
        default: null
    },
    ID: Number
}, {
    collection: 'JobPosition'
});

jobPositionSchema.plugin(timestamps);

exports.Schema = mongoose.model('JobPosition', jobPositionSchema);
exports.name = 'JobPosition';