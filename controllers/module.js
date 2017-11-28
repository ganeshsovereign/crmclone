"use strict";

const _ = require("lodash"),
		async = require('async');

exports.install = function() {
		var object = new Object();

		F.route('/erp/api/module', object.getByViewType, ['authorize']);
		F.route('/erp/api/module/{id}', object.show, ['authorize']);
		F.route('/erp/api/module/{id}', object.update, ['put', 'json', 'authorize']);
};

function Object() {}

Object.prototype = {
		getByViewType: function() {
				var self = this;
				const DictModel = MODEL('dict').Schema;

				var data = self.query;
				var accessRollSearcher;
				var contentSearcher;
				var waterfallTasks;
				var contentType = data.contentType;

				var filterObject = {
						_id: 'const',
				};
				accessRollSearcher = function(cb) {
						const accessRoll = MODULE('helper').accessRoll;

						accessRoll(self.user, DictModel, cb);
				};

				contentSearcher = function(ids, cb) {
						DictModel.aggregate([{
										$match: filterObject
								},
								{
										$project: {
												values: 1
										}
								}
						], cb);
				};

				waterfallTasks = [accessRollSearcher, contentSearcher];

				async.waterfall(waterfallTasks, function(err, result) {
						var response = {};

						if (err)
								return self.throw500(err);

						response.data = result[0];
						console.log(response);
						self.json(response);
				});
		},
		show: function(id) {
				var self = this;
				const DictModel = MODEL('dict').Schema;

				DictModel.findOne({
						_id: id
				}, function(err, doc) {
						if (err || !doc)
								return self.throw500(err);

						self.json(doc);
				});
		},
		update: function(id) {
				var self = this;
				const DictModel = MODEL('dict').Schema;

				DictModel.findByIdAndUpdate(id, self.body, function(err, doc) {
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
								message: "Préférence enregistrée"
						};
						self.json(doc);
				});
		}
};