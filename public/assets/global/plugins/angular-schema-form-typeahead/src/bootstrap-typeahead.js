angular.module('schemaForm').config(
        ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
            function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

                var typeahead = function (name, schema, options) {
                    if (schema.type === 'object' && schema.format === 'typeahead') {
                        var f = schemaFormProvider.stdFormObj(name, schema, options);
                        f.key = options.path;
                        f.type = 'typeahead';
                        options.lookup[sfPathProvider.stringify(options.path)] = f;
                        return f;
                    }
                };

                schemaFormProvider.defaults.object.unshift(typeahead);

                //Add to the bootstrap directive
                schemaFormDecoratorsProvider.addMapping(
                        'bootstrapDecorator',
                        'typeahead',
                        'directives/decorators/bootstrap/typeahead/typeahead.html'
                        );
                schemaFormDecoratorsProvider.createDirective(
                        'typeahead',
                        'directives/decorators/bootstrap/typeahead/typeahead.html'
                        );
            }
        ]);
        