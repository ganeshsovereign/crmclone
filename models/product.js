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

var setTags = function (tags) {
    var result = [];
    for (var i = 0; i < tags.length; i++)
        if (typeof tags[i] == "object" && tags[i].text)
            result.push(tags[i].text.trim());
        else
            result.push(tags[i].trim());

    result = _.uniq(result);

    //console.log(result);
    return result;
};

var setLink = function (link) {
    if (!link)
        return null;

    link = link.replace(/ /g, "_");
    link = link.replace(/\//g, "");

    //console.log(result);
    return link;
};

var setAccount = function (account) {
    if (account) {
        account = account.replace(/ /g, "");
        account = account.substring(0, 10); //limit a 10 character
    }

    return account;
};

var Dict = INCLUDE('dict');
/**
 * Product Schema
 */

var supplierPriceSchema = new Schema({
    societe: {
        id: {type: Schema.Types.ObjectId, ref: 'societe'},
        name: String
    },
    ref: String,
    tva_tx: Number,
    minQty: Number,
    prices: {
        pu_ht: {type: Number, default: 0}, // For base price
        pricesQty: {type: Schema.Types.Mixed} // For quantity price reduction
    },
    packing: String //conditionement
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});


supplierPriceSchema.virtual('pricesDetails')
        .get(function () {
            var Pricebreak = INCLUDE('pricebreak');

            Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

            return Pricebreak.humanize(true, 3);
        });


var productSchema = new Schema({
    oldId: String, // Only for import migration
    ref: {type: String, required: true, unique: true, uppercase: true},
    seq: {type: String, unique: true},
    compta_buy: {type: String, set: setAccount, trim: true},
    compta_sell: {type: String, set: setAccount, trim: true},
    label: {type: String, default: ""},
    description: {type: String, default: ""},
    body: {type: String, default: ""}, // Description For SEO
    notePrivate: {type: String},
    //barCode: String, //Virtual
    type: {type: String, default: 'PRODUCT'},
    Status: String,
    enabled: {type: Boolean, default: true},
    istop: {type: Boolean, default: false},
    sale: {type: Boolean, default: false}, // soldes
    ischat: {type: Boolean, default: false},
    negociate: {type: Number, default: 0}, // 0 is no negociate
    country_id: String,
    tva_tx: {type: Number, default: 20},
    units: {type: String, default: "unit"},
    minPrice: {type: Number, default: 0},
    finished: String,
    tms: Date, // Not used ??
    datec: {type: Date, default: Date.now},
    billingMode: {type: String, uppercase: true, default: "QTY"}, //MONTH, QTY, ...
    Tag: {type: [], set: setTags},
    entity: [String],
    price: [{
            _id: {type: Schema.Types.ObjectId, required: true},
            price_level: String,
            tms: Date,
            pu_ht: Number,
            qtyMin: {type: Number, default: 0},
            ref_customer_code: String,
            user_mod: Schema.Types.Mixed,
            tva_tx: Number,
            dsf_coef: Number,
            dsf_time: Number
        }],
    // new price model
    prices: {
        pu_ht: {type: Number, default: 0}, // For base price
        pricesQty: {type: Schema.Types.Mixed} // For quantity price reduction
    },
    pu_ht: {type: Number, default: 0}, // For base price OLD
    user_mod: {id: String, name: String},
    history: [{
            tms: Date,
            user_mod: Schema.Types.Mixed,
            pu_ht: Number,
            ref_customer_code: String
        }],
    template: {type: String, default: "/partials/lines/classic.html"}, // TODO Remove
    view: String, // For partial product 
    dynForm: String,
    caFamily: {type: String, uppercase: true},
    subFamily: {type: String, uppercase: true},
    costCenter: {type: String, uppercase: true},
    subCostCenter: {type: String, uppercase: true},
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
    weight: {type: Number, default: 0}, // Poids en kg
    minQty: Number,
    stock: {
        zone: String,
        driveway: String, //allee
        rack: Number, // column
        floor: Number // etage
    },
    suppliers: [supplierPriceSchema],
    optional: Schema.Types.Mixed,
    linker: {type: String, unique: true, set: setLink} // SEO URL
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

productSchema.plugin(timestamps);

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE('_' + CONFIG('storing-files'));
    productSchema.plugin(gridfs.pluginGridFs, {root: "Product"});
}

// Gets listing
productSchema.statics.query = function (options, callback) {
    var self = this;

    // options.search {String}
    // options.category {String}
    // options.page {String or Number}
    // options.max {String or Number}
    // options.id {String}

    options.page = U.parseInt(options.page) - 1;
    options.max = U.parseInt(options.max, 20);
    if (options.id && typeof (options.id) === 'string')
        options.id = options.id.split(',');
    if (options.page < 0)
        options.page = 0;
    var take = U.parseInt(options.max);
    var skip = U.parseInt(options.page * options.max);

    var query = {
        enabled: true,
        Status: {$in: ['SELL', 'SELLBUY']},
        'prices.pu_ht': {$gt: 0}
    };

    if (options.category)
        query.category = options.category;
    if (options.manufacturer)
        query.manufacturer = options.manufacturer;
    //if (options.search)
    //    builder.in('search', options.search.keywords(true, true));
    if (options.id) {
        if (typeof options.id === 'object')
            options.id = {'$in': options.id};
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
            .exec(function (err, doc) {
                //console.log(doc);
                var data = {};
                data.count = doc.length;
                data.items = doc;
                data.limit = options.max;
                data.pages = Math.ceil(data.count / options.max);

                var linker_detail = F.sitemap('detail', true);
                var linker_category = F.sitemap('category', true);

                data.items.forEach(function (item) {

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
    nosql.listing('products', 'Product').make(function (builder) {

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
    nosql.exec(function (err, response) {
        //console.log(response.products.items);
        var data = {};
        data.count = response.products.count;
        data.items = response.products.items;
        data.limit = options.max;
        data.pages = Math.ceil(data.count / options.max);

        var linker_detail = F.sitemap('detail', true);
        var linker_category = F.sitemap('category', true);

        data.items.forEach(function (item) {
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

productSchema.statics.findPrice = function (options, fields, callback) {
    var self = this;

    var Pricebreak = INCLUDE('pricebreak');
    var query = {};

    if (options._id)
        query._id = options._id;

    if (typeof fields === 'function') {
        callback = fields;
        fields = "prices discount";
    }

    else if (options.ref)
        query.ref = options.ref;

    this.findOne(query, fields, function (err, doc) {
        if (err)
            return callback("err : model product/price");

        if (!doc)
            return callback(null, {});

        if (options.price_level && options.price_level !== 'BASE') {
            var modelClass = MODEL('pricelevel').Schema;
            return modelClass.findOne({"product.id": doc._id, price_level: options.price_level}, function (err, res) {
                //console.log(res);

                //console.log(res, self._id, price_level);
                if (!res) { // No specific price using BASE Prices
                    Pricebreak.set(doc.prices.pu_ht, doc.prices.pricesQty);
                    return callback(null, {pu_ht: Pricebreak.price(options.qty).price, discount: doc.discount || 0});
                }

                Pricebreak.set(res.prices.pu_ht, res.prices.pricesQty);

                callback(null, {pu_ht: Pricebreak.price(options.qty).price, discount: res.discount || 0});
            });
        }

        Pricebreak.set(doc.prices.pu_ht, doc.prices.pricesQty);

        //console.log(doc);
        callback(null, {pu_ht: Pricebreak.price(options.qty).price, discount: doc.discount || 0});
    });
};


productSchema.methods.getPrice = function (qty, price_level) {
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
        modelClass.findOne({"product.id": self._id, price_level: price_level}, function (err, res) {
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
};

productSchema.pre('save', function (next) {
    var SeqModel = MODEL('Sequence').Schema;
    var self = this;

    if (this.isNew)
        this.history = [];

    if (this.type !== 'DYNAMIC')
        this.dynForm = null;

    if (!this.linker)
        this.linker = this.ref.replace(/ /g, "-").toLowerCase();
    else
        this.linker = this.linker.replace(/ /g, "-");

    if (this.isNew || !this.seq) {
        if (!this.body)
            this.body = this.description;

        SeqModel.incNumber("P", 7, function (seq) {
            self.seq = seq;
            next();
        });
    } else
        next();
});

var dict = {};
Dict.dict({dictName: ['fk_product_status', 'fk_units'], object: true}, function (err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    dict = doc;
});

// Dynamic barCode
productSchema.virtual('barCode')
        .get(function () {
            var barCode = "";

            if (this.caFamily)
                barCode += this.caFamily.substr(0, 2);

            barCode += this.seq;

            return barCode;
        });

productSchema.virtual('zone')
        .get(function () {
            var zone = "";

            if (this.type !== 'PRODUCT')
                return null;

            if (!this.stock)
                return "Inconnu";

            if (!this.stock.zone)
                return "Inconnu";

            zone += this.stock.zone;

            if (!this.stock.driveway)
                return "Inconnu";

            zone += this.stock.driveway;

            if (!this.stock.rack)
                return "Inconnu";

            zone += "-" + MODULE('utils').numberFormat(this.stock.rack, 3);

            if (!this.stock.floor)
                return "Inconnu";

            zone += "/" + this.stock.floor;

            return zone;
        });

productSchema.virtual('eshopIsNew')
        .get(function () {
            if (moment(this.createdAt).isAfter(moment().subtract(15, 'days'))) // eshopIsNew
                return true;

            return false;
        });


/*productSchema.method('linker_category', function (cb) {
 var self = this;
 var CategoryModel=MODEL('category').Schema;
 
 
 CategoryModel.findOne({_id:self.category},"linker", function(err, doc){
 console.log(doc);
 });
 });*/


productSchema.virtual('pricesDetails')
        .get(function () {
            var Pricebreak = INCLUDE('pricebreak');

            Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

            return Pricebreak.humanize(true, 3);
        });

productSchema.virtual('status')
        .get(function () {
            var res_status = {};

            var status = this.Status;

            if (status && dict.fk_product_status.values[status].label) {
                //console.log(this);
                res_status.id = status;
                res_status.name = i18n.t("products:" + dict.fk_product_status.values[status].label);
                //res_status.name = statusList.values[status].label;
                res_status.css = dict.fk_product_status.values[status].cssClass;
            } else { // By default
                res_status.id = status;
                res_status.name = status;
                res_status.css = "";
            }
            return res_status;

        });

productSchema.virtual('_units')
        .get(function () {
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

exports.Schema = mongoose.model('product', productSchema, 'Product');
exports.name = 'product';

