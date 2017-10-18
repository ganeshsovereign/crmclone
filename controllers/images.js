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

var async = require('async'),
    _ = require('lodash'),
    fs = require('fs'),
    Image = require('total.js/image');

exports.install = function() {

    let images = new Images();
    let productImages = new ProductImages();

    F.route('/erp/api/images/product/{id}', productImages.getAllImagesByProductId, ['authorize']);
    F.route('/erp/api/images/product/{id}', productImages.addImageToProductId, ['put', 'json', 'authorize']);
    F.route('/erp/api/images/product/{Id}', productImages.removeImageFromProduct, ['delete', 'authorize']);

    F.route('/erp/api/images/{Model}/{Id}', function(model, id) {
        var self = this;
        var Model = MODEL(model).Schema;

        if (self.body.data)
            var body = JSON.parse(self.body.data);

        //console.log(self.body);

        var saveFile = function() {

            self.module('files').addFile(Model, id, self.files[0], function(err, doc, file) {
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
    F.route('/erp/api/images/bank/{id}', images.updateFields, ['put', 'json', 'authorize']);
    F.route('/erp/api/images/bank', images.getAllImages, ['authorize']);
    F.file('/erp/api/images/bank/xs/*', images.fileImage); //small
    F.file('/erp/api/images/bank/s/*', images.fileImage); //small
    F.file('/erp/api/images/bank/m/*', images.fileImage); //medium
    F.file('/erp/api/images/bank/l/*', images.fileImage); //large
    F.route('/erp/api/images/bank', images.uploadImages, ['upload', 'authorize'], 10240);
    F.route('/erp/api/images/bank/{Id}', images.replaceImages, ['upload', 'authorize'], 10240);
    F.route('/erp/api/images/bank/{Id}', images.removeImage, ['delete', 'authorize']);
};


var Images = function() {
    return new function() {

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

        this.scanDirectory = function() {
            var self = this;
            var ImagesModel = MODEL('Images').Schema;

            U.ls(F.path.root() + '/productImages', function(files) {
                async.eachLimit(files, 100, function(file, aCb) {
                    //Suppress special character in image filename

                    //Filter on no extension files
                    if (file.split('/').last().indexOf('.') == -1)
                        return aCb();

                    var newFile = checkFilename(file);

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

                            if (name.split('.').last() !== 'png' && name.split('.').last() !== 'jpg')
                                return wCb();


                            /*crash with total.js 2.1 let image = Image.load(file);

                            image.measure(function(err, info) {
                                if (err)
                                    return wCb(err);
                                wCb();
                                console.log(info);*/
                            ImagesModel.update({
                                imageSrc: name
                            }, {
                                $set: {
                                    imageSrc: name
                                    // size: size
                                }
                            }, {
                                upsert: true
                            }, wCb);
                            //});
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

            console.log(self.query);

            var paginationObject = MODULE('helper').page(self.query);
            var limit = paginationObject.limit;
            var skip = paginationObject.skip;

            var query = {};
            if (self.query.filter)
                query = {
                    "$or": [{
                        'langs.description': new RegExp(self.query.filter, "gi")
                    }, {
                        'langs.name': new RegExp(self.query.filter, "gi")
                    }, {
                        'imageSrc': new RegExp(self.query.filter, "gi")
                    }]
                };

            function queryBuilder() {
                var query1 = ImagesModel.find(query);

                query1.sort({
                    imageSrc: 1
                });
                return query1;
            }

            var queryNew = queryBuilder();
            var countQuery = queryBuilder();

            var getTotal = function(pCb) {

                countQuery.count(function(err, _res) {
                    if (err)
                        return pCb(err);

                    pCb(null, _res);
                });
            };

            var getData = function(pCb) {
                queryNew.skip(skip).limit(limit).exec(function(err, _res) {
                    if (err)
                        return pCb(err);

                    pCb(null, _res);
                });
            };

            async.parallel([getTotal, getData], function(err, result) {
                var count;
                var response = {};

                if (err)
                    return self.throw500(err);

                count = result[0] || 0;

                response.total = count;
                response.data = result[1];

                return self.json(response);
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
                            case 'xs':
                                image.miniature(32, 32);
                                break;
                        }

                        image.minify();
                    });

                    // Releases F.exists()
                    next();
                }).pipe(fs.createWriteStream(filename));
            });
        };

        this.uploadImages = function() {
            var self = this;
            var ImagesModel = MODEL('Images').Schema;
            var round = MODULE('utils').round;

            var file = self.files[0];
            if (self.files.length === 0 || !file.isImage())
                return self.throw500();

            var filename = checkFilename(file.filename);

            var image = file.image();
            image.save(F.path.root() + '/productImages/' + filename, function(err) {
                if (err)
                    return self.throw500(err);

                ImagesModel.update({
                    imageSrc: filename
                }, {
                    $set: {
                        imageSrc: filename,
                        size: {
                            width: file.width,
                            height: file.height
                        },
                        length: round(file.length / 1024000, 2) // MB
                    }
                }, {
                    upsert: true
                }, function(err, doc) {
                    if (err)
                        return self.throw500(err);

                    self.json();
                });
            });
        };

        this.removeImage = function(id) {
            var self = this;
            var ImagesModel = MODEL('Images').Schema;
            var ProductImagesModel = MODEL('productImages').Schema;

            ProductImagesModel.remove({
                image: id
            }, function(err, doc) {
                if (err)
                    return self.throw500(err);

                ImagesModel.findByIdAndRemove(id, function(err, doc) {
                    if (err || !doc)
                        return self.throw500(err);

                    fs.unlinkSync(F.path.root() + '/productImages/' + doc.imageSrc);

                    return self.json(doc);
                });
            });
        };

        this.updateFields = function(id) {
            var self = this;
            var ImagesModel = MODEL('Images').Schema;

            ImagesModel.findByIdAndUpdate(id, self.body, function(err, doc) {
                if (err)
                    return self.throw500(err);

                return self.json({});
            });
        };
    };
};

var ProductImages = function() {
    return new function() {
        this.getAllImagesByProductId = function(id) {
            let self = this;
            var ProductImagesModel = MODEL('productImages').Schema;
            console.log(id);

            ProductImagesModel.find({
                    product: id
                })
                .populate("image")
                .sort({
                    'image.imageSrc': 1
                })
                .exec(function(err, docs) {
                    if (err)
                        return self.throw500(err);

                    return self.json({
                        data: docs,
                        id: _.map(docs, elem => elem.image._id)
                    });
                });
        };
        this.addImageToProductId = function(id) {
            let self = this;
            var ProductImagesModel = MODEL('productImages').Schema;

            ProductImagesModel.update({
                product: id,
                image: self.body.image
            }, {
                $set: {
                    product: id,
                    image: self.body.image
                }
            }, {
                upsert: true
            }, function(err, doc) {
                if (err)
                    return self.throw500(err);

                self.json(doc);
            });

        };
        this.removeImageFromProduct = function(id) {
            var self = this;

            var ProductImagesModel = MODEL('productImages').Schema;

            ProductImagesModel.remove({
                _id: id
            }, function(err, doc) {
                if (err)
                    return self.throw500(err);

                return self.json(doc);
            });
        };
    };
};