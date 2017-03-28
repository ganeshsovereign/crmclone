//EventEmitter = require('eventemitter3');

var redis = require('redis-eventemitter');
var pubsub = redis({
    prefix: 'production:',
    host: '127.0.0.1',
    port: 6379
});

//var EE = new EventEmitter();

F.functions.PubSub = pubsub;