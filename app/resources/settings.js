/**
Copyright 2017 ToManage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author    ToManage SAS <contact@tomanage.fr>
@copyright 2014-2017 ToManage SAS
@license   http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
International Registered Trademark & Property of ToManage SAS
*/



"use strict";
/* global angular: true */

//Users service used REST endpoint
MetronicApp.factory("Settings", ['$resource', function($resource) {
    return {
        productTypes: $resource('/erp/api/product/productTypes/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        productFamily: $resource('/erp/api/product/family/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        productAttributes: $resource('/erp/api/product/attributes/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        priceList: $resource('/erp/api/product/prices/priceslist/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        warehouse: $resource('/erp/api/product/warehouse/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        zone: $resource('/erp/api/product/warehouse/zone/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        location: $resource('/erp/api/product/warehouse/location/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            }
        }),
        entity: $resource('/erp/api/settings/entity/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        })
    };
}]);