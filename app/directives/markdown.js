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



MetronicApp.directive("markdownEditor", function($rootScope) {
    return {
        restrict: "A",
        require: 'ngModel',
        scope: {
            data: '=ngModel',
            ngShow: '=',
            height: '='
        },
        template: '<div id="markdownEditor"></div>',
        link: function(scope, element, attrs, ngModel) {

            var obj = false; // Test if it's an object for fiche.societe.report or a single value
            var newData;
            if (typeof scope.data === 'object') {
                obj = true;

                newData = {
                    new: scope.data.new,
                    old: scope.data.new,
                    datec: new Date(),
                    author: $rootScope.login._id
                };
            }

            $('#markdownEditor').markdown({
                savable: false,
                language: "fr",
                resize: "vertical",
                height: scope.height || 200,
                onChange: function(e) {
                    if (obj)
                        newData.new = e.getContent();
                    else
                        newData = e.getContent();

                    ngModel.$setViewValue(newData);
                },
                onShow: function(e) {
                    if (obj)
                        e.setContent(newData.new);
                    else
                        e.setContent(scope.data);
                },
                onBlur: function(e) {
                    //$(element).remove();
                }
            });


        }
    };
});

MetronicApp.provider('marked', function() {

    var self = this;

    /**
     * @ngdoc method
     * @name markedProvider#setOptions
     * @methodOf hc.marked.service:markedProvider
     *
     * @param {object} opts Default options for [marked](https://github.com/chjj/marked#options-1).
     */

    self.setOptions = function(opts) { // Store options for later
        this.defaults = opts;
    };

    self.$get = ['$window',
        function($window) {
            var m = $window.marked || marked;

            self.setOptions = m.setOptions;
            m.setOptions(self.defaults);

            return m;
        }
    ];

});

MetronicApp.directive('marked', ['marked',
    function(marked) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                opts: '=',
                marked: '='
            },
            link: function(scope, element, attrs) {
                set(scope.marked || element.text() || '');

                function set(val) {
                    element.html(marked(val || '', scope.opts || null));
                }

                if (attrs.marked) {
                    scope.$watch('marked', set);
                }

            }
        };
    }
]);

MetronicApp.directive("markdownDiff", function() {
    return {
        restrict: "A",
        scope: {
            origin: '=',
            new: '='
        },
        template: '<pre id="displayDiff"></pre>',
        link: function(scope, element, attrs) {
            if (scope.origin !== scope.new)
                check();

            function check() {

                //displayDiff.empty();
                $('#displayDiff').empty();

                var diff = JsDiff.diffChars(scope.origin, scope.new);

                diff.forEach(function(part) {
                    // green for additions, red for deletions
                    // grey for common parts
                    var color = part.added ? 'font-green-seagreen' :
                        part.removed ? 'font-red' : 'font-grey-cascade';
                    var span = document.createElement('span');
                    span.setAttribute('class', color);
                    span.appendChild(document
                        .createTextNode(part.value));
                    displayDiff.appendChild(span);
                });
            }

            if (attrs.origin)
                scope.$watch('origin', check);

        }
    };
});