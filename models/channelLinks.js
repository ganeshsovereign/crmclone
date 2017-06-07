"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var channelLinksSchema = new Schema({
    type: { type: String, default: '' }, // product, image, order, customer, ...
    image: { type: ObjectId, ref: 'Images', index: true },
    product: { type: ObjectId, ref: 'product', index: true },
    linkId: { type: String, default: null }, // id for external object
    channel: { type: ObjectId, ref: 'integrations' },
    isActive: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now }
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
                        cond: { $eq: ["$$channel." + options.type, ObjectId(options.id)] }
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

            callback(null, { active: active, data: docs });
        });
};

exports.Schema = mongoose.model('channelLinks', channelLinksSchema, 'channelLinks');
exports.name = "channelLinks";