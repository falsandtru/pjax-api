/*! localsocket v0.5.2 https://github.com/falsandtru/localsocket | (c) 2016, falsandtru | MIT License */
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
            var api_1 = require('./layer/interface/api');
            exports.default = api_1.socket;
            exports.socket = api_1.socket;
            exports.port = api_1.port;
            exports.status = api_1.status;
        },
        { './layer/interface/api': 31 }
    ],
    5: [
        function (require, module, exports) {
            'use strict';
            var api_1 = require('../domain/indexeddb/api');
            var api_2 = require('../domain/webstorage/api');
            var api_3 = require('../domain/indexeddb/api');
            var api_4 = require('../domain/webstorage/api');
            var api_5 = require('../domain/webstorage/api');
            exports.status = api_5.supportWebStorage;
            function socket(name, config) {
                var schema = config.schema, _a = config.destroy, destroy = _a === void 0 ? function () {
                        return true;
                    } : _a, _b = config.expiry, expiry = _b === void 0 ? Infinity : _b;
                return new api_1.Socket(name, schema, destroy, expiry);
            }
            exports.socket = socket;
            function port(name, config) {
                var schema = config.schema;
                return new api_2.Port(name, api_2.localStorage, schema);
            }
            exports.port = port;
            var events;
            (function (events) {
                events.indexedDB = api_3.event;
                events.localStorage = api_4.events.localStorage;
                events.sessionStorage = api_4.events.sessionStorage;
            }(events = exports.events || (exports.events = {})));
        },
        {
            '../domain/indexeddb/api': 13,
            '../domain/webstorage/api': 20
        }
    ],
    6: [
        function (require, module, exports) {
            'use strict';
            function IdNumber(id) {
                return +id;
            }
            exports.IdNumber = IdNumber;
        },
        {}
    ],
    7: [
        function (require, module, exports) {
            'use strict';
            var RegValidValueNameFormat = /^[A-z][0-9A-z_]*$/;
            var RegInvalidValueNameFormat = /^[0-9A-Z_]+$/;
            function isValidName(prop) {
                return prop.length > 0 && prop[0] !== '_' && prop[prop.length - 1] !== '_' && !RegInvalidValueNameFormat.test(prop) && RegValidValueNameFormat.test(prop);
            }
            exports.isValidName = isValidName;
            function isValidValue(dao) {
                return function (prop) {
                    switch (typeof dao[prop]) {
                    case 'undefined':
                    case 'boolean':
                    case 'number':
                    case 'string':
                    case 'object':
                        return true;
                    default:
                        return false;
                    }
                };
            }
            exports.isValidValue = isValidValue;
        },
        {}
    ],
    8: [
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
            var spica_1 = require('spica');
            var EventRecordFields;
            (function (EventRecordFields) {
                EventRecordFields.id = 'id';
                EventRecordFields.key = 'key';
                EventRecordFields.type = 'type';
                EventRecordFields.attr = 'attr';
                EventRecordFields.value = 'value';
                EventRecordFields.date = 'date';
                EventRecordFields.surrogateKeyDateField = 'key+date';
            }(EventRecordFields = exports.EventRecordFields || (exports.EventRecordFields = {})));
            var EventRecord = function () {
                function EventRecord(key, value, date, type) {
                    if (typeof this.id === 'number' && this.id > 0 === false || this.id !== void 0)
                        throw new TypeError('LocalSocket: EventRecord: Invalid event id: ' + this.id);
                    this.type = type;
                    if (typeof this.type !== 'string')
                        throw new TypeError('LocalSocket: EventRecord: Invalid event type: ' + this.type);
                    this.key = key;
                    if (typeof this.key !== 'string')
                        throw new TypeError('LocalSocket: EventRecord: Invalid event key: ' + this.key);
                    this.value = value;
                    if (typeof this.value !== 'object' || !this.value)
                        throw new TypeError('LocalSocket: EventRecord: Invalid event value: ' + this.value);
                    this.date = date;
                    if (typeof this.date !== 'number' || this.date >= 0 === false)
                        throw new TypeError('LocalSocket: EventRecord: Invalid event date: ' + this.date);
                    this.attr = this.type === exports.EventType.put ? Object.keys(value).reduce(function (r, p) {
                        return p.length > 0 && p[0] !== '_' && p[p.length - 1] !== '_' ? p : r;
                    }, '') : '';
                    if (typeof this.attr !== 'string')
                        throw new TypeError('LocalSocket: EventRecord: Invalid event attr: ' + this.key);
                    if (this.type === exports.EventType.put && this.attr.length === 0)
                        throw new TypeError('LocalSocket: EventRecord: Invalid event attr with ' + this.type + ': ' + this.attr);
                    if (this.type !== exports.EventType.put && this.attr.length !== 0)
                        throw new TypeError('LocalSocket: EventRecord: Invalid event attr with ' + this.type + ': ' + this.attr);
                    switch (type) {
                    case exports.EventType.put: {
                            this.value = value = spica_1.clone(new EventValue(), (_a = {}, _a[this.attr] = value[this.attr], _a));
                            void Object.freeze(this.value);
                            return;
                        }
                    case exports.EventType.snapshot: {
                            this.value = value = spica_1.clone(new EventValue(), value);
                            void Object.freeze(this.value);
                            return;
                        }
                    case exports.EventType.delete: {
                            this.value = value = new EventValue();
                            void Object.freeze(this.value);
                            return;
                        }
                    default:
                        throw new TypeError('LocalSocket: Invalid event type: ' + type);
                    }
                    var _a;
                }
                return EventRecord;
            }();
            var UnsavedEventRecord = function (_super) {
                __extends(UnsavedEventRecord, _super);
                function UnsavedEventRecord(key, value, type, date) {
                    if (type === void 0) {
                        type = exports.EventType.put;
                    }
                    if (date === void 0) {
                        date = Date.now();
                    }
                    var _this = _super.call(this, key, value, date, type) || this;
                    _this.EVENT_RECORD;
                    if (_this.id !== void 0 || 'id' in _this)
                        throw new TypeError('LocalSocket: UnsavedEventRecord: Invalid event id: ' + _this.id);
                    void Object.freeze(_this);
                    return _this;
                }
                return UnsavedEventRecord;
            }(EventRecord);
            exports.UnsavedEventRecord = UnsavedEventRecord;
            var SavedEventRecord = function (_super) {
                __extends(SavedEventRecord, _super);
                function SavedEventRecord(id, key, value, type, date) {
                    var _this = _super.call(this, key, value, date, type) || this;
                    _this.id = id;
                    _this.EVENT_RECORD;
                    if (_this.id > 0 === false)
                        throw new TypeError('LocalSocket: SavedEventRecord: Invalid event id: ' + _this.id);
                    void Object.freeze(_this);
                    return _this;
                }
                return SavedEventRecord;
            }(EventRecord);
            exports.SavedEventRecord = SavedEventRecord;
            exports.EventType = {
                put: 'put',
                delete: 'delete',
                snapshot: 'snapshot'
            };
            var EventValue = function () {
                function EventValue() {
                }
                return EventValue;
            }();
            exports.EventValue = EventValue;
        },
        { 'spica': undefined }
    ],
    9: [
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
            var spica_1 = require('spica');
            var api_1 = require('../../infrastructure/indexeddb/api');
            var types_1 = require('../constraint/types');
            var event_1 = require('../schema/event');
            exports.UnsavedEventRecord = event_1.UnsavedEventRecord;
            exports.SavedEventRecord = event_1.SavedEventRecord;
            var Schema = require('../schema/event');
            var noop_1 = require('../../../lib/noop');
            var EventStore = function () {
                function EventStore(database, name) {
                    var _this = this;
                    this.database = database;
                    this.name = name;
                    this.memory = new spica_1.Observable();
                    this.events = {
                        load: new spica_1.Observable(),
                        save: new spica_1.Observable(),
                        loss: new spica_1.Observable()
                    };
                    this.events_ = {
                        update: new spica_1.Observable(),
                        access: new spica_1.Observable()
                    };
                    this.syncState = new Map();
                    this.syncWaits = new spica_1.Observable();
                    this.snapshotCycle = 9;
                    var states = new (function () {
                        function class_1() {
                            this.ids = new Map();
                            this.dates = new Map();
                        }
                        class_1.prototype.update = function (event) {
                            void this.ids.set(event.key, types_1.IdNumber(Math.max(event.id || 0, this.ids.get(event.key) || 0)));
                            void this.dates.set(event.key, Math.max(event.date, this.dates.get(event.key) || 0));
                        };
                        return class_1;
                    }())();
                    void this.events_.update.monitor([], function (event) {
                        if (event instanceof event_1.UnsavedEventRecord)
                            return;
                        if (event.date <= states.dates.get(event.key) && event.id <= states.ids.get(event.key))
                            return;
                        void _this.events.load.emit([
                            event.key,
                            event.attr,
                            event.type
                        ], new EventStore.Event(event.type, event.id, event.key, event.attr, event.date));
                    });
                    void this.events_.update.monitor([], function (event) {
                        void states.update(new EventStore.Event(event.type, event.id || types_1.IdNumber(0), event.key, event.attr, event.date));
                    });
                    void this.events.load.monitor([], function (event) {
                        return void states.update(event);
                    });
                    void this.events.save.monitor([], function (event) {
                        return void states.update(event);
                    });
                    void this.events.save.monitor([], function (event) {
                        switch (event.type) {
                        case EventStore.EventType.delete:
                        case EventStore.EventType.snapshot:
                            void _this.clean(event.key);
                        }
                    });
                }
                EventStore.configure = function (name) {
                    return {
                        make: function (db) {
                            var store = db.objectStoreNames.contains(name) ? db.transaction(name).objectStore(name) : db.createObjectStore(name, {
                                keyPath: event_1.EventRecordFields.id,
                                autoIncrement: true
                            });
                            if (!store.indexNames.contains(event_1.EventRecordFields.id)) {
                                void store.createIndex(event_1.EventRecordFields.id, event_1.EventRecordFields.id, { unique: true });
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.key)) {
                                void store.createIndex(event_1.EventRecordFields.key, event_1.EventRecordFields.key);
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.type)) {
                                void store.createIndex(event_1.EventRecordFields.type, event_1.EventRecordFields.type);
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.attr)) {
                                void store.createIndex(event_1.EventRecordFields.attr, event_1.EventRecordFields.attr);
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.value)) {
                                void store.createIndex(event_1.EventRecordFields.value, event_1.EventRecordFields.value);
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.date)) {
                                void store.createIndex(event_1.EventRecordFields.date, event_1.EventRecordFields.date);
                            }
                            if (!store.indexNames.contains(event_1.EventRecordFields.surrogateKeyDateField)) {
                                void store.createIndex(event_1.EventRecordFields.surrogateKeyDateField, [
                                    event_1.EventRecordFields.key,
                                    event_1.EventRecordFields.date
                                ]);
                            }
                            return true;
                        },
                        verify: function (db) {
                            return db.objectStoreNames.contains(name) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.id) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.key) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.type) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.attr) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.value) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.date) && db.transaction(name).objectStore(name).indexNames.contains(event_1.EventRecordFields.surrogateKeyDateField);
                        },
                        destroy: function () {
                            return true;
                        }
                    };
                };
                EventStore.prototype.update = function (key, attr, id) {
                    return typeof id === 'string' && typeof attr === 'string' ? void this.memory.emit([
                        key,
                        attr,
                        id
                    ]) : typeof attr === 'string' ? void this.memory.emit([
                        key,
                        attr
                    ]) : void this.memory.emit([key]);
                };
                EventStore.prototype.sync = function (keys, cb, timeout) {
                    var _this = this;
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    if (timeout === void 0) {
                        timeout = 0;
                    }
                    return void keys.map(function (key) {
                        switch (_this.syncState.get(key)) {
                        case true:
                            return new Promise(function (resolve) {
                                return void resolve([
                                    key,
                                    null
                                ]);
                            });
                        case false:
                            return cb === noop_1.noop ? new Promise(function (resolve) {
                                return void resolve([
                                    key,
                                    null
                                ]);
                            }) : new Promise(function (resolve) {
                                return void (timeout > 0 ? void (void _this.get(key), void setTimeout(function () {
                                    return resolve([
                                        key,
                                        new Error()
                                    ]);
                                })) : void 0, void _this.syncWaits.once([key], function (err) {
                                    return void resolve([
                                        key,
                                        err
                                    ]);
                                }));
                            });
                        default: {
                                void _this.fetch(key);
                                return cb === noop_1.noop ? new Promise(function (resolve) {
                                    return void resolve([
                                        key,
                                        null
                                    ]);
                                }) : new Promise(function (resolve) {
                                    return void (timeout > 0 ? void (void _this.get(key), void setTimeout(function () {
                                        return resolve([
                                            key,
                                            new Error()
                                        ]);
                                    })) : void 0, void _this.syncWaits.once([key], function (err) {
                                        return void resolve([
                                            key,
                                            err
                                        ]);
                                    }));
                                });
                            }
                        }
                    }).reduce(function (ps, p) {
                        return ps.then(function (es) {
                            return p.then(function (e) {
                                return es.concat([e]);
                            });
                        });
                    }, new Promise(function (resolve) {
                        return void resolve([]);
                    })).then(function (es) {
                        return void cb(es.filter(function (e) {
                            return !!e[1];
                        }));
                    });
                };
                EventStore.prototype.fetch = function (key) {
                    var _this = this;
                    var savedEvents = [];
                    void this.syncState.set(key, this.syncState.get(key) === true);
                    return void this.cursor(key, event_1.EventRecordFields.key, api_1.IDBCursorDirection.prev, api_1.IDBTransactionMode.readonly, function (cursor, err) {
                        if (err)
                            return void _this.syncWaits.emit([key], err);
                        if (!cursor || cursor.value.date < _this.meta(key).date) {
                            void Array.from(savedEvents.reduceRight(function (acc, e) {
                                return acc.length === 0 || acc[0].type === EventStore.EventType.put ? spica_1.concat(acc, [e]) : acc;
                            }, []).reduceRight(function (dict, e) {
                                return dict.set(e.attr, e);
                            }, new Map()).values()).sort(function (a, b) {
                                return a.date - b.date || a.id - b.id;
                            }).forEach(function (e) {
                                void _this.memory.on([
                                    e.key,
                                    e.attr,
                                    spica_1.sqid(e.id)
                                ], function () {
                                    return e;
                                });
                                void _this.memory.once([e.key], function () {
                                    throw void _this.events_.update.emit([
                                        e.key,
                                        e.attr,
                                        spica_1.sqid(e.id)
                                    ], e);
                                });
                            });
                            void _this.syncState.set(key, true);
                            void _this.syncWaits.emit([key], null);
                            void _this.update(key);
                            if (savedEvents.length >= _this.snapshotCycle) {
                                void _this.snapshot(key);
                            }
                            return;
                        } else {
                            var event_2 = cursor.value;
                            if (_this.memory.refs([
                                    event_2.key,
                                    event_2.attr,
                                    spica_1.sqid(event_2.id)
                                ]).length > 0)
                                return;
                            void savedEvents.unshift(new event_1.SavedEventRecord(event_2.id, event_2.key, event_2.value, event_2.type, event_2.date));
                            if (event_2.type !== EventStore.EventType.put)
                                return;
                            return void cursor.continue();
                        }
                    });
                };
                EventStore.prototype.keys = function () {
                    return this.memory.reflect([]).reduce(function (keys, e) {
                        return keys.length === 0 || keys[keys.length - 1] !== e.key ? spica_1.concat(keys, [e.key]) : keys;
                    }, []).sort();
                };
                EventStore.prototype.meta = function (key) {
                    var events = this.memory.reflect([key]);
                    return Object.freeze({
                        key: key,
                        id: events.reduce(function (id, e) {
                            return e.id > id ? e.id : id;
                        }, 0),
                        date: events.reduce(function (date, e) {
                            return e.date > date ? e.date : date;
                        }, 0)
                    });
                };
                EventStore.prototype.has = function (key) {
                    return compose(key, this.memory.reflect([key])).type !== EventStore.EventType.delete;
                };
                EventStore.prototype.get = function (key) {
                    void this.sync([key]);
                    void this.events_.access.emit([key], new InternalEvent(InternalEventType.query, types_1.IdNumber(0), key, ''));
                    return compose(key, this.memory.reflect([key])).value;
                };
                EventStore.prototype.add = function (event, tx) {
                    var _this = this;
                    void this.events_.access.emit([
                        event.key,
                        event.attr,
                        event.type
                    ], new InternalEvent(event.type, types_1.IdNumber(0), event.key, event.attr));
                    if (!(event instanceof event_1.UnsavedEventRecord))
                        throw new Error('LocalSocket: Cannot add a saved event: ' + JSON.stringify(event));
                    void this.sync([event.key]);
                    switch (event.type) {
                    case EventStore.EventType.put: {
                            void this.memory.off([
                                event.key,
                                event.attr,
                                spica_1.sqid(0)
                            ]);
                            break;
                        }
                    case EventStore.EventType.delete:
                    case EventStore.EventType.snapshot: {
                            void this.memory.refs([event.key]).filter(function (_a) {
                                var _b = _a[0], id = _b[2];
                                return id === spica_1.sqid(0);
                            }).reduce(function (m, _a) {
                                var _b = _a[0], key = _b[0], attr = _b[1], id = _b[2];
                                return m.set(key, [
                                    key,
                                    attr,
                                    id
                                ]);
                            }, new Map()).forEach(function (ns) {
                                return void _this.memory.off(ns);
                            });
                            break;
                        }
                    }
                    var terminate = this.memory.on([
                        event.key,
                        event.attr,
                        spica_1.sqid(0),
                        spica_1.sqid()
                    ], function () {
                        return event;
                    });
                    void this.memory.once([
                        event.key,
                        event.attr,
                        spica_1.sqid(0)
                    ], function () {
                        throw void _this.events_.update.emit([
                            event.key,
                            event.attr,
                            spica_1.sqid(0)
                        ], event);
                    });
                    void this.update(event.key, event.attr, spica_1.sqid(0));
                    return void new Promise(function (resolve, reject) {
                        var cont = function (tx) {
                            var active = function () {
                                return _this.memory.refs([
                                    event.key,
                                    event.attr,
                                    spica_1.sqid(0)
                                ]).some(function (_a) {
                                    var s = _a[1];
                                    return s(void 0) === event;
                                });
                            };
                            if (!active())
                                return void resolve();
                            var req = tx.objectStore(_this.name).add(Object.assign({}, event));
                            tx.oncomplete = function () {
                                void terminate();
                                var savedEvent = new event_1.SavedEventRecord(types_1.IdNumber(req.result), event.key, event.value, event.type, event.date);
                                void _this.memory.on([
                                    savedEvent.key,
                                    savedEvent.attr,
                                    spica_1.sqid(savedEvent.id)
                                ], function () {
                                    return savedEvent;
                                });
                                void _this.memory.once([
                                    savedEvent.key,
                                    savedEvent.attr,
                                    spica_1.sqid(savedEvent.id)
                                ], function () {
                                    throw void _this.events_.update.emit([
                                        savedEvent.key,
                                        savedEvent.attr,
                                        spica_1.sqid(savedEvent.id)
                                    ], savedEvent);
                                });
                                void _this.events.save.emit([
                                    savedEvent.key,
                                    savedEvent.attr,
                                    savedEvent.type
                                ], new EventStore.Event(savedEvent.type, savedEvent.id, savedEvent.key, savedEvent.attr, event.date));
                                void _this.update(savedEvent.key, savedEvent.attr, spica_1.sqid(savedEvent.id));
                                void resolve();
                                if (_this.memory.refs([savedEvent.key]).filter(function (_a) {
                                        var sub = _a[1];
                                        return sub(void 0) instanceof event_1.SavedEventRecord;
                                    }).length >= _this.snapshotCycle) {
                                    void _this.snapshot(savedEvent.key);
                                }
                            };
                            tx.onerror = tx.onabort = function () {
                                return active() ? void reject() : void resolve();
                            };
                        };
                        if (tx)
                            return void cont(tx);
                        var cancelable = new spica_1.Cancelable();
                        void cancelable.listeners.add(reject);
                        void setTimeout(function () {
                            return void setTimeout(cancelable.cancel, 1000), void api_1.listen(_this.database)(function (db) {
                                return void cancelable.listeners.clear(), void cancelable.maybe(db).fmap(function (db) {
                                    return void cont(db.transaction(_this.name, api_1.IDBTransactionMode.readwrite));
                                }).extract(function () {
                                    return void 0;
                                });
                            });
                        });
                    }).catch(function () {
                        return void _this.events.loss.emit([
                            event.key,
                            event.attr,
                            event.type
                        ], new EventStore.Event(event.type, types_1.IdNumber(0), event.key, event.attr, event.date));
                    });
                };
                EventStore.prototype.delete = function (key) {
                    return void this.add(new event_1.UnsavedEventRecord(key, new EventStore.Value(), EventStore.EventType.delete));
                };
                EventStore.prototype.snapshot = function (key) {
                    var _this = this;
                    return void api_1.listen(this.database)(function (db) {
                        if (!_this.syncState.get(key))
                            return;
                        var tx = db.transaction(_this.name, api_1.IDBTransactionMode.readwrite);
                        var store = tx.objectStore(_this.name);
                        var req = store.index(event_1.EventRecordFields.key).openCursor(key, api_1.IDBCursorDirection.prev);
                        var savedEvents = [];
                        req.onsuccess = function () {
                            var cursor = req.result;
                            if (cursor) {
                                var event_3 = cursor.value;
                                void savedEvents.unshift(new event_1.SavedEventRecord(event_3.id, event_3.key, event_3.value, event_3.type, event_3.date));
                            }
                            if (!cursor) {
                                if (savedEvents.length === 0)
                                    return;
                                var composedEvent = compose(key, savedEvents);
                                if (composedEvent instanceof event_1.SavedEventRecord)
                                    return;
                                switch (composedEvent.type) {
                                case EventStore.EventType.snapshot:
                                    return void _this.add(new event_1.UnsavedEventRecord(composedEvent.key, composedEvent.value, composedEvent.type, savedEvents.reduce(function (date, e) {
                                        return e.date > date ? e.date : date;
                                    }, 0)), tx);
                                case EventStore.EventType.delete:
                                    return;
                                }
                                throw new TypeError('LocalSocket: Invalid event type: ' + composedEvent.type);
                            } else {
                                return void cursor.continue();
                            }
                        };
                    });
                };
                EventStore.prototype.clean = function (key) {
                    var _this = this;
                    var removedEvents = [];
                    var cleanState = new Map();
                    return void this.cursor(key ? api_1.IDBKeyRange.bound(key, key) : api_1.IDBKeyRange.upperBound(Infinity), key ? event_1.EventRecordFields.key : event_1.EventRecordFields.date, api_1.IDBCursorDirection.prev, api_1.IDBTransactionMode.readwrite, function (cursor) {
                        if (!cursor) {
                            return void removedEvents.reduce(function (_, event) {
                                return void _this.memory.off([
                                    event.key,
                                    event.attr,
                                    spica_1.sqid(event.id)
                                ]);
                            }, void 0);
                        } else {
                            var event_4 = cursor.value;
                            switch (event_4.type) {
                            case EventStore.EventType.put: {
                                    void cleanState.set(event_4.key, cleanState.get(event_4.key) || false);
                                    break;
                                }
                            case EventStore.EventType.snapshot: {
                                    if (!cleanState.get(event_4.key)) {
                                        void cleanState.set(event_4.key, true);
                                        void cursor.continue();
                                        return;
                                    }
                                    break;
                                }
                            case EventStore.EventType.delete: {
                                    void cleanState.set(event_4.key, true);
                                    break;
                                }
                            }
                            if (cleanState.get(event_4.key)) {
                                void cursor.delete();
                                void removedEvents.unshift(event_4);
                            }
                            return void cursor.continue();
                        }
                    });
                };
                EventStore.prototype.cursor = function (query, index, direction, mode, cb) {
                    var _this = this;
                    return void api_1.listen(this.database)(function (db) {
                        var tx = db.transaction(_this.name, mode);
                        var req = index ? tx.objectStore(_this.name).index(index).openCursor(query, direction) : tx.objectStore(_this.name).openCursor(query, direction);
                        req.onsuccess = function () {
                            return req.result && cb(req.result, req.error);
                        };
                        tx.oncomplete = function () {
                            return void cb(null, tx.error);
                        };
                        ;
                        tx.onerror = tx.onabort = function () {
                            return void cb(null, tx.error);
                        };
                    });
                };
                return EventStore;
            }();
            EventStore.fields = Object.freeze(event_1.EventRecordFields);
            exports.EventStore = EventStore;
            (function (EventStore) {
                EventStore.EventType = Schema.EventType;
                var Event = function () {
                    function Event(type, id, key, attr, date) {
                        this.type = type;
                        this.id = id;
                        this.key = key;
                        this.attr = attr;
                        this.date = date;
                        void Object.freeze(this);
                    }
                    return Event;
                }();
                EventStore.Event = Event;
                var Record = function (_super) {
                    __extends(Record, _super);
                    function Record() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Record;
                }(event_1.UnsavedEventRecord);
                EventStore.Record = Record;
                var Value = function (_super) {
                    __extends(Value, _super);
                    function Value() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Value;
                }(Schema.EventValue);
                EventStore.Value = Value;
            }(EventStore = exports.EventStore || (exports.EventStore = {})));
            exports.EventStore = EventStore;
            var InternalEventType = {
                put: 'put',
                delete: 'delete',
                snapshot: 'snapshot',
                query: 'query'
            };
            var InternalEvent = function () {
                function InternalEvent(type, id, key, attr) {
                    this.type = type;
                    this.id = id;
                    this.key = key;
                    this.attr = attr;
                    void Object.freeze(this);
                }
                return InternalEvent;
            }();
            function compose(key, events) {
                return group(events).map(function (events) {
                    return events.reduceRight(compose, new event_1.UnsavedEventRecord(key, new EventStore.Value(), EventStore.EventType.delete, 0));
                }).reduce(function (e) {
                    return e;
                });
                function group(events) {
                    return events.map(function (e, i) {
                        return [
                            e,
                            i
                        ];
                    }).sort(function (_a, _b) {
                        var a = _a[0], ai = _a[1];
                        var b = _b[0], bi = _b[1];
                        return indexedDB.cmp(a.key, b.key) || b.date - a.date || b.id - a.id || bi - ai;
                    }).reduceRight(function (_a, _b) {
                        var head = _a[0], tail = _a.slice(1);
                        var event = _b[0];
                        var prev = head[0];
                        if (!prev)
                            return [[event]];
                        return prev.key === event.key ? spica_1.concat([spica_1.concat([event], head)], tail) : spica_1.concat([[event]], spica_1.concat([head], tail));
                    }, [[]]);
                }
                function compose(target, source) {
                    switch (source.type) {
                    case EventStore.EventType.put:
                        return source.value[source.attr] !== void 0 ? new event_1.UnsavedEventRecord(source.key, Object.assign(new EventStore.Value(), target.value, source.value), EventStore.EventType.snapshot) : new event_1.UnsavedEventRecord(source.key, Object.keys(target.value).reduce(function (value, prop) {
                            if (prop === source.attr)
                                return value;
                            value[prop] = target[prop];
                            return value;
                        }, new EventStore.Value()), EventStore.EventType.snapshot);
                    case EventStore.EventType.snapshot:
                        return source;
                    case EventStore.EventType.delete:
                        return source;
                    }
                    throw new TypeError('LocalSocket: Invalid event type: ' + source);
                }
            }
            exports.compose = compose;
        },
        {
            '../../../lib/noop': 32,
            '../../infrastructure/indexeddb/api': 24,
            '../constraint/types': 6,
            '../schema/event': 8,
            'spica': undefined
        }
    ],
    10: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var api_1 = require('../../infrastructure/indexeddb/api');
            var noop_1 = require('../../../lib/noop');
            var KeyValueStore = function () {
                function KeyValueStore(database, name, index) {
                    this.database = database;
                    this.name = name;
                    this.index = index;
                    this.cache = new Map();
                    this.events = { access: new spica_1.Observable() };
                    if (typeof index !== 'string')
                        throw new TypeError();
                }
                KeyValueStore.configure = function () {
                    return {
                        make: function () {
                            return true;
                        },
                        verify: function () {
                            return true;
                        },
                        destroy: function () {
                            return true;
                        }
                    };
                };
                KeyValueStore.prototype.get = function (key, cb) {
                    var _this = this;
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    void this.events.access.emit([key], [
                        [key],
                        KeyValueStore.EventType.get
                    ]);
                    void api_1.listen(this.database)(function (db) {
                        var tx = db.transaction(_this.name, api_1.IDBTransactionMode.readonly);
                        var req = _this.index ? tx.objectStore(_this.name).index(_this.index).get(key) : tx.objectStore(_this.name).get(key);
                        var result;
                        req.onsuccess = function () {
                            return result = req.result !== void 0 && req.result !== null ? req.result : _this.cache.get(key);
                        };
                        tx.oncomplete = function () {
                            return cb(result, tx.error);
                        };
                        tx.onerror = tx.onabort = function () {
                            return cb(void 0, tx.error);
                        };
                    });
                    return this.cache.get(key);
                };
                KeyValueStore.prototype.set = function (key, value, cb) {
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    return this.put(value, key, cb);
                };
                KeyValueStore.prototype.put = function (value, key, cb) {
                    var _this = this;
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    void this.cache.set(key, value);
                    void this.events.access.emit([key], [
                        [key],
                        KeyValueStore.EventType.put
                    ]);
                    void api_1.listen(this.database)(function (db) {
                        if (!_this.cache.has(key))
                            return;
                        var tx = db.transaction(_this.name, api_1.IDBTransactionMode.readwrite);
                        _this.index ? tx.objectStore(_this.name).put(_this.cache.get(key)) : tx.objectStore(_this.name).put(_this.cache.get(key), key);
                        tx.oncomplete = tx.onerror = tx.onabort = function () {
                            return void cb(key, tx.error);
                        };
                    });
                    return this.cache.get(key);
                };
                KeyValueStore.prototype.delete = function (key, cb) {
                    var _this = this;
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    void this.cache.delete(key);
                    void this.events.access.emit([key], [
                        [key],
                        KeyValueStore.EventType.delete
                    ]);
                    void api_1.listen(this.database)(function (db) {
                        var tx = db.transaction(_this.name, api_1.IDBTransactionMode.readwrite);
                        void tx.objectStore(_this.name).delete(key);
                        tx.oncomplete = tx.onerror = tx.onabort = function () {
                            return void cb(tx.error);
                        };
                    });
                };
                KeyValueStore.prototype.cursor = function (query, index, direction, mode, cb) {
                    var _this = this;
                    void api_1.listen(this.database)(function (db) {
                        var tx = db.transaction(_this.name, mode);
                        var req = index ? tx.objectStore(_this.name).index(index).openCursor(query, direction) : tx.objectStore(_this.name).openCursor(query, direction);
                        req.onsuccess = function () {
                            return req.result && cb(req.result, req.error);
                        };
                        tx.oncomplete = function () {
                            return void cb(null, tx.error);
                        };
                        ;
                        tx.onerror = tx.onabort = function () {
                            return void cb(null, tx.error);
                        };
                    });
                };
                return KeyValueStore;
            }();
            exports.KeyValueStore = KeyValueStore;
            (function (KeyValueStore) {
                KeyValueStore.EventType = {
                    get: 'get',
                    put: 'put',
                    delete: 'delete'
                };
            }(KeyValueStore = exports.KeyValueStore || (exports.KeyValueStore = {})));
            exports.KeyValueStore = KeyValueStore;
        },
        {
            '../../../lib/noop': 32,
            '../../infrastructure/indexeddb/api': 24,
            'spica': undefined
        }
    ],
    11: [
        function (require, module, exports) {
            'use strict';
            var builder_1 = require('./module/builder');
            exports.SCHEMA = builder_1.SCHEMA;
            exports.build = builder_1.build;
            exports.isValidPropertyName = builder_1.isValidPropertyName;
            exports.isValidPropertyValue = builder_1.isValidPropertyValue;
        },
        { './module/builder': 12 }
    ],
    12: [
        function (require, module, exports) {
            'use strict';
            var values_1 = require('../../../data/constraint/values');
            exports.isValidPropertyName = values_1.isValidName;
            exports.isValidPropertyValue = values_1.isValidValue;
            var noop_1 = require('../../../../lib/noop');
            exports.SCHEMA = {
                META: { NAME: '__meta' },
                ID: { NAME: '__id' },
                KEY: { NAME: '__key' },
                DATE: { NAME: '__date' },
                EVENT: { NAME: '__event' }
            };
            function build(source, factory, update) {
                if (update === void 0) {
                    update = noop_1.noop;
                }
                var dao = factory();
                void Object.keys(exports.SCHEMA).map(function (prop) {
                    return exports.SCHEMA[prop].NAME;
                }).reduce(function (_, prop) {
                    delete dao[prop];
                }, void 0);
                if (typeof source[exports.SCHEMA.KEY.NAME] !== 'string')
                    throw new TypeError('LocalSocket: Invalid key: ' + source[exports.SCHEMA.KEY.NAME]);
                var descmap = Object.assign(Object.keys(dao).filter(values_1.isValidName).filter(values_1.isValidValue(dao)).reduce(function (map, prop) {
                    {
                        var desc = Object.getOwnPropertyDescriptor(dao, prop);
                        if (desc && (desc.get || desc.set))
                            return map;
                    }
                    var iniVal = dao[prop];
                    if (source[prop] === void 0) {
                        source[prop] = iniVal;
                    }
                    map[prop] = {
                        enumerable: true,
                        get: function () {
                            return source[prop] === void 0 ? iniVal : source[prop];
                        },
                        set: function (newVal) {
                            var oldVal = source[prop];
                            if (!values_1.isValidValue(source)(prop))
                                return;
                            source[prop] = newVal === void 0 ? iniVal : newVal;
                            void update(prop, newVal, oldVal);
                        }
                    };
                    return map;
                }, {}), (_a = {}, _a[exports.SCHEMA.META.NAME] = {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return source[exports.SCHEMA.META.NAME];
                    }
                }, _a[exports.SCHEMA.ID.NAME] = {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return source[exports.SCHEMA.ID.NAME];
                    }
                }, _a[exports.SCHEMA.KEY.NAME] = {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return source[exports.SCHEMA.KEY.NAME];
                    }
                }, _a[exports.SCHEMA.DATE.NAME] = {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return source[exports.SCHEMA.DATE.NAME];
                    }
                }, _a[exports.SCHEMA.EVENT.NAME] = {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return source[exports.SCHEMA.EVENT.NAME];
                    }
                }, _a));
                void Object.defineProperties(dao, descmap);
                void Object.seal(dao);
                return dao;
                var _a;
            }
            exports.build = build;
        },
        {
            '../../../../lib/noop': 32,
            '../../../data/constraint/values': 7
        }
    ],
    13: [
        function (require, module, exports) {
            'use strict';
            var socket_1 = require('./service/socket');
            exports.Socket = socket_1.Socket;
            var event_1 = require('./service/event');
            exports.event = event_1.event;
            exports.IDBEventType = event_1.IDBEventType;
        },
        {
            './service/event': 18,
            './service/socket': 19
        }
    ],
    14: [
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
            var spica_1 = require('spica');
            var api_1 = require('../../../infrastructure/indexeddb/api');
            var data_1 = require('./socket/data');
            var access_1 = require('./socket/access');
            var expiry_1 = require('./socket/expiry');
            var noop_1 = require('../../../../lib/noop');
            var cache = new Map();
            var SocketStore = function () {
                function SocketStore(name, destroy, expiry) {
                    var _this = this;
                    this.name = name;
                    this.expiry = expiry;
                    this.events = {
                        load: new spica_1.Observable(),
                        save: new spica_1.Observable(),
                        loss: new spica_1.Observable()
                    };
                    this.expiries = new Map();
                    if (cache.has(name))
                        return cache.get(name);
                    void cache.set(name, this);
                    void api_1.open(name, {
                        make: function (db) {
                            return data_1.DataStore.configure().make(db) && access_1.AccessStore.configure().make(db) && expiry_1.ExpiryStore.configure().make(db);
                        },
                        verify: function (db) {
                            return data_1.DataStore.configure().verify(db) && access_1.AccessStore.configure().verify(db) && expiry_1.ExpiryStore.configure().verify(db);
                        },
                        destroy: function (err, ev) {
                            return data_1.DataStore.configure().destroy(err, ev) && access_1.AccessStore.configure().destroy(err, ev) && expiry_1.ExpiryStore.configure().destroy(err, ev) && destroy(err, ev);
                        }
                    });
                    this.schema = new Schema(this, this.expiries);
                    void api_1.event.on([
                        name,
                        api_1.IDBEventType.destroy
                    ], function () {
                        return void _this.schema.bind();
                    });
                }
                SocketStore.prototype.sync = function (keys, cb, timeout) {
                    if (cb === void 0) {
                        cb = noop_1.noop;
                    }
                    return this.schema.data.sync(keys, cb, timeout);
                };
                SocketStore.prototype.meta = function (key) {
                    return this.schema.data.meta(key);
                };
                SocketStore.prototype.has = function (key) {
                    return this.schema.data.has(key);
                };
                SocketStore.prototype.get = function (key) {
                    return this.schema.data.get(key);
                };
                SocketStore.prototype.add = function (record) {
                    return this.schema.data.add(record);
                };
                SocketStore.prototype.delete = function (key) {
                    return this.schema.data.delete(key);
                };
                SocketStore.prototype.expire = function (key, expiry) {
                    if (expiry === void 0) {
                        expiry = this.expiry;
                    }
                    if (expiry === Infinity)
                        return;
                    return void this.expiries.set(key, expiry);
                };
                SocketStore.prototype.recent = function (limit, cb) {
                    if (cb === void 0) {
                        cb = function () {
                            return void 0;
                        };
                    }
                    var keys = [];
                    return void this.schema.access.cursor(null, access_1.AccessStore.fields.date, api_1.IDBCursorDirection.prevunique, api_1.IDBTransactionMode.readonly, function (cursor, err) {
                        if (!cursor)
                            return void cb(keys, err);
                        if (--limit < 0)
                            return;
                        void keys.push(cursor.primaryKey);
                        void cursor.continue();
                    });
                };
                SocketStore.prototype.close = function () {
                    void cache.delete(this.name);
                    return void api_1.close(this.name);
                };
                SocketStore.prototype.destroy = function () {
                    void api_1.event.off([
                        this.name,
                        api_1.IDBEventType.destroy
                    ]);
                    void cache.delete(this.name);
                    return void api_1.destroy(this.name);
                };
                return SocketStore;
            }();
            exports.SocketStore = SocketStore;
            (function (SocketStore) {
                SocketStore.EventType = data_1.DataStore.EventType;
                var Event = function (_super) {
                    __extends(Event, _super);
                    function Event() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Event;
                }(data_1.DataStore.Event);
                SocketStore.Event = Event;
                var Record = function (_super) {
                    __extends(Record, _super);
                    function Record() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Record;
                }(data_1.DataStore.Record);
                SocketStore.Record = Record;
                var Value = function (_super) {
                    __extends(Value, _super);
                    function Value() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Value;
                }(data_1.DataStore.Value);
                SocketStore.Value = Value;
            }(SocketStore = exports.SocketStore || (exports.SocketStore = {})));
            exports.SocketStore = SocketStore;
            var Schema = function () {
                function Schema(store_, expiries_) {
                    this.store_ = store_;
                    this.expiries_ = expiries_;
                    void this.bind();
                }
                Schema.prototype.bind = function () {
                    var _this = this;
                    var keys = this.data ? this.data.keys() : [];
                    this.data = new data_1.DataStore(this.store_.name);
                    this.data.events.load.monitor([], function (ev) {
                        return _this.store_.events.load.emit([
                            ev.key,
                            ev.attr,
                            ev.type
                        ], ev);
                    });
                    this.data.events.save.monitor([], function (ev) {
                        return _this.store_.events.save.emit([
                            ev.key,
                            ev.attr,
                            ev.type
                        ], ev);
                    });
                    this.data.events.loss.monitor([], function (ev) {
                        return _this.store_.events.loss.emit([
                            ev.key,
                            ev.attr,
                            ev.type
                        ], ev);
                    });
                    this.access = new access_1.AccessStore(this.store_.name, this.data.events_.access);
                    this.expire = new expiry_1.ExpiryStore(this.store_.name, this.store_, this.data.events_.access, this.expiries_);
                    void this.data.sync(keys);
                };
                return Schema;
            }();
        },
        {
            '../../../../lib/noop': 32,
            '../../../infrastructure/indexeddb/api': 24,
            './socket/access': 15,
            './socket/data': 16,
            './socket/expiry': 17,
            'spica': undefined
        }
    ],
    15: [
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
            var key_value_1 = require('../../../../data/store/key-value');
            var event_1 = require('../../../../data/store/event');
            exports.STORE_NAME = 'access';
            var AccessStore = function (_super) {
                __extends(AccessStore, _super);
                function AccessStore(database, access) {
                    var _this = _super.call(this, database, exports.STORE_NAME, AccessStore.fields.key) || this;
                    void Object.freeze(_this);
                    void access.monitor([], function (_a) {
                        var key = _a.key, type = _a.type;
                        return type === event_1.EventStore.EventType.delete ? void _this.delete(key) : void _this.set(key, new AccessRecord(key, Date.now()));
                    });
                    return _this;
                }
                AccessStore.configure = function () {
                    return {
                        make: function (db) {
                            var store = db.objectStoreNames.contains(exports.STORE_NAME) ? db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME) : db.createObjectStore(exports.STORE_NAME, {
                                keyPath: AccessStore.fields.key,
                                autoIncrement: false
                            });
                            if (!store.indexNames.contains(AccessStore.fields.key)) {
                                void store.createIndex(AccessStore.fields.key, AccessStore.fields.key, { unique: true });
                            }
                            if (!store.indexNames.contains(AccessStore.fields.date)) {
                                void store.createIndex(AccessStore.fields.date, AccessStore.fields.date);
                            }
                            return true;
                        },
                        verify: function (db) {
                            return db.objectStoreNames.contains(exports.STORE_NAME) && db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME).indexNames.contains(AccessStore.fields.key) && db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME).indexNames.contains(AccessStore.fields.date);
                        },
                        destroy: function () {
                            return true;
                        }
                    };
                };
                return AccessStore;
            }(key_value_1.KeyValueStore);
            AccessStore.fields = Object.freeze({
                key: 'key',
                date: 'date'
            });
            exports.AccessStore = AccessStore;
            var AccessRecord = function () {
                function AccessRecord(key, date) {
                    this.key = key;
                    this.date = date;
                }
                return AccessRecord;
            }();
        },
        {
            '../../../../data/store/event': 9,
            '../../../../data/store/key-value': 10
        }
    ],
    16: [
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
            var event_1 = require('../../../../data/store/event');
            exports.STORE_NAME = 'data';
            var DataStore = function (_super) {
                __extends(DataStore, _super);
                function DataStore(database) {
                    var _this = _super.call(this, database, exports.STORE_NAME) || this;
                    void Object.freeze(_this);
                    return _this;
                }
                DataStore.configure = function () {
                    return event_1.EventStore.configure(exports.STORE_NAME);
                };
                return DataStore;
            }(event_1.EventStore);
            exports.DataStore = DataStore;
            (function (DataStore) {
                DataStore.EventType = event_1.EventStore.EventType;
                var Event = function (_super) {
                    __extends(Event, _super);
                    function Event() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Event;
                }(event_1.EventStore.Event);
                DataStore.Event = Event;
                var Record = function (_super) {
                    __extends(Record, _super);
                    function Record() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Record;
                }(event_1.EventStore.Record);
                DataStore.Record = Record;
                var Value = function (_super) {
                    __extends(Value, _super);
                    function Value() {
                        return _super.apply(this, arguments) || this;
                    }
                    return Value;
                }(event_1.EventStore.Value);
                DataStore.Value = Value;
            }(DataStore = exports.DataStore || (exports.DataStore = {})));
            exports.DataStore = DataStore;
        },
        { '../../../../data/store/event': 9 }
    ],
    17: [
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
            var api_1 = require('../../../../infrastructure/indexeddb/api');
            var key_value_1 = require('../../../../data/store/key-value');
            var event_1 = require('../../../../data/store/event');
            exports.STORE_NAME = 'expiry';
            var ExpiryStore = function (_super) {
                __extends(ExpiryStore, _super);
                function ExpiryStore(database, store, access, expiries) {
                    var _this = _super.call(this, database, exports.STORE_NAME, ExpiryStore.fields.key) || this;
                    void Object.freeze(_this);
                    var timer = 0;
                    var scheduled = Infinity;
                    var schedule = function (date) {
                        if (scheduled < date)
                            return;
                        void clearTimeout(timer);
                        scheduled = date;
                        timer = setTimeout(function () {
                            scheduled = Infinity;
                            void _this.cursor(null, ExpiryStore.fields.expiry, api_1.IDBCursorDirection.next, api_1.IDBTransactionMode.readonly, function (cursor) {
                                if (!cursor)
                                    return;
                                var record = cursor.value;
                                if (record.expiry > Date.now())
                                    return void schedule(record.expiry);
                                void store.delete(record.key);
                                return void cursor.continue();
                            });
                        }, date - Date.now());
                        void api_1.event.once([
                            database,
                            api_1.IDBEventType.destroy
                        ], function () {
                            return void clearTimeout(timer);
                        });
                    };
                    void schedule(Date.now());
                    void access.monitor([], function (_a) {
                        var key = _a.key, type = _a.type;
                        switch (type) {
                        case event_1.EventStore.EventType.delete:
                            return void _this.delete(key);
                        default:
                            if (!expiries.has(key))
                                return;
                            var expiry = Date.now() + expiries.get(key);
                            void _this.set(key, new ExpiryRecord(key, expiry));
                            return void schedule(expiry);
                        }
                    });
                    return _this;
                }
                ExpiryStore.configure = function () {
                    return {
                        make: function (db) {
                            var store = db.objectStoreNames.contains(exports.STORE_NAME) ? db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME) : db.createObjectStore(exports.STORE_NAME, {
                                keyPath: ExpiryStore.fields.key,
                                autoIncrement: false
                            });
                            if (!store.indexNames.contains(ExpiryStore.fields.key)) {
                                void store.createIndex(ExpiryStore.fields.key, ExpiryStore.fields.key, { unique: true });
                            }
                            if (!store.indexNames.contains(ExpiryStore.fields.expiry)) {
                                void store.createIndex(ExpiryStore.fields.expiry, ExpiryStore.fields.expiry);
                            }
                            return true;
                        },
                        verify: function (db) {
                            return db.objectStoreNames.contains(exports.STORE_NAME) && db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME).indexNames.contains(ExpiryStore.fields.key) && db.transaction(exports.STORE_NAME).objectStore(exports.STORE_NAME).indexNames.contains(ExpiryStore.fields.expiry);
                        },
                        destroy: function () {
                            return true;
                        }
                    };
                };
                return ExpiryStore;
            }(key_value_1.KeyValueStore);
            ExpiryStore.fields = Object.freeze({
                key: 'key',
                expiry: 'expiry'
            });
            exports.ExpiryStore = ExpiryStore;
            var ExpiryRecord = function () {
                function ExpiryRecord(key, expiry) {
                    this.key = key;
                    this.expiry = expiry;
                }
                return ExpiryRecord;
            }();
        },
        {
            '../../../../data/store/event': 9,
            '../../../../data/store/key-value': 10,
            '../../../../infrastructure/indexeddb/api': 24
        }
    ],
    18: [
        function (require, module, exports) {
            'use strict';
            var api_1 = require('../../../infrastructure/indexeddb/api');
            exports.event = api_1.event;
            exports.IDBEventType = api_1.IDBEventType;
        },
        { '../../../infrastructure/indexeddb/api': 24 }
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
            var spica_1 = require('spica');
            var api_1 = require('../../dao/api');
            var socket_1 = require('../model/socket');
            var api_2 = require('../../../infrastructure/webstorage/api');
            var api_3 = require('../../webstorage/api');
            var cache = new WeakSet();
            var Message = function () {
                function Message(key, attr, date) {
                    this.key = key;
                    this.attr = attr;
                    this.date = date;
                    void Object.freeze(this);
                }
                return Message;
            }();
            var PortSchema = function () {
                function PortSchema() {
                    this.msgs = [];
                    this.msgLatestUpdates_ = new Map();
                }
                PortSchema.prototype.recv = function () {
                    var _this = this;
                    return this.msgs.filter(function (msg) {
                        var received = msg.date <= _this.msgLatestUpdates_.get(msg.key);
                        void _this.msgLatestUpdates_.set(msg.key, msg.date);
                        return !received;
                    }).map(function (msg) {
                        return msg.key;
                    });
                };
                PortSchema.prototype.send = function (msg) {
                    this.msgs = this.msgs.reduceRight(function (ms, m) {
                        return m.key === ms[0].key || m.date < ms[0].date - 1000 * 1000 ? ms : spica_1.concat([m], ms);
                    }, [msg]).slice(-9);
                };
                return PortSchema;
            }();
            var Socket = function (_super) {
                __extends(Socket, _super);
                function Socket(name, factory, destroy, expiry) {
                    if (destroy === void 0) {
                        destroy = function () {
                            return true;
                        };
                    }
                    if (expiry === void 0) {
                        expiry = Infinity;
                    }
                    var _this = _super.call(this, name, destroy, expiry) || this;
                    _this.factory = factory;
                    _this.port = new api_3.Port(_this.name, api_2.localStorage, function () {
                        return new PortSchema();
                    });
                    _this.links = new Map();
                    _this.sources = new Map();
                    if (cache.has(_this))
                        return _this;
                    void cache.add(_this);
                    void _this.port.link().__event.on([
                        api_3.WebStorageEventType.recv,
                        'msgs'
                    ], function () {
                        return void _this.port.link().recv().reduce(function (_, key) {
                            return void _this.schema.data.fetch(key);
                        }, void 0);
                    });
                    void _this.events.save.monitor([], function (_a) {
                        var key = _a.key, attr = _a.attr;
                        return void _this.port.link().send(new Message(key, attr, Date.now()));
                    });
                    void _this.events.load.monitor([], function (_a) {
                        var key = _a.key, attr = _a.attr, type = _a.type;
                        var source = _this.sources.get(key);
                        if (!source)
                            return;
                        switch (type) {
                        case socket_1.SocketStore.EventType.put: {
                                var oldVal = source[attr];
                                var newVal = _this.get(key)[attr];
                                source[attr] = newVal;
                                void source.__event.emit([
                                    api_3.WebStorageEventType.recv,
                                    attr
                                ], new api_3.WebStorageEvent(api_3.WebStorageEventType.recv, key, attr, newVal, oldVal));
                                return;
                            }
                        case socket_1.SocketStore.EventType.delete: {
                                var cache_1 = _this.get(key);
                                void Object.keys(cache_1).filter(api_1.isValidPropertyName).filter(api_1.isValidPropertyValue(cache_1)).sort().reduce(function (_, attr) {
                                    var oldVal = source[attr];
                                    var newVal = void 0;
                                    source[attr] = newVal;
                                    void source.__event.emit([
                                        api_3.WebStorageEventType.recv,
                                        attr
                                    ], new api_3.WebStorageEvent(api_3.WebStorageEventType.recv, key, attr, newVal, oldVal));
                                }, void 0);
                                return;
                            }
                        case socket_1.SocketStore.EventType.snapshot: {
                                var cache_2 = _this.get(key);
                                void Object.keys(cache_2).filter(api_1.isValidPropertyName).filter(api_1.isValidPropertyValue(cache_2)).sort().reduce(function (_, attr) {
                                    var oldVal = source[attr];
                                    var newVal = cache_2[attr];
                                    source[attr] = newVal;
                                    void source.__event.emit([
                                        api_3.WebStorageEventType.recv,
                                        attr
                                    ], new api_3.WebStorageEvent(api_3.WebStorageEventType.recv, key, attr, newVal, oldVal));
                                }, void 0);
                                return;
                            }
                        }
                    });
                    void Object.seal(_this);
                    return _this;
                }
                Socket.prototype.link = function (key, expiry) {
                    var _this = this;
                    void this.expire(key, expiry);
                    return this.links.has(key) ? this.links.get(key) : this.links.set(key, api_1.build(Object.defineProperties((void this.sources.set(key, spica_1.clone({}, this.get(key))), this.sources.get(key)), {
                        __meta: {
                            get: function () {
                                return _this.meta(key);
                            }
                        },
                        __id: {
                            get: function () {
                                return this.__meta.id;
                            }
                        },
                        __key: {
                            get: function () {
                                return this.__meta.key;
                            }
                        },
                        __date: {
                            get: function () {
                                return this.__meta.date;
                            }
                        },
                        __event: { value: new spica_1.Observable() }
                    }), this.factory, function (attr, newValue, oldValue) {
                        return void _this.add(new socket_1.SocketStore.Record(key, (_a = {}, _a[attr] = newValue, _a))), void _this.sources.get(key).__event.emit([
                            api_3.WebStorageEventType.send,
                            attr
                        ], new api_3.WebStorageEvent(api_3.WebStorageEventType.send, key, attr, newValue, oldValue));
                        var _a;
                    })).get(key);
                };
                Socket.prototype.destroy = function () {
                    void this.port.destroy();
                    void cache.delete(this);
                    void _super.prototype.destroy.call(this);
                };
                return Socket;
            }(socket_1.SocketStore);
            exports.Socket = Socket;
        },
        {
            '../../../infrastructure/webstorage/api': 28,
            '../../dao/api': 11,
            '../../webstorage/api': 20,
            '../model/socket': 14,
            'spica': undefined
        }
    ],
    20: [
        function (require, module, exports) {
            'use strict';
            var api_1 = require('../../infrastructure/webstorage/api');
            exports.localStorage = api_1.localStorage;
            exports.sessionStorage = api_1.sessionStorage;
            exports.supportWebStorage = api_1.supportWebStorage;
            var event_1 = require('./service/event');
            exports.events = event_1.events;
            var port_1 = require('./service/port');
            exports.Port = port_1.Port;
            exports.WebStorageEvent = port_1.PortEvent;
            exports.WebStorageEventType = port_1.PortEventType;
        },
        {
            '../../infrastructure/webstorage/api': 28,
            './service/event': 22,
            './service/port': 23
        }
    ],
    21: [
        function (require, module, exports) {
            'use strict';
            var Storage = function () {
                function Storage() {
                    this.store = new Map();
                }
                Object.defineProperty(Storage.prototype, 'length', {
                    get: function () {
                        return this.store.size;
                    },
                    enumerable: true,
                    configurable: true
                });
                Storage.prototype.getItem = function (key) {
                    return this.store.has(key) ? this.store.get(key) : null;
                };
                Storage.prototype.setItem = function (key, data) {
                    void this.store.set(key, data);
                };
                Storage.prototype.removeItem = function (key) {
                    void this.store.delete(key);
                };
                Storage.prototype.clear = function () {
                    void this.store.clear();
                };
                return Storage;
            }();
            exports.fakeStorage = new Storage();
        },
        {}
    ],
    22: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var api_1 = require('../../../infrastructure/webstorage/api');
            exports.events = {
                localStorage: subscribe(api_1.events.localStorage),
                sessionStorage: subscribe(api_1.events.sessionStorage)
            };
            function subscribe(source) {
                var observer = new spica_1.Observable();
                void source.on(['storage'], function (event) {
                    return void observer.emit([event.key], event);
                });
                return observer;
            }
        },
        {
            '../../../infrastructure/webstorage/api': 28,
            'spica': undefined
        }
    ],
    23: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var api_1 = require('../../dao/api');
            var event_1 = require('../service/event');
            var api_2 = require('../../../infrastructure/webstorage/api');
            var storage_1 = require('../model/storage');
            var cache = new Map();
            var PortEventType;
            (function (PortEventType) {
                PortEventType.send = 'send';
                PortEventType.recv = 'recv';
            }(PortEventType = exports.PortEventType || (exports.PortEventType = {})));
            var PortEvent = function () {
                function PortEvent(type, key, attr, newValue, oldValue) {
                    this.type = type;
                    this.key = key;
                    this.attr = attr;
                    this.newValue = newValue;
                    this.oldValue = oldValue;
                    void Object.freeze(this);
                }
                return PortEvent;
            }();
            exports.PortEvent = PortEvent;
            var Port = function () {
                function Port(name, storage, factory, log) {
                    if (storage === void 0) {
                        storage = api_2.sessionStorage || storage_1.fakeStorage;
                    }
                    if (log === void 0) {
                        log = {
                            update: function (_name) {
                            },
                            delete: function (_name) {
                            }
                        };
                    }
                    var _this = this;
                    this.name = name;
                    this.storage = storage;
                    this.factory = factory;
                    this.log = log;
                    this.eventSource = this.storage === api_2.localStorage ? event_1.events.localStorage : event_1.events.sessionStorage;
                    this.events = {
                        send: new spica_1.Observable(),
                        recv: new spica_1.Observable()
                    };
                    if (cache.has(name))
                        return cache.get(name);
                    void cache.set(name, this);
                    var source = Object.assign((_a = {}, _a[api_1.SCHEMA.KEY.NAME] = this.name, _a[api_1.SCHEMA.EVENT.NAME] = new spica_1.Observable(), _a), parse(this.storage.getItem(this.name)));
                    this.link_ = api_1.build(source, this.factory, function (attr, newValue, oldValue) {
                        void _this.log.update(_this.name);
                        void _this.storage.setItem(_this.name, JSON.stringify(Object.keys(source).filter(api_1.isValidPropertyName).filter(api_1.isValidPropertyValue(source)).reduce(function (acc, attr) {
                            acc[attr] = source[attr];
                            return acc;
                        }, {})));
                        var event = new PortEvent(PortEventType.send, _this.name, attr, newValue, oldValue);
                        void source.__event.emit([
                            event.type,
                            event.attr
                        ], event);
                        void _this.events.send.emit([event.attr], event);
                    });
                    var subscriber = function (_a) {
                        var newValue = _a.newValue;
                        var item = parse(newValue);
                        void Object.keys(item).filter(api_1.isValidPropertyName).filter(api_1.isValidPropertyValue(item)).reduce(function (_, attr) {
                            var oldVal = source[attr];
                            var newVal = item[attr];
                            if (newVal === oldVal)
                                return;
                            source[attr] = newVal;
                            var event = new PortEvent(PortEventType.recv, _this.name, attr, newVal, oldVal);
                            void source.__event.emit([
                                event.type,
                                event.attr
                            ], event);
                            void _this.events.recv.emit([event.attr], event);
                        }, void 0);
                    };
                    void this.eventSource.on([this.name], subscriber);
                    void this.log.update(this.name);
                    void Object.freeze(this);
                    var _a;
                }
                Port.prototype.link = function () {
                    return this.link_;
                };
                Port.prototype.destroy = function () {
                    void this.eventSource.off([this.name]);
                    void this.storage.removeItem(this.name);
                    void this.log.delete(this.name);
                    void cache.delete(this.name);
                };
                return Port;
            }();
            exports.Port = Port;
            function parse(item) {
                try {
                    return JSON.parse(item || '{}') || {};
                } catch (_) {
                    return {};
                }
            }
        },
        {
            '../../../infrastructure/webstorage/api': 28,
            '../../dao/api': 11,
            '../model/storage': 21,
            '../service/event': 22,
            'spica': undefined
        }
    ],
    24: [
        function (require, module, exports) {
            'use strict';
            var global_1 = require('./module/global');
            exports.indexedDB = global_1.indexedDB;
            exports.IDBKeyRange = global_1.IDBKeyRange;
            exports.IDBTransactionMode = global_1.IDBTransactionMode;
            exports.IDBCursorDirection = global_1.IDBCursorDirection;
            var access_1 = require('./model/access');
            exports.open = access_1.open;
            exports.listen = access_1.listen;
            exports.close = access_1.close;
            exports.destroy = access_1.destroy;
            exports.event = access_1.event;
            var event_1 = require('./model/event');
            exports.IDBEvent = event_1.IDBEvent;
            exports.IDBEventType = event_1.IDBEventType;
        },
        {
            './model/access': 25,
            './model/event': 26,
            './module/global': 27
        }
    ],
    25: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var global_1 = require('../module/global');
            var event_1 = require('./event');
            var IDBEventObserver = new spica_1.Observable();
            exports.event = IDBEventObserver;
            var configs = new Map();
            var commands = new Map();
            var Command;
            (function (Command) {
                Command[Command['open'] = 0] = 'open';
                Command[Command['close'] = 1] = 'close';
                Command[Command['destroy'] = 2] = 'destroy';
            }(Command || (Command = {})));
            var states = new Map();
            var State;
            (function (State) {
                var Initial = function () {
                    function Initial(database) {
                        this.database = database;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Initial;
                }();
                State.Initial = Initial;
                var Block = function () {
                    function Block(database) {
                        this.database = database;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Block;
                }();
                State.Block = Block;
                var Upgrade = function () {
                    function Upgrade(database, session) {
                        this.database = database;
                        this.session = session;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Upgrade;
                }();
                State.Upgrade = Upgrade;
                var Success = function () {
                    function Success(database, connection) {
                        this.database = database;
                        this.connection = connection;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Success;
                }();
                State.Success = Success;
                var Error = function () {
                    function Error(database, error, event) {
                        this.database = database;
                        this.error = error;
                        this.event = event;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Error;
                }();
                State.Error = Error;
                var Abort = function () {
                    function Abort(database, error, event) {
                        this.database = database;
                        this.error = error;
                        this.event = event;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Abort;
                }();
                State.Abort = Abort;
                var Crash = function () {
                    function Crash(database, error) {
                        this.database = database;
                        this.error = error;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Crash;
                }();
                State.Crash = Crash;
                var Destroy = function () {
                    function Destroy(database) {
                        this.database = database;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return Destroy;
                }();
                State.Destroy = Destroy;
                var End = function () {
                    function End(database) {
                        this.database = database;
                        this.STATE;
                        void states.set(database, this);
                    }
                    return End;
                }();
                State.End = End;
            }(State || (State = {})));
            var requests = new Map();
            function open(name, config) {
                void commands.set(name, 0);
                void configs.set(name, config);
                if (states.has(name))
                    return;
                void handleFromInitialState(new State.Initial(name));
            }
            exports.open = open;
            function listen(name) {
                return function (req) {
                    var queue = requests.get(name) || requests.set(name, []).get(name);
                    void queue.push(req);
                    if (!states.has(name))
                        return;
                    var state = states.get(name);
                    if (state instanceof State.Success) {
                        void state.drain();
                    }
                };
            }
            exports.listen = listen;
            function close(name) {
                void commands.set(name, 1);
                void configs.set(name, {
                    make: function () {
                        return false;
                    },
                    verify: function () {
                        return false;
                    },
                    destroy: function () {
                        return false;
                    }
                });
                if (!states.has(name))
                    return void handleFromInitialState(new State.Initial(name));
                var state = states.get(name);
                if (state instanceof State.Success) {
                    state.end();
                }
            }
            exports.close = close;
            function destroy(name) {
                void commands.set(name, 2);
                void configs.set(name, {
                    make: function () {
                        return false;
                    },
                    verify: function () {
                        return false;
                    },
                    destroy: function () {
                        return true;
                    }
                });
                if (!states.has(name))
                    return void handleFromInitialState(new State.Initial(name));
                var state = states.get(name);
                if (state instanceof State.Success) {
                    state.destroy();
                }
            }
            exports.destroy = destroy;
            function handleFromInitialState(_a, version) {
                var database = _a.database;
                if (version === void 0) {
                    version = 0;
                }
                var config = configs.get(database);
                try {
                    var openRequest_1 = version ? global_1.indexedDB.open(database, version) : global_1.indexedDB.open(database);
                    var clear_1 = function () {
                        return openRequest_1.onupgradeneeded = void 0, openRequest_1.onsuccess = void 0, openRequest_1.onerror = void 0;
                    };
                    openRequest_1.onblocked = function () {
                        return void handleFromBlockedState(new State.Block(database));
                    };
                    openRequest_1.onupgradeneeded = function () {
                        return void clear_1(), void handleFromUpgradeState(new State.Upgrade(database, openRequest_1));
                    };
                    openRequest_1.onsuccess = function () {
                        return void clear_1(), void handleFromSuccessState(new State.Success(database, openRequest_1.result));
                    };
                    openRequest_1.onerror = function (event) {
                        return void clear_1(), void handleFromErrorState(new State.Error(database, openRequest_1.error, event));
                    };
                } catch (err) {
                    void handleFromCrashState(new State.Crash(database, err));
                }
                return;
                function handleFromBlockedState(_a) {
                    var database = _a.database;
                    void IDBEventObserver.emit([
                        database,
                        event_1.IDBEventType.block
                    ], new event_1.IDBEvent(event_1.IDBEventType.block, database));
                }
                function handleFromUpgradeState(_a) {
                    var database = _a.database, session = _a.session;
                    var db = session.transaction.db;
                    var _b = configs.get(database), make = _b.make, destroy = _b.destroy;
                    try {
                        if (make(db)) {
                            session.onsuccess = function () {
                                return void handleFromSuccessState(new State.Success(database, db));
                            };
                            session.onerror = function (event) {
                                return void handleFromErrorState(new State.Error(database, session.error, event));
                            };
                        } else {
                            session.onsuccess = session.onerror = function (event) {
                                return void db.close(), destroy(session.error, event) ? void handleFromDestroyState(new State.Destroy(database)) : void handleFromEndState(new State.End(database));
                            };
                        }
                    } catch (err) {
                        void handleFromCrashState(new State.Crash(database, err));
                    }
                }
                function handleFromSuccessState(state) {
                    var database = state.database, connection = state.connection;
                    var clear = function () {
                        return connection.onversionchange = function () {
                            return void connection.close();
                        }, connection.onerror = void 0, connection.onabort = void 0, connection.onclose = void 0;
                    };
                    connection.onversionchange = function (_a) {
                        var newVersion = _a.newVersion;
                        void clear();
                        void connection.close();
                        if (!newVersion) {
                            void requests.delete(database);
                            void IDBEventObserver.emit([
                                database,
                                event_1.IDBEventType.destroy
                            ], new event_1.IDBEvent(event_1.IDBEventType.destroy, database));
                        }
                        if (states.get(database) !== state)
                            return;
                        void handleFromEndState(new State.End(database));
                    };
                    connection.onerror = function (event) {
                        return void clear(), void handleFromErrorState(new State.Error(database, event.target.error, event));
                    };
                    connection.onabort = function (event) {
                        return void clear(), void handleFromAbortState(new State.Abort(database, event.target.error, event));
                    };
                    connection.onclose = function () {
                        return void clear(), void IDBEventObserver.emit([
                            database,
                            event_1.IDBEventType.destroy
                        ], new event_1.IDBEvent(event_1.IDBEventType.destroy, database)), void handleFromEndState(new State.End(database));
                    };
                    state.destroy = function () {
                        return void clear(), void connection.close(), void handleFromDestroyState(new State.Destroy(database));
                    };
                    state.end = function () {
                        return void clear(), void connection.close(), void handleFromEndState(new State.End(database));
                    };
                    state.drain = function () {
                        var reqs = requests.get(database) || [];
                        try {
                            while (reqs.length > 0 && commands.get(database) === 0) {
                                void reqs[0](connection);
                                void reqs.shift();
                            }
                        } catch (err) {
                            if (err instanceof DOMError || err instanceof DOMException) {
                                void console.warn(err);
                            } else {
                                void console.error(err);
                            }
                            void clear();
                            void handleFromCrashState(new State.Crash(database, err));
                        }
                    };
                    switch (commands.get(database)) {
                    case 0: {
                            var verify = configs.get(database).verify;
                            try {
                                if (!verify(connection))
                                    return void handleFromEndState(new State.End(database), connection.version + 1);
                            } catch (err) {
                                return void handleFromCrashState(new State.Crash(database, err));
                            }
                            void IDBEventObserver.emit([
                                database,
                                event_1.IDBEventType.connect
                            ], new event_1.IDBEvent(event_1.IDBEventType.connect, database));
                            return void state.drain();
                        }
                    case 1:
                        return void state.end();
                    case 2:
                        return void state.destroy();
                    }
                    throw new TypeError('LocalSocket: Invalid command ' + commands.get(database) + '.');
                }
                function handleFromErrorState(_a) {
                    var database = _a.database, error = _a.error, event = _a.event;
                    void event.preventDefault();
                    void IDBEventObserver.emit([
                        database,
                        event_1.IDBEventType.error
                    ], new event_1.IDBEvent(event_1.IDBEventType.error, database));
                    var destroy = configs.get(database).destroy;
                    if (destroy(error, event)) {
                        return void handleFromDestroyState(new State.Destroy(database));
                    } else {
                        return void handleFromEndState(new State.End(database));
                    }
                }
                function handleFromAbortState(_a) {
                    var database = _a.database, error = _a.error, event = _a.event;
                    void event.preventDefault();
                    void IDBEventObserver.emit([
                        database,
                        event_1.IDBEventType.abort
                    ], new event_1.IDBEvent(event_1.IDBEventType.abort, database));
                    var destroy = configs.get(database).destroy;
                    if (destroy(error, event)) {
                        return void handleFromDestroyState(new State.Destroy(database));
                    } else {
                        return void handleFromEndState(new State.End(database));
                    }
                }
                function handleFromCrashState(_a) {
                    var database = _a.database, error = _a.error;
                    void IDBEventObserver.emit([
                        database,
                        event_1.IDBEventType.crash
                    ], new event_1.IDBEvent(event_1.IDBEventType.crash, database));
                    var destroy = configs.get(database).destroy;
                    if (destroy(error, null)) {
                        return void handleFromDestroyState(new State.Destroy(database));
                    } else {
                        return void handleFromEndState(new State.End(database));
                    }
                }
                function handleFromDestroyState(_a) {
                    var database = _a.database;
                    var deleteRequest = global_1.indexedDB.deleteDatabase(database);
                    deleteRequest.onsuccess = function () {
                        return void requests.delete(database), void IDBEventObserver.emit([
                            database,
                            event_1.IDBEventType.destroy
                        ], new event_1.IDBEvent(event_1.IDBEventType.destroy, database)), void handleFromEndState(new State.End(database));
                    };
                    deleteRequest.onerror = function (event) {
                        return void handleFromErrorState(new State.Error(database, deleteRequest.error, event));
                    };
                }
                function handleFromEndState(_a, version) {
                    var database = _a.database;
                    if (version === void 0) {
                        version = 0;
                    }
                    void states.delete(database);
                    switch (commands.get(database)) {
                    case 0:
                        return void handleFromInitialState(new State.Initial(database), version);
                    case 1:
                        return void commands.delete(database), void configs.delete(database), void IDBEventObserver.emit([
                            database,
                            event_1.IDBEventType.disconnect
                        ], new event_1.IDBEvent(event_1.IDBEventType.disconnect, database));
                    case 2:
                        return void commands.delete(database), void configs.delete(database), void IDBEventObserver.emit([
                            database,
                            event_1.IDBEventType.disconnect
                        ], new event_1.IDBEvent(event_1.IDBEventType.disconnect, database));
                    }
                    throw new TypeError('LocalSocket: Invalid command ' + commands.get(database) + '.');
                }
            }
        },
        {
            '../module/global': 27,
            './event': 26,
            'spica': undefined
        }
    ],
    26: [
        function (require, module, exports) {
            'use strict';
            var IDBEventType;
            (function (IDBEventType) {
                IDBEventType.connect = 'connect';
                IDBEventType.disconnect = 'disconnect';
                IDBEventType.block = 'block';
                IDBEventType.error = 'error';
                IDBEventType.abort = 'abort';
                IDBEventType.crash = 'crash';
                IDBEventType.destroy = 'destroy';
            }(IDBEventType = exports.IDBEventType || (exports.IDBEventType = {})));
            var IDBEvent = function () {
                function IDBEvent(type, name) {
                    this.type = type;
                    this.name = name;
                    this.namespace = [this.name];
                    void Object.freeze(this);
                }
                return IDBEvent;
            }();
            exports.IDBEvent = IDBEvent;
        },
        {}
    ],
    27: [
        function (require, module, exports) {
            'use strict';
            exports.indexedDB = self.indexedDB;
            exports.IDBKeyRange = self.IDBKeyRange;
            var IDBTransactionMode;
            (function (IDBTransactionMode) {
                IDBTransactionMode.readonly = 'readonly';
                IDBTransactionMode.readwrite = 'readwrite';
            }(IDBTransactionMode = exports.IDBTransactionMode || (exports.IDBTransactionMode = {})));
            var IDBCursorDirection;
            (function (IDBCursorDirection) {
                IDBCursorDirection.next = 'next';
                IDBCursorDirection.nextunique = 'nextunique';
                IDBCursorDirection.prev = 'prev';
                IDBCursorDirection.prevunique = 'prevunique';
            }(IDBCursorDirection = exports.IDBCursorDirection || (exports.IDBCursorDirection = {})));
        },
        {}
    ],
    28: [
        function (require, module, exports) {
            'use strict';
            var global_1 = require('./module/global');
            exports.localStorage = global_1.localStorage;
            exports.sessionStorage = global_1.sessionStorage;
            exports.supportWebStorage = global_1.supportWebStorage;
            var event_1 = require('./model/event');
            exports.events = event_1.events;
        },
        {
            './model/event': 29,
            './module/global': 30
        }
    ],
    29: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            var global_1 = require('../module/global');
            var storageEvents = {
                localStorage: new spica_1.Observable(),
                sessionStorage: new spica_1.Observable()
            };
            exports.events = storageEvents;
            void self.addEventListener('storage', function (event) {
                switch (event.storageArea) {
                case global_1.localStorage:
                    return void storageEvents.localStorage.emit(['storage'], event);
                case global_1.sessionStorage:
                    return void storageEvents.sessionStorage.emit(['storage'], event);
                default:
                    return;
                }
            });
        },
        {
            '../module/global': 30,
            'spica': undefined
        }
    ],
    30: [
        function (require, module, exports) {
            'use strict';
            var spica_1 = require('spica');
            exports.supportWebStorage = function () {
                try {
                    var key = 'localsocket#' + spica_1.uuid();
                    void self.sessionStorage.setItem(key, key);
                    if (key !== self.sessionStorage.getItem(key))
                        throw 1;
                    void self.sessionStorage.removeItem(key);
                    return true;
                } catch (e) {
                    return false;
                }
            }();
            exports.localStorage = exports.supportWebStorage ? self.localStorage : void 0;
            exports.sessionStorage = exports.supportWebStorage ? self.sessionStorage : void 0;
        },
        { 'spica': undefined }
    ],
    31: [
        function (require, module, exports) {
            'use strict';
            var api_1 = require('../application/api');
            exports.socket = api_1.socket;
            exports.port = api_1.port;
            exports.events = api_1.events;
            exports.status = api_1.status;
        },
        { '../application/api': 5 }
    ],
    32: [
        function (require, module, exports) {
            'use strict';
            function noop() {
                ;
            }
            exports.noop = noop;
        },
        {}
    ],
    'localsocket': [
        function (require, module, exports) {
            'use strict';
            function __export(m) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            __export(require('./src/export'));
            var export_1 = require('./src/export');
            exports.default = export_1.default;
            exports.__esModule = true;
        },
        { './src/export': 4 }
    ]
}, {}, [
    1,
    2,
    3,
    'localsocket'
]);