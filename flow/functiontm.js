exports.id = 'functiontm';
exports.title = 'Function TM';
exports.version = '1.0.0';
exports.author = 'Herve Prot';
exports.group = 'TM';
exports.color = '#f3c200';
exports.input = true;
exports.output = 1;
exports.cloning = false;
exports.options = {
    outputs: 1,
    code: `send('Hello world!');`
};
exports.readme = `# Condition

A condition has to return an \`index\` for re-send current data to the specific output. Return values like \`null\`, \`undefined\` or \`false\` cancels re-sending. \`true\` sends data to all outputs.`;

exports.html = `<div class="padding">
	<div class="row">
		<div class="col-md-3 m">
			<div data-jc="textbox" data-jc-path="output" data-placeholder="@(Count of outputs)" data-maxlength="1" data-jc-type="number" data-increment="true" data-align="center" data-required="true" data-icon="fa-sitemap">@(Outputs)</div>
		</div>
	</div>
	<div data-jc="codemirror" data-type="javascript" data-jc-path="code" data-required="true" data-height="500px">@(Code)</div>
	<div class="help">@(Data will continue when the condition will be validated.)</div>
</div><script>ON('save.condition', function(component, options) {
	component.output = options.output || 1;
});</script>`;

exports.install = function(instance) {

    var fn = null;

    instance.on('data', function(response) {
        fn && fn(response.data, function(err, data) {
            if (err)
                return instance.error(err);

            instance.send(data);
        });
    });

    instance.custom.response = function(err, value, response) {
        if (err)
            return;
        if (value > -1)
            instance.send(value, response);
        else if (value === true)
            instance.send(response);
    };

    instance.custom.reconfigure = function() {
        try {
            if (instance.options.code) {
                var arg = instance.options.code;

                if (/^function\s*[^\(]*\(/.test(arg))
                    fn = toFunc(arg);
                else
                    throw error(arg);
            }
        } catch (e) {
            fn = null;
        }
    };

    instance.on('options', instance.custom.reconfigure);
    instance.custom.reconfigure();

    // converting functions stored as strings in the instance
    function toFunc(arg) {
        'use strict';

        arg = arg.trim();

        // zero length strings are considered null instead of Error
        if (0 == arg.length) return null;

        // must start with "function"
        if (!/^function\s*[^\(]*\(/.test(arg))
            throw error(arg);


        // trim string to function only
        arg = trim(arg);

        return F.eval('(' + arg + ')');
    }

    /**
     * Trim `arg` down to only the function
     */

    function trim(arg) {
        var match = arg.match(/^function\s*[^\(]*\([^\)]*\)\s*{/);
        if (!match) throw error(arg);

        // we included the first "{" in our match
        var open = 1;

        for (var i = match[0].length; i < arg.length; ++i) {
            switch (arg[i]) {
                case '{':
                    open++;
                    break;
                case '}':
                    open--;
                    if (open === 0) {
                        // stop at first valid close of function
                        return arg.substring(0, i + 1);
                    }
            }
        }
        throw error(arg);
    }

};