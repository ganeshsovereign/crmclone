"use strict";
/* global angular: true, io: true */

/*MetronicApp.factory('socket', function ($rootScope) {
 if(typeof io == 'undefined')
 return;
 var socket = io.connect();
 return {
 on: function (eventName, callback) {
 socket.on(eventName, function () {
 var args = arguments;
 $rootScope.$apply(function () {
 callback.apply(socket, args);
 });
 });
 },
 emit: function (eventName, data, callback) {
 socket.emit(eventName, data, function () {
 var args = arguments;
 $rootScope.$apply(function () {
 if (callback) {
 callback.apply(socket, args);
 }
 });
 });
 }
 };
 });*/

MetronicApp.factory('websocketService', ['$rootScope', '$timeout', function($rootScope, $timeout) {

    var _ws;
    var _username = '';
    var messages = [];
    var users = [];

    function onMessage(e) {
        var data = JSON.parse(decodeURIComponent(e.data));
        $rootScope.$apply(function() {

            if (data.type === 'users') {
                users = data.message;
                $rootScope.$broadcast('websocket', 'users', users);
                return;
            }

            if (data.type === 'task') {
                $rootScope.$broadcast('websocket', data.type, data.message);
                return;
            }

            if (data.type === 'symeosnet') {
                //console.log(data);
                $rootScope.$broadcast('websocket', data.type, data.message);
                return;
            }

            if (data.type === 'notify') {
                if (data.users.length)
                    angular.forEach(data.users, function(value, key) {
                        if (value === $rootScope.login._id)
                            $rootScope.$broadcast('websocket', data.type, data.message);
                    });

                return;
            }

            messages.splice(0, 0, { user: data.user, message: data.message, date: data.date });
            $rootScope.$broadcast('websocket', 'message', messages);
        });
    }

    return {
        login: function(url, username) {

            _username = username;

            //_ws = new WebSocket(url);
            _ws = new ReconnectingWebSocket(url); //auto reconnect
            _ws.onmessage = onMessage;
            _ws.onopen = function() {
                _ws.send(encodeURIComponent(JSON.stringify({ type: 'change', message: _username })));
            };

        },
        logoff: function() {
            _ws.close();
            _ws = null;
            _username = '';
            users = [];
            $rootScope.$broadcast('websocket', 'users', users);
        },
        send: function(message) {
            _ws.send(encodeURIComponent(JSON.stringify({ type: 'message', message: message })));
        }
    };

}]);