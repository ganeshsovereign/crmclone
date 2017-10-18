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

    var entity = new Entity();
    F.route('/erp/api/entity/select', entity.select, ['authorize']);
    F.route('/erp/api/entity/{id}', entity.show, ['authorize']);
    F.route('/erp/api/entity/dt', entity.readDT, ['post', 'authorize']);
};

function Entity() {}

Entity.prototype = {
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
        entity = new EntityModel(self.body);

        //console.log(delivery);
        entity.save(function(err, doc) {
            if (err) {
                return console.log(err);
            }

            self.json(doc);
        });
    },
    update: function() {
        var EntityModel = MODEL('entity').Schema;
        //console.log("update");
        var self = this;

        //console.log(self.query);

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
    readDT: function() {
        var self = this;
        var EntityModel = MODEL('entity').Schema;
        var query = JSON.parse(self.req.body.query);
        var Status;
        //console.log(self.query);
        var conditions = {
            isremoved: {
                $ne: true
            }
        };

        if (!query.search.value) {
            if (self.query.status_id) {
                conditions.Status = self.query.status_id;
            }
        } else
            delete conditions.Status;


        //if (!self.user.multiEntities)
        //    conditions.entity = self.user.entity;

        //console.log(self.query);

        var options = {
            conditions: conditions,
            select: "isEnable"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                cb(null, MODEL('entity').Status);
            },
            datatable: function(cb) {
                EntityModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                return self.throw500(err);

            //console.log(res);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>'; // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();

                res.datatable.data[i].name = '<a class="with-tooltip" href="#!/settings/entity' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name + '"><span class="fa fa-user"></span> ' + row.name + '</a>';

                //res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                //res.datatable.data[i].Status = (row.isEnable ? '<span class="label label-sm ' + res.status.values['ENABLE'].cssClass + '">' + res.status.values['ENABLE'].label + '</span>' : '<span class="label label-sm ' + res.status.values['DISABLE'].cssClass + '">' + res.status.values['DISABLE'].label + '</span>');
                // Action
                res.datatable.data[i].action = '<a href="#!/setttings/entity' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/settings/entity' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '"><span class="fa fa-money"></span> ' + row.login + '</a>';
                // Convert Date
                res.datatable.data[i].lastConnection = (row.lastConnection ? moment(row.lastConnection).format(CONFIG('dateformatLong')) : '');
                res.datatable.data[i].createdAt = (row.createdAt ? moment(row.createdAt).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    }
};