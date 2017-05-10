"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var setRound3 = MODULE('utils').setRound3;

var productFamilyCoefSchema = new Schema({
    priceLists: { type: ObjectId, ref: 'priceList' },
    family: { type: ObjectId, ref: 'productFamily' },
    coef: { type: Number, min: 0, default: 1, set: setRound3 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null },
    editedBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null }
});

productFamilyCoefSchema.plugin(timestamps);

productFamilyCoefSchema.index({ priceLists: 1, family: 1 }, { unique: true });

productFamilyCoefSchema.pre('save', function(next) {
    var self = this;
    /*var ProductModel = MODEL('product').Schema;

    ProductModel.findOne({ _id: this.product }, "info directCost prices pack createdAt sellFamily")
        .populate("sellFamily")
        .exec(function(err, product) {
            if (err)
                return next(err);

            console.log(self);
            var coef = product.sellFamily.coef;

            if (self.priceLists.cost == true && self.isModified('prices')) {
                product.directCost = self.prices[0].price;
                product.save(function(err, doc) {
                    if (err)
                        return console.log(err);
                });
            }

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
        });*/
    next();
});

exports.Schema = mongoose.model('productFamilyCoef', productFamilyCoefSchema, 'ProductFamilyCoef');
exports.name = "productFamilyCoef";