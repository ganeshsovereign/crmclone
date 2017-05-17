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
MetronicApp.controller('OrderController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout', 'Orders',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout, Orders) {

        $scope.backTo = 'order.list';

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.order = {
            entity: $rootScope.login.entity,
            billing: {},
            bl: [{}],
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

        $scope.create = function() {
            var order = new Orders(this.order);
            order.$save(function(response) {
                $rootScope.$state.go("order.show", { id: response._id });
            });
        };
        $scope.remove = function(order) {
            order.$remove();
            $rootScope.$state.go("order.list");
        };
        $scope.update = function(callback) {
            var order = $scope.order;

            for (var i = order.lines.length; i--;) {
                // actually delete lines
                if (order.lines[i].isDeleted) {
                    order.lines.splice(i, 1);
                }
            }
            order.$update(function(response) {
                //$location.path('societe/' + societe._id);
                //pageTitle.setTitle('Commande client ' + order.ref);

                /*if (response.lines) {
                    for (var i = 0; i < response.lines.length; i++) {
                        $scope.order.lines[i].idLine = i;
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
            $scope.order.$clone(function(response) {
                $rootScope.$state.go('order.show', {
                    id: response._id
                });
                //$location.path("orders/" + response._id);
            });
        };

        $scope.findOne = function() {
            Orders.get({
                Id: $rootScope.$stateParams.id
            }, function(order) {
                $scope.order = order;
                console.log(order);
                //on utilise idLine pour definir la ligne produit que nous voulons supprimer
                for (var i = 0; i < $scope.order.lines.length; i++) {
                    $scope.order.lines[i].idLine = i;
                }
                if (order.Status == "DRAFT" || order.Status == "NEW" || order.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;
                $http({
                    method: 'GET',
                    url: 'api/ticket',
                    params: {
                        find: {
                            "linked.id": order._id
                        },
                        fields: "name ref updatedAt percentage Status task"
                    }
                }).success(function(data, status) {
                    if (status === 200)
                        $scope.tickets = data;
                    $scope.countTicket = $scope.tickets.length;
                });
                //pageTitle.setTitle('Commande client ' + $scope.order.ref);
            }, function(err) {
                if (err.status === 401)
                    $location.path("401.html");
            });
        };

        $scope.sendEmail = function() {
            $http.post('/erp/api/sendEmail', {
                to: this.order.contacts,
                data: {
                    title: 'Votre devis ' + this.order.ref_client || "",
                    subtitle: this.order.client.name + (this.order.ref_client ? " - Reference " + this.order.ref_client : ""),
                    message: 'Veuillez trouver ci-joint la proposition commerciale. Cliquer sur le bouton ci-apres pour le telecharger.',
                    url: '/erp/api/order/download/' + this.order._id,
                    entity: this.order.entity
                },
                ModelEmail: 'email_PDF'
            }).then(function(res) {
                //console.log(res);
                if (res.status == 200) {

                    $scope.order.history.push({
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
            if (this.editableOrder)
                this.editableOrder.$save();
            // Only company name change
            if (typeof data !== 'object') {
                $scope.order.billing.societe.name = data;
                $scope.order.bl[0].name = data;
                return true;
            }

            console.log(data);

            $scope.order.address = data.address;

            if (data.salesPurchases.isGeneric)
                $scope.order.address.name = data.fullName;

            $scope.order.cond_reglement_code = data.salesPurchases.cond_reglement;
            $scope.order.mode_reglement_code = data.salesPurchases.mode_reglement;
            //$scope.order.priceList = data.salesPurchases.priceList;
            $scope.order.salesPerson = data.salesPurchases.salesPerson;
            $scope.order.salesTeam = data.salesPurchases.salesTeam;


            // Billing address
            $scope.order.billing = data.salesPurchases.cptBilling;

            $scope.order.shippingAddress = data.shippingAddress[0];

            $scope.order.addresses = data.shippingAddress;

            if (data.deliveryAddressId)
                for (var i = 0; i < data.shippingAddress.length; i++)
                    if (data.deliveryAddressId == data.shippingAddress[i]._id) {
                        $scope.order.shippingAddress = data.shippingAddress[i];
                        break;
                    }
        };

        $scope.updateBillingAddress = function() {
            if ($scope.order.billing.sameBL0) {
                $scope.order.billing.name = $scope.order.bl[0].name;
                $scope.order.billing.address = $scope.order.bl[0].address;
                $scope.order.billing.zip = $scope.order.bl[0].zip;
                $scope.order.billing.town = $scope.order.bl[0].town;
            }
            return true;
        };
        $scope.createOrder = function() {
            // CLOSE ORDER
            $scope.order.Status = "SIGNED";
            $scope.update();
            $scope.order.$order(function(response) {
                $rootScope.$state.go("order.show", { id: response._id });
            });
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


        $scope.changeStatus = function(Status) {
            $scope.order.Status = Status;
            $scope.update();
        };


        /**
         * Get fileType for icon
         */
        $scope.getFileTypes = function() {
            $http({
                method: 'GET',
                url: 'dict/filesIcons'
            }).
            success(function(data, status) {
                if (status == 200) {
                    iconsFilesList = data;
                }
            });
        };


    }
]);