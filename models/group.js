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
    name: { type: String, unique: true, trim: true },
    _id: { type: String, lowercase: true, trim: true, set: MODULE('utils').setLink },
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