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

var productTypesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        name: String,
        label: {
            type: String,
            default: ''
        } // On select in product
    }],
    //options: [{ type: Schema.Types.ObjectId, ref: 'productOptions' }], //variants
    //attributes: [{ type: Schema.Types.ObjectId, ref: 'productAttributes' }],
    inventory: {
        type: Boolean,
        default: true
    },
    isService: {
        type: Boolean,
        default: false
    }, //Product or Service

    isBundle: {
        type: Boolean,
        default: false
    }, //Pack promo
    isPackaging: {
        type: Boolean,
        default: false
    }, //Packaging of a product
    isDynamic: {
        type: Boolean,
        default: false
    }, //Dynamic forms
    dynamic: {
        name: {
            type: String,
            default: ""
        }, //Schema name for v0.1
        forms: String, //Schema for v1.0
        url: String // Schema for v1.0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sequence: {
        type: Number,
        default: 0
    } // sort list
});

exports.Schema = mongoose.model('productTypes', productTypesSchema, 'productTypes');
exports.name = "productTypes";