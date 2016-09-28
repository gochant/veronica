define([
    '../base/index',
    './appPart'
], function (baseLib, AppPart) {

    var _ = baseLib._;
    var extend = _.extend;

    var AppProvider = AppPart.extend({
        initialize: function (options) {
            this.supr(options);
            this._pool = {};
            this._defaultKey = 'default';
            this._nested = false;
        },
        _preprocess: function (data) {
            return data;
        },
        setDefault: function (key) {
            this._defaultKey = key;
        },
        get: function (name) {
            name || (name = this._defaultKey);
            var r = this._nested ? _.get(this._pool, name) :
                this._pool[name];
            return r;
        },
        attach: function (obj) {
            this._pool = extend({}, this._pool, obj);
        },
        add: function add(name, value, options) {
            var me = this;
            // 按照 key-value 获取
            if (_.isObject(name)) {
                options = value;
                _.each(name, function (val, key) {
                    add.call(me, key, val, options);
                });
            } else {
                options = extend({
                    force: false,
                    inherit: 'default'
                }, options);
                var exists = this.get(name);
                if (!exists || options.force === true) {
                    if (typeof value !== 'string') {
                        var parent = this.get(options.inherit);
                        if (!_.isFunction(value)) {
                            value = extend({}, parent, value);
                        }
                    }
                    value.__id = name;
                    value = me._preprocess(value);
                    this._pool[name] = value;
                }
            }

        },
        has: function (name) {
            return typeof this._pool[name] !== 'undefined';
        },
        remove: function (name) {
            this._pool[name] = null;
            delete this._pool[name];
        }
    })

    return AppProvider;
});
