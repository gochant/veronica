define([
    '../base/index'
], function (baseLib) {

    var $ = baseLib.$;
    var _ = baseLib._;
    var typeNamePattern = /^(.*)\:(.*)/;


    return function (base) {

        base._extend({
            methods: {
                get: function (key) {
                    var match = typeNamePattern.exec(key);
                    var type = match[1];
                    var name = match[2];

                    if (type === 'vm') {
                        return this.model(name);
                    }
                    if (type === 'ui') {
                        return this.ui(name);
                    }
                    if (type === 'dom') {
                        return this.$(name);
                    }
                    if(type === 'cmp'){
                        var child = this._findChild(name);
                        return this._getComponent(child.id);
                    }
                },
                _getComponent: function(id){
                    return this.app().component.get(id);
                },
                _getContext: function () {
                    return this.options._source;
                },
                _getBatchName: function(){
                    return this.options._batchName;
                },
                _i18n: function (key) {
                    var i18n = app.i18n.get();
                    return i18n[key];
                },
                /**
                 * 获取后台请求的 url
                 * @param name - url 名称
                 * @return {string}
                 */
                url: function (url) {
                    return this.options.url[url];
                },
                when: function (args) {
                    if (_.isArray(args)) {
                        return $.when.apply($, args);
                    }
                    return $.when;
                },
                /**
                 * 为沙箱记录日志
                 */
                log: function (msg, type) {
                    var logger = this.logger();
                    type || (type = 'log');
                    logger.setName(this._type + '(' + this._name + ')');
                    if (_.isArray(msg)) {
                        logger[type].apply(logger, msg);
                    } else {
                        logger[type](msg);
                    }
                    logger.setName();
                }
            }
        });
    };
});
