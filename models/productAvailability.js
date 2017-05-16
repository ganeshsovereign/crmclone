"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var AvailabilitySchema = new Schema({
    product: { type: ObjectId, ref: 'Product', default: null },
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },
    location: { type: ObjectId, ref: 'location', default: null },
    goodsInNote: { type: ObjectId, ref: 'goodsInNotes', default: null },
    cost: { type: Number, default: 0 },
    onHand: { type: Number, default: 0 },
    goodsOutNotes: [{
        goodsNoteId: { type: ObjectId, ref: 'goodsOutNotes', default: null },
        quantity: { type: Number, default: 0 }
    }],

    isJob: { type: Boolean, default: false },
    orderRows: [{
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        quantity: { type: Number, default: 0 }
    }],

    creationDate: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false }
}, { collection: 'productsAvailability' });

AvailabilitySchema.plugin(timestamps);

exports.Schema = mongoose.model('productsAvailability', AvailabilitySchema);
exports.name = "productsAvailability";