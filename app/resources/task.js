"use strict";
/* global angular: true */

MetronicApp.factory("Task", ['$resource', function($resource) {
    return $resource('/erp/api/task/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);