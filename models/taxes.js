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

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taxSchema = new mongoose.Schema({
    langs: [{
        _id: false,
        name: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        } // On bill PDF
    }],
    code: {
        type: String,
        require: true,
        unique: true
    },
    isFixValue: {
        type: Boolean,
        default: false
    }, // For ecotaxe it's true
    rate: {
        type: Number,
        default: 0
    }, // On percent
    sequence: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
        default: 'FR'
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sellAccount: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true,
        default: null
    },
    buyAccount: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true,
        default: null
    },
    isOnPaid: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'taxes',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

taxSchema.virtual('name').get(function() {
    if (this.langs && this.langs.length)
        return this.langs[0].name;
});

exports.Schema = mongoose.model('taxes', taxSchema);
exports.name = "taxes";