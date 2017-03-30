"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

/**
 * Report Schema
 */

var ReportSchema = new Schema({
    model: String,
    dateReport: Date,
    societe: {
        id: Schema.Types.ObjectId,
        name: String
    },
    duration: Number,
    durationAppointment: Number,
    contacts: [{
            id: Schema.Types.ObjectId,
            name: String,
            poste: String
        }],
    products: [String],
    realised: {type: Boolean, default: false},
    dueDate: Date,
    //actions: [{
    //		type: {type: String},
    //		method: String
    //	}],
    optional: Schema.Types.Mixed,
    comment: String,
    proposal_ht: Number,
    leadStatus: String,
    author: {
        id: String,
        name: String
    },
    lead: {
        id: {type: Schema.Types.ObjectId, ref: "lead"},
        name: String
    },
    entity: String
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

ReportSchema.plugin(timestamps);
/*ReportSchema.virtual('RealisedStatus').get(function () {
 
 var realisedStat = {};
 
 if (this.actions.length > 0) {
 if (this.realised)
 realisedStat = {id: 'Réalisé', css: 'green-gradient'};
 else
 realisedStat = {id: 'Non Réalisé', css: 'red-gradient'};
 } else {
 realisedStat = {id: 'Aucun', css: 'grey-gradient'};
 }
 
 return realisedStat;
 });*/

var extrafields = {};
Dict.extrafield({extrafieldName: 'Report'}, function (err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    if (doc)
        extrafields = doc.fields;
    else
        console.log('Dict is not loaded');
});

ReportSchema.virtual('_model')
        .get(function () {
            var res = {};

            var model = this.model;

            if (model && extrafields.model.values[model] && extrafields.model.values[model].label) {
                //console.log(this);
                res.id = model;
                //this.status.name = i18n.t("intervention." + statusList.values[status].label);
                res.name = extrafields.model.values[model].label;
                res.css = extrafields.model.values[model].cssClass;
            } else { // By default
                res.id = model;
                res.name = model;
                res.css = "";
            }
            return res;

        });


ReportSchema.post('save', function (doc) {

    var LeadModel = MODEL('lead').Schema;

    if (doc.lead.id && doc.leadStatus)
        LeadModel.update({_id: doc.lead.id}, {$set: {status: doc.leadStatus}}, {multi: false}, function (err) {

            console.log('lead updated ');
        });

});

exports.Schema = mongoose.model('report', ReportSchema, 'Reports');
exports.name = "report";
