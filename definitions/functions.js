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



var moment = require('moment');


var numberFormat = function(number, width) {
    //console.log("number : " + number);
    //console.log("width : " + width);
    //console.log(number + '');
    return new Array(width + 1 - (number + '').length).join('0') + number;
};



F.functions.refreshSeq = function(ref, date) {
    if (!ref)
        return null;

    date = new moment(date);

    var split = ref.split('-');

    split[0] = split[0].substring(0, split[0].length - 4);

    return split[0] + date.format("YY") + date.format("MM") + "-" + split[1];
};

var mongoose = require('mongoose');
Array.prototype.objectID = function() {
    var _arrayOfID = [];
    var objectId = mongoose.Types.ObjectId;
    var i;

    for (i = 0; i < this.length; i++) {
        if (this[i] && typeof this[i] === 'object' && this[i].hasOwnProperty('_id')) {
            _arrayOfID.push(this[i]._id);
        } else if (this[i] && typeof this[i] === 'object') {
            _arrayOfID.push(this[i]);
        } else {
            if (typeof this[i] === 'string' && this[i].length === 24) {
                _arrayOfID.push(objectId(this[i]));
            }
            if (this[i] === null || this[i] === 'null') {
                _arrayOfID.push(null);
            }

        }
    }
    return _arrayOfID;
};

Array.prototype.toStringObjectIds = function() {
    var ObjectId = mongoose.Types.ObjectId;
    var arr = this.map(function(_objectId) {
        if (_objectId instanceof ObjectId) {
            return _objectId.toString();
        } else if (typeof _objectId === 'string') {
            return _objectId;
        } else {
            throw new Error({
                message: 'Incorrect value for ObjectId'
            });
        }
    });

    return arr;
};

Array.prototype.toNumber = function() {
    var _arrayOfNumbers = [];
    var el;
    var value;
    var i;

    for (i = 0; i < this.length; i++) {
        el = this[i];
        value = parseInt(el, 10);

        if (typeof el === 'string' || typeof el === 'number' && isFinite(value)) {
            _arrayOfNumbers.push(value);
        }
    }
    return _arrayOfNumbers;
};