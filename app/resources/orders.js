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


MetronicApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('offer', {
            url: "/offer?forSales",
            abstract: true,
            templateUrl: "/views/orders/index.html"
        })
        .state('offer.list', {
            url: "",
            templateUrl: "/views/orders/listoffer.html",
            data: {
                pageTitle: 'Liste des devis'
            },
            controller: "OfferListController"
        })
        .state('offer.show', {
            parent: 'offer',
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/orders/fiche.html",
            data: {
                pageTitle: 'Devis'
            },
            controller: "OrdersController"
        })
        .state('offer.show.detail', {
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Devis'
            }
        })
        .state('offer.create', {
            parent: "offer",
            url: "/create.html",
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Nouvelle offre'
            },
            controller: "OrdersController"
        })
        // Order
        .state('order', {
            url: "/order?forSales",
            abstract: true,
            templateUrl: "/views/orders/index.html"
        })
        .state('order.list', {
            url: "",
            templateUrl: "/views/orders/listorder.html",
            data: {
                pageTitle: 'Liste des commandes'
            },
            controller: "OrderListController"
        })
        .state('order.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/orders/fiche.html",
            data: {
                pageTitle: 'Commande'
            },
            controller: "OrdersController"
        })
        .state('order.show.detail', {
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Commande'
            }
        })
        .state('order.create', {
            parent: "order",
            url: "/create.html",
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Nouvelle commande'
            },
            controller: "OrdersController"
        })
        // Delivery
        .state('delivery', {
            url: "/delivery?forSales",
            abstract: true,
            templateUrl: "/views/orders/index.html"
        })
        .state('delivery.list', {
            url: "",
            templateUrl: "/views/orders/listdelivery.html",
            data: {
                pageTitle: 'Liste des bons de livraison'
            },
            controller: "DeliveryListController"
        })
        .state('delivery.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/orders/fiche.html",
            data: {
                pageTitle: 'Bon de livraison'
            },
            controller: "OrdersController"
        })
        .state('delivery.show.detail', {
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Bon de livraison'
            }
        })
        .state('delivery.create', {
            url: "/create.html",
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Nouveau bon de livraion'
            },
            controller: "OrdersController"
        })
        // Bill
        .state('bill', {
            url: "/bill?forSales",
            abstract: true,
            templateUrl: "/views/orders/index.html"
        })
        .state('bill.list', {
            url: "?Status",
            templateUrl: "/views/orders/listbill.html",
            data: {
                pageTitle: 'Liste des factures'
            },
            controller: "BillListController"
        })
        .state('bill.show', {
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/orders/fiche.html",
            data: {
                pageTitle: 'Facture'
            },
            controller: "OrdersController"
        })
        .state('bill.show.detail', {
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Facture client'
            }
        })
        .state('bill.show.payment', {
            url: "/payment",
            templateUrl: "/views/bank/paymentList.html",
            data: {
                pageTitle: 'Reglement client'
            },
            controller: "PaymentController"
        })
        .state('bill.show.payment.create', {
            url: "?societe&entity",
            templateUrl: "/views/bank/createPayment.html",
            data: {
                pageTitle: 'Nouveau règlement'
            }
            //controller: "PaymentController"
        })
        .state('bill.create', {
            url: "/create.html",
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Nouvelle facture'
            },
            controller: "OrdersController"
        })
        // Orders Fab
        .state('ordersfab', {
            url: "/ordersfab",
            abstract: true,
            templateUrl: "/views/ordersfab/index.html"
        })
        .state('ordersfab.list', {
            url: "",
            templateUrl: "/views/ordersfab/listordersfab.html",
            data: {
                pageTitle: 'Liste des Ordres de fabrications'
            },
            controller: "OrdersFabListController"
        })
        .state('ordersfab.show', {
            parent: "ordersfab",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/ordersfab/fiche.html",
            data: {
                pageTitle: 'Ordre de fabrication'
            },
            controller: "OrdersController"
        })
        .state('ordersfab.show.detail', {
            templateUrl: "/views/ordersfab/detail.html",
            data: {
                pageTitle: 'Ordre de fabrication'
            }
        })
        .state('ordersfab.create', {
            parent: "ordersfab",
            url: "/create.html",
            templateUrl: "/views/ordersfab/detail.html",
            data: {
                pageTitle: 'Nouvel ordre de fabrication'
            },
            controller: "OrdersController"
        })
        // Stock Return
        .state('stockreturn', {
            url: "/stockreturn",
            abstract: true,
            templateUrl: "/views/orders/index.html"
        })
        .state('stockreturn.list', {
            url: "",
            templateUrl: "/views/orders/liststockreturn.html",
            data: {
                pageTitle: 'Liste des retours'
            },
            controller: "StockReturnListController"
        })
        .state('stockreturn.create', {
            parent: "stockreturn",
            url: "/create.html",
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Nouveau retour produit'
            },
            controller: "OrdersController"
        })
        .state('stockreturn.show', {
            parent: 'stockreturn',
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/orders/fiche.html",
            data: {
                pageTitle: 'Retour produit'
            },
            controller: "OrdersController"
        })
        .state('stockreturn.show.detail', {
            templateUrl: "/views/orders/detail.html",
            data: {
                pageTitle: 'Bon de retour'
            }
        });
});



MetronicApp.factory("Orders", ['$resource', function($resource) {
    return {
        offer: $resource(
            '/erp/api/order/:Id?quotation=true', {
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
            }
        ),
        offerSupplier: $resource(
            '/erp/api/order/:Id?forSales=false&quotation=true', {
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
        order: $resource(
            '/erp/api/order/:Id', {
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
        orderSupplier: $resource(
            '/erp/api/order/:Id?forSales=false', {
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
        delivery: $resource(
            '/erp/api/delivery/:Id', {
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
        deliverySupplier: $resource(
            '/erp/api/delivery/:Id?forSales=false', {
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
        bill: $resource(
            '/erp/api/bill/:Id', {
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
        billSupplier: $resource(
            '/erp/api/bill/:Id?forSales=false', {
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
        ordersFab: $resource(
            '/erp/api/ordersfab/:Id', {
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
        stockCorrection: $resource(
            '/erp/api/product/warehouse/stockCorrection/:Id', {
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
        stockReturn: $resource(
            '/erp/api/delivery/:Id?&stockReturn=true', {
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