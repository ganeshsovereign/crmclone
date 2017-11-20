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
    _ = require('lodash'),
    async = require('async'),
    moment = require('moment'),
    timestamps = require('mongoose-timestamp');

var setRound3 = MODULE('utils').setRound3;

var priceSchema = new Schema({
    _id: false,
    count: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0,
        set: setRound3
    }, // pu_ht
    coef: {
        type: Number,
        default: 1,
        set: setRound3
    }, //TODO REMOVE ???
    coefTotal: {
        type: Number,
        default: 1
    } //Sum coef * familyCoef //TODO REMOVE ???
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

var productPricesSchema = new Schema({
    priceLists: {
        type: ObjectId,
        ref: 'priceList'
    },
    product: {
        type: ObjectId,
        ref: 'product'
    },
    prices: [priceSchema],
    discount: {
        type: Number,
        default: 0
    },
    qtyMin: {
        type: Number,
        default: 0
    },
    qtyMax: {
        type: Number
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'rh',
        default: null
    },
    editedBy: {
        type: Schema.Types.ObjectId,
        ref: 'rh',
        default: null
    }
});

productPricesSchema.plugin(timestamps);

productPricesSchema.index({
    priceLists: 1,
    product: 1
}, {
    unique: true
});

/*productPricesSchema.pre('save', function(next) {
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

                    if (!self.product || !self.product.sellFamily)
                        return cb("Product with unknown family " + self.product);

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

                // coef mode
                if (coef && self.priceLists.cost != true) {
                    //Recalcul product prices
                    self.prices = [];

                    if (!product.sellFamily.discounts.length)
                        console.log('Error family configuration : no discount', product.sellFamily._id);

                    for (var i = 0; i < product.sellFamily.discounts.length; i++) {
                        var price = {};
                        price.count = product.sellFamily.discounts[i].count;
                        price.coef = (family && family.coef || 1) * (1 - product.sellFamily.discounts[i].discount / 100);
                        price.price = round(product.totalCost * price.coef, 3);
                        self.prices.push(price);
                    }
                }

                if (self.priceLists.defaultPriceList == true && self.isModified('prices') && self.prices.length)
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
});*/

productPricesSchema.statics.refreshByIdCoefPrice = function(id, options, callback) {
    var prices = [];
    var self = this;
    var ProductFamilyCoefModel = MODEL('productFamilyCoef').Schema;
    var round = MODULE('utils').round;

    if (!options.product)
        return callback("Error product null");

    if (!options.product.sellFamily || !options.product.sellFamily.discounts || !options.product.sellFamily.discounts.length)
        return callback({
            error: 'Error family configuration : no discount ' + options.product.sellFamily.langs[0].name,
            url: {
                module: 'product.family.show',
                params: {
                    Id: options.product.sellFamily._id
                }
            }
        });

    async.waterfall([
            function(wCb) {
                if (options.familyCoef && options.familyCoef.coef)
                    return wCb(null, options.familyCoef.coef);

                if (!options.priceList)
                    return wCb("Empty priceList");

                ProductFamilyCoefModel.findOne({
                    priceLists: options.priceList._id,
                    family: product.sellFamily._id
                }, function(err, family) {
                    if (err)
                        return wCb(err);
                    if (!family || !family.coef)
                        return wCb({
                            error: 'Error family configuration : no coef ' + options.product.sellFamily.langs[0].name,
                            url: {
                                module: 'product.family.show',
                                params: {
                                    Id: options.product.sellFamily._id
                                }
                            }
                        });

                    return wCb(null, family.coef);
                });
            },
            function(coef, wCb) {
                for (var i = 0; i < options.product.sellFamily.discounts.length; i++) {
                    let ObjPrice = {};
                    ObjPrice.count = options.product.sellFamily.discounts[i].count;
                    ObjPrice.coef = coef * (1 - options.product.sellFamily.discounts[i].discount / 100);
                    ObjPrice.price = round(options.product.totalCost * ObjPrice.coef, 3);
                    prices.push(ObjPrice);
                }

                wCb(null, prices);
            }
        ],
        function(err, prices) {
            if (err) {
                if (typeof err == 'object')
                    return callback(err);
                else return callback({
                    error: err
                });
            }

            self.findByIdAndUpdate(id, {
                prices: prices
            }, {
                new: true
            }, function(err, productPrice) {
                if (err)
                    return callback({
                        error: err.toString()
                    });

                if (!productPrice || !productPrice._id)
                    return callback('No pricing create!');

                productPrice.populate("priceLists", function(err, productPrice) {
                    var ProductModel = MODEL('product').Schema;
                    // Update default price in product
                    if (productPrice.priceLists.defaultPriceList != true || !productPrice.prices.length)
                        return callback(null, productPrice);

                    ProductModel.findByIdAndUpdate(productPrice.product, {
                        'prices.pu_ht': productPrice.prices[0].price
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return callback(err);

                        //Emit product update
                        setTimeout2('product:' + doc._id.toString(), function() {
                            F.emit('product:update', {
                                userId: null,
                                product: {
                                    _id: doc._id.toString()
                                }
                            });
                        }, 1000);

                        callback(null, productPrice);
                    });
                });
            });
        });
};

productPricesSchema.statics.findPrice = function(options, fields, callback) {
    var self = this;
    var ObjectId = MODULE('utils').ObjectId;
    var PriceListModel = MODEL('priceList').Schema;
    var round = MODULE('utils').round;

    var Pricebreak = INCLUDE('pricebreak');
    var query = {};

    //if (options.priceList)
    //    query.priceLists = ObjectId(options.priceList);

    if (typeof fields === 'function') {
        callback = fields;
        fields = "prices discount";
    } else if (options.ref)
        query.ref = options.ref;

    //console.log(options, query);

    async.waterfall([
            function(wCb) {
                PriceListModel.findById(options.priceLists, function(err, priceList) {
                    if (err || !priceList)
                        return wCb("No priceList Found !!!! " + err);

                    if (priceList.isGlobalDiscount)
                        return wCb(null, priceList.parent, priceList.discount);

                    //If expired priceList
                    if (priceList.isFixed) {
                        if (!priceList.dateExpiration)
                            return wCb(null, priceList._id, 0);

                        //With a dateExpiration
                        if (priceList.dateExpiration && moment(priceList.dateExpiration).isAfter()) //date not expired
                            return wCb(null, priceList._id, 0);
                        else
                            return wCb(null, priceList.parent, 0); //expired use parent
                    }

                    return wCb(null, priceList._id, 0); // Normal price
                });
            },
            function(priceLists, discount, wCb) {
                self.findOne({
                        product: options.product,
                        priceLists: priceLists
                    })
                    .populate("priceLists")
                    .exec(function(err, doc) {
                        if (err)
                            return wCb(err);

                        //console.log(priceLists, doc);

                        //Found a price
                        if (doc && doc.priceLists)
                            return wCb(null, doc, discount);

                        // No price get priceList so fixed price we used parent
                        PriceListModel.findById(priceLists, function(err, priceList) {
                            if (err)
                                return wCb(err);

                            if (!priceList.parent)
                                return wCb("No parent priceList");

                            return self.findOne({
                                    product: options.product,
                                    priceLists: priceList.parent
                                })
                                .populate("priceLists")
                                .exec(function(err, doc2) {
                                    if (err)
                                        return wCb(err);

                                    if (doc2)
                                        return wCb(null, doc2, priceList.discount || 0);

                                    PriceListModel.findById(priceList.parent, function(err, priceList) {
                                        if (err)
                                            return wCb(err);

                                        if (!priceList || !priceList.parent)
                                            return wCb("Error no parent price");

                                        return self.findOne({
                                                product: options.product,
                                                priceLists: priceList.parent
                                            })
                                            .populate("priceLists")
                                            .exec(function(err, doc3) {
                                                if (err)
                                                    return wCb(err);

                                                return wCb(null, doc3, priceList.discount || 0);
                                            });
                                    });
                                });
                        });
                    });
            },
            function(price, discount, wCb) {
                //if isFixed price but no price in priceList use parent price
                if (price)
                    return wCb(null, price, discount);

                return wCb("No priceList Found !!!! " + err);
            }
        ],
        function(err, doc, discount) {
            /*this.aggregate([{
                    $match: query
                },
                {
                    $lookup: {
                        from: 'PriceList',
                        localField: 'priceLists',
                        foreignField: '_id',
                        as: 'priceLists'
                    }
                },
                {
                            $unwind: '$priceLists'
                        },
                {
                    $match: {
                        //   $or: [{
                        // 'priceLists.cost': (cost ? cost : { $ne: true }),
                        //       'priceLists.defaultPriceList': true //(base ? base : { $ne: true })
                        //   }, {
                        'priceLists._id': ObjectId(options.priceList)
                            //   }]
                    }
                }
            ], function(err, docs) {*/

            //console.log(doc, discount);
            if (err) {
                console.log(err);
                return callback(err);
            }

            if (!doc)
                return callback(null, {
                    ok: false,
                    pu_ht: 0,
                    discount: 0,
                    qtyMin: null,
                    qtyMax: null,
                    isFixed: false
                });

            //console.log(doc, options);
            Pricebreak.set(doc.prices);

            //console.log(Pricebreak.humanize(true, 3));
            var pu_ht = Pricebreak.price(options.qty).price;
            if (discount)
                pu_ht = round(pu_ht * (1 - discount / 100), 3);

            callback(null, {
                priceList: doc.priceLists.priceListCode,
                ok: true,
                isFixed: doc.priceLists.isFixed,
                pu_ht: pu_ht,
                discount: doc.discount || 0,
                qtyMin: doc.qtyMin,
                qtyMax: doc.qtyMax
            });
        });

};

exports.Schema = mongoose.model('productPrices', productPricesSchema, 'ProductPrices');
exports.name = "productPrices";

F.on('load', function() {
    const ProductPricesModel = exports.Schema;
    const PriceListModel = MODEL('priceList').Schema;
    const ProductModel = MODEL('product').Schema;
    const ProductFamilyCoefModel = MODEL('productFamilyCoef').Schema;
    const round = MODULE('utils').round;

    // On refresh emit product
    // data : {data :{_id : product._id, }}
    F.on('productPrices:updatePrice', function(data) {

        if (!data.price)
            return;

        const userId = data.userId;

        //console.log(data);
        console.log("Update emit productPrice", data.price);

        // One element in the parent priceList changed, we must update all priceList that are parent form this priceList and are isGlobalDiscount

        async.waterfall([
            function(cb) {
                //Load price
                ProductPricesModel.findById(data.price._id, "_id product priceLists prices")
                    .populate("priceLists", "cost")
                    .exec(cb);
            },
            function(price, cb) {
                if (!price)
                    return cb(null, null, null);

                ProductModel.findOne({
                        _id: price.product
                    }, "info directCost indirectCost prices pack createdAt sellFamily")
                    .populate("sellFamily")
                    .exec(function(err, product) {
                        if (err)
                            return cb(err);

                        if (!product || !product.sellFamily)
                            return cb("Product with unknown family " + product);

                        return cb(null, price, product);
                    });
            },
            function(price, product, cb) {
                if (!price)
                    return cb();

                if (price.priceLists.cost != true)
                    return cb();

                product.directCost = round(price.prices[0].price, 3);
                product.indirectCost = round(product.directCost * product.sellFamily.indirectCostRate / 100, 3);
                product.save(function(err, doc) {
                    if (err)
                        return cb(err);

                    if (userId)
                        F.emit('notify:controllerAngular', {
                            userId: userId,
                            route: 'product',
                            _id: product._id.toString(),
                            message: "Produit " + product.info.SKU + ' modifie.'
                        });

                });
            }
        ], function(err) {
            if (err)
                return console.log("update updateDirectCost error " + err);

        });

    });


    // Refresh prices on change Base price List or on discount productList
    /* F.functions.PubSub.on('productPrices:*', function(channel, data) {
         //console.log(data);
         console.log("Update emit productList updateDiscount", channel);
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
                 ProductPricesModel.remove({
                     priceLists: data.data._id
                 }, function(err, doc) {
                     //Load parent priceList
                     ProductPricesModel.find({
                         priceLists: data.data.parent
                     }, function(err, docs) {
                         docs.forEach(function(elem) {
                             elem = elem.toObject();
                             delete elem._id;
                             delete elem.__v;
                             delete elem.createdAt;
                             delete elem.updatedAt;
                             elem.priceLists = data.data._id;

                             elem = new ProductPricesModel(elem);

                             for (var i = 0; i < elem.prices.length; i++) {
                                 //console.log(elem.prices[i]);
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

                 if (!data.data || !data.data.priceLists)
                     return;

                 PriceListModel.find({
                     isGlobalDiscount: true,
                     parent: data.data.priceLists
                 }, function(err, docs) {
                     if (err || !docs || !docs.length)
                         return;

                     //console.log(docs);
                     docs.forEach(function(priceList) {
                         //Delete old PriceList
                         if (!data.data.product)
                             return;

                         ProductPricesModel.remove({
                             priceLists: priceList._id,
                             product: data.data.product
                         }, function(err, doc) {
                             //Load parent priceList

                             var elem = data.data;
                             delete elem._id;
                             delete elem.__v;
                             delete elem.createdAt;
                             delete elem.updatedAt;
                             elem.priceLists = priceList._id;

                             elem = new ProductPricesModel(elem);

                             for (var i = 0; i < elem.prices.length; i++) {
                                 //console.log(elem.prices[i]);
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
     });*/
});