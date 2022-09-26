/*! pjax-api v3.37.0 https://github.com/falsandtru/pjax-api | (c) 2012, falsandtru | (Apache-2.0 AND MPL-2.0) License */
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

/***/ 8767:
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

var export_1 = __webpack_require__(4279);

Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return __importDefault(export_1).default;
  }
}));

__exportStar(__webpack_require__(4279), exports);

/***/ }),

/***/ 5406:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports[NaN] = void 0;
exports[NaN] = Number.NaN, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.sqrt = Math.sqrt;
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

/***/ 8112:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.splice = exports.pop = exports.push = exports.shift = exports.unshift = exports.indexOf = void 0;

const global_1 = __webpack_require__(4128);

const undefined = void 0;

function indexOf(as, a) {
  if (as.length === 0) return -1;
  return a === a ? as.indexOf(a) : as.findIndex(a => a !== a);
}

exports.indexOf = indexOf;

function unshift(as, bs) {
  if ('length' in as) {
    if (as.length === 1) return bs.unshift(as[0]), bs;
    if (global_1.Symbol.iterator in as) return bs.unshift(...as), bs;

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
    if (global_1.Symbol.iterator in bs && bs.length > 50) return as.push(...bs), as;

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
    case 0:
      if (count === 0) return unshift(values, as), [];
      if (count === 1) return [[as.shift()], unshift(values, as)][0];
      break;

    case as.length - 1:
      if (count === 1) return [[as.pop()], push(as, values)][0];
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

/***/ 4401:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.template = exports.inherit = exports.merge = exports.extend = exports.overwrite = exports.clone = exports.assign = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const type_1 = __webpack_require__(5177);

const array_1 = __webpack_require__(8112);

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
          return (0, alias_1.hasOwnProperty)(target, prop) ? (0, exports.inherit)(target[prop], source[prop]) : target[prop] = (0, exports.inherit)((0, alias_1.ObjectCreate)(target[prop]), source[prop]);

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
      const keys = global_1.Object.keys(source);

      for (let i = 0; i < keys.length; ++i) {
        strategy(keys[i], target, source);
      }
    }

    return target;
  }
}

exports.template = template;

function empty(source) {
  return source instanceof global_1.Object ? {} : (0, alias_1.ObjectCreate)(null);
}

/***/ }),

/***/ 9210:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Cache = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const clock_1 = __webpack_require__(7681);

const invlist_1 = __webpack_require__(7452);

const heap_1 = __webpack_require__(818);

const assign_1 = __webpack_require__(4401);

class Cache {
  constructor(capacity, opts = {}) {
    this.settings = {
      capacity: 0,
      window: 100,
      age: global_1.Infinity,
      earlyExpiring: false,
      capture: {
        delete: true,
        clear: true
      },
      resolution: 1,
      offset: 0,
      entrance: 50,
      threshold: 20,
      sweep: 10,
      test: false
    };
    this.overlap = 0;
    this.SIZE = 0;
    this.memory = new global_1.Map();
    this.indexes = {
      LRU: new invlist_1.List(),
      LFU: new invlist_1.List()
    };
    this.expiries = new heap_1.Heap(heap_1.Heap.min);
    this.misses = 0;
    this.sweep = 0;
    this.ratio = 500;

    if (typeof capacity === 'object') {
      opts = capacity;
      capacity = opts.capacity ?? 0;
    }

    const settings = (0, assign_1.extend)(this.settings, opts, {
      capacity
    });
    this.capacity = settings.capacity;
    if (this.capacity >= 1 === false) throw new Error(`Spica: Cache: Capacity must be 1 or more.`);
    this.window = settings.window * this.capacity / 100 >>> 0 || this.capacity;
    if (this.window * 1000 >= this.capacity === false) throw new Error(`Spica: Cache: Window must be 0.1% of capacity or more.`);
    this.threshold = settings.threshold;
    this.limit = 1000 - settings.entrance;
    this.age = settings.age;
    this.earlyExpiring = settings.earlyExpiring;
    this.disposer = settings.disposer;
    this.stats = opts.resolution || opts.offset ? new StatsExperimental(this.window, settings.resolution, settings.offset) : new Stats(this.window);
    this.test = settings.test;
  }

  get length() {
    //assert(this.indexes.LRU.length + this.indexes.LFU.length === this.memory.size);
    return this.indexes.LRU.length + this.indexes.LFU.length;
  }

  get size() {
    return this.SIZE;
  }

  evict(node, callback) {
    const index = node.value;
    callback &&= !!this.disposer;
    this.overlap -= +(index.region === 'LFU' && node.list === this.indexes.LRU);

    if (index.enode) {
      this.expiries.delete(index.enode);
      index.enode = void 0;
    }

    node.delete();
    this.memory.delete(index.key);
    this.SIZE -= index.size;
    callback && this.disposer?.(node.value.value, index.key);
  }

  ensure(margin, skip) {
    let size = skip?.value.size ?? 0;
    const {
      LRU,
      LFU
    } = this.indexes;

    while (this.size + margin - size > this.capacity) {
      let target;

      switch (true) {
        case (target = this.expiries.peek()) && target !== skip && target.value.expiry < (0, clock_1.now)():
          break;

        case LRU.length === 0:
          target = LFU.last !== skip ? LFU.last : LFU.last.prev;
          break;
        // @ts-expect-error

        case LFU.length > this.capacity * this.ratio / 1000:
          target = LFU.last !== skip ? LFU.last : LFU.length >= 2 ? LFU.last.prev : skip;

          if (target !== skip) {
            LRU.unshiftNode(target);
            ++this.overlap;
          }

        // fallthrough

        default:
          if (this.misses * 100 > LRU.length * this.threshold) {
            this.sweep ||= LRU.length * this.settings.sweep / 100 + 1 >>> 0;

            if (this.sweep > 0) {
              LRU.head = LRU.head.next.next;
              --this.sweep;
              this.sweep ||= -(0, alias_1.round)(LRU.length * this.settings.sweep / 100 * 99 / 100);
            } else {
              ++this.sweep;
            }
          }

          target = LRU.last !== skip ? LRU.last : LRU.length >= 2 ? LRU.last.prev : LFU.last;
      }

      this.evict(target, true);
      skip = skip?.list && skip;
      size = skip?.value.size ?? 0;
    }

    return !!skip?.list;
  }

  put(key, value, {
    size = 1,
    age = this.age
  } = {}) {
    if (size < 1 || this.capacity < size || age <= 0) {
      this.disposer?.(value, key);
      return false;
    }

    if (age === global_1.Infinity) {
      age = 0;
    }

    const expiry = age ? (0, clock_1.now)() + age : global_1.Infinity;
    const node = this.memory.get(key);

    if (node && this.ensure(size, node)) {
      const val = node.value.value;
      const index = node.value;
      this.SIZE += size - index.size;
      index.size = size;
      index.expiry = expiry;

      if (this.earlyExpiring && age) {
        index.enode ? this.expiries.update(index.enode, expiry) : index.enode = this.expiries.insert(node, expiry);
      } else if (index.enode) {
        this.expiries.delete(index.enode);
        index.enode = void 0;
      }

      node.value.value = value;
      this.disposer?.(val, key);
      return true;
    }

    this.ensure(size);
    const {
      LRU
    } = this.indexes;
    this.SIZE += size;
    this.memory.set(key, LRU.unshift({
      key,
      value,
      size,
      expiry,
      region: 'LRU'
    }));

    if (this.earlyExpiring && age) {
      LRU.head.value.enode = this.expiries.insert(LRU.head, expiry);
    }

    return false;
  }

  set(key, value, opts) {
    this.put(key, value, opts);
    return this;
  }

  get(key) {
    const node = this.memory.get(key);

    if (!node) {
      ++this.misses;
      return;
    }

    const expiry = node.value.expiry;

    if (expiry !== global_1.Infinity && expiry < (0, clock_1.now)()) {
      ++this.misses;
      this.evict(node, true);
      return;
    }

    this.misses &&= 0;
    this.sweep &&= 0; // Optimization for memoize.

    if (!this.test && node === node.list.head) return node.value.value;
    this.access(node);
    this.adjust();
    return node.value.value;
  }

  has(key) {
    //assert(this.memory.has(key) === (this.indexes.LFU.has(key) || this.indexes.LRU.has(key)));
    //assert(this.memory.size === this.indexes.LFU.length + this.indexes.LRU.length);
    const node = this.memory.get(key);
    if (!node) return false;
    const expiry = node.value.expiry;

    if (expiry !== global_1.Infinity && expiry < (0, clock_1.now)()) {
      this.evict(node, true);
      return false;
    }

    return true;
  }

  delete(key) {
    const node = this.memory.get(key);
    if (!node) return false;
    this.evict(node, this.settings.capture.delete === true);
    return true;
  }

  clear() {
    this.misses = 0;
    this.sweep = 0;
    this.overlap = 0;
    this.SIZE = 0;
    this.ratio = 500;
    this.stats.clear();
    this.indexes.LRU.clear();
    this.indexes.LFU.clear();
    this.expiries.clear();
    if (!this.disposer || !this.settings.capture.clear) return void this.memory.clear();
    const memory = this.memory;
    this.memory = new global_1.Map();

    for (const {
      0: key,
      1: {
        value: {
          value
        }
      }
    } of memory) {
      this.disposer(value, key);
    }
  }

  resize(capacity) {
    if (this.capacity >= 1 === false) throw new Error(`Spica: Cache: Capacity must be 1 or more.`);
    this.capacity = capacity;
    this.window = this.settings.window || this.capacity;
    if (this.window * 1000 >= this.capacity === false) throw new Error(`Spica: Cache: Window must be 0.1% of capacity or more.`);
    this.ensure(0);
  }

  *[Symbol.iterator]() {
    for (const {
      0: key,
      1: {
        value: {
          value
        }
      }
    } of this.memory) {
      yield [key, value];
    }

    return;
  }

  adjust() {
    const {
      capacity,
      ratio,
      limit,
      stats,
      indexes
    } = this;
    if (stats.subtotal() * 1000 % capacity || !stats.isFull()) return;
    const lenR = indexes.LRU.length;
    const lenF = indexes.LFU.length;
    const lenO = this.overlap;
    const leverage = (lenF + lenO) * 1000 / (lenR + lenF) | 0;
    const rateR0 = stats.rateLRU() * leverage;
    const rateF0 = stats.rateLFU() * (1000 - leverage);
    const rateF1 = stats.offset && stats.rateLFU(true) * (1000 - leverage); // 操作頻度を超えてキャッシュ比率を増減させても余剰比率の消化が追いつかず無駄
    // LRUの下限設定ではLRU拡大の要否を迅速に判定できないためLFUのヒット率低下の検出で代替する

    if (ratio > 0 && (rateR0 > rateF0 || stats.offset && rateF0 * 100 < rateF1 * (100 - stats.offset))) {
      //rateR0 <= rateF0 && rateF0 * 100 < rateF1 * (100 - stats.offset) && console.debug(0);
      if (lenR >= capacity * (1000 - ratio) / 1000) {
        //ratio % 100 || ratio === 1000 || console.debug('-', ratio, LRU, LFU);
        --this.ratio;
      }
    } else if (ratio < limit && rateF0 > rateR0) {
      if (lenF >= capacity * ratio / 1000) {
        //ratio % 100 || ratio === 0 || console.debug('+', ratio, LRU, LFU);
        ++this.ratio;
      }
    }
  }

  access(node) {
    return this.accessLFU(node) || this.accessLRU(node);
  }

  accessLRU(node) {
    const index = node.value;
    ++this.stats[index.region][0];
    this.overlap -= +(index.region === 'LFU');
    index.region = 'LFU';
    this.indexes.LFU.unshiftNode(node);
    return true;
  }

  accessLFU(node) {
    if (node.list !== this.indexes.LFU) return false;
    const index = node.value;
    ++this.stats[index.region][0];
    node.moveToHead();
    return true;
  }

}

exports.Cache = Cache;

class Stats {
  constructor(window) {
    this.window = window;
    this.offset = 0;
    this.max = 2;
    this.LRU = [0];
    this.LFU = [0];
  }

  static rate(window, hits1, hits2, offset) {
    const currTotal = hits1[0] + hits2[0];
    const prevTotal = hits1[1] + hits2[1];
    const currHits = hits1[0];
    const prevHits = hits1[1];
    const prevRate = prevHits * 100 / prevTotal | 0;
    const currRatio = currTotal * 100 / window - offset;
    if (currRatio <= 0) return prevRate * 100;
    const currRate = currHits * 100 / currTotal | 0;
    const prevRatio = 100 - currRatio;
    return currRate * currRatio + prevRate * prevRatio | 0;
  }

  get length() {
    return this.LRU.length;
  }

  isFull() {
    return this.length === this.max;
  }

  rateLRU(offset = false) {
    return Stats.rate(this.window, this.LRU, this.LFU, +offset & 0);
  }

  rateLFU(offset = false) {
    return Stats.rate(this.window, this.LFU, this.LRU, +offset & 0);
  }

  subtotal() {
    const {
      LRU,
      LFU,
      window
    } = this;
    const subtotal = LRU[0] + LFU[0];
    subtotal >= window && this.slide();
    return LRU[0] + LFU[0];
  }

  slide() {
    const {
      LRU,
      LFU,
      max
    } = this;

    if (LRU.length === max) {
      LRU.pop();
      LFU.pop();
    }

    LRU.unshift(0);
    LFU.unshift(0);
  }

  clear() {
    this.LRU = [0];
    this.LFU = [0];
  }

}

class StatsExperimental extends Stats {
  constructor(window, resolution, offset) {
    super(window);
    this.resolution = resolution;
    this.offset = offset;
    this.max = (0, alias_1.ceil)(this.resolution * (100 + this.offset) / 100) + 1;
  }

  static rate(window, hits1, hits2, offset) {
    let total = 0;
    let hits = 0;
    let ratio = 100;

    for (let len = hits1.length, i = 0; i < len; ++i) {
      const subtotal = hits1[i] + hits2[i];
      if (subtotal === 0) continue;
      offset = i + 1 === len ? 0 : offset;
      const subratio = (0, alias_1.min)(subtotal * 100 / window, ratio) - offset;
      offset = offset && subratio < 0 ? -subratio : 0;
      if (subratio <= 0) continue;
      const rate = window * subratio / subtotal;
      total += subtotal * rate;
      hits += hits1[i] * rate;
      ratio -= subratio;
      if (ratio <= 0) break;
    }

    return hits * 10000 / total | 0;
  }

  rateLRU(offset = false) {
    return StatsExperimental.rate(this.window, this.LRU, this.LFU, +offset && this.offset);
  }

  rateLFU(offset = false) {
    return StatsExperimental.rate(this.window, this.LFU, this.LRU, +offset && this.offset);
  }

  subtotal() {
    const {
      LRU,
      LFU,
      window,
      resolution,
      offset
    } = this;

    if (offset && LRU[0] + LFU[0] >= window * offset / 100) {
      if (this.length === 1) {
        this.slide();
      } else {
        LRU[1] += LRU[0];
        LFU[1] += LFU[0];
        LRU[0] = 0;
        LFU[0] = 0;
      }
    }

    const subtotal = LRU[offset && 1] + LFU[offset && 1] || 0;
    subtotal >= window / resolution && this.slide();
    return LRU[0] + LFU[0];
  }

}

/***/ }),

/***/ 412:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Cancellation = void 0;

const promise_1 = __webpack_require__(4879);

const maybe_1 = __webpack_require__(6512);

const either_1 = __webpack_require__(8555);

const function_1 = __webpack_require__(6288);

const exception_1 = __webpack_require__(7822);

class Cancellation {
  constructor(cancellees) {
    this[_a] = 'Cancellation';
    this.reason = [];
    this.listeners = [];
    this[_b] = new promise_1.Internal();
    if (cancellees) for (const cancellee of cancellees) {
      cancellee.register(this.cancel);
    }
  }

  isAlive() {
    return this.reason.length === 0;
  }

  isCancelled() {
    return this.reason.length === 1;
  }

  isClosed() {
    return this.reason.length === 2;
  }

  isFinished() {
    return this.reason.length !== 0;
  }

  register$(listener) {
    const {
      listeners,
      reason
    } = this;

    if (reason.length !== 0 && listeners.length === 0) {
      reason.length === 1 && handler(reason[0]);
      return function_1.noop;
    }

    listeners.push(handler);
    return () => listener = function_1.noop;

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
    if (this.reason.length !== 0) return;
    this.reason = [reason];

    for (let {
      listeners
    } = this, i = 0; i < listeners.length; ++i) {
      listeners[i](reason);
    }

    this.listeners = [];
    this[promise_1.internal].resolve(reason);
  }

  get cancel() {
    return reason => this.cancel$(reason);
  }

  close$(reason) {
    if (this.reason.length !== 0) return;
    this.reason = [void 0, reason];
    this.listeners = [];
    this[promise_1.internal].resolve(promise_1.AtomicPromise.reject(reason));
  }

  get close() {
    return reason => this.close$(reason);
  }

  then(onfulfilled, onrejected) {
    return new promise_1.AtomicPromise((resolve, reject) => this[promise_1.internal].then(resolve, reject, onfulfilled, onrejected));
  }

  catch(onrejected) {
    return this.then(void 0, onrejected);
  }

  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }

  get promise() {
    return value => this.isCancelled() ? promise_1.AtomicPromise.reject(this.reason[0]) : promise_1.AtomicPromise.resolve(value);
  }

  get maybe() {
    return value => (0, maybe_1.Just)(value).bind(value => this.isCancelled() ? maybe_1.Nothing : (0, maybe_1.Just)(value));
  }

  get either() {
    return value => (0, either_1.Right)(value).bind(value => this.isCancelled() ? (0, either_1.Left)(this.reason[0]) : (0, either_1.Right)(value));
  }

}

exports.Cancellation = Cancellation;
_a = Symbol.toStringTag, _b = promise_1.internal;

/***/ }),

/***/ 9802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Channel = void 0;

const promise_1 = __webpack_require__(4879);

const future_1 = __webpack_require__(3387);

const queue_1 = __webpack_require__(4934);

const fail = () => promise_1.AtomicPromise.reject(new Error('Spica: Channel: Closed.'));

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

    return;
  }

}

exports.Channel = Channel;

/***/ }),

/***/ 7681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clock = exports.now = void 0;

const global_1 = __webpack_require__(4128);

const queue_1 = __webpack_require__(4934);

const exception_1 = __webpack_require__(7822);

const undefined = void 0;
let time;
let count = 0;

function now(nocache) {
  if (time === undefined) {
    exports.clock.now(() => time = undefined);
  } else if (!nocache && count++ !== 20) {
    return time;
  }

  count = 1;
  return time = global_1.Date.now();
}

exports.now = now;
exports.clock = new class Clock extends global_1.Promise {
  constructor() {
    super(resolve => resolve(undefined)); // Promise subclass is slow.

    const clock = global_1.Promise.resolve();
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

/***/ 5529:
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

/***/ 7596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Copropagator = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const coroutine_1 = __webpack_require__(7983);

const promise_1 = __webpack_require__(4879); // Must support living iterables.


class Copropagator extends coroutine_1.Coroutine {
  constructor(coroutines, reducer = results => results[0], opts) {
    super(async function* () {
      this.then(result => {
        for (const co of coroutines) {
          co[coroutine_1.Coroutine.exit](result);
        }
      }, reason => {
        const rejection = promise_1.AtomicPromise.reject(reason);

        for (const co of coroutines) {
          co[coroutine_1.Coroutine.exit](rejection);
        }
      });
      all(coroutines).then(results => results.length === 0 ? void this[coroutine_1.Coroutine.terminate](new global_1.Error(`Spica: Copropagator: No result.`)) : void this[coroutine_1.Coroutine.exit](reducer(results)), reason => void this[coroutine_1.Coroutine.terminate](reason));
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
    if (!memory && same) return values;
    memory ??= new global_1.Map();

    for (let i = 0; i < values.length; ++i) {
      memory.set(before[i], values[i]);
    }

    return same ? [...memory.values()] : all(after, memory);
  });
}

/***/ }),

/***/ 7983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b, _c, _d;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isCoroutine = exports.Coroutine = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const clock_1 = __webpack_require__(7681);

const promise_1 = __webpack_require__(4879);

const future_1 = __webpack_require__(3387);

const channel_1 = __webpack_require__(9802);

const timer_1 = __webpack_require__(8520);

const function_1 = __webpack_require__(6288);

const queue_1 = __webpack_require__(4934);

const exception_1 = __webpack_require__(7822);

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
          } = ++count === 1 // Don't block.
          ? [[void 0, function_1.noop]] // Block.
          : await global_1.Promise.all([// Don't block.
          core.settings.capacity < 0 ? [void 0, function_1.noop] : core.sendBuffer.take(), // Don't block.
          global_1.Promise.all([core.settings.resume(), core.settings.interval > 0 ? (0, timer_1.wait)(core.settings.interval) : void 0])]);
          reply = rpy;
          if (!core.alive) break; // Block.
          // `result.value` can be a Promise value when using iterators.
          // `result.value` will never be a Promise value when using async iterators.

          const result = await iter.next(msg);
          if (!core.alive) break;

          if (!result.done) {
            // Block.
            reply({ ...result
            });
            await core.recvBuffer.put({ ...result
            });
            continue;
          } else {
            // Don't block.
            core.alive = false;
            reply({ ...result
            });
            core.recvBuffer.put({ ...result
            });
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
    this[promise_1.internal].resolve(core.result.then(({
      value
    }) => value));

    if (core.settings.trigger !== void 0) {
      for (const prop of (0, alias_1.isArray)(core.settings.trigger) ? core.settings.trigger : [core.settings.trigger]) {
        if (prop in this && this.hasOwnProperty(prop)) continue;

        if (prop in this) {
          global_1.Object.defineProperty(this, prop, {
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
          const desc = global_1.Object.getOwnPropertyDescriptor(this, prop) || {
            value: this[prop],
            enumerable: true,
            configurable: true,
            writable: true
          };
          global_1.Object.defineProperty(this, prop, {
            set(value) {
              global_1.Object.defineProperty(this, prop, { ...desc,
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
      this[internal].settings.delay ? clock_1.clock.now(this[init]) : this[init]();
    }
  }

  then(onfulfilled, onrejected) {
    return new promise_1.AtomicPromise((resolve, reject) => this[promise_1.internal].then(resolve, reject, onfulfilled, onrejected));
  }

  catch(onrejected) {
    return this.then(void 0, onrejected);
  }

  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }

  get [(_a = Symbol.toStringTag, _b = promise_1.internal, alive)]() {
    return this[internal].alive;
  }

  [exit](result) {
    if (!this[internal].alive) return;
    promise_1.AtomicPromise.resolve(result).then(result => {
      const core = this[internal];
      if (!core.alive) return;
      core.alive = false; // Don't block.

      core.recvBuffer.put({
        value: void 0,
        done: true
      });
      core.result.bind({
        value: result
      });
    }, reason => {
      const core = this[internal];
      if (!core.alive) return;
      core.alive = false; // Don't block.

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

class Internal {
  constructor(opts) {
    this.opts = opts;
    this.settings = (0, alias_1.ObjectAssign)({
      run: true,
      delay: true,
      capacity: -1,
      interval: 0,
      resume: function_1.noop,
      trigger: void 0
    }, this.opts);
    this.alive = true;
    this.reception = 0;
    this.sendBuffer = this.settings.capacity >= 0 ? new channel_1.Channel(this.settings.capacity) : void 0;
    this.recvBuffer = this.settings.capacity >= 0 // Block the iteration until an yielded value is consumed.
    ? new channel_1.Channel(0) // Broadcast an yielded value.
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
            reply(promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`)));
          } catch (reason) {
            (0, exception_1.causeAsyncException)(reason);
          }
        }
      });
      this.recvBuffer.close();
    });
  }

} // All responses of accepted requests must be delayed not to interrupt the current process.


class Port {
  constructor(co) {
    this[internal] = {
      co
    };
  }

  ask(msg) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
    if (core.settings.capacity < 0) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
    const future = new future_1.AtomicFuture();
    core.sendBuffer.put([msg, future.bind]);
    ++core.reception;
    return global_1.Promise.all([future, core.recvBuffer.take()]).then(([result]) => result.done ? core.result.then(({
      value
    }) => ({ ...result,
      value
    })) : { ...result
    });
  }

  recv() {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
    ++core.reception;
    return global_1.Promise.resolve(core.recvBuffer.take()).then(result => result.done ? core.result.then(({
      value
    }) => ({ ...result,
      value
    })) : { ...result
    });
  }

  send(msg) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
    if (core.settings.capacity < 0) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Overflowed.`));
    core.settings.capacity >= 0 && core.reception === 0 && ++core.reception && core.recvBuffer.take();
    const future = new future_1.AtomicFuture();
    return global_1.Promise.resolve(core.sendBuffer.put([msg, future.bind]));
  }

  connect(com) {
    const core = this[internal].co[internal];
    if (!core.alive) return promise_1.AtomicPromise.reject(new global_1.Error(`Spica: Coroutine: Canceled.`));
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
  BroadcastChannel.fail = () => promise_1.AtomicPromise.reject(new global_1.Error('Spica: Channel: Closed.'));

  class Internal {
    constructor() {
      this.alive = true;
      this.consumers = new queue_1.Queue();
    }

  }

  BroadcastChannel.Internal = Internal;
})(BroadcastChannel || (BroadcastChannel = {}));

/***/ }),

/***/ 4877:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.uncurry = exports.curry = void 0;

const array_1 = __webpack_require__(8112);

exports.curry = f => curry_(f, f.length);

function curry_(f, arity, ...xs) {
  let g;
  return xs.length < arity ? (...ys) => curry_(g ??= xs.length && f.bind(void 0, ...xs) || f, arity - xs.length, ...ys) : f(...xs);
}

const uncurry = f => uncurry_(f);

exports.uncurry = uncurry;

function uncurry_(f) {
  const arity = f.length;
  return (...xs) => arity === 0 || xs.length <= arity ? f(...xs) : uncurry_(f(...(0, array_1.shift)(xs, arity)[0]))(...xs);
}

/***/ }),

/***/ 8555:
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

__exportStar(__webpack_require__(14), exports);

/***/ }),

/***/ 7822:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.suppressAsyncException = exports.causeAsyncException = void 0;

const global_1 = __webpack_require__(4128);

const stack_1 = __webpack_require__(5352);

const stack = new stack_1.Stack();

function causeAsyncException(reason) {
  if (stack.isEmpty()) {
    global_1.Promise.reject(reason);
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

/***/ 6288:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noop = exports.fix = exports.id = exports.clear = exports.singleton = void 0;

function singleton(f) {
  let result;
  return function (...as) {
    if (result) return result[0];
    result = [f.call(this, ...as)];
    return result[0];
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

exports.fix = fix; // @ts-ignore

function noop() {}

exports.noop = noop;

/***/ }),

/***/ 3387:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AtomicFuture = exports.Future = void 0;

const global_1 = __webpack_require__(4128);

const promise_1 = __webpack_require__(4879);

class Future extends global_1.Promise {
  static get [Symbol.species]() {
    return global_1.Promise;
  }

  constructor(strict = true) {
    let resolve;
    super(r => resolve = r);
    let done = false;

    this.bind = value => {
      if (done) {
        if (!strict) return this;
        throw new Error(`Spica: Future: Cannot rebind the value.`);
      }

      done = true;
      resolve(value);
      return this;
    };
  }

  bind(value) {
    throw value;
  }

}

exports.Future = Future;

class AtomicFuture {
  constructor(strict = true) {
    this[_a] = 'Promise';
    this[_b] = new promise_1.Internal();
    let done = false;

    this.bind = value => {
      if (done) {
        if (!strict) return this;
        throw new Error(`Spica: AtomicFuture: Cannot rebind the value.`);
      }

      done = true;
      this[promise_1.internal].resolve(value);
      return this;
    };
  }

  bind(value) {
    throw value;
  }

  then(onfulfilled, onrejected) {
    return new promise_1.AtomicPromise((resolve, reject) => this[promise_1.internal].then(resolve, reject, onfulfilled, onrejected));
  }

  catch(onrejected) {
    return this.then(void 0, onrejected);
  }

  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }

}

exports.AtomicFuture = AtomicFuture;
_a = Symbol.toStringTag, _b = promise_1.internal;

/***/ }),

/***/ 4128:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(6921);

const global = void 0 || typeof globalThis !== 'undefined' && globalThis // @ts-ignore
|| typeof self !== 'undefined' && self || Function('return this')();
global.global = global;
module.exports = global;

/***/ }),

/***/ 6921:
/***/ (() => {

"use strict";
 // @ts-ignore

var globalThis; // @ts-ignore

var global = (/* unused pure expression or super */ null && (globalThis));

/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MultiHeap = exports.Heap = void 0;

const global_1 = __webpack_require__(4128);

const invlist_1 = __webpack_require__(7452);

const memoize_1 = __webpack_require__(1808);

const undefined = void 0;
let size = 16;

class Heap {
  constructor(cmp = Heap.max, stable = false) {
    this.cmp = cmp;
    this.stable = stable;
    this.array = (0, global_1.Array)(size);
    this.$length = 0;
  }

  get length() {
    return this.$length;
  }

  isEmpty() {
    return this.array[0] !== undefined;
  }

  peek() {
    return this.array[0]?.[1];
  }

  insert(value, order) {
    if (arguments.length < 2) {
      order = value;
    }

    const array = this.array;
    const node = array[this.$length] = [order, value, this.$length++];
    upHeapify(this.cmp, array, this.$length);
    return node;
  }

  replace(value, order) {
    if (arguments.length < 2) {
      order = value;
    }

    if (this.$length === 0) return void this.insert(value, order);
    const array = this.array;
    const replaced = array[0][1];
    array[0] = [order, value, 0];
    downHeapify(this.cmp, array, 1, this.$length, this.stable);
    return replaced;
  }

  extract() {
    if (this.$length === 0) return;
    const node = this.array[0];
    this.delete(node);
    return node[1];
  }

  delete(node) {
    const array = this.array;
    const index = node[2];
    if (array[index] !== node) throw new Error('Invalid node');
    swap(array, index, --this.$length);
    array[this.$length] = undefined;
    index < this.$length && sort(this.cmp, array, index, this.$length, this.stable);
    return node[1];
  }

  update(node, order, value) {
    if (arguments.length < 2) {
      order = node[0];
    }

    const array = this.array;
    if (array[node[2]] !== node) throw new Error('Invalid node');

    if (arguments.length > 2) {
      node[1] = value;
    }

    if (this.cmp(node[0], node[0] = order) === 0) return;
    sort(this.cmp, array, node[2], this.$length, this.stable);
  }

  find(order) {
    return this.array.find(node => node && node[0] === order);
  }

  clear() {
    this.array = (0, global_1.Array)(size);
    this.$length = 0;
  }

}

exports.Heap = Heap;

Heap.max = (a, b) => a > b ? -1 : a < b ? 1 : 0;

Heap.min = (a, b) => a > b ? 1 : a < b ? -1 : 0;

class MultiHeap {
  constructor(cmp = MultiHeap.max, clean = true) {
    this.cmp = cmp;
    this.clean = clean;
    this.heap = new Heap(this.cmp);
    this.dict = new global_1.Map();
    this.list = (0, memoize_1.memoize)(order => {
      const list = new invlist_1.List();
      list[MultiHeap.order] = order;
      list[MultiHeap.heap] = this.heap.insert(list, order);
      return list;
    }, this.dict);
    this.$length = 0;
  }

  get length() {
    return this.$length;
  }

  isEmpty() {
    return this.heap.isEmpty();
  }

  peek() {
    return this.heap.peek()?.head.value;
  }

  insert(value, order) {
    if (arguments.length < 2) {
      order = value;
    }

    ++this.$length;
    return this.list(order).push(value);
  }

  extract() {
    if (this.$length === 0) return;
    --this.$length;
    const list = this.heap.peek();
    const value = list.shift();

    if (list.length === 0) {
      this.heap.extract();
      this.clean && this.dict.delete(list[MultiHeap.order]);
    }

    return value;
  }

  delete(node) {
    const list = node.list;
    if (!list) throw new Error('Invalid node');
    --this.$length;

    if (list.length === 1) {
      this.heap.delete(list[MultiHeap.heap]);
      this.clean && this.dict.delete(list[MultiHeap.order]);
    }

    return node.delete();
  }

  update(node, order, value) {
    const list = node.list;
    if (!list) throw new Error('Invalid node');

    if (arguments.length < 2) {
      order = list[MultiHeap.order];
    }

    if (arguments.length > 2) {
      node.value = value;
    }

    if (this.cmp(list[MultiHeap.order], order) === 0) return node;
    this.delete(node);
    return this.insert(node.value, order);
  }

  find(order) {
    return this.dict.get(order);
  }

  clear() {
    this.heap.clear();
    this.dict.clear();
    this.$length = 0;
  }

}

exports.MultiHeap = MultiHeap;
MultiHeap.order = Symbol('order');
MultiHeap.heap = Symbol('heap');
MultiHeap.max = Heap.max;
MultiHeap.min = Heap.min;

function sort(cmp, array, index, length, stable) {
  return upHeapify(cmp, array, index + 1) || downHeapify(cmp, array, index + 1, length, stable);
}

function upHeapify(cmp, array, index) {
  const order = array[index - 1][0];
  let changed = false;

  while (index > 1) {
    const parent = index / 2 | 0;
    if (cmp(array[parent - 1][0], order) <= 0) break;
    swap(array, index - 1, parent - 1);
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

    if (left <= length && (stable ? cmp(array[left - 1][0], array[min - 1][0]) <= 0 : cmp(array[left - 1][0], array[min - 1][0]) < 0)) {
      min = left;
    }

    if (right <= length && (stable ? cmp(array[right - 1][0], array[min - 1][0]) <= 0 : cmp(array[right - 1][0], array[min - 1][0]) < 0)) {
      min = right;
    }

    if (min === index) break;
    swap(array, index - 1, min - 1);
    index = min;
    changed ||= true;
  }

  return changed;
}

function swap(array, index1, index2) {
  if (index1 === index2) return;
  const node1 = array[index1];
  const node2 = array[index2];
  node1[2] = index2;
  node2[2] = index1;
  array[index1] = node2;
  array[index2] = node1;
}

/***/ }),

/***/ 2269:
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

/***/ 7536:
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

__exportStar(__webpack_require__(2598), exports);

/***/ }),

/***/ 7452:
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

__exportStar(__webpack_require__(2310), exports);

/***/ }),

/***/ 2598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HList = void 0;

const array_1 = __webpack_require__(8112);

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

/***/ 2310:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
 // Circular Inverse List

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.List = void 0;
const undefined = void 0;

class List {
  constructor() {
    this.$length = 0;
    this.head = undefined;
  }

  get length() {
    return this.$length;
  }

  get tail() {
    return this.head?.next;
  }

  get last() {
    return this.head?.prev;
  }

  clear() {
    this.head = undefined;
    this.$length = 0;
  }

  unshift(value) {
    return this.head = this.push(value);
  }

  push(value) {
    return new Node(this, value, this.head, this.head?.prev);
  }

  unshiftNode(node) {
    return this.head = this.pushNode(node);
  }

  pushNode(node) {
    return this.insert(node, this.head);
  }

  unshiftRotationally(value) {
    const node = this.last;
    if (!node) return this.unshift(value);
    node.value = value;
    this.head = node;
    return node;
  }

  pushRotationally(value) {
    const node = this.head;
    if (!node) return this.push(value);
    node.value = value;
    this.head = node.next;
    return node;
  }

  shift() {
    return this.head?.delete();
  }

  pop() {
    return this.last?.delete();
  }

  insert(node, before = this.head) {
    if (node.list === this) return node.moveTo(before), node;
    node.delete();
    ++this.$length;
    this.head ??= node;
    node.list = this;
    const next = node.next = before ?? node;
    const prev = node.prev = next.prev ?? node;
    next.prev = prev.next = node;
    return node;
  }

  find(f) {
    for (let head = this.head, node = head; node;) {
      if (f(node.value)) return node;
      node = node.next;
      if (node === head) break;
    }
  }

  toNodes() {
    const acc = [];

    for (let head = this.head, node = head; node;) {
      acc.push(node);
      node = node.next;
      if (node === head) break;
    }

    return acc;
  }

  toArray() {
    const acc = [];

    for (let head = this.head, node = head; node;) {
      acc.push(node.value);
      node = node.next;
      if (node === head) break;
    }

    return acc;
  }

  *[Symbol.iterator]() {
    for (let head = this.head, node = head; node;) {
      yield node.value;
      node = node.next;
      if (node === head) return;
    }
  }

}

exports.List = List;

class Node {
  constructor(list, value, next, prev) {
    this.list = list;
    this.value = value;
    this.next = next;
    this.prev = prev;
    ++list['$length'];
    list.head ??= this;
    next && prev ? next.prev = prev.next = this : this.next = this.prev = this;
  }

  get alive() {
    return this.list !== undefined;
  }

  delete() {
    const list = this.list;
    if (!list) return this.value;
    --list['$length'];
    const {
      next,
      prev
    } = this;

    if (list.head === this) {
      list.head = next === this ? undefined : next;
    }

    if (next) {
      next.prev = prev;
    }

    if (prev) {
      prev.next = next;
    }

    this.list = undefined;
    this.next = this.prev = undefined;
    return this.value;
  }

  insertBefore(value) {
    return new Node(this.list, value, this, this.prev);
  }

  insertAfter(value) {
    return new Node(this.list, value, this.next, this);
  }

  moveTo(before) {
    if (!before) return false;
    if (this === before) return false;
    if (before.list !== this.list) return before.list.insert(this, before), true;
    const a1 = this;
    const b1 = before;
    if (a1.next === b1) return false;
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
    this.moveTo(this.list.head);
    this.list.head = this;
  }

  moveToLast() {
    this.moveTo(this.list.head);
  }

  swap(node) {
    const node1 = this;
    const node2 = node;
    if (node1 === node2) return false;
    const node3 = node2.next;
    if (node1.list !== node2.list) throw new Error(`Spica: InvList: Cannot swap nodes across lists.`);
    node2.moveTo(node1);
    node1.moveTo(node3);

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

/***/ }),

/***/ 6512:
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

__exportStar(__webpack_require__(1869), exports);

/***/ }),

/***/ 1808:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.reduce = exports.memoize = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const compare_1 = __webpack_require__(5529);

const undefined = void 0;

function memoize(f, identify = (...as) => as[0], memory) {
  if (typeof identify === 'object') return memoize(f, undefined, identify);
  return (0, alias_1.isArray)(memory) ? memoizeArray(f, identify, memory) : memoizeObject(f, identify, memory ?? new global_1.Map());
}

exports.memoize = memoize;

function memoizeArray(f, identify, memory) {
  let nullish = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined || nullish && memory[b] !== undefined) return z;
    z = f(...as);
    nullish ||= z === undefined;
    memory[b] = z;
    return z;
  };
}

function memoizeObject(f, identify, memory) {
  let nullish = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory.get(b);
    if (z !== undefined || nullish && memory.has(b)) return z;
    z = f(...as);
    nullish ||= z === undefined;
    memory.set(b, z);
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

/***/ 9983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Applicative = void 0;

const functor_1 = __webpack_require__(8946);

const curry_1 = __webpack_require__(4877);

class Applicative extends functor_1.Functor {}

exports.Applicative = Applicative;

(function (Applicative) {
  function ap(af, aa) {
    return aa ? af.bind(f => aa.fmap((0, curry_1.curry)(f))) : aa => ap(af, aa);
  }

  Applicative.ap = ap;
})(Applicative = exports.Applicative || (exports.Applicative = {}));

/***/ }),

/***/ 8554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Right = exports.Left = exports.Either = void 0;

const monad_1 = __webpack_require__(7991);

const promise_1 = __webpack_require__(4879);

const function_1 = __webpack_require__(6288);

class Either extends monad_1.Monad {
  constructor(thunk) {
    super(thunk);
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

      throw new TypeError(`Spica: Either: Invalid monad value: ${m}`);
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
      if (done) return m;
      const r = m.extract(function_1.noop, a => [a]);
      if (!r) return m;
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
    return fm instanceof Either ? fm.extract(b => promise_1.AtomicPromise.resolve(new Left(b)), a => promise_1.AtomicPromise.resolve(a).then(Either.Return)) : fm.reduce((acc, m) => acc.bind(as => m.fmap(a => [...as, a])), Either.Return([]));
  }

  Either.sequence = sequence;
})(Either = exports.Either || (exports.Either = {}));

class Left extends Either {
  constructor(value) {
    super(throwCallError);
    this.value = value;
  }

  bind(_) {
    return this;
  }

  extract(left) {
    if (!left) throw this.value;
    return left(this.value);
  }

}

exports.Left = Left;

class Right extends Either {
  constructor(value) {
    super(throwCallError);
    this.value = value;
  }

  bind(f) {
    return new Either(() => f(this.extract()));
  }

  extract(_, right) {
    return !right ? this.value : right(this.value);
  }

}

exports.Right = Right;

function throwCallError() {
  throw new Error(`Spica: Either: Invalid thunk call.`);
}

/***/ }),

/***/ 14:
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
exports.Right = exports.Left = exports.Either = void 0;

const Monad = __importStar(__webpack_require__(8554));

const function_1 = __webpack_require__(6288);

class Either extends Monad.Either {
  constructor() {
    super(function_1.noop);
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

/***/ }),

/***/ 8946:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Functor = void 0;

const lazy_1 = __webpack_require__(7395);

class Functor extends lazy_1.Lazy {}

exports.Functor = Functor;

(function (Functor) {
  function fmap(m, f) {
    return f ? m.fmap(f) : f => m.fmap(f);
  }

  Functor.fmap = fmap;
})(Functor = exports.Functor || (exports.Functor = {}));

/***/ }),

/***/ 7395:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Lazy = void 0;

class Lazy {
  constructor(thunk) {
    this.thunk = thunk;
    this.$memory = void 0;
  }

  evaluate() {
    return this.$memory ??= this.thunk();
  }

}

exports.Lazy = Lazy;

/***/ }),

/***/ 1605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Nothing = exports.Just = exports.Maybe = void 0;

const monadplus_1 = __webpack_require__(4716);

const promise_1 = __webpack_require__(4879);

const function_1 = __webpack_require__(6288);

class Maybe extends monadplus_1.MonadPlus {
  constructor(thunk) {
    super(thunk);
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

      throw new TypeError(`Spica: Maybe: Invalid monad value: ${m}`);
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
      if (done) return m;
      const r = m.extract(function_1.noop, a => [a]);
      if (!r) return m;
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
    return fm instanceof Maybe ? fm.extract(() => promise_1.AtomicPromise.resolve(Maybe.mzero), a => promise_1.AtomicPromise.resolve(a).then(Maybe.Return)) : fm.reduce((acc, m) => acc.bind(as => m.fmap(a => [...as, a])), Maybe.Return([]));
  }

  Maybe.sequence = sequence;
})(Maybe = exports.Maybe || (exports.Maybe = {}));

class Just extends Maybe {
  constructor(value) {
    super(throwCallError);
    this.value = value;
  }

  bind(f) {
    return new Maybe(() => f(this.extract()));
  }

  extract(_, just) {
    return !just ? this.value : just(this.value);
  }

}

exports.Just = Just;

class Nothing extends Maybe {
  constructor() {
    super(throwCallError);
  }

  bind(_) {
    return this;
  }

  extract(nothing) {
    if (!nothing) throw new Error(`Spica: Maybe: Nothig value is extracted.`);
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
})(Maybe = exports.Maybe || (exports.Maybe = {}));

function throwCallError() {
  throw new Error(`Spica: Maybe: Invalid thunk call.`);
}

/***/ }),

/***/ 1869:
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
exports.Nothing = exports.Just = exports.Maybe = void 0;

const Monad = __importStar(__webpack_require__(1605));

const function_1 = __webpack_require__(6288);

class Maybe extends Monad.Maybe {
  constructor() {
    super(function_1.noop);
  }

}

exports.Maybe = Maybe;

function Just(a) {
  return new Monad.Just(a);
}

exports.Just = Just;
exports.Nothing = Monad.Maybe.mzero;

/***/ }),

/***/ 7991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Monad = void 0;

const applicative_1 = __webpack_require__(9983);

class Monad extends applicative_1.Applicative {}

exports.Monad = Monad;

(function (Monad) {
  function bind(m, f) {
    return f ? m.bind(f) : f => bind(m, f);
  }

  Monad.bind = bind; //export declare function sequence<a>(fm: Monad<PromiseLike<a>>): AtomicPromise<Monad<a>>;
})(Monad = exports.Monad || (exports.Monad = {}));

/***/ }),

/***/ 4716:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MonadPlus = void 0;

const monad_1 = __webpack_require__(7991);

class MonadPlus extends monad_1.Monad {}

exports.MonadPlus = MonadPlus;

(function (MonadPlus) {})(MonadPlus = exports.MonadPlus || (exports.MonadPlus = {}));

/***/ }),

/***/ 6144:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Sequence = void 0;

__webpack_require__(207);

__webpack_require__(9035);

__webpack_require__(323);

__webpack_require__(6369);

__webpack_require__(5976);

__webpack_require__(2870);

__webpack_require__(3571);

__webpack_require__(3780);

__webpack_require__(2414);

__webpack_require__(2183);

__webpack_require__(1755);

__webpack_require__(1451);

__webpack_require__(1191);

__webpack_require__(4704);

__webpack_require__(4655);

__webpack_require__(1985);

__webpack_require__(6067);

__webpack_require__(7809);

__webpack_require__(2881);

__webpack_require__(7585);

__webpack_require__(4420);

__webpack_require__(3114);

__webpack_require__(8501);

__webpack_require__(9648);

__webpack_require__(9663);

__webpack_require__(144);

__webpack_require__(679);

__webpack_require__(2307);

__webpack_require__(3337);

__webpack_require__(9117);

__webpack_require__(4595);

__webpack_require__(4763);

__webpack_require__(5645);

__webpack_require__(1130);

__webpack_require__(7303);

__webpack_require__(1084);

__webpack_require__(7899);

__webpack_require__(2262);

__webpack_require__(7057);

__webpack_require__(3912);

__webpack_require__(2061);

__webpack_require__(8181);

__webpack_require__(3530);

__webpack_require__(4514);

__webpack_require__(5666);

var core_1 = __webpack_require__(402);

Object.defineProperty(exports, "Sequence", ({
  enumerable: true,
  get: function () {
    return core_1.Sequence;
  }
}));

/***/ }),

/***/ 402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Sequence = void 0;

const monadplus_1 = __webpack_require__(4716);

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

(function (Sequence) {})(Sequence = exports.Sequence || (exports.Sequence = {}));

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
    Iterator.done = () => [void 0, Iterator.done, -1];

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
  })(Exception = Sequence.Exception || (Sequence.Exception = {}));
})(Sequence = exports.Sequence || (exports.Sequence = {}));

function throwCallError() {
  throw new Error(`Spica: Sequence: Invalid thunk call.`);
}

/***/ }),

/***/ 4595:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  ap(a) {
    return core_1.Sequence.ap(this, a);
  }

});

/***/ }),

/***/ 4763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  bind(f) {
    return core_1.Sequence.concat(this.fmap(f));
  }

});

/***/ }),

/***/ 8501:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  drop(n) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => core_1.Sequence.Thunk.index(thunk) < n ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  dropUntil(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 9663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  dropWhile(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk)) ? recur() : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 7809:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 7899:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  filter(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), (thunk, recur) => f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : recur()));
  }

});

/***/ }),

/***/ 7303:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 9117:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  fmap(f) {
    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 7057:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  foldr(f, z) {
    return new core_1.Sequence((iter = () => this.reduce().iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(z), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(thunk)).foldr(f, z))))).bind(s => s);
  }

});

/***/ }),

/***/ 3912:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  group(f) {
    return new core_1.Sequence(([iter, acc] = [() => this.iterate(), []], cons) => core_1.Sequence.Iterator.when(iter(), () => acc.length === 0 ? cons() : cons(acc), (thunk, recur) => acc.length === 0 || f(acc[0], core_1.Sequence.Thunk.value(thunk)) ? (acc.push(core_1.Sequence.Thunk.value(thunk)), recur()) : cons(acc, [core_1.Sequence.Thunk.iterator(thunk), [core_1.Sequence.Thunk.value(thunk)]])));
  }

});

/***/ }),

/***/ 2061:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  inits() {
    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), this.scanl((b, a) => [...b, a], []).dropWhile(as => as.length === 0));
  }

});

/***/ }),

/***/ 2881:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  iterate() {
    return this.iterate_();
  }

  iterate_(z, i = 0) {
    const data = this.cons(z, core_1.Sequence.Data.cons);

    switch (data.length) {
      case 0:
        return [void 0, core_1.Sequence.Iterator.done, -1];

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

/***/ 5645:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  join() {
    return core_1.Sequence.concat(this);
  }

});

/***/ }),

/***/ 1084:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  map(f) {
    return new core_1.Sequence((iter = () => this.iterate()) => core_1.Sequence.Iterator.when(iter(), () => core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(f(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.index(thunk)), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 1130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 7585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const global_1 = __webpack_require__(4128);

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

const memoize_1 = __webpack_require__(1808);

const memory = (0, memoize_1.memoize)(_ => new global_1.Map());
(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  memoize() {
    return new core_1.Sequence(([i, memo] = [0, memory(this)], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [i + 1, memo])));
  }

});

/***/ }),

/***/ 5666:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 4420:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const global_1 = __webpack_require__(4128);

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  reduce() {
    return new core_1.Sequence(([i, memo] = [0, new global_1.Map()], cons) => core_1.Sequence.Iterator.when(memo.get(i) || memo.set(i, i > 0 && memo.has(i - 1) ? core_1.Sequence.Thunk.iterator(memo.get(i - 1))() : this.iterate()).get(i), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), [i + 1, memo])));
  }

});

/***/ }),

/***/ 2262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  scanl(f, z) {
    return new core_1.Sequence(([prev, iter, i] = [z, () => this.iterate(), 0]) => core_1.Sequence.Iterator.when(iter(), () => i === 0 ? core_1.Sequence.Data.cons(z) : core_1.Sequence.Data.cons(), thunk => core_1.Sequence.Data.cons(prev = f(prev, core_1.Sequence.Thunk.value(thunk)), [prev, core_1.Sequence.Thunk.iterator(thunk), core_1.Sequence.Thunk.index(thunk) + 1])));
  }

});

/***/ }),

/***/ 3530:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  segs() {
    return core_1.Sequence.mappend(this.foldr((a, bs) => bs.take(1).bind(b => core_1.Sequence.mappend(core_1.Sequence.from([core_1.Sequence.mappend(core_1.Sequence.from([[a]]), core_1.Sequence.from(b).map(c => [a, ...c]))]), bs)), core_1.Sequence.from([core_1.Sequence.from([])])).bind(a => a), core_1.Sequence.from([[]]));
  }

});

/***/ }),

/***/ 2307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  sort(cmp) {
    return core_1.Sequence.from(this.extract().sort(cmp));
  }

});

/***/ }),

/***/ 4514:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  subsequences() {
    return core_1.Sequence.mappend(core_1.Sequence.from([[]]), core_1.Sequence.from([0]).bind(() => nonEmptySubsequences(this)));
  }

});

function nonEmptySubsequences(xs) {
  return core_1.Sequence.Iterator.when(xs.iterate(), () => core_1.Sequence.mempty, xt => core_1.Sequence.mappend(core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt)]]), new core_1.Sequence((_, cons) => core_1.Sequence.Iterator.when(xt, () => cons(), xt => cons(nonEmptySubsequences(core_1.Sequence.resume(core_1.Sequence.Thunk.iterator(xt))).foldr((ys, r) => core_1.Sequence.mappend(core_1.Sequence.mappend(core_1.Sequence.from([ys]), core_1.Sequence.from([[core_1.Sequence.Thunk.value(xt), ...ys]])), r), core_1.Sequence.mempty)))).bind(xs => xs)));
}

/***/ }),

/***/ 8181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  tails() {
    return core_1.Sequence.mappend(core_1.Sequence.from(this.extract().map((_, i, as) => as.slice(i))), core_1.Sequence.from([[]]));
  }

});

/***/ }),

/***/ 3114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  take(n) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(n > 0 ? iter() : core_1.Sequence.Iterator.done(), () => cons(), thunk => core_1.Sequence.Thunk.index(thunk) + 1 < n ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons(core_1.Sequence.Thunk.value(thunk))));
  }

});

/***/ }),

/***/ 144:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  takeUntil(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk)) : cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 9648:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  takeWhile(f) {
    return new core_1.Sequence((iter = () => this.iterate(), cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => f(core_1.Sequence.Thunk.value(thunk)) ? cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk)) : cons()));
  }

});

/***/ }),

/***/ 3337:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  unique() {
    const memory = new Set();
    return this.filter(a => !memory.has(a) && !!memory.add(a));
  }

});

/***/ }),

/***/ 5976:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static concat(as) {
    return new core_1.Sequence(([ai, bi] = [() => as.iterate(), core_1.Sequence.Iterator.done], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), (at, ar) => (bi = bi === core_1.Sequence.Iterator.done ? () => core_1.Sequence.Thunk.value(at).iterate() : bi, core_1.Sequence.Iterator.when(bi(), () => (bi = core_1.Sequence.Iterator.done, ar()), bt => cons(core_1.Sequence.Thunk.value(bt), [() => at, core_1.Sequence.Thunk.iterator(bt)])))));
  }

});

/***/ }),

/***/ 323:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static cycle(as) {
    return new core_1.Sequence(function cycle([iter, i] = [as[Symbol.iterator](), 0], cons) {
      const result = iter.next();
      return result.done ? cycle([as[Symbol.iterator](), i + 1], cons) : cons(result.value, [iter, i + 1]);
    }).reduce();
  }

});

/***/ }),

/***/ 3571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 9035:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static from(as) {
    return new core_1.Sequence(([iter, i] = [as[Symbol.iterator](), 0], cons) => {
      const result = iter.next();
      return result.done ? cons() : cons(result.value, [iter, i + 1]);
    }).reduce();
  }

});

/***/ }),

/***/ 2414:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 4655:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static mappend(l, r) {
    return core_1.Sequence.mconcat([l, r]);
  }

});

/***/ }),

/***/ 4704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static mconcat(as) {
    return [...as].reduce((a, b) => mconcat(a, b), core_1.Sequence.mempty);
  }

});

function mconcat(a, b) {
  return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons(core_1.Sequence.Thunk.value(bt), [core_1.Sequence.Iterator.done, core_1.Sequence.Thunk.iterator(bt)])), at => cons(core_1.Sequence.Thunk.value(at), [core_1.Sequence.Thunk.iterator(at), bi])));
}

/***/ }),

/***/ 1191:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mempty = new core_1.Sequence((_, cons) => cons()), _a));

/***/ }),

/***/ 6067:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mplus = core_1.Sequence.mappend, _a));

/***/ }),

/***/ 1985:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, (_a = class extends core_1.Sequence {}, _a.mzero = core_1.Sequence.mempty, _a));

/***/ }),

/***/ 2183:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static pure(a) {
    return new core_1.Sequence((_, cons) => cons(a));
  }

});

/***/ }),

/***/ 6369:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const alias_1 = __webpack_require__(5406);

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static random(p = () => (0, alias_1.random)()) {
    return typeof p === 'function' ? core_1.Sequence.from(new core_1.Sequence((_, cons) => cons(p(), _))) : this.random().map(r => p[(0, alias_1.floor)(r * p.length)]);
  }

});

/***/ }),

/***/ 207:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static resume(iterator) {
    return new core_1.Sequence((iter = iterator, cons) => core_1.Sequence.Iterator.when(iter(), () => cons(), thunk => cons(core_1.Sequence.Thunk.value(thunk), core_1.Sequence.Thunk.iterator(thunk))));
  }

});

/***/ }),

/***/ 1755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static Return(a) {
    return new core_1.Sequence((_, cons) => cons(a));
  }

});

/***/ }),

/***/ 1451:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static sequence(ms) {
    return ms.reduce((acc, m) => acc.fmap(bs => core_1.Sequence.mappend(bs, m)), core_1.Sequence.Return(core_1.Sequence.from([])));
  }

});

/***/ }),

/***/ 3780:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

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

/***/ 2870:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const core_1 = __webpack_require__(402);

const compose_1 = __webpack_require__(2269);

(0, compose_1.compose)(core_1.Sequence, class extends core_1.Sequence {
  static zip(a, b) {
    return new core_1.Sequence(([ai, bi] = [() => a.iterate(), () => b.iterate()], cons) => core_1.Sequence.Iterator.when(ai(), () => cons(), at => core_1.Sequence.Iterator.when(bi(), () => cons(), bt => cons([core_1.Sequence.Thunk.value(at), core_1.Sequence.Thunk.value(bt)], [core_1.Sequence.Thunk.iterator(at), core_1.Sequence.Thunk.iterator(bt)]))));
  }

});

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Observation = void 0;

const global_1 = __webpack_require__(4128);

const invlist_1 = __webpack_require__(7452);

const array_1 = __webpack_require__(8112);

const exception_1 = __webpack_require__(7822);

class ListenerNode {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.mid = 0;
    this.sid = 0;
    this.monitors = new invlist_1.List();
    this.subscribers = new invlist_1.List();
    this.index = new global_1.Map();
    this.children = new invlist_1.List();
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
        throw new global_1.Error('Unreachable');
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
        child.delete();
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
    this.node = new ListenerNode(void 0);
    this.limit = opts?.limit ?? 10;
  }

  monitor(namespace, monitor, options = {}) {
    if (typeof monitor !== 'function') throw new global_1.Error(`Spica: Observation: Invalid listener: ${monitor}`);
    const node = this.seek(namespace, 0
    /* SeekMode.Extensible */
    );
    const monitors = node.monitors;
    if (monitors.length === this.limit) throw new global_1.Error(`Spica: Observation: Exceeded max listener limit.`);
    node.mid === global_1.Number.MAX_SAFE_INTEGER && node.reset(monitors);
    const inode = monitors.push({
      id: ++node.mid,
      type: 0
      /* ListenerType.Monitor */
      ,
      namespace,
      listener: monitor,
      options
    });
    return () => void inode.delete();
  }

  on(namespace, subscriber, options = {}) {
    if (typeof subscriber !== 'function') throw new global_1.Error(`Spica: Observation: Invalid listener: ${subscriber}`);
    const node = this.seek(namespace, 0
    /* SeekMode.Extensible */
    );
    const subscribers = node.subscribers;
    if (subscribers.length === this.limit) throw new global_1.Error(`Spica: Observation: Exceeded max listener limit.`);
    node.sid === global_1.Number.MAX_SAFE_INTEGER && node.reset(subscribers);
    const inode = subscribers.push({
      id: ++node.sid,
      type: 1
      /* ListenerType.Subscriber */
      ,
      namespace,
      listener: subscriber,
      options
    });
    return () => void inode.delete();
  }

  once(namespace, subscriber) {
    return this.on(namespace, subscriber, {
      once: true
    });
  }

  off(namespace, subscriber) {
    return subscriber ? void this.seek(namespace, 1
    /* SeekMode.Breakable */
    )?.subscribers?.find(item => item.listener === subscriber)?.delete() : void this.seek(namespace, 1
    /* SeekMode.Breakable */
    )?.clear();
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
    this.relaies ??= new global_1.WeakSet();
    if (this.relaies.has(source)) throw new global_1.Error(`Spica: Observation: Relay source is already registered.`);
    this.relaies.add(source);
    return source.monitor([], (data, namespace) => void this.emit(namespace, data));
  }

  refs(namespace) {
    const node = this.seek(namespace, 1
    /* SeekMode.Breakable */
    );
    if (!node) return [];
    return this.listenersBelow(node).reduce((acc, listeners) => (0, array_1.push)(acc, listeners.toArray()), []);
  }

  drain(namespace, data, tracker) {
    let node = this.seek(namespace, 1
    /* SeekMode.Breakable */
    );
    const results = [];

    for (let lists = node ? this.listenersBelow(node, 1
    /* ListenerType.Subscriber */
    ) : [], i = 0; i < lists.length; ++i) {
      const items = lists[i];
      if (items.length === 0) continue;
      const recents = [];
      const max = items.last.value.id;
      let min = 0;

      for (let node = items.head; node && min < node.value.id && node.value.id <= max;) {
        min = node.value.id;
        const item = node.value;
        item.options.once && node.delete();

        try {
          const result = item.listener(data, namespace);
          tracker && results.push(result);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }

        node.alive && recents.push(node); // TODO: Use Array.findLast.

        node = node.next ?? findLast(recents, item => item.next) ?? items.head;
      }
    }

    node ??= this.seek(namespace, 2
    /* SeekMode.Closest */
    );

    for (let lists = this.listenersAbove(node, 0
    /* ListenerType.Monitor */
    ), i = 0; i < lists.length; ++i) {
      const items = lists[i];
      if (items.length === 0) continue;
      const recents = [];
      const max = items.last.value.id;
      let min = 0;

      for (let node = items.head; node && min < node.value.id && node.value.id <= max;) {
        min = node.value.id;
        const item = node.value;
        item.options.once && node.delete();

        try {
          item.listener(data, namespace);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }

        node.alive && recents.push(node); // TODO: Use Array.findLast.

        node = node.next ?? findLast(recents, item => item.next) ?? items.head;
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

      if (!child) {
        switch (mode) {
          case 1
          /* SeekMode.Breakable */
          :
            return;

          case 2
          /* SeekMode.Closest */
          :
            return node;
        }

        child = new ListenerNode(name, node);
        index.set(name, child);
        children.push(child);
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
      case 1
      /* ListenerType.Subscriber */
      :
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
        child.delete();
        child = next;
      } else {
        child = child.next;
      }
    }

    return [acc, monitors.length + subscribers.length + count];
  }

}

exports.Observation = Observation;

function findLast(array, f) {
  for (let i = array.length; i--;) {
    if (f(array[i])) return array[i];
  }
}

/***/ }),

/***/ 4879:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a, _b;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.never = exports.isPromiseLike = exports.Internal = exports.AtomicPromise = exports.internal = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const function_1 = __webpack_require__(6288);

exports.internal = Symbol.for('spica/promise::internal');

class AtomicPromise {
  constructor(executor) {
    this[_a] = 'Promise';
    this[_b] = new Internal();

    try {
      executor(value => void this[exports.internal].resolve(value), reason => void this[exports.internal].reject(reason));
    } catch (reason) {
      this[exports.internal].reject(reason);
    }
  }

  static all(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = (0, global_1.Array)(values.length);
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
            case 2
            /* State.fulfilled */
            :
              results[i] = status.value;
              ++count;
              continue;

            case 3
            /* State.rejected */
            :
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
            case 2
            /* State.fulfilled */
            :
              return resolve(status.value);

            case 3
            /* State.rejected */
            :
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
          const {
            status
          } = value[exports.internal];

          switch (status.state) {
            case 2
            /* State.fulfilled */
            :
              results[i] = {
                status: 'fulfilled',
                value: status.value
              };
              ++count;
              continue;

            case 3
            /* State.rejected */
            :
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
      const reasons = (0, global_1.Array)(values.length);
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
            case 2
            /* State.fulfilled */
            :
              return resolve(status.value);

            case 3
            /* State.rejected */
            :
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
    return new AtomicPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new AtomicPromise((_, reject) => reject(reason));
  }

  then(onfulfilled, onrejected) {
    return new AtomicPromise((resolve, reject) => this[exports.internal].then(resolve, reject, onfulfilled, onrejected));
  }

  catch(onrejected) {
    return this.then(void 0, onrejected);
  }

  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }

}

exports.AtomicPromise = AtomicPromise;
_a = Symbol.toStringTag, _b = exports.internal;

class Internal {
  constructor() {
    this.status = {
      state: 0
      /* State.pending */

    };
    this.fulfillReactions = [];
    this.rejectReactions = [];
  }

  isPending() {
    return this.status.state === 0
    /* State.pending */
    ;
  }

  resolve(value) {
    if (this.status.state !== 0
    /* State.pending */
    ) return;

    if (!isPromiseLike(value)) {
      this.status = {
        state: 2
        /* State.fulfilled */
        ,
        value: value
      };
      return this.resume();
    }

    if (isAtomicPromiseLike(value)) {
      const core = value[exports.internal];

      switch (core.status.state) {
        case 2
        /* State.fulfilled */
        :
        case 3
        /* State.rejected */
        :
          this.status = core.status;
          return this.resume();

        default:
          return core.then(() => (this.status = core.status, this.resume()), () => (this.status = core.status, this.resume()));
      }
    }

    this.status = {
      state: 1
      /* State.resolved */
      ,
      promise: value
    };
    return void value.then(value => {
      this.status = {
        state: 2
        /* State.fulfilled */
        ,
        value
      };
      this.resume();
    }, reason => {
      this.status = {
        state: 3
        /* State.rejected */
        ,
        reason
      };
      this.resume();
    });
  }

  reject(reason) {
    if (this.status.state !== 0
    /* State.pending */
    ) return;
    this.status = {
      state: 3
      /* State.rejected */
      ,
      reason
    };
    return this.resume();
  }

  then(resolve, reject, onfulfilled, onrejected) {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;

    switch (status.state) {
      case 2
      /* State.fulfilled */
      :
        if (fulfillReactions.length !== 0) break;
        return call(resolve, reject, resolve, onfulfilled, status.value);

      case 3
      /* State.rejected */
      :
        if (rejectReactions.length !== 0) break;
        return call(resolve, reject, reject, onrejected, status.reason);
    }

    fulfillReactions.push([resolve, reject, resolve, onfulfilled]);
    rejectReactions.push([resolve, reject, reject, onrejected]);
  }

  resume() {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;

    switch (status.state) {
      case 0
      /* State.pending */
      :
      case 1
      /* State.resolved */
      :
        return;

      case 2
      /* State.fulfilled */
      :
        if (rejectReactions.length !== 0) {
          this.rejectReactions = [];
        }

        if (fulfillReactions.length === 0) return;
        react(fulfillReactions, status.value);
        this.fulfillReactions = [];
        return;

      case 3
      /* State.rejected */
      :
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
    const reaction = reactions[i];
    call(reaction[0], reaction[1], reaction[2], reaction[3], param);
  }
}

function call(resolve, reject, cont, callback, param) {
  if (!callback) return void cont(param);

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

/***/ 4934:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MultiQueue = exports.PriorityQueue = exports.Queue = void 0;

const global_1 = __webpack_require__(4128);

const heap_1 = __webpack_require__(818);

const memoize_1 = __webpack_require__(1808);

const undefined = void 0;
const size = 2048;
const initsize = 16;

class Queue {
  constructor() {
    this.head = new FixedQueue(initsize);
    this.tail = this.head;
    this.count = 0;
    this.irregular = 0;
  }

  get length() {
    return this.count === 0 ? this.head.length : this.head.length + this.tail.length + (size - 1) * (this.count - 2) + (this.irregular || size) - 1;
  }

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

      ++this.count;

      if (tail.size !== size && tail !== this.head) {
        this.irregular = tail.size;
      }
    }

    this.tail.push(value);
  }

  pop() {
    const head = this.head;
    const value = head.pop();

    if (head.isEmpty() && !head.next.isEmpty()) {
      --this.count;
      this.head = head.next;

      if (this.head.size === this.irregular) {
        this.irregular = 0;
      }
    }

    return value;
  }

  clear() {
    this.head = this.tail = new FixedQueue(initsize);
    this.count = 0;
    this.irregular = 0;
  }

  *[Symbol.iterator]() {
    while (!this.isEmpty()) {
      yield this.pop();
    }

    return;
  }

}

exports.Queue = Queue;

class FixedQueue {
  constructor(size, next) {
    this.size = size;
    this.array = (0, global_1.Array)(this.size);
    this.mask = this.array.length - 1;
    this.head = 0;
    this.tail = 0;
    this.next = next ?? this;
  }

  get length() {
    return this.tail >= this.head ? this.tail - this.head : this.array.length - this.head + this.tail;
  }

  isEmpty() {
    return this.tail === this.head;
  }

  isFull() {
    return (this.tail + 1 & this.mask) === this.head;
  }

  peek(index = 0) {
    return index === 0 ? this.array[this.head] : this.array[this.tail - 1 & this.mask];
  }

  push(value) {
    this.array[this.tail] = value;
    this.tail = this.tail + 1 & this.mask;
  }

  pop() {
    if (this.isEmpty()) return;
    const value = this.array[this.head];
    this.array[this.head] = undefined;
    this.head = this.head + 1 & this.mask;
    return value;
  }

}

class PriorityQueue {
  constructor(cmp = PriorityQueue.max, clean = true) {
    this.clean = clean;
    this.dict = new global_1.Map();
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
    return arguments.length === 0 ? this.heap.peek()?.peek() : this.dict.get(priority)?.peek();
  }

  push(priority, value) {
    ++this.$length;
    this.queue(priority).push(value);
  }

  pop(priority) {
    if (this.$length === 0) return;
    --this.$length;
    const queue = arguments.length === 0 ? this.heap.peek() : this.dict.get(priority);
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

    return;
  }

}

exports.PriorityQueue = PriorityQueue;
PriorityQueue.priority = Symbol('priority');
PriorityQueue.max = heap_1.Heap.max;
PriorityQueue.min = heap_1.Heap.min;

class MultiQueue {
  constructor(entries) {
    this.dict = new global_1.Map();
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
    this.dict = new global_1.Map();
  }

  take(key, count) {
    if (count === void 0) return this.pop(key);
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

    return;
  }

}

exports.MultiQueue = MultiQueue;

/***/ }),

/***/ 6395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Ring = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const array_1 = __webpack_require__(8112);

const undefined = void 0;
const empty = Symbol('empty');

const unempty = value => value === empty ? undefined : value;

const space = Object.freeze((0, global_1.Array)(100).fill(empty));
let size = 16;

class Ring {
  constructor() {
    this.array = (0, global_1.Array)(size);
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

  replace(index, value, replacer) {
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
    this.$length += values.length - count; // |--H>*>T--|

    if (this.head <= this.tail) {
      this.tail += values.length - count;
      return (0, array_1.splice)(array, index, count, ...values);
    } // |*>T---H>>|


    if (index < this.tail) {
      this.head += values.length - count;
      this.tail += values.length - count;
      return (0, array_1.splice)(array, index, count, ...values);
    } // |>>T---H>*|


    const cnt = (0, alias_1.min)(count, array.length - index);
    const vs = (0, array_1.splice)(array, index, cnt, ...(0, array_1.splice)(values, 0, cnt));
    vs.push(...(0, array_1.splice)(array, 0, count - vs.length, ...values));
    return vs;
  }

  clear() {
    this.array = (0, global_1.Array)(size);
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

    return;
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

/***/ 4198:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.router = void 0;

const global_1 = __webpack_require__(4128);

const sequence_1 = __webpack_require__(8715);

const function_1 = __webpack_require__(6288);

const memoize_1 = __webpack_require__(1808);

function router(config) {
  const {
    match
  } = router.helpers();
  const patterns = global_1.Object.keys(config).reverse();

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
      const results = []; // 先頭の加除はChromeで非常に遅いので末尾を加除する

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
            stack[stack.length - 1] !== '[' && stack.push(token) && nonsyms.push(len - buffer.length);
            buffer += token;
            continue;

          case ']':
          case ')':
            stack[stack.length - 1] === mirror[token] && stack.pop() && nonsyms.pop();
            buffer += token;
            continue;

          case '{':
            if (len - buffer.length === nonsyms[inonsyms] && ++inonsyms) break;
            stack.length === 0 && flush();
            stack[stack.length - 1] !== '[' && stack.push(token) && nonsyms.push(len - buffer.length);
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
            stack[stack.length - 1] !== '[' && stack.push(token);
            continue;

          case ']':
          case ')':
          case '}':
            stack[stack.length - 1] === mirror[token] && stack.pop();
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
            stack[stack.length - 1] !== '[' && stack.push(token);
            continue;

          case ']':
          case ')':
          case '}':
            if (token === '}' && stack[0] === '{') throw new Error(`Spica: Router: Invalid pattern: ${pattern}`);
            stack[stack.length - 1] === mirror[token] && stack.pop();
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
})(router = exports.router || (exports.router = {}));

/***/ }),

/***/ 8715:
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

__exportStar(__webpack_require__(6144), exports);

/***/ }),

/***/ 5352:
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
    return this.length === 0;
  }

  peek(index = 0) {
    return index === 0 ? this.array[this.array.length - 1] : this.array[0];
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

    return;
  }

}

exports.Stack = Stack;

/***/ }),

/***/ 7780:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _a;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Supervisor = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const clock_1 = __webpack_require__(7681);

const coroutine_1 = __webpack_require__(7983);

const observer_1 = __webpack_require__(4615);

const promise_1 = __webpack_require__(4879);

const future_1 = __webpack_require__(3387);

const function_1 = __webpack_require__(6288);

const ring_1 = __webpack_require__(6395);

const exception_1 = __webpack_require__(7822);

class Supervisor extends coroutine_1.Coroutine {
  constructor(opts = {}) {
    super(async function* () {
      return await this.state;
    }, {
      delay: false
    });
    this.state = new future_1.AtomicFuture();
    this.settings = {
      name: '',
      capacity: global_1.Infinity,
      timeout: global_1.Infinity,
      destructor: function_1.noop,
      scheduler: clock_1.clock.next,
      resource: 10
    };
    this.workers = new global_1.Map();
    this.alive = true;
    this.available = true;
    this[_a] = {
      ask: () => {
        throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port.`);
      },
      recv: () => {
        throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port.`);
      },
      send: () => {
        throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port.`);
      },
      connect: () => {
        throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot use coroutine port.`);
      }
    };
    this.scheduled = false; // Bug: Karma and TypeScript

    this.messages = new ring_1.Ring();
    (0, alias_1.ObjectAssign)(this.settings, opts);
    this.name = this.settings.name; // FIXME: Remove the next type assertion after #37383 is fixed.

    if (this.constructor === Supervisor) throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot instantiate abstract classes.`); // @ts-ignore #31251

    this.constructor.instances.add(this);
  }

  static get instances() {
    return this.hasOwnProperty('$instances') ? this.$instances : this.$instances = new global_1.Set();
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

  destructor(reason) {
    this.available = false;
    this.clear(reason);
    global_1.Object.freeze(this.workers);

    while (this.messages.length > 0) {
      const {
        0: names,
        1: param,
        4: timer
      } = this.messages.shift();
      const name = names[global_1.Symbol.iterator]().next().value;
      timer && (0, global_1.clearTimeout)(timer);
      this.$events?.loss.emit([name], [name, param]);
    }

    this.alive = false; // @ts-ignore #31251

    this.constructor.instances.delete(this);
    global_1.Object.freeze(this);
    this.settings.destructor(reason);
    this.state.bind(reason === void 0 ? void 0 : promise_1.AtomicPromise.reject(reason));
  }

  get events() {
    return this.$events ??= {
      init: new observer_1.Observation(),
      exit: new observer_1.Observation(),
      loss: new observer_1.Observation()
    };
  }

  throwErrorIfNotAvailable() {
    if (!this.available) throw new global_1.Error(`Spica: Supervisor: <${this.name}>: Cannot use terminated supervisors.`);
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

    if (typeof process === 'function') {
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

      return this.register(name, {
        init: state => state,
        main: process,
        exit: function_1.noop
      }, state);
    }

    if (this.workers.has(name)) throw new global_1.Error(`Spica: Supervisor: <${this.name}/${name}>: Cannot register another process with tha same name.`);
    this.schedule();
    const worker = new Worker(name, process, state, this, () => void this.schedule(), this.constructor.standalone.has(process), this.$events, () => {
      this.workers.get(name) === worker && void this.workers.delete(name);
    });
    this.workers.set(name, worker);
    return worker.terminate;

    function isAsyncGeneratorFunction(process) {
      return process[global_1.Symbol.toStringTag] === 'AsyncGeneratorFunction';
    }

    function isGeneratorFunction(process) {
      return process[global_1.Symbol.toStringTag] === 'GeneratorFunction';
    }
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
      timer && (0, global_1.clearTimeout)(timer);
      const name = names[global_1.Symbol.iterator]().next().value;
      this.$events?.loss.emit([name], [name, param]);

      try {
        callback(new global_1.Error(`Spica: Supervisor: <${this.name}>: Message overflowed.`), void 0);
      } catch (reason) {
        (0, exception_1.causeAsyncException)(reason);
      }
    }

    if (this.messages.length === 0) return;
    this.throwErrorIfNotAvailable();
    this.schedule();

    if (timeout > 0 && timeout !== global_1.Infinity) {
      this.messages.at(-1)[4] = (0, global_1.setTimeout)(() => void this.schedule(), timeout + 3);
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
    const n = typeof name === 'string' ? name : void 0;
    this.$events?.loss.emit([n], [n, param]);
  }

  refs(name) {
    return name === void 0 ? [...this.workers.values()].map(convert) : this.workers.has(name) ? [convert(this.workers.get(name))] : [];

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
    this[coroutine_1.Coroutine.exit](void 0);
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
    this.settings.scheduler.call(void 0, p.bind);
    this.settings.scheduler === global_1.global.requestAnimationFrame && (0, global_1.setTimeout)(p.bind, 1000);
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
        3: expiry,
        4: timer
      } = this.messages.at(i);
      let result;
      let name;

      for (name of typeof names === 'string' ? [names] : names) {
        if (Date.now() > expiry) break;
        if (result = this.workers.get(name)?.call([param, expiry])) break;
      }

      if (!result && Date.now() < expiry) continue;
      this.messages.splice(i, 1);
      --i;
      --len;
      timer && (0, global_1.clearTimeout)(timer);

      if (result) {
        result.then(reply => void callback(void 0, reply), () => void callback(new global_1.Error(`Spica: Supervisor: <${this.name}>: Process failed.`), void 0));
      } else {
        this.$events?.loss.emit([name], [name, param]);

        try {
          callback(new global_1.Error(`Spica: Supervisor: <${this.name}>: Message expired.`), void 0);
        } catch (reason) {
          (0, exception_1.causeAsyncException)(reason);
        }
      }
    }
  }

}

exports.Supervisor = Supervisor;
_a = coroutine_1.Coroutine.port;
Supervisor.standalone = new global_1.WeakSet();

class NamePool {
  constructor(workers, selector) {
    this.workers = workers;
    this.selector = selector;
  }

  [global_1.Symbol.iterator]() {
    return this.selector(this.workers.keys())[global_1.Symbol.iterator]();
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
    global_1.Object.freeze(this);

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

  call([param, expiry]) {
    if (!this.available) return;
    return new promise_1.AtomicPromise((resolve, reject) => {
      (0, alias_1.isFinite)(expiry) && (0, global_1.setTimeout)(() => void reject(new global_1.Error()), expiry - Date.now());
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

/***/ 5026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.cothrottle = exports.debounce = exports.throttle = void 0;

const global_1 = __webpack_require__(4128);

const clock_1 = __webpack_require__(7681);

const exception_1 = __webpack_require__(7822);

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
    timer = (0, global_1.setTimeout)(async () => {
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
    timer = (0, global_1.setTimeout)(() => {
      timer = 0;
      (0, global_1.setTimeout)(async () => {
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
    let start = (0, clock_1.now)();

    for await (const value of routine()) {
      if (resource - ((0, clock_1.now)() - start) > 0) {
        yield value;
      } else {
        await scheduler();
        start = (0, clock_1.now)();
      }
    }
  };
}

exports.cothrottle = cothrottle;

/***/ }),

/***/ 8520:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.wait = exports.captureTimers = exports.setRepeatTimer = exports.setTimer = void 0;

const global_1 = __webpack_require__(4128);

const invlist_1 = __webpack_require__(7452);

const clock_1 = __webpack_require__(7681);

const function_1 = __webpack_require__(6288);

exports.setTimer = template(false);
exports.setRepeatTimer = template(true);

function template(repeat, cancellers) {
  const timer = (timeout, handler, unhandler) => {
    let params;
    let id = (0, global_1.setTimeout)(async function loop() {
      params = [await handler()];
      if (!repeat) return;
      id = (0, global_1.setTimeout)(loop, timeout);
    }, timeout);
    const cancel = (0, function_1.singleton)(() => {
      (0, global_1.clearTimeout)(id);
      node?.delete();
      params && unhandler?.(params[0]);
    });
    const node = cancellers?.push(cancel);
    return cancel;
  };

  if (!cancellers) {
    timer.group = () => template(repeat, new invlist_1.List());
  } else {
    timer.clear = () => {
      while (cancellers.length) {
        cancellers.shift()();
      }
    };
  }

  return timer;
}

function captureTimers(test) {
  const start = (0, global_1.setTimeout)(function_1.noop);
  (0, global_1.clearTimeout)(start);
  if (typeof start !== 'number') throw new Error('Timer ID must be a number');
  return done => test(err => {
    // Must get the ID before calling done.
    const end = (0, global_1.setTimeout)(function_1.noop);
    done(err);
    (0, global_1.clearTimeout)(end);

    for (let i = start; i < end; ++i) {
      (0, global_1.clearTimeout)(i);
    }
  });
}

exports.captureTimers = captureTimers;

function wait(ms) {
  return ms === 0 ? clock_1.clock : new Promise(resolve => void (0, global_1.setTimeout)(resolve, ms));
}

exports.wait = wait;

/***/ }),

/***/ 5341:
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

/***/ 5177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isPrimitive = exports.is = exports.type = void 0;

const global_1 = __webpack_require__(4128);

const alias_1 = __webpack_require__(5406);

const ObjectPrototype = Object.prototype;
const ArrayPrototype = Array.prototype;

function type(value) {
  const type = typeof value;

  switch (type) {
    case 'function':
      return 'Function';

    case 'object':
      if (value === null) return 'null';
      const tag = value[global_1.Symbol.toStringTag];
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

/***/ 2261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.ReadonlyURL = exports.standardize = void 0;

const global_1 = __webpack_require__(4128);

const format_1 = __webpack_require__(137);

var format_2 = __webpack_require__(137);

Object.defineProperty(exports, "standardize", ({
  enumerable: true,
  get: function () {
    return format_2.standardize;
  }
}));

var format_3 = __webpack_require__(137);

Object.defineProperty(exports, "ReadonlyURL", ({
  enumerable: true,
  get: function () {
    return format_3.ReadonlyURL;
  }
}));

class URL {
  constructor(source, base) {
    this.source = source;
    this.base = base;
    this.url = new format_1.ReadonlyURL(source, base);
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
    return this.url.protocol.slice(0, -1);
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
    return this.params ??= new global_1.URLSearchParams(this.search);
  }

  toString() {
    return this.href;
  }

  toJSON() {
    return this.href;
  }

}

exports.URL = URL;

/***/ }),

/***/ 137:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ReadonlyURL = exports._encode = exports.standardize = void 0;

const global_1 = __webpack_require__(4128);

const memoize_1 = __webpack_require__(1808);

const cache_1 = __webpack_require__(9210);

function standardize(url, base) {
  const u = new ReadonlyURL(url, base);
  url = u.origin === 'null' ? u.protocol.toLowerCase() + u.href.slice(u.protocol.length) : u.origin.toLowerCase() + u.href.slice(u.origin.length);
  return encode(url);
}

exports.standardize = standardize;

function encode(url) {
  return url // Percent-encoding
  .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '').replace(/%(?![0-9A-F]{2})|[^%\[\]]+/ig, global_1.encodeURI).replace(/\?[^#]+/, query => '?' + query.slice(1).replace(/%[0-9A-F]{2}|%|[^=&]+/ig, str => str[0] === '%' && str.length === 3 ? str : (0, global_1.encodeURIComponent)(str))) // Use uppercase letters within percent-encoding triplets
  .replace(/%[0-9A-F]{2}/ig, str => str.toUpperCase()).replace(/#.+/, url.slice(url.indexOf('#')));
}

exports._encode = encode;

class ReadonlyURL {
  constructor(source, base) {
    this.source = source;
    this.base = base;

    switch (source.slice(0, source.lastIndexOf('://', 9) + 1).toLowerCase()) {
      case 'http:':
      case 'https:':
        base = void 0;
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

            if (i > -1 && source.indexOf('#') === -1) {
              base = base.slice(0, j);
            }

        }

    }

    this.share = ReadonlyURL.get(source, base);
  }

  get href() {
    return this.share.href ??= this.share.url.href;
  }

  get resource() {
    return this.share.resource ??= this.href.slice(0, -this.fragment.length - this.query.length || this.href.length) + this.search;
  }

  get origin() {
    return this.share.origin ??= this.share.url.origin;
  }

  get protocol() {
    return this.share.protocol ??= this.share.url.protocol;
  }

  get username() {
    return this.share.username ??= this.share.url.username;
  }

  get password() {
    return this.share.password ??= this.share.url.password;
  }

  get host() {
    return this.share.host ??= this.share.url.host;
  }

  get hostname() {
    return this.share.hostname ??= this.share.url.hostname;
  }

  get port() {
    return this.share.port ??= this.share.url.port;
  }

  get path() {
    return this.share.path ??= `${this.pathname}${this.search}`;
  }

  get pathname() {
    return this.share.pathname ??= this.share.url.pathname;
  }

  get search() {
    return this.share.search ??= this.share.url.search;
  }

  get query() {
    return this.share.query ??= this.search || this.href[this.href.length - this.fragment.length - 1] === '?' && '?' || '';
  }

  get hash() {
    return this.share.hash ??= this.share.url.hash;
  }

  get fragment() {
    return this.share.fragment ??= this.hash || this.href[this.href.length - 1] === '#' && '#' || '';
  }

  get searchParams() {
    return this.params ??= new global_1.URLSearchParams(this.search);
  }

  toString() {
    return this.href;
  }

  toJSON() {
    return this.href;
  }

}

exports.ReadonlyURL = ReadonlyURL; // Can't freeze URL object in the Firefox extension environment.
// ref: https://github.com/falsandtru/pjax-api/issues/44#issuecomment-633915035
// Bug: Error in dependents.
// @ts-ignore

ReadonlyURL.get = (0, memoize_1.memoize)((url, base) => ({
  url: new global_1.global.URL(url, base)
}), (url, base = '') => `${base.indexOf('\n') > -1 ? base.replace(/\n+/g, '') : base}\n${url}`, new cache_1.Cache(10000));

/***/ }),

/***/ 4279:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.Pjax = void 0;

var gui_1 = __webpack_require__(524);

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

/***/ }),

/***/ 2345:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.route = exports.scope = exports.Config = exports.RouterEventSource = exports.RouterEventType = exports.RouterEvent = void 0;

const api_1 = __webpack_require__(6562);

var router_1 = __webpack_require__(9401);

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

var config_1 = __webpack_require__(5411);

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

/***/ 8382:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.savePosition = exports.loadTitle = void 0;

var path_1 = __webpack_require__(5563);

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

/***/ 2090:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.savePjax = exports.isTransitable = exports.savePosition = exports.loadPosition = exports.saveTitle = exports.loadTitle = void 0;
void saveTitle();
void savePosition();

function loadTitle() {
  return window.history.state?.title || document.title;
}

exports.loadTitle = loadTitle;

function saveTitle() {
  void window.history.replaceState({ ...window.history.state,
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
  void window.history.replaceState({ ...window.history.state,
    position: { ...window.history.state?.position,
      top: window.scrollY,
      left: window.scrollX
    }
  }, document.title);
}

exports.savePosition = savePosition;

function isTransitable(state) {
  return state?.pjax?.transition === true ?? false;
}

exports.isTransitable = isTransitable;

function savePjax() {
  void window.history.replaceState({ ...window.history.state,
    pjax: { ...window.history.state?.pjax,
      transition: true
    }
  }, document.title);
}

exports.savePjax = savePjax;

/***/ }),

/***/ 5411:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Config = exports.scope = void 0;

const global_1 = __webpack_require__(4128);

const assign_1 = __webpack_require__(4401);

var scope_1 = __webpack_require__(9375);

Object.defineProperty(exports, "scope", ({
  enumerable: true,
  get: function () {
    return scope_1.scope;
  }
}));

class Config {
  constructor(option) {
    this.areas = ['body'];
    this.link = ':is(a, area)[href]:not([target])';
    this.form = 'form:not([method])';
    this.replace = '';

    this.lock = () => `
    :root {
      position: fixed;
      top: ${-window.scrollY}px;
      left: ${-window.scrollX}px;
      right: 0;
      ${window.innerWidth - document.body.clientWidth ? 'overflow-y: scroll;' : ''}
      ${window.innerHeight - document.body.clientHeight ? 'overflow-x: scroll;' : ''}
    }`;

    this.fetch = {
      rewrite: path => path,
      cache: (_path, _headers) => '',
      headers: new Headers(),
      timeout: 3000,
      wait: 0
    };
    this.update = {
      rewrite: (_path, _doc, _area, _memory) => undefined,
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
    void global_1.Object.defineProperties(this.update, {
      ignore: {
        enumerable: false,

        set(value) {
          this.ignores['_'] = value;
        },

        get() {
          return global_1.Object.keys(this.ignores).map(i => this.ignores[i]).filter(s => s.trim().length > 0).join(',');
        }

      }
    });
    void (0, assign_1.extend)(this, option);
    void (0, assign_1.overwrite)(this.scope, option?.scope ?? {});
    this.fetch.headers = new Headers(this.fetch.headers);
    void global_1.Object.freeze(this);
    void this.fetch.headers.set('X-Requested-With', 'XMLHttpRequest');
    void this.fetch.headers.set('X-Pjax', '1');
  }

  filter(_el) {
    return true;
  }

  fallback(target, reason) {
    if (target instanceof HTMLAnchorElement) {
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

  async load() {}

}

/***/ }),

/***/ 9375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scope = void 0;

const global_1 = __webpack_require__(4128);

const config_1 = __webpack_require__(5411);

const router_1 = __webpack_require__(4198);

const maybe_1 = __webpack_require__(6512);

const assign_1 = __webpack_require__(4401);

const {
  match
} = router_1.router.helpers();

function scope(config, path) {
  const scope = {
    '/': {},
    ...config.scope
  };

  for (const pattern of global_1.Object.keys(scope).reverse()) {
    switch (+match(pattern, path.orig) + +match(pattern, path.dest)) {
      case 0:
        continue;

      case 1:
        return maybe_1.Nothing;
    }

    const option = scope[pattern];
    return option ? (0, maybe_1.Just)(new config_1.Config((0, assign_1.extend)({
      scope: option.scope && (0, assign_1.overwrite)({}, config.scope, option.scope)
    }, config, option))) : maybe_1.Nothing;
  }

  return maybe_1.Nothing;
}

exports.scope = scope;

/***/ }),

/***/ 9401:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RouterEventLocation = exports.RouterEventRequest = exports.RouterEventMethod = exports.RouterEventType = exports.RouterEventSource = exports.RouterEvent = void 0;

const global_1 = __webpack_require__(4128);

const dom_1 = __webpack_require__(7274);

const url_1 = __webpack_require__(2261);

const listener_1 = __webpack_require__(1051);

class RouterEvent {
  constructor(original, base) {
    this.original = original;
    this.base = base;
    this.type = this.original.type.toLowerCase();
    this.source = this.original[listener_1.currentTarget];
    this.request = new RouterEventRequest(this.source, this.base);
    this.location = new RouterEventLocation(this.base, this.request.url);
    void global_1.Object.freeze(this);
  }

}

exports.RouterEvent = RouterEvent;
var RouterEventSource;

(function (RouterEventSource) {
  RouterEventSource.Anchor = HTMLAnchorElement;
  RouterEventSource.Area = HTMLAreaElement;
  RouterEventSource.Form = HTMLFormElement;
  RouterEventSource.Window = window.Window;
})(RouterEventSource = exports.RouterEventSource || (exports.RouterEventSource = {}));

var RouterEventType;

(function (RouterEventType) {
  RouterEventType.Click = 'click';
  RouterEventType.Submit = 'submit';
  RouterEventType.Popstate = 'popstate';
})(RouterEventType = exports.RouterEventType || (exports.RouterEventType = {}));

var RouterEventMethod;

(function (RouterEventMethod) {
  RouterEventMethod.GET = 'GET';
  RouterEventMethod.POST = 'POST';
})(RouterEventMethod = exports.RouterEventMethod || (exports.RouterEventMethod = {}));

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

      throw new TypeError();
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

      throw new TypeError();
    })();

    this.body = (() => this.source instanceof RouterEventSource.Form && this.method === RouterEventMethod.POST ? new FormData(this.source) : null)();

    void global_1.Object.freeze(this);
  }

}

exports.RouterEventRequest = RouterEventRequest;

class RouterEventLocation {
  constructor(orig, dest) {
    this.orig = orig;
    this.dest = dest;
    void global_1.Object.freeze(this);
  }

}

exports.RouterEventLocation = RouterEventLocation;

/***/ }),

/***/ 6562:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.route = exports.RouterEntityState = exports.RouterEntity = void 0;

const fetch_1 = __webpack_require__(1791);

const update_1 = __webpack_require__(5643);

const content_1 = __webpack_require__(9218);

const path_1 = __webpack_require__(5563);

const either_1 = __webpack_require__(8555);

var entity_1 = __webpack_require__(5721);

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
  return (0, either_1.Right)(void 0).bind(entity.state.process.either).bind(() => match(io.document, entity.config.areas) ? (0, either_1.Right)(void 0) : (0, either_1.Left)(new Error(`Failed to match areas.`))).fmap(() => (0, fetch_1.fetch)(entity.event, entity.config, entity.state.process, io)).fmap(async p => (await p).fmap(([res, seq]) => (0, update_1.update)(entity, res, seq, {
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

/***/ 5721:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RouterEntityState = exports.RouterEntity = void 0;

const global_1 = __webpack_require__(4128);

class RouterEntity {
  constructor(config, event, state) {
    this.config = config;
    this.event = event;
    this.state = state;
    void global_1.Object.freeze(this);
  }

}

exports.RouterEntity = RouterEntity;

class RouterEntityState {
  constructor(process, scripts) {
    this.process = process;
    this.scripts = scripts;
    void global_1.Object.freeze(this);
  }

}

exports.RouterEntityState = RouterEntityState;

/***/ }),

/***/ 7624:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FetchResponse = void 0;

const global_1 = __webpack_require__(4128);

const html_1 = __webpack_require__(6301);

const url_1 = __webpack_require__(2261);

class FetchResponse {
  constructor(url, xhr) {
    this.url = url;
    this.xhr = xhr;

    this.header = name => this.xhr.getResponseHeader(name);

    this.document = this.xhr.responseXML.cloneNode(true);
    if (url.origin !== new url_1.URL(xhr.responseURL, window.location.href).origin) throw new Error(`Redirected to another origin.`);
    void global_1.Object.defineProperty(this.document, 'URL', {
      configurable: true,
      enumerable: true,
      value: url.href,
      writable: false
    });
    void (0, html_1.fix)(this.document);
    void global_1.Object.freeze(this);
  }

}

exports.FetchResponse = FetchResponse;

/***/ }),

/***/ 1791:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fetch = void 0;

const router_1 = __webpack_require__(9401);

const xhr_1 = __webpack_require__(4608);

const timer_1 = __webpack_require__(8520);

const dom_1 = __webpack_require__(3252);

const style = (0, dom_1.html)('style');

async function fetch({
  type,
  location,
  request: {
    method,
    url,
    body
  }
}, {
  lock,
  fetch: {
    rewrite,
    cache,
    headers,
    timeout,
    wait
  },
  sequence
}, process, io) {
  void window.dispatchEvent(new Event('pjax:fetch'));
  const {
    scrollX,
    scrollY
  } = window;

  if (type === router_1.RouterEventType.Popstate) {
    // 小さな画面でもチラつかない
    style.textContent = lock();
    io.document.documentElement.appendChild(style);
  }

  const [seq, res] = await Promise.all([await sequence.fetch(void 0, {
    path: url.path,
    method,
    headers,
    body
  }), (0, xhr_1.xhr)(method, url, location.orig, headers, body, timeout, rewrite, cache, process), (0, timer_1.wait)(wait)]);

  if (type === router_1.RouterEventType.Popstate) {
    style.parentNode?.removeChild(style);
    window.scrollTo(scrollX, scrollY);
  }

  return res.bind(process.either).fmap(res => [res, seq]);
}

exports.fetch = fetch;

/***/ }),

/***/ 4608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.match_ = exports.xhr = void 0;

const fetch_1 = __webpack_require__(7624);

const promise_1 = __webpack_require__(4879);

const either_1 = __webpack_require__(8555);

const cache_1 = __webpack_require__(9210);

const url_1 = __webpack_require__(2261);

const memory = new cache_1.Cache(100);
const caches = new cache_1.Cache(100);

function xhr(method, displayURL, base, headers, body, timeout, rewrite, cache, cancellation) {
  headers = new Headers(headers);
  void headers.set('Accept', headers.get('Accept') || 'text/html');
  const requestURL = new url_1.URL((0, url_1.standardize)(rewrite(displayURL.path), base.href));

  if (method === 'GET' && caches.has(requestURL.path) && Date.now() > caches.get(requestURL.path).expiry) {
    void headers.set('If-None-Match', headers.get('If-None-Match') || caches.get(requestURL.path).etag);
  }

  const key = method === 'GET' ? cache(requestURL.path, headers) || void 0 : void 0;
  return new promise_1.AtomicPromise(resolve => {
    if (key && memory.has(key)) return resolve((0, either_1.Right)(memory.get(key)(displayURL, requestURL)));
    const xhr = new XMLHttpRequest();
    void xhr.open(method, requestURL.path, true);

    for (const [name, value] of headers) {
      void xhr.setRequestHeader(name, value);
    }

    xhr.responseType = 'document';
    xhr.timeout = timeout;
    void xhr.send(body);
    void xhr.addEventListener("abort", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by abort.`))));
    void xhr.addEventListener("error", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by error.`))));
    void xhr.addEventListener("timeout", () => void resolve((0, either_1.Left)(new Error(`Failed to request a page by timeout.`))));
    void xhr.addEventListener("load", () => void verify(xhr, base, method).fmap(xhr => {
      const responseURL = new url_1.URL((0, url_1.standardize)(xhr.responseURL, base.href));

      if (method === 'GET') {
        const cc = new Map(xhr.getResponseHeader('Cache-Control') // eslint-disable-next-line redos/no-vulnerable
        ? xhr.getResponseHeader('Cache-Control').trim().split(/\s*,\s*/).filter(v => v.length > 0).map(v => v.split('=').concat('')) : []);

        for (const path of new Set([requestURL.path, responseURL.path])) {
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

function verify(xhr, base, method) {
  return (0, either_1.Right)(xhr).bind(xhr => {
    const url = new url_1.URL((0, url_1.standardize)(xhr.responseURL, base.href));

    switch (true) {
      case !xhr.responseURL:
        return (0, either_1.Left)(new Error(`Failed to get the response URL.`));

      case url.origin !== new url_1.URL('', window.location.origin).origin:
        return (0, either_1.Left)(new Error(`Redirected to another origin.`));

      case !/2..|304/.test(`${xhr.status}`):
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

/***/ 5643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.update = void 0;

const router_1 = __webpack_require__(9401);

const blur_1 = __webpack_require__(4664);

const url_1 = __webpack_require__(2139);

const title_1 = __webpack_require__(954);

const head_1 = __webpack_require__(6379);

const content_1 = __webpack_require__(9218);

const css_1 = __webpack_require__(1340);

const script_1 = __webpack_require__(5433);

const focus_1 = __webpack_require__(576);

const scroll_1 = __webpack_require__(6891);

const path_1 = __webpack_require__(5563);

const promise_1 = __webpack_require__(4879);

const either_1 = __webpack_require__(8555);

const hlist_1 = __webpack_require__(7536);

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
  return promise_1.AtomicPromise.resolve(seq).then(process.either) // fetch -> unload
  .then(m => m.bind(() => (0, content_1.separate)(documents, config.areas).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), () => m)).fmap(seqA => (void window.dispatchEvent(new Event('pjax:unload')), config.sequence.unload(seqA, { ...response,
    url: response.url.href
  })))).then(m => either_1.Either.sequence(m)).then(process.promise).then(m => m.bind(seqB => (0, content_1.separate)(documents, config.areas).fmap(([area]) => [seqB, area]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), process.either)).bind(([seqB, area]) => (void config.update.rewrite(event.location.dest.path, documents.src, area, event.type === router_1.RouterEventType.Popstate ? config.memory?.get(event.location.dest.path) : void 0), (0, content_1.separate)(documents, config.areas).fmap(([, areas]) => [seqB, areas]).extract(() => (0, either_1.Left)(new Error(`Failed to separate the areas.`)), process.either)))).then(process.promise) // unload -> ready
  .then(m => m.fmap(([seqB, areas]) => (0, hlist_1.HList)().add((void (0, blur_1.blur)(documents.dst), void (0, path_1.savePjax)(), void (0, url_1.url)(new router_1.RouterEventLocation(event.location.orig, response.url), documents.src.title, event.type, event.source, config.replace), void (0, path_1.savePjax)(), void (0, title_1.title)(documents), void (0, path_1.saveTitle)(), void (0, head_1.head)(documents, config.update.head, config.update.ignore), process.either((0, content_1.content)(documents, areas)).fmap(([as, ps]) => [as, promise_1.AtomicPromise.all(ps)]))).unfold(async p => (await p).fmap(async ([areas]) => {
    config.update.css ? void (0, css_1.css)(documents, config.update.ignore) : void 0;
    void io.document.dispatchEvent(new Event('pjax:content'));
    const seqC = await config.sequence.content(seqB, areas);
    const ssm = config.update.script ? await (0, script_1.script)(documents, state.scripts, config.update, Math.max(config.fetch.timeout, 1000) * 10, process) : await process.either([[], promise_1.AtomicPromise.resolve(process.either([]))]);
    void (0, focus_1.focus)(event.type, documents.dst);
    void (0, scroll_1.scroll)(event.type, documents.dst, {
      hash: event.location.dest.fragment,
      position: io.position
    });
    void (0, path_1.savePosition)();
    void io.document.dispatchEvent(new Event('pjax:ready'));
    return [ssm.fmap(([ss, ap]) => [ss, ap.then(m => m.extract())]), await config.sequence.ready(seqC)];
  }).fmap(p => p.then(([m, seqD]) => m.fmap(sst => [sst, seqD]))).extract(err => promise_1.AtomicPromise.resolve((0, either_1.Left)(err)))).reverse())).then(process.promise) // ready -> load
  .then(m => m.fmap(([p1, p2]) => (void promise_1.AtomicPromise.all([p1, p2]).then(([m1, m2]) => m1.bind(([, cp]) => m2.fmap(([[, sp], seqD]) => // Asynchronously wait for load completion of elements and scripts.
  void promise_1.AtomicPromise.all([cp, sp]).then(process.either).then(m => m.fmap(([events]) => (void window.dispatchEvent(new Event('pjax:load')), void config.sequence.load(seqD, events))).extract(() => void 0)))).extract(() => void 0)), p2))).then(m => either_1.Either.sequence(m).then(m => m.join())).then(m => m.fmap(([sst]) => sst));
}

exports.update = update;

/***/ }),

/***/ 4664:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.blur = void 0;

function blur(document) {
  if (document !== window.document || document.activeElement === document.body) return;
  void document.activeElement.blur();
  void document.body.focus();
}

exports.blur = blur;

/***/ }),

/***/ 9218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._wait = exports._split = exports.separate = exports.content = void 0;

const script_1 = __webpack_require__(5433);

const promise_1 = __webpack_require__(4879);

const maybe_1 = __webpack_require__(6512);

const array_1 = __webpack_require__(8112);

const query_1 = __webpack_require__(6120);

const listener_1 = __webpack_require__(1051);

function content(documents, areas, io = {
  replace: (src, dst) => void dst.parentNode.replaceChild(src, dst)
}) {
  return [areas.map(r => r.dst).reduce(array_1.push, []), areas.map(load).reduce(array_1.push, [])];

  function load(area) {
    return area.src.map((_, i) => ({
      src: documents.dst.importNode(area.src[i].cloneNode(true), true),
      dst: area.dst[i]
    })).map(area => (void replace(area), (0, query_1.querySelectorAll)(area.src, 'img, iframe, frame').map(wait))).reduce(array_1.push, []);

    function replace(area) {
      const unescape = [...area.src.querySelectorAll('script')].map(script_1.escape).reduce((f, g) => () => (void f(), void g()), () => void 0);
      void io.replace(area.src, area.dst);
      void unescape();
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

/***/ 1340:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.css = void 0;

const sync_1 = __webpack_require__(4501);

function css(documents, ignore) {
  const selector = 'link[rel~="stylesheet"], style';
  return void ['head', 'body'].map(query => [documents.src.querySelector(query), documents.dst.querySelector(query)]).forEach(([src, dst]) => void (0, sync_1.sync)((0, sync_1.pair)(list(src), list(dst), (a, b) => a.outerHTML === b.outerHTML), dst));

  function list(source) {
    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
  }
}

exports.css = css;

/***/ }),

/***/ 576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.focus = void 0;

const router_1 = __webpack_require__(9401);

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

/***/ 6379:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.head = void 0;

const sync_1 = __webpack_require__(4501);

function head(documents, selector, ignore) {
  ignore += selector.includes('link') ? ', link[rel~="stylesheet"]' : '';
  return void (0, sync_1.sync)((0, sync_1.pair)(list(documents.src.head), list(documents.dst.head), (a, b) => a.outerHTML === b.outerHTML), documents.dst.head);

  function list(source) {
    return [...source.querySelectorAll(selector)].filter(el => !ignore || !el.matches(ignore));
  }
}

exports.head = head;

/***/ }),

/***/ 5433:
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

const global_1 = __webpack_require__(4128);

const error_1 = __webpack_require__(2893);

const promise_1 = __webpack_require__(4879);

const either_1 = __webpack_require__(8555);

const url_1 = __webpack_require__(2261);

const array_1 = __webpack_require__(8112);

const tuple_1 = __webpack_require__(5341);

const timer_1 = __webpack_require__(8520);

const dom_1 = __webpack_require__(3252);

function script(documents, skip, selector, timeout, cancellation, io = {
  fetch,
  evaluate
}) {
  const scripts = [...documents.src.querySelectorAll('script')].filter(el => !el.type || /(?:application|text)\/(?:java|ecma)script|module/i.test(el.type)).filter(el => !el.matches(selector.ignore.trim() || '_')).filter(el => el.hasAttribute('src') ? !skip.has(new url_1.URL((0, url_1.standardize)(el.src)).href) || el.matches(selector.reload.trim() || '_') : true);
  const {
    ss,
    as
  } = scripts.reduce((o, script) => {
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
  return promise_1.AtomicPromise.all([promise_1.AtomicPromise.all(request(ss)).then(run), promise_1.AtomicPromise.all(request(as)).then(run)]).then(async ([sm, am]) => sm.fmap(async p => (await p).fmap(([ss1, ap1]) => [ss1, ap1.then(async as1 => am.fmap(async p => (await p).fmap(([ss2, ap2]) => promise_1.AtomicPromise.all([as1, (0, either_1.Right)(ss2), ap2]).then(sst => sst.reduce((m1, m2) => m1.bind(s1 => m2.fmap(s2 => (0, array_1.push)(s1, s2)))))).extract(either_1.Left)).extract(either_1.Left))])).extract(either_1.Left));

  function request(scripts) {
    return scripts.map(script => io.fetch(script, timeout));
  }

  function run(responses) {
    return responses.reduce((results, m) => m.bind(() => results), responses.reduce((results, m) => results.bind(cancellation.either).bind(([sp, ap]) => m.fmap(([script, code]) => io.evaluate(script, code, selector.logger, skip, promise_1.AtomicPromise.all(sp), cancellation)).bind(m => m.extract(p => (0, either_1.Right)((0, tuple_1.tuple)((0, array_1.push)(sp, [p]), ap)), p => (0, either_1.Right)((0, tuple_1.tuple)(sp, (0, array_1.push)(ap, [p])))))), (0, either_1.Right)([[], []]))).fmap(([sp, ap]) => promise_1.AtomicPromise.all(sp).then(m => either_1.Either.sequence(m)).then(sm => sm.fmap(ss => (0, tuple_1.tuple)(ss, Promise.all(ap).then(m => either_1.Either.sequence(m))))));
  }
}

exports.script = script;

async function fetch(script, timeout) {
  if (!script.hasAttribute('src')) return (0, either_1.Right)([script, script.text]);
  if (script.type.toLowerCase() === 'module') return (0, either_1.Right)([script, '']);
  return promise_1.AtomicPromise.race([window.fetch(script.src, {
    headers: new Headers({
      Accept: 'application/javascript'
    }),
    integrity: script.integrity
  }), (0, timer_1.wait)(timeout).then(() => promise_1.AtomicPromise.reject(new Error(`${script.src}: Timeout.`)))]).then(async res => res.ok ? (0, either_1.Right)([script, await res.text()]) : script.matches('[src][async]') ? retry(script).then(() => (0, either_1.Right)([script, '']), () => (0, either_1.Left)(new Error(`${script.src}: ${res.statusText}`))) : (0, either_1.Left)(new Error(res.statusText)), error => (0, either_1.Left)(error));
}

exports._fetch = fetch;

function evaluate(script, code, logger, skip, wait, cancellation) {
  script = script.ownerDocument === document ? script // only for testing
  : document.importNode(script.cloneNode(true), true);
  const logging = !!script.parentElement && script.parentElement.matches(logger.trim() || '_');
  const container = document.querySelector(logging ? script.parentElement.id ? `#${script.parentElement.id}` : script.parentElement.tagName : '_') || document.body;
  const unescape = escape(script);
  void container.appendChild(script);
  void unescape();
  !logging && void script.remove();
  const result = promise_1.AtomicPromise.resolve(wait).then(evaluate);
  return script.matches('[src][async]') ? (0, either_1.Right)(result) : (0, either_1.Left)(result);

  function evaluate() {
    if (!cancellation.isAlive()) throw new error_1.FatalError('Expired.');

    if (script.matches('[type="module"][src]')) {
      return promise_1.AtomicPromise.resolve(Promise.resolve().then(() => __importStar(__webpack_require__(8442)(script.src)))).catch(reason => reason.message.startsWith('Failed to load ') && script.matches('[src][async]') ? retry(script).catch(() => promise_1.AtomicPromise.reject(reason)) : promise_1.AtomicPromise.reject(reason)).then(() => (void script.dispatchEvent(new Event('load')), (0, either_1.Right)(script)), reason => (void script.dispatchEvent(new Event('error')), (0, either_1.Left)(new error_1.FatalError(reason instanceof Error ? reason.message : reason + ''))));
    } else {
      try {
        if (skip.has(new url_1.URL((0, url_1.standardize)(window.location.href)).href)) throw new error_1.FatalError('Expired.');
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
  if (new url_1.URL((0, url_1.standardize)(script.src)).origin === new url_1.URL((0, url_1.standardize)(window.location.href)).origin) return promise_1.AtomicPromise.reject(new Error());
  script = (0, dom_1.html)('script', global_1.Object.values(script.attributes).reduce((o, {
    name,
    value
  }) => (o[name] = value, o), {}), [...script.childNodes]);
  return new promise_1.AtomicPromise((resolve, reject) => (void script.addEventListener('load', () => void resolve(global_1.undefined)), void script.addEventListener('error', reject), void document.body.appendChild(script), void script.remove()));
}

/***/ }),

/***/ 6891:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._hash = exports.scroll = void 0;

const router_1 = __webpack_require__(9401);

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
  void io.scrollToElement(el);
  return true;
}

exports._hash = hash;

/***/ }),

/***/ 4501:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pair = exports.sync = void 0;

const either_1 = __webpack_require__(8555);

const array_1 = __webpack_require__(8112);

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
  return [...link].map(([dst, srcs]) => [srcs, dst]);

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

/***/ }),

/***/ 954:
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

/***/ 2139:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._isReplaceable = exports._isRegisterable = exports.url = void 0;

const router_1 = __webpack_require__(9401);

const listener_1 = __webpack_require__(1051); // A part of the workaround to record the correct browser history.


void (0, listener_1.bind)(document, 'pjax:ready', () => void window.history.replaceState(window.history.state, window.document.title));

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
  if (location.dest.href === location.orig.href) return false;

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

/***/ }),

/***/ 5563:
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

__exportStar(__webpack_require__(2090), exports);

/***/ }),

/***/ 6629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClickView = void 0;

const coroutine_1 = __webpack_require__(7983);

const listener_1 = __webpack_require__(1051);

class ClickView extends coroutine_1.Coroutine {
  constructor(document, selector, listener) {
    super(async function* () {
      return this.finally((0, listener_1.delegate)(document, selector, 'click', ev => {
        if (!(ev.currentTarget instanceof HTMLAnchorElement || ev.currentTarget instanceof HTMLAreaElement)) return;
        void listener(ev);
      }));
    }, {
      delay: false
    });
  }

}

exports.ClickView = ClickView;

/***/ }),

/***/ 42:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.NavigationView = void 0;

const page_1 = __webpack_require__(9114);

const state_1 = __webpack_require__(2090);

const coroutine_1 = __webpack_require__(7983);

const url_1 = __webpack_require__(2261);

const listener_1 = __webpack_require__(1051);

class NavigationView extends coroutine_1.Coroutine {
  constructor(window, listener) {
    super(async function* () {
      return this.finally((0, listener_1.bind)(window, 'popstate', ev => {
        if (!(0, state_1.isTransitable)(page_1.page.state) || !(0, state_1.isTransitable)(window.history.state)) return;
        if ((0, url_1.standardize)(window.location.href) === page_1.page.url.href) return;
        void listener(ev);
      }));
    }, {
      delay: false
    });
  }

}

exports.NavigationView = NavigationView;

/***/ }),

/***/ 9078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ScrollView = void 0;

const page_1 = __webpack_require__(9114);

const coroutine_1 = __webpack_require__(7983);

const url_1 = __webpack_require__(2261);

const throttle_1 = __webpack_require__(5026);

const listener_1 = __webpack_require__(1051);

class ScrollView extends coroutine_1.Coroutine {
  constructor(window, listener) {
    super(async function* () {
      return this.finally((0, listener_1.bind)(window, 'scroll', (0, throttle_1.debounce)(100, ev => {
        if ((0, url_1.standardize)(window.location.href) !== page_1.page.url.href) return;
        void listener(ev);
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

/***/ 2217:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SubmitView = void 0;

const coroutine_1 = __webpack_require__(7983);

const listener_1 = __webpack_require__(1051);

class SubmitView extends coroutine_1.Coroutine {
  constructor(document, selector, listener) {
    super(async function* () {
      return this.finally((0, listener_1.delegate)(document, selector, 'submit', ev => {
        if (!(ev.currentTarget instanceof HTMLFormElement)) return;
        void listener(ev);
      }));
    }, {
      delay: false
    });
  }

}

exports.SubmitView = SubmitView;

/***/ }),

/***/ 8411:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.API = void 0;

const router_1 = __webpack_require__(574);

const process_1 = __webpack_require__(4318);

const page_1 = __webpack_require__(9114);

const state_1 = __webpack_require__(2090);

const html_1 = __webpack_require__(6301);

const assign_1 = __webpack_require__(4401);

const listener_1 = __webpack_require__(1051);

class API {
  static assign(url, option, io = {
    document: window.document,
    router: router_1.route
  }) {
    let result;
    void click(url, event => result = io.router(new router_1.Config(option), new router_1.RouterEvent(event, page_1.page.url), process_1.process, io));
    return result;
  }

  static replace(url, option, io = {
    document: window.document,
    router: router_1.route
  }) {
    let result;
    void click(url, event => result = io.router(new router_1.Config((0, assign_1.assign)({}, option, {
      replace: '*'
    })), new router_1.RouterEvent(event, page_1.page.url), process_1.process, io));
    return result;
  }

  static sync(isPjaxPage) {
    isPjaxPage && void (0, state_1.savePjax)();
    void process_1.process.cast('', new Error(`Canceled.`));
    void page_1.page.sync();
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
  void (0, listener_1.once)(el, 'click', callback);
  void (0, listener_1.once)(el, 'click', ev => void ev.preventDefault());
  void el.click();
}

/***/ }),

/***/ 524:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GUI = void 0;

const api_1 = __webpack_require__(8411);

const click_1 = __webpack_require__(6629);

const submit_1 = __webpack_require__(2217);

const navigation_1 = __webpack_require__(42);

const scroll_1 = __webpack_require__(9078);

const router_1 = __webpack_require__(574);

const page_1 = __webpack_require__(9114);

__webpack_require__(4650);

const process_1 = __webpack_require__(4318);

const store_1 = __webpack_require__(8382);

const supervisor_1 = __webpack_require__(7780);

const copropagator_1 = __webpack_require__(7596);

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
GUI.resources = new class extends supervisor_1.Supervisor {}();

class View extends copropagator_1.Copropagator {
  constructor(option, io) {
    const config = new router_1.Config(option);

    const router = event => void io.router(config, new router_1.RouterEvent(event, page_1.page.url), process_1.process, io);

    super([new click_1.ClickView(io.document, config.link, router), new submit_1.SubmitView(io.document, config.form, router), new navigation_1.NavigationView(window, router), new scroll_1.ScrollView(window, store_1.savePosition)]);
  }

}

/***/ }),

/***/ 574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._validate = exports.route = exports.RouterEventSource = exports.RouterEvent = exports.Config = void 0;

const router_1 = __webpack_require__(2345);

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

const page_1 = __webpack_require__(9114);

const env_1 = __webpack_require__(608); //import { progressbar } from './progressbar';


const error_1 = __webpack_require__(2893);

const store_1 = __webpack_require__(8382);

const url_1 = __webpack_require__(2261);

const cancellation_1 = __webpack_require__(412);

const maybe_1 = __webpack_require__(6512);

const promise_1 = __webpack_require__(4879);

const listener_1 = __webpack_require__(1051);

void (0, listener_1.bind)(window, 'pjax:unload', () => window.history.scrollRestoration = 'auto', true);

function route(config, event, process, io) {
  switch (event.type) {
    case router_1.RouterEventType.Click:
    case router_1.RouterEventType.Submit:
      void (0, store_1.savePosition)();
      break;

    case router_1.RouterEventType.Popstate:
      io.document.title = (0, store_1.loadTitle)(); // 小さな画面ではチラつく
      //const { scrollX, scrollY } = window;
      //requestAnimationFrame(() => void window.scrollTo(scrollX, scrollY));

      break;
  }

  return (0, maybe_1.Just)(0).guard(validate(event.request.url, config, event)).bind(() => (0, router_1.scope)(config, (({
    orig,
    dest
  }) => ({
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
    page_1.page.process(event.location.dest);
    const [scripts] = await env_1.env;
    window.history.scrollRestoration = 'manual';
    config.memory?.set(event.location.orig.path, io.document.cloneNode(true)); //void progressbar(config.progressbar);

    return (0, router_1.route)(config, event, {
      process: cancellation,
      scripts
    }, io).then(m => m.fmap(async ([ss, p]) => (void kill(), void page_1.page.complete(), void ss.filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL((0, url_1.standardize)(s.src)).href)), void (await p).filter(s => s.hasAttribute('src')).forEach(s => void scripts.add(new url_1.URL((0, url_1.standardize)(s.src)).href)))).extract()).catch(reason => (void kill(), void page_1.page.complete(), window.history.scrollRestoration = 'auto', cancellation.isAlive() || reason instanceof error_1.FatalError ? void config.fallback(event.source, reason) : void 0));
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

function validate(url, config, event) {
  if (event.original.defaultPrevented) return false;

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

/***/ 608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.env = void 0;

const script_1 = __webpack_require__(182);

exports.env = Promise.all([script_1.scripts, new Promise(r => void setTimeout(r))]);

/***/ }),

/***/ 9114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.page = void 0;

const global_1 = __webpack_require__(4128);

const state_1 = __webpack_require__(2090);

const url_1 = __webpack_require__(2261);

const listener_1 = __webpack_require__(1051);

void (0, listener_1.bind)(global_1.window, 'hashchange', () => void exports.page.sync(), true);
void (0, listener_1.bind)(global_1.window, 'popstate', () => (0, state_1.isTransitable)(exports.page.state) && (0, state_1.isTransitable)(global_1.window.history.state) || void exports.page.sync(), true);
exports.page = new class {
  constructor() {
    this.$url = new url_1.URL((0, url_1.standardize)(global_1.window.location.href));
    this.$state = global_1.window.history.state;
  }

  get url() {
    return this.$url;
  }

  get state() {
    return this.$state;
  }

  sync() {
    this.$url = new url_1.URL((0, url_1.standardize)(global_1.window.location.href));
    this.target = void 0;
    this.$state = global_1.window.history.state;
  }

  complete() {
    this.$url = this.target ?? new url_1.URL((0, url_1.standardize)(global_1.window.location.href));
    this.target = void 0;
    this.$state = global_1.window.history.state;
  }

  process(url) {
    this.target = url;
  }

}();

/***/ }),

/***/ 4318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.process = void 0;

const supervisor_1 = __webpack_require__(7780);

exports.process = new class extends supervisor_1.Supervisor {}();

/***/ }),

/***/ 182:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scripts = void 0;

const page_1 = __webpack_require__(9114);

const url_1 = __webpack_require__(2261);

const listener_1 = __webpack_require__(1051);

exports.scripts = new Set();
void (0, listener_1.bind)(window, 'pjax:unload', () => void document.querySelectorAll('script[src]').forEach(script => void exports.scripts.add(new url_1.URL((0, url_1.standardize)(script.src, page_1.page.url.href)).href)));

/***/ }),

/***/ 4650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const listener_1 = __webpack_require__(1051);

void (0, listener_1.bind)(window, 'unload', () => window.history.scrollRestoration = 'auto', false);

/***/ }),

/***/ 7274:
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
    return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]?|[\uDC00-\uDFFF]/g, str => str.length === 2 ? str : '');
  }
}

exports.serialize = serialize;

/***/ }),

/***/ 2893:
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
Error.prototype.name = 'Error';
FatalError.prototype.name = 'FatalError';

/***/ }),

/***/ 6301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._fixNoscript = exports.fix = exports.parse = void 0;

const maybe_1 = __webpack_require__(6512);

const either_1 = __webpack_require__(8555);

exports.parse = [parseByDOM, parseByDoc].reduce((m, f) => m.bind(() => test(f) ? (0, either_1.Left)(f) : m), (0, either_1.Right)(() => maybe_1.Nothing)).extract(f => html => (0, maybe_1.Just)(f(html)));

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
    return [el, clone];
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
  } catch {
    return false;
  }
}

/***/ }),

/***/ 3252:
/***/ (function(module) {

/*! typed-dom v0.0.310 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 406:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports[NaN] = void 0;
exports[NaN] = Number.NaN, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.sqrt = Math.sqrt;
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

/***/ 529:
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

/***/ 128:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_2745__) => {



__nested_webpack_require_2745__(921);

const global = void 0 || typeof globalThis !== 'undefined' && globalThis // @ts-ignore
|| typeof self !== 'undefined' && self || Function('return this')();
global.global = global;
module.exports = global;

/***/ }),

/***/ 921:
/***/ (() => {

 // @ts-ignore

var globalThis; // @ts-ignore

var global = (/* unused pure expression or super */ null && (0));

/***/ }),

/***/ 808:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_3232__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.reduce = exports.memoize = void 0;

const global_1 = __nested_webpack_require_3232__(128);

const alias_1 = __nested_webpack_require_3232__(406);

const compare_1 = __nested_webpack_require_3232__(529);

const undefined = void 0;

function memoize(f, identify = (...as) => as[0], memory) {
  if (typeof identify === 'object') return memoize(f, undefined, identify);
  return (0, alias_1.isArray)(memory) ? memoizeArray(f, identify, memory) : memoizeObject(f, identify, memory ?? new global_1.Map());
}

exports.memoize = memoize;

function memoizeArray(f, identify, memory) {
  let nullish = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory[b];
    if (z !== undefined || nullish && memory[b] !== undefined) return z;
    z = f(...as);
    nullish ||= z === undefined;
    memory[b] = z;
    return z;
  };
}

function memoizeObject(f, identify, memory) {
  let nullish = false;
  return (...as) => {
    const b = identify(...as);
    let z = memory.get(b);
    if (z !== undefined || nullish && memory.has(b)) return z;
    z = f(...as);
    nullish ||= z === undefined;
    memory.set(b, z);
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

/***/ 521:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_4777__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defrag = exports.prepend = exports.append = exports.isChildren = exports.define = exports.element = exports.text = exports.svg = exports.html = exports.frag = exports.shadow = void 0;

const global_1 = __nested_webpack_require_4777__(128);

const alias_1 = __nested_webpack_require_4777__(406);

const memoize_1 = __nested_webpack_require_4777__(808);

var caches;

(function (caches) {
  caches.shadows = new WeakMap();
  caches.shadow = (0, memoize_1.memoize)((el, opts) => el.attachShadow(opts), caches.shadows);
  caches.fragment = global_1.document.createDocumentFragment();
})(caches || (caches = {}));

function shadow(el, opts, children, factory = exports.html) {
  if (typeof el === 'string') return shadow(factory(el), opts, children, factory);
  if (typeof opts === 'function') return shadow(el, void 0, children, opts);
  if (typeof children === 'function') return shadow(el, opts, void 0, children);
  if (isChildren(opts)) return shadow(el, void 0, opts, factory);
  return defineChildren(!opts ? el.shadowRoot ?? caches.shadows.get(el) ?? el.attachShadow({
    mode: 'open'
  }) : opts.mode === 'open' ? el.shadowRoot ?? el.attachShadow(opts) : caches.shadows.get(el) ?? caches.shadow(el, opts), children);
}

exports.shadow = shadow;

function frag(children) {
  return defineChildren(caches.fragment.cloneNode(true), children);
}

exports.frag = frag;
exports.html = element(global_1.document, "HTML"
/* NS.HTML */
);
exports.svg = element(global_1.document, "SVG"
/* NS.SVG */
);

function text(source) {
  return global_1.document.createTextNode(source);
}

exports.text = text;

function element(context, ns) {
  return (tag, attrs, children) => {
    const el = elem(context, ns, tag);
    return !attrs || isChildren(attrs) ? defineChildren(el, attrs ?? children) : defineChildren(defineAttrs(el, attrs), children);
  };
}

exports.element = element;

function elem(context, ns, tag) {
  if (!('createElement' in context)) throw new Error(`TypedDOM: Scoped custom elements are not supported on this browser.`);

  switch (ns) {
    case "HTML"
    /* NS.HTML */
    :
      return context.createElement(tag);

    case "SVG"
    /* NS.SVG */
    :
      return context.createElementNS('http://www.w3.org/2000/svg', tag);

    case "MathML"
    /* NS.MathML */
    :
      return context.createElementNS('http://www.w3.org/1998/Math/MathML', tag);
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
  for (const name in attrs) {
    if (!(0, alias_1.hasOwnProperty)(attrs, name)) continue;
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
              el[prop] ?? global_1.Object.defineProperty(el, prop, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: prop in el && !(0, alias_1.hasOwnProperty)(el, prop) ? ev => ev.returnValue : ''
              });
          }
        }

        continue;

      case 'function':
        if (name.length < 3) throw new Error(`TypedDOM: Attribute names for event listeners must have an event name but got "${name}".`);
        const names = name.split(/\s+/);

        for (const name of names) {
          if (!name.startsWith('on')) throw new Error(`TypedDOM: Attribute names for event listeners must start with "on" but got "${name}".`);
          const type = name.slice(2).toLowerCase();
          el.addEventListener(type, value, {
            passive: ['wheel', 'mousewheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(type)
          });

          switch (type) {
            case 'mutate':
            case 'connect':
            case 'disconnect':
              const prop = `on${type}`;
              el[prop] ?? global_1.Object.defineProperty(el, prop, {
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
  if (children === void 0) return node;

  if (typeof children === 'string') {
    node.textContent = children;
  } else if ((0, alias_1.isArray)(children) && !node.firstChild) {
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
  return !!value?.[global_1.Symbol.iterator];
}

exports.isChildren = isChildren;

function append(node, children) {
  if (children === void 0) return node;

  if (typeof children === 'string') {
    node.append(children);
  } else {
    for (const child of children) {
      typeof child === 'object' ? node.appendChild(child) : node.append(child);
    }
  }

  return node;
}

exports.append = append;

function prepend(node, children) {
  if (children === void 0) return node;

  if (typeof children === 'string') {
    node.prepend(children);
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

  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    if (node === '') continue;

    if (typeof node === 'string') {
      appendable ? acc[acc.length - 1] += node : acc.push(node);
      appendable = true;
    } else {
      acc.push(node);
      appendable = false;
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
/******/ 	function __nested_webpack_require_11730__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_11730__);
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
/******/ 	var __webpack_exports__ = __nested_webpack_require_11730__(521);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 1051:
/***/ (function(module) {

/*! typed-dom v0.0.310 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 406:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ObjectSetPrototypeOf = exports.ObjectGetPrototypeOf = exports.ObjectCreate = exports.ObjectAssign = exports.toString = exports.isEnumerable = exports.isPrototypeOf = exports.hasOwnProperty = exports.isArray = exports.sqrt = exports.log = exports.tan = exports.cos = exports.sign = exports.round = exports.random = exports.min = exports.max = exports.floor = exports.ceil = exports.abs = exports.parseInt = exports.parseFloat = exports.isSafeInteger = exports.isNaN = exports.isInteger = exports.isFinite = exports[NaN] = void 0;
exports[NaN] = Number.NaN, exports.isFinite = Number.isFinite, exports.isInteger = Number.isInteger, exports.isNaN = Number.isNaN, exports.isSafeInteger = Number.isSafeInteger, exports.parseFloat = Number.parseFloat, exports.parseInt = Number.parseInt;
exports.abs = Math.abs, exports.ceil = Math.ceil, exports.floor = Math.floor, exports.max = Math.max, exports.min = Math.min, exports.random = Math.random, exports.round = Math.round, exports.sign = Math.sign, exports.cos = Math.cos, exports.tan = Math.tan, exports.log = Math.log, exports.sqrt = Math.sqrt;
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

/***/ 288:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.noop = exports.fix = exports.id = exports.clear = exports.singleton = void 0;

function singleton(f) {
  let result;
  return function (...as) {
    if (result) return result[0];
    result = [f.call(this, ...as)];
    return result[0];
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

exports.fix = fix; // @ts-ignore

function noop() {}

exports.noop = noop;

/***/ }),

/***/ 128:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_3238__) => {



__nested_webpack_require_3238__(921);

const global = void 0 || typeof globalThis !== 'undefined' && globalThis // @ts-ignore
|| typeof self !== 'undefined' && self || Function('return this')();
global.global = global;
module.exports = global;

/***/ }),

/***/ 921:
/***/ (() => {

 // @ts-ignore

var globalThis; // @ts-ignore

var global = (/* unused pure expression or super */ null && (0));

/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_3725__) => {



var _a, _b;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.never = exports.isPromiseLike = exports.Internal = exports.AtomicPromise = exports.internal = void 0;

const global_1 = __nested_webpack_require_3725__(128);

const alias_1 = __nested_webpack_require_3725__(406);

const function_1 = __nested_webpack_require_3725__(288);

exports.internal = Symbol.for('spica/promise::internal');

class AtomicPromise {
  constructor(executor) {
    this[_a] = 'Promise';
    this[_b] = new Internal();

    try {
      executor(value => void this[exports.internal].resolve(value), reason => void this[exports.internal].reject(reason));
    } catch (reason) {
      this[exports.internal].reject(reason);
    }
  }

  static all(vs) {
    return new AtomicPromise((resolve, reject) => {
      const values = (0, alias_1.isArray)(vs) ? vs : [...vs];
      const results = (0, global_1.Array)(values.length);
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
            case 2
            /* State.fulfilled */
            :
              results[i] = status.value;
              ++count;
              continue;

            case 3
            /* State.rejected */
            :
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
            case 2
            /* State.fulfilled */
            :
              return resolve(status.value);

            case 3
            /* State.rejected */
            :
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
          const {
            status
          } = value[exports.internal];

          switch (status.state) {
            case 2
            /* State.fulfilled */
            :
              results[i] = {
                status: 'fulfilled',
                value: status.value
              };
              ++count;
              continue;

            case 3
            /* State.rejected */
            :
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
      const reasons = (0, global_1.Array)(values.length);
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
            case 2
            /* State.fulfilled */
            :
              return resolve(status.value);

            case 3
            /* State.rejected */
            :
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
    return new AtomicPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new AtomicPromise((_, reject) => reject(reason));
  }

  then(onfulfilled, onrejected) {
    return new AtomicPromise((resolve, reject) => this[exports.internal].then(resolve, reject, onfulfilled, onrejected));
  }

  catch(onrejected) {
    return this.then(void 0, onrejected);
  }

  finally(onfinally) {
    return this.then(onfinally, onfinally).then(() => this);
  }

}

exports.AtomicPromise = AtomicPromise;
_a = Symbol.toStringTag, _b = exports.internal;

class Internal {
  constructor() {
    this.status = {
      state: 0
      /* State.pending */

    };
    this.fulfillReactions = [];
    this.rejectReactions = [];
  }

  isPending() {
    return this.status.state === 0
    /* State.pending */
    ;
  }

  resolve(value) {
    if (this.status.state !== 0
    /* State.pending */
    ) return;

    if (!isPromiseLike(value)) {
      this.status = {
        state: 2
        /* State.fulfilled */
        ,
        value: value
      };
      return this.resume();
    }

    if (isAtomicPromiseLike(value)) {
      const core = value[exports.internal];

      switch (core.status.state) {
        case 2
        /* State.fulfilled */
        :
        case 3
        /* State.rejected */
        :
          this.status = core.status;
          return this.resume();

        default:
          return core.then(() => (this.status = core.status, this.resume()), () => (this.status = core.status, this.resume()));
      }
    }

    this.status = {
      state: 1
      /* State.resolved */
      ,
      promise: value
    };
    return void value.then(value => {
      this.status = {
        state: 2
        /* State.fulfilled */
        ,
        value
      };
      this.resume();
    }, reason => {
      this.status = {
        state: 3
        /* State.rejected */
        ,
        reason
      };
      this.resume();
    });
  }

  reject(reason) {
    if (this.status.state !== 0
    /* State.pending */
    ) return;
    this.status = {
      state: 3
      /* State.rejected */
      ,
      reason
    };
    return this.resume();
  }

  then(resolve, reject, onfulfilled, onrejected) {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;

    switch (status.state) {
      case 2
      /* State.fulfilled */
      :
        if (fulfillReactions.length !== 0) break;
        return call(resolve, reject, resolve, onfulfilled, status.value);

      case 3
      /* State.rejected */
      :
        if (rejectReactions.length !== 0) break;
        return call(resolve, reject, reject, onrejected, status.reason);
    }

    fulfillReactions.push([resolve, reject, resolve, onfulfilled]);
    rejectReactions.push([resolve, reject, reject, onrejected]);
  }

  resume() {
    const {
      status,
      fulfillReactions,
      rejectReactions
    } = this;

    switch (status.state) {
      case 0
      /* State.pending */
      :
      case 1
      /* State.resolved */
      :
        return;

      case 2
      /* State.fulfilled */
      :
        if (rejectReactions.length !== 0) {
          this.rejectReactions = [];
        }

        if (fulfillReactions.length === 0) return;
        react(fulfillReactions, status.value);
        this.fulfillReactions = [];
        return;

      case 3
      /* State.rejected */
      :
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
    const reaction = reactions[i];
    call(reaction[0], reaction[1], reaction[2], reaction[3], param);
  }
}

function call(resolve, reject, cont, callback, param) {
  if (!callback) return void cont(param);

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

/***/ 251:
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_14135__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bind = exports.delegate = exports.once = exports.listen = exports.currentTarget = void 0;

const global_1 = __nested_webpack_require_14135__(128);

const alias_1 = __nested_webpack_require_14135__(406);

const promise_1 = __nested_webpack_require_14135__(879);

const function_1 = __nested_webpack_require_14135__(288);

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
          return delegate(target, selector, type, listener, { ...(typeof option === 'boolean' ? {
              capture: option
            } : option),
            once: true
          });

        case 'object':
          option = { ...listener,
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
      return bind(target, selector, type, { ...(typeof listener === 'boolean' ? {
          capture: listener
        } : listener),
        once: true
      });

    case 'object':
      option = { ...type,
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
  }, { ...(typeof option === 'boolean' ? {
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
      target[prop] ?? global_1.Object.defineProperty(target, prop, {
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
/******/ 	function __nested_webpack_require_17252__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_17252__);
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
/******/ 	var __webpack_exports__ = __nested_webpack_require_17252__(251);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 6120:
/***/ (function(module) {

/*! typed-dom v0.0.310 https://github.com/falsandtru/typed-dom | (c) 2016, falsandtru | (Apache-2.0 AND MPL-2.0) License */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;


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

/******/ 	return __webpack_exports__;
/******/ })()
;
});

/***/ }),

/***/ 8442:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 8442;
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
/******/ 	var __webpack_exports__ = __webpack_require__(8767);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});