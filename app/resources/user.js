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
    $stateProvider.state('user', {
            url: "/user",
            abstract: true,
            templateUrl: "/views/settings/user/index.html"
        })
        .state('user.list', {
            url: "",
            templateUrl: "/views/settings/user/list.html",
            data: {
                pageTitle: 'Liste des utilisateurs'
            },
            controller: "UserController"
        })
        .state('user.create', {
            parent: "user",
            url: "/create.html",
            templateUrl: "/views/settings/user/fiche.html",
            data: {
                pageTitle: 'Nouvel utilisateur'
            },
            controller: "UserController"
        })
        .state('user.show', {
            parent: "user",
            url: "/{id}",
            templateUrl: "/views/settings/user/fiche.html",
            data: {
                pageTitle: 'Fiche collaborateur'
            },
            controller: "UserController"
        });
});


MetronicApp.factory("Users", ['$resource', function($resource) {
    return {
        users: $resource('/erp/api/users/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }),
        absences: $resource('/erp/api/user/absence/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    };
}]);