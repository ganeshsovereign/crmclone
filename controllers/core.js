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

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs');

var Dict = INCLUDE('dict');


exports.install = function() {
    F.route('/erp/api/dict', load_dict, ['authorize']);
    /**
     *@api {get} /employees/nationality/ Request Employees nationality
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesNationality
     * @apiGroup Employee
     *
     * @apiSuccess {Object} EmployeesNationality
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
       "data": [
         {
           "_id": "British",
           "__v": 0
         },
         {
           "_id": "Canadian",
           "__v": 0
         },
         {
           "_id": "Czech",
           "__v": 0
         },
         {
           "_id": "Danish",
           "__v": 0
         },
         {
           "_id": "English",
           "__v": 0
         },
         {
           "_id": "Finnish",
           "__v": 0
         },
         {
           "_id": "Georgian",
           "__v": 0
         },
         {
           "_id": "German",
           "__v": 0
         },
         {
           "_id": "Romanian",
           "__v": 0
         },
         {
           "_id": "Serbian",
           "__v": 0
         },
         {
           "_id": "Turkish",
           "__v": 0
         },
         {
           "_id": "Ukrainian",
           "__v": 0
         }
       ]
     }
     */
    F.route('/erp/api/nationality', getNationality, ['authorize']);
    /**
     *@api {get} /languages/ Request Employees languages
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesLanguages
     * @apiGroup Employee
     *
     * @apiSuccess {Object} EmployeesLanguages
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
         "data": [
             {
                 "_id": "5301e61b3d8b9898d5896e67",
                 "attachments": [],
                 "name": "English"
             }
         ]
     }
     */

    F.route('/erp/api/languages', getLanguages, ['authorize']);
    F.route('/erp/api/countries', getCountries, ['authorize']);
    F.route('/erp/api/currencies', getCurrencies, ['authorize']);
    F.route('/erp/api/extrafield', load_extrafield, ['authorize']);
    F.route('/erp/api/sendEmail', sendEmail, ['post', 'json', 'authorize']);
    F.route('/erp/api/task/count', task_count, ['authorize']);
    F.route('/erp/api/settings', getSettings, ['authorize']);

    F.route('/erp/api/product/convert_price', function() {
        var ProductModel = MODEL('product').Schema;
        var PriceLevelModel = MODEL('pricelevel').Schema;

        if (this.query.type) {
            ProductModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({
                        _id: docs[i]._id
                    }, {
                        'type': 'PRODUCT'
                    }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        if (this.query.price) {
            ProductModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({
                        _id: docs[i]._id
                    }, {
                        'prices.pu_ht': docs[i].pu_ht
                    }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }
        if (this.query.pricelevel) {
            PriceLevelModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    PriceLevelModel.update({
                        _id: docs[i]._id
                    }, {
                        'prices.pu_ht': docs[i].pu_ht
                    }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        this.json({
            ok: true
        });
    }, ['authorize']);
    F.route('/erp/api/product/convert_tva', function() {
        DictModel.findOne({
            _id: "dict:fk_tva"
        }, function(err, docs) {
            for (var i in docs.values) {
                if (docs.values[i].label)
                    docs.values[i].value = docs.values[i].label;
                if (docs.values[i].label == null && docs.values[i].value == null)
                    docs.values[i].value = 0;
                delete docs.values[i].label;
                //console.log(docs.values[i]);
            }
            docs.save(function(err, doc) {
                //console.log(err);
                res.json(doc);
            });
        });
    }, ['authorize']);
    F.route('/erp/convert/resource', convert_resource, ['authorize']);
    //F.route('/erp/convert/{type}', convert, []);




    // SHOW LAST 50 PROBLEMS
    F.route('/erp/errors/', function() {

        var self = this;
        self.json(F.problems);

    });

    //F.route('#404', view_404);
    //F.route('#500', view_500);
};

function load_dict() {
    var self = this;
    //console.log(self.query);
    async.parallel([
        function(cb) {
            Dict.dict(self.query, cb);
        },
        function(cb) {
            var result, status = {};

            if (!self.query.modelName)
                return cb(null, {});

            status[self.query.modelName] = MODEL(self.query.modelName).Status;

            result = {
                _id: self.query.modelName,
                values: []
            };

            if (status[self.query.modelName].lang)
                result.lang = status[self.query.modelName].lang;

            for (var i in status[self.query.modelName].values) {
                if (status[self.query.modelName].values[i].enable) {
                    if (status[self.query.modelName].values[i].pays_code && status[self.query.modelName].values[i].pays_code != 'FR')
                        continue;

                    var val = status[self.query.modelName].values[i];
                    val.id = i;

                    if (status[self.query.modelName].lang) //(doc.values[i].label)
                        val.label = i18n.t(status[self.query.modelName].lang + ":" + status[self.query.modelName].values[i].label);
                    else
                        val.label = status[self.query.modelName].values[i].label;

                    //else
                    //  val.label = req.i18n.t("companies:" + i);

                    result.values.push(val);
                    //console.log(val);
                }
            }

            status[self.query.modelName] = result;

            cb(null, status);
        }
    ], function(err, result) {
        if (err)
            return self.throw500(err);

        result[0] = _.extend(result[0], result[1]);
        self.json(result[0]);
    });
}

function load_extrafield() {
    var self = this;

    Dict.extrafield(self.query, function(err, extrafield) {
        if (err)
            return self.throw500(err);

        self.json(extrafield);
    });
}

function view_404() {
    console.log("Error 404 : not found", this.url);
    self.theme(null);
    this.view('404');
}

function view_500() {
    self.theme(null);
    this.view('500');
}

function sendEmail() {
    var self = this;
    const EntityModel = MODEL('entity').Schema;

    //console.log(self.body);

    var mailOptions = self.body.message;

    if (self.body.data && self.body.data.url)
        self.body.data.url = self.host(self.body.data.url);

    if (self.body.data && !self.body.data.entity)
        self.body.data.entity = self.entity._id;

    //console.log(self.body);

    if (!self.body.data.entity)
        return self.throw500('No entity');

    EntityModel.findById(self.body.data.entity, function(err, entity) {
        if (err || !entity)
            return self.throw500('Entity unknown');

        self.body.entity = entity;

        var dest = [];
        if (typeof self.body.to == 'object' && self.body.to.length)
            dest = _.pluck(self.body.to, 'email');
        else
            dest = [self.body.to];

        if (!dest || !dest.length)
            return self.throw500('No destinataire');

        //console.log(dest);

        //Send an email
        self.mail(dest, entity.name + " - " + self.body.data.title, self.body.ModelEmail, self.body.data, function(err) {
            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }

            self.json({
                successNotify: {
                    title: "Mail envoye",
                    message: dest + " mail(s) envoye(s)"
                }
            });
        });

        if (self.config['mail.address.copy'])
            self.mail(self.config['mail.address.copy'], self.body.data.entity + " - " + self.body.data.title, self.body.ModelEmail, self.body.data);
    });
}

function task_count() {
    var TaskModel = MODEL('task').Schema;
    var self = this;
    var params = self.query;
    var query = {};

    /*if (params.filters) {
     if (params.filters.filters) {
     var list = [];
     for (var i = 0; i < params.filters.filters.length; i++)
     list.push(params.filters.filters[i].value);
     query['usertodo.id'] = {'$in': list};
     } else {
     return res.send(200, []);
     }
     }*/

    var result = [];

    switch (params.query) {
        case 'MYTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                }
            ];
            break;
        case 'ALLTASK':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': null
                },
                {
                    'author.id': params.user,
                    archived: false
                },
                {
                    entity: params.entity,
                    archived: false
                }
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                }
            ];
            break;
        case 'ARCHIVED':
            query.$or = [{
                    'usertodo.id': params.user,
                    'userdone.id': {
                        $ne: null
                    }
                },
                {
                    'author.id': params.user,
                    archived: true
                },
                {
                    entity: params.entity,
                    archived: true
                }
            ];
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    TaskModel.count(query, function(err, count) {
        self.json({
            count: count
        });
    });
}

function convert(type) {
    /**
     * Convert contact collection to new user schema extended for e-commerce
     */

    var self = this;
    var mongoose = require('mongoose');

    console.log(type);

    switch (type) {

        case 'code_compta':
            var SocieteModel = MODEL('Customers').Schema;

            SocieteModel.find({
                code_compta: null,
                code_client: {
                    $ne: null
                }
            }, function(err, docs) {
                if (err)
                    return console.log(err);

                docs.forEach(function(doc) {
                    if (doc.code_client[0] !== 'C') { //Not an automatic code
                        if (doc.code_client.length + 3 > (CONFIG('accounting.length') || 10))
                            return console.log('code_compta too long ', doc.code_client);

                        doc.code_compta = '411' + doc.code_client.trim();
                        doc.save(function(err, doc) {
                            if (err)
                                console.log(err);
                        });

                    }
                });

            });
            return self.plain("Type is code_compta");
            break;





        case 'price_level_new':
            var PriceLevelModel = MODEL('pricelevel').Schema;
            var ProductPricesModel = MODEL('productPrices').Schema;
            var PriceListModel = MODEL('priceList').Schema;
            var ProductModel = MODEL('product').Schema;

            // Add groupId to all products
            ProductModel.find({}, "_id", function(err, docs) {
                docs.forEach(function(doc) {
                    ProductModel.update({
                        _id: doc._id
                    }, {
                        $set: {
                            groupId: doc._id.toString()
                        }
                    }, function(err, result) {
                        //console.log(err, result);
                    });
                });
            });

            async.series([
                    function(cb) {
                        /* BASE price list */
                        PriceListModel.findOne({
                            priceListCode: "BASE"
                        }, function(err, priceList) {
                            if (priceList)
                                return;

                            priceList = new PriceListModel({
                                priceListCode: "BASE",
                                name: "Default price base",
                                currency: "EUR",
                                cost: false
                            });

                            return priceList.save();
                        });

                        /* SP price list for supplier */
                        PriceListModel.findOne({
                            priceListCode: "SP"
                        }, function(err, priceList) {
                            if (priceList)
                                return;

                            priceList = new PriceListModel({
                                priceListCode: "SP",
                                name: "Default supplier price base",
                                currency: "EUR",
                                cost: true
                            });

                            return priceList.save();
                        });

                        PriceLevelModel.distinct("price_level", function(err, docs) {
                            async.each(docs, function(doc, callback) {
                                PriceListModel.findOne({
                                    priceListCode: MODULE('utils').set_Space(doc)
                                }, function(err, priceList) {
                                    if (priceList)
                                        return callback();

                                    priceList = new PriceListModel({
                                        priceListCode: doc,
                                        name: doc,
                                        currency: "EUR",
                                        cost: false
                                    });

                                    priceList.save(callback);
                                });
                            }, cb);
                        });
                    },
                    function(cb) {
                        // add prices to productPrice
                        PriceLevelModel.find({}, function(err, docs) {
                            async.each(docs, function(doc, callback) {
                                PriceListModel.findOne({
                                    priceListCode: MODULE('utils').set_Space(doc.price_level)
                                }, function(err, priceList) {
                                    if (!priceList)
                                        return console.log("PriceList notfound");

                                    ProductPricesModel.findOne({
                                        priceLists: priceList._id,
                                        product: doc.product
                                    }, function(err, price) {
                                        if (!price)
                                            price = new ProductPricesModel({
                                                priceLists: priceList._id,
                                                product: doc.product,
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

                                        price.save(callback);

                                    });
                                });
                            });
                        });
                    }
                ],
                function(result) {});
            return self.plain("Type is price_level new format !!!");
            break;
        case 'commercial_id':
            var BillModel = MODEL('invoice').Schema;
            var SocieteModel = MODEL('Customers').Schema;
            var UserModel = MODEL('Users').Schema;
            var OfferModel = MODEL('offer').Schema;
            var OrderModel = MODEL('order').Schema;
            var OrderSupplierModel = MODEL('orderSupplier').Schema;
            var BillSupplierModel = MODEL('billSupplier').Schema;
            var DeliveryModel = MODEL('delivery').Schema;
            var ObjectId = MODULE('utils').ObjectId;

            var Model = [SocieteModel, BillModel, OfferModel, OrderModel, DeliveryModel, OrderSupplierModel, BillSupplierModel];
            var Collections = ['Societe', 'Facture', 'Commande', 'Offer', 'OrderSupplier', 'BillSupplier', 'Delivery'];

            Collections.forEach(function(model) {
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({
                        "commercial_id.id": {
                            $type: 2
                        }
                    }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            console.log(doc.commercial_id);
                            if (!doc.commercial_id.id)
                                return;

                            /*  if (doc.commercial_id.id.toString().length == 24)
                                  return doc.update({ $set: { 'commercial_id.id': ObjectId(doc.commercial_id.id) } }, function(err, doc) {
                                      console.log(doc);
                                      if (err)
                                          console.log(err);
                                  });*/
                            //console.log(doc.commercial_id.id.substr(0, 5));
                            if (doc.commercial_id.id.substr(0, 5) == 'user:') //Not an automatic code
                                UserModel.findOne({
                                    username: doc.commercial_id.id.substr(5)
                                }, "_id lastname firstname", function(err, user) {

                                    //console.log(user);
                                    //return;

                                    collection.update({
                                        _id: doc._id
                                    }, {
                                        $set: {
                                            'commercial_id.id': user._id,
                                            'commercial_id.name': user.fullname
                                        }
                                    }, function(err, doc) {
                                        if (err)
                                            console.log(err);
                                    });
                                });
                        });
                    });
                });
            });
            return self.plain("Type is commercial_id");
            break;
        case 'bill_reset_commercial':
            var BillModel = MODEL('invoice').Schema;

            BillModel.find({})
                .populate("client.id", "_id name commercial_id")
                .exec(function(err, docs) {
                    docs.forEach(function(elem) {
                        //console.log(elem);

                        elem.update({
                            $set: {
                                commercial_id: elem.client.id.commercial_id
                            }
                        }, {
                            w: 1
                        }, function(err, doc) {
                            if (err)
                                console.log(err);

                            //console.log(doc);
                        });
                    });
                });
            return self.plain("Type is bill_reset_commercial_id");
            break;
        case 'customerRef':
            var CustomerModel = MODEL('Customers').Schema;

            CustomerModel.find({
                    $where: 'this.salesPurchases.ref.length > 7'
                })
                .exec(function(err, docs) {
                    docs.forEach(function(elem) {
                        //console.log(elem);

                        elem.salesPurchases.ref = elem.salesPurchases.ref.substring(1, 8);
                        elem.save();
                    });
                });
            return self.plain("Type is customerRef Ok");
            break;

    }

    /**
     * TODO schema conversion 5/04/2017
     * Schema company
     * commercial_id.id -> commercial_id
     * cptBilling.id -> cptBilling
     */



    return self.plain("Type is unknown");
}

function convert_resource() {
    var self = this;
    //var fixedWidthString = require('fixed-width-string'); //on déclare l'indentation
    fs.readdirSync(__dirname + '/../locales/fr/')
        .filter(function(file) {
            return file.endsWith('.json');
        })

        .forEach(function(file) {
            var readjson = require(__dirname + '/../locales/fr/' + file); // lecture fichier json
            var writeresource = fs.createWriteStream(__dirname + '/../resources/fr/' + file + 'fr.json');

            _.forEach(readjson, function(file) {
                /*if (value === "UTF-8")
                 return;*/

                //var header = file.substring(0, file.length - 5);//delete .json 

                /* var temp = fixedWidthString(header + "_" + key, 80);
                 temp += ": ";
                 temp += value;
                 temp += "\n";*/
                writeresource.write(readjson);

            });

        });

    writeresource.end();
    self.plain("Ok"); //text
}

function getNationality() {
    var self = this;
    var Nationality = MODEL('nationality').Schema;

    Nationality.find({}).exec(function(err, result) {
        if (err)
            return self.throw500(err);

        self.json({
            data: result
        });
    });
}

function getLanguages() {
    var self = this;
    var Languages = MODEL('languages').Schema;

    Languages.find({}).exec(function(err, result) {
        if (err)
            return self.throw500(err);

        self.json({
            data: result
        });
    });
}

function getCountries() {
    var self = this;
    var Countries = MODEL('countries').Schema;

    Countries.find({})
        .sort({
            '_id': 1
        })
        .exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json({
                data: result
            });
        });
}

function getCurrencies() {
    var self = this;
    var Currencies = MODEL('currency').Schema;

    Currencies.find({})
        .sort({
            '_id': 1
        })
        .exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json({
                data: result
            });
        });
}

function getSettings() {
    var self = this;
    var DictModel = MODEL('dict').Schema;

    DictModel.findOne({
        _id: "const"
    }, function(err, result) {
        if (err || !result)
            return self.throw500(err);

        self.json({
            data: result.values
        });
    });
}