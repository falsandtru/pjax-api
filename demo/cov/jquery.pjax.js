/**
 * 
 * jquery-pjax
 * 
 * @name jquery-pjax
 * @version 2.27.0
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
    (function (DEF) {
        DEF.NAME = 'pjax';
        DEF.NAMESPACE = jQuery;
    })(MODULE.DEF || (MODULE.DEF = {}));
    var DEF = MODULE.DEF;
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
        CLICK: 'click',
        SUBMIT: 'submit',
        POPSTATE: 'popstate',
        SCROLL: 'scroll'
    };

    

    

    

    
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

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            (function (DATA) {
                

                
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    // Macro
    function MIXIN(baseClass, mixClasses) {
        var baseClassPrototype = baseClass.prototype;
        for (var iMixClasses = mixClasses.length; iMixClasses--;) {
            var mixClassPrototype = mixClasses[iMixClasses].prototype;
            for (var iProperty in mixClassPrototype) {
                if ('constructor' === iProperty || !mixClassPrototype.hasOwnProperty(iProperty)) {
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
                this.context_.delegate(setting.link, setting.nss.click, this.handlers.click).delegate(setting.form, setting.nss.submit, this.handlers.submit);
                jQuery(window).bind(setting.nss.popstate, this.handlers.popstate);

                setting.database && setting.fix.scroll && jQuery(window).bind(setting.nss.scroll, this.handlers.scroll);
                return this;
            };

            Main.prototype.release_ = function (setting) {
                this.context_.undelegate(setting.link, setting.nss.click).undelegate(setting.form, setting.nss.submit);
                jQuery(window).unbind(setting.nss.popstate);

                setting.database && setting.fix.scroll && jQuery(window).unbind(setting.nss.scroll);
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
                setting && $anchor.first().one(setting.nss.click, function () {
                    return MODULE.Controller.singleton().click(arguments);
                }).click();
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
                setting && $form.first().one(setting.nss.submit, function () {
                    return MODULE.Controller.singleton().submit(arguments);
                }).submit();
                return this;
            };

            Functions.prototype.getCache = function (url) {
                if (typeof url === "undefined") { url = window.location.href; }
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
                        MODULE.Model.singleton().setCache(url, data, textStatus, jqXHR);
                }
                return this;
            };

            Functions.prototype.removeCache = function (url) {
                if (typeof url === "undefined") { url = window.location.href; }
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

            Functions.prototype.host = function () {
                return MODULE.Model.singleton().host();
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
        var Methods = (function () {
            function Methods() {
                MODULE.FREEZE(this);
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
                window[MODULE.DEF.NAMESPACE] = window[MODULE.DEF.NAMESPACE] || {};
                if (MODULE.DEF.NAMESPACE.prototype) {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = MODULE.DEF.NAMESPACE.prototype[MODULE.DEF.NAME] = this.EXTENSION;
                } else {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = this.EXTENSION;
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
                if (typeof model === "undefined") { model = MODULE.Model.singleton(); }
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
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    MODULE.Controller = MODULE.CONTROLLER.Singleton;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (LIBRARY) {
        var Task = (function () {
            function Task(mode, size) {
                if (typeof mode === "undefined") { mode = 1; }
                if (typeof size === "undefined") { size = 0; }
                this.list_ = [];
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
                if (typeof mode === "undefined") { mode = this.config_.mode; }
                if (typeof size === "undefined") { size = this.config_.size; }
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
                } else {
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
                    } else {
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
    })(MODULE.LIBRARY || (MODULE.LIBRARY = {}));
    var LIBRARY = MODULE.LIBRARY;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            (function (DATA) {
                (function (DB) {
                    /* MODEL */
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
                    })(DB.STATEFUL || (DB.STATEFUL = {}));
                    var STATEFUL = DB.STATEFUL;
                })(DATA.DB || (DATA.DB = {}));
                var DB = DATA.DB;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/// <reference path="data.db.stateful.task.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            (function (DATA) {
                /* MODEL */
                (function (DB) {
                    var Stateful = (function () {
                        function Stateful(origin_, connect_, extend_) {
                            var _this = this;
                            this.origin_ = origin_;
                            this.connect_ = connect_;
                            this.extend_ = extend_;
                            this.state_ = function () {
                                return _this.origin_.state();
                            };
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
                })(DATA.DB || (DATA.DB = {}));
                var DB = DATA.DB;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));

var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            (function (DATA) {
                (function (DB) {
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
                                setTimeout(function () {
                                    return _this.origin.resolve();
                                }, 1);
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
                    })(DB.STATE || (DB.STATE = {}));
                    var STATE = DB.STATE;
                })(DATA.DB || (DATA.DB = {}));
                var DB = DATA.DB;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
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
                        this.autoIncrement = true;
                        this.indexes = [];
                        this.limit = 0;
                        this.buffer_ = [];
                    }
                    Store.prototype.accessStore = function (success, mode) {
                        var _this = this;
                        if (typeof mode === "undefined") { mode = 'readwrite'; }
                        try  {
                            var database = this.DB.database(), store = database && database.transaction(this.name, mode).objectStore(this.name);
                        } catch (err) {
                        }

                        if (store) {
                            success(store);
                        } else {
                            this.DB.open().done(function () {
                                return _this.accessStore(success);
                            });
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
                            } else if (range) {
                                req = store.index(index).openCursor(range);
                            } else {
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
                        if (typeof limit === "undefined") { limit = 0; }
                        var buffer = this.buffer_;
                        if (this.indexes.length) {
                            this.accessAll(this.indexes[0].name, this.DB.IDBKeyRange.upperBound(Infinity), 'prev', callback);
                        } else {
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
                        var buffer = this.buffer_;
                        this.accessStore(function (store) {
                            for (var i in buffer) {
                                store.put(buffer[i]);
                            }
                        });
                    };

                    Store.prototype.getBuffers = function () {
                        return this.buffer_;
                    };

                    Store.prototype.setBuffers = function (values, merge) {
                        for (var i in values) {
                            this.setBuffer(values[i], merge);
                        }
                        return this.buffer_;
                    };

                    Store.prototype.getBuffer = function (key) {
                        return this.buffer_[key];
                    };

                    Store.prototype.setBuffer = function (value, merge) {
                        var key = value[this.keyPath];
                        this.buffer_[key] = !merge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
                        return this.buffer_[key];
                    };

                    Store.prototype.addBuffer = function (value) {
                        value[this.keyPath] = this.buffer_.length || 1;
                        this.buffer_.push(value);
                        return value;
                    };

                    Store.prototype.removeBuffer = function (key) {
                        var ret = this.buffer_[key];
                        if ('number' === typeof key && key >= 0 && key in this.buffer_ && this.buffer_.length > key) {
                            this.buffer_.splice(key, 1);
                        } else {
                            delete this.buffer_[key];
                        }
                        return ret;
                    };

                    Store.prototype.clearBuffer = function () {
                        this.buffer_.splice(0, this.buffer_.length);
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
            (function (DATA) {
                /* MODEL */
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
                })(DATA.STORE || (DATA.STORE = {}));
                var STORE = DATA.STORE;
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
            (function (DATA) {
                /* MODEL */
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
                })(DATA.STORE || (DATA.STORE = {}));
                var STORE = DATA.STORE;
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
            (function (DATA) {
                /* MODEL */
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
                })(DATA.STORE || (DATA.STORE = {}));
                var STORE = DATA.STORE;
            })(APP.DATA || (APP.DATA = {}));
            var DATA = APP.DATA;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        (function (APP) {
            /* MODEL */
            (function (DATA) {
                var Database = (function () {
                    function Database() {
                        var _this = this;
                        this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
                        this.name_ = MODULE.DEF.NAME;
                        this.version_ = 8;
                        this.refresh_ = 10;
                        this.upgrade_ = 0;
                        this.state_ = 0 /* blank */;
                        this.age_ = 10 * 1000;
                        this.expires_ = 0;
                        this.timer_ = 0;
                        this.stateful_ = new DATA.DB.Stateful(this, function () {
                            return _this.connect_();
                        }, function () {
                            return _this.extend_();
                        });
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
                    Database.prototype.extend_ = function () {
                        var _this = this;
                        this.expires_ = new Date().getTime() + this.age_;
                        clearTimeout(this.timer_);
                        this.timer_ = setTimeout(function () {
                            return _this.check_();
                        }, this.age_);
                    };

                    Database.prototype.check_ = function () {
                        if (!this.age_ || new Date().getTime() <= this.expires_) {
                            return;
                        }

                        2 /* open */ === this.state() && this.close();
                    };

                    Database.prototype.state = function () {
                        return this.state_;
                    };

                    Database.prototype.database = function () {
                        this.extend_();
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
                        return this.stateful_.open();
                    };

                    Database.prototype.close = function () {
                        this.database_ && this.database_.close && this.database_.close();
                        this.state_ = 9 /* close */;
                    };

                    Database.prototype.resolve = function () {
                        this.stateful_.resolve();
                    };

                    Database.prototype.reject = function () {
                        this.stateful_.reject();
                    };

                    Database.prototype.connect_ = function () {
                        this.create_();
                    };

                    // 以降、connect_()以外からアクセス禁止
                    Database.prototype.create_ = function () {
                        var _this = this;
                        try  {
                            this.close();
                            this.state_ = 1 /* initiate */;

                            var req = this.IDBFactory.open(this.name_, this.upgrade_ ? this.version_ : 1);

                            var verify = function () {
                                _this.verify_(_this.version_, function () {
                                    _this.state_ = 2 /* open */;
                                    _this.resolve();
                                    _this.extend_();
                                });
                            };

                            if ('done' === req.readyState) {
                                this.database_ = req.result;
                                if (this.database()) {
                                    verify();
                                } else {
                                    this.format_();
                                }
                            } else {
                                var timer = setTimeout(function () {
                                    return _this.down();
                                }, 3000);

                                req.onblocked = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.close();
                                    setTimeout(function () {
                                        return _this.open();
                                    }, 1000);
                                };

                                req.onupgradeneeded = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.createStores_();
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
                        } catch (err) {
                            this.down();
                        }
                    };

                    Database.prototype.destroy_ = function (success, failure) {
                        var _this = this;
                        try  {
                            this.close();
                            this.state_ = 8 /* terminate */;

                            var req = this.IDBFactory.deleteDatabase(this.name_);

                            if (req) {
                                req.onsuccess = success;
                                req.onerror = failure;
                            }
                            setTimeout(function () {
                                return 8 /* terminate */ === _this.state() && _this.down();
                            }, 3000);
                        } catch (err) {
                            this.down();
                        }
                    };

                    Database.prototype.format_ = function () {
                        var _this = this;
                        this.destroy_(function () {
                            return _this.up();
                        }, function () {
                            return _this.down();
                        });
                    };

                    Database.prototype.verify_ = function (version, success) {
                        var _this = this;
                        var db = this.database(), scheme = this.meta, meta = this.stores.meta, failure = function () {
                            return _this.format_();
                        };

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
                            if (!data || _this.upgrade_) {
                                meta.set(meta.setBuffer({ key: scheme.version.key, value: version }));
                            } else if (data.value > version) {
                                cancel = true;
                                _this.down();
                            } else if (data.value < version) {
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
                            if (!data || !_this.refresh_) {
                                meta.set(meta.setBuffer({ key: scheme.update.key, value: days + _this.refresh_ }));
                                success();
                            } else if (data.value > days) {
                                success();
                            } else if (data.value <= days) {
                                failure();
                            }
                        });
                    };

                    Database.prototype.createStores_ = function () {
                        this.destroyStores_();

                        var db = this.database();
                        for (var i in this.stores) {
                            var schema = this.stores[i];
                            var store = db.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
                            for (var j = 0, indexes = schema.indexes, index; index = indexes[j]; j++) {
                                store.createIndex(index.name, index.keyPath, index.option);
                            }
                        }
                    };

                    Database.prototype.destroyStores_ = function () {
                        var db = this.database();
                        for (var i = db.objectStoreNames ? db.objectStoreNames.length : 0; i--;) {
                            db.deleteObjectStore(db.objectStoreNames[i]);
                        }
                    };
                    return Database;
                })();
                DATA.Database = Database;
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
                            option.path ? '; path=' + option.path : '; path=/',
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
                        this.DB = new DATA.Database();
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
                    if (typeof limit === "undefined") { limit = 0; }
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
                    } else {
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
                    if (typeof unsafe_url === "undefined") { unsafe_url = window.location.href; }
                    if (typeof title === "undefined") { title = document.title; }
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
                    } else {
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
                    if (typeof unsafe_url === "undefined") { unsafe_url = window.location.href; }
                    if (typeof scrollX === "undefined") { scrollX = jQuery(window).scrollLeft(); }
                    if (typeof scrollY === "undefined") { scrollY = jQuery(window).scrollTop(); }
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
                        host: host,
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

                Data.prototype.saveServer = function (host, score, state, unsafe_url, expires) {
                    if (typeof state === "undefined") { state = 0; }
                    if (typeof expires === "undefined") { expires = 0; }
                    var store = this.stores_.server, value = {
                        host: host.split('//').pop().split('/').shift() || '',
                        score: score,
                        state: state,
                        date: new Date().getTime()
                    };

                    store.setBuffer(value, true);
                    store.get(host, function () {
                        var data = this.result;
                        if (!data || !state) {
                            // 新規または正常登録
                            store.set(value);
                        } else if (data.state) {
                            // 2回目のエラーで登録削除
                            store['delete'](host);
                        }
                    });
                    this.stores_.server.clean();
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
/// <reference path="../library/utility.ts"/>
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
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.host_ = '';
                    this.host = function () {
                        return _this.host_;
                    };
                    this.parallel_ = 6;
                    this.queue_ = [];
                }
                Balance.prototype.isBalanceable_ = function (setting) {
                    return setting.balance.self && !!Number(this.app_.data.getCookie(setting.balance.client.cookie.balance));
                };

                Balance.prototype.enable = function (setting) {
                    if (!this.isBalanceable_(setting)) {
                        return void this.disable(setting);
                    }
                    if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
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
                    this.app_.data.getCookie(setting.balance.client.cookie.balance) && this.app_.data.setCookie(setting.balance.client.cookie.balance, '0');
                    this.app_.data.getCookie(setting.balance.client.cookie.redirect) && this.app_.data.setCookie(setting.balance.client.cookie.redirect, '0');
                    this.changeServer(null, setting);
                };

                Balance.prototype.changeServer = function (host, setting) {
                    if (typeof setting === "undefined") { setting = this.model_.configure(window.location); }
                    if (!setting || !this.isBalanceable_(setting)) {
                        return;
                    }

                    host = host || '';

                    this.host_ = host;
                    this.app_.data.setCookie(setting.balance.client.cookie.host, host);
                };

                Balance.prototype.chooseServers_ = function (expires, limit, weight, respite) {
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
                    var scores = Object.keys(serverTableByScore).sort();
                    for (var i = 0, score; score = result.length < limit && scores[i]; i++) {
                        var server = serverTableByScore[score], host = server.host, state = server.state;
                        if (state && state + respite >= new Date().getTime()) {
                            continue;
                        }
                        if (!host && weight && !(Math.floor(Math.random()) * weight)) {
                            continue;
                        }
                        result.push(host);
                    }
                    return result;
                };

                Balance.prototype.chooseServer = function (setting) {
                    if (!this.isBalanceable_(setting)) {
                        return;
                    }

                    // キャッシュの有効期限内の再リクエストは同じサーバーを選択してキャッシュを使用
                    var history = this.app_.data.getHistoryBuffer(setting.destLocation.href), cacheExpires = history && history.expires || 0;

                    if (cacheExpires && cacheExpires >= new Date().getTime()) {
                        this.changeServer(history.host, setting);
                        return;
                    }

                    // DBにもCookieにもデータがなければ正規サーバを選択
                    if (!this.app_.data.getServerBuffers().length && !this.app_.data.getCookie(setting.balance.client.cookie.host)) {
                        this.changeServer('', setting);
                        return;
                    }

                    // 最適なサーバーを選択
                    var servers = this.chooseServers_(setting.balance.history.expires, 1, setting.balance.weight, setting.balance.server.respite);
                    if (servers.length) {
                        this.changeServer(servers.shift(), setting);
                        return;
                    }

                    this.disable(setting);
                };

                Balance.prototype.bypass = function (setting, retry) {
                    var _this = this;
                    if (!this.isBalanceable_(setting)) {
                        return;
                    }
                    this.queue_ = this.queue_.length ? this.queue_ : this.chooseServers_(setting.balance.history.expires, setting.balance.history.limit, setting.balance.weight, setting.balance.server.respite).slice(0, retry + 1);
                    var servers = this.queue_, option = jQuery.extend({}, setting.ajax, setting.balance.option.ajax, setting.balance.option.callbacks.ajax);
                    while (servers.length) {
                        if (!this.host()) {
                            break;
                        }
                        if (!this.parallel_) {
                            servers.length && setTimeout(function () {
                                return _this.bypass(setting, servers.length - 1);
                            }, option.timeout || 1500);
                            return;
                        }

                        (function (server) {
                            --_this.parallel_;
                            var that = _this;
                            jQuery.ajax(jQuery.extend({}, option, {
                                url: that.util_.normalizeUrl(server + window.location.pathname.replace(/^\/?/, '/') + window.location.search),
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
                                    that.host_ = server;
                                    that.queue_ = [];

                                    that.util_.fire(setting.balance.option.ajax.success, this, arguments);
                                },
                                error: function () {
                                    that.util_.fire(setting.balance.option.ajax.error, this, arguments);
                                },
                                complete: function () {
                                    ++that.parallel_;
                                    servers.length && that.bypass(setting, servers.length - 1);

                                    that.util_.fire(setting.balance.option.ajax.complete, this, arguments);
                                }
                            }));
                        })(servers.shift());
                    }
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
            var PageRecord = (function () {
                function PageRecord(model_, setting, data, textStatus, jqXHR, host, state) {
                    var _this = this;
                    this.model_ = model_;
                    this.state_ = false;
                    this.state = function () {
                        return _this.state_;
                    };
                    this.data_ = setting ? {
                        url: this.model_.convertUrlToKeyUrl(setting.destLocation.href),
                        data: data,
                        textStatus: textStatus,
                        jqXHR: jqXHR,
                        host: host,
                        setting: setting
                    } : {
                        url: undefined,
                        data: undefined,
                        textStatus: undefined,
                        jqXHR: undefined,
                        host: undefined,
                        setting: undefined
                    };

                    this.data = new PageRecordData(this.data_);
                    this.state_ = !!state;
                }
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

                PageRecordData.prototype.setting = function () {
                    return this.data_.setting;
                };
                return PageRecordData;
            })();
            APP.PageRecordData = PageRecordData;
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
            var PageUtility = (function () {
                function PageUtility() {
                }
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

                PageUtility.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent(eventType, bubbling, cancelable);
                    target.dispatchEvent(event);
                };

                PageUtility.prototype.wait = function (ms) {
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
                        that.data_ = ajax[0];
                        that.textStatus_ = ajax[1];
                        that.jqXHR_ = ajax[2];

                        that.util_.fire(setting.callbacks.ajax.success, this, [event, setting, that.data_, that.textStatus_, that.jqXHR_]);
                    }
                    function fail(jqXHR, textStatus, errorThrown) {
                        that.jqXHR_ = jqXHR;
                        that.textStatus_ = textStatus;
                        that.errorThrown_ = errorThrown;

                        that.util_.fire(setting.callbacks.ajax.error, this, [event, setting, that.jqXHR_, that.textStatus_, that.errorThrown_]);
                    }
                    function always() {
                        that.util_.fire(setting.callbacks.ajax.complete, this, [event, setting, that.jqXHR_, that.textStatus_]);

                        that.model_.setXHR(null);

                        if (!that.errorThrown_) {
                            that.model_.setCache(setting.destLocation.href, cache && cache.data || null, that.textStatus_, that.jqXHR_);
                            that.success(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        } else {
                            that.failure(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        }
                    }

                    this.dispatchEvent(document, MODULE.DEF.NAME + ':fetch', false, true);

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

                    var xhr = this.model_.getXHR();
                    if (cache && cache.jqXHR && 'abort' !== cache.jqXHR.statusText && 'error' !== cache.jqXHR.statusText) {
                        // cache
                        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                        this.app_.loadtime = 0;
                        xhr && xhr.abort();
                        this.model_.setXHR(null);
                        this.host_ = cache.host || '';
                        this.data_ = cache.jqXHR.responseText;
                        this.textStatus_ = cache.textStatus;
                        this.jqXHR_ = cache.jqXHR;
                        if (this.model_.isDeferrable) {
                            jQuery.when(jQuery.Deferred().resolve(this.data_, this.textStatus_, this.jqXHR_), this.wait(wait)).done(done).fail(fail).always(always);
                        } else {
                            var context = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
                            context = context.context || context;
                            success.call(context, this.data_, this.textStatus_, this.jqXHR_);
                            complete.call(context, this.jqXHR_, this.textStatus_);
                        }
                    } else if (xhr && xhr.follow && 'abort' !== xhr.statusText && 'error' !== xhr.statusText) {
                        // preload
                        speedcheck && speed.time.splice(0, 1, xhr.timeStamp - speed.fire);
                        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                        this.host_ = xhr.host || '';
                        this.app_.loadtime = xhr.timeStamp;
                        var wait = setting.wait && isFinite(xhr.timeStamp) ? Math.max(wait - new Date().getTime() + xhr.timeStamp, 0) : 0;
                        jQuery.when(xhr, this.wait(wait)).done(done).fail(fail).always(always);
                    } else {
                        // default
                        this.app_.loadtime = event.timeStamp;
                        xhr && xhr.abort();
                        var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};

                        this.app_.balance.chooseServer(setting);
                        this.host_ = setting.balance.self && this.model_.host().split('//').pop() || '';
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

                        jQuery.when(this.model_.getXHR(), this.wait(wait)).done(done).fail(fail).always(always);
                    }
                };

                PageFetch.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageFetch.prototype.movePageNormally = function (event) {
                };

                PageFetch.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                PageFetch.prototype.wait = function (ms) {
                    return;
                };
                return PageFetch;
            })();
            APP.PageFetch = PageFetch;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var PageProvider = (function () {
                function PageProvider(Record_, model_, app_) {
                    var _this = this;
                    this.Record_ = Record_;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.hash_ = function (setting) {
                        return _this.model_.convertUrlToKeyUrl(setting.destLocation.href);
                    };
                    this.table_ = {};
                }
                PageProvider.prototype.accessRecord = function (setting, event, success, failure) {
                    this.fillRecord(setting, event, success, failure);
                };

                PageProvider.prototype.updateRecord = function (setting, event, success, failure) {
                    this.removeRecord(setting);
                    this.fillRecord(setting, event, success, failure);
                };

                PageProvider.prototype.fillRecord = function (setting, event, success, failure) {
                    //if (this.verifyRecord(setting)) {
                    //  success(this.getRecord(setting), event);
                    //} else {
                    var that = this;
                    new APP.PageFetch(this.model_, this.app_, setting, event, successWrapper, failureWrapper);

                    //}
                    function successWrapper(setting, event, data, textStatus, jqXHR, host) {
                        var record = that.setRecord(setting, data, textStatus, jqXHR, host, true);
                        success(record, event);
                    }
                    function failureWrapper(setting, event, data, textStatus, jqXHR, host) {
                        var record = that.setRecord(setting, data, textStatus, jqXHR, host, false);
                        failure(record, event);
                    }
                };

                PageProvider.prototype.verifyRecord = function (setting) {
                    return this.getRecord(setting).state();
                };

                PageProvider.prototype.getRecord = function (setting) {
                    return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
                };

                PageProvider.prototype.setRecord = function (setting, data, textStatus, jqXHR, host, state) {
                    return this.table_[this.hash_(setting)] = new this.Record_(this.model_, setting, data, textStatus, jqXHR, host, state);
                };

                PageProvider.prototype.removeRecord = function (setting) {
                    return this.table_[this.hash_(setting)] = new this.Record_();
                };

                PageProvider.prototype.clearRecord = function (setting) {
                    this.table_ = {};
                };
                return PageProvider;
            })();
            APP.PageProvider = PageProvider;
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
            var PageUpdate = (function () {
                function PageUpdate(model_, app_, event_, record_, retriable_) {
                    this.model_ = model_;
                    this.app_ = app_;
                    this.event_ = event_;
                    this.record_ = record_;
                    this.retriable_ = retriable_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.loadwaits_ = [];
                    this.main_();
                }
                PageUpdate.prototype.main_ = function () {
                    var app = this.app_, record = this.record_, setting = record.data.setting(), event = this.event_, data = record.data.data(), textStatus = record.data.textStatus(), jqXHR = record.data.jqXHR();
                    var callbacks_update = setting.callbacks.update;

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');

                    UPDATE:
                     {
                        ++this.app_.count;
                        this.app_.loadtime = this.app_.loadtime && new Date().getTime() - this.app_.loadtime;

                        if (setting.cache.mix && MODULE.EVENT.POPSTATE !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                            return this.model_.fallback(event);
                        }

                        try  {
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
                            this.areas_ = this.area_.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

                            this.redirect_();

                            this.dispatchEvent(window, MODULE.DEF.NAME + ':unload', false, true);

                            this.url_();

                            this.document_();
                        } catch (err) {
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
                        case !this.retriable_:
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
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_).length) {
                        return;
                    }

                    if (this.util_.fire(callbacks_update.redirect.before, setting, [event, setting]) === false) {
                        return;
                    }
                    ;

                    var redirect = setting.destLocation.cloneNode();
                    redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
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
                                    setTimeout(function () {
                                        return jQuery[MODULE.DEF.NAME].click(redirect.href);
                                    }, 0);
                                    break;
                                case MODULE.EVENT.POPSTATE:
                                    window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                                    if (this.isRegister_(setting, event) && setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                                        jQuery[MODULE.DEF.NAME].disable();
                                        window.history.back();
                                        window.history.forward();
                                        jQuery[MODULE.DEF.NAME].enable();
                                    }
                                    setTimeout(function () {
                                        return _this.dispatchEvent(window, MODULE.EVENT.POPSTATE, false, false);
                                    }, 0);
                                    break;
                            }
                            throw false;
                    }

                    if (this.util_.fire(callbacks_update.redirect.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.url_ = function () {
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    this.model_.location.href = setting.destLocation.href;

                    if (this.util_.fire(callbacks_update.url.before, setting, [event, setting]) === false) {
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

                    // verify
                    if (this.util_.compareUrl(setting.destLocation.href, this.util_.normalizeUrl(window.location.href))) {
                    } else if (this.retriable_) {
                        setting.destLocation.href = this.util_.normalizeUrl(window.location.href);
                        new PageUpdate(this.model_, this.app_, event, this.record_, false);
                        throw false;
                    } else {
                        throw new Error('throw: location mismatch');
                    }

                    if (this.util_.fire(callbacks_update.url.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.document_ = function () {
                    var _this = this;
                    var setting = this.record_.data.setting(), event = this.event_;

                    this.overwriteDocumentByCache_();

                    setting.fix.noscript && this.escapeNoscript_(this.srcDocument_);

                    this.rewrite_();

                    this.title_();
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

                            _this.dispatchEvent(document, MODULE.DEF.NAME + ':ready', false, true);

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

                            _this.dispatchEvent(document, MODULE.DEF.NAME + ':render', false, true);

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');

                            return jQuery.when ? jQuery.when.apply(jQuery, _this.loadwaits_) : callback();
                        };

                        var onload = function () {
                            if (!_this.util_.compareUrl(_this.model_.convertUrlToKeyUrl(setting.destLocation.href), _this.model_.convertUrlToKeyUrl(window.location.href), true)) {
                                return jQuery.when && jQuery.Deferred().reject();
                            }

                            _this.dispatchEvent(window, MODULE.DEF.NAME + ':load', false, true);

                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

                            speedcheck && console.log(speed.time);
                            speedcheck && console.log(speed.name);

                            _this.script_('[src][defer]');

                            // 未定義を返すとエラー
                            return jQuery.when && jQuery.Deferred().resolve();
                        };

                        _this.scroll_(false);

                        if (100 > _this.app_.loadtime && setting.reset.type.match(event.type.toLowerCase()) && !jQuery('form[method][method!="GET"]').length) {
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
                            jQuery.when.apply(jQuery, scriptwaits)[then](function () {
                                return onready();
                            })[then](function () {
                                return onrender();
                            })[then](function () {
                                return onload();
                            });
                        } else {
                            onready(function () {
                                return onrender(function () {
                                    return onload();
                                });
                            });
                        }
                    }).trigger(MODULE.DEF.NAME + ':rendering');
                };

                PageUpdate.prototype.overwriteDocumentByCache_ = function () {
                    var setting = this.record_.data.setting(), event = this.event_, cache = this.model_.getCache(setting.destLocation.href);

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
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.rewrite) {
                        return;
                    }

                    if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting]) === false) {
                        return;
                    }

                    this.util_.fire(setting.rewrite, setting, [this.srcDocument_, this.area_, this.record_.data.host()]);

                    if (this.util_.fire(callbacks_update.rewrite.before, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.title_ = function () {
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (this.util_.fire(callbacks_update.title.before, setting, [event, setting]) === false) {
                        return;
                    }

                    this.dstDocument_.title = this.srcDocument_.title;
                    setting.fix.history && this.app_.data.saveTitle();

                    if (this.util_.fire(callbacks_update.title.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.head_ = function () {
                    var setting = this.record_.data.setting(), event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.load.head) {
                        return;
                    }

                    if (this.util_.fire(callbacks_update.head.before, setting, [event, setting]) === false) {
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

                    if (this.util_.fire(callbacks_update.head.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.content_ = function () {
                    var _this = this;
                    var setting = this.record_.data.setting(), event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    var checker;

                    if (this.util_.fire(callbacks_update.content.before, setting, [event, setting]) === false) {
                        return;
                    }

                    function map() {
                        var defer = jQuery.Deferred();
                        jQuery(this).one('load error', defer.resolve);
                        return defer;
                    }

                    jQuery(this.area_).children('.' + setting.nss.class4html + '-check').remove();
                    checker = jQuery('<div/>', {
                        'class': setting.nss.class4html + '-check',
                        'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
                    }).text(MODULE.DEF.NAME);

                    var $srcAreas, $dstAreas;
                    for (var i = 0; this.areas_[i]; i++) {
                        $srcAreas = jQuery(this.areas_[i], srcDocument).clone();
                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                            throw new Error('throw: area mismatch');
                        }

                        $srcAreas.find('script').each(function (i, elem) {
                            return _this.escapeScript_(elem);
                        });
                        if (jQuery.when) {
                            this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(map).get());
                        }

                        for (var j = 0; $srcAreas[j]; j++) {
                            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                        }

                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        $dstAreas.append(checker.clone());
                        $dstAreas.find('script').each(function (i, elem) {
                            return _this.restoreScript_(elem);
                        });
                    }
                    this.dispatchEvent(document, MODULE.DEF.NAME + ':DOMContentLoaded', false, true);

                    if (this.util_.fire(callbacks_update.content.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.balance_ = function () {
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.balance.self || this.app_.loadtime < 100) {
                        return;
                    }

                    var jqXHR = this.record_.data.jqXHR();
                    var host = (jqXHR.getResponseHeader(setting.balance.server.header) || ''), score = Math.ceil(this.app_.loadtime / (jqXHR.responseText.length || 1) * 1e5);

                    if (this.util_.fire(callbacks_update.balance.before, setting, [event, setting]) === false) {
                        return;
                    }

                    this.app_.data.saveServer(host, score);
                    this.app_.balance.chooseServer(setting);

                    if (this.util_.fire(callbacks_update.balance.after, setting, [event, setting]) === false) {
                        return;
                    }
                };

                PageUpdate.prototype.css_ = function (selector) {
                    var setting = this.record_.data.setting(), event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    if (!setting.load.css) {
                        return;
                    }

                    if (this.util_.fire(callbacks_update.css.before, setting, [event, setting]) === false) {
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
                                    isSameElement = this.util_.trim(element.innerHTML) === this.util_.trim($delElements[j].innerHTML);
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

                    if (this.util_.fire(callbacks_update.css.after, setting, [event, setting]) === false) {
                        return;
                    }

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
                };

                PageUpdate.prototype.script_ = function (selector) {
                    var _this = this;
                    var setting = this.record_.data.setting(), event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var callbacks_update = setting.callbacks.update;

                    var scriptwaits = [], scripts = [];

                    if (!setting.load.script) {
                        return scriptwaits;
                    }

                    if (this.util_.fire(callbacks_update.script.before, setting, [event, setting]) === false) {
                        return scriptwaits;
                    }

                    var prefilter = 'script', $scriptElements = jQuery(prefilter, srcDocument).filter(selector).not(setting.load.ignore).not(jQuery('noscript', srcDocument).find(prefilter)), loadedScripts = this.app_.page.loadedScripts, regType = /^$|(?:application|text)\/(?:java|ecma)script/i, regRemove = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                    var exec = function (element, response) {
                        if (element.src) {
                            loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                        }

                        try  {
                            if (_this.model_.isDeferrable) {
                                if ('string' === typeof response) {
                                    eval.call(window, response);
                                } else {
                                    throw response;
                                }
                            } else {
                                if (element.hasAttribute('src')) {
                                    jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, {
                                        url: element.src,
                                        dataType: 'script',
                                        async: false,
                                        global: false,
                                        success: function () {
                                            return null;
                                        },
                                        error: function (err) {
                                            throw err;
                                        }
                                    }));
                                } else {
                                    eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
                                }
                            }

                            try  {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'load', false, true);
                            } catch (e) {
                            }
                        } catch (err) {
                            try  {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'error', false, true);
                            } catch (e) {
                            }

                            if (true === setting.load.error) {
                                throw err;
                            } else {
                                _this.util_.fire(setting.load.error, setting, [err, element]);
                            }
                        }
                    };

                    for (var i = 0, element; element = $scriptElements[i]; i++) {
                        if (!regType.test(element.type || '')) {
                            continue;
                        }
                        if (element.hasAttribute('src') ? loadedScripts[element.src] : !this.util_.trim(element.innerHTML)) {
                            continue;
                        }

                        LOG:
                         {
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
                                        success: function () {
                                            return _this.dispatchEvent(element, 'load', false, true);
                                        },
                                        error: function () {
                                            return _this.dispatchEvent(element, 'error', false, true);
                                        }
                                    }));
                                } else {
                                    if (defer) {
                                        jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, {
                                            url: element.src,
                                            dataType: 'text',
                                            async: true,
                                            global: false,
                                            success: function () {
                                                return defer.resolve([element, arguments[0]]);
                                            },
                                            error: function (err) {
                                                return defer.resolve([element, err]);
                                            }
                                        }));
                                        scriptwaits.push(defer);
                                    } else {
                                        scripts.push(element);
                                    }
                                }
                            } else if (!element.hasAttribute('src')) {
                                if (defer) {
                                    scriptwaits.push(defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]));
                                } else {
                                    scripts.push(element);
                                }
                            }
                        })(element);
                    }

                    try  {
                        if (this.model_.isDeferrable) {
                            jQuery.when.apply(jQuery, scriptwaits).always(function () {
                                return jQuery.each(arguments, function (i, args) {
                                    return exec.apply(_this, args);
                                });
                            });
                        } else {
                            jQuery.each(scripts, function (i, elem) {
                                return exec(elem);
                            });
                        }
                    } catch (err) {
                        setTimeout(function () {
                            return _this.model_.fallback(event);
                        }, 1);
                        throw err;
                    }

                    if (this.util_.fire(callbacks_update.script.after, setting, [event, setting]) === false) {
                        return scriptwaits;
                    }

                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');

                    return scriptwaits;
                };

                PageUpdate.prototype.scroll_ = function (call) {
                    var setting = this.record_.data.setting(), event = this.event_;
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
                    var setting = this.record_.data.setting(), event = this.event_;
                    var callbacks_update = setting.callbacks.update;

                    var areas = jQuery(this.area_), checker = areas.children('.' + setting.nss.class4html + '-check'), limit = new Date().getTime() + 5 * 1000;

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

                PageUpdate.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageUpdate.prototype.movePageNormally = function (event) {
                };

                PageUpdate.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                PageUpdate.prototype.wait = function (ms) {
                    return;
                };
                return PageUpdate;
            })();
            APP.PageUpdate = PageUpdate;
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            var PageParser = (function () {
                function PageParser() {
                }
                PageParser.prototype.test_ = function (mode) {
                    try  {
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
                    } catch (err) {
                    }
                };

                PageParser.prototype.parse = function (html, uri, mode) {
                    if (typeof mode === "undefined") { mode = this.mode_; }
                    html += ~html.search(/<title[\s>]/i) ? '' : '<title></title>';

                    var backup = !uri || !MODULE.LIBRARY.Utility.compareUrl(uri, window.location.href) ? window.location.href : undefined;
                    backup && window.history.replaceState(window.history.state, document.title, uri);

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
                            doc = this.parse(html, uri);
                            break;
                    }

                    backup && window.history.replaceState(window.history.state, document.title, backup);

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
        })(MODEL.APP || (MODEL.APP = {}));
        var APP = MODEL.APP;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.provider.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.parser.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
var MODULE;
(function (MODULE) {
    (function (MODEL) {
        /* MODEL */
        (function (APP) {
            MODULE.MIXIN(APP.PageFetch, [APP.PageUtility]);
            MODULE.MIXIN(APP.PageUpdate, [APP.PageUtility]);

            var Page = (function () {
                function Page(model_, app_) {
                    var _this = this;
                    this.model_ = model_;
                    this.app_ = app_;
                    this.provider = new APP.PageProvider(APP.PageRecord, this.model_, this.app_);
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.parser = new APP.PageParserSingleton();
                    this.landing = this.util_.normalizeUrl(window.location.href);
                    this.recent = { order: [], data: {}, size: 0 };
                    this.loadedScripts = {};
                    setTimeout(function () {
                        return _this.parser.parse('') || _this.model_.disable();
                    }, 300);
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

                    this.fetch_(setting, event);
                };

                Page.prototype.fetch_ = function (setting, event) {
                    var _this = this;
                    this.provider.accessRecord(setting, event, function (record, event) {
                        return _this.success_(record, event);
                    }, function (record, event) {
                        return _this.failure_(record, event);
                    });
                };

                Page.prototype.success_ = function (record, event) {
                    new APP.PageUpdate(this.model_, this.app_, event, record, true);
                };

                Page.prototype.failure_ = function (record, event) {
                    if (!record.data.setting().fallback || 'abort' === record.data.textStatus()) {
                        return;
                    }

                    var setting = record.data.setting();
                    if (setting.balance.self) {
                        this.app_.data.saveServer(record.data.host(), 0, new Date().getTime());
                        this.app_.balance.chooseServer(setting);
                    }

                    this.model_.fallback(event);
                };

                Page.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                Page.prototype.movePageNormally = function (event) {
                };

                Page.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                Page.prototype.wait = function (ms) {
                    return;
                };
                return Page;
            })();
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
            MODULE.MIXIN(APP.Page, [APP.PageUtility]);

            var Main = (function () {
                function Main(model_, controller_) {
                    this.model_ = model_;
                    this.controller_ = controller_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.settings_ = {};
                    this.balance = new APP.Balance(this.model_, this);
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

                    new MODULE.View(this.model_, this.controller_, $context, setting);
                    setTimeout(function () {
                        return _this.data.loadBuffers(setting.buffer.limit);
                    }, setting.buffer.delay);
                    setTimeout(function () {
                        return _this.balance.enable(setting);
                    }, setting.buffer.delay);
                    setTimeout(function () {
                        return _this.page.landing = null;
                    }, 1500);
                };

                Main.prototype.configure = function (destination) {
                    var event = destination.preventDefault ? destination : null;
                    switch (event && event.type.toLowerCase()) {
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
                            ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
                            reload: '',
                            execute: true,
                            log: 'head, body',
                            error: true,
                            ajax: { dataType: 'script', cache: true }
                        },
                        balance: {
                            self: false,
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
                            update: { redirect: {}, rewrite: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
                        },
                        data: undefined
                    }, force = {
                        ns: undefined,
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
                                name: setting.ns || '',
                                array: nsArray,
                                event: nsArray.join('.'),
                                data: nsArray.join('-'),
                                class4html: nsArray.join('-'),
                                click: [MODULE.EVENT.CLICK].concat(nsArray.join(':')).join('.'),
                                submit: [MODULE.EVENT.SUBMIT].concat(nsArray.join(':')).join('.'),
                                popstate: [MODULE.EVENT.POPSTATE].concat(nsArray.join(':')).join('.'),
                                scroll: [MODULE.EVENT.SCROLL].concat(nsArray.join(':')).join('.'),
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
                    setting = jQuery.extend(true, setting, setting.balance.self && setting.balance.option, force);
                    setting = jQuery.extend(true, setting, compute());

                    if (scope) {
                        MODULE.FREEZE(setting, true);
                        this.settings_[index] = setting;
                        return setting;
                    } else {
                        this.settings_[index] = null;
                        return null;
                    }
                };

                Main.prototype.scope_ = function (option, origURL, destURL, rewriteKeyUrl) {
                    if (typeof rewriteKeyUrl === "undefined") { rewriteKeyUrl = ''; }
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
                        } else {
                            scpTag = scpTable[scpKey];
                            patterns = scpTable[scpTag];
                        }
                        if (patterns) {
                            patterns = patterns.concat();
                        } else {
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
                            } else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
                                scope = this.scope_(option, origURL, destURL, this.util_.fire(scpTable.rewrite, null, [destKeyUrl]));
                                if (scope) {
                                    hit_src = hit_dst = true;
                                } else if (null === scope) {
                                    hit_src = hit_dst = false;
                                }
                            } else if ('string' === typeof pattern) {
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
                                    } else {
                                        hit_src = true;
                                    }
                                }
                                if (reg ? ~destKeyUrl.search(pattern) : ~destKeyUrl.indexOf(pattern)) {
                                    if (not) {
                                        hit_dst = false;
                                    } else {
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
                        } else if (inherit) {
                            continue;
                        }
                        break;
                    }
                    return undefined;
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
                return this.app_.balance.changeServer(host.split('//').pop(), null);
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
                PROCESS:
                 {
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
                PROCESS:
                 {
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
                PROCESS:
                 {
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
                this.fallback(event);
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
                        this.app_.page.movePageNormally(event);
                }
            };

            Main.prototype.enable = function () {
                this.state_ = 2 /* open */;
            };

            Main.prototype.disable = function () {
                this.state_ = 3 /* pause */;
            };

            Main.prototype.getCache = function (unsafe_url) {
                var setting = this.configure(window.location), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return null;
                }

                var secure_url = this.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
                unsafe_url = null;

                recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
                recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
                return recent.data[secure_url];
            };

            Main.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR, host) {
                var _this = this;
                var setting = this.configure(window.location), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return this;
                }

                var cache, size, timeStamp, expires;

                var secure_url = this.convertUrlToKeyUrl(this.util_.normalizeUrl(unsafe_url));
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

                    age = jqXHR && _this.calAge_(jqXHR) || 0;

                    age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.min ? Math.max(setting.cache.expires.min, age) : age;
                    age = 'object' === typeof setting.cache.expires && 'number' === typeof setting.cache.expires.max ? Math.min(setting.cache.expires.max, age) : age;
                    age = Math.max(age, 0) || 0;
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
                    setting.fix.history && this.app_.data.saveTitle(secure_url, title);
                    this.app_.data.saveExpires(setting.destLocation.href, host, this.calExpires_(jqXHR || cache && cache.jqXHR));
                }
            };

            Main.prototype.removeCache = function (param) {
                var setting = this.configure(window.location), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return;
                }

                switch (typeof param) {
                    case 'string':
                        var secure_url = this.convertUrlToKeyUrl(this.util_.normalizeUrl(param));
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
                var setting = this.configure(window.location), recent = this.app_.page.recent;
                if (!setting || !recent) {
                    return;
                }

                while (recent.order.length) {
                    this.removeCache(~-recent.order.length);
                }
            };

            Main.prototype.cleanCache = function () {
                var setting = this.configure(window.location), recent = this.app_.page.recent;
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

            Main.prototype.calAge_ = function (jqXHR) {
                var age;

                switch (true) {
                    case /no-store|no-cache/.test(jqXHR.getResponseHeader('Cache-Control')):
                        return 0;
                    case jqXHR.getResponseHeader('Cache-Control') && !!~jqXHR.getResponseHeader('Cache-Control').indexOf('max-age='):
                        return Number(jqXHR.getResponseHeader('Cache-Control').match(/max-age=(\d+)/).pop()) * 1000;
                    case !!jqXHR.getResponseHeader('Expires'):
                        return new Date(jqXHR.getResponseHeader('Expires')).getTime() - new Date().getTime();
                    default:
                        return 0;
                }
            };

            Main.prototype.calExpires_ = function (jqXHR) {
                return new Date().getTime() + this.calAge_(jqXHR);
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
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
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
