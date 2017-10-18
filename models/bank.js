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
    async = require('async'),
    _ = require('lodash'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var Dict = INCLUDE('dict');
var round = MODULE('utils').round;

/**
 * Bank Schema
 */
var bankSchema = new Schema({
    ref: {
        type: String,
        unique: true
    },
    account_type: String,
    name_bank: String,
    code_bank: Number,
    number_bank: Number,
    code_counter: String,
    account_number: String,
    iban: {
        bank: {
            type: String,
            uppercase: true,
            trim: true
        },
        id: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        }, //FR76........
        bic: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        } //BIC / SWIFT TODO old swift
    },
    currency: String,
    status: String,
    reconciled: Boolean,
    min_balance_allowed: Number,
    min_balance_required: Number,
    web: String,
    comment: String,
    entity: [{
        type: String,
        trim: true
    }],
    address: {
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            ref: 'countries',
            default: 'FR'
        }
    },
    createdBy: {
        type: ObjectId,
        ref: 'Users'
    },
    editedBy: {
        type: ObjectId,
        ref: 'Users'
    },
    journalId: {
        type: String,
        unique: true
    }, // BQ1
    compta_bank: {
        type: String,
        unique: true
    }, // 512xxxx
    invoice: String // Text on invoice for payment
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

var statusList = {};

Dict.dict({
    dictName: "fk_account_status",
    object: true
}, function(err, docs) {
    statusList = docs;
});

bankSchema.virtual('acc_status').get(function() {
    var acc_status = {};

    var status = this.status;

    if (status && statusList.values[status] && statusList.values[status].label) {
        acc_status.id = status;
        acc_status.name = statusList.values[status].label;
        acc_status.css = statusList.values[status].cssClass;
    } else { // By default
        acc_status.id = status;
        acc_status.name = status;
        acc_status.css = "";
    }
    return acc_status;
});

bankSchema.virtual('name').get(function() {
    return this.journalId + " (" + this.name_bank + " " + this.account_number + ")";
});

var typeList = {};

Dict.dict({
    dictName: "fk_account_type",
    object: true
}, function(err, docs) {

    typeList = docs;
});

bankSchema.virtual('acc_type').get(function() {

    var acc_type = {};
    var account_type = this.account_type;

    if (account_type && typeList.values[account_type] && typeList.values[account_type].label) {
        acc_type.id = account_type;
        acc_type.name = typeList.values[account_type].label;
        acc_type.css = typeList.values[account_type].cssClass;
    } else { // By default
        acc_type.id = account_type;
        acc_type.name = account_type;
        acc_type.css = "";
    }

    return acc_type;
});

var countryList = {};

Dict.dict({
    dictName: "fk_country",
    object: true
}, function(err, docs) {

    countryList = docs;
});

bankSchema.virtual('acc_country').get(function() {

    var acc_country = "";
    var account_country = this.country;

    if (account_country)
        acc_country = countryList.values[account_country].label;

    return acc_country;
});

/*bankSchema.virtual('balance').get(function () {
 
 var balance;
 var id = this._id;
 
 if (transactionList) {
 for (var i = 0; i < transactionList.length; i++) {
 if (id.equals(transactionList[i]._id)) {
 balance = transactionList[i].sumC - transactionList[i].sumD;
 return balance;
 }
 }
 }
 
 return 0;
 });*/


exports.Schema = mongoose.model('bank', bankSchema, 'Bank');
exports.name = 'bank';