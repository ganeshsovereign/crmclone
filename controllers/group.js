"use strict";

var fs = require('fs'),
        _ = require('lodash'),
        moment = require('moment'),
        async = require('async');


var Dict = INCLUDE('dict');


exports.install = function () {

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
    F.route('/erp/api/group/{userGroupId}', object.show, ['authorize']);

    //affecter un collaborateur à un groupe
    F.route('/erp/api/group/addUserToGroup', object.addToGroup, ['put', 'json', 'authorize']);

    //Supprimer un groupe de collaborateurs
    F.route('/erp/api/group/{userGroupId}', object.deleteUserGroup, ['delete', 'authorize']);

    //supprimer un collaborateur d'un groupe
    F.route('/erp/api/group/removeUserFromGroup', object.removeUserFromGroup, ['post', 'json', 'authorize']);

    //modifier un groupe de collaborateur
    F.route('/erp/api/group/{userGroupId}', object.update, ['post', 'json', 'authorize']);

};

function Object() {
}

Object.prototype = {
    userGroupId: function (req, res, next, id) {
        UserGroupModel.findOne({_id: id}, function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return next(new Error('Failed to load userGroup ' + id));

            req.userGroup = doc;
            next();
        });
    },
    read: function () {
        var self = this;
        var UserGroupModel = MODEL('userGroup').Schema;
        var UserModel = MODEL('user').Schema;
        var user;
        var userGroup = [];

        UserGroupModel.find(function (err, groups) {
            UserModel.find(function (err, doc) {

                user = doc;

                var counter;
                var i, j;
                groups.forEach(function (group) {
                    counter = 0;
                    for (j in user) {
                        if (user[j].groupe === group._id)
                            counter = counter + 1;
                    }

                    userGroup.push({_id: group._id, id: group._id, name: group.name, count: counter, description: group.notes});
                });

                //console.log(userGroup);
                self.json(userGroup);
            });
        });
    },
    uniqName: function (req, res) {

        if (!req.query.name)
            return res.send(404);

        var id = "group:" + req.query.name;

        UserGroupModel.findOne({_id: id}, "name", function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return res.json({});

            res.json(doc);
        });

    },
    listUsers: function (req, res) {

        if (!req.query.groupe)
            return res.send(404);

        var groupe = req.query.groupe;

        UserModel.find({groupe: groupe}, function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return res.json({});

            res.send(200, doc);

        });

    },
    listNoUsers: function (req, res) {

        if (!req.query.groupe)
            return res.send(404);

        var groupe = req.query.groupe;

        UserModel.find({groupe: {$nin: [groupe]}}, "_id lastname firstname", function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return res.json({});

            res.send(200, doc);

        });

    },
    addToGroup: function (req, res) {

        var user = req.query.user;
        var groupe = req.query.groupe;

        UserModel.update({_id: user}, {$set: {groupe: groupe}}, function (err, doc) {
            if (err)
                return res.send(500, err);


            res.send(200);
        });
    },
    create: function () {
        var UserGroupModel = MODEL('group').Schema;
        var self=this;
        var userGroup = new UserGroupModel(self.body);

        var name = self.body.name;
        userGroup._id = 'group:' + name;

        userGroup.save(function (err, doc) {
            if (err) 
                return self.throw500(err);
                //return console.log(err);

            self.json(userGroup);
        });
    },
    show: function (req, res) {
        res.json(req.userGroup);
    },
    deleteUserGroup: function (req, res) {

        var userGroup = req.userGroup;

        userGroup.remove(function (err) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(userGroup);
            }
        });
    },
    removeUserFromGroup: function (req, res) {

        var user = req.query.user;
        var group = req.query.group;

        UserModel.update({_id: user}, {groupe: null}, function (err) {
            if (err)
                return res.send(500, err);

            res.send(200);
        });
    },
    update: function (req, res) {

        var userGroup = req.userGroup;
        userGroup = _.extend(userGroup, req.body);

        userGroup.save(function (err, doc) {

            if (err) {
                return console.log(err);
            }

            res.json(doc);
        });
    },
    list: function (req, res) {

        var fields = req.query.fields;

        UserGroupModel.find("ALL", fields, function (err, doc) {
            if (err)
                return res.send(500, err);

            res.json(doc);
        });
    },

    readDT: function () {
        var self = this;
        var UserGroupModel = MODEL('group').Schema;

        var query = JSON.parse(self.req.body.query);

        var Status;

        //console.log(self.query);

        var conditions = {
            isremoved: {$ne: true}
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
            datatable: function (cb) {
                UserGroupModel.dataTable(query, options, cb);
            }
        }, function (err, res) {
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
