"use strict";
/* global angular: true */

//Users service used REST endpoint
MetronicApp.factory("Employees", ['$resource', function($resource) {
    return $resource('/erp/api/employees/:Id', { Id: '@_id' }, {
        update: { method: 'PUT' }
    });
}]);