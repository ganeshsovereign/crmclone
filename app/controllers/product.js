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

MetronicApp.controller('ProductController', ['$scope', '$rootScope', '$timeout', '$http', '$modal', '$filter', 'dialogs', 'toastr', 'Products', function($scope, $rootScope, $timeout, $http, $modal, $filter, dialogs, toastr, Products) {

    $scope.backTo = 'product.list';
    $scope.newPack = {};

    $scope.product = {
        new: true,
        //minPrice: 0,
        //billingMode: "QTY",
        isSell: true,
        units: "unit",
        entity: [],
        info: {
            autoBarCode: true,
            isActive: true,
            langs: [{}]
        }
    };
    $scope.products = [];
    $scope.caFamilies = [];
    $scope.family = null;
    $scope.dict = {};
    $scope.newSupplierPrice = {
        taxes: []
    };
    $scope.productTypes = [];
    $scope.attributeMap = {};

    $scope.refFound = false;
    $scope.validRef = true;

    //variants selected options
    $scope.checkedObj = {};
    $scope.collection = [];
    $scope.thead = [];
    $scope.variantesLines = [];
    $scope.variantsArray = [];

    $scope.billingModes = [{
            id: "QTY",
            label: "Quantité"
        },
        {
            id: "MONTH",
            label: "Abonnement mensuel"
        }
    ];

    var grid = new Datatable();

    $scope.$on('websocket', function(e, type, data) {
        if (type !== 'refresh')
            return;

        //console.log(data);
        //console.log(type);

        if (!data || !data.data || !data.data.route || data.data.route.indexOf('product') < 0)
            return;

        if ($rootScope.$stateParams.id)
            if (data.data._id == $rootScope.$stateParams.id) {
                $scope.findOne();
                if (data.data.message)
                    toastr.warning(data.data.message, 'Notification serveur', {
                        timeOut: 1000,
                        progressBar: true
                    });
            }
    });

    $scope.isValidRef = function() {
        if (!this.product || !this.product.info || !this.product.info.SKU)
            return false;

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
                if (data && data._id && $scope.product && $scope.product._id !== data._id) // REF found
                    $scope.refFound = true;
            });

        $scope.validRef = isValide;
    };

    $scope.$on('$viewContentLoaded', function() {
        var dict = ["fk_tva", "fk_units"];

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

            //if (!$rootScope.$stateParams.id)
            // Is a list
            //  initDatatable();
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
            params: {
                isCost: false
            }
        }).success(function(data, status) {
            $scope.sellFamilies = data.data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/product/family',
            params: {
                isCost: true
            }
        }).success(function(data, status) {
            $scope.costFamilies = data.data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/product/taxes'
        }).success(function(data, status) {
            //console.log(data);
            $scope.taxes = data.data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/product/prices/priceslist/select',
            params: {
                cost: false
            }
        }).success(function(data) {
            $scope.pricesLists = data.data;
        });
    });

    $scope.create = function() {
        var product = $scope.product;
        var self = this;

        if (product.new) {
            product = new Products(this.product);
            product.$save(function(response) {
                $rootScope.$state.go("product.show", {
                    id: response._id
                });
            });
            return;
        }

        product.$update(function(response) {
            $scope.findOne(); // refresh product with populate
        });
    };

    $scope.update = function(isValidated) {
        var product = $scope.product;
        var self = this;

        if (isValidated)
            product.isValidated = true;
        else
            product.isValidated = false;

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

    $scope.clone = function(qty) {
        $scope.product.$clone({
            qty: qty
        }, function(response) {
            $rootScope.$state.go('product.show', {
                id: response._id
            });
        });
    };

    $scope.findOne = function() {
        $scope.changedProductFamily = null;

        /*Get product variants */
        $http({
            method: 'GET',
            url: '/erp/api/product/variants/' + $rootScope.$stateParams.id
        }).success(function(data, status) {
            $scope.productVariants = data;
            //console.log("variants ", data);

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

                    if ($scope.product.sellFamily)
                        $http({
                            method: 'GET',
                            url: '/erp/api/product/family/' + $scope.product.sellFamily._id
                        }).success(function(data, status) {
                            //console.log(data);
                            $scope.changedProductFamily = data;

                            for (var i = 0, len = data.opts.length; i < len; i++) {
                                for (var j = 0, lenj = data.opts[i].values.length; j < lenj; j++) {
                                    $scope.checkedObj = {};
                                }
                            }

                            $scope.attributeMap = {};
                            for (var i = 0; i < product.attributes.length; i++) {
                                //console.log("attr ", product.attributes[i]);
                                $scope.attributeMap[product.attributes[i].attribute] = i;
                            }

                            //Fusion saved attributes with new attibutes
                            angular.forEach(data.opts, function(attr) {
                                for (var i = 0; i < product.attributes.length; i++) {
                                    //console.log("attr product ", attr);
                                    if (product.attributes[i].attribute == attr._id) // Found attribute
                                        return product.attributes[i].values = attr.values;
                                }

                                // Add new attribute
                                product.attributes.push({
                                    attribute: attr._id,
                                    value: null,
                                    options: [],
                                    values: attr.values
                                });

                                $scope.attributeMap = {};
                                for (var i = 0; i < product.attributes.length; i++) {
                                    //console.log("attr ", product.attributes[i]);
                                    $scope.attributeMap[product.attributes[i].attribute] = i;
                                }
                            });


                        });


                },
                function(err) {
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

    $scope.refreshAllProducts = function() {
        $http.post('/erp/api/product/refresh').then(function(res) {
            $scope.find();
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
                    [2, "asc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool'
                }, {
                    "data": "imageSrc"
                }, {
                    "data": "info.SKU"
                }, {
                    data: 'info.productType',
                    defaultContent: ""
                }, {
                    "data": "name",
                    defaultContent: "",
                    searchable: false
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
                    "data": "rating.total",
                    defaultContent: ""
                }, {
                    "data": "Status",
                    defaultContent: ""
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
            $scope.newSupplierPrice.societe = $scope.newSupplierPrice.societe.id;
            $scope.product.suppliers.push($scope.newSupplierPrice);
            $scope.newSupplierPrice = {
                taxes: []
            };
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

        //console.log("collection :", collection);

        function allPossibleCases(arr) {
            if (arr.length === 0)
                return [];

            if (arr.length == 1)
                return arr[0];

            var result = [];
            var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
            for (var i = 0; i < allCasesOfRest.length; i++) {
                for (var j = 0; j < arr[0].length; j++) {
                    //console.log(allCasesOfRest[i]);
                    var res = [];

                    var next = allCasesOfRest[i];

                    if (Array.isArray(next)) {
                        res = next;
                        res.unshift(arr[0][j]); // Add element at first
                    } else {
                        res.push(arr[0][j]); // + allCasesOfRest[i]);
                        res.push(allCasesOfRest[i]);
                    }

                    result.push(res);
                }
            }
            return result;

        }

        //console.log(collection);

        var tabVariants = [];
        for (var i = 0; i < collection.length; i++) {
            for (var j = 0; j < collection[i].values.length; j++) {
                if (!tabVariants[i])
                    tabVariants[i] = [];
                tabVariants[i][j] = collection[i].values[j];
            }
        }

        $scope.tabVariants = _.map(allPossibleCases(tabVariants), function(elem) {
            var varId = [],
                varName = [];

            _.each(elem, function(elem) {
                varId.push(elem._id);
                varName.push(elem.code);
            });

            return {
                _id: varId.sort().join('/'),
                ids: varId.sort(),
                name: varName.join('/')
            };
        });

        //console.log($scope.tabVariants);


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

        if (collection[1])
            for (var elem1 in collection[1].values) {
                thead[0].push({
                    colspan: (collection[2] ? collection[2].values.length : ''),
                    value: collection[1].values[elem1].code
                });
            }

        if (collection[2]) {
            thead[1].push({});
            if (collection[3])
                thead[1].push({});

            for (var elem1 in collection[1].values) {
                for (var elem2 in collection[2].values) {
                    thead[1].push({
                        colspan: '',
                        value: collection[2].values[elem2].code
                    });
                }
            }
        }



        if (collection[0]) {
            collection[0].values.forEach(function(elem3, index1) {
                if (collection[3]) {
                    collection[3].values.forEach(function(elem0, index2) {

                        //<tr>
                        var aline = {
                            col: []
                        };
                        aline.index2 = index2;
                        aline.rowspan = (collection[3] ? collection[3].values.length : '');
                        aline.elem3 = elem3.code;
                        aline.elem0 = elem0.code;

                        if (collection[1]) {
                            collection[1].values.forEach(function(elem1) {
                                if (collection[2]) {
                                    collection[2].values.forEach(function(elem2) {
                                        var varId = [elem3._id, elem2._id, elem1._id, elem0._id].sort();
                                        var html = true;
                                        aline.col.push({
                                            html: html,
                                            id: varId.join('/'),
                                            values: varId
                                        });
                                    });
                                }
                            })
                        }
                        lines.push(aline);
                        //</tr>
                    });
                } else {
                    //<tr>
                    var aline = {
                        col: []
                    };
                    aline.elem0 = elem3.code;

                    if (collection[1]) {
                        if (collection[2]) {
                            collection[1].values.forEach(function(elem2) {
                                collection[2].values.forEach(function(elem1) {
                                    var varId = [elem3._id, elem2._id, elem1._id].sort();
                                    var html = true;
                                    aline.col.push({
                                        html: html,
                                        id: varId.join('/'),
                                        values: varId
                                    });
                                });
                            });
                        } else {
                            collection[1].values.forEach(function(elem2) {
                                var varId = [elem3._id, elem2._id].sort();
                                var html = true;
                                aline.col.push({
                                    html: html,
                                    id: varId.join('/'),
                                    values: varId
                                });
                            });
                        }
                    } else {
                        var html = true;
                        var varId = elem3._id;
                        aline.col.push({
                            html: html,
                            id: varId,
                            values: [elem3._id]
                        });
                    }
                    //</tr>
                    lines.push(aline);
                }
            });
        }


        //console.log(lines);
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

    $scope.productAutoComplete = function(val, options) {
        return $http.post('/erp/api/product/autocomplete', {
            take: 50,
            skip: 0,
            page: 1,
            pageSize: 5,
            //                supplier: options.supplier,
            //inventory: true,
            options: options,
            filter: {
                logic: 'and',
                filters: [{
                    value: val
                }]
            }
        }).then(function(res) {
            console.log(res.data);
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
                info: {
                    SKU: data.ref
                },
                name: data.info.langs[0].name,
                directCost: data.directCost
            },
            qty: 1,
        };

        $scope.changePackQty();
    };

    $scope.addPack = function(type) {
        if (!type)
            return;

        if (!$scope.newPack.id)
            return;

        if (!$scope.product[type])
            $scope.product[type] = [];

        $scope.product[type].push($scope.newPack);
        /*{
         id : { _id : $scope.newPack.product.id,
         label : $scope.newPack.product.label,
         ref : $scope.newPack.product.ref,
         prices : { pu_ht : $scope.newPack.pu_ht}
         },
         qty : $scope.newPack.qty
         });*/
        $scope.update();
        $scope.newPack = {};
    };

    $scope.deletePack = function(idx, type) {
        $scope.product[type].splice(idx, 1);
        $scope.update();
    };

    $scope.createNewPackaging = function() {
        var dlg = null;

        var controllerPackaging = function($scope, $modalInstance, data) {
            $scope.data = data;
            $scope.qty = 1;

            $scope.cancel = function() {
                $modalInstance.dismiss('canceled');
            }; // end cancel

            $scope.save = function() {
                //console.log($scope.data.id);
                $modalInstance.close({
                    _id: $scope.data,
                    qty: $scope.qty
                });
            }; // end save

            $scope.hitEnter = function(evt) {
                if (angular.equals(evt.keyCode, 13))
                    $scope.save();
            }; // end hitEnter
        };

        dlg = dialogs.create('rename.html', controllerPackaging, $scope.product, {
            key: false,
            back: 'static'
        });
        dlg.result.then(function(newval) {
            $scope.clone(newval.qty);
        }, function() {});
    };

    $scope.addProductToVariant = function(newProductId) {
        // Specify newProductId be a variant form this product

        if (!newProductId)
            return;

        if (!$scope.product.isVariant) {
            $scope.product.isVariant = true;
            $scope.update();
        }

        //LoadProduct
        Products.get({
            Id: newProductId
        }, function(product) {
            product.isVariant = true;
            product.groupId = $scope.product.groupId;

            product.$update(function(response) {
                $scope.findOne(); // refresh product with populate
            });

        });
    };

    $scope.delProductToVariant = function(productId) {
        // Specify newProductId be a variant form this product

        if (!productId)
            return;

        //LoadProduct
        Products.get({
            Id: productId
        }, function(product) {
            product.isVariant = false;
            product.groupId = product._id;
            product.variants = [];

            product.$update(function(response) {
                $scope.findOne(); // refresh product with populate
            });

        });
    };

    $scope.changeProductVariant = function(productId, variants) {
        if (!productId)
            return;

        console.log(variants);

        //LoadProduct
        Products.get({
            Id: productId
        }, function(product) {
            product.variants = variants.split('/');

            product.$update(function(response) {
                $scope.findOne(); // refresh product with populate
            });

        });

    };

    $scope.countVariant = function(variant, packing) {
        if (!variant)
            return 0;

        var cpt = 0;

        _.each($scope.productVariants.variantsArray, function(n) {
            if (variant == n.variantsIds && packing == n.packing)
                cpt++;

            return;
        });
        return cpt;
    };

    $scope.addProductToChannel = function(id, channel) {
        $http.post('/erp/api/channel/product', {
            product: id,
            channel: channel._id,
            type: 'product'
        }).then(function(res) {
            channel.channels.push(res.data);
        });
    };

    $scope.deleteProductToChannel = function() {

    };


}]);

MetronicApp.controller('ProductListController', ['$scope', '$rootScope', '$http', '$modal', '$filter', '$timeout', 'superCache', 'Products',
    function($scope, $rootScope, $http, $modal, $filter, $timeout, superCache, Products) {

        //var grid = new Datatable();
        var user = $rootScope.login;
        $scope.grid = {};
        $scope.openFilter = {};

        $scope.dict = {};
        $scope.search = {
            Status: {
                value: []
            },
            sellFamily: {
                value: []
            },
            isActive: {
                value: [true]
            },
            isSell: {
                value: [true, true]
            },
            isBuy: {
                value: [true, true]
            },
        };

        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };

        $scope.sort = {
            'data.info.SKU': 1
        };

        if (typeof superCache.get("ProductListController") !== "undefined") {
            $scope.page = superCache.get("ProductListController").page;
            $scope.search = superCache.get("ProductListController").search;
            $scope.sort = superCache.get("ProductListController").sort;
        }

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.products.length; i++)
                if (this.checkAll)
                    this.grid[$scope.products[i]._id] = true;
        }

        $scope.$dict = {};

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('product') < 0)
                return;

            $scope.find();
        });

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            $http({
                method: 'GET',
                url: '/erp/api/dict',
                params: {
                    modelName: 'product'
                }
            }).success(function(data, status) {
                $scope.$dict.Status = data.product;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/product/family',
                params: {
                    isCost: false
                }
            }).success(function(data, status) {
                $scope.sellFamilies = data.data;
                $scope.find();

                $scope.loadAttibutFamily();

            });

        });

        $scope.find = function() {

            superCache.put("ProductListController", {
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
                contentType: 'salesProduct',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: this.sort
            };

            //console.log("scope", $scope);

            Products.query(query, function(data, status) {
                console.log("products", data);
                $scope.page.total = data.total;
                $scope.products = data.data;
                $scope.totalAll = data.totalAll;

                $timeout(function() {
                    Metronic.unblockUI('.waiting');
                }, 0);
            });

        };

        $scope.loadAttibutFamily = function() {
            if (!this.search.sellFamily.value[0])
                return;

            $http({
                method: 'GET',
                url: '/erp/api/product/family/' + this.search.sellFamily.value[0]
            }).success(function(data, status) {
                $scope.productFamilyAttributes = data;

                //console.log(data);

                angular.forEach(data.opts, function(elem) {
                    if (!$scope.search[elem._id])
                        switch (elem.mode) {
                            case 'select':
                                $scope.search[elem._id] = {
                                    value: [],
                                    key: 'attributes',
                                    options: {
                                        key: 'options',
                                        type: 'attribute',
                                        attributeId: elem._id
                                    }
                                };
                                break;
                            default:
                                $scope.search[elem._id] = {
                                    value: [],
                                    type: 'number',
                                    key: 'attributes',
                                    options: {
                                        type: 'attribute',
                                        attributeId: elem._id
                                    },
                                    operator: ["$gte", "$lte"]
                                };
                        }
                });

            });
        }
    }
]);

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
                filters: [{
                    value: val
                }]
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
                filters: [{
                    value: val
                }]
            }
        }).then(function(res) {
            //console.log(res.data);
            return res.data;
        });
    };

}]);

MetronicApp.controller('DynFormController', ['$scope', '$http', '$modalInstance', '$rootScope', 'object', 'options', function($scope, $http, $modalInstance, $rootScope, object, options) {

    $scope.model = object;

    $scope.dynform = {};

    $http.get('/erp/api/product/dynform/' + object.product.info.productType.dynamic.name)
        .then(function(res) {
            //console.log(res.data);
            $scope.dynform = res.data;
        });

    $scope.updated = function(modelValue, form) {
        //console.log(options);
        $http.post('/erp/api/product/combined/' + options.priceList, this.model)
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
                filters: [{
                    value: val
                }]
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
                url: '/erp/api/product/prices/priceslist/select',
                params: {
                    // cost: (cost === false ? false : true),
                    // isGlobalDiscount: false,
                    // isCoef: true,
                    // isFixed: true
                }
            }).success(function(data, status) {
                $scope.pricesLists = data.data;
                console.log("PriceLists", data);

                if ($rootScope.$stateParams.priceListId) {

                    angular.forEach(data.data, function(elem) {
                        if (elem._id == $rootScope.$stateParams.priceListId) {
                            $scope.priceList = elem;
                            $scope.find();
                        }
                    });
                }

            });
    };

    $scope.page = {
        limit: 25,
        page: 1,
        total: 0
    };

    $scope.sort = {
        'product.info.SKU': 1
    };



    $scope.find = function() {
        $scope.grid = {};
        Metronic.blockUI({
            target: '.waiting',
            animate: false,
            boxed: true,
            overlayColor: 'gray'
        });




        //$scope.init();

        var query = {
            filter: this.search,
            limit: $scope.page.limit,
            page: $scope.page.page,
            sort: this.sort
        };

        if (productId)
            query.product = productId;

        if ($scope.priceList)
            if ($scope.priceList._id)
                query.priceList = $scope.priceList._id;
            else
                query.priceList = $scope.priceList;

        if (costFind)
            query.cost = 1;

        //console.log(query);

        $http({
            method: 'GET',
            url: '/erp/api/product/prices',
            params: query
        }).success(function(data, status) {
            //console.log("prices", data);
            $scope.page.total = data.total;
            $scope.prices = data.data;

            $timeout(function() {
                Metronic.unblockUI('.waiting');
            }, 0);
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
            price.price = price[key] / (1 + line.product.taxes[0].taxeId.rate / 100);

        /*if price update with coef -> update coef*/
        /*if ($scope.product)
            if ($scope.product.sellFamily.isCoef && ($scope.product.directCost + $scope.product.indirectCost)) {
                var coefFamily = price.coefTotal / price.coef;
                //console.log(coefFamily);

                price.coef = price.price / coefFamily / ($scope.product.directCost + $scope.product.indirectCost);
            }*/

        $http({
            method: 'PUT',
            url: '/erp/api/product/prices/' + line._id,
            data: line
        }).success(function(data, status) {
            $scope.find();
        });
    };

    $scope.refreshCoefPrices = function(priceList, product) {
        $http({
            method: 'PUT',
            url: '/erp/api/product/prices/priceslist/refreshCoef',
            params: {
                priceList: (priceList ? priceList._id : null),
                product: (product ? product._id : null)
            },
            data: {}
        }).success(function(data, status) {
            $scope.find();
        });
    };

    $scope.updateQty = function(line) {

        $http({
            method: 'PUT',
            url: '/erp/api/product/prices/' + line._id,
            data: {
                _id: line._id,
                type: "QTY",
                qtyMin: line.qtyMin,
                qtyMax: line.qtyMax
            }
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
                        priceList: $scope.priceList,
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
            product: (options.product ? options.product._id : null),
            priceLists: options.priceList,
            basePrice: (options.product ? options.product.directCost : 0),
            prices: [{
                count: 0,
                //coef: 1,
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
                    filters: [{
                        value: val
                    }]
                }
            }).then(function(res) {
                return res.data;
            });
        };

        let params = {};
        if (costFind)
            params = {
                cost: true
            };
        else
            params = {
                isCoef: true,
                isFixed: true
            };


        $http({
            method: 'GET',
            url: '/erp/api/product/prices/priceslist/select',
            params: params
        }).success(function(data) {
            console.log(data);
            $scope.pricesLists = data.data;
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
        $rootScope.settings.layout.pageBodySolid = false;

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
            console.log(data);
            $scope.entries = data;
            //$scope.totalEntries = data.total;
        });
    };

}]);

MetronicApp.controller('ProductBankImagesController', ['$scope', '$rootScope', '$http', 'Files', '$modal', 'FileUploader', function($scope, $rootScope, $http, Files, $modal, FileUploader) {

    $scope.images = [];
    $scope.productImages = [];
    $scope.search = "";

    var uploader = $scope.uploader = new FileUploader({
        autoUpload: true
    });
    uploader.url = '/erp/api/images/bank';

    $scope.refreshDirectory = function() {
        var images = new Files.bank();
        images.$update(function(data) {
            $scope.find();
        });
    };

    $scope.$on('$viewContentLoaded', function() {

        $rootScope.settings.layout.pageBodySolid = false;

        /*

                $http({
                    method: 'GET',
                    url: '/erp/api/product/prices/priceslist/select',
                    params: { cost: false }
                }).success(function(data) {
                    $scope.pricesLists = data.data;
                });*/
        $scope.find();
    });

    $scope.page = {
        limit: 25,
        page: 1,
        total: 0
    };

    $scope.find = function(product) {
        //console.log(product);
        var images = new Files.bank();

        images.$query({
            filter: this.search,
            limit: $scope.page.limit,
            page: $scope.page.page
        }, function(data) {
            $scope.page.total = data.total;
            $scope.images = data.data;
        });

        if (product && product._id) {
            $scope.product = product;
            var imagesProduct = new Files.productImages();

            imagesProduct.$get({
                Id: product._id
            }, function(data) {
                //console.log(data);
                $scope.productImages = data.id;
            });
        }

    };

    $scope.delete = function(id, index) {
        $http({
            method: 'DELETE',
            url: '/erp/api/images/bank/' + id
        }).success(function(data, status) {
            $scope.images.splice(index, 1);
        });
    };

    // FILTERS
    //uploader.filters.push({
    //    name: 'customFilter',
    //    fn: function(item /*{File|FileLikeObject}*/ , options) {
    //        return this.queue.length < 10;
    //    }
    //});

    $scope.typesConfig = {
        "file": {
            "icon": "fa fa-file-o icon-state-success"
        },
        "image": {
            "icon": "fa fa-file-image-o icon-state-success"
        }
    };

    // CALLBACKS
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        $scope.find();
    };

    uploader.onCompleteItem = function(item, response, status, headers) {
        console.log(response);
        //$scope.images.push();
    };

    $scope.addImageToProduct = function(image) {
        if (!$scope.product._id)
            return;

        $http({
            method: 'PUT',
            url: '/erp/api/images/product/' + $scope.product._id,
            data: {
                image: image._id
            }
        }).success(function(data, status) {
            console.log(data);
            $scope.productImages.push(image._id);
        });

    };

    $scope.editImage = function(image) {

        var modalInstance = $modal.open({
            templateUrl: '/templates/core/modal/imagesInfo.html',
            controller: 'ProductBankImagesModalController',
            size: "lg",
            resolve: {
                options: function() {
                    return {
                        image: image
                    };
                }
            }
        });

        modalInstance.result.then(function() {
            image = new Files.bank(image);

            image.$update(function(response) {
                $scope.find();
            });
        }, function() {
            $scope.find();
        });
    };

}]);

MetronicApp.controller('ProductImagesController', ['$scope', '$rootScope', '$http', '$modal', 'Files', function($scope, $rootScope, $http, $modal, Files) {
    $scope.images = [];
    $scope.product = null;

    $scope.init = function() {
        $scope.product = $scope.$parent.product;

        $scope.find();
    };

    $scope.find = function() {
        var images = new Files.productImages();

        images.$get({
            Id: $scope.product._id
        }, function(data) {
            console.log(data);
            $scope.images = data.data;
        });
    };

    $scope.addImages = function() {

        var modalInstance = $modal.open({
            templateUrl: '/templates/core/modal/images.html',
            controller: 'ProductBankImagesModalController',
            size: "lg",
            resolve: {
                options: function() {
                    return {
                        product: $scope.product
                    };
                }
            }
        });

        modalInstance.result.then(function() {
            $scope.find();
        }, function() {
            $scope.find();
        });

    };

    $scope.delete = function(image, index) {
        $http({
            method: 'DELETE',
            url: '/erp/api/images/product/' + image._id
        }).success(function(data, status) {
            $scope.images.splice(index, 1);
        });
    };

    $scope.addProductAsTop = function(image) {
        $scope.$parent.product.imageSrc = image.image._id;
        $scope.$parent.update();
    };

}]);

MetronicApp.controller('ProductBankImagesModalController', ['$scope', '$rootScope', '$http', '$modalInstance', 'options', 'Files', function($scope, $rootScope, $http, $modalInstance, options, Files) {
    //console.log(options);

    $scope.image = options.image;
    $scope.product = options.product;

    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

}]);

MetronicApp.controller('ProductStockCorrectionController', ['$scope', '$rootScope', '$http', 'Orders', function($scope, $rootScope, $http, Orders) {

    var Object = Orders.stockCorrection;

    $scope.dict = {};
    $scope.$dict = {};
    $scope.corrections = [];
    $scope.object = {
        orderRows: []
    };

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $scope.backTo = 'product.stockcorrection.list';

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        $http({
            method: 'GET',
            url: '/erp/api/product/warehouse/select'

        }).success(function(data, status) {
            $scope.$dict.warehouse = data.data;
            //console.log(data);
        });

        $scope.find();

    });

    $scope.LoadLocation = function() {
        var self = this;
        this.object.location = {};

        $http({
            method: 'GET',
            url: '/erp/api/product/warehouse/location/select',
            params: {
                warehouse: self.object.warehouse._id
            }

        }).success(function(data, status) {
            $scope.$dict.location = data.data;
            //console.log(data);
        });
    };

    $scope.page = {
        limit: 25,
        page: 1,
        total: 0
    };


    $scope.find = function() {
        Metronic.blockUI({
            target: '.waiting',
            animate: true,
            overlayColor: 'none'
        });

        var query = {
            filter: this.search,
            limit: $scope.page.limit,
            page: $scope.page.page
        };

        var obj = new Object();
        obj.$query(query, function(data) {
            $scope.page.total = data.total;
            $scope.corrections = data.data;

            Metronic.unblockUI('.waiting');
        });
    };

    $scope.create = function() {
        console.log(this.object);
        var object = new Object(this.object);
        object.$save(function(response) {
            $rootScope.$state.go($scope.backTo);
        });
    };

    $scope.remove = function(object) {
        $scope.object.$remove();
        $rootScope.$state.go($scope.backTo);
    };


    /*$scope.update = function(callback) {
        var object = $scope.object;

        object.$update(function(response) {

            $scope.findOne(callback);
        }, function(err) {
            console.log(err);
            $scope.findOne(callback);
        });
    };*/

    $scope.findOne = function(callback) {
        if (!$rootScope.$stateParams.id) {
            $scope.editable = true;
            return;
        }

        Object.get({
            Id: $rootScope.$stateParams.id
        }, function(object) {
            $scope.object = object;
            console.log(object);

            if (callback)
                callback(object);
        }, function(err) {
            console.log(err);
        });
    };

}]);

MetronicApp.controller('ProductStockDetailController', ['$scope', '$rootScope', '$http', '$modal', function($scope, $rootScope, $http, $modal) {

    $scope.dict = {};

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $scope.backTo = 'product.stockdetail.list';

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        $scope.find();

    });

    $scope.page = {
        limit: 25,
        page: 1,
        total: 0
    };

    $scope.find = function() {

        var query = {
            limit: $scope.page.limit,
            page: $scope.page.page
        };
        $http({
            method: 'GET',
            url: '/erp/api/product/stockInventory',
            params: query
        }).success(function(data, status) {
            //console.log(data);
            $scope.listObject = data.data;
            $scope.page.total = data.total;
            $scope.total_cost = data.total_cost;
            //$scope.totalEntries = data.total;
        });

    };

    $scope.Movement = function(line) {

        //console.log(line);
        var modalInstance = $modal.open({
            templateUrl: '/templates/core/modal/stockdetailmovement.html',
            controller: 'ProductStockDetailTransfertController',
            size: "lg",
            resolve: {
                options: function() {
                    return {
                        line: line
                    };
                }
            }
        });

        modalInstance.result.then(function() {

            product.$update(function(response) {
                $scope.find();
            });

            /*$http({
                method: 'PUT',
                url: '/erp/api/product/upgradeprice',
                data: {
                    id: grid.getSelectedRows(),
                    price_level: "BASE",
                    coef: coef
                }
            }).success(function(data, status) {
                $scope.find();
            });*/
        }, function() {
            $scope.find();
        });
    };

}]);

MetronicApp.controller('ProductStockDetailTransfertController', ['$scope', '$rootScope', '$http', '$modalInstance', 'options', 'Files', function($scope, $rootScope, $http, $modalInstance, options, Files) {
    //console.log(options);

    $scope.line = options.line;
    $scope.$dict = {};

    $http({
        method: 'GET',
        url: '/erp/api/product/warehouse/select'
    }).success(function(data, status) {
        $scope.$dict.warehouse = data.data;
        //console.log(data);
    });

    $scope.transfert = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

}]);

MetronicApp.controller('ProductStockTransfersController', ['$scope', '$rootScope', '$http', '$modal', function($scope, $rootScope, $http, $modal) {

    $scope.dict = {};

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $scope.backTo = 'product.stocktransfert.list';

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        $scope.find();

    });

    $scope.find = function() {

        $http({
            method: 'GET',
            url: '/erp/api/product/stockInventory',
            params: {}
        }).success(function(data, status) {
            console.log(data);
            $scope.listObject = data.data;
            //$scope.totalEntries = data.total;
        });

    };

    $scope.transfers = function(line) {

        //console.log(line);
        var modalInstance = $modal.open({
            templateUrl: '/templates/core/modal/stocktransfers.html',
            controller: 'ProductStockDetailTransfertController',
            size: "lg",
            resolve: {
                options: function() {
                    return {
                        line: line
                    };
                }
            }
        });

        modalInstance.result.then(function() {

            product.$update(function(response) {
                $scope.find();
            });

            /*$http({
                method: 'PUT',
                url: '/erp/api/product/upgradeprice',
                data: {
                    id: grid.getSelectedRows(),
                    price_level: "BASE",
                    coef: coef
                }
            }).success(function(data, status) {
                $scope.find();
            });*/
        }, function() {
            $scope.find();
        });
    };

}]);

MetronicApp.controller('ProductInventoryController', ['$scope', '$rootScope', '$http', '$modal', function($scope, $rootScope, $http, $modal) {

    $scope.dict = {};

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        $scope.find();

    });

    $scope.find = function() {


        $http({
            method: 'GET',
            url: '/erp/api/report/scarceProducts',
            params: {}
        }).success(function(data, status) {
            console.log(data);
            $scope.listObjectLowLevel = data.data;
            //$scope.totalEntries = data.total;
        });

        $http({
            method: 'GET',
            url: '/erp/api/report/incomingStock',
            params: {}
        }).success(function(data, status) {
            console.log(data);
            $scope.listObjectInComing = data.data;
            //$scope.totalEntries = data.total;
        });

    };

}]);