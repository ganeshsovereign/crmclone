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
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    async = require('async'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var TaxesRowSchema = mongoose.Schema({
    isremoved: {
        type: Boolean
    },
    type: {
        type: String,
        enum: ["VAT"]
    },

    ID: Number,
    ref: String,

    datec: {
        type: Date,
        default: Date.now
    },
    Status: {
        type: String,
        default: "DRAFT"
    },

    journalId: [Schema.Types.ObjectId], // Id transactions for accounting

    total_taxes: [{
        _id: false,
        taxeId: {
            type: Schema.Types.ObjectId,
            ref: 'taxes'
        },
        value: {
            type: Number
        }
    }],
    total: Number,

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

}, {
    collection: 'TaxesRows'
});

TaxesRowSchema.plugin(timestamps);

exports.Schema = mongoose.model('TaxesRows', TaxesRowSchema);
exports.name = "TaxesRows";