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
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId,
    timestamps = require('mongoose-timestamp'),
    authTypes = ['github', 'twitter', 'facebook', 'google'];

var setFirstname = MODULE('utils').setFirstUpperCase

var UserSchema = new Schema({
    /**
     * @module User
     *
     * @class User
     *
     * @property {String} imageSrc - `base64` representation of avatar
     *
     * @property {String} login - Login
     * @property {String} email - Personal email
     * @property {String} pass - Password
     *
     * @property {Object} credentials
     * @property {String} credentials.refresh_token
     * @property {String} credentials.access_token
     *
     * @property {Number} profile - Profile
     * @property {Date} lastAccess - Last access
     *
     * @property {Object} kanbanSettings - Setting for `kanban` viewType
     * @property {Object} kanbanSettings.opportunities
     * @property {Number} kanbanSettings.opportunities.countPerPage
     * @property {Array} kanbanSettings.opportunities.foldWorkflows
     * @property {Object} kanbanSettings.applications
     * @property {Number} kanbanSettings.applications.countPerPage
     * @property {Array} kanbanSettings.applications.foldWorkflows
     * @property {Object} kanbanSettings.tasks
     * @property {Number} kanbanSettings.tasks.countPerPage
     * @property {Array} kanbanSettings.tasks.foldWorkflows
     *
     * @property {Array} savedFilters - Saved filters for current user
     * @property {String} relatedEmployee - Related employee for current user
     */

    imageSrc: {
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC'
    },

    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        sparse: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    hashed_password: String,
    salt: String,
    DefaultLang: {
        type: String,
        default: 'fr'
    },
    entity: {
        type: String,
        trim: true
    },

    isEnable: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    },

    isremoved: {
        type: Boolean,
        default: false
    },

    facebook: {},
    twitter: {},
    github: {},
    google: {
        user_id: String,
        sync: {
            type: Boolean,
            default: true
        }, // authorisation to sync with google
        tokens: {
            access_token: String,
            refresh_token: String
        },
        contacts: {
            latestImport: String, // date format YYYY-MM-DD
            group_href: String // group which contains exported contacts
        },
        tasks: {
            tasklist_id: String // tasklist which contains our tasks
        },
        calendar: {
            calendar_id: String // calendar which contains our events
        }
    },

    profile: {
        type: Number,
        ref: 'Profile',
        required: false
    }, //TODO true by default
    groupe: String, //TODO Remove
    groups: [String],
    lastConnection: Date,
    newConnection: Date,
    creationDate: {
        type: Date,
        default: Date.now
    },

    rights: mongoose.Schema.Types.Mixed, // TODO Remove

    externalConnect: {
        type: Boolean,
        default: false
    },
    right_menu: {
        type: Boolean,
        default: true
    },
    home: String,
    societe: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    }, // TODO rename to supplier
    multiEntities: {
        type: Boolean,
        default: false
    }, // Access to all entities ?

    kanbanSettings: {
        opportunities: {
            countPerPage: {
                type: Number,
                default: 10
            },
            foldWorkflows: [{
                type: String,
                default: ''
            }]
        },

        applications: {
            countPerPage: {
                type: Number,
                default: 10
            },
            foldWorkflows: [{
                type: String,
                default: ''
            }]
        },

        tasks: {
            countPerPage: {
                type: Number,
                default: 10
            },
            foldWorkflows: [{
                type: String,
                default: ''
            }]
        }
    },

    savedFilters: [{
        _id: {
            type: ObjectId,
            ref: 'savedFilters',
            default: null
        },
        byDefault: {
            type: Boolean,
            default: false
        },
        contentType: {
            type: String,
            default: null
        }
    }],

    ID: {
        type: Number,
        unique: true
    },
    relatedEmployee: {
        type: ObjectId,
        ref: 'Employees',
        default: null
    },
    imports: {
        fileName: {
            type: String,
            default: ''
        },
        filePath: {
            type: String,
            default: ''
        },
        timeStamp: {
            type: Number
        },
        stage: {
            type: Number,
            default: 1
        },
        map: {
            type: JSON
        },
        unMap: {
            type: JSON
        },
        type: {
            type: String,
            default: ''
        },
        comparingField: {
            type: String,
            default: ''
        },
        delimiter: {
            type: String,
            default: ','
        },
        skipped: {
            type: Array
        },
        conflictedItems: {
            type: Array
        },
        importedCount: {
            type: Number,
            default: 0
        }
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    collection: 'Users'
});


UserSchema.plugin(timestamps);

//var ExtrafieldModel = MODEL('extrafields').Schema;

var UserGroupModel = MODEL('group').Schema;
var userGroupList = {};

UserGroupModel.find(function(err, docs) {

    userGroupList = docs;

});

UserSchema.virtual('userGroup')
    .get(function() {

        var group;

        if (this.groupe) {
            for (var j in userGroupList) {
                if (userGroupList[j]._id === this.groupe)
                    group = userGroupList[j].name;
            }

        }

        return group;
    });


/**
 * Virtuals
 */
/*UserSchema.virtual('password').set(function(password) {
 this._password = password;
 this.salt = this.makeSalt();
 this.hashed_password = this.encryptPassword(password);
 }).get(function() {
 return this._password;
 });*/

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('username').validate(function(username) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1)
        return true;
    return username.length;
}, 'Name cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1)
        return true;
    return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    var self = this;

    //if (!this.isNew)
    //    return next();

    var SeqModel = MODEL('Sequence').Schema;

    if (!this.ID)
        return SeqModel.incCpt("user", function(seq) {
            self.ID = seq;
            next();
        });

    next();
});

/**
 * Authenticate - check if the passwords are the same
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function(plainText) {
    return this.password === plainText;
    //return this.encryptPassword(plainText) === this.hashed_password; // FIXME return after return
};
/**
 * Make salt
 *
 * @return {String}
 * @api public
 */
UserSchema.methods.makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};
/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
/*UserSchema.methods.encryptPassword = function(password) {
    if (!password)
        return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};*/
UserSchema.methods.generatePassword = function(length) {
    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    this.password = retVal;

    return retVal;
};

exports.Schema = mongoose.model('Users', UserSchema);
exports.name = 'Users';