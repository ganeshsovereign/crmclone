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
    timestamps = require('mongoose-timestamp'),
    moment = require('moment'),
    _ = require("lodash"),
    async = require("async");

var Dict = INCLUDE('dict');
/**
 * Product Schema
 */

var setRound3 = MODULE('utils').setRound3;

var supplierPriceSchema = new Schema({
    _id: false,
    societe: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    ref: String,
    taxes: [{
        _id: false,
        taxeId: {
            type: Schema.Types.ObjectId,
            ref: 'taxes'
        },
        value: {
            type: Number
        } //for ecotaxe
    }],
    minQty: Number,
    replenishmentTime: {
        type: Number,
        default: 0
    }, // delai de reappro en jr
    prices: {
        currency: {
            type: String,
            ref: 'currency',
            default: 'EUR'
        },
        pu_ht: {
            type: Number,
            default: 0
        } // For base price
        //pricesQty: { type: Schema.Types.Mixed } // For quantity price reduction
    },
    packing: Number //conditionement
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});


/*supplierPriceSchema.virtual('pricesDetails')
    .get(function() {
        var Pricebreak = INCLUDE('pricebreak');

        Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

        return Pricebreak.humanize(true, 3);
    });*/


var maxlength = [255, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'];

var LangSchema = new Schema({
    _id: false,
    description: {
        type: String,
        default: ''
    }, //Bill Offer Delivery Order
    shortDescription: {
        type: String,
        default: ''
    }, // Resume ecommerce
    body: {
        type: String,
        default: ''
    }, // HTML ecommerce
    name: {
        type: String,
        default: ''
    },
    meta: {
        title: {
            type: String,
            default: '',
            trim: true
        },
        description: {
            type: String,
            default: '',
            trim: true,
            maxlength: maxlength
        }
    },
    linker: {
        type: String,
        sparse: true,
        set: MODULE('utils').setLink
    }, // SEO URL
    Tag: {
        type: [],
        set: MODULE('utils').setTags
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

LangSchema.pre('save', function(next) {
    var self = this;

    // remove old packif change
    //if (!this.linker)
    //    this.linker = this.name.replace(/ /g, "-").toLowerCase();

    next();
});

var product = {
    _id: false,
    id: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: {
        type: Number,
        default: 0
    }
};

var productSchema = new Schema({
    isSell: {
        type: Boolean,
        default: true
    },
    isBuy: {
        type: Boolean,
        default: false
    },
    isBundle: {
        type: Boolean,
        default: false
    },
    isPackaging: {
        type: Boolean,
        default: false
    },
    isVariant: {
        type: Boolean,
        default: false
    },
    isValidated: {
        type: Boolean,
        default: false
    }, //Integration publication
    groupId: {
        type: String,
        default: null
    },
    //  job: { type: Schema.Types.ObjectId, ref: 'jobs', default: null },
    canBeSold: {
        type: Boolean,
        default: true
    },
    canBeExpensed: {
        type: Boolean,
        default: true
    },
    eventSubscription: {
        type: Boolean,
        default: true
    },

    onlyWeb: {
        type: Boolean
    },
    istop: {
        type: Boolean,
        default: false
    },
    ischat: {
        type: Boolean,
        default: false
    },
    imageSrc: {
        type: Schema.Types.ObjectId,
        ref: 'Images'
    },

    entity: [String],

    oldId: String, // Only for import migration

    //ref: { type: String, required: true, unique: true, uppercase: true }, //TODO Remove
    name: {
        type: String,
        default: ''
    },
    ID: {
        type: Number,
        unique: true
    },
    isremoved: {
        type: Boolean,
        default: false
    },

    info: {
        productType: {
            type: Schema.Types.ObjectId,
            ref: 'productTypes',
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        autoBarCode: {
            type: Boolean,
            default: false
        },
        //barCode: { type: String, index: true, uppercase: true, sparse: true },
        aclCode: {
            type: String,
            uppercase: true
        },
        SKU: {
            type: String,
            unique: true,
            require: true
        },
        UPC: {
            type: String,
            default: null
        },
        ISBN: {
            type: String,
            default: null
        },
        EAN: {
            type: String,
            default: null,
            index: true,
            uppercase: true,
            sparse: true
        },

        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            default: null
        },
        categories: [{
            type: Schema.Types.ObjectId,
            ref: 'productCategory'
        }],

        notePrivate: {
            type: String
        },

        /* PIM transaltion */
        langs: [LangSchema],
        /* need to Add  alt des images TODO */

        optional: {} // Form module and dynamic form
    },

    compta_buy: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },
    compta_buy_eu: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },
    compta_buy_exp: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },
    compta_sell: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },
    compta_sell_eu: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },
    compta_sell_exp: {
        type: String,
        set: MODULE('utils').setAccount,
        trim: true
    },

    inventory: {
        langs: [{
            _id: false,
            availableLater: {
                type: String,
                default: ''
            }
        }],
        minStockLevel: {
            type: Number,
            default: 0
        },
        maxStockLevel: {
            type: Number
        },
        stockTimeLimit: {
            type: Number,
            default: 360
        }
    },
    packing: {
        type: Number,
        default: 1
    }, //conditonnement

    variants: [{
        type: Schema.Types.ObjectId,
        ref: 'productAttibutesValues'
    }],
    attributes: [{
        _id: false,
        attribute: {
            type: Schema.Types.ObjectId,
            ref: 'productAttributes'
        },
        value: {
            type: Schema.Types.Mixed
        }, // Not for select
        options: [{
            type: Schema.Types.ObjectId,
            ref: 'productAttibutesValues'
        }],

        //product_feacture_value if value != null
        channels: [{
            _id: false,
            channel: {
                type: Schema.Types.ObjectId,
                ref: 'integrations'
            },
            integrationId: String
        }]
    }],

    pack: [product], // conditionned pack from MP + production form supplier -> be in stock need prepare
    bundles: [product], // bundles or promotion pack of sell products -> Not prepare before order

    search: [String],

    workflow: {
        type: Schema.Types.ObjectId,
        ref: 'workflows',
        default: null
    },
    whoCanRW: {
        type: String,
        enum: ['owner', 'group', 'everyOne'],
        default: 'everyOne'
    },

    groups: {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            default: null
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'Users',
            default: null
        }],
        group: [{
            type: Schema.Types.ObjectId,
            ref: 'Department',
            default: null
        }]
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },


    externalId: {
        type: String,
        default: ''
    },

    files: {
        type: Array,
        default: []
    },
    attachments: {
        type: Array,
        default: []
    },

    //label: { type: String, default: "" },
    //description: { type: String, default: "" },
    //body: { type: String, default: "" }, // Description For SEO

    //type: { type: String, default: 'PRODUCT' },
    Status: {
        type: String,
        default: 'DISABLED'
    },
    //enabled: { type: Boolean, default: true },
    //ischat: { type: Boolean, default: false },
    //negociate: { type: Number, default: 0 }, // 0 is no negociate
    taxes: [{
        _id: false,
        taxeId: {
            type: Schema.Types.ObjectId,
            ref: 'taxes'
        },
        value: {
            type: Number
        } // sample ecotax
    }],
    //tva_tx: { type: Number, default: 20 },
    //datec: { type: Date, default: Date.now },
    //billingMode: { type: String, uppercase: true, default: "QTY" }, //MONTH, QTY, ...


    // price model just for list product
    prices: {
        pu_ht: {
            type: Number,
            default: 0
        }, // For base price
        //pricesQty: { type: Schema.Types.Mixed } // For quantity price reduction
    },

    template: {
        type: String
    },
    dynForm: String,

    sellFamily: {
        type: Schema.Types.ObjectId,
        ref: 'productFamily',
        require: true
    },
    costFamily: {
        type: Schema.Types.ObjectId,
        ref: 'productFamily',
        default: '59b791bdf8604049aefea737'
    },

    units: {
        type: String,
        default: "unit"
    },

    /*size: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        dimension: { type: String, default: 'cm' },
        
    },MOVE TO ATTRIBUTES */
    weight: {
        type: Number,
        default: 0
    }, // Poids en kg

    // TODO Remove old model stock
    /*stock: {
        zone: String,
        driveway: String, //allee
        rack: Number, // column
        floor: Number // etage
    },*/

    suppliers: [supplierPriceSchema],

    /******** VAD Method **************/
    directCost: {
        type: Number,
        default: 0
    }, //Total MP
    indirectCost: {
        type: Number,
        default: 0
    }, //Total Effort
    /**********************************/

    // For color and % good quality of information
    rating: {
        marketing: {
            type: Number,
            default: 0,
            set: setRound3
        },
        attributes: {
            type: Number,
            default: 0,
            set: setRound3
        },
        ecommerce: {
            type: Number,
            default: 0,
            set: setRound3
        },
        images: {
            type: Number,
            default: 0,
            set: setRound3
        },
        categories: {
            type: Number,
            default: 0,
            set: setRound3
        },
        total: {
            type: Number,
            default: 0,
            set: setRound3
        }
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

productSchema.statics.query = function(options, callback) {
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

    var optionsObject = {
        $and: []
    };
    var matchObject = {
        isremoved: {
            $ne: true
        }
    };

    var mid = options.query.contentType === 'salesProduct' ? 65 : 58;
    var regExp;
    var doNotShowImage = options.query.doNotGetImage || false;

    var channelLinksMatch = {};
    var channelObjectIds;
    var action;
    var toExpand;
    var groupId;

    if (filter) {
        toExpand = filter.toExpand;
        groupId = filter.groupId;

        delete filter.toExpand;
        delete filter.groupId;
        delete filter.productId;
    }
    //console.log(filter);

    if (quickSearch) {
        matchObject.$or = [{
                'info.SKU': {
                    $regex: new RegExp(quickSearch, 'ig')
                }
            },
            {
                'info.langs.name': {
                    $regex: new RegExp(quickSearch, 'ig')
                }
            }
        ];
        filter = {};
    }

    if (data.sort) {
        sort = JSON.parse(data.sort);
        sort['data._id'] = 1;
    } else
        sort = {
            'data.info.SKU': 1,
            'data._id': 1
        };

    if (filter && filter.channelLinks) {
        channelObjectIds = filter.channelLinks.value.objectID();
        action = filter.channelLinks.type;

        if (action === 'unpublish' || action === 'unlink') {
            channelLinksMatch[filter.channelLinks.key] = {
                $in: channelObjectIds
            };
        } else if (action === 'publish') {
            channelLinksMatch['channelLinks.channel'] = {
                $nin: channelObjectIds
            };
        }

        delete filter.channelLinks;
    }
    // optionsObject.$and.push({job: null});

    if (filter && typeof filter === 'object') {
        optionsObject.$and.push(filterMapper.mapFilter(filter, {
            contentType: contentType
        }));
    }

    //console.log(optionsObject.$and[0]);

    accessRollSearcher = function(cb) {
        const accessRoll = MODULE('helper').accessRoll;
        accessRoll(options.user, self, cb);
    };

    contentSearcher = function(productsIds, waterfallCallback) {
        var aggregation;
        var matchAggregationArray = [];
        var aggregationArray;

        optionsObject.$and.push({
            _id: {
                $in: productsIds
            }
        });

        //console.log(optionsObject.$and[1]);
        if (!toExpand) {
            aggregationArray = [{
                    $lookup: {
                        from: 'productTypes',
                        localField: 'products.info.productType',
                        foreignField: '_id',
                        as: 'ProductTypes'
                    }
                }, {
                    $unwind: {
                        path: '$ProductTypes',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'productFamily',
                        localField: 'products.sellFamily',
                        foreignField: '_id',
                        as: 'ProductFamily'
                    }
                }, {
                    $unwind: {
                        path: '$ProductFamily',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $unwind: {
                        path: '$products.info.categories',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductCategories',
                        localField: 'products.info.categories',
                        foreignField: '_id',
                        as: 'productCategories'
                    }
                }, {
                    $unwind: {
                        path: '$productCategories',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'Images',
                        localField: 'products.imageSrc',
                        foreignField: '_id',
                        as: 'products.image'
                    }
                }, {
                    $unwind: {
                        path: '$products.image',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $group: {
                        _id: '$products._id',
                        productCategories: {
                            $push: {
                                _id: '$productCategories._id',
                                name: '$productCategories.fullName'
                            }
                        },

                        variantsCount: {
                            $first: '$variantsCount'
                        },
                        ProductTypes: {
                            $first: '$ProductTypes'
                        },
                        ProductFamily: {
                            $first: '$ProductFamily'
                        },
                        products: {
                            $first: '$products'
                        },
                        image: {
                            $first: '$image'
                        },
                        count: {
                            $first: '$count'
                        }
                    }
                }, {
                    $unwind: {
                        path: '$products.variants',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductOptionsValues',
                        localField: 'products.variants',
                        foreignField: '_id',
                        as: 'variants'
                    }
                }, {
                    $unwind: {
                        path: '$variants',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductOptions',
                        localField: 'variants.optionId',
                        foreignField: '_id',
                        as: 'variants.optionId'
                    }
                }, {
                    $unwind: {
                        path: '$variants.optionId',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $group: {
                        _id: '$products._id',
                        variants: {
                            $push: '$variants'
                        },
                        count: {
                            $first: '$count'
                        },
                        ProductTypes: {
                            $first: '$ProductTypes'
                        },
                        ProductFamily: {
                            $first: '$ProductFamily'
                        },
                        productCategories: {
                            $first: '$productCategories'
                        },
                        products: {
                            $first: '$products'
                        },
                        variantsCount: {
                            $first: '$variantsCount'
                        }
                    }
                }, {
                    $project: {
                        count: 1,
                        data: {
                            _id: '$products._id',
                            info: '$products.info',
                            Status: '$products.Status',
                            bundles: '$products.bundles',
                            inventory: '$products.inventory',
                            name: '$products.name',
                            imageSrc: '$products.image.imageSrc',
                            isBundle: '$products.isBundle',
                            ProductTypes: '$ProductTypes',
                            //ProductTypesName: '$ProductTypes.name',
                            ProductCategories: '$productCategories',
                            variants: '$variants',
                            createdBy: '$products.createdBy',
                            groupId: '$products.groupId',
                            prices: '$products.prices',
                            weight: '$products.weight',
                            rating: '$products.rating',
                            updatedAt: '$products.updatedAt',
                            directCost: '$products.directCost',
                            ProductFamily: '$ProductFamily',
                            variantsCount: {
                                $filter: {
                                    input: '$variantsCount',
                                    as: 'variant',
                                    cond: {
                                        $eq: ['$products.groupId', '$$variant.groupId']
                                    }
                                }
                            }
                        }
                    }
                }, {
                    $project: {
                        name: '$data.name',
                        sku: '$data.info.SKU',
                        count: 1,
                        data: 1
                    }
                }, {
                    $sort: sort
                }, {
                    $project: {
                        count: 1,
                        data: {
                            _id: '$data._id',
                            info: '$data.info',
                            Status: '$data.Status',
                            bundles: '$data.bundles',
                            inventory: '$data.inventory',
                            name: '$data.name',
                            imageSrc: '$data.imageSrc',
                            isBundle: '$data.isBundle',
                            ProductTypes: '$data.ProductTypes',
                            //ProductTypesName: '$data.ProductTypesName',
                            ProductCategories: '$data.ProductCategories',
                            variants: '$data.variants',
                            createdBy: '$data.createdBy',
                            images: '$data.images',
                            groupId: '$data.groupId',
                            prices: '$data.prices',
                            weight: '$data.weight',
                            rating: '$data.rating',
                            updatedAt: '$data.updatedAt',
                            directCost: '$data.directCost',
                            ProductFamily: '$data.ProductFamily',
                            variantsCount: {
                                $arrayElemAt: ['$data.variantsCount', 0]
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        data: 1,
                        Status: "$data.Status",
                        count: 1,
                        totalAll: {
                            count: "$count",
                        }
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
                },
                {
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
                },
                {
                    $unwind: '$root'
                },
                {
                    $project: {
                        _id: '$root._id',
                        data: '$root.data',
                        Status: '$root.Status',
                        total: '$root.count',
                        totalAll: {
                            count: "$root.totalAll.count",
                            Status: "$Status"
                        }
                    }
                },
                {
                    $project: {
                        data: 1,
                        Status: 1,
                        total: 1,
                        totalAll: 1
                    }
                },
                {
                    $skip: skip
                }, {
                    $limit: limit
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $first: '$total'
                        },
                        data: {
                            $push: '$data'
                        },
                        totalAll: {
                            $first: '$totalAll'
                        },
                    }
                }
            ];
            matchAggregationArray = [{
                    $match: matchObject
                },
                {
                    $match: optionsObject
                },
                {
                    $group: {
                        _id: '$groupId',
                        variantsCount: {
                            $sum: 1
                        },
                        products: {
                            $first: '$$ROOT'
                        }
                    }
                }, {
                    $group: {
                        _id: null,
                        variantsCount: {
                            $addToSet: {
                                count: '$variantsCount',
                                groupId: '$_id'
                            }
                        },

                        count: {
                            $sum: 1
                        },
                        products: {
                            $push: '$products'
                        }
                    }
                }, {
                    $unwind: '$products'
                }
            ];
        } else {
            aggregationArray = [{
                $lookup: {
                    from: 'productTypes',
                    localField: 'products.info.productType',
                    foreignField: '_id',
                    as: 'ProductTypes'
                }
            }, {
                $unwind: {
                    path: '$ProductTypes',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $unwind: {
                    path: '$products.info.categories',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'ProductCategories',
                    localField: 'products.info.categories',
                    foreignField: '_id',
                    as: 'productCategories'
                }
            }, {
                $unwind: {
                    path: '$productCategories',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'Images',
                    localField: 'products.imageSrc',
                    foreignField: '_id',
                    as: 'products.image'
                }
            }, {
                $unwind: {
                    path: '$products.image',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: '$products._id',
                    productCategories: {
                        $push: {
                            _id: '$productCategories._id',
                            name: '$productCategories.fullName'
                        }
                    },

                    variantsCount: {
                        $first: '$variantsCount'
                    },
                    ProductTypes: {
                        $first: '$ProductTypes'
                    },
                    products: {
                        $first: '$products'
                    },
                    count: {
                        $first: '$count'
                    }
                }
            }, {
                $unwind: {
                    path: '$products.variants',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'ProductOptionsValues',
                    localField: 'products.variants',
                    foreignField: '_id',
                    as: 'variants'
                }
            }, {
                $unwind: {
                    path: '$variants',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'ProductOptions',
                    localField: 'variants.optionId',
                    foreignField: '_id',
                    as: 'variants.optionId'
                }
            }, {
                $unwind: {
                    path: '$variants.optionId',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'channelLinks',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'channelLinks'
                }
            }, {
                $unwind: {
                    path: '$channelLinks',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $match: channelLinksMatch
            }, {
                $lookup: {
                    from: 'integrations',
                    localField: 'channelLinks.channel',
                    foreignField: '_id',
                    as: 'channelLinks'
                }
            }, {
                $unwind: {
                    path: '$channelLinks',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: '$products._id',
                    variants: {
                        $push: '$variants'
                    },
                    count: {
                        $first: '$count'
                    },
                    ProductTypes: {
                        $first: '$ProductTypes'
                    },
                    productCategories: {
                        $first: '$productCategories'
                    },
                    products: {
                        $first: '$products'
                    },
                    variantsCount: {
                        $first: '$variantsCount'
                    },
                    channelLinks: {
                        $addToSet: {
                            name: '$channelLinks.channelName',
                            type: '$channelLinks.type'
                        }
                    }
                }
            }, {
                $project: {
                    count: 1,
                    data: {
                        _id: '$products._id',
                        info: '$products.info',
                        Status: '$products.Status',
                        bundles: '$products.bundles',
                        inventory: '$products.inventory',
                        name: '$products.name',
                        imageSrc: '$products.image.imageSrc',
                        isBundle: '$products.isBundle',
                        ProductTypes: "$ProductTypes",
                        //ProductTypesId: '$ProductTypes._id',
                        //ProductTypesName: '$ProductTypes.name',
                        ProductCategories: '$productCategories',
                        variants: '$variants',
                        createdBy: '$products.createdBy',
                        channelLinks: '$channelLinks',
                        groupId: '$products.groupId',
                        variantsCount: {
                            $filter: {
                                input: '$variantsCount',
                                as: 'variant',
                                cond: {
                                    $eq: ['$products.groupId', '$$variant.groupId']
                                }
                            }
                        }
                    }
                }
            }, {
                $project: {
                    name: '$data.name',
                    sku: '$data.info.SKU',
                    count: 1,
                    data: 1
                }
            }, {
                $sort: sort
            }, {
                $project: {
                    count: 1,
                    data: {
                        _id: '$data._id',
                        info: '$data.info',
                        Status: '$data.Status',
                        bundles: '$data.bundles',
                        inventory: '$data.inventory',
                        name: '$data.name',
                        imageSrc: '$data.imageSrc',
                        isBundle: '$data.isBundle',
                        ProductTypes: '$data.ProductTypes',
                        //ProductTypesName: '$data.ProductTypesName',
                        ProductCategories: '$data.ProductCategories',
                        variants: '$data.variants',
                        createdBy: '$data.createdBy',
                        groupId: '$data.groupId',
                        channelLinks: '$data.channelLinks',
                        variantsCount: {
                            $arrayElemAt: ['$data.variantsCount', 0]
                        },
                    }
                }
            }, {
                $skip: skip
            }, {
                $limit: limit
            }, {
                $group: {
                    _id: '$count',
                    total: {
                        $first: '$count'
                    },
                    data: {
                        $push: '$data'
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    total: 1,
                    data: 1
                }
            }];

            if (groupId)
                matchAggregationArray = [{
                    $match: matchObject
                }, {
                    $match: {
                        groupId: groupId
                    }
                }, {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1
                        },
                        products: {
                            $push: '$$ROOT'
                        }
                    }
                }, {
                    $unwind: '$products'
                }];
            else
                matchAggregationArray = [{
                    $match: optionsObject
                }, {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1
                        },
                        products: {
                            $push: '$$ROOT'
                        }
                    }
                }, {
                    $unwind: '$products'
                }];

        }

        matchAggregationArray = matchAggregationArray.concat(aggregationArray);
        //console.log(matchAggregationArray);

        if (options.exec == false) // No execute aggregate : juste return query
            return waterfallCallback(null, matchAggregationArray);

        aggregation = self.aggregate(matchAggregationArray);

        aggregation.options = {
            //allowDiskUse: true
        };

        aggregation.exec(function(err, res) {
            var mainImage;
            var oldImage;
            var resultData;
            const ProductStatus = exports.Status;

            if (err)
                return waterfallCallback(err);

            if (!res.length)
                resultData = {
                    data: [],
                    total: 0
                };
            else {
                resultData = res[0];
                const status = exports.Status;

                resultData.data = MODULE('utils').Status(resultData.data, ProductStatus);

                /*resultData.data = _.map(resultData.data, function(line) {

                    line._status = (status.values[line.Status] ? {
                        css: status.values[line.Status].cssClass,
                        name: i18n.t(status.lang + ":" + status.values[line.Status].label)
                    } : {
                        name: line.Status
                    });

                    return line;
                });*/

                for (var i = 0; i < resultData.data.length; i++) {
                    /*console.log(doNotShowImage);
    
                             if (doNotShowImage) {
                             console.log(resultData.data[i]);
                             delete resultData.data[i].imageSrc;
                             return;
                             }*/

                    oldImage = resultData.data[i].imageSrc;

                    mainImage = _.find(resultData.data[i].images, function(item) {
                        return item.main === true;
                    });

                    resultData.data[i].imageSrc = mainImage && mainImage.imageSrc || oldImage;
                }
            }

            waterfallCallback(null, resultData);
        });

        /* if (skip)
             query.push({
                 $skip: skip
             });

         if (limit)
             query.push({
                 $limit: limit
             });*/
    };



    waterfallTasks = [accessRollSearcher, contentSearcher];
    async.waterfall(waterfallTasks, callback);
}

productSchema.plugin(timestamps);

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE(CONFIG('storing-files'));
    productSchema.plugin(gridfs.pluginGridFs, {
        root: "Product"
    });
}

productSchema.statics.next = function(options, callback) {
    var self = this;

    this.find({
            _id: {
                $gt: options._id,
                isremove: {
                    $ne: true
                }
            }
        })
        .sort({
            'info.SKU': 1
        })
        .limit(1)
        .exec(callback);
};

productSchema.statics.previous = function(options, callback) {
    var self = this;

    this.find({
            _id: {
                $gt: options._id,
                isremove: {
                    $ne: true
                }
            }
        })
        .sort({
            'info.SKU': -1
        })
        .limit(1)
        .exec(callback);
};

/*productSchema.methods.getPrice = function(qty, price_level) {
    var Pricebreak = INCLUDE('pricebreak');
    var self = this;
    var d = Q.defer();

    if (!this || !this.prices) {
        d.resolve(0);
        return d.promise;
    }

    if (price_level && price_level !== 'BASE') {

        var modelClass;

        modelClass = MODEL('pricelevel').Schema;
        modelClass.findOne({ "product": self._id, price_level: price_level }, function(err, res) {
            if (err)
                return d.reject(err);

            //console.log(res, self._id, price_level);
            if (!res) { // No specific price using BASE Prices
                Pricebreak.set(self.prices.pu_ht, self.prices.pricesQty);
                return d.resolve(Pricebreak.price(qty).price);
            }

            Pricebreak.set(res.prices.pu_ht, res.prices.pricesQty);
            return d.resolve(Pricebreak.price(qty).price);

        });
        return d.promise;
    }

    Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

    d.resolve(Pricebreak.price(qty).price);
    return d.promise;
};*/

productSchema.methods.updateRating = function() {
    /* RATING UPDATE */
    // attributes
    if (this.attributes && this.attributes.length) {
        let cpt = 0;
        _.each(this.attributes, function(elem) {
            if (elem.value || elem.options.length)
                cpt++
        });
        this.rating.attributes = cpt * 1 / this.attributes.length;
    }

    //ecommerce
    let ecommerce = 0;
    if (this.info.langs[0].meta.title)
        ecommerce++;
    if (this.info.langs[0].meta.description)
        ecommerce++;
    if (this.info.langs[0].linker)
        ecommerce++;
    if (this.info.langs[0].shortDescription)
        ecommerce++;
    if (this.info.langs[0].body)
        ecommerce++;
    this.rating.ecommerce = ecommerce / 5;

    //images
    this.rating.images = 0;
    if (this.imageSrc)
        this.rating.images = 1;

    //categories
    this.rating.categories = 0;
    if (this.info.categories.length)
        this.rating.categories = 1;
    //marketing


    let marketing = 0;
    if (this.info.langs[0].description)
        marketing++;
    if (this.info.langs[0].Tag.length)
        marketing++;
    if (this.weight !== null)
        marketing++;

    this.rating.marketing = marketing / 3;

    this.rating.total = (this.rating.attributes + this.rating.ecommerce + this.rating.images + this.rating.marketing) / 4;
}

productSchema.pre('save', function(next) {
    var SeqModel = MODEL('Sequence').Schema;
    var self = this;
    var round = MODULE('utils').round;

    if (this.info && this.info.langs && this.info.langs.length)
        this.name = this.info.langs[0].name;

    if (this.info.productType && this.info.productType._id) {
        if (this.info.productType.isBundle) {
            this.isBundle = true;
            this.isBuy = false;
        } else {
            this.isBundle = false
            this.bundles = [];
        }

        if (this.info.productType.isPackaging) {
            this.isPackaging = true;
            this.isBuy = false;
        } else {
            this.isPackaging = false
            this.pack = [];
        }
    }

    if (this.info.isActive == false) {
        this.isValidated = false;
        this.Status = 'DISABLED'
    } else {
        if (this.isValidated == true)
            this.Status = 'VALIDATED';
        else
            this.Status = 'PREPARED';
    }

    this.updateRating();

    /* if (this.category) {
         var category = prepare_subcategories(this.category);
         this.category = category.name;
         this.linker_category = category.linker;
     }*/

    if (this.info && this.info.autoBarCode == true && this.seq) {
        this.info.EAN = "";

        //if (this.caFamily)
        //    this.info.barCode += this.caFamily.substr(0, 2);

        this.info.EAN += this.seq;
    }

    if (this.info && this.info.langs && this.info.langs.length) {
        var search = (this.info.langs[0].name + ' ' + this.info.langs[0].decription);
        /*this.attributes.forEach(function(elem) {
            search += ' ' + elem.value;
        });*/
        this.search = search.keywords(true, true);
    }

    if (this.isBundle) {
        let directCost = 0;
        if (this.taxes[1] && this.taxes[1].value) // reset ecotaxe
            this.taxes[1].value = 0;

        //this.weight = 0; //reset weight

        for (var i = 0; i < this.bundles.length; i++)
            if (this.bundles[i].id && this.bundles[i].id.directCost) {
                directCost += this.bundles[i].id.directCost * this.bundles[i].qty;
                //this.weight += this.bundles[i].id.weight * this.bundles[i].qty;
                if (this.bundles[i].id.taxes[1] && this.bundles[i].id.taxes[1].value) // Add ecotaxe
                    if (this.taxes[1] && this.taxes[1].value >= 0)
                        this.taxes[1].value += this.bundles[i].id.taxes[1].value * this.bundles[i].qty;
                    else
                        this.taxes.push({
                            taxeId: this.bundles[i].id.taxes[1].taxeId,
                            value: this.bundles[i].id.taxes[1].value * this.bundles[i].qty
                        });
            }

        //console.log(this);

        if (this.directCost != directCost)
            this.directCost = directCost;
    }

    if (this.isPackaging) {
        let directCost = 0;
        if (this.taxes[1] && this.taxes[1].value) // reset ecotaxe
            this.taxes[1].value = 0;

        //this.weight = 0; //reset weight

        for (var i = 0; i < this.pack.length; i++)
            if (this.pack[i].id && this.pack[i].id.directCost) {
                directCost += this.pack[i].id.directCost * this.pack[i].qty;
                //this.weight += this.pack[i].id.weight * this.pack[i].qty;
                if (this.pack[i].id.taxes[1] && this.pack[i].id.taxes[1].value) // Add ecotaxe
                    if (this.taxes[1] && this.taxes[1].value >= 0)
                        this.taxes[1].value += this.pack[i].id.taxes[1].value * this.pack[i].qty;
                    else
                        this.taxes.push({
                            taxeId: this.pack[i].id.taxes[1].taxeId,
                            value: this.pack[i].id.taxes[1].value * this.pack[i].qty
                        });
            }

        if (this.directCost != directCost)
            this.directCost = directCost;
    }

    if (this.sellFamily && this.sellFamily._id) {
        if (this.sellFamily.indirectCostRate)
            this.indirectCost = round(this.directCost * this.sellFamily.indirectCostRate / 100, 3);
    }

    if (!this.isNew && (this.isModified('directCost') || this.isModified('indirectCost') || this.isModified('sellFamily'))) // Emit to all that a product change totalCost
        setTimeout2('product:updateDirectCost_' + this._id.toString(), function() {
            F.emit('product:updateDirectCost', {
                userId: (self.editedBy ? self.editedBy.toString() : null),
                product: {
                    _id: self._id.toString()
                }
            });
        }, 500);

    //Emit product update
    setTimeout2('product:' + this._id.toString(), function() {
        F.emit('product:update', {
            userId: (self.editedBy ? self.editedBy.toString() : null),
            product: {
                _id: self._id.toString()
            }
        });
    }, 1000);


    if (this.isNew || this.ID === null) {
        //if (!this.body)
        //    this.body = this.description;

        return SeqModel.incNumber("P", 7, function(seq, number) {
            self.ID = number;

            if (self.info.autoBarCode == true) {
                self.info.EAN = "";

                self.info.EAN += seq;
            }

            return next();
        });
    } else
        next();
});

var dict = {};
Dict.dict({
    dictName: ['fk_product_status', 'fk_units'],
    object: true
}, function(err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    dict = doc;
});

productSchema.virtual('ecotax')
    .get(function() {
        if (!this.taxes || !this.taxes.length)
            return 0;

        for (var i = 0; i < this.taxes.length; i++)
            if (this.taxes[i].value)
                return this.taxes[i].value

        return 0;
    });

productSchema.virtual('totalCost')
    .get(function() {
        return this.directCost + this.indirectCost;
    });

productSchema.virtual('eshopIsNew')
    .get(function() {
        if (moment(this.createdAt).isAfter(moment().subtract(15, 'days'))) // eshopIsNew
            return true;

        return false;
    });

productSchema.virtual('total_pack') // Set Total price for a pack
    .get(function() {
        var total = 0;
        if (!this.pack || !this.pack.length)
            return 0;

        for (var i = 0, len = this.pack.length; i < len; i++) {
            if (this.pack[i].id)
                total += this.pack[i].qty * this.pack[i].id.totalCost;
        }

        return total;
    });

/*productSchema.virtual('color') // Get default color in attributs
    .get(function() {
        var color = {};

        if (!this.attributes)
            return null;

        for (var i = 0, len = this.attributes.length; i < len; i++) {
            if (this.attributes[i].css) {
                color = this.attributes[i];
                break;
            }
        }

        return color;
    });*/

/*productSchema.method('linker_category', function (cb) {
 var self = this;
 var CategoryModel=MODEL('category').Schema;
 
 
 CategoryModel.findOne({_id:self.category},"linker", function(err, doc){
 console.log(doc);
 });
 });*/


/*productSchema.virtual('pricesDetails')
    .get(function() {
        var Pricebreak = INCLUDE('pricebreak');

        Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

        return Pricebreak.humanize(true, 3);
    });*/

productSchema.virtual('_units')
    .get(function() {
        var res = {};

        var units = this.units;

        if (units && dict.fk_units.values[units].label) {
            //console.log(this);
            res.id = units;
            res.name = i18n.t("products:" + dict.fk_units.values[units].label);
        } else { // By default
            res.id = units;
            res.name = units;
        }
        return res;

    });

exports.Status = {
    "_id": "fk_product_status",
    "lang": "products",
    "values": {
        "ACTIVE": {
            "enable": true,
            "label": "Enabled",
            "cssClass": "ribbon-color-success label-success",
            "system": true
        },
        "DISABLED": {
            "enable": true,
            "label": "Disabled",
            "cssClass": "ribbon-color-default label-default",
            "system": true
        },
        "PUBLISHED": {
            "enable": true,
            "label": "Published",
            "cssClass": "ribbon-color-success label-success",
            "system": true
        },
        "VALIDATED": {
            "enable": true,
            "label": "Validated",
            "cssClass": "ribbon-color-warning label-warning",
            "system": true
        },
        "PREPARED": {
            "enable": true,
            "label": "Prepared",
            "cssClass": "ribbon-color-danger label-danger",
            "system": true
        }
    }
};

/**
 * Methods
 */
productSchema.virtual('_status')
    .get(function() {
        return MODULE('utils').Status(this.Status, exports.Status);
    });


exports.Schema = mongoose.model('product', productSchema, 'Product');
exports.name = 'product';

function prepare_subcategories(name) {

    var builder_link = [];
    var builder_text = [];
    var category = name.split('/');
    for (var i = 0, length = category.length; i < length; i++) {
        var item = category[i].trim();
        builder_link.push(item.slug());
        builder_text.push(item);
    }

    return {
        linker: builder_link.join('/'),
        name: builder_text.join(' / ')
    };
}


F.on('load', function() {
    // Refresh pack prices from directCost

    const ProductModel = MODEL('product').Schema;
    const round = MODULE('utils').round;
    const ProductPricesModel = MODEL('productPrices').Schema;
    const PriceListModel = MODEL('priceList').Schema;

    F.on('product:updateDirectCost', function(data) {
        //console.log(data);
        console.log("Update emit product", data.product);

        if (!data.product || !data.product._id)
            return;

        async.parallel([
                function(pCb) {
                    /*Update Bundle Cost*/
                    const product = data.product;

                    ProductModel.find({
                            'bundles.id': product._id
                        })
                        //.populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                        //.populate("priceLists")
                        .populate("pack.id", "info directCost indirectCost")
                        .populate("bundles.id", "info directCost indirectCost")
                        .populate({
                            path: 'info.productType'
                            //    populate: { path: "options" }
                        })
                        .populate({
                            path: 'sellFamily',
                            populate: {
                                path: "options",
                                populate: {
                                    path: "group"
                                }
                            }
                        })
                        .exec(function(err, products) {
                            if (!products)
                                return pCb();
                            async.each(products, function(product, aCb) {
                                if (!product.isBundle)
                                    return;

                                product.editedBy = data.userId;

                                product.save(aCb);
                            });
                        }, function(err) {
                            if (err)
                                console.log("update bundleCost error ", err);
                            pCb(null);
                        });

                    //F.functions.PubSub.emit('product:updateDirectCost', {
                    //    data: doc
                    //});
                },
                function(pCb) {
                    /*UpdatePackCost*/
                    const product = data.product;

                    ProductModel.find({
                            'pack.id': product._id
                        })
                        //.populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                        //.populate("priceLists")
                        .populate("pack.id", "info directCost indirectCost")
                        .populate({
                            path: 'info.productType'
                            //    populate: { path: "options" }
                        })
                        .populate({
                            path: 'sellFamily',
                            populate: {
                                path: "options",
                                populate: {
                                    path: "group"
                                }
                            }
                        })
                        .exec(function(err, products) {
                            if (!products)
                                return pCb();
                            async.each(products, function(product, aCb) {
                                if (!product.isPackaging)
                                    return;

                                product.editedBy = data.userId;

                                product.save(aCb);
                            }, function(err) {
                                if (err)
                                    console.log("update packCost error ", err);
                                pCb(null);
                            });

                            //F.functions.PubSub.emit('product:updateDirectCost', {
                            //    data: doc
                            //});
                        });
                },
                function(pCb) {
                    /*isCoef : UpdateProductPrices*/
                    const product = data.product;

                    ProductPricesModel.find({
                            'product': data.product._id
                        })
                        //.populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                        .populate("priceLists")
                        .exec(function(err, pricesList) {
                            if (!products)
                                return pCb();
                            async.each(pricesList, function(prices, aCb) {
                                if (!prices.priceLists.isCoef)
                                    return aCb();

                                prices.editedBy = data.userId;

                                prices.save(function(err, doc) {
                                    if (err)
                                        return aCb(err);

                                    setTimeout2('productPricesList:' + doc._id.toString(), function() {
                                        F.emit('productPrices:updatePrice', {
                                            userId: data.userId,
                                            price: {
                                                _id: doc._id.toString()
                                            }
                                        });
                                    }, 1000);

                                    data: doc
                                });

                                aCb();
                            });
                        }, function(err) {
                            if (err)
                                console.log("update UpdateProductPrices error ", err);

                            pCb();
                        });

                    //F.functions.PubSub.emit('product:updateDirectCost', {
                    //    data: doc
                    //});
                },
                function(pCb) {
                    /*InitCoefIfNewSP*/
                    const product = data.product;

                    return pCb();

                    async.waterfall([
                        function(wCb) {
                            ProductPricesModel.find({
                                    'product': data.product._id
                                })
                                //.populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                                .populate("priceLists")
                                .exec(function(err, pricesList) {

                                    pricesList = _.map(_.filter(pricesList, function(priceList) {
                                        if (!priceList.priceLists.isCoef)
                                            return true;
                                        return false;
                                    }), function(elem) {
                                        return elem.priceLists._id;
                                    });

                                    wCb(null, pricesList);
                                });
                        },
                        function(pricesList, wCb) {

                        }
                    ], function(err, result) {
                        prices.editedBy = data.userId;

                        // prices.save(function(err, doc) {
                        if (err)
                            return aCb(err);


                        aCb();
                        //});
                    }, function(err) {
                        if (err)
                            console.log("update UpdateProductPrices error ", err);
                        callback(null);
                    });

                    //F.functions.PubSub.emit('product:updateDirectCost', {
                    //    data: doc
                    //});
                }
            ],
            function(err) {
                console.log('Product automatic update');
            });
    });
});