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

MetronicApp.controller('SocieteController', ['$scope', '$rootScope', '$http', '$modal', '$filter', /*'Upload',*/ '$timeout', 'dialogs', 'superCache', 'Societes',
    function($scope, $rootScope, $http, $modal, $filter, /*Upload,*/ $timeout, $dialogs, superCache, Societes) {
        var user = $rootScope.login;
        $scope.backTo = 'societe.list';
        $scope.search = {
            salesPerson: {
                value: []
            },
            Status: {
                value: []
            },
            entity: {
                value: [],
            },
            lastOrder: {
                value: []
            },
            createdAt: {
                value: []
            },
            isProspect: {
                value: [true, true]
            },
            isCustomer: {
                value: [true, true]
            },
            isSupplier: {
                value: [true, true]
            },
            isSubcontractor: {
                value: [true, true]
            }
        };

        $scope.page = {
            limit: 25,
            page: 1,
            total: 0
        };
        $scope.sort = {
            fullName: 1
        };

        if (typeof superCache.get("SocieteController") !== "undefined") {
            $scope.page = superCache.get("SocieteController").page;
            $scope.search = superCache.get("SocieteController").search;
            $scope.sort = superCache.get("SocieteController").sort;
        }

        // This month
        $scope.date = {
            start: moment().startOf('year').toDate(),
            end: moment().endOf('month').subtract(1, 'months').toDate()
        };

        $scope.validSiret = false;
        $scope.societe = {
            entity: $rootScope.entity,
            isCutomer: true,
            isSupplier: false,
            VATIsUsed: true,
            price_level: "BASE",
            iban: {}
        };
        $scope.siretFound = "";
        $scope.societes = [];
        $scope.entities = [];
        $scope.banks = [];
        $scope.segementations = [];
        $scope.gridOptionsSociete = {};
        $scope.gridOptionsSegementation = {};
        $scope.totalCountSociete = 0;
        $scope.dict = {};
        $scope.commercialList = [];
        $scope.$error = true;

        var gridSociete = new Datatable();

        $scope.editable = $rootScope.login.rights.societe.write;

        $scope.importExport = [{
                id: null,
                name: "Aucun"
            },
            {
                id: "EUROP",
                name: "Zone Europe"
            },
            {
                id: "INTER",
                name: "International"
            }
        ];

        $scope.commercial_id = superCache.get("SocieteController.commercial_id");
        $scope.status_id = superCache.get("SocieteController.status_id");

        $scope.setCache = function(idx, value) {
            superCache.put("SocieteController." + idx, value);
        };

        $scope.clearCache = function() {
            superCache.removeAll();
        };

        $scope.forSales = $rootScope.$stateParams.forSales == 0 ? 0 : 1;
        $scope.type = $rootScope.$stateParams.type;

        $scope.resetFilter = function() {
            superCache.removeAll();
            $rootScope.$state.reload();
        }

        $scope.checkedAll = function() {
            if (!this.checkAll)
                this.grid = {};
            for (var i = 0; i < $scope.customers.length; i++)
                if (this.checkAll)
                    this.grid[$scope.customers[i]._id] = true;
        }

        // Init
        $scope.$on('$viewContentLoaded', function() {

            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            if ($rootScope.$stateParams.id && $rootScope.$state.current.name === "societe.show")
                return $rootScope.$state.go('societe.show.company');

            var dict = ["fk_stcomm", "fk_typent", "fk_effectif", "fk_forme_juridique", "fk_payment_term", "fk_paiement", "fk_civilite", "fk_user_status"];

            $http({
                method: 'GET',
                url: '/erp/api/dict',
                params: {
                    dictName: dict
                }
            }).success(function(data, status) {
                $scope.dict = data;
            });

            $scope.$dict = {};

            $http({
                method: 'GET',
                url: '/erp/api/nationality'
            }).success(function(data, status) {
                $scope.$dict.nationality = data;
                //console.log(data);
            });

            $scope.$dict.language = $rootScope.languages;

            $http({
                method: 'GET',
                url: '/erp/api/accountsCategories/getAll'
            }).success(function(data, status) {
                $scope.$dict.categories = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/getForDd',
                params: {
                    isEmployee: true
                }
            }).success(function(data, status) {
                $scope.$dict.employees = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/employees/bySalesAccount'
            }).success(function(data, status) {
                $scope.$dict.salesPerson = data.data;
                //console.log(data);
            });

            $http({
                method: 'GET',
                url: '/erp/api/product/prices/priceslist/select',
                params: {
                    cost: false
                }
            }).success(function(data) {
                $scope.$dict.pricesLists = data.data;
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

            if (!$rootScope.$stateParams.id) {
                $scope.find();
                initCharts();
            } else
                $scope.findOne();
        });

        $scope.find = function() {
            $scope.grid = {};
            $scope.checkAll = false;

            superCache.put("SocieteController", {
                sort: $scope.sort,
                search: $scope.search,
                page: $scope.page
            });

            Metronic.blockUI({
                target: '.waiting',
                animate: false,
                boxed: true,
                overlayColor: 'gray'
            });

            var query = {
                forSales: ($scope.forSales ? true : false),
                quickSearch: $scope.quickSearch,
                filter: $scope.search,
                viewType: 'list',
                contentType: 'societe',
                limit: $scope.page.limit,
                page: $scope.page.page,
                sort: $scope.sort
            };

            if (this.type) {
                delete query.forSales;
                query.filter.type = {
                    value: [this.type]
                };
            } else
                delete query.filter.type;

            //console.log(query);


            Societes.query(query, function(data, status) {
                console.log("societes", data);
                $scope.page.total = data.total;
                $scope.customers = data.data;
                $scope.totalAll = data.totalAll;
                $timeout(function() {
                    Metronic.unblockUI('.waiting');
                }, 0);
            });
        };

        $scope.remove = function(societe) {
            if (!societe && gridSociete) {
                return $http({
                    method: 'DELETE',
                    url: '/erp/api/societe',
                    params: {
                        id: gridSociete.getSelectedRows()
                    }
                }).success(function(data, status) {
                    if (status === 200)
                        $scope.find();
                });
            }

            societe.$remove(function() {
                $rootScope.$state.go("societe.list");
            });
        };

        $scope.checkCodeClient = function(data) {
            if (!this.societe.salesPurchases || !this.societe.salesPurchases.ref || this.societe.salesPurchases.ref.length < 4)
                return $scope.$error = true;

            return Societes.query({
                filter: {
                    ref: {
                        value: [this.societe.salesPurchases.ref.toUpperCase()],
                    }
                },
                viewType: 'list',
                contentType: 'societe',
                field: "name contatInfo phones emails"
            }, function(data) {
                //console.log(data);
                if (data && data.total && data.data[0]._id != $scope.societe._id)
                    return $scope.$error = true;

                return $scope.$error = false;
            });


            return $http.get('/erp/api/societe/' + data).then(function(societe) {
                if (!societe.data)
                    return $scope.$error = false;

                //console.log(societe.data);
                //console.log($scope.societe);
                if (societe.data._id && $scope.societe._id !== societe.data._id)
                    return $scope.$error = true;

                return $scope.$error = false;
            });

        };

        $scope.create = function() {
            var societe = new Societes(this.societe);

            societe.$save(function(response) {
                //console.log(response);
                $rootScope.$state.go("societe.show", {
                    id: response._id
                });
                //$location.path("societe/" + response._id);
            });
        };

        $scope.update = function(callback) {
            var societe = $scope.societe;

            societe.$update(function(response) {
                if (callback)
                    return callback(response);

                return $scope.findOne();
            });
        };

        $scope.findSegmentation = function() {
            $http({
                method: 'GET',
                url: '/erp/api/societe/segmentation'
            }).success(function(data, status) {
                $scope.segmentations = data;
                $scope.countSegmentations = data.length;
            });
        };

        $scope.findOne = function() {
            Societes.get({
                Id: $rootScope.$stateParams.id
            }, function(societe) {
                $scope.societe = societe;

                $scope.checkCodeClient();

                if ($rootScope.$stateParams.id && $rootScope.$state.current.name === "societe.show")
                    if (societe.type == "Company")
                        return $rootScope.$state.go('societe.show.company');
                    else
                        return $rootScope.$state.go('societe.show.contact');

                //console.log(societe);

                $http({
                    method: 'GET',
                    url: '/erp/api/report',
                    params: {
                        find: {
                            "societe.id": societe._id
                        },
                        fields: "dateReport model author.name comment realised lead actions createdAt"
                    }
                }).success(function(data, status) {

                    $scope.reports = data;

                    $scope.countReports = $scope.reports.length;
                });

                $http({
                    method: 'GET',
                    url: '/erp/api/lead',
                    params: {
                        "societe.id": societe._id
                    }
                }).success(function(data, status) {

                    $scope.leads = data;

                    $scope.countLeads = $scope.leads.length;
                });

                $http({
                    method: 'GET',
                    url: '/erp/api/buy',
                    params: {
                        find: {
                            "fournisseur.id": societe._id
                        },
                        fields: "title ref datec Status total_ht"
                    }
                }).success(function(data, status) {
                    if (status !== 200)
                        return;
                    if (!data.requestBuy)
                        return;


                    $scope.requestBuy = data;

                    $scope.TotalBuy = 0;
                    angular.forEach($scope.requestBuy, function(row) {
                        if (row.Status.id === "PAYED")
                            $scope.TotalBuy += row.total_ht;
                    });
                    $scope.countBuy = $scope.requestBuy.length;
                });

                $http({
                    method: 'GET',
                    url: '/erp/api/bill',
                    params: {
                        "client.id": societe._id
                    }
                }).success(function(data, status) {

                    $scope.bills = data;
                    $scope.countBills = $scope.bills.length;
                });

                //pageTitle.setTitle('Fiche ' + $scope.societe.name);
                $scope.checklist = 0;
                for (var i in societe.checklist)
                    if (societe.checklist[i])
                        $scope.checklist++;
            }, function(err) {
                if (err.status == 401)
                    $location.path("401.html");
            });

            $http({
                method: 'GET',
                url: '/erp/api/buy/status/select',
                params: {
                    field: "Status"
                }
            }).success(function(data, status) {
                $scope.status = data;
            });
        };

        $scope.updateInPlace = function(api, field, row, newdata) {
            if (!$scope.save) {
                $scope.save = {
                    promise: null,
                    pending: false,
                    row: null
                };
            }
            $scope.save.row = row.rowIndex;

            if (!$scope.save.pending) {
                $scope.save.pending = true;
                $scope.save.promise = $timeout(function() {
                    $http({
                        method: 'PUT',
                        url: '/' + api + '/' + row.entity._id + '/' + field,
                        data: {
                            oldvalue: row.entity[field],
                            value: newdata
                        }
                    }).
                    success(function(data, status) {
                        if (status == 200) {
                            if (data) {
                                row.entity = data;
                            }
                        }
                    });

                    $scope.save.pending = false;
                }, 200);
            }

            return false;
        };

        /*
         * NG-GRID for societe segmentation list
         */

        $scope.filterOptionsSegmentation = {
            filterText: "",
            useExternalFilter: false
        };
        $scope.gridOptionsSegementation = {
            data: 'segmentations',
            enableRowSelection: false,
            filterOptions: $scope.filterOptionsSegmentation,
            sortInfo: {
                fields: ["_id"],
                directions: ["asc"]
            },
            //showFilter:true,
            enableColumnResize: true,
            enableCellSelection: true,
            enableCellEditOnFocus: true,
            i18n: 'fr',
            columnDefs: [{
                field: '_id',
                displayName: 'Segmentation',
                enableCellEdit: false
            }, {
                field: 'count',
                displayName: 'Nombre',
                cellClass: "align-right",
                enableCellEdit: false
            }, {
                field: 'attractivity',
                displayName: 'Attractivité',
                cellClass: "align-right",
                editableCellTemplate: '<input type="number" step="1" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateSegmentation(row)"/>'
            }, {
                displayName: "Actions",
                enableCellEdit: false,
                width: "100px",
                cellTemplate: '<div class="ngCellText align-center"><div class="button-group align-center compact children-tooltip"><button ng-disabled="!login.societe.segmentation" class="button icon-pencil" title="Renommer" ng-click="renameSegmentation(row)"></button></button><button ng-disabled="!login.societe.segmentation" class="button red-gradient icon-trash" title="Supprimer" ng-confirm-click="Supprimer la segmentation ?" confirmed-click="removeSegmentation(row)"></button></div></div>'
            }]
        };

        $scope.updateSegmentation = function(row) {
            if (!$scope.save) {
                $scope.save = {
                    promise: null,
                    pending: false,
                    row: null
                };
            }
            $scope.save.row = row.rowIndex;

            var d = new Date();

            if (!$scope.save.pending) {
                $scope.save.pending = true;
                $scope.save.promise = $timeout(function() {
                    $http({
                        method: 'PUT',
                        url: '/erp/api/societe/segmentation',
                        data: row.entity
                    }).success(function(data, status) {
                        $scope.save.pending = false;
                    });
                }, 200);
            }
        };

        $scope.removeSegmentation = function(row) {
            for (var i = 0; i < $scope.segmentations.length; i++) {
                if (row.entity._id === $scope.segmentations[i]._id) {
                    $http({
                        method: 'DELETE',
                        url: '/erp/api/societe/segmentation',
                        data: row.entity
                    }).success(function(data, status) { // FIXME function in a loop !
                        $scope.segmentations.splice(i, 1);
                        $scope.countSegmentations--;
                    });
                    break;
                }
            }
        };

        $scope.renameSegmentation = function(row) {
            var dlg = null;
            for (var i = 0; i < $scope.segmentations.length; i++) {
                if (row.entity._id === $scope.segmentations[i]._id) {
                    dlg = $dialogs.create('rename.html', 'SocieteSegmentationRenameController', row.entity, {
                        key: false,
                        back: 'static'
                    });
                    dlg.result.then(function(newval) { // FIXME function in a loop !

                        //console.log(newval);
                        $http({
                            method: 'POST',
                            url: '/erp/api/societe/segmentation',
                            data: {
                                old: row.entity._id,
                                new: newval
                            }
                        }).success(function(data, status) { // FIXME function in a loop !
                            $scope.findSegmentation();
                        });
                    }, function() { // FIXME function in a loop !
                    });

                    break;
                }
            }
        };


        //$scope.chartFunnelData = [[]];

        function initCharts() {
            $http({
                method: 'GET',
                url: '/erp/api/societe/statistic',
                params: {
                    entity: $rootScope.entity,
                    //name: Global.user.name,
                    commercial_id: $scope.commercial_id
                }
            }).success(function(data, status) {
                var series = [];
                for (var i = 0; i < data.commercial.length; i++) {
                    series.push({
                        label: data.commercial[i]._id.name
                    });
                }

                $scope.commercialList = data.commercial;

                /* $scope.chartOptions.series = series;
                 //-- Other available options
                 var xaxis = [];
                 for (var i = 0; i < data.status.length; i++) {
                 xaxis.push(data.status[i].label);
                 }
                 // height: pixels or percent
                 $scope.chartOptions.axes.xaxis.ticks = xaxis;
                 // width: pixels or percent
                 var funnelData = [];
                 $scope.chartFunnelData = [];
                 for (var i = 0; i < data.own.length; i++) {
                 var tab = [];
                 tab.push(data.own[i]._id.label);
                 tab.push(data.own[i].count);

                 funnelData.push(tab);
                 }
                 //console.log(funnelData);
                 $scope.chartFunnelData.push(funnelData);
                 */
            });
        }
        /*
         $scope.chartOptions = {
         // The "seriesDefaults" option is an options object that will
         // be applied to all series in the chart.
         seriesDefaults: {
         renderer: jQuery.jqplot.BarRenderer,
         rendererOptions: {
         fillToZero: true,
         barPadding: 4
         }
         //pointLabels: {show: true, location: 'n', edgeTolerance: -15}
         },
         // Custom labels for the series are specified with the "label"
         // option on the series option.  Here a series option object
         // is specified for each series.
         series: [],
         seriesColors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
         "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
         ],
         textColor: "#fff",
         // Show the legend and put it outside the grid, but inside the
         // plot container, shrinking the grid to accomodate the legend.
         // A value of "outside" would not shrink the grid and allow
         // the legend to overflow the container.
         legend: {
         show: true,
         placement: 'insideGrid'
         },
         axes: {
         // Use a category axis on the x axis and use our custom ticks.
         xaxis: {
         renderer: jQuery.jqplot.CategoryAxisRenderer,
         ticks: []
         },
         // Pad the y axis jsust a little so bars can get close to, but
         // not touch, the grid boundaries.  1.2 is the default padding.
         yaxis: {
         pad: 1.05,
         padMin: 0,
         tickOptions: {
         formatString: '%d',
         color: 'white'
         }
         }
         },
         grid: {
         backgroundColor: 'transparent',
         drawGridlines: false,
         drawBorder: false
         },
         highlighter: {
         sizeAdjust: 0,
         tooltipLocation: 'n',
         tooltipAxes: 'y',
         tooltipFormatString: '<b><span>%d</span></b>',
         useAxesFormatters: false,
         show: true
         },
         //highlighter: {
         // show: true,
         // sizeAdjust: 7.5
         // },
         cursor: {
         show: false
         }
         };*/
        //return this.point.name + ' : ' + this.y;
        /*$scope.chartFunnelOptions = {
         // The "seriesDefaults" option is an options object that will
         // be applied to all series in the chart.
         title: 'Statistique du porte-feuille ' + user.firstname + " " + user.lastname[0] + ".",
         seriesDefaults: {
         renderer: jQuery.jqplot.FunnelRenderer,
         rendererOptions: {
         sectionMargin: 1,
         widthRatio: 0.3,
         showDataLabels: true
         }
         //pointLabels: {show: true, location: 'n', edgeTolerance: -15}
         },
         // Custom labels for the series are specified with the "label"
         // option on the series option.  Here a series option object
         // is specified for each series.
         series: [],
         seriesColors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
         "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
         ],
         textColor: "#fff",
         // Show the legend and put it outside the grid, but inside the
         // plot container, shrinking the grid to accomodate the legend.
         // A value of "outside" would not shrink the grid and allow
         // the legend to overflow the container.
         legend: {
         show: true,
         placement: 'insideGrid'
         },

         grid: {
         backgroundColor: 'transparent',
         drawGridlines: false,
         drawBorder: false
         },
         cursor: {
         show: false
         }
         };*/

        $scope.addNote = function() {
            if (!this.note && !this.note.note)
                return;

            var note = {};
            note.note = this.note.note;
            note.css = this.note.css;
            note.datec = new Date();
            note.author = $rootScope.login._id;

            if (!$scope.societe.notes)
                $scope.societe.notes = [];

            $scope.societe.notes.push(note);
            $scope.update();
            this.note = {};
        };

        var iconsFilesList = {};

        /**
         * Get fileType for icon
         */
        $scope.getFileTypes = function() {
            $http({
                method: 'GET',
                url: '/erp/api/dict/filesIcons'
            }).
            success(function(data, status) {
                if (status == 200) {
                    iconsFilesList = data;
                }
            });
        };

        $scope.onFileSelect = function($files, varname) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                if ($scope.societe)
                    Upload.upload({
                        url: '/erp/api/file/societe/' + $scope.societe._id,
                        method: 'POST',
                        data: {
                            varname: varname
                        },
                        file: file
                    }).progress(function(evt) { // FIXME function in a loop !
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total, 10));
                    }).success(function(data, status, headers, config) { // FIXME function in a loop !
                        // file is uploaded successfully
                        //$scope.myFiles = "";
                        //console.log(data);
                        //if (!data.update) // if not file update, add file to files[]
                        //  $scope.societe.files.push(data.file);
                        //$scope.societe = data;
                        $scope.findOne();
                    });
                //.error(...)
                //.then(success, error, progress);
            }
        };

        $scope.suppressFile = function(id, fileName, idx) {
            $http({
                method: 'DELETE',
                url: '/erp/api/societe/file/' + id + '/' + fileName
            }).
            success(function(data, status) {
                if (status == 200) {
                    $scope.societe.files.splice(idx, 1);
                }
            });
        };

        $scope.fileType = function(name) {
            if (typeof iconsFilesList[name.substr(name.lastIndexOf(".") + 1)] == 'undefined')
                return iconsFilesList["default"];

            return iconsFilesList[name.substr(name.lastIndexOf(".") + 1)];
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
            sortInfo: {
                fields: ["updatedAt"],
                directions: ["desc"]
            },
            filterOptions: $scope.filterOptionsTicket,
            i18n: 'fr',
            enableColumnResize: true,
            columnDefs: [{
                field: 'name',
                displayName: 'Titre',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/ticket/{{row.getProperty(\'_id\')}}" data-tooltip-options=\'{"position":"right"}\'><span class="icon-ticket"></span> {{row.getProperty("ref")}} - {{row.getProperty(col.field)}}</a>'
            }, {
                field: 'task',
                displayName: 'Tâche'
            }, {
                field: 'percentage',
                displayName: 'Etat',
                cellTemplate: '<div class="ngCellText"><progressbar class="progress-striped thin" value="row.getProperty(col.field)" type="success"></progressbar></div>'
            }, {
                field: 'updatedAt',
                displayName: 'Dernière MAJ',
                cellFilter: "date:'dd-MM-yyyy HH:mm:ss'"
            }]
        };

        $scope.gridOptionsLeads = {
            data: 'leads',
            enableRowSelection: false,
            i18n: 'fr',
            enableColumnResize: true,
            sortInfo: {
                fields: ['dueDate'],
                directions: ['desc']
            },
            columnDefs: [
                // TODO Type de projet ???
                {
                    field: 'name',
                    displayName: 'Nom',
                    cellTemplate: '<div class="ngCellText"><a ng-click="findLead(row.getProperty(\'_id\'))" title=\'{{row.getProperty(col.field)}}\'><span class="icon-briefcase"></span> {{row.getProperty(col.field)}}</a>'
                }, {
                    field: 'dueDate',
                    displayName: 'Date échéance',
                    cellFilter: "date:'dd/MM/yyyy'"
                }, {
                    field: 'status',
                    displayName: 'Etat',
                    cellTemplate: '<div class="ngCellText align-center"><small class="tag {{row.getProperty(\'Status.css\')}} glossy">{{row.getProperty(\'Status.name\')}}</small></div>'
                }, {
                    field: 'potential',
                    displayName: 'Potentiel',
                    cellTemplate: '<div class="ngCellText align-center"><small class="tag {{row.getProperty(\'potentialLevel.css\')}} glossy">{{row.getProperty(\'potentialLevel.name\')}}</small></div>'
                }, {
                    field: 'createdAt',
                    displayName: 'Date création',
                    cellFilter: "date:'dd/MM/yyyy'"
                }
            ]
        };

        /*
         * NG-GRID for ticket list
         */

        $scope.filterOptionsBuy = {
            filterText: "",
            useExternalFilter: false
        };

        $scope.gridOptionsBuyer = {
            data: 'requestBuy',
            enableRowSelection: false,
            sortInfo: {
                fields: ["ref"],
                directions: ["desc"]
            },
            filterOptions: $scope.filterOptionsBuy,
            i18n: 'fr',
            enableColumnResize: true,
            enableCellEditOnFocus: true,
            enableCellSelection: false,
            columnDefs: [{
                    field: 'title',
                    displayName: 'Titre',
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText"><a ng-href="/erp/api/buy/pdf/{{row.getProperty(\'_id\')}}" target="_blank"><span class="icon-cart"></span> {{row.getProperty(col.field)}}</a></div>'
                }, {
                    field: 'ref',
                    displayName: 'Id',
                    enableCellEdit: false
                },
                //{field: 'Status.name', displayName: 'Etat', cellTemplate: '<div class="ngCellText center"><small class="tag glossy" ng-class="row.getProperty(\'Status.css\')">{{row.getProperty(\"Status.name\")}}</small></div>'},
                {
                    field: 'Status.name',
                    displayName: 'Etat',
                    cellTemplate: '<div class="ngCellText align-center"><small class="tag {{row.getProperty(\'Status.css\')}} glossy">{{row.getProperty(\'Status.name\')}}</small></div>',
                    editableCellTemplate: '<select ng-cell-input ng-class="\'colt\' + col.index" ng-model="row.entity.Status" ng-blur="updateInPlace(\'/erp/api/buy\',\'Status\', row)" ng-input="row.entity.Status" data-ng-options="c.id as c.name for c in status"></select>'
                }, {
                    field: 'datec',
                    displayName: 'Date création',
                    enableCellEdit: false,
                    cellFilter: "date:'dd-MM-yyyy HH:mm:ss'"
                }, {
                    field: 'total_ht',
                    displayName: 'Total HT',
                    cellFilter: "euro",
                    cellClass: "align-right",
                    editableCellTemplate: '<input ng-class="\'colt\' + col.index" ng-model="COL_FIELD" ng-input="COL_FIELD" class="input" ng-blur="updateInPlace(\'/erp/api/buy\',\'total_ht\', row)"/>'
                }
            ]
        };

        $scope.filterOptionsBills = {
            filterText: "",
            useExternalFilter: false
        };

        $scope.gridOptionsBills = {
            data: 'bills',
            enableRowSelection: false,
            sortInfo: {
                fields: ["createdAt"],
                directions: ["desc"]
            },
            filterOptions: $scope.filterOptionsBills,
            i18n: 'fr',
            enableColumnResize: true,
            enableCellSelection: false,
            columnDefs: [{
                field: 'ref',
                displayName: 'Facture',
                cellTemplate: '<div class="ngCellText"><a class="with-tooltip" ng-href="#!/bills/{{row.getProperty(\'_id\')}}" data-tooltip-options=\'{"position":"top"}\' title=\'{{row.getProperty(col.field)}}\'> {{row.getProperty(col.field)}} </a></div>'
            }, {
                field: 'createdAt',
                displayName: 'Date',
                cellFilter: "date:'dd-MM-yyyy'"
            }, {
                field: 'total_ttc',
                displayName: 'Montant',
                cellFilter: "currency:''"
            }, {
                field: 'amount.set',
                displayName: 'Reçu',
                cellFilter: "currency:''"
            }, {
                field: 'amount.rest',
                displayName: 'Reste à encaisser',
                cellFilter: "currency:''"
            }]
        };

        $scope.priceLevelAutoComplete = function(val, field) {
            return $http.post('/erp/api/product/price_level/select', {
                take: '5',
                skip: '0',
                page: '1',
                pageSize: '5',
                filter: {
                    logic: 'and',
                    filters: [{
                        value: val
                    }]
                }
            }).then(function(res) {
                return res.data;
            });

        };

        $scope.addNewLead = function() {

            var modalInstance = $modal.open({
                templateUrl: '/partials/leads/create.html',
                controller: "LeadCreateController",
                resolve: {
                    object: function() {
                        return {
                            societe: $scope.societe
                        };
                    }
                }
            });

            modalInstance.result.then(function(leads) {
                $scope.leads.push({
                    id: leads._id,
                    name: leads.name,
                    dueDate: leads.dueDate
                });

            }, function() {

            });
        };

        $scope.findReport = function(id) {

            $rootScope.idReport = id;
            var modalInstance = $modal.open({
                templateUrl: '/templates/_report/fiche.html',
                controller: "ReportController",
                size: "lg"
            });
        };

        $scope.findLead = function(id) {

            // $routeParams.lead = id;
            var modalInstance = $modal.open({
                templateUrl: '/partials/leads/view.html',
                controller: "LeadController",
                //resolve: {
                //  object: function () {
                //      return {
                //          lead: id
                //      };
                //  }
                //}
            });
        };

        $scope.refreshReport = function() {

            $http({
                method: 'GET',
                url: '/erp/api/report',
                params: {
                    find: {
                        "societe.id": $scope.societe._id
                    },
                    fields: "dateReport model author.name comment realised lead actions createdAt"
                }
            }).success(function(data, status) {

                $scope.reports = data;
                $scope.countReports = $scope.reports.length;
            });
        };

        $scope.paymentBills = function() {

            var modalInstance = $modal.open({
                templateUrl: '/partials/transaction/regulationBills.html',
                controller: "TransactionController",
                windowClass: "steps",
                resolve: {
                    object: function() {
                        return {
                            societe: $scope.societe,
                            bills: $scope.bills
                        };
                    }
                }
            });
            modalInstance.result.then(function(bills) {
                $scope.bills.push(bills);
                $scope.countBills++;
                $scope.findOne();
            }, function() {});
        };

        $scope.removeNote = function(note) {
            var i = $scope.societe.notes.map(function(e) {
                return e._id;
            }).indexOf(note._id);
            $scope.societe.notes.splice(i, 1);
            $scope.update();
        };

        function getUrl() {
            var url = "/erp/api/societe/dt";
            url += "?entity=" + $rootScope.entity;
            url += "&type=" + $scope.type;
            url += "&commercial_id=" + ($scope.commercial_id || null);
            url += "&status_id=" + ($scope.status_id || null);
            url += "&prospectlevel=" + ($scope.prospectlevel || null);

            return url;
        }

        function initDatatable() {

            gridSociete.init({
                src: $("#societeList"),
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

                    "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                    "ajax": {
                        "url": getUrl() // ajax source
                    },
                    "order": [
                        [1, "asc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                            data: 'bool',
                            "searchable": false
                        }, {
                            "data": "name.last"
                        }, {
                            "data": "salesPurchases.ref",
                            defaultContent: ""
                        }, {
                            "data": "salesPurchases.salesPerson",
                            visible: isSupplier == false,
                            defaultContent: ""
                        }, {
                            "data": "address.zip",
                            defaultContent: ""
                        }, {
                            "data": "address.city",
                            defaultContent: ""
                        }, {
                            "data": "companyInfo.idprof3",
                            defaultContent: ""
                        },
                        {
                            "data": "Status"
                        },
                        {
                            data: "entity",
                            visible: user.multiEntities,
                            searchable: false
                        }, {
                            data: "Tag",
                            defaultContent: ""
                        }, {
                            data: "lastOrder",
                            defaultContent: ""
                        }, {
                            data: "createdAt",
                            defaultContent: ""
                        }, {
                            data: "updatedAt",
                            defaultContent: ""
                        }
                    ]
                }
            });

            // handle group actionsubmit button click
            gridSociete.getTableWrapper().on('click', '.table-group-action-submit', function(e) {
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

            $scope.find = function() {
                initCharts();
                var url = getUrl();
                gridSociete.resetFilter(url);
            };
        }

        $scope.isValidSiret = function() {
            var siret = $scope.societe.idprof2;
            $scope.siretFound = "";
            $scope.societe.idprof1 = "";

            var isValide;
            if (!siret || siret.length != 14 || isNaN(siret))
                isValide = false;
            else {
                // Donc le SIRET est un numérique à 14 chiffres
                // Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
                // correspondent au numéro d'établissement
                // et enfin le dernier chiffre est une clef de LUHN.
                var somme = 0;
                var tmp;
                for (var cpt = 0; cpt < siret.length; cpt++) {
                    if ((cpt % 2) === 0) { // Les positions impaires : 1er, 3è, 5è, etc...
                        tmp = siret.charAt(cpt) * 2; // On le multiplie par 2
                        if (tmp > 9)
                            tmp -= 9; // Si le résultat est supérieur à 9, on lui soustrait 9
                    } else
                        tmp = siret.charAt(cpt);
                    somme += parseInt(tmp, 10);
                }
                if ((somme % 10) === 0) {
                    isValide = true; // Si la somme est un multiple de 10 alors le SIRET est valide
                    $scope.societe.idprof1 = siret.substr(0, 9);
                } else {
                    isValide = false;
                }
            }

            if (isValide)
                $http({
                    method: 'GET',
                    url: '/erp/api/societe/uniqId',
                    params: {
                        idprof2: siret
                    }
                }).success(function(data, status) {
                    $scope.validSiret = isValide;
                    if (data.name) { // already exist
                        $scope.siretFound = data;
                    }
                });
            else
                $scope.validSiret = isValide;
        };

        $scope.editAddress = function(data) {
            var address = {
                Status: 'ENABLE'
            };
            if (data)
                address = data;
            else
                address.name = $scope.societe.fullName;

            var modalInstance = $modal.open({
                templateUrl: 'addModalAddress.html',
                controller: ModalAddressCtrl,
                //windowClass: "steps",
                resolve: {
                    options: function() {
                        return {
                            address: address,
                            dict: $scope.dict
                        };
                    }
                }
            });

            modalInstance.result.then(function(address) {
                if (!data) // Is new address
                    $scope.societe.shippingAddress.push(address);

                $scope.update();
            }, function() {});
        };

        $scope.removeAddress = function(id) {
            $scope.societe.shippingAddress.splice(id, 1);
            $scope.update();
        };

        $scope.setDefaultDelivery = function(id) {
            $scope.societe.deliveryAddressId = id;
            $scope.update();
        };

        var ModalAddressCtrl = function($scope, $modalInstance, options) {

            $scope.address = options.address;

            $scope.dict = options.dict;

            $scope.ok = function() {
                $modalInstance.close($scope.address);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.addNewPriceList = function() {
            var modalInstance = $modal.open({
                templateUrl: 'newModalPriceList.html',
                controller: ModalInstanceCtrl,
                //windowClass: "steps",
                resolve: {
                    options: function() {
                        return {
                            supplier: $scope.societe
                        };
                    }
                }
            });

            modalInstance.result.then(function(priceList) {
                console.log(priceList);
                if (priceList) {
                    $scope.societe.salesPurchases.priceList = priceList
                    $scope.update(function(doc) {
                        return $rootScope.$state.go('product.pricelist', {
                            priceListId: priceList._id
                        });
                    });
                }
                //Save
            }, function() {});
        };

        var ModalInstanceCtrl = function($scope, $http, $modalInstance, Settings, options) {

            var Resource = Settings.priceList;
            $scope.$dict = {};
            $scope.object = {
                isFixed: true,
                priceListCode: options.supplier.salesPurchases.ref,
                name: options.supplier.fullName
            };

            //Radio button in pricelist
            $scope.setChoice = function(tab, idx) {
                tab.isFixed = false;
                tab.isCost = false;
                tab.isCoef = false;
                tab.isGlobalDiscount = false;

                tab[idx] = true;
            };


            $http({
                method: 'GET',
                url: '/erp/api/product/prices/priceslist/select',
                params: {
                    isCoef: true
                }
            }).success(function(data) {
                $scope.pricesLists = data.data;


                $http({
                    method: 'GET',
                    url: '/erp/api/currencies'
                }).success(function(data, status) {
                    $scope.$dict.currency = data.data;
                    //console.log(data);

                });
            });

            $scope.ok = function() {
                var object = new Resource(this.object);
                object.$save(function(response) {
                    $modalInstance.close(response);
                });
            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };
    }
]);

MetronicApp.controller('SocieteSegmentationRenameController', function($scope, $modalInstance, data) {
    $scope.data = {
        id: data._id
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('canceled');
    }; // end cancel

    $scope.save = function() {
        //console.log($scope.data.id);
        $modalInstance.close($scope.data.id);
    }; // end save

    $scope.hitEnter = function(evt) {
        if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.data.id, null) || angular.equals($scope.data.id, '')))
            $scope.save();
    }; // end hitEnter
});

MetronicApp.controller('BoxSocieteController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    var loadReport = false;

    $scope.findReport = function(dateRange) {
        loadReport = true;

        $http({
            method: 'GET',
            url: '/erp/api/societe/report',
            params: {
                month: dateRange.start.getMonth(),
                year: dateRange.start.getFullYear(),
                fields: "dateReport model author.name comment societe realised lead createdAt"
            }
        }).success(function(data, status) {
            $scope.reports = data;
            //console.log(data);
        });
    };

    $scope.showReport = function(id) {

        $rootScope.idReport = id;
        var modalInstance = $modal.open({
            templateUrl: '/partials/reports/fiche.html',
            controller: "ReportController",
            windowClass: "steps"
        });
    };


    $rootScope.$on('reportDateRange', function(event, data) {
        //console.log(data);
        if (loadReport)
            $scope.findReport(data);
    });

}]);

MetronicApp.controller('SocieteStatsController', ['$scope', '$rootScope', '$http', '$filter', '$timeout', 'Societes',
    function($scope, $rootScope, $http, $filter, $timeout, Societe) {

        $scope.commercial = null;

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageBodySolid = false;

            $scope.find();
        });

        $scope.date = {
            start: moment().startOf('year').subtract(3, 'year').toDate(),
            end: moment().endOf('year').subtract('year').toDate()
        };

        // Estimated https://handsontable.com/features.html

        var products = [{
                    description: 'Big Mac',
                    options: [{
                            description: 'Big Mac'
                        },
                        {
                            description: 'Big Mac & Co'
                        },
                        {
                            description: 'McRoyal'
                        },
                        {
                            description: 'Hamburger'
                        },
                        {
                            description: 'Cheeseburger'
                        },
                        {
                            description: 'Double Cheeseburger'
                        }
                    ]
                },
                {
                    description: 'Fried Potatoes',
                    options: [{
                            description: 'Fried Potatoes'
                        },
                        {
                            description: 'Fried Onions'
                        }
                    ]
                }
            ],
            firstNames = ['Ted', 'John', 'Macy', 'Rob', 'Gwen', 'Fiona', 'Mario', 'Ben', 'Kate', 'Kevin', 'Thomas', 'Frank'],
            lastNames = ['Tired', 'Johnson', 'Moore', 'Rocket', 'Goodman', 'Farewell', 'Manson', 'Bentley', 'Kowalski', 'Schmidt', 'Tucker', 'Fancy'],
            address = ['Turkey', 'Japan', 'Michigan', 'Russia', 'Greece', 'France', 'USA', 'Germany', 'Sweden', 'Denmark', 'Poland', 'Belgium'];

        function dataFactory() {
            return {
                generateArrayOfObjects: function(rows, keysToInclude) {
                    var items = [],
                        item;

                    rows = rows || 10;

                    for (var i = 0; i < rows; i++) {
                        item = {
                            id: i + 1,
                            name: {
                                first: firstNames[Math.floor(Math.random() * firstNames.length)],
                                last: lastNames[Math.floor(Math.random() * lastNames.length)]
                            },
                            date: Math.max(Math.round(Math.random() * 12), 1) + '/' + Math.max(Math.round(Math.random() * 28), 1) + '/' + (Math.round(Math.random() * 80) + 1940),
                            address: Math.floor(Math.random() * 100000) + ' ' + address[Math.floor(Math.random() * address.length)],
                            price: Math.floor(Math.random() * 100000) / 100,
                            isActive: Math.floor(Math.random() * products.length) / 2 === 0 ? 'Yes' : 'No',
                            COURSES: Math.floor(Math.random() * 100000) / 100,
                            product: angular.extend({}, products[Math.floor(Math.random() * products.length)])
                        };
                        angular.forEach(keysToInclude, function(key) {
                            if (item[key]) {
                                delete item[key];
                            }
                        });
                        items.push(item);
                    }

                    return items;
                },
                generateArrayOfArrays: function(rows, cols) {
                    return Handsontable.helper.createSpreadsheetData(rows || 10, cols || 10);
                }
            };
        }

        //$scope.minSpareRows = 1;
        $scope.rowHeaders = false;

        var dataF = new dataFactory();

        $scope.find = function() {
            $http({
                method: 'GET',
                url: '/erp/api/stats/DetailsClient',
                params: {
                    entity: $rootScope.entity,
                    commercial: ($scope.commercial ? $scope.commercial.id : null),
                    start: $scope.date.start,
                    end: $scope.date.end
                }
            }).success(function(data, status) {
                //console.log(data);
                $scope.dataClients = data;
            });

        };

        $scope.colorRenderer = function(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.NumericRenderer.apply(this, arguments);

            td.className = ' bg-yellow-saffron htNumeric htDimmed';
        };


        $scope.db = {
            items: []
        };
        $scope.settings = {
            colHeaders: true,
            contextMenu: ['row_above', 'row_below', 'remove_row'],
            //manualColumnMove: [1, 4],

            onAfterInit: function() {
                console.log("init");
            },
            onAfterChange: function(err, data) {
                console.log("change");
                console.log(err, data);
            }
        };

        // This month
        $scope.date = {
            start: moment().startOf('month').toDate(),
            end: moment().endOf('month').toDate()
        };

    }
]);

MetronicApp.controller('ContactController', ['$scope', '$rootScope', '$http', '$filter', '$modal', 'Societes', function($scope, $rootScope, $http, $filter, $modal, Societes) {

    $scope.contact = {
        soncas: []
    };
    $scope.dict = {};
    $scope.query = {}; //query for find

    $scope.editable = $rootScope.login.rights.societe.write;

    var grid = new Datatable();

    $scope.etats = [{
            id: "ST_NEVER",
            name: "Non déterminé"
        },
        {
            id: "ST_ENABLE",
            name: "Actif"
        },
        {
            id: "ST_DISABLE",
            name: "Inactif"
        },
        {
            id: "ST_NO",
            name: "Ne pas contacter"
        },
        {
            id: "ALL",
            name: "Tous"
        }
    ];

    $scope.soncas = [{
            value: "Sécurité",
            text: 'Sécurité'
        },
        {
            value: 'Orgueil',
            text: 'Orgueil'
        },
        {
            value: 'Nouveauté',
            text: 'Nouveauté'
        },
        {
            value: 'Confort',
            text: 'Confort'
        },
        {
            value: 'Argent',
            text: 'Argent'
        },
        {
            value: "Sympathique",
            text: 'Sympathique'
        }
    ];

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.etat = {
        id: "ST_ENABLE",
        name: "Actif"
    };
    // Init
    $http({
        method: 'GET',
        url: '/erp/api/dict',
        params: {
            dictName: ["fk_job", "fk_hobbies", "fk_civilite", "fk_user_status"]
        }
    }).success(function(data, status) {
        $scope.dict = data;
        console.log(data);
    });

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageBodySolid = false;

        if ($rootScope.$stateParams.societe)
            Societes.get({
                Id: $rootScope.$stateParams.societe
            }, function(societe) {
                $scope.contact.societe = {
                    id: societe._id,
                    name: societe.name
                };

                $scope.contact.address = societe.address;
                $scope.contact.zip = societe.zip;
                $scope.contact.town = societe.town;

            });

        if ($rootScope.$stateParams.Status) {
            $scope.status_id = $rootScope.$stateParams.Status;
            initDatatable({
                status_id: $scope.status_id
            });
        } else
            initDatatable();

    });

    $scope.showStatus = function(idx, dict) {
        if (!($scope.dict[dict] && $scope.contact[idx]))
            return 'Non défini';
        var selected = $filter('filter')($scope.dict[dict].values, {
            id: $scope.contact[idx]
        });

        return ($scope.contact[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
    };


    // toggle selection for a given soncas by value
    $scope.toggleSelection = function toggleSelection(s) {
        var idx = $scope.contact.soncas.indexOf(s.value);

        // is currently selected
        if (idx > -1) {
            $scope.contact.soncas.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.contact.soncas.push(s.value);
        }
    };

    $scope.updateAddress = function(data) {

        $scope.contact.address = data.address.address;
        $scope.contact.zip = data.address.zip;
        $scope.contact.town = data.address.town;

        return true;
    };

    $scope.loadDatatable = function(query) {
        $scope.query = query;
        initDatatable();
    };

    $scope.create = function() {
        var contact = new Societes(this.contact);

        contact.$save(function(response) {
            //console.log(response);
            if (response.societe.id)
                $rootScope.$state.go("societe.show", {
                    id: response.societe.id
                });
            else
                $rootScope.$state.go("contact.show", {
                    id: response._id
                });
        });
    };

    $scope.findOne = function() {

        Societes.get({
            Id: $rootScope.$stateParams.id
        }, function(doc) {
            $scope.contact = doc;
        });

    };

    $scope.update = function() {

        var contact = $scope.contact;

        contact.$update(function(response) {
            $scope.contact = response;
        }, function(errorResponse) {

        });
    };

    $scope.remove = function(contact) {
        contact.$remove(function(response) {
            $rootScope.goBack();
        });
    };

    $scope.createLogin = function(contact) {
        if (!contact.email)
            return;

        $http({
            method: 'POST',
            url: '/erp/api/contact/login/' + contact._id
        }).success(function(data, status) {
            if (status == 200)
                $scope.contact = data;
        });

    };

    function getUrl() {
        var url = "/erp/api/societe/dt?type=Person";

        console.log($scope.query);

        //var cpt = 0;
        for (var i in $scope.query) {
            //    if (cpt === 0)
            //        url += "?";
            //    else
            //        url += "&";
            url += i + "=" + $scope.query[i];
            //    cpt++;
        }

        return url;
    }

    function initDatatable() {

        grid.init({
            src: $("#contactList"),
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

                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "ajax": {
                    "url": getUrl() // ajax source
                },
                "order": [
                    [1, "asc"]
                ], // set first column as a default sort by asc
                "columns": [{
                    data: 'bool'
                }, {
                    "data": "name.last"
                }, {
                    "data": "name.first"
                }, {
                    "data": "poste",
                    defaultContent: ""
                }, {
                    "data": "company",
                    visible: $rootScope.$state.current.name === "contact.list",
                    defaultContent: ""
                }, {
                    "data": "phones.phone",
                    defaultContent: ""
                }, {
                    "data": "phones.mobile",
                    defaultContent: ""
                }, {
                    "data": "emails",
                    defaultContent: ""
                }, {
                    "data": "Status"
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

    $scope.find = function(id) {
        if (id)
            return Societes.query({
                filter: {
                    company: {
                        value: [id],
                    }
                },
                viewType: 'list',
                contentType: 'societe',
                type: "Person",
                field: "name contatInfo phones emails"
            }, function(data) {
                console.log(data);
                $scope.contacts = data.data;
            });

        var url = getUrl();
        grid.resetFilter(url);
    };

    var ModalContactCtrl = function($scope, $modalInstance, options) {
        $scope.create = false;
        $scope.dict = options.dict;
        console.log(options.dict);

        $scope.contact = {
            type: 'Person',
            salesPurchases: {
                isActive: true,
                isCutomer: false
            },
            company: options.supplier._id,
            name: {},
            emails: [],
            phones: {},
            address: options.supplier.address
        };

        $scope.addContactToCustomer = function(item) {
            console.log(item, $scope.supplier);
            Societes.get({
                Id: item._id
            }, function(contact) {
                contact.company = options.supplier._id;
                contact.$update(function(response) {
                    $modalInstance.close(response);
                });
            });
        };

        $scope.createNewContact = function() {
            $scope.create = true;
        }

        $scope.ok = function() {
            var contact = new Societes($scope.contact);
            contact.$save(function(response) {
                $modalInstance.close(response);
            });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.addContact = function() {

        var modalInstance = $modal.open({
            templateUrl: '/templates/contact/modal/addContact.html',
            controller: ModalContactCtrl,
            //windowClass: "steps",
            resolve: {
                options: function() {
                    return {
                        supplier: $scope.societe,
                        dict: $scope.dict
                    };
                }
            }
        });

        modalInstance.result.then(function(contact) {
            $scope.find($scope.societe._id);
        }, function() {});
    };

    $scope.delete = function(contactId) {
        Societes.get({
            Id: contactId
        }, function(contact) {
            contact.company = null;
            contact.$update(function(response) {
                $scope.find($scope.societe._id);
            });
        });
    };


}]);

MetronicApp.controller('ContactCreateController', ['$scope', '$rootScope', '$http', '$modalInstance', 'Societes', 'object', function($scope, $rootScope, $http, $modalInstance, Societes, object) {

    $scope.listCode = {};
    $scope.active = 1;
    $scope.dict = {};

    $scope.contact = {
        soncas: []
    };

    $scope.soncas = [
        "Sécurité", 'Orgueil', 'Nouveauté', 'Confort', 'Argent', "Sympathique"
    ];

    $scope.init = function() {
        //console.log(object);
        if (object.societe)
            $scope.contact = {
                societe: {
                    id: object.societe.id || object.societe._id,
                    name: object.societe.name
                },
                address: object.societe.address,
                zip: object.societe.zip,
                town: object.societe.town
            };

        $http({
            method: 'GET',
            url: '/erp/api/dict',
            params: {
                dictName: ["fk_civilite", "fk_job"]
            }
        }).success(function(data, status) {
            $scope.dict = data;
        });
    };

    $scope.isActive = function(idx) {
        if (idx === $scope.active)
            return "active";
    };

    $scope.createContact = function() {

        $scope.contact.user_creat = $rootScope.login._id;

        var contact = new Contacts(this.contact);

        contact.$save(function(response) {
            //console.log(response);
            $modalInstance.close(response);
        });
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };


}]);