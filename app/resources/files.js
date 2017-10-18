"use strict";

MetronicApp.factory("Files", ['$resource', function($resource) {
    return {
        bank: $resource('/erp/api/images/bank/:Id', {
            Id: '@_id'
        }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        productImages: $resource('/erp/api/images/product/:Id', {
            Id: '@_id'
        }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        })
    }
}]);