/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp'),
    async = require('async'),
    _ = require('lodash');

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
 * Entity Schema
 */
var entitySchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    cptRef: String, //used for numerotation ex "IV" for : COIV0314-000001
    isEnable: {
        type: Boolean,
        default: true
    },

    imageSrc: {
        type: Schema.Types.ObjectId
        //    ref: 'Images',
    },

    logo: {
        type: String,
        default: "logo.jpg"
    }, // For PDF TODO link to imageSrc

    emails: [{
        _id: false,
        type: {
            type: String,
            default: "pro"
        }, //billing, delivery...
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true
        }
    }],

    address: {
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            ref: 'countries',
            default: 'FR'
        }
    },

    phones: {
        phone: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ''
        },
        mobile: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ''
        },
        fax: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ''
        }
    },

    url: {
        type: String,
        get: getUrl
    }, //website

    iban: {
        bank: {
            type: String,
            uppercase: true,
            trim: true
        }, //Bank name
        id: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        }, //FR76........
        bic: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        }, //BIC / SWIFT
        address: {
            street: {
                type: String,
                default: ''
            },
            city: {
                type: String,
                default: ''
            },
            state: {
                type: String,
                default: ''
            },
            zip: {
                type: String,
                default: ''
            },
            country: {
                type: String,
                ref: 'countries',
                default: 'FR'
            }
        }
    },

    companyInfo: {
        brand: {
            type: String,
            default: ''
        },
        idprof1: String, // SIREN
        idprof2: {
            type: String
        }, // SIRET
        idprof3: String, // NAF
        idprof4: String,
        idprof5: String,
        idprof6: String, // TVA Intra
        forme_juridique_code: String, //forme juridique
        effectif_id: String,
        capital: {
            type: Number,
            default: 0
        },
        fiscal_month_start: Number
    },

    salesPurchases: {
        isActive: {
            type: Boolean,
            default: true
        },
        VATIsUsed: {
            type: Boolean,
            default: true
        },
    },
    currency: {
        type: String,
        ref: 'currency',
        default: ''
    },
    cgv: String,

    langs: [{
        _id: false,
        invoiceFoot: {
            type: String,
            default: ''
        }
    }],

    tva_mode: {
        type: String,
        enum: ["payment", "invoice"],
        default: 'invoice'
    } //-->  definied in taxe

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    collection: 'Entity'
});

entitySchema.plugin(timestamps);

exports.Schema = mongoose.model('entity', entitySchema);
exports.name = 'entity';