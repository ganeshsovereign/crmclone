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



var passport = require('passport');
var _ = require('lodash');

exports.install = function() {
    F.route('/login', view_redirect, ['authorize']);
    F.route('/login', view_login, ['unauthorize']);
    F.route('/login/', passport_login_local, ['post', '#passport.js']);
    F.route('/login/key/', passport_login_key, ['#passport.js']);
    F.route('/login/google/', passport_login_google, ['#passport.js']);
    F.route('/login/google/callback/', passport_login_google_callback, ['#passport.js']);
    F.route('/login/symeos/', passport_login_symeos, ['#passport.js']);
    F.route('/login/symeos/callback/', passport_login_symeos_callback, ['#passport.js']);
    //F.route('/login/twitter/', passport_login_twitter, ['#session', '#passport.js']);
    //F.route('/login/twitter/callback/', passport_login_twitter_callback, ['#session', '#passport.js']);
    F.route('/logout/', logout, ['authorize']);
    F.route('/session/', session, ['post', 'authorize']);
    F.route('/erp/decrypt', decrypt, ['post']); //TODO MUST REMOVED
};

function view_login() {
    var self = this;

    //self.theme(null);
    self.layout('layout_login2');
    self.view('login2');
}

function view_redirect() {
    this.redirect('/erp/');
}

// Login/Password sign in
function passport_login_local() {
    var self = this;
    var auth = MODULE('auth');
    var UserModel = MODEL('Users').Schema;

    //clear old flash message
    //self.flash('error', []);

    // Why self.custom()?
    // Because passport module has own mechanism for redirects into the Twitter.
    //self.custom();

    console.log(self.req.body);

    passport.authenticate('local', function(err, user, info) {
        if (err)
            return self.throw500(err);
        if (info) {
            console.log(info);
            return self.json([info]);
        }

        //console.log(user);

        auth.login(self, user._id, user);

        // Update last connection
        UserModel.update({
            _id: user._id
        }, {
            $set: {
                lastConnection: user.newConnection,
                newConnection: new Date()
            }
        }, function(err) {});


        return self.json({
            success: true
        });

    })(self.req, self.res);
}

// apiKey sign in
function passport_login_key() {
    var self = this;

    // Why self.custom()?
    // Because passport module has own mechanism for redirects into the Twitter.
    //self.custom();

    console.log(self.req.query);

    passport.authenticate('localapikey', {
        successRedirect: '/erp/',
        failureRedirect: '/login',
        failureFlash: false
    })(self.req, self.res);
}

// Twitter sign in
function passport_login_twitter() {
    var self = this;

    // Why self.custom()?
    // Because passport module has own mechanism for redirects into the Twitter.
    self.custom();

    passport.authenticate('twitter')(self.req, self.res);
}

// Twitter profile
function passport_login_twitter_callback() {
    var self = this;
    passport.authenticate('twitter')(self.req, self.res, function(err) {
        if (err)
            return self.redirect('/login/twitter/');

        // self.json(self.user);
        self.json({
            name: self.user.displayName
        });
    });

}

function passport_login_google() {
    var self = this;

    self.custom();

    passport.authenticate('google', {
        //failureRedirect: '/login',
        //accessType: 'offline', // will return a refresh token
        //approvalPrompt: 'force',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
            //	'https://www.googleapis.com/auth/contacts',
            //	'https://www.googleapis.com/auth/tasks',
            //	'https://www.googleapis.com/auth/tasks.readonly',
            //	'https://www.googleapis.com/auth/calendar',
            //	'https://www.googleapis.com/auth/calendar.readonly'
        ]
    })(self.req, self.res);
}

function passport_login_google_callback() {
    var self = this;

    var auth = MODULE('auth');

    passport.authenticate('google')(self.req, self.res, function(err) {
        if (err) {
            console.log(err);
            return self.plain(err);
            //return self.redirect('/login/google/');
        }

        // self.json(self.user);
        //self.json({name: self.user.fullname});

        //console.log(user);

        auth.login(self, self.user._id, self.user);

        self.redirect('/erp/');
    });
}

function passport_login_symeos() {
    var self = this;

    self.custom();

    passport.authenticate('oauth2')(self.req, self.res);
}

function passport_login_symeos_callback() {
    var self = this;

    passport.authenticate('oauth2')(self.req, self.res, function(err) {
        if (err) {
            console.log(err);
            return self.redirect('/login/symeos/');
        }

        // self.json(self.user);
        //self.json({name: self.user.fullname});
        self.redirect('/erp/');
    });
}

function logout() {
    var self = this;
    var auth = MODULE('auth');
    var user = self.user;

    //console.log(user);
    if (user)
        auth.logoff(self, user._id);

    self.redirect('/');
}

function session() {
    var self = this;

    if (!self.user)
        return self.throw401();

    var user = self.user.toObject();

    delete user.password;
    //delete user.hashed_password;
    delete user.google;
    //console.log("session",user);

    var config = {
        version: "1.2.3"
    };


    self.json({
        user: user,
        config: config
    });
}

function decrypt() {
    var self = this;
    var sessionModel = MODEL('session').Schema;
    var userModel = MODEL('Users').Schema;

    var session = F.decrypt(self.body.data, CONFIG('secret'));

    sessionModel.findOne({
        session: session.id
    }, function(err, doc) {
        //console.log(doc.value);
        if (doc && doc.value && doc.value.passport && doc.value.passport.user)
            userModel.findOne({
                _id: doc.value.passport.user
            }, "-password -google", function(err, user) {
                self.json({
                    passport: {
                        user: user
                    }
                });
            });
        else
            self.json({});
    });

}