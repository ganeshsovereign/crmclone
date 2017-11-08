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

exports.name = "exporter";
exports.version = "1.00";

const json2csv = require('json2csv');
//var arrayToXlsx = require('../exporter/arrayToXlsx');
const async = require('async');



function createProjection(map, options) {
    var project = {};
    var properties = options.properties;
    var arrayToAdd = options.putHeadersTo;
    var addHeaders = !!arrayToAdd;
    var value;

    for (var key in map) {
        value = map[key];
        if (addHeaders) {
            arrayToAdd.push(value);
        }
        //todo remove some properties from map according to {properties}
        project[value] = '$' + key;
    }
    return project;
};

/**
 * @param {Object} handler - object to insert exportToCsv method
 * @param {Function) getModel - function(req) that will return specified model
 * @param {Object} map - object with all model properties and their names
 * @param {string fileName - name that will be used for export file, without extension
 */

function exportToCsv(options, cb) {
    const map = options.map;
    //var resultArray = options.resultArray || [];
    var query = options.query;
    const Model = options.Model;
    var headersArray = [];
    const returnResult = options.returnResult;
    const project = createProjection(map.aliases, {
        putHeadersTo: headersArray
    });
    const formatters = map.formatters;

    //console.log(query, project);

    query.push({
        $project: project
    });
    var resultAggregate = Model.aggregate(query);

    var writeCsv = function(line, callback) {
        json2csv({
            data: line,
            fields: Object.keys(project),
            del: ";"
        }, function(err, csv) {
            options.stream.emit('data', csv);
            callback();
        });
    };

    resultAggregate.exec(function(err, response) {
        if (err)
            return cb(err);

        if (returnResult)
            return cb(null, response);

        if (formatters)
            return async.each(response, function(item, callback) {

                var keys = Object.keys(formatters);

                for (let i = keys.length - 1; i >= 0; i--) {
                    let key = keys[i];
                    if (item[key] !== null)
                        item[key] = formatters[key](item[key]);
                }

                callback();

            }, function(err) {
                if (err)
                    return cb(err);

                writeCsv(response, cb);
            });

        writeCsv(response, cb);
    });
};

function reportToCSV(options) {
    var res = options.res;
    var next = options.next;
    var map = options.map;
    var attributes = options.attributes;
    var fileName = options.fileName;
    var resultArray = options.resultArray;
    var headersArray = map;

    var writeCsv = function(array) {
        var pathToFile = path.join('exportFiles', fileName + '.csv');
        var writableStream = fs.createWriteStream(pathToFile);

        writableStream.on('finish', function() {
            res.download(pathToFile, pathToFile, function(err) {
                if (err) {
                    return next(err);
                }

                fs.unlink(pathToFile, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('done');
                    }
                });
            });
        });

        csv
            .write(array, {
                headers: true
            })
            .pipe(writableStream);
    };

    writeCsv(resultArray);
}

exports.exportToCsv = exportToCsv;
exports.reportToCSV = reportToCSV;