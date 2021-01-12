/*! pjax-api v3.33.1 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
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
            exports.isArray = exports.ObjectValues = exports.ObjectSetPrototypeOf = exports.ObjectSeal = exports.ObjectPreventExtensions = exports.ObjectKeys = exports.isSealed = exports.isFrozen = exports.isExtensible = exports.ObjectIs = exports.ObjectGetPrototypeOf = exports.ObjectGetOwnPropertySymbols = exports.ObjectGetOwnPropertyNames = exports.ObjectGetOwnPropertyDescriptors = exports.ObjectGetOwnPropertyDescriptor = exports.ObjectFromEntries = exports.ObjectFreeze = exports.ObjectEntries = exports.ObjectDefineProperty = exports.ObjectDefineProperties = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.SymbolKeyFor = exports.SymbolFor = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.NaN = void 0;
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
            exports.ObjectFromEntries = Object.fromEntries;
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
            exports.join = exports.splice = exports.push = exports.pop = exports.unshift = exports.shift = exports.indexOf = void 0;
            const global_1 = _dereq_('./global');
            function indexOf(as, a) {
                return a === a ? as.indexOf(a) : as.findIndex(a => a !== a);
            }
            exports.indexOf = indexOf;
            function shift(as, count) {
                if (count < 0)
                    throw new Error('Unexpected negative number');
                return count === global_1.undefined ? [
                    as.shift(),
                    as
                ] : [
                    splice(as, 0, count),
                    as
                ];
            }
            exports.shift = shift;
            function unshift(as, bs) {
                if ('length' in as) {
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
                return count === global_1.undefined ? [
                    as,
                    as.pop()
                ] : [
                    as,
                    splice(as, as.length - count, count)
                ];
            }
            exports.pop = pop;
            function push(as, bs) {
                if ('length' in bs) {
                    for (let i = 0, len = bs.length; i < len; ++i) {
                        as.push(bs[i]);
                    }
                } else {
                    for (const b of bs) {
                        as.push(b);
                    }
                }
                return as;
            }
            exports.push = push;
            function splice(as, index, count, ...inserts) {
                if (count === 0 && inserts.length === 0)
                    return [];
                count = count > as.length ? as.length : count;
                switch (index) {
                case 0:
                    switch (count) {
                    case 0:
                        return [
                            [],
                            unshift(inserts, as)
                        ][0];
                    case 1:
                        return as.length === 0 ? [
                            [],
                            unshift(inserts, as)
                        ][0] : [
                            [as.shift()],
                            unshift(inserts, as)
                        ][0];
                    case global_1.undefined:
                        if (as.length > 1 || arguments.length > 2)
                            break;
                        return as.length === 0 ? [] : splice(as, index, 1);
                    }
                    break;
                case -1:
                case as.length - 1:
                    switch (count) {
                    case 1:
                        return as.length === 0 ? [
                            [],
                            push(as, inserts)
                        ][0] : [
                            [as.pop()],
                            push(as, inserts)
                        ][0];
                    case global_1.undefined:
                        if (as.length > 1 || arguments.length > 2)
                            break;
                        return as.length === 0 ? [] : splice(as, index, 1);
                    }
                    break;
                case as.length:
                case global_1.Infinity:
                    return [
                        [],
                        push(as, inserts)
                    ][0];
                }
                return arguments.length > 2 ? as.splice(index, count, ...inserts) : as.splice(index);
            }
            exports.splice = splice;
            function join(as, sep = '') {
                let acc = '';
                for (let i = 0; i < as.length; ++i) {
                    acc += i === 0 ? as[i] : sep + as[i];
                }
                return acc;
            }
            exports.join = join;
        },
        { './global': 20 }
    ],
    6: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.template = exports.inherit = exports.merge = exports.extend = exports.clone = exports.assign = void 0;
            const type_1 = _dereq_('./type');
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const array_1 = _dereq_('./array');
            exports.assign = template((prop, target, source) => target[prop] = source[prop]);
            exports.clone = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.clone(empty(source[prop]), source[prop]);
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
                        return target[prop] = exports.extend(empty(source[prop]), source[prop]);
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
                        return target[prop] = exports.merge(empty(source[prop]), source[prop]);
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
                        return target[prop] = alias_1.hasOwnProperty(target, prop) ? exports.inherit(target[prop], source[prop]) : exports.inherit(alias_1.ObjectCreate(target[prop]), source[prop]);
                    default:
                        return target[prop] = alias_1.ObjectCreate(source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            function template(strategy) {
                return walk;
                function walk(target, ...sources) {
                    if (type_1.isPrimitive(target))
                        return target;
                    for (let i = 0; i < sources.length; ++i) {
                        const source = sources[i];
                        if (source === target)
                            continue;
                        if (type_1.isPrimitive(source))
                            continue;
                        const keys = alias_1.ObjectKeys(source);
                        for (let i = 0; i < keys.length; ++i) {
                            strategy(keys[i], target, source);
                        }
                    }
                    return target;
                }
            }
            exports.template = template;
            function empty(source) {
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
            './global': 20,
            './type': 91
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
                constructor(capacity, callback = () => global_1.undefined, opts = {}) {
                    this.capacity = capacity;
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
                    this.nullish = false;
                    if (capacity > 0 === false)
                        throw new Error(`Spica: Cache: Cache capacity must be greater than 0.`);
                    assign_1.extend(this.settings, opts);
                    const {stats, entries} = this.settings.data;
                    const LFU = stats[1].slice(0, capacity);
                    const LRU = stats[0].slice(0, capacity - LFU.length);
                    this.stats = {
                        LRU,
                        LFU
                    };
                    this.store = new global_1.Map(entries);
                    if (!opts.data)
                        return;
                    for (const k of array_1.push(stats[1].slice(LFU.length), stats[0].slice(LRU.length))) {
                        this.store.delete(k);
                    }
                    if (this.store.size !== LFU.length + LRU.length)
                        throw new Error(`Spica: Cache: Size of stats and entries is not matched.`);
                    if (![
                            ...LFU,
                            ...LRU
                        ].every(k => this.store.has(k)))
                        throw new Error(`Spica: Cache: Keys of stats and entries is not matched.`);
                }
                put(key, value) {
                    !this.nullish && value === global_1.undefined ? this.nullish = true : global_1.undefined;
                    const hit = this.store.has(key);
                    if (hit && this.access(key))
                        return this.store.set(key, value), true;
                    const {LRU, LFU} = this.stats;
                    if (LRU.length + LFU.length === this.capacity && LRU.length < LFU.length) {
                        const key = LFU.pop();
                        const val = this.store.get(key);
                        this.store.delete(key);
                        this.callback(key, val);
                    }
                    LRU.unshift(key);
                    this.store.set(key, value);
                    if (LRU.length + LFU.length > this.capacity) {
                        const key = LRU.pop();
                        const val = this.store.get(key);
                        this.store.delete(key);
                        this.callback(key, val);
                    }
                    return false;
                }
                set(key, value) {
                    this.put(key, value);
                    return this;
                }
                get(key) {
                    const val = this.store.get(key);
                    const hit = val !== global_1.undefined || this.nullish && this.store.has(key);
                    return hit && this.access(key) ? val : global_1.undefined;
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
                        this.store.delete(array_1.splice(stat, index, 1)[0]);
                        if (this.settings.ignore.delete)
                            return true;
                        this.callback(key, val);
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
                    for (const kv of store) {
                        this.callback(kv[0], kv[1]);
                    }
                }
                get size() {
                    return this.store.size;
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
                    return this.accessLFU(key) || this.accessLRU(key);
                }
                accessLRU(key) {
                    const {LRU} = this.stats;
                    const index = array_1.indexOf(LRU, key);
                    if (index === -1)
                        return false;
                    const {LFU} = this.stats;
                    LFU.unshift(array_1.splice(LRU, index, 1)[0]);
                    return true;
                }
                accessLFU(key) {
                    const {LFU} = this.stats;
                    const index = array_1.indexOf(LFU, key);
                    if (index === -1)
                        return false;
                    if (index === 0)
                        return true;
                    LFU.unshift(array_1.splice(LFU, index, 1)[0]);
                    return true;
                }
            }
            exports.Cache = Cache;
        },
        {
            './array': 5,
            './assign': 6,
            './global': 20
        }
    ],
    8: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Cancellation = void 0;
            const global_1 = _dereq_('./global');
            const function_1 = _dereq_('./function');
            const noop_1 = _dereq_('./noop');
            const promise_1 = _dereq_('./promise');
            const exception_1 = _dereq_('./exception');
            const maybe_1 = _dereq_('./monad/maybe');
            const either_1 = _dereq_('./monad/either');
            const internal = Symbol.for('spica/cancellation::internal');
            class Cancellation extends promise_1.AtomicPromise {
                constructor(cancelees = []) {
                    super(res => resolve = res);
                    var resolve;
                    this[internal] = new Internal(resolve);
                    for (const cancellee of cancelees) {
                        cancellee.register(this.cancel);
                    }
                }
                get alive() {
                    return this[internal].alive;
                }
                get canceled() {
                    return this[internal].canceled;
                }
                get register() {
                    return listener => this[internal].register(listener);
                }
                get cancel() {
                    return reason => this[internal].cancel(reason);
                }
                get close() {
                    return reason => this[internal].close(reason);
                }
                get promise() {
                    return val => this[internal].promise(val);
                }
                get maybe() {
                    return val => this[internal].maybe(val);
                }
                get either() {
                    return val => this[internal].either(val);
                }
            }
            exports.Cancellation = Cancellation;
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
                register(listener) {
                    if (!this.alive) {
                        this.canceled && handler(this.reason);
                        return noop_1.noop;
                    }
                    this.listeners.add(handler);
                    return function_1.once(() => void this.listeners.delete(handler));
                    function handler(reason) {
                        try {
                            listener(reason);
                        } catch (reason) {
                            exception_1.causeAsyncException(reason);
                        }
                    }
                }
                cancel(reason) {
                    if (!this.available)
                        return;
                    this.available = false;
                    this.reason = reason;
                    for (const listener of this.listeners) {
                        listener(reason);
                    }
                    this.resolve(this.reason);
                    this.alive = false;
                }
                close(reason) {
                    if (!this.available)
                        return;
                    this.available = false;
                    this.resolve(promise_1.AtomicPromise.reject(reason));
                    this.alive = false;
                }
                promise(val) {
                    return this.canceled ? promise_1.AtomicPromise.reject(this.reason) : promise_1.AtomicPromise.resolve(val);
                }
                maybe(val) {
                    return maybe_1.Just(val).bind(val => this.canceled ? maybe_1.Nothing : maybe_1.Just(val));
                }
                either(val) {
                    return either_1.Right(val).bind(val => this.canceled ? either_1.Left(this.reason) : either_1.Right(val));
                }
            }
        },
        {
            './exception': 16,
            './function': 18,
            './global': 20,
            './monad/either': 28,
            './monad/maybe': 32,
            './noop': 82,
            './promise': 84
        }
    ],
    9: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Channel = void 0;
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const success = promise_1.AtomicPromise.resolve();
            const fail = () => promise_1.AtomicPromise.reject(new Error('Spica: Channel: Closed.'));
            const internal = Symbol.for('spica/channel::internal');
            class Channel {
                constructor(size = 0) {
                    this[internal] = new Internal(size);
                }
                get alive() {
                    return this[internal].alive;
                }
                close(finalizer) {
                    var _a, _b;
                    if (!this.alive)
                        return;
                    const core = this[internal];
                    const {buffer, producers, consumers} = core;
                    core.alive = false;
                    for (let i = 0; producers[i] || consumers[i]; ++i) {
                        (_a = producers[i]) === null || _a === void 0 ? void 0 : _a.bind(fail());
                        (_b = consumers[i]) === null || _b === void 0 ? void 0 : _b.bind(fail());
                    }
                    consumers.splice(0, consumers.length);
                    if (finalizer) {
                        promise_1.AtomicPromise.all([
                            ...buffer.splice(0, buffer.length),
                            ...producers.splice(0, producers.length)
                        ]).then(finalizer);
                    } else {
                        buffer.splice(0, buffer.length);
                        producers.splice(0, producers.length);
                    }
                }
                put(msg) {
                    if (!this.alive)
                        return fail();
                    const {size, buffer, producers, consumers} = this[internal];
                    switch (true) {
                    case buffer.length < size:
                    case consumers.length > 0:
                        buffer.push(msg);
                        consumers.length > 0 && consumers.shift().bind(buffer.shift());
                        return success;
                    default:
                        return producers[producers.push(new future_1.AtomicFuture()) - 1].then(() => this.put(msg));
                    }
                }
                take() {
                    if (!this.alive)
                        return fail();
                    const {buffer, producers, consumers} = this[internal];
                    switch (true) {
                    case buffer.length > 0:
                        const msg = buffer.shift();
                        producers.length > 0 && producers.shift().bind();
                        return promise_1.AtomicPromise.resolve(msg);
                    case producers.length > 0:
                        const consumer = consumers[consumers.push(new future_1.AtomicFuture()) - 1];
                        producers.shift().bind();
                        return consumer.then();
                    default:
                        return consumers[consumers.push(new future_1.AtomicFuture()) - 1].then();
                    }
                }
                async *[Symbol.asyncIterator]() {
                    try {
                        while (this.alive) {
                            yield this.take();
                        }
                    } catch (reason) {
                        if (this.alive)
                            throw reason;
                    }
                    return;
                }
            }
            exports.Channel = Channel;
            class Internal {
                constructor(size = 0) {
                    this.size = size;
                    this.alive = true;
                    this.buffer = [];
                    this.producers = [];
                    this.consumers = [];
                }
            }
        },
        {
            './future': 19,
            './promise': 84
        }
    ],
    10: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.tick = void 0;
            const global_1 = _dereq_('./global');
            const exception_1 = _dereq_('./exception');
            let queue = [];
            let jobs = [];
            let index = 0;
            const scheduler = Promise.resolve();
            function tick(cb) {
                index === 0 && scheduler.then(run);
                index++ === queue.length ? queue.push(cb) : queue[index - 1] = cb;
            }
            exports.tick = tick;
            function run() {
                const count = index;
                [index, queue, jobs] = [
                    0,
                    jobs,
                    queue
                ];
                for (let i = 0; i < count; ++i) {
                    try {
                        jobs[i]();
                        jobs[i] = global_1.undefined;
                    } catch (reason) {
                        exception_1.causeAsyncException(reason);
                    }
                }
                jobs.length > 1000 && count < jobs.length * 0.5 && jobs.splice(global_1.Math.floor(jobs.length * 0.9), jobs.length);
            }
        },
        {
            './exception': 16,
            './global': 20
        }
    ],
    11: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.never = exports.wait = exports.clock = exports.tick = void 0;
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
            './clock.tick': 10,
            './global': 20,
            './promise': 84
        }
    ],
    12: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Copropagator = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const coroutine_1 = _dereq_('./coroutine');
            const promise_1 = _dereq_('./promise');
            const clock_1 = _dereq_('./clock');
            class Copropagator extends coroutine_1.Coroutine {
                constructor(coroutines, reducer = results => results[0], opts) {
                    super(async function* () {
                        void this.then(result => {
                            for (const co of coroutines) {
                                void co[coroutine_1.Coroutine.exit](result);
                            }
                        }, reason => {
                            const rejection = promise_1.AtomicPromise.reject(reason);
                            for (const co of coroutines) {
                                void co[coroutine_1.Coroutine.exit](rejection);
                            }
                        });
                        void all(coroutines).then(results => results.length === 0 ? void this[coroutine_1.Coroutine.terminate](new global_1.Error(`Spica: Copropagator: No result.`)) : void this[coroutine_1.Coroutine.exit](reducer(results)), reason => void this[coroutine_1.Coroutine.terminate](reason));
                        return clock_1.never;
                    }, {
                        delay: false,
                        ...opts
                    });
                }
            }
            exports.Copropagator = Copropagator;
            function all(sources, memory) {
                const before = alias_1.isArray(sources) ? sources : [...sources];
                return promise_1.AtomicPromise.all(before).then(values => {
                    const after = alias_1.isArray(sources) ? sources : [...sources];
                    const same = after.length === before.length && after.every((_, i) => after[i] === before[i]);
                    if (!memory && same)
                        return values;
                    memory = memory || new global_1.Map();
                    for (let i = 0; i < values.length; ++i) {
                        void memory.set(before[i], values[i]);
                    }
                    return same ? [...memory.values()] : all(after, memory);
                });
            }
        },
        {
            './alias': 4,
            './clock': 11,
            './coroutine': 13,
            './global': 20,
            './promise': 84
        }
    ],
    13: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a, _b;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isCoroutine = exports.Coroutine = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const channel_1 = _dereq_('./channel');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const exception_1 = _dereq_('./exception');
            const noop_1 = _dereq_('./noop');
            const alive = Symbol.for('spica/Coroutine.alive');
            const init = Symbol.for('spica/Coroutine.init');
            const exit = Symbol.for('spica/Coroutine.exit');
            const terminate = Symbol.for('spica/Coroutine.terminate');
            const port = Symbol.for('spica/Coroutine.port');
            const internal = Symbol.for('spica/coroutine::internal');
            class Coroutine extends promise_1.AtomicPromise {
                constructor(gen, opts = {}) {
                    super(resolve => res = resolve);
                    this[_a] = new Port(this);
                    var res;
                    this[internal] = new Internal(opts);
                    let count = 0;
                    this[Coroutine.init] = async () => {
                        const core = this[internal];
                        if (!core.alive)
                            return;
                        if (count !== 0)
                            return;
                        let reply = noop_1.noop;
                        try {
                            const iter = gen.call(this);
                            while (core.alive) {
                                const [[msg, rpy]] = ++count === 1 ? [[
                                        global_1.undefined,
                                        noop_1.noop
                                    ]] : await global_1.Promise.all([
                                    core.settings.size < 0 ? [
                                        global_1.undefined,
                                        noop_1.noop
                                    ] : core.sendBuffer.take(),
                                    global_1.Promise.all([
                                        core.settings.resume(),
                                        core.settings.interval > 0 ? clock_1.wait(core.settings.interval) : global_1.undefined
                                    ])
                                ]);
                                reply = rpy;
                                if (!core.alive)
                                    break;
                                const result = await iter.next(msg);
                                if (!result.done) {
                                    reply({ ...result });
                                    await core.recvBuffer.put({ ...result });
                                    continue;
                                } else {
                                    core.alive = false;
                                    reply({ ...result });
                                    core.recvBuffer.put({ ...result });
                                    core.result.bind(result);
                                    return;
                                }
                            }
                            reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
                        } catch (reason) {
                            reply(promise_1.AtomicPromise.reject(reason));
                            this[Coroutine.terminate](reason);
                        }
                    };
                    const core = this[internal];
                    res(core.result.then(({value}) => value));
                    if (core.settings.trigger !== global_1.undefined) {
                        for (const prop of global_1.Array().concat(core.settings.trigger)) {
                            if (prop in this && this.hasOwnProperty(prop))
                                continue;
                            if (prop in this) {
                                alias_1.ObjectDefineProperty(this, prop, {
                                    set(value) {
                                        delete this[prop];
                                        this[prop] = value;
                                        this[init]();
                                    },
                                    get() {
                                        delete this[prop];
                                        this[init]();
                                        return this[prop];
                                    },
                                    enumerable: true,
                                    configurable: true
                                });
                            } else {
                                const desc = alias_1.ObjectGetOwnPropertyDescriptor(this, prop) || {
                                    value: this[prop],
                                    enumerable: true,
                                    configurable: true,
                                    writable: true
                                };
                                alias_1.ObjectDefineProperty(this, prop, {
                                    set(value) {
                                        alias_1.ObjectDefineProperty(this, prop, {
                                            ...desc,
                                            value
                                        });
                                        this[init]();
                                    },
                                    get() {
                                        return this[prop];
                                    },
                                    enumerable: true,
                                    configurable: true
                                });
                            }
                        }
                    }
                    if (this[internal].settings.run) {
                        this[internal].settings.delay ? clock_1.tick(this[Coroutine.init]) : this[Coroutine.init]();
                    }
                }
                get [alive]() {
                    return this[internal].alive;
                }
                [exit](result) {
                    if (!this[internal].alive)
                        return;
                    promise_1.AtomicPromise.resolve(result).then(result => {
                        const core = this[internal];
                        if (!core.alive)
                            return;
                        core.alive = false;
                        core.recvBuffer.put({
                            value: global_1.undefined,
                            done: true
                        });
                        core.result.bind({ value: result });
                    }, reason => {
                        const core = this[internal];
                        if (!core.alive)
                            return;
                        core.alive = false;
                        core.recvBuffer.put({
                            value: global_1.undefined,
                            done: true
                        });
                        core.result.bind(promise_1.AtomicPromise.reject(reason));
                    });
                }
                [terminate](reason) {
                    return this[exit](promise_1.AtomicPromise.reject(reason));
                }
                async *[Symbol.asyncIterator]() {
                    const core = this[internal];
                    const port = this[Coroutine.port];
                    while (core.alive) {
                        const result = await port.recv();
                        if (result.done)
                            return result.value;
                        yield result.value;
                    }
                    return this;
                }
            }
            exports.Coroutine = Coroutine;
            _a = port;
            Coroutine.alive = alive;
            Coroutine.init = init;
            Coroutine.exit = exit;
            Coroutine.terminate = terminate;
            Coroutine.port = port;
            class Internal {
                constructor(opts) {
                    this.opts = opts;
                    this.settings = assign_1.extend({
                        run: true,
                        delay: true,
                        size: -1,
                        interval: 0,
                        resume: () => global_1.undefined,
                        trigger: global_1.undefined
                    }, this.opts);
                    this.alive = true;
                    this.reception = 0;
                    this.sendBuffer = this.settings.size >= 0 ? new channel_1.Channel(this.settings.size) : global_1.undefined;
                    this.recvBuffer = this.settings.size >= 0 ? new channel_1.Channel(0) : new BroadcastChannel();
                    this.result = new future_1.AtomicFuture();
                    this.result.finally(() => {
                        var _c;
                        (_c = this.sendBuffer) === null || _c === void 0 ? void 0 : _c.close(msgs => {
                            while (msgs.length > 0) {
                                const [, reply] = msgs.shift();
                                try {
                                    reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
                                } catch (reason) {
                                    exception_1.causeAsyncException(reason);
                                }
                            }
                        });
                        this.recvBuffer.close();
                    });
                }
            }
            class Port {
                constructor(co) {
                    this[internal] = { co };
                }
                ask(msg) {
                    const core = this[internal].co[internal];
                    if (!core.alive)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
                    if (core.settings.size < 0)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
                    core.settings.size >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
                    const future = new future_1.Future();
                    core.sendBuffer.put([
                        msg,
                        future.bind
                    ]);
                    ++core.reception;
                    return global_1.Promise.all([
                        future,
                        core.recvBuffer.take()
                    ]).then(([result]) => result.done ? core.result.then(({value}) => ({
                        ...result,
                        value
                    })) : { ...result });
                }
                recv() {
                    const core = this[internal].co[internal];
                    if (!core.alive)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
                    ++core.reception;
                    return global_1.Promise.resolve(core.recvBuffer.take()).then(result => result.done ? core.result.then(({value}) => ({
                        ...result,
                        value
                    })) : { ...result });
                }
                send(msg) {
                    const core = this[internal].co[internal];
                    if (!core.alive)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
                    if (core.settings.size < 0)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
                    core.settings.size >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
                    const future = new future_1.Future();
                    return global_1.Promise.resolve(core.sendBuffer.put([
                        msg,
                        future.bind
                    ]));
                }
                connect(com) {
                    const core = this[internal].co[internal];
                    if (!core.alive)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
                    return (async () => {
                        core.settings.size >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
                        const iter = com.call(this[internal].co);
                        let reply;
                        while (true) {
                            const result = await iter.next(reply);
                            if (result.done)
                                return result.value;
                            reply = (await this.ask(result.value)).value;
                        }
                    })();
                }
            }
            function isCoroutine(target) {
                return typeof target === 'object' && target !== null && typeof target.constructor === 'function' && typeof target.constructor['alive'] === 'symbol' && typeof target[target.constructor['alive']] === 'boolean' && typeof target.constructor['init'] === 'symbol' && typeof target[target.constructor['init']] === 'function' && typeof target.constructor['exit'] === 'symbol' && typeof target[target.constructor['exit']] === 'function' && typeof target.constructor['terminate'] === 'symbol' && typeof target[target.constructor['terminate']] === 'function' && typeof target.constructor['port'] === 'symbol' && typeof target[target.constructor['port']] === 'object';
            }
            exports.isCoroutine = isCoroutine;
            class BroadcastChannel {
                constructor() {
                    this[_b] = new BroadcastChannel.Internal();
                }
                get alive() {
                    return this[internal].alive;
                }
                close(finalizer) {
                    var _c;
                    if (!this.alive)
                        return;
                    const core = this[internal];
                    const {consumers} = core;
                    core.alive = false;
                    for (let i = 0; consumers[i]; ++i) {
                        (_c = consumers[i]) === null || _c === void 0 ? void 0 : _c.bind(BroadcastChannel.fail());
                    }
                    consumers.splice(0, consumers.length);
                    if (finalizer) {
                        finalizer([]);
                    }
                }
                put(msg) {
                    if (!this.alive)
                        return BroadcastChannel.fail();
                    const {consumers} = this[internal];
                    while (consumers.length > 0) {
                        consumers.shift().bind(msg);
                    }
                    return BroadcastChannel.success;
                }
                take() {
                    if (!this.alive)
                        return BroadcastChannel.fail();
                    const {consumers} = this[internal];
                    return consumers[consumers.push(new future_1.AtomicFuture()) - 1].then();
                }
            }
            _b = internal;
            (function (BroadcastChannel) {
                BroadcastChannel.success = promise_1.AtomicPromise.resolve();
                BroadcastChannel.fail = () => promise_1.AtomicPromise.reject(new global_1.Error('Spica: Channel: Closed.'));
                class Internal {
                    constructor() {
                        this.alive = true;
                        this.consumers = [];
                    }
                }
                BroadcastChannel.Internal = Internal;
            }(BroadcastChannel || (BroadcastChannel = {})));
        },
        {
            './alias': 4,
            './assign': 6,
            './channel': 9,
            './clock': 11,
            './exception': 16,
            './future': 19,
            './global': 20,
            './noop': 82,
            './promise': 84
        }
    ],
    14: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uncurry = exports.curry = void 0;
            const global_1 = _dereq_('./global');
            const array_1 = _dereq_('./array');
            exports.curry = f => curry_(f, f.length);
            function curry_(f, arity, ...xs) {
                let g;
                return xs.length < arity ? (...ys) => curry_(g = g || xs.length && f.bind(global_1.undefined, ...xs) || f, arity - xs.length, ...ys) : f(...xs);
            }
            const uncurry = f => uncurry_(f);
            exports.uncurry = uncurry;
            function uncurry_(f) {
                const arity = f.length;
                return (...xs) => arity === 0 || xs.length < 2 || xs.length <= arity ? f(...xs) : uncurry_(f(...array_1.shift(xs, arity)[0]))(...xs);
            }
        },
        {
            './array': 5,
            './global': 20
        }
    ],
    15: [
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
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/either'), exports);
        },
        { './monad/either': 28 }
    ],
    16: [
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
    17: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.flip = void 0;
            function flip(f) {
                const arity = f.length;
                return arity > 1 ? (b, a) => f(a, b) : (b, ...as) => as.length === 0 ? a => f(a)(b) : f(as[0])(b);
            }
            exports.flip = flip;
        },
        {}
    ],
    18: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.run = exports.once = exports.clear = exports.mapReturn = exports.mapParameters = void 0;
            const global_1 = _dereq_('./global');
            const noop_1 = _dereq_('./noop');
            function mapParameters(f, g) {
                return (...as) => f(...g(...as));
            }
            exports.mapParameters = mapParameters;
            function mapReturn(f, g) {
                return (...as) => g(f(...as));
            }
            exports.mapReturn = mapReturn;
            function clear(f) {
                return (...as) => void f(...as);
            }
            exports.clear = clear;
            function once(f) {
                return (...as) => {
                    if (f === noop_1.noop)
                        return;
                    f(...as);
                    f = noop_1.noop;
                    as = [];
                };
            }
            exports.once = once;
            function run(fs) {
                const gs = global_1.Array(fs.length);
                try {
                    for (let i = 0; i < fs.length; ++i) {
                        gs[i] = fs[i]();
                    }
                } catch (reason) {
                    for (let i = 0; gs[i]; ++i) {
                        gs[i]();
                    }
                    throw reason;
                }
                return once(() => {
                    for (let i = 0; gs[i]; ++i) {
                        gs[i]();
                    }
                });
            }
            exports.run = run;
        },
        {
            './global': 20,
            './noop': 82
        }
    ],
    19: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a, _b;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.AtomicFuture = exports.Future = void 0;
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            const internal = Symbol.for('spica/promise::internal');
            class Future {
                constructor(strict = true) {
                    this[Symbol.toStringTag] = 'Promise';
                    this[_a] = new promise_1.Internal();
                    this.bind = value => {
                        const core = this[internal];
                        if (!core.isPending && !strict)
                            return this;
                        if (!core.isPending)
                            throw new Error(`Spica: Future: Cannot rebind a value.`);
                        core.resolve(value);
                        core.resume();
                        return this;
                    };
                }
                static get [Symbol.species]() {
                    return global_1.Promise;
                }
                then(onfulfilled, onrejected) {
                    return new global_1.Promise((resolve, reject) => this[internal].then(onfulfilled, onrejected, resolve, reject));
                }
                catch(onrejected) {
                    return this.then(global_1.undefined, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.Future = Future;
            _a = internal;
            class AtomicFuture {
                constructor(strict = true) {
                    this[Symbol.toStringTag] = 'Promise';
                    this[_b] = new promise_1.Internal();
                    this.bind = value => {
                        if (!this[internal].isPending && !strict)
                            return this;
                        if (!this[internal].isPending)
                            throw new Error(`Spica: AtomicFuture: Cannot rebind a value.`);
                        this[internal].resolve(value);
                        this[internal].resume();
                        return this;
                    };
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
                then(onfulfilled, onrejected) {
                    return new promise_1.AtomicPromise((resolve, reject) => this[internal].then(onfulfilled, onrejected, resolve, reject));
                }
                catch(onrejected) {
                    return this.then(global_1.undefined, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicFuture = AtomicFuture;
            _b = internal;
        },
        {
            './global': 20,
            './promise': 84
        }
    ],
    20: [
        function (_dereq_, module, exports) {
            'use strict';
            const global = void 0 || typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || Function('return this')();
            eval('global.global = global');
            module.exports = global;
        },
        {}
    ],
    21: [
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
    22: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.HList = void 0;
            const array_1 = _dereq_('./array');
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
                    return array_1.unshift([this.head], this.tail.tuple());
                }
            }
        },
        { './array': 5 }
    ],
    23: [
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
        { './global': 20 }
    ],
    24: [
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
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/maybe'), exports);
        },
        { './monad/maybe': 32 }
    ],
    25: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.memoize = void 0;
            const global_1 = _dereq_('./global');
            function memoize(f, identify = (...as) => as[0], memory) {
                if (typeof identify === 'object')
                    return memoize(f, global_1.undefined, identify);
                if (memory === global_1.undefined)
                    return memoize(f, identify, new global_1.Map());
                let nullish = false;
                return (...as) => {
                    const b = identify(...as);
                    let z = memory.get(b);
                    if (z !== global_1.undefined || nullish && memory.has(b))
                        return z;
                    z = f(...as);
                    nullish = nullish || z === global_1.undefined;
                    memory.set(b, z);
                    return z;
                };
            }
            exports.memoize = memoize;
        },
        { './global': 20 }
    ],
    26: [
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
            '../curry': 14,
            './functor': 29
        }
    ],
    27: [
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
            '../promise': 84,
            './monad': 33
        }
    ],
    28: [
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
            var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
                Object.defineProperty(o, 'default', {
                    enumerable: true,
                    value: v
                });
            } : function (o, v) {
                o['default'] = v;
            });
            var __importStar = this && this.__importStar || function (mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
                            __createBinding(result, mod, k);
                __setModuleDefault(result, mod);
                return result;
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Right = exports.Left = exports.Either = void 0;
            const Monad = __importStar(_dereq_('./either.impl'));
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
        { './either.impl': 27 }
    ],
    29: [
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
        { './lazy': 30 }
    ],
    30: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Lazy = void 0;
            const global_1 = _dereq_('../global');
            class Lazy {
                constructor(thunk) {
                    this.thunk = thunk;
                    this.memory_ = global_1.undefined;
                }
                evaluate() {
                    return this.memory_ ? this.memory_ : this.memory_ = this.thunk();
                }
            }
            exports.Lazy = Lazy;
        },
        { '../global': 20 }
    ],
    31: [
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
            '../promise': 84,
            './monadplus': 34
        }
    ],
    32: [
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
            var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
                Object.defineProperty(o, 'default', {
                    enumerable: true,
                    value: v
                });
            } : function (o, v) {
                o['default'] = v;
            });
            var __importStar = this && this.__importStar || function (mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
                            __createBinding(result, mod, k);
                __setModuleDefault(result, mod);
                return result;
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Nothing = exports.Just = exports.Maybe = void 0;
            const Monad = __importStar(_dereq_('./maybe.impl'));
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
        { './maybe.impl': 31 }
    ],
    33: [
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
        { './applicative': 26 }
    ],
    34: [
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
        { './monad': 33 }
    ],
    35: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Sequence = void 0;
            _dereq_('./sequence/member/static/resume');
            _dereq_('./sequence/member/static/from');
            _dereq_('./sequence/member/static/cycle');
            _dereq_('./sequence/member/static/random');
            _dereq_('./sequence/member/static/concat');
            _dereq_('./sequence/member/static/zip');
            _dereq_('./sequence/member/static/difference');
            _dereq_('./sequence/member/static/union');
            _dereq_('./sequence/member/static/intersect');
            _dereq_('./sequence/member/static/pure');
            _dereq_('./sequence/member/static/return');
            _dereq_('./sequence/member/static/sequence');
            _dereq_('./sequence/member/static/mempty');
            _dereq_('./sequence/member/static/mconcat');
            _dereq_('./sequence/member/static/mappend');
            _dereq_('./sequence/member/static/mzero');
            _dereq_('./sequence/member/static/mplus');
            _dereq_('./sequence/member/instance/extract');
            _dereq_('./sequence/member/instance/iterate');
            _dereq_('./sequence/member/instance/memoize');
            _dereq_('./sequence/member/instance/reduce');
            _dereq_('./sequence/member/instance/take');
            _dereq_('./sequence/member/instance/drop');
            _dereq_('./sequence/member/instance/takeWhile');
            _dereq_('./sequence/member/instance/dropWhile');
            _dereq_('./sequence/member/instance/takeUntil');
            _dereq_('./sequence/member/instance/dropUntil');
            _dereq_('./sequence/member/instance/sort');
            _dereq_('./sequence/member/instance/unique');
            _dereq_('./sequence/member/instance/fmap');
            _dereq_('./sequence/member/instance/ap');
            _dereq_('./sequence/member/instance/bind');
            _dereq_('./sequence/member/instance/join');
            _dereq_('./sequence/member/instance/mapM');
            _dereq_('./sequence/member/instance/filterM');
            _dereq_('./sequence/member/instance/map');
            _dereq_('./sequence/member/instance/filter');
            _dereq_('./sequence/member/instance/scanl');
            _dereq_('./sequence/member/instance/foldr');
            _dereq_('./sequence/member/instance/group');
            _dereq_('./sequence/member/instance/inits');
            _dereq_('./sequence/member/instance/tails');
            _dereq_('./sequence/member/instance/segs');
            _dereq_('./sequence/member/instance/subsequences');
            _dereq_('./sequence/member/instance/permutations');
            var core_1 = _dereq_('./sequence/core');
            Object.defineProperty(exports, 'Sequence', {
                enumerable: true,
                get: function () {
                    return core_1.Sequence;
                }
            });
        },
        {
            './sequence/core': 36,
            './sequence/member/instance/ap': 37,
            './sequence/member/instance/bind': 38,
            './sequence/member/instance/drop': 39,
            './sequence/member/instance/dropUntil': 40,
            './sequence/member/instance/dropWhile': 41,
            './sequence/member/instance/extract': 42,
            './sequence/member/instance/filter': 43,
            './sequence/member/instance/filterM': 44,
            './sequence/member/instance/fmap': 45,
            './sequence/member/instance/foldr': 46,
            './sequence/member/instance/group': 47,
            './sequence/member/instance/inits': 48,
            './sequence/member/instance/iterate': 49,
            './sequence/member/instance/join': 50,
            './sequence/member/instance/map': 51,
            './sequence/member/instance/mapM': 52,
            './sequence/member/instance/memoize': 53,
            './sequence/member/instance/permutations': 54,
            './sequence/member/instance/reduce': 55,
            './sequence/member/instance/scanl': 56,
            './sequence/member/instance/segs': 57,
            './sequence/member/instance/sort': 58,
            './sequence/member/instance/subsequences': 59,
            './sequence/member/instance/tails': 60,
            './sequence/member/instance/take': 61,
            './sequence/member/instance/takeUntil': 62,
            './sequence/member/instance/takeWhile': 63,
            './sequence/member/instance/unique': 64,
            './sequence/member/static/concat': 65,
            './sequence/member/static/cycle': 66,
            './sequence/member/static/difference': 67,
            './sequence/member/static/from': 68,
            './sequence/member/static/intersect': 69,
            './sequence/member/static/mappend': 70,
            './sequence/member/static/mconcat': 71,
            './sequence/member/static/mempty': 72,
            './sequence/member/static/mplus': 73,
            './sequence/member/static/mzero': 74,
            './sequence/member/static/pure': 75,
            './sequence/member/static/random': 76,
            './sequence/member/static/resume': 77,
            './sequence/member/static/return': 78,
            './sequence/member/static/sequence': 79,
            './sequence/member/static/union': 80,
            './sequence/member/static/zip': 81
        }
    ],
    36: [
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
                        void 0,
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
        { '../monadplus': 34 }
    ],
    37: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                ap(a) {
                    return core_1.Sequence.ap(this, a);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    38: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                bind(f) {
                    return core_1.Sequence.concat(this.fmap(f));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    39: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                drop(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    40: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                dropUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    41: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                dropWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    42: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    43: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                filter(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur()));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    44: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    45: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                fmap(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    46: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                foldr(f, z) {
                    return new core_1.Sequence((iter = () => this.reduce().iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(z), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).foldr(f, z))))).bind(s => s);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    47: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                group(f) {
                    return new core_1.Sequence(([iter, acc] = [
                        () => this.iterate(),
                        []
                    ], cons) => core_1.Sequence.Iterator.when(iter(), () => acc.length === 0 ? cons() : cons(acc), (thunk, recur) => acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (acc.push(core_1.Sequence.Thunk.value(thunk)), recur()) : cons(acc, [
                        core_1.Sequence.Thunk.iterator(thunk),
                        [core_1.Sequence.Thunk.value(thunk)]
                    ])));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    48: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                inits() {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), this.scanl((b, a) => [
                        ...b,
                        a
                    ], []).dropWhile(as => as.length === 0));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    49: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    50: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                join() {
                    return core_1.Sequence.concat(this);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    51: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                map(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    52: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    53: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('../../../../global');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            const memoize_1 = _dereq_('../../../../memoize');
            const memory = memoize_1.memoize(_ => new global_1.Map());
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                memoize() {
                    return new core_1.Sequence(([i, memo] = [
                        0,
                        memory(this)
                    ], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [
                        i + 1,
                        memo
                    ])));
                }
            });
        },
        {
            '../../../../global': 20,
            '../../../../helper/compose': 21,
            '../../../../memoize': 25,
            '../../core': 36
        }
    ],
    54: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                permutations() {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        return xs.length === 0 ? core_1.Sequence.mempty : core_1.Sequence.from([xs]);
                    }).bind(xs => core_1.Sequence.mappend(core_1.Sequence.from([xs]), perms(core_1.Sequence.from(xs), core_1.Sequence.mempty)));
                }
            });
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
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    55: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('../../../../global');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                reduce() {
                    return new core_1.Sequence(([i, memo] = [
                        0,
                        new global_1.Map()
                    ], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [
                        i + 1,
                        memo
                    ])));
                }
            });
        },
        {
            '../../../../global': 20,
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    56: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    57: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                segs() {
                    return core_1.Sequence.mappend(this.foldr((a, bs) => bs.take(1).bind(b => core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(c => [
                            a,
                            ...c
                        ]))]), bs)), core_1.Sequence.from([core_1.Sequence.from([])])).bind(a => a), core_1.Sequence.from([[]]));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    58: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                sort(cmp) {
                    return core_1.Sequence.from(this.extract().sort(cmp));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    59: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                subsequences() {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(() => nonEmptySubsequences(this)));
                }
            });
            function nonEmptySubsequences(xs) {
                return core_1.Sequence.Iterator.when(xs.iterate(), () => core_1.Sequence.mempty, xt => core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(xt, () => cons(), xt => cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).foldr((ys, r) => core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([[
                        core_1.Sequence.Thunk.value(xt),
                        ...ys
                    ]])), r), core_1.Sequence.mempty)))).bind(xs => xs)));
            }
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    60: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                tails() {
                    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map((_, i, as) => as.slice(i))), core_1.Sequence.from([[]]));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    61: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                take(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), () => cons(), thunk => core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    62: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                takeUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    63: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                takeWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons()));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    64: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                unique() {
                    const memory = new Set();
                    return this.filter(a => !memory.has(a) && !!memory.add(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    65: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static concat(as) {
                    return new core_1.Sequence(([ai, bi] = [
                        () => as.iterate(),
                        core_1.Sequence.Iterator.done
                    ], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => (bi = bi === core_1.Sequence.Iterator.done ? () => core_1.Sequence.Thunk.value(at).iterate() : bi, core_1.Sequence.Iterator.when(bi(), () => (bi = core_1.Sequence.Iterator.done, ar()), bt => cons(core_1.Sequence.Thunk.value(bt), [
                        () => at,
                        core_1.Sequence.Thunk.iterator(bt)
                    ])))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    66: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    67: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    68: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    69: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    70: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static mappend(l, r) {
                    return core_1.Sequence.mconcat([
                        l,
                        r
                    ]);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    71: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static mconcat(as) {
                    return [...as].reduce((a, b) => mconcat(a, b), core_1.Sequence.mempty);
                }
            });
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
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    72: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mempty = new core_1.Sequence((_, cons) => cons()), _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    73: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mplus = core_1.Sequence.mappend, _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    74: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mzero = core_1.Sequence.mempty, _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    75: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static pure(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    76: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('../../../../global');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static random(p = () => global_1.Math.random()) {
                    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence((_, cons) => cons(p(), _))) : this.random().map(r => p[global_1.Math.floor(r * p.length)]);
                }
            });
        },
        {
            '../../../../global': 20,
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    77: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static resume(iterator) {
                    return new core_1.Sequence((iter = iterator, cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    78: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static Return(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    79: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
                static sequence(ms) {
                    return ms.reduce((acc, m) => acc.fmap(bs => core_1.Sequence.mappend(bs, m)), core_1.Sequence.Return(core_1.Sequence.from([])));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    80: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    81: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            compose_1.compose(core_1.Sequence, class extends core_1.Sequence {
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
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 36
        }
    ],
    82: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.noop = void 0;
            function noop() {
            }
            exports.noop = noop;
        },
        {}
    ],
    83: [
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
            class Observation {
                constructor(opts = {}) {
                    this.id = 0;
                    this.node = new ListenerNode(global_1.undefined, global_1.undefined);
                    this.settings = {
                        limit: 10,
                        cleanup: false
                    };
                    this.unrelaies = new global_1.WeakMap();
                    assign_1.extend(this.settings, opts);
                }
                monitor(namespace, monitor, {
                    once = false
                } = {}) {
                    if (typeof monitor !== 'function')
                        throw new global_1.Error(`Spica: Observation: Invalid listener: ${ monitor }`);
                    const {monitors} = this.seekNode(namespace, 0);
                    if (monitors.length === this.settings.limit)
                        throw new global_1.Error(`Spica: Observation: Exceeded max listener limit.`);
                    if (this.id === global_1.Number.MAX_SAFE_INTEGER)
                        throw new global_1.Error(`Spica: Observation: Max listener ID reached max safe integer.`);
                    const item = {
                        id: ++this.id,
                        type: 0,
                        namespace,
                        listener: monitor,
                        options: { once }
                    };
                    monitors.push(item);
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
                    if (this.id === global_1.Number.MAX_SAFE_INTEGER)
                        throw new global_1.Error(`Spica: Observation: Max listener ID reached max safe integer.`);
                    const item = {
                        id: ++this.id,
                        type: 1,
                        namespace,
                        listener: subscriber,
                        options: { once }
                    };
                    subscribers.push(item);
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
                            return void array_1.splice(items, items.indexOf(subscriber), 1);
                        }
                    case 'function': {
                            const items = node.subscribers;
                            return void array_1.splice(items, items.findIndex(item => item.listener === subscriber), 1);
                        }
                    case 'undefined':
                        return void clear(node);
                    }
                }
                emit(namespace, data, tracker) {
                    this.drain(namespace, data, tracker);
                }
                reflect(namespace, data) {
                    let results;
                    this.emit(namespace, data, (_, r) => results = r);
                    return results;
                }
                relay(source) {
                    if (this.unrelaies.has(source))
                        return this.unrelaies.get(source);
                    const unbind = source.monitor([], (data, namespace) => void this.emit(namespace, data));
                    const unrelay = () => (void this.unrelaies.delete(source), void unbind());
                    this.unrelaies.set(source, unrelay);
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
                                this.off(item.namespace, item);
                            }
                            try {
                                const result = item.listener(data, namespace);
                                tracker && results.push(result);
                            } catch (reason) {
                                exception_1.causeAsyncException(reason);
                            }
                            i = i < items.length ? i : items.length - 1;
                            for (; i >= 0 && items[i].id > item.id; --i);
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
                                this.off(item.namespace, item);
                            }
                            try {
                                item.listener(data, namespace);
                            } catch (reason) {
                                exception_1.causeAsyncException(reason);
                            }
                            i = i < items.length ? i : items.length - 1;
                            for (; i >= 0 && items[i].id > item.id; --i);
                        }
                    }
                    if (tracker) {
                        try {
                            tracker(data, results);
                        } catch (reason) {
                            exception_1.causeAsyncException(reason);
                        }
                    }
                }
                refsAbove({parent, monitors, subscribers}, type) {
                    const acc = type === 0 ? [monitors] : [subscribers];
                    while (parent) {
                        type === 0 ? acc.push(parent.monitors) : acc.push(parent.subscribers);
                        parent = parent.parent;
                    }
                    return acc;
                }
                refsBelow(node, type) {
                    return this.refsBelow_(node, type, [])[0];
                }
                refsBelow_({monitors, subscribers, childrenIndexes, children}, type, acc) {
                    type === 0 ? acc.push(monitors) : acc.push(subscribers);
                    let count = 0;
                    for (let i = 0; i < childrenIndexes.length; ++i) {
                        const index = childrenIndexes[i];
                        const cnt = this.refsBelow_(children.get(index), type, acc)[1];
                        count += cnt;
                        if (cnt === 0 && this.settings.cleanup) {
                            children.delete(index);
                            array_1.splice(childrenIndexes, i, 1);
                            --i;
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
                            childrenIndexes.push(index);
                            children.set(index, child);
                        }
                        node = child;
                    }
                    return node;
                }
            }
            exports.Observation = Observation;
            function clear({monitors, subscribers, childrenIndexes, children}) {
                for (let i = 0; i < childrenIndexes.length; ++i) {
                    if (!clear(children.get(childrenIndexes[i])))
                        continue;
                    children.delete(childrenIndexes[i]);
                    array_1.splice(childrenIndexes, i, 1);
                    --i;
                }
                array_1.splice(subscribers, 0);
                return monitors.length === 0;
            }
        },
        {
            './array': 5,
            './assign': 6,
            './exception': 16,
            './global': 20
        }
    ],
    84: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isPromiseLike = exports.Internal = exports.AtomicPromise = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const array_1 = _dereq_('./array');
            const internal = Symbol.for('spica/promise::internal');
            class AtomicPromise {
                constructor(executor) {
                    this[Symbol.toStringTag] = 'Promise';
                    this[_a] = new Internal();
                    try {
                        executor(value => this[internal].resolve(value), reason => this[internal].reject(reason));
                    } catch (reason) {
                        this[internal].reject(reason);
                    }
                }
                static get [Symbol.species]() {
                    return AtomicPromise;
                }
                static all(vs) {
                    return new AtomicPromise((resolve, reject) => {
                        const values = alias_1.isArray(vs) ? vs : [...vs];
                        const results = global_1.Array(values.length);
                        let count = 0;
                        for (let i = 0; i < values.length; ++i) {
                            const value = values[i];
                            if (!isPromiseLike(value)) {
                                results[i] = value;
                                ++count;
                                continue;
                            }
                            if (isAtomicPromiseLike(value)) {
                                const {status} = value[internal];
                                switch (status.state) {
                                case 2:
                                    results[i] = status.value;
                                    ++count;
                                    continue;
                                case 3:
                                    reject(status.reason);
                                    i = values.length;
                                    continue;
                                }
                            }
                            value.then(value => {
                                results[i] = value;
                                ++count;
                                count === values.length && resolve(results);
                            }, reason => {
                                reject(reason);
                                i = values.length;
                            });
                        }
                        count === values.length && resolve(results);
                    });
                }
                static race(vs) {
                    return new AtomicPromise((resolve, reject) => {
                        const values = alias_1.isArray(vs) ? vs : [...vs];
                        for (let i = 0; i < values.length; ++i) {
                            const value = values[i];
                            if (!isPromiseLike(value)) {
                                return resolve(value);
                            }
                            if (isAtomicPromiseLike(value)) {
                                const {status} = value[internal];
                                switch (status.state) {
                                case 2:
                                    return resolve(status.value);
                                case 3:
                                    return reject(status.reason);
                                }
                            }
                        }
                        let done = false;
                        for (let i = 0; i < values.length; ++i) {
                            const value = values[i];
                            value.then(value => {
                                resolve(value);
                                done = true;
                            }, reason => {
                                reject(reason);
                                done = true;
                            });
                            if (done)
                                return;
                        }
                    });
                }
                static allSettled(vs) {
                    return new AtomicPromise(resolve => {
                        const values = alias_1.isArray(vs) ? vs : [...vs];
                        const results = global_1.Array(values.length);
                        let count = 0;
                        for (let i = 0; i < values.length; ++i) {
                            const value = values[i];
                            if (!isPromiseLike(value)) {
                                results[i] = {
                                    status: 'fulfilled',
                                    value: value
                                };
                                ++count;
                                continue;
                            }
                            if (isAtomicPromiseLike(value)) {
                                const {status} = value[internal];
                                switch (status.state) {
                                case 2:
                                    results[i] = {
                                        status: 'fulfilled',
                                        value: status.value
                                    };
                                    ++count;
                                    continue;
                                case 3:
                                    results[i] = {
                                        status: 'rejected',
                                        reason: status.reason
                                    };
                                    ++count;
                                    continue;
                                }
                            }
                            value.then(value => {
                                results[i] = {
                                    status: 'fulfilled',
                                    value: value
                                };
                                ++count;
                                count === values.length && resolve(results);
                            }, reason => {
                                results[i] = {
                                    status: 'rejected',
                                    reason
                                };
                                ++count;
                                count === values.length && resolve(results);
                            });
                        }
                        count === values.length && resolve(results);
                    });
                }
                static resolve(value) {
                    return new AtomicPromise(resolve => resolve(value));
                }
                static reject(reason) {
                    return new AtomicPromise((_, reject) => reject(reason));
                }
                then(onfulfilled, onrejected) {
                    return new AtomicPromise((resolve, reject) => this[internal].then(onfulfilled, onrejected, resolve, reject));
                }
                catch(onrejected) {
                    return this.then(global_1.undefined, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicPromise = AtomicPromise;
            _a = internal;
            class Internal {
                constructor() {
                    this.status = { state: 0 };
                    this.reactable = true;
                    this.fulfillReactions = [];
                    this.rejectReactions = [];
                    this.isHandled = false;
                }
                get isPending() {
                    return this.status.state === 0;
                }
                resolve(value) {
                    if (this.status.state !== 0)
                        return;
                    if (!isPromiseLike(value)) {
                        this.status = {
                            state: 2,
                            value: value
                        };
                        return this.resume();
                    }
                    this.status = {
                        state: 1,
                        promise: value
                    };
                    return void value.then(value => {
                        this.status = {
                            state: 2,
                            value: value
                        };
                        this.resume();
                    }, reason => {
                        this.status = {
                            state: 3,
                            reason: reason
                        };
                        this.resume();
                    });
                }
                reject(reason) {
                    if (this.status.state !== 0)
                        return;
                    this.status = {
                        state: 3,
                        reason: reason
                    };
                    return this.resume();
                }
                then(onfulfilled, onrejected, resolve, reject) {
                    const {status, fulfillReactions, rejectReactions} = this;
                    switch (status.state) {
                    case 2:
                        if (fulfillReactions.length > 0)
                            break;
                        try {
                            return onfulfilled ? resolve(onfulfilled(status.value)) : resolve(status.value);
                        } catch (reason) {
                            return reject(reason);
                        }
                    case 3:
                        if (rejectReactions.length > 0)
                            break;
                        try {
                            return onrejected ? resolve(onrejected(status.reason)) : reject(status.reason);
                        } catch (reason) {
                            return reject(reason);
                        }
                    default:
                        fulfillReactions.push(value => {
                            try {
                                onfulfilled ? resolve(onfulfilled(value)) : resolve(value);
                            } catch (reason) {
                                reject(reason);
                            }
                        });
                        rejectReactions.push(reason => {
                            try {
                                onrejected ? resolve(onrejected(reason)) : reject(reason);
                            } catch (reason) {
                                reject(reason);
                            }
                        });
                        return this.resume();
                    }
                }
                resume() {
                    if (!this.reactable)
                        return;
                    const {status, fulfillReactions, rejectReactions} = this;
                    switch (status.state) {
                    case 0:
                    case 1:
                        return;
                    case 2:
                        if (this.isHandled && rejectReactions.length > 0) {
                            array_1.splice(rejectReactions, 0);
                        }
                        if (fulfillReactions.length === 0)
                            return;
                        this.isHandled = true;
                        this.react(fulfillReactions, status.value);
                        return;
                    case 3:
                        if (this.isHandled && fulfillReactions.length > 0) {
                            array_1.splice(fulfillReactions, 0);
                        }
                        if (rejectReactions.length === 0)
                            return;
                        this.isHandled = true;
                        this.react(rejectReactions, status.reason);
                        return;
                    }
                }
                react(reactions, param) {
                    this.reactable = false;
                    if (reactions.length < 5) {
                        while (reactions.length > 0) {
                            reactions.shift()(param);
                        }
                    } else {
                        for (let i = 0; i < reactions.length; ++i) {
                            reactions[i](param);
                        }
                        array_1.splice(reactions, 0);
                    }
                    this.reactable = true;
                }
            }
            exports.Internal = Internal;
            function isPromiseLike(value) {
                return value !== null && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
            }
            exports.isPromiseLike = isPromiseLike;
            function isAtomicPromiseLike(value) {
                return internal in value;
            }
        },
        {
            './alias': 4,
            './array': 5,
            './global': 20
        }
    ],
    85: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.unique = exports.rnd0Z = exports.rnd0z = exports.rnd0f = exports.rnd64 = exports.rnd62 = exports.rnd36 = exports.rnd32 = exports.rnd16 = void 0;
            const global_1 = _dereq_('./global');
            const bases = [...Array(7)].map((_, i) => 1 << i);
            const dict = [
                ...[...Array(36)].map((_, i) => i.toString(36)),
                ...[...Array(26)].map((_, i) => (i + 10).toString(36).toUpperCase())
            ];
            exports.rnd16 = cons(16);
            exports.rnd32 = cons(32);
            exports.rnd36 = cons(36);
            exports.rnd62 = cons(62);
            exports.rnd64 = cons(64);
            exports.rnd0f = conv(exports.rnd16);
            exports.rnd0z = conv(exports.rnd36);
            exports.rnd0Z = conv(exports.rnd62);
            function unique(rnd, len, mem = new global_1.Set()) {
                let limit = 5;
                return () => {
                    while (true) {
                        for (let i = 0; i < limit; ++i) {
                            const r = rnd(len);
                            if (mem.has(r))
                                continue;
                            mem.add(r);
                            return r;
                        }
                        ++len;
                        limit = len < 3 ? limit : 3;
                    }
                };
            }
            exports.unique = unique;
            function cons(radix) {
                var _a;
                const base = (_a = bases.find(base => base >= radix)) !== null && _a !== void 0 ? _a : bases[bases.length - 1];
                const len = bases.indexOf(base);
                return () => {
                    while (true) {
                        const r = random(len);
                        if (r < radix)
                            return r;
                    }
                };
            }
            function conv(rnd) {
                return (len = 1) => {
                    let acc = '';
                    while (len--) {
                        acc += dict[rnd()];
                    }
                    return acc;
                };
            }
            const buffer = new Uint16Array(512);
            const digit = 16;
            const masks = bases.map((_, i) => +`0b${ '1'.repeat(i) || 0 }`);
            let index = buffer.length;
            let offset = digit;
            function random(len) {
                if (index === buffer.length) {
                    global_1.crypto.getRandomValues(buffer);
                    index = 0;
                }
                if (offset < len) {
                    offset = digit;
                    ++index;
                    return random(len);
                }
                if (offset > len) {
                    offset -= len;
                    return buffer[index] >> offset & masks[len];
                } else {
                    offset = digit;
                    return buffer[index++] & masks[len];
                }
            }
        },
        { './global': 20 }
    ],
    86: [
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
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/sequence'), exports);
        },
        { './monad/sequence': 35 }
    ],
    87: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.sqid = void 0;
            const global_1 = _dereq_('./global');
            const zeros = '0'.repeat(15);
            let cnt = 0;
            function sqid(id) {
                if (arguments.length === 0) {
                    if (cnt === global_1.Number.MAX_SAFE_INTEGER)
                        throw new TypeError(`Spica: sqid: sqid reached max safe integer.`);
                    return sqid(++cnt);
                } else {
                    if (typeof id !== 'number')
                        throw new TypeError(`Spica: sqid: A parameter value must be a number: ${ id }`);
                    if (id >= 0 === false)
                        throw new TypeError(`Spica: sqid: A parameter value must be a positive number: ${ id }`);
                    if (id % 1 !== 0)
                        throw new TypeError(`Spica: sqid: A parameter value must be an integer: ${ id }`);
                    return (zeros + id).slice(-16);
                }
            }
            exports.sqid = sqid;
        },
        { './global': 20 }
    ],
    88: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Supervisor = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const coroutine_1 = _dereq_('./coroutine');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const observer_1 = _dereq_('./observer');
            const array_1 = _dereq_('./array');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const sqid_1 = _dereq_('./sqid');
            const exception_1 = _dereq_('./exception');
            class Supervisor extends coroutine_1.Coroutine {
                constructor(opts = {}) {
                    super(async function* () {
                        return this.state;
                    }, { delay: false });
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
                        init: new observer_1.Observation(),
                        loss: new observer_1.Observation(),
                        exit: new observer_1.Observation()
                    };
                    this.events = this.events_;
                    this.workers = new global_1.Map();
                    this.alive = true;
                    this.available = true;
                    this[_a] = {
                        ask: () => {
                            throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot use coroutine port.`);
                        },
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
                        const port = process[process.constructor.port];
                        const proc = {
                            init: state => state,
                            main: (param, state, kill) => port.ask(param).then(({
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
                        void array_1.splice(this.messages, i, 1);
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
            exports.Supervisor = Supervisor;
            _a = coroutine_1.Coroutine.port;
            Supervisor.standalone = new global_1.WeakSet();
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
            './array': 5,
            './assign': 6,
            './clock': 11,
            './coroutine': 13,
            './exception': 16,
            './future': 19,
            './global': 20,
            './observer': 83,
            './promise': 84,
            './sqid': 87
        }
    ],
    89: [
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
                        const buf = buffer;
                        buffer = list_1.MList();
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
                            const buf = buffer;
                            buffer = list_1.MList();
                            void callback(buf.head, buf);
                        }, buffer.length > 1 ? delay : 0);
                    }, delay);
                };
            }
            exports.debounce = debounce;
        },
        {
            './global': 20,
            './list': 23
        }
    ],
    90: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.tuple = void 0;
            function tuple(...as) {
                return as;
            }
            exports.tuple = tuple;
        },
        {}
    ],
    91: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isPrimitive = exports.isType = exports.type = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const toString = global_1.Object.prototype.toString.call.bind(global_1.Object.prototype.toString);
            function type(value) {
                if (value === global_1.undefined)
                    return 'undefined';
                if (value === null)
                    return 'null';
                const type = typeof value;
                if (type === 'object') {
                    const proto = alias_1.ObjectGetPrototypeOf(value);
                    if (proto === global_1.Object.prototype || proto === null)
                        return 'Object';
                    if (proto === global_1.Array.prototype)
                        return 'Array';
                    return toString(value).slice(8, -1);
                }
                if (type === 'function')
                    return 'Function';
                return type;
            }
            exports.type = type;
            function isType(value, name) {
                if (name === 'object')
                    return value !== null && typeof value === name;
                if (name === 'function')
                    return typeof value === name;
                return type(value) === name;
            }
            exports.isType = isType;
            function isPrimitive(value) {
                const type = typeof value;
                return type === 'object' || type === 'function' ? value === null : true;
            }
            exports.isPrimitive = isPrimitive;
        },
        {
            './alias': 4,
            './global': 20
        }
    ],
    92: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.URL = exports.ReadonlyURL = exports.standardize = void 0;
            const global_1 = _dereq_('./global');
            const format_1 = _dereq_('./url/format');
            var format_2 = _dereq_('./url/format');
            Object.defineProperty(exports, 'standardize', {
                enumerable: true,
                get: function () {
                    return format_2.standardize;
                }
            });
            var format_3 = _dereq_('./url/format');
            Object.defineProperty(exports, 'ReadonlyURL', {
                enumerable: true,
                get: function () {
                    return format_3.ReadonlyURL;
                }
            });
            const internal = Symbol.for('spica/url::internal');
            class URL {
                constructor(url, base) {
                    this.url = url;
                    this.base = base;
                    this[internal] = {
                        url: new format_1.ReadonlyURL(url, base),
                        searchParams: global_1.undefined
                    };
                }
                get href() {
                    var _a, _b;
                    return (_b = (_a = this[internal].searchParams) === null || _a === void 0 ? void 0 : _a.toString().replace(/^(?=.)/, `${ this[internal].url.href.slice(0, -this[internal].url.query.length - this[internal].url.fragment.length || this[internal].url.href.length) }?`).concat(this.fragment)) !== null && _b !== void 0 ? _b : this[internal].url.href;
                }
                get resource() {
                    var _a, _b;
                    return (_b = (_a = this[internal].searchParams) === null || _a === void 0 ? void 0 : _a.toString().replace(/^(?=.)/, `${ this[internal].url.href.slice(0, -this[internal].url.query.length - this[internal].url.fragment.length || this[internal].url.href.length) }?`)) !== null && _b !== void 0 ? _b : this[internal].url.resource;
                }
                get origin() {
                    return this[internal].url.origin;
                }
                get scheme() {
                    return this[internal].url.protocol.slice(0, -1);
                }
                get protocol() {
                    return this[internal].url.protocol;
                }
                get username() {
                    return this[internal].url.username;
                }
                get password() {
                    return this[internal].url.password;
                }
                get host() {
                    return this[internal].url.host;
                }
                get hostname() {
                    return this[internal].url.hostname;
                }
                get port() {
                    return this[internal].url.port;
                }
                get path() {
                    var _a, _b;
                    return (_b = (_a = this[internal].searchParams) === null || _a === void 0 ? void 0 : _a.toString().replace(/^(?=.)/, `${ this.pathname }?`)) !== null && _b !== void 0 ? _b : this[internal].url.path;
                }
                get pathname() {
                    return this[internal].url.pathname;
                }
                get search() {
                    var _a, _b;
                    return (_b = (_a = this[internal].searchParams) === null || _a === void 0 ? void 0 : _a.toString().replace(/^(?=.)/, '?')) !== null && _b !== void 0 ? _b : this[internal].url.search;
                }
                get query() {
                    var _a, _b;
                    return (_b = (_a = this[internal].searchParams) === null || _a === void 0 ? void 0 : _a.toString().replace(/^(?=.)/, '?')) !== null && _b !== void 0 ? _b : this[internal].url.query;
                }
                get hash() {
                    return this[internal].url.hash;
                }
                get fragment() {
                    return this[internal].url.fragment;
                }
                get searchParams() {
                    return this[internal].searchParams === global_1.undefined ? this[internal].searchParams = new global_1.URLSearchParams(this.search) : this[internal].searchParams;
                }
                toString() {
                    return this.href;
                }
                toJSON() {
                    return this.href;
                }
            }
            exports.URL = URL;
        },
        {
            './global': 20,
            './url/format': 93
        }
    ],
    93: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ReadonlyURL = exports._encode = exports.standardize = void 0;
            const global_1 = _dereq_('../global');
            const memoize_1 = _dereq_('../memoize');
            const cache_1 = _dereq_('../cache');
            const flip_1 = _dereq_('../flip');
            const curry_1 = _dereq_('../curry');
            function standardize(url, base) {
                const u = new ReadonlyURL(url, base);
                url = u.origin !== 'null' ? u.origin.toLowerCase() + u.href.slice(u.origin.length) : u.protocol.toLowerCase() + u.href.slice(u.protocol.length);
                return encode(url);
            }
            exports.standardize = standardize;
            function encode(url) {
                return url.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '').replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, global_1.encodeURI).replace(/\?[^#]+/, query => '?' + query.slice(1).replace(/%[0-9A-F]{2}|%|[^=&]+/ig, str => str[0] === '%' && str.length === 3 ? str : global_1.encodeURIComponent(str))).replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')));
            }
            exports._encode = encode;
            const internal = Symbol.for('spica/url::internal');
            class ReadonlyURL {
                constructor(src, base) {
                    var _a, _b;
                    this.src = src;
                    this.base = base;
                    const i = (_a = base === null || base === void 0 ? void 0 : base.indexOf('#')) !== null && _a !== void 0 ? _a : -1;
                    if (i > -1) {
                        base = base === null || base === void 0 ? void 0 : base.slice(0, i);
                    }
                    const j = (_b = base === null || base === void 0 ? void 0 : base.indexOf('?')) !== null && _b !== void 0 ? _b : -1;
                    if (i > -1 && src.indexOf('#') === -1) {
                        base = base === null || base === void 0 ? void 0 : base.slice(0, j);
                    }
                    this[internal] = {
                        share: ReadonlyURL.get(src, base),
                        searchParams: global_1.undefined
                    };
                }
                get href() {
                    return this[internal].share.href === global_1.undefined ? this[internal].share.href = this[internal].share.url.href : this[internal].share.href;
                }
                get resource() {
                    return this[internal].share.resource === global_1.undefined ? this[internal].share.resource = this.href.slice(0, -this.fragment.length - this.query.length || this.href.length) + this.search : this[internal].share.resource;
                }
                get origin() {
                    return this[internal].share.origin === global_1.undefined ? this[internal].share.origin = this[internal].share.url.origin : this[internal].share.origin;
                }
                get protocol() {
                    return this[internal].share.protocol === global_1.undefined ? this[internal].share.protocol = this[internal].share.url.protocol : this[internal].share.protocol;
                }
                get username() {
                    return this[internal].share.username === global_1.undefined ? this[internal].share.username = this[internal].share.url.username : this[internal].share.username;
                }
                get password() {
                    return this[internal].share.password === global_1.undefined ? this[internal].share.password = this[internal].share.url.password : this[internal].share.password;
                }
                get host() {
                    return this[internal].share.host === global_1.undefined ? this[internal].share.host = this[internal].share.url.host : this[internal].share.host;
                }
                get hostname() {
                    return this[internal].share.hostname === global_1.undefined ? this[internal].share.hostname = this[internal].share.url.hostname : this[internal].share.hostname;
                }
                get port() {
                    return this[internal].share.port === global_1.undefined ? this[internal].share.port = this[internal].share.url.port : this[internal].share.port;
                }
                get path() {
                    return this[internal].share.path === global_1.undefined ? this[internal].share.path = `${ this.pathname }${ this.search }` : this[internal].share.path;
                }
                get pathname() {
                    return this[internal].share.pathname === global_1.undefined ? this[internal].share.pathname = this[internal].share.url.pathname : this[internal].share.pathname;
                }
                get search() {
                    return this[internal].share.search === global_1.undefined ? this[internal].share.search = this[internal].share.url.search : this[internal].share.search;
                }
                get query() {
                    return this[internal].share.query === global_1.undefined ? this[internal].share.query = this.search || this.href[this.href.length - this.fragment.length - 1] === '?' && '?' || '' : this[internal].share.query;
                }
                get hash() {
                    return this[internal].share.hash === global_1.undefined ? this[internal].share.hash = this[internal].share.url.hash : this[internal].share.hash;
                }
                get fragment() {
                    return this[internal].share.fragment === global_1.undefined ? this[internal].share.fragment = this.hash || this.href[this.href.length - 1] === '#' && '#' || '' : this[internal].share.fragment;
                }
                get searchParams() {
                    return this[internal].searchParams === global_1.undefined ? this[internal].searchParams = new global_1.URLSearchParams(this.search) : this[internal].searchParams;
                }
                toString() {
                    return this.href;
                }
                toJSON() {
                    return this.href;
                }
            }
            exports.ReadonlyURL = ReadonlyURL;
            ReadonlyURL.get = flip_1.flip(curry_1.uncurry(memoize_1.memoize(base => memoize_1.memoize(url => ({
                url: new global_1.global.URL(url, base),
                href: global_1.undefined,
                resource: global_1.undefined,
                origin: global_1.undefined,
                protocol: global_1.undefined,
                username: global_1.undefined,
                password: global_1.undefined,
                host: global_1.undefined,
                hostname: global_1.undefined,
                port: global_1.undefined,
                path: global_1.undefined,
                pathname: global_1.undefined,
                search: global_1.undefined,
                query: global_1.undefined,
                hash: global_1.undefined,
                fragment: global_1.undefined
            }), new cache_1.Cache(100)), new cache_1.Cache(100))));
        },
        {
            '../cache': 7,
            '../curry': 14,
            '../flip': 17,
            '../global': 20,
            '../memoize': 25
        }
    ],
    94: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.identity = exports.apply = exports.currentTarget = exports.wait = exports.once = exports.bind = exports.delegate = exports.listen = exports.define = exports.element = exports.text = exports.svg = exports.html = exports.frag = exports.shadow = exports.proxy = exports.API = exports.SVG = exports.HTML = exports.Shadow = void 0;
            _dereq_('spica/global');
            var builder_1 = _dereq_('./src/builder');
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
            var proxy_1 = _dereq_('./src/proxy');
            Object.defineProperty(exports, 'proxy', {
                enumerable: true,
                get: function () {
                    return proxy_1.proxy;
                }
            });
            var dom_1 = _dereq_('./src/util/dom');
            Object.defineProperty(exports, 'shadow', {
                enumerable: true,
                get: function () {
                    return dom_1.shadow;
                }
            });
            Object.defineProperty(exports, 'frag', {
                enumerable: true,
                get: function () {
                    return dom_1.frag;
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
            var identity_1 = _dereq_('./src/util/identity');
            Object.defineProperty(exports, 'identity', {
                enumerable: true,
                get: function () {
                    return identity_1.identity;
                }
            });
        },
        {
            './src/builder': 95,
            './src/proxy': 96,
            './src/util/dom': 97,
            './src/util/identity': 98,
            './src/util/listener': 99,
            './src/util/query': 100,
            'spica/global': 20
        }
    ],
    95: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SVG = exports.HTML = exports.Shadow = exports.API = void 0;
            const global_1 = _dereq_('spica/global');
            const alias_1 = _dereq_('spica/alias');
            const proxy_1 = _dereq_('./proxy');
            const dom_1 = _dereq_('./util/dom');
            function API(baseFactory, formatter = el => el) {
                return new Proxy(() => global_1.undefined, handle(baseFactory, formatter));
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
                            return build(global_1.undefined, global_1.undefined, attrs);
                        if (typeof children === 'function')
                            return build(attrs, global_1.undefined, children);
                        if (attrs !== global_1.undefined && isChildren(attrs))
                            return build(global_1.undefined, attrs, factory);
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
                                for (let i = 0, names = alias_1.ObjectKeys(attrs); i < names.length; ++i) {
                                    const name = names[i];
                                    const value = attrs[name];
                                    if (typeof value !== 'function')
                                        continue;
                                    el.removeEventListener(name, value);
                                }
                            dom_1.define(el, attrs);
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
            './proxy': 96,
            './util/dom': 97,
            'spica/alias': 4,
            'spica/global': 20
        }
    ],
    96: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Elem = exports.proxy = void 0;
            const global_1 = _dereq_('spica/global');
            const alias_1 = _dereq_('spica/alias');
            const identity_1 = _dereq_('./util/identity');
            const dom_1 = _dereq_('./util/dom');
            const array_1 = _dereq_('spica/array');
            const proxies = new global_1.WeakMap();
            function proxy(el) {
                const proxy = proxies.get(el);
                if (proxy)
                    return proxy;
                throw new Error(`TypedDOM: This element has no proxy.`);
            }
            exports.proxy = proxy;
            const tag = Symbol.for('typed-dom::tag');
            const id = identity_1.identity();
            let counter = 0;
            class Elem {
                constructor(element, children_, container = element) {
                    this.element = element;
                    this.children_ = children_;
                    this.container = container;
                    this.id_ = '';
                    this.query_ = '';
                    this.isPartialUpdate = false;
                    this.isInit = true;
                    switch (true) {
                    case children_ === global_1.undefined:
                        this.type = 0;
                        break;
                    case typeof children_ === 'string':
                        this.type = 1;
                        break;
                    case alias_1.isArray(children_):
                        this.type = 2;
                        break;
                    case children_ && typeof children_ === 'object':
                        this.type = 3;
                        break;
                    default:
                        throw new Error(`TypedDOM: Invalid type children.`);
                    }
                    throwErrorIfNotUsable(this);
                    proxies.set(this.element, this);
                    switch (this.type) {
                    case 0:
                        this.isInit = false;
                        return;
                    case 1:
                        dom_1.define(this.container, []);
                        this.children_ = this.container.appendChild(dom_1.text(''));
                        this.children = children_;
                        this.isInit = false;
                        return;
                    case 2:
                        dom_1.define(this.container, []);
                        this.children_ = [];
                        this.children = children_;
                        this.isInit = false;
                        return;
                    case 3:
                        dom_1.define(this.container, []);
                        this.children_ = this.observe({ ...children_ });
                        this.children = children_;
                        this.isInit = false;
                        return;
                    default:
                        throw new Error(`TypedDOM: Unreachable code.`);
                    }
                }
                get id() {
                    if (this.id_)
                        return this.id_;
                    this.id_ = this.element.id;
                    if (/^[\w-]+$/.test(this.id_))
                        return this.id_;
                    this.id_ = `rnd-${ id }-${ ++counter }`;
                    this.element.classList.add(this.id_);
                    return this.id_;
                }
                get query() {
                    if (this.query_)
                        return this.query_;
                    switch (true) {
                    case this.element !== this.container:
                        return this.query_ = ':host';
                    case this.id === this.element.id:
                        return this.query_ = `#${ this.id }`;
                    default:
                        return this.query_ = `.${ this.id }`;
                    }
                }
                observe(children) {
                    const descs = {};
                    for (const name of alias_1.ObjectKeys(children)) {
                        if (name in {})
                            continue;
                        let child = children[name];
                        throwErrorIfNotUsable(child);
                        this.container.appendChild(child.element);
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
                                        this.container.replaceChild(newChild.element, oldChild.element);
                                        this.container.insertBefore(oldChild.element, ref);
                                    } else {
                                        this.container.insertBefore(newChild.element, oldChild.element);
                                        this.container.removeChild(oldChild.element);
                                    }
                                } else {
                                    this.children = {
                                        ...this.children_,
                                        [name]: newChild
                                    };
                                }
                            }
                        };
                    }
                    return alias_1.ObjectDefineProperties(children, descs);
                }
                scope(child) {
                    const style = child.element;
                    switch (false) {
                    case 'type' in style:
                    case 'media' in style:
                    case style.tagName === 'STYLE':
                        return;
                    }
                    const target = /(^|[,}])(\s*)\$scope(?![\w-])(?=[^;{}]*{)/g;
                    const html = style.innerHTML;
                    if (html.search(target) === -1)
                        return;
                    const query = this.query;
                    style.innerHTML = html.replace(target, (_, frag, space) => `${ frag }${ space }${ query }`);
                    if (!style.firstElementChild)
                        return;
                    for (let es = style.children, i = 0, len = es.length; i < len; ++i) {
                        es[0].remove();
                    }
                }
                get children() {
                    switch (this.type) {
                    case 1:
                        if (this.children_.parentNode !== this.container) {
                            this.children_ = global_1.undefined;
                            for (let ns = this.container.childNodes, i = 0, len = ns.length; i < len; ++i) {
                                const node = ns[i];
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
                    case 0:
                        return;
                    case 1: {
                            if (!this.isInit && children === this.children)
                                return;
                            const targetChildren = this.children_;
                            const oldText = targetChildren.data;
                            const newText = children;
                            targetChildren.data = newText;
                            if (newText === oldText)
                                return;
                            this.element.dispatchEvent(new global_1.Event('change', {
                                bubbles: false,
                                cancelable: true
                            }));
                            return;
                        }
                    case 2: {
                            const sourceChildren = children;
                            const targetChildren = [];
                            this.children_ = targetChildren;
                            const nodeChildren = this.container.children;
                            for (let i = 0; i < sourceChildren.length; ++i) {
                                const newChild = sourceChildren[i];
                                const el = nodeChildren[i];
                                if (newChild.element.parentNode !== this.container) {
                                    throwErrorIfNotUsable(newChild);
                                }
                                if (newChild.element !== el) {
                                    if (newChild.element.parentNode !== this.container) {
                                        this.scope(newChild);
                                        addedChildren.push(newChild);
                                    }
                                    this.container.insertBefore(newChild.element, el);
                                    isChanged = true;
                                }
                                targetChildren.push(newChild);
                            }
                            for (let i = nodeChildren.length; sourceChildren.length < i--;) {
                                const el = nodeChildren[sourceChildren.length];
                                if (!proxies.has(el))
                                    continue;
                                removedChildren.push(proxy(this.container.removeChild(el)));
                                isChanged = true;
                            }
                            break;
                        }
                    case 3: {
                            const sourceChildren = children;
                            const targetChildren = this.children_;
                            for (const name of alias_1.ObjectKeys(targetChildren)) {
                                const oldChild = targetChildren[name];
                                const newChild = sourceChildren[name];
                                if (!this.isInit && newChild === oldChild)
                                    continue;
                                if (newChild.element.parentNode !== this.container) {
                                    throwErrorIfNotUsable(newChild);
                                }
                                if (this.isInit || newChild !== oldChild && newChild.element.parentNode !== oldChild.element.parentNode) {
                                    this.scope(newChild);
                                    addedChildren.push(newChild);
                                    if (!this.isInit) {
                                        let i = 0;
                                        i = removedChildren.lastIndexOf(newChild);
                                        i > -1 && array_1.splice(removedChildren, i, 1);
                                        removedChildren.push(oldChild);
                                        i = addedChildren.lastIndexOf(oldChild);
                                        i > -1 && array_1.splice(addedChildren, i, 1);
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
                    if (removedChildren.length) {
                        const ev = new global_1.Event('disconnect', {
                            bubbles: false,
                            cancelable: true
                        });
                        for (const {element} of removedChildren) {
                            element.dispatchEvent(ev);
                        }
                    }
                    if (addedChildren.length) {
                        const ev = new global_1.Event('connect', {
                            bubbles: false,
                            cancelable: true
                        });
                        for (const {element} of addedChildren) {
                            element.dispatchEvent(ev);
                        }
                    }
                    if (isChanged) {
                        this.element.dispatchEvent(new global_1.Event('change', {
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
                throw new Error(`TypedDOM: Typed DOM children must not be used to another typed DOM.`);
            }
        },
        {
            './util/dom': 97,
            './util/identity': 98,
            'spica/alias': 4,
            'spica/array': 5,
            'spica/global': 20
        }
    ],
    97: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.define = exports.element = exports.text = exports.svg = exports.html = exports.frag = exports.shadow = void 0;
            const global_1 = _dereq_('spica/global');
            const alias_1 = _dereq_('spica/alias');
            const memoize_1 = _dereq_('spica/memoize');
            const array_1 = _dereq_('spica/array');
            var caches;
            (function (caches) {
                caches.shadows = new WeakMap();
                caches.fragment = global_1.document.createDocumentFragment();
            }(caches || (caches = {})));
            function shadow(el, children, opts) {
                if (typeof el === 'string')
                    return shadow(exports.html(el), children, opts);
                if (children && !isChildren(children))
                    return shadow(el, global_1.undefined, children);
                const root = opts === global_1.undefined ? el.shadowRoot || caches.shadows.get(el) : opts.mode === 'open' ? el.shadowRoot || global_1.undefined : caches.shadows.get(el);
                return defineChildren(!opts || opts.mode === 'open' ? root || el.attachShadow(opts || { mode: 'open' }) : root || caches.shadows.set(el, el.attachShadow(opts)).get(el), !root && children == global_1.undefined ? el.childNodes : children);
            }
            exports.shadow = shadow;
            function frag(children) {
                return defineChildren(caches.fragment.cloneNode(true), children);
            }
            exports.frag = frag;
            exports.html = element(global_1.document, 'HTML');
            exports.svg = element(global_1.document, 'SVG');
            function text(source) {
                return global_1.document.createTextNode(source);
            }
            exports.text = text;
            function element(context, ns) {
                const cache = memoize_1.memoize(elem, (_, ns, tag) => `${ ns }:${ tag }`);
                return (tag, attrs, children) => {
                    const el = tag.includes('-') ? elem(context, ns, tag) : cache(context, ns, tag).cloneNode(true);
                    return isChildren(attrs) ? defineChildren(el, attrs) : defineChildren(defineAttrs(el, attrs), children);
                };
            }
            exports.element = element;
            function elem(context, ns, tag) {
                if (!('createElement' in context))
                    throw new Error(`TypedDOM: Scoped custom elements are not supported on this browser.`);
                switch (ns) {
                case 'HTML':
                    return context.createElement(tag);
                case 'SVG':
                    return context.createElementNS('http://www.w3.org/2000/svg', tag);
                }
            }
            function define(node, attrs, children) {
                return isChildren(attrs) ? defineChildren(node, attrs) : defineChildren(defineAttrs(node, attrs), children);
            }
            exports.define = define;
            function defineAttrs(el, attrs) {
                if (!attrs)
                    return el;
                for (let i = 0, names = alias_1.ObjectKeys(attrs); i < names.length; ++i) {
                    const name = names[i];
                    const value = attrs[name];
                    switch (typeof value) {
                    case 'string':
                        el.setAttribute(name, value);
                        continue;
                    case 'function':
                        if (name.length < 3)
                            throw new Error(`TypedDOM: Attribute names for event listeners must have an event name but got "${ name }".`);
                        if (name.slice(0, 2) !== 'on')
                            throw new Error(`TypedDOM: Attribute names for event listeners must start with "on" but got "${ name }".`);
                        el.addEventListener(name.slice(2), value, {
                            passive: [
                                'wheel',
                                'mousewheel',
                                'touchstart',
                                'touchmove',
                                'touchend',
                                'touchcancel'
                            ].includes(name.slice(2))
                        });
                        continue;
                    case 'object':
                        el.removeAttribute(name);
                        continue;
                    default:
                        continue;
                    }
                }
                return el;
            }
            function defineChildren(node, children) {
                switch (typeof children) {
                case 'undefined':
                    return node;
                case 'string':
                    return defineChildren(node, [children]);
                }
                if (!('length' in children)) {
                    if (node.firstChild)
                        return defineChildren(node, array_1.push([], children));
                    for (const child of children) {
                        node.append(child);
                    }
                    return node;
                }
                if (!alias_1.isArray(children)) {
                    if (node.firstChild)
                        return defineChildren(node, array_1.push([], children));
                    for (let i = children.length; i--;) {
                        node.prepend(children[i]);
                    }
                    return node;
                }
                const targetNodes = node.firstChild ? node.childNodes : [];
                let targetLength = targetNodes.length;
                if (targetLength === 0)
                    return append(node, children);
                let count = 0;
                I:
                    for (let i = 0; i < children.length; ++i) {
                        if (count === targetLength)
                            return append(node, children, i);
                        const newChild = children[i];
                        if (typeof newChild === 'object' && newChild.nodeType === 11) {
                            const sourceLength = newChild.childNodes.length;
                            targetLength += newChild !== node ? sourceLength : 0;
                            node.insertBefore(newChild, targetNodes[count] || null);
                            count += sourceLength;
                            continue;
                        }
                        ++count;
                        while (targetLength > children.length) {
                            const oldChild = targetNodes[count - 1];
                            if (equal(oldChild, newChild))
                                continue I;
                            oldChild.remove();
                            --targetLength;
                        }
                        const oldChild = targetNodes[count - 1];
                        if (equal(oldChild, newChild))
                            continue;
                        if (targetLength < children.length - i + count) {
                            targetLength += typeof newChild === 'string' || newChild.parentNode !== node ? 1 : 0;
                            node.insertBefore(typeof newChild === 'string' ? text(newChild) : newChild, oldChild);
                        } else {
                            node.replaceChild(typeof newChild === 'string' ? text(newChild) : newChild, oldChild);
                        }
                    }
                while (count < targetLength) {
                    targetNodes[count].remove();
                    --targetLength;
                }
                return node;
            }
            function isChildren(o) {
                return !!(o === null || o === void 0 ? void 0 : o[global_1.Symbol.iterator]);
            }
            function equal(node, data) {
                return typeof data === 'string' ? 'wholeText' in node && node.data === data : node === data;
            }
            function append(node, children, i = 0) {
                for (let len = children.length; i < len; ++i) {
                    node.append(children[i]);
                }
                return node;
            }
        },
        {
            'spica/alias': 4,
            'spica/array': 5,
            'spica/global': 20,
            'spica/memoize': 25
        }
    ],
    98: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.identity = void 0;
            const global_1 = _dereq_('spica/global');
            const random_1 = _dereq_('spica/random');
            const ids = Symbol.for('typed-dom::ids');
            exports.identity = random_1.unique(random_1.rnd0Z, 2, (_a = global_1.global[ids]) !== null && _a !== void 0 ? _a : global_1.global[ids] = new global_1.Set());
        },
        {
            'spica/global': 20,
            'spica/random': 85
        }
    ],
    99: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.bind = exports.delegate = exports.wait = exports.once = exports.listen = exports.currentTarget = void 0;
            const global_1 = _dereq_('spica/global');
            const promise_1 = _dereq_('spica/promise');
            const function_1 = _dereq_('spica/function');
            const noop_1 = _dereq_('spica/noop');
            exports.currentTarget = Symbol.for('typed-dom::currentTarget');
            function listen(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, d) : bind(target, a, b, c);
            }
            exports.listen = listen;
            function once(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, {
                    ...typeof d === 'boolean' ? { capture: d } : d,
                    once: true
                }) : bind(target, a, b, {
                    ...typeof c === 'boolean' ? { capture: c } : c,
                    once: true
                });
            }
            exports.once = once;
            function wait(target, a, b = false, c = {}) {
                return new promise_1.AtomicPromise(resolve => typeof b === 'string' ? once(target, a, b, resolve, c) : once(target, a, resolve, b));
            }
            exports.wait = wait;
            function delegate(target, selector, type, listener, option = {}) {
                let unbind = noop_1.noop;
                return bind(target, type, ev => {
                    var _a, _b;
                    unbind();
                    const cx = ev.target.shadowRoot ? (_a = ev.composedPath()[0]) === null || _a === void 0 ? void 0 : _a.closest(selector) : (_b = ev.target) === null || _b === void 0 ? void 0 : _b.closest(selector);
                    return cx ? unbind = once(cx, type, listener, option) : global_1.undefined, ev.returnValue;
                }, {
                    ...option,
                    capture: true
                });
            }
            exports.delegate = delegate;
            function bind(target, type, listener, option = false) {
                target.addEventListener(type, handler, option);
                return function_1.once(() => void target.removeEventListener(type, handler, option));
                function handler(ev) {
                    return exports.currentTarget in ev && !ev[exports.currentTarget] ? global_1.undefined : ev[exports.currentTarget] = ev.currentTarget, listener(ev);
                }
            }
            exports.bind = bind;
        },
        {
            'spica/function': 18,
            'spica/global': 20,
            'spica/noop': 82,
            'spica/promise': 84
        }
    ],
    100: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.apply = void 0;
            const dom_1 = _dereq_('./dom');
            function apply(node, selector, attrs) {
                const ns = node.querySelectorAll(selector);
                for (let i = 0, len = ns.length; i < len; ++i) {
                    dom_1.define(ns[i], attrs);
                }
                return ns;
            }
            exports.apply = apply;
        },
        { './dom': 97 }
    ],
    101: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.router = exports.default = exports.Pjax = void 0;
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
            './layer/interface/service/gui': 130,
            './lib/router': 140
        }
    ],
    102: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.route = exports.scope = exports.Config = exports.RouterEventSource = exports.RouterEventType = exports.RouterEvent = void 0;
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
            '../domain/data/config': 105,
            '../domain/event/router': 107,
            '../domain/router/api': 108
        }
    ],
    103: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.savePosition = exports.loadTitle = void 0;
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
        { '../domain/store/path': 124 }
    ],
    104: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.savePjax = exports.isTransitable = exports.savePosition = exports.loadPosition = exports.saveTitle = exports.loadTitle = void 0;
            void saveTitle();
            void savePosition();
            function loadTitle() {
                var _a;
                return ((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.title) || document.title;
            }
            exports.loadTitle = loadTitle;
            function saveTitle() {
                void window.history.replaceState({
                    ...window.history.state,
                    title: document.title
                }, document.title);
            }
            exports.saveTitle = saveTitle;
            function loadPosition() {
                var _a;
                return ((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.position) || {
                    top: window.pageYOffset,
                    left: window.pageXOffset
                };
            }
            exports.loadPosition = loadPosition;
            function savePosition() {
                var _a;
                void window.history.replaceState({
                    ...window.history.state,
                    position: {
                        ...(_a = window.history.state) === null || _a === void 0 ? void 0 : _a.position,
                        top: window.pageYOffset,
                        left: window.pageXOffset
                    }
                }, document.title);
            }
            exports.savePosition = savePosition;
            function isTransitable(state) {
                var _a;
                return ((_a = state === null || state === void 0 ? void 0 : state.pjax) === null || _a === void 0 ? void 0 : _a.transition) || false;
            }
            exports.isTransitable = isTransitable;
            function savePjax() {
                var _a;
                void window.history.replaceState({
                    ...window.history.state,
                    pjax: {
                        ...(_a = window.history.state) === null || _a === void 0 ? void 0 : _a.pjax,
                        transition: true
                    }
                }, document.title);
            }
            exports.savePjax = savePjax;
        },
        {}
    ],
    105: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Config = exports.scope = void 0;
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
                    this.link = 'a, area';
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
                    return el.matches('[href]:not([target])');
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
                async fetch() {
                    return 'fetch';
                }
                async unload() {
                    return 'unload';
                }
                async content() {
                    return 'content';
                }
                async ready() {
                    return 'ready';
                }
                async load() {
                }
            }
        },
        {
            './config/scope': 106,
            'spica/assign': 6
        }
    ],
    106: [
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
                const scope = {
                    '/': {},
                    ...config.scope
                };
                return sequence_1.Sequence.from(Object.keys(scope).sort().reverse()).dropWhile(pattern => !!!router_1.compare(pattern, path.orig) && !router_1.compare(pattern, path.dest)).take(1).filter(pattern => !!router_1.compare(pattern, path.orig) && router_1.compare(pattern, path.dest)).map(pattern => scope[pattern]).map(option => option ? maybe_1.Just(new config_1.Config(assign_1.extend({}, config, option))) : maybe_1.Nothing).extract().reduce((_, m) => m, maybe_1.Nothing);
            }
            exports.scope = scope;
        },
        {
            '../../../../lib/router': 140,
            '../../../domain/data/config': 105,
            'spica/assign': 6,
            'spica/maybe': 24,
            'spica/sequence': 86
        }
    ],
    107: [
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
                RouterEventSource.Area = HTMLAreaElement;
                RouterEventSource.Form = HTMLFormElement;
                RouterEventSource.Window = window.Window;
            }(RouterEventSource = exports.RouterEventSource || (exports.RouterEventSource = {})));
            var RouterEventType;
            (function (RouterEventType) {
                RouterEventType.Click = 'click';
                RouterEventType.Submit = 'submit';
                RouterEventType.Popstate = 'popstate';
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
                        if (this.source instanceof RouterEventSource.Anchor || this.source instanceof RouterEventSource.Area) {
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
                        if (this.source instanceof RouterEventSource.Anchor || this.source instanceof RouterEventSource.Area) {
                            return new url_1.URL(url_1.standardize(this.source.href, window.location.href));
                        }
                        if (this.source instanceof RouterEventSource.Form) {
                            return this.source.method.toUpperCase() === RouterEventMethod.GET ? new url_1.URL(url_1.standardize(this.source.action.split(/[?#]/)[0] + `?${ dom_1.serialize(this.source) }`, window.location.href)) : new url_1.URL(url_1.standardize(this.source.action.split(/[?#]/)[0], window.location.href));
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
            '../../../lib/dom': 137,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    108: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.route = exports.RouterEntityState = exports.RouterEntity = void 0;
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
            async function route(entity, io) {
                return either_1.Right(void 0).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? either_1.Right(void 0) : either_1.Left(new Error(`Failed to match areas.`))).fmap(() => fetch_1.fetch(entity.event.request, entity.config, entity.state.process)).fmap(async p => (await p).fmap(([res, seq]) => update_1.update(entity, res, seq, {
                    document: io.document,
                    position: path_1.loadPosition
                })).extract(either_1.Left)).extract(either_1.Left);
                function match(document, areas) {
                    return content_1.separate({
                        src: document,
                        dst: document
                    }, areas).extract(() => false, () => true);
                }
            }
            exports.route = route;
        },
        {
            '../store/path': 124,
            './model/eav/entity': 109,
            './module/fetch': 111,
            './module/update': 113,
            './module/update/content': 115,
            'spica/either': 15
        }
    ],
    109: [
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
    110: [
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
                    this.document = this.xhr.responseXML.cloneNode(true);
                    if (url.origin !== new url_1.URL(xhr.responseURL, window.location.href).origin)
                        throw new Error(`Redirected to another origin.`);
                    void Object.defineProperty(this.document, 'URL', {
                        configurable: true,
                        enumerable: true,
                        value: url.href,
                        writable: false
                    });
                    void html_1.fix(this.document);
                    void Object.freeze(this);
                }
            }
            exports.FetchResponse = FetchResponse;
        },
        {
            '../../../../../../lib/html': 139,
            'spica/url': 92
        }
    ],
    111: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.fetch = void 0;
            const xhr_1 = _dereq_('../module/fetch/xhr');
            const clock_1 = _dereq_('spica/clock');
            async function fetch({method, url, body}, {
                fetch: {rewrite, cache, headers, timeout, wait},
                sequence
            }, process) {
                void window.dispatchEvent(new Event('pjax:fetch'));
                const [seq, res] = await Promise.all([
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
            }
            exports.fetch = fetch;
        },
        {
            '../module/fetch/xhr': 112,
            'spica/clock': 11
        }
    ],
    112: [
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
                const requestURL = new url_1.URL(url_1.standardize(rewrite(displayURL.path), window.location.href));
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
                    xhr.responseType = 'document';
                    xhr.timeout = timeout;
                    void xhr.send(body);
                    void xhr.addEventListener('abort', () => void resolve(either_1.Left(new Error(`Failed to request a page by abort.`))));
                    void xhr.addEventListener('error', () => void resolve(either_1.Left(new Error(`Failed to request a page by error.`))));
                    void xhr.addEventListener('timeout', () => void resolve(either_1.Left(new Error(`Failed to request a page by timeout.`))));
                    void xhr.addEventListener('load', () => void verify(xhr, method).fmap(xhr => {
                        const responseURL = new url_1.URL(url_1.standardize(xhr.responseURL, window.location.href));
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
                    const url = new url_1.URL(url_1.standardize(xhr.responseURL, window.location.href));
                    switch (true) {
                    case !xhr.responseURL:
                        return either_1.Left(new Error(`Failed to get the response URL.`));
                    case url.origin !== new url_1.URL('', window.location.origin).origin:
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
            '../../model/eav/value/fetch': 110,
            'spica/cache': 7,
            'spica/either': 15,
            'spica/promise': 84,
            'spica/sequence': 86,
            'spica/url': 92
        }
    ],
    113: [
        function (_dereq_, module, exports) {
            'use strict';
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
                return promise_1.AtomicPromise.resolve(seq).then(process.either).then(m => m.bind(() => content_1.separate(documents, config.areas).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), () => m)).fmap(seqA => (void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seqA, {
                    ...response,
                    url: response.url.href
                })))).then(m => either_1.Either.sequence(m)).then(process.promise).then(m => m.bind(seqB => content_1.separate(documents, config.areas).fmap(([area]) => [
                    seqB,
                    area
                ]).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), process.either)).bind(([seqB, area]) => (void config.update.rewrite(documents.src, area), content_1.separate(documents, config.areas).fmap(([, areas]) => [
                    seqB,
                    areas
                ]).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), process.either)))).then(process.promise).then(m => m.fmap(([seqB, areas]) => hlist_1.HList().unfold(() => (void blur_1.blur(documents.dst), void path_1.savePjax(), void url_1.url(new router_1.RouterEventLocation(response.url), documents.src.title, event.type, event.source, config.replace), void path_1.savePjax(), void title_1.title(documents), void path_1.saveTitle(), void head_1.head(documents, config.update.head, config.update.ignore), process.either(content_1.content(documents, areas)).fmap(([as, ps]) => [
                    as,
                    promise_1.AtomicPromise.all(ps)
                ]))).unfold(async p => (await p).fmap(async ([areas]) => {
                    config.update.css ? void css_1.css(documents, config.update.ignore) : void 0;
                    void io.document.dispatchEvent(new Event('pjax:content'));
                    const seqC = await config.sequence.content(seqB, areas);
                    const ssm = config.update.script ? await script_1.script(documents, state.scripts, config.update, Math.max(config.fetch.timeout, 1000) * 10, process) : await process.either([
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
                        await config.sequence.ready(seqC)
                    ];
                }).fmap(p => p.then(([m, seqD]) => m.fmap(sst => [
                    sst,
                    seqD
                ]))).extract(err => promise_1.AtomicPromise.resolve(either_1.Left(err)))).reverse())).then(process.promise).then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([
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
            '../../event/router': 107,
            '../../store/path': 124,
            '../module/update/blur': 114,
            '../module/update/content': 115,
            '../module/update/css': 116,
            '../module/update/focus': 117,
            '../module/update/head': 118,
            '../module/update/script': 119,
            '../module/update/scroll': 120,
            '../module/update/title': 122,
            '../module/update/url': 123,
            'spica/either': 15,
            'spica/hlist': 22,
            'spica/promise': 84
        }
    ],
    114: [
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
    115: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._wait = exports._split = exports.separate = exports.content = void 0;
            const script_1 = _dereq_('./script');
            const promise_1 = _dereq_('spica/promise');
            const maybe_1 = _dereq_('spica/maybe');
            const array_1 = _dereq_('spica/array');
            const typed_dom_1 = _dereq_('typed-dom');
            function content(documents, areas, io = { replace: (src, dst) => void dst.parentNode.replaceChild(src, dst) }) {
                return [
                    areas.map(r => r.dst).reduce(array_1.push, []),
                    areas.map(load).reduce(array_1.push, [])
                ];
                function load(area) {
                    return area.src.map((_, i) => ({
                        src: documents.dst.importNode(area.src[i].cloneNode(true), true),
                        dst: area.dst[i]
                    })).map(area => (void replace(area), [...area.src.querySelectorAll('img, iframe, frame')].map(wait))).reduce(array_1.push, []);
                    function replace(area) {
                        const unescape = [...area.src.querySelectorAll('script')].map(script_1.escape).reduce((f, g) => () => (void f(), void g()), () => void 0);
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
                            src: [...documents.src.querySelectorAll(area)],
                            dst: [...documents.dst.querySelectorAll(area)]
                        };
                        return record.src.length > 0 && record.src.length === record.dst.length ? maybe_1.Just(array_1.push(acc, [record])) : maybe_1.Nothing;
                    }), maybe_1.Just([])));
                }
            }
            exports.separate = separate;
            function split(area) {
                return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(area => area.trim()).reduce((m, area) => area ? m.fmap(acc => array_1.push(acc, [area])) : maybe_1.Nothing, maybe_1.Just([]));
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
            './script': 119,
            'spica/array': 5,
            'spica/maybe': 24,
            'spica/promise': 84,
            'typed-dom': 94
        }
    ],
    116: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.css = void 0;
            const sync_1 = _dereq_('./sync');
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
                    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.css = css;
        },
        { './sync': 121 }
    ],
    117: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.focus = void 0;
            const router_1 = _dereq_('../../../event/router');
            function focus(type, document) {
                switch (type) {
                case router_1.RouterEventType.Click:
                case router_1.RouterEventType.Submit:
                    return void [...document.querySelectorAll('[autofocus]')].slice(-1).filter(el => el.closest('html') === window.document.documentElement && el !== document.activeElement).forEach(el => void el.focus());
                case router_1.RouterEventType.Popstate:
                    return;
                default:
                    throw new TypeError(type);
                }
            }
            exports.focus = focus;
        },
        { '../../../event/router': 107 }
    ],
    118: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.head = void 0;
            const sync_1 = _dereq_('./sync');
            function head(documents, selector, ignore) {
                ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
                return void sync_1.sync(sync_1.pair(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);
                function list(source) {
                    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.head = head;
        },
        { './sync': 121 }
    ],
    119: [
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
            var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
                Object.defineProperty(o, 'default', {
                    enumerable: true,
                    value: v
                });
            } : function (o, v) {
                o['default'] = v;
            });
            var __importStar = this && this.__importStar || function (mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
                            __createBinding(result, mod, k);
                __setModuleDefault(result, mod);
                return result;
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.escape = exports._evaluate = exports._fetch = exports.script = void 0;
            const global_1 = _dereq_('spica/global');
            const error_1 = _dereq_('../../../../../lib/error');
            const promise_1 = _dereq_('spica/promise');
            const either_1 = _dereq_('spica/either');
            const url_1 = _dereq_('spica/url');
            const array_1 = _dereq_('spica/array');
            const tuple_1 = _dereq_('spica/tuple');
            const clock_1 = _dereq_('spica/clock');
            const typed_dom_1 = _dereq_('typed-dom');
            function script(documents, skip, selector, timeout, cancellation, io = {
                fetch,
                evaluate
            }) {
                const scripts = [...documents.src.querySelectorAll('script')].filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL(url_1.standardize(el.src)).href) || el.matches(selector.reload.trim() || '_') : true);
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
                ]).then(async ([sm, am]) => sm.fmap(async p => (await p).fmap(([ss1, ap1]) => [
                    ss1,
                    ap1.then(async as1 => am.fmap(async p => (await p).fmap(([ss2, ap2]) => promise_1.AtomicPromise.all([
                        as1,
                        either_1.Right(ss2),
                        ap2
                    ]).then(sst => sst.reduce((m1, m2) => m1.bind(s1 => m2.fmap(s2 => array_1.push(s1, s2)))))).extract(either_1.Left)).extract(either_1.Left))
                ])).extract(either_1.Left));
                function request(scripts) {
                    return scripts.map(script => io.fetch(script, timeout));
                }
                function run(responses) {
                    return responses.reduce((results, m) => m.bind(() => results), responses.reduce((results, m) => results.bind(cancellation.either).bind(([sp, ap]) => m.fmap(([script, code]) => io.evaluate(script, code, selector.logger, skip, promise_1.AtomicPromise.all(sp), cancellation)).bind(m => m.extract(p => either_1.Right(tuple_1.tuple(array_1.push(sp, [p]), ap)), p => either_1.Right(tuple_1.tuple(sp, array_1.push(ap, [p])))))), either_1.Right([
                        [],
                        []
                    ]))).fmap(([sp, ap]) => promise_1.AtomicPromise.all(sp).then(m => either_1.Either.sequence(m)).then(sm => sm.fmap(ss => tuple_1.tuple(ss, Promise.all(ap).then(m => either_1.Either.sequence(m))))));
                }
            }
            exports.script = script;
            async function fetch(script, timeout) {
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
                ]).then(async res => res.ok ? either_1.Right([
                    script,
                    await res.text()
                ]) : script.matches('[src][async]') ? retry(script).then(() => either_1.Right([
                    script,
                    ''
                ]), () => either_1.Left(new Error(`${ script.src }: ${ res.statusText }`))) : either_1.Left(new Error(res.statusText)), error => either_1.Left(error));
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
                    if (!cancellation.alive)
                        throw new error_1.FatalError('Expired.');
                    if (script.matches('[type="module"][src]')) {
                        return promise_1.AtomicPromise.resolve(Promise.resolve().then(() => __importStar(_dereq_(script.src)))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (void script.dispatchEvent(new Event('load')), either_1.Right(script)), reason => (void script.dispatchEvent(new Event('error')), either_1.Left(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
                    } else {
                        try {
                            if (skip.has(new url_1.URL(url_1.standardize(window.location.href)).href))
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
                return new promise_1.AtomicPromise((resolve, reject) => (void script.addEventListener('load', () => void resolve(global_1.undefined)), void script.addEventListener('error', reject), void document.body.appendChild(script), void script.remove()));
            }
        },
        {
            '../../../../../lib/error': 138,
            'spica/array': 5,
            'spica/clock': 11,
            'spica/either': 15,
            'spica/global': 20,
            'spica/promise': 84,
            'spica/tuple': 90,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    120: [
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
                case router_1.RouterEventType.Click:
                    if (io.hash(document, env.hash, io))
                        return;
                    return void io.scrollToPosition({
                        top: 0,
                        left: 0
                    });
                case router_1.RouterEventType.Submit:
                    return void io.scrollToPosition({
                        top: 0,
                        left: 0
                    });
                case router_1.RouterEventType.Popstate:
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
        { '../../../event/router': 107 }
    ],
    121: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.pair = exports.sync = void 0;
            const either_1 = _dereq_('spica/either');
            const array_1 = _dereq_('spica/array');
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
                    return srcs.reduce((link, src) => dsts.length === 0 ? link.set(null, array_1.push(link.get(null) || [], [src])) : dsts.reduce((m, dst) => m.bind(link => !link.has(dst) && compare(src, dst) ? (void link.set(dst, array_1.push(link.get(null) || [], [src])), void link.delete(null), either_1.Left(link)) : either_1.Right(link)), either_1.Right(link)).fmap(link => link.set(null, array_1.push(link.get(null) || [], [src]))).extract(link => link), new Map());
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
            'spica/array': 5,
            'spica/either': 15
        }
    ],
    122: [
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
    123: [
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
                    return void window.history.replaceState({}, title, location.dest.href);
                case isRegisterable(type, location):
                    return void window.history.pushState({}, title, location.dest.href);
                default:
                    return;
                }
            }
            exports.url = url;
            function isRegisterable(type, location) {
                if (location.dest.href === location.orig.href)
                    return false;
                switch (type) {
                case router_1.RouterEventType.Click:
                case router_1.RouterEventType.Submit:
                    return true;
                case router_1.RouterEventType.Popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isRegisterable = isRegisterable;
            function isReplaceable(type, source, selector) {
                switch (type) {
                case router_1.RouterEventType.Click:
                case router_1.RouterEventType.Submit:
                    return source.matches(selector.trim() || '_');
                case router_1.RouterEventType.Popstate:
                    return false;
                default:
                    throw new TypeError(type);
                }
            }
            exports._isReplaceable = isReplaceable;
        },
        {
            '../../../event/router': 107,
            'typed-dom': 94
        }
    ],
    124: [
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
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('../../data/store/state'), exports);
        },
        { '../../data/store/state': 104 }
    ],
    125: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ClickView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class ClickView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(async function* () {
                        return this.finally(typed_dom_1.delegate(document, selector, 'click', ev => {
                            if (!(ev.currentTarget instanceof HTMLAnchorElement || ev.currentTarget instanceof HTMLAreaElement))
                                return;
                            void listener(ev);
                        }));
                    }, { delay: false });
                }
            }
            exports.ClickView = ClickView;
        },
        {
            'spica/coroutine': 13,
            'typed-dom': 94
        }
    ],
    126: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.NavigationView = void 0;
            const page_1 = _dereq_('../../service/state/page');
            const state_1 = _dereq_('../../../data/store/state');
            const coroutine_1 = _dereq_('spica/coroutine');
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            class NavigationView extends coroutine_1.Coroutine {
                constructor(window, listener) {
                    super(async function* () {
                        return this.finally(typed_dom_1.bind(window, 'popstate', ev => {
                            if (!state_1.isTransitable(page_1.page.state) || !state_1.isTransitable(window.history.state))
                                return;
                            if (url_1.standardize(window.location.href) === page_1.page.href)
                                return;
                            void listener(ev);
                        }));
                    }, { delay: false });
                }
            }
            exports.NavigationView = NavigationView;
        },
        {
            '../../../data/store/state': 104,
            '../../service/state/page': 133,
            'spica/coroutine': 13,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    127: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ScrollView = void 0;
            const page_1 = _dereq_('../../service/state/page');
            const coroutine_1 = _dereq_('spica/coroutine');
            const url_1 = _dereq_('spica/url');
            const throttle_1 = _dereq_('spica/throttle');
            const typed_dom_1 = _dereq_('typed-dom');
            class ScrollView extends coroutine_1.Coroutine {
                constructor(window, listener) {
                    super(async function* () {
                        return this.finally(typed_dom_1.bind(window, 'scroll', throttle_1.debounce(100, ev => {
                            if (url_1.standardize(window.location.href) !== page_1.page.href)
                                return;
                            void listener(ev);
                        }), { passive: true }));
                    }, { delay: false });
                }
            }
            exports.ScrollView = ScrollView;
        },
        {
            '../../service/state/page': 133,
            'spica/coroutine': 13,
            'spica/throttle': 89,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    128: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SubmitView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class SubmitView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(async function* () {
                        return this.finally(typed_dom_1.delegate(document, selector, 'submit', ev => {
                            if (!(ev.currentTarget instanceof HTMLFormElement))
                                return;
                            void listener(ev);
                        }));
                    }, { delay: false });
                }
            }
            exports.SubmitView = SubmitView;
        },
        {
            'spica/coroutine': 13,
            'typed-dom': 94
        }
    ],
    129: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.API = void 0;
            const router_1 = _dereq_('./router');
            const process_1 = _dereq_('./state/process');
            const state_1 = _dereq_('../../data/store/state');
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
                static sync(isPjaxPage) {
                    isPjaxPage && void state_1.savePjax();
                    void process_1.process.cast('', new Error(`Canceled.`));
                    void router_1.sync();
                }
                static pushURL(url, title, state = null) {
                    void window.history.pushState(state, title, url);
                    void this.sync();
                }
                static replaceURL(url, title, state = window.history.state) {
                    const isPjaxPage = state_1.isTransitable(window.history.state);
                    void window.history.replaceState(state, title, url);
                    void this.sync(isPjaxPage);
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
            '../../../lib/html': 139,
            '../../data/store/state': 104,
            './router': 131,
            './state/process': 134,
            'spica/assign': 6,
            'typed-dom': 94
        }
    ],
    130: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.GUI = void 0;
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
            const copropagator_1 = _dereq_('spica/copropagator');
            class GUI extends api_1.API {
                constructor(option, io = {
                    document: window.document,
                    router: router_1.route
                }) {
                    super();
                    this.option = option;
                    this.io = io;
                    this.view = new View(this.option, this.io);
                    void GUI.resources.clear();
                    void GUI.resources.register('view', this.view);
                }
                assign(url) {
                    return api_1.API.assign(url, this.option, this.io);
                }
                replace(url) {
                    return api_1.API.replace(url, this.option, this.io);
                }
            }
            exports.GUI = GUI;
            GUI.resources = new class extends supervisor_1.Supervisor {
            }();
            class View extends copropagator_1.Copropagator {
                constructor(option, io) {
                    const config = new router_1.Config(option);
                    const router = event => void io.router(config, new router_1.RouterEvent(event), process_1.process, io);
                    super([
                        new click_1.ClickView(io.document, config.link, router),
                        new submit_1.SubmitView(io.document, config.form, router),
                        new navigation_1.NavigationView(window, router),
                        new scroll_1.ScrollView(window, store_1.savePosition)
                    ]);
                }
            }
        },
        {
            '../../application/store': 103,
            '../module/view/click': 125,
            '../module/view/navigation': 126,
            '../module/view/scroll': 127,
            '../module/view/submit': 128,
            './api': 129,
            './router': 131,
            './state/process': 134,
            './state/scroll-restoration': 136,
            'spica/copropagator': 12,
            'spica/supervisor': 88
        }
    ],
    131: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._validate = exports.sync = exports.route = exports.RouterEventSource = exports.RouterEvent = exports.Config = void 0;
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
            const page_1 = _dereq_('./state/page');
            const env_1 = _dereq_('../service/state/env');
            const error_1 = _dereq_('../../../lib/error');
            const store_1 = _dereq_('../../application/store');
            const url_1 = _dereq_('spica/url');
            const cancellation_1 = _dereq_('spica/cancellation');
            const maybe_1 = _dereq_('spica/maybe');
            const clock_1 = _dereq_('spica/clock');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'pjax:unload', () => window.history.scrollRestoration = 'auto', true);
            function route(config, event, process, io) {
                switch (event.type) {
                case router_1.RouterEventType.Click:
                case router_1.RouterEventType.Submit:
                    void store_1.savePosition();
                    break;
                case router_1.RouterEventType.Popstate:
                    io.document.title = store_1.loadTitle();
                    break;
                }
                return maybe_1.Just(0).guard(validate(event.request.url, config, event)).bind(() => router_1.scope(config, (({orig, dest}) => ({
                    orig: orig.pathname,
                    dest: dest.pathname
                }))(event.location))).fmap(async config => {
                    void event.original.preventDefault();
                    void process.cast('', new Error(`Canceled.`));
                    const cancellation = new cancellation_1.Cancellation();
                    const kill = process.register('', err => {
                        void kill();
                        void cancellation.cancel(err);
                        return clock_1.never;
                    });
                    const [scripts] = await env_1.env;
                    window.history.scrollRestoration = 'manual';
                    return router_1.route(config, event, {
                        process: cancellation,
                        scripts
                    }, io).then(m => m.fmap(async ([ss, p]) => (void kill(), void page_1.page.sync(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL(url_1.standardize(s.src)).href)), void (await p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL(url_1.standardize(s.src)).href)))).extract()).catch(reason => (void kill(), void page_1.page.sync(), window.history.scrollRestoration = 'auto', cancellation.alive || reason instanceof error_1.FatalError ? void config.fallback(event.source, reason) : void 0));
                }).extract(() => {
                    switch (event.type) {
                    case router_1.RouterEventType.Click:
                        event.source.matches('[href]') && void process.cast('', new Error(`Canceled.`));
                        void page_1.page.sync();
                        return false;
                    case router_1.RouterEventType.Submit:
                        void process.cast('', new Error(`Canceled.`));
                        void page_1.page.sync();
                        return false;
                    case router_1.RouterEventType.Popstate:
                        if (isHashChange(event.location.dest)) {
                            void process.cast('', new Error(`Canceled.`));
                            void page_1.page.sync();
                            return false;
                        }
                        void config.fallback(event.source, new Error(`Disabled.`));
                        void page_1.page.sync();
                        return true;
                    }
                }, () => true);
            }
            exports.route = route;
            function sync() {
                void page_1.page.sync();
            }
            exports.sync = sync;
            function validate(url, config, event) {
                if (event.original.defaultPrevented)
                    return false;
                switch (event.type) {
                case router_1.RouterEventType.Click:
                    return isAccessible(url) && !isHashClick(url) && !isHashChange(url) && !isDownload(event.source) && !hasModifierKey(event.original) && config.filter(event.source);
                case router_1.RouterEventType.Submit:
                    return isAccessible(url);
                case router_1.RouterEventType.Popstate:
                    return isAccessible(url) && !isHashChange(url);
                default:
                    return false;
                }
                function isAccessible(dest) {
                    const orig = new url_1.URL(page_1.page.href);
                    return orig.origin === dest.origin;
                }
                function isHashClick(dest) {
                    const orig = new url_1.URL(page_1.page.href);
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
                const orig = new url_1.URL(page_1.page.href);
                return orig.resource === dest.resource && orig.fragment !== dest.fragment;
            }
        },
        {
            '../../../lib/error': 138,
            '../../application/router': 102,
            '../../application/store': 103,
            '../service/state/env': 132,
            './state/page': 133,
            'spica/cancellation': 8,
            'spica/clock': 11,
            'spica/maybe': 24,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    132: [
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
        { './script': 135 }
    ],
    133: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.page = void 0;
            const global_1 = _dereq_('spica/global');
            const state_1 = _dereq_('../../../data/store/state');
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(global_1.window, 'hashchange', () => void exports.page.sync());
            void typed_dom_1.bind(global_1.window, 'popstate', () => state_1.isTransitable(exports.page.state) && state_1.isTransitable(global_1.window.history.state) || void exports.page.sync());
            exports.page = new class {
                constructor() {
                    this.url = url_1.standardize(global_1.window.location.href);
                    this.state_ = global_1.window.history.state;
                }
                get href() {
                    return this.url;
                }
                get state() {
                    return this.state_;
                }
                sync() {
                    this.url = url_1.standardize(global_1.window.location.href);
                    this.state_ = global_1.window.history.state;
                }
            }();
        },
        {
            '../../../data/store/state': 104,
            'spica/global': 20,
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    134: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.process = void 0;
            const supervisor_1 = _dereq_('spica/supervisor');
            exports.process = new class extends supervisor_1.Supervisor {
            }();
        },
        { 'spica/supervisor': 88 }
    ],
    135: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.scripts = void 0;
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.scripts = new Set();
            void typed_dom_1.bind(window, 'pjax:unload', () => void document.querySelectorAll('script[src]').forEach(script => void exports.scripts.add(new url_1.URL(url_1.standardize(script.src)).href)));
        },
        {
            'spica/url': 92,
            'typed-dom': 94
        }
    ],
    136: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'unload', () => window.history.scrollRestoration = 'auto', false);
        },
        { 'typed-dom': 94 }
    ],
    137: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.serialize = void 0;
            function serialize(form) {
                return [...form.elements].filter(el => {
                    if (!('name' in el))
                        return false;
                    if (el.disabled)
                        return false;
                    switch (el.tagName) {
                    case 'INPUT':
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
                    case 'SELECT':
                    case 'TEXTAREA':
                        return true;
                    default:
                        return false;
                    }
                }).map(el => [
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
    138: [
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
    139: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._fixNoscript = exports.fix = exports.parse = void 0;
            const maybe_1 = _dereq_('spica/maybe');
            const either_1 = _dereq_('spica/either');
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
                return [...doc.querySelectorAll('noscript')].filter(el => el.children.length > 0).map(el => {
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
            'spica/either': 15,
            'spica/maybe': 24
        }
    ],
    140: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._match = exports._expand = exports.compare = exports.router = void 0;
            const url_1 = _dereq_('spica/url');
            const sequence_1 = _dereq_('spica/sequence');
            const curry_1 = _dereq_('spica/curry');
            const flip_1 = _dereq_('spica/flip');
            const memoize_1 = _dereq_('spica/memoize');
            function router(config) {
                return url => {
                    const {path, pathname} = new url_1.URL(url_1.standardize(url, window.location.href));
                    return sequence_1.Sequence.from(Object.keys(config).filter(p => p[0] === '/').sort().reverse()).filter(curry_1.curry(flip_1.flip(compare))(pathname)).map(pattern => config[pattern]).take(1).extract().pop().call(config, path);
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
            const expand = memoize_1.memoize(pattern => {
                if (pattern.match(/\*\*|[\[\]]/))
                    throw new Error(`Invalid pattern: ${ pattern }`);
                return pattern === '' ? [pattern] : sequence_1.Sequence.from(pattern.match(/{[^{}]*}|.[^{]*/g)).map(p => p.match(/^{[^{}]*}$/) ? p.slice(1, -1).split(',') : [p]).mapM(sequence_1.Sequence.from).map(ps => ps.join('')).bind(p => p === pattern ? sequence_1.Sequence.from([p]) : sequence_1.Sequence.from(expand(p))).unique().extract();
            });
            exports._expand = expand;
            const match = memoize_1.memoize((pattern, segment) => {
                if (segment[0] === '.' && [...'?*'].includes(pattern[0]))
                    return false;
                return match(optimize(pattern), segment);
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
            }, (pat, seg) => `${ pat } ${ seg }`);
            exports._match = match;
        },
        {
            'spica/curry': 14,
            'spica/flip': 17,
            'spica/memoize': 25,
            'spica/sequence': 86,
            'spica/url': 92
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
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            var __importDefault = this && this.__importDefault || function (mod) {
                return mod && mod.__esModule ? mod : { 'default': mod };
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.default = void 0;
            var export_1 = _dereq_('./src/export');
            Object.defineProperty(exports, 'default', {
                enumerable: true,
                get: function () {
                    return __importDefault(export_1).default;
                }
            });
            __exportStar(_dereq_('./src/export'), exports);
        },
        { './src/export': 101 }
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