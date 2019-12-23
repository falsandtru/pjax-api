/*! pjax-api v3.29.10 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
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
            const global_1 = _dereq_('./global');
            const type_1 = _dereq_('./type');
            const concat_1 = _dereq_('./concat');
            const {Object: Obj} = global_1.global;
            exports.assign = template((prop, target, source) => target[prop] = source[prop]);
            exports.clone = template((prop, target, source) => {
                switch (type_1.type(source[prop])) {
                case 'Array':
                    return target[prop] = exports.clone([], source[prop]);
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.clone(source[prop] instanceof Obj ? {} : Obj.create(null), source[prop]);
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
                    return target[prop] = exports.extend([], source[prop]);
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.extend(target[prop], source[prop]);
                    default:
                        return target[prop] = exports.extend(source[prop] instanceof Obj ? {} : Obj.create(null), source[prop]);
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
                        return target[prop] = concat_1.concat(target[prop], source[prop]);
                    default:
                        return target[prop] = exports.merge([], source[prop]);
                    }
                case 'Object':
                    switch (type_1.type(target[prop])) {
                    case 'Object':
                        return target[prop] = exports.merge(target[prop], source[prop]);
                    default:
                        return target[prop] = exports.merge(source[prop] instanceof Obj ? {} : Obj.create(null), source[prop]);
                    }
                default:
                    return target[prop] = source[prop];
                }
            });
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
                            for (const prop in source) {
                                if (source.hasOwnProperty && !source.hasOwnProperty(prop))
                                    continue;
                                void strategy(prop, target, source);
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
                    return source instanceof Obj ? {} : Obj.create(null);
                default:
                    return source;
                }
            }
        },
        {
            './concat': 10,
            './global': 17,
            './type': 85
        }
    ],
    5: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const assign_1 = _dereq_('./assign');
            const equal_1 = _dereq_('./equal');
            const {Map} = global_1.global;
            class Cache {
                constructor(size, callback = () => undefined, opts = {}) {
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
                    this.store = new Map(entries);
                    for (const k of [
                            ...stats[1],
                            ...stats[0]
                        ].slice(LFU.length + LRU.length)) {
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
                        const index = equal_1.findIndex(key, stat);
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
                    this.store = new Map();
                    this.stats = {
                        LRU: [],
                        LFU: []
                    };
                    if (this.settings.ignore.clear)
                        return;
                    for (const [key, val] of store) {
                        void this.callback(key, val);
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
                    return this.accessLFU(key) || this.accessLRU(key);
                }
                accessLRU(key) {
                    if (!this.store.has(key))
                        return false;
                    const {LRU} = this.stats;
                    const index = equal_1.findIndex(key, LRU);
                    if (index === -1)
                        return false;
                    const {LFU} = this.stats;
                    void LFU.unshift(...LRU.splice(index, 1));
                    return true;
                }
                accessLFU(key) {
                    if (!this.store.has(key))
                        return false;
                    const {LFU} = this.stats;
                    const index = equal_1.findIndex(key, LFU);
                    if (index === -1)
                        return false;
                    void LFU.unshift(...LFU.splice(index, 1));
                    return true;
                }
            }
            exports.Cache = Cache;
        },
        {
            './assign': 4,
            './equal': 13,
            './global': 17
        }
    ],
    6: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            const exception_1 = _dereq_('./exception');
            const maybe_1 = _dereq_('./monad/maybe');
            const either_1 = _dereq_('./monad/either');
            const {
                Object: Obj,
                Set
            } = global_1.global;
            class Cancellation extends promise_1.AtomicPromise {
                constructor(cancelees = []) {
                    super(res => resolve = res);
                    this.alive = true;
                    this.canceled_ = false;
                    this.listeners = new Set();
                    this.register = listener => {
                        if (this.canceled_)
                            return void handler(this.reason), () => undefined;
                        if (!this.alive)
                            return () => undefined;
                        void this.listeners.add(handler);
                        return () => this.alive ? void this.listeners.delete(handler) : undefined;
                        function handler(reason) {
                            try {
                                void listener(reason);
                            } catch (reason) {
                                void exception_1.causeAsyncException(reason);
                            }
                        }
                    };
                    this.cancel = reason => {
                        if (!this.alive)
                            return;
                        this.alive = false;
                        this.canceled_ = true;
                        this.reason = reason;
                        this.resolve(this.reason);
                        void Obj.freeze(this.listeners);
                        void Obj.freeze(this);
                        for (const listener of this.listeners) {
                            void listener(reason);
                        }
                    };
                    this.close = reason => {
                        if (!this.alive)
                            return;
                        this.alive = false;
                        void this.resolve(promise_1.AtomicPromise.reject(reason));
                        void Obj.freeze(this.listeners);
                        void Obj.freeze(this);
                    };
                    this.promise = val => this.canceled_ ? promise_1.AtomicPromise.reject(this.reason) : promise_1.AtomicPromise.resolve(val);
                    this.maybe = val => maybe_1.Just(val).bind(val => this.canceled_ ? maybe_1.Nothing : maybe_1.Just(val));
                    this.either = val => either_1.Right(val).bind(val => this.canceled_ ? either_1.Left(this.reason) : either_1.Right(val));
                    var resolve;
                    this.resolve = resolve;
                    for (const cancellee of cancelees) {
                        void cancellee.register(this.cancel);
                    }
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
                get canceled() {
                    return this.canceled_;
                }
            }
            exports.Cancellation = Cancellation;
        },
        {
            './exception': 14,
            './global': 17,
            './monad/either': 23,
            './monad/maybe': 27,
            './promise': 79
        }
    ],
    7: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const exception_1 = _dereq_('./exception');
            let queue = [];
            function tick(cb) {
                void queue.push(cb);
                void schedule();
            }
            exports.tick = tick;
            const scheduler = Promise.resolve();
            function schedule() {
                if (queue.length !== 1)
                    return;
                void scheduler.then(run);
            }
            function run() {
                const cbs = flush();
                while (true) {
                    try {
                        while (cbs.length > 0) {
                            void cbs.shift()();
                        }
                        return;
                    } catch (reason) {
                        void exception_1.causeAsyncException(reason);
                        continue;
                    }
                }
            }
            function flush() {
                const cbs = queue;
                queue = [];
                return cbs;
            }
        },
        { './exception': 14 }
    ],
    8: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            var clock_tick_1 = _dereq_('./clock.tick');
            exports.tick = clock_tick_1.tick;
            const {setTimeout} = global_1.global;
            exports.clock = Promise.resolve();
            function wait(ms) {
                return ms === 0 ? promise_1.AtomicPromise.resolve(exports.clock) : new promise_1.AtomicPromise(resolve => void setTimeout(resolve, ms));
            }
            exports.wait = wait;
        },
        {
            './clock.tick': 7,
            './global': 17,
            './promise': 79
        }
    ],
    9: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    10: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function concat(target, source) {
                return void target.push(...source), target;
            }
            exports.concat = concat;
        },
        {}
    ],
    11: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    12: [
        function (_dereq_, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(_dereq_('./monad/either'));
        },
        { './monad/either': 23 }
    ],
    13: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function findIndex(a1, as) {
                const isNaN = a1 !== a1;
                for (let i = 0; i < as.length; ++i) {
                    const a2 = as[i];
                    if (isNaN ? a2 !== a2 : a2 === a1)
                        return i;
                }
                return -1;
            }
            exports.findIndex = findIndex;
        },
        {}
    ],
    14: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function causeAsyncException(reason) {
                void Promise.reject(reason);
            }
            exports.causeAsyncException = causeAsyncException;
        },
        {}
    ],
    15: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const curry_1 = _dereq_('./curry');
            function flip(f) {
                return curry_1.curry((b, a) => f.length > 1 ? f(a, b) : f(a)(b));
            }
            exports.flip = flip;
        },
        { './curry': 11 }
    ],
    16: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('./promise');
            class Future extends Promise {
                constructor() {
                    let state = true;
                    let bind;
                    super(resolve => bind = value => {
                        if (!state)
                            throw new Error(`Spica: Future: Cannot rebind a value.`);
                        state = false;
                        void resolve(value);
                        return this;
                    });
                    this.bind = bind;
                }
                static get [Symbol.species]() {
                    return Promise;
                }
            }
            exports.Future = Future;
            class AtomicFuture extends promise_1.AtomicPromise {
                constructor() {
                    let state = true;
                    let bind;
                    super(resolve => bind = value => {
                        if (!state)
                            throw new Error(`Spica: AtomicFuture: Cannot rebind a value.`);
                        state = false;
                        void resolve(value);
                        return this;
                    });
                    this.bind = bind;
                }
                static get [Symbol.species]() {
                    return promise_1.AtomicPromise;
                }
            }
            exports.AtomicFuture = AtomicFuture;
        },
        { './promise': 79 }
    ],
    17: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.global = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || this;
            exports.default = exports.global;
            exports.global.global = exports.global;
        },
        {}
    ],
    18: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.HNil = new class HNil {
                constructor() {
                    void this.NIL;
                }
                push(a) {
                    return new HCons(a, this);
                }
                extend(f) {
                    return this.push(f());
                }
                tuple() {
                    return [];
                }
            }();
            class HCons {
                constructor(head, tail) {
                    this.head = head;
                    this.tail = tail;
                    void this.CONS;
                }
                push(a) {
                    return new HCons(a, this);
                }
                walk(f) {
                    void f(this.head);
                    return this.tail;
                }
                modify(f) {
                    return this.tail.push(f(this.head));
                }
                extend(f) {
                    return this.push(f(this.head));
                }
                compact(f) {
                    return this.tail.modify(r => f(this.head, r));
                }
                reverse() {
                    return this.tuple().reverse();
                }
                tuple() {
                    const t = this.tail.tuple();
                    void t.unshift(this.head);
                    return t;
                }
            }
        },
        {}
    ],
    19: [
        function (_dereq_, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(_dereq_('./monad/maybe'));
        },
        { './monad/maybe': 27 }
    ],
    20: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function memoize(f, memory = new Map()) {
                return a => memory.has(a) ? memory.get(a) : void memory.set(a, f(a)) || memory.get(a);
            }
            exports.memoize = memoize;
        },
        {}
    ],
    21: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../curry': 11,
            './functor': 24
        }
    ],
    22: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                        const r = m.extract(() => undefined, a => [a]);
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
            '../promise': 79,
            './monad': 28
        }
    ],
    23: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const Monad = _dereq_('./either.impl');
            class Either extends Monad.Either {
                constructor() {
                    super(() => undefined);
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
        { './either.impl': 22 }
    ],
    24: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './lazy': 25 }
    ],
    25: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    26: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                        const r = m.extract(() => undefined, a => [a]);
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
                        throw undefined;
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
            '../promise': 79,
            './monadplus': 29
        }
    ],
    27: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const Monad = _dereq_('./maybe.impl');
            class Maybe extends Monad.Maybe {
                constructor() {
                    super(() => undefined);
                }
            }
            exports.Maybe = Maybe;
            function Just(a) {
                return new Monad.Just(a);
            }
            exports.Just = Just;
            exports.Nothing = Monad.Maybe.mzero;
        },
        { './maybe.impl': 26 }
    ],
    28: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { './applicative': 21 }
    ],
    29: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const monad_1 = _dereq_('./monad');
            class MonadPlus extends monad_1.Monad {
            }
            exports.MonadPlus = MonadPlus;
            (function (MonadPlus) {
            }(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {})));
        },
        { './monad': 28 }
    ],
    30: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('./sequence/core');
            exports.Sequence = core_1.Sequence;
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
            const compose_1 = _dereq_('../compose');
            void compose_1.compose(core_1.Sequence, resume_1.default, from_1.default, cycle_1.default, random_1.default, concat_1.default, zip_1.default, difference_1.default, union_1.default, intersect_1.default, pure_1.default, return_1.default, sequence_1.default, mempty_1.default, mconcat_1.default, mappend_1.default, mzero_1.default, mplus_1.default, extract_1.default, iterate_1.default, memoize_1.default, reduce_1.default, take_1.default, drop_1.default, takeWhile_1.default, dropWhile_1.default, takeUntil_1.default, dropUntil_1.default, sort_1.default, unique_1.default, fmap_1.default, ap_1.default, bind_1.default, join_1.default, mapM_1.default, filterM_1.default, map_1.default, filter_1.default, scanl_1.default, foldr_1.default, group_1.default, inits_1.default, tails_1.default, segs_1.default, subsequences_1.default, permutations_1.default);
        },
        {
            '../compose': 9,
            './sequence/core': 31,
            './sequence/member/instance/ap': 32,
            './sequence/member/instance/bind': 33,
            './sequence/member/instance/drop': 34,
            './sequence/member/instance/dropUntil': 35,
            './sequence/member/instance/dropWhile': 36,
            './sequence/member/instance/extract': 37,
            './sequence/member/instance/filter': 38,
            './sequence/member/instance/filterM': 39,
            './sequence/member/instance/fmap': 40,
            './sequence/member/instance/foldr': 41,
            './sequence/member/instance/group': 42,
            './sequence/member/instance/inits': 43,
            './sequence/member/instance/iterate': 44,
            './sequence/member/instance/join': 45,
            './sequence/member/instance/map': 46,
            './sequence/member/instance/mapM': 47,
            './sequence/member/instance/memoize': 48,
            './sequence/member/instance/permutations': 49,
            './sequence/member/instance/reduce': 50,
            './sequence/member/instance/scanl': 51,
            './sequence/member/instance/segs': 52,
            './sequence/member/instance/sort': 53,
            './sequence/member/instance/subsequences': 54,
            './sequence/member/instance/tails': 55,
            './sequence/member/instance/take': 56,
            './sequence/member/instance/takeUntil': 57,
            './sequence/member/instance/takeWhile': 58,
            './sequence/member/instance/unique': 59,
            './sequence/member/static/concat': 60,
            './sequence/member/static/cycle': 61,
            './sequence/member/static/difference': 62,
            './sequence/member/static/from': 63,
            './sequence/member/static/intersect': 64,
            './sequence/member/static/mappend': 65,
            './sequence/member/static/mconcat': 66,
            './sequence/member/static/mempty': 67,
            './sequence/member/static/mplus': 68,
            './sequence/member/static/mzero': 69,
            './sequence/member/static/pure': 70,
            './sequence/member/static/random': 71,
            './sequence/member/static/resume': 72,
            './sequence/member/static/return': 73,
            './sequence/member/static/sequence': 74,
            './sequence/member/static/union': 75,
            './sequence/member/static/zip': 76
        }
    ],
    31: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { '../monadplus': 29 }
    ],
    32: [
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
        { '../../core': 31 }
    ],
    33: [
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
        { '../../core': 31 }
    ],
    34: [
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
        { '../../core': 31 }
    ],
    35: [
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
        { '../../core': 31 }
    ],
    36: [
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
        { '../../core': 31 }
    ],
    37: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                extract() {
                    const acc = [];
                    let iter = () => this.iterate();
                    while (true) {
                        const thunk = iter();
                        if (!core_1.Sequence.isIterable(thunk))
                            return acc;
                        void concat_1.concat(acc, [core_1.Sequence.Thunk.value(thunk)]);
                        iter = core_1.Sequence.Thunk.iterator(thunk);
                    }
                }
            }
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    38: [
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
        { '../../core': 31 }
    ],
    39: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                filterM(f) {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.from([[]]);
                        default: {
                                const x = xs.shift();
                                return f(x).bind(b => b ? xs.length === 0 ? core_1.Sequence.from([[x]]) : core_1.Sequence.from(xs).filterM(f).fmap(ys => concat_1.concat([x], ys)) : xs.length === 0 ? core_1.Sequence.from([[]]) : core_1.Sequence.from(xs).filterM(f));
                            }
                        }
                    });
                }
            }
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    40: [
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
        { '../../core': 31 }
    ],
    41: [
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
        { '../../core': 31 }
    ],
    42: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                group(f) {
                    return new core_1.Sequence(([iter, acc] = [
                        () => this.iterate(),
                        []
                    ], cons) => core_1.Sequence.Iterator.when(iter(), () => acc.length === 0 ? cons() : cons(acc), (thunk, recur) => acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (concat_1.concat(acc, [core_1.Sequence.Thunk.value(thunk)]), recur()) : cons(acc, [
                        core_1.Sequence.Thunk.iterator(thunk),
                        concat_1.concat([], [core_1.Sequence.Thunk.value(thunk)])
                    ])));
                }
            }
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    43: [
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
        { '../../core': 31 }
    ],
    44: [
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
                            undefined,
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
        { '../../core': 31 }
    ],
    45: [
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
        { '../../core': 31 }
    ],
    46: [
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
        { '../../core': 31 }
    ],
    47: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                mapM(f) {
                    return core_1.Sequence.from([0]).bind(() => {
                        const xs = this.extract();
                        switch (xs.length) {
                        case 0:
                            return core_1.Sequence.mempty;
                        default: {
                                const x = xs.shift();
                                return f(x).bind(y => xs.length === 0 ? core_1.Sequence.from([[y]]) : core_1.Sequence.from(xs).mapM(f).fmap(ys => concat_1.concat([y], ys)));
                            }
                        }
                    });
                }
            }
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    48: [
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
        { '../../core': 31 }
    ],
    49: [
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
        { '../../core': 31 }
    ],
    50: [
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
        { '../../core': 31 }
    ],
    51: [
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
        { '../../core': 31 }
    ],
    52: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                segs() {
                    return core_1.Sequence.mappend(this.foldr((a, bs) => bs.take(1).bind(b => core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(c => concat_1.concat([a], c)))]), bs)), core_1.Sequence.from([core_1.Sequence.from([])])).bind(a => a), core_1.Sequence.from([[]]));
                }
            }
            exports.default = default_1;
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    53: [
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
        { '../../core': 31 }
    ],
    54: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            const concat_1 = _dereq_('../../../../concat');
            class default_1 extends core_1.Sequence {
                subsequences() {
                    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(() => nonEmptySubsequences(this)));
                }
            }
            exports.default = default_1;
            function nonEmptySubsequences(xs) {
                return core_1.Sequence.Iterator.when(xs.iterate(), () => core_1.Sequence.mempty, xt => core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(xt, () => cons(), xt => cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).foldr((ys, r) => core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([concat_1.concat([core_1.Sequence.Thunk.value(xt)], ys)])), r), core_1.Sequence.mempty)))).bind(xs => xs)));
            }
        },
        {
            '../../../../concat': 10,
            '../../core': 31
        }
    ],
    55: [
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
        { '../../core': 31 }
    ],
    56: [
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
        { '../../core': 31 }
    ],
    57: [
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
        { '../../core': 31 }
    ],
    58: [
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
        { '../../core': 31 }
    ],
    59: [
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
        { '../../core': 31 }
    ],
    60: [
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
        { '../../core': 31 }
    ],
    61: [
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
        { '../../core': 31 }
    ],
    62: [
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
        { '../../core': 31 }
    ],
    63: [
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
        { '../../core': 31 }
    ],
    64: [
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
        { '../../core': 31 }
    ],
    65: [
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
        { '../../core': 31 }
    ],
    66: [
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
        { '../../core': 31 }
    ],
    67: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            exports.default = default_1;
            default_1.mempty = new core_1.Sequence((_, cons) => cons());
        },
        { '../../core': 31 }
    ],
    68: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            exports.default = default_1;
            default_1.mplus = core_1.Sequence.mappend;
        },
        { '../../core': 31 }
    ],
    69: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            exports.default = default_1;
            default_1.mzero = core_1.Sequence.mempty;
        },
        { '../../core': 31 }
    ],
    70: [
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
        { '../../core': 31 }
    ],
    71: [
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
        { '../../core': 31 }
    ],
    72: [
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
        { '../../core': 31 }
    ],
    73: [
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
        { '../../core': 31 }
    ],
    74: [
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
        { '../../core': 31 }
    ],
    75: [
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
        { '../../core': 31 }
    ],
    76: [
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
        { '../../core': 31 }
    ],
    77: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function noop() {
            }
            exports.noop = noop;
        },
        {}
    ],
    78: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const assign_1 = _dereq_('./assign');
            const concat_1 = _dereq_('./concat');
            const equal_1 = _dereq_('./equal');
            const exception_1 = _dereq_('./exception');
            const {Map, WeakSet, Error} = global_1.global;
            var RegisterItemType;
            (function (RegisterItemType) {
                RegisterItemType.monitor = 'monitor';
                RegisterItemType.subscriber = 'subscriber';
            }(RegisterItemType = exports.RegisterItemType || (exports.RegisterItemType = {})));
            class Observation {
                constructor(opts = {}) {
                    this.settings = { limit: 10 };
                    this.relaySources = new WeakSet();
                    this.node_ = {
                        parent: undefined,
                        children: new Map(),
                        childrenNames: [],
                        items: []
                    };
                    void assign_1.extend(this.settings, opts);
                }
                monitor(namespace, listener, {
                    once = false
                } = {}) {
                    if (typeof listener !== 'function')
                        throw new Error(`Spica: Observation: Invalid listener: ${ listener }`);
                    const off = () => this.off(namespace, listener, RegisterItemType.monitor);
                    const {items} = this.seekNode_(namespace);
                    if (isRegistered(items, RegisterItemType.monitor, namespace, listener))
                        return off;
                    if (items.length === this.settings.limit)
                        throw new Error(`Spica: Observation: Exceeded max listener limit.`);
                    void items.push({
                        type: RegisterItemType.monitor,
                        namespace,
                        listener,
                        options: { once }
                    });
                    return off;
                }
                on(namespace, listener, {
                    once = false
                } = {}) {
                    if (typeof listener !== 'function')
                        throw new Error(`Spica: Observation: Invalid listener: ${ listener }`);
                    const off = () => this.off(namespace, listener);
                    const {items} = this.seekNode_(namespace);
                    if (isRegistered(items, RegisterItemType.subscriber, namespace, listener))
                        return off;
                    if (items.length === this.settings.limit)
                        throw new Error(`Spica: Observation: Exceeded max listener limit.`);
                    void items.push({
                        type: RegisterItemType.subscriber,
                        namespace,
                        listener,
                        options: { once }
                    });
                    return off;
                }
                once(namespace, listener) {
                    return this.on(namespace, listener, { once: true });
                }
                off(namespace, listener, type = RegisterItemType.subscriber) {
                    switch (typeof listener) {
                    case 'function':
                        return void this.seekNode_(namespace).items.some(({
                            type: type_,
                            listener: listener_
                        }, i, items) => {
                            if (listener_ !== listener)
                                return false;
                            if (type_ !== type)
                                return false;
                            switch (i) {
                            case 0:
                                return !void items.shift();
                            case items.length - 1:
                                return !void items.pop();
                            default:
                                return !void items.splice(i, 1);
                            }
                        });
                    case 'undefined': {
                            const node = this.seekNode_(namespace);
                            for (const name of node.childrenNames.slice()) {
                                void this.off([
                                    ...namespace,
                                    name
                                ]);
                                const child = node.children.get(name);
                                if (!child)
                                    continue;
                                if (child.items.length + child.childrenNames.length > 0)
                                    continue;
                                void node.children.delete(name);
                                void node.childrenNames.splice(equal_1.findIndex(name, node.childrenNames), 1);
                            }
                            node.items = node.items.filter(({type}) => type === RegisterItemType.monitor);
                            return;
                        }
                    default:
                        throw new Error(`Spica: Observation: Unreachable.`);
                    }
                }
                emit(namespace, data, tracker) {
                    void this.drain_(namespace, data, tracker);
                }
                reflect(namespace, data) {
                    let results = [];
                    void this.emit(namespace, data, (_, r) => results = r);
                    return results;
                }
                relay(source) {
                    if (this.relaySources.has(source))
                        return () => undefined;
                    void this.relaySources.add(source);
                    const unbind = source.monitor([], (data, namespace) => void this.emit(namespace, data));
                    return () => (void this.relaySources.delete(source), unbind());
                }
                drain_(namespace, data, tracker) {
                    const results = [];
                    for (const {
                                type,
                                listener,
                                options: {once}
                            } of this.refsBelow_(this.seekNode_(namespace))) {
                        if (type !== RegisterItemType.subscriber)
                            continue;
                        if (once) {
                            void this.off(namespace, listener);
                        }
                        try {
                            const result = listener(data, namespace);
                            if (tracker) {
                                results[results.length] = result;
                            }
                        } catch (reason) {
                            void exception_1.causeAsyncException(reason);
                        }
                    }
                    for (const {
                                type,
                                listener,
                                options: {once}
                            } of this.refsAbove_(this.seekNode_(namespace))) {
                        if (type !== RegisterItemType.monitor)
                            continue;
                        if (once) {
                            void this.off(namespace, listener, RegisterItemType.monitor);
                        }
                        try {
                            void listener(data, namespace);
                        } catch (reason) {
                            void exception_1.causeAsyncException(reason);
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
                refs(namespace) {
                    return this.refsBelow_(this.seekNode_(namespace));
                }
                refsAbove_({parent, items}) {
                    items = items.slice();
                    while (parent) {
                        items = concat_1.concat(items, parent.items);
                        parent = parent.parent;
                    }
                    return items;
                }
                refsBelow_({childrenNames, children, items}) {
                    items = items.slice();
                    for (let i = 0; i < childrenNames.length; ++i) {
                        const name = childrenNames[i];
                        const below = this.refsBelow_(children.get(name));
                        items = concat_1.concat(items, below);
                        if (below.length === 0) {
                            void children.delete(name);
                            void childrenNames.splice(equal_1.findIndex(name, childrenNames), 1);
                            void --i;
                        }
                    }
                    return items;
                }
                seekNode_(namespace) {
                    let node = this.node_;
                    for (const name of namespace) {
                        const {children} = node;
                        if (!children.has(name)) {
                            void node.childrenNames.push(name);
                            children.set(name, {
                                parent: node,
                                children: new Map(),
                                childrenNames: [],
                                items: []
                            });
                        }
                        node = children.get(name);
                    }
                    return node;
                }
            }
            exports.Observation = Observation;
            function isRegistered(items, type, namespace, listener) {
                return items.some(item => item.type === type && item.namespace.length === namespace.length && item.namespace.every((ns, i) => ns === namespace[i]) && item.listener === listener);
            }
        },
        {
            './assign': 4,
            './concat': 10,
            './equal': 13,
            './exception': 14,
            './global': 17
        }
    ],
    79: [
        function (_dereq_, module, exports) {
            'use strict';
            var _a, _b;
            Object.defineProperty(exports, '__esModule', { value: true });
            const concat_1 = _dereq_('./concat');
            var State;
            (function (State) {
                State[State['resolved'] = 0] = 'resolved';
                State[State['rejected'] = 1] = 'rejected';
            }(State || (State = {})));
            const status = Symbol();
            const queue = Symbol();
            const resume = Symbol();
            class AtomicPromise {
                constructor(executor) {
                    this[Symbol.toStringTag] = 'Promise';
                    this[_a] = [];
                    this[_b] = [];
                    try {
                        void executor(value => {
                            this[status][0] = this[status][0] || [
                                0,
                                value
                            ];
                            void this[resume]();
                        }, reason => {
                            this[status][0] = this[status][0] || [
                                1,
                                reason
                            ];
                            void this[resume]();
                        });
                    } catch (reason) {
                        this[status][0] = [
                            1,
                            reason
                        ];
                        void this[resume]();
                    }
                }
                static get [Symbol.species]() {
                    return AtomicPromise;
                }
                static all(values) {
                    return values.reduce((acc, value) => acc.then(vs => AtomicPromise.resolve(value).then(value => concat_1.concat(vs, [value]))), AtomicPromise.resolve([]));
                }
                static race(values) {
                    return new AtomicPromise((resolve, reject) => {
                        for (const value of values) {
                            void AtomicPromise.resolve(value).then(resolve, reject);
                        }
                    });
                }
                static resolve(value) {
                    return new AtomicPromise(resolve => void resolve(value));
                }
                static reject(reason) {
                    return new AtomicPromise((_, reject) => void reject(reason));
                }
                [resume]() {
                    if (!this[status][0])
                        return;
                    const [state, value] = this[status][0];
                    while (this[queue].length > 0) {
                        const [resolve, reject] = this[queue].shift();
                        switch (state) {
                        case 0:
                            isPromiseLike(value) ? void value.then(resolve, reject) : void resolve(value);
                            continue;
                        case 1:
                            void reject(value);
                            continue;
                        }
                    }
                }
                then(onfulfilled, onrejected) {
                    return new AtomicPromise((resolve, reject) => {
                        void this[queue].push([
                            value => {
                                if (!onfulfilled)
                                    return void resolve(value);
                                try {
                                    void resolve(onfulfilled(value));
                                } catch (reason) {
                                    void reject(reason);
                                }
                            },
                            reason => {
                                if (!onrejected)
                                    return void reject(reason);
                                try {
                                    void resolve(onrejected(reason));
                                } catch (reason) {
                                    void reject(reason);
                                }
                            }
                        ]);
                        void this[resume]();
                    });
                }
                catch(onrejected) {
                    return this.then(undefined, onrejected);
                }
                finally(onfinally) {
                    return this.then(onfinally, onfinally).then(() => this);
                }
            }
            exports.AtomicPromise = AtomicPromise;
            _a = status, _b = queue;
            function isPromiseLike(value) {
                return !!value && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
            }
        },
        { './concat': 10 }
    ],
    80: [
        function (_dereq_, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(_dereq_('./monad/sequence'));
        },
        { './monad/sequence': 30 }
    ],
    81: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                return id === undefined ? (zeros + ++cnt).slice(-15) : (zeros + id).slice(-15);
            }
            exports.sqid = sqid;
        },
        {}
    ],
    82: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const observation_1 = _dereq_('./observation');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const sqid_1 = _dereq_('./sqid');
            const noop_1 = _dereq_('./noop');
            const exception_1 = _dereq_('./exception');
            const {
                Object: Obj,
                Set,
                Map,
                WeakSet,
                Error,
                setTimeout
            } = global_1.global;
            class Supervisor extends promise_1.AtomicPromise {
                constructor(opts = {}) {
                    super((resolve, reject) => {
                        cb = [
                            resolve,
                            reject
                        ];
                        state = new future_1.AtomicFuture();
                        return this.then === promise_1.AtomicPromise.prototype.then ? state : function* () {
                            return state;
                        }();
                    });
                    this.state = new future_1.AtomicFuture();
                    this.id = sqid_1.sqid();
                    this.settings = {
                        name: '',
                        size: Infinity,
                        timeout: Infinity,
                        destructor: _ => undefined,
                        scheduler: clock_1.tick,
                        resource: 10
                    };
                    this.events_ = {
                        init: new observation_1.Observation(),
                        loss: new observation_1.Observation(),
                        exit: new observation_1.Observation()
                    };
                    this.events = this.events_;
                    this.workers = new Map();
                    this.alive = true;
                    this.available = true;
                    this.scheduled = false;
                    this.scheduler = () => void (void 0, this.settings.scheduler)(this.deliver);
                    this.messages = [];
                    this.deliver = () => {
                        if (!this.available)
                            return;
                        this.scheduled = false;
                        const since = Date.now();
                        for (let i = 0, len = this.messages.length; this.available && i < len; ++i) {
                            if (this.settings.resource - (Date.now() - since) <= 0)
                                return void this.schedule();
                            const [name, param, callback, expiry] = this.messages[i];
                            const names = typeof name === 'string' ? [name] : name;
                            let result;
                            for (const name of names) {
                                result = this.workers.has(name) ? this.workers.get(name).call([
                                    param,
                                    expiry
                                ]) : undefined;
                                if (result)
                                    break;
                            }
                            if (result === undefined && Date.now() < expiry)
                                continue;
                            i === 0 ? void this.messages.shift() : void this.messages.splice(i, 1);
                            void --i;
                            void --len;
                            if (result === undefined) {
                                const name = names[Symbol.iterator]().next().value;
                                void this.events_.loss.emit([name], [
                                    name,
                                    param
                                ]);
                                try {
                                    void callback(undefined, new Error(`Spica: Supervisor: A process has failed.`));
                                } catch (reason) {
                                    void exception_1.causeAsyncException(reason);
                                }
                            } else {
                                void result.then(reply => void callback(reply), () => void callback(undefined, new Error(`Spica: Supervisor: A process has failed.`)));
                            }
                        }
                    };
                    var cb;
                    var state;
                    cb || void this.then();
                    void this.state.then(...cb);
                    void state.bind(this.state);
                    void assign_1.extend(this.settings, opts);
                    this.name = this.settings.name;
                    if (this.constructor === Supervisor)
                        throw new Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: Cannot instantiate abstract classes.`);
                    void this.constructor.instances.add(this);
                }
                static get instances() {
                    return this.hasOwnProperty('instances_') ? this.instances_ : this.instances_ = new Set();
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
                    void Obj.freeze(this.workers);
                    while (this.messages.length > 0) {
                        const [name, param] = this.messages.shift();
                        const names = typeof name === 'string' ? [name] : [...name];
                        void this.events_.loss.emit([names[0]], [
                            names[0],
                            param
                        ]);
                    }
                    this.alive = false;
                    void this.constructor.instances.delete(this);
                    void Obj.freeze(this);
                    void this.settings.destructor(reason);
                    void this.state.bind(reason === undefined ? undefined : promise_1.AtomicPromise.reject(reason));
                }
                throwErrorIfNotAvailable() {
                    if (!this.available)
                        throw new Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A supervisor is already terminated.`);
                }
                register(name, process, state, reason) {
                    void this.throwErrorIfNotAvailable();
                    if (arguments.length > 3) {
                        void this.kill(name, reason);
                        return this.register(name, process, state);
                    }
                    if (typeof process === 'function')
                        return this.register(name, {
                            init: state => state,
                            main: process,
                            exit: _ => undefined
                        }, state);
                    if (this.workers.has(name))
                        throw new Error(`Spica: Supervisor: <${ this.id }/${ this.name }/${ name }>: Cannot register a process multiply with the same name.`);
                    void this.schedule();
                    return this.workers.set(name, new Worker(this, name, process, state, Supervisor.standalone.has(process), this.events_, () => void this.workers.delete(name))).get(name).terminate;
                }
                call(name, param, callback = this.settings.timeout, timeout = this.settings.timeout) {
                    return this.call_(typeof name === 'string' ? name : new NamePool(this.workers, name), param, callback, timeout);
                }
                call_(name, param, callback, timeout) {
                    if (typeof callback === 'number')
                        return new promise_1.AtomicPromise((resolve, reject) => void this.call_(name, param, (result, err) => err ? reject(err) : resolve(result), callback));
                    void this.messages.push([
                        name,
                        param,
                        callback,
                        Date.now() + timeout
                    ]);
                    while (this.messages.length > (this.available ? this.settings.size : 0)) {
                        const [name, param, callback] = this.messages.shift();
                        const names = typeof name === 'string' ? [name] : [name[Symbol.iterator]().next().value];
                        void this.events_.loss.emit([names[0]], [
                            names[0],
                            param
                        ]);
                        try {
                            void callback(undefined, new Error(`Spica: Supervisor: <${ this.id }/${ this.name }>: A message overflowed.`));
                        } catch (reason) {
                            void exception_1.causeAsyncException(reason);
                        }
                    }
                    void this.throwErrorIfNotAvailable();
                    void this.schedule();
                    if (timeout <= 0)
                        return;
                    if (timeout === Infinity)
                        return;
                    void setTimeout(() => void this.schedule(), timeout + 3);
                }
                cast(name, param, timeout = this.settings.timeout) {
                    const result = this.cast_(typeof name === 'string' ? name : new NamePool(this.workers, name), param, timeout);
                    if (result === undefined)
                        return false;
                    void result.catch(noop_1.noop);
                    return true;
                }
                cast_(name, param, timeout) {
                    void this.throwErrorIfNotAvailable();
                    const names = typeof name === 'string' ? [name] : name;
                    let result;
                    for (const name of names) {
                        result = this.workers.has(name) ? this.workers.get(name).call([
                            param,
                            Date.now() + timeout
                        ]) : undefined;
                        if (result)
                            break;
                    }
                    if (result === undefined) {
                        const name = names[Symbol.iterator]().next().value;
                        void this.events_.loss.emit([name], [
                            name,
                            param
                        ]);
                    }
                    return result;
                }
                refs(name) {
                    return name === undefined ? [...this.workers.values()].map(convert) : this.workers.has(name) ? [convert(this.workers.get(name))] : [];
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
                        for (const [, worker] of this.workers) {
                            void worker.terminate(reason);
                        }
                    }
                }
                terminate(reason) {
                    if (!this.available)
                        return false;
                    void this.destructor(reason);
                    return true;
                }
                schedule() {
                    if (this.scheduled)
                        return;
                    if (this.messages.length === 0)
                        return;
                    void clock_1.tick(this.scheduler);
                    this.scheduled = true;
                }
            }
            exports.Supervisor = Supervisor;
            Supervisor.standalone = new WeakSet();
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
                constructor(sv, name, process, state, initiated, events, destructor_) {
                    this.sv = sv;
                    this.name = name;
                    this.process = process;
                    this.state = state;
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
                    void Obj.freeze(this);
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
                    this.state = this.process.init(this.state);
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
                        isFinite(expiry) && void setTimeout(() => void reject(new Error()), expiry - now);
                        this.available = false;
                        if (!this.initiated) {
                            void this.init();
                        }
                        void promise_1.AtomicPromise.resolve(this.process.main(param, this.state, this.terminate)).then(resolve, reject);
                    }).then(result => {
                        const [reply, state] = Array.isArray(result) ? result : [
                            result.reply,
                            result.state
                        ];
                        if (this.alive) {
                            void this.sv.schedule();
                            this.state = state;
                            this.available = true;
                        }
                        return reply;
                    }).catch(reason => {
                        void this.sv.schedule();
                        void this.terminate(reason);
                        throw reason;
                    });
                }
            }
        },
        {
            './assign': 4,
            './clock': 8,
            './exception': 14,
            './future': 16,
            './global': 17,
            './noop': 77,
            './observation': 78,
            './promise': 79,
            './sqid': 81
        }
    ],
    83: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const {setTimeout} = global_1.global;
            function throttle(interval, callback) {
                let timer = 0;
                let buffer = [];
                return arg => {
                    void buffer.push(arg);
                    if (timer > 0)
                        return;
                    timer = setTimeout(() => {
                        timer = 0;
                        void callback(buffer[buffer.length - 1], flush());
                    }, interval);
                };
                function flush() {
                    const buf = buffer;
                    buffer = [];
                    return buf;
                }
            }
            exports.throttle = throttle;
            function debounce(delay, callback) {
                let timer = 0;
                let buffer = [];
                return arg => {
                    void buffer.push(arg);
                    if (timer > 0)
                        return;
                    timer = setTimeout(() => {
                        timer = 0;
                        void setTimeout(() => {
                            if (timer > 0)
                                return;
                            void callback(buffer[buffer.length - 1], flush());
                        }, buffer.length > 1 ? delay : 0);
                    }, delay);
                };
                function flush() {
                    const buf = buffer;
                    buffer = [];
                    return buf;
                }
            }
            exports.debounce = debounce;
        },
        { './global': 17 }
    ],
    84: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function tuple(as) {
                return as;
            }
            exports.tuple = tuple;
        },
        {}
    ],
    85: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const toString = Object.prototype.toString;
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
                    return toString.call(value).slice(8, -1);
                }
            }
            exports.type = type;
            function isPrimitive(value) {
                switch (type(value)) {
                case 'undefined':
                case 'null':
                case 'boolean':
                case 'number':
                case 'bigint':
                case 'string':
                case 'symbol':
                    return true;
                default:
                    return false;
                }
            }
            exports.isPrimitive = isPrimitive;
        },
        {}
    ],
    86: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uncurry = f => (...args) => args.reduce((f, arg) => f(arg), f);
        },
        {}
    ],
    87: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const global_1 = _dereq_('./global');
            const format_1 = _dereq_('./url/domain/format');
            var format_2 = _dereq_('./url/domain/format');
            exports.standardize = format_2.standardize;
            const {location} = global_1.global;
            class URL {
                constructor(url, base = location.href) {
                    this.url = format_1.newURL(url, base);
                }
                get reference() {
                    return this.url.href;
                }
                get resource() {
                    return `${ this.origin }${ this.pathname }${ this.query === '?' ? '' : this.query }`;
                }
                get origin() {
                    return `${ this.protocol }//${ this.host }`;
                }
                get scheme() {
                    return this.url.protocol.slice(0, -1);
                }
                get protocol() {
                    return this.url.protocol;
                }
                get host() {
                    return this.url.host;
                }
                get hostname() {
                    return this.url.hostname;
                }
                get port() {
                    return this.url.port;
                }
                get path() {
                    return `${ this.pathname }${ this.query }`;
                }
                get pathname() {
                    return this.url.pathname;
                }
                get query() {
                    return this.url.search || !this.url.href.split('#', 1)[0].includes('?') ? this.url.search : '?';
                }
                get fragment() {
                    return this.url.hash || !this.url.href.includes('#') ? this.url.hash : '#';
                }
            }
            exports.URL = URL;
        },
        {
            './global': 17,
            './url/domain/format': 88
        }
    ],
    88: [
        function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                const memoize_1 = _dereq_('../../memoize');
                const cache_1 = _dereq_('../../cache');
                const flip_1 = _dereq_('../../flip');
                const uncurry_1 = _dereq_('../../uncurry');
                const {
                    URL: NativeURL,
                    location
                } = global;
                var Identifier;
                (function (Identifier) {
                }(Identifier || (Identifier = {})));
                function standardize(url, base = location.href) {
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
                exports.newURL = flip_1.flip(uncurry_1.uncurry(memoize_1.memoize(base => memoize_1.memoize(url => new NativeURL(formatURLForEdge(url, base), base), new cache_1.Cache(9)), new cache_1.Cache(9))));
                function formatURLForEdge(url, base = location.href) {
                    return url.trim() || base;
                }
            }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
        },
        {
            '../../cache': 5,
            '../../flip': 15,
            '../../memoize': 20,
            '../../uncurry': 86
        }
    ],
    89: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    90: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            _dereq_('spica/global');
            var builder_1 = _dereq_('./src/dom/builder');
            exports.Shadow = builder_1.Shadow;
            exports.HTML = builder_1.HTML;
            exports.SVG = builder_1.SVG;
            exports.API = builder_1.API;
            var proxy_1 = _dereq_('./src/dom/proxy');
            exports.proxy = proxy_1.proxy;
            var dom_1 = _dereq_('./src/util/dom');
            exports.frag = dom_1.frag;
            exports.shadow = dom_1.shadow;
            exports.html = dom_1.html;
            exports.svg = dom_1.svg;
            exports.text = dom_1.text;
            exports.define = dom_1.define;
            var listener_1 = _dereq_('./src/util/listener');
            exports.listen = listener_1.listen;
            exports.once = listener_1.once;
            exports.wait = listener_1.wait;
            exports.delegate = listener_1.delegate;
            exports.bind = listener_1.bind;
            exports.currentTargets = listener_1.currentTargets;
            var query_1 = _dereq_('./src/util/query');
            exports.apply = query_1.apply;
        },
        {
            './src/dom/builder': 91,
            './src/dom/proxy': 93,
            './src/util/dom': 94,
            './src/util/listener': 95,
            './src/util/query': 97,
            'spica/global': 17
        }
    ],
    91: [
        function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                const proxy_1 = _dereq_('./proxy');
                const dom_1 = _dereq_('../util/dom');
                const {Object: Obj} = global;
                function API(baseFactory, formatter = el => el) {
                    return new Proxy(() => undefined, handle(baseFactory, formatter));
                }
                exports.API = API;
                exports.Shadow = API(dom_1.html, dom_1.shadow);
                exports.HTML = API(dom_1.html);
                exports.SVG = API(dom_1.svg);
                function handle(baseFactory, formatter) {
                    return {
                        apply(obj, _, [prop, ...args]) {
                            return this.get(obj, prop, undefined)(...args);
                        },
                        get: (obj, prop) => obj[prop] || prop in obj || typeof prop !== 'string' ? obj[prop] : obj[prop] = builder(prop, baseFactory)
                    };
                    function builder(tag, baseFactory) {
                        return function build(attrs, children, factory) {
                            if (typeof attrs === 'function')
                                return build(undefined, undefined, attrs);
                            if (typeof children === 'function')
                                return build(attrs, undefined, children);
                            if (attrs !== undefined && isChildren(attrs))
                                return build(undefined, attrs, factory);
                            const node = formatter(elem(factory || defaultFactory, attrs || {}, children));
                            return node.nodeType === 1 ? new proxy_1.Elem(node, children) : new proxy_1.Elem(node.host, children, node);
                        };
                        function isChildren(children) {
                            return typeof children !== 'object' || Obj.values(children).slice(-1).every(val => typeof val === 'object');
                        }
                        function elem(factory, attrs, children) {
                            const el = factory(baseFactory, tag, attrs, children);
                            if (tag !== el.tagName.toLowerCase())
                                throw new Error(`TypedDOM: Expected tag name is "${ tag }" but actually "${ el.tagName.toLowerCase() }".`);
                            if (factory !== defaultFactory) {
                                for (const k in attrs) {
                                    if (!attrs.hasOwnProperty(k))
                                        continue;
                                    const v = attrs[k];
                                    if (typeof v !== 'function')
                                        continue;
                                    void el.removeEventListener(k, v);
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
            }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
        },
        {
            '../util/dom': 94,
            './proxy': 93
        }
    ],
    92: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const uuid_1 = _dereq_('spica/uuid');
            const sqid_1 = _dereq_('spica/sqid');
            const id = uuid_1.uuid().slice(-7);
            function uid() {
                return `id-${ id }-${ +sqid_1.sqid() }`;
            }
            exports.uid = uid;
        },
        {
            'spica/sqid': 81,
            'spica/uuid': 89
        }
    ],
    93: [
        function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                const identity_1 = _dereq_('./identity');
                const dom_1 = _dereq_('../util/dom');
                const {
                    Array,
                    Object: Obj,
                    Set,
                    WeakMap,
                    WeakSet,
                    Event
                } = global;
                var ElChildrenType;
                (function (ElChildrenType) {
                    ElChildrenType.Void = 'void';
                    ElChildrenType.Text = 'text';
                    ElChildrenType.Array = 'array';
                    ElChildrenType.Record = 'record';
                }(ElChildrenType || (ElChildrenType = {})));
                const memory = new WeakMap();
                function proxy(el) {
                    if (!memory.has(el))
                        throw new Error(`TypedDOM: This element has no proxy.`);
                    return memory.get(el);
                }
                exports.proxy = proxy;
                const tag = Symbol();
                class Elem {
                    constructor(element, children_, container = element) {
                        this.element = element;
                        this.children_ = children_;
                        this.container = container;
                        this.id_ = this.element.id.trim();
                        switch (true) {
                        case children_ === undefined:
                            this.type = ElChildrenType.Void;
                            break;
                        case typeof children_ === 'string':
                            this.type = ElChildrenType.Text;
                            break;
                        case Array.isArray(children_):
                            this.type = ElChildrenType.Array;
                            break;
                        case children_ && typeof children_ === 'object':
                            this.type = ElChildrenType.Record;
                            break;
                        default:
                            throw new Error(`TypedDOM: Invalid type children.`);
                        }
                        void throwErrorIfNotUsable(this);
                        void memory.set(this.element, this);
                        switch (this.type) {
                        case ElChildrenType.Void:
                            this.initialChildren = new WeakSet();
                            return;
                        case ElChildrenType.Text:
                            this.initialChildren = new WeakSet();
                            void dom_1.define(this.container, []);
                            this.children_ = this.container.appendChild(dom_1.text(''));
                            this.children = children_;
                            return;
                        case ElChildrenType.Array:
                            this.initialChildren = new WeakSet(children_);
                            void dom_1.define(this.container, []);
                            this.children_ = [];
                            this.children = children_;
                            return;
                        case ElChildrenType.Record:
                            this.initialChildren = new WeakSet(Obj.values(children_));
                            void dom_1.define(this.container, []);
                            this.children_ = observe(this.container, Object.assign({}, children_));
                            this.children = children_;
                            return;
                        default:
                            throw new Error(`TypedDOM: Unreachable code.`);
                        }
                        function observe(node, children) {
                            const descs = {};
                            for (const name in children) {
                                if (!children.hasOwnProperty(name))
                                    continue;
                                let child = children[name];
                                void throwErrorIfNotUsable(child);
                                void node.appendChild(child.element);
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
                                        if (newChild.element.parentElement !== node) {
                                            void throwErrorIfNotUsable(newChild);
                                        }
                                        void node.replaceChild(newChild.element, oldChild.element);
                                        child = newChild;
                                    }
                                };
                            }
                            return Obj.defineProperties(children, descs);
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
                    scope(child) {
                        if (child.element.nodeName !== 'STYLE')
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
                            this.children_ = this.children_.parentNode === this.container ? this.children_ : [...this.container.childNodes].find(node => node.nodeType === 3) || this.children_.cloneNode();
                            return this.children_.textContent;
                        default:
                            return this.children_;
                        }
                    }
                    set children(children) {
                        const removedChildren = new Set();
                        const addedChildren = new Set();
                        switch (this.type) {
                        case ElChildrenType.Void:
                            return;
                        case ElChildrenType.Text: {
                                if (children === this.children && !this.initialChildren.has(this.children_))
                                    return;
                                const targetChildren = this.children_;
                                const oldText = targetChildren.textContent;
                                const newText = children;
                                targetChildren.textContent = newText;
                                if (newText === oldText)
                                    return;
                                void this.element.dispatchEvent(new Event('change', {
                                    bubbles: false,
                                    cancelable: true
                                }));
                                return;
                            }
                        case ElChildrenType.Array: {
                                const sourceChildren = children;
                                const targetChildren = [];
                                this.children_ = targetChildren;
                                const mem = new WeakSet();
                                for (let i = 0; i < sourceChildren.length; ++i) {
                                    const newChild = sourceChildren[i];
                                    if (mem.has(newChild))
                                        throw new Error(`TypedDOM: Typed DOM children can't repeatedly be used to the same object.`);
                                    void mem.add(newChild);
                                    if (newChild.element.parentNode !== this.container) {
                                        void throwErrorIfNotUsable(newChild);
                                    }
                                    if (newChild.element === this.container.children[i]) {
                                        void targetChildren.push(newChild);
                                    } else {
                                        if (newChild.element.parentNode !== this.container) {
                                            void this.scope(newChild);
                                            void addedChildren.add(newChild);
                                        }
                                        void this.container.insertBefore(newChild.element, this.container.children[i]);
                                        void targetChildren.push(newChild);
                                    }
                                }
                                void Obj.freeze(targetChildren);
                                for (let i = this.container.children.length; i >= sourceChildren.length; --i) {
                                    if (!memory.has(this.container.children[i]))
                                        continue;
                                    void removedChildren.add(proxy(this.container.removeChild(this.container.children[i])));
                                }
                                break;
                            }
                        case ElChildrenType.Record: {
                                const sourceChildren = children;
                                const targetChildren = this.children_;
                                const mem = new WeakSet();
                                for (const name in targetChildren) {
                                    const oldChild = targetChildren[name];
                                    const newChild = sourceChildren[name];
                                    if (!newChild)
                                        continue;
                                    if (mem.has(newChild))
                                        throw new Error(`TypedDOM: Typed DOM children can't repeatedly be used to the same object.`);
                                    void mem.add(newChild);
                                    if (newChild.element.parentNode !== this.container) {
                                        void throwErrorIfNotUsable(newChild);
                                    }
                                    if (oldChild.element !== newChild.element || this.initialChildren.has(oldChild)) {
                                        void this.scope(newChild);
                                        void addedChildren.add(newChild);
                                        void removedChildren.add(oldChild);
                                    }
                                    targetChildren[name] = sourceChildren[name];
                                }
                                break;
                            }
                        }
                        for (const child of removedChildren) {
                            if (this.initialChildren.has(child))
                                continue;
                            void child.element.dispatchEvent(new Event('disconnect', {
                                bubbles: false,
                                cancelable: true
                            }));
                        }
                        for (const child of addedChildren) {
                            void child.element.dispatchEvent(new Event('connect', {
                                bubbles: false,
                                cancelable: true
                            }));
                        }
                        removedChildren.size + addedChildren.size > 0 && void this.element.dispatchEvent(new Event('change', {
                            bubbles: false,
                            cancelable: true
                        }));
                    }
                }
                exports.Elem = Elem;
                function throwErrorIfNotUsable({element}) {
                    if (!element.parentElement || !memory.has(element.parentElement))
                        return;
                    throw new Error(`TypedDOM: Typed DOM children can't be used to another typed DOM.`);
                }
            }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
        },
        {
            '../util/dom': 94,
            './identity': 92
        }
    ],
    94: [
        function (_dereq_, module, exports) {
            (function (global) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: true });
                const {document} = global;
                const shadows = new WeakMap();
                var cache;
                (function (cache) {
                    cache.elem = new Map();
                    cache.text = document.createTextNode('');
                    cache.frag = document.createDocumentFragment();
                }(cache || (cache = {})));
                function frag(children = []) {
                    children = typeof children === 'string' ? [text(children)] : children;
                    const frag = cache.frag.cloneNode();
                    void frag.append(...children);
                    return frag;
                }
                exports.frag = frag;
                function shadow(el, children, opts) {
                    if (typeof el === 'string')
                        return shadow(html(el), children, opts);
                    if (children && !isChildren(children))
                        return shadow(el, undefined, children);
                    if (el.shadowRoot || shadows.has(el)) {
                        return define(opts ? opts.mode === 'open' ? el.shadowRoot || el.attachShadow(opts) : shadows.get(el) || shadows.set(el, el.attachShadow(opts)).get(el) : el.shadowRoot || shadows.get(el), children);
                    } else {
                        return define(!opts || opts.mode === 'open' ? el.attachShadow({ mode: 'open' }) : shadows.set(el, el.attachShadow(opts)).get(el), children === undefined ? el.childNodes : children);
                    }
                }
                exports.shadow = shadow;
                function html(tag, attrs = {}, children = []) {
                    return element(0, tag, attrs, children);
                }
                exports.html = html;
                function svg(tag, attrs = {}, children = []) {
                    return element(1, tag, attrs, children);
                }
                exports.svg = svg;
                function text(source) {
                    const text = cache.text.cloneNode();
                    text.data = source;
                    return text;
                }
                exports.text = text;
                var NS;
                (function (NS) {
                    NS[NS['HTML'] = 0] = 'HTML';
                    NS[NS['SVG'] = 1] = 'SVG';
                }(NS || (NS = {})));
                function element(ns, tag, attrs = {}, children = []) {
                    const key = `${ ns }:${ tag }`;
                    const el = tag.includes('-') ? elem(ns, tag) : cache.elem.has(key) ? cache.elem.get(key).cloneNode(true) : cache.elem.set(key, elem(ns, tag)).get(key).cloneNode(true);
                    void define(el, attrs, children);
                    return el;
                }
                function elem(ns, tag) {
                    switch (ns) {
                    case 0:
                        return document.createElement(tag);
                    case 1:
                        return document.createElementNS('http://www.w3.org/2000/svg', tag);
                    }
                }
                function define(el, attrs = {}, children) {
                    if (isChildren(attrs))
                        return define(el, undefined, attrs);
                    if (typeof children === 'string')
                        return define(el, attrs, [text(children)]);
                    for (const name in attrs) {
                        if (!attrs.hasOwnProperty(name))
                            continue;
                        const value = attrs[name];
                        switch (typeof value) {
                        case 'string':
                            void el.setAttribute(name, value);
                            break;
                        case 'function':
                            void el.addEventListener(name.slice(2), value, {
                                passive: [
                                    'wheel',
                                    'mousewheel',
                                    'touchstart',
                                    'touchmove'
                                ].includes(name.slice(2))
                            });
                            break;
                        case 'object':
                            void el.removeAttribute(name);
                            break;
                        default:
                            break;
                        }
                    }
                    if (children) {
                        el.innerHTML = '';
                        while (el.firstChild) {
                            void el.removeChild(el.firstChild);
                        }
                        void el.append(...children);
                    }
                    return el;
                }
                exports.define = define;
                function isChildren(o) {
                    return !!o[Symbol.iterator];
                }
            }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
        },
        {}
    ],
    95: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const noop_1 = _dereq_('./noop');
            const promise_1 = _dereq_('spica/promise');
            exports.currentTargets = new WeakMap();
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
                    void exports.currentTargets.set(ev, ev.currentTarget);
                    return listener(ev);
                }
            }
            exports.bind = bind;
        },
        {
            './noop': 96,
            'spica/promise': 79
        }
    ],
    96: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function noop() {
                return;
            }
            exports.noop = noop;
        },
        {}
    ],
    97: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const dom_1 = _dereq_('./dom');
            function apply(node, selector, attrs) {
                const ns = node.querySelectorAll(selector);
                for (const n of ns) {
                    void dom_1.define(n, attrs);
                }
                return ns;
            }
            exports.apply = apply;
        },
        { './dom': 94 }
    ],
    98: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var gui_1 = _dereq_('./layer/interface/service/gui');
            exports.default = gui_1.GUI;
            var gui_2 = _dereq_('./layer/interface/service/gui');
            exports.Pjax = gui_2.GUI;
            var router_1 = _dereq_('./lib/router');
            exports.router = router_1.router;
        },
        {
            './layer/interface/service/gui': 127,
            './lib/router': 137
        }
    ],
    99: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const api_1 = _dereq_('../domain/router/api');
            var router_1 = _dereq_('../domain/event/router');
            exports.RouterEvent = router_1.RouterEvent;
            exports.RouterEventType = router_1.RouterEventType;
            exports.RouterEventSource = router_1.RouterEventSource;
            var config_1 = _dereq_('../domain/data/config');
            exports.Config = config_1.Config;
            exports.scope = config_1.scope;
            function route(config, event, state, io) {
                return api_1.route(new api_1.RouterEntity(config, event, new api_1.RouterEntityState(state.process, state.scripts)), io);
            }
            exports.route = route;
        },
        {
            '../domain/data/config': 102,
            '../domain/event/router': 104,
            '../domain/router/api': 105
        }
    ],
    100: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var path_1 = _dereq_('../domain/store/path');
            exports.loadTitle = path_1.loadTitle;
            exports.savePosition = path_1.savePosition;
        },
        { '../domain/store/path': 121 }
    ],
    101: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { 'spica/assign': 4 }
    ],
    102: [
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
            const assign_1 = _dereq_('spica/assign');
            var scope_1 = _dereq_('./config/scope');
            exports.scope = scope_1.scope;
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
            './config/scope': 103,
            'spica/assign': 4
        }
    ],
    103: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../../lib/router': 137,
            '../../../domain/data/config': 102,
            'spica/assign': 4,
            'spica/maybe': 19,
            'spica/sequence': 80
        }
    ],
    104: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const dom_1 = _dereq_('../../../lib/dom');
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            class RouterEvent {
                constructor(original) {
                    this.original = original;
                    this.type = this.original.type.toLowerCase();
                    this.source = typed_dom_1.currentTargets.get(this.original);
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
            '../../../lib/dom': 134,
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    105: [
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
            const fetch_1 = _dereq_('./module/fetch');
            const update_1 = _dereq_('./module/update');
            const content_1 = _dereq_('./module/update/content');
            const path_1 = _dereq_('../store/path');
            const either_1 = _dereq_('spica/either');
            var entity_1 = _dereq_('./model/eav/entity');
            exports.RouterEntity = entity_1.RouterEntity;
            exports.RouterEntityState = entity_1.RouterEntityState;
            function route(entity, io) {
                return __awaiter(this, void 0, void 0, function* () {
                    return either_1.Right(undefined).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? either_1.Right(undefined) : either_1.Left(new Error(`Failed to match areas.`))).fmap(() => fetch_1.fetch(entity.event.request, entity.config, entity.state.process)).fmap(p => __awaiter(this, void 0, void 0, function* () {
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
            '../store/path': 121,
            './model/eav/entity': 106,
            './module/fetch': 108,
            './module/update': 110,
            './module/update/content': 112,
            'spica/either': 12
        }
    ],
    106: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    107: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../../../../lib/html': 136,
            'spica/url': 87
        }
    ],
    108: [
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
            const xhr_1 = _dereq_('../module/fetch/xhr');
            const clock_1 = _dereq_('spica/clock');
            function fetch({method, url, body}, {
                fetch: {rewrite, cache, headers, timeout, wait},
                sequence
            }, process) {
                return __awaiter(this, void 0, void 0, function* () {
                    void window.dispatchEvent(new Event('pjax:fetch'));
                    const [seq, res] = yield Promise.all([
                        sequence.fetch(undefined, {
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
            '../module/fetch/xhr': 109,
            'spica/clock': 8
        }
    ],
    109: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                const key = method === 'GET' ? cache(requestURL.path, headers) || undefined : undefined;
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
            '../../model/eav/value/fetch': 107,
            'spica/cache': 5,
            'spica/either': 12,
            'spica/promise': 79,
            'spica/sequence': 80,
            'spica/url': 87
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
                ]).extract(() => either_1.Left(new Error(`Failed to separate the areas.`)), process.either)))).then(process.promise).then(m => m.fmap(([seqB, areas]) => hlist_1.HNil.extend(() => (void blur_1.blur(documents.dst), void url_1.url(new router_1.RouterEventLocation(response.url), documents.src.title, event.type, event.source, config.replace), void title_1.title(documents), void path_1.saveTitle(), void head_1.head(documents, config.update.head, config.update.ignore), process.either(content_1.content(documents, areas)).fmap(([as, ps]) => [
                    as,
                    promise_1.AtomicPromise.all(ps)
                ]))).extend(p => __awaiter(this, void 0, void 0, function* () {
                    return (yield p).fmap(([areas]) => __awaiter(this, void 0, void 0, function* () {
                        config.update.css ? void css_1.css(documents, config.update.ignore) : undefined;
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
                    ]))).extract(e => promise_1.AtomicPromise.resolve(either_1.Left(e)));
                })).reverse())).then(process.promise).then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([
                    p1,
                    p2
                ]).then(([m1, m2]) => m1.bind(([, cp]) => m2.fmap(([[, sp], seqD]) => void promise_1.AtomicPromise.all([
                    cp,
                    sp
                ]).then(process.either).then(m => m.fmap(([events]) => (void window.dispatchEvent(new Event('pjax:load')), void config.sequence.load(seqD, events))).extract(() => undefined)))).extract(() => undefined)), p2))).then(m => either_1.Either.sequence(m).then(m => m.join())).then(m => m.fmap(([sst]) => sst));
            }
            exports.update = update;
        },
        {
            '../../event/router': 104,
            '../../store/path': 121,
            '../module/update/blur': 111,
            '../module/update/content': 112,
            '../module/update/css': 113,
            '../module/update/focus': 114,
            '../module/update/head': 115,
            '../module/update/script': 116,
            '../module/update/scroll': 117,
            '../module/update/title': 119,
            '../module/update/url': 120,
            'spica/either': 12,
            'spica/hlist': 18,
            'spica/promise': 79
        }
    ],
    111: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    112: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                        const unescape = [...typed_dom_1.apply(area.src, 'script')].map(script_1.escape).reduce((f, g) => () => (void f(), void g()), () => undefined);
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
            './script': 116,
            'spica/concat': 10,
            'spica/maybe': 19,
            'spica/promise': 79,
            'typed-dom': 90
        }
    ],
    113: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            './sync': 118,
            'typed-dom': 90
        }
    ],
    114: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../event/router': 104,
            'typed-dom': 90
        }
    ],
    115: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            './sync': 118,
            'typed-dom': 90
        }
    ],
    116: [
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
                return () => (script.text = ' ', script.text = code, typeof src === 'string' ? void script.setAttribute('src', src) : undefined);
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
            '../../../../../lib/error': 135,
            'spica/clock': 8,
            'spica/concat': 10,
            'spica/either': 12,
            'spica/promise': 79,
            'spica/tuple': 84,
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    117: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
        { '../../../event/router': 104 }
    ],
    118: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const either_1 = _dereq_('spica/either');
            const concat_1 = _dereq_('spica/concat');
            function sync(pairs, fallback, io = {
                before,
                remove
            }) {
                return void pairs.forEach(([srcs, dst]) => (void io.before(parent(dst), srcs.slice(-1).some(src => !!dst && src.outerHTML === dst.outerHTML) ? srcs.slice(0, -1) : srcs, dst), dst && srcs.length === 0 ? void io.remove(dst) : undefined));
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
            'spica/concat': 10,
            'spica/either': 12
        }
    ],
    119: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function title(documents) {
                documents.dst.title = documents.src.title;
            }
            exports.title = title;
        },
        {}
    ],
    120: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../event/router': 104,
            'typed-dom': 90
        }
    ],
    121: [
        function (_dereq_, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(_dereq_('../../data/store/state'));
        },
        { '../../data/store/state': 101 }
    ],
    122: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const typed_dom_1 = _dereq_('typed-dom');
            class ClickView {
                constructor(document, selector, listener) {
                    this.sv = new class extends supervisor_legacy_1.Supervisor {
                    }();
                    this.close = () => void this.sv.terminate();
                    void this.sv.register('', () => new promise_1.AtomicPromise(() => void this.sv.events.exit.monitor([], typed_dom_1.delegate(document, selector, 'click', ev => {
                        if (!(ev.currentTarget instanceof HTMLAnchorElement))
                            return;
                        if (typeof ev.currentTarget.href !== 'string')
                            return;
                        void listener(ev);
                    }))), undefined);
                    void this.sv.cast('', undefined);
                }
            }
            exports.ClickView = ClickView;
        },
        {
            'spica/promise': 79,
            'spica/supervisor.legacy': 82,
            'typed-dom': 90
        }
    ],
    123: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('../../service/state/url');
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const url_2 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            class NavigationView {
                constructor(window, listener) {
                    this.sv = new class extends supervisor_legacy_1.Supervisor {
                    }();
                    this.close = () => void this.sv.terminate();
                    void this.sv.register('', () => new promise_1.AtomicPromise(() => void this.sv.events.exit.monitor([], typed_dom_1.bind(window, 'popstate', ev => {
                        if (url_2.standardize(window.location.href) === url_1.docurl.href)
                            return;
                        void listener(ev);
                    }))), undefined);
                    void this.sv.cast('', undefined);
                }
            }
            exports.NavigationView = NavigationView;
        },
        {
            '../../service/state/url': 133,
            'spica/promise': 79,
            'spica/supervisor.legacy': 82,
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    124: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const throttle_1 = _dereq_('spica/throttle');
            const typed_dom_1 = _dereq_('typed-dom');
            class ScrollView {
                constructor(window, listener) {
                    this.sv = new class extends supervisor_legacy_1.Supervisor {
                    }();
                    this.close = () => void this.sv.terminate();
                    void this.sv.register('', () => new promise_1.AtomicPromise(() => void this.sv.events.exit.monitor([], typed_dom_1.bind(window, 'scroll', throttle_1.debounce(100, ev => {
                        void listener(ev);
                    }), { passive: true }))), undefined);
                    void this.sv.cast('', undefined);
                }
            }
            exports.ScrollView = ScrollView;
        },
        {
            'spica/promise': 79,
            'spica/supervisor.legacy': 82,
            'spica/throttle': 83,
            'typed-dom': 90
        }
    ],
    125: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const typed_dom_1 = _dereq_('typed-dom');
            class SubmitView {
                constructor(document, selector, listener) {
                    this.sv = new class extends supervisor_legacy_1.Supervisor {
                    }();
                    this.close = () => void this.sv.terminate();
                    void this.sv.register('', () => new promise_1.AtomicPromise(() => void this.sv.events.exit.monitor([], typed_dom_1.delegate(document, selector, 'submit', ev => {
                        if (!(ev.currentTarget instanceof HTMLFormElement))
                            return;
                        void listener(ev);
                    }))), undefined);
                    void this.sv.cast('', undefined);
                }
            }
            exports.SubmitView = SubmitView;
        },
        {
            'spica/promise': 79,
            'spica/supervisor.legacy': 82,
            'typed-dom': 90
        }
    ],
    126: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../lib/html': 136,
            './router': 128,
            './state/process': 130,
            'spica/assign': 4,
            'typed-dom': 90
        }
    ],
    127: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const api_1 = _dereq_('./api');
            const click_1 = _dereq_('../module/view/click');
            const submit_1 = _dereq_('../module/view/submit');
            const navigation_1 = _dereq_('../module/view/navigation');
            const scroll_1 = _dereq_('../module/view/scroll');
            const router_1 = _dereq_('./router');
            const url_1 = _dereq_('./state/url');
            _dereq_('./state/scroll-restoration');
            const process_1 = _dereq_('./state/process');
            const store_1 = _dereq_('../../application/store');
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const cancellation_1 = _dereq_('spica/cancellation');
            const promise_1 = _dereq_('spica/promise');
            const url_2 = _dereq_('spica/url');
            const view = new class extends supervisor_legacy_1.Supervisor {
            }();
            class GUI extends api_1.API {
                constructor(option, io = {
                    document: window.document,
                    router: router_1.route
                }) {
                    super();
                    this.option = option;
                    this.io = io;
                    const config = new router_1.Config(this.option);
                    void view.register('', {
                        init: s => s,
                        main: (_, s) => new promise_1.AtomicPromise(() => {
                            void s.register(new click_1.ClickView(this.io.document, config.link, event => void io.router(config, new router_1.RouterEvent(event), process_1.process, io)).close);
                            void s.register(new submit_1.SubmitView(this.io.document, config.form, event => void io.router(config, new router_1.RouterEvent(event), process_1.process, io)).close);
                            void s.register(new navigation_1.NavigationView(window, event => void io.router(config, new router_1.RouterEvent(event), process_1.process, io)).close);
                            void s.register(new scroll_1.ScrollView(window, () => {
                                if (s.canceled)
                                    return;
                                if (new url_2.URL(url_2.standardize(window.location.href)).reference !== url_1.docurl.href)
                                    return;
                                void store_1.savePosition();
                            }).close);
                        }),
                        exit: (_, s) => void s.cancel()
                    }, new cancellation_1.Cancellation(), new Error('Kill'));
                    void view.cast('', undefined);
                }
                assign(url) {
                    return api_1.API.assign(url, this.option, this.io);
                }
                replace(url) {
                    return api_1.API.replace(url, this.option, this.io);
                }
            }
            exports.GUI = GUI;
            function clear() {
                void view.kill('');
            }
            exports.clear = clear;
        },
        {
            '../../application/store': 100,
            '../module/view/click': 122,
            '../module/view/navigation': 123,
            '../module/view/scroll': 124,
            '../module/view/submit': 125,
            './api': 126,
            './router': 128,
            './state/process': 130,
            './state/scroll-restoration': 132,
            './state/url': 133,
            'spica/cancellation': 6,
            'spica/promise': 79,
            'spica/supervisor.legacy': 82,
            'spica/url': 87
        }
    ],
    128: [
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
            const router_1 = _dereq_('../../application/router');
            exports.Config = router_1.Config;
            exports.RouterEvent = router_1.RouterEvent;
            exports.RouterEventSource = router_1.RouterEventSource;
            const url_1 = _dereq_('./state/url');
            const env_1 = _dereq_('../service/state/env');
            const error_1 = _dereq_('../../../lib/error');
            const store_1 = _dereq_('../../application/store');
            const url_2 = _dereq_('spica/url');
            const cancellation_1 = _dereq_('spica/cancellation');
            const maybe_1 = _dereq_('spica/maybe');
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
                    const kill = process.register('', e => {
                        void kill();
                        void cancellation.cancel(e);
                        return new Promise(() => undefined);
                    }, undefined);
                    const [scripts] = yield env_1.env;
                    window.history.scrollRestoration = 'manual';
                    return router_1.route(config, event, {
                        process: cancellation,
                        scripts
                    }, io).then(m => m.fmap(([ss, p]) => __awaiter(this, void 0, void 0, function* () {
                        return void kill(), void url_1.docurl.sync(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_2.standardize(s.src)).reference)), void (yield p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_2.standardize(s.src)).reference));
                    })).extract()).catch(reason => (void kill(), void url_1.docurl.sync(), window.history.scrollRestoration = 'auto', !cancellation.canceled || reason instanceof error_1.FatalError ? void config.fallback(event.source, reason) : undefined));
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
            '../../../lib/error': 135,
            '../../application/router': 99,
            '../../application/store': 100,
            '../service/state/env': 129,
            './state/url': 133,
            'spica/cancellation': 6,
            'spica/maybe': 19,
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    129: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const script_1 = _dereq_('./script');
            exports.env = Promise.all([
                script_1.scripts,
                new Promise(r => void setTimeout(r))
            ]);
        },
        { './script': 131 }
    ],
    130: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            exports.process = new class extends supervisor_legacy_1.Supervisor {
            }();
        },
        { 'spica/supervisor.legacy': 82 }
    ],
    131: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('spica/url');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.scripts = new Set();
            void typed_dom_1.bind(window, 'pjax:unload', () => void typed_dom_1.apply(document, 'script[src]').forEach(script => void exports.scripts.add(new url_1.URL(url_1.standardize(script.src)).reference)));
        },
        {
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    132: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'unload', () => window.history.scrollRestoration = 'auto', false);
        },
        { 'typed-dom': 90 }
    ],
    133: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            'spica/url': 87,
            'typed-dom': 90
        }
    ],
    134: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    135: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
    136: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                        throw undefined;
                    }
                    return true;
                } catch (_a) {
                    return false;
                }
            }
        },
        {
            'spica/either': 12,
            'spica/maybe': 19,
            'typed-dom': 90
        }
    ],
    137: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            'spica/cache': 5,
            'spica/curry': 11,
            'spica/flip': 15,
            'spica/sequence': 80,
            'spica/url': 87
        }
    ],
    'pjax-api': [
        function (_dereq_, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            Object.defineProperty(exports, '__esModule', { value: true });
            __export(_dereq_('./src/export'));
            var export_1 = _dereq_('./src/export');
            exports.default = export_1.default;
        },
        { './src/export': 98 }
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