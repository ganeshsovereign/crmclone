/*
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
 */


"use strict";
/* global angular: true */

MetronicApp.controller('ProductController', ['$scope', '$rootScope', '$timeout', '$http', '$modal', '$filter', 'Products', function($scope, $rootScope, $timeout, $http, $modal, $filter, Products) {

    $scope.backTo = 'product.list';
    $scope.newPack = {};

    $scope._language = 0;

    $scope.product = {
        new: true,
        //minPrice: 0,
        //billingMode: "QTY",
        isSell: true,
        tva_tx: 20,
        units: "unit",
        info: {
            autoBarCode: true,
            isActive: true
        }
    };
    $scope.products = [];
    $scope.caFamilies = [];
    $scope.family = null;
    $scope.dict = {};
    $scope.newSupplierPrice = {};
    $scope.productTypes = [];

    $scope.refFound = false;
    $scope.validRef = true;

    //variants selected options
    $scope.checkedObj = {};
    $scope.collection = [];
    $scope.thead = [];
    $scope.variantesLines = [];
    $scope.variantsArray = [];

    $scope.billingModes = [
        { id: "QTY", label: "Quantité" },
        { id: "MONTH", label: "Abonnement mensuel" }
    ];

    var grid = new Datatable();

    $scope.isValidRef = function() {
        var ref = this.product.info.SKU.trim().toUpperCase();
        $scope.refFound = false;

        var isValide = true;
        if (!ref || ref.indexOf(" ") > -1)
            isValide = false;

        if (isValide)
            $http({
                method: 'GET',
                url: '/erp/api/product/' + ref
            }).success(function(data, status) {
                console.log(data);
                if (data && data._id && this.product._id !== data._id) // REF found
                    $scope.refFound = true;
            });

        $scope.validRef = isValide;
    };

    $scope.types = [{ name: "A la vente", id: "SELL" },
        { name: "A l'achat", id: "BUY" },
        { name: "Tous", id: "ALL" }
    ];

    $scope.type = "SELL";

    $scope.$on('$viewContentLoaded', function() {
        var dict = ["fk_tva", "fk_product_status", "fk_units"];

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

        if ($rootScope.$stateParams.id && $rootScope.$state.current.name === "product.show")
            return $rootScope.$state.go('product.show.informations');

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;

            if (!$rootScope.$stateParams.id)
            // Is a list
                initDatatable();
        });

        $http({
            method: 'GET',
            url: '/erp/api/product/productTypes'
        }).success(function(data, status) {
            //console.log(data);
            $scope.productTypes = data.data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/product/family',
            params: { isCost: false }
        }).success(function(data, status) {
            $scope.sellFamilies = data.data;
        });

        $http({
            method: 'POST',
            url: '/erp/api/product/prices/select',
            data: { cost: false }
        }).success(function(data) {
            $scope.pricesLists = data;
        });
    });

    $scope.update = function() {
        var product = $scope.product;
        var self = this;

        if (product.new) {
            product = new Products(this.product);
            product.$save(function(response) {
                $rootScope.$state.go("product.show", { id: response._id });
            });
            return;
        }

        product.$update(function(response) {
            $scope.findOne(); // refresh product with populate
        });
    };


    /*$scope.updatePrices = function() {
        if (grid && grid.getSelectedRows().length) {
            var modalInstance = $modal.open({
                templateUrl: 'upgradeModalPrice.html',
                controller: ModalInstanceCtrl,
                //windowClass: "steps",
            });

            modalInstance.result.then(function(coef) {
                $http({
                    method: 'PUT',
                    url: '/erp/api/product/upgradeprice',
                    data: {
                        id: grid.getSelectedRows(),
                        price_level: "BASE",
                        coef: coef
                    }
                }).success(function(data, status) {
                    $scope.find();
                });
            }, function() {});

        }
    };

    var ModalInstanceCtrl = function($scope, $modalInstance) {

        $scope.coef = 1;

        $scope.ok = function() {
            $modalInstance.close($scope.coef);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.updatePrice = function(productId, price, range, price_level) {
        $http({
            method: 'PUT',
            url: '/erp/api/product/price',
            data: {
                _id: productId,
                price_level: price_level,
                range: range,
                price: price
            }
        }).success(function(data, status) {
            $scope.findOne();
        });
    };*/

    $scope.clone = function() {
        $scope.product.$clone(function(response) {
            $rootScope.$state.go('product.show', {
                id: response._id
            });
        });
    };

    $scope.findOne = function() {
        $scope.changedProductType = null;

        /*Get product variants */
        $http({
            method: 'GET',
            url: '/erp/api/product/variants/' + $rootScope.$stateParams.id
        }).success(function(data, status) {
            $scope.productVariants = data;
            console.log(data);

            /* check if isVariants -> return to the master product variant*/
            //if (data.variantsArray[0].isVariant && data.groupId !== $rootScope.$stateParams.id)
            //    return $rootScope.$state.go("product.show", { id: data.groupId });

            Products.get({
                Id: $rootScope.$stateParams.id
            }, function(product) {

                console.log('product', product);
                $scope.product = product;

                if (product.isVariant)
                    $scope.createVariants(data.currentValues);


                //product.variantsArray[0];
                //console.log($scope.product.info.productType._id);

                if ($scope.product.info && $scope.product.info.productType)
                    $http({
                        method: 'GET',
                        url: '/erp/api/product/productTypes/' + $scope.product.info.productType._id
                    }).success(function(data, status) {
                        console.log(data);
                        $scope.changedProductType = data;

                        for (var i = 0, len = data.opts.length; i < len; i++) {
                            for (var j = 0, lenj = data.opts[i].values.length; j < lenj; j++) {
                                $scope.checkedObj = {};
                            }
                        }
                    });


            }, function(err) {
                if (err.status === 401)
                    $location.path("401.html");
            });

        });
    };

    $scope.remove = function(product) {
        if (!product && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/product',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }

        // delete product
        if (product._id == $scope.product._id)
            return product.$remove(function() {
                $rootScope.$state.go("product.list");
            });

        //remove variant
        return $http({
            method: 'DELETE',
            url: '/erp/api/product/' + product._id
        }).success(function(data, status) {
            if (status === 200)
                $scope.findOne();
        });
    };

    $scope.productFamilyAutoComplete = function(val, field, query) {
        return $http.post('/erp/api/product/family', {
            take: 5,
            skip: 0,
            page: 1,
            pageSize: 5,
            field: field,
            query: query,
            filter: val
        }).then(function(res) {
            //console.log(res.data);
            return res.data;
        });
    };

    $scope.loadDynForms = function() {
        $http.get('/erp/api/product/dynform').then(function(res) {
            //console.log(res.data);
            $scope.dynForms = res.data;
        });
    };

    function getUrl() {
        return "/erp/api/product/dt" + "?Status=" + $scope.type + "&family=" + $scope.family;
    }

    function initDatatable() {

        grid.init({
            src: $("#productList"),
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
                    "data": "info.SKU"
                }, {
                    data: 'info.productType',
                    defaultContent: ""
                }, {
                    "data": "name",
                    defaultContent: ""
                }, {
                    "data": "prices.pu_ht",
                    defaultContent: ""
                }, {
                    "data": "directCost",
                    defaultContent: ""
                }, {
                    "data": "weight",
                    defaultContent: ""
                }, {
                    "data": "updatedAt"
                }, {
                    "data": "info.isActive"
                }, {
                    "data": "sellFamily",
                    defaultContent: ""
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

        $scope.find = function() {
            var url = getUrl();
            grid.resetFilter(url);
        };
    }

    $scope.addSupplier = function() {
        if ($scope.newSupplierPrice && $scope.newSupplierPrice.societe.id) {
            $scope.product.suppliers.push($scope.newSupplierPrice);
            $scope.newSupplierPrice = {};
            $scope.update();
        }
    };

    $scope.deleteSupplier = function(idx) {
        $scope.product.suppliers.splice(idx, 1);
        $scope.update();
    };

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    // toggle selection for a given soncas by value
    $scope.toggleSelection = function toggleSelection(tab, value, property) {
        var idx;
        if (property)
            idx = arrayObjectIndexOf(tab, value[property], property);
        else
            idx = tab.indexOf(value);

        // is currently selected
        if (idx > -1) {
            tab.splice(idx, 1);
        }

        // is newly selected
        else {
            tab.push(value);
        }
    };

    $scope.isCheckedObj = function(option, value) {
        if (option && option.values && option.values.length)
            return arrayObjectIndexOf(option.values, value, '_id') >= 0;

        return false;
    };

    /* createProducts friom selected variants*/
    var collection = [];
    $scope.createVariants = function(variants) {
        collection = $filter('object2Array')(variants);

        console.log("collection :", collection);

        collection = _.filter(collection, function(option) {
            return (option && option.values && option.values.length);
        });

        if (!collection)
            return;

        // New create variantes
        // if (!variantsArray) {
        //    variantsArray = [];

        /*     if (collection[0])
                 collection[0].values.forEach(function(elem0) {
                     if (collection[1])
                         return collection[1].values.forEach(function(elem1) {
                             if (collection[2])
                                 return collection[2].values.forEach(function(elem2) {
                                     if (collection[3])
                                         return collection[3].values.forEach(function(elem3) {
                                             var varId = [elem3._id, elem2._id, elem1._id, elem0._id].sort().join('/');
                                             variantsArray.push(varId);
                                         });
                                     var varId = [elem2._id, elem1._id, elem0._id].sort().join('/');
                                     variantsArray.push(varId);
                                 });
                             var varId = [elem1._id, elem0._id].sort().join('/');
                             variantsArray.push(varId);
                         });
                     var varId = [elem1._id, elem0._id].sort().join('/');
                     variantsArray.push(varId);
                 });
             else {
                 var varId = [elem0._id].sort().join('/');
                 variantsArray.push(varId);
             }*/
        //}


        var thead = [];
        var lines = [];

        thead[0] = []; //collection1
        thead[1] = []; //collection2

        //column1 -> collection0
        //column2 -> collection3

        thead[0].push({});
        if (collection[3])
            thead[0].push({});
        for (var elem1 in collection[1].values) {
            thead[0].push({ colspan: (collection[2] ? collection[2].values.length : ''), value: collection[1].values[elem1].value });
        }

        if (collection[2]) {
            thead[1].push({});
            if (collection[3])
                thead[1].push({});

            for (var elem1 in collection[1].values) {
                for (var elem2 in collection[2].values) {
                    thead[1].push({ colspan: '', value: collection[2].values[elem2].value });
                }
            }
        }



        if (collection[0]) {
            collection[0].values.forEach(function(elem3, index1) {
                if (collection[3]) {
                    collection[3].values.forEach(function(elem0, index2) {

                        //<tr>
                        var aline = { col: [] };
                        aline.index2 = index2;
                        aline.rowspan = (collection[3] ? collection[3].values.length : '');
                        aline.elem3 = elem3.value;
                        aline.elem0 = elem0.value;

                        if (collection[1]) {
                            collection[1].values.forEach(function(elem1) {
                                if (collection[2]) {
                                    collection[2].values.forEach(function(elem2) {
                                        var varId = [elem3._id, elem2._id, elem1._id, elem0._id].sort();
                                        var html = true;
                                        aline.col.push({ html: html, id: varId.join('/'), values: varId });
                                    });
                                }
                            })
                        }
                        lines.push(aline);
                        //</tr>
                    });
                } else {
                    //<tr>
                    var aline = { col: [] };
                    aline.elem0 = elem3.value;

                    if (collection[1]) {
                        if (collection[2]) {
                            collection[1].values.forEach(function(elem2) {
                                collection[2].values.forEach(function(elem1) {
                                    var varId = [elem3._id, elem2._id, elem1._id].sort();
                                    var html = true;
                                    aline.col.push({ html: html, id: varId.join('/'), values: varId });
                                });
                            });
                        } else {
                            collection[1].values.forEach(function(elem2) {
                                var varId = [elem3._id, elem2._id].sort();
                                var html = true;
                                aline.col.push({ html: html, id: varId.join('/'), values: varId });
                            });
                        }
                    } else {
                        var html = true;
                        var varId = elem3._id;
                        aline.col.push({ html: html, id: varId, values: [elem3._id] });
                    }
                    //</tr>
                    lines.push(aline);
                }
            });
        }


        console.log(lines);
        $scope.thead = thead;
        $scope.variantesLines = lines;
    };
    $scope.saveVariants = function() {
        if ($scope.product.isVariant)
            return $http({
                method: 'POST',
                url: '/erp/api/product/variants/' + $scope.product._id,
                data: {
                    variants: $scope.variantsArray
                }
            }).success(function(data, status) {
                console.log(data);
            });

        return $http({
            method: 'POST',
            url: '/erp/api/product/variants/' + $scope.product._id,
            data: {
                isNew: true,
                variants: collection
            }
        }).success(function(data, status) {
            console.log(data);
        });
    };


    $scope.addAttribut = function(attribut) {
        $scope.product.attributes.push(attribut);
    };

    $scope.deleteAttribut = function(idx) {
        $scope.product.attributes.splice(idx, 1);
    };

    $scope.productAttributeAutoComplete = function(val, field, query) {
        return $http.post('/erp/api/product/attributes', {
            take: 5,
            skip: 0,
            page: 1,
            pageSize: 5,
            field: field,
            query: query,
            filter: val
        }).then(function(res) {
            //console.log(res.data);
            return res.data;
        });
    };

    $scope.productAutoComplete = function(val) {
        return $http.post('/erp/api/product/autocomplete', {
            take: 50,
            price_level: 'BASE',
            supplier: true,
            filter: {
                logic: 'and',
                filters: [{ value: val }]
            }
        }).then(function(res) {
            //console.log(res.data);
            return res.data;
        });
    };

    $scope.changePackQty = function() {
        $scope.newPack.total_ht = $scope.newPack.qty * $scope.newPack.pu_ht;
    };

    $scope.addPackProduct = function(data) {

        //console.log(data);

        $scope.newPack = {
            pu_ht: data.directCost,
            id: {
                _id: data._id,
                name: data.info.langs[0].name,
                directCost: data.directCost
            },
            qty: 1,
        };

        $scope.changePackQty();
    };

    $scope.addPack = function() {
        if (!$scope.newPack.id)
            return;

        $scope.product.pack.push($scope.newPack);
        /*{
         id : { _id : $scope.newPack.product.id,
         label : $scope.newPack.product.label,
         ref : $scope.newPack.product.ref,
         prices : { pu_ht : $scope.newPack.pu_ht}
         },
         qty : $scope.newPack.qty
         });*/
        $scope.update(false);
        $scope.newPack = {};
    };

    $scope.deletePack = function(idx) {
        $scope.product.pack.splice(idx, 1);
        $scope.update();
    };


}]);

MetronicApp.controller('ProductBarCodeController', ['$scope', '$routeParams', 'Global', '$http', function($scope, $routeParams, Global, $http) {
    $scope.global = Global;

    $scope.isChecked = {};
    $scope.productsBarCode = {};
    $scope.storehouse = {};
    $scope.selected = {};

    function initProducts() {
        $http({
            method: 'GET',
            url: '/erp/api/product',
            params: {
                barCode: 1
            }
        }).
        success(function(data, status) {
            $scope.products = data;
            for (var i in data) {
                $scope.productsBarCode[data[i]._id] = data[i];
            }
        });
    }

    function numberFormat(number, width) {
        if (isNaN(number))
            number = 0;
        return new Array(width + 1 - (number + '').length).join('0') + number;
    }

    function initEntrepot() {
        $scope.stocks = [];

        $http({
            method: 'GET',
            url: '/erp/api/product/storehouse'
        }).
        success(function(entrepot, status) {
            //$scope.products = data;

            for (var i = 0; i < entrepot.length; i++) {
                for (var j = 0; j < entrepot[i].subStock.length; j++) {
                    var stock = {};
                    stock.client = entrepot[i].societe.name;
                    //stock.barCode = entrepot[i].societe.barCode;
                    stock.stock = entrepot[i].name;
                    //stock.stockCode = entrepot[i].barCode;
                    stock.barCode = numberFormat(entrepot[i].barCode, 4);

                    var codeBar = stock.barCode;

                    stock.subStock = entrepot[i].subStock[j].name;
                    stock.subStockCode = entrepot[i].subStock[j].barCode;
                    stock.barCode = codeBar + numberFormat(entrepot[i].subStock[j].barCode, 2);
                    stock.productId = entrepot[i].subStock[j].productId;
                    $scope.stocks.push(stock);

                    $scope.isChecked[stock.barCode] = {};

                    for (var k = 0; k < entrepot[i].subStock[j].productId.length; k++) {
                        $scope.isChecked[stock.barCode][entrepot[i].subStock[j].productId[k]] = true;
                    }
                }

            }
        });
    }

    $scope.updateCheck = function(product, stock) {
        $http({
            method: 'PUT',
            url: '/erp/api/product/storehouse',
            data: {
                product: product,
                stock: stock,
                checked: $scope.isChecked[stock.barCode][product._id]
            }
        }).
        success(function(data, status) {
            console.log("ok");
        });
    };

    $scope.initList = function() {
        initProducts();
        initEntrepot();
    };

    $scope.societeAutoComplete = function(val) {
        return $http.post('/erp/api/societe/autocomplete', {
            take: '5',
            skip: '0',
            page: '1',
            pageSize: '5',
            filter: {
                logic: 'and',
                filters: [{ value: val }]
            }
        }).then(function(res) {
            return res.data;
        });
    };

    $scope.insert = function() {
        $http({
            method: 'POST',
            url: '/erp/api/product/storehouse',
            data: $scope.storehouse
        }).
        success(function(data, status) {
            //$scope.products = data;
            $scope.initList();
        });
    };


}]);

MetronicApp.controller('LineController', ['$scope', '$http', '$modalInstance', 'Global', 'object', 'options', function($scope, $http, $modalInstance, Global, object, options) {
    $scope.global = Global;

    $scope.line = object;
    $scope.supplier = options && options.supplier;

    $scope.dict = {};

    $scope.init = function() {

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: "fk_tva",
            }
        }).success(function(data, status) {
            $scope.dict.fk_tva = data;
        });
    };

    var round = function(value, decimals) {
        if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
            return 0;
        return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
    };

    $scope.addOrUpdate = function() {
        $scope.line.total_ht = round($scope.line.pu_ht * $scope.line.qty, 2);
        $scope.line.total_tva = $scope.line.total_ht * $scope.line.tva_tx / 100;
        $scope.line.total_ttc = $scope.line.total_ht + $scope.line.total_tva;

        $modalInstance.close($scope.line);
    };

    $scope.updateLine = function(data) {

        if (!$scope.line.description)
            $scope.line.description = data.product.id.description;

        $scope.line.minPrice = data.product.id.minPrice;

        if (data.pu_ht)
            $scope.line.pu_ht = data.pu_ht;

        $scope.line.tva_tx = data.product.id.tva_tx;

        $scope.line.product = data.product.id;

        if (!data.template)
            $scope.line.product.template = "/partials/lines/classic.html";

        $scope.line.product.id = data.product.id._id;
        $scope.line.product.name = data.product.id.ref;
        $scope.line.product.family = data.product.id.caFamily;

        //console.log(data);
    };

    $scope.productAutoComplete = function(val) {
        return $http.post('/erp/api/product/autocomplete', {
            take: 50,
            skip: 0,
            page: 1,
            pageSize: 5,
            price_level: options.price_level,
            supplier: options.supplier,
            filter: {
                logic: 'and',
                filters: [{ value: val }]
            }
        }).then(function(res) {
            //console.log(res.data);
            return res.data;
        });
    };

}]);

MetronicApp.controller('DynFormController', ['$scope', '$http', '$modalInstance', '$rootScope', 'object', 'options', function($scope, $http, $modalInstance, $rootScope, object, options) {

    //console.log(object);
    $scope.model = object;

    $scope.dynform = {};

    $http.get('/erp/api/product/dynform/' + object.product.dynForm)
        .then(function(res) {
            //console.log(res.data);
            $scope.dynform = res.data;
        });

    $scope.updated = function(modelValue, form) {
        //console.log(options);
        $http.post('/erp/api/product/combined/' + options.price_level, this.model)
            .then(function(res) {
                //console.log(res.data);
                //angular.extend($scope.model, res.data);
                $scope.model = res.data;
                $scope.$broadcast('schemaFormValidate');
            });
    };

    $scope.addOrUpdate = function(form) {
        //console.log(this.model);
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            $modalInstance.close(this.model);
        }
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.productAutoComplete = function(val, family) {
        //console.log(object);
        return $http.post('/erp/api/product/autocomplete', {
            take: 50,
            skip: 0,
            page: 1,
            pageSize: 50,
            price_level: options.price_level,
            supplier: options.supplier,
            family: family || object.product.family || object.optional.caFamily,
            filter: {
                logic: 'and',
                filters: [{ value: val }]
            }
        }).then(function(res) {
            console.log(res.data);
            return res.data;
        });
    };

    $scope.addProduct = function(data, model) {
        $scope.updated();
    };

}]);

MetronicApp.controller('ProductPriceListController', ['$scope', '$rootScope', '$http', '$timeout', '$modal', function($scope, $rootScope, $http, $timeout, $modal) {

    $scope.priceLevel = [];
    $scope.price_level = null;
    $scope.pricesLists = [];
    $scope.grid = {};
    var productId;
    var costFind = false;

    $scope.$on('$viewContentLoaded', function() {
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = false;
    });

    $scope.init = function(id, cost) {
        if (id) {
            productId = id;
            if (cost)
                costFind = true;
            $scope.find();
        }
        if (!cost)
            $http({
                method: 'GET',
                url: '/erp/api/product/prices/select',
                params: { cost: cost }
            }).success(function(data, status) {
                $scope.pricesLists = data;
                //console.log("PriceLists", data);
            });
    };

    $scope.find = function() {
        $scope.grid = {};
        Metronic.blockUI({
            target: '.waiting',
            animate: true,
            overlayColor: 'none'
        });
        //$scope.init();

        var query = {};

        if (productId)
            query.product = productId;

        if ($scope.price_level)
            query.priceList = $scope.price_level;

        if (costFind)
            query.cost = 1;

        $http({
            method: 'GET',
            url: '/erp/api/product/prices',
            params: query
        }).success(function(data, status) {
            console.log("prices", data);
            $scope.prices = data;

            Metronic.unblockUI('.waiting');
        });
    };

    $scope.update = function(line, newPrice) {
        if (newPrice)
            line.prices.push(newPrice)

        $http({
            method: 'PUT',
            url: '/erp/api/product/prices/' + line._id,
            data: line
        }).success(function(data, status) {
            $scope.find();
        });
    };

    $scope.updatePrice = function(line, price, key) {
        if (key == 'priceTTC')
            price.price = price[key] / (1 + line.product.tva_tx / 100);

        /*if price update with coef -> update coef*/
        if ($scope.product)
            if ($scope.product.info.sellFamily.coef && $scope.product.directCost)
                price.coef = price.price / $scope.product.directCost;

        $http({
            method: 'PUT',
            url: '/erp/api/product/prices/' + line._id,
            data: line
        }).success(function(data, status) {
            $scope.find();
        });
    };


    $scope.updateDiscount = function(productId, discount, price_level) {
        $http({
            method: 'PUT',
            url: '/erp/api/product/discount',
            data: {
                _id: productId,
                price_level: price_level,
                discount: discount
            }
        }).success(function(data, status) {
            $scope.find();
        });
    };


    $scope.remove = function(row) {
        $http({
            method: 'DELETE',
            url: '/erp/api/product/prices/' + row._id
        }).success(function(data, status) {
            $scope.find();
        });
    };

    $scope.addNewPrice = function() {
        var modalInstance = $modal.open({
            templateUrl: (costFind ? 'newModalSupplierPrice.html' : 'newModalPrice.html'),
            controller: ModalInstanceCtrl,
            //windowClass: "steps",
            resolve: {
                options: function() {
                    return {
                        price_list: $scope.price_list,
                        product: $scope.product
                    };
                }
            }
        });

        modalInstance.result.then(function(price) {
            $http({
                method: 'POST',
                url: '/erp/api/product/prices',
                data: price
            }).success(function(data, status) {
                $scope.find();
            });
        }, function() {});
    };

    var ModalInstanceCtrl = function($scope, $modalInstance, options) {
        $scope.product = options.product;

        $scope.price = {
            product: options.product._id,
            priceLists: options.price_list,
            basePrice: options.product.directCost || 0,
            prices: [{
                count: 0,
                coef: 1,
                price: 0,
                discount: 0
            }]
        };

        $scope.productAutoComplete = function(val) {
            return $http.post('/erp/api/product/autocomplete', {
                take: 50,
                skip: 0,
                page: 1,
                pageSize: 5,
                filter: {
                    logic: 'and',
                    filters: [{ value: val }]
                }
            }).then(function(res) {
                console.log(res.data);

                for (var i in res.data) {
                    res.data[i] = res.data[i].product.id;
                    res.data[i].name = res.data[i].ref;
                    //console.log(res.data[i]);
                }
                return res.data;
            });
        };

        $http({
            method: 'POST',
            url: '/erp/api/product/prices/select',
            data: { cost: costFind }
        }).success(function(data) {
            $scope.pricesLists = data;
        });

        $scope.ok = function() {
            $modalInstance.close($scope.price);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.clone = function() {
        var modalInstance = $modal.open({
            templateUrl: 'cloneContent.html',
            controller: ModalInstanceCtrl,
            //windowClass: "steps",
            resolve: {
                options: function() {
                    return {
                        price_level: $scope.price_level
                    };
                }
            }
        });

        modalInstance.result.then(function(result) {
            var price_level = result.dest;

            angular.forEach($scope.priceLevel, function(price, key) {

                price.price_level = price_level;

                delete price._id;
                delete price.tms;
                delete price.user_mod;
                delete price.createdAt;
                delete price.updatedAt;
                price.product.id = price.product.id._id;
                //console.log(price);

                $http({
                    method: 'POST',
                    url: '/erp/api/product/prices',
                    data: price
                }).success(function(data, status) {
                    $scope.find();
                });
            });
        }, function() {});
    };

    $scope.updatePrices = function() {
        var ids = [];
        if ($scope.grid) {

            angular.forEach($scope.grid, function(value, key) {
                if (value)
                    this.push(key);
            }, ids);

            var modalInstance = $modal.open({
                templateUrl: 'upgradeModalPrice.html',
                controller: ModalUpdateCtrl,
                //windowClass: "steps",
            });

            modalInstance.result.then(function(coef) {
                $http({
                    method: 'PUT',
                    url: '/erp/api/product/prices/upgrade',
                    data: {
                        id: ids,
                        price_level: $scope.price_level,
                        coef: coef
                    }
                }).success(function(data, status) {
                    $scope.find();
                });
            }, function() {});

        }
    };

    var ModalUpdateCtrl = function($scope, $modalInstance) {

        $scope.coef = 1;

        $scope.ok = function() {
            $modalInstance.close($scope.coef);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

}]);

MetronicApp.controller('ProductStatsController', ['$scope', '$rootScope', '$http', 'Products', function($scope, $rootScope, $http, Products) {
    $scope.modes = [{
        id: 'QTY',
        label: 'Quantite'
    }, {
        id: 'AMOUNT',
        label: 'Total HT'
    }, {
        id: 'WEIGHT',
        label: 'Poids (kg)'
    }];
    $scope.mode = 'QTY';


    // This month
    $scope.date = {
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate()
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        $scope.find();
    });


    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = true;

        $scope.find();

    });

    $scope.find = function() {
        var query = {
            //entity: $rootScope.entity,
            start_date: $scope.date.start,
            end_date: $scope.date.end
        };

        $http({
            method: 'GET',
            url: '/erp/api/product/consumption',
            params: query
        }).success(function(data, status) {
            //console.log(data);
            $scope.entries = data;
            //$scope.totalEntries = data.total;
        });
    };

}]);