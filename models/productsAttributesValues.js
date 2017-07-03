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
    isremoved: { type: Boolean, default: false },
    sequence: { type: Number, default: 1 },
    optionId: { type: Schema.Types.ObjectId, ref: 'productAttributes', require: true },
    channels: [{
        _id: false,
        channel: { type: Schema.Types.ObjectId, ref: 'integrations' },
        integrationId: String
    }]
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