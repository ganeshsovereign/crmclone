"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        _ = require('lodash'),
        Schema = mongoose.Schema,
        timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');


DataTable.configure({verbose: false, debug: false});
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

//  Getters and Setters
/*var getTags = function(tags) {
 console.log("joiiiiin");
 return tags.join(',');
 };*/

var setTags = function (tags) {
    var result = [];
    for (var i = 0; i < tags.length; i++)
        if (typeof tags[i] == "object" && tags[i].text)
            result.push(tags[i].text.trim());
        else
            result.push(tags[i].trim());

    result = _.uniq(result);

    //console.log(result);
    return result;
};

var setPhone = function (phone) {
    if (phone !== null)
        phone = phone.replace(/ /g, "").replace(/\./g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "");
    return phone;
};

var UserSchema = MODEL('user').Schema; //extend User model

/**
 * Contact Schema
 */
var contactSchema = UserSchema.discriminator('contact', new Schema({
    ref: String,
    address: {type: String, default: null},
    zip: {type: String, default: null},
    town: {type: String, default: null},
    country_id: String,
    state_id: String,
    phone: {type: String, set: setPhone, default: null}, // pro
    phone_perso: {type: String, set: setPhone, default: null},
    phone_mobile: {type: String, set: setPhone, default: null}, // pro
    fax: {type: String, set: setPhone, default: null}, // pro
    emails: [{
            type: {type: String, default: "pro"},
            address: String
        }],
    civilite: String, // DICT
    Tag: {type: [], set: setTags},
    soncas: [String],
    hobbies: [String],
    tag: [{
            text: String
        }],
    notes: String,
    sex: {type: String, default: "H"},
    newsletter: {type: Boolean, default: false},
    sendEmailing: {type: Boolean, default: true},
    sendSMS: {type: Boolean, default: true},
    birthday: Date,
    user_creat: String,
    user_modif: String,
    oldId: String, // only use for migration
    optional: {type: Schema.Types.Mixed}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    discriminatorKey: '_type',
    collection: 'users'
}));

//contactSchema.plugin(timestamps);

var segmentationList = {};
Dict.dict({dictName: "fk_segmentation"}, function (err, docs) {
    if (docs) {
        segmentationList = docs.values;
    }
});

var tab_attractivity = {
    effectif_id: {
        "EF0": 1,
        "EF1-5": 1,
        "EF6-10": 1,
        "EF11-50": 1,
        "EF51-100": 1,
        "EF101-250": 2,
        "EF251-500": 2,
        "EF501-1000": 3,
        "EF1001-5000": 5,
        "EF5000+": 5
    },
    typent_id: {
        //"TE_PUBLIC": 3,
        "TE_ETABL": 3,
        "TE_SIEGE": 5
    },
    familyProduct: {
        "Externalisation": 5,
        "Imp Num": 4,
        "Repro/plan": 2,
        "Signalétique": 5,
        "Numérisation": 5,
        "Créa, Pao": 2,
        "Dupli cd/dvd": 4
    },
    segmentation: segmentationList,
    poste: {
        "PDG": 5,
        "DG": 4,
        "DET": 4,
        "DIR IMMO": 4,
        "DirCO": 2,
        "Dir COM": 3,
        "DirMktg": 3
    }
};

var contactStatusList = {};
Dict.dict({dictName: "fk_user_status", object: true}, function (err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    contactStatusList = doc;
});

/*contactSchema.virtual('status')
        .get(function () {
            var res_status = {};

            var status = this.Status;

            if (status && contactStatusList.values[status] && contactStatusList.values[status].label) {
                //console.log(this);
                res_status.id = status;
                //this.status.name = i18n.t("intervention." + statusList.values[status].label);
                res_status.name = contactStatusList.values[status].label;
                res_status.css = contactStatusList.values[status].cssClass;
            } else { // By default
                res_status.id = status;
                res_status.name = status;
                res_status.css = "";
            }
            return res_status;

        });*/

/*contactSchema.virtual('attractivity')
        .get(function () {
            var attractivity = 0;

            for (var i in tab_attractivity) {
                if (this[i]) {
                    if (tab_attractivity[i][this[i].text])
                        attractivity += tab_attractivity[i][this[i].text];

                    else if (tab_attractivity[i][this[i]])
                        attractivity += tab_attractivity[i][this[i]];
                }
            }

            return attractivity;
        });

contactSchema.virtual('fullAddress').get(function () {

    return this.address + ', ' + this.zip + ' ' + this.town;

});*/

exports.Schema = mongoose.model('contact', contactSchema);
exports.name = 'contact';

