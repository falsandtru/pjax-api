/**
 * 
 * jquery.pjax.js
 * 
 * @name jquery.pjax.js
 * @version 2.1.0
 * ---
 * @author falsandtru https://github.com/falsandtru/jquery.pjax.js/
 * @copyright 2014, falsandtru
 * @license MIT
 * 
 */

new (function(window, document, undefined, $) {
"use strict";

var MODULE;
(function (MODULE) {
    MODULE.NAME = 'pjax';
    MODULE.NAMESPACE = jQuery;

    

    

    

    (function (State) {
        State[State["wait"] = -1] = "wait";
        State[State["ready"] = 0] = "ready";
        State[State["lock"] = 1] = "lock";
        State[State["seal"] = 2] = "seal";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;

    

    

    
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var ModelTemplate = (function () {
        function ModelTemplate() {
            this.NAME = MODULE.NAME;
            this.NAMESPACE = MODULE.NAMESPACE;
            this.state_ = -1 /* wait */;
            this.GEN_UUID = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16).toUpperCase();
                });
            };
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
                    var keys = key, iKeys;
                    for (iKeys in keys) {
                        MODULE.Model.store(iKeys, keys[iKeys]);
                    }
                } else {
                    switch (arguments.length) {
                        case 0:
                            return new this.stock();
                        case 1:
                            return this.stock[key] || MODULE.Model.store(key);
                        case 2:
                            return MODULE.Model.store(key, value);
                        case 3:
                            return MODULE.Model.store(key, value, merge);
                    }
                }
            };
            this.UUID = this.GEN_UUID();
        }
        ModelTemplate.prototype.MAIN = function (context) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            return this.main_.apply(this, [context].concat(args));
        };

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
                    return MODULE.Model.store[key];
                case 2:
                    return MODULE.Model.store[key] = value;
                case 3:
                    return MODULE.Model.store[key] = jQuery.extend(true, MODULE.Model.store[key], value);
            }
        };
        return ModelTemplate;
    })();
    MODULE.ModelTemplate = ModelTemplate;
})(MODULE || (MODULE = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MODULE;
(function (MODULE) {
    var M, V, C, APP, DATA;

    var ModelUtil = (function (_super) {
        __extends(ModelUtil, _super);
        function ModelUtil() {
            _super.apply(this, arguments);
        }
        ModelUtil.prototype.canonicalizeUrl = function (url) {
            var ret;

            ret = this.trim(url);

            ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');

            ret = /^https?:/i.test(ret) ? ret : (function (url, a) {
                a.href = url;
                return a.href;
            })(ret, document.createElement('a'));

            ret = encodeURI(decodeURI(ret));

            ret = ret.replace(/(?:%\w{2})+/g, function (str) {
                return url.match(str.toLowerCase()) || str;
            });
            return ret;
        };

        ModelUtil.prototype.trim = function (text) {
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

    MODULE.UTIL = new ModelUtil();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var V, C;

    var ModelApp = (function (_super) {
        __extends(ModelApp, _super);
        function ModelApp() {
            _super.call(this);
            this.landing = MODULE.UTIL.canonicalizeUrl(window.location.href);
            this.recent = { order: [], data: {}, size: 0 };
            this.createHTMLDocument_();
        }
        ModelApp.prototype.configure = function (option, origURL, destURL, isBidirectional) {
            if (typeof isBidirectional === "undefined") { isBidirectional = false; }
            origURL = MODULE.UTIL.canonicalizeUrl(origURL || option.origLocation.href);
            destURL = MODULE.UTIL.canonicalizeUrl(destURL || option.destLocation.href);
            option = option.option || option;

            var scope = option.scope ? jQuery.extend(true, {}, option, MODULE.APP.scope_(option, origURL, destURL, null) || isBidirectional && MODULE.APP.scope_(option, destURL, origURL, null) || { disable: true }) : jQuery.extend(true, {}, option);

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
                    page: 100, size: 1 * 1024 * 1024, expires: { max: null, min: 5 * 60 * 1000 }
                },
                callback: null,
                callbacks: {
                    ajax: {},
                    update: { redirect: {}, url: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, cache: {}, render: {}, verify: {} }
                },
                param: null,
                load: {
                    css: false, script: false, execute: true,
                    head: 'base, meta, link',
                    reload: '',
                    ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
                    sync: true, ajax: { dataType: 'script', cache: true }, rewrite: null,
                    redirect: true
                },
                interval: 100,
                wait: 0,
                scroll: { delay: 300 },
                fix: { location: true, history: true, scroll: true, reset: false },
                hashquery: false,
                fallback: true,
                database: true,
                speedcheck: false,
                server: {
                    query: 'pjax=1',
                    header: true
                }
            }, force = {
                origLocation: (function (url, a) {
                    a.href = url;
                    return a;
                })(origURL, document.createElement('a')),
                destLocation: (function (url, a) {
                    a.href = url;
                    return a;
                })(destURL, document.createElement('a')),
                scroll: { record: true, queue: [] },
                retry: true,
                option: option
            }, compute = function () {
                var nsArray = [setting.gns || MODULE.M.NAME].concat(setting.ns && String(setting.ns).split('.') || []);
                var query = setting.server.query;
                switch (query && typeof query) {
                    case 'string':
                        query = eval('({' + query.replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]+)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
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
            setting = jQuery.extend(true, initial, scope, force);
            setting = jQuery.extend(true, setting, compute());

            return new MODULE.APP.stock(setting);
        };

        ModelApp.prototype.registrate = function ($context, setting) {
            var executed = MODULE.APP.stock('executed');
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

            MODULE.DATA.openDB(setting);
            new MODULE.View($context).BIND(setting);
            setTimeout(function () {
                return MODULE.APP.landing = null;
            }, 1500);
        };

        ModelApp.prototype.drive = function (setting, event, register, cache) {
            var speedcheck = setting.speedcheck, speed = MODULE.APP.stock('speed');
            speedcheck && (speed.fire = event.timeStamp);
            speedcheck && speed.time.splice(0, 100, 0);
            speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');

            if (MODULE.UTIL.fire(setting.callbacks.before, null, [event, setting.param]) === false) {
                return;
            }

            setting.scroll.record = false;
            setting.fix.reset && /click|submit/.test(event.type.toLowerCase()) && window.scrollTo(jQuery(window).scrollLeft(), 0);

            var activeXHR = MODULE.M.getActiveXHR();
            event = jQuery.extend(true, {}, event);
            function done(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.done, this, [event, setting.param].concat(xhrArgs));
            }
            function fail(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));
            }
            function always(xhrArgs) {
                MODULE.UTIL.fire(setting.callbacks.ajax.fail, this, [event, setting.param].concat(xhrArgs));

                MODULE.M.setActiveXHR(null);
                var data, textStatus, XMLHttpRequest;
                if (2 < xhrArgs.length) {
                    data = xhrArgs[0];
                    textStatus = xhrArgs[1];
                    XMLHttpRequest = xhrArgs[2];

                    MODULE.APP.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
                } else if (setting.fallback && 'abort' !== xhrArgs.statusText) {
                    XMLHttpRequest = xhrArgs;

                    'function' === typeof setting.fallback ? MODULE.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : MODULE.APP.fallback_(event);
                }
            }

            if (cache && cache.XMLHttpRequest) {
                speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                MODULE.M.setActiveXHR(null);
                if (MODULE.M.isDeferrable) {
                    jQuery.when(jQuery.Deferred().resolve(cache), MODULE.APP.wait_(MODULE.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(function (cache) {
                        return MODULE.APP.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache);
                    }) && undefined;
                } else {
                    MODULE.APP.update_(setting, event, register, cache.data, cache.textStatus, cache.XMLHttpRequest, cache);
                }
            } else if (activeXHR && activeXHR.follow && 'abort' !== activeXHR.statusText) {
                speedcheck && speed.time.splice(0, 1, activeXHR.timeStamp - speed.fire);
                speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                var wait = setting.wait && isFinite(activeXHR.timeStamp) ? Math.max(setting.wait - new Date().getTime() + activeXHR.timeStamp, 0) : 0;
                jQuery.when(activeXHR, MODULE.APP.wait_(wait)).done(done).fail(fail).always(always);
            } else {
                var ajax = {}, callbacks = {};

                ajax.url = !setting.server.query ? setting.destLocation.href : [
                    setting.destLocation.protocol,
                    '//',
                    setting.destLocation.host,
                    '/' === setting.destLocation.pathname.charAt(0) ? setting.destLocation.pathname : '/' + setting.destLocation.pathname,
                    (1 < setting.destLocation.search.length ? setting.destLocation.search + '&' : '?') + setting.server.query,
                    setting.destLocation.hash
                ].join('');
                switch (event.type.toLowerCase()) {
                    case 'click':
                        ajax.type = 'GET';
                        break;

                    case 'submit':
                        ajax.type = event.currentTarget.method.toUpperCase();
                        if (ajax.type === 'POST') {
                            ajax.data = jQuery(event.currentTarget).serializeArray();
                        }
                        break;

                    case 'popstate':
                        ajax.type = 'GET';
                        break;
                }

                var _data, _errorThrown;
                callbacks = {
                    xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
                        var XMLHttpRequest;
                        XMLHttpRequest = MODULE.UTIL.fire(setting.callbacks.ajax.xhr, this, [event, setting.param]);
                        XMLHttpRequest = 'object' === typeof XMLHttpRequest && XMLHttpRequest || jQuery.ajaxSettings.xhr();

                        return XMLHttpRequest;
                    },
                    beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function (XMLHttpRequest, ajaxSetting) {
                        if (setting.server.header) {
                            XMLHttpRequest.setRequestHeader(setting.nss.requestHeader, 'true');
                        }
                        if ('object' === typeof setting.server.header) {
                            XMLHttpRequest.setRequestHeader(setting.nss.requestHeader, 'true');
                            setting.server.header.area && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Area', setting.area[0]);
                            setting.server.header.head && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                            setting.server.header.css && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                            setting.server.header.script && XMLHttpRequest.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
                        }

                        MODULE.UTIL.fire(setting.callbacks.ajax.beforeSend, this, [event, setting.param, XMLHttpRequest, ajaxSetting]);
                    },
                    dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                        return MODULE.UTIL.fire(setting.callbacks.ajax.dataFilter, this, [event, setting.param, data, type]) || data;
                    },
                    success: function (data, textStatus, XMLHttpRequest) {
                        _data = data;
                        MODULE.UTIL.fire(setting.callbacks.ajax.success, this, [event, setting.param, data, textStatus, XMLHttpRequest]);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        _errorThrown = errorThrown;
                        MODULE.UTIL.fire(setting.callbacks.ajax.error, this, [event, setting.param, XMLHttpRequest, textStatus, errorThrown]);
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        var data = _data, errorThrown = _errorThrown;
                        MODULE.UTIL.fire(setting.callbacks.ajax.complete, this, [event, setting.param, XMLHttpRequest, textStatus]);

                        MODULE.M.setActiveXHR(null);
                        if (!errorThrown) {
                            if (!MODULE.M.isDeferrable) {
                                MODULE.APP.update_(setting, event, register, data, textStatus, XMLHttpRequest, null);
                            }
                        } else if (setting.fallback && 'abort' !== textStatus) {
                            'function' === typeof setting.fallback ? MODULE.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : MODULE.APP.fallback_(event);
                        }
                    }
                };

                ajax = jQuery.extend(true, {}, setting.ajax, callbacks, ajax);

                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('request(' + speed.time.slice(-1) + ')');

                jQuery(document).trigger(setting.gns + '.request');

                activeXHR = MODULE.M.setActiveXHR(jQuery.ajax(ajax));
                if (MODULE.M.isDeferrable) {
                    jQuery.when(activeXHR, MODULE.APP.wait_(MODULE.UTIL.fire(setting.wait, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]))).done(done).fail(fail).always(always);
                }
            }

            if (MODULE.UTIL.fire(setting.callbacks.after, null, [event, setting.param]) === false) {
                return;
            }
        };

        ModelApp.prototype.update_ = function (setting, event, register, data, textStatus, XMLHttpRequest, cache) {
            UPDATE:
             {
                var speedcheck = setting.speedcheck, speed = MODULE.APP.stock('speed');
                speedcheck && speed.time.push(speed.now() - speed.fire);
                speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');

                MODULE.M.setActiveSetting(setting);

                var url = setting.destLocation.href;
                var callbacks_update = setting.callbacks.update;

                if (MODULE.UTIL.fire(callbacks_update.before, null, [event, setting.param, data, textStatus, XMLHttpRequest, cache]) === false) {
                    break UPDATE;
                }

                if (setting.cache.mix && event.type.toLowerCase() !== 'popstate' && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                    return 'function' === typeof setting.fallback ? MODULE.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : MODULE.APP.fallback_(event);
                }

                try  {
                    MODULE.APP.landing = null;
                    if (!cache && !~(XMLHttpRequest.getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) {
                        throw new Error("throw: content-type mismatch");
                    }

                    UPDATE_CACHE:
                     {
                        if (cache && cache.XMLHttpRequest || !setting.cache.click && !setting.cache.submit && !setting.cache.popstate) {
                            break UPDATE_CACHE;
                        }
                        if (event.type.toLowerCase() === 'submit' && !setting.cache[event.currentTarget.method.toLowerCase()]) {
                            break UPDATE_CACHE;
                        }
                        if (MODULE.UTIL.fire(callbacks_update.cache.before, null, [event, setting.param, cache]) === false) {
                            break UPDATE_CACHE;
                        }

                        jQuery[MODULE.M.NAME].setCache(url, cache && cache.data || null, textStatus, XMLHttpRequest);
                        cache = jQuery[MODULE.M.NAME].getCache(url);

                        if (MODULE.UTIL.fire(callbacks_update.cache.after, null, [event, setting.param, cache]) === false) {
                            break UPDATE_CACHE;
                        }
                    }
                    ;

                    var srcDocument = MODULE.APP.createHTMLDocument_(XMLHttpRequest.responseText), dstDocument = document, cacheDocument, checker, loadwaits = [];

                    var title = jQuery('title', srcDocument).text();

                    setting.area = MODULE.APP.chooseAreas(setting.area, srcDocument, dstDocument);
                    setting.area = setting.area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                    if (!setting.area) {
                        throw new Error('throw: area notfound');
                    }

                    if (cache && cache.data) {
                        cacheDocument = MODULE.APP.createHTMLDocument_(cache.data);
                        title = jQuery('title', cacheDocument).text();
                        var i = -1, $srcAreas, $dstAreas;
                        while (setting.area[++i]) {
                            $srcAreas = jQuery(setting.area[i], srcDocument).clone();
                            $dstAreas = jQuery(setting.area[i], cacheDocument);
                            var j = -1;
                            while ($srcAreas[++j]) {
                                $dstAreas.eq(j).replaceWith($srcAreas.eq(j));
                            }
                        }
                    }

                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');

                    jQuery('noscript', srcDocument).children().parent().each(function () {
                        this.children.length && jQuery(this).text(this.innerHTML);
                    });

                    UPDATE_REDIRECT:
                     {
                        var redirect = jQuery('head meta[http-equiv="Refresh"][content*="URL="]', srcDocument)[0];
                        if (!redirect) {
                            break UPDATE_REDIRECT;
                        }
                        if (MODULE.UTIL.fire(callbacks_update.redirect.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_REDIRECT;
                        }
                        ;

                        redirect = jQuery('<a>', { href: jQuery(redirect).attr('content').match(/\w+:\/\/[^;\s]+/i) })[0];
                        switch (true) {
                            case !setting.load.redirect:
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
                                        window.history.replaceState(window.history.state, title, redirect.href);
                                        if (register && setting.fix.location) {
                                            jQuery[MODULE.M.NAME].disable();
                                            window.history.back();
                                            window.history.forward();
                                            jQuery[MODULE.M.NAME].enable();
                                        }
                                        return void jQuery(window).trigger('popstate');
                                }
                        }

                        if (MODULE.UTIL.fire(callbacks_update.redirect.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_REDIRECT;
                        }
                    }
                    ;

                    jQuery(window).trigger(setting.gns + '.unload');

                    UPDATE_URL:
                     {
                        if (MODULE.UTIL.fire(callbacks_update.url.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_URL;
                        }
                        ;

                        register && url !== setting.origLocation.href && window.history.pushState(MODULE.UTIL.fire(setting.state, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]), window.opera || ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? title : dstDocument.title, url);

                        setting.origLocation.href = url;
                        if (register && setting.fix.location) {
                            jQuery[MODULE.M.NAME].disable();
                            window.history.back();
                            window.history.forward();
                            jQuery[MODULE.M.NAME].enable();
                        }

                        if (MODULE.UTIL.fire(callbacks_update.url.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_URL;
                        }
                    }
                    ;

                    UPDATE_TITLE:
                     {
                        if (MODULE.UTIL.fire(callbacks_update.title.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_TITLE;
                        }
                        dstDocument.title = title;
                        setting.database && setting.fix.history && MODULE.APP.saveTitleToDB(url, setting.hashquery, title);
                        if (MODULE.UTIL.fire(callbacks_update.title.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_TITLE;
                        }
                    }
                    ;

                    setting.database && MODULE.DATA.updateCurrentPage(setting.hashquery);

                    var load_head = function () {
                        UPDATE_HEAD:
                         {
                            if (MODULE.UTIL.fire(callbacks_update.head.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_HEAD;
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

                            if (MODULE.UTIL.fire(callbacks_update.head.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_HEAD;
                            }
                        }
                        ;
                    };
                    load_head();

                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');

                    UPDATE_CONTENT:
                     {
                        if (MODULE.UTIL.fire(callbacks_update.content.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_CONTENT;
                        }
                        jQuery(setting.area).children('.' + setting.nss.class4html + '-check').remove();
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
                            loadwaits = setting.load.sync && jQuery.when && loadwaits.concat($srcAreas.find('img, iframe, frame').map(function () {
                                var defer = jQuery.Deferred();
                                jQuery(this).one('load error', defer.resolve);
                                return defer;
                            }).get()) || loadwaits;
                            var j = -1;
                            while ($srcAreas[++j]) {
                                $dstAreas.eq(j).replaceWith($srcAreas.eq(j)).append(checker.clone());
                            }
                        }
                        checker = jQuery(setting.area.join(',')).children('.' + setting.nss.class4html + '-check');
                        jQuery(dstDocument).trigger(setting.gns + '.DOMContentLoaded');
                        if (MODULE.UTIL.fire(callbacks_update.content.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                            break UPDATE_CONTENT;
                        }
                    }
                    ;

                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');

                    var scroll = function (call) {
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
                                call && setting.database && setting.fix.scroll && MODULE.APP.saveScrollPositionToCacheAndDB(url, setting.hashquery, scrollX, scrollY);
                                break;
                            case 'popstate':
                                call && setting.fix.scroll && setting.database && setting.scroll.record && MODULE.APP.loadScrollPositionByCacheOrDB(url, setting.hashquery);
                                break;
                        }
                        if (MODULE.UTIL.fire(callbacks_update.scroll.after, null, [event, setting.param]) === false) {
                            return;
                        }
                    };

                    var rendering = function (callback) {
                        if (MODULE.UTIL.fire(callbacks_update.render.before, null, [event, setting.param]) === false) {
                            return;
                        }

                        var count = 0;
                        (function check() {
                            if (checker.filter(function () {
                                return this.clientWidth || this.clientHeight || jQuery(this).is(':hidden');
                            }).length === checker.length || count >= 100) {
                                rendered(callback);
                            } else if (checker.length) {
                                count++;
                                setTimeout(check, setting.interval);
                            }
                        })();
                    };
                    var rendered = function (callback) {
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('renderd(' + speed.time.slice(-1) + ')');

                        checker.remove();
                        setting.scroll.record = true;
                        if ('popstate' !== event.type.toLowerCase()) {
                            MODULE.APP.scrollByHash_(setting.destLocation.hash) || scroll(true);
                            setTimeout(function () {
                                MODULE.APP.scrollByHash_(setting.destLocation.hash);
                            }, 300);
                        } else {
                            scroll(true);
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

                    jQuery('noscript', srcDocument).remove();

                    var load_css = function (selector) {
                        UPDATE_CSS:
                         {
                            if (!setting.load.css) {
                                break UPDATE_CSS;
                            }
                            if (MODULE.UTIL.fire(callbacks_update.css.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_CSS;
                            }

                            var css, save, adds = [], removes = jQuery(selector).not(jQuery(setting.area).find(selector));
                            cache = jQuery[MODULE.M.NAME].getCache(url);
                            save = cache && !cache.css;
                            css = cache && cache.css ? jQuery(cache.css) : jQuery(selector, srcDocument).not(jQuery(setting.area, srcDocument).find(selector));
                            css = css.not(setting.load.ignore);

                            if (cache && cache.css && css && css.length !== cache.css.length) {
                                save = true;
                            }
                            if (save) {
                                cache.css = [];
                            }

                            for (var i = 0, element; element = css[i]; i++) {
                                element = dstDocument.importNode ? dstDocument.importNode(element, true) : jQuery(element.outerHTML);
                                element = 'function' === typeof setting.load.rewrite ? MODULE.UTIL.fire(setting.load.rewrite, null, [element]) || element : element;
                                if (save) {
                                    cache.css[i] = element;
                                }

                                for (var j = 0; removes[j]; j++) {
                                    if (MODULE.UTIL.trim(removes[j].href || removes[j].innerHTML || '') === MODULE.UTIL.trim(element.href || element.innerHTML || '')) {
                                        if (adds.length) {
                                            element = removes.eq(j).prevAll(selector).first();
                                            element[0] ? element.after(adds) : removes.eq(j).before(adds);
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
                            removes[0] ? removes.last().after(adds) : jQuery('head').append(adds);
                            removes.not(setting.load.ignore).remove();

                            if (MODULE.UTIL.fire(callbacks_update.css.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_CSS;
                            }
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
                        }
                        ;
                    };

                    var load_script = function (selector) {
                        UPDATE_SCRIPT:
                         {
                            if (!setting.load.script) {
                                break UPDATE_SCRIPT;
                            }
                            if (MODULE.UTIL.fire(callbacks_update.script.before, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_SCRIPT;
                            }

                            var script, save, execs = [];
                            cache = jQuery[MODULE.M.NAME].getCache(url);
                            save = cache && !cache.script;
                            script = cache && cache.script ? jQuery(cache.script) : jQuery('script', srcDocument);
                            script = script.not(setting.load.ignore);

                            if (cache && cache.script && script && script.length !== cache.script.length) {
                                save = true;
                            }
                            if (save) {
                                cache.script = [];
                            }

                            var executed = MODULE.APP.stock('executed');
                            for (var i = 0, element; element = script[i]; i++) {
                                element = 'function' === typeof setting.load.rewrite ? MODULE.UTIL.fire(setting.load.rewrite, null, [element]) || element : element;
                                if (save) {
                                    cache.script[i] = element;
                                }

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

                            if (MODULE.UTIL.fire(callbacks_update.script.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                                break UPDATE_SCRIPT;
                            }
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push((selector === '[src][defer]' ? 'defer' : 'script') + '(' + speed.time.slice(-1) + ')');
                        }
                        ;
                    };

                    UPDATE_VERIFY:
                     {
                        MODULE.UTIL.fire(callbacks_update.verify.before, null, [event, setting.param]);
                        var curr = MODULE.UTIL.canonicalizeUrl(window.location.href).replace(/(?:%\w{2})+/g, function (str) {
                            return String(url.match(str.toLowerCase()) || str);
                        });
                        if (url === curr) {
                            setting.retry = true;
                            new MODULE.APP.stock(setting.uuid);
                        } else if (setting.retry) {
                            setting.retry = false;
                            setting.destLocation.href = curr;
                            MODULE.APP.drive(setting, event, false, setting.cache[event.type.toLowerCase()] && jQuery[MODULE.M.NAME].getCache(MODULE.UTIL.canonicalizeUrl(window.location.href)));
                        } else {
                            throw new Error('throw: location mismatch');
                        }
                        MODULE.UTIL.fire(callbacks_update.verify.after, null, [event, setting.param]);
                    }
                    ;

                    load_css('link[rel~="stylesheet"], style');
                    jQuery(window).one(setting.gns + '.rendering', function (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        scroll(false);
                        jQuery(dstDocument).trigger(setting.gns + '.ready');
                        load_script(':not([defer]), :not([src])');
                        if (setting.load.sync) {
                            rendering(function () {
                                return load_script('[src][defer]');
                            });
                        } else {
                            rendering();
                            load_script('[src][defer]');
                        }
                    }).trigger(setting.gns + '.rendering');

                    if (MODULE.UTIL.fire(callbacks_update.success, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(callbacks_update.complete, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(setting.callback, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                        break UPDATE;
                    }
                } catch (err) {
                    cache && jQuery[MODULE.M.NAME].removeCache(url);

                    if (MODULE.UTIL.fire(callbacks_update.error, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                        break UPDATE;
                    }
                    if (MODULE.UTIL.fire(callbacks_update.complete, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                        break UPDATE;
                    }
                    if (setting.fallback) {
                        return 'function' === typeof setting.fallback ? MODULE.UTIL.fire(setting.fallback, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]) : MODULE.APP.fallback_(event);
                    }
                }
                ;

                if (MODULE.UTIL.fire(callbacks_update.after, null, [event, setting.param, data, textStatus, XMLHttpRequest]) === false) {
                    break UPDATE;
                }
            }
            ;
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

        ModelApp.prototype.scope_ = function (common, origURL, destURL, relocation) {
            var origKeyUrl, destKeyUrl, scp = common.scope, dirs, keys, key, pattern, not, reg, rewrite, inherit, hit_src, hit_dst, option;

            origKeyUrl = origURL.replace(/.+?\w(\/[^#?]*).*/, '$1');
            destKeyUrl = destURL.replace(/.+?\w(\/[^#?]*).*/, '$1');

            keys = (relocation || destKeyUrl).replace(/^\//, '').replace(/([?#])/g, '/$1').split('/');
            if (relocation) {
                if (!~relocation.indexOf('*')) {
                    return undefined;
                }
                dirs = [];
                var arr = origKeyUrl.replace(/^\//, '').replace(/([?#])/g, '/$1').split('/');
                for (var i = 0, len = keys.length; i < len; i++) {
                    '*' === keys[i] && dirs.push(arr[i]);
                }
            }

            for (var i = keys.length + 1; i--;) {
                rewrite = inherit = option = hit_src = hit_dst = undefined;
                key = keys.slice(0, i).join('/').replace(/\/([?#])/g, '$1');
                key = '/' + key + ((relocation || origKeyUrl).charAt(key.length + 1) === '/' ? '/' : '');

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
                    } else if ('rewrite' === pattern && 'function' === typeof scp.rewrite && !relocation) {
                        rewrite = this.scope_.apply(this, [].slice.call(arguments).slice(0, -1).concat([MODULE.UTIL.fire(scp.rewrite, null, [destKeyUrl])]));
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

                        if (relocation && ~pattern.indexOf('/*/')) {
                            for (var k = 0, len = dirs.length; k < len; k++) {
                                pattern = pattern.replace('/*/', '/' + dirs[k] + '/');
                            }
                        }

                        if ((not || !hit_src) && (reg ? !origKeyUrl.search(pattern) : !origKeyUrl.indexOf(pattern))) {
                            if (not) {
                                return false;
                            } else {
                                hit_src = true;
                            }
                        }
                        if ((not || !hit_dst) && (reg ? !destKeyUrl.search(pattern) : !destKeyUrl.indexOf(pattern))) {
                            if (not) {
                                return false;
                            } else {
                                hit_dst = true;
                            }
                        }
                    } else if ('object' === typeof pattern) {
                        option = pattern;
                    }
                }

                if (hit_src && hit_dst) {
                    return jQuery.extend(true, {}, common, ('object' === typeof rewrite ? rewrite : option) || {});
                }
                if (inherit) {
                    continue;
                }
                break;
            }
        };

        ModelApp.prototype.scrollByHash_ = function (hash) {
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

        ModelApp.prototype.wait_ = function (ms) {
            var defer = jQuery.Deferred();
            if (!ms) {
                return defer.resolve();
            }

            setTimeout(function () {
                defer.resolve();
            }, ms);
            return defer;
        };

        ModelApp.prototype.fallback_ = function (event) {
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

        ModelApp.prototype.createHTMLDocument_ = function (html) {
            if (typeof html === "undefined") { html = ''; }
            this.createHTMLDocument_ = function (html) {
                return window.DOMParser && window.DOMParser.prototype && new window.DOMParser().parseFromString(html || '', 'text/html');
            };
            if (test(this.createHTMLDocument_)) {
                return;
            }

            this.createHTMLDocument_ = function (html) {
                html = html || '';
                if (document.implementation && document.implementation.createHTMLDocument) {
                    var doc = document.implementation.createHTMLDocument('');
                    var root = document.createElement('html');
                    var attrs = (html.slice(0, 1024).match(/<html ([^>]+)>/im) || [0, ''])[1].match(/\w+\="[^"]*.|\w+\='[^']*.|\w+/gm) || [];
                    for (var i = 0, attr; attr = attrs[i]; i++) {
                        attr = attr.split('=', 2);
                        doc.documentElement.setAttribute(attr[0], attr[1].replace(/^["']|["']$/g, ''));
                    }
                    root.innerHTML = html.replace(/^.*?<html[^>]*>|<\/html>.*$/ig, '');
                    doc.documentElement.removeChild(doc.head);
                    doc.documentElement.removeChild(doc.body);
                    var element;
                    while (element = root.childNodes[0]) {
                        doc.documentElement.appendChild(element);
                    }
                }
                return doc;
            };
            if (test(this.createHTMLDocument_)) {
                return;
            }

            this.createHTMLDocument_ = function (html) {
                html = html || '';
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
            if (test(this.createHTMLDocument_)) {
                return;
            }

            function test(createHTMLDocument_) {
                try  {
                    var doc = createHTMLDocument_ && createHTMLDocument_('<html lang="en" class="html a b"><head><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript></body></html>');
                    return doc && jQuery('html', doc).is('.html[lang=en]') && jQuery('head>noscript', doc).html() && jQuery('body>noscript', doc).text() === 'noscript';
                } catch (err) {
                }
            }
        };

        ModelApp.prototype.loadTitleByDB = function (unsafe_url, isIncludeHash) {
            var keyUrl = MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(unsafe_url, isIncludeHash));
            MODULE.DATA.loadTitle(keyUrl, isIncludeHash);
        };

        ModelApp.prototype.saveTitleToDB = function (unsafe_url, isIncludeHash, title) {
            var keyUrl = MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(unsafe_url, isIncludeHash));
            MODULE.DATA.saveTitle(keyUrl, title);
        };

        ModelApp.prototype.loadScrollPositionByCacheOrDB = function (unsafe_url, isIncludeHash) {
            var keyUrl = MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(unsafe_url, isIncludeHash));
            var cache = jQuery[MODULE.M.NAME].getCache(keyUrl);
            if (cache && 'number' === typeof cache.scrollX) {
                window.scrollTo(parseInt(Number(cache.scrollX) + '', 10), parseInt(Number(cache.scrollY) + '', 10));
            } else {
                MODULE.DATA.loadScrollPosition(keyUrl);
            }
        };

        ModelApp.prototype.saveScrollPositionToCacheAndDB = function (unsafe_url, isIncludeHash, scrollX, scrollY) {
            var keyUrl = MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(unsafe_url, isIncludeHash));
            jQuery.extend(jQuery[MODULE.M.NAME].getCache(keyUrl), { scrollX: scrollX, scrollY: scrollY });
            MODULE.DATA.saveScrollPosition(keyUrl, scrollX, scrollY);
        };
        return ModelApp;
    })(MODULE.ModelTemplate);
    MODULE.ModelApp = ModelApp;

    MODULE.APP = new ModelApp();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var V, C;

    var ModelData = (function (_super) {
        __extends(ModelData, _super);
        function ModelData() {
            _super.apply(this, arguments);
            this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
            this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
        }
        ModelData.prototype.openDB = function (setting, count) {
            if (typeof count === "undefined") { count = 0; }
            var name = setting.gns, version = 1, days = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24)), IDBFactory = MODULE.DATA.IDBFactory, IDBDatabase = MODULE.DATA.IDBDatabase, IDBOpenDBRequest, IDBObjectStore;

            setting.database = false;
            if (!IDBFactory || !name || count > 3) {
                return;
            }

            try  {
                var retry = function (wait) {
                    MODULE.DATA.IDBDatabase = undefined;
                    IDBDatabase && IDBDatabase.close && IDBDatabase.close();
                    IDBFactory.deleteDatabase(name);
                    wait ? setTimeout(function () {
                        return void MODULE.DATA.openDB(setting, ++count);
                    }, wait) : void MODULE.DATA.openDB(setting, ++count);
                };

                version = parseInt(days - days % 7 + version + '', 10);
                IDBOpenDBRequest = IDBFactory.open(name);
                IDBOpenDBRequest.onblocked = function () {
                };
                IDBOpenDBRequest.onupgradeneeded = function () {
                    var IDBDatabase = this.result;
                    try  {
                        for (var i = IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) {
                            IDBDatabase.deleteObjectStore(IDBDatabase.objectStoreNames[i]);
                        }
                        IDBDatabase.createObjectStore(setting.gns, { keyPath: 'id', autoIncrement: false }).createIndex('date', 'date', { unique: false });
                    } catch (err) {
                    }
                };
                IDBOpenDBRequest.onsuccess = function () {
                    try  {
                        IDBDatabase:
                        IDBDatabase = this.result;
                        MODULE.DATA.IDBDatabase = IDBDatabase;
                        if (IDBObjectStore = MODULE.DATA.createStore_()) {
                            IDBObjectStore.get('_version').onsuccess = function () {
                                if (!this.result || version === this.result.title) {
                                    MODULE.DATA.updateVersionNumber_(version);
                                    MODULE.DATA.updateCurrentPage(setting.hashquery);
                                    MODULE.DATA.saveTitle(MODULE.M.convertUrlToUrlKey(setting.origLocation.href, setting.hashquery), document.title);
                                    MODULE.DATA.saveScrollPosition(MODULE.M.convertUrlToUrlKey(setting.origLocation.href, setting.hashquery), jQuery(window).scrollLeft(), jQuery(window).scrollTop());

                                    setting.database = true;
                                } else {
                                    retry();
                                }
                            };
                        } else {
                            retry();
                        }
                    } catch (err) {
                        retry(1000);
                    }
                };
                IDBOpenDBRequest.onerror = function (event) {
                    retry(1000);
                };
            } catch (err) {
                retry(1000);
            }
        };

        ModelData.prototype.createStore_ = function () {
            var IDBDatabase = MODULE.DATA.IDBDatabase;
            for (var i = IDBDatabase && IDBDatabase.objectStoreNames ? IDBDatabase.objectStoreNames.length : 0; i--;) {
                if (MODULE.M.NAME === IDBDatabase.objectStoreNames[i]) {
                    return IDBDatabase && IDBDatabase.transaction && IDBDatabase.transaction(MODULE.M.NAME, 'readwrite').objectStore(MODULE.M.NAME);
                }
            }
            return null;
        };

        ModelData.prototype.updateCurrentPage = function (isIncludeHash) {
            var IDBObjectStore = MODULE.DATA.createStore_();

            if (!IDBObjectStore) {
                return;
            }
            var secure_url = MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(window.location.href, isIncludeHash));
            IDBObjectStore.put({ id: '_current', title: secure_url });
        };

        ModelData.prototype.updateVersionNumber_ = function (version) {
            var IDBObjectStore = MODULE.DATA.createStore_();

            if (!IDBObjectStore) {
                return;
            }
            IDBObjectStore.put({ id: '_version', title: version });
        };

        ModelData.prototype.accessRecord_ = function (keyUrl, success) {
            var IDBObjectStore = MODULE.DATA.createStore_();

            if (!IDBObjectStore) {
                return;
            }
            IDBObjectStore.get(keyUrl).onsuccess = success;
        };

        ModelData.prototype.loadTitle = function (keyUrl, isIncludeHash) {
            MODULE.DATA.accessRecord_(keyUrl, function () {
                keyUrl === MODULE.UTIL.canonicalizeUrl(MODULE.M.convertUrlToUrlKey(window.location.href, isIncludeHash)) && this.result && this.result.title && (document.title = this.result.title);
            });
        };

        ModelData.prototype.saveTitle = function (keyUrl, title) {
            MODULE.DATA.accessRecord_(keyUrl, function () {
                this.source.put(jQuery.extend(true, {}, this.result || {}, { id: keyUrl, title: title, date: new Date().getTime() }));
                MODULE.DATA.clean_();
            });
        };

        ModelData.prototype.loadScrollPosition = function (keyUrl) {
            MODULE.DATA.accessRecord_(keyUrl, function () {
                if (!this.result || !this.result.id || keyUrl !== this.result.id) {
                    return;
                }
                this.source.get(keyUrl).onsuccess = function () {
                    this.result && isFinite(this.result.scrollX) && isFinite(this.result.scrollY) && window.scrollTo(parseInt(Number(this.result.scrollX) + '', 10), parseInt(Number(this.result.scrollY) + '', 10));
                };
            });
        };

        ModelData.prototype.saveScrollPosition = function (keyUrl, scrollX, scrollY) {
            MODULE.DATA.accessRecord_(keyUrl, function () {
                if (!this.result || !this.result.id || keyUrl !== this.result.id) {
                    return;
                }
                this.source.get(keyUrl).onsuccess = function () {
                    this.source.put(jQuery.extend(true, {}, this.result || {}, { scrollX: parseInt(Number(scrollX) + '', 10), scrollY: parseInt(Number(scrollY) + '', 10) }));
                };
            });
        };

        ModelData.prototype.clean_ = function () {
            var IDBObjectStore = MODULE.DATA.createStore_();
            IDBObjectStore.count().onsuccess = function () {
                if (1000 < this.result) {
                    IDBObjectStore.index('date').openCursor(MODULE.DATA.IDBKeyRange.upperBound(new Date().getTime() - (3 * 24 * 60 * 60 * 1000))).onsuccess = function () {
                        var IDBCursor = this.result;
                        if (IDBCursor) {
                            IDBCursor['delete'](IDBCursor.value.id);
                            IDBCursor['continue']();
                        } else {
                            IDBObjectStore.count().onsuccess = function () {
                                1000 < this.result && IDBObjectStore.clear();
                            };
                        }
                    };
                }
            };
        };
        return ModelData;
    })(MODULE.ModelTemplate);
    MODULE.ModelData = ModelData;

    MODULE.DATA = new ModelData();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var V, DATA;

    var ModelMain = (function (_super) {
        __extends(ModelMain, _super);
        function ModelMain() {
            _super.call(this);
            this.isDeferrable = jQuery.when && 1.6 <= Number(jQuery().jquery.match(/\d+\.\d+/));
            this.state_ = -1 /* wait */;
        }
        ModelMain.prototype.main_ = function ($context, option) {
            var pattern;
            pattern = $context instanceof MODULE.NAMESPACE ? 'm:' : 'f:';
            pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
            switch (pattern.toLowerCase()) {
                case 'm:object':
                case 'm:undefined':
                    break;
                default:
                    return $context;
            }

            var setting = MODULE.APP.configure(option, window.location.href, window.location.href);
            MODULE.M.setActiveSetting(setting);

            MODULE.APP.stock({
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

            if ('pushState' in window.history && window.history['pushState']) {
                jQuery(function () {
                    MODULE.APP.registrate($context, setting);
                    MODULE.M.state_ = ~MODULE.M.state_ ? MODULE.M.state_ : 0 /* ready */;
                });
            }

            return $context;
        };

        ModelMain.prototype.convertUrlToUrlKey = function (unsafe_url, isIncludeHash) {
            return isIncludeHash ? unsafe_url : unsafe_url.replace(/#.*/, '');
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

            var setting = MODULE.APP.configure(MODULE.M.getActiveSetting(), origLocation.href, destLocation.href);
            if (setting.disable) {
                return;
            }
            if (!setting.hashquery && destLocation.hash && origLocation.href.replace(/#.*/, '') === destLocation.href.replace(/#.*/, '')) {
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
            return MODULE.APP.activeSetting;
        };
        ModelMain.prototype.setActiveSetting = function (setting) {
            return MODULE.APP.activeSetting = setting;
        };

        ModelMain.prototype.getActiveXHR = function () {
            return MODULE.APP.activeXHR;
        };
        ModelMain.prototype.setActiveXHR = function (xhr) {
            MODULE.APP.activeXHR && MODULE.APP.activeXHR.readyState < 4 && MODULE.APP.activeXHR.abort();
            return MODULE.APP.activeXHR = xhr;
        };

        ModelMain.prototype.CLICK = function (event) {
            event.timeStamp = new Date().getTime();
            var context = event.currentTarget, $context = jQuery(context);
            var setting = MODULE.APP.configure(MODULE.M.getActiveSetting(), window.location.href, context.href);

            if (MODULE.M.state_ !== 0 /* ready */ || setting.disable || event.isDefaultPrevented()) {
                return;
            }
            if (!MODULE.M.isImmediateLoadable(event)) {
                return;
            }

            if (setting.cache.mix && jQuery[MODULE.M.NAME].getCache(setting.destLocation.href)) {
                return;
            }
            setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
            setting.area = setting.area instanceof Array ? setting.area : [setting.area];
            setting.database && setting.scroll.record && MODULE.APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, setting.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

            var cache;
            if (setting.cache[event.type.toLowerCase()]) {
                cache = jQuery[MODULE.M.NAME].getCache(setting.destLocation.href);
            }

            MODULE.APP.drive(setting, event, true, cache);
            return event.preventDefault();
        };

        ModelMain.prototype.SUBMIT = function (event) {
            event.timeStamp = new Date().getTime();
            var context = event.currentTarget, $context = jQuery(context);
            var setting = MODULE.APP.configure(MODULE.M.getActiveSetting(), window.location.href, context.action);

            if (MODULE.M.state_ !== 0 /* ready */ || setting.disable || event.isDefaultPrevented()) {
                return;
            }
            if (!MODULE.M.isImmediateLoadable(event)) {
                return;
            }

            var serializedURL = setting.destLocation.href.replace(/[?#].*/, '') + (context.method.toUpperCase() === 'GET' ? '?' + jQuery(context).serialize() : '');
            setting.destLocation.href = MODULE.UTIL.canonicalizeUrl(serializedURL);
            if (setting.cache.mix && jQuery[MODULE.M.NAME].getCache(setting.destLocation.href)) {
                return;
            }
            setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
            setting.area = setting.area instanceof Array ? setting.area : [setting.area];
            if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) {
                return;
            }
            setting.database && setting.scroll.record && MODULE.APP.saveScrollPositionToCacheAndDB(setting.destLocation.href, setting.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());

            var cache;
            if (setting.cache[event.type.toLowerCase()] && setting.cache[context.method.toLowerCase()]) {
                cache = jQuery[MODULE.M.NAME].getCache(setting.destLocation.href);
            }

            MODULE.APP.drive(setting, event, true, cache);
            return event.preventDefault();
        };

        ModelMain.prototype.POPSTATE = function (event) {
            event.timeStamp = new Date().getTime();
            var setting = MODULE.APP.configure(MODULE.M.getActiveSetting(), null, window.location.href, true);
            if (MODULE.APP.landing && MODULE.APP.landing === MODULE.UTIL.canonicalizeUrl(window.location.href)) {
                return;
            }

            if (MODULE.M.state_ !== 0 /* ready */ || setting.disable || event.isDefaultPrevented()) {
                return;
            }
            if (setting.origLocation.href === setting.destLocation.href) {
                return;
            }

            if (setting.origLocation.hash !== setting.destLocation.hash && setting.origLocation.pathname + setting.origLocation.search === setting.destLocation.pathname + setting.destLocation.search && !setting.hashquery) {
                return;
            }

            if (setting.cache.mix && jQuery[MODULE.M.NAME].getCache(setting.destLocation.href)) {
                return;
            }
            setting.area = MODULE.UTIL.fire(setting.area, null, [event, setting.param, setting.origLocation.href, setting.destLocation.href]);
            setting.area = setting.area instanceof Array ? setting.area : [setting.area];
            if (!setting.area[0] || !jQuery(setting.area.join(','))[0]) {
                return;
            }

            setting.database && setting.fix.history && MODULE.APP.loadTitleByDB(setting.destLocation.href, setting.hashquery);

            var cache;
            if (setting.cache[event.type.toLowerCase()]) {
                cache = jQuery[MODULE.M.NAME].getCache(setting.destLocation.href);
            }

            MODULE.APP.drive(setting, event, false, cache);
            return event.preventDefault();
        };

        ModelMain.prototype.SCROLL = function (event, end) {
            var common = MODULE.M.getActiveSetting();
            if (MODULE.M.state_ !== 0 /* ready */ || event.isDefaultPrevented()) {
                return;
            }

            if (!common.scroll.delay) {
                common.scroll.record && MODULE.APP.saveScrollPositionToCacheAndDB(window.location.href, common.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
            } else {
                var id;
                while (id = common.scroll.queue.shift()) {
                    clearTimeout(id);
                }
                id = setTimeout(function () {
                    while (id = common.scroll.queue.shift()) {
                        clearTimeout(id);
                    }
                    common.scroll.record && MODULE.APP.saveScrollPositionToCacheAndDB(window.location.href, common.hashquery, jQuery(window).scrollLeft(), jQuery(window).scrollTop());
                }, common.scroll.delay);
                common.scroll.queue.push(id);
            }
        };

        ModelMain.prototype.enable = function () {
            MODULE.M.state_ = 0 /* ready */;
        };

        ModelMain.prototype.disable = function () {
            MODULE.M.state_ = 1 /* lock */;
        };

        ModelMain.prototype.getCache = function (unsafe_url) {
            var common = MODULE.M.getActiveSetting(), recent = MODULE.APP.recent;
            if (!common || !recent) {
                return false;
            }

            var secure_url = MODULE.UTIL.canonicalizeUrl(unsafe_url);
            unsafe_url = null;

            secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
            recent.data[secure_url] && new Date().getTime() > recent.data[secure_url].expires && jQuery[MODULE.M.NAME].removeCache(secure_url);
            recent.data[secure_url] && !recent.data[secure_url].data && !recent.data[secure_url].XMLHttpRequest && jQuery[MODULE.M.NAME].removeCache(secure_url);
            return recent.data[secure_url];
        };

        ModelMain.prototype.setCache = function (unsafe_url, data, textStatus, XMLHttpRequest) {
            var common = MODULE.M.getActiveSetting(), recent = MODULE.APP.recent;
            if (!common || !recent) {
                return this;
            }
            var cache, size, timeStamp, expires;

            var secure_url = MODULE.UTIL.canonicalizeUrl(unsafe_url);
            unsafe_url = null;

            secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
            recent.order.unshift(secure_url);
            for (var i = 1, key; key = recent.order[i]; i++) {
                if (secure_url === key) {
                    recent.order.splice(i, 1);
                }
            }

            recent.size > common.cache.size && MODULE.M.cleanCache();
            cache = jQuery[MODULE.M.NAME].getCache(secure_url);
            if (!data && !XMLHttpRequest && (!cache || !cache.data && !cache.XMLHttpRequest)) {
                return;
            }

            var html = (XMLHttpRequest || {}).responseText || '';
            size = parseInt(html.length * 1.8 + '' || 1024 * 1024 + '', 10);
            timeStamp = new Date().getTime();
            expires = (function (timeStamp) {
                var expires = common.cache.expires, expire;
                if (!common.cache.expires) {
                    return 0;
                }
                if (recent.data[secure_url] && !XMLHttpRequest) {
                    return recent.data[secure_url].expires;
                }

                if (!XMLHttpRequest) {
                } else if (/no-store|no-cache/.test(XMLHttpRequest.getResponseHeader('Cache-Control'))) {
                } else if (~String(expire = XMLHttpRequest.getResponseHeader('Cache-Control')).indexOf('max-age=')) {
                    expire = expire.match(/max-age=(\d+)/)[1] * 1000;
                } else if (expire = XMLHttpRequest.getResponseHeader('Expires')) {
                    expire = new Date(expire).getTime() - new Date().getTime();
                } else {
                    expire = Number(common.cache.expires);
                }
                expire = Math.max(expire, 0) || 0;
                expire = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.min ? Math.max(common.cache.expires.min, expire) : expire;
                expire = 'object' === typeof common.cache.expires && 'number' === typeof common.cache.expires.max ? Math.min(common.cache.expires.max, expire) : expire;
                return timeStamp + expire;
            })(timeStamp);
            recent.size = recent.size || 0;
            recent.size += recent.data[secure_url] ? 0 : size;
            recent.data[secure_url] = jQuery.extend(true, {}, cache, {
                XMLHttpRequest: XMLHttpRequest,
                textStatus: textStatus,
                data: data,
                size: size,
                expires: expires,
                scrollX: null,
                scrollY: null,
                timeStamp: timeStamp
            });
            if (!recent.data[secure_url].data && !recent.data[secure_url].XMLHttpRequest) {
                jQuery[MODULE.M.NAME].removeCache(secure_url);
            }
            if (XMLHttpRequest || cache && cache.XMLHttpRequest) {
                var title = ((XMLHttpRequest || cache && cache.XMLHttpRequest).responseText || '').slice(0, 10000).match(/<title[^>]*>(.*?)<\/title>/i).pop() || '';
                common.database && common.fix.history && MODULE.APP.saveTitleToDB(secure_url, common.hashquery, title);
            }
        };

        ModelMain.prototype.removeCache = function (unsafe_url) {
            var common = MODULE.M.getActiveSetting(), recent = MODULE.APP.recent;
            if (!common || !recent) {
                return;
            }

            var secure_url = MODULE.UTIL.canonicalizeUrl(unsafe_url);
            unsafe_url = null;

            secure_url = common.hashquery ? secure_url : secure_url.replace(/#.*/, '');
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
            var common = MODULE.M.getActiveSetting(), recent = MODULE.APP.recent;
            if (!common || !recent) {
                return;
            }
            for (var i = recent.order.length, url; url = recent.order[--i];) {
                recent.order.splice(i, 1);
                recent.size -= recent.data[url].size;
                delete recent.data[url];
            }
        };

        ModelMain.prototype.cleanCache = function () {
            var common = MODULE.M.getActiveSetting(), recent = MODULE.APP.recent;
            if (!common || !recent) {
                return;
            }
            for (var i = recent.order.length, url; url = recent.order[--i];) {
                if (i >= common.cache.page || url in recent.data && new Date().getTime() > recent.data[url].expires) {
                    recent.order.splice(i, 1);
                    recent.size -= recent.data[url].size;
                    delete recent.data[url];
                }
            }
        };
        return ModelMain;
    })(MODULE.ModelTemplate);
    MODULE.ModelMain = ModelMain;

    MODULE.Model = ModelMain;
    MODULE.M = new MODULE.Model();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var ViewTemplate = (function () {
        function ViewTemplate(context) {
            this.state_ = -1 /* wait */;
            this.queue_ = [];
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
        ViewTemplate.prototype.OBSERVE = function () {
        };

        ViewTemplate.prototype.RELEASE = function () {
        };

        ViewTemplate.prototype.BIND = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            this.UNBIND();
            return this;
        };

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
var MODULE;
(function (MODULE) {
    var APP, DATA;

    var ViewMain = (function (_super) {
        __extends(ViewMain, _super);
        function ViewMain() {
            _super.apply(this, arguments);
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

    MODULE.View = ViewMain;
    MODULE.V = new MODULE.View();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var ControllerTemplate = (function () {
        function ControllerTemplate() {
            this.state_ = -1 /* wait */;
            this.HANDLERS = {};
            this.UUID = MODULE.M.GEN_UUID();

            if (MODULE.M.NAMESPACE && MODULE.M.NAMESPACE == MODULE.M.NAMESPACE.window) {
                MODULE.M.NAMESPACE[MODULE.M.NAME] = this.EXEC;
            } else {
                MODULE.M.NAMESPACE[MODULE.M.NAME] = MODULE.M.NAMESPACE.prototype[MODULE.M.NAME] = this.EXEC;
            }

            var f = 'function' === typeof MODULE.ControllerFunction && new MODULE.ControllerFunction() || MODULE.ControllerFunction;

            this.REGISTER_FUNCTIONS(MODULE.M.NAMESPACE[MODULE.M.NAME], f);

            this.UPDATE_PROPERTIES(MODULE.M.NAMESPACE[MODULE.M.NAME], f);
            this.OBSERVE();
            this.state_ = 0;
        }
        ControllerTemplate.prototype.EXTEND = function (context) {
            if (context === MODULE.M.NAMESPACE || MODULE.M.NAMESPACE && MODULE.M.NAMESPACE == MODULE.M.NAMESPACE.window) {
                context = MODULE.M.NAMESPACE[MODULE.M.NAME];
            } else if (context instanceof MODULE.M.NAMESPACE) {
                if (context instanceof jQuery) {
                    context = context.add();
                } else {
                }
            }
            var f = 'function' === typeof MODULE.ControllerFunction && new MODULE.ControllerFunction() || MODULE.ControllerFunction, m = 'function' === typeof MODULE.ControllerMethod && new MODULE.ControllerMethod() || MODULE.ControllerMethod;

            this.REGISTER_FUNCTIONS(context, f);
            this.REGISTER_FUNCTIONS(context, m);

            this.UPDATE_PROPERTIES(context, f);
            this.UPDATE_PROPERTIES(context, m);
            return context;
        };

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

        ControllerTemplate.prototype.exec_ = function (context) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            return [context].concat(args);
        };

        ControllerTemplate.prototype.REGISTER_FUNCTIONS = function (context, funcs) {
            var props = MODULE.Controller.PROPERTIES;

            var i;
            for (i in funcs) {
                context[i] = funcs[i];
            }
            return context;
        };

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

        ControllerTemplate.prototype.OBSERVE = function () {
        };

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
var MODULE;
(function (MODULE) {
    var APP, DATA;

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
            var common = MODULE.M.getActiveSetting(), $anchor;

            switch (typeof url) {
                case 'object':
                    $anchor = jQuery(url);
                    break;

                case 'string':
                    attr = attr || {};
                    attr.href = url;
                    $anchor = jQuery('<a/>', attr);
                    break;

                default:
                    return this;
            }
            return $anchor.first().bind(common.nss.click, function (event) {
                return MODULE.V.HANDLERS.CLICK(event);
            }).click().unbind(common.nss.click);
        };

        ControllerFunction.prototype.submit = function (url, attr, data) {
            var common = MODULE.M.getActiveSetting(), $form, df = document.createDocumentFragment(), type, $element;

            switch (true) {
                case typeof url === 'object':
                    $form = jQuery(url);
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
            return $form.first().bind(common.nss.submit, function (event) {
                return MODULE.V.HANDLERS.SUBMIT(event);
            }).submit().unbind(common.nss.submit);
        };

        ControllerFunction.prototype.getCache = function (url) {
            if (typeof url === "undefined") { url = window.location.href; }
            return MODULE.M.getCache(url);
        };

        ControllerFunction.prototype.setCache = function (url, data, textStatus, XMLHttpRequest) {
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
                    MODULE.M.setCache(url, data, textStatus, XMLHttpRequest);
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
                !jQuery[MODULE.M.NAME].getCache(anchor.href) && MODULE.M.isImmediateLoadable(event) && jQuery[MODULE.M.NAME].setCache(anchor.href, undefined, undefined, $XHR);
            });
            jQuery[MODULE.M.NAME].click(anchor.href);
            return true;
        };
        return ControllerFunction;
    })();
    MODULE.ControllerFunction = ControllerFunction;
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var V, APP, DATA;

    var ControllerMain = (function (_super) {
        __extends(ControllerMain, _super);
        function ControllerMain() {
            _super.apply(this, arguments);
            this.HANDLERS = {};
        }
        ControllerMain.prototype.exec_ = function ($context, option) {
            $context = $context instanceof jQuery ? $context : MODULE.C.EXTEND(jQuery(document));

            var pattern;
            pattern = $context instanceof MODULE.NAMESPACE ? 'm:' : 'f:';
            pattern += option ? ({}).toString.call(option).split(' ').pop().slice(0, -1).toLowerCase() : option;
            switch (pattern.toLowerCase()) {
                case 'm:undefined':
                    option = {};
                    break;
            }

            return [$context, option];
        };

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

    MODULE.Controller = ControllerMain;
    MODULE.C = new MODULE.Controller();
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var APP, DATA;

    var ControllerMethod = (function (_super) {
        __extends(ControllerMethod, _super);
        function ControllerMethod() {
            _super.apply(this, arguments);
        }
        return ControllerMethod;
    })(MODULE.ControllerFunction);
    MODULE.ControllerMethod = ControllerMethod;
})(MODULE || (MODULE = {}));
})(window, window.document, void 0, jQuery);
