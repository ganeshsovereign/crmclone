"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var setRound3 = MODULE('utils').setRound3;

var productFamilyCoefSchema = new Schema({
    priceLists: { type: ObjectId, ref: 'priceList' },
    family: { type: ObjectId, ref: 'productFamily' },
    coef: { type: Number, min: 0, default: 1, set: setRound3 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null },
    editedBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null }
});

productFamilyCoefSchema.plugin(timestamps);

productFamilyCoefSchema.index({ priceLists: 1, family: 1 }, { unique: true });

productFamilyCoefSchema.pre('save', function(next) {
    var self = this;

    setTimeout2('productFamily:coef_' + this.family.toString(), function() {
        F.functions.PubSub.emit('productFamily:coef', { data: { _id: self.family } });
    }, 500);

    next();
});

exports.Schema = mongoose.model('productFamilyCoef', productFamilyCoefSchema, 'ProductFamilyCoef');
exports.name = "productFamilyCoef";