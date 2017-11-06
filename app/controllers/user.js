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

MetronicApp.controller('UserController', ['$scope', '$rootScope', '$http', '$filter', 'Users', 'Group', function($scope, $rootScope, $http, $filter, Users, Group) {
    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.backTo = 'user.list';
    $scope.createMod = true;

    $scope.editable = false;

    $scope.user = {
        entity: $rootScope.login.entity,
        datec: new Date()
    };

    $scope.dict = {};
    $scope.users = [];
    $scope.status_id = null;
    $scope.validLogin = false;
    $scope.validEmail = true;
    $scope.groups = [];
    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_user_status", "fk_rh_categorie", "fk_job", "fk_country", "fk_departements", "fk_rh_niveauEtude", "fk_rh_contrat", "fk_rh_situationFamiliale", "fk_rh_tempsTravail"];

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;
            //console.log(data);
        });

        Group.query({}, function(groups) {
            //console.log(groups);
            $scope.groups = groups;
        });

        if (!$rootScope.$stateParams.id)
            if ($rootScope.$stateParams.Status) {
                $scope.status_id = $rootScope.$stateParams.Status;
                initDatatable({
                    status_id: $scope.status_id
                });
            } else
                initDatatable();

    });

    // Init ng-include
    $scope.$on('$includeContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_user_status"];

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;
            //console.log(data);
        });

    });

    $scope.ngIncludeInit = function(params, length) {
        $scope.params = params;
        initDatatable(params, length);
    };

    $scope.create = function() {
        var user = new Users.users(this.user);
        user.$save(function(response) {
            $rootScope.$state.go("user.show", {
                id: response._id
            });
        });
    };

    $scope.showStatus = function(val, dict) {
        if (!($scope.dict[dict] && $scope.user[val]))
            return;
        var selected = $filter('filter')($scope.dict[dict].values, {
            id: $scope.user[val]
        });

        return ($scope.user[val] && selected && selected.length) ? selected[0].label : 'Non défini';
    };

    $scope.remove = function(user) {
        if (!user && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/users',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }
        user.$remove(function() {
            $rootScope.$state.go("user.list");
        });
    };

    $scope.update = function(options, callback) { //example options : {status: Status}
        var user = $scope.user;

        user.$update(options, function(response) {

            $scope.user = response;

            if (callback)
                callback(null, response);
        });
    };

    $scope.findOne = function() {
        if (!$rootScope.$stateParams.id)
            return;
        $scope.createMod = false;
        Users.users.get({
            Id: $rootScope.$stateParams.id
        }, function(user) {
            //console.log(user);
            $scope.user = user;
            $scope.editable = true; // TODO ajouter controle d'acces

            $http({
                method: 'GET',
                url: 'api/ticket',
                params: {
                    find: {
                        "linked.id": user._id
                    },
                    fields: "name ref updatedAt percentage Status task"
                }
            }).success(function(data, status) {
                if (status == 200)
                    $scope.tickets = data;

                $scope.countTicket = $scope.tickets.length;
            });

        }, function(err) {
            if (err.status == 401)
                $location.path("401.html");
        });
    };

    function getUrl(params) {

        if (!params)
            params = {};

        if (!params.entity)
            params.entity = $rootScope.entity;

        var url = $rootScope.buildUrl('/erp/api/user/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#userList"),
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
                    [1, "asc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool'
                }, {
                    data: "username",
                    defaultContent: ""
                }, {
                    data: "email",
                    defaultContent: ""
                }, {
                    data: "groupe",
                    defaultContent: ""
                }, {
                    data: "lastConnection",
                    defaultContent: ""
                }, {
                    data: "createdAt",
                    defaultContent: ""
                }, {
                    data: 'Status'
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

    $scope.find = function() {
        var url;
        //console.log(this.status_id);

        if ($scope.params) { // For ng-include in societe fiche
            $scope.params.status_id = this.status_id;
            url = getUrl($scope.params);
        } else
            url = getUrl({
                status_id: this.status_id
            });

        grid.resetFilter(url);
    };


    /*
     * NG-GRID for ticket list
     */

    $scope.filterOptionsTicket = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.gridOptionsTicket = {
        data: 'tickets',
        enableRowSelection: false,
        sortInfo: {
            fields: ["updatedAt"],
            directions: ["desc"]
        },
        filterOptions: $scope.filterOptionsTicket,
        i18n: 'fr',
        enableColumnResize: true,
        columnDefs: [{
                field: 'name',
                displayName: 'Titre',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/ticket/{{row.getProperty(\'_id\')}}" data-tooltip-options=\'{"position":"right"}\' title=\'{{row.getProperty("task")}}\'><span class="icon-ticket"></span> {{row.getProperty(col.field)}}</a>'
            },
            {
                field: 'ref',
                displayName: 'Id'
            },
            {
                field: 'percentage',
                displayName: 'Etat',
                cellTemplate: '<div class="ngCellText"><progressbar class="progress-striped thin" value="row.getProperty(col.field)" type="success"></progressbar></div>'
            },
            {
                field: 'updatedAt',
                displayName: 'Dernière MAJ',
                cellFilter: "date:'dd-MM-yyyy HH:mm:ss'"
            }
        ]
    };

    $scope.changeStatus = function(Status) {
        $scope.user.Status = Status;
        $scope.update({
            Status: Status
        });
    };

    $scope.checkUserExist = function(data) {
        if (!data || data.length < 6) {
            $scope.validLogin = false;
            return "Nom utilisateur trop court";
        }

        return $http.get('/erp/api/user/' + data).then(function(user) {
            if (!user.data)
                return true;

            if ($scope.user && user.data._id && $scope.user._id == user.data._id) {
                $scope.validLogin = true;
                return true;
            }

            if (user.data._id) {
                $scope.validLogin = false;
                return 'Erreur de username';
            }


            $scope.validLogin = true;
            return true;
        });

    };
    $scope.checkEmailExist = function(data) {
        if (!data)
            return;

        return $http.get('/erp/api/user/email/?email=' + data).then(function(user) {
            if (!user.data)
                return true;

            // if edit mode
            if ($scope.user && user.data._id && $scope.user._id == user.data._id) {
                $scope.validEmail = true;
                return true;
            }

            if (user.data._id) {
                $scope.validEmail = false;
                return 'Erreur adresse email';
            }

            $scope.validEmail = true;
            return true;
        });

    };


}]);

MetronicApp.controller('BoxRHController', ['$rootScope', '$scope', '$http', '$timeout', 'Users', function($rootScope, $scope, $http, $timeout, Users) {

    $scope.loadAbsences = function() {
        Users.absences.query({
            query: 'NOW'
        }, function(absences) {
            $scope.absences = absences;
            //console.log(absences);
        });
    };

    $scope.absenceAddTick = function(user) {
        user.closed = true;
        //console.log(user);
        user.$update();
        $scope.absences.splice($scope.absences.indexOf(user), 1);
    };

    $scope.late = function(date) {
        if (new Date(date) <= new Date())
            return "font-red-intense";
    };

}]);