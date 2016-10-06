'use strict';

angular.module("MetronicApp").controller('DashboardController', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {

        $scope.$on('$viewContentLoaded', function () {
            // initialize core components
            Metronic.initAjax();

            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
        
        // This month
        $scope.date = {
            start: moment().startOf('month').toDate(), 
            end : moment().endOf('month').toDate()
        };
        
    }]);
