define([
    './core',
    './application',
    './plugins/page',
    './sandbox',
    './loader'
], function (core, Application, pageExt) {

    'use strict';



    // ����Ӧ�ó���ʵ��
    core.createApp = function (appName, config) {
        var app = new Application;
        if (core.app) { core.app.stop(); }  // һ����ҳֻ��һ��Ӧ�ó���ʵ��
        core.app = app;

        app.core = core;
        app.config = config;
        app.name = appName;

        app.sandbox = core.sandboxes.create('app-' + appName, appName);

        _.isFunction(pageExt) && pageExt(app, Application);

        return app;
    };

    return core;
});