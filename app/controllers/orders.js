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

var round = function(value, decimals) {
    if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
        return 0;
    return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
};

/* global angular: true */
MetronicApp.controller('OrdersController', ['$scope', '$rootScope', '$http', '$modal', '$filter', '$timeout', '$window', 'toastr', 'Orders',
    function($scope, $rootScope, $http, $modal, $filter, $timeout, $window, toastr, Orders) {

        var grid = new Datatable();
        var user = $rootScope.login;
        var current;
        var Object;

        $scope.backTo = 'dashboard';

        $scope.object = {
            forSales: true,
            delivery_mode: "SHIP_STANDARD",
            entity: $rootScope.login.entity,
            billing: {},
            address: {},
            shippingAddress: {},
            lines: []
        };

        $scope.allowValidate = false;
        $scope.editable = false;

        $scope.dict = {};
        var iconsFilesList = {};
        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];
        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.$dict = {};

        var module;

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            current = $rootScope.$state.current.name.split('.');
            //console.log(current, $rootScope.$stateParams.id);

            module = current[0];
            switch (current[0]) {
                case 'offer':
                    Object = Orders.offer;
                    $scope.backTo = 'offer.list';
                    break;
                case 'order':
                    Object = Orders.order;
                    $scope.backTo = 'order.list';
                    break;
                case 'delivery':
                    Object = Orders.delivery;
                    $scope.backTo = 'delivery.list';
                    break;
                case 'bill':
                    if ($rootScope.$stateParams.forSales == 0) {
                        $scope.object.forSales = false;
                        Object = Orders.billSupplier;
                        $scope.backTo = 'bill.list';
                    } else {
                        $scope.object.forSales = true;
                        Object = Orders.bill;
                        $scope.backTo = 'bill.list';
                    }
                    break;
                case 'stockreturn':
                    Object = Orders.stockReturn;
                    $scope.backTo = 'stockreturn.list';
                    break;
                case 'offersupplier':
                    $scope.object.forSales = false;
                    //$scope.object.stockReturn = true;
                    Object = Orders.offerSupplier;
                    $scope.backTo = 'offersupplier.list';
                    break;
                case 'ordersupplier':
                    $scope.object.forSales = false;
                    Object = Orders.orderSupplier;
                    $scope.backTo = 'ordersupplier.list';
                    break;
                case 'deliverysupplier':
                    $scope.object.forSales = false;
                    Object = Orders.deliverySupplier;
                    $scope.backTo = 'deliverysupplier.list';
                    break;
                case 'ordersfab':
                    $scope.object.forSales = false;
                    Object = Orders.ordersFab;
                    $scope.backTo = 'ordersfab.list';
                    break;
            }

            if ($rootScope.$stateParams.id && current.length <= 2 && current[1] === "show")
                return $rootScope.$state.go(current[0] + '.show.detail');

            var dict = ["fk_offer_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva", "fk_delivery_mode"];

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

            $http({
                method: 'GET',
                url: '/erp/api/product/taxes'
            }).success(function(data, status) {
                //console.log(data);
                $scope.taxes = data.data;
            });

            $http({
                method: 'GET',
                url: '/erp/api/bank',
                params: {
                    //entity: Global.user.entity
                }
            }).success(function(data, status) {
                $scope.banks = data;
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/product/warehouse/select'

            }).success(function(data, status) {
                $scope.$dict.warehouse = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/shippingMethod/select'

            }).success(function(data, status) {
                $scope.$dict.shippingMethod = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/logisticMethod/select'

            }).success(function(data, status) {
                $scope.$dict.logisticMethod = data.data;
                //console.log(data);
            });

            $scope.findOne();
        });

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route)
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

        $scope.module = function(themodule) {
            if (!themodule)
                return module;

            return module === themodule;
        };

        $scope.create = function() {
            var object = new Object(this.object);
            object.$save(function(response) {
                $rootScope.$state.go(current[0] + '.show.detail', {
                    id: response._id
                });
            });
        };

        $scope.remove = function(object) {
            $scope.object.$remove();
            $rootScope.$state.go(current[0] + '.list');
        };

        $scope.clone = function() {
            $scope.object.$clone(function(response) {
                $rootScope.$state.go(current[0] + '.show.detail', {
                    id: response._id
                });
            });
        };

        $scope.update = function(callback) {
            var object = $scope.object;
            if (!object._id)
                return;

            for (var i = object.lines.length; i--;) {
                // actually delete lines
                //if (object.lines[i].isDeleted) {
                //    object.lines.splice(i, 1);
                //}
            }
            object.$update(function(response) {
                //$location.path('societe/' + societe._id);
                //pageTitle.setTitle('Commande client ' + object.ref);

                /*if (response.lines) {
                    for (var i = 0; i < response.lines.length; i++) {
                        $scope.object.lines[i].idLine = i;
                    }
                }
                if (response.Status == "DRAFT" || response.Status == "NEW" || response.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;

                if (callback)
                    return callback(null, response);*/

                $scope.findOne(callback);
            }, function(err) {
                if (err)
                    console.log(err);

                $timeout(function() {
                    $scope.findOne(callback);
                }, 500);
            });
        };

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

                if (object.Status == "DRAFT" || object.Status == "NEW" || object.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;

                //console.log($scope.editable);

                //on utilise idLine pour definir la ligne produit que nous voulons supprimer
                if ($scope.object.lines)
                    for (var i = 0; i < $scope.object.lines.length; i++) {
                        $scope.object.lines[i].idLine = i;
                    }


                $scope.allowValidate = $scope.checkDeliveryLocation();

                if (callback)
                    callback(object);
            }, function(err) {
                console.log(err);
            });
        };

        $scope.changeEntity = function() {
            $scope.object.supplier = null;

            // Update delivery address if supplier
            if ($scope.object.forSales == false && $scope.object.entity)
                $http.get('/erp/api/entity/' + $scope.object.entity).then(function(res) {
                    //console.log(res.data);
                    $scope.object.shippingAddress = res.data.address;
                    $scope.object.shippingAddress.name = res.data.name;
                });
        };

        $scope.sendEmail = function(title, type, emails) {
            $http.post('/erp/api/sendEmail', {
                to: emails,
                data: {
                    title: title + ' ' + this.object.ref_client || "",
                    subtitle: this.object.supplier.fullName + (this.object.ref_client ? " - Reference " + this.object.ref_client : ""),
                    message: 'Veuillez trouver ci-joint le document. Cliquer sur le bouton ci-apres pour le telecharger.',
                    url: '/erp/api/' + type + '/download/' + this.object._id,
                    entity: this.object.entity
                },
                ModelEmail: 'email_PDF'
            }).then(function(res) {
                //console.log(res);
                if (res.status == 200) {

                    $scope.object.history.push({
                        date: new Date(),
                        mode: 'email',
                        msg: 'email envoye',
                        Status: 'notify',
                        author: $rootScope.login._id
                    });

                    return $scope.update();
                }
                //return res.data;
            });
        };

        $scope.updateAddress = function(data) {
            //console.log(data);

            $scope.object.address = data.address;

            if (data.salesPurchases.isGeneric)
                $scope.object.address.name = data.fullName;

            $scope.object.cond_reglement_code = data.salesPurchases.cond_reglement;
            $scope.object.mode_reglement_code = data.salesPurchases.mode_reglement;
            //$scope.object.priceList = data.salesPurchases.priceList;

            // Billing address
            $scope.object.billing = data.salesPurchases.cptBilling;

            if ($scope.object.forSales) {
                $scope.object.salesPerson = data.salesPurchases.salesPerson;
                $scope.object.salesTeam = data.salesPurchases.salesTeam;

                $scope.object.shippingAddress = data.shippingAddress[0];

                $scope.object.addresses = data.shippingAddress;

                if (data.deliveryAddressId)
                    for (var i = 0; i < data.shippingAddress.length; i++)
                        if (data.deliveryAddressId == data.shippingAddress[i]._id) {
                            $scope.object.shippingAddress = data.shippingAddress[i];
                            break;
                        }
            }
        };

        $scope.createOrder = function() {
            // CLOSE ORDER
            var object = angular.copy($scope.object);

            var id = object._id;
            object.offer = object._id;
            delete object._id;
            delete object.Status;
            delete object.latex;
            delete object.datec;
            delete object.createdAt;
            delete object.updatedAt;
            delete object.ref;
            delete object.history;
            delete object._type;
            delete object.order;

            for (var i = 0; i < object.lines.length; i++)
                delete object.lines[i]._id; //Force create a new lines

            if (object.forSales == true) {
                var order = new Orders.order(object);
                var go = "order.show";
            } else {
                var order = new Orders.orderSupplier(object);
                var go = "ordersupplier.show";
            }

            //create new order
            order.$save(function(response) {
                response.lines = object.lines;
                // Add lines and re-save
                response.$update(function(response) {
                    $scope.object.Status = 'SIGNED';
                    $scope.object.orders.push(response._id);
                    $scope.object.$update(function(object) {
                        $rootScope.$state.go(go, {
                            id: response._id
                        });
                    });
                });
            });
        };

        $scope.createBill = function() {
            var object = angular.copy($scope.object);

            var id = object._id;
            object.orders = [object._id];
            delete object._id;
            delete object.Status;
            delete object.latex;
            delete object.datec;

            if (moment(object.datedl).isAfter(moment()))
                object.datec = object.datedl;

            delete object.datedl;
            delete object.createdAt;
            delete object.updatedAt;
            delete object.ref;
            delete object.history;

            var order = new Orders.bill(object);

            //create new bill
            order.$save(function(response) {
                //$scope.object.Status = 'BILLED';
                //$scope.object.$update(function(object) {
                $rootScope.$state.go("bill.show", {
                    id: response._id
                });
                //});
            });
        };

        $scope.changeStatus = function(Status) {
            $scope.object.Status = Status;
            //return console.log($scope.object);
            $scope.update(function(object) {
                // Automatic create the first delivery
                //if (object.Status == 'PROCESSING')
                //    $scope.createDelivery();
                $scope.findOne();
            });
        };

        // Delivery printed
        $scope.deliveryAction = function(status, field, ref) {
            if ($scope.object.Status == 'SEND')
                return;

            if (status)
                $scope.object.Status = status;

            switch (field) {
                case 'picked':
                    if ($scope.object.status.isPicked == null) {
                        $scope.object.status.isPicked = new Date();
                        $scope.object.status.pickedById = $rootScope.login._id;
                    } else {
                        $scope.object.status.isPicked = null;
                        $scope.object.status.pickedById = null;
                        return $scope.update();
                    }
                    break;
                case 'packed':
                    if ($scope.object.status.isPacked == null) {
                        $scope.object.status.isPacked = new Date();
                        $scope.object.status.packedById = $rootScope.login._id;
                    } else {
                        $scope.object.status.isPacked = null;
                        $scope.object.status.packedById = null;
                        return $scope.update();
                    }
                    break;
                case 'shipped':
                    if ($scope.object.status.isShipped == null) {
                        $scope.object.status.isShipped = new Date();
                        $scope.object.status.shippedById = $rootScope.login._id;
                    }
                    break;
            }

            if (field == 'packed') {
                var ModalCtrl = function($scope, $modalInstance, options) {
                    $scope.object = options.object;
                    $scope.$dict = options.$dict;

                    $scope.ok = function() {
                        $modalInstance.close($scope.object);
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                };
                var modalInstance = $modal.open({
                    templateUrl: '/templates/delivery/modal/ispacked.html',
                    controller: ModalCtrl,
                    size: 'sm',
                    resolve: {
                        options: function() {
                            return {
                                object: $scope.object,
                                $dict: $scope.$dict
                            };
                        }
                    }
                });

                modalInstance.result.then(function(delivery) {
                    //scope.contacts.push(contacts);
                    if (!$scope.object.status.isPrinted) {
                        $scope.object.status.isPrinted = new Date();
                        $scope.object.status.printedById = $rootScope.login._id;
                    }
                    if (!$scope.object.status.isPicked) {
                        $scope.object.status.isPicked = new Date();
                        $scope.object.status.pickedById = $rootScope.login._id;
                    }

                    $scope.update();
                }, function() {
                    $scope.findOne();
                });
                return;
            }

            $scope.update();

        };

        $scope.createDelivery = function() {
            var object = angular.copy($scope.object);
            var id = object._id;
            object.order = object._id;
            delete object._id;
            delete object.Status;
            delete object.latex;
            delete object.datec;
            delete object.createdAt;
            delete object.updatedAt;
            delete object.ref;
            delete object.history;
            delete object._type;

            if (object.forSales == true) {
                var delivery = new Orders.delivery(object);
                var go = "delivery.show";
            } else {
                var delivery = new Orders.deliverySupplier(object);
                var go = "deliverysupplier.show";
            }

            //create new order
            delivery.$save(function(response) {
                //$scope.object.Status = 'PROCESSING';
                //$scope.object.$update(function(object) {
                $rootScope.$state.go(go, {
                    id: response._id
                });
                //});
            });
        };

        $scope.checkDeliveryLocation = function() {
            if (!$scope.module('deliverysupplier'))
                return false;

            if (!$scope.object.orderRows || !$scope.object.orderRows.length)
                return false;

            for (var i = 0; i < $scope.object.orderRows.length; i++) {
                if (!$scope.object.orderRows[i].locationsReceived.length)
                    return false;
                if (!$scope.object.orderRows[i].locationsReceived[0].location || !$scope.object.orderRows[i].locationsReceived[0].location._id)
                    return false;
            }
            return true;

        };

        $scope.createProductReturn = function() {
            var object = angular.copy($scope.object);

            var id = object._id;
            object.order = object._id;
            delete object._id;
            delete object.Status;
            delete object.latex;
            delete object.datec;
            delete object.datedl;
            delete object.createdAt;
            delete object.updatedAt;
            delete object.ref;
            delete object.history;
            delete object._type;

            var stockReturn = new Orders.stockReturn(object);
            var go = "stockreturn.show";

            //create new stockreturn
            stockReturn.$save(function(response) {
                //$scope.object.Status = 'PROCESSING';
                //$scope.object.$update(function(object) {
                $rootScope.$state.go(go, {
                    id: response._id
                });
                //});
            });
        };
        /*var modalInstance = $modal.open({
            templateUrl: '/templates/delivery/modal/create.html',
            controller: "DeliveryCreateController",
            resolve: {
                object: function() {
                    return {
                        order: $scope.object,
                        priceList: $scope.object.supplier.salesPurchases.priceList
                    };
                }
            }
        });

        modalInstance.result.then(function(delivery) {
            //scope.contacts.push(contacts);
            $scope.findOne(function(order) {
                var partial = false;

                for (var i = 0; i < order.deliveries.length; i++) {
                    //Refresh order quantities already sended

                    if (order.deliveries[i].deliveryQty < order.deliveries[i].orderQty) {
                        partial = true;
                        break;
                    }
                }

                if (partial == false) // CLOSE ORDER
                    order.Status = "CLOSED";
                else // LEAVE IT OPENED
                    order.Status = "SHIPPING";

                order.$update(function(response) {
                    $rootScope.$state.go('delivery.show.detail', {
                        id: delivery._id
                    });
                });
            }, function() {});
        });*/

        $scope.isQty = function(lines) {
            if (!lines || !lines.length)
                return false;

            for (var i = 0; i < lines.length; i++)
                if (lines[i].qty > 0)
                    return true;

            return false;
        }

        $scope.exportAccounting = function(id) {
            $http({
                method: 'PUT',
                url: '/erp/api/bill/accounting',
                data: {
                    id: id
                }
            }).success(function(data, status) {
                if (status === 200 && id)
                    $scope.findOne();
                else
                    $scope.find();
            });
        };
    }
]);

MetronicApp.controller('OfferListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout', 'superCache', 'Orders',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout, superCache, Orders) {
        $scope.search = {
            ref: {
                value: ""
            },
            ref_client: {
                value: ""
            },
            entity: {
                value: [],
            },
            supplier: {
                value: []
            },
            salesPerson: {
                value: []
            },
            Status: {
                value: ["NEW"]
            },
            allocationStatus: {
                value: []
            },
            fulfilledStatus: {
                value: []
            },
            shippingStatus: {
                value: []
            },
            datedl: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
            datec: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
        };

        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };

        $scope.sort = {
            'datedl': -1
        };

        if (typeof superCache.get("OfferListController") !== "undefined") {
            $scope.page = superCache.get("OfferListController").page;
            $scope.search = superCache.get("OfferListController").search;
            $scope.sort = superCache.get("OfferListController").sort;
        }

        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];
        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('offer') < 0)
                return;

            $scope.find();
        });

        var module = $rootScope.$state.current.name.split('.')[0];
        $scope.module = function(themodule) {
            if (!themodule)
                return module;

            return module === themodule;
        };
        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.offers.length; i++)
                if (this.checkAll)
                    this.grid[$scope.offers[i]._id] = true;
        }

        $scope.$dict = {
            status: [{
                    id: "ALL",
                    name: "Complet"
                },
                {
                    id: "NOA",
                    name: "Partiel"
                },
                {
                    id: "NOT",
                    name: "Aucun"
                },
            ]
        };

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_order_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva", "fk_delivery_mode"];

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

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            $scope.find();
        });

        // Init ng-include
        $scope.$on('$includeContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_order_status", "fk_input_reason", "fk_paiement", "fk_bill_type", "fk_transport", "fk_payment_term", "fk_tva"];

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
        };

        $scope.openUrl = function(url, param) {
            if (!grid)
                return;

            var params = {};

            if (!params.entity)
                params.entity = $rootScope.entity;

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            params.id = grid;

            $http({
                method: 'POST',
                url: url,
                data: params,
                responseType: 'arraybuffer'
            }).success(function(data, status, headers) {
                headers = headers();

                var filename = headers['x-filename'];
                var contentType = headers['content-type'];

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], {
                        type: contentType
                    });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function(data) {
                console.log(data);
            });
        };

        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("OfferListController", {
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
                contentType: 'orders',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: this.sort
            };

            if (module === 'offer')
                Orders.offer.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.offers = data.data;
                    $scope.totalAll = data.totalAll;

                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
            else if (module === 'offersupplier')
                Orders.offerSupplier.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.offers = data.data;
                    $scope.totalAll = data.totalAll;

                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
        };

    }
]);

MetronicApp.controller('OrderListController', ['$scope', '$rootScope', '$http', '$modal', '$filter', '$timeout', 'superCache', 'Orders',
    function($scope, $rootScope, $http, $modal, $filter, $timeout, superCache, Orders) {
        $scope.grid = {};

        $scope.dict = {};
        $scope.search = {
            ref: {
                value: ""
            },
            ref_client: {
                value: ""
            },
            entity: {
                value: [],
            },
            supplier: {
                value: []
            },
            salesPerson: {
                value: []
            },
            Status: {
                value: ["NEW"]
            },
            allocationStatus: {
                value: []
            },
            fulfilledStatus: {
                value: []
            },
            shippingStatus: {
                value: []
            },
            datedl: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
            datec: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
        };
        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };
        $scope.sort = {
            'datedl': -1
        };

        if (typeof superCache.get("OrderListController") !== "undefined") {
            $scope.page = superCache.get("OrderListController").page;
            $scope.search = superCache.get("OrderListController").search;
            $scope.sort = superCache.get("OrderListController").sort;
        }

        /*$scope.loadAutocomplete = function(query, url) {
            return $http({
                method: 'POST',
                url: url,
                data: {
                    take: 50, // limit
                    entity: $rootScope.entity,
                    filter: {
                        logic: 'and',
                        filters: [{
                            value: query
                        }]
                    }
                }
            });
        };*/

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('order') < 0)
                return;

            $scope.find();
        });

        var module = $rootScope.$state.current.name.split('.')[0];
        $scope.module = function(themodule) {
            if (!themodule)
                return module;

            return module === themodule;
        };

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.orders.length; i++)
                if (this.checkAll)
                    this.grid[$scope.orders[i]._id] = true;
        }

        $scope.$dict = {
            status: [{
                    id: "ALL",
                    name: "Complet"
                },
                {
                    id: "NOA",
                    name: "Partiel"
                },
                {
                    id: "NOT",
                    name: "Aucun"
                },
            ]
        };

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_order_status", "fk_paiement"];
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

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            $scope.find();
        });

        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("OrderListController", {
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
                contentType: 'order',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: this.sort
            };

            if (module === 'order')
                Orders.order.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.orders = data.data;
                    $scope.totalAll = data.totalAll;
                    //console.log("query", data);
                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
            else if (module === 'ordersupplier')
                Orders.orderSupplier.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.orders = data.data;
                    $scope.totalAll = data.totalAll;
                    console.log("query", data);

                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
        };

        $scope.createBills = function() {
            //return console.log($scope.grid);
            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            if (grid)
                $http({
                    method: 'POST',
                    url: '/erp/api/order/billing',
                    data: {
                        id: grid
                    }
                }).success(function(data, status) {
                    if (status == 200) {
                        $rootScope.$state.go("bill.list");
                    }
                });

        };

        $scope.createDeliveries = function() {
            //return console.log($scope.grid);
            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                Orders.order.get({
                    Id: key
                }, function(object) {
                    if (!object)
                        return;

                    if (object.Status !== 'VALIDATED')
                        return;

                    object.Status = "PROCESSING";
                    object.$update(function(response) {});
                });
            }, grid);
        };
    }
]);

MetronicApp.controller('DeliveryListController', ['$scope', '$rootScope', '$http', '$modal', '$filter', '$timeout', 'superCache', 'Orders',
    function($scope, $rootScope, $http, $modal, $filter, $timeout, superCache, Orders) {
        $scope.$dict = {};
        $scope.search = {
            ref: {
                value: ""
            },
            ref_client: {
                value: ""
            },
            entity: {
                value: [],
            },
            supplier: {
                value: []
            },
            salesPerson: {
                value: []
            },
            Status: {
                value: ["NEW"]
            },
            warehouse: {
                value: []
            },
            datedl: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
            datec: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
        };

        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };

        $scope.sort = {
            'datedl': 1
        };


        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];

        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        if (typeof superCache.get("DeliveryListController") !== "undefined") {
            $scope.page = superCache.get("DeliveryListController").page;
            $scope.search = superCache.get("DeliveryListController").search;
            $scope.sort = superCache.get("DeliveryListController").sort;
        }

        $scope.$dict = {};
        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('delivery') < 0)
                return;

            $scope.find();
        });

        var module = $rootScope.$state.current.name.split('.')[0];
        $scope.module = function(themodule) {
            if (!themodule)
                return module;

            return module === themodule;
        };

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        };

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.orders.length; i++)
                if (this.checkAll)
                    this.grid[$scope.orders[i]._id] = true;
        };

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_order_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];

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

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
            });

            $http({
                method: 'GET',
                url: '/erp/api/product/warehouse/select'

            }).success(function(data, status) {
                $scope.$dict.warehouse = data.data;

                $scope.search.warehouse.value[0] = data.data[0]._id;
                //console.log(data);
                $scope.find();
            });

            //$scope.find();
        });

        // Init ng-include
        $scope.$on('$includeContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_order_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];

            $http({
                method: 'GET',
                url: '/erp/api/dict',
                params: {
                    dictName: dict
                }
            }).success(function(data, status) {
                $scope.dict = data;
            });
        });

        $scope.ngIncludeInit = function(params, length) {
            $scope.params = params;
        };

        $scope.openUrl = function(url, param) {
            var params = {};

            if (!params.entity)
                params.entity = $rootScope.entity;

            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            params.id = grid;

            if (grid.length)
                $http({
                    method: 'POST',
                    url: url,
                    data: params,
                    responseType: 'arraybuffer'
                }).success(function(data, status, headers) {
                    headers = headers();

                    var filename = headers['x-filename'];
                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    try {
                        var blob = new Blob([data], {
                            type: contentType
                        });
                        var url = window.URL.createObjectURL(blob);

                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", filename);

                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                        console.log(ex);
                    }
                }).error(function(data) {
                    console.log(data);
                });
        };

        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("DeliveryListController", {
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
                contentType: 'delivery',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: this.sort
            };

            console.log("query", query);
            if (module === 'delivery')
                Orders.delivery.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.deliveries = data.data;
                    $scope.totalAll = data.totalAll;
                    console.log("delivery", data);
                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
            else if (module === 'deliverysupplier')
                Orders.deliverySupplier.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.deliveries = data.data;
                    $scope.totalAll = data.totalAll;
                    console.log("deliverysupplier", data);
                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
        };

        $scope.changeStatus = function(Status, id) {
            // ChangeStatus multi-deliveries
            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            var localgrid = [];
            if (grid)
                angular.forEach(grid, function(value) {
                    Orders.delivery.get({
                        Id: value
                    }, function(object) {
                        if (!object)
                            return;

                        if (object.Status !== 'DRAFT')
                            return;

                        object.Status = "VALIDATED";
                        object.$update(function(response) {});
                    });
                }, localgrid);

            $scope.find();
        };
    }
]);

MetronicApp.controller('BillListController', ['$scope', '$rootScope', '$http', '$window', '$filter', '$timeout', 'superCache', 'Orders',
    function($scope, $rootScope, $http, $window, $filter, $timeout, superCache, Orders) {

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.editable = false;
        $scope.dict = {};
        $scope.$dict = {};

        $scope.search = {
            ref: {
                value: ""
            },
            ref_client: {
                value: ""
            },
            entity: {
                value: [],
            },
            supplier: {
                value: []
            },
            salesPerson: {
                value: []
            },
            Status: {
                value: []
            },
            dater: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
            datec: {
                value: {
                    start: moment().startOf('year').toDate(),
                    end: moment().endOf('year').toDate()
                }
            },
        };
        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };
        $scope.sort = {
            'ID': -1
        };

        if (typeof superCache.get("BillListController") !== "undefined") {
            $scope.page = superCache.get("BillListController").page;
            $scope.search = superCache.get("BillListController").search;
            $scope.sort = superCache.get("BillListController").sort;
        }

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('bill') < 0)
                return;

            $scope.find();
        });

        $scope.forSales = $rootScope.$stateParams.forSales == 0 ? 0 : 1;

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.orders.length; i++)
                if (this.checkAll)
                    this.grid[$scope.orders[i]._id] = true;
        }

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_bill_status", "fk_input_reason", "fk_paiement", "fk_bill_type", "fk_transport", "fk_payment_term", "fk_tva"];

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

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            $scope.find();
        });

        // Init ng-include
        $scope.$on('$includeContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            var dict = ["fk_bill_status", "fk_input_reason", "fk_paiement", "fk_bill_type", "fk_transport", "fk_payment_term", "fk_tva"];

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
            if (params.supplier)
                $scope.search.supplier.value = [params.supplier];

            $scope.hide_supplier = true;
            $scope.forSales = params.forSales == 0 ? 0 : 1;

            $scope.find();
        };

        $scope.openUrl = function(url, param) {
            if (!grid)
                return;

            var params = {};

            if (!params.entity)
                params.entity = $rootScope.entity;

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            params.id = grid;

            $http({
                method: 'POST',
                url: url,
                data: params,
                responseType: 'arraybuffer'
            }).success(function(data, status, headers) {
                headers = headers();

                var filename = headers['x-filename'];
                var contentType = headers['content-type'];

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], {
                        type: contentType
                    });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            }).error(function(data) {
                console.log(data);
            });
        };

        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("BillListController", {
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
                contentType: 'invoice',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: $scope.sort
            };

            if ($scope.forSales)
                Orders.bill.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.orders = data.data;
                    $scope.totalAll = data.totalAll;
                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
            else
                Orders.billSupplier.query(query, function(data, status) {
                    $scope.page.total = data.total;
                    $scope.orders = data.data;
                    $scope.totalAll = data.totalAll;

                    $timeout(function() {
                        Metronic.unblockUI('.waiting');
                    }, 0);
                });
        };

        $scope.validateBills = function() {
            //return console.log($scope.grid);
            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            if (grid)
                $http({
                    method: 'POST',
                    url: '/erp/api/bill/validate',
                    data: {
                        id: grid
                    }
                }).success(function(data, status) {
                    if (status == 200) {
                        $scope.find();
                    }
                });
        };


        $scope.exportAccounting = function() {
            var grid = [];

            angular.forEach($scope.grid, function(value, key) {
                if (value == true)
                    this.push(key);
            }, grid);

            if (grid)
                return $http({
                    method: 'PUT',
                    url: '/erp/api/bill/accounting',
                    data: {
                        id: grid
                    }
                }).success(function(data, status) {
                    if (status === 200)
                        $scope.find();
                });
        };

        $scope.filterOptionsPayment = {
            filterText: "",
            useExternalFilter: false
        };

    }
]);

/*MetronicApp.controller('DeliveryCreateController', ['$scope', '$rootScope', '$http', '$modalInstance', 'Orders', 'object', function($scope, $rootScope, $http, $modalInstance, Orders, object) {

    $scope.order = object.order;

    for (var i = 0; i < $scope.order.deliveries.length; i++)
        $scope.order.deliveries[i].qty_dl = $scope.order.deliveries[i].orderQty - $scope.order.deliveries[i].deliveryQty;

    $scope.sum = function() {
        $scope.total = 0;
        $scope.weight = 0;
        for (var i = 0; i < $scope.order.deliveries.length; i++) {
            $scope.total += $scope.order.deliveries[i].qty_dl;
            $scope.weight += $scope.order.deliveries[i].qty_dl * $scope.order.deliveries[i].product.weight;
        }
    };

    function calculHT(line) {
        if (line.qty) {
            line.total_ht = round(line.qty * (line.pu_ht * (1 - (line.discount / 100))), 2);
            //line.total_tva = line.total_ht * line.tva_tx / 100;
        } else {
            line.total_ht = 0;
            //line.total_tva = 0;
        }
    }

    $scope.createDelivery = function() {
        var delivery = new Orders.delivery(object.order);

        delivery.order = delivery._id;
        delete delivery._id;
        delete delivery.Status;
        delete delivery.latex;
        delete delivery.datec;
        delete delivery.history;
        //delete delivery.datel;
        delete delivery.createdAt;
        delete delivery.updatedAt;
        delete delivery.ref;

        delivery.createdBy = $rootScope.login._id;
        delivery.editedBy = $rootScope.login._id;
        //delete delivery.notes;

        delivery.contacts = _.pluck(delivery.contacts, '_id');

        //console.log(delivery.bl);

        //Copy first address BL

        delivery.lines = [];
        var cpt = 0;

        function save(line) {
            cpt--;

            calculHT(line);
            delivery.lines.push(line);

            if (cpt > 0)
                return;

            //console.log(delivery);

            delivery.$save(function(response) {
                //console.log(response);
                $modalInstance.close(response);
            });
        };

        function addLine(deliveryLine) {
            var line = {
                type: 'product', //Used for subtotal
                qty: deliveryLine.qty_dl,
                pu_ht: 0,
                product: deliveryLine.product,
                description: deliveryLine.description,
                refProductSupplier: deliveryLine.refProductSupplier.join(','),
                total_taxes: [],
                discount: 0
            };

            if (line.qty && line.product && line.product._id && !line.priceSpecific)
                $http.post('/erp/api/product/price', {
                    priceLists: object.priceList._id,
                    qty: line.qty,
                    product: line.product._id
                }).then(function(res) {
                    console.log(res.data);
                    line.pu_ht = res.data.pu_ht;
                    if (res.data.discount)
                        line.discount = res.data.discount;

                    //return res.data;

                    save(line);
                });
            else
                save(line);
        }

        for (var j = 0; j < delivery.deliveries.length; j++) {
            if (delivery.deliveries[j].qty_dl == 0)
                continue;

            cpt++;

            addLine(delivery.deliveries[j]);


            //console.log(line, object);
        }
        return;
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };


}]);*/

MetronicApp.controller('StockReturnListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout', 'superCache', 'Orders',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout, superCache, Orders) {

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.dict = {};
        $scope.$dict = {};

        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];
        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.search = {

        };

        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };
        $scope.sort = {
            'ID': -1
        };

        if (typeof superCache.get("StockReturnListController") !== "undefined") {
            $scope.page = superCache.get("StockReturnListController").page;
            $scope.search = superCache.get("StockReturnListController").search;
            $scope.sort = superCache.get("StockReturnListController").sort;
        }

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('bill') < 0)
                return;

            $scope.find();
        });

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.orders.length; i++)
                if (this.checkAll)
                    this.grid[$scope.orders[i]._id] = true;
        }

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_delivery_status", "fk_payment_term"];
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

            $http({
                method: 'GET',
                url: '/erp/api/product/warehouse/select'

            }).success(function(data, status) {
                $scope.$dict.warehouse = data.data;
                //console.log(data);
            });

            initDatatable();

        });

        $scope.showStatus = function(idx, dict) {
            if (!($scope.dict[dict] && $scope.delivery[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.delivery[idx]
            });
            return ($scope.delivery[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        $scope.find = function(clear) {
            if (clear)
                $scope.status_id = null;
            var url = getUrl();
            grid.resetFilter(url);
        };

        function getUrl() {
            return "/erp/api/delivery/dt" + "?stockReturn=true&Status=" + $scope.status_id;
        }

        function initDatatable() {

            grid.init({
                src: $("#stockreturnList"),
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
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                            data: 'bool'
                        }, {
                            "data": "ID"
                        }, {
                            "data": "supplier",
                            defaultContent: ""
                        }, {
                            "data": "order",
                            defaultContent: ""
                        }, {
                            "data": "status.receivedAt",
                            defaultContent: ""
                        },
                        {
                            "data": "qty",
                            defaultContent: ""
                        }, {
                            "data": "Status"
                        }, {
                            "data": "entity",
                            defaultContent: ""
                        }, {
                            "data": "datec",
                            defaultContent: ""
                        }
                    ]
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
        };
    }
]);

MetronicApp.controller('OrdersFabListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout) {

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.dict = {};

        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];
        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        $scope.$on('websocket', function(e, type, data) {
            if (type !== 'refresh')
                return;

            //console.log(data);
            //console.log(type);

            if (!data || !data.data || !data.data.route || data.data.route.indexOf('orderFab') < 0)
                return;

            $scope.find();
        });

        $scope.$dict = {};

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_delivery_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];
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

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            initDatatable();
        });

        $scope.showStatus = function(idx, dict) {
            if (!($scope.dict[dict] && $scope.delivery[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.delivery[idx]
            });
            return ($scope.delivery[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        function getUrl() {
            return "/erp/api/ordersfab/dt" + "?Status=" + $scope.status_id;
        }

        function initDatatable() {

            grid.init({
                src: $("#ordersFabList"),
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
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        "data": "ID"
                    }, {
                        "data": "datedl",
                        defaultContent: ""
                    }, {
                        "data": "entity",
                        defaultContent: ""
                    }, {
                        "data": "datec",
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
        };



        $scope.find = function(clear) {
            if (clear)
                $scope.status_id = null;
            var url = getUrl();
            grid.resetFilter(url);
        };
    }
]);