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
    async = require('async');

require('mongoose-function')(mongoose);

/**
 * Product Schema
 */
var dynSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        uppercase: true
    },
    description: {
        type: String,
        default: ""
    },
    _form: {},
    _schema: {},
    combined: Function //Pricing calcul
});

dynSchema.plugin(timestamps);

dynSchema.statics.calcul = function(name, options, callback) {
    console.log(name, options);
    this.findOne({
        name: name
    }, "combined", function(err, dynform) {
        if (err)
            return console.log(err);

        async.waterfall(dynform.combined(options.data, options.priceList), callback);
    });
};

exports.Schema = mongoose.model('dynform', dynSchema, 'DynForm');
exports.name = 'dynform';