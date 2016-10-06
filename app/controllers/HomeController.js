'use strict';

angular.module("MetronicApp").controller('HomeController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            Metronic.initAjax();

            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        
        if(!$rootScope.login.home)
            $rootScope.$state.go("dashboard");
        else $rootScope.$state.go($rootScope.login.home);
        
    }]);
