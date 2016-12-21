"use strict";

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        timestamps = require('mongoose-timestamp'),
        crypto = require('crypto'),
        authTypes = ['github', 'twitter', 'facebook', 'google'];

var Dict = INCLUDE('dict');

/**
 * User Schema
 */

var setFirstname = function (name) {
    if (!name) {
        return name;
    }

    name = name.toLowerCase();

    name = name.charAt(0).toUpperCase() + name.substr(1);

    return name;
};

var UserSchema = new Schema({
    // _id: {type: String},
    Status: {type: String, default: 'DISABLE'}, //mongoose.Schema.Types.Mixed,
    civilite: String,
    //name: {type: String, require: true},
    username: {type: String, unique: true, lowercase: true, sparse: true},
    email: {type: String, lowercase: true, trim: true, index: true, sparse: true},
    admin: Boolean,
    firstname: {type: String, trim: true, default: null, set: setFirstname},
    lastname: {type: String, uppercase: true, trim: true, default: null},
    DefaultLang: String,
    provider: String,
    password: String,
    hashed_password: String,
    salt: String,
    entity: {type: String, trim: true},
    photo: String,
    facebook: {},
    twitter: {},
    github: {},
    google: {
        user_id: String,
        sync: {type: Boolean, default: true}, // authorisation to sync with google
        tokens: {
            access_token: String,
            refresh_token: String
        },
        contacts: {
            latestImport: String, // date format YYYY-MM-DD
            group_href: String 		// group which contains exported contacts
        },
        tasks: {
            tasklist_id: String // tasklist which contains our tasks
        },
        calendar: {
            calendar_id: String // calendar which contains our events
        }
    },
    groups: [String],
    groupe: String,
    rights: mongoose.Schema.Types.Mixed,
    LastConnection: Date,
    NewConnection: Date,
    externalConnect: {type: Boolean, default: false},
    //url: {type: Schema.Types.Mixed}, //url by default after login,
    right_menu: {type: Boolean, default: true},
    home: String,
    societe: {type: Schema.Types.ObjectId, ref: 'societe'},
    multiEntities: {type: Boolean, default: false}, // Access to all entities ?
    poste: String
},
{
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    discriminatorKey: '_type',
    collection: 'users'
});


UserSchema.plugin(timestamps);

if (CONFIG('storing-files')) {
    var gridfs = INCLUDE('_' + CONFIG('storing-files'));
    UserSchema.plugin(gridfs.pluginGridFs, {root: "User"});
}

//var ExtrafieldModel = MODEL('extrafields').Schema;

var statusList = {};
Dict.dict({dictName: 'fk_user_status', object: true}, function (err, doc) {
    if (err) {
        console.log(err);
        return;
    }
    statusList = doc;
});

UserSchema.virtual('name')
        .get(function () {
            return this.firstname + " " + this.lastname;
        });

UserSchema.virtual('status')
        .get(function () {

            var res_status = {};

            var status = this.Status;

            if (status == 'ENABLE' && this.password)
                status = 'WEB';

            if (status == 'ENABLE' && !this.password)
                status = 'NOCONNECT';


            if (status && statusList.values[status].label) {
                //console.log(this);
                res_status.id = status;
                //this.status.name = i18n.t("intervention." + statusList.values[status].label);
                res_status.name = statusList.values[status].label;
                res_status.css = statusList.values[status].cssClass;
            } else { // By default
                res_status.id = status;
                res_status.name = status;
                res_status.css = "";
            }
            return res_status;

        });

var UserGroupModel = MODEL('userGroup').Schema;
var userGroupList = {};

UserGroupModel.find(function (err, docs) {

    userGroupList = docs;

});

UserSchema.virtual('userGroup')
        .get(function () {

            var group;

            if (this.groupe) {
                for (var j in userGroupList) {
                    if (userGroupList[j]._id === this.groupe)
                        group = userGroupList[j].name;
                }

            }

            return group;
        });

UserSchema.virtual('fullname').get(function () {
    var out = "";

    if (this.lastname)
        out += this.lastname;

    if (this.firstname)
        out += ' ' + this.firstname;


    return out;

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
var validatePresenceOf = function (value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('username').validate(function (username) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1)
        return true;
    return username.length;
}, 'Name cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1)
        return true;
    return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
/*UserSchema.pre('save', function (next) {
 var self = this;
 
 if (!this.isNew)
 return next();
 
 var SeqModel = MODEL('Sequence').Schema;
 
 //if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
 //    this.password = this.generatePassword(8);
 
 /*if (!this._id && this.isNew)
 return SeqModel.incNumber("ext", 9, function (seq) {
 self._id = "ext:" + seq;
 next();
 });*/

//    next();
//});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function (plainText) {
        return this.password === plainText;
        //return this.encryptPassword(plainText) === this.hashed_password; // FIXME return after return
    },
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        if (!password)
            return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    },
    generatePassword: function (length) {
        var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }

        this.password = retVal;

        return retVal;
    }
};

exports.Schema = mongoose.model('user', UserSchema, 'users');
exports.name = 'user';