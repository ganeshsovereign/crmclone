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
    moment = require('moment'),
    Iconv = require('iconv').Iconv;

var Dict = INCLUDE('dict');
var Latex = INCLUDE('latex');

exports.install = function() {

    var object = new Object();

    F.route('/erp/api/ordersfab', object.read, ['authorize']);
    F.route('/erp/api/ordersfab/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/ordersfab/pdf/{ordersfabId}', object.pdf, ['authorize']);

    F.route('/erp/api/ordersfab', object.create, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/ordersfab/{ordersfabId}', object.show, ['authorize']);
    F.route('/erp/api/ordersfab/{ordersfabId}', object.clone, ['post', 'json', 'authorize'], 512);
    F.route('/erp/api/ordersfab/{ordersfabId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/ordersfab/', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/ordersfab/{ordersfabId}', object.destroyList, ['delete', 'authorize']);
};

function Object() {}

Object.prototype = {
    show: function(id) {
        var self = this;

        if (self.query.forSales == "false")
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        DeliveryModel.getById(id, function(err, delivery) {
            if (err)
                return self.throw500(err);

            self.json(delivery);
        });
    },
    create: function() {
        var self = this;


        var DeliveryModel = MODEL('order').Schema.OrdersFab;

        delete self.body.status;

        var delivery = {};
        console.log(self.body);
        delivery = new DeliveryModel(self.body);

        delivery.editedBy = self.user._id;
        delivery.createdBy = self.user._id;

        if (!delivery.order)
            delivery.order = delivery._id;

        if (!delivery.entity)
            delivery.entity = self.user.entity;

        //console.log(delivery);
        delivery.save(function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    clone: function(id) {
        var self = this;
        var OrderRowsModel = MODEL('orderRows').Schema;

        if (self.body.forSales == false)
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

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

        if (self.body.forSales == false)
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        self.body.editedBy = self.user._id;

        if (self.body.Status == 'INSTOCK' && !self.body.status.isReceived) {
            self.body.status.isReceived = new Date();
            self.body.status.receivedById = self.user._id;
        }

        if (self.body.Status == "VALIDATED" && !self.body.status.isInventory) {
            isInventory = true;
            self.body.Status = "DRAFT";
        }


        var rows = self.body.lines;
        for (var i = 0; i < rows.length; i++)
            rows[i].sequence = i;

        if (!self.body.createdBy)
            self.body.createdBy = self.user._id;

        var rows = self.body.lines;
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
            self.body.weight = result.weight;

            DeliveryModel.findByIdAndUpdate(id, self.body, { new: true }, function(err, delivery) {
                if (err)
                    return self.throw500(err);

                //console.log(delivery);
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
                            if (doc.forSales == true)
                                F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: doc.order } });

                            //update inventory IN

                            if (doc.status.isInventory)
                                return wCb(null, doc);

                            if (!doc.status.isReceived)
                                return wCb(null, doc);

                            return DeliveryModel.findById(doc._id)
                                .populate('order', 'shippingMethod shippingExpenses')
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
                                            F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: result.order._id } });

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

                            if (!isInventory)
                                return wCb(null, doc);


                            return DeliveryModel.findById(doc._id)
                                .populate('order', 'shippingMethod shippingExpenses')
                                .exec(function(err, result) {
                                    if (err)
                                        return wCb(err);

                                    result = result.toObject();
                                    result.orderRows = _.filter(result.orderRows, function(elem) {
                                        return elem.qty && !elem.isDeleted;
                                    });

                                    return Availability.updateAvailableProducts({
                                        doc: result
                                    }, function(err, rows) {
                                        if (err)
                                            return wCb(err);

                                        result.orderRows = rows;

                                        return Availability.deliverProducts({
                                            uId: self.user._id,
                                            goodsOutNote: result
                                        }, function(err) {
                                            if (err)
                                                return wCb(err);

                                            if (result && result.order)
                                                F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: result.order._id } });

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

        if (self.body.forSales == false)
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
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
                                        goodsOutNotes: { goodsNoteId: goodsNote._id }
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

                            DeliveryModel.findByIdAndUpdate(goodsNote._id, { isremoved: true, Status: 'CANCELED', total_ht: 0, total_ttc: 0, total_tva: [], orderRows: [] }, function(err, result) {
                                if (err)
                                    return self.throw500(err);
                                console.log(result);

                                F.functions.BusMQ.publish('order:recalculateStatus', self.user._id, { order: { _id: goodsNote.order._id } });

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

        if (self.query.forSales == "false")
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.req.body.query);

        //console.log(self.query);

        var conditions = {
            Status: { $ne: "BILLED" },
            isremoved: { $ne: true },
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
            SocieteModel.populate(res, { path: "datatable.data.supplier" }, function(err, res) {

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
                    res.datatable.data[i].action = '<a href="#!/ordersfab/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    res.datatable.data[i].ID = '<a class="with-tooltip" href="#!/ordersfab/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-truck"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].datedl = (row.datedl ? moment(row.datedl).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].date_livraison = (row.date_livraison ? moment(row.date_livraison).format(CONFIG('dateformatShort')) : '');

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

        if (self.query.forSales == "false")
            var DeliveryModel = MODEL('order').Schema.GoodsInNote;
        else
            var DeliveryModel = MODEL('order').Schema.GoodsOutNote;

        DeliveryModel.getById(ref, function(err, doc) {
            createDelivery(doc, function(err, tex) {
                if (err)
                    return console.log(err);

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
        var DeliveryModel = MODEL('delivery').Schema;

        var tabTex = [];

        DeliveryModel.find({ Status: "SEND", _id: { $in: self.body.id } })
            .populate("order", "ref ref_client total_ht datec")
            .populate({
                path: "lines.product.id",
                select: "ref name label weight pack",
                populate: { path: 'pack.id', select: "ref name label unit" }
            })
            .exec(function(err, deliveries) {
                if (err)
                    return console.log(err);

                if (!deliveries.length)
                    return self.json({ error: "No deliveries" });

                async.each(deliveries, function(delivery, cb) {

                    createDelivery2(delivery, function(err, tex) {
                        if (err)
                            return cb(err);
                        //console.log(tex);

                        tabTex.push({ id: delivery.ref, tex: tex });
                        cb();
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
                            console.log('documents written');
                        });
                });
            });
    },
    validAll: function() {
        var self = this;

        if (!self.body.id)
            return self.json({});

        var DeliveryModel = MODEL('delivery').Schema;

        DeliveryModel.update({ Status: "DRAFT", _id: { $in: self.body.id } }, { $set: { Status: 'SEND', updatedAt: new Date } }, { upsert: false, multi: true },
            function(err, doc) {
                if (err)
                    return self.throw500(err);

                self.json({});

            });
    }
};