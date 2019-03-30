/*! pjax-api v3.28.2 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
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
            const type_1 = _dereq_('./type');
            exports.assign = template((key, target, source) => target[key] = source[key]);
            exports.clone = template((key, target, source) => {
                switch (type_1.type(source[key])) {
                case 'Array':
                    return target[key] = exports.clone([], source[key]);
                case 'Object':
                    return target[key] = type_1.isObject(source[key]) ? exports.clone(source[key] instanceof Object ? {} : Object.create(null), source[key]) : source[key];
                default:
                    return target[key] = source[key];
                }
            });
            exports.extend = template((key, target, source) => {
                switch (type_1.type(source[key])) {
                case 'Array':
                    return target[key] = exports.extend([], source[key]);
                case 'Object':
                    switch (type_1.type(target[key])) {
                    case 'Object':
                        return target[key] = type_1.isObject(source[key]) ? exports.extend(target[key], source[key]) : source[key];
                    default:
                        return target[key] = type_1.isObject(source[key]) ? exports.extend(source[key] instanceof Object ? {} : Object.create(null), source[key]) : source[key];
                    }
                default:
                    return target[key] = source[key];
                }
            });
            function template(strategy) {
                return walk;
                function walk(target, ...sources) {
                    if (target === undefined || target === null) {
                        throw new TypeError(`Spica: assign: Cannot walk on ${ target }.`);
                    }
                    for (const source of sources) {
                        if (source === undefined || source === null) {
                            continue;
                        }
                        for (const key of Object.keys(Object(source))) {
                            const desc = Object.getOwnPropertyDescriptor(Object(source), key);
                            if (desc !== undefined && desc.enumerable) {
                                void strategy(key, Object(target), Object(source));
                            }
                        }
                    }
                    return Object(target);
                }
            }
        },
        { './type': 83 }
    ],
    5: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const assign_1 = _dereq_('./assign');
            const equal_1 = _dereq_('./equal');
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
            './equal': 13
        }
    ],
    6: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const exception_1 = _dereq_('./exception');
            const maybe_1 = _dereq_('./monad/maybe');
            const either_1 = _dereq_('./monad/either');
            class Cancellation extends promise_1.AtomicPromise {
                constructor(cancelees = []) {
                    super(res => resolve = res);
                    this.alive = true;
                    this.canceled_ = false;
                    this.state = new future_1.AtomicFuture();
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
                        this.state.bind(this.reason);
                        void Object.freeze(this.listeners);
                        void Object.freeze(this);
                        for (const listener of this.listeners) {
                            void listener(reason);
                        }
                    };
                    this.close = reason => {
                        if (!this.alive)
                            return;
                        this.alive = false;
                        void this.state.bind(promise_1.AtomicPromise.reject(reason));
                        void Object.freeze(this.listeners);
                        void Object.freeze(this);
                    };
                    this.promise = val => this.canceled_ ? promise_1.AtomicPromise.reject(this.reason) : promise_1.AtomicPromise.resolve(val);
                    this.maybe = val => maybe_1.Just(val).bind(val => this.canceled_ ? maybe_1.Nothing : maybe_1.Just(val));
                    this.either = val => either_1.Right(val).bind(val => this.canceled_ ? either_1.Left(this.reason) : either_1.Right(val));
                    var resolve;
                    void resolve(this.state);
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
            './future': 16,
            './monad/either': 21,
            './monad/maybe': 25,
            './promise': 77
        }
    ],
    7: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const exception_1 = _dereq_('./exception');
            let queue = [];
            let register = new WeakSet();
            function tick(cb, dedup = false) {
                if (dedup) {
                    if (register.has(cb))
                        return;
                    void register.add(cb);
                }
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
                    } catch (reason) {
                        void exception_1.causeAsyncException(reason);
                        continue;
                    }
                    return;
                }
            }
            function flush() {
                const cbs = queue;
                queue = [];
                register = new WeakSet();
                return cbs;
            }
        },
        { './exception': 14 }
    ],
    8: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('./promise');
            var clock_tick_1 = _dereq_('./clock.tick');
            exports.tick = clock_tick_1.tick;
            exports.clock = Promise.resolve();
            function wait(ms) {
                return ms === 0 ? promise_1.AtomicPromise.resolve(exports.clock) : new promise_1.AtomicPromise(resolve => void setTimeout(resolve, ms));
            }
            exports.wait = wait;
        },
        {
            './clock.tick': 7,
            './promise': 77
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
                target.push(...source);
                return target;
            }
            exports.concat = concat;
        },
        {}
    ],
    11: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.curry = f => f.length === 0 ? f : apply(f, []);
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
        { './monad/either': 21 }
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
                void new Promise((_, reject) => void reject(reason));
            }
            exports.causeAsyncException = causeAsyncException;
            function stringify(target) {
                try {
                    return target instanceof Error && typeof target.stack === 'string' ? target.stack : target !== undefined && target !== null && typeof target.toString === 'function' ? target + '' : Object.prototype.toString.call(target);
                } catch (reason) {
                    return stringify(reason);
                }
            }
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
        { './promise': 77 }
    ],
    17: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const concat_1 = _dereq_('./concat');
            class HNil {
                constructor() {
                    void this.NIL;
                }
                push(a) {
                    return new HCons(a, this);
                }
                extend(f) {
                    return this.push(f());
                }
                array() {
                    return [];
                }
            }
            exports.HNil = HNil;
            class HCons {
                constructor(head, tail) {
                    this.head = head;
                    this.tail = tail;
                    void this.CONS;
                }
                push(b) {
                    return new HCons(b, this);
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
                    return this.array().reduce((l, e) => l.push(e), new HNil());
                }
                tuple() {
                    return this.array();
                }
                array() {
                    return concat_1.concat([this.head], this.tail.array());
                }
            }
        },
        { './concat': 10 }
    ],
    18: [
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
        { './monad/maybe': 25 }
    ],
    19: [
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
            './functor': 22
        }
    ],
    20: [
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
            '../promise': 77,
            './monad': 26
        }
    ],
    21: [
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
        { './either.impl': 20 }
    ],
    22: [
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
        { './lazy': 23 }
    ],
    23: [
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
    24: [
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
            '../promise': 77,
            './monadplus': 27
        }
    ],
    25: [
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
        { './maybe.impl': 24 }
    ],
    26: [
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
        { './applicative': 19 }
    ],
    27: [
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
        { './monad': 26 }
    ],
    28: [
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
            './sequence/core': 29,
            './sequence/member/instance/ap': 30,
            './sequence/member/instance/bind': 31,
            './sequence/member/instance/drop': 32,
            './sequence/member/instance/dropUntil': 33,
            './sequence/member/instance/dropWhile': 34,
            './sequence/member/instance/extract': 35,
            './sequence/member/instance/filter': 36,
            './sequence/member/instance/filterM': 37,
            './sequence/member/instance/fmap': 38,
            './sequence/member/instance/foldr': 39,
            './sequence/member/instance/group': 40,
            './sequence/member/instance/inits': 41,
            './sequence/member/instance/iterate': 42,
            './sequence/member/instance/join': 43,
            './sequence/member/instance/map': 44,
            './sequence/member/instance/mapM': 45,
            './sequence/member/instance/memoize': 46,
            './sequence/member/instance/permutations': 47,
            './sequence/member/instance/reduce': 48,
            './sequence/member/instance/scanl': 49,
            './sequence/member/instance/segs': 50,
            './sequence/member/instance/sort': 51,
            './sequence/member/instance/subsequences': 52,
            './sequence/member/instance/tails': 53,
            './sequence/member/instance/take': 54,
            './sequence/member/instance/takeUntil': 55,
            './sequence/member/instance/takeWhile': 56,
            './sequence/member/instance/unique': 57,
            './sequence/member/static/concat': 58,
            './sequence/member/static/cycle': 59,
            './sequence/member/static/difference': 60,
            './sequence/member/static/from': 61,
            './sequence/member/static/intersect': 62,
            './sequence/member/static/mappend': 63,
            './sequence/member/static/mconcat': 64,
            './sequence/member/static/mempty': 65,
            './sequence/member/static/mplus': 66,
            './sequence/member/static/mzero': 67,
            './sequence/member/static/pure': 68,
            './sequence/member/static/random': 69,
            './sequence/member/static/resume': 70,
            './sequence/member/static/return': 71,
            './sequence/member/static/sequence': 72,
            './sequence/member/static/union': 73,
            './sequence/member/static/zip': 74
        }
    ],
    29: [
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
        { '../monadplus': 27 }
    ],
    30: [
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
        { '../../core': 29 }
    ],
    31: [
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
        { '../../core': 29 }
    ],
    32: [
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
        { '../../core': 29 }
    ],
    33: [
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
        { '../../core': 29 }
    ],
    34: [
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
        { '../../core': 29 }
    ],
    35: [
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
            '../../core': 29
        }
    ],
    36: [
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
        { '../../core': 29 }
    ],
    37: [
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
            '../../core': 29
        }
    ],
    38: [
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
        { '../../core': 29 }
    ],
    39: [
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
        { '../../core': 29 }
    ],
    40: [
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
            '../../core': 29
        }
    ],
    41: [
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
        { '../../core': 29 }
    ],
    42: [
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
        { '../../core': 29 }
    ],
    43: [
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
        { '../../core': 29 }
    ],
    44: [
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
        { '../../core': 29 }
    ],
    45: [
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
            '../../core': 29
        }
    ],
    46: [
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
        { '../../core': 29 }
    ],
    47: [
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
        { '../../core': 29 }
    ],
    48: [
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
        { '../../core': 29 }
    ],
    49: [
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
        { '../../core': 29 }
    ],
    50: [
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
            '../../core': 29
        }
    ],
    51: [
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
        { '../../core': 29 }
    ],
    52: [
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
            '../../core': 29
        }
    ],
    53: [
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
        { '../../core': 29 }
    ],
    54: [
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
        { '../../core': 29 }
    ],
    55: [
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
        { '../../core': 29 }
    ],
    56: [
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
        { '../../core': 29 }
    ],
    57: [
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
        { '../../core': 29 }
    ],
    58: [
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
        { '../../core': 29 }
    ],
    59: [
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
        { '../../core': 29 }
    ],
    60: [
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
        { '../../core': 29 }
    ],
    61: [
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
        { '../../core': 29 }
    ],
    62: [
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
        { '../../core': 29 }
    ],
    63: [
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
        { '../../core': 29 }
    ],
    64: [
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
        { '../../core': 29 }
    ],
    65: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            default_1.mempty = new core_1.Sequence((_, cons) => cons());
            exports.default = default_1;
        },
        { '../../core': 29 }
    ],
    66: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            default_1.mplus = core_1.Sequence.mappend;
            exports.default = default_1;
        },
        { '../../core': 29 }
    ],
    67: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const core_1 = _dereq_('../../core');
            class default_1 extends core_1.Sequence {
            }
            default_1.mzero = core_1.Sequence.mempty;
            exports.default = default_1;
        },
        { '../../core': 29 }
    ],
    68: [
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
        { '../../core': 29 }
    ],
    69: [
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
        { '../../core': 29 }
    ],
    70: [
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
        { '../../core': 29 }
    ],
    71: [
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
        { '../../core': 29 }
    ],
    72: [
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
        { '../../core': 29 }
    ],
    73: [
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
        { '../../core': 29 }
    ],
    74: [
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
        { '../../core': 29 }
    ],
    75: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function noop() {
            }
            exports.noop = noop;
        },
        {}
    ],
    76: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const assign_1 = _dereq_('./assign');
            const concat_1 = _dereq_('./concat');
            const equal_1 = _dereq_('./equal');
            const exception_1 = _dereq_('./exception');
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
                    items = concat_1.concat([], items);
                    while (parent) {
                        items = concat_1.concat(items, parent.items);
                        parent = parent.parent;
                    }
                    return items;
                }
                refsBelow_({childrenNames, children, items}) {
                    items = concat_1.concat([], items);
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
            './exception': 14
        }
    ],
    77: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var _a, _b;
            'use strict';
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
            _a = status, _b = queue;
            exports.AtomicPromise = AtomicPromise;
            function isPromiseLike(value) {
                return !!value && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
            }
        },
        { './concat': 10 }
    ],
    78: [
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
        { './monad/sequence': 28 }
    ],
    79: [
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
    80: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('./promise');
            const future_1 = _dereq_('./future');
            const observation_1 = _dereq_('./observation');
            const assign_1 = _dereq_('./assign');
            const clock_1 = _dereq_('./clock');
            const sqid_1 = _dereq_('./sqid');
            const noop_1 = _dereq_('./noop');
            const exception_1 = _dereq_('./exception');
            class Supervisor extends promise_1.AtomicPromise {
                constructor(opts = {}) {
                    super((resolve, reject) => (cb = [
                        resolve,
                        reject
                    ], state = new future_1.AtomicFuture(), {
                        next: () => new promise_1.AtomicPromise(r => r({
                            value: state,
                            done: true
                        }))
                    }));
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
                    this.scheduler = () => void (void 0, this.settings.scheduler)(this.deliver);
                    this.messages = [];
                    this.deliver = () => {
                        const since = Date.now();
                        for (let i = 0, len = this.messages.length; this.available && i < len; ++i) {
                            if (this.settings.resource - (Date.now() - since) <= 0)
                                return void this.schedule();
                            const [name, param, callback, expiry] = this.messages[i];
                            const names = typeof name === 'string' ? [name] : [...name];
                            const result = names.reduce((result, name) => result ? result : this.workers.has(name) ? this.workers.get(name).call([
                                param,
                                expiry
                            ]) : undefined, undefined);
                            if (result === undefined && Date.now() < expiry)
                                continue;
                            i === 0 ? void this.messages.shift() : void this.messages.splice(i, 1);
                            void --i;
                            void --len;
                            if (result === undefined) {
                                void this.events_.loss.emit([names[0]], [
                                    names[0],
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
                destructor(reason) {
                    this.available = false;
                    for (const [, worker] of this.workers) {
                        void worker.terminate(reason);
                    }
                    void Object.freeze(this.workers);
                    while (this.messages.length > 0) {
                        const [name, param] = this.messages.shift();
                        const names = typeof name === 'string' ? [name] : [...name];
                        void this.events_.loss.emit([names[0]], [
                            names[0],
                            param
                        ]);
                    }
                    void Object.freeze(this.messages);
                    this.alive = false;
                    void this.constructor.instances.delete(this);
                    void Object.freeze(this);
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
                    return this.call_(name === undefined ? new NamePool(this.workers) : name, param, callback, timeout);
                }
                call_(name, param, callback, timeout) {
                    void this.throwErrorIfNotAvailable();
                    if (typeof callback === 'number')
                        return new promise_1.AtomicPromise((resolve, reject) => void this.call_(name, param, (result, err) => err ? reject(err) : resolve(result), timeout));
                    void this.messages.push([
                        name,
                        param,
                        callback,
                        Date.now() + timeout
                    ]);
                    while (this.messages.length > this.settings.size) {
                        const [name, param, callback] = this.messages.shift();
                        const names = typeof name === 'string' ? [name] : [...name];
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
                    void this.schedule();
                    if (timeout <= 0)
                        return;
                    if (timeout === Infinity)
                        return;
                    void setTimeout(() => void this.schedule(), timeout + 3);
                }
                cast(name, param, timeout = this.settings.timeout) {
                    const result = this.cast_(name === undefined ? new NamePool(this.workers) : name, param, timeout);
                    if (result === undefined)
                        return false;
                    void result.catch(noop_1.noop);
                    return true;
                }
                cast_(name, param, timeout) {
                    void this.throwErrorIfNotAvailable();
                    const names = typeof name === 'string' ? [name] : [...name];
                    const result = names.reduce((result, name) => result ? result : this.workers.has(name) ? this.workers.get(name).call([
                        param,
                        Date.now() + timeout
                    ]) : undefined, undefined);
                    if (result === undefined) {
                        void this.events_.loss.emit([names[0]], [
                            names[0],
                            param
                        ]);
                    }
                    return result;
                }
                refs(name) {
                    void this.throwErrorIfNotAvailable();
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
                terminate(reason) {
                    if (!this.available)
                        return false;
                    void this.destructor(reason);
                    return true;
                }
                schedule() {
                    if (this.messages.length === 0)
                        return;
                    void clock_1.tick(this.scheduler, true);
                }
            }
            Supervisor.standalone = new WeakSet();
            exports.Supervisor = Supervisor;
            class NamePool {
                constructor(workers) {
                    this.workers = workers;
                }
                [Symbol.iterator]() {
                    return this.workers.size === 0 ? [''][Symbol.iterator]() : this.workers.keys();
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
                    void Object.freeze(this);
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
                        if (!this.alive)
                            return reply;
                        void this.sv.schedule();
                        this.state = state;
                        this.available = true;
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
            './noop': 75,
            './observation': 76,
            './promise': 77,
            './sqid': 79
        }
    ],
    81: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                        }, delay);
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
        {}
    ],
    82: [
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
    83: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function type(target) {
                const type = Object.prototype.toString.call(target).split(' ').pop().slice(0, -1);
                if (target === null || typeof target !== 'object' && target instanceof Object === false)
                    return type.toLowerCase();
                return type;
            }
            exports.type = type;
            function isObject(target) {
                return target !== null && (typeof target === 'object' || target instanceof Object);
            }
            exports.isObject = isObject;
        },
        {}
    ],
    84: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            exports.uncurry = f => xs => f(...xs);
        },
        {}
    ],
    85: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const FORMAT_V4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            function uuid() {
                let acc = '';
                for (let i = 0; i < FORMAT_V4.length; ++i) {
                    const c = FORMAT_V4[i];
                    if (c === 'x' || c === 'y') {
                        const r = Math.random() * 16 | 0;
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
    86: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            exports.delegate = listener_1.delegate;
            exports.bind = listener_1.bind;
            exports.currentTargets = listener_1.currentTargets;
        },
        {
            './src/dom/builder': 87,
            './src/dom/proxy': 89,
            './src/util/dom': 90,
            './src/util/listener': 91
        }
    ],
    87: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const proxy_1 = _dereq_('./proxy');
            const dom_1 = _dereq_('../util/dom');
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
                        return node instanceof Element ? new proxy_1.Elem(node, children) : new proxy_1.Elem(node.host, children, node);
                    };
                    function isChildren(children) {
                        return typeof children !== 'object' || Object.values(children).slice(-1).every(val => typeof val === 'object');
                    }
                    function elem(factory, attrs, children) {
                        const el = factory(baseFactory, tag, attrs, children);
                        if (tag !== el.tagName.toLowerCase())
                            throw new Error(`TypedDOM: Tag name must be "${ tag }", but got "${ el.tagName.toLowerCase() }".`);
                        if (factory !== defaultFactory) {
                            for (const [k, v] of Object.entries(attrs)) {
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
        },
        {
            '../util/dom': 90,
            './proxy': 89
        }
    ],
    88: [
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
            'spica/sqid': 79,
            'spica/uuid': 85
        }
    ],
    89: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const identity_1 = _dereq_('./identity');
            const dom_1 = _dereq_('../util/dom');
            var ElChildrenType;
            (function (ElChildrenType) {
                ElChildrenType.Void = 'void';
                ElChildrenType.Text = 'text';
                ElChildrenType.Collection = 'collection';
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
                    this.type = this.children_ === undefined ? ElChildrenType.Void : typeof this.children_ === 'string' ? ElChildrenType.Text : Array.isArray(this.children_) ? ElChildrenType.Collection : ElChildrenType.Record;
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
                    case ElChildrenType.Collection:
                        this.initialChildren = new WeakSet(children_);
                        void dom_1.define(this.container, []);
                        this.children_ = [];
                        this.children = children_;
                        return;
                    case ElChildrenType.Record:
                        this.initialChildren = new WeakSet(Object.values(children_));
                        void dom_1.define(this.container, []);
                        this.children_ = observe(this.container, Object.assign({}, children_));
                        this.children = children_;
                        return;
                    default:
                        throw new Error(`TypedDOM: Undefined type children.`);
                    }
                    function observe(node, children) {
                        return Object.defineProperties(children, Object.entries(children).reduce((descs, [name, child]) => {
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
                            return descs;
                        }, {}));
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
                    if (!(child.element instanceof HTMLStyleElement))
                        return;
                    const syntax = /^(\s*)\$scope(?!\w)/gm;
                    const style = child.element;
                    const query = this.query;
                    if (style.innerHTML.search(syntax) === -1)
                        return;
                    style.innerHTML = style.innerHTML.replace(syntax, (_, indent) => `${ indent }${ query }`);
                    switch (query[0]) {
                    case '.': {
                            const id = query.slice(1);
                            if (!(style.getAttribute('class') || '').split(' ').includes(id))
                                break;
                            void style.setAttribute('class', `${ style.getAttribute('class') } ${ id }`.trim());
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
                        this.children_ = this.children_.parentNode === this.container ? this.children_ : [...this.container.childNodes].find(node => node instanceof Text) || this.children_.cloneNode();
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
                    case ElChildrenType.Collection: {
                            const sourceChildren = children;
                            const targetChildren = [];
                            this.children_ = targetChildren;
                            for (let i = 0; i < sourceChildren.length; ++i) {
                                const newChild = sourceChildren[i];
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
                            void Object.freeze(targetChildren);
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
                            const log = new WeakSet();
                            for (const name in targetChildren) {
                                const oldChild = targetChildren[name];
                                const newChild = sourceChildren[name];
                                if (!newChild)
                                    continue;
                                if (newChild.element.parentNode !== this.container) {
                                    void throwErrorIfNotUsable(newChild);
                                }
                                if (log.has(newChild))
                                    throw new Error(`TypedDOM: Cannot use an element again used in the same record.`);
                                void log.add(newChild);
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
                throw new Error(`TypedDOM: Cannot add an element used in another typed dom.`);
            }
        },
        {
            '../util/dom': 90,
            './identity': 88
        }
    ],
    90: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
                void Object.entries(attrs).forEach(([name, value]) => {
                    switch (typeof value) {
                    case 'string':
                        return void el.setAttribute(name, value);
                    case 'function':
                        return void el.addEventListener(name.slice(2), value, {
                            passive: [
                                'wheel',
                                'mousewheel',
                                'touchstart',
                                'touchmove'
                            ].includes(name.slice(2))
                        });
                    case 'object':
                        return void el.removeAttribute(name);
                    default:
                        return;
                    }
                });
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
        },
        {}
    ],
    91: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const noop_1 = _dereq_('./noop');
            exports.currentTargets = new WeakMap();
            function listen(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, d) : bind(target, a, b, c);
            }
            exports.listen = listen;
            function once(target, a, b, c = false, d = {}) {
                return typeof b === 'string' ? delegate(target, a, b, c, Object.assign({}, typeof d === 'boolean' ? { capture: d } : d, { once: true })) : bind(target, a, b, Object.assign({}, typeof c === 'boolean' ? { capture: c } : c, { once: true }));
            }
            exports.once = once;
            function delegate(target, selector, type, listener, option = {}) {
                return bind(target instanceof Document ? target.documentElement : target, type, ev => {
                    const cx = (ev.target.shadowRoot && ev.composedPath()[0] || ev.target).closest(selector);
                    if (cx instanceof Element) {
                        void once(cx, type, listener, option);
                    }
                    return ev.returnValue;
                }, Object.assign({}, option, { capture: true }));
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
        { './noop': 92 }
    ],
    92: [
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
    93: [
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
            './layer/interface/service/gui': 125,
            './lib/router': 135
        }
    ],
    94: [
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
            '../domain/data/config': 98,
            '../domain/event/router': 101,
            '../domain/router/api': 102
        }
    ],
    95: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var path_1 = _dereq_('../domain/store/path');
            exports.loadTitle = path_1.loadTitle;
            exports.savePosition = path_1.savePosition;
        },
        { '../domain/store/path': 118 }
    ],
    96: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            var Identifier;
            (function (Identifier) {
            }(Identifier || (Identifier = {})));
            function standardizeUrl(url) {
                return encode(normalize(url));
            }
            exports.standardizeUrl = standardizeUrl;
            function encode(url) {
                return url.trim().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '').replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, encodeURI).replace(/\?[^#]+/, query => '?' + query.slice(1).replace(/%[0-9A-F]{2}|[^=&]/ig, str => str.length < 3 ? encodeURIComponent(str) : str)).replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')));
            }
            exports._encode = encode;
            const parser = document.createElement('a');
            function normalize(url) {
                parser.href = url || location.href;
                return parser.href.replace(/^([^:/?#]+:\/\/[^/?#]*?):(?:80)?(?=$|[/?#])/, '$1').replace(/^([^:/?#]+:\/\/[^/?#]*)\/?/, '$1/').replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')));
            }
        },
        {}
    ],
    97: [
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
    98: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
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
            './config/scope': 99,
            'spica/assign': 4
        }
    ],
    99: [
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
            '../../../../lib/router': 135,
            '../../../domain/data/config': 98,
            'spica/assign': 4,
            'spica/maybe': 18,
            'spica/sequence': 78
        }
    ],
    100: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const error_1 = _dereq_('../../../lib/error');
            class DomainError extends error_1.PjaxError {
                constructor(msg) {
                    super(`Domain: ${ msg }`);
                }
            }
            exports.DomainError = DomainError;
        },
        { '../../../lib/error': 133 }
    ],
    101: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('../../../lib/url');
            const url_2 = _dereq_('../../data/model/domain/url');
            const dom_1 = _dereq_('../../../lib/dom');
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
                            return new url_1.URL(url_2.standardizeUrl(this.source.href)).href;
                        }
                        if (this.source instanceof RouterEventSource.Form) {
                            return this.source.method.toUpperCase() === RouterEventMethod.GET ? new url_1.URL(url_2.standardizeUrl(this.source.action.split(/[?#]/)[0] + `?${ dom_1.serialize(this.source) }`)).href : new url_1.URL(url_2.standardizeUrl(this.source.action.split(/[?#]/)[0])).href;
                        }
                        if (this.source instanceof RouterEventSource.Window) {
                            return new url_1.URL(url_2.standardizeUrl(window.location.href)).href;
                        }
                        throw new TypeError();
                    })();
                    this.body = (() => this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST ? new FormData(this.source) : null)();
                    void Object.freeze(this);
                }
            }
            exports.RouterEventRequest = RouterEventRequest;
            class RouterEventLocation {
                constructor(target) {
                    this.target = target;
                    this.orig = new url_1.URL(url_2.standardizeUrl(window.location.href));
                    this.dest = new url_1.URL(this.target);
                    void Object.freeze(this);
                }
            }
            exports.RouterEventLocation = RouterEventLocation;
        },
        {
            '../../../lib/dom': 132,
            '../../../lib/url': 136,
            '../../data/model/domain/url': 96,
            'typed-dom': 86
        }
    ],
    102: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            const either_1 = _dereq_('spica/either');
            const fetch_1 = _dereq_('./module/fetch');
            const update_1 = _dereq_('./module/update');
            const content_1 = _dereq_('./module/update/content');
            const path_1 = _dereq_('../store/path');
            const error_1 = _dereq_('../data/error');
            var entity_1 = _dereq_('./model/eav/entity');
            exports.RouterEntity = entity_1.RouterEntity;
            exports.RouterEntityState = entity_1.RouterEntityState;
            function route(entity, io) {
                return __awaiter(this, void 0, void 0, function* () {
                    return either_1.Right(undefined).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? either_1.Right(undefined) : either_1.Left(new error_1.DomainError(`Failed to match areas.`))).fmap(() => fetch_1.fetch(entity.event.request, entity.config, entity.state.process)).fmap(p => __awaiter(this, void 0, void 0, function* () {
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
            '../data/error': 100,
            '../store/path': 118,
            './model/eav/entity': 103,
            './module/fetch': 105,
            './module/update': 107,
            './module/update/content': 109,
            'spica/either': 12
        }
    ],
    103: [
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
    104: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const html_1 = _dereq_('../../../../../../lib/html');
            class FetchResponse {
                constructor(url, xhr) {
                    this.url = url;
                    this.xhr = xhr;
                    this.header = name => this.xhr.getResponseHeader(name);
                    this.document = html_1.parse(this.xhr.responseText).extract();
                    void Object.freeze(this);
                }
            }
            exports.FetchResponse = FetchResponse;
        },
        { '../../../../../../lib/html': 134 }
    ],
    105: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            const either_1 = _dereq_('spica/either');
            const clock_1 = _dereq_('spica/clock');
            const xhr_1 = _dereq_('../module/fetch/xhr');
            const error_1 = _dereq_('../../data/error');
            const url_1 = _dereq_('../../../../lib/url');
            function fetch({method, url, body}, {
                fetch: {rewrite, cache, headers, timeout, wait},
                sequence
            }, process) {
                return __awaiter(this, void 0, void 0, function* () {
                    const req = xhr_1.xhr(method, url, headers, body, timeout, rewrite, cache, process);
                    void window.dispatchEvent(new Event('pjax:fetch'));
                    const [res, seq] = yield Promise.all([
                        req,
                        sequence.fetch(undefined, {
                            path: new url_1.URL(url).path,
                            method,
                            headers,
                            body
                        }),
                        clock_1.wait(wait)
                    ]);
                    return res.bind(process.either).bind(res => new url_1.URL(res.url).origin === new url_1.URL(url).origin ? either_1.Right([
                        res,
                        seq
                    ]) : either_1.Left(new error_1.DomainError(`Request is redirected to the different domain url ${ new url_1.URL(res.url).href }`)));
                });
            }
            exports.fetch = fetch;
        },
        {
            '../../../../lib/url': 136,
            '../../data/error': 100,
            '../module/fetch/xhr': 106,
            'spica/clock': 8,
            'spica/either': 12
        }
    ],
    106: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('spica/promise');
            const sequence_1 = _dereq_('spica/sequence');
            const either_1 = _dereq_('spica/either');
            const cache_1 = _dereq_('spica/cache');
            const fetch_1 = _dereq_('../../model/eav/value/fetch');
            const url_1 = _dereq_('../../../../data/model/domain/url');
            const error_1 = _dereq_('../../../data/error');
            const url_2 = _dereq_('../../../../../lib/url');
            const memory = new cache_1.Cache(99);
            function xhr(method, url, headers, body, timeout, rewrite, cache, cancellation) {
                void headers.set('Accept', headers.get('Accept') || 'text/html');
                const displayURL = new url_2.URL(url);
                const requestURL = new url_2.URL(url_1.standardizeUrl(rewrite(displayURL.path)));
                const key = method === 'GET' ? cache(requestURL.path, headers) || undefined : undefined;
                if (key && memory.has(key))
                    return promise_1.AtomicPromise.resolve(either_1.Right(memory.get(key)(displayURL, requestURL)));
                const xhr = new XMLHttpRequest();
                return new promise_1.AtomicPromise(resolve => {
                    void xhr.open(method, requestURL.path, true);
                    for (const [name, value] of headers) {
                        void xhr.setRequestHeader(name, value);
                    }
                    xhr.timeout = timeout;
                    void xhr.send(body);
                    void xhr.addEventListener('abort', () => void resolve(either_1.Left(new error_1.DomainError(`Failed to request a page by abort.`))));
                    void xhr.addEventListener('error', () => void resolve(either_1.Left(new error_1.DomainError(`Failed to request a page by error.`))));
                    void xhr.addEventListener('timeout', () => void resolve(either_1.Left(new error_1.DomainError(`Failed to request a page by timeout.`))));
                    void xhr.addEventListener('load', () => void verify(xhr).fmap(xhr => (overriddenDisplayURL, overriddenRequestURL) => new fetch_1.FetchResponse(!xhr.responseURL || url_1.standardizeUrl(xhr.responseURL) === overriddenRequestURL.href ? overriddenDisplayURL.href : overriddenRequestURL.href === requestURL.href || !key ? new url_2.URL(url_1.standardizeUrl(xhr.responseURL)).href : overriddenDisplayURL.href, xhr)).fmap(f => {
                        if (key) {
                            void memory.set(key, f);
                        }
                        return f(displayURL, requestURL);
                    }).extract(err => void resolve(either_1.Left(err)), res => void resolve(either_1.Right(res))));
                    void cancellation.register(() => void xhr.abort());
                });
            }
            exports.xhr = xhr;
            function verify(xhr) {
                return either_1.Right(xhr).bind(xhr => /2..|304/.test(`${ xhr.status }`) ? either_1.Right(xhr) : either_1.Left(new error_1.DomainError(`Faild to validate the status of response.`))).bind(xhr => match(xhr.getResponseHeader('Content-Type'), 'text/html') ? either_1.Right(xhr) : either_1.Left(new error_1.DomainError(`Faild to validate the content type of response.`)));
            }
            function match(actualContentType, expectedContentType) {
                return sequence_1.Sequence.intersect(sequence_1.Sequence.from(parse(actualContentType || '').sort()), sequence_1.Sequence.from(parse(expectedContentType).sort()), (a, b) => a.localeCompare(b)).take(1).extract().length > 0;
                function parse(headerValue) {
                    return headerValue.split(';').map(type => type.trim()).filter(type => type.length > 0);
                }
            }
            exports.match_ = match;
        },
        {
            '../../../../../lib/url': 136,
            '../../../../data/model/domain/url': 96,
            '../../../data/error': 100,
            '../../model/eav/value/fetch': 104,
            'spica/cache': 5,
            'spica/either': 12,
            'spica/promise': 77,
            'spica/sequence': 78
        }
    ],
    107: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('spica/promise');
            const either_1 = _dereq_('spica/either');
            const hlist_1 = _dereq_('spica/hlist');
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
            const error_1 = _dereq_('../../data/error');
            function update({event, config, state}, response, seq, io) {
                const {process} = state;
                const documents = {
                    src: response.document,
                    dst: io.document
                };
                return promise_1.AtomicPromise.resolve(seq).then(process.either).then(m => m.bind(() => content_1.separate(documents, config.areas).extract(() => either_1.Left(new error_1.DomainError(`Failed to separate the areas.`)), () => m)).fmap(seqA => (void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seqA, response)))).then(m => either_1.Either.sequence(m)).then(process.promise).then(m => m.bind(seqB => content_1.separate(documents, config.areas).fmap(([area]) => [
                    seqB,
                    area
                ]).extract(() => either_1.Left(new error_1.DomainError(`Failed to separate the areas.`)), process.either)).bind(([seqB, area]) => (void config.update.rewrite(documents.src, area), content_1.separate(documents, config.areas).fmap(([, areas]) => [
                    seqB,
                    areas
                ]).extract(() => either_1.Left(new error_1.DomainError(`Failed to separate the areas.`)), process.either)))).then(process.promise).then(m => m.fmap(([seqB, areas]) => new hlist_1.HNil().extend(() => (void blur_1.blur(documents.dst), void url_1.url(new router_1.RouterEventLocation(response.url), documents.src.title, event.type, event.source, config.replace), void title_1.title(documents), void path_1.saveTitle(), void head_1.head(documents, config.update.head, config.update.ignore), process.either(content_1.content(documents, areas)).fmap(([as, ps]) => [
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
                })).reverse().tuple())).then(process.promise).then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([
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
            '../../data/error': 100,
            '../../event/router': 101,
            '../../store/path': 118,
            '../module/update/blur': 108,
            '../module/update/content': 109,
            '../module/update/css': 110,
            '../module/update/focus': 111,
            '../module/update/head': 112,
            '../module/update/script': 113,
            '../module/update/scroll': 114,
            '../module/update/title': 116,
            '../module/update/url': 117,
            'spica/either': 12,
            'spica/hlist': 17,
            'spica/promise': 77
        }
    ],
    108: [
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
    109: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('spica/promise');
            const maybe_1 = _dereq_('spica/maybe');
            const concat_1 = _dereq_('spica/concat');
            const typed_dom_1 = _dereq_('typed-dom');
            const dom_1 = _dereq_('../../../../../lib/dom');
            const script_1 = _dereq_('./script');
            function content(documents, areas, io = { replace: (src, dst) => void dst.parentNode.replaceChild(src, dst) }) {
                return [
                    areas.map(r => r.dst).reduce(concat_1.concat, []),
                    areas.map(load).reduce(concat_1.concat, [])
                ];
                function load(area) {
                    return area.src.map((_, i) => ({
                        src: documents.dst.importNode(area.src[i].cloneNode(true), true),
                        dst: area.dst[i]
                    })).map(area => (void replace(area), dom_1.find(area.src, 'img, iframe, frame').map(wait))).reduce(concat_1.concat, []);
                    function replace(area) {
                        const unescape = dom_1.find(area.src, 'script').map(script_1.escape).reduce((f, g) => () => (void f(), void g()), () => undefined);
                        void io.replace(area.src, area.dst);
                        void unescape();
                    }
                }
            }
            exports.content = content;
            function separate(documents, areas) {
                return areas.reduce((m, area) => maybe_1.Maybe.mplus(m, sep(documents, area).fmap(as => [
                    area,
                    as
                ])), maybe_1.Nothing);
                function sep(documents, area) {
                    return split(area).map(area => ({
                        src: dom_1.find(documents.src, area),
                        dst: dom_1.find(documents.dst, area)
                    })).reduce((acc, area) => acc.bind(as => pair(area).fmap(a => concat_1.concat(as, [a]))), maybe_1.Just([]));
                    function pair(area) {
                        return maybe_1.Just(area).guard(validate(area));
                        function validate(area) {
                            return area.src.length > 0 && area.src.length === area.dst.length;
                        }
                    }
                }
            }
            exports.separate = separate;
            function split(area) {
                return (area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g) || []).map(a => a.trim());
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
            '../../../../../lib/dom': 132,
            './script': 113,
            'spica/concat': 10,
            'spica/maybe': 18,
            'spica/promise': 77,
            'typed-dom': 86
        }
    ],
    110: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const dom_1 = _dereq_('../../../../../lib/dom');
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
                    return dom_1.find(source, selector).filter(el => !el.matches(ignore.trim() || '_'));
                }
            }
            exports.css = css;
        },
        {
            '../../../../../lib/dom': 132,
            './sync': 115
        }
    ],
    111: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const router_1 = _dereq_('../../../event/router');
            const dom_1 = _dereq_('../../../../../lib/dom');
            function focus(type, document) {
                switch (type) {
                case router_1.RouterEventType.click:
                case router_1.RouterEventType.submit:
                    return void dom_1.find(document, '[autofocus]').slice(-1).filter(el => el.closest('html') === window.document.documentElement && el !== document.activeElement).forEach(el => void el.focus());
                case router_1.RouterEventType.popstate:
                    return;
                default:
                    throw new TypeError(type);
                }
            }
            exports.focus = focus;
        },
        {
            '../../../../../lib/dom': 132,
            '../../../event/router': 101
        }
    ],
    112: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const sync_1 = _dereq_('./sync');
            const dom_1 = _dereq_('../../../../../lib/dom');
            function head(documents, selector, ignore) {
                ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
                return void sync_1.sync(sync_1.pair(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);
                function list(source) {
                    return dom_1.find(source, selector).filter(el => !el.matches(ignore.trim() || '_'));
                }
            }
            exports.head = head;
        },
        {
            '../../../../../lib/dom': 132,
            './sync': 115
        }
    ],
    113: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            const promise_1 = _dereq_('spica/promise');
            const either_1 = _dereq_('spica/either');
            const tuple_1 = _dereq_('spica/tuple');
            const concat_1 = _dereq_('spica/concat');
            const clock_1 = _dereq_('spica/clock');
            const dom_1 = _dereq_('../../../../../lib/dom');
            const error_1 = _dereq_('../../../../../lib/error');
            const url_1 = _dereq_('../../../../../lib/url');
            const url_2 = _dereq_('../../../../data/model/domain/url');
            const typed_dom_1 = _dereq_('typed-dom');
            function script(documents, skip, selector, timeout, cancellation, io = {
                fetch,
                evaluate
            }) {
                const scripts = dom_1.find(documents.src, 'script').filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL(url_2.standardizeUrl(el.src)).href) || el.matches(selector.reload.trim() || '_') : true);
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
                const result = promise_1.AtomicPromise.resolve(wait).then(cancellation.promise).then(evaluate);
                return script.matches('[src][async]') ? either_1.Right(result) : either_1.Left(result);
                function evaluate() {
                    if (script.matches('[type="module"][src]')) {
                        return promise_1.AtomicPromise.resolve(Promise.resolve().then(() => _dereq_(script.src))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (void script.dispatchEvent(new Event('load')), either_1.Right(script)), reason => (void script.dispatchEvent(new Event('error')), either_1.Left(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
                    } else {
                        try {
                            if (new url_1.URL(url_2.standardizeUrl(window.location.href)).path !== new url_1.URL(url_2.standardizeUrl(window.location.href)).path)
                                throw new error_1.FatalError('Expired.');
                            if (skip.has(new url_1.URL(url_2.standardizeUrl(window.location.href)).href))
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
                if (new url_1.URL(url_2.standardizeUrl(script.src)).origin === new url_1.URL(url_2.standardizeUrl(window.location.href)).origin)
                    return promise_1.AtomicPromise.reject(new Error());
                script = typed_dom_1.html('script', Object.values(script.attributes).reduce((o, {name, value}) => (o[name] = value, o), {}), [...script.childNodes]);
                return new promise_1.AtomicPromise((resolve, reject) => (void script.addEventListener('load', () => void resolve()), void script.addEventListener('error', reject), void document.body.appendChild(script), void script.remove()));
            }
        },
        {
            '../../../../../lib/dom': 132,
            '../../../../../lib/error': 133,
            '../../../../../lib/url': 136,
            '../../../../data/model/domain/url': 96,
            'spica/clock': 8,
            'spica/concat': 10,
            'spica/either': 12,
            'spica/promise': 77,
            'spica/tuple': 82,
            'typed-dom': 86
        }
    ],
    114: [
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
        { '../../../event/router': 101 }
    ],
    115: [
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
    116: [
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
    117: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
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
            '../../../event/router': 101,
            'typed-dom': 86
        }
    ],
    118: [
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
        { '../../data/store/state': 97 }
    ],
    119: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const error_1 = _dereq_('../../../lib/error');
            class InterfaceError extends error_1.PjaxError {
                constructor(msg) {
                    super(`Interface: ${ msg }`);
                }
            }
            exports.InterfaceError = InterfaceError;
        },
        { '../../../lib/error': 133 }
    ],
    120: [
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
            'spica/promise': 77,
            'spica/supervisor.legacy': 80,
            'typed-dom': 86
        }
    ],
    121: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const typed_dom_1 = _dereq_('typed-dom');
            const url_1 = _dereq_('../../../data/model/domain/url');
            const url_2 = _dereq_('../../service/state/url');
            class NavigationView {
                constructor(window, listener) {
                    this.sv = new class extends supervisor_legacy_1.Supervisor {
                    }();
                    this.close = () => void this.sv.terminate();
                    void this.sv.register('', () => new promise_1.AtomicPromise(() => void this.sv.events.exit.monitor([], typed_dom_1.bind(window, 'popstate', ev => {
                        if (url_1.standardizeUrl(window.location.href) === url_2.docurl.href)
                            return;
                        void listener(ev);
                    }))), undefined);
                    void this.sv.cast('', undefined);
                }
            }
            exports.NavigationView = NavigationView;
        },
        {
            '../../../data/model/domain/url': 96,
            '../../service/state/url': 131,
            'spica/promise': 77,
            'spica/supervisor.legacy': 80,
            'typed-dom': 86
        }
    ],
    122: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const promise_1 = _dereq_('spica/promise');
            const typed_dom_1 = _dereq_('typed-dom');
            const throttle_1 = _dereq_('spica/throttle');
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
            'spica/promise': 77,
            'spica/supervisor.legacy': 80,
            'spica/throttle': 81,
            'typed-dom': 86
        }
    ],
    123: [
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
            'spica/promise': 77,
            'spica/supervisor.legacy': 80,
            'typed-dom': 86
        }
    ],
    124: [
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
            '../../../lib/html': 134,
            './router': 126,
            './state/process': 128,
            'spica/assign': 4,
            'typed-dom': 86
        }
    ],
    125: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const api_1 = _dereq_('./api');
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            const cancellation_1 = _dereq_('spica/cancellation');
            const promise_1 = _dereq_('spica/promise');
            const url_1 = _dereq_('../../../lib/url');
            const url_2 = _dereq_('../../data/model/domain/url');
            const click_1 = _dereq_('../module/view/click');
            const submit_1 = _dereq_('../module/view/submit');
            const navigation_1 = _dereq_('../module/view/navigation');
            const scroll_1 = _dereq_('../module/view/scroll');
            const router_1 = _dereq_('./router');
            const url_3 = _dereq_('./state/url');
            _dereq_('./state/scroll-restoration');
            const process_1 = _dereq_('./state/process');
            const store_1 = _dereq_('../../application/store');
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
                                if (new url_1.URL(url_2.standardizeUrl(window.location.href)).href !== url_3.docurl.href)
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
            function unregister() {
                void view.kill('');
            }
            exports.unregister = unregister;
        },
        {
            '../../../lib/url': 136,
            '../../application/store': 95,
            '../../data/model/domain/url': 96,
            '../module/view/click': 120,
            '../module/view/navigation': 121,
            '../module/view/scroll': 122,
            '../module/view/submit': 123,
            './api': 124,
            './router': 126,
            './state/process': 128,
            './state/scroll-restoration': 130,
            './state/url': 131,
            'spica/cancellation': 6,
            'spica/promise': 77,
            'spica/supervisor.legacy': 80
        }
    ],
    126: [
        function (_dereq_, module, exports) {
            'use strict';
            var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
                        result.done ? resolve(result.value) : new P(function (resolve) {
                            resolve(result.value);
                        }).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            Object.defineProperty(exports, '__esModule', { value: true });
            const cancellation_1 = _dereq_('spica/cancellation');
            const typed_dom_1 = _dereq_('typed-dom');
            const router_1 = _dereq_('../../application/router');
            exports.Config = router_1.Config;
            exports.RouterEvent = router_1.RouterEvent;
            exports.RouterEventSource = router_1.RouterEventSource;
            const url_1 = _dereq_('./state/url');
            const env_1 = _dereq_('../service/state/env');
            const error_1 = _dereq_('../data/error');
            const url_2 = _dereq_('../../../lib/url');
            const url_3 = _dereq_('../../data/model/domain/url');
            const store_1 = _dereq_('../../application/store');
            const maybe_1 = _dereq_('spica/maybe');
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
                return maybe_1.Just(0).guard(validate(new url_2.URL(event.request.url), config, event)).bind(() => router_1.scope(config, (({orig, dest}) => ({
                    orig: orig.pathname,
                    dest: dest.pathname
                }))(event.location))).fmap(config => __awaiter(this, void 0, void 0, function* () {
                    void event.original.preventDefault();
                    void process.cast('', new error_1.InterfaceError(`Aborted.`));
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
                        return void kill(), void url_1.docurl.sync(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_3.standardizeUrl(s.src)).href)), void (yield p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_2.URL(url_3.standardizeUrl(s.src)).href));
                    })).extract()).catch(reason => (void kill(), void url_1.docurl.sync(), window.history.scrollRestoration = 'auto', !cancellation.canceled || reason instanceof Error && reason.name === 'FatalError' ? void config.fallback(typed_dom_1.currentTargets.get(event.original), reason) : undefined));
                })).extract(() => {
                    switch (event.type) {
                    case router_1.RouterEventType.click:
                    case router_1.RouterEventType.submit:
                        break;
                    case router_1.RouterEventType.popstate:
                        if (!isHashChange(event.location.dest)) {
                            void config.fallback(event.source, new Error(`Disabled.`));
                            return true;
                        }
                        break;
                    }
                    void url_1.docurl.sync();
                    return false;
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
                    return orig.origin === dest.origin && orig.path === dest.path && dest.fragment !== '';
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
                return orig.origin === dest.origin && orig.path === dest.path && orig.fragment !== dest.fragment;
            }
        },
        {
            '../../../lib/url': 136,
            '../../application/router': 94,
            '../../application/store': 95,
            '../../data/model/domain/url': 96,
            '../data/error': 119,
            '../service/state/env': 127,
            './state/url': 131,
            'spica/cancellation': 6,
            'spica/maybe': 18,
            'typed-dom': 86
        }
    ],
    127: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const script_1 = _dereq_('./script');
            exports.env = Promise.all([
                script_1.scripts,
                new Promise(r => void setTimeout(r))
            ]);
        },
        { './script': 129 }
    ],
    128: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const supervisor_legacy_1 = _dereq_('spica/supervisor.legacy');
            exports.process = new class extends supervisor_legacy_1.Supervisor {
            }();
        },
        { 'spica/supervisor.legacy': 80 }
    ],
    129: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('../../../data/model/domain/url');
            const url_2 = _dereq_('../../../../lib/url');
            const dom_1 = _dereq_('../../../../lib/dom');
            const typed_dom_1 = _dereq_('typed-dom');
            exports.scripts = new Set();
            void typed_dom_1.bind(window, 'pjax:unload', () => void dom_1.find(document, 'script[src]').forEach(script => void exports.scripts.add(new url_2.URL(url_1.standardizeUrl(script.src)).href)));
        },
        {
            '../../../../lib/dom': 132,
            '../../../../lib/url': 136,
            '../../../data/model/domain/url': 96,
            'typed-dom': 86
        }
    ],
    130: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'unload', () => window.history.scrollRestoration = 'auto', false);
        },
        { 'typed-dom': 86 }
    ],
    131: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('../../../data/model/domain/url');
            const typed_dom_1 = _dereq_('typed-dom');
            void typed_dom_1.bind(window, 'hashchange', () => void exports.docurl.sync());
            exports.docurl = new class {
                constructor() {
                    this.url = url_1.standardizeUrl(location.href);
                }
                get href() {
                    return this.url;
                }
                sync() {
                    this.url = url_1.standardizeUrl(location.href);
                }
            }();
        },
        {
            '../../../data/model/domain/url': 96,
            'typed-dom': 86
        }
    ],
    132: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            function find(target, selector) {
                return [...target.querySelectorAll(selector || '_')];
            }
            exports.find = find;
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
    133: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            class PjaxError extends Error {
                constructor(msg) {
                    super(`Pjax: ${ msg }`);
                }
            }
            exports.PjaxError = PjaxError;
            class FatalError extends PjaxError {
                constructor(msg) {
                    super(`Pjax: Fatal: ${ msg }`);
                    this.name = 'FatalError';
                }
            }
            exports.FatalError = FatalError;
        },
        {}
    ],
    134: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const maybe_1 = _dereq_('spica/maybe');
            const either_1 = _dereq_('spica/either');
            const dom_1 = _dereq_('./dom');
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
            function fixNoscript(doc) {
                return dom_1.find(doc, 'noscript').filter(el => el.children.length > 0).map(el => {
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
                    case doc.URL && doc.URL.startsWith(`${ window.location.protocol }//${ window.location.host }`):
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
            './dom': 132,
            'spica/either': 12,
            'spica/maybe': 18
        }
    ],
    135: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const url_1 = _dereq_('../layer/data/model/domain/url');
            const url_2 = _dereq_('./url');
            const sequence_1 = _dereq_('spica/sequence');
            const uncurry_1 = _dereq_('spica/uncurry');
            const flip_1 = _dereq_('spica/flip');
            const cache_1 = _dereq_('spica/cache');
            function router(config) {
                return url => {
                    const {path, pathname} = new url_2.URL(url_1.standardizeUrl(url));
                    return sequence_1.Sequence.from(Object.keys(config).filter(([c]) => c === '/').sort().reverse()).filter(flip_1.flip(compare)(pathname)).map(pattern => config[pattern]).take(1).extract().pop().call(config, path);
                };
            }
            exports.router = router;
            function compare(pattern, path) {
                const regSegment = /\/|[^/]+\/?/g;
                const regTrailingSlash = /\/$/;
                return sequence_1.Sequence.zip(sequence_1.Sequence.from(expand(pattern)), sequence_1.Sequence.cycle([path])).map(([pattern, path]) => [
                    pattern.match(regSegment) || [],
                    pattern.match(regTrailingSlash) ? path.match(regSegment) || [] : path.replace(regTrailingSlash, '').match(regSegment) || []
                ]).filter(([ps, ss]) => ps.length <= ss.length && sequence_1.Sequence.zip(sequence_1.Sequence.from(ps), sequence_1.Sequence.from(ss)).dropWhile(uncurry_1.uncurry(match)).take(1).extract().length === 0).take(1).extract().length > 0;
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
                        return s === '/' ? match(ps.join(''), segment) : sequence_1.Sequence.zip(sequence_1.Sequence.cycle([ps.join('')]), sequence_1.Sequence.from(segment).tails().map(ss => ss.join(''))).filter(uncurry_1.uncurry(match)).take(1).extract().length > 0;
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
            '../layer/data/model/domain/url': 96,
            './url': 136,
            'spica/cache': 5,
            'spica/flip': 15,
            'spica/sequence': 78,
            'spica/uncurry': 84
        }
    ],
    136: [
        function (_dereq_, module, exports) {
            'use strict';
            Object.defineProperty(exports, '__esModule', { value: true });
            const IDENTITY = Symbol();
            class URL {
                constructor(url) {
                    this.parser = document.createElement('a');
                    this[IDENTITY];
                    this.parser.href = url || location.href;
                    Object.freeze(this);
                }
                get href() {
                    return this.parser.href;
                }
                get origin() {
                    return `${ this.protocol }//${ this.host }`;
                }
                get domain() {
                    return `${ this.protocol }//${ this.hostname }`;
                }
                get scheme() {
                    return this.parser.protocol.slice(0, -1);
                }
                get protocol() {
                    return this.parser.protocol;
                }
                get userinfo() {
                    return this.parser.href.match(/[^:/?#]+:\/\/([^/?#]*)@|$/).pop() || '';
                }
                get host() {
                    return this.parser.host;
                }
                get hostname() {
                    return this.parser.hostname;
                }
                get port() {
                    return this.parser.port;
                }
                get path() {
                    return `${ this.pathname }${ this.query }`;
                }
                get pathname() {
                    return this.parser.pathname;
                }
                get query() {
                    return this.parser.search;
                }
                get fragment() {
                    return this.parser.href.replace(/^[^#]+/, '');
                }
            }
            exports.URL = URL;
        },
        {}
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
        { './src/export': 93 }
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