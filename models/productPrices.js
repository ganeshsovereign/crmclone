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
    price: { type: Number, default: 0 }, // pu_ht dynamic
    specialPrice: { type: Number, default: null },
    coef: { type: Number, default: 1 }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

var productPricesSchema = new Schema({
    priceLists: { type: ObjectId, ref: 'priceList' },
    product: { type: ObjectId, ref: 'product' },
    basePrice: { type: Number, default: 0 }, // Price base for coefficient if coef mode in priceList
    prices: [priceSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null },
    editedBy: { type: Schema.Types.ObjectId, ref: 'rh', default: null }
});

productPricesSchema.plugin(timestamps);

productPricesSchema.index({ priceLists: 1, product: 1 }, { unique: true });

/*priceLevelSchema.virtual('pricesDetails')
    .get(function() {
        var Pricebreak = INCLUDE('pricebreak');

        Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

        return Pricebreak.humanize(true, 3);
    });*/


productPricesSchema.pre('save', function(next) {
    var self = this;

    var ProductModel = MODEL('product').Schema;

    ProductModel.findOne({ _id: this.product }, "info")
        .populate("info.productType", "coef")
        .exec(function(err, product) {
            if (err)
                return next(err);

            var coef = product.info.productType.coef;

            console.log("coef", coef);

            /* coef mode */
            if (coef) {
                //Recalcul product prices
                self.prices.each(function(price) {
                    price.price = self.basePrice * price.coef * (1 - price.discount);
                });
            }

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