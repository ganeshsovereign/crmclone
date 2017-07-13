"use strict";

exports.name = 'utils';
exports.version = '1.07';

var _ = require('lodash'),
    async = require('async'),
    numeral = require('numeral'),
    moment = require('moment'),
    mongoose = require('mongoose');

var Dict = INCLUDE('dict');

numeral.register('locale', 'fr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function(number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});
numeral.locale('fr');

function round(value, decimals) {
    if (!decimals)
        decimals = 2;
    if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
        return 0;
    return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
}

exports.round = round;

exports.setPrice = function(value) {
    return round(value, 2);
};

exports.setRound3 = function(value) {
    return round(value, 3);
};

exports.setTags = function(tags) {
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

exports.setLink = function(link) {
    if (!link)
        return null;

    if (link === "/") // only for root url in categories
        return link;

    link = link.replace(/[^a-zA-Z0-9]/g, '_');

    //console.log(result);
    return link;
};

exports.setAccount = function(account) {
    if (account) {
        account = account.replace(/ /g, "");
        account = account.substring(0, CONFIG('accounting.length') || 10); //limit a 10 character
    }

    return account;
};


exports.setNoSpace = function(text) {
    if (text)
        text = text.replace(/ /g, "").trim();

    return text;
};

exports.set_Space = function(text) {
    if (text)
        text = text.replace(/ /g, "_").trim();

    return text;
};

exports.setPhone = function(phone) {
    if (phone == '')
        return '';

    let PNF = require('google-libphonenumber').PhoneNumberFormat;
    let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

    phone = phone.replace(/ /g, "").replace(/\./g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "");
    if (phone[0] == '0')
        phone.substr(1);

    let phoneNumber = phoneUtil.parse(phone, this.address.country || 'FR');


    phone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);

    return phone;
};

exports.setFirstUpperCase = function(name) {
    if (!name) {
        return name;
    }

    name = name.toLowerCase();

    name = name.charAt(0).toUpperCase() + name.substr(1);

    return name;
};

exports.printPrice = function(value, width) {
    switch (width) {
        case 3:
            return numeral(round(value, 3)).format('0[.]000 $');
        default:
            return numeral(round(value, 2)).format('0[.]00 $');
    }
};

//TODO Remove used printUnit
exports.printWeight = function(value, width) {
    switch (width) {
        case 3:
            return numeral(round(value, 3)).format('0[.]000') + ' kg';
        default:
            return numeral(round(value, 2)).format('0[.]00') + ' kg';
    }
};

exports.printUnit = function(value, unit, width) {
    if (!unit)
        unit = 'kg';

    switch (width) {
        case 3:
            return numeral(round(value, 3)).format('0[.]000') + ' ' + unit;
        default:
            return numeral(round(value, 2)).format('0[.]00') + ' ' + unit;
    }
};

exports.printNumber = function(value) {
    return numeral(value).format('0.00');
};

exports.numberFormat = function(number, width) {
    //console.log("number : " + number);
    //console.log("width : " + width);
    //console.log(number + '');
    return new Array(width + 1 - (number + '').length).join('0') + number;
};

// Fix Timezone GMT for mongodb aggregate -> set hours to 12
exports.setDate = function(value) {
    if (!value)
        return null;

    return moment(value).hour(12).toDate();
};

// merge 2 arrays of object with specif prop example _id
//arr1  = [{_id:1, total:34}]
//arr2 = [{_id:1, moy:12}]
//[{_id:1, total:34, moy:12}]
exports.mergeByProperty = function(arr1, arr2, prop) {
    _.each(arr2, function(arr2obj) {
        var arr1obj = _.find(arr1, function(arr1obj) {
            return arr1obj[prop] === arr2obj[prop];
        });

        arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
    });
};

// Same but type is ObjectId()
exports.mergeByObjectId = function(arr1, arr2, prop) {
    _.each(arr2, function(arr2obj) {
        var arr1obj = _.find(arr1, function(arr1obj) {
            return arr1obj[prop].toString() === arr2obj[prop].toString();
        });

        arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
    });
};


exports.ObjectId = mongoose.Types.ObjectId;

/**
 * 	Renvoi une date limite de reglement de facture en fonction des
 * 	conditions de reglements de la facture et date de facturation
 *
 * 	@param      string	cond_reglement   	Condition of payment (code or id) to use. If 0, we use current condition.
 * 	@return     date     			       	Date limite de reglement si ok, <0 si ko
 */

var cond_reglement = {};
Dict.dict({ dictName: "fk_payment_term", object: true }, function(err, docs) {
    cond_reglement = docs;
});

exports.calculate_date_lim_reglement = function(datec, cond_reglement_code) {
    var data = cond_reglement.values[cond_reglement_code];

    var cdr_nbjour = data.nbjour || 0;
    var cdr_fdm = data.fdm;
    var cdr_decalage = data.decalage || 0;

    /* Definition de la date limite */

    // 1 : ajout du nombre de jours
    var datelim = new Date(datec);
    datelim.setDate(datelim.getDate() + cdr_nbjour);
    //console.log(cdr_nbjour);

    // 2 : application de la regle "fin de mois"
    if (cdr_fdm) {
        var mois = datelim.getMonth();
        var annee = datelim.getFullYear();

        if (mois == 12) {
            mois = 1;
            annee++;
        } else
            mois++;

        // On se deplace au debut du mois suivant, et on retire un jour
        datelim.setHours(0);
        datelim.setMonth(mois);
        //datelim.setFullYear(annee);
        datelim.setDate(0);
        //console.log(datelim);
    }

    // 3 : application du decalage
    datelim.setDate(datelim.getDate() + cdr_decalage);
    //console.log(datelim);

    return datelim;
};

exports.sumTotal = function(lines, shipping, discount, societeId, callback) {

    var SocieteModel = MODEL('Customers').Schema;
    var TaxesModel = MODEL('taxes').Schema;

    var count = 0,
        total_ht = 0,
        total_taxes = [],
        total_ttc = 0,
        weight = 0;

    var taxesId = {};
    var taxes = [];

    if (!lines || !lines.length)
        return callback(null, {
            total_ht: total_ht,
            total_taxes: total_taxes,
            total_ttc: total_ttc,
            weight: weight,
            count: count
        });

    async.waterfall([
            function(cb) {
                if (!societeId)
                    return cb(null, true);

                SocieteModel.findOne({ _id: societeId }, "salesPurchases.VATIsUsed", function(err, societe) {
                    if (err || !societe)
                        return callback("Societe not found !");

                    cb(null, societe.salesPurchases.VATIsUsed);
                });
            },
            function(VATIsUsed, cb) {
                if (!VATIsUsed)
                    return cb(null, VATIsUsed);

                var rates = [];

                TaxesModel.populate(lines, "product.taxes.taxeId", function(err, lines) {
                    if (err)
                        return cb(err);

                    _.each(lines, function(line) {

                        if (!line.product)
                            return;

                        for (var i = 0; i < line.product.taxes.length; i++) {
                            //taxes.push(lines.product.taxes[i].taxeId);
                            if (taxesId[line.product.taxes[i].taxeId._id.toString()] != null) //Already in tab
                                continue;

                            taxesId[line.product.taxes[i].taxeId._id.toString()] = total_taxes.length;
                            total_taxes.push({
                                taxeId: line.product.taxes[i].taxeId._id,
                                isFixValue: line.product.taxes[i].taxeId.isFixValue,
                                seuqence: line.product.taxes[i].taxeId.sequence,
                                total: 0
                            });
                        }
                    });

                    //Add VAT
                    for (var i = 0, length = lines.length; i < length; i++) {
                        if (!lines[i].product)
                            continue;
                        if (lines[i].isDeleted)
                            continue;
                        if (lines[i].type === 'SUBTOTAL')
                            continue;

                        //Update TAXES
                        if (lines[i].product.taxes.length)
                            for (var j = 0; j < lines[i].product.taxes.length; j++) {
                                //}

                                let idTaxe = taxesId[lines[i].product.taxes[j].taxeId._id.toString()];

                                if (lines[i].product.taxes[j].taxeId.isFixValue) //ecotax
                                    lines[i].total_taxes[idTaxe].value = lines[i].qty * lines[i].product.taxes[j].value;
                                else
                                    lines[i].total_taxes[idTaxe].value = lines[i].total_ht * lines[i].product.taxes[j].taxeId.rate / 100;
                                //console.log(lines[i].total_taxes[0]);

                                total_taxes[idTaxe].total += lines[i].total_taxes[idTaxe].value;

                            }
                    }
                    cb(null, VATIsUsed);

                });
            },
            function(VATIsUsed, cb) {
                // shipping cost
                if (!shipping.total_ht)
                    return cb(null, VATIsUsed);

                total_ht += shipping.total_ht;

                if (!VATIsUsed)
                    return cb(null, VATIsUsed);

                TaxesModel.findOne({ isDefault: true }, function(err, taxe) {
                    if (err)
                        return cb(err);

                    if (taxe == null)
                        return cb("No default taxe");

                    shipping.total_taxes = [];
                    shipping.total_taxes.push({
                        taxeId: taxe._id,
                        value: shipping.total_ht * taxe.rate / 100
                    });

                    //Add VAT
                    var found = false;
                    for (var j = 0; j < total_taxes.length; j++)
                        if (total_taxes[j].taxeId.toString() === taxe._id.toString()) {
                            total_taxes[j].total += shipping.total_ht * taxe.rate / 100;
                            found = true;
                            break;
                        }

                    if (!found) {
                        total_taxes.push({
                            taxeId: taxe._id,
                            isFixValue: taxe.isFixValue,
                            value: shipping.total_ht * taxe.rate / 100
                        });
                    }

                    cb(null, VATIsUsed);

                });
            }
        ],
        function(err, VATIsUsed) {

            if (err)
                return callback(err);


            var i, j, k, length, found;
            var subtotal = 0;

            for (i = 0, length = lines.length; i < length; i++) {
                // SUBTOTAL
                if (lines[i].type == 'SUBTOTAL') {
                    lines[i].total_ht = subtotal;
                    subtotal = 0;
                    continue;
                }
                if (lines[i].isDeleted)
                    continue;

                //console.log(object.lines[i].total_ht);
                total_ht += lines[i].total_ht;
                subtotal += lines[i].total_ht;
                //this.total_ttc += this.lines[i].total_ttc;

                if (lines[i].product && lines[i].product._id)
                //Poids total
                    weight += (lines[i].product.weight || 0) * lines[i].qty;

                count += lines[i].qty;
            }

            if (discount && discount.discount && discount.discount.percent >= 0) {
                discount.discount.value = exports.round(total_ht * discount.discount.percent / 100, 2);
                total_ht -= discount.discount.value;

                if (VATIsUsed)
                // Remise sur les TVA
                    for (j = 0; j < total_taxes.length; j++) {
                    if (total_taxes[j].isFixValue)
                        continue;

                    total_taxes[j].total -= total_taxes[j].total * discount.discount.percent / 100;
                }
            }

            if (discount && discount.escompte && discount.escompte.percent >= 0) {
                discount.escompte.value = exports.round(total_ht * discount.escompte.percent / 100, 2);
                total_ht -= discount.escompte.value;

                if (VATIsUsed)
                // Remise sur les TVA
                    for (j = 0; j < total_taxes.length; j++) {
                    if (total_taxes[j].isFixValue)
                        continue;

                    total_taxes[j].total -= total_taxes[j].total * discount.escompte.percent / 100;
                }
            }

            total_ht = exports.round(total_ht, 2);
            total_ttc = total_ht;

            if (VATIsUsed)
                for (j = 0; j < total_taxes.length; j++) {
                    total_taxes[j].value = exports.round(total_taxes[j].total, 2);
                    //if (total_taxes[j].isFixValue)
                    //    continue;

                    total_ttc += total_taxes[j].total;
                }

            total_taxes = _.sortBy(total_taxes, 'sequence');

            callback(null, {
                total_ht: total_ht,
                total_taxes: total_taxes,
                total_ttc: total_ttc,
                weight: weight,
                count: count
            });
        });
};

exports.checksumIsbn = function(isbn) {
    // ISBN 13
    isbn = isbn.replace(/[^\dX]/gi, '');
    //console.log(isbn.length);
    if (isbn.length != 12)
        return null;

    var chars = isbn.split('');
    //if (chars[9].toUpperCase() == 'X')
    //    chars[9] = 10;

    var sum = 0;
    for (var i = 0; i < chars.length; i++)
        sum += parseInt(chars[i]) * (i % 2 == 0 ? 3 : 1);

    return sum % 10;
};