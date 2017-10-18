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

var Dict = INCLUDE('dict');

exports.install = function() {

    F.route('/erp/api/file/{Model}/{Id}', function(model, id) {
        var self = this;

        var Model;

        if (model == 'order')
            Model = MODEL('order').Schema.Order;
        else
            Model = MODEL(model).Schema;

        if (self.body.data)
            var body = JSON.parse(self.body.data);

        //console.log(self.body);

        var saveFile = function() {

            self.module('files').addFiles(Model, id, self.files, function(err, files) {
                //console.log(files);

                if (body && body.varname) {
                    var doc = {};
                    doc[body.varname] = files[files.length - 1]._id;
                    return Model.findByIdAndUpdate(id, doc, {
                        new: true
                    }, function(err, doc) {
                        return self.json(doc);
                    });
                }

                if (err)
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });

                self.json({
                    successNotify: {
                        title: "Success",
                        message: "Fichier enregistré"
                    },
                    files: files
                });
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

    F.route('/erp/api/file/{Model}/{fileId}', function(model, fileId) {
        var self = this;
        var Model;
        if (model == 'order')
            Model = MODEL('order').Schema.Order;
        else
            Model = MODEL(model).Schema;


        Model.getFile(fileId, function(err, store) {
            if (err)
                return self.throw500(err);

            if (self.query.download)
                return self.stream(store.contentType, store.stream(true), store.metadata.originalFilename); // for downloading 

            self.stream(store.contentType, store.stream(true));

        });
    }, ['authorize']);

    F.route('/erp/api/file', function() {
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


    F.route('/erp/api/file/{Model}/{Id}', function(model, id) {
        var self = this;
        var Model;

        if (model == 'order')
            Model = MODEL('order').Schema.Order;
        else
            Model = MODEL(model).Schema;


        Model.findOne({
            _id: id
        }, function(err, doc) {

            if (err)
                return self.throw500(err);

            doc.removeFile(self.query.fileId, function(err, result) {
                if (err)
                    return self.throw500(err);

                return self.json(result);
            });
        });
    }, ['delete', 'authorize']);
};