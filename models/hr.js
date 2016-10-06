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
    telMobile: String,
    telFixe: String,
    address: String,
    zip: String,
    town: String,
    dateNaissance: Date,
    villeNaissance: String,
    paysNaissance: String,
    nationnalite: String,
    situationFamiliale: String,
    nbrEnfants: Number,
    perCharges: Number,
    dateArrivee: Date,
    dateDepart: Date,
    descriptionPoste: String,
    contrat: String,
    periodeEssai: String,
    salaire: Number,
    tempsTravail: String,
    securiteSociale: Number,
    libelleBank: String,
    iban: String,
    niveauEtude: String,
    anneeDiplome: Number,
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