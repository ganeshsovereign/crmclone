"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Emailing Schema
 */
var mailingSchema = new Schema({
    title: String,
    description: String,
    transmitter: String,
    object: String,
    message: String,
    author: {
        id: {type: String, ref: 'User'},
        name: String
    },
    createAt: {type: Date, default: Date.now}
});

exports.Schema = mongoose.model('Mailing', mailingSchema);
exports.name = "Mailing";
