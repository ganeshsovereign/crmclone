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

    /**
     *@api {get} /erp/api/societe Request Customers
     *
     * @apiVersion 0.0.1
     * @apiName getCustomers
     * @apiGroup Customers
     *
     * @apiSuccess {Object} Customers
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
   data: [
     {
       _id: "55ba0301d79a3a343900000d",
       __v: 0,
       channel: null,
       integrationId: "",
       companyInfo: {
         size: "574c54ec83569c287bf59583",
         industry: "574c54e22b7598157b94f1a5"
       },
       editedBy: {
         date: "2016-05-31T18:54:27.587Z",
         user: "57231ce22387d7b821a694c2"
       },
       createdBy: {
         date: "2015-07-30T10:57:05.119Z",
         user: "55ba00e9d79a3a343900000c"
       },
       history: [

       ],
       attachments: [

       ],
       notes: [

       ],
       groups: {
         group: [

         ],
         users: [

         ],
         owner: "55b9fbcdd79a3a3439000007"
       },
       whoCanRW: "everyOne",
       social: {
         LI: "https://www.linkedin.com/company/hashplay-inc",
         FB: ""
       },
       color: "#4d5a75",
       relatedUser: null,
       salesPurchases: {
         receiveMessages: 0,
         language: "English",
         reference: "",
         active: false,
         implementedBy: null,
         salesTeam: null,
         salesPerson: null,
         isSupplier: false,
         isCustomer: false
       },
       title: "",
       internalNotes: "",
       contacts: [

       ],
       phones: {
         fax: "",
         mobile: "",
         phone: ""
       },
       skype: "",
       jobPosition: "",
       website: "hashplay.net",
       shippingAddress: {
         name: "",
         country: "",
         zip: "",
         state: "",
         city: "",
         street: ""
       },
       address: {
         country: "United States",
         zip: "94107",
         state: "California",
         city: "San Francisco",
         street: "350 Townsend St. 755"
       },
       timezone: "UTC",
       department: null,
       company: null,
       email: "contact@hashplay.tv",
       imageSrc: "data:image/jpeg;base64,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",
       name: {
         last: "",
         first: "#Play"
       },
       isHidden: false,
       isOwn: false,
       type: "Company",
       fullName: "#Play ",
       id: "55ba0301d79a3a343900000d"
     }
   ],
 ...
 }
     */
    F.route('/erp/api/societe', object.getByViewType, ['authorize']);
    //F.route('/erp/api/societe', object.read, ['authorize']);
    //F.route('/erp/api/societe/dt', object.readDT, ['post', 'authorize']);
    //F.route('/erp/api/societe/dt_supplier', object.readDT_supplier, ['post', 'authorize']);
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

    // list for autocomplete
    F.route('/erp/api/societe/autocomplete', function() {
        //console.dir(this.body);
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
            'salesPurchases.isActive': true,
            'isremoved': {
                $ne: true
            },
            $and: [{
                "$or": [{
                    'name.last': {
                        $regex: new RegExp(filter),
                        $options: "xgi"
                    }
                }, {
                    'name.first': {
                        $regex: new RegExp(filter),
                        $options: "xgi"
                    }
                }, {
                    'salesPurchases.ref': new RegExp(self.body.filter.filters[0].value, "i")
                }]
            }]
        };

        if (self.body.entity)
            query.entity = self.body.entity;

        if (self.query.company)
            query.company = (self.query.company == 'null' ? null : self.query.company);

        if (self.query.type)
            query.type = self.query.type;

        //"$nin": ["ST_NO", "ST_NEVER"]
        //};

        //console.log(query);
        SocieteModel.find(query, {
                name: 1,
                salesPurchases: 1,
                address: 1,
                shippingAddress: 1,
                deliveryAddressId: 1
            }, {
                limit: 50 /*self.body.take*/ ,
                sort: {
                    'name.last': 1
                }
            })
            .populate("salesPurchases.cptBilling", "name address")
            .exec(function(err, docs) {
                if (err)
                    return console.log("err : /erp/api/societe/autocomplete", err);

                return self.json(docs || []);

                //console.log(docs);
            });
    }, ['post', 'json', 'authorize']);


    F.route('/erp/api/societe/{societeId}', object.show, ['authorize']);
    F.route('/erp/api/societe', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/societe/{societeId}', object.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/societe/', object.destroyList, ['delete', 'authorize']);
    F.route('/erp/api/societe/{societeId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/societe/{societeId}/{field}', object.updateField, ['put', 'json', 'authorize']);


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
        var UserModel = MODEL('Employees').Schema;
        var SocieteModel = MODEL('Customers').Schema;
        //var ContactModel = MODEL('contact').Schema;
        var BankModel = MODEL('bank').Schema;
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
        BankModel.find({}, function(err, banks) {
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
                    var societe = {

                    };
                    //societe.country_id = "FR";
                    //societe.Tag = [];
                    //societe.contact = {
                    //    Tag: []
                    //};
                    //societe.remise_client = 0;

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
                                    societe.zip = fixedWidthString(row[i], 5, {
                                        padding: '0',
                                        align: 'right'
                                    });
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
                                    societe['companyInfo.idprof2'] = row[i].replace(/ /g, "");
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

                                    societe.iban.id = 'FR76' + fixedWidthString(row[i], 5, {
                                        padding: '0',
                                        align: 'right'
                                    });
                                }
                                break;
                            case "rib.guichet":
                                if (row[i])
                                    societe.iban.id += fixedWidthString(row[i], 5, {
                                        padding: '0',
                                        align: 'right'
                                    });
                                break;
                            case "rib.cpt":
                                if (row[i])
                                    societe.iban.id += fixedWidthString(row[i], 11, {
                                        padding: '0',
                                        align: 'right'
                                    });
                                break;
                            case "rib.key":
                                if (row[i])
                                    societe.iban.id += fixedWidthString(row[i], 2, {
                                        padding: '0',
                                        align: 'right'
                                    });
                                break;
                            case "bank_reglement":
                                if (row[i]) {
                                    let bank = _.find(banks, _.matchesProperty('ref', row[i].trim()));
                                    societe['salesPurchases.bank_reglement'] = (bank ? bank._id : undefined);
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

                            var already_imported = {};

                            convertRow(tab, row, index, function(data) {

                                async.series([
                                    // import societe
                                    function(cb) {
                                        //
                                        //  Test si societe deja importe
                                        //

                                        //if (!data.entity)
                                        //    return cb("Entity missing");

                                        if (typeof already_imported[data[idx]] === 'undefined') {

                                            //import societe
                                            if (data[idx]) {
                                                var req = {};
                                                req[idx] = data[idx];

                                                //return console.log(data);

                                                SocieteModel.findOneAndUpdate(req, data, {
                                                    upsert: false,
                                                    multi: false,
                                                    new: true
                                                }, function(err, doc) {
                                                    if (err)
                                                        return callback(err);

                                                    if (!doc)
                                                        return cb(null, {});

                                                    /*if (societe == null) {
                                                        societe = new SocieteModel(data);
                                                        console.log("Create new societe");
                                                    } else {
                                                        societe = _.extend(societe, data);
                                                        console.log("Update societe ", societe._id);
                                                    }*/

                                                    //console.log(row[10]);
                                                    //if (societe.commercial_id) {
                                                    //console.log(societe)
                                                    //console.log(societe.datec);
                                                    //}

                                                    /*societe.save(function(err, doc) {
                                                        if (err) {
                                                            console.log(societe, err);
                                                            return cb(err);
                                                        }*/

                                                    already_imported[data[idx]] = {
                                                        id: doc._id,
                                                        name: doc.name
                                                    };

                                                    cb(err, already_imported[data[idx]]);

                                                    //});

                                                });
                                            } else
                                                cb("_id or code_client or oldId missing", null);
                                        } else {
                                            cb(null, already_imported[data[idx]]);
                                        }
                                    },
                                    //import contact
                                    /*function(cb) {
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
                                    }*/
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
                            societe.zip = fixedWidthString(row[i], 5, {
                                padding: '0',
                                align: 'right'
                            });
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

    SocieteModel.findOne(query)
        .populate("notes.author", "username")
        .exec(function(err, doc) {
            if (err)
                return console.log(err);

            //console.log(doc);
            cb(doc);
        });
}

Object.prototype = {
    getByViewType: function() {
        var self = this;
        const Customer = MODEL('Customers').Schema;
        const CustomerStatus = MODEL('Customers').Status;
        var data = self.query;
        var quickSearch = data.quickSearch;
        var paginationObject = MODULE('helper').page(self.query);
        var limit = paginationObject.limit;
        var skip = paginationObject.skip;

        Customer.query({
                query: data,
                limit: limit,
                skip: skip,
                user: self.user
            },
            function(err, result) {
                var count;
                var firstElement;
                var response = {};

                if (err)
                    return self.throw500(err);

                result = MODULE('utils').Status(result, CustomerStatus);

                if (result.length)
                    result[0].totalAll.Status = _.map(result[0].totalAll.Status, function(Status) {
                        return _.extend(Status, MODULE('utils').Status(Status._id, CustomerStatus));
                    });

                firstElement = result[0];
                count = firstElement && firstElement.total ? firstElement.total : 0;
                response.total = count;
                response.totalAll = firstElement && firstElement.totalAll ? firstElement.totalAll : {
                    count: 0,
                    late: 0,
                    Status: []
                };
                response.data = result;
                self.json(response);
            }
        )
    },

    read: function() {
        var SocieteModel = MODEL('Customers').Schema;
        var self = this;
        var query = {};

        var paginationObject = MODULE('helper').page(self.query);
        var limit = paginationObject.limit;
        var skip = paginationObject.skip;

        /*var query = {
            //entity: {
            //    $in: ["ALL", self.user.entity]
            //}
        };*/

        if (self.query.type)
            query.type = self.query.type;

        if (self.query.company)
            query.company = self.query.company;

        /*if (self.query.query) {
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
        }*/

        if (self.query.Status)
            query.Status = self.query.Status;

        if (self.query.commercial_id)
            query["commercial_id.id"] = self.query.commercial_id;

        var fields = "-history -files";

        if (self.query.field)
            fields = self.query.field;

        if (self.req.query.filter) {
            query.$or = [{
                name: new RegExp(self.query.filter, "gi")
            }, {
                code_client: new RegExp(self.query.filter, "gi")
            }, {
                Tag: new RegExp(self.query.filter, "gi")
            }, {
                "segmentation.label": new RegExp(self.query.filter, "g")
            }];
            //query.$text = {$search: req.query.filter, $language: "fr"};
        }

        //if (!self.user || !self.user.rights.societe.seeAll || !self.user.admin)
        //query["commercial_id.id"] = self.user._id;

        if (self.query.oldId)
            query = {
                oldId: self.query.oldId
            };

        //console.log(query);

        /* if (req.query.filter)
         SocieteModel.search({query: req.query.filter}, function (err, result) {
         console.log(err);
         });*/

        SocieteModel.find(query, fields, {
            skip: skip,
            limit: limit,
            sort: 'fullName'
        }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);

            self.json({
                data: doc
            });
        });
    },

    show: function(id) {
        var self = this;
        //if (self.user.rights.societe.read)
        return societe(id, function(societe) {
            self.json(societe);
        });

        //return self.throw403(); // access forbidden

    },
    count: function() {
        var self = this;
        var SocieteModel = MODEL('Customers').Schema;

        var query = {
            isremoved: {
                $ne: true
            },
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
        societe.createdBy = self.user._id;
        societe.edtitedBy = self.user._id;

        /*societe.addresses.push({
            name: societe.name,
            address: societe.address,
            zip: societe.zip,
            town: societe.town,
            Status: 'ENABLE'
        });*/

        if (!societe.entity.length)
            societe.entity.push(self.user.entity);

        //console.log(societe);
        /*var oldData = {
            versionId: null,
            versionOfId: societe._id,
            data: societe.toObject()
        };*/

        societe.save(function(err, doc) {
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
            if (self.user)
                societe.edtitedBy = self.user._id;
            //console.log(self.body);

            // Emit to refresh priceList from parent
            setTimeout2('customer:update_' + societe._id.toString(), function() {
                F.emit('customer:recalculateStatus', {
                    userId: (self.user ? self.user._id.toString() : null),
                    supplier: {
                        _id: societe._id.toString()
                    }
                });
                F.emit('customer:update', {
                    userId: (self.user ? self.user._id.toString() : null),
                    customer: societe.toJSON()
                });
            }, 500);

            /*var oldData = {
                versionId: null,
                versionOfId: societe._id,
                data: societe.toObject()
            };*/

            societe.save(function(err, doc) {
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
        }, {
            $set: {
                isremoved: true,
                Status: "ST_NO"
            }
        }, function(err) {
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
            _id: {
                $in: ids
            }
        }, {
            $set: {
                isremoved: true
            }
        }, function(err) {
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

                    query.isremoved = {
                        $ne: true
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
    /* export: function() {
          var self = this;
          var SocieteModel = MODEL('Customers').Schema;
          
          var Stream = require('stream');
          var stream = new Stream();
          
          if (!self.user.admin)
              return console.log("export non autorised");

          var json2csv = require('json2csv');

          SocieteModel.find({
              isremoved: {
                  $ne: true
              }
          }, function(err, societes) {
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
      },*/
    export: function() {
        var self = this;
        var Societe = MODEL('Customers').Schema;

        var type = self.query.type;

        const exportMap = MODULE('societe').csv;

        var Stream = require('stream');
        var stream = new Stream();

        Societe.query({
            query: self.query,
            user: self.user,
            exec: false
        }, function(err, resultQuery) {
            MODULE('exporter').exportToCsv({
                stream: stream,
                Model: Societe,
                query: resultQuery,
                map: exportMap,
                fileName: type
            }, function(err, result) {
                if (err)
                    console.log(err);

                stream.emit('end');
            });
        });

        self.res.setHeader('x-filename', 'export.csv');
        self.stream('application/text', stream, "export.csv");
    },
    listCommercial: function(req, res) {
        var SocieteModel = MODEL('Customers').Schema;

        var query = {};

        query = {
            entity: {
                $in: ["ALL", req.query.entity]
            },
            isremoved: {
                $ne: true
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

        ReportModel.findOne({
            _id: id
        }, function(err, doc) {
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
                    author: req.user._id,
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

            query.createdAt = {
                $gte: dateStart,
                $lt: dateEnd
            };
        }

        ReportModel.find(query, fields)
            .populate("lead.id", "status")
            .sort({
                createdAt: -1
            })
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
            "author": {
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