EventEmitter = require('eventemitter3');

var EE = new EventEmitter();

F.functions.EE = EE;

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