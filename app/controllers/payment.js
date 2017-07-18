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
/* jshint multistr: true */

MetronicApp.controller('PaymentController', ['$scope', '$rootScope', '$http', '$filter', '$timeout', 'Payments', 'Bills', 'BillsSupplier', 'Societes', 'Banks', function($scope, $rootScope, $http, $filter, $timeout, Payments, Bills, BillsSupplier, Societes, Banks) {

    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.editable = false;

    $scope.payment = {
        entity: $rootScope.login.entity,
        datec: new Date(),
        penality: 0,
        differential: 0,
        bills: [],
        bills_supplier: [],
        societe: {}
    };

    $scope.banks = [];

    $scope.balance = 0;

    $scope.dict = {};

    $scope.types = [{ name: "En cours", id: "WAIT" }, { name: "Toutes", id: "ALL" }];

    $scope.type = { name: "En cours", id: "WAIT" };

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_paiement", "fk_bank"];

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

        if ($rootScope.$state.current.name === 'payment.create') {
            if ($rootScope.$stateParams.entity)
                $scope.payment.entity = $rootScope.$stateParams.entity;

            $scope.loadBank();

            if ($rootScope.$stateParams.societe)
                Societes.get({
                    Id: $rootScope.$stateParams.societe
                }, function(societe) {
                    $scope.payment.societe = {
                        id: societe._id,
                        name: societe.name
                    };

                    $scope.find(societe);
                });
        } else
            $scope.loadBank();
        //initDatatable();

    });

    // Init ng-include
    $scope.$on('$includeContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_paiement", "fk_bank"];

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

        if ($rootScope.$state.current.name === 'bill.show' || $rootScope.$state.current.name === 'billSupplier.show')
            $scope.find($rootScope.$stateParams.id);

    });

    $scope.loadBank = function() {
        if (!$scope.payment || !$scope.payment.entity)
            return;

        Banks.query({
            entity: $scope.payment.entity
        }, function(banks) {
            //console.log(banks);
            $scope.banks = banks;
        });
    };

    $scope.ngIncludeInit = function(params, length) {
        $scope.params = params;
        initDatatable(params, length);
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.create = function() {
        var payment = new Payments(this.payment);
        payment.$save(function(response) {
            $rootScope.$state.go("payment.create", { societeId: $scope.payment.societe.id }, { reload: true });
        });
    };

    var round = function(value, decimals) {
        if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
            return 0;
        return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
    };

    $scope.updateBalance = function() {
        var balance = 0;

        // Attention logique comptable inversee pour la banque
        if ($scope.payment.amount > 0 && $scope.payment.mode)
            if ($scope.payment.mode === "Receipt")
                balance -= $scope.payment.amount;
            else
                balance += $scope.payment.amount;

        for (var i = 0, len = $scope.payment.bills.length; i < len; i++) {
            if ($scope.payment.bills[i].payment)
                balance += $scope.payment.bills[i].payment;
        }

        for (var i = 0, len = $scope.payment.bills_supplier.length; i < len; i++) {
            if ($scope.payment.bills_supplier[i].payment)
                balance -= $scope.payment.bills_supplier[i].payment;
        }

        balance += $scope.payment.penality;
        balance += $scope.payment.differential;

        $scope.balance = round(balance, 2);
    };

    $scope.updateLabel = function() {
        $scope.payment.libelleAccounting = "";

        if ($scope.payment.mode_reglement_code)
            $scope.payment.libelleAccounting += $scope.payment.mode_reglement_code + " ";

        $scope.payment.libelleAccounting += $scope.payment.societe.name;

        return true;
    };


    function getUrl(params) {

        if (!params)
            params = {};

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

    $scope.find = function(data) {
        var url;
        //console.log(this.status_id);
        //console.log(data);

        var id;

        if (typeof data === 'object') {
            if (data.id)
                id = data.id;
            else
                id = data._id;
        }

        if ($rootScope.$state.current.name === 'payment.createFrom' || $rootScope.$state.current.name === 'payment.create') {
            Bills.query({ "client.id": id, "query": "WAIT" }, function(bills) {
                $scope.payment.bills = bills;
                //console.log(bills);

                $scope.updateLabel();
            });

            BillsSupplier.query({ "supplier.id": id, "query": "WAIT" }, function(bills) {
                $scope.payment.bills_supplier = bills;
                //console.log(bills);

                $scope.updateLabel();
            });

        }

        if ($rootScope.$state.current.name === 'bill.show') {
            $http({
                method: 'GET',
                url: '/erp/api/payment/',
                params: {
                    find: {
                        "meta.bills.billId": data,
                        voided: false
                    }
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.entries = data;
            });
        }

        if ($rootScope.$state.current.name === 'billSupplier.show') {
            $http({
                method: 'GET',
                url: '/erp/api/payment/',
                params: {
                    find: {
                        "meta.billsSupplier.billSupplierId": data,
                        voided: false
                    }
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.entries = data;
            });
        }

        return true;
    };

}]);