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
    // Product / services
    $stateProvider.state('product', {
            url: "/product",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.list', {
            parent: "product",
            url: "",
            templateUrl: "/views/product/list.html",
            data: {
                pageTitle: 'Liste des produits / services'
            },
            controller: "ProductListController"
        })
        .state('product.show', {
            url: "/{id:[0-9a-z]{24}}",
            //abstract: true,
            templateUrl: "/views/product/fiche.html",
            data: {
                pageTitle: 'Fiche produit / service'
            },
            controller: "ProductController"
        })
        .state('product.show.images', {
            url: "/images",
            templateUrl: "/views/product/productImages.html",
            data: {
                pageTitle: 'Images'
            }
        })
        .state('product.create', {
            parent: "product",
            url: "/create.html",
            templateUrl: "/views/product/informations.html",
            data: {
                pageTitle: 'Nouveau produit / service'
            },
            controller: "ProductController"
        })
        .state('product.pricelist', {
            parent: "product",
            url: "/pricelevel.html?priceListId",
            templateUrl: "/views/product/pricelist.html",
            data: {
                pageTitle: 'Liste de prix'
            },
            controller: "ProductPriceListController"
        })
        .state('product.consumption', {
            parent: "product",
            url: "/consumption.html",
            templateUrl: "/views/product/consumption.html",
            data: {
                pageTitle: 'Statistiques de consommation des produits'
            },
            controller: "ProductStatsController"
        })
        .state('product.images', {
            parent: "product",
            url: "/images.html",
            templateUrl: "/views/product/images.html",
            data: {
                pageTitle: 'Banques d\'images des produits'
            },
            controller: "ProductBankImagesController"
        })
        // Attributes
        .state('product.attributes', {
            parent: "product",
            url: "/attributeslist",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.attributes.list', {
            url: "",
            templateUrl: "/views/product/attributeslist.html",
            data: {
                pageTitle: 'Liste des Attributs de produits'
            },
            controller: "SettingProductController"
        })
        .state('product.attributes.create', {
            url: "/create.html",
            templateUrl: "/views/product/attributeslistfiche.html",
            data: {
                pageTitle: 'Ajouter un attribut'
            },
            controller: "SettingProductController"
        })
        .state('product.attributes.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/product/attributeslistfiche.html",
            data: {
                pageTitle: 'Editer un attribut'
            },
            controller: "SettingProductController"
        })
        // Categories
        .state('product.categories', {
            parent: "product",
            url: "/productcategories",
            templateUrl: "/views/product/productcategories.html",
            data: {
                pageTitle: 'Configuration des categories'
            },
            controller: "CategoryController"
        })
        // Family configuration
        .state('product.family', {
            parent: "product",
            url: "/familyproductlist",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.family.list', {
            url: "",
            templateUrl: "/views/product/familyproductlist.html",
            data: {
                pageTitle: 'Liste des familles de produits'
            },
            controller: "SettingProductController"
        })
        .state('product.family.create', {
            url: "/create.html",
            templateUrl: "/views/product/familyproductlistfiche.html",
            data: {
                pageTitle: 'Créer une famille de produit'
            },
            controller: "SettingProductController"
        })
        .state('product.family.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/product/familyproductlistfiche.html",
            data: {
                pageTitle: 'Editer une famille de produit'
            },
            controller: "SettingProductController"
        })
        // ---- //
        .state('product.visual', {
            parent: "product",
            url: "/visual/{id:[0-9a-z]{24}}",
            templateUrl: "/views/product/productvisual.html",
            data: {
                pageTitle: 'Fiche produit print'
            },
            controller: "ProductController"
        })
        // attributes
        .state("product.show.attributes", {
            url: "/attributes",
            templateUrl: "/views/product/attributes.html",
            data: {
                pageTitle: 'Attributes - Product'
            }
        })
        // information
        .state("product.show.informations", {
            templateUrl: "/views/product/informations.html",
            data: {
                pageTitle: 'Informations - Product'
            }
        })
        // price
        .state("product.show.price", {
            url: "/price",
            templateUrl: "/views/product/price.html",
            data: {
                pageTitle: 'Prices - Product'
            }
        })
        // associations
        .state("product.show.categories", {
            url: "/categories",
            templateUrl: "/views/product/categories.html",
            data: {
                pageTitle: 'Categories - Product '
            },
            controller: "CategoryController"
        })
        // declinaisons
        .state("product.show.declinations", {
            url: "/declinations",
            templateUrl: "/views/product/declinations.html",
            data: {
                pageTitle: 'Declinaisons - Product '
            }
        })
        // stocks
        .state("product.show.stock", {
            url: "/stock",
            templateUrl: "/templates/product/stock.html",
            data: {
                pageTitle: 'Stock - Product '
            }
        })
        // ecommerce
        .state("product.show.ecommerce", {
            url: "/ecommerce",
            templateUrl: "/views/product/ecommerce.html",
            data: {
                pageTitle: 'Ecommerce - Product '
            }
        })
        .state("product.show.bundles", {
            url: "/bundle",
            templateUrl: "/views/product/bundles.html",
            data: {
                pageTitle: 'Compositions - Product '
            }
        })
        .state("product.show.packaging", {
            url: "/packaging",
            templateUrl: "/views/product/packaging.html",
            data: {
                pageTitle: 'Conditionnement / lots'
            }
        })
        // channels
        .state("product.show.channels", {
            url: "/channels",
            templateUrl: "/views/product/channels.html",
            data: {
                pageTitle: 'Canaux - Integration'
            }
        })
        // configurator
        .state("product.show.configurator", {
            url: "/configurator?module",
            templateUrl: function($stateParams) {
                return '/templates/_' + $stateParams.module + '/configurator.html';
            },
            data: {
                pageTitle: 'Configuration - Product '
            }
        })
        .state('product.show.stats', {
            url: "/stats",
            templateUrl: "/views/product/stats.html",
            data: {
                pageTitle: 'Statistiques produits'
            }
        });
});

//Bills service used for REST endpoint
MetronicApp.factory("Products", ['$resource', function($resource) {
    return $resource('/erp/api/product/:Id', {
        Id: '@_id'
    }, {
        query: {
            method: 'GET',
            isArray: false
        },
        update: {
            method: 'PUT'
        },
        clone: {
            method: 'POST',
            params: {
                clone: 1
            }
        }
    });
}]);