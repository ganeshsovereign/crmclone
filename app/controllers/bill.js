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
/* jshint multistr: true */

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