"use strict";

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    async = require('async');


var Dict = INCLUDE('dict');

var round = MODULE('utils').round;

exports.install = function() {

    var logistic = new Logistic();

    F.route('/erp/api/logisticMethod', logistic.getAll, ['authorize']);
    F.route('/erp/api/logisticMethod/select', logistic.getForDd, ['authorize']);

    F.route('/erp/api/logisticMethod', logistic.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/logisticMethod/{id}', logistic.update, ['put', 'json', 'authorize']);
    F.route('/erp/api/logisticMethod/{id}', logistic.remove, ['delete', 'authorize']);

};

function Logistic() {}

Logistic.prototype = {
    read: function() {
        var self = this;
        var BankModel = MODEL('bank').Schema;

        //console.log(self.query.entity);

        var balances = [];

        var query = {};

        //if(self.query.entity)
        //    query.entity = self.query.entity;

        BankModel.find(query, "", { sort: { journalId: 1 } }, function(err, doc) {
            if (err)
                return self.throw500(err);

            //console.log(doc);
            self.json(doc);
        });

    },

    create: function() {
        var self = this;
        var body = self.body;
        var LogisticMethodModel = MODEL('logisticMethod').Schema;

        var logistic = new LogisticMethodModel(body);

        logistic.save(function(err, result) {
            if (err)
                return self.throw500(err);


            self.json(result);
        });

    },

    getAll: function() {
        var LogisticMethodModel = MODEL('logisticMethod').Schema;
        var self = this;

        LogisticMethodModel.find({}).populate('account', 'name').exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },

    getForDd: function() {
        var LogisticMethodModel = MODEL('logisticMethod').Schema;
        var self = this;
        var options = {
            _id: 1,
            name: 1,
            seq: 1
        };
        LogisticMethodModel.find({}, options).populate('account', 'name').exec(function(err, result) {
            if (err)
                return self.throw500(err);

            self.json({ data: result });
        });
    },

    update: function(id) {
        var LogisticMethodModel = MODEL('logisticMethod').Schema;
        var self = this;
        var body = self.body || {};

        LogisticMethodModel.findByIdAndUpdate(id, body, { new: true }, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    },

    remove: function(id) {
        var LogisticMethodModel = MODEL('logisticMethod').Schema;
        var self = this;

        LogisticMethodModel.findByIdAndUpdate(id, { isremoved: true }, { new: true }, function(err, result) {
            if (err)
                return self.throw500(err);

            self.json(result);
        });
    }
};