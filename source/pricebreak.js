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



'use strict';

var _ = require('lodash');

function Pricebreak() {}

Pricebreak.prototype.set = function(breaks) {
    if (typeof breaks == 'undefined')
        breaks = [];

    //console.log(breaks);

    this.base = breaks[0].price;
    breaks.shift();
    this.breaks = breaks;

    this.sortedBreaks = _.map(breaks, function(elem) {
        return elem;
    }).sort(function(a, b) {
        return a.count - b.count;
    });
    //console.log(this.sortedBreaks);
};


/**
 * Calculate total price based on quantity.
 * @param quantity
 * @returns {number}
 */
Pricebreak.prototype.price = function(quantity) {
    var price = this.base;
    var max = 0;
    var self = this;

    // Fix for price == 0
    if (price == 0)
        return ({
            price: 0,
            total: 0
        });

    this.sortedBreaks
        .forEach(function(_break) {
            if (_break.count > max)
                max = _break.count;

            if (quantity >= _break.count) {
                price = _break.price;
            }
        });

    var total = MODULE('utils').round(quantity * (price || self.breaks[max].price), 2);

    return ({
        price: (price || self.breaks[max].price),
        total: total
    });
};

/**
 * Get an array of objects with humanized ranges and prices
 * @param vague - if true, display range as X+ instead of X-Y
 * @returns {Array}
 */
Pricebreak.prototype.humanize = function(vague, len) {
    var self = this;

    var statements = this.sortedBreaks.map(function(_break, idx, arr) {
        //console.log(_break, idx, arr);

        var nextBreak = (arr[idx + 1] ? arr[idx + 1].count : null);
        var start = _break.count;
        var end = 0;

        if (idx === arr.length - 1 || vague) {
            end = '+'; //old +
        } else {
            end = '-' + (nextBreak - 1);
        }

        return {
            range: start + end,
            rangeQty: start,
            price: MODULE('utils').round(_break.price, (len || 2))
        };
    });

    statements.unshift({
        range: '1' + ((vague) ? '+' : '-' + (self.sortedBreaks[0] - 1)),
        rangeQty: 1,
        price: MODULE('utils').round(self.base, (len || 2))
    });

    return statements;
};

module.exports = new Pricebreak();