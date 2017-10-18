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