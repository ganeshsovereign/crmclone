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

var _ = require('lodash'),
    moment = require('moment'),
    async = require('async');

var Task = INCLUDE('task');

exports.install = function() {

    var object = new Object();
    F.route('/erp/api/task', object.read, ['authorize']);
    F.route('/erp/api/task/countgroup', object.countgroup, ['authorize']);
    F.route('/erp/api/task/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/task', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/task/{id}', object.show, ['authorize']);
    F.route('/erp/api/task/{id}', object.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/task/', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/task/{id}', object.destroy, ['delete', 'authorize']);

};

function Object() {}

Object.prototype = {
    read: function() {

        var self = this;
        Task.read(self.req.query, function(err, tasks) {
            if (err)
                return self.throw500(err);

            if (tasks)
                self.json(tasks);
            else
                self.json([]);
        });
    },
    count: function() {
        var self = this;
        Task.count(self.query, function(err, count) {
            if (err)
                return self.throw500(err);

            self.json({
                count: count
            });
        });
    },
    countgroup: function() {
        var self = this;
        Task.countGroup(self.user, function(err, data) {
            if (err)
                return self.throw500(err);

            self.json(data);
        });
    },
    create: function() {
        var self = this;

        console.log(self.body);

        Task.create(self.body, self.user, F.functions.EE, function(err, task) {
            if (err)
                return self.throw500(err);

            self.json(task);
        });
    },
    update: function(id) {
        var self = this;

        var usersSocket = null;

        Task.get(id, function(err, task) {
            Task.update(task, self.body, self.user, F.functions.EE, function(err, task) {
                if (err)
                    return self.throw500(err);


                /*F.functions.EE.emit('notify', {
                 data: {
                 title: "test",
                 body: "Msg test",
                 url: {
                 module: 'task.show',
                 params: {
                 id: task._id
                 }
                 }
                 },
                 users: ["user:chauffeurs"]
                 });*/

                self.json(task);
            });
        });
    },
    destroy: function(id) {
        var self = this;
        Task.remove(id, function(err) {
            if (err)
                return self.throw500(err);

            F.functions.EE.emit('task', {
                type: 'delete'
            });
            self.json({});
        });
    },
    destroyList: function() {
        var self = this;

        if (!this.query.id)
            return self.throw500("No ids in destroy list");

        //var list = JSON.parse(this.query.id);
        var list = this.query.id;
        if (!list)
            return self.throw500("No ids in destroy list");

        var ids = [];

        if (typeof list === 'object')
            ids = list;
        else
            ids.push(list);

        Task.remove(ids, function(err) {
            if (err)
                return self.throw500(err);

            F.functions.EE.emit('task', {
                type: 'delete'
            });
            self.json({});
        });
    },
    show: function(id) {
        var self = this;
        Task.get(id, function(err, task) {

            // add left right for conversation presentation
            if (task) {
                var leftright = false;
                for (var i = 1, len = task.notes.length; i < len; i++) {
                    if (task.notes[i].author.id !== task.notes[i - 1].author.id) // Author is different
                        leftright = !leftright;

                    task.notes[i].class = leftright;
                }
                //console.log(task);
            }

            self.json(task);
        });
    },
    readDT: function() {
        var self = this;
        var TaskModel = MODEL('task').Schema;

        var paramsDatatable = JSON.parse(self.body.query);

        //console.log(paramsDatatable);

        var query = Task.query({
            query: self.query,
            user: self.user._id
        });

        //console.log(query);

        var conditions = query;

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        //console.log(self.query);
        if (self.query['societe.id'])
            conditions['societe.id'] = self.query['societe.id'];

        var options = {
            conditions: conditions,
            select: "societe.id notes"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                 dictName: "fk_bill_status",
                 object: true
                 }, cb);*/
                cb();
            },
            datatable: function(cb) {
                TaskModel.dataTable(paramsDatatable, options, cb);
            }
        }, function(err, res) {
            if (err)
                return self.throw500(err);

            //console.log(res);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];
                var status = Task.Status(row.notes, row.datef);

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                // Add link company
                if (row.societe && row.societe.id)
                    res.datatable.data[i].societe.name = '<a class="with-tooltip" href="#!/societe/' + row.societe.id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.societe.name + '"><span class="fa fa-institution"></span> ' + row.societe.name + '</a>';

                // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();
                //if (res.datatable.data[i].Status === 'SEND')
                // Add color line 
                //    res.datatable.data[i].DT_RowClass = "bg-green-turquoise";
                // Action
                res.datatable.data[i].action = '<a href="/erp/#!/task/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].name = '<a class="with-tooltip" href="/erp/#!/task/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name + '">' + row.name + '</a>';
                // Convert Date
                res.datatable.data[i].datef = (row.datef ? moment(row.datef).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                // Convert Status

                //console.log(row.notes);
                res.datatable.data[i].Status = '<span class="label label-sm ' + status.css + '">' + status.name + '</span>';
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    }
};