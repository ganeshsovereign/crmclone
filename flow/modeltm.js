exports.id = 'modeltm';
exports.title = 'Model TM';
exports.version = '1.0.0';
exports.author = 'Herve Prot';
exports.group = 'TM';
exports.color = '#f3c200';
exports.input = true;
exports.output = 2;
exports.cloning = false;
exports.options = {};
exports.readme = `# Loading Updating Data Model in ToManage

Return execution response to output.`;

exports.html = `
	<div class="padding">
        <div data-jc="dropdown" data-jc-path="model" data-required="true" data-options="product;productFamily;productFamilyCoef;priceList" class="m">@(Model)</div>
        <div data-jc="dropdown" data-jc-path="method" data-required="true" data-options="insert;update;read;query" class="m">@(Method)</div>
`;

exports.install = function(instance) {

    instance.on('data', function(flowdata) {
        instance.send(1, flowdata.clone());
        var options = instance.options;

        if (!options.model) {
            flowdata.data = { err: '[DB] No model specified' };
            instance.send(0, flowdata);
            return instance.error('[DB] No model specified')
        }

        var Model = MODEL(options.model).Schema;

        if (options.method === 'read') {

            if (!flowdata.data._id) {
                flowdata.data = { err: '[DB] Cannot get record by _id: `undefined`' };
                instance.send(0, flowdata);
                return instance.error('[DB] Cannot get record by _id: `undefined`');
            }

            return Model.findById(flowdata.data._id, function(err, response) {
                err && instance.error(err);

                flowdata.data = { err: err, response: response };
                instance.send(0, flowdata);
            });
        }

        if (options.method === 'insert') {

            var object = new Model(flowdata.data);

            return object.save(function(err, doc) {
                err && instance.error(err);

                flowdata.data = { err: err, success: err ? false : true, response: doc }
                instance.send(0, flowdata);
            });
        }

        if (options.method === 'query') {
            var query = flowdata.data.query;

            return Model.find(query, function(err, docs) {
                err && instance.error(err);

                flowdata.data = { err: err, response: docs || [] };
                instance.send(0, flowdata);
            });
        }

        if (options.method === 'update') {

            if (!flowdata.data._id) {
                flowdata.data = { err: '[DB] Cannot update record by _id: `undefined`' };
                instance.send(0, flowdata);
                return instance.error('[DB] Cannot update record by _id: `undefined`');
            }

            if (!flowdata.data.body) {
                flowdata.data = { err: '[DB] Cannot update record by body: `undefined`' };
                instance.send(0, flowdata);
                return instance.error('[DB] Cannot update record by body: `undefined`');
            }

            return Model.findByIdAndUpdate(flowdata.data._id, flowdata.data.body, { new: true }, function(err, doc) {
                err && instance.error(err);

                flowdata.data = { err: err, response: doc };
                instance.send(0, flowdata);
            });
        }
    });
};