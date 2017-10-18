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

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async');


var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var shipping = new Shipping();

    F.route('/erp/api/shippingMethod', shipping.getAll, ['authorize']);
    F.route('/erp/api/shippingMethod/select', shipping.getForDd, ['authorize']);

    F.route('/erp/api/shippingMethod', shipping.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/shippingMethod/{id}', shipping.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/shippingMethod/{id}', shipping.remove, ['delete', 'authorize']);

};

function Shipping() {}

Shipping.prototype = {
    read: function() {
        var self = this;
        var BankModel = MODEL('bank').Schema;

        //console.log(self.query.entity);

        var balances = [];

        var query = {};

        //if(self.query.entity)
        //    query.entity = self.query.entity;

        BankModel.find(query, "", {
            sort: {
                journalId: 1
            }
        }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);
            self.json(doc);
        });

    },

    create: function() {
        var self = this;
        var body = self.body;
        var ShippingMethodModel = MODEL('shippingMethod').Schema;

        var shipping = new ShippingMethodModel(body);

        shipping.save(function(err, result) {
            if (err)
                return self.throw500(err);


            self.json(result);
        });

    },

    getAll: function() {
        var ShippingMethodModel = MODEL('shippingMethod').Schema;
        var self = this;

        ShippingMethodModel.find({}).populate('account', 'name').exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },

    getForDd: function() {
        var ShippingMethodModel = MODEL('shippingMethod').Schema;
        var self = this;
        var options = {
            _id: 1,
            name: 1
        };
        ShippingMethodModel.find({}, options).populate('account', 'name').exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json({
                data: result
            });
        });
    },

    update: function(id) {
        var ShippingMethodModel = MODEL('shippingMethod').Schema;
        var self = this;
        var body = self.body || {};

        ShippingMethodModel.findByIdAndUpdate(id, body, {
            new: true
        }, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },

    remove: function(id) {
        var ShippingMethodModel = MODEL('shippingMethod').Schema;
        var self = this;

        ShippingMethodModel.findByIdAndUpdate(id, {
            isremoved: true
        }, {
            new: true
        }, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    }
};