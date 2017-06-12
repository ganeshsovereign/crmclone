"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var OrderRowSchema = mongoose.Schema({
    product: { type: ObjectId, ref: 'Product' },
    order: { type: ObjectId, ref: 'order' },
    warehouse: { type: ObjectId, ref: 'warehouse' },
    qty: { type: Number, default: 0 },
    total_taxes: [{
        _id: false,
        taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
        value: { type: Number }
    }],
    description: String,
    unitPrice: { type: Number, default: 0 },
    costPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0, set: setPrice },
    //nominalCode: { type: Number, default: 0 },
    channel: { type: ObjectId, ref: 'integrations' },
    integrationId: String
}, { collection: 'orderRows' });

OrderRowSchema.plugin(timestamps);

exports.Schema = mongoose.model('orderRows', OrderRowSchema);
exports.name = "orderRows";