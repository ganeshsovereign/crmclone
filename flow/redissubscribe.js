exports.id = 'redissubscribe';
exports.title = 'REDIS subscribe';
exports.group = 'TM';
exports.color = '#f3c200';
exports.version = '1.0.0';
exports.icon = 'clock-o';
exports.output = 1;
exports.author = 'Herve Prot';
exports.options = {};

exports.html = `
	<div class="padding">
		<div data-jc="textbox" data-jc-path="channel" data-placeholder="module:event" data-required="true" class="m">Channel</div>
	</div>
`;

exports.readme = `
# REDIS subscribe


`;

exports.install = function(instance) {

    var added = false;
    var subscribed = false;
    var listner;

    var MESSAGE = {};

    var REDIS = F.functions.PubSub;

    instance.custom.reconfigure = function(o, old_options) {

        if (instance.options.channel) {

            if (!subscribed)
                listner = REDIS.on(instance.options.channel, message);

            if (old_options && (instance.options.channel !== old_options.channel)) {
                REDIS.removeListener(old_options.channel, listner);
                listner = REDIS.on(instance.options.channel, message);
            }
            subscribed = true;
            return;
        }

        instance.status('Not configured', 'red');
    };

    instance.on('options', instance.custom.reconfigure);

    instance.on('close', function() {
        REDIS.removeListener(instance.options.channel, listner);
    });

    //ON('mqtt.brokers.message', message);
    //ON('mqtt.brokers.status', brokerstatus);

    /*function brokerstatus(status, brokerid, msg) {
        if (brokerid !== instance.options.broker)
            return;

        switch (status) {
            case 'connecting':
                instance.status('Connecting', '#a6c3ff');
                break;
            case 'connected':
                // re-subscibe on reconnect
                MQTT.subscribe(instance.options.broker, instance.id, instance.options.topic);
                instance.status('Connected', 'green');
                break;
            case 'disconnected':
                instance.status('Disconnected', 'red');
                break;
            case 'connectionfailed':
                instance.status('Connection failed', 'red');
                break;
            case 'new':
            case 'removed':
                instance.custom.reconfigure();
                break;
            case 'error':
                instance.status(msg, 'red');
                break;
        };


    };*/

    function message(channel, data) {
        MESSAGE.channel = channel;
        MESSAGE.data = data;
        instance.send(MESSAGE);
    };

    instance.custom.reconfigure();
};