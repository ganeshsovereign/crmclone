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
	name: {type: String, require: true, unique: true, uppercase: true},
	description: {type: String, default: ""},
	_form: {},
        _schema:{},
        combined: Function //Pricing calcul
});

dynSchema.plugin(timestamps);

dynSchema.statics.calcul = function (name, options, callback) {
    this.findOne({
            name: name
        }, "combined", function (err, dynform) {

            async.waterfall(dynform.combined(options.data, options.pricelevel || 'BASE'), callback);
        });
};

exports.Schema = mongoose.model('dynform', dynSchema, 'DynForm');
exports.name = 'dynform';

