"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var warehouseSchema = new Schema({
    name: { type: String, default: '', required: true },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' }
    },

    isOwn: { type: Boolean, default: true },
    main: { type: Boolean, default: false },
    createdBy: { type: ObjectId, ref: 'Users', default: null },
    editedBy: { type: ObjectId, ref: 'Users', default: null },

    account: { type: ObjectId, ref: 'chartOfAccount', default: null }
}, { collection: 'warehouse' });

warehouseSchema.plugin(timestamps);

exports.Schema = mongoose.model('warehouse', warehouseSchema);
exports.name = "warehouse";