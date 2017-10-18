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
    _ = require('lodash'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var integrationsSchema = new Schema({
    channelName: {
        type: String,
        default: ''
    },
    entity: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    user: {
        type: ObjectId,
        default: null,
        ref: 'Users'
    },
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    baseUrl: {
        type: String,
        default: ''
    },

    shippingMethod: {
        _id: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            default: ''
        }
    },

    updateShippingStatus: {
        type: Boolean,
        default: false
    },
    updateShippingMethod: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ''
    },
    secret: {
        type: String,
        default: ''
    },
    consumerKey: {
        type: String,
        default: ''
    },
    consumerSecret: {
        type: String,
        default: ''
    },
    priceList: {
        type: ObjectId,
        default: null,
        ref: 'priceList'
    },
    bankAccount: {
        type: ObjectId,
        default: null,
        ref: 'paymentMethod'
    },
    warehouseSettings: {
        warehouse: {
            type: ObjectId,
            default: null,
            ref: 'warehouse'
        },
        location: {
            type: ObjectId,
            default: null,
            ref: 'location'
        }
    },

    connected: {
        type: Boolean,
        default: true
    },
    lastSync: {
        type: Date
    }
});

integrationsSchema.index({
    baseUrl: 1,
    channelName: 1
}, {
    unique: true
});


integrationsSchema.methods.getChannel = function(channels) {
    var self = this;
    var channel = _.filter(channels, function(elem) {
        return elem.channel.toString() == self._id.toString();
    });

    if (channel.length)
        return channel[0];

    return null;
};

exports.Schema = mongoose.model('integrations', integrationsSchema, 'integrations');
exports.name = "integrations";