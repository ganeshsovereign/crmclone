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
    moment = require("moment"),
    async = require('async');

var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var object = new Object();

    /**
     *@api {get} /category/ Request ProductCategories
     *
     * @apiVersion 0.0.1
     * @apiName getProductCategories
     * @apiGroup Product Categories
     *
     * @apiSuccess {Object} ProductCategories
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
      "data": [
        {
          "_id": "564591f9624e48551dfe3b23",
          "__v": 0,
          "sequence": 0,
          "nestingLevel": null,
          "editedBy": {
            "date": "2016-07-15T12:33:53.024Z",
            "user": "52203e707d4dba8813000003"
          },
          "createdBy": {
            "date": "2015-11-13T07:32:09.792Z",
            "user": "52203e707d4dba8813000003"
          },
          "users": [

          ],
          "parent": null,
          "fullName": "All",
          "name": "All"
        },
         ...
      ]
}
     */
    F.route('/erp/api/category', object.read, ['authorize']);
    // list for autocomplete
    /*F.route('/erp/api/category/autocomplete', function () {
     var self = this;
     var ProductModel = MODEL('product').Schema;
     
     //console.dir(self.body);
     
     if (self.body.filter == null)
     return self.json({});
     var query = {
     "$or": [{
     ref: new RegExp(self.body.filter.filters[0].value, "i")
     }, {
     label: new RegExp(self.body.filter.filters[0].value, "gi")
     }]
     };
     
     
     ProductModel.find(query, "ref _id label dynForm tva_tx minPrice units description caFamily prices", {
     limit: 50, sort: {ref: 1}
     }, function (err, docs) {
     if (err) {
     console.log("err : /api/product/autocomplete");
     console.log(err);
     return;
     }
     
     //console.log(docs);
     
     var refs = _.map(docs, '_id');
     
     var result = [];
     for (var i = 0, len = docs.length; i < len; i++) {
     var obj = {
     _id: docs[i]._id,
     id: docs[i]._id,
     pu_ht: docs[i].prices.pu_ht,
     price_level: 'BASE',
     prices: docs[i].prices,
     discount: 0,
     qtyMin: 0,
     ref: docs[i].ref,
     product: {
     id: docs[i],
     name: docs[i].ref,
     unit: docs[i]._units.name,
     dynForm: docs[i].dynForm,
     caFamily: docs[i].caFamily
     }
     };
     result.push(obj);
     }
     
     //console.log(result);
     
     if (self.body.price_level && self.body.price_level !== 'BASE')
     return pricelevel.find(refs, self.body.price_level, function (prices) {
     //self.json(prices);
     //console.log(prices);
     
     var mergedList = _.map(result, function (item) {
     //console.log(item._id);
     return _.extend(item, _.findWhere(prices, {_id: item._id}));
     });
     
     //console.log(mergedList);
     
     return self.json(mergedList);
     });
     
     return self.json(result);
     });
     }, ['post', 'json', 'authorize']);*/


    /**
         *@api {get} /category/getExpenses/ Request Expenses
         *
         * @apiVersion 0.0.1
         * @apiName getExpenses
         * @apiGroup Product Categories
         *
         * @apiSuccess {Object} Expenses
         * @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    [
         {
             "_id": "5645925f624e48551dfe3b26",
             "__v": 0,
             "sequence": 4,
             "nestingLevel": 1,
             "editedBy": {
                 "date": "2016-07-15T12:44:29.554Z",
                 "user": "52203e707d4dba8813000003"
             },
             "createdBy": {
                 "date": "2015-11-13T07:33:51.900Z",
                 "user": "52203e707d4dba8813000003"
             },
             "users": [],
             "parent": {
                 "_id": "56459202624e48551dfe3b24",
                 "__v": 0,
                 "sequence": 0,
                 "nestingLevel": null,
                 "editedBy": {
                     "date": "2016-07-15T12:44:29.553Z",
                     "user": "52203e707d4dba8813000003"
                 },
                 "createdBy": {
                     "date": "2015-11-13T07:32:18.495Z",
                     "user": "52203e707d4dba8813000003"
                 },
                 "users": [],
                 "parent": "564591f9624e48551dfe3b23",
                 "fullName": "All / Expenses",
                 "name": "Expenses"
             },
             "fullName": "All / Expenses / Bonus Card",
             "name": "Bonus Card"
         },
         ...
    ]
         */
    F.route('/erp/api/category/getExpenses', object.getById, ['authorize']);



    F.route('/erp/api/category/group/select', object.getGroupCategory, ['authorize']);
    /**
         *@api {post} /category/ Request for creating new ProductCategory
         *
         * @apiVersion 0.0.1
         * @apiName createProductCategory
         * @apiGroup Product Categories
         *
         * @apiParamExample {json} Request-Example:
    {
        "name": "Test Department",
        "parent": "564591f9624e48551dfe3b23",
        "nestingLevel": null,
        "sequence": 0,
        "fullName": "All / Test Department"
    }
         *
         * @apiSuccess {Object} NewProductCategory
         * @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
          "__v": 0,
          "_id": "5788dc525e61536b10965959",
          "sequence": 0,
          "nestingLevel": null,
          "editedBy": {
            "date": "2016-07-15T12:51:30.980Z",
            "user": "52203e707d4dba8813000003"
          },
          "createdBy": {
            "date": "2016-07-15T12:51:30.980Z",
            "user": "52203e707d4dba8813000003"
          },
          "users": [

          ],
          "parent": "564591f9624e48551dfe3b23",
          "fullName": "All / Test Department",
          "name": "Test Department"
    }
         */
    F.route('/erp/api/category', object.create, ['post', 'json', 'authorize']);
    /**
     *@api {delete} /category/:id Request for deleting ProductCategory
     *
     * @apiVersion 0.0.1
     * @apiName deleteProductCategory
     * @apiGroup Product Categories
     *
     * @apiParam {String} id Unique id of ProductCategory
     *
     * @apiSuccess {Object} Status
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "success":"Category was removed"
}
     */
    F.route('/erp/api/category/{id}', object.remove, ['delete', 'authorize']);
    /**
     *@api {get} /category/:id Request ProductCategory
     *
     * @apiVersion 0.0.1
     * @apiName getProductCategory
     * @apiGroup Product Categories
     *
     * @apiParam {String} id Unique id of ProductCategory
     *
     * @apiSuccess {Object} ProductCategory
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
      "_id": "5645925f624e48551dfe3b26",
      "__v": 0,
      "sequence": 4,
      "nestingLevel": 1,
      "editedBy": {
        "date": "2016-07-15T12:34:44.553Z",
        "user": "52203e707d4dba8813000003"
      },
      "createdBy": {
        "date": "2015-11-13T07:33:51.900Z",
        "user": "52203e707d4dba8813000003"
      },
      "users": [

      ],
      "parent": {
        "_id": "56459202624e48551dfe3b24",
        "__v": 0,
        "sequence": 0,
        "nestingLevel": null,
        "editedBy": {
          "date": "2016-07-15T12:34:44.548Z",
          "user": "52203e707d4dba8813000003"
        },
        "createdBy": {
          "date": "2015-11-13T07:32:18.495Z",
          "user": "52203e707d4dba8813000003"
        },
        "users": [

        ],
        "parent": "564591f9624e48551dfe3b23",
        "fullName": "All / Expenses",
        "name": "Expenses"
      },
      "fullName": "All / Expenses / Bonus Card",
      "name": "Bonus Card"
}*/
    F.route('/erp/api/category/{id}', object.getById, ['authorize']);
    /**
     *@api {put} /category/:id Request for updating ProductCategory
     *
     * @apiVersion 0.0.1
     * @apiName updateProductCategory
     * @apiGroup Product Categories
     *
     * @apiParam {String} id Unique id of ProductCategory
     * @apiParamExample {json} Request-Example:
{
      "validate": false,
      "_id": "5788dc525e61536b10965959",
      "__v": 0,
      "sequence": 0,
      "nestingLevel": 2,
      "editedBy": {
        "date": "2016-07-15T12:51:30.980Z",
        "user": "52203e707d4dba8813000003"
      },
      "createdBy": {
        "date": "2016-07-15T12:51:30.980Z",
        "user": "52203e707d4dba8813000003"
      },
      "users": [

      ],
      "parent": "5645925f624e48551dfe3b26",
      "fullName": "All / Test Department / Test Department",
      "name": "Test Department"
}
     *
     * @apiSuccess {Object} Status
     * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "success":"Category updated success"
}
     */
    F.route('/erp/api/category/{id}', object.update, ['put', 'json', 'authorize'], 512);
    //other routes..
};

function Object() {}

Object.prototype = {
    /*create: function() {
        var self = this;
        var CategoryModel = MODEL('category').Schema;

        var category = new CategoryModel(self.body);

        category.save(function(err, doc) {
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
                message: "Categorie enregistree"
            };
            self.json(doc);
        });
    },*/
    read: function() {
        var self = this;
        var CategoryModel = MODEL('productCategory').Schema;
        var ProductModel = MODEL('product').Schema;
        var query = {
            isremoved: {
                $ne: true
            }
        };

        async.parallel({
            categoriesCount: function(cb) {
                ProductModel.aggregate([{
                        $match: {
                            "info.categories": {
                                $ne: null
                            }
                        }
                    },
                    {
                        $project: {
                            categories: '$info.categories'
                        }
                    }, {
                        $unwind: {
                            path: '$categories',
                            preserveNullAndEmptyArrays: true
                        }
                    }, {
                        $group: {
                            _id: '$categories',
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ], cb);
            },
            categories: function(cb) {
                CategoryModel.find(query)
                    .lean()
                    .sort({
                        idx: 1
                    })
                    .exec(cb);
            }
        }, function(err, results) {

            if (err)
                return self.throw500(err);

            //MODULE('utils').mergeByObjectId(results.data, results.qty, "_id");
            results.categories = results.categories.map(function(el) {
                var count = _.find(results.categoriesCount, function(catCount) {
                    return catCount && catCount._id ? catCount._id.toString() === el._id.toString() : null;
                });

                el.productsCount = count ? count.count : 0;

                return el;
            });

            //console.log(results.data);
            var result = _.filter(results.categories, function(item) {
                var parentName = item.parent;
                item.nodes = this(item._id.toString());
                return !(parentName && this(parentName).push(item));
            }, _.memoize(function() {
                return [];
            }));

            self.json(result);

        });
    },
    /*update: function(id) {
        var self = this;
        var CategoryModel = MODEL('category').Schema;

        //console.log(this.body, id);
        //console.log(this.query);
        //console.log(this.body);
        //if (this.query && this.query.update)
        //    return CategoryModel.update({_id: id}, {$set: self.body}, function (err, result) {
        //        self.json(result);
        //    });

        async.waterfall([
            function(cb) {
                Category(id, function(err, category) {
                    if (err)
                        return cb(err);

                    category = _.extend(category, self.body);

                    cb(err, category);
                });
            }
        ], function(err, category) {

            if (err) {
                console.log(err);
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });
            }

            category.save(function(err, doc) {
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
                    message: "Category enregistree"
                };
                self.json(doc);
            });
        });

    },*/

    getExpenses: function() {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;

        var parentId = MAINCONSTANTS.EXPENSESCAREGORY;

        ProductCategory
            .find({
                parent: objectId(parentId)
            })
            .sort({
                fullName: 1,
                nestingLevel: 1,
                sequence: 1
            })
            .populate('parent')
            .exec(function(err, categories) {
                if (err)
                    return self.throw500(err);

                self.json(categories);
            });

    },
    getById: function(id) {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;

        if (id && id.length < 24)
            return self.throw400();

        ProductCategory
            .findById(id)
            .populate('parent')
            .populate('debitAccount', 'name')
            .populate('creditAccount', 'name')
            .populate('taxesAccount', 'name')
            .populate('bankExpensesAccount', 'name')
            .populate('otherIncome', 'name')
            .populate('otherLoss', 'name')
            .exec(function(err, category) {
                if (err)
                    return self.throw500(err);
                //console.log(category);
                self.json(category);
            });
    },
    /*  getForDd: function() {
          var self = this;
          var Product = MODEL('product').Schema;
          var ProductCategory = MODEL('productCategory').Schema;

          Product.aggregate([{
              $project: {
                  categories: '$info.categories'
              }
          }, {
              $unwind: {
                  path: '$categories',
                  preserveNullAndEmptyArrays: true
              }
          }, {
              $group: {
                  _id: '$categories',
                  count: { $sum: 1 }
              }
          }], function(err, categoriesCount) {
              if (err)
                  return self.throw500(err);

              ProductCategory
                  .find()
                  .sort({
                      nestingLevel: 1,
                      sequence: 1
                  })
                  .populate('parent')
                  .lean()
                  .exec(function(err, categories) {
                      if (err)
                          return self.throw500(err);

                      categories = categories.map(function(el) {
                          var count = _.find(categoriesCount, function(catCount) {
                              return catCount && catCount._id ? catCount._id.toString() === el._id.toString() : null;
                          });

                          el.productsCount = count ? count.count : 0;

                          return el;
                      });
                      console.log(categories);
                      self.json(categories);
                  });
          });

      },*/
    getProsterityForAncestor: function(id) {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;

        ProductCategory
            .find({
                ancestors: {
                    $elemMatch: {
                        $eq: id
                    }
                }
            }, {
                _id: 1
            }, function(err, result) {
                var ids = [];

                if (err)
                    return self.throw500(err);


                if (result && result.length)
                    ids = _.pluck(result, '_id');

                ids.push(id);

                self.json(ids);
            });
    },
    create: function() {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;
        var body = self.body;
        var parentId = body.parent;
        var category;

        if (!_.keys(body).length)
            return self.throw500();

        body.createdBy = self.user._id;
        body.editedBy = self.user._id;
        console.log(body);
        category = new ProductCategory(body);


        category.save(function(err, category) {
            var newModelId;
            if (err)
                return self.throw500(err);

            newModelId = category._id;

            ProductCategory.updateFullName(newModelId, function() {

                //if (!body.parent)
                //    return self.json(category);


                if (err)
                    return self.throw500(err);

                self.json(category);
            });
        });
    },
    update: function(id) {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;
        var data = self.body;
        var _id = id;
        var parentId;
        var newParentId = data.parent;

        //console.log(data);

        ProductCategory.findOneAndUpdate({
            _id: _id
        }, data, function(err, result) {
            if (err || !result)
                return self.throw500(err);

            parentId = result.parent;

            if (!result)
                return self.throw404();

            if (!self.query.isChangedLevel && !data.langs[0] && !data.langs[0].url == result.langs[0].url)
                return self.json({
                    success: 'Category updated success'
                });

            async.waterfall([
                function(cb) {
                    ProductCategory.updateParentsCategory(_id, parentId, null, cb);
                },
                function(cb) {
                    ProductCategory.updateFullName(_id, cb);
                }
            ], function(err) {
                if (err) {
                    console.log(err);
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });
                }

                F.emit('product:updateCategory', {
                    userId: self.user._id.toString(),
                    productCategory: {
                        _id: id.toString()
                    }
                });

                //console.log(doc);
                var doc = {};
                doc.successNotify = {
                    title: "Success",
                    message: "Category updated success"
                };
                self.json(doc);
            });
        });
    },
    remove: function(id) {
        var self = this;
        var ProductCategory = MODEL('productCategory').Schema;
        var _id = id;
        var parentId;

        ProductCategory.findByIdAndUpdate(id, {
            isremoved: true
        }, {
            new: true
        }, function(err, result) {
            if (err)
                return self.throw500(err);

            parentId = result.parent;

            ProductCategory.updateParentsCategory(_id, parentId, 'remove', function() {
                if (err)
                    return self.throw500(err);

                self.json(result);
            });

        });
    },
    getGroupCategory: function() {
        var self = this;
        var GroupCategory = MODEL('groupCategory').Schema;

        GroupCategory.find({}, function(err, docs) {
            if (err)
                return self.throw500(err);

            self.json({
                data: docs
            });
        });
    }
};