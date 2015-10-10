define(function () {
    require(['require-conf'], function (config) {
        // ���� require.config
        require.config(config('../../../bower_components'));

        require(['veronica'], function (veronica) {
            // ���� app
            var app = veronica.createApp({
                global: true,
                plugins: {
                    'hello': ['pl-hello']
                }
            });

            // ���� widget: hello-veronica
            app.widget.register('widget-inline', {});

            app.launch().done(function () {
                // ��������
                app.parser.parse();
            });
        });

    });

});