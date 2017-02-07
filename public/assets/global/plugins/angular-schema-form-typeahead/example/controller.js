App.controller('DynFormController', ['$scope', '$http', '$modalInstance', '$rootScope', 'object', 'options', function ($scope, $http, $modalInstance, $rootScope, object, options) {

        //console.log(object);
        $scope.model = object;

        $scope.dynform = {};

        //GET the JSON with schema and form
        $http.get('/erp/api/product/dynform/' + object.product.dynForm)
                .then(function (res) {
                    //console.log(res.data);
                    $scope.dynform = res.data;
                });

        // Send model to update the price form my example
        $scope.updated = function (modelValue, form) {
            //console.log(options);
            $http.post('/erp/api/product/combined/' + options.price_level, this.model)
                    .then(function (res) {
                        //console.log(res.data);
                        //angular.extend($scope.model, res.data);
                        $scope.model = res.data;
                        $scope.$broadcast('schemaFormValidate');
                    });
        };

        // update validator
        $scope.addOrUpdate = function (form) {
            //console.log(this.model);
            $scope.$broadcast('schemaFormValidate');
            if (form.$valid) {
                $modalInstance.close(this.model);
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        // for autocomplete it's my function for find
        $scope.productAutoComplete = function (val, family) {
            //console.log(object);
            return $http.post('/erp/api/product/autocomplete', {
                take: 50,
                skip: 0,
                page: 1,
                pageSize: 50,
                price_level: options.price_level,
                supplier: options.supplier,
                family: family || object.product.family,
                filter: {logic: 'and', filters: [{value: val}]
                }
            }).then(function (res) {
                //console.log(res.data);
                return res.data;
            });
        };

        $scope.addProduct = function (data, model) {
            $scope.updated();
        };

    }]);