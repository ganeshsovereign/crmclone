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

MetronicApp.controller('BoxTemporaryController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    var loaded = {};

    $scope.indicatorPenality = 0; // indicateur de variation
    $scope.resultYear = 0;

    $scope.loadPenality = function() {

        $http({
            method: 'GET',
            url: '/erp/api/stats/billPenality'
        }).success(function(amount, status) {

            if (amount.length > 1)
                for (var i = 0, len = amount.length; i < len; i++) {
                    amount[0].total += amount[i].total;
                    amount[0].cpt += amount[i].cpt;
                }

            $scope.indicatorPenality = amount;

            //console.log(amount);
        });
    };

    $scope.loadCa = function(dateRange) {
        loaded.ca = true;

        $http({
            method: 'GET',
            url: '/erp/api/bill/stats',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);

            $scope.dataCaTotal = ca.total;
            $scope.TotalCaPrev = 0;
            $scope.TotalCaST = 0;

            if (dateRange.end > new Date())
                $http({
                    method: 'POST',
                    url: '/erp/api/delivery/statistic',
                    data: {
                        query: {
                            Status: {
                                '$in': ['DRAFT', 'SEND']
                            },
                            entity: $rootScope.entity
                        }
                    }
                }).success(function(data, status) {
                    if (status == 200) {
                        //console.log(data);
                        if (data.length && data[0].total_ht)
                            $scope.TotalCaPrev += data[0].total_ht;

                        if (data.length && data[0].total_ht_subcontractors)
                            $scope.TotalCaST += data[0].total_ht_subcontractors;
                    }
                });

            // Previsionnel
            /*$http({method: 'POST', url: '/erp/api/billing', data: {
             month: new Date().getMonth(),
             year: new Date().getFullYear()
             }
             }).success(function (data, status) {
             if (status == 200) {
             $scope.result = data;
             
             $scope.countCourses = {};
             $rootScope.TotalCourses = {};
             
             $scope.countCourses.course = data.course.length;
             $scope.countCourses.messagerie = data.messagerie.length;
             $scope.countCourses.affretement = data.affretement.length;
             $scope.countCourses.regulier = data.regulier.length;
             
             $scope.countCoursesST = data.allST.length;
             
             $rootScope.TotalCourses.course = 0;
             $rootScope.TotalCourses.messagerie = 0;
             $rootScope.TotalCourses.affretement = 0;
             $rootScope.TotalCourses.regulier = 0;
             
             $scope.TotalCoursesST = 0;
             $scope.TotalCoursesCE = 0;
             
             angular.forEach(data.course, function (row) {
             $rootScope.TotalCourses.course += row.total_ht;
             $rootScope.TotalCaPrev += row.total_ht;
             });
             
             angular.forEach(data.messagerie, function (row) {
             $rootScope.TotalCourses.messagerie += row.total_ht;
             $rootScope.TotalCaPrev += row.total_ht;
             });
             
             angular.forEach(data.affretement, function (row) {
             $rootScope.TotalCourses.affretement += row.total_ht;
             $rootScope.TotalCaPrev += row.total_ht;
             });
             
             angular.forEach(data.regulier, function (row) {
             $rootScope.TotalCourses.regulier += row.total_ht;
             $rootScope.TotalCaPrev += row.total_ht;
             });
             
             angular.forEach(data.allST, function (row) {
             $scope.TotalCoursesST += row.total_soustraitant;
             $rootScope.TotalCaST += row.total_soustraitant;
             });
             
             angular.forEach(data.allST, function (row) {
             if (row.chargesExt) {
             $scope.TotalCoursesCE += row.chargesExt;
             $rootScope.TotalCaST += row.chargesExt;
             }
             });
             }
             });*/


        });
    };

    $scope.loadDebitDetails = function(dateRange) {
        loaded.debitDetails = true;

        $http({
            method: 'GET',
            url: '/erp/api/bill/stats',
            params: {
                start: dateRange.start,
                end: dateRange.end,
                forSales: false
            }
        }).success(function(data, status) {
            //console.log(data);

            $scope.totalDebit = data.total;

            $scope.dataDebit = data.data;
        });
    };

    $scope.loadResult = function(date, mode) {
        loaded.loadResult = true;

        /*$http({
            method: 'GET',
            url: '/erp/api/stats/result',
            params: {
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            //$scope.caData = data;
            //$scope.resultYear = data.result;
        });*/
        $http({
            method: 'GET',
            url: '/erp/api/accounting/balance',
            params: {
                //entity: $rootScope.entity,
                groupByAccounts: 1,
                start_date: moment(date.start).startOf("year").toDate(),
                end_date: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            //$scope.dataBalance = data;
            $scope.resultYear = data.result;
        });
    };

    $scope.init = function(dateRange) {
        $scope.loadCa(dateRange);
        $scope.loadPenality();
        $scope.loadDebitDetails(dateRange);
        $scope.loadResult(dateRange);
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        if (loaded.ca)
            $scope.loadCa(data);
        if (loaded.debitDetails)
            $scope.loadDebitDetails(data);
        if (loaded.loadResult)
            $scope.loadResult(data);
    });

}]);

MetronicApp.controller('BoxSalaryController', ['$rootScope', '$scope', '$http', '$timeout', '$q', function($rootScope, $scope, $http, $timeout, $q) {

    var loaded = {};
    $scope.caData = {
        graph: []
    };

    /*
         loaded.caGraph = true;
         if (!mode)
             mode = "YEAR";

         $scope.date = date;
         $scope.year = new Date();

         $http({
             method: 'GET',
             url: '/erp/api/stats/salarayGraph',
             params: {
                 graph: true,
                 mode: mode,
                 start: date.start,
                 end: date.end
             }
         }).success(function(data, status) {
             console.log(data);
             $scope.caData = data;
             //console.log('Updates');

             return $scope.graphData = [];
             $scope.graphData = [{
                 "date": "2012-01-05",
                 "distance": 480,
                 "townName": "Miami",
                 //"townName2": "Miami",
                 "townSize": 10,
                 "latitude": 25.83,
                 "duration": 501
             }, {
                 "date": "2012-01-06",
                 "distance": 386,
                 "townName": "Tallahassee",
                 "townSize": 7,
                 "latitude": 30.46,
                 "duration": 443
             }, {
                 "date": "2012-01-07",
                 "distance": 348,
                 "townName": "New Orleans",
                 "townSize": 10,
                 "latitude": 29.94,
                 "duration": 405
             }, {
                 "date": "2012-01-08",
                 "distance": 238,
                 "townName": "Houston",
                 //"townName2": "Houston",
                 "townSize": 16,
                 "latitude": 29.76,
                 "duration": 309
             }, {
                 "date": "2012-01-09",
                 "distance": 218,
                 "townName": "Dalas",
                 "townSize": 17,
                 "latitude": 32.8,
                 "duration": 287
             }, {
                 "date": "2012-01-10",
                 "distance": 349,
                 "townName": "Oklahoma City",
                 "townSize": 11,
                 "latitude": 35.49,
                 "duration": 485
             }, {
                 "date": "2012-01-11",
                 "distance": 603,
                 "townName": "Kansas City",
                 "townSize": 10,
                 "latitude": 39.1,
                 "duration": 890
             }, {
                 "date": "2012-01-12",
                 "distance": 534,
                 "townName": "Denver",
                 //"townName2": "Denver",
                 "townSize": 18,
                 "latitude": 39.74,
                 "duration": 810
             }, {
                 "date": "2012-01-13",
                 "townName": "Salt Lake City",
                 "townSize": 12,
                 "distance": 425,
                 "duration": 670,
                 "latitude": 40.75,
                 "alpha": 0.4
             }, {
                 "date": "2012-01-14",
                 "latitude": 36.1,
                 "duration": 470,
                 "townName": "Las Vegas",
                 //"townName2": "Las Vegas",
                 "bulletClass": "lastBullet"
             }, {
                 "date": "2012-01-15"
             }];

             console.log($scope.graphData);
         });
     };*/

    $scope.loadCommercialCa = function(dateRange) {
        loaded.commercialCa = true;

        // Previsionnel
        /*$http({method: 'GET', url: 'api/europexpress/billing/ca'
         }).success(function(ca, status) {
         console.log(ca);
         $scope.familles.prev = ca;
         });*/

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCommercial',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCommercialCa = ca.data;

            $scope.dataCommercialCaTotal = ca.total;
        });
    };

    $scope.loadCustomerCa = function(dateRange) {
        loaded.customerCa = true;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCustomer',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCustomerCa = ca.data;

            $scope.dataCustomerCaTotal = 0;
            angular.forEach(ca.data, function(data) {
                $scope.dataCustomerCaTotal += data.total_ht;
            });
        });
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        $scope.date = data;

        if (loaded.commercialCa)
            $scope.loadCommercialCa(data);

        if (loaded.customerCa)
            $scope.loadCustomerCa(data);

        $scope.loadSalary(data, $scope.options);
    });
    $scope.loadSalary = function(date, options) {
        $scope.date = date;
        $scope.options = options;

        $http({
            method: 'GET',
            url: '/erp/api/stats/saEvolution',
            params: {
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.saEvolution = data;
        });

        var mode = "YEAR";
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/saGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.saData = data;

            /*
             $scope.graphData = [{
             "date": "2012-01-05",
             "distance": 480,
             "townName": "Miami",
             //"townName2": "Miami",
             "townSize": 10,
             "latitude": 25.83,
             "duration": 501
             }, {
             "date": "2012-01-06",
             "distance": 386,
             "townName": "Tallahassee",
             "townSize": 7,
             "latitude": 30.46,
             "duration": 443
             }, {
             "date": "2012-01-07",
             "distance": 348,
             "townName": "New Orleans",
             "townSize": 10,
             "latitude": 29.94,
             "duration": 405
             }, {
             "date": "2012-01-08",
             "distance": 238,
             "townName": "Houston",
             //"townName2": "Houston",
             "townSize": 16,
             "latitude": 29.76,
             "duration": 309
             }, {
             "date": "2012-01-09",
             "distance": 218,
             "townName": "Dalas",
             "townSize": 17,
             "latitude": 32.8,
             "duration": 287
             }, {
             "date": "2012-01-10",
             "distance": 349,
             "townName": "Oklahoma City",
             "townSize": 11,
             "latitude": 35.49,
             "duration": 485
             }, {
             "date": "2012-01-11",
             "distance": 603,
             "townName": "Kansas City",
             "townSize": 10,
             "latitude": 39.1,
             "duration": 890
             }, {
             "date": "2012-01-12",
             "distance": 534,
             "townName": "Denver",
             //"townName2": "Denver",
             "townSize": 18,
             "latitude": 39.74,
             "duration": 810
             }, {
             "date": "2012-01-13",
             "townName": "Salt Lake City",
             "townSize": 12,
             "distance": 425,
             "duration": 670,
             "latitude": 40.75,
             "alpha": 0.4
             }, {
             "date": "2012-01-14",
             "latitude": 36.1,
             "duration": 470,
             "townName": "Las Vegas",
             //"townName2": "Las Vegas",
             "bulletClass": "lastBullet"
             }, {
             "date": "2012-01-15"
             }];*/

        });
    };

    $scope.amChartOptions = {
        type: "serial",
        language: "fr",
        decimalSeparator: ".",
        thousandsSeparator: " ",
        fontSize: 12,
        fontFamily: "Open Sans",
        dataDateFormat: "YYYY-MM-DD",
        data: [],
        addClassNames: true,
        startDuration: 1,
        color: "#6c7b88",
        marginLeft: 0,
        categoryField: "date",
        categoryAxis: {
            parseDates: true,
            minPeriod: "MM",
            autoGridCount: false,
            gridCount: 50,
            gridAlpha: 0.1,
            gridColor: "#FFFFFF",
            axisColor: "#555555",
            dateFormats: [{
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'MMM DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }]
        },
        valueAxes: [{
            id: "a1",
            title: "Salaires",
            gridAlpha: 0,
            axisAlpha: 0
        }, {
            id: "a2",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            labelsEnabled: false
        }, {
            id: "a3",
            //title: "duration",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            //inside: true,
            duration: "mm",
            labelsEnabled: false,
            durationUnits: {
                DD: "d. ",
                hh: "h ",
                mm: "min",
                ss: ""
            }
        }],
        graphs: [{
            id: "g1",
            valueField: "total",
            title: "Salaires BRUT",
            type: "column",
            fillAlphas: 0.7,
            valueAxis: "a1",
            balloonText: "[[value]] ",
            legendValueText: "[[value]] ",
            legendPeriodValueText: "total: [[value.sum]] ",
            lineColor: "#08a3cc",
            alphaField: "alpha"
        }, {
            id: "g2",
            valueField: "estimated",
            classNameField: "bulletClass",
            title: "Previsionnel",
            type: "line",
            valueAxis: "a2",
            lineColor: "#786c56",
            lineThickness: 1,
            legendValueText: "[[description]]/[[value]]",
            descriptionField: "townName",
            bullet: "round",
            bulletSizeField: "townSize",
            bulletBorderColor: "#02617a",
            bulletBorderAlpha: 1,
            bulletBorderThickness: 2,
            bulletColor: "#89c4f4",
            labelText: "[[townName2]]",
            labelPosition: "right",
            balloonText: "latitude:[[value]]",
            showBalloon: true,
            animationPlayed: true
        }, {
            id: "g3",
            title: "N-1",
            valueField: "N_1",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#e26a6a",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] ",
            bullet: "square",
            bulletBorderColor: "#e26a6a",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }, {
            id: "g4",
            title: "N-2",
            valueField: "N_2",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#3ea7a0",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] ",
            bullet: "square",
            bulletBorderColor: "#3ea7a0",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }],
        chartCursor: {
            zoomable: false,
            categoryBalloonDateFormat: "MM",
            cursorAlpha: 0,
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,
            valueBalloonsEnabled: false
        },
        legend: {
            bulletType: "round",
            equalWidths: false,
            valueWidth: 120,
            useGraphSettings: true,
            color: "#6c7b88"
        }
    };

}]);

MetronicApp.controller('BoxBillController', ['$rootScope', '$scope', '$http', '$timeout', '$q', function($rootScope, $scope, $http, $timeout, $q) {

    var loaded = {};
    $scope.caData = {
        graph: []
    };

    $scope.loadCaGraph = function(date, mode) {
        loaded.caGraph = true;
        if (!mode)
            mode = "YEAR";

        $scope.date = date;
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/caGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caData = data;
            //console.log('Updates');

            return $scope.graphData = [];
            $scope.graphData = [{
                "date": "2012-01-05",
                "distance": 480,
                "townName": "Miami",
                //"townName2": "Miami",
                "townSize": 10,
                "latitude": 25.83,
                "duration": 501
            }, {
                "date": "2012-01-06",
                "distance": 386,
                "townName": "Tallahassee",
                "townSize": 7,
                "latitude": 30.46,
                "duration": 443
            }, {
                "date": "2012-01-07",
                "distance": 348,
                "townName": "New Orleans",
                "townSize": 10,
                "latitude": 29.94,
                "duration": 405
            }, {
                "date": "2012-01-08",
                "distance": 238,
                "townName": "Houston",
                //"townName2": "Houston",
                "townSize": 16,
                "latitude": 29.76,
                "duration": 309
            }, {
                "date": "2012-01-09",
                "distance": 218,
                "townName": "Dalas",
                "townSize": 17,
                "latitude": 32.8,
                "duration": 287
            }, {
                "date": "2012-01-10",
                "distance": 349,
                "townName": "Oklahoma City",
                "townSize": 11,
                "latitude": 35.49,
                "duration": 485
            }, {
                "date": "2012-01-11",
                "distance": 603,
                "townName": "Kansas City",
                "townSize": 10,
                "latitude": 39.1,
                "duration": 890
            }, {
                "date": "2012-01-12",
                "distance": 534,
                "townName": "Denver",
                //"townName2": "Denver",
                "townSize": 18,
                "latitude": 39.74,
                "duration": 810
            }, {
                "date": "2012-01-13",
                "townName": "Salt Lake City",
                "townSize": 12,
                "distance": 425,
                "duration": 670,
                "latitude": 40.75,
                "alpha": 0.4
            }, {
                "date": "2012-01-14",
                "latitude": 36.1,
                "duration": 470,
                "townName": "Las Vegas",
                //"townName2": "Las Vegas",
                "bulletClass": "lastBullet"
            }, {
                "date": "2012-01-15"
            }];

            console.log($scope.graphData);
        });
    };

    $scope.loadCommercialCa = function(dateRange) {
        loaded.commercialCa = true;

        // Previsionnel
        /*$http({method: 'GET', url: 'api/europexpress/billing/ca'
         }).success(function(ca, status) {
         console.log(ca);
         $scope.familles.prev = ca;
         });*/

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCommercial',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCommercialCa = ca.data;

            $scope.dataCommercialCaTotal = ca.total;
        });
    };

    $scope.loadCustomerCa = function(dateRange) {
        loaded.customerCa = true;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCustomer',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCustomerCa = ca.data;

            $scope.dataCustomerCaTotal = 0;
            angular.forEach(ca.data, function(data) {
                $scope.dataCustomerCaTotal += data.total_ht;
            });
        });
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        $scope.date = data;

        if (loaded.commercialCa)
            $scope.loadCommercialCa(data);

        if (loaded.customerCa)
            $scope.loadCustomerCa(data);

        $scope.loadCaFamily(data, $scope.options);
    });
    $scope.loadCaFamily = function(date, options) {
        $scope.date = date;
        $scope.options = options;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caFamily',
            params: {
                start: date.start,
                end: date.end,
                societe: options
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caFamily = data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/stats/caEvolution',
            params: {
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caEvolution = data;
        });

        var mode = "YEAR";
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/caGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caData = data;

            /*
             $scope.graphData = [{
             "date": "2012-01-05",
             "distance": 480,
             "townName": "Miami",
             //"townName2": "Miami",
             "townSize": 10,
             "latitude": 25.83,
             "duration": 501
             }, {
             "date": "2012-01-06",
             "distance": 386,
             "townName": "Tallahassee",
             "townSize": 7,
             "latitude": 30.46,
             "duration": 443
             }, {
             "date": "2012-01-07",
             "distance": 348,
             "townName": "New Orleans",
             "townSize": 10,
             "latitude": 29.94,
             "duration": 405
             }, {
             "date": "2012-01-08",
             "distance": 238,
             "townName": "Houston",
             //"townName2": "Houston",
             "townSize": 16,
             "latitude": 29.76,
             "duration": 309
             }, {
             "date": "2012-01-09",
             "distance": 218,
             "townName": "Dalas",
             "townSize": 17,
             "latitude": 32.8,
             "duration": 287
             }, {
             "date": "2012-01-10",
             "distance": 349,
             "townName": "Oklahoma City",
             "townSize": 11,
             "latitude": 35.49,
             "duration": 485
             }, {
             "date": "2012-01-11",
             "distance": 603,
             "townName": "Kansas City",
             "townSize": 10,
             "latitude": 39.1,
             "duration": 890
             }, {
             "date": "2012-01-12",
             "distance": 534,
             "townName": "Denver",
             //"townName2": "Denver",
             "townSize": 18,
             "latitude": 39.74,
             "duration": 810
             }, {
             "date": "2012-01-13",
             "townName": "Salt Lake City",
             "townSize": 12,
             "distance": 425,
             "duration": 670,
             "latitude": 40.75,
             "alpha": 0.4
             }, {
             "date": "2012-01-14",
             "latitude": 36.1,
             "duration": 470,
             "townName": "Las Vegas",
             //"townName2": "Las Vegas",
             "bulletClass": "lastBullet"
             }, {
             "date": "2012-01-15"
             }];*/

        });
    };

    $scope.amChartOptions = {
        type: "serial",
        language: "fr",
        decimalSeparator: ".",
        thousandsSeparator: " ",
        fontSize: 12,
        fontFamily: "Open Sans",
        dataDateFormat: "YYYY-MM-DD",
        data: [],
        addClassNames: true,
        startDuration: 1,
        color: "#6c7b88",
        marginLeft: 0,
        categoryField: "date",
        categoryAxis: {
            parseDates: true,
            minPeriod: "MM",
            autoGridCount: false,
            gridCount: 50,
            gridAlpha: 0.1,
            gridColor: "#FFFFFF",
            axisColor: "#555555",
            dateFormats: [{
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'MMM DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }]
        },
        valueAxes: [{
            id: "a1",
            title: "Chiffre d'affaires",
            gridAlpha: 0,
            axisAlpha: 0
        }, {
            id: "a2",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            labelsEnabled: false
        }, {
            id: "a3",
            //title: "duration",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            //inside: true,
            duration: "mm",
            labelsEnabled: false,
            durationUnits: {
                DD: "d. ",
                hh: "h ",
                mm: "min",
                ss: ""
            }
        }],
        graphs: [{
            id: "g1",
            valueField: "total_ht",
            title: "CA HT",
            type: "column",
            fillAlphas: 0.7,
            valueAxis: "a1",
            balloonText: "[[value]] HT",
            legendValueText: "[[value]] HT",
            legendPeriodValueText: "total: [[value.sum]] HT",
            lineColor: "#08a3cc",
            alphaField: "alpha"
        }, {
            id: "g2",
            valueField: "estimated",
            classNameField: "bulletClass",
            title: "Previsionnel",
            type: "line",
            valueAxis: "a2",
            lineColor: "#786c56",
            lineThickness: 1,
            legendValueText: "[[description]]/[[value]]",
            descriptionField: "townName",
            bullet: "round",
            bulletSizeField: "townSize",
            bulletBorderColor: "#02617a",
            bulletBorderAlpha: 1,
            bulletBorderThickness: 2,
            bulletColor: "#89c4f4",
            labelText: "[[townName2]]",
            labelPosition: "right",
            balloonText: "latitude:[[value]]",
            showBalloon: true,
            animationPlayed: true
        }, {
            id: "g3",
            title: "N-1",
            valueField: "N_1",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#e26a6a",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#e26a6a",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }, {
            id: "g4",
            title: "N-2",
            valueField: "N_2",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#3ea7a0",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#3ea7a0",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }],
        chartCursor: {
            zoomable: false,
            categoryBalloonDateFormat: "MM",
            cursorAlpha: 0,
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,
            valueBalloonsEnabled: false
        },
        legend: {
            bulletType: "round",
            equalWidths: false,
            valueWidth: 120,
            useGraphSettings: true,
            color: "#6c7b88"
        }
    };

}]);

MetronicApp.controller('BoxBillSupplierController', ['$rootScope', '$scope', '$http', '$timeout', '$q', function($rootScope, $scope, $http, $timeout, $q) {

    var loaded = {};
    $scope.caData = {
        graph: []
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        $scope.date = data;

        $scope.loadChFamily(data, $scope.options);
    });
    $scope.loadChFamily = function(date, options) {
        $scope.date = date;
        $scope.options = options;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caFamily',
            params: {
                start: date.start,
                end: date.end,
                societe: options,
                forSales: false
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.chFamily = data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/stats/chEvolution',
            params: {
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.chEvolution = data;
        });

        var mode = "YEAR";
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/chGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.chData = data;

            /*
             $scope.graphData = [{
             "date": "2012-01-05",
             "distance": 480,
             "townName": "Miami",
             //"townName2": "Miami",
             "townSize": 10,
             "latitude": 25.83,
             "duration": 501
             }, {
             "date": "2012-01-06",
             "distance": 386,
             "townName": "Tallahassee",
             "townSize": 7,
             "latitude": 30.46,
             "duration": 443
             }, {
             "date": "2012-01-07",
             "distance": 348,
             "townName": "New Orleans",
             "townSize": 10,
             "latitude": 29.94,
             "duration": 405
             }, {
             "date": "2012-01-08",
             "distance": 238,
             "townName": "Houston",
             //"townName2": "Houston",
             "townSize": 16,
             "latitude": 29.76,
             "duration": 309
             }, {
             "date": "2012-01-09",
             "distance": 218,
             "townName": "Dalas",
             "townSize": 17,
             "latitude": 32.8,
             "duration": 287
             }, {
             "date": "2012-01-10",
             "distance": 349,
             "townName": "Oklahoma City",
             "townSize": 11,
             "latitude": 35.49,
             "duration": 485
             }, {
             "date": "2012-01-11",
             "distance": 603,
             "townName": "Kansas City",
             "townSize": 10,
             "latitude": 39.1,
             "duration": 890
             }, {
             "date": "2012-01-12",
             "distance": 534,
             "townName": "Denver",
             //"townName2": "Denver",
             "townSize": 18,
             "latitude": 39.74,
             "duration": 810
             }, {
             "date": "2012-01-13",
             "townName": "Salt Lake City",
             "townSize": 12,
             "distance": 425,
             "duration": 670,
             "latitude": 40.75,
             "alpha": 0.4
             }, {
             "date": "2012-01-14",
             "latitude": 36.1,
             "duration": 470,
             "townName": "Las Vegas",
             //"townName2": "Las Vegas",
             "bulletClass": "lastBullet"
             }, {
             "date": "2012-01-15"
             }];*/

        });
    };

    $scope.amChartOptions = {
        type: "serial",
        language: "fr",
        decimalSeparator: ".",
        thousandsSeparator: " ",
        fontSize: 12,
        fontFamily: "Open Sans",
        dataDateFormat: "YYYY-MM-DD",
        data: [],
        addClassNames: true,
        startDuration: 1,
        color: "#6c7b88",
        marginLeft: 0,
        categoryField: "date",
        categoryAxis: {
            parseDates: true,
            minPeriod: "MM",
            autoGridCount: false,
            gridCount: 50,
            gridAlpha: 0.1,
            gridColor: "#FFFFFF",
            axisColor: "#555555",
            dateFormats: [{
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'MMM DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }]
        },
        valueAxes: [{
            id: "a1",
            title: "Chiffre d'affaires",
            gridAlpha: 0,
            axisAlpha: 0
        }, {
            id: "a2",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            labelsEnabled: false
        }, {
            id: "a3",
            //title: "duration",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            //inside: true,
            duration: "mm",
            labelsEnabled: false,
            durationUnits: {
                DD: "d. ",
                hh: "h ",
                mm: "min",
                ss: ""
            }
        }],
        graphs: [{
            id: "g1",
            valueField: "total_ht",
            title: "Charges HT",
            type: "column",
            fillAlphas: 0.7,
            valueAxis: "a1",
            balloonText: "[[value]] HT",
            legendValueText: "[[value]] HT",
            legendPeriodValueText: "total: [[value.sum]] HT",
            lineColor: "#08a3cc",
            alphaField: "alpha"
        }, {
            id: "g2",
            valueField: "estimated",
            classNameField: "bulletClass",
            title: "Previsionnel",
            type: "line",
            valueAxis: "a2",
            lineColor: "#786c56",
            lineThickness: 1,
            legendValueText: "[[description]]/[[value]]",
            descriptionField: "townName",
            bullet: "round",
            bulletSizeField: "townSize",
            bulletBorderColor: "#02617a",
            bulletBorderAlpha: 1,
            bulletBorderThickness: 2,
            bulletColor: "#89c4f4",
            labelText: "[[townName2]]",
            labelPosition: "right",
            balloonText: "latitude:[[value]]",
            showBalloon: true,
            animationPlayed: true
        }, {
            id: "g3",
            title: "N-1",
            valueField: "N_1",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#e26a6a",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#e26a6a",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }, {
            id: "g4",
            title: "N-2",
            valueField: "N_2",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#3ea7a0",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#3ea7a0",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }],
        chartCursor: {
            zoomable: false,
            categoryBalloonDateFormat: "MM",
            cursorAlpha: 0,
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,
            valueBalloonsEnabled: false
        },
        legend: {
            bulletType: "round",
            equalWidths: false,
            valueWidth: 120,
            useGraphSettings: true,
            color: "#6c7b88"
        }
    };

}]);