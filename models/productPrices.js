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
    createdBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null },
    editedBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null }
});

productPricesSchema.plugin(timestamps);

productPricesSchema.index({ priceLists: 1, product: 1 }, { unique: true });

productPricesSchema.pre('save', function(next) {
    var self = this;
    var ProductModel = MODEL('product').Schema;
    var ProductFamilyCoefModel = MODEL('productFamilyCoef').Schema;

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
                var coef = product.sellFamily.isCoef;

                if (self.priceLists.cost == true && self.isModified('prices')) {
                    product.directCost = self.prices[0].price;
                    product.save(function(err, doc) {
                        if (err)
                            return cb(err);

                    });
                }

                /* coef mode */
                if (coef && self.priceLists.cost != true) {
                    //Recalcul product prices
                    self.prices = _.each(self.prices, function(price) {
                        price.coefTotal = (family.coef || 1) * price.coef;
                        price.price = product.totalCost * price.coefTotal;
                    });
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

    console.log(options, query);

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

        //console.log(docs[0].prices);

        Pricebreak.set(docs[0].prices);

        //console.log(Pricebreak.humanize(true, 3));

        callback(null, { pu_ht: Pricebreak.price(options.qty).price, discount: docs[0].discount || 0 });
    });

};

exports.Schema = mongoose.model('productPrices', productPricesSchema, 'ProductPrices');
exports.name = "productPrices";

F.on('load', function() {
    // On refresh emit product
    F.functions.PubSub.on('product:updateDirectCost', function(channel, data) {
        //console.log(data);
        console.log("Update emit productPrice", data);
        //return;
        switch (channel) {
            case 'product:updateDirectCost':
                if (data.data._id)
                    exports.Schema.find({ 'product': data.data._id })
                    .populate({ path: 'product', select: 'sellFamily', populate: { path: "sellFamily" } })
                    .populate("priceLists")
                    .exec(function(err, pricesList) {
                        pricesList.forEach(function(prices) {
                            if (!prices.product.sellFamily.isCoef)
                                return;

                            prices.save(function(err, doc) {
                                if (err)
                                    return console.log(err);
                            });
                        });
                    });
                break;
        }
    });
});