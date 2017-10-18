"use strict";
/* global angular: true */

//service used for REST endpoint
MetronicApp.factory("Categories", ['$resource', function($resource) {
    return $resource('api/category/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);