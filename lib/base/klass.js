/**
 * 添加继承相同属性的深拷贝合并
 */

/*!
 * klass: a classical JS OOP façade
 * https://github.com/ded/klass
 * License MIT (c) Dustin Diaz 2014
 */

!function (name, context, definition) {
    if (typeof define == 'function') define(definition)
    else if (typeof module != 'undefined') module.exports = definition()
    else context[name] = definition()
}('klass', this, function () {

    function isSpecificValue(val) {
        return (
            val instanceof Date
            || val instanceof RegExp
        ) ? true : false;
    }

    function cloneSpecificValue(val) {
        if (val instanceof Buffer) {
            var x = new Buffer(val.length);
            val.copy(x);
            return x;
        } else if (val instanceof Date) {
            return new Date(val.getTime());
        } else if (val instanceof RegExp) {
            return new RegExp(val);
        } else {
            throw new Error('Unexpected situation');
        }
    }

    /**
     * Recursive cloning array.
     */
    function deepCloneArray(arr) {
        var clone = [];
        arr.forEach(function (item, index) {
            if (typeof item === 'object' && item !== null) {
                if (Array.isArray(item)) {
                    clone[index] = deepCloneArray(item);
                } else if (isSpecificValue(item)) {
                    clone[index] = cloneSpecificValue(item);
                } else {
                    clone[index] = deepExtend({}, item);
                }
            } else {
                clone[index] = item;
            }
        });
        return clone;
    }

    /**
     * Extening object that entered in first argument.
     *
     * Returns extended object or false if have no target object or incorrect type.
     *
     * If you wish to clone source object (without modify it), just use empty new
     * object as first argument, like this:
     *   deepExtend({}, yourObj_1, [yourObj_N]);
     */
    var deepExtend = function (/*obj_1, [obj_2], [obj_N]*/) {
        if (arguments.length < 1 || typeof arguments[0] !== 'object') {
            return false;
        }

        if (arguments.length < 2) {
            return arguments[0];
        }

        var target = arguments[0];

        // convert arguments to array and cut off target object
        var args = Array.prototype.slice.call(arguments, 1);

        var val, src, clone;

        args.forEach(function (obj) {
            // skip argument if it is array or isn't object
            if (typeof obj !== 'object' || Array.isArray(obj)) {
                return;
            }

            Object.keys(obj).forEach(function (key) {
                src = target[key]; // source value
                val = obj[key]; // new value

                // recursion prevention
                if (val === target) {
                    return;

                    /**
                     * if new value isn't object then just overwrite by new value
                     * instead of extending.
                     */
                } else if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    return;

                    // just clone arrays (and recursive clone objects inside)
                } else if (Array.isArray(val)) {
                    target[key] = deepCloneArray(val);
                    return;

                    // custom cloning and overwrite for specific objects
                } else if (isSpecificValue(val)) {
                    target[key] = cloneSpecificValue(val);
                    return;

                    // overwrite by new value if source isn't object or array
                } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                    target[key] = deepExtend({}, val);
                    return;

                    // source value and new value is objects both, extending...
                } else {
                    target[key] = deepExtend(src, val);
                    return;
                }
            });
        });

        return target;
    }

    function extendDeep(obj) {
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
            if (source) {
                for (var prop in source) {
                    if (source[prop] != null && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            extend(obj[prop], source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        });
        return obj;
    }

    var context = this
        , f = 'function'
        , fnTest = /xyz/.test(function () {
        xyz
    }) ? /\bsupr\b/ : /.*/
        , proto = 'prototype'

    function klass(o) {
        return extend.call(isFn(o) ? o : function () {
        }, o, 1)
    }

    function isFn(o) {
        return typeof o === f
    }

    function wrap(k, fn, supr) {
        return function () {
            var tmp = this.supr
            this.supr = supr[proto][k]
            var undef = {}.fabricatedUndefined
            var ret = undef
            try {
                ret = fn.apply(this, arguments)
            } finally {
                this.supr = tmp
            }
            return ret
        }
    }

    function process(what, o, supr) {
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                if (o[k] != null && typeof o[k] === 'object') {
                    // 深拷贝合并对象成员
                    what[k] = deepExtend({}, supr[proto][k], o[k])
                } else {
                    what[k] = isFn(o[k])
                    && isFn(supr[proto][k])
                    && fnTest.test(o[k])
                        ? wrap(k, o[k], supr) : o[k]
                }
            }
        }
    }

    function extend(o, fromSub) {
        // must redefine noop each time so it doesn't inherit from previous arbitrary classes
        function noop() {
        }

        noop[proto] = this[proto]
        var supr = this
            , prototype = new noop()
            , isFunction = isFn(o)
            , _constructor = isFunction ? o : this
            , _methods = isFunction ? {} : o

        function fn() {
            if (this.initialize) this.initialize.apply(this, arguments)
            else {
                fromSub || isFunction && supr.apply(this, arguments)
                _constructor.apply(this, arguments)
            }
        }

        fn.methods = function (o) {
            process(prototype, o, supr)
            fn[proto] = prototype
            return this
        }

        fn.methods.call(fn, _methods).prototype.constructor = fn

        fn.extend = arguments.callee
        fn[proto].implement = fn.statics = function (o, optFn) {
            o = typeof o == 'string' ? (function () {
                var obj = {}
                obj[o] = optFn
                return obj
            }()) : o
            process(this, o, supr)
            return this
        }

        return fn
    }

    return klass
});
