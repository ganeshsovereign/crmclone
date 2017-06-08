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
    self.theme(null);
    self.view('angular', angular);
}