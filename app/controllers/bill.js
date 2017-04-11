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
/* jshint multistr: true */

MetronicApp.controller('BillController', ['$scope', '$rootScope', '$http', '$window', '$filter', '$timeout', 'Bills', function($scope, $rootScope, $http, $window, $filter, $timeout, Bills) {

    var grid = new Datatable();
    var user = $rootScope.login;

    $scope.editable = false;

    $scope.bill = {
        entity: $rootScope.login.entity,
        datec: new Date(),
        lines: [],
        notes: []
    };

    $scope.tickets = [];
    $scope.dict = {};
    $scope.countTicket = 0;
    $scope.bills = [];
    $scope.status_id = "LIST";
    $scope.banks = [];

    // Init
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_bill_status", "fk_input_reason", "fk_paiement", "fk_bill_type", "fk_transport", "fk_payment_term", "fk_tva"];

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;
            //console.log(data);
        });

        $http({
            method: 'GET',
            url: '/erp/api/bank',
            params: {
                //entity: Global.user.entity
            }
        }).success(function(data, status) {
            $scope.banks = data;
        });

        if ($rootScope.$stateParams.Status) {
            $scope.status_id = $rootScope.$stateParams.Status;
            initDatatable({ status_id: $scope.status_id });
        } else
            initDatatable();

    });

    // Init ng-include
    $scope.$on('$includeContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.pageBodySolid = false;

        var dict = ["fk_bill_status", "fk_input_reason", "fk_paiement", "fk_bill_type", "fk_transport", "fk_payment_term", "fk_tva"];

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: dict
            }
        }).success(function(data, status) {
            $scope.dict = data;
            //console.log(data);
        });

    });

    $scope.ngIncludeInit = function(params, length) {
        $scope.params = params;
        initDatatable(params, length);
    };

    $scope.create = function() {
        var bill = new Bills(this.bill);
        bill.$save(function(response) {
            $rootScope.$state.go("bill.show", { id: response._id });
        });
    };


    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.productAutoComplete = function(val) {

        return $http.post('/erp/api/product/autocomplete', {
            take: 5,
            skip: 0,
            page: 1,
            pageSize: 5,
            price_level: $scope.bill.price_level,
            //                supplier: options.supplier,
            filter: {
                logic: 'and',
                filters: [{ value: val }]
            }
        }).then(function(res) {
            return res.data;
        });
    };

    // filter lines to show
    $scope.filterLine = function(line) {
        return line.isDeleted !== true;
    };

    $scope.checkLine = function(data) {
        //console.log(data);
        if (!data)
            return "La ligne produit ne peut pas être vide";
        if (!data.id)
            return "Le produit n'existe pas";
    };


    $scope.addProduct = function(data, index) {

        //console.log(data);

        for (var i in $scope.bill.lines) {
            if ($scope.bill.lines[i].idLine === index) {
                $scope.bill.lines[i] = {
                    pu_ht: data.pu_ht,
                    tva_tx: data.product.id.tva_tx,
                    discount: data.discount,
                    product: {
                        id: data.product.id._id,
                        name: data.product.id.ref,
                        label: data.product.id.label
                    },
                    description: ($scope.bill.lines[i].description ? $scope.bill.lines[i].description : data.product.id.description),
                    isNew: true,
                    qty: $scope.bill.lines[i].qty,
                    no_package: $scope.bill.lines[i].no_package, // nombre de pieces
                    weight: data.weight,
                    idLine: index
                };

                $scope.calculMontantHT($scope.bill.lines[i]);
            }
        }
    };

    var round = function(value, decimals) {
        if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
            return 0;
        return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
    };


    $scope.calculMontantHT = function(line, data, varname) {
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
        }

        if (!line.priceSpecific)
            return $http.post('/erp/api/product/price', {
                price_level: $scope.bill.price_level,
                qty: line.qty,
                _id: line.product.id
            }).then(function(res) {
                //console.log(res.data);

                // Fix null price
                if (!res.data.pu_ht)
                    res.data.pu_ht = 0;

                line.pu_ht = res.data.pu_ht;

                if (res.data.discount)
                    line.discount = res.data.discount;
                //return res.data;
                calculHT(line);
            });

        calculHT(line);
    };

    // cancel all changes
    $scope.cancel = function() {
        for (var i = $scope.bill.lines.length; i--;) {
            var line = $scope.bill.lines[i];
            // undelete
            if (line.isDeleted) {
                delete line.isDeleted;
            }
            // remove new 
            if (line.isNew) {
                $scope.bill.lines.splice(i, 1);
            }
        }

        $scope.findOne();
    };


    // add line
    $scope.addLine = function(lines) {
        lines.push({
            isNew: true,
            idLine: lines.length
        });
    };
    // mark line as deleted
    $scope.deleteLine = function(line) {
        line.isDeleted = true;
        return;
    };
    // Duplicate a line
    $scope.copyLine = function(line, lines) {

        var new_line = _.clone(line);
        delete new_line._id;
        delete new_line.id;
        delete new_line['$$hashKey'];
        new_line.isNew = true;
        new_line.idLine = lines.length;

        lines.push(new_line);
    };

    $scope.AddSubTotal = function(index) {
        $scope.bill.lines.splice(index + 1, 0, {
            pu_ht: null,
            tva_tx: null,
            discount: null,
            product: {
                id: null,
                name: "SUBTOTAL",
                label: "Sous-total"
            },
            description: "",
            isNew: true,
            qty: null
        });

        for (var i in $scope.bill.lines) {
            $scope.bill.lines[i].idLine = i;
        }
    };

    // up or down a line
    $scope.upDownLine = function(id, mode, lines) {
        //id = parseInt(id);

        var elem = lines[id];

        if (mode == 'UP') {
            lines[id] = lines[id - 1];
            lines[id - 1] = elem;
        } else {
            lines[id] = lines[id + 1];
            lines[id + 1] = elem;
        }

        $scope.update();
    };

    $scope.showStatus = function(val, dict) {
        if (!($scope.dict[dict] && $scope.bill[val]))
            return;
        var selected = $filter('filter')($scope.dict[dict].values, { id: $scope.bill[val] });

        return ($scope.bill[val] && selected && selected.length) ? selected[0].label : 'Non défini';
    };

    $scope.remove = function(bill) {
        if (!bill && grid) {
            return $http({
                method: 'DELETE',
                url: '/erp/api/bill',
                params: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }

        bill.$remove(function() {
            $rootScope.$state.go("bill.list");
        });
    };

    $scope.openUrl = function(url, param) {
        if (!grid)
            return;

        var params = {};

        if (!params.entity)
            params.entity = $rootScope.entity;

        params.id = grid.getSelectedRows();

        //$window.open($rootScope.buildUrl(url, params), '_blank');
        $http({
            method: 'POST',
            url: url,
            data: params,
            responseType: 'arraybuffer'
        }).success(function(data, status, headers) {
            headers = headers();

            var filename = headers['x-filename'];
            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        }).error(function(data) {
            console.log(data);
        });
    };


    $scope.update = function(options, callback) { //example options : {status: Status}
        var bill = $scope.bill;

        for (var i = bill.lines.length; i--;) {
            // actually delete lines
            if (bill.lines[i].isDeleted) {
                bill.lines.splice(i, 1);
            }
        }

        bill.$update(options, function(response) {

            $scope.bill = response;

            for (var i in $scope.bill.lines) {
                $scope.bill.lines[i].idLine = i;
            }

            if (response.Status == "DRAFT")
                $scope.editable = true;
            else
                $scope.editable = false;

            if (callback)
                callback(null, response);
        });
    };

    $scope.clone = function() {
        $scope.bill.$clone(function(response) {
            $rootScope.$state.go('bill.show', {
                id: response._id
            });
        });
    };

    $scope.findOne = function() {
        Bills.get({
            Id: $rootScope.$stateParams.id
        }, function(bill) {
            $scope.bill = bill;

            if (bill.Status == "DRAFT")
                $scope.editable = true;
            else
                $scope.editable = false;

            //on utilise idLine pour deffinier la ligne produit que nous voulons supprimer
            for (var i in $scope.bill.lines) {
                $scope.bill.lines[i].idLine = i;
            }

            $http({
                method: 'GET',
                url: 'api/ticket',
                params: {
                    find: { "linked.id": bill._id },
                    fields: "name ref updatedAt percentage Status task"
                }
            }).success(function(data, status) {
                if (status == 200)
                    $scope.tickets = data;

                $scope.countTicket = $scope.tickets.length;
            });

            $scope.totalOrders = 0;

            angular.forEach(bill.orders, function(order) {
                $scope.totalOrders += order.total_ht;
            });

            $scope.totalDeliveries = 0;

            angular.forEach(bill.deliveries, function(delivery) {
                $scope.totalDeliveries += delivery.total_ht;
            });

            /*$http({method: 'GET', url: '/erp/api/payment', params: {
                    find: {"bill.id": bill._id}
                }
            }).success(function (data, status) {
                if (status === 200) {
                    $scope.payments = data;

                    $scope.paid = 0;

                    for (var i = 0; i < data.length; i++) {
                        $scope.paid += data[i].credit;
                    }

                    $scope.billed = $scope.bill.total_ttc;
                    $scope.remainderToPay = $scope.billed - $scope.paid;
                }
            });*/

        }, function(err) {
            if (err.status == 401)
                $location.path("401.html");
        });
    };

    $scope.sendEmail = function() {
        $http.post('/erp/api/sendEmail', {
            to: this.bill.contacts,
            data: {
                title: 'Facture ' + this.bill.ref_client || "" + "(" + this.bill.ref + ")",
                subtitle: this.bill.client.name + (this.bill.ref_client ? " - Reference " + this.bill.ref_client : ""),
                message: 'Veuillez trouver ci-joint la facture ' + this.bill.ref + '. Cliquer sur le bouton ci-apres pour le telecharger.',
                url: '/erp/api/bill/download/' + this.bill._id,
                entity: this.bill.entity
            },
            ModelEmail: 'email_PDF'
        }).then(function(res) {
            //console.log(res);
            if (res.status == 200) {

                $scope.bill.history.push({
                    date: new Date(),
                    mode: 'email',
                    msg: 'email facture envoyee',
                    Status: 'notify',
                    author: {
                        id: $rootScope.login._id,
                        name: $rootScope.login.name
                    }
                });

                return $scope.update();
            }
            //return res.data;
        });
    };

    $scope.updateAddress = function(data) {
        // Only company name change
        if (this.editableBill)
            this.editableBill.$save();

        if (typeof data !== 'object') {
            $scope.bill.societe.name = data;
            return true;
        }

        //if(mode == 'bill')  {
        $scope.bill.cond_reglement_code = data.cond_reglement_code;
        $scope.bill.mode_reglement_code = data.mode_reglement_code;
        $scope.bill.bank_reglement = data.bank_reglement;
        $scope.bill.price_level = data.price_level;
        $scope.bill.commercial_id = data.commercial_id;
        //}
        //console.log(data);
        if (data.address) {
            $scope.bill.address = data.address.address;
            $scope.bill.zip = data.address.zip;
            $scope.bill.town = data.address.town;
        }

        return true;
    };

    function getUrl(params) {

        if (!params)
            params = {
                status_id: $scope.status_id
            };

        if (!params.entity)
            params.entity = $rootScope.entity;

        var url = $rootScope.buildUrl('/erp/api/bill/dt', params); // Build URL with json parameter
        //console.log(url);
        return url;
    }

    function initDatatable(params, length) {

        grid.init({
            src: $("#billList"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error 
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "bStateSave": (params ? false : true), // save datatable state(pagination, sort, etc) in cookie.
                "pageLength": length || 25, // default record count per page
                "ajax": {
                    "url": getUrl(params) // ajax source
                },
                "order": [
                    [1, "desc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool'
                }, {
                    data: "ref"
                }, {
                    data: "client.name",
                    defaultContent: "",
                    visible: (params && params['client.id'] ? false : true)
                }, {
                    data: "ref_client",
                    defaultContent: ""
                }, {
                    data: "datec",
                    defaultContent: ""
                }, {
                    data: "dater",
                    defaultContent: ""
                }, {
                    data: "commercial_id.name",
                    defaultContent: ""
                }, {
                    data: "total_ttc",
                    defaultContent: ""
                }, {
                    data: "Status"
                }, {
                    data: "entity",
                    defaultContent: "",
                    visible: user.multiEntities
                }, {
                    data: "updatedAt",
                    defaultContent: ""
                }, {
                    data: 'action'
                }]
            }
        });

        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function(e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("customActionType", "group_action");
                grid.setAjaxParam("customActionName", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });
    }

    $scope.find = function() {
        var url;
        //console.log(this.status_id);

        if ($scope.params) { // For ng-include in societe fiche
            $scope.params.status_id = this.status_id;
            url = getUrl($scope.params);
        } else
            url = getUrl({ status_id: this.status_id });

        grid.resetFilter(url);
    };

    $scope.addNote = function() {
        if (!this.note)
            return;

        var note = {};
        note.note = this.note;
        note.datec = new Date();
        note.author = {};
        note.author.id = user._id;
        note.author.name = user.firstname + " " + user.lastname;

        if (!$scope.bill.notes)
            $scope.bill.notes = [];

        $scope.bill.notes.push(note);
        $scope.update();
        this.note = "";
    };


    /*
     * NG-GRID for ticket list
     */

    $scope.filterOptionsTicket = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.gridOptionsTicket = {
        data: 'tickets',
        enableRowSelection: false,
        sortInfo: { fields: ["updatedAt"], directions: ["desc"] },
        filterOptions: $scope.filterOptionsTicket,
        i18n: 'fr',
        enableColumnResize: true,
        columnDefs: [
            { field: 'name', displayName: 'Titre', cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/ticket/{{row.getProperty(\'_id\')}}" data-tooltip-options=\'{"position":"right"}\' title=\'{{row.getProperty("task")}}\'><span class="icon-ticket"></span> {{row.getProperty(col.field)}}</a>' },
            { field: 'ref', displayName: 'Id' },
            { field: 'percentage', displayName: 'Etat', cellTemplate: '<div class="ngCellText"><progressbar class="progress-striped thin" value="row.getProperty(col.field)" type="success"></progressbar></div>' },
            { field: 'updatedAt', displayName: 'Dernière MAJ', cellFilter: "date:'dd-MM-yyyy HH:mm:ss'" }
        ]
    };

    $scope.updateInPlace = function(api, field, row) {
        if (!$scope.save) {
            $scope.save = { promise: null, pending: false, row: null };
        }
        $scope.save.row = row.rowIndex;

        if (!$scope.save.pending) {
            $scope.save.pending = true;
            $scope.save.promise = $timeout(function() {
                $http({
                    method: 'PUT',
                    url: api + '/' + row.entity._id + '/' + field,
                    data: {
                        value: row.entity[field]
                    }
                }).
                success(function(data, status) {
                    if (status == 200) {
                        if (data.value) {
                            if (data.field === "Status")
                                for (var i = 0; i < $scope.status.length; i++) {
                                    if ($scope.status[i].id === data.value)
                                        row.entity.Status = $scope.status[i];
                                }
                        }
                    }
                });

                $scope.save.pending = false;
            }, 500);
        }
    };

    $scope.changeStatus = function(Status, id) {
        if (!id) {
            $scope.bill.Status = Status;
            return $scope.update({ Status: Status });
        }

        // ChangeStatus multi-bills
        if (!grid)
            return;

        var params = {};
        params.id = grid.getSelectedRows();

        $http({
            method: 'POST',
            url: '/erp/api/bill/validate',
            data: params
        }).success(function(data, status, headers) {
            $scope.find();
        });
    };

    $scope.exportAccounting = function(id) {
        if (!id && grid) {
            return $http({
                method: 'PUT',
                url: '/erp/api/bill/accounting',
                data: {
                    id: grid.getSelectedRows()
                }
            }).success(function(data, status) {
                if (status === 200)
                    $scope.find();
            });
        }
        return $http({
            method: 'PUT',
            url: '/erp/api/bill/accounting',
            data: {
                id: id //grid.getSelectedRows()
            }
        }).success(function(data, status) {
            if (status === 200 && id)
                $scope.findOne();
            else
                $scope.find();
        });
    };

    $scope.filterOptionsPayment = {
        filterText: "",
        useExternalFilter: false
    };

}]);

MetronicApp.controller('BoxBillController', ['$rootScope', '$scope', '$http', '$timeout', '$q', function($rootScope, $scope, $http, $timeout, $q) {

    var loaded = {};
    $scope.caData = {
        graph: []
    };

    $scope.loadCaGraph = function(date, mode) {
        loaded.caGraph = true;
        if (!mode)
            mode = "YEAR";

        $scope.date = date;
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/caGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            console.log(data);
            $scope.caData = data;
            //console.log('Updates');

            return $scope.graphData = [];
            $scope.graphData = [{
                "date": "2012-01-05",
                "distance": 480,
                "townName": "Miami",
                //"townName2": "Miami",
                "townSize": 10,
                "latitude": 25.83,
                "duration": 501
            }, {
                "date": "2012-01-06",
                "distance": 386,
                "townName": "Tallahassee",
                "townSize": 7,
                "latitude": 30.46,
                "duration": 443
            }, {
                "date": "2012-01-07",
                "distance": 348,
                "townName": "New Orleans",
                "townSize": 10,
                "latitude": 29.94,
                "duration": 405
            }, {
                "date": "2012-01-08",
                "distance": 238,
                "townName": "Houston",
                //"townName2": "Houston",
                "townSize": 16,
                "latitude": 29.76,
                "duration": 309
            }, {
                "date": "2012-01-09",
                "distance": 218,
                "townName": "Dalas",
                "townSize": 17,
                "latitude": 32.8,
                "duration": 287
            }, {
                "date": "2012-01-10",
                "distance": 349,
                "townName": "Oklahoma City",
                "townSize": 11,
                "latitude": 35.49,
                "duration": 485
            }, {
                "date": "2012-01-11",
                "distance": 603,
                "townName": "Kansas City",
                "townSize": 10,
                "latitude": 39.1,
                "duration": 890
            }, {
                "date": "2012-01-12",
                "distance": 534,
                "townName": "Denver",
                //"townName2": "Denver",
                "townSize": 18,
                "latitude": 39.74,
                "duration": 810
            }, {
                "date": "2012-01-13",
                "townName": "Salt Lake City",
                "townSize": 12,
                "distance": 425,
                "duration": 670,
                "latitude": 40.75,
                "alpha": 0.4
            }, {
                "date": "2012-01-14",
                "latitude": 36.1,
                "duration": 470,
                "townName": "Las Vegas",
                //"townName2": "Las Vegas",
                "bulletClass": "lastBullet"
            }, {
                "date": "2012-01-15"
            }];

            console.log($scope.graphData);
        });
    };

    $scope.loadCommercialCa = function(dateRange) {
        loaded.commercialCa = true;

        // Previsionnel
        /*$http({method: 'GET', url: 'api/europexpress/billing/ca'
         }).success(function(ca, status) {
         console.log(ca);
         $scope.familles.prev = ca;
         });*/

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCommercial',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCommercialCa = ca.data;

            $scope.dataCommercialCaTotal = ca.total;
        });
    };

    $scope.loadCustomerCa = function(dateRange) {
        loaded.customerCa = true;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caCustomer',
            params: {
                start: dateRange.start,
                end: dateRange.end
            }
        }).success(function(ca, status) {
            //console.log(ca);
            $scope.dataCustomerCa = ca.data;

            $scope.dataCustomerCaTotal = 0;
            angular.forEach(ca.data, function(data) {
                $scope.dataCustomerCaTotal += data.total_ht;
            });
        });
    };

    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        $scope.date = data;

        if (loaded.commercialCa)
            $scope.loadCommercialCa(data);

        if (loaded.customerCa)
            $scope.loadCustomerCa(data);

        $scope.loadCaFamily(data, $scope.options);
    });
    $scope.loadCaFamily = function(date, options) {
        $scope.date = date;
        $scope.options = options;

        $http({
            method: 'GET',
            url: '/erp/api/stats/caFamily',
            params: {
                start: date.start,
                end: date.end,
                societe: options
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caFamily = data;
        });

        $http({
            method: 'GET',
            url: '/erp/api/stats/caEvolution',
            params: {
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caEvolution = data;
        });

        var mode = "YEAR";
        $scope.year = new Date();

        $http({
            method: 'GET',
            url: '/erp/api/stats/caGraph',
            params: {
                graph: true,
                mode: mode,
                start: date.start,
                end: date.end
            }
        }).success(function(data, status) {
            //console.log(data);
            $scope.caData = data;

            /*
             $scope.graphData = [{
             "date": "2012-01-05",
             "distance": 480,
             "townName": "Miami",
             //"townName2": "Miami",
             "townSize": 10,
             "latitude": 25.83,
             "duration": 501
             }, {
             "date": "2012-01-06",
             "distance": 386,
             "townName": "Tallahassee",
             "townSize": 7,
             "latitude": 30.46,
             "duration": 443
             }, {
             "date": "2012-01-07",
             "distance": 348,
             "townName": "New Orleans",
             "townSize": 10,
             "latitude": 29.94,
             "duration": 405
             }, {
             "date": "2012-01-08",
             "distance": 238,
             "townName": "Houston",
             //"townName2": "Houston",
             "townSize": 16,
             "latitude": 29.76,
             "duration": 309
             }, {
             "date": "2012-01-09",
             "distance": 218,
             "townName": "Dalas",
             "townSize": 17,
             "latitude": 32.8,
             "duration": 287
             }, {
             "date": "2012-01-10",
             "distance": 349,
             "townName": "Oklahoma City",
             "townSize": 11,
             "latitude": 35.49,
             "duration": 485
             }, {
             "date": "2012-01-11",
             "distance": 603,
             "townName": "Kansas City",
             "townSize": 10,
             "latitude": 39.1,
             "duration": 890
             }, {
             "date": "2012-01-12",
             "distance": 534,
             "townName": "Denver",
             //"townName2": "Denver",
             "townSize": 18,
             "latitude": 39.74,
             "duration": 810
             }, {
             "date": "2012-01-13",
             "townName": "Salt Lake City",
             "townSize": 12,
             "distance": 425,
             "duration": 670,
             "latitude": 40.75,
             "alpha": 0.4
             }, {
             "date": "2012-01-14",
             "latitude": 36.1,
             "duration": 470,
             "townName": "Las Vegas",
             //"townName2": "Las Vegas",
             "bulletClass": "lastBullet"
             }, {
             "date": "2012-01-15"
             }];*/

        });
    };

    $scope.amChartOptions = {
        type: "serial",
        language: "fr",
        decimalSeparator: ".",
        thousandsSeparator: " ",
        fontSize: 12,
        fontFamily: "Open Sans",
        dataDateFormat: "YYYY-MM-DD",
        data: [],
        addClassNames: true,
        startDuration: 1,
        color: "#6c7b88",
        marginLeft: 0,
        categoryField: "date",
        categoryAxis: {
            parseDates: true,
            minPeriod: "MM",
            autoGridCount: false,
            gridCount: 50,
            gridAlpha: 0.1,
            gridColor: "#FFFFFF",
            axisColor: "#555555",
            dateFormats: [{
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'MMM DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }]
        },
        valueAxes: [{
            id: "a1",
            title: "Chiffre d'affaires",
            gridAlpha: 0,
            axisAlpha: 0
        }, {
            id: "a2",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            labelsEnabled: false
        }, {
            id: "a3",
            //title: "duration",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0,
            //inside: true,
            duration: "mm",
            labelsEnabled: false,
            durationUnits: {
                DD: "d. ",
                hh: "h ",
                mm: "min",
                ss: ""
            }
        }],
        graphs: [{
            id: "g1",
            valueField: "total_ht",
            title: "CA HT",
            type: "column",
            fillAlphas: 0.7,
            valueAxis: "a1",
            balloonText: "[[value]] HT",
            legendValueText: "[[value]] HT",
            legendPeriodValueText: "total: [[value.sum]] HT",
            lineColor: "#08a3cc",
            alphaField: "alpha"
        }, {
            id: "g2",
            valueField: "estimated",
            classNameField: "bulletClass",
            title: "Previsionnel",
            type: "line",
            valueAxis: "a2",
            lineColor: "#786c56",
            lineThickness: 1,
            legendValueText: "[[description]]/[[value]]",
            descriptionField: "townName",
            bullet: "round",
            bulletSizeField: "townSize",
            bulletBorderColor: "#02617a",
            bulletBorderAlpha: 1,
            bulletBorderThickness: 2,
            bulletColor: "#89c4f4",
            labelText: "[[townName2]]",
            labelPosition: "right",
            balloonText: "latitude:[[value]]",
            showBalloon: true,
            animationPlayed: true
        }, {
            id: "g3",
            title: "N-1",
            valueField: "N_1",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#e26a6a",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#e26a6a",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }, {
            id: "g4",
            title: "N-2",
            valueField: "N_2",
            type: "line",
            valueAxis: "a1",
            lineAlpha: 0.8,
            lineColor: "#3ea7a0",
            balloonText: "[[value]]",
            lineThickness: 1,
            legendValueText: "[[value]]",
            legendPeriodValueText: "total: [[value.sum]] HT",
            bullet: "square",
            bulletBorderColor: "#3ea7a0",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 0.8,
            dashLengthField: "dashLength",
            animationPlayed: true
        }],
        chartCursor: {
            zoomable: false,
            categoryBalloonDateFormat: "MM",
            cursorAlpha: 0,
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,
            valueBalloonsEnabled: false
        },
        legend: {
            bulletType: "round",
            equalWidths: false,
            valueWidth: 120,
            useGraphSettings: true,
            color: "#6c7b88"
        }
    };

}]);