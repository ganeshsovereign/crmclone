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
    timestamps = require('mongoose-timestamp');

/**
 * Stock Schema
 */
var stockSchema = new Schema({
    product: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "product"
        },
        ref: String
    },
    description: {
        type: String,
        default: ""
    },
    qty: Number,
    orderId: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "order"
        },
        ref: String
    },
    deleveryId: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "delivery"
        },
        ref: String
    },
    entity: String, //NOT Used
    author: {
        id: String,
        name: String
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

stockSchema.plugin(timestamps);

exports.Schema = mongoose.model('stock', stockSchema, 'Stock');
exports.name = 'stock';