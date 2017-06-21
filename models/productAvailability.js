"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var AvailabilitySchema = new Schema({
    product: { type: ObjectId, ref: 'Product', default: null },
    warehouse: { type: ObjectId, ref: 'warehouse', default: null },
    location: { type: ObjectId, ref: 'location', default: null },
    goodsInNote: { type: ObjectId, ref: 'goodsInNotes', default: null },
    cost: { type: Number, default: 0 },
    onHand: { type: Number, default: 0 },
    goodsOutNotes: [{
        goodsNoteId: { type: ObjectId, ref: 'goodsOutNotes', default: null },
        quantity: { type: Number, default: 0 }
    }],

    isJob: { type: Boolean, default: false },
    orderRows: [{
        orderRowId: { type: ObjectId, ref: 'orderRows', default: null },
        quantity: { type: Number, default: 0 }
    }],

    creationDate: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false }
}, { collection: 'productsAvailability' });

AvailabilitySchema.plugin(timestamps);

AvailabilitySchema.statics.createMulti = function(options, callback) {
    var Availability = this;
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

    Availability.collection.insertMany(options.availabilities, function(err) {
        if (err)
            return callback(err);

        callback();
    });
};

AvailabilitySchema.statics.createAvailabilityJob = function(options, callback) {
    var self = this;
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

    Warehouse = MODEL('warehouses').Schema;
    Location = MODEL('locations').Schema;

    if (warehouseId)
        query._id = warehouseId;
    else
        query.isOwn = true;

    Warehouse.findOne(query, function(err, warehouse) {
        var warehouse = warehouse ? warehouse._id : null;

        if (err)
            return callback(err);

        Location.findOne({ warehouse: warehouse }, function(err, location) {
            var location = location ? location._id : null;

            if (err)
                return callback(err);

            availability = new self({
                product: options.product,
                location: location,
                warehouse: warehouse,
                isJob: true
            });
            availability.save(function(err, model) {
                if (err)
                    return callback(err);

                callback();
            });
        });
    });

};

AvailabilitySchema.statics.updateByQuery = function(options, callback) {
    var self = this;
    var Availability;
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

    this.update(query, body, settings || {}, function(err, availability) {
        if (err)
            return callback(err);


        self.update({ onHand: { $gt: 0 }, archived: true }, { $set: { archived: false } }, function(err) {
            if (err)
                return callback(err);

            self.remove({ onHand: 0, orderRows: [], goodsOutNotes: [] }, function(err) {
                if (err)
                    return callback(err);
            });
        });

        callback(null, availability);
    });
};

/*AvailabilitySchema.statics.updateById = function(options, callback) {
    var Availability = this;
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

    Availability.findByIdAndUpdate(id, body, { new: true }, function(err, availability) {
        if (err)
            return callback(err);

        callback(null, availability);

    });
};*/

AvailabilitySchema.statics.tryToRemove = function(options, callback) {
    var Availability = this;
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

    Availability.find(query, function(err, result) {
        var goodsOut = 0;

        if (err)
            return callback(err);


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
            err = "Can't cancel Order because of some Sales";
            callback(err);
        }
    });

};

AvailabilitySchema.statics.getProductAvailability = function(query, options, callback) {
    var Availability = this;
    var err;

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (typeof callback !== 'function') {
        callback = function() {};
    }

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

        if (err)
            return callback(err);


        if (result && result.length)
            prodAvailable = result[0];

        callback(null, prodAvailable);
    });
};

AvailabilitySchema.statics.getList = function(options, callback) {
    var Availability = this;
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

AvailabilitySchema.statics.getAvailabilityForProducts = function(query, options, callback) {
    var Availability = this;
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

    Availability.aggregate([{
        $match: query
    }, {
        $group: {
            _id: '$product',
            onHand: { $sum: '$onHand' }
        }
    }], function(err, result) {
        if (err)
            return callback(err);

        callback(null, result);
    });
};





AvailabilitySchema.methods.updateAvailableProducts = function(options, mainCb) {
    var doc = self;
    var error = new Error('Not enough available products');
    error.status = 404;

    if (doc && doc.orderRows.length) {
        async.each(doc.orderRows, function(orderRow, eachCb) {
            var lastSum;
            var isFilled;

            lastSum = orderRow.quantity;

            doc.model.find(_.extend({
                query: {
                    warehouse: doc.warehouse,
                    product: orderRow.product
                }
            }, options), function(err, avalabilities) {
                if (err)
                    return eachCb(err);

                if (avalabilities.length) {
                    async.each(avalabilities, function(avalability, cb) {
                        var resultOnHand;
                        var existedRow = {
                            quantity: 0
                        };
                        var onHand;
                        var quantityDeliver;

                        if (orderRow.orderRowId) {
                            avalability.orderRows.forEach(function(orderRowEl) {
                                if (orderRowEl.orderRowId && (orderRowEl.orderRowId.toJSON() === orderRow.orderRowId.toJSON())) {
                                    existedRow = orderRow;
                                }
                            });
                        }

                        if (isFilled) {
                            return cb();
                        }

                        onHand = avalability.onHand + existedRow.quantity;

                        if (!onHand || onHand < 0)
                            return cb();

                        resultOnHand = onHand - lastSum;

                        if (resultOnHand < 0) {
                            lastSum = Math.abs(resultOnHand);
                            resultOnHand = 0;
                        } else
                            isFilled = true;

                        quantityDeliver = resultOnHand ? lastSum : onHand;

                        function callback() {
                            var locationsDeliverIds;
                            var existedBatch;

                            if (err)
                                return cb(err);

                            if (orderRow.locationsDeliver && avalability.location) {
                                locationsDeliverIds = orderRow.locationsDeliver.map(function(elem) {
                                    return elem.toString();
                                });
                                if (!locationsDeliverIds.length || locationsDeliverIds.indexOf(avalability.location._id.toString()) === -1) {
                                    orderRow.locationsDeliver.push(avalability.location._id);
                                }
                            }

                            if (orderRow.batchesDeliver) {
                                existedBatch = _.find(orderRow.batchesDeliver, function(el) {
                                    return (el.goodsNote.toString() === avalability.goodsInNote.toString());
                                });
                                if (existedBatch)
                                    existedBatch.quantity += quantityDeliver;
                                else
                                    orderRow.batchesDeliver.push({
                                        goodsNote: avalability.goodsInNote,
                                        quantity: quantityDeliver,
                                        cost: avalability.cost
                                    });

                            }

                            orderRow.cost += avalability.cost * quantityDeliver;
                            cb();
                        }

                        if (existedRow.orderRowId) {
                            if (existedRow.quantity > quantityDeliver) {
                                doc.model.updateByQuery(_.extend({
                                    query: {
                                        _id: avalability._id,
                                        'orderRows.orderRowId': existedRow.orderRowId
                                    },

                                    body: {
                                        $inc: {
                                            'orderRows.$.quantity': -quantityDeliver
                                        },

                                        $addToSet: {
                                            goodsOutNotes: {
                                                goodsNoteId: doc._id,
                                                quantity: quantityDeliver
                                            }
                                        }
                                    }
                                }, options), callback);
                            } else {
                                doc.model.updateByQuery(_.extend({
                                    query: {
                                        _id: avalability._id,
                                        'orderRows.orderRowId': existedRow.orderRowId
                                    },

                                    body: {
                                        $addToSet: {
                                            goodsOutNotes: {
                                                goodsNoteId: doc._id,
                                                quantity: quantityDeliver
                                            }
                                        },

                                        $pull: {
                                            orderRows: { orderRowId: existedRow.orderRowId }
                                        },

                                        onHand: resultOnHand
                                    }
                                }, options), callback);
                            }
                        } else {
                            doc.model.updateByQuery(_.extend({
                                query: {
                                    _id: avalability._id
                                },

                                body: {
                                    $addToSet: {
                                        goodsOutNotes: {
                                            goodsNoteId: doc._id,
                                            quantity: quantityDeliver
                                        }
                                    },

                                    onHand: resultOnHand
                                }
                            }, options), callback);
                        }
                    }, function(err) {
                        if (err)
                            return eachCb(err);

                        if (!orderRow.quantity)
                            return eachCb(error);

                        eachCb();

                    });
                } else
                    eachCb(error);
            });
        }, function(err) {
            if (err)
                return mainCb(err);

            mainCb(null, doc.orderRows);
        });
    } else
        mainCb(error);
};
AvailabilitySchema.methods.deliverProducts = function(options, mainCb) {
    var self = this.model;
    var OrderRows = MODEL('orderRows').Schema;
    var goodsOutNote = this;
    var body;
    var uId = options.uId;

    self.updateByQuery(_.extend({
        query: {
            goodsOutNotes: { $size: 0 },
            orderRows: { $size: 0 },
            onHand: 0,
            isJob: false
        },

        body: { $set: { archived: true } }
    }, options), function(err) {
        if (err)
            mainCb(err);

        async.each(goodsOutNote.orderRows, function(orderRow, cb) {
            var accountsItems = [];

            body = {
                journal: null,
                currency: {
                    _id: CONSTANTS.CURRENCY_USD
                },

                date: goodsOutNote.status.isShipped,
                sourceDocument: {
                    model: 'goodsOutNote',
                    _id: goodsOutNote._id,
                    name: goodsOutNote.name
                },

                accountsItems: accountsItems,
                amount: orderRow.cost
            };

            OrderRows.populate(orderRow, {
                path: 'orderRowId',
                select: 'debitAccount creditAccount'
            }, function(err) {

                var debitAccount = orderRow.orderRowId ? orderRow.orderRowId.debitAccount : null;
                var creditAccount = orderRow.orderRowId ? orderRow.orderRowId.creditAccount : (goodsOutNote.warehouse ? goodsOutNote.warehouse.account : null);

                if (err)
                    return cb(err);

                accountsItems.push({
                    debit: 0,
                    credit: body.amount,
                    account: creditAccount
                });

                if (debitAccount) {
                    accountsItems.push({
                        debit: body.amount,
                        credit: 0,
                        account: debitAccount
                    });
                }

                journalEntry.createMultiRows(body, {
                    dbName: options.dbName,
                    uId: options.uId,
                    cb: cb
                });
            });

        }, function(err) {
            if (err)
                return mainCb(err);

            if (goodsOutNote.shippingCost) {
                body = {
                    journal: null,
                    currency: {
                        _id: CONSTANTS.CURRENCY_USD
                    },

                    date: goodsOutNote.status.shippedOn,
                    sourceDocument: {
                        model: 'goodsOutNote',
                        _id: goodsOutNote._id,
                        name: goodsOutNote.name
                    },

                    accountsItems: [],
                    amount: goodsOutNote.shippingCost
                };

                PaymentMethodService.populatePaymentMethod({
                    dbName: dbName,
                    path: 'order.paymentMethod',
                    query: goodsOutNote
                }, function(err, goodsOutNote) {
                    if (!err) {

                        OrgService.getDefaultShippingAccount({ dbName: dbName }, function(err, shipping) {
                            if (!err) {
                                body.accountsItems.push({
                                    credit: 0,
                                    debit: goodsOutNote.shippingCost,
                                    account: shipping
                                }, {
                                    credit: goodsOutNote.shippingCost,
                                    debit: 0,
                                    account: goodsOutNote.order.paymentMethod.chartAccount
                                });

                                journalEntry.createMultiRows(body, {
                                    dbName: dbName,
                                    uId: uId
                                });
                            }
                        });

                    }
                });

            }

            mainCb();

        });
    });
};
AvailabilitySchema.methods.receiveProducts = function(options, mainCb) {
    var self = this.model;
    var OrderRows = MODEL('orderRows').Schema;
    var goodsInNote = this;
    var warehouseTo = goodsInNote.warehouseTo ? goodsInNote.warehouseTo._id : goodsInNote.warehouse;
    var uId = options.uId;
    var body;

    async.each(goodsInNote.orderRows, function(elem, eachCb) {
        var locations = elem.locationsReceived;
        var batches = elem.batchesDeliver;
        var cost = elem.cost * elem.quantity;

        options.availabilities = [];
        if (locations.length) {

            if (batches && batches.length) {
                cost = 0;

                locations.forEach(function(el) {
                    if (!el.quantity)
                        return false;


                    batches.forEach(function(batch) {
                        var batchQuantity = batch.quantity;

                        if (!batch.quantity || !el.quantity)
                            return false;


                        if (batch.quantity >= el.quantity) {
                            batchQuantity = el.quantity;
                            batch.quantity -= el.quantity;
                            el.quantity = 0;
                        } else if (el.quantity > batch.quantity) {
                            el.quantity -= batch.quantity;
                            batch.quantity = 0;
                        }

                        cost += batch.cost * batchQuantity;

                        options.availabilities.push({
                            location: el.location,
                            onHand: batchQuantity,
                            goodsInNote: batch.goodsNote,
                            warehouse: warehouseTo,
                            product: elem.product,
                            goodsOutNotes: [],
                            orderRows: [],
                            isJob: false,
                            cost: batch.cost
                        });
                    });
                });

            } else {
                locations.forEach(function(el) {
                    options.availabilities.push({
                        location: el.location,
                        onHand: el.quantity,
                        goodsInNote: goodsInNote._id,
                        warehouse: warehouseTo,
                        goodsOutNotes: [],
                        orderRows: [],
                        product: elem.product,
                        isJob: false,
                        cost: elem.cost
                    });
                });
            }

        }

        function createEntries(parallelCb) {
            var accountsItems = [];

            body = {
                journal: null,
                currency: {
                    _id: CONSTANTS.CURRENCY_USD
                },

                date: goodsInNote.status.receivedOn,
                sourceDocument: {
                    model: 'goodsOutNote',
                    _id: goodsInNote._id,
                    name: goodsInNote.name
                },

                accountsItems: accountsItems,
                amount: cost
            };

            OrderRows.populate(elem, {
                path: 'orderRowId',
                select: 'debitAccount creditAccount'
            }, function(err) {
                var debitAccount = elem.orderRowId ? elem.orderRowId.debitAccount : (goodsInNote.warehouseTo ? goodsInNote.warehouseTo.account : '');
                var creditAccount = elem.orderRowId ? elem.orderRowId.creditAccount : null;

                if (err)
                    return parallelCb(err);


                accountsItems.push({
                    debit: body.amount,
                    credit: 0,
                    account: debitAccount
                });

                if (creditAccount) {
                    accountsItems.push({
                        debit: 0,
                        credit: body.amount,
                        account: creditAccount
                    });
                }

                journalEntry.createMultiRows(body, {
                    dbName: dbName,
                    uId: uId,
                    cb: parallelCb
                });
            });

        }

        function createAvailabilities(parallelCb) {
            self.createMulti(_.clone(options), function(err) {
                if (err)
                    return parallelCb(err);

                parallelCb();
            });
        }

        async.parallel([createAvailabilities, createEntries], function(err) {
            if (err)
                return eachCb(err);

            eachCb();
        });

    }, function(err) {
        if (err)
            return mainCb(err);


        if (goodsInNote.shippingCost) {
            body = {
                journal: null,
                currency: {
                    _id: CONSTANTS.CURRENCY_USD
                },

                date: goodsInNote.status.receivedOn,
                sourceDocument: {
                    model: 'goodsInNote',
                    _id: goodsInNote._id,
                    name: goodsInNote.name
                },

                accountsItems: [],
                amount: goodsInNote.shippingCost
            };

            PaymentMethodService.populatePaymentMethod({
                dbName: dbName,
                path: 'order.paymentMethod',
                query: goodsInNote
            }, function(err, goodsInNote) {
                if (!err) {

                    OrgService.getDefaultShippingAccount({ dbName: dbName }, function(err, shipping) {
                        if (!err) {
                            body.accountsItems.push({
                                credit: 0,
                                debit: goodsInNote.shippingCost,
                                account: shipping
                            }, {
                                credit: goodsInNote.shippingCost,
                                debit: 0,
                                account: goodsInNote.order.paymentMethod.chartAccount
                            });

                            journalEntry.createMultiRows(body, {
                                dbName: dbName,
                                uId: uId
                            });
                        }
                    });

                }
            });

        }

        mainCb(null, goodsInNote);
    });
};

exports.Schema = mongoose.model('productsAvailability', AvailabilitySchema);
exports.name = "productsAvailability";