"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var options = { collection: 'GoodsNote', discriminatorKey: '_type' };

const goodsNoteSchema = new Schema({
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },

    reference: { type: String, default: '' },
    boxes: { type: Number, default: 1 },
    shippingMethod: { type: ObjectId, ref: 'shippingMethod', default: null },
    shippingCost: { type: Number, default: 0 },
    weight: { type: Number, default: 1.00 },
    releaseDate: Date,
    date: { type: Date, default: Date.now },
    createdBy: {
        user: { type: ObjectId, ref: 'Users', default: null },
        date: { type: Date, default: Date.now }
    },

    description: { type: String, default: '' },

    editedBy: {
        user: { type: ObjectId, ref: 'Users', default: null },
        date: { type: Date, default: Date.now }
    },

    order: { type: ObjectId, ref: 'Order', default: null },

    attachments: { type: Array, default: [] },
    orderRows: [{
        _id: false,
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'Product', default: null },
        locationsDeliver: [{ type: ObjectId, ref: 'location', default: null }],
        cost: { type: Number, default: 0 },
        quantity: Number
    }],

    channel: { type: ObjectId, ref: 'integrations', default: null },
    integrationId: String,
    sequence: Number,
    name: String
}, options);


goodsNoteSchema.plugin(timestamps);

const GoodsNote = mongoose.model('GoodsNote', goodsNoteSchema);

var goodsOutNoteSchema = new Schema({
    status: {
        shipped: Boolean,
        picked: Boolean,
        packed: Boolean,
        printed: Boolean,
        shippedOn: Date,
        pickedOn: Date,
        packedOn: Date,
        printedOn: Date,
        pickedById: { type: ObjectId, ref: 'Users', default: null },
        packedById: { type: ObjectId, ref: 'Users', default: null },
        shippedById: { type: ObjectId, ref: 'Users', default: null },
        printedById: { type: ObjectId, ref: 'Users', default: null },
    },

    archived: { type: Boolean, default: false }
});

var goodsInNoteSchema = new Schema({
    status: {
        received: Boolean,
        receivedOn: Date,
        receivedById: { type: ObjectId, ref: 'Users', default: null }
    },

    description: { type: String },

    orderRows: [{
        _id: false,
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'Product', default: null },
        cost: { type: Number, default: 0 },
        locationsReceived: [{
            location: { type: ObjectId, ref: 'location', default: null },
            quantity: Number
        }],

        quantity: Number
    }]
});

var stockCorrectionSchema = new Schema({
    status: {
        received: Boolean,
        receivedOn: Date,
        receivedById: { type: ObjectId, ref: 'Users', default: null }
    },

    description: { type: String },

    orderRows: [{
        _id: false,
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'Product', default: null },
        cost: { type: Number, default: 0 },
        locationsReceived: [{
            location: { type: ObjectId, ref: 'location', default: null },
            quantity: Number
        }],

        quantity: Number
    }]
});

var stockReturnSchema = new Schema({
    status: {
        received: Boolean,
        receivedOn: Date,
        receivedById: { type: ObjectId, ref: 'Users', default: null }
    },

    description: { type: String },

    journalEntrySources: [{ type: String, default: '' }],

    orderRows: [{
        _id: false,
        goodsOutNote: { type: ObjectId, ref: 'GoodsOutNote', default: null },
        goodsInNote: { type: ObjectId, ref: 'GoodsInNote', default: null },
        product: { type: ObjectId, ref: 'Product', default: null },
        cost: { type: Number, default: 0 },
        quantity: Number,
        warehouse: { type: ObjectId, ref: 'warehouse', default: null }
    }]
});

var stockTransactionsSchema = new Schema({
    warehouseTo: { type: ObjectId, ref: 'warehouse', default: null },
    status: {
        shipped: Boolean,
        received: Boolean,
        packed: Boolean,
        printed: Boolean,
        shippedOn: Date,
        receivedOn: Date,
        packedOn: Date,
        printedOn: Date,
        receivedById: { type: ObjectId, ref: 'Users', default: null },
        packedById: { type: ObjectId, ref: 'Users', default: null },
        shippedById: { type: ObjectId, ref: 'Users', default: null },
        printedById: { type: ObjectId, ref: 'Users', default: null }
    },

    orderRows: [{
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'Product', default: null },
        locationsDeliver: [{ type: ObjectId, ref: 'location', default: null }],
        batchesDeliver: [{
            goodsNote: { type: ObjectId, ref: 'goodsInNotes', default: null },
            quantity: Number,
            cost: Number
        }],

        locationsReceived: [{
            location: { type: ObjectId, ref: 'location', default: null },
            quantity: Number
        }],

        cost: { type: Number, default: 0 },
        quantity: Number
    }]

});

function setName(next) {
    var order = this;
    var db = order.db.db;

    db.collection('settings').findOneAndUpdate({
        dbName: db.databaseName,
        name: 'goodsOutNote',
        order: order.name
    }, {
        $inc: { seq: 1 }
    }, {
        returnOriginal: false,
        upsert: true
    }, function(err, rate) {
        if (err) {
            return next(err);
        }

        order.name += '*' + rate.value.seq;

        next();
    });
}

function setNameTransfer(next) {
    var transaction = this;
    var db = transaction.db.db;
    var prefix = 'TX';

    db.collection('settings').findOneAndUpdate({
        dbName: db.databaseName,
        name: prefix
    }, {
        $inc: { seq: 1 }
    }, {
        returnOriginal: false,
        upsert: true
    }, function(err, rate) {
        if (err) {
            return next(err);
        }

        transaction.name = prefix + '-' + rate.value.seq;

        next();
    });
}

function setNameReturns(next) {
    var transaction = this;
    var db = transaction.db.db;
    var prefix = 'RT';

    db.collection('settings').findOneAndUpdate({
        dbName: db.databaseName,
        name: prefix
    }, {
        $inc: { seq: 1 }
    }, {
        returnOriginal: false,
        upsert: true
    }, function(err, rate) {
        if (err) {
            return next(err);
        }

        transaction.name = prefix + '-' + rate.value.seq;

        next();
    });
}

function setNamePurchase(next) {
    var order = this;
    var db = order.db.db;

    db.collection('settings').findOneAndUpdate({
        dbName: db.databaseName,
        name: 'goodsInNote',
        order: order.name
    }, {
        $inc: { seq: 1 }
    }, {
        returnOriginal: false,
        upsert: true
    }, function(err, rate) {
        if (err) {
            return next(err);
        }

        order.name += '*' + rate.value.seq;

        next();
    });
}

goodsOutNoteSchema.pre('save', setName);
stockTransactionsSchema.pre('save', setNameTransfer);
goodsInNoteSchema.pre('save', setNamePurchase);
stockReturnSchema.pre('save', setNameReturns);

const goodsOutNote = GoodsNote.discriminator('GoodsOutNote', goodsOutNoteSchema);
const stockTransactions = GoodsNote.discriminator('stockTransactions', stockTransactionsSchema);
const stockReturns = GoodsNote.discriminator('stockReturns', stockReturnSchema);
const stockCorrection = GoodsNote.discriminator('stockCorrections', stockCorrectionSchema);
const goodsInNote = GoodsNote.discriminator('GoodsInNote', goodsInNoteSchema);

exports.Schema = {
    GoodsOutNote: goodsOutNote,
    GoodsInNote: goodsInNote,
    stockCorrections: stockCorrection,
    stockTransactions: stockTransactions,
    stockReturns: stockReturns
};
exports.name = "GoodsNote";