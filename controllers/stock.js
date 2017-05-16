"use strict";
const async = require("async");
const moment = require('moment'),
    csv = require('csv'),
    _ = require("lodash");

exports.install = function() {
    let warehouse = new Warehouse();
    let stockCorrection = new StockCorrections();

    F.route('/erp/api/stock/warehouse', warehouse.get, ['authorize']);
    F.route('/erp/api/stock/warehouse/getHierarchyWarehouse', warehouse.getHierarchyWarehouse, ['authorize']);
    F.route('/erp/api/stock/warehouse/getForDD', warehouse.getForDd, ['authorize']);
    F.route('/erp/api/stock/warehouse/zone/getForDd', warehouse.getForDdZone, ['authorize']);
    F.route('/erp/api/stock/warehouse/location/getForDd', warehouse.getForDdLocation, ['authorize']);

    F.route('/erp/api/stock/warehouse/stockCorrection', stockCorrection.getCorrections, ['authorize']);
    F.route('/erp/api/stock/warehouse/stockCorrection/{id}', stockCorrection.getById, ['authorize']);
    F.route('/erp/api/stock/warehouse/getAvailability', stockCorrection.getProductsAvailable, ['authorize']);

    F.route('/erp/api/stock/warehouse/location/{id}', warehouse.updateLocation, ['put', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/zone/{id}', warehouse.updateZone, ['put', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/{id}', warehouse.update, ['put', 'json', 'authorize']);

    F.route('/erp/api/stock/warehouse/', warehouse.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/location', warehouse.createLocation, ['post', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/zone', warehouse.createZone, ['post', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/stockCorrection', stockCorrection.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/stock/warehouse/allocate', stockCorrection.allocate, ['post', 'json', 'authorize']);

    // router.delete('/', authStackMiddleware, handler.bulkRemove);
    F.route('/erp/api/stock/warehouse/location/{id}', warehouse.removeLocation, ['delete', 'authorize']);
    F.route('/erp/api/stock/warehouse/stockCorrection', stockCorrection.bulkRemove, ['delete', 'authorize']);
    F.route('/erp/api/stock/warehouse/stockCorrection/{id}', stockCorrection.remove, ['delete', 'authorize']); //TODO: it doesn't use
    F.route('/erp/api/stock/warehouse/zone/{id}', warehouse.removeZone, ['delete', 'authorize']);
    F.route('/erp/api/stock/warehouse/{id}', warehouse.remove, ['delete', 'authorize']);
};

var Warehouse = function() {
    //var warehouseSchema = mongoose.Schemas.warehouse;
    //var locationSchema = mongoose.Schemas.locations;
    //var zoneSchema = mongoose.Schemas.zones;
    //var AvailabilitySchema = mongoose.Schemas.productsAvailability;

    function get(req, res, next) {
        var Model = MODEL('warehouse').Schema;
        var query = req.query && req.query._id ? req.query : {};

        Model.aggregate([{
            $match: query
        }, {
            $lookup: {
                from: 'locations',
                localField: '_id',
                foreignField: 'warehouse',
                as: 'locations'
            }
        }, {
            $unwind: {
                path: '$locations',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'zones',
                localField: 'locations.zone',
                foreignField: '_id',
                as: 'locations.zone'
            }
        }, {
            $lookup: {
                from: 'zones',
                localField: '_id',
                foreignField: 'warehouse',
                as: 'zones'
            }
        }, {
            $lookup: {
                from: 'chartOfAccount',
                localField: 'account',
                foreignField: '_id',
                as: 'account'
            }
        }, {
            $project: {
                account: { $arrayElemAt: ['$account', 0] },
                'locations.zone': { $arrayElemAt: ['$locations.zone', 0] },
                'locations.name': 1,
                'locations._id': 1,
                name: 1,
                address: 1,
                isOwn: 1,
                main: 1,
                zones: 1,
                warehouseId: '$_id'
            }
        }, {
            $group: {
                _id: '$locations.zone',
                root: { $push: '$$ROOT' }
            }
        }, {
            $unwind: '$root'
        }, {
            $group: {
                _id: '$root.warehouseId',
                account: { $first: '$root.account' },
                address: { $first: '$root.address' },
                main: { $first: '$root.main' },
                name: { $first: '$root.name' },
                isOwn: { $first: '$root.isOwn' },
                locations: { $addToSet: '$root.locations' },
                zones: { $first: '$root.zones' }
            }
        }], function(err, result) {
            if (err) {
                return next(err);
            }

            if (Object.keys(query).length) {
                return res.status(200).send(result && result.length ? result[0] : {});
            }

            res.status(200).send({ data: result });
        });
    }

    this.get = get;

    this.getHierarchyWarehouse = function(req, res, next) {
        var Model = MODEL('warehouse').Schema;

        Model.aggregate([{
            $lookup: {
                from: 'zones',
                localField: '_id',
                foreignField: 'warehouse',
                as: 'zones'
            }
        }, {
            $unwind: {
                path: '$zones',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'locations',
                localField: 'zones._id',
                foreignField: 'zone',
                as: 'locations'
            }
        }, {
            $project: {
                name: 1,
                main: 1,
                'locations._id': 1,
                'locations.name': 1,
                zones: 1
            }
        }, {
            $group: {
                _id: '$_id',
                zones: {
                    $addToSet: {
                        name: '$zones.name',
                        locations: '$locations'
                    }
                },

                name: { $first: '$name' },
                main: { $first: '$main' }
            }
        }], function(err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({ data: result });
        });
    };

    this.getForDd = function(req, res, next) {
        var Model = MODEL('warehouse').Schema;

        Model
            .find({}, { name: 1, account: 1 })
            .find('main')
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({ data: result });
            });
    };

    this.getForDdZone = function(req, res, next) {
        var Model = MODEL('zone').Schema;
        var query = req.query || {};

        Model
            .find(query, { name: 1 })
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({ data: result });
            });
    };

    this.getForDdLocation = function(req, res, next) {
        var Model = MODEL('location').Schema;
        var findObject = {};

        if (req.query) {
            findObject = req.query;
        }

        if (findObject.warehouse && findObject.warehouse.length !== 24) {
            return res.status(200).send({ data: [] });
        }

        Model
            .find(findObject, { name: 1 })
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({ data: result });
            });
    };

    this.update = function(req, res, next) {
        var self = this;
        var Model = MODEL('warehouse').Schema;
        var id = req.params.id;
        var data = req.body;

        data.editeddBy = {
            user: req.session.uId,
            date: new Date()
        };

        if (data.main) {
            Model.update({ _id: { $nin: [id] } }, { $set: { main: false } }, { multi: true }, function(err, result) {
                delete data._id;

                Model.findByIdAndUpdate(id, { $set: data }, { new: true }, function(err, result) {
                    if (err) {
                        return next(err);
                    }

                    if (result) {
                        req.query = { _id: result._id };
                    }

                    get(req, res, next);
                });
            });
        } else {
            delete data._id;

            Model.findByIdAndUpdate(id, { $set: data }, { new: true }, function(err, result) {
                if (err) {
                    return next(err);
                }

                if (result) {
                    req.query = { _id: result._id };
                }

                get(req, res, next);
            });
        }

    };

    this.updateLocation = function(req, res, next) {
        var Model = MODEL('location').Schema;
        var id = req.params.id;
        var data = req.body;

        data.editeddBy = {
            user: req.session.uId,
            date: new Date()
        };

        Model.findByIdAndUpdate(id, { $set: data }, function(err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({ data: result });
        });
    };

    this.updateZone = function(req, res, next) {
        var Model = MODEL('zone').Schema;
        var id = req.params.id;
        var data = req.body;

        data.editeddBy = {
            user: req.session.uId,
            date: new Date()
        };

        Model.findByIdAndUpdate(id, { $set: data }, function(err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({ data: result });
        });
    };

    this.create = function(req, res, next) {
        var self = this;
        var Model = MODEL('warehouse').Schema;
        var LocationModel = MODEL('location').Schema;
        var body = req.body;
        var uId = req.session.uId;
        var locationBody = {
            groupingA: '0',
            groupingB: '0',
            groupingC: '0',
            groupingD: '0',
            name: '0.0.0.0'
        };
        var item;

        function checkMain(wCb) {
            if (!body.main) {
                return wCb();
            }

            Model.update({ main: true }, { main: false }, { multi: true, upsert: true }, function(err, result) {
                if (err) {
                    return wCb(err);
                }

                wCb();
            });
        }

        function createWarehouse(wCb) {
            item = new Model(body);

            item.save(function(err, result) {
                if (err) {
                    return wCb(err);
                }

                Model.update({ _id: { $nin: [result._id] } }, { $set: { main: false } }, { multi: true }, function(err, result) {

                });

                req.query = { _id: result._id };

                locationBody.warehouse = result._id;

                createLocation(LocationModel, locationBody, uId, function(err) {
                    if (err) {
                        return wCb(err);
                    }

                    wCb();
                });
            });
        }

        body.createdBy = {
            user: uId,
            date: new Date()
        };

        body.editedBy = {
            user: uId,
            date: new Date()
        };

        async.waterfall([checkMain, createWarehouse], function(err, result) {
            if (err) {
                return next(err);
            }

            get(req, res, next);
        });

    };

    function createLocation(Model, body, uId, callback) {
        var item;

        body.createdBy = {
            user: uId,
            date: new Date()
        };

        body.editedBy = {
            user: uId,
            date: new Date()
        };

        item = new Model(body);

        item.save(function(err, result) {
            if (err) {
                return callback(err);
            }

            Model.findById(result._id).populate('zone').exec(function(err, result) {
                if (err) {
                    return callback(err);
                }

                callback(null, result);
            });

        });
    }

    this.createLocation = function(req, res, next) {
        var Model = MODEL('location').Schema;
        var body = req.body;

        createLocation(Model, body, req.session.uId, function(err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    };

    this.createZone = function(req, res, next) {
        var Model = MODEL('zone').Schema;
        var body = req.body;
        var item;

        body.createdBy = {
            user: req.session.uId,
            date: new Date()
        };

        body.editedBy = {
            user: req.session.uId,
            date: new Date()
        };

        item = new Model(body);

        item.save(function(err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    };

    this.remove = function(req, res, next) {
        var Model = MODEL('warehouse').Schema;
        var productsAvailability = MODEL('productsAvailability').Schema;
        var id = req.params.id;

        productsAvailability.find({ warehouse: id }, function(err, result) {
            if (err) {
                return next(err);
            }

            if (!result.length) {
                Model.remove({ _id: id }, function(err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send(result);
                });
            } else {
                res.status(400).send({ error: 'You can delete only empty Warehouse. Please, remove products first' });

            }
        });

    };

    this.removeLocation = function(req, res, next) {
        var Model = MODEL('location').Schema;
        var id = req.params.id;

        Model.remove({ _id: id }, function(err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    };

    this.removeZone = function(req, res, next) {
        var Model = MODEL('zone').Schema;
        var Location = MODEL('location').Schema;

        var id = req.params.id;

        Model.remove({ _id: id }, function(err, result) {
            if (err) {
                return next(err);
            }

            Location.update({ zone: id }, { $set: { zone: null } }, { multi: true }, function(err) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(result);
            });

        });
    };
};


var Availability = function() {
    this.create = function(options, callback) {
        var Availability;
        var availability;
        var dbName;
        var err;
        var body = options.body;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        availability = new Availability(body);

        availability.save(function(err, doc) {
            if (err) {
                return callback(err);
            }
            callback(null, doc);
        });
    };

    this.createMulti = function(options, callback) {
        var Availability;
        var dbName;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;
        Availability.collection.insertMany(options.availabilities, function(err) {
            if (err) {
                return callback(err);
            }

            callback();
        });
    };

    this.createAvailabilityJob = function(options, callback) {
        var Availability;
        var availability;
        var Warehouse;
        var Location;
        var dbName;
        var err;
        var query = {};
        var warehouseId = options.warehouse;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;
        Warehouse = MODEL('warehouses').Schema;
        Location = MODEL('locations').Schema;

        if (warehouseId) {
            query._id = warehouseId;
        } else {
            query.isOwn = true;
        }

        Warehouse.findOne(query, function(err, warehouse) {
            var warehouse = warehouse ? warehouse._id : null;

            if (err) {
                return callback(err);
            }

            Location.findOne({ warehouse: warehouse }, function(err, location) {
                var location = location ? location._id : null;

                if (err) {
                    return callback(err);
                }

                availability = new Availability({
                    product: options.product,
                    location: location,
                    warehouse: warehouse,
                    isJob: true
                });
                availability.save(function(err, model) {
                    if (err) {
                        return callback(err);
                    }
                    callback();
                });
            });
        });

    };

    this.updateByQuery = function(options, callback) {
        var Availability;
        var dbName;
        var query = options.query;
        var body = options.body;
        var settings = options.settings;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        Availability.update(query, body, settings || {}, function(err, availability) {
            if (err) {
                return callback(err);
            }

            Availability.update({ onHand: { $gt: 0 }, archived: true }, { $set: { archived: false } }, function(err) {
                if (err) {
                    return callback(err);
                }
                Availability.remove({ onHand: 0, orderRows: [], goodsOutNotes: [] }, function(err) {
                    if (err) {
                        return callback(err);
                    }
                });
            });

            callback(null, availability);

        });
    };

    this.updateById = function(options, callback) {
        var Availability;
        var dbName;
        var id = options.id;
        var body = options.body;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        Availability.findByIdAndUpdate(id, body, { new: true }, function(err, availability) {
            if (err) {
                return callback(err);
            }

            callback(null, availability);

        });
    };

    this.tryToRempve = function(options, callback) {
        var Availability;
        var dbName;
        var query = options.query;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        Availability.find(query, function(err, result) {
            var goodsOut = 0;

            if (err) {
                return callback(err);
            }

            result.forEach(function(el) {
                goodsOut += el.goodsOutNotes.length;
            });

            if (!goodsOut) {
                Availability.remove(query, function(err, docs) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, docs);
                });
            } else {
                err = new Error("Can't cancel Order because of some Sales");
                err.status = 400;

                callback(err);
            }
        });

    };

    this.remove = function(options, callback) {
        var Availability;
        var dbName;
        var query = options.query;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        Availability.remove(query, function(err, docs) {
            if (err) {
                return callback(err);
            }
            console.log(docs);

            callback();

        });

    };

    this.find = function(options, callback) {
        var Availability;
        var dbName;
        var id = options.id;
        var query = options.query;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {
                return false;
            };
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName) {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;

        Availability.find(query)
            .populate('location', 'name')
            .sort('creationDate')
            .exec(function(err, availability) {
                if (err) {
                    return callback(err);
                }

                callback(null, availability);
            });
    };

    this.getProductAvailability = function(query, options, callback) {
        var Availability;
        var dbName;
        var err;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {};
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName || typeof query !== 'object') {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;
        Availability.aggregate([{
            $match: query
        }, {
            $project: {
                onHand: 1,
                cost: 1,
                allocated: {
                    $sum: '$orderRows.quantity'
                },

                fulfilled: {
                    $sum: '$goodsOutNotes.quantity'
                }
            }
        }, {
            $project: {
                onHand: 1,
                allocated: 1,
                cost: 1,
                inStock: {
                    $add: ['$onHand', '$allocated', '$fulfilled']
                }
            }
        }, {
            $group: {
                _id: '$warehouse',

                inStock: {
                    $sum: '$inStock'
                },

                onHand: {
                    $sum: '$onHand'
                },

                cost: {
                    $first: '$cost'
                }
            }
        }], function(err, result) {
            var prodAvailable = {
                inStock: 0,
                onHand: 0,
                cost: 0
            };

            if (err) {
                return callback(err);
            }

            if (result && result.length) {
                prodAvailable = result[0];
            }

            callback(null, prodAvailable);
        });
    };

    this.getList = function(options, callback) {
        var Availability;
        var dbName;
        var err;

        var obj = options.match;
        var sort = options.sort;
        var skip = options.skip;
        var limit = options.limit;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {};
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName || typeof options !== 'object') {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;
        Availability.aggregate([{
                $match: { isJob: false }
            },
            {
                $lookup: {
                    from: 'warehouse',
                    localField: 'warehouse',
                    foreignField: '_id',
                    as: 'warehouse'
                }
            },

            {
                $lookup: {
                    from: 'Products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'location',
                    foreignField: '_id',
                    as: 'location'
                }
            },
            {
                $lookup: {
                    from: 'GoodsNote',
                    localField: 'goodsInNote',
                    foreignField: '_id',
                    as: 'goodsInNote'
                }
            },
            {
                $lookup: {
                    from: 'Users',
                    localField: 'createdBy.user',
                    foreignField: '_id',
                    as: 'createdBy.user'
                }
            },
            {
                $project: {
                    _id: 1,
                    location: { $arrayElemAt: ['$location', 0] },
                    warehouse: { $arrayElemAt: ['$warehouse', 0] },
                    product: { $arrayElemAt: ['$product', 0] },
                    goodsInNote: { $arrayElemAt: ['$goodsInNote', 0] },
                    'createdBy.user': { $arrayElemAt: ['$createdBy.user', 0] },
                    description: 1,
                    cost: 1,
                    onHand: 1,
                    allocated: {
                        $add: [{
                            $sum: '$orderRows.quantity'
                        }, {
                            $sum: '$goodsOutNotes.quantity'
                        }]
                    },

                    inStock: {
                        $add: ['$onHand', {
                            $sum: '$orderRows.quantity'
                        }, {
                            $sum: '$goodsOutNotes.quantity'
                        }]
                    }
                }
            },
            {
                $unwind: {
                    path: '$product.variants',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'ProductOptionsValues',
                    localField: 'product.variants',
                    foreignField: '_id',
                    as: 'variants'
                }
            },
            {
                $project: {
                    _id: 1,
                    location: 1,
                    warehouse: 1,
                    product: 1,
                    variants: { $arrayElemAt: ['$variants', 0] },
                    description: 1,
                    cost: 1,
                    onHand: 1,
                    allocated: 1,
                    inStock: 1,
                    goodsInNote: 1
                }
            },
            {
                $group: {
                    _id: '$_id',
                    location: { $first: '$location' },
                    product: { $first: '$product' },
                    goodsInNote: { $first: '$goodsInNote' },
                    warehouse: { $first: '$warehouse' },
                    createdBy: { $first: '$createdBy' },
                    description: { $first: '$description' },
                    cost: { $first: '$cost' },
                    variants: { $push: '$variants.value' },
                    inStock: { $first: '$inStock' },
                    allocated: { $first: '$allocated' },
                    onHand: { $first: '$onHand' }
                }
            },
            {
                $lookup: {
                    from: 'Order',
                    localField: 'goodsInNote.order',
                    foreignField: '_id',
                    as: 'order'
                }
            },
            {
                $project: {
                    _id: 1,
                    location: 1,
                    warehouse: 1,
                    product: 1,
                    createdBy: '$goodsInNote.createdBy',
                    description: 1,
                    variants: 1,
                    cost: 1,
                    onHand: 1,
                    allocated: 1,
                    inStock: 1,
                    order: { $arrayElemAt: ['$order', 0] }
                }
            },
            {
                $match: obj
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    root: { $push: '$$ROOT' }
                }
            },
            {
                $unwind: '$root'
            },
            {
                $project: {
                    _id: '$root._id',
                    location: '$root.location',
                    product: '$root.product',
                    goodsInNote: '$root.goodsInNote',
                    warehouse: '$root.warehouse',
                    createdBy: '$root.createdBy',
                    description: '$root.description',
                    order: '$root.order',
                    cost: '$root.cost',
                    variants: '$root.variants',
                    total: 1,
                    value: { $multiply: ['$root.inStock', '$root.cost'] },
                    inStock: '$root.inStock',
                    allocated: '$root.allocated',
                    onHand: '$root.onHand'
                }
            },
            {
                $sort: sort
            }, {
                $skip: skip
            }, {
                $limit: limit
            }
        ], function(err, result) {
            if (err)
                return callback(err);


            callback(null, result);
        });
    };

    this.getAvailabilityForProducts = function(query, options, callback) {
        var Availability;
        var dbName;
        var err;

        var obj = options.match;
        var sort = options.sort;
        var skip = options.skip;
        var limit = options.limit;

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof callback !== 'function') {
            callback = function() {};
        }

        dbName = options.dbName;
        delete options.dbName;

        if (!dbName || typeof options !== 'object') {
            err = new Error('Invalid input parameters');
            err.status = 400;

            return callback(err);
        }

        Availability = MODEL('productsAvailability').Schema;
        Availability.aggregate([{
            $match: query
        }, {
            $group: {
                _id: '$product',
                onHand: { $sum: '$onHand' }
            }
        }], function(err, result) {
            if (err) {
                return callback(err);
            }

            callback(null, result);
        });
    };
};



var StockCorrections = function() {
    // var AvailabilitySchema = mongoose.Schemas.productsAvailability;
    // var StockCorrectionsSchema = mongoose.Schemas.stockCorrection;
    // var GoodsOutSchema = mongoose.Schemas.GoodsOutNote;
    // var objectId = mongoose.Types.ObjectId;
    var AvailabilityService = new Availability();

    this.create = function(req, res, next) {
        var body = req.body;
        var StockCorrectionModel = MODEL('stockCorrections').Schema;
        var dbName = req.session.lastDb;
        var options = {
            body: body,
            dbName: dbName
        };

        body.createdBy = {
            user: req.session.uId
        };

        var stockCorrection = new StockCorrection(body);

        stockCorrection.save(function(err, doc) {
            if (err) {
                return next(err);
            }

            function callback(err) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(doc);
            }

            async.each(body.orderRows, function(elem, eachCb) {
                var options;

                if (elem.quantity <= 0) {
                    options = {
                        query: {
                            location: body.location,
                            product: elem.product
                        },

                        dbName: dbName
                    };

                    AvailabilityService.find(options, function(err, docs) {

                        var lastQuantity = elem.quantity;

                        if (err) {
                            return eachCb(err);
                        }

                        if (docs.length) {

                            async.each(docs, function(doc, eachChildCb) {
                                var optionsEach;

                                if (lastQuantity > 0) {
                                    return eachChildCb();
                                }

                                lastQuantity += doc.onHand;

                                if ((!lastQuantity || lastQuantity < 0) && !doc.orderRows.length && !doc.goodsOutNotes.length) {
                                    optionsEach = {
                                        query: {
                                            _id: doc._id
                                        },

                                        body: { $set: { archived: true } },

                                        dbName: dbName
                                    };
                                    AvailabilityService.updateByQuery(optionsEach, function(err, doc) {
                                        if (err) {
                                            return eachChildCb(err);
                                        }

                                        eachChildCb();
                                    });
                                } else {
                                    optionsEach = {
                                        body: {
                                            onHand: lastQuantity
                                        },

                                        query: {
                                            _id: doc._id
                                        },

                                        dbName: dbName
                                    };
                                    AvailabilityService.updateByQuery(optionsEach, function(err, doc) {
                                        if (err) {
                                            return eachChildCb(err);
                                        }

                                        eachChildCb();
                                    });
                                }

                            }, function(err) {
                                if (err) {
                                    return eachCb(err);
                                }
                                eachCb();
                            });
                        } else {
                            eachCb();
                        }

                    });
                } else {
                    options = {
                        dbName: dbName,
                        body: {
                            location: body.location,
                            warehouse: body.warehouse,
                            goodsInNote: doc._id,
                            product: elem.product,
                            onHand: elem.quantity,
                            cost: elem.cost
                        }
                    };

                    AvailabilityService.create(options, function(err, doc) {
                        if (err) {
                            return eachCb(err);
                        }

                        eachCb();
                    });
                }

            }, callback);

        });
    };

    this.allocate = function(req, res, next) {
        var body = req.body;
        var Availability = MODEL('productsAvailability').Schema;
        var GoodsOutNote = MODEL('GoodsOutNote').Schema;
        var orderId = body.order;

        async.each(body.data, function(elem, eachCb) {

            var lastSum = elem.quantity;
            var isFilled;

            Availability.find({
                warehouse: elem.warehouse,
                product: elem.product
            }, function(err, avalabilities) {
                if (err) {
                    return eachCb(err);
                }
                if (avalabilities.length) {
                    async.each(avalabilities, function(availability, cb) {
                        var allocated = 0;
                        var resultOnHand;
                        var existedRow = {
                            quantity: 0
                        };

                        var allOnHand;

                        availability.orderRows.forEach(function(orderRow) {
                            if (orderRow.orderRowId.toJSON() === elem.orderRowId) {
                                existedRow = orderRow;
                            } else {
                                allocated += orderRow.quantity;
                            }
                        });

                        if (isFilled && elem.quantity) {
                            return cb();
                        }

                        allOnHand = availability.onHand + existedRow.quantity;

                        if (!allOnHand) {
                            return cb();
                        }

                        resultOnHand = allOnHand - lastSum;

                        if (resultOnHand < 0) {
                            lastSum = Math.abs(resultOnHand);
                            resultOnHand = 0;
                        } else {
                            isFilled = true;
                        }

                        if (existedRow.orderRowId) {

                            if (!elem.quantity) {
                                Availability.update({ _id: availability._id }, {
                                    $inc: {
                                        onHand: existedRow.quantity
                                    },
                                    $pull: {
                                        orderRows: { orderRowId: existedRow.orderRowId }
                                    }
                                }, function(err) {
                                    if (err) {
                                        return cb(err);
                                    }
                                    cb();
                                });
                            } else {
                                Availability.update({
                                    _id: availability._id,
                                    'orderRows.orderRowId': existedRow.orderRowId
                                }, {
                                    'orderRows.$.quantity': resultOnHand ? lastSum : allOnHand,
                                    onHand: resultOnHand
                                }, function(err) {
                                    if (err) {
                                        return cb(err);
                                    }
                                    cb();
                                });
                            }

                        } else if (elem.quantity) {
                            Availability.findByIdAndUpdate(availability._id, {
                                $addToSet: {
                                    orderRows: {
                                        orderRowId: elem.orderRowId,
                                        quantity: resultOnHand ? lastSum : allOnHand
                                    }
                                },
                                onHand: resultOnHand
                            }, function(err) {
                                if (err) {
                                    return cb(err);
                                }
                                cb();
                            });
                        } else {
                            cb();
                        }
                    }, function(err) {
                        if (err) {
                            return eachCb(err);
                        }
                        eachCb();
                    });
                } else {
                    eachCb();
                }
            });

        }, function(err) {
            if (err) {
                return next(err);
            }

            event.emit('recalculateStatus', req, orderId, next);
            res.status(200).send({ success: 'Products updated' });
        });

    };

    this.getCorrections = function(req, res, next) {
        var data = req.query;
        var limit = parseInt(data.count, 10);
        var skip = (parseInt(data.page || 1, 10) - 1) * limit;
        var obj = {};
        var addObj = {};
        var StockCorrection = MODEL('stockCorrections').Schema;
        /* var filterMapper = new FilterMapper();*/

        var keys;
        var sort;

        obj.$and = [];
        obj.$and.push({ _type: 'stockCorrections' });

        /*if (data && data.filter) {

         obj.$and.push(filterMapper.mapFilter(data.filter, 'DealTasks'));
         }*/

        if (data.sort) {
            keys = Object.keys(data.sort)[0];
            data.sort[keys] = parseInt(data.sort[keys], 10);
            sort = data.sort;
        } else {
            sort = { 'dueDate': -1 };
        }

        StockCorrection
            .aggregate([{
                    $match: obj
                },
                {
                    $lookup: {
                        from: 'warehouse',
                        localField: 'warehouse',
                        foreignField: '_id',
                        as: 'warehouse'
                    }
                },
                {
                    $lookup: {
                        from: 'locations',
                        localField: 'location',
                        foreignField: '_id',
                        as: 'location'
                    }
                },
                {
                    $lookup: {
                        from: 'Users',
                        localField: 'createdBy.user',
                        foreignField: '_id',
                        as: 'createdBy.user'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        location: { $arrayElemAt: ['$location', 0] },
                        warehouse: { $arrayElemAt: ['$warehouse', 0] },
                        'createdBy.user': { $arrayElemAt: ['$createdBy.user', 0] },
                        'createdBy.date': 1,
                        description: 1
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        root: { $push: '$$ROOT' }
                    }
                },
                {
                    $unwind: '$root'
                },
                {
                    $project: {
                        _id: '$root._id',
                        location: '$root.location',
                        warehouse: '$root.warehouse',
                        createdBy: '$root.createdBy',
                        description: '$root.description',
                        total: 1
                    }
                },
                {
                    $sort: sort
                }, {
                    $skip: skip
                }, {
                    $limit: limit
                }
            ], function(err, result) {
                var count;
                var response = {};

                if (err) {
                    return next(err);
                }

                count = result[0] && result[0].total ? result[0].total : 0;

                response.total = count;
                response.data = result;
                res.status(200).send(response);
            });

    };

    this.getById = function(req, res, next) {
        var id = req.params.id;
        var StockCorrection = MODEL('stockCorrections').Schema;

        StockCorrection.findById(id)
            .populate('warehouse', ' name')
            .populate('location', ' name')
            .populate('orderRows.product', ' name')
            .populate('createdBy.user', 'login')
            .exec(function(err, correction) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(correction);
            });
    };

    this.getProductsAvailable = function(req, res, next) {
        var Availability = MODEL('productsAvailability').Schema;
        var queryObject = req.query;
        var product = queryObject.product;
        var warehouseFrom = queryObject.warehouse;
        var warehouseTo = queryObject.warehouseTo;
        var location = queryObject.location;
        var queryFrom;
        var queryTo;

        queryFrom = {
            warehouse: objectId(warehouseFrom),
            product: objectId(product)
        };

        queryTo = {
            warehouse: objectId(warehouseTo),
            product: objectId(product)
        };

        if (location) {
            queryFrom.location = objectId(location);
            queryTo.location = objectId(location);

            delete queryFrom.warehouse;
            delete queryTo.warehouse;
        }

        function getAvailabilityFrom(pCb) {
            Availability.aggregate([{
                $match: queryFrom
            }, {
                $lookup: {
                    from: 'Products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            }, {
                $project: {
                    product: { $arrayElemAt: ['$product', 0] },
                    warehouse: 1,
                    onHand: 1
                }

            }, {
                $group: {
                    _id: '$warehouse',
                    onHand: { $sum: '$onHand' },
                    product: { $first: '$product' }
                }
            }], function(err, availability) {
                if (err) {
                    return pCb(err);
                }

                pCb(null, availability && availability.length ? availability[0] : {});
            });
        }

        function getAvailabilityTo(pCb) {
            Availability.aggregate([{
                $match: queryTo
            }, {
                $lookup: {
                    from: 'Products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            }, {
                $project: {
                    warehouse: 1,
                    onHand: 1
                }

            }, {
                $group: {
                    _id: '$warehouse',
                    onHand: { $sum: '$onHand' }
                }
            }], function(err, availability) {
                if (err) {
                    return pCb(err);
                }

                pCb(null, availability && availability.length ? availability[0] : {});
            });
        }

        async.parallel({
            getAvailabilityFrom: getAvailabilityFrom,
            getAvailabilityTo: getAvailabilityTo
        }, function(err, result) {
            var getAvailabilityFrom = result.getAvailabilityFrom;
            var getAvailabilityTo = result.getAvailabilityTo;
            var data = getAvailabilityFrom;

            if (err) {
                return next(err);
            }

            if (getAvailabilityTo && getAvailabilityTo.onHand) {
                data.destination = getAvailabilityTo.onHand;
            }

            res.status(200).send(data);
        });
    };

    this.bulkRemove = function(req, res, next) {
        var StockCorrection = MODEL('stockCorrections').Schema;
        var body = req.body || { ids: [] };
        var ids = body.ids;

        // todo some validation on ids array, like check for objectId

        StockCorrection.remove({ _id: { $in: ids } }, function(err, removed) {
            if (err) {
                return next(err);
            }

            res.status(200).send(removed);
        });
    };

    this.remove = function(req, res, next) {
        var StockCorrection = MODEL('stockCorrections').Schema;
        var id = req.params.id;

        StockCorrection.findOneAndRemove({ _id: id }, function(err, correction) {
            if (err) {
                return next(err);
            }

            res.status(200).send({ success: correction });
        });
    };

};