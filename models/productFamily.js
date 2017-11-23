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
    Schema = mongoose.Schema;

var setRound3 = MODULE('utils').setRound3;

var discountSchema = new Schema({
    _id: false,
    count: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0,
        set: setRound3
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

var productFamiliesSchema = new Schema({
    langs: [{
        _id: false,
        name: String
    }],

    entity: [String], // NOT Used
    //isCoef: { type: Boolean, default: false }, //Price was calculated from a coefficient
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isCost: {
        type: Boolean,
        default: false
    },
    sequence: {
        type: Number,
        default: 0
    }, // sort list
    indirectCostRate: {
        type: Number,
        default: 0
    }, // % based on cost Direct Price
    minMargin: {
        type: Number,
        default: 0
    },

    options: [{
        type: Schema.Types.ObjectId,
        ref: 'productAttributes'
    }], //attributes
    variants: [{
        type: Schema.Types.ObjectId,
        ref: 'productAttributes'
    }], //isVariant

    discounts: [discountSchema],

    accounts: [{
        _id: false,
        code: String,
        account: {
            type: String,
            set: MODULE('utils').setAccount,
            trim: true
        } //sell ou buy
    }]
}, {
    collection: 'productFamily',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

productFamiliesSchema.virtual('name').get(function() {
    return this.langs[0].name;
});

productFamiliesSchema.pre('save', function(next) {
    var self = this;

    if (!this.discounts || this.discounts.length == 0)
        this.discounts = [{
            "discount": 0,
            "count": 0
        }];
    next();
});



exports.Schema = mongoose.model('productFamily', productFamiliesSchema);
exports.name = "productFamily";

F.on('load', function() {

    const ProductModel = MODEL('product').Schema;
    const round = MODULE('utils').round;

    F.on('productFamily:update', function(data) {
        if (!data.family || !data.family._id)
            return;

        if (!data.family.indirectCostRate)
            return;

        if (data.family.isCost)
            return;

        console.log("Update emit productFamily update", data);

        const family = data.family;

        ProductModel.find({
            sellFamily: family._id
        }, function(err, docs) {
            if (!docs)
                return;

            async.each(docs, function(elem, aCb) {
                elem.indirectCost = round(elem.directCost * family.indirectCostRate / 100, 3);
                elem.editedBy = data.userId;
                elem.save(aCb);
            }, function(err) {
                if (err)
                    return console.log("update productFamily error ", err);
            });
        });
    });

    F.on('productFamily:coefUpdate', function(data) {
        if (!data.family || !data.family._id)
            return;

        if (!data.productFamilyCoef || !data.productFamilyCoef._id)
            return;

        if (data.isCost)
            return;

        console.log("Update emit productFamily coefUpdate", data);

        ProductModel.find({
            sellFamily: data.family._id
        }, function(err, docs) {
            if (!docs)
                return;

            async.eachLimit(docs, 100, function(elem, aCb) {
                console.log(elem);

                setTimeout2('product:' + elem._id.toString(), function() {
                    F.emit('product:updateDirectCost', {
                        userId: data.userId,
                        product: {
                            _id: elem._id.toString()
                        }
                    });
                }, 500);

                elem.save(aCb);

            }, function(err) {
                if (err)
                    return console.log("update productFamily error ", err);
            });
        });
    });
});