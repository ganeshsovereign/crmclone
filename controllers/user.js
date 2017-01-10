"use strict";

var fs = require('fs'),
        _ = require('lodash'),
        moment = require('moment'),
        async = require('async');


var Dict = INCLUDE('dict');

exports.install = function () {

    var object = new Object();
    var absence = new Absence();

    object.colors = ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];

    // Specific for select
    F.route('/erp/api/user', object.read, ['authorize']);
    F.route('/erp/api/user/dt', object.readDT, ['post', 'authorize']);

    F.route('/erp/api/user/select', function () {
        var UserModel = MODEL('user').Schema;
        var self = this;

        UserModel.find({Status: {$ne: "DISABLE"}}, "", {sort: {lastname: 1}}, function (err, docs) {
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
    F.route('/erp/api/user/name/autocomplete', function () {
        var UserModel = MODEL('user').Schema;
        var self = this;
        
        //console.dir(self.body);

        var query = {};

        var filter = self.body.filter.filters[0].value.trim();
        //(david|doma) create regex or search if 2 words
        if (self.body.filter.filters[0].value.indexOf(" ")) {
            var search = filter.split(' ');
            search = _.map(search, function (text) {
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
            query = {'$or': [
                    {firstname: new RegExp(filter, "i")},
                    {lastname: new RegExp(filter, "i")}
                ]};

        if (self.query.status) {
            query.Status = {$in: self.query.status};
        } else {
            query.Status = {$ne: "DISABLE"};
        }

        UserModel.find(query, {}, {limit: self.body.take}, function (err, docs) {
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

    F.route('/erp/api/user/absence', absence.read, ['authorize']);
    F.route('/erp/api/user/absence', absence.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/user/absence/{id}', absence.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/user/absence/{id}', absence.delete, ['delete', 'authorize']);

    F.route('/erp/api/user/absence/count', absence.count, ['authorize']);
    // For multi-entites user
    F.route('/erp/api/user/entity', object.entityUpdate, ['put', 'json', 'authorize']);
    //other routes..
    
    //verifie si le nouveau exite ou pas
    F.route('/erp/api/user/email/', object.uniqEmail, ['authorize']);
    F.route('/erp/api/user/{id}', object.uniqLogin, ['authorize']);
};

function Object() {
}

Object.prototype = {
    user: function (req, res, next, id) {
        var UserModel = MODEL('hr').Schema;

        UserModel.findOne({_id: id}, function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return next(new Error('Failed to load user ' + id));

            req.User = doc;
            next();
        });
    },
    show: function (id) {
        var UserModel = MODEL('hr').Schema;
        var self = this;

        UserModel.findOne({_id: id}, function (err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return next(new Error('Failed to load user ' + id));

            self.json(doc);
        });
    },
    create: function () {
        var UserModel = MODEL('hr').Schema;
        var self=this;
        //return req.body.models;
        var user = new UserModel(self.body);

        //user.name = req.body.login.toLowerCase();
        //var login = req.body.login;
        //user._id = 'user:' + login;

        if (!user.entity)
            user.entity = self.user.entity;

        user.save(function (err, doc) {
            if (err) 
                return self.throw500(err);
                //return console.log(err);

            self.json(user);
        });
    },
    read: function (req, res) {
        var UserModel = MODEL('hr').Schema;
        UserModel.find({}, function (err, doc) {
            if (err) {
                console.log(err);
                res.send(500, doc);
                return;
            }

            res.send(doc);
        });
    },
    update: function (id) {
        //return req.body.models;
        var self = this;
        var UserModel = MODEL('hr').Schema;

        UserModel.findOne({_id: id}, function (err, user) {

            user = _.extend(user, self.body);

            user.save(function (err, doc) {

                if (err)
                    return self.json({errorNotify: {
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
    del: function (id) {
        //return req.body.models;
        var self = this;
        var UserModel = MODEL('hr').Schema;

        UserModel.update({_id: id},{$set:{isremoved:true, Status:'DISABLE'}}, function (err, user) {
            if (err) 
                self.throw500(err);
             else
                self.json(user);
        });
    },
    connection: function (req, res) {
        UserModel.find({NewConnection: {$ne: null}, entity: req.query.entity}, "lastname firstname NewConnection", {limit: 10, sort: {
                NewConnection: -1
            }}, function (err, docs) {
            res.json(docs);
        });
    },
    uniqLogin: function (id) {
        var self = this;
        var UserModel = MODEL('hr').Schema;
        
        UserModel.findOne({username: id.toLowerCase()}, "_id lastname firstname username", function (err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json({});


            self.json(doc);
        });
    },
    uniqEmail: function () {
        var self = this;
        var UserModel = MODEL('hr').Schema;
        
        if(!self.query.email)
            return self.throw500("/erp/api/user/email : err query url -> email not found");
        
        UserModel.findOne({email: self.query.email.toLowerCase()}, "_id lastname firstname email", function (err, doc) {
            if (err)
                return self.throw500(err);
            if (!doc)
                return self.json({});

            self.json(doc);
        });
    },
    entityUpdate: function (req, res) {
        var result = [];
        //console.log(req.user);

        if (req.user.multiEntities && req.body.entity) {
            UserModel.findByIdAndUpdate(req.user._id, {$set: {entity: req.body.entity}}, function (err, user) {
                if (err)
                    console.log(err);

                //console.log(user);
                res.json(user);
            });
        }
    },
    readDT: function () {
        var self = this;
        var UserModel = MODEL('user').Schema;

        var query = JSON.parse(self.req.body.query);

        var Status;

        //console.log(self.query);

        var conditions = {
            isremoved: {$ne: true},
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
            status: function (cb) {
                Dict.dict({
                    dictName: "fk_user_status",
                    object: true
                }, cb);
            },
            datatable: function (cb) {
                UserModel.dataTable(query, options, cb);
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

                res.datatable.data[i].lastname = '<a class="with-tooltip" href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.lastname + '"><span class="fa fa-user"></span> ' + row.lastname + '</a>';

                res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.values[row.Status].label) + '</span>' : row.Status);

                // Action
                res.datatable.data[i].action = '<a href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/user/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '"><span class="fa fa-money"></span> ' + row.login + '</a>';
                // Convert Date
                res.datatable.data[i].LastConnection = (row.LastConnection ? moment(row.LastConnection).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    }
};
        
function Absence() {
}

Absence.prototype = {
    create: function (req, res) {
        var obj = req.body;

        console.log(obj);

        delete obj._id; // new tuple

        var doc = new UserAbsenceModel(obj);

        doc.datec = new Date();
        doc.author.id = req.user._id;
        doc.author.name = req.user.name;

        doc.save(function (err, doc) {
            if (err)
                console.log(err);

            res.send(200, doc);
        });
    },
    read: function (req, res) {
        var query = {};

        console.log(req.query);
        if (req.query.query) {
            if (req.query.query == 'NOW')
                query.closed = false;
            else
                query.closed = true;
        }

        if (req.query.entity)
            query.entity = req.query.entity;

        UserAbsenceModel.find(query, "", {sort: {
                Status: -1, //Sort by Status
                dateEnd: 1
            }}, function (err, doc) {
            if (err) {
                console.log(err);
                res.send(500, doc);
                return;
            }
            res.send(200, doc);
        });
    },
    update: function (req, res) {
        var obj = req.body;
        //console.log(obj);

        UserAbsenceModel.findOne({_id: req.params.id}, function (err, doc) {
            if (err)
                console.log(err);

            doc = _.extend(doc, obj);

            doc.save(function (err, doc) {
                res.send(200, doc);
            });
        });
    },
    delete: function (req, res) {

        UserAbsenceModel.remove({_id: req.params.id}, function (err, doc) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.json(doc);
            }
        });
    },
    count: function (req, res) {
        var d = new Date();
        d.setHours(0, 0, 0);
        var dateStart = new Date(d.getFullYear(), 0, 1);
        var dateEnd = new Date(d.getFullYear() + 1, 0, 1);

        UserAbsenceModel.aggregate([
            {$match: {Status: "NOTJUSTIFIED", dateStart: {$gte: dateStart, $lt: dateEnd}}},
            {$project: {_id: 0, nbDay: 1}},
            {$group: {'_id': 0, sum: {"$sum": "$nbDay"}}}
        ], function (err, docs) {
            if (docs.length === 0)
                return res.json({_id: 0, sum: 0});

            res.json(docs[0]);
        });
    }
};
