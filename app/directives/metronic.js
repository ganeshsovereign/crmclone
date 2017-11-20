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



/***
 GLobal Directives
 ***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function() {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
]);

// Handle global LINK click
MetronicApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function() {
    return {
        link: function(scope, elem) {
            elem.dropdownHover();
        }
    };
});

// uniform checkbox and radio
MetronicApp.directive('uniform', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.show().uniform();

            //if (!element.parents(".checker").length) {
            //    element.show().uniform();
            //}
            scope.$watch(function() {
                return ngModel.$modelValue
            }, function() {
                setTimeout(function() {
                    $.uniform.update();
                }, 0);
            });

        }
    };
});

// SlimScroll
MetronicApp.directive('scroller', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.each(function() {
                if ($(this).attr("data-initialized")) {
                    return; // exit
                }

                var height;

                if ($(this).attr("data-height")) {
                    height = $(this).attr("data-height");
                } else {
                    height = $(this).css('height');
                }

                $(this).slimScroll({
                    allowPageScroll: true, // allow page scroll when the element scroll is ended
                    size: '7px',
                    color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
                    wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
                    position: Metronic.isRTL() ? 'left' : 'right',
                    height: height,
                    alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                    railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                    disableFadeOut: true
                });

                $(this).attr("data-initialized", "1");
            });
        }
    };
});



/**
 * @Author: Geoffrey Bauduin <bauduin.geo@gmail.com>
 */

MetronicApp.directive("ionRangeSlider", ['$timeout', function($timeout) {
    return {
        restrict: "A",
        scope: {
            min: "=",
            max: "=",
            from: "=",
            to: "=",
            disable: "=",
            values: "=",

            type: "@",
            step: "@",
            minInterval: "@",
            maxInterval: "@",
            dragInterval: "@",
            fromFixed: "@",
            fromMin: "@",
            fromMax: "@",
            fromShadow: "@",
            toFixed: "@",
            toMax: "@",
            toShadow: "@",
            prettifyEnabled: "@",
            prettifySeparator: "@",
            forceEdges: "@",
            keyboard: "@",
            keyboardStep: "@",
            grid: "@",
            gridMargin: "@",
            gridNum: "@",
            gridSnap: "@",
            hideMinMax: "@",
            hideFromTo: "@",
            prefix: "@",
            postfix: "@",
            maxPostfix: "@",
            decorateBoth: "@",
            valuesSeparator: "@",
            inputValuesSeparator: "@",

            prettify: "&",
            onChange: "&",
            onFinish: "&",
        },
        replace: true,
        link: function($scope, $element, attrs) {
            $element.ionRangeSlider({
                min: $scope.min,
                max: $scope.max,
                from: $scope.from,
                to: $scope.to,
                disable: $scope.disable,
                type: $scope.type,
                step: $scope.step,
                min_interval: $scope.minInterval,
                max_interval: $scope.maxInterval,
                drag_interval: $scope.dragInterval,
                values: $scope.values,
                from_fixed: $scope.fromFixed,
                from_min: $scope.fromMin,
                from_max: $scope.fromMax,
                from_shadow: $scope.fromShadow,
                to_fixed: $scope.toFixed,
                to_max: $scope.toMax,
                to_shadow: $scope.toShadow,
                prettify_enabled: $scope.prettifyEnabled,
                prettify_separator: $scope.prettifySeparator,
                force_edges: $scope.forceEdges,
                keyboard: $scope.keyboard,
                keyboard_step: $scope.keyboardStep,
                grid: $scope.grid,
                grid_margin: $scope.gridMargin,
                grid_num: $scope.gridNum,
                grid_snap: $scope.gridSnap,
                hide_min_max: $scope.hideMinMax,
                hide_from_to: $scope.hideFromTo,
                prefix: $scope.prefix,
                postfix: $scope.postfix,
                max_postfix: $scope.maxPostfix,
                decorate_both: $scope.decorateBoth,
                values_separator: $scope.valuesSeparator,
                input_values_separator: $scope.inputValuesSeparator,

                prettify: function(value) {
                    if (!attrs.prettify) {
                        return value;
                    }
                    return $scope.prettify({
                        value: value
                    });
                },
                onChange: function(a) {
                    $scope.$apply(function() {
                        $scope.from = a.from;
                        $scope.to = a.to;
                        $scope.onChange && $scope.onChange({
                            a: a
                        });
                    });
                },
                onFinish: function() {
                    $timeout(function() {
                        $scope.$apply($scope.onFinish);
                    });
                },
            });
            var watchers = [];
            watchers.push($scope.$watch("min", function(value) {
                $element.data("ionRangeSlider").update({
                    min: value
                });
            }));
            watchers.push($scope.$watch('max', function(value) {
                $element.data("ionRangeSlider").update({
                    max: value
                });
            }));
            watchers.push($scope.$watch('from', function(value) {
                var slider = $element.data("ionRangeSlider");
                if (slider.old_from !== value) {
                    slider.update({
                        from: value
                    });
                }
            }));
            watchers.push($scope.$watch('to', function(value) {
                var slider = $element.data("ionRangeSlider");
                if (slider.old_to !== value) {
                    slider.update({
                        to: value
                    });
                }
            }));
            watchers.push($scope.$watch('disable', function(value) {
                $element.data("ionRangeSlider").update({
                    disable: value
                });
            }));
        }
    };

}]);