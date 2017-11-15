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

MetronicApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('task', {
            url: "/task",
            abstract: true,
            templateUrl: "/views/task/index.html",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/assets/apps/css/todo.css'
                        ]
                    });
                }]
            }
        })
        .state('task.list', {
            url: "",
            templateUrl: "/views/task/list.html",
            data: {
                pageTitle: 'Liste des taches'
            },
            controller: "TaskController"
        })
        .state('task.todo', {
            url: "/todo?menuclose?group",
            templateUrl: "/views/task/todo.html",
            data: {
                pageTitle: 'Liste des tâches'
            },
            controller: "TaskController"
        })
        .state('task.show', {
            parent: "task",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/task/fiche.html",
            data: {
                pageTitle: 'Tâche'
            },
            controller: "TaskController"
        })
        .state('task.create', {
            parent: "task",
            url: "/create.html?societe",
            templateUrl: "/views/task/fiche.html",
            data: {
                pageTitle: 'Création d\'une tâche'
            },
            controller: "TaskController"
        });
});


MetronicApp.factory("Task", ['$resource', function($resource) {
    return $resource('/erp/api/task/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);