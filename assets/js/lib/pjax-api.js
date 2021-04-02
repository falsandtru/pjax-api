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
            exports.isArray = exports.ObjectValues = exports.ObjectSetPrototypeOf = exports.ObjectSeal = exports.ObjectPreventExtensions = exports.ObjectKeys = exports.isSealed = exports.isFrozen = exports.isExtensible = exports.ObjectIs = exports.ObjectGetPrototypeOf = exports.ObjectGetOwnPropertySymbols = exports.ObjectGetOwnPropertyNames = exports.ObjectGetOwnPropertyDescriptors = exports.ObjectGetOwnPropertyDescriptor = exports.ObjectFromEntries = exports.ObjectFreeze = exports.ObjectEntries = exports.ObjectDefineProperty = exports.ObjectDefineProperties = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.SymbolKeyFor = exports.SymbolFor = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.NaN = void 0;
            exports.NaN = Number.NaN, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
            exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign;
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
            exports.join = exports.splice = exports.pop = exports.push = exports.shift = exports.unshift = exports.indexOf = void 0;
            const global_1 = _dereq_('./global');
            function indexOf(as, a) {
                if (as.length === 0)
                    return -1;
                return a === a ? as.indexOf(a) : as.findIndex(a => a !== a);
            }
            exports.indexOf = indexOf;
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
            function shift(as, count) {
                if (count < 0)
                    throw new Error('Unexpected negative number');
                return count === void 0 ? [
                    as.shift(),
                    as
                ] : [
                    splice(as, 0, count),
                    as
                ];
            }
            exports.shift = shift;
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
            function pop(as, count) {
                if (count < 0)
                    throw new Error('Unexpected negative number');
                return count === void 0 ? [
                    as,
                    as.pop()
                ] : [
                    as,
                    splice(as, as.length - count, count)
                ];
            }
            exports.pop = pop;
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
                    case void 0:
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
                    case void 0:
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
            exports.template = exports.overwrite = exports.inherit = exports.merge = exports.extend = exports.clone = exports.assign = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const type_1 = _dereq_('./type');
            const array_1 = _dereq_('./array');
            exports.assign = template((prop, target, source) => target[prop] = source[prop]);
            exports.clone = template((prop, target, source) => {
                switch ((0, type_1.type)(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Object':
                        return target[prop] = (0, exports.clone)(empty(source[prop]), source[prop]);
                    default:
                        return target[prop] = source[prop];
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.extend = template((prop, target, source) => {
                switch ((0, type_1.type)(source[prop])) {
                case 'undefined':
                    return;
                case 'Array':
                    return target[prop] = source[prop];
                case 'Object':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Object':
                        return target[prop] = (0, exports.extend)(target[prop], source[prop]);
                    default:
                        return target[prop] = (0, exports.extend)(empty(source[prop]), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.merge = template((prop, target, source) => {
                switch ((0, type_1.type)(source[prop])) {
                case 'undefined':
                    return;
                case 'Array':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Array':
                        return target[prop] = (0, array_1.push)(target[prop], source[prop]);
                    default:
                        return target[prop] = source[prop].slice();
                    }
                case 'Object':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Object':
                        return target[prop] = (0, exports.merge)(target[prop], source[prop]);
                    default:
                        return target[prop] = (0, exports.merge)(empty(source[prop]), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.inherit = template((prop, target, source) => {
                switch ((0, type_1.type)(source[prop])) {
                case 'undefined':
                    return;
                case 'Array':
                    return target[prop] = source[prop].slice();
                case 'Object':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Object':
                        return target[prop] = (0, alias_1.hasOwnProperty)(target, prop) ? (0, exports.inherit)(target[prop], source[prop]) : (0, exports.inherit)((0, alias_1.ObjectCreate)(target[prop]), source[prop]);
                    default:
                        return target[prop] = (0, alias_1.ObjectCreate)(source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            exports.overwrite = template((prop, target, source) => {
                switch ((0, type_1.type)(source[prop])) {
                case 'Array':
                    return target[prop] = source[prop];
                case 'Object':
                    switch ((0, type_1.type)(target[prop])) {
                    case 'Object':
                        return target[prop] = (0, exports.overwrite)(target[prop], source[prop]);
                    default:
                        return target[prop] = (0, exports.overwrite)(empty(source[prop]), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
            function template(strategy) {
                return walk;
                function walk(target, ...sources) {
                    if ((0, type_1.isPrimitive)(target))
                        return target;
                    for (let i = 0; i < sources.length; ++i) {
                        const source = sources[i];
                        if (source === target)
                            continue;
                        if ((0, type_1.isPrimitive)(source))
                            continue;
                        const keys = (0, alias_1.ObjectKeys)(source);
                        for (let i = 0; i < keys.length; ++i) {
                            strategy(keys[i], target, source);
                        }
                    }
                    return target;
                }
            }
            exports.template = template;
            function empty(source) {
                switch ((0, type_1.type)(source)) {
                case 'Array':
                    return [];
                case 'Object':
                    return source instanceof global_1.Object ? {} : (0, alias_1.ObjectCreate)(null);
                default:
                    return source;
                }
            }
        },
        {
            './alias': 4,
            './array': 5,
            './global': 20,
            './type': 96
        }
    ],
    7: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Cache = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const clock_1 = _dereq_('./clock');
            const invlist_1 = _dereq_('./invlist');
            const stack_1 = _dereq_('./stack');
            const assign_1 = _dereq_('./assign');
            const tuple_1 = _dereq_('./tuple');
            const compare_1 = _dereq_('./compare');
            class Cache {
                constructor(capacity, opts = {}) {
                    this.capacity = capacity;
                    this.settings = {
                        space: global_1.Infinity,
                        age: global_1.Infinity,
                        capture: {
                            delete: true,
                            clear: true
                        }
                    };
                    this.SIZE = 0;
                    this.clock = 0;
                    this.clockR = 0;
                    this.memory = new global_1.Map();
                    this.indexes = {
                        LRU: new invlist_1.List(),
                        LFU: new invlist_1.List()
                    };
                    this.stack = new stack_1.Stack();
                    this.stats = {
                        LRU: (0, tuple_1.tuple)(0, 0),
                        LFU: (0, tuple_1.tuple)(0, 0)
                    };
                    this.ratio = 50;
                    this.frequency = (0, alias_1.max)(this.capacity / 100 | 0, 1);
                    if (capacity < 1)
                        throw new Error(`Spica: Cache: Capacity must be 1 or more.`);
                    (0, assign_1.extend)(this.settings, opts);
                    this.space = this.settings.space;
                }
                get length() {
                    return this.indexes.LRU.length + this.indexes.LFU.length;
                }
                get size() {
                    return this.SIZE;
                }
                resume() {
                    if (this.stack.isEmpty())
                        return;
                    const {
                        stack,
                        settings: {disposer}
                    } = this;
                    while (!stack.isEmpty()) {
                        const {key, value} = stack.pop();
                        disposer(value, key);
                    }
                }
                dispose({index, value, size}, callback) {
                    var _a, _b;
                    index.delete();
                    this.memory.delete(index.value.key);
                    this.SIZE -= size;
                    callback && ((_b = (_a = this.settings).disposer) === null || _b === void 0 ? void 0 : _b.call(_a, value, index.value.key));
                }
                secure(margin, key) {
                    if (margin <= 0)
                        return;
                    const {LRU, LFU} = this.indexes;
                    let miss = arguments.length < 2 ? false : void 0;
                    let restore;
                    while (this.length === this.capacity || this.size + margin > this.space) {
                        const list = false || LRU.length === +(restore === LRU) || LFU.length > this.capacity * this.ratio / 100 || LFU.length > this.capacity / 2 && LFU.last.value.clock < this.clock - this.capacity * 8 || LFU.last && LFU.last.value.expiry < (0, clock_1.now)() ? LFU : LRU;
                        const index = list.last.value;
                        if (miss !== null && miss !== void 0 ? miss : (0, compare_1.equal)(index.key, key)) {
                            miss = false;
                            restore = list;
                            restore.head = restore.last;
                            continue;
                        }
                        const record = this.memory.get(index.key);
                        this.dispose(record, false);
                        this.settings.disposer && this.stack.push({
                            key: index.key,
                            value: record.value
                        });
                    }
                    if (restore) {
                        restore.head = restore.tail;
                    }
                }
                put(key, value, size = 1, age = this.settings.age) {
                    var _a, _b;
                    if (size < 1)
                        throw new Error(`Spica: Cache: Size must be 1 or more.`);
                    if (age < 1)
                        throw new Error(`Spica: Cache: Age must be 1 or more.`);
                    if (size > this.space || age <= 0) {
                        (_b = (_a = this.settings).disposer) === null || _b === void 0 ? void 0 : _b.call(_a, value, key);
                        return false;
                    }
                    const expiry = age === global_1.Infinity ? global_1.Infinity : (0, clock_1.now)() + age;
                    const record = this.memory.get(key);
                    if (record) {
                        this.settings.disposer && this.stack.push({
                            key,
                            value: record.value
                        });
                        this.secure(size - record.size, key);
                        this.SIZE += size - record.size;
                        record.value = value;
                        record.size = size;
                        record.index.value.expiry = expiry;
                        this.resume();
                        return true;
                    }
                    this.secure(size);
                    const {LRU} = this.indexes;
                    this.SIZE += size;
                    this.memory.set(key, {
                        index: LRU.unshift({
                            key,
                            clock: ++this.clockR,
                            expiry
                        }),
                        value,
                        size
                    });
                    this.resume();
                    return false;
                }
                set(key, value, size, age) {
                    this.put(key, value, size, age);
                    return this;
                }
                get(key) {
                    const record = this.memory.get(key);
                    if (!record)
                        return;
                    const expiry = record.index.value.expiry;
                    if (expiry !== global_1.Infinity && expiry <= (0, clock_1.now)()) {
                        this.dispose(record, true);
                        return;
                    }
                    if (this.capacity >= 10 && record.index === record.index.list.head)
                        return record.value;
                    this.access(record);
                    this.slide();
                    return record.value;
                }
                has(key) {
                    const record = this.memory.get(key);
                    if (!record)
                        return false;
                    const expiry = record.index.value.expiry;
                    if (expiry !== global_1.Infinity && expiry <= (0, clock_1.now)()) {
                        this.dispose(record, true);
                        return false;
                    }
                    return true;
                }
                delete(key) {
                    const record = this.memory.get(key);
                    if (!record)
                        return false;
                    this.dispose(record, this.settings.capture.delete === true);
                    return true;
                }
                clear() {
                    this.SIZE = 0;
                    this.ratio = 50;
                    this.indexes.LRU.clear();
                    this.indexes.LFU.clear();
                    this.stack.clear();
                    this.stats = {
                        LRU: [
                            0,
                            0
                        ],
                        LFU: [
                            0,
                            0
                        ]
                    };
                    if (!this.settings.disposer || !this.settings.capture.clear)
                        return void this.memory.clear();
                    const memory = this.memory;
                    this.memory = new global_1.Map();
                    for (const [key, {value}] of memory) {
                        this.settings.disposer(value, key);
                    }
                }
                *[Symbol.iterator]() {
                    for (const [key, {value}] of this.memory) {
                        yield [
                            key,
                            value
                        ];
                    }
                    return;
                }
                slide() {
                    const {LRU, LFU} = this.stats;
                    const {capacity, ratio, indexes} = this;
                    const window = capacity;
                    if (LRU[0] + LFU[0] === window) {
                        this.stats = {
                            LRU: [
                                0,
                                LRU[0]
                            ],
                            LFU: [
                                0,
                                LFU[0]
                            ]
                        };
                    }
                    if ((LRU[0] + LFU[0]) % this.frequency || LRU[1] + LFU[1] === 0)
                        return;
                    const rateR = rate(window, LRU[0], LRU[0] + LFU[0], LRU[1], LRU[1] + LFU[1]);
                    const rateF = rate(window, LFU[0], LRU[0] + LFU[0], LFU[1], LRU[1] + LFU[1]) * indexes.LRU.length / indexes.LFU.length | 0;
                    if (ratio < 100 && rateF > rateR && indexes.LFU.length >= capacity * ratio / 100) {
                        ++this.ratio;
                    } else if (ratio > 10 && rateR > rateF && indexes.LRU.length >= capacity * (100 - ratio) / 100) {
                        --this.ratio;
                    }
                }
                access(record) {
                    return this.accessLFU(record) || this.accessLRU(record);
                }
                accessLRU(record) {
                    const index = record.index;
                    const {LRU, LFU} = this.indexes;
                    ++this.stats.LRU[0];
                    ++this.clock;
                    ++this.clockR;
                    if (index.value.clock + LRU.length / 3 > this.clockR) {
                        index.value.clock = this.clockR;
                        index.moveToHead();
                        return true;
                    }
                    index.delete();
                    index.value.clock = this.clock;
                    record.index = LFU.unshift(index.value);
                    return true;
                }
                accessLFU(record) {
                    const index = record.index;
                    if (index.list !== this.indexes.LFU)
                        return false;
                    ++this.stats.LFU[0];
                    ++this.clock;
                    index.value.clock = this.clock;
                    index.moveToHead();
                    return true;
                }
            }
            exports.Cache = Cache;
            function rate(window, currHits, currTotal, prevHits, prevTotal) {
                window = (0, alias_1.min)(currTotal + prevTotal, window);
                const currRate = currHits * 100 / currTotal | 0;
                const currRatio = (0, alias_1.min)(currTotal * 100 / window | 0, 100);
                const prevRate = prevHits * 100 / prevTotal | 0;
                const prevRatio = 100 - currRatio;
                return currRate * currRatio + prevRate * prevRatio | 0;
            }
        },
        {
            './alias': 4,
            './assign': 6,
            './clock': 10,
            './compare': 11,
            './global': 20,
            './invlist': 23,
            './stack': 92,
            './tuple': 95
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
            const maybe_1 = _dereq_('./maybe');
            const either_1 = _dereq_('./either');
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
                get cancelled() {
                    return this[internal].cancelled;
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
                get cancelled() {
                    return 'reason' in this;
                }
                register(listener) {
                    if (!this.alive) {
                        this.cancelled && handler(this.reason);
                        return noop_1.noop;
                    }
                    this.listeners.add(handler);
                    return (0, function_1.once)(() => void this.listeners.delete(handler));
                    function handler(reason) {
                        try {
                            listener(reason);
                        } catch (reason) {
                            (0, exception_1.causeAsyncException)(reason);
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
                    return this.cancelled ? promise_1.AtomicPromise.reject(this.reason) : promise_1.AtomicPromise.resolve(val);
                }
                maybe(val) {
                    return (0, maybe_1.Just)(val).bind(val => this.cancelled ? maybe_1.Nothing : (0, maybe_1.Just)(val));
                }
                either(val) {
                    return (0, either_1.Right)(val).bind(val => this.cancelled ? (0, either_1.Left)(this.reason) : (0, either_1.Right)(val));
                }
            }
        },
        {
            './either': 15,
            './exception': 16,
            './function': 18,
            './global': 20,
            './maybe': 28,
            './noop': 86,
            './promise': 88
        }
    ],
    9: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Channel = void 0;
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const fail = () => promise_1.AtomicPromise.reject(new Error('Spica: Channel: Closed.'));
            const internal = Symbol.for('spica/channel::internal');
            class Channel {
                constructor(capacity = 0) {
                    this[internal] = new Internal(capacity);
                }
                get alive() {
                    return this[internal].alive;
                }
                close(finalizer) {
                    if (!this.alive)
                        return;
                    const core = this[internal];
                    const {buffer, producers, consumers} = core;
                    core.alive = false;
                    while (producers.length || consumers.length) {
                        producers.length && producers.shift().bind(fail());
                        consumers.length && consumers.shift().bind(fail());
                    }
                    if (finalizer) {
                        promise_1.AtomicPromise.all(buffer).then(finalizer);
                    }
                }
                put(msg) {
                    if (!this.alive)
                        return fail();
                    const {capacity, buffer, producers, consumers} = this[internal];
                    switch (true) {
                    case buffer.length < capacity:
                    case consumers.length > 0:
                        buffer.push(msg);
                        consumers.length > 0 && consumers.shift().bind(buffer.shift());
                        return promise_1.AtomicPromise.resolve();
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
                get size() {
                    return this[internal].buffer.length;
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
                constructor(capacity = 0) {
                    this.capacity = capacity;
                    this.alive = true;
                    this.buffer = [];
                    this.producers = [];
                    this.consumers = [];
                }
            }
        },
        {
            './future': 19,
            './promise': 88
        }
    ],
    10: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.tick = exports.wait = exports.clock = exports.now = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const promise_1 = _dereq_('./promise');
            const exception_1 = _dereq_('./exception');
            let now_;
            let count = 0;
            function now() {
                if (now_ === void 0) {
                    tick(() => now_ = void 0);
                } else {
                    if (++count !== 100)
                        return now_;
                    count = 0;
                }
                return now_ = global_1.Date.now();
            }
            exports.now = now;
            exports.clock = Promise.resolve(undefined);
            function wait(ms) {
                return ms === 0 ? promise_1.AtomicPromise.resolve(exports.clock) : new promise_1.AtomicPromise(resolve => void (0, global_1.setTimeout)(resolve, ms));
            }
            exports.wait = wait;
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
                        jobs[i] = void 0;
                    } catch (reason) {
                        (0, exception_1.causeAsyncException)(reason);
                    }
                }
                jobs.length > 1000 && count < jobs.length * 0.5 && jobs.splice((0, alias_1.floor)(jobs.length * 0.9), jobs.length);
            }
        },
        {
            './alias': 4,
            './exception': 16,
            './global': 20,
            './promise': 88
        }
    ],
    11: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.equal = void 0;
            function equal(a, b) {
                return a === a ? a === b : b !== b;
            }
            exports.equal = equal;
        },
        {}
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
                        return promise_1.never;
                    }, {
                        delay: false,
                        ...opts
                    });
                }
            }
            exports.Copropagator = Copropagator;
            function all(sources, memory) {
                const before = (0, alias_1.isArray)(sources) ? sources : [...sources];
                return promise_1.AtomicPromise.all(before).then(values => {
                    const after = (0, alias_1.isArray)(sources) ? sources : [...sources];
                    const same = after.length === before.length && after.every((_, i) => after[i] === before[i]);
                    if (!memory && same)
                        return values;
                    memory !== null && memory !== void 0 ? memory : memory = new global_1.Map();
                    for (let i = 0; i < values.length; ++i) {
                        void memory.set(before[i], values[i]);
                    }
                    return same ? [...memory.values()] : all(after, memory);
                });
            }
        },
        {
            './alias': 4,
            './coroutine': 13,
            './global': 20,
            './promise': 88
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
            const clock_1 = _dereq_('./clock');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const channel_1 = _dereq_('./channel');
            const assign_1 = _dereq_('./assign');
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
                                        void 0,
                                        noop_1.noop
                                    ]] : await global_1.Promise.all([
                                    core.settings.capacity < 0 ? [
                                        void 0,
                                        noop_1.noop
                                    ] : core.sendBuffer.take(),
                                    global_1.Promise.all([
                                        core.settings.resume(),
                                        core.settings.interval > 0 ? (0, clock_1.wait)(core.settings.interval) : void 0
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
                    if (core.settings.trigger !== void 0) {
                        for (const prop of (0, global_1.Array)().concat(core.settings.trigger)) {
                            if (prop in this && this.hasOwnProperty(prop))
                                continue;
                            if (prop in this) {
                                (0, alias_1.ObjectDefineProperty)(this, prop, {
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
                                const desc = (0, alias_1.ObjectGetOwnPropertyDescriptor)(this, prop) || {
                                    value: this[prop],
                                    enumerable: true,
                                    configurable: true,
                                    writable: true
                                };
                                (0, alias_1.ObjectDefineProperty)(this, prop, {
                                    set(value) {
                                        (0, alias_1.ObjectDefineProperty)(this, prop, {
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
                        this[internal].settings.delay ? (0, clock_1.tick)(this[Coroutine.init]) : this[Coroutine.init]();
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
                            value: void 0,
                            done: true
                        });
                        core.result.bind({ value: result });
                    }, reason => {
                        const core = this[internal];
                        if (!core.alive)
                            return;
                        core.alive = false;
                        core.recvBuffer.put({
                            value: void 0,
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
                    this.settings = (0, assign_1.extend)({
                        run: true,
                        delay: true,
                        capacity: -1,
                        interval: 0,
                        resume: noop_1.noop,
                        trigger: void 0
                    }, this.opts);
                    this.alive = true;
                    this.reception = 0;
                    this.sendBuffer = this.settings.capacity >= 0 ? new channel_1.Channel(this.settings.capacity) : void 0;
                    this.recvBuffer = this.settings.capacity >= 0 ? new channel_1.Channel(0) : new BroadcastChannel();
                    this.result = new future_1.AtomicFuture();
                    this.result.finally(() => {
                        var _c;
                        (_c = this.sendBuffer) === null || _c === void 0 ? void 0 : _c.close(msgs => {
                            while (msgs.length > 0) {
                                const [, reply] = msgs.shift();
                                try {
                                    reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
                                } catch (reason) {
                                    (0, exception_1.causeAsyncException)(reason);
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
                    if (core.settings.capacity < 0)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
                    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
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
                    if (core.settings.capacity < 0)
                        return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
                    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
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
                        core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
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
                    return promise_1.AtomicPromise.resolve();
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
            './clock': 10,
            './exception': 16,
            './future': 19,
            './global': 20,
            './noop': 86,
            './promise': 88
        }
    ],
    14: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uncurry = exports.curry = void 0;
            const array_1 = _dereq_('./array');
            exports.curry = f => curry_(f, f.length);
            function curry_(f, arity, ...xs) {
                let g;
                return xs.length < arity ? (...ys) => curry_(g !== null && g !== void 0 ? g : g = xs.length && f.bind(void 0, ...xs) || f, arity - xs.length, ...ys) : f(...xs);
            }
            const uncurry = f => uncurry_(f);
            exports.uncurry = uncurry;
            function uncurry_(f) {
                const arity = f.length;
                return (...xs) => arity === 0 || xs.length < 2 || xs.length <= arity ? f(...xs) : uncurry_(f(...(0, array_1.shift)(xs, arity)[0]))(...xs);
            }
        },
        { './array': 5 }
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
        { './monad/either': 32 }
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
                const gs = (0, global_1.Array)(fs.length);
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
            './noop': 86
        }
    ],
    19: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a, _b, _c, _d;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.AtomicFuture = exports.Future = void 0;
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            const internal = Symbol.for('spica/promise::internal');
            class Future {
                constructor(strict = true) {
                    this[_a] = 'Promise';
                    this[_b] = new promise_1.Internal();
                    this.bind = value => {
                        const core = this[internal];
                        if (!core.isPending && !strict)
                            return this;
                        if (!core.isPending)
                            throw new Error(`Spica: Future: Cannot rebind a value.`);
                        core.resolve(value);
                        return this;
                    };
                }
                static get [Symbol.species]() {
                    return global_1.Promise;
                }
                then(onfulfilled, onrejected) {
                    return new global_1.Promise((resolve, reject) => this[internal].then(resolve, reject, onfulfilled, onrejected));
                }
                catch(onrejected) {
                    return this.then(void 0, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.Future = Future;
            _a = Symbol.toStringTag, _b = internal;
            class AtomicFuture {
                constructor(strict = true) {
                    this[_c] = 'Promise';
                    this[_d] = new promise_1.Internal();
                    this.bind = value => {
                        const core = this[internal];
                        if (!core.isPending && !strict)
                            return this;
                        if (!core.isPending)
                            throw new Error(`Spica: AtomicFuture: Cannot rebind a value.`);
                        core.resolve(value);
                        return this;
                    };
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
                then(onfulfilled, onrejected) {
                    return new promise_1.AtomicPromise((resolve, reject) => this[internal].then(resolve, reject, onfulfilled, onrejected));
                }
                catch(onrejected) {
                    return this.then(void 0, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicFuture = AtomicFuture;
            _c = Symbol.toStringTag, _d = internal;
        },
        {
            './global': 20,
            './promise': 88
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
            __exportStar(_dereq_('./list/hlist'), exports);
        },
        { './list/hlist': 25 }
    ],
    23: [
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
            __exportStar(_dereq_('./list/invlist'), exports);
        },
        { './list/invlist': 26 }
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
            __exportStar(_dereq_('./list/ixlist'), exports);
        },
        { './list/ixlist': 27 }
    ],
    25: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.HList = void 0;
            const array_1 = _dereq_('../array');
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
                    return (0, array_1.unshift)([this.head], this.tail.tuple());
                }
            }
        },
        { '../array': 5 }
    ],
    26: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Node = exports.List = void 0;
            const undefined = void 0;
            const LENGTH = Symbol('length');
            class List {
                constructor() {
                    this[_a] = 0;
                    this.head = undefined;
                }
                get length() {
                    return this[LENGTH];
                }
                get tail() {
                    var _b;
                    return (_b = this.head) === null || _b === void 0 ? void 0 : _b.next;
                }
                get last() {
                    var _b;
                    return (_b = this.head) === null || _b === void 0 ? void 0 : _b.prev;
                }
                clear() {
                    this.head = undefined;
                    this[LENGTH] = 0;
                }
                unshift(value) {
                    return this.head = this.push(value);
                }
                unshiftRotationally(value) {
                    const node = this.last;
                    if (!node)
                        return this.unshift(value);
                    node.value = value;
                    this.head = node;
                    return node;
                }
                shift() {
                    var _b;
                    return (_b = this.head) === null || _b === void 0 ? void 0 : _b.delete();
                }
                push(value) {
                    var _b;
                    return new Node(value, this.head, (_b = this.head) === null || _b === void 0 ? void 0 : _b.prev, this);
                }
                pushRotationally(value) {
                    const node = this.head;
                    if (!node)
                        return this.push(value);
                    node.value = value;
                    this.head = node.next;
                    return node;
                }
                pop() {
                    var _b;
                    return (_b = this.last) === null || _b === void 0 ? void 0 : _b.delete();
                }
                *[(_a = LENGTH, Symbol.iterator)]() {
                    for (let node = this.head; node;) {
                        yield node.value;
                        node = node.next;
                        if (node === this.head)
                            return;
                    }
                }
            }
            exports.List = List;
            class Node {
                constructor(value, next, prev, list = next ? next.list : new List()) {
                    var _b;
                    this.value = value;
                    this.next = next;
                    this.prev = prev;
                    this.list = list;
                    ++list[LENGTH];
                    (_b = list.head) !== null && _b !== void 0 ? _b : list.head = this;
                    next ? next.prev = this : this.next = this;
                    prev ? prev.next = this : this.prev = this;
                }
                delete() {
                    if (!this.next && !this.prev)
                        return this.value;
                    --this.list[LENGTH];
                    if (this.list.head === this) {
                        this.list.head = this.next === this ? undefined : this.next;
                    }
                    if (this.next) {
                        this.next.prev = this.prev;
                    }
                    if (this.prev) {
                        this.prev.next = this.next;
                    }
                    this.next = this.prev = undefined;
                    return this.value;
                }
                insertBefore(value) {
                    return new Node(value, this, this.prev, this.list);
                }
                insertAfter(value) {
                    return new Node(value, this.next, this, this.list);
                }
                move(before) {
                    if (!before)
                        return false;
                    if (this === before)
                        return false;
                    const a1 = this;
                    if (!a1)
                        return false;
                    const b1 = before;
                    if (!b1)
                        return false;
                    if (a1.next === b1)
                        return false;
                    const b0 = b1.prev;
                    const a0 = a1.prev;
                    const a2 = a1.next;
                    b0.next = a1;
                    a1.next = b1;
                    b1.prev = a1;
                    a1.prev = b0;
                    a0.next = a2;
                    a2.prev = a0;
                    return true;
                }
                moveToHead() {
                    this.move(this.list.head);
                    this.list.head = this;
                }
                moveToLast() {
                    this.move(this.list.head);
                }
                swap(node) {
                    const node1 = this;
                    const node2 = node;
                    if (node1 === node2)
                        return false;
                    const node3 = node2.next;
                    node2.move(node1);
                    node1.move(node3);
                    switch (this.list.head) {
                    case node1:
                        this.list.head = node2;
                        break;
                    case node2:
                        this.list.head = node1;
                        break;
                    }
                    return true;
                }
            }
            exports.Node = Node;
        },
        {}
    ],
    27: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.List = void 0;
            const global_1 = _dereq_('../global');
            const stack_1 = _dereq_('../stack');
            const compare_1 = _dereq_('../compare');
            const undefined = void 0;
            class List {
                constructor(index, capacity = 0) {
                    this.index = index;
                    this.capacity = capacity;
                    this.nodes = {};
                    this.buffers = new stack_1.Stack();
                    this.HEAD = 0;
                    this.CURSOR = 0;
                    this.LENGTH = 0;
                    this.capacity || (this.capacity = global_1.Number.MAX_SAFE_INTEGER);
                }
                get length() {
                    return this.LENGTH;
                }
                get head() {
                    return this.nodes[this.HEAD];
                }
                get tail() {
                    const head = this.head;
                    return head && this.nodes[head.next];
                }
                get last() {
                    const head = this.head;
                    return head && this.nodes[head.prev];
                }
                node(index) {
                    return this.nodes[index];
                }
                rotateToNext() {
                    var _a, _b;
                    return this.HEAD = (_b = (_a = this.tail) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : this.HEAD;
                }
                rotateToPrev() {
                    var _a, _b;
                    return this.HEAD = (_b = (_a = this.last) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : this.HEAD;
                }
                clear() {
                    var _a;
                    this.nodes = {};
                    this.buffers.clear();
                    (_a = this.index) === null || _a === void 0 ? void 0 : _a.clear();
                    this.HEAD = 0;
                    this.CURSOR = 0;
                    this.LENGTH = 0;
                }
                add(key, value) {
                    var _a, _b;
                    const nodes = this.nodes;
                    const head = nodes[this.HEAD];
                    if (!head) {
                        const index = this.HEAD = this.CURSOR = this.buffers.length > 0 ? this.buffers.pop() : this.length;
                        ++this.LENGTH;
                        (_a = this.index) === null || _a === void 0 ? void 0 : _a.set(key, index);
                        nodes[index] = {
                            index,
                            key,
                            value,
                            next: index,
                            prev: index
                        };
                        return index;
                    }
                    if (this.length !== this.capacity) {
                        const index = this.HEAD = this.CURSOR = this.buffers.length > 0 ? this.buffers.pop() : this.length;
                        ++this.LENGTH;
                        (_b = this.index) === null || _b === void 0 ? void 0 : _b.set(key, index);
                        nodes[index] = {
                            index,
                            key,
                            value,
                            next: head.index,
                            prev: head.prev
                        };
                        head.prev = nodes[head.prev].next = index;
                        return index;
                    } else {
                        const node = nodes[head.prev];
                        const index = this.HEAD = this.CURSOR = node.index;
                        if (this.index && !(0, compare_1.equal)(node.key, key)) {
                            this.index.delete(node.key, index);
                            this.index.set(key, index);
                        }
                        node.key = key;
                        node.value = value;
                        return index;
                    }
                }
                put(key, value, index) {
                    const node = this.search(key, index);
                    if (!node)
                        return this.add(key, value);
                    node.value = value;
                    return node.index;
                }
                set(key, value, index) {
                    this.put(key, value, index);
                    return this;
                }
                search(key, cursor = this.CURSOR) {
                    var _a;
                    const nodes = this.nodes;
                    let node;
                    node = nodes[cursor];
                    if (node && (0, compare_1.equal)(node.key, key))
                        return this.CURSOR = cursor, node;
                    if (!this.index)
                        throw new Error(`Spica: IxList: Invalid index.`);
                    if (node ? this.length === 1 : this.length === 0)
                        return;
                    node = nodes[cursor = (_a = this.index.get(key)) !== null && _a !== void 0 ? _a : this.capacity];
                    if (node)
                        return this.CURSOR = cursor, node;
                }
                find(key, index) {
                    return this.search(key, index);
                }
                get(key, index) {
                    var _a;
                    return (_a = this.search(key, index)) === null || _a === void 0 ? void 0 : _a.value;
                }
                has(key, index) {
                    return this.search(key, index) !== undefined;
                }
                del(key, index) {
                    var _a;
                    const cursor = this.CURSOR;
                    const node = this.search(key, index);
                    if (!node)
                        return;
                    this.CURSOR = cursor;
                    --this.LENGTH;
                    this.buffers.push(node.index);
                    (_a = this.index) === null || _a === void 0 ? void 0 : _a.delete(node.key, node.index);
                    const nodes = this.nodes;
                    nodes[node.prev].next = node.next;
                    nodes[node.next].prev = node.prev;
                    if (this.HEAD === node.index) {
                        this.HEAD = node.next;
                    }
                    if (this.CURSOR === node.index) {
                        this.CURSOR = node.next;
                    }
                    nodes[node.index] = undefined;
                    return node;
                }
                delete(key, index) {
                    return this.del(key, index) !== undefined;
                }
                insert(key, value, before) {
                    const head = this.HEAD;
                    this.HEAD = before;
                    const index = this.add(key, value);
                    if (this.length !== 1) {
                        this.HEAD = head;
                    }
                    return index;
                }
                unshift(key, value) {
                    return this.add(key, value);
                }
                unshiftRotationally(key, value) {
                    if (this.length === 0)
                        return this.unshift(key, value);
                    const node = this.last;
                    if (this.index && !(0, compare_1.equal)(node.key, key)) {
                        this.index.delete(node.key, node.index);
                        this.index.set(key, node.index);
                    }
                    this.HEAD = node.index;
                    this.CURSOR = node.index;
                    node.key = key;
                    node.value = value;
                    return node.index;
                }
                shift() {
                    const node = this.head;
                    return node && this.del(node.key, node.index);
                }
                push(key, value) {
                    return this.insert(key, value, this.HEAD);
                }
                pushRotationally(key, value) {
                    if (this.length === 0)
                        return this.push(key, value);
                    const node = this.head;
                    if (this.index && !(0, compare_1.equal)(node.key, key)) {
                        this.index.delete(node.key, node.index);
                        this.index.set(key, node.index);
                    }
                    this.HEAD = node.next;
                    this.CURSOR = node.index;
                    node.key = key;
                    node.value = value;
                    return node.index;
                }
                pop() {
                    const node = this.last;
                    return node && this.del(node.key, node.index);
                }
                replace(index, key, value) {
                    const node = this.nodes[index];
                    if (!node)
                        return;
                    if (this.index && !(0, compare_1.equal)(node.key, key)) {
                        this.index.delete(node.key, index);
                        this.index.set(key, index);
                    }
                    const clone = {
                        index: node.index,
                        key: node.key,
                        value: node.value,
                        next: node.next,
                        prev: node.prev
                    };
                    node.key = key;
                    node.value = value;
                    return clone;
                }
                move(index, before) {
                    if (index === before)
                        return false;
                    const nodes = this.nodes;
                    const a1 = nodes[index];
                    if (!a1)
                        return false;
                    const b1 = nodes[before];
                    if (!b1)
                        return false;
                    if (a1.next === b1.index)
                        return false;
                    const b0 = nodes[b1.prev];
                    const a0 = nodes[a1.prev];
                    const a2 = nodes[a1.next];
                    b0.next = a1.index;
                    a1.next = b1.index;
                    b1.prev = a1.index;
                    a1.prev = b0.index;
                    a0.next = a2.index;
                    a2.prev = a0.index;
                    return true;
                }
                moveToHead(index) {
                    this.move(index, this.HEAD);
                    this.HEAD = index;
                }
                moveToLast(index) {
                    this.move(index, this.HEAD);
                }
                swap(index1, index2) {
                    if (index1 === index2)
                        return false;
                    const nodes = this.nodes;
                    const node1 = nodes[index1];
                    if (!node1)
                        return false;
                    const node2 = nodes[index2];
                    if (!node2)
                        return false;
                    const node3 = nodes[node2.next];
                    this.move(node2.index, node1.index);
                    this.move(node1.index, node3.index);
                    switch (this.HEAD) {
                    case node1.index:
                        this.HEAD = node2.index;
                        break;
                    case node2.index:
                        this.HEAD = node1.index;
                        break;
                    }
                    return true;
                }
                *[Symbol.iterator]() {
                    const nodes = this.nodes;
                    for (let node = nodes[this.HEAD]; node;) {
                        yield [
                            node.key,
                            node.value
                        ];
                        node = nodes[node.next];
                        if ((node === null || node === void 0 ? void 0 : node.index) === this.HEAD)
                            return;
                    }
                }
            }
            exports.List = List;
        },
        {
            '../compare': 11,
            '../global': 20,
            '../stack': 92
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
            var __exportStar = this && this.__exportStar || function (m, exports) {
                for (var p in m)
                    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
                        __createBinding(exports, m, p);
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            __exportStar(_dereq_('./monad/maybe'), exports);
        },
        { './monad/maybe': 36 }
    ],
    29: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.reduce = exports.memoize = void 0;
            const global_1 = _dereq_('./global');
            const compare_1 = _dereq_('./compare');
            function memoize(f, identify = (...as) => as[0], memory) {
                if (typeof identify === 'object')
                    return memoize(f, void 0, identify);
                if (memory === void 0)
                    return memoize(f, identify, new global_1.Map());
                let nullish = false;
                return (...as) => {
                    const b = identify(...as);
                    let z = memory.get(b);
                    if (z !== void 0 || nullish && memory.has(b))
                        return z;
                    z = f(...as);
                    nullish || (nullish = z === void 0);
                    memory.set(b, z);
                    return z;
                };
            }
            exports.memoize = memoize;
            function reduce(f, identify = (...as) => as[0]) {
                let key = [];
                let val = [];
                return (...as) => {
                    const b = identify(...as);
                    if (!(0, compare_1.equal)(key, b)) {
                        key = b;
                        val = f(...as);
                    }
                    return val;
                };
            }
            exports.reduce = reduce;
        },
        {
            './compare': 11,
            './global': 20
        }
    ],
    30: [
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
                    return aa ? af.bind(f => aa.fmap((0, curry_1.curry)(f))) : aa => ap(af, aa);
                }
                Applicative.ap = ap;
            }(Applicative = exports.Applicative || (exports.Applicative = {})));
        },
        {
            '../curry': 14,
            './functor': 33
        }
    ],
    31: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Right = exports.Left = exports.Either = void 0;
            const monad_1 = _dereq_('./monad');
            const promise_1 = _dereq_('../promise');
            const noop_1 = _dereq_('../noop');
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
                        const r = m.extract(noop_1.noop, a => [a]);
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
            '../noop': 86,
            '../promise': 88,
            './monad': 37
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
            exports.Right = exports.Left = exports.Either = void 0;
            const Monad = __importStar(_dereq_('./either.impl'));
            const noop_1 = _dereq_('../noop');
            class Either extends Monad.Either {
                constructor() {
                    super(noop_1.noop);
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
        {
            '../noop': 86,
            './either.impl': 31
        }
    ],
    33: [
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
        { './lazy': 34 }
    ],
    34: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Lazy = void 0;
            class Lazy {
                constructor(thunk) {
                    this.thunk = thunk;
                    this.memory_ = void 0;
                }
                evaluate() {
                    var _a;
                    return (_a = this.memory_) !== null && _a !== void 0 ? _a : this.memory_ = this.thunk();
                }
            }
            exports.Lazy = Lazy;
        },
        {}
    ],
    35: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Nothing = exports.Just = exports.Maybe = void 0;
            const monadplus_1 = _dereq_('./monadplus');
            const promise_1 = _dereq_('../promise');
            const noop_1 = _dereq_('../noop');
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
                        const r = m.extract(noop_1.noop, a => [a]);
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
            '../noop': 86,
            '../promise': 88,
            './monadplus': 38
        }
    ],
    36: [
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
            const noop_1 = _dereq_('../noop');
            class Maybe extends Monad.Maybe {
                constructor() {
                    super(noop_1.noop);
                }
            }
            exports.Maybe = Maybe;
            function Just(a) {
                return new Monad.Just(a);
            }
            exports.Just = Just;
            exports.Nothing = Monad.Maybe.mzero;
        },
        {
            '../noop': 86,
            './maybe.impl': 35
        }
    ],
    37: [
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
        { './applicative': 30 }
    ],
    38: [
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
        { './monad': 37 }
    ],
    39: [
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
            './sequence/core': 40,
            './sequence/member/instance/ap': 41,
            './sequence/member/instance/bind': 42,
            './sequence/member/instance/drop': 43,
            './sequence/member/instance/dropUntil': 44,
            './sequence/member/instance/dropWhile': 45,
            './sequence/member/instance/extract': 46,
            './sequence/member/instance/filter': 47,
            './sequence/member/instance/filterM': 48,
            './sequence/member/instance/fmap': 49,
            './sequence/member/instance/foldr': 50,
            './sequence/member/instance/group': 51,
            './sequence/member/instance/inits': 52,
            './sequence/member/instance/iterate': 53,
            './sequence/member/instance/join': 54,
            './sequence/member/instance/map': 55,
            './sequence/member/instance/mapM': 56,
            './sequence/member/instance/memoize': 57,
            './sequence/member/instance/permutations': 58,
            './sequence/member/instance/reduce': 59,
            './sequence/member/instance/scanl': 60,
            './sequence/member/instance/segs': 61,
            './sequence/member/instance/sort': 62,
            './sequence/member/instance/subsequences': 63,
            './sequence/member/instance/tails': 64,
            './sequence/member/instance/take': 65,
            './sequence/member/instance/takeUntil': 66,
            './sequence/member/instance/takeWhile': 67,
            './sequence/member/instance/unique': 68,
            './sequence/member/static/concat': 69,
            './sequence/member/static/cycle': 70,
            './sequence/member/static/difference': 71,
            './sequence/member/static/from': 72,
            './sequence/member/static/intersect': 73,
            './sequence/member/static/mappend': 74,
            './sequence/member/static/mconcat': 75,
            './sequence/member/static/mempty': 76,
            './sequence/member/static/mplus': 77,
            './sequence/member/static/mzero': 78,
            './sequence/member/static/pure': 79,
            './sequence/member/static/random': 80,
            './sequence/member/static/resume': 81,
            './sequence/member/static/return': 82,
            './sequence/member/static/sequence': 83,
            './sequence/member/static/union': 84,
            './sequence/member/static/zip': 85
        }
    ],
    40: [
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
        { '../monadplus': 38 }
    ],
    41: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                ap(a) {
                    return core_1.Sequence.ap(this, a);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    42: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                bind(f) {
                    return core_1.Sequence.concat(this.fmap(f));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    43: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                drop(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    44: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                dropUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    45: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                dropWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    46: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    47: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                filter(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur()));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    48: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    49: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                fmap(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    50: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                foldr(f, z) {
                    return new core_1.Sequence((iter = () => this.reduce().iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(z), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).foldr(f, z))))).bind(s => s);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    51: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    52: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    53: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    54: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                join() {
                    return core_1.Sequence.concat(this);
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    55: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                map(f) {
                    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    56: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    57: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('../../../../global');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            const memoize_1 = _dereq_('../../../../memoize');
            const memory = (0, memoize_1.memoize)(_ => new global_1.Map());
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../../../memoize': 29,
            '../../core': 40
        }
    ],
    58: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    59: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('../../../../global');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    60: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    61: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    62: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                sort(cmp) {
                    return core_1.Sequence.from(this.extract().sort(cmp));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    63: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    64: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                tails() {
                    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map((_, i, as) => as.slice(i))), core_1.Sequence.from([[]]));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    65: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                take(n) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), () => cons(), thunk => core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    66: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                takeUntil(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    67: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                takeWhile(f) {
                    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons()));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    68: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                unique() {
                    const memory = new Set();
                    return this.filter(a => !memory.has(a) && !!memory.add(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    69: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    70: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    71: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    72: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    73: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    74: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    75: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    76: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mempty = new core_1.Sequence((_, cons) => cons()), _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    77: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mplus = core_1.Sequence.mappend, _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    78: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {
            }, _a.mzero = core_1.Sequence.mempty, _a));
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    79: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                static pure(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    80: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const alias_1 = _dereq_('../../../../alias');
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                static random(p = () => (0, alias_1.random)()) {
                    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence((_, cons) => cons(p(), _))) : this.random().map(r => p[(0, alias_1.floor)(r * p.length)]);
                }
            });
        },
        {
            '../../../../alias': 4,
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    81: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                static resume(iterator) {
                    return new core_1.Sequence((iter = iterator, cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    82: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                static Return(a) {
                    return new core_1.Sequence((_, cons) => cons(a));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    83: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
                static sequence(ms) {
                    return ms.reduce((acc, m) => acc.fmap(bs => core_1.Sequence.mappend(bs, m)), core_1.Sequence.Return(core_1.Sequence.from([])));
                }
            });
        },
        {
            '../../../../helper/compose': 21,
            '../../core': 40
        }
    ],
    84: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    85: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const compose_1 = _dereq_('../../../../helper/compose');
            (0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
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
            '../../core': 40
        }
    ],
    86: [
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
    87: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Observation = void 0;
            const global_1 = _dereq_('./global');
            const ixlist_1 = _dereq_('./ixlist');
            const assign_1 = _dereq_('./assign');
            const function_1 = _dereq_('./function');
            const array_1 = _dereq_('./array');
            const exception_1 = _dereq_('./exception');
            class ListenerNode {
                constructor(parent, index) {
                    this.parent = parent;
                    this.index = index;
                    this.children = new ixlist_1.List(new global_1.Map());
                    this.monitors = [];
                    this.subscribers = [];
                }
            }
            class Observation {
                constructor(opts = {}) {
                    this.id = 0;
                    this.node = new ListenerNode(void 0, void 0);
                    this.settings = {
                        limit: 10,
                        cleanup: false
                    };
                    this.relaies = new global_1.WeakSet();
                    (0, assign_1.extend)(this.settings, opts);
                }
                monitor(namespace, monitor, options = {}) {
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
                        options
                    };
                    monitors.push(item);
                    return (0, function_1.once)(() => void this.off(namespace, item));
                }
                on(namespace, subscriber, options = {}) {
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
                        options
                    };
                    subscribers.push(item);
                    return (0, function_1.once)(() => void this.off(namespace, item));
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
                            return void (0, array_1.splice)(items, items.indexOf(subscriber), 1);
                        }
                    case 'function': {
                            const items = node.subscribers;
                            return void (0, array_1.splice)(items, items.findIndex(item => item.listener === subscriber), 1);
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
                    if (this.relaies.has(source))
                        throw new global_1.Error(`Spica: Observation: Relay source is already registered.`);
                    this.relaies.add(source);
                    return source.monitor([], (data, namespace) => void this.emit(namespace, data));
                }
                refs(namespace) {
                    const node = this.seekNode(namespace, 1);
                    if (!node)
                        return [];
                    return (0, array_1.push)(this.refsBelow(node, 0), this.refsBelow(node, 1)).reduce((acc, rs) => (0, array_1.push)(acc, rs), []);
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
                                (0, exception_1.causeAsyncException)(reason);
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
                                (0, exception_1.causeAsyncException)(reason);
                            }
                            i = i < items.length ? i : items.length - 1;
                            for (; i >= 0 && items[i].id > item.id; --i);
                        }
                    }
                    if (tracker) {
                        try {
                            tracker(data, results);
                        } catch (reason) {
                            (0, exception_1.causeAsyncException)(reason);
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
                refsBelow_({monitors, subscribers, children}, type, acc) {
                    type === 0 ? acc.push(monitors) : acc.push(subscribers);
                    let count = 0;
                    for (let node = children.last, i = 0; node && i < children.length; (node = children.node(node.prev)) && ++i) {
                        const cnt = this.refsBelow_(node.value, type, acc)[1];
                        count += cnt;
                        if (cnt === 0 && this.settings.cleanup) {
                            node = children.node(children.del(node.key, node.index).next);
                            if (!node)
                                break;
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
                        const name = namespace[i];
                        const {children} = node;
                        let child = children.get(name);
                        if (!child) {
                            switch (mode) {
                            case 1:
                                return;
                            case 2:
                                return node;
                            }
                            child = new ListenerNode(node, name);
                            children.add(name, child);
                        }
                        node = child;
                    }
                    return node;
                }
            }
            exports.Observation = Observation;
            function clear({monitors, subscribers, children}) {
                for (let node = children.last, i = 0; node && i < children.length; (node = children.node(node.prev)) && ++i) {
                    if (!clear(node.value))
                        continue;
                    node = children.node(children.del(node.key, node.index).next);
                    if (!node)
                        break;
                    --i;
                }
                (0, array_1.splice)(subscribers, 0);
                return monitors.length === 0;
            }
        },
        {
            './array': 5,
            './assign': 6,
            './exception': 16,
            './function': 18,
            './global': 20,
            './ixlist': 24
        }
    ],
    88: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a, _b;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.never = exports.isPromiseLike = exports.Internal = exports.AtomicPromise = void 0;
            const global_1 = _dereq_('./global');
            const alias_1 = _dereq_('./alias');
            const noop_1 = _dereq_('./noop');
            const internal = Symbol.for('spica/promise::internal');
            class AtomicPromise {
                constructor(executor) {
                    this[_a] = 'Promise';
                    this[_b] = new Internal();
                    try {
                        executor(value => void this[internal].resolve(value), reason => void this[internal].reject(reason));
                    } catch (reason) {
                        this[internal].reject(reason);
                    }
                }
                static get [Symbol.species]() {
                    return AtomicPromise;
                }
                static all(vs) {
                    return new AtomicPromise((resolve, reject) => {
                        const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
                        const results = (0, global_1.Array)(values.length);
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
                        const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
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
                        const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
                        const results = (0, global_1.Array)(values.length);
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
                    return new AtomicPromise((resolve, reject) => this[internal].then(resolve, reject, onfulfilled, onrejected));
                }
                catch(onrejected) {
                    return this.then(void 0, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicPromise = AtomicPromise;
            _a = Symbol.toStringTag, _b = internal;
            class Internal {
                constructor() {
                    this.status = { state: 0 };
                    this.fulfillReactions = [];
                    this.rejectReactions = [];
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
                    if (isAtomicPromiseLike(value)) {
                        const core = value[internal];
                        switch (core.status.state) {
                        case 2:
                        case 3:
                            this.status = core.status;
                            return this.resume();
                        default:
                            return core.then(() => (this.status = core.status, this.resume()), () => (this.status = core.status, this.resume()));
                        }
                    }
                    this.status = {
                        state: 1,
                        promise: value
                    };
                    return void value.then(value => {
                        this.status = {
                            state: 2,
                            value
                        };
                        this.resume();
                    }, reason => {
                        this.status = {
                            state: 3,
                            reason
                        };
                        this.resume();
                    });
                }
                reject(reason) {
                    if (this.status.state !== 0)
                        return;
                    this.status = {
                        state: 3,
                        reason
                    };
                    return this.resume();
                }
                then(resolve, reject, onfulfilled, onrejected) {
                    const {status, fulfillReactions, rejectReactions} = this;
                    switch (status.state) {
                    case 2:
                        if (fulfillReactions.length !== 0)
                            break;
                        return call(resolve, reject, resolve, onfulfilled, status.value);
                    case 3:
                        if (rejectReactions.length !== 0)
                            break;
                        return call(resolve, reject, reject, onrejected, status.reason);
                    }
                    fulfillReactions.push([
                        resolve,
                        reject,
                        resolve,
                        onfulfilled
                    ]);
                    rejectReactions.push([
                        resolve,
                        reject,
                        reject,
                        onrejected
                    ]);
                }
                resume() {
                    const {status, fulfillReactions, rejectReactions} = this;
                    switch (status.state) {
                    case 0:
                    case 1:
                        return;
                    case 2:
                        if (rejectReactions.length !== 0) {
                            this.rejectReactions = [];
                        }
                        if (fulfillReactions.length === 0)
                            return;
                        react(fulfillReactions, status.value);
                        this.fulfillReactions = [];
                        return;
                    case 3:
                        if (fulfillReactions.length !== 0) {
                            this.fulfillReactions = [];
                        }
                        if (rejectReactions.length === 0)
                            return;
                        react(rejectReactions, status.reason);
                        this.rejectReactions = [];
                        return;
                    }
                }
            }
            exports.Internal = Internal;
            function react(reactions, param) {
                for (let i = 0; i < reactions.length; ++i) {
                    const reaction = reactions[i];
                    call(reaction[0], reaction[1], reaction[2], reaction[3], param);
                }
            }
            function call(resolve, reject, cont, callback, param) {
                if (!callback)
                    return cont(param);
                try {
                    resolve(callback(param));
                } catch (reason) {
                    reject(reason);
                }
            }
            function isPromiseLike(value) {
                return value !== null && typeof value === 'object' && typeof value.then === 'function';
            }
            exports.isPromiseLike = isPromiseLike;
            function isAtomicPromiseLike(value) {
                return internal in value;
            }
            exports.never = new class Never extends Promise {
                static get [Symbol.species]() {
                    return Never;
                }
                constructor() {
                    super(noop_1.noop);
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
            './alias': 4,
            './global': 20,
            './noop': 86
        }
    ],
    89: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.unique = exports.rnd0Z = exports.rnd0z = exports.rnd0f = exports.rnd64 = exports.rnd62 = exports.rnd36 = exports.rnd32 = exports.rnd16 = void 0;
            const global_1 = _dereq_('./global');
            const bases = [...Array(7)].map((_, i) => 1 << i);
            const dict = [
                ...[...Array(36)].map((_, i) => i.toString(36)),
                ...[...Array(36)].map((_, i) => i.toString(36).toUpperCase()).slice(-26)
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
                        mem.clear();
                        ++len;
                        limit = len < 3 ? limit : 3;
                    }
                };
            }
            exports.unique = unique;
            function cons(radix) {
                const base = bases.find(base => base >= radix);
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
                if (offset === len) {
                    offset = digit;
                    return buffer[index++] & masks[len];
                } else if (offset > len) {
                    offset -= len;
                    return buffer[index] >> offset & masks[len];
                } else {
                    offset = digit;
                    ++index;
                    return random(len);
                }
            }
        },
        { './global': 20 }
    ],
    90: [
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
        { './monad/sequence': 39 }
    ],
    91: [
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
    92: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Stack = void 0;
            const undefined = void 0;
            class Stack {
                constructor() {
                    this.list = undefined;
                    this.length = 0;
                }
                push(value) {
                    const node = this.list;
                    const values = node === null || node === void 0 ? void 0 : node[0];
                    ++this.length;
                    !values || values.length === 100 ? this.list = [
                        [value],
                        node
                    ] : values.push(value);
                }
                pop() {
                    const node = this.list;
                    if (node === undefined)
                        return;
                    const values = node[0];
                    --this.length;
                    if (values.length !== 1)
                        return values.pop();
                    const value = values[0];
                    this.list = node[1];
                    node[1] = undefined;
                    return value;
                }
                clear() {
                    this.list = undefined;
                }
                isEmpty() {
                    return this.list === undefined;
                }
                peek() {
                    var _a;
                    return (_a = this.list) === null || _a === void 0 ? void 0 : _a[0][0];
                }
                *[Symbol.iterator]() {
                    while (!this.isEmpty()) {
                        yield this.pop();
                    }
                    return;
                }
            }
            exports.Stack = Stack;
        },
        {}
    ],
    93: [
        function (_dereq_, module, exports) {
            (function (global) {
                (function () {
                    'use strict';
                    var _a;
                    Object.defineProperty(exports, '__esModule', { value: true });
                    exports.Supervisor = void 0;
                    const global_1 = _dereq_('./global');
                    const alias_1 = _dereq_('./alias');
                    const clock_1 = _dereq_('./clock');
                    const coroutine_1 = _dereq_('./coroutine');
                    const promise_1 = _dereq_('./promise');
                    const future_1 = _dereq_('./future');
                    const observer_1 = _dereq_('./observer');
                    const array_1 = _dereq_('./array');
                    const assign_1 = _dereq_('./assign');
                    const sqid_1 = _dereq_('./sqid');
                    const exception_1 = _dereq_('./exception');
                    const noop_1 = _dereq_('./noop');
                    class Supervisor extends coroutine_1.Coroutine {
                        constructor(opts = {}) {
                            super(async function* () {
                                return this.state;
                            }, { delay: false });
                            this.state = new future_1.AtomicFuture();
                            this.id = (0, sqid_1.sqid)();
                            this.settings = {
                                name: '',
                                capacity: global_1.Infinity,
                                timeout: global_1.Infinity,
                                destructor: noop_1.noop,
                                scheduler: clock_1.tick,
                                resource: 10
                            };
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
                            void (0, assign_1.extend)(this.settings, opts);
                            this.name = this.settings.name;
                            if (this.constructor === Supervisor)
                                throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot instantiate abstract classes.`);
                            void this.constructor.instances.add(this);
                        }
                        static get instances() {
                            return this.hasOwnProperty('instances_') ? this.instances_ : this.instances_ = new global_1.Set();
                        }
                        static get status() {
                            if (this.hasOwnProperty('status_'))
                                return this.status_;
                            const {instances} = this;
                            return this.status_ = {
                                get instances() {
                                    return instances.size;
                                },
                                get processes() {
                                    return [...instances].reduce((acc, sv) => acc + sv.workers.size, 0);
                                }
                            };
                        }
                        static clear(reason) {
                            while (this.instances.size > 0) {
                                for (const sv of this.instances) {
                                    void sv.terminate(reason);
                                }
                            }
                        }
                        destructor(reason) {
                            var _b;
                            this.available = false;
                            void this.clear(reason);
                            void (0, alias_1.ObjectFreeze)(this.workers);
                            while (this.messages.length > 0) {
                                const [names, param, , , timer] = this.messages.shift();
                                const name = typeof names === 'string' ? names : names[Symbol.iterator]().next().value;
                                timer && void (0, global_1.clearTimeout)(timer);
                                void ((_b = this.events_) === null || _b === void 0 ? void 0 : _b.loss.emit([name], [
                                    name,
                                    param
                                ]));
                            }
                            this.alive = false;
                            void this.constructor.instances.delete(this);
                            void (0, alias_1.ObjectFreeze)(this);
                            void this.settings.destructor(reason);
                            void this.state.bind(reason === void 0 ? void 0 : promise_1.AtomicPromise.reject(reason));
                        }
                        get events() {
                            var _b;
                            return (_b = this.events_) !== null && _b !== void 0 ? _b : this.events_ = {
                                init: new observer_1.Observation(),
                                loss: new observer_1.Observation(),
                                exit: new observer_1.Observation()
                            };
                        }
                        throwErrorIfNotAvailable() {
                            if (!this.available)
                                throw new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A supervisor is already terminated.`);
                        }
                        register(name, process, state) {
                            state = state;
                            void this.throwErrorIfNotAvailable();
                            if ((0, coroutine_1.isCoroutine)(process)) {
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
                                    exit: noop_1.noop
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
                                        exit: noop_1.noop
                                    }, state);
                                }
                                return this.register(name, {
                                    init: state => state,
                                    main: process,
                                    exit: noop_1.noop
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
                            var _b;
                            if (typeof callback !== 'function')
                                return new promise_1.AtomicPromise((resolve, reject) => void this.call(name, param, (result, err) => err ? reject(err) : resolve(result), callback));
                            void this.throwErrorIfNotAvailable();
                            void this.messages.push([
                                typeof name === 'string' ? name : new NamePool(this.workers, name),
                                param,
                                callback,
                                Date.now() + timeout,
                                0
                            ]);
                            while (this.messages.length > (this.available ? this.settings.capacity : 0)) {
                                const [names, param, callback, , timer] = this.messages.shift();
                                timer && void (0, global_1.clearTimeout)(timer);
                                const name = typeof names === 'string' ? names : names[Symbol.iterator]().next().value;
                                void ((_b = this.events_) === null || _b === void 0 ? void 0 : _b.loss.emit([name], [
                                    name,
                                    param
                                ]));
                                try {
                                    void callback(void 0, new global_1.Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A message overflowed.`));
                                } catch (reason) {
                                    void (0, exception_1.causeAsyncException)(reason);
                                }
                            }
                            if (this.messages.length === 0)
                                return;
                            void this.throwErrorIfNotAvailable();
                            void this.schedule();
                            if (timeout > 0 && timeout !== global_1.Infinity) {
                                this.messages[this.messages.length - 1][4] = (0, global_1.setTimeout)(() => void this.schedule(), timeout + 3);
                            }
                        }
                        cast(name, param, timeout = this.settings.timeout) {
                            var _b, _c;
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
                            void ((_c = this.events_) === null || _c === void 0 ? void 0 : _c.loss.emit([name], [
                                name,
                                param
                            ]));
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
                            this.scheduled = true;
                            const p = new future_1.AtomicFuture(false);
                            void p.finally(() => {
                                this.scheduled = false;
                                void this.deliver();
                            });
                            void this.settings.scheduler.call(void 0, p.bind);
                            this.settings.scheduler === global.requestAnimationFrame && void (0, global_1.setTimeout)(p.bind, 1000);
                        }
                        deliver() {
                            var _b, _c;
                            if (!this.available)
                                return;
                            const since = Date.now();
                            for (let i = 0, len = this.messages.length; this.available && i < len; ++i) {
                                if (this.settings.resource - (Date.now() - since) <= 0)
                                    return void this.schedule();
                                const [names, param, callback, expiry, timer] = this.messages[i];
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
                                void (0, array_1.splice)(this.messages, i, 1);
                                void --i;
                                void --len;
                                timer && void (0, global_1.clearTimeout)(timer);
                                if (result === void 0) {
                                    void ((_c = this.events_) === null || _c === void 0 ? void 0 : _c.loss.emit([name], [
                                        name,
                                        param
                                    ]));
                                    try {
                                        void callback(void 0, new global_1.Error(`Spica: Supervisor: A process has failed.`));
                                    } catch (reason) {
                                        void (0, exception_1.causeAsyncException)(reason);
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
                            void (0, alias_1.ObjectFreeze)(this);
                            try {
                                void this.destructor_();
                            } catch (reason) {
                                void (0, exception_1.causeAsyncException)(reason);
                            }
                            if (this.initiated) {
                                void this.exit(reason);
                            }
                        }
                        init() {
                            var _b;
                            this.initiated = true;
                            void ((_b = this.events) === null || _b === void 0 ? void 0 : _b.init.emit([this.name], [
                                this.name,
                                this.process,
                                this.state
                            ]));
                            this.state = this.process.init(this.state, this.terminate);
                        }
                        exit(reason) {
                            var _b, _c;
                            try {
                                void this.process.exit(reason, this.state);
                                void ((_b = this.events) === null || _b === void 0 ? void 0 : _b.exit.emit([this.name], [
                                    this.name,
                                    this.process,
                                    this.state,
                                    reason
                                ]));
                            } catch (reason_) {
                                void ((_c = this.events) === null || _c === void 0 ? void 0 : _c.exit.emit([this.name], [
                                    this.name,
                                    this.process,
                                    this.state,
                                    reason
                                ]));
                                void this.sv.terminate(reason_);
                            }
                        }
                        call([param, expiry]) {
                            const now = Date.now();
                            if (!this.available || now > expiry)
                                return;
                            return new promise_1.AtomicPromise((resolve, reject) => {
                                (0, alias_1.isFinite)(expiry) && void (0, global_1.setTimeout)(() => void reject(new global_1.Error()), expiry - now);
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
                }.call(this));
            }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
        },
        {
            './alias': 4,
            './array': 5,
            './assign': 6,
            './clock': 10,
            './coroutine': 13,
            './exception': 16,
            './future': 19,
            './global': 20,
            './noop': 86,
            './observer': 87,
            './promise': 88,
            './sqid': 91
        }
    ],
    94: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.debounce = exports.throttle = void 0;
            const global_1 = _dereq_('./global');
            function throttle(interval, callback, capacity = 1) {
                let timer = 0;
                let buffer = [];
                return data => {
                    if (capacity === 1) {
                        buffer = [data];
                    } else {
                        buffer.length === capacity && buffer.pop();
                        buffer.unshift(data);
                    }
                    if (timer !== 0)
                        return;
                    timer = (0, global_1.setTimeout)(() => {
                        timer = 0;
                        const buf = buffer;
                        buffer = [];
                        void callback(buf[0], buf);
                    }, interval);
                };
            }
            exports.throttle = throttle;
            function debounce(delay, callback, capacity = 1) {
                let timer = 0;
                let buffer = [];
                return data => {
                    if (capacity === 1) {
                        buffer = [data];
                    } else {
                        buffer.length === capacity && buffer.pop();
                        buffer.unshift(data);
                    }
                    if (timer !== 0)
                        return;
                    timer = (0, global_1.setTimeout)(() => {
                        timer = 0;
                        void (0, global_1.setTimeout)(() => {
                            if (timer !== 0)
                                return;
                            const buf = buffer;
                            buffer = [];
                            void callback(buf[0], buf);
                        }, buffer.length > 1 ? delay : 0);
                    }, delay);
                };
            }
            exports.debounce = debounce;
        },
        { './global': 20 }
    ],
    95: [
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
    96: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.isPrimitive = exports.isType = exports.type = void 0;
            const alias_1 = _dereq_('./alias');
            const toString = Object.prototype.toString.call.bind(Object.prototype.toString);
            const ObjectPrototype = Object.prototype;
            const ArrayPrototype = Array.prototype;
            function type(value) {
                if (value === void 0)
                    return 'undefined';
                if (value === null)
                    return 'null';
                const type = typeof value;
                if (type === 'object') {
                    const proto = (0, alias_1.ObjectGetPrototypeOf)(value);
                    if (proto === ObjectPrototype || proto === null)
                        return 'Object';
                    if (proto === ArrayPrototype)
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
        { './alias': 4 }
    ],
    97: [
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
                        searchParams: void 0
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
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal]).searchParams) !== null && _a !== void 0 ? _a : _b.searchParams = new global_1.URLSearchParams(this.search);
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
            './url/format': 98
        }
    ],
    98: [
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
                return url.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '').replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, global_1.encodeURI).replace(/\?[^#]+/, query => '?' + query.slice(1).replace(/%[0-9A-F]{2}|%|[^=&]+/ig, str => str[0] === '%' && str.length === 3 ? str : (0, global_1.encodeURIComponent)(str))).replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')));
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
                        searchParams: void 0
                    };
                }
                get href() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).href) !== null && _a !== void 0 ? _a : _b.href = this[internal].share.url.href;
                }
                get resource() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).resource) !== null && _a !== void 0 ? _a : _b.resource = this.href.slice(0, -this.fragment.length - this.query.length || this.href.length) + this.search;
                }
                get origin() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).origin) !== null && _a !== void 0 ? _a : _b.origin = this[internal].share.url.origin;
                }
                get protocol() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).protocol) !== null && _a !== void 0 ? _a : _b.protocol = this[internal].share.url.protocol;
                }
                get username() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).username) !== null && _a !== void 0 ? _a : _b.username = this[internal].share.url.username;
                }
                get password() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).password) !== null && _a !== void 0 ? _a : _b.password = this[internal].share.url.password;
                }
                get host() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).host) !== null && _a !== void 0 ? _a : _b.host = this[internal].share.url.host;
                }
                get hostname() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).hostname) !== null && _a !== void 0 ? _a : _b.hostname = this[internal].share.url.hostname;
                }
                get port() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).port) !== null && _a !== void 0 ? _a : _b.port = this[internal].share.url.port;
                }
                get path() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).path) !== null && _a !== void 0 ? _a : _b.path = `${ this.pathname }${ this.search }`;
                }
                get pathname() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).pathname) !== null && _a !== void 0 ? _a : _b.pathname = this[internal].share.url.pathname;
                }
                get search() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).search) !== null && _a !== void 0 ? _a : _b.search = this[internal].share.url.search;
                }
                get query() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).query) !== null && _a !== void 0 ? _a : _b.query = this.search || this.href[this.href.length - this.fragment.length - 1] === '?' && '?' || '';
                }
                get hash() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).hash) !== null && _a !== void 0 ? _a : _b.hash = this[internal].share.url.hash;
                }
                get fragment() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal].share).fragment) !== null && _a !== void 0 ? _a : _b.fragment = this.hash || this.href[this.href.length - 1] === '#' && '#' || '';
                }
                get searchParams() {
                    var _a;
                    var _b;
                    return (_a = (_b = this[internal]).searchParams) !== null && _a !== void 0 ? _a : _b.searchParams = new global_1.URLSearchParams(this.search);
                }
                toString() {
                    return this.href;
                }
                toJSON() {
                    return this.href;
                }
            }
            exports.ReadonlyURL = ReadonlyURL;
            ReadonlyURL.get = (0, flip_1.flip)((0, curry_1.uncurry)((0, memoize_1.memoize)(base => (0, memoize_1.memoize)(url => ({
                url: new global_1.global.URL(url, base),
                href: void 0,
                resource: void 0,
                origin: void 0,
                protocol: void 0,
                username: void 0,
                password: void 0,
                host: void 0,
                hostname: void 0,
                port: void 0,
                path: void 0,
                pathname: void 0,
                search: void 0,
                query: void 0,
                hash: void 0,
                fragment: void 0
            }), new cache_1.Cache(100)), new cache_1.Cache(100))));
        },
        {
            '../cache': 7,
            '../curry': 14,
            '../flip': 17,
            '../global': 20,
            '../memoize': 29
        }
    ],
    99: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.identity = exports.apply = exports.currentTarget = exports.wait = exports.once = exports.bind = exports.delegate = exports.listen = exports.defrag = exports.define = exports.element = exports.text = exports.svg = exports.html = exports.frag = exports.shadow = exports.proxy = exports.API = exports.SVG = exports.HTML = exports.Shadow = void 0;
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
            Object.defineProperty(exports, 'defrag', {
                enumerable: true,
                get: function () {
                    return dom_1.defrag;
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
            './src/builder': 100,
            './src/proxy': 101,
            './src/util/dom': 102,
            './src/util/identity': 103,
            './src/util/listener': 104,
            './src/util/query': 105,
            'spica/global': 20
        }
    ],
    100: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SVG = exports.HTML = exports.Shadow = exports.API = void 0;
            const alias_1 = _dereq_('spica/alias');
            const proxy_1 = _dereq_('./proxy');
            const dom_1 = _dereq_('./util/dom');
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
                        if (attrs !== void 0 && isElChildren(attrs))
                            return build(void 0, attrs, factory);
                        const node = formatter(elem(factory, attrs, children));
                        return node.nodeType === 1 ? new proxy_1.Elem(node, children) : new proxy_1.Elem(node.host, children, node);
                    };
                    function isElChildren(children) {
                        if (typeof children !== 'object')
                            return true;
                        for (const i in children) {
                            if (!(0, alias_1.hasOwnProperty)(children, i))
                                continue;
                            return typeof children[i] === 'object';
                        }
                        return true;
                    }
                    function elem(factory, attrs, children) {
                        const el = factory ? (0, dom_1.define)(factory(baseFactory, tag, attrs || {}, children), attrs) : baseFactory(tag, attrs);
                        if (tag !== el.tagName.toLowerCase())
                            throw new Error(`TypedDOM: Expected tag name is "${ tag }" but actually "${ el.tagName.toLowerCase() }".`);
                        return el;
                    }
                }
            }
        },
        {
            './proxy': 101,
            './util/dom': 102,
            'spica/alias': 4
        }
    ],
    101: [
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
            const id = (0, identity_1.identity)();
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
                    case children_ === void 0:
                        this.type = 0;
                        break;
                    case typeof children_ === 'string':
                        this.type = 1;
                        break;
                    case (0, alias_1.isArray)(children_):
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
                        (0, dom_1.define)(this.container, []);
                        this.children_ = this.container.appendChild((0, dom_1.text)(''));
                        this.children = children_;
                        this.isInit = false;
                        return;
                    case 2:
                        (0, dom_1.define)(this.container, []);
                        this.children_ = [];
                        this.children = children_;
                        this.isInit = false;
                        return;
                    case 3:
                        (0, dom_1.define)(this.container, []);
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
                    style.innerHTML = html.replace(target, `$1$2${ query }`);
                    if (!style.firstElementChild)
                        return;
                    for (let es = style.children, i = 0, len = es.length; i < len; ++i) {
                        es[0].remove();
                    }
                }
                observe(children) {
                    const descs = {};
                    for (const name of (0, alias_1.ObjectKeys)(children)) {
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
                    return (0, alias_1.ObjectDefineProperties)(children, descs);
                }
                get children() {
                    switch (this.type) {
                    case 1:
                        if (this.children_.parentNode !== this.container) {
                            this.children_ = void 0;
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
                    let isMutated = false;
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
                            this.element.dispatchEvent(new global_1.Event('mutate', {
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
                                    isMutated = true;
                                }
                                targetChildren.push(newChild);
                            }
                            for (let i = nodeChildren.length; sourceChildren.length < i--;) {
                                const el = nodeChildren[sourceChildren.length];
                                if (!proxies.has(el))
                                    continue;
                                removedChildren.push(proxy(this.container.removeChild(el)));
                                isMutated = true;
                            }
                            break;
                        }
                    case 3: {
                            const sourceChildren = children;
                            const targetChildren = this.children_;
                            for (const name of (0, alias_1.ObjectKeys)(targetChildren)) {
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
                                        i > -1 && (0, array_1.splice)(removedChildren, i, 1);
                                        removedChildren.push(oldChild);
                                        i = addedChildren.lastIndexOf(oldChild);
                                        i > -1 && (0, array_1.splice)(addedChildren, i, 1);
                                    }
                                }
                                this.isPartialUpdate = true;
                                targetChildren[name] = sourceChildren[name];
                                this.isPartialUpdate = false;
                                isMutated = true;
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
                    if (isMutated) {
                        this.element.dispatchEvent(new global_1.Event('mutate', {
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
            './util/dom': 102,
            './util/identity': 103,
            'spica/alias': 4,
            'spica/array': 5,
            'spica/global': 20
        }
    ],
    102: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.defrag = exports.isChildren = exports.define = exports.element = exports.text = exports.svg = exports.html = exports.frag = exports.shadow = void 0;
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
                    return shadow((0, exports.html)(el), children, opts);
                if (children && !isChildren(children))
                    return shadow(el, void 0, children);
                const root = opts === void 0 ? el.shadowRoot || caches.shadows.get(el) : opts.mode === 'open' ? el.shadowRoot || void 0 : caches.shadows.get(el);
                return defineChildren(!opts || opts.mode === 'open' ? root || el.attachShadow(opts || { mode: 'open' }) : root || caches.shadows.set(el, el.attachShadow(opts)).get(el), !root && children == void 0 ? el.childNodes : children);
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
                const cache = (0, memoize_1.memoize)(elem, (_, ns, tag) => `${ ns }:${ tag }`);
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
                for (let i = 0, names = (0, alias_1.ObjectKeys)(attrs); i < names.length; ++i) {
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
                        return defineChildren(node, (0, array_1.push)([], children));
                    for (const child of children) {
                        node.append(child);
                    }
                    return node;
                }
                if (!(0, alias_1.isArray)(children)) {
                    if (node.firstChild)
                        return defineChildren(node, (0, array_1.push)([], children));
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
            exports.isChildren = isChildren;
            function equal(node, data) {
                return typeof data === 'string' ? 'wholeText' in node && node.data === data : node === data;
            }
            function append(node, children, i = 0) {
                for (const len = children.length; i < len; ++i) {
                    node.append(children[i]);
                }
                return node;
            }
            function defrag(nodes) {
                const acc = [];
                for (let i = 0; i < nodes.length; ++i) {
                    const node = nodes[i];
                    if (node === '')
                        continue;
                    acc.length > 0 && typeof node === 'string' && typeof nodes[i - 1] === 'string' ? acc[acc.length - 1] += node : acc.push(node);
                }
                return acc;
            }
            exports.defrag = defrag;
        },
        {
            'spica/alias': 4,
            'spica/array': 5,
            'spica/global': 20,
            'spica/memoize': 29
        }
    ],
    103: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a;
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.identity = void 0;
            const global_1 = _dereq_('spica/global');
            const random_1 = _dereq_('spica/random');
            const ids = Symbol.for('typed-dom::ids');
            exports.identity = (0, random_1.unique)(random_1.rnd0Z, 2, (_a = global_1.global[ids]) !== null && _a !== void 0 ? _a : global_1.global[ids] = new global_1.Set());
        },
        {
            'spica/global': 20,
            'spica/random': 89
        }
    ],
    104: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.bind = exports.delegate = exports.wait = exports.once = exports.listen = exports.currentTarget = void 0;
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
                    return cx ? unbind = once(cx, type, listener, option) : void 0, ev.returnValue;
                }, {
                    ...option,
                    capture: true
                });
            }
            exports.delegate = delegate;
            function bind(target, type, listener, option = false) {
                target.addEventListener(type, handler, option);
                return (0, function_1.once)(() => void target.removeEventListener(type, handler, option));
                function handler(ev) {
                    return exports.currentTarget in ev && !ev[exports.currentTarget] ? void 0 : ev[exports.currentTarget] = ev.currentTarget, listener(ev);
                }
            }
            exports.bind = bind;
        },
        {
            'spica/function': 18,
            'spica/noop': 86,
            'spica/promise': 88
        }
    ],
    105: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.apply = void 0;
            const dom_1 = _dereq_('./dom');
            function apply(node, selector, attrs) {
                const ns = node.querySelectorAll(selector);
                for (let i = 0, len = ns.length; i < len; ++i) {
                    (0, dom_1.define)(ns[i], attrs);
                }
                return ns;
            }
            exports.apply = apply;
        },
        { './dom': 102 }
    ],
    106: [
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
            './layer/interface/service/gui': 135,
            './lib/router': 145
        }
    ],
    107: [
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
                return (0, api_1.route)(new api_1.RouterEntity(config, event, new api_1.RouterEntityState(state.process, state.scripts)), io);
            }
            exports.route = route;
        },
        {
            '../domain/data/config': 110,
            '../domain/event/router': 112,
            '../domain/router/api': 113
        }
    ],
    108: [
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
        { '../domain/store/path': 129 }
    ],
    109: [
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
    110: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.Config = exports.scope = void 0;
            const alias_1 = _dereq_('spica/alias');
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
                    var _a;
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
                    void (0, alias_1.ObjectDefineProperties)(this.update, {
                        ignore: {
                            enumerable: false,
                            set(value) {
                                this.ignores['_'] = value;
                            },
                            get() {
                                return (0, alias_1.ObjectKeys)(this.ignores).map(i => this.ignores[i]).filter(s => s.trim().length > 0).join(',');
                            }
                        }
                    });
                    void (0, assign_1.extend)(this, option);
                    void (0, assign_1.overwrite)(this.scope, (_a = option === null || option === void 0 ? void 0 : option.scope) !== null && _a !== void 0 ? _a : {});
                    this.fetch.headers = new Headers(this.fetch.headers);
                    void (0, alias_1.ObjectFreeze)(this);
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
            './config/scope': 111,
            'spica/alias': 4,
            'spica/assign': 6
        }
    ],
    111: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.scope = void 0;
            const alias_1 = _dereq_('spica/alias');
            const router_1 = _dereq_('../../../../lib/router');
            const config_1 = _dereq_('../../../domain/data/config');
            const sequence_1 = _dereq_('spica/sequence');
            const maybe_1 = _dereq_('spica/maybe');
            const assign_1 = _dereq_('spica/assign');
            function scope(config, path) {
                var _a;
                const scope = {
                    '/': {},
                    ...config.scope
                };
                return (_a = sequence_1.Sequence.from((0, alias_1.ObjectKeys)(scope).sort().reverse()).dropWhile(pattern => !!!(0, router_1.compare)(pattern, path.orig) && !(0, router_1.compare)(pattern, path.dest)).take(1).filter(pattern => !!(0, router_1.compare)(pattern, path.orig) && (0, router_1.compare)(pattern, path.dest)).map(pattern => scope[pattern]).map(option => option ? (0, maybe_1.Just)(new config_1.Config((0, assign_1.extend)({ scope: option.scope && (0, assign_1.overwrite)(config.scope, option.scope) }, config, option))) : maybe_1.Nothing).extract()[0]) !== null && _a !== void 0 ? _a : maybe_1.Nothing;
            }
            exports.scope = scope;
        },
        {
            '../../../../lib/router': 145,
            '../../../domain/data/config': 110,
            'spica/alias': 4,
            'spica/assign': 6,
            'spica/maybe': 28,
            'spica/sequence': 90
        }
    ],
    112: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.RouterEventLocation = exports.RouterEventRequest = exports.RouterEventMethod = exports.RouterEventType = exports.RouterEventSource = exports.RouterEvent = void 0;
            const alias_1 = _dereq_('spica/alias');
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
                    void (0, alias_1.ObjectFreeze)(this);
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
                            return new url_1.URL((0, url_1.standardize)(this.source.href, window.location.href));
                        }
                        if (this.source instanceof RouterEventSource.Form) {
                            return this.source.method.toUpperCase() === RouterEventMethod.GET ? new url_1.URL((0, url_1.standardize)(this.source.action.split(/[?#]/)[0] + `?${ (0, dom_1.serialize)(this.source) }`, window.location.href)) : new url_1.URL((0, url_1.standardize)(this.source.action.split(/[?#]/)[0], window.location.href));
                        }
                        if (this.source instanceof RouterEventSource.Window) {
                            return new url_1.URL((0, url_1.standardize)(window.location.href));
                        }
                        throw new TypeError();
                    })();
                    this.body = (() => this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST ? new FormData(this.source) : null)();
                    void (0, alias_1.ObjectFreeze)(this);
                }
            }
            exports.RouterEventRequest = RouterEventRequest;
            class RouterEventLocation {
                constructor(dest) {
                    this.dest = dest;
                    this.orig = new url_1.URL((0, url_1.standardize)(window.location.href));
                    void (0, alias_1.ObjectFreeze)(this);
                }
            }
            exports.RouterEventLocation = RouterEventLocation;
        },
        {
            '../../../lib/dom': 142,
            'spica/alias': 4,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    113: [
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
                return (0, either_1.Right)(void 0).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? (0, either_1.Right)(void 0) : (0, either_1.Left)(new Error(`Failed to match areas.`))).fmap(() => (0, fetch_1.fetch)(entity.event.request, entity.config, entity.state.process)).fmap(async p => (await p).fmap(([res, seq]) => (0, update_1.update)(entity, res, seq, {
                    document: io.document,
                    position: path_1.loadPosition
                })).extract(either_1.Left)).extract(either_1.Left);
                function match(document, areas) {
                    return (0, content_1.separate)({
                        src: document,
                        dst: document
                    }, areas).extract(() => false, () => true);
                }
            }
            exports.route = route;
        },
        {
            '../store/path': 129,
            './model/eav/entity': 114,
            './module/fetch': 116,
            './module/update': 118,
            './module/update/content': 120,
            'spica/either': 15
        }
    ],
    114: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.RouterEntityState = exports.RouterEntity = void 0;
            const alias_1 = _dereq_('spica/alias');
            class RouterEntity {
                constructor(config, event, state) {
                    this.config = config;
                    this.event = event;
                    this.state = state;
                    void (0, alias_1.ObjectFreeze)(this);
                }
            }
            exports.RouterEntity = RouterEntity;
            class RouterEntityState {
                constructor(process, scripts) {
                    this.process = process;
                    this.scripts = scripts;
                    void (0, alias_1.ObjectFreeze)(this);
                }
            }
            exports.RouterEntityState = RouterEntityState;
        },
        { 'spica/alias': 4 }
    ],
    115: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.FetchResponse = void 0;
            const alias_1 = _dereq_('spica/alias');
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
                    void (0, alias_1.ObjectDefineProperty)(this.document, 'URL', {
                        configurable: true,
                        enumerable: true,
                        value: url.href,
                        writable: false
                    });
                    void (0, html_1.fix)(this.document);
                    void (0, alias_1.ObjectFreeze)(this);
                }
            }
            exports.FetchResponse = FetchResponse;
        },
        {
            '../../../../../../lib/html': 144,
            'spica/alias': 4,
            'spica/url': 97
        }
    ],
    116: [
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
                    (0, xhr_1.xhr)(method, url, headers, body, timeout, rewrite, cache, process),
                    (0, clock_1.wait)(wait)
                ]);
                return res.bind(process.either).fmap(res => [
                    res,
                    seq
                ]);
            }
            exports.fetch = fetch;
        },
        {
            '../module/fetch/xhr': 117,
            'spica/clock': 10
        }
    ],
    117: [
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
            const memory = new cache_1.Cache(100);
            const caches = new cache_1.Cache(100);
            function xhr(method, displayURL, headers, body, timeout, rewrite, cache, cancellation) {
                headers = new Headers(headers);
                void headers.set('Accept', headers.get('Accept') || 'text/html');
                const requestURL = new url_1.URL((0, url_1.standardize)(rewrite(displayURL.path), window.location.href));
                if (method === 'GET' && caches.has(requestURL.path) && Date.now() > caches.get(requestURL.path).expiry) {
                    void headers.set('If-None-Match', headers.get('If-None-Match') || caches.get(requestURL.path).etag);
                }
                const key = method === 'GET' ? cache(requestURL.path, headers) || void 0 : void 0;
                return new promise_1.AtomicPromise(resolve => {
                    if (key && memory.has(key))
                        return resolve((0, either_1.Right)(memory.get(key)(displayURL, requestURL)));
                    const xhr = new XMLHttpRequest();
                    void xhr.open(method, requestURL.path, true);
                    for (const [name, value] of headers) {
                        void xhr.setRequestHeader(name, value);
                    }
                    xhr.responseType = 'document';
                    xhr.timeout = timeout;
                    void xhr.send(body);
                    void xhr.addEventListener('abort', () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by abort.`))));
                    void xhr.addEventListener('error', () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by error.`))));
                    void xhr.addEventListener('timeout', () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by timeout.`))));
                    void xhr.addEventListener('load', () => void verify(xhr, method).fmap(xhr => {
                        const responseURL = new url_1.URL((0, url_1.standardize)(xhr.responseURL, window.location.href));
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
                    }).extract(err => void resolve((0, either_1.Left)(err)), res => void resolve((0, either_1.Right)(res))));
                    void cancellation.register(() => void xhr.abort());
                });
            }
            exports.xhr = xhr;
            function verify(xhr, method) {
                return (0, either_1.Right)(xhr).bind(xhr => {
                    const url = new url_1.URL((0, url_1.standardize)(xhr.responseURL, window.location.href));
                    switch (true) {
                    case !xhr.responseURL:
                        return (0, either_1.Left)(new Error(`Failed to get the response URL.`));
                    case url.origin !== new url_1.URL('', window.location.origin).origin:
                        return (0, either_1.Left)(new Error(`Redirected to another origin.`));
                    case !/2..|304/.test(`${ xhr.status }`):
                        return (0, either_1.Left)(new Error(`Failed to validate the status of response.`));
                    case !xhr.response:
                        return method === 'GET' && xhr.status === 304 && caches.has(url.path) ? (0, either_1.Right)(caches.get(url.path).xhr) : (0, either_1.Left)(new Error(`Failed to get the response body.`));
                    case !match(xhr.getResponseHeader('Content-Type'), 'text/html'):
                        return (0, either_1.Left)(new Error(`Failed to validate the content type of response.`));
                    default:
                        return (0, either_1.Right)(xhr);
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
            '../../model/eav/value/fetch': 115,
            'spica/cache': 7,
            'spica/either': 15,
            'spica/promise': 88,
            'spica/sequence': 90,
            'spica/url': 97
        }
    ],
    118: [
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
                return promise_1.AtomicPromise.resolve(seq).then(process.either).then(m => m.bind(() => (0, content_1.separate)(documents, config.areas).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), () => m)).fmap(seqA => (void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seqA, {
                    ...response,
                    url: response.url.href
                })))).then(m => either_1.Either.sequence(m)).then(process.promise).then(m => m.bind(seqB => (0, content_1.separate)(documents, config.areas).fmap(([area]) => [
                    seqB,
                    area
                ]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), process.either)).bind(([seqB, area]) => (void config.update.rewrite(documents.src, area), (0, content_1.separate)(documents, config.areas).fmap(([, areas]) => [
                    seqB,
                    areas
                ]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), process.either)))).then(process.promise).then(m => m.fmap(([seqB, areas]) => (0, hlist_1.HList)().unfold(() => (void (0, blur_1.blur)(documents.dst), void (0, path_1.savePjax)(), void (0, url_1.url)(new router_1.RouterEventLocation(response.url), documents.src.title, event.type, event.source, config.replace), void (0, path_1.savePjax)(), void (0, title_1.title)(documents), void (0, path_1.saveTitle)(), void (0, head_1.head)(documents, config.update.head, config.update.ignore), process.either((0, content_1.content)(documents, areas)).fmap(([as, ps]) => [
                    as,
                    promise_1.AtomicPromise.all(ps)
                ]))).unfold(async p => (await p).fmap(async ([areas]) => {
                    config.update.css ? void (0, css_1.css)(documents, config.update.ignore) : void 0;
                    void io.document.dispatchEvent(new Event('pjax:content'));
                    const seqC = await config.sequence.content(seqB, areas);
                    const ssm = config.update.script ? await (0, script_1.script)(documents, state.scripts, config.update, Math.max(config.fetch.timeout, 1000) * 10, process) : await process.either([
                        [],
                        promise_1.AtomicPromise.resolve(process.either([]))
                    ]);
                    void (0, focus_1.focus)(event.type, documents.dst);
                    void (0, scroll_1.scroll)(event.type, documents.dst, {
                        hash: event.location.dest.fragment,
                        position: io.position
                    });
                    void (0, path_1.savePosition)();
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
                ]))).extract(err => promise_1.AtomicPromise.resolve((0, either_1.Left)(err)))).reverse())).then(process.promise).then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([
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
            '../../event/router': 112,
            '../../store/path': 129,
            '../module/update/blur': 119,
            '../module/update/content': 120,
            '../module/update/css': 121,
            '../module/update/focus': 122,
            '../module/update/head': 123,
            '../module/update/script': 124,
            '../module/update/scroll': 125,
            '../module/update/title': 127,
            '../module/update/url': 128,
            'spica/either': 15,
            'spica/hlist': 22,
            'spica/promise': 88
        }
    ],
    119: [
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
    120: [
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
                        return record.src.length > 0 && record.src.length === record.dst.length ? (0, maybe_1.Just)((0, array_1.push)(acc, [record])) : maybe_1.Nothing;
                    }), (0, maybe_1.Just)([])));
                }
            }
            exports.separate = separate;
            function split(area) {
                return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(area => area.trim()).reduce((m, area) => area ? m.fmap(acc => (0, array_1.push)(acc, [area])) : maybe_1.Nothing, (0, maybe_1.Just)([]));
            }
            exports._split = split;
            function wait(el) {
                return promise_1.AtomicPromise.race([
                    new promise_1.AtomicPromise(resolve => void (0, typed_dom_1.once)(el, 'load', resolve)),
                    new promise_1.AtomicPromise(resolve => void (0, typed_dom_1.once)(el, 'abort', resolve)),
                    new promise_1.AtomicPromise(resolve => void (0, typed_dom_1.once)(el, 'error', resolve))
                ]);
            }
            exports._wait = wait;
        },
        {
            './script': 124,
            'spica/array': 5,
            'spica/maybe': 28,
            'spica/promise': 88,
            'typed-dom': 99
        }
    ],
    121: [
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
                ]).forEach(([src, dst]) => void (0, sync_1.sync)((0, sync_1.pair)(list(src), list(dst), (a, b) => a.outerHTML === b.outerHTML), dst));
                function list(source) {
                    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.css = css;
        },
        { './sync': 126 }
    ],
    122: [
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
        { '../../../event/router': 112 }
    ],
    123: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.head = void 0;
            const sync_1 = _dereq_('./sync');
            function head(documents, selector, ignore) {
                ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
                return void (0, sync_1.sync)((0, sync_1.pair)(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);
                function list(source) {
                    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
                }
            }
            exports.head = head;
        },
        { './sync': 126 }
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
            const alias_1 = _dereq_('spica/alias');
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
                const scripts = [...documents.src.querySelectorAll('script')].filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL((0, url_1.standardize)(el.src)).href) || el.matches(selector.reload.trim() || '_') : true);
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
                        (0, either_1.Right)(ss2),
                        ap2
                    ]).then(sst => sst.reduce((m1, m2) => m1.bind(s1 => m2.fmap(s2 => (0, array_1.push)(s1, s2)))))).extract(either_1.Left)).extract(either_1.Left))
                ])).extract(either_1.Left));
                function request(scripts) {
                    return scripts.map(script => io.fetch(script, timeout));
                }
                function run(responses) {
                    return responses.reduce((results, m) => m.bind(() => results), responses.reduce((results, m) => results.bind(cancellation.either).bind(([sp, ap]) => m.fmap(([script, code]) => io.evaluate(script, code, selector.logger, skip, promise_1.AtomicPromise.all(sp), cancellation)).bind(m => m.extract(p => (0, either_1.Right)((0, tuple_1.tuple)((0, array_1.push)(sp, [p]), ap)), p => (0, either_1.Right)((0, tuple_1.tuple)(sp, (0, array_1.push)(ap, [p])))))), (0, either_1.Right)([
                        [],
                        []
                    ]))).fmap(([sp, ap]) => promise_1.AtomicPromise.all(sp).then(m => either_1.Either.sequence(m)).then(sm => sm.fmap(ss => (0, tuple_1.tuple)(ss, Promise.all(ap).then(m => either_1.Either.sequence(m))))));
                }
            }
            exports.script = script;
            async function fetch(script, timeout) {
                if (!script.hasAttribute('src'))
                    return (0, either_1.Right)([
                        script,
                        script.text
                    ]);
                if (script.type.toLowerCase() === 'module')
                    return (0, either_1.Right)([
                        script,
                        ''
                    ]);
                return promise_1.AtomicPromise.race([
                    window.fetch(script.src, {
                        headers: new Headers({ Accept: 'application/javascript' }),
                        integrity: script.integrity
                    }),
                    (0, clock_1.wait)(timeout).then(() => promise_1.AtomicPromise.reject(new Error(`${ script.src }: Timeout.`)))
                ]).then(async res => res.ok ? (0, either_1.Right)([
                    script,
                    await res.text()
                ]) : script.matches('[src][async]') ? retry(script).then(() => (0, either_1.Right)([
                    script,
                    ''
                ]), () => (0, either_1.Left)(new Error(`${ script.src }: ${ res.statusText }`))) : (0, either_1.Left)(new Error(res.statusText)), error => (0, either_1.Left)(error));
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
                return script.matches('[src][async]') ? (0, either_1.Right)(result) : (0, either_1.Left)(result);
                function evaluate() {
                    if (!cancellation.alive)
                        throw new error_1.FatalError('Expired.');
                    if (script.matches('[type="module"][src]')) {
                        return promise_1.AtomicPromise.resolve(Promise.resolve().then(() => __importStar(_dereq_(script.src)))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (void script.dispatchEvent(new Event('load')), (0, either_1.Right)(script)), reason => (void script.dispatchEvent(new Event('error')), (0, either_1.Left)(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
                    } else {
                        try {
                            if (skip.has(new url_1.URL((0, url_1.standardize)(window.location.href)).href))
                                throw new error_1.FatalError('Expired.');
                            void (0, eval)(code);
                            script.hasAttribute('src') && void script.dispatchEvent(new Event('load'));
                            return promise_1.AtomicPromise.resolve((0, either_1.Right)(script));
                        } catch (reason) {
                            script.hasAttribute('src') && void script.dispatchEvent(new Event('error'));
                            return promise_1.AtomicPromise.resolve((0, either_1.Left)(new error_1.FatalError(reason instanceof Error ? reason.message : reason + '')));
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
                if (new url_1.URL((0, url_1.standardize)(script.src)).origin === new url_1.URL((0, url_1.standardize)(window.location.href)).origin)
                    return promise_1.AtomicPromise.reject(new Error());
                script = (0, typed_dom_1.html)('script', (0, alias_1.ObjectValues)(script.attributes).reduce((o, {name, value}) => (o[name] = value, o), {}), [...script.childNodes]);
                return new promise_1.AtomicPromise((resolve, reject) => (void script.addEventListener('load', () => void resolve(global_1.undefined)), void script.addEventListener('error', reject), void document.body.appendChild(script), void script.remove()));
            }
        },
        {
            '../../../../../lib/error': 143,
            'spica/alias': 4,
            'spica/array': 5,
            'spica/clock': 10,
            'spica/either': 15,
            'spica/global': 20,
            'spica/promise': 88,
            'spica/tuple': 95,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    125: [
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
        { '../../../event/router': 112 }
    ],
    126: [
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
                    return srcs.reduce((link, src) => dsts.length === 0 ? link.set(null, (0, array_1.push)(link.get(null) || [], [src])) : dsts.reduce((m, dst) => m.bind(link => !link.has(dst) && compare(src, dst) ? (void link.set(dst, (0, array_1.push)(link.get(null) || [], [src])), void link.delete(null), (0, either_1.Left)(link)) : (0, either_1.Right)(link)), (0, either_1.Right)(link)).fmap(link => link.set(null, (0, array_1.push)(link.get(null) || [], [src]))).extract(link => link), new Map());
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
    127: [
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
    128: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._isReplaceable = exports._isRegisterable = exports.url = void 0;
            const router_1 = _dereq_('../../../event/router');
            const typed_dom_1 = _dereq_('typed-dom');
            void (0, typed_dom_1.bind)(document, 'pjax:ready', () => void window.history.replaceState(window.history.state, window.document.title));
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
            '../../../event/router': 112,
            'typed-dom': 99
        }
    ],
    129: [
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
        { '../../data/store/state': 109 }
    ],
    130: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.ClickView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class ClickView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(async function* () {
                        return this.finally((0, typed_dom_1.delegate)(document, selector, 'click', ev => {
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
            'typed-dom': 99
        }
    ],
    131: [
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
                        return this.finally((0, typed_dom_1.bind)(window, 'popstate', ev => {
                            if (!(0, state_1.isTransitable)(page_1.page.state) || !(0, state_1.isTransitable)(window.history.state))
                                return;
                            if ((0, url_1.standardize)(window.location.href) === page_1.page.href)
                                return;
                            void listener(ev);
                        }));
                    }, { delay: false });
                }
            }
            exports.NavigationView = NavigationView;
        },
        {
            '../../../data/store/state': 109,
            '../../service/state/page': 138,
            'spica/coroutine': 13,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    132: [
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
                        return this.finally((0, typed_dom_1.bind)(window, 'scroll', (0, throttle_1.debounce)(100, ev => {
                            if ((0, url_1.standardize)(window.location.href) !== page_1.page.href)
                                return;
                            void listener(ev);
                        }), { passive: true }));
                    }, { delay: false });
                }
            }
            exports.ScrollView = ScrollView;
        },
        {
            '../../service/state/page': 138,
            'spica/coroutine': 13,
            'spica/throttle': 94,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    133: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.SubmitView = void 0;
            const coroutine_1 = _dereq_('spica/coroutine');
            const typed_dom_1 = _dereq_('typed-dom');
            class SubmitView extends coroutine_1.Coroutine {
                constructor(document, selector, listener) {
                    super(async function* () {
                        return this.finally((0, typed_dom_1.delegate)(document, selector, 'submit', ev => {
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
            'typed-dom': 99
        }
    ],
    134: [
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
                    void click(url, event => result = io.router(new router_1.Config((0, assign_1.assign)({}, option, { replace: '*' })), new router_1.RouterEvent(event), process_1.process, io));
                    return result;
                }
                static sync(isPjaxPage) {
                    isPjaxPage && void (0, state_1.savePjax)();
                    void process_1.process.cast('', new Error(`Canceled.`));
                    void (0, router_1.sync)();
                }
                static pushURL(url, title, state = null) {
                    void window.history.pushState(state, title, url);
                    void this.sync();
                }
                static replaceURL(url, title, state = window.history.state) {
                    const isPjaxPage = (0, state_1.isTransitable)(window.history.state);
                    void window.history.replaceState(state, title, url);
                    void this.sync(isPjaxPage);
                }
            }
            exports.API = API;
            function click(url, callback) {
                const el = document.createElement('a');
                el.href = url;
                void (0, html_1.parse)('').extract().body.appendChild(el);
                void (0, typed_dom_1.once)(el, 'click', callback);
                void (0, typed_dom_1.once)(el, 'click', ev => void ev.preventDefault());
                void el.click();
            }
        },
        {
            '../../../lib/html': 144,
            '../../data/store/state': 109,
            './router': 136,
            './state/process': 139,
            'spica/assign': 6,
            'typed-dom': 99
        }
    ],
    135: [
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
            '../../application/store': 108,
            '../module/view/click': 130,
            '../module/view/navigation': 131,
            '../module/view/scroll': 132,
            '../module/view/submit': 133,
            './api': 134,
            './router': 136,
            './state/process': 139,
            './state/scroll-restoration': 141,
            'spica/copropagator': 12,
            'spica/supervisor': 93
        }
    ],
    136: [
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
            const promise_1 = _dereq_('spica/promise');
            const typed_dom_1 = _dereq_('typed-dom');
            void (0, typed_dom_1.bind)(window, 'pjax:unload', () => window.history.scrollRestoration = 'auto', true);
            function route(config, event, process, io) {
                switch (event.type) {
                case router_1.RouterEventType.Click:
                case router_1.RouterEventType.Submit:
                    void (0, store_1.savePosition)();
                    break;
                case router_1.RouterEventType.Popstate:
                    io.document.title = (0, store_1.loadTitle)();
                    break;
                }
                return (0, maybe_1.Just)(0).guard(validate(event.request.url, config, event)).bind(() => (0, router_1.scope)(config, (({orig, dest}) => ({
                    orig: orig.pathname,
                    dest: dest.pathname
                }))(event.location))).fmap(async config => {
                    void event.original.preventDefault();
                    void process.cast('', new Error(`Canceled.`));
                    const cancellation = new cancellation_1.Cancellation();
                    const kill = process.register('', err => {
                        void kill();
                        void cancellation.cancel(err);
                        return promise_1.never;
                    });
                    const [scripts] = await env_1.env;
                    window.history.scrollRestoration = 'manual';
                    return (0, router_1.route)(config, event, {
                        process: cancellation,
                        scripts
                    }, io).then(m => m.fmap(async ([ss, p]) => (void kill(), void page_1.page.sync(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL((0, url_1.standardize)(s.src)).href)), void (await p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL((0, url_1.standardize)(s.src)).href)))).extract()).catch(reason => (void kill(), void page_1.page.sync(), window.history.scrollRestoration = 'auto', cancellation.alive || reason instanceof error_1.FatalError ? void config.fallback(event.source, reason) : void 0));
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
            '../../../lib/error': 143,
            '../../application/router': 107,
            '../../application/store': 108,
            '../service/state/env': 137,
            './state/page': 138,
            'spica/cancellation': 8,
            'spica/maybe': 28,
            'spica/promise': 88,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    137: [
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
        { './script': 140 }
    ],
    138: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.page = void 0;
            const global_1 = _dereq_('spica/global');
            const state_1 = _dereq_('../../../data/store/state');
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            void (0, typed_dom_1.bind)(global_1.window, 'hashchange', () => void exports.page.sync());
            void (0, typed_dom_1.bind)(global_1.window, 'popstate', () => (0, state_1.isTransitable)(exports.page.state) && (0, state_1.isTransitable)(global_1.window.history.state) || void exports.page.sync());
            exports.page = new class {
                constructor() {
                    this.url = (0, url_1.standardize)(global_1.window.location.href);
                    this.state_ = global_1.window.history.state;
                }
                get href() {
                    return this.url;
                }
                get state() {
                    return this.state_;
                }
                sync() {
                    this.url = (0, url_1.standardize)(global_1.window.location.href);
                    this.state_ = global_1.window.history.state;
                }
            }();
        },
        {
            '../../../data/store/state': 109,
            'spica/global': 20,
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    139: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.process = void 0;
            const supervisor_1 = _dereq_('spica/supervisor');
            exports.process = new class extends supervisor_1.Supervisor {
            }();
        },
        { 'spica/supervisor': 93 }
    ],
    140: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.scripts = void 0;
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.scripts = new Set();
            void (0, typed_dom_1.bind)(window, 'pjax:unload', () => void document.querySelectorAll('script[src]').forEach(script => void exports.scripts.add(new url_1.URL((0, url_1.standardize)(script.src)).href)));
        },
        {
            'spica/url': 97,
            'typed-dom': 99
        }
    ],
    141: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const typed_dom_1 = _dereq_('typed-dom');
            void (0, typed_dom_1.bind)(window, 'unload', () => window.history.scrollRestoration = 'auto', false);
        },
        { 'typed-dom': 99 }
    ],
    142: [
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
    143: [
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
    144: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._fixNoscript = exports.fix = exports.parse = void 0;
            const maybe_1 = _dereq_('spica/maybe');
            const either_1 = _dereq_('spica/either');
            exports.parse = [
                parseByDOM,
                parseByDoc
            ].reduce((m, f) => m.bind(() => test(f) ? (0, either_1.Left)(f) : m), (0, either_1.Right)(() => maybe_1.Nothing)).extract(f => html => (0, maybe_1.Just)(f(html)));
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
            'spica/maybe': 28
        }
    ],
    145: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports._match = exports._expand = exports.compare = exports.router = void 0;
            const alias_1 = _dereq_('spica/alias');
            const url_1 = _dereq_('spica/url');
            const sequence_1 = _dereq_('spica/sequence');
            const curry_1 = _dereq_('spica/curry');
            const flip_1 = _dereq_('spica/flip');
            const memoize_1 = _dereq_('spica/memoize');
            function router(config) {
                return url => {
                    const {path, pathname} = new url_1.URL((0, url_1.standardize)(url, window.location.href));
                    return sequence_1.Sequence.from((0, alias_1.ObjectKeys)(config).filter(p => p[0] === '/').sort().reverse()).filter((0, curry_1.curry)((0, flip_1.flip)(compare))(pathname)).map(pattern => config[pattern]).take(1).extract().pop().call(config, path);
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
            const expand = (0, memoize_1.memoize)(pattern => {
                if (pattern.match(/\*\*|[\[\]]/))
                    throw new Error(`Invalid pattern: ${ pattern }`);
                return pattern === '' ? [pattern] : sequence_1.Sequence.from(pattern.match(/{[^{}]*}|.[^{]*/g)).map(p => p.match(/^{[^{}]*}$/) ? p.slice(1, -1).split(',') : [p]).mapM(sequence_1.Sequence.from).map(ps => ps.join('')).bind(p => p === pattern ? sequence_1.Sequence.from([p]) : sequence_1.Sequence.from(expand(p))).unique().extract();
            });
            exports._expand = expand;
            const match = (0, memoize_1.memoize)((pattern, segment) => {
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
            'spica/alias': 4,
            'spica/curry': 14,
            'spica/flip': 17,
            'spica/memoize': 29,
            'spica/sequence': 90,
            'spica/url': 97
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
        { './src/export': 106 }
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
        root.commonJsStrict = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return require('pjax-api');
}));