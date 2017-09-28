"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    moment = require('moment'),
    _ = require("lodash"),
    Q = require('q');

var Dict = INCLUDE('dict');
/**
 * Product Schema
 */

var setRound3 = MODULE('utils').setRound3;

var supplierPriceSchema = new Schema({
    _id: false,
    societe: { type: Schema.Types.ObjectId, ref: 'Customers' },
    ref: String,
    taxes: [{
        _id: false,
        taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
        value: { type: Number } //for ecotaxe
    }],
    minQty: Number,
    replenishmentTime: { type: Number, default: 0 }, // delai de reappro en jr
    prices: {
        currency: { type: String, ref: 'currency', default: 'EUR' },
        pu_ht: { type: Number, default: 0 } // For base price
        //pricesQty: { type: Schema.Types.Mixed } // For quantity price reduction
    },
    packing: Number //conditionement
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
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
    description: { type: String, default: '' }, //Bill Offer Delivery Order
    shortDescription: { type: String, default: '' }, // Resume ecommerce
    body: { type: String, default: '' }, // HTML ecommerce
    name: { type: String, default: '' },
    meta: {
        title: { type: String, default: '', trim: true },
        description: { type: String, default: '', trim: true, maxlength: maxlength }
    },
    linker: { type: String, sparse: true, set: MODULE('utils').setLink }, // SEO URL
    Tag: { type: [], set: MODULE('utils').setTags }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
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
    id: { type: Schema.Types.ObjectId, ref: 'product' },
    qty: { type: Number, default: 0 }
};

var productSchema = new Schema({
    isSell: { type: Boolean, default: true },
    isBuy: { type: Boolean, default: false },
    isBundle: { type: Boolean, default: false },
    isPackaging: { type: Boolean, default: false },
    isVariant: { type: Boolean, default: false },
    isValidated: { type: Boolean, default: false }, //Integration publication
    groupId: { type: String, default: null },
    //  job: { type: Schema.Types.ObjectId, ref: 'jobs', default: null },
    canBeSold: { type: Boolean, default: true },
    canBeExpensed: { type: Boolean, default: true },
    eventSubscription: { type: Boolean, default: true },

    onlyWeb: { type: Boolean },
    istop: { type: Boolean, default: false },
    ischat: { type: Boolean, default: false },
    imageSrc: {
        type: Schema.Types.ObjectId,
        ref: 'Images'
    },

    entity: [String],

    oldId: String, // Only for import migration

    //ref: { type: String, required: true, unique: true, uppercase: true }, //TODO Remove
    name: { type: String, default: '' },
    ID: { type: Number, unique: true },
    isremoved: { type: Boolean, default: false },

    info: {
        productType: { type: Schema.Types.ObjectId, ref: 'productTypes', default: null },
        isActive: { type: Boolean, default: true },
        autoBarCode: { type: Boolean, default: false },
        //barCode: { type: String, index: true, uppercase: true, sparse: true },
        aclCode: { type: String, uppercase: true },
        SKU: { type: String, unique: true, require: true },
        UPC: { type: String, default: null },
        ISBN: { type: String, default: null },
        EAN: { type: String, default: null, index: true, uppercase: true, sparse: true },

        brand: { type: Schema.Types.ObjectId, ref: 'Brand', default: null },
        categories: [{ type: Schema.Types.ObjectId, ref: 'productCategory' }],

        notePrivate: { type: String },

        /* PIM transaltion */
        langs: [LangSchema]
            /* need to Add  alt des images TODO */


    },

    compta_buy: { type: String, set: MODULE('utils').setAccount, trim: true },
    compta_buy_eu: { type: String, set: MODULE('utils').setAccount, trim: true },
    compta_buy_exp: { type: String, set: MODULE('utils').setAccount, trim: true },
    compta_sell: { type: String, set: MODULE('utils').setAccount, trim: true },
    compta_sell_eu: { type: String, set: MODULE('utils').setAccount, trim: true },
    compta_sell_exp: { type: String, set: MODULE('utils').setAccount, trim: true },

    inventory: {
        langs: [{
            _id: false,
            availableLater: { type: String, default: '' }
        }],
        minStockLevel: { type: Number, default: 0 },
        maxStockLevel: { type: Number },
        stockTimeLimit: { type: Number, default: 360 }
    },
    packing: { type: Number, default: 1 }, //conditonnement

    variants: [{ type: Schema.Types.ObjectId, ref: 'productAttibutesValues' }],
    attributes: [{
        _id: false,
        attribute: { type: Schema.Types.ObjectId, ref: 'productAttributes' },
        value: { type: Schema.Types.Mixed }, // Not for select
        options: [{ type: Schema.Types.ObjectId, ref: 'productAttibutesValues' }],

        //product_feacture_value if value != null
        channels: [{
            _id: false,
            channel: { type: Schema.Types.ObjectId, ref: 'integrations' },
            integrationId: String
        }]
    }],

    pack: [product], // conditionned pack from MP + production form supplier -> be in stock need prepare
    bundles: [product], // bundles or promotion pack of sell products -> Not prepare before order

    search: [String],

    workflow: { type: Schema.Types.ObjectId, ref: 'workflows', default: null },
    whoCanRW: { type: String, enum: ['owner', 'group', 'everyOne'], default: 'everyOne' },

    groups: {
        owner: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
        users: [{ type: Schema.Types.ObjectId, ref: 'Users', default: null }],
        group: [{ type: Schema.Types.ObjectId, ref: 'Department', default: null }]
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
    editedBy: { type: Schema.Types.ObjectId, ref: 'Users' },


    externalId: { type: String, default: '' },

    files: { type: Array, default: [] },
    attachments: { type: Array, default: [] },

    //label: { type: String, default: "" },
    //description: { type: String, default: "" },
    //body: { type: String, default: "" }, // Description For SEO

    //type: { type: String, default: 'PRODUCT' },
    Status: { type: String, default: 'DISABLED' },
    //enabled: { type: Boolean, default: true },
    //ischat: { type: Boolean, default: false },
    //negociate: { type: Number, default: 0 }, // 0 is no negociate
    taxes: [{
        _id: false,
        taxeId: { type: Schema.Types.ObjectId, ref: 'taxes' },
        value: { type: Number } // sample ecotax
    }],
    //tva_tx: { type: Number, default: 20 },
    //datec: { type: Date, default: Date.now },
    //billingMode: { type: String, uppercase: true, default: "QTY" }, //MONTH, QTY, ...


    // price model just for list product
    prices: {
        pu_ht: { type: Number, default: 0 }, // For base price
        //pricesQty: { type: Schema.Types.Mixed } // For quantity price reduction
    },

    template: { type: String },
    dynForm: String,

    sellFamily: { type: Schema.Types.ObjectId, ref: 'productFamily', require: true },
    costFamily: { type: Schema.Types.ObjectId, ref: 'productFamily', default: '59b791bdf8604049aefea737' },

    units: { type: String, default: "unit" },

    /*size: {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        dimension: { type: String, default: 'cm' },
        
    },MOVE TO ATTRIBUTES */
    weight: { type: Number, default: 0 }, // Poids en kg

    // TODO Remove old model stock
    /*stock: {
        zone: String,
        driveway: String, //allee
        rack: Number, // column
        floor: Number // etage
    },*/

    suppliers: [supplierPriceSchema],

    /******** VAD Method **************/
    directCost: { type: Number, default: 0 }, //Total MP
    indirectCost: { type: Number, default: 0 }, //Total Effort
    /**********************************/

    optional: Schema.Types.Mixed, // TODO Remove ?

    // For color and % good quality of information
    rating: {
        marketing: { type: Number, default: 0, set: setRound3 },
        attributes: { type: Number, default: 0, set: setRound3 },
        ecommerce: { type: Number, default: 0, set: setRound3 },
        images: { type: Number, default: 0, set: setRound3 },
        categories: { type: Number, default: 0, set: setRound3 },
        total: { type: Number, default: 0, set: setRound3 }
    }

}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

productSchema.plugin(timestamps);

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE(CONFIG('storing-files'));
    productSchema.plugin(gridfs.pluginGridFs, { root: "Product" });
}

productSchema.statics.next = function(options, callback) {
    var self = this;

    this.find({
            _id: {
                $gt: options._id,
                isremove: { $ne: true }
            }
        })
        .sort({ 'info.SKU': 1 })
        .limit(1)
        .exec(callback);
};

productSchema.statics.previous = function(options, callback) {
    var self = this;

    this.find({
            _id: {
                $gt: options._id,
                isremove: { $ne: true }
            }
        })
        .sort({ 'info.SKU': -1 })
        .limit(1)
        .exec(callback);
};


// Gets listing
productSchema.statics.query = function(options, callback) {
    var self = this;

    // options.search {String}
    // options.category {String}
    // options.page {String or Number}
    // options.max {String or Number}
    // options.id {String}

    options.page = U.parseInt(options.page) - 1;
    options.max = U.parseInt(options.max, 20);
    if (options.id && typeof(options.id) === 'string')
        options.id = options.id.split(',');
    if (options.page < 0)
        options.page = 0;
    var take = U.parseInt(options.max);
    var skip = U.parseInt(options.page * options.max);

    var query = {
        enabled: true,
        Status: { $in: ['SELL', 'SELLBUY'] },
        'prices.pu_ht': { $gt: 0 }
    };

    if (options.category)
        query.category = options.category;
    if (options.manufacturer)
        query.manufacturer = options.manufacturer;
    //if (options.search)
    //    builder.in('search', options.search.keywords(true, true));
    if (options.id) {
        if (typeof options.id === 'object')
            options.id = { '$in': options.id };
        query._id = options.id;
    }
    if (options.skip)
        builder.where('id', '<>', options.skip);
    if (options.homepage)
        query.istop = true;

    var sort = '';

    //console.log(query);

    if (options.homepage)
        sort = 'updatedAt';

    this.find(query)
        .limit(take)
        .skip(skip)
        .populate('category', "_id path url linker name")
        .sort(sort)
        .lean()
        .exec(function(err, doc) {
            //console.log(doc);
            var data = {};
            data.count = doc.length;
            data.items = doc;
            data.limit = options.max;
            data.pages = Math.ceil(data.count / options.max);

            var linker_detail = F.sitemap('detail', true);
            var linker_category = F.sitemap('category', true);

            data.items.forEach(function(item) {

                if (linker_detail) {
                    item.url = item.linker;
                    item.linker = linker_detail.url.format(item.url, item._id);
                }
                if (linker_category)
                    item.linker_category = linker_category.url + item.category.linker + '/' + item.category._id + '/';

                // Load PHOTO ?

            });
            if (!data.pages)
                data.pages = 1;
            data.page = options.page + 1;
            callback(null, data);
        });

    return;

    var nosql = DB(error);
    nosql.listing('products', 'Product').make(function(builder) {

        builder.where('enabled', true);
        builder.in('Status', ['SELL', 'SELLBUY']);
        builder.where('prices.pu_ht', '>', 0);
        builder.where('type', 'PRODUCT');
        if (options.category)
            builder.like('linker_category', '^' + options.category);
        if (options.manufacturer)
            builder.where('manufacturer', options.manufacturer);
        if (options.search)
            builder.in('search', options.search.keywords(true, true));
        if (options.id)
            builder.in('id', options.id);
        if (options.skip)
            builder.where('id', '<>', options.skip);
        if (options.homepage)
            builder.where('istop', true);
        builder.limit(take);
        builder.skip(skip);
        if (options.homepage)
            builder.sort('updatedAt', true);
        else
            builder.sort('_id', false);
    });
    nosql.exec(function(err, response) {
        //console.log(response.products.items);
        var data = {};
        data.count = response.products.count;
        data.items = response.products.items;
        data.limit = options.max;
        data.pages = Math.ceil(data.count / options.max);

        var linker_detail = F.sitemap('detail', true);
        var linker_category = F.sitemap('category', true);

        data.items.forEach(function(item) {
            if (linker_detail) {
                item.url = item.linker;
                item.linker = linker_detail.url.format(item.linker, item._id);
            }
            if (linker_category)
                item.linker_category = linker_category.url.format(item.linker_category);
            if (moment(item.createdAt).isAfter(moment().subtract(15, 'days'))) // IsNEW
                item.isnew = true;

            // Load PHOTO ?

        });
        if (!data.pages)
            data.pages = 1;
        data.page = options.page + 1;
        callback(data);
    });
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
        F.functions.BusMQ.emit('product:updateDirectCost', self.editedBy, { product: { _id: self._id } });
    }, 500);

    //Emit product update
    setTimeout2('product:' + this._id.toString(), function() {
        F.functions.BusMQ.emit('product:update', self.editedBy, { product: { _id: self._id } });
        F.functions.BusMQ.publish('product:update', self.editedBy, { product: { _id: self._id } });
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
Dict.dict({ dictName: ['fk_product_status', 'fk_units'], object: true }, function(err, doc) {
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
        var res_status = {};

        var status = this.Status;
        var statusList = exports.Status;

        if (status && statusList.values[status] && statusList.values[status].label) {
            res_status.id = status;
            res_status.name = i18n.t(statusList.lang + ":" + statusList.values[status].label);
            //this.status.name = statusList.values[status].label;
            res_status.css = statusList.values[status].cssClass;
        } else { // By default
            res_status.id = status;
            res_status.name = status;
            res_status.css = "";
        }

        return res_status;
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
    return;
    /*F.functions.PubSub.on('product:updateDirectCost', function(channel, data) {
        //console.log(data);
        console.log("Update emit product", data.product);

        switch (channel) {
            case 'product:updateDirectCost':
                if (data.product._id) {
                    exports.Schema.find({ 'bundles.id': data.product._id })
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
                            populate: { path: "options", populate: { path: "group" } }
                        })
                        .exec(function(err, products) {
                            products.forEach(function(product) {
                                if (!product.isBundle)
                                    return;

                                product.save(function(err, doc) {
                                    if (err)
                                        return console.log(err);

                                    //F.functions.PubSub.emit('product:updateDirectCost', {
                                    //    data: doc
                                    //});
                                });
                            });
                        });

                    exports.Schema.find({ 'pack.id': data.product._id })
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
                            populate: { path: "options", populate: { path: "group" } }
                        })
                        .exec(function(err, products) {

                            products.forEach(function(product) {
                                if (!product.isPackaging)
                                    return;

                                //console.log("PRODUCTS", product);
                                product.save(function(err, doc) {
                                    if (err)
                                        return console.log(err);



                                    // Emit to all that a productPrice in product list by coef was changed
                                    //setTimeout2('productPrices:updatePrice_' + this._id.toString(), function() {
                                    //F.functions.PubSub.emit('product:updateDirectCost', {
                                    //    data: doc
                                    //});
                                    //}, 5000);
                                });
                            });
                        });
                }
                break;
        }
    });*/
});