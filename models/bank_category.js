"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


/**
 * Bank Category Schema
 */
var bankCategorySchema = new Schema({
	name: String,
        description: String
});

exports.Schema = mongoose.model('BankCategory', bankCategorySchema, 'BankCategory');
exports.name = 'BankCategory';
