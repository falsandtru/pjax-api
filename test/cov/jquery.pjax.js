/**
 * 
 * jquery-pjax
 * 
 * @name jquery-pjax
 * @version 2.29.2
 * ---
 * @author falsandtru https://github.com/falsandtru/jquery-pjax
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
    var DEF;
    (function (DEF) {
        DEF.NAME = 'pjax';
        DEF.NAMESPACE = jQuery;
    })(DEF = MODULE.DEF || (MODULE.DEF = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    // State
    (function (State) {
        State[State["blank"] = 0] = "blank";
        State[State["initiate"] = 1] = "initiate";
        State[State["open"] = 2] = "open";
        State[State["pause"] = 3] = "pause";
        State[State["lock"] = 4] = "lock";
        State[State["seal"] = 5] = "seal";
        State[State["error"] = 6] = "error";
        State[State["crash"] = 7] = "crash";
        State[State["terminate"] = 8] = "terminate";
        State[State["close"] = 9] = "close";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;
    // Event
    MODULE.EVENT = {
        PJAX: MODULE.DEF.NAME.toLowerCase(),
        CLICK: 'click',
        SUBMIT: 'submit',
        POPSTATE: 'popstate',
        SCROLL: 'scroll'
    };
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    // Macro
    function MIXIN(baseClass, mixClasses) {
        var baseClassPrototype = baseClass.prototype;
        mixClasses = mixClasses.reverse();
        for (var iMixClasses = mixClasses.length; iMixClasses--;) {
            var mixClassPrototype = mixClasses[iMixClasses].prototype;
            for (var iProperty in mixClassPrototype) {
                if ('constructor' === iProperty || !baseClassPrototype[iProperty] || !mixClassPrototype.hasOwnProperty(iProperty)) {
                    continue;
                }
                baseClassPrototype[iProperty] = mixClassPrototype[iProperty];
            }
        }
    }
    MODULE.MIXIN = MIXIN;
    function UUID() {
        // version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, gen);
        function gen(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }
    }
    MODULE.UUID = UUID;
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
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var Template = (function () {
            function Template(state) {
                /**
                 * 拡張モジュール名。ネームスペースにこの名前のプロパティでモジュールが追加される。
                 *
                 * @property NAME
                 * @type String
                 */
                this.NAME = MODULE.DEF.NAME;
                /**
                 * ネームスペース。ここにモジュールが追加される。
                 *
                 * @property NAMESPACE
                 * @type Window|JQuery
                 */
                this.NAMESPACE = MODULE.DEF.NAMESPACE;
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Modelの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                this.state_ = state;
            }
            Template.prototype.MAIN = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return this.main_.apply(this, [context].concat(args));
            };
            Template.prototype.main_ = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return context;
            };
            return Template;
        })();
        MODEL.Template = Template;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* VIEW */
var MODULE;
(function (MODULE) {
    var VIEW;
    (function (VIEW) {
        var Template = (function () {
            function Template(state) {
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Viewの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                this.state_ = state;
            }
            return Template;
        })();
        VIEW.Template = Template;
    })(VIEW = MODULE.VIEW || (MODULE.VIEW = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* VIEW */
var MODULE;
(function (MODULE) {
    var VIEW;
    (function (VIEW) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_, controller_, context_, setting) {
                var _this = this;
                _super.call(this, 1 /* initiate */);
                this.model_ = model_;
                this.controller_ = controller_;
                this.context_ = context_;
                // VIEWの待ち受けるイベントに登録されるハンドラ
                this.handlers = {
                    click: function () {
                        _this.controller_.click(arguments);
                    },
                    submit: function () {
                        _this.controller_.submit(arguments);
                    },
                    popstate: function () {
                        _this.controller_.popstate(arguments);
                    },
                    scroll: function () {
                        _this.controller_.scroll(arguments);
                    }
                };
                MODULE.FREEZE(this);
                this.observe_(setting);
            }
            Main.prototype.observe_ = function (setting) {
                this.release_(setting);
                this.context_.delegate(setting.link, setting.nss.event.click, this.handlers.click).delegate(setting.form, setting.nss.event.submit, this.handlers.submit);
                jQuery(window).bind(setting.nss.event.popstate, this.handlers.popstate);
                setting.database && setting.fix.scroll && jQuery(window).bind(setting.nss.event.scroll, this.handlers.scroll);
                return this;
            };
            Main.prototype.release_ = function (setting) {
                this.context_.undelegate(setting.link, setting.nss.event.click).undelegate(setting.form, setting.nss.event.submit);
                jQuery(window).unbind(setting.nss.event.popstate);
                setting.database && setting.fix.scroll && jQuery(window).unbind(setting.nss.event.scroll);
                return this;
            };
            return Main;
        })(VIEW.Template);
        VIEW.Main = Main;
    })(VIEW = MODULE.VIEW || (MODULE.VIEW = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.View = MODULE.VIEW.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Functions = (function () {
            function Functions() {
                MODULE.FREEZE(this);
            }
            Functions.prototype.enable = function () {
                MODULE.Model.singleton().enable();
                return this;
            };
            Functions.prototype.disable = function () {
                MODULE.Model.singleton().disable();
                return this;
            };
            Functions.prototype.click = function (url, attrs) {
                var $anchor;
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
                var setting = MODULE.Model.singleton().configure($anchor[0]);
                setting && $anchor.first().one(setting.nss.event.click, function () { return MODULE.Controller.singleton().click(arguments); }).click();
                return this;
            };
            Functions.prototype.submit = function (url, attrs, data) {
                var $form, df = document.createDocumentFragment(), type, $element;
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
                var setting = MODULE.Model.singleton().configure($form[0]);
                setting && $form.first().one(setting.nss.event.submit, function () { return MODULE.Controller.singleton().submit(arguments); }).submit();
                return this;
            };
            Functions.prototype.getCache = function (url) {
                if (url === void 0) { url = window.location.href; }
                var cache = MODULE.Model.singleton().getCache(url);
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
                if (url === void 0) { url = window.location.href; }
                switch (arguments.length) {
                    case 0:
                        return this.setCache(url, document.documentElement.outerHTML);
                    case 1:
                        return this.setCache(url, null);
                    case 2:
                    case 3:
                    case 4:
                    default:
                        MODULE.Model.singleton().setCache(url, data, textStatus, jqXHR);
                }
                return this;
            };
            Functions.prototype.removeCache = function (url) {
                if (url === void 0) { url = window.location.href; }
                MODULE.Model.singleton().removeCache(url);
                return this;
            };
            Functions.prototype.clearCache = function () {
                MODULE.Model.singleton().clearCache();
                return this;
            };
            Functions.prototype.follow = function (event, $XHR, host, timeStamp) {
                if (!MODULE.Model.singleton().isDeferrable) {
                    return false;
                }
                var anchor = event.currentTarget;
                $XHR.follow = true;
                $XHR.host = host || '';
                if (isFinite(event.timeStamp)) {
                    $XHR.timeStamp = timeStamp || event.timeStamp;
                }
                MODULE.Model.singleton().setXHR($XHR);
                jQuery.when($XHR).done(function () {
                    !MODULE.Model.singleton().getCache(anchor.href) && MODULE.Model.singleton().isAvailable(event) && MODULE.Model.singleton().setCache(anchor.href, undefined, undefined, $XHR);
                });
                jQuery[MODULE.DEF.NAME].click(anchor.href);
                return true;
            };
            Functions.prototype.proxy = function () {
                return MODULE.Model.singleton().proxy();
            };
            Functions.prototype.host = function () {
                return MODULE.Model.singleton().host();
            };
            return Functions;
        })();
        CONTROLLER.Functions = Functions;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Methods = (function () {
            function Methods() {
                MODULE.FREEZE(this);
            }
            return Methods;
        })();
        CONTROLLER.Methods = Methods;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Template = (function () {
            function Template(model, state) {
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Controllerの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                /**
                 * 拡張のプロパティを指定する
                 *
                 * @property PROPERTIES
                 * @type {String}
                 */
                this.PROPERTIES = [];
                this.state_ = state;
            }
            Template.prototype.EXTEND = function (context) {
                if (context instanceof MODULE.DEF.NAMESPACE) {
                    if (context instanceof jQuery) {
                        // コンテクストへの変更をend()で戻せるようadd()
                        context = context.add();
                    }
                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);
                    // コンテクストにメソッドを設定
                    this.REGISTER_METHOD(context);
                }
                else {
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
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var context = S.EXTEND(this);
                    args = [context].concat(args);
                    args = S.EXEC.apply(S, args);
                    return args instanceof Array ? model.MAIN.apply(model, args) : args;
                };
                this.EXTEND(this.EXTENSION);
                // プラグインに関数を設定してネームスペースに登録
                window[MODULE.DEF.NAMESPACE] = window[MODULE.DEF.NAMESPACE] || {};
                if (MODULE.DEF.NAMESPACE.prototype) {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = MODULE.DEF.NAMESPACE.prototype[MODULE.DEF.NAME] = this.EXTENSION;
                }
                else {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = this.EXTENSION;
                }
            };
            Template.prototype.EXEC = function () {
                return this.exec_.apply(this, arguments);
            };
            Template.prototype.exec_ = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
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
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_) {
                _super.call(this, model_, 1 /* initiate */);
                this.model_ = model_;
                this.FUNCTIONS = new CONTROLLER.Functions();
                this.METHODS = new CONTROLLER.Methods();
                this.REGISTER(model_);
                MODULE.FREEZE(this);
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
            Main.prototype.view = function (context, setting) {
                return new MODULE.View(this.model_, this, context, setting);
            };
            Main.prototype.click = function (args) {
                this.model_.click.apply(this.model_, args);
            };
            Main.prototype.submit = function (args) {
                this.model_.submit.apply(this.model_, args);
            };
            Main.prototype.popstate = function (args) {
                this.model_.popstate.apply(this.model_, args);
            };
            Main.prototype.scroll = function (args) {
                this.model_.scroll.apply(this.model_, args);
            };
            return Main;
        })(CONTROLLER.Template);
        CONTROLLER.Main = Main;
        var Singleton = (function () {
            function Singleton(model) {
                if (model === void 0) { model = MODULE.Model.singleton(); }
                Singleton.instance_ = Singleton.instance_ || new Main(model);
            }
            Singleton.singleton = function () {
                return Singleton.instance_;
            };
            Singleton.prototype.singleton = function () {
                return Singleton.singleton();
            };
            return Singleton;
        })();
        CONTROLLER.Singleton = Singleton;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.Controller = MODULE.CONTROLLER.Singleton;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var LIBRARY;
    (function (LIBRARY) {
        var Task = (function () {
            function Task(mode, size) {
                if (mode === void 0) { mode = 1; }
                if (size === void 0) { size = 0; }
                this.list_ = []; // [[(...args: any[]) => void, context: any, args?: any[]], ...]
                this.config_ = {
                    mode: 1,
                    size: 0
                };
                this.table_ = {};
                this.option_ = {};
                this.config_.mode = mode || this.config_.mode;
                this.config_.size = size || this.config_.size;
            }
            Task.prototype.define = function (label, mode, size) {
                if (mode === void 0) { mode = this.config_.mode; }
                if (size === void 0) { size = this.config_.size; }
                this.option_[label] = {
                    mode: mode,
                    size: size
                };
                this.table_[label] = [];
            };
            Task.prototype.reserve = function (label, task) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        var config = this.option_[label], list = this.table_[label], args = [].slice.call(arguments, 2);
                        break;
                    case 'function':
                        task = label;
                        label = undefined;
                        var config = this.config_, list = this.list_, args = [].slice.call(arguments, 1);
                        break;
                    default:
                        return;
                }
                if ('function' !== typeof task) {
                    return;
                }
                var method;
                if (config.mode > 0) {
                    method = 'push';
                }
                else {
                    method = 'unshift';
                }
                list[method]([task, args.shift(), args]);
            };
            Task.prototype.digest = function (label, limit) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        limit = limit || 0;
                        var config = this.option_[label], list = this.table_[label];
                        if (!list) {
                            return;
                        }
                        break;
                    case 'number':
                    case 'undefined':
                        limit = label || 0;
                        label = undefined;
                        var config = this.config_, list = this.list_;
                        break;
                    default:
                        return;
                }
                if (list.length > config.size && config.size) {
                    if (config.mode > 0) {
                        list.splice(0, list.length - config.size);
                    }
                    else {
                        list.splice(list.length - config.size, list.length);
                    }
                }
                var task;
                limit = limit || -1;
                while (task = limit-- && list.pop()) {
                    task.shift().apply(task.shift() || window, task.shift() || []);
                }
                if (undefined === label) {
                    var table = this.table_;
                    for (var i in table) {
                        this.digest(i, limit);
                    }
                }
            };
            Task.prototype.clear = function (label) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        this.table_[label].splice(0, this.table_[label].length);
                        break;
                    default:
                        var table = this.table_;
                        for (var i in table) {
                            this.clear(i);
                        }
                }
            };
            return Task;
        })();
        LIBRARY.Task = Task;
    })(LIBRARY = MODULE.LIBRARY || (MODULE.LIBRARY = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var STATEFUL;
                    (function (STATEFUL) {
                        var Task = (function () {
                            function Task(task_) {
                                this.task_ = task_;
                                this.labels_ = {
                                    done: 'done',
                                    fail: 'fail',
                                    always: 'always'
                                };
                            }
                            Task.prototype.done = function (callback) {
                                this.task_.reserve(this.labels_.done, callback);
                                return this;
                            };
                            Task.prototype.fail = function (callback) {
                                this.task_.reserve(this.labels_.fail, callback);
                                return this;
                            };
                            Task.prototype.always = function (callback) {
                                this.task_.reserve(this.labels_.always, callback);
                                return this;
                            };
                            Task.prototype.resolve = function () {
                                this.task_.clear(this.labels_.fail);
                                this.task_.digest(this.labels_.done);
                                this.task_.digest(this.labels_.always);
                                return this;
                            };
                            Task.prototype.reject = function () {
                                this.task_.clear(this.labels_.done);
                                this.task_.digest(this.labels_.fail);
                                this.task_.digest(this.labels_.always);
                                return this;
                            };
                            return Task;
                        })();
                        STATEFUL.Task = Task;
                        var TaskUp = (function (_super) {
                            __extends(TaskUp, _super);
                            function TaskUp() {
                                _super.apply(this, arguments);
                            }
                            return TaskUp;
                        })(Task);
                        STATEFUL.TaskUp = TaskUp;
                        var TaskDown = (function (_super) {
                            __extends(TaskDown, _super);
                            function TaskDown() {
                                _super.apply(this, arguments);
                            }
                            TaskDown.prototype.done = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.fail = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.always = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.resolve = function () {
                                return this;
                            };
                            return TaskDown;
                        })(Task);
                        STATEFUL.TaskDown = TaskDown;
                    })(STATEFUL = DB.STATEFUL || (DB.STATEFUL = {}));
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/// <reference path="data.db.stateful.task.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var Stateful = (function () {
                        function Stateful(origin_, connect_, extend_) {
                            var _this = this;
                            this.origin_ = origin_;
                            this.connect_ = connect_;
                            this.extend_ = extend_;
                            this.state_ = function () { return _this.origin_.state(); };
                            this.task_ = new MODULE.LIBRARY.Task();
                            this.cache_ = {
                                stateful: {}
                            };
                        }
                        Stateful.prototype.stateful_ = function () {
                            var _this = this;
                            var select = function (statefulClass, taskable) {
                                return _this.cache_.stateful[_this.state_()] = _this.cache_.stateful[_this.state_()] || new statefulClass(_this.origin_, _this.connect_, _this.extend_, _this.task_, taskable);
                            };
                            switch (this.state_()) {
                                case 0 /* blank */:
                                    return select(DB.STATE.Blank, true);
                                case 1 /* initiate */:
                                    return select(DB.STATE.Initiate, true);
                                case 2 /* open */:
                                    return select(DB.STATE.Open, true);
                                case 9 /* close */:
                                    return select(DB.STATE.Close, true);
                                case 8 /* terminate */:
                                    return select(DB.STATE.Terminate, true);
                                case 6 /* error */:
                                    return select(DB.STATE.Error, false);
                                default:
                                    return select(DB.STATE.Except, false);
                            }
                        };
                        Stateful.prototype.open = function () {
                            return this.stateful_().open();
                        };
                        Stateful.prototype.resolve = function () {
                            return this.stateful_().resolve();
                        };
                        Stateful.prototype.reject = function () {
                            return this.stateful_().reject();
                        };
                        return Stateful;
                    })();
                    DB.Stateful = Stateful;
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var STATE;
                    (function (STATE) {
                        var Default = (function () {
                            function Default(origin, connect, extend, task, taskable) {
                                this.origin = origin;
                                this.connect = connect;
                                this.extend = extend;
                                this.task = taskable ? new DB.STATEFUL.TaskUp(task) : new DB.STATEFUL.TaskDown(task);
                            }
                            Default.prototype.open = function () {
                                // 無効
                                return this.task;
                            };
                            Default.prototype.resolve = function () {
                                // 無効
                            };
                            Default.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Default;
                        })();
                        STATE.Default = Default;
                        var Blank = (function (_super) {
                            __extends(Blank, _super);
                            function Blank() {
                                _super.apply(this, arguments);
                            }
                            Blank.prototype.open = function () {
                                // 新規接続
                                this.connect();
                                return this.task;
                            };
                            Blank.prototype.resolve = function () {
                                // 接続のコールバックによりタスクを処理
                                this.open();
                            };
                            Blank.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Blank;
                        })(Default);
                        STATE.Blank = Blank;
                        var Initiate = (function (_super) {
                            __extends(Initiate, _super);
                            function Initiate() {
                                _super.apply(this, arguments);
                            }
                            Initiate.prototype.open = function () {
                                // 無効
                                return this.task;
                            };
                            Initiate.prototype.resolve = function () {
                                // 接続のコールバックによりタスクを処理
                            };
                            Initiate.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Initiate;
                        })(Default);
                        STATE.Initiate = Initiate;
                        var Open = (function (_super) {
                            __extends(Open, _super);
                            function Open() {
                                _super.apply(this, arguments);
                            }
                            Open.prototype.open = function () {
                                var _this = this;
                                // 接続の有効期限を延長
                                this.extend();
                                // 戻り値のオブジェクトを使用したタスクの追加を待ってタスクを処理
                                setTimeout(function () { return _this.origin.resolve(); }, 1);
                                return this.task;
                            };
                            Open.prototype.resolve = function () {
                                // 現接続によりタスクを処理
                                this.task.resolve();
                            };
                            Open.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Open;
                        })(Default);
                        STATE.Open = Open;
                        var Close = (function (_super) {
                            __extends(Close, _super);
                            function Close() {
                                _super.apply(this, arguments);
                            }
                            Close.prototype.open = function () {
                                // 再接続
                                this.connect();
                                return this.task;
                            };
                            Close.prototype.resolve = function () {
                                // 再接続しコールバックによりタスクを処理
                                this.open();
                            };
                            Close.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Close;
                        })(Default);
                        STATE.Close = Close;
                        var Terminate = (function (_super) {
                            __extends(Terminate, _super);
                            function Terminate() {
                                _super.apply(this, arguments);
                            }
                            return Terminate;
                        })(Default);
                        STATE.Terminate = Terminate;
                        var Error = (function (_super) {
                            __extends(Error, _super);
                            function Error() {
                                _super.apply(this, arguments);
                            }
                            return Error;
                        })(Default);
                        STATE.Error = Error;
                        var Except = (function (_super) {
                            __extends(Except, _super);
                            function Except() {
                                _super.apply(this, arguments);
                            }
                            return Except;
                        })(Default);
                        STATE.Except = Except;
                    })(STATE = DB.STATE || (DB.STATE = {}));
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Store = (function () {
                    function Store(DB) {
                        this.DB = DB;
                        this.autoIncrement = true;
                        this.indexes = [];
                        this.limit = 0;
                        this.buffer = [];
                    }
                    Store.prototype.accessStore = function (success, mode) {
                        var _this = this;
                        if (mode === void 0) { mode = 'readwrite'; }
                        try {
                            var database = this.DB.database(), store = database && database.transaction(this.name, mode).objectStore(this.name);
                        }
                        catch (err) {
                        }
                        if (store) {
                            success(store);
                        }
                        else {
                            this.DB.open().done(function () { return _this.accessStore(success); });
                        }
                    };
                    Store.prototype.accessCount = function () {
                        var index = 'string' === typeof arguments[0] && arguments[0], success = arguments[index ? 1 : 0];
                        this.accessStore(function (store) {
                            var req = index ? store.index(index).count() : store.count();
                            req.onsuccess = function () {
                                success.apply(this, [].slice.call(arguments, 1).concat(this.result));
                            };
                        });
                    };
                    Store.prototype.accessRecord = function (key, success, mode) {
                        this.accessStore(function (store) {
                            store.get(key).onsuccess = success;
                        }, mode);
                    };
                    Store.prototype.accessCursor = function (index, range, direction, success) {
                        this.accessStore(function (store) {
                            var req;
                            if (direction && range) {
                                req = store.index(index).openCursor(range, direction);
                            }
                            else if (range) {
                                req = store.index(index).openCursor(range);
                            }
                            else {
                                req = store.openCursor();
                            }
                            req.onsuccess = success;
                        });
                    };
                    Store.prototype.accessAll = function (index, range, direction, success) {
                        if ('function' === typeof index) {
                            success = index;
                            index = null;
                            range = null;
                            direction = null;
                        }
                        this.accessCursor(index, range, direction, success);
                    };
                    Store.prototype.get = function (key, success) {
                        this.accessRecord(key, success);
                    };
                    Store.prototype.set = function (value, merge) {
                        if (!merge) {
                            return this.put(value);
                        }
                        value = jQuery.extend(true, {}, value);
                        var key = value[this.keyPath];
                        this.accessRecord(key, function () {
                            this.source.put(jQuery.extend(true, {}, this.result, value));
                        });
                    };
                    Store.prototype.add = function (value) {
                        value = jQuery.extend(true, {}, value);
                        var key = value[this.keyPath];
                        if (this.autoIncrement) {
                            delete value[this.keyPath];
                        }
                        this.accessStore(function (store) {
                            store.add(value);
                        });
                    };
                    Store.prototype.put = function (value) {
                        value = jQuery.extend(true, {}, value);
                        var key = value[this.keyPath];
                        this.accessStore(function (store) {
                            store.put(value);
                        });
                    };
                    Store.prototype.remove = function (key) {
                        this.accessStore(function (store) {
                            store['delete'](key);
                        });
                    };
                    Store.prototype.clear = function () {
                        this.accessStore(function (store) {
                            store.clear();
                        });
                    };
                    Store.prototype.clean = function () {
                        var _this = this;
                        if (!this.limit || !this.indexes.length) {
                            return;
                        }
                        var index = this.indexes[0].name, size = this.limit;
                        this.accessCount(index, function (count) {
                            if (count <= size) {
                                return;
                            }
                            size = count - size;
                            _this.accessCursor(index, _this.DB.IDBKeyRange.upperBound(Infinity), 'prev', function () {
                                if (!this.result || !size--) {
                                    return;
                                }
                                var cursor = this.result;
                                cursor['delete']();
                                cursor['continue']();
                            });
                        });
                    };
                    Store.prototype.loadBuffer = function (limit) {
                        if (limit === void 0) { limit = 0; }
                        var buffer = this.buffer;
                        if (this.indexes.length) {
                            this.DB.IDBKeyRange && this.accessAll(this.indexes[0].name, this.DB.IDBKeyRange.upperBound(Infinity), 'prev', callback);
                        }
                        else {
                            this.accessAll(callback);
                        }
                        function callback() {
                            if (!this.result) {
                                return;
                            }
                            var cursor = this.result;
                            buffer[cursor.primaryKey] = cursor.value;
                            --limit && cursor['continue']();
                        }
                    };
                    Store.prototype.saveBuffer = function () {
                        var buffer = this.buffer;
                        this.accessStore(function (store) {
                            for (var i in buffer) {
                                store.put(buffer[i]);
                            }
                        });
                    };
                    Store.prototype.getBuffers = function () {
                        return this.buffer;
                    };
                    Store.prototype.setBuffers = function (values, merge) {
                        for (var i in values) {
                            this.setBuffer(values[i], merge);
                        }
                        return this.buffer;
                    };
                    Store.prototype.getBuffer = function (key) {
                        return this.buffer[key];
                    };
                    Store.prototype.setBuffer = function (value, merge) {
                        var key = value[this.keyPath];
                        this.buffer[key] = !merge ? value : jQuery.extend(true, {}, this.buffer[key], value);
                        return this.buffer[key];
                    };
                    Store.prototype.addBuffer = function (value) {
                        value[this.keyPath] = this.buffer.length || 1;
                        this.buffer.push(value);
                        return value;
                    };
                    Store.prototype.removeBuffer = function (key) {
                        var ret = this.buffer[key];
                        if ('number' === typeof key && key >= 0 && key in this.buffer && this.buffer.length > key) {
                            this.buffer.splice(key, 1);
                        }
                        else {
                            delete this.buffer[key];
                        }
                        return ret;
                    };
                    Store.prototype.clearBuffer = function () {
                        this.buffer.splice(0, this.buffer.length);
                    };
                    return Store;
                })();
                DATA.Store = Store;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var Meta = (function (_super) {
                        __extends(Meta, _super);
                        function Meta() {
                            _super.apply(this, arguments);
                            this.name = 'meta';
                            this.keyPath = 'key';
                            this.autoIncrement = false;
                            this.limit = 0;
                        }
                        return Meta;
                    })(DATA.Store);
                    STORE.Meta = Meta;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var History = (function (_super) {
                        __extends(History, _super);
                        function History() {
                            _super.apply(this, arguments);
                            this.name = 'history';
                            this.keyPath = 'url';
                            this.autoIncrement = false;
                            this.indexes = [
                                { name: 'date', keyPath: 'date', option: { unique: false } }
                            ];
                            this.limit = 1000;
                        }
                        return History;
                    })(DATA.Store);
                    STORE.History = History;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var Server = (function (_super) {
                        __extends(Server, _super);
                        function Server() {
                            _super.apply(this, arguments);
                            this.name = 'server';
                            this.keyPath = 'host';
                            this.autoIncrement = false;
                            this.indexes = [
                                { name: 'date', keyPath: 'date', option: { unique: false } }
                            ];
                            this.limit = 100;
                        }
                        return Server;
                    })(DATA.Store);
                    STORE.Server = Server;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Database = (function () {
                    function Database() {
                        var _this = this;
                        this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
                        this.name = MODULE.DEF.NAME;
                        this.version = 8;
                        this.refresh = 10;
                        this.upgrade = 0; // 0:virtual 1:native
                        this.state_ = 0 /* blank */;
                        this.stateful = new DATA.DB.Stateful(this, function () { return _this.connect(); }, function () { return _this.extend(); });
                        this.age = 10 * 1000;
                        this.expires = 0;
                        this.timer = 0;
                        this.stores = {
                            meta: new DATA.STORE.Meta(this),
                            history: new DATA.STORE.History(this),
                            server: new DATA.STORE.Server(this)
                        };
                        this.meta = {
                            version: { key: 'version', value: undefined },
                            update: { key: 'update', value: undefined }
                        };
                    }
                    Database.prototype.state = function () {
                        return this.state_;
                    };
                    Database.prototype.extend = function () {
                        var _this = this;
                        this.expires = new Date().getTime() + this.age;
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function () { return _this.check(); }, this.age);
                    };
                    Database.prototype.check = function () {
                        if (!this.age || new Date().getTime() <= this.expires) {
                            return;
                        }
                        2 /* open */ === this.state() && this.close();
                    };
                    Database.prototype.database = function () {
                        this.extend();
                        return this.database_;
                    };
                    Database.prototype.up = function () {
                        this.state_ = 0 /* blank */;
                        this.open();
                    };
                    Database.prototype.down = function () {
                        this.reject();
                        this.close();
                        this.state_ = 6 /* error */;
                    };
                    Database.prototype.open = function () {
                        !this.IDBFactory && this.down();
                        return this.stateful.open();
                    };
                    Database.prototype.close = function () {
                        this.database_ && this.database_.close && this.database_.close();
                        this.state_ = 9 /* close */;
                    };
                    Database.prototype.resolve = function () {
                        this.stateful.resolve();
                    };
                    Database.prototype.reject = function () {
                        this.stateful.reject();
                    };
                    Database.prototype.connect = function () {
                        this.create();
                    };
                    // 以降、connect()以外からアクセス禁止
                    Database.prototype.create = function () {
                        var _this = this;
                        try {
                            this.close();
                            this.state_ = 1 /* initiate */;
                            var req = this.IDBFactory.open(this.name, this.upgrade ? this.version : 1);
                            var verify = function () {
                                _this.verify(_this.version, function () {
                                    _this.state_ = 2 /* open */;
                                    _this.resolve();
                                    _this.extend();
                                });
                            };
                            if ('done' === req.readyState) {
                                this.database_ = req.result;
                                if (this.database()) {
                                    verify();
                                }
                                else {
                                    this.format();
                                }
                            }
                            else {
                                var timer = setTimeout(function () { return _this.down(); }, 3000);
                                req.onblocked = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.close();
                                    setTimeout(function () { return _this.open(); }, 1000);
                                };
                                req.onupgradeneeded = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.createStores();
                                };
                                req.onsuccess = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    verify();
                                };
                                req.onerror = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.down();
                                };
                            }
                        }
                        catch (err) {
                            this.down();
                        }
                    };
                    Database.prototype.destroy = function (success, failure) {
                        var _this = this;
                        try {
                            this.close();
                            this.state_ = 8 /* terminate */;
                            var req = this.IDBFactory.deleteDatabase(this.name);
                            if (req) {
                                req.onsuccess = success;
                                req.onerror = failure;
                            }
                            setTimeout(function () { return 8 /* terminate */ === _this.state() && _this.down(); }, 3000);
                        }
                        catch (err) {
                            this.down();
                        }
                    };
                    Database.prototype.format = function () {
                        var _this = this;
                        this.destroy(function () { return _this.up(); }, function () { return _this.down(); });
                    };
                    Database.prototype.verify = function (version, success) {
                        var _this = this;
                        var db = this.database(), scheme = this.meta, meta = this.stores.meta, failure = function () { return _this.format(); };
                        if (db.objectStoreNames.length !== Object.keys(this.stores).length) {
                            return void failure();
                        }
                        for (var i in this.stores) {
                            var store = db.transaction(this.stores[i].name, 'readonly').objectStore(this.stores[i].name);
                            switch (false) {
                                case store.keyPath === this.stores[i].keyPath:
                                case store.indexNames.length === this.stores[i].indexes.length:
                                    return void failure();
                            }
                        }
                        var cancel = false;
                        meta.get(scheme.version.key, function (event) {
                            // version check
                            if (cancel) {
                                return;
                            }
                            var data = event.target.result;
                            if (!data || _this.upgrade) {
                                meta.set(meta.setBuffer({ key: scheme.version.key, value: version }));
                            }
                            else if (data.value > version) {
                                cancel = true;
                                _this.down();
                            }
                            else if (data.value < version) {
                                cancel = true;
                                failure();
                            }
                        });
                        meta.get(scheme.update.key, function (event) {
                            // refresh check
                            if (cancel) {
                                return;
                            }
                            var data = event.target.result;
                            var days = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
                            if (!data || !_this.refresh) {
                                meta.set(meta.setBuffer({ key: scheme.update.key, value: days + _this.refresh }));
                                success();
                            }
                            else if (data.value > days) {
                                success();
                            }
                            else if (data.value <= days) {
                                failure();
                            }
                        });
                    };
                    Database.prototype.createStores = function () {
                        this.destroyStores();
                        var db = this.database();
                        for (var i in this.stores) {
                            var schema = this.stores[i];
                            var store = db.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
                            for (var j = 0, indexes = schema.indexes, index; index = indexes[j]; j++) {
                                store.createIndex(index.name, index.keyPath, index.option);
                            }
                        }
                    };
                    Database.prototype.destroyStores = function () {
                        var db = this.database();
                        for (var i = db.objectStoreNames ? db.objectStoreNames.length : 0; i--;) {
                            db.deleteObjectStore(db.objectStoreNames[i]);
                        }
                    };
                    return Database;
                })();
                DATA.Database = Database;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
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
                        if (option === void 0) { option = {}; }
                        if (!key || !window.navigator.cookieEnabled) {
                            return;
                        }
                        option.age = option.age || this.age_;
                        document.cookie = [
                            encodeURIComponent(key) + '=' + encodeURIComponent(value),
                            option.age ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
                            option.path ? '; path=' + option.path : '; path=/',
                            option.secure ? '; secure' : ''
                        ].join('');
                        return this.getCookie(key);
                    };
                    return Cookie;
                })();
                DATA.Cookie = Cookie;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Main = (function () {
                    function Main() {
                        this.DB = new DATA.Database();
                        this.Cookie = new DATA.Cookie(10 * 24 * 60 * 60);
                    }
                    return Main;
                })();
                DATA.Main = Main;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/* MODEL */
var MODULE;
(function (MODULE) {
    var LIBRARY;
    (function (LIBRARY) {
        var Utility = (function () {
            function Utility() {
            }
            /* string */
            Utility.trim = function (text) {
                text = 'string' === typeof text ? text : String(0 === text && text.toString() || '');
                if (text.trim) {
                    text = text.trim();
                }
                else if (text = text.replace(/^[\s\uFEFF\xA0]+/, '')) {
                    var regSpace = /[\s\uFEFF\xA0]/;
                    var i = text.length, r = i % 8;
                    DUFF: {
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
                            this.duff(-size, function (i) { return arr[i] = arg[i % len]; });
                        }
                        else {
                            var arr = arg.slice();
                            while (arr.length * 2 <= size) {
                                arr = arr.concat(arr);
                            }
                            arr = arr.concat(arr.slice(0, size - arr.length));
                        }
                        return arr;
                }
            };
            Utility.fire = function (fn, context, args, async) {
                if (context === void 0) { context = window; }
                if (args === void 0) { args = []; }
                if ('function' === typeof fn) {
                    return async ? setTimeout(function () {
                        fn.apply(context || window, args);
                    }, 0) : fn.apply(context || window, args);
                }
                else {
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
                }
                else {
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
                    DUFF: {
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
                }
                else {
                    var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                    DUFF: {
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
                if (transparent === void 0) { transparent = true; }
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
    })(LIBRARY = MODULE.LIBRARY || (MODULE.LIBRARY = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var Data = (function () {
                function Data(model_, app_) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.data_ = new APP.DATA.Main();
                    this.stores_ = this.data_.DB.stores;
                    this.util_ = MODULE.LIBRARY.Utility;
                }
                // cookie
                Data.prototype.getCookie = function (key) {
                    return this.data_.Cookie.getCookie(key);
                };
                Data.prototype.setCookie = function (key, value, option) {
                    return this.data_.Cookie.setCookie(key, value, option);
                };
                // db
                Data.prototype.connect = function (setting) {
                    if (!setting.database) {
                        return;
                    }
                    this.data_.DB.up();
                    this.saveTitle();
                    this.saveScrollPosition();
                };
                Data.prototype.loadBuffers = function (limit) {
                    if (limit === void 0) { limit = 0; }
                    for (var i in this.stores_) {
                        this.stores_[i].loadBuffer(limit);
                    }
                };
                Data.prototype.saveBuffers = function () {
                    for (var i in this.stores_) {
                        this.stores_[i].saveBuffer();
                    }
                };
                // history
                Data.prototype.getHistoryBuffer = function (unsafe_url) {
                    return this.stores_.history.getBuffer(this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url)));
                };
                Data.prototype.loadTitle = function () {
                    var _this = this;
                    var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href));
                    var data = this.stores_.history.getBuffer(keyUrl);
                    if (data && 'string' === typeof data.title) {
                        document.title = data.title;
                    }
                    else {
                        this.stores_.history.get(keyUrl, function (event) {
                            data = event.target.result;
                            if (data && data.title) {
                                if (_this.util_.compareUrl(keyUrl, _this.model_.convertUrlToKeyUrl(_this.util_.normalizeUrl(window.location.href)))) {
                                    document.title = data.title;
                                }
                            }
                        });
                    }
                };
                Data.prototype.saveTitle = function (unsafe_url, title) {
                    if (unsafe_url === void 0) { unsafe_url = window.location.href; }
                    if (title === void 0) { title = document.title; }
                    var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
                    var value = {
                        url: keyUrl,
                        title: title,
                        date: new Date().getTime(),
                        scrollX: undefined,
                        scrollY: undefined,
                        host: undefined,
                        expires: undefined
                    };
                    this.stores_.history.setBuffer(value, true);
                    this.stores_.history.set(value, true);
                    this.stores_.history.clean();
                };
                Data.prototype.loadScrollPosition = function () {
                    var _this = this;
                    var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(window.location.href));
                    var data = this.stores_.history.getBuffer(keyUrl);
                    function scroll(scrollX, scrollY) {
                        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) {
                            return;
                        }
                        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
                    }
                    if (data && 'number' === typeof data.scrollX) {
                        scroll(data.scrollX, data.scrollY);
                    }
                    else {
                        this.stores_.history.get(keyUrl, function (event) {
                            data = event.target.result;
                            if (data && 'number' === typeof data.scrollX) {
                                if (_this.util_.compareUrl(keyUrl, _this.model_.convertUrlToKeyUrl(_this.util_.normalizeUrl(window.location.href)))) {
                                    scroll(data.scrollX, data.scrollY);
                                }
                            }
                        });
                    }
                };
                Data.prototype.saveScrollPosition = function (unsafe_url, scrollX, scrollY) {
                    if (unsafe_url === void 0) { unsafe_url = window.location.href; }
                    if (scrollX === void 0) { scrollX = jQuery(window).scrollLeft(); }
                    if (scrollY === void 0) { scrollY = jQuery(window).scrollTop(); }
                    var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
                    var value = {
                        url: keyUrl,
                        scrollX: scrollX,
                        scrollY: scrollY,
                        date: new Date().getTime(),
                        title: undefined,
                        host: undefined,
                        expires: undefined
                    };
                    this.stores_.history.setBuffer(value, true);
                    this.stores_.history.set(value, true);
                };
                Data.prototype.loadExpires = function () {
                };
                Data.prototype.saveExpires = function (unsafe_url, host, expires) {
                    var keyUrl = this.model_.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
                    var value = {
                        url: keyUrl,
                        host: host || '',
                        expires: expires,
                        title: undefined,
                        scrollX: undefined,
                        scrollY: undefined,
                        date: undefined
                    };
                    this.stores_.history.setBuffer(value, true);
                    this.stores_.history.set(value, true);
                };
                // server
                Data.prototype.getServerBuffers = function () {
                    return this.stores_.server.getBuffers();
                };
                Data.prototype.loadServer = function () {
                };
                Data.prototype.saveServer = function (host, score, state) {
                    if (state === void 0) { state = 0; }
                    var value = {
                        host: host.split('//').pop().split('/').shift() || '',
                        score: score,
                        state: state,
                        date: new Date().getTime()
                    };
                    this.stores_.server.setBuffer(value, true);
                    this.stores_.server.set(value, true);
                    this.stores_.server.clean();
                };
                return Data;
            })();
            APP.Data = Data;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var Balance = (function () {
                function Balance(model_, app_) {
                    var _this = this;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.host_ = '';
                    this.host = function () { return _this.host_; };
                    this.parallel_ = 6;
                }
                Balance.prototype.isBalanceable_ = function (setting) {
                    return setting.balance.active && !!Number(this.app_.data.getCookie(setting.balance.client.cookie.balance));
                };
                Balance.prototype.enable = function (setting) {
                    if (!setting.balance.active) {
                        return void this.disable(setting);
                    }
                    if (!setting.balance.client.support.browser.test(window.navigator.userAgent)) {
                        return void this.disable(setting);
                    }
                    if (!this.app_.data.setCookie(setting.balance.client.cookie.balance, '1')) {
                        return void this.disable(setting);
                    }
                    if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
                        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '1');
                    }
                };
                Balance.prototype.disable = function (setting) {
                    if (this.app_.data.getCookie(setting.balance.client.cookie.balance)) {
                        this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
                    }
                    if (this.app_.data.getCookie(setting.balance.client.cookie.redirect)) {
                        this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
                    }
                    this.changeServer('', setting);
                };
                Balance.prototype.changeServer = function (host, setting) {
                    if (setting === void 0) { setting = this.model_.configure(window.location); }
                    if (!setting || !this.isBalanceable_(setting)) {
                        this.host_ = '';
                    }
                    else {
                        this.host_ = host || '';
                        this.app_.data.setCookie(setting.balance.client.cookie.host, host);
                    }
                    return this.host();
                };
                Balance.prototype.chooseServers_ = function (expires, limit, weight, respite, hosts) {
                    hosts = hosts.slice();
                    var servers = this.app_.data.getServerBuffers(), serverTableByScore = {}, result;
                    (function () {
                        var now = new Date().getTime();
                        for (var i in servers) {
                            if (now > servers[i].date + expires) {
                                continue;
                            }
                            serverTableByScore[servers[i].score] = servers[i];
                        }
                    })();
                    result = [];
                    var scores = Object.keys(serverTableByScore).sort(compareNumbers);
                    function compareNumbers(a, b) {
                        return +a - +b;
                    }
                    for (var i = 0, score; score = result.length < limit && scores[i]; i++) {
                        var server = serverTableByScore[score], host = server.host, state = server.state;
                        if (state && state + respite >= new Date().getTime()) {
                            ~jQuery.inArray(host, hosts) && hosts.splice(jQuery.inArray(host, hosts), 1);
                            continue;
                        }
                        else if (state) {
                            this.app_.data.saveServer(server.host, server.score, 0);
                        }
                        if (!+score) {
                            continue;
                        }
                        if (!host && weight && !(Math.floor(Math.random() * weight))) {
                            ~jQuery.inArray(host, hosts) && hosts.splice(jQuery.inArray(host, hosts), 1);
                            continue;
                        }
                        result.push(host);
                    }
                    if (hosts.length >= 2 && result.length < 2 || !result.length) {
                        result = hosts.slice(Math.floor(Math.random() * hosts.length));
                    }
                    return result;
                };
                Balance.prototype.chooseServer = function (setting) {
                    if (!this.isBalanceable_(setting)) {
                        return '';
                    }
                    // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用
                    var history = this.app_.data.getHistoryBuffer(setting.destLocation.href);
                    if (history && history.expires && history.expires >= new Date().getTime()) {
                        return history.host || '';
                    }
                    // 最適なサーバーを選択
                    var servers = this.chooseServers_(setting.balance.history.expires, setting.balance.history.limit, setting.balance.weight, setting.balance.server.respite, setting.balance.client.hosts);
                    if (servers.length) {
                        return servers.shift();
                    }
                    if (this.app_.data.getCookie(setting.balance.client.cookie.host)) {
                        return this.app_.data.getCookie(setting.balance.client.cookie.host);
                    }
                    return '';
                };
                Balance.prototype.bypass = function () {
                    var _this = this;
                    var setting = this.app_.configure(window.location), deferred = jQuery.Deferred();
                    if (!this.isBalanceable_(setting)) {
                        return deferred.reject();
                    }
                    var parallel = this.parallel_, servers = this.chooseServers_(setting.balance.history.expires, setting.balance.history.limit, setting.balance.weight, setting.balance.server.respite, setting.balance.client.hosts), option = jQuery.extend({}, setting.ajax, setting.balance.option.ajax, setting.balance.option.callbacks.ajax);
                    var test = function (server) {
                        var that = _this;
                        jQuery.ajax(jQuery.extend({}, option, {
                            url: that.util_.normalizeUrl(window.location.protocol + '//' + server + window.location.pathname.replace(/^\/?/, '/') + window.location.search),
                            xhr: !setting.balance.option.callbacks.ajax.xhr ? undefined : function () {
                                var jqXHR;
                                jqXHR = that.util_.fire(setting.balance.option.callbacks.ajax.xhr, this, [event, setting]);
                                jqXHR = 'object' === typeof jqXHR ? jqXHR : jQuery.ajaxSettings.xhr();
                                return jqXHR;
                            },
                            beforeSend: !setting.balance.option.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (jqXHR, ajaxSetting) {
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
                                that.util_.fire(setting.balance.option.callbacks.ajax.beforeSend, this, [event, setting, jqXHR, ajaxSetting]);
                            },
                            dataFilter: !setting.balance.option.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                                return that.util_.fire(setting.balance.option.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
                            },
                            success: function () {
                                server = server;
                                that.util_.fire(setting.balance.option.ajax.success, this, arguments);
                            },
                            error: function () {
                                server = null;
                                that.util_.fire(setting.balance.option.ajax.error, this, arguments);
                            },
                            complete: function () {
                                that.util_.fire(setting.balance.option.ajax.complete, this, arguments);
                                if (server) {
                                    that.host_ = server;
                                    servers.splice(0, servers.length);
                                    deferred.resolve();
                                }
                                else if (!that.host() && servers.length) {
                                    test(servers.shift());
                                }
                                else {
                                    deferred.reject();
                                }
                            }
                        }));
                    };
                    while (parallel--) {
                        var server = servers.shift();
                        if (!server || server === window.location.host) {
                            servers.length && ++parallel;
                            continue;
                        }
                        test(server);
                    }
                    return deferred;
                };
                return Balance;
            })();
            APP.Balance = Balance;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var Proxy = (function () {
                function Proxy(model_, app_) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.util_ = MODULE.LIBRARY.Utility;
                }
                Proxy.prototype.install = function (setting) {
                    if ('https:' !== window.location.protocol || !setting.balance.active || !setting.balance.client.proxy.worker) {
                        return;
                    }
                    window.navigator.serviceWorker && window.navigator.serviceWorker.register(setting.balance.client.proxy.worker, {
                        scope: setting.balance.client.proxy.worker.replace(/[^/]+$/, '')
                    });
                };
                return Proxy;
            })();
            APP.Proxy = Proxy;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageRecord = (function () {
                function PageRecord(setting, data, textStatus, jqXHR, host) {
                    this.data_ = setting ? {
                        url: setting.nss.url,
                        data: data,
                        textStatus: textStatus,
                        jqXHR: jqXHR,
                        host: host
                    } : {
                        url: undefined,
                        data: undefined,
                        textStatus: undefined,
                        jqXHR: undefined,
                        host: undefined
                    };
                    this.data = new PageRecordData(this.data_);
                }
                PageRecord.prototype.state = function () {
                    switch (false) {
                        case this.data.jqXHR() && 200 === +this.data.jqXHR().status:
                        case this.data.expires() >= new Date().getTime():
                            return false;
                        default:
                            return true;
                    }
                };
                return PageRecord;
            })();
            APP.PageRecord = PageRecord;
            var PageRecordData = (function () {
                function PageRecordData(data_) {
                    this.data_ = data_;
                }
                PageRecordData.prototype.url = function () {
                    return this.data_.url;
                };
                PageRecordData.prototype.data = function () {
                    return this.data_.data;
                };
                PageRecordData.prototype.textStatus = function () {
                    return this.data_.textStatus;
                };
                PageRecordData.prototype.jqXHR = function () {
                    return this.data_.jqXHR;
                };
                PageRecordData.prototype.host = function () {
                    return this.data_.host;
                };
                PageRecordData.prototype.expires = function (min, max) {
                    var xhr = this.jqXHR(), expires;
                    if (xhr) {
                        xhr.timeStamp = xhr.timeStamp || new Date(xhr.getResponseHeader('Date')).getTime() || new Date().getTime();
                    }
                    switch (true) {
                        case !xhr:
                            expires = 0;
                            break;
                        case /no-store|no-cache/.test(xhr.getResponseHeader('Cache-Control')):
                            expires = 0;
                            break;
                        case !!xhr.getResponseHeader('Cache-Control') && !!~xhr.getResponseHeader('Cache-Control').indexOf('max-age='):
                            expires = new Date(xhr.getResponseHeader('Date') || new Date(xhr.timeStamp).toString()).getTime() + (+xhr.getResponseHeader('Cache-Control').match(/max-age=(\d*)/).pop() * 1000);
                            break;
                        case !!xhr.getResponseHeader('Expires'):
                            expires = new Date(xhr.getResponseHeader('Expires')).getTime();
                            break;
                        default:
                            expires = 0;
                    }
                    if (undefined !== min || undefined !== max) {
                        expires = 'number' === typeof min ? Math.max(min + new Date().getTime(), expires) : expires;
                        expires = 'number' === typeof max ? Math.min(max + new Date().getTime(), expires) : expires;
                    }
                    expires = Math.max(expires, 0) || 0;
                    return expires;
                };
                return PageRecordData;
            })();
            APP.PageRecordData = PageRecordData;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageUtility = (function () {
                function PageUtility() {
                }
                PageUtility.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    areas = areas instanceof Array ? areas : [areas];
                    var i = -1, area;
                    AREA: while (area = areas[++i]) {
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
                PageUtility.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent(eventType, bubbling, cancelable);
                    target.dispatchEvent(event);
                };
                return PageUtility;
            })();
            APP.PageUtility = PageUtility;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageFetch = (function () {
                function PageFetch(model_, app_, setting_, event_, success, failure) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.success = success;
                    this.failure = failure;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.main_();
                }
                PageFetch.prototype.main_ = function () {
                    var that = this, setting = this.setting_, event = this.event_ = jQuery.extend(true, {}, this.event_), wait = this.util_.fire(setting.wait, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]);
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && (speed.fire = event.timeStamp);
                    speedcheck && speed.time.splice(0, 100, 0);
                    speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');
                    var cache;
                    switch (setting.cache[event.type.toLowerCase()] && event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            cache = this.model_.getCache(setting.destLocation.href);
                            break;
                        case MODULE.EVENT.SUBMIT:
                            cache = setting.cache[event.currentTarget.method.toLowerCase()] ? this.model_.getCache(setting.destLocation.href) : cache;
                            break;
                        case MODULE.EVENT.POPSTATE:
                            cache = this.model_.getCache(setting.destLocation.href);
                            break;
                    }
                    this.dispatchEvent(document, setting.nss.event.pjax.fetch, false, false);
                    var xhr = this.model_.getXHR();
                    if (cache && cache.jqXHR && 200 === +cache.jqXHR.status) {
                        // cache
                        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                        this.app_.loadtime = 0;
                        this.model_.setXHR(null);
                        this.host_ = cache.host || '';
                        this.data_ = cache.jqXHR.responseText;
                        this.textStatus_ = cache.textStatus;
                        this.jqXHR_ = cache.jqXHR;
                        if (this.model_.isDeferrable) {
                            var defer = this.wait_(wait);
                            this.app_.page.setWait(defer);
                            jQuery.when(jQuery.Deferred().resolve(this.data_, this.textStatus_, this.jqXHR_), defer).done(done).fail(fail).always(always);
                        }
                        else {
                            var context = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
                            context = context.context || context;
                            success.call(context, this.data_, this.textStatus_, this.jqXHR_);
                            complete.call(context, this.jqXHR_, this.textStatus_);
                        }
                    }
                    else if (xhr && xhr.follow && !~'error abort timeout parsererror'.indexOf(xhr.statusText)) {
                        // preload
                        speedcheck && speed.time.splice(0, 1, xhr.timeStamp - speed.fire);
                        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                        this.host_ = xhr.host || '';
                        this.app_.loadtime = xhr.timeStamp;
                        var defer = this.wait_(wait);
                        this.app_.page.setWait(defer);
                        delete xhr.timeStamp;
                        jQuery.when(xhr, defer).done(done).fail(fail).always(always);
                    }
                    else {
                        // default
                        this.app_.loadtime = event.timeStamp;
                        var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};
                        this.app_.balance.changeServer(this.app_.balance.chooseServer(setting), setting);
                        this.host_ = setting.balance.active && this.model_.host().split('//').pop() || '';
                        requestLocation.host = this.host_ || setting.destLocation.host;
                        ajax.url = !setting.server.query ? requestLocation.href : [
                            requestLocation.protocol,
                            '//',
                            requestLocation.host,
                            requestLocation.pathname.replace(/^\/?/, '/'),
                            requestLocation.search.replace(/&*$/, '&' + setting.server.query).replace(/^\??&/, '?').replace(/(\?|&)$/, ''),
                            requestLocation.hash
                        ].join('');
                        switch (event.type.toLowerCase()) {
                            case MODULE.EVENT.CLICK:
                                ajax.type = 'GET';
                                break;
                            case MODULE.EVENT.SUBMIT:
                                ajax.type = event.currentTarget.method.toUpperCase();
                                switch (ajax.type) {
                                    case 'POST':
                                        if (!jQuery(event.currentTarget).has(':file').length) {
                                            ajax.data = jQuery(event.currentTarget).serializeArray();
                                        }
                                        else if ('function' === typeof FormData) {
                                            // Correspond to bug of TypeScript 1.1.0-1
                                            ajax.data = (new FormData)(event.currentTarget);
                                            ajax.contentType = false;
                                            ajax.processData = false;
                                        }
                                        break;
                                    case 'GET':
                                        break;
                                }
                                break;
                            case MODULE.EVENT.POPSTATE:
                                ajax.type = 'GET';
                                break;
                        }
                        callbacks = {
                            xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
                                var jqXHR;
                                jqXHR = that.util_.fire(setting.callbacks.ajax.xhr, this, [event, setting]);
                                jqXHR = 'object' === typeof jqXHR ? jqXHR : jQuery.ajaxSettings.xhr();
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
                                that.util_.fire(setting.callbacks.ajax.beforeSend, this, [event, setting, jqXHR, ajaxSetting]);
                            },
                            dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                                return that.util_.fire(setting.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
                            },
                            success: success,
                            error: error,
                            complete: complete
                        };
                        ajax = jQuery.extend({}, setting.ajax, callbacks, ajax);
                        this.model_.setXHR(jQuery.ajax(ajax));
                        if (!this.model_.isDeferrable) {
                            return;
                        }
                        var defer = this.wait_(wait);
                        this.app_.page.setWait(defer);
                        jQuery.when(this.model_.getXHR(), defer).done(done).fail(fail).always(always);
                    }
                    function success(data, textStatus, jqXHR) {
                        return that.model_.isDeferrable ? undefined : done.call(this, [].slice.call(arguments), undefined);
                    }
                    function error(jqXHR, textStatus, errorThrown) {
                        return that.model_.isDeferrable ? undefined : fail.apply(this, arguments);
                    }
                    function complete(jqXHR, textStatus) {
                        return that.model_.isDeferrable ? undefined : always.apply(this, arguments);
                    }
                    function done(ajax, wait) {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.data_ = ajax[0];
                        that.textStatus_ = ajax[1];
                        that.jqXHR_ = ajax[2];
                        that.util_.fire(setting.callbacks.ajax.success, this[0], [event, setting, that.data_, that.textStatus_, that.jqXHR_]);
                    }
                    function fail(jqXHR, textStatus, errorThrown) {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.jqXHR_ = jqXHR;
                        that.textStatus_ = textStatus;
                        that.errorThrown_ = errorThrown;
                        that.util_.fire(setting.callbacks.ajax.error, this, [event, setting, that.jqXHR_, that.textStatus_, that.errorThrown_]);
                    }
                    function always() {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.util_.fire(setting.callbacks.ajax.complete, this instanceof Array ? this[0] : this, [event, setting, that.jqXHR_, that.textStatus_]);
                        that.model_.setXHR(null);
                        if (200 === +that.jqXHR_.status) {
                            that.model_.setCache(setting.destLocation.href, cache && cache.data || null, that.textStatus_, that.jqXHR_);
                            that.success(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        }
                        else {
                            that.failure(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        }
                    }
                };
                PageFetch.prototype.wait_ = function (ms) {
                    var defer = jQuery.Deferred();
                    if (!ms) {
                        return defer.resolve();
                    }
                    setTimeout(function () {
                        defer.resolve();
                    }, ms);
                    return defer;
                };
                PageFetch.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageFetch.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return PageFetch;
            })();
            APP.PageFetch = PageFetch;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageProvider = (function () {
                function PageProvider(Record_, model_, app_) {
                    this.Record_ = Record_;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.hash_ = function (setting) { return setting.nss.url; };
                    this.table_ = {};
                    this.order_ = [];
                }
                PageProvider.prototype.fetchRecord = function (setting, event, success, failure) {
                    if (this.getRecord(setting).state()) {
                        //success(this.getRecord(setting), event);
                        this.pullRecord(setting, event, success, failure);
                    }
                    else {
                        this.pullRecord(setting, event, success, failure);
                    }
                };
                PageProvider.prototype.pullRecord = function (setting, event, success, failure) {
                    var _this = this;
                    new APP.PageFetch(this.model_, this.app_, setting, event, (function (callback) { return function (setting, event, data, textStatus, jqXHR, host) {
                        var record = _this.setRecord(setting, _this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                        callback(record, setting, event);
                    }; })(success), (function (callback) { return function (setting, event, data, textStatus, jqXHR, host) {
                        var record = _this.setRecord(setting, _this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                        callback(record, setting, event);
                    }; })(failure));
                };
                PageProvider.prototype.getRecord = function (setting) {
                    return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
                };
                PageProvider.prototype.setRecord = function (setting, data, textStatus, jqXHR, host) {
                    this.cleanRecords_(setting);
                    this.addOrder_(setting);
                    return this.table_[this.hash_(setting)] = new this.Record_(setting, data, textStatus, jqXHR, host);
                };
                PageProvider.prototype.removeRecord = function (setting) {
                    this.removeOrder_(setting);
                    return this.table_[this.hash_(setting)] = new this.Record_();
                };
                PageProvider.prototype.clearRecord = function () {
                    this.order_ = [];
                    this.table_ = {};
                };
                PageProvider.prototype.cleanRecords_ = function (setting) {
                    if (setting.cache.limit) {
                        while (this.order_.length >= setting.cache.limit) {
                            this.removeRecord(this.app_.configure(this.order_.pop()));
                        }
                    }
                    //for (var i = 0, hash: string, record: PageRecordInterface; hash = this.order_[i];) {
                    //  record = this.getRecord(this.app_.configure(hash));
                    //  !record.state() && this.removeRecord(this.app_.configure(hash));
                    //}
                };
                PageProvider.prototype.addOrder_ = function (setting) {
                    this.removeOrder_(setting);
                    this.order_.unshift(this.hash_(setting));
                };
                PageProvider.prototype.removeOrder_ = function (setting) {
                    for (var i = 0, hash1 = this.hash_(setting), hash2; hash2 = this.order_[i]; i++) {
                        hash1 === hash2 && this.order_.splice(i, 1);
                    }
                };
                return PageProvider;
            })();
            APP.PageProvider = PageProvider;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageUpdate = (function () {
                function PageUpdate(model_, app_, setting_, event_, record_) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.record_ = record_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.loadwaits_ = [];
                    this.main_();
                }
                PageUpdate.prototype.main_ = function () {
                    var app = this.app_, record = this.record_, setting = this.setting_, event = this.event_, data = record.data.jqXHR().responseText, textStatus = record.data.textStatus(), jqXHR = record.data.jqXHR();
                    var callbacks_update = setting.callbacks.update;
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');
                    UPDATE: {
                        ++this.app_.count;
                        this.app_.loadtime = this.app_.loadtime && new Date().getTime() - this.app_.loadtime;
                        if (setting.cache.mix && MODULE.EVENT.POPSTATE !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                            return this.model_.fallback(event);
                        }
                        try {
                            app.page.landing = null;
                            if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) {
                                throw new Error("throw: content-type mismatch");
                            }
                            /* variable define */
                            this.srcDocument_ = this.app_.page.parser.parse(jqXHR.responseText, setting.destLocation.href);
                            this.dstDocument_ = document;
                            // 更新範囲を選出
                            this.area_ = this.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
                            if (!this.area_) {
                                throw new Error('throw: area notfound');
                            }
                            // 更新範囲をセレクタごとに分割
                            this.areas_ = this.area_.match(/(?:[^,]+?|\(.*?\)|\[.*?\])+/g);
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
                            this.redirect_();
                            this.dispatchEvent(window, setting.nss.event.pjax.unload, false, false);
                            this.url_();
                            if (!this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                                throw new Error("throw: location mismatch");
                            }
                            this.document_();
                        }
                        catch (err) {
                            if (!err) {
                                return;
                            }
                            this.model_.getCache(window.location.href) && this.model_.removeCache(setting.destLocation.href);
                            this.model_.fallback(event);
                        }
                        ;
                    }
                    ;
                };
                PageUpdate.prototype.isRegister_ = function (setting, event) {
                    switch (true) {
                        case setting.destLocation.href === setting.origLocation.href:
                        case MODULE.EVENT.POPSTATE === event.type.toLowerCase():
                            return false;
                        default:
                            return true;
                    }
                };
                PageUpdate.prototype.isCacheUsable_ = function (event, setting) {
                    switch (true) {
                        case !setting.cache.click && !setting.cache.submit && !setting.cache.popstate:
                        case MODULE.EVENT.SUBMIT === event.type.toLowerCase() && !setting.cache[event.currentTarget.method.toLowerCase()]:
                            return false;
                        default:
                            return true;
                    }
                };
                PageUpdate.prototype.redirect_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;
                    var url = (jQuery('head meta[http-equiv="Refresh"][content*="URL="]').attr('content') || '').match(/\w+:\/\/[^;\s"']+|$/i).shift();
                    if (!url) {
                        return;
                    }
                    var redirect = setting.destLocation.cloneNode();
                    redirect.href = url;
                    if (this.util_.fire(callbacks_update.redirect.before, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                    ;
                    switch (true) {
                        case !setting.redirect:
                        case redirect.protocol !== setting.destLocation.protocol:
                        case redirect.host !== setting.destLocation.host:
                        case MODULE.EVENT.SUBMIT === event.type.toLowerCase() && 'GET' !== event.currentTarget.method.toUpperCase():
                            switch (event.type.toLowerCase()) {
                                case MODULE.EVENT.CLICK:
                                case MODULE.EVENT.SUBMIT:
                                    window.location.assign(redirect.href);
                                    break;
                                case MODULE.EVENT.POPSTATE:
                                    window.location.replace(redirect.href);
                                    break;
                            }
                            throw false;
                        default:
                            jQuery[MODULE.DEF.NAME].enable();
                            switch (event.type.toLowerCase()) {
                                case MODULE.EVENT.CLICK:
                                case MODULE.EVENT.SUBMIT:
                                    setTimeout(function () { return jQuery[MODULE.DEF.NAME].click(redirect.href); }, 0);
                                    break;
                                case MODULE.EVENT.POPSTATE:
                                    window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                                    if (this.isRegister_(setting, event) && setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                                        jQuery[MODULE.DEF.NAME].disable();
                                        window.history.back();
                                        window.history.forward();
                                        jQuery[MODULE.DEF.NAME].enable();
                                    }
                                    setTimeout(function () { return _this.dispatchEvent(window, MODULE.EVENT.POPSTATE, false, false); }, 0);
                                    break;
                            }
                            throw false;
                    }
                    if (this.util_.fire(callbacks_update.redirect.after, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.url_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;
                    this.model_.location.href = setting.destLocation.href;
                    if (this.util_.fire(callbacks_update.url.before, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                    ;
                    if (this.isRegister_(setting, event)) {
                        window.history.pushState(this.util_.fire(setting.state, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]), ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title, setting.destLocation.href);
                        if (setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                            jQuery[MODULE.DEF.NAME].disable();
                            window.history.back();
                            window.history.forward();
                            jQuery[MODULE.DEF.NAME].enable();
                        }
                    }
                    if (this.util_.fire(callbacks_update.url.after, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.document_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;
                    this.overwriteDocumentByCache_();
                    setting.fix.noscript && this.escapeNoscript_(this.srcDocument_);
                    this.rewrite_();
                    this.title_();
                    setting.fix.history && this.app_.data.saveTitle();
                    this.app_.data.saveExpires(this.record_.data.url(), this.record_.data.host(), this.record_.data.expires());
                    this.head_();
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');
                    this.content_();
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');
                    this.balance_();
                    this.css_('link[rel~="stylesheet"], style');
                    jQuery(window).one(MODULE.DEF.NAME + ':rendering', function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var onready = function (callback) {
                            if (!_this.util_.compareUrl(_this.model_.convertUrlToKeyUrl(setting.destLocation.href), _this.model_.convertUrlToKeyUrl(window.location.href), true)) {
                                return;
                            }
                            _this.dispatchEvent(document, setting.nss.event.pjax.ready, false, false);
                            _this.util_.fire(setting.callback, setting, [event, setting]);
                            return jQuery.when ? _this.waitRender_(jQuery.Deferred().resolve) : _this.waitRender_(callback);
                        };
                        var onrender = function (callback) {
                            if (!_this.util_.compareUrl(_this.model_.convertUrlToKeyUrl(setting.destLocation.href), _this.model_.convertUrlToKeyUrl(window.location.href), true)) {
                                return;
                            }
                            setTimeout(function () {
                                switch (event.type.toLowerCase()) {
                                    case MODULE.EVENT.CLICK:
                                    case MODULE.EVENT.SUBMIT:
                                        _this.scrollByHash_(setting.destLocation.hash) || _this.scroll_(true);
                                        break;
                                    case MODULE.EVENT.POPSTATE:
                                        _this.scroll_(true);
                                        break;
                                }
                            }, 100);
                            _this.dispatchEvent(document, setting.nss.event.pjax.render, false, false);
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');
                            return jQuery.when ? jQuery.when.apply(jQuery, _this.loadwaits_) : callback();
                        };
                        var onload = function () {
                            if (!_this.util_.compareUrl(_this.model_.convertUrlToKeyUrl(setting.destLocation.href), _this.model_.convertUrlToKeyUrl(window.location.href), true)) {
                                return jQuery.when && jQuery.Deferred().reject();
                            }
                            _this.dispatchEvent(window, setting.nss.event.pjax.load, false, false);
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');
                            speedcheck && console.log(speed.time);
                            speedcheck && console.log(speed.name);
                            _this.script_('[src][defer]');
                            // 未定義を返すとエラー
                            return jQuery.when && jQuery.Deferred().resolve();
                        };
                        _this.scroll_(false);
                        if (150 > _this.app_.loadtime && setting.reset.type.match(event.type.toLowerCase()) && !jQuery('form[method][method!="GET"]').length) {
                            switch (false) {
                                case _this.app_.count < setting.reset.count || !setting.reset.count:
                                case new Date().getTime() < setting.reset.time + _this.app_.time || !setting.reset.time:
                                    throw new Error('throw: reset');
                            }
                        }
                        var scriptwaits = _this.script_(':not([defer]), :not([src])');
                        if (jQuery.when) {
                            // 1.7.2のthenは壊れてるのでpipe
                            var then = jQuery.Deferred().pipe ? 'pipe' : 'then';
                            jQuery.when.apply(jQuery, scriptwaits)[then](function () { return onready(); })[then](function () { return onrender(); })[then](function () { return onload(); });
                        }
                        else {
                            onready(function () { return onrender(function () { return onload(); }); });
                        }
                    }).trigger(MODULE.DEF.NAME + ':rendering');
                };
                PageUpdate.prototype.overwriteDocumentByCache_ = function () {
                    var setting = this.setting_, event = this.event_, cache = this.model_.getCache(setting.destLocation.href);
                    if (!this.isCacheUsable_(event, setting)) {
                        return;
                    }
                    if (cache && cache.data) {
                        var html = setting.fix.noscript ? this.restoreNoscript_(cache.data) : cache.data, cacheDocument = this.app_.page.parser.parse(html, setting.destLocation.href), srcDocument = this.srcDocument_;
                        srcDocument.title = cacheDocument.title;
                        var $srcAreas, $dstAreas;
                        for (var i = 0; this.areas_[i]; i++) {
                            $srcAreas = jQuery(this.areas_[i], cacheDocument).clone();
                            $dstAreas = jQuery(this.areas_[i], srcDocument);
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
                    if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) {
                        return;
                    }
                    this.util_.fire(setting.rewrite, setting, [this.srcDocument_, this.area_, this.record_.data.host()]);
                    if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.title_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;
                    if (this.util_.fire(callbacks_update.title.before, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) {
                        return;
                    }
                    this.dstDocument_.title = this.srcDocument_.title;
                    if (this.util_.fire(callbacks_update.title.after, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.head_ = function () {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;
                    if (!setting.load.head) {
                        return;
                    }
                    if (this.util_.fire(callbacks_update.head.before, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) {
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
                    if (this.util_.fire(callbacks_update.head.after, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.content_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;
                    var checker;
                    if (this.util_.fire(callbacks_update.content.before, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) {
                        return;
                    }
                    function map() {
                        var defer = jQuery.Deferred();
                        jQuery(this).one('load error', defer.resolve);
                        return defer;
                    }
                    jQuery(this.area_).children('.' + setting.nss.elem + '-check').remove();
                    checker = jQuery('<div/>', {
                        'class': setting.nss.elem + '-check',
                        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
                    }).text(MODULE.DEF.NAME);
                    var $srcAreas, $dstAreas;
                    for (var i = 0; this.areas_[i]; i++) {
                        $srcAreas = jQuery(this.areas_[i], srcDocument).clone();
                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                            throw new Error('throw: area mismatch');
                        }
                        $srcAreas.find('script').each(function (i, elem) { return _this.escapeScript_(elem); });
                        if (jQuery.when) {
                            this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(map).get());
                        }
                        for (var j = 0; $srcAreas[j]; j++) {
                            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                        }
                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        $dstAreas.append(checker.clone());
                        $dstAreas.find('script').each(function (i, elem) { return _this.restoreScript_(elem); });
                    }
                    this.dispatchEvent(document, setting.nss.event.pjax.DOMContentLoaded, false, false);
                    if (this.util_.fire(callbacks_update.content.after, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.balance_ = function () {
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;
                    if (!setting.balance.active || this.app_.loadtime < 150) {
                        return;
                    }
                    var jqXHR = this.record_.data.jqXHR();
                    var host = jqXHR.getResponseHeader(setting.balance.server.header) || this.record_.data.host() || '', score = Math.ceil(this.app_.loadtime / (jqXHR.responseText.length || 1) * 1e5);
                    if (this.util_.fire(callbacks_update.balance.before, setting, [event, setting, host, this.app_.loadtime, jqXHR.responseText.length]) === false) {
                        return;
                    }
                    this.app_.data.saveServer(host, score);
                    this.app_.balance.changeServer(this.app_.balance.chooseServer(setting), setting);
                    if (this.util_.fire(callbacks_update.balance.after, setting, [event, setting, host, this.app_.loadtime, jqXHR.responseText.length]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.css_ = function (selector) {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;
                    if (!setting.load.css) {
                        return;
                    }
                    var prefilter = 'link, style', $srcElements = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $addElements = jQuery(), $delElements = $dstElements;
                    if (this.util_.fire(callbacks_update.css.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return;
                    }
                    $srcElements = $srcElements.not(setting.load.ignore);
                    $dstElements = $srcElements.not(setting.load.ignore);
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
                                    isSameElement = this.util_.trim(element.innerHTML) === this.util_.trim($delElements[j].innerHTML);
                                    break;
                            }
                            if (isSameElement) {
                                if ($addElements.length) {
                                    if (jQuery.contains(dstDocument.body, $delElements[j]) && $addElements.first().parents('head').length) {
                                        jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                                        $delElements.eq(j).before($addElements.filter(filterBodyContent).clone());
                                    }
                                    else {
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
                    $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter));
                    if (this.util_.fire(callbacks_update.css.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
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
                    var scriptwaits = [], scripts = [];
                    if (!setting.load.script) {
                        return scriptwaits;
                    }
                    var prefilter = 'script', $srcElements = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter)), loadedScripts = this.app_.page.loadedScripts, regType = /^$|(?:application|text)\/(?:java|ecma)script/i, regRemove = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                    if (this.util_.fire(callbacks_update.script.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return scriptwaits;
                    }
                    $srcElements = $srcElements.not(setting.load.ignore);
                    var exec = function (element, response) {
                        if (!_this.util_.compareUrl(_this.model_.convertUrlToKeyUrl(setting.destLocation.href), _this.model_.convertUrlToKeyUrl(window.location.href), true)) {
                            return false;
                        }
                        if (element.src) {
                            loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                        }
                        try {
                            if (_this.model_.isDeferrable) {
                                if ('string' === typeof response) {
                                    eval.call(window, response);
                                }
                                else {
                                    throw response;
                                }
                            }
                            else {
                                if (element.hasAttribute('src')) {
                                    jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, {
                                        url: element.src,
                                        dataType: 'script',
                                        async: false,
                                        global: false,
                                        success: function () { return null; },
                                        error: function (err) {
                                            throw err;
                                        }
                                    }));
                                }
                                else {
                                    eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
                                }
                            }
                            try {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'load', false, false);
                            }
                            catch (e) {
                            }
                        }
                        catch (err) {
                            try {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'error', false, false);
                            }
                            catch (e) {
                            }
                            if (true === setting.load.error) {
                                throw err;
                            }
                            else {
                                _this.util_.fire(setting.load.error, setting, [err, element]);
                            }
                        }
                    };
                    for (var i = 0, element; element = $srcElements[i]; i++) {
                        if (!regType.test(element.type || '')) {
                            continue;
                        }
                        if (element.hasAttribute('src') ? loadedScripts[element.src] : !this.util_.trim(element.innerHTML)) {
                            continue;
                        }
                        LOG: {
                            var srcLogParent = jQuery(element).parent(setting.load.log)[0];
                            if (!srcLogParent || jQuery(element).parents(this.area_).length) {
                                break LOG;
                            }
                            var dstLogParent = jQuery(srcLogParent.id || srcLogParent.tagName, dstDocument)[0], log = element.cloneNode(true);
                            this.escapeScript_(log);
                            dstLogParent.appendChild(log);
                            this.restoreScript_(log);
                        }
                        ;
                        // リストアップ
                        (function (element) {
                            var defer = _this.model_.isDeferrable && jQuery.Deferred();
                            if (element.hasAttribute('src') && element.getAttribute('src')) {
                                loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                                if (element.hasAttribute('async')) {
                                    jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, {
                                        url: element.src,
                                        dataType: 'script',
                                        async: true,
                                        global: false,
                                        success: function () { return _this.dispatchEvent(element, 'load', false, false); },
                                        error: function () { return _this.dispatchEvent(element, 'error', false, false); }
                                    }));
                                }
                                else {
                                    if (defer) {
                                        jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, {
                                            url: element.src,
                                            dataType: 'text',
                                            async: true,
                                            global: false,
                                            success: function () { return defer.resolve([element, arguments[0]]); },
                                            error: function (err) { return defer.resolve([element, err]); }
                                        }));
                                        scriptwaits.push(defer);
                                    }
                                    else {
                                        scripts.push(element);
                                    }
                                }
                            }
                            else if (!element.hasAttribute('src')) {
                                if (defer) {
                                    scriptwaits.push(defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]));
                                }
                                else {
                                    scripts.push(element);
                                }
                            }
                        })(element);
                    }
                    try {
                        if (this.model_.isDeferrable) {
                            jQuery.when.apply(jQuery, scriptwaits).always(function () { return jQuery.each(arguments, function (i, args) { return exec.apply(_this, args); }); });
                        }
                        else {
                            jQuery.each(scripts, function (i, elem) { return exec(elem); });
                        }
                    }
                    catch (err) {
                        setTimeout(function () { return _this.model_.fallback(event); }, 1);
                        throw err;
                    }
                    $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter));
                    if (this.util_.fire(callbacks_update.script.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
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
                    if (this.util_.fire(callbacks_update.scroll.before, setting, [event, setting]) === false) {
                        return;
                    }
                    var scrollX, scrollY;
                    switch (event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                        case MODULE.EVENT.SUBMIT:
                            scrollX = call && 'function' === typeof setting.scrollLeft ? this.util_.fire(setting.scrollLeft, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollLeft;
                            scrollX = 0 <= scrollX ? scrollX : 0;
                            scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);
                            scrollY = call && 'function' === typeof setting.scrollTop ? this.util_.fire(setting.scrollTop, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollTop;
                            scrollY = 0 <= scrollY ? scrollY : 0;
                            scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);
                            window.scrollTo(scrollX, scrollY);
                            break;
                        case MODULE.EVENT.POPSTATE:
                            call && setting.fix.scroll && this.app_.data.loadScrollPosition();
                            break;
                    }
                    call && this.app_.data.saveScrollPosition();
                    if (this.util_.fire(callbacks_update.scroll.after, setting, [event, setting]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.waitRender_ = function (callback) {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;
                    var callbacks_update = setting.callbacks.update;
                    var areas = jQuery(this.area_), checker = areas.children('.' + setting.nss.elem + '-check'), limit = new Date().getTime() + 5 * 1000;
                    function filterChecker() {
                        return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
                    }
                    var check = function () {
                        switch (true) {
                            case !_this.util_.compareUrl(setting.destLocation.href, _this.util_.normalizeUrl(window.location.href)):
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
                        this.app_.data.saveScrollPosition();
                        return true;
                    }
                    else {
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
                    return html.replace(/(<noscript>)([^<>]+?)(<\/noscript>)/gim, function ($0, $1, $2, $3) { return $1 + $span.html($2).text() + $3; });
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
                    }
                    else {
                        script.removeAttribute('src');
                    }
                    script.innerHTML = jQuery.data(script, 'code');
                    jQuery.removeData(script, 'code');
                };
                PageUpdate.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageUpdate.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return PageUpdate;
            })();
            APP.PageUpdate = PageUpdate;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageParser = (function () {
                function PageParser() {
                }
                PageParser.prototype.test_ = function (mode) {
                    try {
                        var html = '<html lang="en" class="html"><head><title>&amp;</title><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>', doc = this.parse(html, window.location.href, mode);
                        switch (false) {
                            case !!doc:
                            case doc.URL && decodeURI(doc.URL) === decodeURI(window.location.href):
                            case doc.title === '&':
                            case !!doc.querySelector('html.html[lang="en"]'):
                            case !!doc.querySelector('head>link')['href']:
                            case !!doc.querySelector('head>noscript')['innerHTML']:
                            case !!doc.querySelector('body>noscript')['innerHTML']:
                            case !!doc.querySelector('body>a')['href']:
                                throw true;
                        }
                        return mode;
                    }
                    catch (err) {
                    }
                };
                PageParser.prototype.parse = function (html, uri, mode) {
                    if (mode === void 0) { mode = this.mode_; }
                    html += ~html.search(/<title[\s>]/i) ? '' : '<title></title>';
                    var backup = !uri || !MODULE.LIBRARY.Utility.compareUrl(uri, window.location.href, true) ? window.location.href : undefined;
                    backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, uri);
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
                                    this.mode_ = this.test_('doc') || this.test_('dom') || this.test_('manipulate');
                                    break;
                                case 'firefox':
                                    this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
                                    break;
                                case 'trident':
                                    this.mode_ = this.test_('manipulate') || this.test_('dom') || this.test_('doc');
                                    break;
                                default:
                                    this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
                            }
                            doc = this.mode_ && this.parse(html, uri);
                            break;
                    }
                    backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, backup);
                    return doc;
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
                };
                return PageParser;
            })();
            APP.PageParser = PageParser;
            var PageParserSingleton = (function () {
                function PageParserSingleton() {
                    PageParserSingleton.instance_ = PageParserSingleton.instance_ || new PageParser();
                }
                PageParserSingleton.prototype.singleton_ = function () {
                    return PageParserSingleton.instance_;
                };
                PageParserSingleton.prototype.parse = function (html, uri) {
                    return this.singleton_().parse(html, uri);
                };
                return PageParserSingleton;
            })();
            APP.PageParserSingleton = PageParserSingleton;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.provider.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.parser.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            MODULE.MIXIN(APP.PageFetch, [APP.PageUtility]);
            MODULE.MIXIN(APP.PageUpdate, [APP.PageUtility]);
            var Page = (function () {
                function Page(model_, app_) {
                    var _this = this;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.parser = new APP.PageParserSingleton();
                    this.provider = new APP.PageProvider(APP.PageRecord, this.model_, this.app_);
                    this.landing = this.util_.normalizeUrl(window.location.href);
                    this.loadedScripts = {};
                    setTimeout(function () { return _this.parser.parse('') || _this.model_.disable(); }, 300);
                }
                Page.prototype.transfer = function (setting, event) {
                    switch (event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            this.app_.data.saveTitle();
                            this.app_.data.saveScrollPosition();
                            break;
                        case MODULE.EVENT.SUBMIT:
                            this.app_.data.saveTitle();
                            this.app_.data.saveScrollPosition();
                            break;
                        case MODULE.EVENT.POPSTATE:
                            this.app_.data.saveTitle(setting.origLocation.href, document.title);
                            setting.fix.history && this.app_.data.loadTitle();
                            break;
                    }
                    setting = jQuery.extend(true, {}, setting);
                    setting.origLocation = setting.origLocation.cloneNode();
                    setting.destLocation = setting.destLocation.cloneNode();
                    setting = MODULE.FREEZE(setting);
                    this.fetch_(setting, event);
                };
                Page.prototype.getWait = function () {
                    return this.wait_;
                };
                Page.prototype.setWait = function (task) {
                    this.wait_ && this.wait_.state && 'pending' === this.wait_.state() && this.wait_.reject();
                    return this.wait_ = task;
                };
                Page.prototype.fetch_ = function (setting, event) {
                    var _this = this;
                    this.provider.fetchRecord(setting, event, function (record, setting, event) { return _this.success_(record, setting, event); }, function (record, setting, event) { return _this.failure_(record, setting, event); });
                };
                Page.prototype.success_ = function (record, setting, event) {
                    new APP.PageUpdate(this.model_, this.app_, setting, event, record);
                };
                Page.prototype.failure_ = function (record, setting, event) {
                    var _this = this;
                    if (!setting.fallback || 'abort' === record.data.textStatus()) {
                        return;
                    }
                    this.app_.data.saveExpires(setting.destLocation.href, '', 0);
                    if (setting.balance.active) {
                        this.app_.data.saveServer(record.data.host(), 0, new Date().getTime());
                        this.app_.balance.changeServer(this.app_.balance.chooseServer(setting), setting);
                    }
                    setTimeout(function () { return _this.model_.fallback(event); }, 100);
                };
                Page.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                Page.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return Page;
            })();
            APP.Page = Page;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.balance.ts"/>
/// <reference path="app.proxy.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            MODULE.MIXIN(APP.Page, [APP.PageUtility]);
            var Main = (function () {
                function Main(model_, controller_) {
                    this.model_ = model_;
                    this.controller_ = controller_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.settings_ = {};
                    this.balance = new APP.Balance(this.model_, this);
                    this.proxy = new APP.Proxy(this.model_, this);
                    this.page = new APP.Page(this.model_, this);
                    this.data = new APP.Data(this.model_, this);
                    this.count = 0;
                    this.time = new Date().getTime();
                    this.loadtime = 0;
                }
                Main.prototype.initialize = function ($context, setting) {
                    var _this = this;
                    if (setting.load.script) {
                        var loadedScripts = this.page.loadedScripts;
                        jQuery('script').each(function () {
                            var element = this;
                            if (element.src) {
                                loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                            }
                        });
                    }
                    this.controller_.view($context, setting);
                    setTimeout(function () { return _this.data.loadBuffers(setting.buffer.limit); }, setting.buffer.delay);
                    setTimeout(function () { return _this.balance.enable(setting); }, setting.buffer.delay + 100);
                    setTimeout(function () { return _this.proxy.install(setting); }, setting.buffer.delay + 100);
                    setTimeout(function () { return _this.page.landing = null; }, 1500);
                };
                Main.prototype.configure = function (destination) {
                    var _this = this;
                    var event = destination.preventDefault ? destination : null;
                    switch (event && 'object' === typeof event && event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            return this.configure(event.currentTarget);
                        case MODULE.EVENT.SUBMIT:
                            return this.configure(event.currentTarget);
                        case MODULE.EVENT.POPSTATE:
                            return this.configure(window.location);
                        case null:
                            break;
                    }
                    var url;
                    switch (true) {
                        case 'string' === typeof destination:
                            url = destination;
                            break;
                        case 'href' in destination:
                            url = this.util_.normalizeUrl(destination.href);
                            break;
                        case 'action' in destination:
                            url = this.util_.normalizeUrl(destination.action.replace(/[?#].*/, ''));
                            switch (destination.method.toUpperCase()) {
                                case 'GET':
                                    url += '?' + jQuery(destination).serialize();
                                    break;
                            }
                            break;
                        default:
                            url = this.model_.location.href;
                            this.option_ = destination;
                    }
                    var index = [
                        this.util_.canonicalizeUrl(this.model_.location.href).slice(0, 2048),
                        this.util_.canonicalizeUrl(url).slice(0, 2048)
                    ].join(' ');
                    if (!this.option_) {
                        return null;
                    }
                    if (index in this.settings_) {
                        return this.settings_[index];
                    }
                    var origLocation = this.model_.location.cloneNode(), destLocation = this.model_.location.cloneNode();
                    destLocation.href = url;
                    var scope = this.scope_(this.option_, origLocation.href, destLocation.href) || null;
                    var initial = {
                        area: 'body',
                        link: 'a:not([target])',
                        // this.protocolはIEでエラー
                        filter: function () {
                            return /^https?:/.test(this.href) && /\/[^.]*$|\.(html?|php)$/.test(this.pathname.replace(/^\/?/, '/'));
                        },
                        form: null,
                        scope: null,
                        rewrite: null,
                        state: null,
                        scrollTop: 0,
                        scrollLeft: 0,
                        ajax: { dataType: 'text' },
                        contentType: 'text/html',
                        redirect: true,
                        cache: {
                            click: false,
                            submit: false,
                            popstate: false,
                            get: true,
                            post: true,
                            mix: 0,
                            limit: 100 /* pages */,
                            expires: { max: null, min: 5 * 60 * 1000 /* 5min */ }
                        },
                        buffer: {
                            limit: 30,
                            delay: 500
                        },
                        load: {
                            head: '',
                            css: false,
                            script: false,
                            ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
                            reload: '',
                            execute: true,
                            log: 'head, body',
                            error: true,
                            ajax: { dataType: 'script', cache: true }
                        },
                        balance: {
                            active: false,
                            weight: 3,
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
                            },
                            client: {
                                hosts: [],
                                proxy: {
                                    worker: ''
                                },
                                support: {
                                    browser: /msie|trident.+ rv:|chrome|firefox|safari/i,
                                    redirect: /chrome|firefox|safari/i
                                },
                                cookie: {
                                    balance: 'balanceable',
                                    redirect: 'redirectable',
                                    host: 'host'
                                }
                            },
                            server: {
                                header: 'X-Ajax-Host',
                                respite: 10 * 60 * 1000
                            },
                            history: {
                                expires: 10 * 24 * 60 * 60 * 1000,
                                limit: 30
                            }
                        },
                        wait: 0,
                        fallback: true,
                        reset: {
                            type: '',
                            count: 100,
                            time: 3 * 60 * 60 * 1000
                        },
                        fix: {
                            location: true,
                            history: true,
                            scroll: true,
                            noscript: true
                        },
                        database: true,
                        server: {
                            query: null,
                            header: true
                        },
                        callback: null,
                        callbacks: {
                            ajax: {},
                            update: { redirect: {}, url: {}, rewrite: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
                        },
                        data: undefined
                    }, force = {
                        ns: '',
                        nss: undefined,
                        speedcheck: undefined,
                        origLocation: origLocation,
                        destLocation: destLocation,
                        scroll: { queue: [] },
                        option: this.option_
                    }, compute = function () {
                        setting.ns = setting.ns ? setting.ns.split('.').sort().join('.') : '';
                        var nsArray = [MODULE.DEF.NAME].concat(setting.ns ? setting.ns.split('.') : []);
                        var query = setting.server.query;
                        switch (query && typeof query) {
                            case 'string':
                                query = eval('({' + query.match(/[^?=&]+=[^&]*/g).join('&').replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]*)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
                            case 'object':
                                query = jQuery.param(query);
                                break;
                            default:
                                query = '';
                        }
                        return {
                            ns: undefined,
                            origLocation: undefined,
                            destLocation: undefined,
                            scroll: undefined,
                            option: undefined,
                            speedcheck: undefined,
                            nss: {
                                array: nsArray,
                                name: nsArray.join('.'),
                                data: nsArray[0],
                                url: _this.model_.convertUrlToKeyUrl(setting.destLocation.href),
                                event: {
                                    pjax: {
                                        fetch: [MODULE.EVENT.PJAX, 'fetch'].join(':'),
                                        unload: [MODULE.EVENT.PJAX, 'unload'].join(':'),
                                        DOMContentLoaded: [MODULE.EVENT.PJAX, 'DOMContentLoaded'].join(':'),
                                        ready: [MODULE.EVENT.PJAX, 'ready'].join(':'),
                                        render: [MODULE.EVENT.PJAX, 'render'].join(':'),
                                        load: [MODULE.EVENT.PJAX, 'load'].join(':')
                                    },
                                    click: [MODULE.EVENT.CLICK].concat(nsArray.join(':')).join('.'),
                                    submit: [MODULE.EVENT.SUBMIT].concat(nsArray.join(':')).join('.'),
                                    popstate: [MODULE.EVENT.POPSTATE].concat(nsArray.join(':')).join('.'),
                                    scroll: [MODULE.EVENT.SCROLL].concat(nsArray.join(':')).join('.')
                                },
                                elem: nsArray.join('-'),
                                requestHeader: ['X', nsArray[0].replace(/^\w/, function (str) {
                                    return str.toUpperCase();
                                })].join('-')
                            },
                            fix: /android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? undefined : { location: false },
                            contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
                            reset: {
                                type: (setting.reset.type || '').toLowerCase()
                            },
                            server: {
                                query: query
                            },
                            timeStamp: new Date().getTime()
                        };
                    };
                    var setting;
                    setting = jQuery.extend(true, initial, scope || this.option_);
                    setting = jQuery.extend(true, setting, setting.balance.active && setting.balance.option, force);
                    setting = jQuery.extend(true, setting, compute());
                    if (scope) {
                        MODULE.FREEZE(setting, true);
                        this.settings_[index] = setting;
                        return setting;
                    }
                    else {
                        this.settings_[index] = null;
                        return null;
                    }
                };
                Main.prototype.scope_ = function (option, origURL, destURL, rewriteKeyUrl) {
                    if (rewriteKeyUrl === void 0) { rewriteKeyUrl = ''; }
                    option = jQuery.extend(true, {}, option);
                    if (!option.scope) {
                        return option;
                    }
                    var origKeyUrl, destKeyUrl, scpTable = option.scope, dirs, scpKeys, scpKey, scpTag, scope;
                    origKeyUrl = this.model_.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
                    destKeyUrl = this.model_.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
                    rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');
                    scpKeys = (rewriteKeyUrl || destKeyUrl).split('/');
                    if (rewriteKeyUrl) {
                        if (!~rewriteKeyUrl.indexOf('*')) {
                            return undefined;
                        }
                        dirs = [];
                        var arr = origKeyUrl.split('/');
                        for (var i = 0, len = scpKeys.length; i < len; i++) {
                            '*' === scpKeys[i] && dirs.push(arr[i]);
                        }
                    }
                    for (var i = scpKeys.length; i--;) {
                        scpKey = scpKeys.slice(0, i + 1).join('/');
                        scpKey = scpKey + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(scpKey.length) ? '/' : '');
                        if (!scpKey || !(scpKey in scpTable)) {
                            continue;
                        }
                        var patterns;
                        if (scpTable[scpKey] instanceof Array) {
                            scpTag = '';
                            patterns = scpTable[scpKey];
                        }
                        else {
                            scpTag = scpTable[scpKey];
                            patterns = scpTable[scpTag];
                        }
                        if (patterns) {
                            patterns = patterns.concat();
                        }
                        else {
                            continue;
                        }
                        var hit_src, hit_dst, inherit;
                        inherit = scope = hit_src = hit_dst = undefined;
                        for (var j = 0, pattern; pattern = patterns[j]; j++) {
                            if ('#' === pattern.charAt(0)) {
                                scpTag = pattern.slice(1);
                                [].splice.apply(patterns, [j, 1].concat(scpTable[scpTag]));
                                pattern = patterns[j];
                            }
                            if ('inherit' === pattern) {
                                inherit = true;
                            }
                            else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
                                scope = this.scope_(option, origURL, destURL, this.util_.fire(scpTable.rewrite, null, [destKeyUrl]));
                                if (scope) {
                                    hit_src = hit_dst = true;
                                }
                                else if (null === scope) {
                                    hit_src = hit_dst = false;
                                }
                            }
                            else if ('string' === typeof pattern) {
                                var not = '!' === pattern.charAt(0);
                                pattern = not ? pattern.slice(1) : pattern;
                                var reg = '*' === pattern.charAt(0);
                                pattern = reg ? pattern.slice(1) : pattern;
                                if (rewriteKeyUrl && ~pattern.indexOf('/*/')) {
                                    for (var k = 0, len = dirs.length; k < len; k++) {
                                        pattern = pattern.replace('/*/', '/' + dirs[k] + '/');
                                    }
                                }
                                if (reg ? ~origKeyUrl.search(pattern) : ~origKeyUrl.indexOf(pattern)) {
                                    if (not) {
                                        hit_src = false;
                                    }
                                    else {
                                        hit_src = true;
                                    }
                                }
                                if (reg ? ~destKeyUrl.search(pattern) : ~destKeyUrl.indexOf(pattern)) {
                                    if (not) {
                                        hit_dst = false;
                                    }
                                    else {
                                        hit_dst = true;
                                        scope = scpTable['$' + scpTag] || scpTable['$' + pattern] || undefined;
                                    }
                                }
                            }
                            if (false === hit_src || false === hit_dst) {
                                return null;
                            }
                        }
                        if (hit_src && hit_dst) {
                            return jQuery.extend(true, option, scope);
                        }
                        else if (inherit) {
                            continue;
                        }
                        break;
                    }
                    return undefined;
                };
                return Main;
            })();
            APP.Main = Main;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        MODEL.App = MODEL.APP.Main;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.call(this, 1 /* initiate */);
                this.controller_ = new MODULE.Controller(this).singleton();
                this.app_ = new MODEL.App(this, this.controller_);
                this.util_ = MODULE.LIBRARY.Utility;
                this.isDeferrable = !!jQuery.when && '1.006' <= jQuery().jquery.match(/\d[\d.]+\d/).pop().replace(/\.(\d+)/g, '.00$1').replace(/0*(\d{3})/g, '$1');
                this.location = document.createElement('a');
                this.queue_ = [];
            }
            Main.prototype.getRequestDomain = function () {
                return this.host();
            };
            Main.prototype.setRequestDomain = function (host) {
                return this.app_.balance.changeServer(host.split('//').pop());
            };
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
                        $context = $context instanceof MODULE.DEF.NAMESPACE ? $context : jQuery(document)[MODULE.DEF.NAME]();
                        MODULE.FREEZE(option, true);
                        break;
                    default:
                        return $context;
                }
                if (!window.history || !window.history['pushState'] || !window.history['replaceState']) {
                    return $context;
                }
                this.location.href = this.util_.normalizeUrl(window.location.href);
                var setting = this.app_.configure(option);
                if (!setting) {
                    return $context;
                }
                this.app_.data.connect(setting);
                this.speed = {
                    fire: 0,
                    time: [],
                    name: [],
                    now: function () {
                        return new Date().getTime();
                    }
                };
                jQuery(function () {
                    _this.app_.initialize($context, setting);
                    _this.state_ = _this.state() === 1 /* initiate */ ? 2 /* open */ : _this.state();
                });
                return $context;
            };
            Main.prototype.convertUrlToKeyUrl = function (unsafe_url) {
                return unsafe_url.replace(/#.*/, '');
            };
            Main.prototype.configure = function (destination) {
                return this.app_.configure(destination);
            };
            Main.prototype.isAvailable = function (event) {
                if (2 /* open */ !== this.state()) {
                    return false;
                }
                if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return false;
                }
                var setting;
                switch (event.type.toLowerCase()) {
                    case MODULE.EVENT.CLICK:
                        setting = this.app_.configure(event.currentTarget);
                        if (setting && !jQuery(event.currentTarget).filter(setting.filter).length) {
                            return false;
                        }
                        break;
                    case MODULE.EVENT.SUBMIT:
                        setting = this.app_.configure(event.currentTarget);
                        break;
                    case MODULE.EVENT.POPSTATE:
                        setting = this.app_.configure(window.location);
                        break;
                }
                if (!setting) {
                    return false;
                }
                if (setting.origLocation.protocol !== setting.destLocation.protocol || setting.origLocation.host !== setting.destLocation.host) {
                    return false;
                }
                if (setting.destLocation.hash && setting.origLocation.href.replace(/#.*/, '') === setting.destLocation.href.replace(/#.*/, '')) {
                    return false;
                }
                if (!this.app_.page.chooseArea(setting.area, document, document)) {
                    return false;
                }
                return true;
            };
            Main.prototype.getXHR = function () {
                return this.app_.page.xhr;
            };
            Main.prototype.setXHR = function (xhr) {
                this.app_.page.xhr && this.app_.page.xhr.readyState < 4 && this.app_.page.xhr.abort();
                return this.app_.page.xhr = xhr;
            };
            Main.prototype.click = function (event) {
                PROCESS: {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(context);
                    switch (false) {
                        case !event.isDefaultPrevented():
                        case !!setting:
                        case this.state() === 2 /* open */:
                        case this.isAvailable(event):
                            break PROCESS;
                    }
                    this.app_.page.transfer(setting, event);
                    event.preventDefault();
                    return;
                }
                ;
                // clickメソッド用
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event);
            };
            Main.prototype.submit = function (event) {
                PROCESS: {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(context);
                    switch (false) {
                        case !event.isDefaultPrevented():
                        case !!setting:
                        case this.state() === 2 /* open */:
                        case this.isAvailable(event):
                            break PROCESS;
                    }
                    this.app_.page.transfer(setting, event);
                    event.preventDefault();
                    return;
                }
                ;
                // submitメソッド用
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context).length && this.fallback(event);
            };
            Main.prototype.popstate = function (event) {
                PROCESS: {
                    if (this.app_.page.landing && this.app_.page.landing === this.util_.normalizeUrl(window.location.href)) {
                        return;
                    }
                    if (this.location.href === this.util_.normalizeUrl(window.location.href)) {
                        return;
                    }
                    event.timeStamp = new Date().getTime();
                    var setting = this.app_.configure(window.location);
                    if (setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
                        return;
                    }
                    switch (false) {
                        case !!setting:
                        case this.state() === 2 /* open */:
                        case this.isAvailable(event):
                            break PROCESS;
                    }
                    this.app_.page.transfer(setting, event);
                    return;
                }
                ;
                // pjax処理されないURL変更によるページ更新
                2 /* open */ === this.state() && !this.util_.compareUrl(this.convertUrlToKeyUrl(setting.origLocation.href), this.convertUrlToKeyUrl(window.location.href), true) && this.fallback(event);
            };
            Main.prototype.scroll = function (event, end) {
                var _this = this;
                var id;
                while (id = this.queue_.shift()) {
                    clearTimeout(id);
                }
                id = setTimeout(function () {
                    while (id = _this.queue_.shift()) {
                        clearTimeout(id);
                    }
                    _this.util_.compareUrl(window.location.href, _this.location.href) && _this.app_.data.saveScrollPosition();
                }, 300);
                this.queue_.push(id);
            };
            Main.prototype.fallback = function (event) {
                var setting = this.configure(event);
                switch (true) {
                    case setting && !setting.fallback:
                    case setting && false === this.util_.fire(setting.fallback, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]):
                        break;
                    default:
                        this.movePageNormally_(event);
                }
            };
            Main.prototype.movePageNormally_ = function (event) {
                switch (event.type.toLowerCase()) {
                    case MODULE.EVENT.CLICK:
                        window.location.assign(event.currentTarget.href);
                        break;
                    case MODULE.EVENT.SUBMIT:
                        switch (event.currentTarget.method.toUpperCase()) {
                            case 'GET':
                                window.location.assign(event.currentTarget.action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
                                break;
                            case 'POST':
                                window.location.assign(event.currentTarget.action);
                                break;
                        }
                        break;
                    case MODULE.EVENT.POPSTATE:
                        window.location.reload();
                        break;
                }
            };
            Main.prototype.enable = function () {
                this.state_ = 2 /* open */;
            };
            Main.prototype.disable = function () {
                this.state_ = 3 /* pause */;
            };
            Main.prototype.getCache = function (unsafe_url) {
                var setting = this.configure(this.convertUrlToKeyUrl(unsafe_url));
                if (!setting) {
                    return;
                }
                var record = this.app_.page.provider.getRecord(setting);
                return record.data.data() || record.data.jqXHR() ? {
                    data: record.data.data(),
                    textStatus: record.data.textStatus(),
                    jqXHR: record.data.jqXHR(),
                    expires: record.data.expires(setting.cache.expires.min, setting.cache.expires.max),
                    host: record.data.host()
                } : undefined;
            };
            Main.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR) {
                var setting = this.configure(this.convertUrlToKeyUrl(unsafe_url));
                if (!setting) {
                    return;
                }
                var record = this.app_.page.provider.getRecord(setting);
                this.app_.page.provider.setRecord(setting, data || '', textStatus || record.data.textStatus(), jqXHR || record.data.jqXHR(), record.data.host());
            };
            Main.prototype.removeCache = function (unsafe_url) {
                var setting = this.configure(this.convertUrlToKeyUrl(unsafe_url));
                if (!setting) {
                    return;
                }
                this.app_.page.provider.removeRecord(setting);
            };
            Main.prototype.clearCache = function () {
                this.app_.page.provider.clearRecord();
            };
            Main.prototype.proxy = function () {
                return this.app_.balance.bypass();
            };
            return Main;
        })(MODEL.Template);
        MODEL.Main = Main;
        var Singleton = (function () {
            function Singleton() {
                Singleton.instance_ = Singleton.instance_ || new Main();
            }
            Singleton.singleton = function () {
                return Singleton.instance_;
            };
            Singleton.prototype.singleton = function () {
                return Singleton.singleton();
            };
            return Singleton;
        })();
        MODEL.Singleton = Singleton;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.Model = MODULE.MODEL.Singleton;
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
