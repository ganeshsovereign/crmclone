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

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    fs = require('fs');

var GridStore = mongoose.mongo.GridStore,
    Grid = mongoose.mongo.Grid,
    ObjectID = mongoose.Types.ObjectId; //mongoose.mongo.BSONPure.ObjectID;

function getGridFile(id, options, fn) {

    var db = mongoose.connection.db,
        id = ObjectID(id),
        store = new GridStore(db, id, "r", options);

    store.open(function(err, store) {
        if (err) {
            return fn(err);
        }
        fn(null, store);
    });
}

function listGridFiles(query, options, fn) {
    var db = mongoose.connection.db;

    //GridStore.list(db, options.root,{id:true}, fn);

    // Verify the existance of the fs.files document
    db.collection(options.root + '.files', function(err, collection) {
        collection.find(query).toArray(fn);
    });

}

function putGridFile(buf, name, options, fn) {
    var db = mongoose.connection.db,
        options = parse(options);
    options.metadata.filename = name;

    new GridStore(db, name, "w", options).open(function(err, file) {
        if (err)
            return fn(err);
        else
            file.write(buf, true, fn);
        //TODO: Should we gridStore.close() manully??
    });
}

function putGridFileByPath(path, name, original, options, fn) {
    var db = mongoose.connection.db,
        options = parse(options);
    options.metadata.filename = name;
    options.metadata.originalFilename = original;

    new GridStore(db, name, "w", options).open(function(err, file) {
        if (err)
            return fn(err);
        else
            file.writeFile(path, fn);
    });
}

function deleteGridFile(id, options, fn) {
    console.log('Deleting GridFile ' + id);
    var db = mongoose.connection.db,
        // id = new mongoose.Types.ObjectId(id); //mongoose.mongo.BSONPure.ObjectID(id),
        store = new GridStore(db, id, 'r', options);

    store.unlink(function(err, result) {
        if (err)
            return fn(err);

        return fn(null);
    });
}

function parse(options) {
    var opts = {};
    if (options.length > 0) {
        opts = options[0];
    } else
        opts = options;

    if (!opts.metadata)
        opts.metadata = {};

    return opts;
}

/**
 * Insert plugin to schema
 * @param {type} schema
 * @param {type} opt
 * @returns {undefined}
 */

exports.pluginGridFs = function(schema, opt) {
    schema.add({
        files: [mongoose.Schema.Types.Mixed]
    });

    schema.statics.listFiles = function(query, fn) {

        var options = {
            root: opt.root
        };

        return listGridFiles(query, options, fn);
    };
    schema.statics.getFile = function(fileId, fn) {

        var options = opt;

        return getGridFile(fileId.toString(), options, function(err, store) {
            if (err) {
                console.log(err);
                return fn(err, null);
            }
            //console.log(store);
            fn(null, store);
        });
    }


    /**
     * Add file to GridFs
     * @param {String} file
     * @return {Boolean}
     * @api public
     */
    schema.methods.addFile = function(file, options, fn) {
        var _this = this;

        options.root = opt.root;

        return putGridFileByPath(file.path, (this._id) + "_" + file.filename, file.filename, options, function(err, result) {
            //console.log("Grifs : ", err, result);
            var files = {};
            files.name = result.filename;
            files.originalFilename = result.metadata.originalFilename;
            files.type = result.contentType;
            files.isImg = result.contentType.split("/")[0] === "image";
            files.size = result.internalChunkSize;
            files._id = result.fileId;
            files.datec = result.uploadDate;

            var update = false;
            for (var i = 0; i < _this.files.length; i++)
                if (_this.files[i].name === result.filename) {
                    _this.files[i] = files;
                    update = true;
                }

            if (!update)
                _this.files.push(files);

            return _this.save(function(err, doc) {
                fn(err, doc, files, update);
            });
        });
    };
    schema.methods.removeFile = function(fileId, fn) {
        var _this = this;

        var options = opt;

        var found = false;
        for (var i = 0; i < _this.files.length; i++) {
            if (_this.files[i]._id.toString() == fileId) {

                //_this.files[i] = files;
                deleteGridFile(_this.files[i]._id.toString(), options, function(err, result) {
                    if (err)
                        console.log(err);
                });
                _this.files.splice(i, 1);
            }
        }

        return _this.save(function(err, doc) {
            fn(err, doc);
        });
    };
    schema.methods.getFile = function(fileId, fn) {

        var options = opt;

        return getGridFile(fileId.toString(), options, function(err, store) {
            if (err) {
                console.log(err);
                return fn(err, null);
            }
            //console.log(store);
            fn(null, store);
        });
    };
};