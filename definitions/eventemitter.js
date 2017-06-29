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



var async = require('async');

F.functions.BusMQ = {};

var queuesList = [
    'product:update',
    'productFamily:update',
    'productFamily:coefUpdate'
];

var Bus = require('busmq');
var bus = Bus.create({ redis: ['redis://127.0.0.1:6379'] });
bus.on('online', function() {
    async.each(queuesList, function(queue, aCb) {
        var q = bus.queue(prefix + queue);
        q.on('attached', function() {
            console.log('attached to queue : ' + queue);
        });
        q.attach();
        F.functions.BusMQ[queue] = q;
        aCb();
    }, function(err) {});
});
bus.connect();



/*var Bus = require('busmq');
var bus = Bus.create({redis: ['redis://127.0.0.1:6379']});
bus.on('online', function() {
  var q = bus.queue('foo');
  q.on('attached', function() {
    console.log('attached to queue. messages will soon start flowing in...');
  });
  q.on('message', function(message, id) {
    if (message === 'my name if foo') {
      q.detach();
    }
  });
  q.attach();
  q.consume(); // the 'message' event will be fired when a message is retrieved
});
bus.connect();
*/