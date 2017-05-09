/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.bootstrap",
    "ui.router",
    "ngSanitize",
    "ngResource",
    "xeditable",
    'dialogs.main',
    //  "ngAnimate", // conflict with datatable !!!
    "toastr",
    //'ngFileUpload',
    "oc.lazyLoad",
    'angularFileUpload',
    //'ngGrid', //'ui.chart',
    "ngTagsInput",
    //"ui.bootstrap.datetimepicker",
    'checklist-model',
    //'jsonFormatter'
    'schemaForm',
    'notification',
    'ngHandsontable',
    'summernote',
    'ui.tree',
    'angular.filter'
]);
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/
/**
 `$controller` will no longer look for controllers on `window`.
 The old behavior of looking on `window` for controllers was originally intended
 for use in examples, demos, and toy apps. We found that allowing global controller
 functions encouraged poor practices, so we resolved to disable this behavior by
 default.
 
 To migrate, register your controllers with modules rather than exposing them
 as globals:
 
 Before:
 
 ```javascript
 function MyController() {
 // ...
 }
 ```
 
 After:
 
 ```javascript
 angular.module('myApp', []).controller('MyController', [function() {
 // ...
 }]);
 
 Although it's not recommended, you can re-enable the old behavior like this:
 
 ```javascript
 angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
 // this option might be handy for migrating old apps, but please don't use it
 // in new ones!
 $controllerProvider.allowGlobals();
 }]);
 **/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/


//Setting HTML5 Location Mode
MetronicApp.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
// Add Body for DELETE request
MetronicApp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.headers.delete = {
            "Content-Type": "application/json;charset=utf-8"
        };
    }
]);

MetronicApp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push(function($q) {
            return {
                'response': function(response) {
                    //Will only be called for HTTP up to 300
                    //console.log(response);
                    return response;
                },
                'responseError': function(rejection) {
                    switch (rejection.status) {
                        case 401:
                            //location.replace("/login");
                            window.location.reload();
                            break;
                        case 403:
                            window.location = '/erp/#!/error/' + rejection.status;
                            //console.log($routeProvider);
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }
]);

MetronicApp.factory('notifyToastr', ['$q', 'toastr', function($q, toastr) {
    var notifyToastr = {
        /*request: function (config) {
         config.requestTimestamp = new Date().getTime();
         return config;
         },*/
        response: function(response) {
            if (response.data && response.data.errorNotify) {
                // Draw Notify
                toastr.error(response.data.errorNotify.message, response.data.errorNotify.title || 'Error', { timeOut: 10000, progressBar: true });
                return $q.reject(response); // Reject response
            }

            if (response.data && response.data.successNotify) {
                // Draw Notify information
                toastr.success(response.data.successNotify.message, response.data.successNotify.title || 'Error', { timeOut: 5000, progressBar: true });
            }
            return response;
        }
    };
    return notifyToastr;
}]);
MetronicApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('notifyToastr');
}]);

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };
    $rootScope.settings = settings;
    return settings;
}]);
/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', '$http', '$location', 'dialogs', 'websocketService', '$notification',
    function($scope, $rootScope, $http, $location, dialogs, websocketService, $notification) {
        $rootScope.noteStatus = [
            { id: "note-info", name: "Info" },
            { id: "note-warning", name: "Warning" },
            { id: "note-danger", name: "Danger" },
            { id: "note-success", name: "Success" }
        ];

        // accept notification
        $notification.requestPermission()
            .then(function(permission) {
                //console.log(permission); // default, granted, denied
            });

        var login = function(userId) {
            //websocketService.login('wss://' + $location.host() + ':' + $location.port() + '/erp/', userId);
            $rootScope.isLogged = true;
        };

        // Get User profile
        $http({
            method: 'POST',
            url: '/session'
        }).success(function(data, status) {
            //console.log(data);
            $rootScope.login = data.user; // User Profile
            $rootScope.entity = data.user.entity; // Entity profile
            $rootScope.$emit('login'); // Notify login

            login(data.user._id); // websocket

            if (data.user.url && data.user.url.module)
                $rootScope.$state.go(data.user.url.module, data.user.url.params);

        });

        $rootScope.setEntity = function(entity) {
            $rootScope.entity = entity;
        };

        // Get Entity list
        $http({
            method: 'GET',
            url: '/erp/api/entity/select'
        }).success(function(data, status) {
            //console.log(data);
            $rootScope.entityList = data;
            $rootScope.entityListAll = data.slice(); // Copy array
            $rootScope.entityListAll.push({ id: "ALL", name: "ALL" });
        });

        // Return url logo
        $rootScope.getLogo = function(model, data) {
            if (data.logo)
                return "/erp/api/file/" + model + "/" + data.logo;
            else
                return "/assets/admin/layout/img/nophoto.jpg";
        };

        // Calcul la somme d'une liste
        $rootScope.getTotal = function(data, key) {
            var total = 0;

            if (data)
                for (var i = 0; i < data.length; i++) {
                    total += data[i][key];
                }
            return total;
        };

        //index(obj,'a.b.etc')

        var index = function(obj, is, value) {
            if (typeof is == 'string')
                return index(obj, is.split('.'), value);
            else if (is.length == 1 && value !== undefined)
                return obj[is[0]] = value;
            else if (is.length == 0)
                return obj;
            else
                return index(obj[is[0]], is.slice(1), value);
        };

        $rootScope.index = index;

        function encodeUriQuery(val, pctEncodeSpaces) {
            return encodeURIComponent(val).
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
        }

        $rootScope.buildUrl = function(url, params) {
            if (!params)
                return url;
            var parts = [];
            angular.forEach(params, function(value, key) {
                if (value === null || angular.isUndefined(value))
                    return;
                if (!angular.isArray(value))
                    value = [value];

                angular.forEach(value, function(v) {
                    if (angular.isObject(v)) {
                        v = angular.toJson(v);
                    }
                    parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
                });
            });
            return url + ((url.indexOf('?') == -1) ? '?' : '&') + parts.join('&');
        };

        $rootScope.loadUsers = function() {
            return $http.get('/erp/api/user/select').then(function(res) {
                //console.log(res.data);
                $rootScope.userList = res.data;
                //return res.data;
            });
        };


        $scope.$on('$viewContentLoaded', function() {
            Metronic.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        });

        // Global function to do autocomplete
        $rootScope.AutoComplete = function(val, url, entity) {
            return $http.post(url, {
                take: 50, // limit
                entity: entity,
                filter: {
                    logic: 'and',
                    filters: [{
                        value: val
                    }]
                }
            }).then(function(res) {
                //console.log(res.data);
                return res.data;
            });
        };

        // DatePicker parameters
        $rootScope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };


    }
]);

/** Send Emailing */
MetronicApp.controller('sendEmailCtrl', ['$scope', '$modalInstance', 'data', function($scope, $modalInstance, data) {
    //-- Variables --//

    $scope.email = data.email;

    //-- Methods --//

    $scope.cancel = function() {
        $modalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.send = function() {
        $modalInstance.close($scope.email);
    }; // end save

}]); // end controller(customDialogCtrl)


/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/
/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$rootScope', '$http', '$notification', /*'socket',*/
    function($scope, $rootScope, $http, $notification) {
        $scope.ticketCpt = 0;
        $scope.tasksCpt = 0;
        $scope.$on('$includeContentLoaded', function() {
            Layout.initHeader(); // init header
        });

        /*$rootScope.$on('login', function () { // On notify start websocket
         socket.emit('user', $rootScope.login._id);
         socket.on('reboot', function (data) {
         socket.emit('user', $rootScope.login._id);
         });
         socket.on('notify', function (data) {
         notify(data.title, data.message, data.options);
         });
         socket.on('refreshTicket', function (data) {
         $scope.ticketCounter();
         });
         socket.on('refreshTask', function (data) {
         $scope.taskCounter();
         });
         });*/

        $scope.ticketCounter = function() {
            $http({
                method: 'GET',
                url: '/api/ticket?count=1'
            }).
            success(function(data, status) {
                $scope.ticketCpt = data.cpt;
            });
        };

        $rootScope.$on('login', function() {
            $http({
                method: 'GET',
                url: '/erp/api/task/count',
                params: {
                    query: "MYTASK",
                    user: $rootScope.login._id
                }
            }).success(function(data, status) {
                $scope.tasksCpt = data.count;
            });
            $scope.online = true;
        });

        // refresh task counter
        $scope.$on('websocket', function(e, type, data) {
            //console.log(data);
            //console.log(type);

            if (!data)
                return;

            if (type === 'notify') {
                var notification = $notification(data.title, {
                    body: data.body
                });

                if (data.url)
                    var deregister = notification.$on('click', function() {
                        $rootScope.$state.go(data.url.module, data.url.params);
                    });

                return;
            }

            if (type === 'task')
                return $http({
                    method: 'GET',
                    url: '/erp/api/task/count',
                    params: {
                        query: "MYTASK",
                        user: $rootScope.login._id
                    }
                }).success(function(data, status) {
                    $scope.tasksCpt = data.count;
                });
            if (type === 'symeosnet') {
                //console.log(data);

                if (typeof data.online !== 'undefined') {
                    $scope.online = data.online;
                    delete data.online;
                }

                //NEXT...

                return;
            }

        });
    }
]);
/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
        $scope.menus = {};
        $scope.menuTasks = [];
        $rootScope.showSearchInput = true;
        $scope.$on('$includeContentLoaded', function() {
            Layout.initSidebar(); // init sidebar
            $http({
                method: 'GET',
                url: '/erp/api/menus'
            }).success(function(data, status) {
                $scope.menus = data;
            });
        });

        $rootScope.$on('login', function() {
            $http({
                method: 'GET',
                url: '/api/task',
                params: {
                    fields: "societe datep name",
                    query: 'TODAYMYRDV',
                    user: $rootScope.login._id
                }
            }).success(function(data, status) {
                $scope.menuTasks = data;
                //console.log(data);
            });
        });

        $scope.searchQuery = function() {
            if ($scope.searchQueryItem.length) {
                $rootScope.searchQuery = {
                    lastname: $scope.searchQueryItem
                };
                $location.path("/search");
                $rootScope.showSearchInput = false;
                $scope.searchQueryItem = "";
            } else {
                //$location.path(Global.lastPath);
            }
        };
    }
]);
/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function() {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);
/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);
/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");
    $stateProvider
    // Dashboard
        .state('home', {
            url: "/",
            templateUrl: "/views/home/index.html",
            data: {
                pageTitle: 'Home Page'
            },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/controllers/HomeController.js'
                        ]
                    });
                }]
            }
        })
        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "/views/home/dashboard.html",
            data: {
                pageTitle: 'Dashboard'
            },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/assets/admin/pages/css/tasks.css',
                            '/assets/global/plugins/jquery.sparkline.min.js',
                            //'/assets/admin/pages/scripts/index3.js',
                            '/assets/admin/pages/scripts/tasks.js',
                            '/controllers/DashboardController.js'
                        ]
                    });
                }]
            }
        })
        // Error
        .state('error', {
            url: "/error",
            abstract: true,
            templateUrl: "/views/error/index.html",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/assets/admin/pages/css/error.css'
                        ]
                    });
                }]
            }
        })
        .state('error.show', {
            parent: "error",
            url: "/{id:[0-9]{3}}",
            templateUrl: "/views/error/fiche.html",
            data: {
                pageTitle: 'Erreur'
            }
        })
        // Devis
        .state('offer', {
            url: "/offer",
            abstract: true,
            templateUrl: "/views/_offer/index.html"
        })
        .state('offer.list', {
            url: "",
            templateUrl: "/views/_offer/list.html",
            data: {
                pageTitle: 'Liste des devis'
            },
            controller: "OfferController"
        })
        .state('offer.show', {
            parent: "offer",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_offer/fiche.html",
            data: {
                pageTitle: 'Offre'
            },
            controller: "OfferController"
        })
        .state('offer.create', {
            parent: "offer",
            url: "/create.html",
            templateUrl: "/views/_offer/create.html",
            data: {
                pageTitle: 'Nouvelle offre'
            },
            controller: "OfferController"
        })
        // Order
        .state('order', {
            url: "/order",
            abstract: true,
            templateUrl: "/views/_order/index.html"
        })
        .state('order.list', {
            url: "",
            templateUrl: "/views/_order/list.html",
            data: {
                pageTitle: 'Liste des commandes'
            },
            controller: "OrderController"
        })
        .state('order.show', {
            parent: "order",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_order/fiche.html",
            data: {
                pageTitle: 'Commande'
            },
            controller: "OrderController"
        })
        .state('order.create', {
            parent: "order",
            url: "/create.html",
            templateUrl: "/views/_order/create.html",
            data: {
                pageTitle: 'Nouvelle commande'
            },
            controller: "OrderController"
        })
        // Delivery
        .state('delivery', {
            url: "/delivery",
            abstract: true,
            templateUrl: "/views/_delivery/index.html"
        })
        .state('delivery.list', {
            url: "",
            templateUrl: "/views/_delivery/list.html",
            data: {
                pageTitle: 'Liste des bons de livraison'
            },
            controller: "DeliveryController"
        })
        .state('delivery.show', {
            parent: "delivery",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_delivery/fiche.html",
            data: {
                pageTitle: 'Bon de livraison'
            },
            controller: "DeliveryController"
        })
        .state('delivery.create', {
            parent: "delivery",
            url: "/create.html",
            templateUrl: "/views/_delivery/create.html",
            data: {
                pageTitle: 'Nouveau bon de livraison'
            },
            controller: "DeliveryController"
        })
        // Bill
        .state('bill', {
            url: "/bill",
            abstract: true,
            templateUrl: "/views/_bill/index.html"
        })
        .state('bill.list', {
            url: "?Status",
            templateUrl: "/views/_bill/list.html",
            data: {
                pageTitle: 'Liste des factures clients'
            },
            controller: "BillController"
        })
        .state('bill.show', {
            parent: "bill",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_bill/fiche.html",
            data: {
                pageTitle: 'Facture client'
            },
            controller: "BillController"
        })
        .state('bill.create', {
            parent: "bill",
            url: "/create.html",
            templateUrl: "/views/_bill/create.html",
            data: {
                pageTitle: 'Nouvelle facture client'
            },
            controller: "BillController"
        })
        // Order Supplier
        .state('orderSupplier', {
            url: "/orderSupplier",
            abstract: true,
            templateUrl: "/views/_order_supplier/index.html"
        })
        .state('orderSupplier.list', {
            url: "",
            templateUrl: "/views/_order_supplier/list.html",
            data: {
                pageTitle: 'Liste des commandes fournisseurs'
            },
            controller: "OrderSupplierController"
        })
        .state('orderSupplier.show', {
            parent: "orderSupplier",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_order_supplier/fiche.html",
            data: {
                pageTitle: 'Commande fournisseur'
            },
            controller: "OrderSupplierController"
        })
        .state('orderSupplier.create', {
            parent: "orderSupplier",
            url: "/create.html",
            templateUrl: "/views/_order_supplier/create.html",
            data: {
                pageTitle: 'Nouvelle commande fournisseur'
            },
            controller: "OrderSupplierController"
        })
        // BillSupplier
        .state('billSupplier', {
            url: "/billSupplier",
            abstract: true,
            templateUrl: "/views/_bill_supplier/index.html"
        })
        .state('billSupplier.list', {
            url: "",
            templateUrl: "/views/_bill_supplier/list.html",
            data: {
                pageTitle: 'Liste des factures fournisseurs'
            },
            controller: "BillSupplierController"
        })
        .state('billSupplier.show', {
            parent: "billSupplier",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_bill_supplier/fiche.html",
            data: {
                pageTitle: 'Facture fournisseur'
            },
            controller: "BillSupplierController"
        })
        .state('billSupplier.create', {
            parent: "billSupplier",
            url: "/create.html",
            templateUrl: "/views/_bill_supplier/create.html",
            data: {
                pageTitle: 'Nouvelle facture fournisseur'
            },
            controller: "BillSupplierController"
        })
        // Company
        .state('societe', {
            url: "/societe",
            abstract: true,
            templateUrl: "/views/_company/index.html"
        })
        .state('societe.list', {
            url: "",
            templateUrl: "/views/_company/list.html",
            data: {
                pageTitle: 'Liste des societes'
            },
            controller: "SocieteController"
        })
        .state('societe.show', {
            parent: "societe",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_company/fiche.html",
            data: {
                pageTitle: 'Fiche societe'
            },
            controller: "SocieteController"
        })
        .state('societe.create', {
            parent: "societe",
            url: "/create.html",
            templateUrl: "/views/_company/create.html",
            data: {
                pageTitle: 'Creation societe'
            },
            controller: "SocieteController"
        })
        .state('societe.stats', {
            parent: "societe",
            url: "/stats",
            templateUrl: "/views/_company/stats.html",
            data: {
                pageTitle: 'Statistiques client'
            },
            controller: "SocieteStatsController"
        })
        // Contact
        .state('contact', {
            url: "/contact",
            abstract: true,
            templateUrl: "/views/_contact/index.html"
        })
        .state('contact.list', {
            url: "",
            templateUrl: "/views/_contact/list.html",
            data: {
                pageTitle: 'Liste des contacts'
            },
            controller: "ContactController"
        })
        .state('contact.show', {
            parent: "contact",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_contact/fiche.html",
            data: {
                pageTitle: 'Fiche contact'
            },
            controller: "ContactController"
        })
        .state('contact.create', {
            parent: "contact",
            url: "/create.html?societe",
            templateUrl: "/views/_contact/create.html",
            data: {
                pageTitle: 'Creation contact'
            },
            controller: "ContactController"
        })
        // Product / services
        .state('product', {
            url: "/product",
            abstract: true,
            templateUrl: "/views/_product/index.html"
        })
        .state('product.list', {
            parent: "product",
            url: "",
            templateUrl: "/views/_product/list.html",
            data: {
                pageTitle: 'Liste des produits / services'
            },
            controller: "ProductController"
        })
        .state('product.show', {
            parent: "product",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_product/fiche.html",
            data: {
                pageTitle: 'Fiche produit / service'
            },
            controller: "ProductController"
        })
        .state('product.create', {
            parent: "product",
            url: "/create.html",
            templateUrl: "/views/_product/create.html",
            data: {
                pageTitle: 'Nouveau produit / service'
            },
            controller: "ProductController"
        })
        .state('product.pricelevel', {
            parent: "product",
            url: "/pricelevel.html",
            templateUrl: "/views/_product/pricelevel.html",
            data: {
                pageTitle: 'Liste de prix'
            },
            controller: "ProductPriceLevelController"
        })
        .state('product.consumption', {
            parent: "product",
            url: "/consumption.html",
            templateUrl: "/views/_product/consumption.html",
            data: {
                pageTitle: 'Statistiques de consommation des produits'
            },
            controller: "ProductStatsController"
        })
        // Category
        .state('category', {
            url: "/category",
            abstract: true,
            templateUrl: "/views/_category/index.html"
        })
        .state('category.list', {
            parent: "category",
            url: "",
            templateUrl: "/views/_category/list.html",
            data: {
                pageTitle: 'Liste des categories produits / services'
            },
            controller: "CategoryController"
        })
        .state('category.show', {
            parent: "category",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_category/fiche.html",
            data: {
                pageTitle: 'Categorie produit / service'
            },
            controller: "CategoryController"
        })
        // Bank/Payment
        .state('bank', {
            url: "/bank",
            abstract: true,
            templateUrl: "/views/_bank/index.html"
        })
        .state('payment', {
            url: "/payment",
            abstract: true,
            templateUrl: "/views/_payment/index.html"
        })
        .state('payment.create', {
            parent: "payment",
            url: "?societe&entity",
            templateUrl: "/views/_payment/create.html",
            data: {
                pageTitle: 'Nouveau règlement'
            },
            controller: "PaymentController"
        })
        .state('task', {
            url: "/task",
            abstract: true,
            templateUrl: "/views/_task/index.html",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/assets/apps/css/todo.css'
                        ]
                    });
                }]
            }
        })
        .state('task.list', {
            url: "",
            templateUrl: "/views/_task/list.html",
            data: {
                pageTitle: 'Liste des taches'
            },
            controller: "TaskController"
        })
        .state('task.todo', {
            url: "/todo?menuclose?group",
            templateUrl: "/views/_task/todo.html",
            data: {
                pageTitle: 'Liste des taches'
            },
            controller: "TaskController"
        })
        .state('task.show', {
            parent: "task",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_task/fiche.html",
            data: {
                pageTitle: 'Tache'
            },
            controller: "TaskController"
        })
        .state('task.create', {
            parent: "task",
            url: "/create.html?societe",
            templateUrl: "/views/_task/create.html",
            data: {
                pageTitle: 'Creation d\'une tache'
            },
            controller: "TaskController"
        })
        .state('accounting', {
            url: "/accounting",
            abstract: true,
            templateUrl: "/views/_accounting/index.html"
                /*resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    '/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                                    '/assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                                    '/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js'
                                ]
                            });
                        }]
                }*/
        })
        .state('accounting.journal', {
            parent: "accounting",
            url: "/journal?journal&account",
            templateUrl: "/views/_accounting/journal.html",
            data: {
                pageTitle: 'Journaux'
            },
            controller: "AccountingController"
        })
        .state('accounting.bank', {
            parent: "accounting",
            url: "/bank?bank",
            templateUrl: "/views/_accounting/bank.html",
            data: {
                pageTitle: 'Releves bancaires'
            },
            controller: "AccountingController"
        })
        .state('accounting.estimated', {
            parent: "accounting",
            url: "/estimated",
            templateUrl: "/views/_accounting/estimated.html",
            data: {
                pageTitle: 'Previsionnel'
            },
            controller: "AccountingController"
        })
        .state('accounting.balance', {
            parent: "accounting",
            url: "/balance",
            templateUrl: "/views/_accounting/balance.html",
            data: {
                pageTitle: 'Balance comptable'
            },
            controller: "AccountingBalanceController"
        })
        // Report
        .state('report', {
            url: "/report",
            abstract: true,
            templateUrl: "/views/_report/index.html"
        })
        /*.state('contact.list', {
         url: "",
         templateUrl: "/views/contact/list.html",
         data: {
         pageTitle: 'Liste des societes'
         },
         controller: "ContactController"
         })*/
        .state('report.show', {
            parent: "report",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_report/fiche.html",
            data: {
                pageTitle: 'Fiche compte-rendu'
            },
            controller: "ReportController"
        })
        .state('report.create', {
            parent: "report",
            url: "/create.html?societe",
            templateUrl: "/views/_report/create.html",
            data: {
                pageTitle: 'Creation compte-rendu'
            },
            controller: "reportController"
        })
        // Stock
        .state('stock', {
            url: "/stock",
            abstract: true,
            templateUrl: "/views/_stock/index.html"
        })
        .state('stock.list', {
            url: "",
            templateUrl: "/views/_stock/list.html",
            data: {
                pageTitle: 'Mouvements de stock'
            },
            controller: "StockController"
        })
        .state('stock.inventory', {
            parent: "stock",
            url: "/inventory.html",
            templateUrl: "/views/_stock/inventory.html",
            data: {
                pageTitle: 'Etat des stocks'
            },
            controller: "StockController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/assets/global/plugins/jquery-barcode/jquery-barcode.min.js'
                        ]
                    });
                }]
            }
        })
        .state('europexpress', {
            url: "/europexpress",
            abstract: true,
            templateUrl: "/views/_europexpress/index.html"
        })
        .state('europexpress.transport', {
            parent: "europexpress",
            url: "/transport",
            templateUrl: "/views/_europexpress/transport.html",
            data: {
                pageTitle: 'Transports'
            },
            controller: "EETransportController"
        })
        .state('europexpress.transport_edit', {
            parent: "europexpress",
            url: "/transport/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_europexpress/transport_edit.html",
            data: {
                pageTitle: 'Modification transports'
            },
            controller: "EETransportEditController"
        })
        .state('europexpress.transport_create', {
            parent: "europexpress",
            url: "/transport/create.html",
            templateUrl: "/views/_europexpress/transport_create.html",
            data: {
                pageTitle: 'Nouveau transport'
            },
            controller: "EETransportEditController"
        })
        .state('europexpress.transport_createmessagerie', {
            parent: "europexpress",
            url: "/transport/create_messagerie.html",
            templateUrl: "/views/_europexpress/transport_createmessagerie.html",
            data: {
                pageTitle: 'Nouvelle messagerie'
            },
            controller: "EETransportEditController"
        })
        .state('europexpress.planning', {
            parent: "europexpress",
            url: "/planning.html?week&year",
            templateUrl: "/views/_europexpress/planning.html",
            data: {
                pageTitle: 'Gestion des plannings'
            },
            controller: "EEPlanningController"
        })
        .state('europexpress.dhl', {
            parent: "europexpress",
            url: "/dhl.html",
            templateUrl: "/views/_europexpress/dhl.html",
            data: {
                pageTitle: 'Donnees DHL'
            },
            controller: "EEDHLController"
        })
        .state('europexpress.absence', {
            parent: "europexpress",
            url: "/absence.html",
            templateUrl: "/views/_europexpress/absence.html",
            data: {
                pageTitle: 'Gestion des congés/absences'
            },
            controller: "UserRhAbsenceController"
        })
        .state('europexpress.absence.create', {
            parent: "europexpress",
            url: "/absencecreate.html",
            templateUrl: "/views/_europexpress/absencecreate.html",
            data: {
                pageTitle: 'Gestion des congés/absences'
            },
            controller: "UserRhAbsenceController"
        })
        .state('europexpress.absence.show', {
            parent: "europexpress",
            url: "/absence/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_europexpress/absenceedit.html",
            data: {
                pageTitle: 'Gestion des congés/absences'
            },
            controller: "UserRhAbsenceController"
        })
        .state('europexpress.vehicule', {
            parent: "europexpress",
            url: "/list_vehicule.html",
            templateUrl: "/views/_europexpress/list_vehicule.html",
            data: {
                pageTitle: 'Gestion des véhicules'
            },
            controller: "EEVehiculeController"
        })
        .state('europexpress.vehicule.create', {
            parent: "europexpress",
            url: "/list_vehiculecreate.html",
            templateUrl: "/views/_europexpress/list_vehiculecreate.html",
            data: {
                pageTitle: 'Gestion des véhicules'
            },
            controller: "EEVehiculeController"
        })
        .state('europexpress.vehicule.show', {
            parent: "europexpress",
            url: "/vehicules/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_europexpress/list_vehiculeshow.html",
            data: {
                pageTitle: 'Gestion des véhicules'
            },
            controller: "EEVehiculeController"
        })
        .state('europexpress.billing', {
            parent: "europexpress",
            url: "/facturation.html?month&year&tab",
            templateUrl: "/views/_europexpress/facturation.html",
            data: {
                pageTitle: 'Pré-facturation'
            },
            controller: "EEFacturationController"
        })
        .state('europexpress.billing.planning', {
            parent: "europexpress",
            url: "/suiviplanning.html?month&year",
            templateUrl: "/views/_europexpress/suiviplanning.html",
            data: {
                pageTitle: 'Suivi Planning'
            },
            controller: "EESuiviPlanningController"
        })
        .state('europacourses', {
            url: "/europacourses",
            abstract: true,
            templateUrl: "/views/_europacourses/index.html"
        })
        .state('europacourses.mouvement', {
            parent: "europacourses",
            url: "/mouvement",
            templateUrl: "/views/_europacourses/mouvement.html",
            data: {
                pageTitle: 'Mouvements de stocks'
            },
            controller: "ECMouvementController"
        })
        .state('europacourses.etatstockprod', {
            parent: "europacourses",
            url: "/etatstockProd",
            templateUrl: "/views/_europacourses/etatstockprod.html",
            data: {
                pageTitle: 'Liste des stocks par référence produit'
            },
            controller: "ECMouvementController"
        })
        .state('europacourses.etatstockspot', {
            parent: "europacourses",
            url: "/etatstockSpot",
            templateUrl: "/views/_europacourses/etatstockspot.html",
            data: {
                pageTitle: 'Liste des stocks par emplacement'
            },
            controller: "ECMouvementController"
        })
        .state('europacourses.inventaire', {
            parent: "europacourses",
            url: "/inventaire?sn",
            templateUrl: "/views/_europacourses/inventaire.html",
            data: {
                pageTitle: 'Inventaires'
            },
            controller: "ECMouvementController"
        })
        .state('europacourses.facturation', {
            parent: "europacourses",
            url: "/facturation",
            templateUrl: "/views/_europacourses/facturation.html",
            data: {
                pageTitle: 'Facturation'
            },
            controller: "ECMouvementController"
        })
        // User Profile
        .state('user', {
            url: "/user",
            abstract: true,
            templateUrl: "/views/user/index.html"
        })
        .state('user.list', {
            url: "",
            templateUrl: "/views/user/list.html",
            data: {
                pageTitle: 'Liste des utilisateurs'
            },
            controller: "UserController"
        })
        .state('user.create', {
            parent: "user",
            url: "/create.html",
            templateUrl: "/views/user/create.html",
            data: {
                pageTitle: 'Nouvel utilisateur'
            },
            controller: "UserController"
        })
        .state('user.show', {
            parent: "user",
            url: "/{id}",
            templateUrl: "/views/user/fiche.html",
            data: {
                pageTitle: 'Fiche collaborateur'
            },
            controller: "UserController"
        })
        // Group management
        .state('group', {
            url: "/group",
            abstract: true,
            templateUrl: "/views/group/index.html"
        })
        .state('group.list', {
            url: "",
            templateUrl: "/views/group/list.html",
            data: {
                pageTitle: 'Liste des utilisateurs'
            },
            controller: "GroupController"
        })
        .state('group.create', {
            parent: "group",
            url: "/create.html",
            templateUrl: "/views/group/create.html",
            data: {
                pageTitle: 'Nouveau groupe'
            },
            controller: "GroupController"
        })
        .state('group.show', {
            parent: "group",
            url: "/{id}",
            templateUrl: "/views/group/fiche.html",
            data: {
                pageTitle: 'Fiche groupe'
            },
            controller: "GroupController"
        })
        // Gestion des LCR
        .state('lcr', {
            url: "/lcr",
            abstract: true,
            templateUrl: "/views/_lcr/index.html"
        })
        .state('lcr.list', {
            url: "?Status",
            templateUrl: "/views/_lcr/list.html",
            data: {
                pageTitle: 'Liste des LCR clients'
            },
            controller: "LcrController"
        })
        .state('lcr.show', {
            parent: "lcr",
            url: "/{id:[0-9a-z]{24}}",
            templateUrl: "/views/_lcr/fiche.html",
            data: {
                pageTitle: 'LCR client'
            },
            controller: "LcrController"
        })
        .state('lcr.create', {
            parent: "lcr",
            url: "/create.html",
            templateUrl: "/views/_lcr/create.html",
            data: {
                pageTitle: 'Nouveau LCR client'
            },
            controller: "LcrController"
        })
        /*
         // AngularJS plugins
         .state('fileupload', {
         url: "/file_upload.html",
         templateUrl: "/views/file_upload.html",
         data: {pageTitle: 'AngularJS File Upload', pageSubTitle: 'angularjs file upload'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'angularFileUpload',
         files: [
         '/assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js'
         ]
         }, {
         name: 'MetronicApp',
         files: [
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // UI Select
         .state('uiselect', {
         url: "/ui_select.html",
         templateUrl: "/views/ui_select.html",
         data: {pageTitle: 'AngularJS Ui Select', pageSubTitle: 'select2 written in angularjs'},
         controller: "UISelectController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'ui.select',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
         '/assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
         ]
         }, {
         name: 'MetronicApp',
         files: [
         '/controllers/UISelectController.js'
         ]
         }]);
         }]
         }
         })
         
         // UI Bootstrap
         .state('uibootstrap', {
         url: "/ui_bootstrap.html",
         templateUrl: "/views/ui_bootstrap.html",
         data: {pageTitle: 'AngularJS UI Bootstrap', pageSubTitle: 'bootstrap components written in angularjs'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'MetronicApp',
         files: [
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // Tree View
         .state('tree', {
         url: "/tree",
         templateUrl: "/views/tree.html",
         data: {pageTitle: 'jQuery Tree View', pageSubTitle: 'tree view samples'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/jstree/dist/themes/default/style.min.css',
         '/assets/global/plugins/jstree/dist/jstree.min.js',
         '/assets/admin/pages/scripts/ui-tree.js',
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // Form Tools
         .state('formtools', {
         url: "/form-tools",
         templateUrl: "/views/form_tools.html",
         data: {pageTitle: 'Form Tools', pageSubTitle: 'form components & widgets sample'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
         '/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
         '/assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
         '/assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
         '/assets/global/plugins/typeahead/typeahead.css',
         '/assets/global/plugins/fuelux/js/spinner.min.js',
         '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
         '/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
         '/assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
         '/assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
         '/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
         '/assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
         '/assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
         '/assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
         '/assets/global/plugins/typeahead/handlebars.min.js',
         '/assets/global/plugins/typeahead/typeahead.bundle.min.js',
         '/assets/admin/pages/scripts/components-form-tools.js',
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // Date & Time Pickers
         .state('pickers', {
         url: "/pickers",
         templateUrl: "/views/pickers.html",
         data: {pageTitle: 'Date & Time Pickers', pageSubTitle: 'date, time, color, daterange pickers'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/clockface/css/clockface.css',
         '/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
         '/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
         '/assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
         '/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
         '/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
         '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
         '/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
         '/assets/global/plugins/clockface/js/clockface.js',
         '/assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
         '/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
         '/assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
         '/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
         '/assets/admin/pages/scripts/components-pickers.js',
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // Custom Dropdowns
         .state('dropdowns', {
         url: "/dropdowns",
         templateUrl: "/views/dropdowns.html",
         data: {pageTitle: 'Custom Dropdowns', pageSubTitle: 'select2 & bootstrap select dropdowns'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load([{
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
         '/assets/global/plugins/select2/select2.css',
         '/assets/global/plugins/jquery-multi-select/css/multi-select.css',
         '/assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
         '/assets/global/plugins/select2/select2.min.js',
         '/assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',
         '/assets/admin/pages/scripts/components-dropdowns.js',
         '/controllers/GeneralPageController.js'
         ]
         }]);
         }]
         }
         })
         
         // Advanced Datatables
         .state('datatablesAdvanced', {
         url: "/datatables/advanced.html",
         templateUrl: "/views/datatables/advanced.html",
         data: {pageTitle: 'Advanced Datatables', pageSubTitle: 'advanced datatables samples'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load({
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/select2/select2.css',
         '/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
         '/assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
         '/assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
         '/assets/global/plugins/select2/select2.min.js',
         '/assets/global/plugins/datatables/all.min.js',
         '/scripts/table-advanced.js',
         '/controllers/GeneralPageController.js'
         ]
         });
         }]
         }
         })
         
         // Ajax Datetables
         .state('datatablesAjax', {
         url: "/datatables/ajax.html",
         templateUrl: "/views/datatables/ajax.html",
         data: {pageTitle: 'Ajax Datatables', pageSubTitle: 'ajax datatables samples'},
         controller: "GeneralPageController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load({
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/select2/select2.css',
         '/assets/global/plugins/bootstrap-datepicker/css/datepicker.css',
         '/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
         '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
         '/assets/global/plugins/select2/select2.min.js',
         '/assets/global/plugins/datatables/all.min.js',
         '/assets/global/scripts/datatable.js',
         '/scripts/table-ajax.js',
         '/controllers/GeneralPageController.js'
         ]
         });
         }]
         }
         })
         
         // User Profile
         .state("profile", {
         url: "/profile",
         templateUrl: "/views/profile/main.html",
         data: {pageTitle: 'User Profile', pageSubTitle: 'user profile sample'},
         controller: "UserProfileController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load({
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
         '/assets/admin/pages/css/profile.css',
         '/assets/admin/pages/css/tasks.css',
         '/assets/global/plugins/jquery.sparkline.min.js',
         '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
         '/assets/admin/pages/scripts/profile.js',
         '/controllers/UserProfileController.js'
         ]
         });
         }]
         }
         })
         
         // User Profile Dashboard
         .state("profile.dashboard", {
         url: "/dashboard",
         templateUrl: "views/profile/dashboard.html",
         data: {pageTitle: 'User Profile'}
         })
         
         // User Profile Account
         .state("profile.account", {
         url: "/account",
         templateUrl: "views/profile/account.html",
         data: {pageTitle: 'User Account'}
         })
         
         // User Profile Help
         .state("profile.help", {
         url: "/help",
         templateUrl: "views/profile/help.html",
         data: {pageTitle: 'User Help'}      
         })
         
         // Todo
         .state('todo', {
         url: "/todo",
         templateUrl: "views/todo.html",
         data: {pageTitle: 'Todo'},
         controller: "TodoController",
         resolve: {
         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
         return $ocLazyLoad.load({
         name: 'MetronicApp',
         insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
         files: [
         '/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
         '/assets/global/plugins/select2/select2.css',
         '/assets/admin/pages/css/todo.css',
         '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
         '/assets/global/plugins/select2/select2.min.js',
         '/assets/admin/pages/scripts/todo.js',
         '/controllers/TodoController.js'
         ]
         });
         }]
         }
         
         })*/
    ;
}]);
/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state",
    function($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }
]);

MetronicApp.run(
    ['$window', '$rootScope', '$state', '$stateParams',
        function($window, $rootScope, $state, $stateParams) {
            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.goBack = function() {
                $window.history.back();
            };

        }
    ]);

MetronicApp.run(['editableOptions', 'editableThemes',
    function(editableOptions, editableThemes) {
        // bootstrap3 theme. Can be also 'bs2', 'default'
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
    }
]);

// For dialog box
MetronicApp.config(['dialogsProvider', '$translateProvider',
    function(dialogsProvider, $translateProvider) {
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(true);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');

        $translateProvider.translations('fr-FR', {
            DIALOGS_ERROR: "Erreur",
            DIALOGS_ERROR_MSG: "Erreur inconnue.",
            DIALOGS_CLOSE: "Fermer",
            DIALOGS_PLEASE_WAIT: "Attendre",
            DIALOGS_PLEASE_WAIT_ELIPS: "Veuillez patienter...",
            DIALOGS_PLEASE_WAIT_MSG: "Veuiller attendre la fin de l'opération.",
            DIALOGS_PERCENT_COMPLETE: "% complete",
            DIALOGS_NOTIFICATION: "Notificacion",
            DIALOGS_NOTIFICATION_MSG: "Notificacion inconnue.",
            DIALOGS_CONFIRMATION: "Confirmation",
            DIALOGS_CONFIRMATION_MSG: "Confirmation requise.",
            DIALOGS_OK: "Ok",
            DIALOGS_YES: "Oui",
            DIALOGS_NO: "Non"
        });

        $translateProvider.preferredLanguage('fr-FR');
    }
]);

// results in ($10.00) rather than -$10.00
MetronicApp.config(['$provide', function($provide) {
    $provide.decorator('$locale', ['$delegate', function($delegate) {
        //if($delegate.id == 'fr-fr') {
        $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-';
        $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = ' \u00A4';
        //}
        return $delegate;
    }]);
}]);