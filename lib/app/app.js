
define([
    '../core/index',
    './application',
    './emitQueue',
    './page',
    './layout',
    './module',
    './sandboxes',
    './widget',
    './parser',
    './view',
    './data',
    './router',
    './request',
    './hash',
    './qs',
    './provider'
], /**@lends veronica */function (core, Application, emitQueue, page, layout, module,
    sandboxes, widget, parser, view, data, router,
    request, hash, qs, provider) {

    'use strict';

    /**
     * jQuery 延迟对象
     * @typedef Promise
     */

    /**
     * 创建 app
     * @function veronica#createApp
     * @param {AppOptions} [options={}]
     * @returns {veronica.Application}
     */
    core.createApp = function (options) {

        var $ = core.$;

        // 停止以前的 app
        if (core.app) { core.app.stop(); }

        var app = new Application(options);

        provider(app);
        emitQueue(app, Application);
        sandboxes(app, Application);
        widget(app, Application);
        parser(app, Application);
        view(app, Application);
        request(app);
        data(app);
        hash(app);
        qs(app);

        //if ($.inArray('dialog', app.config.features) > -1) {
        //    // dialog
        //    dialog(app);
        //}

        if ($.inArray('spa', app.config.features) > -1) {
            // spa(single page application) 相关
            page(app, Application);
            layout(app, Application);
            module(app, Application);
            //navigation(app, Application);
            router(app);
        }

        //if ($.inArray('plugin', app.config.features) > -1) {
        //    // plugin
        //    plugin(app, Application);
        //}


        /**
         * `Application` 类的实例，在`global` 设为 `true` 的情况下，可通过`window.__verApp`访问
         * @name app
         * @type {Application}
         * @memberOf veronica
         */
        core.app = app;

        app.sandbox = app.sandboxes.create(app.name, core.enums.hostType.APP);

        if (app.config.global) { window.__verApp = app; }

        return app;
    };

    return core;
});
