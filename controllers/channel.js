


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