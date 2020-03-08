/*! pjax-api v3.30.0 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
require = function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = 'function' == typeof require && require;
                    if (!f && c)
                        return c(i, !0);
                    if (u)
                        return u(i, !0);
                    var a = new Error('Cannot find module \'' + i + '\'');
                    throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r);
                }, p, p.exports, r, e, n, t);
            }
            return n[i].exports;
        }
        for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
        return o;
    }
    return r;
}()({
    1: [
        function (_dereq_, module, exports) {
        },
        {}
    ],
    2: [
        function (_dereq_, module, exports) {
            arguments[4][1][0].apply(exports, arguments);
        },
        { 'dup': 1 }
    ],
    3: [
        function (_dereq_, module, exports) {
            arguments[4][1][0].apply(exports, arguments);
        },
        { 'dup': 1 }
    ],
    4: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isArray = exports.ObjectValues = exports.ObjectSetPrototypeOf = exports.ObjectSeal = exports.ObjectPreventExtensions = exports.ObjectKeys = exports.isSealed = exports.isFrozen = exports.isExtensible = exports.ObjectIs = exports.ObjectGetPrototypeOf = exports.ObjectGetOwnPropertySymbols = exports.ObjectGetOwnPropertyNames = exports.ObjectGetOwnPropertyDescriptors = exports.ObjectGetOwnPropertyDescriptor = exports.ObjectFreeze = exports.ObjectEntries = exports.ObjectDefineProperty = exports.ObjectDefineProperties = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.SymbolKeyFor = exports.SymbolFor = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.NaN = void 0;
            exports.NaN = Number.NaN, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
            exports.SymbolFor = Symbol.for;
            exports.SymbolKeyFor = Symbol.keyFor;
            exports.hasOwnProperty = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
            exports.isPrototypeOf = Object.prototype.isPrototypeOf.call.bind(Object.prototype.isPrototypeOf);
            exports.isEnumerable = Object.prototype.propertyIsEnumerable.call.bind(Object.prototype.propertyIsEnumerable);
            exports.toString = Object.prototype.toString.call.bind(Object.prototype.toString);
            exports.ObjectAssign = Object.assign;
            exports.ObjectCreate = Object.create;
            exports.ObjectDefineProperties = Object.defineProperties;
            exports.ObjectDefineProperty = Object.defineProperty;
            exports.ObjectEntries = Object.entries;
            exports.ObjectFreeze = Object.freeze;
            exports.ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
            exports.ObjectGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
            exports.ObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
            exports.ObjectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
            exports.ObjectGetPrototypeOf = Object.getPrototypeOf;
            exports.ObjectIs = Object.is;
            exports.isExtensible = Object.isExtensible;
            exports.isFrozen = Object.isFrozen;
            exports.isSealed = Object.isSealed;
            exports.ObjectKeys = Object.keys;
            exports.ObjectPreventExtensions = Object.preventExtensions;
            exports.ObjectSeal = Object.seal;
            exports.ObjectSetPrototypeOf = Object.setPrototypeOf;
            exports.ObjectValues = Object.values;
            exports.isArray = Array.isArray;
        },
        {}
    ],
    5: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.join = exports.push = exports.pop = exports.unshift = exports.shift = exports.indexOf = void 0;
            const alias_1 = _dereq_('./alias');
            function indexOf(as, a) {
                return a === a ? as.indexOf(a) : as.findIndex(a => a !== a);
            }
            exports.indexOf = indexOf;
            function shift(as, count) {
                if (count < 0)
                    throw new Error('Unexpected negative number');
                return count === void 0 ? [
                    as.shift(),
                    as
                ] : [
                    as.splice(0, count),
                    as
                ];
            }
            exports.shift = shift;
            function unshift(as, bs) {
                if (alias_1.isArray(as)) {
                    for (let i = as.length - 1; i >= 0; --i) {
                        bs.unshift(as[i]);
                    }
                } else {
                    bs.unshift(...as);
                }
                return bs;
            }
            exports.unshift = unshift;
            function pop(as, count) {
                if (count < 0)
                    throw new Error('Unexpected negative number');
                return count === void 0 ? [
                    as,
                    as.pop()
                ] : [
                    as,
                    as.splice(as.length - count, count)
                ];
            }
            exports.pop = pop;
            function push(as, bs) {
                if (alias_1.isArray(bs)) {
                    for (let i = 0; i < bs.length; ++i) {
                        as.push(bs[i]);
                    }
                } else {
                    as.push(...bs);
                }
                return as;
            }
            exports.push = push;
            function join(as, sep = '') {
                let acc = '';
                for (let i = 0; i < as.length; ++i) {
                    acc += i === 0 ? as[i] : sep + as[i];
                }
                return acc;
            }
            exports.join = join;
        },
        { './alias': 4 }
    ],
    6: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.template = exports.inherit = exports.merge = exports.extend = exports.clone = exports.assign = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const type_1 = _dereq_('./type');
            const array_1 = _dereq_('./array');
            exports.assign = template((prop, target, source) => target[prop] = source[prop]);
            exports.clone = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.clone(empty_(source[prop]), source[prop]);
                    default:
                        return target[prop] = source[prop];
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.extend = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.extend(target[prop], source[prop]);
                    default:
                        return target[prop] = exports.extend(empty_(source[prop]), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.merge = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    switch (type_1.type(target[prop])) {
                    case 'Array':
                        return target[prop] = array_1.push(target[prop], source[prop]);
                    default:
                        return target[prop] = source[prop].slice();
                    }
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.merge(target[prop], source[prop]);
                    default:
                        return target[prop] = exports.merge(empty_(source[prop]), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.inherit = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = isOwnProperty(target, prop) ? exports.inherit(target[prop], source[prop]) : exports.inherit(alias_1.ObjectCreate(target[prop]), source[prop]);
                    default:
                        return target[prop] = alias_1.ObjectCreate(source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            const isOwnProperty = '__proto__' in {} ? (o, p) => !('__proto__' in o) || o[p] !== o['__proto__'][p] : alias_1.hasOwnProperty;
            function template(strategy, empty = empty_) {
                return walk;
                function walk(target, ...sources) {
                    let isPrimitiveTarget = type_1.isPrimitive(target);
                    for (const source of sources) {
                        const isPrimitiveSource = type_1.isPrimitive(source);
                        if (isPrimitiveSource) {
                            target = source;
                            isPrimitiveTarget = isPrimitiveSource;
                        } else {
                            if (isPrimitiveTarget) {
                                target = empty(source);
                                isPrimitiveTarget = isPrimitiveSource;
                            }
                            const keys = alias_1.ObjectKeys(source);
                            for (let i = 0; i < keys.length; ++i) {
                                if (keys[i] in {})
                                    continue;
                                void strategy(keys[i], target, source);
                            }
                        }
                    }
                    return target;
                }
            }
            exports.template = template;
            function empty_(source) {
                switch (type_1.type(source)) {
                case 'Array':
                    return [];
                case 'Object':
                    return source instanceof global_1.Object ? {} : alias_1.ObjectCreate(null);
                default:
                    return source;
                }
            }
        },
        {
            './alias': 4,
            './array': 5,
            './global': 18,
            './type': 88
        }
    ],
    7: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Cache = void 0;
            const global_1 = _dereq_('./global');
            const assign_1 = _dereq_('./assign');
            const array_1 = _dereq_('./array');
            class Cache {
                constructor(size, callback = () => void 0, opts = {}) {
                    this.size = size;
                    this.callback = callback;
                    this.settings = {
                        ignore: {
                            delete: false,
                            clear: false
                        },
                        data: {
                            stats: [
                                [],
                                []
                            ],
                            entries: []
                        }
                    };
                    if (size > 0 === false)
                        throw new Error(`Spica: Cache: Cache size must be greater than 0.`);
                    void assign_1.extend(this.settings, opts);
                    const {stats, entries} = this.settings.data;
                    const LFU = stats[1].slice(0, size);
                    const LRU = stats[0].slice(0, size - LFU.length);
                    this.stats = {
                        LRU,
                        LFU
                    };
                    this.store = new global_1.Map(entries);
                    if (!opts.data)
                        return;
                    for (const k of array_1.push(stats[1].slice(LFU.length), stats[0].slice(LRU.length))) {
                        void this.store.delete(k);
                    }
                    if (this.store.size !== LFU.length + LRU.length)
                        throw new Error(`Spica: Cache: Size of stats and entries is not matched.`);
                    if (![
                            ...LFU,
                            ...LRU
                        ].every(k => this.store.has(k)))
                        throw new Error(`Spica: Cache: Keys of stats and entries is not matched.`);
                }
                put(key, value, log = true) {
                    if (!log && this.store.has(key))
                        return void this.store.set(key, value), true;
                    if (this.access(key))
                        return void this.store.set(key, value), true;
                    const {LRU, LFU} = this.stats;
                    if (LRU.length + LFU.length === this.size && LRU.length < LFU.length) {
                        const key = LFU.pop();
                        const val = this.store.get(key);
                        void this.store.delete(key);
                        void this.callback(key, val);
                    }
                    void LRU.unshift(key);
                    void this.store.set(key, value);
                    if (LRU.length + LFU.length > this.size) {
                        const key = LRU.pop();
                        const val = this.store.get(key);
                        void this.store.delete(key);
                        void this.callback(key, val);
                    }
                    return false;
                }
                set(key, value, log) {
                    void this.put(key, value, log);
                    return value;
                }
                get(key, log = true) {
                    if (!log)
                        return this.store.get(key);
                    void this.access(key);
                    return this.store.get(key);
                }
                has(key) {
                    return this.store.has(key);
                }
                delete(key) {
                    if (!this.store.has(key))
                        return false;
                    const {LRU, LFU} = this.stats;
                    for (const stat of [
                            LFU,
                            LRU
                        ]) {
                        const index = array_1.indexOf(stat, key);
                        if (index === -1)
                            continue;
                        const val = this.store.get(key);
                        void this.store.delete(stat.splice(index, 1)[0]);
                        if (this.settings.ignore.delete)
                            return true;
                        void this.callback(key, val);
                        return true;
                    }
                    return false;
                }
                clear() {
                    const store = this.store;
                    this.store = new global_1.Map();
                    this.stats = {
                        LRU: [],
                        LFU: []
                    };
                    if (this.settings.ignore.clear)
                        return;
                    for (const key of store.keys()) {
                        void this.callback(key, store.get(key));
                    }
                }
                [Symbol.iterator]() {
                    return this.store[Symbol.iterator]();
                }
                export() {
                    return {
                        stats: [
                            this.stats.LRU.slice(),
                            this.stats.LFU.slice()
                        ],
                        entries: [...this]
                    };
                }
                inspect() {
                    const {LRU, LFU} = this.stats;
                    return [
                        LRU.slice(),
                        LFU.slice()
                    ];
                }
                access(key) {
                    if (!this.store.has(key))
                        return false;
                    return this.accessLFU(key) || this.accessLRU(key);
                }
                accessLRU(key) {
                    const {LRU} = this.stats;
                    const index = array_1.indexOf(LRU, key);
                    if (index === -1)
                        return false;
                    const {LFU} = this.stats;
                    void LFU.unshift(...LRU.splice(index, 1));
                    return true;
                }
                accessLFU(key) {
                    const {LFU} = this.stats;
                    const index = array_1.indexOf(LFU, key);
                    if (index === -1)
                        return false;
                    void LFU.unshift(...LFU.splice(index, 1));
                    return true;
                }
            }
            exports.Cache = Cache;
        },
        {
            './array': 5,
            './assign': 6,
            './global': 18
        }
    ],
    8: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Cancellation = void 0;
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            const exception_1 = _dereq_('./exception');
            const maybe_1 = _dereq_('./monad/maybe');
            const either_1 = _dereq_('./monad/either');
            class Internal {
                constructor(resolve) {
                    this.resolve = resolve;
                    this.alive = true;
                    this.available = true;
                    this.listeners = new global_1.Set();
                }
                get canceled() {
                    return 'reason' in this;
                }
            }
            const internal = Symbol.for('spica/cancellation::internal');
            class Cancellation extends promise_1.AtomicPromise {
                constructor(cancelees = []) {
                    super(res => resolve = res);
                    this.register = listener => {
                        if (!this[internal].alive) {
                            this[internal].canceled && void handler(this[internal].reason);
                            return () => void 0;
                        }
                        void this[internal].listeners.add(handler);
                        return () => this[internal].alive ? void this[internal].listeners.delete(handler) : void 0;
                        function handler(reason) {
                            try {
                                void listener(reason);
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                            }
                        }
                    };
                    this.cancel = reason => {
                        if (!this[internal].available)
                            return;
                        this[internal].available = false;
                        this[internal].reason = reason;
                        this[internal].resolve(this[internal].reason);
                        for (const listener of this[internal].listeners) {
                            void listener(reason);
                        }
                        this[internal].alive = false;
                    };
                    this.close = reason => {
                        if (!this[internal].available)
                            return;
                        this[internal].available = false;
                        void this[internal].resolve(promise_1.AtomicPromise.reject(reason));
                        this[internal].alive = false;
                    };
                    this.promise = val => this[internal].canceled ? promise_1.AtomicPromise.reject(this[internal].reason) : promise_1.AtomicPromise.resolve(val);
                    this.maybe = val => maybe_1.Just(val).bind(val => this[internal].canceled ? maybe_1.Nothing : maybe_1.Just(val));
                    this.either = val => either_1.Right(val).bind(val => this[internal].canceled ? either_1.Left(this[internal].reason) : either_1.Right(val));
                    var resolve;
                    this[internal] = new Internal(resolve);
                    for (const cancellee of cancelees) {
                        void cancellee.register(this.cancel);
                    }
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
                get canceled() {
                    return 'reason' in this[internal];
                }
            }
            exports.Cancellation = Cancellation;
        },
        {
            './exception': 15,
            './global': 18,
            './monad/either': 26,
            './monad/maybe': 30,
            './promise': 82
        }
    ],
    9: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.tick = void 0;
            const list_1 = _dereq_('./list');
            const exception_1 = _dereq_('./exception');
            let list = list_1.MList();
            let last = list;
            function tick(cb) {
                schedule();
                last = last.append(cb);
            }
            exports.tick = tick;
            const scheduler = Promise.resolve();
            function schedule() {
                if (list.tail)
                    return;
                scheduler.then(run);
            }
            function run() {
                let node = list;
                list = last = list_1.MList();
                while (true) {
                    try {
                        for (; node.tail; node = node.tail) {
                            node.head();
                        }
                        return;
                    } catch (reason) {
                        void exception_1.causeAsyncException(reason);
                        continue;
                    }
                }
            }
        },
        {
            './exception': 15,
            './list': 21
        }
    ],
    10: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.never = exports.wait = exports.clock = void 0;
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            var clock_tick_1 = _dereq_('./clock.tick');
            Object.defineProperty(exports, 'tick', {
                enumerable: true,
                get: function () {
                    return clock_tick_1.tick;
                }
            });
            exports.clock = Promise.resolve(undefined);
            function wait(ms) {
                return ms === 0 ? promise_1.AtomicPromise.resolve(exports.clock) : new promise_1.AtomicPromise(resolve => void global_1.setTimeout(resolve, ms));
            }
            exports.wait = wait;
            exports.never = new class Never extends promise_1.AtomicPromise {
                static get [Symbol.species]() {
                    return Never;
                }
                constructor() {
                    super(() => void 0);
                }
                then() {
                    return this;
                }
                catch() {
                    return this;
                }
                finally() {
                    return this;
                }
            }();
        },
        {
            './clock.tick': 9,
            './global': 18,
            './promise': 82
        }
    ],
    11: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.concat = void 0;
            const alias_1 = _dereq_('./alias');
            function concat(target, source) {
                if (alias_1.isArray(source)) {
                    for (let i = 0; i < source.length; ++i) {
                        void target.push(source[i]);
                    }
                } else {
                    void target.push(...source);
                }
                return target;
            }
            exports.concat = concat;
        },
        { './alias': 4 }
    ],
    12: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var __await = this && this.__await || function (v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            };
            var __asyncGenerator = this && this.__asyncGenerator || function (thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError('Symbol.asyncIterator is not defined.');
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb('next'), verb('throw'), verb('return'), i[Symbol.asyncIterator] = function () {
                    return this;
                }, i;
                function verb(n) {
                    if (g[n])
                        i[n] = function (v) {
                            return new Promise(function (a, b) {
                                q.push([
                                    n,
                                    v,
                                    a,
                                    b
                                ]) > 1 || resume(n, v);
                            });
                        };
                }
                function resume(n, v) {
                    try {
                        step(g[n](v));
                    } catch (e) {
                        settle(q[0][3], e);
                    }
                }
                function step(r) {
                    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
                }
                function fulfill(value) {
                    resume('next', value);
                }
                function reject(value) {
                    resume('throw', value);
                }
                function settle(f, v) {
                    if (f(v), q.shift(), q.length)
                        resume(q[0][0], q[0][1]);
                }
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isCoroutine = exports.Coroutine = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const exception_1 = _dereq_('./exception');
            const noop_1 = _dereq_('./noop');
            const alive = Symbol.for('spica/Coroutine.alive');
            const init = Symbol.for('spica/Coroutine.init');
            const exit = Symbol.for('spica/Coroutine.exit');
            const terminate = Symbol.for('spica/Coroutine.terminate');
            const port = Symbol.for('spica/Coroutine.port');
            class Internal {
                constructor(opts) {
                    this.alive = true;
                    this.state = new future_1.AtomicFuture();
                    this.resume = new future_1.AtomicFuture();
                    this.result = new future_1.AtomicFuture();
                    this.msgs = [];
                    this.settings = {
                        autorun: true,
                        size: 0,
                        interval: 0,
                        resume: () => void 0,
                        trigger: void 0
                    };
                    void assign_1.extend(this.settings, opts);
                    void this.result.finally(() => {
                        while (true) {
                            try {
                                while (this.msgs.length > 0) {
                                    const [, reply] = this.msgs.shift();
                                    void reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
                                }
                                return;
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                                continue;
                            }
                        }
                    });
                }
            }
            const internal = Symbol.for('spica/coroutine::internal');
            let Coroutine = (() => {
                class Coroutine extends promise_1.AtomicPromise {
                    constructor(gen, opts = {}) {
                        super(resolve => res = resolve);
                        var res;
                        this[internal] = new Internal(opts);
                        this[port] = new Port(this, this[internal]);
                        void res(this[internal].result);
                        this[Coroutine.init] = () => __awaiter(this, void 0, void 0, function* () {
                            let reply = noop_1.noop;
                            try {
                                this[Coroutine.init] = noop_1.noop;
                                if (!this[internal].alive)
                                    return;
                                const resume = () => this[internal].msgs.length > 0 ? ([, reply] = this[internal].msgs.shift())[0] : this[internal].resume.then(resume);
                                const iter = gen.call(this);
                                let cnt = 0;
                                while (this[internal].alive) {
                                    void ++cnt;
                                    const [msg] = cnt === 1 ? [void 0] : yield promise_1.AtomicPromise.all([
                                        this[internal].settings.size === 0 ? void 0 : resume(),
                                        promise_1.AtomicPromise.all([
                                            this[internal].settings.resume(),
                                            this[internal].settings.interval > 0 ? clock_1.wait(this[internal].settings.interval) : void 0
                                        ])
                                    ]);
                                    if (!this[internal].alive)
                                        break;
                                    const {value, done} = yield iter.next(msg);
                                    if (!this[internal].alive)
                                        break;
                                    if (!done) {
                                        const state = this[internal].state;
                                        this[internal].state = new future_1.AtomicFuture();
                                        void state.bind({
                                            value: value,
                                            done
                                        });
                                        void reply({
                                            value: value,
                                            done
                                        });
                                        continue;
                                    } else {
                                        const result = yield value;
                                        if (!this[internal].alive)
                                            break;
                                        this[internal].alive = false;
                                        void this[internal].state.bind({
                                            value: void 0,
                                            done
                                        });
                                        void this[internal].result.bind(result);
                                        void reply({
                                            value: result,
                                            done
                                        });
                                        return;
                                    }
                                }
                                void reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
                            } catch (reason) {
                                void reply(promise_1.AtomicPromise.reject(reason));
                                void this[Coroutine.terminate](reason);
                            }
                        });
                        if (this[internal].settings.trigger !== void 0) {
                            for (const prop of global_1.Array().concat(this[internal].settings.trigger)) {
                                if (prop in this)
                                    continue;
                                const desc = alias_1.ObjectGetOwnPropertyDescriptor(this, prop) || {
                                    value: this[prop],
                                    enumerable: true,
                                    configurable: true,
                                    writable: true
                                };
                                void alias_1.ObjectDefineProperty(this, prop, {
                                    set(value) {
                                        void alias_1.ObjectDefineProperty(this, prop, Object.assign(Object.assign({}, desc), { value }));
                                        void this[init]();
                                    },
                                    get() {
                                        return this[prop];
                                    },
                                    enumerable: true,
                                    configurable: true
                                });
                            }
                        }
                        this[internal].settings.autorun && void clock_1.tick(() => void this[Coroutine.init]());
                    }
                    static get [Symbol.species]() {
                        return promise_1.AtomicPromise;
                    }
                    get [alive]() {
                        return this[internal].alive;
                    }
                    [exit](result) {
                        if (!this[internal].alive)
                            return;
                        void promise_1.AtomicPromise.resolve(result).then(result => {
                            if (!this[internal].alive)
                                return;
                            this[internal].alive = false;
                            void this[internal].state.bind({
                                value: void 0,
                                done: true
                            });
                            void this[internal].result.bind(result);
                        }, reason => {
                            if (!this[internal].alive)
                                return;
                            this[internal].alive = false;
                            void this[internal].state.bind({
                                value: void 0,
                                done: true
                            });
                            void this[internal].result.bind(promise_1.AtomicPromise.reject(reason));
                        });
                    }
                    [terminate](reason) {
                        return this[exit](promise_1.AtomicPromise.reject(reason));
                    }
                    [Symbol.asyncIterator]() {
                        return __asyncGenerator(this, arguments, function* _a() {
                            while (this[internal].alive) {
                                const {value} = yield __await(this[internal].state);
                                if (!this[internal].alive)
                                    break;
                                yield yield __await(value);
                            }
                            return yield __await(this.then(() => void 0));
                        });
                    }
                }
                Coroutine.alive = alive;
                Coroutine.init = init;
                Coroutine.exit = exit;
                Coroutine.terminate = terminate;
                Coroutine.port = port;
                return Coroutine;
            })();
            exports.Coroutine = Coroutine;
            class Port {
                constructor(co, internal) {
                    this.co = co;
                    this.internal = internal;
                }
                recv() {
                    return this.internal.state.then(({value, done}) => done ? this.co.then(value => ({
                        value,
                        done
                    })) : {
                        value: value,
                        done
                    });
                }
                send(msg) {
                    if (!this.internal.alive)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
                    const res = new future_1.AtomicFuture();
                    void this.internal.msgs.push([
                        msg,
                        res.bind
                    ]);
                    void this.internal.resume.bind();
                    this.internal.resume = new future_1.AtomicFuture();
                    while (this.internal.msgs.length > this.internal.settings.size) {
                        const [, reply] = this.internal.msgs.shift();
                        void reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`)));
                    }
                    return res.then();
                }
                connect(com) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const iter = com.call(this.co);
                        let reply;
                        while (true) {
                            const {value, done} = yield iter.next(reply);
                            if (done)
                                return value;
                            reply = (yield this.send(value)).value;
                        }
                    });
                }
            }
            function isCoroutine(target) {
                return typeof target === 'object' && target !== null && typeof target.constructor['exit'] === 'symbol' && typeof target[target.constructor['exit']] === 'function' && typeof target.constructor['terminate'] === 'symbol' && typeof target[target.constructor['terminate']] === 'function' && typeof target.constructor['port'] === 'symbol' && typeof target[target.constructor['port']] === 'object';
            }
            exports.isCoroutine = isCoroutine;
        },
        {
            './alias': 4,
            './assign': 6,
            './clock': 10,
            './exception': 15,
            './future': 17,
            './global': 18,
            './noop': 80,
            './promise': 82
        }
    ],
    13: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.curry = void 0;
            exports.curry = f => apply(f, []);
            function apply(f, xs) {
                return xs.length >= f.length ? f(...xs) : (...ys) => apply(f, [
                    ...xs,
                    ...ys
                ]);
            }
        },
        {}
    ],
    14: [
        function (_dereq_, module, exports) {
            'use strict';
            var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function () {
                        return m[k];
                    }
                });
            } : function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                o[k2] = m[k];
            });
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/either'), exports);
        },
        { './monad/either': 26 }
    ],
    15: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.causeAsyncException = void 0;
            function causeAsyncException(reason) {
                void Promise.reject(reason);
            }
            exports.causeAsyncException = causeAsyncException;
        },
        {}
    ],
    16: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.flip = void 0;
            const curry_1 = _dereq_('./curry');
            function flip(f) {
                return curry_1.curry((b, a) => f.length > 1 ? f(a, b) : f(a)(b));
            }
            exports.flip = flip;
        },
        { './curry': 13 }
    ],
    17: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.AtomicFuture = exports.Future = void 0;
            const promise_1 = _dereq_('./promise');
            class Future extends Promise {
                constructor(strict = true) {
                    let bind;
                    let state = true;
                    super(resolve => bind = value => {
                        if (!state && !strict)
                            return this.then();
                        if (!state)
                            throw new Error(`Spica: Future: Cannot rebind a value.`);
                        state = false;
                        void resolve(value);
                        return this.then();
                    });
                    this.bind = bind;
                }
                static get [Symbol.species]() {
                    return Promise;
                }
            }
            exports.Future = Future;
            class AtomicFuture extends promise_1.AtomicPromise {
                constructor(strict = true) {
                    let bind;
                    let state = true;
                    super(resolve => bind = value => {
                        if (!state && !strict)
                            return this.then();
                        if (!state)
                            throw new Error(`Spica: AtomicFuture: Cannot rebind a value.`);
                        state = false;
                        void resolve(value);
                        return this.then();
                    });
                    this.bind = bind;
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
            }
            exports.AtomicFuture = AtomicFuture;
        },
        { './promise': 82 }
    ],
    18: [
        function (_dereq_, module, exports) {
            'use strict';
            const global = void 0 || typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || Function('return this')();
            global.global = global;
            module.exports = global;
        },
        {}
    ],
    19: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.compose = void 0;
            function compose(target, ...sources) {
                return sources.reduce((b, d) => {
                    void Object.getOwnPropertyNames(d.prototype).filter(p => !(p in b.prototype)).forEach(p => b.prototype[p] = d.prototype[p]);
                    void Object.getOwnPropertyNames(d).filter(p => !(p in b)).forEach(p => b[p] = d[p]);
                    return b;
                }, target);
            }
            exports.compose = compose;
        },
        {}
    ],
    20: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.HList = void 0;
            function HList(...as) {
                return as.length === 0 ? HNil : as.reduceRight((node, a) => node.add(a), HNil);
            }
            exports.HList = HList;
            const HNil = new class HNil {
                constructor() {
                    this.TYPE;
                }
                add(a) {
                    return new HCons(a, this);
                }
                unfold(f) {
                    return this.add(f());
                }
                tuple() {
                    return [];
                }
            }();
            class HCons {
                constructor(head, tail) {
                    this.head = head;
                    this.tail = tail;
                    this.TYPE;
                }
                add(a) {
                    return new HCons(a, this);
                }
                modify(f) {
                    return this.tail.add(f(this.head));
                }
                fold(f) {
                    return this.tail.modify(r => f(this.head, r));
                }
                unfold(f) {
                    return this.add(f(this.head));
                }
                reverse() {
                    return this.tuple().reverse();
                }
                tuple() {
                    const t = this.tail.tuple();
                    t.unshift(this.head);
                    return t;
                }
            }
        },
        {}
    ],
    21: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.MList = exports.List = void 0;
            const global_1 = _dereq_('./global');
            function List(...values) {
                let node = Nil();
                for (let i = values.length - 1; i >= 0; --i) {
                    node = node.add(values[i]);
                }
                return node;
            }
            exports.List = List;
            function Nil() {
                return new Cons(global_1.undefined, global_1.undefined);
            }
            class Cons {
                constructor(head, tail) {
                    this.head = head;
                    this.tail = tail;
                }
                append(value) {
                    return this.replaceWith(value, List()).tail;
                }
                add(value) {
                    return new Cons(value, this);
                }
                foldl(f, acc) {
                    for (let node = this; node.tail; node = node.tail) {
                        acc = f(acc, node.head);
                    }
                    return acc;
                }
                foldr(f, acc) {
                    for (let node = this.reverse(); node.tail; node = node.tail) {
                        acc = f(node.head, acc);
                    }
                    return acc;
                }
                map(f) {
                    const node = List();
                    this.foldl((acc, value) => acc.append(f(value)), node);
                    return node;
                }
                replaceWith(head, tail) {
                    this.head = head;
                    this.tail = tail;
                    return this;
                }
                reverse() {
                    return this.foldl((acc, value) => acc.add(value), List());
                }
                get length() {
                    return this.foldl(acc => acc + 1, 0);
                }
                *[Symbol.iterator]() {
                    for (let node = this; node.tail; node = node.tail) {
                        yield node.head;
                    }
                }
            }
            function MList(...values) {
                let node = MNil();
                for (let i = values.length - 1; i >= 0; --i) {
                    node = node.add(values[i]);
                }
                return node;
            }
            exports.MList = MList;
            function MNil() {
                return new MCons(global_1.undefined, global_1.undefined);
            }
            class MCons {
                constructor(head, tail) {
                    this.head = head;
                    this.tail = tail;
                }
                take(count) {
                    if (count === 0)
                        return MList();
                    let node = this;
                    for (let i = 0; i + 1 < count && node.tail; ++i, node = node.tail);
                    const tail = node.tail;
                    node.tail && node.replaceWith(node.head, MList());
                    const dels = new MCons(this.head, this.tail);
                    this.tail && this.replaceWith(tail === null || tail === void 0 ? void 0 : tail.head, tail === null || tail === void 0 ? void 0 : tail.tail);
                    return dels;
                }
                prepend(value) {
                    return this.replaceWith(value, new MCons(this.head, this.tail));
                }
                append(value) {
                    return this.replaceWith(value, MList()).tail;
                }
                replace(node, count, adds) {
                    const dels = node.take(count);
                    const {head, tail} = node;
                    if (adds === null || adds === void 0 ? void 0 : adds.tail) {
                        node.replaceWith(adds.head, adds.tail);
                        for (; node.tail; node = node.tail);
                    }
                    node.replaceWith(head, tail);
                    return dels;
                }
                splice(index, count = 0, adds) {
                    let node = this;
                    for (let i = 0; i < index && node.tail; ++i, node = node.tail);
                    return this.replace(node, count, adds);
                }
                interleave(find, count, adds) {
                    let node = this;
                    let index = 0;
                    for (;; ++index, node = node.tail) {
                        if (find(node.head, node.tail ? index : -1))
                            break;
                        if (!node.tail)
                            return;
                    }
                    return this.replace(node, count, adds);
                }
                convert(f) {
                    for (let node = this; node.tail; node = node.tail) {
                        node.replaceWith(f(node.head), node.tail);
                    }
                    return this;
                }
                clear() {
                    return this.replaceWith(global_1.undefined, global_1.undefined);
                }
                freeze() {
                    const first = List();
                    for (let last = first, tail = this; tail.tail; tail = tail.tail) {
                        last = last['append'](tail.head);
                    }
                    return first;
                }
                add(value) {
                    return new MCons(value, this);
                }
                foldl(f, acc) {
                    for (let node = this; node.tail; node = node.tail) {
                        acc = f(acc, node.head);
                    }
                    return acc;
                }
                foldr(f, acc) {
                    for (let node = this.reverse(); node.tail; node = node.tail) {
                        acc = f(node.head, acc);
                    }
                    return acc;
                }
                map(f) {
                    const node = MList();
                    this.foldl((acc, value) => acc.append(f(value)), node);
                    return node;
                }
                replaceWith(head, tail) {
                    this.head = head;
                    this.tail = tail;
                    return this;
                }
                reverse() {
                    if (!this.tail)
                        return this;
                    for (let prev = MList(), node = this, next;;) {
                        next = node.tail;
                        node.replaceWith(node.head, prev);
                        if (!next.tail)
                            return node;
                        prev = node;
                        node = next;
                    }
                }
                get length() {
                    return this.foldl(acc => acc + 1, 0);
                }
                *[Symbol.iterator]() {
                    for (let node = this; node.tail; node = node.tail) {
                        yield node.head;
                    }
                }
            }
        },
        { './global': 18 }
    ],
    22: [
        function (_dereq_, module, exports) {
            'use strict';
            var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function () {
                        return m[k];
                    }
                });
            } : function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                o[k2] = m[k];
            });
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/maybe'), exports);
        },
        { './monad/maybe': 30 }
    ],
    23: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.memoize = void 0;
            const global_1 = _dereq_('./global');
            function memoize(f, memory = new Map()) {
                let nullable = false;
                return a => {
                    let z = memory.get(a);
                    if (z !== global_1.undefined || nullable && memory.has(a))
                        return z;
                    z = f(a);
                    nullable = nullable || z === global_1.undefined;
                    memory.set(a, z);
                    return z;
                };
            }
            exports.memoize = memoize;
        },
        { './global': 18 }
    ],
    24: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Applicative = void 0;
            const functor_1 = _dereq_('./functor');
            const curry_1 = _dereq_('../curry');
            class Applicative extends functor_1.Functor {
            }
            exports.Applicative = Applicative;
            (function (Applicative) {
                function ap(af, aa) {
                    return aa ? af.bind(f => aa.fmap(curry_1.curry(f))) : aa => ap(af, aa);
                }
                Applicative.ap = ap;
            }(Applicative = exports.Applicative || (exports.Applicative = {})));
        },
        {
            '../curry': 13,
            './functor': 27
        }
    ],
    25: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Right = exports.Left = exports.Either = void 0;
            const monad_1 = _dereq_('./monad');
            const promise_1 = _dereq_('../promise');
            class Either extends monad_1.Monad {
                constructor(thunk) {
                    super(thunk);
                    void this.EITHER;
                }
                fmap(f) {
                    return this.bind(b => new Right(f(b)));
                }
                ap(b) {
                    return Either.ap(this, b);
                }
                bind(f) {
                    return new Either(() => {
                        const m = this.evaluate();
                        if (m instanceof Left) {
                            return m;
                        }
                        if (m instanceof Right) {
                            return f(m.extract());
                        }
                        if (m instanceof Either) {
                            return m.bind(f);
                        }
                        throw new TypeError(`Spica: Either: Invalid monad value.\n\t${ m }`);
                    });
                }
                join() {
                    return this.bind(m => m);
                }
                extract(left, right) {
                    return !right ? this.evaluate().extract(left) : this.fmap(right).extract(left);
                }
                static do(block) {
                    const iter = block();
                    let val;
                    while (true) {
                        const {
                            value: m,
                            done
                        } = iter.next(val);
                        if (done)
                            return m;
                        const r = m.extract(() => void 0, a => [a]);
                        if (!r)
                            return m;
                        val = r[0];
                    }
                }
            }
            exports.Either = Either;
            (function (Either) {
                function pure(b) {
                    return new Right(b);
                }
                Either.pure = pure;
                Either.Return = pure;
                function sequence(fm) {
                    return fm instanceof Either ? fm.extract(b => promise_1.AtomicPromise.resolve(new Left(b)), a => promise_1.AtomicPromise.resolve(a).then(Either.Return)) : fm.reduce((acc, m) => acc.bind(as => m.fmap(a => [
                        ...as,
                        a
                    ])), Either.Return([]));
                }
                Either.sequence = sequence;
            }(Either = exports.Either || (exports.Either = {})));
            class Left extends Either {
                constructor(a) {
                    super(throwCallError);
                    this.a = a;
                    void this.LEFT;
                }
                bind(_) {
                    return this;
                }
                extract(left) {
                    if (!left)
                        throw this.a;
                    return left(this.a);
                }
            }
            exports.Left = Left;
            class Right extends Either {
                constructor(b) {
                    super(throwCallError);
                    this.b = b;
                    void this.RIGHT;
                }
                bind(f) {
                    return new Either(() => f(this.extract()));
                }
                extract(_, right) {
                    return !right ? this.b : right(this.b);
                }
            }
            exports.Right = Right;
            function throwCallError() {
                throw new Error(`Spica: Either: Invalid thunk call.`);
            }
        },
        {
            '../promise': 82,
            './monad': 31
        }
    ],
    26: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Right = exports.Left = exports.Either = void 0;
            const Monad = _dereq_('./either.impl');
            class Either extends Monad.Either {
                constructor() {
                    super(() => void 0);
                }
            }
            exports.Either = Either;
            function Left(a) {
                return new Monad.Left(a);
            }
            exports.Left = Left;
            function Right(b) {
                return new Monad.Right(b);
            }
            exports.Right = Right;
        },
        { './either.impl': 25 }
    ],
    27: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Functor = void 0;
            const lazy_1 = _dereq_('./lazy');
            class Functor extends lazy_1.Lazy {
            }
            exports.Functor = Functor;
            (function (Functor) {
                function fmap(m, f) {
                    return f ? m.fmap(f) : f => m.fmap(f);
                }
                Functor.fmap = fmap;
            }(Functor = exports.Functor || (exports.Functor = {})));
        },
        { './lazy': 28 }
    ],
    28: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Lazy = void 0;
            class Lazy {
                constructor(thunk) {
                    this.thunk = thunk;
                }
                evaluate() {
                    return this.memory_ = this.memory_ || this.thunk();
                }
            }
            exports.Lazy = Lazy;
        },
        {}
    ],
    29: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Nothing = exports.Just = exports.Maybe = void 0;
            const monadplus_1 = _dereq_('./monadplus');
            const promise_1 = _dereq_('../promise');
            class Maybe extends monadplus_1.MonadPlus {
                constructor(thunk) {
                    super(thunk);
                    void this.MAYBE;
                }
                fmap(f) {
                    return this.bind(a => new Just(f(a)));
                }
                ap(a) {
                    return Maybe.ap(this, a);
                }
                bind(f) {
                    return new Maybe(() => {
                        const m = this.evaluate();
                        if (m instanceof Just) {
                            return f(m.extract());
                        }
                        if (m instanceof Nothing) {
                            return m;
                        }
                        if (m instanceof Maybe) {
                            return m.bind(f);
                        }
                        throw new TypeError(`Spica: Maybe: Invalid monad value.\n\t${ m }`);
                    });
                }
                guard(cond) {
                    return cond ? this : Maybe.mzero;
                }
                join() {
                    return this.bind(m => m);
                }
                extract(nothing, just) {
                    return !just ? this.evaluate().extract(nothing) : this.fmap(just).extract(nothing);
                }
                static do(block) {
                    const iter = block();
                    let val;
                    while (true) {
                        const {
                            value: m,
                            done
                        } = iter.next(val);
                        if (done)
                            return m;
                        const r = m.extract(() => void 0, a => [a]);
                        if (!r)
                            return m;
                        val = r[0];
                    }
                }
            }
            exports.Maybe = Maybe;
            (function (Maybe) {
                function pure(a) {
                    return new Just(a);
                }
                Maybe.pure = pure;
                Maybe.Return = pure;
                function sequence(fm) {
                    return fm instanceof Maybe ? fm.extract(() => promise_1.AtomicPromise.resolve(Maybe.mzero), a => promise_1.AtomicPromise.resolve(a).then(Maybe.Return)) : fm.reduce((acc, m) => acc.bind(as => m.fmap(a => [
                        ...as,
                        a
                    ])), Maybe.Return([]));
                }
                Maybe.sequence = sequence;
            }(Maybe = exports.Maybe || (exports.Maybe = {})));
            class Just extends Maybe {
                constructor(a) {
                    super(throwCallError);
                    this.a = a;
                    void this.JUST;
                }
                bind(f) {
                    return new Maybe(() => f(this.extract()));
                }
                extract(_, just) {
                    return !just ? this.a : just(this.a);
                }
            }
            exports.Just = Just;
            class Nothing extends Maybe {
                constructor() {
                    super(throwCallError);
                    void this.NOTHING;
                }
                bind(_) {
                    return this;
                }
                extract(nothing) {
                    if (!nothing)
                        throw void 0;
                    return nothing();
                }
            }
            exports.Nothing = Nothing;
            (function (Maybe) {
                Maybe.mzero = new Nothing();
                function mplus(ml, mr) {
                    return new Maybe(() => ml.fmap(() => ml).extract(() => mr));
                }
                Maybe.mplus = mplus;
            }(Maybe = exports.Maybe || (exports.Maybe = {})));
            function throwCallError() {
                throw new Error(`Spica: Maybe: Invalid thunk call.`);
            }
        },
        {
            '../promise': 82,
            './monadplus': 32
        }
    ],
    30: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Nothing = exports.Just = exports.Maybe = void 0;
            const Monad = _dereq_('./maybe.impl');
            class Maybe extends Monad.Maybe {
                constructor() {
                    super(() => void 0);
                }
            }
            exports.Maybe = Maybe;
            function Just(a) {
                return new Monad.Just(a);
            }
            exports.Just = Just;
            exports.Nothing = Monad.Maybe.mzero;
        },
        { './maybe.impl': 29 }
    ],
    31: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Monad = void 0;
            const applicative_1 = _dereq_('./applicative');
            class Monad extends applicative_1.Applicative {
            }
            exports.Monad = Monad;
            (function (Monad) {
                function bind(m, f) {
                    return f ? m.bind(f) : f => bind(m, f);
                }
                Monad.bind = bind;
            }(Monad = exports.Monad || (exports.Monad = {})));
        },
        { './applicative': 24 }
    ],
    32: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.MonadPlus = void 0;
            const monad_1 = _dereq_('./monad');
            class MonadPlus extends monad_1.Monad {
            }
            exports.MonadPlus = MonadPlus;
            (function (MonadPlus) {
            }(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {})));
        },
        { './monad': 31 }
    ],
    33: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Sequence = void 0;
            const core_1 = _dereq_('./sequence/core');
            Object.defineProperty(exports, 'Sequence', {
                enumerable: true,
                get: function () {
                    return core_1.Sequence;
                }
            });
            const resume_1 = _dereq_('./sequence/member/static/resume');
            const from_1 = _dereq_('./sequence/member/static/from');
            const cycle_1 = _dereq_('./sequence/member/static/cycle');
            const random_1 = _dereq_('./sequence/member/static/random');
            const concat_1 = _dereq_('./sequence/member/static/concat');
            const zip_1 = _dereq_('./sequence/member/static/zip');
            const difference_1 = _dereq_('./sequence/member/static/difference');
            const union_1 = _dereq_('./sequence/member/static/union');
            const intersect_1 = _dereq_('./sequence/member/static/intersect');
            const pure_1 = _dereq_('./sequence/member/static/pure');
            const return_1 = _dereq_('./sequence/member/static/return');
            const sequence_1 = _dereq_('./sequence/member/static/sequence');
            const mempty_1 = _dereq_('./sequence/member/static/mempty');
            const mconcat_1 = _dereq_('./sequence/member/static/mconcat');
            const mappend_1 = _dereq_('./sequence/member/static/mappend');
            const mzero_1 = _dereq_('./sequence/member/static/mzero');
            const mplus_1 = _dereq_('./sequence/member/static/mplus');
            const extract_1 = _dereq_('./sequence/member/instance/extract');
            const iterate_1 = _dereq_('./sequence/member/instance/iterate');
            const memoize_1 = _dereq_('./sequence/member/instance/memoize');
            const reduce_1 = _dereq_('./sequence/member/instance/reduce');
            const take_1 = _dereq_('./sequence/member/instance/take');
            const drop_1 = _dereq_('./sequence/member/instance/drop');
            const takeWhile_1 = _dereq_('./sequence/member/instance/takeWhile');
            const dropWhile_1 = _dereq_('./sequence/member/instance/dropWhile');
            const takeUntil_1 = _dereq_('./sequence/member/instance/takeUntil');
            const dropUntil_1 = _dereq_('./sequence/member/instance/dropUntil');
            const sort_1 = _dereq_('./sequence/member/instance/sort');
            const unique_1 = _dereq_('./sequence/member/instance/unique');
            const fmap_1 = _dereq_('./sequence/member/instance/fmap');
            const ap_1 = _dereq_('./sequence/member/instance/ap');
            const bind_1 = _dereq_('./sequence/member/instance/bind');
            const join_1 = _dereq_('./sequence/member/instance/join');
            const mapM_1 = _dereq_('./sequence/member/instance/mapM');
            const filterM_1 = _dereq_('./sequence/member/instance/filterM');
            const map_1 = _dereq_('./sequence/member/instance/map');
            const filter_1 = _dereq_('./sequence/member/instance/filter');
            const scanl_1 = _dereq_('./sequence/member/instance/scanl');
            const foldr_1 = _dereq_('./sequence/member/instance/foldr');
            const group_1 = _dereq_('./sequence/member/instance/group');
            const inits_1 = _dereq_('./sequence/member/instance/inits');
            const tails_1 = _dereq_('./sequence/member/instance/tails');
            const segs_1 = _dereq_('./sequence/member/instance/segs');
            const subsequences_1 = _dereq_('./sequence/member/instance/subsequences');
            const permutations_1 = _dereq_('./sequence/member/instance/permutations');
            const compose_1 = _dereq_('../helper/compose');
            void compose_1.compose(core_1.Sequence, resume_1.default, from_1.default, cycle_1.default, random_1.default, concat_1.default, zip_1.default, difference_1.default, union_1.default, intersect_1.default, pure_1.default, return_1.default, sequence_1.default, mempty_1.default, mconcat_1.default, mappend_1.default, mzero_1.default, mplus_1.default, extract_1.default, iterate_1.default, memoize_1.default, reduce_1.default, take_1.default, drop_1.default, takeWhile_1.default, dropWhile_1.default, takeUntil_1.default, dropUntil_1.default, sort_1.default, unique_1.default, fmap_1.default, ap_1.default, bind_1.default, join_1.default, mapM_1.default, filterM_1.default, map_1.default, filter_1.default, scanl_1.default, foldr_1.default, group_1.default, inits_1.default, tails_1.default, segs_1.default, subsequences_1.default, permutations_1.default);
        },
        {
            '../helper/compose': 19,
            './sequence/core': 34,
            './sequence/member/instance/ap': 35,
            './sequence/member/instance/bind': 36,
            './sequence/member/instance/drop': 37,
            './sequence/member/instance/dropUntil': 38,
            './sequence/member/instance/dropWhile': 39,
            './sequence/member/instance/extract': 40,
            './sequence/member/instance/filter': 41,
            './sequence/member/instance/filterM': 42,
            './sequence/member/instance/fmap': 43,
            './sequence/member/instance/foldr': 44,
            './sequence/member/instance/group': 45,
            './sequence/member/instance/inits': 46,
            './sequence/member/instance/iterate': 47,
            './sequence/member/instance/join': 48,
            './sequence/member/instance/map': 49,
            './sequence/member/instance/mapM': 50,
            './sequence/member/instance/memoize': 51,
            './sequence/member/instance/permutations': 52,
            './sequence/member/instance/reduce': 53,
            './sequence/member/instance/scanl': 54,
            './sequence/member/instance/segs': 55,
            './sequence/member/instance/sort': 56,
            './sequence/member/instance/subsequences': 57,
            './sequence/member/instance/tails': 58,
            './sequence/member/instance/take': 59,
            './sequence/member/instance/takeUntil': 60,
            './sequence/member/instance/takeWhile': 61,
            './sequence/member/instance/unique': 62,
            './sequence/member/static/concat': 63,
            './sequence/member/static/cycle': 64,
            './sequence/member/static/difference': 65,
            './sequence/member/static/from': 66,
            './sequence/member/static/intersect': 67,
            './sequence/member/static/mappend': 68,
            './sequence/member/static/mconcat': 69,
            './sequence/member/static/mempty': 70,
            './sequence/member/static/mplus': 71,
            './sequence/member/static/mzero': 72,
            './sequence/member/static/pure': 73,
            './sequence/member/static/random': 74,
            './sequence/member/static/resume': 75,
            './sequence/member/static/return': 76,
            './sequence/member/static/sequence': 77,
            './sequence/member/static/union': 78,
            './sequence/member/static/zip': 79
        }
    ],
    34: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Sequence = void 0;
            const monadplus_1 = _dereq_('../monadplus');
            class Sequence extends monadplus_1.MonadPlus {
                constructor(cons) {
                    super(throwCallError);
                    this.cons = cons;
                }
                [Symbol.iterator]() {
                    let iter = () => this.iterate();
                    return {
                        next() {
                            const thunk = iter();
                            iter = Sequence.Thunk.iterator(thunk);
                            return {
                                done: !Sequence.isIterable(thunk),
                                value: Sequence.Thunk.value(thunk)
                            };
                        }
                    };
                }
            }
            exports.Sequence = Sequence;
            (function (Sequence) {
            }(Sequence = exports.Sequence || (exports.Sequence = {})));
            (function (Sequence) {
                let Data;
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
                let Thunk;
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
                let Iterator;
                (function (Iterator) {
                    Iterator.done = () => [
                        undefined,
                        Iterator.done,
                        -1
                    ];
                    function when(thunk, caseDone, caseIterable) {
                        return Sequence.isIterable(thunk) ? caseIterable(thunk, () => when(Thunk.iterator(thunk)(), caseDone, caseIterable)) : caseDone(thunk);
                    }
                    Iterator.when = when;
                }(Iterator = Sequence.Iterator || (Sequence.Iterator = {})));
                function isIterable(thunk) {
                    return Thunk.iterator(thunk) !== Iterator.done;
                }
                Sequence.isIterable = isIterable;
                let Exception;
                (function (Exception) {
                    function invalidConsError(args) {
                        console.error(args, args.length, args[0], args[1]);
                        return new TypeError(`Spica: Sequence: Invalid parameters of cons.`);
                    }
                    Exception.invalidConsError = invalidConsError;
                    function invalidDataError(data) {
                        console.error(data);
                        return new TypeError(`Spica: Sequence: Invalid data.`);
                    }
                    Exception.invalidDataError = invalidDataError;
                    function invalidThunkError(thunk) {
                        console.error(thunk);
                        return new TypeError(`Spica: Sequence: Invalid thunk.`);
                    }
                    Exception.invalidThunkError = invalidThunkError;
                }(Exception = Sequence.Exception || (Sequence.Exception = {})));
            }(Sequence = exports.Sequence || (exports.Sequence = {})));
            function throwCallError() {
                throw new Error(`Spica: Sequence: Invalid thunk call.`);
            }
        },
        { '../monadplus': 32 }
    ],
    35: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                ap(a) {
                    return core_1.Sequence.ap(this, a);
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    36: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                bind(f) {
                    return core_1.Sequence.concat(this.fmap(f));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    37: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                drop(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    38: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                dropUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    39: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                dropWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    40: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                extract() {
                    const acc = [];
                    let iter = () => this.iterate();
                    while (true) {
                        const thunk = iter();
                        if (!core_1.Sequence.isIterable(thunk))
                            return acc;
                        void acc.push(core_1.Sequence.Thunk.value(thunk));
                        iter = core_1.Sequence.Thunk.iterator(thunk);
                    }
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    41: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                filter(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur()));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    42: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                filterM(f) {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.from([[]]);
                        default: {
                                const x = xs.shift();
                                return f(x).bind(b => b ? xs.length === 0 ? core_1.Sequence.from([[x]]) : core_1.Sequence.from(xs).filterM(f).fmap(ys => [
                                    x,
                                    ...ys
                                ]) : xs.length === 0 ? core_1.Sequence.from([[]]) : core_1.Sequence.from(xs).filterM(f));
                            }
                        }
                    });
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    43: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                fmap(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    44: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                foldr(f, z) {
                    return new core_1.Sequence((iter = () => this.reduce().iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(z), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).foldr(f, z))))).bind(s => s);
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    45: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                group(f) {
                    return new core_1.Sequence(([iter, acc] = [
                        () => this.iterate(),
                        []
                    ], cons) => core_1.Sequence.Iterator.when(iter(), () => acc.length === 0 ? cons() : cons(acc), (thunk, recur) => acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (acc.push(core_1.Sequence.Thunk.value(thunk)), recur()) : cons(acc, [
                        core_1.Sequence.Thunk.iterator(thunk),
                        [core_1.Sequence.Thunk.value(thunk)]
                    ])));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    46: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                inits() {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), this.scanl((b, a) => [
                        ...b,
                        a
                    ], []).dropWhile(as => as.length === 0));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    47: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                iterate() {
                    return this.iterate_();
                }
                iterate_(z, i = 0) {
                    const data = this.cons(z, core_1.Sequence.Data.cons);
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
                            () => core_1.Sequence.Iterator.done(),
                            i
                        ];
                    case 2:
                        return [
                            data[0],
                            () => this.iterate_(data[1], i + 1),
                            i
                        ];
                    default:
                        throw core_1.Sequence.Exception.invalidDataError(data);
                    }
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    48: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                join() {
                    return core_1.Sequence.concat(this);
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    49: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                map(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    50: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                mapM(f) {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.mempty;
                        default: {
                                const x = xs.shift();
                                return f(x).bind(y => xs.length === 0 ? core_1.Sequence.from([[y]]) : core_1.Sequence.from(xs).mapM(f).fmap(ys => [
                                    y,
                                    ...ys
                                ]));
                            }
                        }
                    });
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    51: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const memories = new WeakMap();
            class default_1 extends core_1.Sequence {
                memoize() {
                    return new core_1.Sequence(([i, memo] = [
                        0,
                        memories.get(this) || memories.set(this, new Map()).get(this)
                    ], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [
                        i + 1,
                        memo
                    ])));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    52: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                permutations() {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        return xs.length === 0 ? core_1.Sequence.mempty : core_1.Sequence.from([xs]);
                    }).bind(xs => core_1.Sequence.mappend(core_1.Sequence.from([xs]), perms(core_1.Sequence.from(xs), core_1.Sequence.mempty)));
                }
            }
            exports.default = default_1;
            function perms(ts, is) {
                return core_1.Sequence.Iterator.when(ts.iterate(), () => core_1.Sequence.mempty, tt => new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(tt, () => cons(), tt => {
                    const t = core_1.Sequence.Thunk.value(tt);
                    const ts = core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(tt)).memoize();
                    return cons(is.permutations().foldr((ys, r) => interleave(core_1.Sequence.from(ys), r), perms(ts, core_1.Sequence.mappend(core_1.Sequence.from([t]), is))));
                    function interleave(xs, r) {
                        return interleave_(as => as, xs, r)[1];
                    }
                    function interleave_(f, ys, r) {
                        return core_1.Sequence.Iterator.when(ys.iterate(), () => [
                            ts,
                            r
                        ], yt => {
                            const y = core_1.Sequence.Thunk.value(yt);
                            const [us, zs] = interleave_(as => f(core_1.Sequence.mappend(core_1.Sequence.from([y]), as)), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(yt)), r);
                            return [
                                core_1.Sequence.mappend(core_1.Sequence.from([y]), us),
                                core_1.Sequence.mappend(core_1.Sequence.from([f(core_1.Sequence.mappend(core_1.Sequence.from([t]), core_1.Sequence.mappend(core_1.Sequence.from([y]), us))).extract()]), zs)
                            ];
                        });
                    }
                })).bind(xs => xs));
            }
        },
        { '../../core': 34 }
    ],
    53: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                reduce() {
                    return new core_1.Sequence(([i, memo] = [
                        0,
                        new Map()
                    ], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [
                        i + 1,
                        memo
                    ])));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    54: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                scanl(f, z) {
                    return new core_1.Sequence(([prev, iter, i] = [
                        z,
                        () => this.iterate(),
                        0
                    ]) => core_1.Sequence.Iterator.when(iter(), () => i === 0 ? core_1.Sequence.Data.cons(z) : core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(prev = f(prev, core_1.Sequence.Thunk.value(thunk)), [
                        prev,
                        core_1.Sequence.Thunk.iterator(thunk),
                        core_1.Sequence.Thunk.index(thunk) + 1
                    ])));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    55: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                segs() {
                    return core_1.Sequence.mappend(this.foldr((a, bs) => bs.take(1).bind(b => core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(c => [
                            a,
                            ...c
                        ]))]), bs)), core_1.Sequence.from([core_1.Sequence.from([])])).bind(a => a), core_1.Sequence.from([[]]));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    56: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                sort(cmp) {
                    return core_1.Sequence.from(this.extract().sort(cmp));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    57: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                subsequences() {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(() => nonEmptySubsequences(this)));
                }
            }
            exports.default = default_1;
            function nonEmptySubsequences(xs) {
                return core_1.Sequence.Iterator.when(xs.iterate(), () => core_1.Sequence.mempty, xt => core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(xt, () => cons(), xt => cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).foldr((ys, r) => core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([[
                        core_1.Sequence.Thunk.value(xt),
                        ...ys
                    ]])), r), core_1.Sequence.mempty)))).bind(xs => xs)));
            }
        },
        { '../../core': 34 }
    ],
    58: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                tails() {
                    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map((_, i, as) => as.slice(i))), core_1.Sequence.from([[]]));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    59: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                take(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), () => cons(), thunk => core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    60: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                takeUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    61: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                takeWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons()));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    62: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                unique() {
                    const memory = new Set();
                    return this.filter(a => !memory.has(a) && !!memory.add(a));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    63: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static concat(as) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => as.iterate(),
                        core_1.Sequence.Iterator.done
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => (bi = bi === core_1.Sequence.Iterator.done ? () => core_1.Sequence.Thunk.value(at).iterate() : bi, core_1.Sequence.Iterator.when(bi(), () => (bi = core_1.Sequence.Iterator.done, ar()), bt => cons(core_1.Sequence.Thunk.value(bt), [
                        () => at,
                        core_1.Sequence.Thunk.iterator(bt)
                    ])))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    64: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static cycle(as) {
                    return new core_1.Sequence(function cycle([iter, i] = [
                        as[Symbol.iterator](),
                        0
                    ], cons) {
                        const result = iter.next();
                        return result.done ? cycle([
                            as[Symbol.iterator](),
                            i + 1
                        ], cons) : cons(result.value, [
                            iter,
                            i + 1
                        ]);
                    }).reduce();
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    65: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static difference(a, b, cmp) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => a.iterate(),
                        () => b.iterate()
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [
                        core_1.Sequence.Iterator.done,
                        core_1.Sequence.Thunk.iterator(bt)
                    ])), (at, ar) => core_1.Sequence.Iterator.when(bi(), () => cons(core_1.Sequence.Thunk.value(at), [
                        core_1.Sequence.Thunk.iterator(at),
                        core_1.Sequence.Iterator.done
                    ]), bt => {
                        const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return cons(core_1.Sequence.Thunk.value(at), [
                                core_1.Sequence.Thunk.iterator(at),
                                () => bt
                            ]);
                        if (ord > 0)
                            return cons(core_1.Sequence.Thunk.value(bt), [
                                () => at,
                                core_1.Sequence.Thunk.iterator(bt)
                            ]);
                        return bi = () => core_1.Sequence.Thunk.iterator(bt)(), ar();
                    })));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    66: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static from(as) {
                    return new core_1.Sequence(([iter, i] = [
                        as[Symbol.iterator](),
                        0
                    ], cons) => {
                        const result = iter.next();
                        return result.done ? cons() : cons(result.value, [
                            iter,
                            i + 1
                        ]);
                    }).reduce();
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    67: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static intersect(a, b, cmp) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => a.iterate(),
                        () => b.iterate()
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => core_1.Sequence.Iterator.when(bi(), () => cons(), (bt, br) => {
                        const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return bi = () => bt, ar();
                        if (ord > 0)
                            return br();
                        return cons(core_1.Sequence.Thunk.value(at), [
                            core_1.Sequence.Thunk.iterator(at),
                            core_1.Sequence.Thunk.iterator(bt)
                        ]);
                    })));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    68: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static mappend(l, r) {
                    return core_1.Sequence.mconcat([
                        l,
                        r
                    ]);
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    69: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static mconcat(as) {
                    return [...as].reduce((a, b) => mconcat(a, b), core_1.Sequence.mempty);
                }
            }
            exports.default = default_1;
            function mconcat(a, b) {
                return new core_1.Sequence(([ai, bi] = [
                    () => a.iterate(),
                    () => b.iterate()
                ], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [
                    core_1.Sequence.Iterator.done,
                    core_1.Sequence.Thunk.iterator(bt)
                ])), at => cons(core_1.Sequence.Thunk.value(at), [
                    core_1.Sequence.Thunk.iterator(at),
                    bi
                ])));
            }
        },
        { '../../core': 34 }
    ],
    70: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            let default_1 = (() => {
                class default_1 extends core_1.Sequence {
                }
                default_1.mempty = new core_1.Sequence((_, cons) => cons());
                return default_1;
            })();
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    71: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            let default_1 = (() => {
                class default_1 extends core_1.Sequence {
                }
                default_1.mplus = core_1.Sequence.mappend;
                return default_1;
            })();
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    72: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            let default_1 = (() => {
                class default_1 extends core_1.Sequence {
                }
                default_1.mzero = core_1.Sequence.mempty;
                return default_1;
            })();
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    73: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static pure(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    74: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static random(p = () => Math.random()) {
                    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence((_, cons) => cons(p(), _))) : this.random().map(r => p[r * p.length | 0]);
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    75: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static resume(iterator) {
                    return new core_1.Sequence((iter = iterator, cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    76: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static Return(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    77: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static sequence(ms) {
                    return ms.reduce((acc, m) => acc.fmap(bs => core_1.Sequence.mappend(bs, m)), core_1.Sequence.Return(core_1.Sequence.from([])));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    78: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static union(a, b, cmp) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => a.iterate(),
                        () => b.iterate()
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [
                        core_1.Sequence.Iterator.done,
                        core_1.Sequence.Thunk.iterator(bt)
                    ])), at => core_1.Sequence.Iterator.when(bi(), () => cons(core_1.Sequence.Thunk.value(at), [
                        core_1.Sequence.Thunk.iterator(at),
                        core_1.Sequence.Iterator.done
                    ]), bt => {
                        const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return cons(core_1.Sequence.Thunk.value(at), [
                                core_1.Sequence.Thunk.iterator(at),
                                () => bt
                            ]);
                        if (ord > 0)
                            return cons(core_1.Sequence.Thunk.value(bt), [
                                () => at,
                                core_1.Sequence.Thunk.iterator(bt)
                            ]);
                        return cons(core_1.Sequence.Thunk.value(at), [
                            core_1.Sequence.Thunk.iterator(at),
                            core_1.Sequence.Thunk.iterator(bt)
                        ]);
                    })));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    79: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
                static zip(a, b) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => a.iterate(),
                        () => b.iterate()
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), at => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons([
                        core_1.Sequence.Thunk.value(at),
                        core_1.Sequence.Thunk.value(bt)
                    ], [
                        core_1.Sequence.Thunk.iterator(at),
                        core_1.Sequence.Thunk.iterator(bt)
                    ]))));
                }
            }
            exports.default = default_1;
        },
        { '../../core': 34 }
    ],
    80: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.noop = void 0;
            function noop() {
                return;
            }
            exports.noop = noop;
        },
        {}
    ],
    81: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Observation = void 0;
            const global_1 = _dereq_('./global');
            const assign_1 = _dereq_('./assign');
            const array_1 = _dereq_('./array');
            const exception_1 = _dereq_('./exception');
            class ListenerNode {
                constructor(parent, index) {
                    this.parent = parent;
                    this.index = index;
                    this.children = new global_1.Map();
                    this.childrenIndexes = [];
                    this.monitors = [];
                    this.subscribers = [];
                }
            }
            var ListenerType;
            (function (ListenerType) {
                ListenerType[ListenerType['Monitor'] = 0] = 'Monitor';
                ListenerType[ListenerType['Subscriber'] = 1] = 'Subscriber';
            }(ListenerType || (ListenerType = {})));
            var SeekMode;
            (function (SeekMode) {
                SeekMode[SeekMode['Extensible'] = 0] = 'Extensible';
                SeekMode[SeekMode['Breakable'] = 1] = 'Breakable';
                SeekMode[SeekMode['Closest'] = 2] = 'Closest';
            }(SeekMode || (SeekMode = {})));
            let id = 0;
            class Observation {
                constructor(opts = {}) {
                    this.node = new ListenerNode(void 0, void 0);
                    this.settings = {
                        limit: 10,
                        cleanup: false
                    };
                    this.unrelaies = new global_1.WeakMap();
                    void assign_1.extend(this.settings, opts);
                }
                monitor(namespace, monitor, {
                    once = false
                } = {}) {
                    if (typeof monitor !== 'function')
                        throw new global_1.Error(`Spica: Observation: Invalid listener: ${ monitor }`);
                    const {monitors} = this.seekNode(namespace, 0);
                    if (monitors.length === this.settings.limit)
                        throw new global_1.Error(`Spica: Observation: Exceeded max listener limit.`);
                    if (id === global_1.Number.MAX_SAFE_INTEGER)
                        throw new global_1.Error(`Spica: Observation: Max listener ID reached max safe integer.`);
                    const item = {
                        id: ++id,
                        type: 0,
                        namespace,
                        listener: monitor,
                        options: { once }
                    };
                    void monitors.push(item);
                    return () => void this.off(namespace, item);
                }
                on(namespace, subscriber, {
                    once = false
                } = {}) {
                    if (typeof subscriber !== 'function')
                        throw new global_1.Error(`Spica: Observation: Invalid listener: ${ subscriber }`);
                    const {subscribers} = this.seekNode(namespace, 0);
                    if (subscribers.length === this.settings.limit)
                        throw new global_1.Error(`Spica: Observation: Exceeded max listener limit.`);
                    if (id === global_1.Number.MAX_SAFE_INTEGER)
                        throw new global_1.Error(`Spica: Observation: Max listener ID reached max safe integer.`);
                    const item = {
                        id: ++id,
                        type: 1,
                        namespace,
                        listener: subscriber,
                        options: { once }
                    };
                    void subscribers.push(item);
                    return () => void this.off(namespace, item);
                }
                once(namespace, subscriber) {
                    return this.on(namespace, subscriber, { once: true });
                }
                off(namespace, subscriber) {
                    const node = this.seekNode(namespace, 1);
                    if (!node)
                        return;
                    switch (typeof subscriber) {
                    case 'object': {
                            const items = subscriber.type === 0 ? node.monitors : node.subscribers;
                            if (items.length === 0 || subscriber.id < items[0].id || subscriber.id > items[items.length - 1].id)
                                return;
                            return void remove(items, items.indexOf(subscriber));
                        }
                    case 'function': {
                            const items = node.subscribers;
                            return void remove(items, items.findIndex(item => item.listener === subscriber));
                        }
                    case 'undefined':
                        return void clear(node);
                    }
                }
                emit(namespace, data, tracker) {
                    void this.drain(namespace, data, tracker);
                }
                reflect(namespace, data) {
                    let results;
                    void this.emit(namespace, data, (_, r) => results = r);
                    return results;
                }
                relay(source) {
                    if (this.unrelaies.has(source))
                        return this.unrelaies.get(source);
                    const unbind = source.monitor([], (data, namespace) => void this.emit(namespace, data));
                    const unrelay = () => (void this.unrelaies.delete(source), void unbind());
                    void this.unrelaies.set(source, unrelay);
                    return unrelay;
                }
                refs(namespace) {
                    const node = this.seekNode(namespace, 1);
                    if (!node)
                        return [];
                    return array_1.push(this.refsBelow(node, 0), this.refsBelow(node, 1)).reduce((acc, rs) => array_1.push(acc, rs), []);
                }
                drain(namespace, data, tracker) {
                    const node = this.seekNode(namespace, 1);
                    const results = [];
                    const sss = node ? this.refsBelow(node, 1) : [];
                    for (let i = 0; i < sss.length; ++i) {
                        const items = sss[i];
                        if (items.length === 0)
                            continue;
                        for (let i = 0, max = items[items.length - 1].id; i < items.length && items[i].id <= max; ++i) {
                            const item = items[i];
                            if (item.options.once) {
                                void this.off(item.namespace, item);
                            }
                            try {
                                const result = item.listener(data, namespace);
                                tracker && void results.push(result);
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                            }
                            i = i < items.length ? i : items.length - 1;
                            for (; i >= 0; --i) {
                                if (items[i].id <= item.id)
                                    break;
                            }
                        }
                    }
                    const mss = this.refsAbove(node || this.seekNode(namespace, 2), 0);
                    for (let i = 0; i < mss.length; ++i) {
                        const items = mss[i];
                        if (items.length === 0)
                            continue;
                        for (let i = 0, max = items[items.length - 1].id; i < items.length && items[i].id <= max; ++i) {
                            const item = items[i];
                            if (item.options.once) {
                                void this.off(item.namespace, item);
                            }
                            try {
                                void item.listener(data, namespace);
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                            }
                            i = i < items.length ? i : items.length - 1;
                            for (; i >= 0; --i) {
                                if (items[i].id <= item.id)
                                    break;
                            }
                        }
                    }
                    if (tracker) {
                        try {
                            void tracker(data, results);
                        } catch (reason) {
                            void exception_1.causeAsyncException(reason);
                        }
                    }
                }
                refsAbove({parent, monitors, subscribers}, type) {
                    const acc = type === 0 ? [monitors] : [subscribers];
                    while (parent) {
                        type === 0 ? void acc.push(parent.monitors) : void acc.push(parent.subscribers);
                        parent = parent.parent;
                    }
                    return acc;
                }
                refsBelow(node, type) {
                    return this.refsBelow_(node, type, [])[0];
                }
                refsBelow_({monitors, subscribers, childrenIndexes, children}, type, acc) {
                    type === 0 ? void acc.push(monitors) : void acc.push(subscribers);
                    let count = 0;
                    for (let i = 0; i < childrenIndexes.length; ++i) {
                        const index = childrenIndexes[i];
                        const cnt = this.refsBelow_(children.get(index), type, acc)[1];
                        count += cnt;
                        if (cnt === 0 && this.settings.cleanup) {
                            void children.delete(index);
                            void remove(childrenIndexes, i);
                            void --i;
                        }
                    }
                    return [
                        acc,
                        monitors.length + subscribers.length + count
                    ];
                }
                seekNode(namespace, mode) {
                    let node = this.node;
                    for (let i = 0; i < namespace.length; ++i) {
                        const index = namespace[i];
                        const {childrenIndexes, children} = node;
                        let child = children.get(index);
                        if (!child) {
                            switch (mode) {
                            case 1:
                                return;
                            case 2:
                                return node;
                            }
                            child = new ListenerNode(node, index);
                            void childrenIndexes.push(index);
                            void children.set(index, child);
                        }
                        node = child;
                    }
                    return node;
                }
            }
            exports.Observation = Observation;
            function remove(target, index) {
                switch (index) {
                case -1:
                    return;
                case 0:
                    return void target.shift();
                case target.length - 1:
                    return void target.pop();
                default:
                    return void target.splice(index, 1);
                }
            }
            function clear({monitors, subscribers, childrenIndexes, children}) {
                for (let i = 0; i < childrenIndexes.length; ++i) {
                    if (!clear(children.get(childrenIndexes[i])))
                        continue;
                    void children.delete(childrenIndexes[i]);
                    void remove(childrenIndexes, i);
                    void --i;
                }
                if (subscribers.length > 0) {
                    subscribers.length = 0;
                }
                return monitors.length === 0;
            }
        },
        {
            './array': 5,
            './assign': 6,
            './exception': 15,
            './global': 18
        }
    ],
    82: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isPromiseLike = exports.AtomicPromise = void 0;
            const global_1 = _dereq_('./global');
            var State;
            (function (State) {
                State[State['pending'] = 0] = 'pending';
                State[State['resolved'] = 1] = 'resolved';
                State[State['fulfilled'] = 2] = 'fulfilled';
                State[State['rejected'] = 3] = 'rejected';
            }(State || (State = {})));
            class Internal {
                constructor() {
                    this.status = { state: 0 };
                    this.fulfillReactions = [];
                    this.rejectReactions = [];
                    this.isHandled = false;
                }
            }
            const internal = Symbol.for('spica/promise::internal');
            class AtomicPromise {
                constructor(executor) {
                    this[Symbol.toStringTag] = 'Promise';
                    this[_a] = new Internal();
                    const intl = internal;
                    try {
                        const internal = this[intl];
                        void executor(value => {
                            if (internal.status.state !== 0)
                                return;
                            if (isPromiseLike(value)) {
                                internal.status = {
                                    state: 1,
                                    result: value
                                };
                                void value.then(value => {
                                    internal.status = {
                                        state: 2,
                                        result: value
                                    };
                                    void resume(internal);
                                }, reason => {
                                    internal.status = {
                                        state: 3,
                                        result: reason
                                    };
                                    void resume(internal);
                                });
                            } else {
                                internal.status = {
                                    state: 2,
                                    result: value
                                };
                                void resume(internal);
                            }
                        }, reason => {
                            if (internal.status.state !== 0)
                                return;
                            internal.status = {
                                state: 3,
                                result: reason
                            };
                            void resume(internal);
                        });
                    } catch (reason) {
                        const internal = this[intl];
                        if (internal.status.state !== 0)
                            return;
                        internal.status = {
                            state: 3,
                            result: reason
                        };
                        void resume(internal);
                    }
                }
                static get [Symbol.species]() {
                    return AtomicPromise;
                }
                static all(vs) {
                    return new AtomicPromise((resolve, reject) => {
                        const values = [...vs];
                        const length = values.length;
                        const acc = global_1.Array(length);
                        let cnt = 0;
                        for (let i = 0; i < length; ++i) {
                            const value = values[i];
                            if (isPromiseLike(value)) {
                                void value.then(value => {
                                    acc[i] = value;
                                    void ++cnt;
                                    cnt === length && void resolve(acc);
                                }, reason => {
                                    i = length;
                                    void reject(reason);
                                });
                            } else {
                                acc[i] = value;
                                void ++cnt;
                            }
                        }
                        cnt === length && void resolve(acc);
                    });
                }
                static race(values) {
                    return new AtomicPromise((resolve, reject) => {
                        let done = false;
                        for (const value of values) {
                            if (done)
                                break;
                            if (isPromiseLike(value)) {
                                void value.then(value => {
                                    done = true;
                                    void resolve(value);
                                }, reason => {
                                    done = true;
                                    void reject(reason);
                                });
                            } else {
                                done = true;
                                void resolve(value);
                            }
                        }
                    });
                }
                static resolve(value) {
                    return new AtomicPromise(resolve => void resolve(value));
                }
                static reject(reason) {
                    return new AtomicPromise((_, reject) => void reject(reason));
                }
                then(onfulfilled, onrejected) {
                    return new AtomicPromise((resolve, reject) => {
                        const {fulfillReactions, rejectReactions, status} = this[internal];
                        if (status.state !== 3) {
                            void fulfillReactions.push(value => {
                                if (!onfulfilled)
                                    return void resolve(value);
                                try {
                                    void resolve(onfulfilled(value));
                                } catch (reason) {
                                    void reject(reason);
                                }
                            });
                        }
                        if (status.state !== 2) {
                            void rejectReactions.push(reason => {
                                if (!onrejected)
                                    return void reject(reason);
                                try {
                                    void resolve(onrejected(reason));
                                } catch (reason) {
                                    void reject(reason);
                                }
                            });
                        }
                        void resume(this[internal]);
                    });
                }
                catch(onrejected) {
                    return this.then(void 0, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicPromise = AtomicPromise;
            _a = internal;
            function isPromiseLike(value) {
                return value !== null && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
            }
            exports.isPromiseLike = isPromiseLike;
            function resume(internal) {
                const {status, fulfillReactions, rejectReactions} = internal;
                switch (status.state) {
                case 0:
                case 1:
                    return;
                case 2:
                    if (!internal.isHandled && rejectReactions.length > 0) {
                        rejectReactions.length = 0;
                    }
                    if (fulfillReactions.length === 0)
                        return;
                    internal.isHandled = true;
                    void consume(fulfillReactions, status.result);
                    return;
                case 3:
                    if (!internal.isHandled && fulfillReactions.length > 0) {
                        fulfillReactions.length = 0;
                    }
                    if (rejectReactions.length === 0)
                        return;
                    internal.isHandled = true;
                    void consume(rejectReactions, status.result);
                    return;
                }
            }
            function consume(fs, a) {
                while (fs.length > 0) {
                    void fs.shift()(a);
                }
            }
        },
        { './global': 18 }
    ],
    83: [
        function (_dereq_, module, exports) {
            'use strict';
            var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function () {
                        return m[k];
                    }
                });
            } : function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                o[k2] = m[k];
            });
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/sequence'), exports);
        },
        { './monad/sequence': 33 }
    ],
    84: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.sqid = void 0;
            const zeros = '0'.repeat(15);
            let cnt = 0;
            function sqid(id) {
                if (arguments.length > 0) {
                    if (typeof id !== 'number')
                        throw new TypeError(`Spica: sqid: A parameter value must be a number: ${ id }`);
                    if (id >= 0 === false)
                        throw new TypeError(`Spica: sqid: A parameter value must be a positive number: ${ id }`);
                    if (id % 1 !== 0)
                        throw new TypeError(`Spica: sqid: A parameter value must be an integer: ${ id }`);
                }
                return id === void 0 ? (zeros + ++cnt).slice(-15) : (zeros + id).slice(-15);
            }
            exports.sqid = sqid;
        },
        {}
    ],
    85: [
        function (_dereq_, module, exports) {
            'use strict';
            var __await = this && this.__await || function (v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            };
            var __asyncGenerator = this && this.__asyncGenerator || function (thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError('Symbol.asyncIterator is not defined.');
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb('next'), verb('throw'), verb('return'), i[Symbol.asyncIterator] = function () {
                    return this;
                }, i;
                function verb(n) {
                    if (g[n])
                        i[n] = function (v) {
                            return new Promise(function (a, b) {
                                q.push([
                                    n,
                                    v,
                                    a,
                                    b
                                ]) > 1 || resume(n, v);
                            });
                        };
                }
                function resume(n, v) {
                    try {
                        step(g[n](v));
                    } catch (e) {
                        settle(q[0][3], e);
                    }
                }
                function step(r) {
                    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
                }
                function fulfill(value) {
                    resume('next', value);
                }
                function reject(value) {
                    resume('throw', value);
                }
                function settle(f, v) {
                    if (f(v), q.shift(), q.length)
                        resume(q[0][0], q[0][1]);
                }
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Supervisor = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const coroutine_1 = _dereq_('./coroutine');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const observation_1 = _dereq_('./observation');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const sqid_1 = _dereq_('./sqid');
            const exception_1 = _dereq_('./exception');
            let Supervisor = (() => {
                var _a;
                class Supervisor extends coroutine_1.Coroutine {
                    constructor(opts = {}) {
                        super(function () {
                            return __asyncGenerator(this, arguments, function* () {
                                return yield __await(this.state);
                            });
                        });
                        this.state = new future_1.AtomicFuture();
                        this.id = sqid_1.sqid();
                        this.settings = {
                            name: '',
                            size: global_1.Infinity,
                            timeout: global_1.Infinity,
                            destructor: _ => void 0,
                            scheduler: clock_1.tick,
                            resource: 10
                        };
                        this.events_ = {
                            init: new observation_1.Observation(),
                            loss: new observation_1.Observation(),
                            exit: new observation_1.Observation()
                        };
                        this.events = this.events_;
                        this.workers = new global_1.Map();
                        this.alive = true;
                        this.available = true;
                        this[_a] = {
                            recv: () => {
                                throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot use coroutine port.`);
                            },
                            send: () => {
                                throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot use coroutine port.`);
                            },
                            connect: () => {
                                throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot use coroutine port.`);
                            }
                        };
                        this.scheduled = false;
                        this.messages = [];
                        void this[coroutine_1.Coroutine.init]();
                        void assign_1.extend(this.settings, opts);
                        this.name = this.settings.name;
                        if (this.constructor === Supervisor)
                            throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot instantiate abstract classes.`);
                        void this.constructor.instances.add(this);
                    }
                    static get instances() {
                        return this.hasOwnProperty('instances_') ? this.instances_ : this.instances_ = new global_1.Set();
                    }
                    static get count() {
                        return this.instances.size;
                    }
                    static get procs() {
                        return [...this.instances].reduce((acc, sv) => acc + sv.workers.size, 0);
                    }
                    static clear(reason) {
                        while (this.instances.size > 0) {
                            for (const sv of this.instances) {
                                void sv.terminate(reason);
                            }
                        }
                    }
                    destructor(reason) {
                        this.available = false;
                        void this.clear(reason);
                        void alias_1.ObjectFreeze(this.workers);
                        while (this.messages.length > 0) {
                            const [names, param] = this.messages.shift();
                            const name = typeof names === 'string' ? names : names[Symbol.iterator]().next().value;
                            void this.events_.loss.emit([name], [
                                name,
                                param
                            ]);
                        }
                        this.alive = false;
                        void this.constructor.instances.delete(this);
                        void alias_1.ObjectFreeze(this);
                        void this.settings.destructor(reason);
                        void this.state.bind(reason === void 0 ? void 0 : promise_1.AtomicPromise.reject(reason));
                    }
                    throwErrorIfNotAvailable() {
                        if (!this.available)
                            throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A supervisor is already terminated.`);
                    }
                    register(name, process, state) {
                        state = state;
                        void this.throwErrorIfNotAvailable();
                        if (coroutine_1.isCoroutine(process)) {
                            const proc = {
                                init: state => state,
                                main: (param, state, kill) => process[process.constructor.port].send(param).then(({
                                    value: reply,
                                    done
                                }) => done && void kill() || [
                                    reply,
                                    state
                                ]),
                                exit: reason => void process[process.constructor.terminate](reason)
                            };
                            void this.constructor.standalone.add(proc);
                            const kill = this.register(name, proc, state);
                            void process.catch(kill);
                            return kill;
                        }
                        if (isAsyncGeneratorFunction(process)) {
                            let iter;
                            return this.register(name, {
                                init: (state, kill) => (iter = process(state, kill), void iter.next().catch(kill), state),
                                main: (param, state, kill) => promise_1.AtomicPromise.resolve(iter.next(param)).then(({
                                    value: reply,
                                    done
                                }) => done && void kill() || [
                                    reply,
                                    state
                                ]),
                                exit: () => void 0
                            }, state);
                        }
                        if (typeof process === 'function') {
                            if (isGeneratorFunction(process)) {
                                let iter;
                                return this.register(name, {
                                    init: (state, kill) => (iter = process(state, kill), void iter.next(), state),
                                    main: (param, state, kill) => {
                                        const {
                                            value: reply,
                                            done
                                        } = iter.next(param);
                                        done && kill();
                                        return [
                                            reply,
                                            state
                                        ];
                                    },
                                    exit: () => void 0
                                }, state);
                            }
                            return this.register(name, {
                                init: state => state,
                                main: process,
                                exit: () => void 0
                            }, state);
                        }
                        if (this.workers.has(name))
                            throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }/${ name }>: Cannot register a process multiply with the same name.`);
                        void this.schedule();
                        const worker = new Worker(name, process, state, this, () => void this.schedule(), this.constructor.standalone.has(process), this.events_, () => this.workers.get(name) === worker && void this.workers.delete(name));
                        void this.workers.set(name, worker);
                        return worker.terminate;
                        function isAsyncGeneratorFunction(process) {
                            return process[Symbol.toStringTag] === 'AsyncGeneratorFunction';
                        }
                        function isGeneratorFunction(process) {
                            return process[Symbol.toStringTag] === 'GeneratorFunction';
                        }
                    }
                    call(name, param, callback = this.settings.timeout, timeout = this.settings.timeout) {
                        if (typeof callback !== 'function')
                            return new promise_1.AtomicPromise((resolve, reject) => void this.call(name, param, (result, err) => err ? reject(err) : resolve(result), callback));
                        void this.messages.push([
                            typeof name === 'string' ? name : new NamePool(this.workers, name),
                            param,
                            callback,
                            Date.now() + timeout
                        ]);
                        while (this.messages.length > (this.available ? this.settings.size : 0)) {
                            const [names, param, callback] = this.messages.shift();
                            const name = typeof names === 'string' ? names : names[Symbol.iterator]().next().value;
                            void this.events_.loss.emit([name], [
                                name,
                                param
                            ]);
                            try {
                                void callback(void 0, new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A message overflowed.`));
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                            }
                        }
                        void this.throwErrorIfNotAvailable();
                        void this.schedule();
                        if (timeout > 0 && timeout !== global_1.Infinity) {
                            void global_1.setTimeout(() => void this.schedule(), timeout + 3);
                        }
                    }
                    cast(name, param, timeout = this.settings.timeout) {
                        var _b;
                        void this.throwErrorIfNotAvailable();
                        let result;
                        for (name of typeof name === 'string' ? [name] : new NamePool(this.workers, name)) {
                            if (result = (_b = this.workers.get(name)) === null || _b === void 0 ? void 0 : _b.call([
                                    param,
                                    Date.now() + timeout
                                ]))
                                break;
                        }
                        name = name;
                        if (result)
                            return true;
                        void this.events_.loss.emit([name], [
                            name,
                            param
                        ]);
                        return false;
                    }
                    refs(name) {
                        return name === void 0 ? [...this.workers.values()].map(convert) : this.workers.has(name) ? [convert(this.workers.get(name))] : [];
                        function convert(worker) {
                            return [
                                worker.name,
                                worker.process,
                                worker.state,
                                worker.terminate
                            ];
                        }
                    }
                    kill(name, reason) {
                        if (!this.available)
                            return false;
                        return this.workers.has(name) ? this.workers.get(name).terminate(reason) : false;
                    }
                    clear(reason) {
                        while (this.workers.size > 0) {
                            for (const worker of this.workers.values()) {
                                void worker.terminate(reason);
                            }
                        }
                    }
                    terminate(reason) {
                        if (!this.available)
                            return false;
                        void this.destructor(reason);
                        void this[coroutine_1.Coroutine.exit](void 0);
                        return true;
                    }
                    [coroutine_1.Coroutine.terminate](reason) {
                        void this.terminate(reason);
                    }
                    schedule() {
                        if (!this.available || this.scheduled || this.messages.length === 0)
                            return;
                        const p = new future_1.AtomicFuture(false);
                        void p.finally(() => {
                            this.scheduled = false;
                            void this.deliver();
                        });
                        void clock_1.tick(() => {
                            void this.settings.scheduler.call(void 0, p.bind);
                            this.settings.scheduler === requestAnimationFrame && void global_1.setTimeout(p.bind, 1000);
                        });
                        this.scheduled = true;
                    }
                    deliver() {
                        var _b;
                        if (!this.available)
                            return;
                        const since = Date.now();
                        for (let i = 0, len = this.messages.length; this.available && i < len; ++i) {
                            if (this.settings.resource - (Date.now() - since) <= 0)
                                return void this.schedule();
                            const [names, param, callback, expiry] = this.messages[i];
                            let result;
                            let name;
                            for (name of typeof names === 'string' ? [names] : names) {
                                if (result = (_b = this.workers.get(name)) === null || _b === void 0 ? void 0 : _b.call([
                                        param,
                                        expiry
                                    ]))
                                    break;
                            }
                            if (result === void 0 && Date.now() < expiry)
                                continue;
                            i === 0 ? void this.messages.shift() : void this.messages.splice(i, 1);
                            void --i;
                            void --len;
                            if (result === void 0) {
                                void this.events_.loss.emit([name], [
                                    name,
                                    param
                                ]);
                                try {
                                    void callback(void 0, new global_1.Error(`Spica: Supervisor: A process has failed.`));
                                } catch (reason) {
                                    void exception_1.causeAsyncException(reason);
                                }
                            } else {
                                void result.then(reply => void callback(reply), () => void callback(void 0, new global_1.Error(`Spica: Supervisor: A process has failed.`)));
                            }
                        }
                    }
                }
                _a = coroutine_1.Coroutine.port;
                Supervisor.standalone = new global_1.WeakSet();
                return Supervisor;
            })();
            exports.Supervisor = Supervisor;
            class NamePool {
                constructor(workers, selector = ns => ns) {
                    this.workers = workers;
                    this.selector = selector;
                }
                *[Symbol.iterator]() {
                    let cnt = 0;
                    for (const name of this.selector(this.workers.keys())) {
                        void ++cnt;
                        yield name;
                    }
                    if (cnt === 0) {
                        yield '';
                    }
                    return;
                }
            }
            class Worker {
                constructor(name, process, state, sv, schedule, initiated, events, destructor_) {
                    this.name = name;
                    this.process = process;
                    this.state = state;
                    this.sv = sv;
                    this.schedule = schedule;
                    this.events = events;
                    this.destructor_ = destructor_;
                    this.alive = true;
                    this.available = true;
                    this.initiated = false;
                    this.terminate = reason => {
                        if (!this.alive)
                            return false;
                        void this.destructor(reason);
                        return true;
                    };
                    initiated && void this.init();
                }
                destructor(reason) {
                    this.alive = false;
                    this.available = false;
                    void alias_1.ObjectFreeze(this);
                    try {
                        void this.destructor_();
                    } catch (reason) {
                        void exception_1.causeAsyncException(reason);
                    }
                    if (this.initiated) {
                        void this.exit(reason);
                    }
                }
                init() {
                    this.initiated = true;
                    void this.events.init.emit([this.name], [
                        this.name,
                        this.process,
                        this.state
                    ]);
                    this.state = this.process.init(this.state, this.terminate);
                }
                exit(reason) {
                    try {
                        void this.process.exit(reason, this.state);
                        void this.events.exit.emit([this.name], [
                            this.name,
                            this.process,
                            this.state,
                            reason
                        ]);
                    } catch (reason_) {
                        void this.events.exit.emit([this.name], [
                            this.name,
                            this.process,
                            this.state,
                            reason
                        ]);
                        void this.sv.terminate(reason_);
                    }
                }
                call([param, expiry]) {
                    const now = Date.now();
                    if (!this.available || now > expiry)
                        return;
                    return new promise_1.AtomicPromise((resolve, reject) => {
                        alias_1.isFinite(expiry) && void global_1.setTimeout(() => void reject(new global_1.Error()), expiry - now);
                        this.available = false;
                        if (!this.initiated) {
                            void this.init();
                            if (!this.alive)
                                return void reject();
                        }
                        void promise_1.AtomicPromise.resolve(this.process.main(param, this.state, this.terminate)).then(resolve, reject);
                    }).then(([reply, state]) => {
                        if (this.alive) {
                            void this.schedule();
                            this.state = state;
                            this.available = true;
                        }
                        return reply;
                    }).catch(reason => {
                        void this.schedule();
                        void this.terminate(reason);
                        throw reason;
                    });
                }
            }
        },
        {
            './alias': 4,
            './assign': 6,
            './clock': 10,
            './coroutine': 12,
            './exception': 15,
            './future': 17,
            './global': 18,
            './observation': 81,
            './promise': 82,
            './sqid': 84
        }
    ],
    86: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.debounce = exports.throttle = void 0;
            const list_1 = _dereq_('./list');
            const global_1 = _dereq_('./global');
            function throttle(interval, callback) {
                let timer = 0;
                let buffer = list_1.MList();
                return arg => {
                    buffer.prepend(arg);
                    if (timer > 0)
                        return;
                    timer = global_1.setTimeout(() => {
                        timer = 0;
                        const buf = [
                            buffer,
                            buffer = list_1.MList()
                        ][0];
                        void callback(buf.head, buf);
                    }, interval);
                };
            }
            exports.throttle = throttle;
            function debounce(delay, callback) {
                let timer = 0;
                let buffer = list_1.MList();
                return arg => {
                    buffer.prepend(arg);
                    if (timer > 0)
                        return;
                    timer = global_1.setTimeout(() => {
                        timer = 0;
                        void global_1.setTimeout(() => {
                            if (timer > 0)
                                return;
                            const buf = [
                                buffer,
                                buffer = list_1.MList()
                            ][0];
                            void callback(buf.head, buf);
                        }, buffer.length > 1 ? delay : 0);
                    }, delay);
                };
            }
            exports.debounce = debounce;
        },
        {
            './global': 18,
            './list': 21
        }
    ],
    87: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.tuple = void 0;
            function tuple(as) {
                return as;
            }
            exports.tuple = tuple;
        },
        {}
    ],
    88: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isPrimitive = exports.isType = exports.type = void 0;
            const toString = Object.prototype.toString.call.bind(Object.prototype.toString);
            function type(value) {
                const t = value == null ? value : typeof value;
                switch (t) {
                case undefined:
                case null:
                    return `${ value }`;
                case 'boolean':
                case 'number':
                case 'bigint':
                case 'string':
                case 'symbol':
                    return t;
                default:
                    return toString(value).slice(8, -1);
                }
            }
            exports.type = type;
            function isType(value, name) {
                switch (name) {
                case 'function':
                    return typeof value === 'function';
                case 'object':
                    return value !== null && typeof value === 'object';
                default:
                    return type(value) === name;
                }
            }
            exports.isType = isType;
            function isPrimitive(value) {
                switch (typeof value) {
                case 'undefined':
                case 'boolean':
                case 'number':
                case 'bigint':
                case 'string':
                case 'symbol':
                    return true;
                default:
                    return value === null;
                }
            }
            exports.isPrimitive = isPrimitive;
        },
        {}
    ],
    89: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uncurry = void 0;
            exports.uncurry = f => (...args) => args.reduce((f, arg) => f(arg), f);
        },
        {}
    ],
    90: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.URL = void 0;
            const global_1 = _dereq_('./global');
            const format_1 = _dereq_('./url/domain/format');
            var format_2 = _dereq_('./url/domain/format');
            Object.defineProperty(exports, 'standardize', {
                enumerable: true,
                get: function () {
                    return format_2.standardize;
                }
            });
            class URL {
                constructor(url, base = global_1.location.href) {
                    this.url = format_1.newURL(url, base);
                }
                get reference() {
                    var _a;
                    return this.reference_ = (_a = this.reference_) !== null && _a !== void 0 ? _a : this.url.href;
                }
                get resource() {
                    return this.resource_ = this.resource_ === void 0 ? this.reference.slice(0, this.query === '?' ? this.fragment ? -this.fragment.length - 1 : -1 : -this.fragment.length || this.reference.length) : this.resource_;
                }
                get origin() {
                    var _a;
                    return this.origin_ = (_a = this.origin_) !== null && _a !== void 0 ? _a : this.url.origin;
                }
                get scheme() {
                    var _a;
                    return this.scheme_ = (_a = this.scheme_) !== null && _a !== void 0 ? _a : this.url.protocol.slice(0, -1);
                }
                get protocol() {
                    var _a;
                    return this.protocol_ = (_a = this.protocol_) !== null && _a !== void 0 ? _a : this.reference.slice(0, this.reference.indexOf(':') + 1);
                }
                get host() {
                    var _a;
                    return this.host_ = (_a = this.host_) !== null && _a !== void 0 ? _a : this.url.host;
                }
                get hostname() {
                    var _a;
                    return this.hostname_ = (_a = this.hostname_) !== null && _a !== void 0 ? _a : this.url.hostname;
                }
                get port() {
                    var _a;
                    return this.port_ = (_a = this.port_) !== null && _a !== void 0 ? _a : this.url.port;
                }
                get path() {
                    var _a;
                    return this.path_ = (_a = this.path_) !== null && _a !== void 0 ? _a : `${ this.pathname }${ this.query }`;
                }
                get pathname() {
                    var _a;
                    return this.pathname_ = (_a = this.pathname_) !== null && _a !== void 0 ? _a : this.url.pathname;
                }
                get query() {
                    return this.query_ = this.query_ === void 0 ? this.reference.slice(~(~this.reference.slice(0, -this.fragment.length || this.reference.length).indexOf('?') || ~this.reference.length), -this.fragment.length || this.reference.length) : this.query_;
                }
                get fragment() {
                    return this.fragment_ = this.fragment_ === void 0 ? this.reference.slice(~(~this.reference.indexOf('#') || ~this.reference.length)) : this.fragment_;
                }
            }
            exports.URL = URL;
        },
        {
            './global': 18,
            './url/domain/format': 91
        }
    ],
    91: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.newURL = exports._encode = exports.standardize = void 0;
            const global_1 = _dereq_('../../global');
            const memoize_1 = _dereq_('../../memoize');
            const cache_1 = _dereq_('../../cache');
            const flip_1 = _dereq_('../../flip');
            const uncurry_1 = _dereq_('../../uncurry');
            var Identifier;
            (function (Identifier) {
            }(Identifier || (Identifier = {})));
            function standardize(url, base = global_1.location.href) {
                return encode(normalize(url, base));
            }
            exports.standardize = standardize;
            function encode(url) {
                return url.trim().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '').replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, encodeURI).replace(/\?[^#]+/, query => '?' + query.slice(1).replace(/%[0-9A-F]{2}|[^=&]/ig, str => str.length < 3 ? encodeURIComponent(str) : str)).replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')).trim());
            }
            exports._encode = encode;
            function normalize(url, base) {
                return exports.newURL(url, base).href;
            }
            exports.newURL = flip_1.flip(uncurry_1.uncurry(memoize_1.memoize(base => memoize_1.memoize(url => new global_1.global.URL(formatURLForEdge(url, base), base), new cache_1.Cache(9)), new cache_1.Cache(9))));
            function formatURLForEdge(url, base) {
                return url.trim() || base;
            }
        },
        {
            '../../cache': 7,
            '../../flip': 16,
            '../../global': 18,
            '../../memoize': 23,
            '../../uncurry': 89
        }
    ],
    92: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uuid = void 0;
            const FORMAT_V4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            const {random} = Math;
            function uuid() {
                let acc = '';
                for (let i = 0; i < FORMAT_V4.length; ++i) {
                    const c = FORMAT_V4[i];
                    if (c === 'x' || c === 'y') {
                        const r = random() * 16 | 0;
                        const v = c == 'x' ? r : r & 3 | 8;
                        acc += v.toString(16);
                    } else {
                        acc += c;
                    }
                }
                return acc;
            }
            exports.uuid = uuid;
        },
        {}
    ],
    93: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            _dereq_('spica/global');
            var builder_1 = _dereq_('./src/dom/builder');
            Object.defineProperty(exports, 'Shadow', {
                enumerable: true,
                get: function () {
                    return builder_1.Shadow;
                }
            });
            Object.defineProperty(exports, 'HTML', {
                enumerable: true,
                get: function () {
                    return builder_1.HTML;
                }
            });
            Object.defineProperty(exports, 'SVG', {
                enumerable: true,
                get: function () {
                    return builder_1.SVG;
                }
            });
            Object.defineProperty(exports, 'API', {
                enumerable: true,
                get: function () {
                    return builder_1.API;
                }
            });
            var proxy_1 = _dereq_('./src/dom/proxy');
            Object.defineProperty(exports, 'proxy', {
                enumerable: true,
                get: function () {
                    return proxy_1.proxy;
                }
            });
            var dom_1 = _dereq_('./src/util/dom');
            Object.defineProperty(exports, 'frag', {
                enumerable: true,
                get: function () {
                    return dom_1.frag;
                }
            });
            Object.defineProperty(exports, 'shadow', {
                enumerable: true,
                get: function () {
                    return dom_1.shadow;
                }
            });
            Object.defineProperty(exports, 'html', {
                enumerable: true,
                get: function () {
                    return dom_1.html;
                }
            });
            Object.defineProperty(exports, 'svg', {
                enumerable: true,
                get: function () {
                    return dom_1.svg;
                }
            });
            Object.defineProperty(exports, 'text', {
                enumerable: true,
                get: function () {
                    return dom_1.text;
                }
            });
            Object.defineProperty(exports, 'element', {
                enumerable: true,
                get: function () {
                    return dom_1.element;
                }
            });
            Object.defineProperty(exports, 'define', {
                enumerable: true,
                get: function () {
                    return dom_1.define;
                }
            });
            var listener_1 = _dereq_('./src/util/listener');
            Object.defineProperty(exports, 'listen', {
                enumerable: true,
                get: function () {
                    return listener_1.listen;
                }
            });
            Object.defineProperty(exports, 'once', {
                enumerable: true,
                get: function () {
                    return listener_1.once;
                }
            });
            Object.defineProperty(exports, 'wait', {
                enumerable: true,
                get: function () {
                    return listener_1.wait;
                }
            });
            Object.defineProperty(exports, 'delegate', {
                enumerable: true,
                get: function () {
                    return listener_1.delegate;
                }
            });
            Object.defineProperty(exports, 'bind', {
                enumerable: true,
                get: function () {
                    return listener_1.bind;
                }
            });
            Object.defineProperty(exports, 'currentTarget', {
                enumerable: true,
                get: function () {
                    return listener_1.currentTarget;
                }
            });
            var query_1 = _dereq_('./src/util/query');
            Object.defineProperty(exports, 'apply', {
                enumerable: true,
                get: function () {
                    return query_1.apply;
                }
            });
        },
        {
            './src/dom/builder': 94,
            './src/dom/proxy': 96,
            './src/util/dom': 97,
            './src/util/listener': 98,
            './src/util/query': 99,
            'spica/global': 18
        }
    ],
    94: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SVG = exports.HTML = exports.Shadow = exports.API = void 0;
            const alias_1 = _dereq_('spica/alias');
            const proxy_1 = _dereq_('./proxy');
            const dom_1 = _dereq_('../util/dom');
            function API(baseFactory, formatter = el => el) {
                return new Proxy(() => void 0, handle(baseFactory, formatter));
            }
            exports.API = API;
            exports.Shadow = API(dom_1.html, dom_1.shadow);
            exports.HTML = API(dom_1.html);
            exports.SVG = API(dom_1.svg);
            function handle(baseFactory, formatter) {
                return {
                    apply(target, _, [prop, ...args]) {
                        return this.get(target, prop, target)(...args);
                    },
                    get: (target, prop) => target[prop] || prop in target || typeof prop !== 'string' ? target[prop] : target[prop] = builder(prop, baseFactory)
                };
                function builder(tag, baseFactory) {
                    return function build(attrs, children, factory) {
                        if (typeof attrs === 'function')
                            return build(void 0, void 0, attrs);
                        if (typeof children === 'function')
                            return build(attrs, void 0, children);
                        if (attrs !== void 0 && isChildren(attrs))
                            return build(void 0, attrs, factory);
                        const node = formatter(elem(factory || defaultFactory, attrs, children));
                        return node.nodeType === 1 ? new proxy_1.Elem(node, children) : new proxy_1.Elem(node.host, children, node);
                    };
                    function isChildren(children) {
                        return typeof children !== 'object' || alias_1.ObjectValues(children).slice(-1).every(val => typeof val === 'object');
                    }
                    function elem(factory, attrs, children) {
                        const el = factory(baseFactory, tag, attrs || {}, children);
                        if (tag !== el.tagName.toLowerCase())
                            throw new Error(`TypedDOM: Expected tag name is "${ tag }" but actually "${ el.tagName.toLowerCase() }".`);
                        if (factory !== defaultFactory) {
                            if (attrs)
                                for (const name of alias_1.ObjectKeys(attrs)) {
                                    const value = attrs[name];
                                    if (typeof value !== 'function')
                                        continue;
                                    void el.removeEventListener(name, value);
                                }
                            void dom_1.define(el, attrs);
                        }
                        return el;
                    }
                    function defaultFactory(factory, tag, attrs) {
                        return factory(tag, attrs);
                    }
                }
            }
        },
        {
            '../util/dom': 97,
            './proxy': 96,
            'spica/alias': 4
        }
    ],
    95: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uid = void 0;
            const uuid_1 = _dereq_('spica/uuid');
            const sqid_1 = _dereq_('spica/sqid');
            const id = uuid_1.uuid().slice(-7);
            function uid() {
                return `id-${ id }-${ +sqid_1.sqid() }`;
            }
            exports.uid = uid;
        },
        {
            'spica/sqid': 84,
            'spica/uuid': 92
        }
    ],
    96: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Elem = exports.proxy = void 0;
            const global_1 = _dereq_('spica/global');
            const alias_1 = _dereq_('spica/alias');
            const identity_1 = _dereq_('./identity');
            const dom_1 = _dereq_('../util/dom');
            var ElChildrenType;
            (function (ElChildrenType) {
                ElChildrenType.Void = 'void';
                ElChildrenType.Text = 'text';
                ElChildrenType.Array = 'array';
                ElChildrenType.Record = 'record';
            }(ElChildrenType || (ElChildrenType = {})));
            const proxies = new global_1.WeakMap();
            function proxy(el) {
                if (!proxies.has(el))
                    throw new Error(`TypedDOM: This element has no proxy.`);
                return proxies.get(el);
            }
            exports.proxy = proxy;
            const tag = Symbol.for('typed-dom/tag');
            class Elem {
                constructor(element, children_, container = element) {
                    this.element = element;
                    this.children_ = children_;
                    this.container = container;
                    this.id_ = this.element.id.trim();
                    this.isPartialUpdate = false;
                    this.isInitialization = true;
                    switch (true) {
                    case children_ === void 0:
                        this.type = ElChildrenType.Void;
                        break;
                    case typeof children_ === 'string':
                        this.type = ElChildrenType.Text;
                        break;
                    case alias_1.isArray(children_):
                        this.type = ElChildrenType.Array;
                        break;
                    case children_ && typeof children_ === 'object':
                        this.type = ElChildrenType.Record;
                        break;
                    default:
                        throw new Error(`TypedDOM: Invalid type children.`);
                    }
                    void throwErrorIfNotUsable(this);
                    void proxies.set(this.element, this);
                    switch (this.type) {
                    case ElChildrenType.Void:
                        this.isInitialization = false;
                        return;
                    case ElChildrenType.Text:
                        void dom_1.define(this.container, []);
                        this.children_ = this.container.appendChild(dom_1.text(''));
                        this.children = children_;
                        this.isInitialization = false;
                        return;
                    case ElChildrenType.Array:
                        void dom_1.define(this.container, []);
                        this.children_ = [];
                        this.children = children_;
                        this.isInitialization = false;
                        return;
                    case ElChildrenType.Record:
                        void dom_1.define(this.container, []);
                        this.children_ = this.observe(Object.assign({}, children_));
                        this.children = children_;
                        this.isInitialization = false;
                        return;
                    default:
                        throw new Error(`TypedDOM: Unreachable code.`);
                    }
                }
                get id() {
                    if (this.id_)
                        return this.id_;
                    this.id_ = identity_1.uid();
                    void this.element.classList.add(this.id_);
                    return this.id_;
                }
                get query() {
                    switch (true) {
                    case this.element !== this.container:
                        return ':host';
                    case this.id === this.element.id.trim():
                        return `#${ this.id }`;
                    default:
                        return `.${ this.id }`;
                    }
                }
                observe(children) {
                    const descs = {};
                    for (const name of alias_1.ObjectKeys(children)) {
                        if (name in {})
                            continue;
                        let child = children[name];
                        void throwErrorIfNotUsable(child);
                        void this.container.appendChild(child.element);
                        descs[name] = {
                            configurable: true,
                            enumerable: true,
                            get: () => {
                                return child;
                            },
                            set: newChild => {
                                const oldChild = child;
                                if (newChild === oldChild)
                                    return;
                                if (this.isPartialUpdate) {
                                    child = newChild;
                                    if (newChild.element.parentNode === oldChild.element.parentNode) {
                                        const ref = newChild.element.nextSibling !== oldChild.element ? newChild.element.nextSibling : oldChild.element.nextSibling;
                                        void this.container.replaceChild(newChild.element, oldChild.element);
                                        void this.container.insertBefore(oldChild.element, ref);
                                    } else {
                                        void this.container.insertBefore(newChild.element, oldChild.element);
                                        void this.container.removeChild(oldChild.element);
                                    }
                                } else {
                                    this.children = Object.assign(Object.assign({}, this.children_), { [name]: newChild });
                                }
                            }
                        };
                    }
                    return alias_1.ObjectDefineProperties(children, descs);
                }
                scope(child) {
                    if (child.element.tagName !== 'STYLE')
                        return;
                    const syntax = /(^|[,}])(\s*)\$scope(?![\w-])(?=[^;{}]*{)/g;
                    const style = child.element;
                    const query = this.query;
                    if (style.innerHTML.search(syntax) === -1)
                        return;
                    style.innerHTML = style.innerHTML.replace(syntax, (_, frag, space) => `${ frag }${ space }${ query }`);
                    switch (query[0]) {
                    case '.': {
                            const id = query.slice(1);
                            if (!style.classList.contains(id))
                                break;
                            void style.classList.add(id);
                            break;
                        }
                    }
                    if (style.children.length === 0)
                        return;
                    for (const el of style.querySelectorAll('*')) {
                        void el.remove();
                    }
                }
                get children() {
                    switch (this.type) {
                    case ElChildrenType.Text:
                        if (this.children_.parentNode !== this.container) {
                            this.children_ = void 0;
                            for (const node of this.container.childNodes) {
                                if ('wholeText' in node === false)
                                    continue;
                                this.children_ = node;
                                break;
                            }
                        }
                        return this.children_.data;
                    default:
                        return this.children_;
                    }
                }
                set children(children) {
                    const removedChildren = [];
                    const addedChildren = [];
                    let isChanged = false;
                    switch (this.type) {
                    case ElChildrenType.Void:
                        return;
                    case ElChildrenType.Text: {
                            if (!this.isInitialization && children === this.children)
                                return;
                            const targetChildren = this.children_;
                            const oldText = targetChildren.data;
                            const newText = children;
                            targetChildren.data = newText;
                            if (newText === oldText)
                                return;
                            void this.element.dispatchEvent(new global_1.Event('change', {
                                bubbles: false,
                                cancelable: true
                            }));
                            return;
                        }
                    case ElChildrenType.Array: {
                            const sourceChildren = children;
                            const targetChildren = [];
                            this.children_ = targetChildren;
                            const nodeChildren = this.container.children;
                            for (let i = 0; i < sourceChildren.length; ++i) {
                                const newChild = sourceChildren[i];
                                const el = nodeChildren[i];
                                if (newChild.element.parentNode !== this.container) {
                                    void throwErrorIfNotUsable(newChild);
                                }
                                if (newChild.element !== el) {
                                    if (newChild.element.parentNode !== this.container) {
                                        void this.scope(newChild);
                                        void addedChildren.push(newChild);
                                    }
                                    void this.container.insertBefore(newChild.element, el);
                                    isChanged = true;
                                }
                                void targetChildren.push(newChild);
                            }
                            void alias_1.ObjectFreeze(targetChildren);
                            for (let i = nodeChildren.length; sourceChildren.length < i--;) {
                                const el = nodeChildren[sourceChildren.length];
                                if (!proxies.has(el))
                                    continue;
                                void removedChildren.push(proxy(this.container.removeChild(el)));
                                isChanged = true;
                            }
                            break;
                        }
                    case ElChildrenType.Record: {
                            const sourceChildren = children;
                            const targetChildren = this.children_;
                            for (const name of alias_1.ObjectKeys(targetChildren)) {
                                const oldChild = targetChildren[name];
                                const newChild = sourceChildren[name];
                                if (!this.isInitialization && newChild === oldChild)
                                    continue;
                                if (newChild.element.parentNode !== this.container) {
                                    void throwErrorIfNotUsable(newChild);
                                }
                                if (this.isInitialization || newChild !== oldChild && newChild.element.parentNode !== oldChild.element.parentNode) {
                                    void this.scope(newChild);
                                    void addedChildren.push(newChild);
                                    if (!this.isInitialization) {
                                        let i = 0;
                                        i = removedChildren.lastIndexOf(newChild);
                                        i > -1 && removedChildren.splice(i, 1);
                                        void removedChildren.push(oldChild);
                                        i = addedChildren.lastIndexOf(oldChild);
                                        i > -1 && addedChildren.splice(i, 1);
                                    }
                                }
                                this.isPartialUpdate = true;
                                targetChildren[name] = sourceChildren[name];
                                this.isPartialUpdate = false;
                                isChanged = true;
                            }
                            break;
                        }
                    }
                    for (const child of removedChildren) {
                        void child.element.dispatchEvent(new global_1.Event('disconnect', {
                            bubbles: false,
                            cancelable: true
                        }));
                    }
                    for (const child of addedChildren) {
                        void child.element.dispatchEvent(new global_1.Event('connect', {
                            bubbles: false,
                            cancelable: true
                        }));
                    }
                    if (isChanged) {
                        void this.element.dispatchEvent(new global_1.Event('change', {
                            bubbles: false,
                            cancelable: true
                        }));
                    }
                }
            }
            exports.Elem = Elem;
            function throwErrorIfNotUsable({element}) {
                if (!element.parentElement || !proxies.has(element.parentElement))
                    return;
                throw new Error(`TypedDOM: Typed DOM children can't be used to another typed DOM.`);
            }
        },
        {
            '../util/dom': 97,
            './identity': 95,
            'spica/alias': 4,
            'spica/global': 18
        }
    ],
    97: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.define = exports.element = exports.text = exports.svg = exports.html = exports.shadow = exports.frag = void 0;
            const global_1 = _dereq_('spica/global');
            const alias_1 = _dereq_('spica/alias');
            const memoize_1 = _dereq_('spica/memoize');
            var NS;
            (function (NS) {
                NS['HTML'] = 'HTML';
                NS['SVG'] = 'SVG';
            }(NS || (NS = {})));
            const shadows = new WeakMap();
            var caches;
            (function (caches) {
                caches.elem = memoize_1.memoize(() => Object.create(null), new WeakMap());
                caches.frag = global_1.document.createDocumentFragment();
            }(caches || (caches = {})));
            function frag(children) {
                if (typeof children === 'string')
                    return frag([children]);
                return defineChildren(caches.frag.cloneNode(), children, true);
            }
            exports.frag = frag;
            function shadow(el, children, opts) {
                if (typeof el === 'string')
                    return shadow(html(el), children, opts);
                if (children && !isChildren(children))
                    return shadow(el, void 0, children);
                return el.shadowRoot || shadows.has(el) ? defineChildren(opts ? opts.mode === 'open' ? el.shadowRoot || el.attachShadow(opts) : shadows.get(el) || shadows.set(el, el.attachShadow(opts)).get(el) : el.shadowRoot || shadows.get(el), children, !shadows.has(el)) : defineChildren(!opts || opts.mode === 'open' ? el.attachShadow({ mode: 'open' }) : shadows.set(el, el.attachShadow(opts)).get(el), children === void 0 ? el.childNodes : children, !shadows.has(el));
            }
            exports.shadow = shadow;
            function html(tag, attrs, children) {
                return element(global_1.document, 'HTML', tag, attrs, children);
            }
            exports.html = html;
            function svg(tag, attrs, children) {
                return element(global_1.document, 'SVG', tag, attrs, children);
            }
            exports.svg = svg;
            function text(source) {
                return global_1.document.createTextNode(source);
            }
            exports.text = text;
            function element(context, ns, tag, attrs, children) {
                const cache = caches.elem(context);
                const key = `${ ns }:${ tag }`;
                const el = tag.includes('-') ? elem(context, ns, tag) : (cache[key] = cache[key] || elem(context, ns, tag)).cloneNode(true);
                return isChildren(attrs) ? defineChildren(el, attrs, true) : defineChildren(defineAttrs(el, attrs), children, true);
            }
            exports.element = element;
            function elem(context, ns, tag) {
                if ('id' in context)
                    throw new Error(`TypedDOM: Scoped custom elements are not supported.`);
                switch (ns) {
                case 'HTML':
                    return context.createElement(tag);
                case 'SVG':
                    return context.createElementNS('http://www.w3.org/2000/svg', tag);
                }
            }
            function define(el, attrs, children) {
                return isChildren(attrs) ? defineChildren(el, attrs) : defineChildren(defineAttrs(el, attrs), children);
            }
            exports.define = define;
            function defineAttrs(el, attrs) {
                if (!attrs)
                    return el;
                for (const name of alias_1.ObjectKeys(attrs)) {
                    const value = attrs[name];
                    switch (typeof value) {
                    case 'string':
                        void el.setAttribute(name, value);
                        continue;
                    case 'function':
                        if (name.length < 3)
                            throw new Error(`TypedDOM: Attribute names for event listeners must have an event name but got "${ name }".`);
                        if (name.slice(0, 2) !== 'on')
                            throw new Error(`TypedDOM: Attribute names for event listeners must start with "on" but got "${ name }".`);
                        void el.addEventListener(name.slice(2), value, {
                            passive: [
                                'wheel',
                                'mousewheel',
                                'touchstart',
                                'touchmove'
                            ].includes(name.slice(2))
                        });
                        continue;
                    case 'object':
                        void el.removeAttribute(name);
                        continue;
                    default:
                        continue;
                    }
                }
                return el;
            }
            function defineChildren(el, children, clean = false) {
                switch (typeof children) {
                case 'undefined':
                    return el;
                case 'string':
                    return defineChildren(el, [children], clean);
                }
                const targetNodes = clean ? [] : el.childNodes;
                let targetLength = targetNodes.length;
                if (targetLength === 0) {
                    void el.append(...children);
                    return el;
                }
                if (!alias_1.isArray(children))
                    return defineChildren(el, [...children], clean);
                let count = 0;
                I:
                    for (let i = 0; i < children.length; ++i) {
                        if (count === targetLength) {
                            void el.append(...children.slice(i));
                            return el;
                        }
                        const child = children[i];
                        if (typeof child === 'object' && child.nodeType === 11) {
                            const sourceNodes = child.childNodes;
                            const sourceLength = sourceNodes.length;
                            void el.insertBefore(child, targetNodes[count] || null);
                            count += sourceLength;
                            targetLength += sourceLength;
                            continue;
                        }
                        void ++count;
                        while (targetLength > children.length) {
                            const node = targetNodes[count - 1];
                            if (equal(node, child))
                                continue I;
                            void node.remove();
                            void --targetLength;
                        }
                        const node = targetNodes[count - 1];
                        if (equal(node, child))
                            continue;
                        if (targetLength < children.length - i + count) {
                            void el.insertBefore(typeof child === 'string' ? text(child) : child, node);
                            void ++targetLength;
                        } else {
                            void el.replaceChild(typeof child === 'string' ? text(child) : child, node);
                        }
                    }
                while (count < targetLength) {
                    void targetNodes[count].remove();
                    void --targetLength;
                }
                return el;
            }
            function isChildren(o) {
                return !!(o === null || o === void 0 ? void 0 : o[global_1.Symbol.iterator]);
            }
            function equal(node, data) {
                return typeof data === 'string' ? 'wholeText' in node && node.data === data : node === data;
            }
        },
        {
            'spica/alias': 4,
            'spica/global': 18,
            'spica/memoize': 23
        }
    ],
    98: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.bind = exports.delegate = exports.wait = exports.once = exports.listen = exports.currentTarget = void 0;
            const promise_1 = _dereq_('spica/promise');
            const noop_1 = _dereq_('spica/noop');
            exports.currentTarget = Symbol.for('currentTarget');
            function listen(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, d) : bind(target, a, b, c);
            }
            exports.listen = listen;
            function once(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, Object.assign(Object.assign({}, typeof d === 'boolean' ? { capture: d } : d), { once: true })) : bind(target, a, b, Object.assign(Object.assign({}, typeof c === 'boolean' ? { capture: c } : c), { once: true }));
            }
            exports.once = once;
            function wait(target, a, b = false, c = {}) {
                return new promise_1.AtomicPromise(resolve => typeof b === 'string' ? void once(target, a, b, resolve, c) : void once(target, a, resolve, b));
            }
            exports.wait = wait;
            function delegate(target, selector, type, listener, option = {}) {
                return bind(target.nodeType === 9 ? target.documentElement : target, type, ev => {
                    const cx = (ev.target.shadowRoot && ev.composedPath()[0] || ev.target).closest(selector);
                    cx && void once(cx, type, listener, option);
                    return ev.returnValue;
                }, Object.assign(Object.assign({}, option), { capture: true }));
            }
            exports.delegate = delegate;
            function bind(target, type, listener, option = false) {
                void target.addEventListener(type, handler, option);
                let unbind = () => (unbind = noop_1.noop, void target.removeEventListener(type, handler, option));
                return () => void unbind();
                function handler(ev) {
                    ev[exports.currentTarget] = ev.currentTarget;
                    return listener(ev);
                }
            }
            exports.bind = bind;
        },
        {
            'spica/noop': 80,
            'spica/promise': 82
        }
    ],
    99: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.apply = void 0;
            const dom_1 = _dereq_('./dom');
            function apply(node, selector, attrs) {
                const ns = node.querySelectorAll(selector);
                for (let i = 0, len = ns.length; i < len; ++i) {
                    void dom_1.define(ns[i], attrs);
                }
                return ns;
            }
            exports.apply = apply;
        },
        { './dom': 97 }
    ],
    100: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var gui_1 = _dereq_('./layer/interface/service/gui');
            Object.defineProperty(exports, 'Pjax', {
                enumerable: true,
                get: function () {
                    return gui_1.GUI;
                }
            });
            Object.defineProperty(exports, 'default', {
                enumerable: true,
                get: function () {
                    return gui_1.GUI;
                }
            });
            var router_1 = _dereq_('./lib/router');
            Object.defineProperty(exports, 'router', {
                enumerable: true,
                get: function () {
                    return router_1.router;
                }
            });
        },
        {
            './layer/interface/service/gui': 129,
            './lib/router': 139
        }
    ],
    101: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.route = void 0;
            const api_1 = _dereq_('../domain/router/api');
            var router_1 = _dereq_('../domain/event/router');
            Object.defineProperty(exports, 'RouterEvent', {
                enumerable: true,
                get: function () {
                    return router_1.RouterEvent;
                }
            });
            Object.defineProperty(exports, 'RouterEventType', {
                enumerable: true,
                get: function () {
                    return router_1.RouterEventType;
                }
            });
            Object.defineProperty(exports, 'RouterEventSource', {
                enumerable: true,
                get: function () {
                    return router_1.RouterEventSource;
                }
            });
            var config_1 = _dereq_('../domain/data/config');
            Object.defineProperty(exports, 'Config', {
                enumerable: true,
                get: function () {
                    return config_1.Config;
                }
            });
            Object.defineProperty(exports, 'scope', {
                enumerable: true,
                get: function () {
                    return config_1.scope;
                }
            });
            function route(config, event, state, io) {
                return api_1.route(new api_1.RouterEntity(config, event, new api_1.RouterEntityState(state.process, state.scripts)), io);
            }
            exports.route = route;
        },
        {
            '../domain/data/config': 104,
            '../domain/event/router': 106,
            '../domain/router/api': 107
        }
    ],
    102: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var path_1 = _dereq_('../domain/store/path');
            Object.defineProperty(exports, 'loadTitle', {
                enumerable: true,
                get: function () {
                    return path_1.loadTitle;
                }
            });
            Object.defineProperty(exports, 'savePosition', {
                enumerable: true,
                get: function () {
                    return path_1.savePosition;
                }
            });
        },
        { '../domain/store/path': 123 }
    ],
    103: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.savePosition = exports.loadPosition = exports.saveTitle = exports.loadTitle = void 0;
            const assign_1 = _dereq_('spica/assign');
            void saveTitle();
            void savePosition();
            function loadTitle() {
                return window.history.state && window.history.state.title || document.title;
            }
            exports.loadTitle = loadTitle;
            function saveTitle() {
                void window.history.replaceState(assign_1.extend(window.history.state || {}, { title: document.title }), document.title);
            }
            exports.saveTitle = saveTitle;
            function loadPosition() {
                return window.history.state && window.history.state.position || {
                    top: window.pageYOffset,
                    left: window.pageXOffset
                };
            }
            exports.loadPosition = loadPosition;
            function savePosition() {
                void window.history.replaceState(assign_1.extend(window.history.state || {}, {
                    position: {
                        top: window.pageYOffset,
                        left: window.pageXOffset
                    }
                }), document.title);
            }
            exports.savePosition = savePosition;
        },
        { 'spica/assign': 6 }
    ],
    104: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Config = void 0;
            const assign_1 = _dereq_('spica/assign');
            var scope_1 = _dereq_('./config/scope');
            Object.defineProperty(exports, 'scope', {
                enumerable: true,
                get: function () {
                    return scope_1.scope;
                }
            });
            class Config {
                constructor(option) {
                    this.areas = ['body'];
                    this.link = 'a';
                    this.form = 'form:not([method])';
                    this.replace = '';
                    this.fetch = {
                        rewrite: path => path,
                        cache: (_path, _headers) => '',
                        headers: new Headers(),
                        timeout: 3000,
                        wait: 0
                    };
                    this.update = {
                        rewrite: (_doc, _area) => undefined,
                        head: 'base, meta, link',
                        css: true,
                        script: true,
                        ignore: '',
                        ignores: {
                            extension: '[href^="chrome-extension://"]',
                            security: '[src*=".scr.kaspersky-labs.com/"]'
                        },
                        reload: '',
                        logger: ''
                    };
                    this.sequence = new Sequence();
                    this.progressbar = 'display:none;position:absolute;bottom:0;left:0;width:0;height:2px;background:rgb(40, 105, 255);';
                    this.scope = {};
                    void Object.defineProperties(this.update, {
                        ignore: {
                            enumerable: false,
                            set(value) {
                                this.ignores['_'] = value;
                            },
                            get() {
                                return Object.keys(this.ignores).map(i => this.ignores[i]).filter(s => s.trim().length > 0).join(',');
                            }
                        }
                    });
                    void assign_1.extend(this, option);
                    this.fetch.headers = new Headers(this.fetch.headers);
                    void Object.freeze(this);
                    void this.fetch.headers.set('X-Requested-With', 'XMLHttpRequest');
                    void this.fetch.headers.set('X-Pjax', '1');
                }
                filter(el) {
                    return el.matches(':not([target])');
                }
                fallback(target, reason) {
                    if (target instanceof HTMLAnchorElement) {
                        return void window.location.assign(target.href);
                    }
                    if (target instanceof HTMLFormElement) {
                        return void window.location.assign(target.action);
                    }
                    if (target instanceof Window) {
                        return void window.location.reload(true);
                    }
                    throw reason;
                }
            }
            exports.Config = Config;
            class Sequence {
                fetch() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return 'fetch';
                    });
                }
                unload() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return 'unload';
                    });
                }
                content() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return 'content';
                    });
                }
                ready() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return 'ready';
                    });
                }
                load() {
                    return __awaiter(this, void 0, void 0, function* () {
                    });
                }
            }
        },
        {
            './config/scope': 105,
            'spica/assign': 6
        }
    ],
    105: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.scope = void 0;
            const router_1 = _dereq_('../../../../lib/router');
            const config_1 = _dereq_('../../../domain/data/config');
            const sequence_1 = _dereq_('spica/sequence');
            const maybe_1 = _dereq_('spica/maybe');
            const assign_1 = _dereq_('spica/assign');
            function scope(config, path) {
                const scope = Object.assign({ '/': {} }, config.scope);
                return sequence_1.Sequence.from(Object.keys(scope).sort().reverse()).dropWhile(pattern => !!!router_1.compare(pattern, path.orig) && !router_1.compare(pattern, path.dest)).take(1).filter(pattern => !!router_1.compare(pattern, path.orig) && router_1.compare(pattern, path.dest)).map(pattern => scope[pattern]).map(option => option ? maybe_1.Just(new config_1.Config(assign_1.extend({}, config, option))) : maybe_1.Nothing).extract().reduce((_, m) => m, maybe_1.Nothing);
            }
            exports.scope = scope;
        },
        {
            '../../../../lib/router': 139,
            '../../../domain/data/config': 104,
            'spica/assign': 6,
            'spica/maybe': 22,
            'spica/sequence': 83
        }
    ],
    106: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.RouterEventLocation = exports.RouterEventRequest = exports.RouterEventMethod = exports.RouterEventType = exports.RouterEventSource = exports.RouterEvent = void 0;
            const dom_1 = _dereq_('../../../lib/dom');
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            class RouterEvent {
                constructor(original) {
                    this.original = original;
                    this.type = this.original.type.toLowerCase();
                    this.source = this.original[typed_dom_1.currentTarget];
                    this.request = new RouterEventRequest(this.source);
                    this.location = new RouterEventLocation(this.request.url);
                    void Object.freeze(this);
                }
            }
            exports.RouterEvent = RouterEvent;
            var RouterEventSource;
            (function (RouterEventSource) {
                RouterEventSource.Anchor = HTMLAnchorElement;
                RouterEventSource.Form = HTMLFormElement;
                RouterEventSource.Window = window.Window;
            }(RouterEventSource = exports.RouterEventSource || (exports.RouterEventSource = {})));
            var RouterEventType;
            (function (RouterEventType) {
                RouterEventType.click = 'click';
                RouterEventType.submit = 'submit';
                RouterEventType.popstate = 'popstate';
            }(RouterEventType = exports.RouterEventType || (exports.RouterEventType = {})));
            var RouterEventMethod;
            (function (RouterEventMethod) {
                RouterEventMethod.GET = 'GET';
                RouterEventMethod.POST = 'POST';
            }(RouterEventMethod = exports.RouterEventMethod || (exports.RouterEventMethod = {})));
            class RouterEventRequest {
                constructor(source) {
                    this.source = source;
                    this.method = (() => {
                        if (this.source instanceof RouterEventSource.Anchor) {
                            return RouterEventMethod.GET;
                        }
                        if (this.source instanceof RouterEventSource.Form) {
                            return this.source.method.toUpperCase() === RouterEventMethod.POST ? RouterEventMethod.POST : RouterEventMethod.GET;
                        }
                        if (this.source instanceof RouterEventSource.Window) {
                            return RouterEventMethod.GET;
                        }
                        throw new TypeError();
                    })();
                    this.url = (() => {
                        if (this.source instanceof RouterEventSource.Anchor) {
                            return new url_1.URL(url_1.standardize(this.source.href));
                        }
                        if (this.source instanceof RouterEventSource.Form) {
                            return this.source.method.toUpperCase() === RouterEventMethod.GET ? new url_1.URL(url_1.standardize(this.source.action.split(/[?#]/)[0] + `?${ dom_1.serialize(this.source) }`)) : new url_1.URL(url_1.standardize(this.source.action.split(/[?#]/)[0]));
                        }
                        if (this.source instanceof RouterEventSource.Window) {
                            return new url_1.URL(url_1.standardize(window.location.href));
                        }
                        throw new TypeError();
                    })();
                    this.body = (() => this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST ? new FormData(this.source) : null)();
                    void Object.freeze(this);
                }
            }
            exports.RouterEventRequest = RouterEventRequest;
            class RouterEventLocation {
                constructor(dest) {
                    this.dest = dest;
                    this.orig = new url_1.URL(url_1.standardize(window.location.href));
                    void Object.freeze(this);
                }
            }
            exports.RouterEventLocation = RouterEventLocation;
        },
        {
            '../../../lib/dom': 136,
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    107: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.route = void 0;
            const fetch_1 = _dereq_('./module/fetch');
            const update_1 = _dereq_('./module/update');
            const content_1 = _dereq_('./module/update/content');
            const path_1 = _dereq_('../store/path');
            const either_1 = _dereq_('spica/either');
            var entity_1 = _dereq_('./model/eav/entity');
            Object.defineProperty(exports, 'RouterEntity', {
                enumerable: true,
                get: function () {
                    return entity_1.RouterEntity;
                }
            });
            Object.defineProperty(exports, 'RouterEntityState', {
                enumerable: true,
                get: function () {
                    return entity_1.RouterEntityState;
                }
            });
            function route(entity, io) {
                return __awaiter(this, void 0, void 0, function* () {
                    return either_1.Right(void 0).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? either_1.Right(void 0) : either_1.Left(new Error(`Failed to match areas.`))).fmap(() => fetch_1.fetch(entity.event.request, entity.config, entity.state.process)).fmap(p => __awaiter(this, void 0, void 0, function* () {
                        return (yield p).fmap(([res, seq]) => update_1.update(entity, res, seq, {
                            document: io.document,
                            position: path_1.loadPosition
                        })).extract(either_1.Left);
                    })).extract(either_1.Left);
                    function match(document, areas) {
                        return content_1.separate({
                            src: document,
                            dst: document
                        }, areas).extract(() => false, () => true);
                    }
                });
            }
            exports.route = route;
        },
        {
            '../store/path': 123,
            './model/eav/entity': 108,
            './module/fetch': 110,
            './module/update': 112,
            './module/update/content': 114,
            'spica/either': 14
        }
    ],
    108: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.RouterEntityState = exports.RouterEntity = void 0;
            class RouterEntity {
                constructor(config, event, state) {
                    this.config = config;
                    this.event = event;
                    this.state = state;
                    void Object.freeze(this);
                }
            }
            exports.RouterEntity = RouterEntity;
            class RouterEntityState {
                constructor(process, scripts) {
                    this.process = process;
                    this.scripts = scripts;
                    void Object.freeze(this);
                }
            }
            exports.RouterEntityState = RouterEntityState;
        },
        {}
    ],
    109: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.FetchResponse = void 0;
            const html_1 = _dereq_('../../../../../../lib/html');
            const url_1 = _dereq_('spica/url');
            class FetchResponse {
                constructor(url, xhr) {
                    this.url = url;
                    this.xhr = xhr;
                    this.header = name => this.xhr.getResponseHeader(name);
                    this.document = this.xhr.responseType === 'document' ? this.xhr.responseXML.cloneNode(true) : html_1.parse(this.xhr.responseText).extract();
                    if (url.origin !== new url_1.URL(xhr.responseURL).origin)
                        throw new Error(`Redirected to another origin.`);
                    void Object.defineProperty(this.document, 'URL', {
                        configurable: true,
                        enumerable: true,
                        value: url.reference,
                        writable: false
                    });
                    void html_1.fix(this.document);
                    void Object.freeze(this);
                }
            }
            exports.FetchResponse = FetchResponse;
        },
        {
            '../../../../../../lib/html': 138,
            'spica/url': 90
        }
    ],
    110: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.fetch = void 0;
            const xhr_1 = _dereq_('../module/fetch/xhr');
            const clock_1 = _dereq_('spica/clock');
            function fetch({method, url, body}, {
                fetch: {rewrite, cache, headers, timeout, wait},
                sequence
            }, process) {
                return __awaiter(this, void 0, void 0, function* () {
                    void window.dispatchEvent(new Event('pjax:fetch'));
                    const [seq, res] = yield Promise.all([
                        sequence.fetch(void 0, {
                            path: url.path,
                            method,
                            headers,
                            body
                        }),
                        xhr_1.xhr(method, url, headers, body, timeout, rewrite, cache, process),
                        clock_1.wait(wait)
                    ]);
                    return res.bind(process.either).fmap(res => [
                        res,
                        seq
                    ]);
                });
            }
            exports.fetch = fetch;
        },
        {
            '../module/fetch/xhr': 111,
            'spica/clock': 10
        }
    ],
    111: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.match_ = exports.xhr = void 0;
            const fetch_1 = _dereq_('../../model/eav/value/fetch');
            const promise_1 = _dereq_('spica/promise');
            const sequence_1 = _dereq_('spica/sequence');
            const either_1 = _dereq_('spica/either');
            const cache_1 = _dereq_('spica/cache');
            const url_1 = _dereq_('spica/url');
            const memory = new cache_1.Cache(99);
            const caches = new cache_1.Cache(99);
            function xhr(method, displayURL, headers, body, timeout, rewrite, cache, cancellation) {
                headers = new Headers(headers);
                void headers.set('Accept', headers.get('Accept') || 'text/html');
                const requestURL = new url_1.URL(url_1.standardize(rewrite(displayURL.path)));
                if (method === 'GET' && caches.has(requestURL.path) && Date.now() > caches.get(requestURL.path).expiry) {
                    void headers.set('If-None-Match', headers.get('If-None-Match') || caches.get(requestURL.path).etag);
                }
                const key = method === 'GET' ? cache(requestURL.path, headers) || void 0 : void 0;
                return new promise_1.AtomicPromise(resolve => {
                    if (key && memory.has(key))
                        return resolve(either_1.Right(memory.get(key)(displayURL, requestURL)));
                    const xhr = new XMLHttpRequest();
                    void xhr.open(method, requestURL.path, true);
                    for (const [name, value] of headers) {
                        void xhr.setRequestHeader(name, value);
                    }
                    xhr.responseType = window.navigator.userAgent.includes('Edge') ? 'text' : 'document';
                    xhr.timeout = timeout;
                    void xhr.send(body);
                    void xhr.addEventListener('abort', () => void resolve(either_1.Left(new Error(`Failed to request a page by abort.`))));
                    void xhr.addEventListener('error', () => void resolve(either_1.Left(new Error(`Failed to request a page by error.`))));
                    void xhr.addEventListener('timeout', () => void resolve(either_1.Left(new Error(`Failed to request a page by timeout.`))));
                    void xhr.addEventListener('load', () => void verify(xhr, method).fmap(xhr => {
                        const responseURL = new url_1.URL(url_1.standardize(xhr.responseURL));
                        if (method === 'GET') {
                            const cc = new Map(xhr.getResponseHeader('Cache-Control') ? xhr.getResponseHeader('Cache-Control').trim().split(/\s*,\s*/).filter(v => v.length > 0).map(v => v.split('=').concat('')) : []);
                            for (const path of new Set([
                                    requestURL.path,
                                    responseURL.path
                                ])) {
                                if (xhr.getResponseHeader('ETag') && !cc.has('no-store')) {
                                    void caches.set(path, {
                                        etag: xhr.getResponseHeader('ETag'),
                                        expiry: cc.has('max-age') && !cc.has('no-cache') ? Date.now() + +cc.get('max-age') * 1000 || 0 : 0,
                                        xhr
                                    });
                                } else {
                                    void caches.delete(path);
                                }
                            }
                        }
                        return (overriddenDisplayURL, overriddenRequestURL) => new fetch_1.FetchResponse(responseURL.path === overriddenRequestURL.path ? overriddenDisplayURL : overriddenRequestURL.path === requestURL.path || !key ? responseURL : overriddenDisplayURL, xhr);
                    }).fmap(f => {
                        if (key) {
                            void memory.set(key, f);
                        }
                        return f(displayURL, requestURL);
                    }).extract(err => void resolve(either_1.Left(err)), res => void resolve(either_1.Right(res))));
                    void cancellation.register(() => void xhr.abort());
                });
            }
            exports.xhr = xhr;
            function verify(xhr, method) {
                return either_1.Right(xhr).bind(xhr => {
                    const url = new url_1.URL(url_1.standardize(xhr.responseURL));
                    switch (true) {
                    case !xhr.responseURL:
                        return either_1.Left(new Error(`Failed to get the response URL.`));
                    case url.origin !== new url_1.URL(window.location.origin).origin:
                        return either_1.Left(new Error(`Redirected to another origin.`));
                    case !/2..|304/.test(`${ xhr.status }`):
                        return either_1.Left(new Error(`Failed to validate the status of response.`));
                    case !xhr.response:
                        return method === 'GET' && xhr.status === 304 && caches.has(url.path) ? either_1.Right(caches.get(url.path).xhr) : either_1.Left(new Error(`Failed to get the response body.`));
                    case !match(xhr.getResponseHeader('Content-Type'), 'text/html'):
                        return either_1.Left(new Error(`Failed to validate the content type of response.`));
                    default:
                        return either_1.Right(xhr);
                    }
                });
            }
            function match(actualContentType, expectedContentType) {
                return sequence_1.Sequence.intersect(sequence_1.Sequence.from(parse(actualContentType || '').sort()), sequence_1.Sequence.from(parse(expectedContentType).sort()), (a, b) => a.localeCompare(b)).take(1).extract().length > 0;
                function parse(headerValue) {
                    return headerValue.split(/\s*;\s*/).filter(v => v.length > 0);
                }
            }
            exports.match_ = match;
        },
        {
            '../../model/eav/value/fetch': 109,
            'spica/cache': 7,
            'spica/either': 14,
            'spica/promise': 82,
            'spica/sequence': 83,
            'spica/url': 90
        }
    ],
    112: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.update = void 0;
            const router_1 = _dereq_('../../event/router');
            const blur_1 = _dereq_('../module/update/blur');
            const url_1 = _dereq_('../module/update/url');
            const title_1 = _dereq_('../module/update/title');
            const head_1 = _dereq_('../module/update/head');
            const content_1 = _dereq_('../module/update/content');
            const css_1 = _dereq_('../module/update/css');
            const script_1 = _dereq_('../module/update/script');
            const focus_1 = _dereq_('../module/update/focus');
            const scroll_1 = _dereq_('../module/update/scroll');
            const path_1 = _dereq_('../../store/path');
            const promise_1 = _dereq_('spica/promise');
            const either_1 = _dereq_('spica/either');
            const hlist_1 = _dereq_('spica/hlist');
            function update({event, config, state}, response, seq, io) {
                const {process} = state;
                const documents = {
                    src: response.document,
                    dst: io.document
                };
                return promise_1.AtomicPromise.resolve(seq).then(process.either).then(m => m.bind(() => content_1.separate(documents, config.areas).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), () => m)).fmap(seqA => (void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seqA, Object.assign(Object.assign({}, response), { url: response.url.reference }))))).then(m => either_1.Either.sequence(m)).then(process.promise).then(m => m.bind(seqB => content_1.separate(documents, config.areas).fmap(([area]) => [
                    seqB,
                    area
                ]).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), process.either)).bind(([seqB, area]) => (void config.update.rewrite(documents.src, area), content_1.separate(documents, config.areas).fmap(([, areas]) => [
                    seqB,
                    areas
                ]).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), process.either)))).then(process.promise).then(m => m.fmap(([seqB, areas]) => hlist_1.HList().unfold(() => (void blur_1.blur(documents.dst), void url_1.url(new router_1.RouterEventLocation(response.url), documents.src.title, event.type, event.source, config.replace), void title_1.title(documents), void path_1.saveTitle(), void head_1.head(documents, config.update.head, config.update.ignore), process.either(content_1.content(documents, areas)).fmap(([as, ps]) => [
                    as,
                    promise_1.AtomicPromise.all(ps)
                ]))).unfold(p => __awaiter(this, void 0, void 0, function* () {
                    return (yield p).fmap(([areas]) => __awaiter(this, void 0, void 0, function* () {
                        config.update.css ? void css_1.css(documents, config.update.ignore) : void 0;
                        void io.document.dispatchEvent(new Event('pjax:content'));
                        const seqC = yield config.sequence.content(seqB, areas);
                        const ssm = config.update.script ? yield script_1.script(documents, state.scripts, config.update, Math.max(config.fetch.timeout, 1000) * 10, process) : yield process.either([
                            [],
                            promise_1.AtomicPromise.resolve(process.either([]))
                        ]);
                        void focus_1.focus(event.type, documents.dst);
                        void scroll_1.scroll(event.type, documents.dst, {
                            hash: event.location.dest.fragment,
                            position: io.position
                        });
                        void path_1.savePosition();
                        void io.document.dispatchEvent(new Event('pjax:ready'));
                        return [
                            ssm.fmap(([ss, ap]) => [
                                ss,
                                ap.then(m => m.extract())
                            ]),
                            yield config.sequence.ready(seqC)
                        ];
                    })).fmap(p => p.then(([m, seqD]) => m.fmap(sst => [
                        sst,
                        seqD
                    ]))).extract(err => promise_1.AtomicPromise.resolve(either_1.Left(err)));
                })).reverse())).then(process.promise).then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([
                    p1,
                    p2
                ]).then(([m1, m2]) => m1.bind(([, cp]) => m2.fmap(([[, sp], seqD]) => void promise_1.AtomicPromise.all([
                    cp,
                    sp
                ]).then(process.either).then(m => m.fmap(([events]) => (void window.dispatchEvent(new Event('pjax:load')), void config.sequence.load(seqD, events))).extract(() => void 0)))).extract(() => void 0)), p2))).then(m => either_1.Either.sequence(m).then(m => m.join())).then(m => m.fmap(([sst]) => sst));
            }
            exports.update = update;
        },
        {
            '../../event/router': 106,
            '../../store/path': 123,
            '../module/update/blur': 113,
            '../module/update/content': 114,
            '../module/update/css': 115,
            '../module/update/focus': 116,
            '../module/update/head': 117,
            '../module/update/script': 118,
            '../module/update/scroll': 119,
            '../module/update/title': 121,
            '../module/update/url': 122,
            'spica/either': 14,
            'spica/hlist': 20,
            'spica/promise': 82
        }
    ],
    113: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.blur = void 0;
            function blur(document) {
                if (document !== window.document || document.activeElement === document.body)
                    return;
                void document.activeElement.blur();
                void document.body.focus();
            }
            exports.blur = blur;
        },
        {}
    ],
    114: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._wait = exports._split = exports.separate = exports.content = void 0;
            const script_1 = _dereq_('./script');
            const promise_1 = _dereq_('spica/promise');
            const maybe_1 = _dereq_('spica/maybe');
            const concat_1 = _dereq_('spica/concat');
            const typed_dom_1 = _dereq_('typed-dom');
            function content(documents, areas, io = { replace: (src, dst) => void dst.parentNode.replaceChild(src, dst) }) {
                return [
                    areas.map(r => r.dst).reduce(concat_1.concat, []),
                    areas.map(load).reduce(concat_1.concat, [])
                ];
                function load(area) {
                    return area.src.map((_, i) => ({
                        src: documents.dst.importNode(area.src[i].cloneNode(true), true),
                        dst: area.dst[i]
                    })).map(area => (void replace(area), [...typed_dom_1.apply(area.src, 'img, iframe, frame')].map(wait))).reduce(concat_1.concat, []);
                    function replace(area) {
                        const unescape = [...typed_dom_1.apply(area.src, 'script')].map(script_1.escape).reduce((f, g) => () => (void f(), void g()), () => void 0);
                        void io.replace(area.src, area.dst);
                        void unescape();
                    }
                }
            }
            exports.content = content;
            function separate(documents, areas) {
                return areas.reduce((m, area) => maybe_1.Maybe.mplus(m, sep(documents, area).fmap(rs => [
                    area,
                    rs
                ])), maybe_1.Nothing);
                function sep(documents, area) {
                    return split(area).bind(areas => areas.reduce((m, area) => m.bind(acc => {
                        const record = {
                            src: [...typed_dom_1.apply(documents.src, area)],
                            dst: [...typed_dom_1.apply(documents.dst, area)]
                        };
                        return record.src.length > 0 && record.src.length === record.dst.length ? maybe_1.Just(concat_1.concat(acc, [record])) : maybe_1.Nothing;
                    }), maybe_1.Just([])));
                }
            }
            exports.separate = separate;
            function split(area) {
                return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(area => area.trim()).reduce((m, area) => area ? m.fmap(acc => concat_1.concat(acc, [area])) : maybe_1.Nothing, maybe_1.Just([]));
            }
            exports._split = split;
            function wait(el) {
                return promise_1.AtomicPromise.race([
                    new promise_1.AtomicPromise(resolve => void typed_dom_1.once(el, 'load', resolve)),
                    new promise_1.AtomicPromise(resolve => void typed_dom_1.once(el, 'abort', resolve)),
                    new promise_1.AtomicPromise(resolve => void typed_dom_1.once(el, 'error', resolve))
                ]);
            }
            exports._wait = wait;
        },
        {
            './script': 118,
            'spica/concat': 11,
            'spica/maybe': 22,
            'spica/promise': 82,
            'typed-dom': 93
        }
    ],
    115: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.css = void 0;
            const sync_1 = _dereq_('./sync');
            const typed_dom_1 = _dereq_('typed-dom');
            function css(documents, ignore) {
                const selector = 'link[rel~="stylesheet"], style';
                return void [
                    'head',
                    'body'
                ].map(query => [
                    documents.src.querySelector(query),
                    documents.dst.querySelector(query)
                ]).forEach(([src, dst]) => void sync_1.sync(sync_1.pair(list(src), list(dst), (a, b) => a.outerHTML === b.outerHTML), dst));
                function list(source) {
                    return [...typed_dom_1.apply(source, selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.css = css;
        },
        {
            './sync': 120,
            'typed-dom': 93
        }
    ],
    116: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.focus = void 0;
            const router_1 = _dereq_('../../../event/router');
            const typed_dom_1 = _dereq_('typed-dom');
            function focus(type, document) {
                switch (type) {
                case router_1.RouterEventType.click:
                case router_1.RouterEventType.submit:
                    return void [...typed_dom_1.apply(document, '[autofocus]')].slice(-1).filter(el => el.closest('html') === window.document.documentElement && el !== document.activeElement).forEach(el => void el.focus());
                case router_1.RouterEventType.popstate:
                    return;
                default:
                    throw new TypeError(type);
                }
            }
            exports.focus = focus;
        },
        {
            '../../../event/router': 106,
            'typed-dom': 93
        }
    ],
    117: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.head = void 0;
            const sync_1 = _dereq_('./sync');
            const typed_dom_1 = _dereq_('typed-dom');
            function head(documents, selector, ignore) {
                ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
                return void sync_1.sync(sync_1.pair(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);
                function list(source) {
                    return [...typed_dom_1.apply(source, selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.head = head;
        },
        {
            './sync': 120,
            'typed-dom': 93
        }
    ],
    118: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.escape = exports._evaluate = exports._fetch = exports.script = void 0;
            const error_1 = _dereq_('../../../../../lib/error');
            const promise_1 = _dereq_('spica/promise');
            const either_1 = _dereq_('spica/either');
            const url_1 = _dereq_('spica/url');
            const tuple_1 = _dereq_('spica/tuple');
            const concat_1 = _dereq_('spica/concat');
            const clock_1 = _dereq_('spica/clock');
            const typed_dom_1 = _dereq_('typed-dom');
            function script(documents, skip, selector, timeout, cancellation, io = {
                fetch,
                evaluate
            }) {
                const scripts = [...typed_dom_1.apply(documents.src, 'script')].filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL(url_1.standardize(el.src)).reference) || el.matches(selector.reload.trim() || '_') : true);
                const {ss, as} = scripts.reduce((o, script) => {
                    switch (true) {
                    case script.matches('[src][async], [src][defer]'):
                        void o.as.push(script);
                        break;
                    default:
                        void o.ss.push(script);
                    }
                    return o;
                }, {
                    ss: [],
                    as: []
                });
                return promise_1.AtomicPromise.all([
                    promise_1.AtomicPromise.all(request(ss)).then(run),
                    promise_1.AtomicPromise.all(request(as)).then(run)
                ]).then(([sm, am]) => __awaiter(this, void 0, void 0, function* () {
                    return sm.fmap(p => __awaiter(this, void 0, void 0, function* () {
                        return (yield p).fmap(([ss1, ap1]) => [
                            ss1,
                            ap1.then(as1 => __awaiter(this, void 0, void 0, function* () {
                                return am.fmap(p => __awaiter(this, void 0, void 0, function* () {
                                    return (yield p).fmap(([ss2, ap2]) => promise_1.AtomicPromise.all([
                                        as1,
                                        either_1.Right(ss2),
                                        ap2
                                    ]).then(sst => sst.reduce((m1, m2) => m1.bind(s1 => m2.fmap(s2 => concat_1.concat(s1, s2)))))).extract(either_1.Left);
                                })).extract(either_1.Left);
                            }))
                        ]);
                    })).extract(either_1.Left);
                }));
                function request(scripts) {
                    return scripts.map(script => io.fetch(script, timeout));
                }
                function run(responses) {
                    return responses.reduce((results, m) => m.bind(() => results), responses.reduce((results, m) => results.bind(cancellation.either).bind(([sp, ap]) => m.fmap(([script, code]) => io.evaluate(script, code, selector.logger, skip, promise_1.AtomicPromise.all(sp), cancellation)).bind(m => m.extract(p => either_1.Right(tuple_1.tuple([
                        concat_1.concat(sp, [p]),
                        ap
                    ])), p => either_1.Right(tuple_1.tuple([
                        sp,
                        concat_1.concat(ap, [p])
                    ]))))), either_1.Right([
                        [],
                        []
                    ]))).fmap(([sp, ap]) => promise_1.AtomicPromise.all(sp).then(m => either_1.Either.sequence(m)).then(sm => sm.fmap(ss => tuple_1.tuple([
                        ss,
                        Promise.all(ap).then(m => either_1.Either.sequence(m))
                    ]))));
                }
            }
            exports.script = script;
            function fetch(script, timeout) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!script.hasAttribute('src'))
                        return either_1.Right([
                            script,
                            script.text
                        ]);
                    if (script.type.toLowerCase() === 'module')
                        return either_1.Right([
                            script,
                            ''
                        ]);
                    return promise_1.AtomicPromise.race([
                        window.fetch(script.src, {
                            headers: new Headers({ Accept: 'application/javascript' }),
                            integrity: script.integrity
                        }),
                        clock_1.wait(timeout).then(() => promise_1.AtomicPromise.reject(new Error(`${ script.src }: Timeout.`)))
                    ]).then(res => __awaiter(this, void 0, void 0, function* () {
                        return res.ok ? either_1.Right([
                            script,
                            yield res.text()
                        ]) : script.matches('[src][async]') ? retry(script).then(() => either_1.Right([
                            script,
                            ''
                        ]), () => either_1.Left(new Error(`${ script.src }: ${ res.statusText }`))) : either_1.Left(new Error(res.statusText));
                    }), error => either_1.Left(error));
                });
            }
            exports._fetch = fetch;
            function evaluate(script, code, logger, skip, wait, cancellation) {
                script = script.ownerDocument === document ? script : document.importNode(script.cloneNode(true), true);
                const logging = !!script.parentElement && script.parentElement.matches(logger.trim() || '_');
                const container = document.querySelector(logging ? script.parentElement.id ? `#${ script.parentElement.id }` : script.parentElement.tagName : '_') || document.body;
                const unescape = escape(script);
                void container.appendChild(script);
                void unescape();
                !logging && void script.remove();
                const result = promise_1.AtomicPromise.resolve(wait).then(evaluate);
                return script.matches('[src][async]') ? either_1.Right(result) : either_1.Left(result);
                function evaluate() {
                    if (cancellation.canceled)
                        throw new error_1.FatalError('Expired.');
                    if (script.matches('[type="module"][src]')) {
                        return promise_1.AtomicPromise.resolve(Promise.resolve().then(() => _dereq_(script.src))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (void script.dispatchEvent(new Event('load')), either_1.Right(script)), reason => (void script.dispatchEvent(new Event('error')), either_1.Left(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
                    } else {
                        try {
                            if (skip.has(new url_1.URL(url_1.standardize(window.location.href)).reference))
                                throw new error_1.FatalError('Expired.');
                            void (0, eval)(code);
                            script.hasAttribute('src') && void script.dispatchEvent(new Event('load'));
                            return promise_1.AtomicPromise.resolve(either_1.Right(script));
                        } catch (reason) {
                            script.hasAttribute('src') && void script.dispatchEvent(new Event('error'));
                            return promise_1.AtomicPromise.resolve(either_1.Left(new error_1.FatalError(reason instanceof Error ? reason.message : reason + '')));
                        }
                    }
                }
            }
            exports._evaluate = evaluate;
            function escape(script) {
                const src = script.hasAttribute('src') ? script.getAttribute('src') : null;
                const code = script.text;
                void script.removeAttribute('src');
                script.text = '';
                return () => (script.text = ' ', script.text = code, typeof src === 'string' ? void script.setAttribute('src', src) : void 0);
            }
            exports.escape = escape;
            function retry(script) {
                if (new url_1.URL(url_1.standardize(script.src)).origin === new url_1.URL(url_1.standardize(window.location.href)).origin)
                    return promise_1.AtomicPromise.reject(new Error());
                script = typed_dom_1.html('script', Object.values(script.attributes).reduce((o, {name, value}) => (o[name] = value, o), {}), [...script.childNodes]);
                return new promise_1.AtomicPromise((resolve, reject) => (void script.addEventListener('load', () => void resolve()), void script.addEventListener('error', reject), void document.body.appendChild(script), void script.remove()));
            }
        },
        {
            '../../../../../lib/error': 137,
            'spica/clock': 10,
            'spica/concat': 11,
            'spica/either': 14,
            'spica/promise': 82,
            'spica/tuple': 87,
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    119: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._hash = exports.scroll = void 0;
            const router_1 = _dereq_('../../../event/router');
            function scroll(type, document, env, io = {
                scrollToElement: el => void el.scrollIntoView(),
                scrollToPosition: ({top, left}) => void window.scrollTo(left, top),
                hash
            }) {
                switch (type) {
                case router_1.RouterEventType.click:
                    if (io.hash(document, env.hash, io))
                        return;
                    return void io.scrollToPosition({
                        top: 0,
                        left: 0
                    });
                case router_1.RouterEventType.submit:
                    return void io.scrollToPosition({
                        top: 0,
                        left: 0
                    });
                case router_1.RouterEventType.popstate:
                    return void io.scrollToPosition(env.position());
                default:
                    throw new TypeError(type);
                }
            }
            exports.scroll = scroll;
            function hash(document, hash, io = { scrollToElement: el => void el.scrollIntoView() }) {
                const index = hash.slice(1);
                if (index.length === 0)
                    return false;
                const el = document.getElementById(index) || document.getElementsByName(index)[0];
                if (!el)
                    return false;
                void io.scrollToElement(el);
                return true;
            }
            exports._hash = hash;
        },
        { '../../../event/router': 106 }
    ],
    120: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.pair = exports.sync = void 0;
            const either_1 = _dereq_('spica/either');
            const concat_1 = _dereq_('spica/concat');
            function sync(pairs, fallback, io = {
                before,
                remove
            }) {
                return void pairs.forEach(([srcs, dst]) => (void io.before(parent(dst), srcs.slice(-1).some(src => !!dst && src.outerHTML === dst.outerHTML) ? srcs.slice(0, -1) : srcs, dst), dst && srcs.length === 0 ? void io.remove(dst) : void 0));
                function parent(dst) {
                    return dst ? dst.parentElement : fallback;
                }
            }
            exports.sync = sync;
            function pair(srcs, dsts, compare) {
                const link = bind(srcs, dsts, compare);
                void dsts.filter(dst => !link.has(dst)).forEach(dst => void link.set(dst, []));
                return [...link].map(([dst, srcs]) => [
                    srcs,
                    dst
                ]);
                function bind(srcs, dsts, compare) {
                    return srcs.reduce((link, src) => dsts.length === 0 ? link.set(null, concat_1.concat(link.get(null) || [], [src])) : dsts.reduce((m, dst) => m.bind(link => !link.has(dst) && compare(src, dst) ? (void link.set(dst, concat_1.concat(link.get(null) || [], [src])), void link.delete(null), either_1.Left(link)) : either_1.Right(link)), either_1.Right(link)).fmap(link => link.set(null, concat_1.concat(link.get(null) || [], [src]))).extract(link => link), new Map());
                }
            }
            exports.pair = pair;
            function before(parent, children, ref) {
                return void children.map(child => parent.ownerDocument.importNode(child.cloneNode(true), true)).forEach(child => void parent.insertBefore(child, ref));
            }
            function remove(el) {
                return void el.remove();
            }
        },
        {
            'spica/concat': 11,
            'spica/either': 14
        }
    ],
    121: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.title = void 0;
            function title(documents) {
                documents.dst.title = documents.src.title;
            }
            exports.title = title;
        },
        {}
    ],
    122: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._isReplaceable = exports._isRegisterable = exports.url = void 0;
            const router_1 = _dereq_('../../../event/router');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(document, 'pjax:ready', () => void window.history.replaceState(window.history.state, window.document.title));
            function url(location, title, type, source, replaceable) {
                switch (true) {
                case isReplaceable(type, source, replaceable):
                    return void window.history.replaceState({}, title, location.dest.reference);
                case isRegisterable(type, location):
                    return void window.history.pushState({}, title, location.dest.reference);
                default:
                    return;
                }
            }
            exports.url = url;
            function isRegisterable(type, location) {
                if (location.dest.reference === location.orig.reference)
                    return false;
                switch (type) {
                case router_1.RouterEventType.click:
                case router_1.RouterEventType.submit:
                    return true;
                case router_1.RouterEventType.popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isRegisterable = isRegisterable;
            function isReplaceable(type, source, selector) {
                switch (type) {
                case router_1.RouterEventType.click:
                case router_1.RouterEventType.submit:
                    return source.matches(selector.trim() || '_');
                case router_1.RouterEventType.popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isReplaceable = isReplaceable;
        },
        {
            '../../../event/router': 106,
            'typed-dom': 93
        }
    ],
    123: [
        function (_dereq_, module, exports) {
            'use strict';
            var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function () {
                        return m[k];
                    }
                });
            } : function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                o[k2] = m[k];
            });
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('../../data/store/state'), exports);
        },
        { '../../data/store/state': 103 }
    ],
    124: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ClickView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class ClickView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(function* () {
                        return this.finally(typed_dom_1.delegate(document, selector, 'click', ev => {
                            if (!(ev.currentTarget instanceof HTMLAnchorElement))
                                return;
                            if (typeof ev.currentTarget.href !== 'string')
                                return;
                            void listener(ev);
                        }));
                    });
                    void this[coroutine_1.Coroutine.init]();
                }
            }
            exports.ClickView = ClickView;
        },
        {
            'spica/coroutine': 12,
            'typed-dom': 93
        }
    ],
    125: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.NavigationView = void 0;
            const url_1 = _dereq_('../../service/state/url');
            const coroutine_1 = _dereq_('spica/coroutine');
            const url_2 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            class NavigationView extends coroutine_1.Coroutine {
                constructor(window, listener) {
                    super(function* () {
                        return this.finally(typed_dom_1.bind(window, 'popstate', ev => {
                            if (url_2.standardize(window.location.href) === url_1.docurl.href)
                                return;
                            void listener(ev);
                        }));
                    });
                    void this[coroutine_1.Coroutine.init]();
                }
            }
            exports.NavigationView = NavigationView;
        },
        {
            '../../service/state/url': 135,
            'spica/coroutine': 12,
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    126: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ScrollView = void 0;
            const url_1 = _dereq_('../../service/state/url');
            const coroutine_1 = _dereq_('spica/coroutine');
            const url_2 = _dereq_('spica/url');
            const throttle_1 = _dereq_('spica/throttle');
            const typed_dom_1 = _dereq_('typed-dom');
            class ScrollView extends coroutine_1.Coroutine {
                constructor(window, listener) {
                    super(function* () {
                        return this.finally(typed_dom_1.bind(window, 'scroll', throttle_1.debounce(100, ev => {
                            if (new URL(url_2.standardize(window.location.href)).href !== url_1.docurl.href)
                                return;
                            void listener(ev);
                        }), { passive: true }));
                    });
                    void this[coroutine_1.Coroutine.init]();
                }
            }
            exports.ScrollView = ScrollView;
        },
        {
            '../../service/state/url': 135,
            'spica/coroutine': 12,
            'spica/throttle': 86,
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    127: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SubmitView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class SubmitView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(function* () {
                        return this.finally(typed_dom_1.delegate(document, selector, 'submit', ev => {
                            if (!(ev.currentTarget instanceof HTMLFormElement))
                                return;
                            void listener(ev);
                        }));
                    });
                    void this[coroutine_1.Coroutine.init]();
                }
            }
            exports.SubmitView = SubmitView;
        },
        {
            'spica/coroutine': 12,
            'typed-dom': 93
        }
    ],
    128: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.API = void 0;
            const router_1 = _dereq_('./router');
            const process_1 = _dereq_('./state/process');
            const html_1 = _dereq_('../../../lib/html');
            const assign_1 = _dereq_('spica/assign');
            const typed_dom_1 = _dereq_('typed-dom');
            class API {
                static assign(url, option, io = {
                    document: window.document,
                    router: router_1.route
                }) {
                    let result;
                    void click(url, event => result = io.router(new router_1.Config(option), new router_1.RouterEvent(event), process_1.process, io));
                    return result;
                }
                static replace(url, option, io = {
                    document: window.document,
                    router: router_1.route
                }) {
                    let result;
                    void click(url, event => result = io.router(new router_1.Config(assign_1.extend({}, option, { replace: '*' })), new router_1.RouterEvent(event), process_1.process, io));
                    return result;
                }
            }
            exports.API = API;
            function click(url, callback) {
                const el = document.createElement('a');
                el.href = url;
                void html_1.parse('').extract().body.appendChild(el);
                void typed_dom_1.once(el, 'click', callback);
                void typed_dom_1.once(el, 'click', ev => void ev.preventDefault());
                void el.click();
            }
        },
        {
            '../../../lib/html': 138,
            './router': 130,
            './state/process': 132,
            'spica/assign': 6,
            'typed-dom': 93
        }
    ],
    129: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.clear = exports.GUI = void 0;
            const api_1 = _dereq_('./api');
            const click_1 = _dereq_('../module/view/click');
            const submit_1 = _dereq_('../module/view/submit');
            const navigation_1 = _dereq_('../module/view/navigation');
            const scroll_1 = _dereq_('../module/view/scroll');
            const router_1 = _dereq_('./router');
            _dereq_('./state/scroll-restoration');
            const process_1 = _dereq_('./state/process');
            const store_1 = _dereq_('../../application/store');
            const supervisor_1 = _dereq_('spica/supervisor');
            class GUI extends api_1.API {
                constructor(option, io = {
                    document: window.document,
                    router: router_1.route
                }) {
                    super();
                    this.option = option;
                    this.io = io;
                    new View(this.option, io);
                }
                assign(url) {
                    return api_1.API.assign(url, this.option, this.io);
                }
                replace(url) {
                    return api_1.API.replace(url, this.option, this.io);
                }
            }
            exports.GUI = GUI;
            let View = (() => {
                class View {
                    constructor(option, io) {
                        const config = new router_1.Config(option);
                        const router = event => void io.router(config, new router_1.RouterEvent(event), process_1.process, io);
                        void [
                            new click_1.ClickView(io.document, config.link, router),
                            new submit_1.SubmitView(io.document, config.form, router),
                            new navigation_1.NavigationView(window, router),
                            new scroll_1.ScrollView(window, store_1.savePosition)
                        ].forEach((view, i) => void View.resource.kill(`${ i }`) || void View.resource.register(`${ i }`, view));
                    }
                }
                View.resource = new class extends supervisor_1.Supervisor {
                }();
                return View;
            })();
            function clear() {
                void View['resource'].clear();
            }
            exports.clear = clear;
        },
        {
            '../../application/store': 102,
            '../module/view/click': 124,
            '../module/view/navigation': 125,
            '../module/view/scroll': 126,
            '../module/view/submit': 127,
            './api': 128,
            './router': 130,
            './state/process': 132,
            './state/scroll-restoration': 134,
            'spica/supervisor': 85
        }
    ],
    130: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
                function adopt(value) {
                    return value instanceof P ? value : new P(function (resolve) {
                        resolve(value);
                    });
                }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator['throw'](value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._validate = exports.route = exports.RouterEventSource = exports.RouterEvent = exports.Config = void 0;
            const router_1 = _dereq_('../../application/router');
            Object.defineProperty(exports, 'Config', {
                enumerable: true,
                get: function () {
                    return router_1.Config;
                }
            });
            Object.defineProperty(exports, 'RouterEvent', {
                enumerable: true,
                get: function () {
                    return router_1.RouterEvent;
                }
            });
            Object.defineProperty(exports, 'RouterEventSource', {
                enumerable: true,
                get: function () {
                    return router_1.RouterEventSource;
                }
            });
            const url_1 = _dereq_('./state/url');
            const env_1 = _dereq_('../service/state/env');
            const error_1 = _dereq_('../../../lib/error');
            const store_1 = _dereq_('../../application/store');
            const url_2 = _dereq_('spica/url');
            const cancellation_1 = _dereq_('spica/cancellation');
            const maybe_1 = _dereq_('spica/maybe');
            const clock_1 = _dereq_('spica/clock');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'pjax:unload', () => window.history.scrollRestoration = 'auto', true);
            function route(config, event, process, io) {
                switch (event.type) {
                case router_1.RouterEventType.click:
                case router_1.RouterEventType.submit:
                    void store_1.savePosition();
                    break;
                case router_1.RouterEventType.popstate:
                    io.document.title = store_1.loadTitle();
                    break;
                }
                return maybe_1.Just(0).guard(validate(event.request.url, config, event)).bind(() => router_1.scope(config, (({orig, dest}) => ({
                    orig: orig.pathname,
                    dest: dest.pathname
                }))(event.location))).fmap(config => __awaiter(this, void 0, void 0, function* () {
                    void event.original.preventDefault();
                    void process.cast('', new Error(`Aborted.`));
                    const cancellation = new cancellation_1.Cancellation();
                    const kill = process.register('', err => {
                        void kill();
                        void cancellation.cancel(err);
                        return clock_1.never;
                    });
                    const [scripts] = yield env_1.env;
                    window.history.scrollRestoration = 'manual';
                    return router_1.route(config, event, {
                        process: cancellation,
                        scripts
                    }, io).then(m => m.fmap(([ss, p]) => __awaiter(this, void 0, void 0, function* () {
                        return void kill(), void url_1.docurl.sync(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_2.standardize(s.src)).reference)), void (yield p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_2.standardize(s.src)).reference));
                    })).extract()).catch(reason => (void kill(), void url_1.docurl.sync(), window.history.scrollRestoration = 'auto', !cancellation.canceled || reason instanceof error_1.FatalError ? void config.fallback(event.source, reason) : void 0));
                })).extract(() => {
                    void process.cast('', new Error(`Aborted.`));
                    switch (event.type) {
                    case router_1.RouterEventType.click:
                    case router_1.RouterEventType.submit:
                        void url_1.docurl.sync();
                        return false;
                    case router_1.RouterEventType.popstate:
                        if (isHashChange(event.location.dest)) {
                            void url_1.docurl.sync();
                            return false;
                        }
                        void config.fallback(event.source, new Error(`Disabled.`));
                        void url_1.docurl.sync();
                        return true;
                    }
                }, () => true);
            }
            exports.route = route;
            function validate(url, config, event) {
                if (event.original.defaultPrevented)
                    return false;
                switch (event.type) {
                case router_1.RouterEventType.click:
                    return isAccessible(url) && !isHashClick(url) && !isHashChange(url) && !isDownload(event.source) && !hasModifierKey(event.original) && config.filter(event.source);
                case router_1.RouterEventType.submit:
                    return isAccessible(url);
                case router_1.RouterEventType.popstate:
                    return isAccessible(url) && !isHashChange(url);
                default:
                    return false;
                }
                function isAccessible(dest) {
                    const orig = new url_2.URL(url_1.docurl.href);
                    return orig.origin === dest.origin;
                }
                function isHashClick(dest) {
                    const orig = new url_2.URL(url_1.docurl.href);
                    return orig.resource === dest.resource && dest.fragment !== '';
                }
                function isDownload(el) {
                    return el.hasAttribute('download');
                }
                function hasModifierKey(event) {
                    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
                }
            }
            exports._validate = validate;
            function isHashChange(dest) {
                const orig = new url_2.URL(url_1.docurl.href);
                return orig.resource === dest.resource && orig.fragment !== dest.fragment;
            }
        },
        {
            '../../../lib/error': 137,
            '../../application/router': 101,
            '../../application/store': 102,
            '../service/state/env': 131,
            './state/url': 135,
            'spica/cancellation': 8,
            'spica/clock': 10,
            'spica/maybe': 22,
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    131: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.env = void 0;
            const script_1 = _dereq_('./script');
            exports.env = Promise.all([
                script_1.scripts,
                new Promise(r => void setTimeout(r))
            ]);
        },
        { './script': 133 }
    ],
    132: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.process = void 0;
            const supervisor_1 = _dereq_('spica/supervisor');
            exports.process = new class extends supervisor_1.Supervisor {
            }();
        },
        { 'spica/supervisor': 85 }
    ],
    133: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.scripts = void 0;
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.scripts = new Set();
            void typed_dom_1.bind(window, 'pjax:unload', () => void typed_dom_1.apply(document, 'script[src]').forEach(script => void exports.scripts.add(new url_1.URL(url_1.standardize(script.src)).reference)));
        },
        {
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    134: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'unload', () => window.history.scrollRestoration = 'auto', false);
        },
        { 'typed-dom': 93 }
    ],
    135: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.docurl = void 0;
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'hashchange', () => void exports.docurl.sync());
            exports.docurl = new class {
                constructor() {
                    this.url = url_1.standardize(window.location.href);
                }
                get href() {
                    return this.url;
                }
                sync() {
                    this.url = url_1.standardize(window.location.href);
                }
            }();
        },
        {
            'spica/url': 90,
            'typed-dom': 93
        }
    ],
    136: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.serialize = void 0;
            function serialize(form) {
                return Array.from(form.elements).filter(el => {
                    if (el.disabled)
                        return false;
                    switch (el.nodeName.toLowerCase()) {
                    case 'input':
                        switch (el.type.toLowerCase()) {
                        case 'checkbox':
                        case 'radio':
                            return el.checked;
                        case 'submit':
                        case 'button':
                        case 'image':
                        case 'reset':
                        case 'file':
                            return false;
                        default:
                            return true;
                        }
                    case 'select':
                    case 'textarea':
                        return true;
                    default:
                        return false;
                    }
                }).filter(el => typeof el.name === 'string' && typeof el.value === 'string').map(el => [
                    encodeURIComponent(removeInvalidSurrogatePairs(el.name)),
                    encodeURIComponent(removeInvalidSurrogatePairs(el.value))
                ].join('=')).join('&');
                function removeInvalidSurrogatePairs(str) {
                    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '');
                }
            }
            exports.serialize = serialize;
        },
        {}
    ],
    137: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.FatalError = void 0;
            class FatalError extends Error {
                constructor(msg) {
                    super(msg);
                }
            }
            exports.FatalError = FatalError;
            Error.prototype.name = 'Error';
            FatalError.prototype.name = 'FatalError';
        },
        {}
    ],
    138: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._fixNoscript = exports.fix = exports.parse = void 0;
            const maybe_1 = _dereq_('spica/maybe');
            const either_1 = _dereq_('spica/either');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.parse = [
                parseByDOM,
                parseByDoc
            ].reduce((m, f) => m.bind(() => test(f) ? either_1.Left(f) : m), either_1.Right(() => maybe_1.Nothing)).extract(f => html => maybe_1.Just(f(html)));
            function parseByDOM(html) {
                const document = new DOMParser().parseFromString(html, 'text/html');
                void fix(document);
                return document;
            }
            function parseByDoc(html) {
                const document = window.document.implementation.createHTMLDocument('');
                void document.open();
                void document.write(html);
                void document.close();
                void fix(document);
                return document;
            }
            function fix(doc) {
                void fixNoscript(doc).forEach(([src, fixed]) => src.textContent = fixed.textContent);
            }
            exports.fix = fix;
            function fixNoscript(doc) {
                return [...typed_dom_1.apply(doc, 'noscript')].filter(el => el.children.length > 0).map(el => {
                    const clone = el.cloneNode(true);
                    clone.textContent = el.innerHTML;
                    return [
                        el,
                        clone
                    ];
                });
            }
            exports._fixNoscript = fixNoscript;
            function test(parser) {
                try {
                    const html = `
<html lang="en" class="html">
  <head>
    <link href="/">
    <title>&amp;</title>
    <noscript><style>/**/</style></noscript>
  </head>
  <body>
    <noscript>noscript</noscript>
    <a href="/"></a>
    <script>document.head.remove();</script>
    <img src="abc">
  </body>
</html>
`;
                    const doc = parser(html);
                    switch (false) {
                    case doc.title === '&':
                    case !!doc.querySelector('html.html[lang="en"]'):
                    case !!doc.querySelector('head > link').href:
                    case !!doc.querySelector('body > a').href:
                    case !doc.querySelector('head > noscript > *'):
                    case doc.querySelector('script').innerHTML === 'document.head.remove();':
                    case doc.querySelector('img').src.endsWith('abc'):
                    case doc.querySelector('head > noscript').textContent === '<style>/**/</style>':
                    case doc.querySelector('body > noscript').textContent === 'noscript':
                        throw void 0;
                    }
                    return true;
                } catch (_a) {
                    return false;
                }
            }
        },
        {
            'spica/either': 14,
            'spica/maybe': 22,
            'typed-dom': 93
        }
    ],
    139: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._match = exports._expand = exports.compare = exports.router = void 0;
            const url_1 = _dereq_('spica/url');
            const sequence_1 = _dereq_('spica/sequence');
            const curry_1 = _dereq_('spica/curry');
            const flip_1 = _dereq_('spica/flip');
            const cache_1 = _dereq_('spica/cache');
            function router(config) {
                return url => {
                    const {path, pathname} = new url_1.URL(url_1.standardize(url));
                    return sequence_1.Sequence.from(Object.keys(config).filter(([c]) => c === '/').sort().reverse()).filter(curry_1.curry(flip_1.flip(compare))(pathname)).map(pattern => config[pattern]).take(1).extract().pop().call(config, path);
                };
            }
            exports.router = router;
            function compare(pattern, path) {
                const regSegment = /\/|[^/]+\/?/g;
                const regTrailingSlash = /\/$/;
                return sequence_1.Sequence.zip(sequence_1.Sequence.from(expand(pattern)), sequence_1.Sequence.cycle([path])).map(([pattern, path]) => [
                    pattern.match(regSegment) || [],
                    pattern.match(regTrailingSlash) ? path.match(regSegment) || [] : path.replace(regTrailingSlash, '').match(regSegment) || []
                ]).filter(([ps, ss]) => ps.length <= ss.length && sequence_1.Sequence.zip(sequence_1.Sequence.from(ps), sequence_1.Sequence.from(ss)).dropWhile(([a, b]) => match(a, b)).take(1).extract().length === 0).take(1).extract().length > 0;
            }
            exports.compare = compare;
            function expand(pattern) {
                if (pattern.match(/\*\*|[\[\]]/))
                    throw new Error(`Invalid pattern: ${ pattern }`);
                return pattern === '' ? [pattern] : sequence_1.Sequence.from(pattern.match(/{[^{}]*}|.[^{]*/g)).map(p => p.match(/^{[^{}]*}$/) ? p.slice(1, -1).split(',') : [p]).mapM(sequence_1.Sequence.from).map(ps => ps.join('')).bind(p => p === pattern ? sequence_1.Sequence.from([p]) : sequence_1.Sequence.from(expand(p))).unique().extract();
            }
            exports._expand = expand;
            const cache = new cache_1.Cache(100);
            function match(pattern, segment) {
                if (segment[0] === '.' && [...'?*'].includes(pattern[0]))
                    return false;
                const id = `${ pattern }:${ segment }`;
                return cache.has(id) ? cache.get(id) : cache.set(id, match(optimize(pattern), segment));
                function match(pattern, segment) {
                    const [p = '', ...ps] = [...pattern];
                    const [s = '', ...ss] = [...segment];
                    switch (p) {
                    case '':
                        return s === '';
                    case '?':
                        return s !== '' && s !== '/' && match(ps.join(''), ss.join(''));
                    case '*':
                        return s === '/' ? match(ps.join(''), segment) : sequence_1.Sequence.zip(sequence_1.Sequence.cycle([ps.join('')]), sequence_1.Sequence.from(segment).tails().map(ss => ss.join(''))).filter(([a, b]) => match(a, b)).take(1).extract().length > 0;
                    default:
                        return s === p && match(ps.join(''), ss.join(''));
                    }
                }
                function optimize(pattern) {
                    const pat = pattern.replace(/\*(\?+)\*?/g, '$1*');
                    return pat === pattern ? pat : optimize(pat);
                }
            }
            exports._match = match;
        },
        {
            'spica/cache': 7,
            'spica/curry': 13,
            'spica/flip': 16,
            'spica/sequence': 83,
            'spica/url': 90
        }
    ],
    'pjax-api': [
        function (_dereq_, module, exports) {
            'use strict';
            var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                Object.defineProperty(o, k2, {
                    enumerable: true,
                    get: function () {
                        return m[k];
                    }
                });
            } : function (o, m, k, k2) {
                if (k2 === undefined)
                    k2 = k;
                o[k2] = m[k];
            });
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            var export_1 = _dereq_('./src/export');
            Object.defineProperty(exports, 'default', {
                enumerable: true,
                get: function () {
                    return export_1.default;
                }
            });
            __exportStar(_dereq_('./src/export'), exports);
        },
        { './src/export': 100 }
    ]
}, {}, [
    1,
    2,
    3,
    'pjax-api'
]);
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return require('pjax-api');
}));