exports.name = 'helper';
exports.version = '1.01';

var mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId;

var _ = require('lodash'),
    async = require('async'),
    numeral = require('numeral'),
    moment = require('moment'),
    mongoose = require('mongoose');

exports.page = function(data) {
    "use strict";
    var count = data.count;
    var page = data.page || 1;
    var skip;

    count = parseInt(count, 10);
    count = !isNaN(count) ? count : 50; // TODO Need CONFIG('COUNT_PER_PAGE')
    page = parseInt(page, 10);
    page = !isNaN(page) && page ? page : 1;
    skip = (page - 1) * count;

    return {
        skip: skip,
        limit: count
    };
};

var getEveryOneOption = function() {
    return {
        whoCanRW: 'everyOne'
    };
};

var getOwnerOption = function(ownerId) {
    var owner = objectId(ownerId);

    return {
        $and: [{
                whoCanRW: 'owner'
            },
            {
                'groups.owner': owner
            }
        ]
    };
};

var getGroupOption = function(userId, groupsId) {
    var groups = groupsId.objectID();
    var user = objectId(userId);

    return {
        $or: [{
                $and: [
                    { whoCanRW: 'group' },
                    { 'groups.users': user }
                ]
            },
            {
                $and: [
                    { whoCanRW: 'group' },
                    { 'groups.group': { $in: groups } }
                ]
            }
        ]
    };
};

exports.rewriteAccess = {
    everyOne: getEveryOneOption,
    group: getGroupOption,
    owner: getOwnerOption
};