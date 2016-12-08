var mosca = require('mosca');

F.on('load', function () {
    var pubsubsettings = {
        type: 'redis',
        redis: require('redis'),
        db: 12,
        port: 6379,
        return_buffers: true, // to handle binary payloads
        host: "localhost"
    };

    var moscaSettings = {
        port: 1883, //mosca (mqtt) port
        backend: pubsubsettings   //pubsubsettings is the object we created above
    };

    var mqttServ = new mosca.Server(moscaSettings);   //here we start mosca

    mqttServ.attachHttpServer(F.server);
    mqttServ.on('ready', setup);  //on init it fires up setup()

// fired when the mqtt server is ready
    function setup() {
        mqttServ.authenticate = authenticate;
        console.log('MQTT server is up and running');
    }

    // fired when a message is published
    mqttServ.on('published', function (packet, client) {
        console.log('Published', packet);
        //console.log('Client', client);
    });
// fired when a client connects
    mqttServ.on('clientConnected', function (client) {
        console.log('Client Connected:', client.id);
    });

// fired when a client disconnects
    mqttServ.on('clientDisconnected', function (client) {
        console.log('Client Disconnected:', client.id);
    });

    var authenticate = function (client, username, password, callback) {
        var authorized = (username === 'alice' && password.toString() === 'secret');
        if (authorized)
            client.user = username;
        callback(null, authorized);
    };


});