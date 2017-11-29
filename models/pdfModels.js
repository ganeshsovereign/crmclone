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

let modelPdfSchema = new mongoose.Schema({
		code: {
				type: String,
				unique: true,
				require: true,
				index: true
		}, // Code for unique name generating filename in directory uploads/pdf
		module: {
				type: String,
				require: true
		}, // module name
		name: {
				type: String,
				default: ''
		}, // Used at the end of the filename in html _id + name + .pdf
		latex: String, //latex main file in latex directory
		enabled: {
				type: Boolean,
				default: true
		},
		langs: [LangSchema]
}, {
		collection: 'modelsPdf'
});


modelPdfSchema.plugin(timestamps);

modelPdfSchema.statics.insert = function(models, callback) {
		const self = this;
		const ModulesModel = MODEL('modules').Schema;

		if (!models)
				return callback();

		async.forEach(models, function(elem, eCb) {
				async.waterfall([
						function(wCb) {
								self.findOne({
										code: elem.code
								}, function(err, doc) {
										if (!doc) {
												doc = new self(elem);
												return doc.save(wCb);
										}

										self.findByIdAndUpdate(doc._id, elem, {
												new: true
										}, wCb);
								});
						},
						function(doc, wCb) {
								ModulesModel.update({
										_id: elem.module
								}, {
										$addToSet: {
												pdfModels: doc._id
										}
								}, {
										upsert: false
								}, wCb);
						}
				], eCb);
		}, callback);
};

exports.Schema = mongoose.model('modelspdf', modelPdfSchema);
exports.name = 'modelspdf';