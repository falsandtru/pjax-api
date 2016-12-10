/*! spica v0.0.45 https://github.com/falsandtru/spica | (c) 2016, falsandtru | MIT License */
require = function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == 'function' && require;
                if (!u && a)
                    return a(o, !0);
                if (i)
                    return i(o, !0);
                var f = new Error('Cannot find module \'' + o + '\'');
                throw f.code = 'MODULE_NOT_FOUND', f;
            }
            var l = n[o] = { exports: {} };
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == 'function' && require;
    for (var o = 0; o < r.length; o++)
        s(r[o]);
    return s;
}({
    1: [
        function (require, module, exports) {
        },
        {}
    ],
    2: [
        function (require, module, exports) {
            arguments[4][1][0].apply(exports, arguments);
        },
        { 'dup': 1 }
    ],
    3: [
        function (require, module, exports) {
            arguments[4][1][0].apply(exports, arguments);
        },
        { 'dup': 1 }
    ],
    4: [
        function (require, module, exports) {
            'use strict';
            var supervisor_1 = require('./lib/supervisor');
            exports.Supervisor = supervisor_1.Supervisor;
            var observable_1 = require('./lib/observable');
            exports.Observable = observable_1.Observable;
            var cancelable_1 = require('./lib/cancelable');
            exports.Cancelable = cancelable_1.Cancelable;
            var sequence_1 = require('./lib/monad/sequence');
            exports.Sequence = sequence_1.Sequence;
            var maybe_1 = require('./lib/monad/maybe');
            exports.Maybe = maybe_1.Maybe;
            exports.Just = maybe_1.Just;
            exports.Nothing = maybe_1.Nothing;
            var either_1 = require('./lib/monad/either');
            exports.Either = either_1.Either;
            exports.Left = either_1.Left;
            exports.Right = either_1.Right;
            var curry_1 = require('./lib/curry');
            exports.curry = curry_1.curry;
            var flip_1 = require('./lib/flip');
            exports.flip = flip_1.flip;
            var list_1 = require('./lib/list');
            exports.Nil = list_1.Nil;
            var hlist_1 = require('./lib/hlist');
            exports.HNil = hlist_1.HNil;
            var datamap_1 = require('./lib/collection/datamap');
            exports.DataMap = datamap_1.DataMap;
            var attrmap_1 = require('./lib/collection/attrmap');
            exports.AttrMap = attrmap_1.AttrMap;
            var cache_1 = require('./lib/cache');
            exports.Cache = cache_1.Cache;
            var mixin_1 = require('./lib/mixin');
            exports.Mixin = mixin_1.Mixin;
            var tick_1 = require('./lib/tick');
            exports.Tick = tick_1.Tick;
            var fingerprint_1 = require('./lib/fingerprint');
            exports.FINGERPRINT = fingerprint_1.FINGERPRINT;
            var uuid_1 = require('./lib/uuid');
            exports.uuid = uuid_1.v4;
            var sqid_1 = require('./lib/sqid');
            exports.sqid = sqid_1.sqid;
            var assign_1 = require('./lib/assign');
            exports.assign = assign_1.assign;
            exports.clone = assign_1.clone;
            exports.extend = assign_1.extend;
            var concat_1 = require('./lib/concat');
            exports.concat = concat_1.concat;
            var sort_1 = require('./lib/sort');
            exports.sort = sort_1.sort;
        },
        {
            './lib/assign': 5,
            './lib/cache': 6,
            './lib/cancelable': 7,
            './lib/collection/attrmap': 8,
            './lib/collection/datamap': 9,
            './lib/concat': 11,
            './lib/curry': 12,
            './lib/fingerprint': 13,
            './lib/flip': 14,
            './lib/hlist': 15,
            './lib/list': 16,
            './lib/mixin': 17,
            './lib/monad/either': 20,
            './lib/monad/maybe': 24,
            './lib/monad/sequence': 27,
            './lib/observable': 69,
            './lib/sort': 70,
            './lib/sqid': 71,
            './lib/supervisor': 72,
            './lib/tick': 74,
            './lib/uuid': 76
        }
    ],
    5: [
        function (require, module, exports) {
            'use strict';
            var type_1 = require('./type');
            exports.assign = template(function (key, target, source) {
                return target[key] = source[key];
            });
            exports.clone = template(function (key, target, source) {
                switch (type_1.type(source[key])) {
                case 'Array':
                    return target[key] = exports.clone([], source[key]);
                case 'Object':
                    return target[key] = exports.clone({}, source[key]);
                default:
                    return target[key] = source[key];
                }
            });
            exports.extend = template(function (key, target, source) {
                switch (type_1.type(source[key])) {
                case 'Array':
                    return target[key] = exports.extend([], source[key]);
                case 'Object': {
                        switch (type_1.type(target[key])) {
                        case 'Function':
                        case 'Object': {
                                return target[key] = exports.extend(target[key], source[key]);
                            }
                        default: {
                                return target[key] = exports.extend({}, source[key]);
                            }
                        }
                    }
                default:
                    return target[key] = source[key];
                }
            });
            function template(cb) {
                return function walk(target) {
                    var sources = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        sources[_i - 1] = arguments[_i];
                    }
                    if (target === undefined || target === null) {
                        throw new TypeError('Spica: assign: Cannot walk on ' + target + '.');
                    }
                    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
                        var source = sources_1[_a];
                        if (source === undefined || source === null) {
                            continue;
                        }
                        for (var _b = 0, _c = Object.keys(Object(source)); _b < _c.length; _b++) {
                            var key = _c[_b];
                            var desc = Object.getOwnPropertyDescriptor(Object(source), key);
                            if (desc !== undefined && desc.enumerable) {
                                void cb(key, Object(target), Object(source));
                            }
                        }
                    }
                    return Object(target);
                };
            }
        },
        { './type': 75 }
    ],
    6: [
        function (require, module, exports) {
            'use strict';
            var Cache = function () {
                function Cache(size, callback) {
                    if (callback === void 0) {
                        callback = function () {
                            return void 0;
                        };
                    }
                    this.size = size;
                    this.callback = callback;
                    this.store = new Map();
                    this.stats = {
                        LRU: [],
                        LFU: []
                    };
                    if (size > 0 === false)
                        throw new Error('Spica: Cache: Cache size must be greater than 0.');
                }
                Cache.prototype.put = function (key, value) {
                    if (key !== key)
                        throw new TypeError('Spica: Cache: Cannot use NaN for key.');
                    if (this.access(key))
                        return void this.store.set(key, value), true;
                    var _a = this.stats, LRU = _a.LRU, LFU = _a.LFU;
                    if (LRU.length + LFU.length === this.size && LRU.length < LFU.length) {
                        var key_1 = LFU.pop();
                        var val = this.store.get(key_1);
                        void this.store.delete(key_1);
                        void this.callback(key_1, val);
                    }
                    void LRU.unshift(key);
                    void this.store.set(key, value);
                    if (LRU.length + LFU.length > this.size) {
                        var key_2 = LRU.pop();
                        var val = this.store.get(key_2);
                        void this.store.delete(key_2);
                        void this.callback(key_2, val);
                    }
                    return false;
                };
                Cache.prototype.get = function (key) {
                    void this.access(key);
                    return this.store.get(key);
                };
                Cache.prototype.has = function (key) {
                    return this.store.has(key);
                };
                Cache.prototype.delete = function (key) {
                    var _a = this.stats, LRU = _a.LRU, LFU = _a.LFU;
                    for (var _i = 0, _b = [
                                LFU,
                                LRU
                            ]; _i < _b.length; _i++) {
                        var log = _b[_i];
                        var index = log.indexOf(key);
                        if (index === -1)
                            continue;
                        var val = this.store.get(key);
                        void this.store.delete(log.splice(index, 1)[0]);
                        void this.callback(key, val);
                        return true;
                    }
                    return false;
                };
                Cache.prototype.clear = function () {
                    var _a = this.stats, LRU = _a.LRU, LFU = _a.LFU;
                    for (var _i = 0, _b = [
                                LFU,
                                LRU
                            ]; _i < _b.length; _i++) {
                        var log = _b[_i];
                        while (log.length > 0) {
                            var key = log.shift();
                            var val = this.store.get(key);
                            void this.store.delete(key);
                            void this.callback(key, val);
                        }
                    }
                };
                Cache.prototype[Symbol.iterator] = function () {
                    return this.store[Symbol.iterator]();
                };
                Cache.prototype.inspect = function () {
                    var _a = this.stats, LRU = _a.LRU, LFU = _a.LFU;
                    return [
                        LRU,
                        LFU
                    ];
                };
                Cache.prototype.access = function (key) {
                    return this.accessLRU(key) || this.accessLFU(key);
                };
                Cache.prototype.accessLRU = function (key) {
                    var LRU = this.stats.LRU;
                    var index = LRU.indexOf(key);
                    if (index === -1)
                        return false;
                    var LFU = this.stats.LFU;
                    void LFU.unshift.apply(LFU, LRU.splice(index, 1));
                    return true;
                };
                Cache.prototype.accessLFU = function (key) {
                    var LFU = this.stats.LFU;
                    var index = LFU.indexOf(key);
                    if (index === -1)
                        return false;
                    void LFU.unshift.apply(LFU, LFU.splice(index, 1));
                    return true;
                };
                return Cache;
            }();
            exports.Cache = Cache;
        },
        {}
    ],
    7: [
        function (require, module, exports) {
            'use strict';
            var noop_1 = require('./noop');
            var maybe_1 = require('./monad/maybe');
            var either_1 = require('./monad/either');
            var Cancelable = function () {
                function Cancelable() {
                    var _this = this;
                    this.listeners = new Set();
                    this.canceled = false;
                    this.promise = function (val) {
                        return _this.canceled ? new Promise(function (_, reject) {
                            return void reject(_this.reason);
                        }) : Promise.resolve(val);
                    };
                    this.maybe = function (val) {
                        return _this.canceled ? maybe_1.Nothing : maybe_1.Just(val);
                    };
                    this.either = function (val) {
                        return _this.canceled ? either_1.Left(_this.reason) : either_1.Right(val);
                    };
                    this.cancel = function (reason) {
                        return _this.cancel = noop_1.noop, _this.canceled = true, _this.reason = reason, _this.listeners.forEach(function (cb) {
                            return void cb(reason);
                        }), _this.listeners.clear(), _this.listeners.add = function (cb) {
                            return void cb(_this.reason), _this.listeners;
                        }, void Object.freeze(_this);
                    };
                }
                return Cancelable;
            }();
            exports.Cancelable = Cancelable;
        },
        {
            './monad/either': 20,
            './monad/maybe': 24,
            './noop': 68
        }
    ],
    8: [
        function (require, module, exports) {
            'use strict';
            var AttrMap = function () {
                function AttrMap(entries, KeyMap, ValueMap) {
                    if (entries === void 0) {
                        entries = [];
                    }
                    if (KeyMap === void 0) {
                        KeyMap = WeakMap;
                    }
                    if (ValueMap === void 0) {
                        ValueMap = Map;
                    }
                    var _this = this;
                    this.KeyMap = KeyMap;
                    this.ValueMap = ValueMap;
                    this.store = new this.KeyMap();
                    void Array.from(entries).forEach(function (_a) {
                        var c = _a[0], k = _a[1], v = _a[2];
                        return void _this.set(c, k, v);
                    });
                }
                AttrMap.prototype.get = function (ctx, key) {
                    return this.store.get(ctx) && this.store.get(ctx).get(key);
                };
                AttrMap.prototype.set = function (ctx, key, val) {
                    var store = this.store.has(ctx) ? this.store.get(ctx) : this.store.set(ctx, new this.ValueMap()).get(ctx);
                    void store.set(key, val);
                    return this;
                };
                AttrMap.prototype.has = function (ctx, key) {
                    return arguments.length === 1 ? this.store.has(ctx) : this.store.has(ctx) && this.store.get(ctx).has(key);
                };
                AttrMap.prototype.delete = function (ctx, key) {
                    return arguments.length === 1 ? this.store.delete(ctx) : this.store.has(ctx) ? this.store.get(ctx).delete(key) : false;
                };
                return AttrMap;
            }();
            exports.AttrMap = AttrMap;
        },
        {}
    ],
    9: [
        function (require, module, exports) {
            'use strict';
            var sqid_1 = require('../sqid');
            var type_1 = require('../type');
            function isPrimitive(target) {
                return target instanceof Object === false;
            }
            var DataMap = function () {
                function DataMap(entries) {
                    if (entries === void 0) {
                        entries = [];
                    }
                    var _this = this;
                    this.store = new Map();
                    this.weakstore = new WeakMap();
                    void Array.from(entries).forEach(function (_a) {
                        var k = _a[0], v = _a[1];
                        return void _this.set(k, v);
                    });
                }
                DataMap.prototype.stringify = function (key) {
                    switch (typeof key) {
                    case 'undefined':
                        return '0:' + key;
                    case 'boolean':
                        return '1:' + key;
                    case 'number':
                        return '2:' + (1000 + ('' + key).length) + ':' + key;
                    case 'string':
                        return '3:' + (100000000000000 + key.length) + ':' + key;
                    default: {
                            if (isPrimitive(key)) {
                                return '8:' + key;
                            }
                            if (Array.isArray(key)) {
                                return '9:[ ' + this.stringifyArray(key) + ' ]';
                            }
                            return '9:{ ' + (this.stringifyObject(key) || this.weakstore.get(key) || this.weakstore.set(key, sqid_1.sqid()).get(key)) + ' }';
                        }
                    }
                };
                DataMap.prototype.stringifyArray = function (key) {
                    var acc = '';
                    for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                        var k = key_1[_i];
                        acc += '' + this.stringify(k);
                    }
                    return acc;
                };
                DataMap.prototype.stringifyObject = function (key) {
                    if (type_1.type(key) !== 'Object')
                        return '';
                    var keys = Object.keys(key);
                    var acc = '';
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        acc += this.stringify(k) + ': ' + this.stringify(key[k]);
                    }
                    return acc || ' ';
                };
                DataMap.prototype.get = function (key) {
                    return (this.store.get(this.stringify(key)) || [])[1];
                };
                DataMap.prototype.set = function (key, val) {
                    return void this.store.set(this.stringify(key), [
                        key,
                        val
                    ]), this;
                };
                DataMap.prototype.has = function (key) {
                    return this.store.has(this.stringify(key));
                };
                DataMap.prototype.delete = function (key) {
                    return this.store.delete(this.stringify(key));
                };
                DataMap.prototype.clear = function () {
                    return this.store.clear();
                };
                Object.defineProperty(DataMap.prototype, 'size', {
                    get: function () {
                        return this.store.size;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataMap;
            }();
            exports.DataMap = DataMap;
        },
        {
            '../sqid': 71,
            '../type': 75
        }
    ],
    10: [
        function (require, module, exports) {
            'use strict';
            var assign_1 = require('./assign');
            function compose(target) {
                var sources = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    sources[_i - 1] = arguments[_i];
                }
                return sources.reduce(function (b, d) {
                    void assign_1.assign(b.prototype, d.prototype);
                    for (var p in d)
                        if (d.hasOwnProperty(p))
                            b[p] = d[p];
                    return b;
                }, target);
            }
            exports.compose = compose;
        },
        { './assign': 5 }
    ],
    11: [
        function (require, module, exports) {
            'use strict';
            function concat(target, source) {
                for (var i = 0, len = source.length, offset = target.length; i < len; ++i) {
                    target[i + offset] = source[i];
                }
                return target;
            }
            exports.concat = concat;
        },
        {}
    ],
    12: [
        function (require, module, exports) {
            'use strict';
            exports.curry = function (f, ctx) {
                return f.length === 0 ? function () {
                    return f.call(ctx);
                } : curry_(f, [], ctx);
            };
            function curry_(f, xs, ctx) {
                return f.length === xs.length ? f.apply(ctx, xs) : function () {
                    var ys = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        ys[_i] = arguments[_i];
                    }
                    return curry_(f, xs.concat(ys), ctx);
                };
            }
        },
        {}
    ],
    13: [
        function (require, module, exports) {
            'use strict';
            exports.FINGERPRINT = typeof window === 'object' ? browser() : server();
            function browser() {
                return hash(str2digit([
                    stringify(window.navigator),
                    stringify(window.screen),
                    stringify(new Date().getTimezoneOffset())
                ].join()));
            }
            exports.browser = browser;
            function server() {
                return hash(str2digit([stringify(process)].join()));
            }
            exports.server = server;
            function hash(digit) {
                return digit.split('').reduce(function (a, b, i) {
                    return (+b * i + a) % 1000000000 || a - +b;
                }, 0);
            }
            exports.hash = hash;
            function str2digit(str) {
                return str.split('').reduce(function (s, c) {
                    return s + c.charCodeAt(0);
                }, '');
            }
            exports.str2digit = str2digit;
            function stringify(obj, depth) {
                if (depth === void 0) {
                    depth = 5;
                }
                if (depth > 0 && obj && typeof obj === 'object') {
                    var str = '{';
                    for (var p in obj) {
                        str += '"' + p + '": ' + stringify(obj[p], depth - 1) + ',';
                    }
                    str += '}';
                    return str;
                } else {
                    return !obj || obj.toString ? '"' + obj + '"' : '"' + Object.prototype.toString.call(obj) + '"';
                }
            }
            exports.stringify = stringify;
        },
        {}
    ],
    14: [
        function (require, module, exports) {
            'use strict';
            var curry_1 = require('./curry');
            function flip(f) {
                return curry_1.curry(function (b, a) {
                    return f.length > 1 ? f(a, b) : f(a)(b);
                });
            }
            exports.flip = flip;
        },
        { './curry': 12 }
    ],
    15: [
        function (require, module, exports) {
            'use strict';
            var concat_1 = require('./concat');
            var HNil = function () {
                function HNil() {
                    void this.NIL;
                }
                HNil.prototype.push = function (b) {
                    return new HCons(b, this);
                };
                HNil.prototype.array = function () {
                    return [];
                };
                return HNil;
            }();
            exports.HNil = HNil;
            var HCons = function () {
                function HCons(head_, tail_) {
                    this.head_ = head_;
                    this.tail_ = tail_;
                    void this.CONS;
                }
                HCons.prototype.push = function (b) {
                    return new HCons(b, this);
                };
                HCons.prototype.head = function () {
                    return this.head_;
                };
                HCons.prototype.tail = function () {
                    return this.tail_;
                };
                HCons.prototype.walk = function (f) {
                    void f(this.head());
                    return this.tail();
                };
                HCons.prototype.modify = function (f) {
                    return this.tail().push(f(this.head()));
                };
                HCons.prototype.extend = function (f) {
                    return this.push(f(this.head()));
                };
                HCons.prototype.compact = function (f) {
                    var _this = this;
                    return this.tail().modify(function (r) {
                        return f(_this.head(), r);
                    });
                };
                HCons.prototype.reverse = function () {
                    return this.array().reduce(function (l, e) {
                        return l.push(e);
                    }, new HNil());
                };
                HCons.prototype.tuple = function () {
                    return this.array();
                };
                HCons.prototype.array = function () {
                    return concat_1.concat([this.head()], this.tail().array());
                };
                return HCons;
            }();
        },
        { './concat': 11 }
    ],
    16: [
        function (require, module, exports) {
            'use strict';
            var concat_1 = require('./concat');
            var Nil = function () {
                function Nil() {
                    void this.NIL;
                }
                Nil.prototype.push = function (a) {
                    return new Cons(a, this);
                };
                Nil.prototype.array = function () {
                    return [];
                };
                return Nil;
            }();
            exports.Nil = Nil;
            var Cons = function () {
                function Cons(head_, tail_) {
                    this.head_ = head_;
                    this.tail_ = tail_;
                    void this.CONS;
                }
                Cons.prototype.push = function (a) {
                    return new Cons(a, this);
                };
                Cons.prototype.head = function () {
                    return this.head_;
                };
                Cons.prototype.tail = function () {
                    return this.tail_;
                };
                Cons.prototype.walk = function (f) {
                    void f(this.head());
                    return this.tail();
                };
                Cons.prototype.modify = function (f) {
                    return this.tail().push(f(this.head()));
                };
                Cons.prototype.extend = function (f) {
                    return this.push(f(this.head()));
                };
                Cons.prototype.compact = function (f) {
                    var _this = this;
                    return this.tail().modify(function (r) {
                        return f(_this.head(), r);
                    });
                };
                Cons.prototype.reverse = function () {
                    return this.array().reduce(function (l, e) {
                        return l.push(e);
                    }, new Nil());
                };
                Cons.prototype.tuple = function () {
                    return this.array();
                };
                Cons.prototype.array = function () {
                    return concat_1.concat([this.head()], this.tail().array());
                };
                return Cons;
            }();
        },
        { './concat': 11 }
    ],
    17: [
        function (require, module, exports) {
            'use strict';
            var assign_1 = require('./assign');
            function Mixin() {
                var mixins = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    mixins[_i] = arguments[_i];
                }
                return mixins.reduceRight(function (b, d) {
                    return __extends(d, b);
                }, function () {
                    function class_1() {
                    }
                    return class_1;
                }());
            }
            exports.Mixin = Mixin;
            function __extends(d, b) {
                var __ = function () {
                    function class_2() {
                        return d.call(b.call(this) || this);
                    }
                    return class_2;
                }();
                void assign_1.assign(__.prototype, d.prototype, b.prototype);
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        __[p] = b[p];
                for (var p in d)
                    if (d.hasOwnProperty(p))
                        __[p] = d[p];
                return __;
            }
        },
        { './assign': 5 }
    ],
    18: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var functor_1 = require('./functor');
            var curry_1 = require('../curry');
            var Applicative = function (_super) {
                __extends(Applicative, _super);
                function Applicative() {
                    return _super.apply(this, arguments) || this;
                }
                return Applicative;
            }(functor_1.Functor);
            exports.Applicative = Applicative;
            (function (Applicative) {
                function ap(af, aa) {
                    return aa ? af.bind(function (f) {
                        return aa.fmap(function (a) {
                            return f.length === 0 ? f(a) : curry_1.curry(f)(a);
                        });
                    }) : function (aa) {
                        return ap(af, aa);
                    };
                }
                Applicative.ap = ap;
            }(Applicative = exports.Applicative || (exports.Applicative = {})));
            exports.Applicative = Applicative;
        },
        {
            '../curry': 12,
            './functor': 21
        }
    ],
    19: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var monad_1 = require('./monad');
            var Either = function (_super) {
                __extends(Either, _super);
                function Either(thunk) {
                    var _this = _super.call(this, thunk) || this;
                    void _this.EITHER;
                    return _this;
                }
                Either.prototype.fmap = function (f) {
                    return this.bind(function (b) {
                        return new Right(f(b));
                    });
                };
                Either.prototype.ap = function (b) {
                    return Either.ap(this, b);
                };
                Either.prototype.bind = function (f) {
                    var _this = this;
                    return new Either(function () {
                        var m = _this.evaluate();
                        if (m instanceof Left) {
                            return m;
                        }
                        if (m instanceof Right) {
                            return f(m.extract());
                        }
                        if (m instanceof Either) {
                            return m.bind(f);
                        }
                        throw new TypeError('Spica: Either: Invalid monad value.\n\t' + m);
                    });
                };
                Either.prototype.extract = function (left, right) {
                    return !right ? this.evaluate().extract(left) : this.fmap(right).extract(left);
                };
                return Either;
            }(monad_1.Monad);
            exports.Either = Either;
            (function (Either) {
                function pure(b) {
                    return new Right(b);
                }
                Either.pure = pure;
                Either.Return = pure;
            }(Either = exports.Either || (exports.Either = {})));
            exports.Either = Either;
            var Left = function (_super) {
                __extends(Left, _super);
                function Left(a) {
                    var _this = _super.call(this, throwCallError) || this;
                    _this.a = a;
                    void _this.LEFT;
                    return _this;
                }
                Left.prototype.bind = function (_) {
                    return this;
                };
                Left.prototype.extract = function (left) {
                    if (!left)
                        throw this.a;
                    return left(this.a);
                };
                return Left;
            }(Either);
            exports.Left = Left;
            var Right = function (_super) {
                __extends(Right, _super);
                function Right(b) {
                    var _this = _super.call(this, throwCallError) || this;
                    _this.b = b;
                    void _this.RIGHT;
                    return _this;
                }
                Right.prototype.bind = function (f) {
                    var _this = this;
                    return new Either(function () {
                        return f(_this.extract());
                    });
                };
                Right.prototype.extract = function (_, right) {
                    return !right ? this.b : right(this.b);
                };
                return Right;
            }(Either);
            exports.Right = Right;
            function throwCallError() {
                throw new Error('Spica: Either: Invalid thunk call.');
            }
        },
        { './monad': 25 }
    ],
    20: [
        function (require, module, exports) {
            'use strict';
            var Monad = require('./either.impl');
            var Either;
            (function (Either) {
                Either.fmap = Monad.Either.fmap;
                Either.pure = Monad.Either.pure;
                Either.ap = Monad.Either.ap;
                Either.Return = Monad.Either.Return;
                Either.bind = Monad.Either.bind;
            }(Either = exports.Either || (exports.Either = {})));
            function Left(a) {
                return new Monad.Left(a);
            }
            exports.Left = Left;
            function Right(b) {
                return new Monad.Right(b);
            }
            exports.Right = Right;
        },
        { './either.impl': 19 }
    ],
    21: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var lazy_1 = require('./lazy');
            var Functor = function (_super) {
                __extends(Functor, _super);
                function Functor() {
                    return _super.apply(this, arguments) || this;
                }
                return Functor;
            }(lazy_1.Lazy);
            exports.Functor = Functor;
            (function (Functor) {
                function fmap(m, f) {
                    return f ? m.fmap(f) : function (f) {
                        return m.fmap(f);
                    };
                }
                Functor.fmap = fmap;
            }(Functor = exports.Functor || (exports.Functor = {})));
            exports.Functor = Functor;
        },
        { './lazy': 22 }
    ],
    22: [
        function (require, module, exports) {
            'use strict';
            var Lazy = function () {
                function Lazy(thunk) {
                    this.thunk = thunk;
                }
                Lazy.prototype.evaluate = function () {
                    return this.memory_ = this.memory_ || this.thunk();
                };
                return Lazy;
            }();
            exports.Lazy = Lazy;
        },
        {}
    ],
    23: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var monadplus_1 = require('./monadplus');
            var Maybe = function (_super) {
                __extends(Maybe, _super);
                function Maybe(thunk) {
                    var _this = _super.call(this, thunk) || this;
                    void _this.MAYBE;
                    return _this;
                }
                Maybe.prototype.fmap = function (f) {
                    return this.bind(function (a) {
                        return new Just(f(a));
                    });
                };
                Maybe.prototype.ap = function (a) {
                    return Maybe.ap(this, a);
                };
                Maybe.prototype.bind = function (f) {
                    var _this = this;
                    return new Maybe(function () {
                        var m = _this.evaluate();
                        if (m instanceof Just) {
                            return f(m.extract());
                        }
                        if (m instanceof Nothing) {
                            return m;
                        }
                        if (m instanceof Maybe) {
                            return m.bind(f);
                        }
                        throw new TypeError('Spica: Maybe: Invalid monad value.\n\t' + m);
                    });
                };
                Maybe.prototype.extract = function (nothing, just) {
                    return !just ? this.evaluate().extract(nothing) : this.fmap(just).extract(nothing);
                };
                return Maybe;
            }(monadplus_1.MonadPlus);
            exports.Maybe = Maybe;
            (function (Maybe) {
                function pure(a) {
                    return new Just(a);
                }
                Maybe.pure = pure;
                Maybe.Return = pure;
            }(Maybe = exports.Maybe || (exports.Maybe = {})));
            exports.Maybe = Maybe;
            var Just = function (_super) {
                __extends(Just, _super);
                function Just(a) {
                    var _this = _super.call(this, throwCallError) || this;
                    _this.a = a;
                    void _this.JUST;
                    return _this;
                }
                Just.prototype.bind = function (f) {
                    var _this = this;
                    return new Maybe(function () {
                        return f(_this.extract());
                    });
                };
                Just.prototype.extract = function (_, just) {
                    return !just ? this.a : just(this.a);
                };
                return Just;
            }(Maybe);
            exports.Just = Just;
            var Nothing = function (_super) {
                __extends(Nothing, _super);
                function Nothing() {
                    var _this = _super.call(this, throwCallError) || this;
                    void _this.NOTHING;
                    return _this;
                }
                Nothing.prototype.bind = function (_) {
                    return this;
                };
                Nothing.prototype.extract = function (nothing) {
                    if (!nothing)
                        throw void 0;
                    return nothing();
                };
                return Nothing;
            }(Maybe);
            exports.Nothing = Nothing;
            (function (Maybe) {
                Maybe.mzero = new Nothing();
                function mplus(ml, mr) {
                    return new Maybe(function () {
                        return ml.fmap(function () {
                            return ml;
                        }).extract(function () {
                            return mr;
                        });
                    });
                }
                Maybe.mplus = mplus;
            }(Maybe = exports.Maybe || (exports.Maybe = {})));
            exports.Maybe = Maybe;
            function throwCallError() {
                throw new Error('Spica: Maybe: Invalid thunk call.');
            }
        },
        { './monadplus': 26 }
    ],
    24: [
        function (require, module, exports) {
            'use strict';
            var Monad = require('./maybe.impl');
            var Maybe;
            (function (Maybe) {
                Maybe.fmap = Monad.Maybe.fmap;
                Maybe.pure = Monad.Maybe.pure;
                Maybe.ap = Monad.Maybe.ap;
                Maybe.Return = Monad.Maybe.Return;
                Maybe.bind = Monad.Maybe.bind;
                Maybe.mzero = Monad.Maybe.mzero;
                Maybe.mplus = Monad.Maybe.mplus;
            }(Maybe = exports.Maybe || (exports.Maybe = {})));
            function Just(a) {
                return new Monad.Just(a);
            }
            exports.Just = Just;
            exports.Nothing = Monad.Maybe.mzero;
        },
        { './maybe.impl': 23 }
    ],
    25: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var applicative_1 = require('./applicative');
            var Monad = function (_super) {
                __extends(Monad, _super);
                function Monad() {
                    return _super.apply(this, arguments) || this;
                }
                return Monad;
            }(applicative_1.Applicative);
            exports.Monad = Monad;
            (function (Monad) {
                function bind(m, f) {
                    return f ? m.bind(f) : function (f) {
                        return bind(m, f);
                    };
                }
                Monad.bind = bind;
            }(Monad = exports.Monad || (exports.Monad = {})));
            exports.Monad = Monad;
        },
        { './applicative': 18 }
    ],
    26: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var monad_1 = require('./monad');
            var MonadPlus = function (_super) {
                __extends(MonadPlus, _super);
                function MonadPlus() {
                    return _super.apply(this, arguments) || this;
                }
                return MonadPlus;
            }(monad_1.Monad);
            exports.MonadPlus = MonadPlus;
            (function (MonadPlus) {
            }(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {})));
            exports.MonadPlus = MonadPlus;
        },
        { './monad': 25 }
    ],
    27: [
        function (require, module, exports) {
            'use strict';
            var core_1 = require('./sequence/core');
            exports.Sequence = core_1.Sequence;
            var resume_1 = require('./sequence/member/static/resume');
            var from_1 = require('./sequence/member/static/from');
            var cycle_1 = require('./sequence/member/static/cycle');
            var random_1 = require('./sequence/member/static/random');
            var concat_1 = require('./sequence/member/static/concat');
            var zip_1 = require('./sequence/member/static/zip');
            var difference_1 = require('./sequence/member/static/difference');
            var union_1 = require('./sequence/member/static/union');
            var intersect_1 = require('./sequence/member/static/intersect');
            var pure_1 = require('./sequence/member/static/pure');
            var return_1 = require('./sequence/member/static/return');
            var mempty_1 = require('./sequence/member/static/mempty');
            var mconcat_1 = require('./sequence/member/static/mconcat');
            var mappend_1 = require('./sequence/member/static/mappend');
            var mzero_1 = require('./sequence/member/static/mzero');
            var mplus_1 = require('./sequence/member/static/mplus');
            var extract_1 = require('./sequence/member/instance/extract');
            var iterate_1 = require('./sequence/member/instance/iterate');
            var memoize_1 = require('./sequence/member/instance/memoize');
            var reduce_1 = require('./sequence/member/instance/reduce');
            var take_1 = require('./sequence/member/instance/take');
            var drop_1 = require('./sequence/member/instance/drop');
            var takeWhile_1 = require('./sequence/member/instance/takeWhile');
            var dropWhile_1 = require('./sequence/member/instance/dropWhile');
            var takeUntil_1 = require('./sequence/member/instance/takeUntil');
            var dropUntil_1 = require('./sequence/member/instance/dropUntil');
            var fmap_1 = require('./sequence/member/instance/fmap');
            var ap_1 = require('./sequence/member/instance/ap');
            var bind_1 = require('./sequence/member/instance/bind');
            var mapM_1 = require('./sequence/member/instance/mapM');
            var filterM_1 = require('./sequence/member/instance/filterM');
            var map_1 = require('./sequence/member/instance/map');
            var filter_1 = require('./sequence/member/instance/filter');
            var scan_1 = require('./sequence/member/instance/scan');
            var fold_1 = require('./sequence/member/instance/fold');
            var group_1 = require('./sequence/member/instance/group');
            var sort_1 = require('./sequence/member/instance/sort');
            var subsequences_1 = require('./sequence/member/instance/subsequences');
            var permutations_1 = require('./sequence/member/instance/permutations');
            var compose_1 = require('../compose');
            void compose_1.compose(core_1.Sequence, resume_1.default, from_1.default, cycle_1.default, random_1.default, concat_1.default, zip_1.default, difference_1.default, union_1.default, intersect_1.default, pure_1.default, return_1.default, mempty_1.default, mconcat_1.default, mappend_1.default, mzero_1.default, mplus_1.default, extract_1.default, iterate_1.default, memoize_1.default, reduce_1.default, take_1.default, drop_1.default, takeWhile_1.default, dropWhile_1.default, takeUntil_1.default, dropUntil_1.default, fmap_1.default, ap_1.default, bind_1.default, mapM_1.default, filterM_1.default, map_1.default, filter_1.default, scan_1.default, fold_1.default, group_1.default, sort_1.default, subsequences_1.default, permutations_1.default);
        },
        {
            '../compose': 10,
            './sequence/core': 28,
            './sequence/member/instance/ap': 29,
            './sequence/member/instance/bind': 30,
            './sequence/member/instance/drop': 31,
            './sequence/member/instance/dropUntil': 32,
            './sequence/member/instance/dropWhile': 33,
            './sequence/member/instance/extract': 34,
            './sequence/member/instance/filter': 35,
            './sequence/member/instance/filterM': 36,
            './sequence/member/instance/fmap': 37,
            './sequence/member/instance/fold': 38,
            './sequence/member/instance/group': 39,
            './sequence/member/instance/iterate': 40,
            './sequence/member/instance/map': 41,
            './sequence/member/instance/mapM': 42,
            './sequence/member/instance/memoize': 43,
            './sequence/member/instance/permutations': 44,
            './sequence/member/instance/reduce': 45,
            './sequence/member/instance/scan': 46,
            './sequence/member/instance/sort': 47,
            './sequence/member/instance/subsequences': 48,
            './sequence/member/instance/take': 49,
            './sequence/member/instance/takeUntil': 50,
            './sequence/member/instance/takeWhile': 51,
            './sequence/member/static/concat': 52,
            './sequence/member/static/cycle': 53,
            './sequence/member/static/difference': 54,
            './sequence/member/static/from': 55,
            './sequence/member/static/intersect': 56,
            './sequence/member/static/mappend': 57,
            './sequence/member/static/mconcat': 58,
            './sequence/member/static/mempty': 59,
            './sequence/member/static/mplus': 60,
            './sequence/member/static/mzero': 61,
            './sequence/member/static/pure': 62,
            './sequence/member/static/random': 63,
            './sequence/member/static/resume': 64,
            './sequence/member/static/return': 65,
            './sequence/member/static/union': 66,
            './sequence/member/static/zip': 67
        }
    ],
    28: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var monadplus_1 = require('../monadplus');
            var Sequence = function (_super) {
                __extends(Sequence, _super);
                function Sequence(cons) {
                    var _this = _super.call(this, throwCallError) || this;
                    _this.cons = cons;
                    return _this;
                }
                Sequence.prototype[Symbol.iterator] = function () {
                    var _this = this;
                    var iter = function () {
                        return _this.iterate();
                    };
                    return {
                        next: function () {
                            var thunk = iter();
                            iter = Sequence.Thunk.iterator(thunk);
                            return {
                                done: !Sequence.isIterable(thunk),
                                value: Sequence.Thunk.value(thunk)
                            };
                        }
                    };
                };
                return Sequence;
            }(monadplus_1.MonadPlus);
            exports.Sequence = Sequence;
            (function (Sequence) {
            }(Sequence = exports.Sequence || (exports.Sequence = {})));
            exports.Sequence = Sequence;
            (function (Sequence) {
                var Data;
                (function (Data) {
                    function cons(a, z) {
                        switch (arguments.length) {
                        case 0:
                            return [];
                        case 1:
                            return [a];
                        case 2:
                            return [
                                a,
                                z
                            ];
                        default:
                            throw Sequence.Exception.invalidConsError(arguments);
                        }
                    }
                    Data.cons = cons;
                }(Data = Sequence.Data || (Sequence.Data = {})));
                var Thunk;
                (function (Thunk) {
                    function value(thunk) {
                        return thunk[0];
                    }
                    Thunk.value = value;
                    function iterator(thunk) {
                        return thunk[1];
                    }
                    Thunk.iterator = iterator;
                    function index(thunk) {
                        return thunk[2];
                    }
                    Thunk.index = index;
                }(Thunk = Sequence.Thunk || (Sequence.Thunk = {})));
                var Iterator;
                (function (Iterator) {
                    Iterator.done = function () {
                        return [
                            void 0,
                            Iterator.done,
                            -1
                        ];
                    };
                    function when(thunk, caseDone, caseIterable) {
                        return Sequence.isIterable(thunk) ? caseIterable(thunk, function () {
                            return when(Thunk.iterator(thunk)(), caseDone, caseIterable);
                        }) : caseDone(thunk);
                    }
                    Iterator.when = when;
                }(Iterator = Sequence.Iterator || (Sequence.Iterator = {})));
                function isIterable(thunk) {
                    return Thunk.iterator(thunk) !== Iterator.done;
                }
                Sequence.isIterable = isIterable;
                var Exception;
                (function (Exception) {
                    function invalidConsError(args) {
                        console.error(args, args.length, args[0], args[1]);
                        return new TypeError('Spica: Sequence: Invalid parameters of cons.');
                    }
                    Exception.invalidConsError = invalidConsError;
                    function invalidDataError(data) {
                        console.error(data);
                        return new TypeError('Spica: Sequence: Invalid data.');
                    }
                    Exception.invalidDataError = invalidDataError;
                    function invalidThunkError(thunk) {
                        console.error(thunk);
                        return new TypeError('Spica: Sequence: Invalid thunk.');
                    }
                    Exception.invalidThunkError = invalidThunkError;
                }(Exception = Sequence.Exception || (Sequence.Exception = {})));
            }(Sequence = exports.Sequence || (exports.Sequence = {})));
            exports.Sequence = Sequence;
            function throwCallError() {
                throw new Error('Spica: Sequence: Invalid thunk call.');
            }
        },
        { '../monadplus': 26 }
    ],
    29: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.ap = function (a) {
                    return core_1.Sequence.ap(this, a);
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    30: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.bind = function (f) {
                    return core_1.Sequence.concat(this.fmap(f));
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    31: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.drop = function (n) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk, recur) {
                            return core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    32: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.dropUntil = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk, recur) {
                            return f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    33: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.dropWhile = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk, recur) {
                            return f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    34: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.extract = function () {
                    var _this = this;
                    var acc = [];
                    var iter = function () {
                        return _this.iterate();
                    };
                    while (true) {
                        var thunk = iter();
                        if (!core_1.Sequence.isIterable(thunk))
                            return acc;
                        void concat_1.concat(acc, [core_1.Sequence.Thunk.value(thunk)]);
                        iter = core_1.Sequence.Thunk.iterator(thunk);
                    }
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        {
            '../../../../concat': 11,
            '../../core': 28
        }
    ],
    35: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.filter = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk, recur) {
                            return f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur();
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    36: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.filterM = function (f) {
                    var _this = this;
                    return core_1.Sequence.from([0]).bind(function () {
                        var xs = _this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.from([[]]);
                        default: {
                                var x_1 = xs.shift();
                                return f(x_1).bind(function (b) {
                                    return b ? xs.length === 0 ? core_1.Sequence.from([[x_1]]) : core_1.Sequence.from(xs).filterM(f).fmap(function (ys) {
                                        return concat_1.concat([x_1], ys);
                                    }) : xs.length === 0 ? core_1.Sequence.from([[]]) : core_1.Sequence.from(xs).filterM(f);
                                });
                            }
                        }
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        {
            '../../../../concat': 11,
            '../../core': 28
        }
    ],
    37: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.fmap = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return core_1.Sequence.Data.cons();
                        }, function (thunk) {
                            return core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    38: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.fold = function (f, z) {
                    var _this = this;
                    return new core_1.Sequence(function (iter) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.reduce().iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return core_1.Sequence.Data.cons(z);
                        }, function (thunk) {
                            return core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).fold(f, z)));
                        });
                    }).bind(function (s) {
                        return s;
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    39: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.group = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return _this.iterate();
                                },
                                []
                            ] : _a, iter = _b[0], acc = _b[1];
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return acc.length === 0 ? cons() : cons(acc);
                        }, function (thunk, recur) {
                            return acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (concat_1.concat(acc, [core_1.Sequence.Thunk.value(thunk)]), recur()) : cons(acc, [
                                core_1.Sequence.Thunk.iterator(thunk),
                                concat_1.concat([], [core_1.Sequence.Thunk.value(thunk)])
                            ]);
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        {
            '../../../../concat': 11,
            '../../core': 28
        }
    ],
    40: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.iterate = function () {
                    return this.iterate_();
                };
                default_1.prototype.iterate_ = function (z, i) {
                    var _this = this;
                    if (i === void 0) {
                        i = 0;
                    }
                    var data = this.cons(z, core_1.Sequence.Data.cons);
                    switch (data.length) {
                    case 0:
                        return [
                            void 0,
                            core_1.Sequence.Iterator.done,
                            -1
                        ];
                    case 1:
                        return [
                            data[0],
                            function () {
                                return core_1.Sequence.Iterator.done();
                            },
                            i
                        ];
                    case 2:
                        return [
                            data[0],
                            function () {
                                return _this.iterate_(data[1], i + 1);
                            },
                            i
                        ];
                    default:
                        throw core_1.Sequence.Exception.invalidDataError(data);
                    }
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    41: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.map = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return core_1.Sequence.Data.cons();
                        }, function (thunk) {
                            return core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    42: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.mapM = function (f) {
                    var _this = this;
                    return core_1.Sequence.from([0]).bind(function () {
                        var xs = _this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.mempty;
                        default: {
                                var x = xs.shift();
                                return f(x).bind(function (y) {
                                    return xs.length === 0 ? core_1.Sequence.from([[y]]) : core_1.Sequence.from(xs).mapM(f).fmap(function (ys) {
                                        return concat_1.concat([y], ys);
                                    });
                                });
                            }
                        }
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        {
            '../../../../concat': 11,
            '../../core': 28
        }
    ],
    43: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var memories = new WeakMap();
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.memoize = function () {
                    var _this = this;
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                0,
                                memories.get(_this) || memories.set(_this, new Map()).get(_this)
                            ] : _a, i = _b[0], memo = _b[1];
                        return core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : _this.iterate()).get(i), function () {
                            return cons();
                        }, function (thunk) {
                            return cons(core_1.Sequence.Thunk.value(thunk), [
                                i + 1,
                                memo
                            ]);
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    44: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.permutations = function () {
                    var _this = this;
                    return core_1.Sequence.from([0]).bind(function () {
                        var xs = _this.extract();
                        return xs.length === 0 ? core_1.Sequence.mempty : core_1.Sequence.from([xs]);
                    }).bind(function (xs) {
                        return core_1.Sequence.mappend(core_1.Sequence.from([xs]), perms(core_1.Sequence.from(xs), core_1.Sequence.mempty));
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
            function perms(ts, is) {
                return core_1.Sequence.Iterator.when(ts.iterate(), function () {
                    return core_1.Sequence.mempty;
                }, function (tt) {
                    return new core_1.Sequence(function (_, cons) {
                        return core_1.Sequence.Iterator.when(tt, function () {
                            return cons();
                        }, function (tt) {
                            var t = core_1.Sequence.Thunk.value(tt);
                            var ts = core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(tt)).memoize();
                            return cons(is.permutations().fold(function (ys, r) {
                                return interleave(core_1.Sequence.from(ys), r);
                            }, perms(ts, core_1.Sequence.mappend(core_1.Sequence.from([t]), is))));
                            function interleave(xs, r) {
                                return interleave_(function (as) {
                                    return as;
                                }, xs, r)[1];
                            }
                            function interleave_(f, ys, r) {
                                return core_1.Sequence.Iterator.when(ys.iterate(), function () {
                                    return [
                                        ts,
                                        r
                                    ];
                                }, function (yt) {
                                    var y = core_1.Sequence.Thunk.value(yt);
                                    var _a = interleave_(function (as) {
                                            return f(core_1.Sequence.mappend(core_1.Sequence.from([y]), as));
                                        }, core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(yt)), r), us = _a[0], zs = _a[1];
                                    return [
                                        core_1.Sequence.mappend(core_1.Sequence.from([y]), us),
                                        core_1.Sequence.mappend(core_1.Sequence.from([f(core_1.Sequence.mappend(core_1.Sequence.from([t]), core_1.Sequence.mappend(core_1.Sequence.from([y]), us))).extract()]), zs)
                                    ];
                                });
                            }
                        });
                    }).bind(function (xs) {
                        return xs;
                    });
                });
            }
        },
        { '../../core': 28 }
    ],
    45: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.reduce = function () {
                    var _this = this;
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                0,
                                new Map()
                            ] : _a, i = _b[0], memo = _b[1];
                        return core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : _this.iterate()).get(i), function () {
                            return cons();
                        }, function (thunk) {
                            return cons(core_1.Sequence.Thunk.value(thunk), [
                                i + 1,
                                memo
                            ]);
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    46: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.scan = function (f, z) {
                    var _this = this;
                    return new core_1.Sequence(function (_a) {
                        var _b = _a === void 0 ? [
                                z,
                                function () {
                                    return _this.iterate();
                                },
                                0
                            ] : _a, prev = _b[0], iter = _b[1], i = _b[2];
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return i === 0 ? core_1.Sequence.Data.cons(z) : core_1.Sequence.Data.cons();
                        }, function (thunk) {
                            return core_1.Sequence.Data.cons(prev = f(prev, core_1.Sequence.Thunk.value(thunk)), [
                                prev,
                                core_1.Sequence.Thunk.iterator(thunk),
                                core_1.Sequence.Thunk.index(thunk) + 1
                            ]);
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    47: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.sort = function (cmp) {
                    return core_1.Sequence.from(this.extract().sort(cmp));
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    48: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.subsequences = function () {
                    var _this = this;
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(function () {
                        return nonEmptySubsequences(_this);
                    }));
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
            function nonEmptySubsequences(xs) {
                return core_1.Sequence.Iterator.when(xs.iterate(), function () {
                    return core_1.Sequence.mempty;
                }, function (xt) {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence(function (_, cons) {
                        return core_1.Sequence.Iterator.when(xt, function () {
                            return cons();
                        }, function (xt) {
                            return cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).fold(function (ys, r) {
                                return core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([concat_1.concat([core_1.Sequence.Thunk.value(xt)], ys)])), r);
                            }, core_1.Sequence.mempty));
                        });
                    }).bind(function (xs) {
                        return xs;
                    }));
                });
            }
        },
        {
            '../../../../concat': 11,
            '../../core': 28
        }
    ],
    49: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.take = function (n) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), function () {
                            return cons();
                        }, function (thunk) {
                            return core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    50: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.takeUntil = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk) {
                            return f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    51: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.prototype.takeWhile = function (f) {
                    var _this = this;
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = function () {
                                return _this.iterate();
                            };
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk) {
                            return f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons();
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    52: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.concat = function (as) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return as.iterate();
                                },
                                core_1.Sequence.Iterator.done
                            ] : _a, ai = _b[0], bi = _b[1];
                        return core_1.Sequence.Iterator.when(ai(), function () {
                            return cons();
                        }, function (at, ar) {
                            return bi = bi === core_1.Sequence.Iterator.done ? function () {
                                return core_1.Sequence.Thunk.value(at).iterate();
                            } : bi, core_1.Sequence.Iterator.when(bi(), function () {
                                return bi = core_1.Sequence.Iterator.done, ar();
                            }, function (bt) {
                                return cons(core_1.Sequence.Thunk.value(bt), [
                                    function () {
                                        return at;
                                    },
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    53: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.cycle = function (as) {
                    return new core_1.Sequence(function cycle(_a, cons) {
                        var _b = _a === void 0 ? [
                                as[Symbol.iterator](),
                                0
                            ] : _a, iter = _b[0], i = _b[1];
                        var result = iter.next();
                        return result.done ? cycle([
                            as[Symbol.iterator](),
                            i + 1
                        ], cons) : cons(result.value, [
                            iter,
                            i + 1
                        ]);
                    }).reduce();
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    54: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.difference = function (a, b, cmp) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return a.iterate();
                                },
                                function () {
                                    return b.iterate();
                                }
                            ] : _a, ai = _b[0], bi = _b[1];
                        return core_1.Sequence.Iterator.when(ai(), function () {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons();
                            }, function (bt) {
                                return cons(core_1.Sequence.Thunk.value(bt), [
                                    core_1.Sequence.Iterator.done,
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        }, function (at, ar) {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons(core_1.Sequence.Thunk.value(at), [
                                    core_1.Sequence.Thunk.iterator(at),
                                    core_1.Sequence.Iterator.done
                                ]);
                            }, function (bt) {
                                var ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                                if (ord < 0)
                                    return cons(core_1.Sequence.Thunk.value(at), [
                                        core_1.Sequence.Thunk.iterator(at),
                                        function () {
                                            return bt;
                                        }
                                    ]);
                                if (ord > 0)
                                    return cons(core_1.Sequence.Thunk.value(bt), [
                                        function () {
                                            return at;
                                        },
                                        core_1.Sequence.Thunk.iterator(bt)
                                    ]);
                                return bi = function () {
                                    return core_1.Sequence.Thunk.iterator(bt)();
                                }, ar();
                            });
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    55: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.from = function (as) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                as[Symbol.iterator](),
                                0
                            ] : _a, iter = _b[0], i = _b[1];
                        var result = iter.next();
                        return result.done ? cons() : cons(result.value, [
                            iter,
                            i + 1
                        ]);
                    }).reduce();
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    56: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.intersect = function (a, b, cmp) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return a.iterate();
                                },
                                function () {
                                    return b.iterate();
                                }
                            ] : _a, ai = _b[0], bi = _b[1];
                        return core_1.Sequence.Iterator.when(ai(), function () {
                            return cons();
                        }, function (at, ar) {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons();
                            }, function (bt, br) {
                                var ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                                if (ord < 0)
                                    return bi = function () {
                                        return bt;
                                    }, ar();
                                if (ord > 0)
                                    return br();
                                return cons(core_1.Sequence.Thunk.value(at), [
                                    core_1.Sequence.Thunk.iterator(at),
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    57: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.mappend = function (l, r) {
                    return core_1.Sequence.mconcat([
                        l,
                        r
                    ]);
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    58: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.mconcat = function (as) {
                    return Array.from(as).reduce(function (a, b) {
                        return mconcat(a, b);
                    }, core_1.Sequence.mempty);
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
            function mconcat(a, b) {
                return new core_1.Sequence(function (_a, cons) {
                    var _b = _a === void 0 ? [
                            function () {
                                return a.iterate();
                            },
                            function () {
                                return b.iterate();
                            }
                        ] : _a, ai = _b[0], bi = _b[1];
                    return core_1.Sequence.Iterator.when(ai(), function () {
                        return core_1.Sequence.Iterator.when(bi(), function () {
                            return cons();
                        }, function (bt) {
                            return cons(core_1.Sequence.Thunk.value(bt), [
                                core_1.Sequence.Iterator.done,
                                core_1.Sequence.Thunk.iterator(bt)
                            ]);
                        });
                    }, function (at) {
                        return cons(core_1.Sequence.Thunk.value(at), [
                            core_1.Sequence.Thunk.iterator(at),
                            bi
                        ]);
                    });
                });
            }
        },
        { '../../core': 28 }
    ],
    59: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mempty = new core_1.Sequence(function (_, cons) {
                return cons();
            });
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    60: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mplus = core_1.Sequence.mappend;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    61: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mzero = core_1.Sequence.mempty;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    62: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.pure = function (a) {
                    return new core_1.Sequence(function (_, cons) {
                        return cons(a);
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    63: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.random = function (p) {
                    if (p === void 0) {
                        p = function () {
                            return Math.random();
                        };
                    }
                    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence(function (_, cons) {
                        return cons(p(), _);
                    })) : this.random().map(function (r) {
                        return p[r * p.length | 0];
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    64: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.resume = function (iterator) {
                    return new core_1.Sequence(function (iter, cons) {
                        if (iter === void 0) {
                            iter = iterator;
                        }
                        return core_1.Sequence.Iterator.when(iter(), function () {
                            return cons();
                        }, function (thunk) {
                            return cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk));
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    65: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.Return = function (a) {
                    return new core_1.Sequence(function (_, cons) {
                        return cons(a);
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    66: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.union = function (a, b, cmp) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return a.iterate();
                                },
                                function () {
                                    return b.iterate();
                                }
                            ] : _a, ai = _b[0], bi = _b[1];
                        return core_1.Sequence.Iterator.when(ai(), function () {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons();
                            }, function (bt) {
                                return cons(core_1.Sequence.Thunk.value(bt), [
                                    core_1.Sequence.Iterator.done,
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        }, function (at) {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons(core_1.Sequence.Thunk.value(at), [
                                    core_1.Sequence.Thunk.iterator(at),
                                    core_1.Sequence.Iterator.done
                                ]);
                            }, function (bt) {
                                var ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                                if (ord < 0)
                                    return cons(core_1.Sequence.Thunk.value(at), [
                                        core_1.Sequence.Thunk.iterator(at),
                                        function () {
                                            return bt;
                                        }
                                    ]);
                                if (ord > 0)
                                    return cons(core_1.Sequence.Thunk.value(bt), [
                                        function () {
                                            return at;
                                        },
                                        core_1.Sequence.Thunk.iterator(bt)
                                    ]);
                                return cons(core_1.Sequence.Thunk.value(at), [
                                    core_1.Sequence.Thunk.iterator(at),
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    67: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function (d, b) {
                for (var p in b)
                    if (b.hasOwnProperty(p))
                        d[p] = b[p];
                function __() {
                    this.constructor = d;
                }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super.apply(this, arguments) || this;
                }
                default_1.zip = function (a, b) {
                    return new core_1.Sequence(function (_a, cons) {
                        var _b = _a === void 0 ? [
                                function () {
                                    return a.iterate();
                                },
                                function () {
                                    return b.iterate();
                                }
                            ] : _a, ai = _b[0], bi = _b[1];
                        return core_1.Sequence.Iterator.when(ai(), function () {
                            return cons();
                        }, function (at) {
                            return core_1.Sequence.Iterator.when(bi(), function () {
                                return cons();
                            }, function (bt) {
                                return cons([
                                    core_1.Sequence.Thunk.value(at),
                                    core_1.Sequence.Thunk.value(bt)
                                ], [
                                    core_1.Sequence.Thunk.iterator(at),
                                    core_1.Sequence.Thunk.iterator(bt)
                                ]);
                            });
                        });
                    });
                };
                return default_1;
            }(core_1.Sequence);
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = default_1;
        },
        { '../../core': 28 }
    ],
    68: [
        function (require, module, exports) {
            'use strict';
            function noop() {
                ;
            }
            exports.noop = noop;
        },
        {}
    ],
    69: [
        function (require, module, exports) {
            'use strict';
            var concat_1 = require('./concat');
            var Observable = function () {
                function Observable() {
                    this.node_ = {
                        parent: void 0,
                        children: new Map(),
                        childrenList: [],
                        registers: []
                    };
                }
                Observable.prototype.monitor = function (namespace, subscriber, identifier) {
                    var _this = this;
                    if (identifier === void 0) {
                        identifier = subscriber;
                    }
                    void this.throwTypeErrorIfInvalidSubscriber_(subscriber, namespace);
                    void this.seekNode_(namespace).registers.push([
                        namespace,
                        identifier,
                        true,
                        subscriber
                    ]);
                    return function () {
                        return _this.off(namespace, identifier);
                    };
                };
                Observable.prototype.on = function (namespace, subscriber, identifier) {
                    var _this = this;
                    if (identifier === void 0) {
                        identifier = subscriber;
                    }
                    void this.throwTypeErrorIfInvalidSubscriber_(subscriber, namespace);
                    void this.seekNode_(namespace).registers.push([
                        namespace,
                        identifier,
                        false,
                        function (data) {
                            return subscriber(data);
                        }
                    ]);
                    return function () {
                        return _this.off(namespace, identifier);
                    };
                };
                Observable.prototype.off = function (namespace, subscriber) {
                    switch (typeof subscriber) {
                    case 'function':
                        return void this.seekNode_(namespace).registers.some(function (_a, i, registers) {
                            var identifier = _a[1];
                            if (subscriber !== identifier)
                                return false;
                            switch (i) {
                            case 0:
                                return !void registers.shift();
                            case registers.length - 1:
                                return !void registers.pop();
                            default:
                                return !void registers.splice(i, 1);
                            }
                        });
                    case 'undefined': {
                            var node = this.seekNode_(namespace);
                            node.children = new Map();
                            node.childrenList = [];
                            node.registers = [];
                            return;
                        }
                    default:
                        throw this.throwTypeErrorIfInvalidSubscriber_(subscriber, namespace);
                    }
                };
                Observable.prototype.once = function (namespace, subscriber) {
                    var _this = this;
                    void this.throwTypeErrorIfInvalidSubscriber_(subscriber, namespace);
                    return this.on(namespace, function (data) {
                        return void _this.off(namespace, subscriber), subscriber(data);
                    }, subscriber);
                };
                Observable.prototype.emit = function (namespace, data, tracker) {
                    void this.drain_(namespace, data, tracker);
                };
                Observable.prototype.reflect = function (namespace, data) {
                    var results = [];
                    void this.emit(namespace, data, function (_, r) {
                        return results = r;
                    });
                    return results;
                };
                Observable.prototype.drain_ = function (types, data, tracker) {
                    var results = [];
                    void this.refsBelow_(this.seekNode_(types)).reduce(function (_, sub) {
                        var monitor = sub[2], subscriber = sub[3];
                        if (monitor)
                            return;
                        try {
                            var result = subscriber(data);
                            if (tracker) {
                                results[results.length] = result;
                            }
                        } catch (err) {
                            if (err !== void 0 && err !== null) {
                                void console.error(err + '');
                            }
                        }
                    }, void 0);
                    void this.refsAbove_(this.seekNode_(types)).reduce(function (_, sub) {
                        var monitor = sub[2], subscriber = sub[3];
                        if (!monitor)
                            return;
                        try {
                            void subscriber(data);
                        } catch (err) {
                            if (err !== void 0 && err !== null) {
                                void console.error(err);
                            }
                        }
                    }, void 0);
                    if (tracker) {
                        try {
                            void tracker(data, results);
                        } catch (err) {
                            void console.error(err);
                        }
                    }
                };
                Observable.prototype.refs = function (namespace) {
                    return this.refsBelow_(this.seekNode_(namespace));
                };
                Observable.prototype.refsAbove_ = function (_a) {
                    var parent = _a.parent, registers = _a.registers;
                    registers = concat_1.concat([], registers);
                    while (parent) {
                        registers = concat_1.concat(registers, parent.registers);
                        parent = parent.parent;
                    }
                    return registers;
                };
                Observable.prototype.refsBelow_ = function (_a) {
                    var childrenList = _a.childrenList, children = _a.children, registers = _a.registers;
                    registers = concat_1.concat([], registers);
                    var _loop_1 = function (i) {
                        var name = childrenList[i];
                        var below = this_1.refsBelow_(children.get(name));
                        registers = concat_1.concat(registers, below);
                        if (below.length === 0) {
                            void children.delete(name);
                            void childrenList.splice(childrenList.findIndex(function (value) {
                                return value === name || name !== name && value !== value;
                            }), 1);
                            void --i;
                        }
                        out_i_1 = i;
                    };
                    var this_1 = this, out_i_1;
                    for (var i = 0; i < childrenList.length; ++i) {
                        _loop_1(i);
                        i = out_i_1;
                    }
                    return registers;
                };
                Observable.prototype.seekNode_ = function (types) {
                    var node = this.node_;
                    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                        var type = types_1[_i];
                        var children = node.children;
                        if (!children.has(type)) {
                            void node.childrenList.push(type);
                            children.set(type, {
                                parent: node,
                                children: new Map(),
                                childrenList: [],
                                registers: []
                            });
                        }
                        node = children.get(type);
                    }
                    return node;
                };
                Observable.prototype.throwTypeErrorIfInvalidSubscriber_ = function (subscriber, types) {
                    switch (typeof subscriber) {
                    case 'function':
                        return;
                    default:
                        throw new TypeError('Spica: Observable: Invalid subscriber.\n\t' + types + ' ' + subscriber);
                    }
                };
                return Observable;
            }();
            exports.Observable = Observable;
        },
        { './concat': 11 }
    ],
    70: [
        function (require, module, exports) {
            'use strict';
            function sort(as, cmp, times, debug) {
                if (debug === void 0) {
                    debug = false;
                }
                if (!debug && times * times > as.length * 1.25)
                    return as.sort(cmp);
                times = times < as.length - 1 ? times : as.length - 1;
                for (var i = 0; i < times; ++i) {
                    for (var j = i + 1; j < as.length; ++j) {
                        if (cmp(as[i], as[j]) > 0 === false)
                            continue;
                        var a = as[i];
                        as[i] = as[j];
                        as[j] = a;
                    }
                }
                return as;
            }
            exports.sort = sort;
        },
        {}
    ],
    71: [
        function (require, module, exports) {
            'use strict';
            var cnt = 0;
            function sqid(id) {
                if (arguments.length > 0) {
                    if (typeof id !== 'number')
                        throw new TypeError('Spica: sqid: A parameter value must be a number: ' + id);
                    if (id >= 0 === false)
                        throw new TypeError('Spica: sqid: A parameter value must be a positive number: ' + id);
                    if (id % 1 !== 0)
                        throw new TypeError('Spica: sqid: A parameter value must be an integer: ' + id);
                }
                return id === void 0 ? (1000000000000000 + ++cnt + '').slice(1) : (1000000000000000 + id + '').slice(1);
            }
            exports.sqid = sqid;
        },
        {}
    ],
    72: [
        function (require, module, exports) {
            'use strict';
            var observable_1 = require('./observable');
            var tick_1 = require('./tick');
            var thenable_1 = require('./thenable');
            var sqid_1 = require('./sqid');
            var noop_1 = require('./noop');
            var Supervisor = function () {
                function Supervisor(_a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? '' : _c, _d = _b.timeout, timeout = _d === void 0 ? 0 : _d, _e = _b.destructor, destructor = _e === void 0 ? noop_1.noop : _e;
                    this.id = sqid_1.sqid();
                    this.events = {
                        init: new observable_1.Observable(),
                        loss: new observable_1.Observable(),
                        exit: new observable_1.Observable()
                    };
                    this.procs = new observable_1.Observable();
                    this.alive = true;
                    this.registerable = true;
                    this.scheduled = false;
                    this.workerSharedResource = { procs: this.procs };
                    this.queue = [];
                    if (this.constructor === Supervisor)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '>: Cannot instantiate abstract classes.');
                    this.name = name;
                    this.timeout = timeout;
                    this.destructor_ = destructor;
                    void ++this.constructor.count;
                }
                Supervisor.prototype.destructor = function (reason) {
                    void this.checkState();
                    this.alive = false;
                    void this.drain();
                    try {
                        void this.destructor_(reason);
                    } catch (err) {
                        void console.error(err);
                    }
                    void --this.constructor.count;
                    void Object.freeze(this);
                };
                Supervisor.prototype.schedule = function () {
                    var _this = this;
                    if (!this.alive)
                        return;
                    if (this.scheduled)
                        return;
                    void tick_1.Tick(function (_) {
                        if (!_this.alive)
                            return;
                        _this.scheduled = false;
                        void _this.drain();
                    });
                    this.scheduled = true;
                };
                Supervisor.prototype.register = function (name, process, state) {
                    void this.checkState();
                    if (!this.registerable)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '/' + name + '>: Cannot register a process after a supervisor is terminated.');
                    if (this.procs.refs([name]).length > 0)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '/' + name + '>: Cannot register a process multiply using the same name.');
                    void this.schedule();
                    process = typeof process === 'function' ? {
                        init: function (state) {
                            return state;
                        },
                        call: process,
                        exit: function (_) {
                            return void 0;
                        }
                    } : process;
                    return new Worker(this, this.workerSharedResource, name, process, state).terminate;
                };
                Supervisor.prototype.call = function (name, param, callback, timeout) {
                    var _this = this;
                    if (timeout === void 0) {
                        timeout = this.timeout;
                    }
                    void this.checkState();
                    void this.queue.push([
                        name,
                        param,
                        callback,
                        timeout,
                        Date.now()
                    ]);
                    void this.schedule();
                    if (timeout < Infinity === false)
                        return;
                    if (timeout > 0 === false)
                        return;
                    void setTimeout(function () {
                        return void _this.drain(name);
                    }, timeout + 9);
                };
                Supervisor.prototype.cast = function (name, param, timeout) {
                    if (timeout === void 0) {
                        timeout = this.timeout;
                    }
                    void this.checkState();
                    var results = this.procs.reflect([name], new WorkerCommand.Call(param, timeout));
                    if (results.length === 0) {
                        void this.events.loss.emit([name], [
                            name,
                            param
                        ]);
                    }
                    return results.length > 0;
                };
                Supervisor.prototype.refs = function (name) {
                    void this.checkState();
                    return this.procs.refs(name === void 0 ? [] : [name]).map(function (_a) {
                        var recv = _a[1];
                        var worker = recv(new WorkerCommand.Self());
                        return [
                            worker.name,
                            worker.process,
                            worker.state,
                            worker.terminate
                        ];
                    });
                };
                Supervisor.prototype.terminate = function (name, reason) {
                    if (!this.registerable)
                        return;
                    if (name === void 0) {
                        this.registerable = false;
                    }
                    var namespace = name === void 0 ? [] : [name];
                    void this.procs.emit(namespace, new WorkerCommand.Exit(reason));
                    void this.procs.off(namespace);
                    if (name === void 0) {
                        void this.destructor(reason);
                    }
                };
                Supervisor.prototype.checkState = function () {
                    if (!this.alive)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '>: A supervisor is already terminated.');
                };
                Supervisor.prototype.drain = function (target) {
                    var _this = this;
                    var now = Date.now();
                    var _loop_1 = function (i) {
                        var _a = this_1.queue[i], name = _a[0], param = _a[1], callback = _a[2], timeout = _a[3], since = _a[4];
                        var replies = target === void 0 || target === name ? this_1.procs.reflect([name], new WorkerCommand.Call(param, since + timeout - now)) : [];
                        if (this_1.alive && replies.length === 0 && now < since + timeout)
                            return out_i_1 = i, 'continue';
                        i === 0 ? void this_1.queue.shift() : void this_1.queue.splice(i, 1);
                        void --i;
                        if (replies.length === 0) {
                            void this_1.events.loss.emit([name], [
                                name,
                                param
                            ]);
                            try {
                                void callback(void 0, new Error('Spica: Supervisor: Task: Failed.'));
                            } catch (reason) {
                                void console.error(reason);
                            }
                        } else {
                            var reply = replies[0];
                            if (thenable_1.isThenable(reply)) {
                                void Promise.resolve(reply).then(function (reply) {
                                    return _this.alive ? void callback(reply) : void callback(void 0, new Error('Spica: Supervisor: Task: Failed.'));
                                }, function () {
                                    return void callback(void 0, new Error('Spica: Supervisor: Task: Failed.'));
                                }).catch(function (reason) {
                                    return void console.error(reason);
                                });
                            } else {
                                try {
                                    void callback(reply);
                                } catch (reason) {
                                    void console.error(reason);
                                }
                            }
                        }
                        out_i_1 = i;
                    };
                    var this_1 = this, out_i_1;
                    for (var i = 0; i < this.queue.length; ++i) {
                        _loop_1(i);
                        i = out_i_1;
                    }
                };
                return Supervisor;
            }();
            Supervisor.count = 0;
            Supervisor.procs = 0;
            exports.Supervisor = Supervisor;
            (function (Supervisor) {
            }(Supervisor = exports.Supervisor || (exports.Supervisor = {})));
            exports.Supervisor = Supervisor;
            var WorkerCommand;
            (function (WorkerCommand) {
                var Self = function () {
                    function Self() {
                        void this.COMMAND;
                    }
                    return Self;
                }();
                WorkerCommand.Self = Self;
                var Call = function () {
                    function Call(param, timeout) {
                        this.param = param;
                        this.timeout = timeout;
                        void this.COMMAND;
                    }
                    return Call;
                }();
                WorkerCommand.Call = Call;
                var Exit = function () {
                    function Exit(reason) {
                        this.reason = reason;
                        void this.COMMAND;
                    }
                    return Exit;
                }();
                WorkerCommand.Exit = Exit;
            }(WorkerCommand || (WorkerCommand = {})));
            var Worker = function () {
                function Worker(sv, sharedResource, name, process, state) {
                    var _this = this;
                    this.sv = sv;
                    this.sharedResource = sharedResource;
                    this.name = name;
                    this.process = process;
                    this.state = state;
                    this.alive = true;
                    this.called = false;
                    this.concurrency = 1;
                    this.receive = function (cmd) {
                        return Worker.prototype.receive.call(_this, cmd);
                    };
                    this.terminate = function (reason) {
                        return Worker.prototype.terminate.call(_this, reason);
                    };
                    void ++this.sv.constructor.procs;
                    void this.sharedResource.procs.on([name], this.receive);
                }
                Worker.prototype.destructor = function (reason) {
                    if (!this.alive)
                        return;
                    void this.sharedResource.procs.off([this.name], this.receive);
                    this.alive = false;
                    void --this.sv.constructor.procs;
                    void Object.freeze(this);
                    try {
                        void this.process.exit(this.state, reason);
                        void this.sv.events.exit.emit([this.name], [
                            this.name,
                            this.process,
                            this.state,
                            reason
                        ]);
                    } catch (reason) {
                        void this.sv.events.exit.emit([this.name], [
                            this.name,
                            this.process,
                            this.state,
                            reason
                        ]);
                        void this.sv.terminate(void 0, reason);
                    }
                };
                Worker.prototype.receive = function (cmd) {
                    var _this = this;
                    void this.checkState();
                    if (cmd instanceof WorkerCommand.Call) {
                        if (this.concurrency === 0)
                            throw void 0;
                        try {
                            void --this.concurrency;
                            if (!this.called) {
                                this.called = true;
                                void this.sv.events.init.emit([this.name], [
                                    this.name,
                                    this.process,
                                    this.state
                                ]);
                                this.state = this.process.init(this.state);
                            }
                            var result_1 = this.process.call(cmd.param, this.state);
                            if (thenable_1.isThenable(result_1)) {
                                return new Promise(function (resolve, reject) {
                                    void result_1.then(resolve, reject);
                                    if (cmd.timeout < Infinity === false)
                                        return;
                                    void setTimeout(function () {
                                        return void reject(new Error('Spica: Supervisor: Task: Timeout while processing.'));
                                    }, cmd.timeout);
                                }).then(function (_a) {
                                    var reply = _a[0], state = _a[1];
                                    void ++_this.concurrency;
                                    void _this.sv.schedule();
                                    if (!_this.alive)
                                        throw void 0;
                                    _this.state = state;
                                    return reply;
                                }, function (reason) {
                                    void ++_this.concurrency;
                                    void _this.sv.schedule();
                                    if (!_this.alive)
                                        throw reason;
                                    void _this.terminate(reason);
                                    throw reason;
                                });
                            } else {
                                void ++this.concurrency;
                                var reply = result_1[0], state = result_1[1];
                                this.state = state;
                                return reply;
                            }
                        } catch (reason) {
                            void this.terminate(reason);
                            throw void 0;
                        }
                    }
                    if (cmd instanceof WorkerCommand.Exit) {
                        void this.terminate(cmd.reason);
                        throw void 0;
                    }
                    if (cmd instanceof WorkerCommand.Self) {
                        return this;
                    }
                    throw new TypeError('Spica: Supervisor: <' + this.sv.id + '/' + this.sv.name + '/' + this.name + '>: Invalid command: ' + cmd);
                };
                Worker.prototype.terminate = function (reason) {
                    void this.destructor(reason);
                };
                Worker.prototype.checkState = function () {
                    if (!this.alive)
                        throw new Error('Spica: Supervisor: <' + this.sv.id + '/' + this.sv.name + '/' + this.name + '>: A process is already terminated:\n' + this.process);
                };
                return Worker;
            }();
        },
        {
            './noop': 68,
            './observable': 69,
            './sqid': 71,
            './thenable': 73,
            './tick': 74
        }
    ],
    73: [
        function (require, module, exports) {
            'use strict';
            function isThenable(target) {
                return !!target && typeof target === 'object' && typeof target.then === 'function';
            }
            exports.isThenable = isThenable;
        },
        {}
    ],
    74: [
        function (require, module, exports) {
            'use strict';
            var Queue = [];
            var scheduled = false;
            function enqueue(fn) {
                void Queue.push(fn);
                void schedule();
            }
            function dequeue() {
                scheduled = false;
                var rem = Queue.length;
                while (true) {
                    try {
                        while (rem > 0) {
                            void --rem;
                            void Queue.shift()();
                        }
                    } catch (e) {
                        console.error(e);
                        continue;
                    }
                    break;
                }
            }
            function schedule() {
                if (scheduled)
                    return;
                if (Queue.length === 0)
                    return;
                void Promise.resolve().then(dequeue);
                scheduled = true;
            }
            var IS_NODE = Function('return typeof process === \'object\' && typeof window !== \'object\'')();
            exports.Tick = IS_NODE ? Function('return fn => process.nextTick(fn)')() : enqueue;
        },
        {}
    ],
    75: [
        function (require, module, exports) {
            'use strict';
            function type(target) {
                return Object.prototype.toString.call(target).split(' ').pop().slice(0, -1);
            }
            exports.type = type;
        },
        {}
    ],
    76: [
        function (require, module, exports) {
            'use strict';
            var FORMAT_V4 = Object.freeze('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split(''));
            function v4() {
                var acc = '';
                for (var _i = 0, FORMAT_V4_1 = FORMAT_V4; _i < FORMAT_V4_1.length; _i++) {
                    var c = FORMAT_V4_1[_i];
                    if (c === 'x' || c === 'y') {
                        var r = Math.random() * 16 | 0;
                        var v = c == 'x' ? r : r & 3 | 8;
                        acc += v.toString(16);
                    } else {
                        acc += c;
                    }
                }
                return acc.toLowerCase();
            }
            exports.v4 = v4;
        },
        {}
    ],
    'spica': [
        function (require, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            __export(require('./src/export'));
            exports.__esModule = true;
        },
        { './src/export': 4 }
    ]
}, {}, [
    1,
    2,
    3,
    'spica'
]);