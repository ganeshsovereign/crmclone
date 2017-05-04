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

'use strict';

angular.module("MetronicApp").controller('SettingGeneralController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });



}]);

angular.module("MetronicApp").controller('SettingEntityController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });


}]);

angular.module("MetronicApp").controller('SettingProductController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;

        $scope.backTo = 'settings.product.types';

        $http({
            method: 'GET',
            url: '/erp/api/product/productTypes'
        }).success(function(data, status) {
            //console.log(data);
            $scope.productTypes = data.data;
        });
    });

    $scope.create = function() {
        var productType = new productTypes(this.productType);
        productType.$save(function(response) {
            $rootScope.$state.go("settings.product.types.show", { id: response._id });
        });
    };




    $scope.remove = function(productType) {
        if (!productType && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/product/productTypes',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }

        employees.$remove(function() {
            $rootScope.$state.go("settings.product.types");
        });
    };



}]);

angular.module("MetronicApp").controller('SettingIntegrationController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });



}]);