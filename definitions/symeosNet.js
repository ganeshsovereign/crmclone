var Symeos = require('symeos-mqtt');

if (!CONFIG('symeosnet'))
    return;

var config = JSON.parse(CONFIG('symeosnet'));

if (config && config.uuid) {
    var symeos = new Symeos(config);
    console.log('starting symeosNet...');

    //F.functions.EE = EE;

    symeos.connect(function(response) {
        console.log('Connected to SymeosNet', response);
        // Update Device - response emits event 'config'
        symeos.update({ uuid: config.uuid, type: CONFIG('name') });

        // On message
        symeos.on('message', function(message) {
            //console.log('recieved message', message);

            var MODEL;

            if (message.payload.include) {
                MODEL = INCLUDE(message.payload.include);

                MODEL.create(message.payload.model, { _id: 'user:symeosnet', firstname: message.payload.name, lastname: message.payload.service }, F.functions.EE, function(err, doc) {
                    if (err)
                        return console.log(err);

                });
            }





        });




        // Send Data - response emits event 'data'
        //symeos.publish("Temperature", {sensorData: 1500}, function(response){
        //    console.log(response);
        //});

        // Message - response emits event 'message'
        /* var message = {
         devices: ['4330072e-c3a5-4ada-b4c8-b57dd5baeebd'],
         payload: {ilove: 'food'},
         qos: 1
         };*/
        //symeos.message(message);

        // Reset token - response emits event 'token'
        // symeos.resetToken({uuid: 'some-uuid'});

        // Generate New Session Token - response emits event 'generateAndStoreToken'
        //symeos.generateAndStoreToken({uuid: 'some-uuid'});

        //symeos.getPublicKey({uuid: '38d8117c-3552-4006-b501-a2519db15461'}, function(error, response){
        //  console.log('retrieved publicKey', response.publicKey);
        //});

        // Whoami
        //symeos.whoami(function(error, device){
        //  console.log('whoami', device);
        //});


    });

    // On config
    /*symeos.on('config', function (config) {
     console.log('recieved config', config);
     });*/

    // On data
    /*symeos.on('data', function (data) {
     console.log('recieved data', data);
     });*/

    symeos.on('error', function(data) {
        console.log('recieved error', data);
        F.functions.EE.emit('symeosnet', { type: 'symeosnet', data: { online: false } });
    });

    /*symeos.on('reconnect', function () {
     console.log('recieved reconnect');
     });*/

    symeos.on('offline', function() {
        //console.log('recieved offline');
        F.functions.EE.emit('symeosnet', { type: 'symeosnet', data: { online: false } });
    });

    symeos.on('connect', function() {
        //console.log('recieved connect');
        F.functions.EE.emit('symeosnet', { type: 'symeosnet', data: { online: true } });
    });

    F.functions.EE.on('publish', function(data) {
        console.log(data);
        console.log("Send to SymeosNet");

        var message = {
            devices: ['c19f34e4-fd73-4010-a33c-b1c589ea8b03'],
            payload: { reload: true },
            qos: 1
        };
        symeos.message(message);
    });

    /*symeos.on('close', function () {
     console.log('recieved close');
     });
     */
}