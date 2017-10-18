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



var mongoose = require('mongoose'),
    _ = require('lodash');

// ================================================
// AUTHORIZATION
// ================================================

framework.on('module#auth', function(type, name) {
    MODULE('auth').onAuthorize = function(id, callback) {

        // this is cached
        // read user information from database
        // into callback insert the user object (this object is saved to session/cache)
        // this is an example

        // Why "1"? Look into auth.login(controller, "ID", user);

        //console.log("Authorize ", id);

        if (id == null)
            return callback(false);


        var user = F.cache.read('user_' + id);
        if (user) {
            //req.user = user;
            return callback(user);
        } else {
            var UserModel = MODEL('Users').Schema;
            UserModel.findOne({
                    _id: id,
                    isEnable: true
                }, "username entity groupe groups home societe multiEntities poste admin email right_menu")
                .populate("societe", "id name Status price_level address zip town")
                .exec(function(err, response) {

                    if (!response)
                        return callback(false); // if user not exist then

                    console.log("onAuthorize", response.email);

                    console.log("Load rights !");
                    var UserGroup = MODEL('group').Schema;

                    var rights = {
                        societe: {
                            default: false // Needed
                        }
                    };

                    response.rights = rights;
                    delete response.password;
                    delete response.hashed_password;
                    delete response.google;

                    //console.log(user.rights);
                    if (response.groupe)
                        return UserGroup.findOne({
                            _id: response.groupe
                        }, "rights", function(err, group) {
                            response.rights = _.extend(response.rights, group.rights);
                            //console.log(user.rights);
                            F.cache.add('user_' + response._id, response, '5 minutes');
                            //console.log(response);
                            callback(response);
                        });

                    F.cache.add('user_' + response._id, response, '5 minutes');
                    //console.log(response);
                    callback(response);
                });
        }
    };

});


/*F.middleware('authorization', function (req, res, next, options, controller) {
 console.log("onAuthorize !!!!!!!", req.session);
 
 if (!req.session || !req.session.passport)
 return res.redirect('/login/');
 
 var user = req.session.passport.user;
 
 if (user == null || user === '')
 return res.redirect('/login/');
 
 //console.log(user);
 
 //if (controller)
 //	controller.repository.C = 'middleware - private - C';
 
 //console.log(controller);
 
 mongoose.connection.db.collection('Mysoc', function (err, collection) {
 collection.findOne({
 _id: user.entity
 }, function (err, entity) {
 
 if (controller) {
 controller.user = user;
 controller.entity = entity;
 }
 
 next();
 });
 });
 
 });*/