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

    // Menu employees
    $stateProvider.state('employee', {
            url: "/employee",
            abstract: true,
            templateUrl: "/views/employees/index.html"
        })
        .state('employee.list', {
            url: "",
            templateUrl: "/views/employees/list.html",
            data: {
                pageTitle: 'Liste des collaborateurs'
            },
            controller: "EmployeeController"
        })
        .state('employee.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/employees/fiche.html",
            data: {
                pageTitle: 'Fiche Collaborateur'
            },
            controller: "EmployeeController"
        })
        .state('employee.create', {
            parent: "employee",
            url: "/create.html",
            templateUrl: "/views/employees/main.html",
            data: {
                pageTitle: 'Nouveau Collaborateur'
            },
            controller: "EmployeeController"
        })
        // Main
        .state("employee.show.main", {
            templateUrl: "/views/employees/main.html",
            data: {
                pageTitle: 'Main'
            }
        })
        // Files
        .state('employee.show.files', {
            url: "/files",
            templateUrl: "/views/employees/files.html",
            data: {
                pageTitle: 'Images / Documents'
            }
        })
        // Personnal Information
        .state("employee.show.personnalinformation", {
            url: "/PersonnalInformation",
            templateUrl: "/views/employees/personal.html",
            data: {
                pageTitle: 'PersonnalInformation'
            }
        }) // Job
        .state("employee.show.job", {
            url: "/Job",
            templateUrl: "/views/employees/job.html",
            data: {
                pageTitle: 'Job'
            }
        })
        // Assignees
        .state("employee.show.assignees", {
            url: "/assignees",
            templateUrl: "/views/employees/assignees.html",
            data: {
                pageTitle: 'Affectation'
            }
        });
});

MetronicApp.factory("Employees", ['$resource', function($resource) {
    return $resource('/erp/api/employees/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);