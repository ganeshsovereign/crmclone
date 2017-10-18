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

var channelLinksSchema = new Schema({
    type: {
        type: String,
        default: ''
    }, // product, image, order, customer, ...
    image: {
        type: ObjectId,
        ref: 'Images',
        index: true
    },
    product: {
        type: ObjectId,
        ref: 'product',
        index: true
    },
    linkId: {
        type: String,
        default: null
    }, // id for external object
    channel: {
        type: ObjectId,
        ref: 'integrations'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});



channelLinksSchema.statics.getChannelListFromId = function(options, callback) {
    var ChannelModel = MODEL('integrations').Schema;
    var ObjectId = MODULE('utils').ObjectId;
    var self = this;

    ChannelModel.aggregate([{
            $lookup: {
                from: 'channelLinks',
                localField: '_id',
                foreignField: 'channel',
                as: 'channels'
            }
        }, {
            $project: {
                _id: 1,
                channelName: 1,
                baseUrl: 1,
                channels: {
                    $filter: {
                        input: "$channels",
                        as: "channel",
                        cond: {
                            $eq: ["$$channel." + options.type, ObjectId(options.id)]
                        }
                    }
                }
            }
        }],
        function(err, docs) {
            if (err)
                return callback(err);

            let active = _.sum(docs, function(elem) {
                return elem.channels.length;
            });

            callback(null, {
                active: active,
                data: docs
            });
        });
};

exports.Schema = mongoose.model('channelLinks', channelLinksSchema, 'channelLinks');
exports.name = "channelLinks";