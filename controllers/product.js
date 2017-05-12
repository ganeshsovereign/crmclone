/**
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
 **/


"use strict";
var fs = require('fs'),
    csv = require('csv'),
    _ = require('lodash'),
    moment = require("moment"),
    async = require('async');

var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var object = new Object();
    var dynform = new DynForm();

    Dict.extrafield({
        extrafieldName: 'Product'
    }, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }

        object.fk_extrafields = doc;
    });

    F.route('/erp/api/product', object.read, ['authorize']);
    F.route('/erp/api/product/dt', object.readDT, ['post', 'authorize']);
    // list for autocomplete
    F.route('/erp/api/product/autocomplete', object.autocomplete, ['post', 'json', 'authorize']);

    //return price product from qty
    F.route('/erp/api/product/price', function() {
        var self = this;
        var ProductPricesModel = MODEL('productPrices').Schema;

        ProductPricesModel.findPrice(self.body, function(err, result) {
            if (err)
                return console.log(err);

            self.json(result);
        });
    }, ['post', 'json', 'authorize']);

    // update product price
    F.route('/erp/api/product/price', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;
        var Pricebreak = INCLUDE('pricebreak');


        // Fix ENTIER range
        self.body.range = Math.trunc(self.body.range);

        if (self.body.price_level !== 'BASE')
            return pricelevel.update({ 'product': self.body._id, price_level: self.body.price_level }, { range: self.body.range, price: self.body.price }, self.user, function(err, prices) {
                //console.log(prices);
                if (err)
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });

                return self.json({
                    successNotify: {
                        title: "Success",
                        message: "Prix enregistre"
                    }
                });
            });

        var update = {};

        if (self.body.range == 1)
            update = { "prices.pu_ht": self.body.price };
        else {
            var idx = "prices.pricesQty." + self.body.range.toString();
            update[idx] = self.body.price;

            //delete range
            if (self.body.price == 0)
                update = { $unset: update };
        }

        update.updatedAt = new Date();
        update.user_mod = {
            id: self.user._id,
            name: self.user.name
        };

        ProductModel.update({ '_id': self.body._id }, update, { upsert: false },
            function(err, numberAffected, price) {
                if (err)
                    return console.log(err);

                console.log(numberAffected);
                if (err)
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });

                return self.json({
                    successNotify: {
                        title: "Success",
                        message: "Prix enregistre"
                    }
                });
            });

    }, ['put', 'json', 'authorize']);

    //update Discount
    F.route('/erp/api/product/discount', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        if (self.body.price_level !== 'BASE')
            return pricelevel.update({ 'product': self.body._id, price_level: self.body.price_level }, { discount: self.body.discount }, self.user, function(err, prices) {
                console.log(prices);
                if (err)
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });

                return self.json({
                    successNotify: {
                        title: "Success",
                        message: "Remise enregistree"
                    }
                });
            });

        var update = {
            discount: self.body.discount
        };

        update.updatedAt = new Date();
        update.user_mod = {
            id: self.user._id,
            name: self.user.name
        };

        ProductModel.update({ '_id': self.body._id }, update, { upsert: false },
            function(err, numberAffected, price) {
                if (err)
                    return console.log(err);

                console.log(numberAffected);
                if (err)
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });

                return self.json({
                    successNotify: {
                        title: "Success",
                        message: "Remise enregistree"
                    }
                });
            });

    }, ['put', 'json', 'authorize']);

    F.route('/erp/api/product/scan', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        //console.dir(self.body);

        if (self.body.scan == null)
            return self.json({});
        var query = {
            seq: self.body.scan.substr(2)
        };

        //console.log(query);

        ProductModel.findOne(query, "ref _id label dynForm tva_tx minPrice units description caFamily prices seq", function(err, doc) {
            if (err) {
                console.log("err : /api/product/scan");
                return self.throw500(err);
            }

            if (!doc)
                return self.json({});

            //console.log(doc);

            var obj = {
                _id: doc._id,
                id: doc._id,
                pu_ht: doc.prices.pu_ht,
                prices: doc.prices,
                price_level: 'BASE',
                discount: 0,
                qtyMin: 0,
                ref: doc.ref,
                product: {
                    id: doc,
                    name: doc.ref,
                    unit: doc._units.name,
                    dynForm: doc.dynForm
                }
            };


            //console.log(result);

            if (self.body.price_level && self.body.price_level !== 'BASE')
                return pricelevel.findOne(obj._id, self.body.price_level, function(price) {
                    //self.json(prices);
                    //return console.log(price);

                    obj = _.extend(obj, price);

                    //console.log(mergedList);

                    return self.json(obj);
                });

            return self.json(obj);
        });
    }, ['post', 'json', 'authorize']);


    F.route('/erp/api/product/consumption', object.consumption, ['authorize']);
    F.route('/erp/api/product/storehouse', function() {
        StorehouseModel.find({}, function(err, storehouses) {
            if (err)
                console.log(err);
            res.send(200, storehouses);
        });
    }, ['authorize']);
    F.route('/erp/api/product/storehouse', function() {
        //console.log(req.body);

        req.body.name = req.body.name.toUpperCase();
        if (!req.body.substock)
            req.body.substock = "";
        req.body.substock = req.body.substock.toUpperCase();
        StorehouseModel.findOne({
            name: req.body.name
        }, function(err, storehouse) {
            if (err)
                return console.log(err);
            if (storehouse == null)
                storehouse = new StorehouseModel(req.body);
            var max = 0;
            for (var i in storehouse.subStock) {
                if (storehouse.subStock.length && req.body.substock == storehouse.subStock[i].name)
                    return res.send(200, {}); //Already exist
                if (storehouse.subStock[i].barCode > max)
                    max = storehouse.subStock[i].barCode;
            }

            var subStock = {};
            subStock.name = req.body.substock;
            subStock.barCode = max + 1;
            subStock.productId = [];
            storehouse.subStock.push(subStock);
            storehouse.save(function(err, doc) {
                if (err)
                    console.log(err);
                res.send(200, storehouse);
            });
        });
    }, ['post', 'json', 'authorize']);
    // add or remove product to a storehouse for gencode
    F.route('/erp/api/product/storehouse', function() {
        console.log(req.body);
        if (req.body.checked) // add a product
            StorehouseModel.update({
            name: req.body.stock.stock,
            'subStock.name': req.body.stock.subStock
        }, {
            $addToSet: {
                'subStock.$.productId': req.body.product._id
            }
        }, function(err, doc) {
            if (err)
                console.log(err);
            console.log(doc);
            res.send(200, {});
        });
        else
            StorehouseModel.update({
                name: req.body.stock.stock,
                'subStock.name': req.body.stock.subStock
            }, {
                $pull: {
                    'subStock.$.productId': req.body.product._id
                }
            }, function(err, doc) {
                if (err)
                    console.log(err);
                console.log(doc);
                res.send(200, {});
            });
    }, ['put', 'json', 'authorize']);
    F.route('/erp/api/product/import', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        var convertRow = function(tab, row, index, cb) {
            var product = {
                Status: "SELL"
            };

            for (var i = 0; i < row.length; i++) {
                if (tab[i] === "false")
                    continue;

                if (tab[i].indexOf(".") >= 0) {
                    var split = tab[i].split(".");

                    if (row[i]) {
                        if (typeof product[split[0]] === "undefined")
                            product[split[0]] = {};

                        product[split[0]][split[1]] = row[i];
                    }

                }

                switch (tab[i]) {
                    case "ref":
                        if (row[i]) {
                            product.ref = row[i].trim();
                        }
                        break;
                    case "weight":
                        if (row[i]) {
                            row[i] = row[i].replace(",", ".");
                            product[tab[i]] = parseFloat(row[i], 10) || null;
                        }
                        break;
                    case "pu_ht":
                        if (row[i]) {
                            row[i] = row[i].replace(",", ".");
                            product[tab[i]] = parseFloat(row[i], 10) || null;
                        }
                        break;
                    case "tva_tx":
                        if (row[i]) {
                            row[i] = row[i].replace(",", ".");
                            product[tab[i]] = parseFloat(row[i], 10) || null;
                        }
                        break;
                    default:
                        if (row[i])
                            product[tab[i]] = row[i];
                }
            }
            //console.log(societe);
            cb(product);
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

                    var already_imported = {};

                    convertRow(tab, row, index, function(data) {

                        if (typeof already_imported[data.ref] === 'undefined') {

                            //import product
                            if (data.ref)
                                ProductModel.findOne({
                                    ref: data.ref.trim()
                                }, function(err, product) {
                                    if (err) {
                                        console.log(err);
                                        return callback();
                                    }

                                    if (product == null)
                                        product = new ProductModel(data);
                                    else
                                        product = _.extend(product, data);

                                    //console.log(row[10]);
                                    //console.log(societe)
                                    //console.log(societe.datec);

                                    product.save(function(err, doc) {
                                        if (err)
                                            console.log(err);

                                        else
                                            already_imported[doc.ref] = {
                                                id: doc._id,
                                                ref: doc.ref
                                            };

                                        callback(err);
                                    });
                                });
                            else {
                                console.log("Manque REF !!!");
                                return callback("Manque Ref");
                            }

                        } else {
                            console.log("Doublons de la reference : " + data.ref);
                            callback("Doulons");
                        }

                    });
                    //return row;
                } /*, {parallel: 1}*/ )
                .on("end", function(count) {
                    console.log('Number of lines: ' + count);
                    fs.unlink(self.files[0].path, function(err) {
                        if (err)
                            console.log(err);
                    });
                    return self.json({
                        count: count
                    });
                })
                .on('error', function(error) {
                    console.log(error.message);
                });
        }
    }, ['upload'], 10240); //10MB Max

    var taxes = new Taxes();
    F.route('/erp/api/product/taxes', taxes.read, ['authorize']);

    var pricesList = new PricesList();
    F.route('/erp/api/product/prices/priceslist', pricesList.getAllPricesLists, ['authorize']);
    F.route('/erp/api/product/prices/priceslist', pricesList.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/prices/priceslist/{id}', pricesList.show, ['authorize']);
    F.route('/erp/api/product/prices/priceslist/{id}', pricesList.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/product/prices/priceslist/{id}', pricesList.delete, ['delete', 'authorize']);


    var prices = new Prices();

    /* get prices and prices list */
    F.route('/erp/api/product/prices', prices.read, ['authorize']);
    F.route('/erp/api/product/prices/export/{price_list}', prices.export, ['authorize']);
    F.route('/erp/api/product/prices/{id}', prices.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/product/prices', prices.add, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/prices/{id}', prices.delete, ['delete', 'authorize']);
    F.route('/erp/api/product/prices/upgrade', prices.upgrade, ['authorize']);
    // update prducts pricing form a coef
    F.route('/erp/api/product/prices/upgrade', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;
        var PriceLevelModel = MODEL('pricelevel').Schema;

        //console.log(self.body);

        async.each(self.body.id, function(id, cb) {

            if (self.body.price_level !== 'BASE')
                return PriceLevelModel.findOne({ _id: id }, function(err, doc) {
                    if (err || !doc)
                        return cb(err);

                    // update pu_ht
                    doc.prices.pu_ht = self.module('utils').round(doc.prices.pu_ht * self.body.coef, 3);

                    // update range price
                    if (doc.prices.pricesQty)
                        doc.prices.pricesQty = _.mapValues(doc.prices.pricesQty, function(elem) {
                            elem = self.module('utils').round(elem * self.body.coef, 3);
                            return elem;
                        });

                    doc.user_mod = {
                        id: self.user._id,
                        name: self.user.name
                    };

                    //console.log(doc.prices);
                    doc.save(cb);
                });

            ProductModel.findOne({ _id: id }, function(err, doc) {
                if (err || !doc)
                    return cb(err);

                // update pu_ht
                doc.prices.pu_ht = self.module('utils').round(doc.prices.pu_ht * self.body.coef, 3);

                // update range price
                if (doc.prices.pricesQty)
                    doc.prices.pricesQty = _.mapValues(doc.prices.pricesQty, function(elem) {
                        elem = self.module('utils').round(elem * self.body.coef, 3);
                        return elem;
                    });

                doc.user_mod = {
                    id: self.user._id,
                    name: self.user.name
                };

                doc.save(cb);
            });

        }, function(err) {
            if (err)
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });

            return self.json({
                successNotify: {
                    title: "Success",
                    message: "Tarifs modifies"
                }
            });
        });

    }, ['put', 'json', 'authorize']);

    var productFamily = new ProductFamily();
    F.route('/erp/api/product/family/autocomplete', function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        console.dir(self.body);
        ProductModel.aggregate([
            { '$match': { isremoved: { $ne: true } } },
            {
                '$group': {
                    _id: '$caFamily'
                }
            }, {
                '$project': {
                    price_level: '$caFamily'
                }
            }, {
                '$match': {
                    _id: new RegExp(self.body.filter.filters[0].value, "i")
                }
            }, {
                '$limit': parseInt(self.body.take)
            }
        ], function(err, docs) {
            if (err) {
                console.log("err : /api/product/price_level/autocomplete");
                console.log(err);
                return;
            }

            var result = [];
            if (docs !== null)
                for (var i in docs) {
                    //console.log(docs[i]);
                    result[i] = {};
                    result[i].name = docs[i]._id;
                    result[i].text = docs[i]._id; //For TagInput
                    result[i].id = docs[i]._id;
                }

            return self.json(result);
        });
    }, ['post', 'json', 'authorize']);
    //AUTOCOMPLETE ON FAMILY
    F.route('/erp/api/product/family', function() {
        //console.log(req.body);
        var self = this;
        var ProductModel = MODEL('product').Schema;
        //console.log(self.body);

        var query = {
            isremoved: { $ne: true },
            "$and": []
        };

        var obj = {};
        obj[self.body.field] = {
            $nin: [null, "OTHER", ""]
        };

        query.$and.push(obj);

        if (self.body.query)
            query.$and.push(self.body.query);

        if (self.body.filter) {
            obj = {};
            obj[self.body.field] = new RegExp(self.body.filter, "i");

            query.$and.push(obj);
        }

        ProductModel.distinct(self.body.field, query, function(err, data) {

            if (err) {
                console.log('Erreur : ' + err);
            } else {
                self.json(data);
                //console.log(data);
            }
        });
        return;
    }, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/family', productFamily.getAllProductFamily, ['authorize']);
    F.route('/erp/api/product/family/{id}', productFamily.getProductFamilyById, ['authorize']);
    F.route('/erp/api/product/family/', productFamily.createProductFamily, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/family/{id}', productFamily.updateProductFamily, ['put', 'json', 'authorize'], 512);

    var productAttributes = new ProductAttributes();
    F.route('/erp/api/product/attributes', productAttributes.getAllProductAttributes, ['authorize']);
    F.route('/erp/api/product/attributes/{id}', productAttributes.getProductAttributesById, ['authorize']);
    F.route('/erp/api/product/attributes/', productAttributes.createProductAttributes, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/attributes/{id}', productAttributes.updateProductAttributes, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/product/attributes/{id}', productAttributes.updateProductAttributes, ['delete', 'authorize']);

    // list for autocomplete
    F.route('/erp/api/product/ref/autocomplete', function() {
        //console.dir(req.body);
        var ProductModel = MODEL('product').Schema;
        var self = this;

        var query = {};
        if (self.query.type)
            query = {
                '$and': [{
                    Status: self.query.type
                }, {
                    ref: new RegExp(self.body.filter.filters[0].value, "i")
                }]
            };
        else
            query = {
                ref: new RegExp(self.body.filter.filters[0].value, "i")
            };

        query.isremoved = { $ne: true };

        ProductModel.find(query, "_id ref", {
            limit: parseInt(self.body.take, 10)
        }, function(err, docs) {
            if (err) {
                console.log("err : /erp/api/product/ref/autocomplete");
                console.log(err);
                return;
            }

            var result = [];
            if (docs !== null)
                for (var i in docs) {
                    //console.log(docs[i]);
                    result[i] = {};
                    result[i].name = docs[i].ref;
                    result[i].id = docs[i]._id;
                }
                //console.log(result);
            return self.json(result);
        });
    }, ['post', 'json', 'authorize']);

    F.route('/erp/api/product/Tag/autocomplete', object.Tag, ['post', 'json', 'authorize']);

    F.route('/erp/api/product/dynform', dynform.read, ['authorize']);
    F.route('/erp/api/product/dynform/{combinedName}', dynform.show, ['authorize']);
    //F.route('/erp/api/product/combined', dynform.calcul, ['post', 'json', 'authorize']); // For eshop
    //F.route('/erp/api/product/combined', dynform.calcul, ['post', 'json', 'unauthorize']); // For eshop
    F.route('/erp/api/product/combined/{pricelevel}', dynform.calcul, ['post', 'json', 'authorize']);

    // product types
    var productTypes = new ProductTypes();
    F.route('/erp/api/product/productTypes/{id}', productTypes.getProductTypeById, ['authorize']);
    F.route('/erp/api/product/productTypes', productTypes.getAllProductTypes, ['authorize']);
    F.route('/erp/api/product/productTypes', productTypes.createProductType, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/productTypes/{id}', productTypes.updateProductType, ['put', 'json', 'authorize']);
    F.route('/erp/api/product/productTypes', productTypes.deleteProductType, ['delete', 'authorize']);
    F.route('/erp/api/product/productTypes/{id}', productTypes.deleteProductType, ['delete', 'authorize']);

    //variants
    F.route('/erp/api/product/variants/{productId}', object.getProductsById, ['authorize']);
    F.route('/erp/api/product/variants/{productId}', object.createProductVariants, ['post', 'json', 'authorize']);

    F.route('/erp/api/product', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/product/{productId}', object.destroy, ['delete', 'authorize']);
    F.route('/erp/api/product/{productId}', object.show, ['authorize']);
    F.route('/erp/api/product/{productId}/{field}', object.updateField, ['put', 'json', 'authorize']);
    F.route('/erp/api/product/{productId}', object.update, ['put', 'json', 'authorize'], 512);
    F.route('/erp/api/product/{productId}', object.clone, ['post', 'json', 'authorize']);
    //other routes..
};

// Read a product
function Product(id, cb) {
    var ProductModel = MODEL('product').Schema;

    //TODO Check ACL here
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    var query = {};
    if (checkForHexRegExp.test(id))
        query = {
            _id: id
        };
    else
        query = {
            "info.SKU": id
        };
    //console.log(query);

    ProductModel.findOne(query)
        .populate("suppliers.societe", "_id name")
        .populate("pack.id", "info directCost indirectCost")
        .populate({
            path: 'info.productType'
                //    populate: { path: "options" }
        })
        .populate({
            path: 'sellFamily',
            populate: { path: "options", populate: { path: "group" } }
        })
        .populate({
            path: 'costFamily'
        })
        .populate({ path: 'taxes.taxeId' })
        .populate("suppliers.taxes.taxeId")
        /*.populate({
            path: 'attributes.attribute',
            populate: { path: "group" }
        })
        .populate({
            path: 'attributes.options'
                //    populate: { path: "options" }
        })*/
        .exec(cb);
}


function Object() {}

Object.prototype = {
    create: function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        var product = new ProductModel(self.body);

        product.editedBy = self.user._id;
        product.createdBy = self.user._id;

        if (!product.info || !product.info.productType || !product.sellFamily) {
            let error = ('Product type and Family are required');

            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: error
                }
            });
        }

        product.groupId = product._id.toString();

        //console.log(product);

        product.save(function(err, doc) {
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
                message: "Produit enregistre"
            };
            self.json(doc);
        });
    },
    autocomplete: function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;
        var ObjectId = MODULE('utils').ObjectId;

        //console.dir(self.body);

        if (self.body.filter == null)
            return self.json([]);

        var query = {
            isremoved: { $ne: true },
            "$or": [{
                'info.SKU': new RegExp(self.body.filter.filters[0].value, "i")
            }, {
                'info.langs[0].name': new RegExp(self.body.filter.filters[0].value, "gi")
            }]
        };

        /* filter on family product */
        if (self.body.family)
            query.caFamily = self.body.family;

        var base = true;
        if (self.body.priceList && self.body.priceList !== null) {
            base = false;
        }

        //console.log(self.body);

        var cost = false;
        if (self.body.supplier || self.query.supplier) {
            query.isBuy = true;
            cost = true;
            base = false;
        } else
            query.isBuy = true;



        ProductModel.aggregate([{
                $match: query
            }, {
                $project: {
                    _id: 1,
                    ref: '$info.SKU',
                    dynForm: 1,
                    taxes: 1,
                    units: 1,
                    directCost: 1,
                    indirectCost: 1,
                    info: 1,
                    size: 1
                }
            }, {
                $lookup: {
                    from: 'ProductPrices',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'prices'
                }
            }, {
                $unwind: '$prices'
            }, {
                $lookup: {
                    from: 'PriceList',
                    localField: 'prices.priceLists',
                    foreignField: '_id',
                    as: 'priceLists'
                }
            }, {
                $project: {
                    _id: 1,
                    ref: 1,
                    dynForm: 1,
                    taxes: 1,
                    units: 1,
                    directCost: 1,
                    indirectCost: 1,
                    info: 1,
                    size: 1,
                    prices: { $arrayElemAt: ['$prices.prices', 0] },
                    discount: '$prices.discount',
                    priceLists: { $arrayElemAt: ['$priceLists', 0] }
                }
            }, {
                $match: {
                    //   $or: [{
                    // 'priceLists.cost': (cost ? cost : { $ne: true }),
                    //       'priceLists.defaultPriceList': true //(base ? base : { $ne: true })
                    //   }, {
                    'priceLists._id': ObjectId(self.body.priceList)
                        //   }]
                }
            },
            /*,{
                        $group : {
                            _id:
                        }
                    }, */
            {
                $limit: self.body.take || self.query.take || 20
            }, {
                $sort: { 'info.SKU': 1 }
            }
        ], function(err, docs) {
            if (err)
                return self.throw500("err : /api/product/autocomplete" + err);

            //console.log(docs);
            self.json(docs);
        });
    },
    read: function(req, res) {
        var query = {
            isremoved: { $ne: true }
        };
        var fields = "-history -files";
        var sort = {};

        if (req.query.query) {
            switch (req.query.query) {
                case "SELL":
                    query.Status = {
                        $in: ["SELL", "SELLBUY"]
                    };
                    break;
                case "BUY":
                    query.Status = {
                        $in: ["BUY", "SELLBUY"]
                    };
                    break;
                default:
                    break;
            }
        }

        if (req.query.barCode)
            query.barCode = {
                $nin: [null, ""]
            };

        if (req.query.fields)
            fields = req.query.fields;

        if (req.query.filter)
            query.$or = [{
                ref: new RegExp(req.query.filter, "i")
            }, {
                label: new RegExp("\\b" + req.query.filter, "i")
            }, {
                description: new RegExp("\\b" + req.query.filter, "i")
            }];

        if (req.query.sort)
            sort = JSON.parse(req.query.sort);

        ProductModel.find(query, fields, {
            skip: parseInt(req.query.skip, 10) * parseInt(req.query.limit, 10) || 0,
            limit: req.query.limit || 100,
            sort: sort
        }, function(err, docs) {
            if (err)
                console.log(err);
            //console.log(docs);

            res.send(200, docs);
        });
    },
    readDT: function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;
        var ProductTypesModel = MODEL('productTypes').Schema;
        var ProductFamilyModel = MODEL('productFamily').Schema;

        var query = JSON.parse(self.req.body.query);

        //console.log(self.body);

        var conditions = {
            isremoved: { $ne: true }
        };


        if (!query.search.value) {
            conditions["info.isActive"] = true;
            switch (self.query.Status) {
                case "ALL":
                    break;
                case "SELL":
                    conditions.isSell = true;
                    break;
                case "BUY":
                    conditions.isBuy = true;
                    break;
                default: //ALL
                    break;
            }
        }

        if (self.query.family !== 'null')
            conditions["caFamily"] = self.query.family;

        var options = {
            conditions: conditions,
            select: "prices.pu_ht"
        };

        async.parallel({
            status: function(cb) {
                Dict.dict({
                    dictName: "fk_user_status",
                    object: true
                }, cb);
            },
            datatable: function(cb) {
                ProductModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                console.log(err);

            ProductTypesModel.populate(res, { path: "datatable.data.info.productType" }, function(err, res) {
                ProductFamilyModel.populate(res, { path: "datatable.data.sellFamily" }, function(err, res) {

                    //console.log(res);

                    for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                        var row = res.datatable.data[i];
                        //console.log(row);

                        // Add checkbox
                        res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                        // Add id
                        res.datatable.data[i].DT_RowId = row._id.toString();
                        //Prices 

                        if (row.prices && row.prices.pu_ht)
                            res.datatable.data[i].prices.pu_ht = MODULE('utils').printPrice(row.prices.pu_ht, 3);
                        //else if (row.Status == 'SELL' || row.Status == 'SELLBUY')
                        //    res.datatable.data[i].pu_ht = '<span class="text-danger">Inconnu</span>';
                        else if (row.prices && row.prices.pu_ht == 0)
                            res.datatable.data[i].pu_ht = '';

                        if (row.directCost)
                            res.datatable.data[i].directCost = MODULE('utils').printPrice(row.directCost, 3);
                        else if (row.Status == 'BUY' || row.Status == 'SELLBUY')
                            res.datatable.data[i].directCost = '<span class="text-danger">Inconnu</span>';

                        if (res.datatable.data[i].info.isActive == false)
                        // Add color line 
                            res.datatable.data[i].DT_RowClass = "bg-red-haze";

                        // Action
                        res.datatable.data[i].action = '<a href="#!/product/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.info.SKU + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                        // Add url on name
                        res.datatable.data[i].info.SKU = '<a class="with-tooltip" href="#!/product/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.info.SKU + '">' + row.info.SKU;

                        /*switch (row.type) {
                            case 'PRODUCT':
                                res.datatable.data[i].ref += ' <span class="badge pull-right badge-info"> P </span></a>';
                                break;
                            case 'PACK':
                                res.datatable.data[i].ref += ' <span class="badge pull-right badge-success"> C </span></a>';
                                break;
                            case 'VIRTUAL':
                                res.datatable.data[i].ref += ' <span class="badge pull-right badge-danger"> V </span></a>';
                                break;
                            case 'DYNAMIC':
                                res.datatable.data[i].ref += ' <span class="badge pull-right badge-warning"> D </span></a>';
                                break;
                            case 'SERVICE':
                                res.datatable.data[i].ref += ' <span class="badge pull-right badge-default"> S </span></a>';
                                break;
                            default:
                                res.datatable.data[i].ref += '</a>';
                        }*/

                        //console.log(res.datatable.data[i].info.productType);
                        res.datatable.data[i].info.productType = row.info.productType.langs[0].name;
                        res.datatable.data[i].sellFamily = row.sellFamily.langs[0].name;

                        //res.datatable.data[i].info.name = row.info.langs[0].name;
                        // Convert Date
                        res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                        if (row.weight)
                            res.datatable.data[i].weight = MODULE('utils').printWeight(row.weight, 3);
                        // Convert Status
                        //res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.lang + ":" + res.status.values[row.Status].label) + '</span>' : row.Status);
                        res.datatable.data[i].Status = (row.info.isActive ? '<span class="label label-sm ' + res.status.values['ENABLE'].cssClass + '">' + res.status.values['ENABLE'].label + '</span>' : '<span class="label label-sm ' + res.status.values['DISABLE'].cssClass + '">' + res.status.values['DISABLE'].label + '</span>');
                    }

                    //console.log(res.datatable);

                    self.json(res.datatable);
                });
            });
        });
    },
    show: function(id) {
        var self = this;
        Product(id, function(err, product) {
            if (err)
                console.log(err);

            self.json(product);
        });
    },
    getProductsById: function(id) {
        var ObjectId = MODULE('utils').ObjectId;
        var self = this;
        var ProductModel = MODEL('product').Schema;
        var departmentSearcher;
        var contentIdsSearcher;
        var contentSearcher;
        var optionsValueSearcher;
        var optionsIdsSearcher;
        var waterfallTasks;
        var imagesGetter;

        if (!id && id.length < 24)
            return self.throw404();

        departmentSearcher = function(waterfallCallback) {
            MODEL('Department').Schema.aggregate({
                $match: {
                    users: ObjectId(self.user._id)
                }
            }, {
                $project: {
                    _id: 1
                }
            }, waterfallCallback);
        };

        contentIdsSearcher = function(deps, waterfallCallback) {
            //return console.log(deps);
            /*var rewriteAccess = MODULE('helper').rewriteAccess;
            var everyOne = rewriteAccess.everyOne();
            var owner = rewriteAccess.owner(self.user._id);
            var group = rewriteAccess.group(self.user._id, deps);
            var whoCanRw = [everyOne, owner, group];
            */
            var matchQuery = {
                //    $or: whoCanRw
            };

            ProductModel.aggregate({
                $match: matchQuery
            }, {
                $project: {
                    _id: 1
                }
            }, waterfallCallback);
        };

        contentSearcher = function(productsIds, waterfallCallback) {
            ProductModel.aggregate([{
                    $match: {
                        _id: ObjectId(id)
                    }
                }, {
                    $lookup: {
                        from: 'Product',
                        localField: 'groupId',
                        foreignField: 'groupId',
                        as: 'products'
                    }
                }, {
                    $unwind: '$products'
                }, {
                    $match: { 'products.isremoved': { $ne: true } }
                }, {
                    $unwind: {
                        path: '$products.pack',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'Product',
                        localField: 'products.pack.id',
                        foreignField: '_id',
                        as: 'BundlessProduct'
                    }
                }, {
                    $unwind: {
                        path: '$BundlessProduct',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'Images',
                        localField: 'products.imageSrc',
                        foreignField: '_id',
                        as: 'products.image'
                    }
                }, {
                    $unwind: {
                        path: '$products.image',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $project: {
                        _id: '$products._id',
                        info: '$products.info',
                        name: '$products.name',
                        isBundle: '$products.isBundle',
                        isVariant: '$products.isVariant',
                        inventory: '$products.inventory',
                        imageSrc: '$products.image.imageSrc',
                        variants: '$products.variants',

                        pack: {
                            _id: '$BundlessProduct._id',
                            name: '$BundlessProduct.name',
                            qty: '$products.pack.qty'
                        },

                        prices: '$products.prices',
                        workflow: '$products.workflow',
                        whoCanRW: '$products.whoCanRW',
                        groups: '$products.groups',
                        createdAt: '$products.createdAt',
                        updatedAt: '$products.updatedAt',
                        createdBy: '$products.createdBy',
                        editedBy: '$products.editedBy',
                        attachments: '$products.attachments',
                        canBeSold: '$products.canBeSold',
                        canBeExpensed: '$products.canBeExpensed',
                        eventSubscription: '$products.eventSubscription',
                        canBePurchased: '$products.canBePurchased',
                        groupId: '$products.groupId',
                        Status: '$products.Status'
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        info: { $first: '$info' },
                        name: { $first: '$name' },
                        imageSrc: { $first: '$imageSrc' },
                        isBundle: { $first: '$isBundle' },
                        isVariant: { $first: '$isVariant' },
                        inventory: { $first: '$inventory' },
                        pack: { $push: '$pack' },
                        prices: { $first: '$prices' },
                        workflow: { $first: '$workflow' },
                        whoCanRW: { $first: '$whoCanRW' },
                        groups: { $first: '$groups' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        createdBy: { $first: '$createdBy' },
                        editedBy: { $first: '$editedBy' },
                        attachments: { $first: '$attachments' },
                        canBeSold: { $first: '$canBeSold' },
                        canBeExpensed: { $first: '$canBeExpensed' },
                        eventSubscription: { $first: '$eventSubscription' },
                        canBePurchased: { $first: '$canBePurchased' },
                        variants: { $first: '$variants' },
                        groupId: { $first: '$groupId' },
                        Status: { $first: '$Status' }
                    }
                }, {
                    $lookup: {
                        from: 'ProductPrices',
                        localField: '_id',
                        foreignField: 'product',
                        as: 'priceLists'
                    }
                }, {
                    $unwind: {
                        path: '$priceLists',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'PriceList',
                        localField: 'priceLists.priceLists',
                        foreignField: '_id',
                        as: 'priceLists.priceLists'
                    }
                }, {
                    $unwind: {
                        path: '$priceLists.priceLists',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'currency',
                        localField: 'priceLists.priceLists.currency',
                        foreignField: '_id',
                        as: 'priceLists.priceLists.currency'
                    }
                }, {
                    $unwind: {
                        path: '$priceLists.priceLists.currency',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $unwind: {
                        path: '$info.categories',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductCategories',
                        localField: 'info.categories',
                        foreignField: '_id',
                        as: 'categories'
                    }
                }, {
                    $unwind: {
                        path: '$categories',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $project: {
                        _id: '$_id',
                        info: '$info',
                        name: '$name',
                        isBundle: '$isBundle',
                        isVariant: '$isVariant',
                        inventory: '$inventory',
                        imageSrc: '$imageSrc',
                        pack: '$pack',
                        prices: '$prices',
                        workflow: '$workflow',
                        whoCanRW: '$whoCanRW',
                        groups: '$groups',
                        createdAt: '$createdAt',
                        updatedAt: '$updatedAt',
                        createdBy: '$createdBy',
                        editedBy: '$editedBy',
                        attachments: '$attachments',
                        canBeSold: '$canBeSold',
                        canBeExpensed: '$canBeExpensed',
                        eventSubscription: '$eventSubscription',
                        canBePurchased: '$canBePurchased',
                        priceLists: '$priceLists',
                        groupId: '$groupId',
                        categories: '$categories',
                        variants: '$variants',
                        Status: '$Status'
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        pL: { $push: '$priceLists' },
                        info: { $first: '$info' },
                        name: { $first: '$name' },
                        imageSrc: { $first: '$imageSrc' },
                        isBundle: { $first: '$isBundle' },
                        isVariant: { $first: '$isVariant' },
                        inventory: { $first: '$inventory' },
                        pack: { $first: '$pack' },
                        prices: { $first: '$prices' },
                        workflow: { $first: '$workflow' },
                        whoCanRW: { $first: '$whoCanRW' },
                        groups: { $first: '$groups' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        createdBy: { $first: '$createdBy' },
                        editedBy: { $first: '$editedBy' },
                        attachments: { $first: '$attachments' },
                        canBeSold: { $first: '$canBeSold' },
                        canBeExpensed: { $first: '$canBeExpensed' },
                        eventSubscription: { $first: '$eventSubscription' },
                        canBePurchased: { $first: '$canBePurchased' },
                        groupId: { $first: '$groupId' },
                        variants: { $first: '$variants' },
                        categories: {
                            $addToSet: {
                                _id: '$categories._id',
                                name: '$categories.name',
                                fullName: '$categories.fullName'
                            }
                        },
                        Status: { $first: '$Status' }
                    }
                }, {
                    $unwind: {
                        path: '$variants',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductAttributesValues',
                        localField: 'variants',
                        foreignField: '_id',
                        as: 'variants'
                    }
                }, {
                    $project: {
                        _id: 1,
                        variants: { $arrayElemAt: ['$variants', 0] },
                        pL: 1,
                        info: 1,
                        name: 1,
                        imageSrc: 1,
                        isBundle: 1,
                        isVariant: 1,
                        inventory: 1,
                        pack: 1,
                        workflow: 1,
                        prices: 1,
                        whoCanRW: 1,
                        groups: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        createdBy: 1,
                        editedBy: 1,
                        attachments: 1,
                        canBeSold: 1,
                        canBeExpensed: 1,
                        eventSubscription: 1,
                        canBePurchased: 1,
                        groupId: 1,
                        categories: 1,
                        Status: 1
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        variants: { $addToSet: '$variants' },
                        pL: { $first: '$pL' },
                        info: { $first: '$info' },
                        name: { $first: '$name' },
                        imageSrc: { $first: '$imageSrc' },
                        isBundle: { $first: '$isBundle' },
                        isVariant: { $first: '$isVariant' },
                        inventory: { $first: '$inventory' },
                        pack: { $first: '$pack' },
                        prices: { $first: '$prices' },
                        workflow: { $first: '$workflow' },
                        whoCanRW: { $first: '$whoCanRW' },
                        groups: { $first: '$groups' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        createdBy: { $first: '$createdBy' },
                        editedBy: { $first: '$editedBy' },
                        attachments: { $first: '$attachments' },
                        canBeSold: { $first: '$canBeSold' },
                        canBeExpensed: { $first: '$canBeExpensed' },
                        eventSubscription: { $first: '$eventSubscription' },
                        canBePurchased: { $first: '$canBePurchased' },
                        groupId: { $first: '$groupId' },
                        categories: { $first: '$categories' },
                        Status: { $first: '$Status' }
                    }
                },
                {
                    $lookup: {
                        from: 'channelLinks',
                        localField: '_id',
                        foreignField: 'product',
                        as: 'channelLinks'
                    }
                },
                {
                    $unwind: {
                        path: '$channelLinks',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'integrations',
                        localField: 'channelLinks.channel',
                        foreignField: '_id',
                        as: 'channelLinks'
                    }
                },
                {
                    $unwind: {
                        path: '$channelLinks',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        variants: { $addToSet: '$variants' },
                        pL: { $first: '$pL' },
                        info: { $first: '$info' },
                        name: { $first: '$name' },
                        imageSrc: { $first: '$imageSrc' },
                        isBundle: { $first: '$isBundle' },
                        isVariant: { $first: '$isVariant' },
                        inventory: { $first: '$inventory' },
                        pack: { $first: '$pack' },
                        prices: { $first: '$prices' },
                        workflow: { $first: '$workflow' },
                        whoCanRW: { $first: '$whoCanRW' },
                        groups: { $first: '$groups' },
                        createdAt: { $first: '$createdAt' },
                        updatedAt: { $first: '$updatedAt' },
                        createdBy: { $first: '$createdBy' },
                        editedBy: { $first: '$editedBy' },
                        attachments: { $first: '$attachments' },
                        canBeSold: { $first: '$canBeSold' },
                        canBeExpensed: { $first: '$canBeExpensed' },
                        eventSubscription: { $first: '$eventSubscription' },
                        canBePurchased: { $first: '$canBePurchased' },
                        groupId: { $first: '$groupId' },
                        categories: { $first: '$categories' },
                        channels: {
                            $addToSet: {
                                _id: '$channelLinks._id',
                                name: '$channelLinks.channelName',
                                type: '$channelLinks.type'
                            }
                        },
                        Status: { $first: '$Status' }
                    }
                },
                {
                    $group: {
                        _id: '$groupId',
                        id: { $first: '$_id' },
                        groupId: { $first: '$groupId' },
                        variantsArray: { $push: '$$ROOT' }
                    }
                },
                {
                    $lookup: {
                        from: 'Images',
                        localField: 'groupId',
                        foreignField: 'product',
                        as: 'images'
                    }
                },
                {
                    $project: {
                        _id: '$id',
                        groupId: '$groupId',
                        variantsArray: '$variantsArray',
                        images: '$images'
                    }
                }
            ], function(err, result) {
                if (err)
                    return waterfallCallback(err);

                if (result.length)
                    waterfallCallback(null, result[0]);
                else
                    waterfallCallback(null, {});

            });
        };

        optionsValueSearcher = function(product, waterfallCallback) {
            var groupId = product.groupId;

            ProductModel.aggregate([{
                    $match: {
                        groupId: groupId
                    }
                }, {
                    $unwind: {
                        path: '$variants',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductAttributesValues',
                        localField: 'variants',
                        foreignField: '_id',
                        as: 'variants'
                    }
                }, {
                    $unwind: {
                        path: '$variants',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'ProductAttributes',
                        localField: 'variants.optionId',
                        foreignField: '_id',
                        as: 'variants.optionId'
                    }
                }, {
                    $group: {
                        _id: '$variants.optionId._id',
                        name: { $first: '$variants.optionId.code' }, // TODO replace with langs
                        values: { $addToSet: { _id: '$variants._id', value: '$variants.code' } } //TODO replace with langs
                    }
                }],
                function(err, productOptions) {
                    if (err)
                        return waterfallCallback(err);

                    product.currentValues = productOptions;

                    waterfallCallback(null, product);
                });
        };

        optionsIdsSearcher = function(product, waterfallCallback) {
            var groupId = product.groupId;

            ProductModel.find({ groupId: groupId, isremoved: { $ne: true } }, {
                _id: 1,
                isVariant: 1,
                variants: 1,
                'info.SKU': 1
            }, function(err, values) {
                var valIdsArray = {};
                var valKeydArray = [];

                if (err)
                    return waterfallCallback(err);

                values.forEach(function(item) {
                    var itemJSON = item.toJSON();
                    //console.log(itemJSON.variants);
                    var strVariants = itemJSON.variants ? itemJSON.variants.toStringObjectIds() : [];
                    var valId;

                    strVariants = strVariants.sort();
                    valId = strVariants.join('/');

                    if (valId)
                        valIdsArray[valId] = {
                            productId: item._id,
                            sku: item.info && item.info.SKU
                        };
                });

                product.valuesIds = valIdsArray;

                product.valuesKeys = _.keys(valIdsArray);

                waterfallCallback(null, product);
            });
        };

        waterfallTasks = [departmentSearcher, contentIdsSearcher, contentSearcher, optionsValueSearcher, optionsIdsSearcher /*, imagesGetter*/ ];

        async.waterfall(waterfallTasks, function(err, product) {
            if (err)
                return self.throw500(err);

            //console.log(product);

            self.json(product);
        });
    },
    clone: function(id) {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        Product(id, function(err, doc) {
            var product = doc.toObject();

            //console.log(doc);

            delete product._id;
            delete product.__v;
            delete product.createdAt;
            delete product.updatedAt;
            delete product.history;
            delete product.ID;
            product.info.SKU += "-copy";
            delete product.oldId;
            product.files = [];
            product.variants = [];
            product.imageSrc = null;

            product = new ProductModel(product);

            product.save(function(err, doc) {
                if (err)
                    return self.throw500(err);

                self.json(doc);
            });
        });
    },
    update: function(id) {
        var self = this;
        //console.log(self.body);
        Product(id, function(err, product) {

            if (err) {
                console.log("Error loading", err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur Loading',
                        message: err
                    }
                });
            }

            product = _.extend(product, self.body);

            product.editedBy = self.user._id;

            if (!product.createdBy)
                product.createdBy = self.user._id;

            //console.log(self.body.suppliers);

            //console.log(product);
            product.save(function(err, doc) {
                if (err) {
                    console.log("error save", err.errors);
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
                    message: "Produit enregistre"
                };
                self.json(doc);
            });
        });

    },
    destroy: function(id) {
        var ProductModel = MODEL('product').Schema;
        var PriceLevelModel = MODEL('pricelevel').Schema;
        var self = this;

        PriceLevelModel.remove({ 'product': id }, function(err) {
            if (err)
                console.log(err);
        });

        ProductModel.update({
            _id: id
        }, { $set: { isremoved: true } }, function(err) {
            if (err)
                return self.throw500(err);

            self.json({});

        });
    },
    consumption: function() {
        var self = this;
        var DeliveryModel = MODEL('delivery').Schema;

        var query = self.query;

        if (query.start_date)
            query.start_date = moment(query.start_date).startOf('year').toDate();
        if (query.end_date)
            query.end_date = moment(query.end_date).endOf('year').toDate();

        //console.log(query);

        DeliveryModel.aggregate([
            { $match: { datedl: { $gte: query.start_date, $lt: query.end_date }, Status: { $nin: ['DRAFT', 'CANCELLED'] }, isremoved: { $ne: true } } },
            { $project: { _id: 1, lines: 1, datedl: 1, month: { $month: "$datedl" } } },
            { $unwind: "$lines" },
            { $group: { _id: { product: "$lines.product.id", month: "$month" }, qty: { "$sum": "$lines.qty" }, weight: { "$sum": "$lines.weight" }, total_ht: { "$sum": "$lines.total_ht" } } },
            //{$lookup: {from: 'Product', localField: '_id.product', foreignField: '_id', as: 'pack'} },
            { $sort: { "_id.product": 1, "_id.month": 1 } }
        ], function(err, docs) {
            if (err)
                return console.log(err);


            var options = {
                path: '_id.product',
                model: 'product',
                select: "ref name label weight pack",
                populate: { path: 'pack.id', select: "ref name label unit weight" }
            };
            DeliveryModel.populate(docs, options, function(err, elems) {

                //construct array of month
                var new_data = {};
                // Iterate over data
                elems.map(function(obj) {
                    //console.log(obj._id);



                    // Create new object from old
                    if (!new_data[obj._id.product.ref])
                        new_data[obj._id.product.ref] = {
                            'id': obj._id.product.id,
                            'ref': obj._id.product.ref,
                            'label': obj._id.product.label,
                            'month': []
                        };

                    if (!new_data[obj._id.product.ref].month[obj._id.month])
                        new_data[obj._id.product.ref].month[obj._id.month] = {
                            'month': obj._id.month,
                            'qty': obj.qty,
                            'weight': obj.weight,
                            'total_ht': obj.total_ht
                        };
                    else {
                        new_data[product.id.ref].month[obj._id.month].qty += obj.qty;
                        new_data[product.id.ref].month[obj._id.month].weight += obj.weight;
                        new_data[product.id.ref].month[obj._id.month].total_ht += obj.total_ht;
                    }

                    new_data[obj._id.product.ref].month[obj._id.month] = {
                        'month': obj._id.month,
                        'qty': obj.qty,
                        'weight': obj.weight,
                        'total_ht': obj.total_ht
                    };

                    for (var i = 0, len = obj._id.product.pack.length; i < len; i++) {
                        var product = obj._id.product.pack[i];
                        //console.log(product);
                        if (!new_data[product.id.ref])
                            new_data[product.id.ref] = {
                                'id': product.id._id,
                                'ref': product.id.ref,
                                'label': product.id.label,
                                'month': []
                            };

                        if (!new_data[product.id.ref].month[obj._id.month])
                            new_data[product.id.ref].month[obj._id.month] = {
                                'month': obj._id.month,
                                'qty': obj.qty * product.qty,
                                'weight': obj.qty * product.qty * product.id.weight
                                    //'total_ht': obj.total_ht * product.qty
                            };
                        else {
                            new_data[product.id.ref].month[obj._id.month].qty += obj.qty * product.qty;
                            new_data[product.id.ref].month[obj._id.month].weight += obj.qty * product.qty * product.id.weight;
                            //    'total_ht': obj.total_ht
                        }


                    }

                });
                self.json({
                    year: moment(query.start_date).year(),
                    items: new_data
                });


            });


        });
    },
    createProductVariants: function(id) {
        var self = this;
        var body = self.body;
        var objectId = MODULE('utils').ObjectId;
        var variants = body.variants;
        var isNew = body.isNew;
        var productId = id;
        var Product = MODEL('product').Schema;
        var ProductPrices = MODEL('productPrices').Schema;
        var Category = MODEL('productCategory').Schema;
        var modelJSON;
        var error;
        var variantsArray;
        var variantProductId;
        var groupId;
        var countProduct;
        var categoriesIds;
        var firstItem;

        // new reformat array values
        if (variants.length && isNew)
            variants.forEach(function(options) {
                options.values = _.map(options.values, function(elem) {
                    return elem._id;
                });
            });
        else variants.forEach(function(options) {
            options = _.map(options, function(elem) {
                return elem.values;
            });
        });
        //return console.log(variants);

        if (isNew) {
            variantsArray = createAllVariants(variants);
            countProduct = variantsArray.length - 1;
            firstItem = variantsArray.shift();
        } else {
            variantsArray = variants;
            countProduct = variantsArray.length;
            firstItem = variantsArray[0];
        }

        function createAllVariants(variants) {
            var variantsArray = [];
            var temp1;
            var temp2;
            var temp3;
            var temp4;
            var i;
            var j;
            var k;
            var p;

            if (variants.length === 1) {
                temp1 = variants[0].values;

                for (i = 0; i <= temp1.length - 1; i++)
                    variantsArray.push([objectId(temp1[i])]);

            } else if (variants.length === 2) {
                temp1 = variants[0].values;
                temp2 = variants[1].values;

                for (i = 0; i <= temp1.length - 1; i++)
                    for (j = 0; j <= temp2.length - 1; j++)
                        variantsArray.push([
                            objectId(temp1[i]), objectId(temp2[j])
                        ]);


            } else if (variants.length === 3) {
                temp1 = variants[0].values;
                temp2 = variants[1].values;
                temp3 = variants[2].values;

                for (i = 0; i <= temp1.length - 1; i++)
                    for (j = 0; j <= temp2.length - 1; j++)
                        for (k = 0; k <= temp3.length - 1; k++)
                            variantsArray.push([objectId(temp1[i]), objectId(temp2[j]), objectId(temp3[k])]);



            } else {
                temp1 = variants[0].values;
                temp2 = variants[1].values;
                temp3 = variants[2].values;
                temp4 = variants[3].values;

                for (i = 0; i <= temp1.length - 1; i++)
                    for (j = 0; j <= temp2.length - 1; j++)
                        for (k = 0; k <= temp3.length - 1; k++)
                            for (p = 0; p <= temp4.length - 1; p++)
                                variantsArray.push([
                                    objectId(temp1[i]),
                                    objectId(temp2[j]),
                                    objectId(temp3[k]),
                                    objectId(temp4[p])
                                ]);




            }

            return variantsArray;
        }

        function createPricesForNewProduct(ProductPricesModel, prices, productId, callback) {
            async.each(prices, function(price, eachCb) {
                var model;

                price = price.toJSON();

                delete price._id;

                price.product = productId;
                model = ProductPricesModel(price);
                model.save(function(err) {
                    if (err) {
                        return eachCb(err);
                    }

                    eachCb(null);
                });
            }, function(err) {
                if (err) {
                    return callback(err);
                }

                callback(null);
            });
        }

        function findingOriginalProduct(wCb) {
            if (isNew) {
                Product.findOneAndUpdate({ _id: productId }, {
                    $set: {
                        variants: firstItem,
                        isVariant: true,
                    }
                }, function(err, model) {
                    if (err) {
                        return wCb(err);
                    }

                    if (!model) {
                        error = new Error('Such product not found');
                        error.status = 404;
                        return next(err);
                    }

                    modelJSON = model.toJSON();
                    categoriesIds = modelJSON.info && modelJSON.info.categories;

                    groupId = modelJSON.groupId;

                    wCb(null, modelJSON);
                });
            } else {
                Product.findOne({ _id: productId }, function(err, model) {
                    if (err) {
                        return wCb(err);
                    }

                    if (!model) {
                        error = new Error('Such product not found');
                        error.status = 404;
                        return next(err);
                    }

                    modelJSON = model.toJSON();
                    categoriesIds = modelJSON.info && modelJSON.info.categories;

                    groupId = modelJSON.groupId;

                    wCb(null, modelJSON);
                });
            }
        }

        function createVariants(modelJSON, wCb) {
            var ids = [];

            async.eachLimit(variantsArray, 1, function(item, eachCb) {
                var model;

                modelJSON.variants = item;
                modelJSON.isVariant = true;

                if (isNew) {
                    modelJSON.groupId = groupId;
                }

                delete modelJSON._id;
                delete modelJSON.seq;
                delete modelJSON.info.langs[0].linker;
                //modelJSON.info.langs[0].name += 

                model = new Product(modelJSON);
                model.save(function(err) {
                    if (err)
                        return eachCb(err);


                    ids.push(model.toJSON()._id);
                    variantProductId = model.toJSON()._id;

                    eachCb();
                });

            }, function(err) {
                if (err)
                    return wCb(err);


                wCb(null, ids);
            });
        }

        function createProductPrice(ids, wCb) {
            ProductPrices.find({ product: productId }, function(err, result) {
                if (err) {
                    return wCb(err);
                }

                if (!result.length) {
                    return wCb(null);
                }

                async.each(ids, function(id, eachCb) {
                    createPricesForNewProduct(ProductPrices, result, id, eachCb);
                }, function(err) {
                    if (err) {
                        return wCb(err);
                    }

                    wCb(null, ids);
                });
            });
        }

        async.waterfall([
            findingOriginalProduct,
            createVariants,
            createProductPrice,
            function(ids, wCb) {
                console.log(ids);
                wCb(null);
                //redis.sAdd(CONSTANTS.REDIS.CHANGED_PRODUCTS, ids, wCb);
            }
        ], function(err) {
            if (err)
                return self.throw500(err);


            self.json({ success: 'Variants created success', id: variantProductId });
        });
    },
    Tag: function() {
        var self = this;
        var ProductModel = MODEL('product').Schema;

        //console.dir(self.body);

        var query;
        /*if (self.query.type)
            query = {
                '$and': [{
                    Status: self.query.type
                }, {
                    Tag: new RegExp(self.body.filter.filters[0].value, "i")
                }]
            };
        else*/
        query = {
            'info.langs.0.Tag': new RegExp(self.body.filter.filters[0].value, "gi")
        };

        query.isremoved = { $ne: true };

        ProductModel.aggregate([{
            $match: query
        }, {
            $project: {
                _id: 1,
                Tag: { $arrayElemAt: ['$info.langs', 0] },
            }
        }, {
            $project: {
                _id: 1,
                Tag: '$Tag.Tag',
            },
        }, {
            $unwind: '$Tag'
        }, {
            $group: {
                _id: '$Tag'
            }
        }, {
            $project: {
                name: '$_id',
                text: '$_id',
                id: '$id'
            },
        }, {
            $sort: { id: 1 }
        }, {
            $limit: parseInt(self.body.take, 10)
        }], function(err, docs) {
            if (err) {
                console.log("err : /erp/api/product/Tag/autocomplete");
                console.log(err);
                return;
            }

            return self.json(docs || []);
        });
    }
};


function PricesList() {}

PricesList.prototype = {
    getAllPricesLists: function() {
        var self = this;
        var query = self.query;
        var paginationObject = MODULE('helper').page(query);
        var skip = paginationObject.skip;
        var limit = paginationObject.limit;
        var PriceListModel = MODEL('priceList').Schema;
        var sortObj;
        var key;

        var lang = 0;

        if (query.cost)
            query.cost = (query.cost == 'true' ? true : false);

        if (query.sort) {
            key = Object.keys(query.sort)[0];
            req.query.sort[key] = parseInt(query.sort[key], 10);

            sortObj = query.sort;
        } else {
            sortObj = {
                'data.priceListCode': 1
            };
        }

        //console.log(query);

        PriceListModel.aggregate([{
            $match: query
        }, {
            $lookup: {
                from: 'Customers',
                localField: '_id',
                foreignField: 'salesPurchases.priceList',
                as: 'Customers'
            }
        }, {
            $project: {
                countCustomers: { $size: '$Customers' },
                priceListCode: 1,
                name: 1,
                currency: 1,
                cost: 1,
                defaultPriceList: 1,
                removable: 1
            }
        }, {
            $group: {
                _id: null,
                total: { $sum: 1 },
                root: { $push: '$$ROOT' }
            }
        }, {
            $unwind: '$root'
        }, {
            $project: {
                _id: 1,
                total: 1,
                data: {
                    _id: '$root._id',
                    priceListCode: '$root.priceListCode',
                    name: { $concat: ['$root.name', ' - ', '$root.currency'] },
                    currency: '$root.currency',
                    cost: '$root.cost',
                    defaultPriceList: '$root.defaultPriceList',
                    removable: '$root.removable',
                    countCustomers: '$root.countCustomers'
                }
            }
        }, {
            $sort: sortObj
        }, {
            $skip: skip
        }, {
            $limit: limit
        }, {
            $group: {
                _id: null,
                total: { $first: '$total' },
                data: { $push: '$data' }
            }
        }, {
            $project: {
                _id: 1,
                total: '$total',
                data: '$data'
            }
        }]).exec(function(err, result) {
            //console.log(result);
            if (err)
                return self.throw500(err);

            if (result && result.length)
                return self.json(result[0]);

            self.json({ data: [] });
        });
    },
    read: function() {
        var self = this;
        var PriceListModel = MODEL('priceList').Schema;
        var query = {
            cost: false
        };

        if (self.query.cost && self.query.cost == 'true')
            query.cost = true;

        if (self.query.all)
            delete query.cost;

        var limit = { sort: { priceListCode: 1 } };

        PriceListModel.find(query, '', limit, function(err, docs) {
            if (err)
                return console.log("err : /api/product/prices/priceslist ", err);

            return self.json({
                data: docs || []
            });

        });
    },
    show: function(id) {
        var self = this;
        var PriceListModel = MODEL('priceList').Schema;

        PriceListModel.findById(id, function(err, doc) {
            if (err)
                return self.throw500("err : /api/product/prices/priceslist " + err);

            return self.json(doc);
        });
    },
    update: function(id) {
        var self = this;
        var PriceListModel = MODEL('priceList').Schema;

        PriceListModel.findByIdAndUpdate(id, self.body, { new: true }, function(err, doc) {
            if (err)
                return self.throw500("err : /api/product/prices/priceslist " + err);

            return self.json(doc);
        });
    },
    create: function() {
        var self = this;
        var PriceListModel = MODEL('priceList').Schema;

        var priceList = new PriceListModel(self.body);

        priceList.save(function(err, doc) {
            if (err)
                return self.throw500("err : /api/product/prices/priceslist " + err);

            return self.json(doc);
        });
    },
    delete: function(id) {
        var self = this;
        var PriceListModel = MODEL('priceList').Schema;
        var PriceModel = MODEL('productPrices').Schema;
        var FamilyCoefModel = MODEL('productFamilyCoef').Schema;

        async.parallel([
            function(cb) {
                PriceModel.remove({ priceLists: id }, cb);
            },
            function(cb) {
                FamilyCoefModel.remove({ priceLists: id }, cb);
            },
            function(cb) {
                PriceListModel.remove({
                    _id: id
                }, cb)
            }
        ], function(err) {
            if (err)
                return self.throw500(err);

            self.json({});
        });
    }
};

function Prices() {}

Prices.prototype = {
    read: function() {
        //console.log("toto");
        var self = this;
        var query = self.query;
        var ProductPricesModel = MODEL('productPrices').Schema;
        var ObjectId = MODULE('utils').ObjectId;

        var priceList = query.priceList ? ObjectId(query.priceList) : null;
        var product = query.product ? ObjectId(query.product) : null;

        var cost = false;

        query = {};
        var sort = 'product.name';

        if (priceList)
            query.priceLists = priceList;

        if (product) {
            query.product = product;
            sort = 'priceLists.priceListCode';
        }

        if (self.query.cost)
            cost = true;

        ProductPricesModel.find(query)
            .populate({
                path: "product",
                select: "weight name taxes info directCost indirectCost",
                populate: { path: 'taxes.taxeId' }
            })
            .populate("priceLists")
            .lean()
            .exec(function(err, prices) {
                if (err)
                    return self.throw500(err);

                if (prices == null)
                    prices = [];

                prices = _.filter(prices, function(price) {
                    return price.priceLists.cost === cost;
                });

                for (var j = 0, len = prices.length; j < len; j++) {
                    var price = prices[j];

                    //console.log(price);
                    //build TTC price
                    for (var i = 0; i < price.prices.length; i++) {
                        price.prices[i].margin = {
                            value: MODULE('utils').round(price.prices[i].price - price.product.directCost - price.product.indirectCost, 3),
                            rate: MODULE('utils').round((price.prices[i].price - price.product.directCost - price.product.indirectCost) / (price.product.directCost + price.product.indirectCost) * 100, 2)
                        };
                        if (price.prices[i].specialPrice)
                            price.prices[i].priceTTC = MODULE('utils').round(price.prices[i].specialPrice * (1 + price.product.taxes[0].taxeId.rate / 100));
                        else
                            price.prices[i].priceTTC = MODULE('utils').round(price.prices[i].price * (1 + price.product.taxes[0].taxeId.rate / 100), 3);

                    }
                }

                //console.log(prices);

                prices = _.sortBy(prices, sort);

                self.json(prices);
            });
    },
    update: function(id) {
        var self = this;
        var ProductPricesModel = MODEL('productPrices').Schema;

        ProductPricesModel.findOne({ _id: id })
            //.populate({ path: 'product', select: '_id directCost info', populate: { path: "info.productType", select: "coef" } })
            .populate("priceLists", "cost")
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });
                }

                doc = _.extend(doc, self.body);
                doc.editedBy = self.user._id;

                doc.save(function(err, doc) {
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
                        message: "Prix enregistree"
                    };
                    self.json(doc);
                });
            });
    },
    add: function() {
        var self = this;
        var ProductPricesModel = MODEL('productPrices').Schema;
        var price = new ProductPricesModel(self.body);

        price.editedBy = self.user._id;
        price.createdBy = self.user._id;

        if (!price.product || !price.priceLists)
            return self.throw500("Empty product or priceLists");

        return price.populate("priceLists", function(err, price) {
            price.save(function(err, doc) {
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
                    message: "Nouveau prix enregistree"
                };
                self.json(doc);
            });
        });
    },
    delete: function(id) {
        var self = this;
        var ProductPricesModel = MODEL('productPrices').Schema;
        ProductPricesModel.remove({
            _id: id
        }, function(err) {
            if (err)
                return self.throw500(err);

            self.json({});
        });
    },
    autocomplete: function(body, callback) {
        var PriceLevelModel = MODEL('pricelevel').Schema;

        var query = {
            "product.name": new RegExp(body.filter.filters[0].value, "i"),
            price_level: body.price_level
        };

        /* filter on family product */
        //if (body.family)
        //    query.caFamily = body.family;

        var dict = {};

        //console.log(body);

        Dict.dict({
            dictName: ['fk_product_status', 'fk_units'],
            object: true
        }, function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            dict = doc;
        });

        PriceLevelModel.find(query, "-history", {
                limit: body.take
            })
            .populate("product", "_id label ref minPrice tva_tx caFamily units discount dynForm")
            .sort({ ref: 1 })
            .exec(function(err, prices) {
                if (err) {
                    console.log("err : /api/product/price/autocomplete");
                    console.log(err);
                    return;
                }

                // filter array on caFamily
                if (body.family)
                    prices = prices.filter(function(doc) {
                        return (doc.product.caFamily === body.family);
                    });

                //console.log(prices);

                var result = [];

                for (var i = 0; i < prices.length; i++) {

                    var units = prices[i].product.units;
                    var res = {};

                    if (units && dict.fk_units.values[units].label) {
                        //console.log(this);
                        res.id = units;
                        res.name = i18n.t("products:" + dict.fk_units.values[units].label);
                    } else { // By default
                        res.id = units;
                        res.name = units;
                    }

                    var obj = {
                        pu_ht: prices[i].pu_ht,
                        price_level: prices[i].price_level,
                        discount: prices[i].discount,
                        qtyMin: 0,
                        product: {
                            id: prices[i].product._id,
                            name: prices[i].product.ref,
                            unit: res.name,
                            label: prices[i].product.label,
                            dynForm: prices[i].product.dynForm,
                            caFamily: prices[i].product.caFamily
                        }
                    };
                    result.push(obj);
                }

                //prices[i].product._units = res;

                //console.log(result);
                callback(result);
            });
    },
    upgrade: function(req, res) {
        var PriceLevelModel = MODEL('pricelevel').Schema;

        ProductModel.find(function(err, products) {
            async.each(products, function(product, callback) {

                for (var i = 0; i < product.price.length; i++) {
                    if (product.price[i].price_level === 'BASE')
                        ProductModel.update({
                                _id: product._id
                            }, {
                                pu_ht: product.price[i].pu_ht,
                                tva_tx: product.price[i].tva_tx,
                                tms: product.price[i].tms
                            }, {
                                upsert: false
                            },
                            function(err, numberAffected, price) {
                                if (err)
                                    return console.log(err);

                                //console.log(price);
                            });
                    else
                        PriceLevelModel.update({
                                product: product._id,
                                price_level: product.price[i].price_level,
                                qtyMin: product.price[i].qtyMin
                            }, {
                                product: {
                                    id: product._id,
                                    name: product.ref
                                },
                                price_level: product.price[i].price_level,
                                tms: product.price[i].tms,
                                pu_ht: product.price[i].pu_ht,
                                qtyMin: product.price[i].qtyMin,
                                user_mod: product.price[i].user_mod,
                                optional: {
                                    ref_customer_code: product.price[i].ref_customer_code,
                                    dsf_coef: product.price[i].dsf_coef,
                                    dsf_time: product.price[i].dsf_time
                                },
                                $addToSet: {
                                    history: {
                                        tms: product.price[i].tms,
                                        user_mod: product.price[i].user_mod,
                                        pu_ht: product.price[i].pu_ht,
                                        qtyMin: product.price[i].qtyMin
                                    }
                                }
                            }, {
                                upsert: true
                            },
                            function(err, numberAffected, price) {
                                if (err)
                                    return console.log(err);

                                //console.log(price);
                            });
                }

                callback();
            }, function(err) {
                if (err)
                    return res.json(err);
                res.send(200);
            });
        });
    },
    findOne: function(id, price_level, callback) {
        var PriceLevelModel = MODEL('pricelevel').Schema;

        PriceLevelModel.findOne({ price_level: price_level, product: id }, "product prices discount price_level")
            //.populate("product", "label ref minPrice tva_tx caFamily units discount dynForm")
            //.sort({ref: 1})
            .exec(function(err, price) {
                if (err) {
                    console.log("err : /erp/api/product/price/findOne");
                    console.log(err);
                    return;
                }

                var result;

                if (price)
                    result = {
                        _id: price.product,
                        prices: price.prices,
                        price_level: price.price_level,
                        pu_ht: price.prices.pu_ht,
                        discount: price.discount
                    };


                callback(err, result);
            });
    },
    find: function(refs, price_level, callback) {
        var PriceLevelModel = MODEL('pricelevel').Schema;

        //var query = {
        //    "product.name": ref,
        //    price_level: price_level
        //};

        var dict = {};

        //console.log(body);

        /*Dict.dict({
         dictName: ['fk_product_status', 'fk_units'],
         object: true
         }, function (err, doc) {
         if (err) {
         console.log(err);
         return;
         }
         dict = doc;
         });*/

        //console.log(refs);

        PriceLevelModel.find({ price_level: price_level, 'product': { $in: refs } }, "product prices price_level")
            //.populate("product", "label ref minPrice tva_tx caFamily units discount dynForm")
            //.sort({ref: 1})
            .exec(function(err, prices) {
                if (err) {
                    console.log("err : /api/product/price/autocomplete");
                    console.log(err);
                    return;
                }

                var result = [];

                for (var i = 0, len = prices.length; i < len; i++) {
                    result.push({
                        _id: prices[i].product,
                        prices: prices[i].prices,
                        price_level: prices[i].price_level,
                        pu_ht: prices[i].prices.pu_ht
                    });
                }

                callback(result);
            });
    },
    export: function(priceLevel) {
        var self = this;
        var query = {};
        var PriceLevelModel = MODEL('pricelevel').Schema;

        var Stream = require('stream');
        var stream = new Stream();

        var self = this;

        query.price_level = priceLevel;

        //console.log(query);

        var date = new Date();

        PriceLevelModel.find(query, "-history", {
                sort: {
                    'product.name': 1
                }
            })
            .populate("product", "label pu_ht weight prices")
            .exec(function(err, prices) {
                if (err)
                    console.log(err);

                //console.log(prices);
                if (prices == null)
                    prices = [];

                //entete
                var out = "REF;DESCRIPTION;PU HT;DATEMAJ\n";
                stream.emit('data', out);


                for (var i = 0, len = prices.length; i < len; i++) {
                    out = "";

                    out += prices[i].product.name;
                    out += ";";
                    out += prices[i].product.label;
                    out += ";";
                    out += prices[i].prices.pu_ht;
                    out += ";";
                    out += moment(prices[i].updatedAt).format(CONFIG('dateformatLong'));
                    out += "\n";

                    //console.log(prices[i]);

                    stream.emit('data', out);
                }

                stream.emit('end');
            });

        self.stream('application/text', stream, priceLevel + '_' + date.getFullYear().toString() + "_" + (date.getMonth() + 1).toString() + ".csv");
    }
};

function DynForm() {}

DynForm.prototype = {
    read: function() {
        var DynFormModel = MODEL('dynform').Schema;
        var self = this;

        DynFormModel.find({}, "name", function(err, dynforms) {
            //dynforms.unshift({
            //    name: ""
            //});
            self.json(dynforms)
        });
    },
    show: function(name) {
        var self = this;
        var DynFormModel = MODEL('dynform').Schema;

        DynFormModel.findOne({
            name: name
        }, "_form _schema", function(err, dynform) {

            if (err)
                console.log(err);

            self.json({
                schema: JSON.parse(dynform._schema),
                form: JSON.parse(dynform._form)
            });
        });

    },
    calcul: function(pricelevel) {
        var self = this;
        var DynFormModel = MODEL('dynform').Schema;

        //console.log("body", self.body);
        //console.log("pricelevel", pricelevel);

        var data = self.body;

        DynFormModel.calcul(data.product.dynForm, { data: data, pricelevel: pricelevel }, function(err, result) {
            if (err)
                console.log(err);

            //console.log(data);
            self.json(data);
        });
    }
};

function ProductTypes() {}

ProductTypes.prototype = {
    getProductTypeById: function(id) {
        var self = this;
        var ProductTypesModel = MODEL('productTypes').Schema;
        var _id = id;
        var model;

        _id = _id && _id.length >= 24 ? MODULE('utils').ObjectId(_id) : null;

        ProductTypesModel.findOne({ _id: _id }, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },
    getAllProductTypes: function() {
        var self = this;
        var query = self.query;
        var paginationObject = MODULE('helper').page(query);
        var skip = paginationObject.skip;
        var limit = paginationObject.limit;
        var ProductTypesModel = MODEL('productTypes').Schema;
        var sortObj;
        var key;

        var lang = 0;

        if (query.sort) {
            key = Object.keys(query.sort)[0];
            req.query.sort[key] = parseInt(query.sort[key], 10);

            sortObj = query.sort;
        } else {
            sortObj = {
                'data.sequence': 1
            };
        }

        ProductTypesModel.aggregate([{
            $match: { isActive: true }
        }, {
            $lookup: {
                from: 'Product',
                localField: '_id',
                foreignField: 'info.productType',
                as: 'Products'
            }
        }, {
            $unwind: {
                path: '$options',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'ProductAttributes',
                localField: 'options',
                foreignField: '_id',
                as: 'productOptions'
            }
        }, {
            $project: {
                countProducts: { $size: '$Products' },
                name: '$langs',
                inventory: '$inventory',
                sequence: 1,
                createdAt: '$createdAt',
                opts: { $arrayElemAt: ['$productOptions', 0] }
            }
        }, {
            $unwind: {
                path: '$name',
                includeArrayIndex: 'langId'
            }
        }, {
            $match: {
                langId: lang
            }
        }, {
            $group: {
                _id: '$_id',
                options: { $push: '$opts' },
                name: { $first: '$name.name' },
                inventory: { $first: '$inventory' },
                sequence: { $first: '$sequence' },
                createdAt: { $first: '$createdAt' },
                countProducts: { $first: '$countProducts' }
            }
        }, {
            $group: {
                _id: null,
                total: { $sum: 1 },
                root: { $push: '$$ROOT' }
            }
        }, {
            $unwind: '$root'
        }, {
            $project: {
                _id: 1,
                total: 1,
                data: {
                    _id: '$root._id',
                    name: '$root.name',
                    options: '$root.options',
                    inventory: '$root.inventory',
                    sequence: '$root.sequence',
                    countProducts: '$root.countProducts',
                    createdAt: '$root.createdAt'
                }
            }
        }, {
            $sort: sortObj
        }, {
            $skip: skip
        }, {
            $limit: limit
        }, {
            $group: {
                _id: null,
                total: { $first: '$total' },
                data: { $push: '$data' }
            }
        }, {
            $project: {
                _id: 1,
                total: '$total',
                data: '$data'
            }
        }]).exec(function(err, result) {
            //console.log(result);
            if (err)
                return self.throw500(err);

            if (result && result.length)
                return self.json(result[0]);

            self.json({});
        });
    },
    createProductType: function() {
        var self = this;
        var body = self.body;
        var ProductTypeModel = MODEL('productTypes').Schema;
        var model;
        var err;

        if (!body.langs[0].name) {
            err = new Error('Please provide Product Type name');
            self.throw404(err);
        }

        model = new ProductTypeModel(body);
        model.save(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },
    updateProductType: function(id) {
        var self = this;
        var ProductTypesModel = MODEL('productTypes').Schema;
        var body = self.body;
        var currentOptions;

        ProductTypesModel.findByIdAndUpdate(id, body, { new: true }, function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    deleteProductType: function(id) {
        var self = this;

        var ProductTypesModel = MODEL('productTypes').Schema;
        ProductTypesModel.findByIdAndUpdate(id, { isActive: false }, { new: true }, function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    }
};

function ProductFamily() {}

ProductFamily.prototype = {
    getProductFamilyById: function(id) {
        var self = this;
        var ProductFamilyModel = MODEL('productFamily').Schema;
        var _id = id;
        var model;

        _id = _id && _id.length >= 24 ? MODULE('utils').ObjectId(_id) : null;

        ProductFamilyModel.aggregate([{
            $match: { _id: MODULE('utils').ObjectId(_id) }
        }, {
            $unwind: {
                path: '$options',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'ProductAttributes',
                localField: 'options',
                foreignField: '_id',
                as: 'options'
            }
        }, {
            $unwind: {
                path: '$options',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'ProductAttributesValues',
                localField: 'options._id',
                foreignField: 'optionId',
                as: 'optionsValue'
            }
        }, {
            $project: {
                langs: '$langs',
                sequence: 1,
                isCoef: 1,
                isActive: 1,
                isCost: 1,
                opts: {
                    langs: '$options.langs',
                    _id: '$options._id',
                    mode: '$options.mode',
                    values: '$optionsValue'
                }
            }
        }, {
            $group: {
                _id: '$_id',
                opts: { $push: '$opts' },
                langs: { $first: '$langs' },
                sequence: { $first: '$sequence' },
                isCoef: { $first: '$isCoef' },
                isCost: { $first: '$isCost' },
                isActive: { $first: '$isActive' }
            }
        }], function(err, result) {
            if (err)
                return self.throw500(err);

            if (result.length) {
                model = result[0];
                model.opts = _.filter(model.opts, function(elem) {
                    return elem._id != null;
                });
            } else
                model = {};

            self.json(model);
        });
    },
    getAllProductFamily: function() {
        var self = this;
        var query = self.query;
        var paginationObject = MODULE('helper').page(query);
        var skip = paginationObject.skip;
        var limit = paginationObject.limit;
        var ProductFamilyModel = MODEL('productFamily').Schema;
        var sortObj;
        var key;

        var isCost = (self.query.isCost == 'true' ? true : false);

        var lang = 0;

        if (query.sort) {
            key = Object.keys(query.sort)[0];
            req.query.sort[key] = parseInt(query.sort[key], 10);

            sortObj = query.sort;
        } else {
            sortObj = {
                'data.sequence': 1
            };
        }

        ProductFamilyModel.aggregate([{
                $match: { isActive: true, isCost: isCost }
            }, {
                $lookup: {
                    from: 'Product',
                    localField: '_id',
                    foreignField: 'sellFamily',
                    as: 'Products'
                }
            }, {
                $unwind: {
                    path: '$options',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'ProductAttributes',
                    localField: 'options',
                    foreignField: '_id',
                    as: 'productOptions'
                }
            }, {
                $project: {
                    countProducts: { $size: '$Products' },
                    name: '$langs',
                    sequence: 1,
                    createdAt: '$createdAt',
                    opts: { $arrayElemAt: ['$productOptions', 0] }
                }
            }, {
                $unwind: {
                    path: '$name',
                    includeArrayIndex: 'langId'
                }
            }, {
                $match: {
                    langId: lang
                }
            }, {
                $group: {
                    _id: '$_id',
                    options: { $push: '$opts' },
                    name: { $first: '$name.name' },
                    sequence: { $first: '$sequence' },
                    createdAt: { $first: '$createdAt' },
                    countProducts: { $first: '$countProducts' }
                }
            }, {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    root: { $push: '$$ROOT' }
                }
            }, {
                $unwind: '$root'
            }, {
                $project: {
                    _id: 1,
                    total: 1,
                    data: {
                        _id: '$root._id',
                        name: '$root.name',
                        options: '$root.options',
                        sequence: '$root.sequence',
                        countProducts: '$root.countProducts',
                        createdAt: '$root.createdAt'
                    }
                }
            },
            /* {
                            $sort: sortObj
                        },*/
            {
                $sort: { 'data.name': 1 }
            },
            /*{
                       $skip: skip
                   }, {
                       $limit: limit
                   }, */
            {
                $group: {
                    _id: null,
                    total: { $first: '$total' },
                    data: { $push: '$data' }
                }
            }, {
                $project: {
                    _id: 1,
                    total: '$total',
                    data: '$data'
                }
            }
        ]).exec(function(err, result) {
            if (err)
                return self.throw500(err);

            if (result && result.length)
                return self.json(result[0]);

            self.json({});
        });
    },
    createProductFamily: function() {
        var self = this;
        var body = self.body;
        var ProductFamilyModel = MODEL('productFamily').Schema;
        var model;
        var err;

        if (!body.name) {
            err = new Error('Please provide Product Type name');
            err.status = 404;
            self.throw404(err);
        }

        model = new ProductFamilyModel(body);
        model.save(function(err, result) {
            if (err)
                return self.throw500(err);

            self.getProductFamilyById(result._id.toString());
        });
    },
    updateProductFamily: function(id) {
        var self = this;
        var ProductFamilyModel = MODEL('productFamily').Schema;
        var ProductModel = MODEL('product').Schema;
        var body = self.body;
        var _id = id;
        var currentOptions;

        if (!body.options)
            return ProductFamilyModel.findByIdAndUpdate(_id, body, { new: true }, function(err, doc) {
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
                    message: "Configuration enregistree"
                };
                self.json(doc);
            });

        function updateOptionsForProdTypes(modelId, currentOpts, newOpts, ProductFamilyModel, callback) {
            var deletedOptions;
            var addedOptions;
            var addingOption;
            var deletingOptions;

            currentOpts = currentOpts.toStringObjectIds();

            deletedOptions = _.difference(currentOpts, newOpts);
            addedOptions = _.difference(newOpts, currentOpts);

            addingOption = function(pCb) {
                if (!addedOptions.length)
                    return pCb();

                addedOptions = addedOptions.objectID();

                ProductFamilyModel.findByIdAndUpdate(modelId, { $push: { options: { $each: addedOptions } } }, { new: true }, function(err, result) {
                    if (err)
                        return pCb(err);

                    pCb();
                });
            };

            deletingOptions = function(pCb) {
                if (!deletedOptions.length)
                    return pCb();

                let deleteOptions = deletedOptions;
                deletedOptions = deletedOptions.objectID();
                ProductModel.find({ sellFamily: modelId, 'attributes.attribute': { $in: deletedOptions } }, function(err, docs) {
                    if (!docs.length)
                        return;

                    docs.forEach(function(elem) {
                        elem.attributes = _.filter(elem.attributes, function(elem) {
                            if (deleteOptions.indexOf(elem.attribute.toString()) >= 0)
                                return false;

                            return true;
                        });

                        elem.save(function(err, result) {
                            if (err)
                                console.log(err);
                        });
                    });
                });

                ProductFamilyModel.findByIdAndUpdate(modelId, { $pullAll: { options: deletedOptions } }, { new: true }, function(err, result) {
                    if (err)
                        return pCb(err);

                    pCb();
                });
            };

            async.parallel([
                addingOption,
                deletingOptions
            ], function(err) {
                if (err)
                    return callback(err);

                callback();
            });
        }

        ProductFamilyModel.findOne({ _id: _id }, function(err, result) {
            if (err)
                return self.throw500(err);

            currentOptions = result.options;

            updateOptionsForProdTypes(_id, currentOptions, body.options, ProductFamilyModel, function(err) {
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
                //doc = doc.toObject();
                var doc = {};
                doc.successNotify = {
                    title: "Success",
                    message: "Configuration enregistree"
                };
                self.json(doc);
            });
        });
    },
    deleteProductFamily: function(id) {}
};

function Taxes() {}

Taxes.prototype = {
    read: function(id) {
        var self = this;
        var TaxesModel = MODEL('taxes').Schema;
        var _id = id;
        var model;

        _id = _id && _id.length >= 24 ? MODULE('utils').ObjectId(_id) : null;

        TaxesModel.find({}, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json({ data: result });
        });
    }
};

function ProductAttributes() {}

ProductAttributes.prototype = {
    getProductAttributesById: function(id) {
        var self = this;
        var ProductAttributesModel = MODEL('productAttributes').Schema;
        var _id = id;
        var model;

        _id = _id && _id.length >= 24 ? MODULE('utils').ObjectId(_id) : null;

        ProductAttributesModel.aggregate([{
            $match: { _id: MODULE('utils').ObjectId(_id) }
        }, {
            $lookup: {
                from: 'ProductAttributesValues',
                localField: '_id',
                foreignField: 'optionId',
                as: 'opts'
            }
        }], function(err, result) {

            if (err)
                return self.throw500(err);

            if (result.length) {
                model = result[0];
                model.opts = _.filter(model.opts, function(elem) {
                    return elem._id != null;
                });
            } else
                model = {};
            //console.log(model);
            self.json(model);
        });
    },
    getAllProductAttributes: function() {
        var self = this;
        var query = self.query;
        var paginationObject = MODULE('helper').page(query);
        var skip = paginationObject.skip;
        var limit = paginationObject.limit;
        var ProductAttributesModel = MODEL('productAttributes').Schema;
        var sortObj;
        var key;

        var lang = 0;

        if (query.sort) {
            key = Object.keys(query.sort)[0];
            req.query.sort[key] = parseInt(query.sort[key], 10);

            sortObj = query.sort;
        } else {
            sortObj = {
                'data.sequence': 1
            };
        }

        ProductAttributesModel.find({})
            .exec(function(err, result) {
                if (err)
                    return self.throw500(err);

                self.json({ data: result });
            });
    },
    createProductAttributes: function() {
        var self = this;
        var body = self.body;
        var ProductAttributesModel = MODEL('productAttributes').Schema;
        var model;
        var err;

        if (!body.name) {
            err = new Error('Please provide Product Type name');
            err.status = 404;
            self.throw404(err);
        }

        model = new ProductAttributesModel(body);
        model.save(function(err, result) {
            if (err)
                return self.throw500(err);

            self.getProductFamilyById(result._id.toString());
        });
    },
    updateProductAttributes: function(id) {
        var self = this;
        var ProductAttributesModel = MODEL('productAttributes').Schema;
        var ProductAttributesValuesModel = MODEL('productAttibutesValues').Schema;
        var ProductModel = MODEL('product').Schema;
        var body = self.body;
        var _id = id;
        var currentOptions;

        ProductAttributesModel.findByIdAndUpdate(_id, body, { new: true }, function(err, doc) {
            if (err)
                return self.throw500(err);

            if (!body.options)
                return self.json(doc);

            if (self.body.value && self.body.value._id)
                if (self.body.value.remove)
                    return ProductModel.update({ variants: self.body.value._id }, { $pull: { variants: self.body.value._id } }, { multi: true }, function(err, doc) {
                        if (err)
                            return console.log(err);


                        ProductModel.update({ 'attributes.options': self.body.value._id }, { $pull: { 'attributes.$.options': self.body.value._id } }, { multi: true }, function(err, doc) {
                            if (err)
                                return console.log(err);

                            ProductAttributesValuesModel.remove({ _id: self.body.value._id }, function(err, doc) {
                                if (err)
                                    return console.log(err);

                                return self.json(doc);
                            });
                        });
                    });
                else
                    return ProductAttributesValuesModel.findByIdAndUpdate(self.body.value._id, self.body.value, { new: true }, function(err, doc) {
                        if (err)
                            console.log(err);

                        return self.json(doc);
                    });

            if (self.body.value && !self.body.value._id) {
                var attr = new ProductAttributesValuesModel(self.body.value);
                attr.save(function(err, doc) {
                    if (err)
                        console.log(err);

                    return self.json(doc);
                });
            }
        });
    },
    deleteProductAttributes: function(id) {}
};