"use strict";

var passport = require('passport'),
        util = require("util"),
        _ = require('lodash');

var LocalStrategy = require('passport-local').Strategy,
        //TwitterStrategy = require('passport-twitter').Strategy,
        //FacebookStrategy = require('passport-facebook').Strategy,
        //GitHubStrategy = require('passport-github').Strategy,
        LocalAPIKeyStrategy = require('passport-localapikey').Strategy,
        OAuth2Strategy = require('passport-oauth2').Strategy,
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    //passReqToCallback: true
    session: false
}, function (login, password, done) {
    var User = MODEL('user').Schema;

    function msg_error(msg) {
        return msg;
        //return '<div class="alert alert-danger"><button class="close" data-close="alert"></button><span>' + msg + '</span></div>';
    }

    var query = {
        Status: "ENABLE",
        password: {$ne: null}
    };

    if (login.indexOf("@") > 0) // email
        query.email = login.toLowerCase();
    else
        query.username = login.toLowerCase();

    User.findOne(query, "username firstname lastname password entity NewConnection")
            //.populate("societe", "id name Status")
            .exec(function (err, user) {
                if (err) {
                    return done(err);
                }
                console.log(user);
                if (!user) {
                    return done(null, false, {
                        error: msg_error('Unknown user')
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        error: msg_error('Invalid password')
                    });
                }

                done(null, user.toObject());
            });
}
));

passport.use(new LocalAPIKeyStrategy(
        function (apikey, done) {
            var User = MODEL('user').Schema;

            //console.log(apikey);

            User.findOne({
                key: apikey
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown apikey : ' + apikey});
                }
                // if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            });
        }
));

//Use twitter strategy
/*passport.use(new TwitterStrategy({
 consumerKey: CONFIG('twitter-key'),
 consumerSecret: CONFIG('twitter-secret'),
 callbackURL: CONFIG('twitter-callback')
 },
 function (token, tokenSecret, profile, done) {
 User.findOne({
 'twitter.id_str': profile.id
 }, function (err, user) {
 if (err) {
 return done(err);
 }
 if (!user) {
 user = new User({
 name: profile.displayName,
 username: profile.username,
 provider: 'twitter',
 twitter: profile._json
 });
 user.save(function (err) {
 if (err)
 console.log(err);
 return done(err, user);
 });
 } else {
 return done(err, user);
 }
 });
 }
 ));*/

//Use facebook strategy
/*passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
 },
 function (accessToken, refreshToken, profile, done) {
 User.findOne({
 'facebook.id': profile.id
 }, function (err, user) {
 if (err) {
 return done(err);
 }
 if (!user) {
 user = new User({
 name: profile.displayName,
 email: profile.emails[0].value,
 username: profile.username,
 provider: 'facebook',
 facebook: profile._json
 });
 user.save(function (err) {
 if (err)
 console.log(err);
 return done(err, user);
 });
 } else {
 return done(err, user);
 }
 });
 }
 ));*/

//Use github strategy
/*passport.use(new GitHubStrategy({
 clientID: config.github.clientID,
 clientSecret: config.github.clientSecret,
 callbackURL: config.github.callbackURL
 },
 function (accessToken, refreshToken, profile, done) {
 User.findOne({
 'github.id': profile.id
 }, function (err, user) {
 if (!user) {
 user = new User({
 name: profile.displayName,
 email: profile.emails[0].value,
 username: profile.username,
 provider: 'github',
 github: profile._json
 });
 user.save(function (err) {
 if (err)
 console.log(err);
 return done(err, user);
 });
 } else {
 return done(err, user);
 }
 });
 }
 ));*/

//Use google strategy
passport.use(new GoogleStrategy({
    clientID: CONFIG('google-id'),
    clientSecret: CONFIG('google-secret'),
    callbackURL: CONFIG('google-callback')
}, function (accessToken, refreshToken, profile, done) {
    var User = MODEL('user').Schema;

    //console.log(refreshToken);
    //console.log(profile);
    User.findOne({
        //'google.id': profile.id
        email: profile._json.emails[0].value,
        Status: "ENABLE"
    }, "-password", function (err, user) {
        if (err)
            console.log(err);

        if (!user) {
            console.log("User unknown ! " + profile._json.emails[0].value);

            return done({message: 'Unknown user ' + profile._json.emails[0].value}, false, {
                message: 'Unknown user ' + profile._json.emails[0].value
            });


            /*user = new User({
             name: profile.displayName,
             email: profile.emails[0].value,
             username: profile.username,
             provider: 'google',
             google: profile._json
             });
             user.save(function (err) {
             if (err)
             console.log(err);
             return done(err, user);
             });*/
        } else {
            //user.LastConnection = user.NewConnection;
            //user.NewConnection = new Date();

            if (!user.google.user_id)
                user.google.user_id = profile.id;

            user.google.tokens = {
                access_token: accessToken,
                refresh_token: refreshToken
            };

            //console.log(user);

            user.save(function (err, user) {
                if (err)
                    console.log(err);

                return done(err, user);
            });
        }
    });
}
));

// Load user profile
/*function SymeosOAuth2Strategy(options, verify) {
    OAuth2Strategy.call(this, options, verify);
}
util.inherits(SymeosOAuth2Strategy, OAuth2Strategy);

SymeosOAuth2Strategy.prototype.userProfile = function (accessToken, done) {
    Utils.request('https://fiabilis.symeos.com/profile/user/?access_token=' + accessToken, ['get'], function (err, data, status, headers) {
        if (err)
            return done(new Error('failed to load user profile'));

        if (status === 200)
            return done(null, JSON.parse(data));

        return done(new Error('failed to load user profile : token unknown'));
    });
};

passport.use(new SymeosOAuth2Strategy({
    authorizationURL: 'https://fiabilis.symeos.com/oauth2/authorize',
    tokenURL: 'https://fiabilis.symeos.com/oauth2/token',
    clientID: CONFIG('symeos-id'),
    clientSecret: CONFIG('symeos-secret'),
    callbackURL: CONFIG('symeos-callback')
}, function (accessToken, refreshToken, profile, done) {
    console.log("profile");
    console.log(profile);
    console.log("accessToken : %s", accessToken);
    console.log("refreshToken : %s", refreshToken);

    var User = MODEL('user').Schema;

    //console.log(refreshToken);
    //console.log(profile);
    User.findOne({
        //'google.id': profile.id
        //email: profile.email
        _id: profile.id
    }, "-password", function (err, user) {
        if (err)
            console.log(err);

        if (!user) {
            console.log("User unknown !");

            return done(null, false, {
                message: 'Unknown user'
            });


            /*user = new User({
             name: profile.displayName,
             email: profile.emails[0].value,
             username: profile.username,
             provider: 'google',
             google: profile._json
             });
             user.save(function (err) {
             if (err)
             console.log(err);
             return done(err, user);
             });*/
/*        } else {
            user.LastConnection = user.NewConnection;
            user.NewConnection = new Date();

            //console.log(user);

            user.save(function (err, user) {
                if (err)
                    console.log(err);

                return done(err, user);
            });
        }
    });

}
));*/

passport.serializeUser(function (user, done) {
    console.log("Passport !!!!!!!!!!!!!!!!!!!!!!!!!!");
    var UserModel = MODEL('user').Schema;
    var UserGroup = MODEL('userGroup').Schema;

    // Save Date Connection
    UserModel.update({
        _id: user._id
    }, {
        $set: {
            LastConnection: user.NewConnection,
            NewConnection: new Date()
        }
    }, function (err) {
    });

    var rights = {
        societe: {
            default: false // Needed
        }
    };

    user.rights = rights;

    //console.log(user.rights);
    if (user.groupe)
        return UserGroup.findOne({
            _id: user.groupe
        }, "rights", function (err, group) {
            user.rights = _.extend(user.rights, group.rights);
            //console.log(user.rights);
            done(null, user);
        });
    else
        done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log("Passport !!");
    done(null, obj);
});

framework.middleware('passport.js', passport.initialize());