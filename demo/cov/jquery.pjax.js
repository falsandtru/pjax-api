/**
 * 
 * jquery.pjax.js
 * 
 * @name jquery.pjax.js
 * @version 2.7.0
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
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;

    

    

    

    
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    /**
    * Model of MVC
    *
    * @class Model
    */
    var ModelTemplate = (function () {
        function ModelTemplate() {
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
            * UUIDを生成する。
            *
            * @method GEN_UUID
            */
            this.GEN_UUID = function () {
                // version 4
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16).toUpperCase();
                });
            };
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
                            this.uuid = MODULE.M.GEN_UUID();
                            stock[this.uuid] = this;
                            return jQuery.extend.apply(jQuery, [true, this].concat([].slice.call(arguments)).concat({ uuid: this.uuid }));
                        case 'string':
                            return delete stock[key];
                    }
                } else if ('object' === typeof key) {
                    // 共有データ操作
                    var keys = key, iKeys;
                    for (iKeys in keys) {
                        MODULE.Model.store(iKeys, keys[iKeys]);
                    }
                } else {
                    switch (arguments.length) {
                        case 0:
                            // `new stock()`にリダイレクト
                            return new this.stock();
                        case 1:
                            // インスタンス別のデータオブジェクトまたは共有データを取得
                            return this.stock[key] || MODULE.Model.store(key);
                        case 2:
                            // 共有データを保存
                            return MODULE.Model.store(key, value);
                        case 3:
                            return MODULE.Model.store(key, value, merge);
                    }
                }
            };
            this.UUID = this.GEN_UUID();
        }
        /**
        * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き変えない。
        *
        * @method MAIN
        */
        ModelTemplate.prototype.MAIN = function (context) {
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
        ModelTemplate.prototype.main_ = function (context) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            this.state_ = 0 /* ready */;
            return context;
        };

        ModelTemplate.store = function store(key, value, merge) {
            switch (arguments.length) {
                case 0:
                    break;
                case 1:
                    // 共有データを取得
                    return MODULE.Model.store[key];
                case 2:
                    // 共有データを設定
                    return MODULE.Model.store[key] = value;
                case 3:
                    return MODULE.Model.store[key] = jQuery.extend(true, MODULE.Model.store[key], value);
            }
        };
        return ModelTemplate;
    })();
    MODULE.ModelTemplate = ModelTemplate;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var AppUpdate = (function () {
        function AppUpdate(APP, setting, event, register, cache) {
            this.checker_ = jQuery();
            this.loadwaits_ = [];
            var speedcheck = setting.speedcheck, speed = MODULE.M.stock('speed');
            speedcheck && (speed.fire = event.timeStamp);
            speedcheck && speed.time.splice(0, 100, 0);
            speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

            var that = this;

            this.APP_ = APP;

            if (MODULE.UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) {
                return;
            }

            setting.scroll.record = false;
            setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

            var activeXHR = MODULE.M.getActiveXHR();
            event = jQuery.extend(true, {}, event);
            this.setting_ = setting;
            this.cache_ = cache;
            this.event_ = event;
            this.register_ = register;

            function done(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(xhrArgs));
            }
            function fail(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));
            }
            function always(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));

                MODULE.M.setActiveXHR(null);
                var data, textStatus, jqXHR;
                if (2 < xhrArgs.length) {
                    that.data_ = xhrArgs[0];
                    that.textStatus_ = xhrArgs[1];
                    that.jqXHR_ = xhrArgs[2];

                    that.update_();
                } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
                    if (setting.balance.self) {
                        that.APP_.DATA.saveServerToDB(setting.balance.server.host, new Date().getTime());
                        that.APP_.disableBalance();
                    }
                    MODULE.M.fallback(event, setting);
                }
            }

            if (cache && cache.jqXHR) {
                // cache
                speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                setting.loadtime = 0;
                MODULE.M.setActiveXHR(null);
                this.data_ = cache.data;
                this.textStatus_ = cache.textStatus;
                this.jqXHR_ = cache.jqXHR;
                if (MODULE.M.isDeferrable) {
                    jQuery.when(jQuery.Deferred().resolve(), that.wait_(MODULE.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(function () {
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
                setting.loadtime = activeXHR.timeStamp;
                var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
                jQuery.when(activeXHR, that.wait_(wait)).done(done).fail(fail).always(always);
            } else {
                // default
                setting.loadtime = event.timeStamp;
                var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};

                this.APP_.chooseRequestServer(setting);
                requestLocation.host = setting.balance.self && MODULE.M.requestHost.split('//').pop() || setting.destLocation.host;
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
                        jqXHR = MODULE.UTIL.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
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
                            setting.server.header.area && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Area', setting.area[0]);
                            setting.server.header.head && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                            setting.server.header.css && jqXHR.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                            setting.server.header.script && jqXHR.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
                        }

                        MODULE.UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, jqXHR, ajaxSetting]);
                    },
                    dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                        return MODULE.UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
                    },
                    success: function (data, textStatus, jqXHR) {
                        that.data_ = data;
                        MODULE.UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, jqXHR]);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        that.errorThrown_ = errorThrown;
                        MODULE.UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, jqXHR, textStatus, errorThrown]);
                    },
                    complete: function (jqXHR, textStatus) {
                        MODULE.UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, jqXHR, textStatus]);

                        MODULE.M.setActiveXHR(null);
                        if (!that.errorThrown_) {
                            if (!MODULE.M.isDeferrable) {
                                that.textStatus_ = textStatus;
                                that.jqXHR_ = jqXHR;
                                that.update_();
                            }
                        } else if (setting.fallback && 'abort' !== textStatus) {
                            if (setting.balance.self) {
                                that.APP_.disableBalance();
                            }
                            MODULE.M.fallback(event, setting);
                        }
                    }
                };

                ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

                activeXHR = MODULE.M.setActiveXHR(jQuery.ajax(ajax));
                jQuery(document).trigger(jQuery.Event(setting.gns + '.request', activeXHR));

                if (MODULE.M.isDeferrable) {
                    jQuery.when(activeXHR, that.wait_(MODULE.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(done).fail(fail).always(always);
                }
            }

            if (MODULE.UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) {
                return;
            }
        }
        AppUpdate.prototype.update_ = function () {
            var _this = this;
            UPDATE:
             {
                var that = this, APP = this.APP_;
                var setting = this.setting_, cache = this.cache_, event = this.event_, register = this.register_, data = this.data_, textStatus = this.textStatus_, jqXHR = this.jqXHR_;
                var callbacks_update = setting.callbacks.update;

                setting.loadtime = setting.loadtime && new Date().getTime() - setting.loadtime;
                setting.loadtime = setting.loadtime < 100 ? 0 : setting.loadtime;

                var speedcheck = setting.speedcheck, speed = MODULE.M.stock('speed');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

                MODULE.M.setActiveSetting(setting);

                if (MODULE.UTIL.fire(callbacks_update.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_, cache]) === false) {
                    break UPDATE;
                }

                if (setting.cache.mix && 'popstate' !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                    return MODULE.M.fallback(event, setting);
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

                        setting.area = APP.chooseAreas(setting.area, srcDocument, dstDocument);
                        setting.area = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                        if (!setting.area) {
                            throw new Error('throw: area notfound');
                        }
                    }
                    ;

                    /* check point */
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

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
                    this.checker_ = jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check');

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

                    if (MODULE.UTIL.fire(callbacks_update.success, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(setting.callback, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                } catch (err) {
                    if (!err) {
                        return;
                    }

                    /* cache delete */
                    cache && MODULE.M.removeCache(setting.destLocation.href);

                    if (MODULE.UTIL.fire(callbacks_update.error, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(callbacks_update.complete, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                        break UPDATE;
                    }
                    MODULE.M.fallback(event, setting);
                }
                ;

                if (MODULE.UTIL.fire(callbacks_update.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                    break UPDATE;
                }
            }
            ;
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

            if (MODULE.UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) {
                return;
            }

            MODULE.M.setCache(setting.destLocation.href, cache && cache.data || null, textStatus, jqXHR);
            cache = MODULE.M.getCache(setting.destLocation.href);
            this.cache_ = cache;

            if (cache && cache.data) {
                var cacheDocument = this.APP_.createHTMLDocument(cache.data), srcDocument = this.srcDocument_;

                srcDocument.title = cacheDocument.title;
                var i = -1, $srcAreas, $dstAreas;
                while (setting.area[++i]) {
                    $srcAreas = jQuery(setting.area[i], cacheDocument).clone();
                    $dstAreas = jQuery(setting.area[i], srcDocument);
                    var j = -1;
                    while ($srcAreas[++j]) {
                        $dstAreas.eq(j).replaceWith($srcAreas.eq(j));
                    }
                }
            }

            if (MODULE.UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) {
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

            if (MODULE.UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
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
                    jQuery[MODULE.M.NAME].enable();
                    switch (event.type.toLowerCase()) {
                        case 'click':
                            return void jQuery[MODULE.M.NAME].click(redirect.href);
                        case 'submit':
                            return void 'GET' === event.currentTarget.method.toUpperCase() ? jQuery[MODULE.M.NAME].click(redirect) : window.location.assign(redirect.href);
                        case 'popstate':
                            window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                            if (register && setting.fix.location) {
                                jQuery[MODULE.M.NAME].disable();
                                window.history.back();
                                window.history.forward();
                                jQuery[MODULE.M.NAME].enable();
                            }
                            return void jQuery(window).trigger('popstate.' + setting.gns);
                    }
            }

            if (MODULE.UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateUrl_ = function () {
            var setting = this.setting_, event = this.event_, register = this.register_;
            var callbacks_update = setting.callbacks.update;

            if (MODULE.UTIL.fire(callbacks_update.url.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
            ;

            register && window.history.pushState(MODULE.UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]), window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title, setting.destLocation.href);

            if (register && setting.fix.location) {
                jQuery[MODULE.M.NAME].disable();
                window.history.back();
                window.history.forward();
                jQuery[MODULE.M.NAME].enable();
            }

            if (MODULE.UTIL.fire(callbacks_update.url.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateTitle_ = function () {
            var setting = this.setting_, event = this.event_;
            var callbacks_update = setting.callbacks.update;

            if (MODULE.UTIL.fire(callbacks_update.title.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
            this.dstDocument_.title = this.srcDocument_.title;
            setting.database && setting.fix.history && this.APP_.DATA.saveTitleToDB(setting.destLocation.href, this.srcDocument_.title);
            if (MODULE.UTIL.fire(callbacks_update.title.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateHead_ = function () {
            var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
            var callbacks_update = setting.callbacks.update;

            if (!setting.load.head) {
                return;
            }

            if (MODULE.UTIL.fire(callbacks_update.head.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
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

            if (MODULE.UTIL.fire(callbacks_update.head.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateContent_ = function () {
            var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
            var callbacks_update = setting.callbacks.update;
            var checker = jQuery(), loadwaits = [];

            if (MODULE.UTIL.fire(callbacks_update.content.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return loadwaits;
            }

            jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check').remove();
            checker = jQuery('<div/>', {
                'class': setting.nss.class4html + '-check',
                'style': 'background: none !important; display: block !important; visibility: hidden !important; position: absolute !important; top: 0 !important; left: 0 !important; z-index: -9999 !important; width: auto !important; height: 0 !important; margin: 0 !important; padding: 0 !important; border: none !important; font-size: 12px !important; text-indent: 0 !important;'
            }).text(setting.gns);
            var i = -1, $srcAreas, $dstAreas;
            while (setting.area[++i]) {
                $srcAreas = jQuery(setting.area[i], srcDocument).clone().find('script').remove().end();
                $dstAreas = jQuery(setting.area[i], dstDocument);
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

            if (MODULE.UTIL.fire(callbacks_update.content.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return loadwaits;
            }

            return loadwaits;
        };

        AppUpdate.prototype.updateScroll_ = function (call) {
            var setting = this.setting_, event = this.event_;
            var callbacks_update = setting.callbacks.update;

            if (MODULE.UTIL.fire(callbacks_update.scroll.before, null, [event, setting.param]) === false) {
                return;
            }

            var scrollX, scrollY;
            switch (event.type.toLowerCase()) {
                case 'click':
                case 'submit':
                    scrollX = call && 'function' === typeof setting.scrollLeft ? MODULE.UTIL.fire(setting.scrollLeft, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollLeft;
                    scrollX = 0 <= scrollX ? scrollX : 0;
                    scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);

                    scrollY = call && 'function' === typeof setting.scrollTop ? MODULE.UTIL.fire(setting.scrollTop, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : setting.scrollTop;
                    scrollY = 0 <= scrollY ? scrollY : 0;
                    scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);

                    (jQuery(window).scrollTop() === scrollY && jQuery(window).scrollLeft() === scrollX) || window.scrollTo(scrollX, scrollY);
                    break;
                case 'popstate':
                    call && setting.fix.scroll && setting.database && setting.scroll.record && this.APP_.DATA.loadScrollPositionFromCacheOrDB(setting.destLocation.href);
                    break;
            }
            call && setting.database && setting.fix.scroll && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, scrollX, scrollY);

            if (MODULE.UTIL.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateCSS_ = function (selector) {
            var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
            var callbacks_update = setting.callbacks.update;

            if (!setting.load.css) {
                return;
            }

            if (MODULE.UTIL.fire(callbacks_update.css.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }

            var css = jQuery(selector, srcDocument).not(jQuery(setting.area.join(','), srcDocument).find(selector)).not(setting.load.ignore), removes = jQuery(selector, dstDocument).not(jQuery(setting.area.join(','), dstDocument).find(selector)).not(setting.load.ignore), adds = [];

            for (var i = 0, element; element = css[i]; i++) {
                element = 'function' === typeof setting.load.rewrite && void MODULE.UTIL.fire(setting.load.rewrite, null, [element]) || element;

                for (var j = 0; removes[j]; j++) {
                    if (MODULE.UTIL.trim(removes[j].href || removes[j].innerHTML || '') === MODULE.UTIL.trim(element.href || element.innerHTML || '')) {
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

            if (MODULE.UTIL.fire(callbacks_update.css.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }

            var speedcheck = setting.speedcheck, speed = MODULE.M.stock('speed');
            speedcheck && speed.time.push(speed.now() - speed.fire);
            speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
        };

        AppUpdate.prototype.updateScript_ = function (selector) {
            var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_;
            var callbacks_update = setting.callbacks.update;

            if (!setting.load.script) {
                return;
            }

            if (MODULE.UTIL.fire(callbacks_update.script.before, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }

            var script = jQuery('script', srcDocument).not(setting.load.ignore), execs = [];

            var executed = this.APP_.stock('executed');
            for (var i = 0, element; element = script[i]; i++) {
                element = 'function' === typeof setting.load.rewrite && void MODULE.UTIL.fire(setting.load.rewrite, null, [element]) || element;

                //element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
                if (!jQuery(element).is(selector)) {
                    continue;
                }
                if (!element.src && !MODULE.UTIL.trim(element.innerHTML)) {
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

            if (MODULE.UTIL.fire(callbacks_update.script.after, null, [event, setting.param, this.data_, this.textStatus_, this.jqXHR_]) === false) {
                return;
            }

            var speedcheck = setting.speedcheck, speed = MODULE.M.stock('speed');
            speedcheck && speed.time.push(speed.now() - speed.fire);
            speedcheck && speed.name.push(('[src][defer]' === selector ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
        };

        AppUpdate.prototype.updateRender_ = function (callback) {
            var _this = this;
            var setting = this.setting_, event = this.event_, checker = this.checker_, loadwaits = this.loadwaits_;

            var callbacks_update = setting.callbacks.update;

            var rendered = function (callback) {
                var speedcheck = setting.speedcheck, speed = MODULE.M.stock('speed');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

                checker.remove();
                setting.scroll.record = true;
                if ('popstate' !== event.type.toLowerCase()) {
                    _this.APP_.scrollByHash(setting.destLocation.hash) || _this.updateScroll_(true);
                    setTimeout(function () {
                        return _this.APP_.scrollByHash(setting.destLocation.hash);
                    }, 50);
                } else {
                    _this.updateScroll_(true);
                }

                jQuery(document).trigger(setting.gns + '.render');
                MODULE.UTIL.fire(callback);

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
                if (MODULE.UTIL.fire(callbacks_update.render.after, null, [event, setting.param]) === false) {
                    return;
                }
            };

            if (MODULE.UTIL.fire(callbacks_update.render.before, null, [event, setting.param]) === false) {
                return;
            }

            var count = 0;
            (function check() {
                switch (true) {
                    case 100 <= count:
                    case MODULE.UTIL.canonicalizeUrl(window.location.href) !== setting.destLocation.href:
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

            if (MODULE.UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]) === false) {
                return;
            }

            // モバイルブラウザでアドレスバーのURLのパーセントエンコーディングの大文字小文字がアンカーと一致しないため揃える必要がある
            if (setting.destLocation.href === MODULE.UTIL.canonicalizeUrl(window.location.href).replace(/(?:%\w{2})+/g, function (str) {
                return String(setting.destLocation.href.match(str.toLowerCase()) || str);
            })) {
                setting.retriable = true;
            } else if (setting.retriable) {
                setting.retriable = false;
                setting.destLocation.href = MODULE.UTIL.canonicalizeUrl(window.location.href);
                new AppUpdate(this.APP_, setting, event, false, setting.cache[event.type.toLowerCase()] && MODULE.M.getCache(setting.destLocation.href));
                throw false;
            } else {
                throw new Error('throw: location mismatch');
            }

            if (MODULE.UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]) === false) {
                return;
            }
        };

        AppUpdate.prototype.updateBalance_ = function () {
            var setting = this.setting_, event = this.event_;
            var callbacks_update = setting.callbacks.update;

            if (!setting.balance.self || !setting.loadtime) {
                return;
            }

            if (MODULE.UTIL.fire(callbacks_update.balance.before, null, [event, setting.param]) === false) {
                return;
            }

            var host = (this.jqXHR_.getResponseHeader(setting.balance.server.header) || '').split('//').pop();
            this.APP_.DATA.saveLogToDB({
                host: host,
                response: setting.loadtime,
                date: new Date().getTime()
            });
            this.APP_.DATA.saveServerToDB(host, 0, setting.destLocation.href, this.APP_.calExpires(this.jqXHR_));
            this.APP_.chooseRequestServer(setting);

            if (MODULE.UTIL.fire(callbacks_update.balance.after, null, [event, setting.param]) === false) {
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
        return AppUpdate;
    })();
    MODULE.AppUpdate = AppUpdate;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    // Deny access
    var M, V, C;

    var ModelUtil = (function (_super) {
        __extends(ModelUtil, _super);
        function ModelUtil() {
            _super.apply(this, arguments);
        }
        ModelUtil.prototype.canonicalizeUrl = function (url) {
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

        ModelUtil.prototype.trim = function (text) {
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

        ModelUtil.prototype.fire = function (fn, context, args, async) {
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
        return ModelUtil;
    })(MODULE.ModelTemplate);
    MODULE.ModelUtil = ModelUtil;

    // 短縮登録
    MODULE.UTIL = new ModelUtil();
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var AppData = (function () {
        function AppData(APP) {
            this.DATA_ = new MODULE.ModelData();
            this.storeNames = this.DATA_.DB.storeNames;
            this.APP_ = APP;
        }
        AppData.prototype.opendb = function (setting) {
            this.DATA_.DB.opendb(setting);
        };

        AppData.prototype.getBuffer = function (storeName, key) {
            return this.DATA_.DB.getBuffer(storeName, key);
        };

        AppData.prototype.setBuffer = function (storeName) {
            return this.DATA_.DB.setBuffer(storeName);
        };

        AppData.prototype.loadBuffer = function (storeName, limit) {
            if (typeof limit === "undefined") { limit = 0; }
            return this.DATA_.DB.loadBuffer(storeName, limit);
        };

        AppData.prototype.saveBuffer = function (storeName) {
            return this.DATA_.DB.saveBuffer(storeName);
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
            var keyUrl = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));

            this.DATA_.DB.loadTitle(keyUrl);
        };

        AppData.prototype.saveTitleToDB = function (unsafe_url, title) {
            var keyUrl = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));

            this.DATA_.DB.saveTitle(keyUrl, title);
        };

        AppData.prototype.loadScrollPositionFromCacheOrDB = function (unsafe_url) {
            var keyUrl = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));

            this.DATA_.DB.loadScrollPosition(keyUrl);
        };

        AppData.prototype.saveScrollPositionToCacheAndDB = function (unsafe_url, scrollX, scrollY) {
            var keyUrl = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));

            this.DATA_.DB.saveScrollPosition(keyUrl, scrollX, scrollY);
        };

        AppData.prototype.loadLogFromDB = function () {
        };

        AppData.prototype.saveLogToDB = function (log) {
            this.DATA_.DB.saveLog(log);
        };

        AppData.prototype.loadServerFromDB = function () {
            this.DATA_.DB.loadServer();
        };

        AppData.prototype.saveServerToDB = function (host, state, unsafe_url, expires) {
            if (typeof state === "undefined") { state = 0; }
            if (typeof expires === "undefined") { expires = 0; }
            this.DATA_.DB.saveServer(host, state);
            if (unsafe_url) {
                var keyUrl = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));
                this.DATA_.DB.saveExpires(keyUrl, host, expires);
            }
        };
        return AppData;
    })();
    MODULE.AppData = AppData;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.update.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var ModelApp = (function (_super) {
        __extends(ModelApp, _super);
        function ModelApp() {
            _super.apply(this, arguments);
            this.DATA = new MODULE.AppData(this);
            this.landing = MODULE.UTIL.canonicalizeUrl(window.location.href);
            this.recent = { order: [], data: {}, size: 0 };
        }
        ModelApp.prototype.configure = function (option, origURL, destURL) {
            origURL = MODULE.UTIL.canonicalizeUrl(origURL || option.origLocation.href);
            destURL = MODULE.UTIL.canonicalizeUrl(destURL || option.destLocation.href);
            option = option.option || option;

            var scope = option.scope ? jQuery.extend(true, {}, option, this.scope_(option, origURL, destURL) || { disable: true }) : jQuery.extend(true, {}, option);

            var initial = {
                gns: MODULE.M.NAME,
                ns: '',
                disable: false,
                area: 'body',
                link: 'a:not([target])',
                filter: function () {
                    return /(\/[^.]*|\.html?|\.php)$/.test('/' + this.pathname);
                },
                form: null,
                scope: null,
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
                    ajax: { dataType: 'script', cache: true },
                    rewrite: null
                },
                balance: {
                    self: false,
                    weight: 3,
                    client: {
                        support: /chrome|firefox|safari/i,
                        exclude: /msie|trident|mobile|phone|android|iphone|ipad|blackberry/i,
                        cookie: 'balanceable'
                    },
                    server: {
                        header: 'X-Ajax-Host',
                        preclude: 10 * 60 * 1000
                    },
                    log: {
                        expires: 1.5 * 24 * 60 * 60 * 1000,
                        limit: 10
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
                    update: { redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, cache: {}, render: {}, verify: {}, balance: {} }
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
                scroll: { record: true, queue: [] },
                loadtime: null,
                retriable: true,
                option: option
            }, compute = function () {
                var nsArray = [setting.gns || MODULE.M.NAME].concat(setting.ns && String(setting.ns).split('.') || []);
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

        ModelApp.prototype.registrate = function ($context, setting) {
            var _this = this;
            var executed = this.stock('executed');
            setting.load.script && jQuery('script').each(function () {
                var element = this;
                element = 'function' === typeof setting.load.rewrite ? MODULE.UTIL.fire(setting.load.rewrite, null, [element.cloneNode(true)]) || element : element;
                if (element.src in executed) {
                    return;
                }
                if (element.src && (!setting.load.reload || !jQuery(element).is(setting.load.reload))) {
                    executed[element.src] = true;
                }
            });

            new MODULE.View($context).BIND(setting);
            setTimeout(function () {
                return _this.createHTMLDocument();
            }, 50);
            setTimeout(function () {
                return _this.DATA.loadBufferAll(setting.buffer.limit);
            }, setting.buffer.delay);
            setTimeout(function () {
                return setting.balance.self && _this.enableBalance();
            }, setting.buffer.delay);
            setTimeout(function () {
                return _this.landing = null;
            }, 1500);
        };

        ModelApp.prototype.chooseRequestServer = function (setting) {
            if (setting.balance.self && !~document.cookie.indexOf(setting.balance.client.cookie + '=1')) {
                this.enableBalance();
            }
            if (!setting.balance.self || !~document.cookie.indexOf(setting.balance.client.cookie + '=1')) {
                this.disableBalance();
                return;
            }

            this.DATA.loadBufferAll(setting.buffer.limit);

            var expires;
            var historyBufferData = this.DATA.getBuffer(this.DATA.storeNames.history, MODULE.M.convertUrlToKeyUrl(setting.destLocation.href));

            expires = historyBufferData && historyBufferData.expires;
            if (expires && expires >= new Date().getTime()) {
                MODULE.M.requestHost = historyBufferData.host;
                setting.balance.server.host = historyBufferData.host;
                return;
            }

            var logBuffer = this.DATA.getBuffer(this.DATA.storeNames.log), timeList = [], logTable = {}, now = new Date().getTime();

            if (!logBuffer) {
                this.disableBalance();
                return;
            }
            for (var i in logBuffer) {
                if (now > logBuffer[i].date + setting.balance.log.expires) {
                    continue;
                }
                timeList.push(logBuffer[i].response);
                logTable[logBuffer[i].response] = logBuffer[i];
            }

            function compareNumbers(a, b) {
                return a - b;
            }
            timeList = timeList.sort(compareNumbers);
            var serverBuffer = this.DATA.getBuffer(this.DATA.storeNames.server), time = timeList.shift();

            MODULE.M.requestHost = '';
            if (!serverBuffer) {
                this.disableBalance();
                return;
            }
            var host = '', time;
            for (var j = setting.balance.log.limit; time = i-- && timeList.shift();) {
                host = logTable[time].host.split('//').pop() || '';
                if (!serverBuffer[host] || serverBuffer[host].state && new Date().getTime() < serverBuffer[host].state + setting.balance.server.preclude) {
                    continue;
                }
                if (!host && setting.balance.weight && !(Math.floor(Math.random()) * setting.balance.weight)) {
                    continue;
                }
                MODULE.M.requestHost = host;
                setting.balance.server.host = host;
                return;
            }
            this.disableBalance();
        };

        ModelApp.prototype.enableBalance = function () {
            var setting = MODULE.M.getActiveSetting();

            if (!setting.balance.client.support.test(window.navigator.userAgent) || setting.balance.client.exclude.test(window.navigator.userAgent)) {
                return;
            }

            document.cookie = setting.balance.client.cookie + '=1';
            if (!~document.cookie.indexOf(setting.balance.client.cookie + '=1') || !setting.database) {
                return void this.disableBalance();
            }
        };

        ModelApp.prototype.disableBalance = function () {
            var setting = MODULE.M.getActiveSetting();

            MODULE.M.requestHost = '';
            document.cookie = setting.balance.client.cookie + '=0';
        };

        ModelApp.prototype.chooseAreas = function (areas, srcDocument, dstDocument) {
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

        ModelApp.prototype.scope_ = function (setting, origURL, destURL, rewriteKeyUrl) {
            if (typeof rewriteKeyUrl === "undefined") { rewriteKeyUrl = ''; }
            var origKeyUrl, destKeyUrl, scp = setting.scope, dirs, keys, key, pattern, not, reg, rewrite, inherit, hit_src, hit_dst, option;

            origKeyUrl = MODULE.M.convertUrlToKeyUrl(origURL).match(/.+?\w(\/.*)/).pop();
            destKeyUrl = MODULE.M.convertUrlToKeyUrl(destURL).match(/.+?\w(\/.*)/).pop();
            rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');

            keys = (rewriteKeyUrl || destKeyUrl).replace(/^\/|\/$/g, '').split('/');
            if (rewriteKeyUrl) {
                if (!~rewriteKeyUrl.indexOf('*')) {
                    return undefined;
                }
                dirs = [];
                var arr = origKeyUrl.replace(/^\/|\/$/g, '').split('/');
                for (var i = 0, len = keys.length; i < len; i++) {
                    '*' === keys[i] && dirs.push(arr[i]);
                }
            }

            for (var i = keys.length + 1; i--;) {
                rewrite = inherit = option = hit_src = hit_dst = undefined;
                key = keys.slice(0, i).join('/');
                key = '/' + key + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(key.length + 1) ? '/' : '');

                if (!key || !(key in scp)) {
                    continue;
                }

                if ('string' === typeof scp[key]) {
                    scp[key] = scp[scp[key]];
                }
                if (!scp[key] || !scp[key].length) {
                    return false;
                }

                for (var j = 0; pattern = scp[key][j]; j++) {
                    if (hit_src === false || hit_dst === false) {
                        break;
                    } else if ('rewrite' === pattern && 'function' === typeof scp.rewrite && !rewriteKeyUrl) {
                        rewrite = this.scope_.apply(this, [].slice.call(arguments).slice(0, 3).concat([MODULE.UTIL.fire(scp.rewrite, null, [destKeyUrl])]));
                        if (rewrite) {
                            hit_src = hit_dst = true;
                            break;
                        } else if (false === rewrite) {
                            return false;
                        }
                    } else if ('inherit' === pattern) {
                        inherit = true;
                    } else if ('string' === typeof pattern) {
                        not = '!' === pattern.charAt(0);
                        pattern = not ? pattern.slice(1) : pattern;
                        reg = '*' === pattern.charAt(0);
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
                                if (scp['$' + pattern]) {
                                    option = scp['$' + pattern];
                                }
                            }
                        }
                    } else if ('object' === typeof pattern) {
                        option = pattern;
                    }
                }

                if (hit_src && hit_dst) {
                    return jQuery.extend(true, {}, setting, ('object' === typeof rewrite ? rewrite : option) || {});
                }
                if (inherit) {
                    continue;
                }
                break;
            }
        };

        ModelApp.prototype.scrollByHash = function (hash) {
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

        ModelApp.prototype.movePageNormally = function (event) {
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

        ModelApp.prototype.createHTMLDocument = function (html) {
            if (typeof html === "undefined") { html = ''; }
            // chrome, firefox
            this.createHTMLDocument = function (html) {
                if (typeof html === "undefined") { html = ''; }
                return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html, 'text/html');
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

            // msafari
            this.createHTMLDocument = function (html) {
                if (typeof html === "undefined") { html = ''; }
                if (document.implementation && document.implementation.createHTMLDocument) {
                    var doc = document.implementation.createHTMLDocument('');
                    if ('object' === typeof doc.activeElement) {
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

            function test(createHTMLDocument) {
                try  {
                    var doc = createHTMLDocument && createHTMLDocument('<html lang="en" class="html"><head><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript></body></html>');
                    return doc && jQuery('html', doc).is('.html[lang=en]') && jQuery('head>noscript', doc).html() && jQuery('body>noscript', doc).text() === 'noscript';
                } catch (err) {
                }
            }
        };

        ModelApp.prototype.calAge = function (jqXHR) {
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

        ModelApp.prototype.calExpires = function (jqXHR) {
            return new Date().getTime() + this.calAge(jqXHR);
        };
        return ModelApp;
    })(MODULE.ModelTemplate);
    MODULE.ModelApp = ModelApp;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataStore = (function () {
        function DataStore(DB) {
            var _this = this;
            this.buffer_ = [];
            this.accessStore = function (mode) {
                if (typeof mode === "undefined") { mode = 'readwrite'; }
                var database = _this.DB_.database_;
                if (database && database.transaction && database.objectStoreNames) {
                    var objectStoreNames = database.objectStoreNames;
                    for (var i in objectStoreNames) {
                        if (objectStoreNames[i] !== _this.name) {
                            continue;
                        }
                        return database.transaction(_this.name, mode).objectStore(_this.name);
                    }
                }
            };
            this.accessRecord = function (key, success) {
                var store = _this.accessStore();
                if (!store) {
                    return;
                }

                store.get(key).onsuccess = success;
            };
            this.DB_ = DB;
        }
        DataStore.prototype.loadBuffer = function (limit) {
            var that = this, store = this.accessStore();
            if (!store) {
                return;
            }

            var index = store.indexNames.length ? store.indexNames[0] : store.keyPath;
            store.index(index).openCursor(this.DB_.IDBKeyRange.lowerBound(0), 'prev').onsuccess = function () {
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
        };

        DataStore.prototype.saveBuffer = function () {
        };

        DataStore.prototype.getBuffer = function (key) {
            return key ? this.buffer_[key] : this.buffer_;
        };

        DataStore.prototype.setBuffer = function (key, value, isMerge) {
            this.buffer_[key] = !isMerge ? value : jQuery.extend(true, {}, this.buffer_[key], value);
            return this.buffer_[key];
        };

        DataStore.prototype.addBuffer = function (value) {
            value[this.keyPath] = this.buffer_.length || 1;
            this.buffer_.push(value);
            return value;
        };

        DataStore.prototype.add = function (value) {
            var store = this.accessStore();
            if (!store) {
                return;
            }

            delete value[this.keyPath];
            store.add(value);
        };

        DataStore.prototype.put = function (value) {
            this.accessRecord(value[this.keyPath], function () {
                this.source.put(jQuery.extend(true, {}, this.result, value));
            });
        };

        DataStore.prototype.get = function (key, success) {
            var store = this.accessStore();
            if (!store) {
                return;
            }

            store.get(key).onsuccess = success;
        };
        return DataStore;
    })();
    MODULE.DataStore = DataStore;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataStoreMeta = (function (_super) {
        __extends(DataStoreMeta, _super);
        function DataStoreMeta() {
            _super.apply(this, arguments);
            this.name = 'meta';
            this.keyPath = 'id';
        }
        return DataStoreMeta;
    })(MODULE.DataStore);
    MODULE.DataStoreMeta = DataStoreMeta;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataStoreHistory = (function (_super) {
        __extends(DataStoreHistory, _super);
        function DataStoreHistory() {
            _super.apply(this, arguments);
            this.name = 'history';
            this.keyPath = 'id';
        }
        DataStoreHistory.prototype.clean = function () {
            var that = this, store = this.accessStore();
            if (!store) {
                return;
            }

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
        };
        return DataStoreHistory;
    })(MODULE.DataStore);
    MODULE.DataStoreHistory = DataStoreHistory;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataStoreLog = (function (_super) {
        __extends(DataStoreLog, _super);
        function DataStoreLog() {
            _super.apply(this, arguments);
            this.name = 'log';
            this.keyPath = 'id';
        }
        DataStoreLog.prototype.clean = function () {
            var that = this, store = this.accessStore(), size = 50;
            if (!store) {
                return;
            }

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
        };
        return DataStoreLog;
    })(MODULE.DataStore);
    MODULE.DataStoreLog = DataStoreLog;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataStoreServer = (function (_super) {
        __extends(DataStoreServer, _super);
        function DataStoreServer() {
            _super.apply(this, arguments);
            this.name = 'server';
            this.keyPath = 'id';
        }
        return DataStoreServer;
    })(MODULE.DataStore);
    MODULE.DataStoreServer = DataStoreServer;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.log.ts"/>
/// <reference path="data.store.server.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M
    // Deny access
    var V, C;

    var DataDB = (function () {
        function DataDB() {
            this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
            this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
            this.name_ = MODULE.NAME;
            this.version_ = 3;
            this.retry_ = 0;
            this.store_ = {
                meta: new MODULE.DataStoreMeta(this),
                history: new MODULE.DataStoreHistory(this),
                log: new MODULE.DataStoreLog(this),
                server: new MODULE.DataStoreServer(this)
            };
            this.storeNames = {
                meta: this.store_.meta.name,
                history: this.store_.history.name,
                log: this.store_.log.name,
                server: this.store_.server.name
            };
            this.metaNames = {
                version: 'version'
            };
        }
        DataDB.prototype.opendb = function (setting) {
            var that = this;

            setting.database = false;
            if (!that.IDBFactory) {
                return;
            }

            try  {
                var days = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)), version = parseInt(days - days % 10 + that.version_ + '', 10);

                var request = that.IDBFactory.open(that.name_);

                request.onblocked = function () {
                };

                request.onupgradeneeded = function () {
                    var database = this.result;
                    try  {
                        for (var i = database.objectStoreNames ? database.objectStoreNames.length : 0; i--;) {
                            database.deleteObjectStore(database.objectStoreNames[i]);
                        }

                        database.createObjectStore(that.store_.meta.name, { keyPath: that.store_.meta.keyPath, autoIncrement: false }).createIndex(that.store_.meta.keyPath, that.store_.meta.keyPath, { unique: true });

                        database.createObjectStore(that.store_.history.name, { keyPath: that.store_.history.keyPath, autoIncrement: false }).createIndex('date', 'date', { unique: false });

                        database.createObjectStore(that.store_.log.name, { keyPath: that.store_.log.keyPath, autoIncrement: true }).createIndex('date', 'date', { unique: false });

                        database.createObjectStore(that.store_.server.name, { keyPath: that.store_.server.keyPath, autoIncrement: false }).createIndex(that.store_.server.keyPath, that.store_.server.keyPath, { unique: true });
                    } catch (err) {
                        3 > that.retry_++ && setTimeout(function () {
                            return that.initdb_(setting);
                        }, 1000);
                    }
                };

                request.onsuccess = function () {
                    try  {
                        var database = this.result;
                        that.database_ = database;

                        that.checkdb_(setting, version, function () {
                            that.saveTitle(MODULE.M.convertUrlToKeyUrl(setting.origLocation.href), document.title);
                            that.saveScrollPosition(MODULE.M.convertUrlToKeyUrl(setting.origLocation.href), jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                        });
                    } catch (err) {
                        3 > that.retry_++ && setTimeout(function () {
                            return that.initdb_(setting);
                        }, 'number' === typeof err ? err : 1000);
                    }
                };

                request.onerror = function (event) {
                    3 > that.retry_++ && setTimeout(function () {
                        return that.initdb_(setting);
                    }, 1000);
                };
            } catch (err) {
                3 > that.retry_++ && setTimeout(function () {
                    return that.initdb_(setting);
                }, 1000);
            }
        };

        DataDB.prototype.closedb = function () {
            var database = this.database_;
            database && database.close && database.close();
        };

        DataDB.prototype.deletedb = function () {
            this.closedb();
            var IDBFactory = this.IDBFactory;
            IDBFactory && IDBFactory.deleteDatabase && IDBFactory.deleteDatabase(this.name_);
        };

        DataDB.prototype.initdb_ = function (setting) {
            this.deletedb();
            this.opendb(setting);
        };

        DataDB.prototype.checkdb_ = function (setting, version, success) {
            var that = this;
            if (!that.accessStore(that.store_.meta.name)) {
                throw 0;
            }

            this.accessRecord(this.store_.meta.name, this.metaNames.version, function () {
                // version check
                var data = this.result;
                if (!data) {
                    this.source.put({ id: that.metaNames.version, value: version });
                } else if (version !== data.value) {
                    return that.initdb_(setting);
                }

                // store check
                var storeHistory = that.accessStore(that.store_.history.name);
                if (!storeHistory) {
                    3 > that.retry_++ && setTimeout(function () {
                        return that.initdb_(setting);
                    }, 1000);
                }

                success();

                setting.database = true;
            });
        };

        DataDB.prototype.accessStore = function (name, mode) {
            if (typeof mode === "undefined") { mode = 'readwrite'; }
            return this.store_[name].accessStore();
        };

        DataDB.prototype.accessRecord = function (storeName, key, success) {
            return this.store_[storeName].accessRecord(key, success);
        };

        DataDB.prototype.getBuffer = function (storeName, key) {
            if (storeName && this.store_[storeName]) {
                return this.store_[storeName].getBuffer(key);
            }
        };

        DataDB.prototype.setBuffer = function (storeName) {
            if (storeName && this.store_[storeName]) {
                return this.store_[storeName].setBuffer();
            }
        };

        DataDB.prototype.loadBuffer = function (storeName, limit) {
            if (typeof limit === "undefined") { limit = 0; }
            if (storeName && this.store_[storeName]) {
                this.store_[storeName].loadBuffer(limit);
            }
        };

        DataDB.prototype.saveBuffer = function (storeName) {
            if (storeName && this.store_[storeName]) {
                this.store_[storeName].saveBuffer();
            }
        };

        DataDB.prototype.loadTitle = function (keyUrl) {
            var data = this.store_.history.getBuffer(keyUrl);

            if (data && 'string' === typeof data.title) {
                document.title = data.title;
            } else {
                this.store_.history.get(keyUrl, function () {
                    keyUrl === MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(window.location.href)) && this.result && this.result.title && (document.title = this.result.title);
                });
            }
        };

        DataDB.prototype.saveTitle = function (keyUrl, title) {
            var value = { id: keyUrl, title: title, date: new Date().getTime() };
            this.store_.history.setBuffer(keyUrl, value, true);
            this.store_.history.put(value);
            this.store_.history.clean();
        };

        DataDB.prototype.loadScrollPosition = function (keyUrl) {
            var data = this.store_.history.getBuffer(keyUrl);

            if (data && 'number' === typeof data.scrollX) {
                window.scrollTo(parseInt(Number(data.scrollX) + '', 10), parseInt(Number(data.scrollY) + '', 10));
            } else {
                this.store_.history.get(keyUrl, function () {
                    if (!this.result || keyUrl !== this.result.id) {
                        return;
                    }
                    isFinite(this.result.scrollX) && isFinite(this.result.scrollY) && window.scrollTo(parseInt(Number(this.result.scrollX) + '', 10), parseInt(Number(this.result.scrollY) + '', 10));
                });
            }
        };

        DataDB.prototype.saveScrollPosition = function (keyUrl, scrollX, scrollY) {
            var value = { id: keyUrl, scrollX: scrollX, scrollY: scrollY, date: new Date().getTime() };
            this.store_.history.setBuffer(keyUrl, value, true);
            this.store_.history.put(value);
        };

        DataDB.prototype.loadExpires = function (keyUrl) {
        };

        DataDB.prototype.saveExpires = function (keyUrl, host, expires) {
            var value = { id: keyUrl, host: host, expires: expires };
            this.store_.history.setBuffer(keyUrl, value, true);
            this.store_.history.put(value);
        };

        DataDB.prototype.loadLog = function () {
        };

        DataDB.prototype.saveLog = function (log) {
            this.store_.log.addBuffer(log);
            this.store_.log.add(log);
            this.store_.log.clean();
        };

        DataDB.prototype.loadServer = function () {
        };

        DataDB.prototype.saveServer = function (host, state) {
            var value = { id: host || '', state: state };
            this.store_.server.setBuffer(host, value);
            this.store_.server.put(value);
        };
        return DataDB;
    })();
    MODULE.DataDB = DataDB;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    // Deny access
    var M, V, C;

    var ModelData = (function () {
        function ModelData() {
            this.DB = new MODULE.DataDB();
        }
        return ModelData;
    })();
    MODULE.ModelData = ModelData;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="util.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M, C
    // Deny access
    var V;

    var ModelMain = (function (_super) {
        __extends(ModelMain, _super);
        function ModelMain() {
            _super.apply(this, arguments);
            this.state = -1 /* wait */;
            this.isDeferrable = jQuery.when && 1.06 <= Number(jQuery().jquery.replace(/\D*(\d+)\.(\d+).*$/, '$1.0$2').replace(/\d+(\d{2})$/, '$1'));
            this.requestHost = '';
            this.APP_ = new MODULE.ModelApp();
        }
        ModelMain.prototype.main_ = function ($context, option) {
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

            var setting = this.APP_.configure(option, window.location.href, window.location.href);
            MODULE.M.setActiveSetting(setting);
            setting.database && this.APP_.DATA.opendb(setting);

            this.APP_.stock({
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
                    _this.APP_.registrate($context, setting);
                    MODULE.M.state_ = ~MODULE.M.state_ ? MODULE.M.state_ : 0 /* ready */;
                });
            }

            return $context;
        };

        ModelMain.prototype.convertUrlToKeyUrl = function (unsafe_url) {
            return unsafe_url.replace(/#.*/, '');
        };

        ModelMain.prototype.isImmediateLoadable = function (param) {
            if (MODULE.M.state_ !== 0 /* ready */) {
                return;
            }

            var origURL = MODULE.UTIL.canonicalizeUrl(window.location.href), destURL, event;
            switch (typeof param) {
                case 'string':
                    event = null;
                    destURL = MODULE.UTIL.canonicalizeUrl(param);
                    break;
                case 'object':
                    event = param;
                    switch (event.type.toLowerCase()) {
                        case 'click':
                            destURL = MODULE.UTIL.canonicalizeUrl(event.currentTarget.href);
                            break;
                        case 'submit':
                            destURL = MODULE.UTIL.canonicalizeUrl(event.currentTarget.action);
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

            var setting = this.APP_.configure(MODULE.M.getActiveSetting(), origLocation.href, destLocation.href);
            if (setting.disable) {
                return;
            }
            if (destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) {
                return false;
            }
            setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, origLocation.href, destLocation.href]);
            setting.area = setting.area instanceof Array ? setting.area : [setting.area];
            if (!jQuery(event.currentTarget).filter(setting.filter).length) {
                return false;
            }
            if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) {
                return false;
            }

            return true;
        };

        ModelMain.prototype.getActiveSetting = function () {
            return this.APP_.activeSetting;
        };
        ModelMain.prototype.setActiveSetting = function (setting) {
            return this.APP_.activeSetting = setting;
        };

        ModelMain.prototype.getActiveXHR = function () {
            return this.APP_.activeXHR;
        };
        ModelMain.prototype.setActiveXHR = function (xhr) {
            this.APP_.activeXHR && this.APP_.activeXHR.readyState < 4 && this.APP_.activeXHR.abort();
            return this.APP_.activeXHR = xhr;
        };

        ModelMain.prototype.CLICK = function (event) {
            PROCESS:
             {
                event.timeStamp = new Date().getTime();
                var context = event.currentTarget, $context = jQuery(context);
                var setting = this.APP_.configure(MODULE.M.getActiveSetting(), window.location.href, context.href);

                if (MODULE.M.state_ !== 0 /* ready */ || setting.disable || event.isDefaultPrevented()) {
                    break PROCESS;
                }
                if (!MODULE.M.isImmediateLoadable(event)) {
                    break PROCESS;
                }

                if (setting.cache.mix && MODULE.M.getCache(setting.destLocation.href)) {
                    break PROCESS;
                }
                setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
                setting.area = setting.area instanceof Array ? setting.area : [setting.area];
                setting.database && setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                var cache;
                if (setting.cache[event.type.toLowerCase()]) {
                    cache = MODULE.M.getCache(setting.destLocation.href);
                }

                new MODULE.AppUpdate(this.APP_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                event.preventDefault();
                return;
            }
            ;
            !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && MODULE.M.fallback(event, setting);
        };

        ModelMain.prototype.SUBMIT = function (event) {
            PROCESS:
             {
                event.timeStamp = new Date().getTime();
                var context = event.currentTarget, $context = jQuery(context);
                var setting = this.APP_.configure(MODULE.M.getActiveSetting(), window.location.href, context.action);

                if (MODULE.M.state_ !== 0 /* ready */ || setting.disable || event.isDefaultPrevented()) {
                    break PROCESS;
                }
                if (!MODULE.M.isImmediateLoadable(event)) {
                    break PROCESS;
                }

                var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + ('GET' === context.method.toUpperCase() ? '?' + jQuery(context).serialize() : '');
                setting.destLocation.href = MODULE.UTIL.canonicalizeUrl(serializedURL);
                if (setting.cache.mix && MODULE.M.getCache(setting.destLocation.href)) {
                    break PROCESS;
                }
                setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
                setting.area = setting.area instanceof Array ? setting.area : [setting.area];
                if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) {
                    break PROCESS;
                }
                setting.database && setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(setting.destLocation.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                var cache;
                if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) {
                    cache = MODULE.M.getCache(setting.destLocation.href);
                }

                new MODULE.AppUpdate(this.APP_, setting, event, setting.destLocation.href !== setting.origLocation.href, cache);
                event.preventDefault();
                return;
            }
            ;
            !event.originalEvent && !event.isDefaultPrevented() && !jQuery(document).has(context)[0] && MODULE.M.fallback(event, setting);
        };

        ModelMain.prototype.POPSTATE = function (event) {
            PROCESS:
             {
                event.timeStamp = new Date().getTime();
                var setting = this.APP_.configure(MODULE.M.getActiveSetting(), null, window.location.href);
                if (this.APP_.landing && this.APP_.landing === MODULE.UTIL.canonicalizeUrl(window.location.href)) {
                    return;
                }
                if (setting.origLocation.href === setting.destLocation.href) {
                    return;
                }

                if (MODULE.M.state_ !== 0 /* ready */ || setting.disable) {
                    break PROCESS;
                }

                if (setting.origLocation.hash !== setting.destLocation.hash && setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search) {
                    break PROCESS;
                }

                setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
                setting.area = setting.area instanceof Array ? setting.area : [setting.area];
                if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) {
                    break PROCESS;
                }

                setting.database && setting.fix.history && this.APP_.DATA.loadTitleFromDB(setting.destLocation.href);

                var cache;
                if (setting.cache[event.type.toLowerCase()]) {
                    cache = MODULE.M.getCache(setting.destLocation.href);
                }

                new MODULE.AppUpdate(this.APP_, setting, event, false, cache);
                return;
            }
            ;
            (!event.originalEvent || setting.gns === event.namespace) && MODULE.M.fallback(event, setting);
        };

        ModelMain.prototype.SCROLL = function (event, end) {
            var _this = this;
            var setting = MODULE.M.getActiveSetting();
            if (MODULE.M.state_ !== 0 /* ready */ || event.isDefaultPrevented()) {
                return;
            }

            if (!setting.scroll.delay) {
                setting.scroll.record && this.APP_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
            } else {
                var id;
                while (id = setting.scroll.queue.shift()) {
                    clearTimeout(id);
                }
                id = setTimeout(function () {
                    while (id = setting.scroll.queue.shift()) {
                        clearTimeout(id);
                    }
                    setting.scroll.record && _this.APP_.DATA.saveScrollPositionToCacheAndDB(window.location.href, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                }, setting.scroll.delay);
                setting.scroll.queue.push(id);
            }
        };

        ModelMain.prototype.fallback = function (event, setting) {
            if ('function' === typeof setting.fallback) {
                MODULE.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
            } else {
                this.APP_.movePageNormally(event);
            }
        };

        ModelMain.prototype.enable = function () {
            MODULE.M.state_ = 0 /* ready */;
        };

        ModelMain.prototype.disable = function () {
            MODULE.M.state_ = 1 /* lock */;
        };

        ModelMain.prototype.getCache = function (unsafe_url) {
            var setting = MODULE.M.getActiveSetting(), recent = this.APP_.recent;
            if (!setting || !recent) {
                return null;
            }

            var secure_url = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));
            unsafe_url = null;

            recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && MODULE.M.removeCache(secure_url);
            recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].jqXHR && MODULE.M.removeCache(secure_url);
            return recent.data[secure_url];
        };

        ModelMain.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR) {
            var _this = this;
            var setting = MODULE.M.getActiveSetting(), recent = this.APP_.recent;
            if (!setting || !recent) {
                return this;
            }
            var cache, size, timeStamp, expires;

            var secure_url = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));
            unsafe_url = null;

            recent.order.unshift(secure_url);
            for (var i = 1, key; key = recent.order[i]; i++) {
                if (secure_url === key) {
                    recent.order.splice(i, 1);
                }
            }

            recent.size > setting.cache.size && MODULE.M.cleanCache();
            cache = MODULE.M.getCache(secure_url);
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

                age = jqXHR && _this.APP_.calAge(jqXHR) || Number(setting.cache.expires);

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
                timeStamp: timeStamp
            });
            if (!recent.data[secure_url].data && !recent.data[secure_url].jqXHR) {
                MODULE.M.removeCache(secure_url);
            }
            if (jqXHR || cache && cache.jqXHR) {
                var title = ((jqXHR || cache && cache.jqXHR).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
                setting.database && setting.fix.history && this.APP_.DATA.saveTitleToDB(secure_url, title);
            }
        };

        ModelMain.prototype.removeCache = function (unsafe_url) {
            var setting = MODULE.M.getActiveSetting(), recent = this.APP_.recent;
            if (!setting || !recent) {
                return;
            }

            var secure_url = MODULE.M.convertUrlToKeyUrl(MODULE.UTIL.canonicalizeUrl(unsafe_url));
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

        ModelMain.prototype.clearCache = function () {
            var setting = MODULE.M.getActiveSetting(), recent = this.APP_.recent;
            if (!setting || !recent) {
                return;
            }
            for (var i = recent.order.length, url; url = recent.order[--i];) {
                recent.order.splice(i, 1);
                recent.size -= recent.data[url].size;
                delete recent.data[url];
            }
        };

        ModelMain.prototype.cleanCache = function () {
            var setting = MODULE.M.getActiveSetting(), recent = this.APP_.recent;
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

        ModelMain.prototype.getRequestDomain = function () {
            return MODULE.M.requestHost;
        };

        ModelMain.prototype.setRequestDomain = function (host) {
            return MODULE.M.requestHost = host.split('//').pop() || '';
        };
        return ModelMain;
    })(MODULE.ModelTemplate);
    MODULE.ModelMain = ModelMain;

    // 短縮登録
    MODULE.Model = ModelMain;
    MODULE.M = new MODULE.Model();
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    /**
    * @class Controller
    */
    var ControllerTemplate = (function () {
        function ControllerTemplate() {
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
            this.UUID = MODULE.M.GEN_UUID();

            // プラグインに関数を設定してネームスペースに登録
            // $.mvc.func, $().mvc.funcとして実行できるようにするための処理
            if (MODULE.M.NAMESPACE && MODULE.M.NAMESPACE == MODULE.M.NAMESPACE.window) {
                MODULE.M.NAMESPACE[MODULE.M.NAME] = this.EXEC;
            } else {
                MODULE.M.NAMESPACE[MODULE.M.NAME] = MODULE.M.NAMESPACE.prototype[MODULE.M.NAME] = this.EXEC;
            }

            var f = 'function' === typeof MODULE.ControllerFunction && new MODULE.ControllerFunction() || MODULE.ControllerFunction;

            // コンテクストに関数を設定
            this.REGISTER_FUNCTIONS(MODULE.M.NAMESPACE[MODULE.M.NAME], f);

            // コンテクストのプロパティを更新
            this.UPDATE_PROPERTIES(MODULE.M.NAMESPACE[MODULE.M.NAME], f);
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
        ControllerTemplate.prototype.EXTEND = function (context) {
            if (context === MODULE.M.NAMESPACE || MODULE.M.NAMESPACE && MODULE.M.NAMESPACE == MODULE.M.NAMESPACE.window) {
                // コンテクストをプラグインに変更
                context = MODULE.M.NAMESPACE[MODULE.M.NAME];
            } else // $().mvc()として実行された場合の処理
            if (context instanceof MODULE.M.NAMESPACE) {
                if (context instanceof jQuery) {
                    // コンテクストへの変更をend()で戻せるようadd()
                    context = context.add();
                } else {
                }
            }
            var f = 'function' === typeof MODULE.ControllerFunction && new MODULE.ControllerFunction() || MODULE.ControllerFunction, m = 'function' === typeof MODULE.ControllerMethod && new MODULE.ControllerMethod() || MODULE.ControllerMethod;

            // コンテクストに関数とメソッドを設定
            this.REGISTER_FUNCTIONS(context, f);
            this.REGISTER_FUNCTIONS(context, m);

            // コンテクストのプロパティを更新
            this.UPDATE_PROPERTIES(context, f);
            this.UPDATE_PROPERTIES(context, m);
            return context;
        };

        /**
        * 拡張モジュール本体のインターフェイス。
        *
        * @method EXEC
        * @param {Any} [params]* パラメータ
        */
        ControllerTemplate.prototype.EXEC = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var context = MODULE.C.EXTEND(this);
            args = [context].concat(args);
            args = MODULE.C.exec_.apply(MODULE.C, args);
            args = args instanceof Array ? args : [args];
            return MODULE.M.MAIN.apply(MODULE.M, args);
        };

        /**
        * 拡張モジュール本体を実行したときに呼び出される。実装ごとに書き換える。戻り値の配列が`MAIN`および`main_`へ渡す引数のリストとなる。
        *
        * @method exec_
        * @param {Object} context
        * @param {Any} [params]* args
        */
        ControllerTemplate.prototype.exec_ = function (context) {
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
        ControllerTemplate.prototype.REGISTER_FUNCTIONS = function (context, funcs) {
            var props = MODULE.Controller.PROPERTIES;

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
        ControllerTemplate.prototype.UPDATE_PROPERTIES = function (context, funcs) {
            var props = MODULE.Controller.PROPERTIES;

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
        ControllerTemplate.prototype.OBSERVE = function () {
        };

        /**
        * 内部イベントの監視を終了する。
        *
        * @method RELEASE
        */
        ControllerTemplate.prototype.RELEASE = function () {
        };

        ControllerTemplate.EVENTS = {};

        ControllerTemplate.FUNCTIONS = {};

        ControllerTemplate.METHODS = {};

        ControllerTemplate.PROPERTIES = [];

        ControllerTemplate.TRIGGERS = {};
        return ControllerTemplate;
    })();
    MODULE.ControllerTemplate = ControllerTemplate;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M, V, C
    // Deny access
    var ControllerFunction = (function () {
        function ControllerFunction() {
        }
        ControllerFunction.prototype.enable = function () {
            MODULE.M.enable();
            return this;
        };

        ControllerFunction.prototype.disable = function () {
            MODULE.M.disable();
            return this;
        };

        ControllerFunction.prototype.click = function (url, attr) {
            var setting = MODULE.M.getActiveSetting(), $anchor;

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
                return MODULE.V.HANDLERS.CLICK(event);
            }).click();
        };

        ControllerFunction.prototype.submit = function (url, attr, data) {
            var setting = MODULE.M.getActiveSetting(), $form, df = document.createDocumentFragment(), type, $element;

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
                return MODULE.V.HANDLERS.SUBMIT(event);
            }).submit();
        };

        ControllerFunction.prototype.getCache = function (url) {
            if (typeof url === "undefined") { url = window.location.href; }
            var cache = MODULE.M.getCache(url);
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
                    MODULE.M.setCache(url, data, textStatus, jqXHR);
            }
            return this;
        };

        ControllerFunction.prototype.removeCache = function (url) {
            if (typeof url === "undefined") { url = window.location.href; }
            MODULE.M.removeCache(url);
            return this;
        };

        ControllerFunction.prototype.clearCache = function () {
            MODULE.M.clearCache();
            return this;
        };

        ControllerFunction.prototype.follow = function (event, $XHR, timeStamp) {
            if (!MODULE.M.isDeferrable) {
                return false;
            }
            var anchor = event.currentTarget;
            $XHR.follow = true;
            if (isFinite(event.timeStamp)) {
                $XHR.timeStamp = timeStamp || event.timeStamp;
            }
            MODULE.M.setActiveXHR($XHR);
            jQuery.when($XHR).done(function () {
                !MODULE.M.getCache(anchor.href) && MODULE.M.isImmediateLoadable(event) && MODULE.M.setCache(anchor.href, undefined, undefined, $XHR);
            });
            jQuery[MODULE.M.NAME].click(anchor.href);
            return true;
        };

        ControllerFunction.prototype.host = function () {
            return MODULE.M.requestHost;
        };
        return ControllerFunction;
    })();
    MODULE.ControllerFunction = ControllerFunction;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../model/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M, C
    // Deny access
    var V;

    var ControllerMain = (function (_super) {
        __extends(ControllerMain, _super);
        function ControllerMain() {
            _super.apply(this, arguments);
            // CONTROLLERの待ち受けるイベントに登録されるハンドラ
            this.HANDLERS = {};
        }
        ControllerMain.prototype.exec_ = function ($context, option) {
            $context = $context instanceof jQuery ? $context : MODULE.C.EXTEND(jQuery(document));

            var pattern;
            pattern = $context instanceof MODULE.NAMESPACE ? 'm:' : 'f:';
            pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
            switch (pattern.toLowerCase()) {
            }

            return [$context, option];
        };

        // CONTROLLERが監視する内部イベントを登録
        ControllerMain.prototype.OBSERVE = function () {
        };

        ControllerMain.prototype.CLICK = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            MODULE.M.CLICK.apply(MODULE.M, args);
        };
        ControllerMain.prototype.SUBMIT = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            MODULE.M.SUBMIT.apply(MODULE.M, args);
        };
        ControllerMain.prototype.POPSTATE = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            MODULE.M.POPSTATE.apply(MODULE.M, args);
        };
        ControllerMain.prototype.SCROLL = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            MODULE.M.SCROLL.apply(MODULE.M, args);
        };

        ControllerMain.EVENTS = {};

        ControllerMain.PROPERTIES = [];

        ControllerMain.TRIGGERS = {};
        return ControllerMain;
    })(MODULE.ControllerTemplate);
    MODULE.ControllerMain = ControllerMain;

    // 短縮登録
    MODULE.Controller = ControllerMain;
    MODULE.C = new MODULE.Controller();
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M, V, C
    // Deny access
    var ControllerMethod = (function (_super) {
        __extends(ControllerMethod, _super);
        function ControllerMethod() {
            _super.apply(this, arguments);
        }
        return ControllerMethod;
    })(MODULE.ControllerFunction);
    MODULE.ControllerMethod = ControllerMethod;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>
/* VIEW */
var MODULE;
(function (MODULE) {
    /**
    * View of MVC
    *
    * @class View
    * @constructor
    * @param {JQuery|HTMLElement} [context] 監視するDOM要素を設定する。
    */
    var ViewTemplate = (function () {
        function ViewTemplate(context) {
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
            this.UUID = MODULE.M.GEN_UUID();
            switch (arguments.length) {
                case 0:
                    break;
                case 1:
                    this.CONTEXT = context;
                    this.OBSERVE();
                    break;
            }
            this.state_ = 0;
        }
        /**
        * 内部イベントを監視する。
        *
        * @method OBSERVE
        */
        ViewTemplate.prototype.OBSERVE = function () {
        };

        /**
        * 内部イベントの監視を終了する。
        *
        * @method RELEASE
        */
        ViewTemplate.prototype.RELEASE = function () {
        };

        /**
        * 外部イベントを監視する。
        *
        * @method BIND
        * @param {String} selector jQueryセレクタ
        * @chainable
        */
        ViewTemplate.prototype.BIND = function () {
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
        ViewTemplate.prototype.UNBIND = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return this;
        };

        ViewTemplate.EVENTS = {};

        ViewTemplate.TRIGGERS = {};
        return ViewTemplate;
    })();
    MODULE.ViewTemplate = ViewTemplate;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="../model/main.ts"/>
/* VIEW */
var MODULE;
(function (MODULE) {
    // Allow access:
    //  M, V, C
    // Deny access
    var ViewMain = (function (_super) {
        __extends(ViewMain, _super);
        function ViewMain() {
            _super.apply(this, arguments);
            // VIEWの待ち受けるイベントに登録されるハンドラ
            this.HANDLERS = {
                CLICK: function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    MODULE.C.CLICK.apply(MODULE.C, args);
                },
                SUBMIT: function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    MODULE.C.SUBMIT.apply(MODULE.C, args);
                },
                POPSTATE: function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    MODULE.C.POPSTATE.apply(MODULE.C, args);
                },
                SCROLL: function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    MODULE.C.SCROLL.apply(MODULE.C, args);
                }
            };
        }
        // VIEWにする要素を選択/解除する
        ViewMain.prototype.BIND = function (setting) {
            this.UNBIND(setting);
            this.CONTEXT.delegate(setting.link, setting.nss.click, this.HANDLERS.CLICK).delegate(setting.form, setting.nss.submit, this.HANDLERS.SUBMIT);
            jQuery(window).bind(setting.nss.popstate, this.HANDLERS.POPSTATE);

            setting.fix.scroll && jQuery(window).bind(setting.nss.scroll, this.HANDLERS.SCROLL);
            return this;
        };
        ViewMain.prototype.UNBIND = function (setting) {
            this.CONTEXT.undelegate(setting.link, setting.nss.click).undelegate(setting.form, setting.nss.submit);
            jQuery(window).unbind(setting.nss.popstate);

            setting.fix.scroll && jQuery(window).unbind(setting.nss.scroll);
            return this;
        };

        // VIEWが監視する内部イベントを登録
        ViewMain.prototype.OBSERVE = function () {
            this.RELEASE();
            return this;
        };
        ViewMain.prototype.RELEASE = function () {
            return this;
        };

        ViewMain.EVENTS = {
            CHANGE: MODULE.M.NAME + '.change'
        };

        ViewMain.TRIGGERS = {};
        return ViewMain;
    })(MODULE.ViewTemplate);
    MODULE.ViewMain = ViewMain;

    // 短縮登録
    MODULE.View = ViewMain;
    MODULE.V = new MODULE.View();
})(MODULE || (MODULE = {}));
})(window, window.document, void 0, jQuery);
