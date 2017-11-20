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
    _ = require('lodash'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    async = require('async');


const round = MODULE('utils').round;

exports.version = 0.606;

exports.install = function() {

};

F.on('load', function() {
    var install = new Install();
    var Dict = MODEL('dict').Schema;

    async.waterfall([
            function(wCb) {
                // Check release version
                Dict.findById('const', function(err, dict) {
                    if (err)
                        return console.log(err);

                    if (!dict)
                        return wCb(null, null);

                    if (dict.values.version == exports.version)
                        return wCb('No update');

                    return wCb(null, dict);
                });
            },
            function(conf, wCb) {
                // Check if new install
                if (conf && conf.values)
                    return wCb(null, conf.values);

                wCb('You need to install or update database form dump directory');
            },
            function(conf, wCb) {
                if (conf.version !== null)
                    return wCb(null, conf);

                Dict.remove({
                    _id: 'const'
                }, function(err, doc) {
                    //Migrate from before 0.5
                    wCb('You need to import dump/update database in your {0} database'.format(CONFIG('database')));
                    F.kill();
                });
            },
            //Version before 0.501
            function(conf, wCb) {
                if (conf.version >= 0.501)
                    return wCb(null, conf);

                //Drop old collection
                function dropCollection(aCb) {
                    var collectionName = ['Cart', 'Category', 'Contact', 'DolibarrModules', 'ExtraFields', 'Lead', 'Storehouse', 'Ticket', 'ZipCode'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb();
                }

                //convert entity MySoc
                function convertEntities(aCb) {
                    const EntityModel = MODEL('entity').Schema;

                    mongoose.connection.db.collection('Mysoc', function(err, collection) {
                        collection.find({}).toArray(function(err, entities) {
                            if (err)
                                return console.log(err);

                            if (!entities)
                                return aCb();

                            async.forEachSeries(entities, function(entity, eCb) {

                                EntityModel.findById(entity._id, function(newEntity) {
                                    if (newEntity)
                                        return eCb();

                                    newEntity = new EntityModel({
                                        "_id": entity._id,
                                        "name": entity.name,
                                        "address": {
                                            "street": entity.address,
                                            "city": entity.town,
                                            "state": null,
                                            "zip": entity.zip,
                                            "country": entity.country_id
                                        },
                                        "phones": {
                                            "phone": entity.phone,
                                            "mobile": "",
                                            "fax": entity.fax
                                        },
                                        "url": entity.url,
                                        "companyInfo": {
                                            "idprof1": entity.idprof1,
                                            "idprof2": entity.idprof2,
                                            "idprof3": entity.idprof3,
                                            "idprof4": entity.idprof4,
                                            "idprof6": entity.tva_intra,
                                            "capital": parseFloat(entity.capital),
                                            "effectif_id": entity.effectif_id,
                                            "forme_juridique_code": entity.forme_juridique_code
                                        },
                                        "salesPurchases": {
                                            "isActive": true,
                                            "VATIsUsed": true
                                        },
                                        "datec": entity.datec,
                                        "currency": entity.currency,
                                        "fiscal_month_start": entity.fiscal_month_start,
                                        "iban": {
                                            "bank": entity.iban.name,
                                            "rib": entity.iban.rib,
                                            "id": entity.iban.iban,
                                            "bic": entity.iban.bic
                                        },
                                        tva_mode: entity.tva_mode,
                                        "langs": [{
                                            "invoiceFoot": "P\\'enalit\\'e pour paiement tardif : inter\\^et l'egal x3 et une indemnit\\'e forfaitaire pour frais de recouvrement de 40 euros. R\\`eglement anticip\\'e, pas d'escompte."
                                        }],
                                        "logo": entity.logo,
                                        "cgv": entity.cgv,
                                        cptRef: entity.cptRef
                                    });

                                    newEntity.save(eCb);
                                });
                            }, aCb);
                        });
                    });
                }

                //Change users schema
                function users(aCb) {
                    console.log("convert users");
                    var UserModel = MODEL('Users').Schema;
                    var EmployeeModel = MODEL('Employees').Schema;

                    mongoose.connection.db.collection('users', function(err, collection) {
                        collection.find({
                            _type: 'hr'
                        }).toArray(function(err, users) {
                            if (err)
                                return console.log(err);

                            if (!users)
                                return aCb();

                            async.forEachSeries(users, function(user, eCb) {

                                if (user == null)
                                    return eCb();

                                if (!user.email)
                                    return eCb();

                                UserModel.findOne({
                                    username: user.username
                                }, function(err, newUser) {
                                    if (!newUser)
                                        newUser = new UserModel();

                                    var id = user._id;
                                    //delete user._id;

                                    //console.log(newUser);

                                    newUser = _.extend(newUser, user);

                                    if (user.Status == 'ENABLE')
                                        newUser.isEnable = true;
                                    else
                                        newUser.isEnable = false;

                                    newUser.save(function(err, doc) {
                                        if (err)
                                            return eCb(err);

                                        EmployeeModel.findOne({
                                            relatedUser: doc._id
                                        }, function(err, employee) {
                                            if (err)
                                                return eCb(err);

                                            if (!employee)
                                                employee = new EmployeeModel();

                                            employee = _.extend(employee, {
                                                relatedUser: doc._id,
                                                isEmployee: true,
                                                name: {
                                                    first: user.firstname,
                                                    last: user.lastname
                                                },
                                                emails: {
                                                    work: user.email
                                                },
                                                "jobPosition": "57cc0b0d2de00d14145d9929",
                                                "department": "57cc0a2d2de00d14145d9922",

                                                dateBirth: user.birthDate,
                                                arrivalDate: user.arrivalDate,

                                                internalNotes: {
                                                    new: user.descriptionPoste + "\n" + user.sector,
                                                    old: user.descriptionPoste + "\n" + user.sector
                                                },

                                                phones: {
                                                    mobile: user.telMobile,
                                                    phone: user.telFixe,
                                                    personal: ""
                                                },

                                                homeAddress: {
                                                    street: user.address,
                                                    city: user.town,
                                                    state: "",
                                                    zip: user.zip,
                                                    country: "FR"
                                                }
                                            });

                                            employee.save(function(err, employee) {
                                                //console.log(employee);
                                                if (err)
                                                    return eCb(err);

                                                eCb();
                                            });
                                        });
                                    });
                                });
                            }, aCb);
                        });
                    });
                }

                //Convert PriceList
                function priceList(aCb) {
                    console.log("convert priceList");
                    var PriceListModel = MODEL('priceList').Schema;
                    mongoose.connection.db.collection('PriceLevel', function(err, collection) {
                        if (err)
                            return aCb(err);
                        collection.distinct("price_level", function(err, pricelevels) {
                            if (err)
                                return aCb(err);

                            var loadPriceList = function(err) {
                                if (err)
                                    return aCb(err);

                                PriceListModel.find({}, "_id priceListCode", function(err, docs) {
                                    var priceLists = [];
                                    priceLists = _.map(docs, function(doc) {
                                        return ({
                                            name: doc.priceListCode,
                                            _id: doc._id.toString()
                                        });
                                    });

                                    aCb(null, priceLists);
                                });
                            }

                            if (!pricelevels)
                                return loadPriceList();

                            async.forEach(pricelevels, function(pricelevel, eCb) {

                                if (!pricelevel)
                                    return eCb();

                                PriceListModel.findOne({
                                    priceListCode: pricelevel
                                }, function(err, priceList) {
                                    if (err)
                                        return eCb(err);

                                    if (priceList)
                                        return eCb();

                                    //create new
                                    priceList = new PriceListModel({
                                        priceListCode: pricelevel,
                                        name: pricelevel,
                                        currency: 'EUR',
                                        isFixed: true
                                    });

                                    priceList.save(eCb);
                                });
                            }, loadPriceList);
                        });
                    });
                }

                // Load Bank
                function loadBank(priceLists, aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, priceLists, banks);
                    });
                }

                function loadEmployees(priceLists, banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                elem.relatedUser = elem.relatedUser.toString();
                                return elem;
                            });
                            aCb(err, priceLists, banks, users);
                        });
                }

                function convertAllProductPrices(priceLists, banks, employees, aCb) {
                    console.log("convert productPrices");
                    var ProductPricesModel = MODEL('productPrices').Schema;
                    mongoose.connection.db.collection('PriceLevel', function(err, collection) {
                        if (err)
                            return aCb(err);
                        collection.find({}).toArray(function(err, prices) {
                            if (err)
                                return aCb(err);

                            async.forEachSeries(prices, function(price, fCb) {
                                //console.log(price, priceLists, _.find(priceLists, _.matchesProperty('name', price.price_level.replace(/\ /g, '_')))._id);

                                ProductPricesModel.findOne({
                                    priceLists: _.find(priceLists, _.matchesProperty('name', price.price_level.replace(/\ /g, '_')))._id,
                                    product: price.product
                                }, function(err, newPrice) {
                                    if (err)
                                        return fCb(err);

                                    if (!newPrice)
                                        newPrice = new ProductPricesModel({
                                            priceLists: _.find(priceLists, _.matchesProperty('name', price.price_level.replace(/\ /g, '_')))._id,
                                            product: price.product,
                                            prices: []
                                        });

                                    /* add prices */
                                    newPrice.prices = [];

                                    newPrice.prices.push({
                                        price: price.prices.pu_ht,
                                        count: 0
                                    });

                                    newPrice.save(fCb);
                                });

                            }, function(err) {
                                aCb(err, priceLists, banks, employees);
                            });
                        });
                    });
                }

                //Convert societe to Customer
                function customer(priceLists, banks, employees, aCb) {
                    console.log("convert customers");
                    var CustomerModel = MODEL('Customers').Schema;

                    mongoose.connection.db.collection('Societe', function(err, collection) {
                        if (err || !collection)
                            return aCb();

                        collection.find().toArray(function(err, societes) {
                            if (err)
                                return console.log(err);

                            if (!societes || !societes.length)
                                return aCb(null, employees);

                            async.forEachLimit(societes, 100, function(societe, eCb) {
                                if (societe == null)
                                    return eCb();

                                CustomerModel.findOne({
                                    _id: societe._id
                                }, function(err, customer) {
                                    if (!customer)
                                        customer = new CustomerModel();

                                    var name = societe.name;
                                    delete societe.name;
                                    var address = societe.address;
                                    delete societe.address;
                                    delete societe.__v;

                                    if (societe._id.toString() == '5333032036f43f0e1882efce') //ACCUEIL
                                        customer.salesPurchases.isGeneric = true;

                                    customer = _.extend(customer, societe);
                                    customer.type = "Company";
                                    customer.name = {
                                        last: name
                                    };

                                    customer.emails = [{
                                        email: societe.email
                                    }];

                                    if (societe.iban)
                                        customer.iban.bic = societe.iban.swift;

                                    customer.address = {
                                        street: address,
                                        city: societe.town,
                                        state: '',
                                        zip: societe.zip,
                                        country: societe.country_id,
                                        contact: {}
                                    };

                                    customer.shippingAddress = [{
                                        name: societe.name,
                                        address: address,
                                        zip: societe.zip,
                                        town: societe.town
                                    }];

                                    customer.phones = {
                                        phone: (societe.phone ? societe.phone.substr(0, 10) : null),
                                        fax: societe.fax
                                    };


                                    if (societe.entity !== 'ALL')
                                        customer.entity = [societe.entity];

                                    if (societe.code_fournisseur)
                                        societe.code_client = societe.code_fournisseur;

                                    /*if (societe.code_client) {
                                        if (societe.code_client.substr(0, 3) == 'SY-' || societe.code_client.substr(0, 3) == 'LC-')
                                            societe.code_client = "";
                                        else
                                            societe.code_client = societe.code_client.substr(0, 7);
                                    }*/

                                    /*if (societe.commercial_id && societe.commercial_id.id) {
                                        console.log(employees, societe.commercial_id.id);
                                        console.log(_.find(employees, _.matchesProperty('relatedUser', societe.commercial_id.id.toString())));
                                    }*/


                                    let salesPerson = null;
                                    if (societe.commercial_id && societe.commercial_id.id && societe.commercial_id.id.toString().length == 24)
                                        salesPerson = _.find(employees, _.matchesProperty('relatedUser', societe.commercial_id.id.toString()));

                                    let priceList = null;
                                    if (_.find(priceLists, _.matchesProperty('name', societe.price_level)))
                                        priceList = _.find(priceLists, _.matchesProperty('name', societe.price_level));

                                    customer.salesPurchases = {
                                        isGeneric: false,
                                        isProspect: (societe.Status == 'ST_PFROI' || societe.Status == 'ST_PTIED' || societe.Status == 'ST_PCHAU' ? true : false),
                                        isCustomer: (societe.Status == 'ST_CREC' || societe.Status == 'ST_CFID' || societe.Status == 'ST_CINF3' || societe.Status == 'ST_CPAR' || societe.Status == 'ST_INF3' ? true : false),
                                        isSupplier: (societe.fournisseur == 'SUPPLIER' ? true : false),
                                        isSubcontractor: (societe.fournisseur == 'SUBCONTRACTOR' ? true : false),

                                        salesPerson: (salesPerson ? salesPerson._id : null), //commercial_id
                                        isActive: true,
                                        ref: societe.code_client || null,
                                        cptBilling: (societe.cptBilling && societe.cptBilling.id ? societe.cptBilling.id : null),
                                        priceList: (priceList ? priceList._id : '58c962f7d3e1802b17fe95a4'), // Default

                                        cond_reglement: societe.cond_reglement,
                                        mode_reglement: societe.mode_reglement,
                                        bank_reglement: (societe.bank_reglement ? _.find(banks, _.matchesProperty('ref', societe.bank_reglement))._id : null),
                                        VATIsUsed: societe.VATIsUsed,

                                        rival: [societe.rival],

                                        customerAccount: (societe.code_compta || "").substr(0, 10),
                                        supplierAccount: (societe.code_compta_fournisseur || "").substr(0, 10)
                                    };

                                    //return console.log(societe);

                                    customer.companyInfo = {
                                        brand: societe.caFamily,
                                        size: societe.effectif_id,

                                        idprof1: societe.idprof1,
                                        idprof2: societe.idprof2,
                                        idprof3: societe.idprof3,
                                        idprof4: societe.idprof4,
                                        idprof5: societe.idprof5,
                                        idprof6: societe.idprof6,
                                        category: null, //typent_id
                                        forme_juridique: societe.forme_juridique_code,
                                        capital: societe.capital,
                                        //importExport: String, // null (no internal country), EUROP (Import/Export in EUROPE), INTER (Import/Export international) TODO Remove
                                        Tag: societe.Tag
                                    };

                                    customer.notes = _.map(societe.notes, function(elem) {
                                        elem.author = null;
                                        return elem;
                                    });

                                    customer.save(function(err, doc) {
                                        if (err)
                                            return eCb(err);

                                        collection.remove({
                                            _id: societe._id
                                        }, function(err, res) {});

                                        eCb();
                                    });
                                });
                            }, function(err) {
                                if (err)
                                    return aCb(err);

                                //mongoose.connection.db.dropCollection(collection, function(err, result) {
                                aCb(err, employees);
                                //});
                            });
                        });
                    });
                }

                //convert contact
                function contact(employees, aCb) {
                    console.log("convert contacts");
                    var ContactModel = MODEL('Customers').Schema;

                    mongoose.connection.db.collection('users', function(err, collection) {
                        if (err || !collection)
                            return aCb();

                        collection.find({
                            _type: 'contact'
                        }).toArray(function(err, contacts) {
                            if (err)
                                return console.log(err);

                            if (!contacts || !contacts.length)
                                return aCb(null, employees);

                            async.eachLimit(contacts, 100, function(contact, cb) {

                                var id = contact._id;

                                contact.name = {
                                    civilite: contact.civilite,
                                    first: contact.firstname,
                                    last: contact.lastname
                                };

                                contact.type = "Person";
                                contact.entity = [];

                                contact.emails = [{
                                    type: 'pro',
                                    email: contact.email
                                }];

                                contact.phones = {
                                    phone: (contact.phone ? contact.phone.substr(0, 10) : null),
                                    mobile: (contact.phone_mobile ? contact.phone_mobile.substr(0, 10) : null),
                                    fax: contact.fax
                                };

                                contact.contactInfo = {
                                    soncas: contact.soncas,
                                    hobbies: contact.hobbies,
                                    sex: contact.sex
                                };

                                var address = contact.address;
                                contact.address = {
                                    street: address,
                                    zip: contact.zip,
                                    city: contact.town
                                };

                                contact.shippingAddress = [{
                                    name: contact.lastname,
                                    address: address,
                                    zip: contact.zip,
                                    town: contact.town
                                }];

                                contact.company = contact.societe;

                                contact.notes = [{
                                    note: contact.notes,
                                }];

                                var newContact = new ContactModel(contact);
                                //console.log(contact);

                                newContact.save(function(err, doc) {
                                    if (err)
                                        console.log(err);

                                    collection.remove({
                                        _id: contact._id
                                    }, function(err, res) {});

                                    cb();
                                });
                            }, function(err) {
                                if (err)
                                    return aCb(err);

                                //mongoose.connection.db.dropCollection(collection, function(err, result) {
                                aCb(err, employees);
                                //});
                            });
                        });
                    });
                }

                //create Family product
                function convertFamily(employees, aCb) {
                    console.log("convert family Products");
                    var ProductModel = MODEL('product').Schema;
                    var ProductFamilyModel = MODEL('productFamily').Schema;



                    mongoose.connection.db.collection('Product', function(err, collection) {
                        collection.distinct('caFamily', function(err, docs) {
                            if (err)
                                return aCb(err);

                            async.forEachSeries(docs, function(doc, eCb) {
                                if (!doc)
                                    return eCb();

                                ProductFamilyModel.findOne({
                                    "langs.name": doc
                                }, function(err, family) {
                                    if (err)
                                        return eCb(err);

                                    if (family)
                                        return eCb();


                                    family = new ProductFamilyModel({
                                        isCost: false,
                                        langs: [{
                                            name: doc
                                        }],
                                        isActive: true,
                                        discounts: [{
                                            discount: 0,
                                            count: 0
                                        }]
                                    });

                                    family.save(eCb);
                                });
                            }, function(err) {
                                if (err)
                                    return aCb(err);

                                ProductFamilyModel.find({}, "_id langs")
                                    .lean()
                                    .exec(function(err, families) {
                                        if (err)
                                            return aCb(err);

                                        families = _.map(families, function(elem) {
                                            return ({
                                                _id: elem._id.toString(),
                                                name: elem.langs[0].name
                                            });
                                        });

                                        aCb(err, employees, families);
                                    });
                            });
                        });
                    });
                }

                function product(employees, families, aCb) {
                    console.log("convert products");
                    var ProductModel = MODEL('product').Schema;
                    var PriceListModel = MODEL('priceList').Schema;
                    var ProductPricesModel = MODEL('productPrices').Schema;

                    mongoose.connection.db.collection('Product', function(err, collection) {
                        async.waterfall([
                            function(sCb) {
                                collection.update({
                                    'suppliers.societe': {}
                                }, {
                                    $unset: {
                                        "suppliers.$.societe": 1
                                    }
                                }, function(err, docs) {});
                                collection.find({
                                    'suppliers.societe.name': {
                                        $ne: null
                                    }
                                }).toArray(function(err, docs) {
                                    if (err)
                                        return sCb(err);

                                    if (!docs || !docs.length)
                                        return sCb();

                                    async.forEachLimit(docs, 100, function(doc, eCb) {
                                        if (doc.suppliers && doc.suppliers.length)
                                            for (var i = 0, len = doc.suppliers.length; i < len; i++) {

                                                if (doc.suppliers[i].societe.name)
                                                    doc.suppliers[i].societe = MODULE('utils').ObjectId(doc.suppliers[i].societe.id);
                                            }

                                        collection.update({
                                            _id: doc._id
                                        }, {
                                            $set: {
                                                "suppliers": doc.suppliers
                                            }
                                        }, {
                                            upsert: false,
                                            multi: false
                                        }, eCb);
                                    }, sCb);
                                });
                            },
                            //Load TVA
                            function(sCb) {
                                const TaxesModel = MODEL('taxes').Schema;
                                const EntityModel = MODEL('entity').Schema;

                                EntityModel.findOne({}, function(err, entity) {
                                    if (err)
                                        return sCb(err);

                                    if (!entity)
                                        return sCb('No entity !');

                                    let tva_mode = entity.tva_mode || 'invoice';

                                    //change Defaut TVA
                                    if (tva_mode == 'payment')
                                        return TaxesModel.findOneAndUpdate({
                                            isDefault: true
                                        }, {
                                            isDefault: false
                                        }, function(err, doc) {
                                            TaxesModel.findOneAndUpdate({
                                                isOnPaid: true,
                                                rate: 20
                                            }, {
                                                isDefault: true
                                            }, function(err, doc) {
                                                TaxesModel.find({
                                                    $or: [{
                                                        isOnPaid: true
                                                    }, {
                                                        rate: 0
                                                    }]
                                                }, function(err, taxes) {
                                                    if (err)
                                                        return sCb(err);

                                                    sCb(null, taxes);
                                                });
                                            });
                                        });


                                    TaxesModel.find({
                                        isOnPaid: false
                                    }, function(err, taxes) {
                                        if (err)
                                            return sCb(err);

                                        sCb(null, taxes);
                                    });
                                });
                            },
                            function(taxes, sCb) {
                                collection.find({}).toArray(function(err, docs) {
                                    if (err)
                                        return console.log(err);

                                    if (!docs || !docs.length)
                                        return aCb(null, employees);

                                    async.forEachLimit(docs, 100, function(doc, eCb) {
                                        //return console.log(doc);
                                        //return;

                                        if (doc.info && doc.info.SKU)
                                            return eCb();

                                        ProductModel.findOne({
                                            _id: doc._id
                                        }, function(err, product) {
                                            product.groupId = product._id.toString();
                                            product.info.langs = [{
                                                lang: "fr",
                                                name: doc.label,
                                                shortDescription: doc.description,
                                                body: doc.body,
                                                notePrivate: doc.notePrivate,
                                                Tag: doc.Tag,
                                                linker: doc.linker
                                            }];

                                            product.info.SKU = doc.ref;
                                            product.info.isActive = true;

                                            product.info.EAN = doc.barCode;
                                            product.info.aclCode = doc.aclCode;
                                            product.info.autoBarCode = doc.autoBarCode;
                                            product.attributes = [];
                                            product.variants = [];
                                            product.directCost = 0;
                                            product.indirectCost = 0;

                                            //product.compta_buy = doc.compta_buy;
                                            //product.compta_buy_eu = doc..compta_buy_eu;
                                            //product.compta_buy_exp = doc.compta_buy_exp
                                            //product.compta_sell = doc.compta_sell;
                                            //product.compta_sell_eu = doc.compta_sell_eu;
                                            //product.compta_sell_exp = doc.compta_sell_exp;

                                            //console.log(taxes, doc.tva_tx);

                                            product.taxes = [{
                                                taxeId: _.find(taxes, _.matchesProperty('rate', doc.tva_tx))._id
                                            }];

                                            if (doc.Status == "SELL")
                                                product.isSell = true;
                                            if (doc.Status == "BUY") {
                                                product.isBuy = true;
                                                product.isSell = false;
                                            }
                                            if (doc.Status == 'SELLBUY') {
                                                product.isBuy = true;
                                                product.isSell = true;
                                            }

                                            switch (doc.type) {
                                                case "SERVICE":
                                                    product.info.productType = "57f36a64da7737dc08729c66";

                                                    break;
                                                case "PACK":
                                                    product.isBundle = true;
                                                    product.info.productType = "592c1294270aa67a2793430e";

                                                    break;
                                                case "DYNAMIC":
                                                    product.info.productType = "59ae7bab0b1c8b7c483119c1";

                                                    break;

                                                default: //"PRODUCT"...
                                                    product.info.productType = "5901e12d35e0150bde8f2b20";
                                            }
                                            //console.log(families);
                                            if (!doc.caFamily)
                                                product.sellFamily = _.find(families, _.matchesProperty('name', "AUCUN"))._id;
                                            else
                                                product.sellFamily = _.find(families, _.matchesProperty('name', doc.caFamily))._id;


                                            // Add default price to BASE priceList
                                            PriceListModel.findOne({
                                                priceListCode: "BASE"
                                            }, function(err, priceList) {
                                                if (!priceList)
                                                    return console.log("PriceList notfound");

                                                ProductPricesModel.findOne({
                                                    priceLists: priceList._id,
                                                    product: product._id
                                                }, function(err, price) {
                                                    if (!price)
                                                        price = new ProductPricesModel({
                                                            priceLists: priceList._id,
                                                            product: product._id,
                                                            prices: []
                                                        });

                                                    /* add prices */
                                                    price.prices = [];

                                                    if (!doc.prices.pu_ht)
                                                        return; // No PRICE

                                                    price.prices.push({
                                                        price: doc.prices.pu_ht,
                                                        count: 0
                                                    });

                                                    if (doc.prices.pricesQty)
                                                        for (var key in doc.prices.pricesQty)
                                                            price.prices.push({
                                                                price: doc.prices.pricesQty[key],
                                                                count: parseInt(key)
                                                            });

                                                    price.save(function(err, doc) {});

                                                });
                                            });

                                            // Add default price to SP priceList
                                            if (product.isBuy)
                                                PriceListModel.findOne({
                                                    priceListCode: "SP"
                                                }, function(err, priceList) {
                                                    if (!priceList)
                                                        return console.log("PriceList notfound");

                                                    ProductPricesModel.findOne({
                                                        priceLists: priceList._id,
                                                        product: product._id
                                                    }, function(err, price) {
                                                        if (!price)
                                                            price = new ProductPricesModel({
                                                                priceLists: priceList._id,
                                                                product: product._id,
                                                                prices: []
                                                            });

                                                        /* add prices */
                                                        price.prices = [];

                                                        //return console.log(product.suppliers);

                                                        if (product.suppliers.length)
                                                            price.prices.push({
                                                                price: product.suppliers[0].prices.pu_ht,
                                                                count: 0
                                                            });
                                                        else
                                                            price.prices.push({
                                                                price: 0,
                                                                count: 0
                                                            });

                                                        price.save(function(err, doc) {});

                                                    });
                                                });


                                            //console.log(product);
                                            product.save(eCb);
                                        });
                                    }, sCb);
                                });
                            }
                        ], function(err) {
                            aCb(err, employees);
                        });
                    });
                }

                function dropCollectionEnd(employees, aCb) {
                    var collectionName = ['Societe.Version', 'users', 'Mysoc', 'PriceLevel'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null, employees);
                }

                async.waterfall([dropCollection, convertEntities, users, priceList, loadBank, loadEmployees, convertAllProductPrices, customer, contact, convertFamily, product, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.501
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.501));
                        wCb(err, doc.values);
                    });
                });
            },
            //version 0.502
            function(conf, wCb) {
                if (conf.version >= 0.502)
                    return wCb(null, conf);

                //Old convert first
                function oldConvert(aCb) {
                    console.log("convert old offer");

                    mongoose.connection.db.collection('Offer', function(err, collection) {
                        collection.find({}, function(err, docs) {
                            if (err)
                                return console.log(err);

                            docs.each(function(err, doc) {
                                //console.log(pricelevel);
                                if (err)
                                    return console.log(err);

                                if (!doc)
                                    return;

                                var set = {};

                                if (doc.bl[0].societe && doc.bl[0].societe.name)
                                    set["bl.0.name"] = doc.bl[0].societe.name;

                                if (doc.ref.length == 15)
                                    set.ref = "PC" + doc.ref.substring(4);

                                if (_.isEmpty(set))
                                    return;

                                collection.update({
                                    _id: doc._id
                                }, {
                                    $set: set
                                }, function(err, doc) {
                                    if (err || !doc)
                                        return console.log("Impossible de creer offer ", err);
                                });

                            });
                        });
                    });

                    console.log("convert old order");
                    mongoose.connection.db.collection('Commande', function(err, collection) {
                        collection.find({}, function(err, docs) {
                            if (err)
                                return console.log(err);

                            docs.each(function(err, doc) {
                                //console.log(pricelevel);
                                if (err)
                                    return console.log(err);

                                if (!doc)
                                    return;

                                var set = {};

                                if (doc.bl[0].societe && doc.bl[0].societe.name)
                                    set["bl.0.name"] = doc.bl[0].societe.name;

                                if (doc.ref.length == 15)
                                    set.ref = "CO" + doc.ref.substring(4);

                                if (_.isEmpty(set))
                                    return;

                                collection.update({
                                    _id: doc._id
                                }, {
                                    $set: set
                                }, function(err, doc) {
                                    if (err || !doc)
                                        return console.log("Impossible de creer order ", err);
                                });

                            });
                        });
                    });

                    /* console.log("convert old date bill");
                     var BillModel = MODEL('invoice').Schema;
                     var BillSupplierModel = MODEL('billSupplier').Schema;
                     var setDate = MODULE('utils').setDate;
                     var moment = require('moment');

                     BillModel.find({}, "_id datec dater", function(err, docs) {
                         docs.forEach(function(elem) {
                             //console.log(elem);

                             //FIX 29/02 !!! replace 28/02
                             //console.log(moment(elem.datec).day());
                             if (moment(elem.datec).month() == 1 && moment(elem.datec).date() == 29)
                                 elem.datec = moment(elem.datec).subtract(1, 'day').toDate();

                             elem.update({ $set: { datec: setDate(elem.datec), dater: setDate(elem.dater) } }, { w: 1 }, function(err, doc) {
                                 if (err)
                                     console.log(err);

                                 //console.log(doc);
                             });
                         });
                     });*/

                    /*BillSupplierModel.find({}, "_id datec dater", function(err, docs) {
                        docs.forEach(function(elem) {
                            //console.log(elem);

                            //FIX 29/02 !!! replace 28/02
                            //console.log(moment(elem.datec).day());
                            if (moment(elem.datec).month() == 1 && moment(elem.datec).date() == 29)
                                elem.datec = moment(elem.datec).subtract(1, 'day').toDate();

                            elem.update({ $set: { datec: setDate(elem.datec), dater: setDate(elem.dater) } }, { w: 1 }, function(err, doc) {
                                if (err)
                                    console.log(err);

                                //console.log(doc);
                            });
                        });
                    });*/

                    /*console.log("convert old delivery date");
                    var DeliveryModel = MODEL('delivery').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    DeliveryModel.find({}, "_id datec datedl", function(err, docs) {
                        docs.forEach(function(elem) {
                            //console.log(elem);

                            elem.update({ $set: { datec: setDate(elem.datec), datedl: setDate(elem.datedl) } }, { w: 1 }, function(err, doc) {
                                if (err)
                                    console.log(err);

                                //console.log(doc);
                            });
                        });
                    });*/

                    aCb();
                }

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert customer order
                function convertOrders(banks, users, taxes, aCb) {
                    var OrderModel = MODEL('order').Schema.OrderCustomer;
                    var OrderRowsModel = MODEL('orderRows').Schema;
                    var CustomerModel = MODEL('Customers').Schema;

                    const SeqModel = MODEL('Sequence').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    SeqModel.findById('CO', function(err, seq) {
                        if (err)
                            return console.log(err);

                        seq = new SeqModel({
                            _id: "ORDER",
                            seq: seq.seq
                        });

                        seq.save(function(err, doc) {});
                    });

                    EntityModel.findOne({}, "cptRef", function(err, entity) {
                        if (err)
                            console.log(err);

                        SeqModel.findById('FA' + (entity && entity.cptRef ? entity.cptRef : ""), function(err, seq) {
                            if (err)
                                return console.log(err);

                            seq = new SeqModel({
                                _id: "INVOICE",
                                seq: seq.seq
                            });

                            seq.save(function(err, doc) {});
                        });
                    });

                    console.log("convert customer orders");
                    mongoose.connection.db.collection('Commande', function(err, collection) {
                        collection.find({
                            isremoved: {
                                $ne: true
                            }
                        }).toArray(function(err, orders) {
                            if (err)
                                return console.log(err);

                            if (!orders)
                                return aCb();

                            async.forEachLimit(orders, 100, function(order, eCb) {
                                    //console.log(order);

                                    if (!order.client)
                                        return eCb();

                                    CustomerModel.findById(order.client.id, function(err, societe) {

                                        if (!societe)
                                            return eCb('Societe Not found order customer {0} '.format(order._id));

                                        if (order.client.cptBilling)
                                            order.billing = order.client.cptBilling.id
                                        else
                                            order.billing = undefined;

                                        order.order = order._id.toString();
                                        order.supplier = order.client.id;

                                        if (order.bank_reglement)
                                            order.bank_reglement = (delivery.bank_reglement ? _.find(banks, _.matchesProperty('ref', order.bank_reglement))._id : null);

                                        if (order.delivery_mode)
                                            if (order.delivery_mode == 'Livraison')
                                                order.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                order.delivery_mode = 'SHIP_NONE';
                                        else
                                            order.delivery_mode = 'SHIP_NONE';

                                        order.address = societe.address;

                                        if (societe._id.toString() == '5333032036f43f0e1882efce') //ACCUEIL
                                            order.address.name = order.client.name;

                                        order.shippingAddress = {
                                            name: order.bl[0].name,
                                            street: order.bl[0].address,
                                            zip: order.bl[0].zip,
                                            city: order.bl[0].town
                                        };

                                        order.shipping = {
                                            "total_taxes": [],
                                            "total_ht": order.shipping.total_ht
                                        };

                                        let commercial_id;

                                        order.ID = parseInt(order.ref.substr(7));

                                        if (order.commercial_id && order.commercial_id.id) {
                                            order.commercial_id.id = order.commercial_id.id.toString();
                                            if (order.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', order.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', order.commercial_id.id.toString()));

                                            if (commercial_id)
                                                order.salesPerson = commercial_id._id;
                                        }

                                        if (order.Status == "CLOSED")
                                            order.status = {
                                                allocateStatus: 'ALL',
                                                fulfillStatus: 'ALL',
                                                shippingStatus: 'ALL'
                                            };

                                        order.history = _.map(order.history, function(elem) {
                                            if (elem.author && elem.author.id)
                                                elem.author = elem.author.id;
                                            else
                                                elem.author = null;
                                            return elem;
                                        });

                                        order.datedl = order.date_livraison;

                                        OrderModel.findById(order._id, function(err, newOrder) {
                                            if (err)
                                                return eCb(err);

                                            if (!newOrder)
                                                newOrder = new OrderModel(order);
                                            else
                                                newOrder = _.extend(newOrder, order);

                                            async.waterfall([
                                                function(sCb) {
                                                    newOrder.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfSeries(order.lines, function(line, i, cb) {
                                                        //console.log(line);
                                                        OrderRowsModel.findOne({
                                                            sequence: i,
                                                            order: doc._id
                                                        }, function(err, newLine) {

                                                            line.product = line.product.id;
                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;

                                                            if (line.tva_tx)
                                                                line.total_taxes = [{
                                                                    taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                                }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            if (!newLine)
                                                                newLine = new OrderRowsModel(line);
                                                            else
                                                                newLine = _.extend(newLine, line);

                                                            newLine.save(cb);

                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({
                                                                order: doc._id
                                                            })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");

                                                    if (newOrder.isremoved)
                                                        return sCb(null, newOrder, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
                                                        if (round(result.total_ttc) != round(order.total_ttc)) {
                                                            console.log(result);
                                                            return sCb('Error diff order total old {2} : {0}  new :{1}'.format(order.total_ttc, result.total_ttc, order._id.toString()));
                                                        }

                                                        sCb(err, newOrder, result, rows)
                                                    });
                                                },
                                                function(newOrder, result, rows, sCb) {
                                                    // console.log(result);
                                                    newOrder.total_ht = result.total_ht;
                                                    newOrder.total_taxes = result.total_taxes;
                                                    newOrder.total_ttc = result.total_ttc;
                                                    newOrder.weight = result.weight;

                                                    //return console.log(result);

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                },
                                                function(newOrder, rows, sCb) {
                                                    //order = _.extend(order, self.body);
                                                    //console.log(order.history);
                                                    //console.log(rows);
                                                    //update all rows
                                                    var newRows = [];
                                                    async.each(rows, function(orderRow, aCb) {
                                                            orderRow.order = newOrder._id;

                                                            orderRow.warehouse = newOrder.warehouse;

                                                            if (orderRow.isDeleted && !orderRow._id)
                                                                return aCb();


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, {
                                                                new: true
                                                            }, function(err, doc) {
                                                                if (err)
                                                                    return aCb(err);
                                                                newRows.push(doc);
                                                                aCb();
                                                            });


                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);
                                                            sCb(null, order, newRows);
                                                        });
                                                },
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Commande'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([oldConvert, loadBank, loadEmployees, loadTaxes, convertOrders, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.502
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.502));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.503
            function(conf, wCb) {
                if (conf.version >= 0.503)
                    return wCb(null, conf);

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert customer offer
                function convertOffers(banks, users, taxes, aCb) {
                    var OrderModel = MODEL('order').Schema.QuotationCustomer;
                    var OrderRowsModel = MODEL('orderRows').Schema;
                    var CustomerModel = MODEL('Customers').Schema;

                    console.log("convert customer offers");
                    mongoose.connection.db.collection('Offer', function(err, collection) {
                        collection.find({}).toArray(function(err, orders) {
                            if (err)
                                return console.log(err);

                            if (!orders)
                                return aCb();

                            async.forEachLimit(orders, 100, function(order, eCb) {
                                    //console.log(order);

                                    if (!order.client)
                                        return eCb();

                                    CustomerModel.findById(order.client.id, function(err, societe) {

                                        if (!societe)
                                            return eCb('Societe Not found offer customer {0} '.format(order._id));

                                        if (order.client.cptBilling)
                                            order.billing = order.client.cptBilling.id
                                        else
                                            order.billing = undefined;

                                        order.order = order._id.toString();
                                        order.supplier = order.client.id;

                                        if (order.bank_reglement)
                                            order.bank_reglement = (delivery.bank_reglement ? _.find(banks, _.matchesProperty('ref', order.bank_reglement))._id : null);

                                        if (order.delivery_mode)
                                            if (order.delivery_mode == 'Livraison')
                                                order.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                order.delivery_mode = 'SHIP_NONE';
                                        else
                                            order.delivery_mode = 'SHIP_NONE';

                                        order.address = societe.address;

                                        if (societe._id.toString() == '5333032036f43f0e1882efce') //ACCUEIL
                                            order.address.name = order.client.name;

                                        order.shippingAddress = {
                                            name: order.bl[0].name,
                                            street: order.bl[0].address,
                                            zip: order.bl[0].zip,
                                            city: order.bl[0].town
                                        };

                                        order.shipping = {
                                            "total_taxes": [],
                                            "total_ht": order.shipping.total_ht
                                        };

                                        let commercial_id;

                                        order.ID = parseInt(order.ref.substr(7));

                                        if (order.commercial_id && order.commercial_id.id) {
                                            order.commercial_id.id = order.commercial_id.id.toString();
                                            if (order.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', order.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', order.commercial_id.id.toString()));

                                            if (commercial_id)
                                                order.salesPerson = commercial_id._id;
                                        }

                                        order.history = _.map(order.history, function(elem) {
                                            if (elem.author && elem.author.id)
                                                elem.author = elem.author.id;
                                            else
                                                elem.author = null;
                                            return elem;
                                        });

                                        order.datedl = order.date_livraison;

                                        OrderModel.findById(order._id, function(err, newOrder) {
                                            if (err)
                                                return eCb(err);

                                            if (!newOrder)
                                                newOrder = new OrderModel(order);
                                            else
                                                newOrder = _.extend(newOrder, order);

                                            async.waterfall([
                                                function(sCb) {
                                                    newOrder.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfSeries(order.lines, function(line, i, cb) {
                                                        //console.log(line);
                                                        OrderRowsModel.findOne({
                                                            sequence: i,
                                                            order: doc._id
                                                        }, function(err, newLine) {

                                                            if (line.product)
                                                                line.product = line.product.id;

                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;
                                                            if (line.tva_tx)
                                                                line.total_taxes = [{
                                                                    taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                                }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            if (!newLine)
                                                                newLine = new OrderRowsModel(line);
                                                            else
                                                                newLine = _.extend(newLine, line);

                                                            newLine.save(cb);

                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({
                                                                order: doc._id
                                                            })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");

                                                    if (newOrder.isremoved)
                                                        return sCb(null, newOrder, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
                                                        if (round(result.total_ttc) != round(order.total_ttc))
                                                            return sCb('Error diff offer total old {2} : {0}  new :{1}'.format(order.total_ttc, result.total_ttc, order._id.toString()));

                                                        sCb(err, newOrder, result, rows)
                                                    });
                                                },
                                                function(newOrder, result, rows, sCb) {
                                                    // console.log(result);
                                                    newOrder.total_ht = result.total_ht;
                                                    newOrder.total_taxes = result.total_taxes;
                                                    newOrder.total_ttc = result.total_ttc;
                                                    newOrder.weight = result.weight;

                                                    //return console.log(result);

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                },
                                                function(newOrder, rows, sCb) {
                                                    //order = _.extend(order, self.body);
                                                    //console.log(order.history);
                                                    //console.log(rows);
                                                    //update all rows
                                                    var newRows = [];
                                                    async.each(rows, function(orderRow, aCb) {
                                                            orderRow.order = newOrder._id;

                                                            orderRow.warehouse = newOrder.warehouse;

                                                            if (orderRow.isDeleted && !orderRow._id)
                                                                return aCb();


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, {
                                                                new: true
                                                            }, function(err, doc) {
                                                                if (err)
                                                                    return aCb(err);
                                                                newRows.push(doc);
                                                                aCb();
                                                            });


                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);
                                                            sCb(null, order, newRows);
                                                        });
                                                },
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Offer'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([loadBank, loadEmployees, loadTaxes, convertOffers, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.503
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.503));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.504
            function(conf, wCb) {
                if (conf.version >= 0.504)
                    return wCb(null, conf);

                //Old convert first
                function oldConvert(aCb) {
                    console.log("convert old orderSupplier");

                    mongoose.connection.db.collection('OrderSupplier', function(err, collection) {
                        collection.find({}, function(err, docs) {
                            if (err)
                                return console.log(err);

                            docs.each(function(err, doc) {
                                //console.log(pricelevel);
                                if (err)
                                    return console.log(err);

                                if (!doc)
                                    return;

                                var set = {};


                                if (doc.ref.length == 15)
                                    set.ref = "CF" + doc.ref.substring(4);

                                if (_.isEmpty(set))
                                    return;

                                collection.update({
                                    _id: doc._id
                                }, {
                                    $set: set
                                }, function(err, doc) {
                                    if (err || !doc)
                                        return console.log("Impossible de creer BillSupplier ", err);
                                });

                            });
                        });
                    });

                    /*console.log("convert old delivery date");
                    var DeliveryModel = MODEL('delivery').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    DeliveryModel.find({}, "_id datec datedl", function(err, docs) {
                        docs.forEach(function(elem) {
                            //console.log(elem);

                            elem.update({ $set: { datec: setDate(elem.datec), datedl: setDate(elem.datedl) } }, { w: 1 }, function(err, doc) {
                                if (err)
                                    console.log(err);

                                //console.log(doc);
                            });
                        });
                    });*/

                    aCb();
                }

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert supplier order
                function convertSupplierOrders(banks, users, taxes, aCb) {
                    var OrderModel = MODEL('order').Schema.OrderSupplier;
                    var OrderRowsModel = MODEL('orderRows').Schema;
                    var CustomerModel = MODEL('Customers').Schema;

                    console.log("convert supplier orders");
                    mongoose.connection.db.collection('OrderSupplier', function(err, collection) {
                        collection.find({}).toArray(function(err, orders) {
                            if (err)
                                return console.log(err);

                            if (!orders)
                                return aCb();

                            async.forEachLimit(orders, 100, function(order, eCb) {
                                    //console.log(order);

                                    if (!order.supplier)
                                        return eCb();

                                    CustomerModel.findById(order.supplier.id, function(err, societe) {

                                        order.forSales = false;
                                        order.order = order._id.toString();
                                        order.supplier = order.supplier.id;

                                        if (order.bank_reglement)
                                            order.bank_reglement = (delivery.bank_reglement ? _.find(banks, _.matchesProperty('ref', order.bank_reglement))._id : null);

                                        if (order.billing && order.billing.societe.id)
                                            order.billing = order.billing.societe.id;

                                        order.ref_client = order.ref_supplier;

                                        if (order.delivery_mode)
                                            if (order.delivery_mode == 'Livraison')
                                                order.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                order.delivery_mode = 'SHIP_NONE';
                                        else
                                            order.delivery_mode = 'SHIP_NONE';

                                        order.address = societe.address;

                                        /*order.shippingAddress = {
                                            name: order.bl[0].name,
                                            street: order.bl[0].address,
                                            zip: order.bl[0].zip,
                                            city: order.bl[0].town
                                        };*/

                                        order.shipping = {
                                            "total_taxes": [],
                                            "total_ht": order.shipping.total_ht
                                        };

                                        let commercial_id;

                                        order.ID = parseInt(order.ref.substr(7));

                                        if (order.commercial_id && order.commercial_id.id) {
                                            order.commercial_id.id = order.commercial_id.id.toString();
                                            if (order.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', order.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', order.commercial_id.id.toString()));

                                            if (commercial_id)
                                                order.salesPerson = commercial_id._id;
                                        }

                                        order.history = _.map(order.history, function(elem) {
                                            if (elem.author && elem.author.id)
                                                elem.author = elem.author.id;
                                            else
                                                elem.author = null;
                                            return elem;
                                        });

                                        order.datedl = order.date_livraison;

                                        OrderModel.findById(order._id, function(err, newOrder) {
                                            if (err)
                                                return eCb(err);

                                            if (!newOrder)
                                                newOrder = new OrderModel(order);
                                            else
                                                newOrder = _.extend(newOrder, order);

                                            async.waterfall([
                                                function(sCb) {
                                                    newOrder.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfSeries(order.lines, function(line, i, cb) {
                                                        //console.log(line);
                                                        OrderRowsModel.findOne({
                                                            sequence: i,
                                                            order: doc._id
                                                        }, function(err, newLine) {

                                                            line.product = line.product.id;
                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;

                                                            if (line.tva_tx)
                                                                line.total_taxes = [{
                                                                    taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                                }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            if (!newLine)
                                                                newLine = new OrderRowsModel(line);
                                                            else
                                                                newLine = _.extend(newLine, line);

                                                            newLine.save(cb);

                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({
                                                                order: doc._id
                                                            })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");

                                                    if (newOrder.isremoved)
                                                        return sCb(null, newOrder, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
                                                        if (round(result.total_ttc) != round(order.total_ttc)) {
                                                            console.log(result);
                                                            return sCb('Error diff orderSupplier total old {2} : {0}  new :{1}'.format(order.total_ttc, result.total_ttc, order._id.toString()));
                                                        }
                                                        sCb(err, newOrder, result, rows)
                                                    });
                                                },
                                                function(newOrder, result, rows, sCb) {
                                                    // console.log(result);
                                                    newOrder.total_ht = result.total_ht;
                                                    newOrder.total_taxes = result.total_taxes;
                                                    newOrder.total_ttc = result.total_ttc;
                                                    newOrder.weight = result.weight;

                                                    //return console.log(result);

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                },
                                                function(newOrder, rows, sCb) {
                                                    //order = _.extend(order, self.body);
                                                    //console.log(order.history);
                                                    //console.log(rows);
                                                    //update all rows
                                                    var newRows = [];
                                                    async.each(rows, function(orderRow, aCb) {
                                                            orderRow.order = newOrder._id;

                                                            orderRow.warehouse = newOrder.warehouse;

                                                            if (orderRow.isDeleted && !orderRow._id)
                                                                return aCb();


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, {
                                                                new: true
                                                            }, function(err, doc) {
                                                                if (err)
                                                                    return aCb(err);
                                                                newRows.push(doc);
                                                                aCb();
                                                            });


                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);
                                                            sCb(null, order, newRows);
                                                        });
                                                },
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['OrderSupplier'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([oldConvert, loadBank, loadEmployees, loadTaxes, convertSupplierOrders, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.504
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.504));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.505
            function(conf, wCb) {
                if (conf.version >= 0.505)
                    return wCb(null, conf);

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert customer bills
                function convertBills(banks, users, taxes, aCb) {
                    var BillModel = MODEL('invoice').Schema;
                    var CustomerModel = MODEL('Customers').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    console.log("convert customer bills");
                    mongoose.connection.db.collection('Facture', function(err, collection) {
                        collection.find({}).toArray(function(err, bills) {
                            if (err)
                                return console.log(err);

                            if (!bills)
                                return aCb();

                            async.forEachSeries(bills, function(order, eCb) {
                                    //console.log(order);

                                    if (!order.client)
                                        return eCb();

                                    CustomerModel.findById(order.client.id, function(err, societe) {

                                        order.forSales = true;
                                        order.order = order._id.toString();
                                        order.supplier = order.client.id;

                                        if (order.bank_reglement)
                                            order.bank_reglement = (order.bank_reglement ? _.find(banks, _.matchesProperty('ref', order.bank_reglement))._id : null);

                                        if (order.delivery_mode)
                                            if (order.delivery_mode == 'Livraison')
                                                order.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                order.delivery_mode = 'SHIP_NONE';
                                        else
                                            order.delivery_mode = 'SHIP_NONE';

                                        order.address = societe.address;

                                        if (societe._id.toString() == '5333032036f43f0e1882efce') //ACCUEIL
                                            order.address.name = order.client.name;

                                        order.shipping = {
                                            "total_taxes": [],
                                            "total_ht": order.shipping.total_ht
                                        };

                                        let commercial_id;

                                        if (order.Status != 'DRAFT')
                                            order.ID = parseInt(order.ref.split('-')[1]);

                                        if (order.Status == "STARTED")
                                            order.Status = 'PAID_PARTIALLY';

                                        if (order.commercial_id && order.commercial_id.id) {
                                            order.commercial_id.id = order.commercial_id.id.toString();
                                            if (order.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', order.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', order.commercial_id.id.toString()));

                                            if (commercial_id)
                                                order.salesPerson = commercial_id._id;
                                        }

                                        order.history = _.map(order.history, function(elem) {
                                            if (elem.author && elem.author.id)
                                                elem.author = elem.author.id;
                                            else
                                                elem.author = null;
                                            return elem;
                                        });

                                        BillModel.findById(order._id, function(err, bill) {
                                            if (err)
                                                return eCb(err);

                                            var lines = order.lines;
                                            order.lines = [];

                                            if (!bill)
                                                bill = new BillModel(order);
                                            else
                                                bill = _.extend(bill, order);

                                            //FIX 29/02 !!! replace 28/02
                                            //console.log(moment(elem.datec).day());
                                            if (moment(bill.datec).month() == 1 && moment(bill.datec).date() == 29)
                                                bill.datec = moment(bill.datec).subtract(1, 'day').toDate();

                                            async.waterfall([
                                                function(sCb) {
                                                    bill.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfLimit(lines, 100, function(line, i, cb) {
                                                            //console.log(line);

                                                            line.product = line.product.id;
                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;

                                                            if (line.tva_tx == null)
                                                                line.tva_tx = 0;
                                                            //console.log(line.tva_tx);
                                                            line.total_taxes = [{
                                                                taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                            }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            doc.lines.push(line);

                                                            cb();
                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);

                                                            sCb(err, doc.lines, doc);
                                                        });
                                                },
                                                function(rows, newBill, sCb) {
                                                    //console.log("Refresh total", newBill._id);

                                                    if (newBill.isremoved)
                                                        return sCb(null, newBill, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newBill.shipping, newBill.discount, newBill.supplier, function(err, result) {

                                                        result.correction = 0;
                                                        //result.total_ttc += result.correction;

                                                        if (round(result.total_ttc) == round(order.total_ttc))
                                                            return sCb(err, newBill, result, rows)

                                                        if (Math.abs(round(result.total_ttc - order.total_ttc)) > 0.02)
                                                            return sCb('Error diff invoice total old {2} : {0}  new :{1}'.format(order.total_ttc, result.total_ttc, order._id.toString()));

                                                        result.correction += round(order.total_ttc - result.total_ttc, 2);
                                                        result.total_ttc = order.total_ttc;
                                                        sCb(err, newBill, result, rows)
                                                    });
                                                },
                                                function(newBill, result, rows, sCb) {
                                                    //console.log("Result ", result);
                                                    newBill.total_ht = result.total_ht;
                                                    newBill.total_taxes = result.total_taxes;
                                                    newBill.total_ttc = result.total_ttc;
                                                    newBill.weight = result.weight;

                                                    result.lines = rows;

                                                    //return console.log(newBill.lines, result);

                                                    BillModel.findByIdAndUpdate(newBill._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                }
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Facture'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([loadBank, loadEmployees, loadTaxes, convertBills, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.505
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.505));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.506
            function(conf, wCb) {
                if (conf.version >= 0.506)
                    return wCb(null, conf);

                //Old convert first
                function oldConvert(aCb) {
                    console.log("convert old billSupplier");

                    mongoose.connection.db.collection('BillSupplier', function(err, collection) {
                        collection.find({}, function(err, docs) {
                            if (err)
                                return console.log(err);

                            docs.each(function(err, doc) {
                                //console.log(pricelevel);
                                if (err)
                                    return console.log(err);

                                if (!doc)
                                    return;

                                var set = {};


                                if (doc.ref.length == 15)
                                    set.ref = "FF" + doc.ref.substring(4);

                                if (_.isEmpty(set))
                                    return;

                                collection.update({
                                    _id: doc._id
                                }, {
                                    $set: set
                                }, function(err, doc) {
                                    if (err || !doc)
                                        return console.log("Impossible de creer BillSupplier ", err);
                                });

                            });
                        });
                    });

                    /*console.log("convert old delivery date");
                    var DeliveryModel = MODEL('delivery').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    DeliveryModel.find({}, "_id datec datedl", function(err, docs) {
                        docs.forEach(function(elem) {
                            //console.log(elem);

                            elem.update({ $set: { datec: setDate(elem.datec), datedl: setDate(elem.datedl) } }, { w: 1 }, function(err, doc) {
                                if (err)
                                    console.log(err);

                                //console.log(doc);
                            });
                        });
                    });*/

                    aCb();
                }

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert supplier bills
                function convertBills(banks, users, taxes, aCb) {
                    var BillModel = MODEL('invoice').Schema;
                    var CustomerModel = MODEL('Customers').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    console.log("convert supplier bills");
                    mongoose.connection.db.collection('BillSupplier', function(err, collection) {
                        collection.find({}).toArray(function(err, bills) {
                            if (err)
                                return console.log(err);

                            if (!bills)
                                return aCb();

                            async.forEachLimit(bills, 100, function(order, eCb) {
                                    //console.log(order);

                                    if (!order.supplier)
                                        return eCb();

                                    CustomerModel.findById(order.supplier.id, function(err, societe) {

                                        order.forSales = false;
                                        order.order = order._id.toString();
                                        order.supplier = order.supplier.id;
                                        order.ref_client = order.ref_supplier;

                                        if (order.delivery_mode)
                                            if (order.delivery_mode == 'Livraison')
                                                order.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                order.delivery_mode = 'SHIP_NONE';
                                        else
                                            order.delivery_mode = 'SHIP_NONE';

                                        if (order.bank_reglement)
                                            order.bank_reglement = (delivery.bank_reglement ? _.find(banks, _.matchesProperty('ref', order.bank_reglement))._id : null);

                                        order.address = {
                                            street: order.address,
                                            city: order.town,
                                            zip: order.zip,
                                            country: order.country_id
                                        };

                                        order.shipping = {
                                            "total_taxes": [],
                                            "total_ht": order.shipping.total_ht
                                        };

                                        let commercial_id;

                                        order.ID = parseInt(order.ref.substr(7));

                                        if (order.Status == "STARTED")
                                            order.Status = 'PAID_PARTIALLY';

                                        if (order.commercial_id && order.commercial_id.id) {
                                            order.commercial_id.id = order.commercial_id.id.toString();
                                            if (order.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', order.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', order.commercial_id.id.toString()));

                                            if (commercial_id)
                                                order.salesPerson = commercial_id._id;
                                        }

                                        order.history = _.map(order.history, function(elem) {
                                            if (elem.author && elem.author.id)
                                                elem.author = elem.author.id;
                                            else
                                                elem.author = null;
                                            return elem;
                                        });

                                        BillModel.findById(order._id, function(err, bill) {
                                            if (err)
                                                return eCb(err);

                                            var lines = order.lines;
                                            order.lines = [];

                                            if (!bill)
                                                bill = new BillModel(order);
                                            else
                                                bill = _.extend(bill, order);

                                            //FIX 29/02 !!! replace 28/02
                                            //console.log(moment(elem.datec).day());
                                            if (moment(bill.datec).month() == 1 && moment(bill.datec).date() == 29)
                                                bill.datec = moment(bill.datec).subtract(1, 'day').toDate();

                                            async.waterfall([
                                                function(sCb) {
                                                    bill.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfSeries(lines, function(line, i, cb) {
                                                            //console.log(line);

                                                            line.product = line.product.id;
                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;

                                                            if (line.tva_tx === null)
                                                                line.tva_tx = 0;

                                                            line.total_taxes = [{
                                                                taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                            }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            doc.lines.push(line);

                                                            cb();
                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);

                                                            sCb(err, doc.lines, doc);
                                                        });
                                                },
                                                function(rows, newBill, sCb) {
                                                    console.log("Refresh total");

                                                    if (newBill.isremoved)
                                                        return sCb(null, newBill, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newBill.shipping, newBill.discount, newBill.supplier, function(err, result) {

                                                        result.correction = newBill.correction;
                                                        result.total_ttc += result.correction;

                                                        if (round(result.total_ttc) == round(order.total_ttc))
                                                            return sCb(err, newBill, result, rows)

                                                        if (Math.abs(round(result.total_ttc - order.total_ttc)) > 0.02)
                                                            return sCb('Error diff invoice total old {2} : {0}  new :{1}'.format(order.total_ttc, result.total_ttc, order._id.toString()));

                                                        result.correction += round(order.total_ttc - result.total_ttc, 2);
                                                        result.total_ttc = order.total_ttc;

                                                        //console.log(result, order.total_ttc);
                                                        //return;

                                                        sCb(err, newBill, result, rows);
                                                    });
                                                },
                                                function(newBill, result, rows, sCb) {
                                                    // console.log(result);
                                                    newBill.total_ht = result.total_ht;
                                                    newBill.total_taxes = result.total_taxes;
                                                    newBill.total_ttc = result.total_ttc;
                                                    newBill.weight = result.weight;

                                                    result.lines = rows;

                                                    //return console.log(newBill.lines, result);

                                                    BillModel.findByIdAndUpdate(newBill._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                }
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['BillSupplier'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([oldConvert, loadBank, loadEmployees, loadTaxes, convertBills, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.506
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.506));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.508 : update orderCustomer Status CLOSED -> BILLED
            function(conf, wCb) {
                if (conf.version >= 0.508)
                    return wCb(null, conf);

                //Old convert first
                function convertStatus(aCb) {
                    console.log("convert status customer order");
                    const OrderModel = MODEL('order').Schema.OrderCustomer;

                    //Select only objectId()
                    OrderModel.update({
                        Status: 'CLOSED'
                    }, {
                        $set: {
                            Status: "BILLED"
                        }
                    }, {
                        multi: true
                    }, aCb);
                }

                async.waterfall([convertStatus], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.508
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.508));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // version 0.509 : update product costFamily default cost
            function(conf, wCb) {
                if (conf.version >= 0.509)
                    return wCb(null, conf);

                //Old convert first
                function productRefreshCost(aCb) {
                    console.log("refresh costFamily product");
                    const ProductModel = MODEL('product').Schema;

                    //Select only objectId()
                    ProductModel.find({
                        costFamily: null
                    }, function(err, docs) {
                        if (err)
                            return aCb(err);

                        docs.forEach(function(doc) {
                            doc.save(function() {});
                        });

                    });
                    aCb();
                }

                async.waterfall([productRefreshCost], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.509
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.509));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.510 : update ID ref bill supplier
            function(conf, wCb) {
                if (conf.version >= 0.510)
                    return wCb(null, conf);

                //Old convert first
                function billSupplierRefreshID(aCb) {
                    console.log("refresh ID bill supplier");
                    const BillSupplierModel = MODEL('invoice').Schema;

                    BillSupplierModel.find({
                        forSales: false,
                        ID: null
                    }, function(err, docs) {
                        if (err)
                            return aCb(err);

                        docs.forEach(function(doc) {
                            doc.ID = parseInt(doc.ref.substr(7));
                            doc.save(function() {});
                        });

                    });
                    aCb();
                }

                async.waterfall([billSupplierRefreshID], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.510
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.510));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // version 0.511 : convert old delivery NOTA : Delete ID_1 index in mongodb for Orders
            function(conf, wCb) {
                if (conf.version >= 0.511)
                    return wCb(null, conf);

                // Load Bank
                function loadBank(aCb) {
                    console.log("convert bank");
                    var BankModel = MODEL('bank').Schema;

                    BankModel.find({}, "_id ref", function(err, banks) {
                        aCb(err, banks);
                    });
                }

                function loadEmployees(banks, aCb) {
                    var EmployeeModel = MODEL('Employees').Schema;

                    EmployeeModel.find({}, "_id relatedUser")
                        .populate("relatedUser")
                        .lean()
                        .exec(function(err, users) {
                            users = _.map(users, function(elem) {
                                if (elem.relatedUser) {
                                    elem.username = elem.relatedUser.username;
                                    elem.relatedUser = elem.relatedUser._id.toString();
                                }
                                return elem;
                            });
                            aCb(err, banks, users);
                        });
                }

                //Load TVA
                function loadTaxes(banks, users, aCb) {
                    const TaxesModel = MODEL('taxes').Schema;
                    const EntityModel = MODEL('entity').Schema;

                    EntityModel.findOne({}, function(err, entity) {
                        if (err)
                            return aCb(err);

                        if (!entity)
                            return aCb('No entity !');

                        let tva_mode = entity.tva_mode || 'invoice';

                        TaxesModel.find({
                            $or: [{
                                isOnPaid: (tva_mode == 'payment')
                            }, {
                                rate: 0
                            }],
                            isFixValue: {
                                $ne: true
                            }
                        }, function(err, taxes) {
                            if (err)
                                return aCb(err);

                            aCb(null, banks, users, taxes);
                        });
                    });
                }

                //convert delivery customer
                function convertDelivery(banks, users, taxes, aCb) {
                    var DeliveryModel = MODEL('order').Schema.GoodsOutNote;
                    var OrderRowsModel = MODEL('orderRows').Schema;
                    var CustomerModel = MODEL('Customers').Schema;
                    var setDate = MODULE('utils').setDate;
                    var moment = require('moment');

                    console.log("convert customer delivery");
                    mongoose.connection.db.collection('Orders', function(err, collection) {
                        collection.dropIndex("ID_1", function(err) {});
                    });

                    mongoose.connection.db.collection('Delivery', function(err, collection) {
                        collection.find({}).toArray(function(err, docs) {
                            if (err)
                                return console.log(err);

                            if (!docs)
                                return aCb();

                            async.forEachLimit(docs, 100, function(delivery, eCb) {

                                    if (!delivery.client)
                                        return eCb();

                                    CustomerModel.findById(delivery.client.id, function(err, societe) {

                                        if (!societe)
                                            return eCb('Societe Notfound delivery {0}'.format(delivery._id));

                                        delivery.forSales = true;
                                        delivery.order = delivery._id.toString();
                                        delivery.supplier = delivery.client.id;
                                        delivery.ref_client = delivery.ref_client;

                                        if (delivery.billing && delivery.billing.societe.id)
                                            delivery.billing = delivery.billing.societe.id;

                                        if (delivery.bank_reglement)
                                            delivery.bank_reglement = (delivery.bank_reglement ? _.find(banks, _.matchesProperty('ref', delivery.bank_reglement))._id : null);

                                        if (delivery.delivery_mode)
                                            if (delivery.delivery_mode == 'Livraison')
                                                delivery.delivery_mode = 'SHIP_STANDARD';
                                            else
                                                delivery.delivery_mode = 'SHIP_NONE';
                                        else
                                            delivery.delivery_mode = 'SHIP_NONE';

                                        delivery.address = {
                                            street: delivery.address,
                                            city: delivery.town,
                                            zip: delivery.zip,
                                            country: delivery.country_id
                                        };

                                        delivery.shipping = {
                                            "total_taxes": [],
                                            "total_ht": delivery.shipping.total_ht
                                        };

                                        let commercial_id;

                                        delivery.ID = parseInt(delivery.ref.substr(7));

                                        if (delivery.commercial_id && delivery.commercial_id.id) {
                                            delivery.commercial_id.id = delivery.commercial_id.id.toString();
                                            if (delivery.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code)
                                                commercial_id = _.find(users, _.matchesProperty('username', delivery.commercial_id.id.substr(5)));
                                            else
                                                commercial_id = _.find(users, _.matchesProperty('relatedUser', delivery.commercial_id.id.toString()));

                                            if (commercial_id)
                                                delivery.salesPerson = commercial_id._id;
                                        }

                                        DeliveryModel.findById(delivery._id, function(err, newOrder) {
                                            if (err)
                                                return eCb(err);

                                            if (!newOrder)
                                                newOrder = new DeliveryModel(delivery);
                                            else
                                                newOrder = _.extend(newOrder, delivery);

                                            async.waterfall([
                                                function(sCb) {
                                                    newOrder.save((err, doc) => sCb(err, doc));
                                                },
                                                function(doc, sCb) {
                                                    const ProductModel = MODEL('product').Schema;

                                                    async.eachOfSeries(delivery.lines, function(line, i, cb) {
                                                        //console.log(line);
                                                        OrderRowsModel.findOne({
                                                            sequence: i,
                                                            order: doc._id
                                                        }, function(err, newLine) {

                                                            line.product = line.product.id;
                                                            line.order = doc._id;
                                                            delete line._id;
                                                            line.sequence = i;

                                                            if (line.tva_tx)
                                                                line.total_taxes = [{
                                                                    taxeId: _.find(taxes, _.matchesProperty('rate', line.tva_tx))._id
                                                                }];

                                                            //return console.log(line);

                                                            if (line.product)
                                                                line.type = 'product';
                                                            else
                                                                line.type = 'SUBTOTAL';

                                                            if (!newLine)
                                                                newLine = new OrderRowsModel(line);
                                                            else
                                                                newLine = _.extend(newLine, line);

                                                            newLine.save(cb);

                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({
                                                                order: doc._id
                                                            })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");

                                                    if (newOrder.isremoved)
                                                        return sCb(null, newOrder, {
                                                            total_ht: 0,
                                                            total_taxes: 0,
                                                            total_ttc: 0,
                                                            weight: 0
                                                        }, rows);

                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
                                                        if (err)
                                                            return sCb(err);

                                                        if (round(result.total_ttc) != round(delivery.total_ttc))
                                                            return sCb('Error diff order total old {2} : {0}  new :{1}'.format(delivery.total_ttc, result.total_ttc, delivery._id.toString()));

                                                        sCb(err, newOrder, result, rows)
                                                    });
                                                },
                                                function(newOrder, result, rows, sCb) {
                                                    // console.log(result);
                                                    newOrder.total_ht = result.total_ht;
                                                    newOrder.total_taxes = result.total_taxes;
                                                    newOrder.total_ttc = result.total_ttc;
                                                    newOrder.weight = result.weight;

                                                    //return console.log(result);

                                                    DeliveryModel.findByIdAndUpdate(newOrder._id, result, {
                                                        new: true
                                                    }, function(err, doc) {
                                                        sCb(err, doc, rows)
                                                    });
                                                },
                                                function(newOrder, rows, sCb) {
                                                    //order = _.extend(order, self.body);
                                                    //console.log(order.history);
                                                    //console.log(rows);
                                                    //update all rows
                                                    var newRows = [];
                                                    async.each(rows, function(orderRow, aCb) {
                                                            orderRow.order = newOrder._id;

                                                            orderRow.warehouse = newOrder.warehouse;

                                                            if (orderRow.isDeleted && !orderRow._id)
                                                                return aCb();


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, {
                                                                new: true
                                                            }, function(err, doc) {
                                                                if (err)
                                                                    return aCb(err);
                                                                newRows.push(doc);
                                                                aCb();
                                                            });


                                                        },
                                                        function(err) {
                                                            if (err)
                                                                return sCb(err);
                                                            sCb(null, delivery, newRows);
                                                        });
                                                },
                                            ], function(err) {
                                                eCb(err);
                                            });
                                        });
                                    });
                                },
                                function(err) {
                                    aCb(err);
                                });
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Delivery'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([loadBank, loadEmployees, loadTaxes, convertDelivery, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);



                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.511
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.511));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.512 : convert Transaction schema meta
            function(conf, wCb) {
                if (conf.version >= 0.512)
                    return wCb(null, conf);

                //Old convert first
                function oldConvert(aCb) {
                    console.log("convert compta Transaction meta");
                    const TransactionModel = MODEL('transaction').Schema;

                    async.waterfall([
                            function(wCb) {
                                console.log("convert compta Transaction meta societeId");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.societeId": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {

                                            //var bills = doc.meta.bills;

                                            //for (var i = 0, len = bills.length; i < len; i++)
                                            //    bills[i].billId = bills[i].billId.toString();

                                            TransactionModel.update({
                                                    _id: doc._id
                                                }, {
                                                    $set: {
                                                        "meta.supplier": doc.meta.societeId.toString()
                                                    }
                                                },
                                                function(err, res) {
                                                    if (err)
                                                        return eCb(err);

                                                    collection.update({
                                                        _id: doc._id
                                                    }, {
                                                        $unset: {
                                                            'meta.societeId': 1,
                                                            'meta.societeName': 1
                                                        }
                                                    }, function(err, doc) {

                                                        //doc.save(function(err, doc) {
                                                        return eCb(err);
                                                    });
                                                });
                                        }, wCb);
                                    });
                                });
                            },
                            function(wCb) {
                                console.log("convert compta Transaction meta billId");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.billId": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {
                                            TransactionModel.update({
                                                    _id: doc._id
                                                }, {
                                                    $set: {
                                                        "meta.invoice": doc.meta.billId.toString()
                                                    }
                                                },
                                                function(err, res) {
                                                    if (err)
                                                        return eCb(err);

                                                    collection.update({
                                                        _id: doc._id
                                                    }, {
                                                        $unset: {
                                                            'meta.billId': 1,
                                                            'meta.billRef': 1
                                                        }
                                                    }, function(err, doc) {

                                                        //doc.save(function(err, doc) {
                                                        return eCb(err);
                                                    });
                                                });
                                        }, wCb);

                                    });
                                });
                            },
                            function(wCb) {
                                console.log("convert compta Transaction meta billSupplierId");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.billSupplierId": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {
                                            TransactionModel.update({
                                                    _id: doc._id
                                                }, {
                                                    $set: {
                                                        "meta.invoice": doc.meta.billSupplierId.toString()
                                                    }
                                                },
                                                function(err, res) {
                                                    if (err)
                                                        return eCb(err);

                                                    collection.update({
                                                        _id: doc._id
                                                    }, {
                                                        $unset: {
                                                            'meta.billSupplierId': 1,
                                                            'meta.billSupplierRef': 1
                                                        }
                                                    }, function(err, doc) {

                                                        //doc.save(function(err, doc) {
                                                        return eCb(err);
                                                    });
                                                });
                                        }, wCb);

                                    });
                                });
                            },
                            function(wCb) {
                                console.log("convert compta Transaction meta productId");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.productId": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {
                                            TransactionModel.update({
                                                    _id: doc._id
                                                }, {
                                                    $set: {
                                                        "meta.product": doc.meta.productId.toString()
                                                    }
                                                },
                                                function(err, res) {
                                                    if (err)
                                                        return eCb(err);

                                                    collection.update({
                                                        _id: doc._id
                                                    }, {
                                                        $unset: {
                                                            'meta.productId': 1,
                                                            'meta.productRef': 1
                                                        }
                                                    }, function(err, doc) {

                                                        //doc.save(function(err, doc) {
                                                        return eCb(err);
                                                    });
                                                });
                                        }, wCb);
                                    });
                                });
                            },
                            function(wCb) {

                                //TODO TVA-TX ?
                                console.log("convert compta Transaction meta bills");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.bills.billId": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {


                                            var bills = doc.meta.bills;

                                            for (var i = 0, len = bills.length; i < len; i++)
                                                bills[i] = {
                                                    amount: bills[i].amount,
                                                    invoice: bills[i].billId.toString()
                                                };


                                            //console.log(bills);

                                            TransactionModel.update({
                                                _id: doc._id
                                            }, {
                                                $set: {
                                                    "meta.bills": bills
                                                }
                                            }, function(err, doc) {

                                                //doc.save(function(err, doc) {
                                                return eCb(err);
                                            });
                                        }, wCb);
                                    });
                                });
                            },
                            function(wCb) {
                                console.log("convert compta Transaction meta billsSupplier");
                                mongoose.connection.db.collection('Transaction', function(err, collection) {
                                    collection.find({
                                        "meta.billsSupplier": {
                                            $ne: null
                                        }
                                    }).toArray(function(err, docs) {
                                        if (err)
                                            return wCb(err);

                                        if (!docs)
                                            return wCb();

                                        async.forEach(docs, function(doc, eCb) {
                                            var bills = doc.meta.billsSupplier;

                                            async.forEach(bills, function(bill, fCb) {
                                                let newBill = {
                                                    amount: bill.amount,
                                                    invoice: bill.billSupplierId.toString()
                                                };
                                                TransactionModel.update({
                                                    _id: doc._id
                                                }, {
                                                    $addToSet: {
                                                        "meta.bills": newBill
                                                    }
                                                }, function(err, doc) {

                                                    //doc.save(function(err, doc) {
                                                    if (err)
                                                        console.log(err);
                                                    fCb();
                                                });
                                            }, function(err) {

                                                collection.update({
                                                    _id: doc._id
                                                }, {
                                                    $unset: {
                                                        "meta.billsSupplier": 1
                                                    }
                                                }, function(err, doc) {

                                                    //doc.save(function(err, doc) {
                                                    return eCb(err);
                                                });
                                            });
                                        }, wCb);
                                    });
                                });
                            }
                        ],
                        function(err) {
                            aCb(err);
                        });
                }

                async.waterfall([oldConvert], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.512
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.512));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.513:  add  new Payment model -> convert LCR module
            function(conf, wCb) {
                if (conf.version >= 0.513)
                    return wCb(null, conf);

                //Old convert first
                function convertLCR(aCb) {
                    console.log("convert lcr model");
                    const PaymentModel = MODEL('payment').Schema;
                    const BillModel = MODEL('invoice').Schema;

                    mongoose.connection.db.collection('Lcr', function(err, collection) {
                        collection.find({}).toArray(function(err, lcrs) {
                            if (err)
                                return console.log(err);

                            if (!lcrs)
                                return aCb();

                            async.forEachSeries(lcrs, function(lcr, eCb) {

                                PaymentModel.findById(lcr._id, function(err, doc) {
                                    if (err)
                                        return eCb(err);

                                    if (!doc)
                                        doc = new PaymentModel(lcr);

                                    delete lcr.__v;

                                    doc = _.extend(doc, lcr);
                                    doc.mode_reglement = "LCR";

                                    async.forEach(lcr.lines, function(line, cb) {
                                        delete line._id;

                                        BillModel.findById(line.bill, "supplier", function(err, bill) {
                                            if (err)
                                                return cb(err);

                                            if (bill)
                                                line.supplier = bill.supplier;

                                            line.bills = [{
                                                invoice: line.bill,
                                                amount: line.amount
                                            }];

                                            cb();
                                        });
                                    }, function(err) {

                                        doc.lines = lcr.lines;

                                        console.log(doc);

                                        doc.save(eCb);
                                    })
                                });

                                //Select only objectId()
                                //OrderModel.update({ Status: 'CLOSED' }, { $set: { Status: "BILLED" } }, { multi: true }, aCb);
                            }, aCb);
                        });

                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Lcr'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([convertLCR, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.513
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.513));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.514 : convert Object for Transaction model
            // ATTENTION il faut migrer les banques a la main pour ajouter la bank dans les meta
            /*
            db.getCollection('Transaction').update(
                // query 
                {
                    'accounts':"512110"
                },
                
                // update 
                {
                    $set : {'meta.bank':ObjectId("586a080bdb5b6948a2ba0c6c")}
                },
                
                // options 
                {
                    "multi" : true,  // update only one document 
                    "upsert" : false  // insert a new document, if no existing document match the query 
                }
            );*/
            function(conf, wCb) {
                if (conf.version >= 0.514)
                    return wCb(null, conf);

                const ObjectId = MODULE('utils').ObjectId;

                function convertSeqFF(aCb) {
                    const SeqModel = MODEL('Sequence').Schema;

                    SeqModel.findById('FF', function(err, seq) {
                        if (err)
                            return console.log(err);

                        if (!seq)
                            return aCb();

                        seq = new SeqModel({
                            _id: "INVOICE_SUPPLIER",
                            seq: seq.seq
                        });

                        seq.save(function(err, doc) {
                            aCb();
                        });
                    });
                }

                function convertSupplier(aCb) {
                    console.log("convert journal : supplier");
                    const TransactionModel = MODEL('transaction').Schema;

                    //Select only objectId()
                    TransactionModel.find({
                        "meta.supplier": {
                            $type: 2
                        }
                    }, function(err, docs) {
                        if (err)
                            return console.log(err);

                        docs.forEach(function(doc) {

                            //console.log(bills);

                            doc.update({
                                $set: {
                                    "meta.supplier": ObjectId(doc.meta.supplier)
                                }
                            }, function(err, doc) {
                                if (err)
                                    console.log(err);
                            });
                        });

                    });

                    aCb();
                }

                function convertBills(aCb) {
                    console.log("convert bill journal");
                    const TransactionModel = MODEL('transaction').Schema;

                    //Select only objectId()
                    TransactionModel.find({
                        "meta.bills.invoice": {
                            $type: 2
                        }
                    }, function(err, docs) {
                        if (err)
                            return console.log(err);

                        docs.forEach(function(doc) {

                            var bills = doc.meta.bills;

                            for (var i = 0, len = bills.length; i < len; i++)
                                bills[i].invoice = ObjectId(bills[i].invoice);


                            //console.log(bills);

                            doc.update({
                                $set: {
                                    "meta.bills": bills
                                }
                            }, function(err, doc) {

                                //doc.save(function(err, doc) {
                                if (err)
                                    console.log(err);
                            });
                        });

                    });

                    aCb();
                }

                function convertBank(aCb) {
                    console.log("convert journal : bank");
                    const TransactionModel = MODEL('transaction').Schema;

                    //Select only objectId()
                    TransactionModel.find({
                        "meta.bank": {
                            $type: 2
                        }
                    }, function(err, docs) {
                        if (err)
                            return console.log(err);

                        docs.forEach(function(doc) {

                            //console.log(bills);

                            doc.update({
                                $set: {
                                    "meta.bank": ObjectId(doc.meta.bank)
                                }
                            }, function(err, doc) {
                                if (err)
                                    console.log(err);
                            });
                        });

                    });

                    aCb();
                }

                function convertProduct(aCb) {
                    console.log("convert journal : product");
                    const TransactionModel = MODEL('transaction').Schema;

                    //Select only objectId()
                    TransactionModel.find({
                        "meta.product": {
                            $type: 2
                        }
                    }, function(err, docs) {
                        if (err)
                            return console.log(err);

                        docs.forEach(function(doc) {

                            //console.log(bills);

                            doc.update({
                                $set: {
                                    "meta.product": ObjectId(doc.meta.product)
                                }
                            }, function(err, doc) {
                                if (err)
                                    console.log(err);
                            });
                        });

                    });

                    aCb();
                }

                function convertInvoiceArray(aCb) {
                    console.log("convert journal : Invoice to Array");
                    const TransactionModel = MODEL('transaction').Schema;

                    //Select only objectId()
                    TransactionModel.find({
                            "meta.invoice": {
                                $ne: null
                            }
                        })
                        .populate("meta.invoice")
                        .exec(function(err, docs) {
                            if (err)
                                return console.log(err);

                            docs.forEach(function(doc) {

                                //console.log(bills);

                                var bills = [{
                                    invoice: doc.meta.invoice._id,
                                    amount: doc.meta.invoice.total_paid
                                }];

                                doc.update({
                                    $unset: {
                                        "meta.invoice": 1
                                    },
                                    $set: {
                                        "meta.bills": bills
                                    }
                                }, function(err, doc) {
                                    if (err)
                                        console.log(err);
                                });
                            });

                        });

                    aCb();
                }

                async.waterfall([convertSeqFF, convertSupplier, convertBills, convertBank, convertProduct, convertInvoiceArray], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.514
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.514));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            //version 0.515 : convert address from old users
            /*function(conf, wCb) {
                if (conf.version >= 0.515)
                    return wCb(null, conf);

                //Change users schema
                function users(aCb) {
                    console.log("convert users address");
                    var UserModel = MODEL('Users').Schema;
                    var EmployeeModel = MODEL('Employees').Schema;

                    mongoose.connection.db.collection('users', function(err, collection) {
                        collection.find({ _type: 'hr' }).toArray(function(err, users) {
                            if (err)
                                return console.log(err);

                            if (!users)
                                return aCb();

                            async.forEachSeries(users, function(user, eCb) {

                                if (user == null)
                                    return eCb();

                                if (!user.email)
                                    return eCb();

                                UserModel.findOne({ username: user.username }, function(err, newUser) {
                                    if (!newUser)
                                        newUser = new UserModel();

                                    var id = user._id;
                                    //delete user._id;

                                    //console.log(newUser);

                                    newUser = _.extend(newUser, user);

                                    if (user.Status == 'ENABLE')
                                        newUser.isEnable = true;
                                    else
                                        newUser.isEnable = false;

                                    newUser.save(function(err, doc) {
                                        if (err)
                                            return eCb(err);

                                        EmployeeModel.findOne({ relatedUser: doc._id }, function(err, employee) {
                                            if (err)
                                                return eCb(err);

                                            if (!employee)
                                                employee = new EmployeeModel();

                                            employee = _.extend(employee, {
                                                relatedUser: doc._id,
                                                isEmployee: true,
                                                name: {
                                                    first: user.firstname,
                                                    last: user.lastname
                                                },
                                                emails: {
                                                    work: user.email
                                                },
                                                "jobPosition": "57cc0b0d2de00d14145d9929",
                                                "department": "57cc0a2d2de00d14145d9922",

                                                dateBirth: user.birthDate,
                                                arrivalDate: user.arrivalDate,

                                                internalNotes: {
                                                    new: user.descriptionPoste + "\n" + user.sector,
                                                    old: user.descriptionPoste + "\n" + user.sector
                                                },

                                                phones: {
                                                    mobile: user.telMobile,
                                                    phone: user.telFixe,
                                                    personal: ""
                                                },

                                                homeAddress: {
                                                    street: user.address,
                                                    city: user.town,
                                                    state: "",
                                                    zip: user.zip,
                                                    country: "FR"
                                                }
                                            });

                                            employee.save(function(err, employee) {
                                                console.log(employee);
                                                if (err)
                                                    return eCb(err);

                                                eCb();
                                            });
                                        });
                                    });
                                });
                            }, aCb);
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['users'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([users, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', { 'values.version': 0.514 }, { new: true }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.514));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            }*/
            //version 0.516 : Fix author in journal Transaction
            function(conf, wCb) {
                if (conf.version >= 0.516)
                    return wCb(null, conf);

                function journal(aCb) {
                    console.log("convert journal author");
                    const JournalModel = MODEL('journal').Schema;
                    const ObjectId = MODULE('utils').ObjectId;

                    mongoose.connection.db.collection('Journal', function(err, collection) {
                        collection.find({
                            author: {
                                $type: 3
                            }
                        }).toArray(function(err, docs) {
                            if (err)
                                return console.log(err);

                            if (!docs)
                                return aCb();

                            async.forEachSeries(docs, function(doc, eCb) {

                                if (doc == null)
                                    return eCb();

                                console.log(ObjectId(doc.author._id));

                                JournalModel.update({
                                        _id: doc._id
                                    }, {
                                        $set: {
                                            author: ObjectId(doc.author._id)
                                        }
                                    },
                                    function(err, doc) {

                                        return eCb(err);

                                    });
                            }, aCb);
                        });
                    });
                }

                async.waterfall([journal], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.516
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.516));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.517 : rename date_livraison -> datedl
            function(conf, wCb) {
                if (conf.version >= 0.517)
                    return wCb(null, conf);

                function renameDateOrders(aCb) {
                    console.log("convert $rename date_livraison");
                    const ObjectId = MODULE('utils').ObjectId;

                    mongoose.connection.db.collection('Orders', function(err, collection) {
                        collection.update({
                                date_livraison: {
                                    $exists: true
                                }
                            }, {
                                $rename: {
                                    date_livraison: "datedl"
                                }
                            }, {
                                multi: true,
                                upsert: false
                            },
                            function(err, doc) {
                                return aCb(err);
                            });
                    });
                }

                function convertDeliveryDatedl(aCb) {
                    console.log("re-convert delivery for datedl");
                    const DeliveryModel = MODEL('order').Schema.GoodsOutNote;

                    mongoose.connection.db.collection('Delivery', function(err, collection) {
                        collection.find({}).toArray(function(err, deliveries) {
                            if (err)
                                return console.log(err);

                            if (!deliveries)
                                return aCb();

                            async.forEachSeries(deliveries, function(delivery, eCb) {

                                if (delivery == null)
                                    return eCb();

                                DeliveryModel.update({
                                    _id: delivery._id
                                }, {
                                    $set: {
                                        datedl: delivery.datedl
                                    }
                                }, {
                                    upsert: false
                                }, eCb);
                            }, aCb);
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Delivery'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([renameDateOrders, convertDeliveryDatedl, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.517
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.517));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.519 : add rights on orders and invoices
            function(conf, wCb) {
                if (conf.version >= 0.519)
                    return wCb(null, conf);

                function convertOrders(aCb) {
                    console.log("convert order rights");

                    const Model = MODEL('order').Schema.Order;

                    Model.update({}, {
                            $set: {
                                "whoCanRW": "everyOne",
                                "groups": {
                                    "group": [],
                                    "users": [],
                                    "owner": null
                                }
                            }
                        }, {
                            multi: true,
                            upsert: false
                        },
                        function(err, doc) {
                            return aCb(err);
                        });
                }

                function convertInvoices(aCb) {
                    console.log("convert invoice rights");

                    const Model = MODEL('invoice').Schema;

                    Model.update({}, {
                            $set: {
                                "whoCanRW": "everyOne",
                                "groups": {
                                    "group": [],
                                    "users": [],
                                    "owner": null
                                }
                            }
                        }, {
                            multi: true,
                            upsert: false
                        },
                        function(err, doc) {
                            return aCb(err);
                        });
                }

                function convertCustomer(aCb) {
                    console.log("convert customer Name");

                    const Model = MODEL('Customers').Schema;

                    Model.update({
                            'name.first': null
                        }, {
                            $set: {
                                'name.first': ""
                            }
                        }, {
                            multi: true,
                            upsert: false
                        },
                        function(err, doc) {
                            return aCb(err);
                        });
                }

                function convertDateDl(aCb) {
                    console.log("convert order null datedl");

                    const Model = MODEL('order').Schema.Order;

                    Model.find({
                        datedl: null
                    }, "_id datec", function(err, docs) {
                        if (err)
                            return aCb(err);

                        if (!docs)
                            return aCb();

                        docs.forEach(function(line) {
                            Model.update({
                                    _id: line._id
                                }, {
                                    $set: {
                                        datedl: line.datec
                                    }
                                }, {
                                    multi: false,
                                    upsert: false
                                },
                                function(err, doc) {});
                        });
                        aCb();
                    });
                }

                async.waterfall([convertOrders, convertInvoices, convertCustomer, convertDateDl], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.519
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.519));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.520 : check delivery address Customers
            function(conf, wCb) {
                if (conf.version >= 0.520)
                    return wCb(null, conf);

                function checkDelivery(aCb) {
                    console.log("checkShippingAddress");

                    const Model = MODEL('Customers').Schema;

                    mongoose.connection.db.collection('Societe', function(err, collection) {
                        collection.find().toArray(function(err, societes) {
                            if (err)
                                return console.log(err);

                            async.forEachLimit(societes, 100, function(societe, eCb) {
                                Model.findById(societe._id, "shippingAddress deliveryAddressId", function(err, customer) {
                                    if (customer.shippingAddress.length === societe.addresses.length)
                                        return eCb();

                                    for (var i = 1; i < societe.addresses.length; i++) {
                                        customer.shippingAddress[i] = {
                                            _id: societe.addresses[i]._id,
                                            "Status": societe.addresses[i].Status,
                                            "contact": {
                                                "fax": "",
                                                "mobile": "",
                                                "phone": "",
                                                "name": ""
                                            },
                                            "name": societe.addresses[i].name,
                                            "country": "FR",
                                            "zip": societe.addresses[i].zip,
                                            "state": "",
                                            "city": societe.addresses[i].town,
                                            "street": societe.addresses[i].address
                                        };
                                    }

                                    customer.deliveryAddressId = societe.deliveryAddressId;

                                    Model.findByIdAndUpdate(societe._id, customer, eCb);
                                });
                            }, aCb);
                        });
                    });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Societe'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }

                async.waterfall([checkDelivery, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.520
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.520));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.521 : contact refresh link
            function(conf, wCb) {
                if (conf.version >= 0.521)
                    return wCb(null, conf);

                function checkContact(aCb) {
                    console.log("checkContact");

                    const CustomerModel = MODEL('Customers').Schema;

                    CustomerModel.find({
                            type: "Person",
                            company: {
                                $ne: null
                            }
                        })
                        .populate("company", "name")
                        .exec(function(err, contacts) {
                            if (err || !contacts)
                                return;

                            async.forEach(contacts, function(contact, eCb) {
                                if (!contact.company)
                                    contact.update({
                                        $set: {
                                            company: null
                                        }
                                    }, function(err, doc) {});
                                eCb();

                            }, function(err) {
                                aCb();
                            });
                        });

                }

                async.waterfall([checkContact], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.521
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.521));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.x : checkBill and checkDeliveries
            function(conf, wCb) {
                //if (conf.version >= 0.522)
                //    return wCb(null, conf);

                function checkOrder(aCb) {
                    console.log("checkOrder");

                    const Model = MODEL('order').Schema.OrderCustomer;
                    const DeliveryModel = MODEL('order').Schema.GoodsOutNote;
                    const BillModel = MODEL('invoice').Schema;

                    Model.find({
                            Status: {
                                $in: ["PROCESSING", "BILLED"]
                            },
                            datedl: {
                                $gte: moment().subtract(5, 'day').toDate()
                            },
                            isremoved: {
                                $ne: true
                            }
                        })
                        .exec(function(err, orders) {
                            if (err || !orders)
                                return;

                            console.log(orders.length);
                            var cpt = 0;
                            async.forEach(orders, function(order, eCb) {

                                async.parallel([
                                    function(pCb) {
                                        DeliveryModel.find({
                                            order: order._id,
                                            isremoved: {
                                                $ne: true
                                            }
                                        }, pCb);
                                    },
                                    function(pCb) {
                                        BillModel.find({
                                            orders: order._id,
                                            isremoved: {
                                                $ne: true
                                            }
                                        }, pCb);
                                    }
                                ], function(err, results) {
                                    if (err)
                                        return console.log(err);

                                    if (!results[0].length || !results[1].length) {
                                        console.log("order : ", order._id);
                                        cpt++;
                                    }

                                    eCb();
                                });

                            }, function(err) {
                                aCb();
                                console.log(cpt);
                            });
                        });

                }

                async.waterfall([checkOrder], function(err) {
                    if (err)
                        return console.log(err);

                    /*Dict.findByIdAndUpdate('const', {
                        'values.version': 0.521
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.521));
                        wCb(err, doc.values);*/
                    wCb(err, conf);
                    // });
                });
            },
            // 0.60 : fix convert BillSupplier : Restore old Transaction to Transaction_old
            function(conf, wCb) {
                if (conf.version >= 0.6)
                    return wCb(null, conf);

                /*function convertBillsSupplier(aCb) {
                    const TransactionModel = MODEL('transaction').Schema;

                    console.log("convert compta Transaction meta billsSupplier");
                    mongoose.connection.db.collection('Transaction_old', function(err, collection) {
                        collection.find({ "meta.billsSupplier": { $ne: null } }).toArray(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb("Vous devez restaurer l'ancien transaction model");

                            async.forEach(docs, function(doc, eCb) {
                                var bills = doc.meta.billsSupplier;

                                async.forEach(bills, function(bill, fCb) {
                                    let newBill = {
                                        amount: bill.amount,
                                        invoice: bill.billSupplierId.toString()
                                    };
                                    TransactionModel.update({ _id: doc._id }, { $addToSet: { "meta.bills": newBill } }, function(err, doc) {

                                        //doc.save(function(err, doc) {
                                        if (err)
                                            console.log(err);
                                        fCb();
                                    });
                                }, function(err) {

                                    collection.update({ _id: doc._id }, { $unset: { "meta.billsSupplier": 1 } }, function(err, doc) {

                                        //doc.save(function(err, doc) {
                                        return eCb(err);
                                    });
                                });
                            }, aCb);
                        });
                    });
                }*/

                function convertBillSupplierRef(aCb) {
                    const TransactionModel = MODEL('transaction').Schema;

                    console.log("convert compta Transaction meta billSupplierId");
                    mongoose.connection.db.collection('Transaction', function(err, collection) {
                        collection.find({
                            "meta.billSupplierId": {
                                $ne: null
                            }
                        }).toArray(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {

                                TransactionModel.update({
                                        _id: doc._id
                                    }, {
                                        $set: {
                                            "meta.invoice": doc.meta.billSupplierId.toString()
                                        }
                                    },
                                    function(err, res) {
                                        if (err)
                                            return eCb(err);

                                        collection.update({
                                            _id: doc._id
                                        }, {
                                            $unset: {
                                                'meta.billSupplierId': 1,
                                                'meta.billSupplierRef': 1
                                            }
                                        }, function(err, doc) {

                                            //doc.save(function(err, doc) {
                                            return eCb(err);
                                        });
                                    });
                            }, aCb);

                        });
                    });

                }

                function convertSupplierBills(aCb) {
                    const TransactionModel = MODEL('transaction').Schema;

                    TransactionModel.find({
                            "meta.invoice": {
                                $ne: null
                            }
                        })
                        .populate("meta.invoice")
                        .exec(function(err, docs) {
                            if (err)
                                return console.log(err);

                            async.forEach(docs, function(doc, fCb) {

                                console.log(doc);

                                var bills = [{
                                    invoice: doc.meta.invoice._id,
                                    amount: doc.meta.invoice.total_paid
                                }];

                                doc.update({
                                    $unset: {
                                        "meta.invoice": 1
                                    },
                                    $set: {
                                        "meta.bills": bills
                                    }
                                }, function(err, doc) {
                                    if (err)
                                        console.log(err);

                                    fCb(err);

                                    F.emit("invoice:recalculateStatus", {
                                        invoice: {
                                            _id: bills[0].invoice
                                        },
                                        userId: null
                                    });

                                });
                            }, aCb);
                        });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Transaction_old'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }



                async.waterfall([ /*convertBillsSupplier,*/ convertBillSupplierRef, convertSupplierBills, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.6
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.6));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.61 : Memo in transaction for TVA
            function(conf, wCb) {
                if (conf.version >= 0.61)
                    return wCb(null, conf);

                function convertTransactionTVA(aCb) {
                    const TransactionModel = MODEL('transaction').Schema;

                    console.log("convert compta Transaction memo");
                    TransactionModel.find({
                            memo: new RegExp('TVA', 'g'),
                            'meta.supplier': {
                                $ne: null
                            }
                        })
                        .populate('meta.supplier', "name")
                        .exec(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {

                                TransactionModel.update({
                                        _id: doc._id
                                    }, {
                                        $set: {
                                            "memo": doc.meta.supplier.fullName
                                        }
                                    },
                                    function(err, res) {
                                        if (err)
                                            return eCb(err);

                                        //doc.save(function(err, doc) {
                                        return eCb(err);
                                    });
                            }, aCb);

                        });

                }

                async.waterfall([convertTransactionTVA], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.61
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.61));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.62 : Schema modify Order Delivery status
            function(conf, wCb) {
                if (conf.version >= 0.62)
                    return wCb(null, conf);

                function convertStatusDelivery(aCb) {
                    const OrderModel = MODEL('order').Schema.GoodsOutNote;

                    console.log("convert Delivery status.");
                    OrderModel.find({})
                        .lean()
                        .exec(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {
                                return OrderModel.findByIdAndUpdate(doc._id, {
                                    $set: {
                                        status: doc.status
                                    }
                                }, {
                                    upsert: false,
                                    new: true
                                }, function(err, doc) {
                                    eCb(err);
                                });
                            }, aCb);
                        });
                }

                function convertStatusStockReturns(aCb) {
                    const StockReturnModel = MODEL('order').Schema.stockReturns;

                    console.log("convert stockReturns status.");
                    StockReturnModel.find({})
                        .lean()
                        .exec(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {
                                return StockReturnModel.findByIdAndUpdate(doc._id, {
                                    $set: {
                                        status: doc.status
                                    }
                                }, {
                                    upsert: false,
                                    new: true
                                }, function(err, doc) {
                                    eCb(err);
                                });
                            }, aCb);

                        });

                }

                function convertStatusGoodsInNote(aCb) {
                    const OrderModel = MODEL('order').Schema.GoodsInNote;

                    console.log("convert GoodsInNote status.");
                    OrderModel.find({})
                        .lean()
                        .exec(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {
                                return OrderModel.findByIdAndUpdate(doc._id, {
                                    $set: {
                                        status: doc.status
                                    }
                                }, {
                                    upsert: false,
                                    new: true
                                }, function(err, doc) {
                                    eCb(err);
                                });
                            }, aCb);

                        });

                }

                async.waterfall([convertStatusDelivery, convertStatusStockReturns, convertStatusGoodsInNote], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.62
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.62));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.x Refresh All Supplier Status
            function(conf, wCb) {

                function checkCustomerStatus(aCb) {
                    console.log("checkCustomerStatus");

                    const Model = MODEL('Customers').Schema;

                    Model.find({
                            isremoved: {
                                $ne: true
                            },
                            updatedAt: {
                                $lte: moment().subtract(3, 'month').toDate()
                            }
                        }, "_id", {
                            limit: 1500
                        })
                        .exec(function(err, docs) {
                            if (err || !docs)
                                return;

                            async.eachLimit(docs, 100, function(doc, eCb) {
                                F.emit('customer:recalculateStatus', {
                                    userId: null,
                                    supplier: {
                                        _id: doc._id.toString()
                                    }
                                });
                                eCb();

                            }, aCb);
                        });

                }

                async.waterfall([checkCustomerStatus], function(err) {
                    if (err)
                        return console.log(err);

                    wCb(err, conf);
                });
            },
            // 0.x Scan VAT
            function(conf, wCb) {

                function checkVAT(aCb) {
                    console.log("checkVAT");

                    const Model = MODEL('invoice').Schema;

                    Model.aggregate([{
                            $match: {
                                forSales: true,
                                isremoved: {
                                    $ne: true
                                },
                                datec: {
                                    $gte: moment().startOf('year').toDate(),
                                    $lte: moment().endOf('year').toDate()
                                }
                            }
                        },
                        {
                            $unwind: "$total_taxes"
                        },
                        {
                            $group: {
                                _id: {
                                    taxId: "$total_taxes.taxeId",
                                    Status: "$Status"
                                },
                                total: {
                                    "$sum": "$total_taxes.value"
                                }
                            }
                        }, {
                            $lookup: {
                                from: 'taxes',
                                localField: '_id.taxId',
                                foreignField: '_id',
                                as: '_id.taxId'
                            }
                        }, {
                            $unwind: "$_id.taxId"
                        },
                        {
                            $project: {
                                _id: '$_id.taxId._id',
                                account: '$_id.taxId.sellAccount',
                                Status: '$_id.Status',
                                total: 1
                            }
                        }
                    ], function(err, docs) {
                        if (err || !docs)
                            return aCb(err);

                        console.log(docs);
                        aCb(err);
                    });

                }

                async.waterfall([checkVAT], function(err) {
                    if (err)
                        return console.log(err);

                    wCb(err, conf);
                });
            },
            // 0.63 : Add new Status invoiceStatus in order
            function(conf, wCb) {
                if (conf.version >= 0.63)
                    return wCb(null, conf);

                function updateOldOrder(aCb) {
                    const OrderModel = MODEL('order').Schema.OrderCustomer;

                    console.log("re-import old order");
                    mongoose.connection.db.collection('Commande', function(err, collection) {
                        collection.find({
                            Status: "CLOSED"
                        }).toArray(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEach(docs, function(doc, eCb) {

                                OrderModel.update({
                                        _id: doc._id
                                    }, {
                                        $set: {
                                            "Status": "CLOSED",
                                            "status.fulfillStatus": 'ALL',
                                            "status.allocateStatus": 'ALL',
                                            "status.shippingStatus": 'ALL',
                                            "status.invoiceStatus": 'ALL'
                                        }
                                    }, {
                                        upsert: false,
                                        multi: false
                                    },
                                    function(err, res) {
                                        if (err)
                                            return eCb(err);

                                        //doc.save(function(err, doc) {
                                        return eCb(err);
                                    });
                            }, aCb);

                        });
                    });

                }

                function updateNewOrder(aCb) {
                    const OrderModel = MODEL('order').Schema.OrderCustomer;

                    console.log("Status PROCESSING");
                    OrderModel.update({
                            Status: "BILLED"
                        }, {
                            $set: {
                                "Status": "PROCESSING"
                            }
                        }, {
                            upsert: false,
                            multi: true
                        },
                        function(err, res) {
                            if (err)
                                return aCb(err);

                            //doc.save(function(err, doc) {
                            return aCb(err);
                        });
                }


                function refreshAllOrder(aCb) {
                    const OrderModel = MODEL('order').Schema.OrderCustomer;

                    console.log("Update Order status.");
                    OrderModel.find({
                            isremoved: {
                                $ne: true
                            },
                            Status: {
                                $nin: ['CANCELED', 'CLOSED']
                            }
                        }, "_id")
                        .lean()
                        .exec(function(err, docs) {
                            if (err)
                                return aCb(err);

                            if (!docs || !docs.length)
                                return aCb();

                            async.forEachLimit(docs, 100, function(doc, eCb) {

                                return F.emit('order:recalculateStatus', {
                                    userId: null,
                                    order: {
                                        _id: doc._id.toString()
                                    }
                                }, eCb);

                            }, aCb);
                        });
                }

                function dropCollectionEnd(aCb) {
                    var collectionName = ['Commande'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null);
                }


                async.waterfall([updateOldOrder, updateNewOrder, refreshAllOrder, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.63
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.63));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            },
            // 0.64 : ProductType disabled ESHOP
            function(conf, wCb) {
                if (conf.version >= 0.64)
                    return wCb(null, conf);

                function convertProductType(aCb) {
                    const Model = MODEL('productTypes').Schema;

                    console.log("update productType");

                    async.parallel([
                        function(pCb) {
                            Model.update({
                                isService: false
                            }, {
                                $set: {
                                    isProduct: true
                                }
                            }, {
                                upsert: false,
                                multi: true
                            }, pCb);
                        },
                        function(pCb) {
                            Model.update({
                                isService: true
                            }, {
                                $set: {
                                    isProduct: false
                                }
                            }, {
                                upsert: false,
                                multi: true
                            }, pCb);
                        },
                        function(pCb) {
                            Model.update({}, {
                                $set: {
                                    isEShop: false
                                }
                            }, {
                                upsert: false,
                                multi: true
                            }, pCb);
                        }
                    ], function(err, docs) {
                        aCb(err);
                    });

                }

                async.waterfall([convertProductType], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', {
                        'values.version': 0.64
                    }, {
                        new: true
                    }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.64));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            }
        ],
        function(err, doc) {
            console.log("End update");
            if (err)
                return console.log(err);

        });
});

function Install() {
    this.read = function() {
        var self = this;
        var BankModel = MODEL('bank').Schema;

        //console.log(self.query.entity);

        var balances = [];

        var query = {};

        //if(self.query.entity)
        //    query.entity = self.query.entity;

        BankModel.find(query, "", {
            sort: {
                journalId: 1
            }
        }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);
            self.json(doc);
        });

    };
}