"use strict";
/* global angular: true */

//Users service used REST endpoint
MetronicApp.factory("Settings", ['$resource', function($resource) {
    return {
        productTypes: $resource('/erp/api/product/productTypes/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        productFamily: $resource('/erp/api/product/family/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            },
            query: { method: 'GET', isArray: false }
        }),
        productAttributes: $resource('/erp/api/product/attributes/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        priceList: $resource('/erp/api/product/prices/priceslist/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        warehouse: $resource('/erp/api/product/warehouse/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        zone: $resource('/erp/api/product/warehouse/zone/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        location: $resource('/erp/api/product/warehouse/location/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false }
        }),
        entity: $resource('/erp/api/settings/entity/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' }
        })
    };
}]);