/**
 * 
 * jquery.pjax.js
 * 
 * @name jquery.pjax.js
 * @version 2.10.0
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

    

    

    

    

    // enum
    (function (State) {
        State[State["wait"] = -1] = "wait";
        State[State["ready"] = 0] = "ready";
        State[State["lock"] = 1] = "lock";
        State[State["seal"] = 2] = "seal";
        State[State["error"] = 3] = "error";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;

    

    

    

    

    MODULE.GEN_UUID = function () {
        // version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        });
    };
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* VIEW */
    (function (VIEW) {
        /**
        * View of MVC
        *
        * @class View
        * @constructor
        * @param {JQuery|HTMLElement} [context] 監視するDOM要素を設定する。
        */
        var C;

        var Template = (function () {
            function Template(model_, controller_, context) {
                this.model_ = model_;
                this.controller_ = controller_;
                /**
                * Viewの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -1 /* wait */;
                this.queue_ = [];
                /**
                * Viewが待ち受けるイベントに設定されるイベントハンドラのリスト
                *
                * @property HANDLERS
                * @type {Object}
                */
                this.HANDLERS = {};
                C = controller_;
                this.UUID = MODULE.GEN_UUID();
                this.CONTEXT = context;
                this.OBSERVE();
                this.state_ = 0;
            }
            /**
            * 内部イベントを監視する。
            *
            * @method OBSERVE
            */
            Template.prototype.OBSERVE = function () {
            };

            /**
            * 内部イベントの監視を終了する。
            *
            * @method RELEASE
            */
            Template.prototype.RELEASE = function () {
            };

            /**
            * 外部イベントを監視する。
            *
            * @method BIND
            * @param {String} selector jQueryセレクタ
            * @chainable
            */
            Template.prototype.BIND = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.UNBIND();
                return this;
            };

            /**
            * 外部イベントの監視を解除する。
            *
            * @method UNBIND
            * @param {String} selector jQueryセレクタ
            * @chainable
            */
            Template.prototype.UNBIND = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return this;
            };

            Template.EVENTS = {};

            Template.TRIGGERS = {};
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
        var C;

        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_, controller_, context) {
                _super.call(this, model_, controller_, context);
                this.model_ = model_;
                this.controller_ = controller_;
                // VIEWの待ち受けるイベントに登録されるハンドラ
                this.HANDLERS = {
                    CLICK: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        C.CLICK.apply(C, args);
                    },
                    SUBMIT: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        C.SUBMIT.apply(C, args);
                    },
                    POPSTATE: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        C.POPSTATE.apply(C, args);
                    },
                    SCROLL: function () {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        C.SCROLL.apply(C, args);
                    }
                };
                C = controller_;
            }
            // VIEWにする要素を選択/解除する
            Main.prototype.BIND = function (setting) {
                this.UNBIND(setting);
                this.CONTEXT.delegate(setting.link, setting.nss.click, this.HANDLERS.CLICK).delegate(setting.form, setting.nss.submit, this.HANDLERS.SUBMIT);
                jQuery(window).bind(setting.nss.popstate, this.HANDLERS.POPSTATE);

                setting.fix.scroll && jQuery(window).bind(setting.nss.scroll, this.HANDLERS.SCROLL);
                return this;
            };
            Main.prototype.UNBIND = function (setting) {
                this.CONTEXT.undelegate(setting.link, setting.nss.click).undelegate(setting.form, setting.nss.submit);
                jQuery(window).unbind(setting.nss.popstate);

                setting.fix.scroll && jQuery(window).unbind(setting.nss.scroll);
                return this;
            };

            // VIEWが監視する内部イベントを登録
            Main.prototype.OBSERVE = function () {
                this.RELEASE();
                return this;
            };
            Main.prototype.RELEASE = function () {
                return this;
            };

            Main.EVENTS = {};

            Main.TRIGGERS = {};
            return Main;
        })(VIEW.Template);
        VIEW.Main = Main;
    })(MODULE.VIEW || (MODULE.VIEW = {}));
    var VIEW = MODULE.VIEW;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        var M;
        var C;

        var ControllerFunction = (function () {
            function ControllerFunction(controller, model) {
                M = model;
                C = controller;
            }
            ControllerFunction.prototype.enable = function () {
                M.enable();
                return this;
            };

            ControllerFunction.prototype.disable = function () {
                M.disable();
                return this;
            };

            ControllerFunction.prototype.click = function (url, attr) {
                var setting = M.getActiveSetting(), $anchor;

                switch (typeof url) {
                    case 'undefined':
                        $anchor = this['end']().filter('a').first().clone();
                        break;

                    case 'object':
                        $anchor = jQuery(url).clone();
                        break;

                    case 'string':
                        attr = attr || {};
                        attr.href = url;
                        $anchor = jQuery('<a/>', attr);
                        break;

                    default:
                        return this;
                }
                return $anchor.first().one(setting.nss.click, function (event) {
                    return new MODULE.VIEW.Main(M, C, null).HANDLERS.CLICK(event);
                }).click();
            };

            ControllerFunction.prototype.submit = function (url, attr, data) {
                var setting = M.getActiveSetting(), $form, df = document.createDocumentFragment(), type, $element;

                switch (true) {
                    case typeof url === 'undefined':
                        $form = this['end']().filter('form').first().clone();
                        break;

                    case typeof url === 'object':
                        $form = jQuery(url).clone();
                        break;

                    case !!data:
                        attr = attr || {};
                        attr.action = url;
                        type = data instanceof Array && Array || data instanceof Object && Object || undefined;
                        for (var i in data) {
                            switch (type) {
                                case Object:
                                    $element = jQuery('<textarea/>', { name: i }).val(data[i]);
                                    break;
                                case Array:
                                    data[i].attr = data[i].attr || {};
                                    data[i].attr.name = data[i].name;
                                    $element = jQuery(!data[i].tag.indexOf('<') ? data[i].tag : '<' + data[i].tag + '/>', data[i].attr || {}).val(data[i].value);
                                    break;
                                default:
                                    continue;
                            }
                            df.appendChild($element[0]);
                        }
                        $form = jQuery('<form/>', attr).append(df);
                        break;

                    default:
                        return this;
                }
                return $form.first().one(setting.nss.submit, function (event) {
                    return new MODULE.VIEW.Main(M, C, null).HANDLERS.SUBMIT(event);
                }).submit();
            };

            ControllerFunction.prototype.getCache = function (url) {
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

            ControllerFunction.prototype.setCache = function (url, data, textStatus, jqXHR) {
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

            ControllerFunction.prototype.removeCache = function (url) {
                if (typeof url === "undefined") { url = window.location.href; }
                M.removeCache(url);
                return this;
            };

            ControllerFunction.prototype.clearCache = function () {
                M.clearCache();
                return this;
            };

            ControllerFunction.prototype.follow = function (event, $XHR, host, timeStamp) {
                if (!M.isDeferrable) {
                    return false;
                }
                var anchor = event.currentTarget;
                $XHR.follow = true;
                $XHR.host = host || '';
                if (isFinite(event.timeStamp)) {
                    $XHR.timeStamp = timeStamp || event.timeStamp;
                }
                M.setActiveXHR($XHR);
                jQuery.when($XHR).done(function () {
                    !M.getCache(anchor.href) && M.isImmediateLoadable(event) && M.setCache(anchor.href, undefined, undefined, $XHR);
                });
                jQuery[MODULE.NAME].click(anchor.href);
                return true;
            };

            ControllerFunction.prototype.host = function () {
                return M.requestHost;
            };
            return ControllerFunction;
        })();
        CONTROLLER.ControllerFunction = ControllerFunction;
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

        var ControllerMethod = (function (_super) {
            __extends(ControllerMethod, _super);
            function ControllerMethod(controller, model) {
                _super.call(this, controller, model);
            }
            return ControllerMethod;
        })(CONTROLLER.ControllerFunction);
        CONTROLLER.ControllerMethod = ControllerMethod;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>
var MODULE;
(function (MODULE) {
    /* CONTROLLER */
    (function (CONTROLLER) {
        /**
        * @class Controller
        */
        var M;
        var C;

        var Template = (function () {
            function Template(model) {
                /**
                * Controllerの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -1 /* wait */;
                /**
                * Controllerが待ち受けるイベントに設定されるイベントハンドラのリスト
                *
                * @property HANDLERS
                * @type {Object}
                */
                this.HANDLERS = {};
                M = model;
                C = this;
                this.UUID = MODULE.GEN_UUID();

                // プラグインに関数を設定してネームスペースに登録
                // $.mvc.func, $().mvc.funcとして実行できるようにするための処理
                if (MODULE.NAMESPACE && MODULE.NAMESPACE == MODULE.NAMESPACE.window) {
                    MODULE.NAMESPACE[MODULE.NAME] = this.EXEC;
                } else {
                    MODULE.NAMESPACE[MODULE.NAME] = MODULE.NAMESPACE.prototype[MODULE.NAME] = this.EXEC;
                }

                var f = new CONTROLLER.ControllerFunction(C, M);

                // コンテクストに関数を設定
                this.REGISTER_FUNCTIONS(MODULE.NAMESPACE[MODULE.NAME], f);

                // コンテクストのプロパティを更新
                this.UPDATE_PROPERTIES(MODULE.NAMESPACE[MODULE.NAME], f);
                this.OBSERVE();
                this.state_ = 0;
            }
            /**
            * 与えられたコンテクストに拡張機能を設定する。
            *
            * @method EXTEND
            * @param {JQuery|Object|Function} context コンテクスト
            * @chainable
            */
            Template.prototype.EXTEND = function (context) {
                if (context === MODULE.NAMESPACE || MODULE.NAMESPACE && MODULE.NAMESPACE == MODULE.NAMESPACE.window) {
                    var m = new CONTROLLER.ControllerFunction(C, M);

                    // コンテクストをプラグインに変更
                    context = MODULE.NAMESPACE[MODULE.NAME];
                } else
                    var m = new CONTROLLER.ControllerMethod(C, M);

                // $().mvc()として実行された場合の処理
                if (context instanceof MODULE.NAMESPACE) {
                    if (context instanceof jQuery) {
                        // コンテクストへの変更をend()で戻せるようadd()
                        context = context.add();
                    }

                    // コンテクストに関数とメソッドを設定
                    this.REGISTER_FUNCTIONS(context, m);
                }

                // コンテクストのプロパティを更新
                this.UPDATE_PROPERTIES(context, m);
                return context;
            };

            /**
            * 拡張モジュール本体のインターフェイス。
            *
            * @method EXEC
            * @param {Any} [params]* パラメータ
            */
            Template.prototype.EXEC = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var context = C.EXTEND(this);
                args = [context].concat(args);
                args = C.exec_.apply(C, args);
                args = args instanceof Array ? args : [args];
                return M.MAIN.apply(M, args);
            };

            /**
            * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。戻り値の配列が`MAIN`および`main_`へ渡す引数のリストとなる。
            *
            * @method exec_
            * @param {Object} context
            * @param {Any} [params]* args
            */
            Template.prototype.exec_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return [context].concat(args);
            };

            /**
            * 拡張の関数を更新する
            *
            * @method REGISTER_FUNCTIONS
            * @param {JQuery|Object|Function} context コンテクスト
            * @return {JQuery|Object|Function} context コンテクスト
            */
            Template.prototype.REGISTER_FUNCTIONS = function (context, funcs) {
                var props = CONTROLLER.Template.PROPERTIES;

                var i;
                for (i in funcs) {
                    context[i] = funcs[i];
                }
                return context;
            };

            /**
            * 拡張のプロパティを更新する
            *
            * @method UPDATE_PROPERTIES
            * @param {JQuery|Object|Function} context コンテクスト
            * @param {Object} funcs プロパティのリスト
            * @return {JQuery|Object|Function} context コンテクスト
            */
            Template.prototype.UPDATE_PROPERTIES = function (context, funcs) {
                var props = CONTROLLER.Template.PROPERTIES;

                var i, len, prop;
                for (i = 0, len = props.length; i < len; i++) {
                    prop = props[i];
                    if (funcs[prop]) {
                        context[prop] = funcs[prop].call(context);
                    }
                }
                return context;
            };

            /**
            * 内部イベントを監視する。
            *
            * @method OBSERVE
            */
            Template.prototype.OBSERVE = function () {
            };

            /**
            * 内部イベントの監視を終了する。
            *
            * @method RELEASE
            */
            Template.prototype.RELEASE = function () {
            };

            Template.EVENTS = {};

            Template.FUNCTIONS = {};

            Template.METHODS = {};

            Template.PROPERTIES = [];

            Template.TRIGGERS = {};
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
                _super.call(this, model_);
                this.model_ = model_;
                // CONTROLLERの待ち受けるイベントに登録されるハンドラ
                this.HANDLERS = {};
            }
            Main.prototype.exec_ = function ($context, option) {
                $context = $context instanceof jQuery ? $context : this.EXTEND(jQuery(document));

                var pattern;
                pattern = $context instanceof MODULE.NAMESPACE ? 'm:' : 'f:';
                pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
                switch (pattern.toLowerCase()) {
                }

                return [$context, option];
            };

            // CONTROLLERが監視する内部イベントを登録
            Main.prototype.OBSERVE = function () {
            };

            Main.prototype.CLICK = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.CLICK.apply(this.model_, args);
            };
            Main.prototype.SUBMIT = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.SUBMIT.apply(this.model_, args);
            };
            Main.prototype.POPSTATE = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.POPSTATE.apply(this.model_, args);
            };
            Main.prototype.SCROLL = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                this.model_.SCROLL.apply(this.model_, args);
            };

            Main.EVENTS = {};

            Main.PROPERTIES = [];

            Main.TRIGGERS = {};
            return Main;
        })(CONTROLLER.Template);
        CONTROLLER.Main = Main;
    })(MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
    var CONTROLLER = MODULE.CONTROLLER;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        /**
        * Model of MVC
        *
        * @class Model
        */
        var Template = (function () {
            function Template() {
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
                * Modelの遷移状態を持つ
                *
                * @property state_
                * @type {State}
                */
                this.state_ = -1 /* wait */;
                /**
                * `new`をつけて実行した場合、MVCインスタンスごとの個別データ保存用のデータオブジェクトの操作となる。
                * メソッドとして実行した場合、MVCインスタンスをまたぐ共有データ保存用の操作となる。
                *
                * 個別データ操作
                * + add: new stock()
                *   インスタンス別のデータオブジェクトを返す。`uuid`プロパティにuuidが設定される。
                * + add: new stock(Data: object/function/array, ...)
                *   データオブジェクトに可変数の引数のオブジェクトのプロパティを追加して返す。`uuid`プロパティは上書きされない。
                * + get: stock(uuid: string)
                *   データオブジェクトを取得する。
                * + del: new stock(uuid: string)
                *   データオブジェクトを削除する。
                *
                * 共有データ操作
                * + set: stock(key: string, value: any)
                *   key-valueで共有データを保存する。
                * + set: stock(key: string, value: any, true)
                *   共有データをマージ保存する。
                * + set: stock(data: object)
                *   オブジェクトのプロパティをkey-valueのセットとして共有データを保存する。
                * + get: stock(key: string)
                *   共有データを取得する。
                * + del: stock(key: string, undefined)
                *   共有データを空データの保存により削除する。
                *
                * @method stock
                * @param {String} key
                * @param {Any} value
                * @param {Boolean} merge
                */
                this.stock = function stock(key, value, merge) {
                    if (this instanceof stock) {
                        switch (typeof key) {
                            case 'object':
                            case 'function':
                                this.uuid = MODULE.GEN_UUID();
                                stock[this.uuid] = this;
                                return jQuery.extend.apply(jQuery, [true, this].concat([].slice.call(arguments)).concat({ uuid: this.uuid }));
                            case 'string':
                                return delete stock[key];
                        }
                    } else if ('object' === typeof key) {
                        // 共有データ操作
                        var keys = key, iKeys;
                        for (iKeys in keys) {
                            Template.store(iKeys, keys[iKeys]);
                        }
                    } else {
                        switch (arguments.length) {
                            case 0:
                                // `new stock()`にリダイレクト
                                return new this.stock();
                            case 1:
                                // インスタンス別のデータオブジェクトまたは共有データを取得
                                return this.stock[key] || Template.store(key);
                            case 2:
                                // 共有データを保存
                                return Template.store(key, value);
                            case 3:
                                return Template.store(key, value, merge);
                        }
                    }
                };
                this.UUID = MODULE.GEN_UUID();
            }
            /**
            * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き変えない。
            *
            * @method MAIN
            */
            Template.prototype.MAIN = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                return this.main_.apply(this, [context].concat(args));
            };

            /**
            * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。
            *
            * @method main_
            * @param {Object} context
            * @param {Any} [params]* args
            */
            Template.prototype.main_ = function (context) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                this.state_ = 0 /* ready */;
                return context;
            };

            Template.store = function store(key, value, merge) {
                switch (arguments.length) {
                    case 0:
                        break;
                    case 1:
                        // 共有データを取得
                        return Template.store[key];
                    case 2:
                        // 共有データを設定
                        return Template.store[key] = value;
                    case 3:
                        return Template.store[key] = jQuery.extend(true, Template.store[key], value);
                }
            };
            return Template;
        })();
        MODEL.Template = Template;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Util = (function () {
            function Util() {
            }
            Util.canonicalizeUrl = function (url) {
                var ret;

                // Trim
                ret = this.trim(url);

                // Remove string starting with an invalid character
                ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');

                // Deny value beginning with the string of HTTP(S) other than
                ret = /^https?:/i.test(ret) ? ret : (function (url, a) {
                    a.href = url;
                    return a.href;
                })(ret, document.createElement('a'));

                // Unify to UTF-8 encoded values
                ret = encodeURI(decodeURI(ret));

                // Fix case
                ret = ret.replace(/(?:%\w{2})+/g, function (str) {
                    return url.match(str.toLowerCase()) || str;
                });
                return ret;
            };

            Util.trim = function (text) {
                text = text || '';
                if (String.prototype.trim) {
                    text = text.toString().trim();
                } else {
                    if (text = String(text).replace(/^[\s\uFEFF\xA0]+/, '')) {
                        for (var i = text.length; --i;) {
                            if (/[^\s\uFEFF\xA0]/.test(text.charAt(i))) {
                                text = text.substring(0, i + 1);
                                break;
                            }
                        }
                    }
                }
                return text;
            };

            Util.fire = function (fn, context, args, async) {
                if (typeof context === "undefined") { context = window; }
                if (typeof args === "undefined") { args = []; }
                if (typeof async === "undefined") { async = false; }
                if ('function' === typeof fn) {
                    return async ? setTimeout(function () {
                        fn.apply(context || window, args);
                    }, 0) : fn.apply(context || window, args);
                } else {
                    return fn;
                }
            };
            return Util;
        })();
        MODEL.Util = Util;

        MODEL.UTIL = MODEL.Util;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var AppUpdate = (function () {
            function AppUpdate(model_, app_, setting, event, register, cache) {
                this.model_ = model_;
                this.app_ = app_;
                this.checker_ = jQuery();
                this.loadwaits_ = [];
                var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
                speedcheck && (speed.fire = event.timeStamp);
                speedcheck && speed.time.splice(0, 100, 0);
                speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

                var that = this;

                if (MODEL.UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) {
                    return;
                }

                this.app_.isScrollPosSavable = false;
                setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

                var activeXHR = this.model_.getActiveXHR();
                event = jQuery.extend(true, {}, event);
                this.setting_ = setting;
                this.cache_ = cache;
                this.event_ = event;
                this.register_ = register;

                function done(xhrArgs) {
                    MODEL.UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(xhrArgs));
                }
                function fail(xhrArgs) {
                    MODEL.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));
                }
                function always(xhrArgs) {
                    MODEL.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));

                    that.model_.setActiveXHR(null);
                    var data, textStatus, jqXHR;
                    if (2 < xhrArgs.length) {
                        that.data_ = xhrArgs[0];
                        that.textStatus_ = xhrArgs[1];
                        that.jqXHR_ = xhrArgs[2];

                        that.update_();
                    } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
                        if (setting.balance.self) {
                            that.app_.DATA.saveServerToDB(setting.balance.server.host, new Date().getTime());
                            that.app_.disableBalance();
                        }
                        that.model_.fallback(event, setting);
                    }
                }

                if (cache && cache.jqXHR) {
                    // cache
                    speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                    setting.loadtime = 0;
                    this.model_.setActiveXHR(null);
                    this.host_ = cache.host || '';
                    this.data_ = cache.data;
                    this.textStatus_ = cache.textStatus;
                    this.jqXHR_ = cache.jqXHR;
                    if (this.model_.isDeferrable) {
                        jQuery.when(jQuery.Deferred().resolve(), that.wait_(MODEL.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(function () {
                            return that.update_();
                        }) && undefined;
                    } else {
                        that.update_();
                    }
                } else if (activeXHR && activeXHR.follow && 'abort' !== activeXHR.statusText && 'error' !== activeXHR.statusText) {
                    // preload
                    speedcheck && speed.time.splice(0, 1, activeXHR.timeStamp - speed.fire);
                    speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                    this.host_ = activeXHR.host || '';
                    setting.loadtime = activeXHR.timeStamp;
                    var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
                    jQuery.when(activeXHR, that.wait_(wait)).done(done).fail(fail).always(always);
                } else {
                    // default
                    setting.loadtime = event.timeStamp;
                    var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};

                    this.app_.chooseRequestServer(setting);
                    this.host_ = setting.balance.self && this.model_.requestHost.split('//').pop() || '';
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
                            if ('POST' === ajax.type) {
                                ajax.data = jQuery(event.currentTarget).serializeArray();
                            }
                            break;

                        case 'popstate':
                            ajax.type = 'GET';
                            break;
                    }

                    callbacks = {
                        xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
                            var jqXHR;
                            jqXHR = MODEL.UTIL.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
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

                            MODEL.UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
                        },
                        dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                            return MODEL.UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
                        },
                        success: function (data, textStatus, jqXHR) {
                            that.data_ = data;
                            MODEL.UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            that.errorThrown_ = errorThrown;
                            MODEL.UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
                        },
                        complete: function (jqXHR, textStatus) {
                            MODEL.UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);

                            that.model_.setActiveXHR(null);
                            if (!that.errorThrown_) {
                                if (!that.model_.isDeferrable) {
                                    that.textStatus_ = textStatus;
                                    that.jqXHR_ = jqXHR;
                                    that.update_();
                                }
                            } else if (setting.fallback && 'abort' !== textStatus) {
                                if (setting.balance.self) {
                                    that.app_.disableBalance();
                                }
                                that.model_.fallback(event, setting);
                            }
                        }
                    };

                    ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

                    activeXHR = this.model_.setActiveXHR(jQuery.ajax(ajax));
                    jQuery(document).trigger(jQuery.Event(setting.gns + '.request', activeXHR));

                    if (this.model_.isDeferrable) {
                        jQuery.when(activeXHR, that.wait_(MODEL.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(done).fail(fail).always(always);
                    }
                }

                if (MODEL.UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) {
                    return;
                }
            }
            AppUpdate.prototype.update_ = function () {
                var _this = this;
                UPDATE:
                 {
                    var that = this, APP = this.app_;
                    var setting = this.setting_, cache = this.cache_, event = this.event_, register = this.register_, data = this.data_, textStatus = this.textStatus_, jqXHR = this.jqXHR_;
                    var callbacks_update = setting.callbacks.update;

                    setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
                    setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;

                    var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

                    this.model_.setActiveSetting(setting);

                    if (MODEL.UTIL.fire(callbacks_update.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_, cache]) === false) {
                        break UPDATE;
                    }

                    if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                        return this.model_.fallback(event, setting);
                    }

                    try  {
                        APP.landing = null;
                        if (!~(jqXHR.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) {
                            throw new Error("throw: content-type mismatch");
                        }

                        DEFINE:
                         {
                            this.srcDocument_ = APP.createHTMLDocument(jqXHR.responseText);
                            this.dstDocument_ = document;

                            var srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;

                            // 更新範囲を選出
                            setting.area = this.app_.chooseArea(setting.area, srcDocument, dstDocument);
                            if (!setting.area) {
                                throw new Error('throw: area notfound');
                            }

                            // 更新範囲をセレクタごとに分割
                            setting.areas = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                        }
                        ;

                        /* check point */
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

                        /* rewrite */
                        this.updateRewrite_();

                        /* cache */
                        this.updateCache_();

                        /* escape */
                        jQuery('noscript', srcDocument).children().parent().each(function () {
                            this.children.length && jQuery(this).text(this.innerHTML);
                        });

                        /* redirect */
                        this.updateRedirect_();

                        jQuery(window).trigger(setting.gns + '.unload');

                        /* url */
                        this.updateUrl_();

                        setting.origLocation.href = setting.destLocation.href;

                        /* title */
                        this.updateTitle_();

                        /* head */
                        this.updateHead_();

                        /* check point */
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

                        /* content */
                        this.loadwaits_ = this.updateContent_();
                        this.checker_ = jQuery(setting.area).children('.' + setting.nss.class4html + '-check');

                        /* check point */
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

                        /* escape */
                        jQuery('noscript', srcDocument).remove();

                        /* verify */
                        this.updateVerify_();

                        /* balance */
                        this.updateBalance_();

                        /* load */
                        this.updateCSS_('link[rel~="stylesheet"], style');
                        jQuery(window).one(setting.gns + '.rendering', function (event) {
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            _this.updateScroll_(false);
                            jQuery(dstDocument).trigger(setting.gns + '.ready');
                            _this.updateScript_(':not([defer]), :not([src])');
                            if (setting.load.sync) {
                                var callback = function () {
                                    return _this.updateScript_('[src][defer]');
                                };
                                _this.updateRender_(callback);
                            } else {
                                _this.updateRender_(null);
                                _this.updateScript_('[src][defer]');
                            }
                        }).trigger(setting.gns + '.rendering');

                        if (MODEL.UTIL.fire(callbacks_update.success, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                            break UPDATE;
                        }
                        if (MODEL.UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                            break UPDATE;
                        }
                        if (MODEL.UTIL.fire(setting.callback, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                            break UPDATE;
                        }
                    } catch (err) {
                        if (!err) {
                            return;
                        }

                        /* cache delete */
                        cache && this.model_.removeCache(setting.destLocation.href);

                        if (MODEL.UTIL.fire(callbacks_update.error, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                            break UPDATE;
                        }
                        if (MODEL.UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                            break UPDATE;
                        }
                        this.model_.fallback(event, setting);
                    }
                    ;

                    if (MODEL.UTIL.fire(callbacks_update.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                }
                ;
            };

            AppUpdate.prototype.updateRewrite_ = function () {
                var setting = this.setting_, cache = this.cache_, event = this.event_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.rewrite) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) {
                    return;
                }

                MODEL.UTIL.fire(setting.rewrite, null, [this.srcDocument_, setting.area, this.host_]);

                if (MODEL.UTIL.fire(callbacks_update.rewrite.before, null, [event, setting.param]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateCache_ = function () {
                var setting = this.setting_, cache = this.cache_, event = this.event_, data = this.data_, textStatus = this.textStatus_, jqXHR = this.jqXHR_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.cache.click && !setting.cache.submit && !setting.cache.popstate) {
                    return;
                }
                if ('submit' === event.type.toLowerCase() && !setting.cache[event.currentTarget.method.toLowerCase()]) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) {
                    return;
                }

                this.model_.setCache(setting.destLocation.href, cache && cache.data || null, textStatus, jqXHR);
                cache = this.model_.getCache(setting.destLocation.href);
                this.cache_ = cache;

                if (cache && cache.data) {
                    var cacheDocument = this.app_.createHTMLDocument(cache.data), srcDocument = this.srcDocument_;

                    srcDocument.title = cacheDocument.title;
                    var i = -1, $srcAreas, $dstAreas;
                    while (setting.areas[++i]) {
                        $srcAreas = jQuery(setting.areas[i], cacheDocument).clone();
                        $dstAreas = jQuery(setting.areas[i], srcDocument);
                        var j = -1;
                        while ($srcAreas[++j]) {
                            $dstAreas.eq(j).replaceWith($srcAreas.eq(j));
                        }
                    }
                }

                if (MODEL.UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) {
                    return;
                }

                return;
            };

            AppUpdate.prototype.updateRedirect_ = function () {
                var setting = this.setting_, event = this.event_, register = this.register_;
                var callbacks_update = setting.callbacks.update;

                if (!jQuery('head meta[http-equiv="Refresh"][content*="URL="]', this.srcDocument_)[0]) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
                ;

                var redirect = setting.destLocation.cloneNode();
                redirect.href = jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i).shift();
                switch (true) {
                    case !setting.redirect:
                    case redirect.protocol !== setting.destLocation.protocol:
                    case redirect.host !== setting.destLocation.host:
                    case 'submit' === event.type.toLowerCase() && 'GET' === event.currentTarget.method.toUpperCase():
                        switch (event.type.toLowerCase()) {
                            case 'click':
                            case 'submit':
                                return window.location.assign(redirect.href);
                            case 'popstate':
                                return window.location.replace(redirect.href);
                        }
                    default:
                        jQuery[MODULE.NAME].enable();
                        switch (event.type.toLowerCase()) {
                            case 'click':
                                return void jQuery[MODULE.NAME].click(redirect.href);
                            case 'submit':
                                return void 'GET' === event.currentTarget.method.toUpperCase() ? jQuery[MODULE.NAME].click(redirect) : window.location.assign(redirect.href);
                            case 'popstate':
                                window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                                if (register && setting.fix.location) {
                                    jQuery[MODULE.NAME].disable();
                                    window.history.back();
                                    window.history.forward();
                                    jQuery[MODULE.NAME].enable();
                                }
                                return void jQuery(window).trigger('popstate.' + setting.gns);
                        }
                }

                if (MODEL.UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateUrl_ = function () {
                var setting = this.setting_, event = this.event_, register = this.register_;
                var callbacks_update = setting.callbacks.update;

                if (MODEL.UTIL.fire(callbacks_update.url.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
                ;

                register && window.history.pushState(MODEL.UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]), window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title, setting.destLocation.href);

                if (register && setting.fix.location) {
                    jQuery[MODULE.NAME].disable();
                    window.history.back();
                    window.history.forward();
                    jQuery[MODULE.NAME].enable();
                }

                if (MODEL.UTIL.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateTitle_ = function () {
                var setting = this.setting_, event = this.event_;
                var callbacks_update = setting.callbacks.update;

                if (MODEL.UTIL.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
                this.dstDocument_.title = this.srcDocument_.title;
                setting.database && setting.fix.history && this.app_.DATA.saveTitleToDB(setting.destLocation.href, this.srcDocument_.title);
                if (MODEL.UTIL.fire(callbacks_update.title.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateHead_ = function () {
                var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.load.head) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.head.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }

                var title = jQuery('title'), adds = [], srcElements, dstElements;

                srcElements = jQuery('head', srcDocument).find(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script');
                dstElements = jQuery('head', dstDocument).find(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script');

                for (var i = 0, element, selector; element = srcElements[i]; i++) {
                    element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
                    switch (element.tagName.toLowerCase()) {
                        case 'base':
                            selector = '*';
                            break;
                        case 'link':
                            selector = '[rel="' + element.getAttribute('rel') + '"]';
                            switch ((element.getAttribute('rel') || '').toLowerCase()) {
                                case 'alternate':
                                    selector += 'string' === typeof element.getAttribute('type') ? '[type="' + element.getAttribute('type') + '"]' : ':not([type])';
                                    break;
                            }
                            break;
                        case 'meta':
                            if (element.getAttribute('charset')) {
                                selector = '[charset]';
                            } else if (element.getAttribute('http-equiv')) {
                                selector = '[http-equiv="' + element.getAttribute('http-equiv') + '"]';
                            } else if (element.getAttribute('name')) {
                                selector = '[name="' + element.getAttribute('name') + '"]';
                            } else if (element.getAttribute('property')) {
                                selector = '[property="' + element.getAttribute('property') + '"]';
                            } else {
                                continue;
                            }
                            break;
                        default:
                            selector = null;
                    }
                    if (!selector) {
                        continue;
                    }

                    var targets = dstElements.filter(element.tagName).filter(selector);
                    for (var j = targets.length; j--;) {
                        if (targets[j].outerHTML === element.outerHTML) {
                            dstElements = dstElements.not(targets[j]);
                            element = null;
                            break;
                        }
                    }
                    element && adds.push(element);
                }
                title.before(adds);
                dstElements.remove();

                if (MODEL.UTIL.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateContent_ = function () {
                var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                var callbacks_update = setting.callbacks.update;
                var checker = jQuery(), loadwaits = [];

                if (MODEL.UTIL.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return loadwaits;
                }

                jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
                checker = jQuery('<div/>', {
                    'class': setting.nss.class4html + '-check',
                    'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
                }).text(setting.gns);
                var i = -1, $srcAreas, $dstAreas;
                while (setting.areas[++i]) {
                    $srcAreas = jQuery(setting.areas[i], srcDocument).clone().find('script').remove().end();
                    $dstAreas = jQuery(setting.areas[i], dstDocument);
                    if (!$srcAreas[0] || !$dstAreas[0] || $srcAreas.length !== $dstAreas.length) {
                        throw new Error('throw: area mismatch');
                    }
                    if (setting.load.sync && jQuery.when) {
                        loadwaits.concat($srcAreas.find('img, iframe, frame').map(function () {
                            var defer = jQuery.Deferred();
                            jQuery(this).one('load error', defer.resolve);
                            return defer;
                        }).get());
                    }
                    var j = -1;
                    while ($srcAreas[++j]) {
                        $dstAreas.eq(j).replaceWith($srcAreas.eq(j).append(checker.clone()));
                    }
                }
                jQuery(dstDocument).trigger(setting.gns + '.DOMContentLoaded');

                if (MODEL.UTIL.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return loadwaits;
                }

                return loadwaits;
            };

            AppUpdate.prototype.updateScroll_ = function (call) {
                var setting = this.setting_, event = this.event_;
                var callbacks_update = setting.callbacks.update;

                if (MODEL.UTIL.fire(callbacks_update.scroll.before, null, [event, setting.param]) === false) {
                    return;
                }

                var scrollX, scrollY;
                switch (event.type.toLowerCase()) {
                    case 'click':
                    case 'submit':
                        scrollX = call && 'function' === typeof setting.scrollLeft ? MODEL.UTIL.fire(setting.scrollLeft, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollLeft;
                        scrollX = 0 <= scrollX ? scrollX : 0;
                        scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

                        scrollY = call && 'function' === typeof setting.scrollTop ? MODEL.UTIL.fire(setting.scrollTop, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollTop;
                        scrollY = 0 <= scrollY ? scrollY : 0;
                        scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

                        (jQuery(window).scrollTop() === scrollY && jQuery(window).scrollLeft() === scrollX) || window.scrollTo(scrollX, scrollY);
                        call && setting.database && this.app_.isScrollPosSavable && setting.fix.scroll && this.app_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, scrollX, scrollY);
                        break;
                    case 'popstate':
                        call && setting.fix.scroll && setting.database && this.app_.DATA.loadScrollPositionFromCacheOrDB(setting.destLocation.href);
                        break;
                }

                if (MODEL.UTIL.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateCSS_ = function (selector) {
                var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.load.css) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.css.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }

                var css = jQuery(selector, srcDocument).not(jQuery(setting.area, srcDocument).find(selector)).not(setting.load.ignore), removes = jQuery(selector, dstDocument).not(jQuery(setting.area, dstDocument).find(selector)).not(setting.load.ignore), adds = [];

                for (var i = 0, element; element = css[i]; i++) {
                    for (var j = 0; removes[j]; j++) {
                        if (MODEL.UTIL.trim(removes[j].href || removes[j].innerHTML || '') === MODEL.UTIL.trim(element.href || element.innerHTML || '')) {
                            if (adds.length) {
                                element = removes.eq(j).prevAll(selector).first();
                                element[0] ? element.after(jQuery(adds).clone()) : removes.eq(j).before(jQuery(adds).clone());
                                adds = [];
                            }
                            removes = removes.not(removes[j]);
                            j -= Number(!!j);
                            element = null;
                            break;
                        }
                    }
                    element && adds.push(element);
                }
                jQuery('head', dstDocument).append(jQuery('head', srcDocument).find(jQuery(adds)).clone());
                jQuery('body', dstDocument).append(jQuery('body', srcDocument).find(jQuery(adds)).clone());
                removes.remove();

                if (MODEL.UTIL.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }

                var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
            };

            AppUpdate.prototype.updateScript_ = function (selector) {
                var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.load.script) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }

                var script = jQuery('script', srcDocument).not(setting.load.ignore), execs = [];

                var executed = this.app_.stock('executed');
                for (var i = 0, element; element = script[i]; i++) {
                    if (!jQuery(element).is(selector)) {
                        continue;
                    }
                    if (!element.src && !MODEL.UTIL.trim(element.innerHTML)) {
                        continue;
                    }
                    if (element.src in executed || setting.load.ignore && jQuery(element).is(setting.load.ignore)) {
                        continue;
                    }

                    if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) {
                        executed[element.src] = true;
                    }
                    element && execs.push(element);
                }

                for (var i = 0, element; element = execs[i]; i++) {
                    try  {
                        if (element.src) {
                            jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, { url: element.src, async: !!element.async, global: false }));
                        } else {
                            'object' === typeof element && (!element.type || ~element.type.toLowerCase().indexOf('text/javascript')) && eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(/^\s*<!(?:\[CDATA\[|\-\-)/, '/*$0*/'));
                        }
                    } catch (err) {
                        break;
                    }
                }

                if (MODEL.UTIL.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    return;
                }

                var speedcheck = setting.speedcheck, speed = this.model_.stock('speed');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
            };

            AppUpdate.prototype.updateRender_ = function (callback) {
                var _this = this;
                var setting = this.setting_, event = this.event_, checker = this.checker_, loadwaits = this.loadwaits_;

                var callbacks_update = setting.callbacks.update;

                var rendered = function (callback) {
                    var speedcheck = setting.speedcheck, speed = _this.model_.stock('speed');
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

                    checker.remove();
                    setTimeout(function () {
                        _this.app_.isScrollPosSavable = true;
                        if ('popstate' !== event.type.toLowerCase()) {
                            _this.scrollByHash(setting.destLocation.hash) || _this.updateScroll_(true);
                        } else {
                            _this.updateScroll_(true);
                        }
                    }, 100);

                    jQuery(document).trigger(setting.gns + '.render');
                    MODEL.UTIL.fire(callback);

                    function onload() {
                        jQuery(window).trigger(setting.gns + '.load');
                    }
                    if (setting.load.sync && jQuery.when && loadwaits[0]) {
                        jQuery.when.apply(jQuery, loadwaits).always(onload);
                    } else {
                        onload();
                    }

                    speedcheck && console.log(speed.time);
                    speedcheck && console.log(speed.name);
                    if (MODEL.UTIL.fire(callbacks_update.render.after, null, [event, setting.param]) === false) {
                        return;
                    }
                };

                if (MODEL.UTIL.fire(callbacks_update.render.before, null, [event, setting.param]) === false) {
                    return;
                }

                var count = 0;
                (function check() {
                    switch (true) {
                        case 100 <= count:
                        case MODEL.UTIL.canonicalizeUrl(window.location.href) !== setting.destLocation.href:
                            break;
                        case checker.length === checker.filter(function () {
                            return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
                        }).length:
                            rendered(callback);
                            break;
                        case 0 < checker.length:
                            ++count && setTimeout(check, setting.interval);
                    }
                })();
            };

            AppUpdate.prototype.updateVerify_ = function () {
                var setting = this.setting_, event = this.event_;
                var callbacks_update = setting.callbacks.update;

                if (MODEL.UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]) === false) {
                    return;
                }

                // モバイルブラウザでアドレスバーのURLのパーセントエンコーディングの大文字小文字がアンカーと一致しないため揃える必要がある
                if (setting.destLocation.href === MODEL.UTIL.canonicalizeUrl(window.location.href).replace(/(?:%\w{2})+/g, function (str) {
                    return String(setting.destLocation.href.match(str.toLowerCase()) || str);
                })) {
                    setting.retriable = true;
                } else if (setting.retriable) {
                    setting.retriable = false;
                    setting.destLocation.href = MODEL.UTIL.canonicalizeUrl(window.location.href);
                    new this.app_.Update(this.model_, this.app_, setting, event, false, setting.cache[event.type.toLowerCase()] && this.model_.getCache(setting.destLocation.href));
                    throw false;
                } else {
                    throw new Error('throw: location mismatch');
                }

                if (MODEL.UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.updateBalance_ = function () {
                var setting = this.setting_, event = this.event_;
                var callbacks_update = setting.callbacks.update;

                if (!setting.balance.self || !setting.loadtime) {
                    return;
                }

                if (MODEL.UTIL.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) {
                    return;
                }

                var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || '').split('//').pop();
                this.app_.DATA.saveLogToDB({
                    host: host,
                    performance: Math.ceil(setting.loadtime / (this.jqXHR_.responseText.length || 1) * 1e5),
                    date: new Date().getTime()
                });
                this.app_.DATA.saveServerToDB(host, 0, setting.destLocation.href, this.app_.calExpires(this.jqXHR_));
                this.app_.chooseRequestServer(setting);

                if (MODEL.UTIL.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) {
                    return;
                }
            };

            AppUpdate.prototype.wait_ = function (ms) {
                var defer = jQuery.Deferred();
                if (!ms) {
                    return defer.resolve();
                }

                setTimeout(function () {
                    defer.resolve();
                }, ms);
                return defer;
            };

            AppUpdate.prototype.scrollByHash = function (hash) {
                hash = '#' === hash.charAt(0) ? hash.slice(1) : hash;
                if (!hash) {
                    return false;
                }

                var $hashTargetElement = jQuery('#' + (hash ? hash : ', [name~=' + hash + ']')).first();
                if ($hashTargetElement[0]) {
                    isFinite($hashTargetElement.offset().top) && window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
                    return true;
                } else {
                    return false;
                }
            };
            return AppUpdate;
        })();
        MODEL.AppUpdate = AppUpdate;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataStore = (function () {
            function DataStore(DB) {
                this.buffer_ = [];
                this.DB_ = DB;
            }
            DataStore.prototype.accessStore = function (success, mode) {
                var _this = this;
                if (typeof mode === "undefined") { mode = 'readwrite'; }
                var database = this.DB_.database_;

                this.DB_.conExtend_();

                if (database) {
                    success(database.transaction(this.name, mode).objectStore(this.name));
                } else {
                    this.DB_.opendb(function () {
                        _this.accessStore(success);
                    });
                }
            };

            DataStore.prototype.accessRecord = function (key, success, mode) {
                if (typeof mode === "undefined") { mode = 'readwrite'; }
                this.accessStore(function (store) {
                    store.get(key).onsuccess = success;
                }, mode);
            };

            DataStore.prototype.loadBuffer = function (limit) {
                var _this = this;
                var that = this;
                this.accessStore(function (store) {
                    var index = store.indexNames.length ? store.indexNames[0] : store.keyPath;
                    store.index(index).openCursor(_this.DB_.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
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

            DataStore.prototype.saveBuffer = function () {
            };

            DataStore.prototype.getBuffer = function (key) {
                return key ? this.buffer_[key] : this.buffer_;
            };

            DataStore.prototype.setBuffer = function (value, isMerge) {
                var key = value[this.keyPath];
                this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
                return this.buffer_[value[this.keyPath]];
            };

            DataStore.prototype.addBuffer = function (value) {
                value[this.keyPath] = this.buffer_.length || 1;
                this.buffer_.push(value);
                return value;
            };

            DataStore.prototype.add = function (value) {
                var key = value[this.keyPath];
                delete value[this.keyPath];
                this.accessRecord(key, function () {
                    'undefined' !== typeof key && this.source['delete'](key);
                    this.source.add(value);
                });
            };

            DataStore.prototype.set = function (value) {
                var key = value[this.keyPath];
                this.accessRecord(key, function () {
                    this.source.put(jQuery.extend(true, {}, this.result, value));
                });
            };

            DataStore.prototype.get = function (key, success) {
                this.accessRecord(key, success);
            };

            DataStore.prototype.del = function (key) {
                this.accessRecord(key, function () {
                    this.source['delete'](key);
                });
            };
            return DataStore;
        })();
        MODEL.DataStore = DataStore;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataStoreMeta = (function (_super) {
            __extends(DataStoreMeta, _super);
            function DataStoreMeta() {
                _super.apply(this, arguments);
                this.name = 'meta';
                this.keyPath = 'id';
            }
            return DataStoreMeta;
        })(MODEL.DataStore);
        MODEL.DataStoreMeta = DataStoreMeta;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataStoreHistory = (function (_super) {
            __extends(DataStoreHistory, _super);
            function DataStoreHistory() {
                _super.apply(this, arguments);
                this.name = 'history';
                this.keyPath = 'id';
            }
            DataStoreHistory.prototype.clean = function () {
                var that = this;
                this.accessStore(function (store) {
                    store.count().onsuccess = function () {
                        if (this.result > 1000) {
                            store.index('date').openCursor(that.DB_.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
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
            return DataStoreHistory;
        })(MODEL.DataStore);
        MODEL.DataStoreHistory = DataStoreHistory;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataStoreLog = (function (_super) {
            __extends(DataStoreLog, _super);
            function DataStoreLog() {
                _super.apply(this, arguments);
                this.name = 'log';
                this.keyPath = 'id';
            }
            DataStoreLog.prototype.clean = function () {
                var that = this;
                this.accessStore(function (store) {
                    var size = 50;

                    store.count().onsuccess = function () {
                        if (this.result > size + 10) {
                            size = this.result - size;
                            store.index(store.keyPath).openCursor(this.DB_.IDBKeyRange.lowerBound(0)).onsuccess = function () {
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
            return DataStoreLog;
        })(MODEL.DataStore);
        MODEL.DataStoreLog = DataStoreLog;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataStoreServer = (function (_super) {
            __extends(DataStoreServer, _super);
            function DataStoreServer() {
                _super.apply(this, arguments);
                this.name = 'server';
                this.keyPath = 'id';
            }
            return DataStoreServer;
        })(MODEL.DataStore);
        MODEL.DataStoreServer = DataStoreServer;
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
    /* MODEL */
    (function (MODEL) {
        var DataDB = (function () {
            function DataDB() {
                var _this = this;
                this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
                this.name_ = MODULE.NAME;
                this.version_ = 4;
                this.refresh_ = 10;
                this.upgrade_ = 1;
                this.state_ = -1 /* wait */;
                this.nowInitializing = false;
                this.nowRetrying = false;
                this.conAge_ = 10 * 1000;
                this.conInterval_ = 1000;
                this.tasks_ = [];
                this.store = {
                    meta: new MODEL.DataStoreMeta(this),
                    history: new MODEL.DataStoreHistory(this),
                    log: new MODEL.DataStoreLog(this),
                    server: new MODEL.DataStoreServer(this)
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
                    _this.tasks_[0] && _this.opendb(null, true);
                };
                this.conAge_ && setTimeout(check, this.conInterval_);
            }
            DataDB.prototype.state = function () {
                return this.state_;
            };

            DataDB.prototype.opendb = function (task, noRetry) {
                var that = this;

                if (!that.IDBFactory || !task && !that.tasks_[0]) {
                    return;
                }

                that.conExtend_();
                task && that.reserveTask_(task);

                try  {
                    that.nowInitializing = true;

                    var request = that.IDBFactory.open(that.name_, that.upgrade_ ? that.version_ : 1);

                    request.onblocked = function () {
                        this.result.close();
                        !noRetry && that.initdb_(1000);
                    };

                    request.onupgradeneeded = function () {
                        try  {
                            var database = this.result;

                            for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) {
                                database.deleteObjectStore(database.objectStoreNames[i]);
                            }

                            database.createObjectStore(that.store.meta.name, { keyPath: that.store.meta.keyPath, autoIncrement: false }).createIndex(that.store.meta.keyPath, that.store.meta.keyPath, { unique: true });

                            database.createObjectStore(that.store.history.name, { keyPath: that.store.history.keyPath, autoIncrement: false }).createIndex('date', 'date', { unique: false });

                            database.createObjectStore(that.store.log.name, { keyPath: that.store.log.keyPath, autoIncrement: true }).createIndex('date', 'date', { unique: false });

                            database.createObjectStore(that.store.server.name, { keyPath: that.store.server.keyPath, autoIncrement: false }).createIndex(that.store.server.keyPath, that.store.server.keyPath, { unique: true });
                        } catch (err) {
                            !noRetry && that.initdb_(1000);
                        }
                    };

                    request.onsuccess = function () {
                        try  {
                            var database = this.result;

                            that.checkdb_(database, that.version_, function () {
                                that.database_ = database;
                                that.state_ = 0 /* ready */;
                                that.conExtend_();
                                that.nowInitializing = false;

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
                        !noRetry && that.initdb_(1000);
                    };
                } catch (err) {
                    !noRetry && that.initdb_(1000);
                }
            };

            DataDB.prototype.closedb = function () {
                var database = this.database_;
                this.database_ = null;
                this.state_ = -1 /* wait */;
                database && database.close && database.close();
            };

            DataDB.prototype.deletedb_ = function () {
                this.closedb();
                var IDBFactory = this.IDBFactory;
                IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
            };

            DataDB.prototype.initdb_ = function (delay) {
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

            DataDB.prototype.checkdb_ = function (database, version, success, upgrade) {
                var that = this;

                var req = database.transaction(that.store.meta.name, 'readwrite').objectStore(that.store.meta.name).get(that.metaNames.version);
                req.onsuccess = function () {
                    // version check
                    var data = this.result;
                    if (!data || that.upgrade_) {
                        this.source.put({ id: that.metaNames.version, value: version });
                    } else if (data.value !== version) {
                        return void upgrade();
                    }

                    if (that.refresh_) {
                        var req = database.transaction(that.store.meta.name, 'readwrite').objectStore(that.store.meta.name).get(that.metaNames.update);
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

            DataDB.prototype.conExtend_ = function () {
                this.conExpires_ = new Date().getTime() + this.conAge_;
            };

            DataDB.prototype.reserveTask_ = function (task) {
                this.tasks_.push(task);
            };

            DataDB.prototype.digestTask_ = function (limit) {
                if (typeof limit === "undefined") { limit = 0; }
                var task;
                limit = limit || -1;
                while (task = limit-- && this.tasks_.pop()) {
                    task();
                }
            };
            return DataDB;
        })();
        MODEL.DataDB = DataDB;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var DataCookie = (function () {
            function DataCookie(age) {
                this.age_ = age;
            }
            DataCookie.prototype.getCookie = function (key) {
                var reg = new RegExp('(?:^|; )(' + encodeURIComponent(key) + '=[^;]*)'), data = (document.cookie.match(reg) || []).pop();

                return data && decodeURIComponent(data.split('=').pop());
            };

            DataCookie.prototype.setCookie = function (key, value, option) {
                if (typeof option === "undefined") { option = {}; }
                option.age = option.age || this.age_;
                document.cookie = [
                    encodeURIComponent(key) + '=' + encodeURIComponent(value),
                    option.age ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
                    option.path ? '; path=' + option.path : '',
                    option.domain ? '; domain=' + option.domain : '',
                    option.secure ? '; secure' : ''
                ].join('');
                return this.getCookie(key);
            };
            return DataCookie;
        })();
        MODEL.DataCookie = DataCookie;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Data = (function () {
            function Data() {
                this.DB = new MODEL.DataDB();
                this.Cookie = new MODEL.DataCookie(10 * 24 * 60 * 60);
            }
            return Data;
        })();
        MODEL.Data = Data;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var AppData = (function () {
            function AppData(model_, app_) {
                this.model_ = model_;
                this.app_ = app_;
                this.DATA_ = new MODEL.Data();
                this.storeNames = {
                    meta: this.DATA_.DB.store.meta.name,
                    history: this.DATA_.DB.store.history.name,
                    log: this.DATA_.DB.store.log.name,
                    server: this.DATA_.DB.store.server.name
                };
            }
            AppData.prototype.getCookie = function (key) {
                return this.DATA_.Cookie.getCookie(key);
            };

            AppData.prototype.setCookie = function (key, value, option) {
                return this.DATA_.Cookie.setCookie(key, value, option);
            };

            AppData.prototype.opendb = function (setting) {
                var _this = this;
                setting.database = false;
                this.DATA_.DB.opendb(function () {
                    _this.saveTitleToDB(setting.origLocation.href, document.title);
                    _this.saveScrollPositionToCacheAndDB(setting.origLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                    setting.database = true;
                });
            };

            AppData.prototype.getBuffer = function (storeName, key) {
                return this.DATA_.DB.store[storeName].getBuffer(key);
            };

            AppData.prototype.setBuffer = function (storeName, key, value, isMerge) {
                return this.DATA_.DB.store[storeName].setBuffer(key, value, isMerge);
            };

            AppData.prototype.loadBuffer = function (storeName, limit) {
                if (typeof limit === "undefined") { limit = 0; }
                return this.DATA_.DB.store[storeName].loadBuffer(limit);
            };

            AppData.prototype.saveBuffer = function (storeName) {
                return this.DATA_.DB.store[storeName].saveBuffer();
            };

            AppData.prototype.loadBufferAll = function (limit) {
                if (typeof limit === "undefined") { limit = 0; }
                for (var i in this.storeNames) {
                    this.loadBuffer(i, limit);
                }
            };

            AppData.prototype.saveBufferAll = function () {
                for (var i in this.storeNames) {
                    this.saveBuffer(i);
                }
            };

            AppData.prototype.loadTitleFromDB = function (unsafe_url) {
                var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url)), that = this;

                var data = this.DATA_.DB.store.history.getBuffer(keyUrl);

                if (data && 'string' === typeof data.title) {
                    document.title = data.title;
                } else {
                    this.DATA_.DB.store.history.get(keyUrl, function () {
                        keyUrl === that.model_.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(window.location.href)) && this.result && this.result.title && (document.title = this.result.title);
                    });
                }
            };

            AppData.prototype.saveTitleToDB = function (unsafe_url, title) {
                var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));

                var value = { id: keyUrl, title: title, date: new Date().getTime() };
                this.DATA_.DB.store.history.setBuffer(value, true);
                this.DATA_.DB.store.history.set(value);
                this.DATA_.DB.store.history.clean();
            };

            AppData.prototype.loadScrollPositionFromCacheOrDB = function (unsafe_url) {
                var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));

                var data = this.DATA_.DB.store.history.getBuffer(keyUrl);
                function scroll(scrollX, scrollY) {
                    if ('number' !== typeof scrollX || 'number' !== typeof scrollY) {
                        return;
                    }

                    window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
                }

                if (data && 'number' === typeof data.scrollX) {
                    scroll(data.scrollX, data.scrollY);
                } else {
                    this.DATA_.DB.store.history.get(keyUrl, function () {
                        if (!this.result || keyUrl !== this.result.id) {
                            return;
                        }
                        data = this.result;
                        scroll(data.scrollX, data.scrollY);
                    });
                }
            };

            AppData.prototype.saveScrollPositionToCacheAndDB = function (unsafe_url, scrollX, scrollY) {
                var keyUrl = this.model_.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));

                var value = { id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
                this.DATA_.DB.store.history.setBuffer(value, true);
                this.DATA_.DB.store.history.set(value);
            };

            AppData.prototype.loadExpiresFromDB = function (keyUrl) {
            };

            AppData.prototype.saveExpiresToDB = function (keyUrl, host, expires) {
                var value = { id: keyUrl, host: host, expires: expires };
                this.DATA_.DB.store.history.setBuffer(value, true);
                this.DATA_.DB.store.history.set(value);
            };

            AppData.prototype.loadLogFromDB = function () {
            };

            AppData.prototype.saveLogToDB = function (log) {
                this.DATA_.DB.store.log.addBuffer(log);
                this.DATA_.DB.store.log.add(log);
                this.DATA_.DB.store.log.clean();
            };

            AppData.prototype.loadServerFromDB = function () {
            };

            AppData.prototype.saveServerToDB = function (host, state, unsafe_url, expires) {
                if (typeof state === "undefined") { state = 0; }
                if (typeof expires === "undefined") { expires = 0; }
                var value = { id: host || '', state: state };
                this.DATA_.DB.store.server.setBuffer(value);
                this.DATA_.DB.store.server.set(value);
                if (unsafe_url) {
                    this.saveExpiresToDB(unsafe_url, host, expires);
                }
            };
            return AppData;
        })();
        MODEL.AppData = AppData;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.update.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="util.ts"/>
/// <reference path="../view/main.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var App = (function (_super) {
            __extends(App, _super);
            function App(model_, controller_) {
                _super.call(this);
                this.model_ = model_;
                this.controller_ = controller_;
                this.Update = MODEL.AppUpdate;
                this.DATA = new MODEL.AppData(this.model_, this);
                this.landing = MODEL.UTIL.canonicalizeUrl(window.location.href);
                this.recent = { order: [], data: {}, size: 0 };
                this.isScrollPosSavable = true;
            }
            App.prototype.configure = function (option, origURL, destURL) {
                origURL = MODEL.UTIL.canonicalizeUrl(origURL || option.origLocation.href);
                destURL = MODEL.UTIL.canonicalizeUrl(destURL || option.destLocation.href);
                option = option.option || option;

                var scope = option.scope ? jQuery.extend(true, {}, option, this.scope_(option, origURL, destURL) || { disable: true }) : jQuery.extend(true, {}, option);

                var initial = {
                    gns: MODULE.NAME,
                    ns: '',
                    disable: false,
                    area: 'body',
                    link: 'a:not([target])',
                    filter: function () {
                        return /(\/[^.]*|\.html?|\.php)$/.test('/' + this.pathname);
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
                        click: false, submit: false, popstate: false, get: true, post: true, mix: false,
                        limit: 100 /* pages */ , size: 1 * 1024 * 1024 /* 1MB */ , expires: { max: null, min: 5 * 60 * 1000 /* 5min */  }
                    },
                    buffer: {
                        limit: 30,
                        delay: 500
                    },
                    load: {
                        sync: true,
                        head: '',
                        css: false,
                        script: false,
                        execute: true,
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
                        update: { rewrite: {}, cache: {}, redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, render: {}, verify: {}, balance: {} }
                    },
                    param: null,
                    redirect: true,
                    interval: 100,
                    wait: 0,
                    scroll: { delay: 300 },
                    fix: { location: true, history: true, scroll: true, reset: false },
                    fallback: true,
                    database: true,
                    server: {
                        query: 'pjax=1',
                        header: true
                    },
                    speedcheck: false
                }, force = {
                    origLocation: (function (url, a) {
                        a.href = url;
                        return a;
                    })(origURL, document.createElement('a')),
                    destLocation: (function (url, a) {
                        a.href = url;
                        return a;
                    })(destURL, document.createElement('a')),
                    balance: {
                        server: {
                            host: ''
                        }
                    },
                    scroll: { queue: [] },
                    loadtime: null,
                    retriable: true,
                    option: option
                }, compute = function () {
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
                            requestHeader: ['X', nsArray[0].replace(/^\w/, function ($0) {
                                    return $0.toUpperCase();
                                })].join('-')
                        },
                        fix: !/touch|tablet|mobile|phone|android|iphone|ipad|blackberry/i.test(window.navigator.userAgent) ? { location: false, reset: false } : {},
                        contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
                        server: {
                            query: query
                        },
                        timeStamp: new Date().getTime()
                    };
                };

                var setting;
                setting = jQuery.extend(true, initial, scope);
                setting = jQuery.extend(true, setting, setting.balance.self && setting.balance.option, force);
                setting = jQuery.extend(true, setting, compute());

                return setting;
            };

            App.prototype.registrate = function ($context, setting) {
                var _this = this;
                var executed = this.stock('executed');
                setting.load.script && jQuery('script').each(function () {
                    var element = this;
                    if (element.src in executed) {
                        return;
                    }
                    if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) {
                        executed[element.src] = true;
                    }
                });

                new MODULE.VIEW.Main(this.model_, this.controller_, $context).BIND(setting);
                setTimeout(function () {
                    return _this.createHTMLDocument();
                }, 50);
                setTimeout(function () {
                    return _this.DATA.loadBufferAll(setting.buffer.limit);
                }, setting.buffer.delay);
                setting.balance.self && setTimeout(function () {
                    return _this.enableBalance();
                }, setting.buffer.delay);
                setTimeout(function () {
                    return _this.landing = null;
                }, 1500);
            };

            App.prototype.enableBalance = function (host) {
                var setting = this.model_.getActiveSetting();

                if (!setting.balance.client.support.userAgent.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
                    return void this.disableBalance();
                }

                if (Number(!this.DATA.setCookie(setting.balance.client.cookie.balance, '1'))) {
                    return void this.disableBalance();
                }
                if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
                    this.DATA.setCookie(setting.balance.client.cookie.redirect, '1');
                }
                host && this.switchRequestServer(host, setting);
            };

            App.prototype.disableBalance = function () {
                var setting = this.model_.getActiveSetting();

                this.DATA.setCookie(setting.balance.client.cookie.balance, '0');
                this.DATA.setCookie(setting.balance.client.cookie.redirect, '0');
                this.switchRequestServer(null, setting);
            };

            App.prototype.switchRequestServer = function (host, setting) {
                host = host || '';
                setting = setting || this.model_.getActiveSetting();
                this.model_.requestHost = host;
                setting.balance.server.host = host;
                this.DATA.setCookie(setting.balance.client.cookie.host, host);
            };

            App.prototype.chooseRequestServer = function (setting) {
                setting.balance.self && this.enableBalance();
                if (!setting.balance.self || '1' !== this.DATA.getCookie(setting.balance.client.cookie.balance)) {
                    this.disableBalance();
                    return;
                }

                this.DATA.loadBufferAll(setting.buffer.limit);

                var expires;
                var historyBufferData = this.DATA.getBuffer(this.DATA.storeNames.history, this.model_.convertUrlToKeyUrl(setting.destLocation.href));

                expires = historyBufferData && historyBufferData.expires;
                if (expires && expires >= new Date().getTime()) {
                    this.switchRequestServer(historyBufferData.host, setting);
                    return;
                }

                var logBuffer = this.DATA.getBuffer(this.DATA.storeNames.log), timeList = [], logTable = {}, now = new Date().getTime();

                if (!logBuffer) {
                    host = this.DATA.getCookie(setting.balance.client.cookie.host);
                    if (host) {
                        this.enableBalance(host);
                    } else {
                        this.disableBalance();
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
                timeList = timeList.sort(compareNumbers);
                var serverBuffer = this.DATA.getBuffer(this.DATA.storeNames.server), time = timeList.shift();

                if (!serverBuffer) {
                    this.disableBalance();
                    return;
                }
                var host = '', time;
                for (var j = setting.balance.log.limit; time = i-- && timeList.shift();) {
                    host = logTable[time].host.split('//').pop() || '';
                    if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.error) {
                        continue;
                    }
                    if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
                        continue;
                    }
                    this.switchRequestServer(host, setting);
                    return;
                }

                this.disableBalance();
            };

            App.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                areas = areas instanceof Array ? areas : [areas];

                var i = -1, area;
                AREA:
                while (area = areas[++i]) {
                    var options = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                    var j = -1;
                    while (options[++j]) {
                        if (!jQuery(options[j], srcDocument)[0] || !jQuery(options[j], dstDocument)[0]) {
                            continue AREA;
                        }
                    }
                    return area;
                }
            };

            App.prototype.scope_ = function (setting, origURL, destURL, rewriteKeyUrl) {
                if (typeof rewriteKeyUrl === "undefined") { rewriteKeyUrl = ''; }
                var origKeyUrl, destKeyUrl, scpTable = setting.scope, dirs, scpKeys, scpKey, scpTag, patterns, inherit, hit_src, hit_dst, option;

                origKeyUrl = this.model_.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
                destKeyUrl = this.model_.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
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

                    if (!patterns || !patterns[0]) {
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
                            var rewrite = this.scope_.apply(this, [].slice.call(arguments).slice(0, 3).concat([MODEL.UTIL.fire(scpTable.rewrite, null, [destKeyUrl])]));
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
            };

            App.prototype.movePageNormally = function (event) {
                switch (event.type.toLowerCase()) {
                    case 'click':
                        window.location.assign(event.currentTarget.href);
                        break;
                    case 'submit':
                        event.currentTarget.submit();
                        break;
                    case 'popstate':
                        window.location.reload();
                        break;
                }
            };

            App.prototype.createHTMLDocument = function (html) {
                if (typeof html === "undefined") { html = ''; }
                // firefox
                this.createHTMLDocument = function (html) {
                    if (typeof html === "undefined") { html = ''; }
                    return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html, 'text/html');
                };
                if (test(this.createHTMLDocument)) {
                    return this.createHTMLDocument(html);
                }

                // chrome, safari
                this.createHTMLDocument = function (html) {
                    if (typeof html === "undefined") { html = ''; }
                    if (document.implementation && document.implementation.createHTMLDocument) {
                        var doc = document.implementation.createHTMLDocument('');

                        // IE, Operaクラッシュ対策
                        if ('object' === typeof doc.activeElement && doc.activeElement) {
                            doc.open();
                            doc.write(html);
                            doc.close();
                        }
                    }
                    return doc;
                };
                if (test(this.createHTMLDocument)) {
                    return this.createHTMLDocument(html);
                }

                // ie10+, opera
                this.createHTMLDocument = function (html) {
                    if (typeof html === "undefined") { html = ''; }
                    if (document.implementation && document.implementation.createHTMLDocument) {
                        var doc = document.implementation.createHTMLDocument('');
                        var root = document.createElement('html');
                        var attrs = (html.match(/<html([^>]+)>/im) || [0, ''])[1].match(/[\w\-]+\="[^"]*.|[\w\-]+\='[^']*.|\w+/gm) || [];
                        for (var i = 0, attr; attr = attrs[i]; i++) {
                            attr = attr.split('=', 2);
                            doc.documentElement.setAttribute(attr[0], attr[1].slice(1, -1));
                        }
                        root.innerHTML = html.slice(0, html.search(/<\/html>/i)).replace(/^.*?<html[^>]*>/i, '');
                        doc.documentElement.removeChild(doc.head);
                        doc.documentElement.removeChild(doc.body);
                        var element;
                        while (element = root.childNodes[0]) {
                            doc.documentElement.appendChild(element);
                        }
                    }
                    return doc;
                };
                if (test(this.createHTMLDocument)) {
                    return this.createHTMLDocument(html);
                }

                function test(createHTMLDocument) {
                    try  {
                        var doc = createHTMLDocument && createHTMLDocument('<html lang="en" class="html"><head><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>');
                        return doc && jQuery('html', doc).is('.html[lang=en]') && jQuery('head>link', doc)[0].href && jQuery('head>noscript', doc).html() && jQuery('body>noscript', doc).text() === 'noscript' && jQuery('body>a', doc)[0].href;
                    } catch (err) {
                    }
                }
            };

            App.prototype.calAge = function (jqXHR) {
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

            App.prototype.calExpires = function (jqXHR) {
                return new Date().getTime() + this.calAge(jqXHR);
            };
            return App;
        })(MODEL.Template);
        MODEL.App = App;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>
var MODULE;
(function (MODULE) {
    /* MODEL */
    (function (MODEL) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
                this.controller_ = new MODULE.CONTROLLER.Main(this);
                this.app_ = new MODEL.App(this, this.controller_);
                this.state_ = -1 /* wait */;
                this.isDeferrable = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'));
                this.requestHost = '';
            }
            Main.prototype.main_ = function ($context, option) {
                var _this = this;
                var pattern;
                pattern = $context instanceof MODULE.NAMESPACE ? 'm:' : 'f:';
                pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
                switch (pattern.toLowerCase()) {
                    case 'm:object':
                        break;
                    case 'm:undefined':
                        if ($context.is('a, form')) {
                            return $context;
                        }
                        option = {};
                        break;
                    default:
                        return $context;
                }

                var setting = this.app_.configure(option, window.location.href, window.location.href);
                this.setActiveSetting(setting);
                setting.database && this.app_.DATA.opendb(setting);

                this.app_.stock({
                    executed: {},
                    speed: {
                        fire: 0,
                        time: [],
                        name: [],
                        now: function () {
                            return new Date().getTime();
                        }
                    }
                });

                //$context._uuid = setting.uuid;
                if ('pushState' in window.history && window.history['pushState']) {
                    jQuery(function () {
                        _this.app_.registrate($context, setting);
                        _this.state_ = _this.state() === -1 /* wait */ ? 0 /* ready */ : _this.state();
                    });
                }

                return $context;
            };

            Main.prototype.state = function () {
                return this.state_;
            };

            Main.prototype.convertUrlToKeyUrl = function (unsafe_url) {
                return unsafe_url.replace(/#.*/, '');
            };

            Main.prototype.isImmediateLoadable = function (param, setting) {
                if (0 /* ready */ !== this.state()) {
                    return;
                }

                var origURL = MODEL.UTIL.canonicalizeUrl(window.location.href), destURL, event;
                switch (typeof param) {
                    case 'string':
                        event = null;
                        destURL = MODEL.UTIL.canonicalizeUrl(param);
                        break;
                    case 'object':
                        event = param;
                        switch (event.type.toLowerCase()) {
                            case 'click':
                                destURL = MODEL.UTIL.canonicalizeUrl(event.currentTarget.href);
                                break;
                            case 'submit':
                                destURL = MODEL.UTIL.canonicalizeUrl(event.currentTarget.action);
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

                setting = setting || this.app_.configure(this.getActiveSetting(), origLocation.href, destLocation.href);
                if (setting.disable) {
                    return;
                }
                if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) {
                    return false;
                }
                if (!this.app_.chooseArea(setting.area, document, document)) {
                    return false;
                }
                if (!jQuery(event.currentTarget).filter(setting.filter).length) {
                    return false;
                }

                return true;
            };

            Main.prototype.getActiveSetting = function () {
                return this.app_.activeSetting;
            };
            Main.prototype.setActiveSetting = function (setting) {
                return this.app_.activeSetting = setting;
            };

            Main.prototype.getActiveXHR = function () {
                return this.app_.activeXHR;
            };
            Main.prototype.setActiveXHR = function (xhr) {
                this.app_.activeXHR && this.app_.activeXHR.readyState < 4 && this.app_.activeXHR.abort();
                return this.app_.activeXHR = xhr;
            };

            Main.prototype.CLICK = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(this.getActiveSetting(), window.location.href, context.href);

                    if (0 /* ready */ !== this.state() || setting.disable || event.isDefaultPrevented()) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    if (setting.cache.mix && this.getCache(setting.destLocation.href)) {
                        break PROCESS;
                    }
                    setting.database && this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                    var cache;
                    if (setting.cache[event.type.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    new this.app_.Update(this, this.app_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                    event.preventDefault();
                    return;
                }
                ;
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && this.fallback(event, setting);
            };

            Main.prototype.SUBMIT = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var context = event.currentTarget, $context = jQuery(context);
                    var setting = this.app_.configure(this.getActiveSetting(), window.location.href, context.action);

                    if (0 /* ready */ !== this.state() || setting.disable || event.isDefaultPrevented()) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
                    setting.destLocation.href = MODEL.UTIL.canonicalizeUrl(serializedURL);
                    if (setting.cache.mix && this.getCache(setting.destLocation.href)) {
                        break PROCESS;
                    }
                    setting.database && this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                    var cache;
                    if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    new this.app_.Update(this, this.app_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                    event.preventDefault();
                    return;
                }
                ;
                !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && this.fallback(event, setting);
            };

            Main.prototype.POPSTATE = function (event) {
                PROCESS:
                 {
                    event.timeStamp = new Date().getTime();
                    var setting = this.app_.configure(this.getActiveSetting(), null, window.location.href);
                    if (this.app_.landing && this.app_.landing === MODEL.UTIL.canonicalizeUrl(window.location.href)) {
                        return;
                    }
                    if (setting.origLocation.href === setting.destLocation.href) {
                        return;
                    }

                    if (0 /* ready */ !== this.state() || setting.disable) {
                        break PROCESS;
                    }
                    if (!this.isImmediateLoadable(event, setting)) {
                        break PROCESS;
                    }

                    if (setting.origLocation.hash !== setting.destLocation.hash && setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
                        break PROCESS;
                    }

                    setting.database && setting.fix.history && this.app_.DATA.loadTitleFromDB(setting.destLocation.href);

                    var cache;
                    if (setting.cache[event.type.toLowerCase()]) {
                        cache = this.getCache(setting.destLocation.href);
                    }

                    new this.app_.Update(this, this.app_, setting, event, false, cache);
                    return;
                }
                ;
                (!event.originalEvent || setting.gns === event.namespace) && this.fallback(event, setting);
            };

            Main.prototype.SCROLL = function (event, end) {
                var _this = this;
                var setting = this.getActiveSetting();
                if (0 /* ready */ !== this.state() || event.isDefaultPrevented()) {
                    return;
                }

                if (!setting.scroll.delay) {
                    this.app_.isScrollPosSavable && this.app_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                } else {
                    var id;
                    while (id = setting.scroll.queue.shift()) {
                        clearTimeout(id);
                    }
                    id = setTimeout(function () {
                        while (id = setting.scroll.queue.shift()) {
                            clearTimeout(id);
                        }
                        _this.app_.isScrollPosSavable && _this.app_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                    }, setting.scroll.delay);
                    setting.scroll.queue.push(id);
                }
            };

            Main.prototype.fallback = function (event, setting) {
                if ('function' === typeof setting.fallback) {
                    MODEL.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
                } else {
                    this.app_.movePageNormally(event);
                }
            };

            Main.prototype.enable = function () {
                this.state_ = 0 /* ready */;
            };

            Main.prototype.disable = function () {
                this.state_ = 1 /* lock */;
            };

            Main.prototype.getCache = function (unsafe_url) {
                var setting = this.getActiveSetting(), recent = this.app_.recent;
                if (!setting || !recent) {
                    return null;
                }

                var secure_url = this.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));
                unsafe_url = null;

                recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && this.removeCache(secure_url);
                recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && this.removeCache(secure_url);
                return recent.data[secure_url];
            };

            Main.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR, host) {
                var _this = this;
                var setting = this.getActiveSetting(), recent = this.app_.recent;
                if (!setting || !recent) {
                    return this;
                }
                var cache, size, timeStamp, expires;

                var secure_url = this.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));
                unsafe_url = null;

                recent.order.unshift(secure_url);
                for (var i = 1, key; key = recent.order[i]; i++) {
                    if (secure_url === key) {
                        recent.order.splice(i, 1);
                    }
                }

                recent.size > setting.cache.size && this.cleanCache();
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

                    age = jqXHR && _this.app_.calAge(jqXHR) || Number(setting.cache.expires);

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
                    //css: undefined,
                    //script: undefined,
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
                    setting.database && setting.fix.history && this.app_.DATA.saveTitleToDB(secure_url, title);
                }
            };

            Main.prototype.removeCache = function (unsafe_url) {
                var setting = this.getActiveSetting(), recent = this.app_.recent;
                if (!setting || !recent) {
                    return;
                }

                var secure_url = this.convertUrlToKeyUrl(MODEL.UTIL.canonicalizeUrl(unsafe_url));
                unsafe_url = null;

                for (var i = 0, key; key = recent.order[i]; i++) {
                    if (secure_url === key) {
                        recent.order.splice(i, 1);
                        recent.size -= recent.data[key].size;
                        recent.data[key] = null;
                        delete recent.data[key];
                    }
                }
            };

            Main.prototype.clearCache = function () {
                var setting = this.getActiveSetting(), recent = this.app_.recent;
                if (!setting || !recent) {
                    return;
                }
                for (var i = recent.order.length, url; url = recent.order[--i];) {
                    recent.order.splice(i, 1);
                    recent.size -= recent.data[url].size;
                    delete recent.data[url];
                }
            };

            Main.prototype.cleanCache = function () {
                var setting = this.getActiveSetting(), recent = this.app_.recent;
                if (!setting || !recent) {
                    return;
                }
                for (var i = recent.order.length, url; url = recent.order[--i];) {
                    if (i >= setting.cache.limit || url in recent.data && new Date().getTime() > recent.data[url].expires) {
                        recent.order.splice(i, 1);
                        recent.size -= recent.data[url].size;
                        delete recent.data[url];
                    }
                }
            };

            Main.prototype.getRequestDomain = function () {
                return this.requestHost;
            };

            Main.prototype.setRequestDomain = function (host) {
                return this.app_.switchRequestServer(host.split('//').pop(), null);
            };
            return Main;
        })(MODEL.Template);
        MODEL.Main = Main;
    })(MODULE.MODEL || (MODULE.MODEL = {}));
    var MODEL = MODULE.MODEL;
})(MODULE || (MODULE = {}));
/// <reference path="model/main.ts"/>
new MODULE.MODEL.Main();
})(window, window.document, void 0, jQuery);
