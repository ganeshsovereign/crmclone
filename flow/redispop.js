exports.id = 'redispop';
exports.title = 'REDIS BusMQ Read';
exports.group = 'MQTT';
exports.color = '#656D78';
exports.version = '1.0.0';
exports.icon = 'clock-o';
exports.output = 2;
exports.author = 'Herve Prot';
exports.options = {};

exports.html = `<div class="padding">
		<div data-jc="textbox" data-jc-path="channel" data-placeholder="module:event" data-required="true" class="m">Channel</div>
	</div>
`;

exports.readme = `
# REDIS BusMQ Consume 


`;

exports.install = function(instance) {

    var added = false;
    var subscribed = false;
    var listner;

    var REDIS;

    instance.custom.reconfigure = function(o, old_options) {

        if (instance.options.channel) {
            if (!subscribed)
                listner = F.functions.BusMQ[instance.options.channel];

            if (!listner)
                return instance.status('Channel error', 'red');

            if (subscribed && old_options && (instance.options.channel !== old_options.channel)) {
                listner.stop();
                listner = F.functions.BusMQ[instance.options.channel];
            }

            listner.on('message', message);
            listner.consume();

            subscribed = true;
            return;
        }
        return instance.status('No Channel', 'red');
    };

    instance.on('options', instance.custom.reconfigure);

    instance.on('close', function() {
        if (listner)
            listner.stop();
    });

    function message(message, id) {
        instance.send(1, id);
        instance.send(0, JSON.parse(message));
    };

    instance.custom.reconfigure();

};