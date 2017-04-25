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

var fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async'),
    Image = require('total.js/image');

var Dict = INCLUDE('dict');

exports.install = function() {

    var object = new Object();
    var report = new Report();

    F.route('/erp/api/societe', object.read, ['authorize']);
    F.route('/erp/api/societe/dt', object.readDT, ['post', 'authorize']);
    F.route('/erp/api/societe/dt_supplier', object.readDT_supplier, ['post', 'authorize']);
    F.route('/erp/api/societe/uniqId', object.uniqId, ['authorize']);
    F.route('/erp/api/societe/count', object.count, ['authorize']);
    F.route('/erp/api/societe/export', object.export, ['authorize']);
    F.route('/erp/api/societe/statistic', object.statistic, ['authorize']);
    F.route('/erp/api/societe/listCommercial', object.listCommercial, ['authorize']);
    F.route('/erp/api/societe/segmentation', object.segmentation, ['authorize']);
    F.route('/erp/api/societe/segmentation', object.segmentationRename, ['post', 'json', 'authorize']);
    F.route('/erp/api/societe/segmentation', object.segmentationUpdate, ['put', 'json', 'authorize']);
    F.route('/erp/api/societe/segmentation', object.segmentationDelete, ['delete', 'authorize']);
    F.route('/erp/api/societe/report', report.read, ['authorize']);

    F.route('/erp/api/societe/{societeId}', object.show, ['authorize']);
    F.route('/erp/api/societe', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/societe/{societeId}', object.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/societe/', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/societe/{societeId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/societe/{societeId}/{field}', object.updateField, ['put', 'json', 'authorize']);

    // list for autocomplete
    F.route('/erp/api/societe/autocomplete', function() {
        //console.dir(req.body.filter);
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        if (self.body.filter == null)
            return self.json({});

        var filter = self.body.filter.filters[0].value.trim();
        //(david|doma) create regex or search if 2 words
        if (self.body.filter.filters[0].value.indexOf(" ")) {
            var search = filter.split(' ');
            search = _.map(search, function(text) {
                return text.trim();
            });

            filter = '(';
            for (var i = 0, len = search.length; i < len; i++) {
                filter += search[i];
                if (i + 1 !== len)
                    filter += '|';
            }
            filter += ')';
        }

        var query = {
            "$or": [{
                name: new RegExp(filter, "gi")
            }, {
                ref: new RegExp(self.body.filter.filters[0].value, "i")
            }, {
                code_client: new RegExp(self.body.filter.filters[0].value, "i")
            }],
            entity: {
                $in: [self.body.entity || self.user.entity, "ALL"]
            }
        };

        if (!self.query.all)
            if (self.query.fournisseur || self.body.fournisseur) {
                if (self.query.fournisseur) {
                    if (typeof self.query.fournisseur == 'object')
                        query.fournisseur = {
                            $in: self.query.fournisseur
                        };
                    else
                        query.fournisseur = self.query.fournisseur;
                } else {
                    if (typeof self.body.fournisseur == 'object')
                        query.fournisseur = {
                            $in: self.body.fournisseur
                        };
                    else
                        query.fournisseur = self.body.fournisseur;
                }
            } else // customer Only
                query.Status = {
                "$nin": ["ST_NO", "ST_NEVER"]
            };

            //console.log(query);
        SocieteModel.find(query, {}, {
                limit: 50 /*self.body.take*/ ,
                sort: {
                    name: 1
                }
            })
            .populate("cptBilling.id", "name address zip town")
            .exec(function(err, docs) {
                if (err)
                    return console.log("err : /erp/api/societe/autocomplete", err);


                //console.log(docs);

                var result = [];

                if (docs !== null)
                    for (var i = 0, len = docs.length; i < len; i++) {
                        //console.log(docs[i].ref);
                        result[i] = {};
                        result[i].name = docs[i].name;
                        result[i].id = docs[i]._id;
                        result[i].code_client = docs[i].code_client;

                        if (docs[i].cptBilling.id == null) {
                            result[i].cptBilling = {};
                            result[i].cptBilling.name = docs[i].name;
                            result[i].cptBilling.id = docs[i]._id;
                            result[i].cptBilling.address = docs[i].address;
                            result[i].cptBilling.zip = docs[i].zip;
                            result[i].cptBilling.town = docs[i].town;
                        } else {
                            result[i].cptBilling = {};
                            result[i].cptBilling.name = docs[i].cptBilling.id.name;
                            result[i].cptBilling.id = docs[i].cptBilling.id._id;
                            result[i].cptBilling.address = docs[i].cptBilling.id.address;
                            result[i].cptBilling.zip = docs[i].cptBilling.id.zip;
                            result[i].cptBilling.town = docs[i].cptBilling.id.town;
                        }

                        result[i].price_level = docs[i].price_level;

                        // add address
                        result[i].address = {};
                        result[i].address.name = docs[i].name;
                        result[i].address.address = docs[i].address;
                        result[i].address.zip = docs[i].zip;
                        result[i].address.town = docs[i].town;
                        result[i].address.country = docs[i].country;
                        result[i].addresses = docs[i].addresses;
                        result[i].deliveryAddressId = docs[i].deliveryAddressId;

                        result[i].mode_reglement_code = docs[i].mode_reglement;
                        result[i].cond_reglement_code = docs[i].cond_reglement;
                        result[i].bank_reglement = docs[i].bank_reglement;
                        result[i].commercial_id = docs[i].commercial_id;
                    }

                return self.json(result);
            });
    }, ['post', 'json', 'authorize']);

    F.route('/erp/api/societe/autocomplete/{field}', function(field) {
        //console.dir(req.body);
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        if (self.body.filter == null)
            return self.json({});

        var query = {};

        query[field] = new RegExp(self.body.filter.filters[0].value, "i");

        if (typeof SocieteModel.schema.paths[field].options.type == "object")
        //console.log(query);
            SocieteModel.aggregate([{
            $project: {
                _id: 0,
                Tag: 1
            }
        }, {
            $unwind: "$" + field
        }, {
            $match: query
        }, {
            $group: {
                _id: "$" + field
            }
        }, {
            $limit: self.body.take
        }], function(err, docs) {
            if (err)
                return console.log("err : /api/societe/autocomplete/" + field, err);

            //console.log(docs);
            var result = [];

            if (docs !== null)
                for (var i in docs) {
                    //result.push({text: docs[i]._id});
                    result.push(docs[i]._id);
                }

            return self.json(result);
        });
        else
            SocieteModel.distinct(field, query, function(err, docs) {
                if (err)
                    return console.log("err : /api/societe/autocomplete/" + field, err);

                return self.json(docs);
            });
    }, ['post', 'json', 'authorize']);

    /*app.post('/api/societe/segmentation/autocomplete', auth.requiresLogin, function(req, res) {
     //console.dir(req.body);
     
     if (req.body.filter == null)
     return res.send(200, {});
     
     var query = {
     'segmentation.text': new RegExp(req.body.filter.filters[0].value, "i")
     };
     
     //console.log(query);
     SocieteModel.aggregate([{
     $project: {
     _id: 0,
     segmentation: 1
     }
     }, {
     $unwind: "$segmentation"
     }, {
     $match: query
     }, {
     $group: {
     _id: "$segmentation.text"
     }
     }, {
     $limit: req.body.take
     }], function(err, docs) {
     if (err) {
     console.log("err : /api/societe/segmentation/autocomplete");
     console.log(err);
     return;
     }
     //console.log(docs);
     var result = [];
     
     if (docs !== null)
     for (var i in docs) {
     result.push({
     text: docs[i]._id
     });
     }
     
     return res.send(200, result);
     });
     });
     
     app.post('/api/societe/import/kompass', function(req, res) {
     
     var ContactModel = MODEL('contact').Schema;
     
     if (req.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
     return res.send(401);
     
     var conv = [
     "kompass_id",
     "name",
     "address",
     "address1",
     "town",
     "zip",
     false,
     "country_id",
     "phone",
     false,
     "url",
     "effectif_id",
     false,
     false,
     false,
     "typent_id",
     "idprof3",
     false,
     false,
     false,
     false,
     false,
     "brand",
     "idprof2",
     false,
     false,
     false,
     "fax",
     false,
     "email",
     false,
     "BP",
     false,
     "forme_juridique_code",
     "yearCreated",
     false,
     "segmentation",
     false,
     false,
     false,
     false,
     false,
     false,
     false,
     "civilite",
     "firstname",
     "lastname",
     "poste",
     "sex",
     false,
     false,
     false,
     false,
     "annualCA",
     "capital",
     false,
     "annualEBE",
     false,
     false,
     false,
     false,
     "risk",
     false
     ];
     
     var conv_id = {
     civilite: {
     "": "NO",
     "Mme": "MME",
     "Mlle": "MLE",
     "M.": "MR"
     },
     effectif_id: {
     "": "EF0",
     "5": "EF1-5",
     "10": "EF6-10",
     "50": "EF11-50",
     "De 50 à 99": "EF51-100",
     "De 100 à 249": "EF101-250",
     "De 250 à 499": "EF251-500",
     "De 500 à 999": "EF501-1000",
     "De 1 000 à 4 999": "EF1001-5000",
     "Plus de 5 000": "EF5000+"
     },
     sex: {
     "": null,
     "Homme": "H",
     "Femme": "F"
     },
     risk: {
     "": "NO",
     "Risque fort": "HIGH",
     "Risque faible": "LOW",
     "Risque modéré": "MEDIUM"
     },
     typent_id: {
     "Siège": "TE_SIEGE",
     "Etablissement": "TE_ETABL",
     "Publique / Administration": "TE_PUBLIC"
     },
     forme_juridique_code: {
     "": null,
     "59": null,
     "60": null,
     "62": null,
     "Affaire Personnelle (AF.PERS)": "11",
     "Association sans but lucratif (AS 1901)": "92",
     "Coopérative (COOPE.)": "51",
     "Epic": "41",
     "Etablissement Public (ET-PUBL)": "73",
     "Ets Public Administratif (E.P.A.)": "73",
     "EURL": "58",
     "Groupement Intérêt Economique (GIE)": "62",
     "Mutal Association (MUT-ASS)": "92",
     "Profession Libérale (Prof. libé)": "15",
     "S.A. à Directoire (SA DIR.)": "56",
     "S.A. Coopérative (S.A. COOP.)": "51",
     "S.A. Economie Mixte (SA Eco.Mix)": "56",
     "S.A.R.L.": "54",
     "SA Conseil Administration (SA CONSEIL)": "55",
     "SA Directoire & Conseil Surv. (SA Dir & C)": "56",
     "Société Anonyme (S.A.)": "55",
     "Société Civile (STE CIV)": "65",
     "Société de Droit Etranger (STE DR. ET)": "31",
     "Société en Participation (STE PART.)": "23",
     "Sté Coop Ouvrière Production (SCOP)": "51",
     "Sté en commandite par actions (SCA)": "53",
     "Sté en commandite simple (SCS)": "53",
     "Sté en nom collectif (SNC)": "52",
     "Sté Expl Libérale Resp Limitée (SELARL)": "15",
     "Sté par Action Simplifiée (S.A.S.)": "57",
     "Syndicat (SYND.)": "91",
     "Sté Intérêt Collectif Agrico (Sica)": "63",
     "Sté Coop Production Anonyme (SCPA)": "51",
     "Sté nationalisée droit public (SNDP)": "41",
     "S.A.R.L. Coopérative (SARL COOP.)": "51",
     "Société de Fait (STE FAIT)": "22",
     "Sté nationalisée droit comm. (SNADC)": "41",
     "S.A. Conseil de Surveillance (SA C.SURV.)": "56"
     }
     };
     
     var is_Array = [
     "brand",
     "segmentation",
     "annualCA",
     "annualEBE"
     ];
     
     var convertRow = function(row, index, cb) {
     var societe = {};
     
     for (var i = 0; i < row.length; i++) {
     if (conv[i] === false)
     continue;
     
     if (typeof conv_id[conv[i]] !== 'undefined') {
     if (conv_id[conv[i]][row[i]] === undefined) {
     console.log("error : unknown " + conv[i] + "->" + row[i] + " ligne " + index);
     return;
     }
     
     row[i] = conv_id[conv[i]][row[i]];
     }
     
     switch (conv[i]) {
     case "address1":
     if (row[i])
     societe.address += "\n" + row[i];
     break;
     case "BP":
     if (row[i]) {
     societe.address += "\n" + row[i].substr(0, row[i].indexOf(','));
     }
     break;
     case "brand":
     if (row[i])
     societe[conv[i]] = row[i].split(',');
     break;
     case "segmentation":
     if (row[i]) {
     var seg = row[i].split(',');
     societe[conv[i]] = [];
     for (var j = 0; j < seg.length; j++) {
     seg[j] = seg[j].replace(/\./g, "");
     seg[j] = seg[j].trim();
     
     societe[conv[i]].push({
     text: seg[j]
     });
     }
     }
     
     
     break;
     case "capital":
     if (row[i])
     societe[conv[i]] = parseInt(row[i].substr(0, row[i].indexOf(' ')), 10);
     break;
     case "yearCreated":
     if (row[i])
     societe[conv[i]] = parseInt(row[i], 10) || null;
     break;
     case "phone":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "fax":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "idprof2":
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "typent_id":
     var juridic = conv_id[conv[33]][row[33]];
     if (row[33] && juridic == "41" || juridic == "73")
     //console.log('PUBLIC');
     societe.typent_id = "TE_PUBLIC";
     break;
     case "annualCA":
     societe[conv[i]] = [];
     if (row[i]) {
     var tmp = row[i].split(',');
     for (var j in tmp) {
     var data = tmp[j].split("=");
     var obj = {
     year: parseInt(data[0], 10),
     amount: parseInt(data[1], 10)
     };
     societe[conv[i]].push(obj);
     }
     }
     break;
     case "annualEBE":
     societe[conv[i]] = [];
     if (row[i]) {
     var tmp = row[i].split(',');
     for (var j in tmp) {
     var data = tmp[j].split("=");
     var obj = {
     year: parseInt(data[0], 10),
     amount: parseInt(data[1], 10)
     };
     societe[conv[i]].push(obj);
     }
     }
     break;
     default:
     if (row[i])
     societe[conv[i]] = row[i];
     }
     }
     
     cb(societe);
     };
     
     var is_imported = {};
     
     
     if (req.files) {
     var filename = req.files.filedata.path;
     if (fs.existsSync(filename)) {
     
     var tab = [];
     
     csv()
     .from.path(filename, {
     delimiter: ';',
     escape: '"'
     })
     .transform(function(row, index, callback) {
     if (index === 0) {
     tab = row; // Save header line
     
     //for (var i = 0; i < tab.length; i++)
     //if (conv[i] !== false)
     //	console.log(i + ". " + tab[i] + "->" + conv[i]);
     
     return callback();
     }
     
     var alreadyImport = false;
     if (is_imported[row[0]])
     alreadyImport = true;
     
     is_imported[row[0]] = true;
     
     //console.log(row);
     
     //console.log(row[0]);
     
     convertRow(row, index, function(data) {
     
     //callback();
     
     //return;
     
     SocieteModel.findOne({
     $or: [{
     kompass_id: data.kompass_id
     }, {
     idprof2: data.idprof2
     }]
     }, function(err, societe) {
     if (err) {
     console.log(err);
     return callback();
     }
     
     var isNew = false;
     if (societe == null) {
     societe = new SocieteModel(data);
     societe.Status = "ST_NEVER";
     isNew = true;
     }
     
     societe = _.extend(societe, data);
     
     //console.log(row[10]);
     //console.log(societe)
     //console.log(societe.datec);
     //callback();
     //return;
     
     if (!alreadyImport)
     societe.save(function(err, doc) {
     if (err)
     console.log(err);
     
     callback();
     });
     
     if (!isNew) {
     ContactModel.findOne({
     'societe.id': societe._id,
     firstname: data.firstname,
     lastname: data.lastname
     }, function(err, contact) {
     if (err) {
     console.log(err);
     return callback();
     }
     
     if (contact == null) {
     contact = new ContactModel(data);
     
     contact.societe.id = societe.id;
     contact.societe.name = societe.name;
     
     }
     
     contact = _.extend(contact, data);
     
     //console.log(contact);
     
     if (!contact.firstname && !contact.lastname)
     return callback();
     
     contact.save(function(err, doc) {
     callback();
     });
     });
     } else
     callback();
     
     });
     
     //return row;
     });
     })
     .on("end", function(count) {
     console.log('Number of lines: ' + count);
     fs.unlink(filename, function(err) {
     if (err)
     console.log(err);
     });
     return res.send(200, {
     count: count
     });
     })
     .on('error', function(error) {
     console.log(error.message);
     });
     }
     }
     });
     
     app.post('/api/societe/import/horsAntenne', function(req, res) {
     if (req.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
     return res.send(401);
     
     req.connection.setTimeout(300000);
     
     var conv = [
     false,
     false,
     "ha_id",
     "civilite",
     "firstname",
     "lastname",
     'poste',
     false,
     false,
     false,
     false,
     false,
     false,
     false,
     false,
     false,
     "contact_phone",
     "phone",
     "contact_fax",
     "fax",
     "contact_email",
     "email",
     "name",
     false,
     false,
     false,
     false,
     "address",
     "address1",
     'zip',
     "town",
     false,
     "url",
     "Tag",
     "Tag",
     "Tag",
     "effectif_id", // Nombre d'habitants
     false,
     false,
     "idprof1",
     "entity"
     ];
     
     var conv_id = {
     civilite: {
     "": "NO",
     "MME": "MME",
     "MLLE": "MLE",
     "M.": "MR",
     "COLONEL": "COLONEL",
     "DOCTEUR": "DR",
     "GENERAL": "GENERAL",
     "PROFESSEUR": "PROF"
     },
     effectif_id: {
     "0": "EF0",
     "1": "EF1-5",
     "6": "EF6-10",
     "11": "EF11-50",
     "51": "EF51-100",
     "101": "EF101-250",
     "251": "EF251-500",
     "501": "EF501-1000",
     "1001": "EF1001-5000",
     "5001": "EF5000+"
     },
     typent_id: {
     "Siège": "TE_SIEGE",
     "Etablissement": "TE_ETABL",
     "Publique / Administration": "TE_PUBLIC"
     }
     };
     
     var is_Array = [
     "Tag"
     ];
     
     var convertRow = function(row, index, cb) {
     var societe = {};
     societe.typent_id = "TE_PUBLIC";
     societe.country_id = "FR";
     societe.Tag = [];
     societe.remise_client = 0;
     
     for (var i = 0; i < row.length; i++) {
     if (conv[i] === false)
     continue;
     
     if (conv[i] != "effectif_id" && typeof conv_id[conv[i]] !== 'undefined') {
     
     if (conv[i] == "civilite" && conv_id[conv[i]][row[i]] === undefined)
     row[i] = "";
     
     if (conv_id[conv[i]][row[i]] === undefined) {
     console.log("error : unknown " + conv[i] + "->" + row[i] + " ligne " + index);
     return;
     }
     
     row[i] = conv_id[conv[i]][row[i]];
     }
     
     switch (conv[i]) {
     case "address1":
     if (row[i])
     societe.address += "\n" + row[i];
     break;
     case "BP":
     if (row[i]) {
     societe.address += "\n" + row[i].substr(0, row[i].indexOf(','));
     }
     break;
     case "brand":
     if (row[i])
     societe[conv[i]] = row[i].split(',');
     break;
     case "Tag":
     if (row[i]) {
     var seg = row[i].split(',');
     for (var j = 0; j < seg.length; j++) {
     seg[j] = seg[j].replace(/\./g, "");
     seg[j] = seg[j].trim();
     
     societe[conv[i]].push({
     text: seg[j]
     });
     }
     }
     break;
     case "capital":
     if (row[i])
     societe[conv[i]] = parseInt(row[i].substr(0, row[i].indexOf(' ')), 10);
     break;
     case "yearCreated":
     if (row[i])
     societe[conv[i]] = parseInt(row[i], 10) || null;
     break;
     case "phone":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "fax":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "contact_phone":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "contact_fax":
     if (row[i])
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "idprof2":
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "idprof1":
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "idprof3":
     societe[conv[i]] = row[i].replace(/ /g, "");
     break;
     case "effectif_id":
     societe[conv[i]] = "EF0";
     
     for (var idx in conv_id[conv[i]]) {
     if (parseInt(idx, 10) <= parseInt(row[i], 10))
     societe[conv[i]] = conv_id[conv[i]][idx];
     }
     break;
     default:
     if (row[i])
     societe[conv[i]] = row[i];
     }
     }
     //console.log(societe);
     cb(societe);
     };
     
     var is_imported = {};
     
     
     if (req.files) {
     var filename = req.files.filedata.path;
     if (fs.existsSync(filename)) {
     
     var tab = [];
     
     csv()
     .from.path(filename, {
     delimiter: ';',
     escape: '"'
     })
     .transform(function(row, index, callback) {
     if (index === 0) {
     tab = row; // Save header line
     
     //for (var i = 0; i < tab.length; i++)
     //	if (conv[i] !== false)
     //		console.log(i + ". " + tab[i] + "->" + conv[i]);
     
     return callback();
     }
     //if (index == 1)
     //	console.log(row);
     
     var alreadyImport = false;
     if (is_imported[row[2]])
     alreadyImport = true;
     
     is_imported[row[2]] = true;
     
     //console.log(row);
     
     //console.log(row[0]);
     
     convertRow(row, index, function(data) {
     
     //callback();
     
     //return;
     
     //if (!data.idprof2) // Pas de SIRET
     //	return callback();
     
     var query;
     //console.log(data.idprof2);
     //if (data.idprof2)
     //	query = {$or: [{ha_id: data.ha_id}, {idprof2: data.idprof2}]};
     //else
     query = {
     ha_id: data.ha_id
     };
     
     SocieteModel.findOne(query, function(err, societe) {
     if (err) {
     console.log(err);
     return callback();
     }
     //if (index == 1)
     //	console.log(societe);
     
     var isNew = false;
     if (societe == null) {
     societe = new SocieteModel(data);
     societe.Status = "ST_NEVER";
     isNew = true;
     //console.log("new societe");
     } else {
     //console.log("update societe");
     }
     //console.log(data);
     societe = _.extend(societe, data);
     
     //console.log(row[10]);
     //console.log(societe);
     //console.log(societe.datec);
     //callback();
     //return;
     
     if (!alreadyImport)
     societe.save(function(err, doc) {
     if (err)
     console.log("societe : " + JSON.stringify(err));
     
     //console.log("save");
     
     callback();
     });
     
     if (!isNew) {
     ContactModel.findOne({
     'societe.id': societe._id,
     firstname: data.firstname,
     lastname: data.lastname
     }, function(err, contact) {
     if (err) {
     console.log(err);
     return callback();
     }
     
     if (contact == null) {
     contact = new ContactModel(data);
     
     contact.societe.id = societe.id;
     contact.societe.name = societe.name;
     
     }
     
     contact = _.extend(contact, data);
     
     //console.log(data);
     if (data.contact_phone)
     contact.phone = data.contact_phone;
     if (data.contact_fax)
     contact.fax = data.contact_fax;
     if (data.contact_email)
     contact.email = data.contact_email;
     
     //console.log(contact);
     
     if (!contact.firstname || !contact.lastname)
     return callback();
     
     contact.save(function(err, doc) {
     if (err)
     console.log("contact : " + err);
     
     callback();
     });
     });
     } else
     callback();
     
     });
     
     //return row;
     });
     })
     .on("end", function(count) {
     console.log('Number of lines: ' + count);
     fs.unlink(filename, function(err) {
     if (err)
     console.log(err);
     });
     return res.send(200, {
     count: count
     });
     })
     .on('error', function(error) {
     console.log(error.message);
     });
     }
     }
     });*/

    F.route('/erp/api/societe/import', function() {
        var fixedWidthString = require('fixed-width-string');
        var UserModel = MODEL('user').Schema;
        var SocieteModel = MODEL('Customers').Schema;
        var ContactModel = MODEL('contact').Schema;
        var self = this;

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        var idx = 'oldId'; //index d'import pour le dedoublonnage et la recherche d'existant
        if (self.query.idx)
            idx = self.query.idx;

        /**
         * oldId;name;address;zip;town;brand;Tag;capital;yearCreated;phone;fax;idprof2;idprof1;idprof3;effectif_id;notes;commercial_id;datec
         *
         * contact.firstname;contact.lastname;contact.civilite;contact.phone_mobile;contact.phone;contact.fax;
         */

        /*
         * Tri par name obligatoire
         */

        var commercial_list = {};

        UserModel.find({
            //Status: "ENABLE"
        }, function(err, users) {
            //console.log(users);

            for (var i = 0; i < users.length; i++) {
                commercial_list[users[i]._id.toString()] = users[i];
            }

            var conv_id = {
                effectif_id: {
                    "0": "EF0",
                    "1": "EF1-5",
                    "6": "EF6-10",
                    "11": "EF11-50",
                    "51": "EF51-100",
                    "101": "EF101-250",
                    "251": "EF251-500",
                    "501": "EF501-1000",
                    "1001": "EF1001-5000",
                    "5001": "EF5000+"
                },
                typent_id: {
                    "Siège": "TE_SIEGE",
                    "Etablissement": "TE_ETABL",
                    "Publique / Administration": "TE_PUBLIC"
                },
                /*Status: {
                 "": "ST_CFID",
                 "Moins de 3 mois": "ST_CINF3",
                 "OK Sensibilisation": "ST_NEW",
                 "Bonne relation": "ST_NEW",
                 "Peu visité": "ST_NEW",
                 "Recontacter dans 2 mois": "ST_NEW",
                 "Ne pas recontacter": "ST_NO",
                 "Chaud": "ST_PCHAU",
                 "Tiède": "ST_PTIED",
                 "Froid": "ST_PFROI",
                 "Non Déterminé": "ST_NEVER"
                 },*/
                prospectlevel: {
                    "": "PL_NONE",
                    "Niveau 3": "PL_HIGH",
                    "Niveau 2": "PL_MEDIUM",
                    "Niveau 1": "PL_LOW",
                    "Niveau 0": "PL_NONE"
                },
                civilite: {
                    "": "NO",
                    "MME": "MME",
                    "MLLE": "MLE",
                    "Mme": "MME",
                    "M.": "MR",
                    "COLONEL": "COLONEL",
                    "DOCTEUR": "DR",
                    "GENERAL": "GENERAL",
                    "PROFESSEUR": "PROF"
                }
            };

            var is_Array = [
                "Tag"
            ];

            var convertRow = function(tab, row, index, cb) {
                var societe = {};
                societe.country_id = "FR";
                societe.Tag = [];
                societe.contact = {
                    Tag: []
                };
                societe.remise_client = 0;

                for (var i = 0; i < row.length; i++) {
                    if (tab[i] === "false")
                        continue;

                    //
                    if (tab[i] !== "contact.Tag" && tab[i].indexOf(".") >= 0) {
                        var split = tab[i].split(".");

                        if (row[i]) {
                            if (typeof societe[split[0]] === "undefined")
                                societe[split[0]] = {};

                            societe[split[0]][split[1]] = row[i];
                        }
                        //continue;
                    }

                    if (tab[i] != "effectif_id" && typeof conv_id[tab[i]] !== 'undefined') {

                        if (tab[i] == "civilite" && conv_id[tab[i]][row[i]] === undefined)
                            row[i] = "";

                        if (conv_id[tab[i]][row[i]] === undefined)
                            return console.log("error : unknown " + tab[i] + "->" + row[i] + " ligne " + index);

                        row[i] = conv_id[tab[i]][row[i]];
                    }

                    switch (tab[i]) {
                        case "name":
                            if (row[i]) {
                                societe.name = row[i].trim();
                            }
                            break;
                        case "address":
                            if (row[i]) {
                                if (societe.address)
                                    societe.address += "\n" + row[i];
                                else
                                    societe.address = row[i];
                            }
                            break;
                        case "zip":
                            if (row[i])
                                societe.zip = fixedWidthString(row[i], 5, { padding: '0', align: 'right' });
                        case "BP":
                            if (row[i]) {
                                societe.address += "\n" + row[i].substr(0, row[i].indexOf(','));
                            }
                            break;
                        case "brand":
                            if (row[i])
                                societe[tab[i]] = row[i].split(',');
                            break;
                        case "Tag":
                            if (row[i]) {
                                var seg = row[i].split(',');
                                for (var j = 0; j < seg.length; j++) {
                                    seg[j] = seg[j].replace(/\./g, "");
                                    seg[j] = seg[j].trim();

                                    societe[tab[i]].push({
                                        text: seg[j]
                                    });
                                }
                            }
                            break;
                        case "contact.Tag":
                            if (row[i]) {
                                var seg = row[i].split(',');
                                for (var j = 0; j < seg.length; j++) {
                                    seg[j] = seg[j].replace(/\./g, "");
                                    seg[j] = seg[j].trim();

                                    societe.contact.Tag.push({
                                        text: seg[j]
                                    });

                                    //console.log(societe.contact);
                                }
                            }
                            break;
                        case "capital":
                            if (row[i])
                                societe[tab[i]] = parseInt(row[i].substr(0, row[i].indexOf(' ')), 10);
                            break;
                        case "yearCreated":
                            if (row[i])
                                societe[tab[i]] = parseInt(row[i], 10) || null;
                            break;
                        case "phone":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "phone_mobile":
                            if (row[i])
                                societe["phone"] += "/" + row[i].replace(/ /g, "");
                            break;
                        case "fax":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "contact_phone":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "contact_fax":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "idprof2":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "idprof1":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "idprof3":
                            if (row[i])
                                societe[tab[i]] = row[i].replace(/ /g, "");
                            break;
                        case "effectif_id":
                            if (row[i]) {
                                societe[tab[i]] = "EF0";

                                for (var idx in conv_id[tab[i]]) {
                                    if (parseInt(idx, 10) <= parseInt(row[i], 10))
                                        societe[tab[i]] = conv_id[tab[i]][idx];
                                }
                            }
                            break;
                        case "notes":
                            if (row[i]) {
                                if (!_.isArray(societe.notes))
                                    societe.notes = [];

                                societe[tab[i]].push({
                                    author: {
                                        name: "Inconnu"
                                    },
                                    datec: new Date(0),
                                    note: row[i]
                                });
                            }

                            break;
                        case "commercial_id":
                            if (row[i]) {
                                if (!commercial_list[row[i]])
                                    console.log("Error (Not found) commercial_id : " + row[i]);
                                else
                                    societe.commercial_id = {
                                        id: row[i],
                                        name: (commercial_list[row[i]] ? commercial_list[row[i]].firstname + " " + commercial_list[row[i]].lastname : row[i])
                                    };
                            }
                            break;

                        case "datec":
                            //console.log(row[i]);
                            if (row[i])
                                societe[tab[i]] = new Date(row[i]);
                            break;
                        case "entity":
                            if (row[i])
                                societe[tab[i]] = row[i].toLowerCase();
                            break;
                        case "rib.bank":
                            if (row[i]) {
                                if (!societe.iban)
                                    societe.iban = {};

                                societe.iban.id = 'FR76' + fixedWidthString(row[i], 5, { padding: '0', align: 'right' });
                            }
                            break;
                        case "rib.guichet":
                            if (row[i])
                                societe.iban.id += fixedWidthString(row[i], 5, { padding: '0', align: 'right' });
                            break;
                        case "rib.cpt":
                            if (row[i])
                                societe.iban.id += fixedWidthString(row[i], 11, { padding: '0', align: 'right' });
                            break;
                        case "rib.key":
                            if (row[i])
                                societe.iban.id += fixedWidthString(row[i], 2, { padding: '0', align: 'right' });
                            break;
                        default:
                            if (row[i])
                                societe[tab[i]] = row[i];
                    }
                }
                //console.log(societe);
                cb(societe);
            };

            if (self.files.length > 0) {
                console.log(self.files[0].filename);

                var tab = [];

                csv()
                    .from.path(self.files[0].path, {
                        delimiter: ';',
                        escape: '"'
                    })
                    .transform(function(row, index, callback) {
                        if (index === 0) {
                            tab = row; // Save header line
                            return callback();
                        }
                        //console.log(tab);
                        //console.log(row);

                        //console.log(row[0]);

                        //return;

                        var already_imported = {};

                        convertRow(tab, row, index, function(data) {

                            async.series([
                                // import societe
                                function(cb) {
                                    //
                                    //  Test si societe deja importe
                                    //

                                    if (!data.entity)
                                        return cb("Entity missing");

                                    if (typeof already_imported[data[idx]] === 'undefined') {

                                        //import societe
                                        if (data[idx]) {
                                            var req = {};
                                            req[idx] = data[idx];

                                            SocieteModel.findOne(req, function(err, societe) {
                                                if (err) {
                                                    console.log(err);
                                                    return callback(err);
                                                }

                                                if (societe == null) {
                                                    societe = new SocieteModel(data);
                                                    console.log("Create new societe");
                                                } else {
                                                    societe = _.extend(societe, data);
                                                    console.log("Update societe ", societe._id);
                                                }

                                                //console.log(row[10]);
                                                //if (societe.commercial_id) {
                                                //console.log(societe)
                                                //console.log(societe.datec);
                                                //}

                                                societe.save(function(err, doc) {
                                                    if (err) {
                                                        console.log(societe, err);
                                                        return cb(err);
                                                    }

                                                    already_imported[doc[idx]] = {
                                                        id: doc._id,
                                                        name: doc.name
                                                    };

                                                    cb(err, already_imported[doc[idx]]);

                                                });

                                            });
                                        } else
                                            cb("_id or code_client or oldId missing", null);
                                    } else {
                                        cb(null, already_imported[data[idx]]);
                                    }
                                },
                                //import contact
                                function(cb) {
                                    var res_contact = data.contact;

                                    if (!res_contact.lastname || already_imported[data[idx]].id == null)
                                        return cb(null, null);

                                    res_contact.societe = already_imported[data[idx]];
                                    //console.log(res_contact);

                                    var query = {
                                        $or: []
                                    };

                                    if (res_contact._id)
                                        query.$or.push({
                                            _id: res_contact._id
                                        });

                                    if (res_contact.email)
                                        query.$or.push({
                                            email: res_contact.email.toLowerCase()
                                        });
                                    //if (data.phone !== null)
                                    //	query.$or.push({phone: data.phone});
                                    if (res_contact.phone_mobile)
                                        query.$or.push({
                                            phone_mobile: res_contact.phone_mobile
                                        });

                                    if (!query.$or.length) {
                                        //console.log(data.name);
                                        //console.log(already_imported[data.name]);
                                        query = {
                                            "societe.id": already_imported[data[idx]].id,
                                            lastname: (res_contact.lastname ? res_contact.lastname.toUpperCase() : "")
                                        };
                                    }

                                    //console.log(query);

                                    ContactModel.findOne(query, function(err, contact) {

                                        if (err) {
                                            console.log(err);
                                            return callback();
                                        }

                                        if (contact == null) {
                                            console.log("contact created");
                                            contact = new ContactModel(res_contact);
                                        } else {
                                            console.log("Contact found");

                                            if (res_contact.Tag)
                                                res_contact.Tag = _.union(contact.Tag, res_contact.Tag); // Fusion Tag

                                            contact = _.extend(contact, res_contact);
                                        }

                                        // Copy address societe
                                        if (!contact.zip) {
                                            contact.address = data.address;
                                            contact.zip = data.zip;
                                            contact.town = data.town;
                                        }

                                        //console.log(data);

                                        //console.log(row[10]);
                                        //console.log(contact);
                                        //console.log(societe.datec);

                                        contact.save(function(err, doc) {
                                            if (err)
                                                console.log(err);

                                            cb(null, doc);
                                        });
                                    });
                                }
                            ], function(err, results) {
                                if (err)
                                    return console.log(err);



                                callback();
                            });
                        });

                        //return row;
                    })
                    .on("end", function(count) {
                        console.log('Number of lines: ' + count);
                        /*fs.unlink(self.files[0].path, function(err) {
                         if (err)
                         console.log(err);
                         });*/
                        return self.json({
                            count: count
                        });
                    })
                    .on('error', function(error) {
                        console.log(error.message);
                    });
            }
        });
    }, ['upload'], 10240);
    F.route('/erp/api/societe/import/deliveryAddress', function() {
        var fixedWidthString = require('fixed-width-string');
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        if (self.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
            return self.throw401("Error key");

        var idx = 'oldId'; //index d'import pour le dedoublonnage et la recherche d'existant
        if (self.query.idx)
            idx = self.query.idx;

        /**
         * oldId;name;address;zip;town
         *
         */

        /*
         * Tri par name obligatoire
         */

        var convertRow = function(tab, row, index, cb) {
            var societe = {};
            societe.country_id = "FR";
            societe.Tag = [];
            societe.contact = {
                Tag: []
            };
            societe.remise_client = 0;

            for (var i = 0; i < row.length; i++) {
                if (tab[i] === "false")
                    continue;

                switch (tab[i]) {
                    case "name":
                        if (row[i])
                            societe.name = row[i].trim().toUpperCase();
                        break;
                    case "address":
                        if (row[i]) {
                            if (societe.address)
                                societe.address += "\n" + row[i];
                            else
                                societe.address = row[i];
                        }
                        break;
                    case "zip":
                        if (row[i])
                            societe.zip = fixedWidthString(row[i], 5, { padding: '0', align: 'right' });
                    case "BP":
                        if (row[i]) {
                            societe.address += "\n" + row[i].substr(0, row[i].indexOf(','));
                        }
                        break;
                    default:
                        if (row[i])
                            societe[tab[i]] = row[i];
                }
            }
            //console.log(societe);
            cb(societe);
        };

        if (self.files.length > 0) {
            console.log(self.files[0].filename);

            var tab = [];

            csv()
                .from.path(self.files[0].path, {
                    delimiter: ';',
                    escape: '"'
                })
                .transform(function(row, index, callback) {
                    if (index === 0) {
                        tab = row; // Save header line
                        return callback();
                    }
                    //console.log(tab);
                    //console.log(row);

                    //console.log(row[0]);

                    //return;
                    convertRow(tab, row, index, function(data) {
                        //
                        //  Test si societe deja importe
                        //

                        //import societe
                        if (data[idx]) {
                            var req = {};
                            req[idx] = data[idx];

                            SocieteModel.findOne(req, function(err, societe) {
                                if (err) {
                                    console.log(err);
                                    return callback(err);
                                }

                                if (societe == null)
                                    return callback("Societe not found", null);

                                // search if address already exist ?
                                var found = false;
                                for (var i = 0, len = societe.addresses.length; i < len; i++) {

                                    if (societe.addresses[i].name == data.name) {
                                        found = true;
                                        societe.addresses[i] = {
                                            name: data.name,
                                            address: data.address,
                                            zip: data.zip,
                                            town: data.town
                                        };
                                    }
                                }

                                if (!found) {
                                    societe.addresses.push({
                                        name: data.name,
                                        address: data.address,
                                        zip: data.zip,
                                        town: data.town
                                    });
                                    console.log("Update societe ", societe._id);
                                }

                                //console.log(row[10]);
                                //if (societe.commercial_id) {
                                //console.log(societe)
                                //console.log(societe.datec);
                                //}

                                societe.save(function(err, doc) {
                                    if (err) {
                                        console.log(societe, err);
                                        return callback(err);
                                    }

                                    callback(err);

                                });

                            });
                        } else
                            callback("_id or code_client or oldId missing", null);
                    });
                })
                .on("end", function(count) {
                    console.log('Number of lines: ' + count);
                    /*fs.unlink(self.files[0].path, function(err) {
                     if (err)
                     console.log(err);
                     });*/
                    return self.json({
                        count: count
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    }, ['upload'], 10240);
    /*
     app.post('/api/societe/notes/import', function (req, res) {
     if (req.query.key !== "COvy9NRXD2FEYjSQU6q3LM7HcdKesflGTB")
     return res.send(401);
     
     var convertRow = function (tab, row, index, cb) {
     var societe = {};
     
     for (var i = 0; i < row.length; i++) {
     if (tab[i] === "false")
     continue;
     
     switch (tab[i]) {
     case "notes":
     if (row[i]) {
     
     societe[tab[i]] = {
     author: {
     name: "Inconnu"
     },
     datec: new Date(),
     note: row[i]
     };
     }
     break;
     default :
     if (row[i])
     societe[tab[i]] = row[i];
     }
     }
     //console.log(societe);
     cb(societe);
     };
     
     if (req.files) {
     var filename = req.files.filedata.path;
     if (fs.existsSync(filename)) {
     
     var tab = [];
     
     csv()
     .from.path(filename, {delimiter: ';', escape: '"'})
     .transform(function (row, index, callback) {
     if (index === 0) {
     tab = row; // Save header line
     return callback();
     }
     //console.log(tab);
     //console.log(row);
     
     //console.log(row[0]);
     
     //return;
     
     convertRow(tab, row, index, function (data) {
     
     if (!data.notes.note) {
     return callback();
     }
     
     SocieteModel.findOne({oldId: data.oldId}, function (err, societe) {
     if (err) {
     console.log(err);
     return callback();
     }
     
     if (societe == null) {
     console.log("Societe not found : " + data.oldId);
     return callback();
     }
     
     societe.notes.push(data.notes);
     //console.log(data.notes);
     
     //console.log(societe);
     
     societe.save(function (err, doc) {
     if (err)
     console.log(err);
     
     callback();
     });
     
     });
     });
     
     //return row;
     })
     .on("end", function (count) {
     console.log('Number of lines: ' + count);
     fs.unlink(filename, function (err) {
     if (err)
     console.log(err);
     });
     return res.send(200, {count: count});
     })
     .on('error', function (error) {
     console.log(error.message);
     });
     }
     }
     });
     
     app.post('/api/societe/file/:Id', auth.requiresLogin, function (req, res) {
     var id = req.params.Id;
     //console.log(id);
     
     if (req.files && id) {
     //console.log(req.files);
     
     gridfs.addFile(SocieteModel, id, req.files.file, function (err, result) {
     if (err)
     return res.send(500, err);
     
     return res.send(200, result);
     });
     } else
     res.send(500, "Error in request file");
     });
     
     app.get('/api/societe/file/:Id/:fileName', auth.requiresLogin, function (req, res) {
     var id = req.params.Id;
     
     if (id && req.params.fileName) {
     
     gridfs.getFile(SocieteModel, id, req.params.fileName, function (err, store) {
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
     
     });
     
     app.del('/api/societe/file/:Id/:fileNames', auth.requiresLogin, function (req, res) {
     console.log(req.body);
     var id = req.params.Id;
     //console.log(id);
     
     if (req.params.fileNames && id) {
     gridfs.delFile(SocieteModel, id, req.params.fileNames, function (err) {
     if (err)
     res.send(500, err);
     else
     res.send(200, {status: "ok"});
     });
     } else
     res.send(500, "File not found");
     });
     
     app.get('/api/societe/contact/select', auth.requiresLogin, function (req, res) {
     //console.log(req.query);
     var result = [];
     
     if (req.query.societe)
     ContactModel.find({"societe.id": req.query.societe}, "_id name", function (err, docs) {
     if (err)
     console.log(err);
     
     if (docs === null)
     return res.send(200, []);
     
     for (var i in docs) {
     var contact = {};
     contact.id = docs[i]._id;
     contact.name = docs[i].name;
     
     result.push(contact);
     }
     res.send(200, result);
     });
     else
     ContactModel.find({}, "_id name", function (err, docs) {
     if (err)
     console.log(err);
     
     if (docs === null)
     return res.send(200, []);
     
     for (var i in docs) {
     var contact = {};
     contact.id = docs[i]._id;
     contact.name = docs[i].name;
     
     result.push(contact);
     }
     res.send(200, result);
     });
     });
     
     app.param('societeId', object.societe);*/

    //other routes..
};

function view_index() {
    var self = this;
    //console.log(self.session);

    self.layout(CONFIG('theme') || 'layout3');
    self.view('index');
}

/*function view_fiche(id) {
 var self = this;
 //console.log(self.session);
 
 self.layout(CONFIG('theme') || 'layout3');
 self.view('fiche', {id: id});
 }*/

function Object() {}

function societe(id, cb) {
    var SocieteModel = MODEL('Customers').Schema;

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
            'salesPurchases.ref': id
        };

    //console.log(query);

    SocieteModel.findOne(query, function(err, doc) {
        if (err)
            return console.log(err);

        //console.log(doc);
        cb(doc);
    });
}

Object.prototype = {
    read: function() {
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        var query = {
            entity: {
                $in: ["ALL", self.user.entity]
            }
        };

        if (self.query.query) {
            switch (self.query.query) {
                case "CUSTOMER":
                    query.Status = {
                        "$nin": ["ST_NO", "ST_NEVER"]
                    };
                    break;
                case "SUPPLIER":
                    query.fournisseur = "SUPPLIER";
                    break;
                case "SUBCONTRACTOR":
                    query.fournisseur = "SUBCONTRACTOR";
                    break;
                case "SUSPECT":
                    query.Status = {
                        "$in": ["ST_NO", "ST_NEVER"]
                    };
                    break;
                default: //ALL
                    break;
            }
        }

        if (self.req.query.Status)
            query.Status = self.query.Status;

        if (self.req.query.commercial_id)
            query["commercial_id.id"] = self.query.commercial_id;

        var fields = "-history -files";

        if (self.req.query.fields)
            fields = self.query.fields;

        if (self.req.query.filter) {
            query.$or = [{
                name: new RegExp(req.query.filter, "gi")
            }, {
                code_client: new RegExp(req.query.filter, "gi")
            }, {
                Tag: new RegExp(req.query.filter, "gi")
            }, {
                "segmentation.label": new RegExp(req.query.filter, "g")
            }];
            //query.$text = {$search: req.query.filter, $language: "fr"};
        }

        if (!self.user.rights.societe.seeAll && !self.user.admin)
            query["commercial_id.id"] = self.user._id;

        /*console.log(query);
         
         if (req.query.filter)
         SocieteModel.search({query: req.query.filter}, function (err, result) {
         console.log(err);
         });*/

        SocieteModel.find(query, fields, {
            skip: parseInt(self.query.skip, 10) * parseInt(self.query.limit, 10) || 0,
            limit: self.query.limit || 100,
            sort: JSON.parse(self.query.sort || {})
        }, function(err, doc) {
            if (err) {
                console.log(err);
                self.send(500, doc);
                return;
            }

            //console.log(doc);

            self.json(doc);
        });
    },
    readDT: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.req.body.query);

        //console.log(self.query);

        var conditions = {
            isremoved: { $ne: true },
            company: null
        };

        if (self.query.entity != 'null')
            conditions.entity = self.query.entity;
        //                $in: [self.query.entity]
        //}

        //if (!self.user.multiEntities)
        //    conditions.entity = { $in: ["ALL", self.user.entity] };

        //if (!query.search.value)
        switch (self.query.type) {
            case "CUSTOMER":
                conditions['salesPurchases.isCustomer'] = true;
                break;
            case "PROSPECT":
                conditions['salesPurchases.isProspect'] = true;
                break;
            case "PROSPECT_CUSTOMER":
                conditions.$or = [
                    { 'salesPurchases.isProspect': true },
                    { 'salesPurchases.isCustomer': true }
                ];
                break;
            case "SUPPLIER":
                conditions['salesPurchases.isSupplier'] = true;
                break;
            case "SUBCONTRACTOR":
                conditions['salesPurchases.isSubcontractor'] = true;
                break;
            case "SUPPLIER_SUBCONTRACTOR":
                conditions.$or = [
                    { 'salesPurchases.isSupplier': true },
                    { 'salesPurchases.isSubcontractor': true }
                ];
                break;
            default: //ALL
                break;
        }


        /*if (!query.search.value) {
            if (self.query.status_id !== 'null')
                conditions.Status = self.query.status_id;
        } else
            delete conditions.Status;

        if (self.query.prospectlevel !== 'null')
            conditions.prospectlevel = self.query.prospectlevel;
        */
        if (self.req.query.commercial_id !== 'null')
            conditions["commercial_id.id"] = self.query.commercial_id;

        if (!self.user.rights.societe.seeAll && !self.user.admin)
            conditions["commercial_id.id"] = self.user._id;

        var options = {
            conditions: conditions,
            select: 'type salesPurchases.isActive'
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                Dict.dict({
                    //dictName: "fk_stcomm",
                    dictName: "fk_user_status",
                    object: true
                }, cb);
            },
            level: function(cb) {
                Dict.dict({
                    dictName: "fk_prospectlevel",
                    object: true
                }, cb);
            },
            datatable: function(cb) {
                SocieteModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            //console.log(res);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();

                if (row.Tag)
                    res.datatable.data[i].Tag = row.Tag.toString();
                // Add url on name
                res.datatable.data[i].name.last = '<a class="with-tooltip" href="#!/societe/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name.last + '"><span class="icon-home"></span> ' + row.name.last + '</a>';
                // Convert Date
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                // Convert Status
                //res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + res.status.values[row.Status].label + '</span>' : row.Status);
                res.datatable.data[i].Status = (row.salesPurchases.isActive ? '<span class="label label-sm ' + res.status.values['ENABLE'].cssClass + '">' + res.status.values['ENABLE'].label + '</span>' : '<span class="label label-sm ' + res.status.values['DISABLE'].cssClass + '">' + res.status.values['DISABLE'].label + '</span>');
                // Convert Potentiel
                if (res.level.values[row.prospectlevel])
                    if (res.level.values[row.prospectlevel].label)
                        res.datatable.data[i].prospectlevel = res.level.values[row.prospectlevel].label;
                    else
                        res.datatable.data[i].prospectlevel = i18n.t("companies:" + row.prospectlevel);
                else
                    res.datatable.data[i].prospectlevel = row.prospectlevel;
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    },
    readDT_supplier: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        var query = JSON.parse(self.req.body.query);

        //console.log(self.query);

        var conditions = {
            isremoved: { $ne: true },
            company: null
        };

        if (self.query.entity != 'null')
            conditions.entity = self.query.entity;
        //                $in: [self.query.entity]
        //}

        //if (!self.user.multiEntities)
        //    conditions.entity = { $in: ["ALL", self.user.entity] };

        //if (!query.search.value)
        switch (self.query.type) {
            case "CUSTOMER":
                conditions['salesPurchases.isCustomer'] = true;
                break;
            case "PROSPECT":
                conditions['salesPurchases.isProspect'] = true;
                break;
            case "PROSPECT_CUSTOMER":
                conditions.$or = [
                    { 'salesPurchases.isProspect': true },
                    { 'salesPurchases.isCustomer': true }
                ];
                break;
            case "SUPPLIER":
                conditions['salesPurchases.isSupplier'] = true;
                break;
            case "SUBCONTRACTOR":
                conditions['salesPurchases.isSubcontractor'] = true;
                break;
            case "SUPPLIER_SUBCONTRACTOR":
                conditions.$or = [
                    { 'salesPurchases.isSupplier': true },
                    { 'salesPurchases.isSubcontractor': true }
                ];
                break;
            default: //ALL
                break;
        }


        /*if (!query.search.value) {
            if (self.query.status_id !== 'null')
                conditions.Status = self.query.status_id;
        } else
            delete conditions.Status;

        if (self.query.prospectlevel !== 'null')
            conditions.prospectlevel = self.query.prospectlevel;
        */
        if (self.req.query.commercial_id !== 'null')
            conditions["commercial_id.id"] = self.query.commercial_id;

        if (!self.user.rights.societe.seeAll && !self.user.admin)
            conditions["commercial_id.id"] = self.user._id;

        var options = {
            conditions: conditions,
            select: 'type'
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                Dict.dict({
                    dictName: "fk_stcomm",
                    object: true
                }, cb);
            },
            level: function(cb) {
                Dict.dict({
                    dictName: "fk_prospectlevel",
                    object: true
                }, cb);
            },
            datatable: function(cb) {
                SocieteModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            //console.log(res);

            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                var row = res.datatable.data[i];

                // Add checkbox
                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                // Add id
                res.datatable.data[i].DT_RowId = row._id.toString();

                if (row.Tag)
                    res.datatable.data[i].Tag = row.Tag.toString();
                // Add url on name
                res.datatable.data[i].name.last = '<a class="with-tooltip" href="#!/societe/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name.last + '"><span class="icon-home"></span> ' + row.name.last + '</a>';
                // Convert Date
                res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                // Convert Status
                res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + res.status.values[row.Status].label + '</span>' : row.Status);
                // Convert Potentiel
                if (res.level.values[row.prospectlevel])
                    if (res.level.values[row.prospectlevel].label)
                        res.datatable.data[i].prospectlevel = res.level.values[row.prospectlevel].label;
                    else
                        res.datatable.data[i].prospectlevel = i18n.t("companies:" + row.prospectlevel);
                else
                    res.datatable.data[i].prospectlevel = row.prospectlevel;
            }

            //console.log(res.datatable);

            self.json(res.datatable);
        });
    },
    show: function(id) {
        var self = this;
        if (self.user.rights.societe.read)
            return societe(id, function(societe) {
                self.json(societe);
            });

        return self.throw403(); // access forbidden

    },
    count: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        var query = {
            isremoved: { $ne: true },
            $or: [{
                entity: "ALL"
            }, {
                entity: self.user.entity // Add a comment
            }]
        };

        if (self.req.query.query) {
            switch (self.req.query.query) {
                case "CUSTOMER":
                    query.Status = {
                        "$nin": ["ST_NO", "ST_NEVER"]
                    };
                    break;
                case "SUPPLIER":
                    query.fournisseur = "SUPPLIER";
                    break;
                case "SUBCONTRACTOR":
                    query.fournisseur = "SUBCONTRACTOR";
                    break;
                case "SUSPECT":
                    query.Status = {
                        "$in": ["ST_NO", "ST_NEVER"]
                    };
                    break;
                default: // ALL
                    break;
            }
        }

        if (self.req.query.Status)
            query.Status = self.req.query.Status;

        if (self.req.query.commercial_id)
            query["commercial_id.id"] = self.req.query.commercial_id;

        if (!self.user.rights.societe.seeAll && !self.user.admin)
            query["commercial_id.id"] = self.user._id;

        SocieteModel.count(query, function(err, doc) {
            if (err) {
                console.log(err);
                self.send(500, doc);
                return;
            }

            self.json({
                count: doc
            });
        });
    },
    create: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        var societe = new SocieteModel(self.body);
        societe.author = {};
        societe.author.id = self.user._id;
        societe.author.name = self.user.name;

        societe.addresses.push({
            name: societe.name,
            address: societe.address,
            zip: societe.zip,
            town: societe.town,
            Status: 'ENABLE'
        });

        if (!societe.entity)
            societe.entity = self.user.entity;

        //console.log(societe);
        var oldData = {
            versionId: null,
            versionOfId: societe._id,
            data: societe.toObject()
        };

        SocieteModel.saveVersion(oldData, function(err, doc) {
            if (err)
                console.log(err);
            self.json(doc);
        });
    },
    uniqId: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        if (!self.query.idprof2)
            return res.send(404);

        SocieteModel.findOne({
            idprof2: self.query.idprof2
        }, "name entity", function(err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return self.json({});

            self.json(doc);
        });

    },
    update: function(id) {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        societe(id, function(societe) {

            societe = _.extend(societe, self.body);
            societe.user_modif = self.user._id;
            //console.log(self.body);

            var oldData = {
                versionId: null,
                versionOfId: societe._id,
                data: societe.toObject()
            };

            SocieteModel.saveVersion(oldData, function(err, doc) {
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
                    message: "Societe enregistree"
                };
                self.json(doc);
            });

        });
        //});
    },
    updateField: function(id, field) {
        var self = this;
        societe(id, function(societe) {

            if (self.body.value) {
                societe[field] = self.body.value;

                societe.save(function(err, doc) {
                    self.json(doc);
                });
            } else
                self.send(500);
        });
    },
    destroy: function(id) {
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        SocieteModel.update({
            _id: id
        }, { $set: { isremoved: true } }, function(err) {
            if (err)
                self.throw500(err);
            else
                self.json({});
        });
    },
    destroyList: function() {
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        if (!this.query.id)
            return self.throw500("No ids in destroy list");

        //var list = JSON.parse(this.query.id);
        var list = this.query.id;
        if (!list)
            return self.throw500("No ids in destroy list");

        var ids = [];

        if (typeof list === 'object')
            ids = list;
        else
            ids.push(list);

        SocieteModel.update({
            _id: { $in: ids }
        }, { $set: { isremoved: true } }, function(err) {
            if (err)
                self.throw500(err);
            else
                self.json({});
        });
    },
    segmentation: function(req, res) {
        var SocieteModel = MODEL('Customers').Schema;

        var segmentationList = {};
        DictModel.findOne({
            _id: "fk_segmentation"
        }, function(err, docs) {
            if (docs) {
                segmentationList = docs.values;
            }

            SocieteModel.aggregate([{
                $project: {
                    _id: 0,
                    segmentation: 1
                }
            }, {
                $unwind: "$segmentation"
            }, {
                $group: {
                    _id: "$segmentation.text",
                    count: {
                        $sum: 1
                    }
                }
            }], function(err, docs) {
                if (err)
                    return console.log("err : /api/societe/segmentation/autocomplete", err);

                var result = [];
                if (docs == null)
                    docs = [];

                for (var i = 0; i < docs.length; i++) {

                    result[i] = docs[i];
                    if (segmentationList[docs[i]._id])
                        result[i].attractivity = segmentationList[docs[i]._id].attractivity;
                }

                //console.log(result);

                return res.send(200, result);
            });
        });
    },
    segmentationUpdate: function(req, res) {
        DictModel.findOne({
            _id: "fk_segmentation"
        }, function(err, doc) {
            if (doc == null)
                return console.log("fk_segmentation doesn't exist !");

            if (req.body.attractivity)
                doc.values[req.body._id] = {
                    label: req.body._id,
                    attractivity: req.body.attractivity
                };
            else if (doc.values[req.body._id])
                delete doc.values[req.body._id];

            doc.markModified('values');

            doc.save(function(err, doc) {
                if (err)
                    console.log(err);
            });

            res.send(200);

        });
    },
    segmentationDelete: function(req, res) {
        var SocieteModel = MODEL('Customers').Schema;

        //console.log(req.body);
        SocieteModel.update({
                'segmentation.text': req.body._id
            }, {
                $pull: {
                    segmentation: {
                        text: req.body._id
                    }
                }
            }, {
                multi: true
            },
            function(err) {
                res.send(200);
            });
    },
    segmentationRename: function(req, res) {
        var SocieteModel = MODEL('Customers').Schema;

        console.log(req.body);
        SocieteModel.update({
                'segmentation.text': req.body.old
            }, {
                $push: {
                    segmentation: {
                        text: req.body.new
                    }
                }
            }, {
                multi: true
            },
            function(err) {
                if (err)
                    return console.log(err);

                SocieteModel.update({
                        'segmentation.text': req.body.old
                    }, {
                        $pull: {
                            segmentation: {
                                text: req.body.old
                            }
                        }
                    }, {
                        multi: true
                    },
                    function(err) {
                        if (err)
                            console.log(err);
                        res.send(200);
                    });
            });
    },
    statistic: function() {
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;

        //console.log(self.req.query);

        async.parallel({
                own: function(cb) {
                    Dict.dict({
                        dictName: "fk_stcomm",
                        object: true
                    }, function(err, dict) {
                        SocieteModel.aggregate([{
                            $match: {
                                entity: {
                                    $in: ["ALL", self.user.entity]
                                },
                                Status: {
                                    $nin: ["ST_NO"]
                                },
                                "commercial_id.id": "user:" + self.req.query.name
                            }
                        }, {
                            $project: {
                                _id: 0,
                                "Status": 1
                            }
                        }, {
                            $group: {
                                _id: "$Status",
                                count: {
                                    $sum: 1
                                }
                            }
                        }], function(err, docs) {

                            for (var i = 0; i < docs.length; i++) {
                                docs[i]._id = dict.values[docs[i]._id];
                            }

                            cb(err, docs || []);
                        });
                    });
                },
                commercial: function(cb) {
                    var query = {};

                    if (self.user.rights.societe.seeAll || self.user.admin) {
                        query = {
                            entity: {
                                $in: ["ALL", self.user.entity]
                            },
                            "commercial_id.id": {
                                $ne: null
                            }
                        };
                        if (self.req.query.commercial_id)
                            query["commercial_id.id"] = self.req.query.commercial_id;
                    } else
                        query = {
                            entity: {
                                $in: ["ALL", self.user.entity]
                            },
                            "commercial_id.id": self.user._id
                        };

                    query.isremoved = { $ne: true };

                    SocieteModel.aggregate([{
                        $match: query
                    }, {
                        $project: {
                            _id: 0,
                            "commercial_id.id": 1,
                            "commercial_id.name": 1
                        }
                    }, {
                        $group: {
                            _id: {
                                id: "$commercial_id.id",
                                name: "$commercial_id.name"
                            },
                            count: {
                                $sum: 1
                            }
                        }
                    }, {
                        $sort: {
                            "_id.name": 1
                        }
                    }], function(err, docs) {
                        //console.log(docs);
                        cb(err, docs || []);
                    });
                },
                status: function(cb) {
                    SocieteModel.aggregate([{
                        $match: {
                            entity: {
                                $in: ["ALL", self.user.entity]
                            },
                            "commercial_id.name": {
                                $ne: null
                            }
                        }
                    }, {
                        $project: {
                            _id: 0,
                            "commercial_id.id": 1,
                            "Status": 1
                        }
                    }, {
                        $group: {
                            _id: {
                                commercial: "$commercial_id.id",
                                Status: "$Status"
                            },
                            count: {
                                $sum: 1
                            }
                        }
                    }], function(err, docs) {
                        cb(err, docs || []);
                    });
                },
                fk_status: function(cb) {
                    cb(null, {});
                    return;
                    Dict.dict({
                        dictName: "fk_stcomm",
                        object: true
                    }, function(err, doc) {
                        var result = [];

                        for (var i in doc.values) {

                            if (doc.values[i].enable && doc.values[i].order) {
                                doc.values[i].id = i;
                                result.push(doc.values[i]);
                            }
                        }

                        result.sort(function(a, b) {
                            return a.order > b.order;
                        });

                        cb(err, result);
                    });
                }
            },
            function(err, results) {
                if (err)
                    return console.log(err);

                var output = {
                    data: [],
                    commercial: results.commercial,
                    status: results.fk_status,
                    own: results.own
                };

                for (var i = 0; i < results.commercial.length; i++) {
                    for (var j = 0; j < results.fk_status.length; j++) {

                        if (j === 0)
                            output.data[i] = [];

                        output.data[i][j] = 0;

                        for (var k = 0; k < results.status.length; k++) {
                            //console.log(results.commercial[i]);
                            //console.log(results.fk_status[j]);
                            //console.log(results.status[k]);
                            //console.log("----------------------------");

                            if (results.commercial[i]._id.id === results.status[k]._id.commercial &&
                                results.fk_status[j].id === results.status[k]._id.Status) {
                                output.data[i][j] = results.status[k].count;
                                break;
                            }

                        }
                    }
                }

                //console.log(output);
                self.json(output);
            });
    },
    export: function() {
        var Stream = require('stream');
        var stream = new Stream();

        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        if (!self.user.admin)
            return console.log("export non autorised");

        var json2csv = require('json2csv');

        SocieteModel.find({ isremoved: { $ne: true } }, function(err, societes) {
            //console.log(societe);

            async.forEach(societes, function(societe, cb) {
                json2csv({
                    data: societe,
                    fields: ['_id', 'code_client', 'name', 'address', 'zip', 'town', 'Status', 'commercial_id', 'phone', 'fax', 'email', 'url', 'prospectlevel', 'rival', 'Tag', 'segmentation', 'familyProduct', 'entity', 'idprof1', 'idprof2', 'idprof3', 'idprof6'],
                    del: ";"
                }, function(err, csv) {
                    if (err)
                        return console.log(err);

                    stream.emit('data', csv);
                    cb();
                });
            }, function() {
                stream.emit('end');

                //self.res.setHeader('application/text');


                //res.attachment('societe_' + dateFormat(new Date(), "ddmmyyyy_HH:MM") + '.csv');
                //self.send(csv);

                //console.log(csv);
            });
        });

        self.stream('application/text', stream, 'societe_' + moment().format('YYYYMMDD_HHmm') + '.csv');
    },
    listCommercial: function(req, res) {
        var SocieteModel = MODEL('Customers').Schema;

        var query = {};

        query = {
            entity: {
                $in: ["ALL", req.query.entity]
            },
            "commercial_id.name": {
                $ne: null
            }
        };

        SocieteModel.aggregate([{
            $match: query
        }, {
            $project: {
                _id: 0,
                "commercial_id.id": 1,
                "commercial_id.name": 1
            }
        }, {
            $group: {
                _id: {
                    id: "$commercial_id.id",
                    name: "$commercial_id.name"
                }
            }
        }], function(err, doc) {

            if (err)
                return console.log(err);

            //console.log(doc);

            res.json(doc);
        });
    }
};

function Report() {}

Report.prototype = {
    report: function(req, res, next, id) {
        var ReportModel = MODEL('report').Schema;

        ReportModel.findOne({ _id: id }, function(err, doc) {
            if (err)
                return next(err);
            if (!doc)
                return next(new Error('Failed to load report ' + id));

            req.report = doc;
            next();
        });
    },
    create: function(req, res, usersSocket) {

        var reportModel = new ReportModel(req.body);
        //console.log(req.body);

        function object2array(input) {
            var out = [];
            for (var i in input) {
                input[i].id = i;
                out.push(input[i]);
            }
            return out;
        }

        object2array(req.body.actions).forEach(function(action) {
            if (!action.type || action.type == "NONE")
                return;

            //console.log(action);
            //console.log(actioncomm);

            var datef = null;

            if (action.datef)
                datef = action.datef;
            else if (!action.datep) {
                datef = new Date();
                datef.setDate(datef.getDate() + action.delay);
            }

            var task = {
                name: i18n.t("tasks:" + action.id) + " (" + req.body.societe.name + ")",
                societe: req.body.societe,
                contact: req.body.contacts[0] || null,
                datec: new Date(),
                datep: action.datep || null, // date de debut
                datef: datef || null,
                type: action.type,
                entity: req.user.entity,
                notes: [{
                    author: {
                        id: req.user._id,
                        name: req.user.firstname + " " + req.user.lastname
                    },
                    datec: new Date(),
                    percentage: 0,
                    note: i18n.t("tasks:" + action.id) + " " + i18n.t("tasks:" + action.type) + "\nCompte rendu du " + moment(req.body.datec).format(CONFIG('dateformatShort'))
                }],
                lead: req.body.lead
            };

            //console.log(task);

            Task.create(task, req.user, usersSocket, function(err, task) {
                if (err)
                    console.log(err);
                //	console.log(task);
            });

        });

        reportModel.save(function(err, doc) {
            if (err) {
                return console.log(err);
            }

            res.json(doc);
        });
    },
    read: function() {
        var ReportModel = MODEL('report').Schema;
        var query = {};
        var fields = "";
        var self = this;

        //console.log(self.query);

        if (self.query.fields) {
            fields = self.query.fields;
        }

        if (self.query.month || self.query.year) {

            var dateStart = new Date(self.query.year, self.query.month, 1);
            var dateEnd = new Date(self.query.year, parseInt(self.query.month, 10) + 1, 1);

            query.createdAt = { $gte: dateStart, $lt: dateEnd };
        }

        ReportModel.find(query, fields)
            .populate("lead.id", "status")
            .sort({ createdAt: -1 })
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                    self.throw500(err);
                    return;
                }

                self.json(doc);
            });
    },
    show: function(req, res) {
        //console.log("show : " + req.report);
        res.json(req.report);
    },
    listReports: function(req, res) {
        var ReportModel = MODEL('report').Schema;

        var user = req.query.user;

        var query = {
            "author.id": {
                "$nin": [user]
            },
            entity: req.query.entity
        };
        ReportModel.find(query, {}, {
            limit: req.query.limit,
            sort: {
                createdAt: -1 //Sort by Date created DESC
            }
        }, function(err, doc) {
            if (err) {
                console.log(err);
                res.send(500, doc);
                return;
            }

            res.send(200, doc);
        });
    },
    update: function(req, res) {

        var report = req.report;
        report = _.extend(report, req.body);

        report.save(function(err, doc) {

            if (err)
                return console.log(err);

            res.json(doc);
        });
    },
    /*convertTask: function (req, res) {
     ReportModel.aggregate([
     {$match: {"actions.0": {$exists: true}}},
     {$unwind: "$actions"}
     ], function (err, docs) {
     if (err)
     console.log(err);
     
     docs.forEach(function (doc) {
     
     console.log(doc);
     
     var task = {
     societe: doc.societe,
     contact: doc.contacts[0] || null,
     datec: doc.createdAt,
     datep: doc.dueDate,
     datef: doc.dueDate,
     entity: doc.entity,
     author: doc.author,
     usertodo: doc.author,
     notes: [
     {
     author: doc.author,
     datec: doc.createdAt,
     percentage: 0
     }
     ],
     lead: doc.leads || null
     };
     
     switch (doc.actions.type) {
     case "Réunion interne":
     task.type = "AC_INTERNAL";
     break;
     case "plaquette":
     task.type = "AC_DOC";
     break;
     case "prochain rendez-vous":
     task.type = "AC_PRDV";
     break;
     case "Rendez-vous":
     task.type = "AC_RDV";
     break;
     case "offre":
     task.type = "AC_PROP";
     break;
     case "visite atelier":
     task.type = "AC_AUDIT";
     break;
     case "prochaine action":
     task.type = "AC_REVIVAL";
     break;
     default:
     console.log("Manque " + doc.actions.type);
     }
     
     task.name = i18n.t("tasks:" + task.type) + " (" + doc.societe.name + ")";
     task.notes[0].note = doc.actions.type + " " + i18n.t("tasks:" + task.type) + "\nCompte rendu du " + dateFormat(task.datec, CONFIG('dateformatShort'));
     
     console.log(task);
     
     Task.create(task, null, null, function (err, task) {
     if (err)
     console.log(err);
     //	console.log(task);
     });
     
     });
     res.send(200);
     });
     }*/
};