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
/* global angular: true */

MetronicApp.controller('TaskController', ['$scope', '$rootScope', '$http', 'Task', 'Societes', 'Group', function($scope, $rootScope, $http, Task, Societes, Group) {

    var user = $rootScope.login;
    var grid = new Datatable();

    $scope.task = {
        //type: "AC_RDV",
        usertodo: {
            _id: user._id,
            username: user.username
        },
        datep: new Date().setHours(new Date().getHours(), 0),
        datef: new Date().setHours(new Date().getHours() + 1, 0),
        entity: user.entity,
        notes: []
    };

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.ismeridian = false;
    $scope.isEvent = false;

    $scope.leads = [];

    $scope.eventType = {
        /*     enable: true,
         id: "AC_RDV",
         label: "Rendez-vous",
         order: 1,
         priority: 10,
         type: "event"*/
    };

    $scope.contacts = [];
    $scope.dict = {};
    $scope.opened = [];

    $scope.tasks = [];

    $scope.group = $rootScope.login.group || $rootScope.$stateParams.group; // default group
    $scope.groups = [];

    $scope.types = [];

    if (user.rights.task && user.rights.task.readAll)
        $scope.types = [{
                name: "Mes tâches en cours",
                id: "MYTASK"
            },
            {
                name: "Toutes les tâches en cours",
                id: "ALLTASK"
            },
            {
                name: "Mes tâches archivées",
                id: "MYARCHIVED"
            },
            {
                name: "Les tâches archivées",
                id: "ARCHIVED"
            }
        ];
    else
        $scope.types = [{
                name: "Mes tâches en cours",
                id: "MYTASK"
            },
            {
                name: "Mes tâches archivées",
                id: "MYARCHIVED"
            }
        ];

    $scope.params = {
        type: "MYTASK"
    };

    $scope.user = {
        _id: user._id,
        fullName: user.fullName
    };

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = closed;

        if ($rootScope.$stateParams.menuclose)
            $rootScope.settings.layout.pageSidebarClosed = true;

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: "fk_actioncomm"
            }
        }).success(function(data, status) {
            $scope.dict.fk_actioncomm = data;

            $scope.dict.isEvent = [];
            for (var i = 0; i < data.values.length; i++) {
                if (data.values[i].type == 'event')
                    $scope.dict.isEvent.push(data.values[i].id);
            }

            if ($rootScope.$stateParams.id)
                $scope.findOne();
        });

        if ($rootScope.$state.current.name === 'task.todo') {
            $rootScope.settings.layout.pageBodySolid = true;
            $scope.loadGroup(function() {
                $scope.find();
            });
        } else if ($rootScope.$state.current.name === 'task.create') {
            if ($rootScope.$stateParams.societe)
                Societes.get({
                    Id: $rootScope.$stateParams.societe
                }, function(societe) {
                    $scope.task.societe = {
                        id: societe._id,
                        name: societe.name
                    };

                    $scope.searchContact(societe);
                });

            $scope.loadGroup();
        } else if ($rootScope.$state.current.name === 'task.list')
            initDatatable();


    });

    $scope.$on('$includeContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: "fk_actioncomm"
            }
        }).success(function(data, status) {
            $scope.dict.fk_actioncomm = data;

            $scope.dict.isEvent = [];
            for (var i = 0; i < data.values.length; i++) {
                if (data.values[i].type == 'event')
                    $scope.dict.isEvent.push(data.values[i].id);
            }
        });
    });

    $scope.ngIncludeInit = function(params, length) {
        $scope.params = params;
        initDatatable(params, length);
    };

    $scope.update = function() {
        var task = $scope.task;

        task.$update(function(response) {

        });
    };

    $scope.findOne = function() {
        Task.get({
            Id: $rootScope.$stateParams.id
        }, function(task) {
            $scope.task = task;
            $scope.editable = !task.archived;

            if ($scope.dict.isEvent.indexOf(task.type) >= 0)
                $scope.isEvent = true;
            else
                $scope.isEvent = false;

            if ($scope.task.length) {
                var inOut = false; //in
                var old = $scope.task.notes[0].author;
                for (var i = 0, len = $scope.task.length; i < len; i++) {
                    if (old !== $scope.task.notes[i].author)
                        inOut = !inOut;
                    $scope.task.notes[i].class = inOut;
                }
            }

        });

    };

    $scope.loadContact = function(item) {
        if (item && item.id)
            $http({
                method: 'GET',
                url: '/erp/api/contact',
                params: {
                    find: {
                        "societe": item.id
                    },
                    field: "_id firstname lastname name poste"
                }
            }).success(function(data) {
                $scope.contacts = data;
            });
    };


    $scope.loadLead = function(item) {
        if (item && item.id)
            $http({
                method: 'GET',
                url: '/erp/api/lead',
                params: {
                    'societe.id': item.id
                }
            }).success(function(data) {
                $scope.leads = data;
            });
    };

    $scope.loadGroup = function(callback) {
        Group.query({}, function(groups) {
            //console.log("GROUPS", groups);
            $scope.groups = groups;
            if (callback)
                callback();
        });
    };


    $scope.addNote = function() {
        if (!this.newNote)
            return;

        $scope.task.notes.push({
            note: this.newNote,
            percentage: $scope.task.percentage,
            datec: new Date(),
            author: user._id
        });

        this.newNote = "";

        $scope.update();
    };

    $scope.updatePercent = function(percentage) {
        if ($scope.task.notes.length > 0 && $scope.task.notes[$scope.task.notes.length - 1].author == user._id) {
            $scope.task.notes[$scope.task.notes.length - 1].percentage = percentage;
            $scope.task.notes[$scope.task.notes.length - 1].datec = new Date();
        } else
            $scope.task.notes.push({
                percentage: percentage,
                datec: new Date(),
                author: user._id
            });

        $scope.update();
    };

    $scope.closed = function(row) {
        //console.log(row);


        if (!row.userdone || !row.userdone.id) {
            if (row.notes.length > 0 && row.notes[row.notes.length - 1].author == user._id) {
                row.notes[row.notes.length - 1].percentage = 100;
                row.notes[row.notes.length - 1].datec = new Date();
            } else
                row.notes.push({
                    percentage: 100,
                    datec: new Date(),
                    author: user._id
                });
        }

        row.$update();
        if (row.archived)
            $scope.editable = false;
    };

    function getUrl(params) {

        if (!params)
            params = {};

        if (!params.entity)
            params.entity = $rootScope.entity;

        var url = $rootScope.buildUrl('/erp/api/task/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#taskList"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error 
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "bStateSave": (params ? false : true), // save datatable state(pagination, sort, etc) in cookie.

                "pageLength": length || 25, // default record count per page
                "ajax": {
                    "url": getUrl(params) // ajax source
                },
                "order": [
                    [2, "desc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool',
                    "searchable": false
                }, {
                    data: "name"
                }, {
                    data: "datef",
                    defaultContent: ""
                }, {
                    data: "societe.name",
                    defaultContent: "",
                    visible: (params && params['societe.id'] ? false : true)
                }, {
                    data: "author.name",
                    defaultContent: ""
                }, {
                    data: "usertodo.name",
                    defaultContent: ""
                }, {
                    data: "userdone.name",
                    defaultContent: ""
                }, {
                    data: "Status",
                    defaultContent: "",
                    "searchable": false
                }, {
                    data: "entity",
                    defaultContent: "",
                    visible: user.multiEntities,
                    "searchable": false
                }, {
                    data: "updatedAt",
                    defaultContent: ""
                }, {
                    data: 'action',
                    "searchable": false
                }]
            }
        });

        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function(e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("customActionType", "group_action");
                grid.setAjaxParam("customActionName", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });
    }

    $scope.find = function(group) {
        if ($rootScope.$state.current.name === 'task.list') {
            var url;
            //console.log(this.status_id);

            if ($scope.params) { // For ng-include in societe fiche
                $scope.params.status_id = this.status_id;
                url = getUrl($scope.params);
            } else
                url = getUrl({
                    status_id: this.status_id
                });

            return grid.resetFilter(url);
        }

        if (group)
            $scope.group = group;

        var p = {
            fields: "_id percentage name datef societe notes updatedAt author usertodo userdone archived entity description group",
            query: ($scope.group ? "GROUPTASK" : "MYTASK"), //group or all
            //entity: Global.user.entity,
            user: $rootScope.login._id,
            group: $scope.group || {
                $in: $scope.groups
            },
            //filter: $scope.filterOptions.filterText,
            //skip: $scope.pagingOptions.currentPage - 1,
            //limit: $scope.pagingOptions.pageSize,
            sort: {
                datef: 1
            }
        };

        Task.query(p, function(tasks) {
            //console.log(tasks);
            $scope.tasks = tasks;
        });

        $http({
            method: 'GET',
            url: '/erp/api/task/countgroup'
        }).success(function(data, status) {

            for (var i = 0, len = data.length; i < len; i++)
                for (var j = 0, len1 = $scope.groups.length; j < len1; j++) {
                    if (data[i]._id == $scope.groups[j].id) {
                        $scope.groups[j].countTask = data[i].count;
                        break;
                    }
                }
        });
    };


    $scope.setArchived = function(row) {
        row.archived = true;

        $scope.closed(row);
    };

    $scope.create = function() {
        var task = new Task(this.task);
        task.$save(function(response) {
            $rootScope.$state.go("task.todo");
        });
    };

    $scope.remove = function(task) {
        if (!task && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/task',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }

        task.$remove(function() {
            $rootScope.$state.go("task.todo");
        });
    };

    $scope.typeChange = function(type) {
        //console.log(type);
        //console.log($scope.dict.fk_actioncomm.values[index]);
        $scope.task.type = type.id;
        //return false;
        if (type.type == "event")
            $scope.isEvent = true;
        else
            $scope.isEvent = false;
    };

    $scope.open = function($event, idx) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[idx] = true;
    };

    $scope.searchContact = function(item) {
        $scope.task.contact = {};

        if (item && item.id) {
            $http({
                method: 'GET',
                url: '/erp/api/contact',
                params: {
                    find: {
                        "societe": item.id
                    },
                    field: "_id firstname lastname name poste"
                }
            }).success(function(data) {
                console.log(data);
                $scope.contacts = data;
            });

            $http({
                method: 'GET',
                url: '/erp/api/lead',
                params: {
                    'societe.id': item.id
                }
            }).success(function(data) {
                $scope.leads = data;
            });
        }
    };

    $scope.$on('websocket', function(e, type, data) {
        //console.log(data);
        //console.log(type);
        if (type === 'task' && ($rootScope.$state.current.name === 'task.todo' || $rootScope.$state.current.name === 'task.list'))
            $scope.find();

    });
    /*socket.on('refreshTask', function (data) {
     $scope.find();
     });*/



}]);