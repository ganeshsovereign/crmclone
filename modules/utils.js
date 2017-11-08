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

exports.setLabel = function(txt) {
    if (!txt)
        return null;

    txt = txt.replace(/[^a-zA-Z0-9 ]/g, '');

    return txt;
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
    if (!phone)
        return phone;

    let PNF = require('google-libphonenumber').PhoneNumberFormat;
    let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

    phone = phone.replace(/ /g, "").replace(/\./g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "");
    if (phone[0] == '0')
        phone.substr(1);

    let country = 'FR';
    if (this.address && this.address.country)
        country = this.address.country;
    else if (this.country)
        country = this.country;


    let phoneNumber = phoneUtil.parse(phone, country || 'FR');

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
Dict.dict({
    dictName: "fk_payment_term",
    object: true
}, function(err, docs) {
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

    const SocieteModel = MODEL('Customers').Schema;
    const TaxesModel = MODEL('taxes').Schema;
    const Countries = MODEL('countries').Schema;
    const round = exports.round;

    var count = 0,
        total_ht = 0,
        total_taxes = [],
        total_ttc = 0,
        weight = 0;

    //var taxesId = {};
    //var taxes = [];

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

                SocieteModel.findOne({
                    _id: societeId
                }, "salesPurchases.VATIsUsed address", function(err, societe) {
                    if (err || !societe)
                        return callback("Societe not found !");

                    Countries.findById(societe.address.country || "FR", function(err, result) {
                        if (err || !result)
                            return callback("Country not found !");

                        cb(null, societe.salesPurchases.VATIsUsed && result.isVAT);
                    });
                });
            },
            function(VATIsUsed, cb) {
                if (!VATIsUsed)
                    return cb(null, VATIsUsed);

                var rates = [];

                lines = _.map(lines, function(elem) {
                    elem.total_taxes = _.map(elem.total_taxes, function(tax) {
                        if (tax.taxeId && tax.taxeId._id)
                            tax.taxeId = tax.taxeId._id;
                        return tax;
                    });
                    return elem;
                });

                //console.log(lines);

                TaxesModel.populate(lines, "total_taxes.taxeId", function(err, lines) {
                    if (err)
                        return cb(err);

                    if (!lines || !lines.length)
                        return cb(null, VATIsUsed);

                    _.each(lines, function(line) {
                        //return console.log(line.total_taxes);
                        if (line.isDeleted)
                            return;

                        if (!line.total_taxes || !line.total_taxes.length)
                            return;

                        for (var i = 0; i < line.total_taxes.length; i++) {
                            //taxes.push(lines.product.taxes[i].taxeId);
                            //if (taxesId[line.product.taxes[i].taxeId._id.toString()] != null) //Already in tab
                            //    continue;

                            let tax = _.find(total_taxes, _.matchesProperty("taxeId", line.total_taxes[i].taxeId._id.toString()));

                            if (tax)
                                continue;

                            //taxesId[line.product.taxes[i].taxeId._id.toString()] = total_taxes.length;
                            total_taxes.push({
                                taxeId: line.total_taxes[i].taxeId._id.toString(),
                                isFixValue: line.total_taxes[i].taxeId.isFixValue,
                                sequence: line.total_taxes[i].taxeId.sequence,
                                total: 0
                            });
                        }
                    });

                    //return;

                    //Add VAT
                    for (var i = 0, length = lines.length; i < length; i++) {
                        //if (!lines[i].product)
                        //    continue;
                        if (lines[i].type !== 'product')
                            continue;
                        if (!lines[i].qty)
                            continue;
                        if (lines[i].isDeleted) {
                            lines[i].qty = 0;
                            lines[i].total_ht = 0;
                            lines[i].discount = 0;
                            continue;
                        }

                        //if (!lines[i].product.taxes)
                        //    continue;

                        //Update TAXES

                        for (var j = 0; j < lines[i].total_taxes.length; j++) {
                            //}

                            let idTax = _.find(total_taxes, _.matchesProperty("taxeId", lines[i].total_taxes[j].taxeId._id.toString()));

                            //lines[i].total_taxes[idTaxe] = {
                            //    taxeId: lines[i].product.taxes[j].taxeId._id
                            //}; //Create new taxe

                            lines[i].total_taxes[j].value = 0;
                            //console.log("test", lines[i].total_taxes, total_taxes, idTax);

                            if (idTax.isFixValue == true) { //ecotax // find ecotax in product
                                //console.log(_.matchesProperty('taxeId', lines[i].total_taxes[j].taxeId._id.toString()));
                                lines[i].total_taxes[j].value = lines[i].qty * _.find(lines[i].product.taxes, _.matchesProperty('taxeId', lines[i].total_taxes[j].taxeId._id.toString())).value;
                            } else
                                lines[i].total_taxes[j].value = lines[i].total_ht * lines[i].total_taxes[j].taxeId.rate / 100;

                            idTax.total += lines[i].total_taxes[j].value;
                        }
                    }
                    cb(null, VATIsUsed);

                });
            },
            function(VATIsUsed, cb) {
                //return console.log(lines[5]);

                // shipping cost
                if (!shipping.total_ht)
                    return cb(null, VATIsUsed);

                total_ht += shipping.total_ht;

                if (!VATIsUsed)
                    return cb(null, VATIsUsed);

                TaxesModel.findOne({
                    isDefault: true
                }, function(err, taxe) {
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

                    let idTax = _.find(total_taxes, _.matchesProperty("taxeId", taxe._id.toString()));
                    if (idTax)
                        idTax.total += shipping.total_ht * taxe.rate / 100;
                    else
                        total_taxes.push({
                            sequence: taxe.sequence,
                            taxeId: taxe._id,
                            isFixValue: taxe.isFixValue,
                            total: shipping.total_ht * taxe.rate / 100
                        });

                    cb(null, VATIsUsed);

                });
            },
            function(VATIsUsed, cb) {
                // EcoTax

                //return console.log(total_taxes);

                var ecotax = {
                    value: 0, //ecotax Value
                    total_tax: 0, // Add 20% on ecotax
                    taxeId: null // Id tax 20% VAT
                };

                async.each(total_taxes, function(tax, eCb) {
                    if (tax.isFixValue == false) //classic VAT
                        return eCb();

                    ecotax.value = tax.total; // Add ecoTax in Total HT ADD NEXT FOR SUBTOTAL

                    if (!VATIsUsed)
                        return eCb();

                    TaxesModel.findOne({
                        isDefault: true
                    }, function(err, taxe) {
                        if (err)
                            return eCb(err);

                        if (taxe == null)
                            return eCb("No default taxe");

                        ecotax.taxeId = taxe._id;
                        ecotax.total_tax = tax.total * taxe.rate / 100;

                        eCb();
                    });
                }, function(err) {
                    return cb(err, VATIsUsed, ecotax);
                });
            }
        ],
        function(err, VATIsUsed, ecotax) {

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
                if (lines[i].type == 'COMMENT') {
                    lines[i].total_ht = 0;
                    continue;
                }
                if (lines[i].isDeleted || !lines[i].qty)
                    continue;

                total_ht += lines[i].total_ht;
                subtotal += lines[i].total_ht;

                //Add ecotax
                /*let ecotax = _.sum(_.filter(lines[i].total_taxes, function(tax) {
                    return total_taxes[taxesId[tax.taxeId.toString()]].isFixValue; // Get Only EcoTax isFixValue 
                }), 'value');

                if (ecotax)
                    subtotal += ecotax;*/

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

            //Add ecotax to total_ht after ALL DISCOUNT
            total_ht += ecotax.value;

            if (VATIsUsed && ecotax && ecotax.value) {
                //Add ECOTAX in VTA

                let idTax = _.find(total_taxes, _.matchesProperty("taxeId", ecotax.taxeId.toString()));
                if (idTax)
                    idTax.total += ecotax.total_tax;
                else
                    total_taxes.push({
                        taxeId: ecotax.taxeId,
                        isFixValue: true,
                        value: ecotax.total_tax
                    });
            }


            total_ht = exports.round(total_ht, 2);
            total_ttc = total_ht;

            if (VATIsUsed)
                for (j = 0; j < total_taxes.length; j++) {
                    total_taxes[j].value = exports.round(total_taxes[j].total, 2);
                    if (total_taxes[j].isFixValue)
                        continue;

                    total_ttc += total_taxes[j].value;
                }

            total_taxes = _.sortBy(total_taxes, 'sequence');

            callback(null, {
                total_ht: round(total_ht, 2),
                total_taxes: total_taxes,
                total_ttc: round(total_ttc, 2),
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

exports.Status = function(value, statusList) {
    if (typeof value === 'object') {
        if (!value.length)
            return [];

        return _.map(value, function(line) {
            var res_status = {};

            var status = line.Status;

            if (status && statusList.values[status] && statusList.values[status].label) {
                res_status.id = status;
                res_status.name = i18n.t(statusList.lang + ":" + statusList.values[status].label);
                //this.status.name = statusList.values[status].label;
                res_status.css = statusList.values[status].cssClass;
            } else { // By default
                res_status.id = status;
                res_status.name = status;
                res_status.css = "";
            }

            line.Status = res_status;

            return line;
        });
    }

    //Single value
    var res_status = {};
    var status = value;

    var Status = {
        id: value
    };

    if (status && statusList.values[status] && statusList.values[status].label) {
        res_status.id = status;
        res_status.name = i18n.t(statusList.lang + ":" + statusList.values[status].label);
        //this.status.name = statusList.values[status].label;
        res_status.css = statusList.values[status].cssClass;
    } else { // By default
        res_status.id = status;
        res_status.name = status;
        res_status.css = "";
    }

    Status.name = res_status.name;
    Status.css = res_status.css;

    return Status;
};