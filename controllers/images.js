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


"use strict";

var async = require('async'),
    _ = require('lodash'),
    fs = require('fs'),
    Image = require('total.js/image');

exports.install = function() {

    let images = new Images();

    F.route('/erp/api/images/{Model}/{Id}', function(model, id) {
        var self = this;
        var Model = MODEL(model).Schema;

        if (self.body.data)
            var body = JSON.parse(self.body.data);

        //console.log(self.body);

        var saveFile = function() {

            self.module('gridfs').addFile(Model, id, self.files[0], function(err, doc, file) {
                //console.log(file);

                if (body && body.varname) {
                    doc[body.varname] = file._id;
                    doc.save(function(err, doc) {});
                }

                if (err)
                    return self.throw500(err);

                self.json(doc);
            });
        };

        if (self.files.length > 0) {

            if (self.files[0].type.split("/")[0] === "image") {
                //console.log(self.files[0]);

                var image = Image.load(fs.createReadStream(self.files[0].path));

                if (body && body.varname === 'logo')
                    image.thumbnail(200, 200);

                image.minify();
                return image.save(self.files[0].path, function() {
                    saveFile();
                });
            }

            saveFile();

        } else
            self.throw500("Error in request file");
    }, ['upload', 'authorize'], 10240);

    F.route('/erp/api/images/{Model}/{fileId}', function(model, fileId) {
        var self = this;
        var Model = MODEL(model).Schema;

        Model.getFile(fileId, function(err, store) {
            if (err)
                return self.throw500(err);

            if (self.query.download)
                return self.stream(store.contentType, store.stream(true), store.metadata.originalFilename); // for downloading 

            //store.stream(true).pipe(self.res);
            self.stream(store.contentType, store.stream(true));

        });
        /*var filestorage = self.filestorage('societe');
         
         filestorage.pipe(2, self.req, self.res, 0);*/

    }, ['authorize']);

    /*F.route('/erp/api/images', function() {
        var self = this;

        if (!self.query.model)
            return self.json([]);

        var Model = MODEL(self.query.model).Schema;

        var query = {};
        if (self.query.id)
            query = {
                "metadata._id": self.query.id
            };

        // get file list for a specifiq id link to a model collection
        return Model.listFiles(query, function(err, items) {
            if (err)
                return self.throw500(err);

            if (!items)
                return self.json([]);

            //console.log(items);

            var result = items.map(function(item) {
                //File type
                var type;

                switch (item.contentType) {
                    case "image/png":
                        type = "image";
                        break;
                    case "image/jpeg":
                        type = "image";
                        break;
                    default:
                        type = "file";
                }

                return {
                    id: item._id,
                    fileName: item.metadata.originalFilename || item.metadata.filename,
                    description: "",
                    type: type,
                    url: "/erp/api/file/" + self.query.model + '/' + item._id + '?download=1',
                    img: "/erp/api/file/" + self.query.model + '/' + item._id
                };
            });

            self.json(result);
        });

    }, ['authorize']);*/

    //Scan directory productImages and refresh collection Images 
    F.route('/erp/api/images/bank', images.scanDirectory, ['put', 'authorize']);
    F.route('/erp/api/images/bank', images.getAllImages, ['authorize']);
    F.file('/erp/api/images/bank/s/*', images.fileImage); //small
    F.file('/erp/api/images/bank/m/*', images.fileImage); //medium
    F.file('/erp/api/images/bank/l/*', images.fileImage); //large
    F.route('/erp/api/images/bank', images.uploadImages, ['upload', 'authorize'], 10240);
    F.route('/erp/api/images/bank/{Id}', images.replaceImages, ['upload', 'authorize'], 10240);

    F.route('/erp/api/images/{Model}/{Id}', function(model, id) {
        var self = this;
        var Model = MODEL(model).Schema;

        Model.findOne({
            _id: id
        }, function(err, doc) {

            if (err)
                return self.throw500(err);

            doc.removeFile(self.query.fileId, function(err, result) {
                if (err)
                    return self.throw500(err);

                return self.json( /*{status: "ok"}*/ result);
            });
        });
    }, ['delete', 'authorize']);
};


var Images = function() {
    return new function() {
        this.scanDirectory = function() {
            var self = this;
            var ImagesModel = MODEL('Images').Schema;

            U.ls(F.path.root() + '/productImages', function(files) {
                console.log(files);
                async.forEach(files, function(file, aCb) {
                    //Suppress special character in image filename

                    //Filter on no extension files
                    if (file.split('/').last().indexOf('.') == -1)
                        return aCb();

                    var newFile = file.replace(/[^a-zA-Z0-9-_./]/g, '');
                    var extension = newFile.split('.').last().toLowerCase();
                    newFile = newFile.split('.');
                    newFile.pop();
                    newFile.push(extension);
                    newFile = newFile.join('.');
                    newFile = newFile.replace('.jpeg', '.jpg');

                    async.waterfall([
                        function(wCb) {
                            if (newFile === file)
                                return wCb(null, newFile);

                            fs.rename(file, newFile, function(err) {
                                if (err) console.log('ERROR: ' + err);

                                return wCb(null, newFile);
                            });
                        },
                        function(file, wCb) {

                            let name = file.split('/');
                            name = name.last();

                            let image = Image.load(file);

                            image.measure(function(err, size) {
                                if (err)
                                    return wCb(err);
                                wCb();
                                console.log('toto');
                                /*    ImagesModel.update({ imageSrc: name }, {
                                        $set: {
                                            imageSrc: name,
                                            size: size
                                        }
                                    }, { upsert: true }, wCb);*/
                            });
                        }
                    ], function(err) {
                        if (err) {
                            console.log(err);
                            return aCb();
                        }

                        return aCb();
                    });
                }, function(err) {
                    if (err) {
                        console.log(err);
                        return self.json({
                            errorNotify: {
                                title: 'Erreur',
                                message: err
                            }
                        });
                    }

                    //console.log(doc);
                    let doc = {};
                    doc.successNotify = {
                        title: "Success",
                        message: "Mise a jour ok"
                    };
                    self.json(doc);
                });
            });
        };
        this.getAllImages = function() {
            let self = this;
            var ImagesModel = MODEL('Images').Schema;

            ImagesModel.find({}, function(err, docs) {
                if (err)
                    return self.throw500(err);

                return self.json({ data: docs });
            });
        };

        // Reads specific picture from directory
        // URL: /images/small|large/*.jpg
        this.fileImage = function(req, res) {
            // Below method checks if the file exists (processed) in temporary directory
            // More information in total.js documentation

            let self = this;
            F.exists(req, res, 10, function(next, filename) {

                let readStream;

                if (fs.existsSync(F.path.root() + '/productImages/' + req.split.last()))
                    readStream = fs.createReadStream(F.path.root() + '/productImages/' + req.split.last());
                else
                    readStream = fs.createReadStream(F.path.public() + '/assets/admin/layout/img/nophoto.jpg');

                readStream.once('end', function() {

                    // Image processing
                    res.image(filename, function(image) {
                        image.output('jpg');
                        image.quality(90);

                        switch (req.split[req.split.length - 2]) {
                            case 'l':
                                image.miniature(600, 400);
                                break;
                            case 'm':
                                image.miniature(320, 180);
                                break;
                            case 's':
                                image.miniature(200, 150);
                                break;
                        }

                        image.minify();
                    });

                    // Releases F.exists()
                    next();
                }).pipe(fs.createWriteStream(filename));
            });
        };
    };
};