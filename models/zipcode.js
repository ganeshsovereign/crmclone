"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;


/**
 * Zip Code Schema
 */

var ZipCodeSchema = new Schema({
	code: String,
	insee: String,
	city: String,
	region: Number,
	nameRegion: String,
	department: String,
	nameDepartment: String,
	gps: [Number]
});

exports.Schema = mongoose.model('zipCode', ZipCodeSchema, 'ZipCode');
exports.name = 'zipCode';
