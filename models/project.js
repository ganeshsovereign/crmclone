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

var projectSchema = new mongoose.Schema({
    projectShortDesc: {
        type: String,
        default: 'emptyProject'
    },
    name: {
        type: String,
        default: 'emptyProject',
        unique: true
    },
    task: [{
        type: ObjectId,
        ref: 'Tasks',
        default: null
    }],
    customer: {
        type: ObjectId,
        ref: 'Customers',
        default: null
    },
    description: String,
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

    StartDate: Date,
    EndDate: Date,
    TargetEndDate: Date,
    sequence: {
        type: Number,
        default: 0
    },
    parent: {
        type: String,
        default: null
    },
    workflow: {
        type: ObjectId,
        ref: 'workflows',
        default: null
    },
    estimated: {
        type: Number,
        default: 0
    },
    logged: {
        type: Number,
        default: 0
    },
    remaining: {
        type: Number,
        default: 0
    },
    progress: {
        type: Number,
        default: 0
    },

    createdBy: {
        user: {
            type: ObjectId,
            ref: 'Users',
            default: null
        },
        date: {
            type: Date,
            default: Date.now
        }
    },

    projecttype: {
        type: String,
        default: ''
    },
    paymentTerms: {
        type: ObjectId,
        ref: 'PaymentTerm',
        default: null
    },
    paymentMethod: {
        type: ObjectId,
        ref: 'PaymentMethod',
        default: null
    },
    notes: {
        type: Array,
        default: []
    },
    attachments: {
        type: Array,
        default: []
    },
    editedBy: {
        user: {
            type: ObjectId,
            ref: 'Users',
            default: null
        },
        date: {
            type: Date
        }
    },

    health: {
        type: Number,
        default: 1
    },
    ID: Number,

    bonus: [{
        employeeId: {
            type: ObjectId,
            ref: 'Employees'
        },

        bonusId: {
            type: ObjectId,
            ref: 'bonusType'
        },

        startDate: {
            type: Date,
            default: null
        },
        startWeek: Number,
        startYear: Number,
        endDate: {
            type: Date,
            default: null
        },
        endWeek: Number,
        endYear: Number
    }],

    budget: {
        _id: false,
        bonus: Array,
        projectTeam: [{
            type: ObjectId,
            ref: 'jobs',
            default: null
        }]
    }
}, {
    collection: 'Project'
});

exports.Schema = mongoose.model('Project', projectSchema);
exports.name = 'Project';