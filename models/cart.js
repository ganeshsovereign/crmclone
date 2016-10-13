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
    count: {type: Number, default: 0},//qty
    discount: {type: Number, default: 0},
    blocked: Boolean, //Price was negociate and blocked
    entity: String,
    userId: {type: Schema.Types.ObjectId, index: true},
    price : Number, //Price unit
    options : {type: Schema.Types.Mixed}, // For product with options
    updatedAt: {type: Date, expires: CONFIG('sessionTimeout'), default: Date.now}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

exports.Schema = mongoose.model('cart', CartSchema, 'Cart');
exports.name = 'cart';