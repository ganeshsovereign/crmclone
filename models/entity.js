"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		timestamps = require('mongoose-timestamp');


/**
 * Article Schema
 */
var entitySchema = new Schema({
	name: String,
	address: String,
	zip: String,
	town: String,
	country_id: String,
	phone: String,
	email: String,
	url: String, // url website
        eshop:String, // url eshop
	idprof1: String,
	tva_assuj: Boolean,
	capital: Number,
	typent_id: String,
	effectif_id: String,
	forme_juridique_code: String,
	datec: Date,
	logo: {type: String, default: "logo.jpg"},
	_id: String,
	currency: String,
	fiscal_month_start: Number,
	cptRef: String //used for numerotation ex "IV" for : COIV0314-000001
});

exports.Schema = mongoose.model('entity', entitySchema, 'Mysoc');
exports.name = 'entity';
