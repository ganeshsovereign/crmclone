"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    _ = require('lodash'),
    async = require('async'),
    timestamps = require('mongoose-timestamp');

var setRound3 = MODULE('utils').setRound3;

var priceSchema = new Schema({
    _id: false,
    count: { type: Number, default: 0 },
    price: { type: Number, default: 0, set: setRound3 }, // pu_ht
    coef: { type: Number, default: 1, set: setRound3 },
    coefTotal: { type: Number, default: 1 } //Sum coef * familyCoef
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

var productPricesSchema = new Schema({
    priceLists: { type: ObjectId, ref: 'priceList' },
    product: { type: ObjectId, ref: 'product' },
    prices: [priceSchema],
    discount: { type: Number, default: 0 },
    qtyMin: { type: Number, default: 0 },
    qtyMax: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null },
    editedBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null }
});

productPricesSchema.plugin(timestamps);

productPricesSchema.index({ priceLists: 1, product: 1 }, { unique: true });

productPricesSchema.pre('save', function(next) {
    var self = this;
    var ProductModel = MODEL('product').Schema;
    var ProductFamilyCoefModel = MODEL('productFamilyCoef').Schema;
    var round = MODULE('utils').round;

    async.waterfall([
        function(cb) {
            var PriceListModel = MODEL('priceList').Schema;

            if (self.priceLists._id) //load priceList
                return cb();

            PriceListModel.populate(self, { path: "priceLists" }, function(err, doc) {
                if (err)
                    return cb(err);

                self = doc;
                cb();
            });
        },
        function(cb) {
            ProductModel.findOne({ _id: self.product }, "info directCost indirectCost prices pack createdAt sellFamily")
                .populate("sellFamily")
                .exec(function(err, product) {
                    if (err)
                        return cb(err);

                    return cb(null, product);
                });
        },
        function(product, cb) {
            ProductFamilyCoefModel.findOne({ family: product.sellFamily._id, priceLists: self.priceLists }, "coef", function(err, family) {
                if (err)
                    return cb(err);

                //console.log(family);
                //console.log(self);
                //var coef = product.sellFamily.isCoef;
                var coef = self.priceLists.isCoef;

                if (self.priceLists.cost == true && self.isModified('prices')) {
                    product.directCost = round(self.prices[0].price, 3);
                    product.indirectCost = round(product.directCost * product.sellFamily.indirectCostRate / 100, 3);
                    product.save(function(err, doc) {
                        if (err)
                            return cb(err);

                    });
                }

                /* coef mode */
                if (coef && self.priceLists.cost != true) {
                    //Recalcul product prices
                    self.prices = [];
                    for (var i = 0; i < product.sellFamily.discounts.length; i++) {
                        var price = {};
                        price.count = product.sellFamily.discounts[i].count;
                        price.coef = (family && family.coef || 1) * (1 - product.sellFamily.discounts[i].discount / 100);
                        price.price = round(product.totalCost * price.coef, 3);
                        self.prices.push(price);
                    }
                }

                if (self.priceLists.defaultPriceList == true && self.isModified('prices'))
                    product.update({ $set: { 'prices.pu_ht': self.prices[0].price } }, function(err, doc) {
                        if (err)
                            return console.log(err);
                    });

                cb(null);
            });
        }
    ], function(err) {
        if (err)
            return next(err);

        self.prices = _.filter(self.prices, function(price) {
            if (price.count == 0)
                return true;

            return (price.price !== 0)
        });

        self.prices = _.uniq(self.prices, 'count');

        function compare(a, b) {
            if (a.count < b.count)
                return -1;
            if (a.count > b.count)
                return 1;
            return 0;
        }

        self.prices.sort(compare);
        //console.log(self.prices);
        next();
    });
});

productPricesSchema.statics.findPrice = function(options, fields, callback) {
    var self = this;
    var ObjectId = MODULE('utils').ObjectId;

    var Pricebreak = INCLUDE('pricebreak');
    var query = {};

    if (options._id)
        query.product = ObjectId(options._id);

    //if (options.priceList)
    //    query.priceLists = ObjectId(options.priceList);

    if (typeof fields === 'function') {
        callback = fields;
        fields = "prices discount";
    } else if (options.ref)
        query.ref = options.ref;

    //console.log(options, query);

    this.aggregate([{
            $match: query
        },
        /*{
                   $project: {
                       _id: 1,
                       ref: '$info.SKU',
                       dynForm: 1,
                       taxes: 1,
                       units: 1,
                       directCost: 1,
                       indirectCost: 1,
                       info: 1,
                       size: 1
                   }
               }, {
                   $lookup: {
                       from: 'ProductPrices',
                       localField: '_id',
                       foreignField: 'product',
                       as: 'prices'
                   }
               }, {
                   $unwind: '$prices'
               }, */
        {
            $lookup: {
                from: 'PriceList',
                localField: 'priceLists',
                foreignField: '_id',
                as: 'priceLists'
            }
        },
        /*, {
                           $project: {
                               _id: 1,
                               ref: 1,
                               dynForm: 1,
                               taxes: { $arrayElemAt: ['$taxes.taxeId', 0] },
                               units: 1,
                               directCost: 1,
                               indirectCost: 1,
                               info: 1,
                               size: 1,
                               prices: { $arrayElemAt: ['$prices.prices', 0] },
                               discount: '$prices.discount',
                               priceLists: { $arrayElemAt: ['$priceLists', 0] }
                           }
                       }, */
        {
            $match: {
                //   $or: [{
                // 'priceLists.cost': (cost ? cost : { $ne: true }),
                //       'priceLists.defaultPriceList': true //(base ? base : { $ne: true })
                //   }, {
                'priceLists._id': ObjectId(options.priceList)
                    //   }]
            }
        },
        /*,{
                    $group : {
                        _id:
                    }
                }, */
    ], function(err, docs) {
        if (err)
            return self.throw500("err : /api/product/autocomplete" + err);

        if (!docs || !docs.length)
            return callback(null, { ok: false, pu_ht: 0, discount: 0, qtyMin: null, qtyMax: null });

        Pricebreak.set(docs[0].prices);

        //console.log(Pricebreak.humanize(true, 3));

        callback(null, { ok: true, pu_ht: Pricebreak.price(options.qty).price, discount: docs[0].discount || 0, qtyMin: docs[0].qtyMin, qtyMax: docs[0].qtyMax });
    });

};

exports.Schema = mongoose.model('productPrices', productPricesSchema, 'ProductPrices');
exports.name = "productPrices";

F.on('load', function() {

    var ProductPricesModel = exports.Schema;
    var PriceListModel = MODEL('priceList').Schema;
    var ProductModel = MODEL('product').Schema;

    // On refresh emit product
    // data : {data :{_id : product._id, }}
    F.functions.PubSub.on('product:updateDirectCost', function(channel, data) {
        //console.log(data);
        console.log("Update emit productPrice", data, channel);
        //return;
        switch (channel) {
            case 'product:updateDirectCost':
                if (data.data._id)
                    ProductPricesModel.find({ 'product': data.data._id })
                    //.populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                    .populate("priceLists")
                    .exec(function(err, pricesList) {
                        async.each(pricesList, function(prices, aCb) {
                            if (!prices.priceLists.isCoef)
                                return aCb();

                            prices.save(function(err, doc) {
                                if (err)
                                    return aCb(err);

                                // Emit to all that a productPrice in product list by coef was changed
                                //setTimeout2('productPrices:updatePrice_' + this._id.toString(), function() {
                                F.functions.PubSub.emit('productPrices:updatePrice', {
                                    data: doc
                                });
                                aCb();
                                //}, 5000);
                            });
                        }, function(err) {
                            if (err)
                                console.log(err);
                        });
                    });

                break;
        }
    });


    // Refresh prices on change Base price List or on discount productList
    F.functions.PubSub.on('productPrices:*', function(channel, data) {
        //console.log(data);
        console.log("Update emit productList updateDiscount", data, channel);
        //return;
        switch (channel) {
            // The discount changed in the productList : Destroy all prices and recreate all prices form parent priceList
            case 'productPrices:updateDiscountRate':
                if (!data.data._id)
                    return;

                if (!data.data.parent)
                    return;

                if (!data.data.isGlobalDiscount)
                    return;

                //Delete old PriceList
                ProductPricesModel.remove({ priceLists: data.data._id }, function(err, doc) {
                    //Load parent priceList
                    ProductPricesModel.find({ priceLists: data.data.parent }, function(err, docs) {
                        docs.forEach(function(elem) {
                            elem = elem.toObject();
                            delete elem._id;
                            delete elem.__v;
                            delete elem.createdAt;
                            delete elem.updatedAt;
                            elem.priceLists = data.data._id;

                            elem = new ProductPricesModel(elem);

                            for (var i = 0; i < elem.prices.length; i++) {
                                console.log(elem.prices[i]);
                                elem.prices[i].price = MODULE('utils').round(elem.prices[i].price * (1 - data.data.discount / 100), 3);
                                elem.prices[i].coef = 1;
                                elem.prices[i].coefTotal = 1;
                            }


                            elem.save(function(err) {
                                if (err)
                                    console.log("update priceList rte discout ", err);
                            });

                        });
                    });
                });

                break;
                // One element in the parent priceList changed, we must update all priceList that are parent form this priceList and are isGlobalDiscount
            case 'productPrices:updatePrice':

                // if data is from populate
                if (data && data.data && data.priceLists && data.data.priceLists._id)
                    data.data.priceLists = data.data.priceLists._id;

                if (!data.data.priceLists || !data.data.priceLists)
                    return;

                PriceListModel.find({ isGlobalDiscount: true, parent: data.data.priceLists }, function(err, docs) {
                    if (err || !docs || !docs.length)
                        return;

                    //console.log(docs);
                    docs.forEach(function(priceList) {
                        //Delete old PriceList
                        if (!data.data.product)
                            return;

                        ProductPricesModel.remove({ priceLists: priceList._id, product: data.data.product }, function(err, doc) {
                            //Load parent priceList

                            var elem = data.data;
                            delete elem._id;
                            delete elem.__v;
                            delete elem.createdAt;
                            delete elem.updatedAt;
                            elem.priceLists = priceList._id;

                            elem = new ProductPricesModel(elem);

                            for (var i = 0; i < elem.prices.length; i++) {
                                console.log(elem.prices[i]);
                                elem.prices[i].price = MODULE('utils').round(elem.prices[i].price * (1 - priceList.discount / 100), 3);
                                elem.prices[i].coef = 1;
                                elem.prices[i].coefTotal = 1;
                            }


                            elem.save(function(err) {
                                if (err)
                                    console.log("update priceList rte discout ", err);
                            });

                        });
                    });
                });

                break;
        }
    });
});