"use strict";

var fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    moment = require("moment"),
    async = require('async');

exports.name = 'productPrices';
exports.version = '1.01';

exports.Services = function() {
    var Dict = INCLUDE('dict');

    var round = MODULE('utils').round;

    return new function() {
        this.read = function() {
            //console.log("toto");
            var self = this;
            var query = self.query;
            var ProductPricesModel = MODEL('productPrices').Schema;
            var ObjectId = MODULE('utils').ObjectId;

            var priceList = query.priceList ? ObjectId(query.priceList) : null;
            var product = query.product ? ObjectId(query.product) : null;

            var cost = false;

            query = {};
            var sort = 'product.name';

            if (priceList)
                query.priceLists = priceList;

            if (product) {
                query.product = product;
                sort = 'priceLists.priceListCode';
            }

            if (self.query.cost)
                cost = true;

            ProductPricesModel.find(query)
                .populate({
                    path: "product",
                    select: "weight name taxes info directCost indirectCost",
                    populate: { path: 'taxes.taxeId' }
                })
                .populate("priceLists")
                .lean()
                .exec(function(err, prices) {
                    if (err)
                        return self.throw500(err);

                    if (prices == null)
                        prices = [];

                    prices = _.filter(prices, function(price) {
                        return price.priceLists.cost === cost;
                    });

                    for (var j = 0, len = prices.length; j < len; j++) {
                        var price = prices[j];

                        //console.log(price);
                        //build TTC price
                        for (var i = 0; i < price.prices.length; i++) {
                            price.prices[i].margin = {
                                value: MODULE('utils').round(price.prices[i].price - price.product.directCost - price.product.indirectCost, 3),
                                rate: MODULE('utils').round((price.prices[i].price - price.product.directCost - price.product.indirectCost) / price.prices[i].price * 100, 2)
                            };
                            if (price.prices[i].specialPrice)
                                price.prices[i].priceTTC = MODULE('utils').round(price.prices[i].specialPrice * (1 + price.product.taxes[0].taxeId.rate / 100));
                            else
                                price.prices[i].priceTTC = MODULE('utils').round(price.prices[i].price * (1 + price.product.taxes[0].taxeId.rate / 100), 3);

                        }
                    }

                    //console.log(prices);

                    prices = _.sortBy(prices, sort);

                    self.json(prices);
                });
        };
        this.update = function(id) {
            var self = this;
            var ProductPricesModel = MODEL('productPrices').Schema;

            ProductPricesModel.findOne({ _id: id })
                //.populate({ path: 'product', select: '_id directCost info', populate: { path: "info.productType", select: "coef" } })
                .populate("priceLists", "cost")
                .exec(function(err, doc) {
                    if (err) {
                        console.log(err);
                        return self.json({
                            errorNotify: {
                                title: 'Erreur',
                                message: err
                            }
                        });
                    }

                    doc = _.extend(doc, self.body);
                    doc.editedBy = self.user._id;

                    doc.save(function(err, doc) {
                        if (err) {
                            console.log(err);
                            return self.json({
                                errorNotify: {
                                    title: 'Erreur',
                                    message: err
                                }
                            });
                        }

                        //console.log(doc);
                        doc = doc.toObject();
                        doc.successNotify = {
                            title: "Success",
                            message: "Prix enregistree"
                        };
                        self.json(doc);
                    });
                });
        };
        this.add = function() {
            var self = this;
            var ProductPricesModel = MODEL('productPrices').Schema;
            var price = new ProductPricesModel(self.body);

            price.editedBy = self.user._id;
            price.createdBy = self.user._id;

            if (!price.product || !price.priceLists)
                return self.throw500("Empty product or priceLists");

            return price.populate("priceLists", function(err, price) {
                price.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                        return self.json({
                            errorNotify: {
                                title: 'Erreur',
                                message: err
                            }
                        });
                    }

                    //console.log(doc);
                    doc = doc.toObject();
                    doc.successNotify = {
                        title: "Success",
                        message: "Nouveau prix enregistree"
                    };
                    self.json(doc);
                });
            });
        };
        this.delete = function(id) {
            var self = this;
            var ProductPricesModel = MODEL('productPrices').Schema;
            ProductPricesModel.remove({
                _id: id
            }, function(err) {
                if (err)
                    return self.throw500(err);

                self.json({});
            });
        };
        this.autocomplete = function(body, callback) {
            var PriceLevelModel = MODEL('pricelevel').Schema;

            var query = {
                "product.name": new RegExp(body.filter.filters[0].value, "i"),
                price_level: body.price_level
            };

            var dict = {};

            //console.log(body);

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

            PriceLevelModel.find(query, "-history", {
                    limit: body.take
                })
                .populate("product", "_id label ref minPrice tva_tx caFamily units discount dynForm")
                .sort({ ref: 1 })
                .exec(function(err, prices) {
                    if (err) {
                        console.log("err : /api/product/price/autocomplete");
                        console.log(err);
                        return;
                    }

                    // filter array on caFamily
                    if (body.family)
                        prices = prices.filter(function(doc) {
                            return (doc.product.caFamily === body.family);
                        });

                    //console.log(prices);

                    var result = [];

                    for (var i = 0; i < prices.length; i++) {

                        var units = prices[i].product.units;
                        var res = {};

                        if (units && dict.fk_units.values[units].label) {
                            //console.log(this);
                            res.id = units;
                            res.name = i18n.t("products:" + dict.fk_units.values[units].label);
                        } else { // By default
                            res.id = units;
                            res.name = units;
                        }

                        var obj = {
                            pu_ht: prices[i].pu_ht,
                            price_level: prices[i].price_level,
                            discount: prices[i].discount,
                            qtyMin: 0,
                            product: {
                                id: prices[i].product._id,
                                name: prices[i].product.ref,
                                unit: res.name,
                                label: prices[i].product.label,
                                dynForm: prices[i].product.dynForm,
                                caFamily: prices[i].product.caFamily
                            }
                        };
                        result.push(obj);
                    }

                    //prices[i].product._units = res;

                    //console.log(result);
                    callback(result);
                });
        };
        this.upgrade = function(req, res) {
            var PriceLevelModel = MODEL('pricelevel').Schema;

            ProductModel.find(function(err, products) {
                async.each(products, function(product, callback) {

                    for (var i = 0; i < product.price.length; i++) {
                        if (product.price[i].price_level === 'BASE')
                            ProductModel.update({
                                    _id: product._id
                                }, {
                                    pu_ht: product.price[i].pu_ht,
                                    tva_tx: product.price[i].tva_tx,
                                    tms: product.price[i].tms
                                }, {
                                    upsert: false
                                },
                                function(err, numberAffected, price) {
                                    if (err)
                                        return console.log(err);

                                    //console.log(price);
                                });
                        else
                            PriceLevelModel.update({
                                    product: product._id,
                                    price_level: product.price[i].price_level,
                                    qtyMin: product.price[i].qtyMin
                                }, {
                                    product: {
                                        id: product._id,
                                        name: product.ref
                                    },
                                    price_level: product.price[i].price_level,
                                    tms: product.price[i].tms,
                                    pu_ht: product.price[i].pu_ht,
                                    qtyMin: product.price[i].qtyMin,
                                    user_mod: product.price[i].user_mod,
                                    optional: {
                                        ref_customer_code: product.price[i].ref_customer_code,
                                        dsf_coef: product.price[i].dsf_coef,
                                        dsf_time: product.price[i].dsf_time
                                    },
                                    $addToSet: {
                                        history: {
                                            tms: product.price[i].tms,
                                            user_mod: product.price[i].user_mod,
                                            pu_ht: product.price[i].pu_ht,
                                            qtyMin: product.price[i].qtyMin
                                        }
                                    }
                                }, {
                                    upsert: true
                                },
                                function(err, numberAffected, price) {
                                    if (err)
                                        return console.log(err);

                                    //console.log(price);
                                });
                    }

                    callback();
                }, function(err) {
                    if (err)
                        return res.json(err);
                    res.send(200);
                });
            });
        };
        this.findOne = function(id, price_level, callback) {
            var PriceLevelModel = MODEL('pricelevel').Schema;

            PriceLevelModel.findOne({ price_level: price_level, product: id }, "product prices discount price_level")
                //.populate("product", "label ref minPrice tva_tx caFamily units discount dynForm")
                //.sort({ref: 1})
                .exec(function(err, price) {
                    if (err) {
                        console.log("err : /erp/api/product/price/findOne");
                        console.log(err);
                        return;
                    }

                    var result;

                    if (price)
                        result = {
                            _id: price.product,
                            prices: price.prices,
                            price_level: price.price_level,
                            pu_ht: price.prices.pu_ht,
                            discount: price.discount
                        };


                    callback(err, result);
                });
        };
        this.find = function(refs, price_level, callback) {
            var PriceLevelModel = MODEL('pricelevel').Schema;

            //var query = {
            //    "product.name": ref,
            //    price_level: price_level
            //};

            var dict = {};

            //console.log(body);

            //console.log(refs);

            PriceLevelModel.find({ price_level: price_level, 'product': { $in: refs } }, "product prices price_level")
                //.populate("product", "label ref minPrice tva_tx caFamily units discount dynForm")
                //.sort({ref: 1})
                .exec(function(err, prices) {
                    if (err) {
                        console.log("err : /api/product/price/autocomplete");
                        console.log(err);
                        return;
                    }

                    var result = [];

                    for (var i = 0, len = prices.length; i < len; i++) {
                        result.push({
                            _id: prices[i].product,
                            prices: prices[i].prices,
                            price_level: prices[i].price_level,
                            pu_ht: prices[i].prices.pu_ht
                        });
                    }

                    callback(result);
                });
        };
    };
};