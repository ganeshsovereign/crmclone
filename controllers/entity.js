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

const _ = require("lodash"),
    async = require('async');

exports.install = function() {

    var object = new Object();

    F.route('/erp/api/entity/select', object.select, ['authorize']);
    F.route('/erp/api/entity/{id}', object.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/entity/{id}', object.show, ['authorize']);
    F.route('/erp/api/entity/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/entity', object.create, ['post', 'authorize']);
    F.route('/erp/api/entity', object.getByViewType, ['authorize']);
};

function Object() {}

Object.prototype = {
    show: function(id) {
        var self = this;
        var EntityModel = MODEL('entity').Schema;

        EntityModel.findOne({
            _id: id
        }, function(err, entity) {
            if (err || !entity)
                return self.throw500(err);

            self.json(entity);
        });
    },
    create: function() {
        var EntityModel = MODEL('entity').Schema;
        var self = this;

        var entity = {};
        self.body._id = self.body.name.toLowerCase().replace(/\s/g, '');
        entity = new EntityModel(self.body);

        entity.save(function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    update: function(id) {
        var EntityModel = MODEL('entity').Schema;
        var self = this;

        if (!self.body.createdAt)
            self.body.createdAt = new Date();

        self.body.updatedAt = new Date();
        EntityModel.findByIdAndUpdate(id, self.body, function(err, doc) {
            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }

            //console.log(doc);
            doc = doc.toObject();
            doc.successNotify = {
                title: "Success",
                message: "Entité enregistrée"
            };
            self.json(doc);
        });
    },
    select: function() {
        var self = this;
        var EntityModel = MODEL('entity').Schema;
        var result = [];

        EntityModel.find(function(err, docs) {
            for (var i = 0, len = docs.length; i < len; i++) {
                if ((!self.user.multiEntities && docs[i]._id == self.user.entity) // Only once entity
                    ||
                    self.user.multiEntities === true // superadmin
                    ||
                    (_.isArray(self.user.multiEntities) && _.contains(self.user.multiEntities, docs[i]._id))) { // Entities assigned
                    var entity = {};
                    entity.id = docs[i]._id;
                    entity.name = docs[i].name;
                    entity.url = docs[i].url;
                    result.push(entity);
                }
            }

            self.json(result);
        });
    },
    getByViewType: function() {
        var self = this;
        var EntityModel = MODEL('entity').Schema;

        var data = self.query;
        var quickSearch = data.quickSearch;
        var paginationObject = MODULE('helper').page(self.query);
        var limit = paginationObject.limit;
        var skip = paginationObject.skip;

        const FilterMapper = MODULE('helper').filterMapper;
        var filterMapper = new FilterMapper();

        var accessRollSearcher;
        var contentSearcher;
        var waterfallTasks;
        var contentType = data.contentType;
        var sort = {};
        var filter = data.filter && JSON.parse(data.filter) || {};
        var key;
        var filterObject = {
            isremoved: {
                $ne: true
            }
        };
        var optionsObject = {};
        var matchObject = {};
        var regExp;
        var pastDue = filter.pastDue;

        if (quickSearch) {
            regExp = new RegExp(quickSearch, 'ig');
            matchObject['ref'] = {
                $regex: regExp
            };
            filter = {};
        }

        if (self.query.sort) {
            sort = JSON.parse(self.query.sort);
        } else
            sort = {
                name: 1
            };
        sort._id = 1;

        accessRollSearcher = function(cb) {
            const accessRoll = MODULE('helper').accessRoll;

            accessRoll(self.user, EntityModel, cb);
        };
        console.log(sort);
        contentSearcher = function(ids, cb) {
            var newQueryObj = {};
            const ObjectId = MODULE('utils').ObjectId;

            newQueryObj.$and = [];
            newQueryObj.$and.push({
                _id: {
                    $in: ids
                }
            });

            EntityModel.aggregate([{
                    $match: filterObject
                },
                {
                    $match: matchObject
                },
                {
                    $project: {
                        name: 1,
                        cptRef: 1,
                        address: 1,
                        companyInfo: 1,
                        state: 1,
                        createdAt: 1
                    }
                },
                {
                    $sort: sort
                },
                {
                    $skip: skip
                }, {
                    $limit: limit
                }
            ], cb);
        };

        waterfallTasks = [accessRollSearcher, contentSearcher];

        async.waterfall(waterfallTasks, function(err, result) {
            var count;
            var firstElement;
            var response = {};

            if (err)
                return self.throw500(err);

            result = _.map(result, function(line) {
                return line;
            });

            firstElement = result[0];

            response.data = result;
            self.json(response);
        });

    }
};