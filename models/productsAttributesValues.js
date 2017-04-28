"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttributesValuesSchema = new Schema({
    code: String,
    langs: [{
        _id: false,
        value: String
    }],
    //sort: Number,
    optionId: { type: Schema.Types.ObjectId, ref: 'productAttributes', default: null }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'ProductAttributesValues'
});

AttributesValuesSchema.virtual('value')
    .get(function() {
        return this.langs[0].value;
    });


exports.Schema = mongoose.model('productAttibutesValues', AttributesValuesSchema);
exports.name = "productAttibutesValues";