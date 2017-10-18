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



'use strict';

MetronicApp.directive('barChart', function() {
        return {
            restrict: 'A',
            scope: {
                x: '@barX',
                y: '@barY',
                labels: '=barLabels',
                colors: '@barColors',
                barData: '='
            },
            link: function(scope, elem, attrs) {
                scope.$watch('barData', function() {
                    if (scope.barData) {
                        if (!scope.objBar) {
                            scope.objBar = new Morris.Bar({
                                element: elem,
                                data: scope.barData,
                                xkey: scope.x,
                                ykeys: JSON.parse(scope.y),
                                labels: scope.labels,
                                barColors: JSON.parse(scope.colors),
                                xLabelMargin: 2,
                                resize: true,
                                hideHover: true
                            });
                        } else {
                            scope.objBar.setData(scope.barData);
                        }
                    }
                });
            }
        };
    })
    .directive('donutChart', function() {
        return {
            restrict: 'A',
            scope: {
                donutData: '='
            },
            link: function(scope, elem, attrs) {
                scope.$watch('donutData', function() {
                    if (scope.donutData) {
                        if (!scope.objDonut) {
                            scope.objDonut = new Morris.Donut({
                                element: elem,
                                data: scope.donutData
                            });
                        } else {
                            scope.objDonut.setData(scope.donutData);
                        }
                    }
                });
            }
        };
    })
    .directive('lineChart', function() {
        return {
            restrict: 'A',
            scope: {
                lineData: '=',
                lineXkey: '@',
                lineYkeys: '@',
                lineLabels: '@',
                lineColors: '@'
            },
            link: function(scope, elem, attrs) {
                var colors;
                if (scope.lineColors === void 0 || scope.lineColors === '') {
                    colors = null;
                } else {
                    colors = JSON.parse(scope.lineColors);
                }
                scope.$watch('lineData', function() {
                    if (scope.lineData) {
                        if (!scope.morris) {
                            scope.morris = new Morris.Line({
                                element: elem,
                                data: scope.lineData,
                                xkey: scope.lineXkey,
                                ykeys: JSON.parse(scope.lineYkeys),
                                labels: JSON.parse(scope.lineLabels),
                                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                            });
                        } else {
                            scope.morris.setData(scope.lineData);
                        }
                    }
                });
            }
        };
    });