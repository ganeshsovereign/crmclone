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


    F.route('/erp/api/accountsCategories/getAll', object.getAll, ['authorize']);
    F.route('/erp/api/accountsCategories/{id}', object.get, ['authorize']);
    F.route('/erp/api/accountsCategories/{id}', object.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/accountsCategories', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/accountsCategories/{id}', object.remove, ['delete', 'authorize']);
};

function Object() {}

Object.prototype = {
    /*function updateParentsCategory(req, newCategoryId, parentId, modifier, callback) {
        var AccountsCategory = models.get(req.session.lastDb, 'accountsCategory', CategorySchema);
        var id;
        var updateCriterior;

        if (modifier === 'add') {
            updateCriterior = { $addToSet: { child: newCategoryId } };
        } else {
            updateCriterior = { $pull: { child: newCategoryId } };
        }

        AccountsCategory.findOneAndUpdate({ _id: parentId }, updateCriterior, function(err, result) {
            if (err) {
                return callback(err);
            }

            if (!result || !result.parent) {
                return callback(null);
            }

            id = result.parent;
            updateParentsCategory(req, newCategoryId, id, modifier, callback);
        });
    }*/

    get: function(id) {
        var self = this;
        var AccountsCategory = MODEL('accountsCategory').Schema;

        AccountsCategory
            .findOne({
                _id: id
            })
            .populate('parent', 'name')
            .sort({
                'nestingLevel': 1
            })
            .exec(function(err, result) {
                if (err)
                    return self.throw500(err);

                self.json(result);
            });
    },

    getAll: function() {
        var self = this;
        var AccountsCategory = MODEL('accountsCategory').Schema;

        AccountsCategory
            .find()
            .populate('parent', 'name')
            .sort({
                'nestingLevel': 1
            })
            .exec(function(err, result) {
                if (err)
                    return self.throw500(err);

                self.json({
                    data: result
                });
            });
    },

    create: function() {
        var self = this;
        var AccountsCategory = MODEL('accountsCategory').Schema;
        var body = self.body;
        var parentId = body.parent;
        var category;

        if (!Object.keys(body).length) {
            return self.throw400();
        }

        body.createdBy = self.user._id;

        body.editedBy = self.user._id;

        category = new AccountsCategory(body);

        category.save(function(err, category) {
            var newModelId;
            if (err)
                return self.throw500(err);

            newModelId = category._id;

            /*updateParentsCategory(req, newModelId, parentId, 'add', function() {
                if (err) {
                    return next(err);
                }

                AccountsCategory.findById(newModelId).populate('parent', 'name').exec(function(err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(200).send(result);
                });
            });*/
            self.json(result);
        });
    },

    /*function updateNestingLevel(req, id, nestingLevel, callback) {
        var AccountsCategory = models.get(req.session.lastDb, 'accountsCategory', CategorySchema);

        AccountsCategory.find({ parent: id }).exec(function(err, result) {
            var n = 0;
            if (result.length !== 0) {
                result.forEach(function(item) {
                    n++;

                    AccountsCategory.findByIdAndUpdate(item._id, { nestingLevel: nestingLevel + 1 }, { new: true }, function(err, res) {
                        if (result.length === n) {
                            updateNestingLevel(req, res._id, res.nestingLevel + 1, function() {
                                if (callback) {
                                    callback();
                                }
                            });
                        } else {
                            updateNestingLevel(req, res._id, res.nestingLevel + 1);
                        }
                    });
                });
            } else {
                if (callback) {
                    callback();
                }
            }
        });
    }*/

    /*function updateFullName(id, Model, cb) {
        var fullName;
        var parrentFullName;

        Model
            .findById(id)
            .populate('parent')
            .exec(function(err, category) {

                if (!category) {
                    return cb();
                }

                parrentFullName = category && category.parent ? category.parent.fullName : null;

                if (parrentFullName) {
                    fullName = parrentFullName + ' / ' + category.name;
                } else {
                    fullName = category.name;
                }

                if (!err) {
                    Model.findByIdAndUpdate(id, { $set: { fullName: fullName } }, { new: true }, function(err, result) {
                        if (err) {
                            return cb(err);
                        }

                        async.each(category.child, function(el, callback) {
                            updateFullName(el, Model, callback);
                        }, function(err, result) {
                            if (err) {
                                return cb(err);
                            }

                            cb();
                        });
                    });
                }
            });
    }*/

    update: function(id) {
        var self = this;
        var AccountsCategory = MODEL('accountsCategory').Schema;
        var data = self.body;
        var _id = id;
        var parentId;
        var newParentId = data.parent;

        delete data.createdBy;

        AccountsCategory.findOneAndUpdate({
            _id: _id
        }, data, function(err, result) {
            if (err)
                return self.throw500(err);

            parentId = result.parent;

            if (!data.isAllUpdate) {
                AccountsCategory.findById(_id).populate('parent', 'name').exec(function(err, result) {
                    if (err)
                        return self.throw500(err);

                    self.json(result);
                });
                return;
            }

            async.waterfall([
                function(cb) {
                    updateParentsCategory(req, _id, parentId, 'remove', cb);
                },

                function(cb) {
                    updateParentsCategory(req, _id, newParentId, 'add', cb);
                },

                function(cb) {
                    updateFullName(_id, AccountsCategory, cb);
                },
                function(cb) {
                    if (data.isAllUpdate) {
                        updateNestingLevel(req, _id, data.nestingLevel, cb);
                    } else {
                        cb();
                    }
                }
            ], function(err) {
                if (err)
                    return self.throw500(err);

                AccountsCategory.findById(_id).populate('parent', 'name').exec(function(err, result) {
                    if (err)
                        return self.throw500(err);

                    self.json(result);
                });
            });
        });

    },

    remove: function(id) {
        var self = this;
        var AccountsCategory = MODEL('accountsCategory').Schema;
        var _id = id;
        var parentId;

        AccountsCategory.findById(_id, {
            productsCount: 1
        }, function(err, result) {
            if (err)
                return self.throw500(err);

            if (!result.productsCount) {
                AccountsCategory.findOneAndRemove({
                    _id: _id
                }, function(err, result) {
                    if (err)
                        return self.throw500(err);

                    parentId = result.parent;

                    updateParentsCategory(req, _id, parentId, 'remove', function() {
                        if (err)
                            return self.throw500(err);

                        self.json({
                            data: result
                        });
                    });

                });
            } else
                self.throw400({
                    error: "You can't delete this Category until it has Charts of Account"
                });

        });
    }
};