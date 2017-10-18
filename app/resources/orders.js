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
//Orders service used for articles REST endpoint
MetronicApp.factory("Orders", ['$resource', function($resource) {
    return {
        offer: $resource('/erp/api/order/:Id?quotation=true', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        offerSupplier: $resource('/erp/api/order/:Id?forSales=false&quotation=true', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        order: $resource('/erp/api/order/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        orderSupplier: $resource('/erp/api/order/:Id?forSales=false', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        delivery: $resource('/erp/api/delivery/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
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
        deliverySupplier: $resource('/erp/api/delivery/:Id?forSales=false', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
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
        bill: $resource('/erp/api/bill/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        billSupplier: $resource('/erp/api/bill/:Id?forSales=false', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        ordersFab: $resource('/erp/api/ordersfab/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        stockCorrection: $resource('/erp/api/product/warehouse/stockCorrection/:Id', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        }),
        stockReturn: $resource('/erp/api/delivery/:Id?&stockReturn=true', {
            Id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                method: 'GET',
                isArray: false
            },
            clone: {
                method: 'POST',
                params: {
                    clone: 1
                }
            }
        })
    }
}]);