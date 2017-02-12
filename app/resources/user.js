"use strict";
/* global angular: true */

//Users service used REST endpoint
MetronicApp.factory("Users", ['$resource', function ($resource) {
        return {
            users: $resource('/erp/api/users/:Id', {Id: '@_id'}, {
                update: {method: 'PUT'}
            }),
            absences: $resource('/erp/api/user/absence/:Id', {Id: '@_id'}, {
                update: {method: 'PUT'}
            })
        };
    }]);