/*! spica v0.0.59 https://github.com/falsandtru/spica | (c) 2016, falsandtru | MIT License */
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
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            './lib/assign': 4,
            './lib/cache': 5,
            './lib/cancelable': 6,
            './lib/collection/attrmap': 7,
            './lib/collection/datamap': 8,
            './lib/concat': 10,
            './lib/curry': 11,
            './lib/flip': 12,
            './lib/hlist': 13,
            './lib/list': 14,
            './lib/mixin': 15,
            './lib/monad/either': 18,
            './lib/monad/maybe': 22,
            './lib/monad/sequence': 25,
            './lib/observable': 70,
            './lib/sort': 71,
            './lib/sqid': 72,
            './lib/supervisor': 74,
            './lib/tick': 76,
            './lib/uuid': 78
        }
    ],
    4: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                return walk;
                function walk(target) {
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
                }
            }
        },
        { './type': 77 }
    ],
    5: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    6: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var noop_1 = require('./noop');
            var maybe_1 = require('./monad/maybe');
            var either_1 = require('./monad/either');
            var Cancelable = function () {
                function Cancelable() {
                    var _this = this;
                    this.listeners = new Set();
                    this.canceled = false;
                    this.cancel = function (reason) {
                        _this.cancel = noop_1.noop;
                        _this.canceled = true;
                        _this.reason = reason;
                        void Object.freeze(_this);
                        while (_this.listeners.size > 0) {
                            void _this.listeners.forEach(function (cb) {
                                return void _this.listeners.delete(cb), void cb(reason);
                            });
                        }
                        _this.listeners.add = function (cb) {
                            return void cb(_this.reason), _this.listeners;
                        };
                    };
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
                }
                return Cancelable;
            }();
            exports.Cancelable = Cancelable;
        },
        {
            './monad/either': 18,
            './monad/maybe': 22,
            './noop': 69
        }
    ],
    7: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    8: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../sqid': 72,
            '../type': 77
        }
    ],
    9: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './assign': 4 }
    ],
    10: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    11: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    12: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var curry_1 = require('./curry');
            function flip(f) {
                return curry_1.curry(function (b, a) {
                    return f.length > 1 ? f(a, b) : f(a)(b);
                });
            }
            exports.flip = flip;
        },
        { './curry': 11 }
    ],
    13: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './concat': 10 }
    ],
    14: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './concat': 10 }
    ],
    15: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './assign': 4 }
    ],
    16: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var functor_1 = require('./functor');
            var curry_1 = require('../curry');
            var Applicative = function (_super) {
                __extends(Applicative, _super);
                function Applicative() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            '../curry': 11,
            './functor': 19
        }
    ],
    17: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './monad': 23 }
    ],
    18: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './either.impl': 17 }
    ],
    19: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var lazy_1 = require('./lazy');
            var Functor = function (_super) {
                __extends(Functor, _super);
                function Functor() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
        { './lazy': 20 }
    ],
    20: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    21: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './monadplus': 24 }
    ],
    22: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './maybe.impl': 21 }
    ],
    23: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var applicative_1 = require('./applicative');
            var Monad = function (_super) {
                __extends(Monad, _super);
                function Monad() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
        { './applicative': 16 }
    ],
    24: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var monad_1 = require('./monad');
            var MonadPlus = function (_super) {
                __extends(MonadPlus, _super);
                function MonadPlus() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MonadPlus;
            }(monad_1.Monad);
            exports.MonadPlus = MonadPlus;
            (function (MonadPlus) {
            }(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {})));
            exports.MonadPlus = MonadPlus;
        },
        { './monad': 23 }
    ],
    25: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            var sort_1 = require('./sequence/member/instance/sort');
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
            var inits_1 = require('./sequence/member/instance/inits');
            var tails_1 = require('./sequence/member/instance/tails');
            var segs_1 = require('./sequence/member/instance/segs');
            var subsequences_1 = require('./sequence/member/instance/subsequences');
            var permutations_1 = require('./sequence/member/instance/permutations');
            var compose_1 = require('../compose');
            void compose_1.compose(core_1.Sequence, resume_1.default, from_1.default, cycle_1.default, random_1.default, concat_1.default, zip_1.default, difference_1.default, union_1.default, intersect_1.default, pure_1.default, return_1.default, mempty_1.default, mconcat_1.default, mappend_1.default, mzero_1.default, mplus_1.default, extract_1.default, iterate_1.default, memoize_1.default, reduce_1.default, take_1.default, drop_1.default, takeWhile_1.default, dropWhile_1.default, takeUntil_1.default, dropUntil_1.default, sort_1.default, fmap_1.default, ap_1.default, bind_1.default, mapM_1.default, filterM_1.default, map_1.default, filter_1.default, scan_1.default, fold_1.default, group_1.default, inits_1.default, tails_1.default, segs_1.default, subsequences_1.default, permutations_1.default);
        },
        {
            '../compose': 9,
            './sequence/core': 26,
            './sequence/member/instance/ap': 27,
            './sequence/member/instance/bind': 28,
            './sequence/member/instance/drop': 29,
            './sequence/member/instance/dropUntil': 30,
            './sequence/member/instance/dropWhile': 31,
            './sequence/member/instance/extract': 32,
            './sequence/member/instance/filter': 33,
            './sequence/member/instance/filterM': 34,
            './sequence/member/instance/fmap': 35,
            './sequence/member/instance/fold': 36,
            './sequence/member/instance/group': 37,
            './sequence/member/instance/inits': 38,
            './sequence/member/instance/iterate': 39,
            './sequence/member/instance/map': 40,
            './sequence/member/instance/mapM': 41,
            './sequence/member/instance/memoize': 42,
            './sequence/member/instance/permutations': 43,
            './sequence/member/instance/reduce': 44,
            './sequence/member/instance/scan': 45,
            './sequence/member/instance/segs': 46,
            './sequence/member/instance/sort': 47,
            './sequence/member/instance/subsequences': 48,
            './sequence/member/instance/tails': 49,
            './sequence/member/instance/take': 50,
            './sequence/member/instance/takeUntil': 51,
            './sequence/member/instance/takeWhile': 52,
            './sequence/member/static/concat': 53,
            './sequence/member/static/cycle': 54,
            './sequence/member/static/difference': 55,
            './sequence/member/static/from': 56,
            './sequence/member/static/intersect': 57,
            './sequence/member/static/mappend': 58,
            './sequence/member/static/mconcat': 59,
            './sequence/member/static/mempty': 60,
            './sequence/member/static/mplus': 61,
            './sequence/member/static/mzero': 62,
            './sequence/member/static/pure': 63,
            './sequence/member/static/random': 64,
            './sequence/member/static/resume': 65,
            './sequence/member/static/return': 66,
            './sequence/member/static/union': 67,
            './sequence/member/static/zip': 68
        }
    ],
    26: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { '../monadplus': 24 }
    ],
    27: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.ap = function (a) {
                    return core_1.Sequence.ap(this, a);
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    28: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.bind = function (f) {
                    return core_1.Sequence.concat(this.fmap(f));
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    29: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    30: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    31: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    32: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    33: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    34: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    35: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    36: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    37: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    38: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.inits = function () {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), this.scan(function (b, a) {
                        return b.concat([a]);
                    }, []).dropWhile(function (as) {
                        return as.length === 0;
                    }));
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    39: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    40: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    41: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    42: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var memories = new WeakMap();
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    43: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
        { '../../core': 26 }
    ],
    44: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    45: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    46: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.segs = function () {
                    return core_1.Sequence.mappend(this.fold(function (a, bs) {
                        return bs.take(1).bind(function (b) {
                            return core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(function (c) {
                                    return concat_1.concat([a], c);
                                }))]), bs);
                        });
                    }, core_1.Sequence.from([core_1.Sequence.from([])])).bind(function (a) {
                        return a;
                    }), core_1.Sequence.from([[]]));
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    47: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.sort = function (cmp) {
                    return core_1.Sequence.from(this.extract().sort(cmp));
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    48: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var concat_1 = require('../../../../concat');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.subsequences = function () {
                    var _this = this;
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(function () {
                        return nonEmptySubsequences(_this);
                    }));
                };
                return default_1;
            }(core_1.Sequence);
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
            '../../../../concat': 10,
            '../../core': 26
        }
    ],
    49: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.prototype.tails = function () {
                    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map(function (_, i, as) {
                        return as.slice(i);
                    })), core_1.Sequence.from([[]]));
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    50: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    51: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    52: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    53: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    54: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    55: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    56: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    57: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    58: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.mappend = function (l, r) {
                    return core_1.Sequence.mconcat([
                        l,
                        r
                    ]);
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    59: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.mconcat = function (as) {
                    return Array.from(as).reduce(function (a, b) {
                        return mconcat(a, b);
                    }, core_1.Sequence.mempty);
                };
                return default_1;
            }(core_1.Sequence);
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
        { '../../core': 26 }
    ],
    60: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mempty = new core_1.Sequence(function (_, cons) {
                return cons();
            });
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    61: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mplus = core_1.Sequence.mappend;
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    62: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return default_1;
            }(core_1.Sequence);
            default_1.mzero = core_1.Sequence.mempty;
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    63: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.pure = function (a) {
                    return new core_1.Sequence(function (_, cons) {
                        return cons(a);
                    });
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    64: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    65: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    66: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                default_1.Return = function (a) {
                    return new core_1.Sequence(function (_, cons) {
                        return cons(a);
                    });
                };
                return default_1;
            }(core_1.Sequence);
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    67: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    68: [
        function (require, module, exports) {
            'use strict';
            var __extends = this && this.__extends || function () {
                var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                    d.__proto__ = b;
                } || function (d, b) {
                    for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p];
                };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            }();
            Object.defineProperty(exports, '__esModule', { value: true });
            var core_1 = require('../../core');
            var default_1 = function (_super) {
                __extends(default_1, _super);
                function default_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            exports.default = default_1;
        },
        { '../../core': 26 }
    ],
    69: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function noop() {
                ;
            }
            exports.noop = noop;
        },
        {}
    ],
    70: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var concat_1 = require('./concat');
            var stringify_1 = require('./stringify');
            var Observable = function () {
                function Observable() {
                    this.node_ = {
                        parent: void 0,
                        children: new Map(),
                        childrenNames: [],
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
                            node.childrenNames = [];
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
                        } catch (reason) {
                            if (reason !== void 0 && reason !== null) {
                                void console.error(stringify_1.stringify(reason));
                            }
                        }
                    }, void 0);
                    void this.refsAbove_(this.seekNode_(types)).reduce(function (_, sub) {
                        var monitor = sub[2], subscriber = sub[3];
                        if (!monitor)
                            return;
                        try {
                            void subscriber(data);
                        } catch (reason) {
                            if (reason !== void 0 && reason !== null) {
                                void console.error(stringify_1.stringify(reason));
                            }
                        }
                    }, void 0);
                    if (tracker) {
                        try {
                            void tracker(data, results);
                        } catch (reason) {
                            void console.error(stringify_1.stringify(reason));
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
                    var childrenNames = _a.childrenNames, children = _a.children, registers = _a.registers;
                    registers = concat_1.concat([], registers);
                    var _loop_1 = function (i) {
                        var name = childrenNames[i];
                        var below = this_1.refsBelow_(children.get(name));
                        registers = concat_1.concat(registers, below);
                        if (below.length === 0) {
                            void children.delete(name);
                            void childrenNames.splice(childrenNames.findIndex(function (value) {
                                return value === name || name !== name && value !== value;
                            }), 1);
                            void --i;
                        }
                        out_i_1 = i;
                    };
                    var this_1 = this, out_i_1;
                    for (var i = 0; i < childrenNames.length; ++i) {
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
                            void node.childrenNames.push(type);
                            children.set(type, {
                                parent: node,
                                children: new Map(),
                                childrenNames: [],
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
        {
            './concat': 10,
            './stringify': 73
        }
    ],
    71: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    72: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    73: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function stringify(target) {
                try {
                    return target instanceof Error && typeof target.stack === 'string' ? target.stack : 'toString' in target && typeof target.toString === 'function' ? target + '' : Object.prototype.toString.call(target);
                } catch (reason) {
                    return stringify(reason);
                }
            }
            exports.stringify = stringify;
        },
        {}
    ],
    74: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var observable_1 = require('./observable');
            var tick_1 = require('./tick');
            var thenable_1 = require('./thenable');
            var sqid_1 = require('./sqid');
            var stringify_1 = require('./stringify');
            var noop_1 = require('./noop');
            var Supervisor = function () {
                function Supervisor(_a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? '' : _c, _d = _b.size, size = _d === void 0 ? Infinity : _d, _e = _b.timeout, timeout = _e === void 0 ? Infinity : _e, _f = _b.destructor, destructor = _f === void 0 ? noop_1.noop : _f;
                    var _this = this;
                    this.id = sqid_1.sqid();
                    this.events = {
                        init: new observable_1.Observable(),
                        loss: new observable_1.Observable(),
                        exit: new observable_1.Observable()
                    };
                    this.workers = new Map();
                    this.alive = true;
                    this.available = true;
                    this.resource = 10;
                    this.messages = [];
                    this.deliver = function () {
                        var since = Date.now();
                        var resource = _this.resource;
                        var _loop_1 = function (i, len) {
                            var now = Date.now();
                            resource -= now - since;
                            var _a = _this.messages[i], name = _a[0], param = _a[1], callback = _a[2], timeout = _a[3], registered = _a[4];
                            var result = _this.workers.has(name) ? _this.workers.get(name).call([
                                param,
                                registered + timeout - now
                            ]) : void 0;
                            if (_this.available && !result && now < registered + timeout)
                                return out_i_1 = i, out_len_1 = len, 'continue';
                            i === 0 ? void _this.messages.shift() : void _this.messages.splice(i, 1);
                            void --i;
                            void --len;
                            if (result === void 0) {
                                void _this.events.loss.emit([name], [
                                    name,
                                    param
                                ]);
                            }
                            if (result === void 0 || result instanceof Error) {
                                try {
                                    void callback(void 0, new Error('Spica: Supervisor: A processing has failed.'));
                                } catch (reason) {
                                    void console.error(stringify_1.stringify(reason));
                                }
                                return out_i_1 = i, out_len_1 = len, 'continue';
                            }
                            var reply = result[0];
                            if (!thenable_1.isThenable(reply)) {
                                try {
                                    void callback(reply);
                                } catch (reason) {
                                    void console.error(stringify_1.stringify(reason));
                                }
                            } else {
                                void Promise.resolve(reply).then(function (reply) {
                                    return _this.available ? void callback(reply) : void callback(void 0, new Error('Spica: Supervisor: A processing has failed.'));
                                }, function () {
                                    return void callback(void 0, new Error('Spica: Supervisor: A processing has failed.'));
                                }).catch(function (reason) {
                                    return void console.error(stringify_1.stringify(reason));
                                });
                            }
                            out_i_1 = i;
                            out_len_1 = len;
                        };
                        var out_i_1, out_len_1;
                        for (var i = 0, len = _this.messages.length; _this.available && i < len && resource > 0; ++i) {
                            _loop_1(i, len);
                            i = out_i_1;
                            len = out_len_1;
                        }
                        if (!_this.available) {
                            while (_this.messages.length > 0) {
                                var _a = _this.messages.shift(), name = _a[0], param = _a[1];
                                void _this.events.loss.emit([name], [
                                    name,
                                    param
                                ]);
                            }
                            void Object.freeze(_this.messages);
                            return;
                        }
                        if (resource > 0)
                            return;
                        void _this.schedule();
                    };
                    if (this.constructor === Supervisor)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '>: Cannot instantiate abstract classes.');
                    this.name = name;
                    this.size = size;
                    this.timeout = timeout;
                    this.destructor_ = destructor;
                    void ++this.constructor.count;
                }
                Supervisor.prototype.destructor = function (reason) {
                    void this.deliver();
                    try {
                        void this.destructor_(reason);
                    } catch (reason) {
                        void console.error(stringify_1.stringify(reason));
                    }
                    this.alive = false;
                    void --this.constructor.count;
                    void Object.freeze(this);
                };
                Supervisor.prototype.validate = function () {
                    if (!this.available)
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '>: A supervisor is already terminated.');
                };
                Supervisor.prototype.register = function (name, process, state) {
                    var _this = this;
                    void this.validate();
                    if (this.workers.has(name))
                        throw new Error('Spica: Supervisor: <' + this.id + '/' + this.name + '/' + name + '>: Cannot register a process multiply with the same name.');
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
                    void ++this.constructor.procs;
                    return this.workers.set(name, new Worker(this, name, process, state, function () {
                        return void _this.workers.delete(name), void --_this.constructor.procs;
                    })).get(name).terminate;
                };
                Supervisor.prototype.call = function (name, param, callback, timeout) {
                    var _this = this;
                    if (timeout === void 0) {
                        timeout = this.timeout;
                    }
                    void this.validate();
                    while (this.messages.length + 1 > this.size) {
                        var _a = this.messages.shift(), name_1 = _a[0], param_1 = _a[1], callback_1 = _a[2];
                        void this.events.loss.emit([name_1], [
                            name_1,
                            param_1
                        ]);
                        try {
                            void callback_1(void 0, new Error('Spica: Supervisor: A message overflowed.'));
                        } catch (reason) {
                            void console.error(stringify_1.stringify(reason));
                        }
                    }
                    void this.messages.push([
                        name,
                        param,
                        callback,
                        timeout,
                        Date.now()
                    ]);
                    void this.schedule();
                    if (timeout <= 0)
                        return;
                    if (timeout === Infinity)
                        return;
                    void setTimeout(function () {
                        return void _this.deliver();
                    }, timeout + 9);
                };
                Supervisor.prototype.cast = function (name, param, timeout) {
                    if (timeout === void 0) {
                        timeout = this.timeout;
                    }
                    void this.validate();
                    var result = this.workers.has(name) ? this.workers.get(name).call([
                        param,
                        timeout
                    ]) : void 0;
                    if (result === void 0) {
                        void this.events.loss.emit([name], [
                            name,
                            param
                        ]);
                    }
                    if (result === void 0 || result instanceof Error)
                        return false;
                    return true;
                };
                Supervisor.prototype.refs = function (name) {
                    void this.validate();
                    return name === void 0 ? Array.from(this.workers.values()).map(convert) : this.workers.has(name) ? [convert(this.workers.get(name))] : [];
                    function convert(worker) {
                        return [
                            worker.name,
                            worker.process,
                            worker.state,
                            worker.terminate
                        ];
                    }
                };
                Supervisor.prototype.terminate = function (name, reason) {
                    if (!this.available)
                        return;
                    if (name === void 0) {
                        this.available = false;
                    }
                    void Array.from(this.workers.values()).forEach(function (worker) {
                        return void worker.terminate(reason);
                    });
                    if (name === void 0) {
                        void this.destructor(reason);
                    }
                };
                Supervisor.prototype.schedule = function () {
                    void tick_1.Tick(this.deliver, true);
                };
                return Supervisor;
            }();
            Supervisor.count = 0;
            Supervisor.procs = 0;
            exports.Supervisor = Supervisor;
            (function (Supervisor) {
            }(Supervisor = exports.Supervisor || (exports.Supervisor = {})));
            exports.Supervisor = Supervisor;
            var Worker = function () {
                function Worker(sv, name, process, state, destructor_) {
                    var _this = this;
                    this.sv = sv;
                    this.name = name;
                    this.process = process;
                    this.state = state;
                    this.destructor_ = destructor_;
                    this.alive = true;
                    this.available = true;
                    this.times = 0;
                    this.call = function (_a) {
                        var param = _a[0], timeout = _a[1];
                        if (!_this.available)
                            return;
                        try {
                            _this.available = false;
                            void ++_this.times;
                            if (_this.times === 1) {
                                void _this.sv.events.init.emit([_this.name], [
                                    _this.name,
                                    _this.process,
                                    _this.state
                                ]);
                                _this.state = _this.process.init(_this.state);
                            }
                            var result_1 = _this.process.call(param, _this.state);
                            if (!thenable_1.isThenable(result_1)) {
                                var reply = result_1[0], state = result_1[1];
                                _this.state = state;
                                _this.available = true;
                                return [reply];
                            } else {
                                return [new Promise(function (resolve, reject) {
                                        return void result_1.then(resolve, reject), timeout === Infinity ? void 0 : void setTimeout(function () {
                                            return void reject(new Error());
                                        }, timeout);
                                    }).then(function (_a) {
                                        var reply = _a[0], state = _a[1];
                                        void _this.sv.schedule();
                                        if (!_this.alive)
                                            return Promise.reject(new Error());
                                        _this.state = state;
                                        _this.available = true;
                                        return reply;
                                    }, function (reason) {
                                        void _this.sv.schedule();
                                        void _this.terminate(reason);
                                        throw reason;
                                    })];
                            }
                        } catch (reason) {
                            void _this.terminate(reason);
                            return new Error();
                        }
                    };
                    this.terminate = function (reason) {
                        if (!_this.alive)
                            return;
                        void _this.destructor(reason);
                    };
                }
                Worker.prototype.destructor = function (reason) {
                    this.alive = false;
                    this.available = false;
                    void this.destructor_();
                    void Object.freeze(this);
                    try {
                        void this.process.exit(reason, this.state);
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
                return Worker;
            }();
        },
        {
            './noop': 69,
            './observable': 70,
            './sqid': 72,
            './stringify': 73,
            './thenable': 75,
            './tick': 76
        }
    ],
    75: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function isThenable(target) {
                return !!target && typeof target === 'object' && typeof target.then === 'function';
            }
            exports.isThenable = isThenable;
        },
        {}
    ],
    76: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var stringify_1 = require('./stringify');
            var queue = [];
            var fs = new WeakSet();
            var scheduled = false;
            function enqueue(fn, dedup) {
                if (dedup === void 0) {
                    dedup = false;
                }
                void queue.push([
                    fn,
                    dedup
                ]);
                void schedule();
            }
            exports.Tick = enqueue;
            function dequeue() {
                scheduled = false;
                var rem = queue.length;
                while (true) {
                    try {
                        while (rem > 0) {
                            void --rem;
                            var _a = queue.shift(), fn = _a[0], dedup = _a[1];
                            if (dedup) {
                                if (fs.has(fn))
                                    continue;
                                void fs.add(fn);
                            }
                            void fn();
                        }
                    } catch (e) {
                        console.error(stringify_1.stringify(e));
                        continue;
                    }
                    fs = new WeakSet();
                    break;
                }
            }
            function schedule() {
                if (scheduled)
                    return;
                if (queue.length === 0)
                    return;
                void Promise.resolve().then(dequeue);
                scheduled = true;
            }
        },
        { './stringify': 73 }
    ],
    77: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function type(target) {
                return Object.prototype.toString.call(target).split(' ').pop().slice(0, -1);
            }
            exports.type = type;
        },
        {}
    ],
    78: [
        function (require, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(require('./src/export'));
        },
        { './src/export': 3 }
    ]
}, {}, [
    1,
    2,
    'spica'
]);