// core
define([
    'jquery'
], function ($) {

    'use strict';

    /**
     * @namespace
     * @memberOf Veronica
     */
    var loader = {};

    /**
     * ʹ��ȫ�ֵ�require����
     */
    loader.useGlobalRequire = function () {
        return window.require ? window.require : require;
    };

    /**
     * ʹ��ȫ�ֵ�requirejs����
     */
    loader.useGlobalRequirejs = function () {
        return window.requirejs ? window.requirejs : requirejs;
    }

    /**
     * ����һ���ű�
     * @param {array|object} modeuls - Ҫ�����ģ�飨requirejs��require�����������ã�
     * @param {boolean} [condition=true] - ���������������
     * @param {object} [requireConfig] - require ����
     */
    loader.require = function (modules, condition, requireConfig) {

        var dfd = $.Deferred();
        var require = loader.useGlobalRequire();

        if (condition == null) condition = true;

        if (condition) {
            if (!$.isArray(modules)) { modules = [modules]; }

            if (requireConfig) {
                require.config(requireConfig);
            }

            require(modules, function () {
                var args;
                if (arguments.length === 1) {
                    args = arguments[0];
                } else {
                    args = Array.prototype.slice.call(arguments);
                }
                dfd.resolve(modules, args);
            }, function (err) {
                console.error(err);
                dfd.reject(err);
            });
        } else {
            dfd.resolve(modules, null);
        }
        return dfd.promise();
    }

    return loader;

});
