/**
 2014-2016 ToManage

NOTICE OF LICENSE

This source file is subject to the Open Software License (OSL 3.0)
that is bundled with this package in the file LICENSE.txt.
It is also available through the world-wide-web at this URL:
http://opensource.org/licenses/osl-3.0.php
If you did not receive a copy of the license and are unable to
obtain it through the world-wide-web, please send an email
to license@tomanage.fr so we can send you a copy immediately.

DISCLAIMER

Do not edit or add to this file if you wish to upgrade ToManage to newer
versions in the future. If you wish to customize ToManage for your
needs please refer to http://www.tomanage.fr for more information.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2016 ToManage SAS
@license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
International Registered Trademark & Property of ToManage SAS
**/


"use strict";
/* global angular: true */

MetronicApp.controller('ContactController', ['$scope', '$rootScope', '$http', '$filter', 'Societes', function($scope, $rootScope, $http, $filter, Societes) {

    $scope.contact = {
        soncas: []
    };
    $scope.dict = {};
    $scope.query = {}; //query for find

    $scope.editable = $rootScope.login.rights.contact.write;

    var grid = new Datatable();

    $scope.etats = [
        { id: "ST_NEVER", name: "Non déterminé" },
        { id: "ST_ENABLE", name: "Actif" },
        { id: "ST_DISABLE", name: "Inactif" },
        { id: "ST_NO", name: "Ne pas contacter" },
        { id: "ALL", name: "Tous" }
    ];

    $scope.soncas = [
        { value: "Sécurité", text: 'Sécurité' },
        { value: 'Orgueil', text: 'Orgueil' },
        { value: 'Nouveauté', text: 'Nouveauté' },
        { value: 'Confort', text: 'Confort' },
        { value: 'Argent', text: 'Argent' },
        { value: "Sympathique", text: 'Sympathique' }
    ];

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.etat = { id: "ST_ENABLE", name: "Actif" };
    // Init
    $scope.$on('$includeContentLoaded', function() {

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: ["fk_job", "fk_hobbies", "fk_civilite", "fk_user_status"]
            }
        }).success(function(data, status) {
            $scope.dict = data;
        });
    });
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        if ($rootScope.$state.current.parent === "contact")
            $rootScope.settings.layout.pageSidebarClosed = false;
        else
            $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

        if ($rootScope.$stateParams.societe)
            Societes.get({
                Id: $rootScope.$stateParams.societe
            }, function(societe) {
                $scope.contact.societe = {
                    id: societe._id,
                    name: societe.name
                };

                $scope.contact.address = societe.address;
                $scope.contact.zip = societe.zip;
                $scope.contact.town = societe.town;

            });

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: ["fk_job", "fk_hobbies", "fk_civilite", "fk_user_status"]
            }
        }).success(function(data, status) {
            $scope.dict = data;
        });

        if ($rootScope.$stateParams.Status) {
            $scope.status_id = $rootScope.$stateParams.Status;
            initDatatable({ status_id: $scope.status_id });
        } else
            initDatatable();

    });

    $scope.showStatus = function(idx, dict) {
        if (!($scope.dict[dict] && $scope.contact[idx]))
            return 'Non défini';
        var selected = $filter('filter')($scope.dict[dict].values, {
            id: $scope.contact[idx]
        });

        return ($scope.contact[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
    };


    // toggle selection for a given soncas by value
    $scope.toggleSelection = function toggleSelection(s) {
        var idx = $scope.contact.soncas.indexOf(s.value);

        // is currently selected
        if (idx > -1) {
            $scope.contact.soncas.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.contact.soncas.push(s.value);
        }
    };

    $scope.updateAddress = function(data) {

        $scope.contact.address = data.address.address;
        $scope.contact.zip = data.address.zip;
        $scope.contact.town = data.address.town;

        return true;
    };

    $scope.loadDatatable = function(query) {
        $scope.query = query;
        initDatatable();
    };

    $scope.create = function() {
        var contact = new Societes(this.contact);

        contact.$save(function(response) {
            //console.log(response);
            if (response.societe.id)
                $rootScope.$state.go("societe.show", { id: response.societe.id });
            else
                $rootScope.$state.go("contact.show", { id: response._id });
        });
    };

    $scope.findOne = function() {

        Societes.get({
            Id: $rootScope.$stateParams.id
        }, function(doc) {
            $scope.contact = doc;
        });

    };

    $scope.update = function() {

        var contact = $scope.contact;

        contact.$update(function(response) {
            $scope.contact = response;
        }, function(errorResponse) {

        });
    };

    $scope.remove = function(contact) {
        contact.$remove(function(response) {
            $rootScope.goBack();
        });
    };

    $scope.createLogin = function(contact) {
        if (!contact.email)
            return;

        $http({
            method: 'POST',
            url: '/erp/api/contact/login/' + contact._id
        }).success(function(data, status) {
            if (status == 200)
                $scope.contact = data;
        });

    };

    function getUrl() {
        var url = "/erp/api/societe/dt?type=Person";

        console.log($scope.query);

        //var cpt = 0;
        for (var i in $scope.query) {
            //    if (cpt === 0)
            //        url += "?";
            //    else
            //        url += "&";
            url += i + "=" + $scope.query[i];
            //    cpt++;
        }

        return url;
    }

    function initDatatable() {

        grid.init({
            src: $("#contactList"),
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

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": getUrl() // ajax source
                },
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool'
                }, {
                    "data": "name.last"
                }, {
                    "data": "name.first"
                }, {
                    "data": "poste",
                    defaultContent: ""
                }, {
                    "data": "company",
                    visible: $rootScope.$state.current.name === "contact.list",
                    defaultContent: ""
                }, {
                    "data": "phones.phone",
                    defaultContent: ""
                }, {
                    "data": "phones.mobile",
                    defaultContent: ""
                }, {
                    "data": "emails",
                    defaultContent: ""
                }, {
                    "data": "Status"
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

    $scope.find = function(id) {
        if (id)
            return Societes.query({
                company: id,
                type: "Person",
                field: "name contatInfo phones emails"
            }, function(data) {
                console.log(data);
                $scope.contacts = data.data;
            });

        var url = getUrl();
        grid.resetFilter(url);
        console.log("toto", url);
    };

}]);

MetronicApp.controller('ContactCreateController', ['$scope', '$rootScope', '$http', '$modalInstance', 'Societes', 'object', function($scope, $rootScope, $http, $modalInstance, Societes, object) {

    $scope.listCode = {};
    $scope.active = 1;
    $scope.dict = {};

    $scope.contact = {
        soncas: []
    };

    $scope.soncas = [
        "Sécurité", 'Orgueil', 'Nouveauté', 'Confort', 'Argent', "Sympathique"
    ];

    $scope.init = function() {
        //console.log(object);
        if (object.societe)
            $scope.contact = {
                societe: {
                    id: object.societe.id || object.societe._id,
                    name: object.societe.name
                },
                address: object.societe.address,
                zip: object.societe.zip,
                town: object.societe.town
            };

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: ["fk_civilite", "fk_job"]
            }
        }).success(function(data, status) {
            $scope.dict = data;
        });
    };

    $scope.isActive = function(idx) {
        if (idx === $scope.active)
            return "active";
    };

    $scope.createContact = function() {

        $scope.contact.user_creat = $rootScope.login._id;

        var contact = new Contacts(this.contact);

        contact.$save(function(response) {
            //console.log(response);
            $modalInstance.close(response);
        });
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };


}]);