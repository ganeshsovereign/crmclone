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

    // Company
    $stateProvider.state('societe', {
            url: "/societe",
            abstract: true,
            templateUrl: "/views/company/index.html"
        })
        .state('societe.list', {
            url: "?forSales&type",
            templateUrl: "/views/company/list.html",
            data: {
                pageTitle: 'Liste des societes'
            },
            controller: "SocieteController"
        })
        .state('societe.show', {
            parent: "societe",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/company/fiche.html",
            data: {
                pageTitle: 'Fiche societe'
            },
            controller: "SocieteController"
        })
        .state('societe.show.company', {
            templateUrl: "/views/company/company.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        /*.state('societe.show.person', {
            url: "/person",
            templateUrl: "/views/company/company.html", //TODO company > person
            data: {
                pageTitle: 'Fiche societe'
            }
        })*/
        .state('societe.show.commercial', {
            url: "/commercial",
            templateUrl: "/views/company/commercial.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.addresses', {
            url: "/addresses",
            templateUrl: "/views/company/addresses.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.billing', {
            url: "/billing",
            templateUrl: "/views/company/billing.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.task', {
            url: "/task",
            templateUrl: "/views/company/task.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.files', {
            url: "/files",
            templateUrl: "/views/company/files.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.feeds', {
            url: "/feeds",
            templateUrl: "/views/company/feeds.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.show.stats', {
            url: "/stats",
            templateUrl: "/views/company/stats.html",
            data: {
                pageTitle: 'Fiche societe'
            }
        })
        .state('societe.create', {
            parent: "societe",
            url: "/create.html",
            templateUrl: "/views/company/company.html",
            data: {
                pageTitle: 'Creation clients/fournisseur'
            },
            controller: "SocieteController"
        })
        .state('societe.stats', {
            parent: "societe",
            url: "/stats",
            templateUrl: "/views/company/stats.html",
            data: {
                pageTitle: 'Statistiques client'
            },
            controller: "SocieteStatsController"
        })
        // Contact
        .state('contact', {
            url: "/contact",
            abstract: true,
            templateUrl: "/views/contact/index.html"
        })
        .state('contact.list', {
            url: "?type",
            templateUrl: "/views/company/list.html",
            data: {
                pageTitle: 'Liste des contacts'
            },
            controller: "SocieteController"
        })
        .state('contact.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/contact/fiche.html",
            data: {
                pageTitle: 'Fiche contact'
            },
            controller: "ContactController"
        })
        .state('contact.create', {
            parent: "contact",
            url: "/create.html?societe",
            templateUrl: "/views/contact/create.html",
            data: {
                pageTitle: 'Creation contact'
            },
            controller: "ContactController"
        });
});

MetronicApp.factory("Societes", ['$resource', function($resource) {
    return $resource(
        '/erp/api/societe/:Id', {
            Id: '@_id'
        }, {
            query: {
                method: 'GET',
                isArray: false
            },
            update: {
                method: 'PUT'
            }
        });
}]);