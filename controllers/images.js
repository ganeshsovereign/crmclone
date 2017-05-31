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

    F.route('/erp/api/images', function() {
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

    }, ['authorize']);

    //Scan directory productImages and refresh collection Images 
    F.route('/erp/api/images', images.scanDirectory, ['put', 'authorize']);

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
                async.forEach(files, function(file, aCb) {
                    let name = file.split('/');
                    name = name.pop();

                    ImagesModel.update({ imageSrc: name }, {
                        $set: {
                            imageSrc: name
                        }
                    }, { upsert: true }, aCb);
                }, function(err) {
                    if (err)
                        return self.throw500(err);

                    return self.json({});
                });
            });
        };
    };
};