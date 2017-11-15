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

    // General settings
    $stateProvider.state('settings', {
            url: "/settings",
            abstract: true,
            templateUrl: "/views/settings/index.html"
        })
        //General Configuration
        .state('settings.general', {
            url: "/general",
            templateUrl: "/views/settings/general.html",
            data: {
                pageTitle: 'Configuration general'
            },
            controller: "SettingGeneralController"
        })
        //Entites Configuration
        .state('settings.entity', {
            url: "/entity",
            abstract: true,
            templateUrl: "/views/settings/entities/index.html"
        })
        .state('settings.entity.list', {
            url: "",
            templateUrl: "/views/settings/entities/list.html",
            data: {
                pageTitle: 'Configuration des organisations'
            },
            controller: "SettingEntityController"
        })
        .state('settings.entity.create', {
            url: "/create.html",
            templateUrl: "/views/settings/entities/fiche.html",
            data: {
                pageTitle: 'Creation d\'une organisation'
            },
            controller: "SettingEntityController"
        })
        .state('settings.entity.show', {
            url: "/{id}",
            templateUrl: "/views/settings/entities/fiche.html",
            data: {
                pageTitle: 'Configuration de l\'organisation'
            },
            controller: "SettingEntityController"
        })
        .state('settings.entity.show.billing', {
            url: "/billing",
            templateUrl: "/views/settings/entities/billing.html",
            data: {
                pageTitle: 'Configuration de l\'organisation'
            }
        })
        //Product Configuration
        .state('settings.product', {
            url: "/product",
            templateUrl: "/views/settings/product.html",
            data: {
                pageTitle: 'Configuration des produits'
            }
        })
        // warehouse
        .state('settings.product.warehouse', {
            url: "/warehouse",
            templateUrl: "/views/settings/warehouse/list.html",
            data: {
                pageTitle: 'Configuration des entrepots'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.warehouse.create', {
            url: "/create.html",
            templateUrl: "/views/settings/warehouse/fiche.html",
            data: {
                pageTitle: 'Ajouter un entrepot'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.warehouse.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/settings/warehouse/fiche.html",
            data: {
                pageTitle: 'Editer un entrepot'
            },
            controller: "SettingProductController"
        })
        // prices configuration
        .state('settings.product.pricelists', {
            url: "/pricelists",
            templateUrl: "/views/settings/pricelists/list.html",
            data: {
                pageTitle: 'Configuration des listes de prix'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.pricelists.create', {
            url: "/create.html",
            templateUrl: "/views/settings/pricelists/fiche.html",
            data: {
                pageTitle: 'Ajouter une liste de prix'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.pricelists.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/settings/pricelists/fiche.html",
            data: {
                pageTitle: 'Editer une liste de prix'
            },
            controller: "SettingProductController"
        })
        // product types configuration
        .state('settings.product.types', {
            url: "/types",
            templateUrl: "/views/settings/productTypes/list.html",
            data: {
                pageTitle: 'Configuration des types de produits'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.types.create', {
            url: "/create.html",
            templateUrl: "/views/settings/productTypes/fiche.html",
            data: {
                pageTitle: 'Ajouter un type de produit'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.types.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/settings/productTypes/fiche.html",
            data: {
                pageTitle: 'Editer un type de produit'
            },
            controller: "SettingProductController"
        })
        // shipping configuration
        .state('settings.product.shipping', {
            url: "/shipping",
            templateUrl: "/views/settings/shipping/list.html",
            data: {
                pageTitle: 'Configuration des transports'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.shipping.create', {
            url: "/create.html",
            templateUrl: "/views/settings/shipping/create.html",
            data: {
                pageTitle: 'Ajouter un transport'
            },
            controller: "SettingProductController"
        })
        .state('settings.product.shipping.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/settings/shipping/fiche.html",
            data: {
                pageTitle: 'Editer un tranport'
            },
            controller: "SettingProductController"
        })
        //Integration Configuration
        .state('settings.integration', {
            parent: "settings",
            url: "/integration",
            templateUrl: "/views/settings/integration.html",
            data: {
                pageTitle: 'Gestion des integrations'
            },
            controller: "SettingIntegrationController"
        });

});


MetronicApp.factory("Settings", ['$resource', function($resource) {
    return {
        productTypes: $resource('/erp/api/product/productTypes/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        productFamily: $resource('/erp/api/product/family/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        productAttributes: $resource('/erp/api/product/attributes/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        priceList: $resource('/erp/api/product/prices/priceslist/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        warehouse: $resource('/erp/api/product/warehouse/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        zone: $resource('/erp/api/product/warehouse/zone/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        location: $resource('/erp/api/product/warehouse/location/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        entity: $resource('/erp/api/entity/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        })
    };
}]);