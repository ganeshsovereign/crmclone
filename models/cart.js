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

/**
 * Cart Schema
 */

var CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    count: {
        type: Number,
        default: 0
    }, //qty
    discount: {
        type: Number,
        default: 0
    },
    blocked: Boolean, //Price was negociate and blocked
    entity: String,
    userId: {
        type: Schema.Types.ObjectId,
        index: true
    },
    price: Number, //Price unit
    optional: {
        type: Schema.Types.Mixed
    }, // For product with options
    updatedAt: {
        type: Date,
        expires: CONFIG('sessionTimeout'),
        default: Date.now
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

exports.Schema = mongoose.model('cart', CartSchema, 'Cart');
exports.name = 'cart';