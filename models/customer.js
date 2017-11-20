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
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp'),
    version = require('mongoose-version'),
    async = require('async'),
    moment = require('moment'),
    //		mongoosastic = require('mongoosastic'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

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

var addressSchema = new Schema({
    //_id needed for shipping
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
    },
    name: {
        type: String,
        trim: true,
        uppercase: true,
        default: ''
    },
    contact: {
        name: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ""
        },
        mobile: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ""
        },
        fax: {
            type: String,
            set: MODULE('utils').setPhone,
            default: ""
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true
        }
    },
    Status: {
        type: String,
        default: 'ENABLE'
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

var statusAddressList = {};
Dict.dict({
    dictName: 'fk_user_status',
    object: true
}, function(err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    statusAddressList = doc;
});


addressSchema.virtual('status')
    .get(function() {
        var res_status = {};

        var status = this.Status;

        if (status && statusAddressList.values[status] && statusAddressList.values[status].label) {
            //console.log(this);
            res_status.id = status;
            res_status.name = statusAddressList.values[status].label;
            res_status.css = statusAddressList.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "label-default";
        }
        return res_status;

    });

/**
 * @module Customer
 * @class Customer
 *
 * @property {String} type - Type of __Customer__, proper values are: 'Person', 'Company'
 *
 * @property {Boolean} isOwn - Determine is a ___Person___ or ___Company___ our own. Actually now is not needed
 *
 * @property {Object} name
 * @property {String} name.first - First `name` of Customer
 * @property {String} name.last - Last `name` of Customer
 *
 * @property {Date} dateBirth - Date of Birth, expect ISO string, example `'1998-07-28 17:12:26'`
 *
 * @property {String} imageSrc - `base64` representation of avatar
 *
 * @property {String} email - Email
 *
 * @property {String} company - if type of _Customer_=__'Person'__ should determine __Company__ which from __Person__, can be empty
 *
 * @property {Object} address - `Address` of _Customer_
 * @property {String} address.street - Address `street` of _Customer_
 * @property {String} address.city - Address `city` of _Customer_
 * @property {String} address.state - Address `state` of _Customer_
 * @property {String} address.zip - Address `zip` of _Customer_
 * @property {String} address.country - Address `country` of _Customer_
 *
 * @property {String} website - Website
 *
 * @property {String} jobPosition
 *
 * @property {String} skype - Skype login
 *
 * @property {Object} phones - `Phones` of _Customer_
 * @property {String} phones.mobile - `mobile` of _Customer_
 * @property {String} phones.phone - `phone` of _Customer_
 * @property {String} phones.fax - `fax` of _Customer_
 *
 * @property {Object} salesPurchases - Sales & Purchases options
 * @property {Boolean} salesPurchases.isCustomer
 * @property {Boolean} salesPurchases.isSupplier
 * @property {String} salesPurchases.salesPerson
 * @property {String} salesPurchases.implementedBy
 * @property {String} salesPurchases.reference
 * @property {String} salesPurchases.language
 *
 * @property {Object} social - Social lincs of  _Customer_
 * @property {String} social.FB
 * @property {String} social.LI
 *
 * @property {String} whoCanRW
 *
 * @property {Object} groups - `Groups` of _Customer_
 * @property {String} groups.users
 * @property {String} groups.group
 *
 * @property {Object} editedBy
 * @property {String} editedBy.users - Edited by user
 * @property {Date} editedBy.date - Edited on date
 *
 * @property {Object} companyInfo - Information about company
 * @property {String} companyInfo.size
 * @property {String} companyInfo.industry
 *
 * @property {Object} createdBy
 * @property {String} createdBy.users - Created by user
 * @property {Date} createdBy.date - Creation date
 *
 * @property {Array} history
 *
 * @property {Array} attachments - Some files
 *
 * @property {String} internalNotes - Some notes
 *
 * @property {String} notes - Some notes
 *
 * @property {String} title
 *
 * @property {Array} contacts - Contacts
 *
 * @property {String} timezone - Default time zone 'UTC'
 *
 * @property {String} department - Department of _Customer_
 *
 * @property {String} company - Company of _Customer_
 */


var customerSchema = new Schema({
    isremoved: Boolean,
    type: {
        type: String,
        default: 'Company',
        enum: ['Person', 'Company']
    },
    isOwn: {
        type: Boolean,
        default: false
    },
    isHidden: {
        type: Boolean,
        default: false
    },
    name: {
        civilite: String, // DICT civilite
        first: {
            type: String,
            tirm: true,
            default: ''
        },
        last: {
            type: String,
            trim: true,
            uppercase: true,
            default: 'DEMO'
        } // Company name
    },
    dateBirth: Date,
    imageSrc: {
        type: Schema.Types.ObjectId
        //    ref: 'Images',
    },
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
    newsletter: {
        type: Boolean,
        default: false
    }, //newsletter
    sendEmailing: {
        type: Boolean,
        default: true
    }, //sendEmailing
    sendSMS: {
        type: Boolean,
        default: true
    }, //sendSMS
    company: {
        type: ObjectId,
        ref: 'Customers',
        default: null
    },
    department: {
        type: ObjectId,
        ref: 'Department',
        default: null
    },
    timezone: {
        type: String,
        default: 'UTC'
    },
    address: addressSchema,
    shippingAddress: [addressSchema], // list of deliveries address
    deliveryAddressId: {
        type: Schema.Types.ObjectId
    }, // id of default address in addresses
    url: {
        type: String,
        get: getUrl
    }, //website
    jobPosition: {
        type: String,
        default: ''
    },
    skype: {
        type: String,
        default: ''
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
    //contacts: { type: Array, default: [] },
    internalNotes: {
        new: String,
        old: String,
        author: {
            type: ObjectId,
            ref: 'Users'
        },
        datec: {
            type: Date,
            default: Date.now
        }
    },
    title: {
        type: String,
        default: ''
    },
    salesPurchases: {
        isGeneric: {
            type: Boolean,
            default: false
        }, // Generalist account
        isProspect: {
            type: Boolean,
            default: false
        },
        isCustomer: {
            type: Boolean,
            default: true
        },
        isSupplier: {
            type: Boolean,
            default: false
        },
        isSubcontractor: {
            type: Boolean,
            default: false
        }, //fournisseur
        salesPerson: {
            type: ObjectId,
            ref: 'Employees'
        }, //commercial_id
        salesTeam: {
            type: ObjectId,
            ref: 'Department'
        },
        implementedBy: {
            type: ObjectId,
            ref: 'Customers'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        ref: {
            type: String,
            trim: true,
            uppercase: true,
            sparse: true
        }, //code_client or code_fournisseur
        language: {
            type: Number,
            default: 0
        },
        receiveMessages: {
            type: Number,
            default: 0
        },
        cptBilling: {
            type: Schema.Types.ObjectId,
            ref: 'Customers'
        },
        priceList: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: 'priceList',
            default: "58c962f7d3e1802b17fe95a4"
        }, //price_level
        //prospectlevel: { type: String, default: 'PL_NONE' },
        cond_reglement: {
            type: String,
            default: 'RECEP'
        },
        mode_reglement: {
            type: String,
            default: 'CHQ'
        },
        bank_reglement: {
            type: ObjectId,
            ref: 'bank'
        },
        VATIsUsed: {
            type: Boolean,
            default: true
        },
        rival: [String], //concurrent
        customerAccount: {
            type: String,
            set: MODULE('utils').setAccount,
            trim: true,
            uppercase: true
        }, //code_compta
        supplierAccount: {
            type: String,
            set: MODULE('utils').setAccount,
            trim: true,
            uppercase: true
        } //code_compta_fournisseur
    },
    Status: {
        type: String,
        default: 'ST_NEVER'
    },
    lastOrder: {
        type: Date
    },
    iban: {
        bank: {
            type: String,
            uppercase: true,
            trim: true
        },
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
        } //BIC / SWIFT TODO old swift
    },
    entity: [{
        type: String,
        trim: true
    }],
    relatedUser: {
        type: ObjectId,
        ref: 'Users',
        default: null
    },
    color: {
        type: String,
        default: '#4d5a75'
    },
    social: {
        FB: {
            type: String,
            default: ''
        },
        LI: {
            type: String,
            default: ''
        },
        TW: {
            type: String,
            default: ''
        }
    },
    whoCanRW: {
        type: String,
        enum: ['owner', 'group', 'everyOne'],
        default: 'everyOne'
    },
    groups: {
        owner: {
            type: ObjectId,
            ref: 'Users'
        },
        users: [{
            type: ObjectId,
            ref: 'Users'
        }],
        group: [{
            type: ObjectId,
            ref: 'Department'
        }]
    },
    notes: [{
        _id: false,
        note: String,
        title: String,
        task: {
            type: ObjectId,
            ref: 'DealTasks'
        },
        attachment: {},
        datec: {
            type: Date,
            default: Date.now
        },
        author: {
            type: ObjectId,
            ref: 'Users'
        },
        css: {
            type: String,
            default: "note-info"
        }
    }],
    files: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    createdBy: {
        type: ObjectId,
        ref: 'Users'
    },
    editedBy: {
        type: ObjectId,
        ref: 'Users'
    },
    companyInfo: {
        brand: {
            type: String,
            default: ''
        }, // Old caFamily
        size: {
            type: String,
            default: 'EF0'
        }, // effectif_id
        industry: {
            type: ObjectId,
            ref: 'Industries'
        }, //brand
        idprof1: String, // SIREN
        idprof2: {
            type: String
        }, // SIRET
        idprof3: String, // NAF
        idprof4: String,
        idprof5: String,
        idprof6: String, // TVA Intra
        category: {
            type: Schema.Types.ObjectId,
            ref: 'accountsCategories'
        }, //typent_id
        forme_juridique: String,
        capital: {
            type: Number,
            default: 0
        },
        //importExport: String, // null (no internal country), EUROP (Import/Export in EUROPE), INTER (Import/Export international) TODO Remove
        Tag: {
            type: [],
            set: MODULE('utils').setTags
        }
    },
    contactInfo: {
        soncas: [String],
        hobbies: [String],
        sex: {
            type: String,
            default: "H"
        }
    },
    ID: {
        type: Number,
        unique: true
    },
    oldId: String
}, { // only use for migration
    collection: 'Customers',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

customerSchema.statics.query = function(options, callback) {
    const self = this;

    var data = options.query;
    var quickSearch = data.quickSearch;
    const limit = options.limit;
    const skip = options.skip;

    const FilterMapper = MODULE('helper').filterMapper;
    var filterMapper = new FilterMapper();

    var accessRollSearcher;
    var contentSearcher;
    var waterfallTasks;
    var contentType = data.contentType;
    var sort = {};
    var filter = data.filter && JSON.parse(data.filter) || {};
    var key;
    var filterObject = {
        isremoved: {
            $ne: true
        },
        'salesPurchases.isSupplier': (data.forSales == 'false' ? true : false),
    };
    var optionsObject = {};
    var matchObject = {};

    if (quickSearch) {
        matchObject.$or = [{
                fullName: {
                    $regex: new RegExp(quickSearch, 'ig')
                }
            },
            {
                'salesPurchases.ref': {
                    $regex: new RegExp("^" + quickSearch, 'ig')
                }
            }
        ];
        filter = {};
    }

    if (data.sort) {
        sort = JSON.parse(data.sort);
    } else
        sort = {
            name: 1
        };
    sort._id = 1;


    filterObject.$and = [];

    if (filter && typeof filter === 'object') {
        filterObject.$and.push(filterMapper.mapFilter(filter, {
            contentType: contentType
        })); // caseFilter(filter);
    }

    accessRollSearcher = function(cb) {
        const accessRoll = MODULE('helper').accessRoll;
        accessRoll(options.user, self, cb);
    };

    contentSearcher = function(ids, cb) {
        var newQueryObj = {};
        const ObjectId = MODULE('utils').ObjectId;

        newQueryObj.$and = [];
        newQueryObj.$and.push({
            _id: {
                $in: ids
            }
        });

        var query = [{
                $match: filterObject
            },
            {
                $project: {
                    fullName: {
                        $concat: ['$name.first', ' ', '$name.last']
                    },
                    'salesPurchases.ref': 1,
                    'salesPurchases.salesPerson': 1,
                    'salesPurchases.isProspect': 1,
                    'salesPurchases.isCustomer': 1,
                    'salesPurchases.isSupplier': 1,
                    'salesPurchases.isSubcontractor': 1,
                    address: 1,
                    companyInfo: 1,
                    notes: 1,
                    Status: 1,
                    entity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastOrder: 1,
                    type: 1
                }
            },
            {
                $match: matchObject
            },
            {
                $lookup: {
                    from: 'Employees',
                    localField: 'salesPurchases.salesPerson',
                    foreignField: '_id',
                    as: 'salesPurchases.salesPerson'
                },
            },
            {
                $project: {
                    fullName: 1,
                    'salesPurchases.ref': 1,
                    'salesPurchases.salesPerson': {
                        $arrayElemAt: ['$salesPurchases.salesPerson', 0]
                    },
                    'salesPurchases.isProspect': 1,
                    'salesPurchases.isCustomer': 1,
                    'salesPurchases.isSupplier': 1,
                    'salesPurchases.isSubcontractor': 1,
                    address: 1,
                    companyInfo: 1,
                    notes: 1,
                    Status: 1,
                    entity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastOrder: 1,
                    type: 1
                },
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    'salesPurchases.ref': 1,
                    'salesPurchases.salesPerson': {
                        _id: '$salesPurchases.salesPerson._id',
                        fullName: {
                            $concat: ['$salesPurchases.salesPerson.name.first', ' ', '$salesPurchases.salesPerson.name.last']
                        },
                    },
                    'salesPurchases.isProspect': 1,
                    'salesPurchases.isCustomer': 1,
                    'salesPurchases.isSupplier': 1,
                    'salesPurchases.isSubcontractor': 1,
                    address: 1,
                    companyInfo: 1,
                    notes: 1,
                    Status: 1,
                    entity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastOrder: 1,
                    type: 1
                },
            },
            {
                $match: newQueryObj
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: 1
                    },
                    root: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $unwind: '$root'
            },
            {
                $project: {
                    _id: '$root._id',
                    fullName: '$root.fullName',
                    'salesPurchases': '$root.salesPurchases',
                    address: '$root.address',
                    companyInfo: '$root.companyInfo',
                    notes: '$root.notes',
                    Status: '$root.Status',
                    entity: '$root.entity',
                    createdAt: '$root.createdAt',
                    updatedAt: '$root.updatedAt',
                    type: '$root.type',
                    lastOrder: '$root.lastOrder',
                    total: 1,
                    totalAll: {
                        count: "$total",
                    },
                }
            },
            {
                $group: {
                    _id: "$Status",
                    total: {
                        $sum: 1
                    },
                    root: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $unwind: '$root'
            }, {
                $group: {
                    _id: null,
                    Status: {
                        $addToSet: {
                            _id: "$_id",
                            total: "$total"
                        }
                    },
                    root: {
                        $push: '$root'
                    }
                }
            }, {
                $unwind: '$root'
            },
            {
                $project: {
                    _id: '$root._id',
                    fullName: '$root.fullName',
                    'salesPurchases': '$root.salesPurchases',
                    address: '$root.address',
                    companyInfo: '$root.companyInfo',
                    notes: '$root.notes',
                    Status: '$root.Status',
                    entity: '$root.entity',
                    createdAt: '$root.createdAt',
                    updatedAt: '$root.updatedAt',
                    lastOrder: '$root.lastOrder',
                    type: '$root.type',
                    total: "$root.total",
                    totalAll: {
                        count: "$root.totalAll.count",
                        Status: "$Status"
                    }
                }
            },
            {
                $project: {
                    fullName: 1,
                    salesPurchases: 1,
                    address: 1,
                    companyInfo: 1,
                    notes: 1,
                    Status: 1,
                    entity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    lastOrder: 1,
                    type: 1,
                    total: 1,
                    totalAll: 1
                }
            },
            {
                $sort: sort
            }
        ];

        if (skip)
            query.push({
                $skip: skip
            });

        if (limit)
            query.push({
                $limit: limit
            });

        if (options.exec == false) // No execute aggregate : juste return query
            return cb(null, query);

        self.aggregate(query, cb);
    };

    waterfallTasks = [accessRollSearcher, contentSearcher];
    async.waterfall(waterfallTasks, callback);
};

customerSchema.path('salesPurchases.customerAccount').validate(function(v) {
    if (!v)
        return true;
    return v.length <= 10;
}, 'The maximum length is 10.');

customerSchema.path('salesPurchases.supplierAccount').validate(function(v) {
    if (!v)
        return true;
    return v.length <= 10;
}, 'The maximum length is 10.');

customerSchema.virtual('fullName').get(function() {
    if (this.name.first)
        return this.name.first + ' ' + this.name.last;

    return this.name.last;
});

customerSchema.pre('save', function(next) {
    var SeqModel = MODEL('Sequence').Schema;
    var EntityModel = MODEL('entity').Schema;
    var self = this;

    /*if (this.salesPurchases.ref && this.isModified('salesPurchases.ref')) {
        this.salesPurchases.customerAccount = "411" + this.salesPurchases.ref;
        this.salesPurchases.supplierAccount = "401" + this.salesPurchases.ref;
    }*/

    // Update first address delivery copy main address
    if (self.shippingAddress && self.shippingAddress.length != 0) {
        self.shippingAddress[0].name = self.fullName;
        self.shippingAddress[0].street = self.address.street;
        self.shippingAddress[0].zip = self.address.zip;
        self.shippingAddress[0].city = self.address.city;
        self.shippingAddress[0].country = self.address.country;
    } else if (self.address)
        self.shippingAddress.push({
            name: self.fullName,
            street: self.address.street,
            zip: self.address.zip,
            city: self.address.city,
            country: self.address.country,
            Status: 'ENABLE'
        });

    if (self.salesPurchases.isActive == false)
        self.Status = "ST_NO";

    //if (this.code_client == null && this.entity !== "ALL" && this.Status !== 'ST_NEVER') {
    //console.log("Save societe");
    if (!this.ID)
        SeqModel.incNumber("C", 6, function(seq, number) {
            //self.barCode = "C" + seq;
            self.ID = number;

            if (!self.salesPurchases.ref)
                self.salesPurchases.ref = "C" + seq;

            /*if (!self.salesPurchases.customerAccount)
                self.salesPurchases.customerAccount = "411" + self.salesPurchases.ref;
            if (!self.salesPurchases.supplierAccount)
                self.salesPurchases.supplierAccount = "401" + self.salesPurchases.ref;*/


            next();
            //console.log(seq);
            /*EntityModel.findOne({ _id: self.entity }, "cptRef", function(err, entity) {
                if (err)
                    console.log(err);

                if (entity && entity.cptRef)
                    self.code_client = entity.cptRef + "-" + seq;
                else
                    self.code_client = "C" + seq;
                next();
            });*/
        });
    else
        next();
});

var statusList = {};
Dict.dict({
        dictName: "fk_stcomm",
        object: true
    },
    function(err, docs) {
        statusList = docs;
    });

var prospectLevelList = {};
Dict.dict({
    dictName: "fk_prospectlevel",
    object: true
}, function(err, docs) {
    prospectLevelList = docs;
});

var segmentationList = {};
Dict.dict({
        dictName: "fk_segmentation",
        object: true
    },
    function(err, docs) {
        if (docs) {
            segmentationList = docs.values;
        }
    });

var tab_attractivity = {
    effectif_id: {
        "EF0": 1,
        "EF1-5": 1,
        "EF6-10": 1,
        "EF11-50": 1,
        "EF51-100": 1,
        "EF101-250": 2,
        "EF251-500": 2,
        "EF501-1000": 3,
        "EF1001-5000": 5,
        "EF5000+": 5
    },
    typent_id: {
        //"TE_PUBLIC": 3,
        "TE_ETABL": 3,
        "TE_SIEGE": 5
    },
    familyProduct: {
        "Externalisation": 5,
        "Imp Num": 4,
        "Repro/plan": 2,
        "Signalétique": 5,
        "Numérisation": 5,
        "Créa, Pao": 2,
        "Dupli cd/dvd": 4
    },
    segmentation: segmentationList,
    poste: {
        "PDG": 5,
        "DG": 4,
        "DET": 4,
        "DIR IMMO": 4,
        "DirCO": 2,
        "Dir COM": 3,
        "DirMktg": 3
    }
};

customerSchema.virtual('attractivity')
    .get(function() {
        var attractivity = 0;

        for (var i in tab_attractivity) {
            if (this[i]) {
                if (tab_attractivity[i][this[i].text])
                    attractivity += tab_attractivity[i][this[i].text];

                else if (tab_attractivity[i][this[i]])
                    attractivity += tab_attractivity[i][this[i]];
            }
        }

        return attractivity;
    });

customerSchema.virtual('status')
    .get(function() {
        var res_status = {};

        var status = this.Status;

        if (status && statusList.values[status] && statusList.values[status].label) {
            //console.log(this);
            res_status.id = status;
            //this.status.name = i18n.t("intervention." + statusList.values[status].label);
            res_status.name = statusList.values[status].label;
            res_status.css = statusList.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "";
        }
        return res_status;

    });

/*customerSchema.virtual('prospectLevel')
    .get(function() {
        var prospectLevel = {};

        var level = this.prospectlevel;

        if (level && prospectLevelList.values[level] && prospectLevelList.values[level].cssClass) {
            prospectLevel.id = level;
            prospectLevel.name = i18n.t("companies:" + level);
            if (prospectLevelList.values[level].label)
                prospectLevel.name = prospectLevelList.values[level].label;
            prospectLevel.css = prospectLevelList.values[level].cssClass;
        } else { // By default
            prospectLevel.id = level;
            prospectLevel.name = level;
            prospectLevel.css = "";
        }

        return prospectLevel;
    });*/

customerSchema.virtual('iban.isOk')
    .get(function() {
        var self = this;

        if (self.iban && self.iban.id) {
            var IBAN = require('iban');

            return IBAN.isValid(self.iban.id);
        }

        return null;
    });

customerSchema.virtual('errors')
    .get(function() {
        var errors = [];

        if (!this.salesPurchases.cond_reglement)
            errors.push(i18n.t("companies:ErrEmptyReglement"));
        if (!this.salesPurchases.mode_reglement)
            errors.push(i18n.t("companies:ErrEmptyCondition"));

        //Check Valid IBAN
        if (this.iban && this.iban.id) {
            var IBAN = require('iban');
            if (!IBAN.isValid(this.iban.id))
                errors.push(i18n.t("companies:ErrIBAN"));
        }

        return errors;
    });

customerSchema.virtual('sha1')
    .get(function() {
        var CryptoJS = require("crypto-js");

        if (!this.emails || !this.emails.length)
            return "";

        var email = this.emails[0].email;

        if (!email)
            return "";

        if (!CONFIG('sha1-secret'))
            return "";

        return CryptoJS.SHA1(CONFIG('sha1-secret') + email.toUpperCase()).toString();
    });

customerSchema.index({
    name: 'text',
    zip: 'text',
    Tag: 'text'
});

customerSchema.plugin(timestamps);

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE(CONFIG('storing-files'));
    customerSchema.plugin(gridfs.pluginGridFs, {
        root: "Customers"
    });
}

customerSchema.plugin(version, {
    collection: 'Customers.Version',
    strategy: 'collection'
});

/**
 * Methods
 */
customerSchema.virtual('_status')
    .get(function() {
        var res_status = {};

        var status = this.Status;
        var statusList = exports.Status;

        if (status && statusList.values[status] && statusList.values[status].label) {
            res_status.id = status;
            res_status.name = i18n.t("companies:" + statusList.values[status].label);
            //this.status.name = statusList.values[status].label;
            res_status.css = statusList.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "";
        }

        return res_status;
    });

exports.Status = {
    "_id": "fk_stcomm",
    "lang": "companies",
    "values": {
        "ST_NEVER": {
            "enable": true,
            "label": "NeverContacted",
            "cssClass": "ribbon-color-default label-default",
            "system": true
        },
        "ST_PFROI": {
            "enable": true,
            "label": "ColdProspect",
            "cssClass": "ribbon-color-info label-success",
            "system": true
        },
        "ST_PCHAU": {
            "enable": true,
            "label": "HotProspect",
            "cssClass": "ribbon-color-danger label-danger",
            "system": true
        },
        "ST_NEW": {
            "enable": true,
            "label": "NewCustomer",
            "cssClass": "ribbon-color-warning label-warning",
            "system": true
        },
        "ST_CFID": {
            "enable": true,
            "label": "LoyalCustomer",
            "cssClass": "ribbon-color-success label-success",
            "system": true
        },
        "ST_CVIP": {
            "enable": true,
            "label": "VIP",
            "cssClass": "ribbon-color-primary label-warning",
            "system": true
        },
        "ST_LOOSE": {
            "enable": true,
            "label": "LostCustomer",
            "cssClass": "ribbon-color-danger label-danger",
            "system ": true
        },
        "ST_NO": {
            "enable": true,
            "label": "DoNotContact",
            "cssClass": "ribbon-color-info label-info",
            "system": true
        }
    }
};

exports.Schema = mongoose.model('Customers', customerSchema);
exports.name = "Customers";

// Refresh Status and LastOrder
F.on('customer:recalculateStatus', function(data) {
    var userId = data.userId;
    const OrderModel = MODEL('order').Schema.OrderCustomer;
    const QuotationModel = MODEL('order').Schema.Order; // All orders Types
    const CustomerModel = exports.Schema;
    const ObjectId = MODULE('utils').ObjectId;

    //console.log(data);
    console.log("Customer Status refresh", data);

    if (!data.supplier || !data.supplier._id)
        return;

    async.waterfall([
            function(wCb) {
                CustomerModel.findById(data.supplier._id, "Status lastOrder ",
                    function(err, supplier) {
                        if (err)
                            return wCb(err);

                        if (!supplier)
                            return wCb("No supplier found");

                        if (supplier.salesPurchases.isActive == false)
                            supplier.Status = "ST_NO";

                        supplier.Status = 'ST_NEVER';

                        return wCb(null, supplier);
                    });
            },
            function(supplier, wCb) {
                if (supplier.Status == "ST_NO")
                    return wCb(null, supplier);

                if (supplier.isProspect)
                    supplier.Status = "ST_PFROI";

                return wCb(null, supplier);
            },
            function(supplier, wCb) {
                if (supplier.Status == "ST_NO")
                    return wCb(null, supplier);

                // Check if quotation or order DRAFT -> ST_PCHAU
                QuotationModel.find({
                        supplier: data.supplier._id,
                        _type: {
                            $in: ["orderCustomer", "quotationCustomer"]
                        },
                        isremoved: {
                            $ne: true
                        },
                        Status: {
                            $ne: "CANCELED"
                        },
                        datec: {
                            $gte: moment().subtract(1, 'year').toDate()
                        }
                    }, "", {
                        sort: {
                            datec: -1
                        },
                        limit: 1
                    },
                    function(err, orders) {
                        if (err)
                            return wCb(err);

                        if (orders && orders.length) {
                            supplier.Status = "ST_PCHAU";
                            supplier.isProspect = true;
                            supplier.isCustomer = false;
                            return wCb(null, supplier);
                        }

                        return wCb(null, supplier);

                    });
            },
            function(supplier, wCb) {
                if (supplier.Status == "ST_NO")
                    return wCb(null, supplier);

                // Check if order -> ST_NEW, ST_CFID, ST_CVIP, ST_LOOSE
                OrderModel.find({
                        supplier: data.supplier._id,
                        isremoved: {
                            $ne: true
                        },
                        Status: {
                            $nin: ["DRAFT", "CANCELED"]
                        }
                    }, "", {
                        sort: {
                            datec: -1
                        },
                        limit: 1
                    },
                    function(err, orders) {
                        if (err)
                            return wCb(err);

                        if (orders && orders.length) {
                            supplier.isProspect = false;
                            supplier.isCustomer = true;
                            supplier.Status = "ST_LOOSE";
                        }

                        OrderModel.find({
                            supplier: data.supplier._id,
                            isremoved: {
                                $ne: true
                            },
                            Status: {
                                $nin: ["DRAFT", "CANCELED"]
                            },
                            datec: {
                                $gte: moment().subtract(1, 'year').toDate()
                            }
                        }, "", {
                            sort: {
                                datec: -1
                            }
                        }, function(err, orders) {
                            if (err)
                                return wCb(err);

                            if (orders && orders.length) {
                                supplier.lastOrder = orders[0].datec;
                                if (orders.length == 1)
                                    supplier.Status = "ST_NEW";
                                else
                                    supplier.Status = "ST_CFID";
                            }

                            OrderModel.aggregate([{
                                    $match: {
                                        isremoved: {
                                            $ne: true
                                        },
                                        Status: {
                                            $nin: ["DRAFT", "CANCELED"]
                                        },
                                        datec: {
                                            $gte: moment().subtract(1, 'year').toDate()
                                        }
                                    }
                                }, {
                                    $project: {
                                        _id: 1,
                                        supplier: 1,
                                        total_ht: 1,
                                    }
                                }, {
                                    $group: {
                                        _id: "$supplier",
                                        total_ht: {
                                            $sum: "$total_ht"
                                        }
                                    }
                                }, {
                                    $sort: {
                                        total_ht: 1
                                    }
                                }, {
                                    $limit: 10
                                },
                                {
                                    $match: {
                                        _id: supplier._id
                                    }
                                }
                            ], function(err, orders) {
                                if (err)
                                    return wCb(err);

                                if (orders && orders.length)
                                    supplier.Status = "ST_CVIP";

                                return wCb(null, supplier);
                            });
                        });
                    });
            }
        ],
        function(err, supplier) {
            if (err)
                return console.log(err);

            //console.log(supplier);

            supplier.updatedAt = new Date();

            if (supplier)
                CustomerModel.findByIdAndUpdate(supplier._id, supplier, {
                    upsert: false
                }, function(err, doc) {
                    if (err)
                        console.log(err);
                });
        });
});