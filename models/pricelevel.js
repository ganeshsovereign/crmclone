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
    timestamps = require('mongoose-timestamp');

/**
 * Product PriceLevel Schema
 */
var priceLevelSchema = new Schema({
    price_level: {
        type: String,
        uppercase: true,
        require: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    // new price model
    prices: {
        pu_ht: {
            type: Number,
            default: 0
        }, // For base price
        pricesQty: {
            type: Schema.Types.Mixed
        } // For quantity price reduction
    },
    tms: Date,
    pu_ht: Number, //old
    qtyMin: {
        type: Number,
        default: 0
    },
    user_mod: {
        id: String,
        name: String
    },
    optional: Schema.Types.Mixed,
    discount: {
        type: Number,
        default: 0
    },
    history: [{
        tms: Date,
        user_mod: Schema.Types.Mixed,
        pu_ht: Number,
        qtyMin: {
            type: Number,
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        }
    }]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

priceLevelSchema.plugin(timestamps);

/*priceLevelSchema.virtual('pu_ht')
        .get(function () {
            return this.prices.pu_ht;
        });*/

priceLevelSchema.virtual('pricesDetails')
    .get(function() {
        var Pricebreak = INCLUDE('pricebreak');

        Pricebreak.set(this.prices.pu_ht, this.prices.pricesQty);

        return Pricebreak.humanize(true, 3);
    });

exports.Schema = mongoose.model('pricelevel', priceLevelSchema, 'PriceLevel');
exports.name = 'pricelevel';