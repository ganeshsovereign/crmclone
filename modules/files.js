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



exports.name = 'files';
exports.version = '1.01';

var fs = require('fs');

exports.addFiles = function(Model, id, files, callback) {
    Model.findById(id, "_id files", function(err, doc) {
        if (err || doc === null) {
            console.log(err);
            return callback({
                status: "Id not found"
            });
        }

        doc.addFiles(files, callback);
    });
};

exports.getFile = function(Model, fileId, callback) {
    var doc = new Model();

    doc.getFile(fileId, function(err, store) {
        if (err)
            console.log(err);

        //console.log(store);
        callback(null, store);
    });
};

exports.delFile = function(Model, id, fileId, callback) {
    Model.findOne({
        _id: id
    }, function(err, doc) {

        if (err) {
            console.log(err);
            return callback({
                status: "Id not found"
            });
        }
        doc.removeFile(fileId, function(err, result) {
            if (err)
                console.log(err);

            callback(err, result);
        });
    });
};