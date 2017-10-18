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



'use strict';

angular.module("MetronicApp").controller('SettingGeneralController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

    });



}]);

angular.module("MetronicApp").controller('SettingEntityController', ['$rootScope', '$scope', '$http', '$timeout', 'Settings', function($rootScope, $scope, $http, $timeout, Settings) {
    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.backTo = 'settings.entity.list';
    $scope.object = {};

    $scope.societe = [];

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

        initDatatable();

    });

    $scope.create = function() {
        let entity = new Settings.entity(this.entity);

        entity.$save(function(response) {
            //console.log(response);
            $rootScope.$state.go("settings.entity.show", {
                id: response._id
            });
        });
    };

    $scope.update = function(options, callback) { //example options : {status: Status}
        let societe = $scope.societe;

        entity.$update(options, function(response) {
            $scope.societe = response;
            if (callback)
                callback(null, response);
        });
    };

    function getUrl(params) {

        if (!params)
            params = {};

        var url = $rootScope.buildUrl('/erp/api/entity/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#entityList"),
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


}]);

angular.module("MetronicApp").controller('SettingProductController', ['$rootScope', '$scope', '$http', '$timeout', 'Settings', function($rootScope, $scope, $http, $timeout, Settings) {
    var current = $rootScope.$state.current.name.split('.');
    $scope.backTo = 'settings.product.types';

    //if (current[0] == 'settings' && current.length <= 2)
    //    return $rootScope.$state.go('settings.product.types');

    $scope.edit = [];

    $scope.newline = {};

    $scope.$dict = {
        attributesMode: [{
            id: 'text',
            name: 'Champs texte',
            isActive: true
        }, {
            id: 'number',
            name: 'Nombre',
            isActive: true
        }, {
            id: 'metric',
            name: 'Valeur metrique',
            isActive: true
        }, {
            id: 'min-max',
            name: 'Minimun et maximum',
            isActive: true
        }, {
            id: 'textarea',
            name: 'Texte long',
            isActive: true
        }, {
            id: 'boolean',
            name: 'Oui/Non',
            isActive: false
        }, {
            id: 'select',
            name: 'Valeurs pré-définies',
            isActive: true
        }, {
            id: 'date',
            name: 'Date',
            isActive: false
        }, {
            id: 'file',
            name: 'Fichier',
            isActive: false
        }, {
            id: 'image',
            name: 'Image',
            isActive: false
        }]
    };
    $scope.object = {
        langs: [],
        address: {},
        zones: [],
        locations: []
    };
    $scope.listObject = [];

    console.log(current);
    if (current[0] === 'settings')
        switch (current[2]) {
            case 'types':
                var Resource = Settings.productTypes;
                $scope.backTo = 'settings.product.types';
                var goShow = 'settings.product.types.show';
                break;
            case 'pricelists':
                var Resource = Settings.priceList;
                $scope.backTo = 'settings.product.pricelists';
                var goShow = 'settings.product.pricelists.show';
                break;
            case 'warehouse':
                var Resource = Settings.warehouse;
                $scope.backTo = 'settings.product.warehouse';
                var goShow = 'settings.product.warehouse.show'

                var Zone = Settings.zone;
                var Location = Settings.location;

                $http({
                    method: 'GET',
                    url: '/erp/api/product/warehouse/zone/select',
                    params: {
                        warehouse: $rootScope.$stateParams.id
                    }
                }).success(function(data, status) {
                    $scope.$dict.zones = data.data;
                });

                $scope.addZone = function(zone) {
                    console.log(zone);
                    if (!$scope.object._id)
                        return;
                    zone.warehouse = $scope.object._id;

                    if (!zone._id) {
                        // create
                        var zone = new Zone(zone);
                        zone.$save(function(response) {
                            $scope.openZone = 0;
                            $scope.zone = {};
                            $scope.findOne();
                        });
                    } else {
                        //update
                        var zone = new Zone(zone);
                        zone.$update(function(response) {
                            $scope.openZone = 0;
                            $scope.zone = {};
                            $scope.findOne();
                        });
                    }
                };
                $scope.editZone = function(zone) {
                    $scope.openZone = 1;
                    $scope.zone = zone;
                };
                $scope.removeZone = function(zone) {
                    var zone = new Zone(zone);
                    zone.$remove(function(response) {
                        $scope.findOne();
                    });
                };
                //location
                $scope.addLocation = function(location) {
                    console.log(location);
                    if (!$scope.object._id)
                        return;
                    location.warehouse = $scope.object._id;

                    if (!location._id) {
                        // create
                        var location = new Location(location);
                        location.$save(function(response) {
                            $scope.openLocation = 0;
                            $scope.location = {};
                            $scope.findOne();
                        });
                    } else {
                        //update
                        var location = new Location(location);
                        location.$update(function(response) {
                            $scope.openLocation = 0;
                            $scope.location = {};
                            $scope.findOne();
                        });
                    }
                };
                $scope.editLocation = function(location) {
                    $scope.openLocation = 1;
                    $scope.location = location;
                    var names = location.name.split(".");
                    $scope.location.groupingA = names[0];
                    $scope.location.groupingB = names[1];
                    $scope.location.groupingC = names[2];
                    $scope.location.groupingD = names[3];
                    if ($scope.location.zone && $scope.location.zone._id)
                        $scope.location.zone = $scope.location.zone._id;
                };
                $scope.removeLocation = function(location) {
                    var location = new Location(location);
                    location.$remove(function(response) {
                        $scope.findOne();
                    });
                };

                break;
        } else
            switch (current[1]) {
                case 'family':
                    var Resource = Settings.productFamily;
                    $scope.backTo = 'product.family.list';
                    var goShow = 'product.family.show';
                    break;
                case 'attributes':
                    var Resource = Settings.productAttributes;
                    $scope.object.mode = 'text';
                    $scope.backTo = 'product.attributes.list';
                    var goShow = 'product.attributes.show';
                    break;
            }


    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();
        var dict = ["fk_units", "fk_tva"];

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;

            $http({
                method: 'GET',
                url: '/erp/api/product/prices/priceslist/select',
                params: {
                    isCoef: true
                }
            }).success(function(data) {
                $scope.pricesLists = data.data;


                $http({
                    method: 'GET',
                    url: '/erp/api/product/attributes/group/select'
                }).success(function(data, status) {
                    $scope.$dict.attributesGroups = data.data;
                    //console.log(data);

                    $http({
                        method: 'GET',
                        url: '/erp/api/currencies'
                    }).success(function(data, status) {
                        $scope.$dict.currency = data.data;
                        //console.log(data);

                        if (current[current.length - 1] == 'show')
                            $scope.findOne();

                        $scope.find();

                    });
                });
            });
        });

        if (current[1] === 'family')
            Settings.productAttributes.query({}, function(data) {
                $scope.attributes = data.data;
            });
    });

    $scope.findOne = function() {
        if (!$rootScope.$stateParams.id)
            return;

        $scope.edit = [];

        Resource.get({
            Id: $rootScope.$stateParams.id
        }, function(object) {
            $scope.object = object;
            console.log(object);

            if (object.opts) {
                object.options = [];
                angular.forEach(object.opts, function(element) {
                    object.options.push(element._id);
                });
            }

        });
    };

    $scope.find = function() {
        Resource.query({}, function(data) {
            console.log(data);
            $scope.listObject = data.data;
        });
    };

    $scope.clone = function() {
        $scope.object.$clone(function(response) {
            $rootScope.$state.go(goShow, {
                id: response._id
            });
        });
    };

    $scope.create = function() {
        var object = new Resource(this.object);
        object.$save(function(response) {
            $rootScope.$state.go(goShow, {
                id: response._id
            });
        });
    };

    $scope.update = function(stay) {
        $scope.object.$update(function(response) {
            $scope.object = response;

            return $scope.findOne();
        });
    };

    //Radio button in pricelist
    $scope.setChoice = function(tab, idx) {
        tab.isFixed = false;
        tab.isCost = false;
        tab.isCoef = false;
        tab.isGlobalDiscount = false;

        tab[idx] = true;
    };

    $scope.remove = function(line) {
        var object = new Resource(line);
        object.$remove(function() {
            $scope.find();
        });
    };

    // filter for selecting isFixed parent priceList for other price
    $scope.customerFilterIsFixed = function(item) {
        if (item.isGlobalDiscount)
            return true;
        if (item.isCoef)
            return true;

        return false;
    };


}]);

angular.module("MetronicApp").controller('SettingIntegrationController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

    });



}]);