define([
], function () {

    'use strict';

    return function (app) {
        var _ = app.core._;

        var Mod = (function () {
            function Mod(data) {
                _.extend(this, data);
            }

            Mod.prototype = {
                constructor: Mod,
                // ���Դ
                addSource: function (sources) {
                    var me = this;
                    _.each(sources, function (src, name) {
                        app.core.getConfig().sources[name] = me.path + '/' + src;
                    });
                },
                // ��Ӳ��
                addPlugin: function (plugin) {
                    app.plugin.add(plugin, this.name);
                },
                // ������
                addControl: function (control) {
                    if (!_.isArray(control)) {
                        control = [control];
                    }
                    app.core.getConfig().controls = _.uniq(app.core.getConfig().controls.concat(control));
                },
                // ���ҳ��
                addPage: function (page) {
                    app.addPage(page);
                },
                addExtension: function (extensions) {
                    app.addExtension(extensions);
                },
                addLayout: function (layouts) {
                    app.addLayout(layouts);
                }
            };

            return Mod;
        })();

        // ģ��
        app.module = {
            _modules: {}, // { path, execution }
            // Ӧ��ģ��
            apply: function () {
                var me = this;

                _.each(this._modules, function (module) {
                    var defaultSource = {};
                    defaultSource[module.name] = 'widgets';

                    module = new Mod(module);
                    module.addSource(defaultSource);

                    module.execution(module, app);
                });
            },
            // ��ȡģ��·��
            path: function (moduleName) {
                return this._modules[moduleName].path;
            }
        };
    };

});
