"use strict";

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs');

var Dict = INCLUDE('dict');


exports.install = function() {
    F.route('/erp/api/dict', load_dict, ['authorize']);
    F.route('/erp/api/extrafield', load_extrafield, ['authorize']);
    F.route('/erp/api/sendEmail', sendEmail, ['post', 'json', 'authorize']);
    F.route('/erp/api/task/count', task_count, ['authorize']);

    F.route('/erp/api/product/convert_price', function() {
        var ProductModel = MODEL('product').Schema;
        var PriceLevelModel = MODEL('pricelevel').Schema;

        if (this.query.type) {
            ProductModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({ _id: docs[i]._id }, { 'type': 'PRODUCT' }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        if (this.query.price) {
            ProductModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    ProductModel.update({ _id: docs[i]._id }, { 'prices.pu_ht': docs[i].pu_ht }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }
        if (this.query.pricelevel) {
            PriceLevelModel.find({}, function(err, docs) {
                for (var i = 0, len = docs.length; i < len; i++) {
                    PriceLevelModel.update({ _id: docs[i]._id }, { 'prices.pu_ht': docs[i].pu_ht }, function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }

        this.json({ ok: true });
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
    F.route('/erp/convert/{type}', convert);


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

            status[self.query.modelName] = MODEL(self.query.modelName).status;

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

    //console.log(self.body);

    var mailOptions = self.body.message;

    if (self.body.data && self.body.data.url)
        self.body.data.url = self.host(self.body.data.url);

    if (self.body.data && !self.body.data.entity)
        self.body.data.entity = self.entity._id;

    //console.log(self.body);

    self.body.data.entity = self.body.data.entity.charAt(0).toUpperCase() + self.body.data.entity.slice(1);

    var dest = [];
    if (typeof self.body.to == 'object' && self.body.to.length)
        dest = _.pluck(self.body.to, 'email');
    else
        dest = self.body.to;

    if (!dest || !dest.length)
        return self.throw500('No destinataire');

    console.log(dest);

    //Send an email
    self.mail(dest, self.body.data.entity + " - " + self.body.data.title, self.body.ModelEmail, self.body.data);

    if (self.config['mail.address.copy'])
        self.mail(self.config['mail.address.copy'], self.body.data.entity + " - " + self.body.data.title, self.body.ModelEmail, self.body.data);

    self.json({
        successNotify: {
            title: "Mail envoye",
            message: self.body.to.length + " mail(s) envoye(s)"
        }
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
            query.$or = [
                { 'usertodo.id': params.user, 'userdone.id': null },
                { 'author.id': params.user, archived: false }
            ];
            break;
        case 'ALLTASK':
            query.$or = [
                { 'usertodo.id': params.user, 'userdone.id': null },
                { 'author.id': params.user, archived: false },
                { entity: params.entity, archived: false }
            ];
            break;
        case 'MYARCHIVED':
            query.$or = [
                { 'usertodo.id': params.user, 'userdone.id': { $ne: null } },
                { 'author.id': params.user, archived: true }
            ];
            break;
        case 'ARCHIVED':
            query.$or = [
                { 'usertodo.id': params.user, 'userdone.id': { $ne: null } },
                { 'author.id': params.user, archived: true },
                { entity: params.entity, archived: true }
            ];
            break;
        default: //'ARCHIVED':
            query.archived = true;
    }

    TaskModel.count(query, function(err, count) {
        self.json({ count: count });
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
        case 'user':
            var UserModel = MODEL('hr').Schema;

            mongoose.connection.db.collection('users', function(err, collection) {
                collection.find({ _type: null }, function(err, users) {
                    if (err)
                        return console.log(err);

                    users.each(function(err, user) {

                        if (user == null)
                            return self.plain("Converted Users...");


                        user.username = user.name;
                        var id = user._id;
                        delete user._id;
                        delete user.name;

                        if (user.Status !== 'ENABLE')
                            delete user.password;

                        //console.log(user);

                        var newUser = new UserModel(user);
                        //console.log(newUser);
                        collection.deleteOne({ _id: id }, function(err, results) {
                            if (err)
                                return console.log(err);

                            newUser.save(function(err, doc) {
                                if (err || !doc)
                                    return console.log("Impossible de creer ", err);
                            });

                        });

                    });

                });
            });
            return self.plain("Type is user");
            break;

        case 'contact':
            var UserModel = MODEL('contact').Schema;
            mongoose.connection.db.collection('users', function(err, collection) {
                collection.find({}, function(err, users) {
                    users.each(function(err, user) {
                        if (user && user.societe && user.societe.id)
                            UserModel.update({ _id: user._id }, { $set: { societe: user.societe.id } }, { upsert: false, multi: false }, function(err, result) {
                                //console.log(err, result);
                            });
                    });
                });
            });

            mongoose.connection.db.collection('Contact', function(err, collection) {
                collection.find({}).toArray(function(err, contacts) {
                    if (err)
                        return console.log(err);

                    async.each(contacts, function(contact, cb) {


                        if (contact == null)
                            return self.plain("Converted contacts...");

                        var id = contact._id;
                        if (!contact.email)
                            delete contact.email;

                        contact.oldId = "TESTING";

                        if (contact.Status == 'ST_ENABLE')
                            contact.Status = 'ENABLE';
                        else if (contact.Status == 'ST_DISABLE')
                            contact.Status = 'DISABLE';
                        else
                            contact.Status = 'NEVER';

                        if (contact.societe && contact.societe.id)
                            contact.societe = contact.societe.id;
                        else
                            delete contact.societe;

                        //console.log(contact);

                        var newUser = new UserModel(contact);
                        //console.log(contact);

                        newUser.save(cb);
                    }, function(err) {
                        if (err)
                            return console.log("Impossible de creer ", err);

                        collection.remove(function(err) {
                            if (err)
                                console.log(err);
                        });

                    });

                });


            });
            return self.plain("Type is contact");
            break;

        case 'price_level':
            var PriceLevelModel = MODEL('pricelevel').Schema;
            mongoose.connection.db.collection('PriceLevel', function(err, collection) {
                collection.find({}, function(err, pricelevels) {
                    if (err)
                        return console.log(err);

                    pricelevels.each(function(err, pricelevel) {
                        //console.log(pricelevel);
                        if (err)
                            return console.log(err);

                        if (!pricelevel)
                            return;

                        if (pricelevel.product && !pricelevel.product.id)
                            return self.plain("Converted pricelevel...");



                        PriceLevelModel.update({ _id: pricelevel._id }, { $set: { product: pricelevel.product.id } }, function(err, doc) {
                            if (err || !doc)
                                return console.log("Impossible de creer ", err);
                        });

                    });
                });
            });
            return self.plain("Type is price_level");
            break;

        case 'product':
            var ProductModel = MODEL('product').Schema;
            mongoose.connection.db.collection('Product', function(err, collection) {
                collection.find({}, function(err, docs) {
                    if (err)
                        return console.log(err);

                    docs.each(function(err, doc) {
                        //console.log(pricelevel);
                        if (err)
                            return console.log(err);

                        if (!doc)
                            return;

                        if (doc.name)
                            return self.plain("Converted product...");

                        ProductModel.update({ _id: doc._id }, { $set: { name: doc.ref } }, function(err, doc) {
                            if (err || !doc)
                                return console.log("Impossible de creer ", err);
                        });

                    });
                });
            });
            return self.plain("Type is product");
            break;

        case 'deliveryAddress':
            var SocieteModel = MODEL('societe').Schema;

            SocieteModel.find({}, function(err, docs) {
                if (err)
                    return console.log(err);

                docs.forEach(function(doc) {
                    doc.addresses = [{
                        name: doc.name,
                        address: doc.address,
                        zip: doc.zip,
                        town: doc.town
                    }];
                    doc.deliveryAddress = 0;

                    return doc.save(function(err, doc) {
                        if (err)
                            console.log(err);
                    });

                });


            });
            return self.plain("Type is deliveryAddress");
            break;
        case 'code_compta':
            var SocieteModel = MODEL('societe').Schema;

            SocieteModel.find({ code_compta: null, code_client: { $ne: null } }, function(err, docs) {
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

        case 'offer':
            var OfferModel = MODEL('offer').Schema;
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

                        OfferModel.update({ _id: doc._id }, { $set: set }, function(err, doc) {
                            if (err || !doc)
                                return console.log("Impossible de creer ", err);
                        });

                    });
                });
            });
            return self.plain("Type is offer");
            break;
        case 'order':
            var OrderModel = MODEL('order').Schema;
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

                        OrderModel.update({ _id: doc._id }, { $set: set }, function(err, doc) {
                            if (err || !doc)
                                return console.log("Impossible de creer ", err);
                        });

                    });
                });
            });
            return self.plain("Type is order");
            break;
        case 'date_bill':
            var BillModel = MODEL('bill').Schema;
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
            });

            BillSupplierModel.find({}, "_id datec dater", function(err, docs) {
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
            });
            self.plain('Convert date bill is ok');
            break;
        case 'date_delivery':

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
            });

            self.plain('Convert date delivery is ok');
            break;
        case 'paymentTransactionBills':
            /* Convert objectId to string */
            var TransactionModel = MODEL('transaction').Schema;

            //Select only objectId()
            TransactionModel.find({ "meta.bills.billId": { $type: 7 } }, function(err, docs) {
                if (err)
                    return console.log(err);

                docs.forEach(function(doc) {

                    var bills = doc.meta.bills;

                    for (var i = 0, len = bills.length; i < len; i++)
                        bills[i].billId = bills[i].billId.toString();


                    //console.log(bills);

                    doc.update({ $set: { "meta.bills": bills } }, function(err, doc) {

                        //doc.save(function(err, doc) {
                        if (err)
                            console.log(err);
                    });
                });

            });
            return self.plain("Type is paymentTransaction");
            break;
        case 'commercial_id':
            var BillModel = MODEL('bill').Schema;
            var SocieteModel = MODEL('societe').Schema;
            var UserModel = MODEL('hr').Schema;
            var OfferModel = MODEL('offer').Schema;
            var OrderModel = MODEL('order').Schema;
            var OrderSupplierModel = MODEL('orderSupplier').Schema;
            var BillSupplierModel = MODEL('billSupplier').Schema;
            var DeliveryModel = MODEL('delivery').Schema;
            var ObjectId = MODULE('utils').ObjectId;
            if (MODEL('userAbsence'))
                var UserAbsenceModel = MODEL('userAbsence').Schema;
            if (MODEL('europexpress_planning'))
                var PlanningModel = MODEL('europexpress_planning').Schema;

            var Model = [SocieteModel, BillModel, OfferModel, OrderModel, DeliveryModel, OrderSupplierModel, BillSupplierModel];
            var Collections = ['Societe', 'Facture', 'Commande', 'Offer', 'OrderSupplier', 'BillSupplier', 'Delivery'];

            if (MODEL('userAbsence')) {
                Model.push(UserAbsenceModel);
                Collections.push('Absence');
            }

            if (MODEL('europexpress_planning')) {
                Model.push(PlanningModel);
                Collections.push('europexpress_planning');
            }

            Collections.forEach(function(model) {
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "commercial_id.id": { $type: 2 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            //console.log(doc.commercial_id);
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
                                UserModel.findOne({ username: doc.commercial_id.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                                //console.log(user);
                                //return;

                                collection.update({ _id: doc._id }, { $set: { 'commercial_id.id': user._id, 'commercial_id.name': user.fullname } }, function(err, doc) {
                                    if (err)
                                        console.log(err);
                                });
                            });
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "author.id": { $type: 2 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            //console.log(doc.commercial_id);
                            if (!doc.author.id)
                                return;

                            if (doc.author.id.toString().length == 24)
                                return doc.update({ $set: { 'author.id': ObjectId(doc.author.id) } }, function(err, doc) {
                                    //console.log(doc);
                                    if (err)
                                        console.log(err);
                                });
                            if (doc.author.id.substr(0, 5) == 'user:') //Not an automatic code
                                UserModel.findOne({ username: doc.author.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                                //console.log(user);
                                //return;

                                collection.update({ _id: doc._id }, { $set: { 'author.id': user._id, 'author.name': user.fullname } }, function(err, doc) {
                                    if (err)
                                        console.log(err);
                                });
                            });
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "user.id": { $type: 2 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            //console.log(doc.commercial_id);
                            if (!doc.user.id)
                                return;

                            /*  if (doc.commercial_id.id.toString().length == 24)
                                  return doc.update({ $set: { 'commercial_id.id': ObjectId(doc.commercial_id.id) } }, function(err, doc) {
                                      console.log(doc);
                                      if (err)
                                          console.log(err);
                                  });*/
                            //console.log(doc.commercial_id.id.substr(0, 5));
                            if (doc.user.id.substr(0, 5) == 'user:') //Not an automatic code
                                UserModel.findOne({ username: doc.user.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                                //console.log(user, doc.user);
                                //return;

                                collection.update({ _id: doc._id }, { $set: { 'user.id': user._id, 'user.name': user.fullname } }, function(err, doc) {
                                    if (err)
                                        console.log(err);
                                });
                            });
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "details.driver.id": { $type: 2 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            for (let i = 1; i < doc.details.length; i++) {

                                if (!doc.details[i] || !doc.details[i].driver || !doc.details[i].driver.id)
                                    continue;

                                if (doc.details[i].driver.id.toString().length == 24) {
                                    let query = {};
                                    query['details.' + i + '.driver.id'] = ObjectId(doc.details[i].driver.id);

                                    return doc.update({ $set: query }, function(err, doc) {
                                        if (err)
                                            console.log(err);
                                    });
                                }
                                //console.log(doc.commercial_id.id.substr(0, 5));
                                if (doc.details[i].driver.id.substr(0, 5) == 'user:') //Not an automatic code
                                    UserModel.findOne({ username: doc.details[i].driver.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                                    //console.log(user, doc.user);
                                    //return;

                                    let query = {};
                                    query['details.' + i + '.driver.id'] = user._id;
                                    query['details.' + i + '.driver.name'] = user.fullname;

                                    collection.update({ _id: doc._id }, { $set: query }, function(err, doc) {
                                        if (err)
                                            console.log(err);
                                    });
                                });
                            }
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "details.formation.id": { $type: 2 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            for (let i = 1; i < doc.details.length; i++) {

                                if (!doc.details[i] || !doc.details[i].formation || !doc.details[i].formation.id)
                                    continue;

                                if (doc.details[i].formation.id.toString().length == 24) {
                                    let query = {};
                                    query['details.' + i + '.formation.id'] = ObjectId(doc.details[i].formation.id);

                                    return doc.update({ $set: query }, function(err, doc) {
                                        if (err)
                                            console.log(err);
                                    });
                                }
                                //console.log(doc.commercial_id.id.substr(0, 5));
                                if (doc.details[i].formation.id.substr(0, 5) == 'user:') //Not an automatic code
                                    UserModel.findOne({ username: doc.details[i].formation.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                                    //console.log(user, doc.user);
                                    //return;

                                    let query = {};
                                    query['details.' + i + '.formation.id'] = user._id;
                                    query['details.' + i + '.formation.name'] = user.fullname;

                                    collection.update({ _id: doc._id }, { $set: query }, function(err, doc) {
                                        if (err)
                                            console.log(err);
                                    });
                                });
                            }
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "details.formation.id": { $type: 7 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            for (let i = 1; i < doc.details.length; i++) {

                                if (!doc.details[i] || !doc.details[i].formation || !doc.details[i].formation.id)
                                    continue;

                                //console.log(doc.commercial_id.id.substr(0, 5));
                                if (doc.details[i].formation.id.toString().length == 24)
                                    UserModel.findOne({ _id: doc.details[i].formation.id }, "_id lastname firstname", function(err, user) {

                                        //console.log(user, doc.user);
                                        //return;

                                        let query = {};
                                        //query['details.' + i + '.formation.id'] = user._id;
                                        query['details.' + i + '.formation.name'] = user.lastname;

                                        collection.update({ _id: doc._id }, { $set: query }, function(err, doc) {
                                            if (err)
                                                console.log(err);
                                        });
                                    });
                            }
                        });
                    });
                });
                mongoose.connection.db.collection(model, function(err, collection) {
                    collection.find({ "details.driver.id": { $type: 7 } }, function(err, docs) {
                        if (err)
                            return console.log(err);
                        //console.log(docs);

                        docs.forEach(function(doc) {
                            for (let i = 1; i < doc.details.length; i++) {

                                if (!doc.details[i] || !doc.details[i].driver || !doc.details[i].driver.id)
                                    continue;

                                //console.log(doc.commercial_id.id.substr(0, 5));
                                if (doc.details[i].driver.id.toString().length == 24)
                                    UserModel.findOne({ _id: doc.details[i].driver.id }, "_id lastname firstname", function(err, user) {

                                        //console.log(user, doc.user);
                                        //return;

                                        let query = {};
                                        query['details.' + i + '.driver.name'] = user.lastname;

                                        collection.update({ _id: doc._id }, { $set: query }, function(err, doc) {
                                            if (err)
                                                console.log(err);
                                        });
                                    });
                            }
                        });
                    });
                });
            });
            return self.plain("Type is commercial_id");
            break;
        case 'requestBuyEE':
            var UserModel = MODEL('hr').Schema;
            var RequestBuyModel = MODEL('europexpress_buy').Schema;
            var OrderSupplierModel = MODEL('orderSupplier').Schema;

            RequestBuyModel.find({})
                //.populate("client.id", "_id name commercial_id")
                .exec(function(err, docs) {
                    docs.forEach(function(elem) {
                        console.log(elem);

                        var order = new OrderSupplierModel({
                            ref: elem.ref,
                            createdAt: elem.createdAt,
                            updatedAt: elem.updatedAt,
                            ref_supplier: elem.title,
                            datec: elem.datec,
                            date_livraison: elem.date_livraison,
                            Status: elem.Status,
                            notes: [{
                                author: {},
                                datec: elem.datec,
                                note: elem.desc
                            }],
                            author: {},
                            supplier: elem.fournisseur,
                            optional: { SN: elem.vehicule.id },
                            entity: self.user.entity
                        });

                        //if (elem.author.id.substr(0, 5) == 'user:') //Not an automatic code
                        UserModel.findOne({ username: elem.author.id.substr(5).toLowerCase() }, "_id lastname firstname", function(err, user) {

                            //console.log(user);
                            //return;

                            order.author = {
                                id: user._id,
                                name: user.fullname
                            }

                            order.notes[0].author = order.author;

                            order.save(function(err, doc) {
                                if (err)
                                    return console.log(err);
                            });
                        });

                        /*elem.update({ $set: { commercial_id: elem.client.id.commercial_id } }, { w: 1 }, function(err, doc) {
                            if (err)
                                console.log(err);

                            //console.log(doc);
                        });*/
                    });
                });
            return self.plain("Type is requestBuyEE : Pensez a mettre le max ref dans la sequence !");
            break;
    }

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