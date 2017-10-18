"use strict";
/* global angular: true */
//Societes service used for articles REST endpoint
MetronicApp.factory("Societes", ['$resource',
    function($resource) {
        return $resource('/erp/api/societe/:Id', {
            Id: '@_id'
        }, {
            query: { method: 'GET', isArray: false },
            update: {
                method: 'PUT'
            }
        });
    }
]);