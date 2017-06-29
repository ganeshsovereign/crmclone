exports.id = 'redispush';
exports.title = 'REDIS BusMQ Push';
exports.group = 'MQTT';
exports.color = '#656D78';
exports.version = '1.0.0';
exports.icon = 'clock-o';
exports.input = true;
exports.output = 0;
exports.author = 'Herve Prot';
exports.options = {};

exports.html = `
	<div class="padding">
		<div data-jc="textbox" data-jc-path="channel" data-placeholder="module:event" data-required="true" class="m">Channel</div>
	</div>
`;

exports.readme = `
# REDIS BusMQ Push message


`;

exports.install = function(instance) {
    var listner;

    var REDIS;

    instance.custom.reconfigure = function(o, old_options) {

        if (instance.options.channel) {
            listner = F.functions.BusMQ[instance.options.channel];

            if (!listner)
                return instance.status('Channel error', 'red');

            return;
        }
        return instance.status('No Channel', 'red');
    };

    instance.on('data', function(flowdata) {
        listner.push(flowdata.data);
    });

    instance.on('options', instance.custom.reconfigure);

    instance.custom.reconfigure();
};