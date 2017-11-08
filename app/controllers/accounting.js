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
/* jshint multistr: true */

MetronicApp.controller('AccountingController', ['$scope', '$rootScope', '$http', '$filter', '$timeout', function($scope, $rootScope, $http, $filter, $timeout) {

    var user = $rootScope.login;

    $scope.entries = [];
    $scope.totalEntries = 0;
    $scope.journaux = [];
    $scope.journal = $rootScope.$stateParams.journal;
    $scope.account = $rootScope.$stateParams.account;
    $scope.balance = 0;
    $scope.entryBalance = 0;
    $scope.deleted = false;
    $scope.noreconcilliation = false;
    $scope.allNoExported = false;

    $scope.minDate = moment().subtract(2, 'month').startOf('month').toDate();
    $scope.maxDate = moment().endOf('day').toDate();

    // Add one transaction
    $scope.entry = {
        lines: [{
            account: null,
            credit: null,
            debit: null
        }]
    };

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

        $http({
            method: 'GET',
            url: '/erp/api/accounting/journal/',
            params: {
                //entity: $rootScope.entity
            }
        }).success(function(data, status) {
            $scope.journaux = data;
        });

        if ($rootScope.$state.current.name === 'accounting.bank') {
            return $http({
                method: 'GET',
                url: '/erp/api/bank/',
                params: {
                    //entity: $rootScope.entity
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.banks = data;
                if (!$scope.account && data.length) {
                    $scope.journal = data[0].journalId;
                    $scope.account = data[0];

                    $scope.find();
                }
            });
        }

        $scope.find();

    });

    /*$scope.changeEntity = function (entity) {

        $rootScope.setEntity(entity);


        $http({method: 'GET', url: '/erp/api/accounting/journal/', params: {
                entity: $rootScope.entity
            }
        }).success(function (data, status) {
            $scope.journaux = data;
        });

        if ($rootScope.$state.current.name === 'accounting.bank') {
            return $http({method: 'GET', url: '/erp/api/bank/', params: {
                    entity: $rootScope.entity
                }
            }).success(function (data, status) {
                //console.log(data);
                $scope.banks = data;
                if (data.length) {
                    $scope.journal = data[0].journalId;
                    $scope.account = data[0];

                    $scope.find();
                }
            });
        }
    };*/

    $scope.find = function() {
        $scope.addEntries = 0;
        $scope.entry = {
            lines: [{
                account: null,
                credit: null,
                debit: null
            }]
        };

        if ($rootScope.$stateParams.journal) {
            var query = {
                //entity: $rootScope.entity,
                start_date: $scope.date.start,
                end_date: $scope.date.end,
                voided: $scope.deleted
            };

            if ($scope.allNoExported) {
                delete query.start_date;
                delete query.end_date;
                query.exported = false;
            }

            $http({
                method: 'GET',
                url: '/erp/api/accounting/entries/' + $scope.journal,
                params: query
            }).success(function(data, status) {
                //console.log(data);
                $scope.entries = data.results;
                $scope.totalEntries = data.total;
                //$scope.balance = data.balance; // TODO A verifier
                $scope.totalExportAmount = data.totalExport;
                $scope.debit = data.debit;
                $scope.credit = data.credit;
                $scope.nbLines = data.notes;
            });
        }

        if ($scope.account && $scope.journal) {
            //Bank
            $scope.account = this.account;
            $http({
                method: 'GET',
                url: '/erp/api/accounting/entries/' + $scope.account.journalId,
                params: {
                    //entity: $rootScope.entity,
                    account: $scope.account.compta_bank,
                    start_date: $scope.date.start,
                    end_date: $scope.date.end,
                    bank: 1, // mode bank for balance
                    voided: $scope.deleted,
                    reconcilliation: ($scope.noreconcilliation ? 'noreconcilliation' : 'all')
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.entries = data.results;
                $scope.totalEntries = data.total;
                $scope.journal = $scope.account.journalId;
                $scope.balance = data.balance * -1;
                $scope.bankSolde = data.bankSolde * -1;
                $scope.qtyWaiting = data.waitingQty;
                $scope.totalExportAmount = data.totalExport;
                $scope.credit = data.credit;
                $scope.debit = data.debit;
                $scope.nbLines = data.notes;
            });
        }

    };

    $scope.classImported = function() {
        var idList = [];
        var element = $filter('unique')($scope.entries, '_journal');
        //console.log(element);

        for (var i = 0, len = element.length; i < len; i++)
            idList.push(element[i]._journal);

        //console.log(idList);

        //return;

        if (idList.length)
            $http({
                method: 'POST',
                url: '/erp/api/accounting/exported/' + $scope.journal,
                params: {
                    //entity: $rootScope.entity
                },
                data: {
                    _journal: idList
                }
            }).success(function(data, status) {
                $scope.find();
            });
    };

    $scope.addEntry = function() {
        $scope.entry.lines.push({
            account: null,
            credit: null,
            debit: null
        });
    };

    $scope.deleteEntry = function(entryId) {
        //console.log(entryId);
        $http({
            method: 'DELETE',
            url: '/erp/api/accounting/entries/' + entryId,
            params: {
                //entity: $rootScope.entity
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.find();
        });
    };

    $scope.refreshBalance = function() {
        var entry = this.entry;
        $scope.entryBalance = 0;

        for (var i = 0, len = entry.lines.length; i < len; i++) {
            if (entry.lines[i].credit > 0)
                $scope.entryBalance += entry.lines[i].credit;
            if (entry.lines[i].debit > 0)
                $scope.entryBalance -= entry.lines[i].debit;
        }

        $scope.entryBalance = Math.round($scope.entryBalance * 100) / 100;
    };

    $scope.getAccountsList = function(val) {
        return $http.get('/erp/api/accounting/account/' + $scope.entry.journal, {
            params: {
                //entity: $rootScope.entity,
                val: val
            }
        }).then(function(response) {
            //console.log(response);
            return response.data;
        });
    };

    $scope.saveBankTransfer = function(entry) {
        return $http.post('/erp/api/accounting/transfer', entry, {
            params: {
                //entity: $rootScope.entity
            }
        }).then(function(response) {
            return $scope.find();
        });
    };

    $scope.saveEntry = function(entry) {
        return $http.post('/erp/api/accounting/' + $scope.entry.journal, entry, {
            params: {
                //entity: $rootScope.entity
            }
        }).then(function(response) {
            return $scope.find();
        });
    };

    $scope.update = function(lineId, data, field) {
        return $http.put('/erp/api/accounting/transaction/' + lineId, {
            id: lineId,
            data: data,
            field: field
        }).then(function(response) {
            //console.log(response);
            return $scope.find();
        });
    };

    $scope.checkReconcilliation = function(data) {
        if (data == null)
            return true;

        if (data >= $scope.minDate && data <= $scope.maxDate)
            return true;
        else
            //console.log(data);
            return "Erreur : date incorrecte";
    };

    $scope.addReconcilliation = function(journalId, data) {
        return $http.put('/erp/api/accounting/journal/' + $scope.journal, {
            id: journalId,
            data: data,
            method: 'setReconcilliation'
        }, {
            params: {
                //entity: $rootScope.entity
            }
        }).then(function(response) {
            //console.log(response);
            return $scope.find();
        });
    };

}]);


MetronicApp.controller('AccountingBalanceController', ['$scope', '$rootScope', '$http', '$filter', '$timeout',
    function($scope, $rootScope, $http, $filter, $timeout) {

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
            $rootScope.settings.layout.pageBodySolid = true;

            $scope.find();
        });

        // Estimated https://handsontable.com/features.html

        //$scope.minSpareRows = 1;
        $scope.rowHeaders = false;

        $scope.find = function() {

            //console.log(dataF.generateArrayOfObjects(10));

            $http({
                method: 'GET',
                url: '/erp/api/accounting/balance',
                params: {
                    //entity: $rootScope.entity,
                    groupByAccounts: 1,
                    start_date: $scope.date.start,
                    end_date: $scope.date.end
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.dataBalance = data;
            });
        };

        $scope.createAN = function() {
            $http({
                method: 'POST',
                url: '/erp/api/accounting/balance',
                data: {
                    groupByAccounts: 1,
                    start_date: $scope.date.start,
                    end_date: $scope.date.end
                }
            }).success(function(data, status) {
                console.log(data);
            });
        };

    }
]);