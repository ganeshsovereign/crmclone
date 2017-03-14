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

var setPhone = MODULE('utils').setPhone;


var HrSchema = UserSchema.discriminator('hr', new Schema({
    mobilePhone: String,
    phone: String,
    address: String,
    zip: String,
    town: String,
    birthDate: Date,
    cityOfBirth: String,
    countryOfBirth: String,
    nationality: String,
    familySituation: String,
    children: Number,
    perCharges: Number,
    sector: String,
    arrivalDate: Date,
    dateOfDeparture: Date,
    jobDescription: String,
    typeOfContract: String,
    trialPeriod: String,
    grossSalary: Number,
    timeWork: String,
    bankingEtablishment: String,
    socialeSecurityNumber: String,
    accountStatement: String,
    iban: String,
    bic: String,
    classes: String,
    dateOfClasses: Number,
    notes: [{
        author: {
            id: { type: String, ref: 'User' },
            name: String
        },
        datec: Date,
        note: String
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    discriminatorKey: '_type',
    collection: 'users'
}));

exports.Schema = mongoose.model('hr', HrSchema);
exports.name = 'hr';