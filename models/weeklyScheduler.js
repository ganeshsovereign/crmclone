"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */

var weeklySchedulerSchema = new Schema({
    name: { type: String, default: '' },
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
    6: { type: Number, default: 0 },
    7: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 }
}, { collection: 'weeklySchedulers' });

exports.Schema = mongoose.model('weeklyScheduler', weeklySchedulerSchema);
exports.name = 'weeklyScheduler';