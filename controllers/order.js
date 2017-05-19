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
    F.route('/erp/api/order', object.all, ['authorize']);
    F.route('/erp/api/order', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/order/{orderId}', function(id) {
        /*if (this.query.delivery)
         object.createDelivery(this);*/
        if (this.query.clone)
            object.clone(id, this);
    }, ['post', 'json', 'authorize']);
    F.route('/erp/api/order/{orderId}', object.show, ['authorize']);
    F.route('/erp/api/order/{orderId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/order/{orderId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/order/{orderId}/{field}', object.updateField, ['put', 'json', 'authorize']);
    F.route('/erp/api/order/file/{Id}', object.createFile, ['post', 'authorize']);
    F.route('/erp/api/order/file/{Id}/{fileName}', object.getFile, ['authorize']);
    F.route('/erp/api/order/file/{Id}/{fileName}', object.deleteFile, ['delete', 'authorize']);
    F.route('/erp/api/order/pdf/{orderId}', object.pdf, ['authorize']);
    F.route('/erp/api/order/download/{:id}', object.download);
};

function Object() {}

// Read an order
function Order(id, cb) {
    var OrderModel = MODEL('order').Schema;

    var self = this;

    //TODO Check ACL here
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var query = {};

    if (checkForHexRegExp.test(id))
        query = {
            _id: id
        };
    else
        query = {
            ref: id
        };

    //console.log(query);

    OrderModel.findOne(query, "-latex")
        .populate("contacts", "name phone email")
        .populate({
            path: "supplier",
            select: "name salesPurchases",
            populate: { path: "salesPurchases.priceList" }
        })
        .populate({
            path: "lines.product",
            select: "taxes info weight units",
            populate: { path: "taxes.taxeId" }
        })
        .populate({
            path: "total_taxes.taxeId"
        })
        .populate("createdBy", "username")
        .populate("editedBy", "username")
        .exec(cb);
}

Object.prototype = {
    listLines: function() {
        var self = this;
        var OrderModel = MODEL('order').Schema;

        OrderModel.findOne({
            _id: self.query.id
        }, "lines", function(err, doc) {
            if (err) {
                console.log(err);
                self.throw500();
                return;
            }

            self.json(doc.lines);
        });
    },
    /**
     * Create an order
     */
    create: function() {
        var self = this;
        var OrderModel = MODEL('order').Schema;
        var order;

        order = new OrderModel(self.body);


        order.author = {};
        order.author.id = self.user._id;
        order.author.name = self.user.name;

        if (!order.entity)
            order.entity = self.user.entity;

        if (self.user.societe && self.user.societe.id) { // It's an external order
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

                    order.client.id = self.user.societe.id;
                    order.client.name = self.user.societe.name;

                    order.save(function(err, doc) {
                        if (err)
                            return console.log(err);

                        self.json(doc);
                    });
                });
            });
        }

        //console.log(order);

        order.save(function(err, doc) {
            if (err) {
                return console.log(err);
            }

            self.json(doc);
        });
    },
    /**
     * Clone an order
     */
    clone: function(id, self) {
        var OrderModel = MODEL('order').Schema;

        Order(id, function(err, doc) {
            var order = doc.toObject();
            delete order._id;
            delete order.__v;
            delete order.ref;
            delete order.createdAt;
            delete order.updatedAt;
            delete order.history;
            order.Status = "DRAFT";
            order.notes = [];
            order.latex = {};
            order.datec = new Date();
            order.date_livraison = new Date();
            order.deliveries = []; // remove link to delivery
            order.bills = []; // remove link to bill

            order = new OrderModel(order);

            order.author = {};
            order.author.id = self.user._id;
            order.author.name = self.user.name;

            // reset delivery qty
            for (var i = 0, len = order.lines.length; i < len; i++)
                order.lines[i].qty_deliv = 0;

            if (!order.entity)
                order.entity = self.user.entity;

            //console.log(order);

            order.save(function(err, doc) {
                if (err) {
                    return console.log(err);
                }

                self.json(doc);
            });
        });
    },
    /**
     * Update an order
     */
    update: function(id) {
        var self = this;
        //console.log("update");

        Order(id, function(err, order) {
            order = _.extend(order, self.body);
            //console.log(order.history);

            if (self.user.societe && self.user.societe.id && order.Status == "NEW") { // It's an external order
                console.log("Mail order");

                // Send an email
                var mailOptions = {
                    from: "ERP Speedealing<no-reply@speedealing.com>",
                    to: "Plan 92 Chaumeil<plan92@imprimeriechaumeil.fr>",
                    cc: "herve.prot@symeos.com",
                    subject: "Nouvelle commande " + order.client.name + " - " + order.ref + " dans l'ERP"
                };

                mailOptions.text = "La commande " + order.ref + " vient d'etre cree \n";
                mailOptions.text += "Pour consulter la commande cliquer sur ce lien : ";
                mailOptions.text += '<a href="http://erp.chaumeil.net/commande/fiche.php?id=' + order._id + '">' + order.ref + '</a>';
                mailOptions.text += "\n\n";

                // send mail with defined transport object
                smtpTransporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + info.response);
                    }

                    // if you don't want to use this transport object anymore, uncomment following line
                    smtpTransporter.close(); // shut down the connection pool, no more messages
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

                //console.log(doc);
                doc = doc.toObject();
                doc.successNotify = {
                    title: "Success",
                    message: "Commande enregistree"
                };
                self.json(doc);
            });
        });
    },
    updateField: function(req, res) {
        if (req.body.value) {
            var order = req.order;

            order[req.params.field] = req.body.value;

            order.save(function(err, doc) {
                res.json(doc);
            });
        } else
            res.send(500);
    },
    /**
     * Delete an order
     */
    destroy: function(id) {
        var OrderModel = MODEL('order').Schema;
        var self = this;

        OrderModel.update({
            _id: id
        }, { $set: { isremoved: true, Status: 'CANCELED', total_ht: 0, total_ttc: 0, total_tva: [] } }, function(err) {
            if (err)
                self.throw500(err);
            else
                self.json({});

        });
    },
    readDT: function() {
        var self = this;
        var OrderModel = MODEL('order').Schema;

        var query = JSON.parse(self.body.query);

        var conditions = {
            Status: { $ne: "CLOSED" },
            isremoved: { $ne: true }
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
            select: "client.id"
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                Dict.dict({
                    dictName: "fk_order_status",
                    object: true
                }, cb);
            },
            datatable: function(cb) {
                OrderModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();

                if (res.datatable.data[i].Status === 'VALIDATED')
                // Add color line 
                    res.datatable.data[i].DT_RowClass = "bg-yellow";

                // Add link company
                if (row.client && row.client.id)
                    res.datatable.data[i].client.name = '<a class="with-tooltip" href="#!/societe/' + row.client.id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.client.name + '"><span class="fa fa-institution"></span> ' + row.client.name + '</a>';
                else {
                    if (!row.client)
                        res.datatable.data[i].client = {};
                    res.datatable.data[i].client.name = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                }

                // Action
                res.datatable.data[i].action = '<a href="#!/order/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                // Add url on name
                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/order/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-shopping-cart"></span> ' + row.ref + '</a>';
                // Convert Date
                res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                res.datatable.data[i].date_livraison = (row.date_livraison ? moment(row.date_livraison).format(CONFIG('dateformatShort')) : '');
                // Convert Status
                res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    },
    /**
     * Show an order
     */
    show: function(id) {
        var self = this;
        Order(id, function(err, order) {
            if (err)
                console.log(err);

            self.json(order);
        });
    },
    /**
     * List of orders
     */
    all: function(req, res) {
        var query = {};

        if (req.query) {
            for (var i in req.query) {
                if (i == "query") {
                    var status = ["SHIPPING", "CLOSED", "CANCELED", "BILLING"];

                    switch (req.query[i]) {
                        case "NOW":
                            query.Status = {
                                "$nin": status
                            };
                            break;
                        case "CLOSED":
                            query.Status = {
                                "$in": status
                            };
                            break;
                        default:
                            break;
                    }
                } else
                    query[i] = req.query[i];
            }
        }

        CommandeModel.find(query, "-files -latex", function(err, orders) {
            if (err)
                return res.render('error', {
                    status: 500
                });

            res.json(orders);
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
        var SocieteModel = MODEL('societe').Schema;
        var BankModel = MODEL('bank').Schema;

        if (!self)
            self = this;

        var title = "Commande";

        if (self.query.proforma)
            title = "Facture pro forma";

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

        Order(ref, function(err, doc) {
            if (doc.Status == "DRAFT") {
                return self.plain("Impossible de générer le PDF, la commande n'est pas validée");
            }

            var model = "_order.tex";
            // check if discount
            for (var i = 0; i < doc.lines.length; i++) {
                if (doc.lines[i].discount > 0) {
                    model = "_order_discount.tex";
                    discount = true;
                    break;
                }
            }

            SocieteModel.findOne({
                _id: doc.client.id
            }, function(err, societe) {
                BankModel.findOne({
                    ref: doc.bank_reglement
                }, function(err, bank) {
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
                        tabLines.push({
                            ref: (doc.lines[i].product.name != 'SUBTOTAL' ? doc.lines[i].product.name.substring(0, 12) : ""),
                            description: "\\textbf{" + doc.lines[i].product.label + "}" + (doc.lines[i].description ? "\\\\" + doc.lines[i].description : ""),
                            tva_tx: doc.lines[i].tva_tx,
                            pu_ht: doc.lines[i].pu_ht,
                            discount: (doc.lines[i].discount ? (doc.lines[i].discount + " %") : ""),
                            qty: doc.lines[i].qty,
                            total_ht: doc.lines[i].total_ht
                        });

                        if (doc.lines[i].product.name == 'SUBTOTAL') {
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

                    //Total HT
                    tabTotal.push({
                        label: "Total HT",
                        total: doc.total_ht
                    });

                    for (var i = 0; i < doc.total_tva.length; i++) {
                        tabTotal.push({
                            label: "Total TVA " + doc.total_tva[i].tva_tx + " %",
                            total: doc.total_tva[i].total
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
                    Latex.Template(model, doc.entity)
                        .apply({
                            "TITLE": {
                                "type": "string",
                                "value": title
                            },
                            "NUM": {
                                "type": "string",
                                "value": doc.ref
                            },
                            "DESTINATAIRE.NAME": {
                                "type": "string",
                                "value": doc.bl[0].name
                            },
                            "DESTINATAIRE.ADDRESS": {
                                "type": "area",
                                "value": doc.bl[0].address
                            },
                            "DESTINATAIRE.ZIP": {
                                "type": "string",
                                "value": doc.bl[0].zip
                            },
                            "DESTINATAIRE.TOWN": {
                                "type": "string",
                                "value": doc.bl[0].town
                            },
                            "DESTINATAIRE.TVA": {
                                "type": "string",
                                "value": societe.idprof6
                            },
                            "CODECLIENT": {
                                "type": "string",
                                "value": societe.code_client
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
    /*createDelivery: function (self) {
     var DeliveryModel = MODEL('delivery').Schema;
     
     self.body.order = self.body._id;
     delete self.body._id;
     delete self.body.Status;
     delete self.body.latex;
     delete self.body.datec;
     delete self.body.history;
     self.body.datedl = self.body.date_livraison;
     //delete self.body.datel;
     delete self.body.createdAt;
     delete self.body.updatedAt;
     delete self.body.ref;
     self.body.author.id = self.user.id;
     self.body.author.name = self.user.name;
     //delete self.body.notes;
     
     self.body.contacts = _.pluck(self.body.contacts, '_id');
     
     //console.log(self.body.bl);
     
     //Copy first address BL
     self.body.name = self.body.bl[0].name;
     self.body.address = self.body.bl[0].address;
     self.body.zip = self.body.bl[0].zip;
     self.body.town = self.body.bl[0].town;
     
     for (var i = 0; i < self.body.lines.length; i++) {
     self.body.lines[i].qty_order = self.body.lines[i].qty;
     }
     
     var delivery = new DeliveryModel(self.body);
     
     delivery.save(function (err, doc) {
     if (err)
     console.log(err);
     
     console.log(doc);
     self.json(doc);
     });
     },*/
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