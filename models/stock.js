"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        timestamps = require('mongoose-timestamp');

/**
 * Stock Schema
 */
var stockSchema = new Schema({
    product: {
        id: {type: Schema.Types.ObjectId, ref: "product"},
        ref : String
    },
    description: {type: String, default: ""},
    qty: Number,
    orderId: {
        id: {type: Schema.Types.ObjectId, ref: "order"},
        ref: String
    },
    deleveryId: {
        id: {type: Schema.Types.ObjectId, ref: "delivery"},
        ref: String
    },
    entity: String, //NOT Used
    author: {id: String, name: String}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

stockSchema.plugin(timestamps);

exports.Schema = mongoose.model('stock', stockSchema, 'Stock');
exports.name = 'stock';

