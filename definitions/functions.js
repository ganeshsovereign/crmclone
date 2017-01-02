

var numberFormat = function (number, width) {
    //console.log("number : " + number);
    //console.log("width : " + width);
    //console.log(number + '');
    return new Array(width + 1 - (number + '').length).join('0') + number;
};


F.functions.refreshSeq = function(ref, date) {
    var split = ref.split('-');
    
    split[0] = split[0].substring(0,split[0].length-4);
    
    return split[0] + date.getFullYear().toString().substr(2, 2) + numberFormat((date.getMonth() + 1), 2) + "-" + split[1];
};