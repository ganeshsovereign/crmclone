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
    timestamps = require('mongoose-timestamp'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var chartAccountSchema = new Schema({
    isremoved: {
        type: Boolean,
        default: false
    },
    code: {
        type: Number
    },
    account: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    subAccount: {
        type: ObjectId,
        ref: 'chartOfAccount',
        default: null
    },
    category: {
        type: ObjectId,
        ref: 'accountsCategory',
        default: null
    },
    budgeted: {
        type: Boolean,
        default: false
    },

    payMethod: {
        type: ObjectId,
        ref: 'PaymentMethod',
        default: null
    },

    editedBy: {
        type: ObjectId,
        ref: 'Users'
    },
    createdBy: {
        type: ObjectId,
        ref: 'Users'
    }
}, {
    collection: 'chartOfAccount'
});

chartAccountSchema.plugin(timestamps);

exports.Schema = mongoose.model('chartOfAccount', chartAccountSchema);
exports.name = 'chartOfAccount';