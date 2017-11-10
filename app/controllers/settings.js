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



MetronicApp.controller('SettingGeneralController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initAjax();
        $rootScope.settings.layout.pageBodySolid = false;
    });
}]);

MetronicApp.controller('SettingEntityController', ['$rootScope', '$scope', '$http', '$timeout', 'superCache', 'Settings',
    function($rootScope, $scope, $http, $timeout, superCache, Settings) {
        $scope.editable = false;
        $scope.backTo = 'settings.entity.list';
        $scope.object = {
            address: []
        };
        $scope.search = {};
        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };
        $scope.sort = {
            'name': 1
        };

        if (typeof superCache.get("SettingEntityListController") !== "undefined") {
            $scope.page = superCache.get("SettingEntityController").page;
            $scope.search = superCache.get("SettingEntityController").search;
            $scope.sort = superCache.get("SettingEntityController").sort;
        }

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.entities.length; i++)
                if (this.checkAll)
                    this.grid[$scope.entities[i]._id] = true;
        }

        $scope.$on('$viewContentLoaded', function() {
            Metronic.initAjax();
            $rootScope.settings.layout.pageBodySolid = false;

            if ($rootScope.$stateParams.id && $rootScope.$state.current.name === "settings.entity.show")
                return $scope.findOne();

            $scope.find();
        });

        $scope.create = function() {
            let entity = new Settings.entity(this.object);
            entity.$save(function(response) {
                $rootScope.$state.go("settings.entity.show", {
                    id: response._id
                });
            });
        };

        $scope.update = function(callback) {
            var object = $scope.object;
            if (!object._id)
                return;

            object.$update(function(response) {
                $scope.findOne(callback);
            }, function(err) {
                if (err)
                    console.log(err);

                $timeout(function() {
                    $scope.findOne(callback);
                }, 500);
            });
        };

        $scope.clone = function() {
            $scope.object.$clone(function(response) {
                $rootScope.$state.go('settings.entity.show', {
                    id: response._id
                });
            });
        };

        $scope.findOne = function() {
            Settings.entity.get({
                Id: $rootScope.$stateParams.id
            }, function(entity) {
                $scope.object = entity;
            });
        };

        $scope.ngIncludeInit = function(params, length) {
            $scope.find();
        };


        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("SettingEntityController", {
                sort: $scope.sort,
                search: $scope.search,
                page: $scope.page
            });

            Metronic.blockUI({
                target: '.waiting',
                animate: false,
                boxed: true,
                overlayColor: 'gray'
            });

            var query = {
                quickSearch: $scope.quickSearch,
                filter: $scope.search,
                viewType: 'list',
                contentType: 'entity',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: $scope.sort
            };

            Settings.entity.query(query, function(data) {
                $scope.page.total = data.total;
                $scope.entities = data.data;

                $timeout(function() {
                    Metronic.unblockUI('.waiting');
                }, 0);
            });
        };

    }
]);

MetronicApp.controller('SettingProductController', ['$rootScope', '$scope', '$http', '$timeout', 'Settings', function($rootScope, $scope, $http, $timeout, Settings) {
    var current = $rootScope.$state.current.name.split('.');
    $scope.backTo = 'settings.product.types';
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

        $rootScope.settings.layout.pageBodySolid = false;

    });

}]);