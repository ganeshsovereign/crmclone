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

var mongoose = require('mongoose'),
    _ = require('lodash'),
    async = require('async'),
    moment = require('moment'),
    Iconv = require('iconv').Iconv;

var Dict = INCLUDE('dict');
var Latex = INCLUDE('latex');

exports.install = function() {

    var object = new Object();
    var billing = new Billing();

    F.route('/erp/api/delivery', object.read, ['authorize']);
    F.route('/erp/api/delivery/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/delivery/dt_supplier', object.readDT_supplier, ['post', 'authorize']);
    F.route('/erp/api/delivery/caFamily', object.caFamily, ['authorize']);
    F.route('/erp/api/delivery/statistic', object.statistic, ['post', 'json', 'authorize']);
    F.route('/erp/api/delivery/pdf/', object.pdfAll, ['post', 'json', 'authorize', 60000]);
    F.route('/erp/api/delivery/csv/', object.csvAll, ['post', 'json', 'authorize']);
    F.route('/erp/api/delivery/mvt/', object.csvMvt, ['post', 'json', 'authorize']);
    F.route('/erp/api/delivery/pdf/{deliveryId}', object.pdf, ['authorize']);
    F.route('/erp/api/delivery/pdf/{deliveryId}/{version}', function(ref, version) {
        object.pdf(ref + '/' + version, this);
    }, ['authorize']);

    // recupere la liste des courses pour verification
    F.route('/erp/api/delivery/billing', billing.read, ['authorize']);

    F.route('/erp/api/delivery/billing/ca', billing.familyCA, ['authorize']);

    F.route('/erp/api/delivery', object.create, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/delivery/{deliveryId}', object.show, ['authorize']);
    F.route('/erp/api/delivery/{deliveryId}', object.clone, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/delivery/{deliveryId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/delivery/', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/delivery/{deliveryId}', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/delivery/download/{:id}', object.download);
};

function Object() {}

Object.prototype = {
    show: function(id) {
        var self = this;
        const BillModel = MODEL('invoice').Schema;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }


        async.waterfall([
                function(wCb) {
                    DeliveryModel.getById(id, wCb);
                },
                function(delivery, wCb) {
                    if (!delivery)
                        return wCb();

                    BillModel.findOne({
                        orders: delivery.order,
                        isremoved: {
                            $ne: true
                        },
                        Status: {
                            $ne: "DRAFT"
                        }
                    }, "_id ref Status total_ht", function(err, bill) {
                        if (err)
                            return wCb(err);

                        if (bill)
                            delivery.bill = bill;

                        wCb(null, delivery);
                    });
                }
            ],
            function(err, result) {
                if (err)
                    return self.throw500(err);

                if (!result)
                    return self.throw404();

                self.json(result);
            });
    },
    create: function() {
        var self = this;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }

        delete self.body.status;

        var delivery = {};
        delivery = new DeliveryModel(self.body);

        delivery.editedBy = self.user._id;
        delivery.createdBy = self.user._id;

        if (!delivery.order)
            delivery.order = delivery._id;

        if (!delivery.entity)
            delivery.entity = self.user.entity;

        //return console.log(delivery);
        delivery.save(function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    clone: function(id) {
        var self = this;
        var OrderRowsModel = MODEL('orderRows').Schema;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }


        var rows = self.body.lines;

        DeliveryModel.getById(id, function(err, delivery) {
            if (err)
                return self.throw500(err);

            var orderOld = null;

            // Check if this delivery include its owns lines : order._id == _id
            if (delivery._id == delivery.order._id)
                var orderOld = delivery.order._id;

            delete delivery._id;
            delete delivery.__v;
            delete delivery.ref;
            delete delivery.createdAt;
            delete delivery.updatedAt;
            delete delivery.bill;
            delete delivery.history;
            delete delivery.orderRows;
            delivery.Status = "DRAFT";
            delivery.notes = [];
            delivery.latex = {};
            delivery.status = {};
            delivery.tracking = "";
            delivery.datec = new Date();

            delivery = new DeliveryModel(delivery);
            delivery.editedBy = self.user._id;
            delivery.createdBy = self.user._id;

            if (orderOld) //clone BL with lines
                delivery.order = delivery._id;

            if (delivery.entity == null)
                delivery.entity = self.user.entity;

            for (var i = 0; i < delivery.orderRows.length; i++)
                delete delivery.orderRows[i].isDeleted; //Undelete orderRow lines

            //console.log(delivery);
            delivery.save(function(err, doc) {
                if (err)
                    return console.log(err);

                if (orderOld) //duplicate lines only if pricing Delivery
                    return async.each(rows, function(orderRow, aCb) {
                            orderRow.order = order._id;

                            if (orderRow.isDeleted && !orderRow._id)
                                return aCb();

                            delete orderRow._id;
                            delete orderRow.__v;
                            delete orderRow.createdAt;

                            var orderRow = new OrderRowsModel(orderRow);
                            orderRow.save(aCb);
                        },
                        function(err) {
                            if (err) {
                                console.log(err);
                                return self.json({
                                    errorNotify: {
                                        title: 'Erreur',
                                        message: err
                                    }
                                });
                            }

                            self.json(doc);
                        });

                self.json(doc);
            });
        });
    },
    update: function(id) {
        var self = this;
        var OrderRowsModel = MODEL('orderRows').Schema;
        var Availability = MODEL('productsAvailability').Schema;
        var isInventory = false;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }

        self.body.editedBy = self.user._id;

        if (self.body.Status == 'INSTOCK' && !self.body.status.isReceived) {
            self.body.status.isReceived = new Date();
            self.body.status.receivedById = self.user._id;
        }

        if (self.body.Status == "VALIDATED" && !self.body.status.isInventory) {
            isInventory = true;
        }

        // CANCEL DELIVERY
        if (self.body.Status == "DRAFT" && self.body.status.isInventory) {
            //cancelled inventory
            return DeliveryModel.cancelInventories({
                    ids: [self.body._id]
                },
                function(err, doc) {
                    if (err)
                        return self.throw500(err);

                    self.json({});
                });
        }

        if (!self.body.createdBy)
            self.body.createdBy = self.user._id;

        var rows = self.body;
        for (var i = 0; i < rows.length; i++)
            rows[i].sequence = i;

        MODULE('utils').sumTotal(rows, self.body.shipping, self.body.discount, self.body.supplier, function(err, result) {
            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }

            self.body.total_ht = result.total_ht;
            self.body.total_taxes = result.total_taxes;
            self.body.total_ttc = result.total_ttc;
            //return console.log(result);
            self.body.weight = 0;
            //refresh weight only on qty sended
            for (let i = 0, len = self.body.orderRows.length; i < len; i++) {
                if (!self.body.orderRows[i].qty || self.body.orderRows[i].isDeleted)
                    continue;

                self.body.weight += self.body.orderRows[i].qty * self.body.orderRows[i].product.weight;
            }

            //console.log(self.body.orderRows[i].qty);

            DeliveryModel.findByIdAndUpdate(id, self.body, {
                    new: true
                })
                .populate('logisticMethod')
                .exec(function(err, delivery) {
                    if (err)
                        return self.throw500(err);

                    // Add logistic weight
                    if (delivery.logisticMethod && delivery.logisticMethod.weight && delivery.Status !== 'SEND')
                        delivery.weight += delivery.logisticMethod.weight;

                    //update shippingCost
                    if (delivery.Status !== 'SEND' && delivery.logisticMethod && delivery.logisticMethod.price)
                        delivery.shippingCost.logistic = delivery.logisticMethod.price;

                    //delivery = _.extend(delivery, self.body);

                    //delivery.editedBy = self.user._id;
                    async.waterfall([
                            function(wCb) {
                                // Delivery depend on other order
                                if (delivery.order.toString() !== id || !rows.length)
                                    return wCb();

                                async.each(rows, function(orderRow, aCb) {
                                    orderRow.order = delivery._id;

                                    if (orderRow.isDeleted && !orderRow._id)
                                        return aCb();

                                    if (orderRow._id)
                                        return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, aCb);

                                    var orderRow = new OrderRowsModel(orderRow);
                                    orderRow.save(aCb);
                                }, wCb);
                            },
                            function(wCb) {
                                delivery.save(function(err, doc) {
                                    wCb(err, doc);
                                });
                            },
                            function(doc, wCb) {
                                //if (doc.forSales == true)
                                //F.emit('order:recalculateStatus', {userId:  self.user._id.toString(), order: doc.toJSON(() });

                                //update inventory IN

                                if (doc.status.isInventory)
                                    return wCb(null, doc);

                                if (!doc.status.isReceived)
                                    return wCb(null, doc);

                                return DeliveryModel.findById(doc._id)
                                    .populate('order', 'shippingMethod shippingExpenses logisticMethod')
                                    .exec(function(err, result) {
                                        if (err)
                                            return wCb(err);

                                        return Availability.receiveProducts({
                                            uId: self.user._id,
                                            goodsInNote: result.toObject()
                                        }, function(err) {
                                            if (err)
                                                return wCb(err);

                                            if (result && result.order)
                                                F.emit('order:recalculateStatus', {
                                                    userId: self.user._id.toString(),
                                                    order: {
                                                        _id: result.order._id.toString()
                                                    }
                                                });

                                            doc.status.isInventory = new Date();
                                            doc.save(function(err, doc) {
                                                if (err)
                                                    return wCb(err);

                                                doc = doc.toObject();
                                                doc.successNotify = {
                                                    title: "Success",
                                                    message: "Bon de reception cloture"
                                                };

                                                return wCb(null, doc);
                                            });
                                        });
                                    });
                            },
                            function(doc, wCb) {
                                //update inventory OUT
                                if (doc.status.isInventory)
                                    return wCb(null, doc);

                                // return console.log(doc.status);

                                if (!isInventory)
                                    return wCb(null, doc);


                                return DeliveryModel.findById(doc._id)
                                    .populate('order', 'shippingMethod shippingExpenses')
                                    .populate({
                                        path: "orderRows.product",
                                        select: "info",
                                        populate: {
                                            path: "info.productType"
                                        }
                                    })
                                    .exec(function(err, result) {
                                        if (err)
                                            return wCb(err);

                                        //return console.log((result.orderRows));

                                        result = result.toObject();
                                        result.orderRows = _.filter(result.orderRows, function(elem) {
                                            if (!elem.qty || elem.isDeleted)
                                                return false;

                                            return true;
                                        });

                                        //return console.log((result.orderRows));

                                        return Availability.updateAvailableProducts({
                                            doc: result
                                        }, function(err, rows) {
                                            if (err)
                                                return wCb(err);
                                            //console.log(rows);
                                            result.orderRows = rows;

                                            return Availability.deliverProducts({
                                                uId: self.user._id,
                                                goodsOutNote: result
                                            }, function(err) {
                                                if (err)
                                                    return wCb(err);

                                                if (result && result.order)
                                                    F.emit('order:recalculateStatus', {
                                                        userId: self.user._id.toString(),
                                                        order: {
                                                            _id: result.order._id.toString()
                                                        }
                                                    });

                                                doc.orderRows = rows;

                                                doc.status.isInventory = new Date();
                                                //doc.status.isShipped = new Date();
                                                //doc.status.shippedById = self.user._id;
                                                doc.Status = "VALIDATED";

                                                doc.save(function(err, doc) {
                                                    if (err)
                                                        return wCb(err);

                                                    doc = doc.toObject();
                                                    doc.successNotify = {
                                                        title: "Success",
                                                        message: "Bon de livraison cloture"
                                                    };

                                                    return wCb(null, doc);
                                                });
                                            });
                                        });
                                    });
                            }
                        ],
                        function(err, doc) {
                            if (err) {
                                console.log(err);

                                delivery.update({
                                    'status.isPrinted': null,
                                    'status.isPacked': null,
                                    'status.isPicked': null
                                }, function(err, doc) {});

                                return self.json({
                                    errorNotify: {
                                        title: 'Erreur',
                                        message: err
                                    }
                                });
                            }

                            if (doc.successNotify)
                                return self.json(doc);

                            delivery.save(function(err, doc) {
                                if (err) {
                                    console.log(err);
                                    return self.json({
                                        errorNotify: {
                                            title: 'Erreur',
                                            message: err
                                        }
                                    });
                                }

                                F.emit('order:recalculateStatus', {
                                    userId: self.user._id.toString(),
                                    order: {
                                        _id: doc.order.toString()
                                    }
                                });

                                F.emit('order:update', {
                                    userId: self.user._id.toString(),
                                    order: {
                                        _id: doc._id.toString()
                                    }
                                });

                                F.emit('notify:controllerAngular', {
                                    userId: null,
                                    route: 'delivery',
                                    _id: doc._id.toString(),
                                    message: "Livraison " + doc.ref + ' modifiee.'
                                });

                                //console.log(doc);
                                doc = doc.toObject();
                                doc.successNotify = {
                                    title: "Success",
                                    message: "Bon de livraison enregistre"
                                };
                                self.json(doc);
                            });
                        });
                });
        });
    },
    destroyList: function(id) {
        var self = this;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }

        var Availability = MODEL('productsAvailability').Schema;

        if (!id && !this.query.id)
            return self.throw500("No ids in destroy list");

        //var list = JSON.parse(this.query.id);
        var list = this.query.id;
        if (!list && !id)
            return self.throw500("No ids in destroy list");

        var ids = [];

        if (id)
            ids.push(id);
        else if (typeof list === 'object')
            ids = list;
        else
            ids.push(list);

        async.each(ids, function(id, cb) {
            DeliveryModel.findById(id)
                .populate('order')
                .exec(function(err, goodsNote) {
                    var options;

                    if (err)
                        return cb(err);

                    if (goodsNote && goodsNote.order) {
                        async.each(goodsNote.orderRows, function(goodsOrderRow, callback) {

                            var query = goodsNote.order.project ? {
                                product: goodsOrderRow.product,
                                warehouse: goodsNote.warehouse
                            } : {
                                'goodsOutNotes.goodsNoteId': goodsNote._id,
                                product: goodsOrderRow.product,
                                warehouse: goodsNote.warehouse
                            };

                            Availability.updateByQuery({
                                query: query,

                                body: {
                                    $inc: {
                                        onHand: goodsOrderRow.qty
                                    },

                                    $pull: {
                                        goodsOutNotes: {
                                            goodsNoteId: goodsNote._id
                                        }
                                    }
                                }
                            }, function(err) {
                                if (err)
                                    return callback(err);

                                options = {
                                    query: {
                                        'sourceDocument.model': 'goodsOutNote',
                                        'sourceDocument._id': id
                                    }
                                };

                                //JournalEntryService.remove(options);

                                callback();
                            });
                        }, function(err) {
                            if (err)
                                return cb(err);

                            DeliveryModel.findByIdAndUpdate(goodsNote._id, {
                                isremoved: true,
                                Status: 'CANCELED',
                                total_ht: 0,
                                total_ttc: 0,
                                total_tva: [],
                                orderRows: []
                            }, function(err, result) {
                                if (err)
                                    return self.throw500(err);
                                console.log(result);

                                F.emit('order:recalculateStatus', {
                                    userId: self.user._id.toString(),
                                    order: {
                                        _id: goodsNote.order._id.toString()
                                    }
                                });

                                cb();
                            });
                        });

                    } else
                        cb();
                });
        }, function(err) {
            if (err)
                return self.throw500(err);

            self.json({});
        });
    },
    readDT: function() {
        var self = this;
        const OrderModel = MODEL('order').Schema.OrderCustomer;

        if (self.query.stockReturn === 'true') {
            //if (self.query.forSales == "false")
            //    return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            //else
            var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            //if (self.query.forSales == "false")
            //    var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            //else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }


        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.body.query);

        //console.log(self.query);

        var conditions = {
            Status: {
                $nin: ["BILLED", "SEND"]
            },
            isremoved: {
                $ne: true
            }
            // forSales: true
        };

        //if (self.query.forSales == "false")
        //    conditions.forSales = false;

        if (!query.search.value) {
            if (self.query.Status && self.query.Status !== 'null' && self.query.Status !== 'undefined')
                conditions.Status = self.query.Status;
        } else
            delete conditions.Status;

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        var options = {
            conditions: conditions,
            select: "ref forSales orderRows"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                    dictName: "fk_delivery_status",
                    object: true
                }, cb);*/
                cb(null, MODEL('order').Status);
            },
            datatable: function(cb) {
                DeliveryModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            //console.log(res);
            SocieteModel.populate(res, {
                path: "datatable.data.supplier",
                select: "_id name"
            }, function(err, res) {
                OrderModel.populate(res, {
                    path: "datatable.data.order",
                    select: " _id ref"
                }, function(err, res) {

                    for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                        var row = res.datatable.data[i];
                        //console.log(row);

                        // Add checkbox
                        res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                        // Add id
                        res.datatable.data[i].DT_RowId = row._id.toString();
                        // Add color line 
                        //if (res.datatable.data[i].Status === 'SEND')
                        //res.datatable.data[i].DT_RowClass = "bg-green-turquoise";
                        // Add link company

                        if (row.supplier && row.supplier._id)
                            res.datatable.data[i].supplier = '<a class="with-tooltip" href="#!/societe/' + row.supplier._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.supplier.fullName + '"><span class="fa fa-institution"></span> ' + row.supplier.fullName + '</a>';
                        else {
                            if (!row.supplier)
                                res.datatable.data[i].supplier = {};
                            res.datatable.data[i].supplier = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                        }

                        if (row.status) {
                            //Printed Picked Packed Shipped
                            if (res.datatable.data[i].status.isPrinted == null)
                                res.datatable.data[i].status.isPrinted = '<span class="fa fa-close font-red"></span>';
                            else
                                res.datatable.data[i].status.isPrinted = '<span class="fa fa-check font-green-jungle"' + '" data-tooltip-options=\'{"position":"top"}\' title="Imprimé le : ' + row.status.isPrinted.format(CONFIG('dateformatLong')) + '"></span>';

                            if (res.datatable.data[i].status.isPicked == null)
                                res.datatable.data[i].status.isPicked = '<span class="fa fa-close font-red"></span>';
                            else
                                res.datatable.data[i].status.isPicked = '<span class="fa fa-check font-green-jungle"' + '" data-tooltip-options=\'{"position":"top"}\' title="Scanné le : ' + row.status.isPicked.format(CONFIG('dateformatLong')) + '"></span>';

                            if (res.datatable.data[i].status.isPacked == null)
                                res.datatable.data[i].status.isPacked = '<span class="fa fa-close font-red"></span>';
                            else
                                res.datatable.data[i].status.isPacked = '<span class="fa fa-check font-green-jungle"' + '" data-tooltip-options=\'{"position":"top"}\' title="Emballé le : ' + row.status.isPacked.format(CONFIG('dateformatLong')) + '"></span>';

                            if (res.datatable.data[i].status.isShipped == null)
                                res.datatable.data[i].status.isShipped = '<span class="fa fa-close font-red"></span>';
                            else
                                res.datatable.data[i].status.isShipped = '<span class="fa fa-check font-green-jungle"' + '" data-tooltip-options=\'{"position":"top"}\' title="Expédié le : ' + row.status.isShipped.format(CONFIG('dateformatLong')) + '"></span>';
                        }

                        // Action
                        res.datatable.data[i].action = '<a href="#!/stockreturn/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                        // Add url on name
                        //if (row.forSales)
                        if (self.query.stockReturn === 'true')
                            res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/stockreturn/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-truck"></span> ' + row.ref + '</a>';
                        else
                            res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/delivery/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-truck"></span> ' + row.ref + '</a>';

                        if (row.order)
                            res.datatable.data[i].order = '<a class="with-tooltip" href="#!/order/' + row.order._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.order.ref + '"><span class="fa fa-truck"></span> ' + row.order.ref + '</a>';
                        // Convert Date
                        res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                        res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                        res.datatable.data[i].datedl = (row.datedl ? moment(row.datedl).format(CONFIG('dateformatShort')) : '');

                        // Convert Status
                        res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);

                        res.datatable.data[i].qty = _.sum(row.orderRows, 'qty');
                    }

                    //console.log(res.datatable);

                    self.json(res.datatable);
                });
            });
        });
    },
    readDT_supplier: function() {
        var self = this;

        if (self.query.forSales == "false")
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.req.body.query);

        //console.log(self.query);

        var conditions = {
            Status: {
                $ne: "BILLED"
            },
            isremoved: {
                $ne: true
            },
            //  forSales: true
        };

        //if (self.query.forSales == "false")
        //    conditions.forSales = false;

        if (!query.search.value) {
            if (self.query.status_id && self.query.status_id !== 'null')
                conditions.Status = self.query.status_id;
        } else
            delete conditions.Status;

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        var options = {
            conditions: conditions,
            select: "ref forSales"
        };


        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                    dictName: "fk_delivery_status",
                    object: true
                }, cb);*/
                cb(null, MODEL('order').Status);
            },
            datatable: function(cb) {
                DeliveryModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            //console.log(res);
            SocieteModel.populate(res, {
                path: "datatable.data.supplier"
            }, function(err, res) {

                for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                    var row = res.datatable.data[i];

                    // Add checkbox
                    res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                    // Add id
                    res.datatable.data[i].DT_RowId = row._id.toString();
                    // Add color line 
                    //if (res.datatable.data[i].Status === 'SEND')
                    //res.datatable.data[i].DT_RowClass = "bg-green-turquoise";
                    // Add link company

                    if (row.supplier && row.supplier._id)
                        res.datatable.data[i].supplier = '<a class="with-tooltip" href="#!/societe/' + row.supplier._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.supplier.fullName + '"><span class="fa fa-institution"></span> ' + row.supplier.fullName + '</a>';
                    else {
                        if (!row.supplier)
                            res.datatable.data[i].supplier = {};
                        res.datatable.data[i].supplier = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                    }
                    // Action
                    res.datatable.data[i].action = '<a href="#!/delivery/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    if (row.forSales)
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/delivery/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-truck"></span> ' + row.ref + '</a>';
                    else
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/deliverysupplier/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-truck"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].datedl = (row.datedl ? moment(row.datedl).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].datedl = (row.datedl ? moment(row.datedl).format(CONFIG('dateformatShort')) : '');

                    // Convert Status
                    res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                }

                //console.log(res.datatable);

                self.json(res.datatable);
            });
        });
    },
    pdf: function(ref, self) {
        // Generation de la facture PDF et download
        if (!self)
            self = this;

        if (self.query.stockReturn === 'true') {
            if (self.query.forSales == "false")
                return;
            //var DeliveryModel = MODEL('order').Schema.stockReturns;
            else
                var DeliveryModel = MODEL('order').Schema.stockReturns;
        } else {
            if (self.query.forSales == "false")
                var DeliveryModel = MODEL('order').Schema.GoodsInNote;
            else
                var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
        }


        DeliveryModel.getById(ref, function(err, doc) {

            if (doc.status.isPrinted == null) {
                doc.status.isPrinted = new Date();
                doc.status.printedById = self.user._id;
                DeliveryModel.findByIdAndUpdate(doc._id, doc, function(err, doc) {});
            }

            createDelivery(doc, function(err, tex) {
                if (err)
                    return console.log(err);

                F.emit('notify:controllerAngular', {
                    userId: self.user._id,
                    route: 'delivery',
                    _id: doc._id.toString(),
                    message: "Livraison " + doc.ref + ' modifiee.'
                });

                self.res.setHeader('Content-type', 'application/pdf');
                self.res.setHeader('x-filename', doc.ref.replace('/', '_') + ".pdf");
                Latex.Template(null, doc.entity)
                    .on('error', function(err) {
                        console.log(err);
                        self.throw500(err);
                    })
                    .compile("main", tex)
                    .pipe(self.res)
                    .on('close', function() {
                        //console.log('document written');
                    });
            });
        });
    },
    pdfAll: function() {
        var self = this;

        var entity = this.body.entity;

        // Generation de la facture PDF et download
        var DeliveryModel = MODEL('order').Schema.Order;

        var tabTex = [];

        DeliveryModel.find({
                Status: "VALIDATED",
                _id: {
                    $in: self.body.id
                }
            })
            .exec(function(err, deliveries) {
                if (err)
                    return console.log(err);

                if (!deliveries.length)
                    return self.json({
                        error: "No deliveries"
                    });

                async.forEachLimit(deliveries, 30, function(delivery, cb) {
                    DeliveryModel.getById(delivery._id, function(err, delivery) {

                        if (delivery.status.isPrinted == null) {
                            delivery.status.isPrinted = new Date();
                            delivery.status.printedById = self.user._id;
                            DeliveryModel.findByIdAndUpdate(delivery._id, delivery, function(err, doc) {});
                        }

                        createDelivery(delivery, function(err, tex) {
                            if (err)
                                return cb(err);
                            //console.log(tex);

                            tabTex.push({
                                id: delivery.ref,
                                tex: tex
                            });
                            cb();
                        });
                    });
                }, function(err) {
                    if (err)
                        return console.log(err);

                    var texOutput = "";

                    function compare(x, y) {
                        var a = parseInt(x.id.substring(x.id.length - 6, x.id.length), 10);
                        var b = parseInt(y.id.substring(y.id.length - 6, y.id.length), 10);

                        if (a < b)
                            return -1;
                        if (a > b)
                            return 1;
                        return 0;
                    }

                    tabTex.sort(compare);

                    for (var i = 0; i < tabTex.length; i++) {
                        if (i !== 0) {
                            texOutput += "\\newpage\n\n";
                            texOutput += "\\setcounter{page}{1}\n\n";
                        }

                        texOutput += tabTex[i].tex;
                    }

                    //console.log(texOutput);

                    F.emit('notify:controllerAngular', {
                        userId: null,
                        route: 'delivery'
                        // _id: doc._id.toString(),
                        //message: "Livraison " + doc.ref + ' modifiee.'
                    });

                    self.res.setHeader('Content-type', 'application/pdf');
                    self.res.setHeader('x-filename', 'deliveries.pdf');
                    Latex.Template(null, entity)
                        .on('error', function(err) {
                            console.log(err);
                            self.throw500(err);
                        })
                        .compile("main", texOutput)
                        .pipe(self.res)
                        .on('close', function() {
                            //console.log('documents written');
                        });
                });
            });
    },
    csvAll: function() {
        var self = this;
        var iconv = new Iconv('UTF-8', 'ISO-8859-1');

        /*format : code_client;name;address1;address2;zip;town;weight;ref*/

        // Generation de la facture PDF et download
        const DeliveryModel = MODEL('order').Schema.Order;

        var Stream = require('stream');
        var stream = new Stream();

        var tabCsv = [];

        DeliveryModel.find({
                Status: {
                    $in: "VALIDATED"
                },
                'status.isPacked': {
                    $ne: null
                },
                _id: {
                    $in: self.body.id
                }
            })
            .populate("supplier", "name salesPurchases.ref")
            .populate("order", "ref ref_client total_ht datec")
            .populate({
                path: "lines.product",
                select: "ref name label weight pack",
                populate: {
                    path: 'pack',
                    select: "ref name label unit"
                }
            })
            .exec(function(err, deliveries) {
                if (err)
                    return console.log(err);

                if (!deliveries.length)
                    return self.json({
                        error: "No deliveries"
                    });

                async.each(deliveries, function(delivery, cb) {
                    var csv = "";
                    /*format : code_client;name;address1;address2;zip;town;weight;ref*/

                    csv += delivery.ref;
                    csv += ";" + delivery.supplier.fullName;
                    var address = delivery.address.street.split('\n');
                    if (address[0])
                        csv += ";" + address[0];
                    else
                        csv += ";";
                    if (address[1])
                        csv += ";" + address[1];
                    else
                        csv += ";";
                    csv += ";" + delivery.address.zip;
                    csv += ";" + delivery.address.city;
                    csv += ";" + MODULE('utils').printNumber(delivery.weight);
                    csv += ";" + delivery.ref;
                    csv += ";" + delivery._id.toString();

                    tabCsv.push({
                        id: delivery.ref,
                        csv: csv
                    });
                    cb();

                }, function(err) {
                    if (err)
                        return console.log(err);

                    function compare(x, y) {
                        var a = parseInt(x.id.substring(x.id.length - 6, x.id.length), 10);
                        var b = parseInt(y.id.substring(y.id.length - 6, y.id.length), 10);

                        if (a < b)
                            return -1;
                        if (a > b)
                            return 1;
                        return 0;
                    }

                    tabCsv.sort(compare);

                    stream.emit('data', iconv.convert(tabCsv[0].csv));

                    for (var i = 1; i < tabCsv.length; i++)
                        stream.emit('data', iconv.convert("\n" + tabCsv[i].csv));

                    stream.emit('end');
                });
            });
        self.res.setHeader('x-filename', 'etiquettes.csv');
        self.stream('application/text', stream, "etiquettes.csv");
    },
    // List of product mouvement in stock form Deliveries
    csvMvt: function() {
        var self = this;
        var iconv = new Iconv('UTF-8', 'ISO-8859-1');
        /*format : ref;label;qty*/

        // Generation de la facture PDF et download
        const DeliveryModel = MODEL('order').Schema.Order;
        var ProductModel = MODEL('product').Schema;

        var Stream = require('stream');
        var stream = new Stream();

        for (var i = 0; i < self.body.id.length; i++)
            self.body.id[i] = mongoose.Types.ObjectId(self.body.id[i]);

        var tabCsv = [];

        DeliveryModel.aggregate([{
                $match: {
                    Status: "VALIDATED",
                    isremoved: {
                        $ne: true
                    },
                    _id: {
                        $in: self.body.id
                    }
                }
            },
            {
                $unwind: "$orderRows"
            },
            {
                $project: {
                    _id: 0,
                    orderRows: 1
                }
            },
            {
                $group: {
                    _id: "$orderRows.product",
                    qty: {
                        "$sum": "$orderRows.qty"
                    }
                }
            }
        ], function(err, deliveries) {
            if (err)
                return console.log(err);

            if (!deliveries.length)
                return stream.emit('end');

            async.each(deliveries, function(delivery, cb) {
                ProductModel.findOne({
                    _id: delivery._id
                }, "info", function(err, product) {
                    var csv = "";

                    csv += product.info.SKU;
                    csv += ";" + product.info.langs[0].name;
                    csv += ";" + delivery.qty;

                    tabCsv.push({
                        id: product.info.SKU,
                        csv: csv
                    });
                    cb();
                });

            }, function(err) {
                if (err)
                    return console.log(err);

                function compare(x, y) {
                    var a = parseInt(x.id.substring(x.id.length - 6, x.id.length), 10);
                    var b = parseInt(y.id.substring(y.id.length - 6, y.id.length), 10);

                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                }

                tabCsv.sort(compare);

                stream.emit('data', iconv.convert(tabCsv[0].csv));

                for (var i = 1; i < tabCsv.length; i++)
                    stream.emit('data', iconv.convert("\n" + tabCsv[i].csv));

                stream.emit('end');
            });
        });
        self.res.setHeader('x-filename', 'mouvements.csv');
        self.stream('application/text', stream, "mouvements.csv");
    },
    caFamily: function() {
        var self = this;
        var DeliveryModel = MODEL('delivery').Schema;
        var ProductModel = MODEL('product').Schema;

        var d = new Date();
        d.setHours(0, 0, 0);
        var dateStart = new Date(d.getFullYear(), parseInt(d.getMonth() - 1, 10), 1);
        var dateEnd = new Date(d.getFullYear(), d.getMonth(), 1);

        var ca = {};

        async.parallel({
            caFamily: function(cb) {
                DeliveryModel.aggregate([{
                        $match: {
                            Status: {
                                '$ne': 'DRAFT'
                            },
                            entity: self.user.entity,
                            datec: {
                                '$gte': dateStart,
                                '$lt': dateEnd
                            }
                        }
                    },
                    {
                        $unwind: "$lines"
                    },
                    {
                        $project: {
                            _id: 0,
                            lines: 1
                        }
                    },
                    {
                        $group: {
                            _id: "$lines.product.name",
                            total_ht: {
                                "$sum": "$lines.total_ht"
                            }
                        }
                    }
                ], function(err, doc) {
                    if (err) {
                        return cb(err);
                    }

                    //console.log(doc);
                    cb(null, doc);
                });
            }
            /*familles: function(cb) {
             CoursesModel.aggregate([
             {$match: {Status: {'$ne': 'REFUSED'}, total_ht: {'$gt': 0}, date_enlevement: {'$gte': dateStart, '$lt': dateEnd}}},
             {$project: {_id: 0, type: 1, total_ht: 1}},
             {$group: {_id: "$type", sum: {"$sum": "$total_ht"}}}
             ], function(err, doc) {
             if (doc.length == 0)
             return cb(0);
             
             //console.log(doc);
             cb(null, doc);
             });
             }*/
        }, function(err, results) {
            if (err)
                return console.log(err);

            //console.log(results);
            async.each(results.caFamily, function(product, callback) {
                //console.log(product);
                ProductModel.findOne({
                    ref: product._id
                }, function(err, doc) {
                    if (!doc)
                        console.log(product);

                    product.caFamily = doc.caFamily;

                    if (typeof ca[doc.caFamily] === "undefined")
                        ca[doc.caFamily] = 0;

                    ca[doc.caFamily] += product.total_ht;
                    //console.log(ca);

                    callback();
                });

            }, function(err) {

                var result = [];
                for (var i in ca) {
                    result.push({
                        family: i,
                        total_ht: ca[i]
                    });
                }

                //console.log(results);

                self.json(result);
            });
        });
    },
    statistic: function() {
        var self = this;
        var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        var ca = {};

        DeliveryModel.aggregate([{
                $match: self.body.query
            },
            {
                $project: {
                    _id: 0,
                    total_ht: 1,
                    total_ht_subcontractors: 1
                }
            },
            {
                $group: {
                    _id: null,
                    total_ht: {
                        "$sum": "$total_ht"
                    },
                    total_ht_subcontractors: {
                        "$sum": "$total_ht_subcontractors"
                    }
                }
            }
        ], function(err, doc) {
            if (err) {
                return console.log(err);
            }

            //console.log(doc);
            self.json(doc);
        });

    },
    download: function(id) {
        var self = this;
        var DeliveryModel = MODEL('delivery').Schema;

        var object = new Object();

        DeliveryModel.findOne({
            _id: id
        }, function(err, delivery) {
            if (err)
                return self.throw500(err);

            if (!delivery)
                return self.view404('Delivery id not found');

            //var date = new Date();
            //order.updatedAt.setDate(order.updatedAt.getDate() + 15); // date + 15j, seulement telechargement pdt 15j

            //if (order.updatedAt < date)
            //    return self.view404('Order expired');

            object.pdf(id, self);

            delivery.history.push({
                date: new Date(),
                mode: 'email',
                msg: 'email pdf telecharge',
                Status: 'notify'
            });

            delivery.save();

        });
    }
};

/**
 * Calcul des donnees de facturation
 */

function Billing() {}

Billing.prototype = {
    read: function() {
        var self = this;
        var DeliveryModel = MODEL('delivery').Schema;

        var result = {
            GroupBL: {},
            GroupOrder: {}
        };

        var project = {};
        var fields = self.query.fields.split(" ");
        for (var i in fields) {
            project[fields[i].trim()] = 1;
        }

        DeliveryModel.aggregate([{
                    $match: {
                        Status: "SEND",
                        entity: self.query.entity,
                        datedl: {
                            $lte: new Date(self.query.dateEnd)
                        }
                    }
                },
                {
                    $project: project
                }
            ])
            .unwind('lines')

            //.populate("orders", "ref ref_client total_ht")
            .exec(function(err, docs) {
                if (err)
                    return console.log(err);

                //console.log(docs);
                result.GroupBL = docs;
                self.json(result);
            });
    },
    create: function(id, self) {
        var DeliveryModel = MODEL('delivery').Schema;
        var FactureModel = MODEL('invoice').Schema;
        var FactureSupplierModel = MODEL('billSupplier').Schema;

        if (!self)
            self = this;

        Delivery(id, function(err, delivery) {

            var bill = new FactureModel();

            bill.client = delivery.billing.societe;

            bill.price_level = delivery.price_level;
            bill.mode_reglement_code = delivery.mode_reglement_code;
            bill.cond_reglement_code = delivery.cond_reglement_code;
            bill.commercial_id = delivery.commercial_id;
            bill.datec = delivery.datedl;

            bill.entity = delivery.entity;

            bill.address = delivery.billing.address;
            bill.zip = delivery.billing.zip;
            bill.town = delivery.billing.town;

            bill.shipping = delivery.shipping;
            bill.ref_client = delivery.ref_client;

            bill.deliveries.push(delivery._id);
            if (delivery.order)
                bill.orders.push(delivery.order);

            // Date de prestation
            bill.dateOf = delivery.dateOf;
            bill.dateTo = delivery.dateTo;

            bill.lines = delivery.lines;

            delivery.Status = 'BILLED'; // class paye

            bill.save(function(err, bill) {
                if (err)
                    return self.throw500(err);

                delivery.bill = bill._id;
                delivery.save(function(err, delivery) {

                });

                self.json(bill);
            });


            // Add lines to supplier
            if (delivery.subcontractors.length > 0) {
                DeliveryModel.aggregate([{
                        '$match': {
                            _id: delivery._id,
                            total_ht_subcontractors: {
                                '$gt': 0
                            }
                        }
                    },
                    {
                        '$unwind': "$subcontractors"
                    },
                    {
                        '$group': {
                            _id: {
                                fournisseur: "$subcontractors.societe",
                                type: "Intervention/Livraison",
                                client: "$client"
                            },
                            delivery_id: {
                                '$addToSet': {
                                    id: "$_id",
                                    name: "$ref"
                                }
                            },
                            lines: {
                                '$addToSet': '$subcontractors'
                            },
                            total_soustraitant: {
                                '$sum': "$total_ht_subcontractors"
                            }
                        }
                    }
                ], function(err, docs) {
                    if (err)
                        console.log(err);

                    async.each(docs, function(doc, cb) {
                        //console.log(doc);
                        FactureSupplierModel.findOne({
                            Status: "DRAFT",
                            "supplier.id": doc._id.fournisseur.id
                        }, {}, {
                            sort: {
                                'createdAt': -1
                            }
                        }, function(err, billSupplier) {
                            if (err)
                                return cb(err);

                            if (billSupplier == null) {
                                //console.log("New bill");
                                billSupplier = new FactureSupplierModel({
                                    supplier: {
                                        id: doc._id.fournisseur.id,
                                        name: doc._id.fournisseur.name
                                    },
                                    type: 'INVOICE_AUTO'
                                });

                                var date = new Date();
                                billSupplier.datec = new Date(date.getFullYear(), date.getMonth(), 0);

                                billSupplier.dateOf = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                                billSupplier.dateTo = new Date(date.getFullYear(), date.getMonth(), 0);

                                billSupplier.entity = delivery.entity;

                                billSupplier.lines = [];
                            }

                            var product = {};
                            var line = {};

                            for (var i = 0, len = doc.lines.length; i < len; i++) {
                                line = doc.lines[i];
                                line.description += "\n" + doc._id.client.name;

                                for (var j = 0, len1 = doc.delivery_id.length; j < len1; j++)
                                    line.description += "\n" + doc.delivery_id[j].name;

                                if (line.total_ht !== 0)
                                    billSupplier.lines.push(line);
                            }

                            billSupplier.save(cb);
                        });
                    }, function(err, result) {

                        if (err)
                            return console.log(err);

                        console.log("Import supplier from delivery OK");
                    });

                });
            }
        });
        //res.send(200);
    },
    createAll: function() {
        var self = this;
        var DeliveryModel = MODEL('delivery').Schema;
        var FactureModel = MODEL('invoice').Schema;
        var FactureSupplierModel = MODEL('billSupplier').Schema;
        var SocieteModel = MODEL('Customers').Schema;
        //console.log(req.body.dateEnd);

        if (!this.body.id)
            return self.throw500("No ids in destroy list");

        //var list = JSON.parse(this.query.id);
        var list = this.body.id;
        if (!list)
            return self.throw500("No ids in destroy list");

        //console.log(list);

        list = _.map(list, function(id) {
            return mongoose.Types.ObjectId(id);
        });

        DeliveryModel.aggregate([{
                "$match": {
                    Status: "SEND",
                    _id: {
                        $in: list
                    }
                }
            },
            {
                "$project": {
                    "datec": 1,
                    datedl: 1,
                    entity: 1,
                    "shipping": 1,
                    "lines": 1,
                    "ref": 1,
                    "societe": "$client.cptBilling"
                }
            },
            {
                "$sort": {
                    datedl: 1
                }
            },
            //{"$unwind": "$lines"},
            {
                "$group": {
                    "_id": {
                        societe: "$societe.id",
                        entity: "$entity"
                    },
                    "data": {
                        "$push": "$$ROOT"
                    }
                }
            }
        ], function(err, docs) {
            if (err)
                return console.log(err);

            //console.log(docs)

            // Creation des factures
            async.each(docs, function(client, callback) {

                SocieteModel.findOne({
                    _id: client._id.societe
                }, function(err, societe) {

                    var datec = new Date();

                    var facture = new FactureModel({
                        title: {
                            ref: "BL" + moment(datec).format(CONFIG('dateformatShort')),
                            autoGenerated: true
                        },
                        client: {
                            id: client._id.societe
                        },
                        type: 'INVOICE_AUTO'
                    });

                    if (societe == null)
                        console.log("Error : pas de societe pour le clientId : " + client._id);

                    facture.client.name = societe.name;
                    facture.price_level = societe.price_level;
                    facture.mode_reglement_code = societe.mode_reglement;
                    facture.cond_reglement_code = societe.cond_reglement;
                    facture.commercial_id = societe.commercial_id;
                    facture.datec = datec;

                    facture.entity = client._id.entity;

                    facture.address = societe.address;
                    facture.zip = societe.zip;
                    facture.town = societe.town;

                    facture.lines = [];

                    var deliveries_id = [];

                    for (var i = 0, len = client.data.length; i < len; i++) {
                        //console.log(client.data[i]);

                        if (client.data[i].lines)
                            for (var j = 0; j < client.data[i].lines.length; j++) {
                                var aline = client.data[i].lines[j];
                                aline.description += (aline.description ? "\n" : "") + client.data[i].ref + " (" + moment(client.data[i].datedl).format(CONFIG('dateformatShort')) + ")";
                                if (aline.qty) //Suppress qty 0
                                    facture.lines.push(aline);
                            }

                        facture.shipping.total_ht += client.data[i].shipping.total_ht;
                        facture.shipping.total_tva += client.data[i].shipping.total_tva;

                        deliveries_id.push(client.data[i]._id.toString());

                    }

                    facture.deliveries = _.uniq(deliveries_id, true);

                    facture.save(function(err, bill) {
                        if (err)
                            return console.log(err);

                        //console.log(bill);
                        for (var i = 0; i < bill.deliveries.length; i++) {
                            DeliveryModel.update({
                                _id: bill.deliveries[i]
                            }, {
                                $set: {
                                    Status: "BILLED"
                                }
                            }, function(err) {
                                if (err)
                                    console.log(err);
                            });
                        }
                        callback(err);
                    });
                });

            }, function(err) {
                if (err)
                    console.log(err);

                self.json({});

            });

        });
    },
    familyCA: function() {
        var result = [];
        var dateStart = new Date();
        dateStart.setHours(0, 0, 0, 0);
        dateStart.setMonth(0);
        dateStart.setDate(1);

        var family = ["MESSAGERIE", "AFFRETEMENT", "COURSE", "REGULIER"];
        async.parallel({
                cafamily: function(cb) {
                    var result = {};
                    //init CA

                    for (var i = 0; i < family.length; i++) {
                        result[family[i]] = [];
                        for (var m = 0; m < 12; m++)
                            result[family[i]].push(0);
                    }

                    /*
                     * Error $month operator with GMT !!!
                     * See https://jira.mongodb.org/browse/SERVER-6310
                     * 
                     * 
                     CoursesModel.aggregate([
                     {$match: {Status: {'$ne': 'REFUSED'}, date_enlevement: {'$gte': dateStart}}},
                     {$project: {total_ht: 1, type: 1, date_enlevement: 1}},
                     {$group: {
                     _id: {
                     type: "$type",
                     month: {$month: "$date_enlevement"}
                     },
                     total_ht: {$sum: "$total_ht"},
                     marge: {$sum: "$commission"}
                     }
                     }
                     ], function(err, docs) {
                     if (err)
                     console.log(err);
                     
                     console.log(docs);
                     
                     for (var i = 0; i < docs.length; i++) {
                     result[docs[i]._id.type][docs[i]._id.month - 1] = docs[i].total_ht;
                     }
                     
                     
                     console.log(result);
                     
                     cb(null, result);
                     });
                     */

                    CoursesModel.find({
                        Status: {
                            '$ne': 'REFUSED'
                        },
                        date_enlevement: {
                            '$gte': dateStart
                        }
                    }, {
                        total_ht: 1,
                        type: 1,
                        date_enlevement: 1
                    }, function(err, docs) {
                        if (err)
                            console.log(err);

                        //console.log(docs);

                        for (var i = 0; i < docs.length; i++) {

                            result[docs[i].type][docs[i].date_enlevement.getMonth()] += docs[i].total_ht;
                        }


                        //console.log(result);

                        cb(null, result);
                    });

                },
                caMonth: function(cb) {
                    var result = {};
                    result.total = [];
                    result.sum = [];
                    for (var m = 0; m < 12; m++)
                        result.total.push(0);

                    /*CoursesModel.aggregate([
                     {$match: {Status: {'$ne': 'REFUSED'}, date_enlevement: {'$gte': dateStart}}},
                     {$project: {total_ht: 1, date_enlevement: 1}},
                     {$group: {
                     _id: {
                     $month: "$date_enlevement"
                     },
                     total_ht: {$sum: "$total_ht"}}
                     }
                     ], function(err, docs) {*/
                    CoursesModel.find({
                            Status: {
                                '$ne': 'REFUSED'
                            },
                            date_enlevement: {
                                '$gte': dateStart
                            }
                        }, {
                            total_ht: 1,
                            date_enlevement: 1
                        },
                        function(err, docs) {
                            for (var i = 0; i < docs.length; i++) {
                                result.total[docs[i].date_enlevement.getMonth()] += docs[i].total_ht;
                            }

                            //apply sum on ca
                            for (var i = 0; i < 12; i++)
                                if (i === 0)
                                    result.sum[i] = result.total[i];
                                else
                                    result.sum[i] = result.total[i] + result.sum[i - 1];

                            cb(null, result);
                        });
                },
                caCumul: function(cb) {
                    var result = [];
                    for (var m = 0; m < 12; m++)
                        result.push(0);

                    /*CoursesModel.aggregate([
                     {$match: {Status: {'$ne': 'REFUSED'}, date_enlevement: {'$gte': dateStart}}},
                     {$project: {total_ht: 1, date_enlevement: 1}},
                     {$group: {
                     _id: {
                     $month: "$date_enlevement"
                     },
                     total_ht: {$sum: "$total_ht"}
                     }
                     }*/
                    CoursesModel.find({
                            Status: {
                                '$ne': 'REFUSED'
                            },
                            date_enlevement: {
                                '$gte': dateStart
                            }
                        }, {
                            total_ht: 1,
                            date_enlevement: 1
                        },
                        function(err, docs) {
                            for (var i = 0; i < docs.length; i++) {
                                result[docs[i].date_enlevement.getMonth()] += docs[i].total_ht;
                            }

                            cb(null, result);
                        });
                },
                caTotalfamily: function(cb) {
                    var result = [];

                    CoursesModel.aggregate([{
                            $match: {
                                Status: {
                                    '$ne': 'REFUSED'
                                },
                                date_enlevement: {
                                    '$gte': dateStart
                                }
                            }
                        },
                        {
                            $project: {
                                total_ht: 1,
                                type: 1,
                                date_enlevement: 1
                            }
                        }, {
                            $group: {
                                _id: "$type",
                                total_ht: {
                                    $sum: "$total_ht"
                                }
                            }
                        }
                    ], function(err, docs) {
                        for (var i = 0; i < docs.length; i++) {
                            result.push({
                                name: docs[i]._id,
                                y: docs[i].total_ht
                            });
                        }

                        cb(null, result);
                    });
                }
            },
            function(err, results) {
                var result = [];
                if (err)
                    return console.log(err);

                for (var i in results.cafamily)
                    result.push({
                        type: 'column',
                        name: i,
                        data: results.cafamily[i]
                    });

                result.push({
                    type: 'spline',
                    name: 'CA mensuel N',
                    yAxis: 1,
                    data: results.caMonth.total,
                    marker: {
                        lineWidth: 2,
                        fillColor: '#4572A7'
                    }
                });

                /*result.push({
                 type: 'spline',
                 name: 'CA cumulé',
                 data: results.caMonth.sum,
                 marker: {
                 lineWidth: 2,
                 fillColor: 'white'
                 }
                 });*/

                result.push({
                    type: 'spline',
                    name: 'CA mensuel N-1',
                    yAxis: 1,
                    data: [226181, 219052, 225464, 126920, 207904, 223189, 246774, 213849, 221774, 239235, 215774, 235522],
                    marker: {
                        lineWidth: 2,
                        fillColor: '#4572A7'
                    }
                });

                result.push({
                    type: 'pie',
                    name: 'Total par famille',
                    data: results.caTotalfamily,
                    center: [80, 40],
                    size: 100,
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                });

                res.json(result);
                /*res.json(
                 [{
                 type: 'column',
                 name: 'Jane',
                 data: [3, 2, 1, 3, 4]
                 }, {
                 type: 'column',
                 name: 'John',
                 data: [2, 3, 5, 7, 6]
                 }, {
                 type: 'column',
                 name: 'Joe',
                 data: [4, 3, 3, 9, 0]
                 }, {
                 type: 'spline',
                 name: 'Average',
                 data: [3, 2.67, 3, 6.33, 3.33],
                 marker: {
                 lineWidth: 2,
                 fillColor: 'white'
                 }
                 }, {
                 type: 'pie',
                 name: 'Total family',
                 data: [{
                 name: 'Jane',
                 y: 13,
                 }, {
                 name: 'John',
                 y: 23,
                 }, {
                 name: 'Joe',
                 y: 19,
                 }],
                 center: [100, 40],
                 size: 100,
                 showInLegend: false,
                 dataLabels: {
                 enabled: false 			 }
                 }]
                 );*/
            });
    }
};

function createDelivery(doc, callback) {
    var SocieteModel = MODEL('Customers').Schema;
    const fixedWidthString = require('fixed-width-string');
    const isbn = MODULE('utils').checksumIsbn;
    // Generation du BL PDF et download
    var fk_livraison;

    //console.log(doc);

    Dict.extrafield({
        extrafieldName: 'BonLivraison'
    }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }

        fk_livraison = doc;
    });

    var model = "delivery.tex";

    if (doc.forSales == false)
        model = "delivery_supplier.tex";

    console.log(doc._type);
    if (doc._type == 'stockReturns')
        model = "stockreturn.tex";


    SocieteModel.findOne({
        _id: doc.supplier._id
    }, function(err, societe) {

        // Array of lines
        var tabLines = [];

        tabLines.push({
            keys: [{
                    key: "ref",
                    type: "string"
                },
                {
                    key: "description",
                    type: "area"
                },
                {
                    key: "qty_order",
                    type: "number",
                    precision: 0
                },
                {
                    key: "qty",
                    type: "number",
                    precision: 0
                }
            ]
        });

        for (var i = 0; i < doc.lines.length; i++) {
            //console.log(doc.orderRows[i]);

            //console.log(doc.lines[i]);
            let orderRow = _.findWhere(doc.orderRows, {
                orderRowId: doc.lines[i]._id
            })

            if (doc.lines[i].type != 'SUBTOTAL' && doc.lines[i].qty !== 0 && orderRow && orderRow.qty != null)
                tabLines.push({
                    ref: doc.lines[i].product.info.SKU.substring(0, 12),
                    description: "\\textbf{" + doc.lines[i].product.info.langs[0].name + "}" + (doc.lines[i].description ? "\\\\" + doc.lines[i].description : ""),
                    qty_order: doc.lines[i].qty,
                    qty: {
                        value: orderRow.qty,
                        unit: (doc.lines[i].product.unit ? " " + doc.lines[i].product.unit : "U")
                    }
                });

            /*if (doc.lines[i].product.id.pack && doc.lines[i].product.id.pack.length) {
             for (var j = 0; j < doc.lines[i].product.id.pack.length; j++) {
             tabLines.push({
             ref: "*" + doc.lines[i].product.id.pack[j].id.ref.substring(0, 10),
             description: "\\textbf{" + doc.lines[i].product.id.pack[j].id.label + "}" + (doc.lines[i].product.id.pack[j].id.description ? "\\\\" + doc.lines[i].product.id.pack[j].id.description : ""),
             qty_order: doc.lines[i].qty_order * doc.lines[i].product.id.pack[j].qty,
             qty: {value: doc.lines[i].qty * doc.lines[i].product.id.pack[j].qty, unit: (doc.lines[i].product.id.pack[j].id.unit ? " " + doc.lines[i].product.id.pack[j].id.unit : "U")},
             italic: true
             });
             }
             }
             tabLines.push({hline: 1});*/


            //tab_latex += " & \\specialcell[t]{\\\\" + "\\\\} & " +   + " & " + " & " +  "\\tabularnewline\n";
        }

        // Array of totals
        var tabTotal = [{
            keys: [{
                    key: "label",
                    type: "string"
                }, {
                    key: "total",
                    type: "number",
                    precision: 3
                },
                {
                    key: "unit",
                    type: "string"
                }
            ]
        }];

        //Total HT
        tabTotal.push({
            label: "Quantité totale : ",
            total: _.sum(doc.orderRows, function(line) {
                return line.qty;
            }),
            unit: "pièce(s)"
        });

        // Poids
        if (doc.weight)
            tabTotal.push({
                label: "Poids total : ",
                total: doc.weight,
                unit: "kg"
            });

        // 4 -> BL
        // 5 -> RT
        let code = 4;
        if (doc._type == 'stockReturns')
            code = 5;
        var barcode = code + "-" + moment(doc.datedl).format("YY") + "0-"; + doc.ref.split('-')[1].replace('_', '-');
        var split = doc.ref.replace('/', '-').split('-');
        if (split.length == 2) //BL1607-02020-32
            barcode += "00" + fixedWidthString(doc.ID, 6, {
                padding: '0',
                align: 'right'
            });
        else { // BL1607-120202
            barcode += fixedWidthString(doc.ID, 6, {
                padding: '0',
                align: 'right'
            });
            barcode += "-" + fixedWidthString(split[2], 2, {
                padding: '0',
                align: 'right'
            });
        }

        barcode += '-' + isbn(barcode);

        Latex.Template(model, doc.entity)
            .apply({
                "NUM": {
                    "type": "string",
                    "value": doc.ref
                },
                "BILL.NAME": {
                    "type": "string",
                    "value": doc.address.name || doc.supplier.fullName
                },
                "BILL.ADDRESS": {
                    "type": "area",
                    "value": doc.address.street
                },
                "BILL.ZIP": {
                    "type": "string",
                    "value": doc.address.zip
                },
                "BILL.TOWN": {
                    "type": "string",
                    "value": doc.address.city
                },
                "DESTINATAIRE.NAME": {
                    "type": "string",
                    "value": doc.shippingAddress.name
                },
                "DESTINATAIRE.ADDRESS": {
                    "type": "area",
                    "value": doc.shippingAddress.street
                },
                "DESTINATAIRE.ZIP": {
                    "type": "string",
                    "value": doc.shippingAddress.zip
                },
                "DESTINATAIRE.TOWN": {
                    "type": "string",
                    "value": doc.shippingAddress.city
                },
                "DESTINATAIRE.TVA": {
                    "type": "string",
                    "value": societe.companyInfo.idprof6
                },
                "CODECLIENT": {
                    "type": "string",
                    "value": societe.salesPurchases.code_client
                },
                //"TITLE": {"type": "string", "value": doc.title},
                "REFCLIENT": {
                    "type": "string",
                    "value": doc.ref_client
                },
                "DELIVERYMODE": {
                    "type": "string",
                    "value": doc.delivery_mode
                },
                "BARCODE": {
                    type: "string",
                    value: barcode
                },
                "DATEC": {
                    "type": "date",
                    "value": doc.datec,
                    "format": CONFIG('dateformatShort')
                },
                "DATEEXP": {
                    "type": "date",
                    "value": doc.datedl,
                    "format": CONFIG('dateformatShort')
                },
                "ORDER": {
                    "type": "string",
                    "value": (doc.order && doc.order.ref ? doc.order.ref : "-")
                },
                "NOTES": {
                    "type": "area",
                    "value": (doc.notes.length ? doc.notes[0].note : "")
                },
                "TABULAR": tabLines,
                "TOTALQTY": tabTotal
            })
            .on('error', callback)
            .finalize(function(tex) {
                //console.log('The document was converted.');
                callback(null, tex);
            });
    });
}

function createDelivery2(doc, callback) {
    var SocieteModel = MODEL('Customers').Schema;
    var BankModel = MODEL('bank').Schema;
    // Generation des BL chiffre PDF et download

    var discount = false;
    var cond_reglement_code = {};
    Dict.dict({
        dictName: "fk_payment_term",
        object: true
    }, function(err, docs) {
        cond_reglement_code = docs;
    });
    var mode_reglement_code = {};
    Dict.dict({
        dictName: "fk_paiement",
        object: true
    }, function(err, docs) {
        mode_reglement_code = docs;
    });

    var model = "PRICE";

    if (CONFIG('delivery.type') == "NOPRICE")
        model = "NOPRICE";
    else
        // check if discount
        for (var i = 0; i < doc.lines.length; i++) {
            if (doc.lines[i].discount > 0) {
                model = "DISCOUNT";
                break;
            }
        }

    SocieteModel.findOne({
        _id: doc.supplier.id
    }, function(err, societe) {
        BankModel.findOne({
            ref: societe.bank_reglement
        }, function(err, bank) {
            if (bank)
                var iban = bank.name_bank + "\n RIB : " + bank.code_bank + " " + bank.code_counter + " " + bank.account_number + " " + bank.rib + "\n IBAN : " + bank.iban + "\n BIC : " + bank.bic;

            // Array of lines
            var tabLines = [];

            switch (model) {
                case "DISCOUNT":
                    tabLines.push({
                        keys: [{
                                key: "ref",
                                type: "string"
                            },
                            {
                                key: "description",
                                type: "area"
                            },
                            {
                                key: "tva_tx",
                                type: "string"
                            },
                            {
                                key: "pu_ht",
                                type: "number",
                                precision: 3
                            },
                            {
                                key: "discount",
                                type: "string"
                            },
                            {
                                key: "qty",
                                type: "number",
                                precision: 3
                            },
                            {
                                key: "total_ht",
                                type: "euro"
                            }
                        ]
                    });
                    break;
                case "NOPRICE":
                    tabLines.push({
                        keys: [{
                                key: "ref",
                                type: "string"
                            },
                            {
                                key: "description",
                                type: "area"
                            },
                            //{key: "tva_tx", type: "string"},
                            //{key: "pu_ht", type: "number", precision: 3},
                            {
                                key: "qty",
                                type: "number",
                                precision: 3
                            },
                            //{key: "total_ht", type: "euro"}
                        ]
                    });
                    break;
                default: //PRICE
                    tabLines.push({
                        keys: [{
                                key: "ref",
                                type: "string"
                            },
                            {
                                key: "description",
                                type: "area"
                            },
                            {
                                key: "tva_tx",
                                type: "string"
                            },
                            {
                                key: "pu_ht",
                                type: "number",
                                precision: 3
                            },
                            {
                                key: "qty",
                                type: "number",
                                precision: 3
                            },
                            {
                                key: "total_ht",
                                type: "euro"
                            }
                        ]
                    });
            }

            for (var i = 0; i < doc.lines.length; i++) {
                switch (doc.lines[i].type) {
                    case 'SUBTOTAL':
                        tabLines.push({
                            ref: "",
                            description: "\\textbf{Sous-total}",
                            tva_tx: null,
                            pu_ht: "",
                            discount: "",
                            qty: "",
                            total_ht: doc.lines[i].total_ht
                        });
                        break;
                    case 'COMMENT':
                        tabLines.push({
                            ref: "",
                            description: "\\textbf{" + doc.lines[i].refProductSupplier + "}" + (doc.lines[i].description ? "\\\\" + doc.lines[i].description : ""),
                            tva_tx: null,
                            pu_ht: "",
                            discount: "",
                            qty: "",
                            total_ht: ""
                        });
                        break;
                    default:
                        tabLines.push({
                            ref: doc.lines[i].product.info.SKU.substring(0, 12),
                            description: "\\textbf{" + doc.lines[i].product.info.langs[0].name + "}" + (doc.lines[i].description ? "\\\\" + doc.lines[i].description : "") + (doc.lines[i].total_taxes.length > 1 ? "\\\\\\textit{" + doc.lines[i].total_taxes[1].taxeId.langs[0].name + " : " + doc.lines[i].product.taxes[1].value + " \\euro}" : ""),
                            tva_tx: (doc.lines[i].total_taxes.length ? doc.lines[i].total_taxes[0].taxeId.rate : null),
                            pu_ht: doc.lines[i].pu_ht,
                            discount: (doc.lines[i].discount ? (doc.lines[i].discount + " %") : ""),
                            qty: doc.lines[i].qty,
                            total_ht: doc.lines[i].total_ht
                        });
                }

                if (doc.lines[i].type == 'SUBTOTAL') {
                    tabLines[tabLines.length - 1].italic = true;
                    tabLines.push({
                        hline: 1
                    });
                }
                //tab_latex += " & \\specialcell[t]{\\\\" + "\\\\} & " +   + " & " + " & " +  "\\tabularnewline\n";
            }

            // Array of totals
            var tabTotal = [{
                keys: [{
                        key: "label",
                        type: "string"
                    },
                    {
                        key: "total",
                        type: "euro"
                    }
                ]
            }];

            // Frais de port 
            if (doc.shipping && doc.shipping.total_ht)
                tabTotal.push({
                    label: "Frais de port",
                    total: doc.shipping.total_ht
                });

            //Total HT
            tabTotal.push({
                label: "Total HT",
                total: doc.total_ht
            });
            for (var i = 0; i < doc.total_taxes.length; i++) {
                tabTotal.push({
                    label: "Total " + doc.total_taxes[i].taxeId.langs[0].label,
                    total: doc.total_taxes[i].value
                });
            }
            //Total TTC
            tabTotal.push({
                label: "Total TTC",
                total: doc.total_ttc
            });

            // Array of totals Qty
            var tabTotalQty = [{
                keys: [{
                        key: "label",
                        type: "string"
                    }, {
                        key: "total",
                        type: "number",
                        precision: 3
                    },
                    {
                        key: "unit",
                        type: "string"
                    }
                ]
            }];

            tabTotalQty.push({
                label: "Quantité totale : ",
                total: _.sum(doc.lines, function(line) {
                    return line.qty;
                }),
                unit: "pièce(s)"
            });

            // Poids
            if (doc.weight)
                tabTotalQty.push({
                    label: "Poids total : ",
                    total: doc.weight,
                    unit: "kg"
                });


            var reglement = "";
            switch (doc.mode_reglement_code) {
                case "VIR":
                    if (societe.bank_reglement) { // Bank specific for payment
                        reglement = "\n" + iban;
                    } else // Default IBAN
                        reglement = "\n --IBAN--";
                    break;
                case "CHQ":
                    reglement = "A l'ordre de --ENTITY--";
                    break;
            }

            /*tab_latex += "Total HT &" + latex.price(doc.total_ht) + "\\tabularnewline\n";
             for (var i = 0; i < doc.total_tva.length; i++) {
             tab_latex += "Total TVA " + doc.total_tva[i].tva_tx + "\\% &" + latex.price(doc.total_tva[i].total) + "\\tabularnewline\n";
             }
             tab_latex += "\\vhline\n";
             tab_latex += "Total TTC &" + latex.price(doc.total_ttc) + "\\tabularnewline\n";*/

            //Periode de facturation
            var period = "";
            if (doc.dateOf && doc.dateTo)
                period = "\\textit{P\\'eriode du " + moment(doc.dateOf).format(CONFIG('dateformatShort')) + " au " + moment(doc.dateTo).format(CONFIG('dateformatShort')) + "}\\\\";

            var model_latex = "delivery2.tex"; //PRICE

            if (model === "DISCOUNT")
                model_latex = "delivery2_discount.tex";
            else if (model === "NOPRICE")
                model_latex = "delivery.tex";

            Latex.Template(model_latex, doc.entity)
                .apply({
                    "NUM": {
                        "type": "string",
                        "value": doc.ref
                    },
                    "DESTINATAIRE.NAME": {
                        "type": "string",
                        "value": doc.shippingAddress.name
                    },
                    "DESTINATAIRE.ADDRESS": {
                        "type": "area",
                        "value": doc.shippingAddress.street
                    },
                    "DESTINATAIRE.ZIP": {
                        "type": "string",
                        "value": doc.shippingAddress.zip
                    },
                    "DESTINATAIRE.TOWN": {
                        "type": "string",
                        "value": doc.shippingAddress.city
                    },
                    "DESTINATAIRE.TVA": {
                        "type": "string",
                        "value": societe.companyInfo.idprof6
                    },
                    "CODECLIENT": {
                        "type": "string",
                        "value": societe.salesPurchases.code_client
                    },
                    //"TITLE": {"type": "string", "value": doc.title},
                    "REFCLIENT": {
                        "type": "string",
                        "value": doc.ref_client
                    },
                    "PERIOD": {
                        "type": "string",
                        "value": period
                    },
                    "DELIVERYMODE": {
                        "type": "string",
                        "value": doc.delivery_mode
                    },
                    "DATEEXP": {
                        "type": "date",
                        "value": doc.datedl,
                        "format": CONFIG('dateformatShort')
                    },
                    "DATEC": {
                        "type": "date",
                        "value": doc.datec,
                        "format": CONFIG('dateformatShort')
                    },
                    "REGLEMENT": {
                        "type": "string",
                        "value": cond_reglement_code.values[doc.cond_reglement_code].label
                    },
                    "PAID": {
                        "type": "string",
                        "value": mode_reglement_code.values[doc.mode_reglement_code].label
                    },
                    "ORDER": {
                        "type": "string",
                        "value": (doc.order && doc.order.ref ? doc.order.ref : "-")
                    },
                    "NOTES": {
                        "type": "string",
                        "value": (doc.notes.length ? doc.notes[0].note : "")
                    },
                    "BK": {
                        "type": "area",
                        "value": reglement
                    },
                    "TABULAR": tabLines,
                    //"TOTAL": tabTotal,
                    "TOTALQTY": tabTotalQty
                    //"APAYER": {
                    //    "type": "euro",
                    //    "value": doc.total_ttc || 0
                    //}
                })
                .on('error', callback)
                .finalize(function(tex) {
                    //console.log('The document was converted.');
                    callback(null, tex);
                });
        });
    });
}