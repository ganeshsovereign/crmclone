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

var async = require('async'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    i18n = require("i18next"),
    _ = require('lodash');

var menus = {};
var rights = [];

exports.install = function() {

    console.log("ToManage modules install...");

    F.global.filters = {};

    //F.once('i18n', function() {
    fs.readdirSync(__dirname + '/../modules').forEach(function(file) {
        if (file === "index.js")
            return;
        if (!file.endsWith('.mod.js'))
            return;

        var data = require(__dirname + '/../modules/' + file);

        if (!data.enabled)
            return;

        /* Load rights */
        let right = {};
        right[data.name] = data.rights;
        rights.push({
            name: data.name,
            desc: data.description,
            rights: right
        });

        /* Load Menu : 3 levels MAX */
        for (var i in data.menus) {
            if (data.menus[i].enabled == false)
                continue;
            if (data.menus[i].title)
                data.menus[i].title = i18n.t(data.menus[i].title);
            if (data.menus[i].submenus) {
                for (var j in data.menus[i].submenus) {
                    if (data.menus[i].submenus[j].enabled == false)
                        continue;
                    if (data.menus[i].submenus[j].title)
                        data.menus[i].submenus[j].title = i18n.t(data.menus[i].submenus[j].title);
                    if (data.menus[i].submenus[j].submenus) {
                        for (var k in data.menus[i].submenus[j].submenus) {
                            if (data.menus[i].submenus[j].submenus[k].enabled == false)
                                continue;
                            if (data.menus[i].submenus[j].submenus[k].title)
                                data.menus[i].submenus[j].submenus[k].title = i18n.t(data.menus[i].submenus[j].submenus[k].title);
                        }
                    }
                }
            }
        }

        menus = _.defaults(menus, data.menus);

        F.global.filters = _.extend(F.global.filters, data.filters);

        for (var i in data.menus) {
            // Convert for old menu speedealing
            if (menus[i].url && menus[i].url[0] === "#") {
                menus[i].url = "/" + menus[i].url;
                menus[i].target = "_self";
            }

            if (data.menus[i].submenus) {
                menus[i] = _.defaults(menus[i], data.menus[i]);
                menus[i].submenus = _.defaults(menus[i].submenus, data.menus[i].submenus);

                for (var j in data.menus[i].submenus) {
                    // Convert for old menu speedealing
                    if (menus[i].submenus[j].url && menus[i].submenus[j].url[0] === "#") {
                        menus[i].submenus[j].url = "/" + menus[i].submenus[j].url;
                        menus[i].submenus[j].target = "_self";
                    }

                    if (data.menus[i].submenus[j].submenus) {
                        menus[i].submenus[j] = _.defaults(menus[i].submenus[j], data.menus[i].submenus[j]);
                        menus[i].submenus[j].submenus = _.defaults(menus[i].submenus[j].submenus, data.menus[i].submenus[j].submenus);

                    }
                }
            }
        }

        //console.dir(menus);
    });

    //});

    F.route('/erp/api/menus', menu, ['authorize']);
    F.route('/erp/api/rights', right, ['authorize']);
};

function right() {
    this.json(rights);
}

function menu() {
    var result = {};
    var self = this;

    //console.dir(menus);

    function checkright(perms) {
        if (!self.user.admin) {
            if (!_.isNull(perms) && !_.isUndefined(perms)) {
                // For single right
                // "perms": "admin"
                if (_.isString(perms)) {
                    if (!checkUserRights(perms))
                        return false;
                    // For several rights
                    // case #1: "perms":["admin","entity.read"] corresponding to: if (admin && entity.read)
                    // case #2: "perms":[["admin","entity.read"],["foo.read"]] corresponding to: if ((admin && entity.read) || foo.read)
                } else if (_.isArray(perms)) {

                    var returnRight = true;
                    //console.log(perms);

                    _.forEach(perms, function(values) {
                        if (_.isArray(values)) {
                            //console.log(values);
                            _.forEach(values, function(value) {
                                //console.log('checkUserRightsLoop');
                                //console.log('checkUserRights=' + value);
                                if (!checkUserRights(value)) {
                                    //console.log('check_false=' + value);
                                    returnRight = false; // AND operator : break if only once is false
                                    return false; // break this loop
                                } else {
                                    //console.log('check_true=' + value);
                                    returnRight = true; // AND operator : continue if true
                                }
                            });

                            if (returnRight === true) {
                                //console.log('break the first loop');
                                return false; // AND / OR operators : break all if block is true
                            }

                        } else {
                            if (!checkUserRights(values)) {
                                //console.log('checkUserRights');
                                returnRight = false; // AND operator : break if only once is false
                                return false;
                            }
                        }
                    });

                    //console.log("returnRight=" + returnRight);
                    return returnRight;

                } else
                    return false;
            } else
                return false;
        }
        return true;
    }

    function checkUserRights(perms) {
        var perm = perms.split(".");
        //console.log(perm);

        if (perm[0] === "admin" || perm[0] === "superadmin") // only superadmin and administrators
            return false;

        if (perm.length == 2) {
            if (!self.user.rights[perm[0]] || !self.user.rights[perm[0]][perm[1]])
                return false;
        }

        return true;
    }

    for (var i in menus) {
        // Check right
        var level0 = false;

        if (checkright(menus[i].perms))
            level0 = true;

        result[i] = _.clone(menus[i], true);

        for (var j in menus[i].submenus) {
            var level1 = false;

            if (checkright(menus[i].submenus[j].perms)) {
                level0 = true;
                level1 = true;
            }

            for (var k in menus[i].submenus[j].submenus) {
                if (checkright(menus[i].submenus[j].submenus[k].perms)) {
                    level0 = true;
                    level1 = true;
                } else
                    delete result[i].submenus[j].submenus[k];
            }

            if (!level1)
                delete result[i].submenus[j];

        }

        if (!level0)
            delete result[i];
    }
    self.json(result);
}