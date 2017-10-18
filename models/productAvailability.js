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

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    _ = require('lodash'),
    async = require('async'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var AvailabilitySchema = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        default: null
    },
    warehouse: {
        type: ObjectId,
        ref: 'warehouse',
        default: null
    },
    location: {
        type: ObjectId,
        ref: 'location',
        default: null
    },
    goodsInNote: {
        type: ObjectId,
        ref: 'goodsInNotes',
        default: null
    }, //IN
    cost: {
        type: Number,
        default: 0
    },
    onHand: {
        type: Number,
        default: 0
    },
    goodsOutNotes: [{
        _id: false, //OUT
        goodsNoteId: {
            type: ObjectId,
            ref: 'goodsOutNotes'
        },
        qty: {
            type: Number,
            default: 0
        }
    }],

    isJob: {
        type: Boolean,
        default: false
    },
    orderRows: [{
        _id: false, //Allocated
        orderRowId: {
            type: ObjectId,
            ref: 'orderRows'
        }, //allocated all for ever
        qty: {
            type: Number,
            default: 0
        }
    }],

    archived: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'productsAvailability'
});

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

        Location.findOne({
            warehouse: warehouse
        }, function(err, location) {
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


        self.update({
            onHand: {
                $gt: 0
            },
            archived: true
        }, {
            $set: {
                archived: false
            }
        }, function(err) {
            if (err)
                return callback(err);

            self.remove({
                onHand: 0,
                orderRows: [],
                goodsOutNotes: []
            }, function(err) {
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
                $sum: '$orderRows.qty'
            },

            fulfilled: {
                $sum: '$goodsOutNotes.qty'
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

    var query = [{
            $match: {
                isJob: false
            }
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
                from: 'Product',
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
                from: 'Orders',
                localField: 'goodsInNote',
                foreignField: '_id',
                as: 'goodsInNote'
            }
        }, //TODO a corriger car cela casse les prformances de la requete !!!!!!!!!!!!!!!!!!
        {
            $lookup: {
                from: 'Users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy'
            }
        },
        {
            $project: {
                _id: 1,
                location: {
                    $arrayElemAt: ['$location', 0]
                },
                warehouse: {
                    $arrayElemAt: ['$warehouse', 0]
                },
                product: {
                    $arrayElemAt: ['$product', 0]
                },
                goodsInNote: {
                    $arrayElemAt: ['$goodsInNote', 0]
                },
                createdBy: {
                    $arrayElemAt: ['$createdBy', 0]
                },
                createdAt: 1,
                description: 1,
                cost: 1,
                onHand: 1,
                allocated: {
                    $add: [{
                        $sum: '$orderRows.qty'
                    }, {
                        $sum: '$goodsOutNotes.qty'
                    }]
                },

                inStock: {
                    $add: ['$onHand', {
                        $sum: '$orderRows.qty'
                    }, {
                        $sum: '$goodsOutNotes.qty'
                    }]
                }
            }
        },
        /* {
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
                 createdAt: 1,
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
                 createdAt: { $first: '$createdAt' },
                 description: { $first: '$description' },
                 cost: { $first: '$cost' },
                 variants: { $push: '$variants.value' },
                 inStock: { $first: '$inStock' },
                 allocated: { $first: '$allocated' },
                 onHand: { $first: '$onHand' }
             }
         },*/
        {
            $lookup: {
                from: 'Orders',
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
                createdAt: 1,
                description: 1,
                variants: 1,
                cost: 1,
                onHand: 1,
                allocated: 1,
                inStock: 1,
                goodsInNote: 1,
                order: {
                    $arrayElemAt: ['$order', 0]
                }
            }
        },
        {
            $match: obj
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                root: {
                    $push: '$$ROOT'
                }
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
                createdAt: '$root.createdAt',
                description: '$root.description',
                order: '$root.order',
                cost: '$root.cost',
                variants: '$root.variants',
                total: 1,
                total_cost: {
                    $multiply: ["$root.onHand", "$root.cost"]
                },
                value: {
                    $multiply: ['$root.inStock', '$root.cost']
                },
                inStock: '$root.inStock',
                allocated: '$root.allocated',
                onHand: '$root.onHand'
            }
        }
    ];


    async.parallel([
            function(pCb) {
                let localQuery = _(query).concat({
                    $sort: sort
                }, {
                    $skip: skip
                }, {
                    $limit: limit
                });

                Availability.aggregate(localQuery.value()).exec(pCb);
            },
            function(pCb) {
                let localQuery = _(query).concat({
                    $group: {
                        _id: null,
                        total_cost: {
                            $sum: "$total_cost"
                        }
                    }
                });

                Availability.aggregate(localQuery.value()).exec(pCb);
            }
        ],
        function(err, result) {;
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
            onHand: {
                $sum: '$onHand'
            }
        }
    }], function(err, result) {
        if (err)
            return callback(err);

        callback(null, result);
    });
};





AvailabilitySchema.statics.updateAvailableProducts = function(options, mainCb) {
    var self = this;
    var doc = options.doc;
    var error = 'Not enough available products';

    if (doc && doc.orderRows.length) {
        async.eachSeries(doc.orderRows, function(orderRow, eachCb) {
                var lastSum;
                var isFilled = false;

                lastSum = orderRow.qty;

                //return console.log(orderRow.product, doc.warehouse);

                //Only product with stock managment
                if (orderRow.product.info.productType.inventory == false)
                    return eachCb();

                self.find({
                    warehouse: doc.warehouse,
                    product: orderRow.product._id
                }, function(err, avalabilities) {
                    if (err)
                        return eachCb(err);

                    //console.log(avalabilities);

                    if (avalabilities.length) {
                        async.each(avalabilities, function(avalability, cb) {
                            var resultOnHand;
                            var existedRow = {
                                qty: 0
                            };
                            var onHand;
                            var qtyDeliver;

                            if (orderRow.orderRowId)
                                avalability.orderRows.forEach(function(orderRowEl) {
                                    if (orderRowEl.orderRowId && (orderRowEl.orderRowId.toString() === orderRow.orderRowId.toString()))
                                        existedRow = orderRow;
                                });

                            if (isFilled)
                                return cb();

                            onHand = avalability.onHand + existedRow.qty;

                            if (!onHand || onHand <= 0)
                                return cb();

                            resultOnHand = onHand - lastSum;

                            if (resultOnHand < 0) {
                                lastSum = Math.abs(resultOnHand);
                                resultOnHand = 0;
                            } else
                                isFilled = true;

                            qtyDeliver = resultOnHand ? lastSum : onHand;

                            function callback() {
                                var locationsDeliverIds;
                                var existedBatch;

                                if (err)
                                    return cb(err);

                                if (orderRow.locationsDeliver && orderRow.locationsDeliver.length && avalability.location) {
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
                                        existedBatch.qty += qtyDeliver;
                                    else
                                        orderRow.batchesDeliver.push({
                                            goodsNote: avalability.goodsInNote,
                                            qty: qtyDeliver,
                                            cost: avalability.cost
                                        });

                                }

                                orderRow.cost += avalability.cost * qtyDeliver;
                                orderRow.qty = qtyDeliver;
                                cb();
                            }

                            if (existedRow.orderRowId) {
                                if (existedRow.qty > qtyDeliver) {
                                    self.updateByQuery(_.extend({
                                        query: {
                                            _id: avalability._id,
                                            'orderRows.orderRowId': existedRow.orderRowId
                                        },

                                        body: {
                                            $inc: {
                                                'orderRows.$.qty': -qtyDeliver
                                            },

                                            $addToSet: {
                                                goodsOutNotes: {
                                                    goodsNoteId: doc._id,
                                                    qty: qtyDeliver
                                                }
                                            }
                                        }
                                    }, options), callback);
                                } else {
                                    self.updateByQuery(_.extend({
                                        query: {
                                            _id: avalability._id,
                                            'orderRows.orderRowId': existedRow.orderRowId
                                        },

                                        body: {
                                            $addToSet: {
                                                goodsOutNotes: {
                                                    goodsNoteId: doc._id,
                                                    qty: qtyDeliver
                                                }
                                            },

                                            $pull: {
                                                orderRows: {
                                                    orderRowId: existedRow.orderRowId
                                                }
                                            },

                                            onHand: resultOnHand
                                        }
                                    }, options), callback);
                                }
                            } else {
                                self.updateByQuery(_.extend({
                                    query: {
                                        _id: avalability._id
                                    },

                                    body: {
                                        $addToSet: {
                                            goodsOutNotes: {
                                                goodsNoteId: doc._id,
                                                qty: qtyDeliver
                                            }
                                        },

                                        onHand: resultOnHand
                                    }
                                }, options), callback);
                            }
                        }, function(err) {
                            if (err)
                                return eachCb(err);

                            //if (!orderRow.qty)
                            //    return eachCb(error);

                            eachCb();
                            F.emit('inventory:update', {
                                userId: null,
                                product: {
                                    _id: orderRow.product._id.toString()
                                }
                            });

                        });
                    } else
                        eachCb(error);
                });
            },
            function(err) {
                if (err)
                    return mainCb(err);

                mainCb(null, doc.orderRows);
            });
    } else
        mainCb(error);
};
AvailabilitySchema.statics.deliverProducts = function(options, mainCb) {
    var self = this;
    var OrderRows = MODEL('orderRows').Schema;
    var goodsOutNote = options.goodsOutNote;
    var body;
    var uId = options.uId;

    self.updateByQuery(_.extend({
        query: {
            goodsOutNotes: {
                $size: 0
            },
            orderRows: {
                $size: 0
            },
            onHand: 0,
            isJob: false
        },

        body: {
            $set: {
                archived: true
            }
        }
    }, options), function(err) {
        if (err)
            mainCb(err);

        async.each(goodsOutNote.orderRows, function(orderRow, cb) {
            var accountsItems = [];

            body = {
                journal: null,
                currency: {
                    _id: "EUR"
                },

                date: goodsOutNote.status.isShipped,
                sourceDocument: {
                    model: 'goodsOutNote',
                    _id: goodsOutNote._id,
                    ref: goodsOutNote.ref
                },

                accountsItems: accountsItems,
                amount: orderRow.cost
            };

            return cb();

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

            if (goodsOutNote.shippingCost.shipping) {
                body = {
                    journal: null,
                    currency: {
                        _id: "EUR"
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

                        OrgService.getDefaultShippingAccount({
                            dbName: dbName
                        }, function(err, shipping) {
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
AvailabilitySchema.statics.receiveProducts = function(options, mainCb) {
    var self = this;
    var OrderRows = MODEL('orderRows').Schema;
    var goodsInNote = options.goodsInNote;
    var warehouseTo = goodsInNote.warehouseTo ? goodsInNote.warehouseTo._id : goodsInNote.warehouse;
    var uId = options.uId;
    var body;

    async.each(goodsInNote.orderRows, function(elem, eachCb) {
        var locations = elem.locationsReceived;
        var batches = elem.batchesDeliver;
        var cost = elem.cost * elem.qty;
        options.availabilities = [];
        if (locations.length) {

            if (batches && batches.length) {
                cost = 0;

                locations.forEach(function(el) {
                    if (!el.qty)
                        return false;


                    batches.forEach(function(batch) {
                        var batchqty = batch.qty;

                        if (!batch.qty || !el.qty)
                            return false;


                        if (batch.qty >= el.qty) {
                            batchqty = el.qty;
                            batch.qty -= el.qty;
                            el.qty = 0;
                        } else if (el.qty > batch.qty) {
                            el.qty -= batch.qty;
                            batch.qty = 0;
                        }

                        cost += batch.cost * batchqty;

                        options.availabilities.push({
                            location: el.location,
                            onHand: batchqty,
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
                        createdAt: new Date(),
                        location: el.location,
                        onHand: el.qty,
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
                    _id: "EUR"
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

        async.parallel([createAvailabilities /*, createEntries*/ ], function(err) {
            if (err)
                return eachCb(err);

            F.emit('inventory:update', {
                userId: null,
                product: {
                    _id: elem.product.toString()
                }
            });

            eachCb();
        });

    }, function(err) {
        if (err)
            return mainCb(err);


        if (goodsInNote.shippingCost) {
            body = {
                journal: null,
                currency: {
                    _id: "EUR"
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

                    OrgService.getDefaultShippingAccount({
                        dbName: dbName
                    }, function(err, shipping) {
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