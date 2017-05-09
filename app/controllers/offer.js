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
MetronicApp.controller('OfferController', ['$scope', '$rootScope', '$location', '$http', '$modal', '$filter', '$timeout', 'Offers',
    function($scope, $rootScope, $location, $http, $modal, $filter, $timeout, Offers) {

        $scope.backTo = 'offer.list';

        var grid = new Datatable();
        var user = $rootScope.login;

        $scope.offer = {
            entity: $rootScope.login.entity,
            billing: {},
            bl: [{}],
            lines: []
        };
        $scope.dict = {};
        var iconsFilesList = {};
        $scope.types = [{
            name: "En cours",
            id: "NOW"
        }, {
            name: "Clos",
            id: "CLOSED"
        }];
        $scope.type = {
            name: "En cours",
            id: "NOW"
        };

        $scope.delivery_mode = ["Comptoir", "Livraison"];

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        // Init
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageSidebarClosed = false;
            $rootScope.settings.layout.pageBodySolid = false;

            var dict = ["fk_offer_status", "fk_paiement", "fk_input_reason", "fk_payment_term", "fk_tva"];
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

            initDatatable();
        });

        $scope.showStatus = function(idx, dict) {
            if (!($scope.dict[dict] && $scope.offer[idx]))
                return;
            var selected = $filter('filter')($scope.dict[dict].values, {
                id: $scope.offer[idx]
            });
            return ($scope.offer[idx] && selected && selected.length) ? selected[0].label : 'Non défini';
        };

        $scope.create = function() {
            var offer = new Offers(this.offer);
            offer.$save(function(response) {
                $rootScope.$state.go("offer.show", { id: response._id });
            });
        };
        $scope.remove = function(offer) {
            offer.$remove();
            $rootScope.$state.go("offer.list");
        };
        $scope.update = function(callback) {
            var offer = $scope.offer;

            for (var i = offer.lines.length; i--;) {
                // actually delete lines
                if (offer.lines[i].isDeleted) {
                    offer.lines.splice(i, 1);
                }
            }
            offer.$update(function(response) {
                //$location.path('societe/' + societe._id);
                //pageTitle.setTitle('Commande client ' + offer.ref);

                if (response.lines) {
                    for (var i = 0; i < response.lines.length; i++) {
                        $scope.offer.lines[i].idLine = i;
                    }
                }
                if (response.Status == "DRAFT" || response.Status == "NEW" || response.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;

                if (callback)
                    callback(null, response);
            });
        };
        $scope.clone = function() {
            $scope.offer.$clone(function(response) {
                $rootScope.$state.go('offer.show', {
                    id: response._id
                });
                //$location.path("offers/" + response._id);
            });
        };

        $scope.findOne = function() {
            Offers.get({
                Id: $rootScope.$stateParams.id
            }, function(offer) {
                $scope.offer = offer;
                //console.log(offer);
                //on utilise idLine pour definir la ligne produit que nous voulons supprimer
                for (var i = 0; i < $scope.offer.lines.length; i++) {
                    $scope.offer.lines[i].idLine = i;
                }
                if (offer.Status == "DRAFT" || offer.Status == "NEW" || offer.Status == "QUOTES")
                    $scope.editable = true;
                else
                    $scope.editable = false;
                $http({
                    method: 'GET',
                    url: 'api/ticket',
                    params: {
                        find: {
                            "linked.id": offer._id
                        },
                        fields: "name ref updatedAt percentage Status task"
                    }
                }).success(function(data, status) {
                    if (status === 200)
                        $scope.tickets = data;
                    $scope.countTicket = $scope.tickets.length;
                });
                //pageTitle.setTitle('Commande client ' + $scope.offer.ref);
            }, function(err) {
                if (err.status === 401)
                    $location.path("401.html");
            });
        };

        $scope.sendEmail = function() {
            $http.post('/erp/api/sendEmail', {
                to: this.offer.contacts,
                data: {
                    title: 'Votre devis ' + this.offer.ref_client || "",
                    subtitle: this.offer.client.name + (this.offer.ref_client ? " - Reference " + this.offer.ref_client : ""),
                    message: 'Veuillez trouver ci-joint la proposition commerciale. Cliquer sur le bouton ci-apres pour le telecharger.',
                    url: '/erp/api/offer/download/' + this.offer._id,
                    entity: this.offer.entity
                },
                ModelEmail: 'email_PDF'
            }).then(function(res) {
                //console.log(res);
                if (res.status == 200) {

                    $scope.offer.history.push({
                        date: new Date(),
                        mode: 'email',
                        msg: 'email envoye',
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

        /*$scope.userAutoComplete = function (val) {
            return $http.post('/erp/api/user/name/autocomplete', {
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
            }).then(function (res) {
                return res.data;
            });
        };*/

        $scope.updateAddress = function(data) {
            if (this.editableOffer)
                this.editableOffer.$save();
            // Only company name change
            if (typeof data !== 'object') {
                $scope.offer.billing.societe.name = data;
                $scope.offer.bl[0].name = data;
                return true;
            }

            $scope.offer.addresses = data.addresses;

            //if(mode == 'bill')  {
            $scope.offer.cond_reglement_code = data.cond_reglement_code;
            $scope.offer.mode_reglement_code = data.mode_reglement_code;
            $scope.offer.price_level = data.price_level;
            $scope.offer.commercial_id = data.commercial_id;
            //}
            //console.log(data);
            if (data.address) {
                //if (data.id == '5333032036f43f0e1882efce') // Accueil
                //    $scope.offer.client.isNameModified = true;

                // Billing address
                $scope.offer.billing = {
                    societe: {}
                };
                $scope.offer.billing.societe.name = data.cptBilling.name;
                $scope.offer.billing.societe.id = data.cptBilling.id;
                $scope.offer.billing.address = data.cptBilling.address;
                $scope.offer.billing.zip = data.cptBilling.zip;
                $scope.offer.billing.town = data.cptBilling.town;

                // Delivery address
                $scope.offer.bl = [{
                    societe: {}
                }];

                $scope.offer.bl[0].name = data.addresses[0].name;
                $scope.offer.bl[0].address = data.addresses[0].address;
                $scope.offer.bl[0].zip = data.addresses[0].zip;
                $scope.offer.bl[0].town = data.addresses[0].town;

                if (data.deliveryAddressId)
                    for (var i = 0; i < data.addresses.length; i++)
                        if (data.deliveryAddressId == data.addresses[i]._id) {
                            $scope.offer.bl[0].name = data.addresses[i].name;
                            $scope.offer.bl[0].address = data.addresses[i].address;
                            $scope.offer.bl[0].zip = data.addresses[i].zip;
                            $scope.offer.bl[0].town = data.addresses[i].town;
                        }
            }
            return true;
        };

        $scope.updateBillingAddress = function() {
            if ($scope.offer.billing.sameBL0) {
                $scope.offer.billing.name = $scope.offer.bl[0].name;
                $scope.offer.billing.address = $scope.offer.bl[0].address;
                $scope.offer.billing.zip = $scope.offer.bl[0].zip;
                $scope.offer.billing.town = $scope.offer.bl[0].town;
            }
            return true;
        };
        $scope.createOrder = function() {
            // CLOSE ORDER
            $scope.offer.Status = "SIGNED";
            $scope.update();
            $scope.offer.$order(function(response) {
                $rootScope.$state.go("order.show", { id: response._id });
            });
        };

        function initDatatable() {

            grid.init({
                src: $("#offerList"),
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
                        "url": "/erp/api/offer/dt" // ajax source
                    },
                    "order": [
                        [1, "desc"]
                    ], // set first column as a default sort by asc
                    "columns": [{
                        data: 'bool'
                    }, {
                        "data": "ref"
                    }, {
                        "data": "client.name",
                        defaultContent: ""
                    }, {
                        "data": "ref_client",
                        defaultContent: ""
                    }, {
                        "data": "date_livraison",
                        defaultContent: ""
                    }, {
                        "data": "total_ht",
                        defaultContent: ""
                    }, {
                        "data": "Status"
                    }, {
                        "data": "entity",
                        defaultContent: ""
                    }, {
                        "data": "datec",
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
            grid.resetFilter();
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
                        url: api + '/' + row.entity._id + '/' + field,
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
        $scope.changeStatus = function(Status) {
            $scope.offer.Status = Status;
            $scope.update();
        };

        $scope.checkLine = function(data) {
            //console.log(data);
            if (!data)
                return "La ligne produit ne peut pas être vide";
            if (!data.id)
                return "Le produit n'existe pas";
        };
        $scope.addProduct = function(data, index, lines) {
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
                        weight: data.weight,
                        idLine: index
                    };
                    //console.log(lines[i]);
                    $scope.calculMontantHT(lines[i]);
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
                    price_level: $scope.offer.price_level,
                    qty: line.qty,
                    _id: line.product.id
                }).then(function(res) {
                    //console.log(res.data);
                    line.pu_ht = res.data.pu_ht;
                    if (res.data.discount)
                        line.discount = res.data.discount;

                    //return res.data;
                    calculHT(line);
                });

            calculHT(line);
        };
        $scope.productAutoComplete = function(val) {
            return $http.post('/erp/api/product/autocomplete', {
                take: 50,
                skip: 0,
                page: 1,
                pageSize: 5,
                price_level: $scope.offer.price_level,
                //                supplier: options.supplier,
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
        // filter lines to show
        $scope.filterLine = function(line) {
            return line.isDeleted !== true;
        };
        $scope.editLine = function(row, index, lines) {
            this.tableform.$save();
            var self = this;
            var modalInstance = $modal.open({
                templateUrl: '/templates/dynforms/productline.html',
                controller: "DynFormController",
                size: "lg",
                resolve: {
                    object: function() {
                        return row;
                    },
                    options: function() {
                        return {
                            price_level: $scope.offer.price_level
                        };
                    }
                }
            });
            modalInstance.result.then(function(line) {
                //angular.extend($scope.offer.lines[index], line);
                $scope.offer.lines[index] = line;
                $scope.calculMontantHT($scope.offer.lines[index]);
                self.tableform.$show();
            }, function() {});
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
            $scope.offer.lines.splice(index + 1, 0, {
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

            for (var i in $scope.offer.lines) {
                $scope.offer.lines[i].idLine = i;
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
        /**
         * Get fileType for icon
         */
        $scope.getFileTypes = function() {
            $http({
                method: 'GET',
                url: 'dict/filesIcons'
            }).
            success(function(data, status) {
                if (status == 200) {
                    iconsFilesList = data;
                }
            });
        };
        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                if ($scope.offer._id)
                    $scope.upload = Upload.upload({
                        url: 'api/offer/file/' + $scope.offer._id,
                        method: 'POST',
                        // headers: {'headerKey': 'headerValue'},
                        // withCredential: true,
                        data: {
                            myObj: $scope.myModelObj
                        },
                        file: file
                            // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                            /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                            //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                            /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                            //formDataAppender: function(formData, key, val){} 
                    }).progress(function(evt) { // FIXME function in a loop !
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total, 10));
                    }).success(function(data, status, headers, config) { // FIXME function in a loop !
                        // file is uploaded successfully
                        //$scope.myFiles = "";
                        //console.log(data);
                        //if (!data.update) // if not file update, add file to files[]
                        //  $scope.offer.files.push(data.file);
                        $scope.offer = data;
                    });
                //.error(...)
                //.then(success, error, progress); 
            }
        };
        $scope.suppressFile = function(id, fileName, idx) {
            $http({
                method: 'DELETE',
                url: 'api/commande/file/' + id + '/' + fileName
            }).
            success(function(data, status) {
                if (status == 200) {
                    $scope.offer.files.splice(idx, 1);
                }
            });
        };
        $scope.fileType = function(name) {
            if (typeof iconsFilesList[name.substr(name.lastIndexOf(".") + 1)] == 'undefined')
                return iconsFilesList["default"];
            return iconsFilesList[name.substr(name.lastIndexOf(".") + 1)];
        };
    }
]);
MetronicApp.controller('OfferCreateController', ['$scope', '$http', '$modalInstance', 'Upload', '$route', 'Offer',
    function($scope, $http, $modalInstance, Upload, $route, Offer) {

        $scope.opened = [];
        $scope.init = function() {
            $scope.active = 1;
            $scope.offer = {};
            $scope.offer.bl = [];
            $scope.offer.bl.push({});
            $scope.filePercentage = {};
            $scope.fileName = {};
            $scope.offer.notes = [];
            $scope.offer.notes.push({});
            $scope.offer.optional = {};
        };
        $scope.shipping = {
            default: "NONE",
            values: [{
                id: "NONE",
                label: "A diposition",
                address: false
            }, {
                id: "TNT",
                label: "TNT",
                address: true
            }, {
                id: "MAIL",
                label: "Courrier",
                address: true
            }, {
                id: "COURSIER",
                label: "Coursier",
                address: true
            }, {
                id: "TRANSPORTEUR",
                label: "Transporteur",
                address: true
            }]
        };
        $scope.billing = {
            default: "CHQ",
            values: [{
                id: "CPT",
                label: "En compte"
            }, {
                id: "MONEY",
                label: "Espèce"
            }, {
                id: "CHQ",
                label: "Chèque"
            }, {
                id: "CB",
                label: "Carte bancaire"
            }]
        };
        $scope.open = function($event, idx) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened[idx] = true;
        };
        $scope.create = function() {
            if (this.offer._id)
                return;
            var offer = new Offer(this.offer);
            offer.$save(function(response) {
                $scope.offer = response;
            });
        };
        $scope.update = function() {
            var offer = $scope.offer;
            offer.$update(function(response) {
                $scope.offer = response;
            });
        };
        $scope.isActive = function(idx) {
            if (idx == $scope.active)
                return "active";
        };
        $scope.next = function() {
            $scope.active++;
        };
        $scope.previous = function() {
            $scope.active--;
        };
        $scope.goto = function(idx) {
            if ($scope.active == 5)
                return;
            if (idx < $scope.active)
                $scope.active = idx;
        };
        $scope.societeAutoComplete = function(val) {
            return $http.post('api/societe/autocomplete', {
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
        $scope.initSelectFiles = function() {
            $http({
                method: 'GET',
                url: 'api/chaumeil/otis/selectFiles'
            }).success(function(data, status) {
                $scope.selectFiles = data;
                $timeout(function() {
                    angular.element('select').change();
                }, 300);
            });
        };
        $scope.addDossier = function() {
            $scope.offer.optional.dossiers.push({});
        };
        $scope.addDest = function() {
            $scope.offer.bl.push({
                products: [{
                    name: 'paper',
                    qty: 0
                }, {
                    name: 'cd',
                    qty: 0
                }]
            });
        };
        $scope.sendOffer = function() {
            $scope.offer.datec = new Date();
            $scope.offer.date_livraison = new Date();
            $scope.offer.date_livraison.setDate($scope.offer.date_livraison.getDate() + 5);
            $scope.offer.Status = "NEW"; // commande validee
            $scope.offer.notes[0].note = $scope.offer.notes[0].note.replace(/\n/g, '<br/>');
            for (var i in this.offer.bl) {
                var note = "";
                note += "Adresse de livraison : <br/><p>" + this.offer.bl[i].name + "<br/>";
                note += this.offer.bl[i].contact + "<br/>";
                note += this.offer.bl[i].address + "<br/>";
                note += this.offer.bl[i].zip + " " + this.offer.bl[i].town + "</p>";
                $scope.offer.notes.push({
                    note: note,
                    title: "Destinataire " + (parseInt(i) + 1),
                    edit: false
                });
            }
            /*for (var j in $scope.offer.optional.dossiers) {
             // Add specific files
             
             var note = "";
             note += '<h4 class="green underline">' + "Liste des fichiers natifs</h4>";
             note += '<ul>';
             for (var i in $scope.offer.optional.dossiers[j].selectedFiles) {
             if ($scope.offer.optional.dossiers[j].selectedFiles[i] !== null) {
             note += '<li><a href="' + $scope.offer.optional.dossiers[j].selectedFiles[i].url + '" target="_blank" title="Telecharger - ' + $scope.offer.optional.dossiers[j].selectedFiles[i].filename + '">';
             note += '<span class="icon-extract">' + i +"_" +$scope.offer.optional.dossiers[j].selectedFiles[i].filename + '</span>';
             note += '</a></li>';
             }
             }
             note += '</ul>';
             
             
             $scope.offer.notes.push({
             note: note,
             title: "Fichiers webdoc dossier " + (parseInt(j) + 1),
             edit: false
             });
             //console.log(note);
             
             
             }*/
            $scope.update();
            $modalInstance.close($scope.offer);
        };
        $scope.onFileSelect = function($files, idx) {
            $scope.filePercentage[idx] = 0;
            //console.log(idx);
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                //console.log(file);
                if ($scope.offer)
                    $scope.upload = Upload.upload({
                        url: 'api/commande/file/' + $scope.offer._id,
                        method: 'POST',
                        // headers: {'headerKey': 'headerValue'},
                        // withCredential: true,
                        data: {
                            idx: idx
                        },
                        file: file
                            // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                            /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                            //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                            /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                            //formDataAppender: function(formData, key, val){} 
                    }).progress(function(evt) {
                        $scope.filePercentage[idx] = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function(data, status, headers, config) {
                        // file is uploaded successfully
                        //$scope.myFiles = "";
                        //console.log(data);
                        $scope.offer.files = data.files;
                        $scope.offer.__v = data.__v; // for update
                        $scope.filePercentage[idx] = 100;
                        $scope.fileName[idx] = file.name;
                    });
                //.error(...)
                //.then(success, error, progress); 
            }
        };
        $scope.suppressFile = function(id, fileName, idx) {
            //console.log(id);
            //console.log(fileName);
            //console.log(idx);
            //CO0214-00060_pvFeuPorte_Dossier1_UGAP_422014.csv
            fileName = $scope.offer.ref + "_" + idx + "_" + fileName;
            $http({
                method: 'DELETE',
                url: 'api/commande/file/' + id + '/' + fileName
            }).success(function(data, status) {
                if (status == 200) {
                    $scope.offer.files = data.files;
                    $scope.offer.__v = data.__v; // for update
                    $scope.filePercentage[idx] = 0;
                }
            });
        };
    }
]);