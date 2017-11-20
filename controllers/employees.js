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

var fs = require('fs'),
    _ = require('lodash'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    async = require('async');

const ObjectId = MODULE('utils').ObjectId;

exports.install = function() {

    var object = new Object();
    var jobPosition = new JobPosition();

    F.route('/erp/api/employees/dt', object.readDT, ['post', 'authorize']);

    F.route('/erp/api/employees/select', function() {
        var employeesModel = MODEL('Employees').Schema;
        var self = this;

        employeesModel.find({
            isremoved: {
                $ne: true
            },
            Status: {
                $ne: "DISABLE"
            }
        }, "name", {
            sort: {
                "name.last": 1
            }
        }, function(err, docs) {
            if (err)
                return self.throw500("err : /erp/api/employees/select {0}".format(err));

            var result = [];


            for (var i = 0, len = docs.length; i < len; i++) {
                //console.log(docs[i]);
                if (self.query.agenda) { // for calendar
                    result[i] = {};
                    result[i].text = docs[i].name.first + " " + docs[i].name.last;
                    result[i].value = docs[i]._id;
                    result[i].color = object.colors[i];
                } else if (self.query.lastname) {
                    result[i] = {};
                    result[i].name = docs[i].name.last;
                    result[i].id = docs[i]._id;
                } else {
                    result[i] = {};
                    result[i].firstname = docs[i].name.first;
                    result[i].lastname = docs[i].name.last;
                    result[i].name = docs[i].name.first + " " + docs[i].name.last;
                    result[i].id = docs[i]._id;
                    //console.log(result[i]);
                }
            }

            return self.json(result);
        });
    }, ['authorize']);
    F.route('/erp/api/employees/name/autocomplete', function() {
        var Employees = MODEL('Users').Schema;
        var self = this;

        //console.dir(self.body);

        var query = {};

        var filter = self.body.filter.filters[0].value.trim();
        //(david|doma) create regex or search if 2 words
        if (self.body.filter.filters[0].value.indexOf(" ")) {
            var search = filter.split(' ');
            search = _.map(search, function(text) {
                return text.trim();
            });

            filter = '(';
            for (var i = 0, len = search.length; i < len; i++) {
                filter += search[i];
                if (i + 1 !== len)
                    filter += '|';
            }
            filter += ')';
        }

        //console.log(filter);

        if (self.body.filter)
            query = {
                '$or': [{
                        firstname: new RegExp(filter, "i")
                    },
                    {
                        lastname: new RegExp(filter, "i")
                    }
                ]
            };

        if (self.query.status) {
            query.Status = {
                $in: self.query.status
            };
        } else {
            query.Status = {
                $ne: "DISABLE"
            };
        }

        Employees.find(query, {}, {
            limit: self.body.take
        }, function(err, docs) {
            if (err) {
                console.log("err : /api/user/name/autocomplete");
                console.log(err);
                return;
            }

            var result = [];

            if (docs !== null)
                for (var i in docs) {
                    //console.log(docs[i]);

                    result[i] = {};
                    if (self.query.lastname) {
                        result[i] = {};
                        result[i].name = docs[i].lastname;
                        result[i].id = docs[i]._id;
                        result[i].entity = docs[i].entity;
                    } else {
                        //result[i].name = docs[i].name;
                        result[i].name = docs[i].firstname + " " + docs[i].lastname;
                        result[i].id = docs[i]._id;
                        result[i].entity = docs[i].entity;
                    }
                }

            return self.json(result);
        });
    }, ['post', 'authorize']);

    F.route('/erp/api/employees/getJobPositionForDd', jobPosition.getForDd, ['authorize']);

    /**
     *@api {get} /employees/ Request Employees
     *
     * @apiVersion 0.0.1
     * @apiName getEmployees
     * @apiGroup Employee
     *
     * @apiParam (?Field=value) {String} viewType="thumbnails" Type of View
     * @apiParam (?Field=value) {Number} page=1 Number of page
     * @apiParam (?Field=value) {Number} count=50 Count of Employees which will show
     * @apiParam (?Field=value) {String} contentType="Employees" Type of content
     *
     * @apiSuccess {Object} Employees
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
         "total": 231,
         "data": [
             {
                 "_id": "577caddabfecefaf11e473e5",
                 "total": 231,
                 "jobPosition": {
                     "_id": "56e6b8b9701f50ac4d0a4974",
                     "name": "Copywriter"
                 },
                 "manager": {
                     "_id": "55b92ad221e4b7c40f000084",
                     "name": {
                         "last": "Dahno",
                         "first": "Alex"
                     }
                 },
                 "age": 18,
                 "relatedUser": {
                     "login": "AndrianaLemko"
                 },
                 "workPhones": {
                     "mobile": ""
                 },
                 "name": {
                     "last": "Ivanov",
                     "first": "Ivan"
                 },
                 "department": {
                     "_id": "55b92ace21e4b7c40f000015",
                     "name": "HR"
                 },
                 "dateBirth": "1998-07-03T00:00:00.000Z",
                 "isEmployee": true,
                 "editedBy": {
                     "date": "2016-07-06T07:06:02.199Z"
                 }
             },
             {
                 "_id": "577cad55bfecefaf11e473e4",
                 "total": 231,
                 "jobPosition": {
                     "_id": "55ddd8a2f09cc2ec0b000030",
                     "name": "CSS"
                 },
                 "manager": {
                     "_id": "564dac3e9b85f8b16b574fea",
                     "name": {
                         "last": "Filchak",
                         "first": "Alex"
                     }
                 },
                 "age": 18,
                 "relatedUser": {
                     "login": "admin"
                 },
                 "workPhones": {
                     "mobile": ""
                 },
                 "name": {
                     "last": "Ivanov",
                     "first": "Petya"
                 },
                 "dateBirth": "1998-07-02T00:00:00.000Z",
                 "isEmployee": true,
                 "editedBy": {
                     "date": "2016-07-06T07:03:49.914Z"
                 }
             },
            ...
         ]
     }
     * */

    F.route('/erp/api/employees', object.getByViewTpe, ['authorize']);
    F.route('/erp/api/employees/getForProjectDetails', object.getForProjectDetails, ['authorize']);

    /**
     *@api {get} /employees/getForDD/ Request Employees for dropDown
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesForDropDown
     * @apiGroup Employee
     *
     * @apiParam (?Field=value) {Boolean} isEmployee=true
     *
     * @apiSuccess {Object} EmployeesForDD
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
       "data": [
         {
           "_id": "55b92ad221e4b7c40f000030",
           "department": {
             "_id": "55bb1f40cb76ca630b000007",
             "sequence": 4,
             "nestingLevel": 1,
             "editedBy": {
               "date": "2016-03-30T11:20:27.579Z",
               "user": "52203e707d4dba8813000003"
             },
             "createdBy": {
               "date": "2015-07-31T07:09:52.155Z",
               "user": "52203e707d4dba8813000003"
             },
             "users": [

             ],
             "departmentManager": "55b92ad221e4b7c40f000030",
             "parentDepartment": "56e6775c5ec71b00429745a4",
             "__v": 0,
             "isDevelopment": false,
             "name": "PM"
           },
           "name": {
             "first": "Alex",
             "last": "Svatuk"
           },
           "isEmployee": true
         },
         {
           "_id": "55b92ad221e4b7c40f00004f",
           "department": {
             "_id": "55b92ace21e4b7c40f000014",
             "ID": 6,
             "sequence": 1,
             "nestingLevel": 1,
             "editedBy": {
               "date": "2016-03-14T08:34:00.655Z",
               "user": "52203e707d4dba8813000003"
             },
             "createdBy": {
               "date": "2015-07-29T19:34:38.909Z",
               "user": "52203e707d4dba8813000003"
             },
             "users": [

             ],
             "departmentManager": null,
             "parentDepartment": "56e6775c5ec71b00429745a4",
             "__v": 0,
             "isDevelopment": false,
             "name": "BusinessDev"
           },
           "name": {
             "last": "Sokhanych",
             "first": "Alex"
           },
           "isEmployee": true
         },
         ...
         ]
     }
     * */

    //F.route('/erp/api/employees/getForDD', object.getForDD, ['authorize']);

    F.route('/erp/api/employees/bySales', object.getBySales, ['authorize']);
    F.route('/erp/api/employees/bySalesAccount', object.getBySalesAccount, ['authorize']);
    F.route('/erp/api/employees/byDepartment', object.byDepartment, ['authorize']);
    F.route('/erp/api/employees/exportToXlsx', object.exportToXlsx, ['authorize']);
    F.route('/erp/api/employees/exportToCsv', object.exportToCsv, ['authorize']);
    // router.get('/exportToCsv', accessStackMiddleware, object.exportToCsv);
    F.route('/erp/api/employees/getForDdByRelatedUser', object.getForDdByRelatedUser, ['authorize']);

    /**
     *@api {get} /employees/getPersonsForDd/ Request Persons for dropDown
     *
     * @apiVersion 0.0.1
     * @apiName getPersonsForDd
     * @apiGroup Employee
     *
     * @apiSuccess {Object} PersonsForDd
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
       "data": [
         {
           "_id": "55b92ad221e4b7c40f000030",
           "name": {
             "last": "Svatuk",
             "first": "Alex"
           },
           "fullName": "Alex Svatuk",
           "id": "55b92ad221e4b7c40f000030"
         },
         {
           "_id": "55b92ad221e4b7c40f000031",
           "name": {
             "last": "Gleba",
             "first": "Alex"
           },
           "fullName": "Alex Gleba",
           "id": "55b92ad221e4b7c40f000031"
         },
         ...
         ]
     }
     */

    F.route('/erp/api/employees/getForDd', object.getSalesPerson, ['authorize']);

    /**
     *@api {get} /employees/getEmployeesAlphabet Request for Employees dropDown
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesAlphabet
     * @apiGroup Employee
     *
     * @apiParam (?Field=value) {Number} mid=39 Number of module
     *
     * @apiSuccess {Object} EmployeesAlphabet
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
       "data": [
         {
           "_id": "g"
         },
         {
           "_id": "M"
         },
         {
           "_id": "C"
         },
         {
           "_id": "K"
         },
         {
           "_id": "B"
         },
         {
           "_id": "O"
         },
         {
           "_id": "U"
         },
         {
           "_id": "v"
         },
         {
           "_id": "H"
         },
         {
           "_id": "G"
         },
         {
           "_id": "s"
         },
         {
           "_id": "A"
         },
         {
           "_id": "P"
         },
         {
           "_id": "N"
         },
         {
           "_id": "S"
         },
         {
           "_id": "Y"
         },
         {
           "_id": "R"
         },
         {
           "_id": "a"
         },
         {
           "_id": "I"
         },
         {
           "_id": "D"
         },
         {
           "_id": "V"
         },
         {
           "_id": "T"
         },
         {
           "_id": "F"
         },
         {
           "_id": "d"
         },
         {
           "_id": "Z"
         },
         {
           "_id": "L"
         }
       ]
     }
     */

    F.route('/erp/api/employees/getEmployeesAlphabet', object.getEmployeesAlphabet, ['authorize']);
    /**
     *@api {get} /employees/getEmployeesImages/ Request Employees images
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesImages
     * @apiGroup Employee
     *
     * @apiParam (?Field=value) {String} ids Unique Id of Employee
     *
     * @apiSuccess {Object} EmployeesImages
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
           "data": [
             {
               "_id": "55b92ad221e4b7c40f000065",
               "name": {
                 "last": "Sirko",
                 "first": "Yuriy"
               },
               "imageSrc": "data:image/jpeg;base64,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",
               "fullName": "Yuriy Sirko",
               "id": "55b92ad221e4b7c40f000065"
             },
             {
               "_id": "55b92ad221e4b7c40f00008d",
               "name": {
                 "last": "Kira",
                 "first": "Svitlana"
               },
               "imageSrc": "data:image/jpeg;base64,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",
               "fullName": "Svitlana Kira",
               "id": "55b92ad221e4b7c40f00008d"
             },
             ...
             ]
         }
     */

    F.route('/erp/api/employees/getEmployeesImages', object.getEmployeesImages, ['authorize']);

    /**
         *@api {get} /sources/ Request Employees sources
         *
         * @apiVersion 0.0.1
         * @apiName getEmployeesSources
         * @apiGroup Employee
         *
         * @apiSuccess {Object} EmployeesSources
         * @apiSuccessExample Success-Response:
         HTTP/1.1 304 Not Modified
         {
               "data": [
                 {
                   "_id": "Outbound",
                   "name": "Outbound",
                   "sequence": 0,
                   "__v": 0
                 },
                 {
                   "_id": "Web Organic",
                   "name": "Web Organic",
                   "sequence": 2,
                   "__v": 0
                 },
                 ...
               ]
         }
         */
    F.route('/erp/api/employees/sources', object.getSources, ['authorize']);
    /* router.get('/getByMonth', accessStackMiddleware, object.getSalaryByMonth);*/

    /**
     *@api {get} /employees/birthdays/ Request Employees birthdays
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesBirthdays
     * @apiGroup Employee
     *
     * @apiSuccess {Object} EmployeesBirthdays
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
         "data": {
             "weekly": [
                 {
                     "daysForBirth": 2,
                     "name": {
                         "first": "Andriy",
                         "last": "Lytvynenko"
                     },
                     "workPhones": {
                         "mobile": "+380501082280"
                     },
                     "department": null,
                     "jobPosition": {
                         "name": "Junior PHP",
                         "_id": "55f7c4a36d43203d0c000007"
                     },
                     "age": 31,
                     "dateBirth": "2016-07-13T00:00:00.000Z",
                     "_id": "56c59ba4d2b48ede4ba42266"
                 },
                 {
                     "daysForBirth": 4,
                     "name": {
                         "first": "Viktor",
                         "last": "Buchok"
                     },
                     "workPhones": {
                         "mobile": "+380501728565"
                     },
                     "department": null,
                     "jobPosition": {
                         "name": "Junior QA",
                         "_id": "55b92acf21e4b7c40f000018"
                     },
                     "age": 22,
                     "dateBirth": "2016-07-15T00:00:00.000Z",
                     "_id": "55b92ad221e4b7c40f000088"
                 },
                ...
             ],
             "nextweek": [
                 {
                     "daysForBirth": 8,
                     "name": {
                         "first": "Kostiantyn",
                         "last": "Mudrenok"
                     },
                     "workPhones": {
                         "mobile": "+380953512217"
                     },
                     "department": null,
                     "jobPosition": {
                         "name": "CSS",
                         "_id": "55ddd8a2f09cc2ec0b000030"
                     },
                     "age": 21,
                     "dateBirth": "2016-07-19T00:00:00.000Z",
                     "_id": "56b2287b99ce8d706a81b2bc"
                 },
                ...
             ],
             "monthly": [
                 {
                     "daysForBirth": -10,
                     "name": {
                         "first": "Eric",
                         "last": "Lembak"
                     },
                     "workPhones": {
                         "mobile": ""
                     },
                     "department": null,
                     "jobPosition": {
                         "name": "Chief Financial Officer",
                         "_id": "56011b2d93b361cd28000005"
                     },
                     "age": 18,
                     "dateBirth": "2016-07-01T00:00:00.000Z",
                     "_id": "5776276c88aa720358d3d848"
                 },
                 ...
             ]
         }
     }
     */

    F.route('/erp/api/employees/birthdays', object.getBirthdays, ['authorize']);
    /**
     *@api {get} /employees/getYears/ Request Years
     *
     * @apiVersion 0.0.1
     * @apiName getYears
     * @apiGroup Employee
     *
     * @apiSuccess {Object} Years
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
         "min": "2011-09-02T00:00:00.000Z"
     }
     */

    F.route('/erp/api/employees/getYears', object.getYears, ['authorize']);

    /**
     *@api {get} /employees/getEmployeesCount/ Request Employees count
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesCount
     * @apiGroup Employee
     *
     * @apiParam (?Field=value) {Number} month
     * @apiParam (?Field=value) {Number} year
     *
     * @apiSuccess {Object} EmployeesCount
     * @apiSuccessExample Success-Response:
     HTTP/1.1 304 Not Modified
     {
         "count":231
     }
     */

    F.route('/erp/api/employees/getEmployeesCount', object.getEmployeesCount, ['authorize']);
    F.route('/erp/api/employees/getEmployeesCountForDashboard', object.getEmployeesCountForDashboard, ['authorize']);
    /**
     *@api {get} /employees/EmployeesForChart/ Request EmployeesForChart
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesForChart
     * @apiGroup Employee
     *
     * @apiSuccess {Object} EmployeesForChart
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     [
     {
       "_id": "Finance",
       "employeesCount": 3,
       "maleCount": 1,
       "femaleCount": 2
     },
     {
       "_id": "Marketing",
       "employeesCount": 7,
       "maleCount": 2,
       "femaleCount": 5
     },
     ...
     ]
     */

    F.route('/erp/api/employees/EmployeesForChart', object.getEmployeesForChart, ['authorize']);

    /**
     *@api {get} /employees/byDepartmentForChart/ Request EmployeesByDepartmentForChart
     *
     * @apiVersion 0.0.1
     * @apiName getEmployeesByDepartmentForChart
     * @apiGroup Employee
     *
     * @apiSuccess {Object} EmployeesByDepartmentForChart
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
       "_id": null,
       "name": "Departments",
       "children": [
         {
           "_id": "56e6775c5ec71b00429745a4",
           "departments": [
             {
               "_id": "560c0b83a5d4a2e20ba5068c",
               "name": "Finance",
               "employees": [
                 {
                   "_id": "56014cc8536bd29228000007",
                   "name": "Yevgenia Bezyk"
                 },
                 {
                   "_id": "56cdd88b541812c071973585",
                   "name": "Nelya Plovayko"
                 },
                 {
                   "_id": "56cf0928541812c071973593",
                   "name": "Tetiana Shepitko"
                 }
               ],
               "parentDepartment": "56e6775c5ec71b00429745a4"
             },
             {
               "_id": "55bb1f40cb76ca630b000007",
               "name": "PM",
               "employees": [
                 {
                   "_id": "55b92ad221e4b7c40f000030",
                   "name": "Alex Svatuk"
                 },
                 {
                   "_id": "55b92ad221e4b7c40f000086",
                   "name": "Roman Kubichka"
                 },
                 ...
               ],
               "parentDepartment": "56e6775c5ec71b00429745a4"
             },
             ...
           ],
           "name": "Service"
         }
       ]
     }
     * */

    F.route('/erp/api/employees/byDepartmentForChart', object.byDepartmentForChart, ['authorize']);
    F.route('/erp/api/employees/getSalaryForChart', object.getSalaryForChart, ['authorize']);
    F.route('/erp/api/employees/getSalaryByDepartment', object.getSalaryForChartByDepartment, ['authorize']);
    F.route('/erp/api/employees/settings', object.getSettings, ['authorize']);
    F.route('/erp/api/employees/{userId}', object.getByViewTpe, ['authorize']);
    //F.route('/erp/api/employees/{userId}', object.forProfile, ['authorize']);

    /**
     *@api {post} /employees/ Request for creating Employee
     *
     * @apiVersion 0.0.1
     * @apiName createNewEmployee
     * @apiGroup Employee
     *
     * @apiParamExample {json} Request-Example:
     {
       "isEmployee": true,
       "imageSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
       "name": {
         "first": "David",
         "last": "Silva"
       },
       "gender": "male",
       "marital": "married",
       "tags": [
         ""
       ],
       "workAddress": {
         "street": "",
         "city": "",
         "state": "",
         "zip": "",
         "country": ""
       },
       "workEmail": "david.work@gmail.com",
       "personalEmail": "david@gmail.com",
       "workPhones": {
         "phone": "0500090999",
         "mobile": "0506677044"
       },
       "skype": "",
       "officeLocation": "",
       "relatedUser": null,
       "visibility": "Public",
       "department": "57835523828f9c302171c2eb",
       "jobPosition": "55eeeddd6dceaee10b00001f",
       "nationality": "British",
       "identNo": "",
       "passportNo": "",
       "bankAccountNo": "",
       "otherId": "",
       "homeAddress": {
         "street": "",
         "city": "",
         "state": "",
         "zip": "",
         "country": ""
       },
       "source": "www.rabota.ua",
       "dateBirth": "3 Jul, 1998",
       "hire": [
         "2016-07-10T21:00:00.000Z"
       ],
       "fire": [
         "2016-07-10T21:00:00.000Z"
       ],
       "notes": [

       ],
       "jobType": "Full-time",
       "social": {
         "LI": "",
         "FB": ""
       },
       "manager": "55b92ad221e4b7c40f000044",
       "coach": null,
       "weeklyScheduler": "57332c3b94ee1140b6bb49e2",
       "lastFire": 201628,
       "groups": {
         "owner": null,
         "users": [

         ],
         "group": [

         ]
       },
       "whoCanRW": "everyOne",
       "transfer": [
         {
           "status": "hired",
           "date": "2016-07-10T21:00:00.000Z",
           "department": "57835523828f9c302171c2eb",
           "jobPosition": "55eeeddd6dceaee10b00001f",
           "manager": "55b92ad221e4b7c40f000044",
           "jobType": "Full-time",
           "salary": 0,
           "info": "",
           "weeklyScheduler": "57332c3b94ee1140b6bb49e2"
         }
       ]
     }
     *
     * @apiSuccess {Object} NewEmployee Just created Employee
     * @apiSuccessExample Success-Response:
     HTTP/1.1 201 Created
     {
       "success": "A new Employees create success",
       "result": {
         "__v": 0,
         "identNo": "",
         "passportNo": "",
         "dateBirth": "1998-07-03T00:00:00.000Z",
         "_id": "578385a2f6a68a7d3b37eab6",
         "lastFire": 201628,
         "transfer": [
           {
             "isDeveloper": false,
             "date": "2016-07-10T21:00:00.000Z",
             "info": "",
             "salary": 0,
             "jobType": "Full-time",
             "weeklyScheduler": "57332c3b94ee1140b6bb49e2",
             "manager": "55b92ad221e4b7c40f000044",
             "jobPosition": "55eeeddd6dceaee10b00001f",
             "department": "57835523828f9c302171c2eb",
             "status": "hired"
           }
         ],
         "fire": [
           "2016-07-10T21:00:00.000Z"
         ],
         "hire": [
           "2016-07-10T21:00:00.000Z"
         ],
         "social": {
           "GP": "",
           "LI": "",
           "FB": ""
         },
         "sequence": 247,
         "jobType": "Full-time",
         "gender": "male",
         "marital": "married",
         "contractEnd": {
           "date": "2016-07-11T11:40:18.318Z",
           "reason": ""
         },
         "notes": [

         ],
         "attachments": [

         ],
         "editedBy": {
           "date": "2016-07-11T11:40:18.336Z",
           "user": "52203e707d4dba8813000003"
         },
         "createdBy": {
           "date": "2016-07-11T11:40:18.336Z",
           "user": "52203e707d4dba8813000003"
         },
         "creationDate": "2016-07-11T11:40:18.318Z",
         "color": "#4d5a75",
         "otherInfo": "",
         "groups": {
           "group": [

           ],
           "users": [

           ],
           "owner": null
         },
         "whoCanRW": "everyOne",
         "workflow": null,
         "referredBy": "",
         "source": "www.rabota.ua",
         "age": 18,
         "homeAddress": {
           "country": "",
           "zip": "",
           "state": "",
           "city": "",
           "street": ""
         },
         "otherId": "",
         "bankAccountNo": "",
         "nationality": "British",
         "coach": null,
         "manager": "55b92ad221e4b7c40f000044",
         "weeklyScheduler": "57332c3b94ee1140b6bb49e2",
         "jobPosition": "55eeeddd6dceaee10b00001f",
         "department": "57835523828f9c302171c2eb",
         "visibility": "Public",
         "relatedUser": null,
         "officeLocation": "",
         "skype": "",
         "workPhones": {
           "phone": "0500090999",
           "mobile": "0506677044"
         },
         "personalEmail": "david@gmail.com",
         "workEmail": "david.work@gmail.com",
         "workAddress": {
           "country": "",
           "zip": "",
           "state": "",
           "city": "",
           "street": ""
         },
         "tags": [
           ""
         ],
         "name": {
           "last": "Silva",
           "first": "David"
         },
         "subject": "",
         "imageSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
         "isEmployee": true,
         "fullName": "David Silva",
         "id": "578385a2f6a68a7d3b37eab6"
       },
       "id": "578385a2f6a68a7d3b37eab6"
     }
     */

    F.route('/erp/api/employees', object.create, ['post', 'json', 'authorize']);
    F.route('/erp/api/employees/transfer', object.createTransfer, ['post', 'json', 'authorize']);

    F.route('/erp/api/employees/uploadFiles', object.uploadFile, ['upload', 'authorize'], 2048);
    F.route('/erp/api/employees/settings', object.setSettings, ['post', 'json', 'authorize']);

    F.route('/erp/api/employees/settings/', object.setSettings, ['put', 'json', 'authorize']);

    F.route('/erp/api/employees/transfer', object.updateTransfer, ['patch', 'json', 'authorize']);
    F.route('/erp/api/employees/{userId}', object.updateOnlySelectedFields, ['put', 'json', 'authorize']);


    /**
     *@api {delete} /employees/:id Request for deleting employee
     *
     * @apiVersion 0.0.1
     * @apiName deleteEmployee
     * @apiGroup Employee
     *
     * @apiParam {String} id Unique id of employee
     *
     * @apiSuccess {Object} deletedEmployee
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
         "success":"Employee removed"
     }
     * */



    F.route('/erp/api/employees/transfer', object.removeTransfer, ['delete', 'authorize']);
    F.route('/erp/api/employees/{userId}', object.remove, ['delete', 'authorize']);

    /**
     *@api {delete} /employees/ Request for deleting a few employees
     *
     * @apiVersion 0.0.1
     * @apiName deleteFewEmployees
     * @apiGroup Employee
     *
     * @apiParamExample {json} Request-Example:
     {
           "contentType": "Employees",
           "ids": [
             "577caddabfecefaf11e473e5",
             "577cad55bfecefaf11e473e4"
           ]
     }
     *
     * @apiSuccess {Object} deletedEmployees
     * @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
       "success": true
     }
     */

    F.route('/erp/api/employees/', object.bulkRemove, ['delete', 'authorize']);
};

function Object() {}

Object.prototype = {
    read: function() {
        var Employees = MODEL('Employees').Schema;
        var self = this;
        Employees.find({}, function(err, doc) {
            if (err)
                return self.throw500(err);

            self.json(doc);
        });
    },
    readDT: function() {
        var self = this;
        var EmployeesModel = MODEL('Employees').Schema;
        var DepartmentModel = MODEL('Department').Schema;
        var query = JSON.parse(self.body.query);
        var Status;
        //console.log(self.query);
        var conditions = {
            isremoved: {
                $ne: true
            },
            entity: self.query.entity
        };

        if (!query.search.value) {
            if (self.query.status_id) {
                conditions.Status = self.query.status_id;
            }
        } else
            delete conditions.Status;


        //if (!self.user.multiEntities)
        //    conditions.entity = self.user.entity;

        //console.log(self.query);

        var options = {
            conditions: conditions
            //select: ""
        };

        //console.log(options);

        async.parallel({
            status: function(cb) {
                cb(null, MODEL('Employees').Status);
            },
            datatable: function(cb) {
                EmployeesModel.dataTable(query, options, cb);
            }
        }, function(err, res) {
            if (err)
                return self.throw500(err);

            //console.log(res);

            DepartmentModel.populate(res.datatable.data, {
                path: "department"
            }, function(err, lines) {
                if (err)
                    return self.throw500(err);

                EmployeesModel.populate(res.datatable.data, {
                    path: "manager"
                }, function(err, lines) {
                    if (err)
                        return self.throw500(err);

                    EmployeesModel.populate(res.datatable.data, {
                        path: "editedBy"
                    }, function(err, lines) {
                        if (err)
                            return self.throw500(err);

                        EmployeesModel.populate(res.datatable.data, {
                            path: "createdBy"
                        }, function(err, lines) {
                            if (err)
                                return self.throw500(err);

                            for (var i = 0, len = res.datatable.data.length; i < len; i++) {
                                var row = lines[i];
                                //console.log(row);
                                // Add checkbox
                                res.datatable.data[i].bool = '<input type="checkbox" name="id[]" value="' + row._id + '"/>';
                                // Add link company                

                                // Add id
                                res.datatable.data[i].DT_RowId = row._id.toString();

                                res.datatable.data[i].name.first = '<a class="with-tooltip" href="#!/employee/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.name.first + '"><span class="fa fa-user"></span> ' + row.name.first + '</a>';

                                res.datatable.data[i].Status = (res.status.values[row.Status] ? '<span class="label label-sm ' + res.status.values[row.Status].cssClass + '">' + i18n.t(res.status.values[row.Status].label) + '</span>' : row.Status);
                                res.datatable.data[i].department = (row.department ? row.department.name : "");
                                res.datatable.data[i].manager = (row.manager ? row.manager.name : "");
                                res.datatable.data[i].editedBy = (row.editedBy ? row.editedBy.name : "");
                                res.datatable.data[i].createdBy = (row.createdBy ? row.createdBy.name : "");

                                if (row.imageSrc)
                                    res.datatable.data[i].imageSrc = '<img width="32" height="32" src="/erp/api/file/product/' + row.imageSrc + '"/>';
                                else
                                    res.datatable.data[i].imageSrc = '<img width="32" height="32" src="/assets/admin/layout/img/nophoto.jpg"/>';

                                // Action
                                res.datatable.data[i].action = '<a href="#!/employee/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '" class="btn btn-xs default"><i class="fa fa-search"></i> View</a>';
                                // Add url on name
                                res.datatable.data[i].ref = '<a class="with-tooltip" href="#!/employee/' + row._id + '" data-tooltip-options=\'{"position":"top"}\' title="' + row.login + '"><span class="fa fa-money"></span> ' + row.login + '</a>';
                                // Convert Date
                                //res.datatable.data[i].LastConnection = (row.LastConnection ? moment(row.LastConnection).format(CONFIG('dateformatShort')) : '');
                                //res.datatable.data[i].updatedAt = (row.updatedAt ? moment(row.updatedAt).format(CONFIG('dateformatShort')) : '');
                            }

                            //console.log(res.datatable);

                            self.json(res.datatable);
                        });
                    });
                });
            });
        });
    },


    exportToXlsx: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;

        var filter = self.query.filter ? JSON.parse(self.query.filter) : JSON.stringify({});
        var type = self.query.type;
        var filterObj = {};
        var options;

        if (filter && typeof filter === 'object') {
            filterObj = filterMapper.mapFilter(filter, {
                contentType: 'Employees'
            });
        }

        options = {
            res: res,
            next: next,
            Model: Model,
            map: exportMap,
            returnResult: true,
            fileName: type
        };

        function lookupForEmployee(cb) {
            var query = [];
            var i;

            query.push({
                $match: {
                    isEmployee: type === 'Employees'
                }
            });

            for (i = 0; i < lookupForEmployeeArray.length; i++) {
                query.push(lookupForEmployeeArray[i]);
            }

            query.push({
                $match: filterObj
            });

            options.query = query;
            options.cb = cb;

            exporter.exportToXlsx(options);
        }

        async.parallel([lookupForEmployee], function(err, result) {
            var resultArray = result[0];

            exporter.exportToXlsx({
                res: res,
                next: next,
                Model: Model,
                resultArray: resultArray,
                map: exportMap,
                fileName: type
            });
        });

    },
    exportToCsv: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;

        var filter = self.query.filter ? JSON.parse(self.query.filter) : JSON.stringify({});
        var type = self.query.type;
        var filterObj = {};
        var options;

        if (filter && typeof filter === 'object') {
            filterObj = filterMapper.mapFilter(filter, {
                contentType: 'Employees'
            });
        }

        options = {
            res: res,
            next: next,
            Model: Model,
            map: exportMap,
            returnResult: true,
            fileName: type
        };

        function lookupForEmployee(cb) {
            var query = [];
            var i;

            query.push({
                $match: {
                    isEmployee: type === 'Employees'
                }
            });

            for (i = 0; i < lookupForEmployeeArray.length; i++) {
                query.push(lookupForEmployeeArray[i]);
            }

            query.push({
                $match: filterObj
            });

            options.query = query;
            options.cb = cb;

            exporter.exportToCsv(options);
        }

        async.parallel([lookupForEmployee], function(err, result) {
            var resultArray = result[0];

            exporter.exportToCsv({
                res: res,
                next: next,
                Model: Model,
                resultArray: resultArray,
                map: exportMap,
                fileName: type
            });
        });

    },
    getNameAndDepartment: getNameAndDepartment,
    getEmployeesCount: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;

        Model.find({
            isEmployee: true
        }).count(function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                count: result
            });
        });
    },
    getEmployeesCountForDashboard: function() {
        var self = this;
        var Employee = MODEL('Employees').Schema;
        var month = parseInt(self.query.month, 10) + 1;
        var year = parseInt(self.query.year, 10);
        var startMomentDate = moment().year(year).month(month - 1).startOf('month');
        var endMomentDate = moment().year(year).month(month - 1).endOf('month');
        var startDate = year * 100 + moment(startMomentDate).week();
        var endDate = year * 100 + moment(endMomentDate).week();
        var employeeQueryForEmployeeByDep = {
            $and: [{
                $or: [{
                    $and: [{
                        isEmployee: true
                    }, {
                        $or: [{
                            lastFire: null,
                            lastHire: {
                                $ne: null,
                                $lte: endDate
                            }
                        }, {
                            lastFire: {
                                $ne: null,
                                $gte: startDate
                            }
                        }, {
                            lastHire: {
                                $ne: null,
                                $lte: endDate
                            }
                        }]
                    }]
                }, {
                    $and: [{
                        isEmployee: false
                    }, {
                        lastFire: {
                            $ne: null,
                            $gte: startDate
                        }
                    }, {
                        lastHire: {
                            $ne: null,
                            $lte: endDate
                        }
                    }]
                }]
            }]
        };

        function isEmployee(callback) {
            Employee.aggregate([{
                $match: {
                    isEmployee: true
                }
            }, {
                $lookup: {
                    from: 'transfers',
                    localField: '_id',
                    foreignField: 'employee',
                    as: 'transfer'
                }
            }, {
                $project: {
                    lastFire: 1,
                    hire: 1,
                    fire: 1,
                    isEmployee: 1,
                    lastHire: {
                        $let: {
                            vars: {
                                lastHired: {
                                    $arrayElemAt: [{
                                        $slice: ['$hire', -1]
                                    }, 0]
                                }
                            },

                            in: {
                                $add: [{
                                    $multiply: [{
                                        $year: '$$lastHired'
                                    }, 100]
                                }, {
                                    $week: '$$lastHired'
                                }]
                            }
                        }
                    }
                }
            }, {
                $match: employeeQueryForEmployeeByDep
            }, {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }], function(err, result) {
                var count;

                if (err) {
                    return callback(err);
                }

                count = result && result.length ? result[0].count : 0;

                callback(null, count);
            });
        }

        function hired(callback) {
            Employee.aggregate([{
                $match: {
                    isEmployee: true
                }
            }, {
                $lookup: {
                    from: 'transfers',
                    localField: '_id',
                    foreignField: 'employee',
                    as: 'transfer'
                }
            }, {
                $project: {
                    lastFire: 1,
                    hire: 1,
                    fire: 1,
                    isEmployee: 1,
                    lastHire: {
                        $let: {
                            vars: {
                                lastHired: {
                                    $arrayElemAt: [{
                                        $slice: ['$hire', -1]
                                    }, 0]
                                }
                            },

                            in: {
                                $add: [{
                                    $multiply: [{
                                        $year: '$$lastHired'
                                    }, 100]
                                }, {
                                    $week: '$$lastHired'
                                }]
                            }
                        }
                    }
                }
            }, {
                $match: {
                    $and: [{
                        lastFire: null,
                        lastHire: {
                            $ne: null,
                            $gte: startDate
                        }
                    }, {
                        lastHire: {
                            $ne: null,
                            $lte: endDate
                        }
                    }]
                }
            }, {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }], function(err, result) {
                var count;

                if (err) {
                    return callback(err);
                }

                count = result && result.length ? result[0].count : 0;

                callback(null, count);
            });
        }

        function fired(callback) {
            Employee.aggregate([{
                $match: {
                    isEmployee: false,
                    hire: {
                        $ne: []
                    }
                }
            }, {
                $lookup: {
                    from: 'transfers',
                    localField: '_id',
                    foreignField: 'employee',
                    as: 'transfer'
                }
            }, {
                $project: {
                    lastFire: 1,
                    hire: 1,
                    fire: 1,
                    isEmployee: 1,
                    lastHire: {
                        $let: {
                            vars: {
                                lastHired: {
                                    $arrayElemAt: [{
                                        $slice: ['$hire', -1]
                                    }, 0]
                                }
                            },

                            in: {
                                $add: [{
                                    $multiply: [{
                                        $year: '$$lastHired'
                                    }, 100]
                                }, {
                                    $week: '$$lastHired'
                                }]
                            }
                        }
                    }
                }
            }, {
                $match: {
                    $and: [{
                        isEmployee: false
                    }, {
                        lastFire: {
                            $ne: null,
                            $gte: startDate
                        }
                    }, {
                        lastHire: {
                            $ne: null,
                            $lte: endDate
                        }
                    }]
                }
            }, {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    }
                }
            }], function(err, result) {
                var count;

                if (err) {
                    return callback(err);
                }

                count = result && result.length ? result[0].count : 0;

                callback(null, count);
            });
        }

        async.parallel([
            isEmployee,
            hired,
            fired
        ], function(err, result) {
            var employeeCount;
            var hiredCount;
            var firedCount;

            if (err) {
                return self.throw500(err);
            }

            result = result && result.length ? result : [];

            employeeCount = result[0];
            hiredCount = result[1];
            firedCount = result[2];

            self.json({
                employeeCount: employeeCount,
                hiredCount: hiredCount,
                firedCount: firedCount
            });
        });
    },
    getSalaryForChart: function() {
        var self = this;
        var Employee = MODEL('Employees').Schema;
        var query = self.query;
        var month = parseInt(query.month, 10) + 1;
        var year = parseInt(query.year, 10);
        var startMomentDate = moment().year(year).month(month - 1).startOf('month');
        var endMomentDate = moment().year(year).month(month - 1).endOf('month');
        var startDate = new Date(startMomentDate);
        var endDate = new Date(endMomentDate);

        Employee.aggregate([{
            $project: {
                transfer: 1,
                isEmployee: 1
            }
        }, {
            $lookup: {
                from: 'transfers',
                localField: '_id',
                foreignField: 'employee',
                as: 'transfer'
            }
        }, {
            $unwind: '$transfer'
        }, {
            $project: {
                _id: 1,
                isEmployee: 1,
                date: '$transfer.date',
                salary: '$transfer.salary'
            }
        }, {
            $match: {
                $and: [{
                    isEmployee: true
                }, {
                    date: {
                        $ne: null,
                        $lte: endDate
                    }
                }]
            }
        }, {
            $group: {
                _id: '$_id',
                salary: {
                    $last: '$salary'
                }
            }
        }, {
            $project: {
                _id: '$salary'
            }
        }], function(err, result) {
            var salary;

            if (err) {
                return self.throw500(err);
            }

            salary = _.map(result, function(item) {
                return item._id;
            });

            self.json({
                data: salary
            });
        });
    },
    getSalaryForChartByDepartment: function() {
        var self = this;
        var Employee = MODEL('Employees').Schema;
        var query = self.query;
        var month = parseInt(query.month, 10) + 1;
        var year = parseInt(query.year, 10);
        var startMomentDate = moment().year(year).month(month - 1).startOf('month');
        var endMomentDate = moment().year(year).month(month - 1).endOf('month');
        var startDate = new Date(startMomentDate);
        var endDate = new Date(endMomentDate);

        Employee.aggregate([{
            $project: {
                transfer: 1,
                isEmployee: 1
            }
        }, {
            $lookup: {
                from: 'transfers',
                localField: '_id',
                foreignField: 'employee',
                as: 'transfer'
            }
        }, {
            $unwind: '$transfer'
        }, {
            $project: {
                _id: 1,
                isEmployee: 1,
                date: '$transfer.date',
                salary: '$transfer.salary',
                department: '$transfer.department'
            }
        }, {
            $lookup: {
                from: 'Department',
                localField: 'department',
                foreignField: '_id',
                as: 'department'
            }
        }, {
            $match: {
                $and: [{
                    isEmployee: true
                }, {
                    date: {
                        $ne: null,
                        $lte: endDate
                    }
                }]
            }
        }, {
            $group: {
                _id: '$_id',
                salary: {
                    $last: '$salary'
                },
                department: {
                    $first: '$department'
                } //{$push: ['$department', 0]}*/
            }
        }, {
            $group: {
                _id: '$department',
                salary: {
                    $sum: '$salary'
                }
            }
        }, {
            $project: {
                _id: '$_id.name',
                salary: 1
            }
        }], function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                data: result
            });
        });
    },
    getYears: function() {
        var self = this;
        var Employee = MODEL('Employees').Schema;

        Model.aggregate([{
            $project: {
                hire: 1
            }
        }, {
            $unwind: '$hire'
        }, {
            $project: {
                date: '$hire'
            }
        }, {
            $group: {
                _id: '$date'
            }
        }], function(err, result) {
            var arr;
            var min;

            if (err) {
                return self.throw500(err);
            }

            arr = _.pluck(result, '_id');
            min = _.min(arr);

            self.json({
                min: min
            });
        });

    },
    getForDD: function() {
        var self = this;
        var query = self.query;

        getNameAndDepartment(query, function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                data: result
            });
        });
    },
    getBySales: function() {
        var Model = MODEL('Employees').Schema;
        var Project = MODEL('Project').Schema;

        function assigneFinder(cb) {
            var match = {
                projectmanager: {
                    $ne: null
                }
            };

            Project.aggregate([{
                $match: match
            }, {
                $group: {
                    _id: '$projectmanager'
                }
            }], cb);
        }

        function employeeFinder(assignedArr, cb) {
            Model
                .find({
                    _id: {
                        $in: assignedArr
                    }
                })
                .select('_id name')
                .sort({
                    'name.first': 1,
                    'name.last': 1
                })
                .lean()
                .exec(cb);
        }

        async.waterfall([assigneFinder, employeeFinder], function(err, employees) {
            if (err) {
                return self.throw500(err);
            }

            self.json(employees);
        });

    },
    getBySalesAccount: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var CustomerModel = MODEL('Customers').Schema;

        CustomerModel.aggregate([{
                $match: {
                    "salesPurchases.isActive": true,
                    'salesPurchases.salesPerson': {
                        $ne: null
                    }
                }
            }, {
                $project: {
                    salesPerson: "$salesPurchases.salesPerson"
                }
            },
            {
                $group: {
                    _id: '$salesPerson',
                    count: {
                        "$sum": 1
                    }
                }
            },
            {
                $lookup: {
                    from: 'Employees',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'employees'
                }
            }, {
                $unwind: {
                    path: '$employees',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $match: {
                    employees: {
                        $ne: null
                    }
                }
            }, {
                $project: {
                    _id: 1,
                    count: 1,
                    name: "$employees.name",
                    fullName: {
                        $concat: ['$employees.name.first', ' ', '$employees.name.last']
                    }
                }
            }, {
                $sort: {
                    'fullName': 1
                }
            }
        ], function(err, employees) {
            if (err)
                return self.throw500(err);

            self.json({
                data: employees
            });
        });

    },
    getEmployeesForChart: function() {
        var self = this;
        var Employee = MODEL('Employees').Schema;

        Employee
            .aggregate([{
                $match: {
                    isEmployee: true
                }
            }, {
                $lookup: {
                    from: 'Department',
                    localField: 'department',
                    foreignField: '_id',
                    as: 'department'
                }
            }, {
                $project: {
                    department: {
                        $arrayElemAt: ['$department', 0]
                    },
                    gender: 1,
                    name: 1
                }
            }, {
                $group: {
                    _id: '$department',
                    employeesCount: {
                        $sum: 1
                    },

                    maleCount: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ['$gender', 'male']
                                },

                                then: 1,
                                else: 0
                            }
                        }
                    },

                    femaleCount: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ['$gender', 'female']
                                },

                                then: 1,
                                else: 0
                            }
                        }
                    }
                }
            }, {
                $project: {
                    _id: '$_id.name',
                    employeesCount: 1,
                    maleCount: 1,
                    femaleCount: 1
                }
            }], function(err, employees) {
                if (err) {
                    return self.throw500(err);
                }

                self.json(employees);
            });
    },
    byDepartmentForChart: function() {
        var self = this;
        var Department = MODEL('Department').Schema;

        Department.aggregate([{
            $lookup: {
                from: 'Employees',
                localField: '_id',
                foreignField: 'department',
                as: 'employees'
            }
        }, {
            $unwind: '$employees'
        }, {
            $match: {
                'employees.isEmployee': true
            }
        }, {
            $project: {
                employees: {
                    name: {
                        $concat: ['$employees.name.first', ' ', '$employees.name.last']
                    },
                    _id: '$employees._id'
                },

                parentDepartment: 1,
                _id: 1,
                name: 1
            }
        }, {
            $group: {
                _id: '$_id',
                parentDepartment: {
                    $push: '$parentDepartment'
                },
                name: {
                    $push: '$name'
                },
                employees: {
                    $push: '$employees'
                }
            }
        }, {
            $project: {
                employees: 1,
                parentDepartment: {
                    $arrayElemAt: ['$parentDepartment', 0]
                },
                _id: 1,
                name: {
                    $arrayElemAt: ['$name', 0]
                }
            }
        }, {
            $group: {
                _id: '$parentDepartment',
                departments: {
                    $push: {
                        _id: '$_id',
                        name: '$name',
                        employees: '$employees',
                        parentDepartment: '$parentDepartment'
                    }
                }
            }
        }, {
            $lookup: {
                from: 'Department',
                localField: '_id',
                foreignField: '_id',
                as: 'parent'
            }
        }, {
            $project: {
                _id: 1,
                departments: 1,
                selfData: {
                    $arrayElemAt: ['$parent', 0]
                }
            }
        }, {
            $lookup: {
                from: 'Department',
                localField: 'selfData.parentDepartment',
                foreignField: '_id',
                as: 'mainParent'
            }
        }, {
            $project: {
                _id: 1,
                departments: 1,
                name: '$selfData.name',
                parent: {
                    $arrayElemAt: ['$mainParent', 0]
                }
            }
        }, {
            $match: {
                _id: {
                    $ne: null
                }
            }
        }], function(err, result) {
            var data = {};

            if (err) {
                return self.throw500(err);
            }

            result.forEach(function(item) {
                if (item && item.departments) {
                    item.departments.forEach(function(department) {
                        var d = _.find(result, function(el) {
                            return department._id && el._id ? department._id.toString() === el._id.toString() : null;
                        });

                        if (d && d.departments) {
                            department.departments = d.departments;
                            result.splice(result.indexOf(d), 1);
                        }

                        if (department.name === 'Web') {
                            department.departments.push({
                                name: 'JS',
                                employees: department.employees,
                                parentDepartment: department._id
                            });

                            department.employees = null;
                        }
                    });
                }
            });

            data._id = null;
            data.name = 'Departments';
            data.children = result;

            self.json(data);
        });
    },
    byDepartment: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;

        Model
            .aggregate([{
                $match: {
                    isEmployee: true
                }
            }, {
                $group: {
                    _id: '$department',
                    employees: {
                        $push: {
                            name: {
                                $concat: ['$name.first', ' ', '$name.last']
                            },
                            _id: '$_id'
                        }
                    }
                }
            }, {
                $project: {
                    department: '$_id',
                    employees: 1,
                    _id: 0
                }
            }], function(err, employees) {
                if (err) {
                    return self.throw500(err);
                }

                self.json(employees);
            });
    },
    getForProjectDetails: function() {
        var self = this;
        var idsArray = self.query.data || [];
        var Model = MODEL('Employees').Schema;

        Model
            .find({
                _id: {
                    $in: idsArray
                }
            })
            .populate('jobPosition', '_id name')
            .populate('department', '_id name')
            .exec(function(err, result) {
                if (err) {
                    return self.throw500(err);
                }

                self.json(result);
            });

    },
    create: function() {
        var self = this;
        const Model = MODEL('Employees').Schema;
        var validatorEmployee = MODULE('validator');
        var userId = self.user._id;
        var currentDate = new Date();
        var body = self.body;
        var err;
        var noteObj;

        if (body.dateBirth) {
            body.dateBirth = getDate(body.dateBirth);
            body.age = getAge(body.dateBirth);
        }

        if (body.notes && body.notes.length) {
            body.notes[0]._id = mongoose.Types.ObjectId();
            body.notes[0].date = currentDate;

            noteObj = body.notes[0];

            noteObj._id = mongoose.Types.ObjectId();
            noteObj.date = currentDate;
            noteObj.author = self.user._id;
        }

        if (body.transfer && body.transfer.length) {
            body.transfer[0].salary = body.transfer[0].salary || 0;
        }

        if (!validatorEmployee.validEmployeeBody(body)) {
            return self.json({
                errorNotify: {
                    title: 'Erreur',
                    message: 'Donnees manquantes'
                }
            });
        }

        body.createdBy = userId;
        body.editedBy = userId;
        body.createdAt = currentDate;
        body.updatedAt = currentDate;

        function create(body, callback) {
            var waterfallTasks;
            var password;
            var email;

            function employeeCreator(waterfallCb) {
                let employee = new Model(body);
                employee.save(function(err, doc) {
                    if (err)
                        return waterfallCb(err);

                    waterfallCb(null, doc);
                });
            }

            function defaultProfile(employee, waterfallCb) {
                // LOAD DEFAULT PROFILE
                //{_id: 1387275598000, profileName: 'admin'}
                waterfallCb(null, employee, 1387275598000);
            }

            function userCreator(employee, profileId, waterfallCb) {
                var _user;
                const UserModel = MODEL('Users').Schema;

                console.log(body, employee);

                email = employee.emails.work || employee.emails.personal;

                _user = {
                    username: body.name.first[0].toLowerCase() + body.name.last.toLowerCase(),
                    imageSrc: employee.imageSrc,
                    profile: profileId,
                    email: email,
                    relatedEmployee: employee._id,
                };

                let user = new UserModel(_user);
                user.generatePassword(8);

                user.save(function(err, user) {
                    if (err)
                        return waterfallCb(err);

                    waterfallCb(null, employee, user);
                });
            }

            function employeeUpdater(employee, user, waterfallCb) {
                var _id = employee._id;

                Model.findByIdAndUpdate(_id, {
                    relatedUser: user._id
                }, {
                    new: true
                }, waterfallCb);
            }

            waterfallTasks = [employeeCreator];

            if (body.isEmployee)
                waterfallTasks.push(defaultProfile, userCreator, employeeUpdater);

            async.waterfall(waterfallTasks, callback);
        }

        /* if (!body.isEmployee) {
             F.emit('updateSequence', Model, 'sequence', 0, 0, body.workflow, body.workflow, true, false, function(sequence) {
                 body.sequence = sequence;

                 create(body, function(err, employee) {
                     if (err) {
                         return self.throw500(err);
                     }

                     res.status(201).send({
                         result: employee,
                         id: employee._id
                     });
                 });
             });
         } else {*/
        create(body, function(err, employee) {
            if (err)
                return self.json({
                    errorNotify: {
                        title: 'Erreur',
                        message: err
                    }
                });


            self.json(employee);
        });
    },
    createTransfer: function() {
        var Model = MODEL('transfers').Schema;
        var body = self.body;
        var transfer = new Model(body);

        transfer.save(function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            res.send(201, {
                success: 'A new Transfer create success' /* , data: result*/
            });
        });
    },
    updateTransfer: function() {
        var Model = MODEL('transfers').Schema;
        var body = self.body;

        async.each(body, function(data, cb) {
            var id = data._id;

            delete data._id;

            Model.findByIdAndUpdate(id, {
                $set: data
            }, {
                new: true
            }, function(err, updatedDoc) {
                var transferKey = updatedDoc ? updatedDoc.transferKey : null;
                var transferDate;
                var employee;

                if (err) {
                    return cb(err);
                }

                if (!transferKey) {
                    return cb();
                }

                transferDate = moment(new Date(updatedDoc.date)).subtract(1, 'days');
                transferDate = transferDate.toDate();
                employee = updatedDoc.employee;

                Model.update({
                    transferKey: transferKey,
                    employee: employee,
                    status: 'transfer'
                }, {
                    $set: {
                        date: transferDate
                    }
                }, {
                    new: true
                }, cb);
            });
        }, function(err) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                success: 'A Transfer update success'
            });
        });
    },
    removeTransfer: function() {
        var TransferModel = MODEL('transfers').Schema;
        var body = self.body;
        var removeIdArray = body.removeTransfer;

        async.each(removeIdArray, function(id, cb) {

            TransferModel.findByIdAndRemove(id, function(err, result) {
                var transferKey;
                var employee;

                if (err) {
                    return cb(err);
                }

                transferKey = result ? result.transferKey : null;

                if (transferKey) {
                    employee = result.employee;
                    return TransferModel.remove({
                        employee: employee,
                        transferKey: transferKey,
                        status: 'transfer'
                    }, cb);
                }

                cb();
            });

        }, function(err) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                success: 'A Transfers delete success'
            });
        });
    },
    updateOnlySelectedFields: function(id) {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var _id = id;
        var UsersModel = MODEL('Users').Schema;
        var data = self.body;
        var fileName = data.fileName;
        var isUpdateSequence;
        var waterfallTasks;
        var startWorkflow;
        var startSequence;
        var obj;
        //console.log(data);

        var remove = self.req.headers.remove;

        function updateEmployee(_id, updateObject, options, waterfallCb) {
            Model.findByIdAndUpdate(_id, updateObject, options, waterfallCb);
        }

        function defaultProfile(employee, waterfallCb) {
            SettingsService.getSettings(function(err, _defaultProfile) {
                if (err)
                    return waterfallCb(err);

                waterfallCb(null, employee, _defaultProfile._id);
            });

        }

        function userCreator(employee, profileId, waterfallCb) {
            var email = employee.workEmail || employee.personalEmail;
            var password = randomPass.generate(8);

            function findUser(query, options, _waterfallCb) {
                UsersModel.find(query, options, function(err, _users) {
                    if (err)
                        return _waterfallCb(err);

                    _waterfallCb(null, _users);
                });
            }

            function updateUser(_user, _waterfallCb) {
                var id = _user._id;

                UsersModel.findByIdAndUpdate(id, {
                    $set: {
                        profile: profileId
                    }
                }, function(err, result) {
                    if (err)
                        return _waterfallCb(err);

                    _waterfallCb(null, result);
                });
            }

            function userManipulator(users, _waterfallCb) {
                var user = users && users[0];
                var _user = {
                    username: data.userName,
                    imageSrc: employee.imageSrc,
                    password: password,
                    profile: profileId,
                    email: email,
                    relatedEmployee: employee._id
                };

                if (user && user._id)
                    return updateUser(user, _waterfallCb);


                UserService.create(_user, function(err, user) {
                    if (err)
                        return _waterfallCb(err);


                    _waterfallCb(null, user);
                });
            }

            async.waterfall([async.apply(findUser, {
                $or: [{
                    username: data.userName
                }, {
                    email: email
                }]
            }), userManipulator], function(err, user) {
                if (err)
                    return waterfallCb(err);


                waterfallCb(null, employee, user);
            });

        }

        function userUpdater(employee, waterfallCb) {
            var _id = employee.relatedUser;

            if (!_id)
                return waterfallCb(null, employee);


            UsersModel.findByIdAndUpdate(_id, {
                $set: {
                    profile: CONSTANTS.BANED_PROFILE
                }
            }, function(err, user) {
                if (err)
                    return waterfallCb(err);

                waterfallCb(null, employee);

                SessionService.findByUserIdAndRemove(_id);
            });
        }

        function employeeUpdater(employee, user, waterfallCb) {
            var _id = employee._id;

            EmployeeService.findByIdAndUpdate(_id, {
                $set: {
                    relatedUser: user._id
                }
            }, waterfallCb);
        }

        data.editedBy = self.user._id;

        if (data.notes && data.notes.length !== 0 && !remove) {
            obj = data.notes[data.notes.length - 1];
            if (!obj._id)
                obj._id = mongoose.Types.ObjectId();

            // obj.date = new Date();

            if (!obj.author)
                obj.author = self.user._id;

            data.notes[data.notes.length - 1] = obj;
        }

        startWorkflow = data.workflowStart;
        startSequence = parseInt(data.sequenceStart, 10);
        isUpdateSequence = !isNaN(startSequence) && startWorkflow;

        delete data.fileName;

        // todo separate it into application & employee

        if (data.workflow && isUpdateSequence) {
            if (data.sequence === -1) {
                F.emit('updateSequence', Model, 'sequence', startSequence, data.sequence, startWorkflow, startWorkflow, false, true, function() {
                    F.emit('updateSequence', Model, 'sequence', startSequence, data.sequence, data.workflow, data.workflow, true, false, function(sequence) {
                        data.sequence = sequence;

                        if (data.workflow === startWorkflow)
                            data.sequence -= 1;


                        Model.findByIdAndUpdate(_id, data, {
                            new: true
                        }, function(err, result) {
                            if (err)
                                return self.throw500(err);


                            self.json({
                                success: 'Employees updated',
                                sequence: result.sequence
                            });
                        });
                    });
                });
            } else {
                F.emit('updateSequence', Model, 'sequence', startSequence, data.sequence, startWorkflow, data.workflow, false, false, function(sequence) {
                    delete data.sequenceStart;
                    delete data.workflowStart;

                    data.sequence = sequence;

                    Model.findByIdAndUpdate(_id, {
                        $set: data
                    }, {
                        new: true
                    }, function(err) {
                        if (err)
                            return self.throw500(err);


                        if (data.relatedUser)
                            // todo update user profile
                            UsersModel.findByIdAndUpdate(data.relatedUser, {
                                $set: {
                                    relatedEmployee: _id
                                }
                            }, function(error) {
                                if (error)
                                    return next(error);


                                self.json({
                                    success: 'Employees updated'
                                });
                            });
                        else
                            self.json({
                                success: 'Employees updated'
                            });

                    });
                });
            }
        } else {
            if (data.dateBirth)
                data.age = getAge(data.dateBirth);


            if (data.workflow === 0)
                data.workflow = ObjectId('528ce682f3f67bc40b00001a');


            waterfallTasks = [async.apply(updateEmployee, _id, {
                $set: data
            })];

            if (data.isHire)
                waterfallTasks.push(defaultProfile, userCreator, employeeUpdater);
            else if (data.isFire)
                waterfallTasks.push(userUpdater);


            async.waterfall(waterfallTasks, function(err, result) {
                var os = require('os');
                var osType = (os.type().split('_')[0]);
                var _userId;
                var newDirname;
                var path;
                var dir;

                if (err) {
                    console.log(err);
                    return self.json({
                        errorNotify: {
                            title: 'Erreur',
                            message: err
                        }
                    });
                }


                if (data.dateBirth || data.hired)
                    F.emit('employee:recalculate', {
                        userId: self.user._id.toString()
                    });
                //    F.emit('recalculate', self, null, next);


                // todo refactor it
                if (fileName) {
                    switch (osType) {
                        case 'Windows':
                            newDirname = __dirname.replace('\\Modules', '');
                            while (newDirname.indexOf('\\') !== -1) {
                                newDirname = newDirname.replace('\\', '\/');
                            }
                            path = newDirname + '\/uploads\/' + _id + '\/' + fileName;
                            dir = newDirname + '\/uploads\/' + _id;
                            break;
                        case 'Linux':
                            newDirname = __dirname.replace('/Modules', '');
                            while (newDirname.indexOf('\\') !== -1) {
                                newDirname = newDirname.replace('\\', '\/');
                            }
                            path = newDirname + '\/uploads\/' + _id + '\/' + fileName;
                            dir = newDirname + '\/uploads\/' + _id;
                            break;
                            // skip default;
                    }

                    fs.unlink(path, function(err) {
                        fs.readdir(dir, function(err, files) {
                            if (files && files.length === 0)
                                fs.rmdir(dir, function() {});
                        });
                    });

                }

                F.emit('employee:recollectVacationDash', {
                    userId: self.user._id.toString()
                });

                result = result.toObject();
                result.successNotify = {
                    title: "Success",
                    message: "Employee enregistree"
                };
                self.json(result);

                _userId = result && result.relatedUser;

                if (data.imageSrc && _userId) {

                    UsersModel.findByIdAndUpdate(_userId, {
                        $set: {
                            imageSrc: data.imageSrc
                        }
                    }, function(err) {
                        if (err)
                            console.log(err);

                        console.log('>> User updated');
                    });
                }

                // TODO add check if salary report need update
                F.emit('payroll:composeSalaryReport', {
                    userId: self.user._id.toString(),
                    data: id.toString()
                });
                //payrollHandler.composeSalaryReport(self);
            });
        }
    },
    remove: function(id) {
        var self = this;
        var _id = id;
        var Model = MODEL('Employees').Schema;
        var UserModel = MODEL('Users').Schema;
        var TransferModel = MODEL('transfers').Schema;

        Model.findByIdAndUpdate(_id, {
            isremoved: true
        }, {
            new: true
        }, function(err, result) {
            if (err)
                return self.throw500(err);
            console.log("res", result);

            if (result && !result.isEmployee)
                F.emit('updateSequence', Model, 'sequence', result.sequence, 0, result.workflow, result.workflow, false, true);

            var employee = result;

            F.emit('recalculate', self, null);
            F.emit('recollectVacationDash');

            TransferModel.remove({
                employee: ObjectId(_id)
            }, function(err, result) {
                var _id;

                if (err) {
                    return self.throw500(err);
                }

                if (employee && employee.relatedUser) {
                    _id = employee.relatedUser;

                    UserModel.findByIdAndUpdate(_id, function(err) {
                        if (err) {
                            return self.throw500(err);
                        }
                        self.json({
                            success: 'Employees removed'
                        });
                    });
                } else {
                    self.json({
                        success: 'Employees removed'
                    });
                }
            });
        });
    },
    bulkRemove: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var TransferModel = MODEL('transfers').Schema;
        var body = self.body || {
            ids: []
        };
        var ids = body.ids;

        async.each(ids, function(id, cb) {
            EmployeeService.findByIdAndRemove(id, function(err, result) {
                if (err) {
                    return self.throw500(err);
                }

                if (result && !result.isEmployee) {
                    F.emit('updateSequence', Model, 'sequence', result.sequence, 0, result.workflow, result.workflow, false, true);
                }

                F.emit('recalculate', self, null, next);
                F.emit('recollectVacationDash');

                TransferModel.remove({
                    employee: ObjectId(id)
                }, function(err, result) {
                    if (err) {
                        return self.throw500(err);
                    }
                });
                cb();
            });
        }, function(err) {
            if (err) {
                return self.throw500(err);
            }

            UserService.findAndRemove({
                _id: {
                    $in: ids
                }
            }, function(err) {
                if (err) {
                    return self.throw500(err);
                }

                self.json({
                    success: true
                });
            });
        });
    },
    getForDdByRelatedUser: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var result = {};
        var uId = self.user._id;

        var query = Model.find({
            relatedUser: uId,
            isEmployee: true
        }, {
            name: 1
        }).sort({
            'name.first': 1
        });

        query.exec(function(err, user) {
            if (err) {
                return self.throw500(err);
            }

            result.data = user;
            self.json(result);

        });
    },
    forProfile: function(userId) {
        var self = this;
        var _findUser;
        var UserModel = MODEL('Users').Schema;

        function findUser(userId, waterfallCb) {
            UserModel.find({
                _id: userId
            }, {
                relatedEmployee: 1
            }, function(err, users) {
                var user;

                if (err)
                    return waterfallCb(err);

                console.log("user", user);

                user = users && users[0];

                waterfallCb(null, user);
            });
        }

        function findEmployee(user, waterfallCb) {

            getById({
                id: user && user.relatedEmployee
            }, self.user, function(err, employee) {
                if (err) {
                    return waterfallCb(err);
                }

                waterfallCb(null, employee);
            });
        }

        _findUser = async.apply(findUser, userId);

        async.waterfall([_findUser, findEmployee], function(err, employee) {
            if (err) {
                return self.throw500(err);
            }

            self.json(employee);
        });
    },
    getByViewTpe: function(id) { // toDO refactor id only by params or query
        var self = this;
        var query = self.query;
        var viewType = query.viewType;

        if (!id)
            id = self.query.id;

        if (id && id.length >= 24) {
            getById({
                id: id
            }, self.user, function(err, employee) {
                if (err)
                    return self.throw500(err);
                self.json(employee);
            });
            return false;
        }

        switch (viewType) {
            case 'form':
                getById(self.query, self.user, function(err, employee) {
                    if (err)
                        return self.throw500(err);
                    self.json(employee);
                });
                break;
            case 'kanban':
                getApplicationsForKanban();
                break;
            case 'thumbnails':
                getFilter();
                break;
            case 'list':
                getFilter();
                break;
                // skip default;
        }
    },
    getForJournalSource: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var data = self.query;
        var _id = data._id;

        Model.findById(_id)
            .select('department manager jobPosition name imageSrc dateBirth personalEmail workPhones skype relatedUser jobType workEmail')
            .populate('department', 'name')
            .populate('manager', 'name')
            .populate('jobPosition', 'name')
            .populate('relatedUser', 'login')
            .exec(function(err, result) {
                if (err) {
                    return self.throw500(err);
                }

                self.json(result);
            });
    },
    getSalesPerson: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var result = {};

        Model.find({
                'isEmployee': true
            }, {
                name: 1
            })
            .sort({
                'name.first': 1
            })
            .exec(function(err, employees) {
                if (err)
                    return self.throw500(err);

                result.data = employees;
                self.json(result);
            });

    },
    getEmployeesAlphabet: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var response = {};
        var query = Model
            .aggregate([{
                $match: {
                    isEmployee: true
                }
            }, {
                $project: {
                    later: {
                        $substr: ['$name.last', 0, 1]
                    }
                }
            }, {
                $group: {
                    _id: '$later'
                }
            }]);

        query.exec(function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            response.data = result;
            self.json(response);
        });
    },
    getEmployeesImages: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var data = req.params;
        var idsArray = data.ids || [];
        var query;

        if (!idsArray.length) {
            idsArray = self.query.ids || [];
        }

        query = Model.find({
            isEmployee: true,
            _id: {
                $in: idsArray
            }
        }, {
            imageSrc: 1,
            name: 1
        });

        query.exec(function(err, response) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                data: response
            });

        });
    },
    getCollectionLengthByWorkflows: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var accessRollSearcher;
        var contentSearcher;
        var waterfallTasks;
        var data = {};

        data.showMore = false;

        accessRollSearcher = function(cb) {
            accessRoll(req, Model, cb);
        };

        contentSearcher = function(deps, cb) {
            Model
                .aggregate([{
                        $match: {
                            _id: {
                                $in: deps
                            },
                            isEmployee: false
                        }
                    }, {
                        $project: {
                            _id: 1,
                            workflow: 1
                        }
                    },
                    {
                        $group: {
                            _id: '$workflow',
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ], function(err, result) {
                    if (err) {
                        return cb(err);
                    }

                    cb(null, result);
                });
        };

        waterfallTasks = [accessRollSearcher, contentSearcher];

        async.waterfall(waterfallTasks, function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            result.forEach(function(object) {
                if (object.count > self.user.kanbanSettings.applications.countPerPage) {
                    data.showMore = true;
                }
            });
            data.arrayOfObjects = result;
            res.send(data);
        });

    },

    getSources: function() {
        var self = this;
        var Sources = MODEL('sources').Schema;

        Sources.find({}).exec(function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            self.json({
                data: result
            });
        });
    },
    uploadFile: function() {
        var self = this;
        var Model = MODEL('Employees').Schema;
        var headers = req.headers;
        var id = headers.modelid || 'empty';
        var contentType = headers.modelname || 'persons';
        var files = req.files && req.files.attachfile ? req.files.attachfile : null;
        var dir;
        var err;

        contentType = contentType.toLowerCase();
        dir = path.join(contentType, id);

        if (!files) {
            err = new Error(RESPONSES.BAD_REQUEST);
            err.status = 400;

            return self.throw500(err);
        }

        uploader.postFile(dir, files, {
            userId: req.session.uName
        }, function(err, file) {
            if (err) {
                return self.throw500(err);
            }

            Model.findByIdAndUpdate(id, {
                $push: {
                    attachments: {
                        $each: file
                    }
                }
            }, {
                new: true
            }, function(err, response) {
                if (err) {
                    return self.throw500(err);
                }

                self.json({
                    success: 'Customers updated success',
                    data: response
                });
            });
        });
    },
    setSettings: function() {
        var self = this;
        var body = self.body;

        SettingsService.setSettings(body, function(err, response) {
            if (err) {
                return self.throw500(err);
            }

            self.json(response);
        });
    },
    getSettings: function() {
        var self = this;
        var body = self.body;

        SettingsService.getSettings(body, function(err, response) {
            if (err) {
                return self.throw500(err);
            }

            self.json(response);
        });
    },
    getBirthdays: function() {
        var self = this;
        var err = new Error();
        var result = {};
        result.data = [];

        check(req, function(status, employees) {
            switch (status) {
                case -1:
                    err.status = 500;
                    self.throw500(err);
                    break;
                case 0:
                    getEmployeesInDateRange(set);
                    break;
                case 1:
                    result.data = employees;
                    self.json(result);
                    break;
                    // skip default;
            }
        });
    }
};

function JobPosition() {}

JobPosition.prototype = {
    getForDd: function() {
        var self = this;
        const JobPositionModel = MODEL('JobPosition').Schema;

        JobPositionModel.find({}, function(err, jobs) {
            if (err)
                return self.throw500(err);

            return self.json({
                data: jobs
            });
        });
    }
}

//F.on('recalculate', recalculate);

function recalculate() {
    getEmployeesInDateRange(set);
}

function accessEmployeeSalary(profileId) {
    //var profiles = CONSTANTS.ACCESS_EMPLOYEE_SALARY;
    return true; //TODO add right user

    if (profileId)
        return !(profiles.indexOf(profileId.toString()) < 0);


    return false;
}

function getNameAndDepartment(query, callback) {
    var Model = MODEL('Employees').Schema;
    var matchQuery = {};

    if (query) {
        if (query.devDepartments) {
            matchQuery['department.isDevelopment'] = true;
        }
        if (query.isEmployee) {
            matchQuery.isEmployee = true;
        }
        if (query.salesDepartments) {
            matchQuery['department._id'] = {
                $in: CONSTANTS.SALESDEPARTMENTS.objectID()
            };
        }
    }

    Model.aggregate([{
        $project: {
            name: 1,
            department: 1,
            isEmployee: 1
        }
    }, {
        $lookup: {
            from: 'Department',
            localField: 'department',
            foreignField: '_id',
            as: 'department'
        }
    }, {
        $project: {
            department: {
                $arrayElemAt: ['$department', 0]
            },
            isEmployee: 1,
            name: 1
        }
    }, {
        $match: matchQuery
    }, {
        $sort: {
            'name.first': 1
        }
    }], function(err, employees) {
        if (err) {
            return callback(err);
        }

        callback(null, employees);
    });
}

function getDate(date) {
    var _date = new Date(date);
    var currentTimeZoneOffsetInMiliseconds = -_date.getTimezoneOffset() * 60 * 1000;
    var valueOfDate = _date.valueOf();

    valueOfDate += currentTimeZoneOffsetInMiliseconds;

    return new Date(valueOfDate);
}

function getAge(birthday) {
    var today = new Date();
    var years;

    birthday = new Date(birthday);
    years = today.getFullYear() - birthday.getFullYear();

    birthday.setFullYear(today.getFullYear());

    if (today < birthday) {
        years--;
    }

    return (years < 0) ? 0 : years;
}

function getById(data, user, next) {
    console.log(data);
    var projectSalary = {
        department: 1,
        jobPosition: 1,
        weeklyScheduler: 1,
        manager: 1,
        date: 1,
        status: 1,
        jobType: 1,
        info: 1,
        employee: 1,
        scheduledPay: 1,
        payrollStructureType: 1
    };

    var profileId = user.profileId;
    var query;
    var getTransfer;
    var getEmployee;
    var parallelTasks;
    var transfers = MODEL('transfers').Schema;

    // todo refactor it
    getTransfer = function(pCb) {
        if (data.notCheck || accessEmployeeSalary(profileId)) {
            projectSalary.salary = 1;
        }

        transfers
            .aggregate([{
                $match: {
                    employee: ObjectId(data.id)
                }
            }, {
                $lookup: {
                    from: 'Department',
                    localField: 'department',
                    foreignField: '_id',
                    as: 'department'
                }
            }, {
                $lookup: {
                    from: 'JobPosition',
                    localField: 'jobPosition',
                    foreignField: '_id',
                    as: 'jobPosition'
                }
            }, {
                $lookup: {
                    from: 'weeklySchedulers',
                    localField: 'weeklyScheduler',
                    foreignField: '_id',
                    as: 'weeklyScheduler'
                }
            }, {
                $lookup: {
                    from: 'Employees',
                    localField: 'manager',
                    foreignField: '_id',
                    as: 'manager'
                }
            }, {
                $lookup: {
                    from: 'scheduledPays',
                    localField: 'scheduledPay',
                    foreignField: '_id',
                    as: 'scheduledPay'
                }
            }, {
                $lookup: {
                    from: 'payrollStructureTypes',
                    localField: 'payrollStructureType',
                    foreignField: '_id',
                    as: 'payrollStructureType'
                }
            }, {
                $project: {
                    department: {
                        $arrayElemAt: ['$department', 0]
                    },
                    jobPosition: {
                        $arrayElemAt: ['$jobPosition', 0]
                    },
                    weeklyScheduler: {
                        $arrayElemAt: ['$weeklyScheduler', 0]
                    },
                    manager: {
                        $arrayElemAt: ['$manager', 0]
                    },
                    date: 1,
                    status: 1,
                    jobType: 1,
                    salary: 1,
                    info: 1,
                    employee: 1,
                    scheduledPay: {
                        $arrayElemAt: ['$scheduledPay', 0]
                    },
                    payrollStructureType: {
                        $arrayElemAt: ['$payrollStructureType', 0]
                    }
                }
            }, {
                $project: {
                    'department._id': '$department._id',
                    'department.name': '$department.name',
                    'jobPosition._id': '$jobPosition._id',
                    'jobPosition.name': '$jobPosition.name',
                    'weeklyScheduler._id': '$weeklyScheduler._id',
                    'weeklyScheduler.name': '$weeklyScheduler.name',
                    'manager._id': '$manager._id',
                    'manager.name': '$manager.name',
                    date: 1,
                    status: 1,
                    jobType: 1,
                    salary: 1,
                    info: 1,
                    employee: 1,
                    'scheduledPay._id': '$scheduledPay._id',
                    'scheduledPay.name': '$scheduledPay.name',
                    'payrollStructureType._id': '$payrollStructureType._id',
                    'payrollStructureType.name': '$payrollStructureType.name'
                }
            }, {
                $project: projectSalary
            }, {
                $sort: {
                    date: 1
                }
            }], function(err, transfer) {
                if (err) {
                    return pCb(err);
                }

                pCb(null, transfer);
            });
    };

    getEmployee = function(pCb) {
        var EmployeeModel = MODEL('Employees').Schema;
        console.log(data.id);
        EmployeeModel.findById(data.id)
            .populate('coach', 'name _id')
            .populate('relatedUser', 'login _id')
            .populate('workflow')
            .populate('createdBy')
            .populate('editedBy')
            .populate('groups.users')
            .populate('manager', '_id name')
            .populate('jobPosition', '_id name fullName')
            .populate('weeklyScheduler', '_id name')
            .populate('payrollStructureTypes', '_id name')
            .populate('scheduledPay', '_id name')
            .populate('department', '_id name')
            .populate('groups.group')
            .populate('groups.owner', '_id login')
            .exec(function(err, foundEmployee) {
                if (err)
                    return pCb(err);


                pCb(null, foundEmployee);
            });
    };

    parallelTasks = [getEmployee, getTransfer];

    async.parallel(parallelTasks, function(err, result) {
        var response;

        if (err)
            return next(err);

        response = result && result[0].set('transfer', result[1]);

        next(null, response);
    });

}

function getFilter() {
    var Model = MODEL('Employees').Schema;
    var data = self.query;
    var paginationObject = pageHelper(data);
    var limit = paginationObject.limit;
    var skip = paginationObject.skip;
    var contentType = data.contentType;
    var viewType = data.viewType;
    var optionsObject = {};
    var filter = data.filter || {};
    var waterfallTasks;
    var accessRollSearcher;
    var contentSearcher;
    var keySort;
    var sort;
    var project;
    var projectSecond;
    var projectAfterRoot;

    if (filter && typeof filter === 'object') {
        optionsObject = filterMapper.mapFilter(filter, {
            contentType: contentType
        });
    }

    if (data.sort) {
        keySort = Object.keys(data.sort)[0];
        data.sort[keySort] = parseInt(data.sort[keySort], 10);
        sort = data.sort;
    } else {
        sort = {
            'updatedAt': -1
        };
    }

    accessRollSearcher = function(cb) {
        accessRoll(req, Model, cb);
    };

    contentSearcher = function(idsArray, cb) {
        var queryObject = {};

        queryObject.$and = [];

        if (optionsObject) {
            queryObject.$and.push(optionsObject);
        }

        queryObject.$and.push({
            _id: {
                $in: idsArray
            }
        });

        if (contentType === 'Employees') {
            queryObject.$and.push({
                isEmployee: true
            });

            switch (viewType) {
                case ('list'):
                    project = {
                        manager: {
                            $arrayElemAt: ['$manager', 0]
                        },
                        jobPosition: {
                            $arrayElemAt: ['$jobPosition', 0]
                        },
                        department: {
                            $arrayElemAt: ['$department', 0]
                        },
                        'createdBy': {
                            $arrayElemAt: ['$createdBy', 0]
                        },
                        'editedBy': {
                            $arrayElemAt: ['$editedBy', 0]
                        },
                        name: 1,
                        'updatedAt': 1,
                        'createdAt': 1,
                        dateBirth: 1,
                        skype: 1,
                        workEmail: 1,
                        workPhones: 1,
                        jobType: 1,
                        isEmployee: 1
                    };

                    projectSecond = {
                        'manager._id': '$manager._id',
                        'manager.name': '$manager.name',
                        'jobPosition._id': '$jobPosition._id',
                        'jobPosition.name': '$jobPosition.name',
                        'department._id': '$department._id',
                        'department.name': '$department.name',
                        'createdBy': 1,
                        'editedBy': 1,
                        'updatedAt': 1,
                        'createdAt': 1,
                        name: 1,
                        dateBirth: 1,
                        skype: 1,
                        workEmail: 1,
                        workPhones: 1,
                        jobType: 1,
                        isEmployee: 1
                    };

                    projectAfterRoot = {
                        _id: '$root._id',
                        manager: '$root.manager',
                        jobPosition: '$root.jobPosition',
                        department: '$root.department',
                        'createdBy': '$root.createdBy.login',
                        'editedBy': '$root.editedBy.login',
                        'updatedAt': '$root.updatedAt',
                        'createdAt': '$root.createdAt',
                        name: '$root.name',
                        dateBirth: '$root.dateBirth',
                        skype: '$root.skype',
                        workEmail: '$root.workEmail',
                        workPhones: '$root.workPhones',
                        jobType: '$root.jobType',
                        isEmployee: '$root.isEmployee',
                        total: 1
                    };

                    break;
                case ('thumbnails'):
                    project = {
                        manager: {
                            $arrayElemAt: ['$manager', 0]
                        },
                        jobPosition: {
                            $arrayElemAt: ['$jobPosition', 0]
                        },
                        age: 1,
                        relatedUser: {
                            $arrayElemAt: ['$relatedUser', 0]
                        },
                        department: {
                            $arrayElemAt: ['$department', 0]
                        },
                        'workPhones.mobile': 1,
                        name: 1,
                        dateBirth: 1,
                        isEmployee: 1,
                        'updatedAt': 1
                    };

                    projectSecond = {
                        'manager.name': '$manager.name',
                        'manager._id': '$manager._id',
                        'jobPosition._id': '$jobPosition._id',
                        'jobPosition.name': '$jobPosition.name',
                        age: 1,
                        'relatedUser.login': '$relatedUser.login',
                        workPhones: 1,
                        name: 1,
                        dateBirth: 1,
                        isEmployee: 1,
                        'department.name': '$department.name',
                        'department._id': '$department._id',
                        'updatedAt': 1
                    };

                    projectAfterRoot = {
                        _id: '$root._id',
                        jobPosition: '$root.jobPosition',
                        manager: '$root.manager',
                        age: '$root.age',
                        relatedUser: '$root.relatedUser',
                        workPhones: '$root.workPhones',
                        name: '$root.name',
                        department: '$root.department',
                        dateBirth: '$root.dateBirth',
                        isEmployee: '$root.isEmployee',
                        total: 1,
                        'updatedAt': '$root.updatedAt'
                    };
                    break;
                    // skip default;
            }
        } else if (contentType === 'Applications') {
            queryObject.$and.push({
                isEmployee: false
            });

            switch (viewType) {
                case ('list'):
                    if (data && data.filter && data.filter.workflow) {
                        data.filter.workflow = data.filter.workflow.map(function(item) {
                            return item === 'null' ? null : item;
                        });
                    }

                    project = {
                        jobPosition: {
                            $arrayElemAt: ['$jobPosition', 0]
                        },
                        'createdBy': {
                            $arrayElemAt: ['$createdBy', 0]
                        },
                        'editedBy': {
                            $arrayElemAt: ['$editedBy', 0]
                        },
                        department: {
                            $arrayElemAt: ['$department', 0]
                        },
                        name: 1,
                        'updatedAt': 1,
                        'createdAt': 1,
                        dateBirth: 1,
                        skype: 1,
                        workEmail: 1,
                        workPhones: 1,
                        jobType: 1,
                        isEmployee: 1,
                        workflow: {
                            $arrayElemAt: ['$workflow', 0]
                        },
                        personalEmail: 1,
                        sequence: 1,
                        hire: 1,
                        fire: 1
                    };

                    projectSecond = {
                        jobPosition: 1,
                        'createdBy': 1,
                        'editedBy': 1,
                        'updatedAt': 1,
                        'createdAt': 1,
                        name: 1,
                        dateBirth: 1,
                        skype: 1,
                        department: 1,
                        workEmail: 1,
                        workPhones: 1,
                        jobType: 1,
                        isEmployee: 1,
                        workflow: 1,
                        personalEmail: 1,
                        sequence: 1,
                        hire: 1,
                        fire: 1
                    };

                    projectAfterRoot = {
                        _id: '$root._id',
                        'jobPosition.name': '$root.jobPosition.name',
                        'jobPosition._id': '$root.jobPosition._id',
                        'createdBy': '$root.createdBy.login',
                        'editedBy': '$root.editedBy.login',
                        'updatedAt': '$root.updatedAt',
                        'createdAt': '$root.createdAt',
                        'department._id': '$root.department._id',
                        'department.name': '$root.department.name',
                        name: '$root.name',
                        dateBirth: '$root.dateBirth',
                        skype: '$root.skype',
                        workEmail: '$root.workEmail',
                        workPhones: '$root.workPhones',
                        jobType: '$root.jobType',
                        isEmployee: '$root.isEmployee',
                        workflow: '$root.workflow',
                        personalEmail: '$root.personalEmail',
                        sequence: '$root.sequence',
                        hire: '$root.hire',
                        fire: '$root.fire',
                        total: 1
                    };
                    break;
                    // skip default;
            }
        }

        Model.aggregate([{
            $lookup: {
                from: 'Employees',
                localField: 'manager',
                foreignField: '_id',
                as: 'manager'
            }
        }, {
            $lookup: {
                from: 'JobPosition',
                localField: 'jobPosition',
                foreignField: '_id',
                as: 'jobPosition'
            }
        }, {
            $lookup: {
                from: 'Department',
                localField: 'department',
                foreignField: '_id',
                as: 'department'
            }
        }, {
            $lookup: {
                from: 'Users',
                localField: 'relatedUser',
                foreignField: '_id',
                as: 'relatedUser'
            }
        }, {
            $lookup: {
                from: 'Users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy'
            }
        }, {
            $lookup: {
                from: 'Users',
                localField: 'editedBy',
                foreignField: '_id',
                as: 'editedBy'
            }
        }, {
            $lookup: {
                from: 'workflows',
                localField: 'workflow',
                foreignField: '_id',
                as: 'workflow'
            }
        }, {
            $project: project
        }, {
            $project: projectSecond
        }, {
            $match: queryObject
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: 1
                },
                root: {
                    $push: '$$ROOT'
                }
            }
        }, {
            $unwind: '$root'
        }, {
            $project: projectAfterRoot
        }, {
            $sort: sort
        }, {
            $skip: skip
        }, {
            $limit: limit
        }], function(err, result) {
            if (err) {
                return cb(err);
            }

            cb(null, result);
        });
    };

    waterfallTasks = [accessRollSearcher, contentSearcher];

    async.waterfall(waterfallTasks, function(err, result) {
        var count;
        var firstElement;
        var response = {};

        if (err) {
            return self.throw500(err);
        }

        firstElement = result[0];
        count = firstElement && firstElement.total ? firstElement.total : 0;
        response.total = count;
        response.data = result;

        self.json(response);
    });

}

function getApplicationsForKanban() {
    var Model = MODEL('Employees').Schema;
    var response = {};
    var startTime = new Date();
    var data = self.query;
    var accessRollSearcher;
    var contentSearcher;
    var waterfallTasks;
    var filterObj = {};

    response.data = [];
    response.workflowId = data.workflowId;

    accessRollSearcher = function(cb) {
        accessRoll(req, Model, cb);
    };

    contentSearcher = function(responseApplications, cb) {
        filterObj.$and = [];
        filterObj.$and.push({
            isEmployee: false
        });
        filterObj.$and.push({
            workflow: ObjectId(data.workflowId)
        });
        filterObj.$and.push({
            _id: {
                $in: responseApplications
            }
        });

        Model
            .find(filterObj)
            .select('_id name proposedSalary jobPosition nextAction workflow updatedAt sequence fired')
            .populate('workflow', '_id')
            .populate('jobPosition', '_id name')
            .sort({
                lastFire: -1,
                sequence: -1
            })
            .limit(self.user.kanbanSettings.applications.countPerPage)
            .exec(function(err, result) {
                if (err) {
                    return cb(err);
                }

                cb(null, result);
            });
    };

    waterfallTasks = [accessRollSearcher, contentSearcher];

    async.waterfall(waterfallTasks, function(err, result) {
        if (err) {
            return self.throw500(err);
        }

        response.data = result;
        response.time = (new Date() - startTime);
        response.workflowId = data.workflowId;
        response.fold = (self.user.kanbanSettings.applications.foldWorkflows && self.user.kanbanSettings.applications.foldWorkflows.indexOf(data.workflowId.toString()) !== -1);

        self.json(response);
    });
}

function check(req, callback) {
    var now = new Date();
    var dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var Birthdays = MODEL('birthdays').Schema;

    Birthdays.find({}, function(err, birth) {
        if (err) {
            return callback(-1);
        }

        if (birth.length === 0) {
            return callback(0);
        }

        if (birth[0].date < dateOnly) {
            callback(0);
        } else {
            callback(1, birth[0].currentEmployees);
        }
    });
}

function getEmployeesInDateRange(callback) {
    var now = new Date();
    var day = 0;
    var _month = now.getMonth() + 1;
    var NUMBER_OF_MONTH = 1;
    var tempMonthLength = _month + NUMBER_OF_MONTH;
    var realPart;
    var query;
    var Model = MODEL('Employees').Schema;

    var separateWeklyAndMonthly = function(arrayOfEmployees) {
        var dateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var dayNumber = dateOnly.getDay();
        var LeftOffset = dayNumber - 1;
        var RightOffset = 7 - dayNumber;
        var FirstDateWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - LeftOffset).valueOf();
        var LastDateWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + RightOffset).valueOf();
        var FirstDateNxtWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + RightOffset + 1).valueOf();
        var LastDateNxtWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + RightOffset * 2 + 1).valueOf();

        var currentEmployees = {};

        function getDaysToBirthday(birthday) {
            var today = new Date();
            var days;
            var firstDayOfYear = new Date(today.getFullYear() + 1, 0, 1);
            var lastDayOfYear = new Date(today.getFullYear(), 11, 31);
            if (birthday.getMonth() >= today.getMonth()) {
                birthday.setFullYear(today.getFullYear());
                days = Math.round((birthday - today) / 1000 / 60 / 60 / 24);
            } else {
                days = Math.round((lastDayOfYear - today) / 1000 / 60 / 60 / 24);
                days += Math.round((birthday.setFullYear(today.getFullYear() + 1) - firstDayOfYear) / 1000 / 60 / 60 / 24);
            }
            return days;
        }

        currentEmployees.monthly = arrayOfEmployees.map(function(employee) {
            if (employee.dateBirth) {
                employee.daysForBirth = getDaysToBirthday(employee.dateBirth);
            }
            return employee;
        });

        currentEmployees.nextweek = currentEmployees.monthly.filter(function(employee) {
            var birthday;
            var valueOfBirthday;

            if (employee.dateBirth) {
                birthday = new Date(employee.dateBirth);
                birthday.setHours(0);
                valueOfBirthday = birthday.valueOf();

                if (valueOfBirthday >= FirstDateNxtWeek) {
                    if ((valueOfBirthday <= LastDateNxtWeek)) {
                        return true;
                    }
                }
            }

            return false;
        });

        currentEmployees.weekly = currentEmployees.monthly.filter(function(employee) {
            var birthday;
            var valueOfBirthday;

            if (employee.dateBirth) {
                birthday = new Date(employee.dateBirth);
                birthday.setHours(0);
                valueOfBirthday = birthday.valueOf();

                if (valueOfBirthday >= FirstDateWeek) {
                    if ((valueOfBirthday <= LastDateWeek)) {
                        return true;
                    }
                }

            }

            return false;
        });

        currentEmployees.monthly.sort(function(a, b) {
            if (a.daysForBirth > b.daysForBirth) {
                return 1;
            }

            if (a.daysForBirth < b.daysForBirth) {
                return -1;
            }

            return 0;
        });
        currentEmployees.weekly.sort(function(a, b) {
            if (a.daysForBirth > b.daysForBirth) {
                return 1;
            }

            if (a.daysForBirth < b.daysForBirth) {
                return -1;
            }

            return 0;
        });

        currentEmployees.nextweek.sort(function(a, b) {
            if (a.daysForBirth > b.daysForBirth) {
                return 1;
            }

            if (a.daysForBirth < b.daysForBirth) {
                return -1;
            }

            return 0;
        });
        return currentEmployees;
    };

    if (tempMonthLength / 12 < 1) {

        query = {
            $or: [{
                    $and: [{
                        month: _month
                    }, {
                        days: {
                            $gte: day
                        }
                    }, {
                        days: {
                            $lte: 31
                        }
                    }]
                },
                {
                    $and: [{
                        month: {
                            $gt: _month
                        }
                    }, {
                        month: {
                            $lt: tempMonthLength
                        }
                    }]
                },
                {
                    $and: [{
                        month: tempMonthLength
                    }, {
                        days: {
                            $lte: day
                        }
                    }]
                }
            ]
        };
    } else {
        realPart = tempMonthLength % 12;
        query = {
            $or: [{
                    $and: [{
                        month: _month
                    }, {
                        days: {
                            $gte: day
                        }
                    }, {
                        days: {
                            $lte: 31
                        }
                    }]
                },
                {
                    $and: [{
                        month: {
                            $gte: 1
                        }
                    }, {
                        month: {
                            $lt: realPart
                        }
                    }]
                },
                {
                    $and: [{
                        month: realPart
                    }, {
                        days: {
                            $lt: day
                        }
                    }]
                }
            ]
        };
    }

    Model.aggregate({
            $match: {
                $and: [{
                        dateBirth: {
                            $ne: null
                        }
                    },
                    {
                        isEmployee: true
                    }
                ]
            }
        }, {
            $project: {
                _id: 1,
                month: {
                    $month: '$dateBirth'
                },
                days: {
                    $dayOfMonth: '$dateBirth'
                }
            }
        }, {
            $match: query
        },
        function(err, result) {
            if (err) {
                return self.throw500(err);
            }

            Model.find().where('_id').in(result)
                .select('_id name dateBirth age jobPosition workPhones.mobile department')
                .populate('jobPosition', '_id name')
                .populate('department', ' _id name')
                .lean()
                .exec(function(err, resArray) {
                    if (err) {
                        return callback(separateWeklyAndMonthly([]));
                    }

                    resArray.map(function(employee) {
                        employee.age = getAge(employee.dateBirth);
                        return employee;
                    });

                    callback(separateWeklyAndMonthly(resArray));
                });
        });
}

function set(currentEmployees) {
    var result = {};
    var data = {};
    var now = new Date();
    var Birthdays = MODEL('birthdays').Schema

    data.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    data.currentEmployees = currentEmployees;

    Birthdays.findByIdAndUpdate({
        _id: 1
    }, data, {
        new: true,
        upsert: true
    }, function(err, birth) {
        if (err) {
            return self.throw500(err);
        }

        result.data = birth.currentEmployees;

        if (res && res.status) {
            self.json(result);
        }
    });
}