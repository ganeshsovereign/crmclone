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
    var map = options.map;
    var resultArray = options.resultArray || [];
    var headersArray = [];
    var project = createProjection(map.aliases, { putHeadersTo: headersArray });
    var formatters = map.formatters;

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

    async.each(resultArray, writeCsv, cb);
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
            .write(array, { headers: true })
            .pipe(writableStream);
    };

    writeCsv(resultArray);
}

exports.exportToCsv = exportToCsv;
exports.reportToCSV = reportToCSV;