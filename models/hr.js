"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var Dict = INCLUDE('dict');

/**
 * Rh Schema
 */

var UserSchema = MODEL('user').Schema; //extend User model

var setPhone = function (phone) {
    if (phone !== null)
        phone = phone.replace(/ /g, "").replace(/\./g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "");
    return phone;
};


var HrSchema = UserSchema.discriminator('hr', new Schema({
    MobilePhone: String,
    Phone: String,
    Address: String,
    zip: String,
    town: String,
    BirthDate: Date,
    CityofBirth: String,
    CountryOfBirth: String,
    Nationality: String,
    situationFamiliale: String,
    Children: Number,
    perCharges: Number,
    ArrivalDate: Date,
    DepartureOfDate: Date,
    JobDescription: String,
    contrat: String,
    TrialPeriod: String,
    salaire: Number,
    tempsTravail: String,
    SocialeSecurityNumber: Number,
    AccountStatement: String,
    iban: String,
    Classes: String,
    DateOfClasses: Number,
    notes: [{
            author: {
                id: {type: String, ref: 'User'},
                name: String
            },
            datec: Date,
            note: String
        }]
},
{
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    discriminatorKey: '_type',
    collection: 'users'
}));

exports.Schema = mongoose.model('hr', HrSchema);
exports.name = 'hr';