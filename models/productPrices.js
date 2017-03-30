"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var priceSchema = new Schema({
    _id: false,
    count: { type: Number, default: 0 },
    price: { type: Number, default: 0 }, // pu_ht
    coef: { type: Number, default: 1 }
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

    ProductModel.findOne({ _id: this.product }, "info directCost prices pack createdAt")
        .populate("info.productType", "coef")
        .exec(function(err, product) {
            if (err)
                return next(err);

            var coef = product.info.productType.coef;

            if (self.priceLists.cost == true && self.isModified('prices')) {
                product.directCost = self.prices[0].price;
                product.save(function(err, doc) {
                    if (err)
                        return console.log(err);
                });
            }

            /* coef mode */
            if (coef && self.priceLists.cost != true) {
                //Recalcul product prices
                self.prices = _.each(self.prices, function(price) {
                    price.price = product.directCost * price.coef;
                });
            }

            if (self.priceLists.defaultPriceList == true && self.isModified('prices'))
                product.update({ $set: { 'prices.pu_ht': self.prices[0].price } }, function(err, doc) {
                    if (err)
                        return console.log(err);
                });


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
                    .populate({ path: 'product', select: 'info', populate: { path: "info.productType", select: "coef" } })
                    .populate("priceLists")
                    .exec(function(err, pricesList) {
                        pricesList.forEach(function(prices) {
                            if (!prices.product.info.productType.coef)
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