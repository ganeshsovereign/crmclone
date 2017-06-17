"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var locationsSchema = new Schema({
    name: { type: String, default: '' },
    groupingA: { type: String, default: '' },
    groupingB: { type: String, default: '' },
    groupingC: { type: String, default: '' },
    groupingD: { type: String, default: '' },
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },
    zone: { type: ObjectId, ref: 'zones', default: null },
    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

}, { collection: 'locations' });

locationsSchema.plugin(timestamps);

locationsSchema.statics.createLocation = function(body, uId, callback) {
    var item;
    var self = this;

    body.createdBy = uId;
    body.editedBy = uId;

    item = new self(body);

    item.save(function(err, result) {
        if (err)
            return callback(err);

        self.findById(result._id).populate('zone').exec(function(err, result) {
            if (err)
                return callback(err);

            callback(null, result);
        });
    });
};

exports.Schema = mongoose.model('location', locationsSchema);
exports.name = "location";