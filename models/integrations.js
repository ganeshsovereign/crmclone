"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var integrationsSchema = new Schema({
    channelName: { type: String, default: '' },
    dbName: { type: String, default: '' },
    type: { type: String, default: '' },
    user: { type: ObjectId, default: null, ref: 'Users' },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    baseUrl: { type: String, default: '' },

    shippingMethod: {
        _id: { type: Number, default: 0 },
        name: { type: String, default: '' }
    },

    updateShippingStatus: { type: Boolean, default: false },
    updateShippingMethod: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    token: { type: String, default: '' },
    secret: { type: String, default: '' },
    consumerKey: { type: String, default: '' },
    consumerSecret: { type: String, default: '' },
    priceList: { type: ObjectId, default: null, ref: 'priceList' },
    bankAccount: { type: ObjectId, default: null, ref: 'paymentMethod' },
    warehouseSettings: {
        warehouse: { type: ObjectId, default: null, ref: 'warehouse' },
        location: { type: ObjectId, default: null, ref: 'location' }
    },

    connected: { type: Boolean, default: true },
    lastSync: { type: Date }
});

integrationsSchema.index({ baseUrl: 1, channelName: 1 }, { unique: true });

exports.Schema = mongoose.model('integrations', integrationsSchema, 'integrations');
exports.name = "integrations";