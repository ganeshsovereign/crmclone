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



exports.name = 'localfs';
exports.version = '1.00';

var mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId;

var _ = require('lodash'),
    async = require('async'),
    numeral = require('numeral'),
    moment = require('moment');

'use strict';
var _storageType = 'localFs';
var NOT_ENOUGH_INCOMING_PARAMETER = 'Not Enough Incoming Parameter';
var protoObject = {
    checkBase64: function(targetString) {
        var BASE64_REG_EXPR = /^data:image\/\w+;base64,/;
        return BASE64_REG_EXPR.test(targetString);
    },

    convertFromBase64: function(Base64String) {
        return new Buffer(Base64String.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    },

    validateIncomingParameters: function(args) {
        var argumentsLength = args.length;
        var isCallback;
        var callback = args[4];
        var options = args[3];

        switch (argumentsLength) {
            case 4:
                isCallback = typeof callback === 'function';
                break;
            case 3:
                isCallback = typeof options === 'function';
                if (isCallback) {
                    callback = options;
                    options = defaultOptions;
                }
                break;
            case 2:
                options = defaultOptions;
                break;
            default:
                console.error(NOT_ENOUGH_INCOMING_PARAMETER);

                return false;
        }

        return isCallback;
    }
};
// var awsStorage = require('./aws')(protoObject);
// var azureStorage = require('./azure');
var localStorage = INCLUDE('localFs');
var Storages = {
    // aws    : awsStorage,
    // azure  : azureStorage,
    localFs: localStorage
};

function fileStorage(storageType) {
    this.storageType = storageType || _storageType;
    Storages[this.storageType].call(this);
}

module.exports = fileStorage;









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
                $and: [{
                        whoCanRW: 'group'
                    },
                    {
                        'groups.users': user
                    }
                ]
            },
            {
                $and: [{
                        whoCanRW: 'group'
                    },
                    {
                        'groups.group': {
                            $in: groups
                        }
                    }
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