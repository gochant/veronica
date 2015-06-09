define([
    'jquery',
    'underscore',
    'eventemitter',
    './events',
    './view',
    './history',
    './router',
    './loader',
    '../util/logger',
    '../util/util',
    '../util/aspect'
], function ($, _, EventEmitter, Events,
    View, history, Router, loader, Logger, util, aspect) {

    'use strict';

    /**
     * @namespace veronica
     * @description `veronica` 或者 通过 `app.core`
     */
    var veronica = {
        /**
         * jquery 对象
         * @memberOf veronica
         */
        $: $,
        /**
         * underscore 对象
         * @memberOf veronica
         */
        _: _,
        /**
         * 扩展对象
         * @memberOf veronica
         * @namespace
         */
        ext: {},
        /**
         * 帮助对象
         * @memberOf veronica
         * @namespace
         */
        helper: {},
        /**
         * 基础视图类（backbone View）
         * @class
         * @memberOf veronica
         */
        View: View,
        Router: Router,
        history: history,
        Events: Events,
        i18n: {
            defaultDialogTitle: '对话框',
            windowCloseText: '关闭',
            loadingText: '加载中...'
        },
        constant: {
            DEFAULT_MODULE_NAME: '__default__'
        }
    };

    /**
     * 加载器
     * @memberOf veronica
     */
    veronica.loader = loader;
    /**
     * 工具方法
     * @memberOf veronica
     * @namespace
     */
    veronica.util = util;

    veronica.aspect = aspect;

    /**
     * 获取全局配置
     * @function veronica.getConfig
     */
    veronica.getConfig = (function () {
        var requirejs = veronica.loader.useGlobalRequirejs();
        var globalConfig = requirejs.s ? requirejs.s.contexts._.config : {
            sources: {}
        };

        globalConfig.sources || (globalConfig.sources = {});

        return function () {
            return globalConfig;
        };
    }());

    veronica.logger = new Logger();
    if (veronica.getConfig().debug) {
        veronica.logger.enable();
    }

    // 中介者
    var emitterConfig = _.defaults(veronica.getConfig() || {}, {
        wildcard: true,
        delimiter: '.',
        newListener: true,
        maxListeners: 50
    });

    veronica.mediator = new EventEmitter(emitterConfig);

    return veronica;
});
