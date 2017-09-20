"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    async = require('async');

require('mongoose-function')(mongoose);

/**
 * Product Schema
 */
var dynSchema = new Schema({
    name: { type: String, require: true, unique: true, uppercase: true },
    description: { type: String, default: "" },
    _form: {},
    _schema: {},
    combined: Function //Pricing calcul
});

dynSchema.plugin(timestamps);

dynSchema.statics.calcul = function(name, options, callback) {
    console.log(name, options);
    this.findOne({
        name: name
    }, "combined", function(err, dynform) {
        if (err)
            return console.log(err);

        async.waterfall(dynform.combined(options.data, options.priceList), callback);
    });
};

exports.Schema = mongoose.model('dynform', dynSchema, 'DynForm');
exports.name = 'dynform';