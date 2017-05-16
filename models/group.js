"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');


/**
 * UserGroup Schema
 */
var userGroupSchema = new Schema({
    name: { type: String, unique: true, index: true, lowercase: true },
    _id: String,
    _createdAt: { type: Date },
    updatedAt: Date,
    notes: String,
    rights: {
        type: Schema.Types.Mixed
    },
    objectifs: {
        type: Schema.Types.Mixed
    },
    isremoved: Boolean
});

userGroupSchema.plugin(timestamps);

exports.Schema = mongoose.model('group', userGroupSchema, 'UserGroup');
exports.name = 'group';