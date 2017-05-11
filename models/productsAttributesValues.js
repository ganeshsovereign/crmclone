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
    sequence: Number,
    optionId: { type: Schema.Types.ObjectId, ref: 'productAttributes', require: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'ProductAttributesValues'
});

AttributesValuesSchema.virtual('value')
    .get(function() {
        if (this.langs)
            return this.langs[0].value;
    });


exports.Schema = mongoose.model('productAttibutesValues', AttributesValuesSchema);
exports.name = "productAttibutesValues";