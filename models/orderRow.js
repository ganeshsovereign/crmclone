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
    Schema = mongoose.Schema,
    _ = require('lodash'),
    async = require('async'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var setPrice = MODULE('utils').setPrice;
var setDate = MODULE('utils').setDate;

var OrderRowSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'product'
    },
    product_type: String,
    order: {
        type: ObjectId,
        ref: 'order',
        index: true
    },
    warehouse: {
        type: ObjectId,
        ref: 'warehouse'
    },
    type: {
        type: String,
        default: 'product'
    }, //Used for subtotal
    refProductSupplier: String, //Only for an order Supplier or For Ref Title Comment
    qty: {
        type: Number,
        default: 0
    },
    total_taxes: [{
        _id: false,
        taxeId: {
            type: Schema.Types.ObjectId,
            ref: 'taxes'
        },
        value: {
            type: Number
        }
    }],
    description: String,
    private: String, // Private note
    priceSpecific: {
        type: Boolean,
        default: false
    },
    pu_ht: {
        type: Number,
        default: 0
    }, //unitPrice
    costPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total_ht: {
        type: Number,
        default: 0,
        set: setPrice
    },
    pdf: {
        sizes: {
            label: {
                type: String,
                default: 'normalsize'
            }
        },
        colors: {
            label: {
                type: String,
                default: 'black'
            }
        }
    },
    optional: {}, // For dynamic forms
    //nominalCode: { type: Number, default: 0 },
    channel: {
        type: ObjectId,
        ref: 'integrations'
    },
    integrationId: String,
    sequence: Number, // sequence
    isDeleted: {
        type: Boolean,
        defaut: false
    }
}, {
    collection: 'orderRows'
});

OrderRowSchema.plugin(timestamps);

OrderRowSchema.statics.getAvailableForRows = function(docs, forSales, cb) {
    var Availability = MODEL('productsAvailability').Schema;
    var GoodsOutNote = MODEL('order').Schema.GoodsOutNote;
    var GoodsInNote = MODEL('order').Schema.GoodsInNote;
    var objectId = MODULE('utils').ObjectId;
    var populateDocs = [];
    var allGoodsNotes = [];

    if (docs && docs.length) {
        async.each(docs, function(elem, eachCb) {
                var product;
                var warehouseId;

                var parallelTasks;

                //elem = elem.toJSON();
                //return console.log(elem);

                product = elem.product ? elem.product._id : null;
                warehouseId = elem.warehouse ? elem.warehouse._id : null;

                function getAvailabilities(parallelCb) {
                    Availability.aggregate([{
                        $match: {
                            product: product,
                            warehouse: warehouseId
                        },
                    }, {
                        $project: {
                            product: 1,
                            warehouse: 1,
                            onHand: 1,
                            filterRows: {
                                $filter: {
                                    input: '$orderRows',
                                    as: 'elem',
                                    cond: {
                                        $eq: ['$$elem.orderRowId', objectId(elem._id)]
                                    }
                                }
                            },
                            orderRows: 1,
                            goodsOutNotes: 1
                        }
                    }, {
                        $project: {
                            product: 1,
                            warehouse: 1,
                            onHand: 1,
                            allocated: {
                                $sum: '$filterRows.qty'
                            },

                            allocatedAll: {
                                $sum: '$orderRows.qty'
                            },

                            fulfillAll: {
                                $sum: '$goodsOutNotes.qty'
                            }
                        }
                    }, {
                        $project: {
                            product: 1,
                            warehouse: 1,
                            onHand: 1,
                            allocated: 1,
                            inStock: {
                                $add: ['$onHand', '$allocatedAll', '$fulfillAll']
                            }
                        }
                    }, {
                        $group: {
                            _id: '$warehouse',
                            allocated: {
                                $sum: '$allocated'
                            },

                            onHand: {
                                $sum: '$onHand'
                            },

                            inStock: {
                                $sum: '$inStock'
                            },

                            onOrder: {
                                $sum: '$onOrder'
                            }
                        }
                    }], function(err, availability) {
                        if (err)
                            return parallelCb(err);

                        //return console.log(availability);
                        parallelCb(null, availability);
                    });
                }

                function getNotes(parallelCb) {
                    var Model = forSales ? GoodsOutNote : GoodsInNote;

                    Model.aggregate([{
                        $match: {
                            'orderRows.orderRowId': elem._id,
                            _type: forSales ? 'GoodsOutNote' : 'GoodsInNote',
                            isremoved: {
                                $ne: true
                            },
                            'status.isInventory': {
                                $ne: null
                            },
                            archived: {
                                $ne: true
                            }
                        }
                    }, {
                        $lookup: {
                            from: 'warehouse',
                            localField: 'warehouse',
                            foreignField: '_id',
                            as: 'warehouse'
                        }
                    }, {
                        $lookup: {
                            from: 'productsAvailability',
                            localField: '_id',
                            foreignField: 'goodsInNote',
                            as: 'goodsInNote'
                        }
                    }, {
                        $lookup: {
                            from: 'Users',
                            localField: 'status.printedById',
                            foreignField: '_id',
                            as: 'status.printedById'
                        }
                    }, {
                        $lookup: {
                            from: 'Users',
                            localField: 'status.pickedById',
                            foreignField: '_id',
                            as: 'status.pickedById'
                        }
                    }, {
                        $lookup: {
                            from: 'Users',
                            localField: 'status.packedById',
                            foreignField: '_id',
                            as: 'status.packedById'
                        }
                    }, {
                        $lookup: {
                            from: 'Users',
                            localField: 'status.shippedById',
                            foreignField: '_id',
                            as: 'status.shippedById'
                        }
                    }, {
                        $lookup: {
                            from: 'Order',
                            localField: 'order',
                            foreignField: '_id',
                            as: 'order'
                        }
                    }, {
                        $project: {
                            name: '$name',
                            orderRow: {
                                $filter: {
                                    input: '$orderRows',
                                    as: 'elem',
                                    cond: {
                                        $eq: ['$$elem.orderRowId', objectId(elem._id)]
                                    }
                                }
                            },

                            goodsInNote: {
                                $arrayElemAt: ['$goodsInNote', 0]
                            },
                            warehouse: {
                                $arrayElemAt: ['$warehouse', 0]
                            },
                            order: {
                                $arrayElemAt: ['$order', 0]
                            },
                            'status.printedById': {
                                $arrayElemAt: ['$status.printedById', 0]
                            },
                            'status.pickedById': {
                                $arrayElemAt: ['$status.pickedById', 0]
                            },
                            'status.packedById': {
                                $arrayElemAt: ['$status.packedById', 0]
                            },
                            'status.shippedById': {
                                $arrayElemAt: ['$status.shippedById', 0]
                            },
                            'status.isShipped': 1,
                            'status.isPicked': 1,
                            'status.isPacked': 1,
                            'status.isPrinted': 1
                        }
                    }, {
                        $project: {
                            name: '$name',
                            orderRow: {
                                $arrayElemAt: ['$orderRow', 0]
                            },
                            status: 1,
                            warehouse: 1,
                            'goodsInNote._id': 1,
                            'goodsInNote.onHand': 1,
                            'order.name': 1
                        }
                    }, {
                        $project: {
                            name: '$name',
                            orderRow: '$orderRow.orderRowId',
                            qty: '$orderRow.qty',
                            status: 1,
                            warehouse: 1,
                            goodsInNote: 1,
                            'order.name': 1
                        }
                    }], function(err, docs) {
                        if (err)
                            return parallelCb(err);

                        //console.log(docs);
                        if (docs && docs.length) {
                            docs = docs.map(function(el) {
                                el._id = el._id.toJSON();
                                return el;
                            });
                        }

                        parallelCb(null, docs);
                    });
                }

                parallelTasks = [getNotes, getAvailabilities];

                async.parallel(parallelTasks, function(err, response) {
                    var availability;
                    var goodsNotes;

                    if (err)
                        return eachCb(err);


                    availability = response[1];
                    goodsNotes = response[0];
                    allGoodsNotes = allGoodsNotes.concat(goodsNotes);

                    availability = availability && availability.length ? availability[0] : null;

                    if (availability) {
                        elem.inStock = availability.inStock;
                        elem.onHand = availability.onHand;
                        elem.allocated = availability.allocated;
                    }
                    elem.goodsNotes = goodsNotes;
                    elem.fulfilled = 0;

                    if (goodsNotes && goodsNotes.length) {
                        goodsNotes.forEach(function(el) {
                            if (el.qty)
                                elem.fulfilled += el.qty;
                        });
                    }
                    populateDocs.push(elem);
                    eachCb();
                });

            },
            function(err) {
                if (err)
                    return cb(err);


                allGoodsNotes = _.uniq(allGoodsNotes, '_id');

                cb(null, populateDocs, allGoodsNotes);

            });
    } else
        cb();


};

exports.Schema = mongoose.model('orderRows', OrderRowSchema);
exports.name = "orderRows";