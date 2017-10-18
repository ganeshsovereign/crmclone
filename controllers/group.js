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


exports.install = function() {

    var object = new Object();

    //afficher la liste des groupes de collaborateurs
    F.route('/erp/api/group', object.read, ['authorize']);

    //recuperer la liste des groupes
    F.route('/erp/api/group/dt', object.readDT, ['post', 'authorize']);

    //verifie si le nouveau groupe exite ou pas
    F.route('/erp/api/group/uniqName', object.uniqName, ['authorize']);

    //affiche la liste des collaborateurs du groupe
    F.route('/erp/api/group/users', object.listUsers, ['authorize']);

    //affiche la liste des collaborateurs non affectés au groupe
    F.route('/erp/api/group/noUsers', object.listNoUsers, ['authorize']);

    //ajout d'un nouveau groupe collaborateurs
    F.route('/erp/api/group', object.create, ['post', 'json', 'authorize']);

    //afficher la fiche du groupe collaborateurs
    F.route('/erp/api/group/{id}', object.show, ['authorize']);

    //affecter un collaborateur à un groupe
    F.route('/erp/api/group/addUserToGroup', object.addToGroup, ['put', 'json', 'authorize']);

    //Supprimer un groupe de collaborateurs
    F.route('/erp/api/group/{userGroupId}', object.deleteUserGroup, ['delete', 'authorize']);

    //supprimer un collaborateur d'un groupe
    F.route('/erp/api/group/removeUserFromGroup', object.removeUserFromGroup, ['post', 'json', 'authorize']);

    //modifier un groupe de collaborateur
    F.route('/erp/api/group/{id}', object.update, ['put', 'json', 'authorize']);

};

function Object() {}

Object.prototype = {
    userGroupId: function(req, res, next, id) {
        UserGroupModel.findOne({
            _id: id
        }, function(err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return next(new Error('Failed to load userGroup ' + id));

            req.userGroup = doc;
            next();
        });
    },
    read: function() {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;
        var UserModel = MODEL('Users').Schema;
        var user;
        var userGroup = [];

        UserGroupModel.find(function(err, groups) {
            UserModel.find(function(err, doc) {

                user = doc;

                var counter;
                var i, j;
                groups.forEach(function(group) {
                    counter = 0;
                    for (j in user) {
                        if (user[j].groupe === group._id)
                            counter = counter + 1;
                    }

                    userGroup.push({
                        _id: group._id,
                        id: group._id,
                        name: group.name,
                        count: counter,
                        description: group.notes
                    });
                });

                //console.log(userGroup);
                self.json(userGroup);
            });
        });
    },
    uniqName: function(req, res) {

        if (!req.query.name)
            return res.send(404);

        var id = "group:" + req.query.name;

        UserGroupModel.findOne({
            _id: id
        }, "name", function(err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return res.json({});

            res.json(doc);
        });

    },
    listUsers: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;

        if (!self.query.group)
            return self.throw404();

        var group = self.query.group;

        UserModel.find({
            groupe: group
        }, function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json([]);

            self.json(doc);

        });

    },
    listNoUsers: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;

        if (!self.query.group)
            return self.throw404();

        var group = self.query.group;

        UserModel.find({
            groupe: {
                $nin: [group]
            }
        }, "_id lastname firstname", function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json([]);

            self.json(doc);

        });

    },
    addToGroup: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;
        var user = self.query.user;
        var groupe = self.query.groupe;

        UserModel.update({
            _id: user
        }, {
            $set: {
                groupe: groupe
            }
        }, function(err, doc) {
            if (err)
                return self.throw500(err);
            self.json(doc);
        });
    },
    create: function() {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;
        var userGroup = new UserGroupModel(self.body);
        var name = self.body.name;

        userGroup._id = name;
        userGroup.save(function(err, doc) {
            if (err)
                return self.throw500(err);
            //return console.log(err);
            self.json(userGroup);
        });
    },
    show: function(id) {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;

        UserGroupModel.findOne({
            _id: id
        }, function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.throw500('Failed to load Group' + id);
            self.json(doc);
        });
    },
    deleteUserGroup: function() {
        var self = this;
        var userGroup = self.userGroup;

        userGroup.remove(function(err) {
            if (err) {
                self.render('error', {
                    status: 500
                });
            } else {
                self.json(userGroup);
            }
        });
    },
    removeUserFromGroup: function() {
        var self = this;
        var user = self.query.user;
        var UserGroupModel = self.query.group;
        var UserModel = MODEL('Users').Schema;

        UserModel.update({
            _id: user
        }, {
            groupe: null
        }, function(err, doc) {
            if (err)
                return self.throw500(err);
            self.json(doc);
        });
    },
    update: function(id) {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;

        console.log(self.body);
        self.body.updatedAt = new Date();
        self.body.editedBy = self.user._id;

        UserGroupModel.findByIdAndUpdate(id, self.body, {
            new: true
        }, function(err, doc) {

            if (err)
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });

            doc = doc.toObject();
            doc.successNotify = {
                title: "Success",
                message: "groupe enregistré"
            };
            self.json(doc);
        });
    },
    list: function() {
        var self = this;
        var fields = self.query.fields;
        var UserGroupModel = MODEL('group').Schema;

        UserGroupModel.find("ALL", fields, function(err, doc) {
            if (err)
                return self.throw500(err);
            self.json(doc);
        });
    },

    readDT: function() {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;
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

        //console.log(self.query);

        var options = {
            conditions: conditions
            //select: ""
        };

        //console.log(options);

        async.parallel({
            datatable: function(cb) {
                UserGroupModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                return self.throw500(err);

            //console.log(res);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                // Add link company                

                // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();

                res.datatable.data[i].name = '<a class="with-tooltip" href="#!/group/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name + '"><span class="fa fa-users"></span> ' + row.name + '</a>';
                // Action
                res.datatable.data[i].action = '<a href="#!/group/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '"><span class="fa fa-money"></span> ' + row.login + '</a>';
                // Convert Date
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    }
};