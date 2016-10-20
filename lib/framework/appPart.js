define([
    '../base/index'
], function (baseLib) {
    var _ = baseLib._;
    var $ = baseLib.$;
    var ClassBase = baseLib.ClassBase;

    var AppPart = ClassBase.extend(/** @lends AppPart.prototype */{
        /**
         * 应用程序部件
         * @constructs AppPart
         * @augments ClassBase
         * @param {Object} options - 配置参数
         */
        initialize: function (options) {
            options || (options = {});
            this.supr(options);
            this.options = $.extend(true, {}, this.options, options);
            this._app = options.app;
        },
        /**
         * 获取应用程序
         * @returns {Application} - 所属应用程序
         */
        app: function () {
            return this._app || this;
        },
        /**
         * 获取日志记录器
         * @returns {Logger} - 日志记录器
         */
        logger: function () {
            return this.get('part:app:logger');
        },
        /**
         * 获取组件加载器
         * @returns {Loader} - 加载器
         */
        loader: function () {
            return this.get('part:app:loader').get();
        }
    });

    return AppPart;
});
