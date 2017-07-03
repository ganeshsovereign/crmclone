exports.id = 'redispush';
exports.title = 'TM BusMQ Write';
exports.group = 'TM';
exports.color = '#656D78';
exports.version = '1.0.0';
exports.icon = 'clock-o';
exports.input = true;
exports.output = 0;
exports.author = 'Herve Prot';
exports.options = {
    method: 'PubSub'
};

exports.html = `
	<div class="padding">
		<div data-jc="textbox" data-jc-path="channel" data-placeholder="module:event" data-required="true" class="m">Channel</div>
        <div data-jc="dropdown" data-jc-path="method" data-required="true" data-options="PubSub;Queue" class="m">@(Method)</div>
	</div>
`;

exports.readme = `
# REDIS BusMQ Push message
    {userId, data}

`;

exports.install = function(instance) {
    var listner;

    var REDIS;

    instance.custom.reconfigure = function(o, old_options) {

        if (instance.options.channel) {
            listner = F.functions.BusMQ;


            if (!listner.exist(instance.options.channel))
                return instance.status('Channel error', 'red');

            return;
        }
        return instance.status('No Channel', 'red');
    };

    instance.on('data', function(flowdata) {
        if (instance.options.method == 'PubSub')
            return listner.publish(instance.options.channel, flowdata.data.userId, flowdata.data.data);

        listner.emit(instance.options.channel, flowdata.data.userId, flowdata.data.data);
    });

    instance.on('options', instance.custom.reconfigure);

    instance.custom.reconfigure();
};