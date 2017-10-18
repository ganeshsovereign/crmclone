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
    Schema = mongoose.Schema;

var ProductAttributesSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    langs: [{
        _id: false,
        name: String
    }],
    //isremoved: { type: Boolean, default: false },
    //isVariant: { type: Boolean, default: false }, //TODO remove
    allowedExtension: [String], //png,pdf...
    step: {
        type: Number,
        default: 1
    }, // steps for number 0.01
    metricUnit: String, //See dict.units
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groupAttributes',
        default: null
    },
    maxCharacters: Number,
    minCharacters: Number,
    maxDate: {
        type: Date
    },
    minDate: {
        type: Date
    },
    maxNumber: Number,
    minNumber: Number,
    sequence: {
        type: Number,
        default: 1
    }, // Order idx
    mode: {
        type: String,
        enum: ['text', 'number', 'metric', 'textarea', 'boolean', 'select', 'date', 'file', 'image', 'min-max']
    },
    isWysiwyg: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    channels: [{
        _id: false,
        channel: {
            type: Schema.Types.ObjectId,
            ref: 'integrations',
            default: null
        },
        integrationId: String
    }]
});

exports.Schema = mongoose.model('productAttributes', ProductAttributesSchema, 'ProductAttributes');
exports.name = "productAttributes";