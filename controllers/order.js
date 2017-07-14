/*
 2014-2016 ToManage
 
 NOTICE OF LICENSE
 
 This source file is subject to the Open Software License (OSL 3.0)
 that is bundled with this package in the file LICENSE.txt.
 It is also available through the world-wide-web at this URL:
 http://opensource.org/licenses/osl-3.0.php
 If you did not receive a copy of the license and are unable to
 obtain it through the world-wide-web, please send an email
 to license@tomanage.fr so we can send you a copy immediately.
 
 DISCLAIMER
 
 Do not edit or add to this file if you wish to upgrade ToManage to newer
 versions in the future. If you wish to customize ToManage for your
 needs please refer to http://www.tomanage.fr for more information.
 
 @author    ToManage SAS <contact@tomanage.fr>
 @copyright 2014-2016 ToManage SAS
 @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 International Registered Trademark & Property of ToManage SAS
 */


"use strict";

var mongoose = require('mongoose'),
    _ = require('lodash'),
    async = require('async'),
    moment = require('moment');

var Dict = INCLUDE('dict');
var Latex = INCLUDE('latex');

exports.install = function() {

    var object = new Object();

    Dict.extrafield({
        extrafieldName: 'Commande'
    }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }

        object.fk_extrafields = doc;
    });

    F.route('/erp/api/order/lines/list', object.listLines, ['authorize']);
    F.route('/erp/api/order/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/order/dt_stockreturn', object.readDT_stockreturn, ['post', 'authorize']);
    F.route('/erp/api/order', object.all, ['authorize']);
    F.route('/erp/api/order', object.create, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/order/{orderId}', object.clone, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/order/{orderId}', object.show, ['authorize']);
    F.route('/erp/api/order/{orderId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/order/{orderId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/order/{orderId}/{field}', object.updateField, ['put', 'json', 'authorize']);
    F.route('/erp/api/order/file/{Id}', object.createFile, ['post', 'authorize']);
    F.route('/erp/api/order/file/{Id}/{fileName}', object.getFile, ['authorize']);
    F.route('/erp/api/order/file/{Id}/{fileName}', object.deleteFile, ['delete', 'authorize']);
    F.route('/erp/api/order/pdf/{orderId}', object.pdf, ['authorize']);
    F.route('/erp/api/order/download/{:id}', object.download);

    F.route('/erp/api/offer/pdf/{orderId}', object.pdf, ['authorize']);
};

function Object() {}

Object.prototype = {
    /*listLines: function() {
        var self = this;
        var OrderModel = MODEL('order').Schema;

        OrderModel.findOne({
            _id: self.query.id
        }, "lines", function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc.lines);
        });
    },*/
    /**
     * Create an order
     */
    create: function() {
        var self = this;
        if (self.query.quotation === 'true') {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }
        var order;

        if (self.query.forSales == "false")
            self.body.forSales = false;

        order = new OrderModel(self.body);

        order.createdBy = self.user._id;
        order.editedBy = self.user._id;

        if (!order.order)
            order.order = order._id;

        if (!order.entity)
            order.entity = self.user.entity;

        /*if (self.user.societe && self.user.societe.id) { // It's an external order
            return ContactModel.findOne({
                'societe.id': self.user.societe.id
            }, function(err, contact) {
                if (err)
                    console.log(err);

                if (!contact)
                    contact = new ContactModel();

                contact.entity = self.user.entity;
                contact.firstname = self.user.firstname;
                contact.lastname = self.user.lastname;
                contact.email = self.user.email;


                contact.societe.id = self.user.societe.id;
                contact.societe.name = self.user.societe.name;

                contact.name = contact.firstname + " " + contact.lastname;


                //console.log(contact);
                contact.save(function(err, doc) {
                    if (err)
                        console.log(err);

                    //console.log(doc);

                    order.contact.id = doc._id;
                    order.contact.name = doc.name;

                    order.supplier = self.user.societe.id;

                    order.save(function(err, doc) {
                        if (err)
                            return console.log(err);

                        self.json(doc);
                    });
                });
            });
        }*/

        //console.log(order);

        async.waterfall([
                function(wCb) {
                    var Model = MODEL('warehouse').Schema;
                    //Load default warehouse
                    if (order.warehouse)
                        return wCb();

                    Model.findOne({ main: true }, "_id", function(err, warehouse) {
                        if (err)
                            return wCb(err);

                        if (warehouse)
                            order.warehouse = warehouse._id;

                        wCb();
                    });

                },
                function(wCb) {
                    order.save(wCb);
                }
            ],
            function(err, doc) {
                if (err)
                    return self.throw500(err);

                self.json(doc);
            });
    },
    /**
     * Clone an order
     */
    clone: function(id) {
        var OrderRowsModel = MODEL('orderRows').Schema;
        var self = this;

        if (self.query.quotation === 'true') {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var rows = self.body.lines;

        OrderModel.findById(id, function(err, doc) {
            var order = doc.toObject();
            delete order._id;
            delete order.__v;
            delete order.ref;
            delete order.createdAt;
            delete order.updatedAt;
            delete order.history;
            delete order.orderRows;
            order.status = {};
            order.Status = "DRAFT";
            order.notes = [];
            order.latex = {};
            order.datec = new Date();
            order.date_livraison = new Date();
            order.deliveries = []; // remove link to delivery
            order.bills = []; // remove link to bill

            order = new OrderModel(order);

            order.order = order._id;
            order.createdBy = self.user._id;
            order.editedBy = self.user._id;

            if (!order.entity)
                order.entity = self.user.entity;

            //console.log(order);

            order.save(function(err, order) {
                if (err)
                    return console.log(err);

                async.each(rows, function(orderRow, aCb) {
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

                        F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: order._id } });

                        self.json(order);
                    });
            });
        });
    },
    /**
     * Update an order
     */
    update: function(id) {
        var self = this;
        var OrderRowsModel = MODEL('orderRows').Schema;
        var Availability = MODEL('productsAvailability').Schema;
        //console.log("update");

        if (self.query.quotation === 'true') {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var rows = self.body.lines;
        for (var i = 0; i < rows.length; i++)
            rows[i].sequence = i;




        //delete self.body.rows;

        self.body.editedBy = self.user._id;

        if (!self.body.createdBy)
            self.body.createdBy = self.user._id;

        //console.log(self.body);

        async.waterfall([
            function(wCb) {
                MODULE('utils').sumTotal(rows, self.body.shipping, self.body.discount, self.body.supplier, wCb);
            },
            function(result, wCb) {
                self.body.total_ht = result.total_ht;
                self.body.total_taxes = result.total_taxes;
                self.body.total_ttc = result.total_ttc;
                self.body.weight = result.weight;

                //return console.log(self.body);

                OrderModel.findByIdAndUpdate(id, self.body, { new: true }, wCb);
            },
            function(order, wCb) {
                //order = _.extend(order, self.body);
                //console.log(order.history);
                //console.log(rows);
                //update all rows
                var newRows = [];
                async.each(rows, function(orderRow, aCb) {
                        orderRow.order = order._id;

                        orderRow.warehouse = order.warehouse;

                        if (orderRow.isDeleted && !orderRow._id)
                            return aCb();

                        if (orderRow._id)
                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, { new: true }, function(err, doc) {
                                if (err)
                                    return aCb(err);
                                newRows.push(doc);
                                aCb();
                            });

                        var orderRow = new OrderRowsModel(orderRow);
                        orderRow.save(function(err, doc) {
                            if (err)
                                return aCb(err);
                            newRows.push(doc);
                            aCb();
                        });
                    },
                    function(err) {
                        if (err)
                            return wCb(err);
                        wCb(null, order, newRows);
                    });
            },
            function(order, newRows, wCb) {

                //Allocated product order
                if (order.Status !== "TOVALIDATE")
                    return wCb(null, order);

                async.eachSeries(newRows, function(elem, eachCb) {

                    var lastSum = elem.qty;
                    var isFilled;

                    //console.log(elem);

                    Availability.find({
                        warehouse: elem.warehouse,
                        product: elem.product
                    }, function(err, avalabilities) {
                        if (err)
                            return eachCb(err);

                        if (avalabilities.length) {
                            async.each(avalabilities, function(availability, cb) {
                                var allocated = 0;
                                var resultOnHand;
                                var existedRow = {
                                    qty: 0
                                };

                                var allOnHand;

                                availability.orderRows.forEach(function(orderRow) {
                                    if (orderRow.orderRowId.toString() === elem._id.toString())
                                        existedRow = orderRow;
                                    else
                                        allocated += orderRow.qty;
                                });

                                if (isFilled && elem.qty)
                                    return cb();


                                allOnHand = availability.onHand + existedRow.qty;

                                if (!allOnHand)
                                    return cb();


                                resultOnHand = allOnHand - lastSum;

                                if (resultOnHand < 0) {
                                    lastSum = Math.abs(resultOnHand);
                                    resultOnHand = 0;
                                } else
                                    isFilled = true;


                                if (existedRow.orderRowId) {

                                    if (!elem.qty) {
                                        Availability.update({ _id: availability._id }, {
                                            $inc: {
                                                onHand: existedRow.qty
                                            },
                                            $pull: {
                                                orderRows: { orderRowId: existedRow.orderRowId }
                                            }
                                        }, function(err) {
                                            if (err)
                                                return cb(err);

                                            cb();
                                        });
                                    } else {
                                        Availability.update({
                                            _id: availability._id,
                                            'orderRows.orderRowId': existedRow.orderRowId
                                        }, {
                                            'orderRows.$.qty': resultOnHand ? lastSum : allOnHand,
                                            onHand: resultOnHand
                                        }, function(err) {
                                            if (err)
                                                return cb(err);

                                            cb();
                                        });
                                    }

                                } else if (elem.qty) {
                                    Availability.findByIdAndUpdate(availability._id, {
                                        $addToSet: {
                                            orderRows: {
                                                orderRowId: elem._id,
                                                qty: resultOnHand ? lastSum : allOnHand
                                            }
                                        },
                                        onHand: resultOnHand
                                    }, function(err) {
                                        if (err)
                                            return cb(err);

                                        cb();
                                    });
                                } else {
                                    cb();
                                }

                                setTimeout2('productInventory:' + availability.product.toString(), function() {
                                    F.functions.BusMQ.publish('inventory:update', null, { product: { _id: availability.product } });
                                }, 5000);


                            }, function(err) {
                                if (err)
                                    return eachCb(err);

                                eachCb();
                            });
                        } else
                            eachCb();

                    });

                }, function(err) {
                    if (err)
                        return wCb(err);
                    order.Status = "VALIDATED";
                    wCb(null, order);
                });
            }
        ], function(err, order) {
            if (err) {
                console.log(err);
                OrderModel.update({ _id: id }, { $set: { Status: 'DRAFT' } }, function(err, doc) {});
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }

            order.save(function(err, doc) {
                if (err) {
                    console.log(err);
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });
                }

                if (rows.length)
                    F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: doc._id } });

                //console.log(doc);
                doc = doc.toObject();
                doc.successNotify = {
                    title: "Success",
                    message: "Commande enregistrée"
                };
                self.json(doc);
            });
        });
    },
    /**
     * Delete an order
     */
    destroy: function(id) {
        var self = this;

        if (self.query.quotation === 'true') {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var OrderRowsModel = MODEL('orderRows').Schema;

        OrderModel.update({
            _id: id
        }, { $set: { isremoved: true, Status: 'CANCELED', total_ht: 0, total_ttc: 0, total_tva: [] } }, function(err) {
            if (err)
                return self.throw500(err);

            OrderRowsModel.update({ order: id }, { $set: { isDeleted: true } }, function(err) {
                if (err)
                    return self.throw500(err);
                self.json({});
            });
        });
    },
    readDT: function() {
        var self = this;

        var link = 'order';

        if (self.query.quotation === 'true') {
            var link = 'offer';
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.body.query);

        var conditions = {
            // Status: { $ne: "CLOSED" },
            isremoved: { $ne: true }
            //  forSales: true
        };

        //console.log(self.query);

        if (!query.search.value) {
            if (self.query.status_id && self.query.status_id !== 'null')
                conditions.Status = self.query.status_id;
        } else
            delete conditions.Status;

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        var options = {
            conditions: conditions,
            select: "supplier ref forSales status"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                    dictName: "fk_order_status",
                    object: true
                }, cb);*/
                cb(null, MODEL('order').Status);
            },
            datatable: function(cb) {
                OrderModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            SocieteModel.populate(res, { path: "datatable.data.supplier" }, function(err, res) {

                for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                    var row = res.datatable.data[i];

                    // Add checkbox
                    res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                    // Add id
                    res.datatable.data[i].DT_RowId = row._id.toString();

                    // Add color line 
                    /* if (res.datatable.data[i].Status === 'VALIDATED')
                        res.datatable.data[i].DT_RowClass = "bg-yellow";*/

                    if (row.supplier && row.supplier._id)
                        res.datatable.data[i].supplier = '<a class="with-tooltip" href="#!/societe/' + row.supplier._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.supplier.fullName + '"><span class="fa fa-institution"></span> ' + row.supplier.fullName + '</a>';
                    else {
                        if (!row.supplier)
                            res.datatable.data[i].supplier = {};
                        res.datatable.data[i].supplier = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                    }

                    // Action
                    //res.datatable.data[i].action = '<a href="#!/order/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    if (row.forSales)
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/' + link + '/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-shopping-cart"></span> ' + row.ref + '</a>';
                    else
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/' + link + 'supplier/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-shopping-cart"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].date_livraison = (row.date_livraison ? moment(row.date_livraison).format(CONFIG('dateformatShort')) : '');
                    // Convert Status
                    res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                    if (row.status && link == 'order') {
                        res.datatable.data[i].Status += '<span class="pull-right">';
                        res.datatable.data[i].Status += '<span class="fa large fa-check-circle ' + (row.status.allocateStatus == 'NOR' ? 'font-grey' : '') + (row.status.allocateStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.allocateStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.allocateStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '<span class="fa large fa-inbox ' + (row.status.fulfillStatus == 'NOR' ? 'font-grey' : '') + (row.status.fulfillStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.fulfillStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.fulfillStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '<span class="fa large fa-truck ' + (row.status.shippingStatus == 'NOR' ? 'font-grey' : '') + (row.status.shippingStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.shippingStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.shippingStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '</span>';
                    }
                }

                //console.log(res.datatable);

                self.json(res.datatable);
            });
        });
    },

    readDT_stockreturn: function() {
        var self = this;

        var link = 'order';

        if (self.query.quotation === 'true') {
            var link = 'offer';
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.body.query);

        var conditions = {
            // Status: { $ne: "CLOSED" },
            isremoved: { $ne: true }
            //  forSales: true
        };

        //console.log(self.query);

        if (!query.search.value) {
            if (self.query.status_id && self.query.status_id !== 'null')
                conditions.Status = self.query.status_id;
        } else
            delete conditions.Status;

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        var options = {
            conditions: conditions,
            select: "supplier ref forSales status"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                    dictName: "fk_order_status",
                    object: true
                }, cb);*/
                cb(null, MODEL('order').Status);
            },
            datatable: function(cb) {
                OrderModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            SocieteModel.populate(res, { path: "datatable.data.supplier" }, function(err, res) {

                for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                    var row = res.datatable.data[i];


                    // Add id
                    res.datatable.data[i].DT_RowId = row._id.toString();

                    // Add color line 
                    /* if (res.datatable.data[i].Status === 'VALIDATED')
                        res.datatable.data[i].DT_RowClass = "bg-yellow";*/

                    if (row.supplier && row.supplier._id)
                        res.datatable.data[i].supplier = '<a class="with-tooltip" href="#!/societe/' + row.supplier._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.supplier.fullName + '"><span class="fa fa-institution"></span> ' + row.supplier.fullName + '</a>';
                    else {
                        if (!row.supplier)
                            res.datatable.data[i].supplier = {};
                        res.datatable.data[i].supplier = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                    }

                    // Action
                    //res.datatable.data[i].action = '<a href="#!/order/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    if (row.forSales)
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/' + link + '/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-shopping-cart"></span> ' + row.ref + '</a>';
                    else
                        res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/' + link + 'supplier/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-shopping-cart"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].date_livraison = (row.date_livraison ? moment(row.date_livraison).format(CONFIG('dateformatShort')) : '');
                    // Convert Status
                    res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                    if (row.status && link == 'order') {
                        res.datatable.data[i].Status += '<span class="pull-right">';
                        res.datatable.data[i].Status += '<span class="fa large fa-check-circle ' + (row.status.allocateStatus == 'NOR' ? 'font-grey' : '') + (row.status.allocateStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.allocateStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.allocateStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '<span class="fa large fa-inbox ' + (row.status.fulfillStatus == 'NOR' ? 'font-grey' : '') + (row.status.fulfillStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.fulfillStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.fulfillStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '<span class="fa large fa-truck ' + (row.status.shippingStatus == 'NOR' ? 'font-grey' : '') + (row.status.shippingStatus == 'ALL' ? 'font-green-jungle' : '') + (row.status.shippingStatus == 'NOA' ? 'font-yellow-lemon' : '') + (row.status.shippingStatus == 'NOT' ? 'font-red' : '') + '"></span>';
                        res.datatable.data[i].Status += '</span>';
                    }
                }

                //console.log(res.datatable);

                self.json(res.datatable);
            });
        });
    },
    /**
     * Show an order
     */
    show: function(id) {
        var self = this;

        var objectId = MODULE('utils').ObjectId;

        var Prepayments = MODEL('payment').Schema.prepayment;
        var OrderRows = MODEL('orderRows').Schema;
        var Invoice = MODEL('bill').Schema;
        var departmentSearcher;
        var contentIdsSearcher;
        var orderRowsSearcher;
        var contentSearcher;
        var prepaymentsSearcher;
        var invoiceSearcher;
        var stockReturnsSearcher;
        var waterfallTasks;

        if (id.length < 24)
            return self.throw400();

        if (self.query.quotation === 'true') {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.QuotationSupplier;
            else
                var OrderModel = MODEL('order').Schema.QuotationCustomer;
        } else {
            if (self.query.forSales == "false")
                var OrderModel = MODEL('order').Schema.OrderSupplier;
            else
                var OrderModel = MODEL('order').Schema.OrderCustomer;
        }

        var ObjectId = MODULE('utils').ObjectId;

        /*departmentSearcher = function(waterfallCallback) {
            MODEL('Department').Schema.aggregate({
                    $match: {
                        users: objectId(self.user._id)
                    }
                }, {
                    $project: {
                        _id: 1
                    }
                },

                waterfallCallback);
        };

        contentIdsSearcher = function(deps, waterfallCallback) {
            var everyOne = rewriteAccess.everyOne();
            var owner = rewriteAccess.owner(req.session.uId);
            var group = rewriteAccess.group(req.session.uId, deps);
            var whoCanRw = [everyOne, owner, group];
            var matchQuery = {
                $or: whoCanRw
            };

            var Model = models.get(req.session.lastDb, 'Order', OrderSchema);

            Model.aggregate({
                $match: matchQuery
            }, {
                $project: {
                    _id: 1
                }
            }, waterfallCallback);
        };

        contentSearcher = function(quotationsIds, waterfallCallback) {
            var query;

            query = OrderModel.findById(id);

            query
                .populate('supplier', '_id name fullName address')
                .populate('destination')
                .populate('currency._id')
                .populate('incoterm')
                .populate('priceList', 'name')
                .populate('costList', 'name')
                .populate('warehouse', 'name')
                .populate('salesPerson', 'name')
                .populate('invoiceControl')
                .populate('paymentTerm')
                .populate('paymentMethod', '_id name account bank address swiftCode owner')
                .populate('editedBy.user', '_id login')
                .populate('deliverTo', '_id, name')
                .populate('project', '_id name')
                .populate('shippingMethod', '_id name')
                .populate('workflow', '_id name status');

            query.exec(waterfallCallback);
        };

        orderRowsSearcher = function(order, waterfallCallback) {

            OrderRows.find({ order: order._id })
                .populate('product', 'cost name sku info')
                .populate('debitAccount', 'name')
                .populate('creditAccount', 'name')
                .populate('taxes.taxCode', 'fullName rate')
                .populate('warehouse', 'name')
                .sort('sequence')
                .exec(function(err, docs) {
                    if (err)
                        return waterfallCallback(err);

                    //order = order.toJSON();

                    OrderRows.getAvailableForRows(docs, order.forSales, function(err, docs, goodsNotes) {
                        if (err)
                            return waterfallCallback(err);

                        order.products = docs;
                        order.account = docs && docs.length ? docs[0].debitAccount : {};

                        if (!order.forSales)
                            order.account = docs && docs.length ? docs[0].creditAccount : {};


                        order.goodsNotes = goodsNotes;

                        waterfallCallback(null, order);
                    });

                });
        };

        prepaymentsSearcher = function(order, waterfallCallback) {
            Prepayments.aggregate([{
                $match: {
                    order: objectId(id)
                }
            }, {
                $project: {
                    paidAmount: 1,
                    currency: 1,
                    date: 1,
                    name: 1,
                    refund: 1
                }
            }, {
                $project: {
                    paidAmount: { $divide: ['$paidAmount', '$currency.rate'] },
                    date: 1,
                    name: 1,
                    refund: 1
                }
            }, {
                $project: {
                    paidAmount: { $cond: [{ $eq: ['$refund', true] }, { $multiply: ['$paidAmount', -1] }, '$paidAmount'] },
                    date: 1,
                    name: 1,
                    refund: 1
                }
            }, {
                $group: {
                    _id: null,
                    sum: { $sum: '$paidAmount' },
                    names: { $push: '$name' },
                    date: { $min: '$date' }
                }
            }], function(err, result) {
                if (err)
                    return waterfallCallback(err);

                order.prepayment = result && result.length ? result[0] : {};

                waterfallCallback(null, order);
            });
        };

        invoiceSearcher = function(order, waterfallCallback) {
            Invoice.aggregate([{
                $match: {
                    sourceDocument: objectId(id)
                }
            }, {
                $project: {
                    name: 1
                }
            }], function(err, result) {
                if (err)
                    return waterfallCallback(err);

                order.invoice = result && result.length ? result[0] : {};
                waterfallCallback(null, order);
            });
        };

        stockReturnsSearcher = function(order, waterfallCallback) {
            var StockReturnsModel = MODEL('order').Schema.stockReturns;

            StockReturnsModel.aggregate([{
                $match: { order: objectId(order._id) }
            }, {
                $unwind: {
                    path: '$journalEntrySources',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: null,
                    date: { $max: '$releaseDate' },
                    names: { $addToSet: '$name' },
                    journalEntrySources: { $addToSet: '$journalEntrySources' }
                }
            }], function(err, docs) {
                if (err)
                    return waterfallCallback(err);


                docs = docs && docs.length ? result[0] : {};

                order.stockReturns = (docs || []);

                waterfallCallback(null, order);
            });
        };

        waterfallTasks = [departmentSearcher, /*contentIdsSearcher,*/
        /*contentSearcher, orderRowsSearcher, prepaymentsSearcher, invoiceSearcher, stockReturnsSearcher];

               async.waterfall(waterfallTasks, function(err, result) {
                   //console.log(result);

                   if (err)
                       return self.throw500(err);

                   //getHistory(req, result, function(err, order) {
                   //    if (err)
                   //        return self.throw500(err);

                   //self.json(result);
                   //});
               });*/

        async.parallel({
                order: function(pCb) {
                    OrderModel.getById(id, pCb);
                },
                deliveries: function(pCb) {
                    OrderModel.aggregate([{
                        $match: { _id: ObjectId(id) }
                    }, {
                        $project: {
                            _id: 1,
                            ref: 1,
                            lines: 1
                        }
                    }, {
                        $unwind: '$lines'
                    }, {
                        $group: {
                            _id: "$lines.product",
                            orderQty: { $sum: "$lines.qty" },
                            order: { $first: "$_id" },
                            refProductSupplier: { $addToSet: "$lines.refProductSupplier" },
                            description: { $first: "$lines.description" }
                        }
                    }, {
                        $lookup: {
                            from: 'Delivery',
                            localField: 'order',
                            foreignField: 'order',
                            as: 'deliveries'
                        }
                    }, {
                        $project: {
                            _id: 1,
                            orderQty: 1,
                            order: 1,
                            "deliveries": {
                                "$filter": {
                                    "input": "$deliveries",
                                    "as": "delivery",
                                    "cond": { "$ne": ["$$delivery.isremoved", true] }
                                }
                            },
                            refProductSupplier: 1,
                            description: 1
                        }
                    }, {
                        $unwind: {
                            path: '$deliveries',
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                        $project: {
                            _id: 1,
                            orderQty: 1,
                            order: 1,
                            'deliveries.ref': 1,
                            'deliveries._id': 1,
                            'deliveries.date_livraison': 1,
                            'deliveries.lines': {
                                $filter: {
                                    input: "$deliveries.lines",
                                    as: "line",
                                    cond: { $eq: ["$$line.product", "$_id"] }
                                }
                            },
                            refProductSupplier: 1,
                            description: 1
                        }
                    }, {
                        $unwind: {
                            path: '$deliveries.lines',
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                        $group: {
                            _id: "$_id",
                            orderQty: { $first: "$orderQty" },
                            deliveryQty: { $sum: "$deliveries.lines.qty" },
                            deliveries: { $addToSet: { _id: "$deliveries._id", ref: "$deliveries.ref", qty: "$deliveries.lines.qty", date_livraison: "$deliveries.date_livraison" } },
                            refProductSupplier: { $first: "$refProductSupplier" },
                            description: { $first: "$description" }
                        }
                    }, {
                        $lookup: {
                            from: 'Product',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'product'
                        }
                    }, {
                        $unwind: '$product'
                    }, {
                        $project: {
                            _id: 1,
                            deliveryQty: 1,
                            orderQty: 1,
                            deliveries: 1,
                            'product._id': 1,
                            'product.info.SKU': 1,
                            'product.weight': 1,
                            refProductSupplier: 1,
                            description: 1
                        }
                    }, {
                        $sort: {
                            'product.info.SKU': 1
                        }
                    }], pCb);
                }
            },
            function(err, result) {
                if (err)
                    return self.throw500(err);

                //result.order = result.order.toObject();
                result.order.deliveries = result.deliveries;

                self.json(result.order);
            });
    },
    /**
     * Add a file in an order
     */
    createFile: function(req, res) {
        var id = req.params.Id;
        //console.log(id);
        //console.log(req.body);

        if (req.files && id) {
            console.log("Add : " + req.files.file.originalFilename);

            /* Add dossier information in filename */
            if (req.body.idx)
                req.files.file.originalFilename = req.body.idx + "_" + req.files.file.originalFilename;

            gridfs.addFile(CommandeModel, id, req.files.file, function(err, result) {
                //console.log(result);
                if (err)
                    res.send(500, err);
                else
                    res.send(200, result);
            });
        } else
            res.send(500, "Error in request file");
    },
    /**
     * Get a file form an order
     */
    getFile: function(req, res) {
        var id = req.params.Id;
        if (id && req.params.fileName) {

            gridfs.getFile(CommandeModel, id, req.params.fileName, function(err, store) {
                if (err)
                    return res.send(500, err);
                if (req.query.download)
                    res.attachment(store.filename); // for downloading 

                res.type(store.contentType);
                store.stream(true).pipe(res);
            });
        } else {
            res.send(500, "Error in request file");
        }

    },
    /**
     * Delete a file in an order
     */
    deleteFile: function(req, res) {
        //console.log(req.body);
        var id = req.params.Id;
        //console.log(id);

        if (req.params.fileName && id) {
            gridfs.delFile(CommandeModel, id, req.params.fileName, function(err, result) {
                //console.log(result);
                if (err)
                    res.send(500, err);
                else
                    res.send(200, result);
            });
        } else
            res.send(500, "File not found");
    },
    pdf: function(ref, self) {
        // Generation de la facture PDF et download
        var SocieteModel = MODEL('Customers').Schema;
        var BankModel = MODEL('bank').Schema;
        var OrderModel = MODEL('order').Schema.Order;

        if (!self)
            self = this;

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



        OrderModel.getById(ref, function(err, doc) {

            var title = "";

            var model = 'order'; //Latex model

            if (self.query.proforma)
                title = "Facture pro forma";
            else
                switch (doc._type) {
                    case 'orderCustomer':
                        title = 'Commande';
                        model = "order";
                        break;
                    case 'orderSupplier':
                        title = 'Commande fournisseur';
                        model = "order_supplier";
                        break;
                    case 'quotationCustomer':
                        title = 'Devis';
                        model = "offer";
                        break;
                    case 'quotationSupplier':
                        title = 'Demande d\'achat';
                        model = "offer_supplier";
                        break;
                }



            if (doc.Status == "DRAFT") {
                return self.plain("Impossible de générer le PDF, le document n'est pas validée");
            }


            // check if discount
            for (var i = 0; i < doc.lines.length; i++) {
                if (doc.lines[i].discount > 0) {
                    model += "_discount";
                    discount = true;
                    break;
                }
            }

            SocieteModel.findOne({ _id: doc.supplier._id }, function(err, societe) {
                BankModel.findOne({ ref: doc.bank_reglement }, function(err, bank) {
                    if (bank)
                        var iban = bank.name_bank + "\n RIB : " + bank.code_bank + " " + bank.code_counter + " " + bank.account_number + " " + bank.rib + "\n IBAN : " + bank.iban + "\n BIC : " + bank.bic;

                    // Array of lines
                    var tabLines = [];

                    if (discount)
                        tabLines.push({
                            keys: [{
                                key: "ref",
                                type: "string"
                            }, {
                                key: "description",
                                type: "area"
                            }, {
                                key: "tva_tx",
                                type: "string"
                            }, {
                                key: "pu_ht",
                                type: "number",
                                precision: 3
                            }, {
                                key: "discount",
                                type: "string"
                            }, {
                                key: "qty",
                                type: "number",
                                precision: 3
                            }, {
                                key: "total_ht",
                                type: "euro"
                            }]
                        });
                    else
                        tabLines.push({
                            keys: [{
                                key: "ref",
                                type: "string"
                            }, {
                                key: "description",
                                type: "area"
                            }, {
                                key: "tva_tx",
                                type: "string"
                            }, {
                                key: "pu_ht",
                                type: "number",
                                precision: 3
                            }, {
                                key: "qty",
                                type: "number",
                                precision: 3
                            }, {
                                key: "total_ht",
                                type: "euro"
                            }]
                        });

                    for (var i = 0; i < doc.lines.length; i++) {
                        if (doc.lines[i].type == 'SUBTOTAL')
                            tabLines.push({
                                ref: "",
                                description: "\\textbf{Sous-total}",
                                tva_tx: null,
                                pu_ht: "",
                                discount: "",
                                qty: "",
                                total_ht: doc.lines[i].total_ht
                            });
                        else
                            tabLines.push({
                                ref: doc.lines[i].product.info.SKU.substring(0, 12),
                                description: "\\textbf{" + doc.lines[i].product.info.langs[0].name + "}" + (doc.lines[i].description ? "\\\\" + doc.lines[i].description : ""),
                                tva_tx: doc.lines[i].total_taxes[0].taxeId.rate,
                                pu_ht: doc.lines[i].pu_ht,
                                discount: (doc.lines[i].discount ? (doc.lines[i].discount + " %") : ""),
                                qty: doc.lines[i].qty,
                                total_ht: doc.lines[i].total_ht
                            });

                        if (doc.lines[i].type == 'SUBTOTAL') {
                            tabLines[tabLines.length - 1].italic = true;
                            tabLines.push({ hline: 1 });
                        }

                        //tab_latex += " & \\specialcell[t]{\\\\" + "\\\\} & " +   + " & " + " & " +  "\\tabularnewline\n";
                    }

                    // Array of totals
                    var tabTotal = [{
                        keys: [{
                            key: "label",
                            type: "string"
                        }, {
                            key: "total",
                            type: "euro"
                        }]
                    }];

                    // Frais de port 
                    if (doc.shipping && doc.shipping.total_ht)
                        tabTotal.push({
                            label: "Frais de port",
                            total: doc.shipping.total_ht
                        });

                    // Remise globale
                    if (doc.discount && doc.discount.discount && doc.discount.discount.percent)
                        tabTotal.push({
                            italic: true,
                            label: "Remise globale " + doc.discount.discount.percent + ' %',
                            total: doc.discount.discount.value * -1
                        });

                    // Escompte
                    if (doc.discount && doc.discount.escompte && doc.discount.escompte.percent)
                        tabTotal.push({
                            italic: true,
                            label: "Escompte " + doc.discount.escompte.percent + ' %',
                            total: doc.discount.escompte.value * -1
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

                    var reglement = "";
                    switch (doc.mode_reglement_code) {
                        case "VIR":
                            if (doc.bank_reglement) { // Bank specific for payment
                                reglement = "\n" + iban;
                            } else // Default IBAN
                                reglement = "\n --IBAN--";
                            break;
                        case "CHQ":
                            reglement = "A l'ordre de --ENTITY--";
                            break;
                    }

                    //Periode de facturation
                    var period = "";
                    if (doc.dateOf && doc.dateTo)
                        period = "\\textit{P\\'eriode du " + moment(doc.dateOf).format(CONFIG('dateformatShort')) + " au " + moment(doc.dateTo).format(CONFIG('dateformatShort')) + "}\\\\";


                    self.res.setHeader('Content-type', 'application/pdf');
                    Latex.Template(model + ".tex", doc.entity)
                        .apply({
                            "NUM": {
                                "type": "string",
                                "value": doc.ref
                            },
                            "DESTINATAIRE.NAME": {
                                "type": "string",
                                "value": doc.supplier.fullName
                            },
                            "DESTINATAIRE.ADDRESS": {
                                "type": "area",
                                "value": doc.address.street
                            },
                            "DESTINATAIRE.ZIP": {
                                "type": "string",
                                "value": doc.address.zip
                            },
                            "DESTINATAIRE.TOWN": {
                                "type": "string",
                                "value": doc.address.city
                            },
                            "DESTINATAIRE.TVA": {
                                "type": "string",
                                "value": societe.companyInfo.idprof6
                            },
                            "CODECLIENT": {
                                "type": "string",
                                "value": societe.salesPurchases.code_client
                            },
                            "TITLE": { "type": "string", "value": title },
                            "REFCLIENT": {
                                "type": "string",
                                "value": doc.ref_client
                            },
                            "DELIVERYMODE": {
                                "type": "string",
                                "value": doc.delivery_mode
                            },
                            "PERIOD": {
                                "type": "string",
                                "value": period
                            },
                            "DATEC": {
                                "type": "date",
                                "value": doc.datec,
                                "format": CONFIG('dateformatShort')
                            },
                            "DATEEXP": {
                                "type": "date",
                                "value": doc.date_livraison,
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
                            "NOTES": {
                                "type": "area",
                                "value": (doc.notes.length ? doc.notes[0].note : ""),
                            },
                            "BK": {
                                "type": "area",
                                "value": reglement
                            },
                            "TABULAR": tabLines,
                            "TOTAL": tabTotal,
                            "APAYER": {
                                "type": "euro",
                                "value": doc.total_ttc || 0
                            }
                        })
                        .on('error', function(err) {
                            console.log(err);
                            self.res.send(500, err);
                        })
                        .finalize(function(tex) {
                            //console.log('The document was converted.');
                        })
                        .compile()
                        .pipe(self.res)
                        .on('close', function() {
                            console.log('document written');
                        });
                });
            });
        });
    },
    download: function(id) {
        var self = this;
        var OrderModel = MODEL('order').Schema;

        var object = new Object();

        OrderModel.findOne({ _id: id }, function(err, order) {
            if (err)
                return self.throw500(err);

            if (!order)
                return self.view404('Order id not found');

            //var date = new Date();
            //order.updatedAt.setDate(order.updatedAt.getDate() + 15); // date + 15j, seulement telechargement pdt 15j

            //if (order.updatedAt < date)
            //    return self.view404('Order expired');

            object.pdf(id, self);

            order.history.push({
                date: new Date(),
                mode: 'email',
                msg: 'email pdf telecharge',
                Status: 'notify'
            });

            order.save();

        });
    }
};