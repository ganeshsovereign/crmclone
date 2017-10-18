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
var async = require('async'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    Image = require('total.js/image');

var defaultFileDir = F.path.root() + '/uploads';

function checkFilename(filename) {
    var newFile = filename.replace(/[^a-zA-Z0-9-_./]/g, '');
    var extension = newFile.split('.').last().toLowerCase();
    newFile = newFile.split('.');
    newFile.pop();
    newFile.push(extension);
    newFile = newFile.join('.');
    newFile = newFile.replace('.jpeg', '.jpg');
    return newFile;
}

function makeDir(p, opts, f, made) {
    var mode;
    var xfs;
    var cb;

    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    } else if (!opts || typeof opts !== 'object') {
        opts = {
            mode: opts
        };
    }

    mode = opts.mode;
    xfs = opts.fs || fs;

    if (!made) {
        made = null;
    }

    cb = f || function() {};

    p = path.resolve(p);

    xfs.mkdir(p, mode, function(er) {
        if (!er) {
            made = made || p;

            return cb(null, made);
        }

        switch (er.code) {
            case 'ENOENT':
                makeDir(path.dirname(p), opts, function(er, made) {
                    if (er) {
                        return cb(er, made);
                    }

                    makeDir(p, opts, cb, made);
                });
                break;

            default:
                xfs.stat(p, function(er2, stat) {
                    if (er2 || !stat.isDirectory()) {
                        cb(er, made);
                    } else {
                        cb(null, made);
                    }
                });
                break;
        }
    });
};

function writeFile(filePath, item, callback) {

    var data;

    if (Object.keys(item).indexOf('path') === -1) {

        data = convertFromBase64(item);

        return fs.writeFile(filePath, data, callback);
    }

    async.waterfall([function(waterfallCb) {
        fs.readFile(item.path, waterfallCb);
    }, function(data, waterfallCb) {
        try {
            fs.writeFile(filePath, data, waterfallCb);
        } catch (err) {
            waterfallCb(err);
        }
    }], callback);

}

function listGridFiles(query, options, fn) {
    var db = mongoose.connection.db;

    //GridStore.list(db, options.root,{id:true}, fn);

    // Verify the existance of the fs.files document
    db.collection(options.root + '.files', function(err, collection) {
        collection.find(query).toArray(fn);
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
        var ObjectId = MODULE('utils').ObjectId;
        var options = opt;

        var self = this;

        self.findOne({
            'files._id': ObjectId(fileId)
        }, "files", function(err, doc) {
            if (err)
                return fn(err);

            if (!doc)
                return fn("No id found");

            //return console.log(doc);

            for (var i = 0; i < doc.files.length; i++)
                if (doc.files[i]._id.toString() === fileId) {

                    var filePath = path.join(defaultFileDir, opt.root, doc._id.toString(), doc.files[i].name);
                    return fs.access(filePath, function(err) {
                        if (err)
                            return fn(err);

                        fn(null, {
                            contentType: doc.files[i].type,
                            metadata: {
                                originalFilename: doc.files[i].originalFilename
                            },
                            stream: function() {
                                return fs.createReadStream(filePath);
                            }
                        });
                    });

                }

        });
    }


    /**
     * Add file to GridFs
     * @param {String} file
     * @return {Boolean}
     * @api public
     */
    schema.methods.addFiles = function(files, fn) {
        var _this = this;
        var targetPath;
        var filePath;
        var _files = _this.files;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        var folderName = this._id.toString() || '/';
        targetPath = path.join(defaultFileDir, opt.root, folderName);

        async.eachSeries(files, function(item, eachCb) {
                item.name = checkFilename(item.filename);
                var attachfileName = item.name.slice(0, item.name.lastIndexOf('.'));
                var checkIs = false;
                var maxK = 0;
                var k = '';
                var files;

                function resultMaker(err) {
                    var file = {};

                    if (err)
                        return eachCb(err);

                    //Update ModelObject by Id

                    file._id = mongoose.Types.ObjectId();
                    file.name = item.name;
                    file.originalFilename = item.filename;
                    file.type = item.type;
                    file.shortPas = encodeURIComponent(filePath);

                    file.size = item.length;

                    file.datec = new Date();

                    _files.push(file);

                    _this.update({
                        $addToSet: {
                            files: file
                        }
                    }, {
                        upsert: false
                    }, function(err, doc) {
                        if (err)
                            return eachCb(err);

                        if (!doc)
                            return eachCb('No document id');

                        return eachCb();
                    });
                }

                filePath = path.join(defaultFileDir, opt.root, folderName, item.name);

                if (fs.existsSync(targetPath)) {
                    files = fs.readdirSync(targetPath);
                    files.forEach(function(fileName) {
                        var intVal;

                        if (fileName === item.name) {
                            k = 1;
                            checkIs = true;
                        } else {
                            if ((fileName.indexOf(attachfileName) === 0) &&
                                (fileName.lastIndexOf(attachfileName) === 0) &&
                                (fileName.lastIndexOf(').') !== -1) &&
                                (fileName.lastIndexOf('(') !== -1) &&
                                (fileName.lastIndexOf('(') < fileName.lastIndexOf(').')) &&
                                (attachfileName.length === fileName.lastIndexOf('('))) {
                                intVal = fileName.slice(fileName.lastIndexOf('(') + 1, fileName.lastIndexOf(').'));
                                k = parseInt(intVal, 10) + 1;
                            }
                        }
                        if (maxK < k) {
                            maxK = k;
                        }
                    });

                    if (!(maxK === 0) && checkIs) {
                        item.name = attachfileName + '(' + maxK + ')' + item.name.slice(item.name.lastIndexOf('.'));
                    }

                    filePath = path.join(defaultFileDir, opt.root, folderName, item.name);

                    writeFile(filePath, item, resultMaker);
                } else {
                    makeDir(targetPath, function(err) {
                        if (err)
                            eachCb(err);
                        else
                            writeFile(filePath, item, resultMaker);

                    });
                }
            },
            function(err) {
                if (err)
                    return fn(err);

                fn(null, _files);
            });

        /* putGridFileByPath(file.path, (this._id) + "_" + file.filename, file.filename, options, function(err, result) {
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
        });*/
    };
    schema.methods.removeFile = function(fileId, fn) {
        var _this = this;

        var options = opt;

        var found = false;
        for (var i = 0; i < _this.files.length; i++) {
            if (_this.files[i]._id.toString() == fileId) {
                let filePath = path.join(defaultFileDir, opt.root, _this._id.toString(), _this.files[i].name);

                fs.access(filePath, function(err) {
                    if (err)
                        return console.log(err);

                    fs.unlink(filePath, function() {});
                });

                _this.files.splice(i, 1);
            }
        }

        return _this.update({
            $set: {
                files: _this.files
            }
        }, function(err, doc) {
            fn(err, {
                files: _this.files
            });
        });
    };
    schema.methods.getFile = function(fileId, fn) {

        var options = opt;
        var self = this;

        for (var i = 0; i < doc.files.length; i++)
            if (doc.files[i]._id.toString() === fileId) {
                console.log("toto");
            }

        return;

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