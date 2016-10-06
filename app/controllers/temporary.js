"use strict";

MetronicApp.controller('BoxTemporaryController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {

        var loaded = {};

        $scope.indicatorPenality = 0; // indicateur de variation
        $scope.resultYear = 0;

        $scope.loadPenality = function () {

            $http({method: 'GET', url: '/erp/api/stats/billPenality'
            }).success(function (amount, status) {
                
                if(amount.length > 1)
                    for(var i=0, len=amount.length; i<len;i++) {
                        amount[0].total += amount[i].total;
                        amount[0].cpt += amount[i].cpt;
                    }

                $scope.indicatorPenality = amount;

                //console.log(amount);
            });
        };

        $scope.loadCa = function (dateRange) {
            loaded.ca = true;

            $http({method: 'GET', url: '/erp/api/bill/ca', params: {
                    start: dateRange.start,
                    end: dateRange.end
                }
            }).success(function (ca, status) {
                //console.log(ca);

                $scope.dataCaTotal = ca.total;
                $scope.TotalCaPrev = 0;
                $scope.TotalCaST = 0;

                $http({method: 'POST', url: '/erp/api/delivery/statistic', data: {
                        query: {
                            Status: {'$in': ['DRAFT', 'SEND']},
                            entity: $rootScope.entity
                        }
                    }
                }).success(function (data, status) {
                    if (status == 200) {
                        //console.log(data);
                        if (data.length && data[0].total_ht)
                            $scope.TotalCaPrev += data[0].total_ht;

                        if (data.length && data[0].total_ht_subcontractors)
                            $scope.TotalCaST += data[0].total_ht_subcontractors;
                    }
                });

                // Previsionnel
                $http({method: 'POST', url: '/erp/api/billing', data: {
                        month: new Date().getMonth(),
                        year: new Date().getFullYear()
                    }
                }).success(function (data, status) {
                    if (status == 200) {
                        $scope.result = data;

                        $scope.countCourses = {};
                        $scope.TotalCourses = {};

                        $scope.countCourses.course = data.course.length;
                        $scope.countCourses.messagerie = data.messagerie.length;
                        $scope.countCourses.affretement = data.affretement.length;
                        $scope.countCourses.regulier = data.regulier.length;

                        $scope.countCoursesST = data.allST.length;

                        $scope.TotalCourses.course = 0;
                        $scope.TotalCourses.messagerie = 0;
                        $scope.TotalCourses.affretement = 0;
                        $scope.TotalCourses.regulier = 0;

                        $scope.TotalCoursesST = 0;
                        $scope.TotalCoursesCE = 0;

                        angular.forEach(data.course, function (row) {
                            $scope.TotalCourses.course += row.total_ht;
                            $scope.TotalCaPrev += row.total_ht;
                        });

                        angular.forEach(data.messagerie, function (row) {
                            $scope.TotalCourses.messagerie += row.total_ht;
                            $scope.TotalCaPrev += row.total_ht;
                        });

                        angular.forEach(data.affretement, function (row) {
                            $scope.TotalCourses.affretement += row.total_ht;
                            $scope.TotalCaPrev += row.total_ht;
                        });

                        angular.forEach(data.regulier, function (row) {
                            $scope.TotalCourses.regulier += row.total_ht;
                            $scope.TotalCaPrev += row.total_ht;
                        });

                        angular.forEach(data.allST, function (row) {
                            $scope.TotalCoursesST += row.total_soustraitant;
                            $scope.TotalCaST += row.total_soustraitant;
                        });

                        angular.forEach(data.allST, function (row) {
                            if (row.chargesExt) {
                                $scope.TotalCoursesCE += row.chargesExt;
                                $scope.TotalCaST += row.chargesExt;
                            }
                        });

                    }
                });


            });
        };

        $scope.loadDebitDetails = function (dateRange) {
            loaded.debitDetails = true;

            $http({method: 'GET', url: '/erp/api/billSupplier/total', params: {
                    start: dateRange.start,
                    end: dateRange.end
                }
            }).success(function (data, status) {
                //console.log(data);

                if (data.total === 0)
                    $scope.totalDebit = {
                        charge: 0,
                        subcontractor: 0
                    };
                else
                    $scope.totalDebit = data.total;

                $scope.dataDebit = data.data;
            });
        };

        $scope.loadResult = function (date, mode) {
            loaded.loadResult = true;

            $http({method: 'GET', url: '/erp/api/stats/result', params: {
                    start: date.start,
                    end: date.end
                }
            }).success(function (data, status) {
                //console.log(data);
                //$scope.caData = data;
                $scope.resultYear = data.result;
            });
        };

        $scope.init = function (dateRange) {
            $scope.loadCa(dateRange);
            $scope.loadPenality();
            $scope.loadDebitDetails(dateRange);
            $scope.loadResult(dateRange);
        };

        $rootScope.$on('reportDateRange', function (event, data) {
            //console.log(data);
            if (loaded.ca)
                $scope.loadCa(data);
            if (loaded.debitDetails)
                $scope.loadDebitDetails(data);
            if (loaded.loadResult)
                $scope.loadResult(data);
        });

    }]);