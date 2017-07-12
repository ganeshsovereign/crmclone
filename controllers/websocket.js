var _ = require('lodash'),
    async = require('async');

exports.install = function() {
    F.websocket('/erp/websocket/', websocket, ['json'], ['erp']);
};

function websocket() {
    var UserModel = MODEL('Users').Schema;
    var self = this;
    var usersId = {};
    //console.log("Connect Websocket");

    // refresh online users
    var refresh = function() {

        var usersList = [];
        self.all(function(client) {
            if (client.alias) {
                usersId[client.alias] = client.id;
                if (usersList.indexOf(client.alias) < 0)
                    usersList.push(client.alias);
            }
        });
        UserModel.find({ _id: { $in: usersList } }, "username email photo societe", function(err, users) {
            self.send({ type: 'users', message: users, online: self.online });
            //console.log("Connected: ", users);

            F.global.USERS = users; // User connected
        });
    };
    self.on('open', function(client) {
        console.log('Connect / Online:', self.online);
    });
    self.on('message', function(client, message) {

        if (message.type === 'change') {
            client.alias = message.message;
            refresh();
            return;
        }

        self.send({ user: client.alias, type: 'message', message: message.message, date: new Date() }, function(current) {
            return (current.alias || '').length > 0;
        });
    });
    self.on('close', function(client) {
        console.log('Disconnect : ' + client.alias);
        refresh();
    });
    /*F.functions.EE.on('task', function(data) {
        //console.log(data);
        //console.log("task");
        self.send({ type: 'task', message: data });
    });*/



    F.functions.BusMQ.subscribe('notify:controllerAngular', function(notify) {
        self.send({ type: 'refresh', data: notify }, function(id, client) {
            //send to all
            return true;
        });

        if (notify.go) //$rootScope.go
            self.send({ type: 'go', data: notify }, function(id, client) {
            //send to all
            //console.log(client);
            return (notify.userId.indexOf(client.alias) >= 0);
        });


    });

    F.functions.BusMQ.subscribe('notify:user', function(notify) {
        // send text notification
        self.send({ type: 'notify', message: notify, date: new Date() }, function(id, client) {
            // send only to users in notify.users Array
            return (notify.userId.indexOf(client.alias) >= 0);
        });
    });


    /*var diff = _.difference(notify.users, F.global.USERS);
     
     if (diff.length) {
     //send email if needed notification
     console.log("Send email to ", diff);
     
     var mail = require('total.js/mail');
     var message = new mail.Message('Scan coupon', 'Scan coupon ');
     
     mail.on('error', function (err, message) {
     console.log(err);
     });
     
     mail.on('success', function(message) { console.log("Really sended!") });
     
     // Set email sender
     message.from('no-reply@logicielentreprise.com', 'Notification de LE&CO');
     
     message.to('herve.prot@leandco.fr');
     
     message.send(CONFIG('mail.smtp'), CONFIG('mail.smtp.options'), function () {
     console.log("sended");
     });
     
    }*/

}