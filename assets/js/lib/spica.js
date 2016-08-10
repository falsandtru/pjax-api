/*! spica v0.0.28 https://github.com/falsandtru/spica | (c) 2016, falsandtru | MIT License */
define = typeof define === 'function' && define.amd
  ? define
  : (function () {
    'use strict';
    var name = 'spica',
        workspace = {};
    return function define(m, rs, f) {
      return !f
        ? void define(name, m, rs)
        : void f.apply(this, rs.map(function (r) {
          switch (r) {
            case 'require': {
              return typeof require === 'function' ? require : void 0;
            }
            case 'exports': {
              return m.indexOf('/') === -1
                ? workspace[m] = typeof exports === 'undefined' ? self[m] = self[m] || {} : exports
                : workspace[m] = workspace.hasOwnProperty(m) ? workspace[m] : {};
            }
            default: {
              return r.slice(-2) === '.d' && {}
                  || workspace.hasOwnProperty(r) && workspace[r]
                  || typeof require === 'function' && require(r)
                  || self[r];
            }
          }
        }));
    };
  })();
var __extends = this && this.__extends || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('src/lib/concat', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function concat(target, source) {
        for (var i = 0, len = source.length, offset = target.length; i < len; ++i) {
            target[i + offset] = source[i];
        }
        return target;
    }
    exports.concat = concat;
});
define('src/lib/observable', [
    'require',
    'exports',
    'src/lib/concat'
], function (require, exports, concat_1) {
    'use strict';
    var Observable = function () {
        function Observable() {
            this.node_ = {
                parent: void 0,
                childrenMap: Object.create(null),
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
                    node.childrenMap = Object.create(null);
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
            var results;
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
            var childrenList = _a.childrenList, childrenMap = _a.childrenMap, registers = _a.registers;
            registers = concat_1.concat([], registers);
            for (var i = 0; i < childrenList.length; ++i) {
                var name_1 = childrenList[i];
                var below = this.refsBelow_(childrenMap[name_1]);
                registers = concat_1.concat(registers, below);
                if (below.length === 0) {
                    void delete childrenMap[name_1];
                    void childrenList.splice(childrenList.indexOf(name_1), 1);
                    void --i;
                }
            }
            return registers;
        };
        Observable.prototype.seekNode_ = function (types) {
            var node = this.node_;
            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                var type = types_1[_i];
                var childrenMap = node.childrenMap;
                if (!childrenMap[type + '']) {
                    void node.childrenList.push(type + '');
                    node.childrenList = node.childrenList.sort();
                    childrenMap[type + ''] = {
                        parent: node,
                        childrenMap: Object.create(null),
                        childrenList: [],
                        registers: []
                    };
                }
                node = childrenMap[type + ''];
            }
            return node;
        };
        Observable.prototype.throwTypeErrorIfInvalidSubscriber_ = function (subscriber, types) {
            switch (typeof subscriber) {
            case 'function':
                return;
            default:
                throw new TypeError('Spica: Observable: Invalid subscriber.\n\t' + (types, subscriber));
            }
        };
        return Observable;
    }();
    exports.Observable = Observable;
});
define('src/lib/sqid', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var cnt = 0;
    function sqid(id) {
        return id === void 0 ? (1000000000000000 + ++cnt + '').slice(1) : (1000000000000000 + id + '').slice(1);
    }
    exports.sqid = sqid;
});
define('src/lib/type', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function type(target) {
        return Object.prototype.toString.call(target).split(' ').pop().slice(0, -1);
    }
    exports.type = type;
});
define('src/lib/collection/datamap', [
    'require',
    'exports',
    'src/lib/sqid',
    'src/lib/type'
], function (require, exports, sqid_1, type_1) {
    'use strict';
    function isPrimitive(target) {
        return target instanceof Object === false;
    }
    var DataMap = function () {
        function DataMap() {
            this.store = new Map();
            this.weakstore = new WeakMap();
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
                    return '9:{ ' + (this.weakstore.has(key) ? this.weakstore.get(key) : this.stringifyObject(key) || this.weakstore.set(key, sqid_1.sqid())) + ' }';
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
});
define('src/lib/tick', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var TICK;
    (function (TICK) {
        TICK.queue = enqueue;
        var Queue = [];
        var Reservation = 0;
        function enqueue(fn) {
            void Queue.push(fn);
            void schedule();
        }
        function dequeue() {
            void schedule();
            void --Reservation;
            var task = Queue.length;
            while (task-- > 0) {
                void Queue.shift()();
            }
        }
        var Delays = [
            0,
            4,
            10,
            20,
            25
        ].reverse();
        function schedule() {
            if (Queue.length === 0)
                return;
            while (Reservation < Delays.length) {
                void setTimeout(dequeue, Delays[Reservation % Delays.length]);
                void ++Reservation;
            }
        }
    }(TICK || (TICK = {})));
    var IS_NODE = Function('return typeof process === \'object\' && typeof window !== \'object\'')();
    exports.Tick = IS_NODE ? Function('return fn => process.nextTick(fn)')() : TICK.queue;
});
define('src/lib/thenable', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function isThenable(target) {
        return !!target && typeof target === 'object' && target.then !== void 0;
    }
    exports.isThenable = isThenable;
});
define('src/lib/noop', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    function noop() {
        ;
    }
    exports.noop = noop;
});
define('src/lib/supervisor', [
    'require',
    'exports',
    'src/lib/observable',
    'src/lib/collection/datamap',
    'src/lib/tick',
    'src/lib/thenable',
    'src/lib/concat',
    'src/lib/noop'
], function (require, exports, observable_1, datamap_1, tick_1, thenable_1, concat_2, noop_1) {
    'use strict';
    var Supervisor = function () {
        function Supervisor(_a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? '' : _c, _d = _b.dependencies, dependencies = _d === void 0 ? [] : _d, _e = _b.retry, retry = _e === void 0 ? false : _e, _f = _b.timeout, timeout = _f === void 0 ? 0 : _f, _g = _b.destructor, destructor = _g === void 0 ? noop_1.noop : _g;
            this.deps = new datamap_1.DataMap();
            this.events = {
                exec: new observable_1.Observable(),
                fail: new observable_1.Observable(),
                loss: new observable_1.Observable(),
                exit: new observable_1.Observable()
            };
            this.procs = new observable_1.Observable();
            this.alive = true;
            this.registerable = true;
            this.scheduled = false;
            this.workerSharedResource = {
                procs: this.procs,
                dependenciesStack: []
            };
            this.queue = [];
            if (this.constructor === Supervisor)
                throw new Error('Spica: Supervisor: Cannot instantiate abstract classes.');
            this.name = name;
            void dependencies.reduce(function (_, _a) {
                var namespace = _a[0], deps = _a[1];
                return void _this.deps.set(namespace, deps);
            }, void 0);
            this.retry = retry;
            this.timeout = timeout;
            this.destructor_ = destructor;
            void ++this.constructor.count;
        }
        Supervisor.prototype.destructor = function (reason) {
            void this.checkState();
            this.alive = false;
            while (this.queue.length > 0) {
                var _a = this.queue.shift(), namespace = _a[0], data = _a[1];
                void this.events.loss.emit(namespace, [
                    namespace,
                    void 0,
                    data
                ]);
            }
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
        Supervisor.prototype.register = function (namespace, process) {
            void this.checkState();
            if (!this.registerable)
                throw new Error('Spica: Supervisor: Supervisor ' + this.name + ' cannot register process during the exiting.');
            namespace = concat_2.concat([], namespace);
            void this.schedule();
            return new Worker(this, this.workerSharedResource, namespace, process, this.deps.get(namespace) || []).terminate;
        };
        Supervisor.prototype.call = function (namespace, data, timeout, callback) {
            var _this = this;
            if (timeout === void 0) {
                timeout = this.timeout;
            }
            if (callback === void 0) {
                callback = noop_1.noop;
            }
            void this.checkState();
            namespace = concat_2.concat([], namespace);
            void this.queue.push([
                namespace,
                data,
                function (data, results) {
                    return void callback(results, data);
                },
                timeout,
                Date.now()
            ]);
            void this.schedule();
            if (timeout > 0 === false)
                return;
            void setTimeout(function () {
                return _this.drain(namespace);
            }, timeout);
        };
        Supervisor.prototype.cast = function (namespace, data, retry) {
            if (retry === void 0) {
                retry = this.retry;
            }
            void this.checkState();
            var results = this.procs.reflect(namespace, new WorkerCommand.Call(data));
            if (results.length === 0) {
                void this.events.fail.emit(namespace, [
                    namespace,
                    void 0,
                    data
                ]);
            }
            return results.length > 0 || !retry ? results : this.cast(namespace, data, false);
        };
        Supervisor.prototype.refs = function (namespace) {
            void this.checkState();
            return this.procs.refs(namespace).map(function (_a) {
                var namespace = _a[0], recv = _a[1];
                var worker = recv(void 0);
                return [
                    worker.namespace,
                    worker.process,
                    worker.terminate
                ];
            });
        };
        Supervisor.prototype.terminate = function (namespace, reason) {
            void this.checkState();
            if (namespace === void 0) {
                this.registerable = false;
            }
            void this.procs.emit(namespace || [], new WorkerCommand.Exit(reason));
            void this.procs.off(namespace || []);
            if (namespace === void 0) {
                void this.destructor(reason);
            }
        };
        Supervisor.prototype.checkState = function () {
            if (!this.alive)
                throw new Error('Spica: Supervisor: Supervisor ' + this.name + ' already exited.');
        };
        Supervisor.prototype.drain = function (target) {
            if (target === void 0) {
                target = [];
            }
            var now = Date.now();
            var _loop_1 = function (i) {
                var _a = this_1.queue[i], namespace = _a[0], data = _a[1], callback = _a[2], timeout = _a[3], since = _a[4];
                var results = target.every(function (n, i) {
                    return n === namespace[i];
                }) ? this_1.procs.reflect(namespace, new WorkerCommand.Call(data)) : [];
                if (results.length === 0) {
                    void this_1.events.fail.emit(namespace, [
                        namespace,
                        void 0,
                        data
                    ]);
                }
                if (results.length === 0 && now < since + timeout)
                    return out_i_1 = i, 'continue';
                i === 0 ? void this_1.queue.shift() : void this_1.queue.splice(i, 1);
                void --i;
                if (results.length === 0) {
                    void this_1.events.loss.emit(namespace, [
                        namespace,
                        void 0,
                        data
                    ]);
                }
                if (!callback)
                    return out_i_1 = i, 'continue';
                try {
                    void callback(data, results);
                } catch (err) {
                    void console.error(err);
                }
                out_i_1 = i;
            };
            var out_i_1;
            var this_1 = this;
            for (var i = 0; i < this.queue.length; ++i) {
                var state_1 = _loop_1(i);
                i = out_i_1;
                if (state_1 === 'continue')
                    continue;
            }
        };
        Supervisor.count = 0;
        Supervisor.procs = 0;
        return Supervisor;
    }();
    exports.Supervisor = Supervisor;
    var WorkerCommand;
    (function (WorkerCommand) {
        var AbstractCommand = function () {
            function AbstractCommand() {
            }
            return AbstractCommand;
        }();
        var Deps = function (_super) {
            __extends(Deps, _super);
            function Deps(namespace) {
                _super.call(this);
                this.namespace = namespace;
            }
            return Deps;
        }(AbstractCommand);
        WorkerCommand.Deps = Deps;
        var Call = function (_super) {
            __extends(Call, _super);
            function Call(data) {
                _super.call(this);
                this.data = data;
            }
            return Call;
        }(AbstractCommand);
        WorkerCommand.Call = Call;
        var Exit = function (_super) {
            __extends(Exit, _super);
            function Exit(reason) {
                _super.call(this);
                this.reason = reason;
            }
            return Exit;
        }(AbstractCommand);
        WorkerCommand.Exit = Exit;
    }(WorkerCommand || (WorkerCommand = {})));
    var Worker = function () {
        function Worker(sv, sharedResource, namespace, process, dependencies) {
            var _this = this;
            this.sv = sv;
            this.sharedResource = sharedResource;
            this.namespace = namespace;
            this.process = process;
            this.dependencies = dependencies;
            this.alive = true;
            this.called = false;
            this.concurrency = 1;
            this.receive = function (cmd) {
                return Worker.prototype.receive.call(_this, cmd);
            };
            this.terminate = function (reason) {
                return Worker.prototype.terminate.call(_this, reason);
            };
            this.sharedResource.allRefsCache = void 0;
            void ++this.sv.constructor.procs;
            void this.sharedResource.procs.on(namespace, this.receive);
        }
        Worker.prototype.destructor = function (reason) {
            if (!this.alive)
                return;
            void this.sharedResource.procs.off(this.namespace, this.receive);
            this.alive = false;
            void --this.sv.constructor.procs;
            this.sharedResource.allRefsCache = void 0;
            void Object.freeze(this);
            void this.sv.events.exit.emit(this.namespace, [
                this.namespace,
                this.process,
                reason
            ]);
        };
        Worker.prototype.tryDependencyResolving = function (cmd) {
            if (this.receive(new WorkerCommand.Deps(this.namespace))) {
                this.sharedResource.dependenciesStack = [];
                return;
            } else {
                this.sharedResource.dependenciesStack = [];
                throw void 0;
            }
        };
        Worker.prototype.receive = function (cmd) {
            var _this = this;
            void this.checkState();
            if (cmd === void 0) {
                return this;
            }
            if (cmd instanceof WorkerCommand.Deps) {
                if (cmd.namespace.length !== this.namespace.length)
                    return false;
                if (this.concurrency === 0)
                    return false;
                for (var _i = 0, _a = this.sharedResource.dependenciesStack; _i < _a.length; _i++) {
                    var stacked = _a[_i];
                    if (equal(this.namespace, stacked))
                        return true;
                }
                void this.sharedResource.dependenciesStack.push(this.namespace);
                return this.dependencies.every(function (dep) {
                    return (_this.sharedResource.allRefsCache = _this.sharedResource.allRefsCache || _this.sharedResource.procs.refs([])).some(function (_a) {
                        var ns = _a[0], proc = _a[1];
                        return equal(ns, dep) && !!proc(new WorkerCommand.Deps(dep));
                    });
                });
            }
            if (cmd instanceof WorkerCommand.Call) {
                if (this.concurrency === 0)
                    throw void 0;
                void this.tryDependencyResolving(cmd);
                if (!this.called) {
                    this.called = true;
                    void this.sv.events.exec.emit(this.namespace, [
                        this.namespace,
                        this.process
                    ]);
                }
                try {
                    void --this.concurrency;
                    var result = (0, this.process)(cmd.data);
                    if (thenable_1.isThenable(result)) {
                        void result.then(function (_) {
                            void _this.sv.schedule();
                            if (!_this.alive)
                                return;
                            void ++_this.concurrency;
                        }, function (reason) {
                            void _this.sv.schedule();
                            if (!_this.alive)
                                return;
                            void ++_this.concurrency;
                            void _this.terminate(reason);
                        });
                    } else {
                        void ++this.concurrency;
                    }
                    return result;
                } catch (reason) {
                    void this.terminate(reason);
                    throw void 0;
                }
            }
            if (cmd instanceof WorkerCommand.Exit) {
                void this.terminate(cmd.reason);
                throw void 0;
            }
            throw new TypeError('Spica: Supervisor: Invalid command: ' + cmd);
        };
        Worker.prototype.terminate = function (reason) {
            void this.destructor(reason);
        };
        Worker.prototype.checkState = function () {
            if (!this.alive)
                throw new Error('Spica: Supervisor: Process ' + this.namespace + '/' + this.process + ' already exited.');
        };
        return Worker;
    }();
    function equal(a, b) {
        if (a === b)
            return true;
        if (a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
});
define('src/lib/monad/lazy', [
    'require',
    'exports'
], function (require, exports) {
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
});
define('src/lib/monad/functor', [
    'require',
    'exports',
    'src/lib/monad/lazy'
], function (require, exports, lazy_1) {
    'use strict';
    var Functor = function (_super) {
        __extends(Functor, _super);
        function Functor() {
            _super.apply(this, arguments);
        }
        return Functor;
    }(lazy_1.Lazy);
    exports.Functor = Functor;
    var Functor;
    (function (Functor) {
        function fmap(m, f) {
            return f ? m.fmap(f) : function (f) {
                return m.fmap(f);
            };
        }
        Functor.fmap = fmap;
    }(Functor = exports.Functor || (exports.Functor = {})));
});
define('src/lib/monad/applicative', [
    'require',
    'exports',
    'src/lib/monad/functor'
], function (require, exports, functor_1) {
    'use strict';
    var Applicative = function (_super) {
        __extends(Applicative, _super);
        function Applicative() {
            _super.apply(this, arguments);
        }
        return Applicative;
    }(functor_1.Functor);
    exports.Applicative = Applicative;
    var Applicative;
    (function (Applicative) {
        function ap(ff, fa) {
            return fa ? ff.bind(function (f) {
                return fa.fmap(function (a) {
                    return f(a);
                });
            }) : function (fa) {
                return ff.bind(function (f) {
                    return fa.fmap(function (a) {
                        return f(a);
                    });
                });
            };
        }
        Applicative.ap = ap;
    }(Applicative = exports.Applicative || (exports.Applicative = {})));
});
define('src/lib/monad/monad', [
    'require',
    'exports',
    'src/lib/monad/applicative'
], function (require, exports, applicative_1) {
    'use strict';
    var Monad = function (_super) {
        __extends(Monad, _super);
        function Monad() {
            _super.apply(this, arguments);
        }
        return Monad;
    }(applicative_1.Applicative);
    exports.Monad = Monad;
    var Monad;
    (function (Monad) {
        function bind(m, f) {
            return f ? m.bind(f) : function (f) {
                return m.bind(f);
            };
        }
        Monad.bind = bind;
    }(Monad = exports.Monad || (exports.Monad = {})));
});
define('src/lib/monad/monadplus', [
    'require',
    'exports',
    'src/lib/monad/monad'
], function (require, exports, monad_1) {
    'use strict';
    var MonadPlus = function (_super) {
        __extends(MonadPlus, _super);
        function MonadPlus() {
            _super.apply(this, arguments);
        }
        return MonadPlus;
    }(monad_1.Monad);
    exports.MonadPlus = MonadPlus;
    var MonadPlus;
    (function (MonadPlus) {
    }(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {})));
});
define('src/lib/curry', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var _this = this;
    exports.curry = function (f, ctx) {
        if (ctx === void 0) {
            ctx = _this;
        }
        return f.length === 0 ? function () {
            return f.call(ctx);
        } : curry_(f, [], ctx);
    };
    function curry_(f, xs, ctx) {
        return f.length === xs.length ? f.apply(ctx, xs) : function () {
            var ys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ys[_i - 0] = arguments[_i];
            }
            return curry_(f, xs.concat(ys), ctx);
        };
    }
});
define('src/lib/monad/maybe.impl', [
    'require',
    'exports',
    'src/lib/monad/monadplus'
], function (require, exports, monadplus_1) {
    'use strict';
    var Maybe = function (_super) {
        __extends(Maybe, _super);
        function Maybe(thunk) {
            _super.call(this, thunk);
        }
        Maybe.prototype.fmap = function (f) {
            return this.bind(function (a) {
                return new Just(f(a));
            });
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
    var Maybe;
    (function (Maybe) {
        function pure(a) {
            return new Just(a);
        }
        Maybe.pure = pure;
        Maybe.Return = pure;
    }(Maybe = exports.Maybe || (exports.Maybe = {})));
    var Just = function (_super) {
        __extends(Just, _super);
        function Just(a) {
            _super.call(this, throwCallError);
            this.a = a;
        }
        Just.prototype.bind = function (f) {
            var _this = this;
            return new Maybe(function () {
                return f(_this.extract());
            });
        };
        Just.prototype.extract = function (nothing, just) {
            return !just ? this.a : just(this.a);
        };
        return Just;
    }(Maybe);
    exports.Just = Just;
    var Nothing = function (_super) {
        __extends(Nothing, _super);
        function Nothing() {
            _super.call(this, throwCallError);
        }
        Nothing.prototype.bind = function (f) {
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
    var Maybe;
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
    function throwCallError() {
        throw new Error('Spica: Maybe: Invalid thunk call.');
    }
});
define('src/lib/monad/maybe', [
    'require',
    'exports',
    'src/lib/monad/maybe.impl'
], function (require, exports, Monad) {
    'use strict';
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
});
define('src/lib/monad/either.impl', [
    'require',
    'exports',
    'src/lib/monad/monad'
], function (require, exports, monad_2) {
    'use strict';
    var Either = function (_super) {
        __extends(Either, _super);
        function Either(thunk) {
            _super.call(this, thunk);
        }
        Either.prototype.fmap = function (f) {
            return this.bind(function (b) {
                return new Right(f(b));
            });
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
    }(monad_2.Monad);
    exports.Either = Either;
    var Either;
    (function (Either) {
        function pure(b) {
            return new Right(b);
        }
        Either.pure = pure;
        Either.Return = pure;
    }(Either = exports.Either || (exports.Either = {})));
    var Left = function (_super) {
        __extends(Left, _super);
        function Left(a) {
            _super.call(this, throwCallError);
            this.a = a;
        }
        Left.prototype.bind = function (f) {
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
            _super.call(this, throwCallError);
            this.b = b;
        }
        Right.prototype.bind = function (f) {
            var _this = this;
            return new Either(function () {
                return f(_this.extract());
            });
        };
        Right.prototype.extract = function (left, right) {
            return !right ? this.b : right(this.b);
        };
        return Right;
    }(Either);
    exports.Right = Right;
    function throwCallError() {
        throw new Error('Spica: Either: Invalid thunk call.');
    }
});
define('src/lib/monad/either', [
    'require',
    'exports',
    'src/lib/monad/either.impl'
], function (require, exports, Monad) {
    'use strict';
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
});
define('src/lib/cancelable', [
    'require',
    'exports',
    'src/lib/noop',
    'src/lib/monad/maybe',
    'src/lib/monad/either'
], function (require, exports, noop_2, maybe_1, either_1) {
    'use strict';
    var Cancelable = function () {
        function Cancelable() {
            var _this = this;
            this.canceled = false;
            this.listeners = new Set();
            this.promise = function (val) {
                return _this.canceled ? _this.promise_ = _this.promise_ || new Promise(function (_, reject) {
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
                return _this.cancel = noop_2.noop, _this.canceled = true, _this.reason = reason, _this.listeners.forEach(function (cb) {
                    return void cb(reason);
                }), _this.listeners.clear(), _this.listeners.add = function (cb) {
                    return void cb(_this.reason), _this.listeners;
                }, void 0;
            };
        }
        return Cancelable;
    }();
    exports.Cancelable = Cancelable;
});
define('src/lib/monad/sequence/core', [
    'require',
    'exports',
    'src/lib/monad/monadplus'
], function (require, exports, monadplus_2) {
    'use strict';
    var Sequence = function (_super) {
        __extends(Sequence, _super);
        function Sequence(cons, memory) {
            _super.call(this);
            this.cons = cons;
            this.memory = memory;
        }
        return Sequence;
    }(monadplus_2.MonadPlus);
    exports.Sequence = Sequence;
    var Sequence;
    (function (Sequence) {
    }(Sequence = exports.Sequence || (exports.Sequence = {})));
    var Sequence;
    (function (Sequence) {
        var Data;
        (function (Data) {
            function cons(a, b) {
                switch (arguments.length) {
                case 0:
                    return [];
                case 1:
                    return [a];
                case 2:
                    return [
                        a,
                        b
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
});
define('src/lib/monad/sequence/member/static/resume', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_1) {
    'use strict';
    var default_1 = function (_super) {
        __extends(default_1, _super);
        function default_1() {
            _super.apply(this, arguments);
        }
        default_1.resume = function (iterator) {
            return new core_1.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = iterator;
                }
                return core_1.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (at) {
                    return cons(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.iterator(at));
                });
            });
        };
        return default_1;
    }(core_1.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_1;
});
define('src/lib/monad/sequence/member/static/from', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_2) {
    'use strict';
    var default_2 = function (_super) {
        __extends(default_2, _super);
        function default_2() {
            _super.apply(this, arguments);
        }
        default_2.from = function (as) {
            return new core_2.Sequence(function (i, cons) {
                if (i === void 0) {
                    i = 0;
                }
                return i < as.length ? cons(as[i], ++i) : cons();
            });
        };
        return default_2;
    }(core_2.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_2;
});
define('src/lib/monad/sequence/member/static/read', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_3) {
    'use strict';
    var default_3 = function (_super) {
        __extends(default_3, _super);
        function default_3() {
            _super.apply(this, arguments);
        }
        default_3.read = function (as) {
            return new core_3.Sequence(function (_, cons) {
                return as.length > 0 ? cons(as.shift(), as) : cons();
            });
        };
        return default_3;
    }(core_3.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_3;
});
define('src/lib/monad/sequence/member/static/cycle', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_4) {
    'use strict';
    var default_4 = function (_super) {
        __extends(default_4, _super);
        function default_4() {
            _super.apply(this, arguments);
        }
        default_4.cycle = function (as) {
            return new core_4.Sequence(function (i, cons) {
                if (i === void 0) {
                    i = 0;
                }
                return as.length === 0 ? cons() : cons(as[i], ++i % as.length);
            });
        };
        return default_4;
    }(core_4.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_4;
});
define('src/lib/monad/sequence/member/static/random', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_5) {
    'use strict';
    var default_5 = function (_super) {
        __extends(default_5, _super);
        function default_5() {
            _super.apply(this, arguments);
        }
        default_5.random = function (p) {
            if (p === void 0) {
                p = function () {
                    return Math.random();
                };
            }
            switch (true) {
            case Array.isArray(p):
                return this.random().map(function (r) {
                    return p[r * p.length | 0];
                });
            default:
                return new core_5.Sequence(function (_, cons) {
                    return cons(p(), NaN);
                });
            }
        };
        return default_5;
    }(core_5.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_5;
});
define('src/lib/monad/sequence/member/static/concat', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_6) {
    'use strict';
    var default_6 = function (_super) {
        __extends(default_6, _super);
        function default_6() {
            _super.apply(this, arguments);
        }
        default_6.concat = function (as) {
            return new core_6.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return as.iterate();
                        },
                        core_6.Sequence.Iterator.done
                    ] : _a, ai = _b[0], bi = _b[1];
                return core_6.Sequence.Iterator.when(ai(), function () {
                    return cons();
                }, function (at, ar) {
                    return bi = bi === core_6.Sequence.Iterator.done ? function () {
                        return core_6.Sequence.Thunk.value(at).iterate();
                    } : bi, core_6.Sequence.Iterator.when(bi(), function () {
                        return bi = core_6.Sequence.Iterator.done, ar();
                    }, function (bt) {
                        return cons(core_6.Sequence.Thunk.value(bt), [
                            function () {
                                return at;
                            },
                            core_6.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                });
            });
        };
        return default_6;
    }(core_6.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_6;
});
define('src/lib/monad/sequence/member/static/zip', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_7) {
    'use strict';
    var default_7 = function (_super) {
        __extends(default_7, _super);
        function default_7() {
            _super.apply(this, arguments);
        }
        default_7.zip = function (a, b) {
            return new core_7.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return a.iterate();
                        },
                        function () {
                            return b.iterate();
                        }
                    ] : _a, ai = _b[0], bi = _b[1];
                return core_7.Sequence.Iterator.when(ai(), function () {
                    return cons();
                }, function (at) {
                    return core_7.Sequence.Iterator.when(bi(), function () {
                        return cons();
                    }, function (bt) {
                        return cons([
                            core_7.Sequence.Thunk.value(at),
                            core_7.Sequence.Thunk.value(bt)
                        ], [
                            core_7.Sequence.Thunk.iterator(at),
                            core_7.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                });
            });
        };
        return default_7;
    }(core_7.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_7;
});
define('src/lib/monad/sequence/member/static/difference', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_8) {
    'use strict';
    var default_8 = function (_super) {
        __extends(default_8, _super);
        function default_8() {
            _super.apply(this, arguments);
        }
        default_8.difference = function (a, b, cmp) {
            return new core_8.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return a.iterate();
                        },
                        function () {
                            return b.iterate();
                        }
                    ] : _a, ai = _b[0], bi = _b[1];
                return core_8.Sequence.Iterator.when(ai(), function () {
                    return core_8.Sequence.Iterator.when(bi(), function () {
                        return cons();
                    }, function (bt) {
                        return cons(core_8.Sequence.Thunk.value(bt), [
                            core_8.Sequence.Iterator.done,
                            core_8.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                }, function (at, ar) {
                    return core_8.Sequence.Iterator.when(bi(), function () {
                        return cons(core_8.Sequence.Thunk.value(at), [
                            core_8.Sequence.Thunk.iterator(at),
                            core_8.Sequence.Iterator.done
                        ]);
                    }, function (bt) {
                        var ord = cmp(core_8.Sequence.Thunk.value(at), core_8.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return cons(core_8.Sequence.Thunk.value(at), [
                                core_8.Sequence.Thunk.iterator(at),
                                function () {
                                    return bt;
                                }
                            ]);
                        if (ord > 0)
                            return cons(core_8.Sequence.Thunk.value(bt), [
                                function () {
                                    return at;
                                },
                                core_8.Sequence.Thunk.iterator(bt)
                            ]);
                        return bi = function () {
                            return core_8.Sequence.Thunk.iterator(bt)();
                        }, ar();
                    });
                });
            });
        };
        return default_8;
    }(core_8.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_8;
});
define('src/lib/monad/sequence/member/static/union', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_9) {
    'use strict';
    var default_9 = function (_super) {
        __extends(default_9, _super);
        function default_9() {
            _super.apply(this, arguments);
        }
        default_9.union = function (a, b, cmp) {
            return new core_9.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return a.iterate();
                        },
                        function () {
                            return b.iterate();
                        }
                    ] : _a, ai = _b[0], bi = _b[1];
                return core_9.Sequence.Iterator.when(ai(), function () {
                    return core_9.Sequence.Iterator.when(bi(), function () {
                        return cons();
                    }, function (bt) {
                        return cons(core_9.Sequence.Thunk.value(bt), [
                            core_9.Sequence.Iterator.done,
                            core_9.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                }, function (at) {
                    return core_9.Sequence.Iterator.when(bi(), function () {
                        return cons(core_9.Sequence.Thunk.value(at), [
                            core_9.Sequence.Thunk.iterator(at),
                            core_9.Sequence.Iterator.done
                        ]);
                    }, function (bt) {
                        var ord = cmp(core_9.Sequence.Thunk.value(at), core_9.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return cons(core_9.Sequence.Thunk.value(at), [
                                core_9.Sequence.Thunk.iterator(at),
                                function () {
                                    return bt;
                                }
                            ]);
                        if (ord > 0)
                            return cons(core_9.Sequence.Thunk.value(bt), [
                                function () {
                                    return at;
                                },
                                core_9.Sequence.Thunk.iterator(bt)
                            ]);
                        return cons(core_9.Sequence.Thunk.value(at), [
                            core_9.Sequence.Thunk.iterator(at),
                            core_9.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                });
            });
        };
        return default_9;
    }(core_9.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_9;
});
define('src/lib/monad/sequence/member/static/intersect', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_10) {
    'use strict';
    var default_10 = function (_super) {
        __extends(default_10, _super);
        function default_10() {
            _super.apply(this, arguments);
        }
        default_10.intersect = function (a, b, cmp) {
            return new core_10.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return a.iterate();
                        },
                        function () {
                            return b.iterate();
                        }
                    ] : _a, ai = _b[0], bi = _b[1];
                return core_10.Sequence.Iterator.when(ai(), function () {
                    return cons();
                }, function (at, ar) {
                    return core_10.Sequence.Iterator.when(bi(), function () {
                        return cons();
                    }, function (bt, br) {
                        var ord = cmp(core_10.Sequence.Thunk.value(at), core_10.Sequence.Thunk.value(bt));
                        if (ord < 0)
                            return bi = function () {
                                return bt;
                            }, ar();
                        if (ord > 0)
                            return br();
                        return cons(core_10.Sequence.Thunk.value(at), [
                            core_10.Sequence.Thunk.iterator(at),
                            core_10.Sequence.Thunk.iterator(bt)
                        ]);
                    });
                });
            });
        };
        return default_10;
    }(core_10.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_10;
});
define('src/lib/monad/sequence/member/static/pure', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_11) {
    'use strict';
    var default_11 = function (_super) {
        __extends(default_11, _super);
        function default_11() {
            _super.apply(this, arguments);
        }
        default_11.pure = function (a) {
            return new core_11.Sequence(function (_, cons) {
                return cons(a);
            });
        };
        return default_11;
    }(core_11.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_11;
});
define('src/lib/monad/sequence/member/static/return', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_12) {
    'use strict';
    var default_12 = function (_super) {
        __extends(default_12, _super);
        function default_12() {
            _super.apply(this, arguments);
        }
        default_12.Return = function (a) {
            return new core_12.Sequence(function (_, cons) {
                return cons(a);
            });
        };
        return default_12;
    }(core_12.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_12;
});
define('src/lib/monad/sequence/member/static/mempty', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_13) {
    'use strict';
    var default_13 = function (_super) {
        __extends(default_13, _super);
        function default_13() {
            _super.apply(this, arguments);
        }
        default_13.mempty = new core_13.Sequence(function (_, cons) {
            return cons();
        });
        return default_13;
    }(core_13.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_13;
});
define('src/lib/monad/sequence/member/static/mconcat', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_14) {
    'use strict';
    var default_14 = function (_super) {
        __extends(default_14, _super);
        function default_14() {
            _super.apply(this, arguments);
        }
        default_14.mconcat = function (as) {
            return as.reduce(function (a, b) {
                return mconcat(a, b);
            }, core_14.Sequence.mempty);
        };
        return default_14;
    }(core_14.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_14;
    function mconcat(a, b) {
        return new core_14.Sequence(function (_a, cons) {
            var _b = _a === void 0 ? [
                    function () {
                        return a.iterate();
                    },
                    function () {
                        return b.iterate();
                    }
                ] : _a, ai = _b[0], bi = _b[1];
            return core_14.Sequence.Iterator.when(ai(), function () {
                return core_14.Sequence.Iterator.when(bi(), function () {
                    return cons();
                }, function (bt) {
                    return cons(core_14.Sequence.Thunk.value(bt), [
                        core_14.Sequence.Iterator.done,
                        core_14.Sequence.Thunk.iterator(bt)
                    ]);
                });
            }, function (at) {
                return cons(core_14.Sequence.Thunk.value(at), [
                    core_14.Sequence.Thunk.iterator(at),
                    bi
                ]);
            });
        });
    }
});
define('src/lib/monad/sequence/member/static/mappend', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_15) {
    'use strict';
    var default_15 = function (_super) {
        __extends(default_15, _super);
        function default_15() {
            _super.apply(this, arguments);
        }
        default_15.mappend = function (l, r) {
            return core_15.Sequence.mconcat([
                l,
                r
            ]);
        };
        return default_15;
    }(core_15.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_15;
});
define('src/lib/monad/sequence/member/static/mzero', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_16) {
    'use strict';
    var default_16 = function (_super) {
        __extends(default_16, _super);
        function default_16() {
            _super.apply(this, arguments);
        }
        default_16.mzero = core_16.Sequence.mempty;
        return default_16;
    }(core_16.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_16;
});
define('src/lib/monad/sequence/member/static/mplus', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_17) {
    'use strict';
    var default_17 = function (_super) {
        __extends(default_17, _super);
        function default_17() {
            _super.apply(this, arguments);
        }
        default_17.mplus = core_17.Sequence.mappend;
        return default_17;
    }(core_17.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_17;
});
define('src/lib/monad/sequence/member/instance/extract', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/concat'
], function (require, exports, core_18, concat_3) {
    'use strict';
    var default_18 = function (_super) {
        __extends(default_18, _super);
        function default_18() {
            _super.apply(this, arguments);
        }
        default_18.prototype.extract = function () {
            var _this = this;
            var acc = [];
            var iter = function () {
                return _this.iterate();
            };
            while (true) {
                var thunk = iter();
                if (!core_18.Sequence.isIterable(thunk))
                    return acc;
                void concat_3.concat(acc, [core_18.Sequence.Thunk.value(thunk)]);
                iter = core_18.Sequence.Thunk.iterator(thunk);
            }
        };
        return default_18;
    }(core_18.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_18;
});
define('src/lib/monad/sequence/member/instance/iterate', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_19) {
    'use strict';
    var default_19 = function (_super) {
        __extends(default_19, _super);
        function default_19() {
            _super.apply(this, arguments);
        }
        default_19.prototype.iterate = function () {
            return this.iterate_();
        };
        default_19.prototype.iterate_ = function (z, i) {
            var _this = this;
            if (i === void 0) {
                i = 0;
            }
            var data = this.memory ? this.memory.has(i) ? this.memory.get(i) : this.memory.set(i, this.cons(z, core_19.Sequence.Data.cons)).get(i) : this.cons(z, core_19.Sequence.Data.cons);
            switch (data.length) {
            case 0:
                return [
                    void 0,
                    core_19.Sequence.Iterator.done,
                    -1
                ];
            case 1:
                return [
                    data[0],
                    function () {
                        return core_19.Sequence.Iterator.done();
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
                throw core_19.Sequence.Exception.invalidDataError(data);
            }
        };
        return default_19;
    }(core_19.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_19;
});
define('src/lib/monad/sequence/member/instance/memoize', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_20) {
    'use strict';
    var default_20 = function (_super) {
        __extends(default_20, _super);
        function default_20() {
            _super.apply(this, arguments);
        }
        default_20.prototype.memoize = function (memory) {
            if (memory === void 0) {
                memory = this.memory || new Map();
            }
            return new core_20.Sequence(this.cons, this.memory || memory);
        };
        return default_20;
    }(core_20.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_20;
});
define('src/lib/monad/sequence/member/instance/take', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_21) {
    'use strict';
    var default_21 = function (_super) {
        __extends(default_21, _super);
        function default_21() {
            _super.apply(this, arguments);
        }
        default_21.prototype.take = function (n) {
            var _this = this;
            return new core_21.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_21.Sequence.Iterator.when(n > 0 ? iter() : core_21.Sequence.Iterator.done(), function () {
                    return cons();
                }, function (thunk) {
                    return core_21.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_21.Sequence.Thunk.value(thunk), core_21.Sequence.Thunk.iterator(thunk)) : cons(core_21.Sequence.Thunk.value(thunk));
                });
            });
        };
        return default_21;
    }(core_21.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_21;
});
define('src/lib/monad/sequence/member/instance/drop', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_22) {
    'use strict';
    var default_22 = function (_super) {
        __extends(default_22, _super);
        function default_22() {
            _super.apply(this, arguments);
        }
        default_22.prototype.drop = function (n) {
            var _this = this;
            return new core_22.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_22.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk, recur) {
                    return core_22.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_22.Sequence.Thunk.value(thunk), core_22.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_22;
    }(core_22.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_22;
});
define('src/lib/monad/sequence/member/instance/takeWhile', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_23) {
    'use strict';
    var default_23 = function (_super) {
        __extends(default_23, _super);
        function default_23() {
            _super.apply(this, arguments);
        }
        default_23.prototype.takeWhile = function (f) {
            var _this = this;
            return new core_23.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_23.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk) {
                    return f(core_23.Sequence.Thunk.value(thunk)) ? cons(core_23.Sequence.Thunk.value(thunk), core_23.Sequence.Thunk.iterator(thunk)) : cons();
                });
            });
        };
        return default_23;
    }(core_23.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_23;
});
define('src/lib/monad/sequence/member/instance/dropWhile', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_24) {
    'use strict';
    var default_24 = function (_super) {
        __extends(default_24, _super);
        function default_24() {
            _super.apply(this, arguments);
        }
        default_24.prototype.dropWhile = function (f) {
            var _this = this;
            return new core_24.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_24.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk, recur) {
                    return f(core_24.Sequence.Thunk.value(thunk)) ? recur() : cons(core_24.Sequence.Thunk.value(thunk), core_24.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_24;
    }(core_24.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_24;
});
define('src/lib/monad/sequence/member/instance/takeUntil', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_25) {
    'use strict';
    var default_25 = function (_super) {
        __extends(default_25, _super);
        function default_25() {
            _super.apply(this, arguments);
        }
        default_25.prototype.takeUntil = function (f) {
            var _this = this;
            return new core_25.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_25.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk) {
                    return f(core_25.Sequence.Thunk.value(thunk)) ? cons(core_25.Sequence.Thunk.value(thunk)) : cons(core_25.Sequence.Thunk.value(thunk), core_25.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_25;
    }(core_25.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_25;
});
define('src/lib/monad/sequence/member/instance/dropUntil', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_26) {
    'use strict';
    var default_26 = function (_super) {
        __extends(default_26, _super);
        function default_26() {
            _super.apply(this, arguments);
        }
        default_26.prototype.dropUntil = function (f) {
            var _this = this;
            return new core_26.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_26.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk, recur) {
                    return f(core_26.Sequence.Thunk.value(thunk)) ? recur() : cons(core_26.Sequence.Thunk.value(thunk), core_26.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_26;
    }(core_26.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_26;
});
define('src/lib/monad/sequence/member/instance/fmap', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_27) {
    'use strict';
    var default_27 = function (_super) {
        __extends(default_27, _super);
        function default_27() {
            _super.apply(this, arguments);
        }
        default_27.prototype.fmap = function (f) {
            var _this = this;
            return new core_27.Sequence(function (iter) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_27.Sequence.Iterator.when(iter(), function () {
                    return core_27.Sequence.Data.cons();
                }, function (thunk) {
                    return core_27.Sequence.Data.cons(f(core_27.Sequence.Thunk.value(thunk)), core_27.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_27;
    }(core_27.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_27;
});
define('src/lib/monad/sequence/member/instance/bind', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_28) {
    'use strict';
    var default_28 = function (_super) {
        __extends(default_28, _super);
        function default_28() {
            _super.apply(this, arguments);
        }
        default_28.prototype.bind = function (f) {
            return core_28.Sequence.concat(this.fmap(f));
        };
        return default_28;
    }(core_28.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_28;
});
define('src/lib/monad/sequence/member/instance/mapM', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/concat'
], function (require, exports, core_29, concat_4) {
    'use strict';
    var default_29 = function (_super) {
        __extends(default_29, _super);
        function default_29() {
            _super.apply(this, arguments);
        }
        default_29.prototype.mapM = function (f) {
            var _this = this;
            return core_29.Sequence.from([0]).bind(function () {
                var xs = _this.extract();
                switch (xs.length) {
                case 0:
                    return core_29.Sequence.mempty;
                default: {
                        var x = xs.shift();
                        return f(x).bind(function (y) {
                            return xs.length === 0 ? core_29.Sequence.from([[y]]) : core_29.Sequence.from(xs).mapM(f).fmap(function (ys) {
                                return concat_4.concat([y], ys);
                            });
                        });
                    }
                }
            });
        };
        return default_29;
    }(core_29.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_29;
});
define('src/lib/monad/sequence/member/instance/filterM', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/concat'
], function (require, exports, core_30, concat_5) {
    'use strict';
    var default_30 = function (_super) {
        __extends(default_30, _super);
        function default_30() {
            _super.apply(this, arguments);
        }
        default_30.prototype.filterM = function (f) {
            var _this = this;
            return core_30.Sequence.from([0]).bind(function () {
                var xs = _this.extract();
                switch (xs.length) {
                case 0:
                    return core_30.Sequence.from([[]]);
                default: {
                        var x_1 = xs.shift();
                        return f(x_1).bind(function (b) {
                            return b ? xs.length === 0 ? core_30.Sequence.from([[x_1]]) : core_30.Sequence.from(xs).filterM(f).fmap(function (ys) {
                                return concat_5.concat([x_1], ys);
                            }) : xs.length === 0 ? core_30.Sequence.from([[]]) : core_30.Sequence.from(xs).filterM(f);
                        });
                    }
                }
            });
        };
        return default_30;
    }(core_30.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_30;
});
define('src/lib/monad/sequence/member/instance/map', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_31) {
    'use strict';
    var default_31 = function (_super) {
        __extends(default_31, _super);
        function default_31() {
            _super.apply(this, arguments);
        }
        default_31.prototype.map = function (f) {
            var _this = this;
            return new core_31.Sequence(function (iter) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_31.Sequence.Iterator.when(iter(), function () {
                    return core_31.Sequence.Data.cons();
                }, function (thunk) {
                    return core_31.Sequence.Data.cons(f(core_31.Sequence.Thunk.value(thunk), core_31.Sequence.Thunk.index(thunk)), core_31.Sequence.Thunk.iterator(thunk));
                });
            });
        };
        return default_31;
    }(core_31.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_31;
});
define('src/lib/monad/sequence/member/instance/filter', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_32) {
    'use strict';
    var default_32 = function (_super) {
        __extends(default_32, _super);
        function default_32() {
            _super.apply(this, arguments);
        }
        default_32.prototype.filter = function (f) {
            var _this = this;
            return new core_32.Sequence(function (iter, cons) {
                if (iter === void 0) {
                    iter = function () {
                        return _this.iterate();
                    };
                }
                return core_32.Sequence.Iterator.when(iter(), function () {
                    return cons();
                }, function (thunk, recur) {
                    return f(core_32.Sequence.Thunk.value(thunk), core_32.Sequence.Thunk.index(thunk)) ? cons(core_32.Sequence.Thunk.value(thunk), core_32.Sequence.Thunk.iterator(thunk)) : recur();
                });
            });
        };
        return default_32;
    }(core_32.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_32;
});
define('src/lib/monad/sequence/member/instance/scan', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_33) {
    'use strict';
    var default_33 = function (_super) {
        __extends(default_33, _super);
        function default_33() {
            _super.apply(this, arguments);
        }
        default_33.prototype.scan = function (f, z) {
            var _this = this;
            return new core_33.Sequence(function (_a) {
                var _b = _a === void 0 ? [
                        z,
                        function () {
                            return _this.iterate();
                        },
                        0
                    ] : _a, prev = _b[0], iter = _b[1], i = _b[2];
                return core_33.Sequence.Iterator.when(iter(), function () {
                    return i === 0 ? core_33.Sequence.Data.cons(z) : core_33.Sequence.Data.cons();
                }, function (thunk) {
                    return core_33.Sequence.Data.cons(prev = f(prev, core_33.Sequence.Thunk.value(thunk)), [
                        prev,
                        core_33.Sequence.Thunk.iterator(thunk),
                        core_33.Sequence.Thunk.index(thunk) + 1
                    ]);
                });
            });
        };
        return default_33;
    }(core_33.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_33;
});
define('src/lib/monad/sequence/member/instance/fold', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_34) {
    'use strict';
    var default_34 = function (_super) {
        __extends(default_34, _super);
        function default_34() {
            _super.apply(this, arguments);
        }
        default_34.prototype.fold = function (f, z) {
            var _this = this;
            return new core_34.Sequence(function (_a) {
                var _b = _a === void 0 ? [
                        function () {
                            return _this.iterate();
                        },
                        0
                    ] : _a, iter = _b[0], i = _b[1];
                return core_34.Sequence.Iterator.when(iter(), function (thunk) {
                    return core_34.Sequence.Data.cons(z);
                }, function (thunk) {
                    return core_34.Sequence.Data.cons(f(core_34.Sequence.Thunk.value(thunk), core_34.Sequence.resume(core_34.Sequence.Thunk.iterator(thunk)).fold(f, z)));
                });
            }).bind(function (s) {
                return s;
            });
        };
        return default_34;
    }(core_34.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_34;
});
define('src/lib/monad/sequence/member/instance/group', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/concat'
], function (require, exports, core_35, concat_6) {
    'use strict';
    var default_35 = function (_super) {
        __extends(default_35, _super);
        function default_35() {
            _super.apply(this, arguments);
        }
        default_35.prototype.group = function (f) {
            var _this = this;
            return new core_35.Sequence(function (_a, cons) {
                var _b = _a === void 0 ? [
                        function () {
                            return _this.iterate();
                        },
                        []
                    ] : _a, iter = _b[0], acc = _b[1];
                return core_35.Sequence.Iterator.when(iter(), function () {
                    return acc.length === 0 ? cons() : cons(acc);
                }, function (thunk, recur) {
                    return acc.length === 0 || f(acc[0], core_35.Sequence.Thunk.value(thunk)) ? (concat_6.concat(acc, [core_35.Sequence.Thunk.value(thunk)]), recur()) : cons(acc, [
                        core_35.Sequence.Thunk.iterator(thunk),
                        concat_6.concat([], [core_35.Sequence.Thunk.value(thunk)])
                    ]);
                });
            });
        };
        return default_35;
    }(core_35.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_35;
});
define('src/lib/monad/sequence/member/instance/subsequences', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/concat'
], function (require, exports, core_36, concat_7) {
    'use strict';
    var default_36 = function (_super) {
        __extends(default_36, _super);
        function default_36() {
            _super.apply(this, arguments);
        }
        default_36.prototype.subsequences = function () {
            var _this = this;
            return core_36.Sequence.mappend(core_36.Sequence.from([[]]), core_36.Sequence.from([0]).bind(function () {
                return nonEmptySubsequences(_this);
            }));
        };
        return default_36;
    }(core_36.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_36;
    function nonEmptySubsequences(xs) {
        return core_36.Sequence.Iterator.when(xs.iterate(), function () {
            return core_36.Sequence.mempty;
        }, function (xt) {
            return core_36.Sequence.mappend(core_36.Sequence.from([[core_36.Sequence.Thunk.value(xt)]]), new core_36.Sequence(function (_, cons) {
                return core_36.Sequence.Iterator.when(xt, function () {
                    return cons();
                }, function (xt) {
                    return cons(nonEmptySubsequences(core_36.Sequence.resume(core_36.Sequence.Thunk.iterator(xt))).fold(function (ys, r) {
                        return core_36.Sequence.mappend(core_36.Sequence.mappend(core_36.Sequence.from([ys]), core_36.Sequence.from([concat_7.concat([core_36.Sequence.Thunk.value(xt)], ys)])), r);
                    }, core_36.Sequence.mempty));
                });
            }).bind(function (xs) {
                return xs;
            }));
        });
    }
});
define('src/lib/monad/sequence/member/instance/permutations', [
    'require',
    'exports',
    'src/lib/monad/sequence/core'
], function (require, exports, core_37) {
    'use strict';
    var default_37 = function (_super) {
        __extends(default_37, _super);
        function default_37() {
            _super.apply(this, arguments);
        }
        default_37.prototype.permutations = function () {
            var _this = this;
            return core_37.Sequence.from([0]).bind(function () {
                var xs = _this.extract();
                return xs.length === 0 ? core_37.Sequence.mempty : core_37.Sequence.from([xs]);
            }).bind(function (xs) {
                return core_37.Sequence.mappend(core_37.Sequence.from([xs]), perms(core_37.Sequence.from(xs), core_37.Sequence.mempty));
            });
        };
        return default_37;
    }(core_37.Sequence);
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = default_37;
    function perms(ts, is) {
        return core_37.Sequence.Iterator.when(ts.iterate(), function () {
            return core_37.Sequence.mempty;
        }, function (tt) {
            return new core_37.Sequence(function (_, cons) {
                return core_37.Sequence.Iterator.when(tt, function () {
                    return cons();
                }, function (tt) {
                    var t = core_37.Sequence.Thunk.value(tt);
                    var ts = core_37.Sequence.resume(core_37.Sequence.Thunk.iterator(tt)).memoize();
                    return cons(is.permutations().fold(function (ys, r) {
                        return interleave(core_37.Sequence.from(ys), r);
                    }, perms(ts, core_37.Sequence.mappend(core_37.Sequence.from([t]), is))));
                    function interleave(xs, r) {
                        return interleave_(function (as) {
                            return as;
                        }, xs, r)[1];
                    }
                    function interleave_(f, ys, r) {
                        return core_37.Sequence.Iterator.when(ys.iterate(), function () {
                            return [
                                ts,
                                r
                            ];
                        }, function (yt) {
                            var y = core_37.Sequence.Thunk.value(yt);
                            var ys = core_37.Sequence.resume(core_37.Sequence.Thunk.iterator(yt));
                            var _a = interleave_(function (as) {
                                    return f(core_37.Sequence.mappend(core_37.Sequence.from([y]), as));
                                }, core_37.Sequence.resume(core_37.Sequence.Thunk.iterator(yt)), r), us = _a[0], zs = _a[1];
                            return [
                                core_37.Sequence.mappend(core_37.Sequence.from([y]), us),
                                core_37.Sequence.mappend(core_37.Sequence.from([f(core_37.Sequence.mappend(core_37.Sequence.from([t]), core_37.Sequence.mappend(core_37.Sequence.from([y]), us))).extract()]), zs)
                            ];
                        });
                    }
                });
            }).bind(function (xs) {
                return xs;
            });
        });
    }
});
define('src/lib/assign', [
    'require',
    'exports',
    'src/lib/type'
], function (require, exports, type_2) {
    'use strict';
    exports.assign = template(function (key, target, source) {
        return target[key] = source[key];
    });
    exports.clone = template(function (key, target, source) {
        switch (type_2.type(source[key])) {
        case 'Array':
            return target[key] = exports.clone([], source[key]);
        case 'Object':
            return target[key] = exports.clone({}, source[key]);
        default:
            return target[key] = source[key];
        }
    });
    exports.extend = template(function (key, target, source) {
        switch (type_2.type(source[key])) {
        case 'Array':
            return target[key] = exports.extend([], source[key]);
        case 'Object': {
                switch (type_2.type(target[key])) {
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
});
define('src/lib/compose', [
    'require',
    'exports',
    'src/lib/assign',
    'src/lib/concat'
], function (require, exports, assign_1, concat_8) {
    'use strict';
    function compose(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        return concat_8.concat([target], sources).reduce(function (b, d) {
            void assign_1.assign(b.prototype, d.prototype);
            for (var p in d)
                if (d.hasOwnProperty(p))
                    b[p] = d[p];
            return b;
        });
    }
    exports.compose = compose;
});
define('src/lib/monad/sequence', [
    'require',
    'exports',
    'src/lib/monad/sequence/core',
    'src/lib/monad/sequence/member/static/resume',
    'src/lib/monad/sequence/member/static/from',
    'src/lib/monad/sequence/member/static/read',
    'src/lib/monad/sequence/member/static/cycle',
    'src/lib/monad/sequence/member/static/random',
    'src/lib/monad/sequence/member/static/concat',
    'src/lib/monad/sequence/member/static/zip',
    'src/lib/monad/sequence/member/static/difference',
    'src/lib/monad/sequence/member/static/union',
    'src/lib/monad/sequence/member/static/intersect',
    'src/lib/monad/sequence/member/static/pure',
    'src/lib/monad/sequence/member/static/return',
    'src/lib/monad/sequence/member/static/mempty',
    'src/lib/monad/sequence/member/static/mconcat',
    'src/lib/monad/sequence/member/static/mappend',
    'src/lib/monad/sequence/member/static/mzero',
    'src/lib/monad/sequence/member/static/mplus',
    'src/lib/monad/sequence/member/instance/extract',
    'src/lib/monad/sequence/member/instance/iterate',
    'src/lib/monad/sequence/member/instance/memoize',
    'src/lib/monad/sequence/member/instance/take',
    'src/lib/monad/sequence/member/instance/drop',
    'src/lib/monad/sequence/member/instance/takeWhile',
    'src/lib/monad/sequence/member/instance/dropWhile',
    'src/lib/monad/sequence/member/instance/takeUntil',
    'src/lib/monad/sequence/member/instance/dropUntil',
    'src/lib/monad/sequence/member/instance/fmap',
    'src/lib/monad/sequence/member/instance/bind',
    'src/lib/monad/sequence/member/instance/mapM',
    'src/lib/monad/sequence/member/instance/filterM',
    'src/lib/monad/sequence/member/instance/map',
    'src/lib/monad/sequence/member/instance/filter',
    'src/lib/monad/sequence/member/instance/scan',
    'src/lib/monad/sequence/member/instance/fold',
    'src/lib/monad/sequence/member/instance/group',
    'src/lib/monad/sequence/member/instance/subsequences',
    'src/lib/monad/sequence/member/instance/permutations',
    'src/lib/compose'
], function (require, exports, core_38, resume_1, from_1, read_1, cycle_1, random_1, concat_9, zip_1, difference_1, union_1, intersect_1, pure_1, return_1, mempty_1, mconcat_1, mappend_1, mzero_1, mplus_1, extract_1, iterate_1, memoize_1, take_1, drop_1, takeWhile_1, dropWhile_1, takeUntil_1, dropUntil_1, fmap_1, bind_1, mapM_1, filterM_1, map_1, filter_1, scan_1, fold_1, group_1, subsequences_1, permutations_1, compose_1) {
    'use strict';
    exports.Sequence = core_38.Sequence;
    compose_1.compose(core_38.Sequence, resume_1.default, from_1.default, read_1.default, cycle_1.default, random_1.default, concat_9.default, zip_1.default, difference_1.default, union_1.default, intersect_1.default, pure_1.default, return_1.default, mempty_1.default, mconcat_1.default, mappend_1.default, mzero_1.default, mplus_1.default, extract_1.default, iterate_1.default, memoize_1.default, take_1.default, drop_1.default, takeWhile_1.default, dropWhile_1.default, takeUntil_1.default, dropUntil_1.default, fmap_1.default, bind_1.default, mapM_1.default, filterM_1.default, map_1.default, filter_1.default, scan_1.default, fold_1.default, group_1.default, subsequences_1.default, permutations_1.default);
});
define('src/lib/flip', [
    'require',
    'exports',
    'src/lib/curry'
], function (require, exports, curry_1) {
    'use strict';
    function flip(f) {
        return curry_1.curry(function (b, a) {
            return f.length > 1 ? f(a, b) : f(a)(b);
        });
    }
    exports.flip = flip;
});
define('src/lib/list', [
    'require',
    'exports',
    'src/lib/concat'
], function (require, exports, concat_10) {
    'use strict';
    var Nil = function () {
        function Nil() {
        }
        Nil.prototype.push = function (a) {
            return new Cons(a, this);
        };
        return Nil;
    }();
    exports.Nil = Nil;
    var Cons = function () {
        function Cons(head_, tail_) {
            this.head_ = head_;
            this.tail_ = tail_;
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
        Cons.prototype.array = function () {
            return concat_10.concat([this.head()], this.tail().array ? this.tail().array() : []);
        };
        return Cons;
    }();
});
define('src/lib/hlist', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var HNil = function () {
        function HNil() {
        }
        HNil.prototype.push = function (b) {
            return new HCons(b, this);
        };
        return HNil;
    }();
    exports.HNil = HNil;
    var HCons = function () {
        function HCons(head_, tail_) {
            this.head_ = head_;
            this.tail_ = tail_;
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
        return HCons;
    }();
});
define('src/lib/collection/attrmap', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var AttrMap = function () {
        function AttrMap() {
            this.store = new WeakMap();
        }
        AttrMap.prototype.get = function (obj, key) {
            return this.store.get(obj) && this.store.get(obj).get(key);
        };
        AttrMap.prototype.set = function (obj, key, val) {
            var store = this.store.has(obj) ? this.store.get(obj) : this.store.set(obj, new Map()).get(obj);
            void store.set(key, val);
            return this;
        };
        AttrMap.prototype.has = function (obj, key) {
            return this.store.has(obj) && this.store.get(obj).has(key);
        };
        AttrMap.prototype.delete = function (obj, key) {
            return key === void 0 ? this.store.delete(obj) : this.store.has(obj) ? this.store.get(obj).delete(key) : false;
        };
        return AttrMap;
    }();
    exports.AttrMap = AttrMap;
});
define('src/lib/collection/relationmap', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    var RelationMap = function () {
        function RelationMap() {
            this.store = new WeakMap();
        }
        RelationMap.prototype.get = function (source, target) {
            return this.store.get(source) && this.store.get(source).get(target);
        };
        RelationMap.prototype.set = function (source, target, val) {
            var store = this.store.has(source) ? this.store.get(source) : this.store.set(source, new WeakMap()).get(source);
            void store.set(target, val);
            return this;
        };
        RelationMap.prototype.has = function (source, target) {
            return this.store.has(source) && this.store.get(source).has(target);
        };
        RelationMap.prototype.delete = function (source, target) {
            return target === void 0 ? this.store.delete(source) : this.store.has(source) ? this.store.get(source).delete(target) : false;
        };
        return RelationMap;
    }();
    exports.RelationMap = RelationMap;
});
define('src/lib/mixin', [
    'require',
    'exports',
    'src/lib/assign'
], function (require, exports, assign_2) {
    'use strict';
    function Mixin() {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i - 0] = arguments[_i];
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
                return d.apply(b.apply(this, arguments) || this, arguments);
            }
            return class_2;
        }();
        void assign_2.assign(__.prototype, d.prototype, b.prototype);
        for (var p in b)
            if (b.hasOwnProperty(p))
                __[p] = b[p];
        for (var p in d)
            if (d.hasOwnProperty(p))
                __[p] = d[p];
        return __;
    }
});
define('src/lib/fingerprint', [
    'require',
    'exports'
], function (require, exports) {
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
        return str.split('').map(function (c) {
            return c.charCodeAt(0);
        }).join('');
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
});
define('src/lib/uuid', [
    'require',
    'exports',
    'src/lib/fingerprint'
], function (require, exports, fingerprint_1) {
    'use strict';
    var SEED = fingerprint_1.FINGERPRINT * Date.now() % 1000000000000000;
    if (!SEED || typeof SEED !== 'number' || SEED < 100 || 1000000000000000 < SEED)
        throw new Error('Spica: uuid: Invalid uuid static seed.\n\t' + fingerprint_1.FINGERPRINT);
    var FORMAT_V4 = Object.freeze('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split(''));
    var seed = SEED;
    function v4() {
        var k = seed = seed * Date.now() % 1000000000000000;
        if (k < 16 || 1000000000000000 < k)
            throw new Error('Spica: uuid: Invalid uuid dynamic seed.');
        var acc = '';
        for (var _i = 0, FORMAT_V4_1 = FORMAT_V4; _i < FORMAT_V4_1.length; _i++) {
            var c = FORMAT_V4_1[_i];
            if (c === 'x' || c === 'y') {
                var r = Math.random() * k % 16 | 0;
                var v = c == 'x' ? r : r & 3 | 8;
                acc += v.toString(16);
            } else {
                acc += c;
            }
        }
        return acc.toLowerCase();
    }
    exports.v4 = v4;
});
define('src/lib/sort', [
    'require',
    'exports'
], function (require, exports) {
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
});
define('src/export', [
    'require',
    'exports',
    'src/lib/supervisor',
    'src/lib/observable',
    'src/lib/cancelable',
    'src/lib/monad/sequence',
    'src/lib/monad/maybe',
    'src/lib/monad/either',
    'src/lib/curry',
    'src/lib/flip',
    'src/lib/list',
    'src/lib/hlist',
    'src/lib/collection/datamap',
    'src/lib/collection/attrmap',
    'src/lib/collection/relationmap',
    'src/lib/mixin',
    'src/lib/tick',
    'src/lib/fingerprint',
    'src/lib/uuid',
    'src/lib/sqid',
    'src/lib/assign',
    'src/lib/concat',
    'src/lib/sort'
], function (require, exports, supervisor_1, observable_2, cancelable_1, sequence_1, maybe_2, either_2, curry_2, flip_1, list_1, hlist_1, datamap_2, attrmap_1, relationmap_1, mixin_1, tick_2, fingerprint_2, uuid_1, sqid_2, assign_3, concat_11, sort_1) {
    'use strict';
    exports.Supervisor = supervisor_1.Supervisor;
    exports.Observable = observable_2.Observable;
    exports.Cancelable = cancelable_1.Cancelable;
    exports.Sequence = sequence_1.Sequence;
    exports.Maybe = maybe_2.Maybe;
    exports.Just = maybe_2.Just;
    exports.Nothing = maybe_2.Nothing;
    exports.Either = either_2.Either;
    exports.Left = either_2.Left;
    exports.Right = either_2.Right;
    exports.curry = curry_2.curry;
    exports.flip = flip_1.flip;
    exports.Nil = list_1.Nil;
    exports.HNil = hlist_1.HNil;
    exports.DataMap = datamap_2.DataMap;
    exports.AttrMap = attrmap_1.AttrMap;
    exports.RelationMap = relationmap_1.RelationMap;
    exports.Mixin = mixin_1.Mixin;
    exports.Tick = tick_2.Tick;
    exports.FINGERPRINT = fingerprint_2.FINGERPRINT;
    exports.uuid = uuid_1.v4;
    exports.sqid = sqid_2.sqid;
    exports.assign = assign_3.assign;
    exports.clone = assign_3.clone;
    exports.extend = assign_3.extend;
    exports.concat = concat_11.concat;
    exports.sort = sort_1.sort;
});
define('spica', [
    'require',
    'exports',
    'src/export'
], function (require, exports, export_1) {
    'use strict';
    function __export(m) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    __export(export_1);
});