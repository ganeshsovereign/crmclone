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
var Bus = require('busmq');

var queuesList = [
    'customer:update',
    'product:update',
    'product:updateDirectCost',
    'product:updateAttributes',
    'product:updateCategory',
    'product:deleteCategory',
    'productFamily:update',
    'productFamily:coefUpdate',
    'productPrices:updateDiscountRate',
    'productPrices:updatePrice',
    'notify:user',
    'notify:controllerAngular'
];

function BusMQ(bus) {
    this.bus = bus;
    var prefix = CONFIG('database').split('/').pop() + ':';
    this.name = function(name) {
        return prefix + name;
    };
    this.queues = {};
    this.pubsub = {};
};

BusMQ.prototype = {
    emit: function(name, userId, message) {
        if (!this.queues[this.name(name)])
            return null;

        message.userId = userId;

        this.queues[this.name(name)].push(message);
    },
    exist: function(name) {
        if (!this.queues[this.name(name)])
            return false;
        return true;
    },
    getQueue: function(name) {
        if (!this.queues[this.name(name)])
            return null;

        return this.queues[this.name(name)];
    },
    publish: function(name, userId, message) {
        if (!this.pubsub[this.name(name)])
            return null;

        message.userId = userId;

        this.pubsub[this.name(name)].publish(message);
    },
    subscribe: function(name, callback) {
        if (!this.pubsub[this.name(name)])
            return console.log('PusSub Not found : ' + name);

        this.pubsub[this.name(name)].on('message', function(data) {
            return callback(JSON.parse(data));
        });
        this.pubsub[this.name(name)].subscribe();

        return this.pubsub[this.name(name)];
    },
    attach: function(queuesList) {
        var self = this;
        self.bus.on('online', function() {
            async.each(queuesList, function(queue, aCb) {
                var q = bus.queue(self.name(queue));
                q.on('attached', function() {
                    console.log('attached to queue : ' + queue);
                });
                q.attach();
                self.queues[self.name(queue)] = q;


                var s = bus.pubsub(self.name(queue));
                self.pubsub[self.name(queue)] = s;

                aCb();
            }, function(err) {});
        });
        self.bus.connect();
    }
};

var bus = Bus.create({ redis: ['redis://127.0.0.1:6379'] });
F.functions.BusMQ = new BusMQ(bus);
F.functions.BusMQ.attach(queuesList);

F.on('load', function() {});


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