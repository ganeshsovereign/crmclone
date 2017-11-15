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

MetronicApp.controller('BankController', ['$rootScope', '$scope', '$http', '$filter', 'Banks', function($rootScope, $scope, $http, $filter, Banks) {

    $scope.completeInfos = false;
    $scope.banks = [];


    $scope.init = function() {

        var dict = ["fk_country", "fk_currencies", "fk_account_status", "fk_account_type", "fk_transaction_type"];

        $http({
            method: 'GET',
            url: '/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;

        });

        $http({
                method: 'GET',
                url: 'api/entity/select'
            })
            .success(function(data, status) {
                $scope.entities = data;
                $scope.entities.push({
                    id: "ALL",
                    name: "ALL"
                });
            });

    };

    $scope.find = function() {

        var params = {
            entity: Global.user.entity
        };

        Banks.query(params, function(banks) {
            console.log(banks);
            $scope.banks = banks;
            $scope.countBank = banks.length;
        });
    };

    $scope.filterOptionsBank = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.gridOptions = {
        data: 'banks',
        enableRowSelection: false,
        filterOptions: $scope.filterOptionsBank,
        enableColumnResize: true,
        i18n: 'fr',
        columnDefs: [{
                field: 'libelle',
                displayName: 'Comptes courants',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/bank/{{row.getProperty(\'_id\')}}" data-tooltip-options=\'{"position":"right"}\'><span class="icon-home"></span> {{row.getProperty(col.field)}}</a></div>'
            },
            {
                field: 'name_bank',
                displayName: 'Banque',
                width: '100px'
            },
            {
                field: 'account_number',
                displayName: 'Numero de compte',
                width: '140px'
            },
            {
                field: 'acc_type.name',
                displayName: 'Type',
                cellTemplate: '<div class="ngCellText align-center"><small class="tag {{row.getProperty(\'acc_type.css\')}} glossy">{{row.getProperty(col.field)}}</small></div>'
            },
            {
                field: 'acc_status.name',
                displayName: 'Etat',
                width: '80px',
                cellTemplate: '<div class="ngCellText align-center"><small class="tag {{row.getProperty(\'acc_status.css\')}} glossy">{{row.getProperty(col.field)}}</small></div>'
            },
            {
                field: 'balance',
                displayName: 'Solde',
                width: '80px',
                cellFilter: "currency:''"
            }
        ]
    };

    /*
     * NG-GRID for Transaction list
     */

    $scope.filterOptionsTransaction = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.toggle = false;

    $scope.gridOptionsTransactions = {
        data: 'transactions',
        enableRowSelection: false,
        filterOptions: $scope.filterOptionsTransaction,
        i18n: 'fr',
        showFooter: true,
        footerTemplate: '<div style="padding: 10px;">\n\
            <span class="right"><strong>Solde actuel : {{totalCurrentBalance | currency:bank.currency}}<strong></span><br>\n\
            <span class="right"><strong>Solde total : {{totalBalance | currency:bank.currency}}<strong></span>\n\
            </div>',
        footerRowHeight: 50,
        enableColumnResize: true,
        cellClass: 'cellToolTip',
        columnDefs: [{
                field: 'date_transaction',
                displayName: 'Date',
                cellFilter: "date:'dd-MM-yyyy'"
            },
            {
                field: 'value',
                displayName: 'Valeur',
                cellFilter: "date:'dd-MM-yyyy'"
            },
            {
                field: 'trans_type.name',
                displayName: 'type'
            },
            {
                field: 'description',
                displayName: 'Déscription'
            },
            {
                field: 'third_party.name',
                displayName: 'Tiers'
            },
            {
                field: 'debit',
                displayName: 'Debit',
                cellFilter: "currency:''"
            },
            {
                field: 'credit',
                displayName: 'Credit',
                cellFilter: "currency:''"
            },
            {
                field: 'balance',
                displayName: 'Solde',
                cellFilter: "currency:''"
            },
            {
                field: 'bank_statement',
                displayName: 'Relvé',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/module/bank/bankStatement.html?statement={{row.getProperty(\'bank_statement\')}}&account={{row.getProperty(\'bank.id\')}}">{{row.getProperty(col.field)}} </a>'
            },
            {
                field: '',
                displayName: 'Action',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip center button icon-pencil tiny" ng-click="findTransaction(row.getProperty(\'_id\'))" data-tooltip-options=\'{"position":"right"}\'> {{row.getProperty(col.field)}}</a></div>'
            }
        ]
    };
    $scope.isValidInfo = function(bank) {

        if (typeof bank.iban !== "undefined" && $scope.isValidIban(bank.iban) && typeof bank.country !== "undefined" && typeof bank.account_number !== "undefined")
            if (bank.country.length !== 0 && bank.account_number.length !== 0)
                return true;

        return false;

    };

    $scope.findOne = function() {

        Banks.get({
            Id: $routeParams.id
        }, function(bank) {
            $scope.bank = bank;
            pageTitle.setTitle('Fiche ' + $scope.bank.libelle);
            $scope.completeInfos = $scope.isValidInfo($scope.bank);

            $http({
                method: 'GET',
                url: '/api/transaction',
                params: {
                    find: {
                        "bank.id": bank._id
                    }
                }
            }).success(function(data, status) {

                $scope.RegenerateTransactions(data);
                $scope.countTransactions = data.length;
            });

        });

    };

    $scope.RegenerateTransactions = function(transactions) {

        $scope.transactions = transactions;

        //sorting transactions by date of transaction
        $scope.transactions.sort(function(a, b) {

            var dateA = new Date(a.date_transaction),
                dateB = new Date(b.date_transaction);
            return dateA - dateB;
        });

        //calculate balances
        for (var i = 0; i < transactions.length; i++) {

            if (i === 0)
                $scope.transactions[0].balance = (-1 * $scope.transactions[0].debit) + $scope.transactions[0].credit;
            else
                $scope.transactions[i].balance = (-1 * $scope.transactions[i].debit) + $scope.transactions[i].credit + $scope.transactions[i - 1].balance;
        }
        $scope.totalBalance = $scope.transactions[transactions.length - 1].balance;
        console.log($scope.transactions);
        //calculate current and total balance 
        var todayDate = new Date();
        $scope.totalCurrentBalance = 0;

        for (var i = 0; i < transactions.length; i++) {
            var dateTransaction = new Date($scope.transactions[i].date_transaction);

            if (dateTransaction < todayDate)
                $scope.totalCurrentBalance += (-1 * $scope.transactions[i].debit) + $scope.transactions[i].credit;
        }
    };

    $scope.update = function() {

        var bank = $scope.bank;

        bank.$update(function(response) {
            pageTitle.setTitle('Fiche ' + bank.libelle);
            $scope.completeInfos = $scope.isValidInfo($scope.bank);
        });
    };

    $scope.clientAutoComplete = function(val, field) {
        return $http.post('api/societe/autocomplete', {
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

    $scope.addNew = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/bank/create.html',
            controller: "BankCreateController",
            windowClass: "steps"
        });

        modalInstance.result.then(function(bank) {
            $scope.bank.push(bank);
            $scope.count++;
        }, function() {});
    };

    $scope.addNewTransaction = function() {
        var modalInstance = $modal.open({
            templateUrl: '/partials/bank/createTransaction.html',
            controller: "TransactionController",
            windowClass: "steps",
            resolve: {
                object: function() {
                    return {
                        bank: $scope.bank,
                        transaction_type: $scope.dict['fk_transaction_type'].values
                    };
                }
            }
        });

        modalInstance.result.then(function(transaction) {
            $scope.findOne();
        }, function() {});
    };

    $scope.isValidIban = function(value) {


        // remove spaces and to upper case
        var iban = value.replace(/ /g, "").toUpperCase(),
            ibancheckdigits = "",
            leadingZeroes = true,
            cRest = "",
            cOperator = "",
            countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

        if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
            return false;
        }

        // check the country code and find the country specific format
        countrycode = iban.substring(0, 2);
        bbancountrypatterns = {
            "AL": "\\d{8}[\\dA-Z]{16}",
            "AD": "\\d{8}[\\dA-Z]{12}",
            "AT": "\\d{16}",
            "AZ": "[\\dA-Z]{4}\\d{20}",
            "BE": "\\d{12}",
            "BH": "[A-Z]{4}[\\dA-Z]{14}",
            "BA": "\\d{16}",
            "BR": "\\d{23}[A-Z][\\dA-Z]",
            "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
            "CR": "\\d{17}",
            "HR": "\\d{17}",
            "CY": "\\d{8}[\\dA-Z]{16}",
            "CZ": "\\d{20}",
            "DK": "\\d{14}",
            "DO": "[A-Z]{4}\\d{20}",
            "EE": "\\d{16}",
            "FO": "\\d{14}",
            "FI": "\\d{14}",
            "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "GE": "[\\dA-Z]{2}\\d{16}",
            "DE": "\\d{18}",
            "GI": "[A-Z]{4}[\\dA-Z]{15}",
            "GR": "\\d{7}[\\dA-Z]{16}",
            "GL": "\\d{14}",
            "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
            "HU": "\\d{24}",
            "IS": "\\d{22}",
            "IE": "[\\dA-Z]{4}\\d{14}",
            "IL": "\\d{19}",
            "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "KZ": "\\d{3}[\\dA-Z]{13}",
            "KW": "[A-Z]{4}[\\dA-Z]{22}",
            "LV": "[A-Z]{4}[\\dA-Z]{13}",
            "LB": "\\d{4}[\\dA-Z]{20}",
            "LI": "\\d{5}[\\dA-Z]{12}",
            "LT": "\\d{16}",
            "LU": "\\d{3}[\\dA-Z]{13}",
            "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
            "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
            "MR": "\\d{23}",
            "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
            "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
            "MD": "[\\dA-Z]{2}\\d{18}",
            "ME": "\\d{18}",
            "NL": "[A-Z]{4}\\d{10}",
            "NO": "\\d{11}",
            "PK": "[\\dA-Z]{4}\\d{16}",
            "PS": "[\\dA-Z]{4}\\d{21}",
            "PL": "\\d{24}",
            "PT": "\\d{21}",
            "RO": "[A-Z]{4}[\\dA-Z]{16}",
            "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
            "SA": "\\d{2}[\\dA-Z]{18}",
            "RS": "\\d{18}",
            "SK": "\\d{20}",
            "SI": "\\d{15}",
            "ES": "\\d{20}",
            "SE": "\\d{20}",
            "CH": "\\d{5}[\\dA-Z]{12}",
            "TN": "\\d{20}",
            "TR": "\\d{5}[\\dA-Z]{17}",
            "AE": "\\d{3}\\d{16}",
            "GB": "[A-Z]{4}\\d{14}",
            "VG": "[\\dA-Z]{4}\\d{16}"
        };

        bbanpattern = bbancountrypatterns[countrycode];
        // As new countries will start using IBAN in the
        // future, we only check if the countrycode is known.
        // This prevents false negatives, while almost all
        // false positives introduced by this, will be caught
        // by the checksum validation below anyway.
        // Strict checking should return FALSE for unknown
        // countries.
        if (typeof bbanpattern !== "undefined") {
            ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
            if (!(ibanregexp.test(iban))) {
                return false; // invalid country specific format
            }
        }

        // now check the checksum, first convert to digits
        ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
        for (i = 0; i < ibancheck.length; i++) {
            charAt = ibancheck.charAt(i);
            if (charAt !== "0") {
                leadingZeroes = false;
            }
            if (!leadingZeroes) {
                ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
            }
        }

        // calculate the result of: ibancheckdigits % 97
        for (p = 0; p < ibancheckdigits.length; p++) {
            cChar = ibancheckdigits.charAt(p);
            cOperator = "" + cRest + "" + cChar;
            cRest = cOperator % 97;
        }
        return cRest === 1;
    };

    $scope.reconciliation = function(bank, transactions) {
        //            $routeParams.bank = $scope.bank._id;
        $rootScope.bank = bank;
        $rootScope.transactions = transactions;
        //$location.path("module/bank/rapprochement.html");
        $location.path('module/bank/rapprochement.html').search({
            bankId: bank._id
        });

    };

    $scope.findTransaction = function(id) {

        var modalInstance = $modal.open({
            templateUrl: '/partials/transaction/fiche.html',
            controller: "TransactionController",
            windowClass: "steps",
            resolve: {
                object: function() {
                    return {
                        transaction: id
                    };
                }
            }
        });
        modalInstance.result.then(function(transactions) {
            $scope.transactions.push(transactions);
            $scope.counttransactions++;
        }, function() {});
    };

}]);
MetronicApp.controller('BankCreateController', ['$scope', '$http', '$modalInstance', '$route', 'Global', '$location', 'Banks', function($scope, $http, $modalInstance, $route, Global, $location, Banks) {

    $scope.global = Global;

    $scope.active = 1;

    $scope.init = function() {

        $scope.bank = {};

        $scope.bank = {
            transaction: [{
                description: "Initial balance",
                credit: 0
            }],
            entity: Global.user.entity
        };

        var dict = ["fk_country", "fk_currencies", "fk_account_status", "fk_account_type"];

        $http({
            method: 'GET',
            url: '/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;

        });

    };

    $scope.isValidRef = function() {

        var ref = $scope.bank.ref;
        $scope.refFound = "";
        $scope.validRef = true;

        $http({
            method: 'GET',
            url: '/api/createBankAccount/uniqRef',
            params: {
                ref: ref
            }
        }).success(function(data, status) {

            if (data.ref) {
                $scope.refFound = data;

            }

        });
    };

    $scope.isValidLibelle = function() {

        var libelle = $scope.bank.libelle;
        $scope.libelleFound = "";
        $scope.validLibelle = true;

        $http({
            method: 'GET',
            url: '/api/createBankAccount/uniqLibelle',
            params: {
                libelle: libelle
            }
        }).success(function(data, status) {

            if (data.libelle) {
                $scope.libelleFound = data;

            }

        });
    };

    $scope.create = function() {

        var account = new Bank(this.bank);
        console.log(account);
        account.$save(function(response) {
            console.log(response);
            $modalInstance.close(response);
            $location.path("/bank/" + response._id);
        });
    };
}]);

MetronicApp.controller('ReconciliationController', ['$scope', '$rootScope', '$http', '$route', 'Global', '$location', 'Transaction', function($scope, $rootScope, $http, $route, Global, $location, Transaction) {

    $scope.reconciliation = {
        category: null
    };

    $scope.listReconciliedTrans = [];

    $scope.find = function() {

        $scope.listReconciliedTrans = [];
        $scope.checkedBox = false;

        var id = $location.search()['bankId'];

        $http({
            method: 'GET',
            url: '/api/bank/' + id,
            params: {}
        }).success(function(data, status) {
            $scope.bank = data;

            $http({
                method: 'GET',
                url: '/api/transaction/reconcile',
                params: {
                    find: {
                        "bank.id": $scope.bank._id
                    }
                }
            }).success(function(data, status) {
                $scope.transactions = data;
                $scope.count = data.length;

            });

            $http({
                method: 'GET',
                url: '/api/bankCategory',
                params: {}
            }).success(function(data, status) {
                $scope.category = data;
            });

        });
    };

    $scope.filterOptionsTransaction = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.toggle = false;

    $scope.gridOptionsTransactions = {
        data: 'transactions',
        filterOptions: $scope.filterOptionsTransaction,
        i18n: 'fr',
        enableColumnResize: true,
        showSelectionCheckbox: true,
        selectWithCheckboxOnly: true,
        beforeSelectionChange: function(row) {
            row.changed = true;
            return true;
        },
        afterSelectionChange: function(row, event) {
            if (row.changed) {
                if (typeof row.length === 'undefined') {
                    var index = $scope.listReconciliedTrans.indexOf(row.entity._id);
                    if (index > -1) {
                        $scope.listReconciliedTrans.splice(index, 1);
                    } else {
                        $scope.listReconciliedTrans.push(row.entity._id);
                    }
                } else {
                    if (event) {
                        $scope.listReconciliedTrans = [];
                        for (var i = 0; i < row.length; i++) {
                            $scope.listReconciliedTrans.push(row[i].entity._id);
                        }
                    } else {
                        $scope.listReconciliedTrans = [];
                    }
                }
            }
            row.changed = false;
        },
        plugins: [new ngGridSingleSelectionPlugin()],
        columnDefs: [{
                field: '_id',
                displayName: 'Code Transaction',
                visible: false
            },
            {
                field: 'date_transaction',
                displayName: 'Date',
                cellFilter: "date:'dd-MM-yyyy'"
            },
            {
                field: 'value',
                displayName: 'Valeur',
                cellFilter: "date:'dd-MM-yyyy'"
            },
            {
                field: 'trans_type.name',
                displayName: 'type'
            },
            {
                field: 'description',
                displayName: 'Déscription'
            },
            {
                field: 'third_party.name',
                width: "120px",
                displayName: 'Tiers'
            },
            {
                field: 'debit',
                displayName: 'Debit',
                width: "80px",
                cellFilter: "currency:''"
            },
            {
                field: 'credit',
                displayName: 'Credit',
                width: "80px",
                cellFilter: "currency:''"
            }
        ]
    };

    //listen for selected row event
    $scope.$on('ngGridEventRowSeleted', function(event, row) {
        $scope.selectedRow = row;
    });

    $scope.checkTransaction = function(id) {

        var index = $scope.listReconciliedTrans.indexOf(id);

        if (index < 0) {
            $scope.listReconciliedTrans.push(id);
        } else {
            $scope.listReconciliedTrans.splice(index, 1);
        }
    };

    $scope.reconcile = function() {
        var category = null;

        if ($scope.reconciliation.category) {
            category = {
                id: $scope.reconciliation.category._id,
                name: $scope.reconciliation.category.name
            };
        }

        if ($scope.listReconciliedTrans.length > 0) {
            $http({
                method: 'PUT',
                url: '/api/transaction/reconcile',
                params: {
                    ids: $scope.listReconciliedTrans,
                    bank_statement: $scope.bank_statement,
                    category: category
                }
            }).success(function(data, status) {

                $scope.find();
                $scope.reconciliation = {
                    category: null
                };
            });
        }

    };

    $scope.backFiche = function() {

        var id = $location.search()['bankId'];
        $location.path('/bank/' + id);
    };

    function ngGridSingleSelectionPlugin() {
        var self = this;
        self.lastSelectedRow = null;
        self.selectedRowItems = [];
        self.allRowItems = [];
        self.isAllRowSelected = false;
        self.grid = null;
        self.scope = null;
        self.init = function(scope, grid, services) {
            self.services = services;
            self.grid = grid;
            self.scope = scope;
            self.initNeddedProprties();
            // mousedown event on row selection
            grid.$viewport.on('mousedown', self.onRowMouseDown);
            // mousedown event on checkbox header selection
            grid.$headerContainer.on('mousedown', self.onHeaderMouseDown);
        };
        //init properties 
        self.initNeddedProprties = function() {
            self.grid.config.multiSelect = true;
            self.grid.config.showSelectionCheckbox = true;
            self.grid.config.selectWithCheckboxOnly = true;
        };
        self.onRowMouseDown = function(event) {
            // Get the closest row element from where we clicked.
            var targetRow = $(event.target).closest('.ngRow');
            // Get the scope from the row element
            var rowScope = angular.element(targetRow).scope();
            if (rowScope) {
                var row = rowScope.row;
                if (event.target.type !== 'checkbox') {
                    // if  select all rows checkbox was pressed
                    if (self.isAllRowSelected) {
                        self.selectedRowItems = self.grid.rowCache;
                    }
                    //set to false selected rows with checkbox
                    angular.forEach(self.selectedRowItems, function(rowItem) {
                        rowItem.selectionProvider.setSelection(rowItem, false);
                    });
                    self.selectedRowItems = [];
                    //set to false last selected row
                    if (self.lastSelectedRow) {
                        self.lastSelectedRow.selectionProvider.setSelection(self.lastSelectedRow, false);
                    }
                    if (!row.selected) {
                        row.selectionProvider.setSelection(row, true);
                        self.lastSelectedRow = row;
                        self.scope.$emit('ngGridEventRowSeleted', row);
                    }
                } else {
                    if (!row.selected) {
                        self.selectedRowItems.push(row);
                        self.scope.$emit('ngGridEventRowSeleted', row);

                    }
                }
            }
        };
        // mousedown event for checkbox header selection
        self.onHeaderMouseDown = function(event) {
            if (event.target.type === 'checkbox') {
                if (!event.target.checked) {
                    self.isAllRowSelected = true;
                } else {
                    self.isAllRowSelected = false;
                }
            }
        };

    }
}]);

MetronicApp.controller('PaymentController', ['$scope', '$rootScope', '$http', '$filter', '$timeout', 'Orders', 'Societes', 'Banks', function($scope, $rootScope, $http, $filter, $timeout, Orders, Societes, Banks) {

    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.editable = false;
    $scope.forSales = $rootScope.$stateParams.forSales;

    $scope.payment = {
        mode: null,
        entity: $rootScope.login.entity,
        datec: new Date(),
        penality: 0,
        differential: 0,
        bills: [],
        bills_supplier: [],
        supplier: {}
    };

    $scope.banks = [];

    $scope.balance = 0;

    $scope.dict = {};

    //$scope.types = [{ name: "En cours", id: "WAIT" }, { name: "Toutes", id: "ALL" }];
    //$scope.type = { name: "En cours", id: "WAIT" };

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
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

        if ($rootScope.$state.current.name === 'bill.show.payment.create') {
            if ($rootScope.$stateParams.entity)
                $scope.payment.entity = $rootScope.$stateParams.entity;

            $scope.loadBank();

            if ($rootScope.$stateParams.societe) {
                $scope.payment.supplier = $rootScope.$stateParams.societe;
                $scope.find({
                    _id: $rootScope.$stateParams.societe
                });
            }
        } else {
            $scope.loadBank();
            $scope.find($rootScope.$stateParams.id);
        }
        //initDatatable();

    });

    // Init ng-include
    /*$scope.$on('$includeContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
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

        if ($rootScope.$state.current.name === 'bill.show')
            $scope.find($rootScope.$stateParams.id);

    });*/

    $scope.loadBank = function() {
        if (!$scope.payment || !$scope.payment.entity)
            return;

        Banks.bank.query({
            entity: $scope.payment.entity
        }, function(banks) {
            //console.log(banks);
            $scope.banks = banks;
        });
    };

    $scope.ngIncludeInit = function(params, length) {
        $scope.params = params;
        //initDatatable(params, length);

        console.log(params);

        if (params.supplier)
            $http({
                method: 'GET',
                url: '/erp/api/bank/payment/',
                params: {
                    find: {
                        "meta.supplier": params.supplier,
                        "meta.bills": {
                            $ne: null
                        },
                        $or: [{
                            "meta.bank": {
                                $ne: null
                            }
                        }, {
                            "meta.isWaiting": true
                        }],
                        voided: false
                    }
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.entries = data;
            });
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.create = function() {
        var payment = new Banks.payment(this.payment);
        payment.$save(function(response) {
            return $rootScope.$state.go("bill.show.payment", {
                reload: true,
                forSales: $scope.forSales
            });
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

        if ($scope.payment.bills.length)
            $scope.payment.libelleAccounting += $scope.payment.bills[0].supplier.fullName;
        else if ($scope.payment.bills_supplier.length)
            $scope.payment.libelleAccounting += $scope.payment.bills_supplier[0].supplier.fullName;

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

        if ($rootScope.$state.current.name === 'bill.show.payment.create') {
            $http({
                method: 'GET',
                url: '/erp/api/bank/payment/bills',
                params: {
                    supplier: id,
                    forSales: true,
                    "query": "WAIT"
                }
            }).success(function(data, status) {
                $scope.payment.bills = data;
                //console.log(bills);

                $scope.updateLabel();
            });

            $http({
                method: 'GET',
                url: '/erp/api/bank/payment/bills',
                params: {
                    supplier: id,
                    forSales: false,
                    "query": "WAIT"
                }
            }).success(function(data, status) {
                $scope.payment.bills_supplier = data;
                //console.log(bills);

                $scope.updateLabel();
            });

        }

        $http({
            method: 'GET',
            url: '/erp/api/bank/payment/',
            params: {
                find: {
                    $or: [{
                        "meta.bank": {
                            $ne: null
                        }
                    }, {
                        "meta.isWaiting": true
                    }],
                    "meta.bills.invoice": data,
                    voided: false
                }
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.entries = data;
        });

        return true;
    };

}]);

MetronicApp.controller('PaymentGroupController', ['$scope', '$rootScope', '$http', '$window', '$filter', '$timeout', 'Banks', function($scope, $rootScope, $http, $window, $filter, $timeout, Banks) {

    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.editable = false;

    $scope.minDate = moment().add(5, 'day').toDate();

    $scope.group = {
        entity: $rootScope.login.entity,
        datec: new Date(),
        dater: moment().add(5, 'day').toDate(),
        lines: [],
        notes: []
    };


    $scope.dict = {};
    $scope.groups = [];
    $scope.status_id = null;
    $scope.banks = [];
    $scope.lines = [];

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_status", "fk_bill_status"];

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
            //console.log(data);
        });

        if ($rootScope.$stateParams.Status) {
            $scope.status_id = $rootScope.$stateParams.Status;
            initDatatable({
                status_id: $scope.status_id
            });
        } else
            initDatatable();

        if ($rootScope.$state.current.name == 'payment.chq.create')
            $scope.filterBills();

    });

    $scope.create = function() {
        var group = new Banks.paymentGroupChq(this.group);
        group.lines = [];

        for (var i = 0, len = $scope.lines.items.length; i < len; i++) {
            group.lines.push({
                bills: $scope.lines.items[i].meta.bills,
                supplier: $scope.lines.items[i].meta.supplier._id,
                dater: $scope.lines.items[i].datetime,
                amount: $scope.lines.items[i].debit,
                journalId: $scope.lines.items[i]._journal
            });
        }

        //return console.log(group);

        group.$save(function(response) {
            $rootScope.$state.go("payment.chq.show", {
                id: response._id
            });
        });
    };


    var round = function(value, decimals) {
        if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
            return 0;
        return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
    };



    $scope.showStatus = function(val, dict) {
        if (!($scope.dict[dict] && $scope.group[val]))
            return;
        var selected = $filter('filter')($scope.dict[dict].values, {
            id: $scope.group[val]
        });

        return ($scope.group[val] && selected && selected.length) ? selected[0].label : 'Non défini';
    };

    $scope.remove = function(group) {
        if (!group && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/payment/chq/',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }

        group.$remove(function() {
            $rootScope.$state.go("payment.chq.list");
        });
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

    $scope.findOne = function() {
        this.search = "";

        Banks.paymentGroupChq.get({
            Id: $rootScope.$stateParams.id
        }, function(group) {
            console.log(group);
            $scope.group = group;

            if (group.Status == "DRAFT")
                $scope.editable = true;
            else
                $scope.editable = false;

            $scope.total_bills = 0;

            for (var i = 0, len = group.lines.length; i < len; i++)
                $scope.total_bills += group.lines[i].amount;

        }, function(err) {
            if (err.status == 401)
                $location.path("401.html");
        });
    };


    function getUrl(params) {

        if (!params)
            params = {};

        if (!params.entity)
            params.entity = $rootScope.entity;

        var url = $rootScope.buildUrl('/erp/api/bank/payment/chq/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#groupList"),
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
                    data: "bank_reglement",
                    defaultContent: ""
                }, {
                    data: "total_amount",
                    defaultContent: ""
                }, {
                    data: "datec",
                    defaultContent: ""
                }, {
                    data: "Status"
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

    $scope.filterBills = function() {
        $http({
            method: 'GET',
            url: '/erp/api/bank/payment/chq/bills',
            params: {
                dater: $scope.group.dater
            }
        }).success(function(data, status) {
            $scope.lines = data;
            //console.log(data);

            $scope.total_bills = data.total;
        });
    };

    $scope.update = function() {
        this.search = "";
        var group = $scope.group;
        //console.log(group);
        group.$update(function(response) {
            return $scope.findOne();
        }, function(err) {
            console.log(err);
        });
    };

    $scope.find = function() {
        var url;
        //console.log(this.status_id);

        if ($scope.params) { // For ng-include in societe fiche
            $scope.params.status_id = this.status_id;
            url = getUrl($scope.params);
        } else
            url = getUrl({
                status_id: this.status_id
            });

        grid.resetFilter(url);
    };

    $scope.changeStatus = function(Status) {
        $scope.group.Status = Status;
        $scope.update({
            Status: Status
        });
    };

    // Classify PAID and closed bills
    $scope.closed = function() {
        return $http({
            method: 'PUT',
            url: '/erp/api/bank/payment/chq/accounting',
            data: {
                id: $scope.group._id,
                closed: true
            }
        }).success(function(data, status) {
            if (status === 200)
                $scope.findOne();
        });
    };

    $scope.deleteEntry = function(line) {
        line.isDeleted = true;

        //$scope.lcr.lines.splice(idx, 1);
        $scope.update();
    };

    $scope.rejectEntry = function(line, reason) {

        return; //TODO PB sur IDX faire de meme avec les cheques

        return $http({
            method: 'POST',
            url: '/erp/api/bank/payment/chq/reject/' + $scope.group._id,
            data: {
                bills: $scope.group.lines[idx].bills,
                supplier: $scope.group.lines[idx].supplier._id,
                entity: $scope.group.entity,
                idx: idx,
                reason: reason
            }
        }).success(function(data, status) {
            if (status === 200)
                $scope.findOne();
        });

    };

}]);