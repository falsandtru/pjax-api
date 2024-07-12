/*! pjax-api v3.44.1 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pjax-api"] = factory();
	else
		root["pjax-api"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8257:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
__webpack_require__(518);
var export_1 = __webpack_require__(2076);
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return __importDefault(export_1).default;
  }
}));
__exportStar(__webpack_require__(2076), exports);

/***/ }),

/***/ 5413:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log10 = exports.log2 = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.PI = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.EPSILON = exports.MIN_VALUE = exports.MIN_SAFE_INTEGER = exports.MAX_VALUE = exports.MAX_SAFE_INTEGER = void 0;
exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER, exports.MAX_VALUE = Number.MAX_VALUE, exports.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER, exports.MIN_VALUE = Number.MIN_VALUE, exports.EPSILON = Number.EPSILON, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.PI = Math.PI, exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.log2 = Math.log2, exports.log10 = Math.log10, exports.sqrt = Math.sqrt;
exports.isArray = Array.isArray;
exports.hasOwnProperty = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
exports.isPrototypeOf = Object.prototype.isPrototypeOf.call.bind(Object.prototype.isPrototypeOf);
exports.isEnumerable = Object.prototype.propertyIsEnumerable.call.bind(Object.prototype.propertyIsEnumerable);
exports.toString = Object.prototype.toString.call.bind(Object.prototype.toString);
exports.ObjectAssign = Object.assign;
exports.ObjectCreate = Object.create;
exports.ObjectGetPrototypeOf = Object.getPrototypeOf;
exports.ObjectSetPrototypeOf = Object.setPrototypeOf;

/***/ }),

/***/ 6876:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.splice = exports.pop = exports.push = exports.shift = exports.unshift = exports.indexOf = void 0;
function indexOf(as, a) {
  if (as.length === 0) return -1;
  return a === a ? as.indexOf(a) : as.findIndex(a => a !== a);
}
exports.indexOf = indexOf;
function unshift(as, bs) {
  if ('length' in as) {
    if (as.length === 1) return bs.unshift(as[0]), bs;
    if (Array.isArray(as)) return bs.unshift(...as), bs;
    for (let i = as.length; i--;) {
      bs.unshift(as[i]);
    }
  } else {
    bs.unshift(...as);
  }
  return bs;
}
exports.unshift = unshift;
function shift(as, count) {
  if (count < 0) throw new Error('Unexpected negative number');
  return count === undefined ? [as.shift(), as] : [splice(as, 0, count), as];
}
exports.shift = shift;
function push(as, bs) {
  if ('length' in bs) {
    if (bs.length === 1) return as.push(bs[0]), as;
    if (Array.isArray(bs) && bs.length > 100) return as.push(...bs), as;
    for (let len = bs.length, i = 0; i < len; ++i) {
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
  if (count < 0) throw new Error('Unexpected negative number');
  return count === undefined ? [as, as.pop()] : [as, splice(as, as.length - count, count)];
}
exports.pop = pop;
function splice(as, index, count, ...values) {
  if (as.length === 0) return push(as, values), [];
  if (index > as.length) {
    index = as.length;
  } else if (index < 0) {
    index = -index > as.length ? 0 : as.length + index;
  }
  count = count > as.length ? as.length : count;
  if (count === 0 && values.length === 0) return [];
  if (count === 1 && values.length === 1) return [[as[index], as[index] = values[0]][0]];
  switch (index) {
    case as.length - 1:
      if (as.length === 0) return push(as, values), [];
      if (count >= 1) return [[as.pop()], push(as, values)][0];
      break;
    case 0:
      if (count === 0) return unshift(values, as), [];
      if (count === 1) return [[as.shift()], unshift(values, as)][0];
      break;
    case as.length:
      return push(as, values), [];
  }
  switch (values.length) {
    case 0:
      return arguments.length > 2 ? as.splice(index, count) : as.splice(index);
    case 1:
      return as.splice(index, count, values[0]);
    case 2:
      return as.splice(index, count, values[0], values[1]);
    case 3:
      return as.splice(index, count, values[0], values[1], values[2]);
    case 4:
      return as.splice(index, count, values[0], values[1], values[2], values[3]);
    case 5:
      return as.splice(index, count, values[0], values[1], values[2], values[3], values[4]);
    default:
      return as.splice(index, count, ...values);
  }
}
exports.splice = splice;

/***/ }),

/***/ 9888:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.template = exports.inherit = exports.merge = exports.extend = exports.overwrite = exports.clone = exports.assign = void 0;
const alias_1 = __webpack_require__(5413);
const type_1 = __webpack_require__(113);
const array_1 = __webpack_require__(6876);
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
exports.overwrite = template((prop, target, source) => {
  switch ((0, type_1.type)(source[prop])) {
    case 'Array':
      return target[prop] = source[prop];
    case 'Object':
      switch ((0, type_1.type)(target[prop])) {
        case 'Object':
          return (0, exports.overwrite)(target[prop], source[prop]);
        default:
          return target[prop] = (0, exports.overwrite)(empty(source[prop]), source[prop]);
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
          return (0, exports.extend)(target[prop], source[prop]);
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
          return (0, exports.merge)(target[prop], source[prop]);
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
          return (0, exports.inherit)(target[prop], source[prop]);
        default:
          return target[prop] = (0, alias_1.ObjectCreate)(source[prop]);
      }
    default:
      return target[prop] = source[prop];
  }
});
function template(strategy) {
  return walk;
  function walk(target, ...sources) {
    if ((0, type_1.isPrimitive)(target)) return target;
    for (let i = 0; i < sources.length; ++i) {
      const source = sources[i];
      if (source === target) continue;
      if ((0, type_1.isPrimitive)(source)) continue;
      const keys = Object.keys(source);
      for (let i = 0; i < keys.length; ++i) {
        strategy(keys[i], target, source);
      }
    }
    return target;
  }
}
exports.template = template;
function empty(source) {
  return source instanceof Object ? {} : (0, alias_1.ObjectCreate)(null);
}

/***/ }),

/***/ 3669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Cancellation = void 0;
const promise_1 = __webpack_require__(8312);
const maybe_1 = __webpack_require__(6189);
const either_1 = __webpack_require__(7704);
const function_1 = __webpack_require__(1825);
const exception_1 = __webpack_require__(6192);
class Cancellation {
  constructor(cancellees) {
    this[_a] = 'Cancellation';
    this.state = 0 /* State.alive */;
    this.reason = undefined;
    this.handlers = [];
    this[_b] = new promise_1.Internal();
    if (cancellees) for (const cancellee of cancellees) {
      cancellee.register(this.cancel);
    }
  }
  isAlive() {
    return this.state === 0 /* State.alive */;
  }
  isCancelled() {
    return this.state === 1 /* State.cancelled */;
  }
  isClosed() {
    return this.state === 2 /* State.closed */;
  }
  register$(listener) {
    const {
      handlers
    } = this;
    if (!this.isAlive() && handlers.length === 0) {
      this.isCancelled() && handler(this.reason);
      return function_1.noop;
    }
    handlers.push(handler);
    return () => void (listener = function_1.noop);
    function handler(reason) {
      try {
        listener(reason);
      } catch (reason) {
        (0, exception_1.causeAsyncException)(reason);
      }
    }
  }
  get register() {
    return listener => this.register$(listener);
  }
  cancel$(reason) {
    if (!this.isAlive()) return;
    this.state = 1 /* State.cancelled */;
    this.reason = reason;
    for (let {
        handlers
      } = this, i = 0; i < handlers.length; ++i) {
      handlers[i](reason);
    }
    this.handlers = [];
    this[promise_1.internal].resolve(reason);
  }
  get cancel() {
    return reason => this.cancel$(reason);
  }
  close$(reason) {
    if (!this.isAlive()) return;
    this.state = 2 /* State.closed */;
    this.reason = reason;
    this.handlers = [];
    this[promise_1.internal].reject(reason);
  }
  get close() {
    return reason => this.close$(reason);
  }
  get promise() {
    return value => this.isCancelled() ? promise_1.AtomicPromise.reject(this.reason) : promise_1.AtomicPromise.resolve(value);
  }
  get maybe() {
    return value => (0, maybe_1.Just)(value).bind(value => this.isCancelled() ? maybe_1.Nothing : (0, maybe_1.Just)(value));
  }
  get either() {
    return value => (0, either_1.Right)(value).bind(value => this.isCancelled() ? (0, either_1.Left)(this.reason) : (0, either_1.Right)(value));
  }
}
exports.Cancellation = Cancellation;
_a = Symbol.toStringTag, _b = promise_1.internal;
Cancellation.prototype.then = promise_1.AtomicPromise.prototype.then;
Cancellation.prototype.catch = promise_1.AtomicPromise.prototype.catch;
Cancellation.prototype.finally = promise_1.AtomicPromise.prototype.finally;

/***/ }),

/***/ 4778:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Channel = void 0;
const promise_1 = __webpack_require__(8312);
const future_1 = __webpack_require__(9998);
const queue_1 = __webpack_require__(4110);
const fail = () => promise_1.AtomicPromise.reject(new Error('Spica: Channel: Closed'));
class Channel {
  constructor(capacity = 0) {
    this.capacity = capacity;
    this.buffer = new queue_1.Queue();
    this.producers = new queue_1.Queue();
    this.consumers = new queue_1.Queue();
    this.alive = true;
  }
  close(finalizer) {
    if (!this.alive) return void finalizer?.([]);
    const {
      buffer,
      producers,
      consumers
    } = this;
    this.alive = false;
    while (!producers.isEmpty() || !consumers.isEmpty()) {
      producers.pop()?.bind(fail());
      consumers.pop()?.bind(fail());
    }
    if (finalizer) {
      promise_1.AtomicPromise.all(buffer).then(finalizer);
    }
  }
  put(msg) {
    if (!this.alive) return fail();
    const {
      capacity,
      buffer,
      producers,
      consumers
    } = this;
    switch (true) {
      case buffer.length < capacity:
      case !consumers.isEmpty():
        buffer.push(msg);
        consumers.pop()?.bind(buffer.pop());
        return promise_1.AtomicPromise.resolve();
      default:
        producers.push(new future_1.AtomicFuture());
        return producers.peek(-1).then(() => this.put(msg));
    }
  }
  take() {
    if (!this.alive) return fail();
    const {
      buffer,
      producers,
      consumers
    } = this;
    switch (true) {
      case !buffer.isEmpty():
        const msg = buffer.pop();
        producers.pop()?.bind();
        return promise_1.AtomicPromise.resolve(msg);
      case !producers.isEmpty():
        consumers.push(new future_1.AtomicFuture());
        const consumer = consumers.peek(-1);
        producers.pop().bind();
        return consumer.then();
      default:
        consumers.push(new future_1.AtomicFuture());
        return consumers.peek(-1).then();
    }
  }
  get size() {
    return this.buffer.length;
  }
  async *[Symbol.asyncIterator]() {
    try {
      while (this.alive) {
        yield this.take();
      }
    } catch (reason) {
      if (this.alive) throw reason;
    }
  }
}
exports.Channel = Channel;

/***/ }),

/***/ 9522:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clock = exports.now = void 0;
const queue_1 = __webpack_require__(4110);
const exception_1 = __webpack_require__(6192);
let time;
let count = 0;
function now(nocache) {
  if (time === undefined) {
    exports.clock.now(() => time = undefined);
  } else if (!nocache && count++ !== 20) {
    return time;
  }
  count = 1;
  return time = Date.now();
}
exports.now = now;
exports.clock = new class Clock extends Promise {
  constructor() {
    super(resolve => resolve(undefined));
    // Promise subclass is slow.
    const clock = Promise.resolve();
    clock.next = this.next;
    clock.now = this.now;
    return clock;
  }
  next(callback) {
    scheduled || schedule();
    exports.clock.then(callback);
  }
  now(callback) {
    scheduled || schedule();
    queue.push(callback);
  }
}();
const queue = new queue_1.Queue();
let scheduled = false;
function schedule() {
  scheduled = true;
  exports.clock.then(run);
}
function run() {
  for (let cb; cb = queue.pop();) {
    try {
      cb();
    } catch (reason) {
      (0, exception_1.causeAsyncException)(reason);
    }
  }
  scheduled = false;
}

/***/ }),

/***/ 6212:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(1311), exports);

/***/ }),

/***/ 1934:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.equal = void 0;
function equal(a, b) {
  return a === a ? a === b : b !== b;
}
exports.equal = equal;

/***/ }),

/***/ 7218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Copropagator = void 0;
const alias_1 = __webpack_require__(5413);
const coroutine_1 = __webpack_require__(8779);
const promise_1 = __webpack_require__(8312);
class Copropagator extends coroutine_1.Coroutine {
  constructor(coroutines, reducer = results => results[0], opts) {
    const cs = (0, alias_1.isArray)(coroutines) ? coroutines : [...coroutines];
    super(async function* () {
      this.then(result => {
        for (const co of cs) {
          co[coroutine_1.Coroutine.exit](result);
        }
      }, reason => {
        const rejection = promise_1.AtomicPromise.reject(reason);
        for (const co of cs) {
          co[coroutine_1.Coroutine.exit](rejection);
        }
      });
      promise_1.AtomicPromise.all(cs).then(results => results.length === 0 ? void this[coroutine_1.Coroutine.terminate](new Error(`Spica: Copropagator: No result`)) : void this[coroutine_1.Coroutine.exit](reducer(results)), reason => void this[coroutine_1.Coroutine.terminate](reason));
      return promise_1.never;
    }, {
      delay: false,
      ...opts
    });
  }
}
exports.Copropagator = Copropagator;

/***/ }),

/***/ 8779:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isCoroutine = exports.Coroutine = void 0;
const alias_1 = __webpack_require__(5413);
const chrono_1 = __webpack_require__(9522);
const promise_1 = __webpack_require__(8312);
const future_1 = __webpack_require__(9998);
const channel_1 = __webpack_require__(4778);
const timer_1 = __webpack_require__(9152);
const function_1 = __webpack_require__(1825);
const queue_1 = __webpack_require__(4110);
const exception_1 = __webpack_require__(6192);
const alive = Symbol.for('spica/Coroutine.alive');
const init = Symbol.for('spica/Coroutine.init');
const exit = Symbol.for('spica/Coroutine.exit');
const terminate = Symbol.for('spica/Coroutine.terminate');
const port = Symbol.for('spica/Coroutine.port');
const internal = Symbol.for('spica/coroutine::internal');
class Coroutine {
  constructor(gen, opts = {}) {
    this[_a] = 'Coroutine';
    this[_b] = new promise_1.Internal();
    this[_c] = new Port(this);
    this[internal] = new Internal(opts);
    let count = 0;
    this[init] = async () => {
      const core = this[internal];
      if (!core.alive) return;
      if (count !== 0) return;
      let reply = function_1.noop;
      try {
        const iter = gen.call(this);
        while (core.alive) {
          const {
            0: {
              0: msg,
              1: rpy
            }
          } = ++count === 1
          // Don't block.
          ? [[undefined, function_1.noop]]
          // Block.
          : await Promise.all([
          // Don't block.
          core.settings.capacity < 0 ? [undefined, function_1.noop] : core.sendBuffer.take(),
          // Don't block.
          Promise.all([core.settings.resume(), core.settings.interval > 0 ? (0, timer_1.wait)(core.settings.interval) : undefined])]);
          reply = rpy;
          if (!core.alive) break;
          // Block.
          // `result.value` can be a Promise value when using iterators.
          // `result.value` will never be a Promise value when using async iterators.
          const result = await iter.next(msg);
          if (!core.alive) break;
          if (!result.done) {
            // Block.

            reply({
              ...result
            });
            await core.recvBuffer.put({
              ...result
            });
            continue;
          } else {
            // Don't block.
            core.alive = false;
            reply({
              ...result
            });
            core.recvBuffer.put({
              ...result
            });
            core.result.bind(result);
            return;
          }
        }
        reply(promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`)));
      } catch (reason) {
        reply(promise_1.AtomicPromise.reject(reason));
        this[Coroutine.terminate](reason);
      }
    };
    const core = this[internal];
    this[promise_1.internal].resolve(core.result.then(({
      value
    }) => value));
    if (core.settings.trigger !== undefined) {
      for (const prop of (0, alias_1.isArray)(core.settings.trigger) ? core.settings.trigger : [core.settings.trigger]) {
        if (prop in this && this.hasOwnProperty(prop)) continue;
        if (prop in this) {
          Object.defineProperty(this, prop, {
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
          const desc = Object.getOwnPropertyDescriptor(this, prop) || {
            value: this[prop],
            enumerable: true,
            configurable: true,
            writable: true
          };
          Object.defineProperty(this, prop, {
            set(value) {
              Object.defineProperty(this, prop, {
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
      this[internal].settings.delay ? chrono_1.clock.now(this[init]) : this[init]();
    }
  }
  get [(_a = Symbol.toStringTag, _b = promise_1.internal, alive)]() {
    return this[internal].alive;
  }
  [exit](result) {
    if (!this[internal].alive) return;
    promise_1.AtomicPromise.resolve(result).then(result => {
      const core = this[internal];
      if (!core.alive) return;
      core.alive = false;
      // Don't block.
      core.recvBuffer.put({
        value: undefined,
        done: true
      });
      core.result.bind({
        value: result
      });
    }, reason => {
      const core = this[internal];
      if (!core.alive) return;
      core.alive = false;
      // Don't block.
      core.recvBuffer.put({
        value: undefined,
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
      if (result.done) return await result.value;
      yield result.value;
    }
    return await this;
  }
}
exports.Coroutine = Coroutine;
_c = port;
Coroutine.alive = alive;
Coroutine.init = init;
Coroutine.exit = exit;
Coroutine.terminate = terminate;
Coroutine.port = port;
Coroutine.prototype.then = promise_1.AtomicPromise.prototype.then;
Coroutine.prototype.catch = promise_1.AtomicPromise.prototype.catch;
Coroutine.prototype.finally = promise_1.AtomicPromise.prototype.finally;
class Internal {
  constructor(opts) {
    this.opts = opts;
    this.settings = (0, alias_1.ObjectAssign)({
      run: true,
      delay: true,
      capacity: -1,
      interval: 0,
      resume: function_1.noop,
      trigger: undefined
    }, this.opts);
    this.alive = true;
    this.reception = 0;
    this.sendBuffer = this.settings.capacity >= 0 ? new channel_1.Channel(this.settings.capacity) : undefined;
    this.recvBuffer = this.settings.capacity >= 0
    // Block the iteration until an yielded value is consumed.
    ? new channel_1.Channel(0)
    // Broadcast an yielded value.
    : new BroadcastChannel();
    this.result = new future_1.AtomicFuture();
    this.result.finally(() => {
      this.sendBuffer?.close(msgs => {
        while (msgs.length > 0) {
          // Don't block.
          const {
            1: reply
          } = msgs.shift();
          try {
            reply(promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`)));
          } catch (reason) {
            (0, exception_1.causeAsyncException)(reason);
          }
        }
      });
      this.recvBuffer.close();
    });
  }
}
// All responses of accepted requests must be delayed not to interrupt the current process.
class Port {
  constructor(co) {
    this[internal] = {
      co
    };
  }
  ask(msg) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`));
    if (core.settings.capacity < 0) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Overflowed`));
    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
    const future = new future_1.AtomicFuture();
    core.sendBuffer.put([msg, future.bind]);
    ++core.reception;
    return Promise.all([future, core.recvBuffer.take()]).then(([result]) => result.done ? core.result.then(({
      value
    }) => ({
      ...result,
      value
    })) : {
      ...result
    });
  }
  recv() {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`));
    ++core.reception;
    return Promise.resolve(core.recvBuffer.take()).then(result => result.done ? core.result.then(({
      value
    }) => ({
      ...result,
      value
    })) : {
      ...result
    });
  }
  send(msg) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`));
    if (core.settings.capacity < 0) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Overflowed`));
    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
    const future = new future_1.AtomicFuture();
    return Promise.resolve(core.sendBuffer.put([msg, future.bind]));
  }
  connect(com) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new Error(`Spica: Coroutine: Canceled`));
    return (async () => {
      core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
      const iter = com.call(this[internal].co);
      let reply;
      while (true) {
        const result = await iter.next(reply);
        if (result.done) return await result.value;
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
    this[_d] = new BroadcastChannel.Internal();
  }
  get alive() {
    return this[internal].alive;
  }
  close(finalizer) {
    if (!this.alive) return void finalizer?.([]);
    const core = this[internal];
    const {
      consumers
    } = core;
    core.alive = false;
    while (!consumers.isEmpty()) {
      consumers.pop().bind(BroadcastChannel.fail());
    }
    if (finalizer) {
      finalizer([]);
    }
  }
  put(msg) {
    if (!this.alive) return BroadcastChannel.fail();
    const {
      consumers
    } = this[internal];
    while (!consumers.isEmpty()) {
      consumers.pop().bind(msg);
    }
    return promise_1.AtomicPromise.resolve();
  }
  take() {
    if (!this.alive) return BroadcastChannel.fail();
    const {
      consumers
    } = this[internal];
    consumers.push(new future_1.AtomicFuture());
    return consumers.peek(-1).then();
  }
}
_d = internal;
(function (BroadcastChannel) {
  BroadcastChannel.fail = () => promise_1.AtomicPromise.reject(new Error('Spica: Channel: Closed'));
  class Internal {
    constructor() {
      this.alive = true;
      this.consumers = new queue_1.Queue();
    }
  }
  BroadcastChannel.Internal = Internal;
})(BroadcastChannel || (BroadcastChannel = {}));

/***/ }),

/***/ 4042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.uncurry = exports.curry = void 0;
const array_1 = __webpack_require__(6876);
exports.curry = f => curry_(f, f.length);
function curry_(f, arity, ...xs) {
  let g;
  return xs.length < arity ? (...ys) => curry_(g ??= xs.length ? f.bind(undefined, ...xs) : f, arity - xs.length, ...ys) : f(...xs);
}
const uncurry = f => uncurry_(f);
exports.uncurry = uncurry;
function uncurry_(f) {
  const arity = f.length;
  return (...xs) => arity === 0 || xs.length <= arity ? f(...xs) : uncurry_(f(...(0, array_1.shift)(xs, arity)[0]))(...xs);
}

/***/ }),

/***/ 7704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Either = exports.Left = exports.Right = void 0;
const promise_1 = __webpack_require__(8312);
const curry_1 = __webpack_require__(4042);
const array_1 = __webpack_require__(6876);
class Right {
  constructor(value) {
    this.value = value;
  }
  fmap(f) {
    return new Right(f(this.value));
  }
  ap(b) {
    return Either.ap(this, b);
  }
  bind(f) {
    return f(this.extract());
  }
  join() {
    return this.value;
  }
  extract(left, right) {
    if (right !== undefined) return right(this.value);
    return this.value;
  }
}
class Left {
  constructor(value) {
    this.value = value;
  }
  fmap(f) {
    return this;
  }
  ap(_) {
    return this;
  }
  bind(f) {
    return this;
  }
  join() {
    return this;
  }
  extract(left) {
    if (left !== undefined) return left(this.value);
    throw this.value;
  }
}
function right(b) {
  return new Right(b);
}
exports.Right = right;
function left(value) {
  return new Left(value);
}
exports.Left = left;
var Either;
(function (Either) {
  function fmap(f, m) {
    return m.fmap(f);
  }
  Either.fmap = fmap;
  Either.pure = right;
  function ap(af, aa) {
    return aa ? af.bind(f => aa.fmap((0, curry_1.curry)(f))) : aa => ap(af, aa);
  }
  Either.ap = ap;
  Either.Return = Either.pure;
  function bind(f, m) {
    return m.bind(f);
  }
  Either.bind = bind;
  function sequence(fm) {
    return Array.isArray(fm) ? fm.reduce((acc, m) => acc.bind(as => m.fmap(a => (0, array_1.push)(as, [a]))), Either.Return([])) : fm.extract(b => promise_1.AtomicPromise.resolve(new Left(b)), a => promise_1.AtomicPromise.resolve(a).then(Either.Return));
  }
  Either.sequence = sequence;
})(Either || (exports.Either = Either = {}));

/***/ }),

/***/ 6192:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.suppressAsyncException = exports.causeAsyncException = void 0;
const stack_1 = __webpack_require__(7345);
const stack = new stack_1.Stack();
function causeAsyncException(reason) {
  if (stack.isEmpty()) {
    Promise.reject(reason);
  } else {
    stack.peek().push(reason);
  }
}
exports.causeAsyncException = causeAsyncException;
function suppressAsyncException(test) {
  return done => {
    stack.push([]);
    return test(err => {
      stack.pop();
      done(err);
    });
  };
}
exports.suppressAsyncException = suppressAsyncException;

/***/ }),

/***/ 1825:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noop = exports.fix = exports.id = exports.clear = exports.singleton = void 0;
function singleton(f) {
  let result;
  return function (...as) {
    if (f === noop) return result;
    result = f.call(this, ...as);
    f = noop;
    return result;
  };
}
exports.singleton = singleton;
function clear(f) {
  return (...as) => void f(...as);
}
exports.clear = clear;
function id(a) {
  return a;
}
exports.id = id;
function fix(f) {
  return a1 => {
    const a2 = f(a1);
    return a1 === a2 || a2 !== a2 ? a2 : f(a2);
  };
}
exports.fix = fix;
function noop() {}
exports.noop = noop;

/***/ }),

/***/ 9998:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AtomicFuture = exports.Future = void 0;
const promise_1 = __webpack_require__(8312);
const state = Symbol('spica/future::state');
class Future extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
  constructor(strict = true) {
    let resolve;
    super(r => resolve = r);
    this.strict = strict;
    this[state] = {
      pending: true,
      resolve
    };
  }
  bind$(value) {
    if (this[state].pending) {
      this[state].pending = false;
      this[state].resolve(value);
    } else if (this.strict) {
      throw new Error(`Spica: Future: Cannot rebind the value`);
    }
    return this;
  }
  get bind() {
    return value => this.bind$(value);
  }
}
exports.Future = Future;
class AtomicFuture {
  constructor(strict = true) {
    this.strict = strict;
    this[_a] = 'Promise';
    this[_b] = new promise_1.Internal();
  }
  bind$(value) {
    if (this[promise_1.internal].isPending()) {
      this[promise_1.internal].resolve(value);
    } else if (this.strict) {
      throw new Error(`Spica: AtomicFuture: Cannot rebind the value`);
    }
    return this;
  }
  get bind() {
    return value => this.bind$(value);
  }
}
exports.AtomicFuture = AtomicFuture;
_a = Symbol.toStringTag, _b = promise_1.internal;
AtomicFuture.prototype.then = promise_1.AtomicPromise.prototype.then;
AtomicFuture.prototype.catch = promise_1.AtomicPromise.prototype.catch;
AtomicFuture.prototype.finally = promise_1.AtomicPromise.prototype.finally;

/***/ }),

/***/ 518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__webpack_require__(3394);
const global = globalThis;
global.global = global;
exports["default"] = global;

/***/ }),

/***/ 3394:
/***/ (() => {

"use strict";


// @ts-ignore
var global = (/* unused pure expression or super */ null && (globalThis));

/***/ }),

/***/ 3719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MultiHeap = exports.Heap = void 0;
const list_1 = __webpack_require__(4609);
const memoize_1 = __webpack_require__(6925);
class Heap {
  constructor(cmp = Heap.max, options) {
    this.cmp = cmp;
    this.array = {};
    this.$length = 0;
    this.stable = options?.stable ?? false;
  }
  get length() {
    return this.$length;
  }
  isEmpty() {
    return this.array[0] !== undefined;
  }
  peek() {
    return this.array[0];
  }
  insert(value, order) {
    if (arguments.length === 1) {
      order = value;
    }
    const array = this.array;
    const node = array[this.$length] = {
      index: ++this.$length,
      order,
      value
    };
    upHeapify(this.cmp, array, this.$length);
    return node;
  }
  replace(value, order) {
    if (arguments.length === 1) {
      order = value;
    }
    if (this.$length === 0) return void this.insert(value, order);
    const array = this.array;
    const node = array[0];
    const val = node.value;
    node.order = order;
    node.value = value;
    downHeapify(this.cmp, array, 1, this.$length, this.stable);
    return val;
  }
  extract() {
    if (this.$length === 0) return;
    const node = this.array[0];
    this.delete(node);
    return node.value;
  }
  delete(node) {
    const array = this.array;
    const index = node.index;
    if (array[index - 1] !== node) throw new Error('Invalid node');
    swap(array, index, this.$length--);
    sort(this.cmp, array, index, this.$length, this.stable);
    array[this.$length] = undefined;
    return node.value;
  }
  update(node, order, value) {
    const array = this.array;
    const index = node.index;
    if (array[index - 1] !== node) throw new Error('Invalid node');
    if (arguments.length === 1) {
      order = node.order;
    }
    if (arguments.length >= 3) {
      node.value = value;
    }
    if (this.cmp(node.order, node.order = order) === 0) return;
    sort(this.cmp, array, index, this.$length, this.stable);
  }
  clear() {
    this.array = {};
    this.$length = 0;
  }
}
exports.Heap = Heap;
Heap.max = (a, b) => a > b ? -1 : a < b ? 1 : 0;
Heap.min = (a, b) => a > b ? 1 : a < b ? -1 : 0;
function sort(cmp, array, index, length, stable) {
  if (length === 0) return false;
  switch (index) {
    case 1:
      return  false || downHeapify(cmp, array, index, length, stable);
    case length:
      return upHeapify(cmp, array, index);
    default:
      return upHeapify(cmp, array, index) || downHeapify(cmp, array, index, length, stable);
  }
}
function upHeapify(cmp, array, index) {
  const order = array[index - 1].order;
  let changed = false;
  while (index > 1) {
    const parent = index / 2 | 0;
    if (cmp(array[parent - 1].order, order) <= 0) break;
    swap(array, index, parent);
    index = parent;
    changed ||= true;
  }
  return changed;
}
function downHeapify(cmp, array, index, length, stable) {
  let changed = false;
  while (index < length) {
    const left = index * 2;
    const right = index * 2 + 1;
    let min = index;
    if (left <= length) {
      const result = cmp(array[left - 1].order, array[min - 1].order);
      if (stable ? result <= 0 : result < 0) {
        min = left;
      }
    }
    if (right <= length) {
      const result = cmp(array[right - 1].order, array[min - 1].order);
      if (stable ? result <= 0 : result < 0) {
        min = right;
      }
    }
    if (min === index) break;
    swap(array, index, min);
    index = min;
    changed ||= true;
  }
  return changed;
}
function swap(array, index1, index2) {
  if (index1 === index2) return;
  const pos1 = index1 - 1;
  const pos2 = index2 - 1;
  const node1 = array[pos1];
  const node2 = array[pos2];
  array[pos1] = node2;
  array[pos2] = node1;
  node1.index = index2;
  node2.index = index1;
}
class MList extends list_1.List {
  constructor(order, heap) {
    super();
    this.order = order;
    this.heap = heap.insert(this, order);
  }
}
class MNode {
  constructor(list, order, value) {
    this.list = list;
    this.order = order;
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
  }
}
class MultiHeap {
  constructor(cmp = MultiHeap.max, options) {
    this.cmp = cmp;
    this.dict = new Map();
    this.list = (0, memoize_1.memoize)(order => {
      return new MList(order, this.heap);
    }, this.dict);
    this.$length = 0;
    this.clean = options?.clean ?? true;
    this.heap = new Heap(this.cmp);
  }
  get length() {
    return this.$length;
  }
  isEmpty() {
    return this.heap.isEmpty();
  }
  peek() {
    return this.heap.peek()?.value.head;
  }
  insert(value, order) {
    if (arguments.length === 1) {
      order = value;
    }
    ++this.$length;
    const node = new MNode(this.list(order), order, value);
    node.list.push(node);
    return node;
  }
  extract() {
    if (this.$length === 0) return;
    --this.$length;
    const list = this.heap.peek()?.value;
    const value = list.shift().value;
    if (list.length === 0) {
      this.heap.extract();
      this.clean && this.dict.delete(list.order);
    }
    return value;
  }
  delete(node) {
    if (node.next === undefined) throw new Error('Invalid node');
    const list = node.list;
    --this.$length;
    if (list.length === 1) {
      this.heap.delete(list.heap);
      this.clean && this.dict.delete(list.order);
    }
    return list.delete(node).value;
  }
  update(node, order, value) {
    const list = node.list;
    if (list === undefined) throw new Error('Invalid node');
    if (arguments.length >= 3) {
      node.value = value;
    }
    if (this.cmp(list.order, order) === 0) return node;
    this.delete(node);
    return this.insert(node.value, order);
  }
  clear() {
    this.heap.clear();
    this.dict.clear();
    this.$length = 0;
  }
}
exports.MultiHeap = MultiHeap;
MultiHeap.max = Heap.max;
MultiHeap.min = Heap.min;

/***/ }),

/***/ 7386:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.compose = void 0;
function compose(target, ...sources) {
  return sources.reduce((b, d) => {
    Object.getOwnPropertyNames(d.prototype).filter(p => !(p in b.prototype)).forEach(p => b.prototype[p] = d.prototype[p]);
    Object.getOwnPropertyNames(d).filter(p => !(p in b)).forEach(p => b[p] = d[p]);
    return b;
  }, target);
}
exports.compose = compose;

/***/ }),

/***/ 8553:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(4974), exports);

/***/ }),

/***/ 4609:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(1952), exports);

/***/ }),

/***/ 1311:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// Memory-efficient flexible list.
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.List = void 0;
class List {
  constructor() {
    this.length = 0;
    this.head = undefined;
  }
  get tail() {
    return this.head?.next;
  }
  get last() {
    return this.head?.prev;
  }
  insert(node, before) {
    if (++this.length === 1) {
      return this.head = node.next = node.prev = node;
    }
    const next = node.next = before ?? this.head;
    const prev = node.prev = next.prev;
    return next.prev = prev.next = node;
  }
  delete(node) {
    if (--this.length === 0) {
      this.head = undefined;
    } else {
      const {
        next,
        prev
      } = node;
      if (node === this.head) {
        this.head = next;
      }
      // Error if not used.
      prev.next = next;
      next.prev = prev;
    }
    node.next = node.prev = undefined;
    return node;
  }
  unshift(node) {
    return this.head = this.insert(node, this.head);
  }
  push(node) {
    return this.insert(node, this.head);
  }
  shift() {
    if (this.length === 0) return;
    return this.delete(this.head);
  }
  pop() {
    if (this.length === 0) return;
    return this.delete(this.head.prev);
  }
  clear() {
    this.length = 0;
    this.head = undefined;
  }
  *[Symbol.iterator]() {
    for (let node = this.head; node !== undefined;) {
      yield node;
      node = node.next;
      if (node === this.head) break;
    }
  }
  flatMap(f) {
    const acc = [];
    for (let node = this.head; node !== undefined;) {
      const as = f(node);
      switch (as.length) {
        case 0:
          break;
        case 1:
          acc.push(as[0]);
          break;
        default:
          for (let len = as.length, i = 0; i < len; ++i) {
            acc.push(as[i]);
          }
      }
      node = node.next;
      if (node === this.head) break;
    }
    return acc;
  }
  find(f) {
    for (let node = this.head; node !== undefined;) {
      if (f(node)) return node;
      node = node.next;
      if (node === this.head) break;
    }
  }
}
exports.List = List;
(function (List) {
  class Node {
    constructor() {
      this.next = undefined;
      this.prev = undefined;
    }
  }
  List.Node = Node;
})(List || (exports.List = List = {}));

/***/ }),

/***/ 4974:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HList = void 0;
const array_1 = __webpack_require__(6876);
function HList(...as) {
  return as.reduceRight((node, a) => node.add(a), HNil);
}
exports.HList = HList;
const HNil = new class HNil {
  add(a) {
    return new HCons(a, this);
  }
  reverse() {
    return [];
  }
  tuple() {
    return [];
  }
}();
class HCons {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  add(a) {
    // @ts-ignore
    return new HCons(a, this);
  }
  modify(f) {
    // @ts-ignore
    return this.tail.add(f(this.head));
  }
  fold(f) {
    // @ts-ignore
    return this.tail.modify(r => f(this.head, r));
  }
  unfold(f) {
    // @ts-ignore
    return this.add(f(this.head));
  }
  reverse() {
    return this.tuple().reverse();
  }
  tuple() {
    return (0, array_1.unshift)([this.head], this.tail.tuple());
  }
}

/***/ }),

/***/ 1952:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// Memory-efficient flexible list.
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.List = void 0;
// LRUではclistの方が速い。
class List {
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.last = undefined;
  }
  get tail() {
    return this.head?.next;
  }
  insert(node, before) {
    if (before === undefined) return this.push(node);
    if (before === this.head) return this.unshift(node);
    if (++this.length === 1) {
      return this.head = this.last = node;
    }
    const next = node.next = before;
    const prev = node.prev = next.prev;
    return next.prev = prev.next = node;
  }
  delete(node) {
    if (--this.length === 0) {
      this.head = this.last = undefined;
    } else {
      const {
        next,
        prev
      } = node;
      prev === undefined ? this.head = next : prev.next = next;
      next === undefined ? this.last = prev : next.prev = prev;
    }
    node.next = node.prev = undefined;
    return node;
  }
  unshift(node) {
    if (++this.length === 1) {
      return this.head = this.last = node;
    }
    node.next = this.head;
    return this.head = this.head.prev = node;
  }
  push(node) {
    if (++this.length === 1) {
      return this.head = this.last = node;
    }
    node.prev = this.last;
    return this.last = this.last.next = node;
  }
  shift() {
    if (this.length === 0) return;
    return this.delete(this.head);
  }
  pop() {
    if (this.length === 0) return;
    return this.delete(this.last);
  }
  clear() {
    this.length = 0;
    this.head = this.last = undefined;
  }
  *[Symbol.iterator]() {
    for (let node = this.head; node !== undefined; node = node.next) {
      yield node;
    }
  }
  flatMap(f) {
    const acc = [];
    for (let node = this.head; node !== undefined; node = node.next) {
      const as = f(node);
      switch (as.length) {
        case 0:
          break;
        case 1:
          acc.push(as[0]);
          break;
        default:
          for (let len = as.length, i = 0; i < len; ++i) {
            acc.push(as[i]);
          }
      }
    }
    return acc;
  }
  find(f) {
    for (let node = this.head; node !== undefined; node = node.next) {
      if (f(node)) return node;
    }
  }
}
exports.List = List;
(function (List) {
  class Node {
    constructor() {
      this.next = undefined;
      this.prev = undefined;
    }
  }
  List.Node = Node;
})(List || (exports.List = List = {}));

/***/ }),

/***/ 6189:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Maybe = exports.Nothing = exports.Just = void 0;
const promise_1 = __webpack_require__(8312);
const curry_1 = __webpack_require__(4042);
const array_1 = __webpack_require__(6876);
class Just {
  constructor(value) {
    this.value = value;
  }
  fmap(f) {
    return new Just(f(this.value));
  }
  ap(a) {
    return Maybe.ap(this, a);
  }
  bind(f) {
    return f(this.value);
  }
  join() {
    return this.value;
  }
  guard(cond) {
    return cond ? this : Maybe.mzero;
  }
  extract(nothing, just) {
    if (just !== undefined) return just(this.value);
    return this.value;
  }
}
class Nothing {
  fmap(f) {
    return this;
  }
  ap(_) {
    return this;
  }
  bind(f) {
    return this;
  }
  join() {
    return this;
  }
  guard(cond) {
    return this;
  }
  extract(nothing) {
    if (nothing !== undefined) return nothing();
    throw new Error(`Spica: Maybe: Nothing value is extracted`);
  }
}
function just(value) {
  return new Just(value);
}
exports.Just = just;
const nothing = new Nothing();
exports.Nothing = nothing;
var Maybe;
(function (Maybe) {
  function fmap(f, m) {
    return m.fmap(f);
  }
  Maybe.fmap = fmap;
  Maybe.pure = just;
  function ap(af, aa) {
    return aa ? af.bind(f => aa.fmap((0, curry_1.curry)(f))) : aa => ap(af, aa);
  }
  Maybe.ap = ap;
  Maybe.Return = Maybe.pure;
  function bind(f, m) {
    return m.bind(f);
  }
  Maybe.bind = bind;
  function sequence(fm) {
    return Array.isArray(fm) ? fm.reduce((acc, m) => acc.bind(as => m.fmap(a => (0, array_1.push)(as, [a]))), Maybe.Return([])) : fm.extract(() => promise_1.AtomicPromise.resolve(Maybe.mzero), a => promise_1.AtomicPromise.resolve(a).then(Maybe.Return));
  }
  Maybe.sequence = sequence;
  Maybe.mzero = nothing;
  function mplus(ml, mr) {
    return ml.extract(() => mr, () => ml);
  }
  Maybe.mplus = mplus;
})(Maybe || (exports.Maybe = Maybe = {}));

/***/ }),

/***/ 6925:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.reduce = exports.memoize = void 0;
const alias_1 = __webpack_require__(5413);
const compare_1 = __webpack_require__(1934);
function memoize(f, identify, memory) {
  if (typeof identify === 'object') {
    memory = identify;
    identify = undefined;
  }
  identify ??= (...as) => as[0];
  switch (true) {
    case (0, alias_1.isArray)(memory):
      return memoizeArray(f, identify, memory);
    case memory?.constructor === Object:
      return memoizeObject(f, identify, memory);
    default:
      return memoizeDict(f, identify, memory ?? new Map());
  }
}
exports.memoize = memoize;
function memoizeArray(f, identify, memory) {
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined) return z;
    z = f(...as);
    memory[b] = z;
    return z;
  };
}
function memoizeObject(f, identify, memory) {
  let nullable = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined || nullable && b in memory) return z;
    z = f(...as);
    nullable ||= z === undefined;
    memory[b] = z;
    return z;
  };
}
function memoizeDict(f, identify, memory) {
  let nullable = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory.get(b);
    if (z !== undefined || nullable && memory.has(b)) return z;
    z = f(...as);
    nullable ||= z === undefined;
    memory.add?.(b, z) ?? memory.set(b, z);
    return z;
  };
}
function reduce(f, identify = (...as) => as[0]) {
  let key = {};
  let val;
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

/***/ }),

/***/ 4455:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Applicative = void 0;
const functor_1 = __webpack_require__(6562);
const curry_1 = __webpack_require__(4042);
class Applicative extends functor_1.Functor {}
exports.Applicative = Applicative;
(function (Applicative) {
  function ap(af, aa) {
    return aa ? af.bind(f => aa.fmap((0, curry_1.curry)(f))) : aa => ap(af, aa);
  }
  Applicative.ap = ap;
})(Applicative || (exports.Applicative = Applicative = {}));

/***/ }),

/***/ 6562:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Functor = void 0;
const lazy_1 = __webpack_require__(2939);
class Functor extends lazy_1.Lazy {}
exports.Functor = Functor;
(function (Functor) {
  function fmap(f, m) {
    return m.fmap(f);
  }
  Functor.fmap = fmap;
})(Functor || (exports.Functor = Functor = {}));

/***/ }),

/***/ 2939:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Lazy = void 0;
class Lazy {
  constructor(thunk) {
    this.thunk = thunk;
    this.$memory = undefined;
  }
  evaluate() {
    return this.$memory ??= this.thunk();
  }
}
exports.Lazy = Lazy;

/***/ }),

/***/ 862:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Monad = void 0;
const applicative_1 = __webpack_require__(4455);
class Monad extends applicative_1.Applicative {}
exports.Monad = Monad;
(function (Monad) {
  function bind(f, m) {
    return m.bind(f);
  }
  Monad.bind = bind;
  //export declare function sequence<a>(fm: Monad<PromiseLike<a>>): AtomicPromise<Monad<a>>;
})(Monad || (exports.Monad = Monad = {}));

/***/ }),

/***/ 6978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MonadPlus = void 0;
const monad_1 = __webpack_require__(862);
class MonadPlus extends monad_1.Monad {}
exports.MonadPlus = MonadPlus;
(function (MonadPlus) {})(MonadPlus || (exports.MonadPlus = MonadPlus = {}));

/***/ }),

/***/ 6276:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Sequence = void 0;
__webpack_require__(654);
__webpack_require__(2877);
__webpack_require__(6931);
__webpack_require__(9698);
__webpack_require__(6117);
__webpack_require__(9090);
__webpack_require__(2486);
__webpack_require__(5834);
__webpack_require__(8136);
__webpack_require__(1171);
__webpack_require__(1875);
__webpack_require__(8096);
__webpack_require__(6633);
__webpack_require__(8122);
__webpack_require__(1634);
__webpack_require__(3204);
__webpack_require__(5990);
__webpack_require__(4909);
__webpack_require__(8462);
__webpack_require__(968);
__webpack_require__(5720);
__webpack_require__(2685);
__webpack_require__(5759);
__webpack_require__(2104);
__webpack_require__(722);
__webpack_require__(4973);
__webpack_require__(3007);
__webpack_require__(7854);
__webpack_require__(9453);
__webpack_require__(7698);
__webpack_require__(39);
__webpack_require__(6921);
__webpack_require__(9526);
__webpack_require__(1135);
__webpack_require__(4845);
__webpack_require__(406);
__webpack_require__(9664);
__webpack_require__(3511);
__webpack_require__(2003);
__webpack_require__(7519);
__webpack_require__(3367);
__webpack_require__(2395);
__webpack_require__(1380);
__webpack_require__(9642);
__webpack_require__(9731);
var core_1 = __webpack_require__(1472);
Object.defineProperty(exports, "Sequence", ({
  enumerable: true,
  get: function () {
    return core_1.Sequence;
  }
}));

/***/ }),

/***/ 1472:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Sequence = void 0;
const monadplus_1 = __webpack_require__(6978);
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
(function (Sequence) {})(Sequence || (exports.Sequence = Sequence = {}));
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
          return [a, z];
        default:
          throw Sequence.Exception.invalidConsError(arguments);
      }
    }
    Data.cons = cons;
  })(Data = Sequence.Data || (Sequence.Data = {}));
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
  })(Thunk = Sequence.Thunk || (Sequence.Thunk = {}));
  let Iterator;
  (function (Iterator) {
    Iterator.done = () => [undefined, Iterator.done, -1];
    function when(thunk, caseDone, caseIterable) {
      return Sequence.isIterable(thunk) ? caseIterable(thunk, () => when(Thunk.iterator(thunk)(), caseDone, caseIterable)) : caseDone(thunk);
    }
    Iterator.when = when;
  })(Iterator = Sequence.Iterator || (Sequence.Iterator = {}));
  function isIterable(thunk) {
    return Thunk.iterator(thunk) !== Iterator.done;
  }
  Sequence.isIterable = isIterable;
  let Exception;
  (function (Exception) {
    function invalidConsError(args) {
      console.error(args, args.length, args[0], args[1]);
      return new TypeError(`Spica: Sequence: Invalid parameters of cons`);
    }
    Exception.invalidConsError = invalidConsError;
    function invalidDataError(data) {
      console.error(data);
      return new TypeError(`Spica: Sequence: Invalid data`);
    }
    Exception.invalidDataError = invalidDataError;
    function invalidThunkError(thunk) {
      console.error(thunk);
      return new TypeError(`Spica: Sequence: Invalid thunk`);
    }
    Exception.invalidThunkError = invalidThunkError;
  })(Exception = Sequence.Exception || (Sequence.Exception = {}));
})(Sequence || (exports.Sequence = Sequence = {}));
function throwCallError() {
  throw new Error(`Spica: Sequence: Invalid thunk call`);
}

/***/ }),

/***/ 39:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  ap(a) {
    return core_1.Sequence.ap(this, a);
  }
});

/***/ }),

/***/ 6921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  bind(f) {
    return core_1.Sequence.concat(this.fmap(f));
  }
});

/***/ }),

/***/ 5759:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  drop(n) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 3007:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  dropUntil(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  dropWhile(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 4909:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  extract() {
    const acc = [];
    let iter = () => this.iterate();
    while (true) {
      const thunk = iter();
      if (!core_1.Sequence.isIterable(thunk)) return acc;
      acc.push(core_1.Sequence.Thunk.value(thunk));
      iter = core_1.Sequence.Thunk.iterator(thunk);
    }
  }
});

/***/ }),

/***/ 9664:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  filter(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur()));
  }
});

/***/ }),

/***/ 4845:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  filterM(f) {
    return core_1.Sequence.from([0]).bind(() => {
      const xs = this.extract();
      switch (xs.length) {
        case 0:
          return core_1.Sequence.from([[]]);
        default:
          {
            const x = xs.shift();
            return f(x).bind(b => b ? xs.length === 0 ? core_1.Sequence.from([[x]]) : core_1.Sequence.from(xs).filterM(f).fmap(ys => [x, ...ys]) : xs.length === 0 ? core_1.Sequence.from([[]]) : core_1.Sequence.from(xs).filterM(f));
          }
      }
    });
  }
});

/***/ }),

/***/ 7698:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  fmap(f) {
    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 2003:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  foldr(f, z) {
    return new core_1.Sequence((iter = () => this.reduce().iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(z), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).foldr(f, z))))).bind(s => s);
  }
});

/***/ }),

/***/ 7519:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  group(f) {
    return new core_1.Sequence(([iter, acc] = [() => this.iterate(), []], cons) => core_1.Sequence.Iterator.when(iter(), () => acc.length === 0 ? cons() : cons(acc), (thunk, recur) => acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (acc.push(core_1.Sequence.Thunk.value(thunk)), recur()) : cons(acc, [core_1.Sequence.Thunk.iterator(thunk), [core_1.Sequence.Thunk.value(thunk)]])));
  }
});

/***/ }),

/***/ 3367:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  inits() {
    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), this.scanl((b, a) => [...b, a], []).dropWhile(as => as.length === 0));
  }
});

/***/ }),

/***/ 8462:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  iterate() {
    return this.iterate_();
  }
  iterate_(z, i = 0) {
    const data = this.cons(z, core_1.Sequence.Data.cons);
    switch (data.length) {
      case 0:
        return [undefined, core_1.Sequence.Iterator.done, -1];
      case 1:
        return [data[0], () => core_1.Sequence.Iterator.done(), i];
      case 2:
        return [data[0], () => this.iterate_(data[1], i + 1), i];
      default:
        throw core_1.Sequence.Exception.invalidDataError(data);
    }
  }
});

/***/ }),

/***/ 9526:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  join() {
    return core_1.Sequence.concat(this);
  }
});

/***/ }),

/***/ 406:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  map(f) {
    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 1135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  mapM(f) {
    return core_1.Sequence.from([0]).bind(() => {
      const xs = this.extract();
      switch (xs.length) {
        case 0:
          return core_1.Sequence.mempty;
        default:
          {
            const x = xs.shift();
            return f(x).bind(y => xs.length === 0 ? core_1.Sequence.from([[y]]) : core_1.Sequence.from(xs).mapM(f).fmap(ys => [y, ...ys]));
          }
      }
    });
  }
});

/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
const memoize_1 = __webpack_require__(6925);
const memory = (0, memoize_1.memoize)(_ => new Map());
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  memoize() {
    return new core_1.Sequence(([i, memo] = [0, memory(this)], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [i + 1, memo])));
  }
});

/***/ }),

/***/ 9731:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
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
      return core_1.Sequence.Iterator.when(ys.iterate(), () => [ts, r], yt => {
        const y = core_1.Sequence.Thunk.value(yt);
        const {
          0: us,
          1: zs
        } = interleave_(as => f(core_1.Sequence.mappend(core_1.Sequence.from([y]), as)), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(yt)), r);
        return [core_1.Sequence.mappend(core_1.Sequence.from([y]), us), core_1.Sequence.mappend(core_1.Sequence.from([f(core_1.Sequence.mappend(core_1.Sequence.from([t]), core_1.Sequence.mappend(core_1.Sequence.from([y]), us))).extract()]), zs)];
      });
    }
  })).bind(xs => xs));
}

/***/ }),

/***/ 5720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  reduce() {
    return new core_1.Sequence(([i, memo] = [0, new Map()], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [i + 1, memo])));
  }
});

/***/ }),

/***/ 3511:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  scanl(f, z) {
    return new core_1.Sequence(([prev, iter, i] = [z, () => this.iterate(), 0]) => core_1.Sequence.Iterator.when(iter(), () => i === 0 ? core_1.Sequence.Data.cons(z) : core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(prev = f(prev, core_1.Sequence.Thunk.value(thunk)), [prev, core_1.Sequence.Thunk.iterator(thunk), core_1.Sequence.Thunk.index(thunk) + 1])));
  }
});

/***/ }),

/***/ 1380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  segs() {
    return core_1.Sequence.mappend(this.foldr((a, bs) => bs.take(1).bind(b => core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(c => [a, ...c]))]), bs)), core_1.Sequence.from([core_1.Sequence.from([])])).bind(a => a), core_1.Sequence.from([[]]));
  }
});

/***/ }),

/***/ 7854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  sort(cmp) {
    return core_1.Sequence.from(this.extract().sort(cmp));
  }
});

/***/ }),

/***/ 9642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  subsequences() {
    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(() => nonEmptySubsequences(this)));
  }
});
function nonEmptySubsequences(xs) {
  return core_1.Sequence.Iterator.when(xs.iterate(), () => core_1.Sequence.mempty, xt => core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(xt, () => cons(), xt => cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).foldr((ys, r) => core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt), ...ys]])), r), core_1.Sequence.mempty)))).bind(xs => xs)));
}

/***/ }),

/***/ 2395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  tails() {
    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map((_, i, as) => as.slice(i))), core_1.Sequence.from([[]]));
  }
});

/***/ }),

/***/ 2685:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  take(n) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), () => cons(), thunk => core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk))));
  }
});

/***/ }),

/***/ 4973:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  takeUntil(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 2104:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  takeWhile(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons()));
  }
});

/***/ }),

/***/ 9453:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  unique() {
    const memory = new Set();
    return this.filter(a => !memory.has(a) && !!memory.add(a));
  }
});

/***/ }),

/***/ 6117:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static concat(as) {
    return new core_1.Sequence(([ai, bi] = [() => as.iterate(), core_1.Sequence.Iterator.done], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => (bi = bi === core_1.Sequence.Iterator.done ? () => core_1.Sequence.Thunk.value(at).iterate() : bi, core_1.Sequence.Iterator.when(bi(), () => (bi = core_1.Sequence.Iterator.done, ar()), bt => cons(core_1.Sequence.Thunk.value(bt), [() => at, core_1.Sequence.Thunk.iterator(bt)])))));
  }
});

/***/ }),

/***/ 6931:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static cycle(as) {
    return new core_1.Sequence(function cycle([iter, i] = [as[Symbol.iterator](), 0], cons) {
      const result = iter.next();
      return result.done ? cycle([as[Symbol.iterator](), i + 1], cons) : cons(result.value, [iter, i + 1]);
    }).reduce();
  }
});

/***/ }),

/***/ 2486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static difference(a, b, cmp) {
    return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [core_1.Sequence.Iterator.done, core_1.Sequence.Thunk.iterator(bt)])), (at, ar) => core_1.Sequence.Iterator.when(bi(), () => cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Iterator.done]), bt => {
      const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
      if (ord < 0) return cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), () => bt]);
      if (ord > 0) return cons(core_1.Sequence.Thunk.value(bt), [() => at, core_1.Sequence.Thunk.iterator(bt)]);
      return bi = () => core_1.Sequence.Thunk.iterator(bt)(), ar();
    })));
  }
});

/***/ }),

/***/ 2877:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static from(as) {
    return new core_1.Sequence(([iter, i] = [as[Symbol.iterator](), 0], cons) => {
      const result = iter.next();
      return result.done ? cons() : cons(result.value, [iter, i + 1]);
    }).reduce();
  }
});

/***/ }),

/***/ 8136:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static intersect(a, b, cmp) {
    return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => core_1.Sequence.Iterator.when(bi(), () => cons(), (bt, br) => {
      const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
      if (ord < 0) return bi = () => bt, ar();
      if (ord > 0) return br();
      return cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Thunk.iterator(bt)]);
    })));
  }
});

/***/ }),

/***/ 1634:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static mappend(l, r) {
    return core_1.Sequence.mconcat([l, r]);
  }
});

/***/ }),

/***/ 8122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static mconcat(as) {
    return [...as].reduce((a, b) => mconcat(a, b), core_1.Sequence.mempty);
  }
});
function mconcat(a, b) {
  return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [core_1.Sequence.Iterator.done, core_1.Sequence.Thunk.iterator(bt)])), at => cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), bi])));
}

/***/ }),

/***/ 6633:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mempty = new core_1.Sequence((_, cons) => cons()), _a));

/***/ }),

/***/ 5990:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mplus = core_1.Sequence.mappend, _a));

/***/ }),

/***/ 3204:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mzero = core_1.Sequence.mempty, _a));

/***/ }),

/***/ 1171:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static pure(a) {
    return new core_1.Sequence((_, cons) => cons(a));
  }
});

/***/ }),

/***/ 9698:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const alias_1 = __webpack_require__(5413);
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static random(p = () => (0, alias_1.random)()) {
    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence((_, cons) => cons(p(), _))) : this.random().map(r => p[(0, alias_1.floor)(r * p.length)]);
  }
});

/***/ }),

/***/ 654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static resume(iterator) {
    return new core_1.Sequence((iter = iterator, cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }
});

/***/ }),

/***/ 1875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static Return(a) {
    return new core_1.Sequence((_, cons) => cons(a));
  }
});

/***/ }),

/***/ 8096:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static sequence(ms) {
    return ms.reduce((acc, m) => acc.fmap(bs => core_1.Sequence.mappend(bs, m)), core_1.Sequence.Return(core_1.Sequence.from([])));
  }
});

/***/ }),

/***/ 5834:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static union(a, b, cmp) {
    return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [core_1.Sequence.Iterator.done, core_1.Sequence.Thunk.iterator(bt)])), at => core_1.Sequence.Iterator.when(bi(), () => cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Iterator.done]), bt => {
      const ord = cmp(core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt));
      if (ord < 0) return cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), () => bt]);
      if (ord > 0) return cons(core_1.Sequence.Thunk.value(bt), [() => at, core_1.Sequence.Thunk.iterator(bt)]);
      return cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Thunk.iterator(bt)]);
    })));
  }
});

/***/ }),

/***/ 9090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const core_1 = __webpack_require__(1472);
const compose_1 = __webpack_require__(7386);
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static zip(a, b) {
    return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), at => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons([core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt)], [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Thunk.iterator(bt)]))));
  }
});

/***/ }),

/***/ 5995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Observation = void 0;
const alias_1 = __webpack_require__(5413);
const list_1 = __webpack_require__(4609);
const array_1 = __webpack_require__(6876);
const function_1 = __webpack_require__(1825);
const exception_1 = __webpack_require__(6192);
class Node {
  constructor(value) {
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
  }
}
class ListenerNode {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.mid = 0;
    this.sid = 0;
    this.monitors = new list_1.List();
    this.subscribers = new list_1.List();
    this.index = new Map();
    this.children = new list_1.List();
  }
  reset(listeners) {
    switch (listeners) {
      case this.monitors:
        this.mid = 0;
        for (let node = listeners.head, i = listeners.length; node && i--; node = node.next) {
          node.value.id = ++this.mid;
        }
        return;
      case this.subscribers:
        this.sid = 0;
        for (let node = listeners.head, i = listeners.length; node && i--; node = node.next) {
          node.value.id = ++this.sid;
        }
        return;
      default:
        throw new Error('Unreachable');
    }
  }
  clear(disposable = false) {
    const {
      monitors,
      subscribers,
      index,
      children
    } = this;
    const stack = [];
    for (let child = children.head, i = children.length; child && i--;) {
      if (child.value.clear(true)) {
        const next = child.next;
        disposable ? stack.push(child.value.name) : index.delete(child.value.name);
        children.delete(child);
        child = next;
      } else {
        child = child.next;
      }
    }
    if (children.length) while (stack.length) {
      index.delete(stack.pop());
    }
    subscribers.clear();
    return monitors.length === 0 && children.length === 0;
  }
}
class Observation {
  constructor(opts) {
    this.node = new ListenerNode(undefined);
    this.limit = opts?.limit ?? 10;
  }
  monitor(namespace, monitor, options = {}) {
    if (typeof monitor !== 'function') throw new Error(`Spica: Observation: Invalid listener: ${monitor}`);
    const node = this.seek(namespace, 0 /* SeekMode.Extensible */);
    const monitors = node.monitors;
    if (monitors.length === this.limit) throw new Error(`Spica: Observation: Exceeded max listener limit`);
    node.mid === alias_1.MAX_SAFE_INTEGER && node.reset(monitors);
    const inode = monitors.push(new Node({
      id: ++node.mid,
      type: 0 /* ListenerType.Monitor */,
      namespace,
      listener: monitor,
      options
    }));
    return (0, function_1.singleton)(() => void monitors.delete(inode));
  }
  on(namespace, subscriber, options = {}) {
    if (typeof subscriber !== 'function') throw new Error(`Spica: Observation: Invalid listener: ${subscriber}`);
    const node = this.seek(namespace, 0 /* SeekMode.Extensible */);
    const subscribers = node.subscribers;
    if (subscribers.length === this.limit) throw new Error(`Spica: Observation: Exceeded max listener limit`);
    node.sid === alias_1.MAX_SAFE_INTEGER && node.reset(subscribers);
    const inode = subscribers.push(new Node({
      id: ++node.sid,
      type: 1 /* ListenerType.Subscriber */,
      namespace,
      listener: subscriber,
      options
    }));
    return (0, function_1.singleton)(() => void subscribers.delete(inode));
  }
  once(namespace, subscriber) {
    return this.on(namespace, subscriber, {
      once: true
    });
  }
  off(namespace, subscriber) {
    if (subscriber) {
      const list = this.seek(namespace, 1 /* SeekMode.Breakable */)?.subscribers;
      const node = list?.find(node => node.value.listener === subscriber);
      node && list?.delete(node);
    } else {
      void this.seek(namespace, 1 /* SeekMode.Breakable */)?.clear();
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
    this.relaies ??= new WeakSet();
    if (this.relaies.has(source)) throw new Error(`Spica: Observation: Relay source is already registered`);
    this.relaies.add(source);
    return source.monitor([], (data, namespace) => void this.emit(namespace, data));
  }
  refs(namespace) {
    const node = this.seek(namespace, 1 /* SeekMode.Breakable */);
    if (node === undefined) return [];
    return this.listenersBelow(node).reduce((acc, listeners) => (0, array_1.push)(acc, listeners.flatMap(node => [node.value])), []);
  }
  drain(namespace, data, tracker) {
    let node = this.seek(namespace, 1 /* SeekMode.Breakable */);
    const results = [];
    for (let lists = node ? this.listenersBelow(node, 1 /* ListenerType.Subscriber */) : [], i = 0; i < lists.length; ++i) {
      const items = lists[i];
      if (items.length === 0) continue;
      const recents = [];
      const max = items.last.value.id;
      let min = 0;
      let prev;
      for (let node = items.head; node && min < node.value.id && node.value.id <= max;) {
        min = node.value.id;
        const item = node.value;
        item.options.once && items.delete(node);
        try {
          const result = item.listener(data, namespace);
          tracker && results.push(result);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }
        (node.next !== undefined || node.prev !== undefined || items.head === node) && recents.push(node);
        node = node.next ?? prev?.next ?? rollback(recents, item => item.next) ?? items.head;
        prev = node?.prev;
      }
    }
    node ??= this.seek(namespace, 2 /* SeekMode.Closest */);
    for (let lists = this.listenersAbove(node, 0 /* ListenerType.Monitor */), i = 0; i < lists.length; ++i) {
      const items = lists[i];
      if (items.length === 0) continue;
      const recents = [];
      const max = items.last.value.id;
      let min = 0;
      let prev;
      for (let node = items.head; node && min < node.value.id && node.value.id <= max;) {
        min = node.value.id;
        const item = node.value;
        item.options.once && items.delete(node);
        try {
          item.listener(data, namespace);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }
        (node.next !== undefined || node.prev !== undefined || items.head === node) && recents.push(node);
        node = node.next ?? prev?.next ?? rollback(recents, item => item.next) ?? items.head;
        prev = node?.prev;
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
  seek(namespace, mode) {
    let node = this.node;
    for (let i = 0; i < namespace.length; ++i) {
      const name = namespace[i];
      const {
        index,
        children
      } = node;
      let child = index.get(name);
      if (child === undefined) {
        switch (mode) {
          case 1 /* SeekMode.Breakable */:
            return;
          case 2 /* SeekMode.Closest */:
            return node;
        }
        child = new ListenerNode(name, node);
        index.set(name, child);
        children.push(new Node(child));
      }
      node = child;
    }
    return node;
  }
  listenersAbove({
    parent,
    monitors
  }) {
    const acc = [monitors];
    while (parent) {
      acc.push(parent.monitors);
      parent = parent.parent;
    }
    return acc;
  }
  listenersBelow(node, type) {
    return this.listenersBelow$(node, type, [])[0];
  }
  listenersBelow$({
    monitors,
    subscribers,
    index,
    children
  }, type, acc) {
    switch (type) {
      case 1 /* ListenerType.Subscriber */:
        acc.push(subscribers);
        break;
      default:
        acc.push(monitors, subscribers);
    }
    let count = 0;
    for (let child = children.head, i = children.length; child && i--;) {
      const cnt = this.listenersBelow$(child.value, type, acc)[1];
      count += cnt;
      if (cnt === 0) {
        const next = child.next;
        index.delete(child.value.name);
        children.delete(child);
        child = next;
      } else {
        child = child.next;
      }
    }
    return [acc, monitors.length + subscribers.length + count];
  }
}
exports.Observation = Observation;
function rollback(array, matcher) {
  for (let i = array.length; i--;) {
    if (matcher(array[i])) return array[i];
    array.pop();
  }
}

/***/ }),

/***/ 8312:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.never = exports.isPromiseLike = exports.Internal = exports.AtomicPromise = exports.internal = void 0;
const alias_1 = __webpack_require__(5413);
const function_1 = __webpack_require__(1825);
exports.internal = Symbol.for('spica/promise::internal');
class AtomicPromise {
  static get [(_a = Symbol.toStringTag, Symbol.species)]() {
    return AtomicPromise;
  }
  static all(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = Array(values.length);
      let done = false;
      let count = 0;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        if (!isPromiseLike(value)) {
          results[i] = value;
          ++count;
          continue;
        }
        if (isAtomicPromiseLike(value)) {
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              results[i] = status.value;
              ++count;
              continue;
            case 3 /* State.rejected */:
              return reject(status.reason);
          }
        }
        value.then(value => {
          results[i] = value;
          ++count;
          count === values.length && resolve(results);
        }, reason => {
          reject(reason);
          done = true;
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
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              return resolve(status.value);
            case 3 /* State.rejected */:
              return reject(status.reason);
          }
        }
      }
      let done = false;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        value.then(value => {
          resolve(value);
          done = true;
        }, reason => {
          reject(reason);
          done = true;
        });
      }
    });
  }
  static allSettled(vs) {
    return new AtomicPromise(resolve => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = Array(values.length);
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
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              results[i] = {
                status: 'fulfilled',
                value: status.value
              };
              ++count;
              continue;
            case 3 /* State.rejected */:
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
  static any(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const reasons = Array(values.length);
      let done = false;
      let count = 0;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        if (!isPromiseLike(value)) {
          return resolve(value);
        }
        if (isAtomicPromiseLike(value)) {
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              return resolve(status.value);
            case 3 /* State.rejected */:
              reasons[i] = status.reason;
              ++count;
              continue;
          }
        }
        value.then(value => {
          resolve(value);
          done = true;
        }, reason => {
          reasons[i] = reason;
          ++count;
          count === values.length && reject(new AggregateError(reasons, 'All promises were rejected'));
        });
      }
      count === values.length && reject(new AggregateError(reasons, 'All promises were rejected'));
    });
  }
  static resolve(value) {
    const p = new AtomicPromise(function_1.noop);
    p[exports.internal].resolve(value);
    return p;
  }
  static reject(reason) {
    const p = new AtomicPromise(function_1.noop);
    p[exports.internal].reject(reason);
    return p;
  }
  constructor(executor) {
    this[_a] = 'Promise';
    this[_b] = new Internal();
    if (executor === function_1.noop) return;
    try {
      executor(value => void this[exports.internal].resolve(value), reason => void this[exports.internal].reject(reason));
    } catch (reason) {
      this[exports.internal].reject(reason);
    }
  }
  then(onfulfilled, onrejected) {
    const p = new AtomicPromise(function_1.noop);
    this[exports.internal].then(p[exports.internal], onfulfilled, onrejected);
    return p;
  }
  catch(onrejected) {
    return this.then(undefined, onrejected);
  }
  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }
}
exports.AtomicPromise = AtomicPromise;
_b = exports.internal;
class Internal {
  constructor() {
    this.status = {
      state: 0 /* State.pending */
    };
    this.fulfillReactions = [];
    this.rejectReactions = [];
  }
  isPending() {
    return this.status.state === 0 /* State.pending */;
  }
  resolve(value) {
    if (!this.isPending()) return;
    if (!isPromiseLike(value)) {
      this.status = {
        state: 2 /* State.fulfilled */,
        value: value
      };
      return this.resume();
    }
    if (isAtomicPromiseLike(value)) {
      return value[exports.internal].then(this);
    }
    this.status = {
      state: 1 /* State.resolved */,
      promise: value
    };
    return void value.then(value => {
      this.status = {
        state: 2 /* State.fulfilled */,
        value
      };
      this.resume();
    }, reason => {
      this.status = {
        state: 3 /* State.rejected */,
        reason
      };
      this.resume();
    });
  }
  reject(reason) {
    if (!this.isPending()) return;
    this.status = {
      state: 3 /* State.rejected */,
      reason
    };
    return this.resume();
  }
  then(internal, onfulfilled, onrejected) {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;
    switch (status.state) {
      case 2 /* State.fulfilled */:
        if (fulfillReactions.length !== 0) break;
        return call(internal, true, onfulfilled, status.value);
      case 3 /* State.rejected */:
        if (rejectReactions.length !== 0) break;
        return call(internal, false, onrejected, status.reason);
    }
    fulfillReactions.push({
      internal,
      state: true,
      procedure: onfulfilled
    });
    rejectReactions.push({
      internal,
      state: false,
      procedure: onrejected
    });
  }
  resume() {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;
    switch (status.state) {
      case 0 /* State.pending */:
      case 1 /* State.resolved */:
        return;
      case 2 /* State.fulfilled */:
        if (rejectReactions.length !== 0) {
          this.rejectReactions = [];
        }
        if (fulfillReactions.length === 0) return;
        react(fulfillReactions, status.value);
        this.fulfillReactions = [];
        return;
      case 3 /* State.rejected */:
        if (fulfillReactions.length !== 0) {
          this.fulfillReactions = [];
        }
        if (rejectReactions.length === 0) return;
        react(rejectReactions, status.reason);
        this.rejectReactions = [];
        return;
    }
  }
}
exports.Internal = Internal;
function react(reactions, param) {
  for (let i = 0; i < reactions.length; ++i) {
    const {
      internal,
      state,
      procedure
    } = reactions[i];
    call(internal, state, procedure, param);
  }
}
function call(internal, state, procedure, param) {
  if (procedure == null) return state ? internal.resolve(param) : internal.reject(param);
  try {
    internal.resolve(procedure(param));
  } catch (reason) {
    internal.reject(reason);
  }
}
function isPromiseLike(value) {
  return value != null && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
}
exports.isPromiseLike = isPromiseLike;
function isAtomicPromiseLike(value) {
  return exports.internal in value;
}
exports.never = new class Never extends Promise {
  static get [Symbol.species]() {
    return Never;
  }
  constructor() {
    super(function_1.noop);
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

/***/ }),

/***/ 4110:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MultiQueue = exports.PriorityQueue = exports.Queue = void 0;
const heap_1 = __webpack_require__(3719);
const memoize_1 = __webpack_require__(6925);
const size = 2048;
const initsize = 16;
class Queue {
  constructor() {
    this.head = new FixedQueue(initsize);
    this.tail = this.head;
    this.count = 0;
  }
  get length() {
    return this.head === this.tail ? this.head.length : this.head.length + this.count + this.tail.length;
  }
  // Faster than queue.length > 0.
  isEmpty() {
    return this.head.isEmpty();
  }
  peek(index = 0) {
    return index === 0 ? this.head.peek(0) : this.tail.peek(-1);
  }
  push(value) {
    const tail = this.tail;
    if (tail.isFull()) {
      if (tail.next.isEmpty()) {
        this.tail = tail.next;
      } else {
        this.tail = tail.next = new FixedQueue(size, tail.next);
      }
      if (this.head !== tail) {
        this.count += tail.size;
      }
    }
    this.tail.push(value);
  }
  pop() {
    const head = this.head;
    const value = head.pop();
    if (head.isEmpty() && !head.next.isEmpty()) {
      const tail = this.tail;
      // 空になるごとの削除と再作成を避ける
      if (tail.next !== head) {
        // 初期サイズの方を消す
        tail.next.next = tail.next;
        tail.next = head;
      }
      this.head = head.next;
      if (this.head !== tail) {
        this.count -= head.next.size;
      }
    }
    return value;
  }
  clear() {
    this.head = this.tail = new FixedQueue(initsize);
    this.count = 0;
  }
  *[Symbol.iterator]() {
    while (!this.isEmpty()) {
      yield this.pop();
    }
  }
}
exports.Queue = Queue;
class FixedQueue {
  constructor(size, next) {
    this.size = size;
    this.array = Array(this.size);
    this.mask = this.array.length - 1;
    this.head = 0;
    this.tail = 0;
    // 1要素無駄にしフラグを使用しない場合と有意差がないため可読性とテスト性を優先しフラグを使用。
    this.empty = true;
    this.next = next ?? this;
  }
  get length() {
    return this.tail >= this.head ? this.empty ? 0 : this.tail - this.head || this.size : this.array.length - this.head + this.tail;
  }
  isEmpty() {
    return this.empty;
  }
  isFull() {
    return this.tail === this.head && !this.empty;
  }
  peek(index = 0) {
    return index >= 0 ? this.array[this.head + index & this.mask] : this.array[this.tail + index & this.mask];
  }
  push(value) {
    this.array[this.tail] = value;
    this.tail = this.tail + 1 & this.mask;
    this.empty = false;
  }
  pop() {
    if (this.empty) return;
    const value = this.array[this.head];
    this.array[this.head] = undefined;
    this.head = this.head + 1 & this.mask;
    // isEmptyの前倒し
    this.empty = this.tail === this.head;
    return value;
  }
}
class PriorityQueue {
  constructor(cmp = PriorityQueue.max, clean = true) {
    this.clean = clean;
    this.dict = new Map();
    this.queue = (0, memoize_1.memoize)(priority => {
      const queue = new Queue();
      queue[PriorityQueue.priority] = priority;
      this.heap.insert(queue, priority);
      return queue;
    }, this.dict);
    this.$length = 0;
    this.heap = new heap_1.Heap(cmp);
  }
  get length() {
    return this.$length;
  }
  isEmpty() {
    return this.$length === 0;
  }
  peek(priority) {
    return arguments.length === 0 ? this.heap.peek()?.value.peek() : this.dict.get(priority)?.peek();
  }
  push(priority, value) {
    ++this.$length;
    this.queue(priority).push(value);
  }
  pop(priority) {
    if (this.$length === 0) return;
    --this.$length;
    const queue = arguments.length === 0 ? this.heap.peek().value : this.dict.get(priority);
    const value = queue?.pop();
    if (queue?.isEmpty()) {
      this.heap.extract();
      this.clean && this.dict.delete(queue[PriorityQueue.priority]);
    }
    return value;
  }
  clear() {
    this.heap.clear();
    this.dict.clear();
    this.$length = 0;
  }
  *[Symbol.iterator]() {
    while (!this.isEmpty()) {
      yield this.pop();
    }
  }
}
exports.PriorityQueue = PriorityQueue;
PriorityQueue.priority = Symbol('priority');
PriorityQueue.max = heap_1.Heap.max;
PriorityQueue.min = heap_1.Heap.min;
class MultiQueue {
  constructor(entries) {
    this.dict = new Map();
    if (entries) for (const {
      0: k,
      1: v
    } of entries) {
      this.set(k, v);
    }
  }
  get length() {
    return this.dict.size;
  }
  isEmpty() {
    return this.dict.size === 0;
  }
  peek(key) {
    return this.dict.get(key)?.peek();
  }
  push(key, value) {
    let vs = this.dict.get(key);
    if (vs) return void vs.push(value);
    vs = new Queue();
    vs.push(value);
    this.dict.set(key, vs);
  }
  pop(key) {
    return this.dict.get(key)?.pop();
  }
  clear() {
    this.dict = new Map();
  }
  take(key, count) {
    if (count === undefined) return this.pop(key);
    const vs = this.dict.get(key);
    const acc = [];
    while (vs && !vs.isEmpty() && count--) {
      acc.push(vs.pop());
    }
    return acc;
  }
  ref(key) {
    let vs = this.dict.get(key);
    if (vs) return vs;
    vs = new Queue();
    this.dict.set(key, vs);
    return vs;
  }
  get size() {
    return this.length;
  }
  get(key) {
    return this.peek(key);
  }
  set(key, value) {
    this.push(key, value);
    return this;
  }
  has(key) {
    return this.dict.has(key);
  }
  delete(key) {
    return this.dict.delete(key);
  }
  *[Symbol.iterator]() {
    for (const {
      0: k,
      1: vs
    } of this.dict) {
      while (!vs.isEmpty()) {
        yield [k, vs.pop()];
      }
    }
  }
}
exports.MultiQueue = MultiQueue;

/***/ }),

/***/ 2027:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Ring = void 0;
const alias_1 = __webpack_require__(5413);
const array_1 = __webpack_require__(6876);
const empty = Symbol('empty');
const unempty = value => value === empty ? undefined : value;
const space = Object.freeze(Array(100).fill(empty));
let size = 16;
class Ring {
  constructor() {
    this.array = Array(size);
    this.head = 0;
    this.tail = 0;
    this.$length = 0;
    this.excess = 0;
  }
  get length() {
    return this.$length;
  }
  at(index) {
    // Inline the code for optimization.
    const array = this.array;
    if (index >= 0) {
      if (index >= this.$length) return;
      return unempty(array[(this.head - 1 + index) % array.length]);
    } else {
      if (-index > this.$length) return;
      return this.tail + index >= 0 ? unempty(array[this.tail + index]) : unempty(array[array.length + this.tail + index]);
    }
  }
  set(index, value, replacer) {
    const array = this.array;
    if (index >= 0) {
      if (index >= this.$length) throw new RangeError('Invalid index');
      index = (this.head - 1 + index) % array.length;
    } else {
      if (-index > this.$length) throw new RangeError('Invalid index');
      index = this.tail + index >= 0 ? this.tail + index : array.length + this.tail + index;
    }
    const val = unempty(array[index]);
    array[index] = replacer ? replacer(val, value) : value;
    return val;
  }
  push(value) {
    const array = this.array;
    let {
      head,
      tail
    } = this;
    tail = this.tail = next(head, tail, array.length);
    head = this.head ||= tail;
    if (head === tail && this.$length !== 0) {
      (0, array_1.splice)(array, tail - 1, 0, ...space);
      head = this.head += space.length;
    }
    array[tail - 1] = value;
    ++this.$length;
  }
  unshift(value) {
    const array = this.array;
    let {
      head,
      tail
    } = this;
    head = this.head = prev(head, tail, array.length);
    tail = this.tail ||= head;
    if (head === tail && this.$length !== 0) {
      (0, array_1.splice)(array, head, 0, ...space);
      head = this.head += space.length;
    }
    array[head - 1] = value;
    ++this.$length;
  }
  pop() {
    if (this.$length === 0) return;
    const array = this.array;
    const i = this.tail - 1;
    const value = unempty(array[i]);
    array[i] = empty;
    --this.$length === 0 ? this.head = this.tail = 0 : this.tail = this.tail === 1 ? array.length : this.tail - 1;
    return value;
  }
  shift() {
    if (this.$length === 0) return;
    const array = this.array;
    const i = this.head - 1;
    const value = unempty(array[i]);
    array[i] = empty;
    --this.$length === 0 ? this.head = this.tail = 0 : this.head = this.head === array.length ? 1 : this.head + 1;
    return value;
  }
  splice(index, count, ...values) {
    const array = this.array;
    if (this.excess > 100 && array.length - this.$length > 200) {
      (0, array_1.splice)(array, 0, 100 - (0, array_1.splice)(array, this.tail, 100).length);
      this.excess -= 100;
    } else if (-this.excess > array.length * 2) {
      this.excess = array.length;
    }
    index = index < 0 ? (0, alias_1.max)(0, this.$length + index) : index <= this.$length ? index : this.$length;
    count = (0, alias_1.min)((0, alias_1.max)(count, 0), this.$length - index);
    if (values.length === 0) {
      if (count === 0) return [];
      switch (index) {
        case 0:
          if (count === 1) return [this.shift()];
          break;
        case this.$length - 1:
          if (count === 1) return [this.pop()];
          break;
        case this.$length:
          return [];
      }
    }
    index = (this.head || 1) - 1 + index;
    index = index > array.length ? index % array.length : index;
    this.excess += values.length - count;
    this.$length += values.length - count;
    // |--H>*>T--|
    if (this.head <= this.tail) {
      this.tail += values.length - count;
      return (0, array_1.splice)(array, index, count, ...values);
    }
    // |*>T---H>>|
    if (index < this.tail) {
      this.head += values.length - count;
      this.tail += values.length - count;
      return (0, array_1.splice)(array, index, count, ...values);
    }
    // |>>T---H>*|
    const cnt = (0, alias_1.min)(count, array.length - index);
    const vs = (0, array_1.splice)(array, index, cnt, ...(0, array_1.splice)(values, 0, cnt));
    vs.push(...(0, array_1.splice)(array, 0, count - vs.length, ...values));
    return vs;
  }
  clear() {
    this.array = Array(size);
    this.$length = this.head = this.tail = 0;
  }
  includes(value) {
    return this.array.includes(value);
  }
  relational(index) {
    if (index === -1) return -1;
    return index + 1 >= this.head ? index + 1 - this.head : this.array.length - this.head + index;
  }
  indexOf(value) {
    return this.relational((0, array_1.indexOf)(this.array, value));
  }
  findIndex(f) {
    return this.relational(this.array.findIndex(value => value !== empty && f(value)));
  }
  find(f) {
    return unempty(this.array.find(value => value !== empty && f(value)));
  }
  toArray() {
    return this.head <= this.tail ? this.array.slice((this.head || 1) - 1, this.tail) : this.array.slice((this.head || 1) - 1).concat(this.array.slice(0, this.tail));
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.$length; ++i) {
      yield this.at(i);
    }
  }
}
exports.Ring = Ring;
function next(head, tail, length) {
  return tail === length && head !== 1 ? 1 : tail + 1;
}
function prev(head, tail, length) {
  return head === 0 || head === 1 ? tail === length ? length + 1 : length : head - 1;
}

/***/ }),

/***/ 7727:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.router = void 0;
const sequence_1 = __webpack_require__(4252);
const function_1 = __webpack_require__(1825);
const memoize_1 = __webpack_require__(6925);
function router(config) {
  const {
    match
  } = router.helpers();
  const patterns = Object.keys(config).reverse();
  for (const pattern of patterns) {
    if (pattern[0] !== '/') throw new Error(`Spica: Router: Pattern must start with "/": ${pattern}`);
    if (/\s/.test(pattern)) throw new Error(`Spica: Router: Pattern must not have whitespace: ${pattern}`);
  }
  return path => {
    const pathname = path.slice(0, path.search(/[?#]|$/));
    for (const pattern of patterns) {
      if (match(pattern, pathname)) return config[pattern](path);
    }
    throw new Error(`Spica: Router: No matches found`);
  };
}
exports.router = router;
(function (router) {
  function helpers() {
    function match(pattern, path) {
      const regSegment = /\/|[^/]+\/?/g;
      const ss = path.match(regSegment) ?? [];
      for (const pat of expand(pattern)) {
        const ps = optimize(pat).match(regSegment) ?? [];
        if (cmp(ps, ss)) return true;
      }
      return false;
    }
    const expand = (0, memoize_1.memoize)(function expand(pattern) {
      return sequence_1.Sequence.from(parse(pattern).map(token => token[0] + token.slice(-1) === '{}' ? separate(token.slice(1, -1)).flatMap(expand) : [token])).mapM(sequence_1.Sequence.from).extract().map(tokens => tokens.join(''));
    });
    function parse(pattern) {
      const results = [];
      // 先頭の加除はChromeで非常に遅いので末尾を加除する
      const stack = [];
      const mirror = {
        ']': '[',
        ')': '(',
        '}': '{'
      };
      const nonsyms = [];
      let inonsyms = 0;
      let len = pattern.length;
      let buffer = '';
      BT: while (len) for (const token of pattern.match(/\\.?|[\[\](){}]|[^\\\[\](){}]+|$/g)) {
        switch (token) {
          case '':
            if (stack.length !== 0) {
              pattern = buffer;
              stack.splice(0, stack.length);
              len = pattern.length;
              buffer = '';
              continue BT;
            }
            flush();
            continue;
          case '[':
          case '(':
            // Prohibit unimplemented patterns.
            if (true) throw new Error(`Spica: Router: Invalid pattern: ${pattern}`);
            if (len - buffer.length === nonsyms[inonsyms] && ++inonsyms) break;
            stack.at(-1) !== '[' && stack.push(token) && nonsyms.push(len - buffer.length);
            buffer += token;
            continue;
          case ']':
          case ')':
            stack.at(-1) === mirror[token] && stack.pop() && nonsyms.pop();
            buffer += token;
            continue;
          case '{':
            if (len - buffer.length === nonsyms[inonsyms] && ++inonsyms) break;
            stack.length === 0 && flush();
            stack.at(-1) !== '[' && stack.push(token) && nonsyms.push(len - buffer.length);
            buffer += token;
            continue;
          case '}':
            stack[0] === mirror[token] && stack.pop() && nonsyms.pop();
            buffer += token;
            stack.length === 0 && flush();
            continue;
        }
        buffer += token;
      }
      results.length === 0 && results.push('');
      return results;
      function flush() {
        len -= buffer.length;
        buffer && results.push(buffer);
        buffer = '';
      }
    }
    function separate(pattern) {
      const results = [];
      const stack = [];
      const mirror = {
        ']': '[',
        ')': '(',
        '}': '{'
      };
      let buffer = '';
      for (const token of pattern.match(/\\.?|[,\[\](){}]|[^\\,\[\](){}]+|$/g)) {
        switch (token) {
          case '':
            flush();
            continue;
          case ',':
            stack.length === 0 ? flush() : buffer += token;
            continue;
          case '[':
          case '(':
          case '{':
            buffer += token;
            stack.at(-1) !== '[' && stack.push(token);
            continue;
          case ']':
          case ')':
          case '}':
            stack.at(-1) === mirror[token] && stack.pop();
            buffer += token;
            continue;
        }
        buffer += token;
      }
      return results;
      function flush() {
        results.push(buffer);
        buffer = '';
      }
    }
    function cmp(pats, segs, i = 0, j = 0) {
      if (i + j === 0 && pats.length > 0 && segs.length > 0) {
        if (segs[0] === '.' && ['?', '*'].includes(pats[0][0])) return false;
      }
      for (; i < pats.length; ++i, ++j) {
        const pat = pats[i];
        if (pat === '**') return true;
        if (pat === '**/') {
          let min = pats.length - j;
          for (let k = j; k < pats.length; ++k) {
            pats[k] === '**/' && --min;
          }
          for (let k = segs.length - min; k >= j; --k) {
            if (cmp(pats, segs, i + 1, k)) return true;
          }
          return false;
        } else {
          if (j === segs.length) return false;
          const seg = pat.slice(-1) !== '/' && segs[j].slice(-1) === '/' ? segs[j].slice(0, -1) || segs[j] : segs[j];
          if (!cmp$(split(pat), 0, seg, 0)) return false;
        }
      }
      return true;
    }
    function cmp$(ps, i, segment, j) {
      for (; i < ps.length; ++i) {
        const p = ps[i];
        const s = segment.slice(j);
        switch (p) {
          case '?':
            switch (s) {
              case '':
              case '/':
                return false;
              default:
                ++j;
                continue;
            }
          case '*':
            switch (s) {
              case '':
              case '/':
                continue;
            }
            for (let k = segment.length; k >= j; --k) {
              if (cmp$(ps, i + 1, segment, k)) return true;
            }
            return false;
          default:
            if (s.length < p.length || s.slice(0, p.length) !== p) return false;
            j += p.length;
            continue;
        }
      }
      return j === segment.length;
    }
    function split(pattern) {
      const results = [];
      const stack = [];
      const mirror = {
        ']': '[',
        ')': '(',
        '}': '{'
      };
      let buffer = '';
      for (const token of pattern.match(/\\.?|[*?\[\](){}]|[^\\*?\[\](){}]+|$/g)) {
        switch (token) {
          case '':
            flush();
            continue;
          case '*':
          case '?':
            stack.length === 0 && flush();
            buffer += token;
            stack.length === 0 && flush();
            continue;
          case '[':
          case '(':
          case '{':
            buffer += token;
            stack.at(-1) !== '[' && stack.push(token);
            continue;
          case ']':
          case ')':
          case '}':
            if (token === '}' && stack[0] === '{') throw new Error(`Spica: Router: Invalid pattern: ${pattern}`);
            stack.at(-1) === mirror[token] && stack.pop();
            buffer += token;
            continue;
        }
        buffer += token[0] === '\\' ? token.slice(1) : token;
      }
      return results;
      function flush() {
        buffer && results.push(buffer);
        buffer = '';
      }
    }
    const optimize = (0, memoize_1.memoize)((0, function_1.fix)(pattern => pattern.replace(/((?:^|\/)\*)\*(?:\/\*\*)*(?=\/|$)|\*+(\?+)?/g, '$1$2*')));
    return {
      match,
      expand,
      cmp
    };
  }
  router.helpers = helpers;
})(router || (exports.router = router = {}));

/***/ }),

/***/ 4252:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(6276), exports);

/***/ }),

/***/ 7345:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Stack = void 0;
class Stack {
  constructor() {
    this.array = [];
  }
  get length() {
    return this.array.length;
  }
  isEmpty() {
    return this.array.length === 0;
  }
  peek(index = 0) {
    return index === 0 ? this.array.at(-1) : this.array[0];
  }
  push(value) {
    this.array.push(value);
  }
  pop() {
    return this.array.pop();
  }
  clear() {
    this.array = [];
  }
  *[Symbol.iterator]() {
    while (!this.isEmpty()) {
      yield this.pop();
    }
  }
}
exports.Stack = Stack;

/***/ }),

/***/ 7339:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Supervisor = void 0;
const alias_1 = __webpack_require__(5413);
const chrono_1 = __webpack_require__(9522);
const coroutine_1 = __webpack_require__(8779);
const observer_1 = __webpack_require__(5995);
const promise_1 = __webpack_require__(8312);
const future_1 = __webpack_require__(9998);
const function_1 = __webpack_require__(1825);
const ring_1 = __webpack_require__(2027);
const exception_1 = __webpack_require__(6192);
class Supervisor extends coroutine_1.Coroutine {
  static get instances() {
    return this.hasOwnProperty('$instances') ? this.$instances : this.$instances = new Set();
  }
  static get status() {
    if (this.hasOwnProperty('$status')) return this.$status;
    const {
      instances
    } = this;
    return this.$status = {
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
        sv.terminate(reason);
      }
    }
  }
  constructor(opts = {}) {
    super(async function* () {
      return await this.state;
    }, {
      delay: false
    });
    this.state = new future_1.AtomicFuture();
    this.settings = {
      name: '',
      capacity: Infinity,
      timeout: Infinity,
      destructor: function_1.noop,
      scheduler: chrono_1.clock.next,
      resource: 10
    };
    this.workers = new Map();
    this.alive = true;
    this.available = true;
    this[_a] = {
      ask: () => {
        throw new Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port`);
      },
      recv: () => {
        throw new Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port`);
      },
      send: () => {
        throw new Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port`);
      },
      connect: () => {
        throw new Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port`);
      }
    };
    this.scheduled = false;
    // Bug: Karma and TypeScript
    this.messages = new ring_1.Ring();
    (0, alias_1.ObjectAssign)(this.settings, opts);
    this.name = this.settings.name;
    if (this.constructor === Supervisor) throw new Error(`Spica: Supervisor: <${this.name}>: Cannot instantiate abstract classes`);
    this.constructor.instances.add(this);
  }
  destructor(reason) {
    this.available = false;
    this.clear(reason);
    Object.freeze(this.workers);
    while (this.messages.length > 0) {
      const {
        0: names,
        1: param,
        4: timer
      } = this.messages.shift();
      const name = names[Symbol.iterator]().next().value;
      timer && clearTimeout(timer);
      this.$events?.loss.emit([name], [name, param]);
    }
    this.alive = false;
    // @ts-ignore #31251
    this.constructor.instances.delete(this);
    Object.freeze(this);
    this.settings.destructor(reason);
    this.state.bind(reason === undefined ? undefined : promise_1.AtomicPromise.reject(reason));
  }
  get events() {
    return this.$events ??= {
      init: new observer_1.Observation(),
      exit: new observer_1.Observation(),
      loss: new observer_1.Observation()
    };
  }
  throwErrorIfNotAvailable() {
    if (!this.available) throw new Error(`Spica: Supervisor: <${this.name}>: Cannot use terminated supervisors`);
  }
  register(name, process, state) {
    state = state;
    this.throwErrorIfNotAvailable();
    if ((0, coroutine_1.isCoroutine)(process)) {
      const port = process[process.constructor.port];
      const proc = {
        init: state => state,
        main: (param, state, kill) => port.ask(param).then(({
          value: reply,
          done
        }) => done && void kill() || [reply, state]),
        exit: reason => void process[process.constructor.terminate](reason)
      };
      this.constructor.standalone.add(proc);
      const kill = this.register(name, proc, state);
      process.catch(kill);
      return kill;
    }
    if (isAsyncGeneratorFunction(process)) {
      let iter;
      return this.register(name, {
        init: (state, kill) => (iter = process(state, kill), iter.next().catch(kill), state),
        main: (param, state, kill) => promise_1.AtomicPromise.resolve(iter.next(param)).then(({
          value: reply,
          done
        }) => done && void kill() || [reply, state]),
        exit: function_1.noop
      }, state);
    }
    if (isGeneratorFunction(process)) {
      let iter;
      return this.register(name, {
        init: (state, kill) => (iter = process(state, kill), iter.next(), state),
        main: (param, state, kill) => {
          const {
            value: reply,
            done
          } = iter.next(param);
          done && kill();
          return [reply, state];
        },
        exit: function_1.noop
      }, state);
    }
    if (typeof process === 'function') {
      return this.register(name, {
        init: state => state,
        main: process,
        exit: function_1.noop
      }, state);
    }
    if (this.workers.has(name)) throw new Error(`Spica: Supervisor: <${this.name}/${name}>: Cannot register another process with tha same name`);
    this.schedule();
    const worker = new Worker(name, process, state, this, () => void this.schedule(), this.constructor.standalone.has(process), this.$events, () => {
      this.workers.get(name) === worker && void this.workers.delete(name);
    });
    this.workers.set(name, worker);
    return worker.terminate;
  }
  call(name, param, callback, timeout = this.settings.timeout) {
    if (typeof callback !== 'function') return new promise_1.AtomicPromise((resolve, reject) => void this.call(name, param, (err, result) => err ? reject(err) : resolve(result), callback));
    this.throwErrorIfNotAvailable();
    this.messages.push([typeof name === 'string' ? [name] : new NamePool(this.workers, name), param, callback, Date.now() + timeout, 0]);
    while (this.messages.length > (this.available ? this.settings.capacity : 0)) {
      const {
        0: names,
        1: param,
        2: callback,
        4: timer
      } = this.messages.shift();
      timer && clearTimeout(timer);
      const name = names[Symbol.iterator]().next().value;
      this.$events?.loss.emit([name], [name, param]);
      try {
        callback(new Error(`Spica: Supervisor: <${this.name}>: Message overflowed`), undefined);
      } catch (reason) {
        (0, exception_1.causeAsyncException)(reason);
      }
    }
    if (this.messages.length === 0) return;
    this.throwErrorIfNotAvailable();
    this.schedule();
    if (timeout > 0 && timeout !== Infinity) {
      this.messages.at(-1)[4] = setTimeout(() => void this.schedule(), timeout + 3);
    }
  }
  cast(name, param, timeout = this.settings.timeout) {
    this.throwErrorIfNotAvailable();
    const expire = Date.now() + timeout;
    let result;
    for (name of typeof name === 'string' ? [name] : new NamePool(this.workers, name)) {
      if (result = this.workers.get(name)?.call([param, expire])) break;
    }
    if (result) return result;
    const n = typeof name === 'string' ? name : undefined;
    this.$events?.loss.emit([n], [n, param]);
  }
  refs(name) {
    return name === undefined ? [...this.workers.values()].map(convert) : this.workers.has(name) ? [convert(this.workers.get(name))] : [];
    function convert(worker) {
      return [worker.name, worker.process, worker.state, worker.terminate];
    }
  }
  kill(name, reason) {
    if (!this.available) return false;
    return this.workers.has(name) ? this.workers.get(name).terminate(reason) : false;
  }
  clear(reason) {
    while (this.workers.size > 0) {
      for (const worker of this.workers.values()) {
        worker.terminate(reason);
      }
    }
  }
  terminate(reason) {
    if (!this.available) return false;
    this.destructor(reason);
    this[coroutine_1.Coroutine.exit](undefined);
    return true;
  }
  [coroutine_1.Coroutine.terminate](reason) {
    this.terminate(reason);
  }
  schedule() {
    if (!this.available || this.scheduled || this.messages.length === 0) return;
    this.scheduled = true;
    const p = new future_1.AtomicFuture(false);
    p.finally(() => {
      this.scheduled = false;
      this.deliver();
    });
    this.settings.scheduler.call(undefined, p.bind);
    this.settings.scheduler === requestAnimationFrame && setTimeout(p.bind, 1000);
  }
  deliver() {
    if (!this.available) return;
    const since = Date.now();
    for (let len = this.messages.length, i = 0; this.available && i < len; ++i) {
      if (this.settings.resource - (Date.now() - since) <= 0) return void this.schedule();
      const {
        0: names,
        1: param,
        2: callback,
        3: expiration,
        4: timer
      } = this.messages.at(i);
      let result;
      let name;
      for (name of typeof names === 'string' ? [names] : names) {
        if (Date.now() > expiration) break;
        if (result = this.workers.get(name)?.call([param, expiration])) break;
      }
      if (!result && Date.now() < expiration) continue;
      this.messages.splice(i, 1);
      --i;
      --len;
      timer && clearTimeout(timer);
      if (result) {
        result.then(reply => void callback(undefined, reply), () => void callback(new Error(`Spica: Supervisor: <${this.name}>: Process failed`), undefined));
      } else {
        this.$events?.loss.emit([name], [name, param]);
        try {
          callback(new Error(`Spica: Supervisor: <${this.name}>: Message expired`), undefined);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }
      }
    }
  }
}
exports.Supervisor = Supervisor;
_a = coroutine_1.Coroutine.port;
Supervisor.standalone = new WeakSet();
function isAsyncGeneratorFunction(process) {
  return process[Symbol.toStringTag] === 'AsyncGeneratorFunction';
}
function isGeneratorFunction(process) {
  return process[Symbol.toStringTag] === 'GeneratorFunction';
}
class NamePool {
  constructor(workers, selector) {
    this.workers = workers;
    this.selector = selector;
  }
  [Symbol.iterator]() {
    return this.selector(this.workers.keys())[Symbol.iterator]();
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
      if (!this.alive) return false;
      this.destructor(reason);
      return true;
    };
    initiated && this.init();
  }
  destructor(reason) {
    this.alive = false;
    this.available = false;
    Object.freeze(this);
    try {
      this.destructor_();
    } catch (reason) {
      (0, exception_1.causeAsyncException)(reason);
    }
    if (this.initiated) {
      this.exit(reason);
    }
  }
  init() {
    this.initiated = true;
    this.events?.init.emit([this.name], [this.name, this.process, this.state]);
    this.state = this.process.init(this.state, this.terminate);
  }
  exit(reason) {
    try {
      this.process.exit(reason, this.state);
      this.events?.exit.emit([this.name], [this.name, this.process, this.state, reason]);
    } catch (reason_) {
      this.events?.exit.emit([this.name], [this.name, this.process, this.state, reason]);
      this.sv.terminate(reason_);
    }
  }
  call([param, expiration]) {
    if (!this.available) return;
    return new promise_1.AtomicPromise((resolve, reject) => {
      (0, alias_1.isFinite)(expiration) && setTimeout(() => void reject(new Error()), expiration - Date.now());
      this.available = false;
      if (!this.initiated) {
        this.init();
        if (!this.alive) return void reject();
      }
      promise_1.AtomicPromise.resolve(this.process.main(param, this.state, this.terminate)).then(resolve, reject);
    }).then(([reply, state]) => {
      if (this.alive) {
        this.schedule();
        this.state = state;
        this.available = true;
      }
      return reply;
    }).catch(reason => {
      this.schedule();
      this.terminate(reason);
      throw reason;
    });
  }
}

/***/ }),

/***/ 525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.cothrottle = exports.debounce = exports.throttle = void 0;
const chrono_1 = __webpack_require__(9522);
const exception_1 = __webpack_require__(6192);
function throttle(interval, callback, capacity = 1) {
  // Bug: Karma and TypeScript
  let timer = 0;
  let buffer = [];
  return function self(data) {
    if (capacity === 1) {
      buffer = [data];
    } else {
      buffer.length === capacity && buffer.shift();
      buffer.push(data);
    }
    if (timer !== 0) return;
    timer = setTimeout(async () => {
      const buf = buffer;
      buffer = [];
      try {
        await callback.call(this, buf[buf.length - 1], buf);
      } catch (reason) {
        (0, exception_1.causeAsyncException)(reason);
      }
      timer = 0;
      buffer.length > 0 && self.call(this, buffer.pop());
    }, interval);
  };
}
exports.throttle = throttle;
function debounce(delay, callback, capacity = 1) {
  // Bug: Karma and TypeScript
  let timer = 0;
  let buffer = [];
  let callable = true;
  return function self(data) {
    if (capacity === 1) {
      buffer = [data];
    } else {
      buffer.length === capacity && buffer.shift();
      buffer.push(data);
    }
    if (timer !== 0) return;
    timer = setTimeout(() => {
      timer = 0;
      setTimeout(async () => {
        if (timer !== 0) return;
        if (!callable) return;
        const buf = buffer;
        buffer = [];
        callable = false;
        try {
          await callback.call(this, buf[buf.length - 1], buf);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }
        callable = true;
        buffer.length > 0 && self.call(this, buffer.pop());
      }, delay);
    }, delay);
  };
}
exports.debounce = debounce;
function cothrottle(routine, resource, scheduler) {
  return async function* () {
    let start = (0, chrono_1.now)();
    for await (const value of routine()) {
      yield value;
      if (resource - ((0, chrono_1.now)() - start) > 0) continue;
      await scheduler();
      start = (0, chrono_1.now)();
    }
  };
}
exports.cothrottle = cothrottle;

/***/ }),

/***/ 9152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.wait = exports.captureTimers = exports.setRepeatTimer = exports.setTimer = void 0;
const list_1 = __webpack_require__(4609);
const chrono_1 = __webpack_require__(9522);
const function_1 = __webpack_require__(1825);
class Node extends list_1.List.Node {
  constructor(value) {
    super();
    this.value = value;
  }
}
exports.setTimer = template(false);
exports.setRepeatTimer = template(true);
function template(repeat, cancellers) {
  const timer = (timeout, handler, unhandler) => {
    let params;
    let id = setTimeout(async function loop() {
      params = [await handler()];
      if (!repeat) return;
      id = setTimeout(loop, timeout);
    }, timeout);
    const cancel = (0, function_1.singleton)(() => {
      clearTimeout(id);
      cancellers && node && (node.next || node.prev || node === cancellers.head) && cancellers.delete(node);
      params && unhandler?.(params[0]);
    });
    const node = cancellers?.push(new Node(cancel));
    return cancel;
  };
  if (!cancellers) {
    timer.group = () => template(repeat, new list_1.List());
  } else {
    timer.clear = () => {
      while (cancellers.length !== 0) {
        cancellers.shift().value();
      }
    };
  }
  return timer;
}
function captureTimers(test) {
  const start = setTimeout(function_1.noop);
  clearTimeout(start);
  if (typeof start !== 'number') throw new Error('Timer ID must be a number');
  return done => test(err => {
    // Must get the ID before calling done.
    const end = setTimeout(function_1.noop);
    done(err);
    clearTimeout(end);
    for (let i = start; i < end; ++i) {
      clearTimeout(i);
    }
  });
}
exports.captureTimers = captureTimers;
function wait(ms) {
  return ms === 0 ? chrono_1.clock : new Promise(resolve => void setTimeout(resolve, ms));
}
exports.wait = wait;

/***/ }),

/***/ 108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TLRU = void 0;
const alias_1 = __webpack_require__(5413);
const clist_1 = __webpack_require__(6212);
class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
  }
}
class TLRU {
  constructor(capacity, demotion = 2, window = 0, retrial = true,
  // ヒットにより前方が増えるためstep=100では不足する。
  pure = demotion >= 100) {
    this.capacity = capacity;
    this.demotion = demotion;
    this.window = window;
    this.retrial = retrial;
    this.pure = pure;
    this.dict = new Map();
    this.list = new clist_1.List();
    this.handV = undefined;
    this.handG = undefined;
    this.count = 0;
  }
  get length() {
    return this.list.length;
  }
  get size() {
    return this.list.length;
  }
  extend() {
    const {
      list
    } = this;
    // 1周できる

    this.count = -(0, alias_1.max)(
    //list.length * this.demotion / 100 / max(this.count / list.length * this.demotion, 1) | 0,
    (list.length - this.count) * this.demotion / 100 | 0, list.length * this.window / 100 - this.count | 0, this.demotion && 1);
  }
  replace(key, value) {
    const {
      dict,
      list
    } = this;
    this.handV ??= list.last;
    if (this.handV === this.handG && this.count >= 0) {
      this.extend();
    }
    // 非延命
    if (this.count >= 0 || this.handV === list.last || !this.retrial) {
      const entry = this.handV;
      dict.delete(entry.key);
      dict.set(key, entry);
      entry.key = key;
      entry.value = value;
    }
    // 延命
    else {
      const entry = list.last;
      dict.delete(entry.key);
      dict.set(key, entry);
      entry.key = key;
      entry.value = value;
      this.escape(entry);
      list.delete(entry);
      if (this.handG !== list.head) {
        list.insert(entry, this.handG);
      } else {
        list.unshift(entry);
      }
      this.handV = entry;
      this.handG = entry;
    }
    if (this.count < 0) {
      this.handG = this.handG !== list.head ? this.handG.prev : undefined;
    }
    if (this.handV !== this.handG) {
      this.handV = this.handV.prev;
    }
    if (this.handV === list.last || this.count === -1) {
      this.handV = list.last;
      this.count = 0;
    } else {
      ++this.count;
    }
  }
  evict() {
    const {
      list
    } = this;
    const entry = this.handV ?? list.last;
    if (entry === undefined) return;
    this.delete(entry.key);
    return [entry.key, entry.value];
  }
  add(key, value) {
    const {
      dict,
      list
    } = this;
    if (list.length === this.capacity) {
      this.replace(key, value);
    } else {
      const entry = new Entry(key, value);
      dict.set(key, entry);
      if (this.pure && this.handG !== undefined) {
        // 純粋なTLRUの検証用。
        list.insert(entry, this.handG.next);
      } else if (this.handV !== undefined) {
        // 基本的にこのほうがヒット率が高い。
        list.insert(entry, this.handV.next);
      } else {
        list.unshift(entry);
      }
    }
    return true;
  }
  set(key, value) {
    const entry = this.dict.get(key);
    if (entry === undefined) {
      this.add(key, value);
    } else {
      entry.value = value;
    }
    return this;
  }
  escape(entry) {
    const {
      list
    } = this;
    if (list.length === 1) {
      this.handV = undefined;
      this.handG = undefined;
      this.count = 0;
      return;
    }
    if (entry === this.handV) {
      this.handV = this.handV.prev;
    }
    if (entry === this.handG) {
      this.handG = this.handG.prev;
    }
  }
  get(key) {
    const {
      dict,
      list
    } = this;
    const entry = dict.get(key);
    if (entry === undefined) return;
    if (entry !== list.head) {
      this.escape(entry);
      list.delete(entry);
      list.unshift(entry);
    }
    this.handG ??= entry;
    return entry.value;
  }
  has(key) {
    return this.dict.has(key);
  }
  delete(key) {
    const {
      dict,
      list
    } = this;
    const entry = dict.get(key);
    if (entry === undefined) return false;
    if (entry === this.handG && entry === list.head) {
      this.handG = undefined;
    }
    this.escape(entry);
    list.delete(entry);
    return dict.delete(key);
  }
  clear() {
    this.dict.clear();
    this.list.clear();
    this.handV = undefined;
    this.handG = undefined;
    this.count = 0;
  }
  *[Symbol.iterator]() {
    for (const {
      key,
      value
    } of this.list) {
      yield [key, value];
    }
  }
}
exports.TLRU = TLRU;

/***/ }),

/***/ 8888:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


// TLRU: True LRU
// TRC: True Recency-based Cache
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(108), exports);
/*
真に最近性に基づく真のLRU。
最近性には有参照間、無参照間、有無参照間の3つがある。
LRUは有無参照間の最近性を喪失しClockは有参照間の最近性を喪失する。
TLRUはすべての最近性を保持する。
パラメータを調整しやすく用途に合わせてヒット率を上げやすい。
stepパラメータはヒットエントリを重み付けおよび保護しており
demotion=100で重み付けと保護なしの純粋なTLRUを設定できる。
windowパラメータでSLRU同様捕捉可能最小再利用距離を設定できるが
降格区間内では捕捉可能再利用距離が半減しSLRUより短くなる。
DWCより高速かつ堅牢でアプリケーションのインメモリキャッシュなどの
極端に変化の大きいアクセスパターンにも適応する。

*/
/*
LRUとClockは偽の最近性に基づく誤ったアルゴリズムにより性能が大幅に低下する。
真の最近性は偽の最近性よりも非常に優れている。

エントリ間の最近性関係には使用済みと使用済み、使用済みと未使用、未使用と未使用の3種類がある。
ただしLRUとClockは一部の最近性に違反する。真のLRUはすべての最近性を維持することにより
LRUとClockよりも優れた性能を発揮する。

LRUの根本的誤りは新しいエントリを最近使用されたと見なすことである。実際それがキャッシュ内で
使用されたことはない。従って新しいエントリは実際に使用されたエントリの後ろに追加する必要がある。

```
Sequence: 1, 2, 3, 3, 2, 4

LRU

  MRU |4 2 3 1| LRU
  Hit |0 1 1 0|
        ^ Violation of the recency between used and unused.

Clock

  N-1 |4 3 2 1| 0
  Hit |0 1 1 0|
          ^ Violation of the recency between used and used.

True LRU

  MRU |2 3 4 1| LRU
  Hit |1 1 0 0|
        ^ ^ ^ Ideal recency(Recency-complete).
```

|Algorithm|Used-Used|Used-Unused|Unused-Unused|
|:-------:|:-------:|:---------:|:-----------:|
|LRU      |✓        |           |✓           |
|Clock    |         |✓          |✓           |
|True LRU |✓        |✓          |✓           |

再利用距離と同様に未使用と使用済みの最近性には無限と有限の差があり差を埋める方法には
様々な方法が考えられこの調整可能性はTrue LRUとClockにのみ存在しLRUには存在しない。

True LRUにおけるLRUからの大幅な改善はすべてのアルゴリズムの改善の過半が未使用のエントリを
偶然削除したことによるものを独自の改善として混同および錯覚したものであり各アルゴリズムの
独自性による改善は小さいか半分に満たないことを示している。True LRUをLRUの代わりに真の
ベースラインとすると他のアルゴリズムは特に汎用性においてあまり魅力的な性能を達成していない。

なおClockはLRUの近似アルゴリズムとして知られているがLRUとClockは異なる種類の最近性に基づく
アルゴリズムであるためClockは実際にはLRUの近似アルゴリズムではなく異なる種類の最近性に基づく
まったく異なる最近性基準アルゴリズムである。

*/

/***/ }),

/***/ 2871:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.tuple = void 0;
function tuple(...as) {
  return as;
}
exports.tuple = tuple;

/***/ }),

/***/ 113:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isPrimitive = exports.is = exports.type = void 0;
const alias_1 = __webpack_require__(5413);
const ObjectPrototype = Object.prototype;
const ArrayPrototype = Array.prototype;
function type(value) {
  const type = typeof value;
  switch (type) {
    case 'function':
      return 'Function';
    case 'object':
      if (value === null) return 'null';
      const tag = value[Symbol.toStringTag];
      if (tag) return tag;
      switch ((0, alias_1.ObjectGetPrototypeOf)(value)) {
        case ArrayPrototype:
          return 'Array';
        case ObjectPrototype:
          return 'Object';
        default:
          return value?.constructor?.name || (0, alias_1.toString)(value).slice(8, -1);
      }
    default:
      return type;
  }
}
exports.type = type;
function is(type, value) {
  switch (type) {
    case 'null':
      return value === null;
    case 'array':
      return (0, alias_1.isArray)(value);
    case 'object':
      return value !== null && typeof value === type;
    default:
      return typeof value === type;
  }
}
exports.is = is;
function isPrimitive(value) {
  switch (typeof value) {
    case 'function':
      return false;
    case 'object':
      return value === null;
    default:
      return true;
  }
}
exports.isPrimitive = isPrimitive;

/***/ }),

/***/ 1904:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.ReadonlyURL = exports.standardize = void 0;
const internal_1 = __webpack_require__(1094);
var internal_2 = __webpack_require__(1094);
Object.defineProperty(exports, "standardize", ({
  enumerable: true,
  get: function () {
    return internal_2.standardize;
  }
}));
var internal_3 = __webpack_require__(1094);
Object.defineProperty(exports, "ReadonlyURL", ({
  enumerable: true,
  get: function () {
    return internal_3.ReadonlyURL;
  }
}));
class URL {
  constructor(source, base) {
    source = source.trim();
    base = base?.trim();
    this.url = new internal_1.ReadonlyURL(source, base);
    this.params = undefined;
    this.source = source;
    this.base = base;

    //assert(this.href.startsWith(this.resource));
  }
  get href() {
    return this.params?.toString().replace(/^(?=.)/, `${this.url.href.slice(0, -this.url.query.length - this.url.fragment.length || this.url.href.length)}?`).concat(this.fragment) ?? this.url.href;
  }
  get resource() {
    return this.params?.toString().replace(/^(?=.)/, `${this.url.href.slice(0, -this.url.query.length - this.url.fragment.length || this.url.href.length)}?`) ?? this.url.resource;
  }
  get origin() {
    return this.url.origin;
  }
  get scheme() {
    return this.url.scheme;
  }
  get protocol() {
    return this.url.protocol;
  }
  get username() {
    return this.url.username;
  }
  get password() {
    return this.url.password;
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
    return this.params?.toString().replace(/^(?=.)/, `${this.pathname}?`) ?? this.url.path;
  }
  get pathname() {
    return this.url.pathname;
  }
  get search() {
    return this.params?.toString().replace(/^(?=.)/, '?') ?? this.url.search;
  }
  get query() {
    return this.params?.toString().replace(/^(?=.)/, '?') ?? this.url.query;
  }
  get hash() {
    return this.url.hash;
  }
  get fragment() {
    return this.url.fragment;
  }
  get searchParams() {
    return this.params ??= new URLSearchParams(this.search);
  }
  toString() {
    return this.url.toString();
  }
  toJSON() {
    return this.url.toJSON();
  }
}
exports.URL = URL;

/***/ }),

/***/ 1094:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ReadonlyURL = exports.encode = exports.standardize = void 0;
__webpack_require__(518);
const memoize_1 = __webpack_require__(6925);
const tlru_1 = __webpack_require__(8888);
function standardize(url, base) {
  const {
    origin,
    protocol,
    href
  } = new ReadonlyURL(url, base);
  url = origin === 'null' ? protocol.toLowerCase() + href.slice(protocol.length) : origin.toLowerCase() + href.slice(origin.length);
  return encode(url);
}
exports.standardize = standardize;
function encode(url) {
  url = url.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '');
  const {
    1: base,
    2: hash
  } = url.match(/^([^#]*)(.*)$/s);
  const {
    1: path,
    2: query
  } = base.replace(/(?:%(?:[0-9][a-f]|[a-f][0-9a-fA-F]|[A-F][0-9a-f]))+/g, str => str.toUpperCase()).match(/^([^?]*)(.*)$/s);
  return '' + path.replace(/(?:[^%[\]]|%(?![0-9A-F]{2}))+/ig, encodeURI) + query.replace(/(?!^)(?:[^%=&]|%(?![0-9A-F]{2}))+/ig, encodeURIComponent) + hash;
}
exports.encode = encode;
class ReadonlyURL {
  constructor(source, base) {
    source = source.trim();
    base = base?.trim();
    switch (source.slice(0, source.lastIndexOf('://', 9) + 1).toLowerCase()) {
      case 'http:':
      case 'https:':
        base = undefined;
        break;
      default:
        switch (base?.slice(0, base.lastIndexOf('://', 9) + 1).toLowerCase()) {
          case 'http:':
          case 'https:':
            const i = base.indexOf('#');
            if (i > -1) {
              base = base.slice(0, i);
            }
            const j = base.indexOf('?');
            if (j > -1 && source !== '' && source[0] !== '#') {
              base = base.slice(0, j);
            }
        }
    }
    this.cache = ReadonlyURL.get(source, base);
    this.params = undefined;
    this.source = source;
    this.base = base;
  }
  get href() {
    return this.cache.href ??= this.cache.url.href;
  }
  get resource() {
    return this.cache.resource ??= this.href.slice(0, this.href.search(/[?#]|$/)) + this.search;
  }
  get origin() {
    return this.cache.origin ??= this.cache.url.origin;
  }
  get scheme() {
    return this.cache.scheme ??= this.protocol.slice(0, -1);
  }
  get protocol() {
    return this.cache.protocol ??= this.cache.url.protocol;
  }
  get username() {
    return this.cache.username ??= this.cache.url.username;
  }
  get password() {
    return this.cache.password ??= this.cache.url.password;
  }
  get host() {
    return this.cache.host ??= this.cache.url.host;
  }
  get hostname() {
    return this.cache.hostname ??= this.cache.url.hostname;
  }
  get port() {
    return this.cache.port ??= this.cache.url.port;
  }
  get path() {
    return this.cache.path ??= `${this.pathname}${this.search}`;
  }
  get pathname() {
    return this.cache.pathname ??= this.cache.url.pathname;
  }
  get search() {
    return this.cache.search ??= this.cache.url.search;
  }
  get query() {
    return this.cache.query ??= this.search || this.href[this.href.length - this.fragment.length - 1] === '?' && '?' || '';
  }
  get hash() {
    return this.cache.hash ??= this.cache.url.hash;
  }
  get fragment() {
    return this.cache.fragment ??= this.hash || this.href[this.href.length - 1] === '#' && '#' || '';
  }
  get searchParams() {
    return this.params ??= new ReadonlyURLSearchParams(this.search);
  }
  toString() {
    return this.href;
  }
  toJSON() {
    return this.href;
  }
}
exports.ReadonlyURL = ReadonlyURL;
// Can't freeze URL object in the Firefox extension environment.
// ref: https://github.com/falsandtru/pjax-api/issues/44#issuecomment-633915035
// Bug: Error in dependents.
// @ts-ignore
ReadonlyURL.get = (0, memoize_1.memoize)((url, base) => ({
  url: new __webpack_require__.g.URL(url, base)
}), (url, base = '') => `${base.indexOf('\n') > -1 ? base.replace(/\n+/g, '') : base}\n${url}`, new tlru_1.TLRU(10000));
class ReadonlyURLSearchParams extends URLSearchParams {
  append(name, value) {
    this.sort();
    name;
    value;
  }
  delete(name, value) {
    this.sort();
    name;
    value;
  }
  set(name, value) {
    this.sort();
    name;
    value;
  }
  sort() {
    throw new Error('Spica: URL: Cannot use mutable methods with ReadonlyURLSearchParams');
  }
}

/***/ }),

/***/ 2076:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FakeXMLHttpRequest = exports["default"] = exports.Pjax = void 0;
var gui_1 = __webpack_require__(9869);
Object.defineProperty(exports, "Pjax", ({
  enumerable: true,
  get: function () {
    return gui_1.GUI;
  }
}));
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return gui_1.GUI;
  }
}));
var xhr_1 = __webpack_require__(3026);
Object.defineProperty(exports, "FakeXMLHttpRequest", ({
  enumerable: true,
  get: function () {
    return xhr_1.FakeXMLHttpRequest;
  }
}));

/***/ }),

/***/ 7430:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.route = exports.scope = exports.Config = exports.RouterEventSource = exports.RouterEventType = exports.RouterEvent = void 0;
const api_1 = __webpack_require__(8725);
var router_1 = __webpack_require__(23);
Object.defineProperty(exports, "RouterEvent", ({
  enumerable: true,
  get: function () {
    return router_1.RouterEvent;
  }
}));
Object.defineProperty(exports, "RouterEventType", ({
  enumerable: true,
  get: function () {
    return router_1.RouterEventType;
  }
}));
Object.defineProperty(exports, "RouterEventSource", ({
  enumerable: true,
  get: function () {
    return router_1.RouterEventSource;
  }
}));
var config_1 = __webpack_require__(8452);
Object.defineProperty(exports, "Config", ({
  enumerable: true,
  get: function () {
    return config_1.Config;
  }
}));
Object.defineProperty(exports, "scope", ({
  enumerable: true,
  get: function () {
    return config_1.scope;
  }
}));
function route(config, event, state, io) {
  return (0, api_1.route)(new api_1.RouterEntity(config, event, new api_1.RouterEntityState(state.process, state.scripts)), io);
}
exports.route = route;

/***/ }),

/***/ 8870:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.savePosition = exports.loadTitle = void 0;
var path_1 = __webpack_require__(4226);
Object.defineProperty(exports, "loadTitle", ({
  enumerable: true,
  get: function () {
    return path_1.loadTitle;
  }
}));
Object.defineProperty(exports, "savePosition", ({
  enumerable: true,
  get: function () {
    return path_1.savePosition;
  }
}));

/***/ }),

/***/ 396:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.savePjax = exports.isTransitable = exports.savePosition = exports.loadPosition = exports.saveTitle = exports.loadTitle = void 0;
saveTitle();
savePosition();
function loadTitle() {
  return window.history.state?.title || document.title;
}
exports.loadTitle = loadTitle;
function saveTitle() {
  window.history.replaceState({
    ...window.history.state,
    title: document.title
  }, document.title);
}
exports.saveTitle = saveTitle;
function loadPosition() {
  return window.history.state?.position || {
    top: window.scrollY,
    left: window.scrollX
  };
}
exports.loadPosition = loadPosition;
function savePosition() {
  window.history.replaceState({
    ...window.history.state,
    position: {
      ...window.history.state?.position,
      top: window.scrollY,
      left: window.scrollX
    }
  }, document.title);
}
exports.savePosition = savePosition;
function isTransitable(state) {
  return state?.pjax?.transition === true;
}
exports.isTransitable = isTransitable;
function savePjax() {
  window.history.replaceState({
    ...window.history.state,
    pjax: {
      ...window.history.state?.pjax,
      transition: true
    }
  }, document.title);
}
exports.savePjax = savePjax;

/***/ }),

/***/ 8452:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Config = exports.scope = void 0;
const assign_1 = __webpack_require__(9888);
var scope_1 = __webpack_require__(1531);
Object.defineProperty(exports, "scope", ({
  enumerable: true,
  get: function () {
    return scope_1.scope;
  }
}));
class Config {
  constructor(options) {
    this.areas = ['body'];
    this.link = ':is(a, area)[href]:not([target])';
    this.form = 'form:not([method])';
    this.replace = '';
    this.memory = undefined;
    this.fetch = {
      rewrite: undefined,
      headers: new Headers(),
      timeout: 3000,
      wait: 0
    };
    this.update = {
      rewrite: undefined,
      head: 'base, meta, link',
      css: true,
      script: true,
      ignore: '',
      ignores: {
        $: undefined,
        extension: '[href^="chrome-extension://"]',
        security: '[src*=".scr.kaspersky-labs.com/"]'
      },
      reload: '',
      log: ''
    };
    this.sequence = new Sequence();
    this.scope = {};
    this.isolation = false;
    (0, assign_1.extend)(this, options);
    this.update.ignores.$ ??= options.update?.ignore ?? '';
    this.update.ignore = Object.values(this.update.ignores).filter(s => s).join(',');
    (0, assign_1.overwrite)(this.scope, options?.scope ?? {});
    Object.freeze(this);
    Object.freeze(this.fetch);
    Object.freeze(this.update);
  }
  filter(_el) {
    return true;
  }
  fallback(target, reason) {
    if (target instanceof HTMLAnchorElement || target instanceof HTMLAreaElement) {
      return void window.location.assign(target.href);
    }
    if (target instanceof HTMLFormElement) {
      return void window.location.assign(target.action);
    }
    if (target instanceof Window) {
      return void window.location.reload();
    }
    throw reason;
  }
}
exports.Config = Config;
class Sequence {
  async fetch() {
    return 'seq:fetch';
  }
  async unload() {
    return 'seq:unload';
  }
  async content() {
    return 'seq:content';
  }
  async ready() {
    return 'seq:ready';
  }
  async load() {}
}

/***/ }),

/***/ 1531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scope = void 0;
const config_1 = __webpack_require__(8452);
const router_1 = __webpack_require__(7727);
const maybe_1 = __webpack_require__(6189);
const assign_1 = __webpack_require__(9888);
const {
  match
} = router_1.router.helpers();
function scope(options, path) {
  const record = {
    '/': {},
    ...options.scope
  };
  for (const pattern of Object.keys(record).reverse()) {
    const opts = record[pattern];
    switch (+match(pattern, path.orig) + +match(pattern, path.dest)) {
      case 0:
        continue;
      case 1:
        if (opts === undefined || opts.isolation) return maybe_1.Nothing;
        continue;
    }
    return opts ? opts.scope ? scope((0, assign_1.overwrite)({}, {
      ...options,
      scope: undefined
    }, opts), path) : (0, maybe_1.Just)(new config_1.Config({
      ...(0, assign_1.extend)({}, options, opts),
      scope: undefined
    })) : maybe_1.Nothing;
  }
  return maybe_1.Nothing;
}
exports.scope = scope;

/***/ }),

/***/ 23:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RouterEventLocation = exports.RouterEventRequest = exports.RouterEventMethod = exports.RouterEventType = exports.RouterEventSource = exports.RouterEvent = void 0;
const dom_1 = __webpack_require__(3072);
const url_1 = __webpack_require__(1904);
const listener_1 = __webpack_require__(8400);
class RouterEvent {
  constructor(original, base) {
    this.original = original;
    this.base = base;
    this.type = this.original.type.toLowerCase();
    this.source = this.original[listener_1.currentTarget];
    this.request = new RouterEventRequest(this.source, this.base);
    this.location = new RouterEventLocation(this.base, this.request.url);
    Object.freeze(this);
  }
}
exports.RouterEvent = RouterEvent;
var RouterEventSource;
(function (RouterEventSource) {
  RouterEventSource.Anchor = HTMLAnchorElement;
  RouterEventSource.Area = HTMLAreaElement;
  RouterEventSource.Form = HTMLFormElement;
  RouterEventSource.Window = window.Window;
})(RouterEventSource || (exports.RouterEventSource = RouterEventSource = {}));
var RouterEventType;
(function (RouterEventType) {
  RouterEventType.Click = 'click';
  RouterEventType.Submit = 'submit';
  RouterEventType.Popstate = 'popstate';
})(RouterEventType || (exports.RouterEventType = RouterEventType = {}));
var RouterEventMethod;
(function (RouterEventMethod) {
  RouterEventMethod.GET = 'GET';
  RouterEventMethod.POST = 'POST';
})(RouterEventMethod || (exports.RouterEventMethod = RouterEventMethod = {}));
class RouterEventRequest {
  constructor(source, base) {
    this.source = source;
    this.base = base;
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
      throw new Error(`Invalid event source`);
    })();
    this.url = (() => {
      if (this.source instanceof RouterEventSource.Anchor || this.source instanceof RouterEventSource.Area) {
        return new url_1.URL((0, url_1.standardize)(this.source.href, this.base.href));
      }
      if (this.source instanceof RouterEventSource.Form) {
        return this.source.method.toUpperCase() === RouterEventMethod.GET ? new url_1.URL((0, url_1.standardize)(this.source.action.split(/[?#]/)[0] + `?${(0, dom_1.serialize)(this.source)}`, this.base.href)) : new url_1.URL((0, url_1.standardize)(this.source.action.split(/[?#]/)[0], this.base.href));
      }
      if (this.source instanceof RouterEventSource.Window) {
        return new url_1.URL((0, url_1.standardize)(window.location.href));
      }
      throw new Error(`Invalid event source`);
    })();
    this.body = (() => this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST ? new FormData(this.source) : null)();
    Object.freeze(this);
  }
}
exports.RouterEventRequest = RouterEventRequest;
class RouterEventLocation {
  constructor(orig, dest) {
    this.orig = orig;
    this.dest = dest;
    Object.freeze(this);
  }
}
exports.RouterEventLocation = RouterEventLocation;

/***/ }),

/***/ 8725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.route = exports.RouterEntityState = exports.RouterEntity = void 0;
const fetch_1 = __webpack_require__(8950);
const update_1 = __webpack_require__(1073);
const content_1 = __webpack_require__(7747);
const path_1 = __webpack_require__(4226);
const either_1 = __webpack_require__(7704);
var entity_1 = __webpack_require__(7293);
Object.defineProperty(exports, "RouterEntity", ({
  enumerable: true,
  get: function () {
    return entity_1.RouterEntity;
  }
}));
Object.defineProperty(exports, "RouterEntityState", ({
  enumerable: true,
  get: function () {
    return entity_1.RouterEntityState;
  }
}));
async function route(entity, io) {
  return (0, either_1.Right)(undefined).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? (0, either_1.Right)(undefined) : (0, either_1.Left)(new Error(`Failed to match the areas`))).fmap(() => (0, fetch_1.fetch)(entity)).fmap(async p => (await p).fmap(([res, seq]) => (0, update_1.update)(entity, res, seq, {
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

/***/ }),

/***/ 7293:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RouterEntityState = exports.RouterEntity = void 0;
class RouterEntity {
  constructor(config, event, state) {
    this.config = config;
    this.event = event;
    this.state = state;
    Object.freeze(this);
  }
}
exports.RouterEntity = RouterEntity;
class RouterEntityState {
  constructor(process, scripts) {
    this.process = process;
    this.scripts = scripts;
    Object.freeze(this);
  }
}
exports.RouterEntityState = RouterEntityState;

/***/ }),

/***/ 5474:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Response = void 0;
const html_1 = __webpack_require__(6135);
const url_1 = __webpack_require__(1904);
class Response {
  constructor(url, xhr) {
    this.url = url;
    this.xhr = xhr;
    this.header = name => this.xhr.getResponseHeader(name);
    this.document = this.xhr.responseXML.cloneNode(true);
    if (url.origin !== new url_1.URL(xhr.responseURL, window.location.href).origin) throw new Error(`Redirected to another origin`);
    Object.defineProperty(this.document, 'URL', {
      configurable: true,
      enumerable: true,
      value: url.href,
      writable: false
    });
    (0, html_1.fix)(this.document);
    Object.freeze(this);
  }
}
exports.Response = Response;

/***/ }),

/***/ 8950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fetch = void 0;
const router_1 = __webpack_require__(23);
const xhr_1 = __webpack_require__(4991);
const timer_1 = __webpack_require__(9152);
async function fetch({
  event,
  config,
  state
}) {
  const headers = new Headers(config.fetch.headers);
  headers.has('Accept') || headers.set('Accept', 'text/html');
  headers.has('X-Pjax') || headers.set('X-Pjax', JSON.stringify(config.areas));
  const memory = event.type === router_1.RouterEventType.Popstate ? config.memory?.get(event.location.dest.path) : undefined;
  const [seq, res] = await Promise.all([config.sequence.fetch(undefined, {
    path: event.request.url.path,
    method: event.request.method,
    headers,
    body: event.request.body
  }), (0, xhr_1.xhr)(event.request.method, event.request.url, event.location.orig, headers, event.request.body, config.fetch.timeout, state.process, config.fetch.rewrite,
  // 遷移成功後に遷移可能性が自然に壊れることはないため検査不要
  memory), (0, timer_1.wait)(config.fetch.wait), window.dispatchEvent(new Event('pjax:fetch'))]);
  return res.bind(state.process.either).fmap(res => [res, seq]);
}
exports.fetch = fetch;

/***/ }),

/***/ 4991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.match_ = exports.xhr = void 0;
const fetch_1 = __webpack_require__(5474);
const promise_1 = __webpack_require__(8312);
const either_1 = __webpack_require__(7704);
const url_1 = __webpack_require__(1904);
const function_1 = __webpack_require__(1825);
function xhr(method, displayURL, base, headers, body, timeout, cancellation, rewrite = function_1.noop, memory) {
  return new promise_1.AtomicPromise(resolve => {
    const xhr = rewrite(displayURL.href, method, headers, timeout, body, memory) ?? request(displayURL.href, method, headers, timeout, body);
    if (xhr.responseType !== 'document') throw new Error(`Response type must be 'document'`);
    cancellation.register(() => void xhr.abort());
    timeout && setTimeout(() => xhr.readyState < 3 && xhr.abort(), timeout + 100);
    xhr.addEventListener("abort", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by abort`))));
    xhr.addEventListener("error", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by error`))));
    xhr.addEventListener("timeout", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by timeout`))));
    xhr.addEventListener("load", () => void verify(base, xhr).fmap(xhr => {
      const responseURL = new url_1.URL((0, url_1.standardize)(restore(xhr.responseURL, displayURL.href), base.href));
      return new fetch_1.Response(responseURL, xhr);
    }).extract(err => void resolve((0, either_1.Left)(err)), res => void resolve((0, either_1.Right)(res))));
  });
}
exports.xhr = xhr;
function request(url, method, headers, timeout, body) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  for (const [name, value] of headers) {
    xhr.setRequestHeader(name, value);
  }
  xhr.responseType = 'document';
  xhr.timeout = timeout;
  xhr.send(body);
  return xhr;
}
function restore(res, req) {
  return !res.includes('#') && req.includes('#') ? res + req.slice(req.indexOf('#')) : res;
}
function verify(base, xhr) {
  const url = new url_1.URL((0, url_1.standardize)(xhr.responseURL, base.href));
  switch (true) {
    case !xhr.responseURL:
      return (0, either_1.Left)(new Error(`Failed to get the response URL`));
    case url.origin !== new url_1.URL('', window.location.origin).origin:
      return (0, either_1.Left)(new Error(`Redirected to another origin`));
    case !/2..|304/.test(`${xhr.status}`):
      return (0, either_1.Left)(new Error(`Failed to validate the status of response`));
    case !xhr.response:
      return (0, either_1.Left)(new Error(`Failed to get the response body`));
    case !match(xhr.getResponseHeader('Content-Type'), 'text/html'):
      return (0, either_1.Left)(new Error(`Failed to validate the content type of response`));
    default:
      return (0, either_1.Right)(xhr);
  }
}
function match(actualContentType, expectedContentType) {
  const as = parse(actualContentType || '').sort();
  const es = parse(expectedContentType).sort();
  for (let i = 0, j = 0; i < as.length && j < es.length;) {
    switch (as[i].localeCompare(es[j])) {
      case 0:
        return true;
      case -1:
        ++i;
        continue;
      case 1:
        ++j;
        continue;
      default:
        throw new Error('Unreachable');
    }
  }
  return false;
  function parse(headerValue) {
    // eslint-disable-next-line redos/no-vulnerable
    return headerValue.split(/\s*;\s*/).filter(v => v.length > 0);
  }
}
exports.match_ = match;

/***/ }),

/***/ 1073:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.update = void 0;
const router_1 = __webpack_require__(23);
const blur_1 = __webpack_require__(2289);
const url_1 = __webpack_require__(6255);
const title_1 = __webpack_require__(4440);
const head_1 = __webpack_require__(8274);
const content_1 = __webpack_require__(7747);
const css_1 = __webpack_require__(8697);
const script_1 = __webpack_require__(1883);
const focus_1 = __webpack_require__(1938);
const scroll_1 = __webpack_require__(8949);
const path_1 = __webpack_require__(4226);
const promise_1 = __webpack_require__(8312);
const either_1 = __webpack_require__(7704);
const hlist_1 = __webpack_require__(8553);
function update({
  event,
  config,
  state
}, response, seq, io) {
  const {
    process
  } = state;
  const documents = {
    src: response.document,
    dst: io.document
  };
  return promise_1.AtomicPromise.resolve(seq).then(process.either).then(m => m.bind(() => (0, content_1.separate)(documents, config.areas).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas`)), () => m))).then(m => m.bind(seqA => (0, content_1.separate)(documents, config.areas).fmap(([area]) => [seqA, area]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas`)), process.either)).fmap(([seqB, area]) => {
    const memory = event.type === router_1.RouterEventType.Popstate ? config.memory?.get(event.location.dest.path) : undefined;
    config.update.rewrite?.(event.location.dest.href, documents.src, area, memory);
    return seqB;
  }).bind(seqB => (0, content_1.separate)(documents, config.areas).fmap(([, areas]) => [seqB, areas]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas`)), process.either)))
  // fetch -> unload
  .then(m => m.bind(() => (0, content_1.separate)(documents, config.areas).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas`)), () => m)).fmap(async ([seqA, areas]) => {
    const seqB = await config.sequence.unload(seqA, {
      ...response,
      url: response.url.href
    });
    window.dispatchEvent(new Event('pjax:unload'));
    return [seqB, areas];
  })).then(m => either_1.Either.sequence(m)).then(process.promise)
  // unload -> ready
  .then(m => m.fmap(([seqB, areas]) => (0, hlist_1.HList)().add(((0, blur_1.blur)(documents.dst), (0, path_1.savePjax)(), (0, url_1.url)(new router_1.RouterEventLocation(event.location.orig, response.url), documents.src.title, event.type, event.source, config.replace), (0, path_1.savePjax)(), (0, title_1.title)(documents), (0, path_1.saveTitle)(), (0, head_1.head)(documents, config.update.head, config.update.ignore), process.either((0, content_1.content)(documents, areas)).fmap(([as, ps]) => [as, promise_1.AtomicPromise.all(ps)]))).unfold(async p => (await p).fmap(async ([areas]) => {
    config.update.css && (0, css_1.css)(documents, config.update.ignore);
    const seqC = await config.sequence.content(seqB, areas);
    io.document.dispatchEvent(new Event('pjax:content'));
    const [p] = config.update.script ? await (0, script_1.script)(documents, state.scripts, config.update, config.fetch.timeout * 10, process) : [promise_1.AtomicPromise.resolve(process.either([[], promise_1.AtomicPromise.resolve(process.either([]))]))];
    (0, focus_1.focus)(event.type, documents.dst);
    (0, scroll_1.scroll)(event.type, documents.dst, {
      hash: event.location.dest.fragment,
      position: io.position
    });
    (0, path_1.savePosition)();
    return p.then(async ssm => [ssm.fmap(([ss, ap]) => [ss, ap.then(m => m.extract())]), await config.sequence.ready(seqC), io.document.dispatchEvent(new Event('pjax:ready'))]);
  }).fmap(p => p.then(([m, seqD]) => m.fmap(sst => [sst, seqD]))).extract(err => promise_1.AtomicPromise.resolve((0, either_1.Left)(err)))).reverse())).then(process.promise)
  // ready -> load
  .then(m => m.fmap(([p1, p2]) => {
    // Asynchronously wait for load completion of elements and scripts.
    void promise_1.AtomicPromise.all([p1, p2]).then(([m1, m2]) => m1.bind(([, cp]) => m2.fmap(([[, sp], seqD]) => promise_1.AtomicPromise.all([cp, sp]).then(process.either).then(m => m.fmap(async ([events]) => (await config.sequence.load(seqD, events), void window.dispatchEvent(new Event('pjax:load')))).extract(() => undefined)))).extract(() => undefined));
    return p2;
  })).then(m => either_1.Either.sequence(m).then(m => m.join())).then(m => m.fmap(([sst]) => sst));
}
exports.update = update;

/***/ }),

/***/ 2289:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.blur = void 0;
function blur(document) {
  if (document !== window.document || document.activeElement === document.body) return;
  document.activeElement.blur();
  document.body.focus();
}
exports.blur = blur;

/***/ }),

/***/ 7747:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._wait = exports._split = exports.separate = exports.content = void 0;
const script_1 = __webpack_require__(1883);
const promise_1 = __webpack_require__(8312);
const maybe_1 = __webpack_require__(6189);
const array_1 = __webpack_require__(6876);
const query_1 = __webpack_require__(2282);
const listener_1 = __webpack_require__(8400);
function content(documents, areas, io = {
  replace: (src, dst) => void dst.parentNode.replaceChild(src, dst)
}) {
  return [areas.map(r => r.dst).reduce(array_1.push, []), areas.map(load).reduce(array_1.push, [])];
  function load(area) {
    return area.src.map((_, i) => ({
      src: documents.dst.importNode(area.src[i].cloneNode(true), true),
      dst: area.dst[i]
    })).map(area => (replace(area), (0, query_1.querySelectorAll)(area.src, 'img, iframe, frame').map(wait))).reduce(array_1.push, []);
    function replace(area) {
      const unescape = [...area.src.querySelectorAll('script')].map(script_1.escape).reduce((f, g) => () => {
        f();
        g();
      }, () => undefined);
      io.replace(area.src, area.dst);
      unescape();
    }
  }
}
exports.content = content;
function separate(documents, areas) {
  return areas.reduce((m, area) => maybe_1.Maybe.mplus(m, sep(documents, area).fmap(rs => [area, rs])), maybe_1.Nothing);
  function sep(documents, area) {
    return (0, maybe_1.Just)(split(area)).bind(areas => areas.reduce((m, area) => m.bind(acc => {
      const src = (0, query_1.querySelectorAll)(documents.src, area);
      const dst = (0, query_1.querySelectorAll)(documents.dst, area);
      return src.length > 0 && src.length === dst.length ? (0, maybe_1.Just)((0, array_1.push)(acc, [{
        src,
        dst
      }])) : maybe_1.Nothing;
    }), (0, maybe_1.Just)([])));
  }
}
exports.separate = separate;
function split(selector) {
  const results = [];
  const stack = [];
  const mirror = {
    ']': '[',
    ')': '('
  };
  let buffer = '';
  for (const token of selector.match(/\\.?|[,"()\[\]]|[^\\,"()\[\]]+|$/g)) {
    switch (token) {
      case '':
        flush();
        continue;
      case ',':
        stack.length === 0 ? flush() : buffer += token;
        continue;
      case '"':
        stack[0] === '"' ? stack.shift() : stack.unshift(token);
        break;
      case '[':
      case '(':
        stack[0] !== '"' && stack.unshift(token);
        break;
      case ']':
      case ')':
        stack[0] === mirror[token] && stack.shift();
        break;
    }
    buffer += token;
  }
  return results;
  function flush() {
    results.push(buffer.trim());
    buffer = '';
  }
}
exports._split = split;
function wait(el) {
  return promise_1.AtomicPromise.race([new promise_1.AtomicPromise(resolve => void (0, listener_1.once)(el, 'load', resolve)), new promise_1.AtomicPromise(resolve => void (0, listener_1.once)(el, 'abort', resolve)), new promise_1.AtomicPromise(resolve => void (0, listener_1.once)(el, 'error', resolve))]);
}
exports._wait = wait;

/***/ }),

/***/ 8697:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.css = void 0;
const sync_1 = __webpack_require__(4907);
function css(documents, ignore) {
  const selector = 'link[rel~="stylesheet"], style';
  return void ['head', 'body'].map(query => [documents.src.querySelector(query), documents.dst.querySelector(query)]).forEach(([src, dst]) => void (0, sync_1.sync)((0, sync_1.pair)(list(src), list(dst), (a, b) => a.outerHTML === b.outerHTML), dst));
  function list(source) {
    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
  }
}
exports.css = css;

/***/ }),

/***/ 1938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.focus = void 0;
const router_1 = __webpack_require__(23);
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

/***/ }),

/***/ 8274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.head = void 0;
const sync_1 = __webpack_require__(4907);
function head(documents, selector, ignore) {
  ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
  return void (0, sync_1.sync)((0, sync_1.pair)(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);
  function list(source) {
    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
  }
}
exports.head = head;

/***/ }),

/***/ 1883:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.escape = exports._evaluate = exports._fetch = exports.script = void 0;
const error_1 = __webpack_require__(5986);
const promise_1 = __webpack_require__(8312);
const either_1 = __webpack_require__(7704);
const url_1 = __webpack_require__(1904);
const array_1 = __webpack_require__(6876);
const tuple_1 = __webpack_require__(2871);
const timer_1 = __webpack_require__(9152);
const dom_1 = __webpack_require__(394);
function script(documents, skip, selector, timeout, cancellation, io = {
  fetch,
  evaluate
}) {
  const scripts = [...documents.src.querySelectorAll('script')].filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL((0, url_1.standardize)(el.src)).href) || el.matches(selector.reload.trim() || '_') : true);
  const {
    ss,
    as
  } = scripts.reduce((o, script) => script.matches('[src][async], [src][defer]') ? void o.as.push(script) || o : void o.ss.push(script) || o, {
    ss: [],
    as: []
  });
  const p1 = promise_1.AtomicPromise.all(request(ss)).then(run);
  const p2 = promise_1.AtomicPromise.all(request(as)).then(run);
  return p1.then(() => [promise_1.AtomicPromise.all([p1, p2]).then(async ([sm, am]) => sm.fmap(async p => (await p).fmap(([ss1, ap1]) => [ss1, ap1.then(async as1 => am.fmap(async p => (await p).fmap(([ss2, ap2]) => promise_1.AtomicPromise.all([as1, as1.fmap(() => ss2), ap2]).then(sst => either_1.Either.sequence(sst).fmap(sss => sss.reduce(array_1.push)))).extract(either_1.Left)).extract(either_1.Left))])).extract(either_1.Left))]);
  function request(scripts) {
    return scripts.map(script => io.fetch(script, timeout));
  }
  function run(responses) {
    return either_1.Either.sequence(responses).bind(results => results.reduce((results, [script, code]) => results.bind(cancellation.either).bind(([sp, ap]) => io.evaluate(script, code, selector.log, skip, promise_1.AtomicPromise.all(sp), cancellation).extract(p => (0, either_1.Right)((0, tuple_1.tuple)((0, array_1.push)(sp, [p]), ap)), p => (0, either_1.Right)((0, tuple_1.tuple)(sp, (0, array_1.push)(ap, [p]))))), (0, either_1.Right)([[], []]))).fmap(([sp, ap]) => promise_1.AtomicPromise.all(sp).then(m => either_1.Either.sequence(m)).then(m => m.fmap(ss => (0, tuple_1.tuple)(ss, Promise.all(ap).then(ms => either_1.Either.sequence(ms))))));
  }
}
exports.script = script;
async function fetch(script, timeout) {
  if (!script.hasAttribute('src')) return (0, either_1.Right)([script, script.text]);
  if (script.type.toLowerCase() === 'module') return (0, either_1.Right)([script, '']);
  return promise_1.AtomicPromise.race([window.fetch(script.src, {
    headers: {
      Accept: 'application/javascript'
    },
    integrity: script.integrity
  }), (0, timer_1.wait)(timeout).then(() => promise_1.AtomicPromise.reject(new Error(`${script.src}: Timeout`)))]).then(async res => res.ok ? (0, either_1.Right)([script, await res.text()]) : script.matches('[src][async]') ? retry(script).then(() => (0, either_1.Right)([script, '']), () => (0, either_1.Left)(new Error(`${script.src}: ${res.statusText}`))) : (0, either_1.Left)(new Error(res.statusText)), error => (0, either_1.Left)(error));
}
exports._fetch = fetch;
function evaluate(script, code, log, skip, wait, cancellation) {
  script = script.ownerDocument === document ? script // only for testing
  : document.importNode(script.cloneNode(true), true);
  const logging = !!script.parentElement && script.parentElement.matches(log.trim() || '_');
  const container = document.querySelector(logging ? script.parentElement.id ? `#${script.parentElement.id}` : script.parentElement.tagName : '_') || document.body;
  const unescape = escape(script);
  container.appendChild(script);
  unescape();
  !logging && script.remove();
  const result = promise_1.AtomicPromise.resolve(wait).then(evaluate);
  return script.matches('[src][async]') ? (0, either_1.Right)(result) : (0, either_1.Left)(result);
  function evaluate() {
    if (!cancellation.isAlive()) throw new error_1.FatalError('Expired');
    if (script.matches('[type="module"][src]')) {
      return promise_1.AtomicPromise.resolve(Promise.resolve(`${script.src}`).then(s => __importStar(__webpack_require__(3911)(s)))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (script.dispatchEvent(new Event('load')), (0, either_1.Right)(script)), reason => (script.dispatchEvent(new Event('error')), (0, either_1.Left)(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
    } else {
      try {
        if (skip.has(new url_1.URL((0, url_1.standardize)(window.location.href)).href)) throw new error_1.FatalError('Expired');
        (0, eval)(code);
        script.hasAttribute('src') && script.dispatchEvent(new Event('load'));
        return promise_1.AtomicPromise.resolve((0, either_1.Right)(script));
      } catch (reason) {
        script.hasAttribute('src') && script.dispatchEvent(new Event('error'));
        return promise_1.AtomicPromise.resolve((0, either_1.Left)(new error_1.FatalError(reason instanceof Error ? reason.message : reason + '')));
      }
    }
  }
}
exports._evaluate = evaluate;
function escape(script) {
  const src = script.getAttribute('src');
  const code = script.text;
  script.removeAttribute('src');
  script.text = '';
  return () => {
    script.text = ' ';
    script.text = code;
    src !== null && script.setAttribute('src', src);
  };
}
exports.escape = escape;
function retry(script) {
  if (new url_1.URL((0, url_1.standardize)(script.src)).origin === new url_1.URL((0, url_1.standardize)(window.location.href)).origin) return promise_1.AtomicPromise.reject(new Error());
  script = (0, dom_1.html)('script', Object.values(script.attributes).reduce((o, {
    name,
    value
  }) => (o[name] = value, o), {}), [...script.childNodes]);
  return new promise_1.AtomicPromise((resolve, reject) => {
    script.addEventListener('load', () => void resolve(undefined));
    script.addEventListener('error', reject);
    document.body.appendChild(script);
    script.remove();
  });
}

/***/ }),

/***/ 8949:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._hash = exports.scroll = void 0;
const router_1 = __webpack_require__(23);
function scroll(type, document, env, io = {
  scrollToElement: el => void el.scrollIntoView(),
  scrollToPosition: ({
    top,
    left
  }) => void window.scrollTo(left, top),
  hash
}) {
  switch (type) {
    case router_1.RouterEventType.Click:
      if (io.hash(document, env.hash, io)) return;
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
function hash(document, hash, io = {
  scrollToElement: el => void el.scrollIntoView()
}) {
  const index = hash.slice(1);
  if (index.length === 0) return false;
  const el = document.getElementById(index) || document.getElementsByName(index)[0];
  if (!el) return false;
  io.scrollToElement(el);
  return true;
}
exports._hash = hash;

/***/ }),

/***/ 4907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pair = exports.sync = void 0;
const either_1 = __webpack_require__(7704);
const array_1 = __webpack_require__(6876);
function sync(pairs, fallback, io = {
  before,
  remove
}) {
  return void pairs.forEach(([srcs, dst]) => {
    io.before(parent(dst), srcs.slice(-1).some(src => !!dst && src.outerHTML === dst.outerHTML) ? srcs.slice(0, -1) : srcs, dst);
    dst && srcs.length === 0 && io.remove(dst);
  });
  function parent(dst) {
    return dst ? dst.parentElement : fallback;
  }
}
exports.sync = sync;
function pair(srcs, dsts, compare) {
  const link = bind(srcs, dsts, compare);
  dsts.filter(dst => !link.has(dst)).forEach(dst => void link.set(dst, []));
  return [...link].map(([dst, srcs]) => [srcs, dst]);
  function bind(srcs, dsts, compare) {
    return srcs.reduce((link, src) => dsts.length === 0 ? link.set(null, (0, array_1.push)(link.get(null) || [], [src])) : dsts.reduce((m, dst) => m.bind(link => !link.has(dst) && compare(src, dst) ? (link.set(dst, (0, array_1.push)(link.get(null) || [], [src])), link.delete(null), (0, either_1.Left)(link)) : (0, either_1.Right)(link)), (0, either_1.Right)(link)).fmap(link => link.set(null, (0, array_1.push)(link.get(null) || [], [src]))).extract(link => link), new Map());
  }
}
exports.pair = pair;
function before(parent, children, ref) {
  return void children.map(child => parent.ownerDocument.importNode(child.cloneNode(true), true)).forEach(child => void parent.insertBefore(child, ref));
}
function remove(el) {
  return void el.remove();
}

/***/ }),

/***/ 4440:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.title = void 0;
function title(documents) {
  documents.dst.title = documents.src.title;
}
exports.title = title;

/***/ }),

/***/ 6255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._isReplaceable = exports._isRegisterable = exports.url = void 0;
const router_1 = __webpack_require__(23);
const listener_1 = __webpack_require__(8400);
// A part of the workaround to record the correct browser history.
(0, listener_1.bind)(document, 'pjax:ready', () => void window.history.replaceState(window.history.state, window.document.title));
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
  switch (type) {
    case router_1.RouterEventType.Click:
    case router_1.RouterEventType.Submit:
      return location.dest.href !== location.orig.href;
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

/***/ }),

/***/ 4226:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(396), exports);

/***/ }),

/***/ 6345:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClickView = void 0;
const coroutine_1 = __webpack_require__(8779);
const listener_1 = __webpack_require__(8400);
class ClickView extends coroutine_1.Coroutine {
  constructor(document, selector, listener) {
    super(async function* () {
      return this.finally((0, listener_1.delegate)(document, selector, 'click', ev => {
        if (!(ev.currentTarget instanceof HTMLAnchorElement || ev.currentTarget instanceof HTMLAreaElement)) return;
        if (!ev.currentTarget.matches(selector)) return;
        listener(ev);
      }));
    }, {
      delay: false
    });
  }
}
exports.ClickView = ClickView;

/***/ }),

/***/ 3515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NavigationView = void 0;
const page_1 = __webpack_require__(8533);
const state_1 = __webpack_require__(396);
const coroutine_1 = __webpack_require__(8779);
const url_1 = __webpack_require__(1904);
const listener_1 = __webpack_require__(8400);
class NavigationView extends coroutine_1.Coroutine {
  constructor(window, listener) {
    super(async function* () {
      return this.finally((0, listener_1.bind)(window, 'popstate', ev => {
        if (!(0, state_1.isTransitable)(page_1.page.state) || !(0, state_1.isTransitable)(window.history.state)) return;
        // Prevent updates by frames.
        if ((0, url_1.standardize)(window.location.href) === page_1.page.url.href) return;
        listener(ev);
      }));
    }, {
      delay: false
    });
  }
}
exports.NavigationView = NavigationView;

/***/ }),

/***/ 2920:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ScrollView = void 0;
const page_1 = __webpack_require__(8533);
const coroutine_1 = __webpack_require__(8779);
const url_1 = __webpack_require__(1904);
const throttle_1 = __webpack_require__(525);
const listener_1 = __webpack_require__(8400);
class ScrollView extends coroutine_1.Coroutine {
  constructor(window, listener) {
    super(async function* () {
      return this.finally((0, listener_1.bind)(window, 'scroll', (0, throttle_1.debounce)(100, ev => {
        if ((0, url_1.standardize)(window.location.href) !== page_1.page.url.href) return;
        listener(ev);
      }), {
        passive: true
      }));
    }, {
      delay: false
    });
  }
}
exports.ScrollView = ScrollView;

/***/ }),

/***/ 5801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SubmitView = void 0;
const coroutine_1 = __webpack_require__(8779);
const listener_1 = __webpack_require__(8400);
class SubmitView extends coroutine_1.Coroutine {
  constructor(document, selector, listener) {
    super(async function* () {
      return this.finally((0, listener_1.delegate)(document, selector, 'submit', ev => {
        if (!(ev.currentTarget instanceof HTMLFormElement)) return;
        listener(ev);
      }));
    }, {
      delay: false
    });
  }
}
exports.SubmitView = SubmitView;

/***/ }),

/***/ 2442:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.API = void 0;
const router_1 = __webpack_require__(9465);
const process_1 = __webpack_require__(8413);
const page_1 = __webpack_require__(8533);
const state_1 = __webpack_require__(396);
const listener_1 = __webpack_require__(8400);
class API {
  static assign(url, options, io = {
    document: window.document,
    router: router_1.route
  }) {
    return click(url, event => io.router(new router_1.Config(options), new router_1.RouterEvent(event, page_1.page.url), process_1.process, io));
  }
  static replace(url, options, io = {
    document: window.document,
    router: router_1.route
  }) {
    return click(url, event => io.router(new router_1.Config({
      ...options,
      replace: '*'
    }), new router_1.RouterEvent(event, page_1.page.url), process_1.process, io));
  }
  static sync(isPjaxPage) {
    isPjaxPage && (0, state_1.savePjax)();
    process_1.process.cast('', new Error('Canceled'));
    page_1.page.sync();
  }
  static pushURL(url, title, state = null) {
    window.history.pushState(state, title, url);
    this.sync();
  }
  static replaceURL(url, title, state = window.history.state) {
    const isPjaxPage = (0, state_1.isTransitable)(window.history.state);
    window.history.replaceState(state, title, url);
    this.sync(isPjaxPage);
  }
}
exports.API = API;
function click(url, callback) {
  const el = document.createElement('a');
  el.href = url;
  document.createDocumentFragment().appendChild(el);
  let result;
  (0, listener_1.once)(el, 'click', ev => {
    result = callback(ev);
    ev.preventDefault();
  });
  el.click();
  return result;
}

/***/ }),

/***/ 9869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GUI = void 0;
const api_1 = __webpack_require__(2442);
const click_1 = __webpack_require__(6345);
const submit_1 = __webpack_require__(5801);
const navigation_1 = __webpack_require__(3515);
const scroll_1 = __webpack_require__(2920);
const router_1 = __webpack_require__(9465);
const page_1 = __webpack_require__(8533);
__webpack_require__(7202);
const process_1 = __webpack_require__(8413);
const store_1 = __webpack_require__(8870);
const supervisor_1 = __webpack_require__(7339);
const copropagator_1 = __webpack_require__(7218);
class GUI extends api_1.API {
  constructor(options, io = {
    document: window.document,
    router: router_1.route
  }) {
    super();
    this.options = options;
    this.io = io;
    this.view = new View(this.options, this.io);
    GUI.resources.clear();
    GUI.resources.register('view', this.view);
  }
  assign(url) {
    return api_1.API.assign(url, this.options, this.io);
  }
  replace(url) {
    return api_1.API.replace(url, this.options, this.io);
  }
}
exports.GUI = GUI;
GUI.resources = new class extends supervisor_1.Supervisor {}();
class View extends copropagator_1.Copropagator {
  constructor(options, io) {
    const config = new router_1.Config(options);
    const router = event => void io.router(config, new router_1.RouterEvent(event, page_1.page.url), process_1.process, io);
    super([new click_1.ClickView(io.document, config.link, router), new submit_1.SubmitView(io.document, config.form, router), new navigation_1.NavigationView(window, router), new scroll_1.ScrollView(window, store_1.savePosition)]);
  }
}

/***/ }),

/***/ 9465:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._validate = exports.route = exports.RouterEventSource = exports.RouterEvent = exports.Config = void 0;
const router_1 = __webpack_require__(7430);
Object.defineProperty(exports, "Config", ({
  enumerable: true,
  get: function () {
    return router_1.Config;
  }
}));
Object.defineProperty(exports, "RouterEvent", ({
  enumerable: true,
  get: function () {
    return router_1.RouterEvent;
  }
}));
Object.defineProperty(exports, "RouterEventSource", ({
  enumerable: true,
  get: function () {
    return router_1.RouterEventSource;
  }
}));
const page_1 = __webpack_require__(8533);
const env_1 = __webpack_require__(5131);
const error_1 = __webpack_require__(5986);
const store_1 = __webpack_require__(8870);
const url_1 = __webpack_require__(1904);
const cancellation_1 = __webpack_require__(3669);
const maybe_1 = __webpack_require__(6189);
const promise_1 = __webpack_require__(8312);
function route(config, event, process, io) {
  switch (event.type) {
    case router_1.RouterEventType.Click:
    case router_1.RouterEventType.Submit:
      (0, store_1.savePosition)();
      break;
    case router_1.RouterEventType.Popstate:
      io.document.title = (0, store_1.loadTitle)();
      break;
  }
  return (0, maybe_1.Just)(0).guard(validate(event.request.url, config, event)).bind(() => (0, router_1.scope)(config, {
    orig: event.location.orig.pathname,
    dest: event.location.dest.pathname
  })).fmap(async config => {
    event.original.preventDefault();
    process.cast('', new Error('Canceled'));
    const cancellation = new cancellation_1.Cancellation();
    const kill = process.register('', err => {
      kill();
      cancellation.cancel(err);
      return promise_1.never;
    });
    page_1.page.isAvailable() && config.memory?.set(event.location.orig.path, io.document.cloneNode(true));
    page_1.page.process(event.location.dest);
    const [scripts] = await env_1.env;
    return (0, router_1.route)(config, event, {
      process: cancellation,
      scripts
    }, io).then(m => m.fmap(async ([ss, p]) => {
      kill();
      page_1.page.complete();
      for (const el of ss.filter(s => s.hasAttribute('src'))) {
        scripts.add(new url_1.URL((0, url_1.standardize)(el.src)).href);
      }
      for (const el of (await p).filter(s => s.hasAttribute('src'))) {
        scripts.add(new url_1.URL((0, url_1.standardize)(el.src)).href);
      }
    }).extract()).catch(reason => {
      kill();
      page_1.page.complete();
      if (cancellation.isAlive() || reason instanceof error_1.FatalError) {
        config.fallback(event.source, reason);
      }
    });
  }).extract(() => {
    switch (event.type) {
      case router_1.RouterEventType.Click:
      case router_1.RouterEventType.Submit:
        process.cast('', new Error('Canceled'));
        page_1.page.sync();
        return false;
      case router_1.RouterEventType.Popstate:
        // Disabled by scope.
        if (validate(event.location.dest, config, event)) {
          config.fallback(event.source, new Error('Disabled'));
          page_1.page.sync();
          return true;
        }
        process.cast('', new Error('Canceled'));
        page_1.page.sync();
        return false;
      default:
        throw new TypeError(event.type);
    }
  }, () => true);
}
exports.route = route;
function validate(url, config, event) {
  if (event.original.defaultPrevented) return false;
  if (!isAccessible(url)) return false;
  switch (event.type) {
    case router_1.RouterEventType.Click:
      return !isHashClick(url) && !isHashChange(url) && !isDownload(event.source) && !hasModifierKey(event.original) && config.filter(event.source);
    case router_1.RouterEventType.Submit:
      return true;
    case router_1.RouterEventType.Popstate:
      return !isHashChange(url);
  }
  function isAccessible(dest) {
    const orig = page_1.page.url;
    return orig.origin === dest.origin;
  }
  function isHashClick(dest) {
    const orig = page_1.page.url;
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
  const orig = page_1.page.url;
  return orig.resource === dest.resource && orig.fragment !== dest.fragment;
}

/***/ }),

/***/ 5131:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.env = void 0;
const script_1 = __webpack_require__(8521);
exports.env = Promise.all([script_1.scripts, new Promise(r => void setTimeout(r))]);

/***/ }),

/***/ 8533:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.page = void 0;
const state_1 = __webpack_require__(396);
const url_1 = __webpack_require__(1904);
const listener_1 = __webpack_require__(8400);
(0, listener_1.bind)(window, 'hashchange', () => void exports.page.sync(), true);
(0, listener_1.bind)(window, 'popstate', () => (0, state_1.isTransitable)(exports.page.state) && (0, state_1.isTransitable)(window.history.state) || void exports.page.sync(), true);
exports.page = new class {
  constructor() {
    this.$url = new url_1.URL((0, url_1.standardize)(window.location.href));
    this.$state = window.history.state;
    this.available = true;
  }
  get url() {
    return this.$url;
  }
  get state() {
    return this.$state;
  }
  isAvailable() {
    return this.available;
  }
  process(url) {
    this.available = false;
    this.target = url;
  }
  complete() {
    this.$url = this.target ?? new url_1.URL((0, url_1.standardize)(window.location.href));
    this.target = undefined;
    this.$state = window.history.state;
    this.available = true;
  }
  sync() {
    this.$url = new url_1.URL((0, url_1.standardize)(window.location.href));
    this.target = undefined;
    this.$state = window.history.state;
  }
}();

/***/ }),

/***/ 8413:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.process = void 0;
const supervisor_1 = __webpack_require__(7339);
exports.process = new class extends supervisor_1.Supervisor {}();

/***/ }),

/***/ 8521:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scripts = void 0;
const page_1 = __webpack_require__(8533);
const url_1 = __webpack_require__(1904);
const listener_1 = __webpack_require__(8400);
exports.scripts = new Set();
(0, listener_1.bind)(window, 'pjax:unload', () => void document.querySelectorAll('script[src]').forEach(script => void exports.scripts.add(new url_1.URL((0, url_1.standardize)(script.src, page_1.page.url.href)).href)));

/***/ }),

/***/ 7202:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const state_1 = __webpack_require__(396);
const listener_1 = __webpack_require__(8400);
// popstateイベントは事前に検知できないため事前設定
if ((0, state_1.isTransitable)(window.history.state)) {
  window.history.scrollRestoration = 'manual';
}
// 遷移前ページの設定
(0, listener_1.bind)(window, 'pjax:fetch', () => window.history.scrollRestoration = 'manual', true);
// 遷移後ページの設定
(0, listener_1.bind)(document, 'pjax:ready', () => window.history.scrollRestoration = 'manual', true);
// リロード後のスクロール位置復元に必要
(0, listener_1.bind)(window, 'unload', () => window.history.scrollRestoration = 'auto', true);

/***/ }),

/***/ 3072:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.serialize = void 0;
function serialize(form) {
  return [...form.elements].filter(el => {
    if (!('name' in el)) return false;
    if (el.disabled) return false;
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
  }).map(el => [encodeURIComponent(removeInvalidSurrogatePairs(el.name)), encodeURIComponent(removeInvalidSurrogatePairs(el.value))].join('=')).join('&');
  function removeInvalidSurrogatePairs(str) {
    return str.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '');
  }
}
exports.serialize = serialize;

/***/ }),

/***/ 5986:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FatalError = void 0;
class FatalError extends Error {
  constructor(msg) {
    super(msg);
  }
}
exports.FatalError = FatalError;
FatalError.prototype.name = 'FatalError';

/***/ }),

/***/ 6135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fix = exports.parse = void 0;
const maybe_1 = __webpack_require__(6189);
const either_1 = __webpack_require__(7704);
exports.parse = [parseByDOM, parseByDoc].reduce((m, f) => m.bind(() => test(f) ? (0, either_1.Left)(f) : m), (0, either_1.Right)(() => maybe_1.Nothing)).extract(f => html => (0, maybe_1.Just)(f(html)));
function parseByDOM(html) {
  const document = new DOMParser().parseFromString(html, 'text/html');
  fix(document);
  return document;
}
function parseByDoc(html) {
  const document = window.document.implementation.createHTMLDocument('');
  document.open();
  document.write(html);
  document.close();
  fix(document);
  return document;
}
function fix(document) {
  fixNoscript(document);
}
exports.fix = fix;
// Tags within noscript tags do not become elements if statically parsed from HTML.
function fixNoscript(document) {
  // :empty and :has do not work.
  for (const el of document.querySelectorAll('noscript')) {
    if (!el.firstElementChild) continue;
    el.textContent = el.innerHTML;
  }
}
function test(parser) {
  try {
    const html = `
<html lang="en" class="html">
  <head>
    <link href="/">
    <title>&amp;</title>
    <noscript><style><></style></noscript>
  </head>
  <body>
    <noscript><style><></style></noscript>
    <a href="/"></a>
    <script>document.head.remove();</script>
    <img src="abc">
  </body>
</html>
`;
    const document = parser(html);
    switch (false) {
      case document.title === '&':
      case !!document.querySelector('html.html[lang="en"]'):
      case !!document.querySelector('head > link').href:
      case !!document.querySelector('body > a').href:
      case !document.querySelector('noscript > *'):
      case document.querySelector('script').innerHTML === 'document.head.remove();':
      case document.querySelector('img').src.endsWith('abc'):
      case document.querySelector('head > noscript').textContent === '<style><></style>':
      case document.querySelector('body > noscript').textContent === '<style><></style>':
        throw undefined;
    }
    return true;
  } catch {
    return false;
  }
}

/***/ }),

/***/ 3026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FakeXMLHttpRequest = void 0;
const promise_1 = __webpack_require__(8312);
const chrono_1 = __webpack_require__(9522);
class FakeXMLHttpRequest extends XMLHttpRequest {
  static create(url, response) {
    const xhr = new FakeXMLHttpRequest();
    promise_1.AtomicPromise.resolve(response).then(response => {
      if (xhr.readyState === 4) return;
      Object.defineProperties(xhr, {
        responseURL: {
          value: url
        },
        responseXML: {
          value: response
        }
      });
      xhr.send();
    }, reason => {
      if (xhr.readyState === 4) return;
      const response = reason instanceof Response ? reason : new Response(null, xhr);
      Object.defineProperties(xhr, {
        responseURL: {
          value: url
        },
        readyState: {
          value: 4
        },
        status: {
          value: response.status || 400
        },
        statusText: {
          value: response.statusText || 'Bad Request'
        }
      });
      xhr.dispatchEvent(new ProgressEvent('error'));
    });
    return xhr;
  }
  constructor() {
    super();
    this.responseType = 'document';
  }
  send(_) {
    if (this.readyState === 4) return;
    Object.defineProperties(this, {
      readyState: {
        configurable: true,
        value: 3
      }
    });
    this.dispatchEvent(new ProgressEvent('loadstart'));
    chrono_1.clock.now(() => {
      if (this.readyState === 4) return;
      Object.defineProperties(this, {
        response: {
          get: () => this.responseType === 'document' ? this.responseXML : this.responseText
        },
        readyState: {
          value: 4
        },
        status: {
          value: 200
        },
        statusText: {
          value: 'OK'
        }
      });
      this.dispatchEvent(new ProgressEvent('loadend'));
      this.dispatchEvent(new ProgressEvent('load'));
    });
  }
  abort() {
    if (this.readyState === 4) return;
    Object.defineProperties(this, {
      readyState: {
        value: 4
      },
      status: {
        value: 400
      },
      statusText: {
        value: 'Bad Request'
      }
    });
    this.dispatchEvent(new ProgressEvent('abort'));
  }
  getResponseHeader(name) {
    switch (name.toLowerCase()) {
      case 'content-type':
        return 'text/html';
      default:
        return null;
    }
  }
}
exports.FakeXMLHttpRequest = FakeXMLHttpRequest;

/***/ }),

/***/ 394:
/***/ (function(module) {

/*! typed-dom v0.0.349 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5413:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log10 = exports.log2 = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.PI = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.EPSILON = exports.MIN_VALUE = exports.MIN_SAFE_INTEGER = exports.MAX_VALUE = exports.MAX_SAFE_INTEGER = void 0;
exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER, exports.MAX_VALUE = Number.MAX_VALUE, exports.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER, exports.MIN_VALUE = Number.MIN_VALUE, exports.EPSILON = Number.EPSILON, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.PI = Math.PI, exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.log2 = Math.log2, exports.log10 = Math.log10, exports.sqrt = Math.sqrt;
exports.isArray = Array.isArray;
exports.hasOwnProperty = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
exports.isPrototypeOf = Object.prototype.isPrototypeOf.call.bind(Object.prototype.isPrototypeOf);
exports.isEnumerable = Object.prototype.propertyIsEnumerable.call.bind(Object.prototype.propertyIsEnumerable);
exports.toString = Object.prototype.toString.call.bind(Object.prototype.toString);
exports.ObjectAssign = Object.assign;
exports.ObjectCreate = Object.create;
exports.ObjectGetPrototypeOf = Object.getPrototypeOf;
exports.ObjectSetPrototypeOf = Object.setPrototypeOf;

/***/ }),

/***/ 1934:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.equal = void 0;
function equal(a, b) {
  return a === a ? a === b : b !== b;
}
exports.equal = equal;

/***/ }),

/***/ 6925:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_3150__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.reduce = exports.memoize = void 0;
const alias_1 = __nested_webpack_require_3150__(5413);
const compare_1 = __nested_webpack_require_3150__(1934);
function memoize(f, identify, memory) {
  if (typeof identify === 'object') {
    memory = identify;
    identify = undefined;
  }
  identify ??= (...as) => as[0];
  switch (true) {
    case (0, alias_1.isArray)(memory):
      return memoizeArray(f, identify, memory);
    case memory?.constructor === Object:
      return memoizeObject(f, identify, memory);
    default:
      return memoizeDict(f, identify, memory ?? new Map());
  }
}
exports.memoize = memoize;
function memoizeArray(f, identify, memory) {
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined) return z;
    z = f(...as);
    memory[b] = z;
    return z;
  };
}
function memoizeObject(f, identify, memory) {
  let nullable = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined || nullable && b in memory) return z;
    z = f(...as);
    nullable ||= z === undefined;
    memory[b] = z;
    return z;
  };
}
function memoizeDict(f, identify, memory) {
  let nullable = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory.get(b);
    if (z !== undefined || nullable && memory.has(b)) return z;
    z = f(...as);
    nullable ||= z === undefined;
    memory.add?.(b, z) ?? memory.set(b, z);
    return z;
  };
}
function reduce(f, identify = (...as) => as[0]) {
  let key = {};
  let val;
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

/***/ }),

/***/ 5761:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_5013__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defrag = exports.prepend = exports.append = exports.isChildren = exports.define = exports.element = exports.text = exports.math = exports.svg = exports.html = exports.frag = exports.shadow = void 0;
const alias_1 = __nested_webpack_require_5013__(5413);
const memoize_1 = __nested_webpack_require_5013__(6925);
var caches;
(function (caches) {
  // Closed only.
  caches.shadows = new WeakMap();
  caches.shadow = (0, memoize_1.memoize)((el, opts) => el.attachShadow(opts), caches.shadows);
  caches.fragment = document.createDocumentFragment();
})(caches || (caches = {}));
function shadow(el, opts, children, factory = exports.html) {
  if (typeof el === 'string') return shadow(factory(el), opts, children, factory);
  if (typeof opts === 'function') return shadow(el, undefined, children, opts);
  if (typeof children === 'function') return shadow(el, opts, undefined, children);
  if (isChildren(opts)) return shadow(el, undefined, opts, factory);
  return defineChildren(!opts ? el.shadowRoot ?? caches.shadows.get(el) ?? el.attachShadow({
    mode: 'open'
  }) : opts.mode === 'open' ? el.shadowRoot ?? el.attachShadow(opts) : caches.shadow(el, opts), children);
}
exports.shadow = shadow;
function frag(children) {
  return defineChildren(caches.fragment.cloneNode(true), children);
}
exports.frag = frag;
exports.html = element(document, "HTML" /* NS.HTML */);
exports.svg = element(document, "SVG" /* NS.SVG */);
exports.math = element(document, "MathML" /* NS.Math */);
function text(source) {
  return document.createTextNode(source);
}
exports.text = text;
function element(context, ns) {
  return (tag, attrs, children) => {
    return !attrs || isChildren(attrs) ? defineChildren(elem(context, ns, tag, {}), attrs ?? children) : defineChildren(defineAttrs(elem(context, ns, tag, attrs), attrs), children);
  };
}
exports.element = element;
function elem(context, ns, tag, attrs) {
  if (!('createElement' in context)) throw new Error(`Typed-DOM: Scoped custom elements are not supported on this browser`);
  const opts = 'is' in attrs ? {
    is: attrs['is']
  } : undefined;
  switch (ns) {
    case "HTML" /* NS.HTML */:
      return context.createElement(tag, opts);
    case "SVG" /* NS.SVG */:
      return context.createElementNS('http://www.w3.org/2000/svg', tag, opts);
    case "MathML" /* NS.Math */:
      return context.createElementNS('http://www.w3.org/1998/Math/MathML', tag, opts);
  }
}
function define(node, attrs, children) {
  // Bug: TypeScript
  // Need the next type assertions to suppress an impossible type error on dependent projects.
  // Probably caused by typed-query-selector.
  //
  //   typed-dom/dom.ts(113,3): Error TS2322: Type 'ParentNode & Node' is not assignable to type 'E'.
  //     'E' could be instantiated with an arbitrary type which could be unrelated to 'ParentNode & Node'.
  //
  return !attrs || isChildren(attrs) ? defineChildren(node, attrs ?? children) : defineChildren(defineAttrs(node, attrs), children);
}
exports.define = define;
function defineAttrs(el, attrs) {
  for (const name of Object.keys(attrs)) {
    switch (name) {
      case 'is':
        continue;
    }
    const value = attrs[name];
    switch (typeof value) {
      case 'string':
        el.setAttribute(name, value);
        if (name.startsWith('on')) {
          const type = name.slice(2).toLowerCase();
          switch (type) {
            case 'mutate':
            case 'connect':
            case 'disconnect':
              const prop = `on${type}`;
              el[prop] ?? Object.defineProperty(el, prop, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: prop in el && !(0, alias_1.hasOwnProperty)(el, prop) ? ev => ev.returnValue : ''
              });
          }
        }
        continue;
      case 'function':
        if (name.length < 3) throw new Error(`Typed-DOM: Attribute names for event listeners must have an event name but got "${name}"`);
        const names = name.split(/\s+/);
        for (const name of names) {
          if (!name.startsWith('on')) throw new Error(`Typed-DOM: Attribute names for event listeners must start with "on" but got "${name}"`);
          const type = name.slice(2).toLowerCase();
          el.addEventListener(type, value, {
            passive: ['wheel', 'mousewheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(type)
          });
          switch (type) {
            case 'mutate':
            case 'connect':
            case 'disconnect':
              const prop = `on${type}`;
              el[prop] ?? Object.defineProperty(el, prop, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: prop in el && !(0, alias_1.hasOwnProperty)(el, prop) ? ev => ev.returnValue : ''
              });
          }
        }
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
  if (children === undefined) return node;
  if (typeof children === 'string') {
    node.textContent = children;
  } else if (((0, alias_1.isArray)(children) || !(Symbol.iterator in children)) && !node.firstChild) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      typeof child === 'object' ? node.appendChild(child) : node.append(child);
    }
  } else {
    node.replaceChildren(...children);
  }
  return node;
}
function isChildren(value) {
  return value?.[Symbol.iterator] !== undefined;
}
exports.isChildren = isChildren;
function append(node, children) {
  if (children === undefined) return node;
  if (typeof children === 'string') {
    node.append(children);
  } else if ((0, alias_1.isArray)(children) || !(Symbol.iterator in children)) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      typeof child === 'object' ? node.appendChild(child) : node.append(child);
    }
  } else {
    for (const child of children) {
      typeof child === 'object' ? node.appendChild(child) : node.append(child);
    }
  }
  return node;
}
exports.append = append;
function prepend(node, children) {
  if (children === undefined) return node;
  if (typeof children === 'string') {
    node.prepend(children);
  } else if ((0, alias_1.isArray)(children) || !(Symbol.iterator in children)) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      typeof child === 'object' ? node.insertBefore(child, null) : node.prepend(child);
    }
  } else {
    for (const child of children) {
      typeof child === 'object' ? node.insertBefore(child, null) : node.prepend(child);
    }
  }
  return node;
}
exports.prepend = prepend;
function defrag(nodes) {
  const acc = [];
  let appendable = false;
  for (let i = 0, len = nodes.length; i < len; ++i) {
    const node = nodes[i];
    if (typeof node === 'object') {
      acc.push(node);
      appendable = false;
    } else if (node !== '') {
      appendable ? acc[acc.length - 1] += node : acc.push(node);
      appendable = true;
    }
  }
  return acc;
}
exports.defrag = defrag;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_12534__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_12534__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __nested_webpack_exports__ = __nested_webpack_require_12534__(5761);
/******/ 	
/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 8400:
/***/ (function(module) {

/*! typed-dom v0.0.349 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5413:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log10 = exports.log2 = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.PI = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports.EPSILON = exports.MIN_VALUE = exports.MIN_SAFE_INTEGER = exports.MAX_VALUE = exports.MAX_SAFE_INTEGER = void 0;
exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER, exports.MAX_VALUE = Number.MAX_VALUE, exports.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER, exports.MIN_VALUE = Number.MIN_VALUE, exports.EPSILON = Number.EPSILON, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.PI = Math.PI, exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.log2 = Math.log2, exports.log10 = Math.log10, exports.sqrt = Math.sqrt;
exports.isArray = Array.isArray;
exports.hasOwnProperty = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
exports.isPrototypeOf = Object.prototype.isPrototypeOf.call.bind(Object.prototype.isPrototypeOf);
exports.isEnumerable = Object.prototype.propertyIsEnumerable.call.bind(Object.prototype.propertyIsEnumerable);
exports.toString = Object.prototype.toString.call.bind(Object.prototype.toString);
exports.ObjectAssign = Object.assign;
exports.ObjectCreate = Object.create;
exports.ObjectGetPrototypeOf = Object.getPrototypeOf;
exports.ObjectSetPrototypeOf = Object.setPrototypeOf;

/***/ }),

/***/ 1825:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noop = exports.fix = exports.id = exports.clear = exports.singleton = void 0;
function singleton(f) {
  let result;
  return function (...as) {
    if (f === noop) return result;
    result = f.call(this, ...as);
    f = noop;
    return result;
  };
}
exports.singleton = singleton;
function clear(f) {
  return (...as) => void f(...as);
}
exports.clear = clear;
function id(a) {
  return a;
}
exports.id = id;
function fix(f) {
  return a1 => {
    const a2 = f(a1);
    return a1 === a2 || a2 !== a2 ? a2 : f(a2);
  };
}
exports.fix = fix;
function noop() {}
exports.noop = noop;

/***/ }),

/***/ 8312:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_3631__) => {



var _a, _b;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.never = exports.isPromiseLike = exports.Internal = exports.AtomicPromise = exports.internal = void 0;
const alias_1 = __nested_webpack_require_3631__(5413);
const function_1 = __nested_webpack_require_3631__(1825);
exports.internal = Symbol.for('spica/promise::internal');
class AtomicPromise {
  static get [(_a = Symbol.toStringTag, Symbol.species)]() {
    return AtomicPromise;
  }
  static all(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = Array(values.length);
      let done = false;
      let count = 0;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        if (!isPromiseLike(value)) {
          results[i] = value;
          ++count;
          continue;
        }
        if (isAtomicPromiseLike(value)) {
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              results[i] = status.value;
              ++count;
              continue;
            case 3 /* State.rejected */:
              return reject(status.reason);
          }
        }
        value.then(value => {
          results[i] = value;
          ++count;
          count === values.length && resolve(results);
        }, reason => {
          reject(reason);
          done = true;
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
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              return resolve(status.value);
            case 3 /* State.rejected */:
              return reject(status.reason);
          }
        }
      }
      let done = false;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        value.then(value => {
          resolve(value);
          done = true;
        }, reason => {
          reject(reason);
          done = true;
        });
      }
    });
  }
  static allSettled(vs) {
    return new AtomicPromise(resolve => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = Array(values.length);
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
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              results[i] = {
                status: 'fulfilled',
                value: status.value
              };
              ++count;
              continue;
            case 3 /* State.rejected */:
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
  static any(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const reasons = Array(values.length);
      let done = false;
      let count = 0;
      for (let i = 0; !done && i < values.length; ++i) {
        const value = values[i];
        if (!isPromiseLike(value)) {
          return resolve(value);
        }
        if (isAtomicPromiseLike(value)) {
          const {
            status
          } = value[exports.internal];
          switch (status.state) {
            case 2 /* State.fulfilled */:
              return resolve(status.value);
            case 3 /* State.rejected */:
              reasons[i] = status.reason;
              ++count;
              continue;
          }
        }
        value.then(value => {
          resolve(value);
          done = true;
        }, reason => {
          reasons[i] = reason;
          ++count;
          count === values.length && reject(new AggregateError(reasons, 'All promises were rejected'));
        });
      }
      count === values.length && reject(new AggregateError(reasons, 'All promises were rejected'));
    });
  }
  static resolve(value) {
    const p = new AtomicPromise(function_1.noop);
    p[exports.internal].resolve(value);
    return p;
  }
  static reject(reason) {
    const p = new AtomicPromise(function_1.noop);
    p[exports.internal].reject(reason);
    return p;
  }
  constructor(executor) {
    this[_a] = 'Promise';
    this[_b] = new Internal();
    if (executor === function_1.noop) return;
    try {
      executor(value => void this[exports.internal].resolve(value), reason => void this[exports.internal].reject(reason));
    } catch (reason) {
      this[exports.internal].reject(reason);
    }
  }
  then(onfulfilled, onrejected) {
    const p = new AtomicPromise(function_1.noop);
    this[exports.internal].then(p[exports.internal], onfulfilled, onrejected);
    return p;
  }
  catch(onrejected) {
    return this.then(undefined, onrejected);
  }
  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }
}
exports.AtomicPromise = AtomicPromise;
_b = exports.internal;
class Internal {
  constructor() {
    this.status = {
      state: 0 /* State.pending */
    };
    this.fulfillReactions = [];
    this.rejectReactions = [];
  }
  isPending() {
    return this.status.state === 0 /* State.pending */;
  }
  resolve(value) {
    if (!this.isPending()) return;
    if (!isPromiseLike(value)) {
      this.status = {
        state: 2 /* State.fulfilled */,
        value: value
      };
      return this.resume();
    }
    if (isAtomicPromiseLike(value)) {
      return value[exports.internal].then(this);
    }
    this.status = {
      state: 1 /* State.resolved */,
      promise: value
    };
    return void value.then(value => {
      this.status = {
        state: 2 /* State.fulfilled */,
        value
      };
      this.resume();
    }, reason => {
      this.status = {
        state: 3 /* State.rejected */,
        reason
      };
      this.resume();
    });
  }
  reject(reason) {
    if (!this.isPending()) return;
    this.status = {
      state: 3 /* State.rejected */,
      reason
    };
    return this.resume();
  }
  then(internal, onfulfilled, onrejected) {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;
    switch (status.state) {
      case 2 /* State.fulfilled */:
        if (fulfillReactions.length !== 0) break;
        return call(internal, true, onfulfilled, status.value);
      case 3 /* State.rejected */:
        if (rejectReactions.length !== 0) break;
        return call(internal, false, onrejected, status.reason);
    }
    fulfillReactions.push({
      internal,
      state: true,
      procedure: onfulfilled
    });
    rejectReactions.push({
      internal,
      state: false,
      procedure: onrejected
    });
  }
  resume() {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;
    switch (status.state) {
      case 0 /* State.pending */:
      case 1 /* State.resolved */:
        return;
      case 2 /* State.fulfilled */:
        if (rejectReactions.length !== 0) {
          this.rejectReactions = [];
        }
        if (fulfillReactions.length === 0) return;
        react(fulfillReactions, status.value);
        this.fulfillReactions = [];
        return;
      case 3 /* State.rejected */:
        if (fulfillReactions.length !== 0) {
          this.fulfillReactions = [];
        }
        if (rejectReactions.length === 0) return;
        react(rejectReactions, status.reason);
        this.rejectReactions = [];
        return;
    }
  }
}
exports.Internal = Internal;
function react(reactions, param) {
  for (let i = 0; i < reactions.length; ++i) {
    const {
      internal,
      state,
      procedure
    } = reactions[i];
    call(internal, state, procedure, param);
  }
}
function call(internal, state, procedure, param) {
  if (procedure == null) return state ? internal.resolve(param) : internal.reject(param);
  try {
    internal.resolve(procedure(param));
  } catch (reason) {
    internal.reject(reason);
  }
}
function isPromiseLike(value) {
  return value != null && typeof value === 'object' && 'then' in value && typeof value.then === 'function';
}
exports.isPromiseLike = isPromiseLike;
function isAtomicPromiseLike(value) {
  return exports.internal in value;
}
exports.never = new class Never extends Promise {
  static get [Symbol.species]() {
    return Never;
  }
  constructor() {
    super(function_1.noop);
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

/***/ }),

/***/ 1365:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_13445__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bind = exports.delegate = exports.once = exports.listen = exports.currentTarget = void 0;
const alias_1 = __nested_webpack_require_13445__(5413);
const promise_1 = __nested_webpack_require_13445__(8312);
const function_1 = __nested_webpack_require_13445__(1825);
exports.currentTarget = Symbol.for('typed-dom::currentTarget');
function listen(target, selector, type, listener, option) {
  return typeof type === 'string' ? delegate(target, selector, type, listener, option) : bind(target, selector, type, listener);
}
exports.listen = listen;
function once(target, selector, type, listener, option) {
  switch (typeof type) {
    case 'string':
      switch (typeof listener) {
        case 'function':
          return delegate(target, selector, type, listener, {
            ...(typeof option === 'boolean' ? {
              capture: option
            } : option),
            once: true
          });
        case 'object':
          option = {
            ...listener,
            once: true
          };
          break;
        default:
          option = {
            once: true
          };
      }
      return new promise_1.AtomicPromise(resolve => void delegate(target, selector, type, resolve, option));
    case 'function':
      return bind(target, selector, type, {
        ...(typeof listener === 'boolean' ? {
          capture: listener
        } : listener),
        once: true
      });
    case 'object':
      option = {
        ...type,
        once: true
      };
      break;
    default:
      option = {
        once: true
      };
  }
  return new promise_1.AtomicPromise(resolve => void bind(target, selector, resolve, option));
}
exports.once = once;
function delegate(target, selector, type, listener, option) {
  return bind(target, type, ev => {
    const cx = ev.target.shadowRoot ? ev.composedPath()[0]?.closest(selector) : ev.target?.closest(selector);
    cx && once(cx, type, e => {
      e === ev && listener(ev);
    }, option);
  }, {
    ...(typeof option === 'boolean' ? {
      capture: true
    } : option),
    capture: true
  });
}
exports.delegate = delegate;
function bind(target, type, listener, option) {
  switch (type) {
    case 'mutate':
    case 'connect':
    case 'disconnect':
      const prop = `on${type}`;
      target[prop] ?? Object.defineProperty(target, prop, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: prop in target && !(0, alias_1.hasOwnProperty)(target, prop) ? ev => ev.returnValue : ''
      });
  }
  target.addEventListener(type, handler, option);
  return (0, function_1.singleton)(() => void target.removeEventListener(type, handler, option));
  function handler(ev) {
    ev[exports.currentTarget] = ev.currentTarget;
    listener(ev);
  }
}
exports.bind = bind;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_16535__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_16535__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __nested_webpack_exports__ = __nested_webpack_require_16535__(1365);
/******/ 	
/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 2282:
/***/ (function(module) {

/*! typed-dom v0.0.349 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __nested_webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.querySelectorAll = exports.querySelectorAllWith = exports.querySelectorWith = void 0;
function querySelectorWith(node, selector) {
  return 'matches' in node && node.matches(selector) ? node : node.querySelector(selector);
}
exports.querySelectorWith = querySelectorWith;
function querySelectorAllWith(node, selector) {
  const acc = [];
  if ('matches' in node && node.matches(selector)) {
    acc.push(node);
  }
  for (let es = node.querySelectorAll(selector), len = es.length, i = 0; i < len; ++i) {
    acc.push(es[i]);
  }
  return acc;
}
exports.querySelectorAllWith = querySelectorAllWith;
function querySelectorAll(node, selector) {
  const acc = [];
  for (let es = node.querySelectorAll(selector), len = es.length, i = 0; i < len; ++i) {
    acc.push(es[i]);
  }
  return acc;
}
exports.querySelectorAll = querySelectorAll;
})();

/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 3911:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 3911;
module.exports = webpackEmptyContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(8257);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});