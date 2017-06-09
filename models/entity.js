"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');


var getUrl = function(url) {
    if (!url)
        return "";

    var data = url.substring(0, 4);
    data = data.toLowerCase();
    if (data == 'http')
        return url;
    else
        return "http://" + url;
};

/**
 * Article Schema
 */
var entitySchema = new Schema({
    _id: String,
    name: String,
    cptRef: String, //used for numerotation ex "IV" for : COIV0314-000001

    imageSrc: {
        type: Schema.Types.ObjectId
            //    ref: 'Images',
    },

    logo: { type: String, default: "logo.jpg" }, // For PDF TODO link to imageSrc

    emails: [{
        _id: false,
        type: { type: String, default: "pro" }, //billing, delivery...
        email: { type: String, lowercase: true, trim: true, index: true }
    }],

    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, ref: 'countries', default: 'FR' }
    },

    phones: {
        phone: { type: String, set: MODULE('utils').setPhone, default: '' },
        mobile: { type: String, set: MODULE('utils').setPhone, default: '' },
        fax: { type: String, set: MODULE('utils').setPhone, default: '' }
    },

    url: { type: String, get: getUrl }, //website

    iban: {
        bank: { type: String, uppercase: true, trim: true },
        id: { type: String, set: MODULE('utils').setNoSpace, uppercase: true, trim: true }, //FR76........
        swift: { type: String, set: MODULE('utils').setNoSpace, uppercase: true, trim: true } //BIC / SWIFT
    },

    companyInfo: {
        brand: { type: String, default: '' },
        idprof1: String, // SIREN
        idprof2: { type: String }, // SIRET
        idprof3: String, // NAF
        idprof4: String,
        idprof5: String,
        idprof6: String, // TVA Intra
        forme_juridique_code: String, //forme juridique
        effectif_id: String,
        capital: { type: Number, default: 0 },
        fiscal_month_start: Number
    },

    salesPurchases: {
        isActive: { type: Boolean, default: true },
        VATIsUsed: { type: Boolean, default: true },
    },

    //typent_id: String,

    datec: Date,
    currency: { type: String, ref: 'currency', default: '' },
    cgv: String

    //tva_mode: { type: String, enum: ["payment", "invoice"], default: 'invoice' }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


exports.Schema = mongoose.model('entity', entitySchema, 'Mysoc');
exports.name = 'entity';