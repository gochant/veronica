define([
    '../base/index',
    './appProvider'
], function (baseLib, AppProvider) {

    'use strict';

    var SCAFFOLD_LAYOUT_NAME = 'scaffold';
    var _ = baseLib._;

    /**
     * @typedef Layout
     * @property {string} [html] - 布局的HTML
     * @property {string} [url] - 获取布局的地址
     */

    /**
     * 布局改变前
     * @event Application#layoutChanging
     * @param {Object} e - 结果
     * @param {string} e.name - 布局名称
     * @param {jQueryObject} e.root - 布局根节点
     */

    /**
     * 布局改变后
     * @event Application#layoutChanged
     * @param {Object} e
     * @param {string} e.name - 布局名称
     */

    var LayoutManager = AppProvider.extend(/** @lends veronica.LayoutManager# */{
        /**
         * @typedef LayoutManagerOptions
         * @property {string} [rootNode='.v-layout-root'] - 布局根节点选择器
         */
        options: {
            rootNode: '.v-layout-root'
        },
        /**
         * 布局管理器
         * @constructs LayoutManager
         * @param {LayoutManagerOptions} options
         * @augments veronica.AppProvider
         * @memberOf veronica
         * @example
         *   app.layout.add({
         *     'admin': {
         *        html: '<div class="v-render-body"></div>'
         *     }
         *   });
         * */
        initialize: function(options){
            this.supr(options);
        },
        /**
         * 预处理
         * @param data
         * @returns {*}
         * @private
         */
        _preprocess: function (data) {
            if (_.isString(data)) {
                data = {
                    html: data
                };
            }
            return data;
        },
        /**
         * 获取布局根元素
         * @returns {*|jQuery|HTMLElement}
         * @private
         */
        _getLayoutRoot: function () {
            var $el = $(this.options.rootNode);
            if ($el.length === 0) {
                $el = $('body');
            }
            return $el;
        },
        /**
         * 改变布局
         * @param {string} name - 布局名称
         * @returns {Promise}
         * @fires Application#layoutChanging
         * @fires Application#layoutChanged
         */
        change: function (name) {
            var me = this;
            var app = this.app();
            var dfd = _.doneDeferred();

            var $layoutRoot = me._getLayoutRoot();
            var layout = this.get(name);

            // 找不到布局，则不进行切换
            if (!layout) {
                this.logger().warn('Could not find the layout configuration! layout name: ' + name);
                return _.doneDeferred();
            }

            app.pub('layoutChanging', {
                name: name,
                root: $layoutRoot
            });

            if (layout.url) {
                dfd = $.get(layout.url).done(function (resp) {
                    layout.html = resp;
                });
            }

            dfd.done(function () {
                $layoutRoot.html(layout.html);
                app.pub('layoutChanged', {
                    name: name
                });
            });

            return dfd;
        },
        /**
         * 布局初始化
         */
        init: function () {
            var scaffold = this.get(SCAFFOLD_LAYOUT_NAME);
            if (scaffold.html) {
                $('body').prepend(scaffold.html);
            }
        }
    });

    return LayoutManager;
});
