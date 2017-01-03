exports.name = 'utils';
exports.version = '1.03';

var _ = require('lodash'),
        numeral = require('numeral'),
        mongoose = require('mongoose');

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
    ordinal : function (number) {
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
            return numeral(round(value, 3)).format('0[.]000 $'); ;
        default :
            return numeral(round(value, 2)).format('0[.]00 $'); ;
    }
    
    
};

//TODO Remove used printUnit
exports.printWeight = function (value, width) {
    switch (width) {
        case 3 :
            return numeral(round(value, 3)).format('0[.]000') + ' kg' ;
        default :
            return numeral(round(value, 2)).format('0[.]00') + ' kg' ;
    }
};

exports.printUnit = function (value, unit, width) {
    if(!unit)
        unit = 'kg';
    
    switch (width) {
        case 3 :
            return numeral(round(value, 3)).format('0[.]000') + ' ' +unit ;
        default :
            return numeral(round(value, 2)).format('0[.]00') + ' ' +unit ;
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