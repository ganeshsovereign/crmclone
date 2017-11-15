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
                pageTitle: 'AttributesProduct'
            }
        })
        // information
        .state("product.show.informations", {
            templateUrl: "/views/product/informations.html",
            data: {
                pageTitle: 'InformationsProduct'
            }
        })
        // price
        .state("product.show.price", {
            url: "/price",
            templateUrl: "/views/product/price.html",
            data: {
                pageTitle: 'PricesProduct'
            }
        })
        // associations
        .state("product.show.categories", {
            url: "/categories",
            templateUrl: "/views/product/categories.html",
            data: {
                pageTitle: 'CategoriesProduct '
            },
            controller: "CategoryController"
        })
        // declinaisons
        .state("product.show.declinations", {
            url: "/declinations",
            templateUrl: "/views/product/declinations.html",
            data: {
                pageTitle: 'DeclinaisonsProduct '
            }
        })
        // stocks
        .state("product.show.stock", {
            url: "/stock",
            templateUrl: "/templates/product/stock.html",
            data: {
                pageTitle: 'StockProduct '
            }
        })
        // ecommerce
        .state("product.show.ecommerce", {
            url: "/ecommerce",
            templateUrl: "/views/product/ecommerce.html",
            data: {
                pageTitle: 'EcommerceProduct '
            }
        })
        .state("product.show.bundles", {
            url: "/bundle",
            templateUrl: "/views/product/bundles.html",
            data: {
                pageTitle: 'CompositionsProduct '
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
                pageTitle: 'CanauxIntegration'
            }
        })
        // configurator
        .state("product.show.configurator", {
            url: "/configurator?module",
            templateUrl: function($stateParams) {
                return '/templates/_' + $stateParams.module + '/configurator.html';
            },
            data: {
                pageTitle: 'ConfigurationProduct '
            }
        })
        .state('product.show.stats', {
            url: "/stats",
            templateUrl: "/views/product/stats.html",
            data: {
                pageTitle: 'Statistiques produits'
            }
        })
        // Stock Correction
        .state('product.stockcorrection', {
            parent: "product",
            url: "/stockcorrectionlist",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.stockcorrection.list', {
            url: "",
            templateUrl: "/views/product/stockcorrectionlist.html",
            data: {
                pageTitle: 'Liste des corrections de stock'
            },
            controller: "ProductStockCorrectionController"
        })
        .state('product.stockcorrection.create', {
            url: "/create.html",
            templateUrl: "/views/product/stockcorrectionlistfiche.html",
            data: {
                pageTitle: 'Créer une correction de stock'
            },
            controller: "ProductStockCorrectionController"
        })
        .state('product.stockcorrection.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/product/stockcorrectionlistfiche.html",
            data: {
                pageTitle: 'Editer une correction de stock'
            },
            controller: "ProductStockCorrectionController"
        })
        // Stock Detail
        .state('product.stockdetail', {
            parent: "product",
            url: "/stockdetail",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.stockdetail.list', {
            url: "",
            templateUrl: "/views/product/stockdetail.html",
            data: {
                pageTitle: 'Liste des états de stock'
            },
            controller: "ProductStockDetailController"
        })
        // Stock transfert
        .state('product.stocktransfers', {
            parent: "product",
            url: "/stocktransfers",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.stocktransfers.list', {
            url: "",
            templateUrl: "/views/product/stocktransfers.html",
            data: {
                pageTitle: 'Liste des transferts de stock'
            },
            controller: "ProductStockTransfersController"
        })
        .state('product.stocktransfers.create', {
            parent: "",
            url: "/create.html",
            templateUrl: "/views/product/informations.html",
            data: {
                pageTitle: 'Nouveau produit / service'
            },
            controller: "ProductStockTransfersController"
        })
        // Stock Inventory
        .state('product.inventory', {
            parent: "product",
            url: "/inventory",
            abstract: true,
            templateUrl: "/views/product/index.html"
        })
        .state('product.inventory.list', {
            url: "",
            templateUrl: "/views/product/inventory.html",
            data: {
                pageTitle: 'Gestion des stock'
            },
            controller: "ProductInventoryController"
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