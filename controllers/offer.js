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
        extrafieldName: 'Offer'
    }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }

        object.fk_extrafields = doc;
    });

    F.route('/erp/api/offer/lines/list', object.listLines, ['authorize']);
    F.route('/erp/api/offer/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/offer', object.all, ['authorize']);
    F.route('/erp/api/offer', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/offer/{offerId}', function(id) {
        if (this.query.order)
            object.createOrder(this);
        else if (this.query.clone)
            object.clone(id, this);

    }, ['post', 'json', 'authorize']);
    F.route('/erp/api/offer/{offerId}', object.show, ['authorize']);
    F.route('/erp/api/offer/{offerId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/offer/{offerId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/offer/{offerId}/{field}', object.updateField, ['put', 'json', 'authorize']);
    F.route('/erp/api/offer/file/{Id}', object.createFile, ['post', 'authorize']);
    F.route('/erp/api/offer/file/{Id}/{fileName}', object.getFile, ['authorize']);
    F.route('/erp/api/offer/file/{Id}/{fileName}', object.deleteFile, ['delete', 'authorize']);
    F.route('/erp/api/offer/pdf/{offerId}', object.pdf, ['authorize']);
    F.route('/erp/api/offer/download/{:id}', object.download);
};

function Object() {}

// Read an offer
function Offer(id, cb) {
    var OfferModel = MODEL('offer').Schema;

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

    OfferModel.findOne(query, "-latex")
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
        .exec(cb);
}

Object.prototype = {
    listLines: function() {
        var self = this;
        var OfferModel = MODEL('offer').Schema;

        OfferModel.findOne({
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
     * Create an offer
     */
    create: function() {
        var self = this;
        var OfferModel = MODEL('offer').Schema;
        var offer;

        offer = new OfferModel(self.body);


        offer.author = {};
        offer.author.id = self.user._id;
        offer.author.name = self.user.name;

        if (!offer.entity)
            offer.entity = self.user.entity;

        if (self.user.societe && self.user.societe.id) { // It's an external offer
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

                    offer.contact.id = doc._id;
                    offer.contact.name = doc.name;

                    offer.client.id = self.user.societe.id;
                    offer.client.name = self.user.societe.name;

                    offer.save(function(err, doc) {
                        if (err)
                            return console.log(err);

                        self.json(doc);
                    });
                });
            });
        }

        //console.log(offer);

        offer.save(function(err, doc) {
            if (err) {
                return console.log(err);
            }

            self.json(doc);
        });
    },
    /**
     * Clone an offer
     */
    clone: function(id, self) {
        var OfferModel = MODEL('offer').Schema;

        Offer(id, function(err, doc) {
            var offer = doc.toObject();
            delete offer._id;
            delete offer.__v;
            delete offer.ref;
            delete offer.createdAt;
            delete offer.updatedAt;
            delete offer.history;
            offer.Status = "DRAFT";
            offer.notes = [];
            offer.datec = new Date();
            offer.date_livraison = new Date();

            offer = new OfferModel(offer);

            offer.author = {};
            offer.author.id = self.user._id;
            offer.author.name = self.user.name;

            if (!offer.entity)
                offer.entity = self.user.entity;

            //console.log(offer);

            offer.save(function(err, doc) {
                if (err) {
                    return console.log(err);
                }

                self.json(doc);
            });
        });
    },
    /**
     * Update an offer
     */
    update: function(id) {
        var self = this;

        Offer(id, function(err, offer) {

            var old_Status = offer.Status;

            offer = _.extend(offer, self.body);

            if (old_Status == 'DRAFT' && offer.Status == "VALIDATED" && CONFIG('offer.emailNotify')) { // It's a new validated offer
                console.log("Mail offer");

                var mailOptions = {
                    title: "Nouvelle offre " + offer.ref,
                    subtitle: "Societe : " + offer.client.name + " - (" + offer.ref_client + ")",
                    message: "",
                    url: self.host('/erp/api/offer/download/' + offer._id),
                    entity: self.entity
                };

                mailOptions.message = "La proposition commerciale <strong>" + offer.ref + "</strong> vient d'etre cree.<br/>";
                mailOptions.message += "Pour consulter la commande cliquer sur le bouton ci-dessous : ";


                mailOptions.message += '<a href="' + mailOptions.url + '">' + offer.ref + '</a>';
                mailOptions.message += "\n\n";

                //Send an email
                self.mail(CONFIG('offer.emailNotify'), mailOptions.entity.name + " - " + mailOptions.title, 'email_PDF', mailOptions);
            }


            offer.save(function(err, doc) {
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
                    message: "Devis enregistree"
                };
                self.json(doc);
            });
        });
    },
    updateField: function(req, res) {
        if (req.body.value) {
            var offer = req.offer;

            offer[req.params.field] = req.body.value;

            offer.save(function(err, doc) {
                res.json(doc);
            });
        } else
            res.send(500);
    },
    /**
     * Delete an offer
     */
    destroy: function(id) {
        var OfferModel = MODEL('offer').Schema;
        var self = this;

        OfferModel.remove({
            _id: id
        }, function(err) {
            if (err) {
                self.throw500(err);
            } else {
                self.json({});
            }
        });
    },
    readDT: function() {
        var self = this;
        var OfferModel = MODEL('offer').Schema;
        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.body.query);
        //console.log(JSON.parse(self.body.filters));

        var conditions = {};

        if (!self.user.multiEntities)
            conditions.entity = self.user.entity;

        /*if (!query.search.value) {
         if (self.query.status_id !== 'null')
         conditions.Status = self.query.status_id;
         }
         else
         delete conditions.Status;
         */

        var options = {
            conditions: conditions
                //select: ""
        };

        async.parallel({
            status: function(cb) {
                /*Dict.dict({
                    dictName: "fk_offer_status",
                    object: true
                }, cb);*/
                cb(null, MODEL('offer').Status);
            },
            datatable: function(cb) {
                OfferModel.dataTable(query, options, cb);
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
                    // Add link company
                    // Add link company
                    if (row.supplier && row.supplier._id)
                        res.datatable.data[i].supplier = '<a class="with-tooltip" href="#!/societe/' + row.supplier._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.supplier.fullName + '"><span class="fa fa-institution"></span> ' + row.supplier.fullName + '</a>';
                    else {
                        if (!row.supplier)
                            res.datatable.data[i].supplier = {};
                        res.datatable.data[i].supplier = '<span class="with-tooltip editable editable-empty" data-tooltip-options=\'{"position":"top"}\' title="Empty"><span class="fa fa-institution"></span> Empty</span>';
                    }

                    // Action
                    res.datatable.data[i].action = '<a href="#!/offer/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                    // Add url on name
                    res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/offer/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.ref + '"><span class="fa fa-calculator"></span> ' + row.ref + '</a>';
                    // Convert Date
                    res.datatable.data[i].datec = (row.datec ? moment(row.datec).format(CONFIG('dateformatShort')) : '');
                    res.datatable.data[i].date_livraison = (row.date_livraison ? moment(row.date_livraison).format(CONFIG('dateformatShort')) : '');
                    // Convert Status
                    if (res.status)
                        res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                }

                //console.log(res.datatable);

                self.json(res.datatable);
            });
        });
    },
    /**
     * Show an offer
     */
    show: function(id) {
        var self = this;
        Offer(id, function(err, offer) {
            if (err)
                console.log(err);

            self.json(offer);
        });
    },
    /**
     * List of offers
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

        CommandeModel.find(query, "-files -latex", function(err, offers) {
            if (err)
                return res.render('error', {
                    status: 500
                });

            res.json(offers);
        });
    },
    /**
     * Add a file in an offer
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
     * Get a file form an offer
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
     * Delete a file in an offer
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

        Offer(ref, function(err, doc) {

            var model = "_offer.tex";
            // check if discount
            for (var i = 0; i < doc.lines.length; i++) {
                if (doc.lines[i].discount > 0) {
                    model = "_offer_discount.tex";
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
                            self.throw500(err);
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
    createOrder: function(self) {
        var OrderModel = MODEL('order').Schema;
        var OfferModel = MODEL('offer').Schema;

        var id = self.body._id;

        self.body.offer = self.body._id;
        delete self.body._id;
        delete self.body.Status;
        delete self.body.latex;
        delete self.body.datec;
        delete self.body.datel;
        delete self.body.createdAt;
        delete self.body.updatedAt;
        delete self.body.ref;
        delete self.body.history;
        self.body.author.id = self.user.id;
        self.body.author.name = self.user.name;
        //delete self.body.notes;

        self.body.contacts = _.pluck(self.body.contacts, '_id');

        var order = new OrderModel(self.body);

        order.save(function(err, doc) {
            if (err)
                return console.log(err);

            OfferModel.update({
                _id: id
            }, {
                $addToSet: {
                    orders: doc._id
                }
            }, function(err) {
                if (err)
                    console.log(err);
            });

            //console.log(doc);
            self.json(doc);
        });
    },
    download: function(id) {
        var self = this;
        var OfferModel = MODEL('offer').Schema;

        var object = new Object();

        OfferModel.findOne({ _id: id }, function(err, offer) {
            if (err)
                return self.throw500(err);

            if (!offer)
                return self.view404('Offer id not found');

            //var date = new Date();
            //offer.updatedAt.setDate(offer.updatedAt.getDate() + 15); // date + 15j, seulement telechargement pdt 15j

            //if (offer.updatedAt < date)
            //    return self.view404('Offer expired');

            object.pdf(id, self);

            offer.history.push({
                date: new Date(),
                mode: 'email',
                msg: 'email pdf telecharge',
                Status: 'notify'
            });

            offer.save();
        });
    }
};