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

MetronicApp.controller('GroupController', ['$scope', '$rootScope', '$http', 'Group', function($scope, $rootScope, $http, Group) {
    var grid = new Datatable();
    var user = $rootScope.login;


    $scope.groupRightsCreate = true;
    $scope.groupRightsDelete = true;
    $scope.groupRightsReadPerms = true;
    $scope.group = {};
    $scope.validLogin = true;
    $scope.validEmail = true;
    $scope.oneAtATime = true;
    // Check group rights
    /*if (!Global.user.admin && !Global.user.superadmin) {
     
     if (!Global.user.rights.group.delete)		// check group delete 
     $scope.groupRightsDelete = false;
     if (!Global.user.rights.group.write)		// check group write
     $scope.groupRightsCreate = false;
     if (!Global.user.rights.group.readperms)	// check group readperms
     $scope.groupRightsReadPerms = false;
     
     }*/

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        if ($rootScope.$stateParams.Status) {
            $scope.status_id = $rootScope.$stateParams.Status;
            initDatatable({
                status_id: $scope.status_id
            });
        } else
            initDatatable();

    });

    function getUrl(params) {

        if (!params)
            params = {};

        var url = $rootScope.buildUrl('/erp/api/group/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#groupList"),
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
                    data: "name",
                    defaultContent: ""
                }, {
                    data: "count",
                    defaultContent: ""
                }, {
                    data: "updatedAt",
                    defaultContent: ""
                }, {
                    data: 'action'
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

    $scope.addNewUser = function() {

        $http({
            method: 'PUT',
            url: '/erp/api/group/addUserToGroup',
            params: {
                user: $scope.group.newUser._id,
                groupe: $scope.group._id
            }
        }).success(function(status) {

            $scope.findOne();
        });

    };

    $scope.findOne = function() {

        Group.get({
            Id: $rootScope.$stateParams.id
        }, function(doc) {

            $scope.group = doc;

            $http({
                method: 'GET',
                url: '/erp/api/group/users',
                params: {
                    group: $scope.group._id
                }
            }).success(function(data, status) {
                $scope.listUsers = data;
                $scope.NbrListUsers = data.length;
            });

            $http({
                method: 'GET',
                url: '/erp/api/group/noUsers',
                params: {
                    group: $scope.group._id
                }
            }).success(function(data, status) {
                $scope.listNoUsers = data;
            });

            // Check group rights
            if (!$rootScope.login.admin) {

                if ($rootScope.login.groupe == $scope.group._id && $rootScope.login.rights.user.self_readperms) // check user self_readperms
                    $scope.groupRightsReadPerms = true;

            } else {

                if ($rootScope.login.groupe == $scope.group._id) // an admin can not delete a group to which it belongs
                    $scope.groupRightsDelete = false;

            }

            if ($scope.groupRightsReadPerms) {
                $http({
                    method: 'GET',
                    url: '/erp/api/rights'
                }).success(function(data, status) {
                    $scope.modules = data;
                    console.log(data);
                });
            }
        });

    };

    $scope.deleteGroup = function() {

        if ($scope.listUsers.length > 0)
            return alert("ce groupe ne peut pas être supprimer");

        var group = $scope.group;
        group.$remove(function(response) {
            $location.path('/group');
        });
    };

    $scope.removeUser = function(user) {

        $http({
            method: 'PUT',
            url: '/erp/api/group/removeUserFromGroup',
            params: {
                user: user,
                group: $scope.group._id
            }
        }).success(function(data, status) {
            $scope.listUsers;
            $scope.findOne();

        });

    };

    $scope.create = function() {
        var group = new Group(this.group);
        group.$save(function(response) {
            $rootScope.$state.go("group.show", {
                id: response._id
            });
        });
    };

    $scope.update = function() {

        var group = $scope.group;

        group.$update(function() {

        });
    };


}]);