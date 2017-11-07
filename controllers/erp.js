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



var passport = require('passport'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    async = require('async');


var angular = {
    resources: [],
    controllers: []
};

exports.install = function() {


    loadFilesAngular(function(err, data) {
        if (err)
            return console.log(err);

        if (data)
            angular = data;
    });

    F.route('/erp/', view_erp, ['authorize']);
    F.route('/erp/', view_redirect, ['unauthorize']);
};

function view_redirect() {
    this.redirect('/login');
}

function loadFilesAngular(callback) {
    async.parallel({
        resources: function(cb) {
            var dir = __dirname + '/../app/resources';
            fs.stat(dir, function(err, stats) {
                if (err)
                    return cb(err);

                cb(null, fs.readdirSync(dir).filter(function(file) {
                    if (path.extname(file) === '.js')
                        return true;
                    return false;
                }));
            });
        },
        controllers: function(cb) {
            var dir = __dirname + '/../app/controllers';
            fs.stat(dir, function(err, stats) {
                if (err)
                    return cb(err);

                cb(null, fs.readdirSync(dir).filter(function(file) {
                    if (path.extname(file) === '.js')
                        return true;
                    return false;
                }));
            });
        }
    }, callback);
}

function view_erp() {
    var self = this;
    //console.log(self.host());
    //console.log(self.session);
    //self.theme(null);
    self.view('angular', angular);
}