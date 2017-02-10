MetronicApp.directive('sdBarcode', function () {
    return {
        // Restrict tells AngularJS how you will be declaring your directive in the markup.
        // A = attribute, C = class, E = element and M = comment
        restrict: 'A',
        scope: {
            barcodeValue: '@'
        },
        link: function (scope, elem, attrs) {
            elem.barcode(attrs.barcodeValue.toString(), "code128");
        }
    };
});

MetronicApp.directive('reportDateRange', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                data: '=ngModel'
            },
            template: '<i class="icon-calendar"></i>&nbsp; <span class="thin uppercase visible-lg-inline-block">{{data.start | date : \'d MMM yyyy\'}} - {{data.end | date : \'d MMM yyyy\'}}</span>&nbsp; <i class="fa fa-angle-down"></i>',
            link: function (scope, element, attrs, ngModel) {
                if (!jQuery().daterangepicker || !element) {
                    return;
                }

                element.daterangepicker({
                    opens: (Metronic.isRTL() ? 'right' : 'left'),
                    startDate: moment(scope.data.start),
                    endDate: moment(scope.data.end),
                    minDate: '01/01/2012',
                    //maxDate: '12/31/2014',
                    //dateLimit: {
                    //    days: 90
                    //},
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: false,
                    timePickerIncrement: 1,
                    timePicker12Hour: true,
                    ranges: {
                        'Ce mois-ci': [moment().startOf('month'), moment().endOf('month')],
                        'Mois m-1': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                        'Mois m-2': [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')],
                        'Mois m-3': [moment().subtract(3, 'month').startOf('month'), moment().subtract(3, 'month').endOf('month')],
                        '3 derniers mois': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                        'Année en cours': [moment().startOf('year'), moment().endOf('month')],
                        'Année N-1': [moment().startOf('year').subtract(1, 'year'), moment().endOf('year').subtract(1, 'year')]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'DD/MM/YYYY',
                    separator: ' a ',
                    locale: {
                        applyLabel: 'Appliquer',
                        fromLabel: 'Du',
                        toLabel: 'Au',
                        customRangeLabel: 'Custom Range',
                        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                    ngModel.$setViewValue({
                        start: start.toDate(),
                        end: end.toDate()
                    });

                    $rootScope.$emit('reportDateRange', {
                        start: start.toDate(),
                        end: end.toDate()
                    });

                    //console.log(start.toDate());
                }
                );

            }
        };
    }]);

/*angular.module('mean.system').directive('sdSelect', function() {
 return function(scope, element) {
 //console.log(element.parent());
 var id = element.parent();
 console.log(id)
 
 //element.text("{{course.Status.css}}");
 
 //var replaced = $(this),
 var select = id.data('replacement');
 console.log(select);
 
 // If valid
 //if (select)
 //{
 // _updateSelectText(select, replaced, select.data('select-settings'));
 //}
 
 
 //return {
 //restrict: 'E',
 //template : 'Hello {{course.Status.css}}'
 //};
 };
 });*/

MetronicApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {
                        'event': event
                    });
                });

                event.preventDefault();
            }
        });
    };
});

MetronicApp.directive('ngBlur', function () {
    return function (scope, elem, attrs) {
        elem.bind('blur', function (event) {
            scope.$eval(attrs.ngBlur);
        });
    };
});

MetronicApp.directive('ngConfirmClick', ['dialogs',
    function (dialogs) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var message = attrs.ngConfirmClick || "Are you sure ?";
                    var title = attrs.ngConfirmTitle || "Confirmation";

                    var dlg = dialogs.confirm(title, message);
                    dlg.result.then(function (btn) {
                        scope.$eval(attrs.confirmedClick);
                    }, function (btn) {
                        if (attrs.canceledClick)
                            scope.$eval(attrs.canceledClick);
                    });
                });
            }
        };
    }
]);

MetronicApp.directive('myFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watch(attr.myFocus, function (n, o) {
                if (n != 0 && n) {
                    element[0].focus();
                }
            });
        }
    };
});

MetronicApp.factory('superCache', ['$cacheFactory',
    function ($cacheFactory) {
        return $cacheFactory('super-cache');
    }
]);

MetronicApp.directive('crmAddress', ['$http',
    function ($http) {
        return {
            restrict: 'A',
            scope: {
                addressModel: '=model',
                mode: '=?'
            },
            templateUrl: function (el, attr) {
                if (attr.mode) {
                    if (attr.mode === 'create') {
                        return '/templates/core/address_edit.html';
                    }
                    //if (attr.mode === 'update') {
                    //    return '/partials/updateAddress.html';
                    //}
                    if (attr.mode === 'show') {
                        return '/templates/core/address_show.html';
                    }
                } else
                    return '/templates/core/address.html';
            },
            link: function (scope) {

                scope.updateAddressDir = true;

                scope.deletedAddress = {
                    name:null,
                    address: null,
                    zip: null,
                    town: null,
                    societe: {}
                };

                scope.enableUpdateAddress = function () {
                    scope.deletedAddress = {
                        name: scope.addressModel.name,
                        address: scope.addressModel.address,
                        zip: scope.addressModel.zip,
                        town: scope.addressModel.town,
                        societe: scope.addressModel.societe
                    };

                    scope.updateAddressDir = !scope.updateAddressDir;
                };

                scope.cancelUpdateAddress = function () {
                    scope.addressModel.name = scope.deletedAddress.name;
                    scope.addressModel.address = scope.deletedAddress.address;
                    scope.addressModel.zip = scope.deletedAddress.zip;
                    scope.addressModel.town = scope.deletedAddress.town;
                    scope.updateAddressDir = !scope.updateAddressDir;
                };
                scope.getLocation = function (val) {
                    return $http.jsonp('https://modules.tomanage.fr/api/zipcode/autocomplete?callback=JSON_CALLBACK&q='+val)
                            .then(function (res) {
                        return res.data;
                    });
                };

                scope.generateZip = function (item) {
                    scope.addressModel.zip = item.code;
                    scope.addressModel.town = item.city;
                };
            }
        };
    }
]);

MetronicApp.directive('crmContact', ['$http', '$modal', 'Contacts',
    function ($http, $modal, Contacts) {
        return {
            restrict: 'A',
            scope: {
                contactModel: '=model',
                societe: '=?',
                mode: '=?'
            },
            templateUrl: function (el, attr) {
                if (attr.mode) {
                    if (attr.mode === 'create')
                        return '/templates/core/contact_edit.html';
                } else
                    return '/templates/core/contact.html';
            },
            link: function (scope) {

                scope.updateContactDir = true;
                scope.contacts = [];

                scope.$watch('societe', function (newValue, oldValue) {
                    if (!newValue)
                        return;

                    $http({method: 'GET', url: '/erp/api/contact', params: {
                            find: {
                                societe : newValue.id
                            },
                            field: "_id firstname lastname name poste"
                        }
                    }).success(function (data) {
                        //console.log(data);
                        scope.contacts = data;
                    });
                });
                scope.addContact = function () {
                    scope.contactModel.push(scope.selectedContact._id);
                    scope.$parent.update(function (err, response) {
                        scope.$parent.findOne();
                    });

                };

                scope.deleteContact = function (index) {
                    scope.contactModel.splice(index, 1);
                    scope.$parent.update(function (err, response) {
                        scope.$parent.findOne();
                    });
                };

                scope.addNewContact = function () {

                    var modalInstance = $modal.open({
                        templateUrl: '/templates/_contact/modal/create.html',
                        controller: "ContactCreateController",
                        resolve: {
                            object: function () {
                                return {
                                    societe: scope.societe
                                };
                            }
                        }
                    });
                    modalInstance.result.then(function (contacts) {
                        //scope.contacts.push(contacts);
                        scope.contactModel.push(contacts._id);
                        scope.$parent.update(function (err, response) {
                            scope.$parent.findOne();
                        });
                    }, function () {
                    });
                };

                scope.deletedContact = {
                    id: null,
                    name: null,
                    phone: null,
                    email: null
                };

                scope.enableUpdateContact = function () {
                    scope.deletedContact = {
                        id: scope.contactModel.id,
                        name: scope.contactModel.name,
                        phone: scope.contactModel.phone,
                        email: scope.contactModel.email
                    };
                    scope.updateContactDir = !scope.updateContactDir;
                };

                scope.cancelUpdateContact = function () {
                    scope.contactModel.id = scope.deletedContact.id;
                    scope.contactModel.name = scope.deletedContact.name;
                    scope.contactModel.phone = scope.deletedContact.phone;
                    scope.contactModel.email = scope.deletedContact.email;
                    scope.updateContactDir = !scope.updateContactDir;
                };
            }
        };
    }
]);
MetronicApp.directive('scanBarcode', ['$http', '$modal', 'Products',
    function ($http, $modal, Products) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/templates/core/barcode_button.html',
            scope: {
                obj: '=ngModel',
                //societe: '=?'
            },
            link: function (scope) {

                scope.addContact = function () {
                    scope.contactModel.push(scope.selectedContact._id);
                    scope.$parent.update(function (err, response) {
                        scope.$parent.findOne();
                    });

                };

                scope.addProducts = function () {

                    var modalInstance = $modal.open({
                        templateUrl: '/templates/core/modal/barcode_scan.html',
                        controller: function ($scope, $modalInstance, object) {
                            //$scope.items = items;
                            //console.log(object);

                            var round = function (value, decimals) {
                                if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
                                    return 0;
                                return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
                            };

                            $scope.readNewScan = function () {
                                console.log("SCAN");

                                $http.post('/erp/api/product/scan', {
                                    scan: $scope.scan,
                                    price_level: object.price_level,
                                    qty: 1
                                }).then(function (res) {
                                    //console.log(res.data);
                                    //return res.data;

                                    var found = false;
                                    for (var i = 0, len = object.lines.length; i < len; i++) {
                                        if (object.lines[i].product.id == res.data._id) {
                                            object.lines[i].qty++;
                                            calculMontantHT(object.lines[i]);
                                            found = true;
                                            break;
                                        }

                                    }

                                    if (!found) {
                                        object.lines.push({
                                            idLine: object.lines.length,
                                            qty: 1
                                        });
                                        addProduct(res.data, object.lines.length - 1, object.lines);
                                    }

                                    //console.log(object);

                                    //object.$update();
                                    $scope.scan = "";
                                });
                            };

                            var addProduct = function (data, index, lines) {
                                //console.log(data);
                                for (var i = 0; i < lines.length; i++) {
                                    if (lines[i].idLine === index) {
                                        lines[i] = {
                                            pu_ht: data.pu_ht,
                                            tva_tx: data.product.id.tva_tx,
                                            discount: data.discount,
                                            priceSpecific: (data.product.dynForm ? true : false),
                                            product: {
                                                id: data.product.id._id,
                                                name: data.product.id.ref,
                                                label: data.product.id.label,
                                                unit: data.product.unit,
                                                dynForm: data.product.dynForm,
                                                family: data.product.id.caFamily
                                            },
                                            description: (lines[i].description ? lines[i].description : data.product.id.description),
                                            isNew: true,
                                            qty: lines[i].qty,
                                            no_package: lines[i].no_package, // nombre de pieces TODO Delete
                                            qty_order: lines[i].qty_order, // qty from order
                                            idLine: index
                                        };
                                        calculMontantHT(lines[i]);
                                    }
                                }
                            };

                            var calculMontantHT = function (line, data, varname) {
                                if (varname)
                                    line[varname] = data;

                                function calculHT(line) {
                                    if (line.qty) {
                                        line.total_ht = round(line.qty * (line.pu_ht * (1 - (line.discount / 100))), 2);
                                        line.total_tva = line.total_ht * line.tva_tx / 100;
                                    } else {
                                        line.total_ht = 0;
                                        line.total_tva = 0;
                                    }

                                    console.log(line);
                                }

                                if (!line.priceSpecific)
                                    return $http.post('/erp/api/product/price', {
                                        price_level: object.price_level,
                                        qty: line.qty,
                                        _id: line.product.id
                                    }).then(function (res) {
                                        console.log("TATA");
                                        console.log(res.data);
                                        line.pu_ht = res.data.pu_ht;
                                        //return res.data;
                                        calculHT(line);
                                    });

                                calculHT(line);
                            };

                            $scope.ok = function () {
                                $modalInstance.close($scope.selected.item);
                            };

                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        },
                        windowClass: "",
                        resolve: {
                            object: function () {
                                return scope.obj;
                            }
                        }
                    });
                    modalInstance.result.then(function (contacts) {
                        //scope.contacts.push(contacts);
                        scope.contactModel.push(contacts._id);
                        scope.$parent.update(function (err, response) {
                            scope.$parent.findOne();
                        });
                    }, function () {
                    });
                };

                scope.deletedContact = {
                    id: null,
                    name: null,
                    phone: null,
                    email: null
                };

                scope.enableUpdateContact = function () {
                    scope.deletedContact = {
                        id: scope.contactModel.id,
                        name: scope.contactModel.name,
                        phone: scope.contactModel.phone,
                        email: scope.contactModel.email
                    };
                    scope.updateContactDir = !scope.updateContactDir;
                };

                scope.cancelUpdateContact = function () {
                    scope.contactModel.id = scope.deletedContact.id;
                    scope.contactModel.name = scope.deletedContact.name;
                    scope.contactModel.phone = scope.deletedContact.phone;
                    scope.contactModel.email = scope.deletedContact.email;
                    scope.updateContactDir = !scope.updateContactDir;
                };
            }
        };
    }
]);
MetronicApp.directive('crmId', ['$http',
    function ($http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: "=ngModel",
                entity: "=?",
                label: "@",
                name: "@",
                required: "@",
                typeahead: "@",
                placeholder: "@",
                url: "@",
                onSelect: "="
            },
            templateUrl: function (el, attr) {
                return '/templates/core/typeahead-form.html';
            },
            link: function (scope, elm, attrs, ctrl) {
                //console.log(scope);

                scope.$error = false;
                scope.$error2 = true; // Only if accueil compte

                scope.AutoComplete = function (val, url, entity) {
                    return $http.post(url, {
                        take: 50, // limit
                        entity: entity,
                        filter: {
                            logic: 'and',
                            filters: [{
                                    value: val
                                }]
                        }
                    }).then(function (res) {
                        //console.log(res.data);
                        return res.data;
                    });
                };
                ctrl.$validators.id = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        if (scope.required) {
                            scope.$error = true;
                            return false;
                        }
                        else {
                            // consider empty models to be valid
                            scope.$error = false;
                            return true;
                        }
                    }

                    //console.log(attrs);

                    if (typeof modelValue == 'object' && modelValue.id) {
                        // it is valid
                        scope.$error = false;
                        return true;
                    }

                    // it is invalid
                    scope.$error = true;
                    return false;
                };
                scope.changeName = function () {
                    if (scope.model.name === 'Accueil' || !scope.model.name)
                        scope.$error2 = true;
                    else
                        scope.$error2 = false;
                };
            }
        };
    }]);
MetronicApp.directive('crmNotes', [
    function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                noteModel: '=ngModel',
                ngChange: '&'
            },
            templateUrl: function (el, attr) {
                return '/templates/core/notes.html';
            },
            link: function (scope, elem, attrs, ngModel) {

                scope.updateNoteDir = true;
                //console.log(scope);
                if (!scope.noteModel)
                    scope.noteModel = {};
                scope.update = function () {
                    //console.log("save");
                    ngModel.$setViewValue(scope.noteModel);
                    scope.ngChange();
                    return true;
                };
                scope.deletedNote = {
                    title: null,
                    note: null,
                    public: false,
                    edit: false
                };
                scope.enableUpdateNote = function () {
                    scope.deletedNote = {
                        title: scope.noteModel.title,
                        note: scope.noteModel.note,
                        public: true,
                        edit: true
                    };
                    scope.updateNoteDir = !scope.updateNoteDir;
                };
                scope.cancelUpdateNote = function () {
                    scope.noteModel.title = scope.deletedNote.title;
                    scope.noteModel.note = scope.deletedNote.note;
                    scope.noteModel.public = scope.deletedNote.public;
                    scope.noteModel.edit = scope.deletedNote.edit;
                    scope.updateNoteDir = !scope.updateNoteDir;
                };
            }
        };
    }
]);
MetronicApp.directive(
        'dateInput',
        function (dateFilter) {
            return {
                //restrict: 'E',
                scope: {
                    dt: '=ngModel',
                    ngRequired: '=' // TODO a tester
                },
                require: 'ngModel',
                //template: '<input type="date" class="form-control" placeholder="jj/mm/aaaa"></input>',
                template: '<p class="input-group"><input type="text" class="form-control" placeholder="jj/mm/aaaa" ng-model="dt" init-date="null" datepicker-popup="dd/MM/yyyy" is-open="opened" datepicker-options="dateOptions" ng-required="false" close-text="Fermer" /><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button></span></p>',
                replace: true,
                link: function (scope, elm, attrs, ngModelCtrl) {
                    ngModelCtrl.$formatters.length = 0;
                    ngModelCtrl.$parsers.length = 0;

                    scope.opened = false;

                    scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope.opened = true;
                    };

                    //scope.setDate = function (year, month, day) {
                    //    scope.dt = new Date(year, month, day);
                    //};

                    scope.dateOptions = {
                        formatYear: 'yyyy',
                        formatDay: 'dd',
                        formatMonth: 'MM',
                        startingDay: 1
                    };

                    //ngModelCtrl.$formatters.shift();
                    /*ngModelCtrl.$render = function () {
                     ngModelCtrl.$viewValue = new Date(ngModelCtrl.$viewValue);
                     var date = ngModelCtrl.$viewValue ? dateFilter(ngModelCtrl.$viewValue,'dd/MM/yyyy' ) : '';
                     elm.val(date);
                     
                     updateCalendar();
                     };*/

                    /*ngModelCtrl.$formatters.unshift(function (modelValue) {
                     console.log("hi");
                     console.log(modelValue);
                     return dateFilter(modelValue, 'dd/MM/yyyy');
                     });*/
                    /*ngModelCtrl.$parsers.unshift(function (viewValue) {
                     console.log("ho", viewValue);
                     return new Date(viewValue);
                     });*/
                }
            };
        });
//https://raw.githubusercontent.com/GrantMStevens/amCharts-Angular/master/dist/amChartsDirective.js
// 1.0.4
MetronicApp.directive('amChart', ['$q', function ($q) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                height: '@',
                width: '@',
                datas: '='
            },
            template: '<div class="amchart"></div>',
            link: function ($scope, $el) {
                var id = getIdForUseInAmCharts();
                $el.attr('id', id);
                var chart;

                // allow $scope.options to be a promise
                $q.when($scope.options).then(function (options) {
                    // we can't render a chart without any data
                    if (options.data) {
                        var renderChart = function (amChartOptions) {
                            var o = amChartOptions || options;

                            // set height and width
                            var height = $scope.height || '100%';
                            var width = $scope.width || '100%';

                            $el.css({
                                'height': height,
                                'width': width
                            });

                            // instantiate new chart object
                            if (o.type === 'xy') {
                                chart = o.theme ? new AmCharts.AmXYChart(AmCharts.themes[o.theme]) : new AmCharts.AmXYChart();
                            } else if (o.type === 'pie') {
                                chart = o.theme ? new AmCharts.AmPieChart(AmCharts.themes[o.theme]) : new AmCharts.AmPieChart();
                            } else if (o.type === 'funnel') {
                                chart = o.theme ? new AmCharts.AmFunnelChart(AmCharts.themes[o.theme]) : new AmCharts.AmFunnelChart();
                            } else if (o.type === 'radar') {
                                chart = o.theme ? new AmCharts.AmRadarChart(AmCharts.themes[o.theme]) : new AmCharts.AmRadarChart();
                            } else {
                                chart = o.theme ? new AmCharts.AmSerialChart(AmCharts.themes[o.theme]) : new AmCharts.AmSerialChart();
                            }

                            /** set some default values that amCharts doesnt provide **/
                            $q.when(o.data)
                                    .then(function (data) {

                                        chart.dataProvider = data;
                                        // if a category field is not specified, attempt to use the first field from an object in the array
                                        chart.categoryField = o.categoryField || Object.keys(o.data[0])[0];
                                        chart.startDuration = 0.5; // default animation length, because everyone loves a little pizazz

                                        // AutoMargin is on by default, but the default 20px all around seems to create unnecessary white space around the control
                                        chart.autoMargins = true;
                                        chart.marginTop = 0;
                                        chart.marginLeft = 0;
                                        chart.marginBottom = 0;
                                        chart.marginRight = 0;

                                        // modify default creditsPosition
                                        chart.creditsPosition = 'top-right';

                                        function generateGraphProperties(data) {
                                            // Assign Category Axis Properties
                                            if (o.categoryAxis) {
                                                var categoryAxis = chart.categoryAxis;

                                                if (categoryAxis) {
                                                    /* if we need to create any default values, we should assign them here */
                                                    categoryAxis.parseDates = true;

                                                    var keys = Object.keys(o.categoryAxis);
                                                    for (var i = 0; i < keys.length; i++) {
                                                        if (!angular.isObject(o.categoryAxis[keys[i]]) || angular.isArray(o.categoryAxis[keys[i]])) {
                                                            categoryAxis[keys[i]] = o.categoryAxis[keys[i]];
                                                        } else {
                                                            console.log('Stripped categoryAxis obj ' + keys[i]);
                                                        }
                                                    }
                                                    chart.categoryAxis = categoryAxis;
                                                }
                                            }

                                            // Create value axis

                                            /* if we need to create any default values, we should assign them here */

                                            var addValueAxis = function (a) {
                                                var valueAxis = new AmCharts.ValueAxis();

                                                var keys = Object.keys(a);
                                                for (var i = 0; i < keys.length; i++) {
                                                    valueAxis[keys[i]] = a[keys[i]];
                                                }
                                                chart.addValueAxis(valueAxis);
                                            };

                                            if (o.valueAxes && o.valueAxes.length > 0) {
                                                for (var i = 0; i < o.valueAxes.length; i++) {
                                                    addValueAxis(o.valueAxes[i]);
                                                }
                                            }

                                            //reusable function to create graph
                                            var addGraph = function (g) {
                                                var graph = new AmCharts.AmGraph();
                                                /** set some default values that amCharts doesnt provide **/
                                                // if a category field is not specified, attempt to use the second field from an object in the array as a default value
                                                if (g && o.data && o.data.length > 0) {
                                                    graph.valueField = g.valueField || Object.keys(o.data[0])[1];
                                                }
                                                graph.balloonText = '<span style="font-size:14px">[[category]]: <b>[[value]]</b></span>';
                                                if (g) {
                                                    var keys = Object.keys(g);
                                                    // iterate over all of the properties in the graph object and apply them to the new AmGraph
                                                    for (var i = 0; i < keys.length; i++) {
                                                        graph[keys[i]] = g[keys[i]];
                                                    }
                                                }
                                                chart.addGraph(graph);
                                            };

                                            // create the graphs
                                            if (o.graphs && o.graphs.length > 0) {
                                                for (var i = 0; i < o.graphs.length; i++) {
                                                    addGraph(o.graphs[i]);
                                                }
                                            } else {
                                                addGraph();
                                            }

                                            if (o.type === 'gantt' || o.type === 'serial' || o.type === 'xy') {
                                                var chartCursor = new AmCharts.ChartCursor();
                                                if (o.chartCursor) {
                                                    var keys = Object.keys(o.chartCursor);
                                                    for (var i = 0; i < keys.length; i++) {
                                                        if (typeof o.chartCursor[keys[i]] !== 'object') {
                                                            chartCursor[keys[i]] = o.chartCursor[keys[i]];
                                                        }
                                                    }
                                                }
                                                chart.addChartCursor(chartCursor);
                                            }

                                            if (o.chartScrollbar) {
                                                var scrollbar = new AmCharts.ChartScrollbar();
                                                var keys = Object.keys(o.chartScrollbar);
                                                for (var i = 0; i < keys.length; i++) {
                                                    scrollbar[keys[i]] = o.chartScrollbar[keys[i]];
                                                }
                                                chart.chartScrollbar = scrollbar;
                                            }

                                            if (o.balloon) {
                                                chart.balloon = o.balloon;
                                            }
                                        }

                                        function generatePieProperties() {
                                            if (o.balloon) {
                                                chart.balloon = o.balloon;
                                            }
                                        }

                                        if (o.legend) {
                                            var legend = new AmCharts.AmLegend();
                                            var keys = Object.keys(o.legend);
                                            for (var i = 0; i < keys.length; i++) {
                                                legend[keys[i]] = o.legend[keys[i]];
                                            }
                                            chart.legend = legend;
                                        }

                                        if (o.type === 'pie') {
                                            generatePieProperties();
                                        } else {
                                            generateGraphProperties();
                                        }

                                        if (o.titles) {
                                            for (var i = 0; i < o.titles.length; i++) {
                                                var title = o.titles[i];
                                                chart.addTitle(title.text, title.size, title.color, title.alpha, title.bold);
                                            }
                                            ;
                                        }

                                        if (o.export) {
                                            chart.amExport = o.export;
                                        }

                                        if (o.colors) {
                                            chart.colors = o.colors;
                                        }

                                        if (o.listeners) {
                                            for (var i = 0; i < o.listeners.length; i++) {
                                                chart.addListener(o.listeners[i].event, o.listeners[i].method);
                                            }
                                        }

                                        var addEventListeners = function (obj, chartObj) {
                                            for (var i = 0; i < obj.length; i++) {
                                                if (obj[i].listeners) {
                                                    var listeners = obj[i].listeners;
                                                    for (var l = 0; l < listeners.length; l++) {
                                                        chartObj[i].addListener(listeners[l].event, listeners[l].method);
                                                    }
                                                }
                                            }
                                        };

                                        var chartKeys = Object.keys(o);
                                        for (var i = 0; i < chartKeys.length; i++) {
                                            if (typeof o[chartKeys[i]] !== 'object' && typeof o[chartKeys[i]] !== 'function') {
                                                chart[chartKeys[i]] = o[chartKeys[i]];
                                            } else if (typeof o[chartKeys[i]] === 'object') {
                                                addEventListeners(o[chartKeys[i]], chart[chartKeys[i]]);
                                            }
                                        }

                                        // WRITE
                                        chart.write(id);

                                    });
                        }; //renderchart


                        // Render the chart
                        renderChart();


                        // EVENTS =========================================================================

                        $scope.$on('amCharts.triggerChartAnimate', function (event, id) {
                            if (id === $el[0].id || !id) {
                                chart.animateAgain();
                            }
                        });

                        $scope.$on('amCharts.updateData', function (event, data, id) {
                            if (id === $el[0].id || !id) {
                                chart.dataProvider = data;
                                chart.validateData();
                            }
                        });

                        $scope.$watch('datas', function (newValue, oldValue) {
                            chart.dataProvider = newValue;
                            chart.validateData();

                        });


                        $scope.$on('amCharts.validateNow', function (event, validateData, skipEvents, id) {
                            if (id === $el[0].id || !id) {
                                chart.validateNow(validateData === undefined ? true : validateData,
                                        skipEvents === undefined ? false : skipEvents);
                            }
                        });

                        $scope.$on('amCharts.renderChart', function (event, amChartOptions, id) {
                            if (id === $el[0].id || !id) {
                                chart.clear();
                                renderChart(amChartOptions);
                            }
                        });

                        $scope.$on('$destroy', function () {
                            chart.clear();
                        });
                    }
                });

                function getIdForUseInAmCharts() {
                    var id = $el[0].id;// try to use existing outer id to create new id

                    if (!id) {//generate a UUID
                        var guid = function guid() {
                            function s4() {
                                return Math.floor((1 + Math.random()) * 0x10000)
                                        .toString(16)
                                        .substring(1);
                            }

                            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                                    s4() + '-' + s4() + s4() + s4();
                        };
                        id = guid();
                    }
                    return id;
                }
            }
        };
    }]);
