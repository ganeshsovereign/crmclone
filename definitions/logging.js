if (F.isDebug) {
    F.on('request', function(req) {
        req.$begin = Date.now();
        req.on('end', () => console.log(req.ip, req.method, req.url, '[' + ((Date.now() - req.$begin)) + 'ms]'));
    });
}