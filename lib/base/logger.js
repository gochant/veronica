
define([], function () {
    'use strict';

    // thx h5-boilerplate
    // from: https://github.com/h5bp/html5-boilerplate/blob/master/src/js/plugins.js

    (function () {
        var method;
        var noop = function () { };
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());

    var noop = function () { };
    var DEFAULT_NAME = 'veronica';
    var console = window.console || {};

    var isIE8 = function _isIE8() {
        return (!Function.prototype.bind || (Function.prototype.bind && typeof window.addEventListener === 'undefined')) &&
            typeof console === 'object' &&
            typeof console.log === 'object';
    };

    /**
     * @classdesc 浏览器控制台日志对象
     * @class Logger
     * @memberOf veronica
     */
    function Logger(name) {
        this.name = name || DEFAULT_NAME;
        this._log = noop;
        this._warn = noop;
        this._error = noop;
        this._info = noop;
        return this;
    }

    /**@lends veronica.Logger#*/
    var proto = {
        constructor: Logger,
        /**
         * 设置名称
         * @param {string} name - 名称
         * @returns {Logger}
         */
        setName: function (name) {
            name || (name = DEFAULT_NAME);
            this.name = name;
            return this;
        },
        /**
         * 启用
         * @returns {Logger}
         */
        enable: function () {
            this._log = (console.log || noop);
            this._info = (console.info || this._info);
            this._warn = (console.warn || this._log);
            this._error = (console.error || this._log);

            if (Function.prototype.bind && typeof console === "object") {
                var logFns = ["log", "warn", "error"];
                for (var i = 0; i < logFns.length; i++) {
                    console[logFns[i]] = Function.prototype.call.bind(console[logFns[i]], console);
                }
            }

            return this;
        },
        _write: function (output, args) {
            var parameters = Array.prototype.slice.call(args);
            parameters.unshift(this.name + ":");
            if (isIE8()) {
                output(parameters.join(' '));
            } else {
                output.apply(console, parameters);
            }
        },
        /**
         * 记录日志信息
         */
        log: function () {
            this._write(this._log, arguments);
        },
        /**
         * 记录警告信息
         */
        warn: function () {
            this._write(this._warn, arguments);
        },
        /**
         * 记录错误信息
         */
        error: function () {
            this._write(this._error, arguments);
        },
        /**
         * 记录普通消息
         */
        info: function () {
            this._write(this._info, arguments);
        },
        /**
         * 记录时间
         * @param {string} name - 时间
         * @param {string} tag - 开始计时时不传，结束计时时传 'End'
         */
        time: function (name, tag) {
            tag || (tag = '');
            console['time' + tag](name);
        }
    };

    Logger.prototype = proto;

    return Logger;
});
