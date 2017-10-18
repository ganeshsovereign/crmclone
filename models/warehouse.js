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
    ObjectId = mongoose.Schema.Types.ObjectId;

var warehouseSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    address: {
        name: {
            type: String,
            default: ''
        },
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        contact: {
            name: {
                type: String,
                default: ''
            },
            phone: {
                type: String,
                set: MODULE('utils').setPhone,
                default: ''
            },
            mobile: {
                type: String,
                set: MODULE('utils').setPhone,
                default: ''
            },
            fax: {
                type: String,
                set: MODULE('utils').setPhone,
                default: ''
            },
            email: {
                type: String,
                lowercase: true,
                trim: true,
                index: true
            }
        }
    },

    isOwn: {
        type: Boolean,
        default: true
    },
    main: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: ObjectId,
        ref: 'Users',
        default: null
    },
    editedBy: {
        type: ObjectId,
        ref: 'Users',
        default: null
    },

    account: {
        type: ObjectId,
        ref: 'chartOfAccount',
        default: null
    }
}, {
    collection: 'warehouse'
});

warehouseSchema.plugin(timestamps);

warehouseSchema.pre('save', function(next) {
    var self = this;

    if (!self.address.name)
        self.address.name = self.name;

    next();
});

exports.Schema = mongoose.model('warehouse', warehouseSchema);
exports.name = "warehouse";