/**
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
**/


"use strict";

/* global angular: true */
MetronicApp.controller('OrdersController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout', 'Orders',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout, Orders) {

        var current = $rootScope.$state.current.name.split('.');
        console.log(current);

        $scope.module = current[0];

        $scope.backTo = 'dashboard';

        if (current.length == 2 && current[1] !== 'list')
            return $rootScope.$state.go($scope.module + '.show.detail', { id: $rootScope.$stateParams.id });

        switch (current[0]) {
            case 'offer':
                var Object = Orders.offer;
                $scope.backTo = 'offer.list';
                break;
            case 'order':
                var Object = Orders.order;
                $scope.backTo = 'order.list';
                break;
            case 'delivery':
                var Object = Orders.delivery;
                $scope.backTo = 'delivery.list';
                break;
            case 'bill':
                var Object = Orders.bill;
                $scope.backTo = 'bill.list';
                break;
        }


        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.object = {
            entity: $rootScope.login.entity,
            billing: {},
            address: {},
            lines: []
        };
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

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.$dict = {};

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_offer_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];
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

            $scope.findOne();
        });

        $scope.showStatus = function(idx, dict) {
            if (!($scope.dict[dict] && $scope.object[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.object[idx]
            });
            return ($scope.object[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        $scope.create = function() {
            var object = new Object(this.object);
            object.$save(function(response) {
                $rootScope.$state.go("offer.show", { id: response._id });
            });
        };
        $scope.remove = function(object) {
            object.$remove();
            $rootScope.$state.go("offer.list");
        };
        $scope.update = function(callback) {
            var object = $scope.object;

            for (var i = object.lines.length; i--;) {
                // actually delete lines
                if (object.lines[i].isDeleted) {
                    object.lines.splice(i, 1);
                }
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
                    callback(null, response);*/

                $scope.findOne();
            });
        };
        $scope.clone = function() {
            $scope.object.$clone(function(response) {
                $rootScope.$state.go('offer.show', {
                    id: response._id
                });
            });
        };

        $scope.findOne = function() {
            if (!$rootScope.$stateParams.id) {
                $scope.editable = true;
                return;
            }

            Object.get({
                Id: $rootScope.$stateParams.id
            }, function(object) {
                $scope.object = object;
                console.log(object);
                //on utilise idLine pour definir la ligne produit que nous voulons supprimer
                for (var i = 0; i < $scope.object.lines.length; i++) {
                    $scope.object.lines[i].idLine = i;
                }
                if (object.Status == "DRAFT" || object.Status == "NEW" || object.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;
            }, function(err) {
                if (err.status === 401)
                    $location.path("401.html");
            });
        };

        $scope.sendEmail = function() {
            $http.post('/erp/api/sendEmail', {
                to: this.object.contacts,
                data: {
                    title: 'Votre devis ' + this.object.ref_client || "",
                    subtitle: this.object.client.name + (this.object.ref_client ? " - Reference " + this.object.ref_client : ""),
                    message: 'Veuillez trouver ci-joint la proposition commerciale. Cliquer sur le bouton ci-apres pour le telecharger.',
                    url: '/erp/api/object/download/' + this.object._id,
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
                        author: {
                            id: $rootScope.login._id,
                            name: $rootScope.login.name
                        }
                    });

                    return $scope.update();
                }
                //return res.data;
            });
        };

        $scope.updateAddress = function(data) {
            console.log(data);

            $scope.object.address = data.address;

            if (data.salesPurchases.isGeneric)
                $scope.object.address.name = data.fullName;

            $scope.object.cond_reglement_code = data.salesPurchases.cond_reglement;
            $scope.object.mode_reglement_code = data.salesPurchases.mode_reglement;
            //$scope.object.priceList = data.salesPurchases.priceList;
            $scope.object.salesPerson = data.salesPurchases.salesPerson;
            $scope.object.salesTeam = data.salesPurchases.salesTeam;


            // Billing address
            $scope.object.billing = data.salesPurchases.cptBilling;

            $scope.object.shippingAddress = data.shippingAddress[0];

            $scope.object.addresses = data.shippingAddress;

            if (data.deliveryAddressId)
                for (var i = 0; i < data.shippingAddress.length; i++)
                    if (data.deliveryAddressId == data.shippingAddress[i]._id) {
                        $scope.object.shippingAddress = data.shippingAddress[i];
                        break;
                    }
        };

        $scope.createOrder = function() {
            // CLOSE ORDER
            $scope.object.Status = "SIGNED";
            $scope.update();
            $scope.object.$order(function(response) {
                $rootScope.$state.go("order.show", { id: response._id });
            });
        };

        $scope.changeStatus = function(Status) {
            $scope.offer.Status = Status;
            $scope.update();
        };
    }
]);

MetronicApp.controller('OfferListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout',
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

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.$dict = {};

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_offer_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];
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
            if (!($scope.dict[dict] && $scope.offer[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.offer[idx]
            });
            return ($scope.offer[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        function initDatatable() {

            grid.init({
                src: $("#offerList"),
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
                        "url": "/erp/api/offer/dt" // ajax source
                    },
                    "order": [
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        "data": "ref"
                    }, {
                        "data": "supplier",
                        defaultContent: ""
                    }, {
                        "data": "ref_client",
                        defaultContent: ""
                    }, {
                        "data": "date_livraison",
                        defaultContent: ""
                    }, {
                        "data": "total_ht",
                        defaultContent: ""
                    }, {
                        "data": "Status"
                    }, {
                        "data": "entity",
                        defaultContent: ""
                    }, {
                        "data": "datec",
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
            grid.resetFilter();
        };
    }
]);

MetronicApp.controller('OrderListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout',
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

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.$dict = {};

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
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
                //console.log(data);
            });

            initDatatable();
        });

        $scope.showStatus = function(idx, dict) {
            if (!($scope.dict[dict] && $scope.order[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.order[idx]
            });
            return ($scope.order[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        function initDatatable() {

            grid.init({
                src: $("#orderList"),
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
                        "url": "/erp/api/order/dt" // ajax source
                    },
                    "order": [
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        "data": "ref"
                    }, {
                        "data": "supplier",
                        defaultContent: ""
                    }, {
                        "data": "ref_client",
                        defaultContent: ""
                    }, {
                        "data": "date_livraison",
                        defaultContent: ""
                    }, {
                        "data": "total_ht",
                        defaultContent: ""
                    }, {
                        "data": "Status"
                    }, {
                        "data": "entity",
                        defaultContent: ""
                    }, {
                        "data": "datec",
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
            grid.resetFilter();
        };
    }
]);

MetronicApp.controller('DeliveryListController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout',
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

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.$dict = {};

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
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

        function initDatatable() {

            grid.init({
                src: $("#deliveryList"),
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
                        "url": "/erp/api/delivery/dt" // ajax source
                    },
                    "order": [
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        "data": "ref"
                    }, {
                        "data": "supplier",
                        defaultContent: ""
                    }, {
                        "data": "ref_client",
                        defaultContent: ""
                    }, {
                        "data": "date_livraison",
                        defaultContent: ""
                    }, {
                        "data": "total_ht",
                        defaultContent: ""
                    }, {
                        "data": "Status"
                    }, {
                        "data": "entity",
                        defaultContent: ""
                    }, {
                        "data": "datec",
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
            grid.resetFilter();
        };
    }
]);

MetronicApp.controller('BillListController', ['$scope', '$rootScope', '$http', '$window', '$filter', '$timeout',
    function($scope, $rootScope, $http, $window, $filter, $timeout) {

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.editable = false;

        $scope.dict = {};
        $scope.status_id = "LIST";

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
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

            initDatatable();

        });

        // Init ng-include
        $scope.$on('$includeContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = true;
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

        });

        $scope.ngIncludeInit = function(params, length) {
            $scope.params = params;
            initDatatable(params, length);
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.openUrl = function(url, param) {
            if (!grid)
                return;

            var params = {};

            if (!params.entity)
                params.entity = $rootScope.entity;

            params.id = grid.getSelectedRows();

            //$window.open($rootScope.buildUrl(url, params), '_blank');
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
                    var blob = new Blob([data], { type: contentType });
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

        function getUrl(params) {

            if (!params)
                params = {
                    status_id: $scope.status_id
                };

            if (!params.entity)
                params.entity = $rootScope.entity;

            var url = $rootScope.buildUrl('/erp/api/bill/dt', params); // Build URL with json parameter
            //console.log(url);
            return url;
        }

        function initDatatable(params, length) {

            grid.init({
                src: $("#billList"),
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
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        data: "ref"
                    }, {
                        data: "client.name",
                        defaultContent: "",
                        visible: (params && params['client.id'] ? false : true)
                    }, {
                        data: "ref_client",
                        defaultContent: ""
                    }, {
                        data: "datec",
                        defaultContent: ""
                    }, {
                        data: "dater",
                        defaultContent: ""
                    }, {
                        data: "commercial_id.name",
                        defaultContent: ""
                    }, {
                        data: "total_ttc",
                        defaultContent: ""
                    }, {
                        data: "Status"
                    }, {
                        data: "entity",
                        defaultContent: "",
                        visible: user.multiEntities
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
                url = getUrl({ status_id: this.status_id });

            grid.resetFilter(url);
        };


        $scope.exportAccounting = function(id) {
            if (!id && grid) {
                return $http({
                    method: 'PUT',
                    url: '/erp/api/bill/accounting',
                    data: {
                        id: grid.getSelectedRows()
                    }
                }).success(function(data, status) {
                    if (status === 200)
                        $scope.find();
                });
            }
            return $http({
                method: 'PUT',
                url: '/erp/api/bill/accounting',
                data: {
                    id: id //grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200 && id)
                    $scope.findOne();
                else
                    $scope.find();
            });
        };

        $scope.filterOptionsPayment = {
            filterText: "",
            useExternalFilter: false
        };

    }
]);