"use strict";
/* global angular: true */

//User Group service used for UserGroup REST endpoint
MetronicApp.factory("Group", ['$resource', function($resource) {
    return $resource('/erp/api/group/:Id', {
        Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);