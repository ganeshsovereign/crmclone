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


/**
 * Article Schema
 */
var sequenceSchema = new Schema({
    _id: String,
    seq: {
        type: Number,
        default: 1
    }
});



/**
 * Statics
 */
sequenceSchema.statics.inc = function(name, date, cb) {
    if (typeof date == "function") {
        cb = date;
        date = new Date();
    }

    this.findByIdAndUpdate(name, {
        $inc: {
            seq: 1
        }
    }, {
        upsert: true
    }, function(err, doc) {
        if (err)
            console.log(err);

        if (!doc)
            doc = {
                seq: 0
            };

        return cb(date.getFullYear().toString().substr(2, 2) + numberFormat((date.getMonth() + 1), 2) + "-" + numberFormat(doc.seq, 6), doc.seq);
    });
};

sequenceSchema.statics.incNumber = function(name, length, cb) {
    this.findByIdAndUpdate(name, {
        $inc: {
            seq: 1
        }
    }, {
        upsert: true
    }, function(err, doc) {
        if (err)
            console.log(err);

        if (!doc)
            doc = {
                seq: 0
            };

        return cb(numberFormat(doc.seq, length), doc.seq); // format PROV return 000440
    });
};

sequenceSchema.statics.incCpt = function(name, cb) {
    this.findByIdAndUpdate(name, {
        $inc: {
            seq: 1
        }
    }, {
        upsert: true
    }, function(err, doc) {
        if (err)
            console.log(err);

        if (!doc)
            doc = {
                seq: 0
            };

        return cb(doc.seq); // format T return 440
    });
};

sequenceSchema.statics.incBarCode = function(name, length, cb) {
    this.findByIdAndUpdate(name, {
        $inc: {
            seq: 1
        }
    }, {
        upsert: true
    }, function(err, doc) {
        if (err)
            console.log(err);

        if (!doc)
            doc = {
                seq: 0
            };

        return cb(name + numberFormat(doc.seq, length)); //P0120
    });
};

exports.Schema = mongoose.model('Sequence', sequenceSchema, 'Sequence');
exports.name = "Sequence";

var numberFormat = function(number, width) {
    //console.log("number : " + number);
    //console.log("width : " + width);
    //console.log(number + '');
    return new Array(width + 1 - (number + '').length).join('0') + number;
};