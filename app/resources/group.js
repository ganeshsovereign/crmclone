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
    // Group management
    $stateProvider.state('group', {
            url: "/group",
            abstract: true,
            templateUrl: "/views/settings/group/index.html"
        })
        .state('group.list', {
            url: "",
            templateUrl: "/views/settings/group/list.html",
            data: {
                pageTitle: 'Liste des utilisateurs'
            },
            controller: "GroupController"
        })
        .state('group.create', {
            parent: "group",
            url: "/create.html",
            templateUrl: "/views/settings/group/create.html",
            data: {
                pageTitle: 'Nouveau groupe'
            },
            controller: "GroupController"
        })
        .state('group.show', {
            parent: "group",
            url: "/{id}",
            templateUrl: "/views/settings/group/fiche.html",
            data: {
                pageTitle: 'Fiche groupe'
            },
            controller: "GroupController"
        });
});
MetronicApp.factory("Group", ['$resource', function($resource) {
    return $resource('/erp/api/group/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);