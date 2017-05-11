'use strict';

angular.module("MetronicApp").controller('DashboardController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageSidebarClosed = true;
        $rootScope.settings.layout.pageBodySolid = false;
    });

    // This month
    $scope.date = {
        start: moment().startOf('month').toDate(),
        end: moment().endOf('month').toDate()
    };

}]);