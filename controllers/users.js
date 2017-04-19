"use strict";

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async');

exports.install = function() {

    var object = new Object();

    object.colors = ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
    ];

    // Specific for select
    F.route('/erp/api/user', object.read, ['authorize']);
    F.route('/erp/api/user/dt', object.readDT, ['post', 'authorize']);

    F.route('/erp/api/user/select', function() {
        var UserModel = MODEL('Users').Schema;
        var self = this;

        UserModel.find({ isremoved: { $ne: true }, Status: { $ne: "DISABLE" } }, "", { sort: { lastname: 1 } }, function(err, docs) {
            if (err)
                return self.throw500("err : /erp/api/user/select {0}".format(err));

            var result = [];


            for (var i = 0, len = docs.length; i < len; i++) {
                //console.log(docs[i]);
                if (self.query.agenda) { // for calendar
                    result[i] = {};
                    result[i].text = docs[i].firstname + " " + docs[i].lastname;
                    result[i].value = docs[i]._id;
                    result[i].color = object.colors[i];
                } else if (self.query.lastname) {
                    result[i] = {};
                    result[i].name = docs[i].lastname;
                    result[i].id = docs[i]._id;
                } else {
                    result[i] = {};
                    result[i].firstname = docs[i].firstname;
                    result[i].lastname = docs[i].lastname;
                    result[i].name = docs[i].firstname + " " + docs[i].lastname;
                    result[i].id = docs[i]._id;
                    //console.log(result[i]);
                }
            }

            return self.json(result);
        });
    }, ['authorize']);

    // list for autocomplete
    F.route('/erp/api/user/name/autocomplete', function() {
        var UserModel = MODEL('Users').Schema;
        var self = this;

        //console.dir(self.body);

        var query = {};

        var filter = self.body.filter.filters[0].value.trim();
        //(david|doma) create regex or search if 2 words
        if (self.body.filter.filters[0].value.indexOf(" ")) {
            var search = filter.split(' ');
            search = _.map(search, function(text) {
                return text.trim();
            });

            filter = '(';
            for (var i = 0, len = search.length; i < len; i++) {
                filter += search[i];
                if (i + 1 !== len)
                    filter += '|';
            }
            filter += ')';
        }

        //console.log(filter);

        if (self.body.filter)
            query = {
                '$or': [
                    { firstname: new RegExp(filter, "i") },
                    { lastname: new RegExp(filter, "i") }
                ]
            };

        if (self.query.status) {
            query.Status = { $in: self.query.status };
        } else {
            query.Status = { $ne: "DISABLE" };
        }

        UserModel.find(query, {}, { limit: self.body.take }, function(err, docs) {
            if (err) {
                console.log("err : /api/user/name/autocomplete");
                console.log(err);
                return;
            }

            var result = [];

            if (docs !== null)
                for (var i in docs) {
                    //console.log(docs[i]);

                    result[i] = {};
                    if (self.query.lastname) {
                        result[i] = {};
                        result[i].name = docs[i].lastname;
                        result[i].id = docs[i]._id;
                        result[i].entity = docs[i].entity;
                    } else {
                        //result[i].name = docs[i].name;
                        result[i].name = docs[i].firstname + " " + docs[i].lastname;
                        result[i].id = docs[i]._id;
                        result[i].entity = docs[i].entity;
                    }
                }

            return self.json(result);
        });
    }, ['post', 'authorize']);

    //liste des collaborateurs
    F.route('/erp/api/users', object.read, ['authorize']);

    //ajout d'un nouveau collaborateur
    F.route('/erp/api/users', object.create, ['post', 'json', 'authorize']);

    //afficher la fiche du collaborateur
    F.route('/erp/api/users/{userId}', object.show, ['authorize']);

    //modifier la fiche du collaborateur
    F.route('/erp/api/users/{userId}', object.update, ['put', 'json', 'authorize']);

    F.route('/erp/api/users/{userId}', object.del, ['delete', 'authorize']);

    /*app.delete('/api/user', auth.requiresLogin, function (req, res) {
     console.log(JSON.stringify(req.body));
     return res.send(200, object.update(req));
     });*/

    F.route('/erp/api/user/connection', object.connection, ['authorize']);

    // For multi-entites user
    F.route('/erp/api/user/entity', object.entityUpdate, ['put', 'json', 'authorize']);
    //other routes..

    //verifie si le nouveau exite ou pas
    F.route('/erp/api/user/email/', object.uniqEmail, ['authorize']);
    F.route('/erp/api/user/{id}', object.uniqLogin, ['authorize']);
};

function Object() {}

Object.prototype = {
    show: function(id) {
        var UserModel = MODEL('Users').Schema;
        var self = this;

        UserModel.findOne({ _id: id }, function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.throw500(new Error('Failed to load user ' + id));

            self.json(doc);
        });
    },
    create: function() {
        var UserModel = MODEL('Users').Schema;
        var self = this;
        //return req.body.models;
        var user = new UserModel(self.body);

        //user.name = req.body.login.toLowerCase();
        //var login = req.body.login;
        //user._id = 'user:' + login;

        if (!user.entity)
            user.entity = self.user.entity;

        if (!user.password)
            user.password = user.generatePassword(8);

        user.save(function(err, doc) {
            if (err)
                return self.throw500(err);
            //return console.log(err);

            self.json(user);
        });
    },
    read: function() {
        var UserModel = MODEL('Users').Schema;
        var self = this;
        UserModel.find({}, function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    update: function(id) {
        //return req.body.models;
        var self = this;
        var UserModel = MODEL('Users').Schema;

        UserModel.findOne({ _id: id }, function(err, user) {

            user = _.extend(user, self.body);

            if (!user.password)
                user.password = user.generatePassword(8);

            user.save(function(err, doc) {

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
                    message: "Utilisateur enregistré"
                };
                self.json(doc);
            });
        });
    },
    del: function(id) {
        //return req.body.models;
        var self = this;
        var UserModel = MODEL('Users').Schema;

        UserModel.update({ _id: id }, { $set: { isremoved: true, Status: 'DISABLE' } }, function(err, user) {
            if (err)
                self.throw500(err);
            else
                self.json(user);
        });
    },
    connection: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;
        UserModel.find({ NewConnection: { $ne: null }, entity: self.query.entity }, "lastname firstname NewConnection", {
            limit: 10,
            sort: {
                NewConnection: -1
            }
        }, function(err, docs) {
            self.json(docs);
        });
    },
    uniqLogin: function(id) {
        var self = this;
        var UserModel = MODEL('Users').Schema;

        UserModel.findOne({ username: id.toLowerCase() }, "_id lastname firstname username", function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json({});


            self.json(doc);
        });
    },
    uniqEmail: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;

        if (!self.query.email)
            return self.throw500("/erp/api/user/email : err query url -> email not found");

        UserModel.findOne({ email: self.query.email.toLowerCase() }, "_id lastname firstname email", function(err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json({});

            self.json(doc);
        });
    },
    entityUpdate: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;
        var result = [];
        //console.log(req.user);

        if (self.user.multiEntities && selfreq.body.entity) {
            UserModel.findByIdAndUpdate(self.user._id, { $set: { entity: self.body.entity } }, function(err, user) {
                if (err)
                    console.log(err);

                //console.log(user);
                self.json(user);
            });
        }
    },
    readDT: function() {
        var self = this;
        var UserModel = MODEL('Users').Schema;
        var query = JSON.parse(self.req.body.query);
        var Status;
        //console.log(self.query);
        var conditions = {
            isremoved: { $ne: true },
            entity: self.query.entity
        };

        if (!query.search.value) {
            if (self.query.status_id) {
                conditions.Status = self.query.status_id;
            }
        } else
            delete conditions.Status;


        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        //console.log(self.query);

        var options = {
            conditions: conditions
                //select: ""
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                cb(null, MODEL('Employees').Status);
            },
            datatable: function(cb) {
                UserModel.dataTable(query, options, cb);
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

                res.datatable.data[i].username = '<a class="with-tooltip" href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.username + '"><span class="fa fa-user"></span> ' + row.username + '</a>';

                res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.values[row.Status].label) + '</span>' : row.Status);
                // Action
                res.datatable.data[i].action = '<a href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '"><span class="fa fa-money"></span> ' + row.login + '</a>';
                // Convert Date
                res.datatable.data[i].lastConnection = (row.lastConnection ? moment(row.lastConnection).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].createdAt = (row.createdAt ? moment(row.createdAt).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    }
};