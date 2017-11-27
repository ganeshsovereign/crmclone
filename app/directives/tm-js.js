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



MetronicApp.directive('sdBarcode', function() {
		return {
				// Restrict tells AngularJS how you will be declaring your directive in the markup.
				// A = attribute, C = class, E = element and M = comment
				restrict: 'A',
				scope: {
						barcodeValue: '@'
				},
				link: function(scope, elem, attrs) {
						elem.barcode(attrs.barcodeValue.toString(), "code128");
				}
		};
});

MetronicApp.directive('reportDateRange', ['$rootScope', function($rootScope) {
		return {
				restrict: 'A',
				require: 'ngModel',
				scope: {
						data: '=ngModel'
				},
				template: '<i class="icon-calendar"></i>&nbsp; <span class="thin uppercase visible-lg-inline-block">{{data.start | date : \'d MMM yyyy\'}} - {{data.end | date : \'d MMM yyyy\'}}</span>&nbsp; <i class="fa fa-angle-down"></i>',
				link: function(scope, element, attrs, ngModel) {
						if (!jQuery().daterangepicker || !element) {
								return;
						}

						element.daterangepicker({
										opens: (Metronic.isRTL() ? 'right' : 'left'),
										startDate: moment(scope.data.start),
										endDate: moment(scope.data.end),
										minDate: '01/01/2000',
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
										separator: ' a ',
										locale: {
												format: 'DD/MM/YYYY',
												applyLabel: 'Appliquer',
												fromLabel: 'Du',
												toLabel: 'Au',
												customRangeLabel: 'Intervalle',
												daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
												monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
												firstDay: 1
										}
								},
								function(start, end) {
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

MetronicApp.directive('filterDateRange', ['$rootScope', function($rootScope) {
		return {
				restrict: 'A',
				require: 'ngModel',
				scope: {
						data: '=ngModel'
				},
				template: '<input type="checkbox" ng-model="checked" ng-click="activate($event)" ng-if="!checked"/><div class="btn btn-sm btn-default" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range" ng-if="checked"><i class="icon-calendar"></i>&nbsp; <span class="thin uppercase visible-lg-inline-block">{{data.start | date : \'d MMM yyyy\'}} - {{data.end | date : \'d MMM yyyy\'}}</span>&nbsp; <i class="fa fa-angle-down"></i></div>',
				link: function(scope, element, attrs, ngModel) {
						scope.checked = scope.data.start ? true : false;
						if (!jQuery().daterangepicker || !element) {
								return;
						}

						scope.activate = function($event) {
								$event.preventDefault();
								$event.stopPropagation();
								scope.data = {
										start: moment().startOf('year').toDate(),
										end: moment().endOf('year').toDate()
								};
								scope.checked = true;
						};

						element.daterangepicker({
										opens: (Metronic.isRTL() ? 'right' : 'left'),
										startDate: moment(scope.data.start),
										endDate: moment(scope.data.end),
										minDate: '01/01/2000',
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
										separator: ' a ',
										locale: {
												format: 'DD/MM/YYYY',
												applyLabel: 'Appliquer',
												fromLabel: 'Du',
												toLabel: 'Au',
												customRangeLabel: 'Intervalle',
												daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
												monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
												firstDay: 1
										}
								},
								function(start, end) {
										ngModel.$setViewValue({
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

MetronicApp.directive('ngEnter', function() {
		return function(scope, element, attrs) {
				element.bind("keydown keypress", function(event) {
						if (event.which === 13) {
								scope.$apply(function() {
										scope.$eval(attrs.ngEnter, {
												'event': event
										});
								});

								event.preventDefault();
						}
				});
		};
});

MetronicApp.directive('ngBlur', function() {
		return function(scope, elem, attrs) {
				elem.bind('blur', function(event) {
						scope.$eval(attrs.ngBlur);
				});
		};
});

MetronicApp.directive('ngConfirmClick', ['dialogs',
		function(dialogs) {
				return {
						restrict: 'A',
						link: function(scope, element, attrs) {
								element.bind('click', function() {
										var message = attrs.ngConfirmClick || "Are you sure ?";
										var title = attrs.ngConfirmTitle || "Confirmation";

										var dlg = dialogs.confirm(title, message);
										dlg.result.then(function(btn) {
												scope.$eval(attrs.confirmedClick);
										}, function(btn) {
												if (attrs.canceledClick)
														scope.$eval(attrs.canceledClick);
										});
								});
						}
				};
		}
]);

MetronicApp.directive('myFocus', function() {
		return {
				restrict: 'A',
				link: function(scope, element, attr) {
						scope.$watch(attr.myFocus, function(n, o) {
								if (n != 0 && n) {
										element[0].focus();
								}
						});
				}
		};
});



MetronicApp.factory('superCache', ['$cacheFactory',
		function($cacheFactory) {
				return $cacheFactory('super-cache');
		}
]);

/*MetronicApp.directive('crmAddress', ['$http',
    function($http) {
        return {
            restrict: 'A',
            scope: {
                addressModel: '=model',
                mode: '=?'
            },
            templateUrl: function(el, attr) {
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
            link: function(scope) {

                scope.updateAddressDir = true;

                scope.deletedAddress = {
                    name: null,
                    street: null,
                    city: null,
                    state: null,
                    zip: null,
                    country: null,
                    societe: {}
                };

                scope.enableUpdateAddress = function() {
                    scope.deletedAddress = {
                        name: scope.addressModel.name,
                        street: scope.addressModel.street,
                        city: scope.addressModel.city,
                        state: scope.addressModel.state,
                        zip: scope.addressModel.zip,
                        country: scope.addressModel.country,
                        societe: scope.addressModel.societe
                    };

                    scope.updateAddressDir = !scope.updateAddressDir;
                };

                scope.cancelUpdateAddress = function() {
                    scope.addressModel.name = scope.deletedAddress.name;
                    scope.addressModel.street = scope.deletedAddress.street;
                    scope.addressModel.city = scope.deletedAddress.city;
                    scope.addressModel.state = scope.deletedAddress.state;
                    scope.addressModel.zip = scope.deletedAddress.zip;
                    scope.addressModel.country = scope.deletedAddress.country;
                    scope.addressModel.societe = scope.deletedAddress.societe;
                    scope.updateAddressDir = !scope.updateAddressDir;
                };
                scope.getLocation = function(val) {
                    return $http.jsonp('https://modules.tomanage.fr/api/zipcode/autocomplete?callback=JSON_CALLBACK&q=' + val)
                        .then(function(res) {
                            return res.data;
                        });
                };

                scope.generateZip = function(item) {
                    scope.addressModel.zip = item.zip;
                    scope.addressModel.city = item.city;
                };
            }
        };
    }
]);*/

MetronicApp.directive('save', function() {
		return {
				restrict: 'E',
				scope: {
						ngDisabled: '=?',
						mode: '=?',
						ngCreate: '&',
						ngUpdate: '&',
						backTo: "=",
						paramsBackTo: "=?"
				},
				templateUrl: "/templates/saveMenu.html",
				link: function(scope) {
						if (!scope.paramsBackTo)
								scope.paramsBackTo = {};
				}
		};
});

MetronicApp.directive('address', ['$http', 'Societes',
		function($http, Societes) {
				return {
						restrict: 'E',
						scope: {
								addressModel: '=?ngModel',
								editable: '=?ngDisabled',
								mode: '=?',
								supplier: '=?'
						},
						templateUrl: function(el, attr) {
								if (attr.mode) {
										if (attr.mode === 'edit')
												return '/templates/core/address2.html';

										if (attr.mode === 'simple')
												return '/templates/core/address2.html';

										if (attr.mode === 'shipping' || attr.mode === 'withEmail')
												return '/templates/core/addressShipping.html';

										if (attr.mode === 'show')
												return '/templates/core/address_show.html';

								} else
										return '/templates/core/addressWithContact.html';
						},
						link: function(scope) {
								//console.log(scope);

								if (!scope.editable)
										scope.editable = false;

								$http({
										method: 'GET',
										url: '/erp/api/countries'
								}).success(function(data, status) {
										scope.countries = data.data;
								});

								scope.addressShipping = []; //List for select of delivery Address

								if (scope.supplier)
										Societes.get({
												Id: scope.supplier
										}, function(response) {
												scope.addressShipping = response.shippingAddress;
										});

								scope.reloadAddress = function() {
										for (let i = 0; i < scope.addressShipping.length; i++) {
												if (scope.addressShipping[i]._id == scope.addressModel._id) {
														scope.addressModel = angular.copy(scope.addressShipping[i]);
														break;
												}
										}

								};

								scope.updateAddressDir = true;

								scope.deletedAddress = {
										_id: null,
										name: null,
										street: null,
										city: null,
										state: null,
										zip: null,
										country: null,
										contact: {},
										societe: {}
								};

								scope.enableUpdateAddress = function() {
										scope.deletedAddress = {
												_id: scope.addressModel._id,
												name: scope.addressModel.name,
												street: scope.addressModel.street,
												city: scope.addressModel.city,
												state: scope.addressModel.state,
												zip: scope.addressModel.zip,
												country: scope.addressModel.country,
												contact: scope.addressModel.contact
										};

										scope.updateAddressDir = !scope.updateAddressDir;
								};

								scope.cancelUpdateAddress = function() {
										scope.addressModel._id = scope.deletedAddress._id;
										scope.addressModel.name = scope.deletedAddress.name;
										scope.addressModel.street = scope.deletedAddress.street;
										scope.addressModel.city = scope.deletedAddress.city;
										scope.addressModel.state = scope.deletedAddress.state;
										scope.addressModel.zip = scope.deletedAddress.zip;
										scope.addressModel.country = scope.deletedAddress.country;
										scope.addressModel.contact = scope.deletedAddress.contact;
										scope.updateAddressDir = !scope.updateAddressDir;
								};
								scope.getLocation = function(val) {
										return $http.jsonp('https://modules.tomanage.fr/api/zipcode/autocomplete?callback=JSON_CALLBACK&q=' + val)
												.then(function(res) {
														return res.data;
												});
								};

								scope.generateZip = function(item) {
										scope.addressModel.zip = item.code;
										scope.addressModel.city = item.city;
								};
						}
				};
		}
]);

MetronicApp.directive('contactId', ['$http', '$modal', 'Societes',
		function($http, $modal, Societes) {
				return {
						restrict: 'E',
						scope: {
								contactModel: '=ngModel',
								supplier: '=?',
								mode: '=?'
						},
						templateUrl: function(el, attr) {
								if (attr.mode) {
										if (attr.mode === 'create')
												return '/templates/core/contact_edit.html';
								} else
										return '/templates/core/contact.html';
						},
						link: function(scope) {

								scope.updateContactDir = true;
								scope.contacts = [];

								scope.$watch('supplier', function(newValue, oldValue) {
										if (!newValue)
												return;

										var query = {
												//forSales: ($scope.forSales ? true : false),
												//quickSearch: $scope.quickSearch,
												filter: {
														company: {
																value: [newValue._id],
														}
												},
												viewType: 'list',
												contentType: 'societe',
												//limit: $scope.page.limit,
												//page: $scope.page.page,
												//sort: $scope.sort
												field: "_id name poste emails phones"
										};

										Societes.query(query, function(data, status) {
												//console.log(data);
												scope.contacts = data.data;
										});
								});
								scope.addContact = function() {
										scope.contactModel.push(scope.selectedContact._id);
										scope.$parent.update(function(err, response) {
												scope.$parent.findOne();
										});

								};

								scope.deleteContact = function(index) {
										scope.contactModel.splice(index, 1);
										scope.$parent.update(function(err, response) {
												scope.$parent.findOne();
										});
								};

								var ModalContactCtrl = function($scope, $modalInstance, options) {
										$scope.create = false;
										$scope.dict = options.dict;

										$scope.contact = {
												type: 'Person',
												salesPurchases: {
														isActive: true
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

										$scope.delete = function(contact) {
												$http({
														method: 'DELETE',
														url: '/erp/api/societe/' + contact._id
												}).success(function(data, status) {
														$scope.contact.splice(index, 1);
												});
										};

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

								scope.addNewContact = function() {

										var modalInstance = $modal.open({
												templateUrl: '/templates/contact/modal/addContact.html',
												controller: ModalContactCtrl,
												resolve: {
														options: function() {
																return {
																		supplier: scope.supplier
																};
														}
												}
										});
										modalInstance.result.then(function(contacts) {
												//scope.contacts.push(contacts);
												scope.contactModel.push(contacts._id);
												scope.$parent.update(function(err, response) {
														scope.$parent.findOne();
												});
										}, function() {});
								};

								scope.deletedContact = {
										id: null,
										name: null,
										phone: null,
										email: null
								};

								scope.enableUpdateContact = function() {
										scope.deletedContact = {
												id: scope.contactModel.id,
												name: scope.contactModel.name,
												phone: scope.contactModel.phone,
												email: scope.contactModel.email
										};
										scope.updateContactDir = !scope.updateContactDir;
								};

								scope.cancelUpdateContact = function() {
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
		function($http, $modal, Products) {
				return {
						restrict: 'E',
						transclude: true,
						templateUrl: '/templates/core/barcode_button.html',
						scope: {
								obj: '=ngModel',
								//societe: '=?'
						},
						link: function(scope) {

								scope.addContact = function() {
										scope.contactModel.push(scope.selectedContact._id);
										scope.$parent.update(function(err, response) {
												scope.$parent.findOne();
										});

								};

								scope.addProducts = function() {

										var modalInstance = $modal.open({
												templateUrl: '/templates/core/modal/barcode_scan.html',
												controller: function($scope, $modalInstance, object) {
														//$scope.items = items;
														//console.log(object);

														var round = function(value, decimals) {
																if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
																		return 0;
																return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
														};

														$scope.readNewScan = function() {
																console.log("SCAN");

																$http.post('/erp/api/product/scan', {
																		scan: $scope.scan,
																		price_level: object.price_level,
																		qty: 1
																}).then(function(res) {
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

														var addProduct = function(data, index, lines) {
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

														var calculMontantHT = function(line, data, varname) {
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
																				priceLists: object.price_level,
																				qty: line.qty,
																				product: line.product.id
																		}).then(function(res) {
																				console.log("TATA");
																				console.log(res.data);
																				line.pu_ht = res.data.pu_ht;
																				//return res.data;
																				calculHT(line);
																		});

																calculHT(line);
														};

														$scope.ok = function() {
																$modalInstance.close($scope.selected.item);
														};

														$scope.cancel = function() {
																$modalInstance.dismiss('cancel');
														};
												},
												windowClass: "",
												resolve: {
														object: function() {
																return scope.obj;
														}
												}
										});
										modalInstance.result.then(function(contacts) {
												//scope.contacts.push(contacts);
												scope.contactModel.push(contacts._id);
												scope.$parent.update(function(err, response) {
														scope.$parent.findOne();
												});
										}, function() {});
								};

								scope.deletedContact = {
										id: null,
										name: null,
										phone: null,
										email: null
								};

								scope.enableUpdateContact = function() {
										scope.deletedContact = {
												id: scope.contactModel.id,
												name: scope.contactModel.name,
												phone: scope.contactModel.phone,
												email: scope.contactModel.email
										};
										scope.updateContactDir = !scope.updateContactDir;
								};

								scope.cancelUpdateContact = function() {
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
		function($http) {
				return {
						restrict: 'E',
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
								onSelect: "=",
								bootstrap: "=" // Bootstrap or material desgin ? (default false -> md)
						},
						templateUrl: function(el, attr) {
								return '/templates/core/crm_id-form.html';
						},
						link: function(scope, elm, attrs, ctrl) {
								//console.log(scope);

								scope.$error = false;
								scope.$error2 = true; // Only if accueil compte

								scope.AutoComplete = function(val, url, entity) {
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

								scope.refreshData = function() {
										$http.get("/erp/api/societe/" + scope.model._id).then(function(res) {
												//console.log(res.data);
												scope.onSelect(res.data);
										});
								}

								scope.change = function(item) {
										if (scope.onSelect)
												scope.onSelect(item);

										//console.log(item);
										ctrl.$setViewValue(item);

								}

								ctrl.$validators.id = function(modelValue, viewValue) {

										if (ctrl.$isEmpty(modelValue)) {
												if (scope.required) {
														scope.$error = true;
														return false;
												} else {
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
								scope.changeName = function() {
										if (scope.model.name === 'Accueil' || !scope.model.name)
												scope.$error2 = true;
										else
												scope.$error2 = false;
								};
						}
				};
		}
]);
MetronicApp.directive('crmNotes', [
		function() {
				return {
						restrict: 'E',
						require: 'ngModel',
						scope: {
								noteModel: '=ngModel',
								ngChange: '&'
						},
						templateUrl: function(el, attr) {
								return '/templates/core/notes.html';
						},
						link: function(scope, elem, attrs, ngModel) {

								//scope.updateNoteDir = true;
								//console.log("titi",scope);
								var first = false;

								scope.$watch('noteModel', function() {
										//console.log(typeof scope.noteModel);
										if (typeof scope.noteModel == "undefined") {
												first = true;
												scope.noteModel = {};
										} else {
												first = false;
										}
								});

								scope.update = function() {
										//console.log("save");
										ngModel.$setViewValue(scope.noteModel);
										if (!first)
												scope.ngChange();

										return true;
								};
								scope.deletedNote = {
										title: null,
										note: null,
										public: false,
										edit: false
								};
								scope.enableUpdateNote = function() {
										scope.deletedNote = {
												title: scope.noteModel.title,
												note: scope.noteModel.note,
												public: true,
												edit: true
										};
										scope.updateNoteDir = !scope.updateNoteDir;
								};
								scope.cancelUpdateNote = function() {
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
		function(dateFilter) {
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
						link: function(scope, elm, attrs, ngModelCtrl) {
								ngModelCtrl.$formatters.length = 0;
								ngModelCtrl.$parsers.length = 0;

								scope.opened = false;

								scope.open = function($event) {
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
MetronicApp.directive('amChart', ['$q', function($q) {
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
				link: function($scope, $el) {
						var id = getIdForUseInAmCharts();
						$el.attr('id', id);
						var chart;

						// allow $scope.options to be a promise
						$q.when($scope.options).then(function(options) {
								// we can't render a chart without any data
								if (options.data) {
										var renderChart = function(amChartOptions) {
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
														.then(function(data) {

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

																		var addValueAxis = function(a) {
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
																		var addGraph = function(g) {
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
																		};
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

																var addEventListeners = function(obj, chartObj) {
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

										$scope.$on('amCharts.triggerChartAnimate', function(event, id) {
												if (id === $el[0].id || !id) {
														chart.animateAgain();
												}
										});

										$scope.$on('amCharts.updateData', function(event, data, id) {
												if (id === $el[0].id || !id) {
														chart.dataProvider = data;
														chart.validateData();
												}
										});

										$scope.$watch('datas', function(newValue, oldValue) {
												chart.dataProvider = newValue;
												chart.validateData();

										});


										$scope.$on('amCharts.validateNow', function(event, validateData, skipEvents, id) {
												if (id === $el[0].id || !id) {
														chart.validateNow(validateData === undefined ? true : validateData,
																skipEvents === undefined ? false : skipEvents);
												}
										});

										$scope.$on('amCharts.renderChart', function(event, amChartOptions, id) {
												if (id === $el[0].id || !id) {
														chart.clear();
														renderChart(amChartOptions);
												}
										});

										$scope.$on('$destroy', function() {
												chart.clear();
										});
								}
						});

						function getIdForUseInAmCharts() {
								var id = $el[0].id; // try to use existing outer id to create new id

								if (!id) { //generate a UUID
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

MetronicApp.directive('tableSort', [
		function() {
				return {
						restrict: 'A',
						require: 'ngModel',
						scope: {
								tableSort: '@',
								name: '@',
								ngModel: '=',
								//ngClick: '&',
						},
						template: '<div ng-click="changeSort()"><i class="fa fa-fw" ng-class="{\'fa-sort\' : ngModel[\'{{tableSort}}\'] === undefined, \'fa-sort-up\' : ngModel[\'{{tableSort}}\'] === 1, \'fa-sort-down\' : ngModel[\'{{tableSort}}\'] === -1}"></i>{{name}}</div>',
						link: function(scope, element, attrs, ngModel) {

								scope.changeSort = function() {
										var idx = scope.tableSort;

										if (scope.ngModel[idx])
												scope.ngModel[idx] *= -1;
										else {
												scope.ngModel = {};
												scope.ngModel[idx] = 1;
										}

										ngModel.$setViewValue(scope.ngModel);

										return scope.$parent.find();
								}

						}
				};
		}
]);

MetronicApp.directive('tablePagination', [
		function() {
				return {
						restrict: 'E',
						require: 'ngModel',
						scope: {
								page: '=ngModel',
								//ngClick: '&',
						},
						templateUrl: '/templates/layout/table-pagination.html',
						link: function(scope, element, attrs, ngModel) {

								scope.Math = window.Math;


								scope.find = function() {
										ngModel.$setViewValue(scope.page);

										return scope.$parent.find();
								};
						}
				};
		}
]);

MetronicApp.directive('productAttribut', ['$http',
		function($http) {
				return {
						restrict: 'E',
						require: 'ngModel',
						scope: {
								ngModel: '=',
								attribut: '=',
								type: "=?"
						},
						templateUrl: function(el, attr) {
								if (attr.type == 'filter')
										return '/templates/core/productAttibutFilter.html';
								return '/templates/core/productAttibutFilter.html';
						},
						link: function(scope) {
								console.log(scope);

								scope.toggleSelection = scope.$root.toggleSelection;

								var dict = ["fk_units", "fk_tva"];

								$http({
										method: 'GET',
										url: '/erp/api/dict',
										params: {
												dictName: dict
										}
								}).success(function(data, status) {
										scope.dict = data;
								});
						}
				};
		}
]);