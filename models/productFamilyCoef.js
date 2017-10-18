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
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var setRound3 = MODULE('utils').setRound3;

var productFamilyCoefSchema = new Schema({
    priceLists: {
        type: ObjectId,
        ref: 'priceList'
    },
    family: {
        type: ObjectId,
        ref: 'productFamily'
    },
    coef: {
        type: Number,
        min: 0,
        default: 1,
        set: setRound3
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'rh',
        default: null
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: 'rh',
        default: null
    }
});

productFamilyCoefSchema.plugin(timestamps);

productFamilyCoefSchema.index({
    priceLists: 1,
    family: 1
}, {
    unique: true
});

exports.Schema = mongoose.model('productFamilyCoef', productFamilyCoefSchema, 'ProductFamilyCoef');
exports.name = "productFamilyCoef";