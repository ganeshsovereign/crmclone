"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var options = {
    collection: 'GoodsNote',
    discriminatorKey: '_type',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
};

const goodsNoteSchema = new Schema({
    isremoved: Boolean,
    ref: { type: String, index: true },
    ID: { type: Number, unique: true },

    type: { type: String, default: 'DELIVERY_STANDARD' },
    currency: {
        _id: { type: String, ref: 'currency', default: '' },
        rate: { type: Number, default: 1 } // changed default to '0' for catching errors
    },
    Status: { type: String, default: 'DRAFT' },
    cond_reglement_code: {
        type: String,
        default: 'RECEP'
    },
    mode_reglement_code: {
        type: String,
        default: 'TIP'
    },
    //bank_reglement: {type: String},
    //availability_code: {type: String, default: 'AV_NOW'},
    supplier: { type: Schema.Types.ObjectId, ref: 'Customers' },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Customers' }],
    ref_client: { type: String, default: "" },
    order: { type: ObjectId, ref: 'order' },
    datec: {
        type: Date,
        default: Date.now,
        set: setDate
    },
    date_livraison: {
        type: Date,
        set: setDate
    },
    dater: { type: Date }, // Date de reception
    dateOf: { type: Date }, // date de debut de prestation
    dateTo: { type: Date }, // date de fin de prestation
    notes: [{
        title: String,
        note: String,
        public: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    }],
    discount: {
        escompte: {
            percent: { type: Number, default: 0 },
            value: { type: Number, default: 0, set: setPrice } // total remise globale
        },
        discount: {
            percent: { type: Number, default: 0 }, //discount
            value: { type: Number, default: 0, set: setPrice } // total remise globale
        }
    },
    total_ht: {
        type: Number,
        default: 0,
        set: setPrice
    },
    total_taxes: [{
        _id: false,
        taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
        value: { type: Number, default: 0 }
    }],
    total_ttc: {
        type: Number,
        default: 0,
        set: setPrice
    },
    total_ht_subcontractors: { type: Number, default: 0 },
    delivery_mode: { type: String, default: "Comptoir" },
    transport: String,
    tracking: String, //Tracking number
    shipping: {
        total_ht: {
            type: Number,
            default: 0,
            set: setPrice
        },
        total_taxes: [{
            _id: false,
            taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
            value: { type: Number, default: 0 }
        }],
        /*total_ttc: {
            type: Number,
            default: 0
        }*/
    },
    createdBy: { type: ObjectId, ref: 'Users' },
    editedBy: { type: ObjectId, ref: 'Users' },
    salesPerson: { type: ObjectId, ref: 'Employees' }, //commercial_id
    salesTeam: { type: ObjectId, ref: 'Department' },
    entity: String,
    optional: Schema.Types.Mixed,
    billing: { type: Schema.Types.ObjectId, ref: 'Customers' },
    //costList: { type: ObjectId, ref: 'priceList', default: null }, //Not used
    //priceList: { type: ObjectId, ref: 'priceList', default: null },
    address: {
        name: { type: String, default: '' },
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, ref: 'countries', default: 'FR' }
    },
    shippingAddress: {
        _id: { type: ObjectId, default: null },
        name: { type: String, default: '' },
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, ref: 'countries', default: 'FR' }
    },
    weight: { type: Number, default: 0 }, // Poids total
    lines: [{
        _id: false,
        //pu: {type: Number, default: 0},
        type: { type: String, default: 'product' }, //Used for subtotal
        refProductSupplier: String, //Only for an order Supplier
        qty: { type: Number, default: 0 },
        priceSpecific: { type: Boolean, default: false },
        pu_ht: {
            type: Number,
            default: 0
        },
        description: String,
        private: String, // Private note
        product_type: String,
        product: { type: Schema.Types.ObjectId, ref: "product" },
        total_taxes: [{
            _id: false,
            taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
            value: { type: Number }
        }],
        discount: { type: Number, default: 0 },
        total_ht: { type: Number, default: 0, set: setPrice },
        //weight: { type: Number, default: 0 },
        optional: { type: Schema.Types.Mixed }
    }],
    /*subcontractors: [{
        title: String,
        description: { type: String, default: "" },
        type: { type: String, default: 'product' }, //Used for subtotal
        refProductSupplier: String, //Only for an order Supplier

        product: { type: Schema.Types.ObjectId, ref: "product" },
        supplier: { type: Schema.Types.ObjectId, ref: 'Customers', require: true },
        qty: { type: Number, default: 0 },
        priceSpecific: { type: Boolean, default: false },
        pu_ht: {
            type: Number,
            default: 0
        },
        total_taxes: [{
            _id: false,
            taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
            value: { type: Number }
        }],
        total_ht: { type: Number, set: setPrice },
        discount: { type: Number, default: 0 }
    }],*/
    history: [{
        date: { type: Date, default: Date.now },
        author: {
            id: String,
            name: String
        },
        mode: String, //email, order, alert, new, ...
        Status: String,
        msg: String
    }],







    warehouse: { type: ObjectId, ref: 'warehouse', default: null },

    boxes: { type: Number, default: 1 },
    shippingMethod: { type: ObjectId, ref: 'shippingMethod', default: null },
    shippingCost: { type: Number, default: 0 },

    attachments: { type: Array, default: [] },
    orderRows: [{
        _id: false,
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'product', default: null },
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
        isPrinted: { type: Date, default: null }, //Imprime
        isPicked: { type: Date, default: null }, //Prepare
        isPacked: { type: Date, default: null }, //Emballe
        isShipped: { type: Date, default: null }, //Expedier

        pickedById: { type: ObjectId, ref: 'Users', default: null },
        packedById: { type: ObjectId, ref: 'Users', default: null },
        shippedById: { type: ObjectId, ref: 'Users', default: null },
        printedById: { type: ObjectId, ref: 'Users', default: null }
    },

    archived: { type: Boolean, default: false }
});

var goodsInNoteSchema = new Schema({
    status: {
        isReceived: { type: Date, default: null },
        receivedById: { type: ObjectId, ref: 'Users', default: null }
    },

    description: { type: String },

    orderRows: [{
        _id: false,
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        product: { type: ObjectId, ref: 'product', default: null },
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
        isReceived: { type: Date, default: null },
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
        isReceived: { type: Date, default: null },
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
        isPrinted: { type: Date, default: null }, //Imprime
        isPicked: { type: Date, default: null }, //Prepare
        isPacked: { type: Date, default: null }, //Emballe
        isShipped: { type: Date, default: null }, //Expedier

        pickedById: { type: ObjectId, ref: 'Users', default: null },
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