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

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		async = require('async'),
		timestamps = require('mongoose-timestamp');

const LangSchema = new Schema({
		_id: false,
		description: {
				type: String,
				default: ''
		}
});

let moduleSchema = new mongoose.Schema({
		_id: String,
		enabled: {
				type: Boolean,
				default: true
		},
		version: Number,
		langs: [LangSchema],
		rights: [],
		menus: {},
		optionalTemplates: [String], //Template angular for optional key in module/fiche.html
		pdfModels: [{
				type: Schema.Types.ObjectId,
				ref: 'modelspdf'
		}]
}, {
		collection: 'modules'
});

moduleSchema.statics.insert = function(module, callback) {
		const self = this;
		const ModelPDFModel = MODEL('modelspdf').Schema;

		self.findById(module.name, function(err, doc) {
				if (!doc)
						doc = new self({
								_id: module.name,
						});

				if (doc.version >= module.version)
						return callback();

				doc.version = module.version;
				doc.langs = [{
						description: module.description
				}];
				doc.rights = module.rights;
				doc.menus = module.menus;

				async.waterfall([
						function(wCb) {
								doc.save(function(err, elem) {
										wCb(err);
								});
						},
						function(wCb) {
								ModelPDFModel.insert(module.pdfModels, wCb)
						}
				], callback);
		});
};

moduleSchema.plugin(timestamps);

exports.Schema = mongoose.model('modules', moduleSchema);
exports.name = 'modules';