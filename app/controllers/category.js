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

MetronicApp.controller('CategoryController', ['$scope', '$rootScope', '$http', '$timeout', '$modal', 'toastr', 'Categories', function($scope, $rootScope, $http, $timeout, $modal, toastr, Categories) {
    $scope.categories = [];
    $scope.category = {
        langs: [{

        }],
        enabled: true
    };

    $scope.$on('$viewContentLoaded', function() {
        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;
    });

    $scope.init = function() {
        $scope.find();
    };

    $scope.find = function() {
        Categories.query({}, function(response) {
            console.log("categories", response);
            $scope.categories = response;
        });
    };

    $scope.checkCategory = function(productCategoriesId, categoryId) {
        if (productCategoriesId.indexOf(categoryId) >= 0)
            productCategoriesId.splice(productCategoriesId.indexOf(categoryId), 1);

        else
            productCategoriesId.push(categoryId);
    };

    $scope.removeItem = function(scope) {
        var category = scope.$modelValue;

        if (category.nodes.length)
            return toastr.error("Impossible de supprimer ce noeud : non vide", 'Error', { timeOut: 10000, progressBar: true });

        category = new Categories(category);
        category.$remove(function(response) {
            scope.remove();
        });
    };

    $scope.newSubItem = function(scope) {
        var nodeData = scope.$modelValue;

        $scope.addEditCategory({
            parent: nodeData._id,
            langs: [{}],
            enabled: true,
            nodes: []
        });
    };

    $scope.collapseAll = function() {
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    $scope.expandAll = function() {
        $scope.$broadcast('angular-ui-tree:expand-all');
    };


    /*$scope.updateURL = function (node, urlBase) {
        if (!urlBase)
            urlBase = '';
        //console.log(node);
        
        node.linker = urlBase + '/' + node.url
        
        var category = new Categories({_id: node._id, linker: node.linker});
        //console.log(data._id, data.parent, destIndex);
        category.$update({update: 1}, function (response) {
           //
        });

        //if (node.nodes.length)
        //    for (var i = 0, len = node.nodes.length; i < len; i++) {
        //        $scope.updateURL(node.nodes[i], node.linker);
        //    }

    };*/


    $scope.treeOptions = {
        dragStop: function(event) {
            //console.log("Stop");
            //console.log(event.dest.nodesScope.$modelValue);

            var update = function(scope) {
                //console.log(scope);
                if (scope.$modelValue) {
                    var cpt = 0;
                    for (var i = 0, len = scope.$modelValue.length; i < len; i++) {

                        var data = scope.$modelValue[i];

                        if (!data)
                            continue;


                        if (!scope.$parent.$modelValue) {
                            data.parent = null;
                            //data.height = 0;
                        } else {
                            data.parent = scope.$parent.$modelValue._id;
                            //data.height = scope.$parent.$modelValue.height + 1;
                        }

                        var category = new Categories({ _id: data._id, parent: data.parent, idx: i });
                        //console.log(data._id, data.parent, destIndex);
                        category.$update({ isChangedLevel: 1 }, function(response) {
                            //console.log(response);
                            cpt++;
                            if (cpt == len)
                                $scope.find();
                        });
                    }
                }
            };

            update(event.dest.nodesScope);
            /* Update URL link */
            //$scope.updateURL(event.dest.nodesScope.$modelValue[event.dest.index], (event.dest.nodesScope.$parent.$modelValue ? event.dest.nodesScope.$parent.$modelValue.linker : null));
        }
    };

    var ModalInstanceCtrl = function($scope, $modalInstance, options) {

        $scope.category = options.category;

        $scope.ok = function() {
            $modalInstance.close($scope.category);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.addEditCategory = function(node) {
        console.log(node);
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            size: 'lg',
            //windowClass: "steps",
            resolve: {
                options: function() {
                    return {
                        category: node
                    };
                }
            }
        });

        modalInstance.result.then(function(category) {
            console.log("category", category);
            if (!category._id) {
                category = new Categories(category);
                category.$save(function(response) {
                    $scope.find();
                });
            } else {
                category = new Categories(category);
                category.$update(function(response) {
                    $scope.find();
                    //console.log(response);
                    //node.linker = response.linker;

                    //if (node.nodes.length)
                    //    for (var i = 0, len = node.nodes.length; i < len; i++) {
                    //        $scope.updateURL(node.nodes[i], node.linker);
                    //    }


                });
            }
        }, function() {
            //cancel
        });
    };

}]);