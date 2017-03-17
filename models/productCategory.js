"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var CategorySchema = new Schema({
    name: { type: String, default: 'All' },
    fullName: { type: String, default: 'All' },
    parent: { type: ObjectId, ref: 'poductCategory', default: null },
    child: [{ type: ObjectId, default: null }],
    users: [{ type: ObjectId, ref: 'rh', default: null }],
    createdBy: {
        user: { type: ObjectId, ref: 'rh', default: null },
        date: { type: Date, default: Date.now }
    },

    editedBy: {
        user: { type: ObjectId, ref: 'Users', default: null },
        date: { type: Date, default: Date.now }
    },

    nestingLevel: { type: Number, default: 0 },
    sequence: { type: Number, default: 0 },
    main: { type: Boolean, default: false },
    integrationId: { type: String, default: '' },
    taxesAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },
    debitAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },
    creditAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },
    bankExpensesAccount: { type: ObjectId, ref: 'chartOfAccount', default: null },
    otherIncome: { type: ObjectId, ref: 'chartOfAccount', default: null },
    otherLoss: { type: ObjectId, ref: 'chartOfAccount', default: null }
});

exports.Schema = mongoose.model('productCategory', CategorySchema, 'ProductCategories');
exports.name = "productCategory";