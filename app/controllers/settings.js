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

angular.module("MetronicApp").controller('SettingProductController', ['$rootScope', '$scope', '$http', '$timeout', 'Settings', function($rootScope, $scope, $http, $timeout, Settings) {
    var current = $rootScope.$state.current.name.split('.');
    $scope.backTo = 'settings.product.types';
    //console.log(current);

    $scope.object = {};
    $scope.listObject = [];

    switch (current[2]) {
        case 'types':
            var Resource = Settings.productTypes;
            break;
        case 'family':
            var Resource = Settings.family;
            break;
    }


    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;

        if (current[current.length - 1] == 'show')
            $scope.findOne();

        $scope.find();
    });

    $scope.findOne = function() {
        Resource.get({
            Id: $rootScope.$stateParams.id
        }, function(object) {
            $scope.object = object;
            //console.log(object);
        });
    };

    $scope.find = function() {
        Resource.query({}, function(data) {
            //console.log(data);
            $scope.listObject = data.data;
        });
    };

    $scope.create = function() {
        var object = new Resource(this.object);
        object.$save(function(response) {
            $rootScope.$state.go(current.join('.'), { id: response._id });
        });
    };

    $scope.update = function() {
        $scope.object.$update(function(response) {
            $scope.object = response;
            current.pop();
            $rootScope.$state.go(current.join('.'));
        });
    };

    $scope.remove = function(line) {
        var object = new Resource(line);
        object.$remove(function() {
            $scope.find();
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