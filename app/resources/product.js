"use strict";
/* global angular: true */

//Bills service used for REST endpoint
MetronicApp.factory("Products", ['$resource', function($resource) {
    return $resource('/erp/api/product/:Id', {
        Id: '@_id'
    }, {
        query: { method: 'GET', isArray: false },
        update: { method: 'PUT' },
        clone: {
            method: 'POST',
            params: { clone: 1 }
        }
    });
}]);