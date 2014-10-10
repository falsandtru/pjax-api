/**
 * 
 * jquery.pjax.js
 * 
 * @name jquery.pjax.js
 * @version 2.24.1
 * ---
 * @author falsandtru https://github.com/falsandtru/jquery.pjax.js/
 * @copyright 2012, falsandtru
 * @license MIT
 * 
 */

new (function(window, document, undefined, $) {
"use strict";
/// <reference path=".d/jquery.d.ts"/>
/// <reference path=".d/jquery.pjax.d.ts"/>

var MODULE;
(function (MODULE) {
    MODULE.NAME = 'pjax';
    MODULE.NAMESPACE = jQuery;

    

    

    

    

    // State
    (function (State) {
        State[State["blank"] = -2] = "blank";
        State[State["initiate"] = -1] = "initiate";
        State[State["open"] = 0] = "open";
        State[State["pause"] = 1] = "pause";
        State[State["lock"] = 2] = "lock";
        State[State["seal"] = 3] = "seal";
        State[State["error"] = 4] = "error";
        State[State["crash"] = 5] = "crash";
        State[State["terminate"] = 6] = "terminate";
        State[State["close"] = 7] = "close";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;

    

    

    

    

    // Function
    function GEN_UUID() {
        // version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, gen);
        function gen(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }
    }
    MODULE.GEN_UUID = GEN_UUID;

    function FREEZE(object, deep) {
        if (!Object.freeze || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isFrozen(object) && Object.freeze(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                FREEZE(prop, deep);
            }
        }
        return object;
    }
    MODULE.FREEZE = FREEZE;

    function SEAL(object, deep) {
        if (!Object.seal || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isSealed(object) && Object.seal(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                SEAL(prop, deep);
            }
        }
        return object;
    }
    MODULE.SEAL = SEAL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            

            

            
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Template = (function () {
            function Template(state) {
                /**
                * 拡張モジュール名。ネームスペースにこの名前のプロパティでモジュールが追加される。
                *
                * @property NAME
                * @type String
                */
                this.NAME = MODULE.NAME;
                /**
                * ネームスペース。ここにモジュールが追加される。
                *
                * @property NAMESPACE
                * @type Window|JQuery
                */
                this.NAMESPACE = MODULE.NAMESPACE;
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Modelの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                this.state_ = state;
            }
            Template.prototype.MAIN = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return this.main_.apply(this, [context].concat(args));
            };

            Template.prototype.main_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return context;
            };
            return Template;
        })();
        MODEL.Template = Template;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        var Template = (function () {
            function Template(state) {
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Viewの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                this.state_ = state;
            }
            return Template;
        })();
        VIEW.Template = Template;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_, controller_, context_, setting) {
                var _this = this;
                _super.call(this, -1 /* initiate */);
                this.model_ = model_;
                this.controller_ = controller_;
                this.context_ = context_;
                // VIEWの待ち受けるイベントに登録されるハンドラ
                this.handlers = {
                    click: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        _this.controller_.click.apply(_this.controller_, args);
                    },
                    submit: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        _this.controller_.submit.apply(_this.controller_, args);
                    },
                    popstate: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        _this.controller_.popstate.apply(_this.controller_, args);
                    },
                    scroll: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        _this.controller_.scroll.apply(_this.controller_, args);
                    }
                };
                this.observe_(setting);
            }
            Main.prototype.observe_ = function (setting) {
                this.release_(setting);
                this.context_.delegate(setting.link, setting.nss.click, this.handlers.click).delegate(setting.form, setting.nss.submit, this.handlers.submit);
                jQuery(window).bind(setting.nss.popstate, this.handlers.popstate);

                setting.fix.scroll && jQuery(window).bind(setting.nss.scroll, this.handlers.scroll);
                return this;
            };
            Main.prototype.release_ = function (setting) {
                this.context_.undelegate(setting.link, setting.nss.click).undelegate(setting.form, setting.nss.submit);
                jQuery(window).unbind(setting.nss.popstate);

                setting.fix.scroll && jQuery(window).unbind(setting.nss.scroll);
                return this;
            };
            return Main;
        })(VIEW.Template);
        VIEW.Main = Main;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.View = MODULE.VIEW.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var M;
        var C;
        var S;

        var Functions = (function () {
            function Functions(model, controller) {
                M = model;
                C = controller;
                S = this;
                MODULE.SEAL(this);
            }
            Functions.prototype.enable = function () {
                M.enable();
                return this;
            };

            Functions.prototype.disable = function () {
                M.disable();
                return this;
            };

            Functions.prototype.click = function (url, attrs) {
                var setting = M.getGlobalSetting(), $anchor;

                switch (typeof url) {
                    case 'undefined':
                        $anchor = jQuery(this).filter('a').first().clone();
                        break;

                    case 'object':
                        $anchor = jQuery(url).clone();
                        break;

                    case 'string':
                        attrs = jQuery.extend(true, {}, attrs, { href: url });
                        $anchor = jQuery('<a/>', attrs);
                        break;

                    default:
                        return this;
                }
                $anchor.first().one(setting.nss.click, function () {
                    return C.click.apply(C, arguments);
                }).click();
                return this;
            };

            Functions.prototype.submit = function (url, attrs, data) {
                var setting = M.getGlobalSetting(), $form, df = document.createDocumentFragment(), type, $element;

                switch (typeof url) {
                    case 'undefined':
                        $form = jQuery(this).filter('form').first().clone();
                        break;

                    case 'object':
                        $form = jQuery(url).clone();
                        break;

                    case 'string':
                        attrs = jQuery.extend(true, {}, attrs, { action: url });
                        type = data instanceof Array && Array || data instanceof Object && Object || undefined;
                        for (var i in data) {
                            switch (type) {
                                case Object:
                                    if (!Object.prototype.hasOwnProperty.call(data, i)) {
                                        continue;
                                    }
                                    $element = jQuery('<textarea/>', { name: i }).val(data[i]);
                                    break;
                                case Array:
                                    data[i].attrs = data[i].attrs || {};
                                    data[i].attrs.name = data[i].name || data[i].attrs.name;
                                    data[i].attrs.type = data[i].type || data[i].attrs.type;
                                    $element = jQuery('<' + data[i].tag + '/>', data[i].attrs).val(data[i].value);
                                    break;
                                default:
                                    continue;
                            }
                            df.appendChild($element[0]);
                        }
                        $form = jQuery('<form/>', attrs).append(df);
                        break;

                    default:
                        return this;
                }
                $form.first().one(setting.nss.submit, function () {
                    return C.submit.apply(C, arguments);
                }).submit();
                return this;
            };

            Functions.prototype.getCache = function (url) {
                if (typeof url === "undefined") { url = window.location.href; }
                var cache = M.getCache(url);
                if (cache) {
                    cache = {
                        data: cache.data,
                        textStatus: cache.textStatus,
                        jqXHR: cache.jqXHR,
                        expires: cache.expires
                    };
                }
                return cache;
            };

            Functions.prototype.setCache = function (url, data, textStatus, jqXHR) {
                if (typeof url === "undefined") { url = window.location.href; }
                switch (arguments.length) {
                    case 0:
                        return this.setCache(url, document.documentElement.outerHTML);
                    case 1:
                        return this.setCache(url, null);
                    case 2:
                    case 3:
                    case 4:
                    default:
                        M.setCache(url, data, textStatus, jqXHR);
                }
                return this;
            };

            Functions.prototype.removeCache = function (url) {
                if (typeof url === "undefined") { url = window.location.href; }
                M.removeCache(url);
                return this;
            };

            Functions.prototype.clearCache = function () {
                M.clearCache();
                return this;
            };

            Functions.prototype.follow = function (event, $XHR, host, timeStamp) {
                if (!M.isDeferrable) {
                    return false;
                }
                var anchor = event.currentTarget;
                $XHR.follow = true;
                $XHR.host = host || '';
                if (isFinite(event.timeStamp)) {
                    $XHR.timeStamp = timeStamp || event.timeStamp;
                }
                M.setGlobalXHR($XHR);
                jQuery.when($XHR).done(function () {
                    !M.getCache(anchor.href) && M.isImmediateLoadable(event) && M.setCache(anchor.href, undefined, undefined, $XHR);
                });
                jQuery[MODULE.NAME].click(anchor.href);
                return true;
            };

            Functions.prototype.host = function () {
                return M.host();
            };
            return Functions;
        })();
        CONTROLLER.Functions = Functions;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var M;
        var C;
        var S;

        var Methods = (function () {
            function Methods(model, controller) {
                M = model;
                C = controller;
                S = this;
                MODULE.SEAL(this);
            }
            return Methods;
        })();
        CONTROLLER.Methods = Methods;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var Template = (function () {
            function Template(model, state) {
                /**
                * UUID
                *
                * @property UUID
                * @type String
                */
                this.UUID = MODULE.GEN_UUID();
                /**
                * Controllerの遷移状態を持つ
                *
                * @prperty state_
                * @type {State}
                */
                this.state_ = -2 /* blank */;
                /**
                * 拡張のプロパティを指定する
                *
                * @prperty PROPERTIES
                * @type {String}
                */
                this.PROPERTIES = [];
                this.state_ = state;
                this.FUNCTIONS = new CONTROLLER.Functions(model, this);
                this.METHODS = new CONTROLLER.Methods(model, this);
                this.REGISTER(model);
            }
            Template.prototype.EXTEND = function (context) {
                if (context instanceof MODULE.NAMESPACE) {
                    if (context instanceof jQuery) {
                        // コンテクストへの変更をend()で戻せるようadd()
                        context = context.add();
                    }

                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);

                    // コンテクストにメソッドを設定
                    this.REGISTER_METHOD(context);
                } else {
                    if (context !== this.EXTENSION) {
                        // コンテクストを拡張に変更
                        context = this.EXTENSION;
                    }

                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);
                }

                // コンテクストのプロパティを更新
                this.UPDATE_PROPERTIES(context);
                return context;
            };

            /**
            * 拡張モジュール本体のスコープ。
            *
            * @method REGISTER
            * @param {Any} [params]* パラメータ
            */
            Template.prototype.REGISTER = function (model) {
                var S = this;
                this.EXTENSION = this.EXTENSION || function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    var context = S.EXTEND(this);
                    args = [context].concat(args);
                    args = S.EXEC.apply(S, args);
                    return args instanceof Array ? model.MAIN.apply(model, args) : args;
                };
                this.EXTEND(this.EXTENSION);

                // プラグインに関数を設定してネームスペースに登録
                window[MODULE.NAMESPACE] = window[MODULE.NAMESPACE] || {};
                if (MODULE.NAMESPACE.prototype) {
                    MODULE.NAMESPACE[MODULE.NAME] = MODULE.NAMESPACE.prototype[MODULE.NAME] = this.EXTENSION;
                } else {
                    MODULE.NAMESPACE[MODULE.NAME] = this.EXTENSION;
                }
            };

            Template.prototype.EXEC = function () {
                return this.exec_.apply(this, arguments);
            };

            Template.prototype.exec_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return [context].concat(args);
            };

            Template.prototype.REGISTER_FUNCTION = function (context) {
                var funcs = this.FUNCTIONS;
                for (var i in funcs) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = funcs[i];
                }
                return context;
            };

            Template.prototype.REGISTER_METHOD = function (context) {
                var METHODS = this.METHODS;
                for (var i in METHODS) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = METHODS[i];
                }
                return context;
            };

            Template.prototype.UPDATE_PROPERTIES = function (context) {
                var props = this.PROPERTIES;

                var i, len, prop;
                for (i = 0, len = props.length; i < len; i++) {
                    if ('constructor' === i) {
                        continue;
                    }
                    prop = props[i];
                    if (context[prop]) {
                        context[prop] = context[prop]();
                    }
                }
                return context;
            };
            return Template;
        })();
        CONTROLLER.Template = Template;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_) {
                _super.call(this, model_, -1 /* initiate */);
                this.model_ = model_;
            }
            Main.prototype.exec_ = function ($context) {
                var args = [].slice.call(arguments, 1, 2), option = args[0];

                switch (typeof option) {
                    case 'undefined':
                    case 'object':
                        break;
                    default:
                        return $context;
                }

                return [$context].concat(args);
            };

            Main.prototype.click = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.click.apply(this.model_, args);
            };
            Main.prototype.submit = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.submit.apply(this.model_, args);
            };
            Main.prototype.popstate = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.popstate.apply(this.model_, args);
            };
            Main.prototype.scroll = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.scroll.apply(this.model_, args);
            };
            return Main;
        })(CONTROLLER.Template);
        CONTROLLER.Main = Main;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.Controller = MODULE.CONTROLLER.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var Store = (function () {
                    function Store(DB) {
                        this.DB = DB;
                        this.buffer_ = [];
                    }
                    Store.prototype.accessStore = function (success, mode) {
                        var _this = this;
                        if (typeof mode === "undefined") { mode = 'readwrite'; }
                        this.DB.conExtend();

                        try  {
                            var database = this.DB.database(), store = database && database.transaction(this.name, mode).objectStore(this.name);
                        } catch (err) {
                        }

                        if (store) {
                            success(store);
                        } else {
                            this.DB.opendb(function () {
                                return _this.accessStore(success);
                            });
                        }
                    };

                    Store.prototype.accessRecord = function (key, success, mode) {
                        if (typeof mode === "undefined") { mode = 'readwrite'; }
                        this.accessStore(function (store) {
                            store.get(key).onsuccess = success;
                        }, mode);
                    };

                    Store.prototype.loadBuffer = function (limit) {
                        var _this = this;
                        if (typeof limit === "undefined") { limit = 0; }
                        var that = this;
                        this.accessStore(function (store) {
                            var index = store.indexNames.length ? store.indexNames[0] : store.keyPath;
                            store.index(index).openCursor(_this.DB.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
                                if (!this.result) {
                                    return;
                                }

                                var IDBCursor = this.result, data = IDBCursor.value;
                                that.buffer_[data[store.keyPath]] = data;
                                if (!--limit) {
                                    return;
                                }

                                IDBCursor['continue'] && IDBCursor['continue']();
                            };
                        });
                    };

                    Store.prototype.saveBuffer = function () {
                    };

                    Store.prototype.getBuffer = function (key) {
                        return key ? this.buffer_[key] : this.buffer_;
                    };

                    Store.prototype.setBuffer = function (value, isMerge) {
                        var key = value[this.keyPath];
                        this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
                        return this.buffer_[value[this.keyPath]];
                    };

                    Store.prototype.addBuffer = function (value) {
                        value[this.keyPath] = this.buffer_.length || 1;
                        this.buffer_.push(value);
                        return value;
                    };

                    Store.prototype.add = function (value) {
                        var key = value[this.keyPath];
                        delete value[this.keyPath];
                        this.accessRecord(key, function () {
                            'undefined' !== typeof key && this.source['delete'](key);
                            this.source.add(value);
                        });
                    };

                    Store.prototype.set = function (value) {
                        var key = value[this.keyPath];
                        this.accessRecord(key, function () {
                            this.source.put(jQuery.extend(true, {}, this.result, value));
                        });
                    };

                    Store.prototype.get = function (key, success) {
                        this.accessRecord(key, success);
                    };

                    Store.prototype.del = function (key) {
                        this.accessRecord(key, function () {
                            this.source['delete'](key);
                        });
                    };
                    return Store;
                })();
                DATA.Store = Store;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var StoreMeta = (function (_super) {
                    __extends(StoreMeta, _super);
                    function StoreMeta() {
                        _super.apply(this, arguments);
                        this.name = 'meta';
                        this.keyPath = 'id';
                    }
                    return StoreMeta;
                })(DATA.Store);
                DATA.StoreMeta = StoreMeta;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var StoreHistory = (function (_super) {
                    __extends(StoreHistory, _super);
                    function StoreHistory() {
                        _super.apply(this, arguments);
                        this.name = 'history';
                        this.keyPath = 'id';
                    }
                    StoreHistory.prototype.clean = function () {
                        var that = this;
                        this.accessStore(function (store) {
                            store.count().onsuccess = function () {
                                if (this.result > 1000) {
                                    store.index('date').openCursor(that.DB.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
                                        if (!this.result) {
                                            return;
                                        }

                                        var IDBCursor = this.result;
                                        if (IDBCursor) {
                                            IDBCursor['delete'](IDBCursor.value[store.keyPath]);
                                            IDBCursor['continue'] && IDBCursor['continue']();
                                        } else {
                                            store.count().onsuccess = function () {
                                                1000 < this.result && store.clear();
                                            };
                                        }
                                    };
                                }
                            };
                        });
                    };
                    return StoreHistory;
                })(DATA.Store);
                DATA.StoreHistory = StoreHistory;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var StoreLog = (function (_super) {
                    __extends(StoreLog, _super);
                    function StoreLog() {
                        _super.apply(this, arguments);
                        this.name = 'log';
                        this.keyPath = 'id';
                    }
                    StoreLog.prototype.clean = function () {
                        var that = this;
                        this.accessStore(function (store) {
                            var size = 50;

                            store.count().onsuccess = function () {
                                if (this.result > size + 10) {
                                    size = this.result - size;
                                    store.index(store.keyPath).openCursor(this.DB.IDBKeyRange.lowerBound(0)).onsuccess = function () {
                                        if (!this.result) {
                                            return;
                                        }

                                        var IDBCursor = this.result;
                                        if (IDBCursor) {
                                            if (0 > --size) {
                                                IDBCursor['delete'](IDBCursor.value[store.keyPath]);
                                            }
                                            IDBCursor['continue'] && IDBCursor['continue']();
                                        }
                                    };
                                }
                            };
                        });
                    };
                    return StoreLog;
                })(DATA.Store);
                DATA.StoreLog = StoreLog;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var StoreServer = (function (_super) {
                    __extends(StoreServer, _super);
                    function StoreServer() {
                        _super.apply(this, arguments);
                        this.name = 'server';
                        this.keyPath = 'id';
                    }
                    return StoreServer;
                })(DATA.Store);
                DATA.StoreServer = StoreServer;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.log.ts"/>
/// <reference path="data.store.server.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var DB = (function () {
                    function DB() {
                        var _this = this;
                        this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
                        this.name_ = MODULE.NAME;
                        this.version_ = 4;
                        this.refresh_ = 10;
                        this.upgrade_ = 1;
                        this.state_ = -2 /* blank */;
                        this.database = function () {
                            return _this.database_;
                        };
                        this.state = function () {
                            return _this.state_;
                        };
                        this.nowRetrying = false;
                        this.conAge_ = 10 * 1000;
                        this.conInterval_ = 1000;
                        this.tasks_ = [];
                        this.stores = {
                            meta: new DATA.StoreMeta(this),
                            history: new DATA.StoreHistory(this),
                            log: new DATA.StoreLog(this),
                            server: new DATA.StoreServer(this)
                        };
                        this.metaNames = {
                            version: 'version',
                            update: 'update'
                        };
                        var check = function () {
                            var now = new Date().getTime(), expires = _this.conExpires_;
                            if (expires && now > expires) {
                                _this.closedb();
                                _this.conExpires_ = 0;
                            }
                            setTimeout(check, Math.max(_this.conExpires_ - now + 100, _this.conInterval_));
                            _this.tasks_.length && -1 /* initiate */ !== _this.state() && !_this.nowRetrying && _this.opendb(null, true);
                        };
                        this.conAge_ && setTimeout(check, this.conInterval_);
                    }
                    DB.prototype.opendb = function (task, noRetry) {
                        var that = this;

                        that.conExtend();

                        if (!that.IDBFactory || !task && !that.tasks_.length) {
                            return;
                        }

                        'function' === typeof task && that.reserveTask_(task);

                        if (-1 /* initiate */ === that.state() || that.nowRetrying) {
                            return;
                        }

                        try  {
                            that.state_ = -1 /* initiate */;

                            var request = that.IDBFactory.open(that.name_, that.upgrade_ ? that.version_ : 1);

                            request.onblocked = function () {
                                that.closedb(1 /* pause */);
                                try  {
                                    this.result.close();
                                    !noRetry && setTimeout(function () {
                                        return that.opendb(null, true);
                                    }, 1000);
                                } catch (err) {
                                    !noRetry && that.initdb_(1000);
                                }
                            };

                            request.onupgradeneeded = function () {
                                try  {
                                    var database = this.result;

                                    for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) {
                                        database.deleteObjectStore(database.objectStoreNames[i]);
                                    }

                                    database.createObjectStore(that.stores.meta.name, { keyPath: that.stores.meta.keyPath, autoIncrement: false }).createIndex(that.stores.meta.keyPath, that.stores.meta.keyPath, { unique: true });

                                    database.createObjectStore(that.stores.history.name, { keyPath: that.stores.history.keyPath, autoIncrement: false }).createIndex('date', 'date', { unique: false });

                                    database.createObjectStore(that.stores.log.name, { keyPath: that.stores.log.keyPath, autoIncrement: true }).createIndex('date', 'date', { unique: false });

                                    database.createObjectStore(that.stores.server.name, { keyPath: that.stores.server.keyPath, autoIncrement: false }).createIndex(that.stores.server.keyPath, that.stores.server.keyPath, { unique: true });
                                } catch (err) {
                                    !noRetry && that.initdb_(1000);
                                }
                            };

                            request.onsuccess = function () {
                                try  {
                                    var database = this.result;

                                    that.checkdb_(database, that.version_, function () {
                                        that.database_ = database;
                                        that.state_ = 0 /* open */;
                                        that.conExtend();

                                        that.digestTask_();

                                        that.nowRetrying = false;
                                    }, function () {
                                        !noRetry && that.initdb_();
                                    });
                                } catch (err) {
                                    database.close();
                                    !noRetry && that.initdb_(1000);
                                }
                            };

                            request.onerror = function (event) {
                                that.closedb(4 /* error */);
                                try  {
                                    this.result.close();
                                    !noRetry && setTimeout(function () {
                                        return that.opendb(null, true);
                                    }, 1000);
                                } catch (err) {
                                    !noRetry && that.initdb_(1000);
                                }
                            };
                        } catch (err) {
                            that.closedb(4 /* error */);
                            !noRetry && that.initdb_(1000);
                        }
                    };

                    DB.prototype.closedb = function (state) {
                        if (typeof state === "undefined") { state = 7 /* close */; }
                        this.database_ = null;
                        this.state_ = state;

                        var database = this.database_;
                        database && database.close && database.close();
                    };

                    DB.prototype.deletedb_ = function () {
                        this.closedb();
                        var IDBFactory = this.IDBFactory;
                        IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
                    };

                    DB.prototype.conExtend = function () {
                        this.conExpires_ = new Date().getTime() + this.conAge_;
                    };

                    DB.prototype.initdb_ = function (delay) {
                        var _this = this;
                        var retry = function () {
                            if (!_this.nowRetrying) {
                                _this.nowRetrying = true;
                                _this.deletedb_();
                            }
                            _this.opendb(null, true);
                        };

                        !delay ? retry() : void setTimeout(retry, delay);
                    };

                    DB.prototype.checkdb_ = function (database, version, success, upgrade) {
                        var that = this;

                        var req = database.transaction(that.stores.meta.name, 'readwrite').objectStore(that.stores.meta.name).get(that.metaNames.version);
                        req.onsuccess = function () {
                            // version check
                            var data = this.result;
                            if (!data || that.upgrade_) {
                                this.source.put({ id: that.metaNames.version, value: version });
                            } else if (data.value !== version) {
                                return void upgrade();
                            }

                            if (that.refresh_) {
                                var req = database.transaction(that.stores.meta.name, 'readwrite').objectStore(that.stores.meta.name).get(that.metaNames.update);
                                req.onsuccess = function () {
                                    // refresh check
                                    var data = this.result;
                                    var days = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
                                    if (!data) {
                                        this.source.put({ id: that.metaNames.update, value: days + that.refresh_ });
                                    } else if (data.value <= days) {
                                        return void upgrade();
                                    }
                                    success();
                                };
                            } else {
                                success();
                            }
                        };
                    };

                    DB.prototype.reserveTask_ = function (task) {
                        (this.state() !== 4 /* error */ || this.tasks_.length < 100) && this.tasks_.push(task);
                    };

                    DB.prototype.digestTask_ = function (limit) {
                        if (typeof limit === "undefined") { limit = 0; }
                        ++limit;
                        var task;
                        while (task = limit-- && this.tasks_.pop()) {
                            task();
                        }
                    };
                    return DB;
                })();
                DATA.DB = DB;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var Cookie = (function () {
                    function Cookie(age_) {
                        this.age_ = age_;
                    }
                    Cookie.prototype.getCookie = function (key) {
                        if (!key || !window.navigator.cookieEnabled) {
                            return;
                        }

                        var reg = new RegExp('(?:^|; )(' + encodeURIComponent(key) + '=[^;]*)'), data = (document.cookie.match(reg) || []).pop();

                        return data && decodeURIComponent(data.split('=').pop());
                    };

                    Cookie.prototype.setCookie = function (key, value, option) {
                        if (typeof option === "undefined") { option = {}; }
                        if (!key || !window.navigator.cookieEnabled) {
                            return;
                        }

                        option.age = option.age || this.age_;
                        document.cookie = [
                            encodeURIComponent(key) + '=' + encodeURIComponent(value),
                            option.age ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
                            option.secure ? '; secure' : ''
                        ].join('');
                        return this.getCookie(key);
                    };
                    return Cookie;
                })();
                DATA.Cookie = Cookie;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var Main = (function () {
                    function Main() {
                        this.DB = new DATA.DB();
                        this.Cookie = new DATA.Cookie(10 * 24 * 60 * 60);
                    }
                    return Main;
                })();
                DATA.Main = Main;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/* MODEL */
var MODULE;
(function (MODULE) {
    (function (LIBRARY) {
        var Utility = (function () {
            function Utility() {
            }
            /* string */
            Utility.trim = function (text) {
                text = 'string' === typeof text ? text : String(0 === text && text.toString() || '');
                if (text.trim) {
                    text = text.trim();
                } else if (text = text.replace(/^[\s\uFEFF\xA0]+/, '')) {
                    var regSpace = /[\s\uFEFF\xA0]/;
                    var i = text.length, r = i % 8;
                    DUFF:
                     {
                        while (r--) {
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                        }
                        while (i) {
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                        }
                    }

                    text = text.substring(0, i + 1);
                }
                return text;
            };

            Utility.repeat = function (arg, size) {
                switch (arg instanceof Array && 'array' || typeof arg) {
                    case 'string':
                        var text = arg;
                        return Array(size + 1).join(text);
                    case 'array':
                        var len = arg.length;
                        if (size < 300) {
                            var arr = Array(size);
                            this.duff(-size, function (i) {
                                return arr[i] = arg[i % len];
                            });
                        } else {
                            var arr = arg.slice();
                            while (arr.length * 2 <= size) {
                                arr = arr.concat(arr);
                            }
                            arr = arr.concat(arr.slice(0, size - arr.length));
                        }
                        return arr;
                }
            };

            /* function */
            Utility.fire = function (fn, context, args, async) {
                if (typeof context === "undefined") { context = window; }
                if (typeof args === "undefined") { args = []; }
                if ('function' === typeof fn) {
                    return async ? setTimeout(function () {
                        fn.apply(context || window, args);
                    }, 0) : fn.apply(context || window, args);
                } else {
                    return fn;
                }
            };

            Utility.duff = function (loop, proc) {
                if (loop < 0) {
                    var i = -loop, r = i % 8;
                    while (r--) {
                        proc(--i);
                    }
                    while (i) {
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                    }
                } else {
                    var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                    while (r--) {
                        proc(i++);
                    }
                    while (q--) {
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                    }
                }
            };

            Utility.duffEx = function (loop, proc) {
                if (loop < 0) {
                    var i = -loop, r = i % 8;
                    DUFF:
                     {
                        while (r--) {
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                        }
                        while (i) {
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                        }
                    }
                } else {
                    var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                    DUFF:
                     {
                        while (r--) {
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                        }
                        while (q--) {
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                        }
                    }
                }
            };

            /* other */
            Utility.normalizeUrl = function (url, transparent) {
                if (typeof transparent === "undefined") { transparent = true; }
                var ret;

                // Trim
                ret = this.trim(url);

                // Convert to absolute path
                ret = /^([^:/?#]+):\/\/[^/?#.]+\.[^/?#]+/i.test(ret) ? ret : (function (url, a) {
                    a.href = url;
                    return a.href;
                })(ret, document.createElement('a'));

                // Convert to UTF-8 encoded string
                ret = encodeURI(decodeURI(ret));

                // Remove string of starting with an invalid character
                ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');

                // Fix case of percent encoding
                ret = transparent ? this.justifyPercentEncodingUrlCase_(url, ret) : ret;

                return ret;
            };

            Utility.canonicalizeUrl = function (url) {
                var ret = this.normalizeUrl(url, false);

                // Fix case of percent encoding
                ret = ret.replace(/(?:%\w{2})+/g, replaceLowerToUpper);
                function replaceLowerToUpper(str) {
                    return str.toUpperCase();
                }
                return ret;
            };

            Utility.compareUrl = function (first, second, canonicalize) {
                if (canonicalize) {
                    first = this.canonicalizeUrl(first);
                    second = this.canonicalizeUrl(second);
                }

                // URLのパーセントエンコーディングの大文字小文字がAndroidのアドレスバーとリンクで異なるためそろえる
                return first === this.justifyPercentEncodingUrlCase_(first, second);
            };

            Utility.justifyPercentEncodingUrlCase_ = function (base, target) {
                return base === target ? target : target.replace(/(?:%\w{2})+/g, replace);
                function replace(str) {
                    var i = ~base.indexOf(str.toUpperCase()) || ~base.indexOf(str.toLowerCase());
                    return i ? base.substr(~i, str.length) : str;
                }
            };
            return Utility;
        })();
        LIBRARY.Utility = Utility;
    })(MODULE.LIBRARY || (MODULE.LIBRARY = {}));
    var LIBRARY = MODULE.LIBRARY;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var Data = (function () {
                function Data(model_, app_) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.data_ = new APP.DATA.Main();
                    this.stores = this.data_.DB.stores;
                }
                Data.prototype.opendb = function (setting) {
                    var _this = this;
                    setting.database = false;
                    this.data_.DB.opendb(function () {
                        _this.saveTitleToDB(setting.origLocation.href, document.title);
                        _this.saveScrollPositionToDB(setting.origLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                        setting.database = true;
                    });
                };

                Data.prototype.loadBuffers = function (limit) {
                    if (typeof limit === "undefined") { limit = 0; }
                    for (var i in this.stores) {
                        this.stores[i].loadBuffer(limit);
                    }
                };

                Data.prototype.saveBuffers = function () {
                    for (var i in this.stores) {
                        this.stores[i].saveBuffer();
                    }
                };

                Data.prototype.loadTitleFromDB = function (unsafe_url) {
                    var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url)), that = this;

                    var data = this.data_.DB.stores.history.getBuffer(keyUrl);

                    if (data && 'string' === typeof data.title) {
                        document.title = data.title;
                    } else {
                        this.data_.DB.stores.history.get(keyUrl, function () {
                            data = this.result;
                            if (data && data.title) {
                                if (MODEL.Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(window.location.href)))) {
                                    document.title = data.title;
                                }
                            }
                        });
                    }
                };

                Data.prototype.saveTitleToDB = function (unsafe_url, title) {
                    var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url));

                    var value = { id: keyUrl, title: title, date: new Date().getTime() };
                    this.data_.DB.stores.history.setBuffer(value, true);
                    this.data_.DB.stores.history.set(value);
                    this.data_.DB.stores.history.clean();
                };

                Data.prototype.loadScrollPositionFromDB = function (unsafe_url) {
                    var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url)), that = this;

                    var data = this.data_.DB.stores.history.getBuffer(keyUrl);
                    function scroll(scrollX, scrollY) {
                        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) {
                            return;
                        }

                        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
                    }

                    if (data && 'number' === typeof data.scrollX) {
                        scroll(data.scrollX, data.scrollY);
                    } else {
                        this.data_.DB.stores.history.get(keyUrl, function () {
                            data = this.result;
                            if (data && 'number' === typeof data.scrollX) {
                                if (MODEL.Util.compareUrl(keyUrl, that.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(window.location.href)))) {
                                    scroll(data.scrollX, data.scrollY);
                                }
                            }
                        });
                    }
                };

                Data.prototype.saveScrollPositionToDB = function (unsafe_url, scrollX, scrollY) {
                    var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url));

                    var value = { id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
                    this.data_.DB.stores.history.setBuffer(value, true);
                    this.data_.DB.stores.history.set(value);
                };

                Data.prototype.loadExpiresFromDB = function (keyUrl) {
                };

                Data.prototype.saveExpiresToDB = function (keyUrl, host, expires) {
                    var value = { id: keyUrl, host: host, expires: expires };
                    this.data_.DB.stores.history.setBuffer(value, true);
                    this.data_.DB.stores.history.set(value);
                };

                Data.prototype.loadLogFromDB = function () {
                };

                Data.prototype.saveLogToDB = function (host, performance) {
                    var log = {
                        host: host,
                        performance: performance,
                        date: new Date().getTime()
                    };

                    this.data_.DB.stores.log.addBuffer(log);
                    this.data_.DB.stores.log.add(log);
                    this.data_.DB.stores.log.clean();
                };

                Data.prototype.loadServerFromDB = function () {
                };

                Data.prototype.saveServerToDB = function (host, state, unsafe_url, expires) {
                    if (typeof state === "undefined") { state = 0; }
                    if (typeof expires === "undefined") { expires = 0; }
                    var value = { id: host || '', state: state };
                    this.data_.DB.stores.server.accessRecord(host, function () {
                        var data = this.result;
                        if (!data || !state) {
                            // 新規または正常登録
                            this.source.put(value);
                        } else if (data.state) {
                            // 2回目のエラーで登録削除
                            this.source['delete'](host);
                        }
                    });
                    if (unsafe_url) {
                        this.saveExpiresToDB(unsafe_url, host, expires);
                    }
                };

                Data.prototype.getCookie = function (key) {
                    return this.data_.Cookie.getCookie(key);
                };

                Data.prototype.setCookie = function (key, value, option) {
                    return this.data_.Cookie.setCookie(key, value, option);
                };
                return Data;
            })();
            APP.Data = Data;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var Balance = (function () {
                function Balance(model_, app_) {
                    var _this = this;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.host_ = '';
                    this.host = function () {
                        return _this.host_;
                    };
                }
                Balance.prototype.check = function (setting) {
                    return setting.balance.self && !!Number(this.app_.data.getCookie(setting.balance.client.cookie.balance));
                };

                Balance.prototype.enable = function (setting) {
                    if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
                        return void this.disable(setting);
                    }

                    if (Number(!this.app_.data.setCookie(setting.balance.client.cookie.balance, '1'))) {
                        return void this.disable(setting);
                    }
                    if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
                        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '1');
                    }
                };

                Balance.prototype.disable = function (setting) {
                    this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
                    this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
                    this.changeServer(null, setting);
                };

                Balance.prototype.changeServer = function (host, setting) {
                    if (typeof setting === "undefined") { setting = this.model_.getGlobalSetting(); }
                    if (!this.check(setting)) {
                        return;
                    }

                    host = host || '';

                    this.host_ = host;
                    this.app_.data.setCookie(setting.balance.client.cookie.host, host);
                };

                Balance.prototype.chooseServer = function (setting) {
                    if (!this.check(setting)) {
                        return;
                    }

                    // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用させる
                    var expires;
                    var historyBufferData = this.app_.data.stores.history.getBuffer(this.model_.convertUrlToKeyUrl(setting.destLocation.href));

                    expires = historyBufferData && historyBufferData.expires;
                    if (expires && expires >= new Date().getTime()) {
                        this.changeServer(historyBufferData.host, setting);
                        return;
                    }

                    // ログから最適なサーバーを選択する
                    var logBuffer = this.app_.data.stores.log.getBuffer(), timeList = [], logTable = [], now = new Date().getTime();

                    if (!logBuffer) {
                        host = this.app_.data.getCookie(setting.balance.client.cookie.host);
                        if (host) {
                            this.enable(setting);
                            this.changeServer(host);
                        } else {
                            this.disable(setting);
                        }
                        return;
                    }
                    var time;
                    for (var i in logBuffer) {
                        if (now > logBuffer[i].date + setting.balance.log.expires) {
                            continue;
                        }
                        timeList.push(logBuffer[i].performance);
                        logTable[logBuffer[i].performance] = logBuffer[i];
                    }

                    function compareNumbers(a, b) {
                        return a - b;
                    }
                    timeList = timeList.sort(compareNumbers).slice(0, 15);
                    var serverBuffer = this.app_.data.stores.server.getBuffer();

                    if (!serverBuffer) {
                        this.disable(setting);
                        return;
                    }
                    var host = '', time;
                    while (timeList.length) {
                        r = Math.floor(Math.random() * timeList.length);
                        time = timeList[r];
                        timeList.splice(r, 1);

                        host = logTable[time].host.split('//').pop() || '';
                        if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
                            continue;
                        }
                        if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
                            continue;
                        }
                        this.changeServer(host, setting);
                        return;
                    }

                    // サーバーリストからランダムにサーバーを選択する
                    var hosts = Object.keys(serverBuffer), host, r;
                    while (hosts.length) {
                        r = Math.floor(Math.random() * hosts.length);
                        host = hosts[r];
                        hosts.splice(r, 1);

                        if (serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
                            continue;
                        }
                        this.changeServer(host, setting);
                        return;
                    }

                    this.disable(setting);
                };
                return Balance;
            })();
            APP.Balance = Balance;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var mode;

            var PageUtility = (function () {
                function PageUtility() {
                }
                PageUtility.prototype.createHTMLDocument = function (html, uri) {
                    var _this = this;
                    html = html || '<title></title>';
                    var test = function (mode_) {
                        try  {
                            mode = mode_;
                            var html = '<html lang="en" class="html"><head><title>&amp;</title><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>', doc = _this.createHTMLDocument(html, '');
                            switch (false) {
                                case !!doc:
                                case doc.URL && decodeURI(doc.URL) === decodeURI(uri || window.location.href):
                                case doc.title === '&':
                                case !!doc.querySelector('html.html[lang="en"]'):
                                case !!doc.querySelector('head>link')['href']:
                                case !!doc.querySelector('head>noscript')['innerHTML']:
                                case !!doc.querySelector('body>noscript')['innerHTML']:
                                case !!doc.querySelector('body>a')['href']:
                                    throw true;
                            }
                            return true;
                        } catch (err) {
                            mode = null;
                            return false;
                        }
                    };
                    function manipulate(doc, html) {
                        var wrapper = document.createElement('div');
                        wrapper.innerHTML = html.match(/<html(?:\s.*?[^\\])?>|$/i).shift().replace(/html/i, 'div') || '<div>';
                        var attrs = wrapper.firstChild.attributes;
                        for (var i = 0, attr; attr = attrs[i]; i++) {
                            doc.documentElement.setAttribute(attr.name, attr.value);
                        }
                        var wrapper = document.createElement('html');
                        wrapper.innerHTML = html.replace(/^.*?<html(?:\s.*?[^\\])?>/im, '');
                        doc.documentElement.removeChild(doc.head);
                        doc.documentElement.removeChild(doc.body);
                        while (wrapper.childNodes.length) {
                            doc.documentElement.appendChild(wrapper.childNodes[0]);
                        }
                        return doc;
                    }
                    ;

                    var backup = window.location.href;
                    uri && window.history.replaceState(window.history.state, document.title, uri);

                    var doc;
                    switch (mode) {
                        case 'dom':
                            if ('function' === typeof window.DOMParser) {
                                doc = new window.DOMParser().parseFromString(html, 'text/html');
                            }
                            break;

                        case 'doc':
                            if (document.implementation && document.implementation.createHTMLDocument) {
                                doc = document.implementation.createHTMLDocument('');

                                // IE, Operaクラッシュ対策
                                if ('object' !== typeof doc.activeElement || !doc.activeElement) {
                                    break;
                                }

                                // titleプロパティの値をChromeで事後に変更できなくなったため事前に設定する必要がある
                                if ('function' === typeof window.DOMParser && new window.DOMParser().parseFromString('', 'text/html')) {
                                    doc.title = new window.DOMParser().parseFromString(html.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>/i), 'text/html').title;
                                }
                                doc.open();
                                doc.write(html);
                                doc.close();
                                if (doc.title !== doc.querySelector('title').textContent) {
                                    doc.title = doc.querySelector('title').textContent;
                                }
                            }
                            break;

                        case 'manipulate':
                            if (document.implementation && document.implementation.createHTMLDocument) {
                                doc = manipulate(document.implementation.createHTMLDocument(''), html);
                            }
                            break;

                        case null:
                            doc = null;
                            break;

                        default:
                            switch (/webkit|firefox|trident|$/i.exec(window.navigator.userAgent.toLowerCase()).shift()) {
                                case 'webkit':
                                    test('doc') || test('dom') || test('manipulate');
                                    break;
                                case 'firefox':
                                    test('dom') || test('doc') || test('manipulate');
                                    break;
                                case 'trident':
                                    test('manipulate') || test('dom') || test('doc');
                                    break;
                                default:
                                    test('dom') || test('doc') || test('manipulate');
                            }
                            doc = this.createHTMLDocument(html, uri);
                            break;
                    }

                    uri && window.history.replaceState(window.history.state, document.title, backup);
                    return doc;
                };

                PageUtility.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    areas = areas instanceof Array ? areas : [areas];

                    var i = -1, area;
                    AREA:
                    while (area = areas[++i]) {
                        var options = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                        var j = -1;
                        while (options[++j]) {
                            if (!jQuery(options[j], srcDocument).length || !jQuery(options[j], dstDocument).length) {
                                continue AREA;
                            }
                        }
                        return area;
                    }
                };

                PageUtility.prototype.movePageNormally = function (event) {
                    switch (event.type.toLowerCase()) {
                        case 'click':
                            window.location.assign(event.currentTarget.href);
                            break;
                        case 'submit':
                            switch (event.currentTarget.method.toUpperCase()) {
                                case 'GET':
                                    window.location.assign(event.currentTarget.action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
                                    break;
                                case 'POST':
                                    window.location.assign(event.currentTarget.action);
                                    break;
                            }
                            break;
                        case 'popstate':
                            window.location.reload();
                            break;
                    }
                };

                PageUtility.prototype.calAge = function (jqXHR) {
                    var age;

                    switch (true) {
                        case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
                            return 0;
                        case !!~String(jqXHR.getResponseHeader('Cache-Control')).indexOf('max-age='):
                            return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
                        case !!String(jqXHR.getResponseHeader('Expires')):
                            return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
                        default:
                            return 0;
                    }
                };

                PageUtility.prototype.calExpires = function (jqXHR) {
                    return new Date().getTime() + this.calAge(jqXHR);
                };

                PageUtility.prototype.dispatchEvent_ = function (target, eventType, bubbling, cancelable) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent(eventType, bubbling, cancelable);
                    target.dispatchEvent(event);
                };

                PageUtility.prototype.wait_ = function (ms) {
                    var defer = jQuery.Deferred();
                    if (!ms) {
                        return defer.resolve();
                    }

                    setTimeout(function () {
                        defer.resolve();
                    }, ms);
                    return defer;
                };
                return PageUtility;
            })();
            APP.PageUtility = PageUtility;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var PageFetch = (function (_super) {
                __extends(PageFetch, _super);
                function PageFetch(model_, app_, setting_, event_, register_, cache_, done_, fail_) {
                    _super.call(this);
                    this.model_ = model_;
                    this.app_ = app_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.register_ = register_;
                    this.cache_ = cache_;
                    this.done_ = done_;
                    this.fail_ = fail_;
                    this.main_();
                }
                PageFetch.prototype.main_ = function () {
                    var that = this, setting = this.setting_, event = this.event_ = jQuery.extend(true, {}, this.event_), register = this.register_, cache = this.cache_, globalXHR = this.model_.getGlobalXHR(), wait = MODEL.Util.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && (speed.fire = event.timeStamp);
                    speedcheck && speed.time.splice(0, 100, 0);
                    speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

                    this.app_.page.isScrollPosSavable = false;
                    setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

                    function done(ajax, wait) {
                        that.data_ = ajax[0];
                        that.textStatus_ = ajax[1];
                        that.jqXHR_ = ajax[2];
                        MODEL.Util.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(ajax));
                    }
                    function fail(jqXHR, textStatus, errorThrown) {
                        that.jqXHR_ = jqXHR;
                        that.textStatus_ = textStatus;
                        that.errorThrown_ = errorThrown;
                        MODEL.Util.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(arguments));
                    }
                    function always() {
                        MODEL.Util.fire(setting.callbacks.ajax.always, this, [event, setting.param].concat(arguments));
                        that.model_.setGlobalXHR(null);

                        if (that.model_.isDeferrable) {
                            if (that.data_) {
                                that.done_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
                            } else {
                                that.fail_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
                            }
                        }
                    }
                    function success(data, textStatus, jqXHR) {
                        that.data_ = data;
                        that.textStatus_ = textStatus;
                        that.jqXHR_ = jqXHR;
                        MODEL.Util.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
                    }
                    function error(jqXHR, textStatus, errorThrown) {
                        that.jqXHR_ = jqXHR;
                        that.textStatus_ = textStatus;
                        that.errorThrown_ = errorThrown;
                        MODEL.Util.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
                    }
                    function complete(jqXHR, textStatus) {
                        MODEL.Util.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);
                        that.model_.setGlobalXHR(null);

                        if (!that.model_.isDeferrable) {
                            if (that.data_) {
                                that.done_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
                            } else {
                                that.fail_(setting, event, register, that.cache_, that.data_, that.textStatus_, that.jqXHR_, that.errorThrown_, that.host_);
                            }
                        }
                    }

                    this.dispatchEvent_(document, setting.gns + ':fetch', false, true);

                    if (cache && cache.jqXHR) {
                        // cache
                        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                        setting.loadtime = 0;
                        this.model_.setGlobalXHR(null);
                        this.host_ = cache.host || '';
                        this.data_ = cache.jqXHR.responseText;
                        this.textStatus_ = cache.textStatus;
                        this.jqXHR_ = cache.jqXHR;
                        if (this.model_.isDeferrable) {
                            jQuery.when(jQuery.Deferred().resolve([that.data_, that.textStatus_, that.jqXHR_]), this.wait_(wait)).done(done).fail(fail).always(always);
                        } else {
                            var context = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
                            context = context.context || context;
                            success.call(context, that.data_, that.textStatus_, that.jqXHR_);
                            complete.call(context, that.jqXHR_, that.textStatus_);
                        }
                    } else if (globalXHR && globalXHR.follow && 'abort' !== globalXHR.statusText && 'error' !== globalXHR.statusText) {
                        // preload
                        speedcheck && speed.time.splice(0, 1, globalXHR.timeStamp - speed.fire);
                        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                        this.host_ = globalXHR.host || '';
                        setting.loadtime = globalXHR.timeStamp;
                        var wait = setting.wait && isFinite(globalXHR.timeStamp) ? Math.max(wait - new Date().getTime() + globalXHR.timeStamp, 0) : 0;
                        jQuery.when(globalXHR, that.wait_(wait)).done(done).fail(fail).always(always);
                    } else {
                        // default
                        setting.loadtime = event.timeStamp;
                        var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};

                        this.app_.balance.chooseServer(setting);
                        this.host_ = setting.balance.self && this.app_.balance.host().split('//').pop() || '';
                        requestLocation.host = this.host_ || setting.destLocation.host;
                        ajax.url = !setting.server.query ? requestLocation.href : [
                            requestLocation.protocol,
                            '//',
                            requestLocation.host,
                            '/' === requestLocation.pathname.charAt(0) ? requestLocation.pathname : '/' + requestLocation.pathname,
                            (1 < requestLocation.search.length ? requestLocation.search + '&' : '?') + setting.server.query,
                            requestLocation.hash
                        ].join('');
                        switch (event.type.toLowerCase()) {
                            case 'click':
                                ajax.type = 'GET';
                                break;

                            case 'submit':
                                ajax.type = event.currentTarget.method.toUpperCase();
                                switch (ajax.type) {
                                    case 'POST':
                                        if (!jQuery(event.currentTarget).has(':file').length) {
                                            ajax.data = jQuery(event.currentTarget).serializeArray();
                                        } else if ('function' === typeof FormData) {
                                            ajax.data = new FormData(event.currentTarget);
                                            ajax.contentType = false;
                                            ajax.processData = false;
                                        }
                                        break;
                                    case 'GET':
                                        break;
                                }
                                break;

                            case 'popstate':
                                ajax.type = 'GET';
                                break;
                        }

                        callbacks = {
                            xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
                                var jqXHR;
                                jqXHR = MODEL.Util.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
                                jqXHR = 'object' === typeof jqXHR && jqXHR || jQuery.ajaxSettings.xhr();

                                //if (jqXHR instanceof Object && jqXHR instanceof window.XMLHttpRequest && 'onprogress' in jqXHR) {
                                //  jqXHR.addEventListener('progress', function(event) {dataSize = event.loaded;}, false);
                                //}
                                return jqXHR;
                            },
                            beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (jqXHR, ajaxSetting) {
                                if (setting.server.header) {
                                    jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
                                }
                                if ('object' === typeof setting.server.header) {
                                    jqXHR.setRequestHeader(setting.nss.requestHeader, 'true');
                                    setting.server.header.area && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
                                    setting.server.header.head && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                                    setting.server.header.css && jqXHR.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                                    setting.server.header.script && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
                                }

                                MODEL.Util.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
                            },
                            dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                                return MODEL.Util.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
                            },
                            success: success,
                            error: error,
                            complete: complete
                        };

                        ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

                        globalXHR = this.model_.setGlobalXHR(jQuery.ajax(ajax));

                        if (this.model_.isDeferrable) {
                            jQuery.when(globalXHR, that.wait_(wait)).done(done).fail(fail).always(always);
                        }
                    }
                };
                return PageFetch;
            })(APP.PageUtility);
            APP.PageFetch = PageFetch;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var PageUpdate = (function (_super) {
                __extends(PageUpdate, _super);
                function PageUpdate(model_, app_, setting_, event_, register_, cache_, data_, textStatus_, jqXHR_, errorThrown_, host_) {
                    _super.call(this);
                    this.model_ = model_;
                    this.app_ = app_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.register_ = register_;
                    this.cache_ = cache_;
                    this.data_ = data_;
                    this.textStatus_ = textStatus_;
                    this.jqXHR_ = jqXHR_;
                    this.errorThrown_ = errorThrown_;
                    this.host_ = host_;
                    this.loadwaits_ = [];
                    this.main_();
                }
                PageUpdate.prototype.main_ = function () {
                    var that = this, app = this.app_, setting = this.setting_, event = this.event_, register = this.register_, cache = this.cache_;

                    var setting = this.setting_, event = this.event_, register = this.register_, data = this.data_, textStatus = this.textStatus_, jqXHR = this.jqXHR_;
                    var callbacks_update = setting.callbacks.update;

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');

                    UPDATE:
                     {
                        setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
                        setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;

                        if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                            return this.model_.fallback(event, setting);
                        }

                        try  {
                            app.page.landing = null;
                            if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) {
                                throw new Error("throw: content-type mismatch");
                            }

                            /* variable define */
                            this.srcDocument_ = this.createHTMLDocument(jqXHR.responseText, setting.destLocation.href);
                            this.dstDocument_ = document;

                            // 更新範囲を選出
                            setting.area = this.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
                            if (!setting.area) {
                                throw new Error('throw: area notfound');
                            }

                            // 更新範囲をセレクタごとに分割
                            setting.areas = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);

                            // キャッシュを設定
                            if (this.isCacheUsable_(setting, event)) {
                                this.model_.setCache(setting.destLocation.href, cache && cache.data || null, this.textStatus_, this.jqXHR_);
                                cache = this.model_.getCache(setting.destLocation.href);
                                this.cache_ = cache;
                            }

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

                            this.checkRedirect_();

                            this.dispatchEvent_(window, setting.gns + ':unload', false, true);

                            this.updateUrl_();

                            this.model_.setGlobalSetting(jQuery.extend(true, {}, setting, { origLocation: setting.destLocation.cloneNode() }));

                            this.updateDocument_();
                        } catch (err) {
                            if (!err) {
                                return;
                            }

                            this.cache_ && this.model_.removeCache(setting.destLocation.href);

                            this.model_.fallback(event, setting);
                        }
                        ;
                    }
                    ;
                };

                PageUpdate.prototype.isCacheUsable_ = function (setting, event) {
                    switch (true) {
                        case !setting.cache.click && !setting.cache.submit && !setting.cache.popstate:
                        case 'submit' === event.type.toLowerCase() && !setting.cache[event.currentTarget.method.toLowerCase()]:
                            return false;
                        default:
                            return true;
                    }
                };

                PageUpdate.prototype.checkRedirect_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, register = this.register_;
                    var callbacks_update = setting.callbacks.update;

                    if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_).length) {
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                    ;

                    var redirect = setting.destLocation.cloneNode();
                    redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
                    switch (true) {
                        case !setting.redirect:
                        case redirect.protocol !== setting.destLocation.protocol:
                        case redirect.host !== setting.destLocation.host:
                        case 'submit' === event.type.toLowerCase() && 'GET' !== event.currentTarget.method.toUpperCase():
                            switch (event.type.toLowerCase()) {
                                case 'click':
                                case 'submit':
                                    window.location.assign(redirect.href);
                                    break;
                                case 'popstate':
                                    window.location.replace(redirect.href);
                                    break;
                            }
                            throw false;

                        default:
                            jQuery[MODULE.NAME].enable();
                            switch (event.type.toLowerCase()) {
                                case 'click':
                                case 'submit':
                                    setTimeout(function () {
                                        return jQuery[MODULE.NAME].click(redirect.href);
                                    }, 0);
                                    break;
                                case 'popstate':
                                    window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                                    if (register && setting.fix.location) {
                                        jQuery[MODULE.NAME].disable();
                                        window.history.back();
                                        window.history.forward();
                                        jQuery[MODULE.NAME].enable();
                                    }
                                    setTimeout(function () {
                                        return _this.dispatchEvent_(window, 'popstate', false, false);
                                    }, 0);
                                    break;
                            }
                            throw false;
                    }

                    if (MODEL.Util.fire(callbacks_update.redirect.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.updateUrl_ = function () {
                    var setting = this.setting_, event = this.event_, register = this.register_;
                    var callbacks_update = setting.callbacks.update;

                    if (MODEL.Util.fire(callbacks_update.url.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                    ;

                    register && window.history.pushState(MODEL.Util.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]), window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title, setting.destLocation.href);

                    if (register && setting.fix.location) {
                        jQuery[MODULE.NAME].disable();
                        window.history.back();
                        window.history.forward();
                        jQuery[MODULE.NAME].enable();
                    }

                    // verify
                    if (MODEL.Util.compareUrl(setting.destLocation.href, MODEL.Util.normalizeUrl(window.location.href))) {
                        setting.retriable = true;
                    } else if (setting.retriable) {
                        setting.retriable = false;
                        setting.destLocation.href = MODEL.Util.normalizeUrl(window.location.href);
                        new PageUpdate(this.model_, this.app_, setting, event, false, setting.cache[event.type.toLowerCase()] && this.model_.getCache(setting.destLocation.href), this.data_, this.textStatus_, this.jqXHR_, this.errorThrown_, this.host_);
                        throw false;
                    } else {
                        throw new Error('throw: location mismatch');
                    }

                    if (MODEL.Util.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.updateDocument_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;

                    this.overwriteDocumentByCache_();

                    setting.fix.noscript && this.escapeNoscript_(this.srcDocument_);

                    this.rewrite_();

                    this.title_();
                    this.head_();

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

                    this.loadwaits_ = this.area_();

                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

                    this.balance_();

                    this.css_('link[rel~="stylesheet"], style');
                    jQuery(window).one(setting.gns + ':rendering', function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        var onready = function (callback) {
                            _this.dispatchEvent_(document, setting.gns + ':ready', false, true);

                            MODEL.Util.fire(setting.callback, null, [event, setting.param, _this.data_, _this.textStatus_, _this.jqXHR_]);

                            return jQuery.when ? _this.waitRender_(jQuery.Deferred().resolve) : _this.waitRender_(callback);
                        };

                        var onrender = function (callback) {
                            setTimeout(function () {
                                _this.app_.page.isScrollPosSavable = true;
                                if ('popstate' !== event.type.toLowerCase()) {
                                    _this.scrollByHash_(setting.destLocation.hash) || _this.scroll_(true);
                                } else {
                                    _this.scroll_(true);
                                }
                            }, 100);

                            _this.dispatchEvent_(document, setting.gns + ':render', false, true);

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');

                            return jQuery.when ? jQuery.when.apply(jQuery, _this.loadwaits_) : callback();
                        };

                        var onload = function () {
                            _this.dispatchEvent_(window, setting.gns + ':load', false, true);

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

                            speedcheck && console.log(speed.time);
                            speedcheck && console.log(speed.name);

                            _this.script_('[src][defer]');

                            // 未定義を返すとエラー
                            return jQuery.when && jQuery.Deferred();
                        };

                        _this.scroll_(false);
                        var scriptwaits = _this.script_(':not([defer]), :not([src])');

                        if (jQuery.when) {
                            // 1.7.2のthenは壊れてるのでpipe
                            var then = jQuery.Deferred().pipe ? 'pipe' : 'then';
                            jQuery.when.apply(jQuery, scriptwaits)[then](function () {
                                return onready();
                            }, function () {
                                return onready();
                            })[then](function () {
                                return onrender();
                            }, function () {
                                return onrender();
                            })[then](function () {
                                return onload();
                            }, function () {
                                return onload();
                            });
                        } else {
                            onready(function () {
                                return onrender(function () {
                                    return onload();
                                });
                            });
                        }
                    }).trigger(setting.gns + ':rendering');
                };

                PageUpdate.prototype.overwriteDocumentByCache_ = function () {
                    var setting = this.setting_, event = this.event_, cache = this.cache_;

                    if (!this.isCacheUsable_(setting, event)) {
                        return;
                    }

                    if (cache && cache.data) {
                        var html = setting.fix.noscript ? this.restoreNoscript_(cache.data) : cache.data, cacheDocument = this.createHTMLDocument(html, setting.destLocation.href), srcDocument = this.srcDocument_;

                        srcDocument.title = cacheDocument.title;

                        var $srcAreas, $dstAreas;
                        for (var i = 0; setting.areas[i]; i++) {
                            $srcAreas = jQuery(setting.areas[i], cacheDocument).clone();
                            $dstAreas = jQuery(setting.areas[i], srcDocument);
                            if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                                throw new Error('throw: area mismatch');
                            }

                            for (var j = 0; $srcAreas[j]; j++) {
                                $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                            }
                        }
                    }
                };

                PageUpdate.prototype.rewrite_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.rewrite) {
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) {
                        return;
                    }

                    MODEL.Util.fire(setting.rewrite, null, [this.srcDocument_, setting.area, this.host_]);

                    if (MODEL.Util.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.title_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (MODEL.Util.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }

                    this.dstDocument_.title = this.srcDocument_.title;
                    setting.database && setting.fix.history && this.app_.data.saveTitleToDB(setting.destLocation.href, this.srcDocument_.title);

                    if (MODEL.Util.fire(callbacks_update.title.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.head_ = function () {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.load.head) {
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.head.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }

                    var prefilter = 'base, meta, link', $srcElements = jQuery(srcDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'), $dstElements = jQuery(dstDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'), $addElements = jQuery(), $delElements = $dstElements;

                    for (var i = 0, element, selector; element = $srcElements[i]; i++) {
                        for (var j = 0; $delElements[j]; j++) {
                            if ($delElements[j].tagName === element.tagName && $delElements[j].outerHTML === element.outerHTML) {
                                if ($addElements.length) {
                                    var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
                                    ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
                                    $addElements = jQuery();
                                }
                                $delElements = $delElements.not($delElements[j]);
                                element = null;
                                break;
                            }
                        }
                        $addElements = $addElements.add(element);
                    }
                    jQuery('title', dstDocument).before($addElements.clone());
                    $delElements.remove();

                    if (MODEL.Util.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.area_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    var checker, loadwaits = [];

                    if (MODEL.Util.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return loadwaits;
                    }

                    function map() {
                        var defer = jQuery.Deferred();
                        jQuery(this).one('load error', defer.resolve);
                        return defer;
                    }

                    jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
                    checker = jQuery('<div/>', {
                        'class': setting.nss.class4html + '-check',
                        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
                    }).text(setting.gns);

                    var $srcAreas, $dstAreas;
                    for (var i = 0; setting.areas[i]; i++) {
                        $srcAreas = jQuery(setting.areas[i], srcDocument).clone();
                        $dstAreas = jQuery(setting.areas[i], dstDocument);
                        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                            throw new Error('throw: area mismatch');
                        }

                        $srcAreas.find('script').each(function (i, elem) {
                            return _this.escapeScript_(elem);
                        });
                        if (jQuery.when) {
                            loadwaits = loadwaits.concat($srcAreas.find('img, iframe, frame').map(map).get());
                        }

                        for (var j = 0; $srcAreas[j]; j++) {
                            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                        }

                        $dstAreas = jQuery(setting.areas[i], dstDocument);
                        $dstAreas.append(checker.clone());
                        $dstAreas.find('script').each(function (i, elem) {
                            return _this.restoreScript_(elem);
                        });
                    }
                    this.dispatchEvent_(document, setting.gns + ':DOMContentLoaded', false, true);

                    if (MODEL.Util.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return loadwaits;
                    }

                    return loadwaits;
                };

                PageUpdate.prototype.balance_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.balance.self || !setting.loadtime) {
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) {
                        return;
                    }

                    var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || '').split('//').pop();
                    this.app_.data.saveLogToDB(host, Math.ceil(setting.loadtime / (this.jqXHR_.responseText.length || 1) * 1e5));
                    this.app_.data.saveServerToDB(host, 0, setting.destLocation.href, this.calExpires(this.jqXHR_));
                    this.app_.balance.chooseServer(setting);

                    this.app_.data.loadBuffers(setting.buffer.limit);

                    if (MODEL.Util.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.css_ = function (selector) {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.load.css) {
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.css.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }

                    var prefilter = 'link, style', $srcElements = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)), $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)), $addElements = jQuery(), $delElements = $dstElements;

                    function filterHeadContent() {
                        return jQuery.contains(srcDocument.head, this);
                    }
                    function filterBodyContent() {
                        return jQuery.contains(srcDocument.body, this);
                    }

                    for (var i = 0, element; element = $srcElements[i]; i++) {
                        for (var j = 0, isSameElement; $delElements[j]; j++) {
                            switch (element.tagName.toLowerCase()) {
                                case 'link':
                                    isSameElement = element.href === $delElements[j].href;
                                    break;
                                case 'style':
                                    isSameElement = element.innerHTML.trim() === $delElements[j].innerHTML.trim();
                                    break;
                            }
                            if (isSameElement) {
                                if ($addElements.length) {
                                    if (jQuery.contains(dstDocument.body, $delElements[j]) && $addElements.first().parents('head').length) {
                                        jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                                        $delElements.eq(j).before($addElements.filter(filterBodyContent).clone());
                                    } else {
                                        var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
                                        ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
                                    }
                                    $addElements = jQuery();
                                }
                                $delElements = $delElements.not($delElements[j]);
                                j -= Number(!!j);
                                element = null;
                                break;
                            }
                        }
                        $addElements = $addElements.add(element);
                    }
                    jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                    jQuery(dstDocument.body).append($addElements.filter(filterBodyContent).clone());
                    $delElements.remove();

                    if (MODEL.Util.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return;
                    }

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
                };

                PageUpdate.prototype.script_ = function (selector) {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    var scriptwaits = [];

                    if (!setting.load.script) {
                        return scriptwaits;
                    }

                    if (MODEL.Util.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return scriptwaits;
                    }

                    var prefilter = 'script', $scriptElements = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)), $execElements = jQuery(), loadedScripts = this.app_.page.loadedScripts, regType = /^$|(?:application|text)\/(?:java|ecma)script/i, regRemove = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                    for (var i = 0, element; element = $scriptElements[i]; i++) {
                        if (!regType.test(element.type || '')) {
                            continue;
                        }
                        if (element.hasAttribute('src') ? loadedScripts[element.src] : !element.innerHTML.trim()) {
                            continue;
                        }

                        LOG:
                         {
                            var srcLogParent = jQuery(element).parent(setting.load.log)[0];
                            if (!srcLogParent || jQuery(element).parents(setting.area).length) {
                                break LOG;
                            }

                            var dstLogParent = jQuery(srcLogParent.id || srcLogParent.tagName, dstDocument)[0], log = element.cloneNode(true);
                            this.escapeScript_(log);
                            dstLogParent.appendChild(log);
                            this.restoreScript_(log);
                        }
                        ;

                        if (this.model_.isDeferrable) {
                            (function (defer, element) {
                                if (element.hasAttribute('src')) {
                                    if (!element.getAttribute('src')) {
                                        return;
                                    }
                                    if (element.hasAttribute('async')) {
                                        jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: true, global: false })).done(function () {
                                            return _this.dispatchEvent_(element, 'load', false, true);
                                        }).fail(function () {
                                            return _this.dispatchEvent_(element, 'error', false, true);
                                        });
                                    } else {
                                        jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, dataType: 'text', async: true, global: false })).done(function () {
                                            return defer.resolve([element, arguments[0]]);
                                        }).fail(function () {
                                            return defer.resolve([element, new Error()]);
                                        });
                                        scriptwaits.push(defer);
                                    }
                                } else {
                                    defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]);
                                    scriptwaits.push(defer);
                                }
                            })(jQuery.Deferred(), element);
                        } else {
                            if (element.hasAttribute('src')) {
                                if (!element.getAttribute('src')) {
                                    continue;
                                }
                                $execElements = $execElements.add(element);
                            } else {
                                $execElements = $execElements.add(element);
                            }
                        }
                    }

                    try  {
                        if (this.model_.isDeferrable) {
                            jQuery.when.apply(jQuery, scriptwaits).always(function () {
                                for (var i = 0, len = arguments.length; i < len; i++) {
                                    var result = arguments[i], element = result[0], response = result[1];

                                    if (element.src) {
                                        loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                                    }
                                    if ('string' === typeof response) {
                                        eval.call(window, response);
                                        element.hasAttribute('src') && _this.dispatchEvent_(element, 'load', false, true);
                                    } else {
                                        element.hasAttribute('src') && _this.dispatchEvent_(element, 'error', false, true);
                                    }
                                }
                            });
                        } else {
                            for (var i = 0, element; element = $execElements[i]; i++) {
                                if (element.hasAttribute('src')) {
                                    if (element.src) {
                                        loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                                    }
                                    (function (element) {
                                        jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: element.hasAttribute('async'), global: false }, {
                                            success: function () {
                                                return _this.dispatchEvent_(element, 'load', false, true);
                                            },
                                            error: function () {
                                                return _this.dispatchEvent_(element, 'error', false, true);
                                            }
                                        }));
                                    })(element);
                                } else {
                                    eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
                                }
                            }
                        }
                    } catch (err) {
                        setTimeout(function () {
                            return _this.model_.fallback(event, setting);
                        }, 50);
                        throw err;
                        return;
                    }

                    if (MODEL.Util.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        return scriptwaits;
                    }

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');

                    return scriptwaits;
                };

                PageUpdate.prototype.scroll_ = function (call) {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (MODEL.Util.fire(callbacks_update.scroll.before, null, [event, setting.param]) === false) {
                        return;
                    }

                    var scrollX, scrollY;
                    switch (event.type.toLowerCase()) {
                        case 'click':
                        case 'submit':
                            scrollX = call && 'function' === typeof setting.scrollLeft ? MODEL.Util.fire(setting.scrollLeft, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollLeft;
                            scrollX = 0 <= scrollX ? scrollX : 0;
                            scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

                            scrollY = call && 'function' === typeof setting.scrollTop ? MODEL.Util.fire(setting.scrollTop, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollTop;
                            scrollY = 0 <= scrollY ? scrollY : 0;
                            scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

                            (jQuery(window).scrollTop() === scrollY && jQuery(window).scrollLeft() === scrollX) || window.scrollTo(scrollX, scrollY);
                            call && setting.database && this.app_.page.isScrollPosSavable && setting.fix.scroll && this.app_.data.saveScrollPositionToDB(setting.destLocation.href, scrollX, scrollY);
                            break;
                        case 'popstate':
                            call && setting.fix.scroll && setting.database && this.app_.data.loadScrollPositionFromDB(setting.destLocation.href);
                            break;
                    }

                    if (MODEL.Util.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.waitRender_ = function (callback) {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    var areas = jQuery(setting.area), checker = areas.children('.' + setting.nss.class4html + '-check'), limit = new Date().getTime() + 5 * 1000;

                    function filterChecker() {
                        return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
                    }

                    var check = function () {
                        switch (true) {
                            case !MODEL.Util.compareUrl(setting.destLocation.href, MODEL.Util.normalizeUrl(window.location.href)):
                                break;
                            case new Date().getTime() > limit:
                            case checker.length !== areas.length:
                            case checker.length === checker.filter(filterChecker).length:
                                checker.remove();
                                callback();
                                break;
                            default:
                                setTimeout(check, 100);
                        }
                    };
                    check();

                    return jQuery.when && callback;
                };

                PageUpdate.prototype.scrollByHash_ = function (hash) {
                    hash = '#' === hash.charAt(0) ? hash.slice(1) : hash;
                    if (!hash) {
                        return false;
                    }

                    var $hashTargetElement = jQuery('#' + (hash ? hash : ', [name~=' + hash + ']')).first();
                    if ($hashTargetElement.length) {
                        isFinite($hashTargetElement.offset().top) && window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
                        return true;
                    } else {
                        return false;
                    }
                };

                PageUpdate.prototype.escapeNoscript_ = function (srcDocument) {
                    jQuery('noscript', srcDocument).children().parent().each(eachNoscript);
                    function eachNoscript() {
                        jQuery(this).text(this.innerHTML);
                    }
                };

                PageUpdate.prototype.restoreNoscript_ = function (html) {
                    var $span = jQuery('<span/>');
                    return html.replace(/(<noscript>)([^<>]+?)(<\/noscript>)/gim, function ($0, $1, $2, $3) {
                        return $1 + $span.html($2).text() + $3;
                    });
                };

                PageUpdate.prototype.escapeScript_ = function (script) {
                    jQuery.data(script, 'source', script.src);
                    jQuery.data(script, 'code', script.innerHTML);
                    script.removeAttribute('src');
                    script.innerHTML = '';
                };

                PageUpdate.prototype.restoreScript_ = function (script) {
                    if (undefined === jQuery.data(script, 'code')) {
                        return;
                    }

                    script.innerHTML = ' ';

                    if (jQuery.data(script, 'source')) {
                        script.src = jQuery.data(script, 'source');
                        jQuery.removeData(script, 'source');
                    } else {
                        script.removeAttribute('src');
                    }

                    script.innerHTML = jQuery.data(script, 'code');
                    jQuery.removeData(script, 'code');
                };
                return PageUpdate;
            })(APP.PageUtility);
            APP.PageUpdate = PageUpdate;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.fetch.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var Page = (function (_super) {
                __extends(Page, _super);
                function Page(model_, app_) {
                    var _this = this;
                    _super.call(this);
                    this.model_ = model_;
                    this.app_ = app_;
                    this.landing = MODEL.Util.normalizeUrl(window.location.href);
                    this.recent = { order: [], data: {}, size: 0 };
                    this.loadedScripts = {};
                    this.isScrollPosSavable = true;
                    setTimeout(function () {
                        return _this.createHTMLDocument('', '') || _this.model_.disable();
                    }, 50);
                }
                Page.prototype.transfer = function (setting, event, register, cache) {
                    var _this = this;
                    var done = function (setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host) {
                        _this.update(setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
                    };
                    var fail = function (setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host) {
                        if (setting.fallback && 'abort' !== textStatus) {
                            if (setting.balance.self) {
                                _this.app_.balance.disable(setting);
                            }
                            _this.model_.fallback(event, setting);
                        }
                    };

                    this.fetch(setting, event, register, cache, done, fail);
                };

                Page.prototype.fetch = function (setting, event, register, cache, done, fail) {
                    new APP.PageFetch(this.model_, this.app_, setting, event, register, cache, done, fail);
                };

                Page.prototype.update = function (setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host) {
                    new APP.PageUpdate(this.model_, this.app_, setting, event, register, cache, data, textStatus, jqXHR, errorThrown, host);
                };
                return Page;
            })(APP.PageUtility);
            APP.Page = Page;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.balance.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var Main = (function () {
                function Main(model_, controller_) {
                    this.model_ = model_;
                    this.controller_ = controller_;
                    this.balance = new APP.Balance(this.model_, this);
                    this.page = new APP.Page(this.model_, this);
                    this.data = new APP.Data(this.model_, this);
                }
                Main.prototype.initialize = function ($context, setting) {
                    var _this = this;
                    var loadedScripts = this.page.loadedScripts;
                    setting.load.script && jQuery('script').each(function () {
                        var element = this;
                        if (element.src) {
                            loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                        }
                    });

                    new MODULE.View(this.model_, this.controller_, $context, setting);
                    setTimeout(function () {
                        return _this.data.loadBuffers(setting.buffer.limit);
                    }, setting.buffer.delay);
                    setting.balance.self && setTimeout(function () {
                        return _this.balance.enable(setting);
                    }, setting.buffer.delay);
                    setTimeout(function () {
                        return _this.page.landing = null;
                    }, 1500);
                };

                Main.prototype.configure = function (option, origURL, destURL) {
                    var that = this;

                    origURL = MODEL.Util.normalizeUrl(origURL || option.origLocation.href);
                    destURL = MODEL.Util.normalizeUrl(destURL || option.destLocation.href);
                    option = jQuery.extend(true, {}, option.option || option);

                    option = option.scope ? jQuery.extend(true, {}, option, scope(option, origURL, destURL) || { cancel: true }) : jQuery.extend(true, {}, option);
                    MODULE.FREEZE(option, true);

                    var initial = {
                        area: 'body',
                        link: 'a:not([target])',
                        // this.protocolはIEでエラー
                        filter: function () {
                            return /^https?:/.test(this.href) && /(\/[^.]*|\.html?|\.php)$/.test('/' + this.pathname);
                        },
                        form: null,
                        scope: null,
                        rewrite: null,
                        state: null,
                        scrollTop: 0,
                        scrollLeft: 0,
                        ajax: { dataType: 'text' },
                        contentType: 'text/html',
                        cache: {
                            click: false, submit: false, popstate: false, get: true, post: true, mix: 0,
                            limit: 100 /* pages */ , size: 1 * 1024 * 1024 /* 1MB */ , expires: { max: null, min: 5 * 60 * 1000 /* 5min */  }
                        },
                        buffer: {
                            limit: 30,
                            delay: 500
                        },
                        load: {
                            head: '',
                            css: false,
                            script: false,
                            execute: true,
                            log: 'head, body',
                            reload: '',
                            ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
                            ajax: { dataType: 'script', cache: true }
                        },
                        balance: {
                            self: false,
                            weight: 3,
                            client: {
                                support: {
                                    userAgent: /msie|trident.+ rv:|chrome|firefox|safari/i,
                                    redirect: /chrome|firefox|safari/i
                                },
                                exclude: /mobile|phone|android|iphone|blackberry/i,
                                cookie: {
                                    balance: 'ajax_balanceable',
                                    redirect: 'ajax_redirectable',
                                    host: 'ajax_host'
                                }
                            },
                            server: {
                                header: 'X-Ajax-Host',
                                filter: null,
                                error: 10 * 60 * 1000
                            },
                            log: {
                                expires: 10 * 24 * 60 * 60 * 1000,
                                limit: 30
                            },
                            option: {
                                server: {
                                    header: false
                                },
                                ajax: {
                                    crossDomain: true
                                },
                                callbacks: {
                                    ajax: {
                                        beforeSend: null
                                    }
                                }
                            }
                        },
                        callback: null,
                        callbacks: {
                            ajax: {},
                            update: { redirect: {}, rewrite: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
                        },
                        param: null,
                        redirect: true,
                        wait: 0,
                        scroll: { delay: 300 },
                        fix: {
                            location: true,
                            history: true,
                            scroll: true,
                            noscript: true,
                            reset: false
                        },
                        fallback: true,
                        database: true,
                        server: {
                            query: 'pjax=1',
                            header: true
                        }
                    }, force = {
                        ns: undefined,
                        nss: undefined,
                        speedcheck: undefined,
                        cancel: undefined,
                        origLocation: undefined,
                        destLocation: undefined,
                        gns: MODULE.NAME,
                        areas: [],
                        scroll: { queue: [] },
                        loadtime: null,
                        retriable: true,
                        option: option
                    }, compute = function () {
                        setting.ns = setting.ns && setting.ns.split('.').sort().join('.') || '';
                        var nsArray = [setting.gns || MODULE.NAME].concat(setting.ns && String(setting.ns).split('.') || []);
                        var query = setting.server.query;
                        switch (query && typeof query) {
                            case 'string':
                                query = eval('({' + query.replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]*)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
                            case 'object':
                                query = jQuery.param(query);
                                break;
                        }
                        return {
                            gns: undefined,
                            ns: undefined,
                            areas: undefined,
                            scroll: undefined,
                            loadtime: undefined,
                            retriable: undefined,
                            option: undefined,
                            speedcheck: undefined,
                            cancel: undefined,
                            nss: {
                                name: setting.ns || '',
                                array: nsArray,
                                event: nsArray.join('.'),
                                data: nsArray.join('-'),
                                class4html: nsArray.join('-'),
                                click: ['click'].concat(nsArray.join(':')).join('.'),
                                submit: ['submit'].concat(nsArray.join(':')).join('.'),
                                popstate: ['popstate'].concat(nsArray.join(':')).join('.'),
                                scroll: ['scroll'].concat(nsArray.join(':')).join('.'),
                                requestHeader: ['X', nsArray[0].replace(/^\w/, function (str) {
                                        return str.toUpperCase();
                                    })].join('-')
                            },
                            origLocation: (function (url, a) {
                                a.href = url;
                                return a;
                            })(origURL, document.createElement('a')),
                            destLocation: (function (url, a) {
                                a.href = url;
                                return a;
                            })(destURL, document.createElement('a')),
                            fix: !/android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? { location: false, reset: false } : {},
                            contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
                            server: {
                                query: query
                            },
                            timeStamp: new Date().getTime()
                        };
                    };

                    var setting;
                    setting = jQuery.extend(true, initial, option);
                    setting = jQuery.extend(true, setting, setting.balance.self && setting.balance.option, force);
                    setting = jQuery.extend(true, setting, compute());

                    return MODULE.SEAL(setting, true);

                    function scope(setting, origURL, destURL, rewriteKeyUrl) {
                        if (typeof rewriteKeyUrl === "undefined") { rewriteKeyUrl = ''; }
                        var origKeyUrl, destKeyUrl, scpTable = setting.scope, dirs, scpKeys, scpKey, scpTag, patterns, inherit, hit_src, hit_dst, option;

                        origKeyUrl = that.model_.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
                        destKeyUrl = that.model_.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
                        rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');

                        scpKeys = (rewriteKeyUrl || destKeyUrl).replace(/^\/|\/$/g, '').split('/');
                        if (rewriteKeyUrl) {
                            if (!~rewriteKeyUrl.indexOf('*')) {
                                return undefined;
                            }
                            dirs = [];
                            var arr = origKeyUrl.replace(/^\/|\/$/g, '').split('/');
                            for (var i = 0, len = scpKeys.length; i < len; i++) {
                                '*' === scpKeys[i] && dirs.push(arr[i]);
                            }
                        }

                        for (var i = scpKeys.length + 1; i--;) {
                            inherit = option = hit_src = hit_dst = undefined;
                            scpKey = scpKeys.slice(0, i).join('/');
                            scpKey = '/' + scpKey + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(scpKey.length + 1) ? '/' : '');

                            if (!scpKey || !(scpKey in scpTable)) {
                                continue;
                            }

                            if (scpTable[scpKey] instanceof Array) {
                                scpTag = '';
                                patterns = scpTable[scpKey];
                            } else {
                                scpTag = scpTable[scpKey];
                                patterns = scpTable[scpTag];
                            }

                            if (!patterns || !patterns.length) {
                                return false;
                            }

                            patterns = patterns.concat();
                            for (var j = 0, pattern; pattern = patterns[j]; j++) {
                                if (hit_src === false || hit_dst === false) {
                                    break;
                                }

                                if ('#' === pattern[0]) {
                                    scpTag = pattern.slice(1);
                                    [].splice.apply(patterns, [j, 1].concat(scpTable[scpTag]));
                                    pattern = patterns[j];
                                }

                                if ('inherit' === pattern) {
                                    inherit = true;
                                } else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
                                    var rewrite = scope.apply(this, [].slice.call(arguments).slice(0, 3).concat([MODEL.Util.fire(scpTable.rewrite, null, [destKeyUrl])]));
                                    if (rewrite) {
                                        hit_src = hit_dst = true;
                                        option = rewrite;
                                        break;
                                    } else if (false === rewrite) {
                                        return false;
                                    }
                                } else if ('string' === typeof pattern) {
                                    var not = '!' === pattern[0];
                                    pattern = not ? pattern.slice(1) : pattern;
                                    var reg = '*' === pattern[0];
                                    pattern = reg ? pattern.slice(1) : pattern;

                                    if (rewriteKeyUrl && ~pattern.indexOf('/*/')) {
                                        for (var k = 0, len = dirs.length; k < len; k++) {
                                            pattern = pattern.replace('/*/', '/' + dirs[k] + '/');
                                        }
                                    }

                                    if (reg ? !origKeyUrl.search(pattern) : !origKeyUrl.indexOf(pattern)) {
                                        if (not) {
                                            return false;
                                        } else {
                                            hit_src = true;
                                        }
                                    }
                                    if (reg ? !destKeyUrl.search(pattern) : !destKeyUrl.indexOf(pattern)) {
                                        if (not) {
                                            return false;
                                        } else {
                                            hit_dst = true;
                                            option = scpTable['$' + scpTag] || scpTable['$' + pattern] || null;
                                        }
                                    }
                                }
                            }

                            if (hit_src && hit_dst) {
                                return jQuery.extend(true, {}, setting, option);
                            }
                            if (inherit) {
                                continue;
                            }
                            break;
                        }
                    }
                };
                return Main;
            })();
            APP.Main = Main;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        MODEL.App = MODEL.APP.Main;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.call(this, -1 /* initiate */);
                this.controller_ = new MODULE.Controller(this);
                this.app_ = new MODEL.App(this, this.controller_);
                this.isDeferrable = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'));
                this.queue = [];
            }
            Main.prototype.host = function () {
                return this.app_.balance.host();
            };
            Main.prototype.state = function () {
                return this.state_;
            };

            Main.prototype.main_ = function ($context, option) {
                var _this = this;
                switch (typeof option) {
                    case 'object':
                        $context = $context instanceof MODULE.NAMESPACE ? $context : jQuery(document)[MODULE.NAME]();
                        MODULE.FREEZE(option, true);
                        break;

                    default:
                        return $context;
                }

                var setting = this.app_.configure(option, window.location.href, window.location.href);
                this.setGlobalSetting(setting);
                setting.database && this.app_.data.opendb(setting);

                this.speed = {
                    fire: 0,
                    time: [],
                    name: [],
                    now: function () {
                        return new Date().getTime();
                    }
                };

                //$context._uuid = setting.uuid;
                if ('pushState' in window.history && window.history['pushState']) {
                    jQuery(function () {
                        _this.app_.initialize($context, setting);
                        _this.state_ = _this.state() === -1 /* initiate */ ? 0 /* open */ : _this.state();
                    });
                }

                return $context;
            };

            Main.prototype.convertUrlToKeyUrl = function (unsafe_url) {
                return unsafe_url.replace(/#.*/, '');
            };

            Main.prototype.isImmediateLoadable = function (param, setting) {
                if (0 /* open */ !== this.state()) {
                    return;
                }

                var origURL = MODEL.Util.normalizeUrl(window.location.href), destURL, event;
                switch (typeof param) {
                    case 'string':
                        event = null;
                        destURL = MODEL.Util.normalizeUrl(param);
                        break;
                    case 'object':
                        event = param;
                        switch (event.type.toLowerCase()) {
                            case 'click':
                                destURL = MODEL.Util.normalizeUrl(event.currentTarget.href);
                                if (!jQuery(event.currentTarget).filter(setting.filter).length) {
                                    return false;
                                }
                                break;
                            case 'submit':
                                destURL = MODEL.Util.normalizeUrl(event.currentTarget.action);
                                break;
                            case 'popstate':
                                return true;
                        }
                        if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                            return false;
                        }
                        break;
                }
                var origLocation = jQuery('<a/>', { href: origURL })[0], destLocation = jQuery('<a/>', { href: destURL })[0];

                if (origLocation.protocol !== destLocation.protocol || origLocation.host !== destLocation.host) {
                    return false;
                }

                setting = setting || this.app_.configure(this.getGlobalSetting(), origLocation.href, destLocation.href);
                if (setting.cancel) {
                    return;
                }
                if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) {
                    return false;
                }
                if (!this.app_.page.chooseArea(setting.area, document, document)) {
                    return false;
                }

                return true;
            };

            Main.prototype.getGlobalSetting = function () {
                return this.app_.page.globalSetting;
            };
            Main.prototype.setGlobalSetting = function (setting) {
                return this.app_.page.globalSetting = setting;
            };

            Main.prototype.getGlobalXHR = function () {
                return this.app_.page.globalXHR;
            };
            Main.prototype.setGlobalXHR = function (xhr) {
                this.app_.page.globalXHR && this.app_.page.globalXHR.readyState < 4 && this.app_.page.globalXHR.abort();
                return this.app_.page.globalXHR = xhr;
            };

            Main.prototype.click = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(this.getGlobalSetting(), window.location.href, context.href);

                    if (0 /* open */ !== this.state() || setting.cancel || event.isDefaultPrevented()) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    if (setting.cache.mix && this.getCache(setting.destLocation.href)) {
                        break PROCESS;
                    }
                    setting.database && this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                    var cache;
                    if (setting.cache[event.type.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    this.app_.page.transfer(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                    event.preventDefault();
                    return;
                }
                ;

                // clickメソッド用
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event, setting);
            };

            Main.prototype.submit = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(this.getGlobalSetting(), window.location.href, context.action);

                    if (0 /* open */ !== this.state() || setting.cancel || event.isDefaultPrevented()) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
                    setting.destLocation.href = MODEL.Util.normalizeUrl(serializedURL);
                    if (setting.cache.mix && this.getCache(setting.destLocation.href)) {
                        break PROCESS;
                    }
                    setting.database && this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                    var cache;
                    if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    this.app_.page.transfer(setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                    event.preventDefault();
                    return;
                }
                ;

                // submitメソッド用
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event, setting);
            };

            Main.prototype.popstate = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var setting = this.app_.configure(this.getGlobalSetting(), null, window.location.href);
                    if (this.app_.page.landing && this.app_.page.landing === MODEL.Util.normalizeUrl(window.location.href)) {
                        return;
                    }
                    if (setting.origLocation.href === setting.destLocation.href) {
                        return;
                    }

                    if (0 /* open */ !== this.state() || setting.cancel) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    if (setting.origLocation.hash !== setting.destLocation.hash && setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
                        break PROCESS;
                    }

                    setting.database && setting.fix.history && this.app_.data.loadTitleFromDB(setting.destLocation.href);

                    var cache;
                    if (setting.cache[event.type.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    this.app_.page.transfer(setting, event, false, cache);
                    return;
                }
                ;
            };

            Main.prototype.scroll = function (event, end) {
                var _this = this;
                var setting = this.getGlobalSetting();
                if (0 /* open */ !== this.state() || event.isDefaultPrevented()) {
                    return;
                }

                if (!setting.scroll.delay) {
                    this.app_.page.isScrollPosSavable && this.app_.data.saveScrollPositionToDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                } else {
                    var id;
                    while (id = this.queue.shift()) {
                        clearTimeout(id);
                    }
                    id = setTimeout(function () {
                        while (id = _this.queue.shift()) {
                            clearTimeout(id);
                        }
                        _this.app_.page.isScrollPosSavable && _this.app_.data.saveScrollPositionToDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                    }, setting.scroll.delay);
                    this.queue.push(id);
                }
            };

            Main.prototype.fallback = function (event, setting) {
                switch (true) {
                    case !setting.fallback:
                    case false === MODEL.Util.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]):
                        break;
                    default:
                        this.app_.page.movePageNormally(event);
                }
            };

            Main.prototype.enable = function () {
                this.state_ = 0 /* open */;
            };

            Main.prototype.disable = function () {
                this.state_ = 1 /* pause */;
            };

            Main.prototype.getCache = function (unsafe_url) {
                var setting = this.getGlobalSetting(), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return null;
                }

                var secure_url = this.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url));
                unsafe_url = null;

                recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
                recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
                return recent.data[secure_url];
            };

            Main.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR, host) {
                var _this = this;
                var setting = this.getGlobalSetting(), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return this;
                }

                var cache, size, timeStamp, expires;

                var secure_url = this.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(unsafe_url));
                unsafe_url = null;

                recent.order.unshift(secure_url);
                for (var i = 1, key; key = recent.order[i]; i++) {
                    if (secure_url === key) {
                        recent.order.splice(i, 1);
                    }
                }

                if (setting.cache.limit && recent.order.length > setting.cache.limit || setting.cache.size && recent.size > setting.cache.size) {
                    this.cleanCache();
                }

                cache = this.getCache(secure_url);
                if (!data && !jqXHR && (!cache || !cache.data && !cache.jqXHR)) {
                    return;
                }

                var html = (jqXHR || {}).responseText || '';
                size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
                timeStamp = new Date().getTime();
                expires = (function (timeStamp) {
                    var expires = setting.cache.expires, age;
                    if (!setting.cache.expires) {
                        return 0;
                    }
                    if (recent.data[secure_url] && !jqXHR) {
                        return recent.data[secure_url].expires;
                    }

                    age = jqXHR && _this.app_.page.calAge(jqXHR) || Number(setting.cache.expires);

                    age = Math.max(age, 0) || 0;
                    age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.min ? Math.max(setting.cache.expires.min, age) : age;
                    age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.max ? Math.min(setting.cache.expires.max, age) : age;
                    return timeStamp + age;
                })(timeStamp);
                recent.size = recent.size || 0;
                recent.size += recent.data[secure_url] ? 0 : size;
                recent.data[secure_url] = jQuery.extend(true, {}, cache, {
                    jqXHR: jqXHR,
                    textStatus: textStatus,
                    data: data,
                    size: size,
                    expires: expires,
                    host: host || '',
                    timeStamp: timeStamp
                });
                if (!recent.data[secure_url].data && !recent.data[secure_url].jqXHR) {
                    this.removeCache(secure_url);
                }
                if (jqXHR || cache && cache.jqXHR) {
                    var title = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
                    setting.database && setting.fix.history && this.app_.data.saveTitleToDB(secure_url, title);
                }
            };

            Main.prototype.removeCache = function (param) {
                var setting = this.getGlobalSetting(), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return;
                }

                switch (typeof param) {
                    case 'string':
                        var secure_url = this.convertUrlToKeyUrl(MODEL.Util.normalizeUrl(param));
                        param = null;

                        for (var i = 0, key; key = recent.order[i]; i++) {
                            if (secure_url === key) {
                                this.removeCache(i);
                                break;
                            }
                        }
                        break;

                    case 'number':
                        var i = param, key = recent.order[i];
                        recent.order.splice(i, 1);
                        recent.size -= recent.data[key].size;
                        recent.data[key] = null;
                        delete recent.data[key];
                        break;
                }
            };

            Main.prototype.clearCache = function () {
                var setting = this.getGlobalSetting(), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return;
                }

                while (recent.order.length) {
                    this.removeCache(~-recent.order.length);
                }
            };

            Main.prototype.cleanCache = function () {
                var setting = this.getGlobalSetting(), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return;
                }

                for (var i = recent.order.length, now = new Date().getTime(), url; url = recent.order[--i];) {
                    if (now > recent.data[url].expires) {
                        this.removeCache(url);
                    }
                }
                while (setting.cache.limit && recent.order.length > setting.cache.limit || setting.cache.size && recent.size > setting.cache.size) {
                    this.removeCache(~-recent.order.length);
                }
            };

            Main.prototype.getRequestDomain = function () {
                return this.host();
            };

            Main.prototype.setRequestDomain = function (host) {
                return this.app_.balance.changeServer(host.split('//').pop(), null);
            };
            return Main;
        })(MODEL.Template);
        MODEL.Main = Main;

        MODEL.Util = MODULE.LIBRARY.Utility;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.Model = MODULE.MODEL.Main;
})(MODULE || (MODULE = {}));
/// <reference path="model/main.ts"/>
/// <reference path="view/main.ts"/>
/// <reference path="controller/main.ts"/>
var Module = (function () {
    function Module() {
        new MODULE.Model();
    }
    return Module;
})();

new Module();
})(window, window.document, void 0, jQuery);
