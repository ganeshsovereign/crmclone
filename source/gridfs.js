/*
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
            //console.log(result);
            var files = {};
            files.name = result.filename;
            files.originalFilename = result.metadata.originalFilename;
            files.type = result.contentType;
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