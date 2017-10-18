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



exports.name = 'helper';
exports.version = '1.01';

var mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId;

var _ = require('lodash'),
    async = require('async'),
    numeral = require('numeral'),
    moment = require('moment');

exports.page = function(data) {
    "use strict";
    var count = data.limit;
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

var FilterMapper = function() {
    //var FILTER_CONSTANTS = require('../public/js/constants/filters');
    var startDate;
    var endDate;

    function convertType(values, type, operator, options) {
        var result = {};
        var _operator = operator || '$in';

        //console.log(values, type, operator, options);

        // ng-tags-inputs modules {_id : , name : }
        if (typeof values == 'object')
            values = _.map(values, function(elem) {
                if (elem && typeof elem === 'object' && elem._id)
                    return elem._id;

                if (elem && typeof elem === 'object' && elem.id)
                    return elem.id;

                return elem;
            });

        //console.log(values, type);

        switch (type) {
            case 'ObjectId':
                if (values.indexOf('None') !== -1) {
                    values.push(null);
                }
                result[_operator] = values.objectID();
                break;
            case 'string':
                if (values.indexOf('None') !== -1) {
                    values.push('');
                    values.push(null);
                }

                result[_operator] = values;
                break;
            case 'date':
                if (!Array.isArray(_operator)) {
                    _operator = [_operator];
                }

                if (values[0]) {
                    startDate = moment(new Date(values[0])).startOf('day').toDate();
                    result[_operator[0]] = startDate;
                }

                if (values[1]) {
                    endDate = moment(new Date(values[1])).endOf('day').toDate();
                    result[_operator[1] || _operator[0]] = endDate;
                }

                break;
            case 'number':
                if (!Array.isArray(_operator)) {
                    _operator = [_operator];
                }

                if (_operator.length == 1) {
                    result[_operator] = values;
                    break;
                }

                if (values[0])
                    result[_operator[0]] = values[0];

                if (values[1])
                    result[_operator[1]] = values[1];

                break;
            case 'boolean':
                result[_operator] = _.map(values, function(element) {
                    return (element === true);
                });
                break;

            case 'checked':
                result[_operator] = [];
                //console.log(options);

                for (var i = 0; i < values.length; i++) {
                    if (values[i] === true) // checked true
                        result[_operator].push(options.values[i]);
                }

                //console.log(result);

                break;
            case 'regex':
                result = {
                    $regex: new RegExp(values.toLowerCase()),
                    $options: "gi"
                };
                break;
            case 'letter':
                result = new RegExp('^[' + values.toLowerCase() + values.toUpperCase() + '].*');
                break;
        }

        if (options && options.type) {
            const ObjectId = MODULE('utils').ObjectId;

            //console.log(options);
            switch (options.type) {
                case 'attribute':
                    const old_res = result;
                    result = {};

                    result['$elemMatch'] = {};
                    result['$elemMatch'][options.key || 'value'] = old_res;
                    result['$elemMatch'].attribute = ObjectId(options.attributeId);
                    break;
            }

            //{$elemMatch : {attribute:ObjectId("59c2305d578ef43e209ef7c1"), value:{$gte :50, $lte:700} }}})
        }

        //console.log(result);
        return result;
    }

    /**
     * @param {Object} filter Filter generated by UI.
     * @param {Object} filter.* Keys are model fields.
     * @param {String} filter.*.type Type of filter values.
     * @param {Array} filter.*.values Array of filter values.
     * @return {Object} Returns query object.
     */

    this.mapFilter = function(filter, options) {
        var filterNames = Object.keys(filter);
        var contentType = options.contentType;
        var fieldsArray = options.keysArray;
        var withoutState = options.withoutState;
        var andState = options.andState;
        var suffix = options.suffix;
        var filterResObject = {};
        var filterValues;
        var filterType;
        var filterBackend;
        var filterOptions;
        var filterConstants = F.global.filters[contentType] || {};
        var filterConstantsByName;
        var filterObject;
        var filterName;
        var key;
        var i;

        //console.log(filter, options, F.global.filters[contentType]);

        var $orArray;

        if (fieldsArray && Array.isArray(fieldsArray)) {
            filterNames = withoutState ? _.difference(filterNames, fieldsArray) : fieldsArray;
        }

        for (i = filterNames.length - 1; i >= 0; i--) {
            filterName = filterNames[i];

            if (filterNames.indexOf(filterName) !== -1) {
                filterObject = filter[filterName];

                if (typeof filterObject.value == 'object' && filterObject.value.length === 0)
                    continue;

                if (typeof filterObject.value == 'string' && filterObject.value.length === 0)
                    continue;

                filterValues = filterObject.value;

                filterConstantsByName = filterConstants[filterName] || {};

                filterType = !!filterObject.type ? filterObject.type : filterConstantsByName.type || 'ObjectId';
                filterBackend = filterConstantsByName.backend || filterObject.key || filterObject.backend;
                filterOptions = filterObject.options || filterConstantsByName.options;

                if ((contentType === 'GoodsOutNote' || contentType === 'stockTransactions') && filterBackend === 'status') {
                    filterValues.forEach(function(el) {
                        filterResObject[filterBackend + '.' + el] = true;
                    });
                } else
                if (contentType === 'Products' && filterBackend === 'job') {
                    filterResObject.job = {
                        $exists: false
                    };
                } else if (filterValues && (filterName !== 'startDate' || filterName !== 'endDate')) {
                    if (filterBackend) {
                        if (typeof filterBackend === 'string') {
                            key = suffix ? filterBackend + '.' + suffix : filterBackend;
                            filterResObject[key] = convertType(filterValues, filterType, filterObject.operator, filterOptions);
                        } else {
                            if (!Array.isArray(filterBackend))
                                filterBackend = [filterBackend];

                            $orArray = [];

                            _.map(filterBackend, function(keysObject) {
                                //console.log(keysObject);
                                var resObj = andState ? filterResObject : {};

                                resObj[keysObject.key] = convertType(filterValues, filterType, filterObject.operator || keysObject.operator, filterOptions);

                                if (!andState) {
                                    $orArray.push(resObj);
                                }
                            });

                            if (!andState) {
                                if (!filterResObject.$and) {
                                    filterResObject.$and = [];
                                }

                                filterResObject.$and.push({
                                    $or: $orArray
                                });
                            }
                        }
                    }
                }
            }
        }

        return filterResObject;
    };

};

exports.filterMapper = FilterMapper;

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

exports.accessRoll = function(user, Model, waterfallCb) {
    departmentSearcher = function(waterfallCallback) {
        const DepartmentModel = MODEL('Department').Schema;
        const ObjectId = MODULE('utils').ObjectId;

        DepartmentModel.aggregate({
                $match: {
                    users: ObjectId(user._id)
                }
            }, {
                $project: {
                    _id: 1
                }
            },
            waterfallCallback);
    };

    contentIdsSearcher = function(deps, waterfallCallback) {
        var everyOne = exports.rewriteAccess.everyOne();
        var owner = exports.rewriteAccess.owner(user._id);
        var group = exports.rewriteAccess.group(user._id, deps);
        var whoCanRw = [everyOne, owner, group];
        var matchQuery = {
            $or: whoCanRw
        };

        //console.log(JSON.stringify(matchQuery));

        Model.aggregate({
                $match: matchQuery
            }, {
                $project: {
                    _id: 1
                }
            },
            waterfallCallback
        );
    };

    waterfallTasks = [departmentSearcher, contentIdsSearcher];

    async.waterfall(waterfallTasks, function(err, result) {
        if (err) {
            return waterfallCb(err);
        }

        resultArray = _.pluck(result, '_id');

        waterfallCb(null, resultArray);
    });
};