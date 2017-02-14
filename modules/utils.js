exports.name = 'utils';
exports.version = '1.06';

var _ = require('lodash'),
        async = require('async'),
        numeral = require('numeral'),
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
    ordinal: function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});
numeral.locale('fr');

function round(value, decimals) {
    if (value > Math.pow(10, (decimals + 2) * -1) * -1 && value < Math.pow(10, (decimals + 2) * -1)) // Fix error little number
        return 0;
    return Number(Math.round(value + 'e' + (decimals)) + 'e-' + (decimals));
}

exports.round = round;

exports.setPrice = function (value) {
    return round(value, 2);
};

exports.printPrice = function (value, width) {
    switch (width) {
        case 3 :
            return numeral(round(value, 3)).format('0[.]000 $');
            ;
        default :
            return numeral(round(value, 2)).format('0[.]00 $');
            ;
    }


};

//TODO Remove used printUnit
exports.printWeight = function (value, width) {
    switch (width) {
        case 3 :
            return numeral(round(value, 3)).format('0[.]000') + ' kg';
        default :
            return numeral(round(value, 2)).format('0[.]00') + ' kg';
    }
};

exports.printUnit = function (value, unit, width) {
    if (!unit)
        unit = 'kg';

    switch (width) {
        case 3 :
            return numeral(round(value, 3)).format('0[.]000') + ' ' + unit;
        default :
            return numeral(round(value, 2)).format('0[.]00') + ' ' + unit;
    }
};

exports.printNumber = function (value) {
    return numeral(value).format('0.00');
};

exports.numberFormat = function (number, width) {
    //console.log("number : " + number);
    //console.log("width : " + width);
    //console.log(number + '');
    return new Array(width + 1 - (number + '').length).join('0') + number;
};

// merge 2 arrays of object with specif prop example _id
//arr1  = [{_id:1, total:34}]
//arr2 = [{_id:1, moy:12}]
//[{_id:1, total:34, moy:12}]
exports.mergeByProperty = function (arr1, arr2, prop) {
    _.each(arr2, function (arr2obj) {
        var arr1obj = _.find(arr1, function (arr1obj) {
            return arr1obj[prop] === arr2obj[prop];
        });

        arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
    });
};

// Same but type is ObjectId()
exports.mergeByObjectId = function (arr1, arr2, prop) {
    _.each(arr2, function (arr2obj) {
        var arr1obj = _.find(arr1, function (arr1obj) {
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
Dict.dict({dictName: "fk_payment_term", object: true}, function (err, docs) {
    cond_reglement = docs;
});

exports.calculate_date_lim_reglement = function (datec, cond_reglement_code) {
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

exports.sumTotal = function (lines, shipping, discount, societeId, callback) {

    var SocieteModel = MODEL('societe').Schema;

    async.waterfall([
        function (cb) {
            if (!societeId)
                return cb(null, true);

            SocieteModel.findOne({_id: societeId}, "VATIsUsed", function (err, societe) {
                if (err || !societe)
                    return callback("Societe not found !");

                cb(null, societe.VATIsUsed);
            });
        }
    ], function (err, VATIsUsed) {

        var count = 0,
                total_ht = 0,
                total_tva = [],
                total_ttc = 0,
                weight = 0;

        var i, j, length, found;
        var subtotal = 0;

        for (i = 0, length = lines.length; i < length; i++) {
            // SUBTOTAL
            if (lines[i].product.name == 'SUBTOTAL') {
                lines[i].total_ht = subtotal;
                subtotal = 0;
                continue;
            }

            //console.log(object.lines[i].total_ht);
            total_ht += lines[i].total_ht;
            subtotal += lines[i].total_ht;
            //this.total_ttc += this.lines[i].total_ttc;

            if (VATIsUsed) {
                //Add VAT
                found = false;
                for (j = 0; j < total_tva.length; j++)
                    if (total_tva[j].tva_tx === lines[i].tva_tx) {
                        total_tva[j].total += lines[i].total_tva;
                        found = true;
                        break;
                    }

                if (!found) {
                    total_tva.push({
                        tva_tx: lines[i].tva_tx,
                        total: lines[i].total_tva
                    });
                }
            }

            //Poids total
            weight += lines[i].weight * lines[i].qty;
            count += lines[i].qty;
        }

        // shipping cost
        if (shipping.total_ht) {
            total_ht += shipping.total_ht;

            if (VATIsUsed) {
                shipping.total_tva = shipping.total_ht * shipping.tva_tx / 100;

                //Add VAT
                found = false;
                for (j = 0; j < total_tva.length; j++)
                    if (total_tva[j].tva_tx === shipping.tva_tx) {
                        total_tva[j].total += shipping.total_tva;
                        found = true;
                        break;
                    }

                if (!found) {
                    total_tva.push({
                        tva_tx: shipping.tva_tx,
                        total: shipping.total_tva
                    });
                }
            } else
                shipping.total_tva = 0;
        }

        if (discount && discount.percent) {
            discount.value = exports.round(total_ht * discount.percent / 100, 2);
            total_ht -= discount.value;

            if (VATIsUsed)
                // Remise sur les TVA
                for (j = 0; j < total_tva.length; j++) {
                    total_tva[j].total -= total_tva[j].total * discount.percent / 100;
                }
        }

        total_ht = exports.round(total_ht, 2);
        total_ttc = total_ht;

        if (VATIsUsed)
            for (j = 0; j < total_tva.length; j++) {
                total_tva[j].total = exports.round(total_tva[j].total, 2);
                total_ttc += total_tva[j].total;
            }

        callback(null, {
            total_ht: total_ht,
            total_tva: total_tva,
            total_ttc: total_ttc,
            weight: weight,
            count: count
        });
    });
};