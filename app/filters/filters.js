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
/* global angular: true */

MetronicApp.filter('euro', function() {
    return function(text, size) {

        size = size || 2;

        if (isNaN(text))
            return text;

        text = Math.round(Math.pow(10, size) * text) / Math.pow(10, size);

        text = text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
        var t = text + ' €';
        return t;
    };
});

MetronicApp.filter('percent', function() {
    return function(text, size) {

        if (size == null)
            size = 2;

        if (isNaN(text))
            return text;

        text = Math.round(Math.pow(10, size) * text) / Math.pow(10, size);

        text = text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
        var t = text + ' %';
        return t;
    };
});

MetronicApp.filter('object2Array', function() {
    return function(input) {
        var out = [];
        for (var i in input) {
            if (!input[i])
                continue;

            input[i].id = i;
            out.push(input[i]);
        }
        return out;
    };
});

MetronicApp.filter('capitalize', function() {
    return function(input, scope) {
        if (input == null)
            return;

        input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
});

MetronicApp.filter('phone', function() {
    return function(tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) { // NOT a NUMBER
            return tel;
        }

        if (value.match(/^0/)) { // Start with 0
            country = value.slice(0, 1);
            city = "";
            number = value.slice(4);
            return country + city + value.slice(1, 2) + "." + value.slice(2, 4) + "." + value.slice(4, 6) + "." + value.slice(6, 8) + "." + value.slice(8);
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

                /*case 11: // +CPPP####### -> CCC (PP) ###-####
                 country = value[0];
                 city = value.slice(1, 4);
                 number = value.slice(4);
                 break;*/

            case 11: // +33####### -> +33 (0)#.##.##.##.##
                country = value.slice(0, 2);
                city = " (0)";
                number = value.slice(4);
                return "+" + country + city + value.slice(2, 3) + "." + value.slice(3, 5) + "." + value.slice(5, 7) + "." + value.slice(7, 9) + "." + value.slice(9);

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});

MetronicApp.filter('makeRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
            result.push(i);
        return result;
    };
});

MetronicApp.filter('userGroupArrayFilter', function() {
    return function(myArray) {
        return myArray.join(', ');
    };
});

MetronicApp.filter('tag', function() {
    return function(array) {

        var t = "";

        if (array)
            for (var i = 0, len = array.length; i < len; i++) {
                if (i > 0)
                    t += ", ";

                if (typeof array[i] === 'object')
                    t += array[i].text;
                else
                    t += array[i];
            }

        return t;
    };
});

MetronicApp.filter('unique', function() {

    return function(items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

/*
 * Special for ng-repeat on accounting for credit or debit
 */
MetronicApp.filter('filterAmount', function() {
    return function(data, filter) {
        if (!filter)
            return data;

        var items = {
            amount: filter,
            out: []
        };
        angular.forEach(data, function(value, key) {

            if (this.amount == value.credit || this.amount == value.debit) {
                this.out.push(value);
            }
        }, items);
        return items.out;
    };
});

MetronicApp.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});

MetronicApp.filter('monthName', [function() {
    return function(monthNumber) { //1 = January
        var monthNames = ['Jan', 'Fev', 'Mar', 'Avril', 'Mai', 'Juin',
            'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        return monthNames[monthNumber - 1];
    };
}]);

MetronicApp.filter('filterToggleSelection', function() {
    return function(input, tab, mode) {
        //console.log(input, tab);
        if (!input)
            return [];

        var resultNotSelected = [];
        var resultSelected = [];

        for (var i = 0; i < input.length; i++) {
            if (tab.indexOf(input[i]._id) >= 0)
                resultSelected.push(input[i]);
            else
                resultNotSelected.push(input[i]);
        }

        if (mode == true)
            return resultSelected;
        return resultNotSelected;
    };
});