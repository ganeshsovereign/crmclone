"use strict";

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    async = require('async');


var round = MODULE('utils').round;

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

                Dict.remove({ _id: 'const' }, function(err, doc) {
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

                //Change users schema
                function users(aCb) {
                    console.log("convert users");
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
                                                "department": "57cc0a2d2de00d14145d9922"
                                            });

                                            employee.save(function(err, employee) {
                                                if (err)
                                                    return eCb(err);

                                            });
                                        });
                                    });

                                    collection.deleteOne({ _id: id }, function(err, results) {
                                        if (err)
                                            return eCb(err);

                                        eCb();

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
                                        return ({ name: doc.priceListCode, _id: doc._id.toString() });
                                    });

                                    aCb(null, priceLists);
                                });
                            }

                            if (!pricelevels)
                                return loadPriceList();

                            async.forEach(pricelevels, function(pricelevel, eCb) {

                                if (!pricelevel)
                                    return eCb();

                                PriceListModel.findOne({ priceListCode: pricelevel }, function(err, priceList) {
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

                                CustomerModel.findOne({ _id: societe._id }, function(err, customer) {
                                    if (!customer)
                                        customer = new CustomerModel();

                                    var name = societe.name;
                                    delete societe.name;
                                    var address = societe.address;
                                    delete societe.address;
                                    delete societe.__v;

                                    customer = _.extend(customer, societe);
                                    customer.type = "Company";
                                    customer.name = {
                                        last: name
                                    };

                                    customer.emails = [{
                                        email: societe.email
                                    }];

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
                                        phone: societe.phone,
                                        fax: societe.fax
                                    };


                                    if (societe.entity !== 'ALL')
                                        customer.entity = [societe.entity];

                                    if (societe.code_fournisseur)
                                        societe.code_client = societe.code_fournisseur;
                                    if (societe.code_client) {
                                        if (societe.code_client.substr(0, 3) == 'SY-' || societe.code_client.substr(0, 3) == 'LC-')
                                            societe.code_client = "";
                                        else
                                            societe.code_client = societe.code_client.substr(0, 7);
                                    }

                                    /*if (societe.commercial_id && societe.commercial_id.id) {
                                        console.log(employees, societe.commercial_id.id);
                                        console.log(_.find(employees, _.matchesProperty('relatedUser', societe.commercial_id.id.toString())));
                                    }*/



                                    customer.salesPurchases = {
                                        isGeneric: false,
                                        isProspect: (societe.Status == 'ST_PFROI' || societe.Status == 'ST_PTIED' || societe.Status == 'ST_PCHAU' ? true : false),
                                        isCustomer: (societe.Status == 'ST_CREC' || societe.Status == 'ST_CFID' || societe.Status == 'ST_CINF3' || societe.Status == 'ST_CPAR' || societe.Status == 'ST_INF3' ? true : false),
                                        isSupplier: (societe.fournisseur == 'SUPPLIER' ? true : false),
                                        isSubcontractor: (societe.fournisseur == 'SUBCONTRACTOR' ? true : false),
                                        salesPerson: (societe.commercial_id && societe.commercial_id.id && societe.commercial_id.id.toString().length == 24 ? _.find(employees, _.matchesProperty('relatedUser', societe.commercial_id.id.toString()))._id : null), //commercial_id
                                        isActive: true,
                                        ref: societe.code_client || null,
                                        cptBilling: (societe.cptBilling && societe.cptBilling.id ? societe.cptBilling.id : null),
                                        priceList: _.find(priceLists, _.matchesProperty('name', societe.price_level))._id,

                                        cond_reglement: societe.cond_reglement,
                                        mode_reglement: societe.mode_reglement,
                                        bank_reglement: (societe.bank_reglement ? _.find(banks, _.matchesProperty('ref', societe.bank_reglement))._id : null),
                                        VATIsUsed: societe.VATIsUsed,

                                        rival: [societe.rival],

                                        customerAccount: societe.code_compta,
                                        supplierAccount: societe.code_compta_fournisseur
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

                                        collection.remove({ _id: societe._id }, function(err, res) {});

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

                        collection.find({ _type: 'contact' }).toArray(function(err, contacts) {
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
                                    phone: contact.phone,
                                    mobile: contact.phone_mobile,
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

                                    collection.remove({ _id: contact._id }, function(err, res) {});

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

                                ProductFamilyModel.findOne({ "langs.name": doc }, function(err, family) {
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
                        async.series([function(sCb) {
                                collection.update({ 'suppliers.societe': {} }, { $unset: { "suppliers.$.societe": 1 } }, function(err, docs) {});
                                collection.find({ 'suppliers.societe.name': { $ne: null } }).toArray(function(err, docs) {
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

                                        collection.update({ _id: doc._id }, { $set: { "suppliers": doc.suppliers } }, { upsert: false, multi: false }, eCb);
                                    }, sCb);
                                });
                            },
                            function(sCb) {
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

                                        ProductModel.findOne({ _id: doc._id }, function(err, product) {
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
                                            product.info.isActive = doc.enabled;

                                            product.info.EAN = doc.barCode;
                                            product.info.aclCode = doc.aclCode;
                                            product.info.autoBarCode = doc.autoBarCode;
                                            product.attributes = [];
                                            product.variants = [];
                                            product.directCost = 0;
                                            product.indirectCost = 0;
                                            product.taxes = [{ taxeId: "5901a41135e0150bde8f2b15" }];


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
                                            PriceListModel.findOne({ priceListCode: "BASE" }, function(err, priceList) {
                                                if (!priceList)
                                                    return console.log("PriceList notfound");

                                                ProductPricesModel.findOne({ priceLists: priceList._id, product: product._id }, function(err, price) {
                                                    if (!price)
                                                        price = new ProductPricesModel({
                                                            priceLists: priceList._id,
                                                            product: product._id,
                                                            prices: []
                                                        });

                                                    /* add prices */
                                                    price.prices = [];

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
                    var collectionName = ['Societe', 'Societe.Version', 'users'];

                    _.each(collectionName, function(collection) {
                        mongoose.connection.db.dropCollection(collection, function(err, result) {
                            console.log(result);
                        });
                    });

                    aCb(null, employees);
                }

                async.waterfall([dropCollection, users, priceList, loadBank, loadEmployees, customer, contact, convertFamily, product, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', { 'values.version': 0.501 }, { new: true }, function(err, doc) {
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

                                collection.update({ _id: doc._id }, { $set: set }, function(err, doc) {
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

                                collection.update({ _id: doc._id }, { $set: set }, function(err, doc) {
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

                //convert customer order
                function convertOrders(banks, users, aCb) {
                    var OrderModel = MODEL('order').Schema.OrderCustomer;
                    var OrderRowsModel = MODEL('orderRows').Schema;
                    var CustomerModel = MODEL('Customers').Schema;

                    const SeqModel = MODEL('Sequence').Schema;

                    SeqModel.findById('CO', function(err, seq) {
                        if (err)
                            return console.log(err);

                        seq = new SeqModel({
                            _id: "ORDER",
                            seq: seq.seq
                        });

                        seq.save(function(err, doc) {});
                    });

                    console.log("convert customer orders");
                    mongoose.connection.db.collection('Commande', function(err, collection) {
                        collection.find({}).toArray(function(err, orders) {
                            if (err)
                                return console.log(err);

                            if (!orders)
                                return aCb();

                            async.forEachSeries(orders, function(order, eCb) {
                                    //console.log(order);

                                    CustomerModel.findById(order.client.id, function(err, societe) {

                                        if (order.client.cptBilling)
                                            order.billing = order.client.cptBilling.id
                                        else
                                            order.billing = undefined;

                                        order.order = order._id.toString();
                                        order.supplier = order.client.id;

                                        order.address = societe.address;

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
                                                        ProductModel.findById(line.product.id, "_id taxes", function(err, product) {
                                                            OrderRowsModel.findOne({ sequence: i, order: doc._id }, function(err, newLine) {

                                                                line.product = line.product.id;
                                                                line.order = doc._id;
                                                                delete line._id;
                                                                line.sequence = i;
                                                                if (product)
                                                                    line.total_taxes = product.taxes;

                                                                //return console.log(line);

                                                                if (!newLine)
                                                                    newLine = new OrderRowsModel(line);
                                                                else
                                                                    newLine = _.extend(newLine, line);

                                                                newLine.save(cb);

                                                            });
                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({ order: doc._id })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");
                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
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

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, { new: true }, function(err, doc) {
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


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, { new: true }, function(err, doc) {
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

                async.waterfall([oldConvert, loadBank, loadEmployees, convertOrders, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', { 'values.version': 0.502 }, { new: true }, function(err, doc) {
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

                //convert customer offer
                function convertOffers(banks, users, aCb) {
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

                            async.forEachSeries(orders, function(order, eCb) {
                                    //console.log(order);

                                    CustomerModel.findById(order.client.id, function(err, societe) {

                                        if (order.client.cptBilling)
                                            order.billing = order.client.cptBilling.id
                                        else
                                            order.billing = undefined;

                                        order.order = order._id.toString();
                                        order.supplier = order.client.id;

                                        order.address = societe.address;

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
                                                        ProductModel.findById(line.product.id, "_id taxes", function(err, product) {
                                                            OrderRowsModel.findOne({ sequence: i, order: doc._id }, function(err, newLine) {

                                                                line.product = line.product.id;
                                                                line.order = doc._id;
                                                                delete line._id;
                                                                line.sequence = i;
                                                                if (product)
                                                                    line.total_taxes = product.taxes;

                                                                //return console.log(line);

                                                                if (!newLine)
                                                                    newLine = new OrderRowsModel(line);
                                                                else
                                                                    newLine = _.extend(newLine, line);

                                                                newLine.save(cb);

                                                            });
                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({ order: doc._id })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");
                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
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

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, { new: true }, function(err, doc) {
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


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, { new: true }, function(err, doc) {
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

                async.waterfall([loadBank, loadEmployees, convertOffers, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', { 'values.version': 0.503 }, { new: true }, function(err, doc) {
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

                //convert supplier order
                function convertSupplierOrders(banks, users, aCb) {
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

                            async.forEachSeries(orders, function(order, eCb) {
                                    //console.log(order);

                                    CustomerModel.findById(order.supplier.id, function(err, societe) {

                                        order.forSales = false;
                                        order.order = order._id.toString();
                                        order.supplier = order.supplier.id;

                                        order.address = societe.address;

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
                                                        ProductModel.findById(line.product.id, "_id taxes", function(err, product) {
                                                            OrderRowsModel.findOne({ sequence: i, order: doc._id }, function(err, newLine) {

                                                                line.product = line.product.id;
                                                                line.order = doc._id;
                                                                delete line._id;
                                                                line.sequence = i;
                                                                if (product)
                                                                    line.total_taxes = product.taxes;

                                                                //return console.log(line);

                                                                if (!newLine)
                                                                    newLine = new OrderRowsModel(line);
                                                                else
                                                                    newLine = _.extend(newLine, line);

                                                                newLine.save(cb);

                                                            });
                                                        });
                                                    }, function(err) {
                                                        if (err)
                                                            return sCb(err);

                                                        OrderRowsModel.find({ order: doc._id })
                                                            .populate("product")
                                                            .exec(function(err, lines) {
                                                                sCb(err, lines, doc);
                                                                //return console.log(lines);
                                                            });
                                                    });
                                                },
                                                function(rows, newOrder, sCb) {
                                                    console.log("Refresh total");
                                                    MODULE('utils').sumTotal(rows, newOrder.shipping, newOrder.discount, newOrder.supplier, function(err, result) {
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

                                                    OrderModel.findByIdAndUpdate(newOrder._id, result, { new: true }, function(err, doc) {
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


                                                            return OrderRowsModel.findByIdAndUpdate(orderRow._id, orderRow, { new: true }, function(err, doc) {
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

                async.waterfall([loadBank, loadEmployees, convertSupplierOrders, dropCollectionEnd], function(err) {
                    if (err)
                        return console.log(err);

                    Dict.findByIdAndUpdate('const', { 'values.version': 0.504 }, { new: true }, function(err, doc) {
                        if (err)
                            return console.log(err);

                        console.log("ToManage updated to {0}".format(0.504));
                        wCb(err, doc.values);
                        //wCb(err, conf);
                    });
                });
            }
        ],
        function(err, doc) {
            if (err)
                return console.log(err);

            /*Dict.findByIdAndUpdate('const', { 'values.version': exports.version }, { new: true }, function(err, doc) {
                if (err)
                    return console.log(err);

                console.log("ToManage updated to {0}".format(exports.version));
            });*/

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

        BankModel.find(query, "", { sort: { journalId: 1 } }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);
            self.json(doc);
        });

    };
}