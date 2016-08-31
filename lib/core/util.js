// core
define([
    'underscore',
    'jquery'
], function (_, $) {

    'use strict';

    // 扩展实例属性
    function extend(obj, mixin) {
        var method, name;
        for (name in mixin) {
            method = mixin[name];
            obj[name] = method;
        }
        return obj;
    };

    // 扩展类属性
    function include(klass, mixin) {
        return extend(klass.prototype, mixin);
    };

    // 混入，传入对象或构造函数，分别混入实例属性和类属性
    function mixin(obj, mixin) {
        obj.prototype ? include(obj, mixin) : extend(obj, mixin);
    }

    if (!_.findIndex) {
        _.mixin({
            findIndex: function (array, test) {
                var indexOfValue = _.indexOf;
                if (!_.isFunction(test)) return indexOfValue(array, test);
                for (var x = 0; x < array.length; x++) {
                    if (test(array[x])) return x;
                }
                return -1;
            }
        });
    }
    if (!_.safeInvoke) {
        _.mixin({
            safeInvoke: function (context, method, params) {
                var args = Array.slice.call(arguments, 2);
                context && context[method].apply(context, args);
            }
        });
    }

    // Thx: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
    function getter(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }
        return o;
    }

    function setter(o, s, v) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        var body = 'o';
        var p = o;
        while (a.length) {
            var n = a.shift();
            if (n in p || a.length === 0) {
                body += '["' + n + '"]';
                p = p[n];
            } else {
                return;
            }
        }
        body += '=v;';
        (new Function('o, v', body))(o, v);
    }

    // thx: https://github.com/goatslacker/get-parameter-names/blob/master/index.js
    var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var DEFAULT_PARAMS = /=[^,]+/mg;
    var FAT_ARROWS = /=>.*$/mg;

    function getParameterNames(fn) {
        fn || (fn = this);
        var code = fn.toString()
          .replace(COMMENTS, '')
          .replace(FAT_ARROWS, '')
          .replace(DEFAULT_PARAMS, '');

        var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
          .match(/([^\s,]+)/g);

        return result === null
          ? []
          : result;
    }

    return /**@lends veronica.util */{
        getParameterNames: getParameterNames,
        /**
         * 将字符串转换成反驼峰表示
         * @function
         */
        decamelize: function (camelCase, delimiter) {
            delimiter = (delimiter === undefined) ? '_' : delimiter;
            return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
        },
        /**
         * 将字符串转换成驼峰表示
         * @function
         */
        camelize: function (str) {
            return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
                return c ? c.toUpperCase() : '';
            });
        },
        extend: extend,
        include: include,
        mixin: mixin,
        getter: getter,
        setter: setter,
        /**
         * 查询字符串转换成JSON对象
         */
        qsToJSON: function (str) {
            str || (str = location.search.slice(1));
            var pairs = str.split('&');

            var result = {};
            pairs.forEach(function (pair) {
                pair = pair.split('=');
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            });

            return JSON.parse(JSON.stringify(result));
        },
        donePromise: function (result) {
            var dfd = $.Deferred();
            dfd.resolve(result);
            return dfd.promise();
        },
        failPromise: function () {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd.promise();
        },
        normalizePath: function (path) {
            return path.replace('//', '/').replace('http:/', 'http://');
        },
        // 将数据转换成另一种形式
        mapArrayOrSingle: function (obj, iteratee) {
            var isArray = _.isArray(obj);
            if (!isArray) { obj = [obj]; }

            var result = _.map(obj, iteratee);
            return isArray ? result : result[0];
        },
        ensureArray: function (list) {
            if (list == null) return [];
            if (_.isObject(list) && !_.isArray(list)) {
                list = [list];
            }
            return list;
        }
    };

});
