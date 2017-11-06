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
    _ = require('lodash'),
    i18n = require("i18next"),
    async = require("async");

var TaskModel = MODEL('task').Schema;
//var googleCalendar = require('./google.calendar');


var SocieteModel = MODEL('Customers').Schema;
var ContactModel = MODEL('Customers').Schema;

var Dict = INCLUDE('dict');

var actioncomm = {};
Dict.dict({
    dictName: "fk_actioncomm",
    object: true
}, function(err, docs) {
    if (err) {
        console.log(err);
        return;
    }
    if (docs) {
        actioncomm = docs;
        actioncomm.event = [];
        for (var i in docs.values) {
            if (docs.values[i].type == 'event')
                actioncomm.event.push(i);
        }
    } else {
        console.log('Dict is not loaded');
    }
});

/* Public declaration methods. See definition for documentation. */
exports.read = readTask;
exports.create = createTask;
exports.update = updateTask;
exports.remove = removeTask;
exports.get = getTask;
exports.count = countTask;
exports.countGroup = countGroupTask;
exports.query = query;
exports.Status = Status;

function query(params) {
    var query = {};

    switch (params.query.type) {
        case 'MYTASK':
            query.$or = [{
                    'usertodo.id': params.user
                },
                {
                    'author.id': params.user,
                    archived: false
                }
            ];
            break;
        case 'ALLTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                },
                {
                    entity: params.query.entity,
                    archived: false
                }
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                }
            ];
            break;
        case 'ARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                },
                {
                    entity: params.query.entity,
                    archived: true
                }
            ];
            break;
        case 'TODAYMYRDV': // For rdv list in menu
            query['usertodo.id'] = params.user;
            query.type = {
                $in: actioncomm.event
            };
            query.datep = {
                $gte: new Date().setHours(0, 0, 0),
                $lte: new Date().setHours(23, 59, 59)
            };
            return TaskModel.find(query, params.fields, callback);
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    return query;

}

function Status(notes, datef) {
    if (!notes || notes.length == 0)
        return getStatus("NOTAPP");

    var last_note = notes[notes.length - 1];
    var percentage = last_note.percentage || 0;

    if (percentage >= 100)
        return getStatus("DONE");

    if (datef < new Date())
        return getStatus("expired");

    if (percentage == 0)
        return getStatus("TODO");

    return getStatus("ON");
}

function getStatus(status) {
    var taskStatus = Status = {
        "_id": "fk_task_status",
        "lang": "tasks",
        "values": {
            "TODO": {
                "enable": true,
                "label": "StatusActionToDo",
                "cssClass": "blue-gradient label-info",
                "dateEnd": "expired"
            },
            "ON": {
                "label": "StatusActionInProcess",
                "enable": true,
                "cssClass": "orange-gradient label-warning",
                "dateEnd": "expired"
            },
            "DONE": {
                "enable": true,
                "label": "StatusActionDone",
                "cssClass": "green-gradient label-success"
            },
            "NOTAPP": {
                "label": "StatusNotApplicable",
                "enable": false,
                "cssClass": "grey-gradient label-default"
            },
            "expired": {
                "enable": false,
                "label": "StatusActionTooLate",
                "cssClass": "red-gradient label-danger"
            }
        }
    };

    return MODULE('utils').Status(status, taskStatus);

}

function readTask(params, callback) {

    //console.log(params);
    var query = {};

    /*if (params.filters) {
     if (params.filters.filters) {
     var list = [];
     for (var i = 0; i < params.filters.filters.length; i++)
     list.push(params.filters.filters[i].value);
     query['usertodo.id'] = {'$in': list};
     } else {
     return res.send(200, []);
     }
     }*/

    var result = [];

    switch (params.query) {
        case 'MYTASK':

            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                }
            ];

            if (params.group)
                try {
                    query.$or.push({
                        'group.name': JSON.parse(params.group),
                        archived: false
                    });
                } catch (e) {
                    //query.$or.push({group: params.group});
                }

            break;
        case 'GROUPTASK':
            query.archived = false;

            if (params.group)
                try {
                    query['group.name'] = JSON.parse(params.group);
                } catch (e) {
                    query['group.name'] = params.group;
                }

            break;
        case 'ALLTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                },
                {
                    entity: params.entity,
                    archived: false
                }
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                }
            ];
            break;
        case 'ARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                },
                {
                    entity: params.entity,
                    archived: true
                }
            ];
            break;
        case 'TODAYMYRDV': // For rdv list in menu
            query['usertodo.id'] = params.user;
            query.type = {
                $in: actioncomm.event
            };
            query.datep = {
                $gte: new Date().setHours(0, 0, 0),
                $lte: new Date().setHours(23, 59, 59)
            };
            return TaskModel.find(query, params.fields, callback);
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    //console.log(query);
    TaskModel.find(query, params.fields, {
        skip: parseInt(params.skip, 10) * parseInt(params.limit, 10) || 0,
        limit: params.limit || 100,
        sort: JSON.parse(params.sort)
    }, callback);
}

function countTask(params, callback) {
    var query = {};

    /*if (params.filters) {
     if (params.filters.filters) {
     var list = [];
     for (var i = 0; i < params.filters.filters.length; i++)
     list.push(params.filters.filters[i].value);
     query['usertodo.id'] = {'$in': list};
     } else {
     return res.send(200, []);
     }
     }*/

    var result = [];

    switch (params.query) {
        case 'MYTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                }
            ];
            break;
        case 'ALLTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                },
                {
                    entity: params.entity,
                    archived: false
                }
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                }
            ];
            break;
        case 'ARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                },
                {
                    entity: params.entity,
                    archived: true
                }
            ];
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    TaskModel.count(query, callback);
}

function countGroupTask(user, callback) {

    var query = {
        "group.name": {
            $in: user.groups
        },
        archived: false
    };

    TaskModel.aggregate([{
            $match: query
        },
        {
            $project: {
                _id: 1,
                group: 1
            }
        },
        {
            $group: {
                _id: "$group.id",
                count: {
                    "$sum": 1
                },
                name: {
                    $addToSet: "$group.name"
                }
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
    ], callback);
}

function createTask(task, user, socket, callback) {
    var new_task = {};

    async.parallel({
        societe: function(cb) {
            if (!(task.societe && task.societe.id))
                return cb(null, {});

            SocieteModel.findOne({
                _id: task.societe.id
            }, cb);
        },
        contact: function(cb) {
            if (!(task.contact && task.contact.id))
                return cb(null, {});

            ContactModel.findOne({
                _id: task.contact.id
            }, cb);
        }
    }, function(err, result) {
        if (err)
            console.log(err);

        //console.log(result);


        new_task = new TaskModel(task);

        if (task.author == null)
            new_task.author = {
                id: user._id,
                name: user.firstname + " " + user.lastname
            };

        if (task.usertodo == null)
            new_task.usertodo = {
                id: user._id,
                name: user.firstname + " " + user.lastname
            };

        if (new_task.entity == null)
            new_task.entity = user.entity;

        if (new_task.notes.length && new_task.notes[new_task.notes.length - 1].percentage >= 100 && new_task.userdone.id == null) {
            new_task.userdone = {
                id: user._id,
                name: user.firstname + " " + user.lastname
            };
            new_task.archived = true;
        }

        if (!actioncomm.values[new_task.type]) {
            //console.log("unknown taskType : " + new_task.type);
            //return;
            new_task.type = "AC_OTH"; //other
            new_task.datep = new Date(new_task.datef);
        }

        if (actioncomm.values[new_task.type].type != 'event')
            new_task.datep = new Date(new_task.datef);

        if (actioncomm.values[new_task.type].type == 'event' && new_task.datep != null) {
            if (new_task.datef == null || new_task.datef <= new_task.datep) {
                new_task.datef = new Date(new_task.datep);
                new_task.datef.setHours(new_task.datef.getHours() + 1);
            }
        }

        var desc = "Tache / evenement avec " + result.contact.firstname + " " + result.contact.lastname + " - tel : " + result.contact.phone + " / " + result.contact.phone_mobile + "\n";
        desc += "Societe : " + result.societe.name + " " + result.societe.address + " " + result.societe.zip + " " + result.societe.town;

        /*if(googleCalendar)
        googleCalendar.insertEvent(new_task.usertodo.id, {
            status: "confirmed",
            type: 'event',
            start: {
                dateTime: new_task.datep
            },
            end: {
                dateTime: new_task.datef
            },
            summary: (actioncomm.values[new_task.type].type == 'task' ? "Tache : " : "") + new_task.name + " (" + new_task.societe.name + ")",
            description: desc,
            location: new_task.societe.name,
            source: {
                title: "ERP CRM Speedealing",
                url: F.server + "/#!/task/" + new_task._id
            }
        }, function (err, event_id) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }

            //console.log(event_id);
        });*/

        //console.log(bill);
        new_task.save(function(err, task) {
            callback(err, task);

            if (socket == null)
                return;

            if (task.usertodo.id != user._id)
                socket.emit('notify', {
                    data: {
                        title: i18n.t('tasks:Task') + " : " + task.name,
                        body: user.firstname + " " + user.lastname + ' vous a ajouté une tache.',
                        url: {
                            module: 'task.show',
                            params: {
                                id: task._id
                            }
                        }
                    },
                    users: [task.usertodo.id]
                });

            //refresh tasklist and counter on users
            socket.emit('task', {
                type: 'create',
                data: task
            });
            socket.emit('publish', {
                type: 'create',
                data: task,
                uid: []
            }); // Send to SymeosNet
        });
    });
}

function updateTask(oldTask, newTask, user, socket, callback) {
    var old_userTodo = oldTask.usertodo.id;

    newTask = _.extend(oldTask, newTask);
    //console.log(req.body);

    if (newTask.notes.length && newTask.notes[newTask.notes.length - 1].percentage >= 100 && newTask.userdone.id == null) {
        newTask.userdone = {
            id: user._id,
            name: user.firstname + " " + user.lastname
        };

        if (newTask.author.id == user._id)
            newTask.archived = true;
    }

    if (newTask.notes.length && newTask.notes[newTask.notes.length - 1].percentage < 100)
        newTask.archived = false;


    if (actioncomm.values[newTask.type].type != 'event')
        newTask.datep = new Date(newTask.datef);

    if (actioncomm.values[newTask.type].type == 'event' && newTask.datep != null) {
        if (newTask.datef == null || newTask.datef <= newTask.datep) {
            newTask.datef = new Date(newTask.datep);
            newTask.datef.setHours(newTask.datef.getHours() + 1);
        }
    }

    //console.log(oldTask.usertodo.id + " " + newTask.usertodo.id);
    if (old_userTodo != newTask.usertodo.id)
        googleCalendar.insertEvent(newTask.usertodo.id, {
            status: "confirmed",
            start: {
                dateTime: newTask.datep
            },
            end: {
                dateTime: newTask.datef
            },
            summary: (actioncomm.values[newTask.type].type == 'task' ? "Tache : " : "") + newTask.name + " (" + newTask.societe.name + ")",
            description: "Rendez avec " + newTask.contact.name,
            location: newTask.societe.name,
            source: {
                title: "ERP CRM Speedealing",
                url: F.server + "/#!/task/" + newTask._id
            }
        }, function(err, event_id) {
            //if (err)
            //	console.log(err);

            //console.log(event_id);
        });

    newTask.save(function(err, task) {
        callback(err, task);

        if (socket == null)
            return;

        //var socket_author = usersSocket[task.author.id];
        //var socket_todo = usersSocket[task.usertodo.id];
        //console.log(usersSocket);

        var users = [];
        if (F.global.USERS)
            users = F.global.USERS;

        var dest = [];

        if (task.author.id != user._id)
            dest.push(task.author.id);

        if (task.usertodo.id != user._id && task.usertodo.id != task.author.id)
            dest.push(task.usertodo.id);

        if (task.percentage >= 100)
            socket.emit('notify', {
                data: {
                    title: i18n.t('tasks:Task') + " : " + task.name,
                    body: user.firstname + " " + user.lastname + ' a terminé la tache.',
                    url: {
                        module: 'task.show',
                        params: {
                            id: task._id
                        }
                    }
                },
                users: dest
            });
        else
            socket.emit('notify', {
                data: {
                    title: i18n.t('tasks:Task') + " : " + task.name,
                    body: user.firstname + " " + user.lastname + ' a modifié la tache.',
                    url: {
                        module: 'task.show',
                        params: {
                            id: task._id
                        }
                    }
                },
                users: dest
            });


        //refresh tasklist and counter on users
        socket.emit('task', {
            type: 'update',
            data: task
        });
        socket.emit('publish', {
            type: 'update',
            data: task,
            uid: []
        }); // Send to SymeosNet
    });
}

function removeTask(id, callback) {
    if (typeof id === 'array')
        TaskModel.remove({
            _id: {
                $in: id
            }
        }, callback);
    else
        TaskModel.remove({
            _id: id
        }, callback);
}

function getTask(id, callback) {
    TaskModel.findOne({
        _id: id
    }, callback);
}

/*function refreshTask(socket) {
 if (socket) {
 socket.broadcast.emit('refreshTask', {}); // others
 socket.emit('refreshTask', {}); //me
 }
 }*/