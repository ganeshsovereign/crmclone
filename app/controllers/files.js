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

MetronicApp.controller('FileCtrl', ['$scope', '$rootScope', '$http', 'FileUploader',
    function($scope, $rootScope, $http, FileUploader) {
        $scope.upload = false;

        $scope.files = [];

        var uploader = $scope.uploader = new FileUploader({
            autoUpload: true
        });

        $scope.init = function(model, object) {
            uploader.url = '/erp/api/file/' + model + '/' + object._id;
            $scope.model = model;
            $scope.id = object._id;
            $scope.object = object;
            $scope.find();
        };

        $scope.find = function() {
            this.upload = false;
            //console.log($scope.object.files);

            /*$http({
                method: 'GET',
                url: '/erp/api/file',
                params: {
                    model: $scope.model,
                    id: $scope.id
                }
            }).success(function(data, status) {
                //$scope.files = data;
                console.log(data);
            });*/
        };

        $scope.delete = function(id) {
            $http({
                method: 'DELETE',
                url: '/erp/api/file/' + $scope.model + '/' + $scope.id,
                params: {
                    fileId: id
                }
            }).success(function(data, status) {

                //console.log(data);
                if ($scope.object) {
                    $scope.object.files = data.files;
                    //$scope.object.__v = data.__v;
                }
            });
        };

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        $scope.typesConfig = {
            "file": {
                "icon": "fa fa-file-o icon-state-success"
            },
            "image": {
                "icon": "fa fa-file-image-o icon-state-success"
            }
        };

        // CALLBACKS
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            $scope.find();
        };

        uploader.onCompleteItem = function(item, response, status, headers) {
            console.log(response);
            if ($scope.object) {
                $scope.object.files = response.files;
                if (response.__v)
                    $scope.object.__v = response.__v;
            }
        };

        //console.info('uploader', uploader);

    }
]);