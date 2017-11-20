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
var fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async');

var Dict = INCLUDE('dict');

exports.install = function() {

    var object = new Object();
    F.route('/erp/api/stats/caFamily', object.caFamily, ['authorize']); // ForSales true or false
    F.route('/erp/api/stats/caEvolution', object.caEvolution, ['authorize']);
    F.route('/erp/api/stats/caGraph', object.caGraph, ['authorize']);
    F.route('/erp/api/stats/caCustomer', object.caCustomer, ['authorize']);
    F.route('/erp/api/stats/caCommercial', object.caCommercial, ['authorize']);
    F.route('/erp/api/stats/DetailsClient', object.detailsClient, ['authorize']);
    F.route('/erp/api/stats/DetailsClientCsv', object.detailsClientCsv, ['authorize']);
    F.route('/erp/api/stats/billPenality', object.billPenality, ['authorize']);
    F.route('/erp/api/stats/result', object.result, ['authorize']);

    //F.route('/erp/api/stats/chFamily', object.chFamily, ['authorize']);
    F.route('/erp/api/stats/chEvolution', object.chEvolution, ['authorize']);
    F.route('/erp/api/stats/chGraph', object.chGraph, ['authorize']);
};

function Object() {}

Object.prototype = {
    caFamily: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;
        var ProductModel = MODEL('product').Schema;
        var queryCA = {
            Status: {
                '$ne': 'DRAFT'
            },
            isremoved: {
                $ne: true
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').toDate(),
                '$lt': moment(self.query.end).endOf('day').toDate()
            },
            forSales: (self.query.forSales === 'false' ? false : true)
        };
        var queryCAN_1 = {
            Status: {
                '$ne': 'DRAFT'
            },
            isremoved: {
                $ne: true
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').subtract(1, 'year').toDate(),
                '$lt': moment(self.query.end).endOf('day').subtract(1, 'year').toDate()
            },
            forSales: (self.query.forSales === 'false' ? false : true)
        };
        if (!self.user.multiEntities) {
            queryCA.entity = self.user.entity;
            queryCAN_1.entity = self.user.entity;
        }

        if (self.query.societe) {
            queryCA['supplier'] = self.module('utils').ObjectId(self.query.societe);
            queryCAN_1['supplier'] = self.module('utils').ObjectId(self.query.societe);
        }

        var ca = {};
        async.parallel({
                caN: function(cb) {
                    BillModel.aggregate([{
                            $match: queryCA
                        },
                        {
                            $unwind: "$lines"
                        },
                        {
                            $match: {
                                'lines.product': {
                                    $ne: null
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                lines: 1,
                                entity: 1
                            }
                        },
                        {
                            $lookup: {
                                from: 'Product',
                                localField: 'lines.product',
                                foreignField: '_id',
                                as: 'lines.product'
                            }
                        },
                        {
                            $unwind: "$lines.product"
                        },
                        {
                            $project: {
                                entity: 1,
                                'lines.total_ht': 1,
                                'lines.product._id': 1,
                                'lines.product.sellFamily': 1,
                                'lines.product.costFamily': 1
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    familyId: "$lines.product." + (self.query.forSales === 'false' ? "costFamily" : "sellFamily"),
                                    entity: "$entity"
                                },
                                caN: {
                                    "$sum": "$lines.total_ht"
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'productFamily',
                                localField: '_id.familyId',
                                foreignField: '_id',
                                as: 'family'
                            }
                        },
                        {
                            $unwind: "$family"
                        }
                    ], function(err, doc) {
                        if (err)
                            return cb(err);

                        cb(err, _.map(doc, function(elem) {
                            //console.log(elem);
                            elem.entity = elem._id.entity;
                            elem._id = elem._id.familyId.toString() + "_" + elem._id.entity;
                            return elem;
                        }));
                    });
                },
                caN_1: function(cb) {
                    BillModel.aggregate([{
                            $match: queryCAN_1
                        },
                        {
                            $unwind: "$lines"
                        },
                        {
                            $match: {
                                'lines.product': {
                                    $ne: null
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                lines: 1,
                                entity: 1
                            }
                        },
                        {
                            $lookup: {
                                from: 'Product',
                                localField: 'lines.product',
                                foreignField: '_id',
                                as: 'lines.product'
                            }
                        },
                        {
                            $unwind: "$lines.product"
                        },
                        {
                            $project: {
                                entity: 1,
                                'lines.total_ht': 1,
                                'lines.product._id': 1,
                                'lines.product.sellFamily': 1,
                                'lines.product.costFamily': 1
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    familyId: "$lines.product." + (self.query.forSales === 'false' ? "costFamily" : "sellFamily"),
                                    entity: "$entity"
                                },
                                caN_1: {
                                    "$sum": "$lines.total_ht"
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'productFamily',
                                localField: '_id.familyId',
                                foreignField: '_id',
                                as: 'family'
                            }
                        },
                        {
                            $unwind: "$family"
                        }
                    ], function(err, doc) {
                        if (err)
                            return cb(err);

                        cb(err, _.map(doc, function(elem) {
                            //console.log(elem);
                            elem.entity = elem._id.entity;
                            elem._id = elem._id.familyId.toString() + "_" + elem._id.entity;
                            return elem;
                        }));
                    });
                }
            },
            function(err, results) {
                if (err)
                    return console.log(err);

                async.waterfall([
                    function(callback) {
                        //merge array CaN et Ca N-1
                        self.module('utils').mergeByProperty(results.caN, results.caN_1, '_id');
                        results = _.map(results.caN, function(elem) {
                            if (!elem.caN_1)
                                elem.caN_1 = 0;
                            if (!elem.caN)
                                elem.caN = 0;

                            return elem;
                        });
                        //return console.log(results);
                        callback(null, results);
                    },
                    /*function(results, callback) {
                        // get unique product ID

                        var productList = _.map(_.uniq(results, 'productId'), function(elem) {
                            return elem.productId;
                        });
                        //console.log(productList);

                        callback(null, productList, results);
                    },
                    function(productList, results, callback) {
                        // Get product Family form product ID
                        ProductModel.find({ _id: { $in: productList } }, "_id caFamily", function(err, doc) {
                            doc = _.indexBy(doc, '_id');
                            //console.log(doc);

                            callback(err, doc, results);
                        });
                    },
                    function(family, results, callback) {
                        // Merge caFamily
                        //console.log(results);
                        var res = _.map(results, function(elem) {
                            //console.log(elem);
                            if (family[elem.productId.toString()] && family[elem.productId.toString()].caFamily)
                                elem.caFamily = family[elem.productId.toString()].caFamily;
                            else
                                elem.caFamily = 'OTHER';
                            return elem;
                        });

                        callback(null, res);
                    },*/
                    function(results, callback) {
                        // Group CA By Family

                        /*if (results.length == 1) {
                            var first, result;

                            first = results[0];

                            result = {};

                            if (!result[first.entity])
                                result[first.entity] = {};

                            if (!first.caFamily)
                                first.caFamily = 'OTHER';

                            if (!result[first.entity][first.caFamily])
                                result[first.entity][first.caFamily] = first;

                            return callback(null, result);
                        }


                        var res = _.reduce(results, function(result, elem, key) {
                            //console.log(key);
                            //return console.log(result);
                            var first;

                            if (key == 1) { // first element

                                first = result;

                                result = {};

                                if (!result[first.entity])
                                    result[first.entity] = {};

                                if (!first.caFamily)
                                    first.caFamily = 'OTHER';

                                if (!result[first.entity][first.caFamily])
                                    result[first.entity][first.caFamily] = first;

                            }

                            if (!result[elem.entity])
                                result[elem.entity] = {};

                            if (!elem.caFamily)
                                elem.caFamily = 'OTHER';

                            if (!result[elem.entity][elem.caFamily])
                                result[elem.entity][elem.caFamily] = elem;
                            else {
                                result[elem.entity][elem.caFamily].caN += elem.caN;
                                result[elem.entity][elem.caFamily].caN_1 += elem.caN_1;
                            }

                            return result;
                        });*/

                        let res = {};

                        _.each(results, function(elem) {
                            if (!res[elem.entity])
                                res[elem.entity] = [];

                            res[elem.entity].push(elem);
                        });



                        //return console.log(res);
                        callback(null, res);
                    }
                ], function(err, result) {
                    if (err)
                        return console.log(err);

                    //return console.log(result);

                    self.json(result);
                });
            });
    },
    caEvolution: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;
        var queryCA = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').toDate(),
                '$lt': moment(self.query.end).endOf('day').toDate()
            },
            forSales: true
        };
        var queryCAN_1 = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').subtract(1, 'year').toDate(),
                '$lt': moment(self.query.end).endOf('day').subtract(1, 'year').toDate()
            },
            forSales: true
        };
        if (!self.user.multiEntities) {
            queryCA.entity = self.user.entity;
            queryCAN_1.entity = self.user.entity;
        }

        async.parallel({
            caN: function(cb) {
                BillModel.aggregate([{
                        $match: queryCA
                    },
                    {
                        $project: {
                            _id: 1,
                            total_ht: 1,
                            entity: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$entity",
                            caN: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return cb(err);
                    cb(err, _.map(doc, function(elem) {
                        elem.entity = elem._id;
                        elem._id;
                        return elem;
                    }));
                });
            },
            caN_1: function(cb) {
                BillModel.aggregate([{
                        $match: queryCAN_1
                    },
                    {
                        $project: {
                            _id: 1,
                            total_ht: 1,
                            entity: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$entity",
                            caN_1: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return cb(err);
                    cb(err, _.map(doc, function(elem) {
                        elem.entity = elem._id;
                        elem._id;
                        return elem;
                    }));
                });
            }
        }, function(err, result) {
            if (err) {
                return cb(err);
            }

            self.module('utils').mergeByProperty(result.caN, result.caN_1, '_id');
            result = _.map(result.caN, function(elem) {
                if (!elem.caN_1)
                    elem.caN_1 = 0;
                if (!elem.caN)
                    elem.caN = 0;
                if (elem.caN_1)
                    elem.evolution = Math.round((elem.caN - elem.caN_1) / elem.caN_1 * 100);
                else
                    elem.evolution = 100;
                if (elem.evolution > 0)
                    elem.evolutionStr = "+" + elem.evolution + "%";
                else
                    elem.evolutionStr = elem.evolution + "%";
                var max = Math.max(elem.caN, elem.caN_1) * 1.2; // TODO must be the objectif CA

                elem.caNpercent = Math.round(elem.caN / max * 100);
                elem.caN_1percent = Math.round(elem.caN_1 / max * 100);
                return elem;
            });
            self.json(result);
        });
    },
    caGraph: function() {
        var BillModel = MODEL('invoice').Schema;
        var SocieteModel = MODEL('Customers').Schema;

        var self = this;

        var dateStart; //= new Date(self.query.start);
        var dateEnd; //= new Date(self.query.end);
        //console.log(self.query);

        if (self.query.mode == 'MONTH') { // MONTH -1
            var dateStart = moment().startOf('month').subtract(1, 'month').toDate();
            var dateEnd = moment().endOf('month').subtract(1, 'month').toDate();
        } else { // YEAR
            var dateStart = moment().startOf('year').toDate();
            var dateEnd = moment().endOf('year').toDate();
        }

        //console.log(dateStart);
        //console.log(dateEnd);

        async.parallel({
            graph: function(cb) {
                if (!self.query.graph) // ca per month on 3 years
                    return cb(null, {});

                var dateStart = moment().startOf('year');
                dateStart.subtract(2, 'year');

                var dateEnd = moment().endOf('year');

                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart.toDate(),
                        '$lt': dateEnd.toDate()
                    },
                    forSales: true
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;

                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            year: {
                                $year: "$datec"
                            },
                            month: {
                                $month: "$datec"
                            },
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: "$year",
                                month: "$month"
                            },
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    var chartData = [{
                        "date": "2012-01-05",
                        "distance": 480,
                        "townName": "Miami",
                        //"townName2": "Miami",
                        "townSize": 10,
                        "latitude": 25.83,
                        "duration": 501
                    }, {
                        "date": "2012-02-06",
                        "distance": 386
                    }, {
                        "date": "2012-02-06",
                        "townName": "Tallahassee",
                        "townSize": 7,
                        "latitude": 30.46,
                        "duration": 443
                    }, {
                        "date": "2012-03-07",
                        "distance": 348,
                        "townName": "New Orleans",
                        "townSize": 10,
                        "latitude": 29.94,
                        "duration": 405
                    }, {
                        "date": "2012-04-08",
                        "distance": 238,
                        "townName": "Houston",
                        //"townName2": "Houston",
                        "townSize": 16,
                        "latitude": 29.76,
                        "duration": 309
                    }, {
                        "date": "2012-05-09",
                        "distance": 218,
                        "townName": "Dalas",
                        "townSize": 17,
                        "latitude": 32.8,
                        "duration": 287
                    }, {
                        "date": "2012-06-10",
                        "distance": 349,
                        "townName": "Oklahoma City",
                        "townSize": 11,
                        "latitude": 35.49,
                        "duration": 485
                    }, {
                        "date": "2012-07-11",
                        "distance": 603,
                        "townName": "Kansas City",
                        "townSize": 10,
                        "latitude": 39.1,
                        "duration": 890
                    }, {
                        "date": "2012-08-12",
                        "distance": 534,
                        "townName": "Denver",
                        //"townName2": "Denver",
                        "townSize": 18,
                        "latitude": 39.74,
                        "duration": 810
                    }, {
                        "date": "2012-10-13",
                        "townName": "Salt Lake City",
                        "townSize": 12,
                        "distance": 425,
                        "duration": 670,
                        "latitude": 40.75,
                        "alpha": 0.4
                    }, {
                        "date": "2012-11-14",
                        "latitude": 36.1,
                        "duration": 470,
                        "townName": "Las Vegas",
                        //"townName2": "Las Vegas",
                        "bulletClass": "lastBullet"
                    }, {
                        "date": "2012-12-15"
                    }];

                    /*for (var i = 0, len = doc.length; i < len; i++) {
                     tab[doc[i]._id.month - 1][conv[doc[i]._id.year]] = self.module('utils').round(doc[i].total_ht, 0);
                     }*/

                    //console.log(doc);

                    var chartData = [];
                    // Start with month
                    for (var i = 0, len = 12; i < len; i++) {
                        var elem = {
                            date: moment().set({
                                'year': dateEnd.year(),
                                'month': i
                            }).startOf('month').endOf('day').format("YYYY-MM-DD")
                        };
                        chartData.push(elem);
                    }


                    for (var i = 0, len = doc.length; i < len; i++) {
                        var elem = {
                            date: moment().set({
                                'year': 2016,
                                'month': doc[i]._id.month - 1
                            }).startOf('month').endOf('day').format("YYYY-MM-DD"),
                            total_ht: self.module('utils').round(doc[i].total_ht, 0)
                        };

                        if (doc[i]._id.year === dateEnd.year())
                            chartData[doc[i]._id.month - 1].total_ht = self.module('utils').round(doc[i].total_ht, 0);

                        else if (doc[i]._id.year === dateEnd.year() - 1)
                            chartData[doc[i]._id.month - 1].N_1 = self.module('utils').round(doc[i].total_ht, 0);
                        else
                            chartData[doc[i]._id.month - 1].N_2 = self.module('utils').round(doc[i].total_ht, 0);

                    }

                    //console.log(chartData);



                    cb(err, //{
                        //data: tab,
                        //labels: [2014, 2015, 2016]
                        //}
                        chartData
                    );
                });
            },
            ca: function(cb) {
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: true
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;

                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    if (!doc.length)
                        return cb(err, 0);

                    //console.log(doc);
                    cb(err, doc[0].total_ht);
                });
            },
            charges: function(cb) {
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: false
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;


                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1,
                            supplier: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$supplier.id",
                            total_ht: {
                                "$sum": "$total_ht"
                            },
                            name: {
                                $addToSet: "$supplier.name"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    /*if (!doc.length)
                     return self.json({
                     data: [],
                     total: 0
                     });*/

                    var result = {
                        subcontractor: [],
                        charge: []
                    };
                    async.each(doc, function(data, callback) {
                        if (data == null)
                            return callback();

                        SocieteModel.findOne({
                            _id: data._id
                        }, "fournisseur", function(err, societe) {
                            if (societe && societe.fournisseur === "SUBCONTRACTOR")
                                result.subcontractor.push(data);
                            else
                                result.charge.push(data);

                            callback(err);
                        });

                    }, function(err) {
                        //console.log(result);

                        cb(err, {
                            total: {
                                subcontractor: _.sum(result.subcontractor, function(bill) {
                                    return bill.total_ht;
                                }),
                                charge: _.sum(result.charge, function(bill) {
                                    return bill.total_ht;
                                })
                            },
                            data: result
                        });

                    });
                });
            },
            salary: function(cb) {
                var Book = INCLUDE('accounting').Book;
                var myBook = new Book();
                myBook.setName('ODT');
                //myBook.setEntity(self.user.entity);

                myBook.balance({
                    account: ['421'],
                    start_date: dateStart,
                    end_date: dateEnd,
                    perPage: 100
                    //societeName: 'ADHOC STOCK'
                }).then(function(data) {
                    cb(null, data.balance);
                });
            }
        }, function(err, result) {
            if (err)
                console.log(err);

            //console.log(result);
            self.json({
                graph: result.graph,
                ca: result.ca,
                subcontractor: result.charges.total.subcontractor,
                charge: result.charges.total.charge,
                salary: result.salary,
                result: result.ca - result.charges.total.charge - result.charges.total.subcontractor - result.salary
            });
        });
    },
    caCustomer: function() {
        const BillModel = MODEL('invoice').Schema;

        var self = this;

        var dateStart = moment(self.query.start).startOf('day').toDate();
        var dateEnd = moment(self.query.end).endOf('day').toDate();
        var thisYear = moment(self.query.start).year();

        var dateStartN1 = moment(self.query.start).subtract(1, 'year').startOf('day').toDate();
        var dateEndN1 = moment(self.query.end).subtract(1, 'year').endOf('day').toDate();

        var ca = {};

        var query = {
            Status: {
                '$nin': ['DRAFT', 'CANCELED']
            },
            $or: [{
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    }
                },
                {
                    datec: {
                        '$gte': dateStartN1,
                        '$lt': dateEndN1
                    }
                }
            ], // Date de facture
            forSales: true
        };

        if (self.query.entity)
            query.entity = self.query.entity;

        BillModel.aggregate([{
                $match: query
            },
            {
                $project: {
                    _id: 1,
                    supplier: 1,
                    total_ht: 1,
                    year: {
                        $year: '$datec'
                    }
                }
            },
            {
                $group: {
                    _id: {
                        id: "$supplier",
                        year: "$year"
                    },
                    total_ht: {
                        "$sum": "$total_ht"
                    }
                }
            },
            {
                $lookup: {
                    from: 'Customers',
                    localField: '_id.id',
                    foreignField: '_id',
                    as: 'supplier'
                }
            }, {
                $unwind: "$supplier"
            },
            {
                $sort: {
                    '_id.year': -1,
                    total_ht: -1
                }
            }
        ], function(err, doc) {
            if (err)
                return console.log(err);

            var res = [];
            var convertIdx = {};

            for (var i = 0, len = doc.length; i < len; i++) {
                if (convertIdx[doc[i]._id.id.toString()] >= 0) {
                    if (doc[i]._id.year == thisYear)
                        res[convertIdx[doc[i]._id.id.toString()]].total_ht = doc[i].total_ht;
                    else
                        res[convertIdx[doc[i]._id.id.toString()]].total_ht_1 = doc[i].total_ht;
                } else {
                    // add in array
                    if (doc[i]._id.year == thisYear)
                        res.push({
                            _id: doc[i]._id.id.toString(),
                            total_ht: doc[i].total_ht,
                            total_ht_1: 0,
                            supplier: doc[i].supplier
                        });
                    else
                        res.push({
                            _id: doc[i]._id.id.toString(),
                            total_ht: 0,
                            total_ht_1: doc[i].total_ht,
                            supplier: doc[i].supplier
                        });

                    convertIdx[doc[i]._id.id.toString()] = res.length - 1;
                }
            }

            self.json({
                data: res
            });
        });
    },
    caCommercial: function() {
        var BillModel = MODEL('invoice').Schema;
        var self = this;

        var dateStart = moment(self.query.start).startOf('day').toDate();
        var dateEnd = moment(self.query.end).endOf('day').toDate();

        var ca = {};

        var query = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': dateStart,
                '$lt': dateEnd
            },
            forSales: true
        };

        if (self.query.entity)
            query.entity = self.query.entity;

        //console.log(query);

        async.parallel({
            data: function(cb) {
                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $match: {
                            "salesPerson": {
                                $ne: null
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            salesPerson: 1,
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$salesPerson",
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: 'Employees',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'salesPerson'
                        }
                    },
                    {
                        $unwind: "$salesPerson"
                    },
                    {
                        $sort: {
                            'salesPerson.name.last': 1
                        }
                    }
                ], cb);
            },
            total: function(cb) {
                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (doc.length)
                        return cb(err, doc[0].total_ht);

                    cb(err, 0);
                });
            }
        }, function(err, result) {
            if (err)
                return console.log(err);

            self.json(result);
        });
    },
    detailsClient: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;
        var ProductModel = MODEL('product').Schema;

        var dateStart = moment(self.query.start).startOf('day').toDate();
        var dateEnd = moment(self.query.end).endOf('day').toDate();

        var query = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': dateStart,
                '$lte': dateEnd
            },
            forSales: true,
            isremoved: {
                $ne: true
            }
        };

        //console.log(self.query);
        if (self.query.entity)
            query.entity = self.query.entity;

        var commercial = {};

        if (self.query.commercial)
            commercial["salesPerson"] = self.query.commercial;
        else
            commercial["salesPerson"] = {
                $ne: null
            };
        //return self.json([]);

        console.log(commercial, query);

        async.waterfall([
            function(cb) {
                BillModel.aggregate([{
                        $match: {
                            $and: [query, commercial]
                        }
                    },
                    {
                        $unwind: "$lines"
                    },
                    {
                        $project: {
                            _id: 0,
                            salesPerson: 1,
                            supplier: 1,
                            total_ht: 1,
                            lines: 1,
                            datec: 1,
                            month: {
                                $month: "$datec"
                            },
                            year: {
                                $year: "$datec"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                salesPerson: "$salesPerson",
                                year: "$year",
                                month: "$month",
                                productId: "$lines.product"
                            },
                            total_ht: {
                                "$sum": "$lines.total_ht"
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: 'Product',
                            localField: '_id.productId',
                            foreignField: '_id',
                            as: 'product'
                        }
                    }, {
                        $unwind: {
                            path: '$product'
                        }
                    }, {
                        $project: {
                            _id: 1,
                            total_ht: 1,
                            'product._id': 1,
                            'product.sellFamily': 1,
                        }
                    }, {
                        $group: {
                            _id: {
                                salesPerson: "$_id.salesPerson",
                                year: "$_id.year",
                                month: "$_id.month",
                                familyId: "$product.sellFamily"
                            },
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }, {
                        $sort: {
                            "_id.salesPerson": 1,
                            "_id.year": 1,
                            "_id.month": 1
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return cb(err);

                    //return console.log(doc);

                    cb(err, _.map(doc, function(elem) {
                        //console.log(elem);
                        elem.year = elem._id.year;
                        elem.month = elem._id.month;
                        elem.societe = elem._id.salesPerson;
                        elem.caFamily = elem._id.familyId.toString();
                        elem._id = elem.year + '_' + elem.month;
                        return elem;
                    }));
                });
            }
        ], function(err, result) {
            if (err)
                return console.log(err);

            return console.log(result);

            var output = [];
            var family = [];

            async.eachSeries(result, function(elems, callback) {
                //console.log(elems);

                var outTemp = [];

                async.forEachOfSeries(elems, function(elem, key, callback) {
                    //console.log(key);


                    elem[key] = elem.total_ht;
                    delete elem.productId;
                    family.push(elem.caFamily);
                    delete elem.caFamily;
                    elem.name = elem.month + "-" + elem.year;



                    callback(null);

                }, function(err) {


                    elems = _.values(elems); // convert object to array

                    var res = _.reduce(elems, function(result, elem, key) {

                        result.total_ht += elem.total_ht;
                        result = _.defaults(result, elem);

                        //console.log(key);
                        //console.log(result);

                        return result;
                    });

                    //console.log(res);

                    output.push(res);
                    callback(err);
                });

            }, function(err) {

                //console.log(output);
                societe.data = output;
                societe.family = _.uniq(family);

                callback(err);
            });

            //TODO Regrouper les lignes pour faire un seul tableau et listes les familles dans un 2eme champs !!!


        });
        /* }, function(err) {
             if (err)
                 return console.log(err);
             //console.log(ids[0]);
             console.log("end Stats clients");
             self.json(ids);
         });*/
    },
    detailsClientCsv: function() {
        var self = this;
        const BillModel = MODEL('invoice').Schema;
        const ProductModel = MODEL('product').Schema;
        const ObjectId = MODULE('utils').ObjectId;

        var Stream = require('stream');
        var stream = new Stream();
        var json2csv = require('json2csv');

        var dateStart = moment(self.query.start).startOf('day').toDate();
        var dateEnd = moment(self.query.end).endOf('day').toDate();

        var query = {
            Status: {
                '$ne': 'DRAFT'
            },
            isremoved: {
                $ne: true
            },
            datec: {
                '$gte': dateStart,
                '$lte': dateEnd
            }
        };

        if (self.query.entity)
            query.entity = self.query.entity;

        var commercial = {};

        if (self.query.commercial)
            commercial["salesPerson"] = ObjectId(self.query.commercial);
        else
            commercial["salesPerson"] = {
                $ne: null
            };
        //return self.json([]);

        //console.log(commercial, query);
        BillModel.aggregate([{
                $match: query
            },
            {
                $unwind: "$lines"
            },
            {
                $project: {
                    _id: 0,
                    salesPerson: 1,
                    supplier: 1,
                    total_ht: "$lines.total_ht",
                    discount: "$lines.discount",
                    lines: 1,
                    ref: 1,
                    qty: "$lines.qty",
                    month: {
                        $month: "$datec"
                    },
                    year: {
                        $year: "$datec"
                    },
                    datec: 1
                }
            },
            {
                $lookup: {
                    from: 'Product',
                    localField: 'lines.product',
                    foreignField: '_id',
                    as: 'product'
                }
            }, {
                $unwind: "$product"
            },
            {
                $lookup: {
                    from: 'Employees',
                    localField: 'salesPerson',
                    foreignField: '_id',
                    as: 'salesPerson'
                }
            }, {
                $unwind: "$salesPerson"
            },
            {
                $lookup: {
                    from: 'Customers',
                    localField: 'supplier',
                    foreignField: '_id',
                    as: 'supplier'
                }
            }, {
                $unwind: "$supplier"
            },
            {
                $lookup: {
                    from: 'productFamily',
                    localField: 'product.sellFamily',
                    foreignField: '_id',
                    as: 'family'
                }
            }, {
                $unwind: "$family"
            },
            {
                $project: {
                    _id: 0,
                    salesPerson: {
                        "$concat": ['$salesPerson.name.last', " ", '$salesPerson.name.first']
                    },
                    supplier_id: "$supplier._id",
                    supplier_name: {
                        "$concat": ["$supplier.name.last", " (", "$supplier.salesPurchases.ref", ")"]
                    },
                    total_ht: 1,
                    discount: 1,
                    //lines: 1,
                    ref: 1,
                    qty: 1,
                    month: 1,
                    year: 1,
                    datec: {
                        $dateToString: {
                            format: "%d/%m/%Y",
                            date: "$datec"
                        }
                    },
                    productId: "$product._id",
                    productName: "$product.info.SKU",
                    family: {
                        $arrayElemAt: ["$family.langs", 0]
                    }
                }
            },
            /* {
                                       $group: {
                                           _id: { commercial_id: "$commercial_id", year: "$year", month: "$month", societe: "$client_id", familyId: "$family" },
                                           total_ht: { "$sum": "$total_ht" },
                                           discount: { "$avg": "$discount" },
                                           societe: { $first: "$client_name" },
                                           commercial: { $first: "$commercial_name" }
                                       }
                                   },
                                   {
                                       $project: {
                                           _id: { "$concat": [{ $substr: ["$_id.year", 0, 4] }, "_", { $substr: ["$_id.month", 0, 2] }] },
                                           date: { "$concat": [{ $substr: ["$_id.month", 0, 2] }, "/", { $substr: ["$_id.year", 0, 4] }] },
                                           family: "$_id.familyId",
                                           societe: 1,
                                           commercial: 1,
                                           total_ht: 1,
                                           discount: 1
                                       }
                                   }, */
            {
                $sort: {
                    salesPerson: 1,
                    //_id: 1,
                    "supplier_name": 1,
                    ref: 1
                    // family: 1,
                }
            }
        ], function(err, docs) {
            if (err)
                return console.log(err);

            console.log(docs);

            //self.json(docs);
            //async.forEach(docs, function(line, cb) {
            json2csv({
                data: docs,
                fields: ['salesPerson', 'supplier_name', 'ref', 'productName', 'family', 'datec', 'qty', 'total_ht', 'discount'],
                del: ";"
            }, function(err, csv) {
                if (err)
                    return console.log(err);

                stream.emit('data', csv.split('.').join(','));
                stream.emit('end');
                //cb();
            });
            //}, function() {
            //    
            //});
        });

        self.stream('application/text', stream, 'commercial_' + moment().format('YYYYMMDD_HHmm') + '.csv');

        /*},
        function(results, cb) {
            // get unique product ID
            var productList = _.map(_.uniq(results, 'productId'), function(elem) {
                return elem.productId;
            });
            //console.log(productList);

            cb(null, productList, results);
        },
        function(productList, results, callback) {
            // Get product Family form product ID
            ProductModel.find({ _id: { $in: productList } }, "_id caFamily", function(err, doc) {
                doc = _.indexBy(doc, '_id');
                //console.log(doc);

                callback(err, doc, results);
            });
        },
        function(family, results, callback) {
            // Merge caFamily
            //console.log(results);
            var res = _.map(results, function(elem) {
                //console.log(elem);
                if (family[elem.productId.toString()])
                    elem.caFamily = family[elem.productId.toString()].caFamily;
                else
                    elem.caFamily = 'OTHER';
                return elem;
            });

            callback(null, res);
        },
        function(results, callback) {
            // Group CA By Family
            //console.log("reduce");

            if (results.length > 1) {
                var res = _.reduce(results, function(result, elem, key) {
                    //console.log(key);
                    //return console.log(result);
                    var first;

                    if (key == 1) { // first element

                        first = result;

                        result = {};

                        if (!result[first._id])
                            result[first._id] = {};

                        if (!first.caFamily)
                            first.caFamily = 'OTHER';

                        if (!result[first._id][first.caFamily])
                            result[first._id][first.caFamily] = first;

                    }

                    if (!result[elem._id])
                        result[elem._id] = {};

                    if (!elem.caFamily)
                        elem.caFamily = 'OTHER';

                    if (!result[elem._id][elem.caFamily])
                        result[elem._id][elem.caFamily] = elem;
                    else
                        result[elem._id][elem.caFamily].total_ht += elem.total_ht;

                    return result;
                });
            } else {
                var res = {};

                res[results[0]._id] = {};
                if (!results[0].caFamily)
                    results[0].caFamily = 'OTHER';
                res[results[0]._id][results[0].caFamily] = results[0];

                //console.log("only One !!!!");
                //console.log(res);
            }

            //console.log(res);
            callback(null, res);
        }


    ],
    function(err, result) {
        if (err)
            return console.log(err);

        //console.log(result);

        var output = [];
        var family = [];

        async.eachSeries(result, function(elems, callback) {
            //console.log(elems);

            var outTemp = [];

            async.forEachOfSeries(elems, function(elem, key, callback) {
                //console.log(key);


                elem[key] = elem.total_ht;
                delete elem.productId;
                family.push(elem.caFamily);
                delete elem.caFamily;
                elem.name = elem.month + "-" + elem.year;



                callback(null);

            }, function(err) {


                elems = _.values(elems); // convert object to array

                var res = _.reduce(elems, function(result, elem, key) {

                    result.total_ht += elem.total_ht;
                    result = _.defaults(result, elem);

                    //console.log(key);
                    //console.log(result);

                    return result;
                });

                //console.log(res);

                output.push(res);
                callback(err);
            });

        }, function(err) {

            //console.log(output);
            societe.data = output;
            societe.family = _.uniq(family);

            callback(err);
        });

    //TODO Regrouper les lignes pour faire un seul tableau et listes les familles dans un 2eme champs !!!


    // });
},
function(err) {
    if (err)
        return console.log(err);
    //console.log(ids[0]);
    console.log("end Stats clients");
    self.json(ids);
});

});*/
    },
    billPenality: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;

        var query = {
            Status: 'NOT_PAID',
            dater: {
                '$lte': moment().subtract(10, 'day').toDate()
            },
            forSales: true
        };

        if (!self.user.multiEntities)
            query.entity = self.user.entity;

        BillModel.aggregate([{
                $match: query
            },
            {
                $project: {
                    _id: 1,
                    total_ttc: 1,
                    entity: 1
                }
            },
            {
                $group: {
                    _id: "$entity",
                    total: {
                        "$sum": "$total_ttc"
                    },
                    cpt: {
                        "$sum": 1
                    }
                }
            }
        ], function(err, doc) {
            if (err)
                return console.log(err);

            self.json(_.map(doc, function(elem) {
                elem.entity = elem._id;
                elem._id;
                return elem;
            }));
        });

    },
    result: function() {
        var BillModel = MODEL('invoice').Schema;
        var SocieteModel = MODEL('Customers').Schema;

        var self = this;

        //console.log(self.query);

        var dateStart = moment(self.query.start).startOf('day').toDate();
        var dateEnd = moment(self.query.end).endOf('day').toDate();


        //console.log(dateStart);
        //console.log(dateEnd);

        async.parallel({
            ca: function(cb) {
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: true
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;

                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    if (!doc.length)
                        return cb(err, 0);

                    //console.log(doc);
                    cb(err, doc[0].total_ht);
                });
            },
            charges: function(cb) {
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: false
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;


                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1,
                            supplier: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$supplier.id",
                            total_ht: {
                                "$sum": "$total_ht"
                            },
                            name: {
                                $addToSet: "$supplier.name"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    /*if (!doc.length)
                     return self.json({
                     data: [],
                     total: 0
                     });*/

                    var result = {
                        subcontractor: [],
                        charge: []
                    };
                    async.each(doc, function(data, callback) {
                        if (data == null)
                            return callback();

                        SocieteModel.findOne({
                            _id: data._id
                        }, "fournisseur", function(err, societe) {
                            if (societe && societe.fournisseur === "SUBCONTRACTOR")
                                result.subcontractor.push(data);
                            else
                                result.charge.push(data);

                            callback(err);
                        });

                    }, function(err) {
                        //console.log(result);

                        cb(err, {
                            total: {
                                subcontractor: _.sum(result.subcontractor, function(bill) {
                                    return bill.total_ht;
                                }),
                                charge: _.sum(result.charge, function(bill) {
                                    return bill.total_ht;
                                })
                            },
                            data: result
                        });

                    });
                });
            },
            salary: function(cb) {
                var Book = INCLUDE('accounting').Book;
                var myBook = new Book();
                myBook.setName('ODT');
                //myBook.setEntity(self.user.entity);

                myBook.balance({
                    account: ['421'],
                    start_date: dateStart,
                    end_date: dateEnd,
                    perPage: 100
                    //societeName: 'ADHOC STOCK'
                }).then(function(data) {
                    cb(null, data.balance);
                });
            }
        }, function(err, result) {
            if (err)
                console.log(err);

            //console.log(result);
            self.json({
                ca: result.ca,
                subcontractor: result.charges.total.subcontractor,
                charge: result.charges.total.charge,
                salary: result.salary,
                result: result.ca - result.charges.total.charge - result.charges.total.subcontractor - result.salary
            });
        });
    },
    /*chFamily: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;
        var ProductModel = MODEL('product').Schema;
        var queryCH = {
            Status: { '$ne': 'DRAFT' },
            datec: {
                '$gte': moment(self.query.start).startOf('day').toDate(),
                '$lt': moment(self.query.end).endOf('day').toDate()
            },
            forSales: false
        };
        var queryCHN_1 = {
            Status: { '$ne': 'DRAFT' },
            datec: {
                '$gte': moment(self.query.start).startOf('day').subtract(1, 'year').toDate(),
                '$lt': moment(self.query.end).endOf('day').subtract(1, 'year').toDate()
            },
            forSales: false
        };
        if (!self.user.multiEntities) {
            queryCH.entity = self.user.entity;
            queryCHN_1.entity = self.user.entity;
        }

        if (self.query.societe) {
            queryCH['supplier.id'] = self.module('utils').ObjectId(self.query.societe);
            queryCHN_1['supplier.id'] = self.module('utils').ObjectId(self.query.societe);
        }

        var ch = {};
        async.parallel({
            chN: function(cb) {
                BillModel.aggregate([
                    { $match: queryCH },
                    { $unwind: "$lines" },
                    { $match: { 'lines.product.id': { $ne: null } } },
                    { $project: { _id: 0, lines: 1, entity: 1 } },
                    { $group: { _id: { id: "$lines.product.id", entity: "$entity" }, chN: { "$sum": "$lines.total_ht" } } }
                ], function(err, doc) {
                    if (err)
                        return cb(err);
                    //console.log(doc);
                    cb(err, _.map(doc, function(elem) {
                        //console.log(elem);
                        elem.entity = elem._id.entity;
                        elem.productId = elem._id.id;
                        elem._id = elem._id.id + "_" + elem._id.entity;
                        return elem;
                    }));
                });
            },
            chN_1: function(cb) {
                BillModel.aggregate([
                    { $match: queryCHN_1 },
                    { $unwind: "$lines" },
                    { $match: { 'lines.product.id': { $ne: null } } },
                    { $project: { _id: 0, lines: 1, entity: 1 } },
                    { $group: { _id: { id: "$lines.product.id", entity: "$entity" }, chN_1: { "$sum": "$lines.total_ht" } } }
                ], function(err, doc) {
                    if (err)
                        return cb(err);

                    cb(err, _.map(doc, function(elem) {
                        //console.log(elem);
                        elem.entity = elem._id.entity;
                        elem.productId = elem._id.id;
                        elem._id = elem._id.id + "_" + elem._id.entity;
                        return elem;
                    }));
                });
            }
        }, function(err, results) {
            if (err)
                return console.log(err);

            async.waterfall([
                function(callback) {
                    //merge array charge N et charge N-1
                    self.module('utils').mergeByProperty(results.chN, results.chN_1, '_id');
                    results = _.map(results.chN, function(elem) {
                        if (!elem.chN_1)
                            elem.chN_1 = 0;
                        if (!elem.chN)
                            elem.chN = 0;

                        return elem;
                    });

                    callback(null, results);
                },
                function(results, callback) {
                    // get unique product ID

                    var productList = _.map(_.uniq(results, 'productId'), function(elem) {
                        return elem.productId;
                    });
                    //console.log(productList);

                    callback(null, productList, results);
                },
                function(productList, results, callback) {
                    // Get product Family form product ID
                    ProductModel.find({ _id: { $in: productList } }, "_id costCenter", function(err, doc) {
                        doc = _.indexBy(doc, '_id');
                        //console.log(doc);

                        callback(err, doc, results);
                    });
                },
                function(family, results, callback) {
                    // Merge costCenter
                    var res = _.map(results, function(elem) {
                        //console.log(elem);
                        if (family[elem.productId.toString()] && family[elem.productId.toString()].costCenter)
                            elem.costCenter = family[elem.productId.toString()].costCenter;
                        else
                            elem.costCenter = 'OTHER';
                        return elem;
                    });

                    callback(null, res);
                },
                function(results, callback) {
                    // Group CA By Family
                    //console.log("res", results);

                    if (results.length == 1) {
                        var first, result;

                        first = results[0];

                        result = {};

                        if (!result[first.entity])
                            result[first.entity] = {};

                        if (!first.costCenter)
                            first.costCenter = 'OTHER';

                        if (!result[first.entity][first.costCenter])
                            result[first.entity][first.costCenter] = first;

                        return callback(null, result);
                    }


                    var res = _.reduce(results, function(result, elem, key) {
                        //console.log(key);
                        //return console.log(result);
                        var first;

                        if (key == 1) { // first element

                            first = result;

                            result = {};

                            if (!result[first.entity])
                                result[first.entity] = {};

                            if (!first.costCenter)
                                first.costCenter = 'OTHER';

                            if (!result[first.entity][first.costCenter])
                                result[first.entity][first.costCenter] = first;

                        }

                        if (!result[elem.entity])
                            result[elem.entity] = {};

                        if (!elem.costCenter)
                            elem.costCenter = 'OTHER';

                        if (!result[elem.entity][elem.costCenter])
                            result[elem.entity][elem.costCenter] = elem;
                        else {
                            result[elem.entity][elem.costCenter].chN += elem.chN;
                            result[elem.entity][elem.costCenter].chN_1 += elem.chN_1;
                        }

                        return result;
                    });

                    //console.log(res);
                    callback(null, res);
                }
            ], function(err, result) {
                if (err)
                    return console.log(err);

                //console.log(result);

                self.json(result);
            });
        });
    },*/
    chEvolution: function() {
        var self = this;
        var BillModel = MODEL('invoice').Schema;
        var queryCH = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').toDate(),
                '$lt': moment(self.query.end).endOf('day').toDate()
            },
            forSales: false
        };
        var queryCHN_1 = {
            Status: {
                '$ne': 'DRAFT'
            },
            datec: {
                '$gte': moment(self.query.start).startOf('day').subtract(1, 'year').toDate(),
                '$lt': moment(self.query.end).endOf('day').subtract(1, 'year').toDate()
            },
            forSales: false
        };
        if (!self.user.multiEntities) {
            queryCH.entity = self.user.entity;
            queryCHN_1.entity = self.user.entity;
        }

        async.parallel({
            chN: function(cb) {
                BillModel.aggregate([{
                        $match: queryCH
                    },
                    {
                        $project: {
                            _id: 1,
                            total_ht: 1,
                            entity: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$entity",
                            chN: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return cb(err);
                    cb(err, _.map(doc, function(elem) {
                        elem.entity = elem._id;
                        elem._id;
                        return elem;
                    }));
                });
            },
            chN_1: function(cb) {
                BillModel.aggregate([{
                        $match: queryCHN_1
                    },
                    {
                        $project: {
                            _id: 1,
                            total_ht: 1,
                            entity: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$entity",
                            chN_1: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return cb(err);
                    cb(err, _.map(doc, function(elem) {
                        elem.entity = elem._id;
                        elem._id;
                        return elem;
                    }));
                });
            }
        }, function(err, result) {
            if (err) {
                return cb(err);
            }

            self.module('utils').mergeByProperty(result.chN, result.chN_1, '_id');
            result = _.map(result.chN, function(elem) {
                if (!elem.chN_1)
                    elem.chN_1 = 0;
                if (!elem.chN)
                    elem.chN = 0;
                if (elem.chN_1)
                    elem.evolution = Math.round((elem.chN - elem.chN_1) / elem.chN_1 * 100);
                else
                    elem.evolution = 100;
                if (elem.evolution > 0)
                    elem.evolutionStr = "+" + elem.evolution + "%";
                else
                    elem.evolutionStr = elem.evolution + "%";
                var max = Math.max(elem.chN, elem.chN_1) * 1.2; // TODO must be the objectif CHARGES

                elem.chNpercent = Math.round(elem.chN / max * 100);
                elem.chN_1percent = Math.round(elem.chN_1 / max * 100);
                return elem;
            });
            self.json(result);
        });
    },
    chGraph: function() {
        var BillModel = MODEL('invoice').Schema;
        var SocieteModel = MODEL('Customers').Schema;

        var self = this;

        var dateStart; //= new Date(self.query.start);
        var dateEnd; //= new Date(self.query.end);
        //console.log(self.query);

        if (self.query.mode == 'MONTH') { // MONTH -1
            var dateStart = moment().startOf('month').subtract(1, 'month').toDate();
            var dateEnd = moment().endOf('month').subtract(1, 'month').toDate();
        } else { // YEAR
            var dateStart = moment().startOf('year').toDate();
            var dateEnd = moment().endOf('year').toDate();
        }

        //console.log(dateStart);
        //console.log(dateEnd);

        async.parallel({
            graph: function(cb) {
                if (!self.query.graph) // ca per month on 3 years
                    return cb(null, {});

                var dateStart = moment().startOf('year');
                dateStart.subtract(2, 'year');

                var dateEnd = moment().endOf('year');

                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart.toDate(),
                        '$lt': dateEnd.toDate()
                    },
                    forSales: false
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;

                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            year: {
                                $year: "$datec"
                            },
                            month: {
                                $month: "$datec"
                            },
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: "$year",
                                month: "$month"
                            },
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    var chartData = [{
                        "date": "2012-01-05",
                        "distance": 480,
                        "townName": "Miami",
                        //"townName2": "Miami",
                        "townSize": 10,
                        "latitude": 25.83,
                        "duration": 501
                    }, {
                        "date": "2012-02-06",
                        "distance": 386
                    }, {
                        "date": "2012-02-06",
                        "townName": "Tallahassee",
                        "townSize": 7,
                        "latitude": 30.46,
                        "duration": 443
                    }, {
                        "date": "2012-03-07",
                        "distance": 348,
                        "townName": "New Orleans",
                        "townSize": 10,
                        "latitude": 29.94,
                        "duration": 405
                    }, {
                        "date": "2012-04-08",
                        "distance": 238,
                        "townName": "Houston",
                        //"townName2": "Houston",
                        "townSize": 16,
                        "latitude": 29.76,
                        "duration": 309
                    }, {
                        "date": "2012-05-09",
                        "distance": 218,
                        "townName": "Dalas",
                        "townSize": 17,
                        "latitude": 32.8,
                        "duration": 287
                    }, {
                        "date": "2012-06-10",
                        "distance": 349,
                        "townName": "Oklahoma City",
                        "townSize": 11,
                        "latitude": 35.49,
                        "duration": 485
                    }, {
                        "date": "2012-07-11",
                        "distance": 603,
                        "townName": "Kansas City",
                        "townSize": 10,
                        "latitude": 39.1,
                        "duration": 890
                    }, {
                        "date": "2012-08-12",
                        "distance": 534,
                        "townName": "Denver",
                        //"townName2": "Denver",
                        "townSize": 18,
                        "latitude": 39.74,
                        "duration": 810
                    }, {
                        "date": "2012-10-13",
                        "townName": "Salt Lake City",
                        "townSize": 12,
                        "distance": 425,
                        "duration": 670,
                        "latitude": 40.75,
                        "alpha": 0.4
                    }, {
                        "date": "2012-11-14",
                        "latitude": 36.1,
                        "duration": 470,
                        "townName": "Las Vegas",
                        //"townName2": "Las Vegas",
                        "bulletClass": "lastBullet"
                    }, {
                        "date": "2012-12-15"
                    }];

                    /*for (var i = 0, len = doc.length; i < len; i++) {
                     tab[doc[i]._id.month - 1][conv[doc[i]._id.year]] = self.module('utils').round(doc[i].total_ht, 0);
                     }*/

                    //console.log(doc);

                    var chartData = [];
                    // Start with month
                    for (var i = 0, len = 12; i < len; i++) {
                        var elem = {
                            date: moment().set({
                                'year': dateEnd.year(),
                                'month': i
                            }).startOf('month').endOf('day').format("YYYY-MM-DD")
                        };
                        chartData.push(elem);
                    }


                    for (var i = 0, len = doc.length; i < len; i++) {
                        var elem = {
                            date: moment().set({
                                'year': 2016,
                                'month': doc[i]._id.month - 1
                            }).startOf('month').endOf('day').format("YYYY-MM-DD"),
                            total_ht: self.module('utils').round(doc[i].total_ht, 0)
                        };

                        if (doc[i]._id.year === dateEnd.year())
                            chartData[doc[i]._id.month - 1].total_ht = self.module('utils').round(doc[i].total_ht, 0);

                        else if (doc[i]._id.year === dateEnd.year() - 1)
                            chartData[doc[i]._id.month - 1].N_1 = self.module('utils').round(doc[i].total_ht, 0);
                        else
                            chartData[doc[i]._id.month - 1].N_2 = self.module('utils').round(doc[i].total_ht, 0);

                    }

                    //console.log(chartData);



                    cb(err, //{
                        //data: tab,
                        //labels: [2014, 2015, 2016]
                        //}
                        chartData
                    );
                });
            },
            ca: function(cb) {
                const BillModel = MODEL('invoice').Schema;
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: true
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;

                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total_ht: {
                                "$sum": "$total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    if (!doc.length)
                        return cb(err, 0);

                    //console.log(doc);
                    cb(err, doc[0].total_ht);
                });
            },
            charges: function(cb) {
                const BillModel = MODEL('invoice').Schema;
                var query = {
                    Status: {
                        '$ne': 'DRAFT'
                    },
                    datec: {
                        '$gte': dateStart,
                        '$lt': dateEnd
                    },
                    forSales: false
                };

                if (!self.user.multiEntities)
                    query.entity = self.user.entity;


                BillModel.aggregate([{
                        $match: query
                    },
                    {
                        $project: {
                            _id: 0,
                            total_ht: 1,
                            supplier: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$supplier.id",
                            total_ht: {
                                "$sum": "$total_ht"
                            },
                            name: {
                                $addToSet: "$supplier.name"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err)
                        return console.log(err);

                    /*if (!doc.length)
                     return self.json({
                     data: [],
                     total: 0
                     });*/

                    var result = {
                        subcontractor: [],
                        charge: []
                    };
                    async.each(doc, function(data, callback) {
                        if (data == null)
                            return callback();

                        SocieteModel.findOne({
                            _id: data._id
                        }, "fournisseur", function(err, societe) {
                            if (societe && societe.fournisseur === "SUBCONTRACTOR")
                                result.subcontractor.push(data);
                            else
                                result.charge.push(data);

                            callback(err);
                        });

                    }, function(err) {
                        //console.log(result);

                        cb(err, {
                            total: {
                                subcontractor: _.sum(result.subcontractor, function(bill) {
                                    return bill.total_ht;
                                }),
                                charge: _.sum(result.charge, function(bill) {
                                    return bill.total_ht;
                                })
                            },
                            data: result
                        });

                    });
                });
            },
            salary: function(cb) {
                var Book = INCLUDE('accounting').Book;
                var myBook = new Book();
                myBook.setName('ODT');
                //myBook.setEntity(self.user.entity);

                myBook.balance({
                    account: ['421'],
                    start_date: dateStart,
                    end_date: dateEnd,
                    perPage: 100
                    //societeName: 'ADHOC STOCK'
                }).then(function(data) {
                    cb(null, data.balance);
                });
            }
        }, function(err, result) {
            if (err)
                console.log(err);

            //console.log(result);
            self.json({
                graph: result.graph,
                ca: result.ca,
                subcontractor: result.charges.total.subcontractor,
                charge: result.charges.total.charge,
                salary: result.salary,
                result: result.ca - result.charges.total.charge - result.charges.total.subcontractor - result.salary
            });
        });
    }
};