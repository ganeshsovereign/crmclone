exports.id = 'dssisubscribe';
exports.title = 'MQTT DSSI subscribe';
exports.group = 'MQTT DSSI';
exports.color = '#656D78';
exports.version = '1.0.0';
exports.icon = 'clock-o';
exports.output = 1;
exports.author = 'Herve Prot';
exports.options = {};

exports.html = `
	<div class="padding">
		<div data-jc="dropdown" data-jc-path="broker" data-source="mqttconfig.brokers" class="m" data-required="true">@(Select a broker)</div>		
		<div data-jc="textbox" data-jc-path="uuid" data-placeholder="UUID" data-required="true" class="m">UUID</div>
		<!--<div data-jc="dropdown" data-jc-path="qos" data-options=";0;1;2" class="m">@(QoS)</div>-->
	</div>
	<script>
		ON('open.dssisubscribe', function(component, options) {
			TRIGGER('mqtt.brokers', 'mqttconfig.brokers');
		});
	</script>
`;

exports.readme = `
# MQTT DSSI subscribe


`;

exports.install = function(instance) {

    var added = false;
    var subscribed = false;
    var isWildcard = false;

    instance.custom.reconfigure = function(o, old_options) {

        added = false;
        subscribed = false;

        if (!MQTT_DSSI.broker(instance.options.broker)) {
            return instance.status('No broker', 'red');
        }

        if (instance.options.broker && instance.options.uuid) {

            //isWildcard = instance.options.topic.endsWith('#');

            if (!added)
                MQTT_DSSI.add(instance.options.broker);

            if (!subscribed)
                MQTT_DSSI.subscribe(instance.options.broker, instance.id, instance.options.uuid);

            if (old_options && (instance.options.uuid !== old_options.uuid || instance.options.qos !== old_options.qos)) {
                MQTT_DSSI.unsubscribe(instance.options.broker, instance.id, old_options.uuid);
                MQTT_DSSI.subscribe(instance.options.broker, instance.id, instance.options.uuid, instance.options.qos);
            }
            added = true;
            subscribed = true;
            return;
        }

        instance.status('Not configured', 'red');
    };

    instance.on('options', instance.custom.reconfigure);

    instance.on('close', function() {
        MQTT_DSSI.unsubscribe(instance.options.broker, instance.id, instance.options.uuid);
        MQTT_DSSI.remove(instance.options.broker, instance.id);
        OFF('mqtt.brokers.message', message);
        OFF('mqtt.brokers.status', brokerstatus);
    });

    ON('mqtt.brokers.message', message);
    ON('mqtt.brokers.status', brokerstatus);

    function brokerstatus(status, brokerid, msg) {
        if (brokerid !== instance.options.broker)
            return;

        switch (status) {
            case 'connecting':
                instance.status('Connecting', '#a6c3ff');
                break;
            case 'connected':
                // re-subscibe on reconnect
                MQTT_DSSI.subscribe(instance.options.broker, instance.id, instance.options.uuid);
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


    };

    function message(brokerid, message, fromUuid, callbackId) {
        if (brokerid !== instance.options.broker)
            return;

        if (instance.options.uuid !== fromUuid)
            return;

        /*if (isWildcard) {
            if (!topic.startsWith(instance.options.topic.substring(0, instance.options.topic.length - 1)))
                return;
        } else {
            if (instance.options.topic !== topic)
                return;
        }*/

        instance.send({ data: message, fromUuid: fromUuid, callbackId: callbackId });
    };

    instance.custom.reconfigure();
};