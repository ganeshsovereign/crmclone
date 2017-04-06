"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');


DataTable.configure({ verbose: false, debug: false });
mongoose.plugin(DataTable.init);

var Dict = INCLUDE('dict');

//  Getters and Setters
/*var getTags = function(tags) {
 console.log("joiiiiin");
 return tags.join(',');
 };*/

var setTags = MODULE('utils').setTags;
var setPhone = MODULE('utils').setPhone;

var UserSchema = MODEL('user').Schema; //extend User model

/**
 * Contact Schema
 */
var contactSchema = UserSchema.discriminator('contact', new Schema({
    ref: String,
    isremoved: Boolean,
    address: { type: String, default: null },
    zip: { type: String, default: null },
    town: { type: String, default: null },
    country_id: String,
    state_id: String,
    phone: { type: String, set: setPhone, default: null }, // pro
    phone_perso: { type: String, set: setPhone, default: null },
    phone_mobile: { type: String, set: setPhone, default: null }, // pro
    fax: { type: String, set: setPhone, default: null }, // pro
    emails: [{
        type: { type: String, default: "pro" },
        address: String
    }],
    civilite: String, // DICT
    Tag: { type: [], set: setTags },
    soncas: [String],
    hobbies: [String],
    tag: [{
        text: String
    }],
    notes: String,
    sex: { type: String, default: "H" },
    newsletter: { type: Boolean, default: false },
    sendEmailing: { type: Boolean, default: true },
    sendSMS: { type: Boolean, default: true },
    birthday: Date,
    user_creat: String,
    user_modif: String,
    oldId: String, // only use for migration
    optional: { type: Schema.Types.Mixed }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    discriminatorKey: '_type',
    collection: 'users'
}));

//contactSchema.plugin(timestamps);

var segmentationList = {};
Dict.dict({ dictName: "fk_segmentation" }, function(err, docs) {
    if (docs) {
        segmentationList = docs.values;
    }
});

var contactStatusList = {};
Dict.dict({ dictName: "fk_user_status", object: true }, function(err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    contactStatusList = doc;
});

exports.Schema = mongoose.model('contact', contactSchema);
exports.name = 'contact';