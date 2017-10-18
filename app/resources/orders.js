"use strict";
/* global angular: true */
//Orders service used for articles REST endpoint
MetronicApp.factory("Orders", ['$resource', function($resource) {
    return {
        offer: $resource('/erp/api/order/:Id?quotation=true', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        offerSupplier: $resource('/erp/api/order/:Id?forSales=false&quotation=true', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        order: $resource('/erp/api/order/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        orderSupplier: $resource('/erp/api/order/:Id?forSales=false', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        delivery: $resource('/erp/api/delivery/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    method: "clone"
                }
            },
            bill: {
                method: 'POST',
                params: {
                    method: "bill"
                }
            }
        }),
        deliverySupplier: $resource('/erp/api/delivery/:Id?forSales=false', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    method: "clone"
                }
            },
            bill: {
                method: 'POST',
                params: {
                    method: "bill"
                }
            }
        }),
        bill: $resource('/erp/api/bill/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        billSupplier: $resource('/erp/api/bill/:Id?forSales=false', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        ordersFab: $resource('/erp/api/ordersfab/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        stockCorrection: $resource('/erp/api/product/warehouse/stockCorrection/:Id', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        stockReturn: $resource('/erp/api/delivery/:Id?&stockReturn=true', { Id: '@_id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: false },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        })
    }
}]);