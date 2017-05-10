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

'use strict';

angular.module("MetronicApp").controller('SettingGeneralController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });



}]);

angular.module("MetronicApp").controller('SettingEntityController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });


}]);

angular.module("MetronicApp").controller('SettingProductController', ['$rootScope', '$scope', '$http', '$timeout', 'Settings', function($rootScope, $scope, $http, $timeout, Settings) {
    var current = $rootScope.$state.current.name.split('.');
    $scope.backTo = 'settings.product.types';
    console.log(current);

    if (current.length <= 2)
        return $rootScope.$state.go('settings.product.attributes');

    $scope.createMod = true;

    $scope.dict = {
        attributesMode: [{
            id: 'text',
            name: 'Champs texte',
            isActive: true
        }, {
            id: 'number',
            name: 'Nombre',
            isActive: true
        }, {
            id: 'metric',
            name: 'Valeur metrique',
            isActive: true
        }, {
            id: 'textarea',
            name: 'Texte long',
            isActive: true
        }, {
            id: 'boolean',
            name: 'Oui/Non',
            isActive: false
        }, {
            id: 'select',
            name: 'Valeurs pré-définies',
            isActive: true
        }, {
            id: 'date',
            name: 'Date',
            isActive: false
        }, {
            id: 'file',
            name: 'Fichier',
            isActive: false
        }, {
            id: 'image',
            name: 'Image',
            isActive: false
        }]
    };
    $scope.object = {
        langs: []
    };
    $scope.listObject = [];

    switch (current[2]) {
        case 'types':
            var Resource = Settings.productTypes;
            break;
        case 'family':
            var Resource = Settings.productFamily;
            Settings.productAttributes.query({}, function(res) {
                $scope.attributes = res.data;
            });
            break;
        case 'attributes':
            var Resource = Settings.productAttributes;
            break;
        case 'pricelists':
            var Resource = Settings.priceList;
            break;
    }

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;

        if (current[current.length - 1] == 'show')
            $scope.findOne();

        $scope.find();
    });

    $scope.findOne = function() {
        if (!$rootScope.$stateParams.id)
            return;

        Resource.get({
            Id: $rootScope.$stateParams.id
        }, function(object) {
            $scope.object = object;
            console.log(object);
            $scope.createMod = false;

            if (object.opts) {
                object.options = [];
                angular.forEach(object.opts, function(element) {
                    object.options.push(element._id);
                });
            }

        });
    };

    $scope.find = function() {
        $scope.createMod = true;
        Resource.query({}, function(data) {
            console.log(data);
            $scope.listObject = data.data;
        });
    };

    $scope.create = function() {
        var object = new Resource(this.object);
        object.$save(function(response) {
            current.pop();
            $rootScope.$state.go(current.join('.'));
        });
    };

    $scope.update = function(stay) {
        $scope.object.$update(function(response) {
            $scope.object = response;
            if (stay)
                return $scope.findOne();

            current.pop();
            $rootScope.$state.go(current.join('.'));
        });
    };

    $scope.remove = function(line) {
        var object = new Resource(line);
        object.$remove(function() {
            $scope.find();
        });
    };


}]);

angular.module("MetronicApp").controller('SettingIntegrationController', ['$rootScope', '$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        Metronic.initAjax();

        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });



}]);