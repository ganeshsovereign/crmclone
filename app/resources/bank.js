"use strict";

//Bank service
MetronicApp.factory("Banks", ['$resource', function($resource) {
    return {
        payment: $resource('/erp/api/bank/payment/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }),
        bank: $resource('/erp/api/bank/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        }),
        paymentGroupChq: $resource('/erp/api/bank/payment/chq/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    };
}]);