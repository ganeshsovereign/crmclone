"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var Dict = INCLUDE('dict');

/**
 * Cart Schema
 */

var CartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'product'},
    qty: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    blocked: Boolean,
    entity: String,
    userId: {type: Schema.Types.ObjectId, index: true},
    updatedAt: {type: Date, expires: CONFIG('sessionTimeout'), default: Date.now}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

exports.Schema = mongoose.model('cart', CartSchema, 'cart');
exports.name = 'cart';