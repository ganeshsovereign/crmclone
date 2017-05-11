'use strict';

angular.module("MetronicApp").controller('HomeController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;

    });

    if (!$rootScope.login.home)
        $rootScope.$state.go("dashboard");
    else $rootScope.$state.go($rootScope.login.home);

}]);