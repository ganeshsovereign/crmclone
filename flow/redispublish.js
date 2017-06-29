exports.id = 'redispublish';
exports.title = 'REDIS publish';
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
# REDIS publish


`;

exports.install = function(instance) {

    var added = false;
    var listner;

    var REDIS = F.functions.PubSub;

    instance.on('data', function(flowdata) {
        REDIS.emit(instance.options.channel, flowdata.data);
    });
};