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
    i18n = require('i18next');

function convertDict(params, doc, callback) {
    var result = {};

    if (params.object) // retourne le dict complet
        return callback(doc);

    if (doc) { // converti le dict en array
        result = {
            _id: doc._id,
            values: []
        };

        if (doc.lang)
            result.lang = doc.lang;

        for (var i in doc.values) {
            if (doc.values[i].enable) {
                if (doc.values[i].pays_code && doc.values[i].pays_code != 'FR')
                    continue;

                var val = doc.values[i];
                val.id = i;

                if (doc.lang) //(doc.values[i].label)
                    val.label = i18n.t(doc.lang + ":" + doc.values[i].label);
                else
                    val.label = doc.values[i].label;

                //else
                //  val.label = req.i18n.t("companies:" + i);

                result.values.push(val);
                //console.log(val);
            }
        }
    } else {
        console.log('Dict is not loaded');
    }

    callback(result);
}


function Dict() {}

// Database interface
Dict.prototype.dict = function(params, callback) {
    var DictModel = MODEL('dict').Schema;

    if (typeof params.dictName == "string")
        DictModel.findOne({
            _id: params.dictName
        }, function(err, doc) {
            if (err)
                return callback(err);

            convertDict(params, doc, function(result) {
                callback(null, result);
            });

        });
    else
        DictModel.find({
            _id: {
                $in: params.dictName
            }
        }, function(err, docs) {
            if (err)
                return callback(err);

            var result = {};

            async.each(docs, function(dict, cb) {
                convertDict(params, dict, function(res) {
                    //console.log(res);
                    result[dict._id] = res;
                    cb();
                });
            }, function(err) {
                //console.log(result);
                callback(null, result);
            });

        });
};
Dict.prototype.extrafield = function(params, callback) {
    var ExtrafieldModel = MODEL('extrafield').Schema;

    ExtrafieldModel.findById(params.extrafieldName, function(err, doc) {
        if (err)
            return callback(err);

        var result = [];
        if (params.field) {
            for (var i in doc.fields[params.field].values) {
                if (doc.fields[params.field].values[i].enable) {
                    var val = {};
                    val.id = i;
                    val.label = i18n.t("orders:" + doc.fields[params.field].values[i].label);
                    result.push(val);
                }
            }
            doc.fields[params.field].values = result;

            callback(err, doc.fields[params.field]);
        } else {
            callback(err, doc);
        }
    });
};

module.exports = new Dict();