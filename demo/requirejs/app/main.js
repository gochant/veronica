define(function () {
    require(['require-conf'], function (config) {
        // ���� require.config
        require.config(config('../../../bower_components'));

        require(['veronica'], function (veronica) {
            // ���� app
            var app = veronica.createApp({
                global: true,
                modules: [{
                    name: '',
                    source: './',
                    hasEntry: false
                }]
            });

            // ���� widget: hello-veronica
            app.widget.register('hello-veronica', function (options) {
                var app = options.sandbox.app;
                var View = app.view.define();
                return new View(options);
            });

            app.launch().done(function () {
                // ��������
                app.parser.parse();
            });
        });

    });

});