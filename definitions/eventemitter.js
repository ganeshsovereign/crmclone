//EventEmitter = require('eventemitter3');

var redis = require('redis-eventemitter');
var pubsub = redis({
    prefix: CONFIG('database').split('/').pop() + ':',
    host: '127.0.0.1',
    port: 6379
});

//var EE = new EventEmitter();

F.functions.PubSub = pubsub;

if (F.isDebug) {
    F.on('request', function(req) {
        req.$begin = Date.now();
        req.on('end', function() {
            if (req.flags)
                req.res.once('finish', function() {
                    console.log(req.ip, req.method, req.url, '[' + ((Date.now() - req.$begin)) + 'ms]', req.res.statusCode);
                });
        });
    });
}