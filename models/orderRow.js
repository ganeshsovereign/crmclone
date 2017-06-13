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
    product_type: String,
    order: { type: ObjectId, ref: 'order' },
    warehouse: { type: ObjectId, ref: 'warehouse' },
    type: { type: String, default: 'product' }, //Used for subtotal
    refProductSupplier: String, //Only for an order Supplier
    qty: { type: Number, default: 0 },
    total_taxes: [{
        _id: false,
        taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
        value: { type: Number }
    }],
    description: String,
    private: String, // Private note
    priceSpecific: { type: Boolean, default: false },
    pu_ht: { type: Number, default: 0 }, //unitPrice
    costPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total_ht: { type: Number, default: 0, set: setPrice },
    optional: { type: Schema.Types.Mixed },
    //nominalCode: { type: Number, default: 0 },
    channel: { type: ObjectId, ref: 'integrations' },
    integrationId: String,
    sequence: Number
}, { collection: 'orderRows' });

OrderRowSchema.plugin(timestamps);

exports.Schema = mongoose.model('orderRows', OrderRowSchema);
exports.name = "orderRows";