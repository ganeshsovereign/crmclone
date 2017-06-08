"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

/**
 * Article Schema
 */
var deliverySchema = new Schema({
    forSales: { type: Boolean, default: true },
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
    tracking: String,
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
    subcontractors: [{
        title: String,
        description: { type: String, default: "" },
        product_type: String,
        product: {
            id: { type: Schema.Types.ObjectId, ref: "Product" },
            name: { type: String },
            label: String,
            unit: String
        },
        societe: {
            id: { type: Schema.Types.ObjectId, ref: 'Societe' },
            name: String
        },
        qty: { type: Number, default: 0 },
        priceSpecific: { type: Boolean, default: false },
        pu_ht: Number,
        tva_tx: Number,
        total_tva: Number,
        total_ht: { type: Number, set: setPrice },
        discount: { type: Number, default: 0 },
        qty_order: { type: Number, default: 0 }
    }],
    history: [{
        date: { type: Date, default: Date.now },
        author: {
            id: String,
            name: String
        },
        mode: String, //email, order, alert, new, ...
        Status: String,
        msg: String
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

deliverySchema.plugin(timestamps);

/**
 * Pre-save hook
 */
deliverySchema.pre('save', function(next) {
    var SeqModel = MODEL('Sequence').Schema;
    var EntityModel = MODEL('entity').Schema;
    var self = this;

    this.total_ht_subcontractors = 0;

    if (this.isNew)
        this.history = [];

    MODULE('utils').sumTotal(this.lines, this.shipping, this.discount, this.supplier, function(err, result) {
        if (err)
            return next(err);

        self.total_ht = result.total_ht;
        self.total_taxes = result.total_taxes;
        self.total_ttc = result.total_ttc;
        self.weight = result.weight;

        var i, length;

        for (i = 0, length = self.subcontractors.length; i < length; i++)
            self.total_ht_subcontractors += self.subcontractors[i].total_ht;

        if (self.isNew && !self.ref)
            return SeqModel.inc("DELIVERY", function(seq) {
                //console.log(seq);
                self.ID = parseInt(seq);
                EntityModel.findOne({
                    _id: self.entity
                }, "cptRef", function(err, entity) {
                    if (err)
                        console.log(err);

                    if (entity && entity.cptRef)
                        self.ref = (self.forSales == true ? "BL" : "RE") + entity.cptRef + seq;
                    else
                        self.ref = (self.forSales == true ? "BL" : "RE") + seq;
                    next();
                });
            });

        self.ref = F.functions.refreshSeq(self.ref, self.date_livraison);
        next();
    });

});

/*var statusList = {};
Dict.dict({ dictName: 'fk_delivery_status', object: true }, function(err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    statusList = doc;
});*/

exports.Status = {
    "_id": "fk_delivery_status",
    "lang": "deliveries",
    "values": {
        "DRAFT": {
            "enable": true,
            "label": "DeliveryStatusDraft",
            "cssClass": "ribbon-color-default label-default",
            "system": true
        },
        "SEND": {
            "enable": true,
            "label": "DeliveryStatusSend",
            "cssClass": "ribbon-color-danger label-danger"
        },
        "BILLED": {
            "enable": true,
            "label": "DeliveryStatusBilled",
            "cssClass": "ribbon-color-primary label-primary",
            "system": true
        },
        "CANCELED": {
            "enable": true,
            "label": "DeliveryStatusCanceled",
            "cssClass": "ribbon-color-danger label-danger",
            "system": true
        },
        "VALIDATED": {
            "enable": true,
            "label": "DeliveryStatusValidated",
            "cssClass": "ribbon-color-info label-info",
            "system": true
        }


    }
};

deliverySchema.virtual('status')
    .get(function() {
        var res_status = {};

        var status = this.Status;
        var statusList = exports.Status;

        if (status && statusList.values[status] && statusList.values[status].label) {
            //console.log(this);
            res_status.id = status;
            res_status.name = i18n.t("deliveries:" + statusList.values[status].label);
            //res_status.name = statusList.values[status].label;
            res_status.css = statusList.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "";
        }
        return res_status;

    });


exports.Schema = mongoose.model('delivery', deliverySchema, 'Delivery');
exports.name = 'delivery';