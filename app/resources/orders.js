/**
 2014-2016 ToManage

NOTICE OF LICENSE

This source file is subject to the Open Software License (OSL 3.0)
that is bundled with this package in the file LICENSE.txt.
It is also available through the world-wide-web at this URL:
http://opensource.org/licenses/osl-3.0.php
If you did not receive a copy of the license and are unable to
obtain it through the world-wide-web, please send an email
to license@tomanage.fr so we can send you a copy immediately.

DISCLAIMER

Do not edit or add to this file if you wish to upgrade ToManage to newer
versions in the future. If you wish to customize ToManage for your
needs please refer to http://www.tomanage.fr for more information.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2016 ToManage SAS
@license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
International Registered Trademark & Property of ToManage SAS
**/


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