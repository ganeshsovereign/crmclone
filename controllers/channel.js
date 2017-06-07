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