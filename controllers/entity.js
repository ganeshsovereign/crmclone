"use strict";

var _ = require("lodash");

exports.install = function() {

    var entity = new Entity();
    F.route('/erp/api/entity/select', entity.select, ['authorize']);
    F.route('/erp/api/entity/{id}', entity.show, ['authorize']);
};

function Entity() {}

Entity.prototype = {
    show: function(id) {
        var self = this;
        var EntityModel = MODEL('entity').Schema;

        EntityModel.findOne({ _id: id }, function(err, entity) {
            if (err || !entity)
                return self.throw500(err);

            self.json(entity);
        });
    },
    create: function() {

    },
    update: function() {

    },
    del: function() {

    },
    select: function() {
        var self = this;
        var EntityModel = MODEL('entity').Schema;
        var result = [];

        EntityModel.find(function(err, docs) {
            for (var i = 0, len = docs.length; i < len; i++) {
                if ((!self.user.multiEntities && docs[i]._id == self.user.entity) // Only once entity
                    ||
                    self.user.multiEntities === true // superadmin
                    ||
                    (_.isArray(self.user.multiEntities) && _.contains(self.user.multiEntities, docs[i]._id))) { // Entities assigned
                    var entity = {};
                    entity.id = docs[i]._id;
                    entity.name = docs[i].name;
                    entity.url = docs[i].url;
                    entity.eshop = docs[i].eshop;
                    result.push(entity);
                }
            }

            self.json(result);
        });
    }
};