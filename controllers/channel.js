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
    _ = require('lodash'),
    fs = require('fs');

exports.install = function() {

    var object = new Object();

    //F.route('/erp/api/channel/{Type}/{Id}', object.getChannelListFromId, ['authorize']);
    F.route('/erp/api/channel/{Type}', object.addChannelFromType, ['post', 'authorize']);
};

function Object() {};

Object.prototype = {
    addChannelFromType: function(Type) {
        var self = this;
        var ChannelLinkModel = MODEL('channelLinks').Schema;

        ChannelLinkModel.findOne(self.body, function(err, doc) {
            if (err)
                return self.throw500(err);

            if (doc)
                self.json(doc);

            doc = new ChannelLinkModel(self.body);
            doc.save(function(err, doc) {
                if (err) {
                    console.log(err);

                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err.message || err
                        }
                    });
                }

                doc = doc.toObject();
                doc.successNotify = {
                    title: "Success",
                    message: "Produit ajoute au canal"
                };

                self.json(doc);
            });
        });
    }
};