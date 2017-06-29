//EventEmitter = require('eventemitter3');

var prefix = CONFIG('database').split('/').pop() + ':';

var redis = require('redis-eventemitter');
var pubsub = redis({
    prefix: prefix,
    scope: prefix,
    host: '127.0.0.1',
    port: 6379
});

//var EE = new EventEmitter();

F.functions.PubSub = pubsub;

pubsub.on('error', function(err) {
    console.log(err);
});