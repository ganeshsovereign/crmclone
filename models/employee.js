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

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp'),
    version = require('mongoose-version'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

var DataTable = require('mongoose-datatable');


DataTable.configure({
    verbose: false,
    debug: false
});
mongoose.plugin(DataTable.init);


var Dict = INCLUDE('dict');

var setPhone = MODULE('utils').setPhone;
var setFirstname = MODULE('utils').setFirstUpperCase


var EmployeeSchema = new Schema({
    /**
     * Application is same as Employee, but `isEmployee` is false. That means that employee is not hired.
     * @module Employee
     *
     * @class Employee
     * @property {Boolean} isEmployee - If property _isEmployee_ is _true_ than Employee is hired
     *
     * @property {String} imageSrc - `base64` representation of avatar
     *
     * @property {Object} name
     * @property {String} name.first -First `name` of _Employee_
     * @property {String} name.last -Last `name` of _Employee_
     *
     * @property {Object} workAddress - `Address` of _Employee_
     * @property {String} workAddress.street - Address `street` of _Employee_
     * @property {String} workAddress.city - Address `city` of _Employee_
     * @property {String} workAddress.state - Address `state` of _Employee_
     * @property {String} workAddress.zip - Address `zip` of _Employee_
     * @property {String} workAddress.country - Address `country` of _Employee_
     *
     * @property {String} workEmail - Email
     *
     * @property {String} personalEmail - Personal email
     *
     * @property {Object} workPhones - `workPhones` of _Employee_
     * @property {String} workPhones.mobile - `mobile` of _Employee_
     * @property {String} workPhones.phone - `phone` of _Employee_
     *
     * @property {String} skype - Skype login
     *
     * @property {Object} department - `department` of _Employee_
     *
     * @property {Object} jobPosition - `jobPosition` of _Employee_
     * @property {String} jobPosition._id - Job Position `_id` of _Employee_
     * @property {String} jobPosition.name - Job Position `name` of _Employee_
     *
     * @property {Object} manager - `Manager` of _Employee_
     * @property {String} manager._id - Manager `_id` of _Employee_
     * @property {String} manager.name - Manager `name` of _Employee_
     *
     * @property {Date} dateBirth - Date of Birth, expect ISO string, example `'1998-07-28 17:12:26'`
     *
     * @property {Number} age - Age of _Employee_
     *
     * @property {String} workflow
     *
     * @property {Object} groups - `Groups` of _Employee_
     * @property {String} groups.users
     * @property {String} groups.group
     *
     * @property {String} otherInfo - Some info about _Employee_
     *
     * @property {Date} creationDate - Creation Date of _Employee_
     *
     * @property {Object} createdBy
     * @property {String} createdBy.users - Created by user
     * @property {Date} createdBy.date - Creation date
     *
     * @property {Object} editedBy
     * @property {String} editedBy.users - Edited by user
     * @property {Date} editedBy.date - Edited on date
     *
     * @property {Array} attachments - Some files
     *
     * @property {String} marital - Marital can be `married` or `unmarried`
     *
     * @property {String} gender - Gender can be `male` or `female`
     *
     * @property {String} jobType - Job type can be `Contract`, `Full-time`, `Internship`, `Part-time`, `Remote` or `Temporary`
     *
     * @property {Object} social - Social lincs of  _Employee_
     * @property {String} social.FB
     * @property {String} social.LI
     * @property {String} social.GP
     *
     * @property {Array} hire - `Hire` dates of _Employee_
     *
     * @property {Array} fire - `Fire` dates of _Employee_
     *
     * @property {Number} lastFire - `lastFire` dates of _Employee_
     */


    isEmployee: {
        type: Boolean,
        default: false
    },
    isremoved: {
        type: Boolean,
        default: false
    },

    imageSrc: {
        type: Schema.Types.ObjectId,
        //    ref: 'Images',
        default: null
    },

    subject: {
        type: String,
        default: ''
    },

    name: {
        first: {
            type: String,
            set: setFirstname,
            default: ''
        },
        last: {
            type: String,
            default: ''
        }
    },

    tags: {
        type: Array,
        default: []
    },

    workAddress: {
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },

    emails: {
        work: {
            type: String,
            default: ''
        },
        personal: {
            type: String,
            default: ''
        }
    },

    phones: {
        mobile: {
            type: String,
            set: setPhone,
            default: ''
        },
        phone: {
            type: String,
            set: setPhone,
            default: ''
        },
        personal: {
            type: String,
            set: setPhone,
            default: ''
        }
    },

    skype: {
        type: String,
        default: ''
    },
    officeLocation: {
        type: String,
        default: ''
    },
    relatedUser: {
        type: ObjectId,
        ref: 'Users',
        sparse: true
    },
    visibility: {
        type: String,
        default: 'Public'
    },
    department: {
        type: ObjectId,
        ref: 'Department'
    },
    jobPosition: {
        type: ObjectId,
        ref: 'JobPosition'
    },
    weeklyScheduler: {
        type: ObjectId,
        ref: 'weeklyScheduler'
    },
    payrollStructureType: {
        type: ObjectId,
        ref: 'payrollStructureTypes'
    },
    scheduledPay: {
        type: ObjectId,
        ref: 'scheduledPay'
    },
    manager: {
        type: ObjectId,
        ref: 'Employees'
    },
    coach: {
        type: ObjectId,
        ref: 'Employees'
    },
    nationality: {
        type: String,
        default: 'FR'
    },
    socialSecurityNumber: {
        type: String,
        default: ''
    },
    identNo: String,
    passportNo: String,
    iban: {
        bank: {
            type: String,
            uppercase: true,
            trim: true
        },
        id: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        }, //FR76........
        bic: {
            type: String,
            set: MODULE('utils').setNoSpace,
            uppercase: true,
            trim: true
        } //BIC / SWIFT
    },
    otherId: {
        type: String,
        default: ''
    },

    homeAddress: {
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zip: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },

    dateBirth: Date,
    age: {
        type: Number,
        default: 0
    },
    daysForBirth: Number,
    nextAction: Date,
    source: {
        type: String,
        default: ''
    },
    referredBy: {
        type: String,
        default: ''
    },
    workflow: {
        type: ObjectId,
        ref: 'workflows'
    },
    whoCanRW: {
        type: String,
        enum: ['owner', 'group', 'everyOne'],
        default: 'everyOne'
    },

    groups: {
        owner: {
            type: ObjectId,
            ref: 'Users'
        },
        users: [{
            type: ObjectId,
            ref: 'Users'
        }],
        group: [{
            type: ObjectId,
            ref: 'Department'
        }]
    },

    otherInfo: {
        type: String,
        default: ''
    },
    expectedSalary: Number,
    proposedSalary: Number,
    color: {
        type: String,
        default: '#4d5a75'
    },
    creationDate: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: ObjectId,
        ref: 'Users'
    },

    editedBy: {
        type: ObjectId,
        ref: 'Users'
    },

    attachments: {
        type: Array,
        default: []
    },
    files: {
        type: Array,
        default: []
    },

    notes: {
        type: Array,
        default: []
    },

    internalNotes: {
        new: String,
        old: String,
        author: {
            type: ObjectId,
            ref: 'Users'
        },
        datec: {
            type: Date,
            default: Date.now
        }
    },

    arrivalDate: {
        type: Date
    },
    contractEnd: {
        reason: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        }
    },

    marital: {
        type: String,
        enum: ['married', 'unmarried'],
        default: 'unmarried'
    },
    employmentType: {
        type: String,
        enum: ['Employees', 'FOP', 'Un Employees'],
        default: 'Un Employees'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    jobType: {
        type: String,
        default: ''
    },
    sequence: {
        type: Number,
        default: 0
    },
    isLead: Number,
    ID: Number,

    social: {
        FB: {
            type: String,
            default: ''
        },
        LI: {
            type: String,
            default: ''
        },
        GP: {
            type: String,
            default: ''
        }
    },

    hire: [Date],
    fire: [Date],

    transfer: {
        type: Array,
        default: []
    },

    //entity: [{ type: String, trim: true }],

    lastFire: {
        type: Number,
        default: null
    },
    externalId: {
        type: String,
        default: null
    },
    userName: String
}, {
    collection: 'Employees',
    toObject: {
        getters: true,
        virtuals: true
    },
    toJSON: {
        getters: true,
        virtuals: true
    }
});

EmployeeSchema.virtual('fullName').get(function() {
    if (this.name.first)
        return this.name.first + ' ' + this.name.last;

    return this.name.last;
});

EmployeeSchema.virtual('iban.isOk')
    .get(function() {
        var self = this;

        if (self.iban && self.iban.id) {
            var IBAN = require('iban');

            return IBAN.isValid(self.iban.id);
        }

        return null;
    });

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE(CONFIG('storing-files'));
    EmployeeSchema.plugin(gridfs.pluginGridFs, {
        root: "Employees"
    });
}

exports.Status = {
    "_id": "fk_employee_status",
    "lang": "users",
    "default": "DISABLE",
    "values": {
        "NEVER": {
            "label": "Unknown",
            "enable": true,
            "cssClass": "label-default"
        },
        "ENABLE": {
            "enable": true,
            "label": "Enable",
            "cssClass": "label-success"
        },
        "DISABLE": {
            "enable": true,
            "label": "Disable",
            "cssClass": "label-danger"
        },
        "NOCONNECT": {
            "enable": false,
            "label": "NoConnect",
            "cssClass": "label-info"
        },
        "WEB": {
            "enable": false,
            "label": "Web",
            "cssClass": "label-warning"
        }
    }
};

EmployeeSchema.plugin(version, {
    collection: 'Employees.Version'
});

exports.Schema = mongoose.model('Employees', EmployeeSchema);
exports.name = 'Employees';