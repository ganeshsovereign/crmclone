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

                                    customer.shippingAddress = societe.addresses;

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

                                contact.address = {
                                    street: contact.address,
                                    zip: contact.zip,
                                    city: contact.town
                                };

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