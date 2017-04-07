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


exports.name = 'gridfs';
exports.version = '1.00';

var fs = require('fs');

exports.addFile = function (Model, id, file, callback) {
    var filename = file.path;

    if (fs.existsSync(filename)) {

        Model.findOne({
            _id: id
        }, function (err, doc) {
            if (err || doc === null) {
                console.log(err);
                return callback({
                    status: "Id not found"
                });
            }

            var opts;
            opts = {
                content_type: file.type,
                metadata: {
                    _id: id
                }
            };


            doc.addFile(file, opts, callback);
        });
    } else
        callback({
            foo: "bar",
            status: "failed"
        });
};

exports.getFile = function (Model, fileId, callback) {
    var doc = new Model();

    doc.getFile(fileId, function (err, store) {
        if (err)
            console.log(err);

        //console.log(store);
        callback(null, store);
    });
};

exports.delFile = function (Model, id, fileId, callback) {
    Model.findOne({
        _id: id
    }, function (err, doc) {

        if (err) {
            console.log(err);
            return callback({
                status: "Id not found"
            });
        }
        doc.removeFile(fileId, function (err, result) {
            if (err)
                console.log(err);

            callback(err, result);
        });
    });
};